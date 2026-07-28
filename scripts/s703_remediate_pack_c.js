// Session 703 — Pack C DL-008 Remediation Script
// Text-level replacement — preserves all formatting byte-for-byte

const fs = require('fs');

const PACK_PATH = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\pack_c_corrected.js';

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

// Load file
let content = fs.readFileSync(PACK_PATH, 'utf8');
console.log(`File loaded: ${content.length} bytes`);

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

// String-aware object extraction: find enclosing object for a given QID
function extractObject(fileContent, qid) {
  const qidPattern = `"QuestionID": "${qid}"`;
  const qidIdx = fileContent.indexOf(qidPattern);
  if (qidIdx === -1) return null;
  
  // Search backward for opening brace
  let depth = 0;
  let inString = false;
  let escape = false;
  let startIdx = -1;
  for (let i = qidIdx; i >= 0; i--) {
    const ch = fileContent[i];
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
  inString = false;
  escape = false;
  depth = 0;
  let endIdx = -1;
  for (let i = startIdx; i < fileContent.length; i++) {
    const ch = fileContent[i];
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
  
  return fileContent.substring(startIdx, endIdx + 1);
}

// Extract CorrectChoice from an object string
function extractCC(objStr) {
  const match = objStr.match(/"CorrectChoice":\s*"([A-D])"/);
  return match ? match[1] : null;
}

// Extract ExplanationWrong value (full, including multi-line) from an object string
function extractEW(objStr, letter) {
  // Pattern: "ExplanationWrongX": "..." where ... may span multiple lines
  const pattern = new RegExp(`"ExplanationWrong${letter}":\\s*"([\\s\\S]*?)"(?=\\s*[,}])`, 'm');
  const match = objStr.match(pattern);
  return match ? match[1] : undefined;
}

// In the full file content, replace ExplanationWrongX value for a specific QID object
function clearEWInFile(fileContent, qid, letter, existingValue) {
  const qidPattern = `"QuestionID": "${qid}"`;
  const qidIdx = fileContent.indexOf(qidPattern);
  if (qidIdx === -1) { console.log(`  QID not found: ${qid}`); return null; }
  
  // Find the ExplanationWrongX field AFTER the QID (within same object)
  const searchStart = qidIdx;
  const ewPattern = `"ExplanationWrong${letter}"`;
  const ewIdx = fileContent.indexOf(ewPattern, searchStart);
  if (ewIdx === -1) { console.log(`  EW_${letter} field not found after ${qid}`); return null; }
  
  // Find the opening quote of the value
  const colonIdx = fileContent.indexOf(':', ewIdx);
  const valueStart = fileContent.indexOf('"', colonIdx + 1);
  if (valueStart === -1) { console.log(`  EW_${letter} value start not found for ${qid}`); return null; }
  
  // If the existing value is empty already, skip
  if (fileContent.substring(valueStart + 1, valueStart + 2) === '"' && 
      (fileContent[valueStart + 2] === ',' || fileContent[valueStart + 2] === '\r' || fileContent[valueStart + 2] === '\n')) {
    return 'ALREADY_EMPTY';
  }
  
  // Find the closing quote of the value by tracking string state
  let inString = false;
  let escape = false;
  let valueEnd = -1;
  for (let i = valueStart + 1; i < fileContent.length; i++) {
    const ch = fileContent[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (ch === '"') { 
      valueEnd = i; 
      break; 
    }
  }
  if (valueEnd === -1) { console.log(`  EW_${letter} value end not found for ${qid}`); return null; }
  
  const oldValue = fileContent.substring(valueStart + 1, valueEnd);
  
  // Replace: oldValue → "" (empty)
  const before = fileContent.substring(0, valueStart + 1);
  const after = fileContent.substring(valueEnd);
  const newContent = before + after; // effectively removes the old value, leaving ""
  
  if (oldValue.length === 0) return 'ALREADY_EMPTY';
  
  return { oldValue, newValue: '', newContent };
}

// Process all targets
let modifications = 0;
let qidNotFound = 0;
let alreadyClean = 0;
let failures = 0;

for (const qid of allTargets) {
  const isDl008Only = dl008_only.includes(qid);
  
  // Extract the object
  const objStr = extractObject(content, qid);
  if (!objStr) {
    results.missing.push({ qid, reason: 'Could not extract enclosing object' });
    qidNotFound++;
    console.log(`  MISSING: ${qid}`);
    continue;
  }
  
  // Extract CC from within the same object
  const cc = extractCC(objStr);
  if (!cc) {
    results.errors.push({ qid, type: 'NO_CC_FOUND', reason: 'CorrectChoice not found in enclosing object' });
    failures++;
    console.log(`  ERROR: ${qid} — no CorrectChoice found`);
    continue;
  }
  
  // Extract existing EW[CC] value
  const ewValue = extractEW(objStr, cc);
  if (ewValue === undefined) {
    results.errors.push({ qid, type: 'EW_FIELD_ABSENT', reason: `ExplanationWrong${cc} field not found` });
    failures++;
    console.log(`  ERROR: ${qid} — EW_${cc} field absent`);
    continue;
  }
  
  if (ewValue === '') {
    results.already_clean.push({ qid, cc, reason: `EW_${cc} already empty` });
    alreadyClean++;
    console.log(`  ALREADY CLEAN: ${qid} (CC=${cc}, EW_${cc} = "")`);
    continue;
  }
  
  // Perform the replacement
  const result = clearEWInFile(content, qid, cc, ewValue);
  if (result === 'ALREADY_EMPTY') {
    results.already_clean.push({ qid, cc, reason: `EW_${cc} already empty (file-level check)` });
    alreadyClean++;
    console.log(`  ALREADY CLEAN: ${qid} (CC=${cc}, file-checked)`);
    continue;
  }
  if (!result) {
    results.errors.push({ qid, type: 'REPLACE_FAILED', reason: 'Could not locate EW field for replacement' });
    failures++;
    console.log(`  ERROR: ${qid} — replacement failed`);
    continue;
  }
  
  content = result.newContent;
  modifications++;
  
  const classification = isDl008Only ? 'DL-008_ONLY' : 'DL-008_PLUS_DL-016';
  const entry = {
    qid,
    cc,
    field: `ExplanationWrong${cc}`,
    ewPreview: ewValue.substring(0, 80),
    classification,
    decision: isDl008Only ? 'safe_clear' : 'CC_VERIFIED_CLEAR_ALLOWED',
    reason: isDl008Only ? 'EW[CC] topically relevant, safe clear' : 'CC verified from content block; EW topic mismatch is DL-016 shift artifact'
  };
  
  if (isDl008Only) {
    results.dl008_only_cleared.push(entry);
  } else {
    results.dl008_plus_dl016_cleared.push(entry);
  }
  
  console.log(`  CLEARED: ${qid} (CC=${cc}, EW_${cc} → "") [${classification}]`);
}

// Write updated file
fs.writeFileSync(PACK_PATH, content, 'utf8');
console.log(`\nFile written: ${content.length} bytes`);

// Summary
console.log('\n========================');
console.log('SESSION 703 REMEDIATION');
console.log('========================');
console.log(`DL-008_ONLY cleared:       ${results.dl008_only_cleared.length}`);
console.log(`DL-008_PLUS_DL-016 cleared: ${results.dl008_plus_dl016_cleared.length}`);
console.log(`Holdbacks:                  ${results.holdbacks.length}`);
console.log(`Already clean:              ${results.already_clean.length}`);
console.log(`Missing:                    ${results.missing.length}`);
console.log(`Errors/Failures:            ${results.errors.length}`);
console.log(`Total modifications:        ${modifications}`);
console.log(`Total processed:            ${allTargets.length}`);

// Write results JSON
const resultsPath = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\reports\\systematic_testing\\SESSION703_PACK_C_REMEDIATION_RESULTS.json';
fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2), 'utf8');
console.log(`\nResults: ${resultsPath}`);

const holdbacksPath = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\reports\\systematic_testing\\SESSION703_PACK_C_CC_AUDIT_HOLDBACKS.json';
fs.writeFileSync(holdbacksPath, JSON.stringify({ session: '703', timestamp: new Date().toISOString(), holdbacks: results.holdbacks }, null, 2), 'utf8');
console.log(`Holdbacks: ${holdbacksPath}`);
