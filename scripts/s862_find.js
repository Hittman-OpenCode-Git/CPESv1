const fs = require('fs');
const code = fs.readFileSync('pack_d_corrected.js', 'utf8');
const pattern = /"QuestionID"\s*:\s*"(P1-[CD]D-\d+)"/g;
const qids = [];
let m;
while ((m = pattern.exec(code)) !== null) qids.push(m[1]);
console.log('Pack D Section C+D: ' + qids.length + ' QIDs');

// Sample 15 from Section C and D for Evaluate potential
const sample = qids.filter(q => q.match(/P1-CD-0[1-4]/) || q.match(/P1-DD-0[1-4]/)).slice(0, 20);
for (const qid of sample) {
  const idx = code.indexOf('"QuestionID": "' + qid + '"');
  if (idx === -1) continue;
  const objStart = code.lastIndexOf('{', idx);
  let d = 0, is = false, esc = false, end = objStart;
  for (let i = objStart; i < Math.min(objStart + 5000, code.length); i++) {
    const ch = code[i];
    if (esc) { esc = false; continue; }
    if (ch === '\\') { esc = true; continue; }
    if (ch === '"') { is = !is; continue; }
    if (is) continue;
    if (ch === '{') d++;
    if (ch === '}') { d--; if (d === 0) { end = i + 1; break; } }
  }
  const block = code.substring(objStart, end);
  const stem = (block.match(/"Stem"\s*:\s*"([^"]{20,150})"/) || [])[1] || 'N/A';
  const cl = (block.match(/"CognitiveLevel"\s*:\s*"(\w+)"/) || [])[1] || '?';
  const topic = (block.match(/"Topic"\s*:\s*"([^"]+)"/) || [])[1] || '?';
  console.log(qid + ' | ' + cl + ' | ' + topic.substring(0, 60));
  console.log('  ' + stem);
}
