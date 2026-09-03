// Gyanu Notes — view history logging, used by notes-view.js and papers-view.js
// Stores under: history/{uid}/items/{autoId}

import { db } from "/assets/js/firebase-config.js?v=3";
import {
  collection, addDoc, query, orderBy, limit, getDocs, getCountFromServer,
  where, deleteDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Call this whenever a signed-in user views a note or paper.
export function logView(uid, entry) {
  // entry: { title, url, type: 'note' | 'paper' }
  if (!uid) return Promise.resolve();
  return addDoc(collection(db, "history", uid, "items"), {
    title: entry.title,
    url: entry.url,
    type: entry.type,
    viewedAt: serverTimestamp()
  }).catch(function (err) {
    // Non-critical — don't break the viewing experience if this fails
    console.warn("Could not log view history:", err);
  });
}

// Fetch the most recent N viewed items for a user.
export function getRecentHistory(uid, count) {
  if (!uid) return Promise.resolve([]);
  var q = query(collection(db, "history", uid, "items"), orderBy("viewedAt", "desc"), limit(count || 6));
  return getDocs(q).then(function (snap) {
    var items = [];
    snap.forEach(function (doc) { items.push(doc.data()); });
    return items;
  }).catch(function (err) {
    console.warn("Could not load view history:", err);
    return [];
  });
}

// Count the user's history rows. Pass type ('note' | 'paper') to filter.
export function countHistory(uid, type) {
  if (!uid) return Promise.resolve(0);
  var coll = collection(db, "history", uid, "items");
  var q = type ? query(coll, where("type", "==", type)) : query(coll);
  return getCountFromServer(q)
    .then(function (snap) { return snap.data().count; })
    .catch(function () { return 0; });
}

// Remove every history entry for the user (privacy / tidiness).
export function clearHistory(uid) {
  if (!uid) return Promise.resolve();
  var q = query(collection(db, "history", uid, "items"));
  return getDocs(q).then(function (snap) {
    return Promise.all(snap.docs.map(function (d) {
      return deleteDoc(d.ref).catch(function () { /* keep going */ });
    }));
  }).catch(function (err) {
    console.warn("Could not clear view history:", err);
  });
}