const fs = require('fs');
const c = fs.readFileSync('content/packs/pack_b_corrected.js', 'utf8');
// Strip BOM and variable declaration
const cleaned = c.replace(/^\uFEFF/, '').replace(/^\s*const\s+\w+\s*=/, '');
const questions = new Function('return ' + cleaned)();
let cc = {A:0,B:0,C:0,D:0}, f = [];
for (const q of questions) {
  if (q.QuestionID && q.QuestionID.startsWith('P1B-C-')) {
    const num = parseInt(q.QuestionID.split('-')[2]);
    if (num >= 211 && num <= 240) {
      cc[q.CorrectChoice]++;
      f.push(q.CorrectChoice);
    }
  }
}
console.log('Counts:', cc);
console.log('Total:', Object.values(cc).reduce((a,b)=>a+b,0));
console.log('Seq:', f.join(''));