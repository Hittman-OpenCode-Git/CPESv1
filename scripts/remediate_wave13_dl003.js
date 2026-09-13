// DL-003 remediation: 13 TRUE-POSITIVE absolute-language slots across 12 Wave-13
// items in content/packs/pack_c_corrected.js (all Certified).
// Adjudication: strong always/never in distractor stating a false universal;
// softening preserves the misconception, removes the cue (Batch-2 precedent).
// KEPT (false positives, untouched): DC-106D + DC-119C/D ("must" requirement
// phrasing, Batch-3 precedent) and DC-118B (factual universal in key, Batch-2
// factually-true parallel).
// Evidence basis (Rule 17): adjudicated third-party findings
// (reports/WAVE1315_THIRD_PARTY_REVIEW_REPORT.md §3.1) + live-pack literal
// audit (scripts/verify_wave1315_report.js, scripts/dump_dl003_slots.js).
// Flow: backup -> quarantine (Certified->In Audit) -> exact-match fixes ->
// verify -> recertify (+recertification stamps, Rule 16) -> post-asserts.
// Rule-5 compliant: 12 objects. No key/EW/CL/QID changes.
const fs = require('fs');
const DATE = '2026-09-13';
const F = 'content/packs/pack_c_corrected.js';

// [qid, CC (pre-assert, must be unchanged post-fix), oldChoiceFragment, newChoiceFragment]
const FIXES = [
  ['P1-DC-102', 'A', 'presentation never affects profit when by-products sell through', 'presentation does not affect profit when by-products sell through'],
  ['P1-DC-102', 'A', 'deductions always dominate additions', 'deductions dominate additions'],
  ['P1-DC-104', 'A', 'losses never enter equivalent units', 'losses do not enter equivalent units'],
  ['P1-DC-106', 'A', 'denominators count units, never completion', 'denominators count units, not completion'],
  ['P1-DC-112', 'B', 'sequence never matters in step-down', 'sequence does not matter in step-down'],
  ['P1-DC-113', 'A', 'direct always equals reciprocal by construction', 'direct equals reciprocal by construction'],
  ['P1-DC-114', 'D', 'sales value always exceeds separable cost for joint products', 'sales value exceeds separable cost for joint products'],
  ['P1-DC-117', 'B', 'use observable prices, never estimates', 'use observable prices, not estimates'],
  ['P1-DC-119', 'D', 'scrap value is never recognized', 'scrap value is not recognized'],
  ['P1-DC-120', 'C', 'customer premiums are revenue, never cost offsets', 'customer premiums are revenue, not cost offsets'],
  ['P1-DC-121', 'A', 'abnormal never enters EU', 'abnormal does not enter EU'],
  ['P1-DC-125', 'C', 'middle-value outputs are always by-products', 'middle-value outputs are by-products'],
  ['P1-DC-130', 'B', 'simplicity always governs method choice', 'simplicity governs method choice'],
];
const QIDS = [...new Set(FIXES.map((f) => f[0]))];
if (QIDS.length !== 12) throw new Error('expected 12 items, got ' + QIDS.length);

let src = fs.readFileSync(F, 'utf8');
// Backup BEFORE any edit
const bak = F + '.bak-DL003W13-20260913';
fs.copyFileSync(F, bak);
if (fs.statSync(bak).size === 0) throw new Error('BACKUP FAIL');
console.log('backup: ' + bak);

// Wave-13 objects store CorrectChoice BEFORE QuestionID (Pack-B-style field
// order), so per-item scoping uses enclosing-object bounds, never QID-relative
// forward windows (DL-029 lesson).
function objBounds(s, qi) {
  const start = s.lastIndexOf('  {\n    "Part": 1,', qi);
  if (start === -1) throw new Error('OBJECT START not found');
  const nextObj = s.indexOf('  {\n    "Part": 1,', qi + 20);
  return [start, nextObj === -1 ? s.length : nextObj];
}

// Pre-asserts: each QID present + Certified + CC matches + old fragment count==1
for (const [qid, cc, oldS] of FIXES) {
  const qi = src.indexOf('"QuestionID": "' + qid + '"');
  if (qi === -1) throw new Error('PRE-ASSERT QID: ' + qid);
  const [os, oe] = objBounds(src, qi);
  const win = src.slice(os, oe);
  if (!win.includes('"question_state": "Certified"')) throw new Error('PRE-ASSERT state: ' + qid);
  if (!win.includes('"CorrectChoice": "' + cc + '"')) throw new Error('PRE-ASSERT CC: ' + qid);
  const count = src.split(oldS).length - 1;
  if (count !== 1) throw new Error('PRE-ASSERT count=' + count + ': ' + oldS.slice(0, 60));
}

// Quarantine: Certified -> In Audit (within enclosing object)
for (const qid of QIDS) {
  const qi = src.indexOf('"QuestionID": "' + qid + '"');
  const [os, oe] = objBounds(src, qi);
  const win = src.slice(os, oe);
  const si = win.indexOf('"question_state": "Certified"');
  if (si === -1) throw new Error('QUARANTINE FAIL: ' + qid);
  const absSi = os + si;
  src = src.slice(0, absSi) + '"question_state": "In Audit"' + src.slice(absSi + '"question_state": "Certified"'.length);
}

// Apply fixes ($-safe function replacers, one occurrence each asserted above)
for (const [, , oldS, newS] of FIXES) {
  src = src.replace(oldS, () => newS);
}

fs.writeFileSync(F, src, 'utf8');

// Post-fix verification on live file
const check = fs.readFileSync(F, 'utf8');
const varName = 'MCQ_BANK_C';
const arr = new Function(check + '\nreturn ' + varName + ';')();
if (arr.length !== 620) throw new Error('POST-ASSERT parse length=' + arr.length);
const qidCount = (check.match(/"QuestionID"\s*:/g) || []).length;
if (qidCount !== 620) throw new Error('POST-ASSERT QID count=' + qidCount);
const byId = new Map(arr.map((o) => [o.QuestionID, o]));
const strong = /\b(always|never|impossible)\b/i;
for (const [qid, cc, , newS] of FIXES) {
  const it = byId.get(qid);
  if (!it) throw new Error('POST-ASSERT missing ' + qid);
  if (it.CorrectChoice !== cc) throw new Error('POST-ASSERT KEY CHANGED ' + qid);
  if (it.question_state !== 'In Audit') throw new Error('POST-ASSERT quarantine ' + qid);
  // edited slot must contain the new phrasing and no strong term
  let found = false;
  for (const L of ['A', 'B', 'C', 'D']) {
    const t = it.Choices[L] || '';
    if (t.includes(newS)) {
      found = true;
      if (strong.test(t)) throw new Error('POST-ASSERT residual absolute ' + qid + ' slot ' + L);
    }
  }
  if (!found) throw new Error('POST-ASSERT new text missing ' + qid);
  // DL-008 / DL-026 intact on touched items
  if (it['ExplanationWrong' + it.CorrectChoice] !== '') throw new Error('POST-ASSERT DL008 ' + qid);
  for (const L of ['A', 'B', 'C', 'D']) {
    if (L === it.CorrectChoice) continue;
    const v = it['ExplanationWrong' + L];
    if (typeof v !== 'string' || v.trim().length < 50) throw new Error('POST-ASSERT DL026 ' + qid + ' ' + L);
  }
}
// kept slots untouched
for (const [qid, slot, frag] of [['P1-DC-106','D','must be purged'],['P1-DC-118','B','never occur'],['P1-DC-119','C','must hit period loss'],['P1-DC-119','D','must hit period loss']]) {
  const it = byId.get(qid);
  if (!(it.Choices[slot] || '').includes(frag)) throw new Error('POST-ASSERT kept slot altered ' + qid + slot);
}
console.log('FIXES APPLIED + VERIFIED (quarantined): 13 slots / 12 items, keys intact, DL-008/026 clean');

// Recertify: In Audit -> Certified + recertification stamps (Rule 16; original batch preserved)
for (const qid of QIDS) {
  const qi = src.indexOf('"QuestionID": "' + qid + '"');
  const [os, oe] = objBounds(src, qi);
  const win = src.slice(os, oe);
  const si = win.indexOf('"question_state": "In Audit"');
  if (si === -1) throw new Error('RECERT FAIL state: ' + qid);
  const absSi = os + si;
  src = src.slice(0, absSi) + '"question_state": "Certified"' + src.slice(absSi + '"question_state": "In Audit"'.length);
  const qi2 = src.indexOf('"QuestionID": "' + qid + '"');
  const [os2, oe2] = objBounds(src, qi2);
  const win2 = src.slice(os2, oe2);
  const cbRel = win2.indexOf('"certification_batch": "');
  if (cbRel === -1) throw new Error('RECERT batch field: ' + qid);
  const cb = os2 + cbRel;
  const valStart = cb + '"certification_batch": "'.length;
  const cbClose = src.indexOf('"', valStart);
  if (cbClose === -1 || cbClose > oe2) throw new Error('RECERT batch close: ' + qid);
  src = src.slice(0, cbClose + 1) + ',\n    "recertification_batch": "Tier 3 Wave 13 DL-003 remediation (13 verified-TP slots)",\n    "recertification_date": "' + DATE + '"' + src.slice(cbClose + 1);
}
fs.writeFileSync(F, src, 'utf8');
const final = fs.readFileSync(F, 'utf8');
const arr2 = new Function(final + '\nreturn MCQ_BANK_C;')();
if (arr2.length !== 620) throw new Error('FINAL parse length=' + arr2.length);
const byId2 = new Map(arr2.map((o) => [o.QuestionID, o]));
for (const qid of QIDS) {
  const it = byId2.get(qid);
  if (it.question_state !== 'Certified') throw new Error('FINAL state ' + qid);
  if (it.recertification_date !== DATE) throw new Error('FINAL stamp ' + qid);
}
console.log('RECERTIFIED: 12 items Certified + recertification stamps ' + DATE);
