// S899 — Insert authored Batch 2 items into pack_d_corrected.js
const fs = require('fs');
const BATCH2 = require('./s899_batch2_items.js');

const PACK_D_PATH = 'pack_d_corrected.js';

function formatItem(item) {
  const m = item.metadata;
  const c = item.content;
  
  return `"QuestionID": "${m.QuestionID}",
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
}

console.log('=== S899 Batch 2: Pack D Section E ===');
let raw = fs.readFileSync(PACK_D_PATH, 'utf8');

for (const item of BATCH2) {
  const qid = item.qid;
  const searchStr = `"QuestionID": "${qid}"`;
  const startIdx = raw.indexOf(searchStr);
  if (startIdx === -1) { console.log(`  ${qid}: NOT FOUND`); continue; }
  const nextSearch = raw.indexOf('"QuestionID": "', startIdx + searchStr.length);
  const endIdx = nextSearch !== -1 ? nextSearch : startIdx + 5000;
  const oldText = raw.substring(startIdx, endIdx);
  const newText = formatItem(item);
  
  if (!newText.includes(`"QuestionID": "${qid}"`)) {
    console.log(`  ${qid}: FAILED — new text validation error`);
    continue;
  }
  
  raw = raw.replace(oldText, newText);
  console.log(`  ${qid}: replaced (${oldText.length} -> ${newText.length} chars)`);
}

console.log(`\nWriting ${PACK_D_PATH}...`);
fs.writeFileSync(PACK_D_PATH, raw, 'utf8');

// Verify
const verify = fs.readFileSync(PACK_D_PATH, 'utf8');
console.log('\nVerification:');
BATCH2.forEach(item => {
  const idx = verify.indexOf('"QuestionID": "' + item.qid + '"');
  if (idx < 0) { console.log(`  ${item.qid}: NOT FOUND`); return; }
  const w = verify.substring(idx, idx + 5000);
  const active = w.includes('"question_state": "Active"');
  const bloom = w.match(/"CognitiveLevel":\s*"(Analyze|Evaluate)"/);
  const diff = w.match(/"DifficultyScore":\s*(\d+)/);
  console.log(`  ${item.qid}: ${active ? 'Active' : 'NOT Active'}, Bloom=${bloom ? bloom[1] : '?'}, Diff=${diff ? diff[1] : '?'}`);
});
console.log('\nDone.');
