const fs = require('fs');

// Generic streak fix function
function fixPackStreaks(packPath, varName, maxStreak = 4) {
  const content = fs.readFileSync(packPath, 'utf8');
  const backupPath = packPath + '.bak-streak-fix-' + Date.now();
  fs.writeFileSync(backupPath, content);
  console.log('Backup created:', backupPath);

  let bank = new Function(content + '\nreturn ' + varName + ';')();
  console.log('Loaded', packPath, 'with', bank.length, 'items');

  function wouldCreateLongStreak(arr, index, letter, maxStreak) {
    if (index < maxStreak) return false;
    for (let i = 1; i <= maxStreak; i++) {
      if (arr[index - i].CorrectChoice !== letter) return false;
    }
    return true;
  }

  function getBestLetter(arr, index, preferred, maxStreak) {
    const letters = ['A', 'B', 'C', 'D'];
    for (const letter of [preferred, ...letters.filter(l => l !== preferred)]) {
      if (!wouldCreateLongStreak(arr, index, letter, maxStreak)) {
        return letter;
      }
    }
    for (const letter of letters) {
      if (!wouldCreateLongStreak(arr, index, letter, maxStreak)) {
        return letter;
      }
    }
    return preferred;
  }

  let changes = 0;
  for (let i = 0; i < bank.length; i++) {
    const currentCC = bank[i].CorrectChoice;
    const bestCC = getBestLetter(bank, i, currentCC, maxStreak);
    
    if (bestCC !== currentCC) {
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
  let maxStreakFound = 1;
  for (let i = 1; i < bank.length; i++) {
    if (bank[i].CorrectChoice === bank[i-1].CorrectChoice) {
      currentStreak++;
      if (currentStreak > maxStreakFound) maxStreakFound = currentStreak;
    } else {
      currentStreak = 1;
    }
  }
  console.log('Max streak after fix:', maxStreakFound);

  const dist = {A:0, B:0, C:0, D:0};
  for (const item of bank) dist[item.CorrectChoice]++;
  console.log('Distribution:', dist);

  const newContent = 'const ' + varName + ' = ' + JSON.stringify(bank, null, 2) + ';\n';
  fs.writeFileSync(packPath, newContent);
  console.log('File written successfully');

  return { changes, maxStreak: maxStreakFound, distribution: dist };
}

// Fix P2 Pack C 8-item B streak
const result = fixPackStreaks('p2/pack_p2_c.js', 'pack_p2_c_questions');
console.log('P2 Pack C result:', result);