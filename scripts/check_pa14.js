const fs = require('fs');
const s = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');
console.log('QIDs:', (s.match(/"QuestionID"\s*:/g) || []).length);
for (let n = 101; n <= 130; n++) {
  if (s.includes('"QuestionID": "P1-C-' + n + '"')) console.log('PRESENT P1-C-' + n);
}
console.log('absent-check-done');