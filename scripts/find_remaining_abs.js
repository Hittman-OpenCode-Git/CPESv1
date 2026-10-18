const fs = require('fs');
for (const b of ['a','b','c','d','e']) {
  const s = fs.readFileSync('content/packs/pack_' + b + '_corrected.js', 'utf8');
  const arr = new Function(s + '\nreturn MCQ_BANK_' + b.toUpperCase() + ';')();
  arr.forEach(q => {
    if (!q.Choices) return;
    var cc = String(q.CorrectChoice || '').toUpperCase();
    ['A','B','C','D'].forEach(function(L) {
      if (L !== cc && q.Choices[L]) {
        var v = String(q.Choices[L]).toLowerCase();
        if (/\b(always|never|impossible)\b/.test(v)) {
          console.log(q.QuestionID + ' (Section ' + q.Section + ') Choice ' + L + ' CC=' + cc + ': ' + q.Choices[L].substring(0, 80));
        }
      }
    });
  });
}
