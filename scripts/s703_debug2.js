const fs = require('fs');
const path = require('path');
const c = fs.readFileSync(path.join(__dirname, '..', 'pack_c_corrected.js'), 'utf8');

// Test findObjectBounds on first few targets
const targets = ['P1-AC-001', 'P1-BC-001', 'P1-BC-002', 'P1-BC-003'];

for (const qid of targets) {
  const pattern = '"QuestionID": "' + qid + '"';
  const idx = c.indexOf(pattern);
  console.log(qid + ':', 'pattern found at', idx);
  
  if (idx !== -1) {
    // Search backward for {
    let depth = 0, inString = false, escape = false;
    let startIdx = -1;
    for (let i = idx; i >= 0; i--) {
      const ch = c[i];
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
    
    // Search forward for }
    inString = false; escape = false; depth = 0;
    let endIdx = -1;
    for (let i = startIdx; i < c.length; i++) {
      const ch = c[i];
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
    
    console.log('  start:', startIdx, 'end:', endIdx);
    if (startIdx !== -1 && endIdx !== -1) {
      const objStr = c.substring(startIdx, endIdx + 1);
      const ccMatch = objStr.match(/"CorrectChoice":\s*"([A-D])"/);
      console.log('  CC:', ccMatch ? ccMatch[1] : 'NOT FOUND');
      
      // Check EW for that CC
      const ewField = ccMatch ? 'ExplanationWrong' + ccMatch[1] : null;
      if (ewField) {
        const ewPattern = '"' + ewField + '"';
        const ewIdx = objStr.indexOf(ewPattern);
        console.log('  EW', ccMatch[1], 'found at rel', ewIdx, '/ abs', startIdx + ewIdx);
      }
    }
  }
}
