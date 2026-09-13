const fs = require('fs');
const s = fs.readFileSync('content/packs/pack_e_corrected.js', 'utf8');
const m = [...s.matchAll(/P1E-B-(\d+)/g)].map(x => +x[1]);
console.log('P1E-B occurrences=' + m.length + ' max=' + Math.max(...m) + ' min=' + Math.min(...m));
// cognitive + difficulty in Section B
const i = s.indexOf('"QuestionID": "P1E-B-050"');
let d = 0, start = -1;
for (let k = i; k >= 0; k--) {
  if (s[k] === '}') d++;
  else if (s[k] === '{') { d--; if (d < 0) { start = k; break; } }
}
console.log(s.substring(start, start + 900));
// key format sample
const k2 = s.indexOf('P1E-B-012');
console.log('---key sample---');
console.log(s.substring(Math.max(0, k2 - 600), k2 + 100));