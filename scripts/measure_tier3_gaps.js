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
// CAQS P1 targets: Easy 15 / ModEasy 20 / Mod 30 / Diff 25 / VDiff 10 ; Remember 5 / Understand 15 / Apply 40 / Analyze 25 / Evaluate 15
const diffT = { Easy: 0.15, 'Moderate-Easy': 0.20, Moderate: 0.30, Difficult: 0.25, 'Very Difficult': 0.10 };
const cogT = { Remember: 0.05, Understand: 0.15, Apply: 0.40, Analyze: 0.25, Evaluate: 0.15 };
let tot = 0;
const gD = {}, gC = {};
for (const [p, f] of Object.entries(files)) {
  const arr = load(f);
  const d = {}, c = {};
  for (const q of arr) {
    tot++;
    d[q.Difficulty] = (d[q.Difficulty] || 0) + 1;
    c[q.CognitiveLevel] = (c[q.CognitiveLevel] || 0) + 1;
    gD[q.Difficulty] = (gD[q.Difficulty] || 0) + 1;
    gC[q.CognitiveLevel] = (gC[q.CognitiveLevel] || 0) + 1;
  }
  console.log('Pack ' + p + ' n=' + arr.length + ' diff=' + JSON.stringify(d) + ' cog=' + JSON.stringify(c));
}
console.log('POOL n=' + tot);
for (const [k, t] of Object.entries(diffT)) {
  const have = gD[k] || 0;
  const want = Math.round(tot * t);
  console.log('DIFF ' + k + ': have=' + have + ' want~' + want + ' gap=' + (want - have));
}
for (const [k, t] of Object.entries(cogT)) {
  const have = gC[k] || 0;
  const want = Math.round(tot * t);
  console.log('COG ' + k + ': have=' + have + ' want~' + want + ' gap=' + (want - have));
}