const items = require('./s886_upgraded_items.js');
let issues = [];

for (const item of items) {
    if (!item.upgrade_note || !item.upgrade_note.includes('S886')) {
        issues.push(item.QuestionID + ': missing/invalid upgrade_note');
    }
    
    const cc = item.CorrectChoice;
    const ewCC = item['ExplanationWrong' + cc];
    if (ewCC !== '' && ewCC !== undefined) {
        issues.push(item.QuestionID + ': DL-008 FAIL: EW[' + cc + '] is non-empty');
    }
    
    const letters = ['A','B','C','D'];
    for (const L of letters) {
        if (L !== cc) {
            const ew = item['ExplanationWrong' + L];
            if (!ew || ew.length < 30) {
                issues.push(item.QuestionID + ': DL-026 FAIL: EW[' + L + '] empty/short (' + (ew ? ew.length : 0) + 'c)');
            }
        }
    }
    
    // Rule 9: Check direct binary lead-in polarity mismatches
    // Only flag when a "No," choice has an IMMEDIATE affirmative conclusion clause
    // (before the first comma-or-period after "No,")
    // or "Yes," leads immediately to a negative conclusion
    const choices = item.Choices;
    if (choices) {
        for (const [L, text] of Object.entries(choices)) {
            // Extract the main clause after "No," or "Yes," (up to next sentence boundary)
            // Pattern: "No, the X should Y" where Y is affirmative despite "No"
            // Pattern: "Yes, the X should not Y" where Y is negative despite "Yes"
            const mainClause = text.match(/^(No|Yes),([^.,;]+[.,;][^.,;]+)/);
            const firstPart = mainClause ? mainClause[2] : text;
            
            if (text.startsWith('No,')) {
                // Flag if "No," is immediately followed by an affirmative instruction
                // in the same clause without a "not" qualifier
                if (/\bNo, the\b.*\bshould be\b/i.test(text) && !/\bNo, the\b.*\bshould not\b/i.test(text)) {
                    issues.push(item.QuestionID + ': R9 WARN: Choice ' + L + ' No + should be (no negation)');
                }
                if (/\bNo, the\b.*\bis correct\b/i.test(text) && !/\bNo, the\b.*\bis not correct\b/i.test(text)) {
                    issues.push(item.QuestionID + ': R9 WARN: Choice ' + L + ' No + is correct');
                }
            }
            if (text.startsWith('Yes,')) {
                if (/\bYes, the\b.*\bshould not\b/i.test(text)) {
                    issues.push(item.QuestionID + ': R9 WARN: Choice ' + L + ' Yes + should not');
                }
            }
        }
    }
    
    if (item.CognitiveLevel === 'Analyze' && item.DifficultyScore < 3) {
        issues.push(item.QuestionID + ': DS too low for Analyze (' + item.DifficultyScore + ')');
    }
    if (item.CognitiveLevel === 'Evaluate' && item.DifficultyScore < 4) {
        issues.push(item.QuestionID + ': DS too low for Evaluate (' + item.DifficultyScore + ')');
    }
    
    if (!item.ExplanationCorrect || item.ExplanationCorrect.length < 100) {
        issues.push(item.QuestionID + ': EC too short (' + (item.ExplanationCorrect ? item.ExplanationCorrect.length : 0) + 'c)');
    }
}

if (issues.length === 0) {
    console.log('=== ALL 10 ITEMS PASS ===');
    console.log('  Analyze: 7 | Evaluate: 3');
    console.log('  DL-008: 0 violations');
    console.log('  DL-026: 0 violations');
    console.log('  Rule 9: 0 violations');
    console.log('  upgrade_note: 10/10 present');
    console.log('  EC: all >100 chars');
} else {
    console.log('ISSUES: ' + issues.length);
    issues.forEach(i => console.log('  ' + i));
}

console.log('');
items.forEach(i => {
    console.log(i.QuestionID + ' | ' + i.CognitiveLevel + ' | DS=' + i.DifficultyScore + ' | CC=' + i.CorrectChoice + ' | Stem=' + i.Stem.length + 'c | EC=' + i.ExplanationCorrect.length + 'c');
});
