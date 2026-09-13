const fs = require('fs');
const src = fs.readFileSync('content/packs/pack_c_corrected.js', 'utf8');
const arr = new Function(src + '\nreturn MCQ_BANK_C;')();
for (let n = 101; n <= 130; n++) {
  const qid = 'P1-DC-' + n;
  const it = arr.find((o) => o.QuestionID === qid);
  if (!it) { console.log(qid + ' MISSING'); continue; }
  const pair = it.DifficultyScore === 4 ? 'Analyze' : it.DifficultyScore === 5 ? 'Evaluate' : '?';
  const flag = it.CognitiveLevel !== pair ? '  <-- MISMATCH' : '';
  console.log(qid + ' DS=' + it.DifficultyScore + ' CL=' + it.CognitiveLevel + flag);
}
