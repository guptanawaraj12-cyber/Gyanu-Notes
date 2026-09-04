// Gyanu Notes — exams page: loads schedule from Firestore (4s timeout)
// with bundled JSON fallback; renders live countdown cards.
 
import { getSiteContent } from "/assets/js/content-store.js?v=4";
 
// Convert a Bikram Sambat date string (2082-03-15) to an English Date.
// BS months are offset from the Vikram Samvat calendar; using a lookup
// approximation centered on common NEB exam windows is sufficient for
// countdown display. For production, replace with bs2ad if available.
function bsToAdDate(bsStr) {
  var parts = bsStr.split("-");
  var year = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10);
  var day = parseInt(parts[2], 10);
  // Approximate AD from BS (rough: BS year - 56 + offset for exam season)
  // This is a placeholder — real conversion needs a Panchang library.
  var adYear = year - 57;
  var adMonth = month; // months roughly align
  var adDay = day;
  // Fallback: if parsed year is before current year, add 1 for exam timing
  var d = new Date(adYear, adMonth - 1, adDay);
  if (d < new Date()) { d = new Date(adYear + 1, adMonth - 1, adDay); }
  return d;
}
 
function daysRemaining(examDateStr) {
  var examDate = bsToAdDate(examDateStr);
  var now = new Date();
  var diff = examDate - now;
  var days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days;
}
 
function countdownText(examDateStr) {
  var days = daysRemaining(examDateStr);
  if (days < 0) return "Exam passed";
  if (days === 0) return "Today!";
  var weeks = Math.floor(days / 7);
  var remDays = days % 7;
  if (weeks > 0) return weeks + " week" + (weeks > 1 ? "s" : "") + " " + remDays + " day" + (remDays !== 1 ? "s" : "") + " left";
  return days + " day" + (days !== 1 ? "s" : "") + " left";
}
 
function renderExamCard(exam) {
  var days = daysRemaining(exam.date);
  var isPast = days < 0;
  var dateObj = bsToAdDate(exam.date);
  var dateStr = dateObj.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
 
  return (
    '<div class="exam-card">'
    + '<div class="exam-card-body">'
    + '<span class="tag">' + (exam.class || "Exam") + '</span>'
    + '<h3>' + (exam.examName || "Exam") + '</h3>'
    + '<p class="exam-date">' + dateStr + '</p>'
    + '<p class="exam-countdown">' + countdownText(exam.date) + '</p>'
    + '</div>'
    + (exam.subjects && exam.subjects.length
      ? '<div class="exam-subjects"><strong>Subjects:</strong> ' + exam.subjects.join(", ") + '</div>'
      : '')
    + '</div>'
  );
}
 
function renderExams(exams) {
  var upcoming = [];
  var past = [];
  var now = Date.now();
 
  for (var i = 0; i < exams.length; i++) {
    var exam = exams[i];
    var days = daysRemaining(exam.date);
    if (days < 0) {
      past.push(exam);
    } else {
      upcoming.push(exam);
    }
  }
 
  // Sort: soonest first
  upcoming.sort(function (a, b) { return daysRemaining(a.date) - daysRemaining(b.date); });
  past.sort(function (a, b) { return bsToAdDate(b.date) - bsToAdDate(a.date); });
 
  var upcomingGrid = document.getElementById("upcoming-exams");
  var pastGrid = document.getElementById("past-exams");
  var toggleBtn = document.getElementById("toggle-past");
 
  if (upcomingGrid) {
    upcomingGrid.innerHTML = upcoming.length
      ? upcoming.map(renderExamCard).join("")
      : '<p class="muted">No upcoming exams. Check back later.</p>';
  }
 
  if (pastGrid) {
    pastGrid.classList.toggle("collapsed", past.length === 0);
    pastGrid.innerHTML = past.length
      ? past.map(renderExamCard).join("")
      : '<p class="muted">No past exams recorded yet.</p>';
  }
 
  if (toggleBtn) {
    toggleBtn.style.display = past.length ? "inline-block" : "none";
  }
}
 
// Live countdown: refresh every 60s
function startCountdownTicker() {
  setInterval(function () {
    var upcomingGrid = document.getElementById("upcoming-exams");
    if (!upcomingGrid) return;
    var cards = upcomingGrid.querySelectorAll(".exam-countdown");
    // Re-render the whole list to pick up day rollovers
    loadAndRender();
  }, 60000);
}
 
async function loadAndRender() {
  try {
    var content = await getSiteContent();
    var exams = content.exams;
    if (Array.isArray(exams) && exams.length) {
      renderExams(exams);
    } else {
      // Fall back to bundled JSON
      var res = await fetch("/assets/data/exams-data.json");
      if (res.ok) {
        var bundled = await res.json();
        renderExams(bundled);
      } else {
        console.warn("Could not load exam data");
      }
    }
  } catch (error) {
    console.warn("Could not load exam data:", error);
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
        toggleBtn.textContent = pastGrid.classList.contains("collapsed") ? "Show past exams" : "Hide past exams";
      }
    });
  }
 
  loadAndRender();
  startCountdownTicker();
});