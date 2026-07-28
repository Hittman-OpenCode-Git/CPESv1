/**
 * Policy Drift Detector v1.0 — SESSION 750, Board B
 *
 * Detects governance policy drift across the CMA Part 1 Exam Simulator:
 * - Missing metadata fields
 * - Missing authority citations (ASC, COSO, IFRS, etc.)
 * - Missing distractor explanations
 * - Identity anomalies (invalid CorrectChoice, missing stems)
 * - Readiness bypass attempts (Certified without sufficient explanation)
 *
 * Run: node scripts/policy_drift_detector.js [--json] [--pack <name>] [--threshold <N>]
 *
 * Output: policy_drift_report.json + console summary
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

// ── Object extraction (mirrors governance_guard_engine.js) ──────

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

// ── Citation pattern ────────────────────────────────────────────

const CITATION_RE = /ASC\s+\d{3}|COSO|IAS\s+\d{1,2}|IFRS\s+\d{1,2}|GAAP|FASB|IMA\s+Statement|SSARS|PCAOB|SOX|SEC\s+Regulation/i;

// ── Core Detection Functions ────────────────────────────────────

function detectMissingMetadata(objects) {
  const findings = [];
  const metadataFields = ["question_state", "Difficulty", "DifficultyScore", "CognitiveLevel", "Topic", "PrimaryCompetency"];

  for (const obj of objects) {
    const qid = obj.QuestionID || obj.ItemID || "(unknown)";
    const missing = metadataFields.filter(f => !obj[f]);
    if (missing.length > 0) {
      findings.push({ QuestionID: qid, missingFields: missing, severity: missing.includes("question_state") ? "HIGH" : "MEDIUM" });
    }
  }
  return findings;
}

function detectMissingCitations(objects) {
  const findings = [];
  for (const obj of objects) {
    const qid = obj.QuestionID || obj.ItemID || "(unknown)";
    // Check ExplanationCorrect
    if (obj.ExplanationCorrect && obj.ExplanationCorrect.length > 50) {
      if (!CITATION_RE.test(obj.ExplanationCorrect)) {
        findings.push({ QuestionID: qid, field: "ExplanationCorrect", severity: "MEDIUM" });
      }
    }
    // Check each ExplanationWrong for authority reference
    for (const letter of ["A", "B", "C", "D"]) {
      const ew = obj["ExplanationWrong" + letter];
      if (ew && ew.length > 50 && ew !== obj.ExplanationCorrect) {
        if (!CITATION_RE.test(ew)) {
          findings.push({ QuestionID: qid, field: "ExplanationWrong" + letter, severity: "LOW" });
        }
      }
    }
  }
  return findings;
}

function detectMissingExplanations(objects) {
  const findings = [];
  for (const obj of objects) {
    const qid = obj.QuestionID || obj.ItemID || "(unknown)";
    const cc = obj.CorrectChoice;

    // ExplanationCorrect must exist and be substantive
    if (!obj.ExplanationCorrect || obj.ExplanationCorrect.length < 50) {
      findings.push({ QuestionID: qid, field: "ExplanationCorrect", issue: "absent_or_insufficient", severity: obj.question_state === "Certified" ? "HIGH" : "MEDIUM" });
    }

    // Each distractor slot must exist and be non-empty (unless it's the CC slot)
    if (cc && /^[A-D]$/.test(cc)) {
      for (const letter of ["A", "B", "C", "D"]) {
        const ew = obj["ExplanationWrong" + letter];
        if (letter === cc) {
          if (ew && ew.length > 0) {
            findings.push({ QuestionID: qid, field: "ExplanationWrong" + letter, issue: "DL-008_non-empty_at_CC", severity: "HIGH" });
          }
        } else {
          if (ew === undefined) {
            findings.push({ QuestionID: qid, field: "ExplanationWrong" + letter, issue: "DL-021_absent", severity: "HIGH" });
          } else if (ew === "") {
            findings.push({ QuestionID: qid, field: "ExplanationWrong" + letter, issue: "DL-026_empty", severity: "HIGH" });
          } else if (ew.length < 50) {
            findings.push({ QuestionID: qid, field: "ExplanationWrong" + letter, issue: "insufficient_length", severity: "LOW" });
          }
          // Check for DL-013 boilerplate
          if (ew && /represents a plausible misconception/.test(ew)) {
            findings.push({ QuestionID: qid, field: "ExplanationWrong" + letter, issue: "DL-013_boilerplate", severity: "MEDIUM" });
          }
        }
      }
    }
  }
  return findings;
}

function detectIdentityAnomalies(objects) {
  const findings = [];
  const seenQIDs = new Set();

  for (const obj of objects) {
    const qid = obj.QuestionID || obj.ItemID;

    // Missing ID
    if (!qid) {
      findings.push({ QuestionID: "(missing)", issue: "NO_IDENTIFIER", severity: "HIGH" });
      continue;
    }

    // Duplicate ID
    if (seenQIDs.has(qid)) {
      findings.push({ QuestionID: qid, issue: "DUPLICATE_ID", severity: "HIGH" });
    }
    seenQIDs.add(qid);

    // Invalid CorrectChoice
    if (obj.CorrectChoice && !/^[A-D]$/.test(obj.CorrectChoice)) {
      findings.push({ QuestionID: qid, issue: "INVALID_CORRECT_CHOICE", value: obj.CorrectChoice, severity: "CRITICAL" });
    }

    // Missing CorrectChoice
    if (!obj.CorrectChoice || obj.CorrectChoice === "") {
      findings.push({ QuestionID: qid, issue: "MISSING_CORRECT_CHOICE", severity: "CRITICAL" });
    }

    // Missing Stem
    if (!obj.Stem || obj.Stem.length < 10) {
      findings.push({ QuestionID: qid, issue: "MISSING_OR_SHORT_STEM", severity: "CRITICAL" });
    }

    // Invalid question_state value
    const validStates = ["Unprocessed", "In Audit", "Editorial Queue", "Certified", "Archived"];
    if (obj.question_state && !validStates.includes(obj.question_state)) {
      findings.push({ QuestionID: qid, issue: "INVALID_QUESTION_STATE", value: obj.question_state, severity: "HIGH" });
    }
  }
  return findings;
}

function detectReadinessBypasses(objects) {
  const findings = [];
  for (const obj of objects) {
    const qid = obj.QuestionID || obj.ItemID || "(unknown)";

    // Certified without sufficient ExplanationCorrect
    if (obj.question_state === "Certified") {
      if (!obj.ExplanationCorrect || obj.ExplanationCorrect.length < 50) {
        findings.push({ QuestionID: qid, issue: "CERTIFIED_WITHOUT_EXPLANATION", severity: "HIGH" });
      }
      // Certified without distractor explanations
      const cc = obj.CorrectChoice;
      if (cc) {
        let missingDistractors = 0;
        for (const letter of ["A", "B", "C", "D"]) {
          if (letter !== cc) {
            const ew = obj["ExplanationWrong" + letter];
            if (!ew || ew.length < 10) missingDistractors++;
          }
        }
        if (missingDistractors > 0) {
          findings.push({ QuestionID: qid, issue: `CERTIFIED_WITH_${missingDistractors}_MISSING_DISTRACTORS`, severity: "HIGH" });
        }
      }
    }

    // High difficulty without complex explanation
    if ((obj.Difficulty === "Difficult" || obj.Difficulty === "Very Difficult" || obj.DifficultyScore >= 4) && obj.ExplanationCorrect && obj.ExplanationCorrect.length < 200) {
      findings.push({ QuestionID: qid, issue: "HIGH_DIFFICULTY_WITH_SHORT_EXPLANATION", severity: "LOW" });
    }
  }
  return findings;
}

// ── Main Detector ───────────────────────────────────────────────

function runDetector(targetFile, threshold = 0) {
  const packDir = path.join(ROOT, targetFile || "pack_a_corrected.js");
  const files = targetFile
    ? [targetFile]
    : ["pack_a_corrected.js", "pack_b_corrected.js", "pack_c_corrected.js", "pack_d_corrected.js", "pack_e_corrected.js"];

  const allResults = {};

  for (const file of files) {
    const filePath = path.join(ROOT, file);
    if (!fs.existsSync(filePath)) {
      allResults[file] = { error: "File not found" };
      continue;
    }
    const text = fs.readFileSync(filePath, "utf-8");
    const objects = extractObjectsFromText(text);

    const missingMeta = detectMissingMetadata(objects);
    const missingCite = detectMissingCitations(objects);
    const missingExpl = detectMissingExplanations(objects);
    const idAnomalies = detectIdentityAnomalies(objects);
    const readinessBypass = detectReadinessBypasses(objects);

    const critical = missingExpl.filter(f => f.severity === "HIGH").length + idAnomalies.filter(f => f.severity === "CRITICAL").length;

    allResults[file] = {
      fileName: file,
      totalObjects: objects.length,
      missingMetadata: { count: missingMeta.length, findings: threshold > 0 ? missingMeta.slice(0, threshold) : missingMeta },
      missingCitations: { count: missingCite.length, findings: threshold > 0 ? missingCite.slice(0, threshold) : missingCite },
      missingExplanations: { count: missingExpl.length, findings: threshold > 0 ? missingExpl.slice(0, threshold) : missingExpl },
      identityAnomalies: { count: idAnomalies.length, findings: threshold > 0 ? idAnomalies.slice(0, threshold) : idAnomalies },
      readinessBypasses: { count: readinessBypass.length, findings: threshold > 0 ? readinessBypass.slice(0, threshold) : readinessBypass },
      severitySummary: {
        critical: critical,
        high: missingMeta.filter(f => f.severity === "HIGH").length + missingExpl.filter(f => f.severity === "HIGH").length + idAnomalies.filter(f => f.severity === "HIGH").length,
        medium: missingCite.length + missingExpl.filter(f => f.severity === "MEDIUM").length,
        low: missingCite.filter(f => f.severity === "LOW").length + missingExpl.filter(f => f.severity === "LOW").length + readinessBypass.filter(f => f.severity === "LOW").length
      }
    };
  }

  const totalCritical = Object.values(allResults).reduce((s, r) => s + (r.severitySummary ? r.severitySummary.critical : 0), 0);
  const overallStatus = totalCritical === 0 ? "NO_CRITICAL_DRIFT" : "DRIFT_DETECTED";

  return {
    detector: "Policy Drift Detector v1.0",
    timestamp: new Date().toISOString(),
    overallStatus,
    totalCriticalFindings: totalCritical,
    results: allResults
  };
}

// ── CLI ─────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const useJSON = args.includes("--json");
const packArg = args.find(a => a.startsWith("--pack="));
const threshArg = args.find(a => a.startsWith("--threshold="));
const targetFile = packArg ? packArg.split("=")[1] : null;
const threshold = threshArg ? parseInt(threshArg.split("=")[1]) : 0;

const result = runDetector(targetFile, threshold);

if (useJSON) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log("\n=== POLICY DRIFT DETECTOR v1.0 — Session 750, Board B ===\n");
  for (const [file, data] of Object.entries(result.results)) {
    if (data.error) { console.log(`  ${file}: ${data.error}`); continue; }
    console.log(`  ${file.padEnd(30)} Objects: ${data.totalObjects.toString().padStart(4)}  Critical: ${data.severitySummary.critical}  High: ${data.severitySummary.high}`);
  }
  console.log(`\n  OVERALL STATUS: ${result.overallStatus}`);
  console.log(`  Total Critical Findings: ${result.totalCriticalFindings}\n`);
}

module.exports = { runDetector, detectMissingMetadata, detectMissingCitations, detectMissingExplanations, detectIdentityAnomalies, detectReadinessBypasses };
