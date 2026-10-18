var fs = require('fs');

var PACKS = {
  a: 'pack_a_corrected.js',
  b: 'pack_b_corrected.js',
  c: 'pack_c_corrected.js',
  d: 'pack_d_corrected.js',
  e: 'pack_e_corrected.js'
};

var DOC_KEE = { 'P1B-E-150': true };

var findings = [];

Object.keys(PACKS).forEach(function(key) {
  var src = fs.readFileSync(PACKS[key], 'utf8');
  var arr = new Function(src + '\nreturn MCQ_BANK_' + key.toUpperCase() + ';')();
  arr.forEach(function(q) {
    if (!q.Choices || !q.QuestionID) return;
    var cc = String(q.CorrectChoice || '').toUpperCase();
    ['A','B','C','D'].forEach(function(L) {
      if (L === cc) return;
      var text = q.Choices[L];
      if (!text) return;
      if (/\b(always|never|impossible)\b/i.test(String(text))) {
        findings.push({
          qid: q.QuestionID,
          pack: key,
          choice: L,
          correctChoice: cc,
          choiceText: text,
          isDocKeep: !!DOC_KEE[q.QuestionID]
        });
      }
    });
  });
});

console.log('=== DL-003 Word-Boundary Scan ===\n');
console.log('Total findings: ' + findings.length);
console.log('Actionable (not documented keep): ' + findings.filter(f=>!f.isDocKeep).length);
console.log('');

var actionable = findings.filter(f => !f.isDocKeep);
actionable.forEach(function(f) {
  console.log('[' + f.pack + '] ' + f.qid + ' — Choice ' + f.choice + ' (CC=' + f.correctChoice + ')');
  console.log('  TEXT: ' + f.choiceText);
  console.log('');
});

if (actionable.length === 0) {
  console.log('*** ZERO actionable DL-003 remaining ***');
}

// Also scan for DL-043 "all of the above" / "none of the above" in distractors
console.log('\n=== DL-043 Scan ===\n');
var dl043 = [];
Object.keys(PACKS).forEach(function(key) {
  var src = fs.readFileSync(PACKS[key], 'utf8');
  var arr = new Function(src + '\nreturn MCQ_BANK_' + key.toUpperCase() + ';')();
  arr.forEach(function(q) {
    if (!q.Choices || !q.QuestionID) return;
    var cc = String(q.CorrectChoice || '').toUpperCase();
    ['A','B','C','D'].forEach(function(L) {
      if (L === cc) return;
      var text = q.Choices[L];
      if (!text) return;
      if (/\b(all of the above|none of the above)\b/i.test(String(text))) {
        dl043.push({ qid: q.QuestionID, pack: key, choice: L });
      }
    });
  });
});
console.log('DL-043 distractor hits: ' + dl043.length);
dl043.forEach(function(f) { console.log('  ' + f.qid + ' (' + f.pack + ') Choice ' + f.choice); });

fs.writeFileSync('dl003_fresh_scan.json', JSON.stringify(findings, null, 2));
console.log('\nResults saved to dl003_fresh_scan.json');
