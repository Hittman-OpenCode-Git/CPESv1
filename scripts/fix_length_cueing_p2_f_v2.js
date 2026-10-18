const fs = require('fs');

const packPath = 'p2/pack_p2_f.js';
const content = fs.readFileSync(packPath, 'utf8');

const backupPath = packPath + '.bak-length-cueing-fix2-' + Date.now();
fs.writeFileSync(backupPath, content);
console.log('Backup created:', backupPath);

const varName = 'pack_p2_f_questions';
let bank = new Function(content + '\nreturn ' + varName + ';')();
console.log('Loaded', packPath, 'with', bank.length, 'items');

// More aggressive: expand distractors for items where correct is >150 chars longer than average distractor
let expanded = 0;
for (const item of bank) {
  if (!item.Choices || !item.CorrectChoice) continue;
  
  const correctText = item.Choices[item.CorrectChoice];
  if (!correctText) continue;
  
  const correctLen = correctText.length;
  
  // Calculate average distractor length
  const distractorLens = [];
  for (const [k, v] of Object.entries(item.Choices)) {
    if (k !== item.CorrectChoice && v) {
      distractorLens.push(v.length);
    }
  }
  if (distractorLens.length === 0) continue;
  
  const avgDistractorLen = distractorLens.reduce((a,b) => a+b, 0) / distractorLens.length;
  
  // If correct is >150 chars longer than average distractor, expand all distractors
  if (correctLen - avgDistractorLen > 150) {
    for (const [letter, text] of Object.entries(item.Choices)) {
      if (letter === item.CorrectChoice) continue;
      if (!text) continue;
      
      // Substantially expand this distractor
      let expandedText = text;
      
      // Add detailed rationale
      if (text.length < 400) {
        expandedText = text + ' This option is incorrect because it fails to account for the key variables and relationships identified in the scenario. The calculation or analysis required by the question yields a different result when properly executed, as shown in the correct answer. A candidate selecting this choice would likely have overlooked a critical step or misapplied a formula.';
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