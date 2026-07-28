// Find all S861-era corruption patterns in pack_c
const fs = require('fs');
const src = fs.readFileSync('pack_c_corrected.js.bak-20260727200252', 'utf8');
const lines = src.split('\n');

console.log('=== Checking for mid-string quote breaks ===');
// Pattern: a closing " followed by text and another " on same line inside a JSON string
for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    // Check for " \u2014 (a quote-space-emdash pattern that breaks the string)
    if (l.includes('" \u2014') && l.includes('ExplanationWrong')) {
        console.log('Line ' + (i + 1) + ': mid-string QUOTE BREAK');
    }
    // Check for string concatenation artifacts 
    if (l.includes('." \u2014') && l.includes('ExplanationWrong')) {
        console.log('Line ' + (i + 1) + ': CONCATENATION artifact');
    }
}

console.log('=== Checking for backslash-u artifacts ===');
// \u2014 should be an em dash, but if it appears literally it's escaped wrong
const backslashU = src.match(/\\u[0-9a-fA-F]{4}/g);
if (backslashU) {
    const unique = [...new Set(backslashU)];
    console.log('Found Unicode escapes: ' + unique.join(', '));
}

console.log('=== DONE ===');
