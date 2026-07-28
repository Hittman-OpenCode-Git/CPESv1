const fs = require("fs");
const c = fs.readFileSync("scored_cases2.js", "utf8");
let r = c;

// Apply steps 1-3
r = r.replace(/^(\/\/.*\n\/\/.*\n\s*\n)\s*,?\n/m, (m, h) => h + "const ENHANCED_CASE_BASE2 = [\n");
r = r.replace(/,\n(\s*\d+:)/, "\n$1");
r = r.replace(/^(\s*)(\d+:)(\s*")([^"]+)"$/m, (m, ws, num, quote, title) => {
  return '  {\n' + ws + '"CaseID": "CBQ2-B2",\n' + ws + '"Title": ' + quote + title + '"';
});

// Find case 2 (CBQ2-A2) area  
const cidIdx = r.indexOf('"CaseID": "CBQ2-A2"');
console.log("Case2 at offset " + cidIdx);

// Find the LearningObjectives after case 2
const afterC2 = r.substring(cidIdx);
const loIdx = afterC2.indexOf("LearningObjectives");
console.log("LO at offset " + (cidIdx + loIdx));
console.log("LO area (200 chars):");
console.log(JSON.stringify(afterC2.substring(loIdx, loIdx + 200)));
console.log("");

// Check if doubled ], pattern exists  
const doubled = afterC2.match(/\n\s*\],\n\s*\],/);
if (doubled) {
  console.log("Found doubled ], at offset " + (cidIdx + loIdx + doubled.index));
  console.log("Match: " + JSON.stringify(doubled[0]));
} else {
  console.log("No doubled ], pattern found!");
  // Show the area after LO
  const afterLO = afterC2.substring(loIdx + 100, loIdx + 250);
  console.log("Content after LO: " + JSON.stringify(afterLO));
}
