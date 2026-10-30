// Gyanu Notes — shared exam countdown helpers.
// Used by both the /exams/ page (assets/js/exams.js) and the homepage
// exam-countdown preview (assets/js/main.js). Dates are AD ISO strings
// (YYYY-MM-DD) so the calendar math is exact; a missing/null date yields
// NaN and renders as "Date not set".

// Calendar-day difference: 0 = today, negative = past (no time-of-day noise).
export function daysRemaining(isoDateStr) {
  var parts = String(isoDateStr || "").split("-");
  if (parts.length !== 3) return NaN;
  var examDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  if (isNaN(examDate.getTime())) return NaN;
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((examDate - today) / 86400000);
}

export function countdownText(isoDateStr) {
  var days = daysRemaining(isoDateStr);
  if (isNaN(days)) return "Date not set";
  if (days < 0) return "Exam passed";
  if (days === 0) return "Today!";
  var weeks = Math.floor(days / 7);
  var remDays = days % 7;
  if (weeks > 0) return weeks + " week" + (weeks > 1 ? "s" : "") + (remDays ? " " + remDays + " day" + (remDays !== 1 ? "s" : "") : "") + " left";
  return days + " day" + (days !== 1 ? "s" : "") + " left";
}

export function formatDate(isoDateStr) {
  var parts = String(isoDateStr || "").split("-");
  if (parts.length !== 3) return "";
  var d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

// Board code -> human label (BLE = Class 8, SEE = Class 10, plus2 = Class 11/12).
export var BOARD_LABELS = { BLE: "BLE (Class 8)", SEE: "SEE (Class 10)", plus2: "+2 (Class 11/12)" };

// Split a date into the pieces the cards show: a figure, its unit and the
// state that drives colour. Keeping the wording here means the homepage
// preview and the /exams/ page can never drift apart.
export function countdownParts(isoDateStr) {
  var days = daysRemaining(isoDateStr);
  if (isNaN(days)) {
    return { state: "unknown", value: "\u2014", unit: "date not set", text: "Date not set" };
  }
  if (days < 0) {
    var ago = -days;
    return { state: "past", value: String(ago), unit: ago === 1 ? "day ago" : "days ago", text: "Exam passed" };
  }
  if (days === 0) {
    return { state: "today", value: "0", unit: "days left", text: "Today!" };
  }
  return {
    state: "upcoming",
    value: String(days),
    unit: days === 1 ? "day left" : "days left",
    text: countdownText(isoDateStr)
  };
}

function escapeAttr(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Inner HTML for a countdown element: the big figure is decorative, while a
// visually hidden sentence gives screen readers "85 days left, on Mar 5, 2027".
export function countdownInner(isoDateStr) {
  var parts = countdownParts(isoDateStr);
  var dateText = formatDate(isoDateStr);
  var sentence;
  if (parts.state === "unknown") sentence = "Exam date not set";
  else if (parts.state === "past") sentence = dateText ? "Exam took place on " + dateText : "Exam passed";
  else sentence = parts.text + (dateText ? ", on " + dateText : "");
  return '<span class="cd-figure" aria-hidden="true">'
    + '<span class="cd-value">' + escapeAttr(parts.value) + '</span>'
    + '<span class="cd-unit">' + escapeAttr(parts.unit) + '</span></span>'
    + '<span class="visually-hidden">' + escapeAttr(sentence) + '</span>';
}

// Complete element used by both renderers. The is-* state class is set up
// front so the first paint already has the right colour.
export function countdownMarkup(isoDateStr) {
  var iso = isoDateStr == null ? "" : String(isoDateStr);
  return '<p class="exam-countdown is-' + countdownParts(iso).state + '" data-countdown="'
    + escapeAttr(iso) + '">' + countdownInner(iso) + '</p>';
}

// Repaint one element from its data-countdown attribute.
export function paintCountdown(node) {
  var iso = node.getAttribute("data-countdown") || "";
  node.className = "exam-countdown is-" + countdownParts(iso).state;
  node.innerHTML = countdownInner(iso);
}

// Refresh every rendered countdown once a minute so a page left open across
// midnight stays correct. Skipped while the tab is hidden (no wasted work on
// a background tab) and repainted on return. Returns a stop() function.
export function mountCountdownTicker() {
  var refresh = function () {
    var nodes = document.querySelectorAll("[data-countdown]");
    for (var i = 0; i < nodes.length; i++) paintCountdown(nodes[i]);
  };
  var timer = setInterval(function () { if (!document.hidden) refresh(); }, 60000);
  var onVisible = function () { if (!document.hidden) refresh(); };
  document.addEventListener("visibilitychange", onVisible);
  return function stop() {
    clearInterval(timer);
    document.removeEventListener("visibilitychange", onVisible);
  };
}