// extract_dl035_full.js — Full details for all DL-035 items
const fs = require('fs');

function loadPack(filename, varName) {
    const src = fs.readFileSync(filename, 'utf8');
    const fn = new Function(src + ';\nreturn ' + varName + ';');
    return fn();
}

function getChoices(item) {
    const choices = item.Choices || {};
    return {
        A: choices.A || choices.a || '',
        B: choices.B || choices.b || '',
        C: choices.C || choices.c || '',
        D: choices.D || choices.d || '',
    };
}

function extractInfo(item, packLabel) {
    const cc = item.CorrectChoice;
    const choices = getChoices(item);
    const slots = {};
    for (const l of ['A','B','C','D']) {
        const ewKey = 'ExplanationWrong' + l;
        const ewVal = item[ewKey];
        slots[l] = {
            choice: choices[l],
            isCC: l === cc,
            ewVal: ewVal !== undefined ? ewVal : 'ABSENT',
            ewLen: ewVal !== undefined ? String(ewVal).length : 0,
            ewPreview: ewVal && ewVal !== '' ? String(ewVal).substring(0, 80) : (ewVal === '' ? '(EMPTY)' : '(ABSENT)'),
        };
    }
    return {
        QID: item.QuestionID,
        pack: packLabel,
        Section: item.Section,
        CorrectChoice: cc,
        Stem: item.Stem || 'MISSING',
        Topic: item.Topic || 'N/A',
        ExplanationCorrect: (item.ExplanationCorrect || '').substring(0, 150),
        choices,
        slots,
        emptyNonCC: ['A','B','C','D'].filter(l => l !== cc && (item['ExplanationWrong'+l] === '' || item['ExplanationWrong'+l] === undefined)),
        dl008: item['ExplanationWrong'+cc] && item['ExplanationWrong'+cc] !== '',
    };
}

const packC = loadPack('pack_c_corrected.js', 'MCQ_BANK_C');
const packD = loadPack('pack_d_corrected.js', 'MCQ_BANK_D');

const itemsC = packC.filter(i => i.question_state === 'Certified' && i.Section === 'F');
const itemsD = packD.filter(i => i.question_state === 'Certified' && i.Section === 'F');

const dl035C = itemsC.filter(i => {
    const cc = i.CorrectChoice;
    return ['A','B','C','D'].some(l => l !== cc && (i['ExplanationWrong'+l] === '' || i['ExplanationWrong'+l] === undefined));
}).map(i => extractInfo(i, 'C'));

const dl035D = itemsD.filter(i => {
    const cc = i.CorrectChoice;
    return ['A','B','C','D'].some(l => l !== cc && (i['ExplanationWrong'+l] === '' || i['ExplanationWrong'+l] === undefined));
}).map(i => extractInfo(i, 'D'));

// Output full details
for (const item of [...dl035C, ...dl035D]) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`QID: ${item.QID}  |  Pack ${item.pack}  |  CC=${item.CorrectChoice}  |  DL-008=${item.dl008}`);
    console.log(`Topic: ${item.Topic}`);
    console.log(`Stem: ${item.Stem.substring(0, 200)}`);
    console.log(`EC preview: ${item.ExplanationCorrect}`);
    console.log(`Empty non-CC slots: [${item.emptyNonCC.join(', ')}]`);
    console.log(`--- Choices & EW Slots ---`);
    for (const l of ['A','B','C','D']) {
        const s = item.slots[l];
        const ccMark = s.isCC ? ' <-- CORRECT' : '';
        const dl008Mark = s.isCC && item.dl008 ? ' DL-008!' : '';
        const dl035Mark = !s.isCC && (s.ewVal === '' || s.ewVal === 'ABSENT') ? ' DL-035!' : '';
        const mark = ccMark + dl008Mark + dl035Mark;
        console.log(`  [${l}] Choice: "${s.choice.substring(0, 100)}"`);
        console.log(`      EW_${l}: len=${s.ewLen} "${s.ewPreview}"${mark}`);
    }
}

console.log(`\n\n=== SUMMARY ===`);
console.log(`Total DL-035 Pack C: ${dl035C.length}`);
console.log(`Total DL-035 Pack D: ${dl035D.length}`);
console.log(`Total DL-035: ${dl035C.length + dl035D.length}`);
console.log(`\nAll DL-035 QIDs:`);
for (const item of [...dl035C, ...dl035D]) {
    const emptyList = item.emptyNonCC.join(',');
    const dl008Tag = item.dl008 ? ` [DL-008 too]` : '';
    console.log(`  ${item.QID}  CC=${item.CorrectChoice}  empty=[${emptyList}]${dl008Tag}`);
}
