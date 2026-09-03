// Notice board: renders admin-published notices on the homepage. The static
// rows already in the HTML stay as the fallback when Firestore has none.
import { db } from "/assets/js/firebase-config.js?v=2";
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

var loadedNotices = [];

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

  loadedNotices = notices;
  list.innerHTML = notices.map(function (notice, index) {
    var tag = notice.pinned === true
      ? '<span class="tag tag-pin">Pinned</span>'
      : '<span class="tag">Notice</span>';
    return '<div class="update-row notice-clickable' + (notice.pinned === true ? " pinned" : "") + '"' +
      ' data-index="' + index + '" tabindex="0" role="button" aria-haspopup="dialog">' +
      '<span class="update-date">' + formatDate(notice.createdAt) + '</span>' +
      '<div class="update-main">' +
        '<span class="update-title">' + tag + escapeHtml(notice.title) + '</span>' +
        (notice.body ? '<p class="update-body">' + escapeHtml(notice.body) + '</p>' : "") +
      '</div>' +
      '<span class="update-read">Read &rarr;</span>' +
      '</div>';
  }).join("");
}

renderNotices();

// --- Notice popup: clicking a notice row opens its details in a modal -----

var modal = null;
var modalOpener = null;

function bodyToParagraphs(text) {
  return escapeHtml(text)
    .split(/\n{2,}/)
    .map(function (part) { return "<p>" + part.replace(/\n/g, "<br>") + "</p>"; })
    .join("");
}

function ensureModal() {
  if (modal) return modal;
  modal = document.createElement("div");
  modal.className = "notice-modal";
  modal.hidden = true;
  modal.innerHTML =
    '<div class="notice-modal-backdrop" data-close></div>' +
    '<div class="notice-modal-card" role="dialog" aria-modal="true" aria-labelledby="notice-modal-title">' +
      '<button class="notice-modal-close" data-close type="button" aria-label="Close notice">&times;</button>' +
      '<p class="notice-modal-meta"><span class="tag" id="notice-modal-tag">Notice</span>' +
      '<span class="notice-modal-date" id="notice-modal-date"></span></p>' +
      '<h3 id="notice-modal-title"></h3>' +
      '<div class="notice-modal-body" id="notice-modal-body"></div>' +
      '<p class="notice-modal-actions"><a class="btn btn-primary" id="notice-modal-link" hidden>Open link &rarr;</a></p>' +
    '</div>';
  document.body.appendChild(modal);
  modal.addEventListener("click", function (event) {
    if (event.target.closest("[data-close]")) closeNoticeModal();
  });
  return modal;
}

function openNoticeModal(notice, opener) {
  ensureModal();
  modalOpener = opener || null;
  var tag = document.getElementById("notice-modal-tag");
  tag.textContent = notice.pinned === true ? "Pinned" : "Notice";
  tag.className = notice.pinned === true ? "tag tag-pin" : "tag";
  document.getElementById("notice-modal-date").textContent = formatDate(notice.createdAt);
  document.getElementById("notice-modal-title").textContent = notice.title || "";
  document.getElementById("notice-modal-body").innerHTML = notice.body ? bodyToParagraphs(notice.body) : "";
  var link = document.getElementById("notice-modal-link");
  var url = safeUrl(notice.url);
  link.hidden = !url;
  if (url) {
    link.href = url;
    if (/^https:/i.test(url)) { link.target = "_blank"; link.rel = "noopener"; }
    else link.removeAttribute("target");
  }
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".notice-modal-close").focus();
}

function closeNoticeModal() {
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = "";
  if (modalOpener && document.contains(modalOpener)) modalOpener.focus();
  modalOpener = null;
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") closeNoticeModal();
});

function bindNoticePopup(list) {
  if (!list) return;
  list.addEventListener("click", function (event) {
    var row = event.target.closest(".notice-clickable");
    if (!row) return;
    var notice = loadedNotices[Number(row.dataset.index)];
    if (notice) openNoticeModal(notice, row);
  });
  list.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    var row = event.target.closest(".notice-clickable");
    if (!row) return;
    event.preventDefault();
    var notice = loadedNotices[Number(row.dataset.index)];
    if (notice) openNoticeModal(notice, row);
  });
}

bindNoticePopup(document.getElementById("notice-board-list"));