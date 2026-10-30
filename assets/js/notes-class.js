// Gyanu Notes — renders the subject list for a given class, e.g. /notes/class-10/
import { getNotesData, chapterUsable } from "/assets/js/content-store.js?v=6";
import { subjectIconSvg } from "/assets/js/subject-icons.js?v=1";

document.addEventListener('DOMContentLoaded', function () {
  var parts = window.location.pathname.split('/').filter(Boolean); // ["notes","class-10"]
  var classSlug = parts[1] || '';

  getNotesData()
    .then(function (data) { render(data); })
    .catch(function () {
      document.getElementById('page-heading').textContent = 'Could not load notes';
    });

  function render(data) {
    var classInfo = data.classes.find(function (c) { return c.slug === classSlug; });
    var classLabel = classInfo ? classInfo.label : classSlug;

    document.title = classLabel + ' notes — Gyanu Notes';
    document.getElementById('page-title').textContent = classLabel + ' notes — Gyanu Notes';
    document.getElementById('breadcrumb-trail').textContent = '/ ' + classLabel;
    document.getElementById('page-heading').textContent = classLabel + ' — all subjects';
    document.getElementById('page-sub').textContent = 'Pick a subject to see all available chapters.';

    // subjects with at least one usable chapter (real file or inline
    // content) for this class, each with its chapter count
    var usableBySubject = {};
    data.notes.forEach(function (entry) {
      if (entry.classSlug !== classSlug) return;
      var n = (entry.chapters || []).filter(chapterUsable).length;
      if (n) usableBySubject[entry.subjectSlug] = (usableBySubject[entry.subjectSlug] || 0) + n;
    });
    var subjectSlugsForClass = Array.from(new Set(
      data.notes.filter(function (n) { return n.classSlug === classSlug; })
                .map(function (n) { return n.subjectSlug; })
    )).filter(function (slug) { return usableBySubject[slug]; });

    var list = document.getElementById('subject-list');
    list.innerHTML = '';

    if (subjectSlugsForClass.length === 0) {
      list.innerHTML = '<div class="empty-state">' + classLabel + ' notes are coming soon &mdash; we are preparing them now.</div>';
      return;
    }

    subjectSlugsForClass.forEach(function (slug) {
      var subj = data.subjects.find(function (s) { return s.slug === slug; });
      var count = usableBySubject[slug];
      var a = document.createElement('a');
      a.className = 'subject-row';
      a.href = '/notes/' + classSlug + '/' + slug + '/';
      a.innerHTML = '<span class="subject-main">' + subjectIconSvg(slug) + (subj ? subj.label : slug) +
        '<span class="subject-meta">\u00b7 ' + count + ' chapter' + (count === 1 ? '' : 's') + '</span></span>' +
        '<span class="arrow">&rarr;</span>';
      list.appendChild(a);
    });
  }
});
