// Deep inspect case items
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const caseFile = path.join(ROOT, 'scored_cases.js');
const caseCode = fs.readFileSync(caseFile, 'utf8');
const fn = new Function(caseCode + '; return ENHANCED_CASE_BASE;');
const cases = fn();
console.log('Cases:', cases.length);

const c = cases[0];
console.log('\nCase keys:', Object.keys(c));
console.log('Case Items count:', c.Items ? c.Items.length : 'no Items');
if (c.Items && c.Items.length > 0) {
  console.log('First item keys:', Object.keys(c.Items[0]));
  console.log('First item sample:');
  for (const [k, v] of Object.entries(c.Items[0])) {
    console.log(`  ${k}: ${JSON.stringify(v).substring(0, 120)}`);
  }
}

// Quick check: how many items total across all cases?
let totalItems = 0;
for (const c of cases) {
  if (c.Items) totalItems += c.Items.length;
}
console.log('\nTotal items across all cases:', totalItems);

// Check Section / Domain field
console.log('\nCase Domains:');
for (const c of cases) {
  console.log(`  ${c.CaseID}: Section=${c.Section}, BlueprintDomain=${c.BlueprintDomain}, Items=${c.Items?c.Items.length:0}`);
}
