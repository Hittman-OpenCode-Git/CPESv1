// S899 — Inspect full Pack A P1-E-046 authored Analyze item
const fs = require('fs');
const raw = fs.readFileSync('pack_a_corrected.js', 'utf8');
const idx = raw.indexOf('"QuestionID": "P1-E-046"');
// Find the next QuestionID to determine the end
const nextIdx = raw.indexOf('"QuestionID": "P1-E-047"', idx + 1);
const endIdx = nextIdx !== -1 ? nextIdx : idx + 5000;
console.log(raw.substring(idx, endIdx));
