const fs = require('fs');
const path = require('path');

var fixes = [
  { qid: 'P1B-A-161', pack: 'pack_b', choice: 'C', term: 'never', replacement: 'rarely' },
  { qid: 'P1E-E-124', pack: 'pack_e', choice: 'D', term: 'always', replacement: 'typically' },
];

fixes.forEach(function(f) {
  var bank = f.pack.replace('pack_', '').toUpperCase();
  var bankFile = path.join('content/packs', 'pack_' + bank.toLowerCase() + '_corrected.js');
  var src = fs.readFileSync(bankFile, 'utf8');
  var arr = new Function(src + '\nreturn MCQ_BANK_' + bank + ';')();
  var item = arr.find(q => q.QuestionID === f.qid);
  if (!item) { console.log('NOT FOUND: ' + f.qid); return; }
  
  var cc = String(item.CorrectChoice || '').toUpperCase();
  console.log(f.qid + ' CC=' + cc + ' Choice ' + f.choice + ' (distractor — safe to reword)');
  console.log('  Before: ' + item.Choices[f.choice]);
  
  var re = new RegExp('\\b' + f.term + '\\b', 'gi');
  item.Choices[f.choice] = String(item.Choices[f.choice]).replace(re, f.replacement);
  console.log('  After: ' + item.Choices[f.choice]);
  
  // Re-serialize
  var jsonOut = JSON.stringify(arr, null, 2);
  jsonOut = jsonOut.replace(/\\u2014/g, '\u2014').replace(/\\u2013/g, '\u2013')
    .replace(/\\u201c/g, '\u201c').replace(/\\u201d/g, '\u201d')
    .replace(/\\u2026/g, '\u2026').replace(/\\u00a0/g, '\u00a0')
    .replace(/\\u2018/g, '\u2018').replace(/\\u2019/g, '\u2019');
  var newSrc = 'var MCQ_BANK_' + bank.toUpperCase() + ' = ' + jsonOut + ';';
  
  // Verify QID count
  var origCount = (src.match(/"QuestionID"/g) || []).length;
  var newCount = (newSrc.match(/"QuestionID"/g) || []).length;
  console.log('  QID count: ' + origCount + ' -> ' + newCount + ' ' + (origCount === newCount ? 'OK' : 'MISMATCH!'));
  
  if (origCount === newCount) {
    // Verify no remaining absolutes
    var reparsed = new Function(newSrc + '\nreturn MCQ_BANK_' + bank + ';')();
    var remaining = 0;
    reparsed.forEach(function(q) {
      if (!q.Choices) return;
      var cc2 = String(q.CorrectChoice || '').toUpperCase();
      ['A','B','C','D'].forEach(function(L) {
        if (L !== cc2 && q.Choices[L]) {
          var v = String(q.Choices[L]).toLowerCase();
          if (/\b(always|never|impossible)\b/.test(v) && q.QuestionID !== 'P1B-E-150') remaining++;
        }
      });
    });
    console.log('  Remaining distractor absolutes (excluding P1B-E-150 keep): ' + remaining);
    if (remaining === 0) {
      fs.writeFileSync(bankFile, newSrc);
      console.log('  WROTE ' + bankFile);
    } else {
      console.log('  SKIP WRITE — remaining absolutes found');
    }
  }
});
