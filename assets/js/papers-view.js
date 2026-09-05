// Gyanu Notes — paper viewer: loads paper data, shows preview, gates download behind login

import { getPapersData } from "/assets/js/content-store.js?v=5";

// Firebase loads dynamically — the paper preview renders regardless; sign-in
// features activate once it arrives.
let auth, onAuthStateChanged, sendEmailVerification, logView, isBookmarked, toggleBookmark, secureDownload;
let fbReady = Promise.resolve();

document.addEventListener('DOMContentLoaded', function () {
  var params = new URLSearchParams(window.location.search);
  var setId = params.get('id');
  var currentUser = null;
  var currentSet = null;
  var currentTitleText = '';
  var hasLoggedView = false;
  var bookmarkBtn = document.getElementById('bookmark-btn');
  var bookmarkActive = false;

  fbReady = (async function () {
    try {
      const [fc, am, hist, bm, sd] = await Promise.all([
        import("/assets/js/firebase-config.js?v=3"),
        import("https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"),
        import("/assets/js/history.js?v=4"),
        import("/assets/js/bookmarks.js?v=4"),
        import("/assets/js/secure-download.js?v=4")
      ]);
      auth = fc.auth; onAuthStateChanged = am.onAuthStateChanged; sendEmailVerification = am.sendEmailVerification;
      logView = hist.logView; isBookmarked = bm.isBookmarked; toggleBookmark = bm.toggleBookmark; secureDownload = sd.secureDownload;
      onAuthStateChanged(auth, function (user) {
        currentUser = user;
        updateDownloadState();
        updateBookmarkState();
        maybeLogView();
      });
    } catch (error) {
      console.warn("Viewer sign-in features unavailable:", error);
    }
  })();

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

    // Embedded Drive preview; placeholder/malformed ids get an empty state
    // instead of a broken iframe.
    if (validDriveId(currentSet.driveFileId)) {
      var previewSrc = 'https://drive.google.com/file/d/' + currentSet.driveFileId + '/preview';
      holder.innerHTML = '<iframe class="viewer-frame" src="' + previewSrc + '" allow="autoplay"></iframe>';
    } else {
      holder.innerHTML = '<div class="empty-state" style="padding: 40px 0; color: var(--ink-faint);">No preview file is attached to this paper yet. Check back soon.</div>';
    }

    updateDownloadState();
    updateBookmarkState();
    maybeLogView();
  }

  // Same placeholder/shape check as notes-view.js — a placeholder or
  // malformed id must never produce a broken Drive iframe or download.
  function validDriveId(value) {
    return typeof value === 'string' &&
      value.trim() !== 'REPLACE_WITH_REAL_DRIVE_FILE_ID' &&
      /^[-\w]{20,}$/.test(value.trim());
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

    var gateText = gate.querySelector('p');
    var gateLink = gate.querySelector('a');
    gateLink.style.display = '';

    if (currentUser && currentUser.emailVerified) {
      if (validDriveId(currentSet.driveFileId)) {
        gate.style.display = 'none';
        downloadBtn.style.display = 'inline-flex';
        downloadBtn.disabled = false;
        downloadBtn.textContent = 'Download PDF';
      } else {
        downloadBtn.style.display = 'none';
        gateLink.style.display = 'none';
        gateText.textContent = 'No downloadable file is attached to this paper yet.';
        gate.style.display = 'flex';
      }
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

    // Direct Drive download (login-gated client-side, same as notes-view.js).
    downloadBtn.disabled = true;
    downloadBtn.textContent = 'Preparing download…';
    secureDownload({ fileId: currentSet.driveFileId, name: currentTitleText })
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

  // Share on WhatsApp: message = title + direct page URL (pure client-side).
  var waBtn = document.getElementById('whatsapp-share');
  if (waBtn) {
    waBtn.addEventListener('click', function (event) {
      event.preventDefault();
      var title = currentTitleText || (currentSet ? currentSet.title : '') || 'this paper';
      var text = 'Check out ' + title + ' on Gyanu Notes: ' + window.location.href;
      window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener');
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


  // --- Was this helpful? (papers) — mirrors the note viewer's widget --------
  // Writes to the same write-only feedback collection; silent on failure.
  function initFeedbackWidget(id) {
    var widget = document.getElementById('feedback-widget');
    if (!widget || !id) return;
    var prompt = widget.querySelector('.feedback-prompt');
    var btns = widget.querySelector('.feedback-btns');
    var upBtn = document.getElementById('fb-up');
    var downBtn = document.getElementById('fb-down');
    var thanks = widget.querySelector('.feedback-thanks');
    var fbKey = 'paper_feedback_' + id;
    var alreadyVoted = false;
    try { alreadyVoted = localStorage.getItem(fbKey) === 'true'; } catch (e) {}
    if (alreadyVoted) {
      if (prompt) prompt.style.display = 'none';
      if (btns) btns.style.display = 'none';
      if (thanks) thanks.style.display = 'block';
      widget.style.display = 'block';
      return;
    }
    widget.style.display = 'block';
    function submitVote(vote) {
      if (upBtn.disabled) return;
      upBtn.disabled = true; downBtn.disabled = true;
      upBtn.setAttribute('aria-pressed', vote === 'up' ? 'true' : 'false');
      downBtn.setAttribute('aria-pressed', vote === 'down' ? 'true' : 'false');
      if (prompt) prompt.style.display = 'none';
      if (btns) btns.style.display = 'none';
      if (thanks) thanks.style.display = 'block';
      try { localStorage.setItem(fbKey, 'true'); } catch (e) {}
      (async function () {
        try {
          const [{ db }, fs] = await Promise.all([
            import("/assets/js/firebase-config.js?v=3"),
            import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js")
          ]);
          await fs.addDoc(fs.collection(db, "feedback"), {
            noteId: id,
            vote: vote,
            uid: (currentUser && currentUser.uid) || null,
            submittedAt: fs.serverTimestamp()
          });
        } catch (error) { console.debug("Feedback not recorded:", error); }
      })();
    }
    if (upBtn) upBtn.addEventListener('click', function () { submitVote('up'); });
    if (downBtn) downBtn.addEventListener('click', function () { submitVote('down'); });
  }
  fbReady.then(function () { try { initFeedbackWidget(setId); } catch (e) {} });

});
