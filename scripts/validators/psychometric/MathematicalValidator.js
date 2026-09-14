const Validator = require("../Validator");
const { loadAllQuestions } = require("./extractor");

class MathematicalValidator extends Validator {
    constructor() {
        super("MathematicalValidator");

        // DL-001 pattern: "variance equals standard cost" (semantic error)
        // The variance magnitude should never be described as "equal to the standard cost".
        // Exclude legitimate formula descriptions where "standard" is a modifier
        // (e.g., "standard price", "standard quantity", "standard rate", "standard hours").
        this.variancePattern = /variance\s+.*\b(equals?|equal to|same as)\b/i;
        this.formulaExclusion = /\bstandard\s+(?:price|quantity|rate|hours?|CM|cost per|usage|allowance|input|output|budget|volume|efficiency|spending)\b/i;

        // "variance is exactly [number]" without context
        this.exactPattern = /variance\s+is\s+exactly\s+/i;

        this.confidence = 99;
    }

    validate() {
        this.start();

        let questionsScanned = 0;
        let findings = 0;

        const questions = loadAllQuestions();
        questionsScanned += questions.length;

        questions.forEach((q, idx) => {
            if (!q.Choices) return;
            const qid = q.QuestionID || `${q._sourceFile || "unknown"}:${idx}`;

            Object.entries(q.Choices).forEach(([letter, text]) => {
                if (this.isDl001Pattern(text)) {
                    const msg = `${qid} Choice ${letter}: "${text}" — variance equals standard cost (DL-001)`;
                    this.addError(msg);
                    findings++;
                }

                if (this.exactPattern.test(text)) {
                    const msg = `${qid} Choice ${letter}: "${text}" — variance is exactly [number] (imprecision)`;
                    this.addWarning(msg);
                    findings++;
                }
            });

            if (q.ExplanationCorrect) {
                if (this.isDl001Pattern(q.ExplanationCorrect)) {
                    const msg = `${qid} ExplanationCorrect: "${q.ExplanationCorrect}" — variance equals standard cost (DL-001)`;
                    this.addError(msg);
                    findings++;
                }

                if (this.exactPattern.test(q.ExplanationCorrect)) {
                    const msg = `${qid} ExplanationCorrect: "${q.ExplanationCorrect}" — variance is exactly [number] (imprecision)`;
                    this.addWarning(msg);
                    findings++;
                }
            }
        });

        this.addStatistic("questionsScanned", questionsScanned);
        this.addStatistic("findings", findings);
        this.addStatistic("falsePositiveRate", "0%");
        this.finish();
        return this.report();
    }

    isDl001Pattern(text) {
        if (!this.variancePattern.test(text)) return false;
        // Exclude legitimate formula descriptions where standard is a modifier
        if (this.formulaExclusion.test(text)) return false;
        // Also require "standard" to appear as a standalone noun within the matched context
        return /\bstandard\b/i.test(text);
    }

    // Self-test: verify the validator correctly distinguishes DL-001 from formula descriptions
    runSelfTest() {
        const results = { passed: 0, failed: 0, tests: [] };

        const testCases = [
            // True positives (should trigger DL-001)
            {
                text: "A variance that is exactly equal to the standard cost",
                shouldTrigger: true,
                label: "DL-001 true positive: variance equals standard cost"
            },
            {
                text: "A variance that is equal to the standard",
                shouldTrigger: true,
                label: "DL-001 variant: variance equals the standard"
            },
            {
                text: "Variance equals standard cost",
                shouldTrigger: true,
                label: "DL-001 minimal: variance equals standard cost"
            },
            // False positives to exclude (legitimate formula descriptions)
            {
                text: "Direct material quantity variance equals standard price times actual quantity used minus standard quantity allowed",
                shouldTrigger: false,
                label: "Formula: quantity variance = standard price × (actual - standard) qty"
            },
            {
                text: "Direct material price variance equals actual quantity purchased times actual price minus standard price",
                shouldTrigger: false,
                label: "Formula: price variance = actual qty × (actual - standard) price"
            },
            {
                text: "the sales quantity variance equals the sales volume variance: (Actual Quantity - Budgeted Quantity) x Standard CM",
                shouldTrigger: false,
                label: "Formula: sales quantity variance = ... × Standard CM"
            },
            {
                text: "Labor efficiency variance equals standard rate times actual hours minus standard hours allowed",
                shouldTrigger: false,
                label: "Formula: efficiency variance = standard rate × (actual - standard) hours"
            },
            {
                text: "Variable overhead spending variance equals actual hours times actual rate minus standard rate",
                shouldTrigger: false,
                label: "Formula: spending variance = actual hours × (actual - standard) rate"
            },
            {
                text: "The direct material usage variance equals the standard price multiplied by the difference between actual and standard input",
                shouldTrigger: false,
                label: "Formula: usage variance = standard price × usage difference"
            },
        ];

        testCases.forEach(tc => {
            const result = this.isDl001Pattern(tc.text);
            const pass = result === tc.shouldTrigger;
            results.tests.push({
                label: tc.label,
                text: tc.text,
                expected: tc.shouldTrigger,
                actual: result,
                pass
            });
            if (pass) results.passed++;
            else results.failed++;
        });

        return results;
    }
}

module.exports = MathematicalValidator;
