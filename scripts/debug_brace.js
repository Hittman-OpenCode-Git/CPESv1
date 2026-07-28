const fs = require('fs');
const c = fs.readFileSync('pack_a_corrected.js', 'utf8');
const qid = 'P1-A-004';
const pattern = '"QuestionID": "' + qid + '"';
const idx = c.indexOf(pattern);
console.log('Pattern:', pattern);
console.log('Found at index:', idx);
console.log('Nearby:', JSON.stringify(c.substring(Math.max(0, idx - 15), idx + 50)));

// Find opening brace
let depth = 0;
let inString = false;
let stringChar = null;
let escape = false;
let openBrace = -1;

for (let i = idx; i >= 0; i--) {
    const ch = c[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (ch === stringChar) { inString = false; stringChar = null; continue; }
    if (inString) continue;
    if (ch === '"') { inString = true; stringChar = ch; continue; }
    if (ch === '}') { depth++; continue; }
    if (ch === '{') {
        if (depth === 0) {
            openBrace = i;
            break;
        }
        depth--;
    }
}
console.log('Opening brace at:', openBrace);
if (openBrace >= 0) {
    console.log('From openBrace:', JSON.stringify(c.substring(openBrace, openBrace + 60)));
}
