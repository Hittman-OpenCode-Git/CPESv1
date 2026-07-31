const fs = require('fs');
const src = fs.readFileSync('pack_d_corrected.js', 'utf8');
const match = src.match(/const\s+\w+\s*=\s*\[([\s\S]*)\];\s*\n/);
const fn = new Function('return [' + match[1] + ']');
const items = fn();
const qids = ['P1-BD-001','P1-BD-014','P1-BD-039','P1-BD-057','P1-BD-084'];

console.log('=== SESSION 071 — 5-Item DL-008/DL-026 Audit ===\n');

let clean = 0;
qids.forEach(qid => {
  const q = items.find(i => i.QuestionID === qid);
  const cc = q.CorrectChoice;
  const ewCC = q['ExplanationWrong' + cc];
  const dl008 = (ewCC === '' || ewCC === undefined) ? 'CLEAN' : 'DL-008';
  let emptyNonCC = [];
  for (const l of ['A','B','C','D']) {
    if (l !== cc && (!q['ExplanationWrong' + l] || q['ExplanationWrong' + l] === '')) {
      emptyNonCC.push(l);
    }
  }
  const dl026 = emptyNonCC.length === 0 ? 'CLEAN' : 'DL-026:' + emptyNonCC.join(',');
  const allClean = (dl008 === 'CLEAN' && dl026 === 'CLEAN');
  if (allClean) clean++;
  console.log(qid + ': CC=' + cc + ' CL=' + q.CognitiveLevel + ' ' + dl008 + ' ' + dl026 + ' EC=' + (q.ExplanationCorrect||'').length + 'chars');
});

console.log('\n' + clean + '/5 CLEAN');
console.log('Governance: ' + (clean === 5 ? 'PASS' : 'FAIL'));
