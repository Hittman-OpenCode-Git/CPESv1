const fs = require('fs');

// Verify DL-003 rewrites in pack_a
const src = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');
const arr = new Function(src + '\nreturn MCQ_BANK_A;')();

// Check the 7 items that should have been rewritten
const targetQids = ['P1-A-086', 'P1-A-089', 'P1-A-091', 'P1-A-094', 'P1-A-097', 'P1-A-098', 'P1-A-101', 'P1E-C-056', 'P1E-C-061'];

var remainingDL003 = 0;
arr.forEach(q => {
  if (!q.Choices) return;
  var cc = String(q.CorrectChoice || '').toUpperCase();
  ['A','B','C','D'].forEach(L => {
    if (L === cc) return;
    if (q.Choices[L]) {
      var val = String(q.Choices[L]).toLowerCase();
      if (/\b(always|never|impossible)\b/.test(val)) {
        remainingDL003++;
        console.log('STILL HAS: ' + q.QuestionID + ' Choice ' + L + ': ' + q.Choices[L].substring(0, 80));
      }
      if (/\ball of the above\b/.test(val) || /\bnone of the above\b/.test(val)) {
        remainingDL003++;
        console.log('STILL HAS (all/none): ' + q.QuestionID + ' Choice ' + L + ': ' + q.Choices[L].substring(0, 80));
      }
    }
  });
});

console.log('\nRemaining distractor absolutes in pack_a: ' + remainingDL003);

// Verify specific items
targetQids.forEach(qid => {
  var item = arr.find(q => q.QuestionID === qid);
  if (item) {
    var hasAbsolute = false;
    ['A','B','C','D'].forEach(L => { if (L !== String(item.CorrectChoice||'').toUpperCase() && item.Choices && item.Choices[L]) { var v = String(item.Choices[L]).toLowerCase(); if (/\b(always|never|impossible|all of the above|none of the above)\b/.test(v)) hasAbsolute = true; } });
    console.log(qid + ': ' + (hasAbsolute ? 'STILL HAS ABSOLUTE' : 'clean ✓'));
  }
});

// Also count total QIDs
console.log('\nTotal QIDs in pack_a: ' + arr.length);
