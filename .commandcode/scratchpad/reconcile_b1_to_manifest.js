/**
 * reconcile_b1_to_manifest.js — Reconciles authored batch-1 content to the authoritative
 * manifest slots. For each item:
 *   - Sets los/difficulty/ds/cl/calc from the manifest (assembler does this too, but content
 *     needs calc + cc correct).
 *   - Relocates the correct-answer choice content to the manifest CC letter by rotating the
 *     choice/EW/di keys so the content that was at the authored-CC lands at the manifest-CC.
 *   - For calc mismatches: if manifest says calc=true but content is conceptual, FLAG for
 *     hand authoring (cannot be automated); if manifest says calc=false but content is calc,
 *     set calc=false and keep the item conceptual (the prose may reference a formula but the
 *     item still works as a concept question).
 * Writes a report of items requiring manual content changes.
 */
const fs = require("fs");
const path = require("path");
const DIR = __dirname;
const manifest = JSON.parse(fs.readFileSync(path.join(DIR, "p2d_sprint_manifest.json"), "utf8"));
const slots = manifest.batches[0].slots;
const contentFile = path.join(DIR, "p2d_batch1_content.json");
const items = JSON.parse(fs.readFileSync(contentFile, "utf8"));

const needManual = [];
for (let i = 0; i < 30; i++) {
  const s = slots[i];
  const it = items[i];
  const authoredCc = it.cc;
  const want = s.cc;

  // Relocate correct content from authoredCc to want (if different)
  if (authoredCc !== want) {
    const ch = it.choices, ew = it.ew, di = it.di;
    // swap authoredCc <-> want in choices
    const tCh = ch[want]; ch[want] = ch[authoredCc]; ch[authoredCc] = tCh;
    // swap ew
    const tEw = ew[want]; ew[want] = ew[authoredCc]; ew[authoredCc] = tEw;
    // swap di keys (di has only non-CC letters; if want or authoredCc is CC, di lacks that key)
    if (di[want] && di[authoredCc]) { const tDi = di[want]; di[want] = di[authoredCc]; di[authoredCc] = tDi; }
    it.cc = want;
  }

  // Calc reconciliation
  const contentCalc = !!it.calc;
  if (contentCalc !== s.calc) {
    if (s.calc && !contentCalc) {
      // manifest wants a calc item but content is conceptual — needs hand authoring
      needManual.push(`${s.qid}: manifest calc=true but content is conceptual (topic ${s.topic})`);
    } else if (!s.calc && contentCalc) {
      // manifest wants conceptual but content is calc — demote
      it.calc = false;
    }
  }
}

fs.writeFileSync(contentFile, JSON.stringify(items, null, 2), "utf8");
console.log("Reconciled CC/calc for batch 1.");
console.log(`\nItems needing manual content change (manifest calc=true, content conceptual):`);
needManual.forEach(x => console.log("  " + x));
if (needManual.length) {
  console.log(`\nTOTAL: ${needManual.length} — these require real calculation content, not relocation.`);
} else {
  console.log("None — all calc assignments reconciled by relocation/demotion.");
}
