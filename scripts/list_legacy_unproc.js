const fs = require('fs');
for (const [p, f] of [['C', 'content/packs/pack_c_corrected.js'], ['D', 'content/packs/pack_d_corrected.js']]) {
  const src = fs.readFileSync(f, 'utf8');
  const varName = 'MCQ_BANK_' + p;
  const arr = new Function(src + '\nreturn ' + varName + ';')();
  console.log('Pack ' + p + ':');
  for (const it of arr) {
    if (it.question_state === 'Unprocessed') {
      console.log(`  ${it.QuestionID} Sec=${it.Section} CC=${it.CorrectChoice} DS=${it.DifficultyScore} CL=${it.CognitiveLevel}`);
    }
  }
}