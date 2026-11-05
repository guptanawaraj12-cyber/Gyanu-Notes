// Gyanu Notes — Firebase initialization
// This config is safe to be public — real security lives in Firestore
// rules and Cloud Functions, not in hiding this file.

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

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

// App Check is intentionally not initialized.
// Re-enable once a valid reCAPTCHA v3 key is registered for
// nawarajgupta.com.np in Firebase Console → App Check.