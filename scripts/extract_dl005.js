const path = require('path');
const fs = require('fs');
const r = require(path.join(__dirname, 'reports/output/ValidationReport.json'));
const p = r.find(x => x.validator === 'PsychometricValidator');
const w = p.warnings.filter(x => /100%/.test(x));
const byQ = {};
for (const line of w) {
  const m = line.match(/\[DistractorSimilarityValidator\] (\S+): Choices ([A-D]) and ([A-D]).*?(\d+)%\)/);
  if (!m) continue;
  const qid = m[1];
  byQ[qid] = byQ[qid] || [];
  byQ[qid].push(m[2] + '-' + m[3]);
}
// resolve pack by searching files (authoritative)
const files = {
  A: 'content/packs/pack_a_corrected.js', B: 'content/packs/pack_b_corrected.js',
  C: 'content/packs/pack_c_corrected.js', D: 'content/packs/pack_d_corrected.js',
  E: 'content/packs/pack_e_corrected.js',
};
const cache = {};
function findPack(qid) {
  for (const [k, f] of Object.entries(files)) {
    if (!cache[f]) cache[f] = fs.readFileSync(f, 'utf8');
    if (cache[f].includes('"QuestionID": "' + qid + '"')) return k;
  }
  return '?';
}
const perPack = {};
for (const q of Object.keys(byQ).sort()) {
  const pk = findPack(q);
  perPack[pk] = perPack[pk] || [];
  perPack[pk].push(q);
}
let total = 0;
for (const [k, v] of Object.entries(perPack)) { total += v.length; console.log('Pack ' + k + ' (' + v.length + '): ' + v.join(', ')); }
console.log('TOTAL QIDs: ' + total + ' | 100%-pair warnings: ' + w.length);
fs.writeFileSync(path.join(__dirname, '..', 'reports/DL005_100pct_backlog.json'), JSON.stringify(byQ, null, 2));
console.log('written reports/DL005_100pct_backlog.json');