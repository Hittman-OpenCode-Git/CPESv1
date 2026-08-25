"use strict";
// Self-test for v1.1 evidence validation (report-only) — P2-050.
const fs = require("fs");
const path = require("path");
const { resolveSource } = require(path.resolve(__dirname, "..", "..", "scripts/validators/p2_source_catalog.js"));

// Extract the v1.1 block (constants + function) from the validator source.
const src = fs.readFileSync(path.resolve(__dirname, "..", "..", "scripts/validators/p2_schema_validator.js"), "utf8");
const start = src.indexOf('// ── v1.1 Authoring-evidence validation');
const end = src.indexOf("// ── Extraction ──");
const block = src.slice(start, end).replace('const { resolveSource } = require("./p2_source_catalog");', "");
const make = new Function("resolveSource", block + ";\nreturn validateV11Evidence;");
const v11 = make(resolveSource);

const base = {
  QuestionID: "P2-C-999",
  CorrectChoice: "B",
  Part: 2, Section: "C", Part2OnlyFlag: true, question_state: "Unprocessed",
  UniqueConceptKey: "x", Stem: "s", Choices: {A:"a",B:"b",C:"c",D:"d"},
  ExplanationCorrect: "e".repeat(80), ExplanationWrongA: "w".repeat(60),
  ExplanationWrongB: "", ExplanationWrongC: "w".repeat(60), ExplanationWrongD: "w".repeat(60),
  Difficulty: "Moderate", DifficultyScore: 3, CognitiveLevel: "Apply",
  CalculationItem: true, ItemStyle: "single-select", LOSTag: "C.1",
  BlueprintDomain: "Decision Analysis", VerifiedChecks: []
};

function item(over) { const o = JSON.parse(JSON.stringify(base)); Object.assign(o, over); return o; }

const validEvidence = {
  schema_version: "1.1",
  source_ids: ["DA-08: Incremental decision rule", "IMA SMA on relevant costing"],
  source_support_for_key: {
    source_id: "DA-08: Incremental decision rule",
    rule_or_proposition: "Only incremental revenues and costs are relevant.",
    application_to_facts: "Order revenue minus variable cost minus displaced margin.",
    key_conclusion: "Reject; income falls $8,000."
  },
  distractor_intent: {
    A: { misconception: "ignores displaced sales", why_plausible: "commission savings look like a gain", tier_candidate: 2 },
    C: { misconception: "uses full variable cost", why_plausible: "$50 is the stated cost", tier_candidate: 1 },
    D: { misconception: "omits both adjustments", why_plausible: "simple shortcut", tier_candidate: 3 }
  },
  uniqueness_note: "A ignores displacement, C double-counts the commission, D omits both; only B is correct.",
  source_status: "RESOLVED",
  hold_reason: ""
};

const cases = [
  ["legacy clean -> GRANDFATHERED", item({}), "GRANDFATHERED"],
  ["legacy partial -> MIGRATION_REQUIRED", item({ source_ids: ["DA-08"] }), "MIGRATION_REQUIRED"],
  ["unknown schema_version -> MIGRATION_REQUIRED", item({ schema_version: "9.9" }), "MIGRATION_REQUIRED"],
  ["v1.1 valid -> PASS", item(validEvidence), "PASS"],
  ["HOLD_FOR_SOURCE valid -> HOLD_FOR_SOURCE", item({ schema_version: "1.1", source_status: "HOLD_FOR_SOURCE", source_support_for_key: null, hold_reason: "no approved source for the key", distractor_intent: validEvidence.distractor_intent, uniqueness_note: validEvidence.uniqueness_note }), "HOLD_FOR_SOURCE"],
  ["HOLD missing hold_reason -> HOLD with finding", item({ schema_version: "1.1", source_status: "HOLD_FOR_SOURCE", source_support_for_key: null, hold_reason: "", distractor_intent: validEvidence.distractor_intent, uniqueness_note: validEvidence.uniqueness_note }), "HOLD_FOR_SOURCE"],
  ["unresolvable source -> MIGRATION_REQUIRED", item({ ...validEvidence, source_ids: ["Fake Source 123"] }), "MIGRATION_REQUIRED"],
  ["bad source_status enum -> MIGRATION_REQUIRED", item({ ...validEvidence, source_status: "APPROVED" }), "MIGRATION_REQUIRED"],
  ["intent keys wrong -> MIGRATION_REQUIRED", item({ ...validEvidence, distractor_intent: { A: validEvidence.distractor_intent.A, C: validEvidence.distractor_intent.C } }), "MIGRATION_REQUIRED"],
  ["dup tier -> MIGRATION_REQUIRED", item({ ...validEvidence, distractor_intent: { A: { ...validEvidence.distractor_intent.A, tier_candidate: 1 }, C: { ...validEvidence.distractor_intent.C, tier_candidate: 1 }, D: { ...validEvidence.distractor_intent.D, tier_candidate: 2 } } }), "MIGRATION_REQUIRED"],
  ["uniqueness misses D -> MIGRATION_REQUIRED", item({ ...validEvidence, uniqueness_note: "A and C are wrong; B is correct." }), "MIGRATION_REQUIRED"],
];

let pass = 0, fail = 0;
for (const [name, it, want] of cases) {
  const r = v11(it);
  const ok = r.outcome === want;
  if (ok) pass++; else fail++;
  console.log((ok ? "PASS " : "FAIL ") + name + " -> got " + r.outcome + " (want " + want + ")");
  for (const f of r.findings) console.log("       " + f);
}

const srcCases = [
  ["DA-08: Incremental decision rule", true, "formula"],
  ["FA-01", true, "formula"],
  ["ASC 470-10-45", true, "authority"],
  ["COSO ERM 2017 Principle 9", true, "authority"],
  ["IMA SMA on relevant costing", true, "authority"],
  ["SOX Title VIII", true, "authority"],
  ["Fake Source 123", false, "unknown"],
  ["", false, "empty"],
];
for (const [id, wantM, wantK] of srcCases) {
  const r = resolveSource(id);
  const ok = r.matched === wantM && r.kind === wantK;
  if (ok) pass++; else fail++;
  console.log((ok ? "PASS " : "FAIL ") + "resolveSource(" + JSON.stringify(id) + ") -> " + r.matched + "/" + r.kind + " (want " + wantM + "/" + wantK + ")");
}

console.log("\n" + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);
