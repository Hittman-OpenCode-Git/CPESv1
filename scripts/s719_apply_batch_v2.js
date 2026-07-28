// s719_apply_batch_v2.js — Uses Function constructor + per-item JSON serialization
// MUCH more reliable than line-based search

const fs = require('fs');
const path = require('path');

const packFile = process.argv[2];
const changesFile = process.argv[3];
const dryRun = process.argv[4] === '--dry-run';

if (!packFile || !changesFile) {
    console.error('Usage: node s719_apply_batch_v2.js <packFile> <changesFile.json> [--dry-run]');
    process.exit(1);
}

// Read and parse the pack file
const originalCode = fs.readFileSync(packFile, 'utf8');
const varname = path.basename(packFile) === 'pack_e_corrected.js' ? 'MCQ_BANK_E' : 'MCQ_BANK_A';
const fn = new Function(originalCode + '; return ' + varname + ';');
const items = fn();

if (!Array.isArray(items)) {
    console.error('ERROR: parsed result is not an array. Got:', typeof items);
    process.exit(1);
}

console.log(`Parsed ${items.length} items from ${packFile}`);

// Read changes
const changes = JSON.parse(fs.readFileSync(changesFile, 'utf8'));
const byQid = {};
for (const [qid, field, oldVal, newVal] of changes) {
    if (!byQid[qid]) byQid[qid] = [];
    byQid[qid].push({ field, oldVal, newVal });
}

console.log(`Changes for ${Object.keys(byQid).length} QIDs`);

// Apply changes to in-memory items
let applied = 0;
let failed = 0;
const modifiedItems = new Set();
const fieldChangesByItem = new Map(); // QID -> array of changed fields

for (const [qid, fieldChanges] of Object.entries(byQid)) {
    const item = items.find(x => x.QuestionID === qid);
    if (!item) {
        console.log(`FAIL: ${qid} not found in parsed array`);
        failed++;
        continue;
    }

    let allApplied = true;
    const changedFields = [];
    for (const { field, oldVal, newVal } of fieldChanges) {
        if (item[field] === oldVal) {
            item[field] = newVal;
            changedFields.push(field);
        } else if (item[field] === newVal) {
            // Already has the target value - skip (already changed by previous batch)
            // This is OK
        } else {
            console.log(`WARN: ${qid}.${field} = ${JSON.stringify(item[field])}, expected old=${JSON.stringify(oldVal)} or new=${JSON.stringify(newVal)}`);
            allApplied = false;
        }
    }

    if (allApplied && changedFields.length > 0) {
        modifiedItems.add(qid);
        fieldChangesByItem.set(qid, changedFields);
        applied++;
    } else if (changedFields.length === 0) {
        // Nothing to change - already at target values
    } else {
        failed++;
    }
}

console.log(`Memory changes: ${applied} items modified, ${failed} failed`);

if (modifiedItems.size === 0) {
    console.log('No items to modify. Exiting.');
    process.exit(0);
}

if (dryRun) {
    console.log('DRY RUN — no file written');
    for (const qid of modifiedItems) {
        const item = items.find(x => x.QuestionID === qid);
        const changed = fieldChangesByItem.get(qid);
        console.log(`  ${qid}: changed ${changed.join(', ')}`);
    }
    process.exit(0);
}

// Now reconstruct the file. Strategy:
// 1. Serialize each modified item as formatted JSON
// 2. Find and replace in the original file text
let fileContent = originalCode;

// To do reliable find-and-replace, find each modified item's QID in the file,
// then brace-match to find its full object text, then replace with serialized version.
function findItemBounds(fileText, qid) {
    const qidPattern = '"QuestionID": "' + qid + '"';
    const qidIdx = fileText.indexOf(qidPattern);
    if (qidIdx === -1) return null;

    // Find opening brace (search backwards with string awareness)
    let depth = 0;
    let inString = false;
    let openBrace = -1;

    for (let i = qidIdx; i >= 0; i--) {
        const ch = fileText[i];
        
        // Handle escaped quotes going backwards:
        // If we see " and the char before it is \, it's an escaped quote inside a string
        if (ch === '"') {
            if (i > 0 && fileText[i - 1] === '\\') {
                // Escaped quote - skip (it's inside a string)
                continue;
            }
            // Toggle string state
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

    if (openBrace === -1) return null;

    // Find closing brace (search forwards with string awareness)
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

    if (closeBrace === -1) return null;

    return { start: openBrace, end: closeBrace + 1 };
}

// Sort QIDs by their position in the file to replace from end to start
// (so positions don't shift as we replace)
const qidPositions = [];
for (const qid of modifiedItems) {
    const bounds = findItemBounds(fileContent, qid);
    if (bounds) {
        qidPositions.push({ qid, ...bounds });
    } else {
        console.log(`FAIL: Could not find item bounds for ${qid}`);
    }
}

// Sort by position in file (descending, so we replace from end to start)
qidPositions.sort((a, b) => b.start - a.start);

let replacedCount = 0;
for (const { qid, start, end } of qidPositions) {
    const item = items.find(x => x.QuestionID === qid);
    if (!item) continue;

    // Serialize the item with formatting matching the original style
    const serialized = formatItem(item);
    
    // Replace in the file
    fileContent = fileContent.substring(0, start) + serialized + fileContent.substring(end);
    replacedCount++;
}

console.log(`Replaced ${replacedCount} items in file text`);

// Write the file
const timestamp = new Date().toISOString().replace(/[:.]/g, '').replace('T', '-').substring(0, 15);
const bakPath = packFile.replace('.js', `.js.bak-s719-${timestamp}`);
fs.copyFileSync(packFile, bakPath);
fs.writeFileSync(packFile, fileContent, 'utf8');

// Verify the file re-parses
try {
    const code = fs.readFileSync(packFile, 'utf8');
    const fn2 = new Function(code + '; return ' + varname + ';');
    const arr2 = fn2();
    console.log(`OK: File re-parses. Array length: ${arr2.length}`);

    // Verify changes
    let verifyFailures = 0;
    for (const qid of modifiedItems) {
        const item = arr2.find(x => x.QuestionID === qid);
        if (!item) { console.log(`VERIFY FAIL: ${qid} not found`); verifyFailures++; continue; }
        const changed = fieldChangesByItem.get(qid) || [];
        for (const field of changed) {
            const expected = items.find(x => x.QuestionID === qid)[field];
            if (item[field] !== expected) {
                console.log(`VERIFY FAIL: ${qid}.${field} = ${JSON.stringify(item[field])}, expected ${JSON.stringify(expected)}`);
                verifyFailures++;
            }
        }
    }
    console.log(`Verification: ${verifyFailures} failures`);
} catch (e) {
    console.error(`PARSE ERROR after write: ${e.message}`);
    fs.copyFileSync(bakPath, packFile);
    console.error('Restored from backup:', bakPath);
    process.exit(1);
}

console.log(`Backup: ${bakPath}`);

// Format an item as a JSON-like string matching the original style
function formatItem(item) {
    // Use standard JSON formatting with 4-space indent for nested objects
    const lines = [];
    lines.push('{');

    const keys = Object.keys(item);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const val = item[key];
        const isLast = i === keys.length - 1;
        const comma = isLast ? '' : ',';

        if (key === 'Choices') {
            lines.push(`        "${key}": {`);
            const choiceKeys = Object.keys(val);
            for (let j = 0; j < choiceKeys.length; j++) {
                const ck = choiceKeys[j];
                const cComma = j === choiceKeys.length - 1 ? '' : ',';
                lines.push(`            "${ck}": ${JSON.stringify(val[ck])}${cComma}`);
            }
            lines.push(`        }${comma}`);
        } else if (key === 'StudyLinks' && Array.isArray(val)) {
            lines.push(`        "${key}": [`);
            for (let j = 0; j < val.length; j++) {
                const sComma = j === val.length - 1 ? '' : ',';
                lines.push(`            {`);
                lines.push(`                "label": ${JSON.stringify(val[j].label)},`);
                lines.push(`                "url": ${JSON.stringify(val[j].url)}`);
                lines.push(`            }${sComma}`);
            }
            lines.push(`        ]${comma}`);
        } else if (key === 'VerifiedChecks' && Array.isArray(val)) {
            lines.push(`        "${key}": [`);
            for (let j = 0; j < val.length; j++) {
                const vComma = j === val.length - 1 ? '' : ',';
                lines.push(`            ${JSON.stringify(val[j])}${vComma}`);
            }
            lines.push(`        ]${comma}`);
        } else if (typeof val === 'string') {
            lines.push(`        "${key}": ${JSON.stringify(val)}${comma}`);
        } else if (typeof val === 'number' || typeof val === 'boolean') {
            lines.push(`        "${key}": ${val}${comma}`);
        } else if (val === null) {
            lines.push(`        "${key}": null${comma}`);
        } else if (Array.isArray(val)) {
            lines.push(`        "${key}": ${JSON.stringify(val)}${comma}`);
        } else if (typeof val === 'object') {
            lines.push(`        "${key}": ${JSON.stringify(val)}${comma}`);
        }
    }

    lines.push('    }');
    return lines.join('\n');
}
