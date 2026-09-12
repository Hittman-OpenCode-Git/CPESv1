const fs = require('fs');
const s = fs.readFileSync('content/packs/pack_c_corrected.js', 'utf8');
console.log('QIDs:', (s.match(/"QuestionID"\s*:/g) || []).length);
console.log('hasTail:', s.lastIndexOf('\n];') > -1);
for (let n = 101; n <= 130; n++) {
  if (s.includes('"QuestionID": "P1-DC-' + n + '"')) console.log('PRESENT P1-DC-' + n);
}
console.log('absent-check-done');