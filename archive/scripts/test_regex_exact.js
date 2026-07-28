const fs = require("fs");
const c = fs.readFileSync("scored_cases2.js", "utf8");

// Apply steps 1-3 like the fix
let r = c;
r = r.replace(/^(\/\/.*\n\/\/.*\n\s*\n)\s*,?\n/m, (m, h) => h + "const ENHANCED_CASE_BASE2 = [\n");
r = r.replace(/,\n(\s*\d+:)/, "\n$1");
r = r.replace(/^(\s*)(\d+:)(\s*")([^"]+)"$/m, (m, ws, num, quote, title) => {
  return '  {\n' + ws + '"CaseID": "CBQ2-B2",\n' + ws + '"Title": ' + quote + title + '"';
});

// Find case 2's LO area in the ORIGINAL text
const cidIdx = c.indexOf('"CaseID": "CBQ2-A2"');
const afterC2 = c.substring(cidIdx);
const loIdx = afterC2.indexOf("LearningObjectives");
const loArea = c.substring(cidIdx + loIdx, cidIdx + loIdx + 300);
console.log("=== Case 2 LO area in ORIGINAL text ===");
console.log(JSON.stringify(loArea));
console.log("");

// Now find it in the FIXED text
const cidIdxF = r.indexOf('"CaseID": "CBQ2-A2"');
const afterC2F = r.substring(cidIdxF);
const loIdxF = afterC2F.indexOf("LearningObjectives");
const loAreaF = r.substring(cidIdxF + loIdxF, cidIdxF + loIdxF + 300);
console.log("=== Case 2 LO area in FIXED text ===");
console.log(JSON.stringify(loAreaF));
console.log("");

// Try to find the doubled bracket in the fixed text
const startSearch = cidIdxF + loIdxF + loAreaF.indexOf("],");
const searchArea = r.substring(startSearch, startSearch + 50);
console.log("=== Search area for doubled ], ===");
console.log(JSON.stringify(searchArea));

// Apply regex manually
const re = /\n(\s*)\],\n(\s*)\],/;
const testMatch = searchArea.match(re);
if (testMatch) {
  console.log("Pattern MATCHES!");
  console.log("Full match: " + JSON.stringify(testMatch[0]));
  console.log("Indent1: " + testMatch[1].length + " Indent2: " + testMatch[2].length);
} else {
  console.log("Pattern DOES NOT MATCH");
  // Try simpler variants
  const simpleRe = /\n\s*\],\n\s*\]/;
  const sm = searchArea.match(simpleRe);
  if (sm) {
    console.log("But simpler pattern matches: " + JSON.stringify(sm[0]));
  }
}

// Now try the global search on the fixed text
let r2 = r;
let match;
const allMatches = [];
const globalRe = /\n(\s*)\],\n(\s*)\],/g;
while ((match = globalRe.exec(r2)) !== null) {
  allMatches.push({ index: match.index, len: match[0].length, content: match[0] });
}

console.log("\n=== All global matches ===");
console.log("Count: " + allMatches.length);
allMatches.forEach((m, i) => {
  console.log((i+1) + ": idx=" + m.index + " content=" + JSON.stringify(m.content));
});
