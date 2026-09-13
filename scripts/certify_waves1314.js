// Certify Tier 3 Waves 13+14: flip 60 items Unprocessed -> Certified + stamps.
// pack_c P1-DC-101..130 (W13) + pack_a P1-C-101..130 (W14).
// Scoping: nearest-backward "question_state" from each QuestionID (bounded window).
// No brace-matching (DL-020 safe). Rule-5 compliant per 30 (one change-set per pack).
// Fresh backups pre-write (timestamped, verified non-zero before edits).
const fs = require('fs');
const DATE = '2026-09-11';
const stamp = (n) => new Date().toISOString().slice(0, 14).replace(/[-:T]/g, '');
const jobs = [
  { file: 'content/packs/pack_c_corrected.js', prefix: 'P1-DC-', lo: 101, hi: 130, wave: 'Tier 3 Wave 13' },
  { file: 'content/packs/pack_a_corrected.js', prefix: 'P1-C-', lo: 101, hi: 130, wave: 'Tier 3 Wave 14' },
];
for (const j of jobs) {
  const ids = [];
  for (let n = j.lo; n <= j.hi; n++) ids.push(j.prefix + n);
  let src = fs.readFileSync(j.file, 'utf8');
  // Backup BEFORE any edit
  const bak = j.file + '.bak-cert1314-' + stamp();
  fs.copyFileSync(j.file, bak);
  const st = fs.statSync(bak);
  if (st.size === 0) throw new Error('BACKUP FAIL (zero size): ' + bak);
  console.log('backup: ' + bak + ' (' + st.size + ' bytes)');
  let flipped = 0;
  for (const qid of ids) {
    const qi = src.indexOf('"QuestionID": "' + qid + '"');
    if (qi === -1) throw new Error('PRE-ASSERT FAIL: ' + qid + ' not found');
    // question_state sits AFTER QuestionID in these objects: forward-bounded search.
    // Next object starts at most ~6000 chars ahead; bound the window at the next QuestionID.
    let nextQi = src.indexOf('"QuestionID": "P1-', qi + 20);
    if (nextQi === -1) nextQi = src.length;
    const win = src.slice(qi, Math.min(nextQi, qi + 8000));
    const si = win.indexOf('"question_state": "Unprocessed"');
    if (si === -1) throw new Error('PRE-ASSERT FAIL: ' + qid + ' not Unprocessed in window');
    // batch tag check in object window (qi +/- )
    const fwd = src.slice(qi, qi + 4000);
    if (!fwd.includes('pending six-dimension verification')) throw new Error('PRE-ASSERT FAIL tag: ' + qid);
    if (fwd.slice(0, 2000).includes('"certification_date"')) throw new Error('PRE-ASSERT FAIL (already stamped): ' + qid);
    const absSi = qi + si;
    src = src.slice(0, absSi) + '"question_state": "Certified"' + src.slice(absSi + '"question_state": "Unprocessed"'.length);
    // replace batch tag (first occurrence after qi — recompute index shift)
    const qi2 = src.indexOf('"QuestionID": "' + qid + '"');
    const tag = 'pending six-dimension verification';
    const ti = src.indexOf(tag, qi2);
    if (ti === -1 || ti > qi2 + 4000) throw new Error('TAG FAIL: ' + qid);
    src = src.slice(0, ti) + 'certified 2026-09-11 (six-dimension HIGH, user-approved); ' + j.wave + src.slice(ti + tag.length);
    // insert certification_date after certification_batch value: find '"certification_batch": "' after qi2
    const cb = src.indexOf('"certification_batch": "', qi2);
    if (cb === -1 || cb > qi2 + 4000) throw new Error('BATCH FIELD FAIL: ' + qid);
    // batch values contain no double quotes: next quote after value-start is the closer
    // (handles last-in-file objects with no trailing comma)
    const valStart = cb + '"certification_batch": "'.length;
    const cbClose = src.indexOf('"', valStart);
    if (cbClose === -1 || cbClose > qi2 + 6000) throw new Error('BATCH CLOSE FAIL: ' + qid);
    src = src.slice(0, cbClose + 1) + ',\n    "certification_date": "' + DATE + '"' + src.slice(cbClose + 1);
    flipped++;
  }
  if (flipped !== 30) throw new Error('COUNT FAIL ' + j.wave);
  fs.writeFileSync(j.file, src, 'utf8');
  const check = fs.readFileSync(j.file, 'utf8');
  for (const qid of ids) {
    const qi = check.indexOf('"QuestionID": "' + qid + '"');
    const seg = check.substring(Math.max(0, qi - 8000), qi + 6000);
    if (!seg.includes('"question_state": "Certified"')) throw new Error('POST-ASSERT FAIL: ' + qid);
    if (!seg.includes('"certification_date": "' + DATE + '"')) throw new Error('POST-ASSERT stamp: ' + qid);
  }
  console.log(j.file + ' ' + j.wave + ': 30 flipped + stamped.');
}
console.log('CERTIFICATION FLIP COMPLETE: 60 items (Waves 13-14)');