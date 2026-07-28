// S861: Extract candidate QID blocks for Analyze upgrade (fixed for dual-block)
const fs = require('fs');
const path = require('path');

const packFile = path.join(__dirname, '..', 'pack_a_corrected.js');
const code = fs.readFileSync(packFile, 'utf8');

const targetQIDs = [
  'P1-C-017', 'P1-C-018', 'P1-C-019', 'P1-C-020', 'P1-C-021',
  'P1-C-022', 'P1-C-023', 'P1-C-026', 'P1-C-027', 'P1-C-028',
  'P1-D-020', 'P1-D-021', 'P1-D-022', 'P1-D-023', 'P1-D-024',
];

for (const qid of targetQIDs) {
  // Find all occurrences of this QID in the file
  const searchStr = '"' + qid + '"';
  let searchIdx = 0;
  const blocks = [];
  
  while (true) {
    const idx = code.indexOf(searchStr, searchIdx);
    if (idx === -1) break;
    
    // Find enclosing object
    const objStart = code.lastIndexOf('{', idx);
    let depth = 0;
    let inString = false;
    let escape = false;
    let objEnd = objStart;
    for (let i = objStart; i < Math.min(objStart + 8000, code.length); i++) {
      const ch = code[i];
      if (escape) { escape = false; continue; }
      if (ch === '\\') { escape = true; continue; }
      if (ch === '"') { inString = !inString; continue; }
      if (inString) continue;
      if (ch === '{') depth++;
      if (ch === '}') { depth--; if (depth === 0) { objEnd = i + 1; break; } }
    }
    
    blocks.push(code.substring(objStart, objEnd));
    searchIdx = objEnd;
  }
  
  console.log('=== ' + qid + ' (' + blocks.length + ' blocks) ===');
  
  for (let b = 0; b < blocks.length; b++) {
    const block = blocks[b];
    console.log('  Block ' + (b+1) + ' (' + block.length + ' chars):');
    
    // Show first 300 chars
    console.log('    ' + block.substring(0, 300).replace(/\n/g, '\\n'));
    
    // Extract key fields from this block
    const cl = block.match(/"CognitiveLevel"\s*:\s*"(\w+)"/);
    const diff = block.match(/"DifficultyScore"\s*:\s*(\d+)/);
    const cc = block.match(/"CorrectChoice"\s*:\s*"([ABCD])"/);
    const stem = block.match(/"Stem"\s*:\s*"([^"]*)"/);
    const choiceMatch = block.match(/"Choices"\s*:\s*\{/);
    
    if (cl) console.log('    CognitiveLevel=' + cl[1]);
    if (diff) console.log('    DifficultyScore=' + diff[1]);
    if (cc) console.log('    CorrectChoice=' + cc[1]);
    if (stem) console.log('    Stem=' + stem[1].substring(0, 150));
    if (choiceMatch) console.log('    HAS Choices block');
  }
  console.log('');
}
