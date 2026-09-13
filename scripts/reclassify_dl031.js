// Reclassify DL-031 definition-match items from Moderate to Easy
// Difficulty: "Easy", DifficultyScore: 1

const fs = require('fs');

const reclassifications = [
    // Pack B
    { QuestionID: 'P1B-A-083', file: 'content/packs/pack_b_corrected.js' },
    { QuestionID: 'P1B-E-146', file: 'content/packs/pack_b_corrected.js' },
    
    // Pack C
    { QuestionID: 'P1-BC-066', file: 'content/packs/pack_c_corrected.js' },
    { QuestionID: 'P1-BC-067', file: 'content/packs/pack_c_corrected.js' },
    { QuestionID: 'P1-DC-016', file: 'content/packs/pack_c_corrected.js' },
    { QuestionID: 'P1-DC-017', file: 'content/packs/pack_c_corrected.js' },
    { QuestionID: 'P1-FC-020', file: 'content/packs/pack_c_corrected.js' },
    
    // Pack D
    { QuestionID: 'P1-AD-032', file: 'content/packs/pack_d_corrected.js' },
    { QuestionID: 'P1-AD-033', file: 'content/packs/pack_d_corrected.js' },
    { QuestionID: 'P1-AD-034', file: 'content/packs/pack_d_corrected.js' },
    { QuestionID: 'P1-AD-035', file: 'content/packs/pack_d_corrected.js' },
    { QuestionID: 'P1-AD-052', file: 'content/packs/pack_d_corrected.js' },
    { QuestionID: 'P1-AD-053', file: 'content/packs/pack_d_corrected.js' },
    { QuestionID: 'P1-CD-091', file: 'content/packs/pack_d_corrected.js' },
    { QuestionID: 'P1-CD-094', file: 'content/packs/pack_d_corrected.js' },
    
    // Pack E
    { QuestionID: 'P1E-D-039', file: 'content/packs/pack_e_corrected.js' },
    { QuestionID: 'P1E-E-044', file: 'content/packs/pack_e_corrected.js' },
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

function writePack(filePath, originalContent, arrayStart, arrayEnd, questions) {
    const newArrayContent = JSON.stringify(questions, null, 2);
    const prefix = originalContent.substring(0, arrayStart);
    const suffix = originalContent.substring(arrayEnd + 1);
    const newContent = prefix + newArrayContent + suffix;
    fs.writeFileSync(filePath, newContent, 'utf8');
}

// Group by file
const byFile = {};
for (const r of reclassifications) {
    if (!byFile[r.file]) byFile[r.file] = [];
    byFile[r.file].push(r.QuestionID);
}

for (const [filePath, qids] of Object.entries(byFile)) {
    console.log(`\nProcessing ${filePath} (${qids.length} items)...`);
    const { content, arrayStart, arrayEnd, questions } = parsePack(filePath);
    
    let updated = 0;
    for (const q of questions) {
        if (qids.includes(q.QuestionID)) {
            const oldDiff = q.Difficulty;
            const oldScore = q.DifficultyScore;
            q.Difficulty = 'Easy';
            q.DifficultyScore = 1;
            console.log(`  ${q.QuestionID}: ${oldDiff}/${oldScore} -> Easy/1`);
            updated++;
        }
    }
    
    if (updated > 0) {
        writePack(filePath, content, arrayStart, arrayEnd, questions);
        console.log(`  Written: ${updated} items updated`);
    }
}

console.log('\n=== RECLASSIFICATION COMPLETE ===');

// Verify
console.log('\n--- Verification ---');
for (const [filePath, qids] of Object.entries(byFile)) {
    const { questions } = parsePack(filePath);
    for (const q of questions) {
        if (qids.includes(q.QuestionID)) {
            console.log(`${q.QuestionID}: ${q.Difficulty}/${q.DifficultyScore} (CL: ${q.CognitiveLevel})`);
        }
    }
}