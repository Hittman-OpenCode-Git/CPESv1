const path = require("path");
const fs = require("fs");
const Validator = require("./Validator");
const config = require("../config");
const CaseExtractor = require("../lib/CaseExtractor");
const taxonomy = require("./config/taxonomy");

class MetadataValidator extends Validator {
    constructor() {
        super("Metadata Validator");
        this.caseIDPattern = /^CBQ\d*-[A-F]\d*$/;
        this.itemIDPattern = /^CBQ\d*-[A-F]\d*-Q\d+$/;
        this.exhibitIDPattern = /^CBQ\d*-[A-F]\d*-E\d+$/;
        this.versionPattern = /^\d+\.\d+$/;
        this.isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
    }

    validate() {
        this.start();
        const root = config.paths.root;
        const banks = config.caseBanks;
        let totalCases = 0;

        banks.forEach(file => {
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
            cases.forEach((c, idx) => {
                totalCases++;
                this.validateCase(c, file, idx);
            });
        });

        this.addStatistic("Cases Checked", totalCases);
        this.finish();
        return this.report();
    }

    extractCases(content, filename) {
        return CaseExtractor.extractFromContent(content);
    }

    validateCase(c, filename, idx) {
        const prefix = `${filename}[${idx}]`;
        if (!c.CaseID) {
            this.addError(`${prefix}: Missing CaseID`);
            return;
        }
        if (!this.caseIDPattern.test(c.CaseID)) {
            this.addError(`${prefix}: CaseID "${c.CaseID}" does not match pattern CBQ{N}-{Section}{N}`);
        }
        if (!c.Title || c.Title.trim() === "") {
            this.addError(`${prefix} (${c.CaseID || "?"}): Missing Title`);
        }
        if (!c.SectionTags || !Array.isArray(c.SectionTags) || c.SectionTags.length === 0) {
            this.addError(`${prefix} (${c.CaseID || "?"}): Missing or empty SectionTags`);
        } else {
            c.SectionTags.forEach(tag => {
                if (!taxonomy.validSectionTags.includes(tag)) {
                    this.addError(`${prefix} (${c.CaseID}): Invalid SectionTag "${tag}"`);
                }
            });
            if (c.SectionTags.length === 2) {
                const allowed = (c.SectionTags[0] === "E" && c.SectionTags[1] === "F") ||
                                (c.SectionTags[0] === "F" && c.SectionTags[1] === "E");
                if (!allowed) {
                    this.addWarning(`${prefix} (${c.CaseID}): Cross-domain SectionTags should be E+F only`);
                }
            }
        }
        if (c.BlueprintDomain !== undefined) {
            if (!taxonomy.domainToSection[c.BlueprintDomain]) {
                this.addWarning(`${prefix} (${c.CaseID}): BlueprintDomain "${c.BlueprintDomain}" not in standard domain list`);
            }
        }
        if (c.Difficulty !== undefined) {
            if (!taxonomy.difficultyLevels.includes(c.Difficulty)) {
                this.addError(`${prefix} (${c.CaseID}): Invalid Difficulty "${c.Difficulty}"`);
            }
        }
        if (c.DifficultyScore !== undefined) {
            if (!Number.isInteger(c.DifficultyScore) || c.DifficultyScore < 1 || c.DifficultyScore > 5) {
                this.addError(`${prefix} (${c.CaseID}): DifficultyScore must be integer 1-5, got "${c.DifficultyScore}"`);
            }
        }
        if (c.EstimatedMinutes !== undefined) {
            if (!Number.isInteger(c.EstimatedMinutes) || c.EstimatedMinutes < 20 || c.EstimatedMinutes > 40) {
                this.addWarning(`${prefix} (${c.CaseID}): EstimatedMinutes ${c.EstimatedMinutes} outside recommended range 20-40`);
            }
        }
        if (c.ProductionStatus !== undefined) {
            if (!taxonomy.productionStatuses.includes(c.ProductionStatus)) {
                this.addError(`${prefix} (${c.CaseID}): Invalid ProductionStatus "${c.ProductionStatus}"`);
            }
        }
        if (c.Version !== undefined && !this.versionPattern.test(c.Version)) {
            this.addWarning(`${prefix} (${c.CaseID}): Version "${c.Version}" does not match semantic version pattern`);
        }
        if (c.Confidence !== undefined) {
            if (!Number.isInteger(c.Confidence) || c.Confidence < 0 || c.Confidence > 100) {
                this.addError(`${prefix} (${c.CaseID}): Confidence must be integer 0-100`);
            }
        }
        if (c.QuestionCount !== undefined && c.Items !== undefined) {
            if (c.QuestionCount !== c.Items.length) {
                this.addError(`${prefix} (${c.CaseID}): QuestionCount ${c.QuestionCount} does not match Items.length ${c.Items.length}`);
            }
        }
        if (c.ExhibitCount !== undefined && c.Exhibits !== undefined) {
            if (c.ExhibitCount !== c.Exhibits.length) {
                this.addError(`${prefix} (${c.CaseID}): ExhibitCount ${c.ExhibitCount} does not match Exhibits.length ${c.Exhibits.length}`);
            }
        }
        ["CreatedDate", "ModifiedDate"].forEach(field => {
            if (c[field] !== undefined && !this.isoDatePattern.test(c[field])) {
                this.addWarning(`${prefix} (${c.CaseID}): ${field} "${c[field]}" should be ISO 8601 date (YYYY-MM-DD)`);
            }
        });
        if (c.Items && Array.isArray(c.Items)) {
            c.Items.forEach((item, itemIdx) => this.validateItem(item, c, filename, idx, itemIdx));
        }
        if (c.Exhibits && Array.isArray(c.Exhibits)) {
            c.Exhibits.forEach((exhibit, exIdx) => this.validateExhibit(exhibit, c, filename, idx, exIdx));
        }
        if (c.RevisionHistory && Array.isArray(c.RevisionHistory)) {
            c.RevisionHistory.forEach((rev, revIdx) => {
                ["Date", "Version", "Author", "Summary"].forEach(field => {
                    if (!rev[field]) {
                        this.addWarning(`${prefix} (${c.CaseID}): RevisionHistory[${revIdx}] missing "${field}"`);
                    }
                });
            });
        }
    }

    validateItem(item, c, filename, caseIdx, itemIdx) {
        const caseID = c.CaseID || "?";
        const prefix = `${filename}[${caseIdx}] item[${itemIdx}] (${caseID})`;

        if (item.ItemID !== undefined) {
            if (!this.itemIDPattern.test(item.ItemID)) {
                this.addError(`${prefix}: ItemID "${item.ItemID}" does not match pattern {CaseID}-Q{N}`);
            }
        }
        if (!item.Type) {
            this.addError(`${prefix}: Missing Type`);
        } else if (!taxonomy.questionTypes.includes(item.Type)) {
            this.addError(`${prefix}: Invalid Type "${item.Type}"`);
        }
        if (item.Prompt === undefined || String(item.Prompt).trim() === "") {
            this.addWarning(`${prefix}: Missing or empty Prompt`);
        }
        if (item.Correct === undefined) {
            this.addError(`${prefix}: Missing Correct answer`);
        } else if (item.Type) {
            this.validateCorrectType(item, prefix);
        }
        if (item.Explanation === undefined || String(item.Explanation).trim() === "") {
            this.addWarning(`${prefix}: Missing Explanation`);
        } else if (String(item.Explanation).length < 50) {
            this.addWarning(`${prefix}: Explanation too short (${String(item.Explanation).length} chars, minimum 50)`);
        }
        if (!item.Topic || String(item.Topic).trim() === "") {
            this.addWarning(`${prefix}: Missing or empty Topic`);
        }
        if (item.Difficulty !== undefined) {
            if (!taxonomy.difficultyLevels.includes(item.Difficulty)) {
                this.addError(`${prefix}: Invalid item Difficulty "${item.Difficulty}"`);
            }
        }
        if (item.DifficultyScore !== undefined) {
            if (!Number.isInteger(item.DifficultyScore) || item.DifficultyScore < 1 || item.DifficultyScore > 5) {
                this.addError(`${prefix}: Item DifficultyScore must be integer 1-5`);
            }
        }
        if (item.CognitiveLevel !== undefined) {
            if (!taxonomy.cognitiveLevels.includes(item.CognitiveLevel)) {
                this.addError(`${prefix}: Invalid CognitiveLevel "${item.CognitiveLevel}"`);
            }
        }
        if (item.CalculationRequired !== undefined && typeof item.CalculationRequired !== "boolean") {
            this.addError(`${prefix}: CalculationRequired must be boolean`);
        }
        if (item.Type === "select" || item.Type === "multi") {
            if (!item.Choices || !Array.isArray(item.Choices)) {
                this.addError(`${prefix}: Missing Choices array for type "${item.Type}"`);
            } else if (item.Choices.length < 3 || item.Choices.length > 6) {
                this.addWarning(`${prefix}: Choices length ${item.Choices.length} outside recommended 3-6`);
            }
        }
        if (item.Type === "match") {
            if (!item.LeftItems || !Array.isArray(item.LeftItems)) {
                this.addError(`${prefix}: Missing LeftItems for match type`);
            }
            if (!item.RightItems || !Array.isArray(item.RightItems)) {
                this.addError(`${prefix}: Missing RightItems for match type`);
            }
        }
        if (item.ExplanationVersion !== undefined) {
            if (!Number.isInteger(item.ExplanationVersion) || item.ExplanationVersion < 1) {
                this.addWarning(`${prefix}: ExplanationVersion must be positive integer`);
            }
        }
    }

    validateCorrectType(item, prefix) {
        switch (item.Type) {
            case "numeric":
            case "select":
            case "fill":
                if (typeof item.Correct !== "string" && typeof item.Correct !== "number") {
                    this.addError(`${prefix}: Correct for "${item.Type}" should be string/number`);
                }
                break;
            case "multi":
                if (!Array.isArray(item.Correct)) {
                    this.addError(`${prefix}: Correct for "multi" should be an Array`);
                }
                break;
            case "match":
                if (typeof item.Correct !== "object" || Array.isArray(item.Correct) || item.Correct === null) {
                    this.addError(`${prefix}: Correct for "match" should be an Object`);
                }
                break;
        }
    }

    validateExhibit(exhibit, c, filename, caseIdx, exIdx) {
        const caseID = c.CaseID || "?";
        const prefix = `${filename}[${caseIdx}] exhibit[${exIdx}] (${caseID})`;

        if (exhibit.ExhibitID !== undefined) {
            if (!this.exhibitIDPattern.test(exhibit.ExhibitID)) {
                this.addError(`${prefix}: ExhibitID "${exhibit.ExhibitID}" does not match pattern {CaseID}-E{N}`);
            }
        }
        if (exhibit.Type !== undefined) {
            if (!taxonomy.exhibitTypes.includes(exhibit.Type)) {
                this.addWarning(`${prefix}: Unrecognized exhibit Type "${exhibit.Type}"`);
            }
        }
        if (exhibit.Type === "table") {
            if (!exhibit.Headers || !Array.isArray(exhibit.Headers)) {
                this.addWarning(`${prefix}: Table exhibit missing Headers`);
            }
            if (!exhibit.Rows || !Array.isArray(exhibit.Rows)) {
                this.addWarning(`${prefix}: Table exhibit missing Rows`);
            }
        }
        if (exhibit.Type === "text") {
            if (!exhibit.Body || String(exhibit.Body).trim() === "") {
                this.addWarning(`${prefix}: Text exhibit missing Body`);
            }
        }
    }
}

module.exports = MetadataValidator;
