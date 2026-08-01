/**
 * CMA Exam Simulation — Master Project Review, Governance Check, and Safe Root Cleanup Script
 * Target Environment: Node.js (CommonJS)
 * Purpose: Audits file integrity, verifies governance guard status, and safely cleans up prohibited root-level files per Constitution §11.4.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.cwd();

// Constitution §11.1 — Permitted Root-Level Files
const PERMITTED_ROOT_PREFIXES = [
    'pack_a_corrected',
    'pack_b_corrected',
    'pack_c_corrected',
    'pack_d_corrected',
    'pack_e_corrected',
    'styles.css',
    'index_updated',
    'app.js',
    'package',
    'opencode',
    'AGENTS',
    'README',
    'VERSION',
];

// Constitution §11.4 — Prohibited Root-Level Files
const PROHIBITED_EXTENSIONS = ['.bak', '.tmp', '.log', '.null', '.bak-'];

const PROHIBITED_FILENAMES = [
    'may-core.js',
    'may-learner-state.js',
    'admin.html',
    'temp_qid_sample.json',
    '$null',
];

function auditAndCleanRoot() {
    console.log('=== 0x01. STARTING ROOT HYGIENE & GOVERNANCE AUDIT ===\n');

    const files = fs.readdirSync(ROOT_DIR, { withFileTypes: true });
    let flaggedCount = 0;
    const cleanupQueue = [];

    files.forEach(file => {
        if (file.isFile()) {
            const fileName = file.name;
            const ext = path.extname(fileName).toLowerCase();

            const isPermitted = PERMITTED_ROOT_PREFIXES.some(prefix =>
                fileName === prefix || fileName.startsWith(prefix)
            );

            if (!isPermitted) {
                const isProhibitedByExtension = PROHIBITED_EXTENSIONS.some(pe =>
                    ext === pe || fileName.includes(pe)
                );
                const isProhibitedByFilename = PROHIBITED_FILENAMES.includes(fileName);
                const isProhibitedByPattern = fileName.includes('({idx') || fileName === 'a+b';

                const isProhibited = isProhibitedByExtension || isProhibitedByFilename || isProhibitedByPattern;

                if (isProhibited) {
                    flaggedCount++;
                    cleanupQueue.push(fileName);
                    console.log(`[FLAGGED] Prohibited root file detected: ${fileName}`);
                }
            }
        }
    });

    console.log(`\nAudit complete. Total flagged root items: ${flaggedCount}`);

    if (cleanupQueue.length > 0) {
        console.log('\n=== 0x02. EXECUTING SAFE ROOT FOLDER CLEANUP ===');
        cleanupQueue.forEach(file => {
            const filePath = path.join(ROOT_DIR, file);
            try {
                console.log(`[SAFE CLEANUP] Moving/Removing prohibited item: ${file}`);
                fs.unlinkSync(filePath);
                console.log(`  -> Removed: ${file}`);
            } catch (err) {
                console.error(`[ERROR] Failed to clean ${file}:`, err.message);
            }
        });
        console.log(`\nCleanup complete. ${cleanupQueue.length} file(s) removed.`);
    } else {
        console.log('\n[INFO] Root hygiene check passed. No prohibited items to purge.');
    }
}

function verifyCertifiedPool() {
    console.log('\n=== 0x03. VERIFYING CERTIFIED POOL INTEGRITY ===');
    const packs = [
        'pack_a_corrected.js',
        'pack_b_corrected.js',
        'pack_c_corrected.js',
        'pack_d_corrected.js',
        'pack_e_corrected.js',
    ];
    let totalCertified = 0;

    packs.forEach(pack => {
        const packPath = path.join(ROOT_DIR, pack);
        if (fs.existsSync(packPath)) {
            const content = fs.readFileSync(packPath, 'utf8');
            const matches = content.match(/"question_state":\s*"Certified"/g);
            const count = matches ? matches.length : 0;
            totalCertified += count;
            console.log(`  - ${pack}: ${count} certified items found.`);
        } else {
            console.log(`  [WARNING] Pack file missing: ${pack}`);
        }
    });

    console.log(`\nTotal Certified Delivery Pool Count: ${totalCertified} (Target: 2,298)`);
}

// --- Execute ---
auditAndCleanRoot();
verifyCertifiedPool();
console.log('\n>> SCRIPT EXECUTION COMPLETE. REPOSITORY MAINTAINED. <<');
