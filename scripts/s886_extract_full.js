const fs = require('fs');
const path = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';
const packs = ['pack_a_corrected.js', 'pack_b_corrected.js', 'pack_c_corrected.js', 'pack_d_corrected.js'];

// Select these 10 QIDs for upgrade:
// Pack A (0 Analyze/Evaluate) - priority:
//   P1-D-006, P1-D-020, P1-D-008, P1-D-010, P1-D-022, P1-D-028
// Pack B (0 Analyze/Evaluate): P1B-D-101
// Pack C (5 Analyze, 0 Evaluate): P1-DC-024
// Pack D (2 Analyze, 2 Evaluate): P1-DD-068
// From Pack A: P1-D-016 (too short stem), replace with P1-D-012
// From Pack A: P1-D-018 (too short stem), add P1-AC-100 (Section A but cross-domain)
// Actually let me pick from Section D only

const targetQIDs = [
    'P1-D-006', 'P1-D-020', 'P1-D-008', 'P1-D-010',
    'P1-D-022', 'P1-D-028', 'P1-D-012',
    'P1B-D-101', 'P1-DC-024', 'P1-DD-068'
];

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
        if (ch === '{') { if (depth === 0) start = i; depth++; }
        else if (ch === '}') { depth--; if (depth === 0 && start >= 0) { objects.push({start, end: i + 1}); start = -1; } }
    }
    return objects;
}

let results = [];

for (const f of packs) {
    const content = fs.readFileSync(path + '\\' + f, 'utf8');
    const objs = findObjects(content);
    
    for (let i = 0; i < objs.length - 1; i += 2) {
        const metaStr = content.substring(objs[i].start, objs[i].end);
        const qidMatch = metaStr.match(/"QuestionID":\s*"([^"]+)"/);
        if (!qidMatch) continue;
        const qid = qidMatch[1];
        
        if (!targetQIDs.includes(qid)) continue;
        
        const contentStr = content.substring(objs[i + 1].start, objs[i + 1].end);
        
        console.log('========== ' + qid + ' (' + f + ') ==========');
        console.log('--- META BLOCK ---');
        console.log(metaStr.substring(0, 500));
        console.log('...');
        console.log('--- CONTENT BLOCK ---');
        console.log(contentStr);
        console.log('');
        
        results.push({qid, pack: f, metaStr, contentStr});
    }
}

console.log('Found ' + results.length + ' of ' + targetQIDs.length + ' target QIDs');
