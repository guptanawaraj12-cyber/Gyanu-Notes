// Shared content source. Firestore is the editable production source; the
// checked-in JSON files provide a safe fallback before first migration.
// Firebase loads dynamically (see firestoreContent) with a 4s timeout, so a
// failed or slow CDN/SDK/network degrades to the bundled JSON fallback.

async function bundled(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error("Could not load bundled content");
  return response.json();
}

export function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms))
  ]);
}

async function firestoreContent() {
  const [{ db }, { doc, getDoc }] = await Promise.all([
    import("/assets/js/firebase-config.js?v=3"),
    import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js")
  ]);
  const snapshot = await withTimeout(getDoc(doc(db, "siteContent", "current")), 4000);
  if (snapshot.exists()) {
    const content = snapshot.data();
    if (Array.isArray(content.notes?.notes) && Array.isArray(content.papers?.papers)) {
      return content;
    }
  }
  throw new Error("Live catalogue unavailable");
}

export async function getSiteContent() {
  try {
    return await firestoreContent();
  } catch (error) {
    console.warn("Could not load editable content; using bundled data.", error);
  }

  const [notes, papers] = await Promise.all([
    bundled("/assets/data/notes-data.json"),
    bundled("/assets/data/papers-data.json")
  ]);
  return { notes, papers };
}

export async function getNotesData() {
  return (await getSiteContent()).notes;
}

export async function getPapersData() {
  return (await getSiteContent()).papers;
}

// ---- Exam schedule ---------------------------------------------------------
// Firestore collection examSchedule (one doc per exam, admin-editable) is the
// source; the bundled JSON is the fallback when Firestore is unreachable.
const BOARD_VALUES = ["BLE", "SEE", "plus2"];

async function firestoreExams() {
  const [{ db }, f] = await Promise.all([
    import("/assets/js/firebase-config.js?v=3"),
    import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js")
  ]);
  // Null dates (routine not published) sort first, which is fine — the
  // callers filter by board and date themselves.
  return withTimeout(
    f.getDocs(f.query(f.collection(db, "examSchedule"), f.orderBy("date", "asc"))),
    4000
  );
}

export async function getExamsData() {
  try {
    const snapshot = await firestoreExams();
    const exams = snapshot.docs
      .map((docSnap) => docSnap.data())
      .filter((exam) => exam && BOARD_VALUES.includes(exam.board));
    if (exams.length) return exams;
  } catch (error) {
    console.warn("examSchedule unavailable; using bundled schedule.", error);
  }
  const data = await bundled("/assets/data/exams-data.json");
  return Array.isArray(data) ? data : [];
}
