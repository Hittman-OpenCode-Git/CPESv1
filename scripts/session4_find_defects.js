// Session 4: Pre-write defect confirmation for Pack A and Pack C
const fs = require('fs');
const base = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';

// ===== PACK A: Find double-comma near line 9602 =====
console.log('=== PACK A: DOUBLE-COMMA SCAN ===');
const srcA = fs.readFileSync(base + '/pack_a_corrected.js', 'utf8');
const linesA = srcA.split('\n');

// Check around line 9602
console.log('--- Lines 9598-9608 ---');
for (let i = 9597; i <= 9607; i++) {
  const lineNum = i + 1;
  const line = linesA[i];
  console.log(lineNum + ': ' + (line ? line.substring(0, 200) : '[EMPTY]'));
}

// Find ALL double-comma occurrences OUTSIDE quoted strings
console.log('\n--- All ,, occurrences (raw scan) ---');
let inString = false;
let stringChar = '';
let esc = false;
let foundCount = 0;
for (let i = 0; i < srcA.length - 1; i++) {
  const ch = srcA[i];
  if (esc) { esc = false; continue; }
  if (ch === '\\') { esc = true; continue; }
  if (inString) {
    if (ch === stringChar) inString = false;
    continue;
  }
  if (ch === '"' || ch === "'" || ch === '`') { inString = true; stringChar = ch; continue; }
  
  if (ch === ',' && srcA[i+1] === ',') {
    // Find line number
    const lineNum = srcA.substring(0, i).split('\n').length;
    const context = srcA.substring(Math.max(0, i-50), i+52);
    console.log('  Line ' + lineNum + ', pos ' + i + ': ...' + JSON.stringify(context) + '...');
    foundCount++;
    if (foundCount > 5) { console.log('  (Truncated at 5)'); break; }
  }
}
console.log('Total double-comma: ' + foundCount);

// Also check which QID/object is near the defect
const doubleCommaPos = srcA.indexOf(',,');
if (doubleCommaPos >= 0) {
  // Search backward for QID
  const before = srcA.substring(Math.max(0, doubleCommaPos - 5000), doubleCommaPos);
  const qidMatch = before.match(/"QuestionID"\s*:\s*"([^"]+)"/g);
  if (qidMatch) {
    const lastQID = qidMatch[qidMatch.length - 1];
    console.log('\nNearest QID before ,,: ' + lastQID);
  }
  // Search forward
  const after = srcA.substring(doubleCommaPos, doubleCommaPos + 200);
  console.log('Content after ,,: ' + JSON.stringify(after.substring(0, 150)));
}

console.log('\n\n=== PACK C: MISSING COMMA SCAN ===');
const srcC = fs.readFileSync(base + '/pack_c_corrected.js', 'utf8');

// Find all locations where a string value is followed by a new property without a comma
// Pattern: "end of value"\n    "nextProperty"
// We need to find places where after a value's closing " there's \n followed by whitespace and "
// but NO comma between them.

// Extract all objects and test with eval()
const startIdx = srcC.indexOf('[');
let i = startIdx + 1;
const len = srcC.length;
let objIdx = 0;
let parseErrors = [];

while (i < len) {
  while (i < len && /\s/.test(srcC[i])) i++;
  if (i >= len || srcC[i] === ']') break;
  if (srcC[i] === ',') { i++; continue; }
  if (srcC[i] !== '{') { i++; continue; }
  
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let escape = false;
  let start = i;
  
  for (; i < len; i++) {
    const ch = srcC[i];
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
  
  const objStr = srcC.substring(start, i);
  objIdx++;
  
  try {
    eval('(' + objStr + ')');
  } catch(e) {
    // This is a failing object - find the exact error
    // Try to narrow down: find all property boundaries
    const props = [];
    let inStr = false;
    let sChar = '';
    let esc2 = false;
    let propStart = -1;
    
    for (let j = 0; j < objStr.length; j++) {
      const ch = objStr[j];
      if (esc2) { esc2 = false; continue; }
      if (ch === '\\') { esc2 = true; continue; }
      if (inStr) {
        if (ch === sChar) {
          inStr = false;
          // Property value just ended - check what comes next
          // Look for comma or closing brace or start of next property
          let k = j + 1;
          while (k < objStr.length && /\s/.test(objStr[k])) k++;
          if (k < objStr.length && objStr[k] === '"') {
            // New property starts without comma! This is a missing comma
            const lineNum = srcC.substring(0, start + k).split('\n').length;
            props.push({
              position: start + k,
              line: lineNum,
              prevContent: objStr.substring(Math.max(0, propStart - 20), j+10).replace(/\n/g, '\\n'),
              nextProp: objStr.substring(k, Math.min(k+30, objStr.length))
            });
          }
        }
        continue;
      }
      if (ch === '"' || ch === "'") { inStr = true; sChar = ch; propStart = j; continue; }
    }
    
    if (props.length > 0) {
      const qidMatch = objStr.match(/"QuestionID"\s*:\s*"([^"]+)"/);
      parseErrors.push({
        QID: qidMatch ? qidMatch[1] : 'UNKNOWN',
        objIdx: objIdx,
        position: start,
        length: objStr.length,
        missingCommas: props
      });
    }
  }
}

console.log('Total parse errors in Pack C: ' + parseErrors.length);
console.log('\nMissing comma locations:');
let totalCommas = 0;
parseErrors.forEach(pe => {
  console.log('  QID: ' + pe.QID + ' (obj #' + pe.objIdx + ', pos=' + pe.position + ', len=' + pe.length + ')');
  pe.missingCommas.forEach(mc => {
    totalCommas++;
    console.log('    Line ' + mc.line + ', pos ' + mc.position + ': prev=' + JSON.stringify(mc.prevContent.substring(0, 60)) + ' next=' + JSON.stringify(mc.nextProp.substring(0, 40)));
  });
});

console.log('\nTotal missing commas to insert: ' + totalCommas);

// Save defect manifest for reference
const manifest = parseErrors.map(pe => ({
  defectID: 'S3-BLK-02',
  file: 'pack_c_corrected.js',
  QID: pe.QID,
  objectStartPos: pe.position,
  objectLength: pe.length,
  missingCommas: pe.missingCommas.map(mc => ({
    line: mc.line,
    position: mc.position,
    preceding: mc.prevContent.substring(0, 60),
    following: mc.nextProp.substring(0, 40)
  }))
}));

fs.writeFileSync(base + '/reports/SESSION4_DEFECT_MANIFEST.json', JSON.stringify({
  packA: {
    defectID: 'S3-BLK-01',
    file: 'pack_a_corrected.js',
    line: 9602,
    searchPattern: ',,',
    replacePattern: ',',
    nearestQID: 'from scan above',
    note: 'Remove exactly one comma from double-comma token'
  },
  packC: {
    defectID: 'S3-BLK-02',
    file: 'pack_c_corrected.js',
    totalMissingCommas: totalCommas,
    objectCount: parseErrors.length,
    manifest: manifest
  },
  timestamp: new Date().toISOString()
}, null, 2));
console.log('\nManifest saved to reports/SESSION4_DEFECT_MANIFEST.json');
