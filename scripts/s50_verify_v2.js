// Direct array verification — uses Function constructor parse
const fs = require('fs');

const targetQIDs = [
  'P1-EC-003','P1-EC-009','P1-EC-035','P1-EC-038','P1-EC-069',
  'P1-FC-012','P1-FC-029','P1-FC-034','P1-FC-055','P1-FC-067',
  'P1-ED-005','P1-ED-009','P1-ED-023','P1-ED-033','P1-ED-069',
  'P1-FD-005','P1-FD-015','P1-FD-018','P1-FD-025','P1-FD-055'
];

function parsePack(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  const idx = content.indexOf('[\n');
  let lastIdx = content.lastIndexOf(']\n');
  if (lastIdx === -1) lastIdx = content.lastIndexOf(']');
  const arrStr = content.slice(idx, lastIdx + 1);
  return new Function('return ' + arrStr)();
}

const packC = parsePack('pack_c_corrected.js');
const packD = parsePack('pack_d_corrected.js');
const allItems = [...packC, ...packD];

console.log(`Parsed: Pack C ${packC.length} items, Pack D ${packD.length} items`);

const letters = ['A', 'B', 'C', 'D'];
let dl008 = 0, dl026 = 0, stateIssues = 0, diffIssues = 0, cogIssues = 0;
let ccDist = {A: 0, B: 0, C: 0, D: 0};

for (const qid of targetQIDs) {
  const item = allItems.find(i => i.QuestionID === qid);
  if (!item) { console.log(`MISSING: ${qid}`); continue; }
  
  let issues = [];
  const cc = item.CorrectChoice;
  ccDist[cc] = (ccDist[cc] || 0) + 1;
  
  // DL-008
  for (const L of letters) {
    const v = item['ExplanationWrong' + L];
    if (L === cc && v !== '') { dl008++; issues.push(`DL-008: EW[${L}]=${JSON.stringify(v).substring(0,30)}`); }
    if (L !== cc && (!v || v.length < 10)) { dl026++; issues.push(`DL-026: EW[${L}] empty/short`); }
  }
  
  if (item.question_state !== 'Certified') { stateIssues++; issues.push(`State: ${item.question_state}`); }
  if (![4, 5].includes(item.DifficultyScore)) { diffIssues++; issues.push(`DiffScore: ${item.DifficultyScore}`); }
  if (!['Analyze', 'Evaluate'].includes(item.CognitiveLevel)) { cogIssues++; issues.push(`CogLevel: ${item.CognitiveLevel}`); }
  
  if (issues.length === 0) {
    const ewNonCC = letters.filter(L => L !== cc).map(L => item['ExplanationWrong' + L].length);
    console.log(`PASS: ${qid} CC=${cc} Diff=${item.Difficulty}(${item.DifficultyScore}) Cog=${item.CognitiveLevel} EW_lens=${ewNonCC.join(',')}`);
  } else {
    console.log(`FAIL: ${qid} — ${issues.join(' | ')}`);
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`DL-008: ${dl008} (must be 0)`);
console.log(`DL-026: ${dl026} (must be 0)`);
console.log(`State: ${stateIssues} (must be 0)`);
console.log(`Difficulty: ${diffIssues} (must be 0)`);
console.log(`Cognitive: ${cogIssues} (must be 0)`);
console.log(`CC distribution: A=${ccDist.A} B=${ccDist.B} C=${ccDist.C} D=${ccDist.D}`);
console.log(`\nVERDICT: ${(dl008+dl026+stateIssues+diffIssues+cogIssues) === 0 ? 'ALL 20 PASS' : 'ISSUES FOUND'}`);
