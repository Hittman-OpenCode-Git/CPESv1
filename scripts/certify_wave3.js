// Certify Tier 3 Wave 3: flip 30 items Unprocessed -> Certified + stamps (pack_b P1B-B-201..230).
// SURGICAL string edits only. Rule-5 compliant (30 objects). Fresh backup pre-write.
const fs = require('fs');
const DATE = '2026-09-10';
const F = 'content/packs/pack_b_corrected.js';
let src = fs.readFileSync(F, 'utf8');
let flipped = 0;
for (let n = 201; n <= 230; n++) {
  const qid = 'P1B-B-' + n;
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
  seg = seg.replace('pending six-dimension verification', 'certified 2026-09-10 (six-dimension HIGH, user-approved); Tier 3 Wave 3');
  seg = seg.replace(/("certification_batch": "[^"]*")/, '$1,\n    "certification_date": "' + DATE + '"');
  src = src.substring(0, start) + seg + src.substring(end);
  flipped++;
}
if (flipped !== 30) throw new Error('COUNT FAIL: ' + flipped);
fs.copyFileSync(F, F + '.bak-cert3-20260910');
fs.writeFileSync(F, src, 'utf8');
const check = fs.readFileSync(F, 'utf8');
for (let n = 201; n <= 230; n++) {
  const qid = 'P1B-B-' + n;
  const qi = check.indexOf('"QuestionID": "' + qid + '"');
  const seg = check.substring(Math.max(0, qi - 500), qi + 3000);
  if (!seg.includes('"question_state": "Certified"')) throw new Error('POST-ASSERT FAIL: ' + qid);
  if (!seg.includes('"certification_date": "' + DATE + '"')) throw new Error('POST-ASSERT FAIL stamp: ' + qid);
}
console.log('pack_b: 30 flipped Unprocessed -> Certified + stamps. Backup .bak-cert3-20260910');