const fs = require('fs');

// Cross-pack DL-008 scan
const packs = ['pack_a', 'pack_b', 'pack_c', 'pack_d', 'pack_e'];

for (let p of packs) {
    const f = p + '_corrected.js';
    const content = fs.readFileSync(f, 'utf8');
    const blocks = content.split('"QuestionID"');
    let dl8Cert = 0, dl8NonCert = 0, total = 0;

    for (let i = 1; i < blocks.length; i++) {
        const b = blocks[i];
        const qidM = b.match(/"([^"]+)"/);
        if (!qidM) continue;
        total++;
        
        const ccM = b.match(/"CorrectChoice"\s*:\s*"([A-D])"/);
        if (!ccM) continue;
        const cc = ccM[1];
        
        const ewCC = b.match(new RegExp('"ExplanationWrong' + cc + '"\\s*:\\s*"([^"]*)'));
        if (!ewCC || ewCC[1].length === 0) continue;
        
        const qsM = b.match(/"question_state"\s*:\s*"([^"]+)"/);
        const state = qsM ? qsM[1] : 'MISSING';
        
        if (state === 'Certified') dl8Cert++;
        else dl8NonCert++;
    }
    
    console.log(p + ': total=' + total + ' | Cert DL-008=' + dl8Cert + ' | Non-Cert DL-008=' + dl8NonCert);
}
