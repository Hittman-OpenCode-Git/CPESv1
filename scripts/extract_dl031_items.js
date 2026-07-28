const fs = require('fs');

function loadPack(packFile, varName) {
  const content = fs.readFileSync(packFile, 'utf8');
  const f = new Function(content + '; return ' + varName + ';');
  return f();
}

const packs = {
  B: loadPack('pack_b_corrected.js', 'MCQ_BANK_B'),
  C: loadPack('pack_c_corrected.js', 'MCQ_BANK_C'),
  D: loadPack('pack_d_corrected.js', 'MCQ_BANK_D'),
  E: loadPack('pack_e_corrected.js', 'MCQ_BANK_E')
};

const calibrationQIDs = new Set([
  // Pack B (2)
  'P1B-F-134', 'P1B-F-146',
  // Pack C (8)
  'P1-BC-054', 'P1-FC-041', 'P1-FC-042', 'P1-FC-043', 'P1-FC-044', 'P1-FC-061', 'P1-FC-063', 'P1-FC-065',
  // Pack D (6) - includes FD-073 as the 6th
  'P1-CD-053', 'P1-CD-054', 'P1-FD-071', 'P1-FD-072', 'P1-FD-073', 'P1-FD-074',
]);

const rewriteQIDs = new Set([
  'P1-EC-019', 'P1-FC-005', 'P1-FC-045', 'P1-CD-050'
]);

const packKey = { B: 'B', C: 'C', D: 'D', E: 'E' };

// Find Pack E Analyze definition-match items
const definitionMarkers = /is known as|is best described as|refers to the concept|is an example of|is called|is defined as|is the term for|this concept is|the concept of|best describes|most accurately describes|this describes|which term|what term|described as|referred to as|known as/i;
const eAnalyze = packs.E.filter(i => i.CognitiveLevel === 'Analyze' && definitionMarkers.test(i.Stem || ''));
const eCalibrationQIDs = new Set(eAnalyze.map(i => i.QuestionID));

console.log('Pack E Analyze definition-matches:', eAnalyze.length);
eAnalyze.forEach(i => {
  console.log(`  ${i.QuestionID}: ${i.Difficulty}/${i.DifficultyScore} — ${(i.Stem||'').substring(0,120)}`);
});

// Extract all items
const allResults = {};

for (const [packLetter, items] of Object.entries(packs)) {
  for (const item of items) {
    if (calibrationQIDs.has(item.QuestionID) || rewriteQIDs.has(item.QuestionID) || eCalibrationQIDs.has(item.QuestionID)) {
      allResults[item.QuestionID] = {
        pack: packLetter,
        QuestionID: item.QuestionID,
        Difficulty: item.Difficulty || 'N/A',
        DifficultyScore: item.DifficultyScore || 'N/A',
        CognitiveLevel: item.CognitiveLevel || 'N/A',
        Stem: (item.Stem || item.Prompt || '').substring(0, 200),
        CorrectChoice: item.CorrectChoice || 'N/A',
        Choices: item.Choices || 'N/A',
        ExplanationCorrect: (item.ExplanationCorrect || item.Explanation || '').substring(0, 300),
        question_state: item.question_state || 'N/A'
      };
    }
  }
}

fs.writeFileSync('scripts/output/dl031_items_extracted.json', JSON.stringify(allResults, null, 2));
console.log('\nTotal items extracted:', Object.keys(allResults).length);
console.log(' - Calibration:', Object.values(allResults).filter(i => calibrationQIDs.has(i.QuestionID)).length);
console.log(' - Rewrite:', Object.values(allResults).filter(i => rewriteQIDs.has(i.QuestionID)).length);
console.log(' - Pack E calibration:', Object.values(allResults).filter(i => eCalibrationQIDs.has(i.QuestionID)).length);
