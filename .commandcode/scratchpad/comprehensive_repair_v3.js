// Atomic comprehensive surgical repair of pack_c_corrected.js
// Fixes all S861 contamination patterns in one pass
const fs = require('fs');

const src = fs.readFileSync('pack_c_corrected.js.bak-20260727200252', 'utf8');
console.log('Input: ' + src.length + ' bytes, lines: ' + src.split('\n').length);

let fixed = src;

// P1: Replace "XXXMARKER", with ",  (handles marker removal AND spurious quote fix)
// Raw pattern:  text_value."XXXMARKER",
// Desired:      text_value.",
const p1Count = (fixed.match(/"XXXMARKER",/g) || []).length;
fixed = fixed.replace(/"XXXMARKER",/g, '",');
const p1Remaining = (fixed.match(/XXXMARKER/g) || []).length;
console.log('P1 "XXXMARKER", -> ", : ' + p1Count + ' fixed, ' + p1Remaining + ' remaining XXXMARKER');

// P2: Fix mid-string quote break at specific pattern: ." \u2014 (spurious " before em dash)
// Pattern: "blockchain." \u2014 it is more
// Fix: remove spurious " -> "blockchain \u2014 it is more
const p2Matches = fixed.match(/" \u2014/g);
const p2Count = p2Matches ? p2Matches.length : 0;
fixed = fixed.replace(/" \u2014/g, ' \u2014');
console.log('P2 " \\u2014 mid-string breaks: ' + p2Count + ' fixed');

// P3: Fix 4 missing commas (specific unique patterns)
const commaFixes = [
  {
    old: 'prescribing retention strategies."\n        "question_state": "Certified",',
    new: 'prescribing retention strategies.",\n        "question_state": "Certified",',
    desc: 'EW_D -> question_state'
  },
  {
    old: 'not explaining past outcomes."\n        "ExplanationWrongC": "",',
    new: 'not explaining past outcomes.",\n        "ExplanationWrongC": "",',
    desc: 'EW_B -> EW_C'
  },
  {
    old: 'future churn probability."\n        "ExplanationWrongD": "",',
    new: 'future churn probability.",\n        "ExplanationWrongD": "",',
    desc: 'EW_C -> EW_D'
  },
  {
    old: 'churn in the future."\n        "ExplanationWrongD": "Prescriptive analytics recommends',
    new: 'churn in the future.",\n        "ExplanationWrongD": "Prescriptive analytics recommends',
    desc: 'EW_C -> EW_D (2nd)'
  }
];

let p3Applied = 0;
for (const f of commaFixes) {
  if (fixed.includes(f.old)) {
    fixed = fixed.replace(f.old, f.new);
    p3Applied++;
    console.log('P3 [' + f.desc + ']: APPLIED');
  } else {
    console.log('P3 [' + f.desc + ']: NOT FOUND');
  }
}
console.log('P3 comma fixes: ' + p3Applied + ' applied');

fs.writeFileSync('pack_c_corrected.js', fixed, 'utf8');
console.log('Output: ' + fixed.length + ' bytes');

// Verify: Function constructor
try {
  const fn = new Function(fixed + '; return MCQ_BANK_C;');
  const data = fn();
  const cert = data.filter(x => x && x.question_state === 'Certified').length;
  const ids = data.filter(x => x && x.QuestionID);
  console.log('PARSE OK: ' + ids.length + ' question objects, ' + cert + ' Certified');
  const markers = fixed.match(/XXXMARKER/g);
  console.log('XXXMARKER remaining: ' + (markers ? markers.length : 0));
  console.log('=== ALL CHECKS PASSED ===');
} catch(e) {
  console.log('PARSE FAIL: ' + e.message);
  // Quick syntax check for exact location
  try {
    require('child_process').execSync('node --check pack_c_corrected.js', {cwd: process.cwd(), stdio: 'pipe'});
  } catch(ee) {
    const out = ee.stderr ? ee.stderr.toString() : ee.message;
    console.log('node --check: ' + out.split('\n')[0]);
  }
}
