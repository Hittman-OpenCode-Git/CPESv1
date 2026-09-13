// Scan for DL-031 definition-match items: stem contains textbook definition, correct answer is the defined term
// Pattern: high lexical overlap between stem and correct choice text

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

function wordSet(text) {
    return new Set(text.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 3 && !['the','and','for','are','with','this','that','from','have','been','were','which','their','would','there','could','should','when','what','where','whom','whose'].includes(w))
    );
}

function jaccard(setA, setB) {
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return intersection.size / union.size;
}

const allCandidates = [];

for (const filePath of packFiles) {
    const { questions } = parsePack(filePath);
    
    for (const q of questions) {
        // Only check items currently labeled Moderate or Moderate-Easy (DifficultyScore 2-3)
        if (q.DifficultyScore && q.DifficultyScore > 3) continue;
        if (q.Difficulty === 'Easy' || q.Difficulty === 'Moderate-Easy') continue;
        
        const correctText = q.Choices?.[q.CorrectChoice];
        if (!correctText) continue;
        
        const stemWords = wordSet(q.Stem || '');
        const correctWords = wordSet(correctText);
        
        if (stemWords.size === 0 || correctWords.size === 0) continue;
        
        const overlap = jaccard(stemWords, correctWords);
        
        // High overlap threshold for definition-match
        if (overlap > 0.45) {
            allCandidates.push({
                QuestionID: q.QuestionID,
                pack: path.basename(filePath),
                currentDifficulty: q.Difficulty,
                currentScore: q.DifficultyScore,
                cognitiveLevel: q.CognitiveLevel,
                overlap: Math.round(overlap * 100) / 100,
                stemPreview: q.Stem.substring(0, 120),
                correctText: correctText.substring(0, 120)
            });
        }
    }
}

// Sort by overlap descending
allCandidates.sort((a, b) => b.overlap - a.overlap);

console.log(`Total definition-match candidates: ${allCandidates.length}`);
console.log('\nTop 30 by overlap:');
for (let i = 0; i < Math.min(30, allCandidates.length); i++) {
    const c = allCandidates[i];
    console.log(`${i+1}. ${c.QuestionID} (${c.pack}) - Overlap: ${c.overlap} - ${c.currentDifficulty}/${c.currentScore} - CL: ${c.cognitiveLevel}`);
    console.log(`   Stem: ${c.stemPreview}...`);
    console.log(`   Correct: ${c.correctText}...`);
    console.log('');
}

// Write full list to file
const outputPath = 'reports/DL031_definition_match_candidates.json';
fs.writeFileSync(outputPath, JSON.stringify(allCandidates, null, 2), 'utf8');
console.log(`\nFull list written to: ${outputPath}`);