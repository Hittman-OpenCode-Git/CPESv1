// S98P — Multi-section extraction tool
// Extracts Pack A Section A, Pack D Section CD, Pack D Section DD
const fs = require('fs');

// === PACK A Section A ===
const srcA = fs.readFileSync('pack_a_corrected.js', 'utf8');
const fnA = new Function(srcA + '; return MCQ_BANK_A;');
const bankA = fnA();
const sectionAItems = bankA.filter(q => q.QuestionID && /^P1-A-\d{3}$/.test(q.QuestionID));

// === PACK D Sections CD and DD ===
const srcD = fs.readFileSync('pack_d_corrected.js', 'utf8');
const fnD = new Function(srcD + '; return MCQ_BANK_D;');
const bankD = fnD();
const sectionCDItems = bankD.filter(q => q.QuestionID && /^P1-CD-\d{3}$/.test(q.QuestionID));
const sectionDDItems = bankD.filter(q => q.QuestionID && /^P1-DD-\d{3}$/.test(q.QuestionID));

// Build lightweight extracts for classification
function extractFields(items, label) {
  const stats = {};
  const hoItems = [];
  const allExtracted = [];
  
  items.forEach(r => {
    const cl = r.CognitiveLevel || 'MISSING';
    const diff = r.Difficulty || 'MISSING';
    const diffScore = r.DifficultyScore ?? 'MISSING';
    const state = r.question_state || 'MISSING';
    const hasStem = !!r.Stem;
    const hasChoices = !!(r.Choices && Object.keys(r.Choices).length > 0);
    const correctChoice = r.CorrectChoice || 'MISSING';
    
    // Extract choices text
    const choicesText = {};
    if (r.Choices) {
      Object.keys(r.Choices).forEach(k => {
        choicesText[k] = r.Choices[k] ? r.Choices[k].substring(0, 200) : '[EMPTY]';
      });
    }
    
    // Extract ExplanationWrong fields
    const ew = {};
    ['A','B','C','D'].forEach(l => {
      const key = 'ExplanationWrong' + l;
      const val = r[key];
      if (val === '' || val === undefined || val === null) ew[l] = (val === '' ? '[EMPTY]' : '[ABSENT]');
      else ew[l] = val.substring(0, 120) + '...';
    });
    
    const entry = {
      QuestionID: r.QuestionID,
      CognitiveLevel: cl,
      Difficulty: diff,
      DifficultyScore: diffScore,
      question_state: state,
      CorrectChoice: correctChoice,
      Stem: r.Stem ? r.Stem.substring(0, 400) : '[MISSING]',
      Choices: choicesText,
      ExplanationCorrect: r.ExplanationCorrect ? r.ExplanationCorrect.substring(0, 400) : '[MISSING]',
      ExplanationWrong: ew,
      Topic: r.Topic || 'N/A',
    };
    allExtracted.push(entry);
    
    if (cl === 'Evaluate' || cl === 'Analyze') {
      hoItems.push(entry);
    }
    
    // Stats
    stats[cl] = (stats[cl] || 0) + 1;
    if (!r.CognitiveLevel) stats['MISSING'] = (stats['MISSING'] || 0) + 1;
  });

  // Count states
  const stateCounts = {};
  items.forEach(r => {
    const s = r.question_state || 'MISSING';
    stateCounts[s] = (stateCounts[s] || 0) + 1;
  });
  
  console.log(`\n=== ${label} ===`);
  console.log(`Total items: ${items.length}`);
  console.log(`Cognitive distribution: ${JSON.stringify(stats)}`);
  console.log(`State distribution: ${JSON.stringify(stateCounts)}`);
  console.log(`HO-labeled items: ${hoItems.length}`);
  hoItems.forEach(q => {
    console.log(`  ${q.QuestionID} | CL:${q.CognitiveLevel} | State:${q.question_state} | Diff:${q.Difficulty}(${q.DifficultyScore}) | CC:${q.CorrectChoice} | Topic:${q.Topic}`);
  });
  
  return { items: allExtracted, hoItems, count: items.length, stats, stateCounts };
}

const resultA = extractFields(sectionAItems, 'PACK A SECTION A');
const resultCD = extractFields(sectionCDItems, 'PACK D SECTION CD');
const resultDD = extractFields(sectionDDItems, 'PACK D SECTION DD');

// Write full extract for audit use
const fullExtract = {
  packA_SectionA: resultA.items,
  packD_SectionCD: resultCD.items,
  packD_SectionDD: resultDD.items,
  summary: {
    packA_SectionA: { total: resultA.count, hoLabeled: resultA.hoItems.length, cogDist: resultA.stats, stateDist: resultA.stateCounts },
    packD_SectionCD: { total: resultCD.count, hoLabeled: resultCD.hoItems.length, cogDist: resultCD.stats, stateDist: resultCD.stateCounts },
    packD_SectionDD: { total: resultDD.count, hoLabeled: resultDD.hoItems.length, cogDist: resultDD.stats, stateDist: resultDD.stateCounts },
  }
};

fs.writeFileSync('scripts/output/session98p_raw_extract.json', JSON.stringify(fullExtract, null, 2));
console.log(`\nJSON written to scripts/output/session98p_raw_extract.json`);

// Also write HO-only extract for classification
const hoExtract = {
  packA_SectionA: resultA.hoItems,
  packD_SectionCD: resultCD.hoItems,
  packD_SectionDD: resultDD.hoItems,
  totalHO: resultA.hoItems.length + resultCD.hoItems.length + resultDD.hoItems.length,
};
fs.writeFileSync('scripts/output/session98p_ho_extract.json', JSON.stringify(hoExtract, null, 2));
console.log(`HO extract written to scripts/output/session98p_ho_extract.json (${hoExtract.totalHO} items)`);
