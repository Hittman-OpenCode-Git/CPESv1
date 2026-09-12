const fs = require('fs');
const src = fs.readFileSync('content/packs/pack_b_corrected.js', 'utf8');
const arr = new Function(src + '\nreturn MCQ_BANK_B;')();

const wave15 = arr.filter(it => it.QuestionID && it.QuestionID.startsWith('P1B-C-') && parseInt(it.QuestionID.slice(6)) >= 211 && parseInt(it.QuestionID.slice(6)) <= 240);
console.log(`Total Wave 15 items: ${wave15.length}`);

let issues = 0;
for (const it of wave15) {
  const qid = it.QuestionID;
  const errs = [];

  // 1. Basic structure
  if (!it.question_state) errs.push('MISSING question_state');
  else if (it.question_state !== 'Certified') errs.push(`state=${it.question_state}`);
  if (!it.certification_date) errs.push('MISSING certification_date');
  if (!it.certification_batch) errs.push('MISSING certification_batch');
  if (it.Part !== 1) errs.push('Part!=1');
  if (it.Section !== 'C') errs.push('Section!=C');
  if (it.Part1OnlyFlag !== true) errs.push('Part1OnlyFlag!=true');
  if (!['A','B','C','D'].includes(it.CorrectChoice)) errs.push('Invalid CC');

  // 2. DL-008: EW[CC] empty
  const ewCC = it['ExplanationWrong' + it.CorrectChoice];
  if (ewCC !== '') errs.push(`DL008: EW_${it.CorrectChoice}="${ewCC.slice(0,60)}"`);

  // 3. DL-026: all non-CC EW present and >=50 chars
  for (const L of ['A','B','C','D']) {
    if (L === it.CorrectChoice) continue;
    const v = it['ExplanationWrong' + L];
    if (typeof v !== 'string' || v.trim().length < 50) errs.push(`DL026:${L} len=${v?.trim().length || 'missing'}`);
  }

  // 4. R18: choices >=8 chars, alphanumeric start after exempt ($€£¥%(- )
  for (const L of ['A','B','C','D']) {
    const c = (it.Choices[L] || '').trim();
    if (c.length < 8) errs.push(`R18:${L} len=${c.length}`);
    // check start after exempt run
    const m = c.match(/^([$€£¥%\(-]*)/);
    const exemptLen = m ? m[1].length : 0;
    if (c.length > exemptLen && !/^[A-Za-z0-9]/.test(c[exemptLen])) {
      errs.push(`R18:${L} non-alnum start after exempt: "${c.slice(exemptLen, exemptLen+5)}"`);
    }
  }

  // 5. R9: Yes/No lead-in polarity
  const cc = it.CorrectChoice;
  const ccText = it.Choices[cc] || '';
  if (/^No,.*\b(should be|must be|is correct|is right|should investigate|should accept)\b/i.test(ccText)) {
    errs.push(`R9: CC="${cc}" has "No," with affirmative conclusion`);
  }
  if (/^Yes,.*\b(should not|shouldn't|cannot|must not|is wrong|is incorrect)\b/i.test(ccText)) {
    errs.push(`R9: CC="${cc}" has "Yes," with negative conclusion`);
  }

  // 6. Strong absolutes in choices
  const strong = /\b(always|never|impossible|exactly|must)\b/i;
  for (const L of ['A','B','C','D']) {
    const m = (it.Choices[L] || '').match(strong);
    if (m) errs.push(`STRONG:${L}:${m[0]}`);
  }

  // 7. Key format
  if (!/^B-C-2(1[1-9]|[23][0-9]|40)-/.test(it.UniqueConceptKey || '')) errs.push('KEYFMT');
  if (!/^B-C\.2(1[1-9]|[23][0-9]|40) /.test(it.Topic || '')) errs.push('TOPICFMT');

  // 8. DS/CL pairing
  if (![4,5].includes(it.DifficultyScore)) errs.push('DS');
  if (!['Analyze','Evaluate'].includes(it.CognitiveLevel)) errs.push('CL');
  if (it.DifficultyScore === 4 && it.CognitiveLevel !== 'Analyze') errs.push('DS4!=Analyze');
  if (it.DifficultyScore === 5 && it.CognitiveLevel !== 'Evaluate') errs.push('DS5!=Evaluate');

  // 9. ExplanationCorrect present and substantial
  if (!it.ExplanationCorrect || it.ExplanationCorrect.length < 200) errs.push('EC short/missing');

  // 10. StudyLinks present
  if (!it.StudyLinks || !Array.isArray(it.StudyLinks) || it.StudyLinks.length === 0) errs.push('StudyLinks missing');

  // 11. ExplanationWrong[CC] present (empty string is ok for DL-008, but field must exist)
  if (typeof it['ExplanationWrong' + cc] === 'undefined') errs.push(`EW_${cc} missing field`);

  // 12. Key distribution check - handled at aggregate level

  if (errs.length) {
    issues++;
    console.log(`\n${qid} [${errs.length} issues]:`);
    errs.forEach(e => console.log(`  - ${e}`));
  }
}

console.log(`\n=== SUMMARY ===`);
console.log(`Items with issues: ${issues} / ${wave15.length}`);
console.log(`Clean items: ${wave15.length - issues}`);