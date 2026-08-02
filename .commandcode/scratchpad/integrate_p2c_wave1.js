/**
 * Integrate P2C Wave 1 batch into pack_p2_c.js
 * Reads the validated batch JSON, inserts items into the array, writes the pack file.
 */
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const batchPath = path.join(root, ".commandcode", "scratchpad", "p2c_wave1_complete.json");
const packPath = path.join(root, "p2", "pack_p2_c.js");

const items = JSON.parse(fs.readFileSync(batchPath, "utf-8"));

// Build the pack file content
const lines = [];

lines.push("// ============================================================================");
lines.push("// pack_p2_c.js — CMA Part 2, Pack C: Decision Analysis");
lines.push("// Domain: C — Decision Analysis (25% exam weight)");
lines.push("// LOS Coverage: C.1 through C.7");
lines.push("// Target: 500 MCQs");
lines.push("// Architecture: SINGLE-OBJECT (no dual-block)");
lines.push("// Governance: Rules 2/6/9/10/11 BLOCK-level active");
lines.push("// ============================================================================");
lines.push("");
lines.push("var pack_p2_c_questions = [");
lines.push("  // =========================================================");
lines.push("  // Wave 1: P2-C-001 through P2-C-015 — CVP Analysis, Marginal Analysis, Relevant Costing");
lines.push(`  // Items: ${items.length} | Authored: 2026-08-02 | Session: P2-C-001`);
lines.push("  // Governance: DL-008/026/021/037 clean, Rule 11 compliant");
lines.push("  // Distribution: Apply=10, Understand=3, Remember=2");
lines.push("  // Difficulty: Easy=2, Mod-Easy=3, Moderate=5, Difficult=5");
lines.push("  // Answer positions: A=4, B=3, C=4, D=4");
lines.push("  // =========================================================");

for (let i = 0; i < items.length; i++) {
  const item = items[i];
  const qid = item.QuestionID;
  lines.push(`  // ${qid}: ${item.Topic} | ${item.Difficulty}(${item.DifficultyScore}) | ${item.CognitiveLevel} | ${item.FormulaReference || "Conceptual"}`);

  // Serialize the item with 2-space indent
  const itemJson = JSON.stringify(item, null, 2);
  // Indent the full JSON by 2 spaces (prepend "  " to every line)
  const indented = itemJson.split("\n").map(line => "  " + line).join("\n");
  lines.push(indented);

  if (i < items.length - 1) {
    lines.push(",");
    lines.push("");
  }
}

lines.push("");
lines.push("  // Wave 2: P2-C-016 through P2-C-030 — (transfer pricing, expected value, perfect information)");
lines.push("  // ... remaining waves fill through P2-C-500");
lines.push("];");
lines.push("");
lines.push("// Export for module consumers");
lines.push("if (typeof module !== 'undefined' && module.exports) {");
lines.push("  module.exports = pack_p2_c_questions;");
lines.push("}");
lines.push("");

const output = lines.join("\n");
fs.writeFileSync(packPath, output, "utf-8");

console.log(`Written ${packPath}`);
console.log(`Items: ${items.length}`);
console.log(`QIDs: ${items.map(i => i.QuestionID).join(", ")}`);

// Verify parse
try {
  const content = fs.readFileSync(packPath, "utf-8");
  new Function(content);
  console.log("Function constructor parse: OK");
} catch (e) {
  console.error("PARSE FAILURE:", e.message);
  process.exit(1);
}

// Verify items in array
const mod = { exports: {} };
const wrap = new Function("module", "exports", fs.readFileSync(packPath, "utf-8"));
wrap(mod, mod.exports);
const arr = mod.exports;
console.log(`Array length: ${arr.length}`);
console.log(`QIDs in array: ${arr.map(i => i.QuestionID).join(", ")}`);
