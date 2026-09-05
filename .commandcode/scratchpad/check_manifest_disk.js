const m = require("./p2d_sprint_manifest.json");
const b = m.batches[0];
const d = {}, c = {}, cc = {}, los = {};
let calc = 0;
for (const s of b.slots) {
  d[s.difficulty] = (d[s.difficulty] || 0) + 1;
  c[s.cl] = (c[s.cl] || 0) + 1;
  cc[s.cc] = (cc[s.cc] || 0) + 1;
  los[s.los] = (los[s.los] || 0) + 1;
  if (s.calc) calc++;
}
console.log("MANIFEST BATCH 1 ON DISK:");
console.log(" diff:", JSON.stringify(d));
console.log(" cog:", JSON.stringify(c));
console.log(" cc:", JSON.stringify(cc));
console.log(" calc:", calc);
console.log(" los:", JSON.stringify(los));
console.log("slot[0]:", JSON.stringify(b.slots[0]));
console.log("slot[9]:", JSON.stringify(b.slots[9]));
