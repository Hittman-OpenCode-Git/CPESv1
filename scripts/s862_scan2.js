const fs = require('fs');
const code = fs.readFileSync('pack_c_corrected.js', 'utf8');

const upgrades = [
  { qid: 'P1-DC-025', reason: 'Variable vs absorption costing' },
  { qid: 'P1-DC-040', reason: 'Theory of Constraints' },
  { qid: 'P1-DC-045', reason: 'Cost of Quality' },
  { qid: 'P1-CC-071', reason: 'Gross margin variance' },
  { qid: 'P1-DC-030', reason: 'Relevant range' },
];

for (const u of upgrades) {
  const qidIdx = code.indexOf('"QuestionID": "' + u.qid + '"');
  if (qidIdx === -1) { console.log(u.qid + ': NOT FOUND'); continue; }
  
  // CognitiveLevel appears BEFORE QuestionID — search backward from QID
  const priorBlock = code.substring(Math.max(0, qidIdx - 2000), qidIdx);
  const clMatch = priorBlock.match(/"CognitiveLevel"\s*:\s*"(\w+)"/g);
  const dsMatch = priorBlock.match(/"DifficultyScore"\s*:\s*(\d+)/g);
  
  // Get the LAST match (closest to QID)
  const cl = clMatch ? clMatch[clMatch.length - 1].match(/"(\w+)"/)[1] : 'NOT FOUND';
  const ds = dsMatch ? dsMatch[dsMatch.length - 1].match(/(\d+)/)[1] : '?';
  
  console.log(u.qid + ': CL=' + cl + ' DS=' + ds + ' | ' + u.reason);
}
