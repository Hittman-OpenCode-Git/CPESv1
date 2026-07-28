const fs = require('fs');
const code = fs.readFileSync('pack_c_corrected.js','utf8');
const fn = new Function(code + '\nreturn MCQ_BANK_C;');
const arr = fn();

const qids = ['P1-CC-011', 'P1-CC-012', 'P1-CC-030', 'P1-EC-075'];

for (const qid of qids) {
  const objs = arr.filter(o => o.QuestionID === qid);
  console.log('\n=== ' + qid + ' (' + objs.length + ' objects) ===');
  objs.forEach((o,i) => {
    console.log('Object ' + i + ':');
    console.log('  CorrectChoice: ' + o.CorrectChoice);
    console.log('  question_state: ' + o.question_state);
    for (const k of Object.keys(o)) {
      if (k.startsWith('ExplanationWrong')) {
        console.log('  ' + k + ': "' + (o[k] || '').substring(0, 80) + '"');
      }
    }
  });
}
