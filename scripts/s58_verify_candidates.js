const fs = require('fs');
const candidates = ['P1-EC-053','P1-EC-056','P1-EC-057','P1-EC-059','P1-EC-062','P1-EC-063','P1-EC-064','P1-EC-065','P1-EC-068','P1-EC-070','P1-EC-071','P1-EC-073','P1-EC-074','P1-EC-075'];
const c = fs.readFileSync('pack_c_corrected.js', 'utf8');
for (const qid of candidates) {
    const idx = c.indexOf('"QuestionID": "' + qid + '"');
    if (idx === -1) { console.log(qid + ': NOT FOUND'); continue; }
    const after = c.substring(idx, idx + 300);
    const m = after.match(/"question_state":\s*"([^"]+)"/);
    const state = m ? m[1] : 'NOT FOUND';
    console.log(qid + ': ' + state);
}
