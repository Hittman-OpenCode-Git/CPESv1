// =============================================================
// nightly_feedback_validator.js — Nightly Feedback Completeness Validator
// Session 91P | Governance Light Lane | Read-Only
// =============================================================
// Validates nightly test feedback markdown files for:
//   - Required section presence
//   - Severity classification validity
//   - Category classification validity
//   - Issue count consistency
//   - Completeness of required fields
//
// Does NOT modify any files. Safe to run at any time.
// Usage: node scripts/nightly_feedback_validator.js [path ...]
//        If no paths given, scans reports/nightly_feedback/
// =============================================================

"use strict";

const fs = require('fs');
const path = require('path');

const VALID_SEVERITIES = ['Critical', 'High', 'Medium', 'Low', 'Informational',
                          'S1', 'S2', 'S3', 'S4', 'S5'];

const VALID_CATEGORIES = [
    'Scrolling', 'Layout', 'Timer', 'Rendering', 'Session Flow',
    'May Coaching', 'Theme', 'Performance', 'Input', 'Accessibility', 'Content'
];

const REQUIRED_SECTIONS = [
    'Session Metadata',
    'Startup',
    'Session Flow',
    'Review Flow',
    'May Coaching',
    'History',
    'Session Recovery',
    'Scrolling',
    'Overall Experience',
    'Bugs',
    'Free-Form Notes',
    'Tester Signature'
];

const REQUIRED_METADATA_FIELDS = [
    'Test Date', 'Tester', 'Scenario', 'Browser', 'OS', 'Screen Size', 'Theme Used'
];

const FEEDBACK_DIR = path.join(__dirname, '..', 'reports', 'nightly_feedback');

// ── Results accumulator ───────────────────────────────────────
const RESULTS = { pass: 0, fail: 0, warn: 0, lines: [] };

function log(status, msg) {
    const symbol = status === 'PASS' ? '  OK' : status === 'FAIL' ? 'FAIL' : 'WARN';
    RESULTS.lines.push(`${symbol}  ${msg}`);
    if (status === 'PASS') RESULTS.pass++;
    else if (status === 'FAIL') RESULTS.fail++;
    else RESULTS.warn++;
}

// ── Validator: check section presence by heading ───────────────
function validateSections(content, fileName) {
    for (const section of REQUIRED_SECTIONS) {
        const headingPattern = new RegExp(`##\\s+\\d+\\.\\s*${section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
        if (!headingPattern.test(content)) {
            log('FAIL', `${fileName}: Missing required section "${section}"`);
        } else {
            log('PASS', `${fileName}: Section "${section}" present`);
        }
    }
}

// ── Validator: extract and check metadata table ────────────────
function validateMetadata(content, fileName) {
    const mdSection = content.match(/##\s+\d*\.?\s*Session Metadata[\s\S]*?(?=##\s+\d*\.?\s*Startup|$)/i);
    if (!mdSection) {
        log('WARN', `${fileName}: Cannot find Session Metadata section`);
        return;
    }
    const tableRows = mdSection[0].match(/\|\s*\*\*([^*]+)\*\*\s*\|[^|]*\|/g);
    if (!tableRows) {
        log('WARN', `${fileName}: No metadata table rows found`);
        return;
    }
    for (const field of REQUIRED_METADATA_FIELDS) {
        let found = false;
        for (const row of tableRows) {
            if (row.toLowerCase().includes(field.toLowerCase())) {
                const valueMatch = row.match(/\|\s*\*\*[^*]+\*\*\s*\|\s*([^|]*)\s*\|/);
                const value = valueMatch ? valueMatch[1].trim() : '';
                if (value && value !== 'YYYY-MM-DD' && value !== 'HH:MM') {
                    found = true;
                    break;
                }
            }
        }
        if (!found) {
            log('WARN', `${fileName}: Metadata field "${field}" empty or placeholder`);
        }
    }
    log('PASS', `${fileName}: Metadata table structure valid`);
}

// ── Validator: check Pass/Fail consistency ────────────────────
function validatePassFailConsistency(content, fileName) {
    const passFailRows = content.match(/\|\s*([^|]*?)\s*\|\s*(Pass|Fail|N\/A)\s*\|/gi);
    if (!passFailRows) {
        log('WARN', `${fileName}: No Pass/Fail check rows found`);
        return;
    }
    let passCount = 0;
    let failCount = 0;
    for (const row of passFailRows) {
        if (/fail/i.test(row) && !/n\/a/i.test(row)) failCount++;
        else if (/pass/i.test(row)) passCount++;
    }
    log('PASS', `${fileName}: Pass/Fail checks: ${passCount} PASS, ${failCount} FAIL`);
    if (failCount > 0) {
        log('WARN', `${fileName}: ${failCount} FAIL(s) detected in tests`);
    }
}

// ── Validator: check severity labels ──────────────────────────
function validateSeverityLabels(content, fileName) {
    const severityPattern = /\*\*Severity\*\*\s*\|\s*(Critical|High|Medium|Low|Informational|S[1-5])/gi;
    const matches = content.match(severityPattern);
    if (matches) {
        const severities = matches.map(m => {
            const parts = m.split('|');
            return (parts[1] || '').trim();
        });
        let invalidCount = 0;
        for (const sev of severities) {
            const normalized = sev.replace('S1', 'Critical').replace('S2', 'High')
                                  .replace('S3', 'Medium').replace('S4', 'Low')
                                  .replace('S5', 'Informational');
            if (!VALID_SEVERITIES.includes(normalized) && !VALID_SEVERITIES.includes(sev)) {
                invalidCount++;
                log('WARN', `${fileName}: Unrecognized severity "${sev}"`);
            }
        }
        if (invalidCount === 0) {
            log('PASS', `${fileName}: ${severities.length} severity label(s) — all valid`);
        }
    }
}

// ── Validator: check category labels ──────────────────────────
function validateCategoryLabels(content, fileName) {
    const categoryPattern = /\*\*Category\*\*\s*\|\s*([^|]*)\|/gi;
    let match;
    let catCount = 0;
    let invalidCount = 0;
    while ((match = categoryPattern.exec(content)) !== null) {
        catCount++;
        const cat = match[1].trim();
        if (!VALID_CATEGORIES.includes(cat)) {
            invalidCount++;
            log('WARN', `${fileName}: Unrecognized category "${cat}"`);
        }
    }
    if (catCount > 0 && invalidCount === 0) {
        log('PASS', `${fileName}: ${catCount} category label(s) — all valid`);
    } else if (catCount === 0) {
        log('WARN', `${fileName}: No category labels found`);
    }
}

// ── Validator: check issue count consistency ──────────────────
function validateIssueCounts(content, fileName) {
    const issueHeaders = content.match(/### Issue \d+/gi);
    const headerCount = issueHeaders ? issueHeaders.length : 0;
    const descriptionFields = content.match(/\*\*Description\*\*/gi);
    const descCount = descriptionFields ? descriptionFields.length : 0;
    if (headerCount === 0 && descCount === 0) {
        log('PASS', `${fileName}: No issues reported (0 issues)`);
    } else if (headerCount === descCount) {
        log('PASS', `${fileName}: Issue count consistent — ${headerCount} issue(s) reported`);
    } else {
        log('WARN', `${fileName}: Issue count mismatch — ${headerCount} headers vs ${descCount} descriptions`);
    }
}

// ── Validator: check for completion markers ───────────────────
function validateCompletionMarkers(content, fileName) {
    const overallVerdict = content.match(/\*\*Overall Verdict\*\*\s*\|\s*([^|]*)\|/i);
    if (overallVerdict && overallVerdict[1].trim()) {
        const verdict = overallVerdict[1].trim();
        if (verdict === 'Ready' || verdict === 'Minor Issues' || verdict === 'Blocking Issues') {
            log('PASS', `${fileName}: Overall verdict: ${verdict}`);
        } else {
            log('WARN', `${fileName}: Unrecognized verdict "${verdict}"`);
        }
    } else {
        log('WARN', `${fileName}: No Overall Verdict found — form may be incomplete`);
    }
}

// ── Validator: check file naming convention ───────────────────
function validateFileName(filePath) {
    const base = path.basename(filePath, '.md');
    const pattern = /^NIGHTLY_FEEDBACK_\d{4}-\d{2}-\d{2}$/;
    if (pattern.test(base)) {
        log('PASS', `${base}.md: Filename format valid`);
        return true;
    }
    const altPattern = /^NIGHTLY_FEEDBACK_.+/i;
    if (altPattern.test(base)) {
        log('WARN', `${base}.md: Filename not in standard format (expected NIGHTLY_FEEDBACK_YYYY-MM-DD.md)`);
        return true;
    }
    log('WARN', `${base}.md: Unrecognized filename format`);
    return true;
}

// ── Main validation for a single file ─────────────────────────
function validateFile(filePath) {
    if (!fs.existsSync(filePath)) {
        log('FAIL', `${filePath}: File not found`);
        return;
    }
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) {
        log('FAIL', `${filePath}: Not a regular file`);
        return;
    }
    const fileName = path.basename(filePath);
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.trim().length === 0) {
        log('FAIL', `${fileName}: File is empty`);
        return;
    }
    log('PASS', `${fileName}: File loaded (${Math.round(stats.size / 1024)} KB)`);
    validateFileName(filePath);
    validateSections(content, fileName);
    validateMetadata(content, fileName);
    validatePassFailConsistency(content, fileName);
    validateSeverityLabels(content, fileName);
    validateCategoryLabels(content, fileName);
    validateIssueCounts(content, fileName);
    validateCompletionMarkers(content, fileName);
}

// ── Scan feedback directory for files ─────────────────────────
function findFeedbackFiles() {
    if (!fs.existsSync(FEEDBACK_DIR)) {
        return [];
    }
    const entries = fs.readdirSync(FEEDBACK_DIR);
    return entries
        .filter(f => f.endsWith('.md'))
        .map(f => path.join(FEEDBACK_DIR, f))
        .sort();
}

// ── Main ────────────────────────────────────────────────────────────
function main() {
    const args = process.argv.slice(2);
    let files = args;

    if (files.length === 0) {
        files = findFeedbackFiles();
        if (files.length === 0) {
            console.log('\n=== NIGHTLY FEEDBACK VALIDATOR ===');
            console.log('Session 91P | Governance Light | ' + new Date().toISOString());
            console.log('');
            log('WARN', 'No feedback files found in reports/nightly_feedback/');
            log('PASS', 'Validator ran successfully with empty input');
            console.log(`\n=== RESULTS: ${RESULTS.pass} PASS, ${RESULTS.fail} FAIL, ${RESULTS.warn} WARN ===`);
            console.log('\n*** READY — Awaiting first nightly feedback file. ***');
            console.log('    Place completed feedback forms in: reports/nightly_feedback/');
            console.log('    Filename format: NIGHTLY_FEEDBACK_YYYY-MM-DD.md');
            process.exit(0);
        }
    }

    console.log('\n=== NIGHTLY FEEDBACK VALIDATOR ===');
    console.log('Session 91P | Governance Light | ' + new Date().toISOString());
    console.log(`Files to validate: ${files.length}`);
    console.log('');

    for (const f of files) {
        validateFile(f);
    }

    console.log(`\n=== RESULTS: ${RESULTS.pass} PASS, ${RESULTS.fail} FAIL, ${RESULTS.warn} WARN ===`);

    if (RESULTS.fail === 0 && RESULTS.warn === 0) {
        console.log('\n*** ALL CHECKS PASS — Feedback forms are complete and valid. ***');
        process.exit(0);
    } else if (RESULTS.fail === 0 && RESULTS.warn > 0) {
        console.log('\n*** VALID WITH WARNINGS — Review warnings before filing summary. ***');
        process.exit(0);
    } else {
        console.log('\n*** VALIDATION FAILURES — Address FAIL items before proceeding. ***');
        process.exit(1);
    }
}

main();
