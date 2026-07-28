// Apply all 4 comma fixes + verify
const fs = require('fs');
const src = fs.readFileSync('pack_c_corrected.js', 'utf8');
const lines = src.split('\n');
let fixes = 0;

const fix = (lineNum, insertAfter) => {
    const idx = lineNum - 1;
    const line = lines[idx];
    const trimmed = line.trimEnd();
    if (!trimmed.endsWith(',')) {
        lines[idx] = trimmed + ',';
        fixes++;
        console.log('FIX ' + lineNum + ': added comma');
    } else {
        console.log('SKIP ' + lineNum + ': already has comma');
    }
};

// Fix 1: line 21757 - ExplanationWrongD before question_state
fix(21757);
// Fix 2: line 21805 - ExplanationWrongB before ExplanationWrongC
fix(21805);
// Fix 3: line 21856 - ExplanationWrongC before ExplanationWrongD
fix(21856);
// Fix 4: line 21906 - ExplanationWrongC before ExplanationWrongD
fix(21906);

fs.writeFileSync('pack_c_corrected.js', lines.join('\n'), 'utf8');
console.log('Total fixes applied: ' + fixes);
