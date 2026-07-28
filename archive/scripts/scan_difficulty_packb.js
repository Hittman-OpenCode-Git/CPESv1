const fs = require('fs');
const content = fs.readFileSync('C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/pack_b_corrected.js', 'utf-8');
const fn = new Function(content + '; return MCQ_BANK_B;');
const items = fn();
console.log('Total items:', items.length);

const targets = items.filter(q => {
  const id = q.QuestionID;
  return /^P1B-[BCF]-\d+/.test(id);
});

console.log('Target items:', targets.length);

const mismatches = [];
targets.forEach(q => {
  const label = q.Difficulty;
  const score = q.DifficultyScore;
  let expected;
  switch(label) {
    case 'Easy': expected = 1; break;
    case 'Moderate-Easy': expected = 2; break;
    case 'Moderate': expected = 3; break;
    case 'Difficult': expected = 4; break;
    case 'Very Difficult': expected = 5; break;
    default: expected = -1;
  }
  if (score !== expected) {
    mismatches.push({ qid: q.QuestionID, label, score, expected });
  }
});

console.log('\n=== MISMATCHES (label != score):', mismatches.length, '===');
mismatches.forEach(m => console.log(`  ${m.qid}: label="${m.label}" score=${m.score} expected=${m.expected}`));

console.log('\n=== DISTRIBUTION ===');
const dist = {};
targets.forEach(q => {
  const key = 'Difficulty: ' + q.Difficulty + ' | DifficultyScore: ' + q.DifficultyScore + ' | QID: ' + q.QuestionID;
  // Group by Difficulty label + score
  const grp = q.Difficulty + '/' + q.DifficultyScore;
  dist[grp] = (dist[grp] || 0) + 1;
});
Object.entries(dist).sort().forEach(([k,v]) => console.log(`  ${k}: ${v} items`));

console.log('\n=== SECTION BREAKDOWN ===');
const sections = {};
targets.forEach(q => {
  const section = q.Section;
  const grp = section + ':' + q.Difficulty + '/' + q.DifficultyScore;
  sections[grp] = (sections[grp] || 0) + 1;
});
Object.entries(sections).sort().forEach(([k,v]) => console.log(`  ${k}: ${v}`));

console.log('\n=== OVERSTATEMENT ANALYSIS (bias: what should be downgraded) ===');
targets.forEach(q => {
  const label = q.Difficulty;
  const score = q.DifficultyScore;
  const stem = q.Stem;
  
  // Flag: "Difficult" items that are definitional/recall (should be Easy or Moderate)
  // Flag: "Difficult" with DifficultyScore=4 that look like simple concept recall
  if (label === 'Difficult' || score === 4) {
    console.log(`  ${q.QuestionID}: ${label}/${score} | "${stem.substring(0, 80)}..."`);
  }
});
