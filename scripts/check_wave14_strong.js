const fs = require('fs');
const src = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');
const varName = 'MCQ_BANK_A';
const arr = new Function(src + '\nreturn ' + varName + ';')();
const strong = /\b(always|never|impossible|exactly|must)\b/i;
for (const it of arr) {
  if (!/^P1-C-1([0-2][0-9]|30)$/.test(it.QuestionID)) continue;
  for (const L of ['A', 'B', 'C', 'D']) {
    const t = it.Choices[L] || '';
    const m = t.match(strong);
    if (m) console.log(`${it.QuestionID} Choice ${L}: "...${t.slice(Math.max(0, m.index - 40), m.index + 40)}..." [${m[0]}]`);
  }
}
console.log('scan done');