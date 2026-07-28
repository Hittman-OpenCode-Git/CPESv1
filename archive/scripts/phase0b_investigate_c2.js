// Investigate Pack C parse errors - dump failing object
const fs = require('fs');
const src = fs.readFileSync('C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/pack_c_corrected.js', 'utf8');

// Extract objects using string-aware brace-matcher, show failing ones
const startIdx = src.indexOf('[');
let i = startIdx + 1;
const len = src.length;
let objIdx = 0;

while (i < len) {
  while (i < len && /\s/.test(src[i])) i++;
  if (i >= len || src[i] === ']') break;
  if (src[i] === ',') { i++; continue; }
  if (src[i] !== '{') { i++; continue; }
  
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let escape = false;
  let start = i;
  
  for (; i < len; i++) {
    const ch = src[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (inString) {
      if (ch === stringChar) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') { inString = true; stringChar = ch; continue; }
    if (ch === '{') depth++;
    if (ch === '}') { depth--; if (depth === 0) { i++; break; } }
  }
  
  const objStr = src.substring(start, i);
  objIdx++;
  
  try {
    eval('(' + objStr + ')');
  } catch(e) {
    // Show failing object
    console.log('=== Object #' + objIdx + ' at position ' + start + ' (len=' + objStr.length + ') ===');
    console.log('Error: ' + e.message);
    // Try to find QID
    const qidMatch = objStr.match(/"QuestionID"\s*:\s*"([^"]+)"/);
    console.log('QID: ' + (qidMatch ? qidMatch[1] : 'UNKNOWN'));
    // Show first and last 500 chars
    console.log('--- First 500 chars ---');
    console.log(objStr.substring(0, 500));
    console.log('--- Last 500 chars ---');
    console.log(objStr.substring(Math.max(0, objStr.length - 500)));
    console.log('');
    
    if (objIdx > 5) break; // Only show first few errors
  }
}
