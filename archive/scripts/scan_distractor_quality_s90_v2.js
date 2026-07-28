// Session 90: Distractor Quality Scan v2 — Regex-based, QID-mapped
// Parses by extracting JSON objects between known delimiters, then scanning.
// Handles files with or without const header.

const fs = require('fs');
const path = require('path');

const PACKS = [
    { file: 'pack_a_corrected.js', pack: 'A' },
    { file: 'pack_b_corrected.js', pack: 'B' },
    { file: 'pack_c_corrected.js', pack: 'C' },
    { file: 'pack_d_corrected.js', pack: 'D' },
    { file: 'pack_e_corrected.js', pack: 'E' },
];

// ---- Pattern definitions ----
const PRIMARY_PATTERNS = [
    { name: 'always',            regex: /\balways\b/i },
    { name: 'never',             regex: /\bnever\b/i },
    { name: 'only',              regex: /\bonly\b/i },
    { name: 'must',              regex: /\bmust\b/i },
    { name: 'none_of_the_above', regex: /none\s+of\s+the\s+above/i },
    { name: 'all_of_the_above',  regex: /all\s+of\s+the\s+above/i },
    { name: 'cannot_ever',       regex: /cannot\s+ever\b/i },
    { name: 'under_no_circumstances', regex: /under\s+no\s+circumstances/i },
    { name: 'in_every_case',     regex: /in\s+every\s+case/i },
    { name: 'in_all_cases',      regex: /in\s+all\s+cases/i },
    { name: 'without_exception',  regex: /without\s+exception/i },
    { name: 'no_exceptions',     regex: /no\s+exceptions\b/i },
];

// Extract question blocks: find "QuestionID" then extract enclosing { } 
function extractQuestions(src) {
    const questions = [];
    const qidPattern = /"QuestionID"\s*:\s*"([^"]+)"/g;
    let match;
    const qidPositions = [];
    while ((match = qidPattern.exec(src)) !== null) {
        qidPositions.push({ qid: match[1], pos: match.index });
    }
    
    // For each QID position, find the enclosing object
    for (let i = 0; i < qidPositions.length; i++) {
        const { qid, pos } = qidPositions[i];
        const nextPos = i + 1 < qidPositions.length ? qidPositions[i+1].pos : src.length;
        const block = src.substring(pos, nextPos);
        
        // Extract key fields with regex from this block
        const extractField = (fieldName) => {
            const re = new RegExp('"' + fieldName + '"\\s*:\\s*"([^"]*)"', 'i');
            const m = block.match(re);
            return m ? m[1] : '';
        };
        const extractObjField = (fieldName) => {
            const re = new RegExp('"' + fieldName + '"\\s*:\\s*{([^}]*)}', 'i');
            const m = block.match(re);
            return m ? m[1] : '';
        };
        
        const state = extractField('question_state') || 'MISSING';
        const section = extractField('Section') || '';
        const difficulty = extractField('Difficulty') || '';
        const topic = extractField('Topic') || '';
        const stem = (extractField('Stem') || '').substring(0, 120);
        const correctChoice = extractField('CorrectChoice') || '';

        // Extract Choices text
        const choicesBlock = extractObjField('Choices');
        const choices = {};
        if (choicesBlock) {
            for (const letter of ['A','B','C','D']) {
                const cre = new RegExp('"' + letter + '"\\s*:\\s*"([^"]*)"');
                const cm = choicesBlock.match(cre);
                if (cm) choices[letter] = cm[1];
            }
        }

        // Extract ExplanationWrong text for each letter
        const ew = {};
        for (const letter of ['A','B','C','D']) {
            ew[letter] = extractField('ExplanationWrong' + letter);
        }

        questions.push({
            qid, state, section, difficulty, topic, stem,
            correctChoice, choices, ew,
            blockLength: block.length,
        });
    }
    return questions;
}

function scanText(text) {
    const hits = [];
    for (const p of PRIMARY_PATTERNS) {
        if (p.regex.test(text)) {
            hits.push(p.name);
        }
    }
    return hits;
}

function extractExcerpt(text, maxLen) {
    if (!text || text.length === 0) return '(empty)';
    if (text.length <= maxLen) return text;
    return text.substring(0, maxLen) + '...';
}

// Main
const allResults = [];
let totalQuestions = 0;
let totalScannedChoices = 0;
let totalScannedEW = 0;

for (const p of PACKS) {
    const fpath = path.join(__dirname, '..', p.file);
    if (!fs.existsSync(fpath)) {
        console.error(`File not found: ${fpath}`);
        continue;
    }
    const src = fs.readFileSync(fpath, 'utf8');
    const questions = extractQuestions(src);
    totalQuestions += questions.length;
    let packHits = 0;
    
    for (const q of questions) {
        // Scan Choices
        for (const letter of ['A','B','C','D']) {
            const ct = q.choices[letter];
            if (!ct) continue;
            totalScannedChoices++;
            const hits = scanText(ct);
            if (hits.length > 0) {
                packHits++;
                allResults.push({
                    qid: q.qid, pack: p.pack, state: q.state,
                    section: q.section, difficulty: q.difficulty,
                    topic: q.topic, stem_excerpt: q.stem,
                    correct_choice: q.correctChoice,
                    field: 'Choice ' + letter,
                    is_correct: (letter === q.correctChoice),
                    text_excerpt: extractExcerpt(ct, 200),
                    full_text: ct,
                    pattern_hits: hits,
                });
            }
        }

        // Scan ExplanationWrong (only non-correct slots, and only strong patterns)
        for (const letter of ['A','B','C','D']) {
            const ewt = q.ew[letter];
            if (!ewt || ewt === '') continue;
            if (letter === q.correctChoice) continue;
            totalScannedEW++;
            const hits = scanText(ewt);
            const strongHits = hits.filter(h => 
                ['always','never','none_of_the_above','all_of_the_above',
                 'cannot_ever','under_no_circumstances','in_every_case',
                 'in_all_cases','without_exception','no_exceptions'].includes(h)
            );
            if (strongHits.length > 0) {
                packHits++;
                allResults.push({
                    qid: q.qid, pack: p.pack, state: q.state,
                    section: q.section, difficulty: q.difficulty,
                    topic: q.topic, stem_excerpt: q.stem,
                    correct_choice: q.correctChoice,
                    field: 'EW ' + letter,
                    is_correct: false,
                    text_excerpt: extractExcerpt(ewt, 200),
                    full_text: ewt,
                    pattern_hits: strongHits,
                });
            }
        }
    }
    console.error(`Scanned ${p.file}: ${questions.length} questions, ${packHits} hits`);
}

console.log(JSON.stringify({
    summary: {
        total_questions: totalQuestions,
        total_choices_scanned: totalScannedChoices,
        total_ew_scanned: totalScannedEW,
        total_hits: allResults.length,
    },
    results: allResults,
}, null, 2));
