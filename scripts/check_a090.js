const fs = require('fs');
function ccIn(src, qid) {
  const i = src.indexOf('"QuestionID": "' + qid + '"');
  const seg = src.substring(Math.max(0, i - 3000), i + 500);
  const m = seg.match(/"CorrectChoice": "([A-D])"/);
  return m ? m[1] : '?';
}
const s1 = fs.readFileSync('scripts/tier3_wave4c.js', 'utf8');
console.log('staging P1-A-090 CC=' + ccIn(s1, 'P1-A-090'));
const s2 = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');
console.log('pack P1-A-090 CC=' + ccIn(s2, 'P1-A-090'));
// also confirm the A-choice text matches the $230k disclosure answer in pack
const i2 = s2.indexOf('"QuestionID": "P1-A-090"');
const seg = s2.substring(i2, i2 + 1200);
const ca = seg.indexOf('"A": "');
console.log('pack choice A head=' + seg.substring(ca + 6, ca + 90));