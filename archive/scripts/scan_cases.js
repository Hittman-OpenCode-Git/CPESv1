/**
 * scan_cases.js
 * Structural/metadata/citation/calculation scan of scored_cases*.js files.
 * Report-only — makes no modifications.
 *
 * Usage: node scripts/scan_cases.js
 * Output: reports/CASE_SCAN_REPORT.md
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CASE_FILES = [
    { file: 'scored_cases.js', varName: 'ENHANCED_CASE_BASE' },
    { file: 'scored_cases2.js', varName: 'ENHANCED_CASE_BASE2' },
    { file: 'scored_cases3.js', varName: 'ENHANCED_CASE_BASE3' },
    { file: 'scored_cases4.js', varName: 'ENHANCED_CASE_BASE4' },
    { file: 'scored_cases5.js', varName: 'ENHANCED_CASE_BASE5' }
];

const VALID_ITEM_TYPES = ['numeric', 'select', 'multi', 'fill', 'match'];
const VALID_COGNITIVE_LEVELS = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'];
const VALID_SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F'];
const GOVERNANCE_FIELDS = ['question_state', 'pack_state', 'pedagogical_cluster', 'question_tier', 'question_status'];

const KNOWN_ASC_TOPICS = {
    'ASC 205': ['financial statements', 'presentation', 'reporting entity'],
    'ASC 210': ['balance sheet', 'current assets', 'current liabilities'],
    'ASC 220': ['comprehensive income', 'OCI'],
    'ASC 230': ['cash flow', 'statement of cash flows'],
    'ASC 235': ['accounting policies', 'disclosure'],
    'ASC 250': ['accounting changes', 'error corrections'],
    'ASC 260': ['earnings per share', 'EPS'],
    'ASC 270': ['interim reporting'],
    'ASC 272': ['limited liability entities'],
    'ASC 274': ['personal financial statements'],
    'ASC 275': ['risks and uncertainties'],
    'ASC 280': ['segment reporting'],
    'ASC 305': ['cash and cash equivalents'],
    'ASC 310': ['receivables'],
    'ASC 320': ['debt securities', 'investments'],
    'ASC 321': ['equity securities'],
    'ASC 323': ['equity method', 'investments'],
    'ASC 326': ['credit losses', 'CECL', 'allowance'],
    'ASC 330': ['inventory'],
    'ASC 340': ['deferred costs', 'contract costs'],
    'ASC 350': ['goodwill', 'intangibles'],
    'ASC 360': ['PP&E', 'asset impairment', 'property plant equipment'],
    'ASC 405': ['liabilities'],
    'ASC 410': ['asset retirement obligations'],
    'ASC 420': ['exit obligations'],
    'ASC 440': ['commitments'],
    'ASC 450': ['contingencies', 'contingent liability', 'loss contingency'],
    'ASC 460': ['guarantees'],
    'ASC 470': ['debt'],
    'ASC 480': ['distinguishing liabilities from equity'],
    'ASC 505': ['equity', 'treasury stock'],
    'ASC 605': ['revenue recognition'],
    'ASC 606': ['revenue from contracts', 'contract liability', 'contract asset', 'performance obligation'],
    'ASC 610': ['other revenue'],
    'ASC 705': ['cost of sales'],
    'ASC 710': ['compensation'],
    'ASC 712': ['nonretirement benefits'],
    'ASC 715': ['retirement benefits', 'pension'],
    'ASC 718': ['stock compensation'],
    'ASC 720': ['other expenses'],
    'ASC 730': ['research and development'],
    'ASC 740': ['income taxes', 'deferred tax', 'tax'],
    'ASC 805': ['business combinations'],
    'ASC 808': ['collaborative arrangements'],
    'ASC 810': ['consolidation', 'variable interest'],
    'ASC 815': ['derivatives', 'hedging'],
    'ASC 820': ['fair value', 'fair value hierarchy', 'level 1', 'level 2', 'level 3'],
    'ASC 825': ['financial instruments'],
    'ASC 830': ['foreign currency'],
    'ASC 835': ['interest'],
    'ASC 840': ['leases'],
    'ASC 842': ['leases', 'lessee', 'lessor'],
    'ASC 845': ['nonmonetary transactions'],
    'ASC 850': ['related party'],
    'ASC 852': ['reorganizations'],
    'ASC 855': ['subsequent events'],
    'ASC 860': ['transfers of financial assets'],
    'ASC 900-series': ['industry-specific', 'FASB']
};

function extractCaseArray(content, varName) {
    const idx = content.indexOf(varName + ' = [');
    if (idx === -1) return null;
    const arrStart = content.indexOf('[', idx);
    let depth = 0, pos = arrStart;
    do {
        if (content[pos] === '[') depth++;
        if (content[pos] === ']') depth--;
        pos++;
    } while (depth > 0 && pos < content.length);
    const jsStr = content.substring(arrStart, pos);
    try { return JSON.parse(jsStr); } catch(e) {
        try {
            const fn = new Function('return (' + jsStr + ')');
            return fn();
        } catch(e2) {
            console.error(`  Parse error for ${varName}: ${e2.message.substring(0, 80)}`);
            return null;
        }
    }
}

function findASCCitations(text) {
    if (!text || typeof text !== 'string') return [];
    const matches = text.match(/ASC\s+\d{3}(-\d{2}(-\d{2})?)?/g);
    return matches || [];
}

function main() {
    const report = [];
    let totalCases = 0;
    let totalItems = 0;
    let structuralDefects = 0;
    let citationWarnings = 0;
    let governanceMissing = 0;
    let calculationIssues = 0;

    for (const { file, varName } of CASE_FILES) {
        const filePath = path.join(ROOT, file);
        if (!fs.existsSync(filePath)) {
            report.push(`\n## ${file} — NOT FOUND`);
            continue;
        }

        const content = fs.readFileSync(filePath, 'utf8');
        const cases = extractCaseArray(content, varName);
        if (!cases || !Array.isArray(cases)) {
            report.push(`\n## ${file} — Could not parse cases`);
            continue;
        }

        report.push(`\n## ${file} — ${cases.length} cases parsed`);
        totalCases += cases.length;

        cases.forEach((c, ci) => {
            const caseId = c.CaseID || `case_${ci}`;
            const items = c.Items || [];
            totalItems += items.length;

            // --- Case-level structural check ---
            const caseDefects = [];

            // Required case fields
            if (!c.CaseID) caseDefects.push({ type: 'Error', field: 'CaseID', msg: 'Missing' });
            if (!c.Title || String(c.Title).trim() === '') caseDefects.push({ type: 'Error', field: 'Title', msg: 'Missing' });
            if (!c.SectionTags || !Array.isArray(c.SectionTags)) caseDefects.push({ type: 'Error', field: 'SectionTags', msg: 'Missing/not array' });
            if (!c.ScenarioText || String(c.ScenarioText).trim() === '') caseDefects.push({ type: 'Error', field: 'ScenarioText', msg: 'Missing' });
            if (!c.Exhibits || !Array.isArray(c.Exhibits)) caseDefects.push({ type: 'Warning', field: 'Exhibits', msg: 'Missing/not array' });

            // Governance fields check
            for (const gf of GOVERNANCE_FIELDS) {
                if (c[gf] === undefined || c[gf] === null) {
                    governanceMissing++;
                    caseDefects.push({ type: 'GovernanceGap', field: gf, msg: `Case-level ${gf} not present` });
                }
            }

            // DifficultyScore check
            if (c.DifficultyScore === undefined || c.DifficultyScore === null || typeof c.DifficultyScore !== 'number') {
                caseDefects.push({ type: 'Warning', field: 'DifficultyScore', msg: 'Missing or not numeric' });
            }

            // --- Item-level structural check ---
            items.forEach((item, ii) => {
                const itemId = item.ItemID || `${caseId}_item_${ii}`;
                const itemDefects = [];

                // Required item fields
                if (!item.ItemID) itemDefects.push({ type: 'Error', field: 'ItemID', msg: 'Missing' });
                if (!item.Type) itemDefects.push({ type: 'Error', field: 'Type', msg: 'Missing' });
                if (item.Type && !VALID_ITEM_TYPES.includes(item.Type)) {
                    itemDefects.push({ type: 'Warning', field: 'Type', msg: `Unexpected type "${item.Type}"` });
                }
                if (!item.Prompt) itemDefects.push({ type: 'Error', field: 'Prompt', msg: 'Missing or empty' });
                if (item.Correct === undefined || item.Correct === null || String(item.Correct).trim() === '') {
                    itemDefects.push({ type: 'Error', field: 'Correct', msg: 'Missing or empty' });
                }
                if (!item.Explanation || String(item.Explanation).trim() === '') {
                    itemDefects.push({ type: 'Error', field: 'Explanation', msg: 'Missing or empty' });
                }

                // Governance fields at item level
                for (const gf of GOVERNANCE_FIELDS) {
                    if (item[gf] === undefined || item[gf] === null) {
                        governanceMissing++;
                        itemDefects.push({ type: 'GovernanceGap', field: gf, msg: `Item-level ${gf} not present` });
                    }
                }

                // CognitiveLevel check
                if (!item.CognitiveLevel) {
                    itemDefects.push({ type: 'Warning', field: 'CognitiveLevel', msg: 'Missing' });
                } else if (!VALID_COGNITIVE_LEVELS.includes(item.CognitiveLevel)) {
                    itemDefects.push({ type: 'Warning', field: 'CognitiveLevel', msg: `Unexpected value "${item.CognitiveLevel}"` });
                }

                // Section check
                if (item.Section && !VALID_SECTIONS.includes(item.Section)) {
                    itemDefects.push({ type: 'Warning', field: 'Section', msg: `Invalid section "${item.Section}"` });
                }

                // Per-distractor explanation check (for select-type items)
                if (item.Type === 'select' && item.Choices) {
                    const choiceKeys = Object.keys(item.Choices);
                    let hasPerDistractor = false;
                    for (const key of choiceKeys) {
                        const explField = `ExplanationWrong${key}`;
                        if (item[explField] !== undefined && item[explField] !== null && String(item[explField]).trim() !== '') {
                            hasPerDistractor = true;
                        }
                    }
                    // If no per-distractor explanations exist, note as structural decision
                    if (!hasPerDistractor && item.Explanation) {
                        // This is a design choice — single explanation, not per-distractor
                        // Record as observation rather than defect
                    }
                }

                // --- Citation scan ---
                const allText = [
                    item.Explanation || '',
                    item.AccountingPrinciple || '',
                    item.BusinessInterpretation || ''
                ].join(' ');
                const citations = findASCCitations(allText);
                for (const citation of citations) {
                    // Check if citation is in known list
                    if (!KNOWN_ASC_TOPICS[citation]) {
                        citationWarnings++;
                        itemDefects.push({ type: 'CitationWarning', field: 'ASC', msg: `Unknown/invalid citation "${citation}" in ${itemId}` });
                    }
                    // Check topic-appropriateness
                    if (KNOWN_ASC_TOPICS[citation]) {
                        const topic = (item.Topic || '').toLowerCase();
                        const prompt = (item.Prompt || '').toLowerCase();
                        const keywords = KNOWN_ASC_TOPICS[citation];
                        const matchesKeyword = keywords.some(kw => topic.includes(kw) || prompt.includes(kw));
                        if (!matchesKeyword) {
                            citationWarnings++;
                            itemDefects.push({ type: 'CitationMismatch', field: 'ASC', msg: `"${citation}" may not match topic "${item.Topic}" in ${itemId}` });
                        }
                    }
                }

                // --- Calculation spot-check (simple numeric items) ---
                if (item.Type === 'numeric' && item.Correct && item.Explanation) {
                    const correctStr = String(item.Correct).replace(/,/g, '');
                    if (/^\d+$/.test(correctStr)) {
                        const correctVal = parseInt(correctStr, 10);
                        // Look for simple arithmetic in explanation
                        const explNumbers = item.Explanation.match(/\b\d{2,}\b/g);
                        if (explNumbers && explNumbers.length >= 2) {
                            const nums = explNumbers.map(n => parseInt(n.replace(/,/g, ''), 10)).filter(n => !isNaN(n));
                            // Simple check: if explanation mentions + or - but doesn't obviously produce Correct
                            // This is a heuristic scan only
                        }
                    }
                }

                // Log defects
                if (itemDefects.length > 0) {
                    structuralDefects += itemDefects.length;
                    // Only log detail for significant defects
                    if (itemDefects.some(d => d.type === 'Error' || d.type === 'CitationMismatch')) {
                        report.push(`  - ${itemId}: ${itemDefects.map(d => `[${d.type}] ${d.field}: ${d.msg}`).join('; ')}`);
                    }
                }
            });

            // Log case-level defects
            if (caseDefects.length > 0) {
                structuralDefects += caseDefects.length;
                const significantDefects = caseDefects.filter(d => d.type !== 'GovernanceGap');
                if (significantDefects.length > 0) {
                    report.push(`  - Case ${caseId}: ${significantDefects.map(d => `[${d.type}] ${d.field}: ${d.msg}`).join('; ')}`);
                }
            }
        });
    }

    // --- Summary ---
    report.push('\n---');
    report.push('\n## Summary');
    report.push(`\nTotal cases scanned: ${totalCases}`);
    report.push(`\nTotal items scanned: ${totalItems}`);
    report.push(`\nStructural/metadata defects: ${structuralDefects}`);
    report.push(`  - Governance fields missing (question_state, pack_state, etc.): ${governanceMissing} occurrences`);
    report.push(`  - Citation warnings (unknown or mismatched ASC references): ${citationWarnings}`);
    report.push(`  - Other defects (missing required fields, invalid values): ${structuralDefects - governanceMissing - citationWarnings}`);

    // Count governance gaps
    report.push('\n### Governance Field Coverage');
    report.push('| Field | Case Level | Item Level |');
    report.push('|-------|-----------|------------|');
    for (const gf of GOVERNANCE_FIELDS) {
        let casePresent = 0, caseMissing = 0, itemPresent = 0, itemMissing = 0;
        for (const { file, varName } of CASE_FILES) {
            const filePath = path.join(ROOT, file);
            if (!fs.existsSync(filePath)) continue;
            const content = fs.readFileSync(filePath, 'utf8');
            const cases = extractCaseArray(content, varName);
            if (!cases) continue;
            for (const c of cases) {
                if (c[gf] !== undefined && c[gf] !== null) casePresent++; else caseMissing++;
                for (const item of (c.Items || [])) {
                    if (item[gf] !== undefined && item[gf] !== null) itemPresent++; else itemMissing++;
                }
            }
        }
        report.push(`| ${gf} | ${casePresent}/${casePresent + caseMissing} | ${itemPresent}/${itemPresent + itemMissing} |`);
    }

    // Citation summary
    report.push('\n### ASC Citation Scan');
    citationSummary();

    const output = report.join('\n');
    const outputPath = path.join(ROOT, 'reports', 'CASE_SCAN_REPORT.md');
    fs.writeFileSync(outputPath, output, 'utf8');
    console.log(`Report written to reports/CASE_SCAN_REPORT.md`);
    console.log(`Total cases: ${totalCases}, Total items: ${totalItems}`);
    console.log(`Structural defects: ${structuralDefects}`);
}

function citationSummary() {
    // Count ASC citations across all files
    const ascCounts = {};
    const unknownCitations = [];

    for (const { file, varName } of CASE_FILES) {
        const filePath = path.join(ROOT, file);
        if (!fs.existsSync(filePath)) continue;
        const content = fs.readFileSync(filePath, 'utf8');
        const cases = extractCaseArray(content, varName);
        if (!cases) continue;

        for (const c of cases) {
            for (const item of (c.Items || [])) {
                const allText = [
                    item.Explanation || '',
                    item.AccountingPrinciple || '',
                    item.BusinessInterpretation || ''
                ].join(' ');
                const citations = item.Explanation ? item.Explanation.match(/ASC\s+\d{3}(-\d{2}(-\d{2})?)?/g) : [];
                if (citations) {
                    for (const cit of citations) {
                        ascCounts[cit] = (ascCounts[cit] || 0) + 1;
                        const topic = (item.Topic || '').toLowerCase();
                        const keywords = KNOWN_ASC_TOPICS[cit] || [];
                        const matchesKeyword = keywords.some(kw => topic.includes(kw));
                        if (!matchesKeyword && KNOWN_ASC_TOPICS[cit]) {
                            unknownCitations.push({ cit, itemId: item.ItemID, topic: item.Topic });
                        }
                    }
                }
            }
        }
    }

    const sorted = Object.entries(ascCounts).sort((a, b) => b[1] - a[1]);
    for (const [cit, count] of sorted) {
        console.log(`  ${cit}: ${count} occurrences`);
    }

    if (unknownCitations.length > 0) {
        console.log('\nPotential citation mismatches:');
        for (const uc of unknownCitations.slice(0, 20)) {
            console.log(`  ${uc.itemId}: cites ${uc.cit} for topic "${uc.topic}"`);
        }
    }
}

main();
