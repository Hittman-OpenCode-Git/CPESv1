// S899 — CORRECTED insert script. Each pack item uses staggered structure:
// Object N: [metadata for item N]  → closed with }
// Object N+1: [content for item N + metadata for item N+1] → closed with }
// The formatItem must end WITHOUT closing the content brace.
const fs = require('fs');

function formatItem(item) {
  const m = item.metadata, c = item.content;
  // Metadata portion (first half): from QuestionID to before Part
  // DOES close with } because it's a separate object
  // Content portion: from Part to ReviewNote — does NOT close with }
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
    "ReviewNote": ${JSON.stringify(c.ReviewNote)},
    
`;
  // Note: NO closing } — the next item's metadata starts here
}

function insertItems(filePath, items, label) {
  let raw = fs.readFileSync(filePath, 'utf8');
  console.log(`\n--- ${label} ---`);
  for (const item of items) {
    const qid = item.qid;
    const searchStr = `"QuestionID": "${qid}"`;
    const startIdx = raw.indexOf(searchStr);
    if (startIdx === -1) { console.log(`  ${qid}: NOT FOUND`); continue; }
    const nextQID = raw.indexOf('"QuestionID": "', startIdx + searchStr.length);
    const endIdx = nextQID !== -1 ? nextQID : startIdx + 5000;
    const oldText = raw.substring(startIdx, endIdx);
    const newText = formatItem(item);
    raw = raw.replace(oldText, newText);
    console.log(`  ${qid}: replaced (${oldText.length} -> ${newText.length} chars)`);
  }
  fs.writeFileSync(filePath, raw, 'utf8');
  // Verify parse
  try {
    new Function(raw);
    console.log(`  ${label}: PARSE PASS`);
  } catch(e) {
    console.log(`  ${label}: PARSE FAIL — ${e.message.substring(0, 80)}`);
  }
  // Verify items
  const verify = fs.readFileSync(filePath, 'utf8');
  items.forEach(item => {
    const idx = verify.indexOf('"QuestionID": "' + item.qid + '"');
    if (idx < 0) { console.log(`  ${item.qid}: NOT FOUND`); return; }
    const w = verify.substring(idx, idx + 5000);
    const active = w.includes('"question_state": "Active"');
    console.log(`  ${item.qid}: ${active ? 'Active' : 'FAIL'}`);
  });
}

// Run all 4 batches
const batch1 = require('./s899_batch1_items.js');
const batch2 = require('./s899_batch2_items.js');
const batch3 = require('./s899_batch3_items.js');
const batch4 = require('./s899_batch4_items.js');

// Restore from backups first
fs.copyFileSync('pack_c_corrected.js.bak-20260728123520', 'pack_c_corrected.js');
fs.copyFileSync('pack_d_corrected.js.bak-20260728123520', 'pack_d_corrected.js');

// Batch 1: Pack C Section E
insertItems('pack_c_corrected.js', batch1, 'BATCH 1 — Pack C');

// Batch 2: Pack D Section E
insertItems('pack_d_corrected.js', batch2, 'BATCH 2 — Pack D');

// Batch 3: Pack C + Pack D Section F
insertItems('pack_c_corrected.js', batch3.filter(i => i.pack === 'C'), 'BATCH 3 — Pack C');
insertItems('pack_d_corrected.js', batch3.filter(i => i.pack === 'D'), 'BATCH 3 — Pack D');

// Batch 4: Pack D Section F
insertItems('pack_d_corrected.js', batch4, 'BATCH 4 — Pack D');

console.log('\n=== ALL BATCHES COMPLETE ===');
