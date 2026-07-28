// Script 2 — Delta Ledger Builder
// Generates content SHA-256, metadata SHA-256 for delta review comparison
// Output: scripts/output/delta_ledger.json + knowledge/DELTA_LEDGER.json
const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');
const he = require('./engine/hash_engine');
const ir = require('./engine/identity_resolver');

const OUTPUT_DIR = path.join(__dirname, 'output');
const KNOWLEDGE_DIR = path.join(__dirname, '..', 'knowledge');
const PACKS = ['pack_a', 'pack_b', 'pack_c', 'pack_d', 'pack_e'];

function buildDeltaLedger(rootDir, baselinePath) {
  const timestamp = new Date().toISOString();
  const baseline = loadBaseline(baselinePath);

  const ledger = {
    generatedSession: 'S322',
    generatedTimestamp: timestamp,
    baselineRef: baselinePath
      ? path.relative(rootDir || process.cwd(), baselinePath)
      : 'NONE (initial baseline)',
    totalItems: 0,
    changeSummary: {
      CONTENT_CHANGE: 0,
      METADATA_CHANGE: 0,
      PRESENTATION_CHANGE: 0,
      NO_CHANGE: 0,
      UNCLASSIFIED: 0
    },
    reviewRouting: {
      fullReview: 0,
      partialReview: 0,
      noReview: 0
    },
    scannerOverrideApplied: 0,
    entries: []
  };

  for (const packName of PACKS) {
    let items;
    try {
      items = pr.parsePackFile(packName, rootDir);
    } catch (e) {
      continue;
    }

    for (const item of items) {
      if (!item.QuestionID) continue;

      const qid = item.QuestionID;
      const compoundKey = ir.resolveCompoundKey(item, packName);
      const contentHash = he.computeContentHash(item);
      const metadataHash = he.computeMetadataHash(item);
      const identityHash = he.computeIdentityHash(compoundKey);

      const baselineEntry = baseline ? baseline[qid] || baseline[compoundKey] : null;

      const entry = {
        qid,
        compoundKey,
        pack: packName,
        contentHashCurrent: contentHash,
        metadataHashCurrent: metadataHash,
        identityHashCurrent: identityHash,
        contentHashBaseline: baselineEntry ? baselineEntry.contentHash : null,
        metadataHashBaseline: baselineEntry ? baselineEntry.metadataHash : null,
        changeType: 'UNCLASSIFIED',
        review: 'FULL',
        scannerOverride: false
      };

      if (baselineEntry) {
        if (contentHash !== baselineEntry.contentHash) {
          entry.changeType = 'CONTENT_CHANGE';
          entry.review = 'FULL';
        } else if (metadataHash !== baselineEntry.metadataHash) {
          entry.changeType = 'METADATA_CHANGE';
          entry.review = 'PARTIAL';
        } else {
          entry.changeType = 'NO_CHANGE';
          entry.review = 'NONE';
        }
      }

      ledger.changeSummary[entry.changeType]++;
      if (entry.review === 'FULL') ledger.reviewRouting.fullReview++;
      else if (entry.review === 'PARTIAL') ledger.reviewRouting.partialReview++;
      else ledger.reviewRouting.noReview++;

      ledger.entries.push(entry);
    }
  }

  ledger.totalItems = ledger.entries.length;
  return ledger;
}

function loadBaseline(baselinePath) {
  if (!baselinePath) {
    const defaultPath = path.join(KNOWLEDGE_DIR, 'DELTA_LEDGER.json');
    if (fs.existsSync(defaultPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(defaultPath, 'utf8'));
        const map = {};
        for (const entry of data.entries || []) {
          const key = entry.compoundKey || entry.qid;
          if (key) map[key] = { contentHash: entry.contentHashCurrent, metadataHash: entry.metadataHashCurrent };
        }
        console.log(`Loaded baseline: ${Object.keys(map).length} entries from ${defaultPath}`);
        return map;
      } catch (e) {
        console.log(`Could not load baseline from ${defaultPath}: ${e.message}`);
      }
    }
    return null;
  }

  try {
    const data = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));
    const map = {};
    for (const entry of data.entries || []) {
      const key = entry.compoundKey || entry.qid;
      if (key) map[key] = { contentHash: entry.contentHashCurrent, metadataHash: entry.metadataHashCurrent };
    }
    console.log(`Loaded baseline: ${Object.keys(map).length} entries from ${baselinePath}`);
    return map;
  } catch (e) {
    console.log(`Could not load baseline from ${baselinePath}: ${e.message}`);
    return null;
  }
}

function runSelfTest() {
  console.log('=== Delta Ledger Builder Self-Test ===');

  const rootDir = path.resolve(__dirname, '..');
  const items = pr.parsePackFile('pack_e', rootDir);
  const validItems = items.filter(i => i.QuestionID);
  const sample = validItems[0];

  console.log(`Sample item: ${sample.QuestionID}`);

  const h1 = he.computeContentHash(sample);
  const h2 = he.computeContentHash(sample);
  const determinismOk = h1 === h2;
  console.log(`Content hash deterministic: ${determinismOk} (${h1.substring(0, 16)}...)`);

  const m1 = he.computeMetadataHash(sample);
  const m2 = he.computeMetadataHash(sample);
  console.log(`Metadata hash deterministic: ${m1 === m2}`);

  // Verify hash changes when content changes
  const modified = { ...sample, Stem: sample.Stem + ' MODIFIED' };
  const h3 = he.computeContentHash(modified);
  const contentSensitive = h1 !== h3;
  console.log(`Content hash content-sensitive: ${contentSensitive}`);

  const compoundKey = ir.resolveCompoundKey(sample, 'pack_e');
  const idHash = he.computeIdentityHash(compoundKey);
  console.log(`Identity hash: ${idHash.substring(0, 16)}...`);

  const ledger = buildDeltaLedger(rootDir, null);
  console.log(`Ledger entries: ${ledger.entries.length}`);
  console.log(`Change types: ${JSON.stringify(ledger.changeSummary)}`);

  const pass = determinismOk && contentSensitive && ledger.entries.length >= 500;
  console.log(`Self-test: ${pass ? 'PASS' : 'FAIL'}`);
  return pass;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--self-test')) {
    const ok = runSelfTest();
    process.exit(ok ? 0 : 1);
  }

  const rootDir = path.resolve(__dirname, '..');
  const baselineArg = args.find(a => a.endsWith('.json'));
  console.log(`Delta Ledger Builder — hashing packs in ${rootDir}`);

  const ledger = buildDeltaLedger(rootDir, baselineArg || null);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, 'delta_ledger.json');
  fs.writeFileSync(outPath, JSON.stringify(ledger, null, 2), 'utf8');

  // Also write to knowledge/ for persistence
  if (!fs.existsSync(KNOWLEDGE_DIR)) fs.mkdirSync(KNOWLEDGE_DIR, { recursive: true });
  const knowledgePath = path.join(KNOWLEDGE_DIR, 'DELTA_LEDGER.json');
  fs.writeFileSync(knowledgePath, JSON.stringify(ledger, null, 2), 'utf8');

  console.log(`Total: ${ledger.totalItems} items hashed`);
  console.log(`Changes: ${JSON.stringify(ledger.changeSummary)}`);
  console.log(`Review routing: ${JSON.stringify(ledger.reviewRouting)}`);
  console.log(`Output: ${outPath}`);
  console.log(`Knowledge: ${knowledgePath}`);
}

module.exports = { buildDeltaLedger, runSelfTest };
