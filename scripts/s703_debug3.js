const fs = require('fs');
const path = require('path');
const c = fs.readFileSync(path.join(__dirname, '..', 'pack_c_corrected.js'), 'utf8');

const qid = 'P1-BC-001';
const pattern = '"QuestionID": "' + qid + '"';
const idx = c.indexOf(pattern);
console.log('QID at', idx, 'char at idx:', JSON.stringify(c[idx]));
console.log('Char before:', JSON.stringify(c.substring(idx-100, idx+30)));

// Search backward for {
let depth = 0, inString = false, escape = false;
let startIdx = -1;
for (let i = idx; i >= 0; i--) {
  const ch = c[i];
  if (escape) { escape = false; continue; }
  if (ch === '\\') { escape = true; continue; }
  if (ch === '"') { inString = !inString; continue; }
  if (!inString) {
    if (ch === '}') { depth++; }
    if (ch === '{') {
      if (depth === 0) { startIdx = i; break; }
      depth--;
    }
  }
}
console.log('startIdx:', startIdx, 'char:', JSON.stringify(c.substring(startIdx, startIdx+5)));

// Check what's at startIdx: just the context around it
if (startIdx > 0) {
  console.log('Context:', c.substring(startIdx-10, startIdx+10));
}

// Manual check: count {} from beginning to idx
let openCount = 0;
for (let i = 0; i < idx; i++) {
  const ch = c[i];
  if (ch === '{') openCount++;
  if (ch === '}') openCount--;
}
console.log('Open count at QID:', openCount);
