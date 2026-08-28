// Gyanu Notes — chapter viewer: loads note data, shows preview, gates download behind login

import { auth, db } from "/assets/js/firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { logView } from "/assets/js/history.js";
import { getNotesData } from "/assets/js/content-store.js";
import { isBookmarked, toggleBookmark } from "/assets/js/bookmarks.js";
import { secureDownload } from "/assets/js/secure-download.js";

document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var noteId = params.get('id');
  var currentUser = null;
  var currentChapter = null;
  var hasLoggedView = false;
  var hasInlineContent = false;
  var bookmarkBtn = document.getElementById('bookmark-btn');
  var bookmarkActive = false;

  getNotesData()
    .then(function (data) { render(data); })
    .catch(function () {
      document.getElementById('note-heading').textContent = 'Could not load this note';
    });

  function findChapter(data, id) {
    for (var i = 0; i < data.notes.length; i++) {
      var entry = data.notes[i];
      var match = entry.chapters.find(function (ch) { return ch.id === id; });
      if (match) {
        return { chapter: match, classSlug: entry.classSlug, subjectSlug: entry.subjectSlug };
      }
    }
    return null;
  }

  // Inline note content: the admin-editable version lives in Firestore
  // (chapterContent/{id}); the bundled /assets/content file is the fallback.
  // When present either way it is rendered instead of the Drive preview.
  async function loadInlineContent() {
    try {
      var snapshot = await getDoc(doc(db, "chapterContent", noteId));
      if (snapshot.exists()) {
        var published = snapshot.data().html;
        if (typeof published === "string" && published.trim()) return published;
      }
    } catch (error) { /* fall through to the bundled file */ }
    try {
      var res = await fetch('/assets/content/' + encodeURIComponent(noteId) + '.html');
      return res.ok ? await res.text() : null;
    } catch (error) { return null; }
  }

  function render(data) {
    var found = findChapter(data, noteId);
    var holder = document.getElementById('viewer-holder');
    var heading = document.getElementById('note-heading');
    var breadcrumb = document.getElementById('breadcrumb-trail');
    var downloadBtn = document.getElementById('download-btn');

    if (!found) {
      heading.textContent = 'Note not found';
      holder.innerHTML = '<div class="empty-state" style="padding: 40px 0; color: var(--ink-faint);">This chapter could not be found. It may have been moved or removed.</div>';
      downloadBtn.style.display = 'none';
      return;
    }

    currentChapter = found.chapter;
    var classInfo = data.classes.find(function (c) { return c.slug === found.classSlug; });
    var subjectInfo = data.subjects.find(function (s) { return s.slug === found.subjectSlug; });
    var classLabel = classInfo ? classInfo.label : found.classSlug;
    var subjectLabel = subjectInfo ? subjectInfo.label : found.subjectSlug;

    document.title = currentChapter.title + ' — Gyanu Notes';
    document.getElementById('page-title').textContent = currentChapter.title + ' — Gyanu Notes';
    heading.textContent = currentChapter.title;
    breadcrumb.innerHTML =
      '/ <a href="/notes/' + found.classSlug + '/">' + classLabel + '</a>' +
      ' / <a href="/notes/' + found.classSlug + '/' + found.subjectSlug + '/">' + subjectLabel + '</a>' +
      ' / ' + currentChapter.title;

    // Inline HTML content wins when present; otherwise embed Drive preview
    // (real files need a real driveFileId — currently placeholder).
    loadInlineContent().then(function (html) {
      if (html) {
        hasInlineContent = true;
        holder.innerHTML = '<div class="chapter-content">' + html + '</div>';
        updateDownloadState();
      } else {
        var previewSrc = 'https://drive.google.com/file/d/' + currentChapter.driveFileId + '/preview';
        holder.innerHTML = '<iframe class="viewer-frame" src="' + previewSrc + '" allow="autoplay"></iframe>';
      }
    });

    updateDownloadState();
    updateBookmarkState();
    maybeLogView();
  }

  function bookmarkEntry() {
    return {
      title: currentChapter.title,
      url: window.location.pathname + window.location.search,
      type: 'note'
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
    if (!bookmarkBtn || !currentChapter) return;
    if (!currentUser) {
      bookmarkActive = false;
      paintBookmarkButton();
      bookmarkBtn.style.display = 'none';
      return;
    }
    bookmarkBtn.style.display = 'inline-flex';
    isBookmarked(currentUser.uid, noteId).then(function (saved) {
      if (!currentChapter) return; // content changed/unloaded meanwhile
      bookmarkActive = !!saved;
      paintBookmarkButton();
    });
  }

  function maybeLogView() {
    if (!currentUser || !currentChapter || hasLoggedView) return;
    hasLoggedView = true;
    logView(currentUser.uid, {
      title: currentChapter.title,
      url: window.location.pathname + window.location.search,
      type: 'note'
    });
  }

  function updateDownloadState() {
    var downloadBtn = document.getElementById('download-btn');
    var gate = document.getElementById('login-gate');
    if (!currentChapter) return;

    // With full inline notes there is no PDF to download — hide the flow.
    if (hasInlineContent) {
      gate.style.display = 'none';
      downloadBtn.style.display = 'none';
      return;
    }

    if (currentUser && currentUser.emailVerified) {
      gate.style.display = 'none';
      downloadBtn.style.display = 'inline-flex';
      downloadBtn.disabled = false;
      downloadBtn.textContent = 'Download PDF';
    } else if (currentUser) {
      downloadBtn.style.display = 'none';
      gate.style.display = 'flex';
      gate.querySelector('p').textContent = 'Verify your email address before downloading this file.';
      var verifyLink = gate.querySelector('a');
      verifyLink.textContent = 'Send verification email';
      verifyLink.setAttribute('href', '#');
    } else {
      downloadBtn.style.display = 'none';
      gate.style.display = 'flex';
    }
  }

  // Tab switching inside injected chapter content (delegated: innerHTML
  // scripts never run, so clicks are caught here).
  document.addEventListener('click', function (event) {
    var btn = event.target.closest ? event.target.closest('.tab-btn') : null;
    if (!btn) return;
    var wrap = btn.closest('.ntabs');
    if (!wrap) return;
    var tabs = wrap.querySelectorAll('.tab-btn');
    var panels = wrap.querySelectorAll('.tab-panel');
    for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove('active');
    for (var j = 0; j < panels.length; j++) panels[j].classList.remove('active');
    btn.classList.add('active');
    var target = wrap.querySelector('#' + btn.getAttribute('data-tab'));
    if (target) target.classList.add('active');
  });

  document.getElementById('download-btn').addEventListener('click', function () {
    if (!currentUser || !currentChapter || !currentUser.emailVerified) return;
    var downloadBtn = document.getElementById('download-btn');

    // Secure download: the browser only sends the chapter id. The Cloud
    // Function verifies the caller's ID token and verified email, looks up
    // the real Drive file server-side, and streams the bytes through — so
    // no reusable Drive link is ever exposed in the page source.
    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Preparing download…';
    secureDownload({ type: 'note', id: currentChapter.id, name: currentChapter.title })
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
      if (!currentUser || !currentChapter || bookmarkBtn.disabled) return;
      bookmarkBtn.disabled = true;
      toggleBookmark(currentUser.uid, noteId, bookmarkEntry()).then(function (nowSaved) {
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
