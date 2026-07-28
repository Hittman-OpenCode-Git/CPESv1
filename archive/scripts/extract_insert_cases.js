// Session 60 — Extract cases from packs, insert into scored_cases files
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const MIGRATIONS = [
  { pack: 'pack_a_corrected.js', caseVar: 'CASE_BANK_A', dest: 'scored_cases.js', newVar: 'MIGRATED_CASE_BASE_A' },
  { pack: 'pack_b_corrected.js', caseVar: 'CASE_BANK_B', dest: 'scored_cases2.js', newVar: 'MIGRATED_CASE_BASE_B' },
  { pack: 'pack_c_corrected.js', caseVar: 'CASE_BANK_C', dest: 'scored_cases3.js', newVar: 'MIGRATED_CASE_BASE_C' },
  { pack: 'pack_d_corrected.js', caseVar: 'CASE_BANK_D', dest: 'scored_cases4.js', newVar: 'MIGRATED_CASE_BASE_D' },
];

function addGovernance(c) {
  c.question_state = c.question_state || 'Unprocessed';
  c.ProductionStatus = c.ProductionStatus || 'Draft';
  c.DifficultyScore = c.DifficultyScore || 3;
  c.Version = c.Version || '1.0';
  c.CreatedDate = c.CreatedDate || '2026-07-24';
  c.ModifiedDate = c.ModifiedDate || '2026-07-24';
  c.Author = c.Author || 'Migration Agent';
  c.Confidence = c.Confidence || 85;
  c.RevisionHistory = c.RevisionHistory || [{
    Date: '2026-07-24', Version: '1.0', Author: 'Session 60 Migration',
    Summary: 'Migrated from MCQ pack to scored_cases file. Added governance metadata.'
  }];
  if (c.Items) {
    c.Items.forEach((it, i) => {
      if (!it.question_state) it.question_state = 'Unprocessed';
    });
  }
  c.QuestionCount = (c.Items && c.Items.length) || c.QuestionCount || 0;
  return c;
}

function extractArray(content, varName) {
  const decl = 'const ' + varName + ' = [';
  const startIdx = content.indexOf(decl);
  if (startIdx < 0) return null;
  
  const start = startIdx + decl.length - 1; // position of opening [
  let depth = 0, inString = false, stringChar = '', escapeNext = false, endIdx = -1;
  
  for (let i = start; i < content.length; i++) {
    const ch = content[i];
    if (escapeNext) { escapeNext = false; continue; }
    if (ch === '\\') { escapeNext = true; continue; }
    if (inString) {
      if (ch === stringChar) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
    if (ch === '[') { depth++; }
    else if (ch === ']') {
      depth--;
      if (depth === 0) {
        let j = i + 1;
        while (j < content.length && (content[j] === ' ' || content[j] === '\t' || content[j] === '\r')) j++;
        if (j < content.length && content[j] === ';') endIdx = j + 1;
        else if (j < content.length && content[j] === '\n') endIdx = i + 1; // just the ]
        else endIdx = i + 1;
        break;
      }
    }
  }
  
  if (endIdx < 0) return null;
  
  return {
    startIdx,
    endIdx,
    arrayText: content.substring(start, endIdx)
  };
}

for (const mig of MIGRATIONS) {
  const packPath = path.join(ROOT, mig.pack);
  const content = fs.readFileSync(packPath, 'utf8');
  
  const extracted = extractArray(content, mig.caseVar);
  if (!extracted) {
    console.log(mig.pack + ': ' + mig.caseVar + ' NOT FOUND');
    continue;
  }
  
  // Parse the array
  let cases;
  try {
    cases = (new Function('return ' + extracted.arrayText))();
  } catch (e) {
    console.log(mig.pack + ': PARSE ERROR: ' + e.message.substring(0, 80));
    continue;
  }
  
  console.log(mig.pack + ': extracted ' + cases.length + ' cases from ' + mig.caseVar);
  
  // Add governance metadata
  const enriched = cases.map(addGovernance);
  
  // Insert into destination scored_cases file
  const destPath = path.join(ROOT, mig.dest);
  let destContent = fs.readFileSync(destPath, 'utf8');
  
  // Find the section-cloning block to insert before it
  const cloneMarker = 'const ENHANCED_CASE_BANK_';
  const insertIdx = destContent.indexOf(cloneMarker);
  
  const newBlock = '\n// === MIGRATED STANDARD CASES (Session 60) ===\nconst ' + mig.newVar + ' = ' + JSON.stringify(enriched, null, 2) + ';\n\n';
  
  if (insertIdx >= 0) {
    destContent = destContent.substring(0, insertIdx) + newBlock + destContent.substring(insertIdx);
  } else {
    destContent += '\n' + newBlock;
  }
  
  fs.writeFileSync(destPath, destContent, 'utf8');
  console.log('  -> ' + mig.dest + ' (' + fs.statSync(destPath).size + ' bytes)');
  
  // Clean the pack file
  const before = content.substring(0, extracted.startIdx).replace(/\s+$/g, '\n');
  const after = content.substring(extracted.endIdx);
  const newPack = before + after;
  fs.writeFileSync(packPath, newPack, 'utf8');
  console.log('  cleaned ' + mig.pack + ' (' + fs.statSync(packPath).size + ' bytes)');
}

console.log('\n=== Extraction & Insertion Complete ===');
