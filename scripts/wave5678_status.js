const fs = require('fs');
function stateOf(src, qid) {
  const qi = src.indexOf('"QuestionID": "' + qid + '"');
  if (qi === -1) return 'MISSING';
  const seg = src.substring(qi, qi + 6000);
  const m = seg.match(/"question_state": "([A-Za-z ]+)"/);
  return m ? m[1] : '?';
}
const jobs = [
  ['content/packs/pack_d_corrected.js', 'W5-AD', 'P1-AD-', 76, 105],
  ['content/packs/pack_d_corrected.js', 'W6-DD', 'P1-DD-', 76, 105],
  ['content/packs/pack_e_corrected.js', 'W7-EB', 'P1E-B-', 101, 130],
  ['content/packs/pack_b_corrected.js', 'W8-C', 'P1B-C-', 201, 210],
  ['content/packs/pack_b_corrected.js', 'W8-D', 'P1B-D-', 151, 160],
  ['content/packs/pack_b_corrected.js', 'W8-E', 'P1B-E-', 151, 160],
];
const pad3 = n => String(n).padStart(3, '0');
for (const [f, w, pre, lo, hi] of jobs) {
  const src = fs.readFileSync(f, 'utf8');
  let cert = 0, unp = 0, other = [];
  for (let n = lo; n <= hi; n++) {
    const qid = (pre === 'P1-AD-' || pre === 'P1-DD-') ? pre + pad3(n) : pre + n;
    const st = stateOf(src, qid);
    if (st === 'Certified') cert++;
    else if (st === 'Unprocessed') unp++;
    else other.push(qid + '=' + st);
  }
  console.log(w + ': Certified=' + cert + ' Unprocessed=' + unp + (other.length ? ' OTHER: ' + other.join(',') : ''));
}