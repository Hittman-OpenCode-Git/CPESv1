const fs = require('fs');
const code = fs.readFileSync('pack_c_corrected.js', 'utf8');

// Items to upgrade from Analyze to Evaluate
const upgrades = [
  { qid: 'P1-DC-025', reason: 'Variable vs absorption costing — which method for bonus/decision purposes?' },
  { qid: 'P1-DC-040', reason: 'Theory of Constraints — where to allocate limited improvement capital?' },
  { qid: 'P1-DC-045', reason: 'Cost of Quality — how to prioritize prevention/appraisal/failure investments?' },
  { qid: 'P1-CC-071', reason: 'Gross margin variance — which variance driver should management address first?' },
  { qid: 'P1-DC-030', reason: 'Relevant range — how should management manage capacity/fixed cost risk?' },
];

for (const u of upgrades) {
  const qidIdx = code.indexOf('"QuestionID": "' + u.qid + '"');
  if (qidIdx === -1) { console.log(u.qid + ': NOT FOUND'); continue; }
  
  // Find the CognitiveLevel and DifficultyScore lines after the QID
  const nearBlock = code.substring(qidIdx, qidIdx + 1500);
  const clMatch = nearBlock.match(/"CognitiveLevel"\s*:\s*"(\w+)"/);
  const dsMatch = nearBlock.match(/"DifficultyScore"\s*:\s*(\d+)/);
  
  if (!clMatch) { console.log(u.qid + ': CL not found'); continue; }
  if (!dsMatch) { console.log(u.qid + ': DS not found'); continue; }
  
  const currentCL = clMatch[1];
  const currentDS = parseInt(dsMatch[1]);
  
  if (currentCL === 'Analyze') {
    // Find the exact position and update
    const clPos = qidIdx + clMatch.index;
    const dsPos = qidIdx + dsMatch.index;
    
    const beforeCL = code.substring(clPos - 30, clPos + 30);
    const beforeDS = code.substring(dsPos - 20, dsPos + 10);
    
    console.log(u.qid + ': CL=' + currentCL + ' DS=' + currentDS);
    console.log('  CL context: ' + beforeCL.replace(/\n/g, '\\n'));
    console.log('  DS context: ' + beforeDS.replace(/\n/g, '\\n'));
    
    // Show the exact line content for the edit
    const clLineEnd = code.indexOf('\n', clPos);
    const clLine = code.substring(clPos - 4, clLineEnd);
    console.log('  CL line: [' + clLine + ']');
    
    const dsLineEnd = code.indexOf('\n', dsPos);
    const dsLine = code.substring(dsPos - 4, dsLineEnd);
    console.log('  DS line: [' + dsLine + ']');
  } else {
    console.log(u.qid + ': CL=' + currentCL + ' (not Analyze, skipping)');
  }
  console.log('');
}
