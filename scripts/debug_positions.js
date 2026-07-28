const fs = require('fs');
const lines = fs.readFileSync('pack_a_corrected.js', 'utf8').split('\n');

// Check positions of all 3 fields for failing QIDs
const failing = ['P1-A-007', 'P1-A-016', 'P1-A-021', 'P1-A-024', 'P1-B-026', 'P1-C-003'];
const fields = ['CognitiveLevel', 'Difficulty', 'DifficultyScore'];

for (const qid of failing) {
    const qidLine = lines.findIndex(l => l.includes('"QuestionID": "' + qid + '"'));
    console.log(`\n=== ${qid} (QID at line ${qidLine + 1}) ===`);
    
    for (const field of fields) {
        // Find the closest occurrence to the QID (both before and after)
        let bestIdx = -1;
        let bestDist = Infinity;
        for (let i = Math.max(0, qidLine - 100); i <= Math.min(lines.length - 1, qidLine + 50); i++) {
            if (lines[i].includes('"' + field + '":')) {
                const dist = Math.abs(i - qidLine);
                if (dist < bestDist) {
                    bestDist = dist;
                    bestIdx = i;
                }
            }
        }
        if (bestIdx >= 0) {
            const linePreview = lines[bestIdx].trim();
            console.log(`  ${field} at line ${bestIdx + 1} (dist=${bestDist}): ${linePreview}`);
        } else {
            console.log(`  ${field}: NOT FOUND in window`);
        }
    }
}
