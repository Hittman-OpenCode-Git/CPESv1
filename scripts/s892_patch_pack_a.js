// S892 — Pack A Final Closure Integration Script
// Replaces 19 archived items with new Analyze/Evaluate items
const fs = require('fs');
const path = require('path');

const PACK_PATH = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/pack_a_corrected.js';

console.log('=== S892 Pack A Integration ===');

// Step 1: Load replacement items
const batch1 = require('./s892_replacements.js'); // exports .replacements
const batch2 = JSON.parse(fs.readFileSync(path.join(__dirname, 'output', 'S892_replacement_items_E.json'), 'utf8'));
const batch3 = require('./s892_batch3_items.js').items;
const batch4 = require('./s892_batch4_items.js').items;

const replacements = [...batch1.replacements || batch1, ...batch2, ...batch3, ...batch4];
console.log('Replacement items loaded: ' + replacements.length);

// Verify QIDs
const rQids = replacements.map(r => r.QuestionID).sort();
console.log('Replacement QIDs: ' + rQids.join(', '));

// Expected: P1-A-044, P1-A-064, P1-E-046 through P1-E-074 (matching archived indices)
const expected = [
  'P1-A-044', 'P1-A-064',
  'P1-E-046', 'P1-E-047', 'P1-E-049', 'P1-E-050', 'P1-E-051',
  'P1-E-054', 'P1-E-055', 'P1-E-057', 'P1-E-058',
  'P1-E-062', 'P1-E-063', 'P1-E-065', 'P1-E-066',
  'P1-E-070', 'P1-E-071', 'P1-E-073', 'P1-E-074'
].sort();

if (JSON.stringify(rQids) !== JSON.stringify(expected)) {
  console.error('QID MISMATCH!');
  console.error('Got:      ' + rQids.join(', '));
  console.error('Expected: ' + expected.join(', '));
  process.exit(1);
}
console.log('QID list verified.');

// Step 2: Validate replacement items against governance rules
console.log('\n--- Governance Validation ---');
let dl008 = 0, dl026 = 0, missingFields = 0;
let ccDist = { A: 0, B: 0, C: 0, D: 0 };
let cogDist = {};

replacements.forEach(item => {
  let cc = item.CorrectChoice;
  ccDist[cc] = (ccDist[cc] || 0) + 1;
  let cog = item.CognitiveLevel || 'N/A';
  cogDist[cog] = (cogDist[cog] || 0) + 1;

  // DL-008
  let ewCC = item['ExplanationWrong' + cc];
  if (ewCC && ewCC !== '') {
    console.error('DL-008: ' + item.QuestionID + ' EW[' + cc + '] non-empty (len=' + ewCC.length + ')');
    dl008++;
  }

  // DL-026
  let emptyNonCC = 0;
  ['A', 'B', 'C', 'D'].forEach(l => {
    if (l !== cc) {
      let ew = item['ExplanationWrong' + l];
      if (!ew || ew === '') {
        emptyNonCC++;
        console.error('DL-026: ' + item.QuestionID + ' EW[' + l + '] empty/absent');
      }
    }
  });
  if (emptyNonCC > 0) dl026++;

  // Missing fields
  let required = ['CorrectChoice', 'Stem', 'ExplanationCorrect', 'Choices'];
  required.forEach(f => {
    if (!item[f]) { console.error('MISSING ' + f + ': ' + item.QuestionID); missingFields++; }
  });

  // Check Choices has all 4 letters
  let choices = item.Choices || {};
  ['A', 'B', 'C', 'D'].forEach(l => {
    if (!choices[l]) { console.error('MISSING Choice ' + l + ': ' + item.QuestionID); missingFields++; }
  });
});

console.log('DL-008 violations: ' + dl008);
console.log('DL-026 violations: ' + dl026);
console.log('Missing fields:    ' + missingFields);
console.log('CC distribution:   ' + JSON.stringify(ccDist));
console.log('Cognitive:          ' + JSON.stringify(cogDist));

if (dl008 > 0 || dl026 > 0 || missingFields > 0) {
  console.error('\nHALT: Governance violations detected. Aborting.');
  process.exit(1);
}

console.log('\nAll governance checks PASSED.');

// Step 3: Load and parse pack_a_corrected.js
console.log('\n--- Pack File Integration ---');
let content = fs.readFileSync(PACK_PATH, 'utf8');

// Extract the array
let start = content.indexOf('var MCQ_BANK_A = [');
if (start < 0) { console.error('Cannot find MCQ_BANK_A start'); process.exit(1); }
start = content.indexOf('[', start);

let end = content.lastIndexOf('];');
if (end < 0) { console.error('Cannot find array end'); process.exit(1); }

let prefix = content.slice(0, start);
let suffix = content.slice(end + 2); // after ];

let arrayStr = content.slice(start, end + 1);

// Parse using Function constructor
let items = new Function('return ' + arrayStr)();
console.log('Parsed ' + items.length + ' items from pack file');

// Step 4: Find archived items and verify indices
let archivedIndices = [];
let archivedQids = [];
items.forEach((item, idx) => {
  if (item.question_state === 'Archived') {
    archivedIndices.push(idx);
    archivedQids.push(item.QuestionID);
  }
});

console.log('Found ' + archivedIndices.length + ' archived items');
console.log('Indices: ' + archivedIndices.join(', '));

// Verify we have the right count
if (archivedIndices.length !== 19) {
  console.error('Expected 19 archived items, found ' + archivedIndices.length);
  process.exit(1);
}

// Step 5: Create QID-to-replacement map
let replMap = {};
replacements.forEach(r => { replMap[r.QuestionID] = r; });

// Step 6: Replace items at each archived index
let replacementsMade = 0;
archivedIndices.forEach((idx, i) => {
  let archivedQid = archivedQids[i];
  let repl = replMap[archivedQid];
  if (!repl) {
    console.error('No replacement for ' + archivedQid + ' at index ' + idx);
    process.exit(1);
  }
  items[idx] = repl;
  replacementsMade++;
});

console.log('Replacements made: ' + replacementsMade);

// Step 7: Count Certified items
let certCount = items.filter(i => i.question_state === 'Certified').length;
console.log('Certified count: ' + certCount);

if (certCount !== 500) {
  console.error('HALT: Expected 500 Certified, got ' + certCount);
  process.exit(1);
}

// Step 8: Rebuild the file
let newArrayStr = JSON.stringify(items, null, 2);
let newContent = prefix + newArrayStr + suffix;

// Step 9: Write the file
fs.writeFileSync(PACK_PATH, newContent, 'utf8');
console.log('File written successfully: ' + PACK_PATH);

// Step 10: Verify by re-reading the file
try {
  let verifyContent = fs.readFileSync(PACK_PATH, 'utf8');
  // Use eval to execute the file and capture the array
  let vItems = eval(verifyContent);
  if (!Array.isArray(vItems) || vItems.length !== 500) {
    console.error('Post-write verification failed: got ' + (Array.isArray(vItems) ? vItems.length : 'non-array'));
    process.exit(1);
  }
  let vCert = vItems.filter(i => i.question_state === 'Certified').length;
  if (vCert !== 500) {
    console.error('Post-write: Expected 500 Certified, got ' + vCert);
    process.exit(1);
  }
  console.log('Post-write verification: ' + vItems.length + ' items, ' + vCert + ' Certified OK');
} catch (e) {
  console.error('Post-write verification failed: ' + e.message);
  process.exit(1);
}

console.log('\n=== CLOSURE COMPLETE ===');
console.log('Certified: 500/500');
console.log('Governance: PASS');
