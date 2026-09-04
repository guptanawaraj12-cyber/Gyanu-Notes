const c = require('fs').readFileSync('d:/gyanu note code/firestore.rules', 'utf8');
const lines = c.split('\n');
for (let i = 12; i < 22; i++) {
  console.log((i + 1) + '| ' + lines[i]);
}
