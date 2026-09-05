const c = require("./p2d_batch1_content.json");
const it = c[17];
console.log("ITEM 18 cc=" + it.cc);
console.log("di:", JSON.stringify(it.di, null, 1));
console.log("ew keys:", Object.keys(it.ew).join(","));
console.log("choices:", JSON.stringify(it.choices));
