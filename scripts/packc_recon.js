const fs = require('fs');
const s = fs.readFileSync('content/packs/pack_c_corrected.js', 'utf8');
const m = [...s.matchAll(/P1-CC-(\d+)/g)].map(x => +x[1]);
console.log('P1-CC occurrences=' + m.length + ' max=' + Math.max(...m));
// schema sample: first P1-CC item's leading fields
const i = s.indexOf('P1-CC-001');
let d = 0, start = -1;
for (let k = i; k >= 0; k--) {
  if (s[k] === '}') d++;
  else if (s[k] === '{') { d--; if (d < 0) { start = k; break; } }
}
console.log(s.substring(start, start + 900));