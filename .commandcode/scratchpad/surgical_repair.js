// Atomic surgical repair of pack_c_corrected.js
// 1. Remove all XXXMARKER tokens (inline, inside strings, between " and ,)
// 2. Fix 4 missing commas after ExplanationWrong fields
// 3. Verify with Function constructor
const fs = require('fs');

console.log('=== PHASE 1: Read backup ===');
const src = fs.readFileSync('pack_c_corrected.js.bak-20260727200252', 'utf8');
console.log('Backup size: ' + src.length + ' bytes, ' + src.split('\n').length + ' lines');

console.log('=== PHASE 2: Remove XXXMARKER tokens ===');
const beforeMarkers = (src.match(/XXXMARKER/g) || []).length;
console.log('XXXMARKER occurrences: ' + beforeMarkers);
let fixed = src.replace(/XXXMARKER/g, '');
const afterMarkers = (fixed.match(/XXXMARKER/g) || []).length;
console.log('XXXMARKER after removal: ' + afterMarkers);

console.log('=== PHASE 3: Fix missing commas (4 known locations) ===');
// These are the unique strings where a comma is missing after ExplanationWrong before the next key
// We use exact unique substrings to locate each fix point

// Fix 1: line ~21762 -- ExplanationWrongD before question_state (P1-FC-006)
const fix1_old = `Churn risk with prescribing retention strategies."
        "question_state": "Certified",`;
const fix1_new = `Churn risk with prescribing retention strategies.",
        "question_state": "Certified",`;
if (fixed.includes(fix1_old)) {
    fixed = fixed.replace(fix1_old, fix1_new);
    console.log('Fix 1: APPLIED');
} else {
    console.log('Fix 1: NOT FOUND (may already be fixed)');
}

// Fix 2: line ~21810 -- ExplanationWrongB before ExplanationWrongC (P1-FC-007)
const fix2_old = `not explaining past outcomes."
        "ExplanationWrongC": "",`;
const fix2_new = `not explaining past outcomes.",
        "ExplanationWrongC": "",`;
if (fixed.includes(fix2_old)) {
    fixed = fixed.replace(fix2_old, fix2_new);
    console.log('Fix 2: APPLIED');
} else {
    console.log('Fix 2: NOT FOUND');
}

// Fix 3: line ~21861 -- ExplanationWrongC before ExplanationWrongD (P1-FC-008)
const fix3_old = `future churn probability."
        "ExplanationWrongD": "",`;
const fix3_new = `future churn probability.",
        "ExplanationWrongD": "",`;
if (fixed.includes(fix3_old)) {
    fixed = fixed.replace(fix3_old, fix3_new);
    console.log('Fix 3: APPLIED');
} else {
    console.log('Fix 3: NOT FOUND');
}

// Fix 4: line ~21911 -- ExplanationWrongC before ExplanationWrongD (P1-FC-010)
const fix4_old = `churn in the future."
        "ExplanationWrongD": "Prescriptive analytics recommends`;
const fix4_new = `churn in the future.",
        "ExplanationWrongD": "Prescriptive analytics recommends`;
if (fixed.includes(fix4_old)) {
    fixed = fixed.replace(fix4_old, fix4_new);
    console.log('Fix 4: APPLIED');
} else {
    console.log('Fix 4: NOT FOUND');
}

console.log('=== PHASE 4: Write repaired file ===');
fs.writeFileSync('pack_c_corrected.js', fixed, 'utf8');
console.log('Written: ' + fixed.length + ' bytes, ' + fixed.split('\n').length + ' lines');

console.log('=== PHASE 5: Verify with Function constructor ===');
try {
    const fn = new Function(fixed + '; return MCQ_BANK_C;');
    const data = fn();
    console.log('PARSE OK: ' + data.length + ' objects');
    const cert = data.filter(x => x && x.question_state === 'Certified').length;
    console.log('Certified: ' + cert);
    const markers = fixed.match(/XXXMARKER/g);
    console.log('XXXMARKER: ' + (markers ? markers.length : 0));
    console.log('=== ALL CHECKS PASSED ===');
} catch(e) {
    console.log('PARSE FAIL: ' + e.message);
    process.exit(1);
}
