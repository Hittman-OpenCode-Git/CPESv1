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
        const banks = [...config.casePackBanks, ...config.part2CasePacks]; // DL-050: P2 cases wired

        let totalCases = 0;
        let orphanExhibits = 0;
        let orphanReferences = 0;
        let totalReferences = 0;

        // Load knowledge document references
        const formulaNames = this.loadFormulaNames(root);
        const decisionTreeNames = this.loadDecisionTreeNames(root);
        const trapRefs = this.loadTrapReferences(root);
        const p2PackSet = new Set(config.part2CasePacks);

        banks.forEach(file => {
            const fullPath = path.join(root, file);
            if (!fs.existsSync(fullPath)) return;
            const content = fs.readFileSync(fullPath, "utf8");
            const cases = this.extractCases(content, file);
            if (!cases) { this.addWarning(`No cases extracted from ${file} — coverage gap (DL-050)`); return; }

            const isP2 = p2PackSet.has(file);
            cases.forEach((c, idx) => {
                totalCases++;
                const result = this.validateReferences(c, file, idx, formulaNames, decisionTreeNames, trapRefs, isP2);
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
        const cases = CaseExtractor.extractFromContent(content);
        if (cases) return CaseExtractor.normalizeCaseItems(cases);
        return cases;
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

    validateReferences(c, filename, idx, formulaNames, decisionTreeNames, trapRefs, isP2) {
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
                    // P2 case packs use descriptive references (ID codes, section refs,
                    // prose formulas) that don't match P1 canonical names — accepted
                    // via p2UseDescriptiveReferences flag (DL-059 FP-C remediation)
                    if (!isP2 || !taxonomy.p2UseDescriptiveReferences) {
                        this.addWarning(
                            `${prefix} item[${itemIdx}] (${item.ItemID || "?"}): FormulaReference "${item.FormulaReference}" not found in FORMULA_MASTER.md`
                        );
                    }
                }
            }

            // --- DecisionTreeReference validation (if populated) ---
            if (item.DecisionTreeReference !== undefined && item.DecisionTreeReference !== null && item.DecisionTreeReference !== "") {
                if (!decisionTreeNames.includes(item.DecisionTreeReference)) {
                    // P2 uses descriptive names — accepted via p2UseDescriptiveReferences (DL-059 FP-C)
                    if (!isP2 || !taxonomy.p2UseDescriptiveReferences) {
                        this.addWarning(
                            `${prefix} item[${itemIdx}] (${item.ItemID || "?"}): DecisionTreeReference "${item.DecisionTreeReference}" not found in ACCOUNTING_DECISION_TREES.md`
                        );
                    }
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
                    // P2 uses prose descriptions — accepted via p2UseDescriptiveReferences (DL-059 FP-C)
                    if (!isP2 || !taxonomy.p2UseDescriptiveReferences) {
                        this.addWarning(
                            `${prefix} item[${itemIdx}] (${item.ItemID || "?"}): CommonTrapReference "${item.CommonTrapReference}" not found in COMMON_EXAM_TRAPS.md`
                        );
                    }
                }
            }
        });

        // P2: check prose references and ReferencedBy field for orphan exhibits
        const p2ProsePatterns = (isP2 && taxonomy.p2ExhibitProsePatterns) || [];
        const p2HasProseExhibitRef = p2ProsePatterns.length > 0 && c.Items.some(item => {
            const text = JSON.stringify(item);
            return p2ProsePatterns.some(p => p.test(text));
        });

        c.Exhibits.forEach(ex => {
            const hasExplicitRef = referencedExhibitIDs.has(ex.ExhibitID);
            // P2: exhibits may carry a ReferencedBy field listing item IDs
            const hasFieldRef = ex.ReferencedBy && Array.isArray(ex.ReferencedBy) &&
                ex.ReferencedBy.filter(r => typeof r === "string" && r.length > 0).length > 0;
            // P2: prose references in item text indicate exhibit is referenced
            const hasProseRef = isP2 && p2HasProseExhibitRef;
            // P2: numeric data overlap — exhibit data values appear in item text
            const hasDataRef = isP2 && this.hasExhibitDataOverlap(ex, c.Items);

            if (ex.ExhibitID && !hasExplicitRef && !hasFieldRef && !hasProseRef && !hasDataRef) {
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

    // P2: check if exhibit numeric data (4+ digit values) appears in item text
    // P2 items reference exhibits implicitly by using data from exhibit tables
    // without explicit ExhibitID references or prose keywords (DL-059 FP-D)
    hasExhibitDataOverlap(exhibit, items) {
        if (!exhibit || typeof exhibit !== "object") return false;
        const exhibitText = JSON.stringify(exhibit);
        const numbers = exhibitText.match(/\d{4,}/g);
        if (!numbers || numbers.length === 0) return false;
        const uniqueNumbers = [...new Set(numbers)];
        return items.some(item => {
            const itemText = JSON.stringify(item);
            return uniqueNumbers.some(num => itemText.includes(num));
        });
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
