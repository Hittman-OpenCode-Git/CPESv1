const r = require('./output/phase0_results_v2.json');
const flags = r.screens.B.flags;

// Distribution by recall
const byRecall = {};
for (const f of flags) {
  const bucket = f.bestRecall >= 90 ? '90-100' : f.bestRecall >= 70 ? '70-89' : f.bestRecall >= 50 ? '50-69' : '<50';
  byRecall[bucket] = (byRecall[bucket] || 0) + 1;
}
console.log('=== Screen B distribution by bestRecall ===');
for (const [k, v] of Object.entries(byRecall)) console.log(`  ${k}%: ${v} items`);

// By pack
const byPack = {};
for (const f of flags) {
  byPack[f.pack] = (byPack[f.pack] || 0) + 1;
}
console.log('\n=== Screen B flags by pack ===');
for (const [k, v] of Object.entries(byPack).sort()) console.log(`  Pack ${k}: ${v} flags`);

// High-recall items (bestRecall=100) — most suspicious
console.log('\n=== Screen B: High-recall items (bestRecall=100, margin>=50) ===');
const highRecall = flags.filter(f => f.bestRecall === 100 && f.margin >= 50);
for (const f of highRecall) {
  console.log(`  ${f.pack}-${f.qid} CC=${f.storedCC}->best=${f.bestLetter}(${f.bestRecall}%) margin=${f.margin} | ${f.ecPreview.substring(0,90)}`);
}

// Mid-recall items for comparison
console.log('\n=== Screen B: Mid-recall items (70-99%) ===');
const midRecall = flags.filter(f => f.bestRecall >= 70 && f.bestRecall < 100);
for (const f of midRecall.slice(0, 20)) {
  console.log(`  ${f.pack}-${f.qid} CC=${f.storedCC}->best=${f.bestLetter}(${f.bestRecall}%) margin=${f.margin} | ${f.ecPreview.substring(0,70)}`);
}
