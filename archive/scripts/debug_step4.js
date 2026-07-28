const fs = require("fs");
const c = fs.readFileSync("scored_cases2.js", "utf8");
let r = c;

// Add array declaration
r = r.replace(/^(\/\/.*\n\/\/.*\n\s*\n)\s*,?\n/m, (m, h) => h + "const ENHANCED_CASE_BASE2 = [\n");
// Remove stray comma
r = r.replace(/,\n(\s*\d+:)/, "\n$1");
// Fix first case  
r = r.replace(/^(\s*)(\d+:)(\s*")([^"]+)"$/m, (m, ws, num, quote, title) => {
  return '  {\n' + ws + '"CaseID": "CBQ2-B2",\n' + ws + '"Title": ' + quote + title + '"';
});

// Now track step 4 matches
const re = /\n(\s*)\],\n\s*\],/g;
let match;
let count = 0;
while ((match = re.exec(r)) !== null) {
  count++;
  const pos = match.index;
  const before = r.substring(Math.max(0, pos - 30), pos);
  const after = r.substring(pos, pos + 40);
  console.log("Match " + count + " at index " + pos);
  console.log("  Before: " + JSON.stringify(before));
  console.log("  Match:  " + JSON.stringify(match[0]));
  console.log("  After:  " + JSON.stringify(after));
}

if (count === 0) {
  console.log("No matches found!");
  // Check what's around LearningObjectives area
  const loIdx = r.indexOf("LearningObjectives", 300);
  if (loIdx > 0) {
    console.log("\nAround LO (offset " + loIdx + "):");
    console.log(r.substring(loIdx, loIdx + 200));
  }
}
