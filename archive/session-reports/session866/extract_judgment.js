const fs = require('fs');

function extractApplyItems(filePath) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const qidRegex = /"QuestionID":\s*"([^"]+)"/g;
    let match;
    const qids = [];
    while ((match = qidRegex.exec(raw)) !== null) {
        qids.push({qid: match[1], pos: match.index});
    }
    
    const judgmentKeywords = /\b(should|recommend|best\b|most\s+appropriate|evaluate\b|assess\b|which\s+of\s+the\s+following\s+would\s+be\s+most)/i;
    
    const results = [];
    for (let i = 0; i < qids.length; i++) {
        const start = qids[i].pos;
        const end = i + 1 < qids.length ? qids[i + 1].pos : raw.length;
        const block = raw.substring(start, Math.min(start + 5000, end));
        
        // Check for Apply level
        if (block.includes('"CognitiveLevel": "Apply"') || block.includes('"CognitiveLevel": "Apply",')) {
            const stemMatch = block.match(/"Stem":\s*"([^"]{1,400})/);
            const stem = stemMatch ? stemMatch[1] : '';
            
            if (judgmentKeywords.test(stem)) {
                const topicMatch = block.match(/"Topic":\s*"([^"]+)"/);
                const diffMatch = block.match(/"DifficultyScore":\s*(\d+)/);
                const diffMatch2 = block.match(/"Difficulty":\s*"([^"]+)"/);
                const stateMatch = block.match(/"question_state":\s*"([^"]+)"/);
                const ccMatch = block.match(/"CorrectChoice":\s*"([A-D])"/);
                const sectionMatch = block.match(/"Section":\s*"([A-F])"/);
                
                results.push({
                    qid: qids[i].qid,
                    pack: filePath.replace(/^pack_/, '').replace(/_corrected\.js$/, '').toUpperCase(),
                    section: sectionMatch ? sectionMatch[1] : '?',
                    stem: stem.substring(0, 350),
                    topic: topicMatch ? topicMatch[1] : 'N/A',
                    difficulty: diffMatch ? parseInt(diffMatch[1]) : (diffMatch2 ? diffMatch2[1] : 'N/A'),
                    state: stateMatch ? stateMatch[1] : 'N/A',
                    correctChoice: ccMatch ? ccMatch[1] : '?',
                    level: 'Apply'
                });
            }
        }
    }
    return results;
}

const packs = ['pack_a_corrected.js', 'pack_b_corrected.js', 'pack_c_corrected.js', 'pack_d_corrected.js', 'pack_e_corrected.js'];
let allResults = [];
for (const pf of packs) {
    const r = extractApplyItems(pf);
    allResults = allResults.concat(r);
    console.log(pf + ': ' + r.length + ' Apply+judgment items');
}

console.log('');
console.log('Total: ' + allResults.length + ' Apply items with judgment keywords');

// Save
const outputDir = 'reports/session866';
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputDir + '/apply_judgment_candidates.json', JSON.stringify(allResults, null, 2));
console.log('Saved to apply_judgment_candidates.json');

// Also print the top ones (difficulty >= 3)
console.log('');
console.log('=== APPLY + JUDGMENT (Difficulty >= 3) ===');
const filtered = allResults.filter(i => typeof i.difficulty === 'number' && i.difficulty >= 3 && i.state === 'Certified');
console.log('Certified & Difficulty >= 3: ' + filtered.length + ' items');
for (const item of filtered.slice(0, 30)) {
    console.log(item.qid + ' [' + item.pack + '/' + item.section + '] D' + item.difficulty + ' | ' + item.topic + ' | ' + item.stem.substring(0, 200));
}
