// S98P — Full item extract for classification audit
const fs = require('fs');

function loadPack(filename, varName) {
  const src = fs.readFileSync(filename, 'utf8');
  const fn = new Function(src + '; return ' + varName + ';');
  return fn();
}

const bankA = loadPack('pack_a_corrected.js', 'MCQ_BANK_A');
const bankD = loadPack('pack_d_corrected.js', 'MCQ_BANK_D');

function extractFullItems(bank, sectionRegex, label) {
  const items = bank.filter(q => q.QuestionID && sectionRegex.test(q.QuestionID));
  const hoItems = items.filter(q => q.CognitiveLevel === 'Evaluate' || q.CognitiveLevel === 'Analyze');
  
  return hoItems.map(r => {
    const choicesFull = {};
    if (r.Choices) {
      Object.keys(r.Choices).forEach(k => {
        choicesFull[k] = r.Choices[k] || '[EMPTY]';
      });
    }
    
    return {
      QuestionID: r.QuestionID,
      labeled_CognitiveLevel: r.CognitiveLevel,
      question_state: r.question_state || 'MISSING',
      Difficulty: r.Difficulty || '?',
      DifficultyScore: r.DifficultyScore ?? '?',
      CorrectChoice: r.CorrectChoice || 'MISSING',
      Stem: r.Stem || '[MISSING]',
      Choices: choicesFull,
      ExplanationCorrect: r.ExplanationCorrect ? r.ExplanationCorrect.substring(0, 600) : '[MISSING]',
      Topic: r.Topic || 'N/A',
    };
  });
}

const sectionA_HO = extractFullItems(bankA, /^P1-A-\d{3}$/, 'Pack A Section A');
const sectionCD_HO = extractFullItems(bankD, /^P1-CD-\d{3}$/, 'Pack D Section CD');
const sectionDD_HO = extractFullItems(bankD, /^P1-DD-\d{3}$/, 'Pack D Section DD');

const output = { sectionA: sectionA_HO, sectionCD: sectionCD_HO, sectionDD: sectionDD_HO };

fs.writeFileSync('scripts/output/session98p_hofull_extract.json', JSON.stringify(output, null, 2));
console.log(`Pack A Section A HO: ${sectionA_HO.length} items`);
console.log(`Pack D Section CD HO: ${sectionCD_HO.length} items`);
console.log(`Pack D Section DD HO: ${sectionDD_HO.length} items`);
console.log(`Total HO: ${sectionA_HO.length + sectionCD_HO.length + sectionDD_HO.length}`);
console.log(`Written to scripts/output/session98p_hofull_extract.json`);
