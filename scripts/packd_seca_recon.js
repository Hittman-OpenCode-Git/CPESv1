const fs = require('fs');
const s = fs.readFileSync('content/packs/pack_d_corrected.js', 'utf8');
const m = [...s.matchAll(/P1-AD-(\d+)/g)].map(x => +x[1]);
console.log('P1-AD occurrences=' + m.length + ' max=' + Math.max(...m));
const i = s.indexOf('"QuestionID": "P1-AD-050"');
let d = 0, start = -1;
for (let k = i; k >= 0; k--) {
  if (s[k] === '}') d++;
  else if (s[k] === '{') { d--; if (d < 0) { start = k; break; } }
}
console.log(s.substring(start, start + 1100));