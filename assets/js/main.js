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

    import('/assets/js/content-store.js')
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

  // mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.style.display === 'flex';
      navLinks.style.display = isOpen ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = '#fff';
      navLinks.style.padding = '16px 24px';
      navLinks.style.borderBottom = '1px solid var(--border)';
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
