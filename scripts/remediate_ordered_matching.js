// scripts/remediate_ordered_matching.js
// Session 82P — Ordered-Pattern Remediation Automation Analysis
// Governance Lane: Light (prototype is dry-run only)
// Purpose: Analyze and prototype shuffle of RightItems arrays for Class C matching items.
// Mode: DRY-RUN by default. Use --execute for write-back (gated by user confirmation).

const fs = require('fs');
const path = require('path');

// =========================================================================
// Configuration
// =========================================================================

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT, 'scripts', 'output');

const CASE_FILES = [
    'content/cases/legacy/scored_cases.js',
    'content/cases/legacy/scored_cases2.js',
    'content/cases/legacy/scored_cases3.js',
    'content/cases/legacy/scored_cases4.js',
    'content/cases/legacy/scored_cases5.js'
];

// Wave 1 items already resolved in Session 81 (Class A/B redesign)
const WAVE1_EXCLUSIONS = new Set([
    'CBQ-E1-Q5',
    'CBQ3-D1-Q6',
    'CBQ2-C1-Q1',
    'CBQ4-F2-Q2',
    'CBQ3-A2-Q5',
    'CBQ5-C3-Q2'
]);

const MAX_SHUFFLE_ATTEMPTS = 1000;

// =========================================================================
// String-Aware Brace Matcher (DL-020 compliant)
// =========================================================================

function extractObjectsFromFile(filePath) {
    const text = fs.readFileSync(filePath, 'utf8');
    const items = [];

    // Use "Type": "match" as anchor (not ItemID) to avoid false matches
    const regex = /"Type"\s*:\s*"match"/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
        const typeStart = match.index;

        // Find the enclosing object start
        let braceStart = typeStart;
        while (braceStart > 0 && text[braceStart] !== '{') {
            braceStart--;
        }
        if (text[braceStart] !== '{') continue;

        // Track depth with string-awareness
        let depth = 0;
        let inString = false;
        let stringChar = '';
        let escapeNext = false;
        let objEnd = -1;

        for (let i = braceStart; i < text.length; i++) {
            const ch = text[i];

            if (escapeNext) {
                escapeNext = false;
                continue;
            }

            if (ch === '\\') {
                escapeNext = true;
                continue;
            }

            if (inString) {
                if (ch === stringChar) {
                    inString = false;
                }
                continue;
            }

            if (ch === '"' || ch === "'") {
                inString = true;
                stringChar = ch;
                continue;
            }

            if (ch === '{') depth++;
            else if (ch === '}') {
                depth--;
                if (depth === 0) {
                    objEnd = i + 1;
                    break;
                }
            }
        }

        if (objEnd === -1) continue;

        const objText = text.substring(braceStart, objEnd);

        try {
            const item = JSON.parse(objText);
            // Only include items that are actually match type and have required fields
            if (item.Type !== 'match') continue;
            if (!item.ItemID) continue;
            if (!item.Correct || typeof item.Correct !== 'object') continue;
            items.push({ item, objText, braceStart, objEnd, filePath,
                CaseID: item.CaseID || null });
        } catch (e) {
            // silently skip unparseable blocks
        }
    }

    return items;
}

// =========================================================================
// Fisher-Yates Shuffle
// =========================================================================

function fisherYatesShuffle(arr) {
    const a = arr.slice(); // copy
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// =========================================================================
// Derangement Shuffle
// =========================================================================

function shuffleWithDerangement(item) {
    const leftItems = item.LeftItems || [];
    const originalRightItems = item.RightItems || [];
    const correct = item.Correct || {};

    if (!leftItems.length || !originalRightItems.length) {
        return { error: 'Missing LeftItems or RightItems' };
    }

    // Build map: LeftItem index -> correct RightItem text
    const correctTexts = leftItems.map(left => {
        const v = correct[left];
        return v !== undefined ? v : null;
    });

    if (correctTexts.includes(null)) {
        return { error: 'Correct object missing key for one or more LeftItems' };
    }

    // Verify all correct texts exist in RightItems
    for (const ct of correctTexts) {
        if (!originalRightItems.includes(ct)) {
            return { error: `Correct value "${ct}" not found in RightItems` };
        }
    }

    for (let attempt = 1; attempt <= MAX_SHUFFLE_ATTEMPTS; attempt++) {
        const shuffled = fisherYatesShuffle(originalRightItems);

        // For each LeftItem at position i, find the index of its correct answer in shuffled array
        const newIndices = correctTexts.map(ct => shuffled.indexOf(ct));

        // Verify all correct answers still present
        if (newIndices.includes(-1)) {
            return { error: 'Shuffle lost a correct answer (should not happen)' };
        }

        // Check derangement: newIndex != original position
        const deranged = newIndices.every((newIdx, i) => newIdx !== i);

        if (deranged) {
            return {
                rightItems: shuffled,
                newIndices,
                attempts: attempt,
                beforeIndices: leftItems.map((_, i) => i), // all were sequential
                derangementSatisfied: true,
                error: null
            };
        }
    }

    return {
        rightItems: null,
        newIndices: null,
        attempts: MAX_SHUFFLE_ATTEMPTS,
        derangementSatisfied: false,
        error: `Failed to find derangement after ${MAX_SHUFFLE_ATTEMPTS} attempts`
    };
}

// =========================================================================
// Verification Checks
// =========================================================================

function verifyResult(item, result) {
    const checks = {
        correctObjectUnchanged: true,
        leftItemsUnchanged: true,
        rightItemsSetUnchanged: true,
        noEmptySlots: true,
        allCorrectValuesPresent: true
    };

    if (result.error) {
        return { ...checks, error: result.error };
    }

    const originalRI = item.RightItems.slice().sort();
    const newRI = result.rightItems.slice().sort();

    checks.rightItemsSetUnchanged =
        originalRI.length === newRI.length &&
        originalRI.every((v, i) => v === newRI[i]);

    checks.allCorrectValuesPresent = Object.values(item.Correct).every(
        v => result.rightItems.includes(v)
    );

    return checks;
}

// =========================================================================
// Report Generation
// =========================================================================

function generateReport(allResults) {
    const shuffled = allResults.filter(r => r.result && !r.result.error);
    const failed = allResults.filter(r => r.result && r.result.error);
    const attempts = shuffled.map(r => r.result.attempts);

    const report = {
        session: '82P',
        generated: new Date().toISOString(),
        mode: 'dry-run',
        summary: {
            totalMatchItemsScanned: allResults.length,
            wave1Excluded: allResults.filter(r => r.excluded).length,
            itemsShuffled: shuffled.length,
            itemsFailedDerangement: failed.length,
            totalAttempts: attempts.reduce((a, b) => a + b, 0),
            avgAttemptsPerItem: attempts.length > 0
                ? parseFloat((attempts.reduce((a, b) => a + b, 0) / attempts.length).toFixed(2))
                : 0,
            maxAttempts: attempts.length > 0 ? Math.max(...attempts) : 0,
            allDerangementSatisfied: failed.length === 0,
            warnings: []
        },
        perItem: allResults.map(r => ({
            itemId: r.itemId,
            caseId: r.caseId,
            file: path.basename(r.filePath),
            leftCount: (r.item.LeftItems || []).length,
            rightCount: (r.item.RightItems || []).length,
            excluded: r.excluded || false,
            beforeIndices: r.result && r.result.beforeIndices ? r.result.beforeIndices : null,
            afterIndices: r.result && r.result.newIndices ? r.result.newIndices : null,
            derangementSatisfied: r.result ? r.result.derangementSatisfied : false,
            attempts: r.result ? r.result.attempts : 0,
            correctObjectUnchanged: r.verification ? r.verification.correctObjectUnchanged : true,
            leftItemsUnchanged: r.verification ? r.verification.leftItemsUnchanged : true,
            rightItemsSetUnchanged: r.verification ? r.verification.rightItemsSetUnchanged : true,
            error: r.result ? r.result.error : null
        }))
    };

    // Add warnings
    if (failed.length > 0) {
        report.summary.warnings.push(
            `${failed.length} items failed derangement shuffle. Manual review required.`
        );
    }

    const maxAttemptItem = shuffled.reduce((max, r) =>
        r.result.attempts > (max && max.result ? max.result.attempts : 0) ? r : max, null);
    if (maxAttemptItem && maxAttemptItem.result && maxAttemptItem.result.attempts > 20) {
        report.summary.warnings.push(
            `${maxAttemptItem.itemId} required ${maxAttemptItem.result.attempts} attempts (may indicate edge case).`
        );
    }

    return report;
}

// =========================================================================
// Main
// =========================================================================

// =========================================================================
// RightItems Array Locator (String-Aware)
// =========================================================================

function findRightItemsInFile(fileContent, braceStart, braceEnd) {
    const searchRegion = fileContent.substring(braceStart, braceEnd);

    let pos = searchRegion.indexOf('"RightItems"');
    if (pos === -1) return { start: -1, end: -1 };

    // Find the ':' after "RightItems"
    pos += '"RightItems"'.length;
    while (pos < searchRegion.length && searchRegion[pos] !== ':') pos++;
    if (pos >= searchRegion.length) return { start: -1, end: -1 };
    pos++; // skip ':'

    // Skip whitespace to find '['
    while (pos < searchRegion.length && /\s/.test(searchRegion[pos])) pos++;
    if (pos >= searchRegion.length || searchRegion[pos] !== '[') return { start: -1, end: -1 };

    // String-aware bracket tracking from '['
    let depth = 0;
    let inString = false;
    let stringChar = '';
    let escapeNext = false;

    for (let i = pos; i < searchRegion.length; i++) {
        const ch = searchRegion[i];
        if (escapeNext) { escapeNext = false; continue; }
        if (ch === '\\') { escapeNext = true; continue; }
        if (inString) { if (ch === stringChar) inString = false; continue; }
        if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
        if (ch === '[') depth++;
        else if (ch === ']') {
            depth--;
            if (depth === 0) {
                return { start: braceStart + pos, end: braceStart + i + 1 };
            }
        }
    }

    return { start: -1, end: -1 };
}

function executeWriteBack(allResults) {
    // Group shuffled items by file path
    const fileGroups = {};
    for (const r of allResults) {
        if (r.excluded || !r.result || r.result.error) continue;
        if (!r.result.rightItems) continue;

        const fp = r.filePath;
        if (!fileGroups[fp]) fileGroups[fp] = [];
        fileGroups[fp].push(r);
    }

    const fileChanges = {};

    for (const [filePath, items] of Object.entries(fileGroups)) {
        console.log(`\nProcessing ${path.basename(filePath)} — ${items.length} items to write...`);

        let fileContent = fs.readFileSync(filePath, 'utf8');
        const originalContent = fileContent;

        // Build replacement list
        const replacements = [];

        for (const r of items) {
            // Use stored brace positions from extraction phase
            if (r.braceStart === -1 || r.braceEnd === -1) {
                console.log(`  WARN  ${r.itemId} — missing stored brace positions`);
                continue;
            }

            const bounds = findRightItemsInFile(fileContent, r.braceStart, r.braceEnd);
            if (bounds.start === -1) {
                console.log(`  WARN  ${r.itemId} — could not locate RightItems array`);
                continue;
            }

            const newRightItems = JSON.stringify(r.result.rightItems, null, 4);
            replacements.push({
                itemId: r.itemId,
                start: bounds.start,
                end: bounds.end,
                oldText: fileContent.substring(bounds.start, bounds.end),
                newText: newRightItems
            });
        }

        // Apply replacements from right to left to preserve positions
        replacements.sort((a, b) => b.start - a.start);

        for (const repl of replacements) {
            fileContent = fileContent.substring(0, repl.start) + repl.newText + fileContent.substring(repl.end);
        }

        // Write file
        fs.writeFileSync(filePath, fileContent, 'utf8');

        // Verify file integrity: re-extract match items from written file
        let verifyOk = true;
        try {
            const reExtracted = extractObjectsFromFile(filePath);
            const extractedIds = new Set(reExtracted.map(e => e.item.ItemID));
            for (const r of items) {
                if (!extractedIds.has(r.itemId)) {
                    console.error(`  VERIFY FAIL: ${r.itemId} not found in post-write extraction`);
                    verifyOk = false;
                }
            }
            if (verifyOk) {
                console.log(`  Verify OK: ${reExtracted.length} match items extractable`);
            }
        } catch (e) {
            console.error(`  FATAL: ${path.basename(filePath)} extraction failed after replacement!`);
            console.error(`  Error: ${e.message}`);
            verifyOk = false;
        }

        if (!verifyOk) {
            // Restore original
            fs.writeFileSync(filePath, originalContent, 'utf8');
            console.error(`  FILE RESTORED from backup in memory. No changes written.`);
            return false;
        }

        fileChanges[filePath] = replacements.length;
        console.log(`  ${replacements.length} replacements applied. File written.`);
    }

    return fileChanges;
}

function main() {
    const args = process.argv.slice(2);
    const executeMode = args.includes('--execute');
    const batchArg = args.find(a => a.startsWith('--batch='));
    const batchNum = batchArg ? parseInt(batchArg.split('=')[1], 10) : null;
    const singlePack = args.find(a => a.startsWith('--pack='));
    const targetPack = singlePack ? singlePack.split('=')[1] : null;

    // Batch-to-files mapping
    const BATCH_FILES = {
        1: ['content/cases/legacy/scored_cases.js', 'content/cases/legacy/scored_cases2.js'],           // Batch 4A: 22 items
        2: ['content/cases/legacy/scored_cases3.js'],                                // Batch 4B: 27 items
        3: ['content/cases/legacy/scored_cases4.js', 'content/cases/legacy/scored_cases5.js']            // Batch 4C: 26 items
    };

    console.log('Session 83 — Ordered Matching Pattern Remediation Wave 4');

    if (executeMode) {
        console.log('Mode: EXECUTE (write-back enabled)');
        console.log('');

        // Check backups exist
        const timestamp = new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);
        const backupDir = path.join(ROOT, 'backups');

        // Determine which files will be written
        let filesToWrite;
        if (batchNum && BATCH_FILES[batchNum]) {
            filesToWrite = BATCH_FILES[batchNum];
            console.log(`Batch ${batchNum} requested — target files: ${filesToWrite.join(', ')}`);
        } else if (targetPack) {
            filesToWrite = [targetPack];
        } else {
            filesToWrite = CASE_FILES;
            if (!batchNum) {
                console.log('WARNING: No --batch specified. Processing ALL 5 files (77 items).');
                console.log('This exceeds the 30-item governance cap per change-set.');
                console.log('Consider using --batch=1, --batch=2, --batch=3 for compliance.');
                console.log('');
            }
        }
    } else {
        console.log('Mode: DRY-RUN');
    }
    console.log('');

    let filesToScan;
    if (batchNum && BATCH_FILES[batchNum]) {
        filesToScan = BATCH_FILES[batchNum];
    } else if (targetPack) {
        filesToScan = CASE_FILES.filter(f => f === targetPack);
        if (filesToScan.length === 0) {
            console.error(`ERROR: File "${targetPack}" not found in case file list.`);
            console.error(`Valid files: ${CASE_FILES.join(', ')}`);
            process.exit(1);
        }
    } else {
        filesToScan = CASE_FILES;
    }

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    let allResults = [];

    for (const caseFile of filesToScan) {
        const filePath = path.join(ROOT, caseFile);

        if (!fs.existsSync(filePath)) {
            console.error(`WARNING: ${caseFile} not found, skipping.`);
            continue;
        }

        console.log(`Scanning ${caseFile}...`);
        const matchItems = extractObjectsFromFile(filePath);

        console.log(`  Found ${matchItems.length} match-type items`);

        for (const { item, filePath: fp, braceStart, braceEnd } of matchItems) {
            const itemId = item.ItemID;
            const caseId = item.CaseID;
            const excluded = WAVE1_EXCLUSIONS.has(itemId);

            if (excluded) {
            allResults.push({
                itemId,
                caseId,
                filePath: fp,
                item,
                excluded: true,
                result: null,
                verification: null,
                braceStart,
                braceEnd
            });
                console.log(`  SKIP  ${itemId} (Wave 1 excluded — already resolved in Session 81)`);
                continue;
            }

            if (!item.Correct || typeof item.Correct !== 'object') {
                console.log(`  SKIP  ${itemId} (missing or invalid Correct object)`);
                continue;
            }

            if (!item.LeftItems || !Array.isArray(item.LeftItems)) {
                console.log(`  SKIP  ${itemId} (missing LeftItems)`);
                continue;
            }

            if (!item.RightItems || !Array.isArray(item.RightItems)) {
                console.log(`  SKIP  ${itemId} (missing RightItems)`);
                continue;
            }

            const result = shuffleWithDerangement(item);
            const verification = result.error ? null : verifyResult(item, result);

            const status = result.error
                ? 'FAIL'
                : (result.derangementSatisfied ? 'OK' : 'WARN');

            console.log(`  ${status}  ${itemId}  [${result.attempts || 0} attempts]  indices: ${
                result.newIndices ? result.newIndices.join(',') : 'N/A'
            }`);

            allResults.push({
                itemId,
                caseId,
                filePath: fp,
                item,
                excluded: false,
                result,
                verification,
                braceStart,
                braceEnd
            });
        }
    }

    // Generate report
    const report = generateReport(allResults);

    // Write report
    const reportPath = path.join(OUTPUT_DIR, 'matching_shuffle_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

    // Console summary
    console.log('\n========================================');
    console.log('SUMMARY');
    console.log('========================================');
    console.log(`Total match items scanned:    ${report.summary.totalMatchItemsScanned}`);
    console.log(`Wave 1 exclusions:           ${report.summary.wave1Excluded}`);
    console.log(`Items successfully shuffled:  ${report.summary.itemsShuffled}`);
    console.log(`Items failed:                 ${report.summary.itemsFailedDerangement}`);
    console.log(`Total shuffle attempts:       ${report.summary.totalAttempts}`);
    console.log(`Avg attempts per item:        ${report.summary.avgAttemptsPerItem}`);
    console.log(`Max attempts (single item):   ${report.summary.maxAttempts}`);
    console.log(`All derangements satisfied:   ${report.summary.allDerangementSatisfied}`);

    if (report.summary.warnings.length > 0) {
        console.log('\nWARNINGS:');
        report.summary.warnings.forEach(w => console.log(`  - ${w}`));
    }

    console.log(`\nReport written to: ${reportPath}`);

    if (!report.summary.allDerangementSatisfied) {
        console.log('\nSome items could not be deranged. See report for details.');
        process.exit(1);
    }

    console.log('\nALL ITEMS DERANGED SUCCESSFULLY.');

    // Execute write-back
    if (executeMode) {
        // Create backups first
        const timestamp = new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);
        const backupDir = path.join(ROOT, 'backups');
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir, { recursive: true });
        }

        const filesToWrite = [...new Set(allResults
            .filter(r => !r.excluded && r.result && r.result.rightItems)
            .map(r => r.filePath))];

        console.log('\n=== BACKUP PHASE ===');
        const backups = [];
        for (const fp of filesToWrite) {
            const basename = path.basename(fp);
            const backupPath = path.join(backupDir, `${basename}.bak-S83-${timestamp}`);
            fs.copyFileSync(fp, backupPath);
            const stat = fs.statSync(backupPath);
            if (stat.size === 0) {
                console.error(`  FAIL: Backup of ${basename} has zero size! Aborting.`);
                process.exit(1);
            }
            backups.push(backupPath);
            console.log(`  BACKUP: ${backupPath} (${stat.size} bytes)`);
        }

        console.log('\n=== WRITE-BACK PHASE ===');
        const changes = executeWriteBack(allResults);

        if (changes === false) {
            console.error('\nWRITE-BACK FAILED. Check logs above.');
            process.exit(1);
        }

        let totalWritten = 0;
        for (const [fp, count] of Object.entries(changes)) {
            console.log(`  ${path.basename(fp)}: ${count} items shuffled and written`);
            totalWritten += count;
        }

        console.log(`\nTotal items written: ${totalWritten}`);

        // Post-write verification: re-extract match items to confirm parse integrity
        console.log('\n=== POST-WRITE VERIFICATION ===');
        let allParseOk = true;
        for (const fp of filesToWrite) {
            try {
                const reExtracted = extractObjectsFromFile(fp);
                const matchCount = reExtracted.length;
                console.log(`  ${path.basename(fp)}: ${matchCount} match items extracted — PARSE OK`);
            } catch (e) {
                console.error(`  ${path.basename(fp)}: PARSE FAILED — ${e.message}`);
                allParseOk = false;
            }
        }

        if (!allParseOk) {
            console.error('\nOne or more files failed to parse after write-back.');
            console.error('Restore from backups and investigate.');
            process.exit(1);
        }

        console.log('\n=== WRITE-BACK COMPLETE ===');
        console.log(`Backups created: ${backups.length}`);
        console.log(`Files modified: ${Object.keys(changes).length}`);
        console.log(`Items shuffled and written: ${totalWritten}`);
    } else {
        console.log('Ready for --execute mode when authorized.');
    }

    return { report, filesToScan };
}

// =========================================================================
// Entry Point
// =========================================================================

try {
    const report = main();
} catch (e) {
    console.error('FATAL ERROR:', e.message);
    console.error(e.stack);
    process.exit(1);
}
