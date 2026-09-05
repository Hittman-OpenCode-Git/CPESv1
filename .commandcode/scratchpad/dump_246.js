const c = require("./p2d_batch1_content.json");
const it = c[0];
console.log("ITEM 1 (P2-D-246) cc=" + it.cc + " calc=" + it.calc);
console.log("di:", JSON.stringify(it.di, null, 1));
console.log("stem:", it.stem.slice(0, 120));
