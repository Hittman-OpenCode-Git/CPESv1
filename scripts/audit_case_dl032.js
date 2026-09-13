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
const files = ['content/cases/legacy/scored_cases.js','content/cases/legacy/scored_cases2.js','content/cases/legacy/scored_cases3.js','content/cases/legacy/scored_cases4.js','content/cases/legacy/scored_cases5.js'];
const cog = {}; let n = 0, score5 = 0;
const caseDiff = {};
const itemDiff = {};
for (const f of files) {
  const arr = load(f);
  for (const c of arr) {
    const ck = (c.Difficulty || '?') + '/' + (c.DifficultyScore === undefined ? '?' : c.DifficultyScore);
    caseDiff[ck] = (caseDiff[ck] || 0) + 1;
    for (const it of (c.Items || [])) {
      n++;
      const k = (it.CognitiveLevel || '?');
      cog[k] = (cog[k] || 0) + 1;
      const dk = (it.Difficulty || '?') + '/' + (it.DifficultyScore === undefined ? '?' : it.DifficultyScore);
      itemDiff[dk] = (itemDiff[dk] || 0) + 1;
      if (it.DifficultyScore === 5) score5++;
    }
  }
}
console.log('legacy items=' + n + ' cog=' + JSON.stringify(cog) + ' score5=' + score5);
console.log('item-level diff=' + JSON.stringify(itemDiff));
console.log('case-level diff=' + JSON.stringify(caseDiff));