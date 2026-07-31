/**
 * Part 2 Blueprint Validator — CMA Part 2 Exam Simulator
 *
 * Validates Part 2 content against the CMA Part 2 Content Specification Outline.
 * Checks domain tags, LOS mapping, topic coverage, cognitive-level alignment,
 * metadata completeness, Part2OnlyFlag enforcement, and P1-concept exclusion.
 *
 * Extends the Part 1 Validator base class with Part 2-specific taxonomy.
 * Handles both pack_p2_*.js MCQ files and case_pack_p2_*.js case files.
 *
 * Gracefully handles the pre-authoring state: if no Part 2 files exist yet,
 * reports as informational (PASS with zero items) rather than failing.
 *
 * Dependencies:
 *   - foundation/P2001_PART2_BLUEPRINT_FOUNDATION.md (authoritative blueprint)
 *   - foundation/FORMULA_MASTER_P2.md (formula authority)
 *   - p2/P2003_QID_STANDARD.md (QID format spec)
 *   - scripts/validators/Validator.js (base class)
 *   - scripts/lib/CaseExtractor.js (shared case extraction)
 */

"use strict";

const path = require("path");
const fs = require("fs");
const Validator = require("./Validator");
const config = require("../config");
const CaseExtractor = require("../lib/CaseExtractor");

// ── Part 2 Taxonomy (from P2001_PART2_BLUEPRINT_FOUNDATION.md) ────────

const P2_SECTION_TO_DOMAIN = {
  "A": "Financial Statement Analysis",
  "B": "Corporate Finance",
  "C": "Decision Analysis",
  "D": "Risk Management",
  "E": "Investment Decisions",
  "F": "Professional Ethics"
};

const P2_DOMAIN_TO_SECTION = {
  "Financial Statement Analysis": "A",
  "Corporate Finance": "B",
  "Decision Analysis": "C",
  "Risk Management": "D",
  "Investment Decisions": "E",
  "Professional Ethics": "F"
};

const P2_VALID_SECTIONS = ["A", "B", "C", "D", "E", "F"];

const P2_DOMAIN_TOPICS = {
  "Financial Statement Analysis": [
    "Ratio Analysis", "Liquidity Ratios", "Leverage Ratios", "Activity Ratios",
    "Profitability Ratios", "Market Ratios", "DuPont Analysis",
    "Horizontal Analysis", "Vertical Analysis", "Trend Analysis",
    "Earnings Quality", "Operating Leverage", "Financial Leverage",
    "Sustainable Growth Rate", "Comparative Analysis"
  ],
  "Corporate Finance": [
    "Risk and Return", "CAPM", "Cost of Capital", "WACC",
    "Working Capital Management", "Cash Conversion Cycle",
    "Capital Structure", "Dividend Policy", "International Finance",
    "Foreign Exchange", "Effective Annual Rate", "EOQ"
  ],
  "Decision Analysis": [
    "Cost-Volume-Profit Analysis", "Breakeven Analysis", "Target Profit",
    "Multi-Product CVP", "Marginal Analysis", "Special Orders",
    "Make-or-Buy Decisions", "Sell-or-Process-Further",
    "Relevant Costing", "Pricing Decisions", "Transfer Pricing",
    "Expected Value", "Value of Perfect Information"
  ],
  "Risk Management": [
    "COSO ERM 2017", "Risk Identification", "Risk Assessment",
    "Risk Response", "Inherent Risk", "Residual Risk",
    "ERM Integration", "Strategic Risk", "Operational Risk",
    "Financial Risk", "Hazard Risk", "Risk Appetite"
  ],
  "Investment Decisions": [
    "Net Present Value", "Internal Rate of Return", "Payback Period",
    "Discounted Payback", "Profitability Index", "Capital Rationing",
    "After-Tax Cash Flow", "MACRS Depreciation", "Real Options",
    "Equivalent Annual Annuity", "Accounting Rate of Return"
  ],
  "Professional Ethics": [
    "IMA Ethical Standards", "Competence", "Confidentiality",
    "Integrity", "Credibility", "Ethical Decision Model",
    "Fraud Triangle", "SOX 2002", "FCPA", "Audit Committee",
    "Corporate Governance", "International Ethics"
  ]
};

// Bloom's targets per domain (from P2001)
const P2_BLOOM_TARGETS = {
  "Financial Statement Analysis": { Remember: 0.10, Understand: 0.20, Apply: 0.45, Analyze: 0.20, Evaluate: 0.05 },
  "Corporate Finance":           { Remember: 0.10, Understand: 0.20, Apply: 0.50, Analyze: 0.15, Evaluate: 0.05 },
  "Decision Analysis":           { Remember: 0.05, Understand: 0.15, Apply: 0.50, Analyze: 0.20, Evaluate: 0.10 },
  "Risk Management":             { Remember: 0.20, Understand: 0.35, Apply: 0.25, Analyze: 0.15, Evaluate: 0.05 },
  "Investment Decisions":        { Remember: 0.10, Understand: 0.15, Apply: 0.55, Analyze: 0.15, Evaluate: 0.05 },
  "Professional Ethics":         { Remember: 0.25, Understand: 0.30, Apply: 0.25, Analyze: 0.15, Evaluate: 0.05 }
};

// P1-exclusive concept patterns — WARN if found in P2 items
const P1_EXCLUSIVE_PATTERNS = [
  { pattern: /\bstandard\s+costing\s+variance\b/i, concept: "Standard costing variances" },
  { pattern: /\bprocess\s+costing\b/i, concept: "Process costing" },
  { pattern: /\bjob\s+order\s+costing\b/i, concept: "Job order costing" },
  { pattern: /\bjoint\s+product\s+cost\s+allocation\b/i, concept: "Joint product cost allocation" },
  { pattern: /\bservice\s+department\s+allocation\b/i, concept: "Service department allocation" },
  { pattern: /\bCOSO\s+Internal\s+Control\s*Framework\b(?!.*\bERM\b)/i, concept: "COSO IC 2013 (Part 1)" },
  { pattern: /\btechnology\s+and\s+analytics\b/i, concept: "Technology and Analytics (Part 1 domain F)" },
  { pattern: /\bdata\s+governance\b/i, concept: "Data governance (Part 1 topic)" },
];

// Part 2 formula IDs (from FORMULA_MASTER_P2.md)
const P2_FORMULA_IDS = [
  "FA-01", "FA-02", "FA-03", "FA-04", "FA-05", "FA-06", "FA-07",
  "FA-08", "FA-09", "FA-10", "FA-11", "FA-12", "FA-13", "FA-14",
  "FA-15", "FA-16", "FA-17", "FA-18", "FA-19", "FA-20", "FA-21",
  "CF-01", "CF-02", "CF-03", "CF-04", "CF-05", "CF-06", "CF-07", "CF-08", "CF-09",
  "DA-01", "DA-02", "DA-03", "DA-04", "DA-05", "DA-06", "DA-07", "DA-08", "DA-09", "DA-10", "DA-11",
  "RM-01", "RM-02", "RM-03",
  "ID-01", "ID-02", "ID-03", "ID-04", "ID-05", "ID-06", "ID-07", "ID-08"
];

// P2 QID format
const P2_QID_RE = /^P2-[A-F]-\d{3}$/;
const P2_CASEID_RE = /^CBQ2\d*-[A-F]\d+$/;
const P2_ITEMID_RE = /^CBQ2\d*-[A-F]\d*-Q\d+$/;

// ── Validator Class ───────────────────────────────────────────────

class Part2BlueprintValidator extends Validator {
  constructor() {
    super("Part 2 Blueprint Validator");
    this.p2FormulaSet = new Set(P2_FORMULA_IDS);
  }

  validate() {
    this.start();
    const root = config.paths.root;
    let totalItems = 0;
    let totalCases = 0;
    const domainItemCounts = {};
    const domainBloomCounts = {};

    // ── Scan P2 MCQ pack files ──────────────────────────────────
    const mcqFiles = this._findP2MCQFiles(root);
    if (mcqFiles.length === 0) {
      this.addStatistic("P2 MCQ Packs Found", 0);
      this.addWarning("No Part 2 MCQ pack files (pack_p2_*.js) found. Validator passes clean for pre-authoring state.");
    } else {
      this.addStatistic("P2 MCQ Packs Found", mcqFiles.length);
      for (const file of mcqFiles) {
        const fullPath = path.join(root, file);
        const content = fs.readFileSync(fullPath, "utf8");
        const items = this._extractP2Questions(content, file);
        if (!items) continue;

        items.forEach((item, idx) => {
          totalItems++;
          this._validateP2MCQ(item, file, idx);
          this._trackDomainAndBloom(item, domainItemCounts, domainBloomCounts);
          this._checkP1Exclusion(item, file, idx);
        });
      }
    }

    // ── Scan P2 case pack files ─────────────────────────────────
    const caseFiles = this._findP2CaseFiles(root);
    if (caseFiles.length === 0) {
      this.addStatistic("P2 Case Packs Found", 0);
    } else {
      this.addStatistic("P2 Case Packs Found", caseFiles.length);
      for (const file of caseFiles) {
        const fullPath = path.join(root, file);
        const content = fs.readFileSync(fullPath, "utf8");
        const cases = CaseExtractor.extractFromContent(content);
        if (!cases) continue;

        cases.forEach((c, caseIdx) => {
          totalCases++;
          this._validateP2Case(c, file, caseIdx);
          if (c.Items && Array.isArray(c.Items)) {
            c.Items.forEach((item, itemIdx) => {
              totalItems++;
              this._validateP2CaseItem(item, c, file, caseIdx, itemIdx);
              this._trackDomainAndBloom(item, domainItemCounts, domainBloomCounts, c);
              this._checkP1Exclusion(item, file, `${caseIdx}-${itemIdx}`, c);
            });
          }
        });
      }
    }

    // ── Statistics ──────────────────────────────────────────────
    this.addStatistic("P2 Items Checked", totalItems);
    this.addStatistic("P2 Cases Checked", totalCases);

    Object.keys(domainItemCounts).sort().forEach(d => {
      this.addStatistic(`P2 Domain: ${d}`, domainItemCounts[d]);
    });

    // ── Cross-object checks ─────────────────────────────────────
    this._checkDomainCoverage(domainItemCounts);
    this._checkBloomAlignment(domainBloomCounts, domainItemCounts);

    this.finish();
    return this.report();
  }

  // ── File Discovery ────────────────────────────────────────────

  _findP2MCQFiles(root) {
    const files = [];
    for (const section of P2_VALID_SECTIONS) {
      const fname = `pack_p2_${section.toLowerCase()}.js`;
      const fp = path.join(root, fname);
      if (fs.existsSync(fp)) files.push(fname);
    }
    return files;
  }

  _findP2CaseFiles(root) {
    const files = [];
    for (let i = 1; i <= 3; i++) {
      const fname = `case_pack_p2_${i}.js`;
      const fp = path.join(root, fname);
      if (fs.existsSync(fp)) files.push(fname);
    }
    return files;
  }

  // ── Extraction ────────────────────────────────────────────────

  _extractP2Questions(content, filename) {
    // Find variable assignment: const MCQ_BANK_P2_X = [
    const varMatch = content.match(/(?:const|let|var)\s+(\w+)\s*=\s*\[/);
    if (!varMatch) {
      this.addWarning(`${filename}: Could not find MCQ bank array assignment`);
      return null;
    }
    const arrStart = varMatch.index + varMatch[0].length - 1;
    let depth = 1;
    let pos = arrStart + 1;
    let inString = false, stringChar = "", escape = false;

    while (depth > 0 && pos < content.length) {
      const ch = content[pos];
      if (escape) { escape = false; pos++; continue; }
      if (inString) {
        if (ch === "\\") { escape = true; }
        else if (ch === stringChar) { inString = false; stringChar = ""; }
        pos++; continue;
      }
      if (ch === '"' || ch === "'") { inString = true; stringChar = ch; pos++; continue; }
      if (ch === "[") depth++;
      else if (ch === "]") depth--;
      pos++;
    }

    if (depth !== 0) {
      this.addError(`${filename}: Could not find matching closing bracket for MCQ array`);
      return null;
    }

    const arrText = content.substring(arrStart, pos);
    let items = null;
    try { items = JSON.parse(arrText); }
    catch (e) {
      try { items = new Function("return (" + arrText + ")")(); }
      catch (e2) {
        this.addError(`${filename}: Failed to parse MCQ array: ${e2.message}`);
        return null;
      }
    }
    return Array.isArray(items) ? items : null;
  }

  // ── MCQ Validation ────────────────────────────────────────────

  _validateP2MCQ(item, filename, idx) {
    const qid = item.QuestionID || "(unknown)";
    const prefix = `${filename}[${idx}] (${qid})`;

    // Required fields
    if (!item.Part || item.Part !== 2) {
      this.addError(`${prefix}: Part field missing or not 2 (got ${item.Part})`);
    }

    if (!item.Section || !P2_VALID_SECTIONS.includes(item.Section)) {
      this.addError(`${prefix}: Section missing or invalid "${item.Section}" — must be A-F`);
    }

    if (!item.QuestionID) {
      this.addError(`${prefix}: Missing QuestionID`);
    } else if (!P2_QID_RE.test(item.QuestionID)) {
      this.addError(`${prefix}: QuestionID "${item.QuestionID}" does not match P2-{Section}-{NNN} format`);
    }

    if (item.Part2OnlyFlag !== true) {
      this.addError(`${prefix}: Part2OnlyFlag must be true (got ${item.Part2OnlyFlag}) — Rule 11`);
    }

    // Blueprint domain validation
    if (item.Section && P2_SECTION_TO_DOMAIN[item.Section]) {
      const expectedDomain = P2_SECTION_TO_DOMAIN[item.Section];
      if (item.BlueprintDomain && item.BlueprintDomain !== expectedDomain) {
        this.addWarning(
          `${prefix}: Section "${item.Section}" maps to "${expectedDomain}" but BlueprintDomain is "${item.BlueprintDomain}"`
        );
      }
    }

    // Topic domain alignment
    if (item.Topic && item.Section) {
      const domain = P2_SECTION_TO_DOMAIN[item.Section];
      const domainTopicList = P2_DOMAIN_TOPICS[domain];
      if (domainTopicList) {
        const topicMatches = domainTopicList.some(t =>
          item.Topic.toLowerCase().includes(t.toLowerCase())
        );
        if (!topicMatches) {
          this.addWarning(
            `${prefix}: Topic "${item.Topic}" may not align with domain "${domain}". Available topics: [${domainTopicList.join(", ")}]`
          );
        }
      }
    }

    // Cognitive level validation
    if (!item.CognitiveLevel) {
      this.addWarning(`${prefix}: Missing CognitiveLevel`);
    } else if (!["Remember", "Understand", "Apply", "Analyze", "Evaluate"].includes(item.CognitiveLevel)) {
      this.addError(`${prefix}: Invalid CognitiveLevel "${item.CognitiveLevel}"`);
    }

    // Difficulty validation
    if (!item.Difficulty) {
      this.addWarning(`${prefix}: Missing Difficulty`);
    } else if (!["Easy", "Moderate", "Difficult", "Very Difficult"].includes(item.Difficulty)) {
      this.addError(`${prefix}: Invalid Difficulty "${item.Difficulty}"`);
    }

    if (item.DifficultyScore === undefined || item.DifficultyScore === null) {
      this.addWarning(`${prefix}: Missing DifficultyScore`);
    } else if (!Number.isInteger(item.DifficultyScore) || item.DifficultyScore < 1 || item.DifficultyScore > 5) {
      this.addError(`${prefix}: DifficultyScore must be integer 1-5 (got ${item.DifficultyScore})`);
    }

    // Rule 11 — cognitive-difficulty mismatch (AF-5)
    if (item.CognitiveLevel === "Evaluate" && item.DifficultyScore !== undefined && item.DifficultyScore < 3) {
      this.addError(
        `${prefix}: CognitiveLevel "Evaluate" requires DifficultyScore >= 3 (got ${item.DifficultyScore}) — Rule 11 AF-5`
      );
    }
    if (item.CognitiveLevel === "Analyze" && item.DifficultyScore === 1) {
      this.addError(
        `${prefix}: CognitiveLevel "Analyze" requires DifficultyScore >= 2 (got 1) — Rule 11 AF-5`
      );
    }

    // question_state
    if (!item.question_state) {
      this.addWarning(`${prefix}: Missing question_state`);
    } else if (!["Unprocessed", "In Audit", "Editorial Queue", "Certified", "Archived"].includes(item.question_state)) {
      this.addError(`${prefix}: Invalid question_state "${item.question_state}"`);
    }

    // Choices structure
    if (!item.Choices || typeof item.Choices !== "object") {
      this.addError(`${prefix}: Missing or invalid Choices object`);
    } else {
      for (const letter of ["A", "B", "C", "D"]) {
        if (!item.Choices[letter]) {
          this.addError(`${prefix}: Missing Choices.${letter}`);
        }
      }
    }

    // CorrectChoice
    if (!item.CorrectChoice || !["A", "B", "C", "D"].includes(item.CorrectChoice)) {
      this.addError(`${prefix}: Missing or invalid CorrectChoice "${item.CorrectChoice}"`);
    }

    // Explanation fields
    if (!item.ExplanationCorrect) {
      this.addError(`${prefix}: Missing ExplanationCorrect`);
    } else if (item.ExplanationCorrect.length < 50) {
      this.addWarning(`${prefix}: ExplanationCorrect too short (${item.ExplanationCorrect.length} chars, minimum 50)`);
    }

    // DL-008 check
    if (item.CorrectChoice) {
      const ewCC = item["ExplanationWrong" + item.CorrectChoice];
      if (ewCC !== undefined && ewCC !== "") {
        this.addError(
          `${prefix}: DL-008 — ExplanationWrong${item.CorrectChoice} is non-empty (must be "")`
        );
      }
    }

    // DL-026 / DL-021 check
    if (item.CorrectChoice) {
      for (const letter of ["A", "B", "C", "D"]) {
        if (letter === item.CorrectChoice) continue;
        const ewKey = "ExplanationWrong" + letter;
        if (!(ewKey in item)) {
          this.addError(`${prefix}: DL-021 — ${ewKey} is absent`);
        } else if (typeof item[ewKey] === "string" && item[ewKey].length === 0) {
          this.addError(`${prefix}: DL-026 — ${ewKey} is empty (distractor must have content)`);
        } else if (typeof item[ewKey] === "string" && item[ewKey].length < 50) {
          this.addWarning(`${prefix}: ${ewKey} too short (${item[ewKey].length} chars, minimum 50)`);
        }
      }
    }

    // Formula reference check
    if (item.FormulaReference) {
      const formulaId = item.FormulaReference.split(":")[0].trim();
      if (formulaId.match(/^(FA|CF|DA|RM|ID)-\d{2}$/) && !this.p2FormulaSet.has(formulaId)) {
        this.addWarning(`${prefix}: FormulaReference "${formulaId}" is not a recognized Part 2 formula ID`);
      }
    }

    // DL-013 boilerplate check
    if (item.ExplanationCorrect && /represents a plausible misconception/i.test(item.ExplanationCorrect)) {
      this.addWarning(`${prefix}: ExplanationCorrect contains DL-013 boilerplate text`);
    }
    for (const letter of ["A", "B", "C", "D"]) {
      const ewKey = "ExplanationWrong" + letter;
      if (item[ewKey] && /represents a plausible misconception/i.test(item[ewKey])) {
        this.addWarning(`${prefix}: ${ewKey} contains DL-013 boilerplate text`);
      }
    }

    // CalculationItem consistency
    if (item.CalculationItem === true) {
      if (!item.FormulaReference) {
        this.addWarning(`${prefix}: CalculationItem is true but no FormulaReference provided`);
      }
    }

    // VerifiedChecks
    if (!item.VerifiedChecks || !Array.isArray(item.VerifiedChecks) || item.VerifiedChecks.length === 0) {
      this.addWarning(`${prefix}: Missing or empty VerifiedChecks`);
    }

    // P1 QID collision
    if (item.QuestionID && /^P1-/.test(item.QuestionID)) {
      this.addError(`${prefix}: P1 QID format detected in Part 2 file — cross-part collision`);
    }
  }

  // ── Case Validation ───────────────────────────────────────────

  _validateP2Case(c, filename, caseIdx) {
    const caseID = c.CaseID || "(unknown)";
    const prefix = `${filename}[${caseIdx}] (${caseID})`;

    if (!c.CaseID) {
      this.addError(`${prefix}: Missing CaseID`);
    } else if (!P2_CASEID_RE.test(c.CaseID)) {
      this.addError(`${prefix}: CaseID "${c.CaseID}" does not match CBQ2{Pack}-{Section}{Seq} format`);
    }

    if (!c.SectionTags || !Array.isArray(c.SectionTags) || c.SectionTags.length === 0) {
      this.addError(`${prefix}: Missing or empty SectionTags`);
    } else {
      c.SectionTags.forEach(tag => {
        if (!P2_VALID_SECTIONS.includes(tag)) {
          this.addError(`${prefix}: Invalid SectionTag "${tag}" — must be A-F`);
        }
      });
    }

    if (!c.BlueprintDomain) {
      this.addWarning(`${prefix}: Missing BlueprintDomain`);
    } else if (!P2_DOMAIN_TO_SECTION[c.BlueprintDomain]) {
      this.addError(`${prefix}: BlueprintDomain "${c.BlueprintDomain}" is not a recognized Part 2 domain`);
    }

    if (c.SectionTags && c.SectionTags.length === 1 && c.BlueprintDomain) {
      const expectedDomain = P2_SECTION_TO_DOMAIN[c.SectionTags[0]];
      if (c.BlueprintDomain !== expectedDomain) {
        this.addWarning(
          `${prefix}: SectionTag "${c.SectionTags[0]}" expected "${expectedDomain}", got "${c.BlueprintDomain}"`
        );
      }
    }

    if (!c.BlueprintObjectives || !Array.isArray(c.BlueprintObjectives) || c.BlueprintObjectives.length === 0) {
      this.addWarning(`${prefix}: Missing or empty BlueprintObjectives`);
    }

    if (!c.Items || !Array.isArray(c.Items) || c.Items.length === 0) {
      this.addError(`${prefix}: Missing or empty Items array`);
    } else if (c.Items.length < 5 || c.Items.length > 7) {
      this.addWarning(`${prefix}: Case has ${c.Items.length} items (expected 5-7)`);
    }

    if (!c.Exhibits || !Array.isArray(c.Exhibits) || c.Exhibits.length === 0) {
      this.addWarning(`${prefix}: Missing or empty Exhibits array`);
    }

    if (c.QuestionCount && c.Items && c.QuestionCount !== c.Items.length) {
      this.addError(`${prefix}: QuestionCount (${c.QuestionCount}) does not match Items.length (${c.Items.length})`);
    }

    if (c.ExhibitCount && c.Exhibits && c.ExhibitCount !== c.Exhibits.length) {
      this.addError(`${prefix}: ExhibitCount (${c.ExhibitCount}) does not match Exhibits.length (${c.Exhibits.length})`);
    }

    // P1 CaseID collision
    if (c.CaseID && /^CBQ\d*-[A-F]\d+$/.test(c.CaseID) && !/^CBQ2/.test(c.CaseID)) {
      this.addError(`${prefix}: P1 CaseID format detected — cross-part collision (use CBQ2 prefix)`);
    }
  }

  _validateP2CaseItem(item, c, filename, caseIdx, itemIdx) {
    const itemID = item.ItemID || "(unknown)";
    const prefix = `${filename}[${caseIdx}][${itemIdx}] (${itemID})`;

    if (!item.ItemID) {
      this.addError(`${prefix}: Missing ItemID`);
    } else if (!P2_ITEMID_RE.test(item.ItemID)) {
      this.addError(`${prefix}: ItemID "${item.ItemID}" does not match P2 format`);
    }

    if (!item.Type) {
      this.addError(`${prefix}: Missing Type`);
    } else if (!["numeric", "select", "multi", "fill", "match"].includes(item.Type)) {
      this.addError(`${prefix}: Invalid Type "${item.Type}"`);
    }

    if (!item.CognitiveLevel) {
      this.addWarning(`${prefix}: Missing CognitiveLevel`);
    }

    if (!item.Difficulty) {
      this.addWarning(`${prefix}: Missing Difficulty`);
    }

    if (!item.Topic) {
      this.addWarning(`${prefix}: Missing Topic`);
    }

    if (!item.Explanation || item.Explanation.length < 50) {
      this.addWarning(`${prefix}: Explanation missing or too short (${item.Explanation ? item.Explanation.length : 0} chars)`);
    }
  }

  // ── Tracking ───────────────────────────────────────────────────

  _trackDomainAndBloom(item, domainCounts, bloomCounts, c) {
    let section = item.Section;
    if (!section && c && c.SectionTags && c.SectionTags.length > 0) {
      section = c.SectionTags[0];
    }
    if (!section) return;
    const domain = P2_SECTION_TO_DOMAIN[section];
    if (!domain) return;

    domainCounts[domain] = (domainCounts[domain] || 0) + 1;

    const cogLevel = item.CognitiveLevel || "Unassigned";
    if (cogLevel === "Unassigned") return;
    if (!bloomCounts[domain]) bloomCounts[domain] = {};
    bloomCounts[domain][cogLevel] = (bloomCounts[domain][cogLevel] || 0) + 1;
  }

  // ── P1 Exclusion ──────────────────────────────────────────────

  _checkP1Exclusion(item, filename, idx, c) {
    const qid = item.QuestionID || item.ItemID || "(unknown)";
    const prefix = `${filename}[${idx}] (${qid})`;
    const searchText = [
      item.Stem || item.Prompt || "",
      item.ExplanationCorrect || item.Explanation || "",
      ...(item.Choices ? Object.values(item.Choices) : []),
      ...(item.ExplanationWrongA ? [item.ExplanationWrongA] : []),
      ...(item.ExplanationWrongB ? [item.ExplanationWrongB] : []),
      ...(item.ExplanationWrongC ? [item.ExplanationWrongC] : []),
      ...(item.ExplanationWrongD ? [item.ExplanationWrongD] : []),
    ].join(" ");

    for (const { pattern, concept } of P1_EXCLUSIVE_PATTERNS) {
      if (pattern.test(searchText)) {
        this.addWarning(`${prefix}: References Part 1 concept "${concept}" — verify this is Part 2 material`);
      }
    }
  }

  // ── Cross-Object Checks ───────────────────────────────────────

  _checkDomainCoverage(domainCounts) {
    const totalItems = Object.values(domainCounts).reduce((a, b) => a + b, 0);
    if (totalItems === 0) return;

    for (const [section, domain] of Object.entries(P2_SECTION_TO_DOMAIN)) {
      const count = domainCounts[domain] || 0;
      if (count === 0) {
        this.addWarning(`Domain ${section} — "${domain}": 0 items. Blueprint gap — 0% coverage.`);
      }
    }
  }

  _checkBloomAlignment(bloomCounts, domainCounts) {
    for (const [domain, counts] of Object.entries(bloomCounts)) {
      const total = domainCounts[domain] || 1;
      const targets = P2_BLOOM_TARGETS[domain];
      if (!targets) continue;

      for (const [level, targetPct] of Object.entries(targets)) {
        const actual = (counts[level] || 0) / total;
        const deviation = Math.abs(actual - targetPct);
        if (deviation > 0.25) {
          this.addWarning(
            `Domain "${domain}" — CognitiveLevel "${level}" is at ${(actual * 100).toFixed(1)}% ` +
            `(target: ${(targetPct * 100).toFixed(0)}%, deviation: ${(deviation * 100).toFixed(1)}%)`
          );
        }
      }
    }
  }
}

module.exports = Part2BlueprintValidator;
