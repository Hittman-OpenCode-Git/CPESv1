const fs = require('fs');
const path = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';
const packs = ['pack_a_corrected.js', 'pack_b_corrected.js', 'pack_c_corrected.js', 'pack_d_corrected.js', 'pack_e_corrected.js'];

function findObjects(str) {
    const objects = [];
    let depth = 0;
    let inStr = false;
    let esc = false;
    let start = -1;
    
    for (let i = 0; i < str.length; i++) {
        const ch = str[i];
        if (esc) { esc = false; continue; }
        if (ch === '\\') { esc = true; continue; }
        if (ch === '"' && !esc) { inStr = !inStr; continue; }
        if (inStr) continue;
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

let allCandidates = [];

for (const f of packs) {
    const content = fs.readFileSync(path + '\\' + f, 'utf8');
    const objs = findObjects(content);
    
    let sectionD = [];
    
    for (let i = 0; i < objs.length - 1; i += 2) {
        const metaStr = content.substring(objs[i].start, objs[i].end);
        const contentStr = content.substring(objs[i + 1].start, objs[i + 1].end);
        
        const secMatch = contentStr.match(/"Section":\s*"([^"]+)"/);
        if (!secMatch || secMatch[1] !== 'D') continue;
        
        const qsMatch = metaStr.match(/"question_state":\s*"([^"]+)"/);
        if (!qsMatch || qsMatch[1] !== 'Certified') continue;
        
        const clMatch = metaStr.match(/"CognitiveLevel":\s*"([^"]+)"/);
        if (!clMatch) continue;
        const cl = clMatch[1];
        
        const qidMatch = metaStr.match(/"QuestionID":\s*"([^"]+)"/);
        const qid = qidMatch ? qidMatch[1] : '?';
        
        const stemMatch = contentStr.match(/"Stem":\s*"((?:[^"\\]|\\.)*)"/);
        if (!stemMatch) continue;
        const stem = stemMatch[1];
        
        const topicMatch = contentStr.match(/"Topic":\s*"([^"]+)"/);
        const topic = topicMatch ? topicMatch[1] : 'N/A';
        
        const diffMatch = contentStr.match(/"Difficulty":\s*"([^"]+)"/);
        const diff = diffMatch ? diffMatch[1] : 'N/A';
        
        const dsMatch = metaStr.match(/"DifficultyScore":\s*(\d+)/);
        const ds = dsMatch ? parseInt(dsMatch[1]) : 0;
        
        const ccMatch = contentStr.match(/"CorrectChoice":\s*"([^"]+)"/);
        const cc = ccMatch ? ccMatch[1] : '?';
        
        sectionD.push({pack: f, qid, cl, diff, ds, cc, stemLen: stem.length, topic, stem});
    }
    
    let stats = {Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0, candidates: []};
    for (const item of sectionD) {
        if (stats[item.cl] !== undefined) stats[item.cl]++;
        if (item.cl === 'Understand' || item.cl === 'Apply') {
            stats.candidates.push(item);
        }
    }
    
    console.log('=== ' + f + ' ===');
    console.log('Total Sec D Certified: ' + sectionD.length + ' | U:' + stats.Understand + ' Ap:' + stats.Apply + ' An:' + stats.Analyze + ' Ev:' + stats.Evaluate);
    console.log('All candidates (stem length shown):');
    stats.candidates.forEach(c => {
        console.log('  ' + c.qid + ' | ' + c.cl + ' | ' + c.diff + '(' + c.ds + ') | CC=' + c.cc + ' | ' + c.stemLen + 'c | ' + c.topic);
        if (c.stemLen <= 250 && c.stemLen >= 50) {
            allCandidates.push(c);
        }
    });
    console.log('');
}

// Show top candidates sorted by stem length (prefer longer for better upgrade material)
console.log('=== TOP CANDIDATES ACROSS ALL PACKS (sorted by stem length desc) ===');
allCandidates.sort((a, b) => b.stemLen - a.stemLen);
allCandidates.slice(0, 30).forEach(c => {
    console.log('  ' + c.pack + ' | ' + c.qid + ' | ' + c.cl + ' | ' + c.diff + '(' + c.ds + ') | CC=' + c.cc + ' | ' + c.stemLen + 'c | ' + c.topic);
    console.log('    Stem: ' + c.stem.substring(0, 200));
});
