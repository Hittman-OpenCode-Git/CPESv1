const fs = require('fs');

// Fix EC-010 in pack_c: swap EWB and EWD
let raw = fs.readFileSync('pack_c_corrected.js', 'utf8');
const idx = raw.indexOf('"QuestionID": "P1-EC-010"');
const window = raw.substring(idx, idx + 8000);

// Find EWB text
const ewbStart = window.indexOf('"ExplanationWrongB": "');
const ewbEnd = window.indexOf('"', ewbStart + 22);
// Find next property after EWB
let ewbValEnd = window.indexOf('",', ewbStart + 22);
if (ewbValEnd === -1) ewbValEnd = window.indexOf('"\n', ewbStart + 22);
const ewbText = window.substring(ewbStart + 22, ewbValEnd);

const ewdStart = window.indexOf('"ExplanationWrongD": "');
const ewdEnd = window.indexOf('"', ewdStart + 22);
let ewdValEnd = window.indexOf('",', ewdStart + 22);
if (ewdValEnd === -1) ewdValEnd = window.indexOf('"\n', ewdStart + 22);
const ewdText = window.substring(ewdStart + 22, ewdValEnd);

console.log('EC-010 EWB: ' + ewbText.length + ' chars');
console.log('EC-010 EWD: ' + (ewdText.length) + ' chars');

// Construct full EW lines for replacement
const ewbFull = window.substring(ewbStart, ewdValEnd > 0 ? ewdValEnd : ewdEnd);
const ewdFull = window.substring(ewdStart, window.indexOf('\n', ewdStart));
console.log('EWB full: ' + ewbFull.substring(0, 80));
console.log('EWD full: ' + ewdFull.substring(0, 80));
