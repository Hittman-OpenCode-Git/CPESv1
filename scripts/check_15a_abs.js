const A = require('./tier3_wave15a.js');
const strong = /\b(always|never|impossible|exactly|must|alguien)\b/i;
for (const it of A) {
  for (const L of ['A', 'B', 'C', 'D']) {
    const t = it.Choices[L] || '';
    const m = t.match(strong);
    if (m) console.log(`${it.QuestionID} Choice ${L}: "...${t.slice(Math.max(0, m.index - 40), m.index + 50)}..." [${m[0]}]`);
  }
}
console.log('count:', A.length, 'done');