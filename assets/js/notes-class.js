// Gyanu Notes — renders the subject list for a given class, e.g. /notes/class-10/
import { getNotesData } from "/assets/js/content-store.js";

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

    // subjects that actually have at least one entry for this class
    var subjectSlugsForClass = Array.from(new Set(
      data.notes.filter(function (n) { return n.classSlug === classSlug; })
                .map(function (n) { return n.subjectSlug; })
    ));

    var list = document.getElementById('subject-list');
    list.innerHTML = '';

    if (subjectSlugsForClass.length === 0) {
      list.innerHTML = '<div class="empty-state">No subjects added yet for ' + classLabel + '. Check back soon.</div>';
      return;
    }

    subjectSlugsForClass.forEach(function (slug) {
      var subj = data.subjects.find(function (s) { return s.slug === slug; });
      var a = document.createElement('a');
      a.className = 'subject-row';
      a.href = '/notes/' + classSlug + '/' + slug + '/';
      a.innerHTML = '<span>' + (subj ? subj.label : slug) + '</span><span class="arrow">&rarr;</span>';
      list.appendChild(a);
    });
  }
});
