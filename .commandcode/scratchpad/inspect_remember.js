const m = require("./p2d_sprint_manifest.json");
for (const b of m.batches) {
  console.log("BATCH", b.batch);
  for (const s of b.slots) {
    if (s.cl === "Remember") console.log("  " + s.qid + " " + s.topic + " diff=" + s.difficulty);
  }
}
