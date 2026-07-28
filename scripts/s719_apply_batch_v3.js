// s719_apply_batch_v3.js — Parse → modify array → find item text by array index → replace fields → write
const fs = require('fs');
const path = require('path');

const packFile = process.argv[2];
const changesFile = process.argv[3];
const dryRun = process.argv[4] === '--dry-run';

if (!packFile || !changesFile) {
    console.error('Usage: node s719_apply_batch_v3.js <packFile> <changesFile.json> [--dry-run]');
    process.exit(1);
}

// Read file
const originalCode = fs.readFileSync(packFile, 'utf8');

// Parse
const varname = path.basename(packFile) === 'pack_e_corrected.js' ? 'MCQ_BANK_E' : 'MCQ_BANK_A';
const fn = new Function(originalCode + '; return ' + varname + ';');
const items = fn();
console.log(`Parsed ${items.length} items`);

// Read changes
const changes = JSON.parse(fs.readFileSync(changesFile, 'utf8'));
const byQid = {};
for (const [qid, field, oldVal, newVal] of changes) {
    if (!byQid[qid]) byQid[qid] = [];
    byQid[qid].push({ field, oldVal, newVal });
}

// Apply memory changes and collect list
const qidsToChange = new Set();
let memApplied = 0;
for (const [qid, fieldChanges] of Object.entries(byQid)) {
    const item = items.find(x => x.QuestionID === qid);
    if (!item) { console.log(`SKIP: ${qid} not found`); continue; }
    
    let allOk = true;
    for (const { field, oldVal, newVal } of fieldChanges) {
        if (item[field] === oldVal) {
            item[field] = newVal;
        } else if (item[field] !== newVal) {
            console.log(`WARN: ${qid}.${field}=${JSON.stringify(item[field])}, expected ${JSON.stringify(oldVal)}`);
            allOk = false;
        }
    }
    if (allOk) { qidsToChange.add(qid); memApplied++; }
}
console.log(`Memory: ${memApplied} items to change`);

if (qidsToChange.size === 0) { console.log('Nothing to do'); process.exit(0); }

if (!dryRun) {
    // Build a QID → index map for fast lookup
    const qidToIdx = {};
    for (let i = 0; i < items.length; i++) {
        qidToIdx[items[i].QuestionID] = i;
    }

    // Find the position in the original file for each item by finding its QID pattern
    // Then for each field to change, find the field in the file and replace it
    // Strategy: for each QID, find its position, then find each target field nearby and replace

    let fileText = originalCode;
    let replaceCount = 0;
    let failCount = 0;

    for (const qid of qidsToChange) {
        const fieldChanges = byQid[qid];
        
        // Find QID position in current fileText
        const qidPattern = '"QuestionID": "' + qid + '"';
        const qidPos = fileText.indexOf(qidPattern);
        if (qidPos === -1) { console.log(`FAIL: ${qid} not found in file text`); failCount++; continue; }

        // Find the item's opening brace by scanning backwards for { at depth 0
        // Simple brace counter (string-unaware — but JSON in these files is clean)
        let depth = 0;
        let openIdx = -1;
        for (let i = qidPos; i >= 0; i--) {
            if (fileText[i] === '}') depth++;
            else if (fileText[i] === '{') {
                if (depth === 0) { openIdx = i; break; }
                depth--;
            }
        }
        if (openIdx === -1) { console.log(`FAIL: ${qid} - no opening brace`); failCount++; continue; }

        // Find closing brace
        depth = 0;
        let closeIdx = -1;
        for (let i = openIdx; i < fileText.length; i++) {
            if (fileText[i] === '{') depth++;
            else if (fileText[i] === '}') {
                depth--;
                if (depth === 0) { closeIdx = i; break; }
            }
        }
        if (closeIdx === -1) { console.log(`FAIL: ${qid} - no closing brace`); failCount++; continue; }

        // Extract item text
        let itemText = fileText.substring(openIdx, closeIdx + 1);

        // Apply each field change within this item text
        let itemChanged = false;
        for (const { field, oldVal, newVal } of fieldChanges) {
            const oldStr = '"' + field + '": ' + JSON.stringify(oldVal);
            const newStr = '"' + field + '": ' + JSON.stringify(newVal);
            
            if (itemText.includes(oldStr)) {
                itemText = itemText.replace(oldStr, newStr);
                itemChanged = true;
            } else {
                // Try without space after colon
                const oldStr2 = '"' + field + '":' + JSON.stringify(oldVal);
                if (itemText.includes(oldStr2)) {
                    itemText = itemText.replace(oldStr2, newStr);
                    itemChanged = true;
                }
            }
        }

        if (itemChanged) {
            // Replace in full file
            fileText = fileText.substring(0, openIdx) + itemText + fileText.substring(closeIdx + 1);
            replaceCount++;
        }
    }

    console.log(`Replaced: ${replaceCount}, Failed: ${failCount}`);

    // Write file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '').replace('T', '-').substring(0, 15);
    const bakPath = packFile.replace('.js', `.js.bak-s719-${timestamp}-${Date.now()}`);
    try { fs.copyFileSync(packFile, bakPath); } catch(e) { console.log('Backup warning: ' + e.message); }
    fs.writeFileSync(packFile, fileText, 'utf8');
    console.log(`Backup: ${bakPath}`);

    // Verify
    try {
        const code = fs.readFileSync(packFile, 'utf8');
        const fn2 = new Function(code + '; return ' + varname + ';');
        const arr2 = fn2();
        console.log(`OK: Reparses. Length: ${arr2.length}`);
        
        let vf = 0;
        for (const qid of qidsToChange) {
            const item = arr2.find(x => x.QuestionID === qid);
            if (!item) { console.log(`VF: ${qid} missing`); vf++; continue; }
            for (const { field, newVal } of byQid[qid]) {
                if (item[field] !== newVal) {
                    console.log(`VF: ${qid}.${field}=${JSON.stringify(item[field])}, need ${JSON.stringify(newVal)}`);
                    vf++;
                }
            }
        }
        console.log(`Verification: ${vf} failures`);
    } catch (e) {
        console.error(`PARSE ERROR: ${e.message}`);
        fs.copyFileSync(bakPath, packFile);
        console.error('Restored from backup');
        process.exit(1);
    }
} else {
    console.log(`DRY RUN - would change ${qidsToChange.size} items`);
}
