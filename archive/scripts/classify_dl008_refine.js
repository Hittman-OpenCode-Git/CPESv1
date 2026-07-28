/**
 * classify_dl008_refine.js
 * Third-pass refinement on Bucket 1A (195 items).
 * Two additional exclusions:
 *   1. Formula-statement: content starts with capitalized formula name + =
 *   2. Variance-narrative: pack C/CD or contains variance terminology
 *
 * Usage: node scripts/classify_dl008_refine.js
 * Output: reports/DL008_CLASSIFICATION_REFINED.md
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

const FORMULA_REGEX = /^[A-Z][a-zA-Z ]+= .*[×x\+\-]/;
const VARIANCE_TERMS = /\b(unfavorable|favorable|excess price|standard price|standard cost|actual vs standard)\b/i;

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

    if (hasArithmetic && numTokens >= 2 && wordCount <= 30) return { qid: q.QuestionID, content: t, field, pack: null };
    if (hasDollar && numTokens >= 2 && wordCount <= 20) return { qid: q.QuestionID, content: t, field, pack: null };
    if (wordCount <= 12 && numTokens >= 2) return { qid: q.QuestionID, content: t, field, pack: null };
    if (hasArithmetic && wordCount <= 15) return { qid: q.QuestionID, content: t, field, pack: null };
    return null;
}

function getBigrams(s) {
    const set = new Set();
    for (let i = 0; i < s.length - 1; i++) set.add(s.substring(i, i + 2).toLowerCase());
    return set;
}

function containmentRatio(candidate, container) {
    if (!candidate || !container) return 0;
    const bc = getBigrams(candidate);
    const bct = getBigrams(container);
    if (bc.size === 0) return 1;
    let contained = 0;
    for (const bg of bc) { if (bct.has(bg)) contained++; }
    return contained / bc.size;
}

const BLOCKED_KEYWORDS = [
    'because it lists', 'activities', 'governance',
    'principle', 'standard', 'requires', 'represents',
    'indicates', 'reflects', 'demonstrates', 'illustrates',
    'applies', 'results from', 'would be if',
    'is used to', 'is applied when'
];

function checkEllipsis(text) { return { pass: !/\.\.\.$/.test(text.trim()) }; }
function checkKeywords(text) {
    const lower = text.toLowerCase();
    const hits = BLOCKED_KEYWORDS.filter(kw => lower.includes(kw.toLowerCase()));
    return { pass: hits.length === 0, hits };
}
function checkArithmetic(text) {
    const hasOperator = /[+\-×x*/=]/.test(text);
    const numericValues = text.match(/\d[\d,]*\.?\d*/g);
    return { pass: hasOperator && (numericValues || []).length >= 2 };
}

function main() {
    const index = {};
    const allB1Candidates = [];

    for (const { file, varName } of PACKS) {
        const fullPath = path.join(ROOT, file);
        if (!fs.existsSync(fullPath)) continue;
        const content = fs.readFileSync(fullPath, 'utf8');
        const questions = extractArray(content, varName);
        if (!questions) continue;
        for (const q of questions) {
            if (q.QuestionID) index[q.QuestionID] = q;
            const b1 = pass1Classify(q);
            if (b1) { b1.pack = file; allB1Candidates.push(b1); }
        }
    }

    // Second-pass criteria (replicate classify_dl008_pass2 logic)
    const b1a_candidates = [];
    const b1b_second_pass = [];

    for (const entry of allB1Candidates) {
        const text = entry.content;
        const q = index[entry.qid];
        const ec = q ? q.ExplanationCorrect || '' : '';

        const arith = checkArithmetic(text);
        const ellipsis = checkEllipsis(text);
        const kw = checkKeywords(text);
        const dupe = { pass: containmentRatio(text, ec) >= 0.6, similarity: containmentRatio(text, ec) };

        const passAll = arith.pass && ellipsis.pass && kw.pass && dupe.pass;
        const result = { qid: entry.qid, pack: entry.pack, field: entry.field, content: text, ec, similarity: dupe.similarity };

        if (passAll) b1a_candidates.push(result);
        else b1b_second_pass.push(result);
    }

    // Third-pass: apply two additional exclusions to Bucket 1A
    const refined1A = [];
    const b1b_refined = [];
    let formulaExcluded = 0;
    let varianceExcluded = 0;

    for (const e of b1a_candidates) {
        const isFormula = FORMULA_REGEX.test(e.content);
        const isVariancePack = /pack_c/.test(e.pack) || /CD/.test(e.pack) || /CD/.test(e.qid);
        const hasVarianceTerms = VARIANCE_TERMS.test(e.content);

        if (isFormula) {
            e.exclusionReason = 'Formula-statement';
            b1b_refined.push(e);
            formulaExcluded++;
        } else if (isVariancePack || hasVarianceTerms) {
            e.exclusionReason = 'Variance-narrative';
            b1b_refined.push(e);
            varianceExcluded++;
        } else {
            refined1A.push(e);
        }
    }

    refined1A.sort((a, b) => a.qid.localeCompare(b.qid));
    b1b_refined.sort((a, b) => a.qid.localeCompare(b.qid));

    // Samples
    const sample1A = refined1A.filter((_, i) => i % Math.max(1, Math.floor(refined1A.length / 5)) === 0).slice(0, 5);
    const sampleFormula = b1b_refined.filter(e => e.exclusionReason === 'Formula-statement').slice(0, 3);
    const sampleVariance = b1b_refined.filter(e => e.exclusionReason === 'Variance-narrative').slice(0, 5);

    console.log('=== DL-008 Refinement Complete ===');
    console.log(`  Refined Bucket 1A (safe sweep): ${refined1A.length}`);
    console.log(`  Expanded Bucket 1B (editorial): ${b1b_refined.length} (${b1b_second_pass.length} from 2nd pass + ${formulaExcluded} formula + ${varianceExcluded} variance)`);
    console.log('');
    console.log('  Third-pass exclusions:');
    console.log(`    Formula-statement:  ${formulaExcluded}`);
    console.log(`    Variance-narrative: ${varianceExcluded}`);
    console.log('');
    console.log('  Refined Bucket 1A samples:');
    sample1A.forEach(e => console.log(`    ${e.qid}: ${e.content.substring(0, 90)}`));
    console.log('');
    if (sampleFormula.length > 0) {
        console.log('  Formula-statement exclusions (moved to 1B):');
        sampleFormula.forEach(e => console.log(`    ${e.qid}: ${e.content.substring(0, 90)}`));
    }
    if (sampleVariance.length > 0) {
        console.log('  Variance-narrative exclusions (moved to 1B):');
        sampleVariance.forEach(e => console.log(`    ${e.qid}: ${e.content.substring(0, 90)}`));
    }

    // Write report
    let report = `# DL-008 Refined Classification Report\n\n`;
    report += `**Date:** ${new Date().toISOString().split('T')[0]}\n`;
    report += `**Third-pass exclusions:** Formula-statement, Variance-narrative\n\n`;

    report += `## Summary\n\n`;
    report += `| Bucket | Definition | Count | Action |\n`;
    report += `|--------|-----------|-------|--------|\n`;
    report += `| Refined 1A | Passes all criteria + two exclusions | ${refined1A.length} | Sweep-clear |\n`;
    report += `| 1B (total) | Fails any criterion or exclusion | ${b1b_refined.length + b1b_second_pass.length} | Editorial queue |\n\n`;
    report += `*Note: 1B total = ${b1b_second_pass.length} (second-pass failures) + ${formulaExcluded} (formula-statement) + ${varianceExcluded} (variance-narrative)*\n\n`;

    report += `### Third-Pass Exclusion Breakdown\n\n`;
    report += `| Exclusion | Moved from 1A to 1B |\n`;
    report += `|-----------|---------------------|\n`;
    report += `| Formula-statement | ${formulaExcluded} |\n`;
    report += `| Variance-narrative | ${varianceExcluded} |\n\n`;

    report += `## Refined Bucket 1A Samples (${refined1A.length} total)\n\n`;
    report += `| QID | Pack | Field | Content | Containment |\n`;
    report += `|-----|------|-------|---------|-------------|\n`;
    for (const s of sample1A) {
        const disp = s.content.length > 120 ? s.content.substring(0, 117) + '...' : s.content;
        report += `| ${s.qid} | ${s.pack} | ${s.field} | ${disp} | ${(s.similarity*100).toFixed(0)}% |\n`;
    }
    report += '\n';

    report += `## Formula-Statement Exclusions (${formulaExcluded} items)\n\n`;
    report += `| QID | Pack | Field | Content | Containment |\n`;
    report += `|-----|------|-------|---------|-------------|\n`;
    for (const e of b1b_refined.filter(e => e.exclusionReason === 'Formula-statement')) {
        const disp = e.content.length > 120 ? e.content.substring(0, 117) + '...' : e.content;
        report += `| ${e.qid} | ${e.pack} | ${e.field} | ${disp} | ${(e.similarity*100).toFixed(0)}% |\n`;
    }
    report += '\n';

    report += `## Variance-Narrative Exclusions (${varianceExcluded} items)\n\n`;
    report += `| QID | Pack | Field | Content | Containment |\n`;
    report += `|-----|------|-------|---------|-------------|\n`;
    for (const e of b1b_refined.filter(e => e.exclusionReason === 'Variance-narrative')) {
        const disp = e.content.length > 120 ? e.content.substring(0, 117) + '...' : e.content;
        report += `| ${e.qid} | ${e.pack} | ${e.field} | ${disp} | ${(e.similarity*100).toFixed(0)}% |\n`;
    }
    report += '\n';

    report += `## Full Refined Bucket 1A Listing (${refined1A.length} items)\n\n`;
    report += `| QID | Pack | Field | Content | EC Containment | EC Content |\n`;
    report += `|-----|------|-------|---------|---------------|------------|\n`;
    for (const e of refined1A) {
        const cDisp = e.content.length > 100 ? e.content.substring(0, 97) + '...' : e.content;
        const ecDisp = e.ec.length > 100 ? e.ec.substring(0, 97) + '...' : e.ec;
        report += `| ${e.qid} | ${e.pack} | ${e.field} | ${cDisp} | ${(e.similarity*100).toFixed(0)}% | ${ecDisp} |\n`;
    }
    report += '\n';

    report += `## Full 1B Listing (${b1b_refined.length + b1b_second_pass.length} items)\n\n`;
    report += `| QID | Pack | Field | Content | Exclusion Stage | Reason |\n`;
    report += `|-----|------|-------|---------|-----------------|--------|\n`;
    for (const e of [...b1b_second_pass, ...b1b_refined]) {
        const stage = e.exclusionReason ? 'Third-pass' : 'Second-pass';
        const reason = e.exclusionReason || 'Failed second-pass criteria';
        const cDisp = e.content.length > 90 ? e.content.substring(0, 87) + '...' : e.content;
        report += `| ${e.qid} | ${e.pack} | ${e.field} | ${cDisp} | ${stage} | ${reason} |\n`;
    }

    const reportPath = path.join(ROOT, 'reports', 'DL008_CLASSIFICATION_REFINED.md');
    fs.writeFileSync(reportPath, report, 'utf8');
    console.log('\nReport: reports/DL008_CLASSIFICATION_REFINED.md');
}

main();
