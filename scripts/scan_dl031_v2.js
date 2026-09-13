// Improved scan for DL-031: check how much of correct answer appears in stem (containment)

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
    return { questions };
}

function normalize(text) {
    return text.toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length > 2)
        .join(' ');
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
        
        const stemNorm = normalize(q.Stem || '');
        const correctNorm = normalize(correctText);
        
        // Check what fraction of correct answer words appear in stem
        const correctWords = correctNorm.split(' ').filter(w => w.length > 2);
        if (correctWords.length === 0) continue;
        
        let matchCount = 0;
        for (const w of correctWords) {
            if (stemNorm.includes(w)) matchCount++;
        }
        
        const containment = matchCount / correctWords.length;
        
        // High containment = definition-match
        if (containment > 0.6) {
            allCandidates.push({
                QuestionID: q.QuestionID,
                pack: path.basename(filePath),
                currentDifficulty: q.Difficulty,
                currentScore: q.DifficultyScore,
                cognitiveLevel: q.CognitiveLevel,
                containment: Math.round(containment * 100) / 100,
                stemPreview: q.Stem.substring(0, 150),
                correctText: correctText.substring(0, 150),
                correctWords: correctWords.length,
                matchedWords: matchCount
            });
        }
    }
}

allCandidates.sort((a, b) => b.containment - a.containment);

console.log(`Total definition-match candidates (containment > 0.6): ${allCandidates.length}`);
console.log('\nAll candidates:');
for (let i = 0; i < allCandidates.length; i++) {
    const c = allCandidates[i];
    console.log(`${i+1}. ${c.QuestionID} (${c.pack}) - Containment: ${c.containment} (${c.matchedWords}/${c.correctWords}) - ${c.currentDifficulty}/${c.currentScore} - CL: ${c.cognitiveLevel}`);
    console.log(`   Correct: "${c.correctText}"`);
    console.log(`   Stem: "${c.stemPreview}..."`);
    console.log('');
}

// Also check for known definition-match patterns from earlier audit
const knownPatterns = [
    'trend', 'cia triad', 'goal congruence', 'elt vs etl', 'time series', 'cash vs accrual',
    'variance equals standard', 'learning curve', 'break-even', 'margin of safety',
    'contribution margin', 'relevant cost', 'sunk cost', 'opportunity cost',
    'standard cost', 'flexible budget', 'static budget', 'master budget',
    'cash budget', 'production budget', 'sales forecast', 'rolling forecast',
    'zero-based budget', 'activity-based costing', 'job order costing', 'process costing',
    'joint cost', 'byproduct', 'scrap', 'spoilage', 'rework',
    'transfer price', 'responsibility center', 'cost center', 'profit center', 'investment center',
    'balanced scorecard', 'key performance indicator', 'benchmarking',
    'coso', 'internal control', 'control environment', 'risk assessment', 'control activities',
    'information communication', 'monitoring', 'segregation of duties', 'fraud triangle',
    'revenue recognition', 'performance obligation', 'contract asset', 'contract liability',
    'inventory', 'lower of cost', 'net realizable value', 'fifo', 'lifo', 'weighted average',
    'depreciation', 'straight-line', 'double-declining', 'units of production',
    'impairment', 'goodwill', 'intangible', 'research development', 'capitalize expense',
    'lease', 'right-of-use', 'finance lease', 'operating lease',
    'pension', 'defined benefit', 'defined contribution', 'postretirement',
    'income tax', 'deferred tax', 'valuation allowance', 'uncertain tax position',
    'earnings per share', 'basic eps', 'diluted eps', 'antidilutive',
    'segment reporting', 'operating segment', 'reportable segment', 'chief operating decision maker',
    'fair value', 'level 1', 'level 2', 'level 3', 'hierarchy',
    'derivative', 'hedge', 'cash flow hedge', 'fair value hedge',
    'foreign currency', 'translation', 'remeasurement', 'functional currency',
    'consolidation', 'variable interest entity', 'vict', 'primary beneficiary',
    'equity method', 'significant influence', 'control', 'joint venture',
    'business combination', 'purchase method', 'acquisition method', 'goodwill',
    'contingent consideration', 'bargain purchase', 'noncontrolling interest'
];

console.log('\n\n--- Checking known definition-match terms in stems ---');
for (const filePath of packFiles) {
    const { questions } = parsePack(filePath);
    
    for (const q of questions) {
        if (q.DifficultyScore && q.DifficultyScore > 3) continue;
        if (q.Difficulty === 'Easy' || q.Difficulty === 'Moderate-Easy') continue;
        
        const correctText = q.Choices?.[q.CorrectChoice];
        if (!correctText) continue;
        
        const stemLower = (q.Stem || '').toLowerCase();
        const correctLower = correctText.toLowerCase();
        
        for (const term of knownPatterns) {
            if (correctLower.includes(term) && stemLower.includes(term)) {
                // Found a known term in both stem and correct answer
                allCandidates.push({
                    QuestionID: q.QuestionID,
                    pack: path.basename(filePath),
                    currentDifficulty: q.Difficulty,
                    currentScore: q.DifficultyScore,
                    cognitiveLevel: q.CognitiveLevel,
                    matchedTerm: term,
                    stemPreview: q.Stem.substring(0, 150),
                    correctText: correctText.substring(0, 150)
                });
                break; // Only add once per question
            }
        }
    }
}

console.log(`\nTotal with known-term check: ${allCandidates.length}`);