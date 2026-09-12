const fs = require('fs');
for (const [p, f] of [['C', 'content/packs/pack_c_corrected.js'], ['D', 'content/packs/pack_d_corrected.js']]) {
  const src = fs.readFileSync(f, 'utf8');
  const arr = new Function(src + '\nreturn MCQ_BANK_' + p + ';')();
  console.log('Pack ' + p + ':');
  for (const it of arr) {
    if (it.question_state !== 'Certified') {
      console.log(`  ${it.QuestionID} state=${JSON.stringify(it.question_state)} Sec=${it.Section} CC=${it.CorrectChoice} DS=${it.DifficultyScore} CL=${it.CognitiveLevel}`);
    }
  }
}