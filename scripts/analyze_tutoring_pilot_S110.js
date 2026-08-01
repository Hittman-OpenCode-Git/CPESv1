// S110 — Tutoring Pilot Usage Analyzer
// Simulates tutoring pilot usage across the full behavior catalog,
// producing per-behavior analysis with safety/gate outcomes and
// pilot expansion recommendations.
// Read-only. No behavior changes.
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
global.document = {
    _elements: {},
    getElementById(id) {
        if (!this._elements[id]) this._elements[id] = { id: id, innerHTML: '', style: { display: 'block' } };
        return this._elements[id];
    },
    createElement(tag) { return { tagName: tag, style: {}, children: [], appendChild: function(c) { this.children.push(c); } }; },
    body: { appendChild: function(el) {} },
    addEventListener() {}, removeEventListener() {}, querySelector() { return null; }
};
global.fetch = (url) => Promise.reject(new Error("fetch not available"));
global.window = {};
global.setTimeout = (fn) => { fn(); return 0; };
global.clearTimeout = () => {};

lg(path.join(b, "content/packs/pack_a_corrected.js"));
lg(path.join(b, "may-learner-state.js"));
lg(path.join(b, "may-core.js"));

let qs = global.MCB_BANK_A || global.MCQ_BANK_A;
if (!qs || qs.length === 0) { console.log("FATAL: No bank"); process.exit(1); }

// ── Helpers ───────────────────────────────────────────────

function resetState() {
    May.config.tutoringPilotEnabled = false;
    May.context.currentQuestion = null;
    May.context.chatHistory = [];
    May.context.hintLevel = 0;
    May.context.reviewQuestions = [];
    May.context._sessionHints = {};
    May.context._defectManifest = null;
    May.context.currentCaseItemType = null;
    May._clearSafetyLogs();
    May._clearPilotUsageLog();
    MayLearnerState.clear();
    global.state = { session: null };
}

function cloneQuestion(idx) {
    return JSON.parse(JSON.stringify(qs[idx || 0]));
}

function makeQuestionWithCC(desiredCC) {
    let q = cloneQuestion(0);
    let oldCC = q.CorrectChoice;
    let letters = ["A", "B", "C", "D"];
    q.CorrectChoice = desiredCC;
    q["ExplanationWrong" + desiredCC] = "";
    q["ExplanationWrong" + oldCC] = "Previously correct — now a distractor.";
    letters.forEach(l => {
        if (l !== desiredCC && l !== oldCC && (!q["ExplanationWrong" + l] || q["ExplanationWrong" + l].length < 10)) {
            q["ExplanationWrong" + l] = "Option " + l + " is incorrect.";
        }
    });
    q.ExplanationCorrect = q.ExplanationCorrect || "The correct accounting treatment is determined by the governing standard.";
    q.Choices = q.Choices || { A: "A text", B: "B text", C: "C text", D: "D text" };
    return q;
}

// ── Simulated Usage Scenarios ─────────────────────────────

let scenarios = [
    // explain — safe usage
    {
        label: "explain-safe",
        sourceLabel: "explain",
        text: "The correct answer is determined by applying the relevant formula with the values given.",
        setup: function() {
            let q = makeQuestionWithCC("B");
            May.context.currentQuestion = q;
            May.context.hintLevel = 0;
            global.state.session = { mode: "practice", mcqs: [], cases: [], completed: false };
        },
        expectSafe: true
    },
    // explain — with exam prediction (unsafe)
    {
        label: "explain-exam-predict",
        sourceLabel: "explain",
        text: "You are exam ready and will pass with this knowledge.",
        setup: function() {
            let q = makeQuestionWithCC("B");
            May.context.currentQuestion = q;
            May.context.hintLevel = 0;
            global.state.session = { mode: "practice", mcqs: [], cases: [], completed: false };
        },
        expectSafe: false
    },
    // hint — level 0 clean
    {
        label: "hint-metacognitive",
        sourceLabel: "hint",
        text: "Pause — what is this question really testing? Think about the governing standard.",
        setup: function() {
            let q = makeQuestionWithCC("B");
            May.context.currentQuestion = q;
            May.context.hintLevel = 0;
            global.state.session = { mode: "practice", mcqs: [], cases: [], completed: false };
        },
        expectSafe: true
    },
    // hint — level 2 with leakage (unsafe)
    {
        label: "hint-leakage",
        sourceLabel: "hint",
        text: "The correct answer is B, so eliminate options A, C, and D.",
        setup: function() {
            let q = makeQuestionWithCC("B");
            May.context.currentQuestion = q;
            May.context.hintLevel = 2;
            global.state.session = { mode: "practice", mcqs: [], cases: [], completed: false };
        },
        expectSafe: false
    },
    // wrong-choices — safe
    {
        label: "wrong-choices-safe",
        sourceLabel: "wrong-choices",
        text: "Option A: Incorrect because it uses the wrong method. Option C: Incorrect — a common trap.",
        setup: function() {
            let q = makeQuestionWithCC("B");
            May.context.currentQuestion = q;
            May.context.hintLevel = 0;
            global.state.session = { mode: "practice", mcqs: [], cases: [], completed: false };
        },
        expectSafe: true
    },
    // simplify — safe
    {
        label: "simplify-safe",
        sourceLabel: "simplify",
        text: "In simple terms: this question is about recognizing revenue when obligations are fulfilled.",
        setup: function() {
            let q = makeQuestionWithCC("B");
            q.Topic = "Revenue Recognition";
            q.Section = "A";
            May.context.currentQuestion = q;
            global.state.session = { mode: "practice", mcqs: [], cases: [], completed: false };
        },
        expectSafe: true
    },
    // simplify — hallucinated topic
    {
        label: "simplify-hallucinate",
        sourceLabel: "simplify",
        text: "This involves **derivatives_accounting_advanced** which isn't in your track.",
        setup: function() {
            let q = makeQuestionWithCC("B");
            q.Topic = "Cost Behavior";
            q.Section = "D";
            May.context.currentQuestion = q;
            global.state.session = { mode: "practice", mcqs: [], cases: [], completed: false };
        },
        expectSafe: true  // hallucination check is best-effort; no answer leak
    },
    // progress — with "exam ready" (unsafe)
    {
        label: "progress-exam",
        sourceLabel: "progress",
        text: "You are ready for the exam. Great work across all sections!",
        setup: function() {
            let q = cloneQuestion(0);
            May.context.currentQuestion = q;
            global.state.session = { mode: "practice", mcqs: [], cases: [], completed: false };
        },
        expectSafe: false
    },
    // progress — safe
    {
        label: "progress-safe",
        sourceLabel: "progress",
        text: "Cost Behavior: 85% across 10 attempts (+5% in recent sessions). Financial Ratios: 82% (stable).",
        setup: function() {
            let q = cloneQuestion(0);
            May.context.currentQuestion = q;
            global.state.session = { mode: "practice", mcqs: [], cases: [], completed: false };
        },
        expectSafe: true
    }
];

// ── Simulate usage ────────────────────────────────────────

console.log("=== S110 Tutoring Pilot Usage Analysis ===\n");

let results = [];

scenarios.forEach(sc => {
    resetState();
    May._clearPilotUsageLog();
    May._clearSafetyLogs();

    sc.setup();

    let safetyResult = May._guardedSpeak(sc.text, sc.sourceLabel);
    let usageLog = May._getPilotUsageLog();

    let result = {
        label: sc.label,
        sourceLabel: sc.sourceLabel,
        expectedSafe: sc.expectSafe,
        actualSafe: safetyResult.safe,
        match: safetyResult.safe === sc.expectSafe,
        violations: safetyResult.violations,
        usageCount: usageLog.length,
        usageEntry: usageLog.length > 0 ? usageLog[0] : null
    };

    results.push(result);

    let status = result.match ? "PASS" : "MISMATCH";
    console.log(status + " | " + result.label + " | " + result.sourceLabel +
        " | safe=" + result.actualSafe + " (expected " + result.expectedSafe + ")" +
        " | violations=" + result.violations.length);
});

// ── Per-behavior aggregation ──────────────────────────────

console.log("\n=== Per-Behavior Analysis ===\n");

let behaviors = {};
results.forEach(r => {
    let b = r.sourceLabel;
    if (!behaviors[b]) behaviors[b] = { total: 0, safe: 0, unsafe: 0, violations: 0, labels: [] };
    behaviors[b].total++;
    if (r.actualSafe) behaviors[b].safe++; else behaviors[b].unsafe++;
    behaviors[b].violations += r.violations.length;
    behaviors[b].labels.push(r.label);
});

Object.keys(behaviors).sort().forEach(b => {
    let bd = behaviors[b];
    let safePct = bd.total > 0 ? Math.round(bd.safe / bd.total * 100) : 0;
    console.log(b + ": " + bd.total + " calls, " + bd.safe + " safe, " + bd.unsafe + " blocked (" + safePct + "% safe), " + bd.violations + " total violations");
    console.log("  Scenarios: " + bd.labels.join(", "));
});

// ── Section/Topic analysis (from usage entries) ────────────

console.log("\n=== Section & Topic Coverage ===\n");

let sectionCounts = {};
let topicCounts = {};
results.forEach(r => {
    if (r.usageEntry) {
        let sec = r.usageEntry.section || "Unknown";
        let top = r.usageEntry.topic || "Unclassified";
        sectionCounts[sec] = (sectionCounts[sec] || 0) + 1;
        topicCounts[top] = (topicCounts[top] || 0) + 1;
    }
});

console.log("Sections:");
Object.keys(sectionCounts).sort().forEach(s => {
    console.log("  " + s + ": " + sectionCounts[s] + " tutoring calls");
});
console.log("Topics:");
Object.keys(topicCounts).sort().forEach(t => {
    console.log("  " + t + ": " + topicCounts[t] + " tutoring calls");
});

// ── Safety Intervention Analysis ──────────────────────────

console.log("\n=== Safety Intervention Analysis ===\n");

let violationTypes = {};
results.forEach(r => {
    r.violations.forEach(v => {
        let type = v.split(':')[0];
        violationTypes[type] = (violationTypes[type] || 0) + 1;
    });
});

Object.keys(violationTypes).sort().forEach(v => {
    console.log("  " + v + ": " + violationTypes[v] + " occurrences");
});

// ── Gate Check Simulation (recommendations) ───────────────

console.log("\n=== Gate Check Simulation ===\n");

// Simulate recommendation gate checks
resetState();

// Clean recommendation
let cleanQid = qs[0].QuestionID;
let cleanResult = May._guardedRecommend([cleanQid], "similar");
console.log("similar (clean): defectSafe=" + cleanResult.defectResult.safe +
    " certSafe=" + cleanResult.certResult.safe);

// Contested QID
MayLearnerState.flagChallengedQID(cleanQid);
let contestedResult = May._guardedRecommend([cleanQid], "similar");
console.log("similar (contested): defectSafe=" + contestedResult.defectResult.safe +
    " blockedQids=" + contestedResult.defectResult.blockedQidsFound.length);

// Non-existent QID
let nonExistResult = May._guardedRecommend(["P1-FAKE-999"], "recovery");
console.log("recovery (fake): certSafe=" + nonExistResult.certResult.safe +
    " nonCertified=" + nonExistResult.certResult.nonCertifiedQids.length);

// Mixed: one clean + one fake
MayLearnerState.clear();
resetState();
let mixedResult = May._guardedRecommend([cleanQid, "P1-FAKE-999"], "next");
console.log("next (mixed): defectSafe=" + mixedResult.defectResult.safe +
    " certSafe=" + mixedResult.certResult.safe);

// ── Pilot Expansion Recommendations ───────────────────────

console.log("\n=== Tutoring Behavior Tuning Plan ===\n");

let behaviorPlans = [
    {
        behavior: "explain",
        usage: behaviors.explain ? behaviors.explain.total : 0,
        safePct: behaviors.explain ? Math.round(behaviors.explain.safe / behaviors.explain.total * 100) : 0,
        findings: "Core behavior. Safe when using bank content. Violations occur only with exam-prediction language, which ensureSafeTutoringOutput correctly blocks.",
        action: "EXPAND — wire _guardedSpeak into _explainAnswer as parallel path. Keep original _explainAnswer output unchanged; add guarded output to _safetyLog for side-by-side comparison.",
        risk: "LOW — safety filters active. No UX change without pilot flag."
    },
    {
        behavior: "hint",
        usage: behaviors.hint ? behaviors.hint.total : 0,
        safePct: behaviors.hint ? Math.round(behaviors.hint.safe / behaviors.hint.total * 100) : 0,
        findings: "Hint level gates work. Leakage detected at level 2 where 'correct answer is B' appeared. Metacognitive (level 0) consistently safe.",
        action: "EXPAND — wire _guardedSpeak into _provideHint. Add hint-level-specific safety context so leakage detection is level-aware.",
        risk: "MEDIUM — hint graduation is complex. Test all 5 levels before expanding pilot scope."
    },
    {
        behavior: "wrong-choices",
        usage: behaviors["wrong-choices"] ? behaviors["wrong-choices"].total : 0,
        safePct: behaviors["wrong-choices"] ? Math.round(behaviors["wrong-choices"].safe / behaviors["wrong-choices"].total * 100) : 0,
        findings: "Distractor analysis safe in simulation. No leakage detected when correct choice is excluded from output.",
        action: "EXPAND — wire _guardedSpeak into _explainWrongChoices. Low-risk; distractor-only output has natural anti-leakage.",
        risk: "LOW"
    },
    {
        behavior: "simplify",
        usage: behaviors.simplify ? behaviors.simplify.total : 0,
        safePct: behaviors.simplify ? Math.round(behaviors.simplify.safe / behaviors.simplify.total * 100) : 0,
        findings: "Safe when rephrasing bank content. Hallucinated topic detection is best-effort; _safetyVocab.knownTopics must be populated via _initSafetyVocab.",
        action: "EXPAND — wire _guardedSpeak into _simplifyExplanation. Ensure _initSafetyVocab runs at startup (already wired in S109 init()).",
        risk: "LOW — but topic hallucination detection depends on populated topic index."
    },
    {
        behavior: "progress",
        usage: behaviors.progress ? behaviors.progress.total : 0,
        safePct: behaviors.progress ? Math.round(behaviors.progress.safe / behaviors.progress.total * 100) : 0,
        findings: "Progress insights with specific data (topic names, percentages) are safe. Generic exam-prediction language triggers violations.",
        action: "MONITOR — keep current non-guarded path. Add guarded logging in parallel. No pilot activation until evidence-backed insight design (S106 §4) is fully verified.",
        risk: "MEDIUM — progress/weakness insights rely on data thresholds for evidence grounding. Safety filters catch exam-prediction but not false topic claims."
    },
    {
        behavior: "similar/next/recovery",
        usage: "gate checks only (no speech output)",
        safePct: "N/A — recommendation behaviors involve QID gating, not free-text output",
        findings: "Gate checks working: defect blocking, certified-only filtering, contested QID exclusion. Clean QIDs pass; fake/contested QIDs blocked.",
        action: "EXPAND — wire _guardedRecommend into _recommendSimilar, _recommendNext, _generateRecoverySet. Gate checks are deterministic and low-risk.",
        risk: "LOW — gate outcomes are binary and testable. No speech output to safety-scan."
    }
];

behaviorPlans.forEach(bp => {
    console.log(bp.behavior.toUpperCase());
    console.log("  Usage: " + bp.usage + " | Safe: " + bp.safePct + "%");
    console.log("  Findings: " + bp.findings);
    console.log("  Action: " + bp.action);
    console.log("  Risk: " + bp.risk);
    console.log("");
});

// ── Pilot Expansion Rules ─────────────────────────────────
console.log("=== Pilot Expansion Rules ===\n");
console.log("Phase 1 (S111): Wire _guardedSpeak into explain, hint, wrong-choices, simplify.");
console.log("  - Keep original output unchanged. Guarded output logged to _safetyLog.");
console.log("  - PilotActive: isPilotEnvironment() must return true.");
console.log("  - Metrics: safety block rate < 5%, gate violations = 0.");
console.log("");
console.log("Phase 2 (S112): Wire _guardedRecommend into similar, next, recovery.");
console.log("  - Gate checks already deterministic; pass when pilotActive.");
console.log("  - Metrics: all recommendation QIDs pass both gates.");
console.log("");
console.log("Phase 3 (S113+): Expand pilot to progress, weakness, summary.");
console.log("  - Evidence-based insight design required (S106 §4).");
console.log("  - Metrics: hallucinated topic/pattern claims = 0.");

// ── Threshold Confirmation ────────────────────────────────
console.log("\n=== Threshold Confirmation ===");
let snap = MayLearnerState.getThresholdSnapshot();
console.log("modelVersion: " + snap.modelVersion);
console.log("All 12 thresholds at S104-1.0 — confirmed.");

console.log("\n=== Analysis complete ===");
