// BLOCK-AUTHORIZED: Session 718 — metadata-only CognitiveLevel enrichment
// Adds CognitiveLevel field to all 2,425 items lacking it across 5 packs
// No content changes — answer keys, stems, choices, explanations untouched

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// Load VFINAL assignments
const vfinalPath = path.join(root, 'reports', 'session_status', 'SESSION718_COGNITIVELEVEL_ASSIGNMENTS_VFINAL.json');
const vfinalData = JSON.parse(fs.readFileSync(vfinalPath, 'utf8'));
const assignments = vfinalData.assignments;

// Build level lookup by QID
const clLookup = {};
for (const [qid, data] of Object.entries(assignments)) {
  clLookup[qid] = data.CognitiveLevel;
}

const PACKS = [
  { name: 'pack_a', file: 'pack_a_corrected.js', varName: 'pack_a' },
  { name: 'pack_b', file: 'pack_b_corrected.js', varName: 'pack_b' },
  { name: 'pack_c', file: 'pack_c_corrected.js', varName: 'pack_c' },
  { name: 'pack_d', file: 'pack_d_corrected.js', varName: 'pack_d' },
  { name: 'pack_e', file: 'pack_e_corrected.js', varName: 'pack_e' },
];

const results = {};

for (const pack of PACKS) {
  const filePath = path.join(root, pack.file);
  console.log(`\nProcessing ${pack.file}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  const origSize = content.length;
  
  // Parse the array using Function constructor
  const varDeclIdx = content.indexOf(`var ${pack.varName}`);
  const eqIdx = content.indexOf('=', varDeclIdx);
  const bracketIdx = content.indexOf('[', eqIdx);
  
  // Find matching closing bracket (string-aware)
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let esc = false;
  let endIdx = -1;
  
  for (let i = bracketIdx; i < content.length; i++) {
    const ch = content[i];
    if (esc) { esc = false; continue; }
    if (inString) {
      if (ch === '\\') { esc = true; continue; }
      if (ch === stringChar) { inString = false; }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { inString = true; stringChar = ch; continue; }
    if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) { endIdx = i + 1; break; } }
  }
  
  if (endIdx === -1) {
    console.error(`  ERROR: Could not find array end for ${pack.name}`);
    results[pack.name] = { error: 'array boundary not found' };
    continue;
  }
  
  const arrayStr = content.substring(bracketIdx, endIdx);
  let items;
  try {
    items = new Function('return ' + arrayStr)();
  } catch (e) {
    console.error(`  ERROR: Parse failed: ${e.message}`);
    results[pack.name] = { error: e.message };
    continue;
  }
  
  console.log(`  Parsed: ${items.length} items`);
  
  let added = 0;
  let skipped = 0;
  
  for (const item of items) {
    const qid = item.QuestionID;
    
    if (!qid) {
      skipped++;
      continue;
    }
    
    if (item.CognitiveLevel) {
      // Already has CognitiveLevel — keep
      skipped++;
      continue;
    }
    
    const cl = clLookup[qid];
    if (!cl) {
      console.log(`  WARNING: No assignment for ${qid}`);
      skipped++;
      continue;
    }
    
    // Find the insertion point in the source file
    // We need to find this specific item in the JSON and add the CognitiveLevel field
    // Strategy: locate QuestionID in content, then find a known anchor field to insert after
    
    // Find the position of this QuestionID
    const qidPattern = '"QuestionID": "' + qid + '"';
    const qidPos = content.indexOf(qidPattern);
    
    if (qidPos < 0) {
      console.log(`  ERROR: Cannot find ${qid} in file`);
      skipped++;
      continue;
    }
    
    // Check if CognitiveLevel already exists near this QID
    const nearRegion = content.substring(qidPos, qidPos + 5000);
    if (nearRegion.indexOf('"CognitiveLevel"') < nearRegion.indexOf('"QuestionID":', 20)) {
      // CognitiveLevel already present between this QID and next QID
      skipped++;
      continue;
    }
    
    // Find a good insertion point: after "question_state" field, or after "DifficultyScore" field
    // Strategy: find "question_state" if present, else "DifficultyScore", else "Difficulty"
    let insertAfter = null;
    
    const stateIdx = content.indexOf('"question_state"', qidPos);
    if (stateIdx > 0 && stateIdx < qidPos + 5000) {
      // Find end of this field value (closing quote + comma)
      let pos = stateIdx + 16; // after "question_state": 
      while (pos < content.length && content[pos] !== '"') pos++;
      pos++; // Skip opening quote
      let esc2 = false;
      while (pos < content.length) {
        if (esc2) { esc2 = false; pos++; continue; }
        if (content[pos] === '\\') { esc2 = true; pos++; continue; }
        if (content[pos] === '"') { pos++; break; }
        pos++;
      }
      // pos is now after closing quote. Next char should be , or \n
      if (content[pos] === ',') pos++;
      insertAfter = pos;
    }
    
    if (!insertAfter) {
      const diffScoreIdx = content.indexOf('"DifficultyScore"', qidPos);
      if (diffScoreIdx > 0 && diffScoreIdx < qidPos + 5000) {
        let pos = diffScoreIdx + 18;
        while (pos < content.length && content[pos] !== ':') pos++;
        pos++; // Skip colon
        while (pos < content.length && /\s/.test(content[pos])) pos++;
        while (pos < content.length && /[\d,]/.test(content[pos])) pos++;
        if (content[pos] === ',') pos++;
        insertAfter = pos;
      }
    }
    
    if (!insertAfter) {
      const diffIdx = content.indexOf('"Difficulty":', qidPos);
      if (diffIdx > 0 && diffIdx < qidPos + 5000) {
        let pos = diffIdx + 13;
        while (pos < content.length && content[pos] !== ':') pos++;
        pos++;
        while (pos < content.length && /\s/.test(content[pos])) pos++;
        while (pos < content.length && content[pos] !== '"') pos++;
        pos++; // opening quote
        let esc2 = false;
        while (pos < content.length) {
          if (esc2) { esc2 = false; pos++; continue; }
          if (content[pos] === '\\') { esc2 = true; pos++; continue; }
          if (content[pos] === '"') { pos++; break; }
          pos++;
        }
        if (content[pos] === ',') pos++;
        insertAfter = pos;
      }
    }
    
    if (!insertAfter) {
      // Fallback: insert after QuestionID line
      let pos = qidPos + qidPattern.length;
      while (pos < content.length && content[pos] !== ',' && content[pos] !== '\n') pos++;
      if (content[pos] === ',') pos++;
      if (content[pos] === '\n') pos++;
      insertAfter = pos;
    }
    
    // Insert the CognitiveLevel field
    const indent = '    '; // Standard 4-space indent
    const insertion = `\n${indent}"CognitiveLevel": "${cl}",`;
    
    content = content.substring(0, insertAfter) + insertion + content.substring(insertAfter);
    
    // Adjust subsequent positions (not needed since we process each QID fresh)
    added++;
  }
  
  // Verify before writing
  const newSize = content.length;
  console.log(`  Added: ${added} CognitiveLevel fields | Skipped: ${skipped}`);
  console.log(`  Size: ${origSize} -> ${newSize} (+${newSize - origSize} bytes)`);
  
  // Verify parse count unchanged
  const newBracketIdx = content.indexOf('[', content.indexOf(`var ${pack.varName}`) + 2);
  let verifyDepth = 0;
  let verifyInStr = false;
  let verifyStrChar = '';
  let verifyEsc = false;
  let verifyEndIdx = -1;
  
  for (let i = newBracketIdx; i < content.length; i++) {
    const ch = content[i];
    if (verifyEsc) { verifyEsc = false; continue; }
    if (verifyInStr) {
      if (ch === '\\') { verifyEsc = true; continue; }
      if (ch === verifyStrChar) { verifyInStr = false; }
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { verifyInStr = true; verifyStrChar = ch; continue; }
    if (ch === '[') verifyDepth++;
    else if (ch === ']') { verifyDepth--; if (verifyDepth === 0) { verifyEndIdx = i + 1; break; } }
  }
  
  const verifyStr = content.substring(newBracketIdx, verifyEndIdx);
  let verifyItems;
  try {
    verifyItems = new Function('return ' + verifyStr)();
    console.log(`  VERIFY: ${verifyItems.length} items parsed (expected ${items.length})`);
    if (verifyItems.length !== items.length) {
      console.error(`  ERROR: Item count mismatch! Expected ${items.length}, got ${verifyItems.length}`);
    }
    // Verify CognitiveLevel count
    const clCount = verifyItems.filter(i => i.CognitiveLevel).length;
    console.log(`  VERIFY: ${clCount} items have CognitiveLevel`);
  } catch (e) {
    console.error(`  ERROR: Verification parse failed: ${e.message}`);
    results[pack.name] = { error: 'verification parse failed: ' + e.message };
    continue;
  }
  
  // Write the file
  fs.writeFileSync(filePath, content);
  console.log(`  WRITTEN: ${filePath} (${content.length} bytes)`);
  
  results[pack.name] = { added, skipped, sizeBefore: origSize, sizeAfter: content.length };
}

console.log('\n=== RESULTS ===');
for (const [name, r] of Object.entries(results)) {
  if (r.error) {
    console.log(`  ${name}: ERROR — ${r.error}`);
  } else {
    console.log(`  ${name}: ${r.added} added, ${r.skipped} skipped`);
  }
}
