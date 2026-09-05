const m = require("./p2d_sprint_manifest.json");
const b = m.batches[1];
console.log("BATCH 2 AUTHORITATIVE SLOTS (P2-D-276..305):");
for (const s of b.slots) {
  console.log(`${s.qid} | topic=${s.topic} | cc=${s.cc} | diff=${s.difficulty}(${s.ds}) | cl=${s.cl} | calc=${s.calc} | los=${s.los}`);
}
