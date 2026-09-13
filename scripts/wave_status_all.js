const fs = require('fs');
function stateOf(src, qid) {
  const qi = src.indexOf('"QuestionID": "' + qid + '"');
  if (qi === -1) return 'MISSING';
  const seg = src.substring(Math.max(0, qi - 500), qi + 8000);
  const m = seg.match(/"question_state": "([A-Za-z ]+)"/);
  return m ? m[1] : '?';
}
const packs = {
  A: 'content/packs/pack_a_corrected.js', B: 'content/packs/pack_b_corrected.js',
  C: 'content/packs/pack_c_corrected.js', D: 'content/packs/pack_d_corrected.js',
  E: 'content/packs/pack_e_corrected.js',
};
const srcs = {};
for (const [k, f] of Object.entries(packs)) srcs[k] = fs.readFileSync(f, 'utf8');
const waves = [
  ['W1-CD', 'D', 'P1-CD-', 101, 130], ['W2-CC', 'C', 'P1-CC-', 101, 130],
  ['W3-BB', 'B', 'P1B-B-', 201, 230], ['W4-A', 'A', null, 76, 105],
  ['W5-AD', 'D', 'P1-AD-', 76, 105], ['W6-DD', 'D', 'P1-DD-', 76, 105],
  ['W7-EB', 'E', 'P1E-B-', 101, 130],
];
for (const [w, p, pre, lo, hi] of waves) {
  let cert = 0, unp = 0, miss = 0;
  for (let n = lo; n <= hi; n++) {
    const qid = pre ? pre + n : 'P1-A-' + String(n).padStart(3, '0');
    const st = stateOf(srcs[p], qid);
    if (st === 'Certified') cert++;
    else if (st === 'Unprocessed') unp++;
    else miss++;
  }
  console.log(w + ' ' + p + ': Certified=' + cert + ' Unprocessed=' + unp + ' Missing/Other=' + miss);
}
for (const [k, f] of Object.entries(packs)) {
  const t = srcs[k];
  console.log('Pack ' + k + ': QIDs=' + (t.match(/"QuestionID"\s*:/g) || []).length +
    ' Certified=' + (t.match(/"question_state"\s*:\s*"Certified"/g) || []).length);
}