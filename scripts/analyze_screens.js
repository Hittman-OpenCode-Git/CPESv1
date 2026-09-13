const r = require('./output/phase0_results.json');

// Screen A analysis
const aByPhrase = {};
for (const f of r.screens.A.flags) {
  const key = f.contaminant + ' | ' + f.phrase.substring(0, 50);
  aByPhrase[key] = (aByPhrase[key] || 0) + 1;
}
console.log('=== SCREEN A: Flags by phrase ===');
for (const [k, v] of Object.entries(aByPhrase).sort((a, b) => b[1] - a[1])) {
  console.log(v, k);
}

// Screen C: sample flags
console.log('\n=== SCREEN C: Sample flags (first 15) ===');
for (const f of r.screens.C.flags.slice(0, 15)) {
  console.log(f.pack + '-' + f.qid, 'J=' + f.jaccard, 'ECwc=' + f.ecWordCount, '|', f.ecPreview.substring(0, 70));
}

// Screen B: sample
console.log('\n=== SCREEN B: Sample flags (first 15) ===');
for (const f of r.screens.B.flags.slice(0, 15)) {
  console.log(f.pack + '-' + f.qid, 'CC=' + f.storedCC, 'best=' + f.bestLetter + '(' + f.bestRecall + ')', 'margin=' + f.margin, '|', f.ecPreview.substring(0, 60));
}

// Screen D: all flags
console.log('\n=== SCREEN D: All flags ===');
for (const f of r.screens.D.flags) {
  console.log(f.pack + '-' + f.qid, 'slot=' + f.slot, 'isCC=' + f.isCorrectChoice, '|', f.textPreview.substring(0, 80));
}
