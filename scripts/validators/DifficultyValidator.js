const path = require("path");
const fs = require("fs");
const Validator = require("./Validator");
const config = require("../config");
const CaseExtractor = require("../lib/CaseExtractor");
const taxonomy = require("./config/taxonomy");

class DifficultyValidator extends Validator {
    constructor() {
        super("Difficulty Validator");
        this.difficultyNames = taxonomy.difficultyScoreMap;
        this.cognitiveLevels = taxonomy.cognitiveLevels;
        this.cognitiveOrder = taxonomy.cognitiveOrder;
        this.typeCognitiveDefault = taxonomy.typeCognitiveDefault;
        this.calcComplexityLevels = taxonomy.calculationComplexityLevels;
        this.readingComplexityLevels = taxonomy.readingComplexityLevels;
        this.decisionComplexityLevels = taxonomy.decisionComplexityLevels;
        this.difficultyDriverValues = taxonomy.difficultyDrivers;
    }

    validate() {
        this.start();
        const root = config.paths.root;
        const banks = config.caseBanks;
        let totalCases = 0;
        let totalItems = 0;
        let difficultyDistribution = { "Easy": 0, "Moderate": 0, "Difficult": 0, "Very Difficult": 0 };
        let cognitiveDistribution = {};

        banks.forEach(file => {
            const fullPath = path.join(root, file);
            if (!fs.existsSync(fullPath)) return;
            const content = fs.readFileSync(fullPath, "utf8");
            const cases = this.extractCases(content, file);
            if (!cases) return;
            cases.forEach((c, idx) => {
                totalCases++;
                this.validateCaseDifficulty(c, file, idx);
                if (c.Difficulty && difficultyDistribution[c.Difficulty] !== undefined) {
                    difficultyDistribution[c.Difficulty]++;
                }
                if (c.Items && Array.isArray(c.Items)) {
                    c.Items.forEach((item, itemIdx) => {
                        totalItems++;
                        this.validateItemDifficulty(item, c, file, idx, itemIdx);
                        if (item.CognitiveLevel) {
                            cognitiveDistribution[item.CognitiveLevel] =
                                (cognitiveDistribution[item.CognitiveLevel] || 0) + 1;
                        }
                    });
                }
            });
        });

        this.addStatistic("Cases Checked", totalCases);
        this.addStatistic("Items Checked", totalItems);
        Object.keys(difficultyDistribution).sort().forEach(d => {
            this.addStatistic(`Difficulty: ${d}`, difficultyDistribution[d]);
        });
        Object.keys(cognitiveDistribution).sort().forEach(d => {
            this.addStatistic(`Cognitive: ${d}`, cognitiveDistribution[d]);
        });
        this.checkPsychometricBalance(difficultyDistribution, totalCases);
        this.finish();
        return this.report();
    }

    extractCases(content, filename) {
        return CaseExtractor.extractFromContent(content);
    }

    validateCaseDifficulty(c, filename, idx) {
        const caseID = c.CaseID || "?";
        const prefix = `${filename}[${idx}] (${caseID})`;

        if (c.DifficultyScore === undefined) {
            this.addWarning(`${prefix}: Missing DifficultyScore`);
        } else if (!Number.isInteger(c.DifficultyScore) || c.DifficultyScore < 1 || c.DifficultyScore > 5) {
            this.addError(`${prefix}: DifficultyScore ${c.DifficultyScore} must be integer 1-5`);
        } else {
            const expectedName = this.difficultyNames[c.DifficultyScore];
            if (c.Difficulty && expectedName && c.Difficulty !== expectedName) {
                this.addWarning(
                    `${prefix}: DifficultyScore ${c.DifficultyScore} maps to "${expectedName}" but Difficulty is "${c.Difficulty}"`
                );
            }
        }
        if (c.Difficulty !== undefined) {
            if (!taxonomy.difficultyLevels.includes(c.Difficulty)) {
                this.addError(`${prefix}: Invalid Difficulty "${c.Difficulty}"`);
            }
        }
        if (c.EstimatedMinutes && c.Items && Array.isArray(c.Items)) {
            const itemMinutes = c.Items.reduce((sum, item) => {
                return sum + (item.EstimatedMinutes || 5);
            }, 0);
            const expected = Math.round(itemMinutes / 0.7);
            if (Math.abs(c.EstimatedMinutes - expected) > 5) {
                this.addWarning(
                    `${prefix}: EstimatedMinutes ${c.EstimatedMinutes} but items sum to ${itemMinutes} (expected ~${expected} with reading time)`
                );
            }
        }
        if (c.Items && Array.isArray(c.Items) && c.Items.length < 5) {
            this.addWarning(`${prefix}: Only ${c.Items.length} items (minimum 5 required)`);
        }
    }

    validateItemDifficulty(item, c, filename, caseIdx, itemIdx) {
        const caseID = c.CaseID || "?";
        const prefix = `${filename}[${caseIdx}] item[${itemIdx}] (${caseID}/${item.ItemID || "?"})`;

        if (item.DifficultyScore !== undefined) {
            if (!Number.isInteger(item.DifficultyScore) || item.DifficultyScore < 1 || item.DifficultyScore > 5) {
                this.addError(`${prefix}: Item DifficultyScore ${item.DifficultyScore} must be integer 1-5`);
            }
        }
        if (item.Difficulty !== undefined) {
            if (!taxonomy.difficultyLevels.includes(item.Difficulty)) {
                this.addError(`${prefix}: Invalid item Difficulty "${item.Difficulty}"`);
            }
        }
        if (item.CognitiveLevel !== undefined) {
            if (!this.cognitiveLevels.includes(item.CognitiveLevel)) {
                this.addError(`${prefix}: Invalid CognitiveLevel "${item.CognitiveLevel}"`);
            }
        }
        if (item.Type && !item.CognitiveLevel) {
            this.addWarning(`${prefix}: Missing CognitiveLevel for type "${item.Type}"`);
        }
        if (item.CalculationComplexity !== undefined) {
            if (!this.calcComplexityLevels.includes(item.CalculationComplexity)) {
                this.addError(`${prefix}: Invalid CalculationComplexity "${item.CalculationComplexity}"`);
            }
        }
        if (item.ReadingComplexity !== undefined) {
            if (!this.readingComplexityLevels.includes(item.ReadingComplexity)) {
                this.addError(`${prefix}: Invalid ReadingComplexity "${item.ReadingComplexity}"`);
            }
        }
        if (item.DecisionComplexity !== undefined) {
            if (!this.decisionComplexityLevels.includes(item.DecisionComplexity)) {
                this.addError(`${prefix}: Invalid DecisionComplexity "${item.DecisionComplexity}"`);
            }
        }
        if (item.DifficultyDrivers !== undefined) {
            if (!Array.isArray(item.DifficultyDrivers)) {
                this.addError(`${prefix}: DifficultyDrivers must be an array`);
            } else {
                item.DifficultyDrivers.forEach((d, di) => {
                    if (!this.difficultyDriverValues.includes(d)) {
                        this.addError(`${prefix}: DifficultyDrivers[${di}] invalid value "${d}"`);
                    }
                });
            }
        }
        if (item.CommonTrapReference !== undefined) {
            const trapFile = path.join(config.paths.knowledge, "05_COMMON_EXAM_TRAPS.md");
            let trapContent = "";
            try { trapContent = fs.readFileSync(trapFile, "utf8"); } catch (e) { /* file not found */ }
            if (trapContent) {
                const trapHeadingRegex = /## Trap (\d+)[\s\S]*?(?=\n## |\n# |\Z)/g;
                let trapNames = [];
                let m;
                while ((m = trapHeadingRegex.exec(trapContent)) !== null) {
                    const trapNum = parseInt(m[1], 10);
                    const sectionContent = m[0];
                    const lines = sectionContent.split('\n').filter(l => l.trim() && !l.startsWith('#'));
                    const nameLine = lines.length > 0 ? lines[0].trim() : '';
                    trapNames.push({ num: trapNum, name: nameLine, full: `Trap ${trapNum}: ${nameLine}` });
                }
                const matched = trapNames.find(t => t.full === item.CommonTrapReference || t.name === item.CommonTrapReference);
                if (!matched) {
                    this.addWarning(`${prefix}: CommonTrapReference "${item.CommonTrapReference}" not found in COMMON_EXAM_TRAPS.md`);
                }
            }
        }
    }

    checkPsychometricBalance(difficultyDistribution, totalCases) {
        if (totalCases < 10) return;
        const targets = taxonomy.difficultyTargets;
        Object.keys(targets).forEach(d => {
            const actual = difficultyDistribution[d] || 0;
            const actualPct = actual / totalCases;
            const targetPct = targets[d];
            if (Math.abs(actualPct - targetPct) > 0.10) {
                this.addWarning(
                    `Difficulty "${d}": ${actual}/${totalCases} (${(actualPct * 100).toFixed(1)}%) deviates from target ${(targetPct * 100).toFixed(1)}% by more than 10%`
                );
            }
        });
    }
}

module.exports = DifficultyValidator;
