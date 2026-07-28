// Analyze explanation placeholder patterns across all packs
const fs = require('fs');
const path = require('path');

const DIR = 'C:\\Users\\BryanHolland\\Downloads\\CMA_Part_1_2026';
const PACKS = ['A','B','C','D','E'];

function extractArray(code, varName) {
  const patterns = ['const ' + varName + ' = [', 'let ' + varName + ' = [', 'var ' + varName + ' = [', varName + ' = ['];
  let idx = -1;
  for (const p of patterns) {
    idx = code.indexOf(p);
    if (idx !== -1) break;
  }
  if (idx === -1) return null;
  const arrStart = code.indexOf('[', idx);
  let depth = 0, pos = arrStart;
  do {
    if (code[pos] === '[') depth++;
    if (code[pos] === ']') depth--;
    pos++;
  } while (depth > 0 && pos < code.length);
  const jsStr = code.substring(arrStart, pos);
  try { return JSON.parse(jsStr); } catch(e) {
    try {
      const fn = new Function('return (' + jsStr + ')');
      return fn();
    } catch(e2) { return null; }
  }
}

let totalQ = 0;
let totalCorrectChoice = 0;
let totalPlausibleDistractor = 0;
let hasCorrectChoiceInRightSlot = 0;
let hasCorrectChoiceInWrongSlot = 0;

for (const p of PACKS) {
  const filePath = path.join(DIR, 'pack_' + p.toLowerCase() + '_corrected.js');
  const code = fs.readFileSync(filePath, 'utf8');
  const arr = extractArray(code, 'MCQ_BANK_' + p);
  if (!arr) { console.log(`${p}: Failed to parse`); continue; }
  console.log(`\n=== Pack ${p} (${arr.length} questions) ===`);
  
  let packCC = 0, packPD = 0;
  let packCorrectSlot = 0, packWrongSlot = 0;
  
  arr.forEach(q => {
    totalQ++;
    const correctLetter = q.CorrectChoice;
    const fields = ['A','B','C','D'];
    
    fields.forEach(f => {
      const fieldName = 'ExplanationWrong' + f;
      const val = q[fieldName] || '';
      if (val === 'This is the correct choice.') {
        packCC++;
        totalCorrectChoice++;
        if (f === correctLetter) {
          packCorrectSlot++;
          hasCorrectChoiceInRightSlot++;
        } else {
          packWrongSlot++;
          hasCorrectChoiceInWrongSlot++;
        }
      }
      if (val.includes('Plausible distractor')) {
        packPD++;
        totalPlausibleDistractor++;
      }
    });
    
    // Also check ExplanationCorrect
    const explCorrect = q.ExplanationCorrect || '';
    if (explCorrect === 'This is the correct choice.') {
      console.log(`  ${q.QuestionID}: ExplanationCorrect has placeholder`);
    }
    if (explCorrect.includes('Plausible distractor')) {
      console.log(`  ${q.QuestionID}: ExplanationCorrect has PD text`);
    }
  });
  
  console.log(`  "This is the correct choice": ${packCC} (correct slot: ${packCorrectSlot}, wrong slot: ${packWrongSlot})`);
  console.log(`  "Plausible distractor": ${packPD}`);
  
  // Per-question analysis for questions with placeholders
  let questionsWithCC = 0, questionsWithPD = 0;
  arr.forEach(q => {
    const fields = ['A','B','C','D'];
    let hasCC = false, hasPD = false;
    fields.forEach(f => {
      const val = q['ExplanationWrong' + f] || '';
      if (val === 'This is the correct choice.') hasCC = true;
      if (val.includes('Plausible distractor')) hasPD = true;
    });
    if (hasCC) questionsWithCC++;
    if (hasPD) questionsWithPD++;
  });
  console.log(`  Questions with "This is the correct choice": ${questionsWithCC}`);
  console.log(`  Questions with "Plausible distractor": ${questionsWithPD}`);
  console.log(`  Questions with BOTH patterns: ${arr.filter(q => {
    let hcc = false, hpd = false;
    ['A','B','C','D'].forEach(f => {
      const v = q['ExplanationWrong' + f] || '';
      if (v === 'This is the correct choice.') hcc = true;
      if (v.includes('Plausible distractor')) hpd = true;
    });
    return hcc && hpd;
  }).length}`);
}

console.log(`\n=== TOTALS ===`);
console.log(`Total questions: ${totalQ}`);
console.log(`"This is the correct choice" occurrences: ${totalCorrectChoice}`);
console.log(`  In slot matching correct letter: ${hasCorrectChoiceInRightSlot}`);
console.log(`  In slot NOT matching correct letter: ${hasCorrectChoiceInWrongSlot}`);
console.log(`"Plausible distractor" occurrences: ${totalPlausibleDistractor}`);
