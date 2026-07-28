// S361 Ground Truth — regex-based scan that doesn't require pack_reader parse
// Strategy: extract each item's JSON object boundaries, scan inline
const fs = require('fs');
const path = require('path');

const packs = [
  { name: 'pack_a', file: 'pack_a_corrected.js' },
  { name: 'pack_b', file: 'pack_b_corrected.js' },
  { name: 'pack_c', file: 'pack_c_corrected.js' },
  { name: 'pack_d', file: 'pack_d_corrected.js' },
  { name: 'pack_e', file: 'pack_e_corrected.js' }
];

const results = { packs: {}, dl008: [], dl026: [], totalCertified: 0 };

for (const pack of packs) {
  const raw = fs.readFileSync(path.resolve(__dirname, '..', '..', pack.file), 'utf8');
  
  // Find all item objects by locating QuestionID markers
  const qidMatches = [...raw.matchAll(/"QuestionID":\s*"([^"]+)"/g)];
  
  const packResult = { total: qidMatches.length, certified: 0, dl008: 0, dl026: 0 };
  
  for (const qidMatch of qidMatches) {
    const qid = qidMatch[1];
    const qidPos = qidMatch.index;
    
    // Get surrounding context (the item object)
    // Strategy: extract from ~200 chars before QuestionID to ~1500 chars after
    const start = Math.max(0, qidPos - 200);
    const end = Math.min(raw.length, qidPos + qidMatch[0].length + 2000);
    const context = raw.substring(start, end);
    
    // Find question_state
    const stateMatch = context.match(/"question_state":\s*"([^"]+)"/);
    if (!stateMatch || stateMatch[1] !== 'Certified') continue;
    packResult.certified++;
    
    // Find CorrectChoice
    const ccMatch = context.match(/"CorrectChoice":\s*"([A-D])"/);
    if (!ccMatch) continue;
    const cc = ccMatch[1];
    
    // DL-008: ExplanationWrong[CC] non-empty
    const ewCCRegex = new RegExp(`"ExplanationWrong${cc}":\\s*"(.*?)"`, 's');
    const ewCCMatch = context.match(ewCCRegex);
    if (ewCCMatch && ewCCMatch[1] && ewCCMatch[1].trim().length > 0) {
      packResult.dl008++;
      results.dl008.push({
        pack: pack.name,
        qid,
        cc,
        ew_len: ewCCMatch[1].length,
        section: (context.match(/"Section":\s*"([^"]+)"/) || [])[1] || '?'
      });
    }
    
    // DL-026: empty non-CC ExplanationWrong slots
    const emptySlots = [];
    for (const ch of ['A','B','C','D']) {
      if (ch === cc) continue;
      const ewRegex = new RegExp(`"ExplanationWrong${ch}":\\s*"(.*?)"`, 's');
      const ewMatch = context.match(ewRegex);
      if (!ewMatch || !ewMatch[1] || ewMatch[1].trim().length === 0) {
        emptySlots.push(ch);
      }
    }
    if (emptySlots.length > 0) {
      packResult.dl026++;
      results.dl026.push({
        pack: pack.name,
        qid,
        cc,
        empty: emptySlots,
        section: (context.match(/"Section":\s*"([^"]+)"/) || [])[1] || '?'
      });
    }
  }
  
  results.packs[pack.name] = packResult;
  results.totalCertified += packResult.certified;
}

// Output
console.log('=== S361 GROUND TRUTH (Regex Scan) ===');
console.log(`Total Certified: ${results.totalCertified}`);
console.log('');
console.log(`DL-008 (Certified): ${results.dl008.length}`);
for (const d of results.dl008) {
  console.log(`  ${d.pack} ${d.qid} CC=${d.cc} EW[${d.cc}]=${d.ew_len} chars (Sec ${d.section})`);
}
console.log('');
console.log(`DL-026 (Certified): ${results.dl026.length} items, ${results.dl026.reduce((s,d)=>s+d.empty.length,0)} slots`);
for (const d of results.dl026) {
  console.log(`  ${d.pack} ${d.qid} CC=${d.cc} empty=[${d.empty}] (Sec ${d.section})`);
}
console.log('');
const ol = results.dl008.map(d=>d.qid).filter(q=>results.dl026.some(d=>d.qid===q));
console.log(`Overlap (both DL-008 AND DL-026): ${ol.length} items: ${ol.join(', ')}`);
console.log('');
for (const [n,p] of Object.entries(results.packs)) {
  console.log(`${n}: ${p.certified}/${p.total} cert, DL-008=${p.dl008}, DL-026=${p.dl026}`);
}
console.log('');
console.log('CONFLICT RESOLUTION:');
console.log(`  S361 RB "8 DL-008": ${results.dl008.length === 8 ? 'CONFIRMED' : `DIFFERS — found ${results.dl008.length}`}`);
console.log(`  S361 RB "~34 DL-026": ${results.dl026.length >= 30 && results.dl026.length <= 38 ? 'CONFIRMED' : `DIFFERS — found ${results.dl026.length}`}`);
console.log(`  CURRENT_BASELINES "0 DL-008": ${results.dl008.length === 0 ? 'CONFIRMED' : `FALSE — found ${results.dl008.length}`}`);
console.log(`  S822 "0 DL-008": ${results.dl008.length === 0 ? 'CONFIRMED' : `FALSE — found ${results.dl008.length}`}`);

fs.writeFileSync(path.join(__dirname, 's361_gt_regex.json'), JSON.stringify(results, null, 2));
console.log('\n→ s361_gt_regex.json');
