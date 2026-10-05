const fs = require('fs');

const files = [
  'p2/case_pack_p2_1.js',
  'p2/case_pack_p2_2.js', 
  'p2/case_pack_p2_3.js',
  'p2/case_pack_p2_authored.js',
  'p2/case_pack_p2_C4_C8.js'
];

let allCaseIDs = new Set();
let totalOccurrences = 0;
let totalItems = 0;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  // Count CaseID occurrences
  const caseIdRegex = /"CaseID"\s*:\s*"([^"]+)"/g;
  let caseIdMatch;
  let occ = 0;
  while ((caseIdMatch = caseIdRegex.exec(content)) !== null) {
    occ++;
    allCaseIDs.add(caseIdMatch[1]);
  }
  totalOccurrences += occ;
  
  // Count ItemID occurrences
  const itemIdRegex = /"ItemID"\s*:\s*"([^"]+)"/g;
  let itemOcc = 0;
  while ((itemIdMatch = itemIdRegex.exec(content)) !== null) {
    itemOcc++;
  }
  totalItems += itemOcc;
  
  console.log(f + ': ' + occ + ' CaseID occurrences, ' + itemOcc + ' ItemID occurrences');
}

console.log('Total CaseID occurrences:', totalOccurrences);
console.log('Unique CaseIDs:', allCaseIDs.size);
console.log('Total Items (ItemID occurrences):', totalItems);

// List all unique CaseIDs sorted
const sorted = Array.from(allCaseIDs).sort();
console.log('\nUnique CaseIDs (' + sorted.length + '):');
for (const id of sorted) console.log('  ' + id);