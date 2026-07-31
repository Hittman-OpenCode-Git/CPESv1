/**
 * Governance Guard P2 — CMA Part 2 Exam Simulator
 *
 * Standalone Node.js module (NOT an OpenCode plugin).
 * Validates P2 items against all 11 governance rules.
 * CommonJS export: { GovernanceGuardP2 }
 *
 * Dependencies: None (zero-external-dependency, Node.js built-ins only)
 *
 * RULE 1  (WARN)  — question_state changes must pair with REVISION_HISTORY_P2.md updates
 * RULE 2  (BLOCK) — ExplanationWrong[CorrectChoice] must be "" (DL-008 enforcement)
 * RULE 3  (BLOCK) — MASTER_QUESTION_REGISTRY_P2.md is generated, never hand-edited
 * RULE 4  (WARN)  — answer-key changes must include recomputed verification note
 * RULE 5  (BLOCK) — ≤30 question objects per change-set without BLOCK-AUTHORIZED marker
 * RULE 6  (BLOCK) — non-CorrectChoice EW slots must be non-empty (DL-026 enforcement)
 * RULE 7  (BLOCK) — derived registries not hand-edited
 * RULE 8  (BLOCK) — untracked artifact enforcement
 * RULE 9  (BLOCK) — Choice binary lead-in polarity mismatch (DL-037 enforcement)
 * RULE 10 (BLOCK) — non-CorrectChoice EW slots must be present and non-empty (DL-021 enforcement)
 * RULE 11 (BLOCK) — Part2OnlyFlag must be strictly boolean true on every item [P2-only]
 * RULE 12 (BLOCK) — Cognitive-First Assignment (cognitive-gate validation + relabeling prohibition) — S121
 *
 * Cross-part collision: reject P1- QIDs in P2 packs, reject CBQ (non-"2") CaseIDs in P2 case packs
 */

"use strict";

const fs = require("fs");
const path = require("path");

// ── Constants ────────────────────────────────────────────────────

const MAX_QUESTIONS = 30;
const BLOCK_AUTH_RE = /BLOCK-AUTHORIZED|batch-authorized|AUTHORIZED-BLOCK/i;
const RECOMPUTED_RE = /recomputed|independently verified|independently recalculated|re-verified|recomputation verified/i;

/** P2 source files — MCQ packs */
const P2_PACK_FILE_RE = /^pack_p2_[a-e]\.js$/i;
/** P2 source files — case packs */
const P2_CASE_FILE_RE = /^case_pack_p2_[1-3]\.js$/i;
/** Combined: any P2 source file */
const P2_SOURCE_FILE_RE = /^(pack_p2_[a-e]\.js|case_pack_p2_[1-3]\.js)$/i;

/** Derived registry paths — must NOT be hand-edited */
const DERIVED_REGISTRY_RE = /(registry[\\\/](packs|domains|cases)[\\\/]|MasterQuestionRegistry_P2\.csv$|MASTER_QUESTION_REGISTRY_P2\.md$|SESSION_STATUS_P2_\d{4}-\d{2}-\d{2}\.md$|CURRENT_BASELINES_P2\.md$|DEFECT_MANIFEST_DL008_DL026_P2\.json$|master_question_registry_p2\.md$)/i;

/** Regeneration scripts that are WHITELISTED to write derived registries */
const REGENERATION_SCRIPT_RE = /(build_master_registry|regenerate|rebuild|regen)_/i;

/** Session packages output directory */
const SESSION_PACKAGES_RE = /scripts[\\\/]output[\\\/]session_packages_p2[\\\/]/i;

/** P2 QID format: P2-{Section}-{NNN} */
const P2_QID_RE = /^P2-[A-F]-\d{3}$/;
/** P2 CaseID format: CBQ2{Pack}-{Section}{Seq} */
const P2_CASEID_RE = /^CBQ2\d*-[A-F]\d+$/;
/** P2 ItemID format: CBQ2{Pack}-{Section}{Seq}-Q{N} */
const P2_ITEMID_RE = /^CBQ2\d*-[A-F]\d*-Q\d+$/;

/** P1 QID — must NOT appear in P2 files */
const P1_QID_RE = /^P1-[A-Z]+-\d+$/;
/** P1 CaseID — must NOT appear in P2 case files */
const P1_CASEID_RE = /^CBQ\d*-[A-F]\d+$/;

/** P1-exclusive concepts — WARN if found in P2 items */
const P1_EXCLUSIVE_TERMS = [
  /\bstandard\s+costing\s+variance\b/i,
  /\bprocess\s+costing\b/i,
  /\bjob\s+order\s+costing\b/i,
  /\bjoint\s+product\s+cost\s+allocation\b/i,
  /\bservice\s+department\s+allocation\b/i,
  /\bactivity\s*based\s+costing\b.*\bimplementation\b/i,
  /\bCOSO\s+IC\b/i,
  /\bCOSO\s+Internal\s+Control\b(?!.*\bERM\b)/i,
];

// ── Logic Inversion Patterns (Rule 9) ────────────────────────────

const PATTERN_NO_AFFIRMATIVE = /^No,.*\b(should be investigated|should be accepted|should be selected|should be applied|should be used|must be applied|must be used|is correct|is appropriate|is warranted|is required|will be investigated|would be investigated|so it should be|therefore it is|therefore it should|thus it is|thus it should|hence it is|hence it should)\b/i;

const PATTERN_YES_NEGATIVE = /^Yes,.*\b(should not|shouldn't|is not\b|isn't|would not|wouldn't|cannot|must not|is incorrect|is inappropriate|is not correct|is not appropriate|is not warranted|should not be|it should not|therefore it is not|thus it is not|hence it is not)\b/i;

// ── Utility Functions ────────────────────────────────────────────

/**
 * Extract brace-matched JSON objects from arbitrary text using string-aware parsing.
 * Handles brackets inside JSON string values, escaped quotes, and single-quoted strings.
 * @param {string} text
 * @returns {Array<object>}
 */
function extractObjectsFromText(text) {
  const objects = [];
  let pos = 0;
  while (pos < text.length) {
    const objStart = text.indexOf("{", pos);
    if (objStart === -1) break;
    let depth = 1;
    let i = objStart + 1;
    let inString = false;
    let stringChar = "";
    let escape = false;
    while (depth > 0 && i < text.length) {
      const ch = text[i];
      if (escape) {
        escape = false;
        i++;
        continue;
      }
      if (inString) {
        if (ch === "\\") {
          escape = true;
        } else if (ch === stringChar) {
          inString = false;
          stringChar = "";
        }
        i++;
        continue;
      }
      if (ch === '"' || ch === "'") {
        inString = true;
        stringChar = ch;
        i++;
        continue;
      }
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      i++;
    }
    if (depth !== 0) break;
    const objText = text.substring(objStart, i);
    let obj = null;
    try {
      obj = JSON.parse(objText);
    } catch (_e) {
      try {
        obj = new Function("return (" + objText + ")")();
      } catch (_e2) {
        /* skip unparseable objects */
      }
    }
    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
      objects.push(obj);
    }
    pos = i;
  }
  return objects;
}

/**
 * Extract the array of items from a P2 pack file.
 * Handles both `var varname = [...]` and `const varname = [...]` patterns.
 * @param {string} fileContent
 * @returns {Array<object>}
 */
function extractItemsFromPackFile(fileContent) {
  const items = [];
  // Find the array opening bracket after variable declaration
  const arrayMatch = fileContent.match(/^(?:var|const|let)\s+\w+\s*=\s*\[/m);
  if (!arrayMatch) return items;
  const arrayStart = arrayMatch.index + arrayMatch[0].length - 1; // position of opening '['
  let depth = 1;
  let i = arrayStart + 1;
  let inString = false;
  let stringChar = "";
  let escape = false;
  while (depth > 0 && i < fileContent.length) {
    const ch = fileContent[i];
    if (escape) { escape = false; i++; continue; }
    if (inString) {
      if (ch === "\\") { escape = true; }
      else if (ch === stringChar) { inString = false; stringChar = ""; }
      i++;
      continue;
    }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; i++; continue; }
    if (ch === "[" || ch === "{") depth++;
    else if (ch === "]" || ch === "}") depth--;
    i++;
  }
  if (depth !== 0) return items;
  const arrayBody = fileContent.substring(arrayStart, i);
  // Extract individual object items from the array body
  return extractObjectsFromText(arrayBody);
}

/**
 * Extract basename regardless of platform.
 * @param {string} filePath
 * @returns {string}
 */
function basename(filePath) {
  const normalised = String(filePath || "").replace(/\\/g, "/");
  const parts = normalised.split("/");
  return parts[parts.length - 1] || "";
}

/**
 * Count QuestionID + ItemID markers in text.
 * @param {string} text
 * @returns {number}
 */
function countQuestions(text) {
  if (!text) return 0;
  const q = (text.match(/"QuestionID"\s*:/gi) || []).length;
  const i = (text.match(/"ItemID"\s*:/gi) || []).length;
  return q + i;
}

/**
 * Determine if a file path matches any P2 source file pattern.
 * @param {string} filePath
 * @returns {boolean}
 */
function isP2SourceFile(filePath) {
  return P2_SOURCE_FILE_RE.test(basename(filePath));
}

// ── Rule Violation Detectors ─────────────────────────────────────

/**
 * RULE 2 (DL-008): ExplanationWrong[CorrectChoice] must be "".
 * @param {object} item
 * @returns {Array<{rule: number, code: string, message: string}>}
 */
function checkDL008(item) {
  const violations = [];
  const cc = item.CorrectChoice;
  if (!cc || !/^[A-D]$/.test(cc)) return violations;
  const ewKey = "ExplanationWrong" + cc;
  const ewVal = item[ewKey];
  if (ewVal && typeof ewVal === "string" && ewVal.length > 0) {
    violations.push({
      rule: 2,
      code: "DL-008",
      message: "ExplanationWrong" + cc + " is non-empty on " + (item.QuestionID || item.ItemID || "(unknown)") +
        ": \"" + ewVal.substring(0, 80) + "...\" — must be \"\" (empty string)"
    });
  }
  return violations;
}

/**
 * RULE 6 (DL-026): Non-CorrectChoice ExplanationWrong slots must be non-empty.
 * @param {object} item
 * @returns {Array<{rule: number, code: string, message: string}>}
 */
function checkDL026(item) {
  const violations = [];
  const cc = item.CorrectChoice;
  if (!cc || !/^[A-D]$/.test(cc)) return violations;
  const qid = item.QuestionID || item.ItemID || "(unknown)";
  for (const L of ["A", "B", "C", "D"]) {
    if (L === cc) continue;
    const ewKey = "ExplanationWrong" + L;
    if (!(ewKey in item) || (typeof item[ewKey] === "string" && item[ewKey].length === 0)) {
      violations.push({
        rule: 6,
        code: "DL-026",
        message: "ExplanationWrong" + L + " is empty or absent on " + qid + " (distractor slot must be non-empty)"
      });
    }
  }
  return violations;
}

/**
 * RULE 9 (DL-037): Choice binary lead-in polarity mismatch.
 * @param {object} item
 * @returns {Array<{rule: number, code: string, message: string}>}
 */
function checkDL037(item) {
  const violations = [];
  const qid = item.QuestionID || item.ItemID || "(unknown)";
  const choices = item.Choices;
  if (!choices || typeof choices !== "object") return violations;
  for (const [letter, value] of Object.entries(choices)) {
    if (typeof value !== "string" || value.length === 0) continue;
    if (PATTERN_NO_AFFIRMATIVE.test(value)) {
      violations.push({
        rule: 9,
        code: "DL-037",
        message: qid + " Choice " + letter + " starts with \"No\" but concludes affirmatively: \"" +
          value.substring(0, 120) + "...\""
      });
    }
    if (PATTERN_YES_NEGATIVE.test(value)) {
      violations.push({
        rule: 9,
        code: "DL-037",
        message: qid + " Choice " + letter + " starts with \"Yes\" but concludes negatively: \"" +
          value.substring(0, 120) + "...\""
      });
    }
  }
  return violations;
}

/**
 * RULE 10 (DL-021): Non-CorrectChoice ExplanationWrong fields must be present AND non-empty.
 * @param {object} item
 * @returns {Array<{rule: number, code: string, message: string}>}
 */
function checkDL021(item) {
  const violations = [];
  const cc = item.CorrectChoice;
  if (!cc || !/^[A-D]$/.test(cc)) return violations;
  const qid = item.QuestionID || item.ItemID || "(unknown)";
  for (const L of ["A", "B", "C", "D"]) {
    if (L === cc) continue;
    const ewKey = "ExplanationWrong" + L;
    if (!(ewKey in item)) {
      violations.push({
        rule: 10,
        code: "DL-021",
        message: "ExplanationWrong" + L + " is absent from object on " + qid
      });
    } else if (typeof item[ewKey] === "string" && item[ewKey].length === 0) {
      violations.push({
        rule: 10,
        code: "DL-021",
        message: "ExplanationWrong" + L + " is empty on " + qid
      });
    }
  }
  return violations;
}

/**
 * RULE 11: Part2OnlyFlag must be strictly boolean true.
 * @param {object} item
 * @returns {Array<{rule: number, code: string, message: string}>}
 */
function checkPart2OnlyFlag(item) {
  const violations = [];
  const qid = item.QuestionID || item.ItemID || "(unknown)";
  if (!("Part2OnlyFlag" in item)) {
    violations.push({
      rule: 11,
      code: "P2-FLAG-ABSENT",
      message: qid + ": Part2OnlyFlag is missing (must be true on every P2 item)"
    });
    return violations;
  }
  const flag = item.Part2OnlyFlag;
  if (typeof flag !== "boolean") {
    violations.push({
      rule: 11,
      code: "P2-FLAG-NON-BOOLEAN",
      message: qid + ": Part2OnlyFlag is " + typeof flag + " (" + JSON.stringify(flag) + ") — must be strictly boolean true"
    });
    return violations;
  }
  if (flag !== true) {
    violations.push({
      rule: 11,
      code: "P2-FLAG-FALSE",
      message: qid + ": Part2OnlyFlag is false — must be true on every P2 item"
    });
  }
  return violations;
}

/**
 * RULE 12 (Cognitive-First Assignment): Validate cognitive level consistency.
 * BLOCK: missing CognitiveLevel field. BLOCK: invalid value. WARN: apparent misclassification.
 * @param {object} item
 * @returns {Array<{rule: number, code: string, severity: string, message: string}>}
 */
function checkCognitiveConsistency(item) {
  const violations = [];
  const qid = item.QuestionID || item.ItemID || "(unknown)";
  const cog = item.CognitiveLevel;

  // BLOCK: missing CognitiveLevel entirely
  if (!cog) {
    violations.push({
      rule: 12,
      code: "COG-MISSING",
      severity: "BLOCK",
      message: qid + ": CognitiveLevel field is missing (required for portfolio measurement per S121)"
    });
    return violations;
  }

  // BLOCK: invalid CognitiveLevel value
  const validCL = ["Remember", "Understand", "Apply", "Analyze", "Evaluate"];
  if (!validCL.includes(cog)) {
    violations.push({
      rule: 12,
      code: "COG-INVALID",
      severity: "BLOCK",
      message: qid + ": CognitiveLevel \"" + cog + "\" is not a valid value (must be one of: " + validCL.join(", ") + ")"
    });
    return violations;
  }

  // WARN: cognitive-difficulty mismatch (difficulty too low for claimed level)
  const diffScore = item.DifficultyScore;
  if (cog === "Evaluate" && diffScore !== undefined && diffScore <= 2) {
    violations.push({
      rule: 12,
      code: "COG-DIFF-MISMATCH",
      severity: "WARN",
      message: qid + ": CognitiveLevel is \"" + cog + "\" but DifficultyScore is " + diffScore + " (Evaluate requires >= 3)"
    });
  }
  if (cog === "Analyze" && diffScore !== undefined && diffScore === 1) {
    violations.push({
      rule: 12,
      code: "COG-DIFF-MISMATCH",
      severity: "WARN",
      message: qid + ": CognitiveLevel is \"" + cog + "\" but DifficultyScore is " + diffScore + " (Analyze requires >= 2)"
    });
  }

  // WARN: deterministic rule application labeled as Analyze/Evaluate
  const stem = item.Stem || "";
  const ec = item.ExplanationCorrect || "";
  if (cog === "Analyze" || cog === "Evaluate") {
    const hasRuleRef = /Under (ASC|IFRS|COSO|GAAP|IAS|IRC|FASB)/i.test(stem);
    const hasTradeOff = /competing|best option|weigh|trade.off|balance|recommend|evaluate|which.*should/i.test(ec);
    if (hasRuleRef && !hasTradeOff) {
      violations.push({
        rule: 12,
        code: "COG-INFLATION-RULE",
        severity: "WARN",
        message: qid + ": CognitiveLevel is \"" + cog + "\" but stem invokes a deterministic rule without trade-off language — may be Apply"
      });
    }
  }

  // WARN: pure definition/recall labeled above Understand
  if ((cog === "Apply" || cog === "Analyze" || cog === "Evaluate") && stem.length < 150) {
    const defPatterns = [
      /^(Which|What) (of the following )?(term|concept|definition|formula|ratio|measure)/i,
      /^(The|A) .{0,40}(is|are|measures|calculates|refers to|represents) /i,
      /is (also )?(known as|called|referred to as)/i,
    ];
    const looksLikeDefinition = defPatterns.some(p => p.test(stem));
    if (looksLikeDefinition && !/(Compute|Calculate|Determine|Analyze|Evaluate|Recommend|Compare|Interpret)/i.test(stem)) {
      violations.push({
        rule: 12,
        code: "COG-INFLATION-DEF",
        severity: "WARN",
        message: qid + ": CognitiveLevel is \"" + cog + "\" but stem appears to be a definition/recall question — may be Remember/Understand"
      });
    }
  }

  return violations;
}

/**
 * Cross-part collision: detect P1- QIDs in P2 packs.
 * @param {object} item
 * @returns {Array<{rule: number, code: string, message: string}>}
 */
function checkCrossPartCollision(item) {
  const violations = [];
  const qid = item.QuestionID || "";
  // Reject P1- QIDs in P2 packs
  if (qid && P1_QID_RE.test(qid)) {
    violations.push({
      rule: 0,
      code: "CROSS-PART-QID",
      message: qid + " has P1- QID prefix in a P2 pack file — rejected"
    });
  }
  // Verify P2 QID format matches expected pattern
  if (qid && !P2_QID_RE.test(qid) && !P2_ITEMID_RE.test(qid)) {
    // Only flag if it looks like it should be a P2 QID (not a case item)
    if (!P2_CASEID_RE.test(qid) && !P1_QID_RE.test(qid)) {
      violations.push({
        rule: 0,
        code: "QID-FORMAT",
        message: qid + " does not match expected P2 QID format /^P2-[A-F]-\\d{3}$/"
      });
    }
  }
  return violations;
}

/**
 * P1-exclusive concept WARN: detect P1-only concepts in P2 items.
 * @param {object} item
 * @returns {Array<{rule: number, code: string, message: string}>}
 */
function checkP1ExclusiveConcepts(item) {
  const violations = [];
  const qid = item.QuestionID || item.ItemID || "(unknown)";
  const combinedText = [
    item.Stem || "",
    item.ExplanationCorrect || "",
    item.ExplanationWrongA || "",
    item.ExplanationWrongB || "",
    item.ExplanationWrongC || "",
    item.ExplanationWrongD || "",
    ...(item.Choices ? Object.values(item.Choices) : []),
    ...(item.Authorities || []),
  ].join(" ");
  for (const pattern of P1_EXCLUSIVE_TERMS) {
    if (pattern.test(combinedText)) {
      violations.push({
        rule: 0,
        code: "P1-EXCLUSIVE-WARN",
        message: qid + " contains suspected P1-exclusive concept matching: " + pattern.source
      });
      break; // one warning per item is sufficient
    }
  }
  return violations;
}

// ── GovernanceGuardP2 Class ──────────────────────────────────────

class GovernanceGuardP2 {
  /**
   * @param {object} [config={}]
   * @param {string[]} [config.packFiles]       — paths to P2 pack files to validate
   * @param {string[]} [config.casePackFiles]   — paths to P2 case pack files
   * @param {string}   [config.revisionHistPath] — path to REVISION_HISTORY_P2.md
   * @param {boolean}  [config.strict]           — if true, WARN violations also cause pass=false
   */
  constructor(config) {
    this.config = Object.assign({
      packFiles: [],
      casePackFiles: [],
      revisionHistPath: "knowledge/REVISION_HISTORY_P2.md",
      strict: false,
    }, config);

    /** @type {Array<{rule: number, code: string, severity: "BLOCK"|"WARN", message: string, qid?: string, file?: string}>} */
    this.violations = [];
    this.totalItemsValidated = 0;
    this.totalItemsViolated = 0;
    this.packsScanned = 0;
  }

  /**
   * Validate a single item object against all structural rules.
   * @param {object} item
   * @param {object} [opts={}]
   * @param {boolean} [opts.skipCrossPart] — skip cross-part collision check
   * @returns {{ pass: boolean, violations: Array }}
   */
  validateItem(item, opts) {
    opts = opts || {};
    const allViolations = [];

    // Structural rules that apply to every individual item
    allViolations.push(...checkDL008(item));
    allViolations.push(...checkDL026(item));
    allViolations.push(...checkDL037(item));
    allViolations.push(...checkDL021(item));
    allViolations.push(...checkPart2OnlyFlag(item));

    if (!opts.skipCrossPart) {
      allViolations.push(...checkCrossPartCollision(item));
    }

    allViolations.push(...checkP1ExclusiveConcepts(item));

    // BLOCK-level violations cause pass=false (structural rules 2,5,6,9,10,11 are BLOCK)
    const blockViolations = allViolations.filter(
      v => v.rule === 2 || v.rule === 5 || v.rule === 6 || v.rule === 9 || v.rule === 10 || v.rule === 11 || v.rule === 12 || v.rule === 0
    );

    return {
      pass: blockViolations.length === 0,
      violations: allViolations,
    };
  }

  /**
   * Read a pack file, extract items, and validate all of them.
   * @param {string} filePath — path to the pack file
   * @returns {{ pass: boolean, totalItems: number, violations: Array, file: string }}
   */
  validatePack(filePath) {
    const absPath = path.resolve(filePath);
    let content;
    try {
      content = fs.readFileSync(absPath, "utf-8");
    } catch (err) {
      return {
        pass: false,
        totalItems: 0,
        violations: [{
          rule: 0,
          code: "FILE-READ-ERROR",
          severity: "BLOCK",
          message: "Cannot read file: " + absPath + " — " + err.message,
          file: filePath,
        }],
        file: filePath,
      };
    }

    const items = extractItemsFromPackFile(content);
    const allViolations = [];
    let blockCount = 0;

    for (const item of items) {
      const result = this.validateItem(item, { skipCrossPart: false });
      if (!result.pass) blockCount++;
      for (const v of result.violations) {
        v.file = basename(filePath);
        v.qid = item.QuestionID || item.ItemID || undefined;
      }
      allViolations.push(...result.violations);
    }

    this.totalItemsValidated += items.length;
    this.totalItemsViolated += blockCount;
    this.packsScanned++;
    this.violations.push(...allViolations);

    return {
      pass: blockCount === 0,
      totalItems: items.length,
      violations: allViolations,
      file: filePath,
    };
  }

  /**
   * Validate a change-set (batch of content to be written).
   * Checks: Rule 2 (DL-008), Rule 5 (batch cap), Rule 6 (DL-026), Rule 9 (DL-037),
   *         Rule 10 (DL-021), Rule 11 (Part2OnlyFlag).
   * @param {string} newContent — the content being written
   * @param {string} filePath — the target file path (for context)
   * @returns {{ pass: boolean, violations: Array }}
   */
  validateChangeSet(newContent, filePath) {
    const allViolations = [];
    const fileName = basename(filePath);
    const isP2Source = P2_SOURCE_FILE_RE.test(fileName);

    // RULE 5: batch cap
    const qCount = countQuestions(newContent);
    if (qCount > MAX_QUESTIONS && !BLOCK_AUTH_RE.test(newContent)) {
      allViolations.push({
        rule: 5,
        code: "BATCH-CAP",
        severity: "BLOCK",
        message: "Change-set touches " + qCount + " question objects (limit: " + MAX_QUESTIONS +
          "). Add BLOCK-AUTHORIZED marker or split into ≤" + MAX_QUESTIONS + " questions."
      });
    }

    // Extract items from new content for structural checks
    const items = extractObjectsFromText(newContent);
    for (const item of items) {
      // RULE 2 (DL-008)
      allViolations.push(...checkDL008(item));
      // RULE 6 (DL-026)
      allViolations.push(...checkDL026(item));
      // RULE 9 (DL-037)
      allViolations.push(...checkDL037(item));
      // RULE 10 (DL-021)
      allViolations.push(...checkDL021(item));
      // RULE 11 (Part2OnlyFlag) — only for P2 source files
      if (isP2Source) {
    allViolations.push(...checkPart2OnlyFlag(item));
    allViolations.push(...checkCognitiveConsistency(item));
      }
      // Cross-part collision
      allViolations.push(...checkCrossPartCollision(item));
    }

    const blockViolations = allViolations.filter(v => v.severity !== "WARN");

    return {
      pass: blockViolations.length === 0,
      violations: allViolations,
    };
  }

  /**
   * Check if a file write should be blocked based on registry rules.
   * @param {string} filePath
   * @param {string} newContent
   * @returns {{ pass: boolean, violations: Array }}
   */
  validateFileWrite(filePath, newContent) {
    const violations = [];
    const fileName = basename(filePath);

    // RULE 3: BLOCK hand-edits to MASTER_QUESTION_REGISTRY_P2.md
    if (/^MASTER_QUESTION_REGISTRY_P2\.md$/i.test(fileName)) {
      violations.push({
        rule: 3,
        code: "REGISTRY-HAND-EDIT",
        severity: "BLOCK",
        message: "MASTER_QUESTION_REGISTRY_P2.md is generated by scripts/build_master_registry_p2.js. " +
          "It must never be hand-edited. Re-run: node scripts/build_master_registry_p2.js"
      });
    }

    // RULE 7: BLOCK hand-edits to derived registries
    if (DERIVED_REGISTRY_RE.test(filePath) &&
        !REGENERATION_SCRIPT_RE.test(newContent || "")) {
      violations.push({
        rule: 7,
        code: "DERIVED-REGISTRY-HAND-EDIT",
        severity: "BLOCK",
        message: fileName + " is a DERIVED registry. It must never be hand-edited. " +
          "Derived registries are regenerated from authoritative sources."
      });
    }

    // RULE 8: BLOCK untracked session package writes
    if (SESSION_PACKAGES_RE.test(filePath)) {
      violations.push({
        rule: 8,
        code: "UNTRACKED-ARTIFACT",
        severity: "BLOCK",
        message: fileName + " — session packages must be registered before writing."
      });
    }

    const blockViolations = violations.filter(v => v.severity !== "WARN");

    return {
      pass: blockViolations.length === 0,
      violations,
    };
  }

  /**
   * Generate a summary report.
   * @returns {object}
   */
  getReport() {
    const byRule = {};
    for (const v of this.violations) {
      const key = "RULE_" + v.rule;
      if (!byRule[key]) byRule[key] = { count: 0, codes: new Set() };
      byRule[key].count++;
      byRule[key].codes.add(v.code);
    }
    // Convert Sets to arrays for JSON serialization
    const summary = {};
    for (const [key, val] of Object.entries(byRule)) {
      summary[key] = { count: val.count, codes: Array.from(val.codes) };
    }

    return {
      totalItemsValidated: this.totalItemsValidated,
      totalItemsViolated: this.totalItemsViolated,
      packsScanned: this.packsScanned,
      totalViolations: this.violations.length,
      blockViolations: this.violations.filter(v => v.severity !== "WARN").length,
      warnViolations: this.violations.filter(v => v.severity === "WARN").length,
      byRule: summary,
    };
  }

  /**
   * Reset internal state (violations, counters).
   */
  reset() {
    this.violations = [];
    this.totalItemsValidated = 0;
    this.totalItemsViolated = 0;
    this.packsScanned = 0;
  }
}

// ── Exports ──────────────────────────────────────────────────────

module.exports = {
  GovernanceGuardP2,

  // Utility functions exported for testing
  extractObjectsFromText,
  extractItemsFromPackFile,
  countQuestions,
  isP2SourceFile,
  basename,

  // Rule checkers exported for testing
  checkDL008,
  checkDL026,
  checkDL037,
  checkDL021,
  checkPart2OnlyFlag,
  checkCrossPartCollision,
  checkP1ExclusiveConcepts,

  // Constants exported for testing
  P2_QID_RE,
  P2_CASEID_RE,
  P2_ITEMID_RE,
  P1_QID_RE,
  P1_CASEID_RE,
  P2_PACK_FILE_RE,
  P2_CASE_FILE_RE,
  P2_SOURCE_FILE_RE,
  PATTERN_NO_AFFIRMATIVE,
  PATTERN_YES_NEGATIVE,
};
