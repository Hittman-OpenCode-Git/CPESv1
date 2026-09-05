/**
 * gate_p2b.js — Pack B sprint pre-write validation gate + deterministic splice-append merge.
 * Session: 2026-09-01, P2B sprint (3×30, P2-B-311..400)
 *
 * Usage:
 *   node gate_p2b.js --check <file1.json> <file2.json> <file3.json>   # validate staging only
 *   node gate_p2b.js --merge  <file1.json> <file2.json> <file3.json>  # validate + backup + splice-append
 *
 * Behavior:
 *  - Validates every staged item against ALL governance gates (Rule 2/6/9/10/11/13/14, DL-013,
 *    EC/EW length floors, v1.1 evidence fields, CC balance, difficulty/cognitive mix counts,
 *    source_ids resolution via p2_source_catalog).
 *  - --merge: timestamped backup of p2/pack_p2_b.js (BACKUP_PROTOCOL.md), splice-append before
 *    array closer ("\n  ," insertion before first new item), count assert prev->next, re-parse,
 *    QID uniqueness check. Never writes on validation failure.
 *  - No deletion primitives anywhere in this script (AGENTS.md §3.1).
 */

"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const PACK = path.join(ROOT, "p2", "pack_p2_b.js");
const VAR_NAME = "pack_p2_b_questions";
const STAGING = "C:\\Users\\User\\AppData\\Local\\Temp\\opencode";

const { resolveSource } = require(path.join(ROOT, "scripts", "validators", "p2_source_catalog"));
const { GovernanceGuardP2 } = require(path.join(ROOT, "scripts", "governance_guard_p2"));

const VALID_CL = ["Remember", "Understand", "Apply", "Analyze", "Evaluate"];
const VALID_DIFF = ["Easy", "Moderate-Easy", "Moderate", "Difficult", "Very Difficult"];

function readPack() {
  const src = fs.readFileSync(PACK, "utf8");
  const m = src.match(/var pack_p2_b_questions = ([\s\S]*);\s*$/);
  if (!m) throw new Error("Cannot find pack array in pack_p2_b.js");
  const data = new Function("return " + m[1])();
  return { src, items: data };
}

function fmt(n) { return String(n).padStart(3, "0"); }

function validateItem(item, expectedQid, issues) {
  const qid = item.QuestionID;
  if (qid !== expectedQid) issues.push(`${expectedQid}: QID mismatch — got ${qid}`);

  // Required structural fields
  const required = ["Part", "Section", "Topic", "QuestionID", "question_state", "Part2OnlyFlag",
    "UniqueConceptKey", "Stem", "Choices", "CorrectChoice", "ExplanationCorrect",
    "ExplanationWrongA", "ExplanationWrongB", "ExplanationWrongC", "ExplanationWrongD",
    "Difficulty", "DifficultyScore", "CognitiveLevel", "CalculationItem", "ItemStyle",
    "LOSTag", "BlueprintDomain", "VerifiedChecks"];
  for (const f of required) if (!(f in item)) issues.push(`${qid}: missing required field ${f}`);
  for (const f of ["Type", "VerificationChecks", "Industry", "CompanyType", "Stakeholder", "BusinessFunction", "Scale"])
    if (f in item) issues.push(`${qid}: prohibited field ${f}`);

  if (item.Part !== 2) issues.push(`${qid}: Part !== 2`);
  if (item.Part2OnlyFlag !== true) issues.push(`${qid}: Part2OnlyFlag !== true`);
  if (item.Section !== "B") issues.push(`${qid}: Section !== B`);
  if (item.question_state !== "Unprocessed") issues.push(`${qid}: question_state must be Unprocessed, got ${item.question_state}`);
  if (!/^P2-B-\d{3}$/.test(qid)) issues.push(`${qid}: bad QID format`);
  if (!/^B\.\d+$/.test(item.LOSTag || "")) issues.push(`${qid}: LOSTag must be B.N, got ${item.LOSTag}`);

  // Difficulty / cognitive validity + Rule 11 floors
  if (!VALID_CL.includes(item.CognitiveLevel)) issues.push(`${qid}: invalid CognitiveLevel ${item.CognitiveLevel}`);
  if (!VALID_DIFF.includes(item.Difficulty)) issues.push(`${qid}: invalid Difficulty ${item.Difficulty}`);
  const ds = item.DifficultyScore;
  if (!Number.isInteger(ds) || ds < 1 || ds > 5) issues.push(`${qid}: DifficultyScore must be int 1-5, got ${ds}`);
  const labelToScore = { "Easy": 1, "Moderate-Easy": 2, "Moderate": 3, "Difficult": 4, "Very Difficult": 5 };
  if (ds !== labelToScore[item.Difficulty]) issues.push(`${qid}: Difficulty label/score mismatch (${item.Difficulty}/${ds})`);
  if (item.CognitiveLevel === "Evaluate" && ds < 3) issues.push(`${qid}: Evaluate requires DS>=3 (Rule 11 AF-5)`);
  if (item.CognitiveLevel === "Analyze" && ds < 2) issues.push(`${qid}: Analyze requires DS>=2 (Rule 11 AF-5)`);
  if ((item.CognitiveLevel === "Apply" || item.CognitiveLevel === "Analyze") && ds === 5)
    issues.push(`${qid}: Apply/Analyze at DS=5 — suspect misclassification (S122 floor)`);

  // Choices + EW structure
  const cc = item.CorrectChoice;
  if (!/^[A-D]$/.test(cc || "")) issues.push(`${qid}: CorrectChoice must be A-D`);
  if (!item.Choices || typeof item.Choices !== "object") issues.push(`${qid}: Choices missing`);
  else for (const L of ["A", "B", "C", "D"])
    if (typeof item.Choices[L] !== "string" || item.Choices[L].trim() === "") issues.push(`${qid}: Choices.${L} missing/empty`);
  for (const L of ["A", "B", "C", "D"]) {
    const ew = item["ExplanationWrong" + L];
    if (L === cc) { if (ew !== "") issues.push(`${qid}: DL-008 — EW${L} must be ""`); }
    else {
      if (ew === undefined) issues.push(`${qid}: DL-021 — EW${L} absent`);
      else if (typeof ew !== "string" || ew.trim().length < 75) issues.push(`${qid}: DL-026 — EW${L} <75 chars or empty`);
    }
  }
  const ec = item.ExplanationCorrect || "";
  const minEC = (item.CognitiveLevel === "Remember" || item.CognitiveLevel === "Understand") ? 100 : 200;
  if (ec.length < minEC) issues.push(`${qid}: ExplanationCorrect ${ec.length} chars < ${minEC}`);

  // DL-013 boilerplate scan
  const allText = [item.Stem || "", ec, ...(item.Choices ? Object.values(item.Choices) : []),
    ...(item.ExplanationWrongA || ""), (item.ExplanationWrongB || ""), (item.ExplanationWrongC || ""), (item.ExplanationWrongD || "")].join(" ");
  const boilerplate = /represents? a plausible misconception|Option [A-D] is (not|incorrect)|A candidate may select this option by misapplying|is not the correct answer/i;
  if (boilerplate.test(allText)) issues.push(`${qid}: DL-013 boilerplate text detected`);

  // v1.1 evidence fields
  if (item.schema_version !== "1.1") issues.push(`${qid}: schema_version must be 1.1`);
  if (item.source_status !== "RESOLVED") issues.push(`${qid}: source_status must be RESOLVED`);
  if (item.hold_reason !== "") issues.push(`${qid}: hold_reason must be ""`);
  if (!Array.isArray(item.source_ids) || item.source_ids.length === 0) issues.push(`${qid}: source_ids must be non-empty array`);
  else for (const sid of item.source_ids) if (!resolveSource(sid).matched) issues.push(`${qid}: source_ids entry unresolved: ${sid}`);

  const ssk = item.source_support_for_key;
  if (!ssk || typeof ssk !== "object") issues.push(`${qid}: source_support_for_key missing`);
  else {
    for (const k of ["source_id", "rule_or_proposition", "application_to_facts", "key_conclusion"])
      if (typeof ssk[k] !== "string" || ssk[k].trim() === "") issues.push(`${qid}: ssk.${k} must be non-empty`);
    if (ssk.source_id && !resolveSource(ssk.source_id).matched) issues.push(`${qid}: ssk.source_id unresolved: ${ssk.source_id}`);
  }

  const di = item.distractor_intent;
  const nonCC = ["A", "B", "C", "D"].filter(L => L !== cc);
  if (!di || typeof di !== "object") issues.push(`${qid}: distractor_intent missing`);
  else {
    const keys = Object.keys(di).sort().join(",");
    const expect = nonCC.slice().sort().join(",");
    if (keys !== expect) issues.push(`${qid}: distractor_intent keys [${keys}] != [${expect}]`);
    for (const L of nonCC) {
      const e = di[L];
      if (!e || typeof e !== "object") { issues.push(`${qid}: di.${L} missing`); continue; }
      if (typeof e.misconception !== "string" || !e.misconception.trim()) issues.push(`${qid}: di.${L}.misconception empty`);
      if (typeof e.why_plausible !== "string" || !e.why_plausible.trim()) issues.push(`${qid}: di.${L}.why_plausible empty`);
      if (![1, 2, 3].includes(e.tier_candidate)) issues.push(`${qid}: di.${L}.tier_candidate must be 1|2|3`);
    }
    const tiers = nonCC.map(L => di[L] && di[L].tier_candidate).sort().join(",");
    if (tiers !== "1,2,3") issues.push(`${qid}: di tiers must be unique 1,2,3 (got ${tiers})`);
  }

  const un = item.uniqueness_note || "";
  for (const L of nonCC) if (!new RegExp("\\b" + L + "\\b").test(un)) issues.push(`${qid}: uniqueness_note missing letter ${L}`);

  // Calculation item checks
  if (item.CalculationItem === true) {
    if (typeof item.FormulaReference !== "string" || !item.FormulaReference.trim()) issues.push(`${qid}: calc item missing FormulaReference`);
    const vc = Array.isArray(item.VerifiedChecks) ? item.VerifiedChecks.join(" ") : "";
    if (!/recomput|independently|verified|derived/i.test(vc)) issues.push(`${qid}: calc item VerifiedChecks missing recompute line`);
  }
  if (typeof item.CalculationItem !== "boolean") issues.push(`${qid}: CalculationItem must be boolean`);
  if (typeof item.UniqueConceptKey !== "string" || !item.UniqueConceptKey.trim()) issues.push(`${qid}: UniqueConceptKey missing`);
}

function gate(stagingFiles, expectedStartQid) {
  const issues = [];
  const items = [];
  for (const f of stagingFiles) {
    const fp = path.join(STAGING, f);
    if (!fs.existsSync(fp)) { console.error(`MISSING staging file: ${fp}`); process.exit(1); }
    let arr;
    try { arr = JSON.parse(fs.readFileSync(fp, "utf8")); }
    catch (e) { console.error(`JSON parse error in ${f}: ${e.message}`); process.exit(1); }
    if (!Array.isArray(arr)) { console.error(`${f} is not an array`); process.exit(1); }
    for (const it of arr) items.push(it);
  }
  if (items.length !== 30) { console.error(`Expected 30 staged items, got ${items.length}`); process.exit(1); }

  items.forEach((it, i) => validateItem(it, `P2-B-${fmt(expectedStartQid + i)}`, issues));

  // Aggregate mix counts
  const ccCount = { A: 0, B: 0, C: 0, D: 0 };
  const diffCount = {};
  const clCount = {};
  let calc = 0;
  for (const it of items) {
    ccCount[it.CorrectChoice] = (ccCount[it.CorrectChoice] || 0) + 1;
    diffCount[it.Difficulty] = (diffCount[it.Difficulty] || 0) + 1;
    clCount[it.CognitiveLevel] = (clCount[it.CognitiveLevel] || 0) + 1;
    if (it.CalculationItem) calc++;
  }
  const diffPlan = { "Easy": 4, "Moderate-Easy": 6, "Moderate": 9, "Difficult": 8, "Very Difficult": 3 };
  const clPlan = { "Remember": 3, "Understand": 6, "Apply": 12, "Analyze": 6, "Evaluate": 3 };
  // S121 §2 tolerance: ±3pp per tier (~±1 item per 30). Enforce ±1 deviation.
  for (const [k, v] of Object.entries(diffPlan)) {
    const got = diffCount[k] || 0;
    if (Math.abs(got - v) > 1) issues.push(`mix: Difficulty ${k} = ${got}, expected ${v} (±1)`);
  }
  for (const [k, v] of Object.entries(clPlan)) {
    const got = clCount[k] || 0;
    if (Math.abs(got - v) > 1) issues.push(`mix: Cognitive ${k} = ${got}, expected ${v} (±1)`);
  }
  const ccTotal = Object.values(ccCount).reduce((a, b) => a + b, 0);
  if (ccTotal !== 30) issues.push(`mix: CC total ${ccTotal} != 30`);
  if (ccCount.A < 7 || ccCount.A > 9 || ccCount.B < 7 || ccCount.B > 9 || ccCount.C < 6 || ccCount.C > 8 || ccCount.D < 6 || ccCount.D > 8)
    issues.push(`mix: CC balance off — A${ccCount.A} B${ccCount.B} C${ccCount.C} D${ccCount.D}`);
  if (calc !== 18) issues.push(`mix: calc count ${calc} != 18`);

  // Max CC streak check
  let streak = 1;
  for (let i = 1; i < items.length; i++) {
    if (items[i].CorrectChoice === items[i - 1].CorrectChoice) { streak++; if (streak > 2) issues.push(`mix: CC streak >2 at index ${i}`); }
    else streak = 1;
  }

  if (issues.length) {
    console.error(`=== GATE FAIL — ${issues.length} issue(s) ===`);
    for (const s of issues) console.error("  " + s);
    process.exit(1);
  }
  console.log("=== GATE PASS — 30 items clean ===");
  console.log(`  CC: A${ccCount.A} B${ccCount.B} C${ccCount.C} D${ccCount.D} | Diff: ${JSON.stringify(diffCount)} | CL: ${JSON.stringify(clCount)} | Calc ${calc}`);
  return items;
}

function merge(stagingFiles, expectedStartQid) {
  const items = gate(stagingFiles, expectedStartQid);
  const { src } = readPack();

  // Backup
  const ts = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z/, "");
  const bak = path.join(ROOT, "backups", `pack_p2_b.js.bak-sprint-${ts}`);
  fs.writeFileSync(bak, src, "utf8");
  const stat = fs.statSync(bak);
  if (stat.size === 0) { console.error(`Backup ${bak} is empty — aborting`); process.exit(1); }
  console.log(`Backup: ${bak} (${stat.size} bytes)`);

  // Splice-append before array closer
  const closer = src.lastIndexOf("];");
  if (closer === -1) { console.error("Cannot find array closer ];" ); process.exit(1); }
  const head = src.slice(0, closer);
  const tail = src.slice(closer);
  const jsonLines = items.map(it => JSON.stringify(it, null, 2)).join(",\n  ");
  const newContent = head + ",\n  " + jsonLines + "\n" + tail;

  // Verify parse + count delta + QID uniqueness
  let parsed;
  try { parsed = new Function(newContent + "\nreturn " + VAR_NAME + ";")(); }
  catch (e) { console.error(`Rebuilt file does not parse: ${e.message}`); process.exit(1); }
  const qids = parsed.map(i => i.QuestionID);
  const base = readPack().items.length;
  if (qids.length !== items.length + base) { console.error(`Count ${qids.length} != ${items.length + base}`); process.exit(1); }
  if (new Set(qids).size !== qids.length) { console.error("QID duplicates detected"); process.exit(1); }

  fs.writeFileSync(PACK, newContent, "utf8");
  console.log(`Merged: pack_p2_b.js ${base} → ${qids.length} (${items.length} new, QIDs ${qids[0]}..${qids[qids.length - 1]})`);
  console.log(`QID uniqueness: ${new Set(qids).size}/${qids.length} OK`);
}

const mode = process.argv[2];
const files = process.argv.slice(3).filter(a => !/^\d+$/.test(a));
const expectedStart = parseInt(process.argv.slice(3).find(a => /^\d+$/.test(a)) || "311", 10);
if (!["--check", "--merge"].includes(mode) || files.length !== 3) {
  console.error("Usage: node gate_p2b.js --check <f1> <f2> <f3> [startQid] | --merge <f1> <f2> <f3> [startQid]");
  process.exit(1);
}
if (mode === "--check") gate(files, expectedStart);
else merge(files, expectedStart);
