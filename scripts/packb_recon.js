const fs = require('fs');
const s = fs.readFileSync('content/packs/pack_b_corrected.js', 'utf8');
const m = [...s.matchAll(/P1B-B-(\d+)/g)].map(x => +x[1]);
console.log('P1B-B occurrences=' + m.length + ' max=' + Math.max(...m));
// schema sample: object containing a P1B-B Section B item
const i = s.indexOf('"QuestionID": "P1B-B-150"');
let d = 0, start = -1;
for (let k = i; k >= 0; k--) {
  if (s[k] === '}') d++;
  else if (s[k] === '{') { d--; if (d < 0) { start = k; break; } }
}
console.log(s.substring(start, start + 1400));