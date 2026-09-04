// commit-feedback.js — commit the feedback widget work
const { execSync } = require("child_process");
const fs = require("fs");

function run(cmd) {
  const r = execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
  return r;
}

// Check what changed
const status = run('git -C "d:/gyanu note code" status --short');
console.log("=== Files changed ===");
console.log(status);

try {
  run('git -C "d:/gyanu note code" add -A');
  run('git -C "d:/gyanu note code" commit -m "feat: add \\"Was this helpful?\\" feedback widget to note view with anonymous write-only Firestore rules"');
  console.log("\n✅ Committed successfully");
} catch(e) {
  console.log("\n❌ Commit failed:", e.stderr || e.message);
}

const log = run('git -C "d:/gyanu note code" log --oneline -3');
console.log("\n=== Recent commits ===");
console.log(log);

const finalStatus = run('git -C "d:/gyanu note code" status --short');
console.log("\n=== Final status ===");
console.log(finalStatus || "(clean)");
