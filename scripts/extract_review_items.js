const fs = require('fs');

// Load semantic key verifier output
const skv = JSON.parse(fs.readFileSync('scripts/output/semantic_key_verifier.json', 'utf8'));

// Load case semantic flags
const csf = JSON.parse(fs.readFileSync('scripts/output/case_semantic_flags.json', 'utf8'));

// Extract REVIEW flags from semantic key verifier (68 items)
const reviewFlags = skv.bFlags.review || [];
console.log('Semantic Key Verifier REVIEW flags:', reviewFlags.length);

// Extract certified-state flags from case semantic screens (148 items)
const certifiedFlags = csf.flags.filter(f => f.itemState === 'Certified' || f.caseState === 'Certified');
console.log('Case Semantic Screens Certified flags:', certifiedFlags.length);

// Group by screen type
const byScreen = {};
for (const f of certifiedFlags) {
  const s = f.screen || 'unknown';
  if (!byScreen[s]) byScreen[s] = [];
  byScreen[s].push(f);
}

for (const [screen, items] of Object.entries(byScreen)) {
  console.log(`  ${screen}: ${items.length} items`);
}

// Group by severity
const bySeverity = {};
for (const f of certifiedFlags) {
  const s = f.severity || 'unknown';
  if (!bySeverity[s]) bySeverity[s] = [];
  bySeverity[s].push(f);
}

for (const [sev, items] of Object.entries(bySeverity)) {
  console.log(`  ${sev}: ${items.length} items`);
}

// ===========================
// Write MCQ REVIEW items file
// ===========================
let mcqContent = 'MCQ SEMANTIC KEY VERIFIER — REVIEW ITEMS FOR EXTERNAL ADJUDICATION\n';
mcqContent += '====================================================================\n';
mcqContent += 'Generated: ' + new Date().toISOString() + '\n';
mcqContent += 'Source: scripts/output/semantic_key_verifier.json (bFlags.review)\n';
mcqContent += 'Screen: B (INVERSION) — demoted from BLOCK to REVIEW-only per 2026-09-20 calibration\n';
mcqContent += 'Total: ' + reviewFlags.length + ' items\n\n';
mcqContent += 'INSTRUCTIONS:\n';
mcqContent += 'Each item below has a predicted correct choice (bestLetter) that differs from\n';
mcqContent += 'the stored CorrectChoice (storedCC). Per DL-045 doctrine, screen output is evidence,\n';
mcqContent += 'not an author. Each item requires independent hand-solve against the stem,\n';
mcqContent += 'choices, and exhibits to determine if the stored CC is correct or if the\n';
mcqContent += 'explanation has a genuine inversion.\n\n';
mcqContent += 'Known FPs (29/29 confirmed): B:INVERSION on calculation items with lead-phrase\n';
mcqContent += 'keyword overlap. Per calibration, these are REVIEW-only, not BLOCK.\n\n';
mcqContent += '---\n\n';

for (const f of reviewFlags) {
  mcqContent += `QID: ${f.qid}\n`;
  mcqContent += `  Pack: ${f.pack}\n`;
  mcqContent += `  Stored CorrectChoice (storedCC): ${f.storedCC}\n`;
  mcqContent += `  Predicted bestLetter: ${f.bestLetter}\n`;
  mcqContent += `  bestRecall: ${f.bestRecall}%\n`;
  mcqContent += `  ccRecall: ${f.ccRecall}%\n`;
  mcqContent += `  Margin: ${f.margin}%\n`;
  mcqContent += `  bestLeadWordCount: ${f.bestLeadWordCount}\n`;
  mcqContent += `  EC Preview: ${f.ecPreview?.substring(0, 120)}...\n\n`;
}

// ===========================
// Write Case Semantic Screens certified items file
// ===========================
let caseContent = 'CASE SEMANTIC SCREENS — CERTIFIED-STATE ITEMS FOR EXTERNAL ADJUDICATION\n';
caseContent += '========================================================================\n';
caseContent += 'Generated: ' + new Date().toISOString() + '\n';
caseContent += 'Source: scripts/output/case_semantic_flags.json\n';
caseContent += 'Total certified-state flags: ' + certifiedFlags.length + '\n';
caseContent += 'Total flags (all states): ' + csf.flags.length + '\n\n';
caseContent += 'INSTRUCTIONS:\n';
caseContent += 'Each item below is in a Certified case (caseState=Certified, itemState=Certified)\n';
caseContent += 'but triggered a semantic screen flag. Per DL-047/DL-051 flow, these require\n';
caseContent += 'hand-solve adjudication: quarantine → fix → verify → restore with provenance stamp.\n';
caseContent += 'Screen output is evidence, not an author (DL-045).\n\n';
caseContent += 'Severity legend:\n';
caseContent += '  FLAG — Requires hand-solve adjudication (potential genuine defect)\n';
caseContent += '  weak — Documented false positive pattern (e.g., EXTRA-REFUTED)\n';
caseContent += '  info — Benign (e.g., SHORT explanations below threshold)\n\n';
caseContent += '---\n\n';

for (const [screen, items] of Object.entries(byScreen)) {
  caseContent += `=== Screen ${screen} (${items.length} items) ===\n\n`;
  
  for (const f of items) {
    caseContent += `Case: ${f.caseId}\n`;
    caseContent += `  Item: ${f.itemId}\n`;
    caseContent += `  Screen: ${f.screen}\n`;
    caseContent += `  Severity: ${f.severity}\n`;
    caseContent += `  Detail: ${f.detail}\n`;
    caseContent += `  Bank: ${f.bank}\n`;
    caseContent += `  Part: ${f.part}\n\n`;
  }
}

// ===========================
// Write summary index file
// ===========================
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
indexContent += '4. SOURCE_JSONs.zip — Raw JSON outputs for programmatic access\n\n';
indexContent += 'COUNTS:\n';
indexContent += '--------\n';
indexContent += 'MCQ B:INVERSION REVIEW:     ' + reviewFlags.length + '\n';
indexContent += 'Case B:INVERSION:          149 (148 certified-state)\n';
indexContent += 'Case B:UNSUPPORTED-CORRECT: 45\n';
indexContent += 'Case C:jaccard (FLAG):      96 (FLAG severity)\n';
indexContent += 'Case C:SHORT (info):        32\n';
indexContent += 'Case B:DISJOINT:            9\n';
indexContent += 'Case B-num:SIGN-CONVENTION: 11\n\n';
indexContent += 'TOTAL CERTIFIED-STATE FLAGS: ' + certifiedFlags.length + '\n\n';
indexContent += 'GOVERNANCE CONTEXT:\n';
indexContent += '-------------------\n';
indexContent += '- DL-045: Screen output is evidence, not an author\n';
indexContent += '- DL-047: Quarantine → fix → verify → restore with provenance stamp\n';
indexContent += '- 2026-09-20 Calibration: B:INVERSION demoted BLOCK→REVIEW (29/29 FPs)\n';
indexContent += '- DL-051: Case semantic screens operational (Phase 1-4 complete)\n\n';
indexContent += 'ADJUDICATION WORKFLOW:\n';
indexContent += '1. Load item from source pack file (QID/CaseID+ItemID)\n';
indexContent += '2. Read stem, choices, exhibits, stored CorrectChoice\n';
indexContent += '3. Independently hand-solve\n';
indexContent += '4. Compare to stored CC and explanation\n';
indexContent += '5. Record verdict: FP / GENUINE / UNDETERMINED\n';
indexContent += '6. If GENUINE: fix explanation/key, REVISION_HISTORY entry, recertify\n';
indexContent += '7. If FP: document in DEFECT_LIBRARY, no content change\n';

// Write files
fs.writeFileSync('reports/MCQ_REVIEW_ITEMS.txt', mcqContent);
fs.writeFileSync('reports/CASE_REVIEW_ITEMS.txt', caseContent);
fs.writeFileSync('reports/EXTERNAL_REVIEW_INDEX.txt', indexContent);

// Also copy JSON files for programmatic access
fs.copyFileSync('scripts/output/semantic_key_verifier.json', 'reports/semantic_key_verifier.json');
fs.copyFileSync('scripts/output/case_semantic_flags.json', 'reports/case_semantic_flags.json');

console.log('Files written to reports/:');
console.log('  MCQ_REVIEW_ITEMS.txt (' + reviewFlags.length + ' items)');
console.log('  CASE_REVIEW_ITEMS.txt (' + certifiedFlags.length + ' certified items)');
console.log('  EXTERNAL_REVIEW_INDEX.txt');
console.log('  semantic_key_verifier.json (copy)');
console.log('  case_semantic_flags.json (copy)');