const fs = require('fs');
const packParser = require('./lib/pack_parser.js');

// Fix P2 Pack B 13-item C streak (indices 1-13)
// Target pattern for indices 1-13: C, D, A, B, C, D, A, B, C, D, A, B, C
const newCCPattern = ['C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B', 'C'];

const content = fs.readFileSync('p2/pack_p2_b.js', 'utf8');
const result = packParser.parsePack(content);

// Backup
const backupPath = 'p2/pack_p2_b.js.bak-streak-fix-' + Date.now();
fs.writeFileSync(backupPath, content);
console.log('Backup created:', backupPath);

// Convert to mutable array of characters for surgical editing
const chars = content.split('');

function replaceInRange(start, end, newText) {
  const newChars = newText.split('');
  chars.splice(start, end - start, ...newChars);
}

function findFieldInRecord(recordContent, fieldName) {
  // Find the field value within a record's content
  const regex = new RegExp('"' + fieldName + '"\\s*:\\s*"([^"]*)"');
  const match = recordContent.match(regex);
  if (match) {
    return { value: match[1], start: match.index + match[0].indexOf(match[1]), end: match.index + match[0].indexOf(match[1]) + match[1].length };
  }
  return null;
}

// Process each item in the streak
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
  
  // Get the record's source text
  const recordStart = r.offsets.start;
  const recordEnd = r.offsets.end;
  const recordContent = content.substring(recordStart, recordEnd);
  
  // Find CorrectChoice field
  const ccMatch = recordContent.match(/"CorrectChoice"\s*:\s*"([A-D])"/);
  if (!ccMatch) {
    console.log('  WARNING: Could not find CorrectChoice in record');
    continue;
  }
  
  const ccGlobalStart = recordStart + ccMatch.index + ccMatch[0].indexOf(oldCC);
  const ccGlobalEnd = ccGlobalStart + 1;
  
  // Replace CorrectChoice
  replaceInRange(ccGlobalStart, ccGlobalEnd, newCC);
  
  // Now we need to swap ExplanationCorrect with ExplanationWrong[newCC]
  // and clear ExplanationWrong[oldCC]
  
  // Find ExplanationCorrect
  const ecMatch = recordContent.match(/"ExplanationCorrect"\s*:\s*"([^"]*)"/);
  if (!ecMatch) {
    console.log('  WARNING: Could not find ExplanationCorrect');
    continue;
  }
  const ecValue = ecMatch[1];
  const ecGlobalStart = recordStart + ecMatch.index + ecMatch[0].indexOf('"', ecMatch[0].indexOf(':') + 1) + 1;
  const ecGlobalEnd = ecGlobalStart + ecValue.length;
  
  // Find ExplanationWrong[newCC]
  const ewNewKey = 'ExplanationWrong' + newCC;
  const ewNewMatch = recordContent.match(new RegExp('"' + ewNewKey + '"\\s*:\\s*"([^"]*)"'));
  let ewNewValue = ewNewMatch ? ewNewMatch[1] : '';
  let ewNewGlobalStart = -1, ewNewGlobalEnd = -1;
  if (ewNewMatch) {
    ewNewGlobalStart = recordStart + ewNewMatch.index + ewNewMatch[0].indexOf('"', ewNewMatch[0].indexOf(':') + 1) + 1;
    ewNewGlobalEnd = ewNewGlobalStart + ewNewValue.length;
  }
  
  // Find ExplanationWrong[oldCC]
  const ewOldKey = 'ExplanationWrong' + oldCC;
  const ewOldMatch = recordContent.match(new RegExp('"' + ewOldKey + '"\\s*:\\s*"([^"]*)"'));
  let ewOldValue = ewOldMatch ? ewOldMatch[1] : '';
  let ewOldGlobalStart = -1, ewOldGlobalEnd = -1;
  if (ewOldMatch) {
    ewOldGlobalStart = recordStart + ewOldMatch.index + ewOldMatch[0].indexOf('"', ewOldMatch[0].indexOf(':') + 1) + 1;
    ewOldGlobalEnd = ewOldGlobalStart + ewOldValue.length;
  }
  
  // Swap ExplanationCorrect with ExplanationWrong[newCC]
  // New ExplanationCorrect = old ExplanationWrong[newCC]
  // New ExplanationWrong[newCC] = old ExplanationCorrect
  // Clear ExplanationWrong[oldCC] = ""
  
  if (ewNewGlobalStart >= 0) {
    replaceInRange(ecGlobalStart, ecGlobalEnd, ewNewValue);
    replaceInRange(ewNewGlobalStart, ewNewGlobalEnd, ecValue);
  } else {
    // If ExplanationWrong[newCC] doesn't exist (shouldn't happen), just clear oldCC
    console.log('  WARNING: ExplanationWrong[' + newCC + '] not found');
  }
  
  // Clear ExplanationWrong[oldCC]
  if (ewOldGlobalStart >= 0) {
    replaceInRange(ewOldGlobalStart, ewOldGlobalEnd, '');
  }
  
  console.log('  Swapped EC <-> EW[' + newCC + '], cleared EW[' + oldCC + ']');
}

// Write the modified content
const modifiedContent = chars.join('');
fs.writeFileSync('p2/pack_p2_b.js', modifiedContent);
console.log('Done - P2 Pack B streak fix complete');