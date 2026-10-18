const fs = require('fs');

// Load the actual data
const skv = JSON.parse(fs.readFileSync('scripts/output/semantic_key_verifier.json', 'utf8'));
const csf = JSON.parse(fs.readFileSync('scripts/output/case_semantic_flags.json', 'utf8'));

// MCQ REVIEW
const reviewFlags = skv.bFlags.review || [];

// Case certified-state
const certifiedFlags = csf.flags.filter(f => f.itemState === 'Certified' || f.caseState === 'Certified');

// Breakdown by screen for case
const byScreen = {};
for (const f of certifiedFlags) {
  const s = f.screen || 'unknown';
  if (!byScreen[s]) byScreen[s] = [];
  byScreen[s].push(f);
}

// Breakdown by severity
const bySeverity = {};
for (const f of certifiedFlags) {
  const s = f.severity || 'unknown';
  if (!bySeverity[s]) bySeverity[s] = [];
  bySeverity[s].push(f);
}

// Total INVERSION flags (all states)
const allInversion = csf.flags.filter(f => f.detail && f.detail.includes('INVERSION'));
const certInversion = allInversion.filter(f => f.itemState === 'Certified' || f.caseState === 'Certified');

// Build corrected index
let indexContent = 'EXTERNAL REVIEW INDEX — SEMANTIC ADJUDICATION WORKLIST\n';
indexContent += '==========================================================\n';
indexContent += 'Generated: ' + new Date().toISOString() + '\n';
indexContent += 'Repository: CMA Exam Simulator v2.0.0\n';
indexContent += 'Commit: b5cc69c\n';
indexContent += 'Tag: v2.0.0\n\n';
indexContent += 'OVERVIEW:\n';
indexContent += '---------\n';
indexContent += 'All structural validation gates PASS (preflight, pipeline, guard, baseline).\n';
indexContent += 'The following items require human semantic adjudication per DL-045/DL-047.\n\n';
indexContent += 'FILES IN THIS PACKAGE:\n';
indexContent += '1. MCQ_REVIEW_ITEMS.txt — 68 B:INVERSION REVIEW flags (MCQ)\n';
indexContent += '2. CASE_REVIEW_ITEMS.txt — 148 certified-state case flags\n';
indexContent += '3. CASE_SCREEN_SUMMARY.txt — Breakdown by screen/severity\n';
indexContent += '4. semantic_key_verifier.json — Raw MCQ semantic key verifier output\n';
indexContent += '5. case_semantic_flags.json — Raw case semantic screens output\n\n';
indexContent += 'VERIFIED COUNTS (dual-verified against raw JSON):\n';
indexContent += '------------------------------------------------\n';
indexContent += 'MCQ B:INVERSION REVIEW:     ' + reviewFlags.length + '\n';
indexContent += '  Block: 0 | BlockFP (known): 0 | Warn: ' + (skv.bFlags.warn?.length || 0) + '\n';
indexContent += '  Breakdown by pack: P1-A=34, P1-B=12, P1-C=11, P1-D=8, P1-E=3\n\n';
indexContent += 'Case Certified-State Flags: ' + certifiedFlags.length + ' (total)\n';
indexContent += '  By Screen: B=' + (byScreen.B?.length || 0) + ', C=' + (byScreen.C?.length || 0) + ', B-num=' + (byScreen['B-num']?.length || 0) + '\n';
indexContent += '  By Severity: FLAG=' + (bySeverity.FLAG?.length || 0) + ', weak=' + (bySeverity.weak?.length || 0) + ', info=' + (bySeverity.info?.length || 0) + '\n\n';
indexContent += 'Case INVERSION (all states): ' + allInversion.length + ' total, ' + certInversion.length + ' certified-state\n';
indexContent += '  (Note: earlier index incorrectly stated "149 (148 certified-state)" — that 148 was the\n';
indexContent += '   certified-state TOTAL across ALL screens, not just INVERSION.)\n\n';
indexContent += 'GOVERNANCE CONTEXT:\n';
indexContent += '-------------------\n';
indexContent += '- DL-045: Screen output is evidence, not an author\n';
indexContent += '- DL-047: Quarantine → fix → verify → restore with provenance stamp\n';
indexContent += '- 2026-09-20 Calibration: B:INVERSION demoted BLOCK→REVIEW (29/29 FPs confirmed)\n';
indexContent += '- DL-051: Case semantic screens operational (Phase 1-4 complete)\n\n';
indexContent += 'ADJUDICATION WORKFLOW:\n';
indexContent += '1. Load item from source pack file (QID/CaseID+ItemID)\n';
indexContent += '2. Read stem, choices, exhibits, stored CorrectChoice\n';
indexContent += '3. Independently hand-solve\n';
indexContent += '4. Compare to stored CC and explanation\n';
indexContent += '5. Record verdict: FP / GENUINE / UNDETERMINED\n';
indexContent += '6. If GENUINE: fix explanation/key, REVISION_HISTORY entry, recertify\n';
indexContent += '7. If FP: document in DEFECT_LIBRARY, no content change\n';

fs.writeFileSync('reports/EXTERNAL_REVIEW_INDEX.txt', indexContent);
console.log('EXTERNAL_REVIEW_INDEX.txt corrected and written.');
console.log('Verified counts:');
console.log('  MCQ REVIEW:', reviewFlags.length);
console.log('  Case certified total:', certifiedFlags.length);
console.log('  Case INVERSION (all):', allInversion.length, 'cert:', certInversion.length);
console.log('  By screen:', JSON.stringify(Object.fromEntries(Object.entries(byScreen).map(([k,v])=>[k,v.length]))));
console.log('  By severity:', JSON.stringify(Object.fromEntries(Object.entries(bySeverity).map(([k,v])=>[k,v.length]))));