#!/usr/bin/env node

// ============================================================
// Session Intelligence Engine — Board F Session 252
// Maps development session relationships to questions,
// challenges, recommendations, and certification events.
//
// Usage:
//   node scripts/session_intelligence_engine.js --session=S319
//   node scripts/session_intelligence_engine.js --all
//   node scripts/session_intelligence_engine.js --summary
//
// Reads from scripts/output/session_registry.json and
// supporting registries. Writes session_intelligence.json.
//
// READ-ONLY: Does not modify any pack files or governance files.
// ============================================================

"use strict";

const fs = require("fs");
const path = require("path");

// ── Constants ─────────────────────────────────────────────────
const OUTPUT_DIR = path.join(__dirname, "output");
const REGISTRY_FILE = path.join(OUTPUT_DIR, "session_registry.json");
const HISTORY_FILE = path.join(OUTPUT_DIR, "question_history.json");
const CHALLENGE_REGISTRY_FILE = path.join(OUTPUT_DIR, "challenge_registry.json");
const CHALLENGE_TO_SESSION_FILE = path.join(OUTPUT_DIR, "challenge_to_session.json");
const RECOMMENDATION_FILE = path.join(OUTPUT_DIR, "recommendation_registry.json");
const CERT_WAVES_FILE = path.join(OUTPUT_DIR, "certification_waves.json");
const QID_TO_SESSION_FILE = path.join(OUTPUT_DIR, "question_to_session_index.json");

const SPEC_FILE = path.join(OUTPUT_DIR, "SESSION252_SESSION_INTELLIGENCE_SPEC.json");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "session_intelligence.json");

const HEALTH_TIERS = [
  { tier: "HEALTHY", min: 90, max: 100 },
  { tier: "FAIR", min: 70, max: 89 },
  { tier: "NEEDS_ATTENTION", min: 40, max: 69 },
  { tier: "CRITICAL", min: 0, max: 39 }
];

// QID regex patterns for extracting section from various formats
const QID_PATTERNS = [
  { regex: /^P1B-([A-F])-\d+$/, pack: "pack_b", sectionGroup: 1 },
  { regex: /^P1E-([A-F])-\d+$/, pack: "pack_e", sectionGroup: 1 },
  { regex: /^P1-([A-F])C-\d+$/, pack: "pack_c", sectionGroup: 1 },
  { regex: /^P1-([A-F])D-\d+$/, pack: "pack_d", sectionGroup: 1 },
  { regex: /^P1-([A-F])-\d+$/, pack: "pack_a", sectionGroup: 1 },
  { regex: /^P1E-([A-F])-R\d+$/, pack: "pack_e", sectionGroup: 1 },
  { regex: /^P1-([A-F])-R\d+$/, pack: "pack_e", sectionGroup: 1 }
];

// ── CLI Argument Parsing ──────────────────────────────────────
function parseArgs(argv) {
  const args = { mode: null, target: null, help: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--all") {
      args.mode = "all";
    } else if (a === "--summary") {
      args.mode = "summary";
    } else if (a.startsWith("--session=")) {
      args.mode = "single";
      args.target = a.slice("--session=".length);
    } else if (a === "--help" || a === "-h") {
      args.help = true;
    }
  }
  return args;
}

function printHelp() {
  console.log([
    "Session Intelligence Engine — Board F Session 252",
    "",
    "Usage:",
    "  node scripts/session_intelligence_engine.js --session=SESSION_ID",
    "  node scripts/session_intelligence_engine.js --all",
    "  node scripts/session_intelligence_engine.js --summary",
    "",
    "  --session=SESSION_ID   Analyze a single development session",
    "  --all                  Analyze all 98 sessions",
    "  --summary              Produce aggregate statistics across all sessions",
    "",
    "Output: scripts/output/session_intelligence.json"
  ].join("\n"));
}

// ── File I/O ──────────────────────────────────────────────────
function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    console.error(`ERROR: Failed to load ${filePath}: ${err.message}`);
    return null;
  }
}

function saveJSON(filePath, data) {
  data.generatedTimestamp = new Date().toISOString();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Wrote: ${filePath}`);
}

// ── QID Parsing ───────────────────────────────────────────────
function parseQid(qid) {
  for (const pattern of QID_PATTERNS) {
    const m = qid.match(pattern.regex);
    if (m) {
      return { pack: pattern.pack, section: m[pattern.sectionGroup] || "?" };
    }
  }
  return { pack: "unknown", section: "?" };
}

// ── Data Loading ──────────────────────────────────────────────
function loadAllData() {
  const sessionRegistry = loadJSON(REGISTRY_FILE);
  const questionHistory = loadJSON(HISTORY_FILE);
  const challengeRegistry = loadJSON(CHALLENGE_REGISTRY_FILE);
  const challengeToSession = loadJSON(CHALLENGE_TO_SESSION_FILE);
  const recommendationRegistry = loadJSON(RECOMMENDATION_FILE);
  const certWaves = loadJSON(CERT_WAVES_FILE);

  if (!sessionRegistry || !questionHistory) {
    console.error("FATAL: Could not load core data files.");
    process.exit(1);
  }

  return {
    sessions: sessionRegistry.sessions || [],
    seriesIndex: sessionRegistry.seriesIndex || {},
    questions: questionHistory.questions || {},
    questionSummary: questionHistory.summary || {},
    challenges: (challengeRegistry && challengeRegistry.challenges) ? challengeRegistry.challenges : [],
    challengeToSession: challengeToSession || {},
    recommendations: (recommendationRegistry && recommendationRegistry.recommendations) ? recommendationRegistry.recommendations : [],
    certWaves: (certWaves && certWaves.waves) ? certWaves.waves : []
  };
}

// ── Question Metadata Lookup ──────────────────────────────────
function getQuestionMeta(qid, questions) {
  const q = questions[qid];
  if (q) {
    return {
      found: true,
      currentState: q.currentState || "Unknown",
      pack: q.pack || parseQid(qid).pack,
      section: q.section || parseQid(qid).section,
      difficulty: q.difficulty || "Unknown",
      difficultyScore: q.difficultyScore || null,
      cognitiveLevel: q.cognitiveLevel || "Unknown",
      topic: q.topic || "",
      defectCount: q.timeline ? q.timeline.totalDefects || 0 : 0,
      challengeCount: q.timeline ? q.timeline.totalChallenges || 0 : 0,
      certificationCount: q.timeline ? q.timeline.totalCertifications || 0 : 0,
      defects: q.defectHistory || [],
      challenges: q.challenges || []
    };
  }
  const parsed = parseQid(qid);
  return {
    found: false,
    currentState: "Unknown",
    pack: parsed.pack,
    section: parsed.section,
    difficulty: "Unknown",
    difficultyScore: null,
    cognitiveLevel: "Unknown",
    topic: "",
    defectCount: 0,
    challengeCount: 0,
    certificationCount: 0,
    defects: [],
    challenges: []
  };
}

function getHealthTier(score) {
  for (const tier of HEALTH_TIERS) {
    if (score >= tier.min && score <= tier.max) return tier.tier;
  }
  return "UNKNOWN";
}

// ── Build Session Intelligence ────────────────────────────────
function buildSessionQidIndexes(sessions) {
  const sessionQids = {};
  for (const s of sessions) {
    if (!s.sessionId) continue;
    const qids = Array.isArray(s.questionIds) ? s.questionIds : [];
    sessionQids[s.sessionId] = new Set(qids);
  }
  return sessionQids;
}

function buildQuestionInventory(sessionQidSet, questions) {
  const qids = Array.from(sessionQidSet);
  const uniqueQids = qids.length;

  const byPack = {};
  const bySection = {};
  const byState = { Certified: 0, Unprocessed: 0, Archived: 0, Unknown: 0 };
  const difficultyDist = { Easy: 0, "Moderate-Easy": 0, Moderate: 0, Difficult: 0, "Very Difficult": 0, Unknown: 0 };
  const cognitiveDist = { Remember: 0, Understand: 0, Apply: 0, Analyze: 0, Evaluate: 0, Unknown: 0 };

  for (const qid of qids) {
    const meta = getQuestionMeta(qid, questions);
    const pack = meta.pack;
    const section = meta.section;
    const state = meta.currentState;
    const diff = meta.difficulty;
    const cog = meta.cognitiveLevel;

    if (!byPack[pack]) byPack[pack] = { count: 0, bySection: {}, byState: {} };
    byPack[pack].count++;
    byPack[pack].bySection[section] = (byPack[pack].bySection[section] || 0) + 1;
    byPack[pack].byState[state] = (byPack[pack].byState[state] || 0) + 1;

    const sectionKey = `${pack}:${section}`;
    if (!bySection[sectionKey]) bySection[sectionKey] = { count: 0, packs: new Set(), byState: {} };
    bySection[sectionKey].count++;
    bySection[sectionKey].packs.add(pack);
    bySection[sectionKey].byState[state] = (bySection[sectionKey].byState[state] || 0) + 1;

    if (state === "Certified") byState.Certified++;
    else if (state === "Unprocessed") byState.Unprocessed++;
    else if (state === "Archived") byState.Archived++;
    else byState.Unknown++;

    if (difficultyDist[diff] !== undefined) difficultyDist[diff]++;
    else difficultyDist.Unknown++;

    if (cognitiveDist[cog] !== undefined) cognitiveDist[cog]++;
    else cognitiveDist.Unknown++;
  }

  // Convert packs sets to arrays for bySection
  for (const key of Object.keys(bySection)) {
    bySection[key].packs = Array.from(bySection[key].packs);
  }

  return {
    totalQids: uniqueQids,
    uniqueQids,
    byPack,
    bySection,
    byCertificationState: byState,
    difficultyDistribution: difficultyDist,
    cognitiveLevelDistribution: cognitiveDist
  };
}

function buildPerformanceMap(sessionQidSet, questions) {
  const qids = Array.from(sessionQidSet);
  const n = qids.length || 1;
  let certified = 0, unprocessed = 0, archived = 0, unknown = 0;
  let totalDefectRefs = 0, qidsWithDefects = 0;
  let totalChallenges = 0, qidsWithChallenges = 0;
  const defectSeverity = { Critical: 0, High: 0, Medium: 0, Low: 0 };
  const defectCounts = {};
  const challengeStatus = { OPEN: 0, INVESTIGATING: 0, RESOLVED: 0, CLOSED: 0, DISMISSED: 0 };

  for (const qid of qids) {
    const meta = getQuestionMeta(qid, questions);
    if (meta.currentState === "Certified") certified++;
    else if (meta.currentState === "Unprocessed") unprocessed++;
    else if (meta.currentState === "Archived") archived++;
    else unknown++;

    if (meta.defectCount > 0) qidsWithDefects++;
    totalDefectRefs += meta.defectCount;

    if (meta.challengeCount > 0) qidsWithChallenges++;
    totalChallenges += meta.challengeCount;

    for (const d of meta.defects) {
      const sev = d.severity || "Low";
      defectSeverity[sev] = (defectSeverity[sev] || 0) + 1;
      const did = d.defectId || "Unknown";
      defectCounts[did] = (defectCounts[did] || 0) + 1;
    }

    for (const c of meta.challenges) {
      const st = c.status || "OPEN";
      if (challengeStatus[st] !== undefined) challengeStatus[st]++;
    }
  }

  const topDefects = Object.entries(defectCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([defectId, count]) => ({ defectId, count }));

  return {
    certifiedPct: Math.round((certified / n) * 1000) / 10,
    unprocessedPct: Math.round((unprocessed / n) * 1000) / 10,
    archivedPct: Math.round((archived / n) * 1000) / 10,
    byHealthTier: { HEALTHY: certified, FAIR: unprocessed, NEEDS_ATTENTION: unknown, CRITICAL: archived, UNKNOWN: 0 },
    defectExposure: {
      questionsWithDefects: qidsWithDefects,
      totalDefectReferences: totalDefectRefs,
      bySeverity: defectSeverity,
      topDefects
    },
    challengeExposure: {
      questionsWithChallenges: qidsWithChallenges,
      totalChallenges,
      byStatus: challengeStatus
    }
  };
}

function buildChallengeTrace(sessionId, sessionQidSet, challenges, challengeToSession) {
  const directIds = challengeToSession[sessionId] || [];
  const directChallenges = [];
  const indirectChallenges = [];
  const byStatus = { OPEN: 0, INVESTIGATING: 0, RESOLVED: 0, CLOSED: 0, DISMISSED: 0 };
  const byType = { CONTENT_ERROR: 0, TECHNICAL_ISSUE: 0, ANSWER_DISPUTE: 0, EXPLANATION_ISSUE: 0, AMBIGUITY: 0, OTHER: 0 };

  const directSet = new Set(directIds);
  const seenIndirect = new Set();

  for (const ch of challenges) {
    if (!ch.challengeId) continue;
    const linked = ch.linkedSessions || [];
    const isDirect = linked.includes(sessionId);

    if (isDirect) {
      directChallenges.push({
        challengeId: ch.challengeId,
        status: ch.status,
        type: ch.type,
        questionId: ch.questionId,
        priority: ch.priority,
        linkedDefects: ch.linkedDefects || [],
        matchType: "direct"
      });
      byStatus[ch.status] = (byStatus[ch.status] || 0) + 1;
      if (byType[ch.type] !== undefined) byType[ch.type]++;
    } else if (ch.questionId && sessionQidSet.has(ch.questionId) && !seenIndirect.has(ch.challengeId)) {
      indirectChallenges.push({
        challengeId: ch.challengeId,
        status: ch.status,
        type: ch.type,
        questionId: ch.questionId,
        priority: ch.priority,
        linkedDefects: ch.linkedDefects || [],
        matchType: "indirect"
      });
      seenIndirect.add(ch.challengeId);
      byStatus[ch.status] = (byStatus[ch.status] || 0) + 1;
      if (byType[ch.type] !== undefined) byType[ch.type]++;
    }
  }

  return {
    directChallenges,
    indirectChallenges,
    totalDirect: directChallenges.length,
    totalIndirect: indirectChallenges.length,
    byStatus,
    byType
  };
}

function buildRecommendationTrace(sessionQidSet, recommendations) {
  const directRecs = [];
  const byType = {};
  const bySeverity = {};
  const byStatus = {};
  const sourceScanCounts = {};

  for (const rec of recommendations) {
    if (!rec.recommendationId) continue;
    const recQids = rec.questionIds || [];
    const overlap = recQids.filter(q => sessionQidSet.has(q));

    if (overlap.length > 0) {
      const truncated = overlap.length > 10;
      directRecs.push({
        recommendationId: rec.recommendationId,
        type: rec.type,
        sourceScan: rec.sourceScan,
        severity: rec.severity,
        status: rec.status,
        overlapCount: overlap.length,
        overlapQids: truncated ? overlap.slice(0, 10).concat([`... ${overlap.length - 10} more ...`]) : overlap,
        truncated: truncated
      });

      const t = rec.type || "UNKNOWN";
      byType[t] = (byType[t] || 0) + 1;
      const s = rec.severity || "UNKNOWN";
      bySeverity[s] = (bySeverity[s] || 0) + 1;
      const st = rec.status || "UNKNOWN";
      byStatus[st] = (byStatus[st] || 0) + 1;
      const sc = rec.sourceScan || "UNKNOWN";
      sourceScanCounts[sc] = (sourceScanCounts[sc] || 0) + 1;
    }
  }

  const topSourceScans = Object.entries(sourceScanCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([sourceScan, count]) => ({ sourceScan, count }));

  return {
    directRecommendations: directRecs,
    totalDirect: directRecs.length,
    byType,
    bySeverity,
    byStatus,
    topSourceScans
  };
}

function buildCertificationEvents(sessionQidSet, certWaves) {
  const waves = [];
  let totalQidsInWaves = 0;

  for (const wave of certWaves) {
    const waveQids = wave.items || [];
    const overlap = waveQids.filter(q => sessionQidSet.has(q));

    if (overlap.length > 0) {
      const hasMore = overlap.length > 20;
      waves.push({
        waveId: wave.waveId,
        waveTier: wave.waveTier,
        label: wave.label,
        itemCount: wave.itemCount || waveQids.length,
        overlapCount: overlap.length,
        overlapQids: hasMore ? overlap.slice(0, 20).concat([`... ${overlap.length - 20} more ...`]) : overlap,
        hasMore
      });
      totalQidsInWaves += overlap.length;
    }
  }

  return {
    waves,
    totalWaves: waves.length,
    totalQidsInWaves,
    certifiedPctInWaves: 0
  };
}

function buildRelationshipGraph(sessionId, sessionQidSet, allSessions, sessionQidIndexes) {
  const relatedSessions = [];
  let totalShared = 0;

  for (const other of allSessions) {
    if (!other.sessionId || other.sessionId === sessionId) continue;
    const otherQids = sessionQidIndexes[other.sessionId];
    if (!otherQids || otherQids.size === 0) continue;

    const intersection = [];
    for (const qid of sessionQidSet) {
      if (otherQids.has(qid)) intersection.push(qid);
    }
    const sharedCount = intersection.length;
    if (sharedCount === 0) continue;

    totalShared += sharedCount;
    const truncated = sharedCount > 10;
    relatedSessions.push({
      sessionId: other.sessionId,
      title: other.title || "",
      series: other.series || "",
      mode: other.mode || "UNKNOWN",
      sharedQidCount: sharedCount,
      sharedQids: truncated ? intersection.slice(0, 10).concat([`... ${sharedCount - 10} more ...`]) : intersection,
      overlapPct: Math.round((sharedCount / (sessionQidSet.size || 1)) * 1000) / 10
    });
  }

  relatedSessions.sort((a, b) => b.sharedQidCount - a.sharedQidCount);

  const maxOverlap = relatedSessions.length > 0 ? relatedSessions[0].sharedQidCount : 0;
  const avgOverlap = relatedSessions.length > 0
    ? Math.round((relatedSessions.reduce((s, r) => s + r.sharedQidCount, 0) / relatedSessions.length) * 10) / 10
    : 0;

  const seriesMap = {};
  for (const r of relatedSessions) {
    const ser = r.series || "Unknown";
    if (!seriesMap[ser]) seriesMap[ser] = { sharedQidCount: 0, sessionCount: 0 };
    seriesMap[ser].sharedQidCount += r.sharedQidCount;
    seriesMap[ser].sessionCount++;
  }
  const mostRelatedSeries = Object.entries(seriesMap)
    .sort((a, b) => b[1].sharedQidCount - a[1].sharedQidCount)
    .map(([series, data]) => ({ series, sharedQidCount: data.sharedQidCount, sessionCount: data.sessionCount }));

  return {
    relatedSessions,
    totalRelatedSessions: relatedSessions.length,
    maxOverlap,
    avgOverlap,
    totalSharedQids: totalShared,
    mostRelatedSeries
  };
}

function buildOutcomeSummary(sessionIdentity, questionInventory, performanceMap, challengeTrace, recommendationTrace, relationshipGraph) {
  const perf = performanceMap;
  const n = questionInventory.uniqueQids || 1;
  const defectDensity = Math.round((perf.defectExposure.totalDefectReferences / n) * 100) / 100;
  const totalChallenges = challengeTrace.totalDirect + challengeTrace.totalIndirect;
  const challengeRate = Math.round((totalChallenges / n) * 100) / 100;

  const certScore = perf.certifiedPct;
  const defectScore = Math.max(0, 100 - defectDensity * 20);
  const challengeScore = Math.max(0, 100 - challengeRate * 25);
  const sectionCount = Object.keys(questionInventory.bySection || {}).length;
  const varietyScore = sectionCount >= 3 ? 100 : sectionCount >= 2 ? 75 : 50;

  const qualityScore = Math.round(
    certScore * 0.35 + defectScore * 0.30 + challengeScore * 0.20 + varietyScore * 0.15
  );

  const flags = [];
  if (defectDensity > 0.5) flags.push("HIGH_DEFECT_DENSITY");
  if (challengeRate > 0.1) flags.push("HIGH_CHALLENGE_RATE");
  if (perf.unprocessedPct > 50) flags.push("MAJORITY_UNPROCESSED");
  if (perf.archivedPct > 0) flags.push("ARCHIVED_ITEMS_PRESENT");
  if (perf.certifiedPct > 90) flags.push("HIGH_CERTIFIED_COVERAGE");
  if (relationshipGraph.totalRelatedSessions > 5) flags.push("HIGH_CROSS_SESSION_REACH");
  if (relationshipGraph.totalRelatedSessions === 0) flags.push("ISOLATED_SESSION");
  if (challengeTrace.totalDirect > 0) flags.push("DIRECT_CHALLENGES_PRESENT");

  let riskLevel;
  if (qualityScore < 30) riskLevel = "CRITICAL";
  else if (qualityScore < 50 || defectDensity > 0.5) riskLevel = "HIGH";
  else if (qualityScore < 70 || challengeRate > 0.1) riskLevel = "MODERATE";
  else riskLevel = "LOW";

  let recommendation;
  if (qualityScore >= 90) recommendation = "Session touched high-quality, well-vetted content with minimal risk exposure.";
  else if (qualityScore >= 70) recommendation = "Session content is generally sound but has some defect or challenge exposure that warrants monitoring.";
  else if (qualityScore >= 40) recommendation = "Session touched content with moderate quality concerns. Some questions may need re-review before learner delivery.";
  else recommendation = "Session touched content with significant quality issues. Review outstanding defects before reusing these questions in learner sessions.";

  return {
    qualityScore,
    riskLevel,
    certifiedExposure: perf.certifiedPct,
    defectDensity,
    challengeRate,
    crossSessionReach: relationshipGraph.totalRelatedSessions,
    flags,
    recommendation
  };
}

// ── Single Session Report ─────────────────────────────────────
function buildSessionReport(session, allSessions, sessionQidIndexes, questions, challenges, challengeToSession, recommendations, certWaves) {
  const sessionQidSet = sessionQidIndexes[session.sessionId] || new Set();
  const sessionIdentity = {
    sessionId: session.sessionId,
    series: session.series || "Unknown",
    title: session.title || "",
    date: session.date || "",
    mode: session.mode || "UNKNOWN",
    questionCount: session.questionCount || sessionQidSet.size,
    uniqueQuestionCount: sessionQidSet.size
  };

  const questionInventory = buildQuestionInventory(sessionQidSet, questions);
  const performanceMap = buildPerformanceMap(sessionQidSet, questions);
  const challengeTrace = buildChallengeTrace(session.sessionId, sessionQidSet, challenges, challengeToSession);
  const recommendationTrace = buildRecommendationTrace(sessionQidSet, recommendations);
  const certificationEvents = buildCertificationEvents(sessionQidSet, certWaves);
  const relationshipGraph = buildRelationshipGraph(session.sessionId, sessionQidSet, allSessions, sessionQidIndexes);
  const outcomeSummary = buildOutcomeSummary(sessionIdentity, questionInventory, performanceMap, challengeTrace, recommendationTrace, relationshipGraph);

  return {
    sessionId: session.sessionId,
    sessionIdentity,
    questionInventory,
    performanceMap,
    challengeTrace,
    recommendationTrace,
    certificationEvents,
    relationshipGraph,
    outcomeSummary
  };
}

// ── Summary Mode ──────────────────────────────────────────────
function buildSummaryReport(allSessions, sessionQidIndexes, questions, challenges, challengeToSession, recommendations, seriesIndex, questionSummary) {
  const reportCount = allSessions.length;
  const sessionsByMode = {};
  const sessionsBySeries = {};

  for (const s of allSessions) {
    const mode = s.mode || "UNKNOWN";
    sessionsByMode[mode] = (sessionsByMode[mode] || 0) + 1;
    const series = s.series || "Unknown";
    sessionsBySeries[series] = (sessionsBySeries[series] || 0) + 1;
  }

  // QID frequency across all sessions
  const qidFrequency = {};
  for (const s of allSessions) {
    const qids = sessionQidIndexes[s.sessionId];
    if (!qids) continue;
    for (const qid of qids) {
      qidFrequency[qid] = (qidFrequency[qid] || 0) + 1;
    }
  }

  const allUniqueQids = new Set(Object.keys(qidFrequency));
  const mostTestedQids = Object.entries(qidFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([qid, sessionCount]) => {
      const meta = getQuestionMeta(qid, questions);
      return { qid, sessionCount, currentState: meta.currentState, section: meta.section };
    });

  const freqDist = { touchedOnce: 0, touched2to5: 0, touched6to10: 0, touched11to20: 0, touched21plus: 0 };
  for (const count of Object.values(qidFrequency)) {
    if (count === 1) freqDist.touchedOnce++;
    else if (count <= 5) freqDist.touched2to5++;
    else if (count <= 10) freqDist.touched6to10++;
    else if (count <= 20) freqDist.touched11to20++;
    else freqDist.touched21plus++;
  }

  // Certified/defect/challenge exposure across sessions
  let highCert = 0, mixedCert = 0, lowCert = 0;
  let highDefect = 0, mediumDefect = 0, noDefect = 0;
  let highChallenge = 0, mediumChallenge = 0, noChallenge = 0;
  let totalChallengeRefs = 0;

  for (const s of allSessions) {
    const qids = sessionQidIndexes[s.sessionId];
    if (!qids || qids.size === 0) continue;

    let cert = 0;
    const n = qids.size;
    for (const qid of qids) {
      const meta = getQuestionMeta(qid, questions);
      if (meta.currentState === "Certified") cert++;
    }
    const certPct = (cert / n) * 100;
    if (certPct > 75) highCert++;
    else if (certPct >= 25) mixedCert++;
    else lowCert++;

    let defectTotal = 0;
    for (const qid of qids) {
      defectTotal += getQuestionMeta(qid, questions).defectCount;
    }
    if (defectTotal > 5) highDefect++;
    else if (defectTotal > 0) mediumDefect++;
    else noDefect++;

    const directCh = challengeToSession[s.sessionId] || [];
    totalChallengeRefs += directCh.length;
    if (directCh.length > 5) highChallenge++;
    else if (directCh.length > 0) mediumChallenge++;
    else noChallenge++;
  }

  // Top overlapping sessions (sessions that share QIDs with most others)
  const sessionOverlapScores = {};
  for (const s1 of allSessions) {
    if (!s1.sessionId || !sessionQidIndexes[s1.sessionId]) continue;
    let otherCount = 0;
    for (const s2 of allSessions) {
      if (s1.sessionId === s2.sessionId || !sessionQidIndexes[s2.sessionId]) continue;
      for (const qid of sessionQidIndexes[s1.sessionId]) {
        if (sessionQidIndexes[s2.sessionId].has(qid)) { otherCount++; break; }
      }
    }
    sessionOverlapScores[s1.sessionId] = otherCount;
  }

  const topOverlapping = Object.entries(sessionOverlapScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([sessionId, overlapCount]) => {
      const s = allSessions.find(x => x.sessionId === sessionId);
      return { sessionId, overlapCount, title: s ? s.title : "" };
    });

  // Series cross-reference
  const seriesGraph = {};
  for (const s1 of allSessions) {
    if (!s1.sessionId || !sessionQidIndexes[s1.sessionId] || sessionQidIndexes[s1.sessionId].size === 0) continue;
    const ser1 = s1.series || "Unknown";
    if (!seriesGraph[ser1]) seriesGraph[ser1] = new Set();
    for (const s2 of allSessions) {
      if (s1.sessionId === s2.sessionId || !sessionQidIndexes[s2.sessionId]) continue;
      const ser2 = s2.series || "Unknown";
      if (ser1 === ser2) continue;
      for (const qid of sessionQidIndexes[s1.sessionId]) {
        if (sessionQidIndexes[s2.sessionId].has(qid)) {
          seriesGraph[ser1].add(ser2);
          break;
        }
      }
    }
  }
  const seriesCrossReference = {};
  for (const [series, related] of Object.entries(seriesGraph)) {
    seriesCrossReference[series] = Array.from(related).sort();
  }

  // Defect coverage
  const defectSessionCounts = {};
  for (const s of allSessions) {
    const qids = sessionQidIndexes[s.sessionId];
    if (!qids) continue;
    const seenDefects = new Set();
    for (const qid of qids) {
      const meta = getQuestionMeta(qid, questions);
      for (const d of meta.defects) {
        if (d.defectId) seenDefects.add(d.defectId);
      }
    }
    for (const did of seenDefects) {
      defectSessionCounts[did] = (defectSessionCounts[did] || 0) + 1;
    }
  }

  // Certified item coverage
  const certQs = questionSummary.byState ? questionSummary.byState.Certified || 0 : 2221;
  let certTouched = 0;
  const allTouchedSet = new Set(Object.keys(qidFrequency));
  for (const qid of allTouchedSet) {
    const meta = getQuestionMeta(qid, questions);
    if (meta.currentState === "Certified") certTouched++;
  }
  const certCoverage = certQs > 0 ? Math.round((certTouched / certQs) * 1000) / 10 : 0;

  return {
    totalSessions: reportCount,
    sessionsByMode,
    sessionsBySeries,
    totalUniqueQidsAcrossAllSessions: allUniqueQids.size,
    sessionsByCertifiedExposure: {
      highCertified: highCert,
      mixedCertified: mixedCert,
      lowCertified: lowCert
    },
    mostTestedQids,
    sessionsByDefectExposure: {
      highDefect,
      mediumDefect,
      noDefect
    },
    sessionsByChallengeExposure: {
      highChallenge,
      mediumChallenge,
      noChallenge
    },
    topOverlappingSessions: topOverlapping,
    seriesCrossReference,
    qidFrequencyDistribution: freqDist,
    challengeToSessionRatio: reportCount > 0 ? Math.round((totalChallengeRefs / reportCount) * 100) / 100 : 0,
    certifiedItemSessionCoverage: certCoverage,
    defectLibraryCoverageInSessions: defectSessionCounts
  };
}

// ── Main ──────────────────────────────────────────────────────
function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    printHelp();
    process.exit(0);
  }

  if (!args.mode) {
    console.error("ERROR: No mode specified. Use --session=ID, --all, or --summary");
    printHelp();
    process.exit(2);
  }

  console.log("Loading data files...");
  const data = loadAllData();
  const { sessions, questions, challenges, challengeToSession, recommendations, certWaves, seriesIndex } = data;

  console.log(`Loaded: ${sessions.length} sessions, ${Object.keys(questions).length} questions, ${challenges.length} challenges, ${recommendations.length} recommendations, ${certWaves.length} certification waves`);

  // Build QID indexes
  const sessionQidIndexes = buildSessionQidIndexes(sessions);

  let result;
  if (args.mode === "single") {
    const targetSession = sessions.find(s => s.sessionId === args.target);
    if (!targetSession) {
      console.error(`ERROR: Session "${args.target}" not found in registry.`);
      console.log(`Available sessions: ${sessions.filter(s => s.sessionId).map(s => s.sessionId).slice(0, 20).join(", ")}...`);
      process.exit(1);
    }
    console.log(`Analyzing session: ${args.target}`);
    const report = buildSessionReport(targetSession, sessions, sessionQidIndexes, questions, challenges, challengeToSession, recommendations, certWaves);

    result = {
      specId: "SESSION252_SESSION_INTELLIGENCE_SPEC",
      mode: "single",
      totalSessions: 1,
      sessions: [report]
    };

  } else if (args.mode === "all") {
    console.log(`Analyzing all ${sessions.length} sessions...`);
    const reports = [];
    let count = 0;
    for (const s of sessions) {
      if (!s.sessionId) continue;
      const report = buildSessionReport(s, sessions, sessionQidIndexes, questions, challenges, challengeToSession, recommendations, certWaves);
      reports.push(report);
      count++;
      if (count % 10 === 0) console.log(`  Processed ${count}/${sessions.length} sessions...`);
    }
    console.log(`  Complete: ${reports.length} session reports generated.`);

    result = {
      specId: "SESSION252_SESSION_INTELLIGENCE_SPEC",
      mode: "all",
      totalSessions: reports.length,
      sessions: reports
    };

  } else if (args.mode === "summary") {
    console.log("Building summary report...");
    const summary = buildSummaryReport(sessions, sessionQidIndexes, questions, challenges, challengeToSession, recommendations, seriesIndex, data.questionSummary);

    result = {
      specId: "SESSION252_SESSION_INTELLIGENCE_SPEC",
      mode: "summary",
      totalSessions: sessions.length,
      summary
    };
  }

  // Update timestamp in spec file
  const ts = new Date().toISOString();
  try {
    const spec = JSON.parse(fs.readFileSync(SPEC_FILE, "utf-8"));
    spec.generatedTimestamp = ts;
    fs.writeFileSync(SPEC_FILE, JSON.stringify(spec, null, 2), "utf-8");
  } catch (_) { /* spec file may not exist yet */ }

  saveJSON(OUTPUT_FILE, result);
  console.log("Done.");
}

main();
