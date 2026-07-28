// Session 90: Distractor Quality Scan — Absolutist / Low-Quality Signals
// Read-only. Scans Choices and ExplanationWrong fields for problem patterns.
// Outputs JSON to stdout.

const fs = require('fs');
const path = require('path');

const PACKS = [
    { file: 'pack_a_corrected.js', varname: 'MCQ_BANK_A' },
    { file: 'pack_b_corrected.js', varname: 'MCQ_BANK_B' },
    { file: 'pack_c_corrected.js', varname: 'MCQ_BANK_C' },
    { file: 'pack_d_corrected.js', varname: 'MCQ_BANK_D' },
    { file: 'pack_e_corrected.js', varname: 'MCQ_BANK_E' },
];

// ---- Pattern definitions ----
const PRIMARY_PATTERNS = [
    { name: 'always',            regex: /\balways\b/i,                    severity: 'medium' },
    { name: 'never',             regex: /\bnever\b/i,                     severity: 'medium' },
    { name: 'only',              regex: /\bonly\b/i,                      severity: 'low' },
    { name: 'must',              regex: /\bmust\b/i,                      severity: 'low' },
    { name: 'none_of_the_above', regex: /none\s+of\s+the\s+above/i,      severity: 'high' },
    { name: 'all_of_the_above',  regex: /all\s+of\s+the\s+above/i,       severity: 'high' },
    { name: 'cannot_ever',       regex: /cannot\s+ever/i,                 severity: 'high' },
    { name: 'under_no_circumstances', regex: /under\s+no\s+circumstances/i, severity: 'high' },
    { name: 'in_every_case',     regex: /in\s+every\s+case/i,             severity: 'high' },
    { name: 'in_all_cases',      regex: /in\s+all\s+cases/i,              severity: 'high' },
    { name: 'without_exception',  regex: /without\s+exception/i,           severity: 'high' },
    { name: 'no_exceptions',     regex: /no\s+exceptions/i,               severity: 'high' },
];

// Secondary low-quality signals
const SECONDARY_PATTERNS = [
    { name: 'all_companies',     regex: /\ball\s+compan(i|y)es\b/i,      severity: 'low' },
    { name: 'every_company',     regex: /\bevery\s+compan/i,              severity: 'low' },
    { name: 'always_true',       regex: /\balways\s+true\b/i,             severity: 'medium' },
    { name: 'always_false',      regex: /\balways\s+false\b/i,            severity: 'medium' },
    { name: 'impossible',        regex: /\bimpossible\b/i,                 severity: 'low' },
];

function scanChoicesText(text) {
    const hits = [];
    for (const p of PRIMARY_PATTERNS) {
        if (p.regex.test(text)) {
            hits.push(p.name);
        }
    }
    for (const p of SECONDARY_PATTERNS) {
        if (p.regex.test(text)) {
            hits.push(p.name);
        }
    }
    return hits;
}

function extractChoicesExcerpt(text, maxLen) {
    if (!text || text.length === 0) return '(empty)';
    if (text.length <= maxLen) return text;
    return text.substring(0, maxLen) + '...';
}

function scanPack(filePath, varName) {
    const src = fs.readFileSync(filePath, 'utf8');
    const fullSrc = src + '\n; return ' + varName + ';';
    let bank;
    try {
        bank = new Function(fullSrc)();
    } catch(e) {
        console.error(`ERROR parsing ${filePath}: ${e.message}`);
        return [];
    }
    if (!Array.isArray(bank)) {
        console.error(`ERROR: ${varName} is not an array, got ${typeof bank}`);
        return [];
    }
    const results = [];
    for (const q of bank) {
        const qid = q.QuestionID || 'unknown';
        const state = q.question_state || 'MISSING';
        const stem = (q.Stem || '').substring(0, 120);
        const correctChoice = q.CorrectChoice || '';
        const difficulty = q.Difficulty || '';
        const section = q.Section || '';
        const topic = q.Topic || '';

        // Scan Choices
        const choices = q.Choices || {};
        for (const letter of ['A','B','C','D']) {
            const choiceText = choices[letter] || '';
            if (!choiceText) continue;
            const patternHits = scanChoicesText(choiceText);
            if (patternHits.length > 0) {
                results.push({
                    qid,
                    state,
                    section,
                    difficulty,
                    topic,
                    stem_excerpt: stem,
                    correct_choice: correctChoice,
                    field: 'Choice ' + letter,
                    is_correct: (letter === correctChoice),
                    text_excerpt: extractChoicesExcerpt(choiceText, 200),
                    full_text: choiceText,
                    pattern_hits: patternHits,
                });
            }
        }

        // Scan ExplanationWrong fields (only non-correct slots matter for distractor quality)
        for (const letter of ['A','B','C','D']) {
            const ewKey = 'ExplanationWrong' + letter;
            const ewText = q[ewKey];
            if (!ewText || ewText === '') continue;
            // Skip correct answer slot
            if (letter === correctChoice) continue;
            const patternHits = scanChoicesText(ewText);
            if (patternHits.length > 0) {
                // Only flag if strong absolutist patterns found
                const strongHits = patternHits.filter(h => 
                    ['always','never','none_of_the_above','all_of_the_above',
                     'cannot_ever','under_no_circumstances','in_every_case',
                     'in_all_cases','without_exception','no_exceptions'].includes(h)
                );
                if (strongHits.length > 0) {
                    results.push({
                        qid,
                        state,
                        section,
                        difficulty,
                        topic,
                        stem_excerpt: stem,
                        correct_choice: correctChoice,
                        field: 'EW ' + letter,
                        is_correct: false,
                        text_excerpt: extractChoicesExcerpt(ewText, 200),
                        full_text: ewText,
                        pattern_hits: strongHits,
                    });
                }
            }
        }
    }
    return results;
}

// Main
const allResults = [];
for (const p of PACKS) {
    const fpath = path.join(__dirname, '..', p.file);
    if (!fs.existsSync(fpath)) {
        console.error(`File not found: ${fpath}`);
        continue;
    }
    const packLetter = p.file.match(/pack_([a-e])/i)[1].toUpperCase();
    const results = scanPack(fpath, p.varname);
    for (const r of results) {
        r.pack = packLetter;
    }
    allResults.push(...results);
    console.error(`Scanned ${p.file}: ${results.length} hits`);
}

console.log(JSON.stringify(allResults, null, 2));
