// Shared content source. Firestore is the editable production source; the
// checked-in JSON files provide a safe fallback before first migration.
import { db } from "/assets/js/firebase-config.js?v=2";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

async function bundled(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error("Could not load bundled content");
  return response.json();
}

export async function getSiteContent() {
  try {
    const snapshot = await getDoc(doc(db, "siteContent", "current"));
    if (snapshot.exists()) {
      const content = snapshot.data();
      if (Array.isArray(content.notes?.notes) && Array.isArray(content.papers?.papers)) {
        return content;
      }
    }
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
