const Validator = require("../Validator");
const { loadAllQuestions } = require("./extractor");

class AbsoluteLanguageValidator extends Validator {
    constructor() {
        super("AbsoluteLanguageValidator");
        this.confidence = 95;

        this.patterns = [
            // Error-level patterns (almost never justified in a well-written choice)
            { regex: /\balways\b/i, severity: "warning", label: "always" },
            { regex: /\bnever\b/i, severity: "warning", label: "never" },

            // Warning-level patterns (sometimes justified, often not)
            { regex: /\b(?:only|solely|exclusively)\b/i, severity: "warning", label: "only/exclusively" },
            { regex: /\bmust\b/i, severity: "warning", label: "must" },

            // Info-level (context-dependent, flag for human review)
            { regex: /\bexactly\b/i, severity: "info", label: "exactly" },
            { regex: /\bimpossible\b/i, severity: "info", label: "impossible" },
            { regex: /no (?:other|exception|alternative)/i, severity: "info", label: "no-other/exception/alternative" },
        ];
    }

    validate() {
        this.start();

        const questions = loadAllQuestions();
        let scanned = 0;
        let findings = 0;
        const byPattern = {};

        questions.forEach(q => {
            if (q._isCase && !q._isCaseItem) return;

            const qid = q.ItemID || q.QuestionID || `${q._sourceFile}:?`;
            scanned++;

            if (!q.Choices) return;

            Object.entries(q.Choices).forEach(([letter, text]) => {
                this.patterns.forEach(pattern => {
                    if (pattern.regex.test(text)) {
                        const msg = `${qid} Choice ${letter}: "${text}" — contains absolute language "${pattern.label}"`;
                        if (pattern.severity === "error") {
                            this.addError(msg);
                        } else if (pattern.severity === "warning") {
                            this.addWarning(msg);
                        }
                        findings++;
                        byPattern[pattern.label] = (byPattern[pattern.label] || 0) + 1;
                    }
                });
            });

            // Check prompt for absolute language too
            if (q.Prompt) {
                this.patterns.forEach(pattern => {
                    if (pattern.regex.test(q.Prompt)) {
                        const msg = `${qid} Prompt: "${q.Prompt}" — contains absolute language "${pattern.label}"`;
                        if (pattern.severity === "error") {
                            this.addError(msg);
                        } else if (pattern.severity === "warning") {
                            this.addWarning(msg);
                        }
                        findings++;
                        byPattern[pattern.label] = (byPattern[pattern.label] || 0) + 1;
                    }
                });
            }
        });

        this.addStatistic("questionsScanned", scanned);
        this.addStatistic("findings", findings);
        Object.entries(byPattern).forEach(([k, v]) => {
            this.addStatistic(`pattern.${k}`, v);
        });
        this.finish();
        return this.report();
    }
}

module.exports = AbsoluteLanguageValidator;
