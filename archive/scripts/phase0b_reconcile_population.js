// Phase 0B — Comprehensive population reconciliation
// Builds exact sorted QID lists from parsed source data
const fs = require('fs');
const path = require('path');

const WORKDIR = path.resolve(__dirname, '..');

// Read Pack C certified QIDs from regex extraction
const packCData = JSON.parse(fs.readFileSync(path.join(WORKDIR, 'reports', 'phase0b_pack_c_certified_qids.json'), 'utf8'));

// Read Pack B, D, E certified QIDs
const parsedData = JSON.parse(fs.readFileSync(path.join(WORKDIR, 'reports', 'phase0b_certified_qid_list.json'), 'utf8'));

// Build per-pack sorted QID lists
function getQIDs(arr) {
    return [...new Set(arr.map(x => x.QID))].sort();
}

const packB_qids = getQIDs(parsedData.B);
const packC_qids = packCData.qids.sort();
const packD_qids = getQIDs(parsedData.D);
const packE_qids = getQIDs(parsedData.E);

// Verify Pack D: 500 QID references expected, 499 parsed
console.log('=== RECONCILIATION ===');
console.log(`Pack B Certified: ${packB_qids.length}`);
console.log(`Pack C Certified: ${packC_qids.length}`);
console.log(`Pack D Certified: ${packD_qids.length}`);
console.log(`Pack E Certified: ${packE_qids.length}`);
console.log(`Total Certified: ${packB_qids.length + packC_qids.length + packD_qids.length + packE_qids.length}`);

// Check Pack D sections
const sections = {};
packD_qids.forEach(qid => {
    const section = qid.match(/P1-([A-Z]+)-\d+/);
    if (section) {
        sections[section[1]] = (sections[section[1]] || 0) + 1;
    }
});
console.log('\nPack D sections:', JSON.stringify(sections));

// Check Pack B sections
const sectionsB = {};
packB_qids.forEach(qid => {
    const section = qid.match(/P1B-([A-Z])-/);
    if (section) {
        sectionsB[section[1]] = (sectionsB[section[1]] || 0) + 1;
    }
});
console.log('Pack B sections:', JSON.stringify(sectionsB));

// Check Pack C sections
const sectionsC = {};
packC_qids.forEach(qid => {
    const section = qid.match(/P1-([A-Z]+)-/);
    if (section) {
        sectionsC[section[1]] = (sectionsC[section[1]] || 0) + 1;
    }
});
console.log('Pack C sections:', JSON.stringify(sectionsC));

// Check Pack E sections
const sectionsE = {};
packE_qids.forEach(qid => {
    const section = qid.match(/P1E-([A-Z])-/);
    if (section) {
        sectionsE[section[1]] = (sectionsE[section[1]] || 0) + 1;
    }
});
console.log('Pack E sections:', JSON.stringify(sectionsE));

// Check for any duplicate QIDs across packs
const allQIDs = [...packB_qids, ...packC_qids, ...packD_qids, ...packE_qids];
const uniqueQIDs = new Set(allQIDs);
console.log(`\nTotal QIDs: ${allQIDs.length}, Unique: ${uniqueQIDs.size}`);
if (allQIDs.length !== uniqueQIDs.size) {
    const seen = {};
    const dupes = [];
    allQIDs.forEach(q => { if (seen[q]) dupes.push(q); seen[q] = true; });
    console.log('DUPLICATES:', dupes);
}

// Output full sorted lists
const output = {
    CERTIFIED_POPULATION_ALL: {
        count: allQIDs.length,
        uniqueCount: uniqueQIDs.size,
        packB: { count: packB_qids.length, qids: packB_qids },
        packC: { count: packC_qids.length, qids: packC_qids },
        packD: { count: packD_qids.length, qids: packD_qids },
        packE: { count: packE_qids.length, qids: packE_qids }
    },
    // Treat ALL as missing since no verifiable complete-evidence list exists
    PRIMARY_LEDGER_COMPLETE: {
        count: 0,
        note: 'No per-item derivation evidence found in verifiable repository form. Prior 166 count is UNVERIFIED.',
        qids: []
    },
    PRIMARY_LEDGER_MISSING_OR_INSUFFICIENT: {
        count: uniqueQIDs.size,
        note: 'All 873 Certified items require primary independent derivation.',
        qids: [...uniqueQIDs].sort()
    },
    PRIMARY_LEDGER_CONFLICTING: {
        count: 0,
        note: 'No conflicting evidence identified (all items are unverified, not conflicting).',
        qids: []
    },
    PARSE_BLOCKED_OR_MALFORMED: {
        packC: { 
            status: 'REGEX_ONLY', 
            note: 'Function constructor parse fails due to missing comma near line 7957. QIDs extracted via regex. 174 unique Certified QIDs confirmed.', 
            sourceLimitation: true
        },
        packA: {
            status: 'PARSE_BLOCKED',
            note: 'Not in active pool (not loaded by index_updated.html). Function constructor parse fails due to double comma near line 9602.',
            sourceLimitation: true,
            excluded: true
        }
    }
};

fs.writeFileSync(
    path.join(WORKDIR, 'reports', 'phase0b_population_reconciliation.json'),
    JSON.stringify(output, null, 2)
);
console.log('\nWrote phase0b_population_reconciliation.json');

// Now build the batch manifest
// Missing scope: all 873 items across packs D, E, C, B
// Batch size: 16-24 QIDs per batch
// Order: Pack D → Pack E → Pack C → Pack B

function buildBatches(qids, label, maxSize) {
    const batches = [];
    for (let i = 0; i < qids.length; i += maxSize) {
        const batch = qids.slice(i, i + maxSize);
        batches.push(batch);
    }
    return batches;
}

const allMissing = [...uniqueQIDs].sort();
const batches = buildBatches(allMissing, 'FULL', 22);

console.log(`\nBatch manifest: ${batches.length} batches, avg size ${Math.round(allMissing.length / batches.length)}`);

// Sort into pack order: D first, then E, then C, then B
const packOrder = { 'D': 0, 'E': 1, 'C': 2, 'B': 3 };
function getPack(qid) {
    if (qid.startsWith('P1B-')) return 'B';
    if (qid.startsWith('P1E-')) return 'E';
    if (qid.startsWith('P1-AC-') || qid.startsWith('P1-BC-') || qid.startsWith('P1-CC-') || 
        qid.startsWith('P1-DC-') || qid.startsWith('P1-EC-') || qid.startsWith('P1-FC-')) return 'C';
    if (qid.startsWith('P1-AD-') || qid.startsWith('P1-BD-') || qid.startsWith('P1-CD-') || 
        qid.startsWith('P1-DD-') || qid.startsWith('P1-ED-') || qid.startsWith('P1-FD-')) return 'D';
    return '?';
}

// Group by pack and section
const byPackSection = {};
allMissing.forEach(qid => {
    const p = getPack(qid);
    const s = qid.match(/P1[BEC]?[A-Z]?-([A-Z]+)-\d+/);
    const section = s ? s[1] : qid.substring(0, 8);
    if (section) {
        const key = `${p}_${section}`;
        if (!byPackSection[key]) byPackSection[key] = [];
        byPackSection[key].push(qid);
    }
});

console.log('\nPer-pack-section counts:');
for (const [key, qids] of Object.entries(byPackSection)) {
    console.log(`  ${key}: ${qids.length}`);
}

// Build manifest ordered by pack (D, E, C, B), preserving section contiguity
const orderedQIDs = [];
const packPriority = ['D', 'E', 'C', 'B'];
for (const pp of packPriority) {
    for (const [key, qids] of Object.entries(byPackSection)) {
        if (key.startsWith(pp + '_')) {
            orderedQIDs.push(...qids.sort());
        }
    }
}

console.log(`\nOrdered QID count: ${orderedQIDs.length}`);
console.log('First 5:', orderedQIDs.slice(0, 5));
console.log('Last 5:', orderedQIDs.slice(-5));

// Build batches from ordered QIDs
const batchSize = 22;
const batchManifest = [];
let batchNum = 1;
for (let i = 0; i < orderedQIDs.length; i += batchSize) {
    const batchQids = orderedQIDs.slice(i, i + batchSize);
    const packs = new Set(batchQids.map(getPack));
    const sections = new Set(batchQids.map(q => q.match(/P1[BEC]?[A-Z]?-([A-Z]+)-\d+/)?.[1] || '?'));
    batchManifest.push({
        batchId: `BATCH-${String(batchNum).padStart(3, '0')}`,
        pack: [...packs].join('/'),
        sections: [...sections].join('/'),
        qidList: batchQids,
        count: batchQids.length,
        primaryReviewer: 'Agent-Primary',
        reservedIndependentReviewer: 'Agent-Independent',
        status: 'QUEUED'
    });
    batchNum++;
}

console.log(`\nFinal batch manifest: ${batchManifest.length} batches`);
batchManifest.forEach(b => {
    console.log(`  ${b.batchId}: Pack ${b.pack}, Sections ${b.sections}, ${b.count} QIDs`);
});

// Write manifest
fs.writeFileSync(
    path.join(WORKDIR, 'reports', 'phase0b_batch_manifest.json'),
    JSON.stringify({ totalQIDs: orderedQIDs.length, batchCount: batches.length, batches: batchManifest }, null, 2)
);
console.log('\nWrote phase0b_batch_manifest.json');
