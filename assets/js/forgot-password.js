import { auth } from "/assets/js/firebase-config.js?v=2";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const form = document.getElementById("reset-form");
const button = document.getElementById("reset-submit");
const message = document.getElementById("reset-message");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  button.disabled = true;
  button.textContent = "Sending…";
  try {
    await sendPasswordResetEmail(auth, document.getElementById("email").value.trim());
    message.textContent = "If that account exists, a password-reset link has been sent.";
    message.className = "form-message success";
    form.reset();
  } catch (error) {
    message.textContent = "Could not send the reset link. Check the email and try again.";
    message.className = "form-message error";
  } finally { button.disabled = false; button.textContent = "Send reset link"; }
});
