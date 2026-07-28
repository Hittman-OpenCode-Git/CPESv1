/**
 * CMA Part 1 Exam Simulator — Sprint 5.6C.1
 * Repository Integrity Repair: Duplicate CaseID Correction
 *
 * Corrects duplicate CaseIDs in scored_cases2.js, scored_cases3.js, scored_cases4.js.
 * Each file has two cases sharing the same CaseID where one has mismatched SectionTags.
 *
 * Renames the MISLABELED case (the one with wrong SectionTag → CaseID alignment):
 *   scored_cases2.js: CBQ2-B2 "Revenue Recognition and Receivables Valuation" (Section A) → CBQ2-A3
 *   scored_cases3.js: CBQ3-B2 "Lease Accounting and Classification" (Section A) → CBQ3-A1
 *   scored_cases4.js: CBQ4-B2 "Intangible Assets and Goodwill Impairment" (Section A) → CBQ4-A1
 *
 * Updates all dependent references: ItemIDs, ExhibitIDs, CaseID fields,
 * ReferencedBy arrays, and metadata.
 */

const fs = require("fs");
const path = require("path");
const CaseExtractor = require("./lib/CaseExtractor");
const config = require("./config");

// ── Repair Map ───────────────────────────────────────────────────────
// [filename, oldCaseID, newCaseID, identifying title substring]
const REPAIRS = [
    { file: "scored_cases2.js", oldID: "CBQ2-B2", newID: "CBQ2-A3", titleMatch: "Revenue Recognition" },
    { file: "scored_cases3.js", oldID: "CBQ3-B2", newID: "CBQ3-A1", titleMatch: "Lease Accounting" },
    { file: "scored_cases4.js", oldID: "CBQ4-B2", newID: "CBQ4-A1", titleMatch: "Intangible Assets" }
];

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

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

function repairFile(root, repair) {
    const filePath = path.join(root, repair.file);
    console.log(`\n=== ${repair.file} ===`);
    console.log(`  Renaming: ${repair.oldID} → ${repair.newID} (title: "${repair.titleMatch}")`);

    // Read raw content
    let content = fs.readFileSync(filePath, "utf8");

    // Parse
    const cases = CaseExtractor.extractFromContent(content);
    if (!cases || cases.length === 0) {
        console.log("  ERROR: Could not parse cases");
        return false;
    }
    console.log(`  Parsed ${cases.length} cases`);

    // Find the target case by title matching
    const targetIdx = cases.findIndex(c => {
        const title = (c.Title || "");
        return title.includes(repair.titleMatch) && c.CaseID === repair.oldID;
    });

    if (targetIdx === -1) {
        console.log(`  ERROR: Could not find case with title containing "${repair.titleMatch}" and ID "${repair.oldID}"`);
        return false;
    }

    const target = cases[targetIdx];
    const oldID = repair.oldID;
    const newID = repair.newID;

    console.log(`  Found at index ${targetIdx}: "${target.Title}"`);
    console.log(`  SectionTags: ${JSON.stringify(target.SectionTags)}`);
    console.log(`  Items: ${(target.Items || []).length}, Exhibits: ${(target.Exhibits || []).length}`);

    // Track changes
    const changes = {
        CaseID: `${oldID} → ${newID}`,
        ItemIDs: [],
        ExhibitIDs: [],
        CaseIDRefs: 0
    };

    // Update CaseID
    target.CaseID = newID;

    // Update Items
    (target.Items || []).forEach((item, idx) => {
        const oldItemID = item.ItemID;
        if (oldItemID && oldItemID.startsWith(oldID + "-Q")) {
            const seq = oldItemID.substring(oldID.length + 2); // after "CBQ2-B2-"
            const newItemID = newID + "-Q" + seq;
            item.ItemID = newItemID;
            changes.ItemIDs.push(`${oldItemID} → ${newItemID}`);
        }
        // Update CaseID in item (should match)
        if (item.CaseID === oldID) {
            item.CaseID = newID;
            changes.CaseIDRefs++;
        }
    });

    // Update Exhibits
    (target.Exhibits || []).forEach((ex, idx) => {
        const oldExID = ex.ExhibitID;
        if (oldExID && oldExID.startsWith(oldID + "-E")) {
            const seq = oldExID.substring(oldID.length + 2);
            const newExID = newID + "-E" + seq;
            ex.ExhibitID = newExID;
            changes.ExhibitIDs.push(`${oldExID} → ${newExID}`);
        }
        // Update CaseID in exhibit
        if (ex.CaseID === oldID) {
            ex.CaseID = newID;
            changes.CaseIDRefs++;
        }
        // Update ReferencedBy array
        if (ex.ReferencedBy && Array.isArray(ex.ReferencedBy)) {
            ex.ReferencedBy = ex.ReferencedBy.map(ref => {
                if (typeof ref === "string" && ref.startsWith(oldID)) {
                    changes.CaseIDRefs++;
                    return ref.replace(new RegExp("^" + oldID.replace(/-/g, "\\-")), newID);
                }
                return ref;
            });
        }
    });

    // Also update BlueprintDomain to match SectionTags if needed
    const sectionMap = {
        "A": "External Financial Reporting Decisions",
        "B": "Planning, Budgeting, and Forecasting",
        "C": "Performance Management",
        "D": "Cost Management",
        "E": "Internal Controls",
        "F": "Technology and Analytics"
    };
    const section = (target.SectionTags || [])[0];
    const expectedDomain = sectionMap[section];
    if (expectedDomain && target.BlueprintDomain !== expectedDomain) {
        console.log(`  BLUEPRINTDOMAIN needs correction: "${target.BlueprintDomain}" → "${expectedDomain}"`);
        target.BlueprintDomain = expectedDomain;
        changes.BlueprintDomain = `"${target.BlueprintDomain}" → "${expectedDomain}"`;
    }

    // Output changes
    console.log(`  Changes:`);
    console.log(`    CaseID: ${changes.CaseID}`);
    if (changes.BlueprintDomain) console.log(`    BlueprintDomain: ${changes.BlueprintDomain}`);
    changes.ItemIDs.forEach(id => console.log(`    ItemID: ${id}`));
    changes.ExhibitIDs.forEach(eid => console.log(`    ExhibitID: ${eid}`));
    if (changes.CaseIDRefs > 0) console.log(`    CaseID internal refs updated: ${changes.CaseIDRefs}`);

    // Now rebuild the file content
    // Find array bounds
    const arrStart = content.indexOf("[");
    if (arrStart === -1) { console.log("  ERROR: No array found"); return false; }

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
    if (arrEnd === -1) { console.log("  ERROR: Could not find array end"); return false; }

    const prefix = content.substring(0, arrStart + 1);
    const suffix = content.substring(arrEnd);
    const indent = "  ";

    const caseBlocks = cases.map((c, idx) => {
        const caseIndent = indent + "  ";

        // Order fields
        const HEADER_FIELDS = ["Pack", "Section", "CaseID", "Title", "SectionTags", "BlueprintDomain",
            "BlueprintObjectives", "Topic", "Subtopic", "PrimaryCompetency", "SecondaryCompetencies"];
        const allKeys = Object.keys(c).filter(k => k !== "ScenarioText" && k !== "Exhibits" && k !== "Items");
        const headerKeys = allKeys.filter(k => HEADER_FIELDS.includes(k));
        const otherKeys = allKeys.filter(k => !HEADER_FIELDS.includes(k)).sort();
        const orderedKeys = [...headerKeys, ...otherKeys];

        const lines = [];

        orderedKeys.forEach(k => {
            const v = c[k];
            if (v === undefined) return;
            lines.push(`${caseIndent}${k}: ${serializeValue(v, caseIndent)},`);
        });

        // Scenario text
        lines.push(`${caseIndent}ScenarioText: ${JSON.stringify(c.ScenarioText || "")},`);

        // Exhibits
        const exhIndent = caseIndent + "    ";
        lines.push(`${caseIndent}Exhibits: [`);
        (c.Exhibits || []).forEach((ex, i) => {
            const exStr = serializeValue(ex, exhIndent);
            lines.push(exhIndent + exStr + ",");
        });
        lines.push(`${caseIndent}],`);

        // Items
        lines.push(`${caseIndent}Items: [`);
        (c.Items || []).forEach((item, i) => {
            const itemStr = serializeValue(item, exhIndent);
            lines.push(exhIndent + itemStr + ",");
        });
        lines.push(`${caseIndent}]`);

        return "  {\n" + lines.join("\n") + "\n" + indent + "}";
    });

    const newContent = prefix + "\n" + caseBlocks.join(",\n") + "\n" + suffix;

    // Pre-write verification using in-memory data
    {
        // Check for remaining duplicates in the updated in-memory cases
        const caseIDs = cases.map(c => c.CaseID);
        const idCounts = {};
        caseIDs.forEach(id => { idCounts[id] = (idCounts[id] || 0) + 1; });
        const dupes = Object.entries(idCounts).filter(([id, count]) => count > 1);

        // The old ID should appear exactly once now (the non-renamed case)
        const oldCount = caseIDs.filter(id => id === oldID).length;
        if (oldCount !== 1) {
            console.log(`  ERROR: Old CaseID "${oldID}" appears ${oldCount} times (expected 1 after rename)`);
            return false;
        }

        // Verify the renamed case has the correct new CaseID
        const renamed = cases.find(c => c.CaseID === newID);
        if (!renamed) {
            console.log(`  ERROR: Case with newID "${newID}" not found in memory`);
            return false;
        }
        console.log(`  Verified in-memory: "${renamed.Title}" → CaseID="${newID}"`);

        // Verify old ID no longer matches the renamed case's title
        const oldCaseWithTitle = cases.find(c => c.CaseID === oldID && (c.Title || "").includes(repair.titleMatch));
        if (oldCaseWithTitle) {
            console.log(`  ERROR: Old CaseID "${oldID}" still associated with title "${repair.titleMatch}"`);
            return false;
        }

        // Check ItemIDs consistency
        let itemOK = true;
        renamed.Items.forEach(item => {
            if (item.ItemID && !item.ItemID.startsWith(newID)) {
                console.log(`  ERROR: ItemID "${item.ItemID}" does not start with "${newID}"`);
                itemOK = false;
            }
        });
        if (itemOK) console.log(`  All ItemIDs start with "${newID}" ✓`);

        // Check ExhibitIDs consistency
        let exhOK = true;
        renamed.Exhibits.forEach(ex => {
            if (ex.ExhibitID && !ex.ExhibitID.startsWith(newID)) {
                console.log(`  ERROR: ExhibitID "${ex.ExhibitID}" does not start with "${newID}"`);
                exhOK = false;
            }
        });
        if (exhOK) console.log(`  All ExhibitIDs start with "${newID}" ✓`);

        // Report any remaining duplicates
        if (dupes.length > 0) {
            console.log(`  WARNING: Other duplicates exist: ${dupes.map(([id, c]) => id+'('+c+'x)').join(", ")}`);
            // But this is from the in-memory data which already has our fix
            // If the only remaining CBQ2-B2 is the correct one, we're good
        }
    }

    // Write backup
    const bakPath = filePath + ".bak4";
    if (!fs.existsSync(bakPath)) {
        fs.writeFileSync(bakPath, content, "utf8");
        console.log(`  Created backup: .bak4`);
    }

    // Write
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`  Written: ${repair.file}`);

    // Post-write verification
    try {
        delete require.cache[require.resolve(filePath)];
        const verify = require(filePath);
        const arr = Array.isArray(verify) ? verify :
            (verify.ENHANCED_CASE_BASE || verify.ENHANCED_CASE_BASE2 || verify.SCORED_CASES || []);
        const caseIDs = arr.map(c => c.CaseID);
        const dupes = caseIDs.filter((id, i) => caseIDs.indexOf(id) !== i);
        if (dupes.length > 0) {
            console.log(`  FAIL: ${dupes.length} duplicates remain after write: ${[...new Set(dupes)].join(", ")}`);
            return false;
        }
        console.log(`  Post-write verification: ${arr.length} cases, all CaseIDs unique ✓`);
    } catch (e) {
        console.error(`  POST-WRITE VERIFY FAILED: ${e.message}`);
        // Restore from backup
        if (fs.existsSync(bakPath)) {
            fs.writeFileSync(filePath, fs.readFileSync(bakPath, "utf8"), "utf8");
            console.log("  Restored from backup");
        }
        return false;
    }

    return true;
}

function main() {
    const root = config.paths.root;
    console.log("=== Sprint 5.6C.1 — Duplicate CaseID Repair ===\n");

    let success = 0;
    let failed = 0;

    REPAIRS.forEach(repair => {
        const result = repairFile(root, repair);
        if (result) success++;
        else failed++;
    });

    console.log(`\n=== Summary ===`);
    console.log(`Success: ${success}/${REPAIRS.length}`);
    console.log(`Failed: ${failed}/${REPAIRS.length}`);

    if (failed > 0) {
        console.log("Some repairs failed. Check logs above.");
        process.exit(1);
    }

    console.log("All duplicate CaseIDs resolved.");
}

if (require.main === module) {
    main();
}

module.exports = { repairFile, REPAIRS };
