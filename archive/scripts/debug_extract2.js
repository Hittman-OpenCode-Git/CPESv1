const CaseExtractor = require("./lib/CaseExtractor");
const fs = require("fs");

const content = fs.readFileSync("scored_cases2.js", "utf8");

// Find the array
const match = content.match(/const\s+ENHANCED_CASE_BASE\d*\s*=\s*(\[)/);
const startIdx = match.index + match[0].length - 1;

// Track bracket depth
let depth = 0;
let inString = false;
let stringChar = null;
let endIdx = -1;

for (let i = startIdx; i < content.length; i++) {
    const ch = content[i];
    const prev = i > 0 ? content[i - 1] : "";
    if (inString) {
        if (ch === stringChar && prev !== "\\") { inString = false; stringChar = null; }
        continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") { inString = true; stringChar = ch; continue; }
    if (ch === "[") depth++;
    if (ch === "]") depth--;
    if (depth === 0) { endIdx = i; break; }
}

console.log("Array from", startIdx, "to", endIdx, "(length:", endIdx - startIdx + 1, ")");

let arrayText = content.substring(startIdx, endIdx + 1);
console.log("First 100 chars of array:", JSON.stringify(arrayText.substring(0, 100)));

// Try stripComments
try {
    const stripped = CaseExtractor.stripComments(arrayText);
    console.log("Stripped length:", stripped.length);
    console.log("First 100 chars stripped:", JSON.stringify(stripped.substring(0, 100)));
} catch (e) {
    console.log("stripComments error:", e.message);
}

// Try normalize
try {
    const normalized = CaseExtractor.normalizeToJSON(arrayText);
    console.log("Normalized length:", normalized.length);
    console.log("First 100 chars normalized:", JSON.stringify(normalized.substring(0, 100)));

    // Try JSON parse
    try {
        const parsed = JSON.parse(normalized);
        console.log("JSON PARSE SUCCESS:", parsed.length, "items");
        parsed.forEach(c => console.log("  " + c.CaseID));
    } catch (e) {
        console.log("JSON PARSE FAILED:", e.message);
        console.log("Around position", e.message.match(/position (\d+)/)?.[1] || "?");
        const pos = parseInt(e.message.match(/position (\d+)/)?.[1] || "0");
        console.log("Context:", JSON.stringify(normalized.substring(Math.max(0, pos - 50), pos + 50)));
    }
} catch (e) {
    console.log("normalizeToJSON error:", e.message);
}
