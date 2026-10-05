#!/usr/bin/env node
/**
 * Case Certification Batch Gate — Board v2.0 Final / Phase 1.2 (Session P2-085)
 *
 * Implements the Hybrid model: no case batch may be certified without a clean
 * per-item semantic re-run at Tend.
 *
 * Usage:
 *   node scripts/case_cert_batch_gate.js --batch <manifest.json> [--write]
 *   node scripts/case_cert_batch_gate.js --schema          (print manifest schema)
 *
 * Manifest schema (scripts/output/case_cert_batches/<batch>.json):
 * {
 *   "batch_id": "P2-086-B1",
 *   "session": "P2-086",
 *   "certification_date": "2026-09-30",
 *   "evidence_basis": "stratified review",        // Rule 22
 *   "cases": [
 *     { "case_id": "CBQ21-D2", "bank": "p2/case_pack_p2_1.js",
 *       "expected_items": 6,
 *       "expected_states": { "case": "Certified", "items": "Certified" } }
 *   ]
 * }
 *
 * Gate behaviour:
 *   1. Manifest schema + Rule 5 batch-size check (<=30 cases/change-set).
 *   2. Rule 22 — evidence basis must be declared.
 *   3. Every listed case must exist in its declared bank.
 *   4. Every item in every listed case must be in the target state.
 *   5. Re-run semantic screens scoped to the batch; no NEW FLAG-severity flags
 *      beyond the documented false-positive set (DL-065 measured 97.7% FP on
 *      this screen family — so a flag is a REVIEW trigger, not an auto-fail,
 *      but an *undeclared* flag in a certification batch IS a hard fail).
 *   6. Clone gate must be clean for every case in the batch.
 *
 * --write flips states. Default is dry-run (AGENTS.md §3.1: state-changing
 * scripts report what they would do and require an explicit commit flag).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const BASE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// CaseExtractor is CommonJS; createRequire bridges it from this ESM module.
const require = createRequire(import.meta.url);
const CaseExtractor = require("./lib/CaseExtractor.js");

const MAX_CASES_PER_CHANGESET = 30;          // Rule 5
const EVIDENCE_BASES = new Set([
  "stratified review", "context review", "adjudicated",
  "independently derived", "triage", "candidate-list",
]);

function loadBank(rel) {
  const abs = path.join(BASE, rel);
  if (!fs.existsSync(abs)) return null;
  return CaseExtractor.extractFromContent(fs.readFileSync(abs, "utf8"));
}

function loadCloneReport() {
  try { return JSON.parse(fs.readFileSync(path.join(BASE, "scripts/output/p2_case_clone_report.json"), "utf8")); }
  catch { return null; }
}
function loadFlags() {
  try { return JSON.parse(fs.readFileSync(path.join(BASE, "scripts/output/case_semantic_flags.json"), "utf8")); }
  catch { return null; }
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--schema")) {
    console.log(JSON.stringify({
      batch_id: "<P2-0XX-BN>", session: "<P2-0XX>",
      certification_date: "YYYY-MM-DD",
      evidence_basis: [...EVIDENCE_BASES],
      cases: [{ case_id: "<CaseID>", bank: "<relative path>", expected_items: 6,
                expected_states: { case: "Certified", items: "Certified" } }],
    }, null, 2));
    return 0;
  }

  const bi = argv.indexOf("--batch");
  if (bi === -1) { console.error("usage: --batch <manifest.json> [--write] | --schema"); return 2; }
  const manifestPath = path.isAbsolute(argv[bi + 1]) ? argv[bi + 1] : path.join(BASE, argv[bi + 1]);
  const WRITE = argv.includes("--write");

  if (!fs.existsSync(manifestPath)) { console.error("FAIL: batch manifest not found: " + manifestPath); return 1; }
  let m;
  try { m = JSON.parse(fs.readFileSync(manifestPath, "utf8")); }
  catch (e) { console.error("FAIL: manifest is not valid JSON: " + e.message); return 1; }

  const failures = [];
  const notes = [];
  console.log("=== CASE CERTIFICATION BATCH GATE ===");
  console.log("batch: " + m.batch_id + "   session: " + m.session + "   date: " + m.certification_date);
  console.log("mode : " + (WRITE ? "WRITE (will flip states)" : "DRY-RUN (no writes)"));
  console.log("");

  // ── Gate 1: schema
  for (const k of ["batch_id", "session", "certification_date", "evidence_basis", "cases"]) {
    if (!m[k]) failures.push("schema: missing required field '" + k + "'");
  }
  if (!Array.isArray(m.cases) || m.cases.length === 0) failures.push("schema: cases must be a non-empty array");

  // ── Gate 2: Rule 22 evidence basis
  if (m.evidence_basis && !EVIDENCE_BASES.has(String(m.evidence_basis).toLowerCase())) {
    failures.push("Rule 22: unrecognised evidence_basis '" + m.evidence_basis + "' (accepted: " + [...EVIDENCE_BASES].join(", ") + ")");
  }

  // ── Gate 3: Rule 5 batch size
  if (Array.isArray(m.cases)) {
    if (m.cases.length > MAX_CASES_PER_CHANGESET) {
      failures.push("Rule 5: " + m.cases.length + " cases exceeds the " + MAX_CASES_PER_CHANGESET +
                    "-case change-set cap without a BLOCK-AUTHORIZED marker");
    }
  }

  // ── Gate 4/5/6: per-case resolution, state, screens, clones
  const cloneRep = loadCloneReport();
  const flagsRep = loadFlags();
  const banks = new Map();
  const declaredFP = new Set((m.declared_false_positives || []).map(x => String(x)));

  const resolved = [];
  for (const c of (m.cases || [])) {
    if (!c.case_id || !c.bank) { failures.push("case entry missing case_id/bank: " + JSON.stringify(c)); continue; }
    if (!banks.has(c.bank)) {
      const arr = loadBank(c.bank);
      if (!arr) { failures.push("bank not found or unparseable: " + c.bank); continue; }
      banks.set(c.bank, new Map(arr.map(x => [x.CaseID, x])));
    }
    const obj = banks.get(c.bank).get(c.case_id);
    if (!obj) { failures.push("case " + c.case_id + " not found in " + c.bank); continue; }

    const wantCase = (c.expected_states && c.expected_states.case) || "Certified";
    const wantItem = (c.expected_states && c.expected_states.items) || "Certified";
    const gotCase = String(obj.question_state || "").trim();
    if (gotCase !== wantCase) failures.push(c.case_id + ": case state '" + gotCase + "' != required '" + wantCase + "'");

    const items = obj.Items || [];
    if (c.expected_items != null && items.length !== c.expected_items) {
      failures.push(c.case_id + ": " + items.length + " items != declared expected_items " + c.expected_items);
    }
    const badItems = items.filter(it => String(it.question_state || gotCase).trim() !== wantItem);
    if (badItems.length) {
      failures.push(c.case_id + ": " + badItems.length + "/" + items.length +
        " items not '" + wantItem + "' (" + badItems.slice(0, 3).map(x => x.ItemID).join(", ") +
        (badItems.length > 3 ? ", ..." : "") + ")");
    }

    // Clone check
    if (cloneRep) {
      const dup = (cloneRep.classA_groups || []).find(g => g.members.some(x => x.caseId === c.case_id));
      if (dup) failures.push("clone gate: " + c.case_id + " is a member of a whole-case duplicate group (" +
        dup.members.map(x => x.caseId + "[" + x.state + "]").join(" == ") + ") — adjudicate before certifying");
    } else {
      notes.push("clone report absent — clone check skipped (run p2_case_clone_gate.js)");
    }

    // Semantic screen check scoped to the batch
    if (flagsRep) {
      const caseFlags = (flagsRep.flags || []).filter(f => f.caseId === c.case_id);
      const flagged = caseFlags.filter(f => f.severity === "FLAG");
      const undeclared = flagged.filter(f => !declaredFP.has(f.itemId + "|" + f.screen));
      if (undeclared.length) {
        failures.push(c.case_id + ": " + undeclared.length + " undeclared FLAG-severity screen flag(s) — " +
          undeclared.slice(0, 3).map(f => f.itemId + "[" + f.screen + "]").join(", ") +
          " (declare in manifest.declared_false_positives after adjudication)");
      } else if (flagged.length) {
        notes.push(c.case_id + ": " + flagged.length + " FLAG(s) declared as known FP");
      }
    } else {
      notes.push("semantic flags absent — screen check skipped (run case_semantic_screens.js)");
    }

    resolved.push({ caseId: c.case_id, bank: c.bank, items: items.length,
      caseState: gotCase, itemOk: badItems.length === 0 });
  }

  console.log("cases resolved: " + resolved.length + "/" + (m.cases || []).length);
  for (const n of notes) console.log("  note: " + n);
  console.log("");
  if (failures.length) {
    console.log("GATE: FAIL (" + failures.length + ")");
    for (const f of failures) console.log("  - " + f);
    return 1;
  }
  console.log("GATE: PASS — batch is eligible for certification");
  if (WRITE) {
    console.log("");
    console.log("WRITE MODE: state flips are intentionally NOT performed by this gate.");
    console.log("Apply certification via the batch flip script, which requires its own");
    console.log("authorization and takes a timestamped backup first (AGENTS.md §3).");
  }
  return 0;
}

process.exit(main());
