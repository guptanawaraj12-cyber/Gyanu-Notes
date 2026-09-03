// Gyanu Notes — bookmarks data layer
// Stored under: bookmarks/{uid}/items/{contentId}
// The document id is the note chapter id or paper set id, so saving a viewer
// is an idempotent add/remove toggle (rules forbid partial updates).

import { db } from "/assets/js/firebase-config.js?v=3";
import {
  doc, setDoc, deleteDoc, getDoc,
  collection, query, orderBy, getDocs, getCountFromServer, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

export function getBookmarkRef(uid, contentId) {
  return doc(db, "bookmarks", uid, "items", contentId);
}

export function isBookmarked(uid, contentId) {
  if (!uid || !contentId) return Promise.resolve(false);
  return getDoc(getBookmarkRef(uid, contentId))
    .then(function (snap) { return snap.exists(); })
    .catch(function () { return false; });
}

export function setBookmark(uid, contentId, entry) {
  // entry: { title, url, type: 'note' | 'paper' }
  return setDoc(getBookmarkRef(uid, contentId), {
    title: entry.title,
    url: entry.url,
    type: entry.type,
    savedAt: serverTimestamp()
  });
}

export function removeBookmark(uid, contentId) {
  if (!uid || !contentId) return Promise.resolve();
  return deleteDoc(getBookmarkRef(uid, contentId));
}

// Returns true when the item is now saved, false when it was removed.
export function toggleBookmark(uid, contentId, entry) {
  return isBookmarked(uid, contentId).then(function (already) {
    if (already) {
      return removeBookmark(uid, contentId).then(function () { return false; });
    }
    return setBookmark(uid, contentId, entry).then(function () { return true; });
  }).catch(function () {
    return false;
  });
}

// List the user's bookmarks, newest first. Each item includes its {id}.
export function getBookmarks(uid) {
  if (!uid) return Promise.resolve([]);
  const q = query(collection(db, "bookmarks", uid, "items"), orderBy("savedAt", "desc"));
  return getDocs(q).then(function (snap) {
    const items = [];
    snap.forEach(function (d) {
      items.push(Object.assign({ id: d.id }, d.data()));
    });
    return items;
  }).catch(function () {
    return [];
  });
}

export function getBookmarkCount(uid) {
  if (!uid) return Promise.resolve(0);
  return getCountFromServer(collection(db, "bookmarks", uid, "items"))
    .then(function (snap) { return snap.data().count; })
    .catch(function () { return 0; });
}