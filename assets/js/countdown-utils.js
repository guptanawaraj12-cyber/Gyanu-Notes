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