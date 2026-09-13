const fs = require('fs');
const src = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');
const qid = process.argv[2] || 'P1-A-044';
const qi = src.indexOf('"QuestionID": "' + qid + '"');
// ExplanationCorrect precedes QuestionID in this object; search backward
const eck = src.lastIndexOf('"ExplanationCorrect"', qi);
const colon = src.indexOf(':', eck);
let vi = colon + 1;
while (src[vi] === ' ' || src[vi] === '\n') vi++;
// value starts with quote; print until closing quote (handle escapes)
let out = '';
let i = vi + 1;
while (i < src.length) {
  if (src[i] === '\\') { out += src[i] + src[i + 1]; i += 2; continue; }
  if (src[i] === '"') break;
  out += src[i]; i++;
}
console.log(out);