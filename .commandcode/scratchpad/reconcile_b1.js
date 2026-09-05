const m = require("./p2d_sprint_manifest.json");
const c = require("./p2d_batch1_content.json");
const slots = m.batches[0].slots;
let ccMis = 0, calcMis = 0, losMis = 0, diffMis = 0, clMis = 0;
for (let i = 0; i < 30; i++) {
  const s = slots[i], it = c[i];
  if (s.cc !== it.cc) { ccMis++; console.log(`CC  ${s.qid}: manifest=${s.cc} content=${it.cc}`); }
  if (s.calc !== !!it.calc) { calcMis++; console.log(`CALC ${s.qid}: manifest=${s.calc} content=${!!it.calc}`); }
  if (s.los !== it.los) { losMis++; console.log(`LOS ${s.qid}: manifest=${s.los} content=${it.los}`); }
}
console.log(`\nSummary: CC mismatches=${ccMis} calc=${calcMis} los=${losMis}`);
