const fs = require('fs');
const srcC = fs.readFileSync('pack_c_corrected.js', 'utf8');
const srcD = fs.readFileSync('pack_d_corrected.js', 'utf8');
const fnC = new Function(srcC + ';\nreturn MCQ_BANK_C;');
const fnD = new Function(srcD + ';\nreturn MCQ_BANK_D;');
const packC = fnC();
const packD = fnD();

const sampleQIDs = ['P1-FC-001','P1-FC-015','P1-FC-053','P1-FD-003','P1-FD-011','P1-FD-041','P1-FD-054'];
for (const qid of sampleQIDs) {
    const item = [...packC, ...packD].find(i => i.QuestionID === qid);
    if (!item) { console.log(`${qid}: NOT FOUND`); continue; }
    const cc = item.CorrectChoice;
    console.log(`\n${qid} (CC=${cc}):`);
    for (const l of ['A','B','C','D']) {
        const ew = item['ExplanationWrong' + l];
        if (l === cc) {
            console.log(`  EW_${l} [CC]: ${ew === '' ? 'EMPTY \u2713' : 'NON-EMPTY \u2717: ' + (ew||'').substring(0,50)}`);
        } else {
            const status = (ew && ew !== '') ? '\u2713 PRESENT (' + ew.length + ' chars)' : '\u2717 MISSING/EMPTY';
            console.log(`  EW_${l}: ${status}`);
        }
    }
}

// Final summary
let totalDL008 = 0, totalDL026 = 0;
for (const pack of [packC, packD]) {
    for (const item of pack) {
        if (item.Section !== 'F' || item.question_state !== 'Certified') continue;
        const cc = item.CorrectChoice;
        if (item['ExplanationWrong' + cc] && item['ExplanationWrong' + cc] !== '') totalDL008++;
        for (const l of ['A','B','C','D']) {
            if (l === cc) continue;
            if (!item['ExplanationWrong' + l] || item['ExplanationWrong' + l] === '') totalDL026++;
        }
    }
}
console.log(`\n\nFINAL: DL-008=${totalDL008}, DL-026=${totalDL026}`);
console.log(totalDL008 === 0 && totalDL026 === 0 ? 'ALL CLEAN \u2713' : 'ISSUES REMAIN \u2717');
