const fs = require('fs');
const lines = fs.readFileSync('pack_a_corrected.js', 'utf8').split('\n');
const qid = 'P1-A-007';
const idx = lines.findIndex(l => l.includes('"QuestionID": "' + qid + '"'));
if (idx >= 0) {
    console.log('QID line:', idx + 1);
    for (let i = Math.max(0, idx - 40); i <= Math.min(lines.length - 1, idx + 20); i++) {
        const marker = i === idx ? '>>> ' : '    ';
        console.log(marker, (i + 1).toString().padStart(5), lines[i]);
    }
} else {
    console.log('QID not found');
}
