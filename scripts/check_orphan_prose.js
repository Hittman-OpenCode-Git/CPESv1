const fs = require("fs");
const path = require("path");
const CaseExtractor = require("./scripts/lib/CaseExtractor");

const root = process.cwd();
const content = fs.readFileSync(path.join(root, "p2/case_pack_p2_2.js"), "utf8");
const cases = CaseExtractor.extractFromContent(content);
const normalized = CaseExtractor.normalizeCaseItems(cases);

// Check the 3 cases with remaining orphan exhibits
const targetCases = ["CBQ22-A3", "CBQ22-F3", "CBQ22-B3"];

targetCases.forEach(caseID => {
    const c = normalized.find(c => c.CaseID === caseID);
    if (!c) { console.log("NOT FOUND: " + caseID); return; }

    console.log("\n=== " + caseID + " ===");
    c.Exhibits.forEach(ex => {
        console.log("  Exhibit: " + ex.ExhibitID + " | ReferencedBy: " + JSON.stringify(ex.ReferencedBy) + " | Title: " + (ex.Title || ex.Purpose || ""));
    });

    // Check prose patterns in items
    const broadPatterns = [/\bexhibit\b/i, /\bshown below\b/i, /\bas shown\b/i, /\btable\b/i, /\bchart\b/i, /\bfigure\b/i, /\babove\b/i, /\bbelow\b/i, /\bthis table\b/i, /\bthe table\b/i, /\bthe chart\b/i, /\bthis chart\b/i, /\bthis figure\b/i, /\bthe figure\b/i, /\bdepicted\b/i, /\bindicated\b/i, /\billustrated\b/i];

    c.Items.forEach(item => {
        const text = JSON.stringify(item);
        const matches = broadPatterns.filter(p => p.test(text)).map(p => p.toString());
        if (matches.length > 0) {
            // Find which words match
            const matchedWords = [];
            if (/\bexhibit\b/i.test(text)) matchedWords.push("exhibit");
            if (/\babove\b/i.test(text)) matchedWords.push("above");
            if (/\bbelow\b/i.test(text)) matchedWords.push("below");
            if (/\btable\b/i.test(text)) matchedWords.push("table");
            if (/\bchart\b/i.test(text)) matchedWords.push("chart");
            if (/\bfigure\b/i.test(text)) matchedWords.push("figure");
            if (/\bshown below\b/i.test(text)) matchedWords.push("shown below");
            if (/\bas shown\b/i.test(text)) matchedWords.push("as shown");
            if (/\bindicated\b/i.test(text)) matchedWords.push("indicated");
            if (/\billustrated\b/i.test(text)) matchedWords.push("illustrated");
            if (/\bdepicted\b/i.test(text)) matchedWords.push("depicted");
            console.log("  Item " + item.ItemID + " prose match: " + matchedWords.join(", "));
        }
    });
});
