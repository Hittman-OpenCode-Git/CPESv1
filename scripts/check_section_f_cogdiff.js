const fs = require('fs');
var s = fs.readFileSync('content/packs/pack_e_corrected.js', 'utf8');
var arr = new Function(s + '\nreturn MCQ_BANK_E;')();
var cnt = 0;
arr.forEach(function(q) { if (q.Section === 'F') cnt++; });
console.log('Section F items in pack_e: ' + cnt);
arr.forEach(function(q) {
  if (q.Section === 'F' && q.CognitiveLevel && q.Difficulty) {
    if (q.Difficulty === 'Easy' && (q.CognitiveLevel.indexOf('Analyze') >= 0 || q.CognitiveLevel.indexOf('Evaluate') >= 0)) {
      console.log(q.QuestionID + ' | ' + q.Difficulty + '/' + q.DifficultyScore + ' | ' + q.CognitiveLevel + ' (COG-DIFF)');
    }
  }
});
