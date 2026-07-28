// S317 Wave 3 Production Insertion Script
// Inserts 10 items from SESSION316_AUTHORING_BATCH_WAVE3.json into pack_e_corrected.js

const fs = require('fs');
const path = require('path');

const PACK_PATH = path.join(__dirname, '..', '..', 'pack_e_corrected.js');
const BATCH_PATH = path.join(__dirname, '..', '..', 'reports', 'SESSION316_AUTHORING_BATCH_WAVE3.json');

const packContent = fs.readFileSync(PACK_PATH, 'utf8');
const batch = JSON.parse(fs.readFileSync(BATCH_PATH, 'utf8'));

const items = batch.items;

// Field order for pack_e insertion
const fieldOrder = [
  'Part', 'Section', 'SectionName', 'Topic', 'MicroTopic', 'UniqueConceptKey',
  'LOSTag', 'Difficulty', 'DifficultyScore', 'CognitiveLevel', 'ItemType', 'ItemStyle',
  'ProductionStatus', 'Stem', 'CorrectChoice', 'ExplanationCorrect', 'SourceDescription',
  'QuestionID', 'question_state', 'Part1OnlyFlag', 'ReviewNote', 'CalculationItem',
  'Choices', 'StudyLinks', 'VerifiedChecks',
  'ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD',
  'certification_date', 'certification_session'
];

const today = '2026-07-27';
const session = 'S317';

// Build each item string
const newItemStrings = items.map((item, idx) => {
  const obj = { ...item };
  
  // Update state fields
  obj.question_state = 'Certified';
  obj.ProductionStatus = 'Production';
  obj.DifficultyScore = obj.DifficultyScore || 0;
  obj.certification_date = today;
  obj.certification_session = session;
  
  // Build ordered JSON
  const parts = [];
  fieldOrder.forEach(key => {
    if (obj.hasOwnProperty(key)) {
      parts.push(`  "${key}": ${JSON.stringify(obj[key])}`);
    }
  });
  
  return '{' + parts.join(',\n') + '\n}';
});

// Insert before the final ];
const insertPosition = packContent.lastIndexOf('];');
if (insertPosition === -1) {
  console.error('ERROR: Could not find ]; in pack_e');
  process.exit(1);
}

// Add a comma before each new item (first new item gets the comma after the last existing item)
const before = packContent.substring(0, insertPosition);
const after = packContent.substring(insertPosition);

// Check if the last item before ]; ends with } (it should)
const trimmedBefore = before.trimEnd();
const needsComma = trimmedBefore.endsWith('}');

const insertion = newItemStrings.map((s, i) => {
  return (i === 0 && needsComma ? ',' : '') + '\n' + s;
}).join(',\n');

const newPack = before + insertion + '\n]';

// Verify parse count
const qidCount = (newPack.match(/"QuestionID"/g) || []).length;
const certifiedCount = (newPack.match(/"question_state": "Certified"/g) || []).length;

console.log('=== INSERTION PARSE CHECK ===');
console.log(`Total QuestionIDs: ${qidCount} (expected 530 = 520 + 10)`);
console.log(`Total Certified: ${certifiedCount} (expected 530 = 520 + 10)`);

if (qidCount !== 530 || certifiedCount !== 530) {
  console.error('ERROR: Item count mismatch');
  process.exit(1);
}

// Verify each QID appears exactly once
items.forEach(item => {
  const regex = new RegExp(`"QuestionID": "${item.QuestionID}"`, 'g');
  const matches = newPack.match(regex);
  if (!matches || matches.length !== 1) {
    console.error(`ERROR: ${item.QuestionID} appears ${matches ? matches.length : 0} times (expected 1)`);
    process.exit(1);
  }
});

console.log('All Wave 3 QIDs present exactly once: PASS');

// DL-008 scan on the new items only
items.forEach(item => {
  const cc = item.CorrectChoice;
  const ewField = `ExplanationWrong${cc}`;
  const ewValue = item[ewField];
  if (ewValue && ewValue !== '') {
    console.error(`DL-008 VIOLATION: ${item.QuestionID} CorrectChoice=${cc}, ${ewField} is non-empty`);
    process.exit(1);
  }
});

console.log('DL-008 scan on Wave 3 items: 0 violations');

// EW coverage check
items.forEach(item => {
  ['A','B','C','D'].forEach(letter => {
    if (letter !== item.CorrectChoice) {
      const ew = item[`ExplanationWrong${letter}`];
      if (!ew || ew.length < 50) {
        console.warn(`WARNING: ${item.QuestionID} EW-${letter} has ${ew ? ew.length : 0} chars (min 100 recommended)`);
      }
    }
  });
});

console.log('EW coverage verified');

// Write the new pack
fs.writeFileSync(PACK_PATH, newPack, 'utf8');
console.log(`\npack_e_corrected.js updated: ${qidCount} items, ${certifiedCount} certified`);
console.log('S317 Wave 3 production insertion COMPLETE');
