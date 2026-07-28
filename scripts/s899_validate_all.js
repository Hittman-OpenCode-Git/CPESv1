const fs = require('fs');

console.log('=== S899 VALIDATION ===\n');

// 1. QID counts
console.log('1. QID Counts:');
['pack_c_corrected.js', 'pack_d_corrected.js'].forEach(f => {
  const r = fs.readFileSync(f, 'utf8');
  const allQIDs = (r.match(/"QuestionID": "P1-/g) || []).length;
  const efQIDs = (r.match(/"QuestionID": "P1-[EF][CD]-\d+"/g) || []).length;
  console.log(`  ${f}: Total QIDs=${allQIDs}, E+F QIDs=${efQIDs}`);
});

// 2. Archived counts
console.log('\n2. Archived Counts:');
['pack_c_corrected.js', 'pack_d_corrected.js'].forEach(f => {
  const r = fs.readFileSync(f, 'utf8');
  const allArchived = (r.match(/"question_state": "Archived"/g) || []).length;
  const efArchived = (r.match(/"QuestionID": "P1-[EF][CD]-\d+"/g) || [])
    .filter(q => {
      const idx = r.indexOf(q);
      return r.substring(idx, idx + 5000).includes('"question_state": "Archived"');
    }).length;
  console.log(`  ${f}: Total Archived=${allArchived}, E+F Archived=${efArchived}`);
});

// 3. Active counts
console.log('\n3. Active Counts (new items):');
const authoredQIDs = [
  'P1-EC-001','P1-EC-005','P1-EC-010','P1-EC-030','P1-EC-055',
  'P1-ED-002','P1-ED-015','P1-ED-020','P1-ED-040','P1-ED-050',
  'P1-FC-005','P1-FC-016','P1-FC-045','P1-FC-050','P1-FD-002',
  'P1-FD-010','P1-FD-020','P1-FD-040','P1-FD-050','P1-FD-046'
];
let allActive = true;
authoredQIDs.forEach(qid => {
  const f = qid.includes('-FC-') ? 'pack_c_corrected.js' : 
            (qid.includes('-EC-') ? 'pack_c_corrected.js' : 'pack_d_corrected.js');
  const r = fs.readFileSync(f, 'utf8');
  const idx = r.indexOf('"QuestionID": "' + qid + '"');
  if (idx < 0) { console.log(`  ${qid}: NOT FOUND`); allActive = false; return; }
  const active = r.substring(idx, idx + 5000).includes('"question_state": "Active"');
  const bloom = r.substring(idx, idx + 5000).match(/"CognitiveLevel":\s*"(Analyze|Evaluate)"/);
  const diff = r.substring(idx, idx + 5000).match(/"DifficultyScore":\s*(\d+)/);
  console.log(`  ${qid}: ${active ? 'Active' : 'FAIL'}, Bloom=${bloom?bloom[1]:'?'}, Diff=${diff?diff[1]:'?'}`);
  if (!active) allActive = false;
});

// 4. DL-008 check
console.log('\n4. DL-008 Check (non-empty ExplanationWrong[CorrectChoice]):');
let dl008Count = 0;
authoredQIDs.forEach(qid => {
  const f = qid.includes('-FC-') || qid.includes('-EC-') ? 'pack_c_corrected.js' : 'pack_d_corrected.js';
  const r = fs.readFileSync(f, 'utf8');
  const idx = r.indexOf('"QuestionID": "' + qid + '"');
  if (idx < 0) return;
  const w = r.substring(idx, idx + 8000);
  const ccMatch = w.match(/"CorrectChoice":\s*"(A|B|C|D)"/);
  if (!ccMatch) return;
  const cc = ccMatch[1];
  const ewMatch = w.match(new RegExp('"ExplanationWrong' + cc + '":\\s*"([^"]*)"'));
  if (ewMatch && ewMatch[1] && ewMatch[1].length > 0) {
    console.log(`  ${qid}: DL-008 — ExplanationWrong${cc} is non-empty (${ewMatch[1].length} chars)`);
    dl008Count++;
  }
});
console.log(`  Total DL-008: ${dl008Count}`);

// 5. Summary
console.log('\n5. SUMMARY:');
const analyze = authoredQIDs.filter(q => {
  const f = q.includes('-FC-') || q.includes('-EC-') ? 'pack_c_corrected.js' : 'pack_d_corrected.js';
  const r = fs.readFileSync(f, 'utf8');
  const idx = r.indexOf('"QuestionID": "' + q + '"');
  return idx >= 0 && r.substring(idx, idx + 5000).includes('"CognitiveLevel": "Analyze"');
}).length;
const evaluate = authoredQIDs.filter(q => {
  const f = q.includes('-FC-') || q.includes('-EC-') ? 'pack_c_corrected.js' : 'pack_d_corrected.js';
  const r = fs.readFileSync(f, 'utf8');
  const idx = r.indexOf('"QuestionID": "' + q + '"');
  return idx >= 0 && r.substring(idx, idx + 5000).includes('"CognitiveLevel": "Evaluate"');
}).length;
console.log(`  Bloom: Analyze=${analyze}, Evaluate=${evaluate}`);
console.log(`  All Active: ${allActive}`);
console.log(`  DL-008 violations: ${dl008Count}`);

if (allActive && dl008Count === 0) {
  console.log('\n*** ALL CHECKS PASS ***');
} else {
  console.log('\n*** CHECKS FAILED ***');
}
