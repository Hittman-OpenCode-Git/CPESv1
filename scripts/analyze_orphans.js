const fs = require("fs");
const path = require("path");
const config = require("./scripts/config");
const CaseExtractor = require("./scripts/lib/CaseExtractor");

const root = process.cwd();
let orphanCount = 0;
let exhibitRefCount = 0;
let referencedByCount = 0;
let proseRefCount = 0;

const p2Packs = config.part2CasePacks || [
    "p2/case_pack_p2_1.js",
    "p2/case_pack_p2_2.js",
    "p2/case_pack_p2_3.js",
    "p2/case_pack_p2_authored.js",
    "p2/case_pack_p2_C4_C8.js"
];

let orphanExhibits = [];
const prosePatterns = [/\bexhibit\b/i, /\bshown below\b/i, /\bas shown\b/i, /\btable\b/i, /\bchart\b/i, /\bfigure\b/i, /\babove\b/i, /\bbelow\b/i, /\bdata shows\b/i, /\bthis case\b/i, /\bthe exhibit\b/i, /\bexhibits?\b/i];

p2Packs.forEach(file => {
    const fullPath = path.join(root, file);
    if (!fs.existsSync(fullPath)) return;
    const content = fs.readFileSync(fullPath, "utf8");
    const cases = CaseExtractor.extractFromContent(content);
    if (!cases) return;
    const normalized = CaseExtractor.normalizeCaseItems(cases);

    normalized.forEach((c, idx) => {
        if (!c.Exhibits || !Array.isArray(c.Exhibits) || c.Exhibits.length === 0) return;
        if (!c.Items || !Array.isArray(c.Items)) return;

        const validExhibitIDs = new Set();
        c.Exhibits.forEach(ex => {
            if (ex.ExhibitID) validExhibitIDs.add(ex.ExhibitID);
        });

        const referencedIDs = new Set();
        c.Items.forEach(item => {
            // Check for ExhibitID-format references in text fields
            const searchObj = (obj) => {
                if (!obj || typeof obj !== "object") return;
                if (Array.isArray(obj)) { obj.forEach(v => searchObj(v)); return; }
                Object.keys(obj).forEach(key => {
                    const val = obj[key];
                    if (["ItemID","ReferencedBy","ExhibitID","CaseID"].includes(key)) return;
                    if (typeof val === "string") {
                        const matches = val.match(/\b(CBQ\d*-[A-F]\d*-E\d+)\b/g);
                        if (matches) matches.forEach(m => { referencedIDs.add(m); exhibitRefCount++; });
                        // Check for ReferencedBy at item level
                        if (key === "ReferencedBy") referencedByCount++;
                        // Check for prose references
                        prosePatterns.forEach(p => {
                            if (p.test(val)) {
                                proseRefCount++;
                            }
                        });
                    }
                    searchObj(val);
                });
            };
            searchObj(item);

            // Check if ReferencedBy field exists at item level
            if (item.ReferencedBy && Array.isArray(item.ReferencedBy)) {
                item.ReferencedBy.forEach(ref => {
                    if (typeof ref === "string" && validExhibitIDs.has(ref)) {
                        referencedIDs.add(ref);
                    }
                });
            }
        });

        // Check orphan exhibits
        c.Exhibits.forEach(ex => {
            if (ex.ExhibitID && !referencedIDs.has(ex.ExhibitID)) {
                orphanCount++;
                let hasProseRef = false;
                // Check if any item text mentions prose reference patterns
                c.Items.forEach(item => {
                    const text = JSON.stringify(item);
                    prosePatterns.forEach(p => {
                        if (p.test(text)) {
                            hasProseRef = true;
                        }
                    });
                    // Check ReferencedBy at exhibit level
                    if (ex.ReferencedBy && Array.isArray(ex.ReferencedBy)) {
                        ex.ReferencedBy.forEach(ref => {
                            if (ref === item.ItemID) hasProseRef = true;
                        });
                    }
                });
                orphanExhibits.push({
                    case: c.CaseID || "?",
                    exhibit: ex.ExhibitID,
                    hasProseRef: hasProseRef,
                    hasReferencedBy: ex.ReferencedBy !== undefined,
                    exhibitKeys: Object.keys(ex).join(",")
                });
            }
        });
    });
});

console.log("Total orphan exhibits: " + orphanCount);
console.log("Direct ExhibitID refs found: " + exhibitRefCount);
console.log("Prose reference matches (in items): " + proseRefCount);
console.log("Items with ReferencedBy field: " + referencedByCount);
console.log("");

// Summary of orphan exhibit properties
const withReferencedBy = orphanExhibits.filter(e => e.hasReferencedBy).length;
const withProse = orphanExhibits.filter(e => e.hasProseRef).length;
const both = orphanExhibits.filter(e => e.hasReferencedBy && e.hasProseRef).length;

console.log("Orphan exhibits with ReferencedBy field: " + withReferencedBy);
console.log("Orphan exhibits with prose ref in items: " + withProse);
console.log("Orphan exhibits with both: " + both);

// Sample 10 orphan exhibits
console.log("\n=== Sample orphan exhibits (first 20) ===");
orphanExhibits.slice(0, 20).forEach(e => {
    console.log("  " + e.case + " / " + e.exhibit + " | ReferencedBy: " + e.hasReferencedBy + " | Prose: " + e.hasProseRef + " | Keys: " + e.exhibitKeys);
});

// Check if ReferencedBy is at exhibit level
const allReferencedBy = orphanExhibits.every(e => e.hasReferencedBy);
console.log("\nAll orphan exhibits have ReferencedBy: " + allReferencedBy);

// Group by case
const byCase = {};
orphanExhibits.forEach(e => {
    if (!byCase[e.case]) byCase[e.case] = [];
    byCase[e.case].push(e);
});
console.log("\n=== Orphan exhibits by case (count) ===");
Object.entries(byCase).sort((a,b) => b[1].length - a[1].length).slice(0, 15).forEach(([c, items]) => {
    console.log("  " + c + ": " + items.length);
});
