const c = require("./p2d_batch1_content.json");
const bad = ["manifest", "per the manifest", "designates", "must be rewritten", "must be corrected", "being corrected", "must move", "is being corrected", "placed at", "sits at", "wait, this is contradictory"];
for (let i = 0; i < c.length; i++) {
  const it = c[i];
  const ecHits = bad.filter(b => (it.ec || "").toLowerCase().includes(b));
  const ewHits = {};
  for (const L of ["A", "B", "C", "D"]) {
    const h = bad.filter(b => (it.ew[L] || "").toLowerCase().includes(b));
    if (h.length) ewHits[L] = h;
  }
  if (ecHits.length || Object.keys(ewHits).length) {
    console.log(`\n### ITEM ${i + 1} (${it.qid || "?"}) cc=${it.cc}`);
    if (ecHits.length) console.log(`  EC meta-hits: ${ecHits.join(",")}`);
    for (const [L, h] of Object.entries(ewHits)) console.log(`  EW${L} meta-hits: ${h.join(",")}`);
  }
}
