const fs = require('fs');
function stateOf(src, qid) {
  const qi = src.indexOf('"QuestionID": "' + qid + '"');
  if (qi === -1) return 'MISSING';
  const seg = src.substring(qi, qi + 6000);
  const m = seg.match(/"question_state": "([A-Za-z ]+)"/);
  return m ? m[1] : '?';
}
const jobs = [
  ['content/packs/pack_c_corrected.js', 'W10-AC', 'P1-AC-', 101, 130],
  ['content/packs/pack_c_corrected.js', 'W11-BC', 'P1-BC-', 101, 130],
  ['content/packs/pack_b_corrected.js', 'W12-BA', 'P1B-A-', 151, 180],
];
for (const [f, w, pre, lo, hi] of jobs) {
  const src = fs.readFileSync(f, 'utf8');
  let cert = 0, unp = 0, other = [];
  for (let n = lo; n <= hi; n++) {
    const qid = pre + n;
    const st = stateOf(src, qid);
    if (st === 'Certified') cert++;
    else if (st === 'Unprocessed') unp++;
    else other.push(qid + '=' + st);
  }
  console.log(w + ': Certified=' + cert + ' Unprocessed=' + unp + (other.length ? ' OTHER: ' + other.join(',') : ''));
}