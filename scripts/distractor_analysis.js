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

// Jaccard similarity for distractor pairs
function jaccard(set1, set2) {
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  return union.size > 0 ? intersection.size / union.size : 0;
}

function tokenize(text) {
  return new Set(text.toLowerCase().match(/\b\w{3,}\b/g) || []);
}

console.log('=== DISTRACTOR SIMILARITY (Jaccard > 0.7) ===');
let highSimCount = 0;
allItems.forEach(item => {
  if (!item.Choices) return;
  const choices = ['A', 'B', 'C', 'D'];
  for (let i = 0; i < choices.length; i++) {
    for (let j = i + 1; j < choices.length; j++) {
      const set1 = tokenize(item.Choices[choices[i]] || '');
      const set2 = tokenize(item.Choices[choices[j]] || '');
      const sim = jaccard(set1, set2);
      if (sim > 0.7) {
        highSimCount++;
        console.log('  ' + item.QuestionID + ' Choices ' + choices[i] + '-' + choices[j] + ': Jaccard=' + sim.toFixed(3));
        console.log('    ' + choices[i] + ': ' + (item.Choices[choices[i]] || '').substring(0, 80));
        console.log('    ' + choices[j] + ': ' + (item.Choices[choices[j]] || '').substring(0, 80));
      }
    }
  }
});
console.log('Total high-similarity distractor pairs (Jaccard > 0.7): ' + highSimCount);

// Check for 100% identical distractors
console.log('\n=== 100% IDENTICAL DISTRACTORS ===');
let identicalCount = 0;
allItems.forEach(item => {
  if (!item.Choices) return;
  const choices = ['A', 'B', 'C', 'D'];
  for (let i = 0; i < choices.length; i++) {
    for (let j = i + 1; j < choices.length; j++) {
      const c1 = (item.Choices[choices[i]] || '').trim();
      const c2 = (item.Choices[choices[j]] || '').trim();
      if (c1 && c2 && c1 === c2) {
        identicalCount++;
        console.log('  ' + item.QuestionID + ' Choices ' + choices[i] + '-' + choices[j] + ': IDENTICAL');
        console.log('    ' + c1.substring(0, 100));
      }
    }
  }
});
console.log('Total identical distractor pairs: ' + identicalCount);

// Check per-section answer position balance
console.log('\n=== PER-SECTION ANSWER POSITION BALANCE ===');
const sections = ['A', 'B', 'C', 'D', 'E', 'F'];
sections.forEach(sec => {
  const secItems = allItems.filter(i => i.Section === sec);
  const cc = { A: 0, B: 0, C: 0, D: 0 };
  secItems.forEach(item => { if (item.CorrectChoice) cc[item.CorrectChoice]++; });
  const total = secItems.length;
  console.log('Section ' + sec + ' (' + total + '): A=' + cc.A + ' (' + (cc.A/total*100).toFixed(1) + '%) B=' + cc.B + ' (' + (cc.B/total*100).toFixed(1) + '%) C=' + cc.C + ' (' + (cc.C/total*100).toFixed(1) + '%) D=' + cc.D + ' (' + (cc.D/total*100).toFixed(1) + '%)');
  // Check if any position > 28% or < 22%
  Object.entries(cc).forEach(([pos, count]) => {
    const pct = count/total*100;
    if (pct > 28 || pct < 22) {
      console.log('  *** POSITION BIAS: ' + pos + ' = ' + pct.toFixed(1) + '% ***');
    }
  });
});

// Check for "all of the above" / "none of the above" patterns
console.log('\n=== ALL/NONE OF THE ABOVE PATTERNS ===');
let allAbove = 0, noneAbove = 0;
allItems.forEach(item => {
  if (!item.Choices) return;
  Object.entries(item.Choices).forEach(([letter, text]) => {
    const lower = text.toLowerCase();
    if (lower.includes('all of the above') || lower.includes('all the above')) {
      allAbove++;
      console.log('  ' + item.QuestionID + ' Choice ' + letter + ': ' + text.substring(0, 100));
    }
    if (lower.includes('none of the above') || lower.includes('none the above')) {
      noneAbove++;
      console.log('  ' + item.QuestionID + ' Choice ' + letter + ': ' + text.substring(0, 100));
    }
  });
});
console.log('All of the above: ' + allAbove + ', None of the above: ' + noneAbove);

// Check for vague qualifiers (DL-004)
console.log('\n=== VAGUE QUALIFIERS (DL-004) ===');
const vagueTerms = ['usually', 'normally', 'generally', 'often', 'typically', 'mostly', 'largely', 'primarily', 'mainly'];
let vagueCount = 0;
allItems.forEach(item => {
  if (!item.Choices) return;
  Object.entries(item.Choices).forEach(([letter, text]) => {
    const lower = text.toLowerCase();
    vagueTerms.forEach(term => {
      const regex = new RegExp('\\b' + term + '\\b', 'i');
      if (regex.test(lower)) {
        vagueCount++;
        console.log('  ' + item.QuestionID + ' Choice ' + letter + ': "' + term + '" in "' + text.substring(0, 100) + '..."');
      }
    });
  });
});
console.log('Total vague qualifier hits: ' + vagueCount);