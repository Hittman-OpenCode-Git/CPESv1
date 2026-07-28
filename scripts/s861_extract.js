// S861: Extract candidate QID blocks for Analyze upgrade
const fs = require('fs');
const path = require('path');

const packFile = path.join(__dirname, '..', 'pack_a_corrected.js');
const code = fs.readFileSync(packFile, 'utf8');

// Target QIDs from Pack A Sections C and D (variance analysis + cost management)
// Section C targets (variance/responsibility): P1-C-017 to P1-C-028
// Section D targets (cost/CVP): P1-D-020 to P1-D-035
const targetQIDs = [
  // Section C — variance analysis cluster (Apply-level computation)
  'P1-C-017', 'P1-C-018', 'P1-C-019', 'P1-C-020', 'P1-C-021',
  'P1-C-022', 'P1-C-023', 'P1-C-024', 'P1-C-025', 'P1-C-026',
  'P1-C-027', 'P1-C-028', 'P1-C-029', 'P1-C-030',
  // Section D — cost management cluster (Apply-level computation)
  'P1-D-020', 'P1-D-021', 'P1-D-022', 'P1-D-023', 'P1-D-024',
  'P1-D-025', 'P1-D-026', 'P1-D-027', 'P1-D-028', 'P1-D-029',
  'P1-D-030', 'P1-D-031', 'P1-D-032', 'P1-D-033',
];

for (const qid of targetQIDs) {
  const searchStr = '"QuestionID": "' + qid + '"';
  const idx = code.indexOf(searchStr);
  if (idx === -1) {
    console.log('=== ' + qid + ' NOT FOUND ===');
    continue;
  }
  
  // Find enclosing object bounds
  const start = code.lastIndexOf('{', idx);
  let depth = 0;
  let end = start;
  let inString = false;
  let escape = false;
  for (let i = start; i < Math.min(start + 8000, code.length); i++) {
    const ch = code[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === '{') depth++;
    if (ch === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  
  const block = code.substring(start, end);
  console.log('=== ' + qid + ' (length: ' + block.length + ') ===');
  
  // Extract key fields
  const stem = (block.match(/"Stem"\s*:\s*"([^"]*)"/) || [])[1] || 'N/A';
  const cl = (block.match(/"CognitiveLevel"\s*:\s*"(\w+)"/) || [])[1] || 'N/A';
  const diff = (block.match(/"DifficultyScore"\s*:\s*(\d+)/) || [])[1] || '?';
  const cc = (block.match(/"CorrectChoice"\s*:\s*"([ABCD])"/) || [])[1] || '?';
  const topic = (block.match(/"Topic"\s*:\s*"([^"]*)"/) || [])[1] || 'N/A';
  
  console.log('  CognitiveLevel: ' + cl + ' | Difficulty: ' + diff + ' | CorrectChoice: ' + cc);
  console.log('  Topic: ' + topic);
  console.log('  Stem: ' + stem.substring(0, 200));
  
  // Show choices
  const choicesMatch = block.match(/"Choices"\s*:\s*\{([^}]+)\}/);
  if (choicesMatch) {
    console.log('  Choices: ' + choicesMatch[1].substring(0, 300));
  }
  
  // Show ExplanationCorrect snippet
  const ecMatch = block.match(/"ExplanationCorrect"\s*:\s*"([^"]{50,500})"/);
  if (ecMatch) {
    console.log('  ExplanationCorrect: ' + ecMatch[1].substring(0, 200) + '...');
  }
  
  console.log('');
}
