// Certify Tier 3 Waves 1+2: flip 60 items Unprocessed -> Certified + stamps.
// SURGICAL string edits only (no full-array re-serialization — untouched item bytes preserved).
// Two change-sets (pack_d 30, pack_c 30), each Rule-5 compliant. Fresh backups pre-write.
const fs = require('fs');
const DATE = '2026-09-10';
const jobs = [
  { file: 'content/packs/pack_d_corrected.js', prefix: 'P1-CD-', lo: 101, hi: 130, wave: 'Tier 3 Wave 1' },
  { file: 'content/packs/pack_c_corrected.js', prefix: 'P1-CC-', lo: 101, hi: 130, wave: 'Tier 3 Wave 2' },
];
for (const j of jobs) {
  let src = fs.readFileSync(j.file, 'utf8');
  // locate each target object span via QID, operate within spans
  let flipped = 0;
  for (let n = j.lo; n <= j.hi; n++) {
    const qid = j.prefix + n;
    const qi = src.indexOf('"QuestionID": "' + qid + '"');
    if (qi === -1) throw new Error('PRE-ASSERT FAIL: ' + qid + ' not found in ' + j.file);
    // object boundaries: scan back/forward for brace balance from qi
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
  fs.copyFileSync(j.file, j.file + '.bak-cert-20260910');
  fs.writeFileSync(j.file, src, 'utf8');
  // post-asserts on written file
  const check = fs.readFileSync(j.file, 'utf8');
  for (let n = j.lo; n <= j.hi; n++) {
    const qid = j.prefix + n;
    const qi = check.indexOf('"QuestionID": "' + qid + '"');
    const seg = check.substring(Math.max(0, qi - 500), qi + 3000);
    if (!seg.includes('"question_state": "Certified"')) throw new Error('POST-ASSERT FAIL: ' + qid + ' not Certified');
    if (!seg.includes('"certification_date": "' + DATE + '"')) throw new Error('POST-ASSERT FAIL: ' + qid + ' missing stamp');
  }
  console.log(j.file + ': 30 flipped Unprocessed -> Certified + stamps. Backup .bak-cert-20260910');
}
console.log('CERTIFICATION FLIP COMPLETE: 60 items');