const fs = require('fs');
const BATCH3 = require('./s899_batch3_items.js');

function formatItem(item) {
  const m = item.metadata, c = item.content;
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

function insertItems(filePath, items) {
  let raw = fs.readFileSync(filePath, 'utf8');
  const label = filePath.includes('pack_c') ? 'Pack C' : 'Pack D';
  console.log(`\n--- ${label} ---`);
  for (const item of items) {
    const qid = item.qid;
    const searchStr = `"QuestionID": "${qid}"`;
    const startIdx = raw.indexOf(searchStr);
    if (startIdx === -1) { console.log(`  ${qid}: NOT FOUND`); continue; }
    const nextSearch = raw.indexOf('"QuestionID": "', startIdx + searchStr.length);
    const endIdx = nextSearch !== -1 ? nextSearch : startIdx + 5000;
    const oldText = raw.substring(startIdx, endIdx);
    const newText = formatItem(item);
    if (!newText.includes(`"QuestionID": "${qid}"`)) {
      console.log(`  ${qid}: VALIDATION FAILED`); continue;
    }
    raw = raw.replace(oldText, newText);
    console.log(`  ${qid}: replaced (${oldText.length} -> ${newText.length} chars)`);
  }
  fs.writeFileSync(filePath, raw, 'utf8');
  // Verify
  const verify = fs.readFileSync(filePath, 'utf8');
  items.forEach(item => {
    const idx = verify.indexOf('"QuestionID": "' + item.qid + '"');
    if (idx < 0) { console.log(`  ${item.qid}: VERIFY FAILED`); return; }
    const w = verify.substring(idx, idx + 5000);
    const active = w.includes('"question_state": "Active"');
    const bloom = w.match(/"CognitiveLevel":\s*"(Analyze|Evaluate)"/);
    const diff = w.match(/"DifficultyScore":\s*(\d+)/);
    console.log(`  ${item.qid}: ${active ? 'Active' : 'FAIL'}, Bloom=${bloom ? bloom[1] : '?'}, Diff=${diff ? diff[1] : '?'}`);
  });
}

console.log('=== S899 Batch 3: Technology Items ===');
const packCItems = BATCH3.filter(i => i.pack === 'C');
const packDItems = BATCH3.filter(i => i.pack === 'D');
insertItems('pack_c_corrected.js', packCItems);
insertItems('pack_d_corrected.js', packDItems);
console.log('\nDone.');
