const fs = require('fs');
const packs = {
  P1: 'content/packs/pack_a_corrected.js', P1B: 'content/packs/pack_b_corrected.js',
  'P1-B': 'content/packs/pack_a_corrected.js', 'P1-C': 'content/packs/pack_a_corrected.js',
  'P1-D': 'content/packs/pack_a_corrected.js', 'P1-F': 'content/packs/pack_a_corrected.js',
};
function packFor(qid) {
  if (qid.startsWith('P1B-')) return 'content/packs/pack_b_corrected.js';
  if (qid.startsWith('P1E-') || qid.startsWith('P1-E-')) return 'content/packs/pack_e_corrected.js';
  if (qid.startsWith('P1-AC-') || qid.startsWith('P1-BC-') || qid.startsWith('P1-CC-') || qid.startsWith('P1-DC-') || qid.startsWith('P1-EC-') || qid.startsWith('P1-FC-') || qid.startsWith('P1-FD-')) return 'content/packs/pack_c_corrected.js';
  if (qid.startsWith('P1-AD-') || qid.startsWith('P1-BD-') || qid.startsWith('P1-CD-') || qid.startsWith('P1-DD-') || qid.startsWith('P1-ED-')) return 'content/packs/pack_d_corrected.js';
  return 'content/packs/pack_a_corrected.js';
}
for (const qid of process.argv.slice(2)) {
  const src = fs.readFileSync(packFor(qid), 'utf8');
  const i = src.indexOf('"QuestionID": "' + qid + '"');
  if (i === -1) { console.log(qid + ': NOT FOUND'); continue; }
  const start = src.lastIndexOf('{', i - 500 > 0 ? i - 200 : 0);
  // find Choices block after qid
  const ci = src.indexOf('"Choices"', i);
  let d = 0, e = -1;
  const bs = src.indexOf('{', ci);
  for (let k = bs; k < src.length; k++) {
    if (src[k] === '{') d++;
    else if (src[k] === '}') { d--; if (d === 0) { e = k; break; } }
  }
  const ch = JSON.parse(src.substring(bs, e + 1));
  const cc = (src.match(new RegExp('"QuestionID": "' + qid.replace(/-/g, '\\-') + '"[\\s\\S]{0,3000}?"CorrectChoice": "([A-D])"')) || [])[1];
  console.log('=== ' + qid + ' (CC=' + cc + ') ===');
  for (const L of ['A', 'B', 'C', 'D']) console.log('  ' + L + (L === cc ? '*' : ' ') + ': ' + ch[L]);
}