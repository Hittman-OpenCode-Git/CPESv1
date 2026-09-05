/**
 * Audit script for p2/case_pack_p2_1.js — uses LEGACY CASE-STUDY schema
 * (cases are NOT MCQ packs; they have their own field set per QUESTION_METADATA_STANDARD.md Part 2):
 *
 *   Case-level:  CaseID, Title, SectionTags, BlueprintDomain, BlueprintObjectives,
 *                PrimaryCompetency, EstimatedMinutes, Difficulty, DifficultyScore,
 *                ScenarioText, Exhibits[], Items[], QuestionCount, ExhibitCount,
 *                ProductionStatus, Version, Tags, CreatedDate, ModifiedDate, Author,
 *                Confidence, RevisionHistory[], Dependencies[], LearningObjectives[]
 *
 *   Item-level:  ItemID, Type (numeric|select|multi|fill|match), Prompt, Correct,
 *                Choices[] (for select/multi), Explanation, Topic, Difficulty,
 *                DifficultyScore, CognitiveLevel, CalculationRequired
 *
 * Cases do NOT carry: CorrectChoice, ExplanationWrongA-D, Part2OnlyFlag, Choices{A,B,C,D}
 *
 * Audit-only — no file mutations.
 *
 * Usage: node scripts/audit_p2_pack1_cases.js
 */

const fs = require("fs");
const path = require("path");

const FILE = path.resolve(__dirname, "..", "p2", "case_pack_p2_1.js");

const raw = fs.readFileSync(FILE, "utf8");

const varMatch = raw.match(/(?:var|let|const)\s+(casePackP2_\d+)\s*=\s*\[/);
if (!varMatch) { console.error("FATAL: casePackP2_1 not found"); process.exit(2); }

const arrStart = raw.indexOf("[", varMatch.index);
let depth = 0, pos = arrStart, inString = false, stringChar = "", escape = false;
do {
  const ch = raw[pos];
  if (escape) { escape = false; pos++; continue; }
  if (inString) {
    if (ch === "\\") { escape = true; pos++; continue; }
    if (ch === stringChar) { inString = false; pos++; continue; }
    pos++; continue;
  }
  if (ch === '"' || ch === "'" || ch === "`") { inString = true; stringChar = ch; pos++; continue; }
  if (ch === "[") depth++;
  if (ch === "]") depth--;
  pos++;
} while (depth > 0 && pos < raw.length);

const arrText = raw.slice(arrStart, pos);
let cases;
try { cases = JSON.parse(arrText); }
catch (e1) {
  try { cases = new Function("return (" + arrText + ")")(); }
  catch (e2) { console.error("FATAL: parse failed:", e2.message); process.exit(2); }
}

console.log(`Parsed ${cases.length} cases from ${path.basename(FILE)}\n`);

const unprocessed = cases.filter(c => c.question_state === "Unprocessed");
console.log(`Unprocessed cases: ${unprocessed.length}`);
unprocessed.forEach(c => {
  console.log(`  ${c.CaseID.padEnd(10)}  ${c.Title}`);
  console.log(`              Section: ${(c.SectionTags||[]).join(",")} | Items: ${(c.Items||[]).length} | Exhibits: ${(c.Exhibits||[]).length} | Diff: ${c.Difficulty}/${c.DifficultyScore}`);
});

const defects = [];
function add(caseID, itemID, sev, rule, message, evidence) {
  defects.push({ caseID, itemID, sev, rule, message, evidence });
}

const VALID_CL = ["Remember","Understand","Apply","Analyze","Evaluate"];
const VALID_DIFF = ["Easy","Moderate-Easy","Moderate","Difficult","Very Difficult"];
const VALID_TYPE = ["numeric","select","multi","fill","match"];
const EW_BOILERPLATE = /represents a plausible misconception|A candidate may select this option by misapplying|A candidate selecting this option may misunderstand/i;

function checkItem(c, it) {
  const cid = c.CaseID;
  const iid = it.ItemID || "?";

  // Required fields
  const required = ["ItemID","Type","Prompt","Correct","Explanation","Topic","Difficulty","DifficultyScore","CognitiveLevel","CalculationRequired"];
  for (const f of required) {
    if (!(f in it)) add(cid, iid, "High", "MISSING_FIELD", `required field missing: ${f}`, "");
  }

  // Type validation
  if (it.Type && !VALID_TYPE.includes(it.Type)) {
    add(cid, iid, "High", "BAD_TYPE", `Type must be one of ${VALID_TYPE.join("|")}, got: ${it.Type}`, "");
  }

  // Correct answer is non-empty
  if ("Correct" in it) {
    const cor = it.Correct;
    const isEmpty = cor === null || cor === undefined || cor === "" ||
      (Array.isArray(cor) && cor.length === 0) ||
      (typeof cor === "object" && !Array.isArray(cor) && Object.keys(cor).length === 0);
    if (isEmpty) add(cid, iid, "Critical", "EMPTY_CORRECT", "Correct answer is empty", "");
  }

  // For select/multi, Choices must exist with adequate length
  if (it.Type === "select" || it.Type === "multi") {
    if (!Array.isArray(it.Choices) || it.Choices.length < 3) {
      add(cid, iid, "Critical", "BAD_CHOICES",
        `select/multi type requires Choices array ≥3, got ${(it.Choices && it.Choices.length) || 0}`, "");
    } else {
      // Check for placeholder text
      const placeholders = ["Option A","Option B","Option C","Option D","Lorem","TBD","TODO","Sample Answer","Example Answer","Correct Response","Incorrect Response","Placeholder","Sample Question","Standard definition","Standard terminology","Standard concept","Theoretical application","Computed per standard","Calculated based on standard"];
      for (const ch of it.Choices) {
        if (typeof ch === "string") {
          for (const ph of placeholders) {
            if (ch.includes(ph)) {
              add(cid, iid, "High", "PLACEHOLDER_CHOICE", `choice contains placeholder text: "${ph}"`, `choice: "${ch.slice(0,80)}"`);
              break;
            }
          }
        }
      }
      // DL-037 — choice lead-in polarity
      for (let i = 0; i < it.Choices.length; i++) {
        const ch = it.Choices[i];
        if (typeof ch !== "string") continue;
        const letter = "ABCD"[i];
        if (/^\s*No[,.]/i.test(ch) && /\bshould be (investigated|accepted|selected|recommended|chosen|used|adopted)\b/i.test(ch)) {
          add(cid, iid, "Critical", "DL-037",
            `Choice ${letter} lead-in "No," contradicts trailing "should be …"`, `text="${ch.slice(0,80)}"`);
        }
        if (/^\s*Yes[,.]/i.test(ch) && /\bshould not\b|\bshouldn't\b|\bcannot\b|\bmust not\b/i.test(ch)) {
          add(cid, iid, "Critical", "DL-037",
            `Choice ${letter} lead-in "Yes," contradicts trailing "should not …"`, `text="${ch.slice(0,80)}"`);
        }
      }
      // For select, Correct should be a letter A-D
      if (it.Type === "select") {
        if (typeof it.Correct !== "string" || !["A","B","C","D"].includes(it.Correct)) {
          add(cid, iid, "Critical", "BAD_CORRECT", `select-type Correct must be "A"|"B"|"C"|"D", got: ${JSON.stringify(it.Correct)}`, "");
        } else if (it.Choices.length <= "ABCD".indexOf(it.Correct)) {
          add(cid, iid, "Critical", "OUT_OF_RANGE_CORRECT",
            `Correct=${it.Correct} but Choices array has only ${it.Choices.length} elements`, "");
        }
      }
    }
  }

  // For numeric, Correct should be a numeric string
  if (it.Type === "numeric") {
    if (typeof it.Correct !== "string" || isNaN(parseFloat(it.Correct))) {
      add(cid, iid, "Critical", "BAD_NUMERIC_CORRECT",
        `numeric type Correct must be parseable number, got: ${JSON.stringify(it.Correct)}`, "");
    }
  }

  // For fill, Correct should be a non-empty string
  if (it.Type === "fill") {
    if (typeof it.Correct !== "string" || it.Correct.trim() === "") {
      add(cid, iid, "Critical", "BAD_FILL_CORRECT", `fill type Correct must be non-empty string`, "");
    }
  }

  // Explanation length and content
  if (typeof it.Explanation === "string") {
    if (it.Explanation.length < 50) {
      add(cid, iid, "High", "SHORT_EXPLANATION", `Explanation only ${it.Explanation.length} chars (<50)`, "");
    } else if (it.Explanation.length < 100) {
      add(cid, iid, "Medium", "SHORT_EXPLANATION", `Explanation only ${it.Explanation.length} chars (<100)`, "");
    }
    if (EW_BOILERPLATE.test(it.Explanation)) {
      add(cid, iid, "High", "BOILERPLATE_EXPLANATION", `Explanation contains DL-013 boilerplate`, "");
    }
    if (it.Type === "select" && it.Correct && /^Option\s+[A-D]\s+is\s+(correct|right)/i.test(it.Explanation)) {
      add(cid, iid, "Low", "TRIVIAL_EXPLANATION", `Explanation opens with "Option X is correct/right" pattern (poor pedagogy)`, "");
    }
  } else if (it.Explanation !== undefined && it.Explanation !== null) {
    add(cid, iid, "High", "BAD_EXPLANATION_TYPE", `Explanation must be string, got ${typeof it.Explanation}`, "");
  }

  // Difficulty / CognitiveLevel cross-check (Rule 11)
  if (it.CognitiveLevel && !VALID_CL.includes(it.CognitiveLevel)) {
    add(cid, iid, "High", "RULE_11", `invalid CognitiveLevel: ${it.CognitiveLevel}`, "");
  }
  if (it.Difficulty && !VALID_DIFF.includes(it.Difficulty)) {
    add(cid, iid, "High", "BAD_DIFFICULTY", `invalid Difficulty label: ${it.Difficulty}`, "");
  }
  const ds = it.DifficultyScore;
  const cl = it.CognitiveLevel;
  if (cl === "Evaluate" && typeof ds === "number" && ds < 3) {
    add(cid, iid, "High", "RULE_11_AF5", `Evaluate with DifficultyScore=${ds} (must be ≥3)`, "");
  }
  if (cl === "Analyze" && typeof ds === "number" && ds < 2) {
    add(cid, iid, "High", "RULE_11_AF5", `Analyze with DifficultyScore=${ds} (must be ≥2)`, "");
  }

  // AF-3 / AF-4 gates (Rule 11)
  if (typeof it.Prompt === "string") {
    const stem = it.Prompt;
    const ec = it.Explanation || "";
    const hasDirectRule = /Under (ASC|IFRS|COSO|GAAP|IAS)/i.test(stem);
    const hasCompeting = /(competing|trade-?off|weigh|best option|judgment)/i.test(ec);
    if (hasDirectRule && !hasCompeting && (cl === "Analyze" || cl === "Evaluate")) {
      add(cid, iid, "Medium", "RULE_11_AF3",
        `Stem has direct rule reference but no competing alternatives; ${cl} may be inflated to Apply`, "");
    }
    if (/\bwhat type of\b|\bwhich (COSO|component|category|cost)\b|\bclassified as\b/i.test(stem) && (cl === "Analyze" || cl === "Evaluate")) {
      add(cid, iid, "Medium", "RULE_11_AF4",
        `Stem asks "what type of/which/classified as"; cognitive level may be inflated to Apply`, "");
    }
  }

  // ItemID format
  if (it.ItemID && !/^CBQ2\d*-[A-F]\d+-Q\d+$/.test(it.ItemID)) {
    add(cid, iid, "Medium", "BAD_ITEMID", `ItemID format invalid: ${it.ItemID}`, "");
  }
}

function checkCase(c) {
  const cid = c.CaseID;
  if (!c.Exhibits || c.Exhibits.length === 0) {
    add(cid, null, "Medium", "NO_EXHIBITS", "case has no exhibits", "");
  }
  if (c.QuestionCount !== (c.Items || []).length) {
    add(cid, null, "High", "COUNT_MISMATCH",
      `QuestionCount=${c.QuestionCount} but Items.length=${(c.Items||[]).length}`, "");
  }
  if (c.ExhibitCount !== (c.Exhibits || []).length) {
    add(cid, null, "High", "EXHIBIT_COUNT_MISMATCH",
      `ExhibitCount=${c.ExhibitCount} but Exhibits.length=${(c.Exhibits||[]).length}`, "");
  }
  // Item-ID uniqueness within case
  const ids = new Set();
  for (const it of c.Items || []) {
    if (ids.has(it.ItemID)) add(cid, it.ItemID, "Critical", "DUP_ITEMID", `duplicate ItemID: ${it.ItemID}`, "");
    ids.add(it.ItemID);
    checkItem(c, it);
  }
  // Verify all item ItemIDs match the case prefix
  const prefix = cid + "-Q";
  for (const it of c.Items || []) {
    if (it.ItemID && !it.ItemID.startsWith(prefix)) {
      add(cid, it.ItemID, "Medium", "ITEMID_PREFIX_MISMATCH",
        `ItemID ${it.ItemID} does not start with case prefix ${prefix}`, "");
    }
  }
}

console.log("\n" + "─".repeat(70));
for (const c of unprocessed) checkCase(c);

console.log(`Total defects found: ${defects.length}\n`);

const bySev = { Critical: [], High: [], Medium: [], Low: [] };
for (const d of defects) (bySev[d.sev] || bySev.Low).push(d);

for (const sev of ["Critical", "High", "Medium", "Low"]) {
  const arr = bySev[sev];
  if (!arr.length) continue;
  console.log(`${sev.toUpperCase()} (${arr.length}):`);
  for (const d of arr) {
    console.log(`  [${d.rule}] ${d.caseID} ${d.itemID || ""}`);
    console.log(`     ${d.message}`);
    if (d.evidence) console.log(`     evidence: ${d.evidence}`);
  }
  console.log();
}

const perCase = {};
for (const d of defects) {
  perCase[d.caseID] = perCase[d.caseID] || { total: 0 };
  perCase[d.caseID].total++;
  perCase[d.caseID][d.sev] = (perCase[d.caseID][d.sev] || 0) + 1;
}

console.log("─".repeat(70));
console.log("Per-case defect counts:");
for (const cid of Object.keys(perCase).sort()) {
  const x = perCase[cid];
  console.log(`  ${cid.padEnd(10)}  total=${String(x.total).padStart(3)}  C=${x.Critical||0} H=${x.High||0} M=${x.Medium||0} L=${x.Low||0}`);
}

console.log("\nAUDIT-ONLY — no file mutations performed.");
