// Find all lines with anomalous quote counts in EW fields
const fs = require('fs');
const src = fs.readFileSync('pack_c_corrected.js.bak-20260727200252', 'utf8');
const lines = src.split('\n');

let count5plus = 0;
for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (!l.includes('ExplanationWrong')) continue;
    const qc = (l.match(/"/g) || []).length;
    if (qc > 4) {
        count5plus++;
        console.log('Line ' + (i + 1) + ' [Q=' + qc + ']: ' + l.slice(0, 160));
    }
    if (qc < 4 && qc !== 0 && l.trim().length > 0) {
        console.log('Line ' + (i + 1) + ' [Q=' + qc + ', LOW]: ' + l.slice(0, 160));
    }
}

console.log('=== Total 5+ quote EW lines: ' + count5plus + ' ===');
