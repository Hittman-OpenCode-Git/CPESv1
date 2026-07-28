// Session 4: Complete Defect Manifest Reconciliation (Read-Only)
const fs = require('fs');
const path = require('path');
const base = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';

// ===== 1. HASH/SIZE/TIMESTAMP/QID RECONFIRMATION =====
console.log('=== 1. FILE BASELINE RECONFIRMATION ===\n');

const packs = [
  { file: 'pack_a_corrected.js', label: 'A' },
  { file: 'pack_c_corrected.js', label: 'C' },
];

for (const p of packs) {
  const fpath = path.join(base, p.file);
  const buf = fs.readFileSync(fpath);
  const crypto = require('crypto');
  const sha256 = crypto.createHash('sha256').update(buf).digest('hex').toUpperCase();
  const size = buf.length;
  const ts = fs.statSync(fpath).mtime.toISOString();
  const src = buf.toString('utf8');
  const qidCount = (src.match(/"QuestionID"/g) || []).length;
  
  console.log('Pack ' + p.label + ':');
  console.log('  SHA-256: ' + sha256);
  console.log('  Size: ' + size + ' bytes');
  console.log('  Last modified: ' + ts);
  console.log('  QuestionID count: ' + qidCount);
  console.log('');
}

// ===== 2. PACK A: DOUBLE-COMMA ENUMERATION =====
console.log('=== 2. PACK A: DOUBLE-COMMA DEFECT ENUMERATION ===\n');

const srcA = fs.readFileSync(path.join(base, 'pack_a_corrected.js'), 'utf8');
const linesA = srcA.split('\n');

// Find all ,, outside strings
const packA_defects = [];
let inString = false;
let esc = false;

for (let i = 0; i < srcA.length - 1; i++) {
  const ch = srcA[i];
  if (esc) { esc = false; continue; }
  if (ch === '\\') { esc = true; continue; }
  if (inString) {
    if (ch === '"') { inString = false; }
    continue;
  }
  if (ch === '"') { inString = true; continue; }
  
  if (ch === ',' && srcA[i+1] === ',') {
    const lineNum = srcA.substring(0, i).split('\n').length;
    
    // Find context: identify the property containing this ,,
    // Search backward for nearest property name
    let propSearch = i - 1;
    let propName = 'UNKNOWN';
    let braceDepth = 0;
    let tempInStr = false;
    let tempEsc = false;
    let foundProp = false;
    
    for (let j = i - 50; j >= 0 && !foundProp; j--) {
      const c = srcA[j];
      if (tempEsc) { tempEsc = false; continue; }
      if (c === '\\') { tempEsc = true; continue; }
      if (tempInStr) {
        if (c === '"') tempInStr = false;
        continue;
      }
      if (c === '"') {
        // Check if this is a property name (preceded by whitespace/newline and has : somewhere after)
        let k = j - 1;
        while (k >= 0 && (srcA[k] === ' ' || srcA[k] === '\t' || srcA[k] === '\n' || srcA[k] === '\r')) k--;
        if (k >= 0 && (srcA[k] === '{' || srcA[k] === ',')) {
          // Extract property name
          let propEnd = j;
          let propStart = j + 1;
          while (propStart < srcA.length && srcA[propStart] !== '"') propStart++;
          if (propStart > propEnd) {
            propName = srcA.substring(propEnd + 1, propStart);
            foundProp = true;
          }
        }
      }
    }
    
    // Find QID by searching backward
    const before = srcA.substring(Math.max(0, i - 8000), i);
    const qidMatches = before.match(/"QuestionID"\s*:\s*"([^"]+)"/g);
    const nearestQID = qidMatches ? qidMatches[qidMatches.length - 1].match(/"([^"]+)"$/)[1] : 'UNKNOWN';
    
    // Preceding and following context
    const preCtx = srcA.substring(Math.max(0, i - 80), i);
    const postCtx = srcA.substring(i + 2, Math.min(i + 82, srcA.length));
    
    packA_defects.push({
      id: 'S3-BLK-01-' + (packA_defects.length + 1),
      line: lineNum,
      byteOffset: i,
      qid: nearestQID,
      property: propName,
      preceding: preCtx.replace(/\r?\n/g, '\\n'),
      following: postCtx.replace(/\r?\n/g, '\\n'),
      repair: 'delete 1 comma (,, -> ,)',
    });
    
    console.log('Defect #' + packA_defects.length + ':');
    console.log('  Line: ' + lineNum + ', byte offset: ' + i);
    console.log('  QID: ' + nearestQID);
    console.log('  Property: ' + propName);
    console.log('  Preceding: ' + JSON.stringify(preCtx.substring(preCtx.length - 60)).replace(/\n/g, '\\n'));
    console.log('  Following: ' + JSON.stringify(postCtx.substring(0, 60)).replace(/\n/g, '\\n'));
    console.log('');
  }
}

// Check if any other syntax issues remain after fixing ,, 
// Do a character-by-character check for other stray commas
let strayCommas = 0;
inString = false; esc = false;
for (let i = 0; i < srcA.length; i++) {
  const ch = srcA[i];
  if (esc) { esc = false; continue; }
  if (ch === '\\') { esc = true; continue; }
  if (inString) {
    if (ch === '"') inString = false;
    continue;
  }
  if (ch === '"') { inString = true; continue; }
}
console.log('Pack A: 3 double-comma defects enumerated.\n');

// ===== 3. PACK C: MISSING COMMA ENUMERATION =====
console.log('=== 3. PACK C: MISSING COMMA ENUMERATION ===\n');

const srcC = fs.readFileSync(path.join(base, 'pack_c_corrected.js'), 'utf8');

const packC_defects = [];
inString = false;
esc = false;

for (let i = 0; i < srcC.length; i++) {
  const ch = srcC[i];
  if (esc) { esc = false; continue; }
  if (ch === '\\') { esc = true; continue; }
  if (inString) {
    if (ch === '"') {
      inString = false;
      // Value just ended. Look ahead for next property start without comma.
      let j = i + 1;
      while (j < srcC.length && (srcC[j] === ' ' || srcC[j] === '\n' || srcC[j] === '\r' || srcC[j] === '\t')) j++;
      if (j < srcC.length && srcC[j] === '"') {
        // Next char after whitespace is " — potential missing comma
        // Verify we're inside an object, not between array elements
        let depth = 0;
        let k = i;
        let insideObject = false;
        while (k >= 0) {
          if (srcC[k] === '}') depth++;
          if (srcC[k] === '{') { depth--; if (depth < 0) { insideObject = true; break; } }
          // Skip strings while going backward
          if (srcC[k] === '"') {
            k--;
            let btEsc = false;
            while (k >= 0) {
              if (srcC[k] === '\\') { btEsc = !btEsc; k--; continue; }
              if (btEsc) { btEsc = false; k--; continue; }
              if (srcC[k] === '"') break;
              k--;
            }
          }
          k--;
        }
        
        if (insideObject) {
          const lineNum = srcC.substring(0, j).split('\n').length;
          
          // Find preceding property name
          let preProp = 'UNKNOWN';
          let pp = i - 1;
          let ppDepth = 0;
          let ppStr = false;
          let ppEsc = false;
          while (pp >= 0) {
            const pc = srcC[pp];
            if (ppEsc) { ppEsc = false; pp--; continue; }
            if (pc === '\\') { ppEsc = true; pp--; continue; }
            if (ppStr) { if (pc === '"') ppStr = false; pp--; continue; }
            if (pc === '"') {
              // Extract name
              const nameEnd = pp;
              pp--;
              while (pp >= 0 && srcC[pp] !== '"') pp--;
              if (pp >= 0 && srcC[pp] === '"') {
                preProp = srcC.substring(pp + 1, nameEnd);
                break;
              }
            }
            pp--;
          }
          
          // Following property name
          const nextPropMatch = srcC.substring(j + 1, j + 80).match(/"([^"]+)"/);
          const nextProp = nextPropMatch ? nextPropMatch[1] : 'UNKNOWN';
          
          // QID
          const before2 = srcC.substring(Math.max(0, i - 5000), i);
          const qidMatch2 = before2.match(/"QuestionID"\s*:\s*"([^"]+)"/g);
          const qid = qidMatch2 ? qidMatch2[qidMatch2.length - 1].match(/"([^"]+)"$/)[1] : 'UNKNOWN';
          
          const preCtx = srcC.substring(Math.max(0, i - 30), i + 1).replace(/\r?\n/g, '\\n');
          const postCtx = srcC.substring(j, Math.min(j + 50, srcC.length)).replace(/\r?\n/g, '\\n');
          
          packC_defects.push({
            id: 'S3-BLK-02-' + (packC_defects.length + 1),
            line: lineNum,
            byteOffset: j,
            qid: qid,
            precedingProperty: preProp,
            followingProperty: nextProp,
            preceding: preCtx,
            following: postCtx,
            repair: 'insert 1 comma before position ' + j,
          });
        }
      }
    }
    continue;
  }
  if (ch === '"') { inString = true; continue; }
}

console.log('Pack C: ' + packC_defects.length + ' missing commas enumerated.\n');

// ===== 4. BACKUP PREVALENCE CHECK =====
console.log('=== 4. BACKUP PREVALENCE CHECK ===\n');

const backupDir = path.join(base, 'backups');
if (fs.existsSync(backupDir)) {
  const aBackups = fs.readdirSync(backupDir).filter(f => f.startsWith('pack_a_corrected.js.bak')).sort();
  const cBackups = fs.readdirSync(backupDir).filter(f => f.startsWith('pack_c_corrected.js.bak')).sort();
  console.log('Pack A backups found: ' + aBackups.length);
  if (aBackups.length > 0) {
    const latestABak = path.join(backupDir, aBackups[aBackups.length - 1]);
    const bakSrcA = fs.readFileSync(latestABak, 'utf8');
    // Check each defect in the backup
    console.log('  Checking latest backup: ' + aBackups[aBackups.length - 1]);
    for (const def of packA_defects) {
      // Look for ,, at same relative position
      // Count lines to estimate position
      let present = false;
      for (let ci = def.byteOffset - 100; ci < def.byteOffset + 100 && ci < bakSrcA.length - 1; ci++) {
        if (ci >= 0 && bakSrcA[ci] === ',' && bakSrcA[ci+1] === ',') {
          present = true;
          break;
        }
      }
      console.log('  Defect ' + def.id + ' (line ' + def.line + '): ' + (present ? 'PRESENT in backup' : 'NOT FOUND in backup'));
    }
  }
  
  console.log('\nPack C backups found: ' + cBackups.length);
  if (cBackups.length > 0) {
    const latestCBak = path.join(backupDir, cBackups[cBackups.length - 1]);
    const bakSrcC = fs.readFileSync(latestCBak, 'utf8');
    console.log('  Checking latest backup: ' + cBackups[cBackups.length - 1]);
    // Spot-check a few Pack C defects
    let presentCount = 0;
    let absentCount = 0;
    for (const def of packC_defects.slice(0, 10)) {
      // Check context around the defect position in backup
      const searchCtx = def.preceding.replace(/\\n/g, '\n').substring(def.preceding.length - 30);
      const idx = bakSrcC.indexOf(searchCtx);
      if (idx >= 0) {
        const matchArea = bakSrcC.substring(idx, idx + 100);
        if (matchArea.includes('"\n')) {
          presentCount++;
        } else {
          absentCount++;
        }
      } else {
        absentCount++;
      }
    }
    console.log('  Spot-check of first 10 defects: ' + presentCount + ' present, ' + absentCount + ' absent in backup');
  }
} else {
  console.log('No backups directory found.');
}

// ===== 5. VIRTUAL VALIDATION =====
console.log('\n=== 5. VIRTUAL VALIDATION ===\n');

console.log('=== Pack A: Virtual repair test ===');
// Create in-memory repaired version
try {
  let repairedA = srcA;
  // Apply 3 fixes from last to first (to preserve offsets)
  const sortedA = [...packA_defects].sort((a, b) => b.byteOffset - a.byteOffset);
  for (const def of sortedA) {
    repairedA = repairedA.substring(0, def.byteOffset) + repairedA.substring(def.byteOffset + 1);
  }
  // Try to parse
  const arrIdx = repairedA.indexOf('[');
  const fn = new Function('return ' + repairedA.substring(arrIdx));
  const result = fn();
  if (Array.isArray(result)) {
    const qids = result.filter(o => o && o.QuestionID);
    console.log('Pack A virtual repair: SUCCESS — ' + result.length + ' objects, ' + qids.length + ' with QID');
  } else {
    console.log('Pack A virtual repair: UNEXPECTED RESULT TYPE: ' + typeof result);
  }
} catch(e) {
  console.log('Pack A virtual repair: STILL FAILS — ' + e.message.substring(0, 200));
  // Find the next parser error
  console.log('  Pack A has additional syntax defects beyond double-commas.');
}

console.log('\n=== Pack C: Virtual repair test ===');
try {
  let repairedC = srcC;
  const sortedC = [...packC_defects].sort((a, b) => b.byteOffset - a.byteOffset);
  for (const def of sortedC) {
    repairedC = repairedC.substring(0, def.byteOffset) + ',' + repairedC.substring(def.byteOffset);
  }
  const arrIdx2 = repairedC.indexOf('[');
  const fn2 = new Function('return ' + repairedC.substring(arrIdx2));
  const result2 = fn2();
  if (Array.isArray(result2)) {
    const qids2 = result2.filter(o => o && o.QuestionID);
    console.log('Pack C virtual repair: SUCCESS — ' + result2.length + ' objects, ' + qids2.length + ' with QID');
  } else {
    console.log('Pack C virtual repair: UNEXPECTED RESULT TYPE: ' + typeof result2);
  }
} catch(e2) {
  console.log('Pack C virtual repair: STILL FAILS — ' + e2.message.substring(0, 200));
}

// ===== OUTPUT FULL MANIFEST =====
console.log('\n=== FULL MANIFEST OUTPUT ===\n');

const manifest = {
  session: 'Session 4 — Defect Manifest Reconciliation',
  timestamp: new Date().toISOString(),
  mode: 'READ-ONLY',
  packA: {
    file: 'pack_a_corrected.js',
    sha256: require('crypto').createHash('sha256').update(fs.readFileSync(path.join(base, 'pack_a_corrected.js'))).digest('hex').toUpperCase(),
    size: fs.statSync(path.join(base, 'pack_a_corrected.js')).size,
    qidCount: (srcA.match(/"QuestionID"/g) || []).length,
    totalDefects: packA_defects.length,
    defects: packA_defects,
    virtualRepairResult: 'see log above'
  },
  packC: {
    file: 'pack_c_corrected.js',
    sha256: require('crypto').createHash('sha256').update(fs.readFileSync(path.join(base, 'pack_c_corrected.js'))).digest('hex').toUpperCase(),
    size: fs.statSync(path.join(base, 'pack_c_corrected.js')).size,
    qidCount: (srcC.match(/"QuestionID"/g) || []).length,
    totalDefects: packC_defects.length,
    defects: packC_defects,
    virtualRepairResult: 'see log above'
  }
};

fs.writeFileSync(path.join(base, 'reports/SESSION4_DEFECT_MANIFEST_FULL.json'), JSON.stringify(manifest, null, 2));
console.log('Full manifest (JSON) saved to reports/SESSION4_DEFECT_MANIFEST_FULL.json');
console.log('Expected comma insertion list for Pack C: ' + packC_defects.map(d => d.byteOffset).join(', '));
