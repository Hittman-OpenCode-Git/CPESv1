// Dry-run: find all lines where ExplanationWrong* ends without a comma before the next "key":
const fs = require('fs');
const src = fs.readFileSync('pack_c_corrected.js', 'utf8');
const lines = src.split('\n');

// Pattern: a line that ends with " (quoted string ending), and the next non-empty line starts with whitespace + " (a new key),
// but there's no comma at the end of the current line.
for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    const next = lines[i + 1];
    // Look for lines that contain "ExplanationWrong" and end with " or ',
    // where the next line starts with whitespace + " (new key) and the current line doesn't end with ,
    if (/ExplanationWrong/.test(line)) {
        const trimmed = line.trimEnd();
        const nextTrimmed = next.trimStart();
        if ((trimmed.endsWith('"') || trimmed.endsWith("'") || trimmed.endsWith('""')) 
            && !trimmed.endsWith(',') 
            && /^\s+"/.test(next)) {
            console.log(`LINE ${i + 1}: ${trimmed.slice(-80)}`);
            console.log(`NEXT ${i + 2}: ${nextTrimmed.slice(0, 80)}`);
            console.log('---');
        }
    }
}
console.log('DONE: dry-run scan complete.');
