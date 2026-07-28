// SESSION050 — Phase 2 Integration Script v2
// Array-based replacement: parse, replace in array, reconstruct full file

const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');
const ts = new Date().toISOString().replace(/[:.]/g, '').slice(0, 15);

function backup(filepath) {
  const backupPath = filepath.replace('.js', `.js.bak-S50v2-${ts}`);
  fs.copyFileSync(filepath, backupPath);
  console.log(`Backup: ${backupPath} (${fs.statSync(backupPath).size} bytes)`);
  return backupPath;
}

function parsePack(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const idx = content.indexOf('[');
  const lastIdx = content.lastIndexOf('];');
  const arrStr = content.slice(idx, lastIdx + 2);
  try {
    return new Function('return ' + arrStr)();
  } catch (e) {
    console.error('Parse error:', e.message);
    process.exit(1);
  }
}

function reconstructPack(filepath, arr) {
  const content = fs.readFileSync(filepath, 'utf8');
  const idx = content.indexOf('[');
  const lastIdx = content.lastIndexOf('];');
  const before = content.slice(0, idx);
  const after = content.slice(lastIdx + 2);
  
  // Determine indentation from first section items
  const indent = content.includes('const MCQ_BANK_C') ? 4 : 2;
  
  // Build the array string with proper formatting
  const pad = ' '.repeat(indent);
  const items = arr.map((item, i) => {
    const comma = i < arr.length - 1 ? ',' : '';
    return JSON.stringify(item, null, indent).split('\n').map(line => pad + line).join('\n') + comma;
  });
  
  const arrStr = '[\n' + items.join('\n') + '\n]';
  return before + arrStr + after;
}

function verifyCounts(filepath, expectedQIDs, expectedCerts) {
  const content = fs.readFileSync(filepath, 'utf8');
  const qidCount = (content.match(/"QuestionID": "P1-[A-Z][CD]-\d+"/g) || []).length;
  const certCount = (content.match(/"question_state": "Certified"/g) || []).length;
  console.log(`  QIDs: ${qidCount}, Certified: ${certCount}`);
  if (qidCount !== expectedQIDs) console.log(`  WARNING: Expected ${expectedQIDs} QIDs`);
  if (certCount !== expectedCerts) console.log(`  WARNING: Expected ${expectedCerts} Certified`);
}

// --- Load replacement items ---
const batch1 = JSON.parse(fs.readFileSync(path.join(BASE, 'scripts', 'output', 'pack_c_section_e_replacement_items.json'), 'utf8'));
const batch2 = JSON.parse(fs.readFileSync(path.join(BASE, 'scripts', 'output', 'replacement_items_P1-FC_5items.json'), 'utf8'));
const batch3 = JSON.parse(fs.readFileSync(path.join(BASE, 'scripts', 'output', 'DL012_PACKD_5REPLACEMENT_ITEMS.json'), 'utf8'));

const packCReplacements = {};
for (const item of [...batch1, ...batch2]) {
  packCReplacements[item.QuestionID] = item;
}
const packDReplacements = {};
for (const item of batch3) {
  packDReplacements[item.QuestionID] = item;
}

// Batch 4 items already integrated — we verify them, not re-integrate
const batch4QIDs = ['P1-FD-005', 'P1-FD-015', 'P1-FD-018', 'P1-FD-025', 'P1-FD-055'];

// --- Integrate Pack C ---
console.log('\n=== Pack C Integration ===');
const packCPath = path.join(BASE, 'pack_c_corrected.js');
backup(packCPath);

const packC = parsePack(packCPath);
console.log(`  Parsed: ${packC.length} items`);

let packCReplaced = 0;
for (let i = 0; i < packC.length; i++) {
  const qid = packC[i].QuestionID;
  if (packCReplacements[qid]) {
    packC[i] = packCReplacements[qid];
    console.log(`  ${qid}: replaced at index ${i}`);
    packCReplaced++;
  }
}

const packCContent = reconstructPack(packCPath, packC);
fs.writeFileSync(packCPath, packCContent);
console.log(`  Wrote: ${fs.statSync(packCPath).size} bytes, ${packCReplaced}/10 items replaced`);
verifyCounts(packCPath, 500, 398);

// --- Integrate Pack D ---
console.log('\n=== Pack D Integration ===');
const packDPath = path.join(BASE, 'pack_d_corrected.js');
backup(packDPath);

const packD = parsePack(packDPath);
console.log(`  Parsed: ${packD.length} items`);

let packDReplaced = 0;

// Check if Batch 4 already modified
let batch4Count = 0;
for (let i = 0; i < packD.length; i++) {
  const qid = packD[i].QuestionID;
  if (batch4QIDs.includes(qid)) {
    if (packD[i].question_state === 'Certified' && packD[i].CognitiveLevel === 'Analyze') {
      batch4Count++;
    } else {
      console.log(`  WARNING: ${qid} at index ${i} state=${packD[i].question_state} — may be old item`);
    }
  }
}
console.log(`  Batch 4 items verified: ${batch4Count}/${batch4QIDs.length} — will apply Batch 3 over them`);

// Apply Batch 3 replacements
for (let i = 0; i < packD.length; i++) {
  const qid = packD[i].QuestionID;
  if (packDReplacements[qid]) {
    packD[i] = packDReplacements[qid];
    console.log(`  ${qid}: replaced at index ${i}`);
    packDReplaced++;
  }
}

const packDContent = reconstructPack(packDPath, packD);
fs.writeFileSync(packDPath, packDContent);
console.log(`  Wrote: ${fs.statSync(packDPath).size} bytes, ${packDReplaced}/5 Batch 3 items replaced`);
verifyCounts(packDPath, 500, 399);

console.log('\nIntegration complete.');
