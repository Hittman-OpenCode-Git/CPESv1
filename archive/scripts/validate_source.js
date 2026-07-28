const fs = require('fs');

// Read the actual source file
const content = fs.readFileSync('pack_a_corrected.js', 'utf8');

// Extract all question objects using regex
const objRegex = /\{\s*"Part":\s*1[^}]+?(?=\s*\}\s*,?\s*\{|\s*\}\s*\}\s*;)/g;
const matches = content.matchAll(/\{\s*"Part":\s*1[^}]+?(?=\s*\}\s*,?\s*\{|\s*\}\s*\}\s*;)/g);

const questions = [];
for (const match of matches) {
    const objStr = match[0];
    // Try to extract key fields using regex
    const q = {};
    
    const fieldPatterns = {
        QuestionID: /"QuestionID"\s*:\s*"([^"]*)"/,
        Part: /"Part"\s*:\s*(\d+)/,
        Section: /"Section"\s*:\s*"([^"]*)"/,
        SectionName: /"SectionName"\s*:\s*"([^"]*)"/,
        Topic: /"Topic"\s*:\s*"([^"]*)"/,
        MicroTopic: /"MicroTopic"\s*:\s*"([^"]*)"/,
        UniqueConceptKey: /"UniqueConceptKey"\s*:\s*"([^"]*)"/,
        LOSTag: /"LOSTag"\s*:\s*"([^"]*)"/,
        Difficulty: /"Difficulty"\s*:\s*"([^"]*)"/,
        ItemType: /"ItemType"\s*:\s*"([^"]*)"/,
        ItemStyle: /"ItemStyle"\s*:\s*"([^"]*)"/,
        Stem: /"Stem"\s*:\s*"([^"]*)"/,
        CorrectChoice: /"CorrectChoice"\s*:\s*"([^"]*)"/,
        ExplanationCorrect: /"ExplanationCorrect"\s*:\s*"([^"]*)"/,
        ChoiceA: /"ChoiceA"\s*:\s*"([^"]*)"/,
        ChoiceB: /"ChoiceB"\s*:\s*"([^"]*)"/,
        ChoiceC: /"ChoiceC"\s*:\s*"([^"]*)"/,
        ChoiceD: /"ChoiceD"\s*:\s*"([^"]*)"/,
        ExplanationWrongA: /"ExplanationWrongA"\s*:\s*"([^"]*)"/,
        ExplanationWrongB: /"ExplanationWrongB"\s*:\s*"([^"]*)"/,
        ExplanationWrongC: /"ExplanationWrongC"\s*:\s*"([^"]*)"/,
        ExplanationWrongD: /"ExplanationWrongD"\s*:\s*"([^"]*)"/,
        CalculationItem: /"CalculationItem"\s*:\s*(true|false)/,
        VerifiedChecks: /"VerifiedChecks"\s*:\s*(\[[^\]]*\])/,
        StudyLinks: /"StudyLinks"\s*:\s*(\[[^\]]*\])/,
        SourceDescription: /"SourceDescription"\s*:\s*"([^"]*)"/,
        Part1OnlyFlag: /"Part1OnlyFlag"\s*:\s*(true|false)/,
        ReviewNote: /"ReviewNote"\s*:\s*"([^"]*)"/,
        CalculationItem: /"CalculationItem"\s*:\s*(true|false)/,
    };
    
    const question = {};
    let foundAny = false;
    for (const [field, pattern] of Object.entries(fieldPatterns)) {
        const match = objStr.match(pattern);
        if (match) {
            question[field] = match[1];
            foundAny = true;
        } else {
            question[field] = 'MISSING';
        }
    }
    
    if (foundAny) {
        questions.push(question);
    }
}

console.log(`Total questions extracted: ${questions.length}`);

// Check for missing fields
const fields = ['QuestionID', 'Section', 'Difficulty', 'ItemType', 'Stem', 'CorrectChoice', 'ExplanationCorrect', 'ChoiceA', 'ChoiceB', 'ChoiceC', 'ChoiceD', 'ExplanationWrongA', 'ExplanationWrongB', 'ExplanationWrongC', 'ExplanationWrongD', 'CalculationItem', 'VerifiedChecks', 'StudyLinks', 'SourceDescription', 'Part1OnlyFlag', 'ReviewNote', 'LOSTag'];

const fieldStats = {};
for (const field of fields) {
    const missing = questions.filter(q => q[field] === 'MISSING').length;
    fieldStats[field] = { present: questions.length - missing, missing };
}

console.log('\n=== Field Presence Analysis ===');
for (const [field, stats] of Object.entries(fieldStats)) {
    const pct = ((stats.present / questions.length) * 100).toFixed(1);
    console.log(`${field.padEnd(25)}: ${stats.present}/${questions.length} (${pct}%)`);
}

// Show first 3 questions
console.log('\n=== First 3 Questions (key fields) ===');
questions.slice(0, 3).forEach((q, i) => {
    console.log(`\nQ${i+1}:`);
    console.log(`  QuestionID: ${q.QuestionID}`);
    console.log(`  Section: ${q.Section}`);
    console.log(`  Difficulty: ${q.Difficulty}`);
    console.log(`  ItemType: ${q.ItemType}`);
    console.log(`  Stem: ${q.Stem?.substring(0, 60)}...`);
    console.log(`  CorrectChoice: ${q.CorrectChoice}`);
    console.log(`  ExplanationCorrect: ${q.ExplanationCorrect?.substring(0, 60)}...`);
    console.log(`  ChoiceA: ${q.ChoiceA?.substring(0, 40)}...`);
    console.log(`  ChoiceB: ${q.ChoiceB?.substring(0, 40)}...`);
    console.log(`  ChoiceC: ${q.ChoiceC?.substring(0, 40)}...`);
    console.log(`  ChoiceD: ${q.ChoiceD?.substring(0, 40)}...`);
    console.log(`  ExplanationWrongA: ${q.ExplanationWrongA?.substring(0, 40)}...`);
    console.log(`  LOSTag: ${q.LOSTag}`);
    console.log(`  VerifiedChecks: ${q.VerifiedChecks?.substring(0, 60)}...`);
});