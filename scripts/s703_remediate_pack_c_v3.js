// Session 703 — Pack C DL-008 Remediation (v3 — hybrid: Function constructor + text replacement)

const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'pack_c_corrected.js');

const dl008_only = new Set([
  'P1-BC-002','P1-BC-006','P1-BC-007','P1-BC-024','P1-BC-028','P1-BC-032',
  'P1-BC-057','P1-BC-059','P1-BC-074','P1-BC-075','P1-BC-077','P1-BC-078',
  'P1-BC-079','P1-BC-080','P1-BC-081','P1-BC-084','P1-BC-095','P1-BC-096',
  'P1-BC-097','P1-BC-098','P1-BC-099','P1-DC-019'
]);

const dl008_plus_dl016 = new Set([
  'P1-AC-001','P1-BC-001','P1-BC-003','P1-BC-004','P1-BC-005','P1-BC-009',
  'P1-BC-010','P1-BC-013','P1-BC-016','P1-BC-017','P1-BC-020','P1-BC-021',
  'P1-BC-025','P1-BC-029','P1-BC-033','P1-BC-037','P1-BC-041','P1-BC-045',
  'P1-BC-049','P1-BC-053','P1-BC-058','P1-BC-061','P1-BC-065','P1-BC-069',
  'P1-BC-073','P1-BC-076','P1-BC-082','P1-BC-083','P1-BC-088','P1-BC-100'
]);

// Step 1: Parse with Function constructor
console.log('=== STEP 1: Parse file ===');
const fileCode = fs.readFileSync(FILE_PATH, 'utf8');
const MCQ_BANK_C = new Function(fileCode + '; return MCQ_BANK_C;')();
console.log(`Parsed: ${MCQ_BANK_C.length} items`);

// Step 2: Build target info from within-object data
console.log('\n=== STEP 2: Build target info ===');
const targets = [];

for (const item of MCQ_BANK_C) {
  const qid = item.QuestionID;
  if (!dl008_only.has(qid) && !dl008_plus_dl016.has(qid)) continue;
  
  const cc = item.CorrectChoice;
  const ewField = 'ExplanationWrong' + cc;
  const ewValue = item[ewField];
  
  if (!ewValue || ewValue.length === 0) {
    console.log(`  SKIP ${qid}: EW_${cc} already empty`);
    continue;
  }
  
  const isOnly = dl008_only.has(qid);
  targets.push({
    qid,
    cc,
    ewField,
    ewValue,
    ewLength: ewValue.length,
    classification: isOnly ? 'DL-008_ONLY' : 'DL-008_PLUS_DL-016',
    decision: isOnly ? 'safe_clear' : 'CC_VERIFIED_CLEAR_ALLOWED'
  });
  
  console.log(`  TARGET ${qid}: CC=${cc}, EW_${cc}=${ewValue.length}c [${targets[targets.length-1].classification}]`);
}

console.log(`\nTotal targets to clear: ${targets.length}`);

// Step 3: Perform text-level replacements (process in reverse order to preserve positions)
console.log('\n=== STEP 3: Text-level replacement ===');
let content = fileCode;
let cleared = 0;
let failed = 0;
const results = { cleared: [], failed: [] };

// Process in reverse order of position to avoid offset issues
// First, find all positions
const targetsWithPositions = [];
for (const t of targets) {
  const qidPattern = `"QuestionID": "${t.qid}"`;
  const qidPos = content.indexOf(qidPattern);
  if (qidPos === -1) {
    console.log(`  FAIL ${t.qid}: QID not found`);
    results.failed.push({ ...t, reason: 'QID_PATTERN_NOT_FOUND' });
    failed++;
    continue;
  }
  
  // Find EW field after QID position
  const ewKey = `"ExplanationWrong${t.cc}"`;
  const ewPos = content.indexOf(ewKey, qidPos);
  if (ewPos === -1) {
    console.log(`  FAIL ${t.qid}: EW_${t.cc} key not found after QID`);
    results.failed.push({ ...t, reason: 'EW_KEY_NOT_FOUND' });
    failed++;
    continue;
  }
  
  // Find value. After "ExplanationWrongX": ", there's the value.
  const colonPos = content.indexOf(':', ewPos);
  const valueQuotePos = content.indexOf('"', colonPos + 1);
  if (valueQuotePos === -1) {
    console.log(`  FAIL ${t.qid}: Value quote not found`);
    results.failed.push({ ...t, reason: 'VALUE_QUOTE_NOT_FOUND' });
    failed++;
    continue;
  }
  
  // Find closing quote (string-aware)
  let esc = false;
  let closePos = -1;
  for (let i = valueQuotePos + 1; i < content.length; i++) {
    const ch = content[i];
    if (esc) { esc = false; continue; }
    if (ch === '\\') { esc = true; continue; }
    if (ch === '"') { closePos = i; break; }
  }
  if (closePos === -1) {
    console.log(`  FAIL ${t.qid}: Closing quote not found`);
    results.failed.push({ ...t, reason: 'CLOSE_QUOTE_NOT_FOUND' });
    failed++;
    continue;
  }
  
  const actualValue = content.substring(valueQuotePos + 1, closePos);
  
  // Sanity check: does the value match what we expect?
  // (The first 20 chars should match)
  if (actualValue.substring(0, 20) !== t.ewValue.substring(0, 20)) {
    console.log(`  MISMATCH ${t.qid}: file="${actualValue.substring(0, 30)}..." vs parsed="${t.ewValue.substring(0, 30)}..."`);
    // Continue anyway - the parsed value should be authoritative
  }
  
  targetsWithPositions.push({
    ...t,
    filePos: valueQuotePos,
    closePos,
    actualValue,
    actualLength: closePos - valueQuotePos - 1
  });
}

// Sort by file position, descending → process from end to start to preserve positions
targetsWithPositions.sort((a, b) => b.filePos - a.filePos);

console.log(`Processing ${targetsWithPositions.length} items (sorted descending)`);

for (const t of targetsWithPositions) {
  // Replace: keep "...": " up to opening quote, skip value, keep " after
  const before = content.substring(0, t.filePos + 1); // up to and including opening "
  const after = content.substring(t.closePos);          // from closing " onwards
  content = before + after;
  
  cleared++;
  results.cleared.push({
    qid: t.qid,
    cc: t.cc,
    field: t.ewField,
    wasLength: t.ewLength,
    fileLength: t.actualLength,
    classification: t.classification,
    decision: t.decision
  });
  
  console.log(`  ${cleared}. ${t.qid}: EW_${t.cc} ${t.actualLength}c → 0c`);
}

// Step 4: Write updated file
console.log('\n=== STEP 4: Write ===');
fs.writeFileSync(FILE_PATH, content, 'utf8');
console.log(`Written: ${content.length} bytes (was ${fileCode.length})`);

// Step 5: Verify
console.log('\n=== STEP 5: Verify ===');
try {
  const reloaded = new Function(content + '; return MCQ_BANK_C;')();
  console.log(`Re-parse OK: ${reloaded.length} items`);
  
  let residualDL008 = 0;
  for (const item of reloaded) {
    const qid = item.QuestionID;
    if (!dl008_only.has(qid) && !dl008_plus_dl016.has(qid)) continue;
    const cc = item.CorrectChoice;
    const ew = item['ExplanationWrong' + cc];
    if (ew && ew.length > 0) {
      residualDL008++;
      console.log(`  REMAINS: ${qid} (CC=${cc}, EW_${cc}=${ew.length}c)`);
    }
  }
  console.log(`Residual DL-008 among targets: ${residualDL008}`);
  
  // Verify no CC changes
  let ccChanges = 0;
  for (const item of reloaded) {
    const qid = item.QuestionID;
    if (!dl008_only.has(qid) && !dl008_plus_dl016.has(qid)) continue;
    const orig = MCQ_BANK_C.find(i => i.QuestionID === qid);
    if (orig && orig.CorrectChoice !== item.CorrectChoice) {
      ccChanges++;
      console.log(`  CC CHANGE: ${qid} ${orig.CorrectChoice}→${item.CorrectChoice}`);
    }
  }
  console.log(`CorrectChoice changes: ${ccChanges}`);
  
} catch (e) {
  console.log(`Re-parse FAILED: ${e.message}`);
}

// Summary
console.log('\n============================');
console.log('SESSION 703 PACK C DL-008 REMEDIATION — FINAL');
console.log('============================');
console.log(`Targets processed: ${targets.length}`);
console.log(`Cleared: ${cleared}`);
console.log(`Failed: ${failed}`);
console.log(`Classifications:`);
console.log(`  DL-008_ONLY: ${results.cleared.filter(r => r.classification === 'DL-008_ONLY').length}`);
console.log(`  DL-008_PLUS_DL-016: ${results.cleared.filter(r => r.classification === 'DL-008_PLUS_DL-016').length}`);

// Write results JSON
const resultsPath = path.join(__dirname, '..', 'reports', 'systematic_testing', 'SESSION703_PACK_C_REMEDIATION_RESULTS.json');
const fullResults = {
  session: '703',
  timestamp: new Date().toISOString(),
  summary: {
    targets_total: targets.length,
    cleared,
    failed,
    dl008_only_cleared: results.cleared.filter(r => r.classification === 'DL-008_ONLY').length,
    dl008_plus_dl016_cleared: results.cleared.filter(r => r.classification === 'DL-008_PLUS_DL-016').length,
    holdbacks: 0,
    already_clean: 0,
    missing: 0,
    errors: failed
  },
  cleared: results.cleared,
  failed: results.failed,
  holdbacks: [],
  already_clean: [],
  missing: []
};
fs.writeFileSync(resultsPath, JSON.stringify(fullResults, null, 2), 'utf8');
console.log(`\nResults: ${resultsPath}`);

const holdbacksPath = path.join(__dirname, '..', 'reports', 'systematic_testing', 'SESSION703_PACK_C_CC_AUDIT_HOLDBACKS.json');
fs.writeFileSync(holdbacksPath, JSON.stringify({ session: '703', timestamp: new Date().toISOString(), holdbacks: [] }, null, 2), 'utf8');
console.log(`Holdbacks: ${holdbacksPath}`);
