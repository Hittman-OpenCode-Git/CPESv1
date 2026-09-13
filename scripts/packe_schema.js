const fs = require('fs');
const s = fs.readFileSync('content/packs/pack_e_corrected.js', 'utf8');
const i = s.indexOf('"QuestionID": "P1E-B-050"');
let d = 0, start = -1;
for (let k = i; k >= 0; k--) {
  if (s[k] === '}') d++;
  else if (s[k] === '{') { d--; if (d < 0) { start = k; break; } }
}
let d2 = 0, end = -1;
for (let k = start; k < s.length; k++) {
  if (s[k] === '{') d2++;
  else if (s[k] === '}') { d2--; if (d2 === 0) { end = k + 1; break; } }
}
const obj = new Function('return ' + s.substring(start, end) + ';')();
console.log('KEYS: ' + Object.keys(obj).join(', '));
console.log('LOSTag=' + obj.LOSTag + ' | Topic=' + obj.Topic + ' | Key=' + obj.UniqueConceptKey + ' | Diff=' + obj.Difficulty + '/' + obj.DifficultyScore + ' | CL=' + obj.CognitiveLevel + ' | CC=' + obj.CorrectChoice + ' | state=' + obj.question_state);