// Gyanu Notes — secure, server-gated downloads.
// The Cloud Function verifies the caller's ID token and verified email,
// resolves the real Drive file server-side, and streams the file. The
// browser never receives a reusable Drive download link.

import { auth } from "/assets/js/firebase-config.js";

// gen-1 HTTP function URL (region us-central1). If you deploy the
// function to another region, update this path to match.
var DOWNLOAD_URL = "https://us-central1-gyanu-notes-6f6d8.cloudfunctions.net/downloadFile";

export async function secureDownload(options) {
  var type = options && (options.type === "paper" || options.type === "noteHandwritten") ? options.type : "note";
  var id = String((options && options.id) || "");
  var name = String((options && options.name) || "");
  if (!id) throw new Error("Nothing to download.");

  var user = auth.currentUser;
  if (!user) throw new Error("Sign in to download files.");

  var token = await user.getIdToken();
  var response = await fetch(
    DOWNLOAD_URL +
      "?type=" + encodeURIComponent(type) +
      "&id=" + encodeURIComponent(id) +
      "&name=" + encodeURIComponent(name),
    { headers: { Authorization: "Bearer " + token } }
  );

  if (!response.ok) {
    var message = "Download failed. Please try again later.";
    try {
      var payload = await response.json();
      if (payload && payload.error) message = payload.error;
    } catch (error) { /* keep the generic message */ }
    throw new Error(message);
  }

  var blob = await response.blob();
  var url = URL.createObjectURL(blob);
  var link = document.createElement("a");
  link.href = url;
  link.download = name ? name + ".pdf" : "gyanu-notes.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
}