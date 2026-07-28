/**
 * DL-012 Archival: Insert question_state: "Archived" for MISSING Section E clone items.
 * Safe rebuild — parses all before writing. Per BACKUP_PROTOCOL.md Script Safety Rule.
 */
const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026';

function archiveMissing(filepath, prefix) {
    const orig = fs.readFileSync(filepath, 'utf-8');

    // Find all QuestionID positions for this prefix
    const qidRe = new RegExp('"QuestionID":\\s*"' + prefix + '-\\d{3}"', 'g');
    const items = [];
    let m;
    while ((m = qidRe.exec(orig)) !== null) {
        const idx = m.index;
        const qid = m[0].match(/P1-[A-Z]+-\d+/)[0];

        // Scan next 1000 chars for question_state
        const nextQid = orig.indexOf('"QuestionID"', idx + m[0].length);
        const windowEnd = nextQid === -1 ? idx + 1000 : Math.min(idx + 1000, nextQid);
        const window = orig.substring(idx, windowEnd);
        const stateMatch = window.match(/"question_state":\s*"([^"]*)"/);

        items.push({
            idx,
            qid,
            hasState: !!stateMatch,
            stateValue: stateMatch ? stateMatch[1] : null,
            lineEnd: orig.indexOf('\n', idx)
        });
    }

    const total = items.length;
    const withState = items.filter(i => i.hasState).length;
    const archived = items.filter(i => i.stateValue === 'Archived').length;
    const certified = items.filter(i => i.stateValue === 'Certified');
    const missing = items.filter(i => !i.hasState);

    console.log(`  Found ${total} QuestionIDs for ${prefix}`);
    console.log(`  With question_state: ${withState}`);
    console.log(`  Already Archived: ${archived}`);
    console.log(`  To archive: ${missing.length}`);

    if (certified.length > 0) {
        certified.forEach(c => console.log(`  *** CRITICAL: ${c.qid} is Certified! ***`));
        console.log('*** HALT: Certified items found. No writes performed. ***');
        return false;
    }

    if (missing.length === 0) {
        console.log('  Nothing to do.');
        return true;
    }

    // Build new content with insertions (reverse order)
    const insertions = missing.map(item => ({
        pos: item.lineEnd + 1,
        text: '    "question_state": "Archived",\n',
        qid: item.qid
    }));

    insertions.sort((a, b) => b.pos - a.pos);

    let result = orig;
    for (const ins of insertions) {
        result = result.substring(0, ins.pos) + ins.text + result.substring(ins.pos);
    }

    // Verify: re-scan the same prefix
    const verifyQidRe = new RegExp('"QuestionID":\\s*"' + prefix + '-\\d{3}"', 'g');
    let stillMissing = 0;
    while ((m = verifyQidRe.exec(result)) !== null) {
        const idx = m.index;
        const nextQid2 = result.indexOf('"QuestionID"', idx + m[0].length);
        const wEnd = nextQid2 === -1 ? idx + 1000 : Math.min(idx + 1000, nextQid2);
        const win = result.substring(idx, wEnd);
        if (!win.match(/"question_state"/)) {
            stillMissing++;
        }
    }

    if (stillMissing > 0) {
        console.log(`  *** VERIFY FAILED: ${stillMissing} items still MISSING ***`);
        return false;
    }

    fs.writeFileSync(filepath, result, 'utf-8');
    console.log(`  Written: ${filepath}`);
    return true;
}

console.log('=== DL-012 Archival Script ===\n');

let okC = archiveMissing(path.join(BASE, 'pack_c_corrected.js'), 'P1-EC');
console.log('');
let okD = archiveMissing(path.join(BASE, 'pack_d_corrected.js'), 'P1-ED');

console.log('');
if (okC && okD) {
    console.log('=== DONE: All items archived successfully ===');
    process.exit(0);
} else {
    console.log('*** HALT: Errors detected ***');
    process.exit(1);
}
