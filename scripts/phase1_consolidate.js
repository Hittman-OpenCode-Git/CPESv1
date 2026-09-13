/**
 * phase1_consolidate.js — Merge Phase 1b verification into final results,
 * reclassify model-error items, generate quarantine list.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const OUTPUT_DIR = path.join(__dirname, 'output');

// Load Phase 1 corrected results (all 2,620 items)
const phase1Lines = fs.readFileSync(path.join(OUTPUT_DIR, 'phase1_results_corrected.jsonl'), 'utf-8')
  .split('\n').filter(l => l.trim());
const phase1Results = phase1Lines.map(l => JSON.parse(l));

// Load Phase 1b verification results (53 items)
const phase1bLines = fs.readFileSync(path.join(OUTPUT_DIR, 'phase1b_verify.jsonl'), 'utf-8')
  .split('\n').filter(l => l.trim());
const phase1bResults = phase1bLines.map(l => JSON.parse(l));

console.log(`Phase 1 total: ${phase1Results.length}`);
console.log(`Phase 1b verified: ${phase1bResults.length}`);

// Build a lookup from Phase 1b results
const verifyMap = new Map();
for (const r of phase1bResults) {
  verifyMap.set(r.qid, r);
}

// Update Phase 1 results with Phase 1b verification
for (const r of phase1Results) {
  const verified = verifyMap.get(r.qid);
  if (verified) {
    // Update with verified results
    r.derived = verified.derived;
    r.keyAgree = verified.keyAgree;
    r.ecAgree = verified.ecAgree;
    r.ecSupports = verified.ecSupports;
    r.confidence = verified.confidence;
    r.isKeyError = verified.isKeyError;
    r.reasoning = verified.reasoning;
    r.note = verified.note;
    r.model = verified.model;
    r.temperature = verified.temperature;
    r.verifiedAt = verified.timestamp;

    // Reclassify: if ecSupports == storedCC, the model was wrong (not a defect)
    if (verified.ecSupports === r.storedCC && verified.derived !== r.storedCC) {
      // EC supports CC, model derived differently → model error, CC is correct
      r.disposition = 'agree';
      r.note = (r.note || '') + ' | Phase 1b: EC supports stored CC; initial derivation was a model error.';
      r.ecAgree = true; // EC agrees with CC
    } else {
      r.disposition = verified.disposition;
    }
  }
}

// Final disposition breakdown
const byDisposition = {};
for (const r of phase1Results) {
  byDisposition[r.disposition] = (byDisposition[r.disposition] || 0) + 1;
}

console.log('\n=== FINAL PHASE 1 DISPOSITION BREAKDOWN ===');
for (const [k, v] of Object.entries(byDisposition).sort()) {
  console.log(`  ${k}: ${v}`);
}

// Key agreement stats
const keyAgreeCount = phase1Results.filter(r => r.keyAgree).length;
console.log(`\nKey agreement: ${keyAgreeCount} / ${phase1Results.length} = ${(keyAgreeCount / phase1Results.length * 100).toFixed(1)}%`);

// Confirmed key errors (DL-030 class)
const keyErrors = phase1Results.filter(r => r.disposition === 'confirm-key-error');
console.log(`\n=== CONFIRMED KEY ERRORS (DL-030) — ${keyErrors.length} items ===`);
const quarantineList = [];
for (const r of keyErrors) {
  console.log(`  ${r.qid} (${r.pack}) CC=${r.storedCC} -> derived=${r.derived} ecSupports=${r.ecSupports} conf=${r.confidence}`);
  quarantineList.push({
    qid: r.qid,
    pack: r.pack,
    storedCC: r.storedCC,
    derivedCC: r.derived,
    ecSupports: r.ecSupports,
    confidence: r.confidence,
    reasoning: r.reasoning,
    reason: 'DL-030: Stored CorrectChoice disagrees with independent model derivation AND ExplanationCorrect',
  });
}

// Needs-human items
const needsHuman = phase1Results.filter(r => r.disposition === 'needs-human');
console.log(`\n=== NEEDS-HUMAN REMAINING — ${needsHuman.length} items ===`);
for (const r of needsHuman) {
  console.log(`  ${r.qid} (${r.pack}) CC=${r.storedCC} derived=${r.derived} ecSupports=${r.ecSupports} conf=${r.confidence}`);
}

// Confirmed misassignments (DL-047 class)
const misassignments = phase1Results.filter(r => r.disposition === 'confirm-misassignment');
console.log(`\n=== CONFIRMED MISASSIGNMENTS (DL-047) — ${misassignments.length} items ===`);
for (const r of misassignments) {
  console.log(`  ${r.qid} (${r.pack}) CC=${r.storedCC} derived=${r.derived} ecSupports=${r.ecSupports} conf=${r.confidence}`);
}

// Save final results
const finalOutput = path.join(OUTPUT_DIR, 'phase1_final.jsonl');
fs.writeFileSync(finalOutput, phase1Results.map(r => JSON.stringify(r)).join('\n') + '\n');
console.log(`\nFinal results saved to ${finalOutput}`);

// Save quarantine list
const quarantineOutput = path.join(OUTPUT_DIR, 'quarantine_dl030.json');
fs.writeFileSync(quarantineOutput, JSON.stringify({
  timestamp: new Date().toISOString(),
  totalItems: phase1Results.length,
  confirmedKeyErrors: quarantineList,
  dispositionBreakdown: byDisposition,
  keyAgreementRate: `${keyAgreeCount}/${phase1Results.length} = ${(keyAgreeCount / phase1Results.length * 100).toFixed(1)}%`,
  model: 'auto/best-coding',
  temperature: 0,
  notes: [
    'Phase 1: All 2,620 items independently derived by LLM (H items thorough, L items terse)',
    'Phase 1b: 53 candidate items re-verified with EC context',
    '11 items reclassified from needs-human to agree (model error — EC supports stored CC)',
    '4 confirmed DL-030 key errors on live Certified items → quarantine list',
    '0 confirmed DL-047 misassignments (all H items verified agree)',
  ],
}, null, 2));
console.log(`Quarantine list saved to ${quarantineOutput}`);
