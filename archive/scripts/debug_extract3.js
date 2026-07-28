const CaseExtractor = require("./lib/CaseExtractor");
const fs = require("fs");

const content = fs.readFileSync("scored_cases2.js", "utf8");

// Manually replicate extractFromContent with logging
try {
    const match = content.match(/const\s+ENHANCED_CASE_BASE\d*\s*=\s*(\[)/);
    const startIdx = match.index + match[0].length - 1;
    console.log("startIdx:", startIdx);

    let depth = 0, inString = false, stringChar = null, endIdx = -1;
    for (let i = startIdx; i < content.length; i++) {
        const ch = content[i], prev = i > 0 ? content[i - 1] : '';
        if (inString) {
            if (ch === stringChar && prev !== '\\') { inString = false; stringChar = null; }
            continue;
        }
        if (ch === '"' || ch === "'" || ch === '`') { inString = true; stringChar = ch; continue; }
        if (ch === '[') depth++;
        if (ch === ']') depth--;
        if (depth === 0) { endIdx = i; break; }
    }
    console.log("endIdx:", endIdx);

    let arrayText = content.substring(startIdx, endIdx + 1);
    console.log("arrayText length:", arrayText.length);

    arrayText = CaseExtractor.stripComments(arrayText);
    console.log("After stripComments, length:", arrayText.length);

    arrayText = CaseExtractor.normalizeToJSON(arrayText);
    console.log("After normalizeToJSON, length:", arrayText.length);

    try {
        const parsed = JSON.parse(arrayText);
        console.log("SUCCESS:", parsed.length, "cases");
    } catch (e) {
        console.log("JSON.parse failed:", e.message);
        const posMatch = e.message.match(/position (\d+)/);
        if (posMatch) {
            const pos = parseInt(posMatch[1]);
            console.log("Context:", arrayText.substring(Math.max(0, pos - 80), pos + 80));
        }
    }
} catch (e) {
    console.log("Error:", e.message);
    console.log(e.stack);
}
