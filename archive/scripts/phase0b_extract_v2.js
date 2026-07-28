// Phase 0B v2: Robust extraction of all Certified QIDs
const fs = require('fs');
const path = require('path');
const base = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';

// String-aware JavaScript object extractor (eval-based, not JSON.parse)
function extractObjectsEval(filename) {
  const src = fs.readFileSync(path.join(base, filename), 'utf8');
  const startIdx = src.indexOf('[');
  if (startIdx === -1) return [];
  
  const results = [];
  let i = startIdx + 1;
  const len = src.length;
  
  while (i < len) {
    // Skip whitespace
    while (i < len && /\s/.test(src[i])) i++;
    if (i >= len) break;
    if (src[i] === ']') break;
    if (src[i] === ',') { i++; continue; }
    
    if (src[i] !== '{') {
      // Unknown token - skip
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
      if (ch === '"' || ch === "'" || ch === '`') { inString = true; stringChar = ch; continue; }
      if (ch === '{') depth++;
      if (ch === '}') { depth--; if (depth === 0) { i++; break; } }
    }
    
    const objStr = src.substring(start, i);
    try {
      const obj = eval('(' + objStr + ')');
      if (obj && obj.QuestionID) results.push(obj);
    } catch(e) {
      try {
        // Try JSON.parse as fallback
        const obj = JSON.parse(objStr);
        if (obj && obj.QuestionID) results.push(obj);
      } catch(e2) {
        results.push({ _parseError: e.message, _loc: start, _len: objStr.length });
      }
    }
  }
  return results;
}

console.log('=== PHASE 0B v2: EVAL-BASED EXTRACTION ===\n');

const packs = ['pack_a_corrected.js', 'pack_b_corrected.js', 'pack_c_corrected.js', 'pack_d_corrected.js', 'pack_e_corrected.js'];
const packLabels = ['A', 'B', 'C', 'D', 'E'];

for (let p = 0; p < packs.length; p++) {
  const f = packs[p];
  const label = packLabels[p];
  
  const objs = extractObjectsEval(f);
  const withQID = objs.filter(o => o.QuestionID);
  const certified = withQID.filter(o => o.question_state === 'Certified');
  const errors = objs.filter(o => o._parseError);
  
  console.log('--- Pack ' + label + ' ---');
  console.log('  Objects extracted: ' + objs.length);
  console.log('  Valid with QID: ' + withQID.length);
  console.log('  Parse errors: ' + errors.length);
  console.log('  Certified: ' + certified.length);
  
  if (errors.length > 0) {
    console.log('  Error details:');
    errors.slice(0, 5).forEach(e => console.log('    pos=' + e._loc + ' len=' + e._len + ' err=' + e._parseError.substring(0, 80)));
    if (errors.length > 5) console.log('    ... and ' + (errors.length - 5) + ' more');
  }
  
  // List sections for Certified
  const sections = {};
  certified.forEach(o => { sections[o.Section] = (sections[o.Section] || 0) + 1; });
  console.log('  Section distribution: ' + JSON.stringify(sections));
  
  // List Certified QIDs per section
  for (const sec of Object.keys(sections).sort()) {
    const qids = certified.filter(o => o.Section === sec).map(o => o.QuestionID).sort();
    console.log('  Section ' + sec + ' (' + qids.length + '): ' + qids.join(' '));
  }
  
  // Identify missing QIDs from regex count vs extracted
  const regexQIDCount = (fs.readFileSync(path.join(base, f), 'utf8').match(/"QuestionID"\s*:\s*"[^"]+"/g) || []).length;
  console.log('  Regex QID count: ' + regexQIDCount);
  
  const nonCertWithQID = withQID.filter(o => o.question_state !== 'Certified');
  const states = {};
  nonCertWithQID.forEach(o => { const s = o.question_state || 'MISSING'; states[s] = (states[s] || 0) + 1; });
  console.log('  Non-Certified states: ' + JSON.stringify(states));
  
  console.log('');
}
