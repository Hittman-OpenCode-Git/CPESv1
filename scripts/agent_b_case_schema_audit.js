// Agent B: Case Schema & Metadata Audit (Session 61)
// READ-ONLY — no file writes
"use strict";

const fs = require("fs");
const path = require("path");

const files = [
  "content/cases/legacy/scored_cases.js",
  "content/cases/legacy/scored_cases2.js",
  "content/cases/legacy/scored_cases3.js",
  "content/cases/legacy/scored_cases4.js",
  "content/cases/legacy/scored_cases5.js"
];

const baseDir = path.resolve(__dirname, "..");

// Load a file via new Function() — returns all exported arrays
function loadCaseFile(filename) {
  const fullPath = path.join(baseDir, filename);
  const src = fs.readFileSync(fullPath, "utf-8");

  // Wrap in an IIFE that captures all const variables into a returned object
  const wrapped = `
    return (function() {
      ${src}
      return {
        ENHANCED_CASE_BASE: typeof ENHANCED_CASE_BASE !== 'undefined' ? ENHANCED_CASE_BASE : undefined,
        ENHANCED_CASE_BASE2: typeof ENHANCED_CASE_BASE2 !== 'undefined' ? ENHANCED_CASE_BASE2 : undefined,
        ENHANCED_CASE_BASE3: typeof ENHANCED_CASE_BASE3 !== 'undefined' ? ENHANCED_CASE_BASE3 : undefined,
        ENHANCED_CASE_BASE4: typeof ENHANCED_CASE_BASE4 !== 'undefined' ? ENHANCED_CASE_BASE4 : undefined,
        ENHANCED_CASE_BASE5: typeof ENHANCED_CASE_BASE5 !== 'undefined' ? ENHANCED_CASE_BASE5 : undefined,
        MIGRATED_CASE_BASE_A: typeof MIGRATED_CASE_BASE_A !== 'undefined' ? MIGRATED_CASE_BASE_A : undefined,
        MIGRATED_CASE_BASE_B: typeof MIGRATED_CASE_BASE_B !== 'undefined' ? MIGRATED_CASE_BASE_B : undefined,
        MIGRATED_CASE_BASE_C: typeof MIGRATED_CASE_BASE_C !== 'undefined' ? MIGRATED_CASE_BASE_C : undefined,
        MIGRATED_CASE_BASE_D: typeof MIGRATED_CASE_BASE_D !== 'undefined' ? MIGRATED_CASE_BASE_D : undefined,
        ENHANCED_CASE_BANK_A: typeof ENHANCED_CASE_BANK_A !== 'undefined' ? ENHANCED_CASE_BANK_A : undefined,
        ENHANCED_CASE_BANK_B: typeof ENHANCED_CASE_BANK_B !== 'undefined' ? ENHANCED_CASE_BANK_B : undefined,
        ENHANCED_CASE_BANK_C: typeof ENHANCED_CASE_BANK_C !== 'undefined' ? ENHANCED_CASE_BANK_C : undefined,
        ENHANCED_CASE_BANK_D: typeof ENHANCED_CASE_BANK_D !== 'undefined' ? ENHANCED_CASE_BANK_D : undefined,
        ENHANCED_CASE_BANK_E: typeof ENHANCED_CASE_BANK_E !== 'undefined' ? ENHANCED_CASE_BANK_E : undefined,
        ENHANCED_CASE_BANK5_A: typeof ENHANCED_CASE_BANK5_A !== 'undefined' ? ENHANCED_CASE_BANK5_A : undefined,
        ENHANCED_CASE_BANK5_B: typeof ENHANCED_CASE_BANK5_B !== 'undefined' ? ENHANCED_CASE_BANK5_B : undefined,
        ENHANCED_CASE_BANK5_C: typeof ENHANCED_CASE_BANK5_C !== 'undefined' ? ENHANCED_CASE_BANK5_C : undefined,
        ENHANCED_CASE_BANK5_D: typeof ENHANCED_CASE_BANK5_D !== 'undefined' ? ENHANCED_CASE_BANK5_D : undefined,
        ENHANCED_CASE_BANK5_E: typeof ENHANCED_CASE_BANK5_E !== 'undefined' ? ENHANCED_CASE_BANK5_E : undefined,
      };
    })()
  `;

  const result = new Function(wrapped)();
  return { filename, ...result };
}

// ---- Load all files ----
console.log("=== LOADING CASE FILES (new Function()) ===\n");
const allData = files.map(f => {
  const data = loadCaseFile(f);
  return { file: f, data };
});

// ---- Collect all unique cases ----
const allCases = []; // { file, arrayName, caseIndex, case }

for (const { file, data } of allData) {
  for (const [arrName, arr] of Object.entries(data)) {
    if (!arr || !Array.isArray(arr)) continue;
    // Skip bank arrays — those are clones
    if (arrName.startsWith("ENHANCED_CASE_BANK")) continue;
    for (let i = 0; i < arr.length; i++) {
      allCases.push({ file, arrayName: arrName, caseIndex: i, case: arr[i] });
    }
  }
}

// ---- Categorize: Enhanced (CBQ-*) vs Migrated (CASE-*) ----
const enhanced = allCases.filter(e => e.case.CaseID && e.case.CaseID.startsWith("CBQ"));
const migrated = allCases.filter(e => e.case.CaseID && e.case.CaseID.startsWith("CASE"));
const unknown = allCases.filter(e => !e.case.CaseID || (!e.case.CaseID.startsWith("CBQ") && !e.case.CaseID.startsWith("CASE")));

console.log(`Total cases loaded: ${allCases.length}`);
console.log(`  Enhanced (CBQ-*): ${enhanced.length}`);
console.log(`  Migrated (CASE-*): ${migrated.length}`);
if (unknown.length) console.log(`  Unknown prefix: ${unknown.length}`);

// ---- PART 1: Extract and categorize all cases ----
console.log("\n\n========================================");
console.log("PART 1: CASE INVENTORY BY FILE");
console.log("========================================");

for (const { file, data } of allData) {
  const enhancedArrs = Object.entries(data)
    .filter(([k, v]) => Array.isArray(v) && k.startsWith("ENHANCED_CASE_BASE") && !k.includes("BANK"))
    .map(([k, v]) => [k, v.length]);

  const migratedArrs = Object.entries(data)
    .filter(([k, v]) => Array.isArray(v) && k.startsWith("MIGRATED_CASE_BASE"))
    .map(([k, v]) => [k, v.length]);

  const fileEnhanced = enhanced.filter(e => e.file === file);
  const fileMigrated = migrated.filter(e => e.file === file);

  console.log(`\n--- ${file} ---`);
  console.log(`  Base arrays:`);
  for (const [name, len] of enhancedArrs) console.log(`    ${name}: ${len} cases`);
  for (const [name, len] of migratedArrs) console.log(`    ${name}: ${len} cases`);
  console.log(`  CBQ-* cases: ${fileEnhanced.length}`);
  console.log(`  CASE-* cases: ${fileMigrated.length}`);

  if (fileEnhanced.length > 0) {
    const ids = fileEnhanced.slice(0, 3).map(e => e.case.CaseID).join(", ");
    const qCounts = fileEnhanced.map(e => e.case.QuestionCount || (e.case.Items || []).length);
    console.log(`  CBQ IDs (first 3): ${ids}...`);
    console.log(`  CBQ QuestionCount range: ${Math.min(...qCounts)}-${Math.max(...qCounts)}`);
    console.log(`  ProductionStatus values: ${[...new Set(fileEnhanced.map(e => e.case.ProductionStatus || "MISSING"))].join(", ")}`);
    console.log(`  DifficultyScore values: ${[...new Set(fileEnhanced.map(e => e.case.DifficultyScore || "MISSING"))].join(", ")}`);
  }
  if (fileMigrated.length > 0) {
    const ids = fileMigrated.slice(0, 3).map(e => e.case.CaseID).join(", ");
    const qCounts = fileMigrated.map(e => e.case.QuestionCount || (e.case.Items || []).length);
    console.log(`  CASE IDs (first 3): ${ids}...`);
    console.log(`  CASE QuestionCount range: ${Math.min(...qCounts)}-${Math.max(...qCounts)}`);
    console.log(`  CASE question_state values: ${[...new Set(fileMigrated.flatMap(e => (e.case.Items || []).map(it => it.question_state || "MISSING")))].join(", ")}`);
  }
}

// ---- PART 2: Scoring Metadata Completeness ----
console.log("\n\n========================================");
console.log("PART 2: SCORING METADATA COMPLETENESS CHECK");
console.log("========================================");

let casesWithNoItems = 0;
let itemsWithNoCorrect = 0;
let itemsWithNoType = 0;
let casesMissingItems = [];
let itemsMissingCorrect = [];

const typeDist = {}; // type -> count
const correctFormats = {}; // format -> count
let totalItems = 0;

for (const entry of allCases) {
  const c = entry.case;
  const items = c.Items || [];
  if (items.length === 0) {
    casesWithNoItems++;
    casesMissingItems.push(`${entry.file}::${c.CaseID || "NO-CaseID"}`);
    continue;
  }
  totalItems += items.length;

  for (const item of items) {
    // Type
    const t = item.Type || "MISSING";
    typeDist[t] = (typeDist[t] || 0) + 1;
    if (!item.Type) itemsWithNoType++;

    // Correct
    if (item.Correct === undefined || item.Correct === null) {
      itemsWithNoCorrect++;
      itemsMissingCorrect.push(`${entry.file}::${c.CaseID}::${item.Prompt ? item.Prompt.substring(0, 40) : "NO-PROMPT"}`);
      continue;
    }

    // Correct format
    let fmt;
    if (Array.isArray(item.Correct)) fmt = "array";
    else if (typeof item.Correct === "object") fmt = "object";
    else if (typeof item.Correct === "string") fmt = "string";
    else if (typeof item.Correct === "number") fmt = "number";
    else fmt = typeof item.Correct;
    correctFormats[fmt] = (correctFormats[fmt] || 0) + 1;
  }
}

console.log(`\nTotal items across all cases: ${totalItems}`);
console.log(`Cases with NO items: ${casesWithNoItems}`);
if (casesMissingItems.length) {
  console.log(`  Missing: ${casesMissingItems.join(", ")}`);
}
console.log(`Items with NO Correct field: ${itemsWithNoCorrect}`);
if (itemsMissingCorrect.length && itemsMissingCorrect.length <= 20) {
  for (const m of itemsMissingCorrect) console.log(`  ${m}`);
}
console.log(`Items with NO Type field: ${itemsWithNoType}`);

console.log(`\nType distribution:`);
for (const [t, cnt] of Object.entries(typeDist).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${t}: ${cnt} (${(cnt / totalItems * 100).toFixed(1)}%)`);
}

console.log(`\nCorrect field format distribution:`);
for (const [fmt, cnt] of Object.entries(correctFormats).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${fmt}: ${cnt} (${(cnt / totalItems * 100).toFixed(1)}%)`);
}

// ---- Per-case item counts ----
console.log(`\nPer-case item counts (all files):`);
for (const { file, data } of allData) {
  for (const [arrName, arr] of Object.entries(data)) {
    if (!arr || !Array.isArray(arr)) continue;
    if (arrName.startsWith("ENHANCED_CASE_BANK")) continue;
    const itemCounts = arr.map(c => (c.Items || []).length);
    const unique = [...new Set(itemCounts)].sort((a, b) => a - b);
    const casesInArr = arr.filter(c => c.CaseID).map(c => c.CaseID);
    console.log(`  ${file} > ${arrName} (${arr.length} cases): items per case = [${unique.join(", ")}]`);
    console.log(`    Sample IDs: ${casesInArr.slice(0, 3).join(", ")}${casesInArr.length > 3 ? "..." : ""}`);
  }
}

// ---- PART 3: Scoring Compatibility — Enhanced vs Migrated ----
console.log("\n\n========================================");
console.log("PART 3: ENHANCED vs MIGRATED CASE SCORING COMPATIBILITY");
console.log("========================================");

// Enhanced cases: analyze item schemas
console.log("\n--- Enhanced Cases (CBQ-*) Item Schema Analysis ---");
const enhancedItems = enhanced.flatMap(e => (e.case.Items || []).map(it => ({ ...it, _caseId: e.case.CaseID })));

const enhTypeDist = {};
const enhCorrectFmt = {};
for (const it of enhancedItems) {
  enhTypeDist[it.Type || "MISSING"] = (enhTypeDist[it.Type || "MISSING"] || 0) + 1;
  let fmt;
  if (Array.isArray(it.Correct)) fmt = "array";
  else if (typeof it.Correct === "object" && it.Correct !== null) fmt = "object";
  else if (typeof it.Correct === "string") fmt = "string";
  else if (typeof it.Correct === "number") fmt = "number";
  else fmt = typeof it.Correct;
  enhCorrectFmt[fmt] = (enhCorrectFmt[fmt] || 0) + 1;
}

console.log(`  Total enhanced items: ${enhancedItems.length}`);
console.log(`  Type distribution: ${JSON.stringify(enhTypeDist)}`);
console.log(`  Correct format: ${JSON.stringify(enhCorrectFmt)}`);

// Check for additional fields on enhanced items
const enhFields = new Set();
for (const it of enhancedItems.slice(0, 50)) {
  for (const k of Object.keys(it).filter(k => !k.startsWith("_"))) {
    enhFields.add(k);
  }
}
console.log(`  Fields on enhanced items (sample): ${[...enhFields].sort().join(", ")}`);

// Migrated cases: analyze item schemas
console.log("\n--- Migrated Cases (CASE-*) Item Schema Analysis ---");
const migratedItems = migrated.flatMap(e => (e.case.Items || []).map(it => ({ ...it, _caseId: e.case.CaseID })));

const migTypeDist = {};
const migCorrectFmt = {};
for (const it of migratedItems) {
  migTypeDist[it.Type || "MISSING"] = (migTypeDist[it.Type || "MISSING"] || 0) + 1;
  let fmt;
  if (Array.isArray(it.Correct)) fmt = "array";
  else if (typeof it.Correct === "object" && it.Correct !== null) fmt = "object";
  else if (typeof it.Correct === "string") fmt = "string";
  else if (typeof it.Correct === "number") fmt = "number";
  else fmt = typeof it.Correct;
  migCorrectFmt[fmt] = (migCorrectFmt[fmt] || 0) + 1;
}

console.log(`  Total migrated items: ${migratedItems.length}`);
console.log(`  Type distribution: ${JSON.stringify(migTypeDist)}`);
console.log(`  Correct format: ${JSON.stringify(migCorrectFmt)}`);

const migFields = new Set();
for (const it of migratedItems.slice(0, 50)) {
  for (const k of Object.keys(it).filter(k => !k.startsWith("_"))) {
    migFields.add(k);
  }
}
console.log(`  Fields on migrated items (sample): ${[...migFields].sort().join(", ")}`);

// Structural differences
console.log(`\n--- Structural Differences ---`);
const enhOnly = [...enhFields].filter(f => !migFields.has(f));
const migOnly = [...migFields].filter(f => !enhFields.has(f));
const shared = [...enhFields].filter(f => migFields.has(f));

console.log(`  Fields in enhanced only: ${enhOnly.length > 0 ? enhOnly.join(", ") : "(none)"}`);
console.log(`  Fields in migrated only: ${migOnly.length > 0 ? migOnly.join(", ") : "(none)"}`);
console.log(`  Fields shared by both: ${shared.length} fields`);

// Detailed check: do enhanced items have fields migrated don't and vice versa
// Check for question_state differences
const enhHasQS = enhancedItems.filter(it => it.question_state !== undefined).length;
const migHasQS = migratedItems.filter(it => it.question_state !== undefined).length;
console.log(`\n  Items with question_state: Enhanced=${enhHasQS}/${enhancedItems.length}, Migrated=${migHasQS}/${migratedItems.length}`);

// Check for StudyLinks
const enhHasSL = enhancedItems.filter(it => it.StudyLinks !== undefined).length;
const migHasSL = migratedItems.filter(it => it.StudyLinks !== undefined).length;
console.log(`  Items with StudyLinks: Enhanced=${enhHasSL}/${enhancedItems.length}, Migrated=${migHasSL}/${migratedItems.length}`);

// Check multi-select Correct format
const enhMulti = enhancedItems.filter(it => it.Type === "multi");
const migMulti = migratedItems.filter(it => it.Type === "multi");
console.log(`\n  Multi-select items:`);
console.log(`    Enhanced: ${enhMulti.length} items`);
if (enhMulti.length > 0) {
  const fmts = {};
  enhMulti.forEach(it => {
    const f = Array.isArray(it.Correct) ? "array" : typeof it.Correct;
    fmts[f] = (fmts[f] || 0) + 1;
  });
  console.log(`      Correct format: ${JSON.stringify(fmts)}`);
}
console.log(`    Migrated: ${migMulti.length} items`);
if (migMulti.length > 0) {
  const fmts = {};
  migMulti.forEach(it => {
    const f = Array.isArray(it.Correct) ? "array" : typeof it.Correct;
    fmts[f] = (fmts[f] || 0) + 1;
  });
  console.log(`      Correct format: ${JSON.stringify(fmts)}`);
}

// Check match type
const enhMatch = enhancedItems.filter(it => it.Type === "match");
const migMatch = migratedItems.filter(it => it.Type === "match");
console.log(`\n  Match-type items:`);
console.log(`    Enhanced: ${enhMatch.length} items`);
console.log(`    Migrated: ${migMatch.length} items`);

// Check fill type
const enhFill = enhancedItems.filter(it => it.Type === "fill");
const migFill = migratedItems.filter(it => it.Type === "fill");
console.log(`\n  Fill-type items:`);
console.log(`    Enhanced: ${enhFill.length} items`);
console.log(`    Migrated: ${migFill.length} items`);

// ---- PART 4: Summary Tables ----
console.log("\n\n========================================");
console.log("PART 4: SUMMARY TABLES");
console.log("========================================");

console.log("\n### Table 1: Per-File Case & Item Summary ###");
console.log("File                | Cases | CBQ | CASE | Items | Items/Case | Types Used");
console.log("--------------------|-------|-----|------|-------|------------|----------");

for (const { file, data } of allData) {
  const fileCases = allCases.filter(e => e.file === file);
  const cbqCount = fileCases.filter(e => e.case.CaseID && e.case.CaseID.startsWith("CBQ")).length;
  const caseCount = fileCases.filter(e => e.case.CaseID && e.case.CaseID.startsWith("CASE")).length;
  const items = fileCases.flatMap(e => (e.case.Items || []));
  const itemCounts = fileCases.map(e => (e.case.Items || []).length);
  const minI = Math.min(...itemCounts);
  const maxI = Math.max(...itemCounts);
  const types = [...new Set(items.map(it => it.Type || "MISSING"))].join(", ");
  const hasCorrect = items.filter(it => it.Correct !== undefined && it.Correct !== null).length;
  const pct = items.length > 0 ? (hasCorrect / items.length * 100).toFixed(0) : "N/A";
  console.log(`${file.padEnd(20)}| ${String(fileCases.length).padEnd(5)} | ${String(cbqCount).padEnd(3)} | ${String(caseCount).padEnd(4)} | ${String(items.length).padEnd(5)} | ${minI}-${maxI}       | ${types}`);
}

console.log(`\n### Table 2: Item Type Distribution — Cross-File Comparison ###`);
console.log("Type     | scored_cases | scored_cases2 | scored_cases3 | scored_cases4 | scored_cases5 | TOTAL");
console.log("---------|-------------|--------------|--------------|--------------|--------------|------");

const allTypes = [...new Set(allCases.flatMap(e => (e.case.Items || []).map(it => it.Type || "MISSING")))].sort();
for (const t of allTypes) {
  const counts = files.map(f => {
    const items = allCases.filter(e => e.file === f).flatMap(e => (e.case.Items || []));
    return items.filter(it => (it.Type || "MISSING") === t).length;
  });
  const total = counts.reduce((a, b) => a + b, 0);
  const row = [t.padEnd(9), ...counts.map(c => String(c).padEnd(13)), String(total)].join(" | ");
  console.log(row);
}

console.log(`\n### Table 3: Correct Field Format by Type ###`);
console.log("ItemType  | string  | array   | object  | number  | undefined");
console.log("----------|---------|---------|---------|---------|---------");

for (const t of allTypes) {
  const items = allCases.flatMap(e => (e.case.Items || []).filter(it => (it.Type || "MISSING") === t));
  const strCount = items.filter(it => typeof it.Correct === "string").length;
  const arrCount = items.filter(it => Array.isArray(it.Correct)).length;
  const objCount = items.filter(it => typeof it.Correct === "object" && it.Correct !== null && !Array.isArray(it.Correct)).length;
  const numCount = items.filter(it => typeof it.Correct === "number").length;
  const undCount = items.filter(it => it.Correct === undefined || it.Correct === null).length;
  console.log(`${t.padEnd(10)}| ${String(strCount).padEnd(7)} | ${String(arrCount).padEnd(7)} | ${String(objCount).padEnd(7)} | ${String(numCount).padEnd(7)} | ${String(undCount).padEnd(9)}`);
}

// ---- Item count consistency check ----
console.log(`\n### Table 4: Item Count Consistency Per Array ###`);
console.log("File                | Array                     | Cases | Items/case | AllEqual?");
console.log("--------------------|---------------------------|-------|------------|----------");

for (const { file, data } of allData) {
  for (const [arrName, arr] of Object.entries(data)) {
    if (!arr || !Array.isArray(arr)) continue;
    if (arrName.startsWith("ENHANCED_CASE_BANK")) continue;
    const counts = arr.map(c => (c.Items || []).length);
    const uniq = [...new Set(counts)];
    const allEqual = uniq.length === 1;
    console.log(`${file.padEnd(20)}| ${arrName.padEnd(26)}| ${String(arr.length).padEnd(5)} | ${uniq.join("/").padEnd(10)} | ${allEqual ? "YES" : "NO"}`);
  }
}

// ---- Scoring metadata completeness % ----
console.log(`\n### Table 5: Scoring Metadata Completeness ###`);
console.log("File                | Cases | Items | HasCorrect | HasType | HasPrompt | Complete%");
console.log("--------------------|-------|-------|------------|---------|-----------|---------");

for (const file of files) {
  const fileCases = allCases.filter(e => e.file === file);
  const items = fileCases.flatMap(e => (e.case.Items || []));
  const hasCorrect = items.filter(it => it.Correct !== undefined && it.Correct !== null).length;
  const hasType = items.filter(it => !!it.Type).length;
  const hasPrompt = items.filter(it => !!it.Prompt).length;
  const complete = items.filter(it => (it.Correct !== undefined && it.Correct !== null) && !!it.Type && !!it.Prompt).length;
  const pct = items.length > 0 ? (complete / items.length * 100).toFixed(1) : "N/A";
  console.log(`${file.padEnd(20)}| ${String(fileCases.length).padEnd(5)} | ${String(items.length).padEnd(5)} | ${String(hasCorrect).padEnd(10)} | ${String(hasType).padEnd(7)} | ${String(hasPrompt).padEnd(9)} | ${pct}%`);
}

// ---- Detailed case-level field presence ----
console.log(`\n### Table 6: Case-Level Metadata Fields Present ###`);
const caseFields = ["CaseID", "DifficultyScore", "ProductionStatus", "question_state", "EstimatedMinutes", 
                     "Title", "SectionTags", "BlueprintDomain", "Exhibits", "Items", "QuestionCount",
                     "ScenarioText", "PrimaryCompetency", "Confidence", "Version"];

console.log("Field              | Enhanced (CBQ) | Migrated (CASE)");
console.log("-------------------|----------------|----------------");

for (const f of caseFields) {
  const enhCount = enhanced.filter(e => e.case[f] !== undefined && e.case[f] !== null).length;
  const enhPct = enhanced.length > 0 ? (enhCount / enhanced.length * 100).toFixed(0) : "N/A";
  const migCount = migrated.filter(e => e.case[f] !== undefined && e.case[f] !== null).length;
  const migPct = migrated.length > 0 ? (migCount / migrated.length * 100).toFixed(0) : "N/A";
  console.log(`${f.padEnd(18)} | ${String(enhCount).padEnd(2)}/${enhanced.length} (${enhPct}%)   | ${String(migCount).padEnd(2)}/${migrated.length} (${migPct}%)`);
}

// ---- Cases with ambiguous/missing scoring ----
console.log(`\n### Table 7: Cases with Scoring Anomalies ###`);

// Check for QuestionCount != Items.length
const mismatchedCounts = allCases.filter(e => {
  const c = e.case;
  return c.QuestionCount !== undefined && c.Items && c.QuestionCount !== c.Items.length;
});
if (mismatchedCounts.length > 0) {
  console.log(`\n  QuestionCount != Items.length:`);
  for (const e of mismatchedCounts) {
    console.log(`    ${e.file}::${e.case.CaseID}: QuestionCount=${e.case.QuestionCount}, Items.length=${(e.case.Items || []).length}`);
  }
} else {
  console.log(`\n  No QuestionCount/Items.length mismatches found.`);
}

// Items without Correct
if (itemsMissingCorrect.length > 0) {
  console.log(`\n  Items without Correct field (${itemsMissingCorrect.length}):`);
  for (let i = 0; i < Math.min(itemsMissingCorrect.length, 30); i++) {
    console.log(`    ${itemsMissingCorrect[i]}`);
  }
  if (itemsMissingCorrect.length > 30) console.log(`    ... +${itemsMissingCorrect.length - 30} more`);
}

// Cases with no Items
if (casesMissingItems.length > 0) {
  console.log(`\n  Cases with no Items array: ${casesMissingItems.length}`);
}

// Empty Correct strings (ambiguous — "0" could be valid, "" could be a problem)
const emptyCorrect = allCases.flatMap(e => (e.case.Items || []).filter(it => it.Correct === "").map(it => `${e.file}::${e.case.CaseID}::${(it.Prompt || "").substring(0, 50)}`));
if (emptyCorrect.length > 0) {
  console.log(`\n  Items with Correct="" (${emptyCorrect.length}):`);
  for (const ec of emptyCorrect.slice(0, 20)) console.log(`    ${ec}`);
  if (emptyCorrect.length > 20) console.log(`    ... +${emptyCorrect.length - 20} more`);
}

console.log("\n\n=== AUDIT COMPLETE ===");
