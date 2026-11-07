// Gyanu Notes — shared behavior across pages

// Dark mode: apply the stored choice (or the system preference) immediately,
// then wire the navbar toggle. html[data-theme] drives the dark tokens in
// tokens.css; "auto" users simply follow their OS setting until they choose.
(function () {
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("gn_theme"); } catch (e) { /* localStorage unavailable */ }
  var system = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  root.setAttribute("data-theme", stored === "light" || stored === "dark" ? stored : system);
  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;
    var paint = function () {
      var dark = root.getAttribute("data-theme") === "dark";
      btn.textContent = dark ? "☀️" : "🌙";
      btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    };
    paint();
    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("gn_theme", next); } catch (e) { /* localStorage unavailable */ }
      paint();
    });
  });
})();

// NOTE: this is a classic (non-module) <script> loaded on every page, so it CANNOT
// use a top-level static import (that throws "Cannot use import statement outside
// a module" and breaks nav/search/stats/dropdown site-wide). Firebase is only
// needed for the homepage stats below, so the content module is loaded on demand
// with a dynamic import() right where it is used.
document.addEventListener('DOMContentLoaded', function () {
  // Everyone who asks the OS for less motion gets instantaneous state changes
  // instead of animated ones; the CSS side of this lives in base.css.
  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // Skeleton regions ship with aria-busy="true" so assistive tech waits
  // instead of reading placeholder markup. Whichever path replaces the
  // skeletons (data, empty state or error) would have to remember to clear
  // the flag, so each region releases itself as soon as its skeletons go.
  (function releaseBusyRegions() {
    var regions = document.querySelectorAll('[aria-busy="true"]');
    Array.prototype.forEach.call(regions, function (el) {
      if (!el.querySelector('.skeleton')) {
        el.removeAttribute('aria-busy');
        return;
      }
      var observer = new MutationObserver(function () {
        if (el.querySelector('.skeleton')) return;
        el.removeAttribute('aria-busy');
        observer.disconnect();
      });
      observer.observe(el, { childList: true, subtree: true });
    });
  })();

  // Count a statistic up from zero the first time it scrolls into view. The
  // final value is written straight away for reduced-motion visitors and
  // when IntersectionObserver is unavailable, so the number is never wrong.
  function animateStat(el, target) {
    if (!el) return;
    var final = String(target);
    el.setAttribute('data-value', final);
    if (reduceMotion || !('IntersectionObserver' in window)) {
      el.textContent = final;
      return;
    }
    el.textContent = '0';
    var started = false;
    var observe = new IntersectionObserver(function (entries) {
      var visible = entries.some(function (entry) { return entry.isIntersecting; });
      if (!visible || started) return;
      started = true;
      observe.disconnect();
      var start = null;
      var tick = function (now) {
        if (start === null) start = now;
        var progress = Math.min(1, (now - start) / 900);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = final;
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observe.observe(el);
  }

  function updateHomeStats() {
    var statNotes = document.getElementById('stat-notes');
    var statPapers = document.getElementById('stat-papers');
    var statSubjects = document.getElementById('stat-subjects');
    var stamp = document.querySelector('.stamp');

    if (!statNotes || !statPapers || !statSubjects) return;

    // Honest counts: only chapters/papers that can actually be opened (a
    // real Drive file id or inline site content) are counted — the bundled
    // placeholder catalogue does not inflate the numbers. The hero pill
    // reads from the same count, with neutral wording while it is small.
    function paintStamp(notesCount) {
      if (!stamp) return;
      stamp.textContent = notesCount >= 20
        ? '\u2605 ' + notesCount + ' notes \u00b7 SEE & NEB aligned'
        : '\u2605 Free \u00b7 NEB & SEE aligned';
    }

    import('/assets/js/content-store.js?v=6')
      .then(function (mod) {
        return mod.getSiteContent().then(function (content) {
          var notesData = content.notes;
          var papersData = content.papers;

          var notesCount = notesData.notes.reduce(function (sum, entry) {
            return sum + (entry.chapters || []).filter(mod.chapterUsable).length;
          }, 0);

          var papersCount = papersData.papers.reduce(function (sum, entry) {
            return sum + (entry.sets || []).filter(mod.setUsable).length;
          }, 0);

          // subjects that have at least one usable chapter anywhere
          var subjectCount = notesData.subjects.filter(function (subject) {
            return notesData.notes.some(function (entry) {
              return entry.subjectSlug === subject.slug &&
                (entry.chapters || []).some(mod.chapterUsable);
            });
          }).length;

          animateStat(statNotes, notesCount);
          animateStat(statPapers, papersCount);
          animateStat(statSubjects, subjectCount);
          paintStamp(notesCount);
        });
      })
      .catch(function () {
        animateStat(statNotes, 0);
        animateStat(statPapers, 0);
        animateStat(statSubjects, 0);
        paintStamp(0);
      });
  }

  updateHomeStats();

  // Decorate the static homepage subject links with the same decorative
  // currentColor glyphs used by the data-driven notes catalogue.
  import('/assets/js/subject-icons.js?v=1').then(function (icons) {
    document.querySelectorAll('.subject-row[href*="/search/?q="]').forEach(function (row) {
      var main = row.querySelector('.subject-main');
      if (!main || main.querySelector('.subject-icon')) return;
      var href = row.getAttribute('href') || '';
      var slug = new URL(href, window.location.origin).searchParams.get('q');
      var icon = icons.subjectIconSvg(slug);
      if (icon) main.insertAdjacentHTML('afterbegin', icon);
    });
  }).catch(function () {});

  // Homepage exam countdown preview: soonest upcoming exam per board
  // (BLE / SEE / +2) from the admin-editable examSchedule collection via
  // getExamsData(), using the shared countdown helpers.
  (async function () {
    var container = document.getElementById("exam-countdown-cards");
    if (!container) return;
    function escapeHtml(text) {
      return String(text == null ? "" : text)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    try {
      const [store, utils] = await Promise.all([
        import("/assets/js/content-store.js?v=6"),
        import("/assets/js/countdown-utils.js?v=3")
      ]);
      var exams = await store.getExamsData();
      if (!Array.isArray(exams)) exams = [];
      container.innerHTML = ["BLE", "SEE", "plus2"].map(function (board) {
        var forBoard = exams.filter(function (e) { return e && e.board === board; });
        var upcoming = forBoard
          .filter(function (e) { var d = utils.daysRemaining(e.date); return !isNaN(d) && d >= 0; })
          .sort(function (a, b) { return utils.daysRemaining(a.date) - utils.daysRemaining(b.date); });
        var exam = upcoming[0] || forBoard[0] || null;
        var iso = exam && exam.date ? exam.date : "";
        var dateText = utils.formatDate(iso);
        var bsLabel = exam && exam.dateBs ? " \u00b7 " + escapeHtml(exam.dateBs) + " BS" : "";
        var note = !exam
          ? "Exam dates are not published yet."
          : (upcoming.length ? "" : "Routine not published yet \u2014 dates are provisional.");
        return '<article class="exam-card">'
          + '<div class="exam-card-body">'
          + '<span class="tag">' + escapeHtml(utils.BOARD_LABELS[board]) + '</span>'
          + '<h3>' + escapeHtml((exam && exam.examName) || "Routine not announced") + '</h3>'
          + '<p class="exam-date">' + (dateText
            ? '<time datetime="' + escapeHtml(iso) + '">' + dateText + '</time>' + bsLabel
            : "Date not set") + '</p>'
          + utils.countdownMarkup(iso)
          + (note ? '<p class="exam-note">' + note + '</p>' : "")
          + '</div></article>';
      }).join("");
      // Keep the figures honest on a page left open past midnight.
      utils.mountCountdownTicker();
      container.removeAttribute("aria-busy");
      var status = document.getElementById("exam-countdown-status");
      if (status) {
        status.textContent = exams.length
          ? "Exam countdown loaded: " + exams.length + " exams listed."
          : "No exam dates are published yet.";
      }
    } catch (error) {
      console.warn("Exam preview unavailable:", error);
      container.removeAttribute("aria-busy");
      container.innerHTML = '<p class="muted">Exam dates are unavailable right now. '
        + '<a href="/exams/">Open the exam page</a> to try again.</p>';
      var failed = document.getElementById("exam-countdown-status");
      if (failed) failed.textContent = "Exam countdown could not be loaded.";
    }
  })();

  // mobile nav toggle — class-based (styled in layout.css) so no inline
  // styles linger and block the desktop layout after a resize
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // login dropdown
  var loginTrigger = document.querySelector('.login-trigger');
  var loginPanel = document.querySelector('.login-panel');
  if (loginTrigger && loginPanel) {
    loginTrigger.addEventListener('click', function (e) {
      if (loginTrigger.getAttribute('href') === '/login/' && loginPanel.children.length === 0) {
        return;
      }
      e.preventDefault();
      if (loginPanel.children.length > 0) {
        loginPanel.classList.toggle('open');
      }
    });
    document.addEventListener('click', function (e) {
      if (!loginTrigger.contains(e.target) && !loginPanel.contains(e.target)) {
        loginPanel.classList.remove('open');
      }
    });
  }

  // search bar
  var searchForm = document.querySelector('.search-bar');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = searchForm.querySelector('input');
      var q = encodeURIComponent(input.value.trim());
      if (q) {
        window.location.href = '/search/?q=' + q;
      }
    });
  }

  // Live suggestions on the homepage field. Loaded on demand so the combobox
  // code and content catalogue never delay the hero; the form still submits
  // when the module is unavailable.
  var siteSearchInput = document.getElementById('site-search');
  if (siteSearchInput) {
    import('/assets/js/search-suggest.js?v=2').then(function (mod) {
      mod.attachSearchSuggestions(siteSearchInput);
    }).catch(function () { /* keep the plain search form */ });
  }

  // scroll reveal animations — reduced-motion visitors get the finished state
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Staggered reveal for chapter/subject lists — floats in one by one,
  // breaks the "everything appears at once" template feel.
  var staggerLists = document.querySelectorAll('.chapter-list, .subject-list, .browse-grid');
  staggerLists.forEach(function (list) {
    list.classList.add('reveal-stagger');
  });

  // 3D tilt on class/ticket cards (pointer-only flourish; skipped when the
  // visitor prefers reduced motion, matching the CSS hover overrides)
  var tilters = (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) ? [] : document.querySelectorAll('.ticket');
  tilters.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'rotateY(' + (x * 14) + 'deg) rotateX(' + (y * -14) + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  });

  // ---------- Toast notification system ----------
  var toastContainer = null;
  function ensureToastContainer() {
    if (toastContainer) return toastContainer;
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
    return toastContainer;
  }

  window.showToast = function (message, type, duration) {
    type = type || 'info';
    duration = duration !== undefined ? duration : 4000;
    ensureToastContainer();
    var el = document.createElement('div');
    el.className = 'toast toast-' + type;
    el.innerHTML = '<span>' + (window.escapeHtml ? window.escapeHtml(message) : String(message)) + '</span><button class="toast-close" aria-label="Dismiss">✕</button>';
    var close = el.querySelector('.toast-close');
    close.style.border = 'none';
    close.style.background = 'transparent';
    close.style.color = 'inherit';
    close.style.fontSize = '1.1rem';
    close.style.cursor = 'pointer';
    close.style.padding = '0';
    close.style.lineHeight = '1';
    close.onclick = function () { dismissToast(el); };
    toastContainer.appendChild(el);
    var timer = setTimeout(function () { dismissToast(el); }, duration);
    el.dataset.timer = timer;
  };

  function dismissToast(el) {
    if (!el || !el.parentNode) return;
    clearTimeout(parseInt(el.dataset.timer || '0', 10));
    el.classList.add('toast-exit');
    el.addEventListener('animationend', function () {
      el.parentNode.removeChild(el);
    }, { once: true });
  }

  // ---------- Page transition overlay ----------
  var pageTransition = null;
  function ensurePageTransition() {
    if (pageTransition) return pageTransition;
    pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    pageTransition.innerHTML = '<div class="page-transition-content"><div class="badge badge-brand" style="font-size:0.9rem;padding:6px 12px;">Loading</div></div>';
    document.body.appendChild(pageTransition);
    return pageTransition;
  }

  window.showPageTransition = function (show) {
    var el = ensurePageTransition();
    if (show) {
      el.classList.add('is-active');
    } else {
      el.classList.remove('is-active');
    }
  };

  // ---------- Reading progress bar ----------
  var readingProgress = null;
  var readingProgressFill = null;
  function ensureReadingProgress() {
    if (readingProgress) return;
    readingProgress = document.getElementById('reading-progress');
    readingProgressFill = document.getElementById('reading-progress-fill');
    if (readingProgress) {
      readingProgress.hidden = false;
      window.addEventListener('scroll', updateReadingProgress, { passive: true });
      updateReadingProgress();
    }
  }

  function updateReadingProgress() {
    if (!readingProgress || !readingProgressFill) return;
    var winHeight = window.innerHeight;
    var docHeight = document.documentElement.scrollHeight - winHeight;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    readingProgress.style.width = Math.min(100, Math.max(0, progress)) + '%';
    readingProgress.setAttribute('aria-valuenow', Math.round(progress));
    readingProgress.setAttribute('aria-valuetext', Math.round(progress) + '% of this chapter read');
  }

  // ---------- Escape HTML helper ----------
  window.escapeHtml = function (text) {
    return String(text == null ? '' : text)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  // Initialize reading progress on chapter pages
  ensureReadingProgress();
});
