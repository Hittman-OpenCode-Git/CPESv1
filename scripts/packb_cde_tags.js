const fs = require('fs');
const s = fs.readFileSync('content/packs/pack_b_corrected.js', 'utf8');
for (const qid of ['P1B-C-150', 'P1B-D-100', 'P1B-E-100']) {
  const i = s.indexOf('"QuestionID": "' + qid + '"');
  if (i === -1) { console.log(qid + ' NOT FOUND'); continue; }
  const seg = s.substring(Math.max(0, i - 1500), i + 200);
  const t = seg.match(/"Topic": "([^"]+)"/);
  const l = seg.match(/"LOSTag": "([^"]+)"/);
  const k = seg.match(/"UniqueConceptKey": "([^"]+)"/);
  console.log(qid + ' Topic=' + (t && t[1]) + ' LOSTag=' + (l && l[1]) + ' Key=' + (k && k[1]));
}