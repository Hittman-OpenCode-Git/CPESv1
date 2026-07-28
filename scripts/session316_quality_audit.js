// S316 Quality Audits — Wave 3 items validation
const fs = require('fs');

const batch = JSON.parse(fs.readFileSync('./reports/SESSION316_AUTHORING_BATCH_WAVE3.json', 'utf8'));
const items = batch.items;
const results = {};

// 1. Gate 0 — Duplicate Prevention
const packSrc = fs.readFileSync('./pack_e_corrected.js', 'utf8');
results.gate0 = { status: 'PASS', collisions: [] };
items.forEach(i => {
  if (packSrc.includes('"' + i.QuestionID + '"')) {
    results.gate0.collisions.push(i.QuestionID);
    results.gate0.status = 'FAIL';
  }
});

// 2. DL-008 — ExplanationWrong[CorrectChoice] must be empty
results.dl008 = { status: 'PASS', violations: [] };
items.forEach(i => {
  const cc = i.CorrectChoice;
  const ewKey = 'ExplanationWrong' + cc;
  if (i[ewKey] && i[ewKey] !== '') {
    results.dl008.violations.push({ qid: i.QuestionID, key: ewKey, value: i[ewKey].substring(0, 50) });
  }
});
if (results.dl008.violations.length > 0) results.dl008.status = 'FAIL';

// 3. DL-026 — All non-CC ExplanationWrong slots must be non-empty
results.dl026 = { status: 'PASS', violations: [] };
items.forEach(i => {
  const cc = i.CorrectChoice;
  ['A','B','C','D'].forEach(ch => {
    const ewKey = 'ExplanationWrong' + ch;
    const val = i[ewKey];
    if (ch !== cc && (!val || val.trim() === '')) {
      results.dl026.violations.push({ qid: i.QuestionID, slot: ewKey });
    }
  });
});
if (results.dl026.violations.length > 0) results.dl026.status = 'FAIL';

// 4. EW Integrity — Coverage and quality
results.ewIntegrity = { status: 'PASS', details: [] };
let totalEW = 0, totalEWChars = 0;
items.forEach(i => {
  const cc = i.CorrectChoice;
  const ewScores = { qid: i.QuestionID, cc: cc, slots: {} };
  ['A','B','C','D'].forEach(ch => {
    const ewKey = 'ExplanationWrong' + ch;
    const val = i[ewKey] || '';
    if (ch === cc) {
      ewScores.slots[ewKey] = val.length === 0 ? 'EMPTY_OK' : `NON_EMPTY_BUT_CC(${val.length})`;
    } else {
      totalEW++;
      totalEWChars += val.length;
      ewScores.slots[ewKey] = val.length >= 100 ? 'OK' : `SHORT(${val.length})`;
    }
  });
  results.ewIntegrity.details.push(ewScores);
});
results.ewIntegrity.avgChars = Math.round(totalEWChars / totalEW);
results.ewIntegrity.totalSlots = totalEW;
if (totalEW !== 30) results.ewIntegrity.status = 'FAIL';

// 5. Field completeness (exclude ExplanationWrong[CC] — must be empty per DL-008)
results.fieldCompleteness = { status: 'PASS', missing: [] };
const requiredFields = ['Part','Section','SectionName','Topic','MicroTopic','LOSTag','Difficulty','DifficultyScore',
  'CognitiveLevel','ItemType','Stem','CorrectChoice','ExplanationCorrect','Choices','QuestionID','question_state','ProductionStatus'];
items.forEach(i => {
  requiredFields.forEach(f => {
    if (i[f] === undefined || i[f] === null || i[f] === '') {
      results.fieldCompleteness.missing.push({ qid: i.QuestionID, field: f });
    }
  });
  // Check non-CC EW slots only
  ['A','B','C','D'].forEach(ch => {
    if (ch !== i.CorrectChoice) {
      const ewKey = 'ExplanationWrong' + ch;
      if (!i[ewKey] || i[ewKey].trim() === '') {
        results.fieldCompleteness.missing.push({ qid: i.QuestionID, field: ewKey });
      }
    }
  });
});
if (results.fieldCompleteness.missing.length > 0) results.fieldCompleteness.status = 'FAIL';

// 6. DL-013 — No template boilerplate
results.dl013 = { status: 'PASS', violations: [] };
const boilerplate = ['[INSERT_','[PLACEHOLDER]','[TODO]','[TEMPLATE]','Lorem ipsum'];
items.forEach(i => {
  ['Stem','ExplanationCorrect','ExplanationWrongA','ExplanationWrongB','ExplanationWrongC','ExplanationWrongD'].forEach(f => {
    const val = i[f] || '';
    boilerplate.forEach(bp => {
      if (val.toLowerCase().includes(bp.toLowerCase())) {
        results.dl013.violations.push({ qid: i.QuestionID, field: f, pattern: bp });
      }
    });
  });
});
if (results.dl013.violations.length > 0) results.dl013.status = 'FAIL';

// 7. Difficulty validation
results.difficulty = { status: 'PASS', items: [] };
items.forEach(i => {
  const score = i.DifficultyScore;
  const valid = score >= 1 && score <= 5;
  results.difficulty.items.push({ qid: i.QuestionID, difficulty: i.Difficulty, score, valid });
  if (!valid) results.difficulty.status = 'FAIL';
});

// 8. CognitiveLevel validation
results.cognitiveLevel = { status: 'PASS', items: [] };
const validLevels = ['Remember','Understand','Apply','Analyze','Evaluate'];
items.forEach(i => {
  const level = i.CognitiveLevel;
  const valid = validLevels.includes(level);
  results.cognitiveLevel.items.push({ qid: i.QuestionID, level, valid });
  if (!valid) results.cognitiveLevel.status = 'FAIL';
});

// 9. ExplanationCorrect length check
results.ecLength = { status: 'PASS', items: [] };
items.forEach(i => {
  const len = (i.ExplanationCorrect || '').length;
  const ok = len >= 400;
  results.ecLength.items.push({ qid: i.QuestionID, chars: len, ok });
  if (!ok) results.ecLength.status = 'FAIL';
});

// 10. Choices validation
results.choices = { status: 'PASS', items: [] };
items.forEach(i => {
  const choices = i.Choices;
  const missing = [];
  ['A','B','C','D'].forEach(ch => {
    if (!choices || !choices[ch]) missing.push(ch);
  });
  const ccValid = choices && choices[i.CorrectChoice];
  results.choices.items.push({ qid: i.QuestionID, allPresent: missing.length === 0, ccValid: !!ccValid, missing });
  if (missing.length > 0 || !ccValid) results.choices.status = 'FAIL';
});

// 11. QID format check
results.qidFormat = { status: 'PASS', invalid: [] };
const qidPattern = /^P1-E-R\d{2}$/;
items.forEach(i => {
  if (!qidPattern.test(i.QuestionID)) {
    results.qidFormat.invalid.push(i.QuestionID);
  }
});
if (results.qidFormat.invalid.length > 0) results.qidFormat.status = 'FAIL';

// Print results
console.log('=== S316 WAVE 3 QUALITY AUDITS ===\n');
const checks = ['gate0','dl008','dl026','ewIntegrity','fieldCompleteness','dl013','difficulty','cognitiveLevel','ecLength','choices','qidFormat'];
let allPass = true;
checks.forEach(c => {
  const r = results[c];
  const icon = r.status === 'PASS' ? '✓' : '✗';
  console.log(`${icon} ${c}: ${r.status}`);
  if (r.status !== 'PASS') { allPass = false; console.log('  ', JSON.stringify(r, null, 2).substring(0, 200)); }
});

console.log('\nEW Integrity: avg', results.ewIntegrity.avgChars, 'chars per distractor slot');
console.log('\nAll checks PASS:', allPass);

// Write results
results.summary = { allPass, checks: checks.map(c => ({ check: c, status: results[c].status })) };
fs.writeFileSync('./reports/SESSION316_WAVE3_QUALITY_AUDIT.json', JSON.stringify(results, null, 2), 'utf8');
console.log('\nResults written to reports/SESSION316_WAVE3_QUALITY_AUDIT.json');
