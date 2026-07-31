// Quick check: items missing CognitiveLevel
const fs = require('fs');
const packs = ['pack_a_corrected.js','pack_b_corrected.js','pack_c_corrected.js','pack_d_corrected.js','pack_e_corrected.js'];
let unknown = [];
for (const fp of packs) {
  const raw = fs.readFileSync(fp, 'utf8');
  const re = /"QuestionID":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(raw)) !== null) {
    const block = raw.substring(m.index, m.index + 5000);
    const cl = block.match(/"CognitiveLevel":\s*"([^"]+)"/);
    if (!cl) unknown.push(m[1]);
  }
}
console.log('Items missing CognitiveLevel: ' + unknown.length);
unknown.forEach(q => console.log('  ' + q));
