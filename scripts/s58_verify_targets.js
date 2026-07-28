const fs = require('fs');
const targets = ['P1-EC-033','P1-EC-036','P1-EC-037','P1-EC-042','P1-EC-043','P1-EC-045','P1-EC-046','P1-EC-047','P1-EC-050','P1-EC-051','P1-ED-019','P1-ED-022','P1-ED-024','P1-ED-027','P1-ED-029','P1-ED-030','P1-ED-032','P1-ED-034','P1-ED-037','P1-ED-039'];
const packFiles = {};

for (const qid of targets) {
    const file = qid.startsWith('P1-EC') ? 'pack_c_corrected.js' : 'pack_d_corrected.js';
    if (!packFiles[file]) packFiles[file] = fs.readFileSync(file, 'utf8');
    const c = packFiles[file];
    const idx = c.indexOf('"QuestionID": "' + qid + '"');
    if (idx === -1) { console.log(qid + ': NOT FOUND'); continue; }
    const after = c.substring(idx, idx + 300);
    const m = after.match(/"question_state":\s*"([^"]+)"/);
    const state = m ? m[1] : 'NOT FOUND';
    const m2 = after.match(/"CognitiveLevel":\s*"([^"]+)"/);
    const cl = m2 ? m2[1] : 'N/A';
    const flag = state === 'Certified' ? ' *** ALREADY CERTIFIED! ***' : ' (target OK)';
    console.log(qid + ': ' + state + ' (' + cl + ')' + flag);
}
