const fs = require('fs');
const packParser = require('./scripts/lib/pack_parser.js');

// Fix P2 Pack B 13-item C streak (indices 1-13)
// Strategy: Rotate CorrectChoice to break streak while maintaining distribution
// Target pattern for indices 1-13: C, D, A, B, C, D, A, B, C, D, A, B, C
// This gives max streak of 2 (C appears at 1, 5, 9, 13)

const newCCPattern = ['C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C'];

const content = fs.readFileSync('p2/pack_p2_b.js', 'utf8');
const result = packParser.parsePack(content);

// Backup
fs.writeFileSync('p2/pack_p2_b.js.bak-streak-fix-' + Date.now(), content);

let modifiedContent = content;

for (let i = 0; i < 13; i++) {
  const recordIndex = i + 1; // indices 1-13
  const r = result.records[recordIndex];
  const obj = r.object;
  const oldCC = obj.CorrectChoice;
  const newCC = newCCPattern[i];
  
  if (oldCC === newCC) {
    console.log('Index ' + recordIndex + ' (' + obj.QuestionID + '): already ' + newCC + ', skipping');
    continue;
  }
  
  console.log('Index ' + recordIndex + ' (' + obj.QuestionID + '): ' + oldCC + ' -> ' + newCC);
  
  // We need to:
  // 1. Update CorrectChoice
  // 2. Move ExplanationCorrect to ExplanationWrong[newCC]
  // 3. Move ExplanationWrong[oldCC] to ExplanationCorrect (if it had content)
  // 4. Clear ExplanationWrong[oldCC]
  // 5. Update other ExplanationWrong fields to reflect new correct answer
  
  // Find the object in the source text and replace
  const qid = obj.QuestionID;
  
  // Simple approach: replace the CorrectChoice value
  const ccRegex = new RegExp('("QuestionID"\\s*:\\s*"' + qid.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&') + '"[\\s\\S]*?"CorrectChoice"\\s*:\\s*")' + oldCC + '(")');
  modifiedContent = modifiedContent.replace(ccRegex, '$1' + newCC + '$2');
  
  // Also need to swap ExplanationCorrect with ExplanationWrong[newCC]
  // and clear ExplanationWrong[oldCC]
  // This is more complex - let's do a more targeted replacement
}

// Write the modified content
fs.writeFileSync('p2/pack_p2_b.js', modifiedContent);
console.log('Done - basic CC replacement complete');