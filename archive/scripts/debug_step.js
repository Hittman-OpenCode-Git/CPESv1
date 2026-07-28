const CaseExtractor = require("./lib/CaseExtractor");
const fs = require("fs");

const content = fs.readFileSync("scored_cases2.js", "utf8");

// Find array
const match = content.match(/const\s+ENHANCED_CASE_BASE\d*\s*=\s*(\[)/);
const startIdx = match.index + match[0].length - 1;

// Find array end
let depth = 0, inStr = false, strChar = null, endIdx = -1;
for (let i = startIdx; i < content.length; i++) {
    const ch = content[i], prev = i > 0 ? content[i - 1] : "";
    if (inStr) {
        if (ch === strChar && prev !== "\\") { inStr = false; strChar = null; }
        continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") { inStr = true; strChar = ch; continue; }
    if (ch === "[") depth++;
    if (ch === "]") depth--;
    if (depth === 0) { endIdx = i; break; }
}

let arrayText = content.substring(startIdx, endIdx + 1);
console.log("Step 1 - arrayText length:", arrayText.length);

// stripComments
arrayText = CaseExtractor.stripComments(arrayText);
console.log("Step 2 - after strip length:", arrayText.length);
console.log("Step 2 - first 150 chars:", JSON.stringify(arrayText.substring(0, 150)));

// normalizeToJSON
try {
    arrayText = CaseExtractor.normalizeToJSON(arrayText);
    console.log("Step 3 - after normalize length:", arrayText.length);
    console.log("Step 3 - first 150 chars:", JSON.stringify(arrayText.substring(0, 150)));

    // parse
    const parsed = JSON.parse(arrayText);
    console.log("Step 4 - SUCCESS:", parsed.length, "cases");
    parsed.slice(0, 5).forEach(c => console.log("  " + c.CaseID + ": " + (c.BlueprintDomain || "NO BP")));
} catch (e) {
    console.log("Step 3/4 FAILED:", e.message);
    const posMatch = e.message.match(/position (\d+)/);
    if (posMatch) {
        const pos = parseInt(posMatch[1]);
        console.log("Context around failure:", JSON.stringify(arrayText.substring(Math.max(0, pos - 80), pos + 80)));
    }
}
