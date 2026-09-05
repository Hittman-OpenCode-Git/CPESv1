const m = require("./p2d_sprint_manifest.json");
for (const b of m.batches) {
  if (b.batch !== 2) continue;
  for (const s of b.slots) {
    if (s.los === "D.2" || s.los === "D.4") console.log(s.qid + " " + s.topic + " -> " + s.los);
  }
}
