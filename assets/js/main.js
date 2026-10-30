// Gyanu Notes — shared behavior across pages

// Dark mode: apply the stored choice (or the system preference) immediately,
// then wire the navbar toggle. html[data-theme] drives the dark tokens in
// tokens.css; "auto" users simply follow their OS setting until they choose.
(function () {
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("gn_theme"); } catch (e) {}
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
      try { localStorage.setItem("gn_theme", next); } catch (e) {}
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

          statNotes.textContent = notesCount.toString();
          statPapers.textContent = papersCount.toString();
          statSubjects.textContent = subjectCount.toString();
          paintStamp(notesCount);
        });
      })
      .catch(function () {
        statNotes.textContent = '0';
        statPapers.textContent = '0';
        statSubjects.textContent = '0';
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
        import("/assets/js/countdown-utils.js?v=1")
      ]);
      var exams = await store.getExamsData();
      if (!Array.isArray(exams)) exams = [];
      container.innerHTML = ["BLE", "SEE", "plus2"].map(function (board) {
        var forBoard = exams.filter(function (e) { return e && e.board === board; });
        var upcoming = forBoard
          .filter(function (e) { var d = utils.daysRemaining(e.date); return !isNaN(d) && d >= 0; })
          .sort(function (a, b) { return utils.daysRemaining(a.date) - utils.daysRemaining(b.date); });
        var exam = upcoming[0] || forBoard[0];
        var name = (exam && exam.examName) || utils.BOARD_LABELS[board];
        var countdown = upcoming.length
          ? utils.countdownText(exam.date)
          : (exam ? "Routine not published yet" : "No exams listed");
        return '<div class="exam-card"><div class="exam-card-body">'
          + '<span class="tag">' + escapeHtml(name) + '</span>'
          + '<p class="exam-countdown">' + escapeHtml(countdown) + '</p>'
          + '</div></div>';
      }).join("");
    } catch (error) {
      console.warn("Exam preview unavailable:", error);
      container.innerHTML = "";
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

  // scroll reveal animations
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
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

  // 3D tilt on class/ticket cards
  var tilters = document.querySelectorAll('.ticket');
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
});
