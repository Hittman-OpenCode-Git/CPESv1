// Comprehensive repair: fix ALL known corruption patterns in pack_c_corrected.js
// Run on backup to create repaired version
const fs = require('fs');

const src = fs.readFileSync('pack_c_corrected.js.bak-20260727200252', 'utf8');
console.log('Input: ' + src.length + ' bytes');

let fixed = src;

// Pattern 1: Remove "XXXMARKER" (42 occurrences)
const p1Before = (fixed.match(/"XXXMARKER"/g) || []).length;
fixed = fixed.replace(/"XXXMARKER"/g, '"');
console.log('P1 "XXXMARKER": ' + p1Before + ' -> ' + (fixed.match(/XXXMARKER/g)||[]).length);

// Pattern 2: Missing comma after ExplanationWrong before next key
// These happen consistently in the S861 expansion items
// Use a regex: ExplanationWrongD": "..."  (ending with ") followed by whitespace and a new key "
// Capture groups: $1 = EW value (without trailing comma), $2 = next key
// Replace: $1",\n        "$2
const p2Pattern = /(        "ExplanationWrong[A-D]": ".*?\.)\n\s{8}"/g;
let p2Count = 0;
fixed = fixed.replace(p2Pattern, (match, p1) => {
    p2Count++;
    return p1 + ',\n        "';
});
console.log('P2 missing commas: ' + p2Count + ' fixed');

// Pattern 3: Mid-string quote break - "text" extra_text"
// Pattern like: "...capabilities of blockchain." \u2014 it is more..."
// The quote after the period prematurely closes the JSON string
// Fix: escape the internal quote, or merge the text
// Actually this looks like a concatenation error where two strings were merged incorrectly
// "text1." "text2." -> should be "text1.  text2."
// Find: " followed by space followed by more text and then ",
// This is tricky. Let me look for " \u2014 pattern
const p3Pattern = /" \u2014 ([^"]*)(?=")/g;
let p3Count = 0;
fixed = fixed.replace(p3Pattern, (match, rest) => {
    p3Count++;
    return ' \u2014 ' + rest;
});
console.log('P3 mid-string quote breaks: ' + p3Count + ' fixed');

fs.writeFileSync('pack_c_corrected.js', fixed, 'utf8');
console.log('Output: ' + fixed.length + ' bytes');

// Verify
try {
    const fn = new Function(fixed + '; return MCQ_BANK_C;');
    const data = fn();
    console.log('PARSE OK: ' + data.length + ' objects');
    const cert = data.filter(x => x && x.question_state === 'Certified').length;
    console.log('Certified: ' + cert);
} catch(e) {
    console.log('PARSE FAIL: ' + e.message);
}
