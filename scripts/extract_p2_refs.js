const fs = require("fs");
const path = require("path");
const taxonomy = require("./scripts/validators/config/taxonomy");

// Reuse ReferenceValidator's loaders
const root = process.cwd();
const formulaNames = loadFormulaNames(root);
const decisionTreeNames = loadDecisionTreeNames(root);
const trapRefs = loadTrapReferences(root);

function loadFormulaNames(root) {
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
            if (!exclude.has(name)) names.push(name);
        }
        return names;
    } catch(e) { return taxonomy.formulaNames; }
}

function loadDecisionTreeNames(root) {
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
            if (!exclude.has(name)) names.push(name);
        }
        return names;
    } catch(e) { return taxonomy.decisionTreeNames; }
}

function loadTrapReferences(root) {
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
            refs.push({ num: trapNum, name: nameLine, full: "Trap " + trapNum + ": " + nameLine });
        }
    } catch(e) { /* ignore */ }
    return refs;
}

// Load taxonomy names as fallback check
const formulaSet = new Set(formulaNames);
const decisionTreeSet = new Set(decisionTreeNames);
const trapSet = new Set(trapRefs.map(t => t.full).concat(trapRefs.map(t => t.name)));

// Collect unique P2 reference values
const uniqueFormula = new Set();
const uniqueTrap = new Set();
const uniqueTree = new Set();
const nonMatchFormula = new Set();
const nonMatchTrap = new Set();
const nonMatchTree = new Set();

const p2Packs = [
    "p2/case_pack_p2_1.js",
    "p2/case_pack_p2_2.js",
    "p2/case_pack_p2_3.js",
    "p2/case_pack_p2_authored.js",
    "p2/case_pack_p2_C4_C8.js"
];

p2Packs.forEach(file => {
    const fullPath = path.join(root, file);
    if (!fs.existsSync(fullPath)) { console.log("NOT FOUND: " + file); return; }
    const content = fs.readFileSync(fullPath, "utf8");
    // Extract field values using regex
    const formulaRegex = /"FormulaReference"\s*:\s*"([^"]+)"/g;
    const trapRegex = /"CommonTrapReference"\s*:\s*"([^"]+)"/g;
    const treeRegex = /"DecisionTreeReference"\s*:\s*"([^"]+)"/g;
    let m;
    while ((m = formulaRegex.exec(content)) !== null) {
        const val = m[1];
        uniqueFormula.add(val);
        if (!formulaSet.has(val)) nonMatchFormula.add(val);
    }
    while ((m = trapRegex.exec(content)) !== null) {
        const val = m[1];
        uniqueTrap.add(val);
        if (!trapSet.has(val)) nonMatchTrap.add(val);
    }
    while ((m = treeRegex.exec(content)) !== null) {
        const val = m[1];
        uniqueTree.add(val);
        if (!decisionTreeSet.has(val)) nonMatchTree.add(val);
    }
});

console.log("=== FormulaReference ===");
console.log("Total unique values: " + uniqueFormula.size);
console.log("Non-matching (FP): " + nonMatchFormula.size);
console.log("Canonical matches: " + (uniqueFormula.size - nonMatchFormula.size));
[...nonMatchFormula].sort().forEach(v => console.log("  " + v));

console.log("\n=== CommonTrapReference ===");
console.log("Total unique values: " + uniqueTrap.size);
console.log("Non-matching (FP): " + nonMatchTrap.size);
[...nonMatchTrap].sort().forEach(v => console.log("  " + v.slice(0, 80)));

console.log("\n=== DecisionTreeReference ===");
console.log("Total unique values: " + uniqueTree.size);
console.log("Non-matching (FP): " + nonMatchTree.size);
[...nonMatchTree].sort().forEach(v => console.log("  " + v));

console.log("\n=== Canonical names available ===");
console.log("Formula names: " + formulaNames.length);
console.log("Decision tree names: " + decisionTreeNames.length);
console.log("Trap refs: " + trapRefs.length);
