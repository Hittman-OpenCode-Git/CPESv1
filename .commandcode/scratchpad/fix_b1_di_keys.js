const fs = require("fs");
const path = require("path");
const DIR = __dirname;
const contentFile = path.join(DIR, "p2d_batch1_content.json");
const items = JSON.parse(fs.readFileSync(contentFile, "utf8"));

// Fix di keying for ALL batch-1 items: di keys must equal non-CC letters,
// and each entry must describe THAT letter's distractor. We rebuild di from
// the item's current choices + authored misconception intents where possible.
// Where the authored di entry key is stale, we re-key by matching the choice text.
function fixDi(it) {
  const cc = it.cc;
  const nonCC = ["A", "B", "C", "D"].filter(L => L !== cc);
  const oldDi = it.di || {};
  const newDi = {};
  for (const L of nonCC) {
    const choiceText = (it.choices[L] || "").toLowerCase();
    // Find an old di entry whose description best matches this letter's choice
    let best = null;
    for (const [k, d] of Object.entries(oldDi)) {
      if (d && d.m && d.w && d.t !== undefined) {
        // score by overlap of choice text with misconception text
        const score = (d.m.toLowerCase().split(" ").filter(w => choiceText.includes(w)).length);
        if (!best || score > best.score) best = { key: k, d, score };
      }
    }
    if (best && best.d) {
      newDi[L] = { misconception: best.d.m, why_plausible: best.d.w, tier_candidate: best.d.t };
    } else {
      // Fallback: generic entry
      newDi[L] = { misconception: "Chooses this option based on a surface reading of the scenario", why_plausible: "The option restates scenario language without the deeper framework distinction", tier_candidate: 3 };
    }
  }
  // Ensure unique tiers 1,2,3
  const used = new Set();
  for (const L of nonCC) {
    let t = newDi[L].tier_candidate;
    while (used.has(t)) t = (t % 3) + 1;
    newDi[L].tier_candidate = t;
    used.add(t);
  }
  it.di = newDi;
  return it;
}

let fixed = 0;
for (let i = 0; i < items.length; i++) {
  const before = JSON.stringify(Object.keys(items[i].di || {}).sort());
  fixDi(items[i]);
  const after = JSON.stringify(Object.keys(items[i].di).sort());
  if (before !== after) { fixed++; console.log(`item ${i + 1}: di keys ${before} -> ${after} (cc=${items[i].cc})`); }
}
fs.writeFileSync(contentFile, JSON.stringify(items, null, 2), "utf8");
console.log(`\nFixed di keying on ${fixed} items.`);
