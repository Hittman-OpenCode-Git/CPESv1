const fs = require('fs');
for (const b of ['a','b','c','d','e']) {
  const s = fs.readFileSync('content/packs/pack_' + b + '_corrected.js', 'utf8');
  const arr = new Function(s + '\nreturn MCQ_BANK_' + b.toUpperCase() + ';')();
  arr.forEach(function(q) {
    if (q.Section === 'F' && q.CognitiveLevel && q.Difficulty) {
      if (q.Difficulty === 'Easy' &&
          (q.CognitiveLevel.indexOf('Analyze') >= 0 || q.CognitiveLevel.indexOf('Evaluate') >= 0)) {
        console.log(q.QuestionID + ' (pack_' + b + ') | Diff=' + q.Difficulty + '/DS=' + q.DifficultyScore + ' | Cog=' + q.CognitiveLevel + ' | state=' + q.question_state);
      }
    }
  });
}
