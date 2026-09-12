const fs = require('fs');
function load(f) {
  const src = fs.readFileSync(f, 'utf8');
  const s = src.indexOf('[');
  let d = 0, e = -1;
  for (let i = s; i < src.length; i++) {
    if (src[i] === '[') d++;
    else if (src[i] === ']') { d--; if (d === 0) { e = i; break; } }
  }
  return (new Function('return ' + src.substring(s, e + 1)))();
}
const files = { A: 'content/packs/pack_a_corrected.js', B: 'content/packs/pack_b_corrected.js', C: 'content/packs/pack_c_corrected.js', D: 'content/packs/pack_d_corrected.js', E: 'content/packs/pack_e_corrected.js' };
for (const [p, f] of Object.entries(files)) {
  const arr = load(f);
  const bySec = {};
  for (const q of arr) {
    const s = q.Section || '?';
    bySec[s] = bySec[s] || { n: 0, Analyze: 0, Evaluate: 0, VDiff: 0, HO: 0 };
    bySec[s].n++;
    if (q.CognitiveLevel === 'Analyze') bySec[s].Analyze++;
    if (q.CognitiveLevel === 'Evaluate') bySec[s].Evaluate++;
    if (q.DifficultyScore === 5) bySec[s].VDiff++;
    if (q.CognitiveLevel === 'Analyze' || q.CognitiveLevel === 'Evaluate') bySec[s].HO++;
  }
  console.log('Pack ' + p + ':');
  for (const [s, v] of Object.entries(bySec).sort()) {
    console.log('  Sec ' + s + ': n=' + v.n + ' Analyze=' + v.Analyze + ' Evaluate=' + v.Evaluate + ' HO=' + v.HO + ' VDiff=' + v.VDiff);
  }
}