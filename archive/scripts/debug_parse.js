const fs = require("fs");
const c = fs.readFileSync("scored_cases2.js", "utf8");
let r = c;

// Apply fixes
r = r.replace(/^(\/\/.*\n\/\/.*\n\s*\n)\s*,?\n/m, (m, h) => h + "const ENHANCED_CASE_BASE2 = [\n");

const titleRe = /^(\s*)\d+:\s*("[^"]+")/m;
r = r.replace(titleRe, (match, ws, titleVal) => {
  return '  {\n' + ws + '"CaseID": "CBQ2-B2",\n' + ws + '"Title": ' + titleVal;
});

r = r.replace(/\n(\s*)\d+:\s+"/g, '\n$1"Title": "');
r = r.replace(/\n(\s*)\],\n\s*\],/g, "\n$1],");

// Save for inspection
fs.writeFileSync("scored_cases2.inspect.js", r, "utf8");

// Try to parse
try {
  const mod = { exports: {} };
  const fn = new Function("module", "exports", "require", r);
  fn(mod, mod.exports, require);
  console.log("typeof exports:", typeof mod.exports);
  console.log("exports:", mod.exports);
  if (Array.isArray(mod.exports)) {
    console.log("Array length:", mod.exports.length);
    console.log("Has CaseID:", mod.exports[0] && mod.exports[0].CaseID);
  } else {
    console.log("Not an array! Type:", typeof mod.exports, "Keys:", Object.keys(mod.exports).slice(0, 10));
  }
} catch (e) {
  console.log("PARSE ERROR:", e.message.substring(0, 300));
  // Find approximate location
  const lines = r.split("\n");
  const lineMatch = e.stack.match(/:(\d+):(\d+)/);
  if (lineMatch) {
    const errLine = parseInt(lineMatch[1], 10);
    console.log("Error at line", errLine);
    for (let i = Math.max(0, errLine - 3); i < Math.min(lines.length, errLine + 3); i++) {
      console.log("  L" + (i + 1) + ": " + JSON.stringify(lines[i].substring(0, 150)));
    }
  }
}
