const fs = require('fs');
const s = fs.readFileSync('content/packs/pack_e_corrected.js', 'utf8');
for (const id of ['P1E-E-101', 'P1E-E-130', 'P1E-E-076', 'P1E-E-100']) {
  console.log(id + ': ' + (s.includes('"QuestionID": "' + id + '"') ? 'TAKEN' : 'free'));
}
// schema sample: Section E item keys
const i = s.indexOf('P1E-E-050');
let d = 0, start = -1;
for (let k = i; k >= 0; k--) {
  if (s[k] === '}') d++;
  else if (s[k] === '{') { d--; if (d < 0) { start = k; break; } }
}
const obj = new Function('return ' + s.substring(start, s.indexOf('},', i) + 1) + ';')();
console.log('KEYS: ' + Object.keys(obj).join(','));
console.log('LOSTag=' + obj.LOSTag + ' | Key=' + obj.UniqueConceptKey);