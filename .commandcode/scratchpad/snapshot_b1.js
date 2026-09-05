const c = require("./p2d_batch1_content.json");
const m = require("./p2d_sprint_manifest.json");
const slots = m.batches[0].slots;
console.log("ITEM | manifest.cc | content.cc | manifest.calc | stem-has-numbers");
for (let i = 0; i < 30; i++) {
  const it = c[i], s = slots[i];
  const stemNumeric = /\d/.test(it.stem || "");
  console.log(`${s.qid} | ${s.cc} | ${it.cc} | ${s.calc} | ${stemNumeric ? "numbers" : "no-nums"}`);
}
