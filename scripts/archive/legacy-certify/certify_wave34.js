// Certify Tier 3 Waves 3+4: flip 60 items Unprocessed -> Certified + stamps.
// pack_b P1B-B-201..230 (Wave 3) + pack_a P1-A-076..105 (Wave 4). SURGICAL edits only.
const fs = require('fs');
const DATE = '2026-09-10';
const jobs = [
  { file: 'content/packs/pack_b_corrected.js', ids: Array.from({ length: 30 }, (_, i) => 'P1B-B-' + (201 + i)), wave: 'Tier 3 Wave 3' },
  { file: 'content/packs/pack_a_corrected.js', ids: Array.from({ length: 30 }, (_, i) => 'P1-A-' + String(76 + i).padStart(3, '0')), wave: 'Tier 3 Wave 4' },
];
for (const j of jobs) {
  let src = fs.readFileSync(j.file, 'utf8');
  let flipped = 0;
  for (const qid of j.ids) {
    const qi = src.indexOf('"QuestionID": "' + qid + '"');
    if (qi === -1) throw new Error('PRE-ASSERT FAIL: ' + qid + ' not found in ' + j.file);
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
    seg = seg.replace('pending six-dimension verification', 'certified 2026-09-10 (six-dimension HIGH, user-approved); ' + j.wave);
    seg = seg.replace(/("certification_batch": "[^"]*")/, '$1,\n    "certification_date": "' + DATE + '"');
    src = src.substring(0, start) + seg + src.substring(end);
    flipped++;
  }
  if (flipped !== 30) throw new Error('COUNT FAIL ' + j.file + ': ' + flipped);
  fs.copyFileSync(j.file, j.file + '.bak-cert34-20260910');
  fs.writeFileSync(j.file, src, 'utf8');
  const check = fs.readFileSync(j.file, 'utf8');
  for (const qid of j.ids) {
    const qi = check.indexOf('"QuestionID": "' + qid + '"');
    const seg = check.substring(Math.max(0, qi - 500), qi + 3000);
    if (!seg.includes('"question_state": "Certified"')) throw new Error('POST-ASSERT FAIL: ' + qid);
    if (!seg.includes('"certification_date": "' + DATE + '"')) throw new Error('POST-ASSERT FAIL stamp: ' + qid);
  }
  console.log(j.file + ': 30 flipped. Backup .bak-cert34-20260910');
}
console.log('CERTIFICATION FLIP COMPLETE: 60 items (Waves 3+4)');