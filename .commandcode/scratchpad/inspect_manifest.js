const m = require("./p2d_sprint_manifest.json");
for (const b of m.batches) {
  console.log("BATCH", b.batch);
  for (const s of b.slots) {
    if (s.difficulty === "Moderate" || s.difficulty === "Very Difficult") {
      console.log("  " + s.qid + " " + s.topic + " cl=" + s.cl + " diff=" + s.difficulty + " cc=" + s.cc + " calc=" + s.calc + " los=" + s.los);
    }
  }
}
