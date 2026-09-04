import { getSiteContent } from "/assets/js/content-store.js?v=4";

const input = document.getElementById("search-input");
const results = document.getElementById("search-results");
const summary = document.getElementById("search-summary");
const query = new URLSearchParams(location.search).get("q") || "";
input.value = query;
document.getElementById("search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  location.href = "/search/?q=" + encodeURIComponent(input.value.trim());
});

function addResult(label, title, href) {
  const link = document.createElement("a");
  link.className = "result"; link.href = href;
  const type = document.createElement("small"); type.textContent = label;
  const name = document.createElement("strong"); name.textContent = title;
  link.append(type, name); results.appendChild(link);
}

if (query.trim()) {
  getSiteContent().then(({ notes, papers }) => {
    const terms = query.toLowerCase().trim().split(/\s+/);
    const matches = (text) => terms.every((term) => text.toLowerCase().includes(term));
    notes.notes.forEach((entry) => entry.chapters.forEach((chapter) => {
      const text = `${chapter.title} ${entry.classSlug} ${entry.subjectSlug}`;
      if (matches(text)) addResult(`${entry.classSlug.replace("-", " ")} · ${entry.subjectSlug.split("-").join(" ")}`, chapter.title, `/notes/view/?id=${encodeURIComponent(chapter.id)}`);
    }));
    papers.papers.forEach((entry) => entry.sets.forEach((set) => {
      const text = `${set.label} ${entry.classSlug} ${entry.subjectSlug} ${entry.year}`;
      if (matches(text)) addResult(`${entry.classSlug.replace("-", " ")} · ${entry.subjectSlug.split("-").join(" ")} · ${entry.year}`, set.label, `/papers/view/?id=${encodeURIComponent(set.id)}`);
    }));
    const count = results.children.length;
    summary.textContent = `${count} result${count === 1 ? "" : "s"} for “${query}”`;
    if (!count) results.innerHTML = '<p class="empty-state">No matching notes or papers yet. Try fewer words.</p>';
  }).catch(() => { summary.textContent = "Search is temporarily unavailable."; });
} else { summary.textContent = "Enter a subject, chapter, class, or year to begin."; }
