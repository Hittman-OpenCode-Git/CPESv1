const fs = require('fs');

const content = fs.readFileSync('pack_a_corrected.js', 'utf8');

// Find the MCQ_BANK_A array
const arrayMatch = content.match(/const MCQ_BANK_A = (\[[\s\S]*?\]);\s*$/m);
if (!arrayMatch) {
    console.log('Could not find MCQ_BANK_A array');
    process.exit(1);
}

const arrayStr = arrayMatch[1];

// Use a proper JS parser approach - evaluate the array
try {
    const questions = eval('(' + arrayStr + ')');
    console.log('Successfully parsed', questions.length, 'questions');
    
    // Show first question structure
    const q = questions[0];
    console.log('\n=== First Question Structure ===');
    console.log('Keys:', Object.keys(q).join(', '));
    console.log('QuestionID:', q.QuestionID || 'MISSING');
    console.log('Stem:', q.Stem?.substring(0, 60) + '...');
    console.log('CorrectChoice:', q.CorrectChoice);
    console.log('Difficulty:', q.Difficulty);
    console.log('ItemType:', q.ItemType);
    console.log('Section:', q.Section);
    console.log('SectionName:', q.SectionName);
    console.log('Topic:', q.Topic);
    console.log('LOSTag:', q.LOSTag);
    console.log('CalculationItem:', q.CalculationItem);
    console.log('ExplanationCorrect:', q.ExplanationCorrect?.substring(0, 60) + '...');
    console.log('Choices:', JSON.stringify(q.Choices));
    console.log('ExplanationWrongA:', q.ExplanationWrongA?.substring(0, 40));
    console.log('ExplanationWrongB:', q.ExplanationWrongB?.substring(0, 40));
    console.log('ExplanationWrongC:', q.ExplanationWrongC?.substring(0, 40));
    console.log('ExplanationWrongD:', q.ExplanationWrongD?.substring(0, 40));
    console.log('ChoiceA:', q.ChoiceA?.substring(0, 40));
    console.log('ChoiceB:', q.ChoiceB?.substring(0, 40));
    console.log('ChoiceC:', q.ChoiceC?.substring(0, 40));
    console.log('ChoiceD:', q.ChoiceD?.substring(0, 40));
    console.log('StudyLinks:', JSON.stringify(q.StudyLinks));
    console.log('SourceDescription:', q.SourceDescription?.substring(0, 60));
    console.log('Part1OnlyFlag:', q.Part1OnlyFlag);
    console.log('ReviewNote:', q.ReviewNote?.substring(0, 40));
    console.log('VerifiedChecks:', JSON.stringify(q.VerifiedChecks));
    console.log('ChoiceA:', q.ChoiceA?.substring(0, 40));
    console.log('ChoiceB:', q.ChoiceB?.substring(0, 40));
    console.log('ChoiceC:', q.ChoiceC?.substring(0, 40));
    console.log('ChoiceD:', q.ChoiceD?.substring(0, 40));
    console.log('ExplanationWrongA:', q.ExplanationWrongA?.substring(0, 40));
    console.log('ExplanationWrongB:', q.ExplanationWrongB?.substring(0, 40));
    console.log('ExplanationWrongC:', q.ExplanationWrongC?.substring(0, 40));
    console.log('ExplanationWrongD:', q.ExplanationWrongD?.substring(0, 40));
    console.log('LOSTag:', q.LOSTag);
    console.log('VerifiedChecks:', JSON.stringify(q.VerifiedChecks));
    console.log('StudyLinks:', JSON.stringify(q.StudyLinks));
    console.log('SourceDescription:', q.SourceDescription?.substring(0, 60));
    console.log('Part1OnlyFlag:', q.Part1OnlyFlag);
    console.log('ReviewNote:', q.ReviewNote?.substring(0, 40));
    console.log('CalculationItem:', q.CalculationItem);
    console.log('MicroTopic:', q.MicroTopic);
    console.log('UniqueConceptKey:', q.UniqueConceptKey);

} catch (e) {
    console.error('Parse error:', e.message);
}

// Stats
console.log('\n=== Statistics ===');
console.log('File size:', require('fs').readFileSync('pack_a_corrected.js', 'utf8').length, 'chars');