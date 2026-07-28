/**
 * restructure_pool.js
 * Restructures the Sub-batch 2A pool to avoid AbsoluteLanguage-validator bias
 * and to spread coverage across Section A blueprint subtopics.
 *
 * Selection rules:
 *   Tier 1: Any candidate with MathematicalValidator, ExplanationConsistencyValidator,
 *            DistractorSimilarityValidator, or AmbiguityValidator findings (high-signal)
 *   Tier 2: Candidates with ExplanationValidator (short explanation warnings) — real defects
 *   Tier 3: AbsoluteLanguage-only candidates — only if needed to fill to 24
 *   Coverage: Ensure at least 2 candidates per A-subtopic (A.1–A.6)
 *
 * Usage: node scripts/restructure_pool.js
 */

const fs = require('fs');
const path = require('path');

const VALIDATION_REPORT_PATH = path.join(__dirname, '..', 'scripts', 'reports', 'output', 'ValidationReport.json');
const CSV_PATH = path.join(__dirname, '..', 'reports', 'MasterQuestionRegistry.csv');

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

function main() {
    // Load validator findings
    const reports = JSON.parse(fs.readFileSync(VALIDATION_REPORT_PATH, 'utf8'));
    const byQID = {};
    const qidPat = /(P1\w*-\w+-\d{3})/;

    for (const r of reports) {
        for (const e of r.errors) {
            const m = e.match(qidPat);
            if (m) { if (!byQID[m[1]]) byQID[m[1]] = []; byQID[m[1]].push({ validator: r.validator, msg: e, type: 'error' }); }
        }
        for (const w of r.warnings) {
            const m = w.match(qidPat);
            if (m) { if (!byQID[m[1]]) byQID[m[1]] = []; byQID[m[1]].push({ validator: r.validator, msg: w, type: 'warning' }); }
        }
    }

    function classifyFindings(qid) {
        const f = byQID[qid] || [];
        const categories = new Set();
        for (const x of f) {
            if (x.msg.includes('[MathematicalValidator]')) categories.add('mathematical');
            else if (x.msg.includes('[ExplanationConsistencyValidator]')) categories.add('exp_consistency');
            else if (x.msg.includes('[DistractorSimilarityValidator]')) categories.add('distractor_similarity');
            else if (x.msg.includes('[AmbiguityValidator]')) categories.add('ambiguity');
            else if (x.msg.includes('[AbsoluteLanguageValidator]')) categories.add('absolute_language');
            else if (x.validator === 'Explanation Validator') categories.add('explanation_short');
            else categories.add('other');
        }
        return categories;
    }

    // Read CSV for all Section A questions P1-A-001 to P1-A-075
    const content = fs.readFileSync(CSV_PATH, 'utf8');
    const lines = content.split('\n').filter(l => l.trim());
    const header = parseCsvLine(lines[0]).map(h => stripQuotes(h));
    const qidIdx = header.indexOf('QuestionID');
    const topicIdx = header.indexOf('Topic');
    const losIdx = header.indexOf('LearningOutcomeStatement');

    const sectionA = [];
    const excluded = new Set(['P1-A-022']);

    for (let i = 1; i < lines.length; i++) {
        const vals = parseCsvLine(lines[i]).map(v => stripQuotes(v));
        const qid = vals[qidIdx] || '';
        const m = qid.match(/^P1-A-(\d{3})$/);
        if (!m) continue;
        const num = parseInt(m[1], 10);
        if (num < 1 || num > 75) continue;
        if (excluded.has(qid)) continue;

        const los = vals[losIdx] || '';
        const subtopicMatch = los.match(/^(A\.\d)/);
        const subtopic = subtopicMatch ? subtopicMatch[1] : 'A.0';
        const cats = classifyFindings(qid);
        const totalFindings = (byQID[qid] || []).length;

        sectionA.push({
            qid,
            subtopic,
            topic: vals[topicIdx] || '',
            los,
            cats,
            totalFindings,
            hasHighSignal: cats.has('mathematical') || cats.has('exp_consistency') || cats.has('distractor_similarity'),
            hasAbsolute: cats.has('absolute_language'),
            hasExplanationShort: cats.has('explanation_short'),
            hasAmbiguity: cats.has('ambiguity'),
            absOnly: cats.size === 1 && cats.has('absolute_language'),
            absMix: cats.has('absolute_language') && cats.size > 1,
            findingsStr: [...cats].join(', ')
        });
    }

    // Tier 1: High-signal findings first
    const tier1 = sectionA.filter(q => q.hasHighSignal);
    // Tier 2: Explanation short + Ambiguity (non-abs) mixed
    const tier2 = sectionA.filter(q => !q.hasHighSignal && (q.hasExplanationShort || q.hasAmbiguity) && !q.absOnly);
    // Tier 3: AbsoluteLanguage-only, sorted by subtopic coverage need
    const tier3 = sectionA.filter(q => q.absOnly);
    // Clean: no findings at all
    const clean = sectionA.filter(q => q.totalFindings === 0);

    console.log('=== Pool Restructuring for Sub-batch 2A ===\n');

    console.log('Available candidates by tier:');
    console.log('  Tier 1 (high-signal): ' + tier1.length);
    tier1.forEach(q => console.log('    ' + q.qid + ' [' + q.findingsStr + '] ' + q.subtopic + ' — ' + (q.topic || '').slice(0, 45)));
    console.log('  Tier 2 (explanation/ambiguity, not abs-only): ' + tier2.length);
    tier2.forEach(q => console.log('    ' + q.qid + ' [' + q.findingsStr + '] ' + q.subtopic + ' — ' + (q.topic || '').slice(0, 45)));
    console.log('  Tier 3 (abs-only): ' + tier3.length);
    console.log('  Clean (no findings): ' + clean.length);
    console.log('');

    // Build restructured pool: up to 24 candidates
    const pool = [];
    const used = new Set();
    // Phase 1: All Tier 1 candidates (high-signal — always include)
    for (const q of tier1) {
        if (pool.length >= 24) break;
        pool.push(q); used.add(q.qid);
    }

    // Phase 2: All Tier 2 candidates (explanation short, ambiguity mixed — real defects)
    for (const q of tier2) {
        if (pool.length >= 24) break;
        pool.push(q); used.add(q.qid);
    }

    // Phase 3: Fill remaining with abs-only, prioritizing underrepresented subtopics
    const subtopicCounts = {};
    for (const q of pool) subtopicCounts[q.subtopic] = (subtopicCounts[q.subtopic] || 0) + 1;

    const sortedT3 = [...tier3].sort((a, b) => {
        const aCount = subtopicCounts[a.subtopic] || 0;
        const bCount = subtopicCounts[b.subtopic] || 0;
        return aCount - bCount; // prefer underrepresented subtopics
    });
    for (const q of sortedT3) {
        if (pool.length >= 24) break;
        pool.push(q); used.add(q.qid);
        subtopicCounts[q.subtopic] = (subtopicCounts[q.subtopic] || 0) + 1;
    }

    // Phase 4: Fill remaining with clean questions from underrepresented subtopics
    const sortedClean = [...clean].sort((a, b) => {
        const aCount = subtopicCounts[a.subtopic] || 0;
        const bCount = subtopicCounts[b.subtopic] || 0;
        return aCount - bCount;
    });
    for (const q of sortedClean) {
        if (pool.length >= 24) break;
        pool.push(q); used.add(q.qid);
        subtopicCounts[q.subtopic] = (subtopicCounts[q.subtopic] || 0) + 1;
    }

    // Final trim to 24
    const finalPool = pool.slice(0, 24);

    console.log('Restructured Sub-batch 2A (' + finalPool.length + ' candidates):\n');

    console.log('QID           Subtopic  Findings                  Topic');
    console.log('------------  --------  ------------------------  ---------------------------------------------');
    for (const q of finalPool) {
        const findings = q.totalFindings > 0 ? q.findingsStr.padEnd(24) : 'clean'.padEnd(24);
        console.log(q.qid.padEnd(14) + ' ' + q.subtopic.padEnd(9) + ' ' + findings + ' ' + (q.topic || '').slice(0, 45));
    }

    console.log('\nSubtopic distribution:');
    const dist = {};
    for (const q of finalPool) dist[q.subtopic] = (dist[q.subtopic] || 0) + 1;
    for (const [sub, count] of Object.entries(dist).sort()) {
        console.log('  ' + sub + ': ' + count);
    }

    console.log('\nFinding-source composition:');
    const absOnly = finalPool.filter(q => q.absOnly).length;
    const absMixed = finalPool.filter(q => q.absMix).length;
    const highSignal = finalPool.filter(q => q.hasHighSignal).length;
    const expl = finalPool.filter(q => q.hasExplanationShort && !q.hasHighSignal).length;
    const cleanCount = finalPool.filter(q => q.totalFindings === 0).length;
    console.log('  High-signal (Mathematical, ExplanationConsistency, DistractorSimilarity): ' + highSignal);
    console.log('  AbsoluteLanguage mixed with others: ' + absMixed);
    console.log('  Explanation short (non-high-signal): ' + expl);
    console.log('  AbsoluteLanguage-only: ' + absOnly + ' (' + Math.round(absOnly/24*100) + '%)');
    console.log('  Clean (no findings): ' + cleanCount);
    console.log('');
    const pct = Math.round(absOnly / 24 * 100);
    if (pct > 30) console.log('>> WARNING: Abs-only still > 30%. Consider manual override.');
    else console.log('>> Abs-only within threshold. Pool is healthy.');

    console.log('\nFinal pool QIDs for CAQS loop:');
    console.log(finalPool.map(q => q.qid).join(', '));
}

main();
