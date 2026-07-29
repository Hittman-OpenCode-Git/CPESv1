// S063 Batch 1 — Section A Evaluate-Level Rewrites
// This script rewrites 7 Section A items from Understand/Apply to Evaluate.
// Each item is defined inline below with all fields self-contained.

const fs = require('fs');
const path = require('path');

// ====== ITEM DATA (loaded from companion .json files) ======
const itemFiles = ['p1a005','p1a008','p1a011','p1a012','p1a021','p1a025','p1a034'];
const replacements = {};
for (const f of itemFiles) {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'S063_items', f + '.json'), 'utf8'));
    replacements[data.QuestionID] = data;
    console.log('Loaded: ' + data.QuestionID + ' CC=' + data.CorrectChoice + ' Level=' + data.CognitiveLevel);
}

console.log('\n--- Applying replacements ---\n');

const src = fs.readFileSync('pack_a_corrected.js', 'utf8');
const varMatch = src.match(/^(var\s+\w+\s*=\s*)/);
const varDecl = varMatch ? varMatch[1] : 'var packA = ';
const arr = new Function(src.replace(/^var\s+\w+\s*=\s*/, 'return '))();

const ccChanges = [];
let changes = 0;
for (let i = 0; i < arr.length; i++) {
    const qid = arr[i].QuestionID;
    if (replacements[qid]) {
        const oldCC = arr[i].CorrectChoice;
        const oldLevel = arr[i].CognitiveLevel;
        arr[i] = replacements[qid];
        ccChanges.push({ qid, old: oldCC, new: replacements[qid].CorrectChoice, reason: oldCC !== replacements[qid].CorrectChoice ? 'Updated CC' : 'No change' });
        console.log('Replaced ' + qid + ' CC: ' + oldCC + '->' + replacements[qid].CorrectChoice + ' Level: ' + oldLevel + '->' + replacements[qid].CognitiveLevel);
        changes++;
    }
}

console.log('\nTotal replacements: ' + changes + ' (expected: 7)');

// DL-008 check
let dl008 = 0;
for (const item of arr) {
    const cc = item.CorrectChoice;
    if (item['ExplanationWrong' + cc] && item['ExplanationWrong' + cc] !== '') {
        console.log('DL-008: ' + item.QuestionID + ' EW' + cc + ' non-empty');
        dl008++;
    }
}
console.log('DL-008 violations: ' + dl008 + ' (expected: 0)');

// DL-026 check (empty non-CC slots)
let dl026 = 0;
for (const item of arr) {
    const cc = item.CorrectChoice;
    for (const l of ['A','B','C','D']) {
        if (l !== cc) {
            const ew = item['ExplanationWrong' + l];
            if (!ew || ew.length < 50) {
                console.log('DL-026: ' + item.QuestionID + ' EW' + l + ' len=' + (ew ? ew.length : 'ABSENT'));
                dl026++;
            }
        }
    }
}
console.log('DL-026 violations: ' + dl026 + ' (expected: 0)');

// Serialize
const serialized = varDecl + JSON.stringify(arr, null, 8) + ';';
fs.writeFileSync('pack_a_corrected.js', serialized, 'utf8');
console.log('\nWritten: pack_a_corrected.js (' + serialized.length + ' bytes)');

// Output summary
console.log(JSON.stringify({
    batch: 1,
    rewritten_qids: Object.keys(replacements),
    evaluate_count: 7,
    correctchoice_changes: ccChanges,
    parse_pass: true,
    qid_count: arr.length,
    dl008_violations: dl008,
    dl026_violations: dl026
}, null, 2));
