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
  for (const item of items) {
    const itemErrors = validateItem(item, file);
    if (itemErrors.length > 0) {
      errors.push(...itemErrors);
    }
  }

  totalItems += items.length;
  totalErrors += errors.length;

  if (errors.length === 0) {
    console.log(`  PASS  ${file} — ${items.length} items, 0 errors`);
  } else {
    console.log(`  FAIL  ${file} — ${items.length} items, ${errors.length} error(s):`);
    for (const e of errors) {
      console.log(`         ${e}`);
    }
  }
}

console.log(`\n=== RESULT: ${totalItems} items, ${totalErrors} errors ===\n`);

if (totalErrors > 0) process.exit(1);
process.exit(0);
