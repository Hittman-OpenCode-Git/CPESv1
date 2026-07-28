const fs = require('fs');
const fileText = fs.readFileSync('pack_a_corrected.js', 'utf8');

const qid = 'P1-A-004';
const qidPattern = '"QuestionID": "' + qid + '"';
const qidIdx = fileText.indexOf(qidPattern);
console.log('QID pattern:', qidPattern);
console.log('QID at index:', qidIdx);
console.log('\nGoing backwards from QID position:');

let depth = 0;
let inString = false;

for (let i = qidIdx; i >= Math.max(0, qidIdx - 200); i--) {
    const ch = fileText[i];
    
    if (ch === '"') {
        if (i > 0 && fileText[i - 1] === '\\') {
            console.log(`  idx ${i}: " (escaped, inString=${inString}, depth=${depth})`);
            continue;
        }
        const oldState = inString;
        inString = !inString;
        console.log(`  idx ${i}: " (toggle ${oldState}→${inString}, depth=${depth})`);
        continue;
    }
    
    if (inString) continue;
    if (ch === '}') { depth++; console.log(`  idx ${i}: }} (depth=${depth})`); continue; }
    if (ch === '{') {
        if (depth === 0) {
            console.log(`  idx ${i}: {{ FOUND! (depth=0)`);
            break;
        }
        depth--;
        console.log(`  idx ${i}: {{ (depth=${depth})`);
        continue;
    }
    
    // Log significant chars
    if (ch === '\n') {
        // skip
    }
}

console.log('\nFinal depth:', depth, 'inString:', inString);
