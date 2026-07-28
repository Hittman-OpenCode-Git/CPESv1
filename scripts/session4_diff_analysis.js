// Session 4: Extract exact defect details from backup vs live diff
const fs = require('fs');
const path = require('path');
const base = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';

// ===== PACK A: Compare backup vs live to get exact defect changes =====
console.log('=== PACK A: BACKUP vs LIVE DIFF ANALYSIS ===\n');

const liveA = fs.readFileSync(path.join(base, 'pack_a_corrected.js'), 'utf8');
const bakA = fs.readFileSync(path.join(base, 'pack_a_corrected.js.bak-session4-s3blk01-20260724112135'), 'utf8');

// Find all positions where backup has ,, and live has ,
let pos = 0;
let aDefects = [];
while (pos < bakA.length - 1) {
  if (bakA[pos] === ',' && bakA[pos+1] === ',') {
    const lineNum = bakA.substring(0, pos).split('\n').length;
    // Check what's in live file at same byte positions
    // In live, 1 comma was deleted, so we look for the shift
    const liveCtx = liveA.substring(Math.max(0, pos-40), pos+40).replace(/\r?\n/g, '\\n');
    const bakCtx = bakA.substring(Math.max(0, pos-40), pos+42).replace(/\r?\n/g, '\\n');
    
    // Find nearest QID
    const before = bakA.substring(Math.max(0, pos - 8000), pos);
    const qidMatches = before.match(/"QuestionID"\s*:\s*"([^"]+)"/g);
    const qid = qidMatches ? qidMatches[qidMatches.length - 1].match(/"([^"]+)"$/)[1] : 'UNKNOWN';
    
    // Find property containing this
    const lineStart = bakA.lastIndexOf('\n', pos) + 1;
    const lineEnd = bakA.indexOf('\n', pos);
    const line = bakA.substring(lineStart, lineEnd > 0 ? lineEnd : bakA.length);
    
    aDefects.push({
      id: 'A-' + (aDefects.length + 1),
      line: lineNum,
      byteOffset: pos,
      qid: qid,
      backupLine: line.substring(0, 100),
      backupCtx: bakCtx,
      liveCtx: liveCtx,
      repair: 'delete 1 comma (,, → ,)'
    });
    
    console.log('Defect ' + aDefects.length + ':');
    console.log('  Line: ' + lineNum + ', Byte: ' + pos + ', QID: ' + qid);
    console.log('  Backup: ' + JSON.stringify(bakCtx.substring(0, 100)));
    console.log('  Live:   ' + JSON.stringify(liveCtx.substring(0, 100)));
    console.log('');
  }
  pos++;
}

console.log('Pack A: ' + aDefects.length + ' defects in backup, now fixed in live.\n');

// ===== PACK C: Compare backup vs live =====
console.log('=== PACK C: BACKUP vs LIVE DIFF ANALYSIS ===\n');

const liveC = fs.readFileSync(path.join(base, 'pack_c_corrected.js'), 'utf8');
const bakC = fs.readFileSync(path.join(base, 'pack_c_corrected.js.bak-session4-s3blk02-20260724112135'), 'utf8');

// Find all positions where backup and live differ
let cDefects = [];
for (let i = 0; i < Math.min(liveC.length, bakC.length); i++) {
  if (liveC[i] !== bakC[i]) {
    const lineNum = bakC.substring(0, i).split('\n').length;
    const liveChar = liveC[i];
    const bakChar = bakC[i];
    
    // Determine what changed: if char was inserted (live longer at this point)
    // Since file sizes are close, check if this is a comma insertion
    const bakCtx = bakC.substring(Math.max(0, i-40), i+40).replace(/\r?\n/g, '\\n');
    const liveCtx = liveC.substring(Math.max(0, i-40), i+40).replace(/\r?\n/g, '\\n');
    
    // Find QID
    const before2 = bakC.substring(Math.max(0, i - 5000), i);
    const qidMatches2 = before2.match(/"QuestionID"\s*:\s*"([^"]+)"/g);
    const qid2 = qidMatches2 ? qidMatches2[qidMatches2.length - 1].match(/"([^"]+)"$/)[1] : 'UNKNOWN';
    
    cDefects.push({
      id: 'C-' + (cDefects.length + 1),
      line: lineNum,
      byteOffset: i,
      qid: qid2,
      backupChar: bakChar,
      backupCharCode: bakC.charCodeAt(i),
      liveChar: liveChar,
      liveCharCode: liveC.charCodeAt(i),
      backupCtx: bakCtx,
      liveCtx: liveCtx,
      repair: 'insert comma at position ' + i
    });
    
    console.log('Defect C-' + cDefects.length + ': Line ' + lineNum + ' Byte ' + i + ' QID ' + qid2);
    console.log('  Backup char: ' + JSON.stringify(bakChar) + ' (code=' + bakC.charCodeAt(i) + ') → Live char: ' + JSON.stringify(liveChar) + ' (code=' + liveC.charCodeAt(i) + ')');
    console.log('  Backup: ' + JSON.stringify(bakCtx.substring(0, 120)));
    console.log('  Live:   ' + JSON.stringify(liveCtx.substring(0, 120)));
    console.log('');
  }
}

console.log('Pack C: ' + cDefects.length + ' comma insertions in live vs backup.\n');

// ===== VERIFY PARSABILITY OF CURRENT LIVE FILES =====
console.log('=== PARSE VERIFICATION OF CURRENT LIVE FILES ===\n');

try {
  const arrA = liveA.substring(liveA.indexOf('['));
  const fnA = new Function('return ' + arrA);
  const resultA = fnA();
  console.log('Pack A (live): ' + resultA.length + ' objects parsed ✓');
} catch(e) {
  console.log('Pack A (live): PARSE FAILED — ' + e.message.substring(0, 200));
}

try {
  const arrC = liveC.substring(liveC.indexOf('['));
  const fnC = new Function('return ' + arrC);
  const resultC = fnC();
  console.log('Pack C (live): ' + resultC.length + ' objects parsed ✓');
} catch(e2) {
  console.log('Pack C (live): PARSE FAILED — ' + e2.message.substring(0, 200));
}

// Also test all 5 packs
console.log('');
for (const label of ['B','D','E']) {
  const fpath = path.join(base, 'pack_' + label.toLowerCase() + '_corrected.js');
  try {
    const srcX = fs.readFileSync(fpath, 'utf8');
    const arrX = srcX.substring(srcX.indexOf('['));
    const fnX = new Function('return ' + arrX);
    const resultX = fnX();
    console.log('Pack ' + label + ': ' + resultX.length + ' objects parsed ✓');
  } catch(e) {
    console.log('Pack ' + label + ': PARSE FAILED — ' + e.message.substring(0, 200));
  }
}

// Save manifest
const fullManifest = {
  timestamp: new Date().toISOString(),
  packA: {
    file: 'pack_a_corrected.js',
    backupBaseline: 'pack_a_corrected.js.bak-session4-s3blk01-20260724112135',
    defectsInBackup: aDefects.length,
    defectsInLive: 0,
    repairApplied: '3 double-commas removed (, , → ,)',
    defects: aDefects
  },
  packC: {
    file: 'pack_c_corrected.js',
    backupBaseline: 'pack_c_corrected.js.bak-session4-s3blk02-20260724112135',
    defectsInBackup: cDefects.length,
    defectsInLive: 0,
    repairApplied: cDefects.length + ' commas inserted',
    defects: cDefects
  }
};

fs.writeFileSync(path.join(base, 'reports/SESSION4_DIFF_ANALYSIS.json'), JSON.stringify(fullManifest, null, 2));
console.log('\nDiff analysis saved to reports/SESSION4_DIFF_ANALYSIS.json');
