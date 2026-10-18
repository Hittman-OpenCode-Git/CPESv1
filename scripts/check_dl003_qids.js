var fs = require('fs');
var src = fs.readFileSync('content/packs/pack_c_corrected.js', 'utf8');

// Find the MCQ_BANK_C declaration and parse it
var arr;
try {
  arr = eval(src.replace(/^const\s+MCQ_BANK_C\s*=\s*/, '').replace(/;\s*$/, ''));
} catch(e) {
  // If eval fails, use Function constructor
  arr = new Function(src + '\nreturn MCQ_BANK_C;')();
}

// Find P1-FC-056
var q = arr.find(function(x) { return x.QuestionID === 'P1-FC-056'; });
if (q) {
  console.log('QID: ' + q.QuestionID);
  console.log('CorrectChoice: ' + q.CorrectChoice);
  console.log('question_state: ' + q.question_state);
  console.log('');
  ['A','B','C','D'].forEach(function(L) {
    var isCC = L === String(q.CorrectChoice).toUpperCase();
    console.log('Choice ' + L + ' (CC=' + isCC + '): ' + (q.Choices[L] || '').substring(0, 120));
  });
} else {
  console.log('NOT FOUND');
}

// Also check all the DL-003 QIDs from the user's claim
console.log('\n=== Checking all 16 DL-003 QIDs from user claim ===');
var qidsToCheck = ['P1-F-006','P1-F-027','P1-B-103','P1-FC-012','P1-FD-016','P1-B-099','P1-B-148','P1-CD-119','P1-FC-056','P1-FC-057','P1-FC-058','P1-FD-007','P1-FD-017','P1B-F-138','P1B-F-148','P1B-E-150'];

var allPacks = {
  a: arr,
  b: new Function(fs.readFileSync('content/packs/pack_b_corrected.js','utf8') + '\nreturn MCQ_BANK_B;')(),
  c: arr,
  d: new Function(fs.readFileSync('content/packs/pack_d_corrected.js','utf8') + '\nreturn MCQ_BANK_D;')(),
  e: new Function(fs.readFileSync('content/packs/pack_e_corrected.js','utf8') + '\nreturn MCQ_BANK_E;')()
};

var found = [];
var notFound = [];
qidsToCheck.forEach(function(qid) {
  // Determine pack from QID prefix
  var pack = null;
  if (qid.startsWith('P1-F') || qid.startsWith('P1-FD') || qid.startsWith('P1-FC')) pack = 'd'; // Section F
  else if (qid.startsWith('P1-CD')) pack = 'c'; // Section C
  else if (qid.startsWith('P1-B')) pack = 'b'; // Section B
  else pack = 'a'; // Section A
  
  var a = allPacks[pack];
  if (!a) { notFound.push(qid); return; }
  var foundQ = a.find(function(x) { return x.QuestionID === qid; });
  if (foundQ) {
    found.push(qid);
    var cc = String(foundQ.CorrectChoice).toUpperCase();
    var hasAbs = false;
    ['A','B','C','D'].forEach(function(L) {
      if (L === cc) return;
      if (foundQ.Choices[L] && /\b(always|never|impossible)\b/i.test(String(foundQ.Choices[L]))) {
        hasAbs = true;
        console.log('  ' + qid + ' (pack ' + pack + '): Choice ' + L + ' has absolute. CC=' + cc + ' STATE=' + foundQ.question_state);
      }
    });
    if (!hasAbs) console.log('  ' + qid + ' (pack ' + pack + '): NO absolute in distractors. CC=' + cc + ' STATE=' + foundQ.question_state);
  } else {
    // Try all packs
    var foundInAny = false;
    ['a','b','c','d','e'].forEach(function(p) {
      if (!allPacks[p]) return;
      var fq = allPacks[p].find(function(x) { return x.QuestionID === qid; });
      if (fq) {
        foundInAny = true;
        var ccc = String(fq.CorrectChoice).toUpperCase();
        if (qid !== 'P1B-E-150') console.log('  ' + qid + ' (pack ' + p + '): FOUND. CC=' + ccc + ' STATE=' + fq.question_state);
      }
    });
    if (!foundInAny) notFound.push(qid);
  }
});

console.log('\n--- Summary ---');
console.log('Found: ' + found.length);
console.log('Not found: ' + notFound.length + ' ' + notFound.join(', '));
