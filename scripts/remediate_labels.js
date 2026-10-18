/*
 * Phase 3: Label/Score Metadata Mismatch Fixes
 * Align Difficulty label to DifficultyScore; fix Cog/DS mismatches
 * Items: P1-EC-011, P1-ED-002 (DS=4, Easy→Difficult)
 *        P1-FC-016, P1-FD-010 (DS=4, Easy→Difficult)
 *        P1-FC-050 (DS=5, Easy→Very Difficult)
 *        P1-F-013 (DS=1, Cog=Analyze→Apply, DS=1 floor)
 * 
 * DifficultyScore mapping: 1=Easy, 2=Moderate-Easy, 3=Moderate, 4=Difficult, 5=Very Difficult
 * Rule-5 compliant: pack_a(1), pack_c(3), pack_d(2) — all ≤30
 */
const fs = require('fs');
const path = require('path');

const fixes = {
  'P1-EC-011': { pack: 'pack_c', bank: 'C', newDiff: 'Difficult' },
  'P1-ED-002': { pack: 'pack_d', bank: 'D', newDiff: 'Difficult' },
  'P1-F-013': { pack: 'pack_a', bank: 'A', newDiff: null, newCog: 'Apply', note: 'Cog=Analyze with DS=1; lowered Cog to Apply (DS floor: Analyze requires DS≥3, but DS=1 governs)' },
  'P1-FC-016': { pack: 'pack_c', bank: 'C', newDiff: 'Difficult' },
  'P1-FC-050': { pack: 'pack_c', bank: 'C', newDiff: 'Very Difficult' },
  'P1-FD-010': { pack: 'pack_d', bank: 'D', newDiff: 'Difficult' },
};

// Group by pack
const byPack = {};
Object.keys(fixes).forEach(qid => {
  const f = fixes[qid];
  if (!byPack[f.pack]) byPack[f.pack] = [];
  byPack[f.pack].push({ qid, ...f });
});

Object.keys(byPack).sort().forEach(packName => {
  const bank = byPack[packName][0].bank;
  const bankFile = path.join('content/packs', 'pack_' + bank.toLowerCase() + '_corrected.js');
  const src = fs.readFileSync(bankFile, 'utf8');
  const arr = new Function(src + '\nreturn MCQ_BANK_' + bank + ';')();
  
  console.log('\n=== Processing ' + packName + ' (' + byPack[packName].length + ' items) ===');
  
  byPack[packName].forEach(f => {
    const item = arr.find(q => q.QuestionID === f.qid);
    if (!item) { console.log('  NOT FOUND: ' + f.qid); return; }
    
    console.log('  ' + f.qid + ': Diff=' + item.Difficulty + '/DS=' + item.DifficultyScore + '/Cog=' + item.CognitiveLevel + ' → state was ' + item.question_state);
    
    // Quarantine
    if (item.question_state === 'Certified') {
      item.question_state = 'In Audit';
      console.log('    state → In Audit');
    }
    
    // Fix Difficulty label
    if (f.newDiff) {
      item.Difficulty = f.newDiff;
      console.log('    Difficulty: ' + f.newDiff);
    }
    
    // Fix CognitiveLevel
    if (f.newCog) {
      item.CognitiveLevel = f.newCog;
      console.log('    CognitiveLevel: ' + f.newCog + ' — ' + f.note);
    }
    
    // Add provenance stamp
    item.cert_provenance = Object.assign({}, item.cert_provenance, {
      metadata_fix: 'P1-20260915',
      date: '2026-09-15',
      reason: f.note || 'Difficulty label aligned to DifficultyScore per closeout verdict'
    });
  });
  
  // Re-serialize
  let jsonOut = JSON.stringify(arr, null, 2);
  jsonOut = jsonOut.replace(/\\u2014/g, '\u2014').replace(/\\u2013/g, '\u2013')
    .replace(/\\u201c/g, '\u201c').replace(/\\u201d/g, '\u201d')
    .replace(/\\u2026/g, '\u2026').replace(/\\u00a0/g, '\u00a0')
    .replace(/\\u2018/g, '\u2018').replace(/\\u2019/g, '\u2019');
  
  const newSrc = 'var MCQ_BANK_' + bank.toUpperCase() + ' = ' + jsonOut + ';\n';
  
  // Verify QID count
  const origQIDs = (src.match(/"QuestionID"/g) || []).length;
  const newQIDs = (newSrc.match(/"QuestionID"/g) || []).length;
  console.log('  QID count: ' + origQIDs + ' → ' + newQIDs + ' ' + (origQIDs === newQIDs ? 'OK' : 'MISMATCH!'));
  
  if (origQIDs === newQIDs) {
    const reparsed = new Function(newSrc + '\nreturn MCQ_BANK_' + bank + ';')();
    console.log('  Reparse OK: ' + reparsed.length + ' items');
    
    // Verify the specific items were fixed
    byPack[packName].forEach(f => {
      const item2 = reparsed.find(q => q.QuestionID === f.qid);
      if (item2) {
        console.log('    VERIFY: ' + f.qid + ' Diff=' + item2.Difficulty + ' DS=' + item2.DifficultyScore + ' Cog=' + item2.CognitiveLevel + ' state=' + item2.question_state);
      }
    });
    
    fs.writeFileSync(bankFile, newSrc);
    console.log('  WROTE ' + bankFile);
  } else {
    console.error('  MISMATCH — not writing');
    process.exit(1);
  }
});

console.log('\n=== METADATA FIX COMPLETE ===');
console.log('Total items fixed: ' + Object.keys(fixes).length);
console.log('  pack_a: 1 (P1-F-013 Cog)');
console.log('  pack_c: 3 (P1-EC-011, P1-FC-016, P1-FC-050)');
console.log('  pack_d: 2 (P1-ED-002, P1-FD-010)');
