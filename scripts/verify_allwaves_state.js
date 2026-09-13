const fs = require('fs');
function stateOf(file, qid) {
  const src = fs.readFileSync(file, 'utf8');
  const qi = src.indexOf('"QuestionID": "' + qid + '"');
  if (qi === -1) return 'MISSING';
  const seg = src.substring(qi, qi + 4000);
  const m = seg.match(/"question_state": "([A-Za-z ]+)"/);
  return m ? m[1] : '?';
}
const waves = [
  ['content/packs/pack_d_corrected.js', 'P1-CD-', 101, 130, 'W1'],
  ['content/packs/pack_c_corrected.js', 'P1-CC-', 101, 130, 'W2'],
  ['content/packs/pack_b_corrected.js', 'P1B-B-', 201, 230, 'W3'],
  ['content/packs/pack_a_corrected.js', null, 76, 105, 'W4'],
];
for (const [f, pre, lo, hi, w] of waves) {
  let cert = 0, other = [];
  for (let n = lo; n <= hi; n++) {
    const qid = pre ? pre + n : 'P1-A-' + String(n).padStart(3, '0');
    const st = stateOf(f, qid);
    if (st === 'Certified') cert++;
    else other.push(qid + '=' + st);
  }
  console.log(w + ' ' + f + ': Certified ' + cert + '/30' + (other.length ? ' OTHER: ' + other.join(',') : ''));
}