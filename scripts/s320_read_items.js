const fs = require('fs');
const pack = fs.readFileSync('pack_d_corrected.js', 'utf8');
const qids = ['P1-ED-028','P1-ED-042','P1-ED-046','P1-ED-051','P1-ED-058','P1-ED-064','P1-ED-066'];

for (const qid of qids) {
  const idx = pack.indexOf(qid);
  let start = idx, depth = 0;
  while (start > 0) { if (pack[start] === '}') depth++; if (pack[start] === '{') { if (depth === 0) break; depth--; } start--; }
  let end = idx; depth = 0;
  while (end < pack.length) { if (pack[end] === '{') depth++; if (pack[end] === '}') { depth--; if (depth === 0) break; } end++; }
  const raw = pack.substring(start, end + 1);
  
  const getStr = (key) => { const re = new RegExp('"' + key + '"\\s*:\\s*"([^"]*)"'); const m = raw.match(re); return m ? m[1] : null; };
  
  console.log(`=== ${qid} ===`);
  console.log('Topic:', getStr('Topic'));
  console.log('Stem:', (getStr('Stem') || '').substring(0, 300));
  console.log('CC:', getStr('CorrectChoice'));
  console.log('ChoiceA:', (getStr('ChoiceAText') || '').substring(0, 200));
  console.log('ChoiceB:', (getStr('ChoiceBText') || '').substring(0, 200));
  console.log('ChoiceC:', (getStr('ChoiceCText') || '').substring(0, 200));
  console.log('ChoiceD:', (getStr('ChoiceDText') || '').substring(0, 200));
  console.log('EC:', (getStr('ExplanationCorrect') || '').substring(0, 300));
  console.log('EW_A:', (getStr('ExplanationWrongA') || '""').substring(0, 80));
  console.log('EW_B:', (getStr('ExplanationWrongB') || '""').substring(0, 80));
  console.log('EW_C:', (getStr('ExplanationWrongC') || '""').substring(0, 80));
  console.log('EW_D:', (getStr('ExplanationWrongD') || '""').substring(0, 80));
  console.log('');
}
