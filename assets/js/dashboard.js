// Gyanu Notes — dashboard: welcome header, continue-where-left-off,
// stats row, class quick links, latest bookmarks and recent activity.

let auth, db, onAuthStateChanged, doc, getDoc,
    getRecentHistory, countHistory, clearHistory, getBookmarkCount, getBookmarks;

// Firebase loads dynamically: if it cannot be reached the dashboard shows a
// visible error with a retry (instead of a silent empty state).
(async function init() {
  try {
    const [fc, am, fs, hist, bm] = await Promise.all([
      import("/assets/js/firebase-config.js?v=3"),
      import("https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js"),
      import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js"),
      import("/assets/js/history.js?v=4"),
      import("/assets/js/bookmarks.js?v=4")
    ]);
    auth = fc.auth; db = fc.db; onAuthStateChanged = am.onAuthStateChanged;
    doc = fs.doc; getDoc = fs.getDoc;
    getRecentHistory = hist.getRecentHistory; countHistory = hist.countHistory; clearHistory = hist.clearHistory;
    getBookmarkCount = bm.getBookmarkCount; getBookmarks = bm.getBookmarks;

// Only relative paths and https links are allowed as targets, so user-stored
// urls can never become javascript: links; titles render via textContent.
function safeUrl(url) {
  if (typeof url !== 'string') return null;
  var value = url.trim();
  if (value.charAt(0) === '/') return value;
  if (/^https:\/\//i.test(value)) return value;
  return null;
}

function timeAgo(isoOrTimestamp) {
  if (!isoOrTimestamp) return '';
  var date = isoOrTimestamp.toDate ? isoOrTimestamp.toDate() : new Date(isoOrTimestamp);
  var seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  var minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
  var hours = Math.floor(minutes / 60);
  if (hours < 24) return hours + (hours === 1 ? ' hour ago' : ' hours ago');
  var days = Math.floor(hours / 24);
  if (days < 7) return days + (days === 1 ? ' day ago' : ' days ago');
  return date.toLocaleDateString();
}

  onAuthStateChanged(auth, function (user) {
    if (!user) {
      window.location.href = '/login/';
      return;
    }

  var firstName = user.displayName ? user.displayName.split(' ')[0] : 'there';
  document.getElementById('welcome-heading').textContent = 'Welcome back, ' + firstName;

  // Profile: class level.
  getDoc(doc(db, 'users', user.uid)).then(function (snap) {
    if (snap.exists()) {
      var data = snap.data();
      var tag = document.getElementById('class-tag');
      if (data.classLevel) {
        tag.textContent = 'Class ' + data.classLevel;
        tag.style.display = 'inline-block';
        renderClassLinks(data.classLevel);
      }
    }
  }).catch(function () { /* non-critical */ });

  // Stats row.
  getBookmarkCount(user.uid).then(function (n) {
    document.getElementById('stat-bookmarks').textContent = n;
  });
  countHistory(user.uid, 'note').then(function (n) {
    document.getElementById('stat-notes').textContent = n;
  });
  countHistory(user.uid, 'paper').then(function (n) {
    document.getElementById('stat-papers').textContent = n;
  });

  // Latest bookmarks.
  getBookmarks(user.uid).then(function (items) {
    renderBookmarks(items.slice(0, 5));
  });

  // Recent activity.
  getRecentHistory(user.uid, 8).then(function (items) {
    renderHistory(items);
  });
  });
  } catch (error) {
    console.warn("Dashboard could not reach Firebase:", error);
    var hero = document.querySelector('.dash-hero .container');
    if (hero) hero.insertAdjacentHTML('beforeend',
      '<p class="form-message error">Couldn\'t load content — check your connection.</p>' +
      '<p><a class="btn btn-outline" href="">Retry</a></p>');
    // The stat tiles read 0 only because Firebase never answered — hide
    // them rather than show fake-zero data beside the error banner.
    var stats = document.querySelector(".dash-stats");
    if (stats) stats.style.display = "none";
  }
})();

function renderClassLinks(classLevel) {
  var holder = document.getElementById('class-links');
  if (!/^[0-9]+$/.test(String(classLevel))) return; // user input — digits only ever form a link
  function card(href, label, title) {
    return '<a class="class-quick-card" href="' + href + '">' +
      '<div class="cq-label">' + label + '</div>' +
      '<div class="cq-title">' + title + '</div></a>';
  }
  holder.className = 'class-quick';
  holder.innerHTML =
    card('/notes/class-' + classLevel + '/', 'Your class', 'Class ' + classLevel + ' notes') +
    card('/papers/class-' + classLevel + '/', 'Your class', 'Class ' + classLevel + ' papers');
  holder.style.display = 'grid';
}

function renderBookmarks(items) {
  var list = document.getElementById('bookmarks-list');
  list.innerHTML = '';

  if (!items || items.length === 0) {
    list.innerHTML = '<div class="empty-state">Nothing saved yet — tap the ★ on any note or paper you like.</div>';
    return;
  }

  items.forEach(function (item) {
    var row = document.createElement('div');
    row.className = 'bookmark-row';
    var link = document.createElement('a');
    link.className = 'bm-link';
    var target = safeUrl(item.url);
    if (target) link.href = target;
    var tag = document.createElement('span');
    tag.className = 'type-tag';
    tag.textContent = item.type || 'Item';
    link.appendChild(tag);
    link.appendChild(document.createTextNode(item.title || 'Untitled'));
    row.appendChild(link);
    list.appendChild(row);
  });

  if (items.length >= 5) {
    var more = document.createElement('div');
    more.className = 'bookmark-row';
    more.innerHTML = '<a class="bm-link" href="/bookmarks/" style="color: var(--accent);">See all saved items &rarr;</a>';
    list.appendChild(more);
  }
}

function renderHistory(items) {
  var continueCard = document.getElementById('continue-card');
  var continueTitle = document.getElementById('continue-title');
  var continueLink = document.getElementById('continue-link');
  var historyList = document.getElementById('history-list');
  var clearBtn = document.getElementById('clear-history');

  if (!items || items.length === 0) {
    continueCard.style.display = 'none';
    historyList.innerHTML = '<div class="empty-state">No activity yet &mdash; browse some notes or papers to see them here.</div>';
    clearBtn.style.display = 'none';
    return;
  }

  clearBtn.style.display = 'inline-flex';
  clearBtn.onclick = function () {
    if (!auth.currentUser || !confirm('Clear your entire viewing history?')) return;
    clearBtn.disabled = true;
    clearBtn.textContent = 'Clearing\u2026';
    clearHistory(auth.currentUser.uid).then(function () {
      historyList.innerHTML = '<div class="empty-state">Your viewing history was cleared.</div>';
      continueCard.style.display = 'none';
      clearBtn.style.display = 'none';
      document.getElementById('stat-notes').textContent = '0';
      document.getElementById('stat-papers').textContent = '0';
    }).catch(function () {
      clearBtn.disabled = false;
      clearBtn.textContent = 'Clear viewing history';
    });
  };

  var latest = items[0];
  continueTitle.textContent = latest.title;
  var continueUrl = safeUrl(latest.url);
  if (continueUrl) continueLink.setAttribute('href', continueUrl);
  continueCard.style.display = 'flex';

  var rest = items.slice(1);
  historyList.innerHTML = '';

  if (rest.length === 0) {
    historyList.innerHTML = '<div class="empty-state">That\'s your only activity so far.</div>';
    return;
  }

  rest.forEach(function (item) {
    var row = document.createElement('a');
    var target = safeUrl(item.url);
    if (target) row.href = target;
    row.className = 'history-row';
    var title = document.createElement('span');
    title.className = 'title';
    var tag = document.createElement('span');
    tag.className = 'type-tag';
    tag.textContent = item.type || 'Item';
    title.appendChild(tag);
    title.appendChild(document.createTextNode(item.title || 'Untitled'));
    var time = document.createElement('span');
    time.className = 'time';
    time.textContent = timeAgo(item.viewedAt);
    row.appendChild(title);
    row.appendChild(time);
    historyList.appendChild(row);
  });
}