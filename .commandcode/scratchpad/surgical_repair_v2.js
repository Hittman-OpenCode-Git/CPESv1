// Atomic surgical repair of pack_c_corrected.js v2
// Handles: XXXMARKER cleanup + 4 missing comma fixes
const fs = require('fs');

const src = fs.readFileSync('pack_c_corrected.js.bak-20260727200252', 'utf8');
console.log('Read backup: ' + src.length + ' bytes, ' + src.split('\n').length + ' lines');

// Phase 1: Fix XXXMARKER: the pattern is ."XXXMARKER", → .",
const before = (src.match(/"XXXMARKER"/g) || []).length;
console.log('"XXXMARKER" occurrences: ' + before);
let fixed = src.replace(/"XXXMARKER"/g, '"');
const after = (fixed.match(/XXXMARKER/g) || []).length;
console.log('XXXMARKER after: ' + after);

// Phase 2: Fix 4 missing commas using actual multi-line strings
let fixCount = 0;

// Fix 1: EW_D before question_state (ends with ".)
const FIND1 = `prescribing retention strategies."
        "question_state": "Certified",`;
const REPL1 = `prescribing retention strategies.",
        "question_state": "Certified",`;
if (fixed.includes(FIND1)) { fixed = fixed.replace(FIND1, REPL1); fixCount++; console.log('Fix1 APPLIED'); } else { console.log('Fix1 NOT FOUND'); }

// Fix 2: EW_B before EW_C (ends with ".)
const FIND2 = `not explaining past outcomes."
        "ExplanationWrongC": "",`;
const REPL2 = `not explaining past outcomes.",
        "ExplanationWrongC": "",`;
if (fixed.includes(FIND2)) { fixed = fixed.replace(FIND2, REPL2); fixCount++; console.log('Fix2 APPLIED'); } else { console.log('Fix2 NOT FOUND'); }

// Fix 3: EW_C before EW_D (ends with ".)
const FIND3 = `future churn probability."
        "ExplanationWrongD": "",`;
const REPL3 = `future churn probability.",
        "ExplanationWrongD": "",`;
if (fixed.includes(FIND3)) { fixed = fixed.replace(FIND3, REPL3); fixCount++; console.log('Fix3 APPLIED'); } else { console.log('Fix3 NOT FOUND'); }

// Fix 4: EW_C before EW_D (ends with ".)
const FIND4 = `churn in the future."
        "ExplanationWrongD": "Prescriptive analytics recommends`;
const REPL4 = `churn in the future.",
        "ExplanationWrongD": "Prescriptive analytics recommends`;
if (fixed.includes(FIND4)) { fixed = fixed.replace(FIND4, REPL4); fixCount++; console.log('Fix4 APPLIED'); } else { console.log('Fix4 NOT FOUND'); }

console.log('Comma fixes applied: ' + fixCount);

fs.writeFileSync('pack_c_corrected.js', fixed, 'utf8');
console.log('Written: ' + fixed.length + ' bytes, ' + fixed.split('\n').length + ' lines');

// Verify with Function constructor
try {
    const fn = new Function(fixed + '; return MCQ_BANK_C;');
    const data = fn();
    console.log('PARSE OK: ' + data.length + ' objects');
    const cert = data.filter(x => x && x.question_state === 'Certified').length;
    console.log('Certified: ' + cert);
    const markers = fixed.match(/XXXMARKER/g);
    console.log('XXXMARKER remaining: ' + (markers ? markers.length : 0));
    console.log('=== ALL CHECKS PASSED ===');
} catch(e) {
    console.log('PARSE FAIL: ' + e.message);
}
