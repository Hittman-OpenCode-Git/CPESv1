const fs = require('fs');
const src = fs.readFileSync('content/packs/pack_a_corrected.js', 'utf8');
const arr = new Function(src + '\nreturn MCQ_BANK_A;')();
const strong = /\b(always|never|impossible|exactly|must)\b/i;
for (const it of arr) {
  if (!/^P1-C-1([0-2][0-9]|30)$/.test(it.QuestionID)) continue;
  for (const [k, t] of Object.entries(it)) {
    if (/Explanation/.test(k) && typeof t === 'string') {
      const m = t.match(strong);
      if (m) console.log(`${it.QuestionID} ${k}: "...${t.slice(Math.max(0, m.index - 50), m.index + 50)}..." [${m[0]}]`);
    }
  }
}
console.log('scan done');