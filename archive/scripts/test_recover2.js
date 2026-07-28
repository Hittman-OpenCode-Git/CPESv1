const fs = require("fs");

const file = "scored_cases2.js";
const c = fs.readFileSync(file, "utf8");
let r = c;

// Step 1: Add array declaration after header
r = r.replace(/^(\/\/.*\n\/\/.*\n\s*\n)\s*,?\n/m, (match, header) => {
  return header + "const ENHANCED_CASE_BASE2 = [\n";
});

// Step 2: Remove stray leading comma
r = r.replace(/,\n(\s*\d+:)/, "\n$1");

// Step 3: First case - add { and CaseID
const firstCID = "CBQ2-B2";
r = r.replace(/^(\s*)(\d+:)(\s*")([^"]+)"/m, (m, ws, num, quote, title) => {
  return '  {\n' + ws + '"CaseID": "' + firstCID + '",\n' + ws + '"Title": ' + quote + title + '"';
});

// Step 4: Remove doubled brackets
r = r.replace(/\n(\s*)\],\n\s*\],/g, "\n$1],");

// Step 5: Fix remaining numeric keys -> "Title":
r = r.replace(/\n(\s*)(\d+):\s*(")/g, '\n$1"Title": $3');

// Save output for inspection
fs.writeFileSync("scored_cases2.fixed.js", r, "utf8");

// Try to parse and find error location
try {
  const mod = { exports: {} };
  const fn = new Function("module", "exports", "require", r);
  fn(mod, mod.exports, require);
  console.log("OK:", mod.exports.length, "cases");
} catch (e) {
  console.log("FAIL:", e.message);

  // Try to find the error location by splitting the code
  const lines = r.split("\n");
  // Use SyntaxError's line info if available
  const lineMatch = e.stack.match(/:(\d+):\d+/);
  if (lineMatch) {
    const errLine = parseInt(lineMatch[1], 10);
    console.log("Error near line", errLine);
    for (let i = Math.max(0, errLine - 3); i < Math.min(lines.length, errLine + 3); i++) {
      console.log("L" + (i + 1) + ": " + lines[i].substring(0, 150));
    }
  }

  // Binary search for error location
  let lo = 0;
  let hi = lines.length;
  while (lo < hi - 5) {
    const mid = Math.floor((lo + hi) / 2);
    const partial = lines.slice(0, mid).join("\n") +
      '\n];\nfunction _dummy() {}\nvar _x = 1;\nmodule.exports = [];';
    try {
      const fn = new Function("module", "exports", "require", partial);
      lo = mid;
    } catch (e2) {
      hi = mid;
    }
  }
  console.log("\nError between lines", lo, "and", hi);
  for (let i = Math.max(0, lo - 2); i < Math.min(lines.length, hi + 2); i++) {
    console.log("L" + (i + 1) + ": " + lines[i].substring(0, 200));
  }
}
