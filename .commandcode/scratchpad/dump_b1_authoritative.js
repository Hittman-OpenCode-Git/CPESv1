const m = require("./p2d_sprint_manifest.json");
const slots = m.batches[0].slots;
console.log("BATCH 1 AUTHORITATIVE SLOTS (for content authoring):");
for (const s of slots) {
  console.log(`${s.qid} | topic=${s.topic} | cc=${s.cc} | diff=${s.difficulty}(${s.ds}) | cl=${s.cl} | calc=${s.calc} | los=${s.los}`);
}
