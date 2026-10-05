/**
 * semantic_key_verifier.js — DL-047 pre-flip semantic key/explanation gate
 *
 * Deterministic screens (A–E) over MCQ packs. Designed as a pre-certification-
 * flip gate: BLOCK on high-confidence B:INVERSION (EC substantively describes
 * a different choice than the stored key), REVIEW on moderate-confidence flags.
 *
 * Screen definitions (shared with scripts/lib/semantic_screens.js):
 *   A  Exact-phrase fingerprints — cross-item contamination (WARN)
 *   B  EC lead-token echo — key inversion (BLOCK/REVIEW/WARN)
 *   C  EC–stem topical mismatch (WARN)
 *   D  EW lowercase-fragment — misfiled justification (WARN)
 *   E  Generalized DL-010 — EW misassignment with intact key (WARN)
 *
 * B:INVERSION methodology note (2026-09-20):
 *   The lead-phrase method (EC lead-token vs choice lead-token keyword recall)
 *   produces systematic false positives on calculation items where the EC’s opening
 *   formula/number statement coincidentally matches a distractor’s lead phrase.
 *   All 29 BLOCK candidates from the 2026-09-20 calibration run were confirmed
 *   as false positives by independent human review. B:INVERSION is demoted from
 *   BLOCK to REVIEW-only advisory flag. Genuine EC→choice contamination (genuine
 *   inversions) is still caught — the 9 known DL-047 items pass regression because
 *   their EC substantively describes a different topic, not just a lead-phrase match.
 *
 * B:INVERSION threshold tiers (REVIEW-only — demoted 2026-09-20):
 *   - bestRecall >= 85% AND margin >= 40% → REVIEW (known FP or needs human review)
 *   - bestRecall >= 60% AND margin >= 25% → REVIEW (may be real; human needed)
 *   - bestRecall < 60% OR margin < 25% → PASS
 *
 *   Actual BLOCK (exit 1) only fires if a non-FP BLOCK-tier candidate is found.
 *
 * Usage:
 *   node scripts/semantic_key_verifier.js [--all] [--gate] [--audit] [--pack <file>]
 *
 *   --all   Scan all P1 + P2 MCQ packs (default)
 *   --pack  Scan a specific pack file
 *   --gate  BLOCK mode: exit 1 if BLOCK flags found; exit 0 if clean (default)
 *   --audit Full-report mode: exit 0 always; write detailed JSON
 *
 *   No flags: --gate assumed (pipeline integration).
 *
 * Exit codes:
 *   0  Clean (gate mode) or report written (audit mode)
 *   1  BLOCK — high-confidence inversion found (gate mode only)
 *
 * Output: scripts/output/semantic_key_verifier.json
 *
 * READ-ONLY. No writes to pack files, registries, or answer keys.
 * Deterministic: count-stable across re-runs per AGENTS.md §6.
 *
 * Do NOT auto-remediate from output (DL-045 doctrine).
 */

'use strict';

const path = require('path');
const fs = require('fs');

const { parsePack } = require('./lib/pack_parser');
const { runScreens } = require('./lib/semantic_screens');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT = path.join(__dirname, 'output', 'semantic_key_verifier.json');

// ── Pack definitions ───────────────────────────────────────────────────────────

const P1_PACKS = [
  { file: 'content/packs/pack_a_corrected.js', label: 'P1-A' },
  { file: 'content/packs/pack_b_corrected.js', label: 'P1-B' },
  { file: 'content/packs/pack_c_corrected.js', label: 'P1-C' },
  { file: 'content/packs/pack_d_corrected.js', label: 'P1-D' },
  { file: 'content/packs/pack_e_corrected.js', label: 'P1-E' },
];

const P2_PACKS = [
  { file: 'p2/pack_p2_a.js', label: 'P2-A' },
  { file: 'p2/pack_p2_b.js', label: 'P2-B' },
  { file: 'p2/pack_p2_c.js', label: 'P2-C' },
  { file: 'p2/pack_p2_d.js', label: 'P2-D' },
  { file: 'p2/pack_p2_e.js', label: 'P2-E' },
  { file: 'p2/pack_p2_f.js', label: 'P2-F' },
];

// ── Pack-list drift check (config vs hardcoded) ─────────────────────────
// Drift vector H: semantic screens pack list diverges from validator config.
let PACK_DRIFT_WARN = false;
try {
  const config = require('./config.js');
  // config.questionPacks and part2QuestionPacks are arrays of STRING paths
  const expectedP1 = (config.questionPacks || []);
  const expectedP2 = (config.part2QuestionPacks || []);
  const allExpected = [...expectedP1, ...expectedP2].sort();
  const allHardcoded = [...P1_PACKS, ...P2_PACKS].map(p => p.file).sort();
  const missing = allExpected.filter(f => !allHardcoded.includes(f));
  const extra = allHardcoded.filter(f => !allExpected.includes(f));
  if (missing.length || extra.length) {
    console.warn('WARN: Semantic key verifier pack-list drift — missing:', missing.join(', ') || 'none', '| extra:', extra.join(', ') || 'none');
    PACK_DRIFT_WARN = true;
  }
} catch (e) {
  console.warn('WARN: Pack-list drift check failed:', e.message);
}

// ── Threshold calibration ───────────────────────────────────────────────────────

const BLOCK_RECALL = 85;   // % — very high confidence: EC substantively about wrong choice
const BLOCK_MARGIN = 40;   // pp — gap between best and stored-CC recall
const REVIEW_RECALL = 60; // % — moderate confidence: review required
const REVIEW_MARGIN = 25; // pp

// Known false positives — lead-phrase method produces systematic FPs on calculation
// items where EC's first clause coincidentally matches a distractor's lead phrase.
// All 29 confirmed by independent human review (2026-09-20). Demoted to REVIEW.
const KNOWN_FP = new Set([
  'P1-A-011','P1-C-115','P1B-B-102','P1B-C-179','P1B-D-109',
  'P1B-B-216','P1B-B-228','P1B-C-226','P1E-A-005','P1E-B-039',
  'P2-A-004','P2-A-102','P2-A-128','P2-A-345','P2-A-376',
  'P2-B-005','P2-B-061','P2-B-063','P2-B-104','P2-B-115',
  'P2-B-229','P2-B-353','P2-B-444','P2-B-445','P2-B-475',
  'P2-C-065','P2-C-122','P2-D-403','P2-E-299',
]);

// ── Item loader ────────────────────────────────────────────────────────────────

function loadPack(packDef) {
  const fp = path.join(ROOT, packDef.file);
  if (!fs.existsSync(fp)) {
    return { items: [], loc: {}, stats: { questions: 0, diagnostics: 0, records: 0 }, missing: true };
  }

  const content = fs.readFileSync(fp, 'utf8');
  const parsed = parsePack(content, { sourceName: packDef.label });

  const items = [];
  const loc = {};

  for (const rec of parsed.records) {
    const o = rec.object;
    if (!o || typeof o.QuestionID !== 'string') continue;

    loc[o.QuestionID] = { file: packDef.file, line: rec.line };

    // Normalize Choices object (supports both Choices.A and o.Choices.A forms)
    const choices = {};
    if (o.Choices && typeof o.Choices === 'object') {
      for (const L of ['A', 'B', 'C', 'D']) {
        choices[L] = o.Choices[L] || null;
      }
    }

    // Normalize ExplanationWrong (absent keys treated as empty strings)
    const ew = {};
    for (const L of ['A', 'B', 'C', 'D']) {
      const key = 'ExplanationWrong' + L;
      ew[L] = key in o && typeof o[key] === 'string' ? o[key] : '';
    }

    items.push({
      qid: o.QuestionID,
      pack: packDef.label,
      questionState: o.question_state || 'Unprocessed',
      stem: o.Stem || '',
      choices,
      correctChoice: o.CorrectChoice || null,
      explanationCorrect: o.ExplanationCorrect || null,
      explanationWrong: ew,
    });
  }

  return {
    items,
    loc,
    stats: {
      questions: items.length,
      diagnostics: parsed.diagnostics ? parsed.diagnostics.length : 0,
      records: parsed.records ? parsed.records.length : 0,
    },
  };
}

// ── Main ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const mode = args.includes('--audit') ? 'audit' : 'gate';
const targetAll = !args.includes('--pack');

let targetPacks = [];
if (args.includes('--pack')) {
  const idx = args.indexOf('--pack');
  const targetFile = args[idx + 1];
  if (!targetFile) {
    console.error('ERROR: --pack requires a file path argument'); process.exit(1);
  }
  const found = [...P1_PACKS, ...P2_PACKS].filter(p =>
    p.file.endsWith(targetFile) || path.join(ROOT, targetFile).endsWith(p.file)
  );
  if (!found.length) {
    console.error(`ERROR: Unknown pack file: ${targetFile}`); process.exit(1);
  }
  targetPacks = found;
} else {
  targetPacks = [...P1_PACKS, ...P2_PACKS];
}

// ── Load ─────────────────────────────────────────────────────────────────────

const allItems = [];
const allLoc = {};
const packStats = {};
let totalQuestions = 0;
let totalCertified = 0;

for (const pack of targetPacks) {
  const { items, loc, stats, missing } = loadPack(pack);
  if (missing) { console.warn(`WARN: ${pack.file} not found — skipped`); continue; }
  allItems.push(...items);
  Object.assign(allLoc, loc);
  packStats[pack.label] = { ...stats, file: pack.file };
  totalQuestions += stats.questions;
  totalCertified += items.filter(i => i.questionState === 'Certified').length;
}

console.log(`\n=== SEMANTIC KEY VERIFIER ===`);
console.log(`Mode: ${mode}`);
console.log(`Packs: ${Object.keys(packStats).join(', ')}`);
console.log(`Total: ${totalQuestions} questions | Certified: ${totalCertified}`);

// ── Screens ──────────────────────────────────────────────────────────────────

const screens = runScreens(allItems, []); // P1 fingerprints intentionally excluded — gate only

// Enrich with file:line
for (const key of ['A', 'B', 'C', 'D', 'E']) {
  const scr = screens[key];
  if (!scr) continue;
  for (const flag of scr.flags) {
    const l = allLoc[flag.qid];
    if (l) { flag.file = l.file; flag.line = l.line; }
  }
}

// ── B:INVERSION tiering ───────────────────────────────────────────────────────

const bAll = screens.B ? screens.B.flags : [];

const bBlock = bAll.filter(f =>
  f.bestRecall >= BLOCK_RECALL && f.margin >= BLOCK_MARGIN
);
// Demote known FPs — all 29 confirmed by independent review (2026-09-20)
const bBlockGenuine = bBlock.filter(f => !KNOWN_FP.has(f.qid));
const bBlockFP = bBlock.filter(f => KNOWN_FP.has(f.qid));
bBlockFP.forEach(f => { f.knownFP = true; });
const bReview = bAll.filter(f =>
  f.bestRecall >= REVIEW_RECALL && f.margin >= REVIEW_MARGIN &&
  !(f.bestRecall >= BLOCK_RECALL && f.margin >= BLOCK_MARGIN)
);
const bWarn = bAll.filter(f =>
  !(f.bestRecall >= REVIEW_RECALL && f.margin >= REVIEW_MARGIN)
);

const YIELD_LABELS = {
  A: 'exact-phrase fingerprints',
  B: 'EC lead-token echo (INVERSION)',
  C: 'EC–stem mismatch',
  D: 'EW lowercase-fragment',
  E: 'generalized DL-010',
};

console.log(`\n=== SCREEN YIELDS (${totalQuestions} items) ===`);
console.log(`  Screen A: ${screens.A ? screens.A.flags.length : 0} flags`);
console.log(`  Screen B (INVERSION): ${bAll.length} total | BLOCK ${bBlockGenuine.length} (${bBlockFP.length} known FP demoted to REVIEW) | REVIEW ${bReview.length} | WARN ${bWarn.length}`);
console.log(`  Screen C: ${screens.C ? screens.C.flags.length : 0} flags`);
console.log(`  Screen D: ${screens.D ? screens.D.flags.length : 0} flags`);
console.log(`  Screen E: ${screens.E ? screens.E.flags.length : 0} flags`);

if (bBlockGenuine.length) {
  console.log(`\nBLOCK candidates (bestRecall >= ${BLOCK_RECALL}%, margin >= ${BLOCK_MARGIN}pp):`);
  bBlockGenuine.forEach(f =>
    console.log(`  ${f.qid} | CC=${f.storedCC} bestMatch=${f.bestLetter} ` +
      `recall=${f.bestRecall}% margin=${f.margin}% | ${f.file}:${f.line}`)
  );
}
if (bBlockFP.length) {
  console.log(`\nBLOCK demoted to REVIEW (known FPs — independent human review 2026-09-20):`);
  bBlockFP.forEach(f =>
    console.log(`  ${f.qid} | CC=${f.storedCC} bestMatch=${f.bestLetter} ` +
      `recall=${f.bestRecall}% margin=${f.margin}% | ${f.file}:${f.line}`)
  );
}

// ── Gate ──────────────────────────────────────────────────────────────────────

if (mode === 'gate') {
  if (bBlockGenuine.length > 0) {
    console.log(`\n=== GATE RESULT: BLOCK (${bBlockGenuine.length} high-confidence inversion[s]) ===`);
    writeOutput({ ok: false, block: true, bBlock: bBlockGenuine, bBlockFP, bReview, bWarn, screens, packStats, totalQuestions, totalCertified });
    process.exit(1);
  } else if (bReview.length > 0) {
    console.log(`\n=== GATE RESULT: REVIEW (${bReview.length} moderate-confidence flag[s]) ===`);
    console.log(`  Gate PASSES — no BLOCK flags. ${bReview.length} REVIEW flags require human adjudication before flipping any of these QIDs to Certified.`);
    bReview.forEach(f =>
      console.log(`  ${f.qid} | CC=${f.storedCC} bestMatch=${f.bestLetter} ` +
        `recall=${f.bestRecall}% margin=${f.margin}% | ${f.file}:${f.line}`)
    );
    writeOutput({ ok: true, block: false, bBlock: [], bBlockFP: [], bReview, bWarn, screens, packStats, totalQuestions, totalCertified });
    process.exit(0);
  } else {
    console.log(`\n=== GATE RESULT: PASS ===`);
    writeOutput({ ok: true, block: false, bBlock: [], bBlockFP: bBlockFP, bReview: bReview, bWarn, screens, packStats, totalQuestions, totalCertified });
    process.exit(0);
  }
} else {
  // audit mode
  console.log(`\n=== AUDIT COMPLETE ===`);
  writeOutput({ ok: true, block: false, bBlock: bBlockGenuine, bBlockFP, bReview, bWarn, screens, packStats, totalQuestions, totalCertified });
  process.exit(0);
}

// ── Output ────────────────────────────────────────────────────────────────────

function writeOutput(result) {
  const dir = path.dirname(OUTPUT);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const report = {
    timestamp: new Date().toISOString(),
    mode,
    thresholds: {
      block: { bestRecall: BLOCK_RECALL, margin: BLOCK_MARGIN },
      review: { bestRecall: REVIEW_RECALL, margin: REVIEW_MARGIN },
    },
    scope: {
      packs: targetPacks.map(p => p.file),
      totalQuestions,
      totalCertified,
    },
    gateResult: result.ok ? (result.block ? 'BLOCK' : 'PASS') : 'BLOCK',
    bFlags: {
      total: (result.bBlock || []).length + (result.bReview || []).length + (result.bWarn || []).length,
      block: result.bBlock || [],
      blockFP: result.bBlockFP || [],  // demoted to REVIEW — known FPs by human review
      review: result.bReview || [],
      warn: result.bWarn || [],
    },
    screenYields: Object.fromEntries(
      Object.entries(YIELD_LABELS).map(([k, name]) => [k, { name, count: screens[k] ? screens[k].flags.length : 0 }])
    ),
    screens: Object.fromEntries(
      Object.entries(screens).map(([k, v]) => [k, { name: YIELD_LABELS[k] || v.name, flags: v.flags }])
    ),
    packStats,
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Report written to ${OUTPUT}`);
}

// ── Self-test ────────────────────────────────────────────────────────────────

/**
 * Regression test — verify known DL-047 items are correctly categorized.
 * Run with: node -e "require('./scripts/semantic_key_verifier').runSelfTest()"
 *
 * Confirmed DL-047 items (all remediated 2026-09-05) should appear in
 * bBlock (if genuine EC→choice contamination) or bWarn/bReview (if the
 * screen's noisy vocabulary-overlap triggers). A clean PASS for the
 * confirmed-fixed items means the remediation held.
 *
 * P1B-B-102 (Group B, key intact, EW contaminated): if it appears in
 * bBlock it suggests residual EC contamination from the original authoring.
 *
 * Expected: all confirmed DL-047 items = bWarn or bReview (NOT bBlock),
 * since the original inversions were fixed. P1B-B-102 is a watch item.
 */
function runSelfTest() {
  const { loadP2 } = require('./semantic_key_audit_p2');
  const allPacks = [...P1_PACKS, ...P2_PACKS];
  const allItems = [];
  const allLoc = {};

  for (const pack of allPacks) {
    const fp = path.join(ROOT, pack.file);
    if (!fs.existsSync(fp)) continue;
    const content = fs.readFileSync(fp, 'utf8');
    const parsed = parsePack(content, { sourceName: pack.label });
    for (const rec of parsed.records) {
      const o = rec.object;
      if (!o || typeof o.QuestionID !== 'string') continue;
      allLoc[o.QuestionID] = { file: pack.file, line: rec.line };
      const choices = {};
      if (o.Choices && typeof o.Choices === 'object') {
        for (const L of ['A', 'B', 'C', 'D']) choices[L] = o.Choices[L] || null;
      }
      const ew = {};
      for (const L of ['A', 'B', 'C', 'D']) {
        const k = 'ExplanationWrong' + L;
        ew[L] = k in o && typeof o[k] === 'string' ? o[k] : '';
      }
      allItems.push({
        qid: o.QuestionID, pack: pack.label,
        questionState: o.question_state || 'Unprocessed',
        stem: o.Stem || '', choices,
        correctChoice: o.CorrectChoice || null,
        explanationCorrect: o.ExplanationCorrect || null,
        explanationWrong: ew,
      });
    }
  }

  const s = runScreens(allItems, []);
  const bAll = s.B ? s.B.flags : [];
  const bBlock = bAll.filter(f => f.bestRecall >= BLOCK_RECALL && f.margin >= BLOCK_MARGIN);
  const bReview = bAll.filter(f =>
    f.bestRecall >= REVIEW_RECALL && f.margin >= REVIEW_MARGIN &&
    !(f.bestRecall >= BLOCK_RECALL && f.margin >= BLOCK_MARGIN)
  );
  const bWarn = bAll.filter(f =>
    !(f.bestRecall >= REVIEW_RECALL && f.margin >= REVIEW_MARGIN)
  );

  const KNOWN = [
    'P1-F-009','P1-E-056','P1-F-054',
    'P1-EC-001','P1-EC-005','P1-EC-010','P1-EC-055',
    'P1-DD-022','P1B-B-102',
  ];

  let pass = 0, fail = 0;
  console.log('\n=== DL-047 Regression Check ===');
  for (const qid of KNOWN) {
    const flag = bAll.find(f => f.qid === qid);
    const tier = bBlock.find(f => f.qid === qid) ? 'BLOCK' :
                 bReview.find(f => f.qid === qid) ? 'REVIEW' :
                 bWarn.find(f => f.qid === qid) ? 'WARN' : 'CLEAN';
    const expected = qid === 'P1B-B-102' ? ['BLOCK','REVIEW'] : ['REVIEW','WARN','CLEAN'];
    const status = expected.includes(tier) ? 'PASS' : 'FAIL';
    if (status === 'PASS') pass++; else fail++;
    console.log(`  [${status}] ${qid} → ${tier} ${flag ? `(recall=${flag.bestRecall}% margin=${flag.margin}%)` : ''}`);
  }
  console.log(`\nResult: ${pass}/${pass+fail} PASS`);
  return { pass, fail, total: pass + fail };
}

module.exports = { runSelfTest };
