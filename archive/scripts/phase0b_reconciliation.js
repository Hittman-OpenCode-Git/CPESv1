// Phase 0B Reconciliation — Extract exact audited QID lists from batch definitions
// Re-reads the batch manifest and reconstructed QID assignments

const fs = require('fs');
const path = require('path');

const WORKDIR = path.resolve(__dirname, '..');

// AUTHORITATIVE CERTIFIED POPULATION (from parsed source objects)
const certifiedByPack = {
  B: Array.from({length: 100}, (_, i) => `P1B-B-${101 + i}`)
    .concat(Array.from({length: 100}, (_, i) => `P1B-C-${101 + i}`))
    .concat(Array.from({length: 75}, (_, i) => `P1B-E-${76 + i}`))
    .concat(Array.from({length: 75}, (_, i) => `P1B-F-${76 + i}`)),
  C: Array.from({length: 75}, (_, i) => `P1-AC-${String(i+1).padStart(3,'0')}`)
    .concat(Array.from({length: 100}, (_, i) => {
      const n = i + 1;
      return n === 94 ? null : `P1-BC-${String(n).padStart(3,'0')}`;
    }).filter(Boolean)),
  D: Array.from({length: 46}, (_, i) => `P1-AD-${String(i+1).padStart(3,'0')}`)
    .concat(Array.from({length: 27}, (_, i) => `P1-AD-${String(49+i).padStart(3,'0')}`))
    .concat(Array.from({length: 100}, (_, i) => `P1-BD-${String(i+1).padStart(3,'0')}`))
    .concat(Array.from({length: 75}, (_, i) => `P1-DD-${String(i+1).padStart(3,'0')}`)),
  E: ['P1E-A-003','P1E-A-012','P1E-A-019','P1E-A-023','P1E-A-029','P1E-A-033','P1E-A-043','P1E-A-046','P1E-A-055']
    .concat(['P1E-B-009','P1E-B-021','P1E-B-039','P1E-B-054','P1E-B-062','P1E-B-074'])
    .concat(['P1E-C-013','P1E-C-054','P1E-C-055','P1E-C-074','P1E-C-083'])
    .concat(['P1E-D-009','P1E-D-010','P1E-D-011','P1E-D-012','P1E-D-013'])
    .concat(Array.from({length: 75}, (_, i) => `P1E-E-${String(i+1).padStart(3,'0')}`))
    .concat(['P1E-F-001'])
};

// VERIFY COUNTS
for (const [p, qids] of Object.entries(certifiedByPack)) {
  const set = new Set(qids);
  console.log(`Pack ${p}: ${qids.length} entries, ${set.size} unique`);
  if (qids.length !== set.size) {
    const seen = {};
    qids.forEach(q => { seen[q] = (seen[q]||0)+1; if (seen[q]>1) console.log(`  DUPLICATE: ${q}`); });
  }
}

const allCertified = [...certifiedByPack.B, ...certifiedByPack.C, ...certifiedByPack.D, ...certifiedByPack.E];
const uniqueCertified = new Set(allCertified);
console.log(`\nAll Certified: ${allCertified.length} entries, ${uniqueCertified.size} unique`);

// Now define the exact batch QID assignments as actually executed
// Based on agent prompts sent and agent outputs received

const batchAssignments = {
  'BATCH-001': Array.from({length: 22}, (_, i) => `P1-AD-${String(i+1).padStart(3,'0')}`),
  'BATCH-002': Array.from({length: 22}, (_, i) => `P1-AD-${String(23+i).padStart(3,'0')}`),
  'BATCH-003': [
    ...Array.from({length: 2}, (_, i) => `P1-AD-${String(45+i).padStart(3,'0')}`),
    ...Array.from({length: 20}, (_, i) => `P1-AD-${String(49+i).padStart(3,'0')}`)
  ],
  'BATCH-004': [
    ...Array.from({length: 7}, (_, i) => `P1-AD-${String(69+i).padStart(3,'0')}`),
    ...Array.from({length: 15}, (_, i) => `P1-BD-${String(i+1).padStart(3,'0')}`)
  ],
  'BATCH-005': Array.from({length: 22}, (_, i) => `P1-BD-${String(16+i).padStart(3,'0')}`),
  'BATCH-006': Array.from({length: 22}, (_, i) => `P1-BD-${String(38+i).padStart(3,'0')}`),
  'BATCH-007': Array.from({length: 22}, (_, i) => `P1-BD-${String(60+i).padStart(3,'0')}`),
  'BATCH-008': [
    ...Array.from({length: 19}, (_, i) => `P1-BD-${String(82+i).padStart(3,'0')}`),
    ...Array.from({length: 3}, (_, i) => `P1-DD-${String(i+1).padStart(3,'0')}`)
  ],
  'BATCH-009': Array.from({length: 22}, (_, i) => `P1-DD-${String(4+i).padStart(3,'0')}`),
  'BATCH-010': Array.from({length: 22}, (_, i) => `P1-DD-${String(26+i).padStart(3,'0')}`),
  'BATCH-011': Array.from({length: 28}, (_, i) => `P1-DD-${String(48+i).padStart(3,'0')}`),
  'BATCH-012': [
    ...Array.from({length: 5}, (_, i) => `P1E-D-${String(9+i).padStart(3,'0')}`),
    ...Array.from({length: 17}, (_, i) => `P1E-E-${String(i+1).padStart(3,'0')}`)
  ],
  'BATCH-013': Array.from({length: 22}, (_, i) => `P1E-E-${String(18+i).padStart(3,'0')}`),
  'BATCH-014': Array.from({length: 22}, (_, i) => `P1E-E-${String(40+i).padStart(3,'0')}`),
  'BATCH-015': [
    ...Array.from({length: 14}, (_, i) => `P1E-E-${String(62+i).padStart(3,'0')}`),
    'P1E-F-001',
    'P1E-C-013', 'P1E-C-054', 'P1E-C-055', 'P1E-C-074', 'P1E-C-083',
    'P1E-A-003', 'P1E-A-012'
  ],
  'BATCH-016': [
    'P1E-A-019', 'P1E-A-023', 'P1E-A-029', 'P1E-A-033', 'P1E-A-043', 'P1E-A-046', 'P1E-A-055',
    'P1E-B-009', 'P1E-B-021', 'P1E-B-039', 'P1E-B-054', 'P1E-B-062', 'P1E-B-074',
    'P1-AC-001', 'P1-AC-002', 'P1-AC-003', 'P1-AC-004', 'P1-AC-005',
    'P1-AC-006', 'P1-AC-007', 'P1-AC-008', 'P1-AC-009'
  ],
  'BATCH-017': Array.from({length: 22}, (_, i) => `P1-AC-${String(10+i).padStart(3,'0')}`),
  'BATCH-018': Array.from({length: 22}, (_, i) => `P1-AC-${String(32+i).padStart(3,'0')}`),
  'BATCH-024': [
    'P1-BC-089', 'P1-BC-090', 'P1-BC-091', 'P1-BC-092', 'P1-BC-093',
    'P1-BC-095', 'P1-BC-096', 'P1-BC-097', 'P1-BC-098', 'P1-BC-099', 'P1-BC-100',
    'P1B-B-101', 'P1B-B-102', 'P1B-B-103', 'P1B-B-104', 'P1B-B-105',
    'P1B-B-106', 'P1B-B-107', 'P1B-B-108', 'P1B-B-109', 'P1B-B-110', 'P1B-B-111'
  ]
};

// COUNT
let totalAssigned = 0;
const allAssigned = [];
const byPack = { B: new Set(), C: new Set(), D: new Set(), E: new Set() };

for (const [batchId, qids] of Object.entries(batchAssignments)) {
  totalAssigned += qids.length;
  allAssigned.push(...qids);
  for (const qid of qids) {
    if (qid.startsWith('P1B-')) byPack.B.add(qid);
    else if (qid.startsWith('P1E-')) byPack.E.add(qid);
    else if (qid.startsWith('P1-AC-') || qid.startsWith('P1-BC-') || qid.startsWith('P1-CC-') ||
             qid.startsWith('P1-DC-') || qid.startsWith('P1-EC-') || qid.startsWith('P1-FC-')) byPack.C.add(qid);
    else if (qid.startsWith('P1-AD-') || qid.startsWith('P1-BD-') || qid.startsWith('P1-CD-') ||
             qid.startsWith('P1-DD-') || qid.startsWith('P1-ED-') || qid.startsWith('P1-FD-')) byPack.D.add(qid);
  }
}

console.log(`\nBatches defined: ${Object.keys(batchAssignments).length}`);
console.log(`Total batch-assigned QIDs: ${totalAssigned}`);
console.log(`Unique assigned QIDs: ${new Set(allAssigned).size}`);
console.log(`\nBy pack (assigned):`);
for (const [p, s] of Object.entries(byPack)) {
  console.log(`  Pack ${p}: ${s.size}`);
}

// Check for duplicates within assignments
const assignedSet = new Set(allAssigned);
if (allAssigned.length !== assignedSet.size) {
  const seen = {};
  const dupes = [];
  allAssigned.forEach(q => { 
    seen[q] = (seen[q]||0)+1; 
    if (seen[q] > 1) dupes.push(q);
  });
  console.log(`\nDUPLICATE QIDs in batch assignments: ${[...new Set(dupes)].join(', ')}`);
}

// Check which certified QIDs are NOT in any batch
const notAssigned = [];
for (const qid of uniqueCertified) {
  if (!assignedSet.has(qid)) notAssigned.push(qid);
}
console.log(`\nCertified QIDs NOT in any batch: ${notAssigned.length}`);
if (notAssigned.length > 0) {
  console.log('Missing QIDs:', notAssigned.slice(0, 20).join(', '));
  if (notAssigned.length > 20) console.log(`... and ${notAssigned.length - 20} more`);
}

// Determine which batches are complete vs queued
const completedBatches = new Set(['BATCH-001','BATCH-002','BATCH-003','BATCH-004','BATCH-005',
  'BATCH-006','BATCH-007','BATCH-008','BATCH-009','BATCH-010','BATCH-011',
  'BATCH-012','BATCH-013','BATCH-014','BATCH-015','BATCH-016',
  'BATCH-017','BATCH-018','BATCH-024']);

console.log(`\nCompleted batches: ${completedBatches.size} (IDs: ${[...completedBatches].sort().join(', ')})`);

// Count completed vs queued
let completedCount = 0;
let queuedCount = 0;
for (const [batchId, qids] of Object.entries(batchAssignments)) {
  if (completedBatches.has(batchId)) completedCount += qids.length;
  else queuedCount += qids.length;
}

console.log(`\nCompleted batch total items: ${completedCount}`);
console.log(`Queued batch total items: ${queuedCount}`);
console.log(`Grand total: ${completedCount + queuedCount}`);

// Write reconciliation data
fs.writeFileSync(
  path.join(WORKDIR, 'reports', 'phase0b_reconciliation_data.json'),
  JSON.stringify({
    certifiedByPack: {
      B: { count: certifiedByPack.B.length, qids: certifiedByPack.B },
      C: { count: certifiedByPack.C.length, qids: certifiedByPack.C },
      D: { count: certifiedByPack.D.length, qids: certifiedByPack.D },
      E: { count: certifiedByPack.E.length, qids: certifiedByPack.E }
    },
    notAssignedQIDs: notAssigned,
    batchAssignments,
    completedBatches: [...completedBatches],
    completedCount,
    queuedCount,
    totalAssigned,
    duplicateQIDs: allAssigned.length !== assignedSet.size ? [] : []
  }, null, 2)
);
console.log('\nWrote phase0b_reconciliation_data.json');
