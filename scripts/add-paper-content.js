/**
 * Add paper set entries to inline-content.json
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INLINE_CONTENT_PATH = path.join(ROOT, 'assets', 'data', 'inline-content.json');

const papers = [
  { id: 'c10-math-2081-real', title: 'SEE 2081 Mathematics — Real Exam', classSlug: 'class-10', subjectSlug: 'mathematics', year: '2081', label: 'Real Exam' },
  { id: 'c10-math-2081-model', title: 'SEE 2081 Mathematics — Model Paper', classSlug: 'class-10', subjectSlug: 'mathematics', year: '2081', label: 'Model Paper' },
  { id: 'c10-math-2080-real', title: 'SEE 2080 Mathematics — Real Exam', classSlug: 'class-10', subjectSlug: 'mathematics', year: '2080', label: 'Real Exam' },
  { id: 'c10-phy-2081-real', title: 'SEE 2081 Physics — Real Exam', classSlug: 'class-10', subjectSlug: 'physics', year: '2081', label: 'Real Exam' },
  { id: 'c10-phy-2081-preboard', title: 'SEE 2081 Physics — Pre-board', classSlug: 'class-10', subjectSlug: 'physics', year: '2081', label: 'Pre-board' },
  { id: 'c12-phy-2081-real', title: 'NEB 2081 Physics — Real Exam', classSlug: 'class-12', subjectSlug: 'physics', year: '2081', label: 'Real Exam' }
];

function paperHtml(p) {
  const subjectLabel = {
    mathematics: 'Mathematics', physics: 'Physics', chemistry: 'Chemistry',
    biology: 'Biology', 'computer-science': 'Computer Science',
    english: 'English', nepali: 'Nepali', social: 'Social Studies'
  }[p.subjectSlug] || p.subjectSlug;

  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' + p.title + ' — Gyanu Notes</title><link rel="stylesheet" href="/assets/css/tokens.css"><link rel="stylesheet" href="/assets/css/base.css"><link rel="stylesheet" href="/assets/css/layout.css"><link rel="stylesheet" href="/assets/css/components.css"><link rel="stylesheet" href="/assets/css/utilities.css"><style>.paper-content{max-width:720px;margin:0 auto;padding:2rem 1rem;line-height:1.7;color:var(--ink)}.paper-content h1{font-size:1.75rem;margin-bottom:0.5rem;color:var(--accent)}.paper-content h2{font-size:1.35rem;margin-top:1.75rem;margin-bottom:0.5rem;border-bottom:2px solid var(--line);padding-bottom:0.25rem}.paper-content p{margin-bottom:1rem}.paper-content ul{margin-bottom:1rem;padding-left:1.5rem}.paper-content li{margin-bottom:0.4rem}.back-link{display:inline-block;margin-top:2rem;padding:0.6rem 1.2rem;background:var(--accent);color:#fff;text-decoration:none;border-radius:6px;font-weight:600}.back-link:hover{opacity:0.9}</style></head><body><div class="paper-content"><h1>' + p.title + '</h1><p class="muted" style="font-size:0.9rem;color:var(--ink-faint);">' + p.classSlug + ' · ' + subjectLabel + ' · ' + p.year + '</h2><p>This is the <strong>' + p.label + '</strong> for <strong>' + subjectLabel + '</strong> (' + p.year + '), <strong>' + p.classSlug + '</strong>.</p><h2>Instructions</h2><ul><li>Read all questions carefully before attempting.</li><li>Attempt all questions in the given time.</li><li>Write your answers clearly with proper working.</li><li>Check your answers against the marking scheme where available.</li></ul><h2>Practice Tips</h2><ul><li>Solve previous year questions to understand the exam pattern.</li><li>Focus on important topics and frequently asked questions.</li><li>Practice numerical problems and diagrams thoroughly.</li></ul><hr style="margin:2.5rem 0;border:none;border-top:1px solid var(--line);"><a href="javascript:history.back()" class="back-link">← Back to Papers</a></div></body></html>';
}

const all = JSON.parse(fs.readFileSync(INLINE_CONTENT_PATH, 'utf8'));
papers.forEach(function (p) {
  all[p.id] = { id: p.id, title: p.title, classSlug: p.classSlug, subjectSlug: p.subjectSlug, html: paperHtml(p) };
});
fs.writeFileSync(INLINE_CONTENT_PATH, JSON.stringify(all, null, 2));
console.log('Added ' + papers.length + ' paper entries to inline-content.json.');