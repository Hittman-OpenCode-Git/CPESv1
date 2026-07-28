// SESSION050 — Phase 2 Integration Script
// Replaces 15 archived items in pack_c (10) + pack_d (5) with new authored content
// Batch 4 items already integrated into pack_d by authoring agent

const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');

// Timestamp for backups
const ts = new Date().toISOString().replace(/[:.]/g, '').slice(0, 15);

function backup(filepath) {
  const backupPath = filepath.replace('.js', `.js.bak-S50-${ts}`);
  fs.copyFileSync(filepath, backupPath);
  console.log(`Backup: ${backupPath} (${fs.statSync(backupPath).size} bytes)`);
  return backupPath;
}

// Find object boundaries for a given QuestionID in a file
// Uses string-aware bracketing to handle stems/choices with braces
function findObjectBounds(fileContent, questionId) {
  const qidPattern = `"QuestionID": "${questionId}"`;
  const qidIdx = fileContent.indexOf(qidPattern);
  if (qidIdx === -1) return null;

  // Search backward for opening brace
  let openIdx = qidIdx;
  while (openIdx > 0 && fileContent[openIdx] !== '{') openIdx--;

  // Search forward for closing brace (string-aware)
  let closeIdx = openIdx + 1;
  let depth = 1;
  let inString = false;
  let stringChar = '';
  let escape = false;

  while (closeIdx < fileContent.length && depth > 0) {
    const ch = fileContent[closeIdx];
    if (escape) {
      escape = false;
    } else if (ch === '\\') {
      escape = true;
    } else if (inString) {
      if (ch === stringChar) inString = false;
    } else if (ch === '"' || ch === "'") {
      inString = true;
      stringChar = ch;
    } else if (ch === '{') {
      depth++;
    } else if (ch === '}') {
      depth--;
    }
    closeIdx++;
  }

  if (depth !== 0) {
    console.error(`ERROR: Unmatched braces for ${questionId}`);
    return null;
  }

  return { start: openIdx, end: closeIdx };
}

// Format a replacement item as JSON with proper indentation
function formatItem(item, indent) {
  const fields = [
    'Part', 'Section', 'SectionName', 'Topic', 'MicroTopic', 'UniqueConceptKey',
    'LOSTag', 'Difficulty', 'ItemType', 'ItemStyle', 'Stem', 'Choices',
    'CorrectChoice', 'ExplanationCorrect', 'StudyLinks', 'SourceDescription',
    'Part1OnlyFlag', 'ReviewNote', 'QuestionID', 'question_state',
    'CalculationItem', 'VerifiedChecks', 'ExplanationWrongA', 'ExplanationWrongB',
    'ExplanationWrongC', 'ExplanationWrongD', 'DifficultyScore', 'CognitiveLevel'
  ];

  const pad = ' '.repeat(indent);
  const lines = [];
  lines.push('{');

  fields.forEach((field, i) => {
    const val = item[field];
    const comma = i < fields.length - 1 ? ',' : '';
    if (val === null || val === undefined) {
      console.error(`WARNING: Field ${field} missing in ${item.QuestionID}`);
      lines.push(`${pad}${pad}"${field}": ""${comma}`);
      return;
    }
    if (field === 'Choices' || field === 'StudyLinks') {
      const json = JSON.stringify(val, null, indent);
      const indented = json.split('\n').map((l, j) => j === 0 ? `${pad}${pad}"${field}": ${l.trim()}` : `${pad}${pad}${l}`).join('\n');
      lines.push(indented + comma);
    } else if (field === 'VerifiedChecks') {
      const arr = JSON.stringify(val, null, indent + indent);
      const indented = arr.split('\n').map((l, j) => j === 0 ? `${pad}${pad}"${field}": ${l.trim()}` : `${pad}${pad}${l}`).join('\n');
      lines.push(indented + comma);
    } else if (typeof val === 'boolean') {
      lines.push(`${pad}${pad}"${field}": ${val}${comma}`);
    } else if (typeof val === 'number') {
      lines.push(`${pad}${pad}"${field}": ${val}${comma}`);
    } else if (typeof val === 'string') {
      // Escape the string properly for JSON
      const escaped = JSON.stringify(val);
      lines.push(`${pad}${pad}"${field}": ${escaped}${comma}`);
    } else {
      const json = JSON.stringify(val);
      lines.push(`${pad}${pad}"${field}": ${json}${comma}`);
    }
  });

  lines.push(`${pad}}`);
  return lines.join('\n');
}

// --- Integrate Pack C (Batch 1: EC items + Batch 2: FC items) ---

console.log('\n=== Pack C Integration ===');
const packCPath = path.join(BASE, 'pack_c_corrected.js');
const packCBackup = backup(packCPath);
let packCContent = fs.readFileSync(packCPath, 'utf8');

// Batch 1: Pack C Section E items
const batch1 = JSON.parse(fs.readFileSync(path.join(BASE, 'scripts', 'output', 'pack_c_section_e_replacement_items.json'), 'utf8'));

// Batch 2: Pack C Section F items
const batch2 = JSON.parse(fs.readFileSync(path.join(BASE, 'scripts', 'output', 'replacement_items_P1-FC_5items.json'), 'utf8'));

const packCItems = [...batch1, ...batch2];
let packCReplaced = 0;

for (const item of packCItems) {
  const qid = item.QuestionID;
  const bounds = findObjectBounds(packCContent, qid);
  if (!bounds) {
    console.error(`ERROR: Could not find ${qid} in pack_c`);
    continue;
  }
  const formatted = formatItem(item, 4); // Pack C uses 4-space indent
  packCContent = packCContent.slice(0, bounds.start) + formatted + packCContent.slice(bounds.end);
  console.log(`  ${qid}: replaced (${formatted.length} chars)`);
  packCReplaced++;
}

fs.writeFileSync(packCPath, packCContent);
console.log(`Pack C: ${packCReplaced}/10 items replaced. File: ${fs.statSync(packCPath).size} bytes`);

// --- Integrate Pack D (Batch 3: ED items — Batch 4 already integrated) ---

console.log('\n=== Pack D Integration ===');
const packDPath = path.join(BASE, 'pack_d_corrected.js');

// Check if Batch 4 already modified pack_d (it should have)
const batch4Qids = ['P1-FD-005', 'P1-FD-015', 'P1-FD-018', 'P1-FD-025', 'P1-FD-055'];
let packDContent = fs.readFileSync(packDPath, 'utf8');
const batch4Status = {};
for (const qid of batch4Qids) {
  const bounds = findObjectBounds(packDContent, qid);
  batch4Status[qid] = !!bounds;
}
console.log('Batch 4 status:', batch4Status);

// Now integrate Batch 3
const packDBackup = backup(packDPath);
const batch3 = JSON.parse(fs.readFileSync(path.join(BASE, 'scripts', 'output', 'DL012_PACKD_5REPLACEMENT_ITEMS.json'), 'utf8'));

let packDReplaced = 0;

for (const item of batch3) {
  const qid = item.QuestionID;
  const bounds = findObjectBounds(packDContent, qid);
  if (!bounds) {
    console.error(`ERROR: Could not find ${qid} in pack_d`);
    continue;
  }
  const formatted = formatItem(item, 2); // Pack D uses 2-space indent
  packDContent = packDContent.slice(0, bounds.start) + formatted + packDContent.slice(bounds.end);
  console.log(`  ${qid}: replaced (${formatted.length} chars)`);
  packDReplaced++;
}

fs.writeFileSync(packDPath, packDContent);
console.log(`Pack D: ${packDReplaced}/5 items replaced (plus 5 from Batch 4). File: ${fs.statSync(packDPath).size} bytes`);

// --- Verification ---
console.log('\n=== Verification ===');

// Check pack_c
const packCVerify = fs.readFileSync(packCPath, 'utf8');
const packCQIDCount = (packCVerify.match(/"QuestionID": "P1-[A-Z]C-\d+"/g) || []).length;
const packCCertCount = (packCVerify.match(/"question_state": "Certified"/g) || []).length;
console.log(`Pack C: ${packCQIDCount} QIDs, ${packCCertCount} Certified`);

// Check pack_d
const packDVerify = fs.readFileSync(packDPath, 'utf8');
const packDQIDCount = (packDVerify.match(/"QuestionID": "P1-[A-Z]D-\d+"/g) || []).length;
const packDCertCount = (packDVerify.match(/"question_state": "Certified"/g) || []).length;
console.log(`Pack D: ${packDQIDCount} QIDs, ${packDCertCount} Certified`);

console.log('\nIntegration complete.');
