// Verify Tier 3 Wave 6 staged items before pack_d insertion.
const fs = require('fs');
const files = ['tier3_wave6a.js', 'tier3_wave6b.js', 'tier3_wave6c2.js'];
let items = [];
for (const f of files) {
  const arr = require('./' + f);
  const live = arr.filter(o => !(o.certification_batch || '').includes('WITHDRAWN'));
  const skipped = arr.length - live.length;
  if (skipped) console.log(f + ': skipped ' + skipped + ' WITHDRAWN object(s)');
  items = items.concat(live.map(o => ({ file: f, o })));
}
console.log('staged items: ' + items.length);
const packSrc = fs.readFileSync('content/packs/pack_d_corrected.js', 'utf8');
const CC = { A: 0, B: 0, C: 0, D: 0 };
const seen = new Set();
let fails = 0;
const fail = (qid, msg) => { fails++; console.log('FAIL ' + qid + ': ' + msg); };
const badPhrases = ['represents a plausible misconception', 'misapplying a related but distinct concept', 'may misunderstand how the governing standard applies', 'I think', 'probably', 'maybe', 'could be', 'might be', 'WITHDRAWN', 'REPAIR:'];
for (const { file, o } of items) {
  const q = o.QuestionID;
  if (seen.has(q)) fail(q, 'duplicate QID in wave (' + file + ')');
  seen.add(q);
  if (packSrc.includes('"QuestionID": "' + q + '"')) fail(q, 'QID already in pack_d');
  if (!['A', 'B', 'C', 'D'].includes(o.CorrectChoice)) fail(q, 'bad CorrectChoice');
  CC[o.CorrectChoice]++;
  for (const L of ['A', 'B', 'C', 'D']) {
    const v = o['ExplanationWrong' + L];
    if (v === undefined) fail(q, 'EW' + L + ' ABSENT (DL-021)');
    else if (L === o.CorrectChoice) { if (v !== '') fail(q, 'EW[CC] non-empty (DL-008)'); }
    else {
      if (v === '') fail(q, 'EW' + L + ' empty (DL-026)');
      if (v.length < 50) fail(q, 'EW' + L + ' len=' + v.length + ' <50');
    }
  }
  if (!o.ExplanationCorrect || o.ExplanationCorrect.length < 200) fail(q, 'EC len=' + (o.ExplanationCorrect || '').length);
  if (o.Part1OnlyFlag !== true) fail(q, 'Part1OnlyFlag');
  if (o.question_state !== 'Unprocessed') fail(q, 'state=' + o.question_state);
  if (o.Part !== 1 || o.Section !== 'D') fail(q, 'Part/Section');
  for (const L of ['A', 'B', 'C', 'D']) {
    const ch = (o.Choices || {})[L] || '';
    if (/^(Yes|No),/.test(ch)) {
      const neg = /should not|shouldn't|cannot|must not|not |never/i.test(ch);
      const aff = /should be|should recognize|should investigate|meets|satisfies/i.test(ch);
      if ((ch.startsWith('No,') && aff && !neg) || (ch.startsWith('Yes,') && neg)) fail(q, 'DL-037 polarity in choice ' + L);
    }
    if (ch.trim().length < 3) fail(q, 'choice ' + L + ' too short');
  }
  const allText = o.ExplanationCorrect + o.ExplanationWrongA + o.ExplanationWrongB + o.ExplanationWrongC + o.ExplanationWrongD + o.Stem + (o.certification_batch || '');
  for (const bp of badPhrases) if (allText.includes(bp)) fail(q, 'banned phrase: ' + bp);
  if (o.CognitiveLevel === 'Evaluate' && o.DifficultyScore < 4) fail(q, 'Eval DS<4');
  if (o.CognitiveLevel === 'Analyze' && o.DifficultyScore < 3) fail(q, 'Analyze DS<3');
  if (!/^P1-DD-(0[789][0-9]|10[0-5])$/.test(q)) fail(q, 'QID out of wave range');
  if (!/^D-D(0(7[6-9]|[89][0-9])|10[0-5])-/.test(o.UniqueConceptKey || '')) fail(q, 'key format');
}
console.log('CC distribution: ' + JSON.stringify(CC));
const cog = {};
for (const { o } of items) cog[o.CognitiveLevel + '/' + o.DifficultyScore] = (cog[o.CognitiveLevel + '/' + o.DifficultyScore] || 0) + 1;
console.log('cog/DS: ' + JSON.stringify(cog));
console.log(fails === 0 ? 'ALL CHECKS PASS' : fails + ' FAILURES');
process.exit(fails === 0 ? 0 : 1);