const fs = require('fs');
for (const p of ['A','B','C','D','E']) {
  const src = fs.readFileSync('content/packs/pack_' + p.toLowerCase() + '_corrected.js', 'utf8');
  const arr = new Function(src + '\nreturn MCQ_BANK_' + p + ';')();
  const sectionCounts = {};
  const tierCounts = {};
  for (const it of arr) {
    const s = it.Section || 'none';
    sectionCounts[s] = (sectionCounts[s] || 0) + 1;
    const t = it._tier || (it.question_state==='Certified'?1:3);
    tierCounts[t] = (tierCounts[t] || 0) + 1;
  }
  console.log('Pack ' + p + ': sections=' + JSON.stringify(sectionCounts) + ' tiers=' + JSON.stringify(tierCounts));
}