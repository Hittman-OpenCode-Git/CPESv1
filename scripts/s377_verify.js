// s377_verify.js — Comprehensive post-remediation verification
const fs = require('fs');

function loadPack(filename, varName) {
    const src = fs.readFileSync(filename, 'utf8');
    const fn = new Function(src + ';\nreturn ' + varName + ';');
    return { src, data: fn() };
}

function loadBackup(filename) {
    const src = fs.readFileSync(filename, 'utf8');
    const fn = new Function(src + ';\nreturn MCQ_BANK_' + (filename.includes('_c_') ? 'C' : 'D') + ';');
    return fn();
}

// Load current and backup
const packC = loadPack('pack_c_corrected.js', 'MCQ_BANK_C');
const packD = loadPack('pack_d_corrected.js', 'MCQ_BANK_D');

// Find backup files
const backupFiles = fs.readdirSync('backups').filter(f => f.startsWith('pack_') && f.includes('bak-S377'));
console.log('Backup files:');
backupFiles.forEach(f => console.log('  ' + f));
console.log('');

const backupC = loadBackup('backups/' + backupFiles.find(f => f.includes('_c_')));
const backupD = loadBackup('backups/' + backupFiles.find(f => f.includes('_d_')));

// Verify QID counts
console.log(`Pack C QID count: ${packC.data.length} (baseline: 500)`);
console.log(`Pack D QID count: ${packD.data.length} (baseline: 500)`);

// Verify Certified counts unchanged
const certC = packC.data.filter(i => i.question_state === 'Certified').length;
const certD = packD.data.filter(i => i.question_state === 'Certified').length;
console.log(`Pack C Certified count: ${certC}`);
console.log(`Pack D Certified count: ${certD}`);

// Verify Domain F Certified counts
const fCertC = packC.data.filter(i => i.Section === 'F' && i.question_state === 'Certified').length;
const fCertD = packD.data.filter(i => i.Section === 'F' && i.question_state === 'Certified').length;
console.log(`Pack C Domain F Certified: ${fCertC}`);
console.log(`Pack D Domain F Certified: ${fCertD}`);

// Verify no CorrectChoice changes on remediated items
const dl035QIDs = new Set([
    'P1-FC-001','P1-FC-006','P1-FC-007','P1-FC-010','P1-FC-015',
    'P1-FC-020','P1-FC-025','P1-FC-026','P1-FC-031','P1-FC-036',
    'P1-FC-043','P1-FC-048','P1-FC-053','P1-FC-068',
    'P1-FD-001','P1-FD-003','P1-FD-007','P1-FD-009','P1-FD-011',
    'P1-FD-013','P1-FD-017','P1-FD-021','P1-FD-022','P1-FD-028',
    'P1-FD-033','P1-FD-034','P1-FD-035','P1-FD-041','P1-FD-043',
    'P1-FD-047','P1-FD-049','P1-FD-054',
]);

console.log('\n--- CorrectChoice Integrity ---');
let ccChanges = 0;
let qsChanges = 0;

for (const pack of [{data: packC.data, backup: backupC, label: 'C'}, {data: packD.data, backup: backupD, label: 'D'}]) {
    for (const item of pack.data) {
        if (!dl035QIDs.has(item.QuestionID)) continue;
        const backupItem = pack.backup.find(b => b.QuestionID === item.QuestionID);
        if (!backupItem) {
            console.log(`  WARNING: ${item.QuestionID} not found in backup`);
            continue;
        }
        if (item.CorrectChoice !== backupItem.CorrectChoice) {
            console.log(`  CC CHANGE: ${item.QuestionID}: ${backupItem.CorrectChoice} -> ${item.CorrectChoice}`);
            ccChanges++;
        }
        if (item.question_state !== backupItem.question_state) {
            console.log(`  QS CHANGE: ${item.QuestionID}: ${backupItem.question_state} -> ${item.question_state}`);
            qsChanges++;
        }
    }
}

if (ccChanges === 0) console.log('  All CorrectChoice values UNCHANGED ✓');
if (qsChanges === 0) console.log('  All question_state values UNCHANGED ✓');

// Deep DL-008 + DL-026 sweep on ALL Domain F Certified items
console.log('\n--- Full Domain F Certified Sweep (Pack C + D) ---');
let dl008All = 0;
let dl026All = 0;

for (const pack of [{data: packC.data, label: 'C'}, {data: packD.data, label: 'D'}]) {
    for (const item of pack.data) {
        if (item.Section !== 'F' || item.question_state !== 'Certified') continue;
        const cc = item.CorrectChoice;
        
        // DL-008: non-empty EW[CC]
        const ewCC = item['ExplanationWrong' + cc];
        if (ewCC && ewCC !== '') {
            console.log(`  DL-008: ${item.QuestionID} CC=${cc} EW[CC]=${(ewCC||'').substring(0,60)}...`);
            dl008All++;
        }
        
        // DL-026: empty non-CC EW slots
        for (const l of ['A','B','C','D']) {
            if (l === cc) continue;
            const ew = item['ExplanationWrong' + l];
            if (ew === '' || ew === undefined) {
                console.log(`  DL-026: ${item.QuestionID} CC=${cc} EW_${l}=${ew === '' ? 'EMPTY' : 'ABSENT'}`);
                dl026All++;
            }
        }
    }
}

console.log(`  DL-008 (full sweep): ${dl008All}`);
console.log(`  DL-026 (full sweep): ${dl026All}`);

if (dl008All === 0 && dl026All === 0) {
    console.log('\n=== VERIFICATION PASSED: 0 DL-008, 0 DL-026 on all Domain F Certified items ===');
} else {
    console.log('\n=== VERIFICATION FAILED ===');
}

// Check file parse integrity
console.log('\n--- File Parse Integrity ---');
try {
    const fnC = new Function(fs.readFileSync('pack_c_corrected.js', 'utf8') + ';\nreturn MCQ_BANK_C.length;');
    console.log(`  pack_c_corrected.js: parse OK, ${fnC()} items`);
} catch(e) { console.log(`  pack_c_corrected.js: PARSE FAILED — ${e.message}`); }

try {
    const fnD = new Function(fs.readFileSync('pack_d_corrected.js', 'utf8') + ';\nreturn MCQ_BANK_D.length;');
    console.log(`  pack_d_corrected.js: parse OK, ${fnD()} items`);
} catch(e) { console.log(`  pack_d_corrected.js: PARSE FAILED — ${e.message}`); }
