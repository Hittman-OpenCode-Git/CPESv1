/**
 * phase1b_verify.js v2 — Verify candidate key-error items with EC context.
 * Smaller batches + longer timeout for reliability.
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
const BATCH_SIZE = 12;
const REQUEST_TIMEOUT = 180000; // 3 minutes per request

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
    });
  }
}

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
  // Try to find individual JSON objects
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
      max_tokens: 2000,
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
        console.log(`    Retry ${retry + 1}/${MAX_RETRIES}: ${e.message.substring(0,80)}`);
        setTimeout(() => resolve(callAPI(prompt, retry + 1)), 3000);
      } else { reject(e); }
    });
    req.on('timeout', () => {
      req.destroy();
      if (retry < MAX_RETRIES) {
        console.log(`    Retry ${retry + 1}/${MAX_RETRIES} after timeout`);
        setTimeout(() => resolve(callAPI(prompt, retry + 1)), 3000);
      } else { reject(new Error('Request timeout after retries')); }
    });
    req.write(payload);
    req.end();
  });
}

async function main() {
  const verifyQids = JSON.parse(fs.readFileSync(path.join(OUTPUT_DIR, 'phase1_needs_verify.json'), 'utf-8'));
  console.log(`Verifying ${verifyQids.length} candidate items`);
  console.log(`Model: ${MODEL}, Temperature: ${TEMPERATURE}, Batch: ${BATCH_SIZE}`);

  const items = verifyQids.map(qid => itemMap.get(qid)).filter(Boolean);
  console.log(`Loaded ${items.length} items`);

  const allResults = [];
  const totalBatches = Math.ceil(items.length / BATCH_SIZE);

  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = items.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    process.stdout.write(`  Batch ${batchNum}/${totalBatches} (${batch.length} items)... `);

    const batchItems = batch.map(item => ({
      qid: item.qid,
      stem: item.stem,
      choices: item.choices,
      explanationCorrect: item.explanationCorrect,
    }));

    const prompt = `CMA Part 1 exam expert. For each question, solve independently then check explanation.

For each item:
1. Solve using ONLY stem + choices (ignore any answer in EC).
2. Read EC. Which choice (A/B/C/D) does it support?
3. Confidence: high/medium/low.

Output STRICT JSON array:
[{"qid":"...","derived":"A/B/C/D","confidence":"high/medium/low","reasoning":"2 sentences","ec_supports":"A/B/C/D","ec_agree":true/false,"is_key_error":true/false,"note":""}]

is_key_error=true ONLY if derived != stored CC AND ec_supports == derived (model+EC agree, CC wrong).
is_key_error=false if model agrees with CC, or EC disagrees with model (likely model error).

Items:\n${JSON.stringify(batchItems)}`;

    try {
      const response = await callAPI(prompt);
      const content = response.choices?.[0]?.message?.content || '';
      const parsed = extractJSON(content);

      if (!parsed || parsed.length === 0) {
        console.log('FAILED to parse JSON');
        console.log('  Preview:', content.substring(0, 200));
        continue;
      }

      let success = 0;
      for (const item of batch) {
        const modelResult = parsed.find(r => r && r.qid === item.qid);
        if (!modelResult) continue;

        const storedCC = item.correctChoice;
        const derived = modelResult.derived || null;
        const keyAgree = derived === storedCC;
        const ecAgree = modelResult.ec_agree != null ? modelResult.ec_agree : null;

        let disposition;
        if (!derived) {
          disposition = 'confirm-incomplete';
        } else if (keyAgree) {
          disposition = 'agree';
        } else if (!keyAgree && ecAgree === true) {
          disposition = 'confirm-key-error';
        } else {
          disposition = 'needs-human';
        }

        allResults.push({
          qid: item.qid,
          pack: item.pack,
          storedCC: storedCC,
          derived: derived,
          keyAgree: keyAgree,
          ecAgree: ecAgree,
          ecSupports: modelResult.ec_supports,
          confidence: modelResult.confidence,
          isKeyError: modelResult.is_key_error,
          reasoning: modelResult.reasoning || '',
          note: modelResult.note || '',
          disposition: disposition,
          model: MODEL,
          temperature: TEMPERATURE,
          timestamp: new Date().toISOString(),
        });
        success++;
      }
      console.log(`done (${success}/${batch.length} parsed)`);
    } catch(err) {
      console.log(`FAILED: ${err.message}`);
    }
  }

  // Summary
  const byDisposition = {};
  for (const r of allResults) {
    byDisposition[r.disposition] = (byDisposition[r.disposition] || 0) + 1;
  }
  console.log('\n=== PHASE 1B VERIFICATION SUMMARY ===');
  for (const [k, v] of Object.entries(byDisposition).sort()) {
    console.log(`  ${k}: ${v}`);
  }

  const keyErrors = allResults.filter(r => r.disposition === 'confirm-key-error');
  console.log(`\nConfirmed key errors: ${keyErrors.length}`);
  for (const r of keyErrors) {
    console.log(`  ${r.qid} (${r.pack}) CC=${r.storedCC} -> derived=${r.derived} ecSupports=${r.ecSupports} conf=${r.confidence}`);
  }

  const remaining = allResults.filter(r => r.disposition === 'needs-human');
  console.log(`\nStill needs-human: ${remaining.length}`);
  for (const r of remaining) {
    console.log(`  ${r.qid} (${r.pack}) CC=${r.storedCC} derived=${r.derived} ecSupports=${r.ecSupports}`);
  }

  const modelErrors = allResults.filter(r => r.disposition === 'agree' && r.derived !== r.storedCC);
  // Wait, if disposition=agree, derived==CC. So modelErrors should be empty.
  // Actually, disposition=agree means keyAgree=true (derived==CC).
  // So there are no model errors among the agrees.
  console.log(`\nModel was correct (derived matches CC): ${allResults.filter(r => r.disposition === 'agree').length}`);

  const output = path.join(OUTPUT_DIR, 'phase1b_verify.jsonl');
  fs.writeFileSync(output, allResults.map(r => JSON.stringify(r)).join('\n') + '\n');
  console.log(`\nResults saved to ${output}`);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
