const fs = require('fs');
const raw = fs.readFileSync('pack_c_corrected.js', 'utf8');

// Look at P1-EC-005 - get large window
const idx = raw.indexOf('"QuestionID": "P1-EC-005"');
console.log('P1-EC-005 at index: ' + idx);
console.log('--- First 500 chars ---');
console.log(raw.substring(idx, idx + 500));
console.log('---');
// Search for question_state within 5000 chars
const window2 = raw.substring(idx, idx + 4000);
const qsIdx = window2.indexOf('question_state');
console.log('question_state found at offset: ' + qsIdx + ' from QuestionID');
if (qsIdx >= 0) {
  console.log('Value: ' + window2.substring(qsIdx, qsIdx + 50));
}
// Also check if Archived exists
if (window2.includes('Archived')) console.log('Contains Archived');
