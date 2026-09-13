const fs = require('fs');
const src = fs.readFileSync('content/packs/pack_c_corrected.js', 'utf8');
const arr = new Function(src + '\nreturn MCQ_BANK_C;')();
const slots = [['P1-DC-102','B'],['P1-DC-102','D'],['P1-DC-104','B'],['P1-DC-106','C'],['P1-DC-106','D'],['P1-DC-112','A'],['P1-DC-113','B'],['P1-DC-114','B'],['P1-DC-117','A'],['P1-DC-118','B'],['P1-DC-119','B'],['P1-DC-119','C'],['P1-DC-119','D'],['P1-DC-120','D'],['P1-DC-121','D'],['P1-DC-125','B'],['P1-DC-130','A']];
for (const [qid, slot] of slots) {
  const it = arr.find((o) => o.QuestionID === qid);
  console.log('===== ' + qid + ' slot ' + slot + ' (CC=' + it.CorrectChoice + ') =====');
  console.log('CHOICE: ' + it.Choices[slot]);
  console.log('EW_' + slot + ': ' + (it['ExplanationWrong' + slot] || '').slice(0, 200));
}
