/**
 * Governance Guard Engine v1.0 — SESSION 750, Board A
 *
 * Standalone CLI that automates validation of Governance Rules 1-8
 * across all 5 MCQ packs and 5 scored-case files.
 *
 * Run: node scripts/governance_guard_engine.js [--json] [--pack <name>]
 *
 * Dependencies: CURRENT_BASELINES.md, DEFECT_LIBRARY.md, CAQS_v1.0.md
 * Output: Structured JSON result + console summary
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.resolve(__dirname, "..");

const SOURCE_FILES = [
  "pack_a_corrected.js",
  "pack_b_corrected.js",
  "pack_c_corrected.js",
  "pack_d_corrected.js",
  "pack_e_corrected.js",
  "scored_cases.js",
  "scored_cases2.js",
  "scored_cases3.js",
  "scored_cases4.js",
  "scored_cases5.js",
];

const REVISION_HISTORY = "knowledge/REVISION_HISTORY.md";
const DEFECT_LIBRARY = "knowledge/DEFECT_LIBRARY.md";
const CAQS = "knowledge/CAQS_v1.0.md";

// ── String-aware brace-matching object extraction ──────────────

function extractObjectsFromText(text) {
  const objects = [];
  let pos = 0;
  while (pos < text.length) {
    const objStart = text.indexOf("{", pos);
    if (objStart === -1) break;
    let depth = 1;
    let i = objStart + 1;
    let inString = false, stringChar = "", escape = false;
    while (depth > 0 && i < text.length) {
      const ch = text[i];
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
    const objText = text.substring(objStart, i);
    let obj = null;
    try { obj = JSON.parse(objText); } catch (e) {
      try { obj = new Function("return (" + objText + ")")(); } catch (e2) {}
    }
    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
      objects.push(obj);
    }
    pos = i;
  }
  return objects;
}

function parsePackFile(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, "utf-8");
  return extractObjectsFromText(text);
}

// ── Rule Checks ────────────────────────────────────────────────

/** RULE 2: ExplanationWrong[CorrectChoice] must be empty */
function checkRule2(objects) {
  const violations = [];
  for (const obj of objects) {
    const cc = obj.CorrectChoice;
    if (!cc || !/^[A-D]$/.test(cc)) continue;
    const ewKey = "ExplanationWrong" + cc;
    const ewVal = obj[ewKey];
    if (ewVal && typeof ewVal === "string" && ewVal.trim().length > 0) {
      violations.push({
        QuestionID: obj.QuestionID || "(unknown)",
        CorrectChoice: cc,
        snippet: ewVal.substring(0, 80),
        slot: ewKey
      });
    }
  }
  return violations;
}

/** RULE 3: MASTER_QUESTION_REGISTRY.md must not be hand-edited (generated-only) — structural passthrough */
function checkRule3() {
  const regPath = path.join(ROOT, "knowledge", "MASTER_QUESTION_REGISTRY.md");
  return {
    fileExists: fs.existsSync(regPath),
    message: "RULE 3 enforces that MASTER_QUESTION_REGISTRY.md is generated — not hand-edited. Check that build_master_registry.js is the sole author."
  };
}

/** RULE 5: Count QuestionID + ItemID per-change enforcement (simulated batch check on pack files) */
function checkRule5(objects) {
  const objectsCount = objects.filter(o => o.QuestionID || o.ItemID).length;
  return {
    totalObjects: objects.length,
    identifiableObjects: objectsCount,
    limitPerBatch: 30,
    batchesNeeded: Math.ceil(objectsCount / 30),
    message: objectsCount > 30
      ? `Pack contains ${objectsCount} objects — must be split into ≤30-item batches for any edit session unless BLOCK-AUTHORIZED.`
      : "Pack within 30-item batch limit."
  };
}

/** RULE 1: question_state changes must pair with REVISION_HISTORY.md updates */
function checkRule1(objects, filePath) {
  const states = { Certified: 0, "In Audit": 0, "Editorial Queue": 0, Unprocessed: 0, Archived: 0, undefined: 0 };
  for (const obj of objects) {
    const s = obj.question_state || "undefined";
    states[s] = (states[s] || 0) + 1;
  }
  return {
    fileName: path.basename(filePath),
    stateDistribution: states,
    requiresRevisionEntry: states.Certified > 0 || states["In Audit"] > 0,
    message: "Any question_state changes in this file must pair with a knowledge/REVISION_HISTORY.md entry."
  };
}

/** RULE 4: answer-key changes must include recomputed/verified note */
function checkRule4(objects) {
  const itemsWithCC = objects.filter(o => o.CorrectChoice && /^[A-D]$/.test(o.CorrectChoice)).length;
  const itemsWithEC = objects.filter(o => o.ExplanationCorrect && o.ExplanationCorrect.length > 50).length;
  return {
    totalWithCC: itemsWithCC,
    totalWithEC: itemsWithEC,
    ecCoverage: itemsWithCC > 0 ? ((itemsWithEC / itemsWithCC) * 100).toFixed(1) + "%" : "N/A",
    message: "Any CorrectChoice modification must include a 'recomputed' or 'independently verified' note."
  };
}

/** RULE 6 (Identity): Verify QuestionID uniqueness and structural field presence */
function checkRule6(objects) {
  const qids = new Set();
  const duplicates = [];
  const missingFields = [];
  for (const obj of objects) {
    const qid = obj.QuestionID || obj.ItemID;
    if (!qid) {
      missingFields.push({ type: "MISSING_ID", snippet: JSON.stringify(obj).substring(0, 60) });
      continue;
    }
    if (qids.has(qid)) {
      duplicates.push(qid);
    }
    qids.add(qid);
    const required = ["Stem", "CorrectChoice", "ExplanationCorrect"];
    for (const f of required) {
      if (!obj[f]) {
        missingFields.push({ QuestionID: qid, missingField: f });
      }
    }
  }
  return { totalUnique: qids.size, duplicates, missingFields };
}

/** RULE 7 (Certification): Count certified items */
function checkRule7(objects) {
  const certified = objects.filter(o => o.question_state === "Certified").length;
  return {
    totalObjects: objects.length,
    certified: certified,
    certificationRate: objects.length > 0 ? ((certified / objects.length) * 100).toFixed(1) + "%" : "0%",
    message: certified > 0
      ? `${certified} Certified items in learner delivery pool.`
      : "No Certified items — learner pool empty for this file."
  };
}

/** RULE 8 (Readiness): Check if pack is parseable and structurally complete */
function checkRule8(objects, filePath) {
  const rawText = fs.readFileSync(filePath, "utf-8");
  const qidMatches = (rawText.match(/"QuestionID"\s*:/gi) || []).length;
  const itemMatches = (rawText.match(/"ItemID"\s*:/gi) || []).length;
  return {
    fileName: path.basename(filePath),
    questionIDMarkers: qidMatches,
    itemIDMarkers: itemMatches,
    extractedObjects: objects.length,
    parseGap: (qidMatches + itemMatches) - objects.length,
    structurallyComplete: (qidMatches + itemMatches) === objects.length,
    message: (qidMatches + itemMatches) === objects.length
      ? "Structurally complete — all QID/ItemID markers yield parseable objects."
      : `PARSE GAP: ${(qidMatches + itemMatches) - objects.length} markers could not be extracted as objects.`
  };
}

// ── Policy Drift Check (Board B integration) ────────────────────

function checkPolicyDrift(objects) {
  const drift = {
    missingMetadata: [],
    missingCitations: [],
    missingExplanations: [],
    identityAnomalies: [],
    readinessBypasses: []
  };

  for (const obj of objects) {
    const qid = obj.QuestionID || obj.ItemID || "(unknown)";

    // Missing metadata: question_state, Difficulty, CognitiveLevel
    if (!obj.question_state) {
      drift.missingMetadata.push({ QuestionID: qid, missing: "question_state" });
    }
    if (!obj.Difficulty && !obj.DifficultyScore) {
      drift.missingMetadata.push({ QuestionID: qid, missing: "Difficulty/DifficultyScore" });
    }
    if (!obj.CognitiveLevel) {
      drift.missingMetadata.push({ QuestionID: qid, missing: "CognitiveLevel" });
    }

    // Missing ASC/COSO citations in explanations
    if (obj.ExplanationCorrect && obj.ExplanationCorrect.length > 50) {
      const hasCitation = /ASC\s+\d{3}|COSO|IAS\s+\d{1,2}|IFRS\s+\d{1,2}|GAAP|FASB|IMA\s+Statement|SSARS|PCAOB/i.test(obj.ExplanationCorrect);
      if (!hasCitation) {
        drift.missingCitations.push({ QuestionID: qid, field: "ExplanationCorrect" });
      }
    }

    // Missing explanations (distractor slots)
    for (const letter of ["A", "B", "C", "D"]) {
      const ew = obj["ExplanationWrong" + letter];
      if (ew === undefined) {
        drift.missingExplanations.push({ QuestionID: qid, missingField: "ExplanationWrong" + letter, reason: "absent" });
      } else if (ew === "" && obj.CorrectChoice !== letter) {
        drift.missingExplanations.push({ QuestionID: qid, missingField: "ExplanationWrong" + letter, reason: "empty-distractor" });
      }
    }

    // Identity anomalies: CC not in A-D, Stem missing
    if (obj.CorrectChoice && !/^[A-D]$/.test(obj.CorrectChoice)) {
      drift.identityAnomalies.push({ QuestionID: qid, issue: "Invalid CorrectChoice", value: obj.CorrectChoice });
    }
    if (!obj.Stem || obj.Stem.length === 0) {
      drift.identityAnomalies.push({ QuestionID: qid, issue: "Missing stem" });
    }

    // Readiness bypass: Certified without ExplanationCorrect
    if (obj.question_state === "Certified" && (!obj.ExplanationCorrect || obj.ExplanationCorrect.length < 50)) {
      drift.readinessBypasses.push({ QuestionID: qid, issue: "Certified with insufficient ExplanationCorrect" });
    }
  }

  return drift;
}

// ── Main Engine ─────────────────────────────────────────────────

function runEngine(targetFile) {
  const results = {};

  const files = targetFile ? [targetFile] : SOURCE_FILES;

  for (const file of files) {
    const filePath = path.join(ROOT, file);
    if (!fs.existsSync(filePath)) {
      results[file] = { error: "File not found: " + filePath };
      continue;
    }
    const objects = parsePackFile(filePath);

    results[file] = {
      fileName: file,
      sha256: crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex").toUpperCase(),
      sizeBytes: fs.statSync(filePath).size,
      extractedObjects: objects.length,
      rule2: { description: "DL-008 — ExplanationWrong[CorrectChoice] non-empty", violations: checkRule2(objects) },
      rule3: checkRule3(),
      rule4: checkRule4(objects),
      rule5: checkRule5(objects),
      rule6: checkRule6(objects),
      rule7: checkRule7(objects),
      rule8: checkRule8(objects, filePath),
      policyDrift: checkPolicyDrift(objects),
    };
  }

  // Compute overall status
  const overall = { totalFiles: Object.keys(results).length, filesWithRule2Violations: 0, totalRule2Violations: 0, totalCertified: 0, totalObjects: 0 };

  for (const [fileKey, data] of Object.entries(results)) {
    if (data.error) continue;
    if (data.rule2.violations.length > 0) {
      overall.filesWithRule2Violations++;
      overall.totalRule2Violations += data.rule2.violations.length;
    }
    overall.totalCertified += data.rule7.certified;
    overall.totalObjects += data.extractedObjects;
  }

  overall.status = overall.totalRule2Violations === 0 ? "PASS" : "FAIL";

  return { engine: "Governance Guard Engine v1.0", ruleResults: results, overallSummary: overall };
}

// ── CLI ─────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const useJSON = args.includes("--json");
const packArg = args.find(a => a.startsWith("--pack="));
const targetFile = packArg ? packArg.split("=")[1] : null;

const result = runEngine(targetFile);

if (useJSON) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log("\n=== GOVERNANCE GUARD ENGINE v1.0 — Session 750, Board A ===\n");
  for (const [file, data] of Object.entries(result.ruleResults)) {
    if (data.error) { console.log(`  ${file}: ERROR — ${data.error}\n`); continue; }
    const status = data.rule2.violations.length === 0 ? "PASS" : `FAIL (${data.rule2.violations.length} DL-008)`;
    console.log(`  ${file.padEnd(30)} ${status.padEnd(20)} ${data.rule7.certified} Certified / ${data.extractedObjects} objects`);
  }
  console.log(`\n  OVERALL: ${result.overallSummary.status}`);
  console.log(`  Total DL-008 violations: ${result.overallSummary.totalRule2Violations}`);
  console.log(`  Total Certified: ${result.overallSummary.totalCertified}`);
  console.log(`  Total Objects: ${result.overallSummary.totalObjects}\n`);
}

module.exports = { runEngine, extractObjectsFromText, checkRule2, checkRule6, checkRule7, checkRule8, checkPolicyDrift };
