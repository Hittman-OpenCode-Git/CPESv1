/**
 * find_subbatch_2a.js
 * Scans P1-A-001 through P1-A-075 (excluding P1-A-022, P1B-A-143),
 * merges validator findings, and returns the CAQS candidate distribution
 * sorted by total findings (highest first) for Sub-batch 2A selection.
 *
 * Usage: node scripts/find_subbatch_2a.js
 */

const fs = require('fs');
const path = require('path');

const CSV_PATH = path.join(__dirname, '..', 'reports', 'MasterQuestionRegistry.csv');
const VALIDATION_REPORT_PATH = path.join(__dirname, '..', 'scripts', 'reports', 'output', 'ValidationReport.json');

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

function csvToRecords(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').filter(l => l.trim());
    const header = parseCsvLine(lines[0]).map(h => stripQuotes(h));
    const records = [];
    for (let i = 1; i < lines.length; i++) {
        const vals = parseCsvLine(lines[i]).map(v => stripQuotes(v));
        const rec = {};
        for (let j = 0; j < header.length && j < vals.length; j++) {
            rec[header[j]] = vals[j];
        }
        records.push(rec);
    }
    return records;
}

function loadValidatorFindings() {
    const findings = {};
    if (!fs.existsSync(VALIDATION_REPORT_PATH)) return findings;
    const reports = JSON.parse(fs.readFileSync(VALIDATION_REPORT_PATH, 'utf8'));
    const qidPattern = /(P1[A-Z]*[-][A-F][-]\d{3})/;
    for (const r of reports) {
        for (const e of r.errors) {
            const m = e.match(qidPattern);
            if (m) {
                if (!findings[m[1]]) findings[m[1]] = { errs: [], warns: [] };
                findings[m[1]].errs.push(r.validator + ': ' + e);
            }
        }
        for (const w of r.warnings) {
            const m = w.match(qidPattern);
            if (m) {
                if (!findings[m[1]]) findings[m[1]] = { errs: [], warns: [] };
                findings[m[1]].warns.push(r.validator + ': ' + w);
            }
        }
    }
    return findings;
}

function main() {
    console.log('=== Sub-batch 2A Candidate Pool ===');
    console.log('');

    const records = csvToRecords(CSV_PATH);
    const vFindings = loadValidatorFindings();

    const excluded = new Set(['P1-A-022', 'P1B-A-143']);
    const candidates = [];

    for (const rec of records) {
        const qid = rec.QuestionID || '';
        const m = qid.match(/^P1-A-(\d{3})$/);
        if (!m) continue;
        const num = parseInt(m[1], 10);
        if (num < 1 || num > 75) continue;
        if (excluded.has(qid)) continue;

        const f = vFindings[qid] || { errs: [], warns: [] };
        candidates.push({
            qid,
            errs: f.errs.length,
            warns: f.warns.length,
            total: f.errs.length + f.warns.length,
            topic: rec.Topic || '',
            diff: rec.Difficulty || '',
            los: rec.LearningOutcomeStatement || ''
        });
    }

    // Sort by total findings descending (worst-first)
    candidates.sort((a, b) => b.total - a.total || a.qid.localeCompare(b.qid));

    console.log('Pool: P1-A-001 through P1-A-075');
    console.log('Excluded: P1-A-022 (revised Batch 1), P1B-A-143 (not in range)');
    console.log('Total candidates: ' + candidates.length);
    console.log('');

    // Distribution
    const buckets = { '0': 0, '1-2': 0, '3-5': 0, '6-10': 0, '11-20': 0, '21+': 0 };
    for (const c of candidates) {
        if (c.total === 0) buckets['0']++;
        else if (c.total <= 2) buckets['1-2']++;
        else if (c.total <= 5) buckets['3-5']++;
        else if (c.total <= 10) buckets['6-10']++;
        else if (c.total <= 20) buckets['11-20']++;
        else buckets['21+']++;
    }

    console.log('Validator Findings Distribution:');
    console.log('  Findings | Questions');
    console.log('  ---------|---------');
    for (const [k, v] of Object.entries(buckets)) {
        console.log('  ' + k.padStart(7) + ' | ' + v);
    }

    console.log('');
    console.log('Sorted by most findings (highest priority candidates):');
    console.log('');
    console.log('Rank  QID          Errs  Wrn   Total  Topic');
    console.log('----  -----------  ----  ----  -----  ---------------------------------------------');
    candidates.forEach((c, i) => {
        const rank = String(i + 1).padStart(2);
        console.log(rank + '    ' + c.qid.padEnd(11) + ' ' +
            String(c.errs).padStart(4) + ' ' +
            String(c.warns).padStart(4) + ' ' +
            String(c.total).padStart(5) + '  ' +
            (c.topic || '').slice(0, 45));
    });

    // Bottom 24 candidates for Sub-batch 2A
    const subBatch = candidates.slice(0, 24);
    console.log('');
    console.log('---');
    console.log('');
    console.log('Recommended Sub-batch 2A (24 lowest-quality candidates by validator findings):');
    for (const c of subBatch) {
        let detail = c.qid + ' — ' + (c.topic || '') + ' (' + c.diff + ')';
        if (c.errs > 0) detail += ' | ERRORS: ' + c.errs;
        if (c.warns > 0) detail += ' | WARNINGS: ' + c.warns;
        console.log('  ' + detail);
    }

    console.log('');
    console.log('Note: CAQS scores require human review. Validator finding density is a');
    console.log('proxy metric for prioritization. Actual Sub-batch 2A selection should');
    console.log('be confirmed after manual CAQS scoring of these 24 candidates.');
}

main();
