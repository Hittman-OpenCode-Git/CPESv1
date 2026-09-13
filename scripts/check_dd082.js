const fs = require('fs');
function ccIn(src, qid) {
  const i = src.indexOf('"QuestionID": "' + qid + '"');
  const seg = src.substring(Math.max(0, i - 2500), i + 200);
  const m = seg.match(/"CorrectChoice": "([A-D])"/);
  return m ? m[1] : '?';
}
const s1 = fs.readFileSync('scripts/tier3_wave6a.js', 'utf8');
console.log('staging DD-082 CC=' + ccIn(s1, 'P1-DD-082'));
const s2 = fs.readFileSync('content/packs/pack_d_corrected.js', 'utf8');
console.log('pack DD-082 CC=' + ccIn(s2, 'P1-DD-082'));