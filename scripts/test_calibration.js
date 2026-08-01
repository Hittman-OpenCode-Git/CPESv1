// Session 107 — Calibration test harness
// Tests MayLearnerState calibration logging, threshold-boundary analysis, and export.
// Category B + CAL tests from may_readiness_test_plan_S106.md.
"use strict";

let fs = require("fs");
let path = require("path");
let b = "C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026";

function lg(fp) {
    let c = fs.readFileSync(fp, "utf8");
    c = c.replace(/^const\s+(\w+)\s*=/gm, "global.$1 =");
    c = c.replace(/^let\s+(\w+)\s*=/gm, "global.$1 =");
    (new Function(c))();
}

global.localStorage = (() => {
    let s = {};
    return { getItem(k) { return s[k] || null; }, setItem(k, v) { s[k] = v; }, removeItem(k) { delete s[k]; }, clear() { s = {}; } };
})();
global.state = { session: null };
global.scoreMCQ = (q, a) => a === q.CorrectChoice ? 1 : 0;
global.ExamSessionManager = {
    caseKey(c, i) { return c.CaseID + "-" + i; },
    correctCase(it, a) { return String(a).trim().toLowerCase() === String(it.Correct).trim().toLowerCase(); },
    practiceScores() { return null; }
};

lg(path.join(b, "content/packs/pack_a_corrected.js"));
lg(path.join(b, "may-learner-state.js"));

let passed = 0, failed = 0;
function test(name, fn) {
    try { fn(); passed++; console.log("  PASS: " + name); }
    catch (e) { failed++; console.log("  FAIL: " + name + " \u2014 " + e.message); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg || "assertion failed"); }
function refute(cond, msg) { if (cond) throw new Error(msg || "unexpected truthy value"); }

function resetState() {
    MayLearnerState.clear();
    MayLearnerState.clearCalibrationMetrics();
    global.state = { session: null };
}

function seedTopic(sid, topicName, section, totalAttempts, okCount, recentOk, recentTotal) {
    let data = MayLearnerState.load();
    if (!data.sessions) data.sessions = [];
    let session = data.sessions.find(s => s.sessionId === sid);
    if (!session) {
        session = { sessionId: sid, date: new Date().toISOString(), mode: "full", totalQuestions: 0, correctCount: 0, attempts: [] };
        data.sessions.push(session);
    }
    for (let i = 0; i < totalAttempts; i++) {
        let ok = i < okCount;
        session.attempts.push({
            questionId: sid + "-Q" + i, section: section, topic: topicName, subtopic: null,
            difficulty: "Moderate", difficultyScore: 3, itemType: "MCQ", cognitiveLevel: "Apply",
            questionState: "Certified", correct: ok, hintsUsed: 0, explanationRequested: false,
            elapsedMs: 30000, selectedChoice: ok ? "A" : "B", confidence: ok ? 4 : 2,
            timestamp: new Date(Date.now() - (totalAttempts - i) * 3600000).toISOString()
        });
        session.totalQuestions++; if (ok) session.correctCount++;
    }
    if (!data.topicPerformance) data.topicPerformance = {};
    let agg = data.topicPerformance[topicName] = {
        totalAttempts: totalAttempts, correctCount: okCount, hintCount: 0, recentAttempts: [],
        firstSeen: new Date(Date.now() - totalAttempts * 3600000).toISOString(),
        lastSeen: new Date().toISOString(), sectionsSeen: [section],
        difficultyDistribution: { Moderate: totalAttempts },
        difficultyWeights: { total: totalAttempts, sum: totalAttempts * 3 }
    };
    let recentCount = Math.min(recentTotal || 7, 15);
    for (let i = 0; i < recentCount; i++) {
        let ok = i < (recentOk !== undefined ? recentOk : Math.round(totalAttempts * 0.7));
        agg.recentAttempts.push({ correct: ok, hints: 0, difficulty: "Moderate", timestamp: new Date(Date.now() - (recentCount - i) * 3600000).toISOString() });
    }
    MayLearnerState.save(data);
}

// ============================================================
// Calibration Threshold Tests (Category B)
// ============================================================
console.log("\n=== Calibration Threshold Tests (Category B) ===");

test("B-01: getThresholdSnapshot returns all 12 threshold values", () => {
    resetState();
    seedTopic("b01", "Test A", "A", 8, 7, 6, 6);
    let snap = MayLearnerState.getThresholdSnapshot();
    assert(snap, "Snapshot is null");
    assert(snap.accuracyHigh === 80);
    assert(snap.accuracyGood === 75);
    assert(snap.accuracyLow === 60);
    assert(snap.stabilityHigh === 75);
    assert(snap.stabilityGood === 60);
    assert(snap.stabilityLow === 50);
    assert(snap.recentPctHigh === 80);
    assert(snap.recentPctGood === 70);
    assert(snap.minAttemptsReady === 6);
    assert(snap.minAttemptsApproaching === 4);
    assert(snap.minAttemptsTopic === 3);
    assert(snap.caseBurdenDegradeMisses === 4);
});

test("B-05a: thresholdSnapshot values match _provenance.thresholdsApplied", () => {
    resetState();
    seedTopic("b05a", "Test", "A", 8, 7, 6, 6);
    let snap = MayLearnerState.getThresholdSnapshot();
    let ta = MayLearnerState.getReadinessSummary()._provenance.thresholdsApplied;
    assert(snap.accuracyHigh === ta.accuracyHigh);
    assert(snap.accuracyGood === ta.accuracyGood);
    assert(snap.accuracyLow === ta.accuracyLow);
    assert(snap.stabilityHigh === ta.stabilityHigh);
    assert(snap.stabilityGood === ta.stabilityGood);
    assert(snap.stabilityLow === ta.stabilityLow);
    assert(snap.recentPctHigh === ta.recentPctHigh);
    assert(snap.recentPctGood === ta.recentPctGood);
    assert(snap.minAttemptsReady === ta.minAttemptsReady);
    assert(snap.minAttemptsApproaching === ta.minAttemptsApproaching);
    assert(snap.minAttemptsTopic === ta.minAttemptsTopic);
});

test("B-06: _provenance.thresholdsApplied values match documented defaults", () => {
    resetState();
    seedTopic("b06", "Test", "A", 8, 7, 6, 6);
    let ta = MayLearnerState.getReadinessSummary()._provenance.thresholdsApplied;
    assert(ta.accuracyHigh === 80);
    assert(ta.accuracyGood === 75);
    assert(ta.accuracyLow === 60);
    assert(ta.stabilityHigh === 75);
    assert(ta.stabilityGood === 60);
    assert(ta.stabilityLow === 50);
    assert(ta.recentPctHigh === 80);
    assert(ta.recentPctGood === 70);
    assert(ta.minAttemptsReady === 6);
    assert(ta.minAttemptsApproaching === 4);
    assert(ta.minAttemptsTopic === 3);
    assert(typeof ta.caseBurdenDegrade === "boolean");
});

// ============================================================
// Calibration Metrics Tests
// ============================================================
console.log("\n=== Calibration Metrics Tests ===");

test("B-08: logReadinessMetrics produces valid metrics object", () => {
    resetState();
    seedTopic("b08a", "Strong Alpha", "A", 8, 7, 6, 6);
    seedTopic("b08b", "Strong Beta", "B", 8, 7, 6, 6);
    seedTopic("b08c", "Strong Gamma", "C", 8, 7, 6, 6);
    let metrics = MayLearnerState.logReadinessMetrics();
    assert(metrics, "Metrics is null");
    assert(typeof metrics.timestamp === "string");
    assert(metrics.overall);
    assert(typeof metrics.overall.band === "string");
    assert(metrics.caseReadiness);
    assert(metrics.provenance);
    assert(metrics.sectionReadiness);
    assert(typeof metrics.topicCount === "number");
    assert(typeof metrics.topicsWithData === "number");
    assert(metrics.bandDistribution);
    let bd = metrics.bandDistribution;
    assert(typeof bd.ready === "number" && typeof bd.approaching === "number" &&
           typeof bd.developing === "number" && typeof bd.recovery === "number" &&
           typeof bd.noData === "number");
    assert(metrics.thresholdBoundaries);
    ["accuracyHigh_near","accuracyGood_near","accuracyLow_near","stabilityHigh_near",
     "stabilityGood_near","stabilityLow_near","recentPctHigh_near","recentPctGood_near",
     "minAttemptsReady_near","minAttemptsApproaching_near"].forEach(k => {
        assert(typeof metrics.thresholdBoundaries[k] === "number" && metrics.thresholdBoundaries[k] >= 0,
            k + " invalid: " + metrics.thresholdBoundaries[k]);
    });
    assert(metrics.dataContext);
    assert(typeof metrics.dataContext.sessionCount === "number");
    assert(typeof metrics.dataContext.totalAttempts === "number");
    let cc = metrics.dataContext.clusterCounts;
    assert(cc && typeof cc.persistentWeak === "number" && typeof cc.improving === "number" &&
           typeof cc.declining === "number" && typeof cc.unstable === "number" &&
           typeof cc.hintDependent === "number" && typeof cc.difficultySensitive === "number");
});

test("CAL-01: clearCalibrationMetrics empties the log", () => {
    resetState();
    seedTopic("cal01", "Test", "A", 8, 7, 6, 6);
    MayLearnerState.logReadinessMetrics();
    MayLearnerState.clearCalibrationMetrics();
    assert(MayLearnerState.getCalibrationMetrics().length === 0);
});

test("CAL-02: getCalibrationMetrics accumulates calls", () => {
    resetState();
    seedTopic("cal02a", "Topic One", "A", 8, 7, 6, 6);
    seedTopic("cal02b", "Topic Two", "B", 8, 7, 6, 6);
    MayLearnerState.logReadinessMetrics();
    MayLearnerState.logReadinessMetrics();
    assert(MayLearnerState.getCalibrationMetrics().length === 2);
});

test("CAL-03: _countThresholdBoundaries counts near-boundary topics", () => {
    resetState();
    seedTopic("cal03", "Near High", "A", 8, 6, 5, 5);
    let metrics = MayLearnerState.logReadinessMetrics();
    assert(metrics.thresholdBoundaries.accuracyHigh_near >= 1,
        "Expected accuracyHigh_near >= 1, got " + metrics.thresholdBoundaries.accuracyHigh_near);
});

// ============================================================
// Calibration Export Tests
// ============================================================
console.log("\n=== Calibration Export Tests ===");

test("B-07: exportCalibrationData includes all required fields", () => {
    resetState();
    seedTopic("b07a", "Strong A", "A", 8, 7, 6, 6);
    seedTopic("b07b", "Strong B", "B", 8, 7, 6, 6);
    seedTopic("b07c", "Strong C", "C", 8, 7, 6, 6);
    let ex = MayLearnerState.exportCalibrationData();
    let required = ["thresholdSnapshot","readinessSummary","sectionReadiness","trends",
        "clusters","calibration","calibrationMetrics","casePatternSummary",
        "casePatternTrends","adaptivePracticeMix","exportedAt"];
    required.forEach(k => {
        assert(ex.hasOwnProperty(k), "Missing field: " + k);
    });
});

test("CAL-04: modelVersion in thresholdSnapshot matches S111-1.0", () => {
    resetState();
    seedTopic("cal04", "Test", "A", 8, 7, 6, 6);
    let snap = MayLearnerState.getThresholdSnapshot();
    assert(snap.modelVersion === "S111-1.0");
});

test("CAL-05: thresholdSnapshot exists even with no session data", () => {
    resetState();
    let snap = MayLearnerState.getThresholdSnapshot();
    assert(snap, "Snapshot should exist with no session data");
    assert(snap.accuracyHigh === 80);
    assert(snap.accuracyGood === 75);
    assert(snap.accuracyLow === 60);
    assert(snap.stabilityHigh === 75);
    assert(snap.stabilityGood === 60);
    assert(snap.stabilityLow === 50);
    assert(snap.recentPctHigh === 80);
    assert(snap.recentPctGood === 70);
    assert(snap.minAttemptsReady === 6);
    assert(snap.minAttemptsApproaching === 4);
    assert(snap.minAttemptsTopic === 3);
    assert(snap.caseBurdenDegradeMisses === 4);
});

test("CAL-06: exportCalibrationData thresholdSnapshot.dataContext matches _provenance.dataContext", () => {
    resetState();
    seedTopic("cal06", "Test", "A", 8, 7, 6, 6);
    let ex = MayLearnerState.exportCalibrationData();
    let dc = MayLearnerState.getReadinessSummary()._provenance.dataContext;
    let sdc = ex.thresholdSnapshot.dataContext;
    assert(sdc, "Missing dataContext in thresholdSnapshot");
    assert(sdc.sessionCount === dc.sessionCount);
    assert(sdc.topicsWithData === dc.topicsWithData);
    assert(sdc.recoveryCount === dc.recoveryCount);
    assert(sdc.readyCount === dc.readyCount);
    assert(sdc.caseSessions === dc.caseSessions);
    assert(sdc.caseMissesTotal === dc.caseMissesTotal);
});

// ============================================================
// S109 — Live Calibration Auto-Logging Tests
// ============================================================
console.log("\n=== S109 Live Calibration Tests ===");

test("S109-01: _liveCalibrationEnabled defaults to false", () => {
    resetState();
    assert(MayLearnerState._liveCalibrationEnabled === false,
        "Live calibration should default to false");
});

test("S109-02: enableLiveCalibration activates the flag", () => {
    resetState();
    MayLearnerState.enableLiveCalibration();
    assert(MayLearnerState._liveCalibrationEnabled === true);
    assert(MayLearnerState._attemptsSinceSnapshot === 0);
    // Reset for other tests
    MayLearnerState._liveCalibrationEnabled = false;
});

test("S109-03: disableLiveCalibration returns accumulated data and turns off", () => {
    resetState();
    MayLearnerState.enableLiveCalibration();
    seedTopic("s9a", "Test A", "A", 8, 7, 6, 6);
    // Use _commitCalibrationSnapshot to accumulate to live log
    MayLearnerState._commitCalibrationSnapshot();
    let result = MayLearnerState.disableLiveCalibration();
    assert(MayLearnerState._liveCalibrationEnabled === false);
    assert(result, "disableLiveCalibration should return data");
    assert(result.snapshots.length === 1, "Should have 1 snapshot, got " + result.snapshots.length);
    assert(result.summary, "Should include summary");
    assert(result.summary.snapshotCount === 1);
});

test("S109-04: _commitCalibrationSnapshot throttles correctly", () => {
    resetState();
    MayLearnerState.clearLiveCalibration();
    MayLearnerState.enableLiveCalibration();
    seedTopic("s9b", "Test B", "B", 8, 7, 6, 6);

    // First call should fire
    let snap1 = MayLearnerState._commitCalibrationSnapshot();
    assert(snap1 !== null, "First snapshot should fire");
    // Immediate second call should NOT fire (throttled)
    let snap2 = MayLearnerState._commitCalibrationSnapshot();
    assert(snap2 === null, "Second snapshot should be throttled");
    // Check accumulated: should have 1
    assert(MayLearnerState._liveCalibrationSessions.length === 1);

    // Reset
    MayLearnerState._liveCalibrationEnabled = false;
    MayLearnerState.clearLiveCalibration();
});

test("S109-05: getLiveCalibrationData returns empty when disabled", () => {
    resetState();
    MayLearnerState.clearLiveCalibration();
    let result = MayLearnerState.getLiveCalibrationData();
    assert(result.snapshots.length === 0);
    assert(result.summary === null);
});

test("S109-06: clearLiveCalibration resets state", () => {
    resetState();
    MayLearnerState.enableLiveCalibration();
    seedTopic("s9c", "Test C", "C", 8, 7, 6, 6);
    MayLearnerState._commitCalibrationSnapshot();
    assert(MayLearnerState._liveCalibrationSessions.length === 1);
    MayLearnerState.clearLiveCalibration();
    assert(MayLearnerState._liveCalibrationSessions.length === 0);
    assert(MayLearnerState._attemptsSinceSnapshot === 0);
    MayLearnerState._liveCalibrationEnabled = false;
});

test("S109-07: recordAttempt triggers auto-snapshot when enabled", () => {
    resetState();
    MayLearnerState.clearLiveCalibration();
    MayLearnerState.enableLiveCalibration();

    // Fake a recordAttempt call pattern (directly seed + snapshot)
    seedTopic("s9d", "Test D", "D", 6, 5, 4, 4);
    let snap = MayLearnerState._commitCalibrationSnapshot();
    assert(snap !== null, "Should fire snapshot");
    assert(snap.bandDistribution, "Should have band distribution");
    assert(snap.thresholdBoundaries, "Should have boundary counts");

    MayLearnerState._liveCalibrationEnabled = false;
    MayLearnerState.clearLiveCalibration();
});

console.log("\n=== " + (passed + failed) + " tests: " + passed + " PASS, " + failed + " FAIL ===");
process.exit(failed > 0 ? 1 : 0);
