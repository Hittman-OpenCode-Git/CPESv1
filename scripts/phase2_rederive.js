/**
 * phase2_rederive.js — 20% blinded re-derivation for reliability validation.
 *
 * Selects 20% of items from both H and L strata (after Phase 1),
 * re-derives WITHOUT Phase 1 verdicts visible, compares mechanically.
 * Target: >=95% raw agreement between Phase 1 and Phase 2.
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { parsePack, toCanonicalRecords } = require(path.join(__dirname, 'lib', 'pack_parser.js'));
const PACK_DIR = path.join(__dirname, '..', 'content', 'packs');
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
const MAX_RETRIES = 3;
const BATCH_SIZE = 35;
const REQUEST_TIMEOUT = 180000;
const RECOMPUTE_FRAC = 0.20; // 20% of pool

// ── Load items ──
const itemMap = new Map();
const allQids = [];
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
    });
    allQids.push(canonical[i].qid);
  }
}

// ── Load Phase 0 results for H/L stratification ──
const phase0 = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, 'phase0_results_v2.json'), 'utf-8'));
const flaggedQids = new Set();
for (const s of ['A', 'B', 'C', 'D', 'E']) {
  for (const f of phase0.screens[s].flags) flaggedQids.add(f.qid);
}

// ── Load Phase 1 final results ──
const phase1Lines = fs.readFileSync(path.join(OUTPUT_DIR, 'phase1_final.jsonl'), 'utf-8')
  .split('\n').filter(l => l.trim());
const phase1Results = new Map();
for (const line of phase1Lines) {
  const r = JSON.parse(line);
  phase1Results.set(r.qid, r);
}

// ── Verify all 229 H items are "agree" ──
const hItems = allQids.filter(q => flaggedQids.has(q));
const lItems = allQids.filter(q => !flaggedQids.has(q));
console.log(`Stratum H: ${hItems.length} items`);
console.log(`Stratum L: ${lItems.length} items`);

// Check Phase 1 results for H items
const hAgreedByPhase1 = hItems.filter(q => phase1Results.get(q)?.disposition === 'agree').length;
const hKeyErrors = hItems.filter(q => phase1Results.get(q)?.disposition === 'confirm-key-error');
console.log(`H items confirmed agree by Phase 1: ${hAgreedByPhase1}`);
console.log(`H items confirmed key-error by Phase 1: ${hKeyErrors.length}`);

// Find confirmed key errors in L
const lKeyErrors = lItems.filter(q => phase1Results.get(q)?.disposition === 'confirm-key-error');
console.log(`L items confirmed key-error by Phase 1: ${lKeyErrors.length}`);
console.log(`L key-error QIDs: ${lKeyErrors.join(', ')}`);

// ── Select 20% from each stratum ──
// Ensure all key errors are included
const targetTotal = Math.floor(allQids.length * RECOMPUTE_FRAC);
const targetH = Math.floor(hItems.length * RECOMPUTE_FRAC);
const targetL = targetTotal - targetH;

console.log(`\nPhase 2 target: ${targetTotal} items (${targetH} from H, ${targetL} from L)`);

// Select H items: every Nth item, plus all key-error items
const selectEvery = Math.ceil(hItems.length / targetH);
const selectedH = [];
for (let i = 0; i < hItems.length; i += selectEvery) {
  selectedH.push(hItems[i]);
}
// Ensure we have exactly targetH items
while (selectedH.length > targetH) selectedH.pop();
const hKeyErrorInSelection = lKeyErrors; // Key errors are in L
console.log(`Selected H items: ${selectedH.length}`);

// Select L items: every Nth item, plus all key-error items
const lNonKeyError = lItems.filter(q => !lKeyErrors.includes(q));
const selectEveryL = Math.ceil(lNonKeyError.length / (targetL - lKeyErrors.length));
const selectedL = [...lKeyErrors]; // Start with key errors
for (let i = 0; i < lNonKeyError.length && selectedL.length < targetL; i += selectEveryL) {
  selectedL.push(lNonKeyError[i]);
}
while (selectedL.length > targetL) selectedL.pop();
console.log(`Selected L items: ${selectedL.length} (includes ${lKeyErrors.length} key-error items)`);

const selectedQids = [...selectedH, ...selectedL];
console.log(`Phase 2 total: ${selectedQids.length} items`);

// ── API functions (same as Phase 1) ──
function extractJSON(text) {
  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) return parsed;
    if (typeof parsed === 'object') return [parsed];
  } catch(e) {}
  const startIdx = text.indexOf('[');
  const endIdx = text.lastIndexOf(']');
  if (startIdx >= 0 && endIdx > startIdx) {
    try {
      const parsed = JSON.parse(text.substring(startIdx, endIdx + 1));
      if (Array.isArray(parsed)) return parsed;
    } catch(e) {}
  }
  const results = [];
  const jsonRegex = /\{[^{}]*"qid"[^{}]*\}/g;
  let match;
  while ((match = jsonRegex.exec(text)) !== null) {
    try {
      const obj = JSON.parse(match[0]);
      if (obj.qid) results.push(obj);
    } catch(e) {}
  }
  return results.length > 0 ? results : null;
}

function callAPI(prompt, retry = 0) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: TEMPERATURE,
      stream: false,
      max_tokens: 3000,
    });
    const req = http.request('http://127.0.0.1:20128/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-036c5aaaf75a4581-5eafb0-e1239330',
        'Content-Length': Buffer.byteLength(payload),
      },
      timeout: REQUEST_TIMEOUT,
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.error) throw new Error(json.error.message || 'API error');
          resolve(json);
        } catch(e) {
          if (retry < MAX_RETRIES) {
            console.log(`    Retry ${retry + 1}/${MAX_RETRIES}: ${e.message.substring(0,80)}`);
            setTimeout(() => resolve(callAPI(prompt, retry + 1)), 3000);
          } else { reject(e); }
        }
      });
    });
    req.on('error', (e) => {
      if (retry < MAX_RETRIES) {
        setTimeout(() => resolve(callAPI(prompt, retry + 1)), 3000);
      } else { reject(e); }
    });
    req.on('timeout', () => {
      req.destroy();
      if (retry < MAX_RETRIES) {
        setTimeout(() => resolve(callAPI(prompt, retry + 1)), 3000);
      } else { reject(new Error('Request timeout after retries')); }
    });
    req.write(payload);
    req.end();
  });
}

// ── Build prompts (same structure as Phase 1) ──
function buildHPrompt(batchItems) {
  const promptItems = batchItems.map(item => ({
    qid: item.qid,
    stem: item.stem,
    choices: item.choices,
    explanationCorrect: item.explanationCorrect,
  }));

  return `CMA Part 1 exam expert. For each question, solve independently then check explanation.

For each item:
1. FIRST, solve using ONLY stem + choices (ignore any answer hint in EC).
2. THEN, read EC. Which choice (A/B/C/D) does it support?

Output STRICT JSON array:
[{"qid":"...","derived":"A/B/C/D","confidence":"high/medium/low","reasoning":"2-3 sentences","ec_supports":"A/B/C/D","ec_agree":true/false}]

Items:\n${JSON.stringify(promptItems)}`;
}

function buildLPrompt(batchItems) {
  const promptItems = batchItems.map(item => ({
    qid: item.qid,
    stem: item.stem,
    choices: item.choices,
  }));

  return `CMA Part 1 exam expert. Solve each MCQ.

Output STRICT JSON array:
[{"qid":"...","derived":"A/B/C/D","confidence":"high/medium/low","reasoning":"one sentence"}]

Items:\n${JSON.stringify(promptItems)}`;
}

// ── Main processing ──
async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const selectedHItems = selectedH.map(qid => itemMap.get(qid)).filter(Boolean);
  const selectedLItems = selectedL.map(qid => itemMap.get(qid)).filter(Boolean);

  console.log(`\nProcessing ${selectedHItems.length} H items (thorough) + ${selectedLItems.length} L items (terse)`);

  const allPhase2Results = [];

  // Process H items
  console.log('\n=== Phase 2 H items (thorough) ===');
  const hBatches = [];
  for (let i = 0; i < selectedHItems.length; i += BATCH_SIZE) {
    hBatches.push(selectedHItems.slice(i, i + BATCH_SIZE));
  }

  for (let i = 0; i < hBatches.length; i++) {
    const batch = hBatches[i];
    process.stdout.write(`  H batch ${i+1}/${hBatches.length} (${batch.length} items)... `);
    try {
      const prompt = buildHPrompt(batch);
      const response = await callAPI(prompt);
      const content = response.choices?.[0]?.message?.content || '';
      const parsed = extractJSON(content);

      if (!parsed || parsed.length === 0) {
        console.log('PARSE FAILED');
        continue;
      }

      let success = 0;
      for (const item of batch) {
        const modelResult = parsed.find(r => r && r.qid === item.qid);
        if (!modelResult) continue;
        allPhase2Results.push({
          qid: item.qid,
          pack: item.pack,
          stratum: 'H',
          storedCC: item.correctChoice,
          derived: modelResult.derived || null,
          confidence: modelResult.confidence || 'unknown',
          ecSupports: modelResult.ec_supports || null,
          ecAgree: modelResult.ec_agree != null ? modelResult.ec_agree : null,
          reasoning: modelResult.reasoning || '',
          model: MODEL,
          temperature: TEMPERATURE,
          timestamp: new Date().toISOString(),
        });
        success++;
      }
      console.log(`done (${success}/${batch.length})`);
    } catch(err) {
      console.log(`FAILED: ${err.message}`);
    }
  }

  // Process L items (with parallelism)
  console.log('\n=== Phase 2 L items (terse) ===');
  const lBatches = [];
  for (let i = 0; i < selectedLItems.length; i += BATCH_SIZE) {
    lBatches.push(selectedLItems.slice(i, i + BATCH_SIZE));
  }

  const CONCURRENCY = 4;
  let completedL = 0;
  for (let i = 0; i < lBatches.length; i += CONCURRENCY) {
    const chunk = lBatches.slice(i, i + CONCURRENCY);
    const promises = chunk.map(async (batch) => {
      const batchNum = Math.floor(i / CONCURRENCY) * CONCURRENCY + chunk.indexOf(batch) + 1;
      process.stdout.write(`  L batch ${batchNum}/${lBatches.length} (${batch.length} items)... `);
      try {
        const prompt = buildLPrompt(batch);
        const response = await callAPI(prompt);
        const content = response.choices?.[0]?.message?.content || '';
        const parsed = extractJSON(content);

        if (!parsed || parsed.length === 0) {
          console.log('PARSE FAILED');
          return [];
        }

        const results = [];
        let success = 0;
        for (const item of batch) {
          const modelResult = parsed.find(r => r && r.qid === item.qid);
          if (!modelResult) continue;
          results.push({
            qid: item.qid,
            pack: item.pack,
            stratum: 'L',
            storedCC: item.correctChoice,
            derived: modelResult.derived || null,
            confidence: modelResult.confidence || 'unknown',
            reasoning: modelResult.reasoning || '',
            model: MODEL,
            temperature: TEMPERATURE,
            timestamp: new Date().toISOString(),
          });
          success++;
        }
        console.log(`done (${success}/${batch.length})`);
        return results;
      } catch(err) {
        console.log(`FAILED: ${err.message}`);
        return [];
      }
    });

    const batchResults = await Promise.all(promises);
    for (const results of batchResults) {
      allPhase2Results.push(...results);
      completedL += results.length;
    }
    process.stdout.write(`  L progress: ${completedL}/${selectedLItems.length}\r`);
  }
  process.stdout.write('\n');

  // Save Phase 2 results
  const output = path.join(OUTPUT_DIR, 'phase2_results.jsonl');
  fs.writeFileSync(output, allPhase2Results.map(r => JSON.stringify(r)).join('\n') + '\n');
  console.log(`Phase 2 results saved to ${output}`);

  // ── Mechanical diff: compare Phase 1 vs Phase 2 ──
  console.log('\n=== MECHANICAL DIFF (Phase 1 vs Phase 2) ===');
  let agree = 0, discordant = 0, noPhase1 = 0;
  const discordantItems = [];

  for (const p2 of allPhase2Results) {
    const p1 = phase1Results.get(p2.qid);
    if (!p1) {
      noPhase1++;
      continue;
    }
    if (p1.derived === p2.derived) {
      agree++;
    } else {
      discordant++;
      discordantItems.push({
        qid: p2.qid,
        pack: p2.pack,
        stratum: p2.stratum,
        p1Derived: p1.derived,
        p2Derived: p2.derived,
        storedCC: p2.storedCC,
        p1Disposition: p1.disposition,
        confidence: p2.confidence,
      });
    }
  }

  const total = agree + discordant;
  const agreementRate = total > 0 ? (agree / total * 100) : 0;

  console.log(`Total compared: ${total}`);
  console.log(`Agreement: ${agree}`);
  console.log(`Discordant: ${discordant}`);
  console.log(`Agreement rate: ${agreementRate.toFixed(1)}%`);
  console.log(`Target: >=95% ${agreementRate >= 95 ? 'PASS' : 'FAIL'}`);

  if (discordantItems.length > 0) {
    console.log(`\n=== Discordant items (${discordantItems.length}) ===`);
    for (const d of discordantItems) {
      console.log(`  ${d.qid} (${d.pack}) stratum=${d.stratum} P1=${d.p1Derived} P2=${d.p2Derived} CC=${d.storedCC} P1disp=${d.p1Disposition} conf=${d.confidence}`);
    }
  }

  // Save diff results
  const diffOutput = path.join(OUTPUT_DIR, 'phase2_diff.json');
  fs.writeFileSync(diffOutput, JSON.stringify({
    timestamp: new Date().toISOString(),
    model: MODEL,
    temperature: TEMPERATURE,
    recomputeFraction: RECOMPUTE_FRAC,
    totalSelected: allPhase2Results.length,
    compared: total,
    agreement: agree,
    discordant: discordant,
    agreementRate: `${agreementRate.toFixed(1)}%`,
    target: '>=95%',
    verdict: agreementRate >= 95 ? 'PASS' : 'FAIL',
    discordantItems: discordantItems,
    selectedQids: selectedQids,
  }, null, 2));
  console.log(`\nDiff results saved to ${diffOutput}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
