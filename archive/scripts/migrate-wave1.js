/**
 * CMA Part 1 Exam Simulator — Sprint 5.6B
 * Wave 1 Automated Metadata Migration
 *
 * Only populates fields that are 100% deterministically derivable
 * and explicitly listed in the Sprint 5.6B AUTO-GENERATE spec.
 *
 * NEVER populates:
 *   Difficulty, DifficultyScore, CognitiveLevel, BlueprintObjective,
 *   Topic, Subtopic, FormulaReference, DecisionTreeReference,
 *   CommonTrapReference, LearningObjective, PrimaryCompetency,
 *   BusinessFunction, Industry, Stakeholder
 *
 * NEVER modifies case content, questions, calculations, or explanations.
 */

const fs = require("fs");
const path = require("path");
const CaseExtractor = require("./lib/CaseExtractor");
const config = require("./config");

const sectionToDomain = {
    "A": "External Financial Reporting Decisions",
    "B": "Planning, Budgeting, and Forecasting",
    "C": "Performance Management",
    "D": "Cost Management",
    "E": "Internal Controls",
    "F": "Technology and Analytics"
};

const TODAY = "2026-07-20";
const VALIDATION_VERSION = "2.0";

function getPackNumber(filename) {
    const m = filename.match(/scored_cases(\d*)\.js/);
    const num = m ? (m[1] || "") : "";
    return num === "" ? 1 : parseInt(num, 10);
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Serialize a value to valid JS/JSON using JSON.stringify.
 * Quotes keys that need quoting. Output uses double quotes for strings
 * and double-quoted keys to ensure re-parsability by CaseExtractor.
 */
function serializeValue(val, indent, isKeyValue) {
    if (val === null || val === undefined) return "null";
    if (typeof val === "string") return JSON.stringify(val);
    if (typeof val === "number" || typeof val === "boolean") return String(val);
    if (Array.isArray(val)) {
        if (val.length === 0) return "[]";
        const items = val.map(v => serializeValue(v, indent + "    "));
        if (val.every(v => typeof v !== "object" || v === null)) {
            const oneline = "[" + items.join(", ") + "]";
            if (oneline.length < 100) return oneline;
        }
        return "[\n" + indent + "    " + items.join(",\n" + indent + "    ") + "\n" + indent + "]";
    }
    if (typeof val === "object") {
        const keys = Object.keys(val);
        if (keys.length === 0) return "{}";
        const lines = keys.map(k => {
            const v = serializeValue(val[k], indent + "    ");
            const key = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
            return indent + "    " + key + ": " + v;
        });
        return "{\n" + lines.join(",\n") + "\n" + indent + "}";
    }
    return String(val);
}

function getSection(c) {
    const tags = c.SectionTags || [];
    return tags.length > 0 ? tags[0] : "";
}

function deriveItemEstimatedMinutes(type) {
    const standard = {
        "numeric": 5,
        "select": 4,
        "multi": 5,
        "fill": 3,
        "match": 6
    };
    return standard[type] || 5;
}

/**
 * Build item-level auto-gen metadata fields.
 * Only populates: ItemID, CaseID, Pack, Section, EstimatedMinutes, ProductionStatus
 */
function buildItemAutoFields(item, idx, caseID, section, packNum, caseProdStatus) {
    const fields = {};
    if (!item.ItemID) fields.ItemID = caseID + "-Q" + (idx + 1);
    if (!item.CaseID) fields.CaseID = caseID;
    if (item.Pack === undefined) fields.Pack = packNum;
    if (!item.Section) fields.Section = section;
    if (item.EstimatedMinutes === undefined) fields.EstimatedMinutes = deriveItemEstimatedMinutes(item.Type);
    if (!item.ProductionStatus) fields.ProductionStatus = caseProdStatus || "Draft";
    return fields;
}

/**
 * Build exhibit-level auto-gen metadata fields.
 * Only populates: ExhibitID, CaseID, ReferencedBy, ValidationVersion
 */
function buildExhibitAutoFields(ex, idx, caseID, items) {
    const fields = {};
    if (!ex.ExhibitID) fields.ExhibitID = caseID + "-E" + (idx + 1);
    if (!ex.CaseID) fields.CaseID = caseID;
    if (!ex.ValidationVersion) fields.ValidationVersion = VALIDATION_VERSION;

    // Derive ReferencedBy — scan items for exhibit title references or exhibit numbers
    if (!ex.ReferencedBy) {
        const refs = [];
        const exTitle = (ex.Title || "").toLowerCase();
        const exNum = idx + 1;
        (items || []).forEach((item, itemIdx) => {
            const prompt = (item.Prompt || "").toLowerCase();
            const explanation = (item.Explanation || "").toLowerCase();
            const combined = prompt + " " + explanation;
            // Check for explicit exhibit references
            if (combined.includes("exhibit " + exNum) ||
                combined.includes("exhibit " + (idx + 1)) ||
                (exTitle && combined.includes(exTitle.substring(0, 20)))) {
                refs.push(item.ItemID || (caseID + "-Q" + (itemIdx + 1)));
            }
        });
        if (refs.length > 0) fields.ReferencedBy = refs;
        else fields.ReferencedBy = [];
    }

    return fields;
}

/**
 * Fields we auto-generate at case level (add if missing).
 */
const AUTO_GEN_CASE_FIELDS = [
    "Pack", "Section", "BlueprintDomain", "QuestionCount", "ExhibitCount",
    "ProductionStatus", "Version", "LastValidated", "ValidationVersion", "RevisionHistory"
];

/**
 * Fields to NEVER auto-generate (DO NOT POPULATE).
 */
const DO_NOT_POPULATE = [
    "Difficulty", "DifficultyScore", "CognitiveLevel", "BlueprintObjective",
    "BlueprintObjectives", "Topic", "Subtopic", "FormulaReference",
    "DecisionTreeReference", "CommonTrapReference", "LearningObjective",
    "LearningObjectives", "PrimaryCompetency", "BusinessFunction",
    "Industry", "Stakeholder"
];

/**
 * Fields we want near the top for readability (fixed order).
 */
const HEADER_FIELDS = ["Pack", "Section", "CaseID", "Title", "SectionTags", "EstimatedMinutes"];

/**
 * Compute auto-gen values for a case (does not modify the case).
 */
function computeCaseAutoGen(c, packNum) {
    const section = getSection(c);
    const domain = section ? (sectionToDomain[section] || "Unknown") : null;
    const result = {};

    // Pack
    if (c.Pack === undefined) result.Pack = packNum;
    // Section
    if (!c.Section) result.Section = section;
    // BlueprintDomain
    if (!c.BlueprintDomain && domain) result.BlueprintDomain = domain;
    // QuestionCount / ExhibitCount
    result.QuestionCount = (c.Items || []).length;
    result.ExhibitCount = (c.Exhibits || []).length;
    // ProductionStatus
    if (!c.ProductionStatus) result.ProductionStatus = "Draft";
    // Version
    if (!c.Version) result.Version = "1.0";
    // LastValidated
    if (!c.LastValidated) result.LastValidated = TODAY;
    // ValidationVersion
    if (!c.ValidationVersion) result.ValidationVersion = VALIDATION_VERSION;
    // RevisionHistory
    if (!c.RevisionHistory || !Array.isArray(c.RevisionHistory) || c.RevisionHistory.length === 0) {
        result.RevisionHistory = [{
            Date: TODAY,
            Version: "1.0",
            Author: "System Migration",
            Summary: "Sprint 5.6B — Automated metadata population (Wave 1)"
        }];
    }

    return result;
}

/**
 * Format a case object to JS source.
 * Preserves ALL existing fields. Only adds auto-gen fields if missing.
 * Never adds DO NOT POPULATE fields.
 */
function formatCase(c, indent, packNum) {
    const section = getSection(c);
    const caseProdStatus = c.ProductionStatus || "Draft";

    // Compute auto-gen additions (don't modify original)
    const autoGen = computeCaseAutoGen(c, packNum);

    // Build the complete field set: start with all existing fields + auto-gen
    const merged = {};
    // First, copy all existing fields
    Object.keys(c).forEach(k => { merged[k] = c[k]; });
    // Then apply auto-gen (only fills in missing)
    Object.keys(autoGen).forEach(k => { merged[k] = autoGen[k]; });

    // Remove fields that are in DO NOT POPULATE if they came from autoGen
    // (we keep existing values for these, we just don't ADD them if missing)
    // Actually, we keep existing values - we just don't add defaults
    // Only remove if the value came from autoGen (i.e., was missing)
    Object.keys(autoGen).forEach(k => {
        if (DO_NOT_POPULATE.includes(k) && c[k] === undefined) {
            delete merged[k];
        }
    });

    // Sort fields: headers first, then alpha, but ScenarioText/Exhibits/Items at end
    const allKeys = Object.keys(merged).filter(k => k !== "ScenarioText" && k !== "Exhibits" && k !== "Items");
    const headerKeys = allKeys.filter(k => HEADER_FIELDS.includes(k));
    const otherKeys = allKeys.filter(k => !HEADER_FIELDS.includes(k)).sort();

    const orderedKeys = [...headerKeys, ...otherKeys];

    const lines = [];

    orderedKeys.forEach(k => {
        const v = merged[k];
        if (v === undefined) return;
        // Skip Items/Exhibits - they get custom placement
        lines.push(`${indent}${k}: ${serializeValue(v, indent)},`);
    });

    // Scenario text
    lines.push(`${indent}ScenarioText: ${JSON.stringify(c.ScenarioText || "")},`);

    // === EXHIBITS ===
    const exhIndent = indent + "    ";
    lines.push(`${indent}Exhibits: [`);
    (c.Exhibits || []).forEach((ex, i) => {
        const exCopy = clone(ex);
        const autoFields = buildExhibitAutoFields(exCopy, i, c.CaseID, c.Items);
        Object.keys(autoFields).forEach(k => { exCopy[k] = autoFields[k]; });
        const exStr = serializeValue(exCopy, exhIndent);
        lines.push(exhIndent + exStr + ",");
    });
    lines.push(`${indent}],`);

    // === ITEMS ===
    lines.push(`${indent}Items: [`);
    (c.Items || []).forEach((item, i) => {
        const itemCopy = clone(item);
        const autoFields = buildItemAutoFields(itemCopy, i, c.CaseID, section, packNum, caseProdStatus);
        Object.keys(autoFields).forEach(k => { itemCopy[k] = autoFields[k]; });
        const itemStr = serializeValue(itemCopy, exhIndent);
        lines.push(exhIndent + itemStr + ",");
    });
    lines.push(`${indent}]`);

    return lines;
}

/**
 * Migrate a single case bank file.
 */
function migrateFile(filePath) {
    const filename = path.basename(filePath);
    const packNum = getPackNumber(filename);
    console.log(`\n=== ${filename} (Pack ${packNum}) ===`);

    let content = fs.readFileSync(filePath, "utf8");

    // Find the array bounds
    const arrStart = content.indexOf("[");
    if (arrStart === -1) { console.log("  No array found"); return null; }

    // Use CaseExtractor to parse
    const cases = CaseExtractor.extractFromContent(content);
    if (!cases || cases.length === 0) {
        console.log("  Could not parse cases");
        return null;
    }
    console.log(`  Parsed ${cases.length} cases`);

    // Find where the array ends
    let depth = 0, inStr = false, strChar = null;
    let arrEnd = -1;
    for (let i = arrStart; i < content.length; i++) {
        const ch = content[i], prev = i > 0 ? content[i - 1] : "";
        if (inStr) { if (ch === strChar && prev !== "\\") { inStr = false; strChar = null; } continue; }
        if (ch === "'" || ch === '"' || ch === "`") { inStr = true; strChar = ch; continue; }
        if (ch === "[") depth++;
        if (ch === "]") depth--;
        if (depth === 0) { arrEnd = i; break; }
    }
    if (arrEnd === -1) { console.log("  Could not find array end"); return null; }

    // Build the new file content
    const prefix = content.substring(0, arrStart + 1);
    const suffix = content.substring(arrEnd);
    const indent = "  ";

    // Build new array content
    const caseBlocks = cases.map((c, idx) => {
        const caseIndent = indent + "  ";
        const lines = formatCase(c, caseIndent, packNum);
        return "  {\n" + lines.join("\n") + "\n" + indent + "}";
    });

    const newContent = prefix + "\n" + caseBlocks.join(",\n") + "\n" + suffix;

    // Verify before writing
    try {
        delete require.cache[require.resolve(filePath)];
        const verify = require(filePath);
        const arr = Array.isArray(verify) ? verify : (verify.ENHANCED_CASE_BASE || verify.ENHANCED_CASE_BASE2 || verify.SCORED_CASES || []);
        const hasIDs = arr.every(c => (c.Items || []).every(i => i.ItemID));
        const hasExhIDs = arr.every(c => (c.Exhibits || []).every(e => e.ExhibitID));
        console.log(`  Verified (old): ${arr.length} cases | ItemIDs: ${hasIDs} | ExhibitIDs: ${hasExhIDs}`);
    } catch (e) {
        console.error(`  Verification error: ${e.message}`);
    }

    // Write backup
    const bakPath = filePath + ".bak2";
    if (!fs.existsSync(bakPath)) {
        fs.writeFileSync(bakPath, content, "utf8");
    }

    // Write new content
    fs.writeFileSync(filePath, newContent, "utf8");

    // Verify new file parses
    try {
        delete require.cache[require.resolve(filePath)];
        const verify = require(filePath);
        const arr = Array.isArray(verify) ? verify : (verify.ENHANCED_CASE_BASE || verify.ENHANCED_CASE_BASE2 || verify.SCORED_CASES || []);
        const hasIDs = arr.every(c => (c.Items || []).every(i => i.ItemID));
        const hasExhIDs = arr.every(c => (c.Exhibits || []).every(e => e.ExhibitID));
        const hasProd = arr.every(c => c.ProductionStatus);
        const hasVer = arr.every(c => c.Version);
        console.log(`  Verified (new): ${arr.length} cases | ItemIDs: ${hasIDs} | ExhibitIDs: ${hasExhIDs} | ProdStatus: ${hasProd} | Version: ${hasVer}`);

        // Count populated items
        let itemCount = 0, itemEstimated = 0, itemProd = 0;
        arr.forEach(c => (c.Items || []).forEach(item => {
            itemCount++;
            if (item.EstimatedMinutes) itemEstimated++;
            if (item.ProductionStatus) itemProd++;
        }));
        console.log(`  Items: ${itemCount} total, ${itemEstimated} with EstimatedMinutes, ${itemProd} with ProductionStatus`);
    } catch (e) {
        console.error(`  VERIFICATION FAILED: ${e.message}`);
        // Restore from backup
        if (fs.existsSync(bakPath)) {
            fs.writeFileSync(filePath, fs.readFileSync(bakPath, "utf8"), "utf8");
            console.log("  Restored from backup");
        }
        return null;
    }

    return { cases: cases.length };
}

function migrateAll() {
    const root = config.paths.root;
    const banks = config.caseBanks;

    let totalCases = 0;
    let successCount = 0;

    banks.forEach(file => {
        const fullPath = path.join(root, file);
        if (!fs.existsSync(fullPath)) { console.log(`File not found: ${file}`); return; }
        const result = migrateFile(fullPath);
        if (result) {
            totalCases += result.cases;
            successCount++;
        }
    });

    console.log("\n=== Wave 1 Migration Summary ===");
    console.log(`Files processed: ${successCount}/${banks.length}`);
    console.log(`Total cases migrated: ${totalCases}`);
    console.log("Wave 1 complete.");
}

if (require.main === module) {
    migrateAll();
}

module.exports = { migrateAll, migrateFile };
