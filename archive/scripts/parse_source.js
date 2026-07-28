const fs = require('fs');

const content = fs.readFileSync('pack_a_corrected.js', 'utf8');

// Find the array content
const arrayStart = content.indexOf('const MCQ_BANK_A = [');
if (arrayStart === -1) {
    console.log('Could not find array start');
    process.exit(1);
}

const arrayContent = content.substring(arrayStart + 'const MCQ_BANK_A = ['.length);
let bracketCount = 0;
let endIndex = -1;

for (let i = 0; i < arrayContent.length; i++) {
    const ch = arrayContent[i];
    if (ch === '[') bracketCount++;
    else if (ch === ']') {
        bracketCount--;
        if (bracketCount === 0) {
            endIndex = i;
            break;
        }
    }
}

if (endIndex === -1) {
    console.log('Could not find array end');
    process.exit(1);
}

const arrayStr = '[' + arrayContent.substring(0, endIndex + 1) + ']';

console.log('Array length:', arrayStr.length);

// Parse the array
try {
    // Clean up the JavaScript to make it valid JSON
    let jsonStr = arrayStr
        .replace(/'/g, '"')  // Replace single quotes with double
        .replace(/,\s*]/g, ']')  // Remove trailing commas before ]
        .replace(/,\s*}/g, '}')  // Remove trailing commas before }
        .replace(/([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '"$1":'); // Quote keys

    const questions = JSON.parse(jsonStr);
    console.log(`Total questions parsed: ${questions.length}`);

    // Analyze field presence
    const fields = ['QuestionID', 'Section', 'SectionName', 'Topic', 'MicroTopic', 'UniqueConceptKey', 'LOSTag', 'Difficulty', 'ItemType', 'ItemStyle', 'Stem', 'Choices', 'CorrectChoice', 'ExplanationCorrect', 'StudyLinks', 'SourceDescription', 'Part1OnlyFlag', 'ReviewNote', 'QuestionID', 'CalculationItem', 'VerifiedChecks', 'ChoiceA', 'ChoiceB', 'ChoiceC', 'ChoiceD', 'ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD'];

    const fieldStats = {};
    for (const field of fields) {
        const present = questions.filter(q => q[field] !== undefined && q[field] !== '').length;
        const missing = questions.length - present;
        const pct = ((present / questions.length) * 100).toFixed(1);
        fieldStats[field] = { present, missing, pct };
    }

    console.log('\n=== Field Presence Analysis ===');
    for (const [field, stats] of Object.entries(fieldStats)) {
        console.log(`${field.padEnd(25)}: ${stats.present}/${questions.length} (${stats.pct}%)`);
    }

    // Show first 3 questions
    console.log('\n=== First 3 Questions (key fields) ===');
    questions.slice(0, 3).forEach((q, i) => {
        console.log(`\nQ${i+1}:`);
        console.log(`  QuestionID: ${q.QuestionID || 'MISSING'}`);
        console.log(`  Section: ${q.Section}`);
        console.log(`  SectionName: ${q.SectionName}`);
        console.log(`  Difficulty: ${q.Difficulty}`);
        console.log(`  ItemType: ${q.ItemType}`);
        console.log(`  Stem: ${q.Stem?.substring(0, 60)}...`);
        console.log(`  CorrectChoice: ${q.CorrectChoice || 'MISSING'}`);
        console.log(`  ExplanationCorrect: ${q.ExplanationCorrect?.substring(0, 60)}...`);
        console.log(`  Choices: ${JSON.stringify(q.Choices)}`);
        console.log(`  LOSTag: ${q.LOSTag || 'MISSING'}`);
        console.log(`  VerifiedChecks: ${JSON.stringify(q.VerifiedChecks)}`);
        console.log(`  ChoiceA: ${q.ChoiceA || 'MISSING'}`);
        console.log(`  ChoiceB: ${q.ChoiceB || 'MISSING'}`);
        console.log(`  ChoiceC: ${q.ChoiceC || 'MISSING'}`);
        console.log(`  ChoiceD: ${q.ChoiceD || 'MISSING'}`);
        console.log(`  ExplanationWrongA: ${q.ExplanationWrongA?.substring(0, 60)}...`);
        console.log(`  ExplanationWrongB: ${q.ExplanationWrongB?.substring(0, 60)}...`);
        console.log(`  ExplanationWrongC: ${q.ExplanationWrongC?.substring(0, 60)}...`);
        console.log(`  ExplanationWrongD: ${q.ExplanationWrongD?.substring(0, 60)}...`);
        console.log(`  LOSTag: ${q.LOSTag || 'MISSING'}`);
        console.log(`  VerifiedChecks: ${JSON.stringify(q.VerifiedChecks)}`);
        console.log(`  CalculationItem: ${q.CalculationItem}`);
        console.log(`  StudyLinks: ${JSON.stringify(q.StudyLinks)}`);
        console.log(`  SourceDescription: ${q.SourceDescription}`);
        console.log(`  Part1OnlyFlag: ${q.Part1OnlyFlag}`);
        console.log(`  ReviewNote: ${q.ReviewNote}`);
    });

} catch (e) {
    console.error('Parse error:', e.message);
    console.log('First 2000 chars of array:');
    console.log(arrayStr.substring(0, 2000));
}