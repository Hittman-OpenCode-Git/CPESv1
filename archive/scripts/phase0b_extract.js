// Phase 0B: Extract Certified QIDs from all pack files
// Read-only extraction — no writes to pack files
const fs = require('fs');
const path = require('path');
const base = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';

function parsePackArray(filename) {
  const src = fs.readFileSync(path.join(base, filename), 'utf8');
  const startIdx = src.indexOf('[');
  if (startIdx === -1) return { error: 'No array found', items: [] };
  const arrExpr = 'return ' + src.substring(startIdx);
  try {
    const fn = new Function(arrExpr);
    const result = fn();
    if (Array.isArray(result)) return { error: null, items: result };
    return { error: 'Not an array: ' + typeof result, items: [] };
  } catch(e) {
    return { error: e.message, items: [] };
  }
}

// String-aware brace-matcher for problematic files
function extractObjectsStringAware(filename) {
  const src = fs.readFileSync(path.join(base, filename), 'utf8');
  const startIdx = src.indexOf('[');
  if (startIdx === -1) return [];
  
  const results = [];
  let i = startIdx + 1;
  const len = src.length;
  
  while (i < len) {
    // Skip whitespace and commas
    while (i < len && /\s/.test(src[i])) i++;
    if (i >= len || src[i] === ']') break;
    if (src[i] === ',') { i++; continue; }
    
    if (src[i] !== '{') {
      // Skip non-object entries
      i++;
      continue;
    }
    
    // Extract object with string awareness
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
      if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
      if (ch === '`') { inString = true; stringChar = '`'; continue; }
      if (ch === '{') depth++;
      if (ch === '}') { depth--; if (depth === 0) { i++; break; } }
    }
    
    const objStr = src.substring(start, i);
    try {
      const obj = JSON.parse(objStr);
      results.push(obj);
    } catch(e) {
      // Try Function constructor as fallback
      try {
        const fn = new Function('return ' + objStr);
        const obj = fn();
        results.push(obj);
      } catch(e2) {
        results.push({ _parseError: e.message, _raw: objStr.substring(0, 200) });
      }
    }
  }
  return results;
}

// Main extraction
console.log('=== PHASE 0B: Certified QID Extraction ===\n');

const packs = [
  { file: 'pack_a_corrected.js', label: 'A' },
  { file: 'pack_b_corrected.js', label: 'B' },
  { file: 'pack_c_corrected.js', label: 'C' },
  { file: 'pack_d_corrected.js', label: 'D' },
  { file: 'pack_e_corrected.js', label: 'E' },
];

for (const pack of packs) {
  console.log('--- Pack ' + pack.label + ' ---');
  
  // Try Function constructor first
  const result = parsePackArray(pack.file);
  
  if (result.error) {
    console.log('  Function constructor FAILED: ' + result.error.substring(0, 100));
    console.log('  Falling back to string-aware brace-matcher...');
    const items = extractObjectsStringAware(pack.file);
    const withQID = items.filter(o => o.QuestionID);
    const certified = withQID.filter(o => o.question_state === 'Certified');
    const parseErrors = items.filter(o => o._parseError);
    console.log('  Objects extracted: ' + items.length);
    console.log('  With QID: ' + withQID.length);
    console.log('  Parse errors: ' + parseErrors.length);
    console.log('  Certified: ' + certified.length);
    
    if (parseErrors.length > 0) {
      console.log('  Parse errors:');
      parseErrors.forEach(pe => console.log('    ' + pe._parseError + ' | raw: ' + pe._raw.substring(0, 80)));
    }
    
    // Output Certified QIDs
    const certQIDs = certified.map(o => o.QuestionID).sort();
    console.log('  Certified QIDs: ' + certQIDs.join(' '));
    
    // Output non-Certified with QID
    const nonCert = withQID.filter(o => o.question_state !== 'Certified');
    console.log('  Non-Certified with QID: ' + nonCert.length);
    if (nonCert.length > 0) {
      const states = {};
      nonCert.forEach(o => { const s = o.question_state || 'MISSING'; states[s] = (states[s] || 0) + 1; });
      console.log('  State distribution: ' + JSON.stringify(states));
    }
  } else {
    const items = result.items;
    const withQID = items.filter(o => o.QuestionID);
    const certified = withQID.filter(o => o.question_state === 'Certified');
    console.log('  Objects total: ' + items.length);
    console.log('  With QID: ' + withQID.length);
    console.log('  Certified: ' + certified.length);
    
    const certQIDs = certified.map(o => o.QuestionID).sort();
    console.log('  Certified QIDs: ' + certQIDs.join(' '));
    
    const nonCert = withQID.filter(o => o.question_state !== 'Certified');
    if (nonCert.length > 0) {
      const states = {};
      nonCert.forEach(o => { const s = o.question_state || 'MISSING'; states[s] = (states[s] || 0) + 1; });
      console.log('  Non-Certified state distribution: ' + JSON.stringify(states));
    }
  }
  console.log('');
}

// Now also extract QIDs and question_state via regex for packs that failed parsing
console.log('\n=== Regex-based QID extraction for cross-validation ===\n');
for (const pack of packs) {
  const src = fs.readFileSync(path.join(base, pack.file), 'utf8');
  const qidMatches = src.match(/"QuestionID"\s*:\s*"([^"]+)"/g);
  if (!qidMatches) { console.log(pack.label + ': No QIDs found'); continue; }
  const qids = qidMatches.map(m => m.match(/"([^"]+)"$/)[1]);
  console.log(pack.label + ': ' + qids.length + ' QuestionID matches');
}
