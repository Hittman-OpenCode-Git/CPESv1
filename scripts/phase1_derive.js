/**
 * phase1_derive.js — P1 FULL-POOL KEY-DERIVATION CENSUS: Phase 1 Derivation
 *
 * Stratifies all 2,620 items into:
 *   Stratum H (229 Phase-0 flagged items): thorough derivation (~700 tokens)
 *   Stratum L (2,391 unflagged items): terse derivation (~150 tokens)
 *
 * For H items: model sees stem + choices + EC, derives answer + checks EC agreement.
 * For L items: model sees stem + choices only, derives answer (EC agreement computed programmatically).
 *
 * Uses OmniRoute API at http://127.0.0.1:20128/v1/chat/completions
 * Temperature: 0 (deterministic)
 *
 * Output: scripts/output/phase1_results.jsonl
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const PROJECT_ROOT = path.resolve(__dirname, '..');
const PACK_DIR = path.join(PROJECT_ROOT, 'content', 'packs');
const OUTPUT_DIR = path.join(__dirname, 'output');

const PACK_FILES = [
  { name: 'pack_a_corrected.js', label: 'A' },
  { name: 'pack_b_corrected.js', label: 'B' },
  { name: 'pack_c_corrected.js', label: 'C' },
  { name: 'pack_d_corrected.js', label: 'D' },
  { name: 'pack_e_corrected.js', label: 'E' },
];

const MODEL = 'auto/best-coding';
const TEMPERATURE = 0;
const BATCH_SIZE_H = 35;
const BATCH_SIZE_L = 40;
const CONCURRENCY = 4; // parallel API calls
const MAX_RETRIES = 3;

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

// ── Load packs ──
const { parsePack, toCanonicalRecords } = require(path.join(PROJECT_ROOT, 'scripts', 'lib', 'pack_parser.js'));

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

function loadAllItems(phase0Flags) {
  const allItems = [];
  const flaggedQids = new Set();
  for (const s of ['A', 'B', 'C', 'D', 'E']) {
    for (const f of phase0Flags.screens[s].flags) {
      flaggedQids.add(f.qid);
    }
  }

  for (const { name, label } of PACK_FILES) {
    const filePath = path.join(PACK_DIR, name);
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = parsePack(content, { sourceName: label });
    const canonical = toCanonicalRecords(parsed);

    for (let i = 0; i < canonical.length; i++) {
      const rawRec = parsed.records[i];
      const stem = (rawRec && rawRec.object && rawRec.object.Stem) || '';
      const item = canonical[i];
      allItems.push({
        qid: item.qid,
        pack: label,
        questionState: item.questionState,
        stem: stem,
        choices: item.choices,
        correctChoice: item.correctChoice,
        explanationCorrect: item.explanationCorrect,
        explanationWrong: item.explanationWrong,
        architecture: item.architecture,
        isFlagged: flaggedQids.has(item.qid),
      });
    }
  }
  return allItems;
}

// ── Build prompt for H items (thorough) ──
function buildHPrompt(batch) {
  const items = batch.map(item => ({
    qid: item.qid,
    stem: item.stem,
    choices: item.choices,
    explanationCorrect: item.explanationCorrect,
  }));

  return `You are a CMA Part 1 exam expert. For each multiple-choice question below, work step by step.

For each item, do TWO things:
1. FIRST, independently solve using ONLY the stem and choices (do NOT read ExplanationCorrect yet).
2. THEN, read ExplanationCorrect and state which choice letter (A, B, C, or D) it supports.

Output STRICT JSON, a single array, one object per item. Nothing before or after the JSON.
[{"qid":"...","derived":"A/B/C/D","confidence":"high/medium/low","reasoning":"detailed step-by-step reasoning (3-5 sentences)","ec_supports":"A/B/C/D","ec_agree":true/false,"note":"brief observation or empty string"}]

Questions (JSON array):
${JSON.stringify(items)}`;
}

// ── Build prompt for L items (terse) ──
function buildLPrompt(batch) {
  const items = batch.map(item => ({
    qid: item.qid,
    stem: item.stem,
    choices: item.choices,
  }));

  return `You are a CMA Part 1 exam expert. Solve each MCQ.

Output STRICT JSON, a single array, one object per item. Nothing before or after the JSON.
[{"qid":"...","derived":"A/B/C/D","confidence":"high/medium/low","reasoning":"one concise sentence"}]

Questions (JSON array):
${JSON.stringify(items)}`;
}

// ── API call ──
function callAPI(prompt, retry = 0) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: TEMPERATURE,
      stream: false,
    });

    const req = http.request('http://127.0.0.1:20128/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-036c5aaaf75a4581-5eafb0-e1239330',
        'Content-Length': Buffer.byteLength(payload),
      },
      timeout: 120000,
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.error) {
            throw new Error(json.error.message || 'API error');
          }
          resolve(json);
        } catch(e) {
          if (retry < MAX_RETRIES) {
            console.log(`  Retry ${retry + 1}/${MAX_RETRIES} after error: ${e.message.substring(0,80)}`);
            setTimeout(() => resolve(callAPI(prompt, retry + 1)), 2000);
          } else {
            reject(e);
          }
        }
      });
    });

    req.on('error', (e) => {
      if (retry < MAX_RETRIES) {
        console.log(`  Retry ${retry + 1}/${MAX_RETRIES} after error: ${e.message.substring(0,80)}`);
        setTimeout(() => resolve(callAPI(prompt, retry + 1)), 2000);
      } else {
        reject(e);
      }
    });

    req.write(payload);
    req.end();
  });
}

// ── Parse model JSON output ──
function extractJSON(text) {
  // Try direct parse
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
    if (typeof parsed === 'object') return [parsed];
  } catch(e) {}

  // Try to find JSON array in text
  const startIdx = text.indexOf('[');
  const endIdx = text.lastIndexOf(']');
  if (startIdx >= 0 && endIdx > startIdx) {
    try {
      const parsed = JSON.parse(text.substring(startIdx, endIdx + 1));
      if (Array.isArray(parsed)) return parsed;
    } catch(e) {}
  }

  return null;
}

// ── Compute EC agreement programmatically (for L items) ──
function computeEcAgreeProgrammatic(item) {
  if (!item.explanationCorrect || !item.choices || !item.correctChoice) {
    return { ecAgree: null, ecSupports: null };
  }
  const ecWords = contentWords(item.explanationCorrect);
  if (ecWords.size === 0) return { ecAgree: null, ecSupports: null };

  const cc = item.correctChoice;
  let bestLetter = null, bestRecall = -1;
  for (const letter of ['A', 'B', 'C', 'D']) {
    const choiceText = item.choices[letter];
    if (!choiceText) continue;
    const lead = leadPhrase(choiceText);
    const leadWords = contentWords(lead);
    if (leadWords.size < 3) continue; // skip short/numeric choices
    const r = recall(leadWords, ecWords);
    if (r > bestRecall) {
      bestRecall = r;
      bestLetter = letter;
    }
  }

  if (bestLetter) {
    return { ecAgree: bestLetter === cc, ecSupports: bestLetter };
  }
  return { ecAgree: null, ecSupports: null };
}

// ── Process a batch ──
async function processBatch(batch, isH) {
  const prompt = isH ? buildHPrompt(batch) : buildLPrompt(batch);
  const response = await callAPI(prompt);
  const content = response.choices?.[0]?.message?.content || '';

  const parsed = extractJSON(content);
  if (!parsed) {
    console.error(`  FAILED to parse JSON for batch of ${batch.length} items`);
    console.error(`  Response preview: ${content.substring(0, 200)}`);
    return batch.map(item => ({
      qid: item.qid,
      error: 'JSON_PARSE_FAILED',
      model: MODEL,
      temperature: TEMPERATURE,
      rawResponse: content.substring(0, 500),
    }));
  }

  // Build results
  const results = [];
  for (const item of batch) {
    const modelResult = parsed.find(r => r && r.qid === item.qid);
    if (!modelResult) {
      results.push({
        qid: item.qid,
        error: 'QID_NOT_FOUND_IN_RESPONSE',
        model: MODEL,
        temperature: TEMPERATURE,
      });
      continue;
    }

    let derived = modelResult.derived || null;
    let confidence = modelResult.confidence || 'unknown';
    let reasoning = modelResult.reasoning || '';
    let ecSupports = modelResult.ec_supports || null;
    let ecAgree = modelResult.ec_agree != null ? modelResult.ec_agree : null;
    let note = modelResult.note || '';

    // For L items, compute EC agreement programmatically
    if (!isH) {
      if (ecAgree == null) {
        const prog = computeEcAgreeProgrammatic(item);
        ecAgree = prog.ecAgree;
        ecSupports = prog.ecSupports;
      }
    }

    // Determine key agreement
    const keyAgree = derived === item.correctChoice;

    // Compute ew_flags from Screen D
    const ewFlags = [];
    if (item.explanationWrong) {
      for (const letter of ['A', 'B', 'C', 'D']) {
        const ew = item.explanationWrong[letter];
        if (!ew || typeof ew !== 'string' || ew.trim() === '') continue;
        const firstChar = ew.trim()[0];
        if (firstChar >= 'a' && firstChar <= 'z') {
          ewFlags.push({ slot: letter, isCC: letter === item.correctChoice });
        }
      }
    }

    // Determine disposition
    let disposition;
    if (!derived) {
      disposition = 'confirm-incomplete';
    } else if (keyAgree && (ecAgree === true || ecAgree === null)) {
      disposition = 'agree';
    } else if (!keyAgree && ecAgree === true) {
      disposition = 'confirm-key-error';
    } else if (keyAgree && ecAgree === false) {
      disposition = 'confirm-misassignment';
    } else if (!keyAgree && ecAgree === false) {
      disposition = 'needs-human';
    } else {
      disposition = 'needs-human';
    }

    results.push({
      qid: item.qid,
      pack: item.pack,
      questionState: item.questionState,
      derived,
      storedCC: item.correctChoice,
      keyAgree,
      ecAgree,
      ecSupports,
      confidence,
      ewFlags,
      disposition,
      note: reasoning.substring(0, 200) + (note ? ' | ' + note : ''),
      reasoning: isH ? reasoning : '',
      recordType: isH ? 'H' : 'L',
      model: MODEL,
      temperature: TEMPERATURE,
      timestamp: new Date().toISOString(),
    });
  }

  return results;
}

// ── Main ──
async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Load Phase 0 results
  const phase0Path = path.join(OUTPUT_DIR, 'phase0_results_v2.json');
  const phase0Results = JSON.parse(fs.readFileSync(phase0Path, 'utf-8'));

  console.log('Loading all items...');
  const allItems = loadAllItems(phase0Results);

  const flaggedQids = new Set();
  for (const s of ['A', 'B', 'C', 'D', 'E']) {
    for (const f of phase0Results.screens[s].flags) {
      flaggedQids.add(f.qid);
    }
  }

  const stratumH = allItems.filter(it => it.isFlagged);
  const stratumL = allItems.filter(it => !it.isFlagged);

  console.log(`Stratum H (flagged): ${stratumH.length} items`);
  console.log(`Stratum L (unflagged): ${stratumL.length} items`);
  console.log(`Total: ${allItems.length} items`);
  console.log(`Model: ${MODEL}, Temperature: ${TEMPERATURE}`);
  console.log(`Batch sizes: H=${BATCH_SIZE_H}, L=${BATCH_SIZE_L}, Concurrency=${CONCURRENCY}`);

  // Process Stratum H (thorough)
  console.log('\n=== Processing Stratum H (thorough derivation) ===');
  const hBatches = [];
  for (let i = 0; i < stratumH.length; i += BATCH_SIZE_H) {
    hBatches.push(stratumH.slice(i, i + BATCH_SIZE_H));
  }

  const hResults = [];
  for (let i = 0; i < hBatches.length; i++) {
    process.stdout.write(`  H batch ${i+1}/${hBatches.length} (${hBatches[i].length} items)... `);
    const batchResults = await processBatch(hBatches[i], true);
    hResults.push(...batchResults);
    process.stdout.write(`done (${batchResults.length} results)\n`);
    // Save incrementally
    const hOutput = path.join(OUTPUT_DIR, 'phase1_h_results.jsonl');
    fs.appendFileSync(hOutput, batchResults.map(r => JSON.stringify(r)).join('\n') + '\n');
  }

  // Process Stratum L (terse) — with parallelism
  console.log('\n=== Processing Stratum L (terse derivation) ===');
  const lBatches = [];
  for (let i = 0; i < stratumL.length; i += BATCH_SIZE_L) {
    lBatches.push(stratumL.slice(i, i + BATCH_SIZE_L));
  }

  const lResults = [];
  let completedL = 0;
  for (let i = 0; i < lBatches.length; i += CONCURRENCY) {
    const chunk = lBatches.slice(i, i + CONCURRENCY);
    const promises = chunk.map((batch, idx) =>
      processBatch(batch, false).catch(err => {
        console.error(`  L batch ${i+idx+1} FAILED: ${err.message}`);
        return batch.map(item => ({ qid: item.qid, error: 'BATCH_FAILED', model: MODEL, temperature: TEMPERATURE }));
      })
    );
    const batchResults = await Promise.all(promises);
    for (const results of batchResults) {
      lResults.push(...results);
      completedL += results.length;
      process.stdout.write(`  L progress: ${completedL}/${stratumL.length}\r`);
    }
    // Save incrementally
    const lOutput = path.join(OUTPUT_DIR, 'phase1_l_results.jsonl');
    fs.appendFileSync(lOutput, batchResults.flat().map(r => JSON.stringify(r)).join('\n') + '\n');
  }
  process.stdout.write('\n');

  // Combine all results
  const allResults = [...hResults, ...lResults];
  const combinedOutput = path.join(OUTPUT_DIR, 'phase1_results.jsonl');
  fs.writeFileSync(combinedOutput, allResults.map(r => JSON.stringify(r)).join('\n') + '\n');

  // Summary
  console.log('\n=== PHASE 1 SUMMARY ===');
  console.log(`Total derived: ${allResults.length}`);
  console.log(`H items: ${hResults.length}`);
  console.log(`L items: ${lResults.length}`);
  console.log(`Derivation counts by disposition:`);
  const byDisposition = {};
  for (const r of allResults) {
    byDisposition[r.disposition] = (byDisposition[r.disposition] || 0) + 1;
  }
  for (const [k, v] of Object.entries(byDisposition).sort((a,b)=>b[1]-a[1])) {
    console.log(`  ${k}: ${v}`);
  }
  console.log(`Key agreement: ${allResults.filter(r => r.keyAgree).length} / ${allResults.length} = ${(allResults.filter(r => r.keyAgree).length / allResults.length * 100).toFixed(1)}%`);

  console.log(`\nResults saved to ${combinedOutput}`);
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
