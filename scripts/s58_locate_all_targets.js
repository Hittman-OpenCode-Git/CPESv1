const fs = require('fs');

// Updated targets after S56 parallel collision
const targets = [
    // Batch 1 - Pack C EC
    'P1-EC-053','P1-EC-056','P1-EC-057','P1-EC-042','P1-EC-043',
    // Batch 2 - Pack C EC
    'P1-EC-045','P1-EC-046','P1-EC-047','P1-EC-050','P1-EC-051',
    // Batch 3 - Pack D ED
    'P1-ED-019','P1-ED-022','P1-ED-024','P1-ED-027','P1-ED-029',
    // Batch 4 - Pack D ED
    'P1-ED-030','P1-ED-032','P1-ED-034','P1-ED-037','P1-ED-039'
];

for (const file of ['pack_c_corrected.js','pack_d_corrected.js']) {
    const c = fs.readFileSync(file, 'utf8');
    const fTargets = targets.filter(t => t.startsWith('P1-EC') ? file.includes('pack_c') : file.includes('pack_d'));
    for (const qid of fTargets) {
        const idx = c.indexOf('"QuestionID": "' + qid + '"');
        if (idx === -1) { console.log(`${qid}: NOT FOUND in ${file}`); continue; }
        const line = c.substring(0, idx).split('\n').length;
        // Find the start of the content block (the "Part":1 object BEFORE this metadata block)
        // Look backwards for the preceding },{ boundary
        const before = c.substring(Math.max(0, idx - 100), idx);
        const partIdx = before.lastIndexOf('"Part": 1');
        console.log(`${qid}: metadata line ${line}, content block ~${partIdx > 0 ? c.substring(0, idx - 100 + partIdx).split('\n').length : 'NOT FOUND'}`);
    }
}
