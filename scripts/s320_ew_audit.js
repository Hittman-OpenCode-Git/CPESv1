const fs = require('fs');
const pack = fs.readFileSync('pack_c_corrected.js', 'utf8');
const qids = ['P1-EC-021','P1-EC-024','P1-EC-025','P1-EC-028','P1-EC-040','P1-EC-041','P1-EC-049','P1-EC-052','P1-EC-060','P1-EC-061','P1-EC-072'];

for (const qid of qids) {
  const idx = pack.indexOf(qid);
  if (idx === -1) { console.log(qid + ': NOT FOUND'); continue; }
  let start = idx, depth = 0;
  while (start > 0) { if (pack[start] === '}') depth++; if (pack[start] === '{') { if (depth === 0) break; depth--; } start--; }
  let end = idx; depth = 0;
  while (end < pack.length) { if (pack[end] === '{') depth++; if (pack[end] === '}') { depth--; if (depth === 0) break; } end++; }
  const raw = pack.substring(start, end + 1);
  
  const getStr = (key) => { 
    const re = new RegExp('"' + key + '"\\s*:\\s*"([^"]*)"'); 
    const m = raw.match(re); 
    return m ? m[1] : null; 
  };
  const cc = getStr('CorrectChoice');
  const ec = getStr('ExplanationCorrect');
  const ewa = getStr('ExplanationWrongA');
  const ewb = getStr('ExplanationWrongB');
  const ewc = getStr('ExplanationWrongC');
  const ewd = getStr('ExplanationWrongD');
  const coso = getStr('COSO');
  const ewMap = {A: ewa, B: ewb, C: ewc, D: ewd};
  
  const emptyNonCC = [];
  const filledNonCC = [];
  for (const l of ['A','B','C','D']) {
    if (l === cc) continue;
    const ew = ewMap[l];
    if (!ew || ew.length < 30) {
      emptyNonCC.push(l + '(' + (ew ? ew.length : 'null') + ')');
    } else {
      filledNonCC.push(l + '(' + ew.length + ')');
    }
  }
  
  const ewCC = ewMap[cc];
  const dl008 = ewCC && ewCC.length > 0 ? 'DL-008!' : 'OK';
  const hasCOSO = (ec || '').includes('COSO');
  const ecLen = (ec || '').length || 0;
  const status = emptyNonCC.length === 0 ? 'ALL_FILLED' : 'NEEDS_' + emptyNonCC.length;
  
  console.log(qid + ' | CC=' + cc + ' | EC=' + ecLen + 'c | COSO=' + hasCOSO + ' | DL-008=' + dl008 + ' | Empty=' + (emptyNonCC.join(',') || 'NONE') + ' | Filled=' + filledNonCC.join(',') + ' | ' + status);
}
