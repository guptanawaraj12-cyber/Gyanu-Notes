// Gyanu Notes — renders a chapter list page based on the URL path
import { getNotesData, chapterUsable } from "/assets/js/content-store.js?v=6";
// Works for any /notes/{class-slug}/{subject-slug}/ page using the same template

document.addEventListener('DOMContentLoaded', function () {
  var parts = window.location.pathname.split('/').filter(Boolean); // e.g. ["notes","class-10","physics"]
  var classSlug = parts[1] || '';
  var subjectSlug = parts[2] || '';

  getNotesData()
    .then(function (data) { render(data); })
    .catch(function () {
      document.getElementById('chapter-heading').textContent = 'Could not load notes';
    });

  function render(data) {
    var classInfo = data.classes.find(function (c) { return c.slug === classSlug; });
    var subjectInfo = data.subjects.find(function (s) { return s.slug === subjectSlug; });
    var entry = data.notes.find(function (n) { return n.classSlug === classSlug && n.subjectSlug === subjectSlug; });

    var classLabel = classInfo ? classInfo.label : classSlug;
    var subjectLabel = subjectInfo ? subjectInfo.label : subjectSlug;

    document.title = classLabel + ' ' + subjectLabel + ' notes — Gyanu Notes';
    document.getElementById('page-title').textContent = classLabel + ' ' + subjectLabel + ' notes — Gyanu Notes';
    document.getElementById('breadcrumb-trail').textContent = '/ ' + classLabel + ' / ' + subjectLabel;
    document.getElementById('chapter-heading').textContent = classLabel + ' — ' + subjectLabel;
    document.getElementById('chapter-sub').textContent = 'All available chapters for ' + subjectLabel + ', ' + classLabel + '.';

    var list = document.getElementById('chapter-list');
    list.innerHTML = '';

    // Only chapters that can actually be opened (real Drive file or inline
    // content) are listed; placeholder entries stay out of sight.
    var chapters = ((entry && entry.chapters) || []).filter(chapterUsable);

    if (chapters.length === 0) {
      list.innerHTML = '<div class="empty-state">' + classLabel + ' ' + subjectLabel + ' notes are coming soon &mdash; we are preparing them now.</div>';
      return;
    }

    chapters.forEach(function (ch) {
      var row = document.createElement('a');
      row.className = 'chapter-row';
      row.href = '/notes/view/?id=' + encodeURIComponent(ch.id);
      row.innerHTML = '<span class="title">' + ch.title + '</span><span class="arrow" style="color: var(--accent);">&rarr;</span>';
      list.appendChild(row);
    });
  }
});
