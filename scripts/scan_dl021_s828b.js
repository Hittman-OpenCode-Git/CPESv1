const fs = require('fs');
const raw = fs.readFileSync('pack_e_corrected.js', 'utf8');
const items = new Function(raw + '; return MCQ_BANK_E;')();
const secC = items.filter(q => /^P1E-C-\d{3}$/.test(q.QuestionID));

// Check for DL-013 boilerplate patterns
const patterns = [
    /represents a plausible misconception/i,
    /A candidate may select this option by misapplying/i,
    /does not align with.*correct approach/i,
    /The correct approach involves/i,
];

let boilerplateHits = [];
for (const q of secC) {
    for (const L of ['A','B','C','D']) {
        const val = q['ExplanationWrong' + L] || '';
        for (const pat of patterns) {
            if (pat.test(val)) {
                boilerplateHits.push({ qid: q.QuestionID, field: 'EW_'+L, match: val.match(pat)[0] });
            }
        }
    }
}

console.log('DL-013 boilerplate hits: ' + boilerplateHits.length);
if (boilerplateHits.length > 0) {
    for (const hit of boilerplateHits) {
        console.log('  ' + hit.qid + ' ' + hit.field + ': ' + hit.match);
    }
}

// Verify EW[CC] is empty for all items
console.log('\nDL-008 check (EW[CC] should be empty):');
let dl008Count = 0;
for (const q of secC) {
    const ewcc = q['ExplanationWrong' + q.CorrectChoice];
    if (ewcc && ewcc !== '') {
        dl008Count++;
        console.log('  DL-008: ' + q.QuestionID + ' CC=' + q.CorrectChoice + ' EW_CC has text');
    }
}
console.log('  DL-008 count: ' + dl008Count);

// Count total EW fields (for info)
let totalDistractorChars = 0;
let totalDistractorFields = 0;
for (const q of secC) {
    for (const L of ['A','B','C','D']) {
        if (L === q.CorrectChoice) continue;
        totalDistractorFields++;
        totalDistractorChars += (q['ExplanationWrong' + L] || '').length;
    }
}
console.log('\nTotal distractor fields: ' + totalDistractorFields);
console.log('Total distractor chars: ' + totalDistractorChars);
console.log('Avg chars per field: ' + Math.round(totalDistractorChars / totalDistractorFields));

// Check min/max field lengths
let minLen = Infinity, maxLen = 0, minQid = '', maxQid = '';
for (const q of secC) {
    for (const L of ['A','B','C','D']) {
        if (L === q.CorrectChoice) continue;
        const len = (q['ExplanationWrong' + L] || '').length;
        if (len < minLen) { minLen = len; minQid = q.QuestionID + ' EW_' + L; }
        if (len > maxLen) { maxLen = len; maxQid = q.QuestionID + ' EW_' + L; }
    }
}
console.log('Min field length: ' + minLen + ' (' + minQid + ')');
console.log('Max field length: ' + maxLen + ' (' + maxQid + ')');
