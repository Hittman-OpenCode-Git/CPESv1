// Phase 0B: Reconcile the Certified population using all available methods
const fs = require('fs');
const path = require('path');
const base = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';

function extractQIDsRegex(filename) {
  const src = fs.readFileSync(path.join(base, filename), 'utf8');
  // Find all QID blocks: QID + nearby question_state
  const results = [];
  const re = /"QuestionID"\s*:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const qid = m[1];
    const pos = m.index;
    // Search forward for question_state
    const ctx = src.substring(pos, pos + 10000);
    const stateMatch = ctx.match(/"question_state"\s*:\s*"([^"]+)"/);
    const state = stateMatch ? stateMatch[1] : 'MISSING';
    // Search forward for Section
    const sectionMatch = ctx.match(/"Section"\s*:\s*"([^"]+)"/);
    const section = sectionMatch ? sectionMatch[1] : 'UNKNOWN';
    // Search for CorrectChoice
    const ccMatch = ctx.match(/"CorrectChoice"\s*:\s*"([^"]+)"/);
    const cc = ccMatch ? ccMatch[1] : 'UNKNOWN';
    results.push({ QID: qid, question_state: state, Section: section, CorrectChoice: cc, _pos: pos });
  }
  return results;
}

function extractQIDsFromObjects(filename) {
  const src = fs.readFileSync(path.join(base, filename), 'utf8');
  const startIdx = src.indexOf('[');
  if (startIdx === -1) return [];
  
  const results = [];
  let i = startIdx + 1;
  const len = src.length;
  
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
    try {
      const obj = eval('(' + objStr + ')');
      if (obj && obj.QuestionID) results.push(obj);
    } catch(e) {
      // Try JSON.parse
      try {
        const obj = JSON.parse(objStr);
        if (obj && obj.QuestionID) results.push(obj);
      } catch(e2) {
        // Try to extract QID from the raw string
        const qidMatch = objStr.match(/"QuestionID"\s*:\s*"([^"]+)"/);
        const ccMatch = objStr.match(/"CorrectChoice"\s*:\s*"([^"]+)"/);
        const stateMatch = objStr.match(/"question_state"\s*:\s*"([^"]+)"/);
        const sectionMatch = objStr.match(/"Section"\s*:\s*"([^"]+)"/);
        results.push({
          QuestionID: qidMatch ? qidMatch[1] : 'UNKNOWN',
          question_state: stateMatch ? stateMatch[1] : 'MISSING',
          Section: sectionMatch ? sectionMatch[1] : 'UNKNOWN',
          CorrectChoice: ccMatch ? ccMatch[1] : 'UNKNOWN',
          _parseError: true
        });
      }
    }
  }
  return results;
}

console.log('=== PHASE 0B: CERTIFIED POPULATION RECONCILIATION ===\n');

const packs = [
  { file: 'pack_a_corrected.js', label: 'A' },
  { file: 'pack_b_corrected.js', label: 'B' },
  { file: 'pack_c_corrected.js', label: 'C' },
  { file: 'pack_d_corrected.js', label: 'D' },
  { file: 'pack_e_corrected.js', label: 'E' },
];

const allCertified = [];
const completeQIDs = [];
const missingQIDs = [];
const parseBlocked = [];

for (const pack of packs) {
  const regexQIDs = extractQIDsRegex(pack.file);
  const objQIDs = extractQIDsFromObjects(pack.file);
  
  console.log('--- Pack ' + pack.label + ' ---');
  console.log('  Regex QIDs: ' + regexQIDs.length);
  console.log('  Object QIDs: ' + objQIDs.length);
  
  const regexCertified = regexQIDs.filter(q => q.question_state === 'Certified');
  const objCertified = objQIDs.filter(q => q.question_state === 'Certified');
  const objCertifiedQIDs = new Set(objCertified.map(q => q.QuestionID));
  const parseErrors = objQIDs.filter(q => q._parseError);
  
  console.log('  Certified (regex): ' + regexCertified.length);
  console.log('  Certified (objects): ' + objCertified.length);
  console.log('  Parse errors: ' + parseErrors.length);
  
  // Identify missing Certified QIDs (in regex but not in objects)
  const missing = regexCertified.filter(q => !objCertifiedQIDs.has(q.QID));
  if (missing.length > 0) {
    console.log('  Missing from object parse (Certified): ' + missing.length);
    missing.forEach(q => console.log('    ' + q.QID + ' (Section ' + q.Section + ', CC=' + q.CorrectChoice + ', pos=' + q._pos + ')'));
  }
  
  // All regex Certified
  regexCertified.forEach(q => {
    q.Pack = pack.label;
    allCertified.push(q);
    const inObjects = objCertifiedQIDs.has(q.QID);
    const isParseError = parseErrors.some(pe => pe.QuestionID === q.QID);
    if (!inObjects && !isParseError) {
      missingQIDs.push({ ...q, reason: 'NOT_IN_OBJECT_PARSE' });
    } else if (isParseError) {
      parseBlocked.push({ ...q, reason: 'PARSE_BLOCKED_IN_SOURCE' });
    } else {
      completeQIDs.push(q);
    }
  });
  
  // Also check regex non-certified
  const regexNonCert = regexQIDs.filter(q => q.question_state !== 'Certified');
  const states = {};
  regexNonCert.forEach(q => { states[q.question_state] = (states[q.question_state] || 0) + 1; });
  console.log('  Non-Certified states: ' + JSON.stringify(states));
  console.log('');
}

console.log('\n=== GRAND TOTAL ===');
console.log('All Certified (regex): ' + allCertified.length);
console.log('Complete evidence (object-parsed): ' + completeQIDs.length);
console.log('Missing/insufficient evidence: ' + missingQIDs.length);
console.log('Parse-blocked: ' + parseBlocked.length);
console.log('Total: ' + (completeQIDs.length + missingQIDs.length + parseBlocked.length));

console.log('\n=== PER-PACK SUMMARY ===');
for (const label of ['A', 'B', 'C', 'D', 'E']) {
  const packTotal = allCertified.filter(q => q.Pack === label).length;
  const packComplete = completeQIDs.filter(q => q.Pack === label).length;
  const packMissing = missingQIDs.filter(q => q.Pack === label).length;
  const packBlocked = parseBlocked.filter(q => q.Pack === label).length;
  console.log(label + ': ' + packTotal + ' certified | ' + packComplete + ' complete | ' + packMissing + ' missing | ' + packBlocked + ' parse_blocked');
}

// Output the complete list of missing QIDs
console.log('\n=== MISSING EVIDENCE QIDs (sorted, needs primary derivation) ===');
const allMissing = [...missingQIDs.map(q => q.QID), ...parseBlocked.filter(q => q.question_state === 'Certified').map(q => q.QID)].sort();
console.log('Count: ' + allMissing.length);
// Group by pack
for (const label of ['A', 'B', 'C', 'D', 'E']) {
  const packMissing = allMissing.filter(q => {
    if (q.startsWith('P1-E-') || q.startsWith('P1-B')) return label === 'A';
    if (q.startsWith('P1B-')) return label === 'B';
    if (q.startsWith('P1-AC-') || q.startsWith('P1-BC-')) return label === 'C';
    if (q.startsWith('P1-AD-') || q.startsWith('P1-BD-') || q.startsWith('P1-DD-')) return label === 'D';
    if (q.startsWith('P1E-')) return label === 'E';
    return false;
  });
  if (packMissing.length > 0) {
    console.log('\nPack ' + label + ' (' + packMissing.length + '):');
    console.log(packMissing.join(' '));
  }
}

// Save to file for reference
fs.writeFileSync(path.join(base, 'reports/PHASE0B_CERTIFIED_RECONCILIATION.json'),
  JSON.stringify({ allCertified, completeQIDs, missingQIDs, parseBlocked, timestamp: new Date().toISOString() }, null, 2));
console.log('\nFull reconciliation saved to reports/PHASE0B_CERTIFIED_RECONCILIATION.json');
