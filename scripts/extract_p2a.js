const fs = require('fs');
const path = require('path');

const qids = ['P2-A-164','P2-A-295','P2-A-490','P2-A-312','P2-A-373','P2-A-409','P2-A-309','P2-A-545','P2-A-011','P2-A-133','P2-A-021'];

const content = fs.readFileSync(path.join('C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026/p2', 'pack_p2_a.js'), 'utf8');
const clean = content.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
const match = clean.match(/const\s+\w+\s*=\s*(\[[\s\S]*\])\s*;/);
if (match) {
  try {
    const arr = eval('(' + match[1] + ')');
    console.log('Array length:', arr.length);
    arr.forEach(item => {
      if (qids.includes(item.QuestionID)) {
        console.log('=== ' + item.QuestionID + ' ===');
        console.log('Stem:', item.Stem);
        console.log('Choices:', JSON.stringify(item.Choices));
        console.log('CorrectChoice:', item.CorrectChoice);
        console.log('ExplanationCorrect:', item.ExplanationCorrect);
        console.log('ExplanationWrongA:', item.ExplanationWrongA);
        console.log('ExplanationWrongB:', item.ExplanationWrongB);
        console.log('ExplanationWrongC:', item.ExplanationWrongC);
        console.log('ExplanationWrongD:', item.ExplanationWrongD);
        console.log('Topic:', item.Topic);
        console.log('DifficultyScore:', item.DifficultyScore);
        console.log('CognitiveLevel:', item.CognitiveLevel);
        console.log('certification_batch:', item.certification_batch);
        console.log('certification_date:', item.certification_date);
        console.log('Part2OnlyFlag:', item.Part2OnlyFlag);
        console.log('');
      }
    });
  } catch(e) {
    console.log('Error:', e.message);
  }
}