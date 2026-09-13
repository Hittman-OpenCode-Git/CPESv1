const fs = require('fs');
const src = fs.readFileSync('content/cases/case_pack_3_corrected.js', 'utf8');
for (const id of ['CBQ3-A1', 'CBQ3-A2']) {
  const re = new RegExp(id, 'g');
  const n = (src.match(re) || []).length;
  console.log(id + ': ' + n + ' occurrences in case_pack_3');
}
// check Exhibit parent CaseID fields inside the two spans
const qi1 = src.indexOf('CBQ3-A1');
const qi2 = src.indexOf('CBQ3-A2');
console.log('first CBQ3-A1 at byte ' + qi1 + ', first CBQ3-A2 at byte ' + qi2);