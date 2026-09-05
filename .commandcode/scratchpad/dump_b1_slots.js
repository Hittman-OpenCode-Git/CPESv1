const m = require("./p2d_sprint_manifest.json");
const b = m.batches[0];
for (const s of b.slots) {
  console.log(s.qid + " | cc=" + s.cc + " | diff=" + s.difficulty + " | ds=" + s.ds + " | cl=" + s.cl + " | calc=" + s.calc + " | los=" + s.los + " | topic=" + s.topic);
}
