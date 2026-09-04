// Notice board: renders admin-published notices on the homepage. The static
// rows already in the HTML stay as the fallback when Firestore has none.
import { withTimeout } from "/assets/js/content-store.js?v=4";

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

// Notices from the last 3 days show a "New" badge (unless pinned).
function isNew(value) {
  try {
    var date = value && typeof value.toDate === "function" ? value.toDate() : null;
    return !!date && Date.now() - date.getTime() < 3 * 24 * 60 * 60 * 1000;
  } catch (error) { return false; }
}

var loadedNotices = [];

async function renderNotices() {
  var list = document.getElementById("notice-board-list");
  if (!list) return;

  var notices;
  try {
    // Latest first; a pinned-first sort happens client-side so no composite
    // index is needed in Firestore. Firebase loads dynamically with a 6s
    // timeout — if it fails, the static fallback rows below simply remain.
    const [{ db }, f] = await Promise.all([
      import("/assets/js/firebase-config.js?v=3"),
      import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js")
    ]);
    var snapshot = await withTimeout(
      f.getDocs(f.query(f.collection(db, "notices"), f.orderBy("createdAt", "desc"), f.limit(8))),
      6000
    );
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
    var badge = isNew(notice.createdAt) && notice.pinned !== true
      ? '<span class="tag tag-new">New</span>'
      : "";
    return '<div class="update-row notice-clickable' + (notice.pinned === true ? " pinned" : "") + '"' +
      ' data-index="' + index + '" tabindex="0" role="button" aria-haspopup="dialog">' +
      '<span class="update-date">' + formatDate(notice.createdAt) + '</span>' +
      '<div class="update-main">' +
        '<span class="update-title">' + tag + badge + escapeHtml(notice.title) + '</span>' +
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
      '<figure class="notice-modal-image" id="notice-modal-image" hidden></figure>' +
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
  tag.textContent = notice.pinned === true
    ? "Pinned"
    : (isNew(notice.createdAt) ? "New" : "Notice");
  tag.className = notice.pinned === true
    ? "tag tag-pin"
    : (isNew(notice.createdAt) ? "tag tag-new" : "tag");
  document.getElementById("notice-modal-date").textContent = formatDate(notice.createdAt);
  document.getElementById("notice-modal-title").textContent = notice.title || "";
  document.getElementById("notice-modal-body").innerHTML = notice.body ? bodyToParagraphs(notice.body) : "";
  var imageWrap = document.getElementById("notice-modal-image");
  var imageUrl = safeUrl(notice.image);
  imageWrap.hidden = !imageUrl;
  if (imageUrl) imageWrap.innerHTML = '<img src="' + escapeHtml(imageUrl) + '" alt="">';
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