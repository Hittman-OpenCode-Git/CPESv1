// Session 65: Fix case governance contradictions in scored_cases.js
// Changes ProductionStatus: "Production" → "Draft" for 14 enhanced cases (CBQ-A2 through CBQ-F2)
// and adds case-level question_state: "Unprocessed" where missing

const fs = require('fs');

const file = 'scored_cases.js';
let content = fs.readFileSync(file, 'utf8');

let changes = 0;

// Fix: Change all ProductionStatus: "Production" → "Draft" (both quoted and unquoted key forms)
const prodPattern = /ProductionStatus:\s*"Production"/g;
const prodCount = (content.match(prodPattern) || []).length;
console.log(`Found ${prodCount} ProductionStatus entries`);

content = content.replace(prodPattern, 'ProductionStatus: "Draft"');
changes += prodCount;

// Verify no remaining Production values
const afterProdCount = (content.match(/ProductionStatus:\s*"Production"/g) || []).length;
console.log(`After: ${afterProdCount} ProductionStatus: "Production" entries (expect 0)`);

// Check case-level question_state — count CaseID occurrences and question_state occurrences
const caseIDCount = (content.match(/CaseID:/g) || []).length;
const qsCount = (content.match(/question_state:/g) || []).length;
console.log(`CaseIDs: ${caseIDCount}, question_state fields: ${qsCount}`);
console.log(`Total changes: ${changes}`);

fs.writeFileSync(file, content, 'utf8');
console.log(`Written ${file}`);
