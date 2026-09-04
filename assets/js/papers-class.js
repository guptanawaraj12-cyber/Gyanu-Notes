// Gyanu Notes — renders filterable paper results for /papers/{class-slug}/
import { getPapersData } from "/assets/js/content-store.js?v=4";

document.addEventListener('DOMContentLoaded', function () {
  var parts = window.location.pathname.split('/').filter(Boolean); // ["papers","class-10"]
  var classSlug = parts[1] || '';
  var activeYear = null;
  var activeSubject = null;
  var pageData = null;

  getPapersData()
    .then(function (data) { init(data); })
    .catch(function () {
      document.getElementById('page-heading').textContent = 'Could not load papers';
    });

  function init(data) {
    pageData = data;
    var classInfo = data.classExamTypes.find(function (c) { return c.classSlug === classSlug; });
    var classLabel = classInfo ? classInfo.label : classSlug;
    var examType = classInfo ? classInfo.examType : '';

    document.title = classLabel + ' past papers — Gyanu Notes';
    document.getElementById('page-title').textContent = classLabel + ' past papers — Gyanu Notes';
    document.getElementById('breadcrumb-trail').textContent = '/ ' + classLabel;
    document.getElementById('page-heading').textContent = classLabel + ' — ' + examType + ' past papers';
    document.getElementById('page-sub').textContent = 'Filter by year and subject to find the paper you need.';

    var classPapers = data.papers.filter(function (p) { return p.classSlug === classSlug; });

    // year chips, most recent first
    var years = Array.from(new Set(classPapers.map(function (p) { return p.year; }))).sort().reverse();
    var yearHolder = document.getElementById('year-chips');
    var allYearChip = makeChip('All years', null, true);
    yearHolder.appendChild(allYearChip);
    years.forEach(function (y) { yearHolder.appendChild(makeChip(y, y, false)); });

    // subject chips — only subjects that actually have papers for this class
    var subjectSlugs = Array.from(new Set(classPapers.map(function (p) { return p.subjectSlug; })));
    var subjectHolder = document.getElementById('subject-chips');
    var allSubjectChip = makeChip('All subjects', null, true);
    subjectHolder.appendChild(allSubjectChip);
    subjectSlugs.forEach(function (slug) {
      var subj = data.subjects.find(function (s) { return s.slug === slug; });
      subjectHolder.appendChild(makeChip(subj ? subj.label : slug, slug, false));
    });

    function makeChip(label, value, isAllOption) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip' + (isAllOption ? ' active' : '');
      chip.textContent = label;
      chip.dataset.value = value === null ? '' : value;
      chip.addEventListener('click', function () {
        var group = chip.parentElement;
        var isYearGroup = group.id === 'year-chips';
        group.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        if (isYearGroup) {
          activeYear = value;
        } else {
          activeSubject = value;
        }
        renderResults(classPapers, data);
      });
      return chip;
    }

    renderResults(classPapers, data);
  }

  function renderResults(classPapers, data) {
    var grid = document.getElementById('results-grid');
    grid.innerHTML = '';

    var filtered = classPapers.filter(function (p) {
      var yearMatch = !activeYear || p.year === activeYear;
      var subjectMatch = !activeSubject || p.subjectSlug === activeSubject;
      return yearMatch && subjectMatch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="empty-state">No papers match these filters yet.</div>';
      return;
    }

    // sort by year desc, then subject label
    filtered.sort(function (a, b) { return b.year.localeCompare(a.year); });

    filtered.forEach(function (entry) {
      var subj = data.subjects.find(function (s) { return s.slug === entry.subjectSlug; });
      var card = document.createElement('div');
      card.className = 'paper-card';

      var setsHtml = entry.sets.map(function (set) {
        return '<a class="set-link" href="/papers/view/?id=' + encodeURIComponent(set.id) + '"><span>' + set.label + '</span><span>&rarr;</span></a>';
      }).join('');

      card.innerHTML =
        '<div class="subject">' + (subj ? subj.label : entry.subjectSlug) + '</div>' +
        '<div class="year">' + entry.year + '</div>' +
        '<div class="set-links">' + setsHtml + '</div>';

      grid.appendChild(card);
    });
  }
});

