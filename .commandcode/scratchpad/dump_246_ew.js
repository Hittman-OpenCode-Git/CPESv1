const c = require("./p2d_batch1_content.json");
const it = c[0];
console.log("ITEM 1 (P2-D-246) cc=" + it.cc);
for (const L of ["A", "B", "C", "D"]) {
  console.log(`\nEW.${L}: ${(it.ew[L] || "").slice(0, 200)}`);
}
console.log("\nCHOICES:");
console.log(JSON.stringify(it.choices, null, 1));
