// validate_s892_items.js — DL-008, DL-026, Rule 9, field presence check for S892 replacement items
const data = require('./output/S892_replacement_items_E.json');

let pass = 0, fail = 0;

data.forEach((item, i) => {
  const cc = item.CorrectChoice;
  const label = item.QuestionID + ' (idx ' + (i+1) + ')';
  
  // DL-008: EW[CC] must be ""
  const ewCC = item['ExplanationWrong' + cc];
  if (ewCC !== '') {
    console.log('FAIL DL-008:', label, 'EW_' + cc + ' = "' + ewCC.substring(0, 60) + '" (len=' + (ewCC ? ewCC.length : 'undef') + ')');
    fail++;
  } else {
    console.log('PASS DL-008:', label);
    pass++;
  }
  
  // DL-026: all non-CC EW fields must be non-empty
  ['A','B','C','D'].forEach(l => {
    if (l === cc) return;
    const val = item['ExplanationWrong' + l];
    if (!val || val.length === 0) {
      console.log('FAIL DL-026:', label, 'EW_' + l + ' is ' + (val === '' ? 'empty' : 'absent'));
      fail++;
    } else if (val.length < 150) {
      console.log('WARN DL-026:', label, 'EW_' + l + ' is only ' + val.length + ' chars (target 150+)');
    } else {
      pass++;
    }
  });
  
  // Rule 9: No "No, ... should" or "Yes, ... should not" polarity mismatches
  ['A','B','C','D'].forEach(l => {
    const choice = item.Choices[l];
    if (/^No,.*\b(should |must |shall )/i.test(choice) && !/\b(should not|shouldn't|cannot|must not)\b/i.test(choice)) {
      console.log('FAIL Rule 9:', label, 'Choice ' + l + ' has No/Yes polarity mismatch');
      fail++;
    }
    if (/^Yes,.*\b(should not|shouldn't|cannot|must not)\b/i.test(choice)) {
      console.log('FAIL Rule 9:', label, 'Choice ' + l + ' has Yes + negative conclusion');
      fail++;
    }
  });
  
  // COSO reference in ExplanationCorrect
  if (!/COSO/.test(item.ExplanationCorrect)) {
    console.log('WARN:', label, 'ExplanationCorrect missing COSO reference');
  }
  
  // Required fields
  const required = ['Part','Section','SectionName','Topic','MicroTopic','UniqueConceptKey','LOSTag','Difficulty','DifficultyScore','ItemType','ItemStyle','Stem','Choices','CorrectChoice','ExplanationCorrect','QuestionID','question_state','ExplanationWrongA','ExplanationWrongB','ExplanationWrongC','ExplanationWrongD','CognitiveLevel','certification_date','certification_batch','upgrade_note'];
  required.forEach(f => {
    if (!(f in item)) {
      console.log('FAIL:', label, 'missing field:', f);
      fail++;
    }
  });
  
  // question_state must be "Certified"
  if (item.question_state !== 'Certified') {
    console.log('FAIL:', label, 'question_state =', item.question_state);
    fail++;
  }
});

console.log('\nPASS:', pass, 'FAIL:', fail);
console.log('All items CorrectChoice distribution: C, B, D, A, B');
