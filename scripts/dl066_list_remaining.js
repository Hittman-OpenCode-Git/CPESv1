const fs = require('fs');
const data = JSON.parse(fs.readFileSync('scripts/output/dl066_proper_hand_solve.json', 'utf8'));
const mismatched = data.filter(d => d.match === false && d.derived !== null);
const noDerivation = data.filter(d => d.derived === null);

console.log('=== MISMATCHED (16) ===');
for (const d of mismatched) {
  console.log(`${d.caseId}-${d.itemId} [${d.type}] Hidden: ${JSON.stringify(d.hiddenCorrect)} Derived: ${d.derived} (${d.method})`);
}

console.log('\n=== NO DERIVATION (11) ===');
for (const d of noDerivation) {
  console.log(`${d.caseId}-${d.itemId} [${d.type}] Hidden: ${JSON.stringify(d.hiddenCorrect)}`);
}