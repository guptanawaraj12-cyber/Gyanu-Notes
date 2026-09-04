// Gyanu Notes — exams page: loads schedule from Firestore (4s timeout via
// content-store) with bundled JSON fallback; renders live countdown cards.
// Dates: `date` is an AD ISO date (YYYY-MM-DD) so countdown math is exact;
// `dateBs` is the optional Bikram Sambat label shown to visitors. (A full
// BS→AD conversion table was deliberately not hardcoded — swap it in later
// if you want the `date` field itself to be BS.)

import { getSiteContent } from "/assets/js/content-store.js?v=4";

function escapeHtml(text) {
  return String(text == null ? "" : text)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

// Calendar-day difference: 0 = today, negative = past (no time-of-day noise).
function daysRemaining(isoDateStr) {
  var parts = String(isoDateStr || "").split("-");
  if (parts.length !== 3) return NaN;
  var examDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  if (isNaN(examDate.getTime())) return NaN;
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((examDate - today) / 86400000);
}

function countdownText(isoDateStr) {
  var days = daysRemaining(isoDateStr);
  if (isNaN(days)) return "Date not set";
  if (days < 0) return "Exam passed";
  if (days === 0) return "Today!";
  var weeks = Math.floor(days / 7);
  var remDays = days % 7;
  if (weeks > 0) return weeks + " week" + (weeks > 1 ? "s" : "") + (remDays ? " " + remDays + " day" + (remDays !== 1 ? "s" : "") : "") + " left";
  return days + " day" + (days !== 1 ? "s" : "") + " left";
}

function formatDate(isoDateStr) {
  var parts = String(isoDateStr || "").split("-");
  if (parts.length !== 3) return "";
  var d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function renderExamCard(exam) {
  var dateStr = formatDate(exam.date);
  var bsLabel = exam.dateBs ? " <small>(" + escapeHtml(exam.dateBs) + " BS)</small>" : "";

  return (
    '<div class="exam-card" data-date="' + escapeHtml(exam.date || "") + '">'
    + '<div class="exam-card-body">'
    + '<span class="tag">' + escapeHtml(exam.class || "Exam") + '</span>'
    + '<h3>' + escapeHtml(exam.examName || "Exam") + '</h3>'
    + '<p class="exam-date">' + dateStr + bsLabel + '</p>'
    + '<p class="exam-countdown">' + countdownText(exam.date) + '</p>'
    + '</div>'
    + (Array.isArray(exam.subjects) && exam.subjects.length
      ? '<div class="exam-subjects"><strong>Subjects:</strong> ' + exam.subjects.map(escapeHtml).join(", ") + '</div>'
      : '')
    + '</div>'
  );
}

function sortKey(exam) { return daysRemaining(exam.date); }

function renderExams(exams) {
  var upcoming = [];
  var past = [];

  for (var i = 0; i < exams.length; i++) {
    var exam = exams[i];
    var days = daysRemaining(exam.date);
    if (!isNaN(days) && days < 0) past.push(exam);
    else upcoming.push(exam);
  }

  // Soonest first; past exams most-recent first.
  upcoming.sort(function (a, b) { return sortKey(a) - sortKey(b); });
  past.sort(function (a, b) { return sortKey(b) - sortKey(a); });

  var upcomingGrid = document.getElementById("upcoming-exams");
  var pastGrid = document.getElementById("past-exams");
  var toggleBtn = document.getElementById("toggle-past");

  if (upcomingGrid) {
    upcomingGrid.innerHTML = upcoming.length
      ? upcoming.map(renderExamCard).join("")
      : '<p class="muted">No upcoming exams announced yet. Check back later.</p>';
  }

  if (pastGrid) {
    pastGrid.innerHTML = past.length
      ? past.map(renderExamCard).join("")
      : '<p class="muted">No past exams recorded yet.</p>';
    // Collapse only when empty; otherwise keep whatever state the user chose.
    if (past.length === 0) pastGrid.classList.add("collapsed");
    else if (!pastGrid.dataset.userToggled) pastGrid.classList.remove("collapsed");
  }

  if (toggleBtn) {
    toggleBtn.style.display = past.length ? "inline-block" : "none";
  }
}

// Ticker: refresh ONLY the countdown text every 60s — cheap, no refetch,
// and it never disturbs the past-exams toggle state. Day rollovers are
// picked up because the text is recomputed from each card's data-date.
function startCountdownTicker() {
  setInterval(function () {
    var nodes = document.querySelectorAll(".exam-card[data-date] .exam-countdown");
    for (var i = 0; i < nodes.length; i++) {
      var card = nodes[i].closest(".exam-card");
      nodes[i].textContent = countdownText(card.getAttribute("data-date"));
    }
  }, 60000);
}

async function loadAndRender() {
  try {
    var content = await getSiteContent();
    var exams = content && content.exams;
    if (Array.isArray(exams) && exams.length) {
      renderExams(exams);
      return;
    }
  } catch (error) {
    console.warn("Could not load live exam data; using bundled schedule.", error);
  }
  try {
    var res = await fetch("/assets/data/exams-data.json");
    if (res.ok) renderExams(await res.json());
  } catch (error) {
    console.warn("Could not load bundled exam data:", error);
  }
}

// Toggle past exams section
document.addEventListener("DOMContentLoaded", function () {
  var toggleBtn = document.getElementById("toggle-past");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      var pastGrid = document.getElementById("past-exams");
      if (pastGrid) {
        pastGrid.classList.toggle("collapsed");
        pastGrid.dataset.userToggled = "1";
        toggleBtn.textContent = pastGrid.classList.contains("collapsed") ? "Show past exams" : "Hide past exams";
      }
    });
  }

  loadAndRender();
  startCountdownTicker();
});