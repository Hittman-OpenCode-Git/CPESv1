/**
 * preflight_subbatch_2a.js
 * Two pre-flight checks before opening the Sub-batch 2A CAQS loop:
 *   1. Finding-source breakdown — which validators fired for each candidate
 *   2. Blueprint coverage — subtopic distribution across candidates
 *
 * Usage: node scripts/preflight_subbatch_2a.js
 */

const fs = require('fs');
const path = require('path');

const VALIDATION_REPORT_PATH = path.join(__dirname, '..', 'scripts', 'reports', 'output', 'ValidationReport.json');
const CSV_PATH = path.join(__dirname, '..', 'reports', 'MasterQuestionRegistry.csv');

// Sub-batch 2A candidates (from find_subbatch_2a.js output, top 24 by findings)
const POOL = [
    'P1-A-009','P1-A-011','P1-A-012','P1-A-013','P1-A-020','P1-A-021','P1-A-025','P1-A-046',
    'P1-A-001','P1-A-002','P1-A-005','P1-A-010','P1-A-014','P1-A-015','P1-A-016','P1-A-017',
    'P1-A-018','P1-A-027','P1-A-028','P1-A-033','P1-A-034','P1-A-036','P1-A-037','P1-A-038'
];

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

// ============================================================
// 1. Finding-source breakdown
// ============================================================
function checkFindingSources() {
    console.log('=== Pre-Flight 1: Finding-Source Breakdown ===\n');

    const reports = JSON.parse(fs.readFileSync(VALIDATION_REPORT_PATH, 'utf8'));

    // Build per-question findings map
    const byQID = {};
    const qidPat = /(P1\w*-\w+-\d{3})/;

    for (const r of reports) {
        for (const e of r.errors) {
            const m = e.match(qidPat);
            if (m) {
                if (!byQID[m[1]]) byQID[m[1]] = [];
                byQID[m[1]].push({ validator: r.validator, msg: e, type: 'error' });
            }
        }
        for (const w of r.warnings) {
            const m = w.match(qidPat);
            if (m) {
                if (!byQID[m[1]]) byQID[m[1]] = [];
                byQID[m[1]].push({ validator: r.validator, msg: w, type: 'warning' });
            }
        }
    }

    let absCount = 0, nonAbsCount = 0, absOnlyCount = 0, mixCount = 0;
    let explainedShortCount = 0, otherCount = 0;

    for (const qid of POOL) {
        const f = byQID[qid] || [];
        const vals = [...new Set(f.map(x => {
            // Normalize: PsychometricValidator messages have sub-validator names
            const msg = x.msg;
            if (msg.includes('[AbsoluteLanguageValidator]')) return 'AbsoluteLanguageValidator';
            if (msg.includes('[ExplanationConsistencyValidator]')) return 'ExplanationConsistencyValidator';
            if (msg.includes('[AmbiguityValidator]')) return 'AmbiguityValidator';
            if (msg.includes('[DistractorSimilarityValidator]')) return 'DistractorSimilarityValidator';
            if (msg.includes('[MathematicalValidator]')) return 'MathematicalValidator';
            return x.validator;
        }))];

        const hasAbs = vals.some(v => v === 'AbsoluteLanguageValidator');
        const hasExplShort = vals.some(v => v === 'Explanation Validator');
        const hasOther = vals.some(v => v !== 'AbsoluteLanguageValidator' && v !== 'Explanation Validator');

        if (hasAbs) absCount++;
        if (!hasAbs) nonAbsCount++;
        if (hasAbs && !hasOther && !hasExplShort) absOnlyCount++;
        if (hasExplShort) explainedShortCount++;
        if (hasOther) otherCount++;

        console.log(qid + ' (' + f.length + ' findings, ' + vals.length + ' validators):');
        for (const x of f) {
            const label = x.msg.length > 100 ? x.msg.slice(0, 100) + '...' : x.msg;
            const sub = x.msg.includes('[AbsoluteLanguageValidator]') ? '(AbsoluteLanguage)' :
                       x.msg.includes('[ExplanationConsistencyValidator]') ? '(ExplanationConsistency)' :
                       x.msg.includes('[AmbiguityValidator]') ? '(Ambiguity)' :
                       x.msg.includes('[DistractorSimilarityValidator]') ? '(DistractorSimilarity)' :
                       x.msg.includes('[MathematicalValidator]') ? '(Mathematical)' : '';
            console.log('  [' + x.validator + sub + '][' + x.type + '] ' + label);
        }
        console.log('');
    }

    console.log('--- Summary ---');
    console.log('Candidates with ANY findings: ' + POOL.filter(q => byQID[q] && byQID[q].length > 0).length);
    console.log('Candidates with AbsoluteLanguage findings: ' + absCount);
    console.log('Candidates with ExplanationValidator (short explanations): ' + explainedShortCount);
    console.log('Candidates with other validators: ' + otherCount);
    console.log('Candidates with AbsoluteLanguage-ONLY findings: ' + absOnlyCount);
    const pct = Math.round(absOnlyCount / POOL.length * 100);
    console.log('Abs-only percentage: ' + pct + '% (threshold: >30% needs restructuring)');
    if (pct > 30) {
        console.log('>> WARNING: Pool is AbsoluteLanguage-heavy. Restructure needed.');
    } else {
        console.log('>> Pool is clean — AbsoluteLanguage findings are mixed with other validators.');
    }
    return byQID;
}

// ============================================================
// 2. Blueprint coverage
// ============================================================
function checkBlueprintCoverage(byQID) {
    console.log('\n=== Pre-Flight 2: Blueprint Coverage ===\n');

    // Read CSV for topic/subtopic data
    const content = fs.readFileSync(CSV_PATH, 'utf8');
    const lines = content.split('\n').filter(l => l.trim());
    const header = parseCsvLine(lines[0]).map(h => stripQuotes(h));
    const qidIdx = header.indexOf('QuestionID');
    const topicIdx = header.indexOf('Topic');
    const losIdx = header.indexOf('LearningOutcomeStatement');

    const poolSet = new Set(POOL);
    const coverage = {};

    for (let i = 1; i < lines.length; i++) {
        const vals = parseCsvLine(lines[i]).map(v => stripQuotes(v));
        const qid = vals[qidIdx] || '';
        if (!poolSet.has(qid)) continue;
        const topic = vals[topicIdx] || 'Unknown';
        const los = vals[losIdx] || 'Unknown';
        const f = byQID[qid] || [];

        // Map LOSTag to subtopic area (A.1, A.2, etc.)
        const subtopic = los.match(/^(A\.\d)/);
        const area = subtopic ? subtopic[1] : 'A.0 (unmapped)';
        if (!coverage[area]) coverage[area] = [];
        coverage[area].push({ qid, topic, los, findings: f.length });
    }

    console.log('Sub-batch 2A: Blueprint subtopic distribution');
    console.log('');
    console.log('Subtopic | Count | Candidates');
    console.log('---------|-------|-----------');
    const sortedAreas = Object.entries(coverage).sort((a, b) => b[1].length - a[1].length);
    for (const [area, items] of sortedAreas) {
        const qids = items.map(x => x.qid).join(', ');
        console.log(area.padEnd(9) + ' | ' + String(items.length).padStart(5) + ' | ' + qids);
    }
    console.log('');
    console.log('Total subtopics covered: ' + Object.keys(coverage).length);
    const clusters = sortedAreas.filter(([, items]) => items.length >= 8);
    if (clusters.length > 0) {
        console.log('>> Clustered subtopics (>=8 candidates):');
        for (const [area, items] of clusters) {
            console.log('   ' + area + ': ' + items.length + ' candidates');
        }
        console.log('>> Risk: Batch will concentrate improvements in clustered areas.');
        console.log('>> Consider swapping some clustered candidates for underrepresented subtopics.');
    } else {
        console.log('>> Coverage is reasonably spread — no heavy cluster.');
    }

    // Print details per candidate
    console.log('\nPer-candidate details:');
    console.log('');
    for (const qid of POOL) {
        // Find in CSV
        for (let i = 1; i < lines.length; i++) {
            const vals = parseCsvLine(lines[i]).map(v => stripQuotes(v));
            if ((vals[qidIdx] || '') !== qid) continue;
            const topic = vals[topicIdx] || '?';
            const los = vals[losIdx] || '?';
            const f = byQID[qid] || [];
            const fStr = f.length > 0 ? String(f.length) + ' findings' : 'no findings';
            console.log(qid + ' | LOS: ' + los.padEnd(18) + ' | Topic: ' + (topic || '').slice(0, 50).padEnd(52) + ' | ' + fStr);
            break;
        }
    }
}

const byQID = checkFindingSources();
checkBlueprintCoverage(byQID);
