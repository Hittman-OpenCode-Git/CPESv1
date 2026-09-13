const fs = require('fs');
function load(f) {
  const src = fs.readFileSync(f, 'utf8');
  const s = src.indexOf('[');
  let d = 0, e = -1;
  for (let i = s; i < src.length; i++) {
    if (src[i] === '[') d++;
    else if (src[i] === ']') { d--; if (d === 0) { e = i; break; } }
  }
  return (new Function('return ' + src.substring(s, e + 1)))();
}
const files = ['content/cases/case_pack_1_corrected.js','content/cases/case_pack_2_corrected.js','content/cases/case_pack_3_corrected.js'];
const itemDiff = {}; const cog = {}; let n = 0, score5 = 0;
const caseIds = {};
for (const f of files) {
  const arr = load(f);
  for (const c of arr) {
    caseIds[c.CaseID] = caseIds[c.CaseID] || [];
    caseIds[c.CaseID].push(f + ' items=' + (c.Items || []).length);
    for (const it of (c.Items || [])) {
      n++;
      const dk = (it.Difficulty || '?') + '/' + (it.DifficultyScore === undefined ? '?' : it.DifficultyScore);
      itemDiff[dk] = (itemDiff[dk] || 0) + 1;
      const k = (it.CognitiveLevel || '?');
      cog[k] = (cog[k] || 0) + 1;
      if (it.DifficultyScore === 5) score5++;
    }
  }
}
console.log('case_pack items=' + n + ' cog=' + JSON.stringify(cog) + ' score5=' + score5);
console.log('item-level diff=' + JSON.stringify(itemDiff));
// duplicate CaseID detail: compare item counts
for (const k of Object.keys(caseIds)) {
  if (caseIds[k].length > 1) console.log('DUP ' + k + ' -> ' + caseIds[k].join(' | '));
}
// new CaseIDs vs legacy CBQ set
const legFiles = ['content/cases/legacy/scored_cases.js','content/cases/legacy/scored_cases2.js','content/cases/legacy/scored_cases3.js','content/cases/legacy/scored_cases4.js','content/cases/legacy/scored_cases5.js'];
const legSet = new Set();
for (const f of legFiles) { for (const c of load(f)) legSet.add(c.CaseID); }
const newIds = Object.keys(caseIds).filter(x => !legSet.has(x));
console.log('case_pack unique=' + Object.keys(caseIds).length + ' new-vs-legacy=' + JSON.stringify(newIds));