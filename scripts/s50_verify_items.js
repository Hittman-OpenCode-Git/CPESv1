const fs = require('fs');

const targetQIDs = [
  'P1-EC-003','P1-EC-009','P1-EC-035','P1-EC-038','P1-EC-069',
  'P1-FC-012','P1-FC-029','P1-FC-034','P1-FC-055','P1-FC-067',
  'P1-ED-005','P1-ED-009','P1-ED-023','P1-ED-033','P1-ED-069',
  'P1-FD-005','P1-FD-015','P1-FD-018','P1-FD-025','P1-FD-055'
];

function findItemObject(content, qid) {
  const searchStr = `"QuestionID": "${qid}"`;
  const idx = content.indexOf(searchStr);
  if (idx === -1) return null;
  
  let start = idx;
  while (start > 0 && content[start] !== '{') start--;
  
  let end = start + 1;
  let depth = 1, inStr = false, strChar = '', esc = false;
  while (end < content.length && depth > 0) {
    const ch = content[end];
    if (esc) { esc = false; }
    else if (ch === '\\') { esc = true; }
    else if (inStr) { if (ch === strChar) inStr = false; }
    else if (ch === '"') { inStr = true; strChar = '"'; }
    else if (ch === '{') depth++;
    else if (ch === '}') depth--;
    end++;
  }
  
  try {
    return JSON.parse(content.substring(start, end));
  } catch(e) {
    return null;
  }
}

function checkItem(item, qid, letters) {
  const issues = [];
  if (!item) { issues.push('NOT FOUND'); return issues; }
  
  const cc = item.CorrectChoice;
  
  for (const L of letters) {
    const key = 'ExplanationWrong' + L;
    const val = item[key];
    if (L === cc) {
      if (val !== '') { issues.push(`DL-008: EW[${L}] non-empty`); }
    } else {
      if (val === undefined || val === '') { issues.push(`DL-026: EW[${L}] MISSING or EMPTY`); }
      else if (val.length < 50) { issues.push(`DL-026: EW[${L}] TOO SHORT (${val.length} chars)`); }
    }
  }
  
  if (item.question_state !== 'Certified') {
    issues.push(`STATE: "${item.question_state}" (not Certified)`);
  }
  
  if (item.DifficultyScore !== 4 && item.DifficultyScore !== 5) {
    issues.push(`DifficultyScore: ${item.DifficultyScore}`);
  }
  
  if (!['Analyze', 'Evaluate'].includes(item.CognitiveLevel)) {
    issues.push(`CognitiveLevel: ${item.CognitiveLevel}`);
  }
  
  return issues;
}

const letters = ['A', 'B', 'C', 'D'];
const packs = {
  pack_c: fs.readFileSync('pack_c_corrected.js', 'utf8'),
  pack_d: fs.readFileSync('pack_d_corrected.js', 'utf8')
};

let totalIssues = 0;
let checkedCount = 0;
const allIssues = [];

for (const qid of targetQIDs) {
  const pack = qid.includes('-EC-') || qid.includes('-FC-') ? 'pack_c' : 'pack_d';
  const item = findItemObject(packs[pack], qid);
  const issues = checkItem(item, qid, letters);
  checkedCount++;
  
  if (issues.length > 0) {
    totalIssues += issues.length;
    allIssues.push({ qid: qid, issues: issues.join(', ') });
    console.log(`FAIL: ${qid} — ${issues.join('; ')}`);
  } else {
    console.log(`PASS: ${qid}`);
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Checked: ${checkedCount}/${targetQIDs.length}`);
console.log(`Issues: ${totalIssues}`);
if (totalIssues === 0) {
  console.log('VERDICT: ALL 20 ITEMS CLEAN');
} else {
  console.log('VERDICT: ISSUES FOUND');
}
