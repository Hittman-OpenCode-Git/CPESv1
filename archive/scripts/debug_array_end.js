const fs = require("fs");

const files = ["scored_cases.js", "scored_cases2.js", "scored_cases3.js", "scored_cases4.js", "scored_cases5.js"];

files.forEach(file => {
    console.log(`\n=== ${file} ===`);
    const content = fs.readFileSync(file, "utf8");
    console.log(`Size: ${content.length} bytes`);

    const arrMatch = content.match(/(const\s+\w+\s*=\s*\[)/);
    if (!arrMatch) { console.log("No array pattern"); return; }

    const arrStart = arrMatch.index + arrMatch[0].length - 1;
    console.log(`Array starts at index ${arrStart}`);

    // Find the end of the array (first ] that brings depth to 0)
    let depth = 0, inStr = false, strChar = null;
    let tooEarly = false;
    let foundAt = -1;

    for (let i = arrStart; i < content.length; i++) {
        const ch = content[i], prev = i > 0 ? content[i - 1] : "";
        if (inStr) {
            if (ch === strChar && prev !== "\\") { inStr = false; strChar = null; }
            continue;
        }
        if (ch === '"' || ch === "'" || ch === "`") { inStr = true; strChar = ch; continue; }
        if (ch === "[") depth++;
        if (ch === "]") depth--;
        if (depth === 0) {
            foundAt = i;
            if (i - arrStart < 2000) {
                tooEarly = true;
            }
            break;
        }
    }

    console.log(`Array end found at index ${foundAt} (depth 0)`);
    console.log(`Array section: ${foundAt - arrStart + 1} bytes`);

    if (tooEarly) {
        console.log("SUSPICIOUSLY SHORT! Looking at content around array end:");
        const around = content.substring(Math.max(0, foundAt - 100), Math.min(content.length, foundAt + 200));
        console.log(around.substring(0, 400));
        console.log("---");

        // What does the "footer" start with?
        const footerStart = content.substring(foundAt + 1, foundAt + 200);
        console.log("Footer starts with:", footerStart.substring(0, 200));
    }
});
