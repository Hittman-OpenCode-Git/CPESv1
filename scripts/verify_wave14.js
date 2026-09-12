const A = require('./tier3_wave14a.js');
const B = require('./tier3_wave14b.js');
const C = require('./tier3_wave14c.js');
const items = [...A, ...B, ...C];
console.log('count:', items.length);
const qids = items.map(i => i.QuestionID).sort();
const expected = [];
for (let n = 101; n <= 130; n++) expected.push('P1-C-' + n);
const missing = expected.filter(e => !qids.includes(e));
const extra = qids.filter(q => !expected.includes(q));
console.log('missing:', missing.length ? missing.join(',') : 'none');
console.log('extra:', extra.length ? extra.join(',') : 'none');
let fails = 0;
for (const it of items) {
  const errs = [];
  if (it.Part !== 1) errs.push('Part');
  if (it.Section !== 'C') errs.push('Section');
  if (it.Part1OnlyFlag !== true) errs.push('Part1OnlyFlag');
  if (!['A','B','C','D'].includes(it.CorrectChoice)) errs.push('CC');
  if (it.question_state !== 'Unprocessed') errs.push('state');
  const ewCC = it['ExplanationWrong' + it.CorrectChoice];
  if (ewCC !== '') errs.push('DL008:' + JSON.stringify(ewCC).slice(0,60));
  for (const L of ['A','B','C','D']) {
    if (L === it.CorrectChoice) continue;
    const v = it['ExplanationWrong' + L];
    if (typeof v !== 'string' || v.trim().length < 50) errs.push('DL026:' + L);
  }
  for (const L of ['A','B','C','D']) {
    const c = (it.Choices[L] || '').trim();
    if (c.length < 8) errs.push('R18:' + L);
  }
  if (![4,5].includes(it.DifficultyScore)) errs.push('DS');
  if (!['Analyze','Evaluate'].includes(it.CognitiveLevel)) errs.push('CL');
  if (/REPAIR|WITHDRAWN/i.test(JSON.stringify(it))) errs.push('REPAIR-TAG-UNCLEANED');
  if (!/^C-1(0[1-9]|[12][0-9]|30)-/.test(it.UniqueConceptKey || '')) errs.push('KEYFMT');
  if (!/^C\.1(0[1-9]|[12][0-9]|30) /.test(it.Topic || '')) errs.push('TOPICFMT');
  if (errs.length) { fails++; console.log('FAIL', it.QuestionID, errs.join(' | ')); }
}
console.log(fails === 0 ? 'ALL PASS' : `FAILURES: ${fails}`);
const keys = { A:0,B:0,C:0,D:0 };
items.forEach(i => keys[i.CorrectChoice]++);
console.log('key dist:', JSON.stringify(keys));
const ds = { 4:0, 5:0 };
items.forEach(i => ds[i.DifficultyScore]++);
console.log('DS dist:', JSON.stringify(ds));
const cl = {};
items.forEach(i => cl[i.CognitiveLevel] = (cl[i.CognitiveLevel]||0)+1);
console.log('CL dist:', JSON.stringify(cl));