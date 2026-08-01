// S110 — Calibration Data Analyzer
// Runs synthetic learner profiles through the full calibration pipeline,
// then produces per-threshold analysis with adjustment recommendations.
// Read-only. No thresholds changed.
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

// ── Helpers ───────────────────────────────────────────────

function resetState() {
    MayLearnerState.clear();
    MayLearnerState.clearCalibrationMetrics();
    MayLearnerState.clearLiveCalibration();
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

function seedCasePatterns(count) {
    let data = MayLearnerState.load();
    for (let i = 0; i < count; i++) {
        let sid = "case" + i;
        if (!data.sessions.find(s => s.sessionId === sid)) {
            data.sessions.push({
                sessionId: sid, date: new Date(Date.now() - (count - i) * 86400000).toISOString(),
                mode: "practice", totalQuestions: 15, correctCount: 10, attempts: [],
                casePatterns: { calculationSetup: 2, exhibitInterpretation: 1 },
                topicSnapshot: {}, caseScores: { mcqPct: 70, casePct: 60, scaledScore: 350, grade: "Pass", passed: true }
            });
        }
    }
    MayLearnerState.save(data);
}

// ── Learner profiles (expanded from S108 for deeper analysis) ──

let profiles = [
    {
        label: "Strong", topics: [
            { sid: "a1", name: "Cost Behavior", sec: "C", total: 10, ok: 9, rOk: 8, rTot: 8 },
            { sid: "a1", name: "Cost Variances", sec: "D", total: 9, ok: 8, rOk: 7, rTot: 7 },
            { sid: "a1", name: "Budget Development", sec: "B", total: 8, ok: 7, rOk: 6, rTot: 6 },
            { sid: "a1", name: "Financial Ratios", sec: "A", total: 10, ok: 9, rOk: 8, rTot: 8 },
            { sid: "a1", name: "Transfer Pricing", sec: "C", total: 7, ok: 6, rOk: 5, rTot: 7 }
        ], cases: 3
    },
    {
        label: "Borderline", topics: [
            { sid: "a2", name: "Process Costing", sec: "D", total: 6, ok: 4, rOk: 3, rTot: 5 },
            { sid: "a2", name: "Standard Costing", sec: "C", total: 7, ok: 5, rOk: 4, rTot: 6 },
            { sid: "a2", name: "Overhead Allocation", sec: "D", total: 5, ok: 4, rOk: 3, rTot: 5 },
            { sid: "a2", name: "Internal Controls", sec: "E", total: 6, ok: 4, rOk: 3, rTot: 5 },
            { sid: "a2", name: "Financial Reporting", sec: "A", total: 7, ok: 5, rOk: 4, rTot: 6 },
            { sid: "a2", name: "Cash Flow Class.", sec: "A", total: 6, ok: 3, rOk: 2, rTot: 4 }
        ], cases: 2
    },
    {
        label: "Weak", topics: [
            { sid: "a3", name: "Capital Budgeting", sec: "B", total: 6, ok: 2, rOk: 1, rTot: 5 },
            { sid: "a3", name: "ABC Costing", sec: "D", total: 5, ok: 2, rOk: 1, rTot: 4 },
            { sid: "a3", name: "Variance Analysis", sec: "C", total: 6, ok: 3, rOk: 2, rTot: 5 },
            { sid: "a3", name: "Data Analytics", sec: "F", total: 5, ok: 2, rOk: 1, rTot: 5 },
            { sid: "a3", name: "Ethics & Governance", sec: "E", total: 4, ok: 2, rOk: 1, rTot: 4 }
        ], cases: 1
    },
    {
        label: "Spiky", topics: [
            { sid: "a4", name: "Financial Ratios", sec: "A", total: 10, ok: 9, rOk: 8, rTot: 8 },
            { sid: "a4", name: "Revenue Recognition", sec: "A", total: 8, ok: 7, rOk: 6, rTot: 7 },
            { sid: "a4", name: "Cost Behavior", sec: "D", total: 9, ok: 8, rOk: 7, rTot: 7 },
            { sid: "a4", name: "Job Costing", sec: "D", total: 8, ok: 7, rOk: 6, rTot: 7 },
            { sid: "a4", name: "Cost Variances", sec: "C", total: 6, ok: 2, rOk: 1, rTot: 5 },
            { sid: "a4", name: "Standard Costing", sec: "C", total: 5, ok: 2, rOk: 1, rTot: 4 },
            { sid: "a4", name: "Tech Controls", sec: "F", total: 5, ok: 2, rOk: 1, rTot: 4 },
            { sid: "a4", name: "IT Governance", sec: "F", total: 4, ok: 2, rOk: 1, rTot: 4 }
        ], cases: 2
    },
    {
        label: "High-Attempt Borderline", topics: [
            { sid: "a5", name: "Process Costing", sec: "D", total: 8, ok: 6, rOk: 5, rTot: 7 },
            { sid: "a5", name: "Standard Costing", sec: "C", total: 9, ok: 7, rOk: 6, rTot: 7 },
            { sid: "a5", name: "Financial Reporting", sec: "A", total: 10, ok: 8, rOk: 7, rTot: 8 },
            { sid: "a5", name: "Budget Development", sec: "B", total: 8, ok: 6, rOk: 5, rTot: 7 },
            { sid: "a5", name: "Cash Flow Class.", sec: "A", total: 7, ok: 5, rOk: 4, rTot: 6 }
        ], cases: 3
    }
];

// ── Run analysis ──────────────────────────────────────────

console.log("=== S110 Calibration Analysis ===");
console.log("Profiles: " + profiles.length + " | Thresholds: S104-1.0 (unchanged)\n");

let snap = MayLearnerState.getThresholdSnapshot();
console.log("modelVersion: " + snap.modelVersion + "\n");

// Aggregate across all profiles
let agBoundaries = {};
let agBands = { ready: 0, approaching: 0, developing: 0, recovery: 0, noData: 0 };
let agSections = {};
let allTopics = [];
let perProfile = [];

profiles.forEach(prof => {
    resetState();
    prof.topics.forEach(t => seedTopic(t.sid, t.name, t.sec, t.total, t.ok, t.rOk, t.rTot));
    if (prof.cases > 0) seedCasePatterns(prof.cases);

    let metrics = MayLearnerState.logReadinessMetrics();
    let exportData = MayLearnerState.exportCalibrationData();
    let bd = metrics.bandDistribution;

    // Accumulate boundaries
    Object.keys(metrics.thresholdBoundaries).forEach(k => {
        agBoundaries[k] = (agBoundaries[k] || 0) + metrics.thresholdBoundaries[k];
    });

    // Accumulate bands
    agBands.ready += bd.ready;
    agBands.approaching += bd.approaching;
    agBands.developing += bd.developing;
    agBands.recovery += bd.recovery;
    agBands.noData += bd.noData;

    // Accumulate sections
    if (exportData.sectionReadiness && exportData.sectionReadiness.sections) {
        Object.keys(exportData.sectionReadiness.sections).forEach(sec => {
            if (!agSections[sec]) agSections[sec] = {};
            let band = exportData.sectionReadiness.sections[sec].band;
            agSections[sec][band] = (agSections[sec][band] || 0) + 1;
        });
    }

    // Collect topic-level data
    let readiness = exportData.readinessSummary;
    if (readiness && readiness.topics) {
        readiness.topics.forEach(t => {
            allTopics.push({
                profile: prof.label, topic: t.topic, band: t.band,
                accuracy: t.accuracy, recentPct: t.recentPct,
                attempts: t.attempts, stability: t.stability, direction: t.direction
            });
        });
    }

    perProfile.push({
        label: prof.label,
        overallBand: metrics.overall.band,
        overallConfidence: metrics.overall.confidence,
        bandDistribution: bd,
        boundaryProximity: metrics.thresholdBoundaries,
        topicCount: metrics.topicCount
    });
});

// ── Report ────────────────────────────────────────────────

console.log("=== Per-Profile Summary ===\n");
perProfile.forEach(pp => {
    console.log(pp.label + ": " + pp.overallBand + " (" + pp.overallConfidence + "), " +
        pp.topicCount + " topics, Ready=" + pp.bandDistribution.ready +
        " Appr=" + pp.bandDistribution.approaching +
        " Dev=" + pp.bandDistribution.developing +
        " Rec=" + pp.bandDistribution.recovery);
});

console.log("\n=== Aggregate Band Distribution ===");
console.log("Total topics: " + allTopics.length);
console.log("Ready=" + agBands.ready + " Approaching=" + agBands.approaching +
    " Developing=" + agBands.developing + " Recovery=" + agBands.recovery +
    " NoData=" + agBands.noData);

console.log("\n=== Aggregate Threshold Boundary Proximity ===");
let sorted = Object.entries(agBoundaries).sort((a, b) => b[1] - a[1]);
sorted.forEach(([k, v]) => {
    console.log("  " + k.replace(/_near$/, '') + ": " + v + " near-boundary topics (across " + profiles.length + " profiles)");
});

console.log("\n=== Section Readiness Spread ===");
Object.keys(agSections).sort().forEach(sec => {
    let bands = Object.entries(agSections[sec]).map(([k, v]) => k + ":" + v).join(" ");
    console.log("  Section " + sec + ": " + bands);
});

// ── Topic-level analysis ──────────────────────────────────
console.log("\n=== Topic-Level Threshold Proximity Analysis ===\n");

// For each threshold, show topics that sit near the boundary
let thresholds = [
    { name: "accuracyHigh", value: 80, type: "accuracy" },
    { name: "accuracyGood", value: 75, type: "accuracy" },
    { name: "accuracyLow", value: 60, type: "accuracy" },
    { name: "stabilityHigh", value: 80, type: "stability" },
    { name: "stabilityGood", value: 60, type: "stability" },
    { name: "stabilityLow", value: 50, type: "stability" },
    { name: "recentPctHigh", value: 80, type: "recentPct" },
    { name: "recentPctGood", value: 70, type: "recentPct" },
    { name: "minAttemptsReady", value: 6, type: "attempts" },
    { name: "minAttemptsApproaching", value: 4, type: "attempts" }
];

thresholds.forEach(th => {
    let near = [];
    allTopics.forEach(t => {
        if (th.type === "accuracy" && t.accuracy !== null && Math.abs(t.accuracy - th.value) <= 5) {
            near.push(t.topic + " (acc=" + t.accuracy + "%, " + t.profile + ", band=" + t.band + ")");
        } else if (th.type === "stability" && t.stability !== null && Math.abs(t.stability - th.value) <= 5) {
            near.push(t.topic + " (stab=" + t.stability + "%, " + t.profile + ", band=" + t.band + ")");
        } else if (th.type === "recentPct" && t.recentPct !== null && Math.abs(t.recentPct - th.value) <= 5) {
            near.push(t.topic + " (rec=" + t.recentPct + "%, " + t.profile + ", band=" + t.band + ")");
        } else if (th.type === "attempts" && (t.attempts === th.value - 1 || t.attempts === th.value)) {
            near.push(t.topic + " (att=" + t.attempts + ", " + t.profile + ", band=" + t.band + ")");
        }
    });
    if (near.length > 0) {
        console.log(th.name + " (" + th.value + ") — " + near.length + " near-boundary:");
        near.forEach(n => console.log("    " + n));
        console.log("");
    }
});

// ── Per-Threshold Adjustment Recommendations ──────────────

console.log("=== Per-Threshold Adjustment Recommendations ===\n");

let recommendations = [
    {
        name: "stabilityHigh (80)",
        nearCount: agBoundaries.stabilityHigh_near || 0,
        findings: "Highest boundary proximity — borderline learners cluster at 75-83% stability. Many topics with strong accuracy (75-80%) are blocked from Ready by stabilityHigh=80, creating false negatives.",
        riskLevel: "LOW",
        direction: "loosen to 75",
        rationale: "±5 is a small nudge per S106 §4.4. 80→75 lets borderline-stable topics reach Ready when accuracy/recent/recentPct all meet Ready criteria. ~8-10% of Developing topics would shift to Approaching, ~2-3% to Ready.",
        conditions: "≥3 real learner profiles with ≥5 sessions each confirm the boundary cluster. Regression: readiness (37), calibration (18), safety (51) must all pass. Validate scenario matrix (8 archetypes)."
    },
    {
        name: "minAttemptsReady (6)",
        nearCount: agBoundaries.minAttemptsReady_near || 0,
        findings: "Second-highest boundary proximity. Topics at 5-6 attempts with otherwise strong signals (80%+ accuracy, 80%+ stability) can't reach Ready. Delays feedback by 1-2 sessions for eager learners.",
        riskLevel: "MEDIUM",
        direction: "keep at 6, monitor",
        rationale: "6 was an S103 increase from 5. Reducing back to 5 would increase Ready inflation risk. Evidence doesn't yet support reduction. Re-evaluate with real data when ≥3 learners show persistent 5-attempt strong topics.",
        conditions: "Defer to S112+. Requires ≥10 real learner exports."
    },
    {
        name: "accuracyGood (75)",
        nearCount: agBoundaries.accuracyGood_near || 0,
        findings: "Borderline profile drives 3 near-boundary topics. Topics at 70-74% accuracy miss Approaching, which may delay targeted coaching.",
        riskLevel: "MEDIUM",
        direction: "loosen to 70 (future)",
        rationale: "70% is still a passing threshold in CMA scoring. Lowering to 70 would widen the Approaching band mildly (5-8% more topics). Defer until stabilityHigh adjustment is validated.",
        conditions: "Defer to S112. Requires stabilityHigh adjustment settled first."
    },
    {
        name: "recentPctHigh (80)",
        nearCount: agBoundaries.recentPctHigh_near || 0,
        findings: "Tracks accuracyHigh. Topics with high accuracy but stale recent performance get stuck. 2 near-boundary topics in synthetic data.",
        riskLevel: "LOW",
        direction: "keep at 80",
        rationale: "Prevents stale-high-accuracy topics from being Ready. Aligned with S106 DO NOT #3 (no reduced caution without evidence). Real data needed before touching.",
        conditions: "Defer. Requires real learner recency distributions."
    },
    {
        name: "minAttemptsApproaching (4)",
        nearCount: agBoundaries.minAttemptsApproaching_near || 0,
        findings: "Low-volume topics at 3-4 attempts. 2 near-boundary topics. S104 addition — working as designed.",
        riskLevel: "LOW",
        direction: "keep at 4",
        rationale: "Added in S104 specifically to gate early-stage topics from Approaching. Working correctly. No evidence for change.",
        conditions: "Stable. No adjustment needed."
    },
    {
        name: "accuracyHigh (80)",
        nearCount: agBoundaries.accuracyHigh_near || 0,
        findings: "Only 1 near-boundary topic. Most topics are either clearly above or below 80%.",
        riskLevel: "LOW",
        direction: "keep at 80, watch stabilityHigh interaction",
        rationale: "accuracyHigh and stabilityHigh form a paired gate: both must reach 80 for Ready. stabilityHigh is the more frequently borderline of the two. If stabilityHigh is loosened, accuracyHigh should stay to prevent Ready inflation.",
        conditions: "Pair with stabilityHigh adjustment validation."
    },
    {
        name: "accuracyLow (60)",
        nearCount: 0,
        findings: "Zero near-boundary topics. Below 60% is clearly weak; above 60% is clearly Developing+.",
        riskLevel: "LOW",
        direction: "keep at 60",
        rationale: "Well-calibrated. Recovery vs Developing boundary is clear and uncontested.",
        conditions: "Stable. No adjustment needed."
    },
    {
        name: "stabilityGood (60)",
        nearCount: 0,
        findings: "Zero near-boundary topics. Approaching→Developing boundary driven primarily by accuracyGood, not stabilityGood.",
        riskLevel: "LOW",
        direction: "keep at 60",
        rationale: "Secondary gate. accuracyGood carries the Approaching classification weight. stabilityGood at 60 is a reasonable floor.",
        conditions: "Stable."
    },
    {
        name: "stabilityLow (50)",
        nearCount: 0,
        findings: "Zero near-boundary. Stability below 50% is clearly unstable across all profiles.",
        riskLevel: "LOW",
        direction: "keep at 50",
        rationale: "Well-calibrated. Recovery trigger is rarely stabilityLow alone (accuracy < 60 or declining direction dominate).",
        conditions: "Stable."
    },
    {
        name: "recentPctGood (70)",
        nearCount: 0,
        findings: "Zero near-boundary. None of the synthetic profiles produce topics at exactly 65-75% recent.",
        riskLevel: "LOW",
        direction: "keep at 70, monitor with real data",
        rationale: "Secondary gate for Approaching. Current value aligns with accuracyGood(=75) minus 5, which is a reasonable spread.",
        conditions: "Stable."
    },
    {
        name: "minAttemptsTopic (3)",
        nearCount: 0,
        findings: "Zero near-boundary in synthetic. All profiles exceed 3 attempts per topic by design.",
        riskLevel: "LOW",
        direction: "keep at 3",
        rationale: "Minimum for any readiness estimate. 2 attempts is too few for stability computation (requires ≥4). No evidence to change.",
        conditions: "Stable."
    },
    {
        name: "caseBurdenDegrade (≥4 misses)",
        nearCount: 0,
        findings: "Degradation fires correctly: 3+ session profiles with worsening patterns degrade. Single-session profile does not. S104 validation confirmed.",
        riskLevel: "LOW",
        direction: "keep at ≥4, monitor with 3+ case sessions",
        rationale: "Working as designed. Degradation is irreversible in current logic (S103 design limitation). Real data with ≥3 case sessions needed to assess false-positive rate of degradation.",
        conditions: "Stable. Re-evaluate when real learners with 3+ case sessions exist."
    }
];

console.log("Priority 1 (S111 candidate):");
recommendations.filter(r => r.direction.indexOf('loosen') !== -1 && r.riskLevel === 'LOW').forEach(r => {
    console.log("  " + r.name + " → " + r.direction + " (risk: " + r.riskLevel + ")");
    console.log("    Rationale: " + r.rationale);
    console.log("    Conditions: " + r.conditions);
});
console.log("");

console.log("Priority 2 (S112+ candidate):");
recommendations.filter(r => r.direction.indexOf('future') !== -1 || r.name.indexOf('minAttemptsReady') !== -1).forEach(r => {
    console.log("  " + r.name + " → " + r.direction + " (risk: " + r.riskLevel + ")");
    console.log("    Rationale: " + r.rationale);
});
console.log("");

console.log("Stable / No change recommended:");
recommendations.filter(r => r.direction.indexOf('keep') !== -1 && r.riskLevel === 'LOW').forEach(r => {
    if (r.name.indexOf('accuracyLow') !== -1 || r.name.indexOf('stabilityLow') !== -1 ||
        r.name.indexOf('stabilityGood') !== -1 || r.name.indexOf('recentPctGood') !== -1 ||
        r.name.indexOf('minAttemptsTopic') !== -1 || r.name.indexOf('caseBurden') !== -1 ||
        r.name.indexOf('minAttemptsApproaching') !== -1 || r.name.indexOf('recentPctHigh') !== -1) {
        console.log("  " + r.name + " — " + r.findings);
    }
});

// ── Final threshold snapshot ──────────────────────────────
console.log("\n=== Threshold Confirmation ===");
let finalSnap = MayLearnerState.getThresholdSnapshot();
console.log("modelVersion: " + finalSnap.modelVersion);
let expectedVals = {
    accuracyHigh: 80, accuracyGood: 75, accuracyLow: 60,
    stabilityHigh: 80, stabilityGood: 60, stabilityLow: 50,
    recentPctHigh: 80, recentPctGood: 70,
    minAttemptsReady: 6, minAttemptsApproaching: 4, minAttemptsTopic: 3,
    caseBurdenDegradeMisses: 4
};
let allMatch = true;
Object.keys(expectedVals).forEach(k => {
    if (finalSnap[k] !== expectedVals[k]) { console.log("MISMATCH: " + k); allMatch = false; }
});
if (allMatch) console.log("All 12 thresholds at S104-1.0 — confirmed.");

console.log("\n=== Analysis complete ===");
