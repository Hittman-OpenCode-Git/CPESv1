const CaseExtractor = require("./lib/CaseExtractor");
const fs = require("fs");

const content = fs.readFileSync("scored_cases2.js", "utf8");

// Find the array start
const match = content.match(/const\s+ENHANCED_CASE_BASE\d*\s*=\s*(\[)/);
if (!match) {
    console.log("No match found for array pattern");
    process.exit(1);
}

const startIdx = match.index + match[0].length - 1;
console.log("Array starts at index:", startIdx);

// Try extraction
const cases = CaseExtractor.extractFromContent(content);
if (cases) {
    console.log("SUCCESS: Found", cases.length, "cases");
    cases.forEach(c => console.log("  " + c.CaseID + ": BP=" + (c.BlueprintDomain || "MISSING")));
} else {
    console.log("NULL - extraction failed");
    // Try to find where parsing breaks
    try {
        const firstOpening = content.indexOf("{", startIdx);
        const beforeArray = content.substring(0, firstOpening);
        const lastNewline = beforeArray.lastIndexOf("\n");
        const indent = beforeArray.substring(lastNewline + 1);

        console.log("Opening brace at index:", firstOpening);
        console.log("Indent for first case:", JSON.stringify(indent));
        console.log("Content before first case:", content.substring(startIdx, firstOpening + 100));
    } catch (e) {
        console.log("Debug error:", e.message);
    }
}
