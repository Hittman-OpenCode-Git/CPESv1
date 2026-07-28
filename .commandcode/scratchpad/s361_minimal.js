// S361 Ground Truth Reconciliation — minimal direct scan
const path = require('path');
const fs = require('fs');
const { parseAllPacks } = require('../../scripts/engine/pack_reader');

const allPacks = parseAllPacks(path.resolve(__dirname, '..', '..'));
const results = { packs: {}, dl008: [], dl026: [], total_certified: 0 };

for (const [name, items] of Object.entries(allPacks)) {
  if (items._error) { console.log(`SKIP ${name}: ${items._error}`); continue; }
  const real = items.filter(i => i && i.QuestionID);
  const pack = { total: real.length, certified: 0, dl008: 0, dl026: 0 };
  for (const item of real) {
    if (item.question_state !== 'Certified') continue;
    pack.certified++;
    results.total_certified++;
    const cc = item.CorrectChoice;
    if (!cc) continue;
    
    // DL-008: EW[CC] non-empty
    const ewCC = item['ExplanationWrong' + cc];
    if (ewCC && String(ewCC).trim().length > 0) {
      pack.dl008++;
      results.dl008.push({ pack: name, qid: item.QuestionID, cc, ew_len: ewCC.length, section: item.Section });
    }
    
    // DL-026: any non-CC EW slot empty
    const empty = [];
    for (const ch of ['A','B','C','D']) {
      if (ch === cc) continue;
      const ew = item['ExplanationWrong' + ch];
      if (!ew || String(ew).trim().length === 0) empty.push(ch);
    }
    if (empty.length > 0) {
      pack.dl026++;
      results.dl026.push({ pack: name, qid: item.QuestionID, cc, empty, section: item.Section });
    }
  }
  results.packs[name] = pack;
}

console.log('=== S361 Ground Truth ===');
console.log('Certified:', results.total_certified);
console.log('');
console.log(`DL-008: ${results.dl008.length}`);
for (const d of results.dl008) console.log(`  ${d.pack} ${d.qid} CC=${d.cc} EW[${d.cc}]=${d.ew_len} chars (Sec ${d.section})`);
console.log('');
console.log(`DL-026: ${results.dl026.length} items, ${results.dl026.reduce((s,d)=>s+d.empty.length,0)} slots`);
for (const d of results.dl026) console.log(`  ${d.pack} ${d.qid} CC=${d.cc} empty=[${d.empty}] (Sec ${d.section})`);
console.log('');
const ol = results.dl008.map(d=>d.qid).filter(q=>results.dl026.some(d=>d.qid===q));
console.log(`Overlap: ${ol.length} items: ${ol.join(', ')}`);
for (const [n,p] of Object.entries(results.packs)) {
  console.log(`${n}: ${p.certified}/${p.total} cert, DL-008=${p.dl008}, DL-026=${p.dl026}`);
}

fs.writeFileSync(path.join(__dirname, 's361_gt.json'), JSON.stringify(results, null, 2));
console.log('\n→ s361_gt.json');
