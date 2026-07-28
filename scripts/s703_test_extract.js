const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'pack_c_corrected.js');
const content = fs.readFileSync(filePath, 'utf8');

// Test: find P1-AC-001, extract CC, check EW_A
const qidIdx = content.indexOf('"QuestionID": "P1-AC-001"');
const region = content.substring(qidIdx, qidIdx + 2000);
const ccMatch = region.match(/"CorrectChoice":\s*"([A-D])"/);
console.log('QID position:', qidIdx);
console.log('CorrectChoice:', ccMatch ? ccMatch[1] : 'NOT FOUND');

// Find EW_A
const ewIdx = content.indexOf('"ExplanationWrongA"', qidIdx);
console.log('EW_A position:', ewIdx);

// Get current value
const colonIdx = content.indexOf(':', ewIdx);
const valStart = content.indexOf('"', colonIdx + 1);
let esc = false; let vEnd = -1;
for (let i = valStart + 1; i < content.length; i++) {
  if (esc) { esc = false; continue; }
  if (content[i] === '\\') { esc = true; continue; }
  if (content[i] === '"') { vEnd = i; break; }
}
const oldVal = content.substring(valStart + 1, vEnd);
console.log('EW_A length:', oldVal.length);
console.log('EW_A preview:', oldVal.substring(0, 80));
console.log('Non-empty:', oldVal.length > 0 ? 'YES' : 'NO');
