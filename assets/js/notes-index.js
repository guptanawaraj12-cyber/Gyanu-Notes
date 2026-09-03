// Gyanu Notes — renders the /notes/ landing page from editable site content
import { getNotesData } from "/assets/js/content-store.js?v=3";
import { auth } from "/assets/js/firebase-config.js?v=3";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getRecentHistory } from "/assets/js/history.js?v=3";

document.addEventListener('DOMContentLoaded', function () {
  var mineOnly = new URLSearchParams(window.location.search).get('filter') === 'mine';
  if (mineOnly) {
    renderMine();
    return;
  }
  getNotesData()
    .then(function (data) { render(data); })
    .catch(function () {
      var list = document.getElementById('recent-notes-list');
      if (list) list.innerHTML = '<p style="color: var(--ink-faint);">Could not load notes right now. Please try again later.</p>';
    });

  function render(data) {
    var classGrid = document.getElementById('class-grid');
    var subjectList = document.getElementById('subject-list');
    var footerClassLinks = document.getElementById('footer-class-links');
    var recentList = document.getElementById('recent-notes-list');
    var subjectCount = document.getElementById('subject-count');
    if (subjectCount) subjectCount.textContent = data.subjects.length + ' subjects';

    // class cards
    data.classes.forEach(function (c) {
      var num = c.label.replace(/\D/g, '');
      var a = document.createElement('a');
      a.href = '/notes/' + c.slug + '/';
      a.className = 'ticket';
      a.innerHTML = '<span class="num">' + num + '</span><span class="label">' + c.label + '</span>';
      classGrid.appendChild(a);

      var li = document.createElement('li');
      li.innerHTML = '<a href="/notes/' + c.slug + '/">' + c.label + ' notes</a>';
      footerClassLinks.appendChild(li);
    });

    // subject rows
    data.subjects.forEach(function (s) {
      var a = document.createElement('a');
      a.href = '/search/?q=' + encodeURIComponent(s.slug);
      a.className = 'subject-row';
      a.innerHTML = '<span>' + s.label + '</span><span class="arrow">&rarr;</span>';
      subjectList.appendChild(a);
    });

    // recent notes — flatten chapters, take a handful
    var recent = [];
    data.notes.slice().reverse().forEach(function (entry) {
      entry.chapters.slice().reverse().forEach(function (ch) {
        recent.push({
          title: ch.title,
          classSlug: entry.classSlug,
          subjectSlug: entry.subjectSlug
        });
      });
    });

    recentList.innerHTML = '';
    if (recent.length === 0) {
      recentList.innerHTML = '<p style="color: var(--ink-faint); font-size: 0.92rem;">No notes added yet.</p>';
      return;
    }

    recent.slice(0, 6).forEach(function (item) {
      var row = document.createElement('div');
      row.className = 'update-row';
      var classLabel = data.classes.find(function (c) { return c.slug === item.classSlug; });
      var subjectLabel = data.subjects.find(function (s) { return s.slug === item.subjectSlug; });
      row.innerHTML =
        '<span class="update-date">' + (classLabel ? classLabel.label : '') + '</span>' +
        '<span class="update-title">' + item.title + ' <span style="color: var(--ink-faint); font-weight: 400;">— ' + (subjectLabel ? subjectLabel.label : '') + '</span></span>' +
        '<a href="/notes/' + item.classSlug + '/' + item.subjectSlug + '/">View &rarr;</a>';
      recentList.appendChild(row);
    });

    // re-run tilt effect setup for newly injected .ticket cards
    document.querySelectorAll('.ticket').forEach(function (card) {
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
  }

  function renderMine() {
    onAuthStateChanged(auth, function (user) {
      if (!user) {
        window.location.href = '/login/';
        return;
      }
      document.querySelector('.page-hero h1').textContent = 'My recently viewed notes';
      document.querySelector('.page-hero .lead').textContent = 'Continue studying from where you left off.';
      var browse = document.querySelector('.browse-grid');
      if (browse) browse.closest('section').style.display = 'none';
      getRecentHistory(user.uid, 30).then(function (items) {
        var list = document.getElementById('recent-notes-list');
        var notes = items.filter(function (item) { return item.type === 'note'; });
        list.innerHTML = '';
        if (!notes.length) {
          list.innerHTML = '<p style="color: var(--ink-faint);">You have not viewed any notes yet. <a href="/notes/">Browse notes</a></p>';
          return;
        }
        notes.forEach(function (item) {
          var row = document.createElement('a');
          row.className = 'update-row';
          row.href = item.url;
          row.textContent = item.title;
          list.appendChild(row);
        });
      });
    });
  }
});
