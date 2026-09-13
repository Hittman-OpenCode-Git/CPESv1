const fs = require('fs');
const s = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');
const m = [...s.matchAll(/P1-A-(\d+)/g)].map(x => +x[1]);
console.log('P1-A occurrences=' + m.length + ' max=' + Math.max(...m));
// schema sample
const i = s.indexOf('"QuestionID": "P1-A-050"');
let d = 0, start = -1;
for (let k = i; k >= 0; k--) {
  if (s[k] === '}') d++;
  else if (s[k] === '{') { d--; if (d < 0) { start = k; break; } }
}
console.log(s.substring(start, start + 1500));