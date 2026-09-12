const fs = require('fs');
const src = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');
const i = src.indexOf('"QuestionID": "P1-A-076"');
const start = src.lastIndexOf('{\n', i);
console.log(src.slice(start, start + 1400));