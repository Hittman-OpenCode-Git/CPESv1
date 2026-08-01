// Quick schema inspection
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// Inspect pack
const packFile = path.join(ROOT, 'pack_a_corrected.js');
const code = fs.readFileSync(packFile, 'utf8');
const fn = new Function(code + '; return MCQ_BANK_A;');
const items = fn();
console.log('Pack A items:', items.length);
const i = items[0];
console.log('Keys:', Object.keys(i));
console.log('\nSample values:');
for (const [k, v] of Object.entries(i)) {
  console.log(`  ${k}: ${JSON.stringify(v).substring(0, 120)}`);
}

// Inspect case file
console.log('\n=== scored_cases.js ===');
const caseFile = path.join(ROOT, 'content/cases/legacy/scored_cases.js');
const caseCode = fs.readFileSync(caseFile, 'utf8');

// Try different variable names
for (const vn of ['SCORED_CASES', 'CASE_BANK', 'ENHANCED_CASE_BASE', 'SCORED_CASES_DATA', 'SCORED_CASES_ENHANCED']) {
  try {
    const caseFn = new Function(caseCode + '; return typeof ' + vn + ' !== "undefined" ? ' + vn + ' : null;');
    const result = caseFn();
    if (result !== null) {
      console.log(`Found variable "${vn}": type=${typeof result}, ${Array.isArray(result) ? 'array length=' + result.length : 'keys=' + Object.keys(result).join(',')}`);
      if (Array.isArray(result) && result.length > 0) {
        console.log('First item keys:', Object.keys(result[0]).join(', '));
        console.log('Sample:', JSON.stringify(result[0]).substring(0, 300));
      } else if (!Array.isArray(result) && Object.keys(result).length > 0) {
        const keys = Object.keys(result);
        console.log('First key sample:', keys.slice(0, 5));
      }
    }
  } catch (e) {
    // var not defined
  }
}

// Also try finding all var assignments
const varMatches = caseCode.match(/var\s+(\w+)\s*=/g) || [];
console.log('\nvar assignments found:', [...new Set(varMatches.map(m => m.replace('var ', '').replace(' =', '')))].join(', '));
