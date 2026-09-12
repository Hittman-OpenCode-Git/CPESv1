const A = require('./tier3_wave15a.js');
const B = require('./tier3_wave15b.js');
const C = require('./tier3_wave15c.js');
const items = [...A, ...B, ...C];
console.log('count:', items.length);
const qids = items.map(i => i.QuestionID).sort();
const expected = [];
for (let n = 211; n <= 240; n++) expected.push('P1B-C-' + n);
const missing = expected.filter(e => !qids.includes(e));
const extra = qids.filter(q => !expected.includes(q));
console.log('missing:', missing.length ? missing.join(',') : 'none');
console.log('extra:', extra.length ? extra.join(',') : 'none');
const seen = new Set();
let fails = 0;
for (const it of items) {
  const errs = [];
  if (seen.has(it.QuestionID)) errs.push('DUP-QID');
  seen.add(it.QuestionID);
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
  if ((it.DifficultyScore === 4 && it.CognitiveLevel !== 'Analyze') ||
      (it.DifficultyScore === 5 && it.CognitiveLevel !== 'Evaluate')) errs.push('DS-CL-MISMATCH');
  if (/REPAIR|WITHDRAWN|P1B-C-220-DUP|alguien/i.test(JSON.stringify(it))) errs.push('DRAFT-ARTIFACT');
  if (!/^B-C-2(1[1-9]|[23][0-9]|40)-/.test(it.UniqueConceptKey || '')) errs.push('KEYFMT');
  if (!/^B-C\.2(1[1-9]|[23][0-9]|40) /.test(it.Topic || '')) errs.push('TOPICFMT');
  const strong = /\b(always|never|impossible|exactly|must)\b/i;
  for (const L of ['A','B','C','D']) {
    const m = (it.Choices[L] || '').match(strong);
    if (m) errs.push('STRONG:' + L + ':' + m[0]);
  }
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