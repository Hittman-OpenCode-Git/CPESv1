// Filter DL-031 candidates: only Remember/Understand items with high containment
// These are the true definition-match items that should be Easy

const fs = require('fs');
const path = require('path');

const packFiles = [
    'content/packs/pack_a_corrected.js',
    'content/packs/pack_b_corrected.js',
    'content/packs/pack_c_corrected.js',
    'content/packs/pack_d_corrected.js',
    'content/packs/pack_e_corrected.js'
];

function parsePack(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const arrayStart = content.indexOf('[');
    let depth = 0, arrayEnd = -1;
    for (let i = arrayStart; i < content.length; i++) {
        if (content[i] === '[') depth++;
        else if (content[i] === ']') { depth--; if (depth === 0) { arrayEnd = i; break; } }
    }
    const arrayContent = content.substring(arrayStart, arrayEnd + 1);
    const questions = JSON.parse(arrayContent);
    return { content, arrayStart, arrayEnd, questions };
}

function normalize(text) {
    return text.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 2)
        .join(' ');
}

const definitionMatchCandidates = [];

for (const filePath of packFiles) {
    const { questions } = parsePack(filePath);
    
    for (const q of questions) {
        // Only Remember/Understand items that are currently Moderate or higher
        if (!['Remember', 'Understand'].includes(q.CognitiveLevel)) continue;
        if (q.DifficultyScore && q.DifficultyScore <= 2) continue; // Already Easy/Moderate-Easy
        if (q.Difficulty === 'Easy' || q.Difficulty === 'Moderate-Easy') continue;
        
        const correctText = q.Choices?.[q.CorrectChoice];
        if (!correctText) continue;
        
        const stemNorm = normalize(q.Stem || '');
        const correctNorm = normalize(correctText);
        
        const correctWords = correctNorm.split(' ').filter(w => w.length > 2);
        if (correctWords.length === 0) continue;
        
        let matchCount = 0;
        for (const w of correctWords) {
            if (stemNorm.includes(w)) matchCount++;
        }
        
        const containment = matchCount / correctWords.length;
        
        // High containment + Remember/Understand = definition-match
        if (containment > 0.6) {
            definitionMatchCandidates.push({
                QuestionID: q.QuestionID,
                pack: path.basename(filePath),
                currentDifficulty: q.Difficulty,
                currentScore: q.DifficultyScore,
                cognitiveLevel: q.CognitiveLevel,
                containment: Math.round(containment * 100) / 100,
                stemPreview: q.Stem.substring(0, 200),
                correctText: correctText.substring(0, 200),
                matchedWords: matchCount,
                totalWords: correctWords.length
            });
        }
    }
}

definitionMatchCandidates.sort((a, b) => b.containment - a.containment);

console.log(`Definition-match candidates (Remember/Understand + containment > 0.6): ${definitionMatchCandidates.length}`);
console.log('\nAll candidates:');
for (let i = 0; i < definitionMatchCandidates.length; i++) {
    const c = definitionMatchCandidates[i];
    console.log(`${i+1}. ${c.QuestionID} (${c.pack}) - Containment: ${c.containment} (${c.matchedWords}/${c.totalWords}) - ${c.currentDifficulty}/${c.currentScore} - CL: ${c.cognitiveLevel}`);
    console.log(`   Correct: "${c.correctText}"`);
    console.log(`   Stem: "${c.stemPreview}..."`);
    console.log('');
}

// Write to file
fs.writeFileSync('reports/DL031_true_definition_match.json', JSON.stringify(definitionMatchCandidates, null, 2), 'utf8');
console.log(`\nWritten to: reports/DL031_true_definition_match.json`);