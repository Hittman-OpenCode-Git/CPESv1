const fs = require('fs');
const src = fs.readFileSync('pack_c_corrected.js.bak-20260727200252', 'utf8');

// Find lines with ExplanationWrong that contain " followed by more text on same line
// These are potential mid-string quote breaks
const lines = src.split('\n');
let count = 0;
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes('ExplanationWrong')) continue;
    // Count quotes on the line - a valid ExplanationWrong": "..." line should have exactly 4 quotes 
    // (key open, key close, value open, value close) if it's a multi-line single-value
    const quotes = (line.match(/"/g) || []).length;
    // But this is too noisy. Instead let's look for lines that have a clear break pattern:
    // text" text  -- a closing quote followed by more text on same line (not at end)
    const trimmed = line.trim();
    // Check if the line ends with "text", or text"," pattern (valid end)
    // If it contains " followed by space and more text mid-line, that's suspicious
    if (trimmed.match(/\" [\u2014\w]/) && trimmed.match(/ExplanationWrong/)) {
        console.log('Line ' + (i + 1) + ': MID-STRING BREAK');
        count++;
    }
}

console.log('Total mid-string quote breaks found: ' + count);
