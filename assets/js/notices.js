// Notice board: renders admin-published notices on the homepage. The static
// rows already in the HTML stay as the fallback when Firestore has none.
import { db } from "/assets/js/firebase-config.js";
import { collection, getDocs, limit, query, orderBy } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Only relative paths and http(s) links are allowed as notice links.
function safeUrl(url) {
  if (typeof url !== "string" || !url.trim()) return "";
  var value = url.trim();
  if (value.charAt(0) === "/") return value;
  if (/^https:\/\//i.test(value)) return value;
  return "";
}

function formatDate(value) {
  try {
    var date = value && typeof value.toDate === "function" ? value.toDate() : null;
    if (!date) return "";
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[date.getMonth()] + " " + String(date.getDate()).padStart(2, "0");
  } catch (error) {
    return "";
  }
}

async function renderNotices() {
  var list = document.getElementById("notice-board-list");
  if (!list) return;

  var notices;
  try {
    // Latest first; a pinned-first sort happens client-side so no composite
    // index is needed in Firestore.
    var snapshot = await getDocs(query(collection(db, "notices"), orderBy("createdAt", "desc"), limit(8)));
    notices = snapshot.docs.map(function (docSnap) {
      return Object.assign({ id: docSnap.id }, docSnap.data());
    });
  } catch (error) {
    return; // rules blocked, offline, or empty — keep the static fallback rows
  }

  if (!notices.length) return;

  notices.sort(function (a, b) {
    return (b.pinned === true ? 1 : 0) - (a.pinned === true ? 1 : 0);
  });

  list.innerHTML = notices.map(function (notice) {
    var tag = notice.pinned === true
      ? '<span class="tag tag-pin">Pinned</span>'
      : '<span class="tag">Notice</span>';
    var link = safeUrl(notice.url)
      ? '<a href="' + escapeHtml(safeUrl(notice.url)) + '">View &rarr;</a>'
      : "";
    return '<div class="update-row' + (notice.pinned === true ? " pinned" : "") + '">' +
      '<span class="update-date">' + formatDate(notice.createdAt) + '</span>' +
      '<span class="update-title">' + tag + escapeHtml(notice.title) + '</span>' +
      link +
      '</div>';
  }).join("");
}

renderNotices();