const fs = require('fs');
const content = fs.readFileSync('C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/p2/pack_p2_f.js', 'utf8');
const clean = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
const match = clean.match(/var\s+\w+\s*=\s*(\[[\s\S]*\])\s*;/);
if (match) {
  const arr = eval('(' + match[1] + ')');
  console.log('Parse successful. Total items:', arr.length);
  const item = arr.find(x => x.QuestionID === 'P2-F-227');
  if (item) {
    console.log('P2-F-227 found:');
    console.log('  CorrectChoice:', item.CorrectChoice);
    console.log('  question_state:', item.question_state);
    console.log('  certification_batch:', item.certification_batch);
    console.log('  certification_date:', item.certification_date);
    console.log('  recertification_batch:', item.recertification_batch);
    console.log('  recertification_date:', item.recertification_date);
    console.log('  ExplanationWrongA length:', item.ExplanationWrongA.length);
    console.log('  ExplanationWrongB:', item.ExplanationWrongB);
    console.log('  ExplanationWrongC length:', item.ExplanationWrongC.length);
    console.log('  ExplanationWrongD length:', item.ExplanationWrongD.length);
  }
}