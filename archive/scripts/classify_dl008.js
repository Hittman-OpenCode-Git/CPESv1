/**
 * classify_dl008.js
 * Classifies all 539 DL-008 occurrences into three buckets:
 *   Bucket 1 — Naked calculation summary
 *   Bucket 2 — Substantive conceptual content misplaced
 *   Bucket 3 — Distractor explanation misattributed
 *
 * Usage: node scripts/classify_dl008.js
 * Output: reports/DL008_CLASSIFICATION.md
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

// Conceptual language indicators
const CONCEPTUAL_WORDS = [
    'triggering', 'trigger', 'events', 'event', 'recognition', 'measurement',
    'represents', 'represent', 'requires', 'require', 'requires that',
    'concept', 'principle', 'standard', 'treatment', 'classification',
    'condition', 'criteria', 'requirement', 'definition',
    'impairment', 'amortization', 'depreciation', 'valuation',
    'allocation', 'adjustment', 'recognition', 'derecognition',
    'realization', 'accrual', 'deferral', 'revenue', 'expense',
    'asset', 'liability', 'equity', 'income', 'cash flow',
    'disclosure', 'presentation', 'policy', 'estimate',
    'judgment', 'materiality', 'consistency', 'comparability',
    'governance', 'internal', 'control', 'fraud', 'audit',
    'cybersecurity', 'privacy', 'compliance', 'regulation'
];

// Distractor misattribution phrases
// These indicate the text is explaining why a specific wrong answer is wrong
const MISATTRIBUTION_PHRASES = [
    /\bresults?\s+from\s+(dividing|using|applying|adding|subtracting|multiplying|not|treating|assuming|selecting)/i,
    /\bwould\s+be\s+(if|the\s+result)\b/i,
    /\bincorrectly\s+(assumes?|applies?|calculates?|includes?|excludes?|treats?|classifies?)/i,
    /\bif\s+\w+\s+were\s+(selected|chosen|used|applied)\b/i,
    /\bthis\s+(answer|choice|value)\s+(would|reflects?|results?|occurs?)\b/i,
    /\breflects?\s+(a|an|the)\s+(misunderstanding|error|confusion|omission)\b/i
];

function classify(text) {
    if (!text || String(text).trim() === '') return 'Empty';
    const t = String(text);
    const words = t.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;

    // Numeric / financial indicators
    const numTokens = words.filter(w => /\d/.test(w)).length;
    const hasArithmetic = /[+\-×÷*/=]/.test(t);
    const hasDollar = /\$/.test(t);

    // Semantic indicators
    const hasConceptual = CONCEPTUAL_WORDS.some(cw => new RegExp('\\b' + cw + '\\b', 'i').test(t));
    const hasMisattribution = MISATTRIBUTION_PHRASES.some(re => re.test(t));

    // --- Bucket 3: Misattributed distractor explanation ---
    // Contains phrases that explain why a specific wrong answer is wrong
    if (hasMisattribution) {
        return 3;
    }

    // --- Bucket 1: Naked calculation summary ---
    // Rule A: Has arithmetic operators + multiple numbers → unambiguous calculation
    if (hasArithmetic && numTokens >= 2 && wordCount <= 30) {
        return 1;
    }
    // Rule B: Short text with dollar amounts + numbers → financial calc
    if (hasDollar && numTokens >= 2 && wordCount <= 20) {
        return 1;
    }
    // Rule C: Very short with numbers → likely calc
    if (wordCount <= 12 && numTokens >= 2) {
        return 1;
    }
    // Rule D: Short with arithmetic operator → calc
    if (hasArithmetic && wordCount <= 15) {
        return 1;
    }

    // --- Bucket 2: Substantive conceptual content ---
    // Has conceptual keywords or is longer non-numeric text
    if (hasConceptual) {
        return 2;
    }
    // Longer text (≥8 words) with no arithmetic → likely prose explanation
    if (wordCount >= 8 && !hasArithmetic && numTokens <= 1) {
        return 2;
    }

    // Fallback: conservative — anything uncertain goes to Bucket 2 for human review
    return 2;
}

function main() {
    const allEntries = [];
    const buckets = { 1: [], 2: [], 3: [], Error: [] };

    for (const { file, varName } of PACKS) {
        const fullPath = path.join(ROOT, file);
        if (!fs.existsSync(fullPath)) { console.error(`Not found: ${file}`); continue; }
        const content = fs.readFileSync(fullPath, 'utf8');
        const questions = extractArray(content, varName);
        if (!questions) { console.error(`Could not extract ${varName} from ${file}`); continue; }

        for (const q of questions) {
            const correct = q.CorrectChoice;
            if (!correct || !['A', 'B', 'C', 'D'].includes(correct)) continue;
            const field = 'ExplanationWrong' + correct;
            const val = q[field];
            if (val === undefined || val === null || String(val).trim() === '') continue;

            const bucket = classify(val);
            const entry = {
                qid: q.QuestionID || '?',
                pack: file,
                field,
                correctChoice: correct,
                content: String(val),
                length: String(val).length,
                wordCount: String(val).split(/\s+/).filter(w => w.length > 0).length
            };

            allEntries.push(entry);
            if (bucket >= 1 && bucket <= 3) {
                buckets[bucket].push(entry);
            } else {
                buckets['Error'].push(entry);
            }
        }
    }

    // Summary
    const b1 = buckets[1].length;
    const b2 = buckets[2].length;
    const b3 = buckets[3].length;
    const bErr = buckets['Error'].length;
    const total = b1 + b2 + b3 + bErr;

    // Select 5 samples per bucket
    function pickSamples(arr, n) {
        const samples = [];
        const step = Math.max(1, Math.floor(arr.length / n));
        for (let i = 0; i < arr.length && samples.length < n; i += step) {
            samples.push(arr[i]);
        }
        // If we still don't have enough, add from end
        if (samples.length < n && arr.length > samples.length) {
            for (let i = arr.length - 1; i >= 0 && samples.length < n; i--) {
                if (!samples.find(s => s.qid === arr[i].qid)) {
                    samples.push(arr[i]);
                }
            }
        }
        return samples;
    }

    const samples1 = pickSamples(buckets[1], 5);
    const samples2 = pickSamples(buckets[2], 5);
    const samples3 = pickSamples(buckets[3], 5);

    // Build report
    let report = `# DL-008 Classification Report\n\n`;
    report += `**Date:** ${new Date().toISOString().split('T')[0]}\n`;
    report += `**Tool:** scripts/classify_dl008.js\n`;
    report += `**Total DL-008 occurrences scanned:** ${total}\n\n`;

    // Decision matrix
    report += `## Decision Matrix\n\n`;
    report += `| Bucket | Classification | Count | % of Total | Action |\n`;
    report += `|--------|---------------|-------|-----------|--------|\n`;
    report += `| 1 | Naked calculation summary | ${b1} | ${(b1/total*100).toFixed(1)}% | Sweep-clear after approval |\n`;
    report += `| 2 | Substantive conceptual misplaced | ${b2} | ${(b2/total*100).toFixed(1)}% | Editorial queue — merge/relocate/remove |\n`;
    report += `| 3 | Distractor explanation misattributed | ${b3} | ${(b3/total*100).toFixed(1)}% | Editorial queue — re-attribute to correct slot |\n`;
    if (bErr > 0) {
        report += `| Error | Unclassified | ${bErr} | ${(bErr/total*100).toFixed(1)}% | Manual review |\n`;
    }
    report += `\n`;

    // Heuristic summary
    report += `## Classification Heuristics\n\n`;
    report += `**Bucket 1** — Naked calculation summary: text is short (≤25 words), primarily numeric (≥2 number tokens), contains arithmetic operators (+, -, ×, /, =), no conceptual language, no misattribution phrases.\n\n`;
    report += `**Bucket 2** — Substantive conceptual: contains conceptual language ("triggering events", "recognition", "measurement", "represents", "requires", "criteria", etc.), longer text (≥8 words), does not meet misattribution criteria.\n\n`;
    report += `**Bucket 3** — Misattributed distractor: contains misattribution phrases ("results from", "would be if", "incorrectly assumes", "reflects a misunderstanding", "confuses"), explains why a specific wrong answer is wrong.\n\n`;

    // By pack
    report += `## By Pack\n\n`;
    report += `| Pack | Total | Bucket 1 | Bucket 2 | Bucket 3 |\n`;
    report += `|------|-------|----------|----------|----------|\n`;
    const packBuckets = { 1: {}, 2: {}, 3: {} };
    for (let b = 1; b <= 3; b++) {
        for (const e of buckets[b]) {
            packBuckets[b][e.pack] = (packBuckets[b][e.pack] || 0) + 1;
        }
    }
    for (const { file } of PACKS) {
        const t = (packBuckets[1][file] || 0) + (packBuckets[2][file] || 0) + (packBuckets[3][file] || 0);
        report += `| ${file} | ${t} | ${packBuckets[1][file] || 0} | ${packBuckets[2][file] || 0} | ${packBuckets[3][file] || 0} |\n`;
    }
    report += '\n';

    // Samples
    report += `## Sample Entries for Spot-Check\n\n`;

    report += `### Bucket 1 Samples (${b1} total)\n\n`;
    report += `| QID | Pack | Field | Content | Length |\n`;
    report += `|-----|------|-------|---------|--------|\n`;
    for (const s of samples1) {
        const disp = s.content.length > 100 ? s.content.substring(0, 97) + '...' : s.content;
        report += `| ${s.qid} | ${s.pack} | ${s.field} | ${disp} | ${s.length} |\n`;
    }
    report += '\n';

    report += `### Bucket 2 Samples (${b2} total)\n\n`;
    report += `| QID | Pack | Field | Content (start) | Length |\n`;
    report += `|-----|------|-------|-----------------|--------|\n`;
    for (const s of samples2) {
        const disp = s.content.length > 120 ? s.content.substring(0, 117) + '...' : s.content;
        report += `| ${s.qid} | ${s.pack} | ${s.field} | ${disp} | ${s.length} |\n`;
    }
    report += '\n';

    report += `### Bucket 3 Samples (${b3} total)\n\n`;
    report += `| QID | Pack | Field | Content (start) | Length |\n`;
    report += `|-----|------|-------|-----------------|--------|\n`;
    for (const s of samples3) {
        const disp = s.content.length > 120 ? s.content.substring(0, 117) + '...' : s.content;
        report += `| ${s.qid} | ${s.pack} | ${s.field} | ${disp} | ${s.length} |\n`;
    }
    report += '\n';

    // Full listing
    report += `## Full Classification Listing\n\n`;
    report += `| QID | Pack | Bucket | Field | Word Count | Content (truncated) |\n`;
    report += `|-----|------|--------|-------|-----------|---------------------|\n`;
    for (const e of allEntries) {
        const b = classify(e.content);
        const disp = e.content.length > 80 ? e.content.substring(0, 77) + '...' : e.content;
        report += `| ${e.qid} | ${e.pack} | ${b} | ${e.field} | ${e.wordCount} | ${disp} |\n`;
    }

    // Write report
    const reportPath = path.join(ROOT, 'reports', 'DL008_CLASSIFICATION.md');
    fs.writeFileSync(reportPath, report, 'utf8');

    console.log('=== DL-008 Classification Complete ===');
    console.log(`  Total occurrences:      ${total}`);
    console.log(`  Bucket 1 (calculation): ${b1} (${(b1/total*100).toFixed(1)}%)`);
    console.log(`  Bucket 2 (conceptual):  ${b2} (${(b2/total*100).toFixed(1)}%)`);
    console.log(`  Bucket 3 (misattributed): ${b3} (${(b3/total*100).toFixed(1)}%)`);
    if (bErr > 0) console.log(`  Unclassified: ${bErr}`);
    console.log(`  Report: reports/DL008_CLASSIFICATION.md`);
    console.log('');
    console.log('Sample Bucket 1 (naked calculation):');
    samples1.slice(0, 3).forEach(s => console.log(`  ${s.qid}: ${s.content.substring(0, 80)}`));
    console.log('');
    console.log('Sample Bucket 2 (conceptual):');
    samples2.slice(0, 3).forEach(s => console.log(`  ${s.qid}: ${s.content.substring(0, 80)}`));
    console.log('');
    console.log('Sample Bucket 3 (misattributed):');
    samples3.slice(0, 3).forEach(s => console.log(`  ${s.qid}: ${s.content.substring(0, 80)}`));
}

main();
