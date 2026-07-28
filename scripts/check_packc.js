const fs = require('fs');
const pack = fs.readFileSync('pack_c_corrected.js', 'utf8');

// Brace-aware extraction
const items = [];
let i = 0;
while (i < pack.length) {
  if (pack[i] === '{' && (i === 0 || pack[i-1] !== '"')) {
    let depth = 1, j = i + 1;
    while (j < pack.length && depth > 0) { if (pack[j] === '{') depth++; if (pack[j] === '}') depth--; j++; }
    const raw = pack.substring(i, j);
    if (raw.includes('"QuestionID"') && raw.includes('"question_state"')) {
      items.push({ raw, start: i, end: j });
    }
    i = j;
  } else i++;
}

// Check all Unprocessed seeds
const seeds = ['P1-EC-004','P1-EC-008','P1-EC-014','P1-EC-020','P1-EC-021','P1-EC-022',
  'P1-EC-023','P1-EC-024','P1-EC-025','P1-EC-028','P1-EC-031','P1-EC-040','P1-EC-041',
  'P1-EC-049','P1-EC-052','P1-EC-060','P1-EC-061','P1-EC-066','P1-EC-072'];

let totalEmpty = 0;

for (const qid of seeds) {
  for (const item of items) {
    if (!item.raw.includes(qid)) continue;
    const stateM = item.raw.match(/"question_state":\s*"([^"]+)"/);
    if (!stateM || stateM[1] !== 'Unprocessed') continue;
    
    const ccM = item.raw.match(/"CorrectChoice":\s*"([^"]+)"/);
    const cc = ccM ? ccM[1] : '?';
    
    const empty = [];
    for (const l of ['A','B','C','D']) {
      if (l === cc) continue;
      const re = new RegExp('"ExplanationWrong' + l + '":\\s*"([^"]*)"');
      const m = item.raw.match(re);
      if (!m || m[1].length < 30) empty.push(l);
    }
    if (empty.length > 0) {
      totalEmpty += empty.length;
      console.log(`${qid}: CC=${cc} Empty=${empty.join(',')}`);
    }
    break;
  }
}

console.log(`\nTotal empty slots: ${totalEmpty}`);

// Also check what COSO state looks like
console.log('\n--- COSO Status ---');
for (const qid of seeds) {
  for (const item of items) {
    if (!item.raw.includes(qid)) continue;
    const stateM = item.raw.match(/"question_state":\s*"([^"]+)"/);
    if (!stateM || stateM[1] !== 'Unprocessed') continue;
    const ecM = item.raw.match(/"ExplanationCorrect":\s*"([^"]+)"/);
    const hasCOSO = ecM && (ecM[1].includes('COSO') || ecM[1].includes('Principle'));
    const ecLen = ecM ? ecM[1].length : 0;
    if (!hasCOSO) console.log(`${qid}: NO COSO (EC=${ecLen}c)`);
    break;
  }
}
