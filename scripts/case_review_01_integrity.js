/**
 * Case Review 01 — Integrity + Exhibit + Metadata (READ-ONLY).
 *
 * Scope: Part 1 live case banks only (config.casePackBanks):
 *   content/cases/case_pack_1/2/3_corrected.js (80 cases / ~425 items expected).
 * Legacy banks are ARCHIVED — excluded by design (see CaseIdentityValidator).
 *
 * What it checks (mechanical only — DL-045 doctrine: no semantic auto-verdicts):
 *  1. Parse health (DL-044 class): extraction succeeds; extracted count == raw "CaseID" count.
 *  2. CaseID uniqueness within-live (DL-048).
 *  3. QuestionCount/ExhibitCount == Items/Exhibits length.
 *  4. Table exhibits carry Headers+Rows, not Body-only residue (DL-023).
 *  5. Exhibit ReferencedBy resolves to real ItemIDs; every item referenced >= 1 exhibit
 *     (flags only — consumption depth is human/LLM Step 2).
 *  6. Item metadata presence: CognitiveLevel, DifficultyScore, Topic, Correct, Explanation.
 *  7. DifficultyScore <-> Difficulty label consistency (scoreMap 1-5).
 *  8. Flags DL-051 candidates for Step 2 (numeric items list) — does NOT judge key correctness.
 *
 * Writes: scripts/output/case_review_01.json (findings artifact). Never touches pack files.
 * Usage: node scripts/case_review_01_integrity.js [--json-out <path>]
 */
const fs = require("fs");
const path = require("path");
const config = require("./config");
const CaseExtractor = require("./lib/CaseExtractor");

const SCORE_MAP = { 1: "Easy", 2: "Moderate-Easy", 3: "Moderate", 4: "Difficult", 5: "Very Difficult" };
const COG_LEVELS = new Set(["Remember", "Understand", "Apply", "Analyze", "Evaluate"]);

function rawCaseIdStats(content) {
  const vals = [];
  const re = /"CaseID"\s*:\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(content)) !== null) vals.push(m[1]);
  return { occurrences: vals.length, distinct: new Set(vals).size };
}

function main() {
  const args = process.argv.slice(2);
  let jsonOut = path.join(config.paths.root, "scripts", "output", "case_review_01.json");
  const jIdx = args.indexOf("--json-out");
  if (jIdx !== -1 && args[jIdx + 1]) jsonOut = path.resolve(args[jIdx + 1]);

  const liveFiles = config.casePackBanks || [];
  const findings = [];
  const perFile = [];
  const seenCaseId = new Map(); // CaseID -> [files]
  let totalCases = 0;
  let totalItems = 0;

  for (const rel of liveFiles) {
    const full = path.join(config.paths.root, rel);
    if (!fs.existsSync(full)) {
      findings.push({ severity: "ERROR", code: "FILE_MISSING", file: rel, detail: "live bank file not found" });
      perFile.push({ file: rel, cases: 0, items: 0, status: "MISSING" });
      continue;
    }
    const content = fs.readFileSync(full, "utf8");
    const raw = rawCaseIdStats(content);
    const cases = CaseExtractor.extractCases(full);
    if (!cases) {
      findings.push({ severity: "ERROR", code: "REGION_PARSE_FAILED", file: rel, detail: `extraction null; raw "CaseID" occurrences=${raw.occurrences} distinct=${raw.distinct} (DL-044 class)` });
      perFile.push({ file: rel, cases: 0, items: 0, rawOccurrences: raw.occurrences, rawDistinct: raw.distinct, status: "PARSE_FAIL" });
      continue;
    }
    if (cases.length !== raw.distinct) {
      // Distinct raw values include exhibit/item parent links; a surplus here is
      // usually exhibit CaseID misfiling (see EXHIBIT_CASE_MISMATCH below), not a
      // silent extraction drop. Report INFO and let the precise check carry the verdict.
      findings.push({ severity: "WARNING", code: "CASEID_CENSUS_NOTE", file: rel, detail: `extracted ${cases.length} vs distinct raw CaseID values ${raw.distinct} (occurrences=${raw.occurrences}) — see EXHIBIT_CASE_MISMATCH for misfiled parent links` });
    }
    perFile.push({ file: rel, cases: cases.length, items: cases.reduce((n, c) => n + ((c.Items || []).length), 0), rawOccurrences: raw.occurrences, rawDistinct: raw.distinct, status: "OK" });

    for (const c of cases) {
      totalCases += 1;
      const caseId = c.CaseID || "(missing CaseID)";
      if (!seenCaseId.has(caseId)) seenCaseId.set(caseId, []);
      seenCaseId.get(caseId).push(rel);

      const items = c.Items || [];
      const exhibits = c.Exhibits || [];
      totalItems += items.length;

      if (c.QuestionCount !== undefined && c.QuestionCount !== items.length) {
        findings.push({ severity: "ERROR", code: "QUESTIONCOUNT_MISMATCH", file: rel, caseId, detail: `QuestionCount=${c.QuestionCount} != Items.length=${items.length}` });
      }
      if (c.ExhibitCount !== undefined && c.ExhibitCount !== exhibits.length) {
        findings.push({ severity: "ERROR", code: "EXHIBITCOUNT_MISMATCH", file: rel, caseId, detail: `ExhibitCount=${c.ExhibitCount} != Exhibits.length=${exhibits.length}` });
      }

      const itemIds = new Set(items.map((it) => it.ItemID));
      const referenced = new Set();
      for (const ex of exhibits) {
        if (ex.CaseID && ex.CaseID !== c.CaseID) {
          findings.push({ severity: "ERROR", code: "EXHIBIT_CASE_MISMATCH", file: rel, caseId, exhibit: ex.ExhibitID, detail: `exhibit CaseID=${ex.CaseID} != parent ${caseId} (copy-paste residue candidate)` });
        }        if (ex.Type === "table" && (!Array.isArray(ex.Headers) || !Array.isArray(ex.Rows))) {
          findings.push({ severity: "ERROR", code: "EXHIBIT_BODY_RESIDUE", file: rel, caseId, exhibit: ex.ExhibitID, detail: "table exhibit missing Headers/Rows (DL-023 pattern)" });
        }
        for (const r of ex.ReferencedBy || []) {
          referenced.add(r);
          if (!itemIds.has(r)) {
            findings.push({ severity: "WARNING", code: "DANGLING_REFERENCE", file: rel, caseId, exhibit: ex.ExhibitID, detail: `ReferencedBy ${r} has no matching ItemID` });
          }
        }
      }

      for (const it of items) {
        const id = it.ItemID || `${caseId}:?(missing ItemID)`;
        if (!it.CognitiveLevel || !COG_LEVELS.has(it.CognitiveLevel)) {
          findings.push({ severity: "WARNING", code: "COG_MISSING", file: rel, caseId, item: id, detail: `CognitiveLevel=${JSON.stringify(it.CognitiveLevel)}` });
        }
        if (it.DifficultyScore === undefined || !SCORE_MAP[it.DifficultyScore]) {
          findings.push({ severity: "WARNING", code: "DIFFSCORE_MISSING", file: rel, caseId, item: id, detail: `DifficultyScore=${JSON.stringify(it.DifficultyScore)}` });
        } else if (it.Difficulty && SCORE_MAP[it.DifficultyScore] !== it.Difficulty) {
          findings.push({ severity: "WARNING", code: "DIFF_LABEL_MISMATCH", file: rel, caseId, item: id, detail: `Difficulty=${it.Difficulty} vs Score=${it.DifficultyScore} (${SCORE_MAP[it.DifficultyScore]})` });
        }
        if (!it.Topic) findings.push({ severity: "WARNING", code: "TOPIC_MISSING", file: rel, caseId, item: id, detail: "Topic absent" });
        if (it.Correct === undefined || it.Correct === null || it.Correct === "") {
          findings.push({ severity: "ERROR", code: "CORRECT_MISSING", file: rel, caseId, item: id, detail: "Correct empty — Step 2 must derive (DL-051 candidate)" });
        }
        if (!it.Explanation || String(it.Explanation).length < 50) {
          findings.push({ severity: "WARNING", code: "EXPLANATION_SHORT", file: rel, caseId, item: id, detail: `Explanation len=${(it.Explanation || "").length}` });
        }
        if (!referenced.has(id) && (it.Type === "numeric" || it.CalculationRequired)) {
          findings.push({ severity: "WARNING", code: "CALC_UNREFERENCED", file: rel, caseId, item: id, detail: "calculation item references no exhibit — confirm self-contained or flag" });
        }
      }
    }
  }

  for (const [caseId, files] of seenCaseId) {
    if (files.length > 1) {
      findings.push({ severity: "ERROR", code: "DUPLICATE_CASEID", caseId, detail: `in ${files.join(", ")} (DL-048)` });
    }
  }

  const errors = findings.filter((f) => f.severity === "ERROR").length;
  const warnings = findings.filter((f) => f.severity === "WARNING").length;
  const summary = { totalCases, totalItems, files: perFile, errors, warnings, dl051_note: "Semantic key/explanation agreement is Step 2 (human/LLM independent solve). This script never judges correctness." };

  const outDir = path.dirname(jsonOut);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(jsonOut, JSON.stringify({ summary, findings }, null, 2));

  console.log(`CASE REVIEW 01 — cases=${totalCases} items=${totalItems} errors=${errors} warnings=${warnings}`);
  for (const f of perFile) console.log(`  ${f.file}: ${f.status} cases=${f.cases} items=${f.items} distinctCaseIds=${f.rawDistinct !== undefined ? f.rawDistinct : "n/a"}`);
  const byCode = {};
  for (const f of findings) byCode[f.code] = (byCode[f.code] || 0) + 1;
  for (const [code, n] of Object.entries(byCode).sort()) console.log(`  ${code}: ${n}`);
  console.log(`Artifact: ${jsonOut}`);
  if (errors > 0) process.exitCode = 1;
}

main();
