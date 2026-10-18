const fs = require('fs');

const packPath = 'content/packs/pack_a_corrected.js';
const content = fs.readFileSync(packPath, 'utf8');

const backupPath = packPath + '.bak-p1e-bias-fix-' + Date.now();
fs.writeFileSync(backupPath, content);
console.log('Backup created:', backupPath);

const varName = 'MCQ_BANK_A';
let bank = new Function(content + '\nreturn ' + varName + ';')();
console.log('Loaded', packPath, 'with', bank.length, 'items');

// Find Section E items (P1-E-*)
const sectionEIndices = [];
for (let i = 0; i < bank.length; i++) {
  if (bank[i].QuestionID && bank[i].QuestionID.startsWith('P1-E-')) {
    sectionEIndices.push(i);
  }
}

console.log('Section E items:', sectionEIndices.length);

const dist = {A:0, B:0, C:0, D:0};
for (const idx of sectionEIndices) dist[bank[idx].CorrectChoice]++;
console.log('Section E distribution:', dist);
const total = dist.A + dist.B + dist.C + dist.D;
console.log('B position %:', (dist.B/total*100).toFixed(1) + '%');

// Target: reduce B from 24 to 21 (28% of 75 = 21)
// Need to change 3 B answers to other letters
// Prefer changing to C or D which are underrepresented

let changesNeeded = dist.B - 21;
console.log('Need to change', changesNeeded, 'B answers');

let changes = 0;
for (const idx of sectionEIndices) {
  if (changes >= changesNeeded) break;
  if (bank[idx].CorrectChoice === 'B') {
    // Choose a replacement that improves distribution
    const currentDist = {A:0, B:0, C:0, D:0};
    for (const j of sectionEIndices) currentDist[bank[j].CorrectChoice]++;
    
    // Find the most underrepresented letter
    let bestLetter = 'A';
    let minCount = currentDist.A;
    for (const letter of ['C', 'D', 'A']) {
      if (currentDist[letter] < minCount) {
        minCount = currentDist[letter];
        bestLetter = letter;
      }
    }
    
    const oldCC = bank[idx].CorrectChoice;
    const newCC = bestLetter;
    
    const ewNewKey = 'ExplanationWrong' + newCC;
    const ewOldKey = 'ExplanationWrong' + oldCC;
    
    const oldEC = bank[idx].ExplanationCorrect;
    const newEC = bank[idx][ewNewKey] || '';
    
    bank[idx].ExplanationCorrect = newEC;
    bank[idx][ewNewKey] = oldEC;
    bank[idx][ewOldKey] = '';
    bank[idx].CorrectChoice = newCC;
    
    console.log('Changed ' + bank[idx].QuestionID + ': ' + oldCC + ' -> ' + newCC);
    changes++;
  }
}

// Verify
const dist2 = {A:0, B:0, C:0, D:0};
for (const idx of sectionEIndices) dist2[bank[idx].CorrectChoice]++;
console.log('New Section E distribution:', dist2);
console.log('New B position %:', (dist2.B/total*100).toFixed(1) + '%');

// Write back
const newContent = 'const ' + varName + ' = ' + JSON.stringify(bank, null, 2) + ';\n';
fs.writeFileSync(packPath, newContent);
console.log('File written successfully');