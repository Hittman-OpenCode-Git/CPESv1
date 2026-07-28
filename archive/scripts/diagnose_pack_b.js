// Quick diagnostic: count backtick lines and section distribution in Pack B
const fs = require("fs");
const c = fs.readFileSync("pack_b_corrected.js", "utf8");
const lines = c.split("\n");

const backtickLines = lines.filter(l => l.includes("`"));
console.log("Lines with backtick:", backtickLines.length);
console.log("Total lines:", lines.length);

// Show first and last backtick line numbers
const btLineIndices = lines.reduce((acc, l, i) => l.includes("`") ? [...acc, i+1] : acc, []);
console.log("First:", btLineIndices[0], "Last:", btLineIndices[btLineIndices.length-1]);

// Verify ALL backticks are the same pattern
const patterns = {};
backtickLines.forEach(l => {
  const m = l.match(/"QuestionID": "[^"]+",`/);
  if (m) {
    patterns["qid_backtick"] = (patterns["qid_backtick"] || 0) + 1;
  } else {
    console.log("UNEXPECTED backtick at:", l.substring(0, 80));
    patterns["other"] = (patterns["other"] || 0) + 1;
  }
});
console.log("Pattern breakdown:", JSON.stringify(patterns));

// Also show the exact format
if (backtickLines.length > 0) {
  console.log("\nSample backtick line:");
  console.log(backtickLines[0].substring(0, 200));
}
