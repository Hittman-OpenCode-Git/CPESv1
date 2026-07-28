// Session 703 — Pack C DL-008 Remediation Script (v2)
// G-NEW-3 compliant: within-object extraction (CC is BEFORE QID in Pack C objects)

const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'pack_c_corrected.js');

const dl008_only = [
  'P1-BC-002','P1-BC-006','P1-BC-007','P1-BC-024','P1-BC-028','P1-BC-032',
  'P1-BC-057','P1-BC-059','P1-BC-074','P1-BC-075','P1-BC-077','P1-BC-078',
  'P1-BC-079','P1-BC-080','P1-BC-081','P1-BC-084','P1-BC-095','P1-BC-096',
  'P1-BC-097','P1-BC-098','P1-BC-099','P1-DC-019'
];

const dl008_plus_dl016 = [
  'P1-AC-001','P1-BC-001','P1-BC-003','P1-BC-004','P1-BC-005','P1-BC-009',
  'P1-BC-010','P1-BC-013','P1-BC-016','P1-BC-017','P1-BC-020','P1-BC-021',
  'P1-BC-025','P1-BC-029','P1-BC-033','P1-BC-037','P1-BC-041','P1-BC-045',
  'P1-BC-049','P1-BC-053','P1-BC-058','P1-BC-061','P1-BC-065','P1-BC-069',
  'P1-BC-073','P1-BC-076','P1-BC-082','P1-BC-083','P1-BC-088','P1-BC-100'
];

const allTargets = [...dl008_only, ...dl008_plus_dl016];

let content = fs.readFileSync(FILE_PATH, 'utf8');
console.log(`File loaded: ${content.length} bytes`);

// String-aware: find enclosing object brace positions for a QID
function findObjectBounds(qid) {
  const qidPattern = `"QuestionID": "${qid}"`;
  const qidIdx = content.indexOf(qidPattern);
  if (qidIdx === -1) return null;
  
  // Search backward for opening brace
  let depth = 0, inString = false, escape = false;
  let startIdx = -1;
  for (let i = qidIdx; i >= 0; i--) {
    const ch = content[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (!inString) {
      if (ch === '}') depth++;
      if (ch === '{') {
        if (depth === 0) { startIdx = i; break; }
        depth--;
      }
    }
  }
  if (startIdx === -1) return null;
  
  // Search forward for closing brace
  inString = false; escape = false; depth = 0;
  let endIdx = -1;
  for (let i = startIdx; i < content.length; i++) {
    const ch = content[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (!inString) {
      if (ch === '{') depth++;
      if (ch === '}') {
        depth--;
        if (depth === 0) { endIdx = i; break; }
      }
    }
  }
  if (endIdx === -1) return null;
  
  return { start: startIdx, end: endIdx, objStr: content.substring(startIdx, endIdx + 1) };
}

// Extract CorrectChoice from within object bounds
function extractCC(startIdx, endIdx) {
  const region = content.substring(startIdx, endIdx + 1);
  const match = region.match(/"CorrectChoice":\s*"([A-D])"/);
  return match ? match[1] : null;
}

// Find ExplanationWrongX field position relative to object bounds
function findEWInObject(startIdx, endIdx, letter) {
  const region = content.substring(startIdx, endIdx + 1);
  const pattern = `"ExplanationWrong${letter}"`;
  const relIdx = region.indexOf(pattern);
  if (relIdx === -1) return null;
  
  const absIdx = startIdx + relIdx;
  // Find value: after ":" find opening ", then find closing " 
  const afterKey = content.indexOf(':', absIdx);
  const valOpen = content.indexOf('"', afterKey + 1);
  if (valOpen === -1 || valOpen > endIdx) return null;
  
  // Find closing quote of value
  let esc = false;
  let valClose = -1;
  for (let i = valOpen + 1; i <= endIdx; i++) {
    const ch = content[i];
    if (esc) { esc = false; continue; }
    if (ch === '\\') { esc = true; continue; }
    if (ch === '"') { valClose = i; break; }
  }
  if (valClose === -1) return null;
  
  const oldValue = content.substring(valOpen + 1, valClose);
  return { absIdx, valOpen, valClose, oldValue, oldLength: valClose - valOpen - 1 };
}

const results = {
  session: '703',
  timestamp: new Date().toISOString(),
  dl008_only_cleared: [],
  dl008_plus_dl016_cleared: [],
  holdbacks: [],
  already_clean: [],
  missing: [],
  errors: []
};

let modifications = 0;

for (const qid of allTargets) {
  const isDl008Only = dl008_only.includes(qid);
  
  const bounds = findObjectBounds(qid);
  if (!bounds) {
    results.missing.push({ qid, reason: 'Could not find object bounds' });
    console.log(`  MISSING: ${qid}`);
    continue;
  }
  
  const cc = extractCC(bounds.start, bounds.end);
  if (!cc) {
    results.errors.push({ qid, type: 'NO_CC', reason: 'CorrectChoice not found in object' });
    console.log(`  ERROR: ${qid} — no CC in object`);
    continue;
  }
  
  const ewInfo = findEWInObject(bounds.start, bounds.end, cc);
  if (!ewInfo) {
    results.errors.push({ qid, type: 'NO_EW', reason: `EW_${cc} field not found in object` });
    console.log(`  ERROR: ${qid} — EW_${cc} not found`);
    continue;
  }
  
  if (ewInfo.oldValue.length === 0 || ewInfo.oldValue === '') {
    results.already_clean.push({ qid, cc, reason: `EW_${cc} already empty` });
    console.log(`  ALREADY CLEAN: ${qid} (CC=${cc})`);
    continue;
  }
  
  // Perform replacement: keep " before and after the value, empty the content
  const before = content.substring(0, ewInfo.valOpen + 1);
  const after = content.substring(ewInfo.valClose);
  content = before + after; // this creates "..." → "" (empty)
  modifications++;
  
  const classification = isDl008Only ? 'DL-008_ONLY' : 'DL-008_PLUS_DL-016';
  const entry = {
    qid,
    cc,
    field: `ExplanationWrong${cc}`,
    ewPreview: ewInfo.oldValue.substring(0, 80),
    classification,
    decision: isDl008Only ? 'safe_clear' : 'CC_VERIFIED_CLEAR_ALLOWED',
    reason: isDl008Only ? 'EW[CC] topically relevant, safe clear' : 'CC verified from content block (Certified item); EW topic mismatch is DL-016 shift artifact'
  };
  
  if (isDl008Only) {
    results.dl008_only_cleared.push(entry);
  } else {
    results.dl008_plus_dl016_cleared.push(entry);
  }
  
  console.log(`  CLEARED: ${qid} (CC=${cc}, EW_${cc}: ${ewInfo.oldLength}c → 0c) [${classification}]`);
}

// Write updated file
fs.writeFileSync(FILE_PATH, content, 'utf8');
console.log(`\nFile written: ${content.length} bytes (was ${content.length + '?'.length})`);

// Verify with Function constructor
console.log('\n=== VERIFICATION ===');
try {
  const code = content + '; return MCQ_BANK_C;';
  const data = new Function(code)();
  console.log(`Re-parse: OK — ${data.length} items`);
  
  // Check all 52 targets
  for (const qid of allTargets) {
    const item = data.find(i => i.QuestionID === qid);
    if (!item) {
      console.log(`  MISSING after rewrite: ${qid}`);
      continue;
    }
    const cc = item.CorrectChoice;
    const ew = item['ExplanationWrong' + cc];
    if (ew && ew.length > 0) {
      results.errors.push({ qid, type: 'POST_FIX_DL008', cc, ewPreview: ew.substring(0, 40) });
      console.log(`  DL-008 REMAINS: ${qid} (CC=${cc}, EW_${cc} still ${ew.length}c)`);
    }
  }
} catch (e) {
  results.errors.push({ type: 'REPARSE_FAILED', message: e.message });
  console.log(`Re-parse FAILED: ${e.message}`);
}

// Summary
console.log('\n========================');
console.log('SESSION 703 PACK C DL-008 REMEDIATION');
console.log('========================');
console.log(`DL-008_ONLY cleared:        ${results.dl008_only_cleared.length}`);
console.log(`DL-008_PLUS_DL-016 cleared: ${results.dl008_plus_dl016_cleared.length}`);
console.log(`Holdbacks:                  ${results.holdbacks.length}`);
console.log(`Already clean:              ${results.already_clean.length}`);
console.log(`Missing:                    ${results.missing.length}`);
console.log(`Errors:                     ${results.errors.length}`);
console.log(`Total file modifications:   ${modifications}`);
console.log(`Total targets processed:    ${allTargets.length}`);

// Write results
const RESULTS_PATH = path.join(__dirname, '..', 'reports', 'systematic_testing', 'SESSION703_PACK_C_REMEDIATION_RESULTS.json');
fs.writeFileSync(RESULTS_PATH, JSON.stringify(results, null, 2), 'utf8');
console.log(`\nResults written to: ${RESULTS_PATH}`);

const HOLDBACKS_PATH = path.join(__dirname, '..', 'reports', 'systematic_testing', 'SESSION703_PACK_C_CC_AUDIT_HOLDBACKS.json');
fs.writeFileSync(HOLDBACKS_PATH, JSON.stringify({ session: '703', timestamp: new Date().toISOString(), holdbacks: results.holdbacks }, null, 2), 'utf8');
console.log(`Holdbacks written to: ${HOLDBACKS_PATH}`);
