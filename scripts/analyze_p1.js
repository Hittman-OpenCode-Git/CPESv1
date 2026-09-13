const fs = require('fs');
const lines = fs.readFileSync('scripts/output/phase1_results.jsonl', 'utf-8')
  .split('\n').filter(l => l.trim());

const results = lines.map(l => JSON.parse(l));

// By disposition x record type
const matrix = {};
for (const r of results) {
  const key = r.recordType + '/' + r.disposition;
  matrix[key] = (matrix[key] || 0) + 1;
}
console.log('=== Results by recordType / disposition ===');
for (const [k, v] of Object.entries(matrix).sort()) console.log(`  ${k}: ${v}`);

// How many L items have ecAgree === false?
const lEcFalse = results.filter(r => r.recordType === 'L' && r.ecAgree === false);
console.log(`\nL items with ecAgree=false (programmatic): ${lEcFalse.length}`);

// How many L items have ecAgree === null?
const lEcNull = results.filter(r => r.recordType === 'L' && r.ecAgree === null);
console.log(`L items with ecAgree=null: ${lEcNull.length}`);

// How many L items have ecAgree === true?
const lEcTrue = results.filter(r => r.recordType === 'L' && r.ecAgree === true);
console.log(`L items with ecAgree=true: ${lEcTrue.length}`);

// For misassignment items: check if they're H or L
const misassignments = results.filter(r => r.disposition === 'confirm-misassignment');
const misH = misassignments.filter(r => r.recordType === 'H');
const misL = misassignments.filter(r => r.recordType === 'L');
console.log(`\nConfirm-misassignment: H=${misH.length}, L=${misL.length}`);

// For key-error items
const keyErrors = results.filter(r => r.disposition === 'confirm-key-error');
const keH = keyErrors.filter(r => r.recordType === 'H');
const keL = keyErrors.filter(r => r.recordType === 'L');
console.log(`Confirm-key-error: H=${keH.length}, L=${keL.length}`);

// For needs-human
const humanItems = results.filter(r => r.disposition === 'needs-human');
const huH = humanItems.filter(r => r.recordType === 'H');
const huL = humanItems.filter(r => r.recordType === 'L');
console.log(`Needs-human: H=${huH.length}, L=${huL.length}`);

// Sample of L items with ecAgree=false
console.log('\n=== Sample L items with ecAgree=false (first 10) ===');
for (const r of lEcFalse.slice(0, 10)) {
  console.log(`  ${r.qid} CC=${r.storedCC} derived=${r.derived} ecSupports=${r.ecSupports} | ${r.note?.substring(0,80)}`);
}
