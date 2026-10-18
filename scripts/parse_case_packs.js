const fs = require('fs');

function parseCasePack(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/const\s+\w+\s*=\s*(\[[\s\S]*\])/);
  if (!match) return [];
  try {
    const arr = eval('(' + match[1] + ')');
    return arr;
  } catch (e) {
    console.log('Parse error:', filePath, e.message);
    return [];
  }
}

const packFiles = [
  'content/cases/case_pack_1_corrected.js',
  'content/cases/case_pack_2_corrected.js',
  'content/cases/case_pack_3_corrected.js',
  'content/cases/case_pack_4_corrected.js',
  'content/cases/case_pack_5_corrected.js',
  'content/cases/case_pack_6_corrected.js',
  'content/cases/case_pack_7_corrected.js',
  'content/cases/case_pack_8_corrected.js',
];

const p2PackFiles = [
  'p2/case_pack_p2_1.js',
  'p2/case_pack_p2_2.js',
  'p2/case_pack_p2_3.js',
  'p2/case_pack_p2_C4_C8.js',
  'p2/case_pack_p2_authored.js',
];

const caseIdToFile = {};

for (const file of [...packFiles, ...p2PackFiles]) {
  if (!fs.existsSync(file)) continue;
  const cases = parseCasePack(file);
  for (const c of cases) {
    caseIdToFile[c.CaseID] = file;
  }
}

console.log('Total cases mapped:', Object.keys(caseIdToFile).length);

// Now load flags and map to files
const flags = JSON.parse(fs.readFileSync('scripts/output/case_semantic_flags.json', 'utf8')).flags;

const flagsByFile = {};
for (const f of flags) {
  const file = caseIdToFile[f.caseId];
  if (!file) continue;
  if (!flagsByFile[file]) flagsByFile[file] = [];
  flagsByFile[file].push(f);
}

console.log('\nFiles with flags:', Object.keys(flagsByFile).length);
for (const [file, f] of Object.entries(flagsByFile)) {
  console.log(`  ${file}: ${f.length} flags`);
}

// Categorize
const categories = {
  SHORT: [],
  EXTRA_REFUTED: [],
  UNSUPPORTED: [],
  DISJOINT: [],
  INVERSION: [],
  SIGN_CONVENTION: [],
  JACCARD: [],
  MULTI_MISMATCH: [],
  NUMBERS_ABSENT: []
};

for (const f of flags) {
  const file = caseIdToFile[f.caseId];
  if (!file) continue;
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

  categories[detail.includes('absent from Explanation') ? 'NUMBERS_ABSENT' : (categories[detail.split(':')[0].replace(' ', '_')] ? detail.split(':')[0].replace(' ', '_') : 'SHORT')].push({
    ...f,
    file: caseIdToFile[f.caseId],
    qid: f.itemId,
    caseId: f.caseId
  });
}

// Let's use a simpler approach - categorize based on detail text patterns
const categorized = {
  SHORT: [],
  EXTRA_REFUTED: [],
  UNSUPPORTED: [],
  DISJOINT: [],
  INVERSION: [],
  SIGN_CONVENTION: [],
  JACCARD: [],
  MULTI_MISMATCH: [],
  NUMBERS_ABSENT: []
};

for (const f of flags) {
  const file = caseIdToFile[f.caseId];
  if (!file) continue;
  const detail = f.detail || '';
  const item = { ...f, file, qid: f.itemId, caseId: f.caseId };

  if (detail.includes('SHORT:') || detail.includes('content words')) {
    categorized.SHORT.push(item);
  } else if (detail.includes('EXTRA-REFUTED')) {
    categorized.EXTRA_REFUTED.push(item);
  } else if (detail.includes('UNSUPPORTED-CORRECT')) {
    categorized.UNSUPPORTED.push(item);
  } else if (detail.includes('DISJOINT')) {
    categorized.DISJOINT.push(item);
  } else if (detail.includes('INVERSION')) {
    categorized.INVERSION.push(item);
  } else if (detail.includes('SIGN-CONVENTION')) {
    categorized.SIGN_CONVENTION.push(item);
  } else if (detail.includes('jaccard')) {
    categorized.JACCARD.push(item);
  } else if (detail.includes('predicted') && detail.includes('stored')) {
    categorized.MULTI_MISMATCH.push(item);
  } else if (detail.includes('absent from Explanation')) {
    categorized.NUMBERS_ABSENT.push(item);
  }
}

console.log('\n=== Category Summary ===');
for (const [cat, items] of Object.entries(categorized)) {
  if (items.length === 0) continue;
  const cert = items.filter(i => i.itemState === 'Certified').length;
  const audit = items.filter(i => i.itemState === 'In Audit').length;
  console.log(`${cat}: ${items.length} total (${cert} Certified, ${audit} In Audit)`);
  for (const i of items.slice(0, 5)) {
    console.log(`  ${i.caseId}/${i.itemId} (${i.itemState}): ${i.detail.substring(0, 60)}`);
  }
}

// Save categorized
const output = {
  generated: new Date().toISOString(),
  totalFlags: flags.length,
  categories: {}
};

for (const [cat, items] of Object.entries(categorized)) {
  output.categories[cat] = {
    count: items.length,
    certified: items.filter(i => i.itemState === 'Certified').length,
    inAudit: items.filter(i => i.itemState === 'In Audit').length,
    items: items.map(i => ({
      caseId: i.caseId,
      itemId: i.itemId,
      itemState: i.itemState,
      severity: i.severity,
      detail: i.detail,
      file: caseIdToFile[i.caseId],
      qid: i.itemId
    }))
  };
}

fs.writeFileSync('scripts/output/case_remediation_categories.json', JSON.stringify(output, null, 2));
console.log('\nCategories saved.');