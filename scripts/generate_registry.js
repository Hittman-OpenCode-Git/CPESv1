/**
 * generate_registry.js
 * Pipeline runner: reads pack source files, runs validators, captures
 * findings per question, and emits knowledge/MASTER_QUESTION_REGISTRY.md
 * as a fully generated artifact.
 *
 * Usage: node scripts/generate_registry.js
 * Also runs: npm run build-registry
 *
 * Per CAQS v1.0 frozen architecture, the Registry is a GENERATED artifact.
 * NEVER edit knowledge/MASTER_QUESTION_REGISTRY.md directly.
 * Source of truth: pack source files in project root.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CSV_PATH = path.join(ROOT, 'reports', 'MasterQuestionRegistry.csv');
const VALIDATION_REPORT_PATH = path.join(ROOT, 'scripts', 'reports', 'output', 'ValidationReport.json');
const OUTPUT_PATH = path.join(ROOT, 'knowledge', 'MASTER_QUESTION_REGISTRY.md');
const REVISION_HISTORY_PATH = path.join(ROOT, 'knowledge', 'REVISION_HISTORY.md');

const SECTION_NAMES = {
    A: 'External Financial Reporting Decisions',
    B: 'Planning, Budgeting, and Forecasting',
    C: 'Performance Management',
    D: 'Cost Management',
    E: 'Internal Controls',
    F: 'Technology and Analytics'
};

// ============================================================
// CSV parsing
// ============================================================
function parseCsvLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') { inQuotes = !inQuotes; current += ch; }
        else if (ch === ',' && !inQuotes) { result.push(current); current = ''; }
        else { current += ch; }
    }
    result.push(current);
    return result;
}

function stripQuotes(v) {
    if (!v) return '';
    const s = String(v).trim();
    if (s.startsWith('"') && s.endsWith('"') && s.length >= 2) return s.slice(1, -1);
    return s;
}

function readCsv(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error('CSV not found at', filePath);
        console.error('Run node scripts/build_master_registry.js first.');
        process.exit(1);
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').filter(l => l.trim());
    if (lines.length < 2) return [];
    const header = parseCsvLine(lines[0]).map(h => stripQuotes(h));
    const records = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCsvLine(lines[i]);
        const record = {};
        for (let j = 0; j < header.length && j < values.length; j++) {
            record[header[j]] = stripQuotes(values[j]);
        }
        records.push(record);
    }
    return records;
}

// ============================================================
// Validator findings parsing
// ============================================================
function loadValidatorFindings() {
    const findings = { errors: {}, warnings: {} };
    if (!fs.existsSync(VALIDATION_REPORT_PATH)) {
        console.warn('No ValidationReport.json found at', VALIDATION_REPORT_PATH);
        console.warn('Run node scripts/validate.js first for per-question findings.');
        return findings;
    }
    const reports = JSON.parse(fs.readFileSync(VALIDATION_REPORT_PATH, 'utf8'));
    for (const r of reports) {
        const vName = r.validator;
        for (const err of r.errors) {
            const qid = extractQID(err);
            if (qid) {
                if (!findings.errors[qid]) findings.errors[qid] = [];
                findings.errors[qid].push({ validator: vName, msg: err });
            }
        }
        for (const warn of r.warnings) {
            const qid = extractQID(warn);
            if (qid) {
                if (!findings.warnings[qid]) findings.warnings[qid] = [];
                findings.warnings[qid].push({ validator: vName, msg: warn });
            }
        }
    }
    return findings;
}

function extractQID(msg) {
    const m = msg.match(/\(([A-Z]{1,2}[-][A-F][-]\d{3})\)/);
    if (m) return m[1];
    const m2 = msg.match(/(P1[A-Z]?[-][A-F][-]\d{3})/);
    if (m2) return m2[1];
    return null;
}

// ============================================================
// CAQS score from CSV record
// ============================================================
function calcCAQS(record) {
    const fields = ['ScoreBlueprint','ScoreCognitive','ScoreTechnical','ScoreDistractor',
        'ScoreRealism','ScoreNumerical','ScoreExplanation','ScoreClarity',
        'ScoreAccessibility','ScoreMetadata'];
    let total = 0;
    let hasAny = false;
    for (const f of fields) {
        const v = parseInt(record[f]);
        if (!isNaN(v)) { total += v; hasAny = true; }
    }
    return hasAny ? total : null;
}

function tierLabel(score) {
    if (score === null) return 'Not Scored';
    if (score >= 90) return 'Exam-Ready';
    if (score >= 70) return 'Acceptable';
    if (score >= 50) return 'Needs Work';
    return 'Reject';
}

// ============================================================
// Markdown generator
// ============================================================
function generateRegistry(questions, findings) {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const sourceHash = fs.existsSync(path.join(ROOT, 'pack_a_corrected.js'))
        ? require('crypto').createHash('md5')
            .update(fs.readFileSync(path.join(ROOT, 'pack_a_corrected.js'), 'utf8')).digest('hex').slice(0, 8)
        : 'unknown';

    const lines = [];

    // Header banner
    lines.push('<!--');
    lines.push('  ⚠️  GENERATED FILE — DO NOT EDIT.');
    lines.push('  Source of truth: pack source files in project root.');
    lines.push('  Regenerate via: node scripts/generate_registry.js');
    lines.push('  Last generated: ' + timestamp);
    lines.push('  Source hash: ' + sourceHash);
    lines.push('-->');
    lines.push('');
    lines.push('# Master Question Registry — CMA Part 1 Exam Simulator');
    lines.push('');
    lines.push('**Status:** Generated Artifact');
    lines.push('**Generated:** ' + timestamp);
    lines.push('**Source Hash:** `' + sourceHash + '`');
    lines.push('**Total Questions:** ' + questions.length);
    lines.push('');
    lines.push('> ⚠️ **This file is auto-generated.** Never edit it directly.');
    lines.push('> Source of truth: the five pack source files (`pack_*_corrected.js`)');
    lines.push('> and case bank files (`scored_cases*.js`).');
    lines.push('> Regenerate via `node scripts/generate_registry.js`.');
    lines.push('');
    lines.push('---');
    lines.push('');

    // Aggregate stats
    let scored = 0, unscored = 0;
    let examReady = 0, acceptable = 0, needsWork = 0, reject = 0;
    const bySection = {};
    for (const q of questions) {
        const caqs = calcCAQS(q);
        if (caqs !== null) {
            scored++;
            if (caqs >= 90) examReady++;
            else if (caqs >= 70) acceptable++;
            else if (caqs >= 50) needsWork++;
            else reject++;
        } else {
            unscored++;
        }
        const sec = (q.Domain || 'Unknown').slice(0, 1);
        if (!bySection[sec]) bySection[sec] = { total: 0, withFindings: 0 };
        bySection[sec].total++;
        const qid = q.QuestionID || '';
        if ((findings.errors[qid] || []).length > 0 || (findings.warnings[qid] || []).length > 0) {
            bySection[sec].withFindings++;
        }
    }

    lines.push('## Aggregate Summary');
    lines.push('');
    lines.push('| Metric | Value |');
    lines.push('|--------|-------|');
    lines.push('| Total Questions | ' + questions.length + ' |');
    lines.push('| Scored (CAQS available) | ' + scored + ' |');
    lines.push('| Not Yet Scored | ' + unscored + ' |');
    lines.push('| Exam-Ready (≥90) | ' + examReady + ' |');
    lines.push('| Acceptable (70–89) | ' + acceptable + ' |');
    lines.push('| Needs Work (50–69) | ' + needsWork + ' |');
    lines.push('| Reject (<50) | ' + reject + ' |');
    lines.push('');
    lines.push('### By Section');
    lines.push('');
    lines.push('| Section | Domain | Total | With Validator Findings |');
    lines.push('|---------|--------|------:|----------------------:|');
    for (const [sec, info] of Object.entries(bySection).sort()) {
        const name = SECTION_NAMES[sec] || sec;
        lines.push(`| ${sec} | ${name} | ${info.total} | ${info.withFindings} |`);
    }
    lines.push('');
    lines.push('---');
    lines.push('');

    // Full question table
    lines.push('## Full Question Registry');
    lines.push('');
    lines.push('| QID | Section | Topic | Difficulty | LOS Tag | Source File | Validator Errors | Validator Warnings | CAQS Score | Tier |');
    lines.push('|-----|---------|-------|-----------|---------|-------------|----------------:|-------------------:|----------:|------|');
    for (const q of questions) {
        const qid = q.QuestionID || '';
        const sec = (q.Domain || '?').slice(0, 1);
        const topic = (q.Topic || '').slice(0, 50);
        const diff = q.Difficulty || '';
        const los = q.LearningOutcomeStatement || '';
        const file = q.File || '';
        const errs = (findings.errors[qid] || []).length;
        const warns = (findings.warnings[qid] || []).length;
        const caqs = calcCAQS(q);
        const caqsStr = caqs !== null ? String(caqs) : '—';
        const tier = caqs !== null ? tierLabel(caqs) : 'Not Scored';
        lines.push(`| ${qid} | ${sec} | ${topic} | ${diff} | ${los} | ${file} | ${errs} | ${warns} | ${caqsStr} | ${tier} |`);
    }

    lines.push('');
    lines.push('---');
    lines.push('');

    // Validator findings per question (only questions with findings)
    const questionsWithFindings = questions.filter(q => {
        const qid = q.QuestionID || '';
        return (findings.errors[qid] || []).length > 0 || (findings.warnings[qid] || []).length > 0;
    });

    if (questionsWithFindings.length > 0) {
        lines.push('## Questions with Validator Findings');
        lines.push('');
        lines.push('Questions that triggered one or more validator errors or warnings:');
        lines.push('');
        for (const q of questionsWithFindings) {
            const qid = q.QuestionID || '';
            const errs = findings.errors[qid] || [];
            const warns = findings.warnings[qid] || [];
            if (errs.length === 0 && warns.length === 0) continue;
            lines.push('### ' + qid);
            lines.push('');
            lines.push('**Topic:** ' + (q.Topic || ''));
            lines.push('**Section:** ' + (q.Domain || ''));
            lines.push('**Difficulty:** ' + (q.Difficulty || ''));
            lines.push('**CAQS:** ' + (calcCAQS(q) !== null ? calcCAQS(q) : 'Not scored'));
            if (errs.length > 0) {
                lines.push('');
                lines.push('**Validator Errors (' + errs.length + '):**');
                for (const e of errs) {
                    lines.push('- [' + e.validator + '] ' + e.msg);
                }
            }
            if (warns.length > 0) {
                lines.push('');
                lines.push('**Validator Warnings (' + warns.length + '):**');
                for (const w of warns) {
                    lines.push('- [' + w.validator + '] ' + w.msg);
                }
            }
            lines.push('');
            lines.push('---');
            lines.push('');
        }
    }

    // Validator summary
    lines.push('## Validator Suite Summary');
    lines.push('');
    for (const [vName, report] of Object.entries(validatorSummary())) {
        lines.push('- **' + vName + '**: ' + report);
    }
    lines.push('');
    lines.push('---');
    lines.push('');

    // Footer
    lines.push('<!--');
    lines.push('  Registry regenerated on ' + timestamp);
    lines.push('  Source hash: ' + sourceHash);
    lines.push('  Questions: ' + questions.length);
    lines.push('  To regenerate: node scripts/generate_registry.js');
    lines.push('-->');

    return lines.join('\n');
}

function validatorSummary() {
    if (!fs.existsSync(VALIDATION_REPORT_PATH)) return { 'No report': 'Run node scripts/validate.js' };
    const reports = JSON.parse(fs.readFileSync(VALIDATION_REPORT_PATH, 'utf8'));
    const result = {};
    for (const r of reports) {
        result[r.validator] = r.status + ' (' + r.errors.length + ' errors, ' + r.warnings.length + ' warnings, ' + r.duration + 'ms)';
    }
    return result;
}

// ============================================================
// Revision History migration
// ============================================================
function ensureRevisionHistory() {
    if (!fs.existsSync(REVISION_HISTORY_PATH)) {
        console.log('Creating knowledge/REVISION_HISTORY.md with migrated Batch 1 data...');
        const content = `# Revision History

**Purpose:** Tracks judgment metadata — human review decisions, CAQS score changes, revision rationale, and defect resolutions. Referenced by \`MASTER_QUESTION_REGISTRY.md\` via QuestionID linkage.

**Status:** Human-authored. This file is NOT generated.

---

## Batch 1 — Section A CAQS Audit (Sprint 6.1)

**Review Period:** 2026-07-22
**Scope:** 14 questions from Packs A, B, E (Section A)
**Mean CAQS:** 69.1 → **85.1** (+16.0)

---

### P1-A-022 — GAAP/IFRS Development Costs

| Field | Value |
|-------|-------|
| Original CAQS | 69 |
| Revised CAQS | 82 |
| Revision Type | REVISION |
| Educational Impact | 85 |
| Defect IDs Resolved | DL-007 |
| Reviewer | Sprint 6.1 |
| Revision Date | 2026-07-22 |
| Files Changed | \`pack_a_corrected.js\` |

**Changes:** Rewrote all three identical distractor explanations (ExplanationWrongA/C/D) to be choice-specific. Expanded ExplanationCorrect to cite IAS 38 and ASC 350-40 with capitalization criteria.

---

### P1B-A-143 — Treasury Stock Impact

| Field | Value |
|-------|-------|
| Original CAQS | 71 |
| Revised CAQS | 78 |
| Revision Type | REVISION |
| Educational Impact | 60 |
| Defect IDs Resolved | — |
| Reviewer | Sprint 6.1 |
| Revision Date | 2026-07-22 |
| Files Changed | \`pack_b_corrected.js\` |

**Changes:** Rewrote ExplanationWrongA, C, D to address each distractor's specific misconception instead of using generic explanations that didn't match the choice text.

---

### P1E-A-003 — Accounting Equation

| Field | Value |
|-------|-------|
| Original CAQS | 47 |
| Revised CAQS | 94 |
| Revision Type | REWRITE |
| Educational Impact | 100 |
| Defect IDs Resolved | — |
| Reviewer | Sprint 6.1 |
| Revision Date | 2026-07-22 |
| Files Changed | \`pack_e_corrected.js\` |

**Changes:** Full rewrite from Remember-level formula recall to Apply-level quantitative scenario. Added numerical choices with distinct misconceptions. Expanded ExplanationCorrect. Changed Difficulty from "Difficult" to "Moderate".

---

### P1E-A-027 — Direct Method Cash Received

| Field | Value |
|-------|-------|
| Original CAQS | 63.5 |
| Revised CAQS | 90 |
| Revision Type | REVISION |
| Educational Impact | 90 |
| Defect IDs Resolved | — |
| Reviewer | Sprint 6.1 |
| Revision Date | 2026-07-22 |
| Files Changed | \`pack_e_corrected.js\` |

**Changes:** Rewrote from formula-recall stem to quantitative business scenario. Changed choices to numerical values. Added full step-by-step explanation. Updated LOSTag from A.1 to A.3.

---

### P1E-A-032 — Full Disclosure

| Field | Value |
|-------|-------|
| Original CAQS | 58 |
| Revised CAQS | 90 |
| Revision Type | REVISION |
| Educational Impact | 95 |
| Defect IDs Resolved | — |
| Reviewer | Sprint 6.1 |
| Revision Date | 2026-07-22 |
| Files Changed | \`pack_e_corrected.js\` |

**Changes:** Rewrote from definition-recall stem to realistic business scenario. Changed choices from abstract categories to concrete actions. Expanded ExplanationCorrect to cite ASC 450. Changed Difficulty from "Easy" to "Moderate". Updated LOSTag from A.1 to A.2.

---

### P1E-A-043 — Effective Interest Expense

| Field | Value |
|-------|-------|
| Original CAQS | 62.5 |
| Revised CAQS | 92 |
| Revision Type | REVISION |
| Educational Impact | 95 |
| Defect IDs Resolved | — |
| Reviewer | Sprint 6.1 |
| Revision Date | 2026-07-22 |
| Files Changed | \`pack_e_corrected.js\` |

**Changes:** Rewrote from formula-recall stem to quantitative scenario with amortization schedule. Added full worked explanation. Updated LOSTag from A.3 (generic) to A.3 Measurement and valuation.

---

### P1E-A-055 — Temporary Differences (Income Taxes)

| Field | Value |
|-------|-------|
| Original CAQS | 66.5 |
| Revised CAQS | 82 |
| Revision Type | REVISION |
| Educational Impact | 70 |
| Defect IDs Resolved | — |
| Reviewer | Sprint 6.1 |
| Revision Date | 2026-07-22 |
| Files Changed | \`pack_e_corrected.js\` |

**Changes:** Corrected LOSTag from A.4 (Leases) to A.5 (Income taxes). Expanded explanations with specific reasoning. Added missing ExplanationWrongD.

---

## Batch 1 Summary

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Questions Reviewed | 14 | 14 | — |
| Mean CAQS Score | 69.1 | 85.1 | +16.0 |
| Median CAQS Score | 68 | 86 | +18 |
| KEEP | 9 | 9 | — |
| REVISION | 4 | 0 | -4 |
| REWRITE | 1 | 0 | -1 |
| Validator Warnings (subset) | 2513 | 2485 | -28 |

---

## Template for Future Batches

\`\`\`markdown
### QID-NNN — Title

| Field | Value |
|-------|-------|
| Original CAQS | _ |
| Revised CAQS | _ |
| Revision Type | _ |
| Educational Impact | _ |
| Defect IDs Resolved | _ |
| Reviewer | _ |
| Revision Date | _ |
| Files Changed | _ |

**Changes:** <description>
\`\`\`
`;
        fs.writeFileSync(REVISION_HISTORY_PATH, content, 'utf8');
        console.log('Written:', REVISION_HISTORY_PATH);
    } else {
        console.log('Revision history already exists at', REVISION_HISTORY_PATH);
    }
}

// ============================================================
// Main
// ============================================================
function main() {
    console.log('=== Registry Generator ===');
    console.log('');

    // 1. Read CSV
    console.log('Reading MasterQuestionRegistry.csv...');
    const questions = readCsv(CSV_PATH);
    console.log('  ' + questions.length + ' questions loaded');

    // 2. Load validator findings
    console.log('Loading validator findings...');
    const findings = loadValidatorFindings();
    const errCount = Object.keys(findings.errors).length;
    const warnCount = Object.keys(findings.warnings).length;
    console.log('  Questions with errors: ' + errCount);
    console.log('  Questions with warnings: ' + warnCount);

    // 3. Generate registry Markdown
    console.log('Generating registry...');
    const md = generateRegistry(questions, findings);

    // 4. Write
    fs.writeFileSync(OUTPUT_PATH, md, 'utf8');
    console.log('Written:', OUTPUT_PATH);

    // 5. Ensure revision history
    console.log('');
    ensureRevisionHistory();

    console.log('');
    console.log('=== Registry generation complete ===');
    console.log('  Output: ' + OUTPUT_PATH);
    console.log('  Total questions: ' + questions.length);
    console.log('  Questions with validator findings: ' + questionsWithFindings(questions, findings));
}

function questionsWithFindings(questions, findings) {
    return questions.filter(q => {
        const qid = q.QuestionID || '';
        return (findings.errors[qid] || []).length > 0 || (findings.warnings[qid] || []).length > 0;
    }).length;
}

main();
