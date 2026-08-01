// Session 67: Certify all 8 CASE-A* migrated cases in scored_cases.js
const fs = require('fs');
const file = 'content/cases/legacy/scored_cases.js';
let content = fs.readFileSync(file, 'utf8');

const caseIDs = [
  'CASE-A1', 'CASE-A-C1', 'CASE-A-D1', 'CASE-A2',
  'CASE-A-C4', 'CASE-A-D5', 'CASE-A-C9', 'CASE-A-D10'
];

let changes = 0;
let itemChanges = 0;

for (const cid of caseIDs) {
  // Item-level: ItemID: "CID-QN" … question_state: "Unprocessed" → "Certified"
  const itemRE = new RegExp(`(ItemID":\\s*"${cid}-Q\\d+",[\\s\\S]{0,600}?)"question_state":\\s*"Unprocessed"`, 'g');
  content = content.replace(itemRE, (match, prefix) => {
    itemChanges++;
    changes++;
    return prefix + '"question_state": "Certified"';
  });

  // Case-level question_state
  const caseQSP = new RegExp(`("CaseID":\\s*"${cid}"[\\s\\S]*?)"question_state":\\s*"Unprocessed"`);
  content = content.replace(caseQSP, (match, prefix) => {
    changes++;
    return prefix + '"question_state": "Certified"';
  });

  // Case-level ProductionStatus: "Draft" → "Production"
  const prodP = new RegExp(`("CaseID":\\s*"${cid}"[\\s\\S]*?)"ProductionStatus":\\s*"Draft"`);
  content = content.replace(prodP, (match, prefix) => {
    changes++;
    return prefix + '"ProductionStatus": "Production"';
  });

  console.log(`${cid}: done`);
}

console.log(`\nItem-level changes: ${itemChanges}`);
console.log(`Total field changes: ${changes}`);

fs.writeFileSync(file, content, 'utf8');
console.log('Written scored_cases.js');
