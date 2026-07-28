const fs = require('fs');
const path = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';
const packs = ['pack_a_corrected.js', 'pack_e_corrected.js'];

function findObjects(str) {
    const objects = [];
    let depth = 0;
    let inStr = false;
    let esc = false;
    let start = -1;
    let arrayDepth = 0;
    
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        if (esc) { esc = false; continue; }
        if (ch === '\\') { esc = true; continue; }
        if (ch === '"' && !esc) { inStr = !inStr; continue; }
        if (inStr) continue;
        if (ch === '[') arrayDepth++;
        if (ch === ']' && arrayDepth > 0) continue;
        if (ch === '{') {
            if (depth === 0) start = i;
            depth++;
        } else if (ch === '}') {
            depth--;
            if (depth === 0 && start >= 0) {
                objects.push({start: start, end: i + 1});
                start = -1;
            }
        }
    }
    return objects;
}

for (const f of packs) {
    const content = fs.readFileSync(path + '\\' + f, 'utf8');
    const objs = findObjects(content);
    
    // The structure is: [meta_0, content_0, meta_1, content_1, ...]
    // meta has QuestionID, question_state, CognitiveLevel, ExplanationWrong*, etc.
    // content has Part, Section, Stem, Choices, CorrectChoice, ExplanationCorrect, etc.
    
    let sectionD = [];
    
    for (let i = 0; i < objs.length - 1; i += 2) {
        const metaStr = content.substring(objs[i].start, objs[i].end);
        const contentStr = content.substring(objs[i + 1].start, objs[i + 1].end);
        
        // Check Section from content block
        const secMatch = contentStr.match(/"Section":\s*"([^"]+)"/);
        if (!secMatch || secMatch[1] !== 'D') continue;
        
        // Check question_state from meta block
        const qsMatch = metaStr.match(/"question_state":\s*"([^"]+)"/);
        if (!qsMatch || qsMatch[1] !== 'Certified') continue;
        
        // Check CognitiveLevel from meta block
        const clMatch = metaStr.match(/"CognitiveLevel":\s*"([^"]+)"/);
        if (!clMatch) continue;
        const cl = clMatch[1];
        
        // Get QID from meta block
        const qidMatch = metaStr.match(/"QuestionID":\s*"([^"]+)"/);
        const qid = qidMatch ? qidMatch[1] : '?';
        
        // Get Stem from content block
        const stemMatch = contentStr.match(/"Stem":\s*"((?:[^"\\]|\\.)*)"/);
        if (!stemMatch) continue;
        const stem = stemMatch[1];
        
        // Get Topic
        const topicMatch = contentStr.match(/"Topic":\s*"([^"]+)"/);
        const topic = topicMatch ? topicMatch[1] : 'N/A';
        
        // Get Difficulty
        const diffMatch = contentStr.match(/"Difficulty":\s*"([^"]+)"/);
        const diff = diffMatch ? diffMatch[1] : 'N/A';
        
        // Get DifficultyScore from meta
        const dsMatch = metaStr.match(/"DifficultyScore":\s*(\d+)/);
        const ds = dsMatch ? parseInt(dsMatch[1]) : 0;
        
        // Get CorrectChoice
        const ccMatch = contentStr.match(/"CorrectChoice":\s*"([^"]+)"/);
        const cc = ccMatch ? ccMatch[1] : '?';
        
        sectionD.push({
            qid: qid,
            cl: cl,
            diff: diff,
            ds: ds,
            cc: cc,
            stemLen: stem.length,
            topic: topic,
            stem: stem
        });
    }
    
    // Stats
    let stats = {Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0, candidates: []};
    for (const item of sectionD) {
        if (stats[item.cl] !== undefined) stats[item.cl]++;
        if ((item.cl === 'Understand' || item.cl === 'Apply') && item.stemLen >= 100 && item.stemLen <= 250) {
            stats.candidates.push(item);
        }
    }
    
    console.log('=== ' + f + ' ===');
    console.log('Total Section D Certified: ' + sectionD.length);
    console.log('Understand: ' + stats.Understand + ' | Apply: ' + stats.Apply + ' | Analyze: ' + stats.Analyze + ' | Evaluate: ' + stats.Evaluate);
    console.log('Candidates (100-250 char stem): ' + stats.candidates.length);
    stats.candidates.slice(0, 20).forEach(c => {
        console.log('  ' + c.qid + ' | ' + c.cl + ' | ' + c.diff + '(' + c.ds + ') | CC=' + c.cc + ' | ' + c.stemLen + 'c | ' + c.topic);
        console.log('    Stem: ' + c.stem.substring(0, 120) + '...');
    });
    console.log('');
}
