/**
 * phase1_recompute.js — Fix L-item ecAgree using Screen B thresholds,
 * then identify genuine key-error candidates for model verification.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const STOPWORDS = new Set([
  'the','a','an','of','to','in','for','and','or','but','is','are','was','were','be',
  'been','being','have','has','had','do','does','did','will','would','could','should',
  'may','might','can','shall','must','about','above','after','again','all','also',
  'although','among','as','at','by','from','if','into','not','than','that','their',
  'these','they','this','its','it','on','with','which','who','how','what','when',
  'where','while','under','between','through','during','before','each','both','few',
  'more','some','such','only','own','same','so','too','very','just','all','any',
  'use','one','our','out','her','his','from','has','had','would','when','who',
]);

function contentWords(text) {
  if (!text || typeof text !== 'string') return new Set();
  const tokens = text.toLowerCase().match(/[a-z]{4,}/g) || [];
  const words = new Set();
  for (const t of tokens) if (!STOPWORDS.has(t)) words.add(t);
  return words;
}

function leadPhrase(text) {
  if (!text) return '';
  const commaIdx = text.indexOf(',');
  return commaIdx >= 0 ? text.substring(0, commaIdx).trim() : text.trim();
}

function recall(queryWords, docWords) {
  if (queryWords.size === 0) return -1;
  let overlap = 0;
  for (const w of queryWords) if (docWords.has(w)) overlap++;
  return overlap / queryWords.size;
}

// Screen B thresholds: best != CC, recall >= 0.50, margin >= 0.40, lead words >= 3
function checkScreenB(item) {
  if (!item.explanationCorrect || !item.choices || !item.correctChoice) return null;
  const ecWords = contentWords(item.explanationCorrect);
  const cc = item.correctChoice;
  const recalls = {};
  const leadWordCounts = {};
  for (const letter of ['A','B','C','D']) {
    const choiceText = item.choices[letter];
    if (!choiceText) continue;
    const lead = leadPhrase(choiceText);
    const leadWords = contentWords(lead);
    recalls[letter] = recall(leadWords, ecWords);
    leadWordCounts[letter] = leadWords.size;
  }
  let bestLetter = null, bestRecall = -1;
  for (const letter of ['A','B','C','D']) {
    if (recalls[letter] > bestRecall) { bestRecall = recalls[letter]; bestLetter = letter; }
  }
  const ccRecall = recalls[cc] || 0;
  const margin = bestLetter !== cc ? (bestRecall - ccRecall) : 0;
  const flagged = bestLetter !== cc && bestRecall >= 0.50 && margin >= 0.40 && leadWordCounts[bestLetter] >= 3;
  return { flagged, ecSupports: bestLetter, bestRecall, ccRecall, margin };
}

// Load all items from pack_parser (need stem and raw fields)
const { parsePack, toCanonicalRecords } = require(path.join(__dirname, '..', 'scripts', 'lib', 'pack_parser.js'));
const PACK_DIR = path.join(__dirname, '..', 'content', 'packs');
const PACK_FILES = [
  { name: 'pack_a_corrected.js', label: 'A' },
  { name: 'pack_b_corrected.js', label: 'B' },
  { name: 'pack_c_corrected.js', label: 'C' },
  { name: 'pack_d_corrected.js', label: 'D' },
  { name: 'pack_e_corrected.js', label: 'E' },
];

const itemMap = new Map();
for (const { name, label } of PACK_FILES) {
  const content = fs.readFileSync(path.join(PACK_DIR, name), 'utf-8');
  const parsed = parsePack(content, { sourceName: label });
  const canonical = toCanonicalRecords(parsed);
  for (let i = 0; i < canonical.length; i++) {
    const rawRec = parsed.records[i];
    const stem = (rawRec && rawRec.object && rawRec.object.Stem) || '';
    itemMap.set(canonical[i].qid, {
      qid: canonical[i].qid,
      pack: label,
      questionState: canonical[i].questionState,
      stem: stem,
      choices: canonical[i].choices,
      correctChoice: canonical[i].correctChoice,
      explanationCorrect: canonical[i].explanationCorrect,
      explanationWrong: canonical[i].explanationWrong,
    });
  }
}

// Load Phase 0 results for Screen D (EW flags)
const phase0 = JSON.parse(fs.readFileSync(path.join(__dirname, 'output', 'phase0_results_v2.json'), 'utf-8'));
const ewFlagsByQid = new Map();
for (const f of phase0.screens.D.flags) {
  if (!ewFlagsByQid.has(f.qid)) ewFlagsByQid.set(f.qid, []);
  ewFlagsByQid.get(f.qid).push({ slot: f.slot, isCC: f.isCorrectChoice });
}

// Load Phase 1 results
const lines = fs.readFileSync(path.join(__dirname, 'output', 'phase1_results.jsonl'), 'utf-8')
  .split('\n').filter(l => l.trim());
const results = lines.map(l => JSON.parse(l));

console.log(`Loaded ${results.length} Phase 1 results`);

// Process each result
let agreeCount = 0, misassignmentCount = 0, keyErrorCount = 0, needsHumanCount = 0;
const needsVerify = []; // L items where derived != CC — need model verification

for (const r of results) {
  const item = itemMap.get(r.qid);
  if (!item) continue;

  const keyAgree = r.derived === item.correctChoice;
  r.keyAgree = keyAgree;
  r.storedCC = item.correctChoice;

  // Copy ew_flags from Screen D
  r.ewFlags = ewFlagsByQid.get(r.qid) || [];

  if (r.recordType === 'H') {
    // H items: ecAgree is from model (keep as-is)
    // Disposition already computed correctly
  } else {
    // L items: recompute ecAgree using Screen B thresholds
    const screenB = checkScreenB(item);
    if (screenB && screenB.flagged) {
      // Screen B WOULD have flagged this — but it's in L, so this shouldn't happen
      // Unless Screen B was applied before remediation or with different thresholds
      r.ecAgree = false;
      r.ecSupports = screenB.ecSupports;
    } else {
      // Screen B didn't flag: EC likely agrees with CC
      r.ecAgree = true;
      r.ecSupports = item.correctChoice;
    }

    // Recompute disposition for L items
    delete r.disposition; // clear old disposition
  }

  // Re-compute disposition for L items
  if (r.recordType === 'L') {
    if (!r.derived) {
      r.disposition = 'confirm-incomplete';
    } else if (keyAgree && r.ecAgree === true) {
      r.disposition = 'agree';
      agreeCount++;
    } else if (!keyAgree && r.ecAgree === true) {
      // Model disagrees with CC, but Screen B says EC agrees with CC
      // This could be a model error OR a genuine key error the model caught
      // Need verification — flag for model EC check
      r.disposition = 'needs-human';
      needsHumanCount++;
      needsVerify.push(r);
    } else if (!keyAgree && r.ecAgree === false) {
      r.disposition = 'confirm-key-error';
      keyErrorCount++;
    } else if (keyAgree && r.ecAgree === false) {
      r.disposition = 'confirm-misassignment';
      misassignmentCount++;
    } else {
      r.disposition = 'needs-human';
      needsHumanCount++;
    }
  } else {
    // H items — count existing dispositions
    if (r.disposition === 'agree') agreeCount++;
    else if (r.disposition === 'confirm-misassignment') misassignmentCount++;
    else if (r.disposition === 'confirm-key-error') keyErrorCount++;
    else if (r.disposition === 'needs-human') {
      needsHumanCount++;
      needsVerify.push(r);
    }
  }
}

console.log('\n=== RECOMPUTED DISPOSITION BREAKDOWN ===');
console.log(`agree: ${agreeCount}`);
console.log(`confirm-misassignment: ${misassignmentCount}`);
console.log(`confirm-key-error: ${keyErrorCount}`);
console.log(`needs-human: ${needsHumanCount}`);

console.log(`\n=== Items needing human/model verification: ${needsVerify.length} ===`);
for (const r of needsVerify) {
  console.log(`  ${r.qid} (${r.pack}) CC=${r.storedCC} derived=${r.derived} ecAgree=${r.ecAgree} type=${r.recordType}`);
}

// Save corrected results
const output = path.join(__dirname, 'output', 'phase1_results_corrected.jsonl');
fs.writeFileSync(output, results.map(r => JSON.stringify(r)).join('\n') + '\n');
console.log(`\nCorrected results saved to ${output}`);

// Also save the items needing verification for Phase 1b
if (needsVerify.length > 0) {
  const verifyQids = needsVerify.map(r => r.qid);
  fs.writeFileSync(path.join(__dirname, 'output', 'phase1_needs_verify.json'), JSON.stringify(verifyQids, null, 2));
  console.log(`Items needing verification saved to ${path.join(__dirname, 'output', 'phase1_needs_verify.json')}`);
}
