const c = require("./p2d_batch1_content.json");
for (const idx of [1, 2, 3, 8, 9, 10, 11, 12]) {
  const it = c[idx];
  console.log(`\n### ITEM ${idx + 1} ${it.qid || "?"} cc=${it.cc}`);
  console.log("  di keys:", Object.keys(it.di || {}).join(","));
  for (const [L, d] of Object.entries(it.di || {})) {
    console.log(`  di.${L}: m="${d.m}" t=${d.t}`);
  }
  console.log("  ew keys:", Object.keys(it.ew || {}).join(","));
}
