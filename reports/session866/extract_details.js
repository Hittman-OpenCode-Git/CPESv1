const fs = require('fs');

// QIDs to inspect closely
const targetQIDs = [
    // Top control evaluation candidates
    'P1-EC-020', 'P1-EC-021', 'P1-EC-022', 'P1-EC-023', 'P1-EC-024', 'P1-EC-025',
    // Method/approach recommendations
    'P1B-C-143', 'P1-CC-064', 'P1-CC-071',
    // Edge cases
    'P1B-E-116', 'P1-F-013', 'P1-ED-016', 'P1-ED-042', 'P1-ED-046',
    // Potential judgment in Apply
    'P1-B-024', 'P1-B-039', 'P1-B-048',
    // Additional Analyze in Pack C
    'P1-EC-028', 'P1-DC-030', 'P1-DC-035', 'P1-DC-040', 'P1-DC-045',
    // Pack D analyze candidates
    'P1-BD-049', 'P1-CD-017', 'P1-DD-031'
];

const packs = ['pack_a_corrected.js', 'pack_b_corrected.js', 'pack_c_corrected.js', 'pack_d_corrected.js', 'pack_e_corrected.js'];

function extractFullItem(raw, startPos, nextPos) {
    const block = raw.substring(startPos, nextPos || raw.length);
    // Extract key fields
    const extract = (pattern) => {
        const m = block.match(pattern);
        return m ? m[1] : 'N/A';
    };
    
    return {
        stem: extract(/"Stem":\s*"((?:[^"\\]|\\.)*)"/s).substring(0, 500),
        choices: extract(/"Choices":\s*\{([^}]+(?:\{[^}]*\}[^}]*)*?)\}/s).substring(0, 500),
        correctChoice: extract(/"CorrectChoice":\s*"([A-D])"/),
        explanationCorrect: extract(/"ExplanationCorrect":\s*"((?:[^"\\]|\\.)*)"/s).substring(0, 500),
        cognitiveLevel: extract(/"CognitiveLevel":\s*"(Analyze|Evaluate|Apply)"/),
        difficulty: extract(/"DifficultyScore":\s*(\d+)/),
        difficulty2: extract(/"Difficulty":\s*"([^"]+)"/),
        topic: extract(/"Topic":\s*"([^"]+)"/),
        questionState: extract(/"question_state":\s*"([^"]+)"/)
    };
}

function findItemBlock(raw, qid) {
    const regex = new RegExp('"QuestionID":\\s*"' + qid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '"');
    const match = regex.exec(raw);
    if (!match) return null;
    
    // Find the next QuestionID after this one
    const qidRegex = /"QuestionID":\s*"([^"]+)"/g;
    let nextPos = null;
    let m;
    let found = false;
    while ((m = qidRegex.exec(raw)) !== null) {
        if (found) {
            nextPos = m.index;
            break;
        }
        if (m[1] === qid) {
            found = true;
        }
    }
    
    return extractFullItem(raw, match.index, nextPos);
}

let output = '';
for (const pf of packs) {
    const raw = fs.readFileSync(pf, 'utf8');
    for (const qid of targetQIDs) {
        const item = findItemBlock(raw, qid);
        if (item) {
            output += '\n========== ' + qid + ' [' + pf + '] ==========\n';
            output += 'Level: ' + item.cognitiveLevel + ' | Difficulty: ' + item.difficulty + ' (' + item.difficulty2 + ')\n';
            output += 'Topic: ' + item.topic + ' | State: ' + item.questionState + '\n';
            output += 'CC: ' + item.correctChoice + '\n';
            output += 'STEM: ' + item.stem + '\n';
            output += 'CHOICES: ' + item.choices + '\n';
            output += 'EXPLANATION: ' + item.explanationCorrect + '\n';
        }
    }
}

const outputDir = 'reports/session866';
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputDir + '/candidate_details.txt', output);
console.log(output);
console.log('Saved to candidate_details.txt');
