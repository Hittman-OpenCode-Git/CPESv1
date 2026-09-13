// Certify Tier 3 Waves 10+11: flip 60 items Unprocessed -> Certified + stamps (pack_c).
// P1-AC-101..130 (W10) + P1-BC-101..130 (W11). SURGICAL edits only. Fresh backup pre-write.
const fs = require('fs');
const DATE = '2026-09-11';
const F = 'content/packs/pack_c_corrected.js';
const jobs = [
  { ids: Array.from({ length: 30 }, (_, i) => 'P1-AC-' + (101 + i)), wave: 'Tier 3 Wave 10' },
  { ids: Array.from({ length: 30 }, (_, i) => 'P1-BC-' + (101 + i)), wave: 'Tier 3 Wave 11' },
];
let src = fs.readFileSync(F, 'utf8');
for (const j of jobs) {
  let flipped = 0;
  for (const qid of j.ids) {
    const qi = src.indexOf('"QuestionID": "' + qid + '"');
    if (qi === -1) throw new Error('PRE-ASSERT FAIL: ' + qid + ' not found');
    let d = 0, start = -1;
    for (let i = qi; i >= 0; i--) {
      if (src[i] === '}') d++;
      else if (src[i] === '{') { d--; if (d < 0) { start = i; break; } }
    }
    let d2 = 0, end = -1;
    for (let i = start; i < src.length; i++) {
      if (src[i] === '{') d2++;
      else if (src[i] === '}') { d2--; if (d2 === 0) { end = i + 1; break; } }
    }
    let seg = src.substring(start, end);
    if (!seg.includes('"question_state": "Unprocessed"')) throw new Error('PRE-ASSERT FAIL: ' + qid + ' not Unprocessed');
    if (!seg.includes('pending six-dimension verification')) throw new Error('PRE-ASSERT FAIL: ' + qid + ' missing Tier-3 tag');
    seg = seg.replace('"question_state": "Unprocessed"', '"question_state": "Certified"');
    seg = seg.replace('pending six-dimension verification', 'certified 2026-09-11 (six-dimension HIGH, user-approved); ' + j.wave);
    seg = seg.replace(/("certification_batch": "[^"]*")/, '$1,\n    "certification_date": "' + DATE + '"');
    src = src.substring(0, start) + seg + src.substring(end);
    flipped++;
  }
  if (flipped !== 30) throw new Error('COUNT FAIL ' + j.wave + ': ' + flipped);
  console.log(j.wave + ': 30 staged for flip.');
}
fs.copyFileSync(F, F + '.bak-cert1011-20260911');
fs.writeFileSync(F, src, 'utf8');
const check = fs.readFileSync(F, 'utf8');
for (const j of jobs) {
  for (const qid of j.ids) {
    const qi = check.indexOf('"QuestionID": "' + qid + '"');
    const seg = check.substring(Math.max(0, qi - 500), qi + 3000);
    if (!seg.includes('"question_state": "Certified"')) throw new Error('POST-ASSERT FAIL: ' + qid);
    if (!seg.includes('"certification_date": "' + DATE + '"')) throw new Error('POST-ASSERT FAIL stamp: ' + qid);
  }
}
console.log('CERTIFICATION FLIP COMPLETE: 60 items (Waves 10+11). Backup .bak-cert1011-20260911');