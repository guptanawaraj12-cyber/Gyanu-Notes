// Gyanu Notes — "My bookmarks" page: lists the user's saved notes/papers
// with the ability to remove them inline.

import { auth } from "/assets/js/firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getBookmarks, removeBookmark } from "/assets/js/bookmarks.js";

onAuthStateChanged(auth, function (user) {
  if (!user) {
    window.location.href = '/login/';
    return;
  }
  getBookmarks(user.uid).then(function (items) {
    render(items, user.uid);
  });
});

function render(items, uid) {
  var list = document.getElementById('bookmarks-list');

  if (!items || items.length === 0) {
    list.innerHTML = '<div class="empty-state">Nothing saved yet. Tap the ★ button on any note or paper to keep it here.</div>';
    return;
  }

  list.innerHTML = '';

  items.forEach(function (item) {
    var row = document.createElement('div');
    row.className = 'bookmark-row';

    var link = document.createElement('a');
    link.className = 'bm-link';
    link.href = item.url;
    link.innerHTML = '<span class="type-tag">' + item.type + '</span>' + item.title;
    row.appendChild(link);

    var remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'bm-remove';
    remove.textContent = 'Remove';
    remove.addEventListener('click', function () {
      remove.disabled = true;
      remove.textContent = 'Removing…';
      removeBookmark(uid, item.id).then(function () {
        row.style.opacity = '0';
        row.style.transition = 'opacity 0.25s ease';
        setTimeout(function () { row.remove(); }, 250);
        if (list.children.length <= 1) {
          list.innerHTML = '<div class="empty-state">Nothing saved yet. Tap the ★ button on any note or paper to keep it here.</div>';
        }
      }).catch(function () {
        remove.disabled = false;
        remove.textContent = 'Remove';
      });
    });
    row.appendChild(remove);

    list.appendChild(row);
  });
}