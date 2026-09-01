// Gyanu Notes â€” download gate (client-side, free-plan friendly).
// Downloads are allowed only for signed-in visitors with a verified email.
// The chapter/paper Drive file IDs are already public: the same IDs power
// the on-page preview iframes, so this flow exposes nothing new â€” it simply
// packages the file as a one-click download instead of a preview.
//
// The earlier design streamed bytes through a Cloud Function so the Drive
// ID never reached the browser. That requires Firebase's paid Blaze plan;
// on the free Spark plan the function cannot deploy, so downloads point
// straight at Drive's public download endpoint instead.

import { auth } from "/assets/js/firebase-config.js?v=2";

var DRIVE_ID_PATTERN = /^[-\w]{10,80}$/;

export async function secureDownload(options) {
  var fileId = String((options && options.fileId) || "");
  var name = String((options && options.name) || "");
  if (!DRIVE_ID_PATTERN.test(fileId)) {
    throw new Error("This file is not available for download yet.");
  }

  // Defence in depth: every caller also gates its own button, but the
  // download re-checks the account state first.
  var user = auth.currentUser;
  if (!user) throw new Error("Sign in to download files.");
  if (!user.emailVerified) throw new Error("Verify your email address before downloading.");

  // Drive's usercontent endpoint serves the raw file with a download
  // disposition; confirm=t skips the "can't scan for viruses" interstitial
  // for large files. Opening in a new tab keeps the notes page intact even
  // if Drive decides to show its own download page instead. The download
  // attribute is ignored cross-origin, so Drive's original filename is kept.
  var url =
    "https://drive.usercontent.google.com/download?id=" +
    encodeURIComponent(fileId) +
    "&export=download&confirm=t";

  var link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener";
  if (name) link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
}