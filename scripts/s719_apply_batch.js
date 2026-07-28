// s719_apply_batch.js — Metadata-only field changes for SESSION719
// Usage: node scripts/s719_apply_batch.js <packFile> <changesFile.json> [--dry-run]
// Changes file: array of [QID, fieldName, oldValue, newValue]

const fs = require('fs');
const path = require('path');

const packFile = process.argv[2];
const changesFile = process.argv[3];
const dryRun = process.argv[4] === '--dry-run';

if (!packFile || !changesFile) {
    console.error('Usage: node s719_apply_batch.js <packFile> <changesFile.json> [--dry-run]');
    process.exit(1);
}

const changes = JSON.parse(fs.readFileSync(changesFile, 'utf8'));

// Group by QID
const byQid = {};
for (const [qid, field, oldVal, newVal] of changes) {
    if (!byQid[qid]) byQid[qid] = [];
    byQid[qid].push({ field, oldVal, newVal });
}

// Read file as lines
let lines = fs.readFileSync(packFile, 'utf8').split('\n');
let appliedCount = 0;
let failedChanges = [];

for (const [qid, fieldChanges] of Object.entries(byQid)) {
    // Find the line containing this QID
    const qidPattern = `"QuestionID": "${qid}"`;
    let qidLineIdx = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(qidPattern)) {
            qidLineIdx = i;
            break;
        }
    }

    if (qidLineIdx === -1) {
        failedChanges.push({ qid, reason: 'QID not found' });
        continue;
    }

    // For each field change, search within a window around the QID line
    // The fields are typically within +-30 lines of QID
    const searchStart = Math.max(0, qidLineIdx - 40);
    const searchEnd = Math.min(lines.length - 1, qidLineIdx + 20);

    let allApplied = true;
    for (const { field, oldVal, newVal } of fieldChanges) {
        const oldStr = `"${field}": ${JSON.stringify(oldVal)}`;
        const newStr = `"${field}": ${JSON.stringify(newVal)}`;
        
        let found = false;
        for (let i = searchStart; i <= searchEnd; i++) {
            if (lines[i].includes(oldStr)) {
                lines[i] = lines[i].replace(oldStr, newStr);
                found = true;
                break;
            }
        }

        if (!found) {
            // Try without space after colon
            const oldStrNoSpace = `"${field}":${JSON.stringify(oldVal)}`;
            for (let i = searchStart; i <= searchEnd; i++) {
                if (lines[i].includes(oldStrNoSpace)) {
                    lines[i] = lines[i].replace(oldStrNoSpace, newStr);
                    found = true;
                    break;
                }
            }
        }

        if (!found) {
            failedChanges.push({ qid, field, oldVal, reason: `Field+value not found near line ${qidLineIdx}` });
            allApplied = false;
        }
    }

    if (allApplied) {
        appliedCount++;
    }
}

if (!dryRun && appliedCount > 0) {
    // Create backup
    const timestamp = new Date().toISOString().replace(/[:.]/g, '').replace('T', '-').substring(0, 15);
    const bakPath = packFile.replace('.js', `.js.bak-s719-${timestamp}`);
    fs.copyFileSync(packFile, bakPath);
    
    // Write changes
    const newContent = lines.join('\n');
    fs.writeFileSync(packFile, newContent, 'utf8');
    
    // Verify by re-parsing
    try {
        const code = fs.readFileSync(packFile, 'utf8');
        const varname = path.basename(packFile) === 'pack_e_corrected.js' ? 'MCQ_BANK_E' : 'MCQ_BANK_A';
        const fn = new Function(code + '; return ' + varname + ';');
        const arr = fn();
        console.log(`OK: File re-parses. Array length: ${arr.length}`);
        
        // Verify changes took effect
        for (const [qid, fieldChanges] of Object.entries(byQid)) {
            const item = arr.find(x => x.QuestionID === qid);
            if (item) {
                for (const { field, newVal } of fieldChanges) {
                    if (item[field] !== newVal) {
                        console.log(`WARNING: ${qid} ${field} = ${JSON.stringify(item[field])}, expected ${JSON.stringify(newVal)}`);
                    }
                }
            }
        }
    } catch (e) {
        console.error(`PARSE ERROR after write: ${e.message}`);
        fs.copyFileSync(bakPath, packFile);
        console.error('Restored from backup:', bakPath);
        process.exit(1);
    }
    
    console.log(`Backup: ${bakPath}`);
}

console.log(`Applied: ${appliedCount} items`);
console.log(`Failed: ${failedChanges.length}`);
if (failedChanges.length > 0) {
    console.log('Failures:', JSON.stringify(failedChanges, null, 2));
}
console.log(`Dry run: ${dryRun}`);
