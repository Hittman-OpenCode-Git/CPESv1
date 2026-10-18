const fs = require('fs');
const path = require('path');

// Load flags
const flags = JSON.parse(fs.readFileSync('scripts/output/case_semantic_flags.json', 'utf8')).flags;

// Categorize flags
const categories = {
  SHORT: [],          // C:SHORT - explanation too short
  EXTRA_REFUTED: [],  // B:EXTRA-REFUTED - covers too many distractors
  UNSUPPORTED: [],    // B:UNSUPPORTED-CORRECT - correct answer unsupported
  DISJOINT: [],       // B:DISJOINT - disjoint explanation
  INVERSION: [],      // B:INVERSION - key/explanation contradiction
  SIGN_CONVENTION: [],// B-num:SIGN-CONVENTION
  JACCARD: [],        // C:jaccard - low similarity
  MULTI_MISMATCH: []  // B:multi - prediction mismatch
};

for (const f of flags) {
  const detail = f.detail || '';
  const caseId = f.caseId || 'unknown';
  const itemId = f.itemId || 'unknown';
  const itemState = f.itemState || 'unknown';
  const screen = f.screen || 'unknown';
  const severity = f.severity || 'unknown';
  const bank = f.bank || '';
  const part = f.part || '';
  
  const item = { caseId, itemId, itemState, screen, severity, bank, part, detail };
  
  if (detail.includes('SHORT:') || detail.includes('content words')) {
    categories.SHORT.push(item);
  } else if (detail.includes('EXTRA-REFUTED')) {
    categories.EXTRA_REFUTED.push(item);
  } else if (detail.includes('UNSUPPORTED-CORRECT')) {
    categories.UNSUPPORTED.push(item);
  } else if (detail.includes('DISJOINT')) {
    categories.DISJOINT.push(item);
  } else if (detail.includes('INVERSION')) {
    categories.INVERSION.push(item);
  } else if (detail.includes('SIGN-CONVENTION')) {
    categories.SIGN_CONVENTION.push(item);
  } else if (detail.includes('jaccard')) {
    categories.JACCARD.push(item);
  } else if (detail.includes('predicted') && detail.includes('stored')) {
    categories.MULTI_MISMATCH.push(item);
  } else {
    // Unclassified
    categories[detail.split(':')[0]] = categories[detail.split(':')[0]] || [];
    categories[detail.split(':')[0]].push(item);
  }
}

// Print summary
console.log('=== Flag Categorization ===');
let total = 0;
for (const [cat, items] of Object.entries(categories)) {
  console.log(`${cat}: ${items.length}`);
  total += items.length;
}
console.log(`Total categorized: ${total}`);
console.log(`Total flags: ${flags.length}`);

// Get certified-state items per category
console.log('\n=== Certified-state items per category ===');
for (const [cat, items] of Object.entries(categories)) {
  const cert = items.filter(i => i.itemState === 'Certified');
  if (cert.length > 0) {
    console.log(`${cat}: ${cert.length} Certified`);
    console.log(`  QIDs: ${cert.slice(0, 5).map(c => c.itemId).join(', ')}...`);
  }
}

// Get In Audit items per category
console.log('\n=== In Audit items per category ===');
for (const [cat, items] of Object.entries(categories)) {
  const audit = items.filter(i => i.itemState === 'In Audit');
  if (audit.length > 0) {
    console.log(`${cat}: ${audit.length} In Audit`);
    console.log(`  QIDs: ${audit.slice(0, 5).map(c => c.itemId).join(', ')}...`);
  }
}

// Save categorized data
const output = {
  generated: new Date().toISOString(),
  categories: {},
  remediation_plan: []
};

for (const [cat, items] of Object.entries(categories)) {
  output.categories[cat] = {
    total: items.length,
    certified: items.filter(i => i.itemState === 'Certified').length,
    inAudit: items.filter(i => i.itemState === 'In Audit').length,
    nullState: items.filter(i => !i.itemState || i.itemState === 'null').length,
    sampleQids: items.slice(0, 3).map(i => i.itemId)
  };
}

// Calculate batches (≤30 per change-set per Rule 5)
const batchPlan = [];
let batchNum = 1;
let batchCount = 0;
let currentBatch = [];

for (const [cat, items] of Object.entries(categories)) {
  for (const item of items) {
    currentBatch.push(item);
    batchCount++;
    if (batchCount >= 30) {
      batchPlan.push({ batch: `Batch ${batchNum}`, category: cat, count: currentBatch.length, items: currentBatch.map(i => i.itemId) });
      batchNum++;
      currentBatch = [];
      batchCount = 0;
    }
  }
}
if (currentBatch.length > 0) {
  batchPlan.push({ batch: `Batch ${batchNum}`, category: cat, count: currentBatch.length, items: currentBatch.map(i => i.itemId) });
}

output.remediation_plan = batchPlan;
output.total_batches = batchNum;

fs.writeFileSync('scripts/output/case_remediation_plan.json', JSON.stringify(output, null, 2));
console.log(`\nRemediation plan saved: ${batchNum} batches across ${Object.keys(categories).length} categories`);
console.log('Output: scripts/output/case_remediation_plan.json');
