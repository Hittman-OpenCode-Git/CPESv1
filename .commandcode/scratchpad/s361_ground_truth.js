// S361 Ground Truth Reconciliation — Independent Direct Scan
// Verifies DL-008 and DL-026 on all Certified items across all 5 packs

const fs = require('fs');
const path = require('path');

const packs = [
  'pack_a_corrected.js',
  'pack_b_corrected.js',
  'pack_c_corrected.js',
  'pack_d_corrected.js',
  'pack_e_corrected.js'
];

function parsePack(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const varMatch = raw.match(/var\s+MCQ_BANK_\w+\s*=\s*(\[[\s\S]*\}\]);?\s*$/);
  if (!varMatch) {
    // Try different variable patterns
    const altMatch = raw.match(/(?:var|const)\s+\w+\s*=\s*(\[[\s\S]*\}\]);?\s*$/m);
    if (!altMatch) throw new Error(`Cannot find MCQ array in ${filePath}`);
    return new Function(`return ${altMatch[1]}`)();
  }
  return new Function(`return ${varMatch[1]}`)();
}

const results = {
  timestamp: new Date().toISOString(),
  per_pack: {},
  totals: {
    total_items: 0,
    total_certified: 0,
    dl008_certified: 0,
    dl026_certified: 0,
    dl008_items: [],
    dl026_items: []
  }
};

for (const packFile of packs) {
  const packName = packFile.replace('_corrected.js', '');
  const filePath = path.join(__dirname, '..', '..', packFile);
  const items = parsePack(filePath);

  const packResult = {
    total: items.length,
    certified: 0,
    dl008: { count: 0, qids: [] },
    dl026: { count: 0, qids: [] }
  };

  for (const item of items) {
    const qid = item.QuestionID;
    const state = item.question_state;
    const cc = item.CorrectChoice;

    if (state === 'Certified') {
      packResult.certified++;
      results.totals.total_certified++;

      // DL-008: ExplanationWrong[CorrectChoice] non-empty on Certified item
      const ewCC = item['ExplanationWrong' + cc];
      if (ewCC && ewCC.trim().length > 0) {
        packResult.dl008.count++;
        packResult.dl008.qids.push({ qid, cc, ew_length: ewCC.length });
        results.totals.dl008_certified++;
        results.totals.dl008_items.push({ pack: packName, qid, cc, section: item.Section, topic: item.Stem?.substring(0, 60) + '...' });
      }

      // DL-026: Empty non-CC ExplanationWrong slots on Certified item
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
        packResult.dl026.qids.push({ qid, cc, empty_slots: emptySlots });
        results.totals.dl026_certified++;
        results.totals.dl026_items.push({ pack: packName, qid, cc, section: item.Section, empty_slots: emptySlots, topic: item.Stem?.substring(0, 60) + '...' });
      }
    }

    // Also catalog Archived/In Audit items with DL-008 for cross-ref
    if (state !== 'Certified') {
      // Just counting, not listing
    }
  }

  packResult.total = items.length;
  results.per_pack[packName] = packResult;
  results.totals.total_items += items.length;
}

// Add complete DL-008 QID list
results.totals.dl008_qids = results.totals.dl008_items.map(i => i.qid);
results.totals.dl026_qids = results.totals.dl026_items.map(i => i.qid);

// Count overlaps
const dl008Set = new Set(results.totals.dl008_qids);
const dl026Set = new Set(results.totals.dl026_qids);
const overlap = [...dl008Set].filter(q => dl026Set.has(q));
results.totals.overlap_both_defects = overlap;

// Section breakdown
results.totals.dl008_by_section = {};
for (const item of results.totals.dl008_items) {
  const key = `${item.pack}-${item.section}`;
  if (!results.totals.dl008_by_section[key]) results.totals.dl008_by_section[key] = [];
  results.totals.dl008_by_section[key].push(item.qid);
}

results.totals.dl026_by_section = {};
for (const item of results.totals.dl026_items) {
  const key = `${item.pack}-${item.section}`;
  if (!results.totals.dl026_by_section[key]) results.totals.dl026_by_section[key] = [];
  results.totals.dl026_by_section[key].push(item.qid);
}

// Per-section DL-026 counts on Certified items
results.totals.dl026_slots_total = results.totals.dl026_items.reduce((sum, i) => sum + i.empty_slots.length, 0);

// Verify against known conflicting reports
results.conflict_analysis = {
  current_baselines_claim: "DL-008: 0 Certified, DL-026: ~27 residual non-Certified",
  s822_claim: "DL-008: 0 Certified, DL-026: 77 Certified (38 Domain E + 39 Domain F)",
  s361_rb_claim: "DL-008: 8 Certified, DL-026: ~34 Certified (all Domain F)",
  s852_manifest_claim: "DL-008: 3 (all Archived), DL-026: 261 (all Archived/Unprocessed) — 0 Certified of either"
};

fs.writeFileSync(
  path.join(__dirname, 's361_ground_truth_output.json'),
  JSON.stringify(results, null, 2)
);

console.log('=== S361 GROUND TRUTH RECONCILIATION ===');
console.log(`Total items: ${results.totals.total_items}`);
console.log(`Total Certified: ${results.totals.total_certified}`);
console.log('');
console.log('DL-008 (Certified):', results.totals.dl008_certified);
for (const item of results.totals.dl008_items) {
  console.log(`  ${item.pack}/${item.section} ${item.qid} CC=${item.cc} EW[${item.cc}]=non-empty`);
}
console.log('');
console.log('DL-026 (Certified):', results.totals.dl026_certified, 'items,', results.totals.dl026_slots_total, 'empty slots');
for (const item of results.totals.dl026_items) {
  console.log(`  ${item.pack}/${item.section} ${item.qid} CC=${item.cc} empty=[${item.empty_slots.join(',')}]  ${item.topic}`);
}
console.log('');
console.log('Overlap (both DL-008 + DL-026):', overlap.length, 'items');
console.log('Overlap QIDs:', overlap);
console.log('');

// Per-pack summary
for (const [pack, data] of Object.entries(results.per_pack)) {
  console.log(`${pack}: ${data.certified}/${data.total} Certified, DL-008=${data.dl008.count}, DL-026=${data.dl026.count}`);
}

console.log('');
console.log('Conflict Resolution:');
console.log(`  CURRENT_BASELINES.md "0 DL-008": ${results.totals.dl008_certified === 0 ? 'CORRECT' : `INCORRECT — found ${results.totals.dl008_certified}`}`);
console.log(`  S822 "0 DL-008": ${results.totals.dl008_certified === 0 ? 'CORRECT' : `INCORRECT — found ${results.totals.dl008_certified}`}`);
console.log(`  S822 "77 DL-026": ${results.totals.dl026_certified === 77 ? 'CORRECT' : `INCORRECT — found ${results.totals.dl026_certified}`}`);
console.log(`  S361 RB "8 DL-008": ${results.totals.dl008_certified === 8 ? 'CORRECT' : `INCORRECT — found ${results.totals.dl008_certified}`}`);
console.log(`  S361 RB "34 DL-026": ${results.totals.dl026_certified >= 30 && results.totals.dl026_certified <= 38 ? 'APPROXIMATELY CORRECT' : `INCORRECT — found ${results.totals.dl026_certified}`}`);

console.log('\nFull output written to: s361_ground_truth_output.json');
