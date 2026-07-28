const fs = require("fs");
const c = fs.readFileSync("scored_cases2.js", "utf8");
let r = c;
r = r.replace(/^(\/\/.*\n\/\/.*\n\s*\n)\s*,?\n/m, (m, h) => h + "const ENHANCED_CASE_BASE2 = [\n");
r = r.replace(/,\n(\s*\d+:)/, "\n$1");
r = r.replace(/^(\s*)(\d+:)(\s*")([^"]+)"$/m, (m, ws, num, quote, title) => {
  return '  {\n' + ws + '"CaseID": "CBQ2-B2",\n' + ws + '"Title": ' + quote + title + '"';
});

// Run step 4 separately to check
let r4 = r.replace(/\n(\s*)\],\n\s*\],/g, "\n$1],");
const idx = r4.indexOf("LearningObjectives", 300); // skip first case
const sub = r4.substring(idx, idx + 250);
console.log("=== After step 4 ===");
console.log(sub);
console.log("\n--- Checking the `]` pattern ---");
const lines = r4.split("\n");
for (let i = 0; i < lines.length - 1; i++) {
  if (lines[i].trimRight() === "]" && lines[i+1].match(/^\s*"/)) {
    console.log("Found lone `]` at line " + (i+1) + ": " + lines[i]);
    console.log("Next line: " + lines[i+1]);
  }
}
