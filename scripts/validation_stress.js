// Stress test the validation pipeline with edge cases

const fs = require('fs');

// Load the ExplanationValidator
const ExplanationValidator = require('./validators/ExplanationValidator.js');

console.log('=== VALIDATION LAYER STRESS TESTS ===\n');

// Test 1: Empty explanations
console.log('1. EMPTY EXPLANATIONS');
try {
  const validator = new ExplanationValidator();
  const items = [{
    QuestionID: 'TEST-EMPTY-1',
    Stem: 'Test',
    Choices: { A: 'A', B: 'B', C: 'C', D: 'D' },
    CorrectChoice: 'A',
    ExplanationCorrect: '',
    ExplanationWrongA: '',
    ExplanationWrongB: '',
    ExplanationWrongC: '',
    ExplanationWrongD: ''
  }];
  const result = validator.validateItems(items);
  console.log('   Empty explanations: Errors:', result.errors.length, 'Warnings:', result.warnings.length);
  result.errors.forEach(e => console.log('     ERROR:', e.message));
  result.warnings.forEach(w => console.log('     WARN:', w.message));
} catch (e) {
  console.log('   Empty explanations: EXCEPTION', e.message);
}

// Test 2: Very long explanations
console.log('\n2. VERY LONG EXPLANATIONS');
try {
  const validator = new ExplanationValidator();
  const longText = 'x'.repeat(100000);
  const items = [{
    QuestionID: 'TEST-LONG-1',
    Stem: 'Test',
    Choices: { A: 'A', B: 'B', C: 'C', D: 'D' },
    CorrectChoice: 'A',
    ExplanationCorrect: longText,
    ExplanationWrongA: '',
    ExplanationWrongB: longText,
    ExplanationWrongC: longText,
    ExplanationWrongD: longText
  }];
  const result = validator.validateItems(items);
  console.log('   Long explanations: Errors:', result.errors.length, 'Warnings:', result.warnings.length);
} catch (e) {
  console.log('   Long explanations: EXCEPTION', e.message);
}

// Test 3: Unicode in explanations
console.log('\n3. UNICODE IN EXPLANATIONS');
try {
  const validator = new ExplanationValidator();
  const items = [{
    QuestionID: 'TEST-UNICODE-1',
    Stem: 'Test',
    Choices: { A: 'A', B: 'B', C: 'C', D: 'D' },
    CorrectChoice: 'A',
    ExplanationCorrect: 'Test \u0000 null \ud800 surrogate 💀 emoji \n\r\t',
    ExplanationWrongA: '',
    ExplanationWrongB: 'Test \u0000',
    ExplanationWrongC: 'Test \ud800',
    ExplanationWrongD: 'Test 💀'
  }];
  const result = validator.validateItems(items);
  console.log('   Unicode: Errors:', result.errors.length, 'Warnings:', result.warnings.length);
} catch (e) {
  console.log('   Unicode: EXCEPTION', e.message);
}

// Test 4: Missing ExplanationWrong[CorrectChoice] (DL-018)
console.log('\n4. MISSING EXPLANATIONWRONG[CORRECTCHOICE] (DL-018)');
try {
  const validator = new ExplanationValidator();
  const items = [{
    QuestionID: 'TEST-DL018-1',
    Stem: 'Test',
    Choices: { A: 'A', B: 'B', C: 'C', D: 'D' },
    CorrectChoice: 'B',
    ExplanationCorrect: 'Correct explanation here.',
    ExplanationWrongA: 'Why A is wrong.',
    // ExplanationWrongB is MISSING (not empty, absent)
    ExplanationWrongC: 'Why C is wrong.',
    ExplanationWrongD: 'Why D is wrong.'
  }];
  const result = validator.validateItems(items);
  console.log('   Missing EW[CC]: Errors:', result.errors.length, 'Warnings:', result.warnings.length);
  result.errors.forEach(e => console.log('     ERROR:', e.message));
  result.warnings.forEach(w => console.log('     WARN:', w.message));
} catch (e) {
  console.log('   Missing EW[CC]: EXCEPTION', e.message);
}

// Test 5: Non-empty ExplanationWrong[CorrectChoice] (DL-008)
console.log('\n5. NON-EMPTY EXPLANATIONWRONG[CORRECTCHOICE] (DL-008)');
try {
  const validator = new ExplanationValidator();
  const items = [{
    QuestionID: 'TEST-DL008-1',
    Stem: 'Test',
    Choices: { A: 'A', B: 'B', C: 'C', D: 'D' },
    CorrectChoice: 'A',
    ExplanationCorrect: 'Correct explanation here.',
    ExplanationWrongA: 'This should be empty but is not!',  // DL-008 violation
    ExplanationWrongB: 'Why B is wrong.',
    ExplanationWrongC: 'Why C is wrong.',
    ExplanationWrongD: 'Why D is wrong.'
  }];
  const result = validator.validateItems(items);
  console.log('   Non-empty EW[CC]: Errors:', result.errors.length, 'Warnings:', result.warnings.length);
  result.errors.forEach(e => console.log('     ERROR:', e.message));
  result.warnings.forEach(w => console.log('     WARN:', w.message));
} catch (e) {
  console.log('   Non-empty EW[CC]: EXCEPTION', e.message);
}

// Test 6: Duplicate QuestionIDs
console.log('\n6. DUPLICATE QUESTIONIDS');
try {
  const validator = new ExplanationValidator();
  const items = [
    {
      QuestionID: 'DUP-TEST-1',
      Stem: 'Test 1',
      Choices: { A: 'A', B: 'B', C: 'C', D: 'D' },
      CorrectChoice: 'A',
      ExplanationCorrect: 'Correct.',
      ExplanationWrongA: '',
      ExplanationWrongB: 'Why B wrong.',
      ExplanationWrongC: 'Why C wrong.',
      ExplanationWrongD: 'Why D wrong.'
    },
    {
      QuestionID: 'DUP-TEST-1',  // Duplicate
      Stem: 'Test 2',
      Choices: { A: 'A', B: 'B', C: 'C', D: 'D' },
      CorrectChoice: 'B',
      ExplanationCorrect: 'Correct.',
      ExplanationWrongA: 'Why A wrong.',
      ExplanationWrongB: '',
      ExplanationWrongC: 'Why C wrong.',
      ExplanationWrongD: 'Why D wrong.'
    }
  ];
  const result = validator.validateItems(items);
  console.log('   Duplicate QIDs: Errors:', result.errors.length, 'Warnings:', result.warnings.length);
  result.errors.forEach(e => console.log('     ERROR:', e.message));
} catch (e) {
  console.log('   Duplicate QIDs: EXCEPTION', e.message);
}

// Test 7: Invalid CorrectChoice
console.log('\n7. INVALID CORRECTCHOICE');
try {
  const validator = new ExplanationValidator();
  const items = [{
    QuestionID: 'TEST-INVALID-CC-1',
    Stem: 'Test',
    Choices: { A: 'A', B: 'B', C: 'C', D: 'D' },
    CorrectChoice: 'E',  // Invalid - not A/B/C/D
    ExplanationCorrect: 'Correct.',
    ExplanationWrongA: '',
    ExplanationWrongB: 'Why B wrong.',
    ExplanationWrongC: 'Why C wrong.',
    ExplanationWrongD: 'Why D wrong.'
  }];
  const result = validator.validateItems(items);
  console.log('   Invalid CC: Errors:', result.errors.length, 'Warnings:', result.warnings.length);
  result.errors.forEach(e => console.log('     ERROR:', e.message));
} catch (e) {
  console.log('   Invalid CC: EXCEPTION', e.message);
}

// Test 8: Mismatched Choices vs ExplanationWrong keys
console.log('\n8. MISMATCHED CHOICES/EXPLANATION KEYS');
try {
  const validator = new ExplanationValidator();
  const items = [{
    QuestionID: 'TEST-MISMATCH-1',
    Stem: 'Test',
    Choices: { A: 'A', B: 'B', C: 'C' },  // Only 3 choices
    CorrectChoice: 'A',
    ExplanationCorrect: 'Correct.',
    ExplanationWrongA: '',
    ExplanationWrongB: 'Why B wrong.',
    ExplanationWrongC: 'Why C wrong.',
    ExplanationWrongD: 'Why D wrong.'  // D exists but not in Choices
  }];
  const result = validator.validateItems(items);
  console.log('   Mismatched keys: Errors:', result.errors.length, 'Warnings:', result.warnings.length);
  result.errors.forEach(e => console.log('     ERROR:', e.message));
  result.warnings.forEach(w => console.log('     WARN:', w.message));
} catch (e) {
  console.log('   Mismatched keys: EXCEPTION', e.message);
}

console.log('\n=== VALIDATION STRESS COMPLETE ===');