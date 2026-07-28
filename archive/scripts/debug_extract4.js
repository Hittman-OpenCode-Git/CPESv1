const fs = require("fs");
const CaseExtractor = require("./lib/CaseExtractor");

// Read each case bank file and try to extract cases
const files = ["scored_cases.js", "scored_cases2.js", "scored_cases3.js", "scored_cases4.js", "scored_cases5.js"];

files.forEach(file => {
    console.log(`\n=== ${file} ===`);
    const content = fs.readFileSync(file, "utf8");

    // Try strip + normalize + parse on just the array section
    const match = content.match(/const\s+ENHANCED_CASE_BASE\d*\s*=\s*(\[)/);
    if (!match) {
        console.log("No array pattern found");
        return;
    }

    const startPos = match.index + match[0].length - 1;

    // Find array end
    let depth = 0, inStr = false, strChar = null, endPos = -1;
    for (let i = startPos; i < content.length; i++) {
        const ch = content[i], prev = i > 0 ? content[i - 1] : "";
        if (inStr) {
            if (ch === strChar && prev !== "\\") { inStr = false; strChar = null; }
            continue;
        }
        if (ch === '"' || ch === "'" || ch === "`") { inStr = true; strChar = ch; continue; }
        if (ch === "[") depth++;
        if (ch === "]") depth--;
        if (depth === 0) { endPos = i; break; }
    }

    if (endPos === -1) {
        console.log("Could not find array end");
        return;
    }

    let arrayText = content.substring(startPos, endPos + 1);
    console.log("Array length:", arrayText.length);

    // Strip comments
    arrayText = CaseExtractor.stripComments(arrayText);
    console.log("After strip:", arrayText.length);

    // But the normalizeToJSON might still fail due to bad formatting
    // Let me try a different approach: extract original fields only
    // by finding each case object and parsing it separately

    // Count case-like objects
    let caseCount = 0;
    let scanPos = 0;
    while (scanPos < arrayText.length) {
        const objStart = arrayText.indexOf("{", scanPos);
        if (objStart === -1) break;
        let d = 0, inS = false, sc = null;
        let found = false;
        for (let i = objStart; i < arrayText.length; i++) {
            const ch = arrayText[i], prev = i > 0 ? arrayText[i - 1] : "";
            if (inS) {
                if (ch === sc && prev !== "\\") { inS = false; sc = null; }
                continue;
            }
            if (ch === '"' || ch === "'" || ch === "`") { inS = true; sc = ch; continue; }
            if (ch === "{") d++;
            if (ch === "}") d--;
            if (d === 0) {
                caseCount++;
                scanPos = i + 1;
                found = true;
                break;
            }
        }
        if (!found) break;
    }

    console.log("Case-like objects found:", caseCount);
});
