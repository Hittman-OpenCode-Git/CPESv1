/**
 * relocate_b1_cc.js — For batch 1 content items, relocate choice/EW/di content so the
 * item's declared CC matches the manifest CC letter. It swaps the full content of the
 * declared-CC letter into the manifest-CC letter (and vice versa), keeping the item's
 * correct answer intact but moving it to the mandated position. Then EC is rewritten
 * to name the new letter by the author (this script only relocates, and flags EC/EW
 * texts containing stale letter references for manual fix).
 *
 * Read-only on the pack; rewrites p2d_batch1_content.json with relocated letters.
 */
const fs = require("fs");
const path = require("path");
const DIR = __dirname;
const manifest = JSON.parse(fs.readFileSync(path.join(DIR, "p2d_sprint_manifest.json"), "utf8"));
const slots = manifest.batches[0].slots;
const contentFile = path.join(DIR, "p2d_batch1_content.json");
const items = JSON.parse(fs.readFileSync(contentFile, "utf8"));

let relocations = 0;
const staleNote = [];
for (let i = 0; i < 30; i++) {
  const want = slots[i].cc;
  const it = items[i];
  const have = it.cc;
  if (want === have) continue;

  // Swap choices
  const ch = it.choices;
  const tmpCh = ch[want];
  ch[want] = ch[have];
  ch[have] = tmpCh;

  // Swap EW slots (the declared-CC letter had "" — that must move to `want`)
  const ew = it.ew;
  const tmpEw = ew[want];
  ew[want] = ew[have];
  ew[have] = tmpEw;

  // Swap di entries
  const di = it.di;
  if (di[want] && di[have]) {
    const tmpDi = di[want];
    di[want] = di[have];
    di[have] = tmpDi;
  }

  // Update CC
  it.cc = want;

  // Update uniqueness_note letter references (crude: replace standalone letters)
  if (it.uniqueness) {
    it.uniqueness = it.uniqueness.replace(new RegExp("\\b" + have + "\\b", "g"), "__HAVE__")
      .replace(new RegExp("\\b" + want + "\\b", "g"), have)
      .replace(/__HAVE__/g, want);
  }

  relocations++;
  staleNote.push(`${slots[i].qid}: relocated CC ${have}->${want}; check EC/EW letter references manually`);
}

fs.writeFileSync(contentFile, JSON.stringify(items, null, 2), "utf8");
console.log(`Relocated ${relocations} item(s).`);
staleNote.forEach(s => console.log("  " + s));
console.log("\nNote: EC texts and EW texts still name their original letters — the author must fix them next.");
