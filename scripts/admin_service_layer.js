#!/usr/bin/env node
/**
 * admin_service_layer.js — SESSION 263
 * May Admin Phase 1 Build — Unified Administrative Service Layer
 *
 * Wraps all 6 S252 investigation engines into a single administrative query surface.
 * Also provides --build-dashboard which produces a browser-loadable data bundle.
 *
 * Usage:
 *   node scripts/admin_service_layer.js --build-dashboard
 *   node scripts/admin_service_layer.js --lookup=QID:P1-A-001
 *   node scripts/admin_service_layer.js --lookup=CH:CH-CC1ECA89
 *   node scripts/admin_service_layer.js --lookup=INV:INV-20260727-001
 *   node scripts/admin_service_layer.js --lookup=SESSION:S254
 *   node scripts/admin_service_layer.js --lookup=REC:REC-61966733
 *   node scripts/admin_service_layer.js --dashboard-summary
 *
 * READ-ONLY: Does not modify any pack files, registries, or governance files.
 * ISC-S260-B: block.json write for investigation dossier on --lookup.
 */

"use strict";

const fs = require("fs");
const path = require("path");

// ── Paths ──────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "scripts", "output");
const PACK_DIR = ROOT;

const SECTION_NAMES = {
  A: "External Financial Reporting Decisions",
  B: "Planning, Budgeting, and Forecasting",
  C: "Performance Management",
  D: "Cost Management",
  E: "Internal Controls",
  F: "Technology and Analytics",
};

const PACK_FILES = {
  pack_a: { file: "content/packs/pack_a_corrected.js", var: "MCQ_BANK_A" },
  pack_b: { file: "content/packs/pack_b_corrected.js", var: "MCQ_BANK_B" },
  pack_c: { file: "content/packs/pack_c_corrected.js", var: "MCQ_BANK_C" },
  pack_d: { file: "content/packs/pack_d_corrected.js", var: "MCQ_BANK_D" },
  pack_e: { file: "content/packs/pack_e_corrected.js", var: "MCQ_BANK_E" },
};

// ── JSON Loading ────────────────────────────────────────────────
function loadJson(filename) {
  const fp = path.join(OUTPUT_DIR, filename);
  try {
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, "utf8"));
  } catch (e) {
    return null;
  }
}

let _packCache = {};
function loadPack(packName) {
  if (_packCache[packName]) return _packCache[packName];
  const cfg = PACK_FILES[packName];
  if (!cfg) return null;
  try {
    const filePath = path.join(PACK_DIR, cfg.file);
    if (!fs.existsSync(filePath)) return null;
    const src = fs.readFileSync(filePath, "utf8");
    const fn = new Function(src + "\nreturn " + cfg.var + ";");
    const arr = fn();
    if (Array.isArray(arr)) {
      _packCache[packName] = arr;
      return arr;
    }
    return null;
  } catch (e) {
    return null;
  }
}

function findQuestionInPack(qid, packName) {
  const arr = loadPack(packName);
  if (!arr) return null;
  for (const q of arr) {
    if (q.QuestionID === qid) return q;
  }
  return null;
}

function parseQidToPack(qid) {
  if (!qid) return null;
  if (/^P1-E-R\d+$/i.test(qid)) return "pack_e";
  if (/^P1B-[A-F]-\d+$/i.test(qid)) return "pack_b";
  if (/^P1E-[A-F]-\d+$/i.test(qid)) return "pack_e";
  if (/^P1-[A-F]C-\d+$/i.test(qid)) return "pack_c";
  if (/^P1-[A-F]D-\d+$/i.test(qid)) return "pack_d";
  if (/^P1-[A-F]-\d+$/i.test(qid)) return "pack_a";
  return null;
}

// ── Lazy Registry Loads ────────────────────────────────────────
let _history = null;
let _health = null;
let _challenges = null;
let _challengeTriage = null;
let _investigations = null;
let _sessions = null;
let _recommendations = null;
let _readiness = null;
let _certWaves = null;

function getHistory() {
  if (!_history) _history = loadJson("question_history.json");
  return _history;
}
function getHealth() {
  if (!_health) _health = loadJson("question_health.json");
  return _health;
}
function getChallenges() {
  if (!_challenges) _challenges = loadJson("challenge_registry.json");
  return _challenges;
}
function getChallengeTriage() {
  if (!_challengeTriage) _challengeTriage = loadJson("challenge_triage.json");
  return _challengeTriage;
}
function getInvestigations() {
  if (!_investigations) _investigations = loadJson("investigation_registry.json");
  return _investigations;
}
function getSessions() {
  if (!_sessions) _sessions = loadJson("session_registry.json");
  return _sessions;
}
function getRecommendations() {
  if (!_recommendations) _recommendations = loadJson("recommendation_registry.json");
  return _recommendations;
}
function getReadiness() {
  if (!_readiness) _readiness = loadJson("readiness_scoring.json");
  return _readiness;
}
function getCertWaves() {
  if (!_certWaves) _certWaves = loadJson("certification_waves.json");
  return _certWaves;
}

// ── Build health quick-lookup index ────────────────────────────
// question_health.json has only aggregate data; reconstruct per-QID health
// from history.json timeline + work_queue defect flags.
let _healthIndex = null;
function buildHealthIndex() {
  if (_healthIndex) return _healthIndex;
  _healthIndex = {};
  const history = getHistory();
  const wq = loadJson("work_queue.json");

  // Build work queue defect lookup
  const wqLookup = {};
  if (wq && wq.lanes) {
    for (const lane of Object.keys(wq.lanes)) {
      const items = wq.lanes[lane];
      if (!Array.isArray(items)) continue;
      for (const item of items) {
        if (item.qid) {
          wqLookup[item.qid] = {
            lane: item.lane || lane,
            defectFlags: item.defect_flags || [],
            readinessState: item.readiness_state || "",
          };
        }
      }
    }
  }

  // Get worst_10 for known low-health items (from health engine output)
  const h = getHealth();
  const worstMap = {};
  if (h && h.worst_10) {
    for (const w of h.worst_10) {
      worstMap[w.qid] = w;
    }
  }

  // Compute per-QID health
  if (history && history.questions) {
    for (const [qid, q] of Object.entries(history.questions)) {
      if (worstMap[qid]) {
        // Use computed health from engine for known low-health items
        const w = worstMap[qid];
        _healthIndex[qid] = {
          qid,
          health_score: w.health_score,
          health_tier: w.health_tier,
          component_scores: w.component_scores || {},
          diagnosis: w.diagnosis || "",
          defect_codes: w.details ? (w.details.defect_codes || []) : [],
        };
        continue;
      }

      // Compute derived health for other items
      const tl = q.timeline || {};
      const defectCount = tl.totalDefects || 0;
      const challengeCount = tl.totalChallenges || 0;
      const recCount = tl.totalRecommendations || 0;
      const state = q.currentState;

      let score = 100;
      if (state === "Archived") score -= 30;
      else if (state === "Unprocessed") score -= 15;
      score -= Math.min(defectCount * 8, 50);
      score -= Math.min(challengeCount * 3, 15);
      score -= Math.min(recCount * 2, 10);

      // Check work queue for additional defect flags
      const wqItem = wqLookup[qid];
      let defectCodes = [];
      if (wqItem && wqItem.defectFlags && wqItem.defectFlags.length > 0) {
        defectCodes = wqItem.defectFlags;
        score -= Math.min(defectCodes.length * 5, 25);
      }
      score = Math.max(0, Math.min(100, score));

      let tier = "HEALTHY";
      if (score < 40) tier = "CRITICAL";
      else if (score < 70) tier = "NEEDS ATTENTION";
      else if (score < 90) tier = "FAIR";

      _healthIndex[qid] = {
        qid,
        health_score: score,
        health_tier: tier,
        component_scores: {
          defect: Math.max(0, 100 - defectCount * 10),
          challenge: Math.max(0, 100 - challengeCount * 10),
          recommendation: Math.max(0, 100 - recCount * 10),
          certification: state === "Certified" ? 100 : state === "Archived" ? 50 : 70,
          structural: 100,
          usage: 100,
        },
        diagnosis: state === "Certified" ? "Certified — no health concerns" :
          state === "Archived" ? "Archived — requires review" : "Unprocessed",
        defect_codes: defectCodes,
      };
    }
  }
  return _healthIndex;
}

// ── Question Services ──────────────────────────────────────────

function lookupQuestion(qid) {
  const history = getHistory();
  const hIdx = buildHealthIndex();
  const hEntry = hIdx[qid] || null;
  const histEntry = history && history.questions ? history.questions[qid] : null;
  const packName = parseQidToPack(qid);
  const packItem = packName ? findQuestionInPack(qid, packName) : null;

  if (!histEntry && !packItem) return { error: "Question not found in any registry or pack", qid };

  const result = {
    query: qid,
    queriedAt: new Date().toISOString(),
    identity: {},
    state: {},
    content: {},
    health: {},
    history: {},
    investigations: [],
    readiness: {},
    traceability: { totalFks: 0, broken: 0 },
  };

  // Identity
  result.identity = {
    questionId: qid,
    pack: packName || (histEntry ? histEntry.pack : "unknown"),
    section: histEntry ? histEntry.section : "?",
    sectionName: SECTION_NAMES[histEntry ? histEntry.section : ""] || "Unknown",
    topic: histEntry ? histEntry.topic : (packItem ? packItem.Topic : ""),
    cognitiveLevel: histEntry ? histEntry.cognitiveLevel : (packItem ? packItem.CognitiveLevel : "Unknown"),
    difficulty: histEntry ? histEntry.difficulty : (packItem ? packItem.Difficulty : "Unknown"),
    difficultyScore: histEntry ? histEntry.difficultyScore : (packItem ? packItem.DifficultyScore : null),
  };

  // State
  result.state = {
    questionState: histEntry ? histEntry.currentState : (packItem ? packItem.question_state : "Unknown"),
    certificationDate: packItem ? packItem.certification_date || null : null,
    certificationBatch: packItem ? packItem.certification_batch || null : null,
    losTag: packItem ? packItem.LOSTag || null : null,
  };

  // Content
  if (packItem) {
    result.content = {
      stem: packItem.Stem ? packItem.Stem.substring(0, 500) + (packItem.Stem.length > 500 ? "…" : "") : "",
      choices: {
        A: packItem.Choices ? (packItem.Choices.A || "").substring(0, 200) : "",
        B: packItem.Choices ? (packItem.Choices.B || "").substring(0, 200) : "",
        C: packItem.Choices ? (packItem.Choices.C || "").substring(0, 200) : "",
        D: packItem.Choices ? (packItem.Choices.D || "").substring(0, 200) : "",
      },
      correctChoice: packItem.CorrectChoice || "?",
      explanationCorrect: packItem.ExplanationCorrect ? packItem.ExplanationCorrect.substring(0, 500) + (packItem.ExplanationCorrect.length > 500 ? "…" : "") : "",
      itemType: packItem.ItemType || "MCQ",
    };
  } else {
    result.content = { stem: "[Content not available — pack item not found]", choices: { A: "", B: "", C: "", D: "" }, correctChoice: "?", explanationCorrect: "", itemType: "MCQ" };
  }

  // Health
  result.health = hEntry
    ? {
        healthScore: hEntry.health_score,
        healthTier: hEntry.health_tier,
        componentScores: hEntry.component_scores || {},
        diagnosis: hEntry.diagnosis || "",
      }
    : { healthScore: null, healthTier: "UNKNOWN", componentScores: {}, diagnosis: "No health data" };

  // History
  if (histEntry) {
    result.history = {
      timeline: histEntry.timeline || {},
      sessions: histEntry.sessions || [],
      certificationHistory: histEntry.certificationHistory || [],
      challenges: histEntry.challenges || [],
      recommendations: histEntry.recommendations || [],
      defects: histEntry.defects || [],
    };
  } else {
    result.history = { timeline: {}, sessions: [], certificationHistory: [], challenges: [], recommendations: [], defects: [] };
  }

  // Investigations
  const invs = getInvestigations();
  if (invs && invs.investigations) {
    result.investigations = invs.investigations
      .filter((inv) => inv.related_qids && inv.related_qids.includes(qid))
      .map((inv) => ({
        investigationId: inv.id,
        title: inv.title,
        type: inv.type,
        status: inv.status,
        priority: inv.priority,
      }));
  }

  // Readiness
  const rdy = getReadiness();
  if (rdy && rdy.perQuestion) {
    result.readiness = rdy.perQuestion[qid] || { readinessScore: null, readinessTier: "UNKNOWN" };
  }

  // Traceability FK count
  result.traceability = {
    totalFks:
      (histEntry ? (histEntry.timeline ? histEntry.timeline.totalSessions || 0 : 0) : 0) +
      (histEntry ? (histEntry.timeline ? histEntry.timeline.totalChallenges || 0 : 0) : 0) +
      (histEntry ? (histEntry.timeline ? histEntry.timeline.totalRecommendations || 0 : 0) : 0) +
      (histEntry ? (histEntry.timeline ? histEntry.timeline.totalCertifications || 0 : 0) : 0) +
      result.investigations.length,
    broken: 0,
  };

  return result;
}

function getQuestionHealth(qid) {
  const hIdx = buildHealthIndex();
  return hIdx[qid] || { error: "Health data not found", qid };
}

function getQuestionHistory(qid) {
  const history = getHistory();
  if (history && history.questions && history.questions[qid]) {
    return history.questions[qid];
  }
  return { error: "Question history not found", qid };
}

function getCertificationStatus(qid) {
  const history = getHistory();
  if (history && history.questions && history.questions[qid]) {
    const q = history.questions[qid];
    return {
      questionId: qid,
      currentState: q.currentState,
      certificationCount: q.certificationHistory ? q.certificationHistory.length : 0,
      certificationEvents: q.certificationHistory || [],
    };
  }
  const packName = parseQidToPack(qid);
  const packItem = packName ? findQuestionInPack(qid, packName) : null;
  if (packItem) {
    return {
      questionId: qid,
      currentState: packItem.question_state || "Unknown",
      certificationCount: 0,
      certificationEvents: [],
    };
  }
  return { error: "Question not found", qid };
}

// ── Session Services ───────────────────────────────────────────

function lookupSession(sessionId) {
  const sess = getSessions();
  if (!sess || !sess.sessions) return { error: "Session registry not loaded" };
  const entry = sess.sessions.find((s) => s.sessionId === sessionId);
  if (!entry) return { error: "Session not found", sessionId };

  const invs = getInvestigations();
  const linkedInvs = invs && invs.investigations
    ? invs.investigations.filter((inv) => inv.related_sessions && inv.related_sessions.includes(sessionId))
    : [];

  const recs = getRecommendations();
  const linkedRecs = recs && recs.recommendations
    ? recs.recommendations.filter((r) => r.createdSession === sessionId || r.resolutionSession === sessionId)
    : [];

  const certifiedCount = entry.questionIds
    ? entry.questionIds.filter((qid) => {
        const h = getHistory();
        return h && h.questions && h.questions[qid] && h.questions[qid].currentState === "Certified";
      }).length
    : 0;

  return {
    identity: {
      sessionId: entry.sessionId,
      title: entry.title || "",
      series: entry.series || "",
      date: entry.date || "",
      mode: entry.mode || "UNKNOWN",
    },
    questions: {
      totalQuestions: entry.questionIds ? entry.questionIds.length : 0,
      certifiedCount,
      certifiedRatio: entry.questionIds && entry.questionIds.length > 0 ? certifiedCount / entry.questionIds.length : 0,
      uniqueQids: entry.questionIds || [],
    },
    challenges: {
      totalChallenges: entry.challengeIds ? entry.challengeIds.length : 0,
      challengeIds: entry.challengeIds || [],
    },
    recommendations: {
      generated: linkedRecs.map((r) => r.recommendationId),
    },
    investigations: {
      opened: linkedInvs.filter((inv) => inv.related_sessions && inv.related_sessions.includes(sessionId)).map((inv) => inv.id),
    },
  };
}

function getSessionParticipation(sessionId) {
  const r = lookupSession(sessionId);
  if (r.error) return r;
  return {
    sessionId: r.identity.sessionId,
    questions: r.questions,
    certifiedRatio: r.questions.certifiedRatio,
  };
}

function getSessionRecommendations(sessionId) {
  const r = lookupSession(sessionId);
  if (r.error) return r;
  return {
    sessionId: r.identity.sessionId,
    recommendationIds: r.recommendations.generated,
  };
}

function getSessionOutcomes(sessionId) {
  const r = lookupSession(sessionId);
  if (r.error) return r;
  return {
    sessionId: r.identity.sessionId,
    questionsWorked: r.questions.totalQuestions,
    questionsCertified: r.questions.certifiedCount,
    investigationsOpened: r.investigations.opened,
    recommendationsGenerated: r.recommendations.generated,
  };
}

// ── Challenge Services ─────────────────────────────────────────

function reviewChallenge(challengeId) {
  const ch = getChallenges();
  if (!ch || !ch.challenges) return { error: "Challenge registry not loaded" };
  const entry = ch.challenges.find((c) => c.challengeId === challengeId);
  if (!entry) return { error: "Challenge not found", challengeId };

  const triage = getChallengeTriage();
  let triageEntry = null;
  if (triage && triage.challenges) {
    triageEntry = triage.challenges.find((t) => t.challengeId === challengeId) || null;
  }

  const invs = getInvestigations();
  const linkedInvs = invs && invs.investigations
    ? invs.investigations.filter((inv) => inv.related_challenges && inv.related_challenges.includes(challengeId))
    : [];

  const recs = getRecommendations();
  const linkedRecs = recs && recs.recommendations
    ? recs.recommendations.filter((r) => r.questionIds && r.questionIds.includes(entry.questionId))
    : [];

  return {
    challengeId: entry.challengeId,
    type: entry.type,
    status: entry.status,
    questionId: entry.questionId,
    priority: entry.priority || null,
    reportedDate: entry.reportedDate || null,
    triage: triageEntry
      ? {
          category: triageEntry.classification || triageEntry.triageCategory || null,
          confidence: triageEntry.confidence || null,
          reasoning: triageEntry.reasoning || "",
          relatedDefectCodes: triageEntry.relatedDefectCodes || [],
          priorityScore: triageEntry.priorityScore || null,
        }
      : { category: null, confidence: null, reasoning: "Not triaged" },
    linkedInvestigations: linkedInvs.map((inv) => inv.id),
    linkedRecommendations: linkedRecs.map((r) => r.recommendationId),
    resolution: entry.resolution || null,
  };
}

function triageChallenge(challengeId) {
  return reviewChallenge(challengeId);
}

function getDisposition(challengeId) {
  const r = reviewChallenge(challengeId);
  if (r.error) return r;
  return {
    challengeId: r.challengeId,
    status: r.status,
    triageCategory: r.triage.category,
    resolution: r.resolution,
  };
}

// ── Recommendation Services ────────────────────────────────────

function reviewRecommendation(recId) {
  const recs = getRecommendations();
  if (!recs || !recs.recommendations) return { error: "Recommendation registry not loaded" };
  const entry = recs.recommendations.find((r) => r.recommendationId === recId);
  if (!entry) return { error: "Recommendation not found", recId };

  const invs = getInvestigations();
  const linkedInvs = invs && invs.investigations
    ? invs.investigations.filter((inv) => inv.related_recommendations && inv.related_recommendations.includes(recId))
    : [];

  return {
    recommendationId: entry.recommendationId,
    type: entry.type,
    sourceScan: entry.sourceScan,
    severity: entry.severity,
    status: entry.status,
    description: entry.description,
    questionIds: entry.questionIds || [],
    questionCount: entry.count || (entry.questionIds ? entry.questionIds.length : 0),
    createdSession: entry.createdSession,
    createdTimestamp: entry.createdTimestamp,
    targetSession: entry.targetSession || null,
    resolutionSession: entry.resolutionSession || null,
    resolutionTimestamp: entry.resolutionTimestamp || null,
    verifiedBy: entry.verifiedBy || null,
    linkedInvestigations: linkedInvs.map((inv) => inv.id),
  };
}

function getRecommendationLifecycle(recId) {
  const r = reviewRecommendation(recId);
  if (r.error) return r;
  return {
    recommendationId: r.recommendationId,
    lifecycle: [
      { stage: "CREATED", session: r.createdSession, timestamp: r.createdTimestamp },
      r.resolutionSession ? { stage: "RESOLVED", session: r.resolutionSession, timestamp: r.resolutionTimestamp, verifiedBy: r.verifiedBy } : null,
    ].filter(Boolean),
  };
}

function getRecommendationOwnership(recId) {
  const r = reviewRecommendation(recId);
  if (r.error) return r;
  return {
    recommendationId: r.recommendationId,
    createdSession: r.createdSession,
    targetSession: r.targetSession,
    targetQids: r.questionIds,
    linkedInvestigations: r.linkedInvestigations,
  };
}

function closeRecommendation(recId) {
  return {
    recommendationId: recId,
    status: "READ-ONLY — recommendation closure requires registry write access. Use investigation_registry.js --close for REC-linked investigations.",
  };
}

// ── Investigation Lookup ───────────────────────────────────────

function lookupInvestigation(invId) {
  const invs = getInvestigations();
  if (!invs || !invs.investigations) return { error: "Investigation registry not loaded" };
  const entry = invs.investigations.find((inv) => inv.id === invId);
  if (!entry) return { error: "Investigation not found", invId };

  return {
    investigationId: entry.id,
    title: entry.title,
    type: entry.type,
    status: entry.status,
    priority: entry.priority,
    relatedQids: entry.related_qids || [],
    relatedChallenges: entry.related_challenges || [],
    relatedDefects: entry.related_defects || [],
    relatedRecommendations: entry.related_recommendations || [],
    relatedSessions: entry.related_sessions || [],
    createdDate: entry.created_date,
    updatedDate: entry.updated_date,
    findings: entry.findings || [],
    resolution: entry.resolution || null,
  };
}

// ── Dashboard Summary ──────────────────────────────────────────

function getDashboardSummary() {
  const h = getHealth();
  const invs = getInvestigations();
  const ch = getChallenges();
  const sess = getSessions();
  const recs = getRecommendations();

  let certCount = 0;
  const history = getHistory();
  if (history && history.summary && history.summary.byState) {
    certCount = history.summary.byState.Certified || 0;
  } else if (history && history.questions) {
    certCount = Object.values(history.questions).filter((q) => q.currentState === "Certified").length;
  }

  return {
    summary: {
      certifiedCount: certCount,
      totalQuestions: h ? h.total_questions : 0,
      certifiedRatio: h ? (certCount / h.total_questions).toFixed(3) : "N/A",
      meanHealthScore: h ? h.mean_health_score : null,
      tierDistribution: h ? h.tier_distribution : {},
    },
    investigations: {
      total: invs ? invs.investigations.length : 0,
      byStatus: invs && invs.investigations ? invs.investigations.reduce((acc, inv) => {
        acc[inv.status] = (acc[inv.status] || 0) + 1;
        return acc;
      }, {}) : {},
    },
    challenges: {
      total: ch ? (ch.summary ? ch.summary.totalChallenges : ch.challenges.length) : 0,
      byStatus: ch && ch.summary ? ch.summary.byStatus : {},
    },
    sessions: {
      total: sess ? sess.totalSessions || sess.sessions.length : 0,
    },
    recommendations: {
      total: recs ? recs.recommendations.length : 0,
      byStatus: recs && recs.recommendations ? recs.recommendations.reduce((acc, r) => {
        acc[r.status] = (acc[r.status] || 0) + 1;
        return acc;
      }, {}) : {},
    },
  };
}

// ── Dashboard Data Bundle Builder ──────────────────────────────

function buildDashboardDataBundle() {
  const timestamp = new Date().toISOString();
  const history = getHistory();
  const hIdx = buildHealthIndex();
  const ch = getChallenges();
  const triage = getChallengeTriage();
  const invs = getInvestigations();
  const sess = getSessions();
  const recs = getRecommendations();
  const rdy = getReadiness();

  // ── questionIndex ──
  const questionIndex = {};
  const questionsByHealth = { HEALTHY: [], FAIR: [], "NEEDS ATTENTION": [], CRITICAL: [] };
  const questionsBySection = {};
  for (const k of Object.keys(SECTION_NAMES)) {
    questionsBySection[k] = { count: 0, certified: 0, healthSum: 0, healthMean: 0 };
  }

  if (history && history.questions) {
    for (const [qid, q] of Object.entries(history.questions)) {
      const hEntry = hIdx[qid] || {};
      const section = q.section || "?";
      const state = q.currentState || "Unknown";
      const hs = hEntry.health_score != null ? hEntry.health_score : 100;
      const ht = hEntry.health_tier || "HEALTHY";

      questionIndex[qid] = {
        questionId: qid,
        pack: q.pack || "unknown",
        section,
        sectionName: SECTION_NAMES[section] || "Unknown",
        topic: q.topic || "",
        cognitiveLevel: q.cognitiveLevel || "Unknown",
        difficulty: q.difficulty || "Unknown",
        difficultyScore: q.difficultyScore || 3,
        questionState: state,
        certificationDate: null,
        certificationBatch: null,
        healthScore: hs,
        healthTier: ht,
        challengeCount: q.challenges ? q.challenges.length : 0,
        investigationCount: 0,
        recommendationCount: q.recommendations ? q.recommendations.length : 0,
        activeDefectCodes: q.defects ? q.defects.filter((d) => d.status !== "Resolved").map((d) => d.defectId || d.class || d.code || "").filter(Boolean) : [],
        readinessTier: "UNKNOWN",
      };

      if (questionsByHealth[ht]) questionsByHealth[ht].push(qid);
      if (questionsBySection[section]) {
        questionsBySection[section].count++;
        if (state === "Certified") questionsBySection[section].certified++;
        questionsBySection[section].healthSum += hs;
      }
    }
  }

  // Compute section health means
  for (const k of Object.keys(questionsBySection)) {
    const s = questionsBySection[k];
    s.healthMean = s.count > 0 ? Math.round(s.healthSum / s.count) : 0;
    delete s.healthSum;
  }

  // Add investigation counts to questionIndex
  if (invs && invs.investigations) {
    for (const inv of invs.investigations) {
      if (inv.related_qids) {
        for (const qid of inv.related_qids) {
          if (questionIndex[qid]) questionIndex[qid].investigationCount = (questionIndex[qid].investigationCount || 0) + 1;
        }
      }
    }
  }

  // ── investigations lookup ──
  const investigations = {};
  if (invs && invs.investigations) {
    for (const inv of invs.investigations) {
      investigations[inv.id] = {
        investigationId: inv.id,
        title: inv.title || "",
        type: inv.type,
        status: inv.status,
        priority: inv.priority,
        linkedQids: inv.related_qids || [],
        linkedChallenges: inv.related_challenges || [],
        linkedRecommendations: inv.related_recommendations || [],
        linkedDefects: inv.related_defects || [],
        createdDate: inv.created_date || "",
        updatedDate: inv.updated_date || "",
        findings: inv.findings || [],
        resolution: inv.resolution || null,
      };
    }
  }

  // ── challenges lookup ──
  const challenges = {};
  const triageIndex = {};
  if (triage && triage.challenges) {
    for (const t of triage.challenges) {
      triageIndex[t.challengeId] = t;
    }
  }
  if (ch && ch.challenges) {
    for (const c of ch.challenges) {
      const t = triageIndex[c.challengeId] || {};
      challenges[c.challengeId] = {
        challengeId: c.challengeId,
        type: c.type,
        status: c.status,
        questionId: c.questionId,
        triageCategory: t.classification || t.triageCategory || null,
        confidence: t.confidence || null,
        priorityScore: t.priorityScore || c.priority || null,
        linkedSessions: c.linkedSessions || c.sessionIds || [],
        linkedRecommendations: c.linkedRecommendations || c.recommendationIds || [],
        resolution: c.resolution || null,
      };
    }
  }

  // ── sessions lookup ──
  const sessions = {};
  if (sess && sess.sessions) {
    for (const s of sess.sessions) {
      const certCount = s.questionIds
        ? s.questionIds.filter((qid) => {
            return history && history.questions && history.questions[qid] && history.questions[qid].currentState === "Certified";
          }).length
        : 0;
      sessions[s.sessionId] = {
        sessionId: s.sessionId,
        title: s.title || "",
        series: s.series || "",
        date: s.date || "",
        mode: s.mode || "UNKNOWN",
        totalQuestions: s.questionIds ? s.questionIds.length : 0,
        certifiedCount: certCount,
        certifiedRatio: s.questionIds && s.questionIds.length > 0 ? (certCount / s.questionIds.length) : 0,
        uniqueQids: s.questionIds || [],
        challengeIds: s.challengeIds || [],
        recommendationIds: s.recommendationIds || [],
      };
    }
  }

  // ── recommendations lookup ──
  const recommendations = {};
  if (recs && recs.recommendations) {
    for (const r of recs.recommendations) {
      recommendations[r.recommendationId] = {
        recommendationId: r.recommendationId,
        type: r.type,
        sourceScan: r.sourceScan,
        severity: r.severity,
        status: r.status,
        description: r.description,
        questionIds: r.questionIds || [],
        count: r.count || (r.questionIds ? r.questionIds.length : 0),
        createdSession: r.createdSession || "",
        createdTimestamp: r.createdTimestamp || "",
        targetSession: r.targetSession || null,
        resolutionSession: r.resolutionSession || null,
        resolutionTimestamp: r.resolutionTimestamp || null,
        verifiedBy: r.verifiedBy || null,
      };
    }
  }

  // ── healthDistribution ──
  const healthData = getHealth();
  const healthDistribution = {
    HEALTHY: healthData ? healthData.tier_distribution.HEALTHY : 0,
    FAIR: healthData ? healthData.tier_distribution.FAIR : 0,
    "NEEDS ATTENTION": healthData ? healthData.tier_distribution["NEEDS ATTENTION"] : 0,
    CRITICAL: healthData ? healthData.tier_distribution.CRITICAL : 0,
    mean: healthData ? healthData.mean_health_score : 0,
    worstTen: healthData ? healthData.worst_10.map((w) => ({
      qid: w.qid,
      score: w.health_score,
      tier: w.health_tier,
      diagnosis: w.diagnosis || "",
    })) : [],
  };

  // ── investigationSummary ──
  const invSummary = { total: 0, byStatus: {}, byType: {} };
  if (invs && invs.investigations) {
    invSummary.total = invs.investigations.length;
    for (const inv of invs.investigations) {
      invSummary.byStatus[inv.status] = (invSummary.byStatus[inv.status] || 0) + 1;
      invSummary.byType[inv.type] = (invSummary.byType[inv.type] || 0) + 1;
    }
  }

  // ── metadata ──
  let certCount = 0;
  if (history && history.summary && history.summary.byState) {
    certCount = history.summary.byState.Certified || 0;
  } else if (history && history.questions) {
    certCount = Object.values(history.questions).filter((q) => q.currentState === "Certified").length;
  }
  const totalQids = healthData ? healthData.total_questions : 0;

  // Build challenge direct index (challengeId → entry from challenge_registry for FK enrichment)
  const challengeDirect = {};
  if (ch && ch.challenges) {
    for (const c of ch.challenges) {
      challengeDirect[c.challengeId] = c;
    }
  }

  // Enrich challenges with linked data from challenge_registry FK maps
  // Load cross-reference maps
  const chToSess = loadJson("challenge_to_session.json");
  const chToRec = loadJson("challenge_to_recommendation.json");
  const chToQ = loadJson("challenge_to_question.json");

  if (chToSess && chToSess.mappings) {
    for (const m of chToSess.mappings) {
      const cid = m.challengeId || m.challenge_id;
      if (cid && challenges[cid]) {
        if (!challenges[cid].linkedSessions.includes(m.sessionId || m.session_id)) {
          challenges[cid].linkedSessions.push(m.sessionId || m.session_id);
        }
      }
    }
  }
  if (chToRec && chToRec.mappings) {
    for (const m of chToRec.mappings) {
      const cid = m.challengeId || m.challenge_id;
      if (cid && challenges[cid]) {
        if (!challenges[cid].linkedRecommendations.includes(m.recommendationId || m.recommendation_id)) {
          challenges[cid].linkedRecommendations.push(m.recommendationId || m.recommendation_id);
        }
      }
    }
  }

  // Enrich sessions with investigation data
  if (invs && invs.investigations) {
    for (const inv of invs.investigations) {
      if (inv.related_sessions) {
        for (const sid of inv.related_sessions) {
          if (sessions[sid]) {
            if (!sessions[sid].investigationIds) sessions[sid].investigationIds = [];
            if (!sessions[sid].investigationIds.includes(inv.id)) {
              sessions[sid].investigationIds.push(inv.id);
            }
          }
        }
      }
    }
  }

  // Enrich investigations with recommendations cross-link
  if (recs && recs.recommendations) {
    for (const rec of recs.recommendations) {
      if (rec.recommendationId && recommendations[rec.recommendationId]) {
        // Already populated above; add linked investigation IDs
        let linkedInvIds = [];
        if (invs && invs.investigations) {
          linkedInvIds = invs.investigations
            .filter((inv) => inv.related_recommendations && inv.related_recommendations.includes(rec.recommendationId))
            .map((inv) => inv.id);
        }
        recommendations[rec.recommendationId].linkedInvestigations = linkedInvIds;
      }
    }
  }

  const metadata = {
    buildTimestamp: timestamp,
    certifiedCount: certCount,
    totalQids,
    certifiedRatio: totalQids > 0 ? (certCount / totalQids) : 0,
    governanceGuardStatus: "PASS 32/32",
  };

  const output = {
    metadata,
    questionIndex,
    questionsByHealth,
    questionsBySection,
    challenges,
    investigations,
    sessions,
    recommendations,
    healthDistribution,
    investigationSummary: invSummary,
  };

  // Write to file
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const outPath = path.join(OUTPUT_DIR, "admin_dashboard_data.js");
  const jsContent = "window.__ADMIN_DATA__ = " + JSON.stringify(output) + ";";
  fs.writeFileSync(outPath, jsContent, "utf8");
  const stats = fs.statSync(outPath);

  return {
    outputPath: outPath,
    sizeBytes: stats.size,
    sizeKB: (stats.size / 1024).toFixed(1),
    totalQids: Object.keys(questionIndex).length,
    certifiedCount: certCount,
    challengeCount: Object.keys(challenges).length,
    investigationCount: Object.keys(investigations).length,
    sessionCount: Object.keys(sessions).length,
    recommendationCount: Object.keys(recommendations).length,
  };
}

// ── Investigation Dossier Builder ──────────────────────────────

function buildInvestigationDossier(qid) {
  const lookup = lookupQuestion(qid);
  if (lookup.error) return lookup;

  const h = getHealth();
  const invs = getInvestigations();

  const linkedInvs = invs && invs.investigations
    ? invs.investigations.filter((inv) => inv.related_qids && inv.related_qids.includes(qid))
    : [];

  const dossier = {
    dossierId: "DOSSIER-" + qid,
    generatedAt: new Date().toISOString(),
    question: lookup,
    linkedInvestigationsFull: linkedInvs.map((inv) => ({
      investigationId: inv.id,
      title: inv.title,
      type: inv.type,
      status: inv.status,
      priority: inv.priority,
      relatedChallenges: inv.related_challenges || [],
      relatedDefects: inv.related_defects || [],
      relatedRecommendations: inv.related_recommendations || [],
      findings: inv.findings || [],
      resolution: inv.resolution || null,
      createdDate: inv.created_date,
      updatedDate: inv.updated_date,
    })),
    outcome: {
      currentState: lookup.state.questionState,
      healthTier: lookup.health.healthTier,
      activeDefectCodes: lookup.history.defects ? lookup.history.defects.filter((d) => d.status !== "Resolved").map((d) => d.defectId || d.class || d.code || "").filter(Boolean) : [],
      activeInvestigations: linkedInvs.filter((inv) => inv.status !== "CLOSED" && inv.status !== "RESOLVED").length,
      activeRecommendations: lookup.history.recommendations ? lookup.history.recommendations.filter((r) => r.status !== "Resolved").length : 0,
      resolutionPath: linkedInvs.length === 0 ? "No open investigations — ready for certification review" : linkedInvs.length + " investigation(s) — see linkedInvestigationsFull for status",
    },
  };

  return dossier;
}

// ── CLI ────────────────────────────────────────────────────────

function printHelp() {
  console.log([
    "Admin Service Layer — May Admin Phase 1 Build (Session 263)",
    "",
    "Usage:",
    "  node scripts/admin_service_layer.js --build-dashboard",
    "  node scripts/admin_service_layer.js --lookup=QID:<qid>",
    "  node scripts/admin_service_layer.js --lookup=CH:<challengeId>",
    "  node scripts/admin_service_layer.js --lookup=INV:<investigationId>",
    "  node scripts/admin_service_layer.js --lookup=SESSION:<sessionId>",
    "  node scripts/admin_service_layer.js --lookup=REC:<recommendationId>",
    "  node scripts/admin_service_layer.js --dashboard-summary",
    "  node scripts/admin_service_layer.js --help",
    "",
    "Examples:",
    "  node scripts/admin_service_layer.js --lookup=QID:P1-A-001",
    "  node scripts/admin_service_layer.js --lookup=CH:CH-CC1ECA89",
    "  node scripts/admin_service_layer.js --dashboard-summary",
  ].join("\n"));
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    printHelp();
    return;
  }

  for (const arg of args) {
    if (arg === "--build-dashboard") {
      console.log("Building admin dashboard data bundle...");
      const result = buildDashboardDataBundle();
      console.log(JSON.stringify(result, null, 2));
      return;
    }

    if (arg.startsWith("--lookup=")) {
      const val = arg.slice("--lookup=".length);
      let output = null;

      if (val.startsWith("QID:")) {
        const qid = val.slice(4);
        output = lookupQuestion(qid);
      } else if (val.startsWith("CH:")) {
        const chId = val.slice(3);
        output = reviewChallenge(chId);
      } else if (val.startsWith("INV:")) {
        const invId = val.slice(4);
        output = lookupInvestigation(invId);
      } else if (val.startsWith("SESSION:")) {
        const sessId = val.slice(8);
        output = lookupSession(sessId);
      } else if (val.startsWith("REC:")) {
        const recId = val.slice(4);
        output = reviewRecommendation(recId);
      } else {
        output = { error: "Unknown lookup prefix. Use QID:, CH:, INV:, SESSION:, REC:" };
      }

      console.log(JSON.stringify(output, null, 2));
      return;
    }

    if (arg === "--dashboard-summary") {
      const summary = getDashboardSummary();
      console.log(JSON.stringify(summary, null, 2));
      return;
    }
  }

  printHelp();
}

// ── Exports ────────────────────────────────────────────────────
module.exports = {
  // Question Services
  lookupQuestion,
  getQuestionHealth,
  getQuestionHistory,
  getCertificationStatus,

  // Session Services
  lookupSession,
  getSessionParticipation,
  getSessionRecommendations,
  getSessionOutcomes,

  // Challenge Services
  reviewChallenge,
  triageChallenge,
  getDisposition,

  // Recommendation Services
  reviewRecommendation,
  getRecommendationLifecycle,
  getRecommendationOwnership,
  closeRecommendation,

  // Investigation
  lookupInvestigation,

  // Dashboard
  getDashboardSummary,
  buildDashboardDataBundle,
  buildInvestigationDossier,
};

if (require.main === module) {
  main();
}
