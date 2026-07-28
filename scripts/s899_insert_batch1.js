// S899 — Insert authored items into pack files (Batch 1: Pack C Section E)
const fs = require('fs');
const path = require('path');

const PACK_C_PATH = 'pack_c_corrected.js';
const BATCH1 = require('./s899_batch1_items.js');

function formatItem(item) {
  const m = item.metadata;
  const c = item.content;
  
  // Build the metadata block
  let out = `"QuestionID": "${m.QuestionID}",
    "CalculationItem": ${m.CalculationItem},
    "VerifiedChecks": ${JSON.stringify(m.VerifiedChecks, null, 6)},
    "ExplanationWrongA": ${JSON.stringify(m.ExplanationWrongA)},
    "ExplanationWrongB": ${JSON.stringify(m.ExplanationWrongB)},
    "ExplanationWrongC": ${JSON.stringify(m.ExplanationWrongC)},
    "ExplanationWrongD": ${JSON.stringify(m.ExplanationWrongD)},
    "question_state": "${m.question_state}",
    "DifficultyScore": ${m.DifficultyScore},
    "CognitiveLevel": "${m.CognitiveLevel}",
    "upgrade_note": ${JSON.stringify(m.upgrade_note)}
  },
  {
    "Part": ${c.Part},
    "Section": "${c.Section}",
    "SectionName": "${c.SectionName}",
    "Topic": ${JSON.stringify(c.Topic)},
    "MicroTopic": ${JSON.stringify(c.MicroTopic)},
    "UniqueConceptKey": ${JSON.stringify(c.UniqueConceptKey)},
    "LOSTag": ${JSON.stringify(c.LOSTag)},
    "Difficulty": "${c.Difficulty}",
    "ItemType": "${c.ItemType}",
    "ItemStyle": "${c.ItemStyle}",
    "Stem": ${JSON.stringify(c.Stem)},
    "Choices": ${JSON.stringify(c.Choices, null, 8)},
    "CorrectChoice": "${c.CorrectChoice}",
    "ExplanationCorrect": ${JSON.stringify(c.ExplanationCorrect)},
    "StudyLinks": ${JSON.stringify(c.StudyLinks, null, 6)},
    "SourceDescription": ${JSON.stringify(c.SourceDescription)},
    "Part1OnlyFlag": ${c.Part1OnlyFlag},
    "ReviewNote": ${JSON.stringify(c.ReviewNote)}
  }`;
  
  return out;
}

function insertItems(filePath, items) {
  let raw = fs.readFileSync(filePath, 'utf8');
  let modified = raw;
  let count = 0;
  
  for (const item of items) {
    const qid = item.qid;
    const searchStr = `"QuestionID": "${qid}"`;
    const startIdx = modified.indexOf(searchStr);
    
    if (startIdx === -1) {
      console.log(`  ${qid}: NOT FOUND — skipping`);
      continue;
    }
    
    // Find the next QuestionID after this one
    const nextSearch = modified.indexOf('"QuestionID": "', startIdx + searchStr.length);
    const endIdx = nextSearch !== -1 ? nextSearch : startIdx + 5000;
    
    const oldText = modified.substring(startIdx, endIdx);
    const newText = formatItem(item);
    
    // Validate: new text must include the QuestionID
    if (!newText.includes(`"QuestionID": "${qid}"`)) {
      console.log(`  ${qid}: VALIDATION FAILED — new text missing QuestionID`);
      continue;
    }
    
    // Verify old text exists and is unique
    const occurrences = modified.split(oldText).length - 1;
    if (occurrences !== 1) {
      console.log(`  ${qid}: WARNING — old text occurs ${occurrences} times (expected 1)`);
    }
    
    modified = modified.replace(oldText, newText);
    count++;
    console.log(`  ${qid}: replaced (${oldText.length} → ${newText.length} chars)`);
  }
  
  return { modified, count };
}

// === EXECUTE ===
console.log('=== S899 Batch 1: Pack C Section E ===');
const result = insertItems(PACK_C_PATH, BATCH1);

if (result.count !== BATCH1.length) {
  console.log(`\nERROR: Only ${result.count}/${BATCH1.length} items inserted. Aborting.`);
  process.exit(1);
}

console.log(`\nWriting ${PACK_C_PATH}...`);
fs.writeFileSync(PACK_C_PATH, result.modified, 'utf8');

// Verify
console.log('\nVerification:');
const verify = fs.readFileSync(PACK_C_PATH, 'utf8');
for (const item of BATCH1) {
  const found = verify.includes(`"QuestionID": "${item.qid}"`);
  const active = verify.includes(`"QuestionID": "${item.qid}"`) && 
                verify.substring(verify.indexOf(`"QuestionID": "${item.qid}"`), 
                  verify.indexOf(`"QuestionID": "${item.qid}"`) + 3000).includes('"question_state": "Active"');
  console.log(`  ${item.qid}: found=${found}, active=${active}`);
}

console.log('\nDone.');
