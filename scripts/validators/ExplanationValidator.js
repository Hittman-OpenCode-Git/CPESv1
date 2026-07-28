const path = require("path");
const fs = require("fs");
const Validator = require("./Validator");
const config = require("../config");

class ExplanationValidator extends Validator {
    constructor() {
        super("Explanation Validator");
        this.placeholderPatterns = [
            { pattern: /This is the correct choice/i, label: '"This is the correct choice"' },
            { pattern: /Plausible distractor: this choice misapplies/i, label: '"Plausible distractor: this choice misapplies..."' },
            { pattern: /^Plausible distractor:/i, label: '"Plausible distractor:"' },
            { pattern: /Common misunderstanding/i, label: '"Common misunderstanding"' },
            { pattern: /This answer is correct because it is correct/i, label: '"This answer is correct because it is correct"' },
            { pattern: /^This answer is correct/i, label: '"This answer is correct"' },
        ];
    }

    validate() {
        this.start();

        this.questionsWithPlaceholders = 0;
        this.fieldsWithPlaceholders = 0;
        this.shortExplanations = 0;
        this.placeholdersByType = {};
        this.totalMCQsChecked = 0;
        this.totalCaseItemsChecked = 0;
        this.totalMCQExplanationCorrect = 0;
        this.totalMCQExplanationWrong = 0;
        this.correctExplanationAvgLen = 0;
        this.wrongExplanationAvgLen = 0;
        this.totalCorrectLen = 0;
        this.totalWrongLen = 0;
        this.totalWrongCount = 0;

        const root = config.paths.root;
        const packs = config.questionPacks;

        packs.forEach(file => {
            const fullPath = path.join(root, file);
            if (!fs.existsSync(fullPath)) {
                this.addWarning(`Question pack not found: ${file}`);
                return;
            }
            const content = fs.readFileSync(fullPath, "utf8");
            const questions = this.extractQuestions(content, file);
            if (!questions || questions.length === 0) {
                this.addWarning(`No questions found in ${file}`);
                return;
            }
            this.totalMCQsChecked += questions.length;
            questions.forEach((q, idx) => {
                this.validateQuestion(q, file, idx);
            });
        });

        // Check case banks
        const caseBanks = config.caseBanks;
        caseBanks.forEach(file => {
            const fullPath = path.join(root, file);
            if (!fs.existsSync(fullPath)) return;
            const content = fs.readFileSync(fullPath, "utf8");
            const cases = this.extractCases(content, file);
            if (!cases) return;
            cases.forEach((c, caseIdx) => {
                if (c.Items && Array.isArray(c.Items)) {
                    c.Items.forEach((item, itemIdx) => {
                        this.totalCaseItemsChecked++;
                        if (item.Explanation) {
                            const val = String(item.Explanation);
                            this.checkPlaceholders(val, `${file}[${caseIdx}] item[${itemIdx}] (${c.CaseID || "?"})`, "Explanation");
                            if (val.length < 50) {
                                this.shortExplanations++;
                                this.addWarning(`${file}[${caseIdx}] item[${itemIdx}] (${c.CaseID || "?"}): Explanation is short (${val.length} chars)`);
                            }
                        }
                    });
                }
            });
        });

        // Compute averages
        if (this.totalMCQExplanationCorrect > 0) {
            this.correctExplanationAvgLen = Math.round(this.totalCorrectLen / this.totalMCQExplanationCorrect);
        }
        if (this.totalWrongCount > 0) {
            this.wrongExplanationAvgLen = Math.round(this.totalWrongLen / this.totalWrongCount);
        }

        // Statistics
        this.addStatistic("MCQ Questions Checked", this.totalMCQsChecked);
        this.addStatistic("Case Items Checked", this.totalCaseItemsChecked);
        this.addStatistic("Questions with Placeholder Explanations", this.questionsWithPlaceholders);
        this.addStatistic("Fields with Placeholder Text", this.fieldsWithPlaceholders);
        this.addStatistic("Short Explanations (<50 chars)", this.shortExplanations);
        this.addStatistic("Correct Explanation Avg Length", this.correctExplanationAvgLen);
        this.addStatistic("Wrong Explanation Avg Length", this.wrongExplanationAvgLen);

        Object.entries(this.placeholdersByType).forEach(([type, count]) => {
            this.addStatistic(`Placeholder Pattern: ${type}`, count);
        });

        if (this.questionsWithPlaceholders > 0) {
            this.addWarning(`${this.questionsWithPlaceholders} questions still contain placeholder explanation text. See statistics for details.`);
        }
        if (this.shortExplanations > 0) {
            this.addWarning(`${this.shortExplanations} explanations are shorter than the recommended 50-character minimum.`);
        }

        this.finish();
        return this.report();
    }

    extractQuestions(content, filename) {
        const varMatch = content.match(/(?:const|let|var)\s+(MCQ_BANK_\w+)\s*=\s*\[/);
        if (!varMatch) return null;
        const arrStart = content.indexOf('[', varMatch.index);
        let depth = 1, pos = arrStart + 1;
        let inString = false, stringChar = "", escape = false;
        while (depth > 0 && pos < content.length) {
            const ch = content[pos];
            if (escape) { escape = false; pos++; continue; }
            if (inString) {
                if (ch === '\\') { escape = true; pos++; continue; }
                if (ch === stringChar) { inString = false; stringChar = ""; }
                pos++; continue;
            }
            if (ch === '"' || ch === "'") {
                inString = true;
                stringChar = ch;
                pos++; continue;
            }
            if (ch === '[') depth++;
            else if (ch === ']') depth--;
            pos++;
        }
        const jsStr = content.substring(arrStart, pos);
        try { return JSON.parse(jsStr); } catch(e) {
            try {
                const fn = new Function('return (' + jsStr + ')');
                return fn();
            } catch(e2) { return null; }
        }
    }

    extractCases(content, filename) {
        const varMatch = content.match(/(?:const|let|var)\s+(ENHANCED_CASE_BASE\d*)\s*=\s*\[/);
        if (!varMatch) return null;
        const arrStart = content.indexOf('[', varMatch.index);
        let depth = 1, pos = arrStart + 1;
        let inString = false, stringChar = "", escape = false;
        while (depth > 0 && pos < content.length) {
            const ch = content[pos];
            if (escape) { escape = false; pos++; continue; }
            if (inString) {
                if (ch === '\\') { escape = true; pos++; continue; }
                if (ch === stringChar) { inString = false; stringChar = ""; }
                pos++; continue;
            }
            if (ch === '"' || ch === "'") {
                inString = true;
                stringChar = ch;
                pos++; continue;
            }
            if (ch === '[') depth++;
            else if (ch === ']') depth--;
            pos++;
        }
        const jsStr = content.substring(arrStart, pos);
        try { return JSON.parse(jsStr); } catch(e) {
            try {
                const fn = new Function('return (' + jsStr + ')');
                return fn();
            } catch(e2) { return null; }
        }
    }

    validateQuestion(q, filename, idx) {
        const prefix = `${filename} [${idx}] (${q.QuestionID || "?"})`;
        let qHasPlaceholder = false;

        // Check ExplanationCorrect
        if (q.ExplanationCorrect !== undefined && q.ExplanationCorrect !== null) {
            const val = String(q.ExplanationCorrect);
            this.totalMCQExplanationCorrect++;
            this.totalCorrectLen += val.length;
            if (val.length < 50) {
                this.shortExplanations++;
                this.addWarning(`${prefix}: ExplanationCorrect is short (${val.length} chars)`);
            }
            if (this.checkPlaceholders(val, prefix, "ExplanationCorrect")) {
                qHasPlaceholder = true;
            }
        }

        // Check ExplanationWrongA-D
        ["A", "B", "C", "D"].forEach(letter => {
            const field = "ExplanationWrong" + letter;
            if (q[field] !== undefined && q[field] !== null) {
                const val = String(q[field]);
                this.totalMCQExplanationWrong++;
                if (val.length > 0) {
                    this.totalWrongCount++;
                    this.totalWrongLen += val.length;
                }
                if (val === "" && letter === q.CorrectChoice) return; // Empty is OK for correct slot
                if (val.length > 0 && letter === q.CorrectChoice) {
                    this.addError(`${prefix}: ${field} is non-empty at the correct-answer slot (EV8 / DL-008 violation). Must be empty ("").`);
                }
                if (val.length > 0 && val.length < 50) {
                    this.shortExplanations++;
                    this.addWarning(`${prefix}: ${field} is short (${val.length} chars)`);
                }
                if (this.checkPlaceholders(val, prefix, field)) {
                    qHasPlaceholder = true;
                }
            }
        });

        if (qHasPlaceholder) {
            this.questionsWithPlaceholders++;
        }
    }

    checkPlaceholders(text, prefix, fieldName) {
        let found = false;
        this.placeholderPatterns.forEach(p => {
            if (p.pattern.test(text)) {
                this.addWarning(`${prefix}: ${fieldName} contains placeholder pattern ${p.label}`);
                found = true;
                this.placeholdersByType[p.label] = (this.placeholdersByType[p.label] || 0) + 1;
                this.fieldsWithPlaceholders++;
            }
        });
        return found;
    }
}

module.exports = ExplanationValidator;
