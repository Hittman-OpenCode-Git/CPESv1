/**
 * scan_logic_inversions.js — Semantic Binary Alignment Scan
 *
 * Scans all pack files for Choice text where the binary lead-in ("Yes"/"No")
 * contradicts the logical conclusion of the trailing text.
 *
 * Pattern 1: "No" + affirmative conclusion (e.g., "No, ... so it should be investigated")
 * Pattern 2: "Yes" + negative conclusion (e.g., "Yes, ... so it should not be applied")
 *
 * Output: scripts/output/logic_inversion_scan.json
 */

const path = require("path");
const fs = require("fs");
const { parsePack, SEVERITY } = require("./lib/pack_parser");

// ── Regex patterns ─────────────────────────────────────────────

const PATTERN_NO_AFFIRMATIVE = /^No,.*\b(should be investigated|should be accepted|should be selected|should be applied|should be used|must be applied|must be used|is correct|is appropriate|is warranted|is required|will be investigated|would be investigated|so it should be|therefore it is|therefore it should|thus it is|thus it should|hence it is|hence it should)\b/i;

const PATTERN_YES_NEGATIVE = /^Yes,.*\b(should not|shouldn't|is not\b|isn't|would not|wouldn't|cannot|must not|is incorrect|is inappropriate|is not correct|is not appropriate|is not warranted|should not be|it should not|therefore it is not|thus it is not|hence it is not)\b/i;

// ── Object extraction (Migration 2: canonical parser) ────────────
// Legacy raw-text brace-scan replaced by scripts/lib/pack_parser.js —
// string-aware per-object parsing with zero-silent-drop accounting.
// Malformed regions surface as loud errors instead of silent omissions.

function extractObjectsFromText(text, sourceName, errorSink) {
  const parsed = parsePack(text, { sourceName: sourceName || "(input)" });
  const banks = parsed.banks.filter(b => /^MCQ_BANK_/.test(b.name)).map(b => b.name);
  if (banks.length === 0) return [];
  const bankSet = new Set(banks);
  for (const d of parsed.diagnostics) {
    if (d.bank && !bankSet.has(d.bank)) continue;
    const line = `[${sourceName}] ${d.code} @line ${d.line}: ${d.message}`;
    if (d.severity === SEVERITY.ERROR) {
      if (errorSink) errorSink.errors.push(line);
      else console.error(line);
    } else {
      if (errorSink) errorSink.warnings.push(line);
      else console.warn(line);
    }
  }
  return parsed.records
    .filter(r => bankSet.has(r.bank))
    .map(r => r.object);
}

// ── Detection ──────────────────────────────────────────────────

function detectLogicInversions(item) {
  const inversions = [];
  const qid = item.QuestionID || "(unknown)";
  const choices = item.Choices;

  if (!choices || typeof choices !== "object") return inversions;

  for (const [letter, text] of Object.entries(choices)) {
    if (typeof text !== "string" || text.length === 0) continue;

    if (PATTERN_NO_AFFIRMATIVE.test(text)) {
      inversions.push({
        qid,
        choice: letter,
        pattern: "PATTERN_1_No_Affirmative",
        text: text.substring(0, 150)
      });
    }
    if (PATTERN_YES_NEGATIVE.test(text)) {
      inversions.push({
        qid,
        choice: letter,
        pattern: "PATTERN_2_Yes_Negative",
        text: text.substring(0, 150)
      });
    }
  }

  return inversions;
}

// ── Main scan ──────────────────────────────────────────────────

const packFiles = [
  { name: "content/packs/pack_a_corrected.js", varName: "MCQ_BANK_A" },
  { name: "content/packs/pack_b_corrected.js", varName: "MCQ_BANK_B" },
  { name: "content/packs/pack_c_corrected.js", varName: "MCQ_BANK_C" },
  { name: "content/packs/pack_d_corrected.js", varName: "MCQ_BANK_D" },
  { name: "content/packs/pack_e_corrected.js", varName: "MCQ_BANK_E" },
  { name: "content/cases/legacy/scored_cases.js", varName: "SCORED_CASES" },
];

const results = {
  scannedAt: new Date().toISOString(),
  totalItems: 0,
  totalInversions: 0,
  packResults: {},
  allInversions: []
};

for (const { name, varName } of packFiles) {
  const filePath = path.resolve(__dirname, "..", name);
  if (!fs.existsSync(filePath)) {
    results.packResults[name] = { error: "File not found", itemsScanned: 0, inversions: 0, hits: [] };
    continue;
  }

  try {
    const rawText = fs.readFileSync(filePath, "utf-8");
    const errorSink = { errors: [], warnings: [] };
    const objects = extractObjectsFromText(rawText, name, errorSink);

    const hits = [];
    for (const obj of objects) {
      const inversions = detectLogicInversions(obj);
      if (inversions.length > 0) {
        hits.push(...inversions);
      }
    }

    results.packResults[name] = {
      itemsScanned: objects.length,
      inversions: hits.length,
      hits,
      parseErrors: errorSink.errors,
      parseWarnings: errorSink.warnings
    };
    results.totalItems += objects.length;
    results.totalInversions += hits.length;
    results.allInversions.push(...hits);

  } catch (e) {
    results.packResults[name] = { error: e.message, itemsScanned: 0, inversions: 0, hits: [] };
  }
}

// ── Summary ────────────────────────────────────────────────────

results.summary = results.totalInversions === 0
  ? "CLEAN — No logic inversion mismatches found across any pack."
  : `FOUND ${results.totalInversions} logic inversion(s) — see allInversions for details.`;

// ── Output ─────────────────────────────────────────────────────

const outputDir = path.resolve(__dirname, "output");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const outputPath = path.join(outputDir, "logic_inversion_scan.json");
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), "utf-8");

console.log(JSON.stringify({
  summary: results.summary,
  totalItems: results.totalItems,
  totalInversions: results.totalInversions,
  perPack: Object.fromEntries(
    Object.entries(results.packResults).map(([k, v]) => [k, { itemsScanned: v.itemsScanned, inversions: v.inversions }])
  )
}, null, 2));

if (results.totalInversions > 0) {
  console.log("\n--- HITS ---");
  results.allInversions.forEach(h => console.log(`  ${h.qid} [${h.choice}] ${h.pattern}: ${h.text}`));
}
