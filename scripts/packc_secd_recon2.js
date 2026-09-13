const fs = require('fs');
const s = fs.readFileSync('content/packs/pack_c_corrected.js', 'utf8');
const m = [...s.matchAll(/P1-DC-(\d+)/g)].map(x => +x[1]);
console.log('P1-DC occurrences=' + m.length + ' max=' + Math.max(...m) + ' min=' + Math.min(...m));
for (const id of ['P1-DC-101', 'P1-DC-130']) {
  console.log(id + ': ' + (s.includes('"QuestionID": "' + id + '"') ? 'TAKEN' : 'free'));
}
const i = s.indexOf('"QuestionID": "P1-DC-050"');
if (i === -1) { console.log('P1-DC-050 not found; trying P1-DC-001'); }
const j = i === -1 ? s.indexOf('"QuestionID": "P1-DC-001"') : i;
let d = 0, start = -1;
for (let k = j; k >= 0; k--) {
  if (s[k] === '}') d++;
  else if (s[k] === '{') { d--; if (d < 0) { start = k; break; } }
}
let d2 = 0, end = -1;
for (let k = start; k < s.length; k++) {
  if (s[k] === '{') d2++;
  else if (s[k] === '}') { d2--; if (d2 === 0) { end = k + 1; break; } }
}
console.log(s.substring(start, start + 900));