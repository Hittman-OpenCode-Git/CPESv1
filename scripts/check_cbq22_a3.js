const fs = require("fs");
const path = require("path");
const CaseExtractor = require("./scripts/lib/CaseExtractor");

const root = process.cwd();
const content = fs.readFileSync(path.join(root, "p2/case_pack_p2_2.js"), "utf8");
const cases = CaseExtractor.extractFromContent(content);
const normalized = CaseExtractor.normalizeCaseItems(cases);

// Check CBQ22-A3 in detail
const c = normalized.find(c => c.CaseID === "CBQ22-A3");
if (!c) { console.log("NOT FOUND"); process.exit(1); }

console.log("=== CBQ22-A3 ===");
console.log("Items: " + c.Items.length);
console.log("Exhibits: " + c.Exhibits.length);

// Check ReferencedBy at exhibit level
c.Exhibits.forEach(ex => {
    console.log("\nExhibit " + ex.ExhibitID + ":");
    console.log("  Title: " + (ex.Title || "none"));
    console.log("  ReferencedBy: " + JSON.stringify(ex.ReferencedBy));
    console.log("  Body (first 200): " + JSON.stringify(ex.Body || "").slice(0, 200));
    if (ex.Headers) console.log("  Headers: " + JSON.stringify(ex.Headers));
    if (ex.Rows) console.log("  Rows: " + JSON.stringify(ex.Rows || []).slice(0, 200));
});

// Check items for any reference to exhibits
c.Items.forEach(item => {
    const text = JSON.stringify(item);
    console.log("\nItem " + item.ItemID + ":");
    console.log("  ReferencedBy: " + JSON.stringify(item.ReferencedBy));
    // Check if item references exhibit IDs
    const exhibitIdMatch = text.match(/CBQ22-A3-E\d+/g);
    if (exhibitIdMatch) console.log("  ExhibitID match: " + exhibitIdMatch);
    // Check for any prose
    const proseWords = ["exhibit", "table", "chart", "figure", "below", "above", "shown", "shown below", "as shown", "data", "information", "display", "presented", "illustrated", "depicted", "indicated"];
    const found = proseWords.filter(w => new RegExp("\\b" + w + "\\b", "i").test(text));
    if (found.length > 0) console.log("  Prose words: " + found.join(", "));
    // Print first 300 chars of ExplanationCorrect
    if (item.ExplanationCorrect) console.log("  EC (first 300): " + item.ExplanationCorrect.slice(0, 300));
    if (item.Prompt) console.log("  Prompt (first 200): " + item.Prompt.slice(0, 200));
});

// Also check if ReferencedBy is at case level
console.log("\nCase-level ReferencedBy: " + JSON.stringify(c.ReferencedBy));
