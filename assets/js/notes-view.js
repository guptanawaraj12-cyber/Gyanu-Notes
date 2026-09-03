// Gyanu Notes â€” chapter viewer: loads note data, shows preview, gates download behind login

import { auth, db } from "/assets/js/firebase-config.js?v=2";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { logView } from "/assets/js/history.js";
import { getNotesData } from "/assets/js/content-store.js";
import { isBookmarked, toggleBookmark } from "/assets/js/bookmarks.js";
import { secureDownload } from "/assets/js/secure-download.js?v=2";

document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var noteId = params.get('id');
  var currentUser = null;
  var currentChapter = null;
  var hasLoggedView = false;
  var hasInlineContent = false;
  var inlineHtml = null;
  var currentFileLabel = 'gyanu-notes';
  var currentMeta = '';
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
      downloadBtn.parentElement.style.display = 'none';
      var shareBtn = document.getElementById('share-btn');
      if (shareBtn) shareBtn.style.display = 'none';
      return;
    }

    currentChapter = found.chapter;
    var classInfo = data.classes.find(function (c) { return c.slug === found.classSlug; });
    var subjectInfo = data.subjects.find(function (s) { return s.slug === found.subjectSlug; });
    var classLabel = classInfo ? classInfo.label : found.classSlug;
    var subjectLabel = subjectInfo ? subjectInfo.label : found.subjectSlug;
    currentMeta = classLabel + ' Â· ' + subjectLabel;

    document.title = currentChapter.title + ' â€” Gyanu Notes';
    document.getElementById('page-title').textContent = currentChapter.title + ' â€” Gyanu Notes';
    heading.textContent = currentChapter.title;
    breadcrumb.innerHTML =
      '/ <a href="/notes/' + found.classSlug + '/">' + classLabel + '</a>' +
      ' / <a href="/notes/' + found.classSlug + '/' + found.subjectSlug + '/">' + subjectLabel + '</a>' +
      ' / ' + currentChapter.title;

    // Inline HTML content wins when present; otherwise embed Drive preview
    // (real files need a real driveFileId â€” currently placeholder).
    loadInlineContent().then(function (html) {
      if (html) {
        hasInlineContent = true;
        inlineHtml = html;
        holder.innerHTML = '<div class="chapter-content">' + html + '</div>';
      } else if (validDriveId(currentChapter.driveFileId)) {
        var previewSrc = 'https://drive.google.com/file/d/' + currentChapter.driveFileId + '/preview';
        holder.innerHTML = '<iframe class="viewer-frame" src="' + previewSrc + '" allow="autoplay"></iframe>';
      } else {
        holder.innerHTML = '<div class="empty-state" style="padding: 40px 0; color: var(--ink-faint);">No preview or file is attached to this chapter yet.</div>';
      }
      updateDownloadState();
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
    if (star) star.textContent = bookmarkActive ? 'â˜…' : 'â˜†';
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

  function validDriveId(value) {
    // The bundled catalogue ships entries with a placeholder id until real
    // files are uploaded; it matches the shape test below, so reject it
    // explicitly (same treatment as the download Cloud Function).
    return typeof value === 'string' &&
      value.trim() !== 'REPLACE_WITH_REAL_DRIVE_FILE_ID' &&
      /^[-\w]{20,}$/.test(value.trim());
  }

  function updateDownloadState() {
    var downloadBtn = document.getElementById('download-btn');
    var gate = document.getElementById('login-gate');
    var dlNotes = document.getElementById('dl-notes');
    var dlHand = document.getElementById('dl-handwritten');
    if (!downloadBtn || !gate || !dlNotes || !dlHand || !currentChapter) return;

    var htmlOk = hasInlineContent && !!inlineHtml;
    var handOk = validDriveId(currentChapter.handwrittenDriveId);
    var pdfOk = validDriveId(currentChapter.driveFileId);
    var notesIsPdf = !htmlOk && pdfOk;
    var verified = !!(currentUser && currentUser.emailVerified);

    // The menu appears whenever at least one downloadable file exists.
    if (!htmlOk && !pdfOk && !handOk) {
      downloadBtn.parentElement.style.display = 'none';
      gate.style.display = 'none';
      return;
    }
    downloadBtn.parentElement.style.display = 'inline-flex';

    // Item 1 â€” the written notes as a branded PDF when the chapter is
    // written on the site, otherwise the chapter's Drive PDF.
    // Every download is for signed-in, verified accounts.
    dlNotes.style.display = htmlOk || pdfOk ? 'block' : 'none';
    dlNotes.disabled = !verified;
    dlNotes.innerHTML = notesIsPdf
      ? 'Download notes (PDF)<small>The full PDF of this chapter from Drive</small>'
      : 'Download notes (PDF)<small>The written notes, branded and page-formatted</small>';

    // Item 2 â€” the handwritten Drive PDF (only when a link is set).
    dlHand.style.display = handOk ? 'block' : 'none';
    dlHand.disabled = !verified;

    if (verified) {
      gate.style.display = 'none';
    } else {
      gate.style.display = 'flex';
      gate.querySelector('p').textContent = currentUser
        ? 'Verify your email address before downloading.'
        : 'Log in to download the notes. Viewing the preview above is free for everyone.';
      var verifyLink = gate.querySelector('a');
      if (currentUser) {
        verifyLink.textContent = 'Send verification email';
        verifyLink.setAttribute('href', '#');
      } else {
        verifyLink.textContent = 'Log in';
        verifyLink.setAttribute('href', '/login/');
      }
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

  // Download menu: toggle, close on outside click / Esc, and the two items.
  var menuBtn = document.getElementById('download-btn');
  var menuPanel = document.getElementById('download-panel');
  function closeMenu() {
    if (!menuPanel) return;
    menuPanel.classList.remove('open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }
  if (menuBtn && menuPanel) {
    menuBtn.addEventListener('click', function (event) {
      event.stopPropagation();
      var open = menuPanel.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('click', function (event) {
      if (!event.target.closest || !event.target.closest('.download-menu')) closeMenu();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }

  // Written notes â†’ branded PDF. A static site cannot emit a real PDF file
  // client-side without heavy rasterising libraries, so we build a clean A4
  // print document (Gyanu Notes header + chapter content + footer) in a
  // hidden iframe and open the print dialog â€” whose destination defaults to
  // "Save as PDF" in Chrome and Edge.
  function printBrandedNotesPdf() {
    if (!inlineHtml || !currentChapter) return;
    var title = currentChapter.title || 'Chapter notes';
    var frame = document.createElement('iframe');
    frame.setAttribute('aria-hidden', 'true');
    frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden;';
    document.body.appendChild(frame);

    var doc = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">' +
      '<title>' + title + ' â€” Gyanu Notes</title><style>' +
      '@page { size: A4; margin: 16mm 14mm; }' +
      '* { box-sizing: border-box; }' +
      'body { font-family: "Segoe UI", Arial, sans-serif; color: #1b1f24; margin: 0; line-height: 1.6; }' +
      '.pdf-head { border-bottom: 2px solid #0e7490; padding-bottom: 10px; margin-bottom: 16px; }' +
      '.brand-row img { height: 32px; vertical-align: middle; border-radius: 6px; }' +
      '.brand-name { font-size: 19px; font-weight: 700; color: #0e7490; margin-left: 8px; vertical-align: middle; }' +
      '.brand-tag { float: right; font-size: 10px; color: #5c636e; padding-top: 9px; }' +
      '.pdf-head h1 { font-size: 20px; margin: 10px 0 2px; }' +
      '.pdf-meta { font-size: 11px; color: #5c636e; margin: 0; }' +
      'h2 { font-size: 16px; border-top: 1px solid #dfe3e8; margin: 18px 0 6px; padding-top: 10px; page-break-after: avoid; }' +
      'h3 { font-size: 13.5px; margin: 13px 0 4px; page-break-after: avoid; }' +
      'h4 { font-size: 12.5px; margin: 11px 0 4px; }' +
      'p { font-size: 12px; margin: 6px 0; }' +
      'ul, ol { font-size: 12px; margin: 6px 0; padding-left: 22px; }' +
      'li { margin: 3px 0; }' +
      'strong { color: #1b1f24; }' +
      'sub, sup { font-size: 9px; }' +
      '.formula-box, .definition-box, .highlight-box, .key-takeaway, .example-box, .note-box { border: 1px solid #dfe3e8; border-radius: 6px; padding: 8px 10px; margin: 10px 0; page-break-inside: avoid; background: #f7f9fa; }' +
      '.key-takeaway { background: #e7f4f7; border-color: #0e7490; }' +
      '.formula-box p { font-family: Georgia, "Times New Roman", serif; font-style: italic; }' +
      '.def-term { font-weight: 700; color: #0e7490; }' +
      'table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 11.5px; page-break-inside: avoid; }' +
      'th, td { border: 1px solid #cfd4da; padding: 5px 7px; text-align: left; }' +
      'th { background: #eef2f4; }' +
      'figure { margin: 12px auto; text-align: center; page-break-inside: avoid; }' +
      'figure svg, figure img { max-width: 100%; height: auto; }' +
      'figcaption { font-size: 10px; color: #5c636e; }' +
      '.pdf-foot { margin-top: 22px; border-top: 1px solid #dfe3e8; padding-top: 7px; font-size: 9.5px; color: #5c636e; }' +
      '</style></head><body>' +
      '<header class="pdf-head">' +
      '<div class="brand-row"><img src="/assets/images/logo.jpeg" alt="Gyanu Notes">' +
      '<span class="brand-name">Gyanu Notes</span>' +
      '<span class="brand-tag">Free notes &amp; past papers Â· nawarajgupta.com.np</span></div>' +
      '<h1>' + title + '</h1>' +
      '<p class="pdf-meta">' + (currentMeta ? currentMeta + ' â€” Chapter notes' : 'Chapter notes') + '</p>' +
      '</header>' +
      '<div class="pdf-body">' + inlineHtml + '</div>' +
      '<footer class="pdf-foot">Downloaded from nawarajgupta.com.np â€” Â© 2026 Gyanu Notes. Free for personal study use.</footer>' +
      '</body></html>';

    frame.onload = function () {
      var win = frame.contentWindow;
      var cleaned = false;
      var cleanup = function () {
        if (cleaned) return;
        cleaned = true;
        setTimeout(function () { if (frame.parentNode) frame.parentNode.removeChild(frame); }, 400);
      };
      win.addEventListener('afterprint', cleanup);
      setTimeout(cleanup, 120000); // safety net if afterprint never fires
      win.focus();
      win.print();
    };
    frame.srcdoc = doc;
  }

  document.getElementById('dl-notes').addEventListener('click', function () {
    if (this.disabled) return;
    // Every download is for signed-in, verified accounts.
    if (!currentUser || !currentUser.emailVerified) return;
    // Written notes: build a branded, page-formatted PDF via the browser's
    // save-as-PDF print flow.
    if (hasInlineContent && inlineHtml) {
      printBrandedNotesPdf();
      return;
    }
    // Fallback for file-only chapters: direct Drive download (login-gated).
    var item = this;
    item.disabled = true;
    secureDownload({ fileId: currentChapter.driveFileId, name: currentChapter.title })
      .catch(function (error) {
        window.alert(error.message || 'Download failed. Please try again later.');
      })
      .finally(function () {
        item.disabled = false;
        updateDownloadState();
      });
  });

  document.getElementById('dl-handwritten').addEventListener('click', function () {
    if (this.disabled || !currentUser || !currentUser.emailVerified) return;
    var item = this;
    item.disabled = true;
    // Direct Drive download of the handwritten PDF (login-gated client-side).
    secureDownload({ fileId: currentChapter.handwrittenDriveId, name: currentChapter.title + ' handwritten' })
      .catch(function (error) {
        window.alert(error.message || 'Download failed. Please try again later.');
      })
      .finally(function () {
        item.disabled = false;
        updateDownloadState();
      });
  });

  var shareBtn = document.getElementById('share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', function () {
      var shareData = {
        title: document.title,
        text: currentChapter ? currentChapter.title : 'Gyanu Notes',
        url: window.location.href
      };
      if (navigator.share) {
        navigator.share(shareData).catch(function () { /* visitor dismissed the sheet */ });
      } else {
        navigator.clipboard.writeText(shareData.url).then(function () {
          shareBtn.textContent = 'Link copied âœ“';
          setTimeout(function () { shareBtn.textContent = 'Share'; }, 2000);
        }).catch(function () {
          window.prompt('Copy this link:', shareData.url);
        });
      }
    });
  }

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
