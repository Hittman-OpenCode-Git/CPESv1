const fs = require('fs');
const src = fs.readFileSync('content/packs/pack_b_corrected.js', 'utf8');
const arr = new Function(src + '\nreturn MCQ_BANK_B;')();
const ids = ['P1B-C-211','P1B-C-212','P1B-C-213','P1B-C-214','P1B-C-215','P1B-C-216','P1B-C-217','P1B-C-218','P1B-C-219','P1B-C-220',
'P1B-C-221','P1B-C-222','P1B-C-223','P1B-C-224','P1B-C-224','P1B-C-225','P1B-C-226','P1B-C-227','P1B-C-228','P1B-C-229','P1B-C-230',
'P1B-C-231','P1B-C-232','P1B-C-233','P1B-C-234','P1B-C-235','P1B-C-236','P1B-C-237','P1B-C-238','P1B-C-239','P1B-C-240'];
const keys = {A:0,B:0,C:0,D:0};
const ds = {4:0,5:0};
const cl = {Analyze:0,Evaluate:0};
for (const qid of ids) {
  const it = arr.find(x => x.QuestionID === qid);
  if (!it) { console.log('MISSING:', qid); continue; }
  keys[it.CorrectChoice]++;
  ds[it.DifficultyScore]++;
  cl[it.CognitiveLevel]++;
  console.log(qid + ': CC=' + it.CorrectChoice + ' DS=' + it.DifficultyScore + ' CL=' + it.CognitiveLevel + ' Key=' + it.UniqueConceptKey);
}
console.log('Keys:', JSON.stringify(keys));
console.log('DS:', JSON.stringify(ds));
console.log('CL:', JSON.stringify(cl));