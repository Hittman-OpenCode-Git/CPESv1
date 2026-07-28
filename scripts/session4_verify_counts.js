// Session 4: Verify defect counts carefully
const fs = require('fs');
const base = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';

// ===== PACK A: Verify double-comma count =====
console.log('=== PACK A: DOUBLE-COMMA VERIFICATION ===');
const srcA = fs.readFileSync(base + '/pack_a_corrected.js', 'utf8');

// Find all ,, occurrences outside strings
let inString = false;
let stringChar = '';
let esc = false;
let dcommaCount = 0;
for (let i = 0; i < srcA.length - 1; i++) {
  const ch = srcA[i];
  if (esc) { esc = false; continue; }
  if (ch === '\\') { esc = true; continue; }
  if (inString) {
    if (ch === stringChar) inString = false;
    continue;
  }
  if (ch === '"') { inString = true; stringChar = '"'; continue; }
  
  if (ch === ',' && srcA[i+1] === ',') {
    dcommaCount++;
    const lineNum = srcA.substring(0, i).split('\n').length;
    const ctx = srcA.substring(Math.max(0, i-30), i+30).replace(/\n/g, '\\n');
    console.log('  #' + dcommaCount + ': line ' + lineNum + ', pos ' + i + ': ' + JSON.stringify(ctx));
  }
}
console.log('Pack A total double-comma: ' + dcommaCount);

// ===== PACK C: Verify missing comma count =====
console.log('\n=== PACK C: MISSING COMMA VERIFICATION ===');
const srcC = fs.readFileSync(base + '/pack_c_corrected.js', 'utf8');

// For Pack C, let's do a simpler, more reliable detection.
// Find all occurrences where a closing double-quote (end of a value) is immediately 
// followed by whitespace and then a new property (opening double-quote) without a 
// comma in between. This requires carefully tracking string boundaries.

let missingCount = 0;
inString = false;
stringChar = '';
esc = false;

for (let i = 0; i < srcC.length; i++) {
  const ch = srcC[i];
  if (esc) { esc = false; continue; }
  if (ch === '\\') { esc = true; continue; }
  if (inString) {
    if (ch === stringChar) {
      inString = false;
      // String value just ended at position i.
      // Look ahead: skip whitespace, then check if next char is " (start of new property)
      // If yes, there should have been a comma between them.
      let j = i + 1;
      while (j < srcC.length && (srcC[j] === ' ' || srcC[j] === '\n' || srcC[j] === '\r' || srcC[j] === '\t')) j++;
      if (j < srcC.length && srcC[j] === '"') {
        // Next char after whitespace is " — start of a new property
        // Check if we're inside an object (not between objects)
        // Look backward for the containing brace structure
        // This is a bit complex. For now, just check if the next property is NOT preceded by ,
        // Actually, we already checked that — there's no comma between value end and next property.
        
        // But we need to distinguish: is this a missing comma WITHIN an object,
        // or is this the boundary between TWO objects (where comma is at array level)?
        // If the next property starts a NEW object (after }), we shouldn't flag it.
        // Check backwards: find the last { and }
        let depth = 0;
        let k = i;
        while (k >= 0) {
          if (srcC[k] === '"' && k > 0 && srcC[k-1] !== '\\') {
            // Skip strings backward
            let esc2 = false;
            k--;
            while (k >= 0) {
              if (srcC[k] === '\\') { esc2 = !esc2; k--; continue; }
              if (esc2) { esc2 = false; k--; continue; }
              if (srcC[k] === '"') break;
              k--;
            }
          }
          if (k < 0) break;
          if (srcC[k] === '}') depth++;
          if (srcC[k] === '{') { depth--; if (depth < 0) break; }
          k--;
        }
        
        if (depth < 0) {
          // We're inside a { ... } — this IS a missing comma
          const lineNum = srcC.substring(0, j).split('\n').length;
          const ctx = srcC.substring(Math.max(0, i-20), j+30).replace(/\n/g, '\\n');
          missingCount++;
          if (missingCount <= 50) {
            console.log('  #' + missingCount + ': line ' + lineNum + ', pos ' + j + ': ' + JSON.stringify(ctx).substring(0, 120));
          }
        }
      }
    }
    continue;
  }
  if (ch === '"') { inString = true; stringChar = '"'; continue; }
}

console.log('Pack C total missing commas: ' + missingCount);
console.log('Expected: 35');

if (missingCount !== 35) {
  console.log('\n*** STOP: Count mismatch — found ' + missingCount + ', expected 35 ***');
}
