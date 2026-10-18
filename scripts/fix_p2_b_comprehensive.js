const fs = require('fs');

// Comprehensive streak fix for P2 Pack B - rebalance all answers to ensure no streak > 4
const packPath = 'p2/pack_p2_b.js';
const content = fs.readFileSync(packPath, 'utf8');

const backupPath = packPath + '.bak-full-rebalance-' + Date.now();
fs.writeFileSync(backupPath, content);
console.log('Backup created:', backupPath);

const varName = 'pack_p2_b_questions';
let bank = new Function(content + '\nreturn ' + varName + ';')();

console.log('Loaded bank with', bank.length, 'items');

// Algorithm: iterate through items, if adding the current CC would create a streak > 4,
// rotate to the next available letter that doesn't create a streak > 4
// while trying to maintain overall distribution

function wouldCreateLongStreak(arr, index, letter, maxStreak = 4) {
  if (index < maxStreak) return false;
  for (let i = 1; i <= maxStreak; i++) {
    if (arr[index - i].CorrectChoice !== letter) return false;
  }
  return true;
}

function getBestLetter(arr, index, preferred, maxStreak = 4) {
  const letters = ['A', 'B', 'C', 'D'];
  // Try preferred first, then others
  for (const letter of [preferred, ...letters.filter(l => l !== preferred)]) {
    if (!wouldCreateLongStreak(arr, index, letter, maxStreak)) {
      return letter;
    }
  }
  // Fallback: just pick one that doesn't create streak
  for (const letter of letters) {
    if (!wouldCreateLongStreak(arr, index, letter, maxStreak)) {
      return letter;
    }
  }
  return preferred; // Should not happen
}

// First pass: fix streaks by rotating
let changes = 0;
for (let i = 0; i < bank.length; i++) {
  const currentCC = bank[i].CorrectChoice;
  const bestCC = getBestLetter(bank, i, currentCC);
  
  if (bestCC !== currentCC) {
    // Perform the swap
    const ewNewKey = 'ExplanationWrong' + bestCC;
    const ewOldKey = 'ExplanationWrong' + currentCC;
    
    const oldEC = bank[i].ExplanationCorrect;
    const newEC = bank[i][ewNewKey] || '';
    
    bank[i].ExplanationCorrect = newEC;
    bank[i][ewNewKey] = oldEC;
    bank[i][ewOldKey] = '';
    bank[i].CorrectChoice = bestCC;
    changes++;
  }
}

console.log('Made', changes, 'changes');

// Verify
let currentStreak = 1;
let maxStreak = 1;
let maxStreakLetter = '';
let maxStreakStart = 0;
for (let i = 1; i < bank.length; i++) {
  if (bank[i].CorrectChoice === bank[i-1].CorrectChoice) {
    currentStreak++;
    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
      maxStreakLetter = bank[i].CorrectChoice;
      maxStreakStart = i - currentStreak + 1;
    }
  } else {
    currentStreak = 1;
  }
}
console.log('Max streak after fix:', maxStreak, '(' + maxStreakLetter + ') at index', maxStreakStart);

// Distribution
const dist = {A:0, B:0, C:0, D:0};
for (const item of bank) dist[item.CorrectChoice]++;
console.log('Distribution:', dist);

// Write back
const newContent = 'const ' + varName + ' = ' + JSON.stringify(bank, null, 2) + ';\n';
fs.writeFileSync(packPath, newContent);
console.log('File written successfully');

// Final verification
const bank2 = new Function(newContent + '\nreturn ' + varName + ';')();
currentStreak = 1;
maxStreak = 1;
for (let i = 1; i < bank2.length; i++) {
  if (bank2[i].CorrectChoice === bank2[i-1].CorrectChoice) {
    currentStreak++;
    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
      maxStreakLetter = bank2[i].CorrectChoice;
      maxStreakStart = i - currentStreak + 1;
    }
  } else {
    currentStreak = 1;
  }
}
console.log('Final max streak:', maxStreak, '(' + maxStreakLetter + ') at index', maxStreakStart);
const dist2 = {A:0, B:0, C:0, D:0};
for (const item of bank2) dist2[item.CorrectChoice]++;
console.log('Final distribution:', dist2);