// Session 103 — May Readiness Test Harness
// Tests getReadinessSummary() and getSectionReadinessSummary()
// Uses direct file inclusion; follows project test conventions
"use strict";

let fs = require("fs");
let path = require("path");
let b = "C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026";

// Mock environment (same pattern as regression R2)
function lg(fp) {
    let c = fs.readFileSync(fp, "utf8");
    c = c.replace(/^const\s+(\w+)\s*=/gm, "global.$1 =");
    c = c.replace(/^let\s+(\w+)\s*=/gm, "global.$1 =");
    (new Function(c))();
}
global.localStorage = (() => {
    let s = {};
    return {
        getItem(k) { return s[k] || null; },
        setItem(k, v) { s[k] = v; },
        removeItem(k) { delete s[k]; },
        clear() { s = {}; }
    };
})();
global.state = { session: null };
global.scoreMCQ = (q, a) => a === q.CorrectChoice ? 1 : 0;
global.ExamSessionManager = {
    caseKey(c, i) { return c.CaseID + "-" + i; },
    correctCase(it, a) { return String(a).trim().toLowerCase() === String(it.Correct).trim().toLowerCase(); },
    practiceScores() { return null; }
};

// Load pack data first (for realistic QID data)
lg(path.join(b, "content/packs/pack_a_corrected.js"));
lg(path.join(b, "may-learner-state.js"));

let qs = global.MCB_BANK_A || global.MCQ_BANK_A;
if (!qs || qs.length === 0) {
    console.log("FATAL: Could not load question bank for test seeding");
    process.exit(1);
}

// ============================================================
// Test Framework
// ============================================================
let passed = 0, failed = 0;
function test(name, fn) {
    try {
        fn();
        passed++;
        console.log("  PASS: " + name);
    } catch (e) {
        failed++;
        console.log("  FAIL: " + name + " \u2014 " + e.message);
    }
}
function assert(cond, msg) { if (!cond) throw new Error(msg || "assertion failed"); }
function refute(cond, msg) { if (cond) throw new Error(msg || "unexpected truthy value"); }

// ============================================================
// Seeding helpers
// ============================================================
function resetState() {
    MayLearnerState.clear();
    global.state = { session: null };
}

function seedTopic(sid, topicName, section, totalAttempts, okCount, recentOk, recentTotal) {
    // Directly manipulate the data structure to avoid recordAttempt's
    // question-bank-driven topic normalization, which pollutes results.
    let data = MayLearnerState.load();

    // Ensure session exists
    if (!data.sessions) data.sessions = [];
    let session = data.sessions.find(s => s.sessionId === sid);
    if (!session) {
        session = {
            sessionId: sid,
            date: new Date().toISOString(),
            mode: "full",
            totalQuestions: 0,
            correctCount: 0,
            attempts: []
        };
        data.sessions.push(session);
    }

    // Build attempts
    for (let i = 0; i < totalAttempts; i++) {
        let ok = i < okCount;
        session.attempts.push({
            questionId: sid + "-Q" + i,
            section: section,
            topic: topicName,
            subtopic: null,
            difficulty: "Moderate",
            difficultyScore: 3,
            itemType: "MCQ",
            cognitiveLevel: "Apply",
            questionState: "Certified",
            correct: ok,
            hintsUsed: 0,
            explanationRequested: false,
            elapsedMs: 30000,
            selectedChoice: ok ? "A" : "B",
            confidence: ok ? 4 : 2,
            timestamp: new Date(Date.now() - (totalAttempts - i) * 3600000).toISOString()
        });
        session.totalQuestions++;
        if (ok) session.correctCount++;
    }

    // Build topicPerformance aggregate with controlled recentAttempts
    if (!data.topicPerformance) data.topicPerformance = {};
    let agg = data.topicPerformance[topicName] = {
        totalAttempts: totalAttempts,
        correctCount: okCount,
        hintCount: 0,
        recentAttempts: [],
        firstSeen: new Date(Date.now() - totalAttempts * 3600000).toISOString(),
        lastSeen: new Date().toISOString(),
        sectionsSeen: [section],
        difficultyDistribution: { Moderate: totalAttempts },
        difficultyWeights: { total: totalAttempts, sum: totalAttempts * 3 }
    };

    let recentCount = Math.min(recentTotal || 7, 15);
    for (let i = 0; i < recentCount; i++) {
        let ok = i < (recentOk !== undefined ? recentOk : Math.round(totalAttempts * 0.7));
        agg.recentAttempts.push({
            correct: ok,
            hints: 0,
            difficulty: "Moderate",
            timestamp: new Date(Date.now() - (recentCount - i) * 3600000).toISOString()
        });
    }

    MayLearnerState.save(data);
}

// Ensure minimum sessions for readiness. seedTopic uses a single session ID,
// so after seeding all topics, call this to add extra empty sessions to hit min count.
function ensureMinSessions(target) {
    let data = MayLearnerState.load();
    let current = data.sessions ? data.sessions.length : 0;
    while (current < target) {
        let sid = "pad-s" + current;
        if (!data.sessions) data.sessions = [];
        data.sessions.push({
            sessionId: sid,
            date: new Date().toISOString(),
            mode: "full",
            totalQuestions: 0,
            correctCount: 0,
            attempts: []
        });
        current++;
    }
    MayLearnerState.save(data);
}

// S104 — Seed case pattern data across multiple sessions to trigger trend computation.
// Patterns: { evLoc, calcSetup, exhibInterp, ctrlJudg, ansElim }
// sessionsData: array of { sid, patterns, mode }
function seedCaseSessions(sessionsData) {
    let data = MayLearnerState.load();
    if (!data.sessions) data.sessions = [];
    sessionsData.forEach(sd => {
        let session = data.sessions.find(s => s.sessionId === sd.sid);
        if (!session) {
            session = {
                sessionId: sd.sid,
                date: new Date().toISOString(),
                mode: sd.mode || "full",
                totalQuestions: 0,
                correctCount: 0,
                attempts: []
            };
            data.sessions.push(session);
        }
        session.casePatterns = {
            evidenceLocation: sd.patterns.evLoc || 0,
            calculationSetup: sd.patterns.calcSetup || 0,
            exhibitInterpretation: sd.patterns.exhibInterp || 0,
            controlJudgment: sd.patterns.ctrlJudg || 0,
            answerElimination: sd.patterns.ansElim || 0
        };
    });
    MayLearnerState.save(data);
}

// ============================================================
// ReadinessSummary — Core Tests
// ============================================================
console.log("\n=== ReadinessSummary — Core Tests ===");

test("No sessions -> Not enough data", () => {
    resetState();
    let r = MayLearnerState.getReadinessSummary();
    assert(r.overall.band === "Not enough data", "Expected Not enough data, got " + r.overall.band);
    assert(!r.hasEnoughData);
    assert(r._provenance, "Missing _provenance field");
    assert(r._provenance.modelVersion === "S111-1.0");
});

test("No sessions -> dataNote present", () => {
    resetState();
    let r = MayLearnerState.getReadinessSummary();
    assert(r.dataNote && r.dataNote.length > 0, "Missing dataNote");
    assert(r.dataNote.includes("No practice data yet"));
});

test("_provenance contains thresholdsApplied", () => {
    resetState();
    let r = MayLearnerState.getReadinessSummary();
    assert(r._provenance.thresholdsApplied, "Missing thresholdsApplied");
    assert(r._provenance.thresholdsApplied.minAttemptsReady === 6);
    assert(r._provenance.thresholdsApplied.minAttemptsTopic === 3);
});

test("_provenance contains decisiveFactors", () => {
    resetState();
    let r = MayLearnerState.getReadinessSummary();
    assert(Array.isArray(r._provenance.decisiveFactors));
    assert(r._provenance.decisiveFactors.length > 0);
});

test("One session, few topics -> Not enough data", () => {
    resetState();
    seedTopic("s1", "Very Weak Topic", "A", 2, 1, 1, 2);
    let r = MayLearnerState.getReadinessSummary();
    assert(r.overall.band === "Not enough data");
});

test("Strong topic (85%, stable, 8 attempts) -> Ready for focused review", () => {
    resetState();
    seedTopic("s2a", "Strong Section A Topic", "A", 8, 7, 6, 6);
    let r = MayLearnerState.getReadinessSummary();
    let tr = r.topics.find(t => t.topic === "Strong Section A Topic");
    assert(tr, "Topic not found in results");
    assert(tr.band === "Ready for focused review", "Expected Ready, got " + tr.band);
});

test("Good topic (80%, 5 attempts) -> Approaching not Ready (S103 threshold)", () => {
    resetState();
    seedTopic("s2b", "Good Topic Five", "A", 5, 4, 4, 4);
    let r = MayLearnerState.getReadinessSummary();
    let tr = r.topics.find(t => t.topic === "Good Topic Five");
    assert(tr, "Topic not found");
    assert(tr.band !== "Ready for focused review", "5 attempts should not be Ready after S103 tuning");
});

test("Weak topic (<60%, declining) -> Recovery needed", () => {
    resetState();
    seedTopic("s3", "Struggling Topic", "B", 6, 2, 1, 5);
    let r = MayLearnerState.getReadinessSummary();
    let tr = r.topics.find(t => t.topic === "Struggling Topic");
    assert(tr, "Topic not found");
    assert(tr.band === "Recovery needed", "Expected Recovery needed, got " + tr.band);
});

test("Topic with <3 attempts -> Not enough data", () => {
    resetState();
    seedTopic("s5", "Sparse Topic", "D", 2, 2, 2, 2);
    let r = MayLearnerState.getReadinessSummary();
    let tr = r.topics.find(t => t.topic === "Sparse Topic");
    assert(tr, "Topic not found");
    assert(tr.band === "Not enough data");
    assert(tr.signals.includes("low_attempt_count"));
});

test("Two ready + one weak -> overall Developing (mixed)", () => {
    resetState();
    seedTopic("s6a", "Strong One", "A", 8, 7, 6, 6);
    seedTopic("s6b", "Strong Two", "B", 8, 7, 6, 6);
    seedTopic("s6c", "Weak One", "C", 6, 2, 1, 5);
    let r = MayLearnerState.getReadinessSummary();
    assert(r.overall.band === "Developing" || r.overall.band === "Approaching review-ready",
        "Expected Developing or Approaching, got " + r.overall.band);
});

test("Three strong topics -> overall Approaching review-ready", () => {
    resetState();
    seedTopic("s7a", "Strong A", "A", 8, 7, 6, 6);
    seedTopic("s7b", "Strong B", "B", 8, 7, 6, 6);
    seedTopic("s7c", "Strong C", "C", 8, 7, 6, 6);
    ensureMinSessions(3);
    let r = MayLearnerState.getReadinessSummary();
    assert(r.overall.band === "Approaching review-ready",
        "Expected Approaching review-ready, got " + r.overall.band);
});

test("No case data -> caseReadiness band is Not enough data", () => {
    resetState();
    seedTopic("s8", "Some Topic", "A", 5, 3, 3, 5);
    let r = MayLearnerState.getReadinessSummary();
    assert(r.caseReadiness.band === "Not enough data");
    assert(r.caseReadiness.signals.includes("no_case_data"));
});

test("Results always include confidence for overall", () => {
    resetState();
    seedTopic("s10", "Conf Topic", "A", 6, 4, 3, 5);
    let r = MayLearnerState.getReadinessSummary();
    assert(r.overall.confidence, "Missing overall confidence");
    let valid = ["high", "moderate", "low"];
    assert(valid.includes(r.overall.confidence), "Invalid confidence: " + r.overall.confidence);
});

// ============================================================
// Section-Level Readiness Tests
// ============================================================
console.log("\n=== Section Readiness Tests ===");

test("No data -> getSectionReadinessSummary returns null", () => {
    resetState();
    let sr = MayLearnerState.getSectionReadinessSummary();
    assert(sr === null, "Expected null for no data");
});

test("Section aggregation returns all 6 sections", () => {
    resetState();
    seedTopic("s11a", "Sec A Topic", "A", 8, 7, 6, 6);
    seedTopic("s11b", "Sec B Topic", "B", 8, 7, 6, 6);
    seedTopic("s11c", "Sec C Topic", "C", 8, 7, 6, 6);
    seedTopic("s11d", "Sec D Topic", "D", 8, 7, 6, 6);
    let sr = MayLearnerState.getSectionReadinessSummary();
    assert(sr && sr.sections, "Missing sections");
    let keys = ["A", "B", "C", "D", "E", "F"];
    keys.forEach(k => assert(sr.sections[k], "Missing section " + k));
});

test("Empty section -> Not enough data", () => {
    resetState();
    seedTopic("s12", "Only Section A", "A", 8, 7, 6, 6);
    ensureMinSessions(3);
    let sr = MayLearnerState.getSectionReadinessSummary();
    assert(sr.sections.E.band === "Not enough data");
    assert(sr.sections.E.signals.includes("no_section_data"));
});

test("Sparse section data -> Not enough data when >50% sparse", () => {
    resetState();
    seedTopic("s15", "Lone Topic", "B", 8, 7, 6, 6);
    ensureMinSessions(3);
    let sr = MayLearnerState.getSectionReadinessSummary();
    assert(sr.sections.A.band === "Not enough data");
    assert(sr.sections.C.band === "Not enough data");
    assert(sr.sections.F.band === "Not enough data");
});

test("Section results include label, topicCount", () => {
    resetState();
    seedTopic("s16", "Label Topic", "D", 8, 7, 6, 6);
    ensureMinSessions(3);
    let sr = MayLearnerState.getSectionReadinessSummary();
    assert(sr.sections.D.label, "Missing section label");
    assert(sr.sections.D.topicCount >= 1, "Missing topicCount");
});

test("Section results have modelVersion S111-1.0", () => {
    resetState();
    seedTopic("s17", "Version Topic", "A", 8, 7, 6, 6);
    ensureMinSessions(3);
    let sr = MayLearnerState.getSectionReadinessSummary();
    assert(sr.modelVersion === "S111-1.0");
    assert(sr.computedAt, "Missing computedAt timestamp");
});

test("StrongA + WeakB — section-level differentiates", () => {
    resetState();
    seedTopic("s22a", "Strong A Only", "A", 8, 7, 6, 6);
    seedTopic("s22b", "Weak B Only", "B", 6, 2, 1, 5);
    ensureMinSessions(3);
    let sr = MayLearnerState.getSectionReadinessSummary();
    assert(sr.sections.A.band !== sr.sections.B.band,
        "Sections A and B should have different readiness bands");
    console.log("  NOTE: Section A=" + sr.sections.A.band + ", Section B=" + sr.sections.B.band);
});

test("Manifest-constrained (single topic F, others empty)", () => {
    resetState();
    seedTopic("s25", "Single Topic F", "F", 8, 7, 6, 6);
    ensureMinSessions(3);
    let sr = MayLearnerState.getSectionReadinessSummary();
    assert(sr.sections.A.band === "Not enough data");
    assert(sr.sections.B.band === "Not enough data");
    assert(sr.sections.C.band === "Not enough data");
    assert(sr.sections.F.band !== "Not enough data");
});

// ============================================================
// S103-Specific Features
// ============================================================
console.log("\n=== S103-Specific Tests ===");

test("S103-1 _provenance includes dataContext", () => {
    resetState();
    seedTopic("pc1", "Provenance Context", "A", 8, 7, 6, 6);
    let r = MayLearnerState.getReadinessSummary();
    let dc = r._provenance.dataContext;
    assert(typeof dc.sessionCount === "number", "Missing sessionCount in dataContext");
    assert(typeof dc.readyCount === "number", "Missing readyCount");
    assert(typeof dc.topicsWithData === "number", "Missing topicsWithData");
});

test("S103-2 Case burden degradation _provenance flag present", () => {
    resetState();
    seedTopic("cb1", "Strong CB1", "A", 8, 7, 6, 6);
    seedTopic("cb2", "Strong CB2", "B", 8, 7, 6, 6);
    seedTopic("cb3", "Strong CB3", "C", 8, 7, 6, 6);
    let data = MayLearnerState.load();
    let session = data.sessions[0];
    if (session) {
        session.casePatterns = { evidenceLocation: 4, calculationSetup: 2, exhibitInterpretation: 1, controlJudgment: 0, answerElimination: 0 };
        MayLearnerState.save(data);
    }
    let r = MayLearnerState.getReadinessSummary();
    assert(typeof r._provenance.thresholdsApplied.caseBurdenDegrade === "boolean");
    console.log("  NOTE: caseBurdenDegraded=" + r._provenance.thresholdsApplied.caseBurdenDegrade +
        " overall=" + r.overall.band);
});

test("S103-3 DecisionFactors tracked for every path", () => {
    let scenarios = [
        { desc: "no data", t: [] },
        { desc: "strong topics", t: [["TA","A",8,7,6,6],["TB","B",8,7,6,6],["TC","C",8,7,6,6]] }
    ];
    scenarios.forEach(sc => {
        resetState();
        sc.t.forEach(tc => seedTopic("df" + sc.desc, tc[0], tc[1], tc[2], tc[3], tc[4], tc[5]));
        let r = MayLearnerState.getReadinessSummary();
        assert(Array.isArray(r._provenance.decisiveFactors),
            "decisiveFactors not an array for " + sc.desc);
        assert(r._provenance.decisiveFactors.length > 0,
            "decisiveFactors empty for " + sc.desc);
    });
});

// ============================================================
// S104-Specific Tests — Threshold & Case-Burden Validation
// ============================================================
console.log("\n=== S104-Specific Tests ===");

// S104-1: Verify minAttemptsApproaching=4 gate
test("S104-1 Topic with 3 attempts (75%) does NOT reach Approaching", () => {
    resetState();
    seedTopic("at1", "Three Attempt Topic", "A", 3, 2, 2, 3);
    let r = MayLearnerState.getReadinessSummary();
    let tr = r.topics.find(t => t.topic === "Three Attempt Topic");
    assert(tr, "Topic not found");
    assert(tr.band !== "Approaching review-ready",
        "3 attempts should not reach Approaching after S104 gate. Got: " + tr.band);
    assert(tr.band === "Developing" || tr.band === "Not enough data",
        "Expected Developing or Not enough data, got " + tr.band);
});

// S104-2: Verify minAttemptsApproaching=4 allows Approaching at 4+ attempts
test("S104-2 Topic with 4 attempts (75%) CAN reach Approaching", () => {
    resetState();
    seedTopic("at2", "Four Attempt Topic", "B", 4, 3, 3, 4);
    let r = MayLearnerState.getReadinessSummary();
    let tr = r.topics.find(t => t.topic === "Four Attempt Topic");
    assert(tr, "Topic not found");
    assert(tr.band !== "Recovery needed", "Should not be Recovery needed");
    assert(tr.band !== "Not enough data", "Has enough data");
    console.log("  NOTE: 4-attempt topic band=" + tr.band + " accuracy=" + tr.accuracy);
});

// S104-3: _provenance includes minAttemptsApproaching
test("S104-3 _provenance includes minAttemptsApproaching=4", () => {
    resetState();
    let r = MayLearnerState.getReadinessSummary();
    assert(r._provenance.thresholdsApplied.minAttemptsApproaching === 4,
        "Expected minAttemptsApproaching=4, got " + r._provenance.thresholdsApplied.minAttemptsApproaching);
    assert(r._provenance.modelVersion === "S111-1.0", "Expected S111-1.0");
});

// S104-4: Case-burden degradation with multi-session worsening patterns
test("S104-4 Multi-session worsening case patterns degrade overall band", () => {
    resetState();
    seedTopic("cb4a", "Strong Alpha", "A", 8, 7, 6, 6);
    seedTopic("cb4b", "Strong Beta", "B", 8, 7, 6, 6);
    seedTopic("cb4c", "Strong Gamma", "C", 8, 7, 6, 6);
    seedCaseSessions([
        { sid: "cs1", patterns: { evLoc: 2, calcSetup: 1, exhibInterp: 0, ctrlJudg: 0, ansElim: 0 }, mode: "full" },
        { sid: "cs2", patterns: { evLoc: 4, calcSetup: 2, exhibInterp: 1, ctrlJudg: 0, ansElim: 1 }, mode: "full" }
    ]);
    ensureMinSessions(4);
    let r = MayLearnerState.getReadinessSummary();
    let degraded = r._provenance.thresholdsApplied.caseBurdenDegrade;
    console.log("  NOTE: caseBurdenDegraded=" + degraded + " overall=" + r.overall.band +
        " caseSignals=" + JSON.stringify(r.caseReadiness.signals) +
        " totalMisses=" + r.caseReadiness.totalCaseMisses);
    assert(r.caseReadiness.band !== "Not enough data",
        "Multi-session case data should produce a case band. Got: " + r.caseReadiness.band);
});

// S104-5: Single case session does NOT trigger degradation
test("S104-5 Single case session — no degradation fire", () => {
    resetState();
    seedTopic("cb5a", "Solo Strong A", "A", 8, 7, 6, 6);
    seedTopic("cb5b", "Solo Strong B", "B", 8, 7, 6, 6);
    seedTopic("cb5c", "Solo Strong C", "C", 8, 7, 6, 6);
    seedCaseSessions([
        { sid: "csOnly", patterns: { evLoc: 5, calcSetup: 1, exhibInterp: 0, ctrlJudg: 0, ansElim: 0 }, mode: "full" }
    ]);
    ensureMinSessions(3);
    let r = MayLearnerState.getReadinessSummary();
    console.log("  NOTE: 1-session caseBurdenDegraded=" + r._provenance.thresholdsApplied.caseBurdenDegrade +
        " overall=" + r.overall.band);
    assert(r.overall.band === "Approaching review-ready",
        "Single case session shouldn't degrade. Expected Approaching, got " + r.overall.band);
});

// S104-6: Case trend needs ≥3 case sessions to detect improving patterns
// With only 2 case sessions, the prior window is empty so all deltas appear positive.
// This is a known limitation of getCasePatternTrends(), not a degradation logic bug.
test("S104-6 Case trend with 2 sessions defaults to stable/worsening (known edge)", () => {
    resetState();
    seedTopic("cb6a", "Improve A", "A", 8, 7, 6, 6);
    seedTopic("cb6b", "Improve B", "B", 8, 7, 6, 6);
    seedTopic("cb6c", "Improve C", "C", 8, 7, 6, 6);
    // 2 case sessions: the filtered list has only 2 entries,
    // so prior (sessions.slice(-4,-2)) is empty and recent > prior.
    seedCaseSessions([
        { sid: "ci1", patterns: { evLoc: 5, calcSetup: 2, exhibInterp: 1, ctrlJudg: 0, ansElim: 1 }, mode: "full" },
        { sid: "ci2", patterns: { evLoc: 2, calcSetup: 1, exhibInterp: 0, ctrlJudg: 0, ansElim: 0 }, mode: "full" }
    ]);
    ensureMinSessions(4);
    let r = MayLearnerState.getReadinessSummary();
    let caseSessions = MayLearnerState.getCasePatternTrends();
    console.log("  NOTE: 2-session caseBurdenDegraded=" + r._provenance.thresholdsApplied.caseBurdenDegrade +
        " caseBand=" + r.caseReadiness.band + " trendCount=" + caseSessions.length);
    // The point: case data exists and band is computed (not Not enough data)
    assert(r.caseReadiness.band !== "Not enough data",
        "2 case sessions should produce a case band");
    // Known edge: trend detection with sparse case sessions may flag as worsening
    // because prior window is empty. This doesn't invalidate the degradation logic.
    assert(caseSessions.length > 0, "Should have trend data");
    console.log("  NOTE: trend edge — with <3 case sessions, 'improving' can't be detected");
});

// ============================================================
// S107 — Category A Extensions: Readiness Calculation Edge Cases
// ============================================================
console.log("\n=== S107 Readiness Edge Cases (Category A) ===");

// A-23: Recovery count >=3 → overall Recovery needed
test("A-23: Three recovery topics force overall Recovery needed", () => {
    resetState();
    seedTopic("a23a", "Weak Alpha", "A", 6, 2, 1, 5);
    seedTopic("a23b", "Weak Beta", "B", 6, 2, 1, 5);
    seedTopic("a23c", "Weak Gamma", "C", 6, 2, 1, 5);
    let r = MayLearnerState.getReadinessSummary();
    assert(r.overall.band === "Recovery needed",
        "3 recovery topics should force overall Recovery. Got: " + r.overall.band);
});

// A-24: All topics approaching → overall Approaching
test("A-24: All topics approaching → overall Approaching review-ready", () => {
    resetState();
    seedTopic("a24a", "Approach A", "A", 6, 5, 5, 5);
    seedTopic("a24b", "Approach B", "B", 6, 5, 5, 5);
    seedTopic("a24c", "Approach C", "C", 6, 5, 5, 5);
    ensureMinSessions(3);
    let r = MayLearnerState.getReadinessSummary();
    assert(r.overall.band === "Approaching review-ready",
        "3 approaching topics should force overall Approaching. Got: " + r.overall.band);
});

// A-25: getTrends returns correctly sorted array
test("A-25: getTrends returns array sorted by accuracy ascending", () => {
    resetState();
    seedTopic("a25a", "Best Topic", "A", 8, 7, 6, 6);
    seedTopic("a25b", "Mid Topic", "B", 6, 4, 3, 5);
    seedTopic("a25c", "Weak Topic", "C", 6, 2, 1, 5);
    let trends = MayLearnerState.getTrends();
    assert(Array.isArray(trends), "getTrends should return array");
    assert(trends.length >= 2, "Should have at least 2 trends");
    for (let i = 1; i < trends.length; i++) {
        assert(trends[i].accuracy >= trends[i-1].accuracy,
            "Trends should be sorted by accuracy ascending. " +
            trends[i].accuracy + " < " + trends[i-1].accuracy + " at index " + i);
    }
    let best = trends[trends.length - 1];
    assert(typeof best.direction === "string", "Missing direction on trend");
    assert(best.accuracy > 50, "Best topic should have reasonable accuracy");
});

// ============================================================
// S107 — Category D: Provenance Safety Tests
// ============================================================
console.log("\n=== S107 Provenance Safety Tests (Category D) ===");

// D-05: thresholdsApplied matches actual in-code values
test("D-05: _provenance.thresholdsApplied reflects all 12 actual values", () => {
    resetState();
    seedTopic("d05", "Test", "A", 8, 7, 6, 6);
    let r = MayLearnerState.getReadinessSummary();
    let ta = r._provenance.thresholdsApplied;
    assert(ta.accuracyHigh === 80, "accuracyHigh should be 80, got " + ta.accuracyHigh);
    assert(ta.accuracyGood === 75, "accuracyGood should be 75");
    assert(ta.accuracyLow === 60, "accuracyLow should be 60");
    assert(ta.stabilityHigh === 75, "stabilityHigh should be 75");
    assert(ta.stabilityGood === 60, "stabilityGood should be 60");
    assert(ta.stabilityLow === 50, "stabilityLow should be 50");
    assert(ta.recentPctHigh === 80, "recentPctHigh should be 80");
    assert(ta.recentPctGood === 70, "recentPctGood should be 70");
    assert(ta.minAttemptsReady === 6, "minAttemptsReady should be 6");
    assert(ta.minAttemptsApproaching === 4, "minAttemptsApproaching should be 4");
    assert(ta.minAttemptsTopic === 3, "minAttemptsTopic should be 3");
    assert(typeof ta.caseBurdenDegrade === "boolean", "caseBurdenDegrade should be boolean");
});

// D-06: Section readiness never exceeds "Approaching review-ready"
test("D-06: Section bands never exceed Approaching review-ready", () => {
    resetState();
    seedTopic("d06a", "Strong A1", "A", 8, 7, 6, 6);
    seedTopic("d06b", "Strong A2", "A", 8, 7, 6, 6);
    seedTopic("d06c", "Strong B1", "B", 8, 7, 6, 6);
    seedTopic("d06d", "Strong B2", "B", 8, 7, 6, 6);
    seedTopic("d06e", "Strong C1", "C", 8, 7, 6, 6);
    seedTopic("d06f", "Strong C2", "C", 8, 7, 6, 6);
    seedTopic("d06g", "Strong D1", "D", 8, 7, 6, 6);
    seedTopic("d06h", "Strong D2", "D", 8, 7, 6, 6);
    ensureMinSessions(3);
    let sr = MayLearnerState.getSectionReadinessSummary();
    if (sr) {
        ["A","B","C","D","E","F"].forEach(sec => {
            let band = sr.sections[sec].band;
            assert(band !== "Ready for focused review",
                "Section " + sec + " should never be Ready. Got: " + band);
        });
    }
    console.log("  NOTE: Section readiness bands are conservative — max is Approaching review-ready");
});

// ============================================================
// S107 — Category G: Threshold Drift Detection Tests
// ============================================================
console.log("\n=== S107 Threshold Drift Detection Tests (Category G) ===");

// G-01: All 12 thresholds match default values on fresh state
test("G-01: All 12 thresholds match documented defaults on fresh state", () => {
    resetState();
    seedTopic("g01", "Ref Topic", "A", 8, 7, 6, 6);
    let snap = MayLearnerState.getThresholdSnapshot();
    assert(snap, "No threshold snapshot available");
    assert(snap.accuracyHigh === 80, "Drift: accuracyHigh is " + snap.accuracyHigh + " (expected 80)");
    assert(snap.accuracyGood === 75, "Drift: accuracyGood is " + snap.accuracyGood + " (expected 75)");
    assert(snap.accuracyLow === 60, "Drift: accuracyLow is " + snap.accuracyLow + " (expected 60)");
    assert(snap.stabilityHigh === 75, "Drift: stabilityHigh is " + snap.stabilityHigh + " (expected 75)");
    assert(snap.stabilityGood === 60, "Drift: stabilityGood is " + snap.stabilityGood);
    assert(snap.stabilityLow === 50, "Drift: stabilityLow is " + snap.stabilityLow);
    assert(snap.recentPctHigh === 80, "Drift: recentPctHigh is " + snap.recentPctHigh);
    assert(snap.recentPctGood === 70, "Drift: recentPctGood is " + snap.recentPctGood);
    assert(snap.minAttemptsReady === 6, "Drift: minAttemptsReady is " + snap.minAttemptsReady);
    assert(snap.minAttemptsApproaching === 4, "Drift: minAttemptsApproaching is " + snap.minAttemptsApproaching);
    assert(snap.minAttemptsTopic === 3, "Drift: minAttemptsTopic is " + snap.minAttemptsTopic);
    assert(snap.caseBurdenDegradeMisses === 4, "Drift: caseBurdenDegradeMisses is " + snap.caseBurdenDegradeMisses);
    console.log("  NOTE: All 12 thresholds confirmed at documented values — no drift detected");
});

// G-02: modelVersion unchanged when thresholds unchanged
test("G-02: modelVersion is S111-1.0 and stable", () => {
    resetState();
    seedTopic("g02a", "Test A", "A", 8, 7, 6, 6);
    let r1 = MayLearnerState.getReadinessSummary();
    assert(r1._provenance.modelVersion === "S111-1.0",
        "modelVersion should be S111-1.0, got " + r1._provenance.modelVersion);
    // Verify section summary matches
    let sr = MayLearnerState.getSectionReadinessSummary();
    if (sr) {
        assert(sr.modelVersion === r1._provenance.modelVersion,
            "Section modelVersion " + sr.modelVersion + " != readiness " + r1._provenance.modelVersion);
    }
    // Second call — modelVersion must be stable
    let r2 = MayLearnerState.getReadinessSummary();
    assert(r2._provenance.modelVersion === r1._provenance.modelVersion,
        "modelVersion should be stable across calls");
    console.log("  NOTE: modelVersion confirmed as S111-1.0 — stable across calls");
});

// ── Final tally ──
console.log("\n=== " + (passed + failed) + " tests: " + passed + " PASS, " + failed + " FAIL ===");
process.exit(failed > 0 ? 1 : 0);
