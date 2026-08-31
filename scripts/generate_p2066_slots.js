#!/usr/bin/env node
// Generate slot tables for remaining P2-066 cycles, re-anchored to live pool counts
const TEST_CAP = process.argv.includes('--cap-75') ? { a: 375, b: 375, c: 469, d: 188, e: 188, f: 281 } : null; // 75% testing cap = 1876 MCQs
const TARGETS_FULL = { a: 500, b: 500, c: 625, d: 250, e: 250, f: 375 };
const TARGETS = TEST_CAP || TARGETS_FULL;
const CURRENT = { a: 310, b: 235, c: 320, d: 185, e: 195, f: 185 }; // post-Cycle1 remediation: 1430 total
const LOS = {
  a: ['A.1','A.2','A.3','A.4','A.5','A.6','A.7','A.8','A.9'],
  b: ['B.1','B.2','B.3','B.4','B.5','B.6','B.7','B.8','B.9'],
  c: ['C.1','C.2','C.3','C.4','C.5','C.6','C.7'],
  d: ['D.1','D.2','D.3','D.4','D.5'],
  e: ['E.1','E.2','E.3','E.4','E.5','E.6'],
  f: ['F.1','F.2','F.3','F.4','F.5','F.6','F.7'],
};
// Per-batch template for 15 items (matches AUTHOR_SPEC)
const DIFF_15 = ['Easy','Easy','Moderate-Easy','Moderate-Easy','Moderate-Easy','Moderate','Moderate','Moderate','Moderate','Moderate','Difficult','Difficult','Difficult','Very Difficult','Very Difficult'];
const DS_15 = [1,1,2,2,2,3,3,3,3,3,4,4,4,5,5];
const COG_15 = ['Remember','Understand','Apply','Apply','Understand','Apply','Apply','Apply','Analyze','Analyze','Analyze','Evaluate','Apply','Evaluate','Apply']; // 7 Apply, 3 Analyze, 2 Evaluate, 2 U,1 R
const CC_15 = ['A','B','C','D','A','B','C','A','B','D','C','A','B','D','C']; // 4/4/4/3 max streak 2 shuffled
// Note: COG_15 adjusted to satisfy Rule 11 floors (Evaluate DS>=4, Analyze DS>=3, U/R DS<=2) — verify pairing
function genPack(pack, start, count) {
  const rows = [];
  for (let i=0;i<count;i++) {
    const qid = `P2-${pack.toUpperCase()}-${String(start+i).padStart(3,'0')}`;
    const los = LOS[pack][i % LOS[pack].length];
    // use 15-template sliced for partial batches
    rows.push({ qid, los, diff: DIFF_15[i], ds: DS_15[i], cog: COG_15[i], cc: CC_15[i] });
  }
  return rows;
}
function printCycle(cycle, starts) {
  console.log(`\n## Cycle ${cycle}`);
  for (const p of ['a','b','c','d','e','f']) {
    const s = starts[p];
    const rem = TARGETS[p] - s + 1;
    if (rem <= 0) { console.log(`- Pack ${p.toUpperCase()}: done`); continue; }
    const cnt = Math.min(15, rem);
    console.log(`\n### Pack ${p.toUpperCase()} — P2-${p.toUpperCase()}-${String(s).padStart(3,'0')}..${String(s+cnt-1).padStart(3,'0')} (${cnt} items)`);
    console.log(`| # | QID | LOSTag | Difficulty | DS | Cognitive | CC |`);
    console.log(`|---|-----|--------|------------|----|-----------|----|`);
    const rows = genPack(p, s, cnt);
    rows.forEach((r,i)=> console.log(`| ${i+1} | ${r.qid} | ${r.los} | ${r.diff} | ${r.ds} | ${r.cog} | ${r.cc} |`));
  }
}
// Emit cycles (1..14 full, or 1..5 for 75% cap)
let starts = { a: 311, b: 236, c: 321, d: 186, e: 196, f: 186 }; // Cycle 2 start post-Cycle1 (310/235/320/185/195/185)
const maxCycles = TEST_CAP ? 5 : 14;
for (let c=2;c<=maxCycles+1;c++) {
  printCycle(c, starts);
  for (const p of ['a','b','c','d','e','f']) {
    const rem = TARGETS[p] - starts[p] + 1;
    if (rem > 0) starts[p] += Math.min(15, rem);
  }
}
