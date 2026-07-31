const fs = require('fs');

function extractItems(filePath) {
    const raw = fs.readFileSync(filePath, 'utf8');
    // Find all QuestionID positions
    const qidRegex = /"QuestionID":\s*"([^"]+)"/g;
    let match;
    const qids = [];
    while ((match = qidRegex.exec(raw)) !== null) {
        qids.push({qid: match[1], pos: match.index});
    }
    
    // For each QID, extract surrounding block for CognitiveLevel check
    const results = [];
    for (let i = 0; i < qids.length; i++) {
        const start = qids[i].pos;
        const end = i + 1 < qids.length ? qids[i + 1].pos : raw.length;
        const block = raw.substring(start, end);
        if (block.includes('"CognitiveLevel": "Analyze"') || block.includes('"CognitiveLevel": "Evaluate"')) {
            // Extract needed fields
            const stemMatch = block.match(/"Stem":\s*"([^"]{1,300})/);
            const topicMatch = block.match(/"Topic":\s*"([^"]+)"/);
            const diffMatch = block.match(/"DifficultyScore":\s*(\d+)/);
            const diffMatch2 = block.match(/"Difficulty":\s*"([^"]+)"/);
            const clMatch = block.match(/"CognitiveLevel":\s*"(Analyze|Evaluate)"/);
            const stateMatch = block.match(/"question_state":\s*"([^"]+)"/);
            const ccMatch = block.match(/"CorrectChoice":\s*"([A-D])"/);
            const sectionMatch = block.match(/"Section":\s*"([A-F])"/);
            
            results.push({
                qid: qids[i].qid,
                section: sectionMatch ? sectionMatch[1] : '?',
                level: clMatch ? clMatch[1] : '?',
                stem: stemMatch ? (stemMatch[1].substring(0, 300)) : 'N/A',
                topic: topicMatch ? topicMatch[1] : 'N/A',
                difficulty: diffMatch ? parseInt(diffMatch[1]) : (diffMatch2 ? diffMatch2[1] : 'N/A'),
                state: stateMatch ? stateMatch[1] : 'N/A',
                correctChoice: ccMatch ? ccMatch[1] : '?',
                pack: filePath.replace(/^pack_/, '').replace(/_corrected\.js$/, '').toUpperCase()
            });
        }
    }
    return results;
}

const packs = ['pack_a_corrected.js', 'pack_b_corrected.js', 'pack_c_corrected.js', 'pack_d_corrected.js', 'pack_e_corrected.js'];
let allResults = [];
for (const pf of packs) {
    const r = extractItems(pf);
    allResults = allResults.concat(r);
    console.log(pf + ': ' + r.length + ' Analyze+Evaluate items');
}

console.log('');
console.log('=== ALL ANALYZE + EVALUATE ===');
for (const item of allResults) {
    console.log(JSON.stringify(item));
}

// Save to file
const outputDir = 'reports/session866';
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputDir + '/raw_analyze_items.json', JSON.stringify(allResults, null, 2));
console.log('');
console.log('Saved ' + allResults.length + ' items to ' + outputDir + '/raw_analyze_items.json');
