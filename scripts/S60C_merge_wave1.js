// S60C Wave 1 Merge Script v4 — Evaluate JS, replace in array, re-serialize
const fs = require('fs');
const path = require('path');

const PACK_PATH = path.resolve(__dirname, '..', 'pack_c_corrected.js');
const OUTPUT_DIR = path.resolve(__dirname, 'output');

function loadReplacements() {
  const items = [];
  const files = [
    'S60C_REPLACEMENT_ITEMS_BATCH1.json',
    'S60C_REPLACEMENT_ITEMS_BATCH2.json',
    'S60C_REPLACEMENT_ITEMS_BATCH3.json',
    'S60C_REPLACEMENT_ITEMS_BATCH4.json'
  ];
  for (const f of files) {
    const fp = path.join(OUTPUT_DIR, f);
    if (fs.existsSync(fp)) {
      items.push(...JSON.parse(fs.readFileSync(fp, 'utf8')));
    }
  }
  return items;
}

// Read the pack file as text
let content = fs.readFileSync(PACK_PATH, 'utf8');

// Evaluate as JavaScript to get the array
const packC = eval(content + '; MCQ_BANK_C');
console.log(`Array has ${packC.length} items`);

const replacements = loadReplacements();
console.log(`Loaded ${replacements.length} replacements`);

const replacementMap = new Map();
for (const r of replacements) {
  replacementMap.set(r.QuestionID, r);
}

// Find and replace matching items
let replaced = 0;
for (let i = 0; i < packC.length; i++) {
  const item = packC[i];
  if (item && item.QuestionID && replacementMap.has(item.QuestionID)) {
    const qid = item.QuestionID;
    const replacement = replacementMap.get(qid);
    packC[i] = replacement;
    console.log(`${qid}: replaced at index ${i}`);
    replaced++;
  }
}

console.log(`Replaced ${replaced} items. Array size: ${packC.length}`);

// Re-serialize: var packC = [...];
const serialized = 'const MCQ_BANK_C = ' + JSON.stringify(packC, null, 4) + ';';

fs.writeFileSync(PACK_PATH, serialized, 'utf8');
console.log(`Wrote ${serialized.length} bytes`);

// Verify
try {
  new Function(serialized);
  console.log('PARSE: PASS');
  console.log(`QuestionID count: ${(serialized.match(/"QuestionID"/g) || []).length}`);
} catch (e) {
  console.log('PARSE: FAIL — ' + e.message);
}
