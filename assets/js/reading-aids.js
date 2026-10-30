// Gyanu Notes — reading aids for chapter pages.
// Builds an "On this page" table of contents from the rendered chapter
// headings and drives the reading-progress bar at the top of the viewport.
// Everything is progressive: with fewer than two headings the TOC stays
// hidden, and the progress bar only appears once real content is on the page.

// TOC entry points get stable ids derived from their own text, so a heading
// added by an editor still yields a shareable #anchor.
function uniqueId(base, used) {
  var slug = String(base || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60) || 'section';
  // Prefix so an id never starts with a digit (Chapter headings usually do),
  // which keeps the anchors valid as CSS selectors too.
  var id = 'sec-' + slug;
  var n = 2;
  while (used[id]) { id = 'sec-' + slug + '-' + n; n++; }
  used[id] = true;
  return id;
}

export function initReadingAids(contentEl) {
  if (!contentEl || contentEl.dataset.readingAids) return;
  contentEl.dataset.readingAids = '1';

  var nav = document.getElementById('viewer-toc');
  var list = document.getElementById('viewer-toc-list');
  var toggle = document.getElementById('viewer-toc-toggle');
  var count = document.getElementById('viewer-toc-count');
  var bar = document.getElementById('reading-progress');
  var fill = document.getElementById('reading-progress-fill');

  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var headings = Array.prototype.slice.call(contentEl.querySelectorAll('h2, h3'));
  var updateCurrent = function () {};

  // ---------- Table of contents ----------
  if (nav && list && toggle && headings.length >= 2) {
    var used = {};
    headings.forEach(function (heading) {
      if (!heading.id) heading.id = uniqueId(heading.textContent, used);
      else used[heading.id] = true;

      var item = document.createElement('li');
      item.className = heading.tagName === 'H3' ? 'toc-item toc-sub' : 'toc-item';
      var link = document.createElement('a');
      link.href = '#' + heading.id;
      link.textContent = heading.textContent;
      link.addEventListener('click', function () {
        // Move focus with the scroll so keyboard and screen-reader users land
        // on the section instead of staying on the TOC link.
        window.setTimeout(function () {
          heading.setAttribute('tabindex', '-1');
          heading.focus({ preventScroll: true });
        }, reduceMotion ? 0 : 420);
      });
      item.appendChild(link);
      list.appendChild(item);
    });

    if (count) count.textContent = headings.length + ' sections';
    nav.hidden = false;

    var setOpen = function (open) {
      list.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
    };
    // Wide screens have room for the list; phones start collapsed.
    setOpen(!!(window.matchMedia && window.matchMedia('(min-width: 900px)').matches));
    toggle.addEventListener('click', function () {
      setOpen(list.hidden);
    });

    // Highlight the section currently being read. Position-based rather than
    // observation-based: headings are far apart, so "[aria-current]" follows
    // the last heading that has scrolled past the header, with no dead zones.
    var links = {};
    Array.prototype.forEach.call(list.querySelectorAll('a'), function (a) {
      links[a.getAttribute('href').slice(1)] = a;
    });
    var headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 68;
    var currentEl = null;
    updateCurrent = function () {
      var threshold = headerHeight + 40;
      var current = headings[0];
      headings.forEach(function (h) {
        if (h.getBoundingClientRect().top <= threshold) current = h;
      });
      if (currentEl === current) return;
      currentEl = current;
      Object.keys(links).forEach(function (id) {
        if (current && id === current.id) links[id].setAttribute('aria-current', 'location');
        else links[id].removeAttribute('aria-current');
      });
    };
  }

  // ---------- Reading progress ----------
  if (!bar || !fill) return;
  var headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 68;
  var ticking = false;

  function paint() {
    ticking = false;
    var rect = contentEl.getBoundingClientRect();
    var viewport = window.innerHeight - headerH;
    var read = headerH - rect.top;
    var span = rect.height - viewport;
    var pct = span > 0 ? (read / span) * 100 : (rect.top < headerH ? 100 : 0);
    pct = Math.max(0, Math.min(100, pct));
    updateCurrent();
    fill.style.transform = 'scaleX(' + (pct / 100) + ')';
    var rounded = Math.round(pct);
    bar.setAttribute('aria-valuenow', String(rounded));
    bar.setAttribute('aria-valuetext', rounded + '% of this chapter read');
    bar.hidden = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(paint);
  }

  paint();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}
