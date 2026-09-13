const fs = require('fs');
const pack = process.argv[2] || 'pack_e';
const qid = process.argv[3] || 'P1E-B-012';
const src = fs.readFileSync('content/packs/' + pack + '_corrected.js', 'utf8');
const i = src.indexOf(qid);
const seg = src.substring(i, i + 4000);
for (const L of ['A', 'B', 'C', 'D']) {
  const k = '"ExplanationWrong' + L + '"';
  const j = seg.indexOf(k);
  if (j === -1) { console.log(L + ': ABSENT'); continue; }
  const v = seg.substring(j + k.length + 1, j + k.length + 90).replace(/\n/g, ' ');
  console.log(L + ': present val=' + v);
}