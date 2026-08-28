import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import { Readable } from "node:stream";

initializeApp();

// An existing administrator can grant or revoke the admin role. The role is
// stored as users/{uid}.admin so it can also be managed from Firebase Console.
export const setAdminRole = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("permission-denied", "Administrator access is required.");
  }
  const caller = await getFirestore().doc(`users/${context.auth.uid}`).get();
  if (caller.data()?.admin !== true) {
    throw new functions.https.HttpsError("permission-denied", "Administrator access is required.");
  }

  const email = typeof data?.email === "string" ? data.email.trim() : "";
  const enabled = data?.enabled === true;
  if (!email || !email.includes("@")) {
    throw new HttpsError("invalid-argument", "A valid email address is required.");
  }

  const auth = getAuth();
  const user = await auth.getUserByEmail(email);
  await getFirestore().doc(`users/${user.uid}`).set({ admin: enabled }, { merge: true });

  return { email: user.email, admin: enabled };
});

// ---------------------------------------------------------------------------
// Secure downloads. The browser never receives a reusable Drive link: it asks
// this function for a note/paper by its catalogue id, the function verifies
// the caller's ID token and verified email, resolves the real Drive file id
// from the Firestore catalogue server-side, and streams the file through.
// ---------------------------------------------------------------------------

const ALLOWED_ORIGINS = [
  "https://nawarajgupta.com.np",
  "https://www.nawarajgupta.com.np",
  "http://localhost:8080",
  "http://127.0.0.1:8080"
];

// gen-1 functions have no built-in CORS option, so allow-listed origins are
// approved manually (browsers send a preflight OPTIONS for the auth header).
function applyCors(req, res) {
  const origin = req.get("Origin") || "";
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
    res.set("Vary", "Origin");
    return true;
  }
  return false;
}

const PLACEHOLDER_ID = "REPLACE_WITH_REAL_DRIVE_FILE_ID";
const DRIVE_ID_PATTERN = /^[-\w]{20,}$/;

function findCatalogueRecord(siteContent, type, id) {
  if (type === "note") {
    for (const entry of siteContent.notes?.notes || []) {
      const chapter = (entry.chapters || []).find((ch) => ch.id === id);
      if (chapter) return chapter;
    }
    return null;
  }
  for (const entry of siteContent.papers?.papers || []) {
    const set = (entry.sets || []).find((s) => s.id === id);
    if (set) return set;
  }
  return null;
}

// Spark plan caps function execution at 60 seconds.
export const downloadFile = functions
  .runWith({ timeoutSeconds: 60, memory: "256MB" })
  .https.onRequest(async (req, res) => {
    applyCors(req, res);
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Authorization");
      res.set("Access-Control-Max-Age", "86400");
      return res.status(204).end();
    }
    const deny = (status, message) => res.status(status).json({ error: message });

    if (req.method !== "GET") return deny(405, "Method not allowed.");

    // 1. Authenticate the caller.
    const header = req.get("Authorization") || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token) return deny(401, "Sign in to download files.");
    let decoded;
    try {
      decoded = await getAuth().verifyIdToken(token);
    } catch (error) {
      return deny(401, "Your session expired. Refresh the page and try again.");
    }
    if (decoded.email_verified !== true) {
      return deny(403, "Verify your email address before downloading files.");
    }

    // 2. Resolve the requested catalogue entry (the client sends the note or
    //    paper id, never a Drive id).
    const type = req.query.type === "paper" ? "paper" : "note";
    const id = String(req.query.id || "").trim();
    if (!/^[-\w]{2,80}$/.test(id)) return deny(400, "Invalid file reference.");

    const snapshot = await getFirestore().doc("siteContent/current").get();
    if (!snapshot.exists) {
      return deny(503, "The catalogue has not been imported yet. Ask the administrator to run Import bundled data.");
    }

    const record = findCatalogueRecord(snapshot.data(), type, id);
    if (!record) return deny(404, "This file could not be found in the catalogue.");

    const fileId = typeof record.driveFileId === "string" ? record.driveFileId : "";
    if (fileId === PLACEHOLDER_ID || !DRIVE_ID_PATTERN.test(fileId)) {
      return deny(404, "No downloadable file is attached to this entry yet.");
    }

    // 3. Fetch the file from Drive and stream it through.
    let upstream;
    try {
      upstream = await fetch(
        "https://drive.usercontent.google.com/download?id=" +
          encodeURIComponent(fileId) +
          "&export=download&confirm=t",
        { redirect: "follow" }
      );
    } catch (error) {
      return deny(502, "Could not reach the file storage. Please try again.");
    }

    const contentType = upstream.headers.get("content-type") || "";
    if (!upstream.ok || /text\/html/i.test(contentType)) {
      return deny(502, "The file storage refused this download. Check that the file is shared as 'Anyone with the link'.");
    }

    const safeName =
      String(req.query.name || "")
        .replace(/[^a-zA-Z0-9 ._-]/g, "")
        .trim()
        .slice(0, 80) || "gyanu-notes";
    res.setHeader(
      "Content-Type",
      /application\/|image\/|text\/plain/i.test(contentType) ? contentType : "application/octet-stream"
    );
    const length = upstream.headers.get("content-length");
    if (length) res.setHeader("Content-Length", length);
    res.setHeader("Content-Disposition", 'attachment; filename="' + safeName + '.pdf"');
    res.status(200);
    Readable.fromWeb(upstream.body).pipe(res);
  }
);
