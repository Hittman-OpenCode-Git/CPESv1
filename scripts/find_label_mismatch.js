const fs = require('fs');
for (const b of ['a','b','c','d','e']) {
  const s = fs.readFileSync('content/packs/pack_' + b + '_corrected.js', 'utf8');
  const arr = new Function(s + '\nreturn MCQ_BANK_' + b.toUpperCase() + ';')();
  arr.forEach(function(q) {
    if (q.QuestionID === 'P1-EC-011' || q.QuestionID === 'P1-ED-002') {
      console.log(q.QuestionID + ' (pack_' + b + ')');
      console.log('  Difficulty: ' + q.Difficulty);
      console.log('  DifficultyScore: ' + q.DifficultyScore);
      console.log('  CognitiveLevel: ' + q.CognitiveLevel);
      console.log('  Section: ' + q.Section);
      console.log('  question_state: ' + q.question_state);
    }
  });
}
