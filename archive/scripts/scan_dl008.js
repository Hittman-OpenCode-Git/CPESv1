/**
 * scan_dl008.js v2
 * Scans all pack files for DL-008 occurrences:
 *   ExplanationWrong[CorrectChoice] is non-empty.
 *
 * Uses proper JSON parsing of the MCQ_BANK_* arrays.
 *
 * Usage: node scripts/scan_dl008.js
 */

const fs = require('fs');
const path = require('path');

const PACKS = [
    { file: 'pack_a_corrected.js', varName: 'MCQ_BANK_A' },
    { file: 'pack_b_corrected.js', varName: 'MCQ_BANK_B' },
    { file: 'pack_c_corrected.js', varName: 'MCQ_BANK_C' },
    { file: 'pack_d_corrected.js', varName: 'MCQ_BANK_D' },
    { file: 'pack_e_corrected.js', varName: 'MCQ_BANK_E' }
];

function extractMcqArray(content, varName) {
    // Find const VAR_NAME = [ ... ];
    const re = new RegExp(
        `(?:const|let|var)\\s+${varName}\\s*=\\s*\\[([\\s\\S]*?)\\];`,
        'm'
    );
    const m = content.match(re);
    if (!m) return null;
    let arrayStr = '[' + m[1] + ']';
    // Remove trailing commas before ] (JSON5-style)
    arrayStr = arrayStr.replace(/,\s*\]/g, ']');
    try {
        return JSON.parse(arrayStr);
    } catch (e) {
        console.error(`  JSON parse error for ${varName}: ${e.message}`);
        return null;
    }
}

function main() {
    const allResults = [];

    for (const { file, varName } of PACKS) {
        const packPath = path.join(__dirname, '..', file);
        if (!fs.existsSync(packPath)) {
            console.error(`Skipping — not found: ${packPath}`);
            continue;
        }
        const content = fs.readFileSync(packPath, 'utf8');
        const questions = extractMcqArray(content, varName);
        if (!questions) {
            console.error(`Could not extract ${varName} from ${file}`);
            continue;
        }

        let packCount = 0;
        for (const q of questions) {
            const qid = q.QuestionID;
            const correct = q.CorrectChoice;
            if (!qid || !correct) continue;
            const fieldName = 'ExplanationWrong' + correct;
            const value = q[fieldName];
            if (value !== undefined && value !== null && String(value).trim() !== '') {
                allResults.push({
                    qid,
                    pack: file,
                    correctChoice: correct,
                    field: fieldName,
                    content: String(value).length > 100
                        ? String(value).substring(0, 97) + '...'
                        : String(value),
                    fullLength: String(value).length
                });
                packCount++;
            }
        }
        console.log(`  ${file} (${varName}): ${packCount} occurrence(s)`);
    }

    // Sort by QID
    allResults.sort((a, b) => a.qid.localeCompare(b.qid));

    console.log('\n=== DL-008 Scan Results: ExplanationWrong[CorrectChoice] non-empty ===\n');
    if (allResults.length === 0) {
        console.log('No occurrences found. DL-008 is clean.');
        return;
    }

    console.log(`Total: ${allResults.length} occurrences across all packs.\n`);
    console.log('QID'.padEnd(16) + 'Pack'.padEnd(24) + 'Correct'.padEnd(10) + 'Field'.padEnd(22) + 'Content (truncated)');
    console.log(''.padEnd(16, '-') + ' ' + ''.padEnd(23, '-') + ' ' + ''.padEnd(9, '-') + ' ' + ''.padEnd(21, '-') + ' ' + ''.padEnd(60, '-'));

    for (const r of allResults) {
        console.log(
            r.qid.padEnd(16) +
            r.pack.padEnd(24) +
            r.correctChoice.padEnd(10) +
            r.field.padEnd(22) +
            r.content
        );
    }

    // Summary by pack
    console.log('\n=== By Pack ===');
    const byPack = {};
    for (const r of allResults) {
        byPack[r.pack] = (byPack[r.pack] || 0) + 1;
    }
    for (const [pack, count] of Object.entries(byPack).sort()) {
        console.log(`  ${pack}: ${count}`);
    }

    // First 10 for spot-check
    console.log('\n=== First 10 for Spot-Check ===\n');
    const spotCheck = allResults.slice(0, 10);
    for (const r of spotCheck) {
        console.log(`${r.qid} (${r.pack}) — ${r.field} = "${r.content}"`);
    }
    console.log(`\nShowing first ${Math.min(10, allResults.length)} of ${allResults.length} total.`);

    // Write full report
    const reportPath = path.join(__dirname, '..', 'reports', 'DL008_SCAN_REPORT.md');
    let report = '# DL-008 Scan Report\n\n';
    report += `**Date:** ${new Date().toISOString().split('T')[0]}\n`;
    report += `**Total occurrences:** ${allResults.length}\n\n`;
    report += '| QID | Pack | CorrectChoice | Field | Content |\n';
    report += '|-----|------|---------------|-------|---------|\n';
    for (const r of allResults) {
        const safeContent = r.content.replace(/\|/g, '\\|');
        report += `| ${r.qid} | ${r.pack} | ${r.correctChoice} | ${r.field} | ${safeContent} |\n`;
    }
    fs.writeFileSync(reportPath, report, 'utf8');
    console.log(`\nFull report → reports/DL008_SCAN_REPORT.md`);
}

main();
