const fs = require("fs");

const files = ["scored_cases.js", "scored_cases2.js", "scored_cases3.js", "scored_cases4.js", "scored_cases5.js"];

files.forEach(file => {
    console.log(`\n=== ${file} ===`);
    const c = fs.readFileSync(file, "utf8");
    const lines = c.split("\n");
    console.log(`Lines: ${lines.length}`);

    // Count CaseID occurrences (as JSON field or JS property)
    const caseIDLines = lines.filter(l => l.includes("CaseID") && (l.includes('"CaseID"') || l.includes("CaseID:")));
    console.log(`CaseID occurrences: ${caseIDLines.length}`);

    // Count opening braces that might be case starts
    const openBraces = lines.filter(l => l.trim() === "{").length;
    console.log(`Standalone { count: ${openBraces}`);

    const closeBraces = lines.filter(l => l.trim() === "}," || l.trim() === "}").length;
    console.log(`Standalone } count: ${closeBraces}`);

    // Show first 10 data lines
    console.log("First 10 data lines:");
    for (let i = 0; i < Math.min(12, lines.length); i++) {
        console.log(`  ${i+1}: ${lines[i].substring(0, 100)}`);
    }
});
