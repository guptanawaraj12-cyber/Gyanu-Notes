// Gyanu Notes — live search suggestions (combobox pattern).
// Enhances the existing search form: typing shows up to six matches from the
// same bundled content the /search/ page uses. Without JS the form still
// submits normally, so this is purely additive.
//
// Keyboard: ArrowDown/ArrowUp move through options, Home/End jump to the
// ends, Enter opens the highlighted option (or submits when none is active),
// Escape closes the list and keeps the typed text.

import { getSiteContent } from "/assets/js/content-store.js?v=6";

var uid = 0;

function normalize(text) {
  return String(text || "").toLowerCase();
}

export function attachSearchSuggestions(input, options) {
  if (!input) return null;
  var form = options && options.form ? options.form : input.form;
  if (!form) return null;
  var limit = (options && options.limit) || 6;
  var id = "search-suggest-" + (++uid);
  // The homepage hero clips its decorative art, which would cut the dropdown
  // off at the section edge; release that clip only while the list is open.
  var clipHost = input.closest ? input.closest(".hero") : null;

  var list = document.createElement("div");
  list.className = "search-suggest";
  list.id = id;
  list.setAttribute("role", "listbox");
  list.setAttribute("aria-label", "Search suggestions");
  list.hidden = true;
  form.appendChild(list);

  var status = document.createElement("p");
  status.className = "visually-hidden";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  form.appendChild(status);

  input.setAttribute("role", "combobox");
  input.setAttribute("aria-autocomplete", "list");
  input.setAttribute("aria-expanded", "false");
  input.setAttribute("aria-controls", id);
  input.setAttribute("autocomplete", "off");

  var items = [];
  var active = -1;
  var dataPromise = null;

  function loadData() {
    if (!dataPromise) {
      dataPromise = getSiteContent().then(function (content) {
        var entries = [];
        var seen = {};
        function push(entry) {
          var key = entry.href + "|" + entry.label;
          if (seen[key]) return;
          seen[key] = true;
          entries.push(entry);
        }
        content.notes.notes.forEach(function (note) {
          (note.chapters || []).forEach(function (chapter) {
            push({
              label: chapter.title,
              href: "/notes/view/?id=" + encodeURIComponent(chapter.id),
              meta: note.classSlug.replace("class-", "Class ") + " · " + note.subjectSlug,
              type: "Note"
            });
          });
        });
        content.papers.papers.forEach(function (paper) {
          (paper.sets || []).forEach(function (set) {
            push({
              label: set.label,
              href: "/papers/view/?id=" + encodeURIComponent(set.id),
              meta: paper.classSlug.replace("class-", "Class ") + " · " + paper.subjectSlug + (paper.year ? " · " + paper.year : ""),
              type: "Paper"
            });
          });
        });
        return entries;
      }).catch(function () { return []; });
    }
    return dataPromise;
  }

  function score(entry, terms, raw) {
    var haystack = normalize(entry.label + " " + entry.meta + " " + entry.type);
    var total = 0;
    for (var i = 0; i < terms.length; i++) {
      var at = haystack.indexOf(terms[i]);
      if (at === -1) return -1;
      total += at === 0 ? 6 : (at < 12 ? 3 : 1);
    }
    if (normalize(entry.label).indexOf(raw) === 0) total += 8;
    return total;
  }

  function close() {
    list.hidden = true;
    list.innerHTML = "";
    items = [];
    active = -1;
    if (clipHost) clipHost.classList.remove("is-suggesting");
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
    status.textContent = "";
  }

  function paintActive() {
    var options = list.querySelectorAll('[role="option"]');
    for (var i = 0; i < options.length; i++) {
      var isActive = i === active;
      options[i].classList.toggle("is-active", isActive);
      options[i].setAttribute("aria-selected", isActive ? "true" : "false");
      if (isActive) {
        input.setAttribute("aria-activedescendant", options[i].id);
        // Keep the highlighted row inside the scrolling list.
        if (options[i].scrollIntoView) options[i].scrollIntoView({ block: "nearest" });
      }
    }
    if (active === -1) input.removeAttribute("aria-activedescendant");
  }

  function go(entry) {
    if (!entry) return;
    close();
    window.location.href = entry.href;
  }

  function render(matches, raw) {
    if (!matches.length) {
      close();
      status.textContent = raw ? "No suggestions. Press Enter to search anyway." : "";
      return;
    }
    var html = "";
    matches.forEach(function (entry, index) {
      html += '<div class="search-suggest-option" role="option" aria-selected="false" id="' + id + '-opt-' + index + '">'
        + '<span class="search-suggest-label">' + escapeHtml(entry.label) + '</span>'
        + '<span class="search-suggest-meta">' + escapeHtml(entry.type + " · " + entry.meta) + '</span>'
        + '</div>';
    });
    list.innerHTML = html;
    items = matches;
    active = -1;
    list.hidden = false;
    if (clipHost) clipHost.classList.add("is-suggesting");
    input.setAttribute("aria-expanded", "true");
    Array.prototype.forEach.call(list.querySelectorAll('[role="option"]'), function (node, index) {
      // mousedown (not click) so the input keeps focus and blur does not race.
      node.addEventListener("mousedown", function (event) {
        event.preventDefault();
        go(items[index]);
      });
    });
    status.textContent = matches.length + " suggestion" + (matches.length === 1 ? "" : "s") + " available. Use the arrow keys to review them.";
  }

  function escapeHtml(text) {
    return String(text == null ? "" : text)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  var timer = null;
  function update() {
    var raw = normalize(input.value).trim();
    if (raw.length < 2) { close(); return; }
    var terms = raw.split(/\s+/);
    loadData().then(function (entries) {
      if (normalize(input.value).trim() !== raw) return; // stale keystroke
      var scored = [];
      entries.forEach(function (entry) {
        var s = score(entry, terms, raw);
        if (s >= 0) scored.push({ entry: entry, score: s });
      });
      scored.sort(function (a, b) { return b.score - a.score; });
      render(scored.slice(0, limit).map(function (hit) { return hit.entry; }), raw);
    });
  }

  input.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(update, 120);
  });

  input.addEventListener("keydown", function (event) {
    var open = !list.hidden;
    if (event.key === "ArrowDown") {
      if (!open) { update(); return; }
      event.preventDefault();
      active = Math.min(items.length - 1, active + 1);
      paintActive();
    } else if (event.key === "ArrowUp") {
      if (!open) return;
      event.preventDefault();
      active = Math.max(-1, active - 1);
      paintActive();
    } else if (event.key === "Home" && open) {
      event.preventDefault();
      active = 0;
      paintActive();
    } else if (event.key === "End" && open) {
      event.preventDefault();
      active = items.length - 1;
      paintActive();
    } else if (event.key === "Enter") {
      if (open && active >= 0) {
        event.preventDefault();
        go(items[active]);
      }
    } else if (event.key === "Escape") {
      if (open) {
        event.preventDefault();
        close();
      }
    } else if (event.key === "Tab") {
      close();
    }
  });

  // Leaving the field closes the list; the form still submits as usual.
  input.addEventListener("blur", function () { setTimeout(close, 80); });
  document.addEventListener("click", function (event) {
    if (!form.contains(event.target)) close();
  });

  return {
    close: close,
    destroy: function () {
      close();
      list.remove();
      status.remove();
    }
  };
}
