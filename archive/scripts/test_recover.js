const fs = require("fs");

["scored_cases2.js"].forEach((file) => {
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

  // Verify
  try {
    const mod = { exports: {} };
    const fn = new Function("module", "exports", "require", r);
    fn(mod, mod.exports, require);
    const result = mod.exports;
    console.log("OK:", result.length, "cases");
    console.log("IDs:", result.map((x) => x.CaseID).join(", "));
    console.log("Titles:", result.map((x) => (x.Title || "").substring(0, 40)).join(", "));
  } catch (e) {
    console.log("FAIL:", e.message.substring(0, 400));

    // Find where the error occurs by trimming the file
    const lines = r.split("\n");
    for (let split = 100; split < lines.length; split += 100) {
      try {
        const partial = lines.slice(0, split).join("\n") + "\n];\nfunction dummy() {}\nmodule.exports = [];";
        const fn = new Function("module", "exports", "require", partial);
      } catch (e2) {
        console.log("  Error near line " + split + ": " + e2.message.substring(0, 100));
        // Show surrounding lines
        for (let i = Math.max(0, split - 5); i < Math.min(lines.length, split + 5); i++) {
          console.log("  L" + (i + 1) + ": " + lines[i].substring(0, 120));
        }
        break;
      }
    }
  }
});
