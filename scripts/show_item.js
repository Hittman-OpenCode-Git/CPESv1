const fs = require('fs');
const src = fs.readFileSync('content/packs/pack_d_corrected.js', 'utf8');
// print full object containing P1-CD-050
const qi = src.indexOf('"QuestionID": "P1-CD-050"');
// find enclosing object start (scan back to matching brace at depth)
let d = 0, start = -1;
for (let i = qi; i >= 0; i--) {
  if (src[i] === '}') d++;
  else if (src[i] === '{') { d--; if (d < 0) { start = i; break; } }
}
// find object end
let d2 = 0, end = -1;
for (let i = start; i < src.length; i++) {
  if (src[i] === '{') d2++;
  else if (src[i] === '}') { d2--; if (d2 === 0) { end = i + 1; break; } }
}
console.log(src.substring(start, end));