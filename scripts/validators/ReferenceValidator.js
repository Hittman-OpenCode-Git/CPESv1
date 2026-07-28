const path = require("path");
const fs = require("fs");
const Validator = require("./Validator");
const config = require("../config");
const CaseExtractor = require("../lib/CaseExtractor");
const taxonomy = require("./config/taxonomy");

class ReferenceValidator extends Validator {
    constructor() {
        super("Reference Validator");
    }

    validate() {
        this.start();
        const root = config.paths.root;
        const banks = config.caseBanks;

        let totalCases = 0;
        let orphanExhibits = 0;
        let orphanReferences = 0;
        let totalReferences = 0;

        // Load knowledge document references
        const formulaNames = this.loadFormulaNames(root);
        const decisionTreeNames = this.loadDecisionTreeNames(root);
        const trapRefs = this.loadTrapReferences(root);

        banks.forEach(file => {
            const fullPath = path.join(root, file);
            if (!fs.existsSync(fullPath)) return;
            const content = fs.readFileSync(fullPath, "utf8");
            const cases = this.extractCases(content, file);
            if (!cases) return;

            cases.forEach((c, idx) => {
                totalCases++;
                const result = this.validateReferences(c, file, idx, formulaNames, decisionTreeNames, trapRefs);
                orphanExhibits += result.orphanExhibits;
                orphanReferences += result.orphanReferences;
                totalReferences += result.totalReferences;
            });
        });

        this.addStatistic("Cases Checked", totalCases);
        this.addStatistic("Total References", totalReferences);
        this.addStatistic("Orphan Exhibits (unreferenced)", orphanExhibits);
        this.addStatistic("Orphan References (missing exhibits)", orphanReferences);

        this.finish();
        return this.report();
    }

    extractCases(content, filename) {
        return CaseExtractor.extractFromContent(content);
    }

    loadFormulaNames(root) {
        const formulaFile = path.join(root, "foundation", "FORMULA_MASTER.md");
        try {
            const content = fs.readFileSync(formulaFile, "utf8");
            const names = [];
            const exclude = new Set([
                "CMA Part 1 Formula Master", "Philosophy", "Formula Entry Template",
                "Cost Management", "Budgeting", "Standard Costing", "Inventory",
                "Formula Validation Rules", "AI Validation Checklist"
            ]);
            const regex = /^# (.+)$/gm;
            let m;
            while ((m = regex.exec(content)) !== null) {
                const name = m[1].trim();
                if (!exclude.has(name)) {
                    names.push(name);
                }
            }
            return names;
        } catch (e) {
            return taxonomy.formulaNames;
        }
    }

    loadDecisionTreeNames(root) {
        const treeFile = path.join(root, "review", "ACCOUNTING_DECISION_TREES.md");
        try {
            const content = fs.readFileSync(treeFile, "utf8");
            const names = [];
            const exclude = new Set([
                "CMA Part 1 Accounting Decision Trees", "Purpose",
                "General Question-Solving Framework", "AI Validation Rules", "Guiding Principle"
            ]);
            const regex = /^# (.+)$/gm;
            let m;
            while ((m = regex.exec(content)) !== null) {
                const name = m[1].trim();
                if (!exclude.has(name)) {
                    names.push(name);
                }
            }
            return names;
        } catch (e) {
            return taxonomy.decisionTreeNames;
        }
    }

    loadTrapReferences(root) {
        const trapFile = path.join(root, "knowledge", "05_COMMON_EXAM_TRAPS.md");
        const refs = [];
        try {
            const content = fs.readFileSync(trapFile, "utf8");
            const regex = /## Trap (\d+)[\s\S]*?(?=\n## |\n# |\Z)/g;
            let m;
            while ((m = regex.exec(content)) !== null) {
                const trapNum = parseInt(m[1], 10);
                const sectionContent = m[0];
                const lines = sectionContent.split('\n').filter(l => l.trim() && !l.startsWith('#'));
                const nameLine = lines.length > 0 ? lines[0].trim() : '';
                refs.push({ num: trapNum, name: nameLine, full: `Trap ${trapNum}: ${nameLine}` });
            }
        } catch (e) { /* ignore */ }
        return refs;
    }

    validateReferences(c, filename, idx, formulaNames, decisionTreeNames, trapRefs) {
        const caseID = c.CaseID || "?";
        const prefix = `${filename}[${idx}] (${caseID})`;
        const result = { orphanExhibits: 0, orphanReferences: 0, totalReferences: 0 };

        if (!c.Items || !Array.isArray(c.Items)) return result;
        if (!c.Exhibits || !Array.isArray(c.Exhibits)) return result;

        const validExhibitIDs = new Set();
        c.Exhibits.forEach(ex => {
            if (ex.ExhibitID) validExhibitIDs.add(ex.ExhibitID);
        });

        const referencedExhibitIDs = new Set();
        c.Items.forEach((item, itemIdx) => {
            const refs = this.extractReferences(item);
            refs.forEach(ref => {
                result.totalReferences++;
                referencedExhibitIDs.add(ref);
                if (!validExhibitIDs.has(ref)) {
                    result.orphanReferences++;
                    this.addError(
                        `${prefix} item[${itemIdx}] (${item.ItemID || "?"}): References ExhibitID "${ref}" which does not exist in this case`
                    );
                }
            });

            // --- FormulaReference validation (if populated) ---
            if (item.FormulaReference !== undefined && item.FormulaReference !== null && item.FormulaReference !== "") {
                if (!formulaNames.includes(item.FormulaReference)) {
                    this.addWarning(
                        `${prefix} item[${itemIdx}] (${item.ItemID || "?"}): FormulaReference "${item.FormulaReference}" not found in FORMULA_MASTER.md`
                    );
                }
            }

            // --- DecisionTreeReference validation (if populated) ---
            if (item.DecisionTreeReference !== undefined && item.DecisionTreeReference !== null && item.DecisionTreeReference !== "") {
                if (!decisionTreeNames.includes(item.DecisionTreeReference)) {
                    this.addWarning(
                        `${prefix} item[${itemIdx}] (${item.ItemID || "?"}): DecisionTreeReference "${item.DecisionTreeReference}" not found in ACCOUNTING_DECISION_TREES.md`
                    );
                }
            }

            // --- AccountingPrinciple validation (if populated) ---
            if (item.AccountingPrinciple !== undefined && item.AccountingPrinciple !== null && item.AccountingPrinciple !== "") {
                if (String(item.AccountingPrinciple).length < 20) {
                    this.addWarning(
                        `${prefix} item[${itemIdx}] (${item.ItemID || "?"}): AccountingPrinciple too short (${String(item.AccountingPrinciple).length} chars)`
                    );
                }
            }

            // --- CommonTrapReference validation (if populated) ---
            if (item.CommonTrapReference !== undefined && item.CommonTrapReference !== null && item.CommonTrapReference !== "") {
                const matched = trapRefs.find(t =>
                    t.full === item.CommonTrapReference || t.name === item.CommonTrapReference
                );
                if (!matched) {
                    this.addWarning(
                        `${prefix} item[${itemIdx}] (${item.ItemID || "?"}): CommonTrapReference "${item.CommonTrapReference}" not found in COMMON_EXAM_TRAPS.md`
                    );
                }
            }
        });

        c.Exhibits.forEach(ex => {
            if (ex.ExhibitID && !referencedExhibitIDs.has(ex.ExhibitID)) {
                result.orphanExhibits++;
                this.addWarning(
                    `${prefix} exhibit "${ex.ExhibitID}": Exhibit is never referenced by any item`
                );
            }
        });

        this.validateExhibitOrder(c, prefix);
        this.validateItemIDUniqueness(c, prefix);
        this.validateExhibitIDUniqueness(c, prefix);

        return result;
    }

    extractReferences(item) {
        const refs = new Set();
        const searchObj = (obj) => {
            if (!obj || typeof obj !== "object") return;
            if (Array.isArray(obj)) {
                obj.forEach(v => searchObj(v));
                return;
            }
            Object.keys(obj).forEach(key => {
                const val = obj[key];
                if (key === "ItemID" || key === "ReferencedBy" || key === "ExhibitID" || key === "CaseID") return;
                if (typeof val === "string") {
                    const exhibitMatch = val.match(/\b(CBQ\d*-[A-F]\d*-E\d+)\b/g);
                    if (exhibitMatch) exhibitMatch.forEach(m => refs.add(m));
                }
                searchObj(val);
            });
        };
        searchObj(item);
        return refs;
    }

    validateExhibitOrder(c, prefix) {
        if (!c.Exhibits || !Array.isArray(c.Exhibits)) return;
        c.Exhibits.forEach((ex, idx) => {
            if (ex.ExhibitID) {
                const expectedSuffix = idx + 1;
                const match = ex.ExhibitID.match(/E(\d+)$/);
                if (match && parseInt(match[1], 10) !== expectedSuffix) {
                    this.addWarning(
                        `${prefix}: Exhibit[${idx}] has ExhibitID "${ex.ExhibitID}" but index suggests "E${expectedSuffix}"`
                    );
                }
            }
        });
    }

    validateItemIDUniqueness(c, prefix) {
        if (!c.Items || !Array.isArray(c.Items)) return;
        const ids = {};
        c.Items.forEach((item, idx) => {
            if (item.ItemID) {
                if (ids[item.ItemID]) {
                    this.addError(`${prefix}: Duplicate ItemID "${item.ItemID}"`);
                }
                ids[item.ItemID] = true;
                const expectedSuffix = idx + 1;
                const match = item.ItemID.match(/Q(\d+)$/);
                if (match && parseInt(match[1], 10) !== expectedSuffix) {
                    this.addWarning(
                        `${prefix}: Item[${idx}] has ItemID "${item.ItemID}" but index suggests "Q${expectedSuffix}"`
                    );
                }
            }
        });
    }

    validateExhibitIDUniqueness(c, prefix) {
        if (!c.Exhibits || !Array.isArray(c.Exhibits)) return;
        const ids = {};
        c.Exhibits.forEach(ex => {
            if (ex.ExhibitID) {
                if (ids[ex.ExhibitID]) {
                    this.addError(`${prefix}: Duplicate ExhibitID "${ex.ExhibitID}"`);
                }
                ids[ex.ExhibitID] = true;
            }
        });
    }
}

module.exports = ReferenceValidator;
