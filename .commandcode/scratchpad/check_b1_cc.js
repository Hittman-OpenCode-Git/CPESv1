const m = require("./p2d_sprint_manifest.json");
const content = require("./p2d_batch1_content.json");
const slots = m.batches[0].slots;
console.log("BATCH 1 CC MATRIX — manifest vs content:");
for (let i = 0; i < 30; i++) {
  const s = slots[i];
  const c = content[i];
  const match = s.cc === c.cc ? "OK " : "MISMATCH";
  console.log(`${s.qid} manifest=${s.cc} content=${c.cc} ${match}`);
}
