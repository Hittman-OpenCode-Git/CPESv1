const Validator = require("../Validator");
const { loadAllQuestions } = require("./extractor");

class AmbiguityValidator extends Validator {
    constructor() {
        super("AmbiguityValidator");
        this.confidence = 75;

        // Vague qualifiers that reduce discrimination
        this.vagueQualifiers = [
            /\busually\b/i,
            /\bnormal(?:ly)?\b/i,
            /\bgeneral(?:ly)?\b/i,
            /\boften\b/i,
            /\btypical(?:ly)?\b/i,
            /\bsometimes\b/i,
            /\bcommonly\b/i,
            /\bfrequently\b/i,
            /\brarely\b/i,
            /\boccasionally\b/i,
            /\bmay\b/i,
            /\bmight\b/i,
            /\bcould be\b/i,
            /\btends?\s+to\b/i,
        ];

        // Overlap threshold for distractor similarity
        this.overlapThreshold = 0.70;
    }

    validate() {
        this.start();

        const questions = loadAllQuestions();
        let scanned = 0;
        let findings = 0;
        let vagueCount = 0;

        questions.forEach(q => {
            if (q._isCase && !q._isCaseItem) return;

            const qid = q.ItemID || q.QuestionID || `${q._sourceFile}:?`;
            scanned++;

            // 1. Check choices for vague qualifiers
            if (q.Choices) {
                Object.entries(q.Choices).forEach(([letter, text]) => {
                    this.vagueQualifiers.forEach(regex => {
                        if (regex.test(text)) {
                            this.addWarning(`${qid} Choice ${letter}: "${text}" — contains vague qualifier matching /${regex.source}/`);
                            findings++;
                            vagueCount++;
                        }
                    });
                });

                // 2. Check for overlapping distractors (choices that say similar things)
                const letters = Object.keys(q.Choices);
                for (let i = 0; i < letters.length; i++) {
                    for (let j = i + 1; j < letters.length; j++) {
                        const a = q.Choices[letters[i]];
                        const b = q.Choices[letters[j]];
                        const sim = this.wordOverlap(a, b);
                        if (sim >= this.overlapThreshold) {
                            // Don't flag if one is the correct answer (distractors should be distinct from correct)
                            // But DO flag if the overlap is between two distractors
                            const isDistractorOverlap =
                                letters[i] !== q.Correct && letters[j] !== q.Correct;

                            if (isDistractorOverlap) {
                                this.addWarning(`${qid}: Choices ${letters[i]} and ${letters[j]} have high word overlap (${(sim * 100).toFixed(0)}%) — may fail to discriminate`);
                                findings++;
                            }
                        }
                    }
                }
            }

            // 3. Check prompt for vague qualifiers
            if (q.Prompt) {
                this.vagueQualifiers.forEach(regex => {
                    if (regex.test(q.Prompt)) {
                        // Only flag if in a way that diminishes precision (starts with vague word)
                        this.addWarning(`${qid} Prompt: "${q.Prompt.substring(0, 80)}..." — contains vague qualifier matching /${regex.source}/`);
                        findings++;
                    }
                });
            }
        });

        this.addStatistic("questionsScanned", scanned);
        this.addStatistic("findings", findings);
        this.addStatistic("vagueQualifierHits", vagueCount);
        this.finish();
        return this.report();
    }

    wordOverlap(a, b) {
        if (!a || !b) return 0;
        const aWords = a.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(w => w.length > 3);
        const bWords = b.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/).filter(w => w.length > 3);

        if (aWords.length === 0 || bWords.length === 0) return 0;

        const setB = new Set(bWords);
        const matches = aWords.filter(w => setB.has(w)).length;

        return matches / Math.max(aWords.length, bWords.length);
    }
}

module.exports = AmbiguityValidator;
