// apply-final.js — bump versions + add feedback rules + validate
const fs = require("fs");
const path = require("path");
const SKIP = new Set([".git", "node_modules"]);
const ROOT = "d:/gyanu note code";

// 1. Bump all HTML <link>/<script> asset refs
let v4 = 0, nv4 = 0, cs = 0, nv6 = 0;
function bumpFile(full, rel) {
  let s = fs.readFileSync(full, "utf8");
  const before = s;
  // notes-view.js -> v5
  const n = s.split("notes-view.js?v=4").length - 1;
  if (n) { s = s.split("notes-view.js?v=4").join("notes-view.js?v=5"); v4 += n; }
  // firebase-config.js -> v5
  const fc = s.split("firebase-config.js?v=4").length - 1;
  if (fc) { s = s.split("firebase-config.js?v=4").join("firebase-config.js?v=5"); }
  // notes-view.js already v5, components.css -> v8
  const cc = s.split("components.css?v=7").length - 1;
  if (cc) { s = s.split("components.css?v=7").join("components.css?v=8"); nv6 += cc; }
  if (s !== before) { fs.writeFileSync(full, s, "utf8"); }
}
function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { walk(full); continue; }
    if (/\.html$/.test(e.name)) bumpFile(full, path.relative(ROOT, full));
  }
}
walk(ROOT);
console.log("notes-view.js v4->v5 refs updated:", v4);
console.log("components.css v7->v8 refs in HTML:", nv6);

// 2. Add feedback rules to firestore.rules
const rf = path.join(ROOT, "firestore.rules");
let rules = fs.readFileSync(rf, "utf8");
if (!rules.includes("match /feedback/")) {
  const insert = `    // Anonymous visitor feedback — write-only, no cross-user reads.
    match /feedback/{feedbackId} {
      allow read: if false;
      allow create: if
        request.resource.data.keys().hasOnly([
          'noteId', 'slug', 'vote', 'uid', 'submittedAt'
        ]) &&
        request.resource.data.vote in ['up', 'down'] &&
        request.resource.data.noteId is string &&
        request.resource.data.noteId.size() > 0 &&
        (request.resource.data.slug == null || request.resource.data.slug is string) &&
        (request.resource.data.uid == null || request.resource.data.uid is string) &&
        (request.resource.data.uid == null || request.resource.data.uid == request.auth.uid) &&
        request.resource.data.submittedAt == request.time;
      allow update, delete: if false;
    }

`;
  rules = rules.replace("    match /{document=**} {", insert + "    match /{document=**} {");
  fs.writeFileSync(rf, rules, "utf8");
  console.log("✅ Added feedback rules");
} else {
  console.log("⚠️ feedback rules already present");
}

// 3. Validate notes-view.js compiles
const { execSync } = require("child_process");
try {
  execSync("node --check " + JSON.stringify(path.join(ROOT, "assets/js/notes-view.js")), { stdio: "pipe" });
  console.log("✅ notes-view.js syntax OK");
} catch(e) {
  console.log("❌ notes-view.js syntax ERROR:", e.stderr ? e.stderr.toString() : e.message);
}
