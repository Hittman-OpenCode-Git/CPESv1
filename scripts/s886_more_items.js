const fs = require('fs');
const path = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';

// Extract specific QIDs from Pack A content blocks by searching for items with specific topics
// We need: P1-D-014, P1-D-016, P1-D-018, P1-D-012 (proper full content)
// Approach: search for QID in the content blocks (the ones with Choices/CC/EW)

const packs = {
    'pack_a_corrected.js': ['P1-D-007', 'P1-D-009', 'P1-D-011', 'P1-D-013', 'P1-D-015', 'P1-D-017', 'P1-D-019', 'P1-D-021', 'P1-D-023', 'P1-D-029'],
    'pack_c_corrected.js': ['P1-DC-017', 'P1-DC-033'],
};

function findObjects(str) {
    const objects = [];
    let depth = 0, inStr = false, esc = false, start = -1;
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        if (esc) { esc = false; continue; }
        if (ch === '\\') { esc = true; continue; }
        if (ch === '"' && !esc) { inStr = !inStr; continue; }
        if (inStr) continue;
        if (ch === '{') { if (depth === 0) start = i; depth++; }
        else if (ch === '}') { depth--; if (depth === 0 && start >= 0) { objects.push({start, end: i + 1}); start = -1; } }
    }
    return objects;
}

for (const [f, targetQIDs] of Object.entries(packs)) {
    const content = fs.readFileSync(path + '\\' + f, 'utf8');
    const objs = findObjects(content);
    
    for (const o of objs) {
        const objStr = content.substring(o.start, o.end);
        const qidMatch = objStr.match(/"QuestionID":\s*"([^"]+)"/);
        if (!qidMatch) continue;
        const qid = qidMatch[1];
        if (!targetQIDs.includes(qid)) continue;
        
        // Only print if it has Choices (i.e., it's a content block)
        if (!objStr.includes('"Choices"')) continue;
        
        // Only print Section D
        if (!objStr.match(/"Section":\s*"D"/)) continue;
        
        console.log('========== ' + qid + ' (' + f + ') ==========');
        
        // Extract key fields
        const stemMatch = objStr.match(/"Stem":\s*"((?:[^"\\]|\\.)*)"/);
        const topicMatch = objStr.match(/"Topic":\s*"([^"]+)"/);
        const clMatch = objStr.match(/"CognitiveLevel":\s*"([^"]+)"/);
        const dsMatch = objStr.match(/"DifficultyScore":\s*(\d+)/);
        const qsMatch = objStr.match(/"question_state":\s*"([^"]+)"/);
        const ccMatch = objStr.match(/"CorrectChoice":\s*"([^"]+)"/);
        const diffMatch = objStr.match(/"Difficulty":\s*"([^"]+)"/);
        
        console.log('Topic: ' + (topicMatch ? topicMatch[1] : '?'));
        console.log('CL: ' + (clMatch ? clMatch[1] : '?') + ' | DS: ' + (dsMatch ? dsMatch[1] : '?') + ' | Diff: ' + (diffMatch ? diffMatch[1] : '?'));
        console.log('QS: ' + (qsMatch ? qsMatch[1] : '?') + ' | CC: ' + (ccMatch ? ccMatch[1] : '?'));
        console.log('Stem: ' + (stemMatch ? stemMatch[1] : '?'));
        
        // Extract Choices
        const choicesMatch = objStr.match(/"Choices":\s*\{[^}]+\}/);
        if (choicesMatch) console.log('Choices: ' + choicesMatch[0]);
        
        // Extract ExplanationCorrect (truncated)
        const ecMatch = objStr.match(/"ExplanationCorrect":\s*"([^"]{0,300})/);
        if (ecMatch) console.log('EC (first 300): ' + ecMatch[1]);
        
        // Count EW fields
        const ewA = objStr.includes('"ExplanationWrongA": ""') ? 'empty' : 'non-empty';
        const ewB = objStr.includes('"ExplanationWrongB": ""') ? 'empty' : 'non-empty';
        const ewC = objStr.includes('"ExplanationWrongC": ""') ? 'empty' : 'non-empty';
        const ewD = objStr.includes('"ExplanationWrongD": ""') ? 'empty' : 'non-empty';
        console.log('EW: A=' + ewA + ' B=' + ewB + ' C=' + ewC + ' D=' + ewD);
        console.log('');
    }
}
