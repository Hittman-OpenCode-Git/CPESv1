const fs = require('fs');
const path = require('path');

// Fix P2 Pack B 11-item D streak (indices 14-24)
const packPath = 'p2/pack_p2_b.js';
const content = fs.readFileSync(packPath, 'utf8');

// Backup
const backupPath = packPath + '.bak-dstreak-fix-' + Date.now();
fs.writeFileSync(backupPath, content);
console.log('Backup created:', backupPath);

const varName = 'pack_p2_b_questions';
let bank = new Function(content + '\nreturn ' + varName + ';')();

console.log('Loaded bank with', bank.length, 'items');

// Fix the D streak at indices 14-24 (11 items)
// Target pattern: D, A, B, C, D, A, B, C, D, A, B
const newCCPattern = ['D', 'A', 'B', 'C', 'D', 'A', 'B', 'C', 'D', 'A', 'B'];

console.log('Original streak (indices 14-24):');
for (let i = 14; i <= 24; i++) {
  console.log('  Index ' + i + ': ' + bank[i].QuestionID + ' CC=' + bank[i].CorrectChoice);
}

// Fix the streak
for (let i = 0; i < 11; i++) {
  const recordIndex = 14 + i;
  const item = bank[recordIndex];
  const oldCC = item.CorrectChoice;
  const newCC = newCCPattern[i];
  
  if (oldCC === newCC) {
    console.log('Index ' + recordIndex + ' (' + item.QuestionID + '): already ' + newCC + ', skipping');
    continue;
  }
  
  console.log('Index ' + recordIndex + ' (' + item.QuestionID + '): ' + oldCC + ' -> ' + newCC);
  
  // Swap ExplanationCorrect with ExplanationWrong[newCC]
  // Clear ExplanationWrong[oldCC]
  const ewNewKey = 'ExplanationWrong' + newCC;
  const ewOldKey = 'ExplanationWrong' + oldCC;
  
  const oldEC = item.ExplanationCorrect;
  const newEC = item[ewNewKey] || '';
  const oldEWOld = item[ewOldKey] || '';
  
  item.ExplanationCorrect = newEC;
  item[ewNewKey] = oldEC;
  item[ewOldKey] = '';
  item.CorrectChoice = newCC;
  
  console.log('  Swapped EC <-> EW[' + newCC + '], cleared EW[' + oldCC + ']');
}

// Write back the file
const newContent = 'const ' + varName + ' = ' + JSON.stringify(bank, null, 2) + ';\n';
fs.writeFileSync(packPath, newContent);
console.log('File written successfully');

// Verify
const newContent2 = fs.readFileSync(packPath, 'utf8');
const bank2 = new Function(newContent2 + '\nreturn ' + varName + ';')();
console.log('Verified bank with', bank2.length, 'items');
console.log('Fixed streak (indices 14-24):');
for (let i = 14; i <= 24; i++) {
  console.log('  Index ' + i + ': ' + bank2[i].QuestionID + ' CC=' + bank2[i].CorrectChoice);
}

// Check max streak
let currentStreak = 1;
let maxStreak = 1;
let streakLetter = bank2[0].CorrectChoice;
for (let i = 1; i < bank2.length; i++) {
  if (bank2[i].CorrectChoice === bank2[i-1].CorrectChoice) {
    currentStreak++;
    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
      streakLetter = bank2[i].CorrectChoice;
    }
  } else {
    currentStreak = 1;
  }
}
console.log('Max streak:', maxStreak, '(' + streakLetter + ')');