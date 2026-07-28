// Session 4: Exact byte-level diff verification
const fs = require('fs');
const path = require('path');
const base = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';

console.log('=== EXACT BYTE-LEVEL DIFF VERIFICATION ===\n');

// ===== PACK A: Session 4 backup vs LIVE =====
console.log('--- PACK A: Session 4 Backup vs LIVE ---\n');

const liveA = fs.readFileSync(path.join(base, 'pack_a_corrected.js'));
const bakA = fs.readFileSync(path.join(base, 'pack_a_corrected.js.bak-session4-s3blk01-20260724112135'));

console.log('Backup size: ' + bakA.length + ' bytes');
console.log('Live size: ' + liveA.length + ' bytes');
console.log('Size delta: ' + (liveA.length - bakA.length) + ' bytes');
console.log('');

// Find ALL byte-level differences
let aDiffs = [];
let aInsertions = 0;
let aDeletions = 0;
let aSubstitutions = 0;

// Walk through both files simultaneously
let bi = 0, li = 0;
while (bi < bakA.length || li < liveA.length) {
  if (bi >= bakA.length) {
    // Extra bytes in live (insertion)
    aInsertions++;
    bi++;
    li++;
    continue;
  }
  if (li >= liveA.length) {
    // Extra bytes in backup (deletion from live perspective)
    aDeletions++;
    bi++;
    li++;
    continue;
  }
  if (bakA[bi] !== liveA[li]) {
    // Found a diff - record it
    const lineNum = bakA.toString('utf8', 0, bi).split('\n').length;
    
    // Look ahead in both to determine type
    // Check if this is a deletion (backup has byte(s) that live doesn't)
    // or insertion (live has byte(s) that backup doesn't)
    // or substitution
    
    const bakChar = bakA[bi];
    const liveChar = liveA[li];
    const bakCharStr = String.fromCharCode(bakChar);
    const liveCharStr = String.fromCharCode(liveChar);
    
    // Check if this is a deletion: look if the next char in live matches the next char in backup (after skipping in backup)
    let diffType = 'UNKNOWN';
    if (li + 1 < liveA.length && bi + 2 < bakA.length && liveA[li] === bakA[bi + 1] && liveA[li + 1] === bakA[bi + 2]) {
      diffType = 'DELETION';
      aDeletions++;
    } else if (bi + 1 < bakA.length && li + 2 < liveA.length && bakA[bi] === liveA[li + 1] && bakA[bi + 1] === liveA[li + 2]) {
      diffType = 'INSERTION';
      aInsertions++;
    } else {
      diffType = 'SUBSTITUTION';
      aSubstitutions++;
    }
    
    const ctxBak = bakA.toString('utf8', Math.max(0, bi-30), bi+30).replace(/\r?\n/g, '\\n');
    const ctxLive = liveA.toString('utf8', Math.max(0, li-30), li+30).replace(/\r?\n/g, '\\n');
    
    aDiffs.push({
      backupPos: bi,
      livePos: li,
      line: lineNum,
      backupByte: bakChar,
      backupChar: bakCharStr,
      liveByte: liveChar,
      liveChar: liveCharStr,
      type: diffType,
      backupCtx: ctxBak,
      liveCtx: ctxLive
    });
    
    if (aDiffs.length <= 5) {
      console.log('Diff #' + aDiffs.length + ': type=' + diffType);
      console.log('  Backup pos ' + bi + ', byte=' + bakChar + '(' + bakCharStr + '): ' + JSON.stringify(ctxBak.substring(0, 80)));
      console.log('  Live pos   ' + li + ', byte=' + liveChar + '(' + liveCharStr + '): ' + JSON.stringify(ctxLive.substring(0, 80)));
    }
    
    bi++;
    li++;
  } else {
    bi++;
    li++;
  }
}

console.log('\nPack A diff summary:');
console.log('  Deletions: ' + aDeletions);
console.log('  Insertions: ' + aInsertions);
console.log('  Substitutions: ' + aSubstitutions);
console.log('  Total diff positions: ' + aDiffs.length);

// Verify: all deletions should be comma bytes
let nonCommaDeletions = aDiffs.filter(d => d.type === 'DELETION' && d.backupByte !== 44);
console.log('  Non-comma deletions: ' + nonCommaDeletions.length);
if (nonCommaDeletions.length > 0) {
  console.log('  *** NON-COMMA CHANGES DETECTED ***');
  nonCommaDeletions.forEach(d => console.log('    pos=' + d.backupPos + ' byte=' + d.backupByte + ' char=' + d.backupChar));
}

// Verify: 3 deletions of commas from ,, pairs
let validCommaDeletions = 0;
for (const d of aDiffs) {
  if (d.type === 'DELETION' && d.backupByte === 44) {
    // Check that backup has ,, at this position
    if (bi_of_backup(d.backupPos, bakA) === 44) validCommaDeletions++;
  }
}
function bi_of_backup(pos, buf) { return pos < buf.length && pos + 1 < buf.length && buf[pos] === 44 && buf[pos+1] === 44; }

// Actually, let me verify the 3 deletions better
console.log('\n  Detailed Pack A change verification:');
const aChanges = [];
let bi2 = 0, li2 = 0;
while (bi2 < bakA.length && li2 < liveA.length) {
  if (bakA[bi2] !== liveA[li2]) {
    // Found start of change
    let changeBak = '', changeLive = '';
    let startBi = bi2, startLi = li2;
    while (bi2 < bakA.length && li2 < liveA.length && bakA[bi2] !== liveA[li2]) {
      changeBak += String.fromCharCode(bakA[bi2]);
      changeLive += String.fromCharCode(liveA[li2]);
      bi2++; li2++;
      if (bi2 - startBi > 10) break; // Don't search forever
    }
    const lineNum = bakA.toString('utf8', 0, startBi).split('\n').length;
    aChanges.push({ line: lineNum, backupPos: startBi, backupText: changeBak, liveText: changeLive });
    
    // Find QID
    const before = bakA.toString('utf8', Math.max(0, startBi - 5000), startBi);
    const qidMatch = before.match(/"QuestionID"\s*:\s*"([^"]+)"/g);
    const qid = qidMatch ? qidMatch[qidMatch.length - 1].match(/"([^"]+)"$/)[1] : 'UNKNOWN';
    
    console.log('Change #' + aChanges.length + ': line ' + lineNum + ', QID ' + qid);
    console.log('  Backup bytes: ' + changeBak.split('').map(c => c.charCodeAt(0)).join(','));
    console.log('  Live bytes:   ' + changeLive.split('').map(c => c.charCodeAt(0)).join(','));
    console.log('  Backup: ",' + changeBak + '" → Live: ",' + changeLive + '"');
  } else {
    bi2++; li2++;
  }
}
console.log('  Total changed regions: ' + aChanges.length);

// ===== PACK C =====
console.log('\n\n--- PACK C: Session 4 Backup vs LIVE ---\n');

const liveC = fs.readFileSync(path.join(base, 'pack_c_corrected.js'));
const bakC = fs.readFileSync(path.join(base, 'pack_c_corrected.js.bak-session4-s3blk02-20260724112135'));

console.log('Backup size: ' + bakC.length + ' bytes');
console.log('Live size: ' + liveC.length + ' bytes');
console.log('Size delta: ' + (liveC.length - bakC.length) + ' bytes');

// Find all diff positions
let cDiffs = [];
for (let i = 0; i < Math.min(liveC.length, bakC.length); i++) {
  if (liveC[i] !== bakC[i]) {
    const lineNum = bakC.toString('utf8', 0, i).split('\n').length;
    cDiffs.push({
      pos: i,
      line: lineNum,
      backupByte: bakC[i],
      backupChar: String.fromCharCode(bakC[i]),
      liveByte: liveC[i],
      liveChar: String.fromCharCode(liveC[i])
    });
  }
}

console.log('Total diff positions: ' + cDiffs.length);

// Verify: all are \r → , replacements
let crToComma = cDiffs.filter(d => d.backupByte === 13 && d.liveByte === 44);
console.log('  \\r (13) → , (44): ' + crToComma.length);

let otherChanges = cDiffs.filter(d => !(d.backupByte === 13 && d.liveByte === 44));
console.log('  Other changes: ' + otherChanges.length);
if (otherChanges.length > 0) {
  console.log('  *** UNEXPECTED CHANGES DETECTED ***');
  otherChanges.slice(0, 5).forEach(d => {
    console.log('    pos=' + d.pos + ' line=' + d.line + ' bak=' + d.backupByte + '(' + d.backupChar + ') live=' + d.liveByte + '(' + d.liveChar + ')');
  });
}

// Show first few
console.log('\n  First 5 changes:');
cDiffs.slice(0, 5).forEach(d => {
  const ctx = bakC.toString('utf8', Math.max(0, d.pos-40), d.pos+40).replace(/\r?\n/g, '\\n');
  console.log('  #' + (cDiffs.indexOf(d)+1) + ': line ' + d.line + ', pos ' + d.pos);
  console.log('    Bak byte: ' + d.backupByte + '(' + JSON.stringify(d.backupChar) + ') → Live: ' + d.liveByte + '(' + JSON.stringify(d.liveChar) + ')');
  console.log('    Context: ' + JSON.stringify(ctx.substring(0, 100)));
  console.log('    Bak chars around: ' + JSON.stringify(ctx.substring(ctx.indexOf('\n')-5, ctx.indexOf('\n')+5)));
});

// Classification
console.log('\n=== CLASSIFICATION ===\n');
if (aChanges.length === 3 && aDeletions === 3 && aInsertions === 0) {
  const allCommaDeletions = aChanges.every(c => c.backupText === ',,' && c.liveText === ',');
  if (allCommaDeletions) {
    console.log('Pack A: EXACT_MINIMAL_REPAIR_VERIFIED');
  } else {
    console.log('Pack A: UNAUTHORIZED_ADDITIONAL_CHANGE_DETECTED');
    console.log('  Changes: ' + JSON.stringify(aChanges));
  }
} else {
  console.log('Pack A: MINIMAL_REPAIR_NOT_PROVABLE');
  console.log('  Expected 3 deletions of single commas from ,, pairs');
  console.log('  Got: ' + aDeletions + ' deletions, ' + aInsertions + ' insertions, ' + aSubstitutions + ' substitutions');
}

if (cDiffs.length === 44 && crToComma.length === 44 && otherChanges.length === 0) {
  console.log('Pack C: EXACT_MINIMAL_REPAIR_VERIFIED');
} else if (otherChanges.length > 0) {
  console.log('Pack C: UNAUTHORIZED_ADDITIONAL_CHANGE_DETECTED');
} else {
  console.log('Pack C: MINIMAL_REPAIR_NOT_PROVABLE');
}
