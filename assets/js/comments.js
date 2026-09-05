// Gyanu Notes — reader Q&A on note view pages. Firestore-backed and resilient:
// dynamic imports + 6s timeout; anonymous visitors can read but not post.
// Newest-first, 20 per page; client-side first-pass spam filter (moderation
// still happens in the admin panel via the reported flag).

import { withTimeout } from "/assets/js/content-store.js?v=5";

const PAGE_SIZE = 20;
const noteId = new URLSearchParams(window.location.search).get("id");

// First-pass blocklist (word-boundary matched, case-insensitive) — a filter,
// not a replacement for the admin moderation queue.
const BLOCKED_WORDS = ["fuck", "fuk", "shit", "bitch", "asshole", "bastard",
  "dickhead", "cunt", "slut", "whore", "porn", "rape", "nigger", "faggot",
  "chutiya", "madarchod", "behenchod", "bhosdike", "bhosadi", "lund", "chodu",
  "gaand", "gandu", "harami", "randi", "sala", "kutta", "kutti", "teshro"];
const URL_REGEX = /(https?:\/\/|www\.)\S+/gi;

function escapeHtml(text) {
  return String(text == null ? "" : text)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function spamReason(text) {
  const t = String(text || "").trim();
  const lower = t.toLowerCase();
  for (var i = 0; i < BLOCKED_WORDS.length; i++) {
    if (new RegExp("\\b" + BLOCKED_WORDS[i] + "\\b", "i").test(lower)) {
      return "Please keep your question friendly and respectful.";
    }
  }
  if ((t.match(URL_REGEX) || []).length > 2) {
    return "Too many links — please edit your message and try again.";
  }
  const letters = t.replace(/[^a-zA-Z]/g, "");
  if (letters.length > 20 && letters === letters.toUpperCase()) {
    return "Please turn off CAPS LOCK before posting.";
  }
  if (/(.)\1{9,}/.test(t)) return "That looks like spam.";
  return null;
}

function fmtDate(ts) {
  const d = ts && typeof ts.toDate === "function" ? ts.toDate() : (ts instanceof Date ? ts : null);
  if (!d || isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

let F = null;            // resolved Firebase handles (single dynamic load)
let lastVisible = null;  // pagination cursor (QueryDocumentSnapshot)
let currentUser = null;

async function loadFirebase() {
  if (F) return F;
  const [fc, fs, am] = await Promise.all([
    import("/assets/js/firebase-config.js?v=3"),
    import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"),
    import("https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js")
  ]);
  F = {
    auth: fc.auth, db: fc.db,
    collection: fs.collection, query: fs.query, where: fs.where,
    orderBy: fs.orderBy, limit: fs.limit, startAfter: fs.startAfter,
    getDocs: fs.getDocs, addDoc: fs.addDoc, doc: fs.doc,
    updateDoc: fs.updateDoc, serverTimestamp: fs.serverTimestamp,
    onAuthStateChanged: am.onAuthStateChanged
  };
  return F;
}

function commentQuery(afterDoc) {
  const parts = [
    F.collection(F.db, "comments"),
    F.where("noteId", "==", noteId),
    F.orderBy("createdAt", "desc"),
    F.limit(PAGE_SIZE)
  ];
  if (afterDoc) parts.push(F.startAfter(afterDoc));
  return F.query.apply(F.query, parts);
}

function commentCard(item) {
  const card = document.createElement("div");
  card.className = "comment-item";
  card.dataset.id = item.id;
  const when = fmtDate(item.createdAt);
  const own = !!(item.uid && currentUser && item.uid === currentUser.uid);
  const flag = item.reported === true
    ? '<span class="tag tag-reported">Reported</span>'
    : (own ? "" : '<a href="#" class="comment-report" data-id="' + escapeHtml(item.id) + '">Report</a>');
  card.innerHTML =
    '<div class="comment-head">' +
    '<strong class="comment-author">' + escapeHtml(item.displayName || "Student") + "</strong>" +
    (when ? '<span class="comment-date">' + escapeHtml(when) + "</span>" : "") +
    flag +
    "</div>" +
    '<p class="comment-text">' + escapeHtml(item.text || "") + "</p>";
  return card;
}

function swapToReported(link) {
  const tag = document.createElement("span");
  tag.className = "tag tag-reported";
  tag.textContent = "Reported";
  link.replaceWith(tag);
}

async function loadPage(reset) {
  const list = document.getElementById("comments-list");
  const moreBtn = document.getElementById("comments-more");
  if (reset) {
    lastVisible = null;
    list.innerHTML = '<p class="muted">Loading questions…</p>';
  }
  const snapshot = await withTimeout(F.getDocs(commentQuery(lastVisible)), 6000);
  if (reset) list.innerHTML = "";
  if (!snapshot.size && reset) {
    list.innerHTML = '<p class="muted">No questions yet. Be the first to ask.</p>';
  }
  snapshot.docs.forEach(function (docSnap) {
    list.appendChild(commentCard(Object.assign({ id: docSnap.id }, docSnap.data())));
  });
  if (snapshot.size) lastVisible = snapshot.docs[snapshot.size - 1];
  moreBtn.hidden = snapshot.size < PAGE_SIZE;
  moreBtn.textContent = "Load more";
}

document.addEventListener("DOMContentLoaded", function () {
  const section = document.getElementById("comments-section");
  if (!section || !noteId) { if (section) section.hidden = true; return; }

  const list = document.getElementById("comments-list");
  const moreBtn = document.getElementById("comments-more");
  const formWrap = document.getElementById("comment-form-wrap");
  const prompt = document.getElementById("comment-login-prompt");
  const form = document.getElementById("comment-form");
  const textEl = document.getElementById("comment-text");
  const submitBtn = document.getElementById("comment-submit");
  const msg = document.getElementById("comment-message");

  function fail() {
    // The list is unavailable, but posting may still work — the form's
    // visibility is owned by the auth listener, not by this failure path.
    list.innerHTML = '<p class="muted">Comments unavailable right now.</p>';
    moreBtn.hidden = true;
  }

  (async function () {
    try {
      await loadFirebase();
      F.onAuthStateChanged(F.auth, function (user) {
        currentUser = user;
        formWrap.hidden = !user;
        prompt.hidden = !!user;
      });
      await loadPage(true);
      moreBtn.addEventListener("click", function () {
        moreBtn.disabled = true;
        loadPage(false)
          .catch(function () {
            // Keep already-loaded comments; just offer a retry on the button.
            moreBtn.hidden = false;
            moreBtn.textContent = "Couldn\u2019t load more — tap to retry";
          })
          .finally(function () { moreBtn.disabled = false; });
      });
    } catch (error) {
      console.warn("Comments unavailable:", error);
      fail();
    }
  })();

  // Report: one click flags the comment (reported: true) — visible to all,
  // labelled "Reported", and queued for the admin moderation list.
  list.addEventListener("click", function (event) {
    const link = event.target.closest ? event.target.closest(".comment-report") : null;
    if (!link) return;
    event.preventDefault();
    if (link.dataset.done) return;
    link.dataset.done = "1";
    withTimeout(F.updateDoc(F.doc(F.db, "comments", link.dataset.id), { reported: true }), 6000)
      .then(function () { swapToReported(link); })
      .catch(function () { link.removeAttribute("data-done"); });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = textEl.value.trim();
    msg.textContent = "";
    msg.className = "form-message";
    if (!text) { msg.textContent = "Write your question first."; msg.className = "form-message error"; return; }
    if (!currentUser) return;
    const reason = spamReason(text);
    if (reason) { msg.textContent = reason; msg.className = "form-message error"; return; }
    const name = currentUser.displayName ||
      (currentUser.email ? currentUser.email.split("@")[0] : "Student");
    submitBtn.disabled = true;
    withTimeout(F.addDoc(F.collection(F.db, "comments"), {
      noteId: noteId,
      uid: currentUser.uid,
      displayName: name,
      text: text,
      createdAt: F.serverTimestamp(),
      reported: false
    }), 6000)
      .then(function () {
        const empty = list.querySelector(".muted");
        if (empty && /^No questions yet/.test(empty.textContent)) empty.remove();
        list.insertBefore(commentCard({
          id: "local-" + Date.now(),
          uid: currentUser.uid,
          displayName: name,
          text: text,
          createdAt: new Date(),
          reported: false
        }), list.firstChild);
        textEl.value = "";
        msg.textContent = "Thanks! Your question is posted.";
        msg.className = "form-message success";
      })
      .catch(function () {
        msg.textContent = "Could not post right now — please try again.";
        msg.className = "form-message error";
      })
      .finally(function () { submitBtn.disabled = false; });
  });
});