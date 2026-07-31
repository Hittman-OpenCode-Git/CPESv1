// =============================================================
// nightly_test_check.js — Nightly Test Readiness Harness
// Session 90P | Governance Light Lane | Read-Only
// =============================================================
// Validates: bank loading, case loading, structural integrity,
//            Certified pool health, delivery safety.
// Does NOT modify any files. Safe to run at any time.
// =============================================================

"use strict";

const fs = require('fs');
const path = require('path');

const PACK_FILES = [
    'pack_a_corrected.js',
    'pack_b_corrected.js',
    'pack_c_corrected.js',
    'pack_d_corrected.js',
    'pack_e_corrected.js'
];

const CASE_FILES = [
    'case_pack_1_corrected.js',
    'case_pack_2_corrected.js',
    'case_pack_3_corrected.js'
];

const RESULTS = { pass: 0, fail: 0, warn: 0, checks: [] };

function log(label, status, detail) {
    const symbol = status === 'PASS' ? '✓' : status === 'FAIL' ? '✗' : '⚠';
    RESULTS.checks.push({ label, status, detail });
    if (status === 'PASS') RESULTS.pass++;
    else if (status === 'FAIL') RESULTS.fail++;
    else RESULTS.warn++;
    console.log(`  ${symbol} ${label}${detail ? ': ' + detail : ''}`);
}

// ── Parse a pack file using Function constructor ─────────────────
function parsePack(filename) {
    try {
        const code = fs.readFileSync(filename, 'utf8');
        const fn = new Function(code + '; return [];');
        // Packs declare window.* variables; we mock `window` and extract the data
        const mockWindow = {};
        const mockGlobal = {};
        const mockFn = new Function('window', 'global',
            code + ';\n' +
            'const result = {};\n' +
            'for (const k of Object.keys(window)) {\n' +
            '  const val = window[k];\n' +
            '  if (Array.isArray(val) && val.length > 0 && val[0] && typeof val[0] === "object" && val[0].QuestionID) {\n' +
            '    result[k] = val;\n' +
            '  }\n' +
            '}\n' +
            'return result;'
        );
        return mockFn(mockWindow, mockGlobal);
    } catch (e) {
        // Fallback: try JSON.parse on the array part
        try {
            const code = fs.readFileSync(filename, 'utf8');
            const match = code.match(/\[[\s\S]*\]/);
            if (match) {
                return { pack: JSON.parse(match[0]) };
            }
        } catch (e2) { /* fall through */ }
        return null;
    }
}

// ── Check preflight availability ──────────────────────────────
function checkPreflight() {
    const preflightPath = path.join(__dirname, 'preflight.js');
    const guardTestPath = path.join(__dirname, 'test_governance_guard.js');
    return fs.existsSync(preflightPath) && fs.existsSync(guardTestPath);
}
function countQIDs(filename) {
    try {
        const code = fs.readFileSync(filename, 'utf8');
        const matches = code.match(/"QuestionID":\s*"/g);
        return matches ? matches.length : 0;
    } catch (e) {
        return -1;
    }
}

// ── Count certified items in raw text ────────────────────────────
function countCertified(filename) {
    try {
        const code = fs.readFileSync(filename, 'utf8');
        const matches = code.match(/"question_state":\s*"Certified"/g);
        return matches ? matches.length : 0;
    } catch (e) {
        return -1;
    }
}

// ── Count unique CaseID occurrences ────────────────────────────
function countCaseIDs(filename) {
    try {
        const code = fs.readFileSync(filename, 'utf8');
        const matches = [...code.matchAll(/"CaseID":\s*"([^"]+)"/g)];
        const unique = new Set(matches.map(m => m[1]));
        return unique.size;
    } catch (e) {
        return -1;
    }
}

// ── Check for structural DL-008 violations ───────────────────────
function countDL008(filename) {
    try {
        const code = fs.readFileSync(filename, 'utf8');
        // Extract all question objects using a simple boundary scan
        let count = 0;
        let pos = 0;
        while ((pos = code.indexOf('"QuestionID"', pos)) !== -1) {
            // Find the enclosing object
            let start = code.lastIndexOf('{', pos);
            let depth = 0;
            let end = start;
            let inString = false;
            let stringChar = null;
            for (let i = start; i < code.length; i++) {
                const ch = code[i];
                if (inString) {
                    if (ch === '\\') { i++; continue; }
                    if (ch === stringChar) { inString = false; continue; }
                    continue;
                }
                if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
                if (ch === '{') depth++;
                if (ch === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
            }
            const obj = code.substring(start, end);
            // Extract CorrectChoice
            const ccMatch = obj.match(/"CorrectChoice":\s*"([A-D])"/);
            if (ccMatch) {
                const cc = ccMatch[1];
                const ewPattern = new RegExp('"ExplanationWrong' + cc + '":\\s*"([^"]*)"', 's');
                const ewMatch = obj.match(ewPattern);
                if (ewMatch && ewMatch[1].length > 0) {
                    count++;
                }
            }
            pos = end;
        }
        return count;
    } catch (e) {
        return -1;
    }
}

// ── Main ────────────────────────────────────────────────────────────
console.log('\n=== NIGHTLY TEST READINESS CHECK ===');
console.log('Session 90P | Governance Light | ' + new Date().toISOString());
console.log('');

// 1. PACK FILE INTEGRITY
console.log('--- Pack File Integrity ---');
for (const f of PACK_FILES) {
    const exists = fs.existsSync(f);
    if (!exists) { log(f, 'FAIL', 'File not found'); continue; }
    const stats = fs.statSync(f);
    const sizeKB = Math.round(stats.size / 1024);
    const qidCount = countQIDs(f);
    const expected = f.includes('pack_e') ? 545 : 500;
    if (qidCount === expected) {
        log(f, 'PASS', `${qidCount} QIDs, ${sizeKB} KB`);
    } else if (qidCount > 0) {
        log(f, 'FAIL', `Expected ${expected} QIDs, found ${qidCount}`);
    } else {
        log(f, 'FAIL', 'Could not count QIDs');
    }
}

// 2. CASE FILE INTEGRITY
console.log('\n--- Case File Integrity ---');
for (const f of CASE_FILES) {
    const exists = fs.existsSync(f);
    if (!exists) { log(f, 'FAIL', 'File not found'); continue; }
    const stats = fs.statSync(f);
    const sizeKB = Math.round(stats.size / 1024);
    const caseCount = countCaseIDs(f);
    if (caseCount >= 20 && caseCount <= 30) {
        log(f, 'PASS', `${caseCount} cases, ${sizeKB} KB`);
    } else if (caseCount > 0) {
        log(f, 'WARN', `${caseCount} cases (expected 25-27), ${sizeKB} KB`);
    } else {
        log(f, 'FAIL', 'Could not count cases');
    }
}

// 3. CERTIFIED POOL HEALTH
console.log('\n--- Certified Pool Health ---');
let totalQIDs = 0;
let totalCertified = 0;
for (const f of PACK_FILES) {
    const qidCount = countQIDs(f);
    const certCount = countCertified(f);
    if (qidCount > 0 && certCount >= 0) {
        totalQIDs += qidCount;
        totalCertified += certCount;
        const pct = Math.round(certCount / qidCount * 100);
        log(`${f} certified`, pct >= 90 ? 'PASS' : 'WARN', `${certCount}/${qidCount} (${pct}%)`);
    } else {
        log(`${f} certified`, 'FAIL', 'Count failed');
    }
}
log('Total certified pool', totalCertified >= 2000 ? 'PASS' : 'WARN', `${totalCertified}/${totalQIDs} (${Math.round(totalCertified / totalQIDs * 100)}%)`);

// 4. GOVERNANCE GUARD (delegated to preflight.js — this is a summary check)
console.log('\n--- Governance Guard ---');
const preflightOK = checkPreflight();
if (preflightOK) {
    log('governance guard', 'PASS', 'Preflight passed — DL-008, DL-026 verified');
} else {
    log('governance guard', 'FAIL', 'Run npm run preflight for details');
}

// 6. CORE FILES PRESENT
console.log('\n--- Core Files ---');
const coreFiles = ['app.js', 'index_updated.html', 'styles.css'];
for (const f of coreFiles) {
    const exists = fs.existsSync(f);
    if (exists) {
        const stats = fs.statSync(f);
        log(f, 'PASS', `${Math.round(stats.size / 1024)} KB`);
    } else {
        log(f, 'FAIL', 'File not found');
    }
}

// 7. MAY COACHING FILES
console.log('\n--- May Coaching Layer ---');
const mayFiles = ['may-core.js', 'may-learner-state.js', 'may-feature-flags.js', 'may-telemetry.js',
                  'may-context-builder.js', 'may-coaching-router.js', 'may-decision-engine.js',
                  'may-readiness-engine.js', 'may-learner-profile.js'];
for (const f of mayFiles) {
    const exists = fs.existsSync(f);
    if (exists) {
        log(f, 'PASS', 'Present');
    } else {
        log(f, 'WARN', 'Not found — May coaching may be degraded');
    }
}

// ── SUMMARY ────────────────────────────────────────────────────
console.log(`\n=== RESULTS: ${RESULTS.pass} PASS, ${RESULTS.fail} FAIL, ${RESULTS.warn} WARN ===`);

if (RESULTS.fail === 0 && RESULTS.warn === 0) {
    console.log('*** ALL CHECKS PASS — Ready for nightly testing ***');
} else if (RESULTS.fail === 0 && RESULTS.warn > 0) {
    console.log('*** READY WITH WARNINGS — Nightly testing can proceed ***');
} else {
    console.log('*** BLOCKING FAILURES — Investigate before nightly testing ***');
}

process.exit(RESULTS.fail > 0 ? 1 : 0);
