const fs = require('fs');
const content = fs.readFileSync('pack_d_corrected.js', 'utf8');

// Extract Pack D Section C items using QuestionID-anchored blocks
const blocks = content.split('"QuestionID"');
let cert = 0, ia = 0, u = 0, arch = 0, missing = 0;

for (let i = 1; i < blocks.length; i++) {
    const b = blocks[i];
    const qidMatch = b.match(/"([^"]+)"/);
    if (!qidMatch) continue;
    const qid = qidMatch[1];
    if (!qid.startsWith('P1-CD-')) continue;
    
    const stateMatch = b.match(/"question_state"\s*:\s*"([^"]+)"/);
    const state = stateMatch ? stateMatch[1] : 'MISSING';
    
    if (state === 'Certified') cert++;
    else if (state === 'In Audit') ia++;
    else if (state === 'Unprocessed') u++;
    else if (state === 'Archived') arch++;
    else { missing++; console.log('MISSING state:', qid); }
}

console.log('P1-CD-* items:');
console.log('  Certified:    ', cert);
console.log('  In Audit:     ', ia);
console.log('  Unprocessed:  ', u);
console.log('  Archived:     ', arch);
console.log('  MISSING:      ', missing);
console.log('  TOTAL:        ', cert + ia + u + arch + missing);
