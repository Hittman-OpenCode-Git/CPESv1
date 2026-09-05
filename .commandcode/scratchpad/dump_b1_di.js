const c = require("./p2d_batch1_content.json");
for (const idx of [1, 2, 3, 8, 9, 10, 11, 12]) {
  const it = c[idx];
  console.log(`\n### ITEM ${idx + 1} cc=${it.cc}`);
  console.log("  di:", JSON.stringify(it.di, null, 1));
}
