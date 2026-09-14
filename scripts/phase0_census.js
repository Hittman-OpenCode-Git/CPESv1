/**
 * phase0_census.js — P1 FULL-POOL KEY-DERIVATION CENSUS: Phase 0 Deterministic Screens (v2)
 *
 * Thin P1 driver over scripts/lib/semantic_screens.js (shared with the P2
 * semantic audit). Screen logic lives in the lib; this file only loads the
 * five Part 1 packs and writes output/phase0_results_v2.json.
 */
'use strict';

const path = require('path');
const fs = require('fs');
const { parsePack, toCanonicalRecords } = require('./lib/pack_parser');
const { P1_CONTAMINANT_PATTERNS, runScreens } = require('./lib/semantic_screens');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const PACK_DIR = path.join(PROJECT_ROOT, 'content', 'packs');

const PACK_FILES = [
  { name: 'pack_a_corrected.js', label: 'A' },
  { name: 'pack_b_corrected.js', label: 'B' },
  { name: 'pack_c_corrected.js', label: 'C' },
  { name: 'pack_d_corrected.js', label: 'D' },
  { name: 'pack_e_corrected.js', label: 'E' },
];

function loadAllItems() {
  const allItems = [];
  const parseStats = {};

  for (const { name, label } of PACK_FILES) {
    const filePath = path.join(PACK_DIR, name);
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = parsePack(content, { sourceName: label });
    const canonical = toCanonicalRecords(parsed);

    parseStats[label] = {
      file: name,
      records: parsed.records.length,
      diagnostics: parsed.diagnostics.length,
      canonicalRecords: canonical.length,
    };

    // Pair canonical records with raw records to get stem
    for (let i = 0; i < canonical.length; i++) {
      const rawRec = parsed.records[i];
      canonical[i].stem = (rawRec && rawRec.object && rawRec.object.Stem) || '';
    }

    for (const rec of canonical) {
      allItems.push({
        qid: rec.qid,
        pack: label,
        questionState: rec.questionState,
        architecture: rec.architecture,
        stem: rec.stem,
        choices: rec.choices,
        correctChoice: rec.correctChoice,
        explanationCorrect: rec.explanationCorrect,
        explanationWrong: rec.explanationWrong,
        warnings: rec.warnings,
      });
    }
  }

  return { allItems, parseStats };
}

function main() {
  const { allItems, parseStats } = loadAllItems();

  console.log('=== PARSE STATS ===');
  for (const [label, stats] of Object.entries(parseStats)) {
    console.log(`  Pack ${label}: ${stats.records} records, ${stats.diagnostics} diagnostics, ${stats.canonicalRecords} canonical`);
  }
  console.log(`  Total items: ${allItems.length}`);
  console.log(`  Certified items: ${allItems.filter(i => i.questionState === 'Certified').length}`);
  console.log(`  Items with stem: ${allItems.filter(i => i.stem && i.stem.length > 0).length}`);

  const screenResults = runScreens(allItems, P1_CONTAMINANT_PATTERNS);

  console.log('\n=== SCREEN YIELDS (Run 1 - V2) ===');
  for (const [key, result] of Object.entries(screenResults)) {
    console.log(`  Screen ${key} (${result.name}): ${result.flags.length} flags`);
  }

  const outputPath = path.join(__dirname, 'output', 'phase0_results_v2.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    parseStats,
    totalCount: allItems.length,
    certifiedCount: allItems.filter(i => i.questionState === 'Certified').length,
    screenYields: Object.fromEntries(
      Object.entries(screenResults).map(([k, v]) => [k, v.flags.length])
    ),
    screens: screenResults,
  }, null, 2), 'utf-8');

  console.log(`\nFull results saved to ${outputPath}`);
}

if (require.main === module) main();

module.exports = { loadAllItems, PACK_FILES };
