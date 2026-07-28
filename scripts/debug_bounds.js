const fs = require('fs');
const fileText = fs.readFileSync('pack_a_corrected.js', 'utf8');

function findItemBounds(fileText, qid) {
    const qidPattern = '"QuestionID": "' + qid + '"';
    const qidIdx = fileText.indexOf(qidPattern);
    if (qidIdx === -1) { console.log('QID not found'); return null; }
    console.log('QID at index:', qidIdx);

    let depth = 0;
    let inString = false;
    let openBrace = -1;

    for (let i = qidIdx; i >= 0; i--) {
        const ch = fileText[i];
        if (ch === '"') {
            if (i > 0 && fileText[i - 1] === '\\') continue;
            inString = !inString;
            continue;
        }
        if (inString) continue;
        if (ch === '}') { depth++; continue; }
        if (ch === '{') {
            if (depth === 0) { openBrace = i; break; }
            depth--;
        }
    }
    console.log('openBrace:', openBrace);

    if (openBrace === -1) return null;

    depth = 0;
    inString = false;
    let escapeFlag = false;
    let closeBrace = -1;

    for (let i = openBrace; i < fileText.length; i++) {
        const ch = fileText[i];
        if (escapeFlag) { escapeFlag = false; continue; }
        if (ch === '\\') { escapeFlag = true; continue; }
        if (inString) { if (ch === '"') inString = false; continue; }
        if (ch === '"') { inString = true; continue; }
        if (ch === '{') { depth++; continue; }
        if (ch === '}') {
            depth--;
            if (depth === 0) { closeBrace = i; break; }
        }
    }
    console.log('closeBrace:', closeBrace);
    
    if (closeBrace >= 0) {
        console.log('Item length:', closeBrace - openBrace + 1);
        console.log('First 50 chars:', fileText.substring(openBrace, openBrace + 50));
    }
    
    return closeBrace >= 0 ? { start: openBrace, end: closeBrace + 1 } : null;
}

const result = findItemBounds(fileText, 'P1-A-004');
console.log('Result:', result);
