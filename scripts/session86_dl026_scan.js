const fs = require('fs');

// Scan Pack D Section C for DL-026 (empty non-CorrectChoice ExplanationWrong slots)
const content = fs.readFileSync('pack_d_corrected.js', 'utf8');

const blocks = content.split('"QuestionID"');
let sectionC = 0, dl26 = 0, dl8 = 0, total = 0;

for (let i = 1; i < blocks.length; i++) {
    const b = blocks[i];
    const qidM = b.match(/"([^"]+)"/);
    if (!qidM) continue;
    const qid = qidM[1];
    
    const ccM = b.match(/"CorrectChoice"\s*:\s*"([A-D])"/);
    if (!ccM) continue;
    const cc = ccM[1];
    
    const qsM = b.match(/"question_state"\s*:\s*"([^"]+)"/);
    const state = qsM ? qsM[1] : 'MISSING';
    
    total++;

    // Count DL-008: non-empty EW[CC]
    const ewCC = b.match(new RegExp('"ExplanationWrong' + cc + '"\\s*:\\s*"([^"]*)'));
    if (ewCC && ewCC[1].length > 0) dl8++;

    // Count DL-026 for Section C items: empty EW[non-CC]
    if (qid && qid.startsWith('P1-CD-')) {
        sectionC++;
        for (let letter of ['A','B','C','D']) {
            if (letter === cc) continue;
            const ewM = b.match(new RegExp('"ExplanationWrong' + letter + '"\\s*:\\s*"([^"]*)'));
            if (!ewM || ewM[1].length === 0) dl26++;
        }
    }
}

console.log('=== Pack D ===');
console.log('Total items scanned:', total);
console.log('DL-008 (non-empty EW[CC]):', dl8);
console.log('Pack D Section C items:', sectionC);
console.log('DL-026 (empty non-CC EW slots):', dl26);
