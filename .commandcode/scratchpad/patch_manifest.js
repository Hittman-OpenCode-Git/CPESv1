const fs = require("fs");
const m = require("./p2d_sprint_manifest.json");

const byQid = {};
for (const b of m.batches) for (const s of b.slots) byQid[s.qid] = s;

// ── Batch 1 ────────────────────────────────────────────────────
// Targets: diff {E4,ME6,M9,D8,VD3}, cog {R3,U6,A12,An6,Ev3}
// Current (from last run): diff {E4,ME6,M10,D8,VD2}, cog {R4,U6,A11,An6,Ev3}
// Fix A: P2-D-265 Evaluate@Moderate → Evaluate@Very Difficult  (M10→9, VD2→3)
byQid["P2-D-265"].difficulty = "Very Difficult";
byQid["P2-D-265"].ds = 5;
// Fix B: R4→R3 and A11→A12. Remember slots are all Easy (can't become Apply).
// Convert one Easy Remember → Easy Apply is invalid. So convert one Easy Remember → Easy Understand
// (R4→R3, U6→U7) and one Moderate-Easy Understand → Moderate-Easy Apply (U7→U6, A11→A12).
// Find an Easy Remember slot:
const easyRem = m.batches[0].slots.find(s => s.cl === "Remember" && s.difficulty === "Easy");
if (!easyRem) { console.error("no Easy Remember in batch 1"); process.exit(1); }
easyRem.cl = "Understand"; // R4→3, U6→7
// Find a Moderate-Easy Understand slot to convert to Apply:
const meUnd = m.batches[0].slots.find(s => s.cl === "Understand" && s.difficulty === "Moderate-Easy");
if (!meUnd) { console.error("no ME Understand in batch 1"); process.exit(1); }
meUnd.cl = "Apply"; // U7→6, A11→12

// ── Batch 2 ────────────────────────────────────────────────────
// Targets: diff {E4,ME6,M9,D8,VD3}, cog {R3,U6,A12,An6,Ev3}
// Current: diff {E4,ME6,M10,D8,VD2}, cog {R3,U6,A12,An6,Ev3}
// Fix: convert one Moderate Apply @ calc → Difficult Apply (M10→9, D8→9) and one Moderate Analyze
// → Difficult Analyze (M9→8... wait D8→9 then needs D8). Let's convert one Moderate Apply → Difficult Apply
// (M10→9, D8→9) and one Difficult Evaluate? No — need VD2→3: convert a Moderate slot to Very Difficult requires Evaluate.
// Batch 2 has no Evaluate@Moderate. Convert P2-D-303 (Analyze@Moderate) → Evaluate@Very Difficult
// (M9→8, VD2→3) AND convert another Moderate Apply → Difficult Apply (M8→7? no, M must be 9).
// Let me recount: start M10 D8 VD2. Convert M-Apply→D-Apply: M9 D9. Convert M-Analyze→VD-Evaluate: M8 D9 VD3.
// Now M8 (need 9), D9 (need 8). Convert D-Apply→M-Apply? That undoes. Alternative:
// Start M10 D8 VD2. Convert 2 Moderate→Difficult: M8 D10 VD2 (bad, D10).
// Convert 1 Moderate→Difficult (M9 D9) + 1 Moderate→Very Difficult (needs Evaluate) (M8 D9 VD3) — M8 short by 1.
// Then convert 1 Difficult→Moderate (M9 D8) but Difficult→Moderate requires cl that permits Moderate (Apply/Analyze/Understand) — fine. Net: M10→M9, D8→D8, VD2→VD3.
// So: P2-D-286 Apply@Moderate→Apply@Difficult; P2-D-303 Analyze@Moderate→Evaluate@VeryDifficult;
//     then one Difficult Apply→Moderate Apply to restore M9/D8.
byQid["P2-D-286"].difficulty = "Difficult";
byQid["P2-D-286"].ds = 4;
byQid["P2-D-303"].cl = "Evaluate";
byQid["P2-D-303"].difficulty = "Very Difficult";
byQid["P2-D-303"].ds = 5;
// Find a Difficult Apply slot (not P2-D-286) to demote to Moderate:
const dApply = m.batches[1].slots.find(s => s.cl === "Apply" && s.difficulty === "Difficult" && s.qid !== "P2-D-286");
if (!dApply) { console.error("no Difficult Apply in batch 2 (other than 286)"); process.exit(1); }
dApply.difficulty = "Moderate";
dApply.ds = 3;

fs.writeFileSync("./p2d_sprint_manifest.json", JSON.stringify(m, null, 2), "utf8");
console.log("Patched. Verifying...");

const WANT_DIFF = { "Easy": 4, "Moderate-Easy": 6, "Moderate": 9, "Difficult": 8, "Very Difficult": 3 };
const WANT_CL = { "Remember": 3, "Understand": 6, "Apply": 12, "Analyze": 6, "Evaluate": 3 };
const WANT_CC = { "A": 7, "B": 8, "C": 8, "D": 7 };
const DS = { "Easy": 1, "Moderate-Easy": 2, "Moderate": 3, "Difficult": 4, "Very Difficult": 5 };
const CL_DIFF_OK = {
  "Remember": ["Easy", "Moderate-Easy", "Moderate"],
  "Understand": ["Easy", "Moderate-Easy", "Moderate"],
  "Apply": ["Moderate-Easy", "Moderate", "Difficult"],
  "Analyze": ["Moderate", "Difficult"],
  "Evaluate": ["Difficult", "Very Difficult"]
};
let ok = true;
for (const b of m.batches) {
  const d = {}, c = {}, cc = {}, los = {};
  let calcT = 0, coherent = true;
  for (const s of b.slots) {
    d[s.difficulty] = (d[s.difficulty] || 0) + 1;
    c[s.cl] = (c[s.cl] || 0) + 1;
    cc[s.cc] = (cc[s.cc] || 0) + 1;
    los[s.los] = (los[s.los] || 0) + 1;
    if (s.calc) calcT++;
    if (DS[s.difficulty] !== s.ds) { console.log("  DS mismatch " + s.qid); ok = false; }
    if (!CL_DIFF_OK[s.cl].includes(s.difficulty)) { console.log("  incoherent " + s.qid + " " + s.cl + "/" + s.difficulty); ok = false; }
  }
  let streak = 1, maxStreak = 1;
  for (let i = 1; i < b.slots.length; i++) {
    if (b.slots[i].cc === b.slots[i-1].cc) { streak++; if (streak > maxStreak) maxStreak = streak; } else streak = 1;
  }
  const pass =
    JSON.stringify(d) === JSON.stringify(WANT_DIFF) &&
    JSON.stringify(c) === JSON.stringify(WANT_CL) &&
    JSON.stringify(cc) === JSON.stringify(WANT_CC) &&
    Object.keys(los).length === 5 && Object.values(los).every(v => v === 6) &&
    calcT === 9 && maxStreak <= 2 && coherent;
  console.log(`Batch ${b.batch}: pass=${pass} diff=${JSON.stringify(d)} cog=${JSON.stringify(c)} cc=${JSON.stringify(cc)} calc=${calcT} streak=${maxStreak} los=${JSON.stringify(los)}`);
  if (!pass) ok = false;
}
if (!ok) { console.error("STILL FAILING"); process.exit(1); }
console.log("ALL GREEN — manifest is exact-target.");
