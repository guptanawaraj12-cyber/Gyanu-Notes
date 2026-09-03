// Gyanu Notes — renders the /papers/ landing page from editable site content
import { getPapersData } from "/assets/js/content-store.js";
import { auth } from "/assets/js/firebase-config.js?v=2";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getRecentHistory } from "/assets/js/history.js";

document.addEventListener('DOMContentLoaded', function () {
  var mineOnly = new URLSearchParams(window.location.search).get('filter') === 'mine';
  if (mineOnly) {
    renderMine();
    return;
  }
  getPapersData()
    .then(function (data) { render(data); })
    .catch(function () {
      document.getElementById('class-cards').innerHTML = '<p style="color: var(--ink-faint);">Could not load papers right now.</p>';
    });

  function render(data) {
    var cardsHolder = document.getElementById('class-cards');
    var footerClassLinks = document.getElementById('footer-class-links');

    data.classExamTypes.forEach(function (c) {
      var num = c.label.replace(/\D/g, '');
      var a = document.createElement('a');
      a.href = '/papers/' + c.classSlug + '/';
      a.className = 'class-card';
      a.innerHTML =
        '<span class="num">' + num + '</span>' +
        '<span class="label">' + c.label + '</span>' +
        '<span class="exam-tag">' + c.examType + '</span>';
      cardsHolder.appendChild(a);

      var li = document.createElement('li');
      li.innerHTML = '<a href="/papers/' + c.classSlug + '/">' + c.label + ' papers</a>';
      footerClassLinks.appendChild(li);
    });

    document.querySelectorAll('.class-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'rotateY(' + (x * 12) + 'deg) rotateX(' + (y * -12) + 'deg) translateY(-4px)';
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
      document.querySelector('.page-hero h1').textContent = 'My recently viewed papers';
      document.querySelector('.page-hero .lead').textContent = 'Continue studying from where you left off.';
      getRecentHistory(user.uid, 30).then(function (items) {
        var holder = document.getElementById('class-cards');
        var papers = items.filter(function (item) { return item.type === 'paper'; });
        holder.innerHTML = '';
        if (!papers.length) {
          holder.innerHTML = '<p style="color: var(--ink-faint);">You have not viewed any papers yet. <a href="/papers/">Browse papers</a></p>';
          return;
        }
        papers.forEach(function (item) {
          var link = document.createElement('a');
          link.href = item.url;
          link.className = 'class-card';
          link.textContent = item.title;
          holder.appendChild(link);
        });
      });
    });
  }
});
