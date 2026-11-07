// Gyanu Notes — renders the /notes/ landing page from editable site content
import { getNotesData, chapterUsable } from "/assets/js/content-store.js?v=6";
import { subjectIconSvg } from "/assets/js/subject-icons.js?v=1";

document.addEventListener('DOMContentLoaded', function () {
  var mineOnly = new URLSearchParams(window.location.search).get('filter') === 'mine';
  if (mineOnly) {
    renderMine();
    return;
  }
  getNotesData()
    .then(function (data) { render(data); })
    .catch(function () {
      // Every skeleton region gets a real message, so nothing keeps pulsing
      // and main.js can release the aria-busy flag on each of them.
      var message = '<div class="empty-state">Couldn\'t load content — check your connection. '
        + '<a class="btn btn-outline" href="">Retry</a></div>';
      ['recent-notes-list', 'class-grid', 'subject-list'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.innerHTML = message;
      });
    });

  function render(data) {
    var classGrid = document.getElementById('class-grid');
    var subjectList = document.getElementById('subject-list');
    var footerClassLinks = document.getElementById('footer-class-links');
    var recentList = document.getElementById('recent-notes-list');
    var subjectCount = document.getElementById('subject-count');
    footerClassLinks.innerHTML = ''; // clear the static fallback links shipped in the HTML

    // wipe skeleton placeholders (and any stale content) before rendering
    classGrid.innerHTML = '';
    subjectList.innerHTML = '';

    // Honest listings: only subjects/classes with at least one usable
    // chapter (real Drive file or inline content) are shown.
    var usableBySubject = {};
    data.notes.forEach(function (entry) {
      var n = (entry.chapters || []).filter(chapterUsable).length;
      if (n) usableBySubject[entry.subjectSlug] = (usableBySubject[entry.subjectSlug] || 0) + n;
    });
    var subjectsWithContent = (data.subjects || []).filter(function (s) { return usableBySubject[s.slug]; });
var subjectSlugsFromNotes = Object.keys(usableBySubject).filter(function (slug) {
  return !subjectsWithContent.some(function (s) { return s.slug === slug; });
});
subjectSlugsFromNotes.forEach(function (slug) { subjectsWithContent.push({ slug: slug, label: slug }); });
    var classesWithContent = data.classes.filter(function (c) {
      return data.notes.some(function (entry) {
        return entry.classSlug === c.slug && (entry.chapters || []).some(chapterUsable);
      });
    });

    if (subjectCount) subjectCount.textContent = subjectsWithContent.length + ' subject' + (subjectsWithContent.length === 1 ? '' : 's');

    // class cards
    if (classesWithContent.length === 0) {
      classGrid.innerHTML = '<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg><h3>New notes are on the way</h3><p>We are preparing notes for all classes. Check back soon.</p><a class="btn btn-outline" href="/exams/">View exam dates</a></div>';
    } else {
      classesWithContent.forEach(function (c) {
        var num = c.label.replace(/\D/g, '');
        var a = document.createElement('a');
        a.href = '/notes/' + c.slug + '/';
        a.className = 'ticket';
        a.innerHTML = '<span class="num">' + num + '</span><span class="label">' + c.label + '</span>';
        classGrid.appendChild(a);
      });
    }

    // footer class links stay complete — they are site navigation
    data.classes.forEach(function (c) {
      var li = document.createElement('li');
      li.innerHTML = '<a href="/notes/' + c.slug + '/">' + c.label + ' notes</a>';
      footerClassLinks.appendChild(li);
    });

    // subject rows, with usable chapter counts
    if (subjectsWithContent.length === 0) {
      subjectList.innerHTML = '<div class="empty-state">Subjects are coming soon.</div>';
    } else {
      subjectsWithContent.forEach(function (s) {
        var a = document.createElement('a');
        a.href = '/search/?q=' + encodeURIComponent(s.slug);
        a.className = 'subject-row';
        var n = usableBySubject[s.slug];
        a.innerHTML = '<span class="subject-main">' + subjectIconSvg(s.slug) + s.label +
          '<span class="subject-meta">\u00b7 ' + n + ' chapter' + (n === 1 ? '' : 's') + '</span></span>' +
          '<span class="arrow">&rarr;</span>';
        subjectList.appendChild(a);
      });
    }

    // recent notes — flatten usable chapters, take a handful
    var recent = [];
    data.notes.slice().reverse().forEach(function (entry) {
      (entry.chapters || []).filter(chapterUsable).slice().reverse().forEach(function (ch) {
        recent.push({
          title: ch.title,
          classSlug: entry.classSlug,
          subjectSlug: entry.subjectSlug
        });
      });
    });

    recentList.innerHTML = '';
    if (recent.length === 0) {
      recentList.innerHTML = '<p style="color: var(--ink-faint); font-size: 0.92rem;">No notes available yet &mdash; new chapters are coming soon.</p>';
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

    // re-run tilt effect setup for newly injected .ticket cards (pointer only)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
  }

  function renderMine() {
    (async function () {
      try {
        const [{ auth }, { onAuthStateChanged }] = await Promise.all([
          import("/assets/js/firebase-config.js?v=3"),
          import("https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js")
        ]);
        const { getRecentHistory } = await import("/assets/js/history.js?v=4");
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
               var safe = (typeof item.url === 'string' && (item.url.charAt(0) === '/' || /^https:\/\//i.test(item.url.trim()))) ? item.url.trim() : null;
               if (!safe) return;
               var row = document.createElement('a');
               row.className = 'update-row';
               row.href = safe;
               row.textContent = item.title;
               list.appendChild(row);
             });
          });
        });
      } catch (error) {
        var list = document.getElementById('recent-notes-list');
        if (list) list.innerHTML = '<p class="muted">Couldn\'t load content — check your connection.</p><p><a class="btn btn-outline" href="">Retry</a></p>';
      }
    })();
  }
});
