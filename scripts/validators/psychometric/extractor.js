const path = require("path");
const fs = require("fs");
const config = require("../../config");
const { parsePack, SEVERITY } = require("../../lib/pack_parser");

// Independent raw-count of question objects for the R20 coverage assertion.
function countQuestionIds(content) {
    const m = content.match(/"QuestionID"\s*:/g);
    return m ? m.length : 0;
}

// Canonical extraction (P0 rewire). Shape-selected on QuestionID rather than
// bank-name regex, so the Pack C comment-bearing declaration
// (`const MCQ_BANK_C = // BLOCK-AUTHORIZED ... [`) and the P2
// `pack_p2_x_questions` banks are captured. Throws on any silent drop.
function extractQuestions(content, filename) {
    const parsed = parsePack(content, { sourceName: filename });
    const hardErrors = parsed.diagnostics.filter(d => d.severity === SEVERITY.ERROR);
    if (hardErrors.length) {
        throw new Error(`COVERAGE_ASSERTION_FAILED [${filename}]: ` +
            hardErrors.map(d => `${d.code}@line${d.line}`).join(", "));
    }
    const questions = parsed.records
        .filter(r => r.object && typeof r.object.QuestionID === "string")
        .map(r => r.object);
    const expected = countQuestionIds(content);
    if (questions.length !== expected) {
        throw new Error(`COVERAGE_ASSERTION_FAILED [${filename}]: parsed ` +
            `${questions.length} question records but raw "QuestionID" count is ${expected}.`);
    }
    return questions;
}

// Loads the full psychometric question set: 5 Part 1 packs + 6 Part 2 packs.
// NOTE: legacy `config.caseBanks` (ENHANCED_CASE_BASE) is intentionally not
// loaded here — the prior regex never matched those declarations either, so
// this is a no-op, not a regression (recorded as a residual in DL-049).
function loadAllQuestions() {
    const allQuestions = [];
    const files = config.questionPacks.concat(config.part2QuestionPacks || []);
    for (const file of files) {
        const fullPath = path.join(config.paths.root, file);
        if (!fs.existsSync(fullPath)) {
            throw new Error(`COVERAGE_ASSERTION_FAILED: missing pack file ${file}`);
        }
        const content = fs.readFileSync(fullPath, "utf8");
        for (const q of extractQuestions(content, file)) {
            q._sourceFile = file;
            allQuestions.push(q);
        }
    }
    return allQuestions;
}

module.exports = { extractQuestions, loadAllQuestions };
