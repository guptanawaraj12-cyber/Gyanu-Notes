// Gyanu Notes — paper viewer: loads paper data, shows preview, gates download behind login

import { auth } from "/assets/js/firebase-config.js";
import { onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { logView } from "/assets/js/history.js";
import { getPapersData } from "/assets/js/content-store.js";
import { isBookmarked, toggleBookmark } from "/assets/js/bookmarks.js";
import { secureDownload } from "/assets/js/secure-download.js";

document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var setId = params.get('id');
  var currentUser = null;
  var currentSet = null;
  var currentTitleText = '';
  var hasLoggedView = false;
  var bookmarkBtn = document.getElementById('bookmark-btn');
  var bookmarkActive = false;

  getPapersData()
    .then(function (data) { render(data); })
    .catch(function () {
      document.getElementById('note-heading').textContent = 'Could not load this paper';
    });

  function findSet(data, id) {
    for (var i = 0; i < data.papers.length; i++) {
      var entry = data.papers[i];
      var match = entry.sets.find(function (s) { return s.id === id; });
      if (match) {
        return { set: match, entry: entry };
      }
    }
    return null;
  }

  function render(data) {
    var found = findSet(data, setId);
    var holder = document.getElementById('viewer-holder');
    var heading = document.getElementById('note-heading');
    var breadcrumb = document.getElementById('breadcrumb-trail');
    var downloadBtn = document.getElementById('download-btn');

    if (!found) {
      heading.textContent = 'Paper not found';
      holder.innerHTML = '<div class="empty-state" style="padding: 40px 0; color: var(--ink-faint);">This paper could not be found. It may have been moved or removed.</div>';
      downloadBtn.style.display = 'none';
      return;
    }

    currentSet = found.set;
    var entry = found.entry;
    var classInfo = data.classExamTypes.find(function (c) { return c.classSlug === entry.classSlug; });
    var subjectInfo = data.subjects.find(function (s) { return s.slug === entry.subjectSlug; });
    var classLabel = classInfo ? classInfo.label : entry.classSlug;
    var subjectLabel = subjectInfo ? subjectInfo.label : entry.subjectSlug;
    var titleText = classLabel + ' ' + subjectLabel + ' ' + entry.year + ' — ' + currentSet.label;
    currentTitleText = titleText;

    document.title = titleText + ' — Gyanu Notes';
    document.getElementById('page-title').textContent = titleText + ' — Gyanu Notes';
    heading.textContent = titleText;
    breadcrumb.innerHTML =
      '/ <a href="/papers/' + entry.classSlug + '/">' + classLabel + '</a>' +
      ' / ' + subjectLabel + ' ' + entry.year + ' / ' + currentSet.label;

    // Embedded Drive preview. Real files need a real driveFileId (currently placeholder).
    var previewSrc = 'https://drive.google.com/file/d/' + currentSet.driveFileId + '/preview';
    holder.innerHTML = '<iframe class="viewer-frame" src="' + previewSrc + '" allow="autoplay"></iframe>';

    updateDownloadState();
    updateBookmarkState();
    maybeLogView();
  }

  function bookmarkEntry() {
    return {
      title: currentTitleText,
      url: window.location.pathname + window.location.search,
      type: 'paper'
    };
  }

  function paintBookmarkButton() {
    if (!bookmarkBtn) return;
    var star = bookmarkBtn.querySelector('.bm-star');
    var label = bookmarkBtn.querySelector('.bm-label');
    if (star) star.textContent = bookmarkActive ? '★' : '☆';
    if (label) label.textContent = bookmarkActive ? 'Saved' : 'Save';
    bookmarkBtn.classList.toggle('is-active', bookmarkActive);
    bookmarkBtn.setAttribute('aria-pressed', bookmarkActive ? 'true' : 'false');
  }

  function updateBookmarkState() {
    if (!bookmarkBtn || !currentSet) return;
    if (!currentUser) {
      bookmarkActive = false;
      paintBookmarkButton();
      bookmarkBtn.style.display = 'none';
      return;
    }
    bookmarkBtn.style.display = 'inline-flex';
    isBookmarked(currentUser.uid, setId).then(function (saved) {
      if (!currentSet) return; // content changed/unloaded meanwhile
      bookmarkActive = !!saved;
      paintBookmarkButton();
    });
  }

  function maybeLogView() {
    if (!currentUser || !currentSet || hasLoggedView) return;
    hasLoggedView = true;
    logView(currentUser.uid, {
      title: currentTitleText,
      url: window.location.pathname + window.location.search,
      type: 'paper'
    });
  }

  function updateDownloadState() {
    var downloadBtn = document.getElementById('download-btn');
    var gate = document.getElementById('login-gate');
    if (!currentSet) return;

    if (currentUser && currentUser.emailVerified) {
      gate.style.display = 'none';
      downloadBtn.style.display = 'inline-flex';
      downloadBtn.disabled = false;
      downloadBtn.textContent = 'Download PDF';
    } else if (currentUser) {
      downloadBtn.style.display = 'none';
      gate.style.display = 'flex';
      gate.querySelector('p').textContent = 'Verify your email address before downloading this paper.';
      var verifyLink = gate.querySelector('a');
      verifyLink.textContent = 'Send verification email';
      verifyLink.setAttribute('href', '#');
    } else {
      downloadBtn.style.display = 'none';
      gate.style.display = 'flex';
    }
  }

  document.getElementById('download-btn').addEventListener('click', function () {
    if (!currentUser || !currentSet || !currentUser.emailVerified) return;
    var downloadBtn = document.getElementById('download-btn');

    // Secure download: same flow as notes-view.js — only the paper id
    // leaves the browser; the Drive file id is resolved server-side.
    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Preparing download…';
    secureDownload({ type: 'paper', id: currentSet.id, name: currentTitleText })
      .catch(function (error) {
        window.alert(error.message || 'Download failed. Please try again later.');
      })
      .finally(function () {
        downloadBtn.disabled = false;
        downloadBtn.textContent = 'Download PDF';
      });
  });

  if (bookmarkBtn) {
    bookmarkBtn.addEventListener('click', function () {
      if (!currentUser || !currentSet || bookmarkBtn.disabled) return;
      bookmarkBtn.disabled = true;
      toggleBookmark(currentUser.uid, setId, bookmarkEntry()).then(function (nowSaved) {
        bookmarkActive = nowSaved;
        paintBookmarkButton();
        bookmarkBtn.disabled = false;
      }).catch(function () {
        bookmarkBtn.disabled = false;
      });
    });
  }

  document.getElementById('login-gate-link').addEventListener('click', function (event) {
    if (!currentUser || currentUser.emailVerified) return;
    event.preventDefault();
    sendEmailVerification(currentUser).then(function () {
      document.querySelector('#login-gate p').textContent = 'Verification email sent. Verify it, then refresh this page.';
    }).catch(function () {
      document.querySelector('#login-gate p').textContent = 'Could not send the verification email. Please try again later.';
    });
  });

  onAuthStateChanged(auth, function (user) {
    currentUser = user;
    updateDownloadState();
    updateBookmarkState();
    maybeLogView();
  });
});
