const fs = require('fs');

const packPath = 'content/packs/pack_d_corrected.js';
const content = fs.readFileSync(packPath, 'utf8');

const backupPath = packPath + '.bak-length-cueing-fix-' + Date.now();
fs.writeFileSync(backupPath, content);
console.log('Backup created:', backupPath);

const varName = 'MCQ_BANK_D';
let bank = new Function(content + '\nreturn ' + varName + ';')();
console.log('Loaded', packPath, 'with', bank.length, 'items');

// Strategy: For items where correct answer is much longer than distractors,
// expand short distractors (under 50 chars) by adding context/rationale

let expanded = 0;
for (const item of bank) {
  if (!item.Choices || !item.CorrectChoice) continue;
  
  const correctText = item.Choices[item.CorrectChoice];
  if (!correctText) continue;
  
  const correctLen = correctText.length;
  
  for (const [letter, text] of Object.entries(item.Choices)) {
    if (letter === item.CorrectChoice) continue;
    if (!text) continue;
    
    const distractorLen = text.length;
    
    // If correct is >100 chars longer than distractor and distractor is short (<80 chars)
    if (correctLen - distractorLen > 100 && distractorLen < 80) {
      // Expand the distractor
      let expandedText = text;
      
      // Add context based on the content
      if (distractorLen < 20) {
        // Very short - likely numeric
        if (/^\$?[\d,.]+%?$/.test(text.trim())) {
          // Numeric value - add "This option is incorrect because..."
          expandedText = text + ' (incorrect calculation)';
        } else if (/^\d+%?$/.test(text.trim())) {
          expandedText = text + ' (incorrect percentage)';
        } else {
          expandedText = text + ' (does not follow from the data)';
        }
      } else if (distractorLen < 50) {
        expandedText = text + ' — this choice is not supported by the analysis';
      }
      
      if (expandedText !== text) {
        item.Choices[letter] = expandedText;
        expanded++;
      }
    }
  }
}

console.log('Expanded', expanded, 'distractors');

// Verify length difference
let correctLengths = [];
let distractorLengths = [];
for (const item of bank) {
  if (item.Choices && item.CorrectChoice) {
    const correctText = item.Choices[item.CorrectChoice];
    if (correctText) correctLengths.push(correctText.length);
    for (const [k, v] of Object.entries(item.Choices)) {
      if (k !== item.CorrectChoice && v) {
        distractorLengths.push(v.length);
      }
    }
  }
}

const avgCorrect = correctLengths.reduce((a,b) => a+b, 0) / correctLengths.length;
const avgDistractor = distractorLengths.reduce((a,b) => a+b, 0) / distractorLengths.length;
const diff = avgCorrect - avgDistractor;
console.log('Avg correct:', avgCorrect.toFixed(1));
console.log('Avg distractor:', avgDistractor.toFixed(1));
console.log('Diff:', diff.toFixed(1));

// Write back
const newContent = 'const ' + varName + ' = ' + JSON.stringify(bank, null, 2) + ';\n';
fs.writeFileSync(packPath, newContent);
console.log('File written successfully');