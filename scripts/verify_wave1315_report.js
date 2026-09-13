// Dual-verification of reports/WAVE1315_THIRD_PARTY_REVIEW_REPORT.md against live packs.
// Checks for all 90 QIDs: DL-008, DL-026, R18 lengths, stored CC.
// Checks report §4 spot-check CC values + §3.1 DL-003 slot/term presence + non-CC status.
// Read-only. No pack writes.
const fs = require('fs');
const packs = { A: 'content/packs/pack_a_corrected.js', B: 'content/packs/pack_b_corrected.js', C: 'content/packs/pack_c_corrected.js' };
const bankVar = { A: 'MCQ_BANK_A', B: 'MCQ_BANK_B', C: 'MCQ_BANK_C' };
const banks = {};
for (const p of ['A', 'B', 'C']) {
  const src = fs.readFileSync(packs[p], 'utf8');
  banks[p] = new Function(src + '\nreturn ' + bankVar[p] + ';')();
}
const byId = new Map();
for (const p of ['A', 'B', 'C']) for (const o of banks[p]) byId.set(o.QuestionID, o);

const ids = [];
for (let n = 101; n <= 130; n++) ids.push('P1-DC-' + n);
for (let n = 101; n <= 130; n++) ids.push('P1-C-' + n);
for (let n = 211; n <= 240; n++) ids.push('P1B-C-' + n);

// 1. Structural sweep on all 90
let dl008 = 0, dl026 = 0, r18 = 0, nonCert = 0, missing = 0;
for (const qid of ids) {
  const it = byId.get(qid);
  if (!it) { missing++; console.log('MISSING ' + qid); continue; }
  if (it.question_state !== 'Certified') { nonCert++; console.log('STATE ' + qid + ' ' + it.question_state); }
  if (it['ExplanationWrong' + it.CorrectChoice] !== '') { dl008++; console.log('DL008 ' + qid); }
  for (const L of ['A', 'B', 'C', 'D']) {
    if (L === it.CorrectChoice) continue;
    const v = it['ExplanationWrong' + L];
    if (typeof v !== 'string' || v.trim().length < 50) { dl026++; console.log('DL026 ' + qid + ' slot ' + L); }
  }
  for (const L of ['A', 'B', 'C', 'D']) {
    if ((it.Choices[L] || '').trim().length < 8) { r18++; console.log('R18 ' + qid + ' slot ' + L); }
  }
}
console.log('structural: missing=' + missing + ' nonCert=' + nonCert + ' DL008=' + dl008 + ' DL026=' + dl026 + ' R18=' + r18);

// 2. Report §4 spot-check CC values
const spots = [['P1-DC-101','C'],['P1-DC-104','A'],['P1-DC-105','C'],['P1-DC-108','D'],['P1-DC-110','D'],['P1-DC-112','B'],['P1-DC-117','B'],['P1-DC-118','B'],['P1-DC-121','A'],['P1-DC-124','A'],['P1-C-101','C'],['P1-C-102','A'],['P1-C-105','A'],['P1-C-106','D'],['P1-C-109','B'],['P1-C-110','B'],['P1-C-113','D'],['P1-C-115','A'],['P1-C-116','C'],['P1B-C-211','C'],['P1B-C-213','D'],['P1B-C-214','B'],['P1B-C-228','C'],['P1B-C-229','B'],['P1B-C-234','A'],['P1B-C-240','B']];
let spotOk = 0;
for (const [qid, cc] of spots) {
  const it = byId.get(qid);
  if (it && it.CorrectChoice === cc) spotOk++;
  else console.log('SPOT MISMATCH ' + qid + ' live=' + (it && it.CorrectChoice) + ' report=' + cc);
}
console.log('spot-checks: ' + spotOk + '/' + spots.length);

// 3. Report §3.1 DL-003 slots: term present + slot != CC
const dl003 = [['P1-DC-102','B','never'],['P1-DC-102','D','always'],['P1-DC-104','B','never'],['P1-DC-106','C','never'],['P1-DC-106','D','must'],['P1-DC-112','A','never'],['P1-DC-113','B','always'],['P1-DC-114','B','always'],['P1-DC-117','A','never'],['P1-DC-118','B','never'],['P1-DC-119','B','never'],['P1-DC-119','C','must'],['P1-DC-119','D','must'],['P1-DC-120','D','never'],['P1-DC-121','D','never'],['P1-DC-125','B','always'],['P1-DC-130','A','always']];
const hitQids = new Set();
let confirmed = 0;
for (const [qid, slot, term] of dl003) {
  const it = byId.get(qid);
  if (!it) { console.log('DL003 QID MISSING ' + qid); continue; }
  const text = it.Choices[slot] || '';
  const present = new RegExp('\\b' + term + '\\b', 'i').test(text);
  const isCC = slot === it.CorrectChoice;
  if (present && !isCC) { confirmed++; hitQids.add(qid); }
  else console.log('DL003 UNCONFIRMED ' + qid + ' slot ' + slot + ' present=' + present + ' isCC=' + isCC + ' CC=' + it.CorrectChoice);
}
console.log('DL003 confirmed: ' + confirmed + '/17 slots across ' + hitQids.size + ' distinct QIDs (report says 16 items)');
console.log('QIDs: ' + [...hitQids].sort().join(','));
