/**
 * splice_p2d_batch.js — Appends staged batch items to p2/pack_p2_d.js, preserving the
 * file's existing structure (header comment, source-evidence fields, tail fields).
 * Usage: node scripts/splice_p2d_batch.js <batch-json> [expected-delta]
 * Read-only on the pack until the final write; prints before/after counts.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PACK = path.join(ROOT, "p2", "pack_p2_d.js");
const batchFile = process.argv[2];
const expectedDelta = parseInt(process.argv[3] || "30", 10);

if (!batchFile) { console.error("usage: node scripts/splice_p2d_batch.js <batch-json> [expected-delta]"); process.exit(2); }

// Read + parse pack
const src = fs.readFileSync(PACK, "utf8");
const varName = "pack_p2_d_questions";
const m = src.match(/var pack_p2_d_questions\s*=\s*(\[[\s\S]*\])\s*;/);
if (!m) { console.error("pack structure not recognized"); process.exit(1); }
const before = new Function("return " + m[1] + ";")();
const beforeCount = before.length;

// Read + parse batch
const batchItems = JSON.parse(fs.readFileSync(batchFile, "utf8"));
if (!Array.isArray(batchItems) || batchItems.length === 0) { console.error("batch is empty or not an array"); process.exit(1); }

// Cross-checks
const afterCount = beforeCount + batchItems.length;
if (afterCount !== beforeCount + expectedDelta) {
  console.error(`expected delta ${expectedDelta}, got ${batchItems.length}`); process.exit(1);
}
const existingQids = new Set(before.map(i => i.QuestionID));
for (const it of batchItems) {
  if (existingQids.has(it.QuestionID)) { console.error(`duplicate QID in batch: ${it.QuestionID}`); process.exit(1); }
  existingQids.add(it.QuestionID);
}
const lastQidNum = parseInt(before[before.length - 1].QuestionID.split("-")[2], 10);
const firstNewNum = parseInt(batchItems[0].QuestionID.split("-")[2], 10);
if (firstNewNum !== lastQidNum + 1) {
  console.error(`contiguity break: last existing ${before[before.length-1].QuestionID}, first new ${batchItems[0].QuestionID}`);
  process.exit(1);
}

// Build the appended block: each item serialized with 2-space indent, matching pack style.
const itemJson = batchItems.map(it => JSON.stringify(it, null, 2)).join(",\n");
// Splice before the closing "  }\n];" — locate the final "];" that closes the array.
const closeIdx = src.lastIndexOf("];");
if (closeIdx < 0) { console.error("closing ] not found"); process.exit(1); }
// The char just before the close should be "\n" (end of last item's "}"). Insert ",\n  <items>\n" there.
let insertAt = closeIdx;
while (insertAt > 0 && /\s/.test(src[insertAt - 1])) insertAt--;
// insertAt now points at the "]" start; the last item ends before the whitespace run.
const prefix = src.slice(0, insertAt);
const suffix = src.slice(closeIdx);
const newSrc = prefix + ",\n" + itemJson + "\n" + suffix;

// Verify parse
const check = new Function(newSrc + "\nreturn " + varName + ".length;")();
if (check !== afterCount) { console.error(`parse check mismatch: ${check} != ${afterCount}`); process.exit(1); }

// Write
fs.writeFileSync(PACK, newSrc, "utf8");
console.log(`SPLICE OK: ${beforeCount} -> ${afterCount} items (delta ${batchItems.length})`);
console.log(`Range: ${before[before.length-1].QuestionID} .. ${batchItems[batchItems.length-1].QuestionID}`);
