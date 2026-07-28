// S361 Ground Truth Reconciliation — using pack_reader engine
const path = require('path');
const fs = require('fs');

// Import pack_reader
const { parseAllPacks } = require('../../scripts/engine/pack_reader');

const results = {
  timestamp: new Date().toISOString(),
  per_pack: {},
  totals: {
    total_items: 0,
    total_certified: 0,
    dl008_certified: 0,
    dl026_certified: 0,
    dl008_items: [],
    dl026_items: [],
    dl008_by_section: {},
    dl026_by_section: {}
  }
};

try {
  const allPacks = parseAllPacks(path.resolve(__dirname, '..', '..'));

  for (const [packName, items] of Object.entries(allPacks)) {
    if (items._error) {
      console.error(`ERROR parsing ${packName}: ${items._error}`);
      continue;
    }
    const realItems = items.filter(i => typeof i === 'object' && i !== null && i.QuestionID);
    const packResult = {
      total: realItems.length,
      certified: 0,
      dl008: { count: 0, qids: [] },
      dl026: { count: 0, qids: [] }
    };

    for (const item of realItems) {
      const qid = item.QuestionID;
      const state = item.question_state;
      const cc = item.CorrectChoice;

      if (state === 'Certified') {
        packResult.certified++;

        // DL-008 check
        const ewCC = item['ExplanationWrong' + cc];
        if (ewCC && ewCC.trim().length > 0) {
          packResult.dl008.count++;
          packResult.dl008.qids.push({ qid, cc, ew_len: ewCC.length });
        }

        // DL-026 check
        const choices = ['A', 'B', 'C', 'D'];
        const emptySlots = [];
        for (const ch of choices) {
          if (ch === cc) continue;
          const ew = item['ExplanationWrong' + ch];
          if (!ew || ew.trim().length === 0) {
            emptySlots.push(ch);
          }
        }
        if (emptySlots.length > 0) {
          packResult.dl026.count++;
          packResult.dl026.qids.push({ qid, cc, empty_slots: emptySlots, section: item.Section });
        }
      }
    }

    results.per_pack[packName] = packResult;
    results.totals.total_items += packResult.total;
    results.totals.total_certified += packResult.certified;
  }

  // Build flat lists
  for (const [packName, data] of Object.entries(results.per_pack)) {
    for (const entry of data.dl008.qids) {
      results.totals.dl008_certified++;
      results.totals.dl008_items.push({ pack: packName, ...entry });
      const key = packName;
      if (!results.totals.dl008_by_section[key]) results.totals.dl008_by_section[key] = [];
      results.totals.dl008_by_section[key].push(entry.qid);
    }
    for (const entry of data.dl026.qids) {
      results.totals.dl026_certified++;
      results.totals.dl026_items.push({ pack: packName, ...entry });
      const key = `${packName} Section ${entry.section}`;
      if (!results.totals.dl026_by_section[key]) results.totals.dl026_by_section[key] = [];
      results.totals.dl026_by_section[key].push(entry.qid);
    }
  }

  // Overlap
  const dl008Set = new Set(results.totals.dl008_items.map(i => i.qid));
  const dl026Set = new Set(results.totals.dl026_items.map(i => i.qid));
  results.totals.overlap_qids = [...dl008Set].filter(q => dl026Set.has(q));
  results.totals.dl026_slots_total = results.totals.dl026_items.reduce((s, i) => s + i.empty_slots.length, 0);

} catch (e) {
  console.error('FATAL:', e.message);
  process.exit(1);
}

// Console output
console.log('=== S361 GROUND TRUTH RECONCILIATION ===');
console.log(`Total items: ${results.totals.total_items}`);
console.log(`Total Certified: ${results.totals.total_certified}`);
console.log('');
console.log(`DL-008 (Certified): ${results.totals.dl008_items.length}`);

// Group DL-008 by pack
const dl008ByPack = {};
for (const item of results.totals.dl008_items) {
  if (!dl008ByPack[item.pack]) dl008ByPack[item.pack] = [];
  dl008ByPack[item.pack].push(item);
}
for (const [pack, items] of Object.entries(dl008ByPack)) {
  console.log(`  ${pack}: ${items.length} items`);
  for (const item of items) {
    console.log(`    ${item.qid} CC=${item.cc} EW[${item.cc}]=${item.ew_len} chars`);
  }
}

console.log('');
console.log(`DL-026 (Certified): ${results.totals.dl026_items.length} items, ${results.totals.dl026_slots_total} empty slots`);
for (const [section, qids] of Object.entries(results.totals.dl026_by_section)) {
  console.log(`  ${section}: ${qids.length} items`);
  const sectionItems = results.totals.dl026_items.filter(i => i.qid === qids[0]).length > 0;
  // Print first 5 QIDs per section
  const preview = qids.slice(0, 5).join(', ');
  if (qids.length > 5) console.log(`    ${preview}... (+${qids.length - 5} more)`);
  else console.log(`    ${preview}`);
}

console.log('');
console.log(`Overlap (both DL-008 AND DL-026): ${results.totals.overlap_qids.length} items`);
console.log(`Overlap QIDs: ${results.totals.overlap_qids.join(', ')}`);

console.log('');
console.log('Per-pack summary:');
for (const [pack, data] of Object.entries(results.per_pack)) {
  console.log(`  ${pack}: ${data.certified}/${data.total} Certified, DL-008=${data.dl008.count}, DL-026=${data.dl026.count}`);
}

console.log('');
console.log('CONFLICT RESOLUTION:');
console.log(`  CURRENT_BASELINES "0 DL-008 Certified": ${results.totals.dl008_items.length === 0 ? 'CORRECT' : `WRONG — actual ${results.totals.dl008_items.length}`}`);
console.log(`  S822 "0 DL-008": ${results.totals.dl008_items.length === 0 ? 'CORRECT' : `WRONG — actual ${results.totals.dl008_items.length}`}`);
console.log(`  S822 "77 DL-026": ${results.totals.dl026_items.length === 77 ? 'CORRECT' : `WRONG — actual ${results.totals.dl026_items.length}`}`);
console.log(`  S361 RB "8 DL-008": ${results.totals.dl008_items.length === 8 ? 'CORRECT' : `WRONG — actual ${results.totals.dl008_items.length}`}`);
console.log(`  S361 RB "~34 DL-026": ${results.totals.dl026_items.length >= 30 && results.totals.dl026_items.length <= 38 ? 'APPROXIMATELY CORRECT' : `WRONG — actual ${results.totals.dl026_items.length}`}`);

// Write full output
fs.writeFileSync(
  path.join(__dirname, 's361_ground_truth_output.json'),
  JSON.stringify(results, null, 2)
);
console.log('\nFull output written to s361_ground_truth_output.json');
