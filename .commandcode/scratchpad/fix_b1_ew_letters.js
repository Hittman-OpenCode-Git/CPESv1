/**
 * fix_b1_ew_letters.js — Rewrites each EW text's leading "Option X is wrong" reference so it
 * matches its own slot letter. The CC relocation moved EW content between letters, leaving
 * stale references ("Option B is wrong" sitting in EW.A). We detect the first standalone
 * letter reference at the start of each EW and correct it to the slot's letter, then verify
 * the rest of the text mentions the right letter (via the uniqueness/choice text).
 */
const fs = require("fs");
const path = require("path");
const DIR = __dirname;
const contentFile = path.join(DIR, "p2d_batch1_content.json");
const items = JSON.parse(fs.readFileSync(contentFile, "utf8"));

let fixed = 0;
for (let i = 0; i < items.length; i++) {
  const it = items[i];
  const cc = it.cc;
  for (const L of ["A", "B", "C", "D"]) {
    if (L === cc) continue;
    const txt = it.ew[L];
    if (!txt) continue;
    // Replace the first "Option X is wrong" with "Option <L> is wrong"
    const m = txt.match(/^(Option\s+)([A-D])(\s+is wrong)/);
    if (m && m[2] !== L) {
      it.ew[L] = txt.replace(/^(Option\s+)([A-D])(\s+is wrong)/, `$1${L}$3`);
      fixed++;
      console.log(`item ${i + 1} EW.${L}: fixed reference ${m[2]} -> ${L}`);
    }
  }
}
fs.writeFileSync(contentFile, JSON.stringify(items, null, 2), "utf8");
console.log(`\nFixed ${fixed} EW letter references.`);
