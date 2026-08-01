// SESSION 916-917: Case Pack 3×25 Consolidation Script
// Extracts ENHANCED_CASE_BASE arrays, redistributes into 3 packs of 25,
// generates new case_pack_N_corrected.js files with CASE_BANK_X + MIGRATED_CASE_BASE_X aliases.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';
const BACKUP_DIR = path.join(BASE, 'backups');
const REPORTS_DIR = path.join(BASE, 'reports');

const FILES = [
{ file: 'content/cases/legacy/scored_cases.js', var: 'ENHANCED_CASE_BASE', pack: '1' },
{ file: 'content/cases/legacy/scored_cases2.js', var: 'ENHANCED_CASE_BASE2', pack: '2' },
{ file: 'content/cases/legacy/scored_cases3.js', var: 'ENHANCED_CASE_BASE3', pack: '3' },
{ file: 'content/cases/legacy/scored_cases4.js', var: 'ENHANCED_CASE_BASE4', pack: '4' },
{ file: 'content/cases/legacy/scored_cases5.js', var: 'ENHANCED_CASE_BASE5', pack: '5' }
];

// Step 1: Backup all 5 scored_cases files
console.log('=== STEP 1: BACKUP ===');
const ts = new Date().toISOString().replace(/[:.]/g, '').slice(0, 15);
for (const f of FILES) {
  const src = path.join(BASE, f.file);
  const dest = path.join(BACKUP_DIR, `${f.file}.bak-s916-${ts}`);
  fs.copyFileSync(src, dest);
  console.log(`  Backup: ${f.file} -> ${dest} (${fs.statSync(dest).size} bytes)`);
}

// Step 2: Parse each ENHANCED_CASE_BASE array
console.log('\n=== STEP 2: PARSE ===');
let allCases = [];
for (const f of FILES) {
  const src = path.join(BASE, f.file);
  let raw = fs.readFileSync(src, 'utf8');
  
  // Find the array - it starts with "const VARNAME = ["
  const declStart = raw.indexOf(`const ${f.var} = [`);
  if (declStart === -1) { console.log(`  SKIP ${f.file}: variable ${f.var} not found`); continue; }
  
  // Strip the "const VARNAME = " prefix, keep the array literal
  const prefixLen = `const ${f.var} = `.length;
  const arrLiteral = raw.slice(declStart + prefixLen);
  
  // Use Function constructor to evaluate the array literal
  const fn = new Function(`return ${arrLiteral}`);
  const arr = fn();
  
  console.log(`  ${f.file} -> ${f.var}: ${arr.length} cases`);
  
  for (const c of arr) {
    allCases.push({
      ...c,
      _source_file: f.file,
      _source_var: f.var,
      _source_pack: f.pack
    });
  }
}

console.log(`\n  TOTAL: ${allCases.length} cases`);

// Step 3: Categorize by section
console.log('\n=== STEP 3: SECTION DISTRIBUTION ===');
const bySection = { A: [], B: [], C: [], D: [], E: [], F: [] };
for (const c of allCases) {
  const sec = (c.SectionTags && c.SectionTags[0]) || '?';
  if (bySection[sec]) bySection[sec].push(c);
}

for (const [sec, cases] of Object.entries(bySection)) {
  const names = cases.map(c => `${c.CaseID}(${c.Items ? c.Items.length : '?'}it)`).join(', ');
  console.log(`  Section ${sec}: ${cases.length} cases => ${names}`);
}

// Step 4: Design 3×25 distribution
console.log('\n=== STEP 4: DISTRIBUTION PLAN ===');

// Actual section totals from parse: A=11, B=12, C=14, D=14, E=13, F=11 = 75
// Target per pack: A:4/4/3, B:4/4/4, C:5/5/4, D:5/5/4, E:4/4/5, F:3/3/5 = 25/25/25
const targetPerPack = [
  { A: 4, B: 4, C: 5, D: 5, E: 4, F: 3 },  // Pack 1 = 25
  { A: 4, B: 4, C: 5, D: 5, E: 4, F: 3 },  // Pack 2 = 25
  { A: 3, B: 4, C: 4, D: 4, E: 5, F: 5 }   // Pack 3 = 25
];
// Verify totals: A:4+4+3=11✓ B:4+4+4=12✓ C:5+5+4=14✓ D:5+5+4=14✓ E:4+4+5=13✓ F:3+3+5=11✓

const packs = [[], [], []];
const assigned = {};

// Assign from each section to each pack based on targets
for (const [sec, cases] of Object.entries(bySection)) {
  // Sort cases by source pack + CaseID for stable ordering
  cases.sort((a, b) => {
    if (a._source_pack !== b._source_pack) return parseInt(a._source_pack) - parseInt(b._source_pack);
    return a.CaseID.localeCompare(b.CaseID);
  });
  
  let idx = 0;
  for (let p = 0; p < 3; p++) {
    const need = targetPerPack[p][sec] || 0;
    for (let n = 0; n < need && idx < cases.length; n++) {
      packs[p].push(cases[idx]);
      assigned[cases[idx].CaseID] = p + 1;
      idx++;
    }
  }
}

// Verify
console.log('  Distribution:');
for (let i = 0; i < 3; i++) {
  const secCount = {};
  packs[i].forEach(c => {
    const s = (c.SectionTags && c.SectionTags[0]) || '?';
    secCount[s] = (secCount[s] || 0) + 1;
  });
  const counts = Object.entries(secCount).map(([s, n]) => `${s}:${n}`).join(' ');
  const items = packs[i].reduce((sum, c) => sum + (c.Items ? c.Items.length : 0), 0);
  console.log(`  Pack ${i + 1}: ${packs[i].length} cases, ${items} items | ${counts}`);
}

// Step 5: Generate new case_pack files
console.log('\n=== STEP 5: GENERATE FILES ===');

const packNames = [
  { file: 'case_pack_1_corrected.js', var: 'CASE_PACK_1', bankA: 'CASE_BANK_A', migA: 'MIGRATED_CASE_BASE_A' },
  { file: 'case_pack_2_corrected.js', var: 'CASE_PACK_2', bankA: 'CASE_BANK_B', migA: 'MIGRATED_CASE_BASE_B' },
  { file: 'case_pack_3_corrected.js', var: 'CASE_PACK_3', bankA: 'CASE_BANK_C', migA: 'MIGRATED_CASE_BASE_C' }
];

for (let i = 0; i < 3; i++) {
  const pk = packNames[i];
  const cases = packs[i];
  
  // Build the JS file
  let output = `// CMA Part 1 Exam Simulator — Case Pack ${i + 1} (25 Cases)\n`;
  output += `// Generated: SESSION 916-917 Case Study Reconsolidation\n`;
  output += `// Source: Consolidated from scored_cases.js through scored_cases5.js\n`;
  output += `// Architecture: 3-pack × 25-case structure for 2026 blueprint alignment\n\n`;
  
  // Cases
  output += `const ${pk.var} = [\n`;
  for (let j = 0; j < cases.length; j++) {
    const c = cases[j];
    // Remove internal tracking fields
    const clean = { ...c };
    delete clean._source_file;
    delete clean._source_var;
    delete clean._source_pack;
    
    output += JSON.stringify(clean, null, 2);
    if (j < cases.length - 1) output += ',';
    output += '\n';
  }
  output += `];\n\n`;
  
  // Variable aliases for app.js catalog compatibility
  output += `// UI Catalog Aliases — resolves the 0-case display bug for Packs A/E\n`;
  output += `const ${pk.bankA} = ${pk.var};\n`;
  output += `const ${pk.migA} = ${pk.var};\n`;
  
  const destPath = path.join(BASE, pk.file);
  fs.writeFileSync(destPath, output, 'utf8');
  console.log(`  Wrote: ${pk.file} (${cases.length} cases, ${fs.statSync(destPath).size} bytes)`);
}

// Step 6: Output the distribution blueprint as JSON
const blueprint = {
  session: 'SESSION916',
  timestamp: new Date().toISOString(),
  total_cases: allCases.length,
  total_items: allCases.reduce((s, c) => s + (c.Items ? c.Items.length : 0), 0),
  packs: []
};

for (let i = 0; i < 3; i++) {
  const secCount = {};
  packs[i].forEach(c => {
    const s = (c.SectionTags && c.SectionTags[0]) || '?';
    secCount[s] = (secCount[s] || 0) + 1;
  });
  
  const items = packs[i].reduce((sum, c) => sum + (c.Items ? c.Items.length : 0), 0);
  
  blueprint.packs.push({
    pack: i + 1,
    filename: packNames[i].file,
    variable: packNames[i].var,
    catalog_alias: packNames[i].bankA,
    case_count: packs[i].length,
    item_count: items,
    section_distribution: secCount,
    case_ids: packs[i].map(c => c.CaseID)
  });
}

const bpPath = path.join(REPORTS_DIR, 'SESSION916_CONSOLIDATION_BLUEPRINT.json');
fs.writeFileSync(bpPath, JSON.stringify(blueprint, null, 2), 'utf8');
console.log(`\n  Blueprint written: ${bpPath}`);

console.log('\n=== SESSION 916-917 COMPLETE ===');
console.log('Next: Update index_updated.html + governance seal (SESSION 918)');
