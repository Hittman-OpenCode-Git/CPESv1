const fs = require('fs');
const raw = fs.readFileSync('pack_e_corrected.js', 'utf8');

let items;
try {
    items = new Function(raw + '; return MCQ_BANK_E;')();
} catch(e) {
    items = new Function(raw.replace('const MCQ_BANK_E', 'return ') + '; return MCQ_BANK_E;')();
}

console.log('Total items in pack_e:', items.length);

const secC = items.filter(q => {
    const qid = q.QuestionID || '';
    return /^P1E-C-\d{3}$/.test(qid);
});

console.log('Section C items:', secC.length);

let dl021 = [];
let dl025 = [];
let ok = [];
let dl008 = [];

for (const q of secC) {
    const qid = q.QuestionID;
    const cc = q.CorrectChoice;
    const letters = ['A', 'B', 'C', 'D'];

    let absentCount = 0;
    let emptyCount = 0;
    let presentCount = 0;
    let absentLetters = [];
    let emptyLetters = [];

    const ewcc = q['ExplanationWrong' + cc];
    if (ewcc !== undefined && ewcc !== null && ewcc !== '') {
        dl008.push({ qid, cc, value: ewcc.substring(0, 80) });
    }

    for (const L of letters) {
        const val = q['ExplanationWrong' + L];
        if (L === cc) continue;

        if (val === undefined || val === null) {
            absentCount++;
            absentLetters.push(L);
        } else if (val === '') {
            emptyCount++;
            emptyLetters.push(L);
        } else {
            presentCount++;
        }
    }

    if (absentCount > 0) {
        dl021.push({ qid, cc, absentCount, absentLetters, emptyCount, emptyLetters, presentCount });
    } else if (emptyCount > 0) {
        dl025.push({ qid, cc, emptyCount, emptyLetters, presentCount });
    } else {
        ok.push({ qid, cc, presentCount });
    }
}

console.log('\n=== DL-021 (absent distractor EW fields): ' + dl021.length + ' items ===');
for (const r of dl021) {
    const emp = r.emptyLetters.length ? ' | empty: ' + r.emptyLetters.join(',') + ' (' + r.emptyCount + ')' : '';
    console.log('  ' + r.qid + ' CC=' + r.cc + ' | absent: ' + r.absentLetters.join(',') + ' (' + r.absentCount + ')' + emp + ' | present: ' + r.presentCount);
}

console.log('\n=== DL-025 (empty distractor EW fields): ' + dl025.length + ' items ===');
for (const r of dl025) {
    console.log('  ' + r.qid + ' CC=' + r.cc + ' | empty: ' + r.emptyLetters.join(',') + ' (' + r.emptyCount + ') | present: ' + r.presentCount);
}

console.log('\n=== OK (all distractor EW present and non-empty): ' + ok.length + ' items ===');
for (const r of ok) {
    console.log('  ' + r.qid + ' CC=' + r.cc);
}

console.log('\n=== DL-008 (EW[CC] non-empty): ' + dl008.length + ' items ===');
for (const r of dl008) {
    console.log('  ' + r.qid + ' CC=' + r.cc + ' | "' + r.value + '..."');
}

console.log('\n=== SUMMARY ===');
console.log('Total Section C items: ' + secC.length);
console.log('DL-021 (absent fields): ' + dl021.length);
console.log('DL-025 (empty fields): ' + dl025.length);
console.log('OK (all present):       ' + ok.length);
console.log('DL-008 (EW[CC] non-empty): ' + dl008.length);

let totalAbsent = dl021.reduce((s, r) => s + r.absentCount, 0);
let totalEmpty = dl025.reduce((s, r) => s + r.emptyCount, 0);
console.log('Total absent distractor fields to author: ' + totalAbsent);
console.log('Total empty distractor fields to fill: ' + totalEmpty);

const remediated = ['P1E-C-013', 'P1E-C-054', 'P1E-C-055', 'P1E-C-074', 'P1E-C-083'];
console.log('\n=== Remediated Items Cross-Check ===');
for (const rid of remediated) {
    const item = secC.find(q => q.QuestionID === rid);
    if (!item) { console.log('  ' + rid + ': NOT FOUND'); continue; }
    const cc = item.CorrectChoice;
    const letters = ['A', 'B', 'C', 'D'];
    const status = [];
    for (const L of letters) {
        if (L === cc) continue;
        const val = item['ExplanationWrong' + L];
        if (val === undefined || val === null) status.push(L + ':ABSENT');
        else if (val === '') status.push(L + ':EMPTY');
        else status.push(L + ':OK(' + val.length + 'c)');
    }
    console.log('  ' + rid + ' CC=' + cc + ' | ' + status.join(' '));
}

// Show question_state for the remediated items
console.log('\n=== question_state for remediated items ===');
for (const rid of remediated) {
    const item = secC.find(q => q.QuestionID === rid);
    console.log('  ' + rid + ': ' + (item.question_state || 'MISSING'));
}
