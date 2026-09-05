// Verify current LOS counts and produce a corrected TOPICS list with 6 per LOS per batch.
const m = require("./p2d_sprint_manifest.json");
for (const b of m.batches) {
  const los = {};
  for (const s of b.slots) los[s.los] = (los[s.los] || 0) + 1;
  console.log("BATCH", b.batch, JSON.stringify(los));
  for (const s of b.slots) console.log("  " + s.qid + " " + s.topic + " -> " + s.los);
}
