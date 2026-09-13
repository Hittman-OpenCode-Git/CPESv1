const fs = require('fs');
const s = fs.readFileSync('content/packs/pack_d_corrected.js', 'utf8');
console.log('P1-DD-076 present: ' + s.includes('"QuestionID": "P1-DD-076"'));
console.log('QID count: ' + (s.match(/"QuestionID"\s*:/g) || []).length);
// what does the Wave-6 log entry claim?
const rh = fs.readFileSync('knowledge/REVISION_HISTORY.md', 'utf8');
const i = rh.indexOf('## Tier 3 Wave 6');
console.log('--- Wave-6 entry head ---');
console.log(rh.substring(i, i + 1200));