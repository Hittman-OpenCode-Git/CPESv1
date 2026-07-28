const fs = require("fs");
const c = fs.readFileSync("scored_cases2.js", "utf8");
let r = c;

r = r.replace(/^(\/\/.*\n\/\/.*\n\s*\n)\s*,?\n/m, (m, h) => h + "const ENHANCED_CASE_BASE2 = [\n");

const titleRe = /^(\s*)\d+:\s*("[^"]+")/m;
r = r.replace(titleRe, (match, ws, titleVal) => {
  return '  {\n' + ws + '"CaseID": "CBQ2-B2",\n' + ws + '"Title": ' + titleVal;
});

r = r.replace(/\n(\s*)\d+:\s+"/g, '\n$1"Title": "');
r = r.replace(/\n(\s*)\],\n\s*\],/g, "\n$1],");

// Quick test: evaluate just the array declaration
const lines = r.split("\n");
const arrOpen = lines.findIndex(l => l.includes("ENHANCED_CASE_BASE2"));
const arrClose = lines.findLastIndex(l => l.trim().startsWith("];"));

if (arrOpen >= 0 && arrClose >= 0) {
  const arrContent = lines.slice(arrOpen, arrClose + 1).join("\n");
  try {
    eval("var g = " + arrContent);
    console.log("Array type:", typeof g, "Array.isArray:", Array.isArray(g));
    if (Array.isArray(g)) {
      console.log("Length:", g.length);
      console.log("Has CaseID:", g[0] && g[0].CaseID);
    }
  } catch(e) {
    console.log("Array eval error:", e.message.substring(0, 200));
    // Find the issue by bisecting
    const arrLines = arrContent.split("\n");
    for (let split = 5; split < arrLines.length; split += 5) {
      try {
        eval("var g = " + arrLines.slice(0, split).join("\n") + "\n];");
      } catch(e2) {
        console.log("Error near line", split, "-", e2.message.substring(0, 100));
        for (let i = Math.max(0, split - 3); i < Math.min(arrLines.length, split + 3); i++) {
          console.log("  " + JSON.stringify(arrLines[i].substring(0, 160)));
        }
        break;
      }
    }
  }
} else {
  console.log("Array declaration not found? open=" + arrOpen + " close=" + arrClose);
  // Find ENHANCED_CASE_BASE in the text
  const idx = r.indexOf("ENHANCED_CASE_BASE");
  console.log("Context:", r.substring(Math.max(0, idx - 20), idx + 80));
}
