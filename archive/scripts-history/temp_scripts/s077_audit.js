const fs = require('fs');
const src = fs.readFileSync('pack_a_corrected.js', 'utf8');
const qids = ['P1-B-001','P1-B-003','P1-B-004','P1-B-007','P1-B-008','P1-B-009','P1-B-010','P1-B-011','P1-B-013','P1-B-016','P1-B-022','P1-B-030','P1-B-036','P1-B-039','P1-B-070'];

for (const qid of qids) {
  const idx = src.indexOf('"QuestionID": "' + qid + '"');
  if (idx === -1) { console.log(qid + ': NOT FOUND'); continue; }
  const block = src.substring(Math.max(0, idx - 500), Math.min(src.length, idx + 4000));
  
  const getField = (name) => {
    const re = new RegExp('"' + name + '": "([^"]*)"');
    const m = block.match(re);
    if (!m) {
      const re2 = new RegExp('"' + name + '": (\\d+)');
      const m2 = block.match(re2);
      return m2 ? m2[1] : '?';
    }
    return m[1];
  };
  
  const section = getField('Section');
  const cl = getField('CognitiveLevel');
  const diff = getField('Difficulty');
  const ds = getField('DifficultyScore');
  const qs = getField('question_state');
  const topic = getField('Topic');
  const cc = getField('CorrectChoice');
  const stem = getField('Stem');
  
  // Extract ExplanationWrong CC check
  const ewField = 'ExplanationWrong' + cc;
  const ewRe = new RegExp('"' + ewField + '": "(.*?)"');
  const ewM = block.match(ewRe);
  const ewCC = ewM ? ewM[1] : 'ABSENT';
  
  console.log(qid + ' | Sec:' + section + ' | CL:' + cl + ' | Diff:' + diff + '/' + ds + ' | CC:' + cc + ' | State:' + qs);
  console.log('  Topic: ' + (topic ? topic : '?'));
  console.log('  EW[' + cc + ']: ' + (ewCC === '' ? 'EMPTY (OK)' : (ewCC === 'ABSENT' ? 'ABSENT' : 'NON-EMPTY=' + ewCC.substring(0,60))));
  if (stem) console.log('  Stem: ' + stem.substring(0, 150));
}
