const path = require("path");
const fs = require("fs");
const Validator = require("./Validator");
const config = require("../config");

class CaseIntegrityValidator extends Validator {
    constructor() {
        super("Case Integrity Validator");
        this.placeholderPatterns = [
            /Incorrect\s*(Response|Application|1|2)/i,
            /Correct\s*Response/i,
            /Placeholder/i,
            /Lorem/i,
            /TBD/i,
            /TODO/i,
            /Question\s*Text/i,
            /Option\s+A/i,
            /Sample\s+Question/i,
            /Example\s+Answer/i,
            /Standard\s+definition/i,
            /Standard\s+terminology/i,
            /Standard\s+concept/i,
            /Mapped\s+to\s+standard/i,
            /Theoretical\s+application/i,
            /Theoretical\s+alignment/i,
            /Computed\s+per\s+standard/i,
            /Calculated\s+based\s+on\s+standard/i,
            /Application\s+of\s+valid/i,
            /Based\s+on\s+theoretical/i,
            /Matched\s+per\s+standard/i,
            /Invalid\s+attribute/i,
            /False\s+statement/i,
            /Incorrect\s+Application/i
        ];
    }

    validate() {
        this.start();

        this.totalCases = 0;
        this.totalItems = 0;
        this.casesWithDuplicateStems = 0;
        this.casesWithDuplicateChoices = 0;
        this.casesWithPlaceholderChoices = 0;
        this.casesWithEmptyPrompts = 0;
        this.itemsWithMissingChoices = 0;
        this.itemsWithMissingExplanations = 0;
        this.duplicateItemIDs = [];
        this.casesWithDuplicateExplanations = 0;
        this.casesWithMissingExhibits = 0;
        this.seenItemIDs = new Set();
        this.duplicateStemCases = [];
        this.duplicateChoiceCases = [];
        this.placeholderChoiceCases = [];
        this.emptyPromptCases = [];

        const root = config.paths.root;
        const caseBanks = config.caseBanks;

        caseBanks.forEach(file => {
            const fullPath = path.join(root, file);
            if (!fs.existsSync(fullPath)) {
                this.addWarning(`Case bank not found: ${file}`);
                return;
            }
            const content = fs.readFileSync(fullPath, "utf8");
            const cases = this.extractCases(content, file);
            if (!cases || cases.length === 0) {
                this.addWarning(`No cases found in ${file}`);
                return;
            }
            cases.forEach((c, caseIdx) => {
                this.validateCase(c, file, caseIdx);
            });
        });

        this.addStatistic("Total Cases Checked", this.totalCases);
        this.addStatistic("Total Items Checked", this.totalItems);
        this.addStatistic("Cases with Duplicate Stems", this.casesWithDuplicateStems);
        this.addStatistic("Cases with Duplicate Choices", this.casesWithDuplicateChoices);
        this.addStatistic("Cases with Placeholder Choices", this.casesWithPlaceholderChoices);
        this.addStatistic("Cases with Empty Prompts", this.casesWithEmptyPrompts);
        this.addStatistic("Items with Missing Choices", this.itemsWithMissingChoices);
        this.addStatistic("Items with Missing Explanations", this.itemsWithMissingExplanations);
        this.addStatistic("Duplicate ItemIDs Found", this.duplicateItemIDs.length);
        this.addStatistic("Cases with Duplicate Explanations", this.casesWithDuplicateExplanations);
        this.addStatistic("Cases with Missing Exhibits", this.casesWithMissingExhibits);

        if (this.duplicateStemCases.length > 0) {
            this.addError(`Duplicate stems found in cases: ${this.duplicateStemCases.join(", ")}`);
        }
        if (this.duplicateChoiceCases.length > 0) {
            this.addError(`Duplicate choices found in cases: ${this.duplicateChoiceCases.join(", ")}`);
        }
        if (this.placeholderChoiceCases.length > 0) {
            this.addError(`Placeholder choices found in cases: ${this.placeholderChoiceCases.join(", ")}`);
        }
        if (this.emptyPromptCases.length > 0) {
            this.addError(`Empty/missing prompts found in cases: ${this.emptyPromptCases.join(", ")}`);
        }
        if (this.itemsWithMissingChoices > 0) {
            this.addError(`${this.itemsWithMissingChoices} items have missing or insufficient choices`);
        }
        if (this.duplicateItemIDs.length > 0) {
            this.addError(`Duplicate ItemIDs: ${this.duplicateItemIDs.join(", ")}`);
        }
        if (this.itemsWithMissingExplanations > 0) {
            this.addWarning(`${this.itemsWithMissingExplanations} items have missing explanations`);
        }
        if (this.casesWithDuplicateExplanations > 0) {
            this.addWarning(`${this.casesWithDuplicateExplanations} cases have duplicate normalized explanations`);
        }
        if (this.casesWithMissingExhibits > 0) {
            this.addWarning(`${this.casesWithMissingExhibits} cases have no exhibits`);
        }

        this.finish();
        return this.report();
    }

    extractCases(content, filename) {
        const varMatch = content.match(/(?:const|let|var)\s+(ENHANCED_CASE_BASE\d*)\s*=\s*\[/);
        if (!varMatch) return null;
        const arrStart = content.indexOf('[', varMatch.index);
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
            } catch(e2) { return null; }
        }
    }

    validateCase(c, file, caseIdx) {
        if (!c.Items || !Array.isArray(c.Items) || c.Items.length === 0) {
            this.addWarning(`${file}[${caseIdx}] ${c.CaseID || "?"}: No items found`);
            return;
        }

        this.totalCases++;
        this.totalItems += c.Items.length;

        const caseRef = `${file}[${caseIdx}] ${c.CaseID || "?"}`;

        // Check missing exhibits
        if (!c.Exhibits || c.Exhibits.length === 0) {
            this.casesWithMissingExhibits++;
            this.addWarning(`${caseRef}: No exhibits present`);
        }

        // --- Duplicate stems check ---
        let stems = c.Items.map(it => (it.Prompt || '').toLowerCase().replace(/\(question \d+\)/g, '').trim());
        let normalizedStems = stems.filter(s => s.length > 0);
        let uniqueStems = new Set(normalizedStems);
        if (uniqueStems.size === 1 && normalizedStems.length > 1) {
            this.casesWithDuplicateStems++;
            this.duplicateStemCases.push(c.CaseID || caseRef);
        }

        // --- Check prompts for empty ---
        let emptyPromptFlag = false;
        for (let it of c.Items) {
            if (!it.Prompt || it.Prompt.trim().length < 5) {
                emptyPromptFlag = true;
                break;
            }
        }
        if (emptyPromptFlag) {
            this.casesWithEmptyPrompts++;
            this.emptyPromptCases.push(c.CaseID || caseRef);
        }

        // --- Check each item ---
        let allChoicesIdentical = true;
        let firstChoices = null;
        let placeholderChoiceFlag = false;
        let allExplanationsSame = true;
        let firstExplanation = null;

        for (let i = 0; i < c.Items.length; i++) {
            let it = c.Items[i];
            let itemRef = `${caseRef} item[${i}] (${it.ItemID || "?"})`;

            // Check choices
            if (it.Type === 'select' || it.Type === 'multi') {
                if (!it.Choices || it.Choices.length < 2) {
                    this.itemsWithMissingChoices++;
                } else {
                    if (!firstChoices) firstChoices = JSON.stringify(it.Choices);
                    else if (JSON.stringify(it.Choices) !== firstChoices) allChoicesIdentical = false;

                    for (let ch of it.Choices) {
                        for (let pat of this.placeholderPatterns) {
                            if (pat.test(ch)) {
                                if (!placeholderChoiceFlag) {
                                    this.casesWithPlaceholderChoices++;
                                    this.placeholderChoiceCases.push(c.CaseID || caseRef);
                                    placeholderChoiceFlag = true;
                                }
                                break;
                            }
                        }
                        if (placeholderChoiceFlag) break;
                    }
                }
            }

            // Check missing choices for non-numeric/fill/match
            if (it.Type === 'select' || it.Type === 'multi') {
                if (!it.Choices || it.Choices.length < 2) {
                    this.itemsWithMissingChoices++;
                    this.addWarning(`${itemRef}: Missing or insufficient choices`);
                }
            }

            // Check explanation
            if (!it.Explanation || it.Explanation.trim().length < 10) {
                this.itemsWithMissingExplanations++;
                this.addWarning(`${itemRef}: Missing or too short explanation`);
            }
            if (it.Explanation) {
                let norm = it.Explanation.toLowerCase().trim();
                if (!firstExplanation) firstExplanation = norm;
                else if (norm !== firstExplanation) allExplanationsSame = false;
            }

            // Check duplicate ItemIDs
            if (it.ItemID) {
                if (this.seenItemIDs.has(it.ItemID)) {
                    this.duplicateItemIDs.push(it.ItemID);
                }
                this.seenItemIDs.add(it.ItemID);
            } else {
                this.addWarning(`${itemRef}: Missing ItemID`);
            }
        }

        if (allChoicesIdentical && c.Items.length > 1 && firstChoices) {
            let hasPlaceholder = c.Items.some(it => it.Choices && it.Choices.some(ch =>
                this.placeholderPatterns.some(p => p.test(ch))
            ));
            if (!hasPlaceholder) {
                this.casesWithDuplicateChoices++;
                this.duplicateChoiceCases.push(c.CaseID || caseRef);
                this.addWarning(`${caseRef}: All items have identical choices`);
            }
        }

        if (allExplanationsSame && c.Items.length > 1 && firstExplanation) {
            this.casesWithDuplicateExplanations++;
            this.addWarning(`${caseRef}: All items have identical explanations ("${firstExplanation.substring(0, 60)}")`);
        }
    }
}

module.exports = CaseIntegrityValidator;
