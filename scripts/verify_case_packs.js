const fs = require('fs');
const BASE = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';

const files = [
  'case_pack_1_corrected.js',
  'case_pack_2_corrected.js',
  'case_pack_3_corrected.js'
];

let totalCases = 0;
let totalItems = 0;

for (const file of files) {
  const raw = fs.readFileSync(BASE + '\\' + file, 'utf8');
  
  // Find the main array declaration
  const varMatch = raw.match(/const (CASE_PACK_\d) = \[/);
  if (!varMatch) { console.log(file + ': NO ARRAY FOUND'); continue; }
  
  const arrStart = raw.indexOf('[', raw.indexOf(`const ${varMatch[1]} = [`));
  const arrEnd = raw.lastIndexOf('];');
  const arrText = raw.slice(arrStart, arrEnd + 2);
  
  const fn = new Function('return ' + arrText);
  const arr = fn();
  
  const secs = {};
  arr.forEach(c => {
    const s = (c.SectionTags && c.SectionTags[0]) || '?';
    secs[s] = (secs[s] || 0) + 1;
  });
  
  const items = arr.reduce((s, c) => s + (c.Items ? c.Items.length : 0), 0);
  const certItems = arr.reduce((s, c) => s + (c.Items || []).filter(it => it.question_state === 'Certified').length, 0);
  const ids = arr.map(c => c.CaseID).join(', ');
  
  totalCases += arr.length;
  totalItems += items;
  
  console.log(`${file}: ${arr.length} cases, ${items} items (${certItems} Certified)`);
  console.log(`  Sections: ${JSON.stringify(secs)}`);
  console.log(`  CaseIDs: ${ids}`);
  console.log(`  Variables: ${varMatch[1]}, aliases present: ${raw.includes('CASE_BANK_')}, ${raw.includes('MIGRATED_CASE_BASE_')}`);
  console.log();
}

console.log(`TOTAL: ${totalCases} cases, ${totalItems} items`);
console.log('ALL FILES PARSE: OK');
