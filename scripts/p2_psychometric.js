const fs = require('fs');
const p2packs = [
  { file: 'p2/pack_p2_a.js', var: 'pack_p2_a_questions' },
  { file: 'p2/pack_p2_b.js', var: 'pack_p2_b_questions' },
  { file: 'p2/pack_p2_c.js', var: 'pack_p2_c_questions' },
  { file: 'p2/pack_p2_d.js', var: 'pack_p2_d_questions' },
  { file: 'p2/pack_p2_e.js', var: 'pack_p2_e_questions' },
  { file: 'p2/pack_p2_f.js', var: 'pack_p2_f_questions' }
];

let allP2Items = [];
p2packs.forEach(p => {
  try {
    const content = fs.readFileSync(p.file, 'utf8');
    const fn = new Function(content + '; return ' + p.var + ';');
    const items = fn();
    items.forEach(item => {
      item._pack = p.file;
      allP2Items.push(item);
    });
  } catch(e) {}
});

// P2 Per-section answer position balance
console.log('=== P2 PER-SECTION ANSWER POSITION BALANCE ===');
const sections = {};
allP2Items.forEach(item => {
  if (item.Section) {
    sections[item.Section] = sections[item.Section] || { total: 0, cc: { A: 0, B: 0, C: 0, D: 0 } };
    sections[item.Section].total++;
    if (item.CorrectChoice) sections[item.Section].cc[item.CorrectChoice]++;
  }
});

Object.entries(sections).sort((a,b) => a[0].localeCompare(b[0])).forEach(([sec, data]) => {
  const total = data.total;
  console.log('Section ' + sec + ' (' + total + '): A=' + data.cc.A + ' (' + (data.cc.A/total*100).toFixed(1) + '%) B=' + data.cc.B + ' (' + (data.cc.B/total*100).toFixed(1) + '%) C=' + data.cc.C + ' (' + (data.cc.C/total*100).toFixed(1) + '%) D=' + data.cc.D + ' (' + (data.cc.D/total*100).toFixed(1) + '%)');
  Object.entries(data.cc).forEach(([pos, count]) => {
    const pct = count/total*100;
    if (pct > 28 || pct < 22) {
      console.log('  *** POSITION BIAS: ' + pos + ' = ' + pct.toFixed(1) + '% ***');
    }
  });
});

// P2 Running patterns
console.log('\n=== P2 RUNNING PATTERNS ===');
p2packs.forEach(p => {
  const packItems = allP2Items.filter(i => i._pack === p.file);
  let streak = 1, maxStreak = 1, maxLetter = '';
  for (let i = 1; i < packItems.length; i++) {
    if (packItems[i].CorrectChoice === packItems[i-1].CorrectChoice) {
      streak++;
      if (streak > maxStreak) { maxStreak = streak; maxLetter = packItems[i].CorrectChoice; }
    } else { streak = 1; }
  }
  console.log(p.file + ': max streak = ' + maxStreak + ' (' + maxLetter + ')' + (maxStreak > 4 ? ' *** VIOLATION ***' : ''));
});

// P2 Absolute language
console.log('\n=== P2 ABSOLUTE LANGUAGE (DL-003) ===');
const absTerms = ['always', 'never', 'must', 'impossible', 'exactly', 'only', 'exclusively', 'any', 'all', 'every'];
let absCount = 0;
allP2Items.forEach(item => {
  if (!item.Choices) return;
  Object.entries(item.Choices).forEach(([letter, text]) => {
    const lower = text.toLowerCase();
    absTerms.forEach(term => {
      const regex = new RegExp('\\b' + term + '\\b', 'i');
      if (regex.test(lower)) {
        absCount++;
        console.log('  ' + item.QuestionID + ' Choice ' + letter + ': "' + term + '"');
      }
    });
  });
});
console.log('Total P2 absolute language hits: ' + absCount);

// P2 Length cueing
console.log('\n=== P2 LENGTH CUEING ===');
p2packs.forEach(p => {
  const packItems = allP2Items.filter(i => i._pack === p.file);
  let correctLengths = [], distractorLengths = [];
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
  console.log(p.file + ': avg correct=' + avgCorrect.toFixed(1) + ', avg distractor=' + avgDistractor.toFixed(1) + ', diff=' + (avgCorrect - avgDistractor).toFixed(1));
});