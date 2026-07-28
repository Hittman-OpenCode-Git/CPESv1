const fs = require("fs");
const c = fs.readFileSync("scored_cases2.js", "utf8");

// Find case 2's LO area
const cidIdx = c.indexOf("\"CaseID\": \"CBQ2-A2\"");
const afterC2 = c.substring(cidIdx);
const loIdx = afterC2.indexOf("LearningObjectives");
const start = cidIdx + loIdx;
const content = c.substring(start, start + 300);
console.log("Raw content around LO (no encoding):");
console.log(content);
console.log("---");
console.log("Hex around the doubled bracket:");
const bracketStart = content.indexOf("],");
const hexArea = c.substring(start + bracketStart, start + bracketStart + 30);
for (let i = 0; i < hexArea.length; i++) {
  console.log("  offset " + i + ": '" + hexArea[i] + "' = 0x" + hexArea.charCodeAt(i).toString(16));
}
