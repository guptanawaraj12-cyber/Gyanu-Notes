// ===== FIREBASE CONFIGURATION =====

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDoc, getDocs, doc, setDoc, updateDoc, deleteDoc, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Your Firebase configuration (REPLACE WITH YOUR OWN!)
const firebaseConfig = {
    apiKey: "AIzaSyBhTxHT57h2q-AJzmx-bDK5JCCavh73R1g",
    authDomain: "gyanu-notes-b10bd.firebaseapp.com",
    projectId: "gyanu-notes-b10bd",
    storageBucket: "gyanu-notes-b10bd.firebasestorage.app",
    messagingSenderId: "143434726784",
    appId: "1:143434726784:web:accd18dfb2357082e85565",
    measurementId: "G-TXF9GY6E4N"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Export for use in other files
export { 
  auth, 
  db, 
  storage,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
};