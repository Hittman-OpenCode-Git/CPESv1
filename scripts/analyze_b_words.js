const fs = require('fs');
const path = require('path');
const { parsePack, toCanonicalRecords } = require(path.join(__dirname, '..', 'scripts', 'lib', 'pack_parser.js'));
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PACK_DIR = path.join(PROJECT_ROOT, 'content', 'packs');

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
  for (const t of tokens) {
    if (!STOPWORDS.has(t)) words.add(t);
  }
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
  for (const w of queryWords) {
    if (docWords.has(w)) overlap++;
  }
  return overlap / queryWords.size;
}

const PACK_FILES = [
  { name: 'pack_a_corrected.js', label: 'A' },
  { name: 'pack_b_corrected.js', label: 'B' },
  { name: 'pack_c_corrected.js', label: 'C' },
  { name: 'pack_d_corrected.js', label: 'D' },
  { name: 'pack_e_corrected.js', label: 'E' },
];

const allItems = [];
for (const { name, label } of PACK_FILES) {
  const filePath = path.join(PACK_DIR, name);
  const content = fs.readFileSync(filePath, 'utf-8');
  const parsed = parsePack(content, { sourceName: label });
  const canonical = toCanonicalRecords(parsed);
  for (let i = 0; i < canonical.length; i++) {
    canonical[i].stem = (parsed.records[i] && parsed.records[i].object && parsed.records[i].object.Stem) || '';
  }
  for (const rec of canonical) {
    allItems.push({
      qid: rec.qid, pack: label, questionState: rec.questionState,
      stem: rec.stem, choices: rec.choices, correctChoice: rec.correctChoice,
      explanationCorrect: rec.explanationCorrect, explanationWrong: rec.explanationWrong,
    });
  }
}

const certified = allItems.filter(it => it.questionState === 'Certified');

// For each Screen B flag, also report the best-matching choice's lead phrase word count
const STOPWATCH = new Set(STOPWORDS);
function leadWordCount(text) {
  const lead = leadPhrase(text);
  const words = contentWords(lead);
  return words.size;
}

const bFlags = [];
for (const item of certified) {
  if (!item.explanationCorrect || !item.choices || !item.correctChoice) continue;
  const ecWords = contentWords(item.explanationCorrect);
  const cc = item.correctChoice;
  const recalls = {};
  const leadWordCounts = {};
  for (const letter of ['A','B','C','D']) {
    const choiceText = item.choices[letter];
    if (!choiceText) { recalls[letter] = -1; continue; }
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

  if (bestLetter !== cc && bestRecall >= 0.50 && margin >= 0.40) {
    bFlags.push({
      qid: item.qid, pack: item.pack, cc, bestLetter,
      bestRecall, margin: Number((margin*100).toFixed(1)),
      bestLeadWordCount: leadWordCounts[bestLetter],
    });
  }
}

// Distribution by lead word count
const byWCount = {};
for (const f of bFlags) {
  const bucket = f.bestLeadWordCount <= 1 ? '≤1' : f.bestLeadWordCount <= 2 ? '2' : f.bestLeadWordCount <= 3 ? '3' : f.bestLeadWordCount <= 5 ? '4-5' : '>5';
  byWCount[bucket] = (byWCount[bucket] || 0) + 1;
}
console.log('=== Screen B by best-matching choice lead-word-count ===');
for (const [k,v] of Object.entries(byWCount).sort()) console.log(`  leadWords ${k}: ${v} flags`);
console.log(`\nTotal: ${bFlags.length} flags`);

// Count if we filter to min 3 lead words
const min3 = bFlags.filter(f => f.bestLeadWordCount >= 3);
console.log(`\nWith min 3 lead words: ${min3.length} flags`);
const min4 = bFlags.filter(f => f.bestLeadWordCount >= 4);
console.log(`With min 4 lead words: ${min4.length} flags`);
const min5 = bFlags.filter(f => f.bestLeadWordCount >= 5);
console.log(`With min 5 lead words: ${min5.length} flags`);

// Show flags with low word count (likely false positives)
console.log('\n=== Flags with bestLeadWordCount <= 2 (likely FP) ===');
for (const f of bFlags.filter(f => f.bestLeadWordCount <= 2)) {
  console.log(`  ${f.pack}-${f.qid} CC=${f.cc}->best=${f.bestLetter}(${f.bestRecall*100}%) wCount=${f.bestLeadWordCount} | margin=${f.margin}`);
}
