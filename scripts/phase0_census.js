/**
 * phase0_census.js — P1 FULL-POOL KEY-DERIVATION CENSUS: Phase 0 Deterministic Screens (v2)
 *
 * Fixes from v1:
 *   - Screen A: Use multi-phrase patterns (ALL phrases must match in same text field)
 *     instead of individual substrings, eliminating generic-term false positives.
 *   - Screen C: Include stem text in Jaccard computation; filter numeric-only choices.
 *   - Canonical records now include stem from raw parsed records.
 */
'use strict';

const path = require('path');
const fs = require('fs');
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PACK_DIR = path.join(PROJECT_ROOT, 'content', 'packs');

const PACK_FILES = [
  { name: 'pack_a_corrected.js', label: 'A' },
  { name: 'pack_b_corrected.js', label: 'B' },
  { name: 'pack_c_corrected.js', label: 'C' },
  { name: 'pack_d_corrected.js', label: 'D' },
  { name: 'pack_e_corrected.js', label: 'E' },
];

const STOPWORDS = new Set([
  'the','a','an','of','to','in','for','and','or','but','is','are','was','were','be',
  'been','being','have','has','had','do','does','did','will','would','could','should',
  'may','might','can','shall','must','about','above','after','again','all','also',
  'although','among','as','at','by','from','if','into','not','than','that','their',
  'these','they','this','its','it','on','with','which','who','how','what','when',
  'where','while','under','between','through','during','before','each','both','few',
  'more','some','such','only','own','same','so','too','very','just','all','any',
  'use','one','our','out','her','his','from','has','had','would','when','who',
  'these','their','this','its','are','but','not','you','can','may','all','has',
]);

function contentWords(text) {
  if (!text || typeof text !== 'string') return new Set();
  const tokens = text.toLowerCase().match(/[a-z]{4,}/g) || [];
  const words = new Set();
  for (const t of tokens) {
    if (!STOPWORDS.has(t)) words.add(t);
  }
  return words;
}

function recall(queryWords, docWords) {
  if (queryWords.size === 0) return -1;
  let overlap = 0;
  for (const w of queryWords) {
    if (docWords.has(w)) overlap++;
  }
  return overlap / queryWords.size;
}

function jaccard(a, b) {
  if (a.size === 0 && b.size === 0) return 1;
  let intersection = 0;
  for (const w of a) {
    if (b.has(w)) intersection++;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 1 : intersection / union;
}

function leadPhrase(text) {
  if (!text) return '';
  const commaIdx = text.indexOf(',');
  return commaIdx >= 0 ? text.substring(0, commaIdx).trim() : text.trim();
}

// ── Screen A: Contaminant patterns (multi-phrase, ALL must match in same field) ──
// Each pattern: ALL listed phrases must appear in the SAME text field for a hit.
// This eliminates false positives from generic individual terms.
const CONTAMINANT_PATTERNS = [
  {
    label: 'P1-F-009_foreign_EC_continuation',
    sourceQid: 'P1-F-009',
    phrases: ['because the data arrive after managers need them for pricing decisions'],
  },
  {
    label: 'P1-E-056_foreign_EC_IAM',
    sourceQid: 'P1-E-056',
    phrases: ['periodic access recertification', 'least privilege', 'MFA'],
  },
  {
    label: 'P1-EC-001_foreign_EC_finance',
    sourceQid: 'P1-EC-001',
    phrases: ['warehouse PO-creation', 'invoice-entry custody', 'duplicate-payment scheme'],
  },
  {
    label: 'P1-EC-005_foreign_EC_scenario',
    sourceQid: 'P1-EC-005',
    phrases: ['duplicate scheme undetected six months'],
  },
  {
    label: 'P1-EC-010_fraud_triangle',
    sourceQid: 'P1-EC-010',
    phrases: ['fraud-triangle pressure', 'fraud diamond'],
  },
  {
    label: 'P1-EC-055_foreign_EC_governance',
    sourceQid: 'P1-EC-055',
    phrases: ['board independence', 'control-environment taxonomy'],
  },
  {
    label: 'P1-DD-022_foreign_EC_cost_accounting',
    sourceQid: 'P1-DD-022',
    phrases: ['$120,000 pool', '2,400 orders', 'Product A 600'],
  },
  {
    label: 'P1B-B-102_foreign_EW_budgeting',
    sourceQid: 'P1B-B-102',
    phrases: ['reciprocal method', 'cash budget', 'budget variance'],
  },
];

const { parsePack, toCanonicalRecords } = require(path.join(__dirname, '..', 'scripts', 'lib', 'pack_parser.js'));

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

function runScreens(items) {
  const results = {
    A: { name: 'exact-phrase fingerprints', flags: [] },
    B: { name: 'EC lead-token echo', flags: [] },
    C: { name: 'EC-stem mismatch', flags: [] },
    D: { name: 'EW lowercase-fragment', flags: [] },
    E: { name: 'generalized DL-010', flags: [] },
  };

  // ── Screen A: Exact-phrase fingerprints (multi-phrase patterns) ──
  for (const item of items) {
    const allText = [];
    if (item.explanationCorrect) allText.push({ field: 'EC', text: item.explanationCorrect });
    for (const l of ['A', 'B', 'C', 'D']) {
      if (item.explanationWrong && item.explanationWrong[l]) {
        allText.push({ field: 'EW_' + l, text: item.explanationWrong[l] });
      }
    }

    for (const entry of allText) {
      const textLower = entry.text.toLowerCase();
      for (const pattern of CONTAMINANT_PATTERNS) {
        // ALL phrases must appear in the same text field
        const allMatch = pattern.phrases.every(p => textLower.includes(p.toLowerCase()));
        if (allMatch) {
          results.A.flags.push({
            qid: item.qid,
            pack: item.pack,
            contaminant: pattern.label,
            sourceItem: pattern.sourceQid,
            isSourceItem: item.qid === pattern.sourceQid,
            field: entry.field,
            snippet: entry.text.substring(0, 200),
          });
        }
      }
    }
  }

  // ── Screen B: EC lead-token echo ──
  const certifiedItems = items.filter(it => it.questionState === 'Certified');

  for (const item of certifiedItems) {
    if (!item.explanationCorrect || !item.choices || !item.correctChoice) continue;

    const ecWords = contentWords(item.explanationCorrect);
    const cc = item.correctChoice;

    const recalls = {};
    const leadWordCounts = {};
    for (const letter of ['A', 'B', 'C', 'D']) {
      const choiceText = item.choices[letter];
      if (!choiceText) { recalls[letter] = -1; continue; }
      const lead = leadPhrase(choiceText);
      const leadWords = contentWords(lead);
      recalls[letter] = recall(leadWords, ecWords);
      leadWordCounts[letter] = leadWords.size;
    }

    // Min 3 content words in best-matching choice's lead phrase to avoid
    // false positives from calculation-based choices (e.g., "Product C: $40,000" = 1 word)
    let bestLetter = null, bestRecall = -1;
    for (const letter of ['A', 'B', 'C', 'D']) {
      if (recalls[letter] > bestRecall) {
        bestRecall = recalls[letter];
        bestLetter = letter;
      }
    }

    const ccRecall = recalls[cc] || 0;
    const margin = bestLetter !== cc ? (bestRecall - ccRecall) : 0;

    if (bestLetter !== cc && bestRecall >= 0.50 && margin >= 0.40 && leadWordCounts[bestLetter] >= 3) {
      results.B.flags.push({
        qid: item.qid,
        pack: item.pack,
        storedCC: cc,
        bestLetter,
        bestRecall: Number((bestRecall * 100).toFixed(1)),
        ccRecall: Number((ccRecall * 100).toFixed(1)),
        margin: Number((margin * 100).toFixed(1)),
        bestLeadWordCount: leadWordCounts[bestLetter],
        ecPreview: item.explanationCorrect.substring(0, 120),
      });
    }
  }

  // ── Screen C: EC-stem mismatch (including stem) ──
  for (const item of items) {
    if (!item.explanationCorrect || !item.choices) continue;

    const ecWords = contentWords(item.explanationCorrect);
    if (ecWords.size < 20) continue;

    // Build stem+choices text, filtering out pure-numeric choice text
    let combinedText = item.stem || '';
    for (const letter of ['A', 'B', 'C', 'D']) {
      const choiceText = item.choices[letter];
      if (choiceText) {
        // Only include choices with actual alphabetic content words
        const choiceWords = contentWords(choiceText);
        if (choiceWords.size > 0) {
          combinedText += ' ' + choiceText;
        }
      }
    }

    const stemChoiceWords = contentWords(combinedText);
    const j = jaccard(ecWords, stemChoiceWords);

    if (j < 0.05) {
      results.C.flags.push({
        qid: item.qid,
        pack: item.pack,
        jaccard: Number(j.toFixed(4)),
        ecWordCount: ecWords.size,
        stemPreview: (item.stem || '').substring(0, 60),
        ecPreview: item.explanationCorrect.substring(0, 80),
      });
    }
  }

  // ── Screen D: EW lowercase-fragment ──
  for (const item of items) {
    if (!item.explanationWrong) continue;
    for (const letter of ['A', 'B', 'C', 'D']) {
      const ew = item.explanationWrong[letter];
      if (!ew || typeof ew !== 'string' || ew.trim() === '') continue;
      const firstChar = ew.trim()[0];
      if (firstChar >= 'a' && firstChar <= 'z') {
        results.D.flags.push({
          qid: item.qid,
          pack: item.pack,
          slot: letter,
          isCorrectChoice: letter === item.correctChoice,
          textPreview: ew.trim().substring(0, 120),
        });
      }
    }
  }

  // ── Screen E: Generalized DL-010 ──
  for (const item of items) {
    if (!item.explanationWrong || !item.choices || !item.correctChoice) continue;
    const cc = item.correctChoice;

    for (const letter of ['A', 'B', 'C', 'D']) {
      if (letter === cc) continue;
      const ewText = item.explanationWrong[letter];
      if (!ewText || typeof ewText !== 'string' || ewText.length < 30) continue;

      const ewWords = contentWords(ewText);
      if (ewWords.size === 0) continue;

      const ownChoiceText = item.choices[letter];
      const ownWords = contentWords(ownChoiceText || '');
      const ownRecall = recall(ownWords, ewWords);

      if (ownRecall < 0.25) {
        let bestOther = -1;
        let bestOtherLetter = null;
        for (const other of ['A', 'B', 'C', 'D']) {
          if (other === letter) continue;
          const otherText = item.choices[other];
          const otherWords = contentWords(otherText || '');
          if (otherWords.size === 0) continue;
          const r = recall(otherWords, ewWords);
          if (r > bestOther) {
            bestOther = r;
            bestOtherLetter = other;
          }
        }

        if (bestOther >= 0.5) {
          results.E.flags.push({
            qid: item.qid,
            pack: item.pack,
            slot: letter,
            correctChoice: cc,
            ownRecall: Number((ownRecall * 100).toFixed(1)),
            bestOtherLetter,
            bestOtherRecall: Number((bestOther * 100).toFixed(1)),
            ewPreview: ewText.substring(0, 160),
          });
        }
      }
    }
  }

  return results;
}

// ── Execute ──
const { allItems, parseStats } = loadAllItems();

console.log('=== PARSE STATS ===');
for (const [label, stats] of Object.entries(parseStats)) {
  console.log(`  Pack ${label}: ${stats.records} records, ${stats.diagnostics} diagnostics, ${stats.canonicalRecords} canonical`);
}
console.log(`  Total items: ${allItems.length}`);
console.log(`  Certified items: ${allItems.filter(i => i.questionState === 'Certified').length}`);
console.log(`  Items with stem: ${allItems.filter(i => i.stem && i.stem.length > 0).length}`);

const screenResults = runScreens(allItems);

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
