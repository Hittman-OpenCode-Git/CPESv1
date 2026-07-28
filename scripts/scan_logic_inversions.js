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

// ── Regex patterns ─────────────────────────────────────────────

const PATTERN_NO_AFFIRMATIVE = /^No,.*\b(should be investigated|should be accepted|should be selected|should be applied|should be used|must be applied|must be used|is correct|is appropriate|is warranted|is required|will be investigated|would be investigated|so it should be|therefore it is|therefore it should|thus it is|thus it should|hence it is|hence it should)\b/i;

const PATTERN_YES_NEGATIVE = /^Yes,.*\b(should not|shouldn't|is not\b|isn't|would not|wouldn't|cannot|must not|is incorrect|is inappropriate|is not correct|is not appropriate|is not warranted|should not be|it should not|therefore it is not|thus it is not|hence it is not)\b/i;

// ── Object extraction (same as governance guard) ────────────────

function extractObjectsFromText(text) {
  const objects = [];
  let pos = 0;
  while (pos < text.length) {
    const objStart = text.indexOf('{', pos);
    if (objStart === -1) break;
    let depth = 1;
    let i = objStart + 1;
    let inString = false, stringChar = '', escape = false;
    while (depth > 0 && i < text.length) {
      const ch = text[i];
      if (escape) { escape = false; i++; continue; }
      if (inString) {
        if (ch === '\\') { escape = true; }
        else if (ch === stringChar) { inString = false; stringChar = ''; }
        i++; continue;
      }
      if (ch === '"' || ch === "'") { inString = true; stringChar = ch; i++; continue; }
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      i++;
    }
    if (depth !== 0) break;
    const objText = text.substring(objStart, i);
    let obj = null;
    try { obj = JSON.parse(objText); } catch (e) {
      try { obj = new Function('return (' + objText + ')')(); } catch (e2) {}
    }
    if (obj && typeof obj === 'object' && !Array.isArray(obj) && obj.Choices) {
      objects.push(obj);
    }
    pos = i;
  }
  return objects;
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
  { name: "pack_a_corrected.js", varName: "MCQ_BANK_A" },
  { name: "pack_b_corrected.js", varName: "MCQ_BANK_B" },
  { name: "pack_c_corrected.js", varName: "MCQ_BANK_C" },
  { name: "pack_d_corrected.js", varName: "MCQ_BANK_D" },
  { name: "pack_e_corrected.js", varName: "MCQ_BANK_E" },
  { name: "scored_cases.js", varName: "SCORED_CASES" },
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
    const objects = extractObjectsFromText(rawText);

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
      hits
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
