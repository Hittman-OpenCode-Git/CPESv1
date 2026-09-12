const fs = require('fs');
const src = fs.readFileSync('content/packs/pack_b_corrected.js', 'utf8');
const i = src.indexOf('"QuestionID": "P1B-C-201"');
const o = src.lastIndexOf('  {\n    "Part": 1,', i);
console.log(src.slice(o, o + 900));
console.log('---range check---');
for (let n = 211; n <= 240; n++) {
  if (src.includes('"QuestionID": "P1B-C-' + n + '"')) console.log('PRESENT P1B-C-' + n);
}
console.log('QIDs:', (src.match(/"QuestionID"\s*:/g) || []).length, 'done');