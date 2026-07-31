// Session 93P — Extract all Evaluate and Analyze items for classification audit
// Read-only. Governance Light Lane.
// Output: scripts/output/SESSION093P_SAMPLE_FRAME.json

const fs = require('fs');
const path = require('path');

const packs = [
  { name: 'Pack_A', file: 'pack_a_corrected.js', varName: 'MCQ_BANK_A' },
  { name: 'Pack_B', file: 'pack_b_corrected.js', varName: 'MCQ_BANK_B' },
  { name: 'Pack_C', file: 'pack_c_corrected.js', varName: 'MCQ_BANK_C' },
  { name: 'Pack_D', file: 'pack_d_corrected.js', varName: 'MCQ_BANK_D' },
  { name: 'Pack_E', file: 'pack_e_corrected.js', varName: 'MCQ_BANK_E' },
];

function extractSection(qid) {
  // P1-A-001 → A, P1B-B-101 → B, P1E-C-001 → C, etc.
  const parts = qid.split('-');
  if (qid.startsWith('P1E-') || qid.startsWith('P1-')) {
    return parts[1];
  }
  if (qid.startsWith('P1B-')) {
    return parts[1];
  }
  return '?';
}

function extractItems(packInfo) {
  const filePath = path.join(__dirname, '..', packInfo.file);
  const code = fs.readFileSync(filePath, 'utf8');
  
  // Use Function constructor to evaluate the pack array
  const packData = new Function(code + '; return ' + packInfo.varName + ';')();
  
  const evaluateItems = [];
  const analyzeItems = [];
  let totalItems = 0;
  
  if (Array.isArray(packData)) {
    totalItems = packData.length;
    for (const item of packData) {
      const cl = item.CognitiveLevel;
      if (cl === 'Evaluate') {
        evaluateItems.push({
          qid: item.QuestionID,
          pack: packInfo.name,
          section: extractSection(item.QuestionID),
          cognitiveLevel: cl,
          stem: item.Stem || '',
          choices: item.Choices || {},
          correctChoice: item.CorrectChoice || '',
          topic: item.Topic || '',
          difficulty: item.Difficulty || '',
          difficultyScore: item.DifficultyScore || 0,
          questionState: item.question_state || 'Unprocessed',
          explanationCorrect: (item.ExplanationCorrect || '').substring(0, 200),
        });
      }
      if (cl === 'Analyze') {
        analyzeItems.push({
          qid: item.QuestionID,
          pack: packInfo.name,
          section: extractSection(item.QuestionID),
          cognitiveLevel: cl,
          stem: item.Stem || '',
          choices: item.Choices || {},
          correctChoice: item.CorrectChoice || '',
          topic: item.Topic || '',
          difficulty: item.Difficulty || '',
          difficultyScore: item.DifficultyScore || 0,
          questionState: item.question_state || 'Unprocessed',
          explanationCorrect: (item.ExplanationCorrect || '').substring(0, 200),
        });
      }
    }
  }
  
  return { totalItems, evaluateItems, analyzeItems };
}

const allEvaluates = [];
const allAnalyzes = [];
let totalItems = 0;

for (const pack of packs) {
  const result = extractItems(pack);
  totalItems += result.totalItems;
  allEvaluates.push(...result.evaluateItems);
  allAnalyzes.push(...result.analyzeItems);
  
  console.log(`${pack.name}: ${result.totalItems} items, ${result.evaluateItems.length} Evaluate, ${result.analyzeItems.length} Analyze`);
}

console.log(`\nTOTAL: ${totalItems} items, ${allEvaluates.length} Evaluate, ${allAnalyzes.length} Analyze`);

// Per-pack summary
const packSummary = {};
for (const item of allEvaluates) {
  if (!packSummary[item.pack]) packSummary[item.pack] = { evaluate: 0, analyze: 0 };
  packSummary[item.pack].evaluate++;
}
for (const item of allAnalyzes) {
  if (!packSummary[item.pack]) packSummary[item.pack] = { evaluate: 0, analyze: 0 };
  packSummary[item.pack].analyze++;
}
console.log('\n--- Per-Pack Summary ---');
for (const [pack, counts] of Object.entries(packSummary)) {
  console.log(`${pack}: Evaluate=${counts.evaluate}, Analyze=${counts.analyze}`);
}

// Difficulty breakdown for Evaluate items
const evalByDifficulty = {};
for (const item of allEvaluates) {
  const d = item.difficulty || 'Missing';
  evalByDifficulty[d] = (evalByDifficulty[d] || 0) + 1;
}
console.log('\n--- Evaluate by Difficulty ---');
for (const [d, count] of Object.entries(evalByDifficulty).sort()) {
  console.log(`${d}: ${count}`);
}

const output = {
  session: 'SESSION093P',
  timestamp: new Date().toISOString(),
  totalItems,
  evaluateTotal: allEvaluates.length,
  analyzeTotal: allAnalyzes.length,
  evaluateByDifficulty: evalByDifficulty,
  perPackSummary: packSummary,
  evaluateItems: allEvaluates,
  analyzeItems: allAnalyzes,
};

const outPath = path.join(__dirname, 'output', 'SESSION093P_SAMPLE_FRAME.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`\nOutput written to: ${outPath}`);
console.log(`Evaluate items: ${allEvaluates.length}, Analyze items: ${allAnalyzes.length}`);
