/**
 * semantic_key_audit_p2.js — Part 2 semantic key/explanation audit (DL-047 family)
 *
 * Deterministic screens A–E shared with the P1 census via
 * scripts/lib/semantic_screens.js, run over the six Part 2 MCQ packs:
 *   A  exact-phrase fingerprints (P1 patterns = cross-part spread check A0;
 *      P2-native fingerprint list is empty until findings populate it)
 *   B  EC lead-token echo (Certified-only, as in P1)
 *   B-num  numeric-literal echo (P2 addition: which choice's numbers does EC repeat?)
 *   C  EC–stem topical mismatch
 *   D  EW lowercase-fragment
 *   E  generalized DL-010 (own-choice recall < 0.25, other-choice >= 0.5)
 *
 * SCOPE: MCQ packs only. P2 case packs (CBQ2x-*, Type/Prompt/Correct/Explanation,
 * no choice slots) cannot carry key/explanation-agreement defects of this class
 * and are explicitly out of scope (documented residual, mirrors P1 DL-047).
 * Screen B skips the 14 P2-A `In Audit` items (Certified-only by design);
 * they are re-screened at certification.
 *
 * READ-ONLY audit. Writes only scripts/output/semantic_key_audit_p2.json.
 * Adjudication/quarantine/remediation are held for human review (DL-047 flow).
 */
'use strict';

const path = require('path');
const fs = require('fs');
const { parsePack } = require('./lib/pack_parser');
const { P1_CONTAMINANT_PATTERNS, runScreens } = require('./lib/semantic_screens');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const P2_FILES = [
  { file: 'p2/pack_p2_a.js', label: 'P2-A' },
  { file: 'p2/pack_p2_b.js', label: 'P2-B' },
  { file: 'p2/pack_p2_c.js', label: 'P2-C' },
  { file: 'p2/pack_p2_d.js', label: 'P2-D' },
  { file: 'p2/pack_p2_e.js', label: 'P2-E' },
  { file: 'p2/pack_p2_f.js', label: 'P2-F' },
];

function loadP2() {
  const items = [];
  const loc = {}; // qid -> { file, line }
  const stats = {};
  const absentEW = []; // benign DL-018 variant census (absent key == CC)

  for (const { file, label } of P2_FILES) {
    const content = fs.readFileSync(path.join(PROJECT_ROOT, file), 'utf8');
    const parsed = parsePack(content, { sourceName: label });
    let n = 0;
    for (const rec of parsed.records) {
      const o = rec.object;
      if (!o || typeof o.QuestionID !== 'string') continue;
      n++;
      loc[o.QuestionID] = { file, line: rec.line };
      const ew = {};
      for (const L of ['A', 'B', 'C', 'D']) {
        if (typeof o['ExplanationWrong' + L] === 'string') ew[L] = o['ExplanationWrong' + L];
        else absentEW.push({ qid: o.QuestionID, pack: label, slot: L, cc: o.CorrectChoice, state: o.question_state });
      }
      items.push({
        qid: o.QuestionID,
        pack: label,
        questionState: o.question_state,
        stem: o.Stem || '',
        choices: o.Choices || null,
        correctChoice: o.CorrectChoice || null,
        explanationCorrect: o.ExplanationCorrect || null,
        explanationWrong: ew,
      });
    }
    stats[label] = { file, records: parsed.records.length, diagnostics: parsed.diagnostics.length, questions: n };
  }
  return { items, loc, stats, absentEW };
}

function numericLiterals(text) {
  if (!text || typeof text !== 'string') return [];
  const m = text.match(/\$?\d[\d,]*(?:\.\d+)?%?/g) || [];
  return m.map(s => s.replace(/[$,%]/g, ''));
}

// Screen B-num: for choices carrying >= 2 numeric literals, which choice's
// number set does the EC repeat? Flags CC/EC disagreement on numeric items
// that the word-based lead-token screen skips.
function screenBNum(certItems) {
  const flags = [];
  for (const item of certItems) {
    if (!item.explanationCorrect || !item.choices || !item.correctChoice) continue;
    const ecLits = new Set(numericLiterals(item.explanationCorrect));
    if (ecLits.size === 0) continue;
    const cc = item.correctChoice;
    const recalls = {};
    const counts = {};
    for (const L of ['A', 'B', 'C', 'D']) {
      const lits = numericLiterals(item.choices[L]);
      counts[L] = lits.length;
      if (lits.length < 2) { recalls[L] = -1; continue; }
      const hit = lits.filter(x => ecLits.has(x)).length;
      recalls[L] = hit / lits.length;
    }
    let best = null, bestR = -1;
    for (const L of ['A', 'B', 'C', 'D']) {
      if (recalls[L] > bestR) { bestR = recalls[L]; best = L; }
    }
    const ccR = recalls[cc] === -1 ? 0 : recalls[cc];
    if (best !== cc && bestR >= 0.6 && (bestR - ccR) >= 0.3) {
      flags.push({
        qid: item.qid,
        pack: item.pack,
        storedCC: cc,
        bestLetter: best,
        bestRecall: Number((bestR * 100).toFixed(1)),
        ccRecall: Number((ccR * 100).toFixed(1)),
        margin: Number(((bestR - ccR) * 100).toFixed(1)),
        ecPreview: item.explanationCorrect.substring(0, 120),
      });
    }
  }
  return flags;
}

function main() {
  const { items, loc, stats, absentEW } = loadP2();
  const cert = items.filter(i => i.questionState === 'Certified');

  console.log('=== P2 PARSE ===');
  for (const [label, s] of Object.entries(stats)) {
    console.log(`  ${label}: ${s.questions} questions, ${s.diagnostics} diagnostics`);
  }
  console.log(`  Total: ${items.length} | Certified: ${cert.length}`);
  console.log(`  Absent EW keys (all benign DL-018 variant, absent==CC): ${absentEW.length}`);

  const screens = runScreens(items, P1_CONTAMINANT_PATTERNS);
  const bnum = screenBNum(cert);

  // Enrich flags with file:line evidence
  for (const scr of Object.values(screens)) {
    for (const f of scr.flags) {
      const l = loc[f.qid];
      if (l) { f.file = l.file; f.line = l.line; }
    }
  }
  for (const f of bnum) {
    const l = loc[f.qid];
    if (l) { f.file = l.file; f.line = l.line; }
  }
  for (const f of absentEW) {
    const l = loc[f.qid];
    if (l) { f.file = l.file; f.line = l.line; }
  }

  const yields = Object.fromEntries(Object.entries(screens).map(([k, v]) => [k, v.flags.length]));
  yields['B-num'] = bnum.length;
  console.log('\n=== P2 SCREEN YIELDS ===');
  for (const [k, v] of Object.entries({ ...Object.fromEntries(Object.entries(screens).map(([k, s]) => [k, `${s.name}`])), 'B-num': 'numeric-literal echo' })) {
    console.log(`  Screen ${k} (${v}): ${yields[k]} flags`);
  }

  const out = {
    timestamp: new Date().toISOString(),
    scope: {
      packs: P2_FILES.map(p => p.file),
      totalItems: items.length,
      certifiedItems: cert.length,
      screenBCertifiedOnly: true,
      inAuditExcludedFromB: items.filter(i => i.questionState === 'In Audit').map(i => i.qid),
      casePacksOutOfScope: 'P2 case items (CBQ2x-*) carry Type/Prompt/Correct/Explanation with no choice slots; no key/explanation-agreement screen applies. Documented residual.',
      patternsUsed: { A: 'P1_CONTAMINANT_PATTERNS (cross-part spread A0); P2-native list empty' },
      absentEWBenignVariant: 'all absent keys equal the item CC (DL-018 class); screens skip absent keys',
    },
    stats,
    screenYields: yields,
    screens: { ...screens, 'B-num': { name: 'numeric-literal echo', flags: bnum } },
    absentEW,
  };
  const outputPath = path.join(__dirname, 'output', 'semantic_key_audit_p2.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(out, null, 2), 'utf8');
  console.log(`\nFull results saved to ${outputPath}`);
}

if (require.main === module) main();

module.exports = { loadP2, screenBNum, P2_FILES };
