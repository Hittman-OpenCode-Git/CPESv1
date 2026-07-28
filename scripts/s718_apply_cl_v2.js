// BLOCK-AUTHORIZED: Session 718 — metadata-only CognitiveLevel enrichment
// Parse-modify-serialize approach for reliable bulk writes

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// Load VFINAL assignments
const vfinalPath = path.join(root, 'reports', 'session_status', 'SESSION718_COGNITIVELEVEL_ASSIGNMENTS_VFINAL.json');
const vfinalData = JSON.parse(fs.readFileSync(vfinalPath, 'utf8'));
const assignments = vfinalData.assignments;

const clLookup = {};
for (const [qid, data] of Object.entries(assignments)) {
  clLookup[qid] = data.CognitiveLevel;
}

const PACKS = [
  { name: 'pack_a', file: 'pack_a_corrected.js', varName: 'MCQ_BANK_A' },
  { name: 'pack_b', file: 'pack_b_corrected.js', varName: 'MCQ_BANK_B' },
  { name: 'pack_c', file: 'pack_c_corrected.js', varName: 'MCQ_BANK_C' },
  { name: 'pack_d', file: 'pack_d_corrected.js', varName: 'MCQ_BANK_D' },
  { name: 'pack_e', file: 'pack_e_corrected.js', varName: 'MCQ_BANK_E' },
];

const results = {};
let totalAdded = 0;
let totalSkipped = 0;

for (const pack of PACKS) {
  const filePath = path.join(root, pack.file);
  console.log(`\n=== ${pack.file} ===`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find array boundaries
  const varPattern = new RegExp('const ' + pack.varName.replace('_', '\\_') + ' = \\[');
  const declIdx = content.search(varPattern);
  if (declIdx < 0) {
    console.error(`  Cannot find ${pack.varName} declaration`);
    results[pack.name] = { error: 'declaration not found' };
    continue;
  }
  
  const bracketIdx = content.indexOf('[', declIdx);
  
  // Find matching closing bracket (string-aware)
  let depth = 0, inString = false, strChar = '', esc = false, endIdx = -1;
  for (let i = bracketIdx; i < content.length; i++) {
    const ch = content[i];
    if (esc) { esc = false; continue; }
    if (inString) {
      if (ch === '\\') { esc = true; continue; }
      if (ch === strChar) { inString = false; }
      continue;
    }
    if (ch === '"' || ch === "'") { inString = true; strChar = ch; continue; }
    if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) { endIdx = i; break; } }
  }
  
  if (endIdx < 0) {
    console.error(`  Cannot find array end`);
    results[pack.name] = { error: 'array end not found' };
    continue;
  }
  
  const arrayStr = content.substring(bracketIdx, endIdx + 1);
  
  let items;
  try {
    items = new Function('return ' + arrayStr)();
  } catch (e) {
    console.error(`  Parse failed: ${e.message}`);
    results[pack.name] = { error: e.message };
    continue;
  }
  
  console.log(`  Parsed: ${items.length} items`);
  
  let added = 0;
  let alreadyHad = 0;
  let missing = 0;
  
  for (const item of items) {
    const qid = item.QuestionID;
    if (!qid) { missing++; continue; }
    
    if (item.CognitiveLevel) {
      alreadyHad++;
      continue;
    }
    
    const cl = clLookup[qid];
    if (!cl) {
      missing++;
      continue;
    }
    
    item.CognitiveLevel = cl;
    added++;
  }
  
  console.log(`  Added: ${added} | Already had: ${alreadyHad} | Missing from lookup: ${missing}`);
  
  if (added === 0 && alreadyHad === items.length) {
    console.log(`  All items already have CognitiveLevel — skipping write`);
    results[pack.name] = { added: 0, alreadyHad };
    continue;
  }
  
  // Serialize back
  // Match the original format: 4-space indent inside the array
  const newArrayStr = JSON.stringify(items, null, 4);
  
  // Reconstruct the full file: declaration + array + semicolon
  // Add newline at end to match original style
  const newContent = `const ${pack.varName} = ${newArrayStr};\n`;
  
  console.log(`  Size: ${content.length} -> ${newContent.length} bytes`);
  
  // Verify new content parses
  try {
    const verifyMatch = newContent.match(/\[([\s\S]*)\]/);
    if (!verifyMatch) throw new Error('no array found');
    const verifyItems = new Function('return [' + verifyMatch[1] + ']')();
    if (verifyItems.length !== items.length) throw new Error(`count mismatch: ${verifyItems.length} vs ${items.length}`);
    const verifyCL = verifyItems.filter(i => i.CognitiveLevel).length;
    console.log(`  Verify: ${verifyItems.length} items, ${verifyCL} with CognitiveLevel`);
  } catch (e) {
    console.error(`  VERIFY FAILED: ${e.message}`);
    results[pack.name] = { error: 'verify failed: ' + e.message };
    continue;
  }
  
  // Write
  fs.writeFileSync(filePath, newContent);
  console.log(`  WRITTEN successfully`);
  
  totalAdded += added;
  totalSkipped += alreadyHad;
  results[pack.name] = { added, alreadyHad, missing, sizeBefore: content.length, sizeAfter: newContent.length };
}

console.log(`\n${'='.repeat(60)}`);
console.log(`TOTAL: ${totalAdded} added, ${totalSkipped} already had CognitiveLevel`);
console.log(`Target: ${Object.keys(clLookup).length} assignments available`);

for (const [name, r] of Object.entries(results)) {
  if (r.error) console.log(`  ${name}: ERROR — ${r.error}`);
  else console.log(`  ${name}: ${r.added} added, ${r.alreadyHad} existing`);
}
