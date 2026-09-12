const fs = require('fs');
const packs = {
  A: 'content/packs/pack_a_corrected.js',
  B: 'content/packs/pack_b_corrected.js',
  C: 'content/packs/pack_c_corrected.js',
  D: 'content/packs/pack_d_corrected.js',
  E: 'content/packs/pack_e_corrected.js',
};
for (const [p, f] of Object.entries(packs)) {
  const src = fs.readFileSync(f, 'utf8');
  const varName = 'MCQ_BANK_' + p;
  const arr = new Function(src + '\nreturn ' + varName + ';')();
  const bySec = {};
  for (const it of arr) {
    const s = it.Section || '?';
    bySec[s] = bySec[s] || { n: 0, An: 0, Ev: 0, DS5: 0 };
    bySec[s].n++;
    if (it.CognitiveLevel === 'Analyze') bySec[s].An++;
    if (it.CognitiveLevel === 'Evaluate') bySec[s].Ev++;
    if (it.DifficultyScore === 5) bySec[s].DS5++;
  }
  console.log('Pack ' + p + ':');
  for (const [s, v] of Object.entries(bySec).sort()) {
    console.log(`  Sec ${s}: n=${v.n} An=${v.An} Ev=${v.Ev} DS5=${v.DS5}`);
  }
}