// Gyanu Notes — Firebase initialization
// This config is safe to be public — real security lives in Firestore
// rules and Cloud Functions, not in hiding this file.

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app-check.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-QLb54wT2y-k4W3GUrsxB9SA-WFZ_03w",
  authDomain: "gyanu-notes-6f6d8.firebaseapp.com",
  databaseURL: "https://gyanu-notes-6f6d8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gyanu-notes-6f6d8",
  storageBucket: "gyanu-notes-6f6d8.firebasestorage.app",
  messagingSenderId: "149239448624",
  appId: "1:149239448624:web:4e4695a7d557dce234d9f5",
  measurementId: "G-WM3DLZTBPN"
};

// Reuse the app if this module is ever instantiated twice (can happen when
// cached pages mix old and new import URLs during a rollout window).
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// App Check (OPTIONAL — currently DISABLED).
// The registered reCAPTCHA v3 key below is rejected by Google's token
// exchange with HTTP 400 ("AppCheck: Requests throttled … appCheck/throttled"
// spam in the console), which means it is not valid/registered for this app
// + domain. App Check does NOT gate Firebase Auth or Firestore access unless
// enforcement is switched on in the console (it isn't), so it is safe to
// leave off while the key is sorted out.
// TO RE-ENABLE:
//   1. Firebase Console → App Check → Apps → register this web app with a
//      reCAPTCHA v3 key created for your exact domains.
//   2. Flip APP_CHECK_ENABLED to true and redeploy.
const APP_CHECK_ENABLED = false;
if (APP_CHECK_ENABLED) {
  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider("6LdTpqItAAAAABET-8IYkuQbLb_ydKyTzL_BLSMN"),
      isTokenAutoRefreshEnabled: true
    });
  } catch (error) {
    // App Check already initialized on this app — safe to continue.
  }
}