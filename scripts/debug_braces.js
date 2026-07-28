const fs = require('fs');
const c = fs.readFileSync('pack_a_corrected.js', 'utf8');
const idx = c.indexOf('"QuestionID": "P1-A-004"');
console.log('QID index:', idx);
let braceCount = 0;
for (let i = idx; i >= 0; i--) {
    const ch = c[i];
    if (ch === '{' || ch === '}') {
        braceCount++;
        console.log(`idx ${i}: '${ch}' (total braces seen: ${braceCount})`);
        if (braceCount >= 20) break;
    }
}
