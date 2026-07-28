/**
 * classify_dl008_pass2.js
 * Second-pass filter on Bucket 1 (306 items). Four criteria must all pass:
 *   1. Arithmetic density — operator + 2+ numeric values
 *   2. No trailing ellipsis — text doesn't end with ...
 *   3. No conceptual keywords — none of the blocked phrases/words
 *   4. Duplication check — ≥60% similarity with ExplanationCorrect
 *
 * Pass all four → Bucket 1A (safe sweep)
 * Fail any       → Bucket 1B (manual review, editorial queue)
 *
 * Usage: node scripts/classify_dl008_pass2.js
 * Output: reports/DL008_CLASSIFICATION_PASS2.md
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PACKS = [
    { file: 'pack_a_corrected.js', varName: 'MCQ_BANK_A' },
    { file: 'pack_b_corrected.js', varName: 'MCQ_BANK_B' },
    { file: 'pack_c_corrected.js', varName: 'MCQ_BANK_C' },
    { file: 'pack_d_corrected.js', varName: 'MCQ_BANK_D' },
    { file: 'pack_e_corrected.js', varName: 'MCQ_BANK_E' }
];

const BLOCKED_KEYWORDS = [
    'because it lists', 'activities', 'governance',
    'principle', 'standard', 'requires', 'represents',
    'indicates', 'reflects', 'demonstrates', 'illustrates',
    'applies', 'results from', 'would be if',
    'is used to', 'is applied when'
];

// ---------- Dice coefficient (bigram) ----------
function getBigrams(s) {
    const set = new Set();
    for (let i = 0; i < s.length - 1; i++) {
        set.add(s.substring(i, i + 2).toLowerCase());
    }
    return set;
}

function containmentRatio(candidate, container) {
    // What fraction of candidate's bigrams appear in container?
    if (!candidate || !container) return 0;
    const bigramsCand = getBigrams(candidate);
    const bigramsCont = getBigrams(container);
    if (bigramsCand.size === 0) return 1;
    let contained = 0;
    for (const bg of bigramsCand) {
        if (bigramsCont.has(bg)) contained++;
    }
    return contained / bigramsCand.size;
}

// ---------- Extract question array ----------
function extractArray(content, varName) {
    const re = new RegExp(`(?:const|let|var)\\s+${varName}\\s*=\\s*\\[`, 'm');
    const varMatch = content.match(re);
    if (!varMatch) return null;
    const arrStart = content.indexOf('[', varMatch.index);
    let depth = 0, pos = arrStart;
    do {
        if (content[pos] === '[') depth++;
        if (content[pos] === ']') depth--;
        pos++;
    } while (depth > 0 && pos < content.length);
    const jsStr = content.substring(arrStart, pos);
    try { return JSON.parse(jsStr); } catch (e) {
        try { const fn = new Function('return (' + jsStr + ')'); return fn(); } catch (e2) { return null; }
    }
}

// ---------- Criteria checks ----------
function checkArithmeticDensity(text) {
    const hasOperator = /[+\-×x*/=]/.test(text);
    const numericValues = text.match(/\d[\d,]*\.?\d*/g);
    const numericCount = numericValues ? numericValues.length : 0;
    return { pass: hasOperator && numericCount >= 2, operator: hasOperator, numericCount };
}

function checkTrailingEllipsis(text) {
    const hasEllipsis = /\.\.\.$/.test(text.trim());
    return { pass: !hasEllipsis, hasEllipsis };
}

function checkConceptualKeywords(text) {
    const lower = text.toLowerCase();
    const hits = BLOCKED_KEYWORDS.filter(kw => lower.includes(kw.toLowerCase()));
    return { pass: hits.length === 0, hits };
}

function checkDuplication(text, explanationCorrect) {
    if (!explanationCorrect) return { pass: false, similarity: 0, reason: 'ExplanationCorrect missing' };
    const sim = containmentRatio(text, explanationCorrect);
    return { pass: sim >= 0.6, similarity: sim };
}

// ---------- Pass 1 classifier (same logic as classify_dl008.js) ----------
function pass1Classify(q) {
    const correct = q.CorrectChoice;
    if (!correct || !['A', 'B', 'C', 'D'].includes(correct)) return null;
    const field = 'ExplanationWrong' + correct;
    const val = q[field];
    if (val === undefined || val === null || String(val).trim() === '') return null;
    const t = String(val);
    const words = t.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const numTokens = words.filter(w => /\d/.test(w)).length;
    const hasArithmetic = /[+\-×÷*/=]/.test(t);
    const hasDollar = /\$/.test(t);
    const conceptualWords = [
        'triggering','trigger','events','event','recognition','measurement',
        'represents','represent','requires','require','requires that',
        'concept','principle','standard','treatment','classification',
        'condition','criteria','requirement','definition',
        'impairment','amortization','depreciation','valuation',
        'allocation','adjustment','recognition','derecognition',
        'realization','accrual','deferral','revenue','expense',
        'asset','liability','equity','income','cash flow',
        'disclosure','presentation','policy','estimate',
        'judgment','materiality','consistency','comparability',
        'governance','internal','control','fraud','audit',
        'cybersecurity','privacy','compliance','regulation'
    ];
    const misattribution = [
        /\bresults?\s+from\s+(dividing|using|applying|adding|subtracting|multiplying|not|treating|assuming|selecting)/i,
        /\bwould\s+be\s+(if|the\s+result)\b/i,
        /\bincorrectly\s+(assumes?|applies?|calculates?|includes?|excludes?|treats?|classifies?)/i,
        /\bif\s+\w+\s+were\s+(selected|chosen|used|applied)\b/i,
        /\bthis\s+(answer|choice|value)\s+(would|reflects?|results?|occurs?)\b/i,
        /\breflects?\s+(a|an|the)\s+(misunderstanding|error|confusion|omission)\b/i
    ];
    const hasConceptual = conceptualWords.some(cw => new RegExp('\\b' + cw + '\\b', 'i').test(t));
    const hasMisattribution = misattribution.some(re => re.test(t));

    if (hasMisattribution) return null; // not Bucket 1
    if (hasArithmetic && numTokens >= 2 && wordCount <= 30) return { qid: q.QuestionID, pack: null, field, content: t };
    if (hasDollar && numTokens >= 2 && wordCount <= 20) return { qid: q.QuestionID, pack: null, field, content: t };
    if (wordCount <= 12 && numTokens >= 2) return { qid: q.QuestionID, pack: null, field, content: t };
    if (hasArithmetic && wordCount <= 15) return { qid: q.QuestionID, pack: null, field, content: t };
    return null;
}

// ---------- Main ----------
function main() {
    const bucket1A = [];
    const bucket1B = [];
    const index = {}; // qid → question object

    // Phase 1: collect all Bucket 1 candidates
    for (const { file, varName } of PACKS) {
        const fullPath = path.join(ROOT, file);
        if (!fs.existsSync(fullPath)) { console.error(`Not found: ${file}`); continue; }
        const content = fs.readFileSync(fullPath, 'utf8');
        const questions = extractArray(content, varName);
        if (!questions) { console.error(`Could not extract ${varName} from ${file}`); continue; }
        for (const q of questions) {
            const qid = q.QuestionID;
            if (qid) index[qid] = q;
            const b1 = pass1Classify(q);
            if (b1) {
                b1.pack = file;
                bucket1A.push(b1); // temporary — will be re-sorted
            }
        }
    }

    // Phase 2: apply second-pass filter
    const candidates = bucket1A; // rename for clarity
    const final1A = [];
    const final1B = [];

    for (const entry of candidates) {
        const text = entry.content;
        const q = index[entry.qid];
        const explanationCorrect = q ? q.ExplanationCorrect || '' : '';

        const arith = checkArithmeticDensity(text);
        const ellipsis = checkTrailingEllipsis(text);
        const kw = checkConceptualKeywords(text);
        const dupe = checkDuplication(text, explanationCorrect);

        const passAll = arith.pass && ellipsis.pass && kw.pass && dupe.pass;

        const result = {
            qid: entry.qid,
            pack: entry.pack,
            field: entry.field,
            content: text,
            contentLength: text.length,
            explanationCorrect: explanationCorrect,
            ecLength: explanationCorrect.length,
            similarity: dupe.similarity,
            arith: { pass: arith.pass, ...arith },
            ellipsis: { pass: ellipsis.pass, ...ellipsis },
            kw: { pass: kw.pass, ...kw },
            dupe: { pass: dupe.pass, ...dupe }
        };

        if (passAll) {
            final1A.push(result);
        } else {
            final1B.push(result);
        }
    }

    // Sort both by QID
    final1A.sort((a, b) => a.qid.localeCompare(b.qid));
    final1B.sort((a, b) => a.qid.localeCompare(b.qid));

    // Recalculate failure breakdown using final arrays
    const failureReasons = {};
    for (const e of final1B) {
        const reasons = [];
        if (!e.arith.pass) reasons.push('Arithmetic');
        if (!e.ellipsis.pass) reasons.push('Ellipsis');
        if (!e.kw.pass) reasons.push('Keywords');
        if (!e.dupe.pass) reasons.push('Duplication');
        const key = reasons.join('+');
        failureReasons[key] = (failureReasons[key] || 0) + 1;
    }

    // Build report
    let report = `# DL-008 Second-Pass Classification Report\n\n`;
    report += `**Date:** ${new Date().toISOString().split('T')[0]}\n`;
    report += `**Tool:** scripts/classify_dl008_pass2.js\n`;
    report += `**Criteria:** Arithmetic density, No trailing ellipsis, No conceptual keywords, ≥60% Duplication with ExplanationCorrect\n\n`;

    report += `## Summary\n\n`;
    report += `| Bucket | Classification | Count | % of 306 | Action |\n`;
    report += `|--------|---------------|-------|----------|--------|\n`;
    report += `| 1A | Passes all four criteria | ${final1A.length} | ${(final1A.length/306*100).toFixed(1)}% | Safe sweep-clear |\n`;
    report += `| 1B | Fails one or more criteria | ${final1B.length} | ${(final1B.length/306*100).toFixed(1)}% | Editorial queue (manual review) |\n\n`;

    report += `### Bucket 1B Failure Breakdown\n\n`;
    report += `| Failed Criteria | Count | % of 1B |\n`;
    report += `|----------------|-------|----------|\n`;
    const sortedReasons = Object.entries(failureReasons).sort((a, b) => b[1] - a[1]);
    for (const [reason, count] of sortedReasons) {
        report += `| ${reason} | ${count} | ${(count/final1B.length*100).toFixed(1)}% |\n`;
    }
    report += '\n';

    // By pack
    const packCounts1A = {};
    const packCounts1B = {};
    for (const e of final1A) packCounts1A[e.pack] = (packCounts1A[e.pack] || 0) + 1;
    for (const e of final1B) packCounts1B[e.pack] = (packCounts1B[e.pack] || 0) + 1;
    report += `### By Pack\n\n`;
    report += `| Pack | Bucket 1A | Bucket 1B | Total |\n`;
    report += `|------|-----------|-----------|-------|\n`;
    for (const { file } of PACKS) {
        const a = packCounts1A[file] || 0;
        const b = packCounts1B[file] || 0;
        if (a + b > 0) report += `| ${file} | ${a} | ${b} | ${a + b} |\n`;
    }
    report += '\n';

    // Samples
    const sample1A = final1A.filter((_, i) => i % Math.max(1, Math.floor(final1A.length / 10)) === 0).slice(0, 10);
    const sample1B = final1B.filter((_, i) => i % Math.max(1, Math.floor(final1B.length / 10)) === 0).slice(0, 10);

    report += `## Samples for Spot-Check\n\n`;

    report += `### Bucket 1A Samples (${final1A.length} total — safe sweep)\n\n`;
    report += `| QID | Pack | Field | Content | Similarity | Arithmetic | Ellipsis | Keywords |\n`;
    report += `|-----|------|-------|---------|------------|------------|----------|----------|\n`;
    for (const s of sample1A) {
        const disp = s.content.length > 120 ? s.content.substring(0, 117) + '...' : s.content;
        report += `| ${s.qid} | ${s.pack} | ${s.field} | ${disp} | ${(s.similarity*100).toFixed(0)}% | ${s.arith.pass ? '✓' : '✗'} | ${s.ellipsis.pass ? '✓' : '✗'} | ${s.kw.pass ? '✓' : '✗'} |\n`;
    }
    report += '\n';

    report += `### Bucket 1B Samples (${final1B.length} total — manual review)\n\n`;
    report += `| QID | Pack | Field | Content | Similarity | Fail Reasons |\n`;
    report += `|-----|------|-------|---------|------------|-------------|\n`;
    for (const s of sample1B) {
        const reasons = [];
        if (!s.arith.pass) reasons.push('Arith');
        if (!s.ellipsis.pass) reasons.push('Ellipsis');
        if (!s.kw.pass) reasons.push(`KW:${s.kw.hits.join(',')}`);
        if (!s.dupe.pass) reasons.push(`Dupe(${(s.similarity*100).toFixed(0)}%)`);
        const disp = s.content.length > 120 ? s.content.substring(0, 117) + '...' : s.content;
        report += `| ${s.qid} | ${s.pack} | ${s.field} | ${disp} | ${(s.similarity*100).toFixed(0)}% | ${reasons.join('; ')} |\n`;
    }
    report += '\n';

    // Per-item detail
    report += `## Full Classification — Bucket 1A (${final1A.length} items)\n\n`;
    report += `| QID | Pack | Field | Content | EC Similarity | EC Content |\n`;
    report += `|-----|------|-------|---------|--------------|------------|\n`;
    for (const e of final1A) {
        const cDisp = e.content.length > 100 ? e.content.substring(0, 97) + '...' : e.content;
        const ecDisp = e.explanationCorrect.length > 100 ? e.explanationCorrect.substring(0, 97) + '...' : e.explanationCorrect;
        report += `| ${e.qid} | ${e.pack} | ${e.field} | ${cDisp} | ${(e.similarity*100).toFixed(0)}% | ${ecDisp} |\n`;
    }
    report += '\n';

    report += `## Full Classification — Bucket 1B (${final1B.length} items)\n\n`;
    report += `| QID | Pack | Field | Content | Arithmetic | Ellipsis | Keywords | Duplication(Sim/EC) | Fail |\n`;
    report += `|-----|------|-------|---------|-----------|----------|----------|---------------------|------|\n`;
    for (const e of final1B) {
        const reasons = [];
        if (!e.arith.pass) reasons.push('Arith');
        if (!e.ellipsis.pass) reasons.push('Ellipsis');
        if (!e.kw.pass) reasons.push(`KW:${e.kw.hits.join(',')}`);
        if (!e.dupe.pass) reasons.push(`Dupe`);
        const cDisp = e.content.length > 100 ? e.content.substring(0, 97) + '...' : e.content;
        report += `| ${e.qid} | ${e.pack} | ${e.field} | ${cDisp} | ${e.arith.pass ? '✓' : '✗'} | ${e.ellipsis.pass ? '✓' : '✗'} | ${e.kw.pass ? '✓' : '✗'} | ${(e.similarity*100).toFixed(0)}% | ${reasons.join('; ')} |\n`;
    }
    report += '\n';

    // Write report
    const reportPath = path.join(ROOT, 'reports', 'DL008_CLASSIFICATION_PASS2.md');
    fs.writeFileSync(reportPath, report, 'utf8');

    console.log('=== DL-008 Second-Pass Classification Complete ===');
    console.log(`  Bucket 1A (safe sweep): ${final1A.length} (${(final1A.length/306*100).toFixed(1)}% of 306)`);
    console.log(`  Bucket 1B (manual review): ${final1B.length} (${(final1B.length/306*100).toFixed(1)}% of 306)`);
    console.log('');
    console.log('  Bucket 1B failure breakdown:');
    for (const [reason, count] of sortedReasons) {
        console.log(`    ${reason}: ${count}`);
    }
    console.log('');
    console.log('  Sample Bucket 1A (safe):');
    sample1A.slice(0, 3).forEach(e => console.log(`    ${e.qid}: ${e.content.substring(0, 80)}`));
    console.log('');
    console.log('  Sample Bucket 1B (unsafe):');
    sample1B.slice(0, 3).forEach(e => console.log(`    ${e.qid}: ${e.content.substring(0, 80)}`));
    console.log('');
    console.log(`  Report: reports/DL008_CLASSIFICATION_PASS2.md`);
}

main();
