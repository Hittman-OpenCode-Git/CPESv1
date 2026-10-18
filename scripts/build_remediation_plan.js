const fs = require('fs');
const path = require('path');

// Load flags
const raw = fs.readFileSync('scripts/output/case_semantic_flags.json', 'utf8');
const { flags, census } = JSON.parse(raw);

// Find the actual pack files
const casePackFiles = [
  'content/cases/case_pack_1_corrected.js',
  'content/cases/case_pack_2_corrected.js',
  'content/cases/case_pack_3_corrected.js',
  'content/cases/case_pack_4_corrected.js',
  'content/cases/case_pack_5_corrected.js',
  'content/cases/case_pack_6_corrected.js',
  'content/cases/case_pack_7_corrected.js',
  'content/cases/case_pack_8_corrected.js',
];

// Build a map of caseId -> pack file
const caseIdToFile = {};
for (const file of casePackFiles) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const func = new Function(content);
  const result = func();
  const cases = result.CASE_PACK || result.casePack || result.CASE_PACK_1 || [];
  for (const c of cases) {
    caseIdToFile[c.CaseID] = file;
  }
}

// Also check P2 case packs
const p2PackFiles = [
  'p2/case_pack_p2_1.js',
  'p2/case_pack_p2_2.js',
  'p2/case_pack_p2_3.js',
  'p2/case_pack_p2_C4_C8.js',
  'p2/case_pack_p2_authored.js',
];
for (const file of p2PackFiles) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const func = new Function(content);
  const result = func();
  const cases = result.CASE_PACK || result.casePack || result.CASE_PACK_1 || [];
  for (const c of cases) {
    caseIdToFile[c.CaseID] = file;
  }
}

console.log('Case ID to file map built:', Object.keys(caseIdToFile).length, 'cases');

// Group flags by file
const flagsByFile = {};
for (const f of flags) {
  const file = caseIdToFile[f.caseId];
  if (!file) continue;
  if (!flagsByFile[file]) flagsByFile[file] = [];
  flagsByFile[file].push(f);
}

console.log('Files with flags:', Object.keys(flagsByFile).length);
for (const [file, f] of Object.entries(flagsByFile)) {
  console.log(`  ${file}: ${f.length} flags`);
}

// Now categorize flags by type for remediation
const categories = {
  SHORT: { items: [], color: 'cyan' },
  EXTRA_REFUTED: { items: [], color: 'yellow' },
  UNSUPPORTED: { items: [], color: 'red' },
  DISJOINT: { items: [], color: 'red' },
  INVERSION: { items: [], color: 'magenta' },
  SIGN_CONVENTION: { items: [], color: 'blue' },
  JACCARD: { items: [], color: 'green' },
  MULTI_MISMATCH: { items: [], color: 'yellow' },
  NUMBERS_ABSENT: { items: [], color: 'red' }
};

for (const f of flags) {
  const detail = f.detail || '';
  const cat = detail.includes('SHORT:') || detail.includes('content words') ? 'SHORT' :
    detail.includes('EXTRA-REFUTED') ? 'EXTRA_REFUTED' :
    detail.includes('UNSUPPORTED-CORRECT') ? 'UNSUPPORTED' :
    detail.includes('DISJOINT') ? 'DISJOINT' :
    detail.includes('INVERSION') ? 'INVERSION' :
    detail.includes('SIGN-CONVENTION') ? 'SIGN_CONVENTION' :
    detail.includes('jaccard') ? 'JACCARD' :
    detail.includes('predicted') && detail.includes('stored') ? 'MULTI_MISMATCH' :
    detail.includes('absent from Explanation') ? 'NUMBERS_ABSENT' : 'OTHER';

  if (!categories[cat]) categories[cat] = { items: [] };
  categories[cat].items.push({
    ...f,
    file: caseIdToFile[f.caseId],
    qid: f.itemId,
    caseId: f.caseId
  });
}

console.log('\n=== Category Summary ===');
for (const [cat, data] of Object.entries(categories)) {
  if (data.items.length > 0) {
    const cert = data.items.filter(i => i.itemState === 'Certified').length;
    const audit = data.items.filter(i => i.itemState === 'In Audit').length;
    console.log(`${cat}: ${data.items.length} total (${cert} Certified, ${audit} In Audit)`);
  }
}

// Save categorized flags for remediation
const output = {
  generated: new Date().toISOString(),
  categories: {},
  totalFlags: flags.length,
  totalFiles: Object.keys(flagsByFile).length
};

for (const [cat, data] of Object.entries(categories)) {
  output.categories[cat] = {
    count: data.items.length,
    certified: data.items.filter(i => i.itemState === 'Certified').length,
    inAudit: data.items.filter(i => i.itemState === 'In Audit').length,
    items: data.items.map(i => ({
      caseId: i.caseId,
      itemId: i.itemId,
      itemState: i.itemState,
      severity: i.severity,
      detail: i.detail,
      file: i.file,
      qid: i.qid
    }))
  };
}

fs.writeFileSync('scripts/output/case_remediation_categories.json', JSON.stringify(output, null, 2));
console.log('\nCategories saved to scripts/output/case_remediation_categories.json');

// Create batch plan (≤30 per batch per Rule 5)
let batchNum = 1;
let batchItems = [];
const batchPlan = [];

const sortedCategories = Object.entries(categories).sort((a,b) => b[1].items.length - a[1].items.length);
for (const [cat, data] of sortedCategories) {
  for (const item of data.items) {
    batchItems.push({ ...item, category: cat });
    if (batchItems.length >= 30) {
      batchPlan.push({
        batch: `Batch ${batchNum}`,
        categories: [...new Set(batchItems.map(i => i.category))],
        count: batchItems.length,
        items: batchItems.map(i => ({ caseId: i.caseId, itemId: i.itemId, category: i.category }))
      });
      batchNum++;
      batchItems = [];
    }
  }
}
if (batchItems.length > 0) {
  batchPlan.push({
    batch: `Batch ${batchNum}`,
    categories: [...new Set(batchItems.map(i => i.category))],
    count: batchItems.length,
    items: batchItems.map(i => ({ caseId: i.caseId, itemId: i.itemId, category: i.category }))
  });
}

console.log('\n=== Batch Plan ===');
console.log(`Total batches: ${batchPlan.length}`);
for (const bp of batchPlan) {
  console.log(`${bp.batch}: ${bp.count} items (${bp.categories.join(', ')})`);
}

output.batchPlan = batchPlan;
fs.writeFileSync('scripts/output/case_remediation_plan.json', JSON.stringify(output, null, 2));
console.log('\nFull remediation plan saved.');