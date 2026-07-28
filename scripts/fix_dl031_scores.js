const fs = require('fs');
const path = require('path');
const BASE = path.resolve(__dirname, '..');

const fixes = {
  'pack_b_corrected.js': ['P1B-F-116'],
  'pack_c_corrected.js': ['P1-DC-065', 'P1-FC-004'],
  'pack_d_corrected.js': ['P1-FD-065'],
};

let total = 0;
for (const [pf, qids] of Object.entries(fixes)) {
  let content = fs.readFileSync(path.join(BASE, pf), 'utf8');
  let applied = 0;
  for (const qid of qids) {
    const qidIdx = content.indexOf('"QuestionID": "' + qid + '"');
    if (qidIdx === -1) { console.log(qid + ': QID not found'); continue; }
    
    const afterQid = content.substring(qidIdx, qidIdx + 5000);
    const scoreMatch = afterQid.match(/"DifficultyScore":\s*(\d+)/);
    if (!scoreMatch || parseInt(scoreMatch[1]) < 3) {
      console.log(qid + ': DifficultyScore >=3 not found after QID (got: ' + (scoreMatch ? scoreMatch[1] : 'null') + ')');
      continue;
    }
    
    const fullMatch = afterQid.match(/"DifficultyScore":\s*\d+/);
    const scorePos = qidIdx + afterQid.indexOf(fullMatch[0]);
    
    content = content.substring(0, scorePos) + '"DifficultyScore": 1' +
      content.substring(scorePos + fullMatch[0].length);
    applied++;
    total++;
    console.log(qid + ': Score ' + scoreMatch[1] + ' -> 1 FIXED');
  }
  if (applied > 0) fs.writeFileSync(path.join(BASE, pf), content);
}
console.log('Total fixed: ' + total);
