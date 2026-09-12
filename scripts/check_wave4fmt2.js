const fs = require('fs');
const src = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');
const i = src.indexOf('"QuestionID": "P1-A-076"');
// walk back to object start: find '  {' before i with "Part": 1 after it
const o = src.lastIndexOf('  {\n    "Part": 1,', i);
console.log(src.slice(o, o + 900));