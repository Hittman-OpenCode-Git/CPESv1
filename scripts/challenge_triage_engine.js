#!/usr/bin/env node

/**
 * challenge_triage_engine.js — Board C Session 252
 * Automated challenge triage system for CMA Part 1 Exam Simulator.
 *
 * Usage:
 *   node scripts/challenge_triage_engine.js --all
 *   node scripts/challenge_triage_engine.js --challenge=CH-CC1ECA89
 *
 * Reads: scripts/output/challenge_registry.json and supporting registries
 * Writes: scripts/output/challenge_triage.json
 *
 * READ-ONLY: Does not modify any pack files or governance files.
 */

"use strict";

const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------------------------------

const OUTPUT_DIR = path.resolve(__dirname, "output");
const DATA_DIR = OUTPUT_DIR;
const OUTPUT_FILE = path.join(OUTPUT_DIR, "challenge_triage.json");

const REGISTRY_FILES = [
  "challenge_registry.json",
  "question_history.json",
  "challenge_to_question.json",
  "challenge_to_session.json",
  "challenge_to_recommendation.json",
  "readiness_scoring.json",
  "work_queue.json",
];

// Known defect patterns for keyword matching in challenge descriptions
const DEFECT_KEYWORD_PATTERNS = {
  "DL-008": {
    displayName: "DL-008: ExplanationWrong[CorrectChoice] non-empty",
    patterns: [
      /wrong\s+explanation[\s\S]*correct[\s\S]*answer/i,
      /correct\s+answer[\s\S]*wrong[\s\S]*explanation/i,
      /explanation[\s\S]*(?:shown|displayed)[\s\S]*correct/i,
    ],
    severity: "HIGH",
  },
  "DL-010": {
    displayName: "DL-010: Misassigned choice explanations",
    patterns: [
      /explanation[\s\S]*describes[\s\S]*wrong\s+choice/i,
      /distractor[\s\S]*(?:text|explanation)[\s\S]*wrong\s+option/i,
      /describes[\s\S]*(?:different|wrong)\s+choice/i,
    ],
    severity: "HIGH",
  },
  "DL-013": {
    displayName: "DL-013: Template boilerplate distractor explanations",
    patterns: [
      /plausible\s+misconception/i,
      /generic\s+explanation/i,
      /same\s+explanation[\s\S]*every[\s\S]*choice/i,
      /identical[\s\S]*feedback/i,
    ],
    severity: "HIGH",
  },
  "DL-016": {
    displayName: "DL-016: Metadata-block topic-numbering shift",
    patterns: [
      /explanation[\s\S]*(?:describes|refers\s+to)[\s\S]*(?:different|wrong)[\s\S]*(?:question|topic|choice)/i,
      /distractor[\s\S]*wrong[\s\S]*topic/i,
      /explanation[\s\S]*unrelated/i,
      /feedback[\s\S]*different[\s\S]*question/i,
    ],
    severity: "HIGH",
  },
  "DL-026": {
    displayName: "DL-026: Empty non-CorrectChoice ExplanationWrong slots",
    patterns: [
      /missing[\s\S]*explanation/i,
      /no[\s\S]*(?:feedback|explanation)[\s\S]*(?:shown|displayed)/i,
      /blank[\s\S]*(?:explanation|feedback)/i,
      /empty[\s\S]*(?:explanation|feedback|slot)/i,
      /distractor[\s\S]*(?:no|without)[\s\S]*explanation/i,
      /distractor\s+explanations[\s\S]*missing/i,
    ],
    severity: "HIGH",
  },
  "DL-009": {
    displayName: "DL-009: Incorrect authority citation",
    patterns: [
      /ASC[\s\S]*(?:standard|reference)[\s\S]*(?:wrong|incorrect|doesn['\u2019]t\s+apply)/i,
      /wrong[\s\S]*(?:ASC|standard|IFRS|GAAP)[\s\S]*reference/i,
      /citation[\s\S]*(?:wrong|incorrect)/i,
      /standard[\s\S]*doesn['\u2019]t\s+apply/i,
    ],
    severity: "HIGH",
  },
  "DL-030": {
    displayName: "DL-030: CorrectChoice answer-key errors",
    patterns: [
      /wrong[\s\S]*answer[\s\S]*marked[\s\S]*correct/i,
      /answer[\s\S]*(?:key|shown)[\s\S]*wrong/i,
      /answer\s+doesn['\u2019]t\s+match/i,
      /calculated[\s\S]*(?:differently|different)/i,
      /shouldn['\u2019]t[\s\S]*(?:be|the\s+answer\s+be)/i,
      /my\s+calculation[\s\S]*different/i,
      /answer\s+should\s+be/i,
    ],
    severity: "CRITICAL",
  },
  "DL-031": {
    displayName: "DL-031: Difficulty inflation",
    patterns: [
      /difficulty[\s\S]*(?:too\s+high|wrong|doesn['\u2019]t\s+match|inaccurate)/i,
      /too\s+easy[\s\S]*marked[\s\S]*moderate/i,
      /difficulty[\s\S]*label[\s\S]*doesn['\u2019]t\s+match/i,
    ],
    severity: "HIGH",
  },
  "DL-017": {
    displayName: "DL-017: File corruption / application crash",
    patterns: [
      /app[\s\S]*crash/i,
      /application[\s\S]*crash/i,
      /submit[\s\S]*crash/i,
      /error[\s\S]*when[\s\S]*submit/i,
      /page[\s\S]*(?:crash|broke|error)/i,
    ],
    severity: "HIGH",
  },
};

const USER_ERROR_KEYWORDS = [
  /I\s+thought/i,
  /I\s+calculated/i,
  /shouldn['\u2019]t\s+it\s+be/i,
  /I\s+got/i,
  /my\s+answer/i,
  /I\s+think[\s\S]*(?:correct|right|answer)/i,
  /maybe\s+I['\u2019]m\s+wrong/i,
];

const DEFECT_SEVERITY_MAP = {
  "DL-008": "HIGH",
  "DL-009": "HIGH",
  "DL-010": "HIGH",
  "DL-013": "HIGH",
  "DL-016": "HIGH",
  "DL-017": "HIGH",
  "DL-026": "HIGH",
  "DL-027": "LOW",
  "DL-030": "CRITICAL",
  "DL-031": "MEDIUM",
  "DL-035": "HIGH",
};

const SEVERITY_WEIGHT = {
  CRITICAL: 60,
  HIGH: 45,
  MEDIUM: 25,
  LOW: 10,
};

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------

function loadJSON(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function saveJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function normalizeQidKey(qid) {
  return qid ? qid.trim() : null;
}

function extractSectionFromQid(qid) {
  // Pack A: P1-{section}-NNN → section
  // Pack B: P1B-{section}-NNN → section
  // Pack C: P1-{section}C-NNN → section (e.g., P1-AC-001 → A, P1-EC-001 → E)
  // Pack D: P1-{section}D-NNN → section (e.g., P1-AD-001 → A)
  // Pack E: P1E-{section}-NNN → section
  // Pack E R: P1-{section}-RNN → section
  const m = qid.match(/^P1[B|E]?-([A-F])/i);
  return m ? m[1].toUpperCase() : "?";
}

function extractPackFromQid(qid) {
  if (/^P1-E-/.test(qid) || /^P1-[A-F]-/.test(qid)) return "pack_a";
  if (/^P1B-/.test(qid)) return "pack_b";
  if (/^P1-[A-F]C-/.test(qid)) return "pack_c";
  if (/^P1-[A-F]D-/.test(qid)) return "pack_d";
  if (/^P1E-/.test(qid) || /^P1-[A-F]-R/.test(qid)) return "pack_e";
  return "pack_unknown";
}

function extractTopicCluster(qid) {
  // Extract the topic area from the QID
  // P1-A-001 -> domain A, section A
  // P1-AC-001 -> domain A, section C (Pack C)
  const domain = extractSectionFromQid(qid);
  const pack = extractPackFromQid(qid);
  return `${pack}:${domain}`;
}

// ---------------------------------------------------------------------------
// DATA LOADING
// ---------------------------------------------------------------------------

function loadAllData() {
  const data = {};
  for (const file of REGISTRY_FILES) {
    const filePath = path.join(DATA_DIR, file);
    if (fs.existsSync(filePath)) {
      data[file] = loadJSON(filePath);
    } else {
      console.warn(`WARNING: ${filePath} not found — skipping`);
      data[file] = null;
    }
  }
  return data;
}

// Build indexes from the loaded data
function buildIndexes(data) {
  // readiness_scoring lookup: QID -> readiness entry
  const readinessByQid = {};
  if (data["readiness_scoring.json"] && data["readiness_scoring.json"].items) {
    for (const item of data["readiness_scoring.json"].items) {
      readinessByQid[item.qid] = item;
    }
  }

  // work_queue lookup: QID -> work queue entry
  const workQueueByQid = {};
  if (data["work_queue.json"] && data["work_queue.json"].lanes) {
    for (const laneName of Object.keys(data["work_queue.json"].lanes)) {
      for (const entry of data["work_queue.json"].lanes[laneName]) {
        workQueueByQid[entry.qid] = entry;
      }
    }
  }

  // question_history lookup: QID -> history entry
  const historyByQid = {};
  if (data["question_history.json"] && data["question_history.json"].questions) {
    Object.assign(historyByQid, data["question_history.json"].questions);
  }

  return { readinessByQid, workQueueByQid, historyByQid };
}

// ---------------------------------------------------------------------------
// KEYWORD MATCHING
// ---------------------------------------------------------------------------

/**
 * Match challenge description against defect keyword patterns.
 * Returns an array of defect codes that matched.
 */
function matchDefectKeywords(description) {
  const matched = [];
  for (const [defectCode, entry] of Object.entries(DEFECT_KEYWORD_PATTERNS)) {
    for (const pattern of entry.patterns) {
      if (pattern.test(description)) {
        matched.push(defectCode);
        break;
      }
    }
  }
  return matched;
}

/**
 * Check if the description contains user-error keywords.
 */
function matchUserErrorKeywords(description) {
  for (const pattern of USER_ERROR_KEYWORDS) {
    if (pattern.test(description)) {
      return true;
    }
  }
  return false;
}

// ---------------------------------------------------------------------------
// TRIAGE DECISION ENGINE
// ---------------------------------------------------------------------------

/**
 * Get merged defect codes for a QID from all available sources.
 */
function getMergedDefectCodes(qid, challenge, indexes) {
  const codes = new Set();

  // From challenge's linkedDefects
  if (challenge.linkedDefects) {
    for (const d of challenge.linkedDefects) codes.add(d);
  }

  // From readiness_scoring defect_flags (parse out DL codes)
  const readiness = indexes.readinessByQid[qid];
  if (readiness && readiness.defect_flags) {
    for (const flag of readiness.defect_flags) {
      const dl = flag.match(/DL-0?\d{1,3}/);
      if (dl) codes.add(dl[0]);
    }
  }

  // From work_queue defect_flags
  const wq = indexes.workQueueByQid[qid];
  if (wq && wq.defect_flags) {
    for (const flag of wq.defect_flags) {
      const dl = flag.match(/DL-0?\d{1,3}/);
      if (dl) codes.add(dl[0]);
    }
  }

  // From question_history defectHistory
  const history = indexes.historyByQid[qid];
  if (history && history.defectHistory) {
    for (const d of history.defectHistory) {
      codes.add(d.defectId);
    }
  }

  return [...codes];
}

/**
 * Count challenges for a QID across all statuses.
 */
function countChallengesForQid(qid, challenges) {
  let count = 0;
  let openCount = 0;
  for (const ch of challenges) {
    if (ch.questionId === qid) {
      count++;
      if (ch.status === "OPEN" || ch.status === "INVESTIGATING") {
        openCount++;
      }
    }
  }
  return { total: count, open: openCount };
}

/**
 * Determine the highest severity from a set of defect codes.
 */
function getHighestSeverity(defectCodes) {
  let highest = "LOW";
  for (const code of defectCodes) {
    const sev = DEFECT_SEVERITY_MAP[code] || "LOW";
    if (sev === "CRITICAL") return "CRITICAL";
    if (sev === "HIGH" && highest !== "CRITICAL") highest = "HIGH";
    if (sev === "MEDIUM" && highest !== "CRITICAL" && highest !== "HIGH") highest = "MEDIUM";
  }
  return highest;
}

/**
 * Compute priority score 1-100.
 */
function computePriorityScore(challenge, qidState, defectCodes, challengeCount) {
  let score = 0;

  // Severity weight
  const severity = getHighestSeverity(defectCodes);
  score += SEVERITY_WEIGHT[severity] || 5;

  // Challenge priority
  const priorityWeight = { HIGH: 20, MEDIUM: 10, LOW: 5 };
  score += priorityWeight[challenge.priority] || 5;

  // Certified bonus
  if (qidState === "Certified") score += 20;

  // BLOCKED bonus
  if (qidState === "BLOCKED") score += 15;

  // Cluster bonus
  if (challengeCount.open >= 3) score += 15;
  if (challengeCount.total >= 3) score += 10;

  // Age bonus
  const created = new Date(challenge.createdDate);
  const now = new Date();
  const ageDays = (now - created) / (1000 * 60 * 60 * 24);
  if (ageDays > 30) score += 5;
  if (ageDays > 60) score += 10;

  return Math.min(100, Math.max(5, score));
}

/**
 * Compute confidence score for the triage result.
 */
function computeConfidence(category, defectMatches, keywordMatches, challengeCount, contradictorySignals, linkedMatchExists) {
  let score = 0;

  switch (category) {
    case "LIKELY_DEFECT":
      score = 60; // Base
      score += Math.min(30, defectMatches * 10); // Up to +30 for defect matches
      score += Math.min(15, keywordMatches * 5); // Up to +15 for keyword matches
      if (linkedMatchExists) score += 10; // Linked defect also in readiness
      break;
    case "LIKELY_USER_ERROR":
      score = 50; // Base
      score += Math.min(20, keywordMatches * 10); // Up to +20 for user-error keywords
      if (defectMatches === 0) score += 15; // No defect flags = higher confidence
      break;
    case "NEEDS_REVIEW":
      score = 25; // Base
      if (challengeCount.total === 1) score -= 10; // First-time: lower
      if (contradictorySignals) score -= 5;
      break;
    case "GOVERNANCE_ESCALATION":
      score = 80; // Base
      if (challengeCount.open >= 3) score += 15;
      if (defectMatches >= 2) score += 5;
      break;
  }

  // Contradictory signals reduce confidence
  if (contradictorySignals) score -= 20;

  return Math.min(100, Math.max(5, score));
}

// ---------------------------------------------------------------------------
// MAIN TRIAGE FUNCTION
// ---------------------------------------------------------------------------

function triageChallenge(challenge, indexes, allChallenges) {
  const qid = normalizeQidKey(challenge.questionId);
  const description = challenge.studentDescription || "";
  const readiness = indexes.readinessByQid[qid] || {};
  const history = indexes.historyByQid[qid] || {};
  const wq = indexes.workQueueByQid[qid] || {};

  const qidState = history.currentState || readiness.readinessState || "Unknown";
  const challengeCount = countChallengesForQid(qid, allChallenges);

  // Merge all defect codes from all sources
  const mergedDefectCodes = getMergedDefectCodes(qid, challenge, indexes);

  // Keyword matching
  const keywordDefects = matchDefectKeywords(description);
  const hasUserErrorKeywords = matchUserErrorKeywords(description);

  // Determine which defect codes overlap between challenge's linkedDefects and registry data
  const linkedDefects = challenge.linkedDefects || [];
  const readinessDefectCodes = (readiness.defect_flags || [])
    .map(f => { const m = f.match(/DL-0?\d{1,3}/); return m ? m[0] : null; })
    .filter(Boolean);
  const historyDefectCodes = (history.defectHistory || []).map(d => d.defectId);

  const linkedMatchInReadiness = linkedDefects.some(d => readinessDefectCodes.includes(d));
  const linkedMatchInHistory = linkedDefects.some(d => historyDefectCodes.includes(d));
  const keywordMatchInDefectMap = keywordDefects.some(d => DEFECT_SEVERITY_MAP[d]);

  // Compute defect matches count
  const defectMatches = new Set([...linkedDefects, ...keywordDefects, ...readinessDefectCodes, ...historyDefectCodes]).size;

  // Decision tree
  let category, reason, confidence;

  // GATE 1: Systematic Issue Detection
  if (challengeCount.open >= 3) {
    category = "GOVERNANCE_ESCALATION";
    reason = `Systematic issue: ${challengeCount.open} open challenges on QID ${qid}`;
    confidence = computeConfidence(category, defectMatches, keywordDefects.length, challengeCount, false, linkedMatchInReadiness);
  }
  // GATE 2: Blocked / Critical Certified
  else if (readiness.readinessState === "BLOCKED" && challenge.status === "OPEN") {
    category = "GOVERNANCE_ESCALATION";
    reason = `QID ${qid} is governance-blocked (${readiness.blockReason || "no reason provided"})`;
    confidence = computeConfidence(category, defectMatches, 0, challengeCount, false, linkedMatchInReadiness);
  }
  else if (qidState === "Certified" && keywordDefects.includes("DL-030")) {
    category = "GOVERNANCE_ESCALATION";
    reason = `Certified item with potential DL-030 (CorrectChoice error) — learner-safety risk`;
    confidence = computeConfidence(category, defectMatches, keywordDefects.length, challengeCount, false, linkedMatchInReadiness);
  }
  // GATE 3: Known Defect Match
  else if (linkedMatchInReadiness || linkedMatchInHistory) {
    category = "LIKELY_DEFECT";
    const matchSource = linkedMatchInReadiness ? "readiness_scoring" : "question_history";
    reason = `Challenge linked defects confirmed in ${matchSource}`;
    confidence = computeConfidence(category, defectMatches, keywordDefects.length, challengeCount, false, true);
  }
  else if (keywordMatchInDefectMap) {
    category = "LIKELY_DEFECT";
    const matched = keywordDefects.filter(d => DEFECT_SEVERITY_MAP[d]);
    reason = `Challenge description matches defect pattern for: ${matched.join(", ")}`;
    confidence = computeConfidence(category, defectMatches, keywordDefects.length, challengeCount, false, false);
  }
  // GATE 4: User Error Detection
  else if (hasUserErrorKeywords && mergedDefectCodes.length === 0) {
    category = "LIKELY_USER_ERROR";
    reason = "Description uses student rationale language with no matching structural defects";
    confidence = computeConfidence(category, 0, 1, challengeCount, false, false);
  }
  else if (hasUserErrorKeywords && mergedDefectCodes.length > 0) {
    // Mixed signals: user error keywords + some defect flags
    const hasOnlyLowSeverity = mergedDefectCodes.every(d => (DEFECT_SEVERITY_MAP[d] || "LOW") === "LOW");
    if (hasOnlyLowSeverity) {
      category = "LIKELY_USER_ERROR";
      reason = "User conceptual misunderstanding paired with cosmetic/low-severity defect flags only";
      confidence = computeConfidence(category, 0, 1, challengeCount, false, false);
    } else {
      category = "NEEDS_REVIEW";
      reason = "Mixed signals: user-error language but structural defects present";
      confidence = computeConfidence(category, defectMatches, keywordDefects.length, challengeCount, true, false);
    }
  }
  // GATE 5: Insufficient Data / First-Time
  else if (challengeCount.total === 1 && mergedDefectCodes.length === 0) {
    category = "NEEDS_REVIEW";
    reason = "First-time challenge — no existing defect data to cross-reference";
    confidence = computeConfidence(category, 0, 0, challengeCount, false, false);
  }
  else if (challenge.type === "OTHER" && linkedDefects.length === 0) {
    category = "NEEDS_REVIEW";
    reason = "Unclassified challenge type with no defect linkage — manual investigation required";
    confidence = computeConfidence(category, 0, 0, challengeCount, false, false);
  }
  else {
    category = "NEEDS_REVIEW";
    reason = "Insufficient data to auto-classify";
    confidence = computeConfidence(category, 0, 0, challengeCount, true, false);
  }

  // Compute related QIDs (same topic cluster)
  const topicCluster = extractTopicCluster(qid);
  const relatedQids = allChallenges
    .filter(ch => ch.questionId !== qid && extractTopicCluster(ch.questionId) === topicCluster)
    .map(ch => ch.questionId)
    .filter((v, i, a) => a.indexOf(v) === i);

  // Compute priority score
  const priorityScore = computePriorityScore(challenge, qidState, mergedDefectCodes, challengeCount);

  return {
    challengeId: challenge.challengeId,
    challengeDescription: description,
    questionId: qid,
    challengeType: challenge.type,
    challengeStatus: challenge.status,
    assignedCategory: category,
    confidence,
    reasoning: reason,
    recommendedAction: getRecommendedAction(category),
    relatedDefectCodes: mergedDefectCodes.map(d => d.toString()),
    relatedQIDs: relatedQids,
    priorityScore,
    qidState,
    qidPack: extractPackFromQid(qid),
    qidSection: extractSectionFromQid(qid),
    triageTimestamp: new Date().toISOString(),
  };
}

function getRecommendedAction(category) {
  const actions = {
    LIKELY_DEFECT:
      "Verify defect in source file. If confirmed, add to remediation queue and link to REVISION_HISTORY.md.",
    LIKELY_USER_ERROR:
      "Check if question is correct. If so, close with CONFIRMED_VALID resolution and provide student feedback.",
    NEEDS_REVIEW:
      "Assign to next available reviewer for manual investigation. Check source file, answer key, and explanations.",
    GOVERNANCE_ESCALATION:
      "Flag to governance board. Do not auto-close. Initiate cross-session defect tracking. Update DEFECT_LIBRARY.md.",
  };
  return actions[category] || "Manual investigation required.";
}

function computeSummary(results) {
  const summary = {
    totalTriaged: results.length,
    byCategory: {
      LIKELY_DEFECT: 0,
      LIKELY_USER_ERROR: 0,
      NEEDS_REVIEW: 0,
      GOVERNANCE_ESCALATION: 0,
    },
    bySeverity: {
      CRITICAL: 0,
      HIGH: 0,
      MEDIUM: 0,
      LOW: 0,
    },
    systematicIssues: [],
  };

  const topicClusters = {};
  for (const r of results) {
    summary.byCategory[r.assignedCategory] = (summary.byCategory[r.assignedCategory] || 0) + 1;

    const severity = getHighestSeverity(r.relatedDefectCodes);
    summary.bySeverity[severity] = (summary.bySeverity[severity] || 0) + 1;

    const cluster = extractTopicCluster(r.questionId);
    if (!topicClusters[cluster]) topicClusters[cluster] = { count: 0, qids: [] };
    topicClusters[cluster].count++;
    topicClusters[cluster].qids.push(r.questionId);
  }

  for (const [cluster, data] of Object.entries(topicClusters)) {
    if (data.count >= 3) {
      summary.systematicIssues.push({ cluster, challengeCount: data.count, qids: [...new Set(data.qids)] });
    }
  }

  return summary;
}

// ---------------------------------------------------------------------------
// CLI ENTRY POINT
// ---------------------------------------------------------------------------

function main() {
  const args = process.argv.slice(2);
  const challengeFlag = args.find(a => a.startsWith("--challenge="));
  const allFlag = args.includes("--all");

  if (!challengeFlag && !allFlag) {
    console.error("Usage:");
    console.error("  node scripts/challenge_triage_engine.js --all");
    console.error("  node scripts/challenge_triage_engine.js --challenge=CH-XXXXXXXX");
    process.exit(1);
  }

  console.log("=== Board C Session 252: Challenge Triage Engine ===");
  console.log(`Timestamp: ${new Date().toISOString()}`);
  console.log("");

  // Load data
  console.log("Loading registries...");
  const data = loadAllData();
  const indexes = buildIndexes(data);

  const challengeRegistry = data["challenge_registry.json"];
  if (!challengeRegistry || !challengeRegistry.challenges) {
    console.error("ERROR: challenge_registry.json not found or invalid");
    process.exit(1);
  }

  const allChallenges = challengeRegistry.challenges;
  let targetChallenges;

  if (challengeFlag) {
    const targetId = challengeFlag.split("=")[1].trim();
    targetChallenges = allChallenges.filter(ch => ch.challengeId === targetId);
    if (targetChallenges.length === 0) {
      console.error(`ERROR: Challenge ${targetId} not found in registry`);
      process.exit(1);
    }
    console.log(`Triaging single challenge: ${targetId}`);
  } else {
    targetChallenges = allChallenges.filter(ch => ch.status === "OPEN");
    if (targetChallenges.length === 0) {
      console.log("No OPEN challenges found. Checking INVESTIGATING challenges...");
      targetChallenges = allChallenges.filter(ch => ch.status === "INVESTIGATING");
    }
    console.log(`Triaging ${targetChallenges.length} OPEN challenges...`);
  }

  // Run triage
  const results = [];
  for (const challenge of targetChallenges) {
    try {
      const result = triageChallenge(challenge, indexes, allChallenges);
      results.push(result);
    } catch (err) {
      console.error(`ERROR triaging ${challenge.challengeId}: ${err.message}`);
    }
  }

  // Compute summary
  const summary = computeSummary(results);

  // Build output
  const output = {
    specId: "SESSION252_CHALLENGE_TRIAGE",
    board: "C",
    generatedTimestamp: new Date().toISOString(),
    command: challengeFlag ? `--challenge=${challengeFlag.split("=")[1]}` : "--all",
    results,
    summary,
  };

  // Write output
  saveJSON(OUTPUT_FILE, output);
  console.log(`\nOutput written to: ${OUTPUT_FILE}`);
  console.log(`\n=== Summary ===`);
  console.log(`Total triaged: ${summary.totalTriaged}`);
  for (const [cat, count] of Object.entries(summary.byCategory)) {
    console.log(`  ${cat}: ${count}`);
  }
  console.log(`\nSeverity breakdown:`);
  for (const [sev, count] of Object.entries(summary.bySeverity)) {
    if (count > 0) console.log(`  ${sev}: ${count}`);
  }
  if (summary.systematicIssues.length > 0) {
    console.log(`\nSystematic Issues (3+ challenges per cluster):`);
    for (const issue of summary.systematicIssues) {
      console.log(`  ${issue.cluster}: ${issue.challengeCount} challenges — QIDs: ${issue.qids.join(", ")}`);
    }
  }

  // Print per-challenge detail
  console.log(`\n=== Individual Results ===`);
  for (const r of results) {
    const catSymbol = { LIKELY_DEFECT: "[BUG]", LIKELY_USER_ERROR: "[USER]", NEEDS_REVIEW: "[EYE]", GOVERNANCE_ESCALATION: "[FLAG]" }[r.assignedCategory] || "[?]";
    console.log(`${catSymbol} ${r.challengeId} | QID: ${r.questionId} | ${r.assignedCategory} (${r.confidence}%) | Priority: ${r.priorityScore}`);
    console.log(`    Reason: ${r.reasoning}`);
    if (r.relatedQIDs.length > 0) {
      console.log(`    Related QIDs: ${r.relatedQIDs.join(", ")}`);
    }
  }
}

main();
