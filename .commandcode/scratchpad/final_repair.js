const fs = require('fs');
const src = fs.readFileSync('pack_c_corrected.js.bak-20260727200252', 'utf8');

let fixed = src;

// P1: "XXXMARKER", → ",
fixed = fixed.replace(/"XXXMARKER",/g, '",');

// P2: Find mid-string quote breaks: "text." \u2014 more..." → "text \u2014 more..."
// In raw source, \u2014 is literal characters \, u, 2, 0, 1, 4
// Pattern: ." \\u2014  (dot-quote-space-backslash-u-2-0-1-4)
const p2Before = fixed.split('." \\u2014').length - 1;
fixed = fixed.replace(/\.\" \\u2014/g, '. \\u2014');
const p2After = fixed.split('." \\u2014').length - 1;
console.log('P2 mid-string breaks: ' + p2Before + ' -> ' + p2After);

// P3: 4 missing commas
const fixes = [
  ['prescribing retention strategies."\n        "question_state": "Certified",', 'prescribing retention strategies.",\n        "question_state": "Certified",'],
  ['not explaining past outcomes."\n        "ExplanationWrongC": "",', 'not explaining past outcomes.",\n        "ExplanationWrongC": "",'],
  ['future churn probability."\n        "ExplanationWrongD": "",', 'future churn probability.",\n        "ExplanationWrongD": "",'],
  ['churn in the future."\n        "ExplanationWrongD": "Prescriptive analytics recommends', 'churn in the future.",\n        "ExplanationWrongD": "Prescriptive analytics recommends']
];
let fixesApplied = 0;
for (const [old, neo] of fixes) {
  if (fixed.includes(old)) { fixed = fixed.replace(old, neo); fixesApplied++; }
  else { console.log('Fix not found: ' + old.slice(0, 40)); }
}
console.log('P3 comma fixes: ' + fixesApplied + '/' + fixes.length);

fs.writeFileSync('pack_c_corrected.js', fixed, 'utf8');

// Validate
try {
  const fn = new Function(fixed + '; return MCQ_BANK_C;');
  const data = fn();
  const ids = data.filter(x => x && x.QuestionID);
  const cert = data.filter(x => x && x.question_state === 'Certified');
  console.log('PARSE OK: ' + ids.length + ' items, ' + cert.length + ' Certified');
  console.log('=== ALL CHECKS PASSED ===');
} catch(e) {
  console.log('PARSE FAIL: ' + e.message);
  const cp = require('child_process');
  try { cp.execSync('node --check pack_c_corrected.js', {cwd: process.cwd(), stdio: 'pipe'}); } catch(ee) {
    console.log('node --check: ' + ee.stderr.toString().split('\n')[0]);
  }
}
