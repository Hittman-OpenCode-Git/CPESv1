/**
 * P2 Schema Validator — Enforces P2_SCHEMA_STANDARD.md v1.0 at validation time.
 *
 * Usage:  node scripts/validators/p2_schema_validator.js
 *         npm run validate:p2
 *
 * Checks:
 *   1. Required fields present (Part, Section, Part2OnlyFlag, UniqueConceptKey, etc.)
 *   2. Field type correctness (Part2OnlyFlag must be true, CognitiveLevel in registry)
 *   3. Prohibited fields absent (Type, VerificationChecks, Industry, CompanyType, Stakeholder, etc.)
 *   4. DL-008/026/021 structural compliance via governance guard integration
 *   5. Cross-part QID boundary
 *   6. ItemStyle in permitted enumeration
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");
const P2_DIR = path.join(ROOT, "p2");

const PACKS = [
  "pack_p2_a.js", "pack_p2_b.js", "pack_p2_c.js",
  "pack_p2_d.js", "pack_p2_e.js", "pack_p2_f.js",
];

// ── Field definitions ───────────────────────────────────────────

const REQUIRED_FIELDS = [
  "Part", "Section", "Topic", "QuestionID", "question_state",
  "Part2OnlyFlag", "UniqueConceptKey", "Stem", "Choices",
  "CorrectChoice", "ExplanationCorrect",
  "ExplanationWrongA", "ExplanationWrongB", "ExplanationWrongC", "ExplanationWrongD",
  "Difficulty", "DifficultyScore", "CognitiveLevel", "CalculationItem",
  "ItemStyle", "LOSTag", "BlueprintDomain", "VerifiedChecks",
];

const PROHIBITED_FIELDS = [
  "Type",              // must be ItemStyle (engine collision with case scoring)
  "VerificationChecks", // must be VerifiedChecks (Part 1 convention)
  "Industry",          // dropped — case-study metadata
  "CompanyType",       // dropped
  "Stakeholder",       // dropped
  "BusinessFunction",  // dropped
  "Scale",             // dropped
];

const VALID_ITEM_STYLES = new Set([
  "single-select", "multi-select", "numeric", "fill", "match",
]);

const VALID_COGNITIVE_LEVELS = new Set([
  "Remember", "Understand", "Apply", "Analyze", "Evaluate",
]);

const VALID_DIFFICULTY_LABELS = new Set([
  "Easy", "Moderate-Easy", "Moderate", "Difficult", "Very Difficult",
]);

const P2_QID_RE = /^P2-[A-F]-\d{3}$/;

// ── v1.1 Authoring-evidence validation (P2_SCHEMA_STANDARD.md §1.1) ──────
// Report-only by default. Pass `--enforce` to make v1.1 evidence findings
// blocking (exit 1). GRANDFATHERED and HOLD_FOR_SOURCE are never blocking.
const { resolveSource } = require("./p2_source_catalog");

const SCHEMA_VERSION_V11 = "1.1";
const VALID_SOURCE_STATUS = new Set(["RESOLVED", "HOLD_FOR_SOURCE"]);
const SOURCE_SUPPORT_KEYS = ["source_id", "rule_or_proposition", "application_to_facts", "key_conclusion"];
const V11_FIELD_NAMES = ["source_ids", "source_support_for_key", "distractor_intent", "uniqueness_note", "source_status", "hold_reason"];
const ENFORCE_V11 = process.argv.includes("--enforce");

/**
 * Validate v1.1 authoring-evidence fields (report-only).
 * @returns {{outcome:string, findings:string[], note:string}}
 *   outcome: "PASS" | "HOLD_FOR_SOURCE" | "GRANDFATHERED" | "MIGRATION_REQUIRED"
 */
function validateV11Evidence(item) {
  const findings = [];
  const hasAnyNewField = V11_FIELD_NAMES.some(k => k in item);
  const sv = item.schema_version;

  // Legacy v1.0 item — new fields optional (grandfather policy §1.2).
  if (!hasAnyNewField && (sv === undefined || sv === "1.0")) {
    return { outcome: "GRANDFATHERED", findings, note: "legacy v1.0 item — new fields optional until certification/migration gate" };
  }

  // Partial v1.1 state: new fields present but schema_version absent/1.0.
  if (sv === undefined || sv === "1.0") {
    findings.push("partial v1.1 state: new fields present but schema_version is not '1.1' (set it or drop the new fields)");
    return { outcome: "MIGRATION_REQUIRED", findings, note: "incoherent schema state" };
  }

  if (sv !== SCHEMA_VERSION_V11) {
    findings.push("schema_version '" + String(sv) + "' is not registered (expect '1.1')");
    return { outcome: "MIGRATION_REQUIRED", findings, note: "unknown schema_version" };
  }

  // source_status enumeration (fixed-enum allowlist).
  if (!("source_status" in item) || !VALID_SOURCE_STATUS.has(item.source_status)) {
    findings.push("source_status must be exactly 'RESOLVED' or 'HOLD_FOR_SOURCE' (got " + JSON.stringify(item.source_status) + ")");
    return { outcome: "MIGRATION_REQUIRED", findings, note: "source_status enum violation" };
  }
  const ss = item.source_status;

  if (ss === "HOLD_FOR_SOURCE") {
    // Quarantine branch — intentional hold, not a defect.
    if (item.source_support_for_key !== null && item.source_support_for_key !== undefined) {
      findings.push("HOLD_FOR_SOURCE requires source_support_for_key: null");
    }
    if (typeof item.hold_reason !== "string" || item.hold_reason.trim() === "") {
      findings.push("HOLD_FOR_SOURCE requires non-empty hold_reason");
    }
    return { outcome: "HOLD_FOR_SOURCE", findings, note: "quarantined from certification input / candidate pools / exports / production" };
  }

  // RESOLVED branch.
  if (item.hold_reason !== undefined && item.hold_reason !== "") {
    findings.push("RESOLVED requires hold_reason empty");
  }
  if (!Array.isArray(item.source_ids) || item.source_ids.length === 0) {
    findings.push("RESOLVED requires source_ids as a non-empty array");
  } else {
    for (const sid of item.source_ids) {
      const r = resolveSource(sid);
      if (!r.matched) {
        findings.push("source_ids entry does not resolve in approved source catalog: " + JSON.stringify(sid) + " (" + r.note + ")");
      }
    }
  }

  const ssk = item.source_support_for_key;
  if (!ssk || typeof ssk !== "object" || Array.isArray(ssk)) {
    findings.push("RESOLVED requires source_support_for_key as a non-null object");
  } else {
    for (const k of SOURCE_SUPPORT_KEYS) {
      if (typeof ssk[k] !== "string" || ssk[k].trim() === "") {
        findings.push("source_support_for_key." + k + " must be a non-empty string");
      }
    }
    if (typeof ssk.source_id === "string" && ssk.source_id.trim() !== "") {
      const r = resolveSource(ssk.source_id);
      if (!r.matched) {
        findings.push("source_support_for_key.source_id does not resolve in approved source catalog: " + JSON.stringify(ssk.source_id) + " (" + r.note + ")");
      }
    }
  }

  // distractor_intent — keys must equal non-CC letters; entries complete; tiers {1,2,3}.
  const cc = item.CorrectChoice;
  const di = item.distractor_intent;
  if (!di || typeof di !== "object" || Array.isArray(di)) {
    findings.push("distractor_intent must be an object");
  } else {
    const expected = ["A", "B", "C", "D"].filter(L => L !== cc);
    const actual = Object.keys(di).sort();
    const expSorted = expected.slice().sort();
    if (actual.join(",") !== expSorted.join(",")) {
      findings.push("distractor_intent keys must exactly equal the three non-key letters {A,B,C,D}\\{CorrectChoice}; got [" + actual.join(",") + "], expected [" + expSorted.join(",") + "]");
    }
    for (const L of expected) {
      const e = di[L];
      if (!e || typeof e !== "object") {
        findings.push("distractor_intent." + L + " must be an object");
        continue;
      }
      if (typeof e.misconception !== "string" || e.misconception.trim() === "") {
        findings.push("distractor_intent." + L + ".misconception must be non-empty");
      }
      if (typeof e.why_plausible !== "string" || e.why_plausible.trim() === "") {
        findings.push("distractor_intent." + L + ".why_plausible must be non-empty");
      }
    }
    const tiers = expected
      .map(L => (di[L] && typeof di[L].tier_candidate === "number" ? di[L].tier_candidate : null))
      .filter(v => v !== null);
    const tierSet = new Set(tiers);
    if (!(tierSet.size === 3 && tierSet.has(1) && tierSet.has(2) && tierSet.has(3))) {
      findings.push("distractor_intent tier_candidate values must be the unique integers 1, 2, 3 (one per distractor)");
    }
  }

  // uniqueness_note — non-empty and references every non-key option.
  if (typeof item.uniqueness_note !== "string" || item.uniqueness_note.trim() === "") {
    findings.push("uniqueness_note must be a non-empty string");
  } else if (cc && /^[A-D]$/.test(cc)) {
    const missing = ["A", "B", "C", "D"].filter(
      L => L !== cc && !new RegExp("\\b" + L + "\\b").test(item.uniqueness_note)
    );
    if (missing.length) {
      findings.push("uniqueness_note does not explicitly reference non-key option(s): " + missing.join(", "));
    }
  }

  return {
    outcome: findings.length ? "MIGRATION_REQUIRED" : "PASS",
    findings,
    note: findings.length ? "v1.1 evidence defects" : "v1.1 compliant",
  };
}

// ── Extraction ──────────────────────────────────────────────────

function extractItems(content) {
  const items = [];
  let pos = 0;
  while (pos < content.length) {
    const objStart = content.indexOf("{", pos);
    if (objStart === -1) break;
    let depth = 1;
    let i = objStart + 1;
    let inString = false, stringChar = "", escape = false;
    while (depth > 0 && i < content.length) {
      const ch = content[i];
      if (escape) { escape = false; i++; continue; }
      if (inString) {
        if (ch === "\\") { escape = true; }
        else if (ch === stringChar) { inString = false; stringChar = ""; }
        i++; continue;
      }
      if (ch === '"' || ch === "'") { inString = true; stringChar = ch; i++; continue; }
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      i++;
    }
    if (depth !== 0) break;
    const objText = content.substring(objStart, i);
    let obj = null;
    try { obj = JSON.parse(objText); } catch (e) {
      try { obj = new Function("return (" + objText + ")")(); } catch (e2) {}
    }
    if (obj && typeof obj === "object" && !Array.isArray(obj) && obj.QuestionID) {
      items.push(obj);
    }
    pos = i;
  }
  return items;
}

// ── Validation ──────────────────────────────────────────────────

function validateItem(item, packFile) {
  const errors = [];
  const qid = item.QuestionID || "(unknown)";
  const cc = item.CorrectChoice;

  // 1. Required fields
  for (const field of REQUIRED_FIELDS) {
    if (!(field in item)) {
      errors.push(`${qid}: missing required field '${field}'`);
    }
  }

  // 2. Prohibited fields
  for (const field of PROHIBITED_FIELDS) {
    if (field in item) {
      errors.push(`${qid}: prohibited field '${field}' present (use canonically-named replacement)`);
    }
  }

  // 3. Part2OnlyFlag must be true
  if (item.Part2OnlyFlag !== true) {
    errors.push(`${qid}: Part2OnlyFlag must be true (got ${JSON.stringify(item.Part2OnlyFlag)})`);
  }

  // 4. Part must be 2
  if (item.Part !== 2) {
    errors.push(`${qid}: Part must be 2 (got ${JSON.stringify(item.Part)})`);
  }

  // 5. QID format
  if (!P2_QID_RE.test(qid)) {
    errors.push(`${qid}: QID does not match P2-[Section]-NNN format`);
  }

  // 6. ItemStyle enumeration
  if (item.ItemStyle && !VALID_ITEM_STYLES.has(item.ItemStyle)) {
    errors.push(`${qid}: invalid ItemStyle '${item.ItemStyle}'`);
  }

  // 7. CognitiveLevel enumeration
  if (item.CognitiveLevel && !VALID_COGNITIVE_LEVELS.has(item.CognitiveLevel)) {
    errors.push(`${qid}: invalid CognitiveLevel '${item.CognitiveLevel}'`);
  }

  // 8. Difficulty enumeration
  if (item.Difficulty && !VALID_DIFFICULTY_LABELS.has(item.Difficulty)) {
    errors.push(`${qid}: invalid Difficulty '${item.Difficulty}'`);
  }

  // 9. DifficultyScore range
  if (item.DifficultyScore !== undefined && (item.DifficultyScore < 1 || item.DifficultyScore > 5 || !Number.isInteger(item.DifficultyScore))) {
    errors.push(`${qid}: DifficultyScore must be integer 1-5 (got ${item.DifficultyScore})`);
  }

  // 10. ExplanationCorrect minimum length
  if (typeof item.ExplanationCorrect === "string" && item.ExplanationCorrect.length < 50) {
    errors.push(`${qid}: ExplanationCorrect too short (${item.ExplanationCorrect.length} chars, min 50)`);
  }

  // 11. DL-008: ExplanationWrong[CC] must be ""
  if (cc && /^[A-D]$/.test(cc)) {
    const ewVal = item["ExplanationWrong" + cc];
    if (typeof ewVal === "string" && ewVal.length > 0) {
      errors.push(`${qid}: DL-008 — ExplanationWrong${cc} is non-empty (${ewVal.length} chars)`);
    }
  }

  // 12. DL-026/021: non-CC EW slots must be present and non-empty
  if (cc && /^[A-D]$/.test(cc)) {
    for (const L of ["A", "B", "C", "D"]) {
      if (L === cc) continue;
      const ewKey = "ExplanationWrong" + L;
      if (!(ewKey in item)) {
        errors.push(`${qid}: DL-021 — ExplanationWrong${L} is absent`);
      } else if (typeof item[ewKey] === "string" && item[ewKey].length === 0) {
        errors.push(`${qid}: DL-026 — ExplanationWrong${L} is empty`);
      }
    }
  }

  // 13. Choices must have A, B, C, D
  if (item.Choices) {
    for (const L of ["A", "B", "C", "D"]) {
      if (!(L in item.Choices) || typeof item.Choices[L] !== "string" || item.Choices[L].length === 0) {
        errors.push(`${qid}: Choices.${L} missing or empty`);
      }
    }
    if (typeof item.Choices !== "object" || Array.isArray(item.Choices)) {
      errors.push(`${qid}: Choices must be an object {A, B, C, D}`);
    }
  }

  return errors;
}

// ── Main ────────────────────────────────────────────────────────

console.log("=== P2 SCHEMA VALIDATOR — " + new Date().toISOString() + " ===\n");

let totalItems = 0;
let totalErrors = 0;
let totalWarnings = 0;
let totalV11Blocking = 0; // MIGRATION_REQUIRED findings (blocking only under --enforce)
const v11Summary = {
  PASS: 0,
  HOLD_FOR_SOURCE: 0,
  GRANDFATHERED: 0,
  MIGRATION_REQUIRED: 0,
  ERROR: 0,
  certifiedGrandfathered: 0,
};
const v11FindingsByPack = {};

for (const file of PACKS) {
  const fp = path.join(P2_DIR, file);
  if (!fs.existsSync(fp)) {
    console.log(`  SKIP  ${file} — not created yet`);
    continue;
  }

  const content = fs.readFileSync(fp, "utf8");
  const items = extractItems(content);

  if (items.length === 0) {
    console.log(`  OK    ${file} — empty pack (no items to validate)`);
    continue;
  }

  const errors = [];
  const v11Findings = [];
  const packV11 = { PASS: 0, HOLD_FOR_SOURCE: 0, GRANDFATHERED: 0, MIGRATION_REQUIRED: 0, ERROR: 0, certifiedGrandfathered: 0 };

  for (const item of items) {
    const itemErrors = validateItem(item, file);
    if (itemErrors.length > 0) {
      errors.push(...itemErrors);
      packV11.ERROR++;
      v11Summary.ERROR++;
      continue;
    }

    const v11 = validateV11Evidence(item);
    packV11[v11.outcome] = (packV11[v11.outcome] || 0) + 1;
    v11Summary[v11.outcome] = (v11Summary[v11.outcome] || 0) + 1;
    if (v11.outcome === "GRANDFATHERED" && item.question_state === "Certified") {
      packV11.certifiedGrandfathered++;
      v11Summary.certifiedGrandfathered++;
    }
    if (v11.outcome === "MIGRATION_REQUIRED") {
      for (const f of v11.findings) {
        v11Findings.push(`[V11][${item.QuestionID}] ${f}`);
      }
    }
  }

  totalItems += items.length;
  totalErrors += errors.length;
  totalV11Blocking += v11Findings.length;
  v11FindingsByPack[file] = v11Findings;

  if (errors.length === 0) {
    console.log(`  PASS  ${file} — ${items.length} items, 0 errors`);
  } else {
    console.log(`  FAIL  ${file} — ${items.length} items, ${errors.length} error(s):`);
    for (const e of errors) {
      console.log(`         ${e}`);
    }
  }
  console.log(`  V11   ${file} — ${"PASS " + packV11.PASS} | ${"HOLD " + packV11.HOLD_FOR_SOURCE} | ${"GRANDFATHERED " + packV11.GRANDFATHERED} | ${"MIGRATION_REQUIRED " + packV11.MIGRATION_REQUIRED} | ${"ERROR " + packV11.ERROR}${ENFORCE_V11 ? "" : "  (report-only — use --enforce to block)"}`);
  for (const f of v11Findings) {
    console.log(`         ${f}`);
  }
}

console.log(`\n=== RESULT: ${totalItems} items, ${totalErrors} errors ===`);
console.log(`=== v1.1 EVIDENCE SUMMARY ===`);
console.log(`  Items scanned:           ${totalItems}`);
console.log(`  PASS (v1.1):             ${v11Summary.PASS}`);
console.log(`  HOLD_FOR_SOURCE:         ${v11Summary.HOLD_FOR_SOURCE}  (quarantined from certification input)`);
console.log(`  GRANDFATHERED (legacy):  ${v11Summary.GRANDFATHERED}`);
console.log(`    ├─ Certified:          ${v11Summary.certifiedGrandfathered}`);
console.log(`    └─ Non-certified:      ${v11Summary.GRANDFATHERED - v11Summary.certifiedGrandfathered}`);
console.log(`  MIGRATION_REQUIRED:      ${v11Summary.MIGRATION_REQUIRED}  (${totalV11Blocking} finding(s))`);
console.log(`  ERROR (base schema):     ${v11Summary.ERROR}`);
console.log(`  Mode:                    ${ENFORCE_V11 ? "ENFORCED — v1.1 evidence findings are blocking" : "REPORT-ONLY — new fields not yet blocking (use --enforce)"}\n`);

const v11HardBlock = ENFORCE_V11 ? totalV11Blocking : 0;
if (totalErrors > 0 || v11HardBlock > 0) process.exit(1);
process.exit(0);
