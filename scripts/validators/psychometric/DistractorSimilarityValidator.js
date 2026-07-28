const Validator = require("../Validator");
const { loadAllQuestions } = require("./extractor");

class DistractorSimilarityValidator extends Validator {
    constructor() {
        super("DistractorSimilarityValidator");
        this.confidence = 70;

        // Jaccard similarity threshold for flagging
        this.highSimilarityThreshold = 0.70;

        // Moderate similarity (may indicate subtle overlap)
        this.moderateThreshold = 0.50;
    }

    validate() {
        this.start();

        const questions = loadAllQuestions();
        let scanned = 0;
        let highSimPairs = 0;
        let modSimPairs = 0;

        questions.forEach(q => {
            if (q._isCase && !q._isCaseItem) return;
            if (!q.Choices) return;

            const qid = q.ItemID || q.QuestionID || `${q._sourceFile}:?`;
            scanned++;

            const letters = Object.keys(q.Choices);

            for (let i = 0; i < letters.length; i++) {
                for (let j = i + 1; j < letters.length; j++) {
                    const a = q.Choices[letters[i]];
                    const b = q.Choices[letters[j]];
                    const sim = this.jaccardSimilarity(a, b);

                    if (sim >= this.highSimilarityThreshold) {
                        const isCorrectA = letters[i] === q.Correct;
                        const isCorrectB = letters[j] === q.Correct;

                        let context = "distractor-distractor";
                        if (isCorrectA || isCorrectB) {
                            context = "distractor-correct";
                        }

                        this.addWarning(`${qid}: Choices ${letters[i]} and ${letters[j]} (${context}) share high similarity (${(sim * 100).toFixed(0)}%)`);
                        highSimPairs++;
                    } else if (sim >= this.moderateThreshold) {
                        // Only flag moderate similarity for distractor-distractor pairs
                        const isCorrectA = letters[i] === q.Correct;
                        const isCorrectB = letters[j] === q.Correct;

                        if (!isCorrectA && !isCorrectB) {
                            this.addWarning(`${qid}: Choices ${letters[i]} and ${letters[j]} (distractor-distractor) share moderate similarity (${(sim * 100).toFixed(0)}%) — may reduce discrimination`);
                            modSimPairs++;
                        }
                    }
                }
            }
        });

        this.addStatistic("questionsScanned", scanned);
        this.addStatistic("highSimilarityPairs", highSimPairs);
        this.addStatistic("moderateSimilarityPairs", modSimPairs);
        this.addStatistic("totalFlagged", highSimPairs + modSimPairs);
        this.finish();
        return this.report();
    }

    jaccardSimilarity(a, b) {
        if (!a || !b) return 0;

        // Normalize: lowercase, remove punctuation, extract significant words (length > 2)
        const tokenize = (text) => {
            return new Set(
                text.toLowerCase()
                    .replace(/[^a-z0-9\s]/g, "")
                    .split(/\s+/)
                    .filter(w => w.length > 2 && !this.isStopWord(w))
            );
        };

        const setA = tokenize(a);
        const setB = tokenize(b);

        if (setA.size === 0 && setB.size === 0) return 0;
        if (setA.size === 0 || setB.size === 0) return 0;

        let intersection = 0;
        setA.forEach(w => { if (setB.has(w)) intersection++; });

        const union = new Set([...setA, ...setB]);
        return intersection / union.size;
    }

    isStopWord(word) {
        const stops = new Set([
            "the", "and", "for", "are", "but", "not", "you", "all", "can",
            "had", "her", "was", "one", "our", "out", "has", "have", "been",
            "its", "him", "his", "she", "who", "will", "would", "about",
            "than", "that", "this", "they", "with", "what", "when", "where",
            "which", "their", "there", "each", "from", "into", "over", "such",
            "only", "other", "more", "some", "these", "those", "very", "just",
            "also", "than", "then", "were", "may", "could", "should", "after",
            "before", "between", "both", "through", "during", "because", "been",
            "being", "does", "done", "much", "many", "most", "few", "too"
        ]);
        return stops.has(word);
    }
}

module.exports = DistractorSimilarityValidator;
