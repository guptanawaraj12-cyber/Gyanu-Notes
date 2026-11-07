/**
 * Gyanu Notes — Inline Content Generator
 *
 * Reads assets/data/notes-data.json, generates:
 *   1. assets/data/inline-content.json — HTML content for every chapter
 *   2. Updates notes-data.json — sets hasInline: true, removes driveFileId placeholders
 *
 * Run: node scripts/generate-inline-content.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const NOTES_DATA_PATH = path.join(ROOT, 'assets', 'data', 'notes-data.json');
const INLINE_CONTENT_PATH = path.join(ROOT, 'assets', 'data', 'inline-content.json');

function subjectLabel(slug) {
  const labels = {
    mathematics: 'Mathematics', physics: 'Physics', chemistry: 'Chemistry',
    biology: 'Biology', 'computer-science': 'Computer Science',
    english: 'English', nepali: 'Nepali', social: 'Social Studies'
  };
  return labels[slug] || slug;
}

function introHtml(classLabel, chapterTitle, subjLabel) {
  return '<p>Welcome to <strong>' + chapterTitle + '</strong> for ' + classLabel +
    '. This chapter covers the essential concepts of ' + subjLabel +
    ' as per the NEB/SEE curriculum for Nepal.</p>';
}

function sectionsHtml(subjectSlug, chapterTitle) {
  const s = {
    mathematics: '<h2>Key Concepts</h2><p>This chapter introduces fundamental mathematical principles that build the foundation for higher-level problem solving.</p><h3>Important Formulas</h3><ul><li>Review all standard formulas introduced in this chapter.</li><li>Practice deriving each formula from first principles.</li></ul><h3>Solved Examples</h3><p>Work through each solved example step by step. Pay attention to how the formula is applied.</p><h3>Practice Exercises</h3><p>Attempt all exercise questions at the end of the chapter. Check your answers against the solutions provided.</p>',
    physics: '<h2>Key Concepts</h2><p>This chapter explores the physical laws and principles governing natural phenomena.</p><h3>Important Laws &amp; Principles</h3><ul><li>Understand the statement and conditions of each law.</li><li>Learn the SI units and dimensional formulas.</li></ul><h3>Numerical Problems</h3><p>Solve numerical problems using the given data. Draw neat diagrams wherever applicable.</p><h3>Practice Exercises</h3><p>Attempt all exercise questions and previous year questions for thorough practice.</p>',
    chemistry: '<h2>Key Concepts</h2><p>This chapter covers the chemical principles, reactions, and compounds.</p><h3>Important Reactions</h3><ul><li>Write balanced chemical equations for all key reactions.</li><li>Understand the conditions under which each reaction occurs.</li></ul><h3>Practice Exercises</h3><p>Practice writing chemical equations and solving numerical problems based on mole concept and stoichiometry.</p>',
    biology: '<h2>Key Concepts</h2><p>This chapter studies the living organisms and biological processes.</p><h3>Important Terms</h3><ul><li>Learn the definitions of all key biological terms.</li><li>Draw and label diagrams neatly.</li></ul><h3>Practice Exercises</h3><p>Answer all descriptive and objective questions from the chapter exercises.</p>',
    'computer-science': '<h2>Key Concepts</h2><p>This chapter introduces programming and computational thinking concepts.</p><h3>Important Topics</h3><ul><li>Understand the logic behind each algorithm.</li><li>Practice writing and tracing code.</li></ul><h3>Practice Exercises</h3><p>Write programs for all examples given in the chapter. Test them with different inputs.</p>',
    english: '<h2>Chapter Summary</h2><p>Read the lesson carefully and understand the theme, characters, and message of ' + chapterTitle + '.</p><h3>Important Questions</h3><ul><li>What is the central idea of the lesson?</li><li>Describe the main characters and their roles.</li><li>Write a summary in your own words.</li></ul><h3>Grammar &amp; Writing</h3><p>Practice the grammar exercises and writing tasks given at the end of the chapter.</p>',
    nepali: '<h2>अध्याय सारांश</h2><p>यस पाठलाई ध्यानपूर्वक पढ्नुहोस् र यसको मुख्य भावना, पात्र र सन्देश बुझ्नुहोस्।</p><h3>महत्वपूर्ण प्रश्नहरू</h3><ul><li>पाठको केन्द्रीय भावना के हो?</li><li>मुख्य पात्रहरूको परिचय दिनुहोस्।</li><li>आफ्नो शैलीमा सारांश लेख्नुहोस्।</li></ul><h3>अभ्यास</h3><p>अध्यायको अन्त्यमा दिइएका व्याकरण र लेखन अभ्यासहरू अभ्यास गर्नुहोस्।</p>',
    social: '<h2>Key Concepts</h2><p>This chapter covers important historical, geographical, and civic topics.</p><h3>Important Points</h3><ul><li>Remember key dates, events, and personalities.</li><li>Understand the causes and effects of major events.</li></ul><h3>Practice Exercises</h3><p>Answer all questions given in the chapter exercises. Practice map work wherever applicable.</p>'
  };
  return s[subjectSlug] || s.social;
}

function main() {
  const data = JSON.parse(fs.readFileSync(NOTES_DATA_PATH, 'utf8'));
  const inlineContent = {};

  const contentDir = path.join(ROOT, 'assets', 'content');
if (!fs.existsSync(contentDir)) fs.mkdirSync(contentDir, { recursive: true });

data.notes.forEach(function (entry) {
    var classInfo = data.classes.find(function (c) { return c.slug === entry.classSlug; });
    var classLabel = classInfo ? classInfo.label : '';
    (entry.chapters || []).forEach(function (ch) {
      var fragment = '<div class="chapter-content"><h1>' + ch.title + '</h1><p class="muted" style="font-size:0.9rem;color:var(--ink-faint);">' + classLabel + ' · ' + subjectLabel(entry.subjectSlug) + '</p>' + introHtml(classLabel, ch.title, subjectLabel(entry.subjectSlug)) + sectionsHtml(entry.subjectSlug, ch.title) + '</div>';
      var outPath = path.join(contentDir, ch.id + '.html');
      if (!fs.existsSync(outPath)) fs.writeFileSync(outPath, fragment, 'utf8');
      inlineContent[ch.id] = { id: ch.id, title: ch.title, classSlug: entry.classSlug, subjectSlug: entry.subjectSlug, html: fragment };
      ch.hasInline = true;
      delete ch.driveFileId;
      if (ch.handwrittenDriveId === 'REPLACE_WITH_REAL_DRIVE_FILE_ID') delete ch.handwrittenDriveId;
    });
  });

  fs.writeFileSync(INLINE_CONTENT_PATH, JSON.stringify(inlineContent, null, 2));
  console.log('Generated inline content for ' + Object.keys(inlineContent).length + ' chapters.');

  data._readme = 'Inline content is served from assets/data/inline-content.json. Chapters with hasInline: true render HTML content directly — no Google Drive file needed.';
  fs.writeFileSync(NOTES_DATA_PATH, JSON.stringify(data, null, 2));
  console.log('Updated notes-data.json — all chapters now have hasInline: true.');
}

function buildFullHtml(title, classLabel, subjLabel, body) {
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' + title + ' — Gyanu Notes</title><link rel="stylesheet" href="/assets/css/tokens.css"><link rel="stylesheet" href="/assets/css/base.css"><link rel="stylesheet" href="/assets/css/layout.css"><link rel="stylesheet" href="/assets/css/components.css"><link rel="stylesheet" href="/assets/css/utilities.css"><style>.chapter-content{max-width:720px;margin:0 auto;padding:2rem 1rem;line-height:1.7;color:var(--ink)}.chapter-content h1{font-size:1.75rem;margin-bottom:0.5rem;color:var(--accent)}.chapter-content h2{font-size:1.35rem;margin-top:1.75rem;margin-bottom:0.5rem;border-bottom:2px solid var(--line);padding-bottom:0.25rem}.chapter-content h3{font-size:1.15rem;margin-top:1.25rem;margin-bottom:0.35rem;color:var(--ink-soft)}.chapter-content p{margin-bottom:1rem}.chapter-content ul,.chapter-content ol{margin-bottom:1rem;padding-left:1.5rem}.chapter-content li{margin-bottom:0.4rem}.back-link{display:inline-block;margin-top:2rem;padding:0.6rem 1.2rem;background:var(--accent);color:#fff;text-decoration:none;border-radius:6px;font-weight:600}.back-link:hover{opacity:0.9}</style></head><body><div class="chapter-content"><h1>' + title + '</h1><p class="muted" style="font-size:0.9rem;color:var(--ink-faint);">' + classLabel + ' · ' + subjLabel + '</p>' + introHtml(classLabel, title, subjLabel) + body + '<hr style="margin:2.5rem 0;border:none;border-top:1px solid var(--line);"><a href="javascript:history.back()" class="back-link">← Back to Chapters</a></div></body></html>';
}

main();