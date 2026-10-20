// Gyanu Notes — download gate (client-side convenience gate, Spark plan).
//
// IMPORTANT: on the free Spark plan this is a CLIENT-SIDE ONLY convenience
// gate. It checks sign-in + verified email in the browser to keep honest
// visitors from hitting raw Drive links — it is NOT real access control.
// The chapter/paper Drive file IDs are public either way: the same IDs power
// the on-page preview iframes, so anyone can reconstruct the Drive URL.
//
// Server-side streaming (auth + verified email enforced, Drive file ID
// resolved only inside the function) exists as downloadFile in
// functions/index.js, but it is only used if the project moves to Blaze —
// Cloud Functions cannot deploy on the free Spark plan. Until then, the
// download below points straight at Drive's public download endpoint.


var DRIVE_ID_PATTERN = /^[-\w]{10,80}$/;
// The catalogue ships with this placeholder until real files are uploaded.
// It matches the pattern above, so it must be rejected explicitly.
var PLACEHOLDER_ID = "REPLACE_WITH_REAL_DRIVE_FILE_ID";

export async function secureDownload(options) {
  var fileId = String((options && options.fileId) || "");
  var name = String((options && options.name) || "");
  if (fileId === PLACEHOLDER_ID || !DRIVE_ID_PATTERN.test(fileId)) {
    throw new Error("This file is not available for download yet.");
  }

  // Defence in depth: every caller also gates its own button, but the
  // download re-checks the account state first.
  const { auth } = await import("/assets/js/firebase-config.js?v=3");
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