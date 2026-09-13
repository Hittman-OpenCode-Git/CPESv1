const fs = require('fs');
const s = fs.readFileSync('content/packs/pack_b_corrected.js', 'utf8');
const i = s.indexOf('"QuestionID": "P1B-B-150"');
const seg = s.substring(i, i + 4000);
for (const L of ['A', 'B', 'C', 'D']) {
  const k = '"ExplanationWrong' + L + '"';
  const j = seg.indexOf(k);
  if (j === -1) { console.log(L + ': ABSENT'); continue; }
  const v = seg.substring(j + k.length + 1, j + k.length + 80).replace(/\n/g, ' ');
  console.log(L + ': present val=' + v);
}
// tail of object: VerifiedChecks presence?
const k2 = seg.indexOf('"VerifiedChecks"');
console.log('VerifiedChecks: ' + (k2 === -1 ? 'ABSENT' : 'present'));
const k3 = seg.indexOf('"DifficultyScore"');
console.log('DifficultyScore present: ' + (k3 !== -1));
const k4 = seg.indexOf('"CognitiveLevel"');
console.log('CognitiveLevel present: ' + (k4 !== -1));