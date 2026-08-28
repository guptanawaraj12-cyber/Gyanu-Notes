// Gyanu Notes — email verification banner (dashboard, profile)
// Looks for #verify-banner on the page and reveals it when the signed-in
// user's email is not verified yet, with a resend button.

import { auth } from "/assets/js/firebase-config.js";
import { onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

onAuthStateChanged(auth, function (user) {
  var banner = document.getElementById("verify-banner");
  var resend = document.getElementById("verify-resend");

  if (!user) {
    if (banner) banner.style.display = "none";
    return;
  }

  if (user.emailVerified) {
    if (banner) banner.style.display = "none";
    return;
  }

  if (banner) banner.style.display = "flex";

  if (resend) {
    resend.addEventListener("click", function () {
      resend.disabled = true;
      var original = resend.textContent;
      resend.textContent = "Sending…";
      sendEmailVerification(user)
        .then(function () {
          resend.textContent = "Sent — check your inbox";
          setTimeout(function () {
            resend.textContent = original;
            resend.disabled = false;
          }, 4000);
        })
        .catch(function () {
          resend.textContent = "Could not send — try again";
          resend.disabled = false;
        });
    });
  }
});