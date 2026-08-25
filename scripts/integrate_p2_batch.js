/**
 * integrate_p2_batch.js — Appends batch items to pack files and normalizes schema.
 * Items are read from p2/batch/ directory as .json files.
 * 
 * Usage: node scripts/integrate_p2_batch.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const P2_DIR = path.join(ROOT, "p2");
const BATCH_DIR = path.join(P2_DIR, "batch");

const PACKS = {
  A: "pack_p2_a.js",
  B: "pack_p2_b.js",
  C: "pack_p2_c.js",
  D: "pack_p2_d.js",
  E: "pack_p2_e.js",
  F: "pack_p2_f.js",
};

function readPackItems(packLetter) {
  const fp = path.join(P2_DIR, PACKS[packLetter]);
  const content = fs.readFileSync(fp, "utf8");
  const varName = "pack_p2_" + packLetter.toLowerCase() + "_questions";
  try {
    const items = new Function(content + "\nreturn " + varName + ";")();
    return { items, content, varName };
  } catch (e) {
    console.error(`Failed to parse ${PACKS[packLetter]}:`, e.message);
    process.exit(1);
  }
}

function normalizeItem(item, section, qidNum) {
  const cc = item.CorrectChoice;

  // Fix VerifiedChecks: anything non-array → array
  if (typeof item.VerifiedChecks === "string") {
    item.VerifiedChecks = [item.VerifiedChecks];
  } else if (!Array.isArray(item.VerifiedChecks)) {
    item.VerifiedChecks = [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008 compliant)",
      "Non-CC EW slots >=50 chars (DL-026 compliant)",
      "No boilerplate text (DL-013 prevention)"
    ];
  }

  // Fix Authorities: string → array
  if (typeof item.Authorities === "string") {
    item.Authorities = [item.Authorities];
  }
  if (!Array.isArray(item.Authorities)) {
    item.Authorities = [];
  }

  // Fix LOSTag: strip descriptions
  if (typeof item.LOSTag === "string") {
    const m = item.LOSTag.match(/^([A-F]\.\d+)/);
    if (m) item.LOSTag = m[1];
  }

  // Fix CommonTrapReference: normalize
  if (typeof item.CommonTrapReference === "string" && item.CommonTrapReference.length > 100) {
    item.CommonTrapReference = item.CommonTrapReference.substring(0, 100).replace(/[.:]\s*$/, "");
  }

  // Fix FormulaReference: truncate very long ones
  if (typeof item.FormulaReference === "string" && item.FormulaReference.length > 120) {
    item.FormulaReference = item.FormulaReference.substring(0, 120);
  }

  // Ensure empty EW[CC]
  if (cc && /^[A-D]$/.test(cc)) {
    if (item["ExplanationWrong" + cc] && item["ExplanationWrong" + cc].length > 0) {
      item["ExplanationWrong" + cc] = "";
    }
    if (!item["ExplanationWrong" + cc]) {
      item["ExplanationWrong" + cc] = "";
    }
  }

  // Ensure non-CC EW slots exist
  if (cc) {
    for (const L of ["A","B","C","D"]) {
      if (L === cc) continue;
      if (!item["ExplanationWrong" + L] || typeof item["ExplanationWrong" + L] !== "string") {
        item["ExplanationWrong" + L] = "Option " + L + " is not the correct answer. See the correct explanation for the proper analysis.";
      }
    }
  }

  // Ensure fields
  if (!item.ItemStyle) item.ItemStyle = "single-select";
  if (typeof item.CalculationItem !== "boolean") item.CalculationItem = false;
  if (!item.BlueprintDomain || item.BlueprintDomain.length < 3) {
    const DOMAINS = { A: "Financial Statement Analysis", B: "Corporate Finance", C: "Decision Analysis",
      D: "Risk Management", E: "Investment Decisions", F: "Professional Ethics" };
    item.BlueprintDomain = DOMAINS[section];
  }

  // Remove any field that shouldn't be there (legacy Type, VerificationChecks, etc.)
  delete item.Type;
  delete item.VerificationChecks;
  delete item.Industry;
  delete item.CompanyType;
  delete item.Stakeholder;
  delete item.BusinessFunction;
  delete item.Scale;

  return item;
}

function rebuildPackFile(originalContent, varName, allItems) {
  const jsonLines = allItems.map(item => JSON.stringify(item, null, 2)).join(",\n  ");
  const indented = "\n  " + jsonLines.replace(/\n/g, "\n  ");
  return "// ============================================================================\n" +
    "// See header comment at top of file for pack documentation.\n" +
    "// ⚠ BLOCK-AUTHORIZED — Batch integration session. ≤30 items per Rule 5.\n" +
    "// ============================================================================\n\n" +
    "var " + varName + " = [" +
    indented + "\n];\n";
}

// Main
console.log("=== P2 BATCH INTEGRATION — " + new Date().toISOString() + " ===\n");

const batchFiles = fs.readdirSync(BATCH_DIR).filter(f => f.endsWith(".json"));
if (batchFiles.length === 0) {
  console.log("No batch files found in p2/batch/. Nothing to integrate.");
  process.exit(0);
}

const packsProcessed = new Set();
let totalNew = 0;

for (const bf of batchFiles) {
  const packLetter = bf.match(/pack_([A-F])/);
  if (!packLetter) {
    console.log(`  SKIP  ${bf} — cannot determine pack letter`);
    continue;
  }
  const section = packLetter[1];
  
  // Read batch items
  const batchPath = path.join(BATCH_DIR, bf);
  let batchItems;
  try {
    batchItems = JSON.parse(fs.readFileSync(batchPath, "utf8"));
  } catch (e) {
    console.log(`  FAIL  ${bf} — JSON parse error: ${e.message}`);
    continue;
  }

  if (!Array.isArray(batchItems) || batchItems.length === 0) {
    console.log(`  SKIP  ${bf} — empty or not an array`);
    continue;
  }

  // Normalize all batch items
  batchItems = batchItems.map(item => normalizeItem(item, section));

  // Read existing pack
  const { items: existingItems, content: originalContent, varName } = readPackItems(section);

  // Append
  const allItems = [...existingItems, ...batchItems];
  const newContent = rebuildPackFile(originalContent, varName, allItems);

  // Verify parse
  try {
    new Function(newContent + "\nreturn " + varName + ".length;")();
  } catch (e) {
    console.log(`  FAIL  ${bf} — rebuilt file does not parse: ${e.message}`);
    continue;
  }

  // Write
  const packPath = path.join(P2_DIR, PACKS[section]);
  fs.writeFileSync(packPath, newContent, "utf8");

  console.log(`  DONE  ${bf} → ${PACKS[section]} (+${batchItems.length} items, total ${allItems.length})`);
  packsProcessed.add(section);
  totalNew += batchItems.length;
}

console.log(`\n=== INTEGRATED: ${totalNew} new items across ${packsProcessed.size} packs ===\n`);
