const fs = require('fs');
const src = fs.readFileSync('pack_d_corrected.js', 'utf8');
const match = src.match(/const\s+\w+\s*=\s*\[([\s\S]*)\];\s*\n/);
if (!match) { console.log('PARSE FAIL'); process.exit(1); }
const fn = new Function('return [' + match[1] + ']');
const items = fn();
const qids = ['P1-BD-001','P1-BD-014','P1-BD-039','P1-BD-057','P1-BD-084'];
qids.forEach(qid => {
  const q = items.find(i => i.QuestionID === qid);
  console.log('=== ' + qid + ' ===');
  console.log('CC:', q.CorrectChoice, 'CL:', q.CognitiveLevel, 'Diff:', q.Difficulty);
  const cc = q.CorrectChoice;
  const ewCC = q['ExplanationWrong' + cc];
  console.log('DL-008 EW[' + cc + ']:', ewCC === '' ? 'CLEAN' : 'VIOLATION');
  let empty = [];
  for (const l of ['A','B','C','D']) {
    if (l !== cc && (!q['ExplanationWrong' + l] || q['ExplanationWrong' + l] === '')) empty.push(l);
  }
  console.log('DL-026:', empty.length === 0 ? 'CLEAN' : 'VIOLATION: ' + empty.join(','));
  console.log('EC:', (q.ExplanationCorrect || '').length, 'chars');
  console.log('Stem:', (q.Stem || '').length, 'chars');
  console.log('');
});
console.log('Total:', items.length, 'items');
