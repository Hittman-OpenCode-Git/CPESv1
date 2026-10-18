/**
 * analyze_case_inversions.js — Analyze 161 INVERSION flags from case_semantic_screens.
 * READ-ONLY: parses case packs, no writes.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');

const flagsData = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/output/case_semantic_flags.json'), 'utf8'));
const inversions = flagsData.flags.filter(f => f.detail && f.detail.includes('INVERSION'));

console.log(`=== Case INVERSION Flag Analysis ===`);
console.log(`Total INVERSION flags: ${inversions.length}`);
console.log(`\nCensus: cases=${flagsData.census.totalCases}, items=${flagsData.census.totalItems}, certifiedItems=${flagsData.census.certifiedItems}`);

// Count by item state
const byState = {};
for (const f of inversions) {
  const state = f.itemState || 'Unknown';
  byState[state] = (byState[state] || 0) + 1;
}
console.log(`\nINVERSION flags by item state:`);
for (const [state, count] of Object.entries(byState)) {
  console.log(`  ${state}: ${count}`);
}

// Count by case state
const byCaseState = {};
for (const f of inversions) {
  const state = f.caseState || 'Unknown';
  byCaseState[state] = (byState[state] || 0) + 1;
}
console.log(`\nINVERSION flags by case state:`);
for (const [state, count] of Object.entries(byCaseState)) {
  console.log(`  ${state}: ${count}`);
}

// Group by case (unique cases in "In Audit" with INVERSION flags)
const inAuditCases = {};
for (const f of inversions) {
  if (f.itemState === 'In Audit') {
    if (!inAuditCases[f.caseId]) inAuditCases[f.caseId] = { flags: [], bank: f.bank, part: f.part };
    inAuditCases[f.caseId].flags.push(f);
  }
}
console.log(`\nUnique cases in "In Audit" with INVERSION flags: ${Object.keys(inAuditCases).length}`);

// Identify strongest inversion candidates (recall >= 0.90, margin <= 0.10)
// These have the EC text almost perfectly matching a non-CC choice with no overlap on CC
const strong = inversions.filter(f => {
  const r = parseFloat(f.detail.match(/recall=([\d.]+)/)?.[1]);
  const m = parseFloat(f.detail.match(/margin=([\d.]+)/)?.[1]);
  return r >= 0.90 && m <= 0.10;
});
console.log(`\nStrong inversion candidates (recall>=0.90, margin<=0.10): ${strong.length}`);

// Identify moderate candidates (recall >= 0.70, margin <= 0.30)
const moderate = inversions.filter(f => {
  const r = parseFloat(f.detail.match(/recall=([\d.]+)/)?.[1]);
  const m = parseFloat(f.detail.match(/margin=([\d.]+)/)?.[1]);
  return r >= 0.70 && r < 0.90 && m <= 0.30;
});
console.log(`Moderate candidates (recall 0.70-0.89, margin<=0.30): ${moderate.length}`);

// For ALL inversion flags, extract the detail pattern
const detailPatterns = {};
for (const f of inversions) {
  // Extract predicted and stored letters
  const pred = f.detail.match(/predicted\((\w)\)/)?.[1];
  const stored = f.detail.match(/stored\((\w)\)/)?.[1];
  const key = `${pred}→${stored}`;
  detailPatterns[key] = (detailPatterns[key] || 0) + 1;
}
console.log(`\nPredicted→Stored letter patterns:`);
for (const [k, v] of Object.entries(detailPatterns).sort((a,b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}

// Save analysis
const analysis = {
  totalInversions: inversions.length,
  byState,
  byCaseState,
  inAuditCases: Object.keys(inAuditCases).length,
  strongCandidates: strong.length,
  moderateCandidates: moderate.length,
  detailPatterns,
  strongItems: strong.map(f => ({
    bank: f.bank, part: f.part, caseId: f.caseId, itemId: f.itemId,
    itemState: f.itemState, caseState: f.caseState, detail: f.detail
  })),
  moderateItems: moderate.map(f => ({
    bank: f.bank, part: f.part, caseId: f.caseId, itemId: f.itemId,
    itemState: f.itemState, caseState: f.caseState, detail: f.detail
  }))
};
fs.writeFileSync(path.join(ROOT, 'scripts/output/case_inversion_analysis.json'), JSON.stringify(analysis, null, 1));
console.log(`\nAnalysis saved: scripts/output/case_inversion_analysis.json`);
