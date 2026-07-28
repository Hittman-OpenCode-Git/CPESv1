const fs = require('fs');

const targetQIDs = [
    'P1-ED-071', 'P1B-E-115', 'P1B-E-124', 'P1B-E-127', 'P1B-E-128', 'P1-E-R40',
    'P1B-F-114', 'P1-FC-010'
];

function extractBlock(raw, startPos, endPos) {
    const block = raw.substring(startPos, endPos || raw.length);
    return block.substring(0, 3000);
}

function findItem(raw, qid) {
    const escaped = qid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('"QuestionID":\\s*"' + escaped + '"');
    const match = regex.exec(raw);
    if (!match) return 'NOT FOUND';
    // Get block to next QID or 3000 chars
    const rest = raw.substring(match.index);
    const nextQid = rest.substring(100).match(/"QuestionID":\s*"([^"]+)"/);
    const end = nextQid ? match.index + 100 + nextQid.index : match.index + 3000;
    return raw.substring(match.index, Math.min(match.index + 3000, end));
}

const packs = ['pack_a_corrected.js', 'pack_b_corrected.js', 'pack_c_corrected.js', 'pack_d_corrected.js', 'pack_e_corrected.js'];

for (const qid of targetQIDs) {
    let found = false;
    for (const pf of packs) {
        const raw = fs.readFileSync(pf, 'utf8');
        const block = findItem(raw, qid);
        if (block !== 'NOT FOUND') {
            console.log('=== ' + qid + ' [' + pf + '] ===');
            console.log(block);
            console.log('');
            found = true;
            break;
        }
    }
    if (!found) console.log('=== ' + qid + ' === NOT FOUND\n');
}
