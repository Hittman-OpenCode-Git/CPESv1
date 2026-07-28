// S268 operations pilot — batch lookup script
// Runs all entity lookups via admin_service_layer.js module exports

const fs = require("fs");
const path = require("path");
const ROOT = "C:/users/user/onedrive/desktop/cma_part_1_2026";
const admin = require(path.join(ROOT, "scripts/admin_service_layer.js"));

const results = {
  sessionId: "268",
  title: "May Admin Phase 1 — Administrative Operations Pilot",
  generatedAt: new Date().toISOString(),
  thresholds: {
    questionSamplesPerPackCertified: 5,
    questionSamplesInAudit: 5,
    questionSamplesUnprocessed: 5,
    challengeFullReview: true,
    investigationFullReview: true,
    sessionFullReview: true,
    recommendationFullReview: true,
    crossEntityTraces: 3
  },
  questionOperations: {},
  challengeOperations: {},
  investigationOperations: {},
  sessionOperations: {},
  recommendationOperations: {},
  crossEntityTraces: [],
  summary: {}
};

// ── Question Operations ──────────────────────────────────────
const perPack = {};
const allLookups = [];

// Sample by pack from questionIndex
const history = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts", "output", "question_history.json"), "utf8"));
const questions = history.questions || {};

// Gather categorized QIDs
const certifiedByPack = { pack_a: [], pack_b: [], pack_c: [], pack_d: [], pack_e: [] };
const inAuditQids = [];
const unprocessedQids = [];

for (const [qid, q] of Object.entries(questions)) {
  const pack = q.pack || "unknown";
  const state = q.currentState || "Unknown";
  if (state === "Certified" && certifiedByPack[pack]) {
    certifiedByPack[pack].push(qid);
  } else if (state === "In Audit") {
    inAuditQids.push(qid);
  } else if (state === "Unprocessed") {
    unprocessedQids.push(qid);
  }
}

// Sample certified: 5 per pack
results.questionOperations.certifiedSamples = {};
const allSampledQids = [];
for (const [pack, qids] of Object.entries(certifiedByPack)) {
  const sample = qids.slice(0, 5);
  results.questionOperations.certifiedSamples[pack] = sample;
  allSampledQids.push(...sample);
}

// Sample In Audit: 5
const inAuditSample = inAuditQids.slice(0, 5);
results.questionOperations.inAuditSamples = inAuditSample;
allSampledQids.push(...inAuditSample);

// Sample Unprocessed: 5
const unprocessedSample = unprocessedQids.slice(0, 5);
results.questionOperations.unprocessedSamples = unprocessedSample;
allSampledQids.push(...unprocessedSample);

// Run lookups and collect metrics
const lookupResults = [];
const timings = [];
for (const qid of allSampledQids) {
  const t0 = Date.now();
  const result = admin.lookupQuestion(qid);
  const t1 = Date.now();
  timings.push(t1 - t0);
  lookupResults.push({
    qid,
    error: result.error || null,
    state: result.state ? result.state.questionState : null,
    healthScore: result.health ? result.health.healthScore : null,
    healthTier: result.health ? result.health.healthTier : null,
    sectionsReturned: Object.keys(result).filter(k => k !== "error" && k !== "query" && k !== "queriedAt").length,
    fksTotal: result.traceability ? result.traceability.totalFks : 0,
    fksBroken: result.traceability ? result.traceability.broken : 0,
    durationMs: t1 - t0
  });
}

results.questionOperations.lookupResults = lookupResults;
results.questionOperations.avgLookupTimeMs = Math.round(timings.reduce((a,b) => a+b, 0) / timings.length);
results.questionOperations.totalLookups = allSampledQids.length;
results.questionOperations.failedLookups = lookupResults.filter(r => r.error).length;

// ── Challenge Operations ──────────────────────────────────────
const challenges = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts", "output", "challenge_registry.json"), "utf8"));
const challengeList = challenges.challenges || [];
const challengeResults = [];
const challengeErrors = [];

for (const c of challengeList) {
  const result = admin.reviewChallenge(c.challengeId);
  if (result.error) {
    challengeErrors.push({ challengeId: c.challengeId, error: result.error });
  } else {
    challengeResults.push({
      challengeId: result.challengeId,
      type: result.type,
      status: result.status,
      triageCategory: result.triage ? result.triage.category : null,
      linkedInvestigations: result.linkedInvestigations || [],
      linkedRecommendations: result.linkedRecommendations || [],
      resolution: result.resolution
    });
  }
}

results.challengeOperations = {
  total: challengeList.length,
  reviewed: challengeResults.length,
  errors: challengeErrors.length,
  errorList: challengeErrors,
  byStatus: {},
  byType: {},
  byTriageCategory: {},
  triagedCount: 0,
  untriagedCount: 0
};

for (const c of challengeResults) {
  results.challengeOperations.byStatus[c.status] = (results.challengeOperations.byStatus[c.status] || 0) + 1;
  results.challengeOperations.byType[c.type] = (results.challengeOperations.byType[c.type] || 0) + 1;
  const cat = c.triageCategory || "Untriaged";
  results.challengeOperations.byTriageCategory[cat] = (results.challengeOperations.byTriageCategory[cat] || 0) + 1;
  if (c.triageCategory) results.challengeOperations.triagedCount++;
  else results.challengeOperations.untriagedCount++;
}

// ── Investigation Operations ──────────────────────────────────
const invs = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts", "output", "investigation_registry.json"), "utf8"));
const invList = invs.investigations || [];
const invResults = [];
const invErrors = [];

for (const inv of invList) {
  const result = admin.lookupInvestigation(inv.id);
  if (result.error) {
    invErrors.push({ investigationId: inv.id, error: result.error });
  } else {
    invResults.push({
      investigationId: result.investigationId,
      type: result.type,
      status: result.status,
      relatedQidCount: (result.relatedQids || []).length,
      relatedChallengeCount: (result.relatedChallenges || []).length,
      relatedRecommendationCount: (result.relatedRecommendations || []).length,
      relatedDefectCount: (result.relatedDefects || []).length,
      findingsCount: (result.findings || []).length
    });
  }
}

results.investigationOperations = {
  total: invList.length,
  reviewed: invResults.length,
  errors: invErrors.length,
  errorList: invErrors,
  byStatus: {},
  byType: {}
};

for (const inv of invResults) {
  results.investigationOperations.byStatus[inv.status] = (results.investigationOperations.byStatus[inv.status] || 0) + 1;
  results.investigationOperations.byType[inv.type] = (results.investigationOperations.byType[inv.type] || 0) + 1;
}

// ── Session Operations ────────────────────────────────────────
const sessions = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts", "output", "session_registry.json"), "utf8"));
const sessionList = sessions.sessions || [];
const sessionResults = [];
const sessionErrors = [];

for (const s of sessionList) {
  const result = admin.lookupSession(s.sessionId);
  if (result.error) {
    sessionErrors.push({ sessionId: s.sessionId, error: result.error });
  } else {
    sessionResults.push({
      sessionId: result.identity ? result.identity.sessionId : s.sessionId,
      title: result.identity ? result.identity.title : "",
      mode: result.identity ? result.identity.mode : "UNKNOWN",
      totalQuestions: result.questions ? result.questions.totalQuestions : 0,
      certifiedCount: result.questions ? result.questions.certifiedCount : 0,
      certifiedRatio: result.questions ? result.questions.certifiedRatio : 0,
      challengeCount: result.challenges ? result.challenges.totalChallenges : 0,
      recommendationCount: result.recommendations ? result.recommendations.generated.length : 0,
      investigationCount: result.investigations ? result.investigations.opened.length : 0
    });
  }
}

results.sessionOperations = {
  total: sessionList.length,
  reviewed: sessionResults.length,
  errors: sessionErrors.length,
  errorList: sessionErrors,
  byMode: {},
  totalQidsAcrossSessions: 0,
  totalCertifiedAcrossSessions: 0
};

for (const s of sessionResults) {
  results.sessionOperations.byMode[s.mode] = (results.sessionOperations.byMode[s.mode] || 0) + 1;
  results.sessionOperations.totalQidsAcrossSessions += s.totalQuestions;
  results.sessionOperations.totalCertifiedAcrossSessions += s.certifiedCount;
}

// ── Recommendation Operations ─────────────────────────────────
const recs = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts", "output", "recommendation_registry.json"), "utf8"));
const recList = recs.recommendations || [];
const recResults = [];
const recErrors = [];

for (const r of recList) {
  const result = admin.reviewRecommendation(r.recommendationId);
  if (result.error) {
    recErrors.push({ recommendationId: r.recommendationId, error: result.error });
  } else {
    recResults.push({
      recommendationId: result.recommendationId,
      type: result.type,
      severity: result.severity,
      status: result.status,
      questionCount: result.questionCount,
      createdSession: result.createdSession,
      targetSession: result.targetSession,
      resolutionSession: result.resolutionSession,
      linkedInvestigations: result.linkedInvestigations || []
    });
  }
}

results.recommendationOperations = {
  total: recList.length,
  reviewed: recResults.length,
  errors: recErrors.length,
  errorList: recErrors,
  byStatus: {},
  bySeverity: {},
  openCount: 0,
  resolvedCount: 0
};

for (const r of recResults) {
  results.recommendationOperations.byStatus[r.status] = (results.recommendationOperations.byStatus[r.status] || 0) + 1;
  results.recommendationOperations.bySeverity[r.severity] = (results.recommendationOperations.bySeverity[r.severity] || 0) + 1;
  if (r.status === "Open") results.recommendationOperations.openCount++;
  if (r.status === "Resolved") results.recommendationOperations.resolvedCount++;
}

// ── Cross-Entity Traces ───────────────────────────────────────
const traceQids = ["P1-A-036", "P1-EC-004", "P1B-B-153"];
for (const qid of traceQids) {
  const trace = { qid, chain: [] };
  
  // QID lookup
  const qResult = admin.lookupQuestion(qid);
  trace.questionLookup = {
    state: qResult.state ? qResult.state.questionState : "Unknown",
    healthTier: qResult.health ? qResult.health.healthTier : "Unknown",
    challengeLinks: qResult.history ? (qResult.history.challenges || []).map(c => c.challengeId) : [],
    investigationLinks: (qResult.investigations || []).map(inv => inv.investigationId)
  };
  
  // For each challenge linked, trace to investigation + recommendation
  const chIds = trace.questionLookup.challengeLinks;
  trace.challengeChain = [];
  let totalFks = 0;
  let brokenFks = 0;
  
  for (const chId of chIds.slice(0, 3)) {
    const chResult = admin.reviewChallenge(chId);
    if (chResult.error) {
      brokenFks++;
      trace.challengeChain.push({ challengeId: chId, error: chResult.error });
    } else {
      totalFks += 1; // QID→CH
      totalFks += (chResult.linkedInvestigations || []).length; // CH→INV
      totalFks += (chResult.linkedRecommendations || []).length; // CH→REC
      trace.challengeChain.push({
        challengeId: chId,
        type: chResult.type,
        status: chResult.status,
        linkedInvestigations: chResult.linkedInvestigations || [],
        linkedRecommendations: chResult.linkedRecommendations || []
      });
      
      // For each linked investigation
      for (const invId of (chResult.linkedInvestigations || []).slice(0, 2)) {
        const invResult = admin.lookupInvestigation(invId);
        if (!invResult.error) {
          totalFks += (invResult.relatedQids || []).length;
          totalFks += (invResult.relatedChallenges || []).length;
          totalFks += (invResult.relatedRecommendations || []).length;
        }
      }
    }
  }
  
  // Investigation direct links
  const invIds = trace.questionLookup.investigationLinks;
  for (const invId of invIds.slice(0, 2)) {
    const invResult = admin.lookupInvestigation(invId);
    if (!invResult.error) {
      totalFks += (invResult.relatedQids || []).length;
      totalFks += (invResult.relatedChallenges || []).length;
    }
  }
  
  trace.totalFks = totalFks;
  trace.brokenFks = brokenFks;
  trace.verdict = brokenFks === 0 ? "PASS" : "FAIL";
  results.crossEntityTraces.push(trace);
}

// ── Summary ───────────────────────────────────────────────────
results.summary = {
  totalLookupsPerformed: results.questionOperations.totalLookups +
    results.challengeOperations.total +
    results.investigationOperations.total +
    results.sessionOperations.total +
    results.recommendationOperations.total,
  questionsSampled: results.questionOperations.totalLookups,
  challengesReviewed: results.challengeOperations.total,
  investigationsReviewed: results.investigationOperations.total,
  sessionsReviewed: results.sessionOperations.total,
  recommendationsReviewed: results.recommendationOperations.total,
  crossEntityTraces: results.crossEntityTraces.length,
  totalErrors: results.questionOperations.failedLookups +
    results.challengeOperations.errors +
    results.investigationOperations.errors +
    results.sessionOperations.errors +
    results.recommendationOperations.errors,
  totalBrokenFks: results.crossEntityTraces.reduce((s, t) => s + t.brokenFks, 0),
  avgQuestionLookupTimeMs: results.questionOperations.avgLookupTimeMs,
  verdict: "PASS"
};

// Mark PASS/FAIL
if (results.summary.totalErrors > 0 || results.summary.totalBrokenFks > 0) {
  results.summary.verdict = "FAIL — errors or broken FKs detected";
}

fs.writeFileSync(
  path.join(ROOT, "reports", "session268", "SESSION268_OPERATIONS_PILOT.json"),
  JSON.stringify(results, null, 2),
  "utf8"
);

console.log("S268 Operations Pilot complete.");
console.log(`Total lookups: ${results.summary.totalLookupsPerformed}`);
console.log(`Errors: ${results.summary.totalErrors}`);
console.log(`Broken FKs: ${results.summary.totalBrokenFks}`);
console.log(`Avg QID lookup time: ${results.summary.avgQuestionLookupTimeMs}ms`);
console.log(`Verdict: ${results.summary.verdict}`);
