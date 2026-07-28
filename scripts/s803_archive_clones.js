// Session 803 — Clone Archival Script
// Changes question_state from "Unprocessed" to "Archived" for specified QIDs
// Usage: node scripts/s803_archive_clones.js

const fs = require('fs');
const path = require('path');

const ARCHIVE_CONFIG = {
    pack_c: {
        file: 'pack_c_corrected.js',
        qids: [
            // Batch 1 (28 items): FC-002 through FC-038 clones
            'P1-FC-002','P1-FC-003','P1-FC-004','P1-FC-005',
            'P1-FC-008','P1-FC-009',
            'P1-FC-011','P1-FC-012','P1-FC-013','P1-FC-014',
            'P1-FC-016','P1-FC-017','P1-FC-018','P1-FC-019',
            'P1-FC-021','P1-FC-022','P1-FC-023','P1-FC-024',
            'P1-FC-027','P1-FC-028','P1-FC-029','P1-FC-030',
            'P1-FC-032','P1-FC-033','P1-FC-034','P1-FC-035',
            'P1-FC-037','P1-FC-038',
            // Batch 2 (28 items): FC-039 through FC-073 clones
            'P1-FC-039','P1-FC-040','P1-FC-041','P1-FC-042',
            'P1-FC-044','P1-FC-045','P1-FC-046','P1-FC-047',
            'P1-FC-049','P1-FC-050','P1-FC-051','P1-FC-052',
            'P1-FC-054','P1-FC-055','P1-FC-056','P1-FC-057',
            'P1-FC-059','P1-FC-060','P1-FC-061','P1-FC-062',
            'P1-FC-064','P1-FC-065','P1-FC-066','P1-FC-067',
            'P1-FC-069','P1-FC-070','P1-FC-071','P1-FC-072'
        ]
    },
    pack_d: {
        file: 'pack_d_corrected.js',
        qids: [
            // Batch 3 (28 items): FD-002 through FD-038 clones
            'P1-FD-002','P1-FD-003','P1-FD-004','P1-FD-005',
            'P1-FD-007','P1-FD-008','P1-FD-009','P1-FD-010',
            'P1-FD-012','P1-FD-013','P1-FD-014','P1-FD-015',
            'P1-FD-017','P1-FD-018','P1-FD-019','P1-FD-020',
            'P1-FD-022','P1-FD-023','P1-FD-024','P1-FD-025',
            'P1-FD-028','P1-FD-029',
            'P1-FD-032',
            'P1-FD-035','P1-FD-036','P1-FD-037','P1-FD-038',
            // Batch 4 (27 items): FD-039 through FD-073 clones
            'P1-FD-039','P1-FD-040','P1-FD-041','P1-FD-042',
            'P1-FD-044','P1-FD-045','P1-FD-047','P1-FD-048',
            'P1-FD-050','P1-FD-051','P1-FD-052','P1-FD-053',
            'P1-FD-055','P1-FD-056','P1-FD-057','P1-FD-058',
            'P1-FD-060','P1-FD-061','P1-FD-062','P1-FD-063',
            'P1-FD-065','P1-FD-066','P1-FD-067','P1-FD-068',
            'P1-FD-070','P1-FD-071','P1-FD-072'
        ]
    }
};

// Pre-flight: verify backup exists and all target QIDs are "Unprocessed"
console.log('=== S803 Clone Archival — Pre-flight ===');
const ts = '20260726183716';

for (const [packKey, config] of Object.entries(ARCHIVE_CONFIG)) {
    const filePath = config.file;
    const backupPath = `backups/${filePath}.bak-${ts}`;
    
    if (!fs.existsSync(backupPath)) {
        console.error(`ERROR: Backup not found: ${backupPath}`);
        process.exit(1);
    }
    console.log(`Backup confirmed: ${backupPath} (${fs.statSync(backupPath).size} bytes)`);
    
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split('\n');
    let modifiedCount = 0;
    let errors = [];
    
    for (const qid of config.qids) {
        // Find the line with this QID
        let qidLine = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(`"QuestionID": "${qid}"`)) {
                qidLine = i;
                break;
            }
        }
        
        if (qidLine === -1) {
            errors.push(`${qid}: QID not found in file`);
            continue;
        }
        
        // Search forward (within 15 lines) for question_state
        let found = false;
        for (let j = qidLine; j < Math.min(qidLine + 15, lines.length); j++) {
            if (lines[j].includes('"question_state": "Unprocessed"')) {
                lines[j] = lines[j].replace('"question_state": "Unprocessed"', '"question_state": "Archived"');
                modifiedCount++;
                found = true;
                break;
            } else if (lines[j].includes('"question_state": "Archived"')) {
                console.log(`${qid}: Already Archived — skipping`);
                found = true;
                break;
            } else if (lines[j].includes('"question_state": "Certified"')) {
                errors.push(`${qid}: Is CERTIFIED — BLOCKED from archival!`);
                found = true;
                break;
            }
        }
        
        if (!found) {
            errors.push(`${qid}: question_state not found within 15 lines of QID`);
        }
    }
    
    if (errors.length > 0) {
        console.error(`ERRORS in ${filePath}:`);
        errors.forEach(e => console.error(`  ${e}`));
        process.exit(1);
    }
    
    // Write modified content
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`${filePath}: ${modifiedCount} items changed from Unprocessed → Archived`);
}

// Post-flight: count states
console.log('\n=== S803 Clone Archival — Post-flight ===');
for (const [packKey, config] of Object.entries(ARCHIVE_CONFIG)) {
    const content = fs.readFileSync(config.file, 'utf8');
    const unprocessedCount = (content.match(/"question_state": "Unprocessed"/g) || []).length;
    const archivedCount = (content.match(/"question_state": "Archived"/g) || []).length;
    const certifiedCount = (content.match(/"question_state": "Certified"/g) || []).length;
    const totalQIDs = (content.match(/"QuestionID":/g) || []).length;
    console.log(`${config.file}: ${totalQIDs} QIDs, ${certifiedCount} Certified, ${archivedCount} Archived, ${unprocessedCount} Unprocessed`);
}
console.log('Done.');

function GetTimestamp() {
    const now = new Date();
    return now.getFullYear() +
        String(now.getMonth() + 1).padStart(2, '0') +
        String(now.getDate()).padStart(2, '0') +
        String(now.getHours()).padStart(2, '0') +
        String(now.getMinutes()).padStart(2, '0') +
        String(now.getSeconds()).padStart(2, '0');
}
