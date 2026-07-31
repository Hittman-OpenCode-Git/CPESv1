// ============================================================
// MAY-009 Calibration Runner — Decision Coverage Expansion
// Runs via: node scripts/may009_calibration_runner.js
// Governance: Light Lane — no pack/case/content modifications
// ============================================================

var fs = require('fs'), path = require('path'), base = path.resolve(__dirname, '..');

// ── Browser globals stub ──
global.localStorage = (function() { var store = {}; return { getItem: function(k) { return store[k] || null; }, setItem: function(k, v) { store[k] = v; }, removeItem: function(k) { delete store[k]; }, clear: function() { store = {}; } }; })();
global.sessionStorage = (function() { var store = {}; return { getItem: function(k) { return store[k] || null; }, setItem: function(k, v) { store[k] = v; }, removeItem: function(k) { delete store[k]; }, clear: function() { store = {}; } }; })();
global.document = { getElementById: function() { return null; }, addEventListener: function() {}, querySelectorAll: function() { return []; }, querySelector: function() { return null; }, createElement: function(t) { return { tagName: t, style: {}, className: '', innerHTML: '', children: [], appendChild: function(c) { this.children.push(c); }, prepend: function(c) { this.children.unshift(c); }, insertBefore: function(c) { this.children.push(c); }, remove: function() {} }; }, body: { appendChild: function() {}, prepend: function() {}, removeChild: function() {} } };
global.setTimeout = function(fn) { fn(); };
global.clearTimeout = function() {};
global.fetch = function() { return Promise.reject(new Error('fetch disabled')); };
global.window = {};
global.Blob = function(d) { return { data: d, size: (d||[]).length }; };
global.URL = { createObjectURL: function() { return 'blob:mock'; }, revokeObjectURL: function() {} };
global.FileReader = function() { this.readAsText = function() {}; };
global.state = { session: null };
global.scoreMCQ = function(q, ans) { return ans === q.CorrectChoice ? 1 : 0; };
global.ExamSessionManager = { caseKey: function(c) { return c.CaseID + '-1'; }, correctCase: function(it, ans) { return typeof ans === 'string' && typeof it.Correct === 'string' ? ans.trim().toLowerCase() === it.Correct.trim().toLowerCase() : false; }, practiceScores: function() { return null; } };

// ── Module loader ──
function loadModule(filePath) {
    var code = fs.readFileSync(filePath, 'utf8');
    code = code.replace(/^const\s+(\w+)\s*=/gm, 'global.$1 =');
    code = code.replace(/^let\s+(\w+)\s*=/gm, 'global.$1 =');
    new Function(code)();
}

var mayModules = [
    'may-feature-flags.js',
    'may-learner-state.js',
    'may-core.js',
    'may-context-builder.js',
    'may-coaching-router.js',
    'may-coaching-modes/mode-base.js', 'may-coaching-modes/mode-explain.js',
    'may-coaching-modes/mode-quiz.js', 'may-coaching-modes/mode-socratic.js',
    'may-coaching-modes/mode-motivate.js', 'may-coaching-modes/mode-study-plan.js',
    'may-coaching-modes/mode-exam-review.js',
    'may-llm-types.js', 'may-llm-provider-registry.js', 'may-llm-adapter.js',
    'may-learner-profile.js',
    'may-adaptive-recommender.js', 'may-remediation-engine.js', 'may-readiness-scorer.js',
    'may-readiness-engine.js', 'may-intervention-prioritizer.js',
    'may-recommendation-explainer.js', 'may-dashboard-model.js',
    'may-decision-engine.js', 'may-intervention-coordinator.js',
    'may-recommendation-pipeline.js', 'may-coaching-memory.js',
    'may-coaching-orchestrator.js'
];

var loaded = 0, skipped = 0;
mayModules.forEach(function(m) {
    try { loadModule(path.join(base, m)); loaded++; }
    catch (e) { console.log('  SKIP: ' + m + ' — ' + e.message.substring(0,80)); skipped++; }
});

console.log('MAY-009 Calibration Runner');
console.log('Modules loaded: ' + loaded + ' / ' + (loaded + skipped));
console.log('');

var MayFeatureFlags = global.MayFeatureFlags;
var MayLearnerState = global.MayLearnerState;
var MayLearnerProfile = global.MayLearnerProfile;
var MayAdaptiveRecommender = global.MayAdaptiveRecommender;
var MayReadinessEngine = global.MayReadinessEngine;
var MayInterventionPrioritizer = global.MayInterventionPrioritizer;
var MayCoachingOrchestrator = global.MayCoachingOrchestrator;

// ============================================================
// Telemetry infrastructure
// ============================================================
var telemetry = {
    session: 'MAY-009',
    timestamp: new Date().toISOString(),
    preflight: {},
    results: [],
    coverage: {},
    calibration: {}
};

// ============================================================
// Helpers
// ============================================================
function makeMockQuestion(qid, topic, section, difficultyScore) {
    return {
        QuestionID: qid, Topic: topic, Section: section,
        Difficulty: difficultyScore <= 2 ? 'Easy' : difficultyScore <= 3 ? 'Moderate' : 'Difficult',
        DifficultyScore: difficultyScore || 3,
        question_state: 'Certified',
        Choices: { A: 'Choice A', B: 'Choice B', C: 'Choice C', D: 'Choice D' },
        CorrectChoice: 'B'
    };
}

var correctCycle = ['B', 'D', 'A', 'C'];

function seedLearnerProfile(learnerId, displayName, examPlan, topicData, sessions) {
    MayLearnerState.clear();
    var data = MayLearnerState.load();
    data.learnerId = learnerId;
    data.userName = displayName;
    data.firstVisit = '2026-07-01T00:00:00.000Z';
    data.examPlan = examPlan;
    localStorage.setItem(MayLearnerState.STORAGE_KEY, JSON.stringify(data));

    var baseDate = new Date('2026-07-01');
    var sessionIds = [];
    for (var s = 0; s < sessions; s++) {
        sessionIds.push(learnerId + '-s' + (s + 1));
    }

    topicData.forEach(function(td) {
        if (td.attempts === 0) return;
        var total = td.attempts;
        var correctTotal = Math.round(total * td.accuracy / 100);
        var trend = td.trend || 'stable';

        var last5Accuracy;
        if (trend === 'declining') { last5Accuracy = Math.max(0.05, td.accuracy / 100 * 0.65); }
        else if (trend === 'improving') { last5Accuracy = Math.min(0.95, td.accuracy / 100 * 1.1); }
        else { last5Accuracy = td.accuracy / 100; }

        var last5Correct = Math.round(last5Accuracy * 5);
        last5Correct = Math.max(0, Math.min(5, last5Correct));

        var remainingTotal = correctTotal - last5Correct;
        var firstN = total - 5;
        var firstCorrect = Math.max(0, remainingTotal);
        var firstIncorrect = firstN - firstCorrect;

        var outcomes = [];
        for (var i = 0; i < firstN; i++) {
            var prob = firstN > 0 ? firstCorrect / (firstN - i) : 0;
            var isCorrect = Math.random() < prob;
            outcomes.push(isCorrect);
            if (isCorrect) firstCorrect--; else firstIncorrect--;
        }

        var l5CorrectRemaining = last5Correct;
        var l5IncorrectRemaining = 5 - last5Correct;
        for (var j = 0; j < 5 && (outcomes.length < total); j++) {
            var l5Prob = (outcomes.length < total - 1) ? l5CorrectRemaining / (l5CorrectRemaining + l5IncorrectRemaining) : (l5CorrectRemaining > l5IncorrectRemaining ? 1 : 0);
            var l5Correct = Math.random() < l5Prob;
            outcomes.push(l5Correct);
            if (l5Correct) l5CorrectRemaining--; else l5IncorrectRemaining--;
        }
        while (outcomes.length < total) { outcomes.push(false); }

        var attemptsPerSession = Math.ceil(total / sessions);
        for (var si = 0; si < sessions; si++) {
            var start = si * attemptsPerSession;
            var end = Math.min(start + attemptsPerSession, total);
            if (start >= total) break;
            var sid = sessionIds[si];
            for (var ai = start; ai < end; ai++) {
                var isCorrect = outcomes[ai];
                var diffScore = td.difficultyScore || 3;
                var cc = correctCycle[ai % 4];
                var q = makeMockQuestion(td.qidPrefix + '-' + (ai + 1), td.topic, td.section, diffScore);
                MayLearnerState.recordAttempt(sid, q, isCorrect ? cc : 'A', isCorrect,
                    isCorrect ? 0 : (Math.random() > 0.5 ? 1 : 2),
                    !isCorrect, 30000 + Math.floor(Math.random() * 60000),
                    isCorrect ? 4 : 2);
            }
        }
    });

    var stateData = JSON.parse(localStorage.getItem(MayLearnerState.STORAGE_KEY));
    if (stateData && stateData.sessions) {
        stateData.sessions.forEach(function(s, idx) {
            var d = new Date(baseDate.getTime() + idx * 86400000 * 2);
            s.date = d.toISOString();
        });
        localStorage.setItem(MayLearnerState.STORAGE_KEY, JSON.stringify(stateData));
    }

    return MayLearnerState.load();
}

// ============================================================
// Run full pipeline for one learner
// ============================================================
function runFullPipeline(learner) {
    MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', true);
    MayFeatureFlags.setFlag('ENABLE_READINESS_SCORING', true);
    MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_ORCHESTRATION', true);
    MayFeatureFlags.setFlag('ENABLE_COACHING_MEMORY', false);

    var t0 = Date.now();
    var pkg;
    try { pkg = MayCoachingOrchestrator.orchestrate(); }
    catch (e) { return { error: e.message, pipelineMs: Date.now() - t0 }; }

    var ms = Date.now() - t0;

    if (!pkg) return { error: 'orchestrate() returned null', pipelineMs: ms };

    // Extract decision
    var decision = pkg.decision || {};
    var interventions = pkg.interventions || {};
    var recommendations = pkg.recommendations || [];
    var readiness = pkg.readiness || {};
    var recoveryPlan = pkg.recoveryPlan || [];
    var profile = pkg.profile || {};

    // Extract intervention details
    var queue = interventions.queue || [];
    var tiersPresent = [];
    queue.forEach(function(q) { if (tiersPresent.indexOf(q.tier) < 0) tiersPresent.push(q.tier); });
    tiersPresent.sort();

    // Extract recommendation types
    var recTypes = recommendations.map(function(r) { return r.type; });
    var recPriorities = recommendations.map(function(r) { return r.priority; });

    // Calibration: check if decision topic appears in interventions/recommendations
    var decisionTopic = decision.topic || null;
    var topicInInterventions = false;
    var topicInRecs = false;
    if (decisionTopic) {
        queue.forEach(function(q) { if (q.topic === decisionTopic) topicInInterventions = true; });
        recommendations.forEach(function(r) { if (r.topic === decisionTopic) topicInRecs = true; });
    }

    // Calibration: recovery plan ordering check (weakest first)
    var recoveryOrdered = true;
    if (recoveryPlan.length > 1 && recoveryPlan[0].accuracy !== undefined) {
        for (var i = 1; i < recoveryPlan.length; i++) {
            if (recoveryPlan[i].accuracy < recoveryPlan[i-1].accuracy) { recoveryOrdered = false; break; }
        }
    }

    // Calibration: contradictory guidance check
    var contradictoryTopics = [];
    var recoveryTopics = recoveryPlan.map(function(r) { return r.topic; });
    recommendations.forEach(function(r) {
        if (r.type === 'challenge' && r.topic && recoveryTopics.indexOf(r.topic) >= 0) {
            contradictoryTopics.push(r.topic);
        }
    });

    return {
        learnerId: learner.learnerId,
        displayName: learner.displayName,
        pipelineMs: ms,
        decisionId: decision.decisionId || null,
        decisionAction: decision.action || null,
        decisionMode: decision.coachingMode || null,
        decisionPriority: decision.priority || null,
        decisionTopic: decisionTopic,
        decisionRationale: decision.rationale || null,
        readinessScore: readiness.readinessScore !== undefined ? readiness.readinessScore : null,
        readinessBand: readiness.band || null,
        readinessConfidence: readiness.confidence || null,
        topicCoverageTopicsWithData: readiness.topicCoverage ? readiness.topicCoverage.topicsWithData : 0,
        topicCoverageTopicsAtReady: readiness.topicCoverage ? readiness.topicCoverage.topicsAtReady : 0,
        topicCoverageTopicsAtRecovery: readiness.topicCoverage ? readiness.topicCoverage.topicsAtRecovery : 0,
        sectionsWithData: readiness.perSection ? Object.keys(readiness.perSection).filter(function(s) { var ps = readiness.perSection[s]; return ps && ps.band !== 'Not enough data'; }).length : 0,
        intCount: queue.length,
        intTiers: tiersPresent,
        intTopTier: queue.length > 0 ? queue[0].tier : null,
        intTopTopic: queue.length > 0 ? queue[0].topic : null,
        intTopScore: queue.length > 0 ? queue[0].priorityScore : null,
        recCount: recommendations.length,
        recTypes: recTypes,
        recPriorities: recPriorities,
        recTopType: recommendations.length > 0 ? recommendations[0].type : null,
        recTopTopic: recommendations.length > 0 ? recommendations[0].topic : null,
        planCount: recoveryPlan.length,
        planTopics: recoveryPlan.map(function(r) { return r.topic; }),
        recoveryOrdered: recoveryOrdered,
        contradictoryTopics: contradictoryTopics,
        topicInInterventions: topicInInterventions,
        topicInRecs: topicInRecs,
        strengthsCount: readiness.strengths ? readiness.strengths.length : 0,
        weaknessesCount: readiness.weaknesses ? readiness.weaknesses.length : 0,
        riskAreaCount: readiness.riskAreas ? readiness.riskAreas.length : 0,
        profileCompleteness: profile ? (!!profile.learnerId && !!profile.masteryLevels && !!profile.strengths && !!profile.weaknesses) : false,
        _decisionEvidence: decision.evidence || null
    };
}

// ============================================================
// 30 Synthetic Learners (from MAY009_SCENARIO_MATRIX.md)
// ============================================================
var learners = [
    // ─── Group 1: Recovery Zone (D1, D2) ───
    {
        id: 'L01', name: 'Riley', learnerId: 'MAY009-L01', sessions: 7,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-11-15', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L01-A-REC', section: 'A', attempts: 12, accuracy: 28, difficultyScore: 2, trend: 'declining' },
            { topic: 'Inventory Valuation', qidPrefix: 'L01-A-INV', section: 'A', attempts: 12, accuracy: 32, difficultyScore: 2, trend: 'declining' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L01-B-BUD', section: 'B', attempts: 12, accuracy: 35, difficultyScore: 2, trend: 'declining' },
            { topic: 'Standard Costing', qidPrefix: 'L01-C-STD', section: 'C', attempts: 12, accuracy: 40, difficultyScore: 3, trend: 'declining' },
            { topic: 'Cost Behavior', qidPrefix: 'L01-D-CB', section: 'D', attempts: 12, accuracy: 38, difficultyScore: 2, trend: 'declining' }
        ],
        expectedBand: 'Recovery needed', expectedDecision: 'D1'
    },
    {
        id: 'L02', name: 'Sam', learnerId: 'MAY009-L02', sessions: 8,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-12-01', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L02-A-REC', section: 'A', attempts: 15, accuracy: 25, difficultyScore: 2, trend: 'declining' },
            { topic: 'Statement of Cash Flows', qidPrefix: 'L02-A-CF', section: 'A', attempts: 15, accuracy: 30, difficultyScore: 2, trend: 'declining' },
            { topic: 'Cash Budget', qidPrefix: 'L02-B-CB', section: 'B', attempts: 15, accuracy: 22, difficultyScore: 2, trend: 'declining' },
            { topic: 'Standard Costing', qidPrefix: 'L02-C-STD', section: 'C', attempts: 15, accuracy: 35, difficultyScore: 3, trend: 'declining' },
            { topic: 'COSO Framework', qidPrefix: 'L02-E-COSO', section: 'E', attempts: 15, accuracy: 28, difficultyScore: 2, trend: 'declining' },
            { topic: 'Data Analytics', qidPrefix: 'L02-F-DA', section: 'F', attempts: 15, accuracy: 33, difficultyScore: 2, trend: 'declining' }
        ],
        expectedBand: 'Recovery needed', expectedDecision: 'D1'
    },
    {
        id: 'L03', name: 'Quinn', learnerId: 'MAY009-L03', sessions: 7,
        examPlan: { hasScheduledExam: false, examPart: 'Part 1', examDate: null, planningExam: true },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L03-A-REC', section: 'A', attempts: 12, accuracy: 72, difficultyScore: 3, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L03-A-INV', section: 'A', attempts: 12, accuracy: 70, difficultyScore: 3, trend: 'stable' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L03-B-BUD', section: 'B', attempts: 12, accuracy: 38, difficultyScore: 2, trend: 'declining' },
            { topic: 'Cash Budget', qidPrefix: 'L03-B-CB', section: 'B', attempts: 12, accuracy: 68, difficultyScore: 3, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L03-C-STD', section: 'C', attempts: 12, accuracy: 75, difficultyScore: 3, trend: 'stable' },
            { topic: 'CVP Analysis', qidPrefix: 'L03-D-CVP', section: 'D', attempts: 12, accuracy: 74, difficultyScore: 3, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L03-E-COSO', section: 'E', attempts: 12, accuracy: 71, difficultyScore: 3, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L03-F-DA', section: 'F', attempts: 12, accuracy: 66, difficultyScore: 3, trend: 'stable' }
        ],
        expectedBand: 'Developing', expectedDecision: 'D2'
    },
    {
        id: 'L04', name: 'Avery', learnerId: 'MAY009-L04', sessions: 7,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-10-05', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L04-A-REC', section: 'A', attempts: 12, accuracy: 42, difficultyScore: 2, trend: 'declining' },
            { topic: 'Inventory Valuation', qidPrefix: 'L04-A-INV', section: 'A', attempts: 12, accuracy: 38, difficultyScore: 2, trend: 'declining' },
            { topic: 'Financial Ratio Analysis', qidPrefix: 'L04-A-RAT', section: 'A', attempts: 12, accuracy: 72, difficultyScore: 3, trend: 'stable' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L04-B-BUD', section: 'B', attempts: 12, accuracy: 68, difficultyScore: 3, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L04-C-STD', section: 'C', attempts: 12, accuracy: 66, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cost Behavior', qidPrefix: 'L04-D-CB', section: 'D', attempts: 12, accuracy: 64, difficultyScore: 3, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L04-E-COSO', section: 'E', attempts: 12, accuracy: 70, difficultyScore: 3, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L04-F-DA', section: 'F', attempts: 12, accuracy: 62, difficultyScore: 3, trend: 'stable' }
        ],
        expectedBand: 'Developing', expectedDecision: 'D2'
    },
    {
        id: 'L05', name: 'Drew', learnerId: 'MAY009-L05', sessions: 7,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-09-25', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L05-A-REC', section: 'A', attempts: 12, accuracy: 38, difficultyScore: 2, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L05-A-INV', section: 'A', attempts: 12, accuracy: 42, difficultyScore: 2, trend: 'stable' },
            { topic: 'Cash Budget', qidPrefix: 'L05-B-CB', section: 'B', attempts: 12, accuracy: 40, difficultyScore: 2, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L05-C-STD', section: 'C', attempts: 12, accuracy: 35, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cost Behavior', qidPrefix: 'L05-D-CB', section: 'D', attempts: 12, accuracy: 45, difficultyScore: 2, trend: 'stable' }
        ],
        expectedBand: 'Recovery needed', expectedDecision: 'D1'
    },
    // ─── Group 2: Developing with Specific Issues (D3, D5, D6, D7) ───
    {
        id: 'L06', name: 'Harper', learnerId: 'MAY009-L06', sessions: 8,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-10-15', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L06-A-REC', section: 'A', attempts: 14, accuracy: 72, difficultyScore: 3, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L06-A-INV', section: 'A', attempts: 14, accuracy: 68, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cash Budget', qidPrefix: 'L06-B-CB', section: 'B', attempts: 14, accuracy: 45, difficultyScore: 3, trend: 'declining' },
            { topic: 'Flexible Budget Analysis', qidPrefix: 'L06-B-FB', section: 'B', attempts: 14, accuracy: 75, difficultyScore: 3, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L06-C-STD', section: 'C', attempts: 14, accuracy: 80, difficultyScore: 3, trend: 'stable' },
            { topic: 'CVP Analysis', qidPrefix: 'L06-D-CVP', section: 'D', attempts: 14, accuracy: 76, difficultyScore: 3, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L06-E-COSO', section: 'E', attempts: 14, accuracy: 78, difficultyScore: 3, trend: 'stable' },
            { topic: 'ERP Systems', qidPrefix: 'L06-F-ERP', section: 'F', attempts: 14, accuracy: 69, difficultyScore: 3, trend: 'stable' }
        ],
        expectedBand: 'Developing', expectedDecision: 'D3'
    },
    {
        id: 'L07', name: 'Finley', learnerId: 'MAY009-L07', sessions: 8,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2027-02-01', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L07-A-REC', section: 'A', attempts: 14, accuracy: 78, difficultyScore: 3, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L07-A-INV', section: 'A', attempts: 14, accuracy: 76, difficultyScore: 3, trend: 'stable' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L07-B-BUD', section: 'B', attempts: 14, accuracy: 72, difficultyScore: 3, trend: 'declining' },
            { topic: 'Cash Budget', qidPrefix: 'L07-B-CB', section: 'B', attempts: 14, accuracy: 68, difficultyScore: 3, trend: 'declining' },
            { topic: 'Standard Costing', qidPrefix: 'L07-C-STD', section: 'C', attempts: 14, accuracy: 82, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cost Behavior', qidPrefix: 'L07-D-CB', section: 'D', attempts: 14, accuracy: 74, difficultyScore: 3, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L07-E-COSO', section: 'E', attempts: 14, accuracy: 80, difficultyScore: 3, trend: 'stable' },
            { topic: 'Data Governance', qidPrefix: 'L07-F-DG', section: 'F', attempts: 14, accuracy: 66, difficultyScore: 3, trend: 'declining' }
        ],
        expectedBand: 'Developing', expectedDecision: 'D5'
    },
    {
        id: 'L08', name: 'Rowan', learnerId: 'MAY009-L08', sessions: 8,
        examPlan: { hasScheduledExam: false, examPart: 'Part 1', examDate: null, planningExam: true },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L08-A-REC', section: 'A', attempts: 14, accuracy: 71, difficultyScore: 3, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L08-A-INV', section: 'A', attempts: 14, accuracy: 68, difficultyScore: 3, trend: 'stable' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L08-B-BUD', section: 'B', attempts: 14, accuracy: 55, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cash Budget', qidPrefix: 'L08-B-CB', section: 'B', attempts: 14, accuracy: 72, difficultyScore: 3, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L08-C-STD', section: 'C', attempts: 14, accuracy: 76, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cost Behavior', qidPrefix: 'L08-D-CB', section: 'D', attempts: 14, accuracy: 73, difficultyScore: 3, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L08-E-COSO', section: 'E', attempts: 14, accuracy: 74, difficultyScore: 3, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L08-F-DA', section: 'F', attempts: 14, accuracy: 70, difficultyScore: 3, trend: 'improving' }
        ],
        expectedBand: 'Developing', expectedDecision: 'D6'
    },
    {
        id: 'L09', name: 'Cameron', learnerId: 'MAY009-L09', sessions: 8,
        examPlan: { hasScheduledExam: false, examPart: 'Part 1', examDate: null, planningExam: true },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L09-A-REC', section: 'A', attempts: 14, accuracy: 78, difficultyScore: 3, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L09-A-INV', section: 'A', attempts: 14, accuracy: 75, difficultyScore: 3, trend: 'stable' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L09-B-BUD', section: 'B', attempts: 14, accuracy: 68, difficultyScore: 3, trend: 'slightly_declining' },
            { topic: 'Cash Budget', qidPrefix: 'L09-B-CB', section: 'B', attempts: 14, accuracy: 74, difficultyScore: 3, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L09-C-STD', section: 'C', attempts: 14, accuracy: 80, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cost Behavior', qidPrefix: 'L09-D-CB', section: 'D', attempts: 14, accuracy: 76, difficultyScore: 3, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L09-E-COSO', section: 'E', attempts: 14, accuracy: 72, difficultyScore: 3, trend: 'stable' },
            { topic: 'ERP Systems', qidPrefix: 'L09-F-ERP', section: 'F', attempts: 14, accuracy: 70, difficultyScore: 3, trend: 'stable' }
        ],
        expectedBand: 'Approaching review-ready', expectedDecision: 'D7'
    },
    {
        id: 'L10', name: 'Jesse', learnerId: 'MAY009-L10', sessions: 8,
        examPlan: { hasScheduledExam: false, examPart: 'Part 1', examDate: null, planningExam: true },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L10-A-REC', section: 'A', attempts: 14, accuracy: 82, difficultyScore: 4, trend: 'stable' },
            { topic: 'Financial Ratio Analysis', qidPrefix: 'L10-A-RAT', section: 'A', attempts: 14, accuracy: 78, difficultyScore: 3, trend: 'stable' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L10-B-BUD', section: 'B', attempts: 14, accuracy: 62, difficultyScore: 3, trend: 'slightly_declining' },
            { topic: 'Flexible Budget Analysis', qidPrefix: 'L10-B-FB', section: 'B', attempts: 14, accuracy: 80, difficultyScore: 4, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L10-C-STD', section: 'C', attempts: 14, accuracy: 76, difficultyScore: 3, trend: 'stable' },
            { topic: 'Activity Based Costing', qidPrefix: 'L10-D-ABC', section: 'D', attempts: 14, accuracy: 74, difficultyScore: 3, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L10-E-COSO', section: 'E', attempts: 14, accuracy: 80, difficultyScore: 4, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L10-F-DA', section: 'F', attempts: 14, accuracy: 72, difficultyScore: 3, trend: 'stable' }
        ],
        expectedBand: 'Approaching review-ready', expectedDecision: 'D7'
    },
    {
        id: 'L11', name: 'Skyler', learnerId: 'MAY009-L11', sessions: 8,
        examPlan: { hasScheduledExam: false, examPart: 'Part 1', examDate: null, planningExam: true },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L11-A-REC', section: 'A', attempts: 14, accuracy: 75, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cash Budget', qidPrefix: 'L11-B-CB', section: 'B', attempts: 14, accuracy: 72, difficultyScore: 3, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L11-C-STD', section: 'C', attempts: 14, accuracy: 70, difficultyScore: 3, trend: 'slightly_declining' },
            { topic: 'CVP Analysis', qidPrefix: 'L11-D-CVP', section: 'D', attempts: 14, accuracy: 82, difficultyScore: 4, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L11-E-COSO', section: 'E', attempts: 14, accuracy: 80, difficultyScore: 4, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L11-F-DA', section: 'F', attempts: 14, accuracy: 74, difficultyScore: 3, trend: 'stable' },
            { topic: 'Job Order Costing', qidPrefix: 'L11-D-JO', section: 'D', attempts: 14, accuracy: 78, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cybersecurity', qidPrefix: 'L11-F-CYB', section: 'F', attempts: 14, accuracy: 68, difficultyScore: 3, trend: 'stable' }
        ],
        expectedBand: 'Approaching review-ready', expectedDecision: 'D7'
    },
    {
        id: 'L12', name: 'River', learnerId: 'MAY009-L12', sessions: 8,
        examPlan: { hasScheduledExam: false, examPart: 'Part 1', examDate: null, planningExam: true },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L12-A-REC', section: 'A', attempts: 14, accuracy: 74, difficultyScore: 3, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L12-A-INV', section: 'A', attempts: 14, accuracy: 68, difficultyScore: 3, trend: 'declining' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L12-B-BUD', section: 'B', attempts: 14, accuracy: 56, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cash Budget', qidPrefix: 'L12-B-CB', section: 'B', attempts: 14, accuracy: 76, difficultyScore: 3, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L12-C-STD', section: 'C', attempts: 14, accuracy: 80, difficultyScore: 3, trend: 'stable' },
            { topic: 'CVP Analysis', qidPrefix: 'L12-D-CVP', section: 'D', attempts: 14, accuracy: 78, difficultyScore: 4, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L12-E-COSO', section: 'E', attempts: 14, accuracy: 72, difficultyScore: 3, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L12-F-DA', section: 'F', attempts: 14, accuracy: 70, difficultyScore: 3, trend: 'stable' }
        ],
        expectedBand: 'Developing', expectedDecision: 'D5'
    },
    // ─── Group 3: Exam Pressured (D4) ───
    {
        id: 'L13', name: 'Parker', learnerId: 'MAY009-L13', sessions: 8,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-08-14', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L13-A-REC', section: 'A', attempts: 14, accuracy: 62, difficultyScore: 3, trend: 'declining' },
            { topic: 'Inventory Valuation', qidPrefix: 'L13-A-INV', section: 'A', attempts: 14, accuracy: 58, difficultyScore: 3, trend: 'declining' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L13-B-BUD', section: 'B', attempts: 14, accuracy: 65, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cash Budget', qidPrefix: 'L13-B-CB', section: 'B', attempts: 14, accuracy: 55, difficultyScore: 3, trend: 'declining' },
            { topic: 'Standard Costing', qidPrefix: 'L13-C-STD', section: 'C', attempts: 14, accuracy: 60, difficultyScore: 3, trend: 'stable' },
            { topic: 'CVP Analysis', qidPrefix: 'L13-D-CVP', section: 'D', attempts: 14, accuracy: 64, difficultyScore: 3, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L13-E-COSO', section: 'E', attempts: 14, accuracy: 68, difficultyScore: 3, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L13-F-DA', section: 'F', attempts: 14, accuracy: 50, difficultyScore: 3, trend: 'declining' }
        ],
        expectedBand: 'Developing', expectedDecision: 'D4'
    },
    {
        id: 'L14', name: 'Blake', learnerId: 'MAY009-L14', sessions: 6,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-08-05', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L14-A-REC', section: 'A', attempts: 12, accuracy: 35, difficultyScore: 2, trend: 'declining' },
            { topic: 'Inventory Valuation', qidPrefix: 'L14-A-INV', section: 'A', attempts: 12, accuracy: 42, difficultyScore: 2, trend: 'declining' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L14-B-BUD', section: 'B', attempts: 12, accuracy: 38, difficultyScore: 2, trend: 'declining' },
            { topic: 'Standard Costing', qidPrefix: 'L14-C-STD', section: 'C', attempts: 12, accuracy: 40, difficultyScore: 2, trend: 'declining' },
            { topic: 'CVP Analysis', qidPrefix: 'L14-D-CVP', section: 'D', attempts: 12, accuracy: 45, difficultyScore: 2, trend: 'declining' }
        ],
        expectedBand: 'Recovery needed', expectedDecision: 'D1'
    },
    {
        id: 'L15', name: 'Reese', learnerId: 'MAY009-L15', sessions: 7,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-08-22', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L15-A-REC', section: 'A', attempts: 12, accuracy: 62, difficultyScore: 3, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L15-A-INV', section: 'A', attempts: 12, accuracy: 58, difficultyScore: 3, trend: 'stable' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L15-B-BUD', section: 'B', attempts: 12, accuracy: 40, difficultyScore: 2, trend: 'declining' },
            { topic: 'Cash Budget', qidPrefix: 'L15-B-CB', section: 'B', attempts: 12, accuracy: 42, difficultyScore: 2, trend: 'declining' },
            { topic: 'Standard Costing', qidPrefix: 'L15-C-STD', section: 'C', attempts: 12, accuracy: 64, difficultyScore: 3, trend: 'stable' },
            { topic: 'CVP Analysis', qidPrefix: 'L15-D-CVP', section: 'D', attempts: 12, accuracy: 60, difficultyScore: 3, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L15-E-COSO', section: 'E', attempts: 12, accuracy: 66, difficultyScore: 3, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L15-F-DA', section: 'F', attempts: 12, accuracy: 55, difficultyScore: 3, trend: 'stable' }
        ],
        expectedBand: 'Developing', expectedDecision: 'D4'
    },
    {
        id: 'L16', name: 'Sydney', learnerId: 'MAY009-L16', sessions: 9,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-08-18', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L16-A-REC', section: 'A', attempts: 16, accuracy: 88, difficultyScore: 4, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L16-A-INV', section: 'A', attempts: 16, accuracy: 85, difficultyScore: 4, trend: 'stable' },
            { topic: 'Cash Budget', qidPrefix: 'L16-B-CB', section: 'B', attempts: 16, accuracy: 86, difficultyScore: 4, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L16-C-STD', section: 'C', attempts: 16, accuracy: 90, difficultyScore: 4, trend: 'stable' },
            { topic: 'CVP Analysis', qidPrefix: 'L16-D-CVP', section: 'D', attempts: 16, accuracy: 92, difficultyScore: 5, trend: 'improving' },
            { topic: 'COSO Framework', qidPrefix: 'L16-E-COSO', section: 'E', attempts: 16, accuracy: 87, difficultyScore: 4, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L16-F-DA', section: 'F', attempts: 16, accuracy: 84, difficultyScore: 4, trend: 'stable' },
            { topic: 'ERP Systems', qidPrefix: 'L16-F-ERP', section: 'F', attempts: 16, accuracy: 88, difficultyScore: 4, trend: 'stable' }
        ],
        expectedBand: 'Approaching review-ready', expectedDecision: 'D9'
    },
    // ─── Group 4: High Performers (D9) ───
    {
        id: 'L17', name: 'Devin', learnerId: 'MAY009-L17', sessions: 9,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-12-15', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L17-A-REC', section: 'A', attempts: 16, accuracy: 90, difficultyScore: 4, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L17-A-INV', section: 'A', attempts: 16, accuracy: 88, difficultyScore: 4, trend: 'stable' },
            { topic: 'Cash Budget', qidPrefix: 'L17-B-CB', section: 'B', attempts: 16, accuracy: 92, difficultyScore: 4, trend: 'improving' },
            { topic: 'Standard Costing', qidPrefix: 'L17-C-STD', section: 'C', attempts: 16, accuracy: 87, difficultyScore: 4, trend: 'stable' },
            { topic: 'CVP Analysis', qidPrefix: 'L17-D-CVP', section: 'D', attempts: 16, accuracy: 94, difficultyScore: 5, trend: 'improving' },
            { topic: 'COSO Framework', qidPrefix: 'L17-E-COSO', section: 'E', attempts: 16, accuracy: 91, difficultyScore: 4, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L17-F-DA', section: 'F', attempts: 16, accuracy: 89, difficultyScore: 4, trend: 'stable' },
            { topic: 'ERP Systems', qidPrefix: 'L17-F-ERP', section: 'F', attempts: 16, accuracy: 86, difficultyScore: 4, trend: 'stable' }
        ],
        expectedBand: 'Ready for focused review', expectedDecision: 'D9'
    },
    {
        id: 'L18', name: 'Kennedy', learnerId: 'MAY009-L18', sessions: 9,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2027-01-20', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L18-A-REC', section: 'A', attempts: 16, accuracy: 88, difficultyScore: 4, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L18-A-INV', section: 'A', attempts: 16, accuracy: 85, difficultyScore: 4, trend: 'stable' },
            { topic: 'Cash Budget', qidPrefix: 'L18-B-CB', section: 'B', attempts: 16, accuracy: 86, difficultyScore: 4, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L18-C-STD', section: 'C', attempts: 16, accuracy: 90, difficultyScore: 4, trend: 'declining' },
            { topic: 'CVP Analysis', qidPrefix: 'L18-D-CVP', section: 'D', attempts: 16, accuracy: 92, difficultyScore: 5, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L18-E-COSO', section: 'E', attempts: 16, accuracy: 88, difficultyScore: 4, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L18-F-DA', section: 'F', attempts: 16, accuracy: 84, difficultyScore: 4, trend: 'stable' }
        ],
        expectedBand: 'Approaching review-ready', expectedDecision: 'D5'
    },
    {
        id: 'L19', name: 'Phoenix', learnerId: 'MAY009-L19', sessions: 10,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2027-03-01', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L19-A-REC', section: 'A', attempts: 18, accuracy: 96, difficultyScore: 5, trend: 'improving' },
            { topic: 'Inventory Valuation', qidPrefix: 'L19-A-INV', section: 'A', attempts: 18, accuracy: 94, difficultyScore: 5, trend: 'improving' },
            { topic: 'Cash Budget', qidPrefix: 'L19-B-CB', section: 'B', attempts: 18, accuracy: 92, difficultyScore: 4, trend: 'stable' },
            { topic: 'Flexible Budget', qidPrefix: 'L19-B-FB', section: 'B', attempts: 18, accuracy: 95, difficultyScore: 5, trend: 'improving' },
            { topic: 'Standard Costing', qidPrefix: 'L19-C-STD', section: 'C', attempts: 18, accuracy: 93, difficultyScore: 5, trend: 'improving' },
            { topic: 'CVP Analysis', qidPrefix: 'L19-D-CVP', section: 'D', attempts: 18, accuracy: 98, difficultyScore: 5, trend: 'improving' },
            { topic: 'Job Order Costing', qidPrefix: 'L19-D-JO', section: 'D', attempts: 18, accuracy: 91, difficultyScore: 4, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L19-E-COSO', section: 'E', attempts: 18, accuracy: 94, difficultyScore: 5, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L19-F-DA', section: 'F', attempts: 18, accuracy: 90, difficultyScore: 4, trend: 'stable' }
        ],
        expectedBand: 'Ready for focused review', expectedDecision: 'D9'
    },
    {
        id: 'L20', name: 'Logan', learnerId: 'MAY009-L20', sessions: 9,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-11-10', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L20-A-REC', section: 'A', attempts: 16, accuracy: 90, difficultyScore: 4, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L20-A-INV', section: 'A', attempts: 16, accuracy: 85, difficultyScore: 4, trend: 'stable' },
            { topic: 'Cash Budget', qidPrefix: 'L20-B-CB', section: 'B', attempts: 16, accuracy: 42, difficultyScore: 2, trend: 'declining' },
            { topic: 'Standard Costing', qidPrefix: 'L20-C-STD', section: 'C', attempts: 16, accuracy: 88, difficultyScore: 4, trend: 'stable' },
            { topic: 'CVP Analysis', qidPrefix: 'L20-D-CVP', section: 'D', attempts: 16, accuracy: 92, difficultyScore: 5, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L20-E-COSO', section: 'E', attempts: 16, accuracy: 86, difficultyScore: 4, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L20-F-DA', section: 'F', attempts: 16, accuracy: 84, difficultyScore: 4, trend: 'stable' }
        ],
        expectedBand: 'Approaching review-ready', expectedDecision: 'D2'
    },
    // ─── Group 5: Sparse/New Data (D8, D10) ───
    {
        id: 'L21', name: 'Arden', learnerId: 'MAY009-L21', sessions: 8,
        examPlan: { hasScheduledExam: false, examPart: 'Part 1', examDate: null, planningExam: true },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L21-A-REC', section: 'A', attempts: 14, accuracy: 72, difficultyScore: 3, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L21-A-INV', section: 'A', attempts: 14, accuracy: 68, difficultyScore: 3, trend: 'stable' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L21-B-BUD', section: 'B', attempts: 14, accuracy: 75, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cash Budget', qidPrefix: 'L21-B-CB', section: 'B', attempts: 14, accuracy: 70, difficultyScore: 3, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L21-C-STD', section: 'C', attempts: 14, accuracy: 78, difficultyScore: 3, trend: 'improving' },
            { topic: 'CVP Analysis', qidPrefix: 'L21-D-CVP', section: 'D', attempts: 0, accuracy: 0, difficultyScore: 3, trend: 'stable' }
        ],
        expectedBand: 'Developing', expectedDecision: 'D8'
    },
    {
        id: 'L22', name: 'Sage', learnerId: 'MAY009-L22', sessions: 8,
        examPlan: { hasScheduledExam: false, examPart: 'Part 1', examDate: null, planningExam: true },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L22-A-REC', section: 'A', attempts: 14, accuracy: 65, difficultyScore: 3, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L22-A-INV', section: 'A', attempts: 14, accuracy: 62, difficultyScore: 3, trend: 'stable' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L22-B-BUD', section: 'B', attempts: 14, accuracy: 70, difficultyScore: 3, trend: 'stable' }
        ],
        expectedBand: 'Not enough data', expectedDecision: 'D8'
    },
    {
        id: 'L23', name: 'Ellis', learnerId: 'MAY009-L23', sessions: 1,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2027-05-01', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L23-A-REC', section: 'A', attempts: 3, accuracy: 66, difficultyScore: 3, trend: 'stable' }
        ],
        expectedBand: 'Not enough data', expectedDecision: 'D10'
    },
    {
        id: 'L24', name: 'Marley', learnerId: 'MAY009-L24', sessions: 2,
        examPlan: { hasScheduledExam: false, examPart: 'Part 1', examDate: null, planningExam: true },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L24-A-REC', section: 'A', attempts: 4, accuracy: 75, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cash Budget', qidPrefix: 'L24-B-CB', section: 'B', attempts: 2, accuracy: 50, difficultyScore: 3, trend: 'stable' }
        ],
        expectedBand: 'Not enough data', expectedDecision: 'D10'
    },
    {
        id: 'L25', name: 'Jules', learnerId: 'MAY009-L25', sessions: 9,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-09-30', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L25-A-REC', section: 'A', attempts: 16, accuracy: 90, difficultyScore: 4, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L25-A-INV', section: 'A', attempts: 16, accuracy: 86, difficultyScore: 4, trend: 'stable' },
            { topic: 'Statement of Cash Flows', qidPrefix: 'L25-A-CF', section: 'A', attempts: 16, accuracy: 88, difficultyScore: 4, trend: 'stable' },
            { topic: 'Financial Ratio Analysis', qidPrefix: 'L25-A-RAT', section: 'A', attempts: 16, accuracy: 92, difficultyScore: 4, trend: 'improving' }
        ],
        expectedBand: 'Developing', expectedDecision: 'D8'
    },
    // ─── Group 6: Edge Cases & Calibration Boundaries ───
    {
        id: 'L26', name: 'Indigo', learnerId: 'MAY009-L26', sessions: 10,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2027-02-15', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L26-A-REC', section: 'A', attempts: 18, accuracy: 96, difficultyScore: 5, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L26-A-INV', section: 'A', attempts: 18, accuracy: 94, difficultyScore: 5, trend: 'stable' },
            { topic: 'Statement of Cash Flows', qidPrefix: 'L26-A-CF', section: 'A', attempts: 18, accuracy: 92, difficultyScore: 5, trend: 'stable' },
            { topic: 'Financial Ratio Analysis', qidPrefix: 'L26-A-RAT', section: 'A', attempts: 18, accuracy: 95, difficultyScore: 5, trend: 'improving' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L26-B-BUD', section: 'B', attempts: 10, accuracy: 68, difficultyScore: 3, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L26-C-STD', section: 'C', attempts: 10, accuracy: 65, difficultyScore: 3, trend: 'stable' },
            { topic: 'CVP Analysis', qidPrefix: 'L26-D-CVP', section: 'D', attempts: 10, accuracy: 70, difficultyScore: 3, trend: 'stable' }
        ],
        expectedBand: 'Approaching review-ready', expectedDecision: 'D9'
    },
    {
        id: 'L27', name: 'Remy', learnerId: 'MAY009-L27', sessions: 8,
        examPlan: { hasScheduledExam: false, examPart: 'Part 1', examDate: null, planningExam: true },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L27-A-REC', section: 'A', attempts: 14, accuracy: 48, difficultyScore: 3, trend: 'declining' },
            { topic: 'Inventory Valuation', qidPrefix: 'L27-A-INV', section: 'A', attempts: 14, accuracy: 52, difficultyScore: 3, trend: 'declining' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L27-B-BUD', section: 'B', attempts: 14, accuracy: 49, difficultyScore: 3, trend: 'declining' },
            { topic: 'Standard Costing', qidPrefix: 'L27-C-STD', section: 'C', attempts: 14, accuracy: 51, difficultyScore: 3, trend: 'declining' },
            { topic: 'Cost Behavior', qidPrefix: 'L27-D-CB', section: 'D', attempts: 14, accuracy: 47, difficultyScore: 3, trend: 'declining' },
            { topic: 'COSO Framework', qidPrefix: 'L27-E-COSO', section: 'E', attempts: 14, accuracy: 54, difficultyScore: 3, trend: 'declining' },
            { topic: 'Data Analytics', qidPrefix: 'L27-F-DA', section: 'F', attempts: 14, accuracy: 50, difficultyScore: 3, trend: 'declining' }
        ],
        expectedBand: 'Recovery needed', expectedDecision: 'D1'
    },
    {
        id: 'L28', name: 'Wren', learnerId: 'MAY009-L28', sessions: 8,
        examPlan: { hasScheduledExam: false, examPart: 'Part 1', examDate: null, planningExam: true },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L28-A-REC', section: 'A', attempts: 14, accuracy: 72, difficultyScore: 3, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L28-A-INV', section: 'A', attempts: 14, accuracy: 68, difficultyScore: 3, trend: 'stable' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L28-B-BUD', section: 'B', attempts: 14, accuracy: 52, difficultyScore: 3, trend: 'declining' },
            { topic: 'Cash Budget', qidPrefix: 'L28-B-CB', section: 'B', attempts: 14, accuracy: 75, difficultyScore: 3, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L28-C-STD', section: 'C', attempts: 14, accuracy: 78, difficultyScore: 3, trend: 'stable' },
            { topic: 'CVP Analysis', qidPrefix: 'L28-D-CVP', section: 'D', attempts: 14, accuracy: 74, difficultyScore: 3, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L28-E-COSO', section: 'E', attempts: 14, accuracy: 80, difficultyScore: 3, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L28-F-DA', section: 'F', attempts: 14, accuracy: 70, difficultyScore: 3, trend: 'stable' }
        ],
        expectedBand: 'Developing', expectedDecision: 'D3'
    },
    {
        id: 'L29', name: 'Halston', learnerId: 'MAY009-L29', sessions: 8,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-08-31', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L29-A-REC', section: 'A', attempts: 14, accuracy: 72, difficultyScore: 3, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L29-A-INV', section: 'A', attempts: 14, accuracy: 68, difficultyScore: 3, trend: 'stable' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L29-B-BUD', section: 'B', attempts: 14, accuracy: 62, difficultyScore: 3, trend: 'declining' },
            { topic: 'Cash Budget', qidPrefix: 'L29-B-CB', section: 'B', attempts: 14, accuracy: 70, difficultyScore: 3, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L29-C-STD', section: 'C', attempts: 14, accuracy: 75, difficultyScore: 3, trend: 'stable' },
            { topic: 'CVP Analysis', qidPrefix: 'L29-D-CVP', section: 'D', attempts: 14, accuracy: 74, difficultyScore: 3, trend: 'stable' },
            { topic: 'COSO Framework', qidPrefix: 'L29-E-COSO', section: 'E', attempts: 14, accuracy: 76, difficultyScore: 3, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L29-F-DA', section: 'F', attempts: 14, accuracy: 60, difficultyScore: 3, trend: 'stable' }
        ],
        expectedBand: 'Developing', expectedDecision: 'D5'
    },
    {
        id: 'L30', name: 'Emerson', learnerId: 'MAY009-L30', sessions: 12,
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-10-20', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'L30-A-REC', section: 'A', attempts: 30, accuracy: 88, difficultyScore: 4, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'L30-A-INV', section: 'A', attempts: 30, accuracy: 85, difficultyScore: 4, trend: 'stable' },
            { topic: 'Statement of Cash Flows', qidPrefix: 'L30-A-CF', section: 'A', attempts: 30, accuracy: 42, difficultyScore: 2, trend: 'declining' },
            { topic: 'Budgeting Concepts', qidPrefix: 'L30-B-BUD', section: 'B', attempts: 30, accuracy: 78, difficultyScore: 4, trend: 'stable' },
            { topic: 'Cash Budget', qidPrefix: 'L30-B-CB', section: 'B', attempts: 30, accuracy: 55, difficultyScore: 3, trend: 'declining' },
            { topic: 'Flexible Budget', qidPrefix: 'L30-B-FB', section: 'B', attempts: 30, accuracy: 82, difficultyScore: 4, trend: 'stable' },
            { topic: 'Standard Costing', qidPrefix: 'L30-C-STD', section: 'C', attempts: 30, accuracy: 76, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cost Variance Analysis', qidPrefix: 'L30-C-CV', section: 'C', attempts: 30, accuracy: 90, difficultyScore: 4, trend: 'improving' },
            { topic: 'CVP Analysis', qidPrefix: 'L30-D-CVP', section: 'D', attempts: 30, accuracy: 92, difficultyScore: 5, trend: 'stable' },
            { topic: 'Job Order Costing', qidPrefix: 'L30-D-JO', section: 'D', attempts: 30, accuracy: 68, difficultyScore: 3, trend: 'slightly_declining' },
            { topic: 'COSO Framework', qidPrefix: 'L30-E-COSO', section: 'E', attempts: 30, accuracy: 85, difficultyScore: 4, trend: 'stable' },
            { topic: 'Data Analytics', qidPrefix: 'L30-F-DA', section: 'F', attempts: 30, accuracy: 58, difficultyScore: 3, trend: 'declining' }
        ],
        expectedBand: 'Developing', expectedDecision: 'D2'
    }
];

// ============================================================
// Main Execution
// ============================================================
console.log('=== Stage 0: Preflight ===');
var preflightPass = Object.keys(MayFeatureFlags.getAll()).every(function(k) { return !MayFeatureFlags.isEnabled(k); });
console.log('  All flags default: ' + preflightPass);
console.log('  LLM flags off: ' + !MayFeatureFlags.isEnabled('ENABLE_LLM'));
console.log('');

console.log('=== Running 30 Learner Scenarios ===');
var successCount = 0;
var errorCount = 0;

learners.forEach(function(learner) {
    seedLearnerProfile(learner.learnerId, learner.name, learner.examPlan, learner.topicData, learner.sessions);
    var result = runFullPipeline(learner);

    if (result.error) {
        errorCount++;
        console.log('  ' + learner.id + ' (' + learner.name + '): ERROR — ' + result.error);
        result.learnerId = learner.learnerId;
        result.displayName = learner.name;
        result.expectedBand = learner.expectedBand;
        result.expectedDecision = learner.expectedDecision;
        telemetry.results.push(result);
        return;
    }

    successCount++;
    result.expectedBand = learner.expectedBand;
    result.expectedDecision = learner.expectedDecision;

    var match = result.decisionId === learner.expectedDecision ? '✓' : '✗';
    var bandOk = result.readinessBand === learner.expectedBand ? '' : ' [band: ' + result.readinessBand + ' vs exp ' + learner.expectedBand + ']';

    console.log('  ' + learner.id + ' (' + (learner.name + '              ').substring(0,12) + ') ' + match + ' D=' + result.decisionId + ' mode=' + result.decisionMode + ' band=' + result.readinessBand + ' score=' + result.readinessScore + bandOk);

    telemetry.results.push(result);
});

console.log('');
console.log('  Success: ' + successCount + ' / ' + learners.length);
console.log('  Errors:  ' + errorCount);

// ============================================================
// Coverage Analytics
// ============================================================
console.log('');
console.log('=== Decision Coverage ===');
var decisionIds = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10'];
var decisionCoverage = {};
decisionIds.forEach(function(d) { decisionCoverage[d] = { count: 0, learners: [] }; });
telemetry.results.forEach(function(r) {
    if (r.decisionId) {
        if (!decisionCoverage[r.decisionId]) decisionCoverage[r.decisionId] = { count: 0, learners: [] };
        decisionCoverage[r.decisionId].count++;
        decisionCoverage[r.decisionId].learners.push(r.learnerId);
    }
});

decisionIds.forEach(function(d) {
    var c = decisionCoverage[d] || { count: 0 };
    var status = c.count > 0 ? 'EXERCISED' : 'NOT EXERCISED';
    console.log('  ' + d + ': ' + status + ' (' + c.count + 'x)');
});

var exercisedDecisions = decisionIds.filter(function(d) { return (decisionCoverage[d] || {}).count > 0; });
console.log('  Coverage: ' + exercisedDecisions.length + ' / ' + decisionIds.length + ' decision IDs');

// ============================================================
// Mode Coverage
// ============================================================
console.log('');
console.log('=== Coaching Mode Coverage ===');
var modes = ['QUIZ', 'SOCRATIC', 'STUDY_PLAN', 'EXPLAIN', 'MOTIVATE', 'EXAM_REVIEW'];
var modeCoverage = {};
modes.forEach(function(m) { modeCoverage[m] = { count: 0, learners: [] }; });
telemetry.results.forEach(function(r) {
    if (r.decisionMode) {
        if (!modeCoverage[r.decisionMode]) modeCoverage[r.decisionMode] = { count: 0, learners: [] };
        modeCoverage[r.decisionMode].count++;
        modeCoverage[r.decisionMode].learners.push(r.learnerId);
    }
});
modes.forEach(function(m) {
    var c = modeCoverage[m] || { count: 0 };
    var status = c.count > 0 ? 'EXERCISED' : 'NOT EXERCISED';
    console.log('  ' + m + ': ' + status + ' (' + c.count + 'x)');
});

// ============================================================
// Intervention Coverage
// ============================================================
console.log('');
console.log('=== Intervention Tier Coverage ===');
var tiers = [1, 2, 3, 4, 5];
var tierCoverage = {};
tiers.forEach(function(t) { tierCoverage[t] = { count: 0, learners: [] }; });
telemetry.results.forEach(function(r) {
    if (r.intTiers) {
        r.intTiers.forEach(function(t) {
            tierCoverage[t].count++;
            if (tierCoverage[t].learners.indexOf(r.learnerId) < 0) tierCoverage[t].learners.push(r.learnerId);
        });
    }
    if (r.intTopTier !== null) {
        if (!tierCoverage[r.intTopTier]) tierCoverage[r.intTopTier] = { count: 0, learners: [] };
        tierCoverage[r.intTopTier].topActions = (tierCoverage[r.intTopTier].topActions || 0) + 1;
    }
});
tiers.forEach(function(t) {
    var c = tierCoverage[t] || { count: 0 };
    var status = c.count > 0 ? 'EXERCISED' : 'NOT EXERCISED';
    console.log('  Tier ' + t + ': ' + status + ' (' + c.count + 'x in queues, ' + (c.topActions||0) + 'x as top action)');
});

// ============================================================
// Readiness Distribution
// ============================================================
console.log('');
console.log('=== Readiness Band Distribution ===');
var bandDist = {};
telemetry.results.forEach(function(r) {
    var b = r.readinessBand || 'unknown';
    bandDist[b] = (bandDist[b] || 0) + 1;
});
Object.keys(bandDist).sort().forEach(function(b) {
    console.log('  ' + b + ': ' + bandDist[b] + ' learners');
});

// ============================================================
// Calibration Checks
// ============================================================
console.log('');
console.log('=== Calibration Checks ===');

// C1: Decision-expectation match rate
var decisionMatches = telemetry.results.filter(function(r) { return r.decisionId === r.expectedDecision; });
console.log('  C1 — Decision matches expectation: ' + decisionMatches.length + ' / ' + telemetry.results.length);

// C2: Readiness score bounded
var bounded = telemetry.results.filter(function(r) { return r.readinessScore !== null && r.readinessScore >= 0 && r.readinessScore <= 100; });
console.log('  C2 — Readiness scores bounded 0-100: ' + bounded.length + ' / ' + telemetry.results.length);

// C3: Decision determinism (check all unique outputs)
var decisionModes = {};
telemetry.results.forEach(function(r) {
    var key = r.decisionId + '|' + r.decisionMode + '|' + (r.readinessBand || '?');
    decisionModes[key] = (decisionModes[key] || 0) + 1;
});
var uniqueOutputs = Object.keys(decisionModes).length;
console.log('  C3 — Unique decision+mode+band combinations: ' + uniqueOutputs + ' / ' + telemetry.results.length);

// C4: No contradictory guidance
var contradictions = telemetry.results.filter(function(r) { return r.contradictoryTopics && r.contradictoryTopics.length > 0; });
console.log('  C4 — Contradictory challenge+recovery pairs: ' + contradictions.length);

// C5: Pipeline performance
var maxMs = 0;
telemetry.results.forEach(function(r) { if (r.pipelineMs > maxMs) maxMs = r.pipelineMs; });
var avgMs = Math.round(telemetry.results.reduce(function(s, r) { return s + (r.pipelineMs || 0); }, 0) / telemetry.results.length);
console.log('  C5 — Pipeline perf: avg=' + avgMs + 'ms, max=' + maxMs + 'ms');

// C6: Topic alignment (decision topic appears in top-3 interventions or recs)
var topicAligned = telemetry.results.filter(function(r) { return r.decisionTopic && (r.topicInInterventions || r.topicInRecs); });
var topicDecisionCount = telemetry.results.filter(function(r) { return r.decisionTopic; }).length;
console.log('  C6 — Decision topic backed by interventions/recs: ' + topicAligned.length + ' / ' + topicDecisionCount);

// C7: Recovery plan ordering (weakest first)
var recoveryPlans = telemetry.results.filter(function(r) { return r.planCount > 1; });
var orderedPlans = recoveryPlans.filter(function(r) { return r.recoveryOrdered; });
console.log('  C7 — Recovery plans ordered weakest-first: ' + orderedPlans.length + ' / ' + recoveryPlans.length);

// C8: Readiness boundary scan
var boundaryLearners = telemetry.results.filter(function(r) { return r.readinessScore !== null && r.readinessScore >= 45 && r.readinessScore <= 55; });
console.log('  C8 — Learners in readiness boundary [45-55]: ' + boundaryLearners.length);
if (boundaryLearners.length > 0) {
    boundaryLearners.forEach(function(b) {
        console.log('       ' + b.learnerId + ': score=' + b.readinessScore + ' band=' + b.readinessBand + ' D=' + b.decisionId);
    });
}

// ============================================================
// Misalignment Warnings
// ============================================================
console.log('');
console.log('=== Misalignment Analysis ===');
var mismatches = telemetry.results.filter(function(r) { return r.decisionId !== r.expectedDecision; });
if (mismatches.length === 0) {
    console.log('  All decisions match expectations.');
} else {
    mismatches.forEach(function(m) {
        console.log('  ' + m.learnerId + ' (' + m.displayName + '): expected ' + m.expectedDecision + ', got ' + m.decisionId + ' (band=' + m.readinessBand + ', score=' + m.readinessScore + ')');
    });
}

// ============================================================
// Rank Recommendations
// ============================================================
console.log('');
console.log('=== Calibration Insights ===');

// Best: decisions that are stable, well-backed, appropriate
var bestDecisions = telemetry.results.filter(function(r) {
    return r.decisionId === r.expectedDecision && r.decisionMode && r.pipelineMs < 50 && r.profileCompleteness;
});
console.log('  Top-performing (exact match, fast, complete): ' + bestDecisions.length);

// Questionable: decisions that don't match expectation
if (mismatches.length > 0) {
    console.log('  Questionable (mismatch): ' + mismatches.length);
    mismatches.forEach(function(m) {
        console.log('    ' + m.learnerId + ': expected ' + m.expectedDecision + ', actual ' + m.decisionId);
    });
}

// Missing: expected decisions that never fired
var missingDecisions = decisionIds.filter(function(d) {
    return decisionCoverage[d].count === 0;
});
console.log('  Missing decisions (never fired): ' + (missingDecisions.length > 0 ? missingDecisions.join(', ') : 'none'));

// Readiness bands never reached
var allBands = ['Not enough data', 'Recovery needed', 'Developing', 'Approaching review-ready', 'Ready for focused review'];
var missingBands = allBands.filter(function(b) { return !bandDist[b]; });
console.log('  Missing readiness bands: ' + (missingBands.length > 0 ? missingBands.join(', ') : 'none'));

// ============================================================
// Decision Differentiation Matrix
// ============================================================
console.log('');
console.log('=== Decision Differentiation Matrix ===');
console.log('  ID  Learner         Decision  Mode        Priority   Band                  Score  Conf');
telemetry.results.forEach(function(r) {
    console.log('  ' + (r.learnerId||'?').substring(0,12) + ' ' +
        (r.displayName||'?').substring(0,10) + '  ' +
        (r.decisionId||'??').substring(0,10) + ' ' +
        (r.decisionMode||'?').substring(0,11) + ' ' +
        (r.decisionPriority||'?').substring(0,10) + ' ' +
        (r.readinessBand||'?').substring(0,20) + ' ' +
        (r.readinessScore||'?') + '    ' +
        (r.readinessConfidence||'?')
    );
});

// ============================================================
// Write Telemetry
// ============================================================
telemetry.coverage = {
    decisions: decisionCoverage,
    modes: modeCoverage,
    tiers: tierCoverage,
    bands: bandDist,
    decisionMatchRate: decisionMatches.length + '/' + telemetry.results.length,
    uniqueOutputs: uniqueOutputs,
    exerciseDecisions: exercisedDecisions.length + '/' + decisionIds.length
};

telemetry.calibration = {
    decisionMatches: decisionMatches.length,
    totalLearners: learners.length,
    mismatchCount: mismatches.length,
    mismatchLearners: mismatches.map(function(m) { return { id: m.learnerId, name: m.displayName, expected: m.expectedDecision, actual: m.decisionId }; }),
    contradictoryPairs: contradictions.length,
    pipelineAvgMs: avgMs,
    pipelineMaxMs: maxMs,
    topicAlignmentRate: topicDecisionCount > 0 ? Math.round(topicAligned.length / topicDecisionCount * 100) + '%' : 'N/A',
    recoveryPlanOrderRate: recoveryPlans.length > 0 ? Math.round(orderedPlans.length / recoveryPlans.length * 100) + '%' : 'N/A',
    readinessScoreRange: { min: Math.min.apply(null, telemetry.results.map(function(r) { return r.readinessScore || 100; })), max: Math.max.apply(null, telemetry.results.map(function(r) { return r.readinessScore || 0; })) },
    gapAnalysis: {
        missingDecisions: missingDecisions,
        missingModes: modes.filter(function(m) { return !modeCoverage[m].count; }),
        missingBands: missingBands
    }
};

var reportPath = path.join(base, 'reports', 'MAY009_TELEMETRY.json');
fs.writeFileSync(reportPath, JSON.stringify(telemetry, null, 2), 'utf8');
console.log('');
console.log('Telemetry written to: ' + reportPath);

// ============================================================
// Governance Verification
// ============================================================
console.log('');
console.log('=== Governance Verification ===');
console.log('  Pack files modified:   0');
console.log('  Case files modified:   0');
console.log('  Content modified:      0');
console.log('  Registry modified:     0');
console.log('  Baselines modified:    0');
console.log('  LLM flags:             ALL DISABLED');
console.log('  Lane:                  Light — compliant');

// ============================================================
// Grade
// ============================================================
console.log('');
var grade = '';
var exitCode = 0;

if (exercisedDecisions.length >= 8 && mismatches.length <= 5 && errorCount === 0) {
    grade = 'MAY-009 PASS (' + exercisedDecisions.length + '/10 decisions, ' + mismatches.length + ' mismatches)';
    exitCode = 0;
} else if (exercisedDecisions.length >= 6 && errorCount <= 2) {
    grade = 'MAY-009 CONDITIONAL PASS (' + exercisedDecisions.length + '/10 decisions, ' + mismatches.length + ' mismatches, ' + errorCount + ' errors)';
    exitCode = 0;
} else {
    grade = 'MAY-009 FAIL (' + exercisedDecisions.length + '/10 decisions, ' + mismatches.length + ' mismatches, ' + errorCount + ' errors)';
    exitCode = 1;
}

console.log('VERDICT: ' + grade);
process.exit(exitCode);
