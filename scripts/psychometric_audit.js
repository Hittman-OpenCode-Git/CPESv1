const fs = require('fs');
const packs = [
  { file: 'pack_a_corrected.js', var: 'MCQ_BANK_A' },
  { file: 'pack_b_corrected.js', var: 'MCQ_BANK_B' },
  { file: 'pack_c_corrected.js', var: 'MCQ_BANK_C' },
  { file: 'pack_d_corrected.js', var: 'MCQ_BANK_D' },
  { file: 'pack_e_corrected.js', var: 'MCQ_BANK_E' }
];
const base = 'content/packs/';

let allItems = [];
packs.forEach(p => {
  const content = fs.readFileSync(base + p.file, 'utf8');
  const fn = new Function(content + '; return ' + p.var + ';');
  const items = fn();
  items.forEach(item => {
    item._pack = p.file;
    allItems.push(item);
  });
});

// Check for running patterns (same CC position > 4 in a row)
console.log('=== RUNNING PATTERNS (same CC > 4 in a row) ===');
packs.forEach(p => {
  const packItems = allItems.filter(i => i._pack === p.file);
  let streak = 1;
  let maxStreak = 1;
  let maxStreakLetter = '';
  for (let i = 1; i < packItems.length; i++) {
    if (packItems[i].CorrectChoice === packItems[i-1].CorrectChoice) {
      streak++;
      if (streak > maxStreak) {
        maxStreak = streak;
        maxStreakLetter = packItems[i].CorrectChoice;
      }
    } else {
      streak = 1;
    }
  }
  console.log(p.file + ': max streak = ' + maxStreak + ' (' + maxStreakLetter + ')');
  if (maxStreak > 4) {
    console.log('  *** VIOLATION: streak > 4 ***');
  }
});

// Check sequential dependence - CC position predictable from prior
console.log('\n=== SEQUENTIAL DEPENDENCE (transition matrix) ===');
packs.forEach(p => {
  const packItems = allItems.filter(i => i._pack === p.file);
  const trans = { A: {A:0,B:0,C:0,D:0}, B:{A:0,B:0,C:0,D:0}, C:{A:0,B:0,C:0,D:0}, D:{A:0,B:0,C:0,D:0} };
  for (let i = 1; i < packItems.length; i++) {
    const prev = packItems[i-1].CorrectChoice;
    const curr = packItems[i].CorrectChoice;
    if (prev && curr) trans[prev][curr]++;
  }
  console.log(p.file + ':');
  console.log('  A->', JSON.stringify(trans.A));
  console.log('  B->', JSON.stringify(trans.B));
  console.log('  C->', JSON.stringify(trans.C));
  console.log('  D->', JSON.stringify(trans.D));
});

// Check definition-match inflation (DL-031) - high stem/choice lexical overlap with low cognitive level
console.log('\n=== POTENTIAL DL-031 (Definition-match items labeled > Easy) ===');
let defMatchCandidates = 0;
allItems.forEach(item => {
  if (!item.Stem || !item.Choices || !item.CorrectChoice || !item.CognitiveLevel || !item.DifficultyScore) return;
  const correctChoiceText = item.Choices[item.CorrectChoice];
  if (!correctChoiceText) return;
  const stemWords = new Set(item.Stem.toLowerCase().match(/\b\w{4,}\b/g) || []);
  const choiceWords = new Set(correctChoiceText.toLowerCase().match(/\b\w{4,}\b/g) || []);
  let overlap = 0;
  choiceWords.forEach(w => { if (stemWords.has(w)) overlap++; });
  const overlapRatio = choiceWords.size > 0 ? overlap / choiceWords.size : 0;
  if (overlapRatio > 0.5 && item.DifficultyScore > 1 && (item.CognitiveLevel === 'Remember' || item.CognitiveLevel === 'Understand')) {
    defMatchCandidates++;
    console.log('  ' + item.QuestionID + ': overlap=' + overlapRatio.toFixed(2) + ', Cog=' + item.CognitiveLevel + ', DS=' + item.DifficultyScore + ', CC=' + item.CorrectChoice);
    console.log('    Stem: ' + item.Stem.substring(0, 80) + '...');
    console.log('    Choice ' + item.CorrectChoice + ': ' + correctChoiceText.substring(0, 80) + '...');
  }
});
console.log('Total candidates: ' + defMatchCandidates);

// Check for absolute language in choices (DL-003)
console.log('\n=== ABSOLUTE LANGUAGE IN CHOICES (DL-003) ===');
const absTerms = ['always', 'never', 'must', 'impossible', 'exactly', 'only', 'exclusively', 'any', 'all', 'every'];
let absCount = 0;
allItems.forEach(item => {
  if (!item.Choices) return;
  Object.entries(item.Choices).forEach(([letter, text]) => {
    const lower = text.toLowerCase();
    absTerms.forEach(term => {
      const regex = new RegExp('\\b' + term + '\\b', 'i');
      if (regex.test(lower)) {
        absCount++;
        console.log('  ' + item.QuestionID + ' Choice ' + letter + ': "' + term + '" in "' + text.substring(0, 100) + '..."');
      }
    });
  });
});
console.log('Total absolute language hits: ' + absCount);

// Check for length cueing - correct answer systematically longer/shorter
console.log('\n=== LENGTH CUEING ANALYSIS ===');
packs.forEach(p => {
  const packItems = allItems.filter(i => i._pack === p.file);
  let correctLengths = [];
  let distractorLengths = [];
  packItems.forEach(item => {
    if (!item.Choices || !item.CorrectChoice) return;
    const correctText = item.Choices[item.CorrectChoice];
    if (correctText) correctLengths.push(correctText.length);
    Object.entries(item.Choices).forEach(([letter, text]) => {
      if (letter !== item.CorrectChoice && text) distractorLengths.push(text.length);
    });
  });
  const avgCorrect = correctLengths.length ? correctLengths.reduce((a,b)=>a+b,0)/correctLengths.length : 0;
  const avgDistractor = distractorLengths.length ? distractorLengths.reduce((a,b)=>a+b,0)/distractorLengths.length : 0;
  console.log(p.file + ': avg correct length = ' + avgCorrect.toFixed(1) + ', avg distractor length = ' + avgDistractor.toFixed(1) + ', diff = ' + (avgCorrect - avgDistractor).toFixed(1));
});

// Check for grammatical cueing (a/an before vowels)
console.log('\n=== GRAMMATICAL CUEING (a/an) ===');
let gramCount = 0;
allItems.forEach(item => {
  if (!item.Stem || !item.Choices || !item.CorrectChoice) return;
  const stemEnd = item.Stem.trim().slice(-20).toLowerCase();
  const choiceText = item.Choices[item.CorrectChoice];
  if (!choiceText) return;
  const choiceStart = choiceText.trim().toLowerCase();
  if ((stemEnd.endsWith('an ') || stemEnd.endsWith('an\n')) && /^[aeiou]/.test(choiceStart)) {
    gramCount++;
    console.log('  ' + item.QuestionID + ': stem ends with "an", choice starts with vowel');
  }
  if ((stemEnd.endsWith('a ') || stemEnd.endsWith('a\n')) && /^[^aeiou]/.test(choiceStart)) {
    gramCount++;
    console.log('  ' + item.QuestionID + ': stem ends with "a", choice starts with consonant');
  }
});
console.log('Total grammatical cueing hits: ' + gramCount);