// Independent hand-solve wave — comparison step (CAQS §5.1 step 4-5).
// Compares INDEPENDENTLY DERIVED answers (solved from masked scenario/exhibit
// material, keys redacted) against stored Correct values in the live banks.
// Usage: node scripts/handsolve_wave_compare.js
const fs = require("fs");
const path = require("path");
const CaseExtractor = require("./lib/CaseExtractor.js");

const BANKS = [
  "content/cases/case_pack_1_corrected.js",
  "content/cases/case_pack_2_corrected.js",
  "content/cases/case_pack_3_corrected.js",
];

// Independent answers derived from masked material (scripts/handsolve_wave_masked.json).
// derivations: the work shown at solve time, before any stored key was read.
const INDEPENDENT = {
  "CBQ-C2-Q1":  { answer: "84000",  derivation: "RI = 420,000 - (12% x 2,800,000) = 420,000 - 336,000" },
  "CBQ-C2-Q5":  { answer: "congruence", derivation: "standard term: transfer price promotes goal congruence" },
  "CBQ-C3-Q1":  { answer: "60000",  derivation: "900,000 target - 840,000 actual = 60,000 unfavorable" },
  "CBQ-D2-Q1":  { answer: "20400",  derivation: "18,000 + (4,000 x 60%) = 18,000 + 2,400" },
  "CBQ-D2-Q5":  { answer: "equivalent", derivation: "partially completed work expressed as equivalent units" },
  "CBQ-E1-Q3":  { answer: "3.0",     derivation: "180,000 / 6,000,000 = 3.0%" },
  "CBQ-E1-Q4":  { answer: "absolute", derivation: "reasonable, not absolute, assurance (COSO inherent limitations)" },
  "CBQ-E2-Q4":  { answer: "approval", derivation: "post-implementation review and approval (change management)" },
  "CBQ2-A3-Q1": { answer: "363636",  derivation: "500,000 x (400,000/550,000) = 363,636.36 -> 363,636" },
  "CBQ2-A3-Q5": { answer: "balance sheet", derivation: "aging schedule estimates required ADA ending balance = balance sheet approach" },
  "CBQ3-A1-Q3": { answer: "right-of-use", derivation: "ASC 842 lessee records lease liability and ROU asset" },
  "CBQ3-B2-Q3": { answer: "20",      derivation: "(180,000 + 8 x 15,000) / 15,000 = 300,000/15,000 = $20/DLH" },
  "CBQ4-A1-Q1": { answer: "400000",  derivation: "2,500,000 - 2,100,000" },
  "CBQ4-C1-Q1": { answer: "1600",    derivation: "31,000 - (9,800 x 3) = 31,000 - 29,400 = 1,600 U" },
  "CBQ4-C1-Q3": { answer: "2000",    derivation: "(10,000 - 4,800 x 2) x 5 = 400 x 5 = 2,000 U" },
  "CBQ5-A2-Q1": { answer: "510000",  derivation: "500,000 + (40,000 AFS - 30,000 FX); trading gains already in NI" },
  "CBQ5-A2-Q5": { answer: "owners",   derivation: "all equity changes except investments by/distributions to owners" },
  "CBQ5-B2-Q1": { answer: "40000",   derivation: "1,000,000 x 8% x 6/12" },
  "CBQ5-B2-Q3": { answer: "46138",   derivation: "922,768 x 10% x 6/12 = 46,138.40 -> 46,138" },
  "CBQ5-B2-Q4": { answer: "928906",  derivation: "922,768 + (46,138.40 - 40,000) = 928,906.40 -> 928,906" },
  "CBQ4-B1-Q1": { answer: "4",       derivation: "(42,000 - 30,000)/(8,000 - 5,000) = 12,000/3,000" },
  "CBQ5-E2-Q3": { answer: "1218000", derivation: "(12%-3%) x 18,200,000 - 420,000 = 1,638,000 - 420,000" },
  "CBQ3-C4-Q1": { answer: "-21600",  derivation: "(42 - 40) x 10,800 = 21,600 U -> -21,600" },
  "CBQ3-C4-Q3": { answer: "-5600",   derivation: "(3,400 - 3,200) x 28 = 5,600 U -> -5,600" },
  "CBQ3-A4-Q1": { answer: "228",     derivation: "240 - (5% x 240) = 240 - 12" },
  "CBQ4-B2-Q3": { answer: "130000",  derivation: "20% x 650,000 purchases unpaid in Q1" },
  "CBQ4-B2-Q4": { answer: "31500",   derivation: "100,000 + 200,000 + 700,000 - 620,000 - 140,000 - 100,000 - 20,000 - 15,000 - 73,500 tax" },
};

const norm = (v) => String(v).replace(/,/g, "").replace(/^\$/, "").trim();
const numEq = (a, b) => Math.abs(parseFloat(norm(a)) - parseFloat(norm(b))) < 1.5;
const strEq = (a, b) => norm(a).toLowerCase() === norm(b).toLowerCase();

const stored = {};
for (const bank of BANKS) {
  const r = CaseExtractor.extractFromContentDetailed(
    fs.readFileSync(path.resolve(__dirname, "..", bank), "utf8"), { strict: true });
  if (!r.ok) { console.error(`FATAL: ${bank}: ${r.error}`); process.exit(1); }
  for (const c of r.cases) {
    for (const it of c.Items || []) {
      if (INDEPENDENT[it.ItemID]) stored[it.ItemID] = { key: it.Correct, bank, state: it.question_state };
    }
  }
}

let match = 0, mismatch = 0, missing = 0;
const rows = [];
for (const [id, ind] of Object.entries(INDEPENDENT)) {
  const s = stored[id];
  if (!s) { missing++; rows.push({ id, ind: ind.answer, stored: "(not found)", verdict: "MISSING" }); continue; }
  const isNum = ind.answer !== "" && !isNaN(parseFloat(norm(ind.answer)));
  const ok = isNum ? numEq(ind.answer, s.key) : strEq(ind.answer, s.key);
  if (ok) match++; else mismatch++;
  rows.push({ id, ind: ind.answer, stored: s.key, state: s.state, verdict: ok ? "MATCH" : "MISMATCH" });
}

for (const r of rows) {
  console.log(`${r.verdict.padEnd(9)} ${r.id.padEnd(12)} independent=${String(r.ind).padEnd(14)} stored=${String(r.stored).padEnd(14)} state=${r.state || "?"}`);
}
console.log(`\n# wave result: ${match} match, ${mismatch} mismatch, ${missing} missing of ${Object.keys(INDEPENDENT).length}`);
fs.writeFileSync(path.resolve(__dirname, "output/handsolve_wave_results.json"),
  JSON.stringify({ rows, match, mismatch, missing }, null, 1));
