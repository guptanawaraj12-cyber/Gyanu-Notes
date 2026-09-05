// Gyanu Notes — shared behavior across pages
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

    if (!statNotes || !statPapers || !statSubjects) return;

    import('/assets/js/content-store.js?v=5')
      .then(function (mod) { return mod.getSiteContent(); })
      .then(function (content) {
        var notesData = content.notes;
        var papersData = content.papers;

        var notesCount = notesData.notes.reduce(function (sum, entry) {
          return sum + (entry.chapters ? entry.chapters.length : 0);
        }, 0);

        var papersCount = papersData.papers.reduce(function (sum, entry) {
          return sum + (entry.sets ? entry.sets.length : 0);
        }, 0);

        var subjectCount = notesData.subjects ? notesData.subjects.length : 0;

        statNotes.textContent = notesCount.toString();
        statPapers.textContent = papersCount.toString();
        statSubjects.textContent = subjectCount.toString();
      })
      .catch(function () {
        statNotes.textContent = '0';
        statPapers.textContent = '0';
        statSubjects.textContent = '0';
      });
  }

  updateHomeStats();

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
        import("/assets/js/content-store.js?v=5"),
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
