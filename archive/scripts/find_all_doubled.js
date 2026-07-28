const fs = require("fs");
const c = fs.readFileSync("scored_cases2.js", "utf8");

// Apply steps 1-3 like the fix script
let r = c;
r = r.replace(/^(\/\/.*\n\/\/.*\n\s*\n)\s*,?\n/m, (m, h) => h + "const ENHANCED_CASE_BASE2 = [\n");
r = r.replace(/,\n(\s*\d+:)/, "\n$1");
r = r.replace(/^(\s*)(\d+:)(\s*")([^"]+)"$/m, (m, ws, num, quote, title) => {
  return '  {\n' + ws + '"CaseID": "CBQ2-B2",\n' + ws + '"Title": ' + quote + title + '"';
});

// Find ALL doubled ], patterns
const re = /\n(\s*)\],\n(\s*)\],/g;
let match;
const matches = [];
while ((match = re.exec(r)) !== null) {
  matches.push({ index: match.index, indent1: match[1].length, indent2: match[2].length });
}

console.log("Found " + matches.length + " doubled ], patterns:");
matches.forEach((m, i) => {
  console.log("  " + (i+1) + ": index " + m.index + " indent=" + m.indent1 + " indent2=" + m.indent2);
});

// Now check: how many LearningObjectives arrays exist?
const loCount = (r.match(/LearningObjectives/g) || []).length;
console.log("\nTotal LearningObjectives: " + loCount);

// For each match, show the surrounding area
for (const m of matches) {
  console.log("\n--- Match at index " + m.index + " ---");
  const before = r.substring(m.index - 30, m.index);
  const after = r.substring(m.index, m.index + 80);
  console.log("Before: " + JSON.stringify(before));
  console.log("Match+: " + JSON.stringify(after));
}
