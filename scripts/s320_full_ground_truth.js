const fs = require('fs');

const allSeeds = {
  pack_c: ['P1-EC-004','P1-EC-008','P1-EC-014','P1-EC-020','P1-EC-021','P1-EC-022','P1-EC-023','P1-EC-024','P1-EC-025','P1-EC-028','P1-EC-031','P1-EC-040','P1-EC-041','P1-EC-049','P1-EC-052','P1-EC-060','P1-EC-061','P1-EC-066','P1-EC-072'],
  pack_d: ['P1-ED-001','P1-ED-010','P1-ED-014','P1-ED-016','P1-ED-025','P1-ED-028','P1-ED-035','P1-ED-036','P1-ED-042','P1-ED-046','P1-ED-051','P1-ED-058','P1-ED-064','P1-ED-066','P1-ED-071','P1-ED-072','P1-ED-073','P1-ED-074','P1-ED-075']
};

for (const [file, qids] of Object.entries(allSeeds)) {
  const pack = fs.readFileSync(file + '_corrected.js', 'utf8');
  let totalEmpty = 0;
  
  for (const qid of qids) {
    let idx = pack.indexOf('"QuestionID": "' + qid + '"');
    if (idx === -1) { console.log(`${file}: ${qid} NOT FOUND`); continue; }
    
    const after = pack.substring(idx, Math.min(idx + 6000, pack.length));
    const ccM = after.match(/"CorrectChoice":\s*"([^"]*)"/);
    const stateM = after.match(/"question_state":\s*"([^"]*)"/);
    const ecM = after.match(/"ExplanationCorrect":\s*"([^"]*)"/);
    
    const cc = ccM ? ccM[1] : '?';
    const state = stateM ? stateM[1] : '?';
    const ecLen = ecM ? ecM[1].length : 0;
    const hasCOSO = ecM && (ecM[1].includes('COSO') || ecM[1].includes('Principle'));
    
    const ewLetters = ['A','B','C','D'];
    const empty = [], filled = [];
    for (const l of ewLetters) {
      const re = new RegExp('"ExplanationWrong' + l + '":\\s*"([^"]*)"');
      const m = after.match(re);
      if (l === cc) continue;
      if (!m || m[1].length < 30) empty.push(l + '(0)');
      else filled.push(l + '(' + m[1].length + ')');
    }
    totalEmpty += empty.length;
    
    if (empty.length > 0 || !hasCOSO || ecLen < 350) {
      const flags = [];
      if (empty.length > 0) flags.push('EW:' + empty.join(','));
      if (!hasCOSO) flags.push('NO_COSO');
      if (ecLen < 350) flags.push('EC:' + ecLen + 'c');
      console.log(`${qid.padEnd(14)} CC=${cc} ${state.padEnd(12)} ${flags.join(' | ')}`);
    }
  }
}
