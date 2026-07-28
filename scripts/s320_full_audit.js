const fs = require('fs');

// Wave 1B (Pack D, 3) + Wave 2 (14) + Wave 3 (10) - all 27 remaining seeds
const remaining = {
  pack_c: ['P1-EC-004','P1-EC-008','P1-EC-014','P1-EC-020','P1-EC-022','P1-EC-023','P1-EC-031','P1-EC-066'],
  pack_d: ['P1-ED-001','P1-ED-010','P1-ED-014','P1-ED-016','P1-ED-025','P1-ED-028','P1-ED-035','P1-ED-036','P1-ED-042','P1-ED-046','P1-ED-051','P1-ED-058','P1-ED-064','P1-ED-066','P1-ED-071','P1-ED-072','P1-ED-073','P1-ED-074','P1-ED-075']
};

for (const [file, qids] of Object.entries(remaining)) {
  const fname = file + '_corrected.js';
  const pack = fs.readFileSync(fname, 'utf8');
  console.log(`\n=== ${fname} ===`);
  let totalEmpty = 0, totalFilled = 0, hasCOSO = 0, totalItems = 0;
  
  for (const qid of qids) {
    const idx = pack.indexOf(qid);
    if (idx === -1) { console.log(`  ${qid}: NOT FOUND`); continue; }
    totalItems++;
    let start = idx, depth = 0;
    while (start > 0) { if (pack[start] === '}') depth++; if (pack[start] === '{') { if (depth === 0) break; depth--; } start--; }
    let end = idx; depth = 0;
    while (end < pack.length) { if (pack[end] === '{') depth++; if (pack[end] === '}') { depth--; if (depth === 0) break; } end++; }
    const raw = pack.substring(start, end + 1);
    
    const getStr = (key) => { const re = new RegExp('"' + key + '"\\s*:\\s*"([^"]*)"'); const m = raw.match(re); return m ? m[1] : null; };
    const cc = getStr('CorrectChoice');
    const ec = getStr('ExplanationCorrect');
    const ewA = getStr('ExplanationWrongA'), ewB = getStr('ExplanationWrongB'), ewC = getStr('ExplanationWrongC'), ewD = getStr('ExplanationWrongD');
    const ewMap = {A: ewA, B: ewB, C: ewC, D: ewD};
    
    let empty = 0, total = 0;
    for (const l of ['A','B','C','D']) {
      if (l === cc) continue;
      total++;
      const ew = ewMap[l];
      if (!ew || ew.length < 30) empty++;
    }
    totalEmpty += empty; totalFilled += (total - empty);
    if ((ec || '').includes('COSO')) hasCOSO++;
    
    const emptySlots = [];
    for (const l of ['A','B','C','D']) {
      if (l === cc) continue;
      const ew = ewMap[l];
      if (!ew || ew.length < 30) emptySlots.push(l + '(' + (ew ? ew.length : 'null') + ')');
    }
    
    const ecLen = (ec || '').length || 0;
    const status = empty === 0 ? 'READY' : ('NEEDS_' + empty);
    console.log(`  ${qid} CC=${cc} EC=${ecLen}c COSO=${(ec||'').includes('COSO')} Empty=${empty} Slots=${emptySlots.join(';')||'none'} => ${status}`);
  }
  
  console.log(`  TOTALS: ${totalItems} items, ${totalEmpty} empty EW, ${totalFilled} filled EW, ${hasCOSO}/${totalItems} have COSO`);
}
