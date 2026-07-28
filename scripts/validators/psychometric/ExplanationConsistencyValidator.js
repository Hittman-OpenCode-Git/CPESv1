const Validator = require("../Validator");
const { loadAllQuestions } = require("./extractor");

class ExplanationConsistencyValidator extends Validator {
    constructor() {
        super("ExplanationConsistencyValidator");
        this.confidence = 80;
    }

    validate() {
        this.start();

        const questions = loadAllQuestions();
        let scanned = 0;
        let findings = 0;

        questions.forEach(q => {
            // Skip case-level objects (not items)
            if (q._isCase && !q._isCaseItem) return;

            const qid = q.ItemID || q.QuestionID || `${q._sourceFile}:?`;
            scanned++;

            if (!q.Explanation || !q.ExplanationCorrect) return;

            // 1. Check that the correct-answer explanation actually matches the correct letter
            const correctLetter = q.Correct;
            if (correctLetter && q.Choices && q.Choices[correctLetter]) {
                const correctText = q.Choices[correctLetter].toLowerCase();
                const explCorrect = q.ExplanationCorrect.toLowerCase();

                // If explanation says "is not correct" about the correct answer, flag it
                const negationPatterns = [
                    /is not correct/i,
                    /is incorrect/i,
                    /is wrong/i,
                    /is not the/i,
                    /does not/i
                ];
                const hasNegation = negationPatterns.some(p => p.test(explCorrect));

                // Check if explanation matches key phrases from correct answer
                const keyWords = correctText
                    .replace(/[^a-z0-9\s]/g, "")
                    .split(/\s+/)
                    .filter(w => w.length > 4)
                    .slice(0, 5);

                const matchCount = keyWords.filter(w => explCorrect.includes(w)).length;
                const hasLowKeywordMatch = keyWords.length > 0 && matchCount === 0;

                if (hasNegation && hasLowKeywordMatch) {
                    this.addWarning(`${qid}: ExplanationCorrect appears to contradict the selected correct answer (${correctLetter}) — explanation says "not correct" but no keywords from the correct choice are found`);
                    findings++;
                }
            }

            // 2. Check ExplanationCorrect vs Explanation (distractor explanations)
            if (q.Explanation) {
                // Explanation should be the text explaining ALL choices or the distractors
                // If Explanation and ExplanationCorrect are very similar, one is likely redundant
                const ratio = this.similarity(q.Explanation, q.ExplanationCorrect);
                if (ratio > 0.85) {
                    this.addWarning(`${qid}: Explanation and ExplanationCorrect are nearly identical (${(ratio * 100).toFixed(0)}% similar) — likely redundant`);
                    findings++;
                }
            }

            // 3. Check for FormulaReference in explanation
            if (q.FormulaReference) {
                const formulaKeywords = q.FormulaReference.toLowerCase()
                    .replace(/[^a-z0-9\s]/g, "")
                    .split(/\s+/)
                    .filter(w => w.length > 3);

                const bothExplanations = ((q.Explanation || "") + " " + (q.ExplanationCorrect || "")).toLowerCase();
                const formulaMentioned = formulaKeywords.some(w => bothExplanations.includes(w));

                if (!formulaMentioned && formulaKeywords.length > 0) {
                    this.addWarning(`${qid}: FormulaReference "${q.FormulaReference}" is not mentioned in any explanation`);
                    findings++;
                }
            }

            // 4. Check LearningObjective (if present) vs Topic
            if (q.LearningObjective && q.Topic) {
                const lo = q.LearningObjective.toLowerCase();
                const topic = q.Topic.toLowerCase();

                const loWords = lo.replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(w => w.length > 3);
                const topicMatch = loWords.filter(w => topic.includes(w)).length;
                const ratio = loWords.length > 0 ? topicMatch / loWords.length : 0;

                if (ratio < 0.2 && loWords.length >= 2) {
                    this.addWarning(`${qid}: LearningObjective "${q.LearningObjective}" has low keyword overlap with Topic "${q.Topic}" — may be misaligned`);
                    findings++;
                }
            }
        });

        this.addStatistic("questionsScanned", scanned);
        this.addStatistic("findings", findings);
        this.finish();
        return this.report();
    }

    similarity(a, b) {
        if (!a || !b) return 0;
        const aWords = new Set(a.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean));
        const bWords = new Set(b.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(Boolean));

        let intersection = 0;
        aWords.forEach(w => { if (bWords.has(w)) intersection++; });

        const union = new Set([...aWords, ...bWords]).size;
        return union === 0 ? 0 : intersection / union;
    }
}

module.exports = ExplanationConsistencyValidator;
