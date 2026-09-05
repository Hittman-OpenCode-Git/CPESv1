/**
 * apply_board_calc_decision.js — Implements the governance board decision:
 *   CalculationItem is set truthfully per content demand. The 9 slot-table "calc=true"
 *   assignments that are actually conceptual items are demoted to calc=false in BOTH the
 *   manifest (so the assembler emits the truthful flag) and the content files.
 * Also updates the manifest's slot mix: calc counts become truthful (0 per batch for
 * the conceptual slots). This matches the certified Pack D precedent (heavily conceptual).
 */
const fs = require("fs");
const path = require("path");
const DIR = __dirname;

// 1. Manifest — demote the 9 conceptual calc slots to false
const manifestFile = path.join(DIR, "p2d_sprint_manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
const conceptualQids = ["P2-D-246", "P2-D-250", "P2-D-253", "P2-D-257", "P2-D-261",
  "P2-D-264", "P2-D-268", "P2-D-271", "P2-D-275"];
let demoted = 0;
for (const b of manifest.batches) {
  for (const s of b.slots) {
    if (conceptualQids.includes(s.qid) && s.calc === true) {
      s.calc = false;
      demoted++;
    }
  }
}
// Verify no remaining calc=true in batch 1 (batch 1's content is all conceptual now)
const b1 = manifest.batches[0].slots;
const b1calc = b1.filter(s => s.calc).length;
console.log(`Manifest: demoted ${demoted} conceptual calc slots; batch 1 calc=true now ${b1calc}`);
fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2), "utf8");

// 2. Content — set calc=false on the same items (content files may not carry calc field;
//    the assembler derives it from manifest, but set it for consistency)
const contentFile = path.join(DIR, "p2d_batch1_content.json");
const content = JSON.parse(fs.readFileSync(contentFile, "utf8"));
for (const q of conceptualQids) {
  const idx = parseInt(q.split("-")[2], 10) - 246;
  if (content[idx]) content[idx].calc = false;
}
fs.writeFileSync(contentFile, JSON.stringify(content, null, 2), "utf8");
console.log("Content: batch 1 calc flags set false on the 9 conceptual items.");
console.log("\nBoard decision implemented: CalculationItem is now truthful (content-driven).");
