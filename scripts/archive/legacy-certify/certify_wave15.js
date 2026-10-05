// Certify Tier 3 Wave 15: flip 30 items Unprocessed -> Certified + stamps (pack_b P1B-C-211..240).
// Forward-bounded question_state search per QID; quote-anchored batch close (last-in-file safe).
// Rule-5 compliant (30 objects, single change-set). Fresh backup pre-write, verified non-zero.
const fs = require('fs');
const DATE = '2026-09-11';
const F = 'content/packs/pack_b_corrected.js';
const ids = [];
for (let n = 211; n <= 240; n++) ids.push('P1B-C-' + n);
let src = fs.readFileSync(F, 'utf8');
const bak = F + '.bak-cert15-20260911';
fs.copyFileSync(F, bak);
if (fs.statSync(bak).size === 0) throw new Error('BACKUP FAIL');
console.log('backup: ' + bak);
let flipped = 0;
for (const qid of ids) {
  const qi = src.indexOf('"QuestionID": "' + qid + '"');
  if (qi === -1) throw new Error('PRE-ASSERT FAIL: ' + qid);
  let nextQi = src.indexOf('"QuestionID": "P1', qi + 20);
  if (nextQi === -1) nextQi = src.length;
  const win = src.slice(qi, Math.min(nextQi, qi + 8000));
  const si = win.indexOf('"question_state": "Unprocessed"');
  if (si === -1) throw new Error('PRE-ASSERT FAIL state: ' + qid);
  if (!win.includes('pending six-dimension verification')) throw new Error('PRE-ASSERT FAIL tag: ' + qid);
  if (win.slice(0, 2000).includes('"certification_date"')) throw new Error('PRE-ASSERT FAIL stamped: ' + qid);
  const absSi = qi + si;
  src = src.slice(0, absSi) + '"question_state": "Certified"' + src.slice(absSi + '"question_state": "Unprocessed"'.length);
  const qi2 = src.indexOf('"QuestionID": "' + qid + '"');
  const tag = 'pending six-dimension verification';
  const ti = src.indexOf(tag, qi2);
  if (ti === -1 || ti > qi2 + 4000) throw new Error('TAG FAIL: ' + qid);
  src = src.slice(0, ti) + 'certified 2026-09-11 (six-dimension HIGH, user-approved); Tier 3 Wave 15' + src.slice(ti + tag.length);
  const cb = src.indexOf('"certification_batch": "', qi2);
  if (cb === -1 || cb > qi2 + 4000) throw new Error('BATCH FAIL: ' + qid);
  const cbClose = src.indexOf('"', cb + '"certification_batch": "'.length);
  if (cbClose === -1 || cbClose > qi2 + 6000) throw new Error('BATCH CLOSE FAIL: ' + qid);
  src = src.slice(0, cbClose + 1) + ',\n    "certification_date": "' + DATE + '"' + src.slice(cbClose + 1);
  flipped++;
}
if (flipped !== 30) throw new Error('COUNT FAIL');
fs.writeFileSync(F, src, 'utf8');
const check = fs.readFileSync(F, 'utf8');
for (const qid of ids) {
  const qi = check.indexOf('"QuestionID": "' + qid + '"');
  const seg = check.substring(Math.max(0, qi - 8000), qi + 6000);
  if (!seg.includes('"question_state": "Certified"')) throw new Error('POST-ASSERT FAIL: ' + qid);
  if (!seg.includes('"certification_date": "' + DATE + '"')) throw new Error('POST-ASSERT stamp: ' + qid);
}
console.log('CERTIFICATION FLIP COMPLETE: 30 items (Wave 15)');