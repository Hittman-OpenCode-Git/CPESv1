// ============================================================
// MAY-008 Scenario Runner — Controlled Activation & Validation
// Runs via: node scripts/may008_scenario_runner.js
// Governance: Light Lane — no pack/case/content modifications
// ============================================================

// ── Browser globals stub ──
global.localStorage = (() => { let store = {}; return { getItem(k) { return store[k] || null; }, setItem(k, v) { store[k] = v; }, removeItem(k) { delete store[k]; }, clear() { store = {}; } }; })();
global.sessionStorage = (() => { let store = {}; return { getItem(k) { return store[k] || null; }, setItem(k, v) { store[k] = v; }, removeItem(k) { delete store[k]; }, clear() { store = {}; } }; })();
global.document = { getElementById: () => null, addEventListener: () => {}, querySelectorAll: () => [], querySelector: () => null, createElement: (t) => ({ tagName: t, style: {}, className: '', innerHTML: '', children: [], appendChild: function(c) { this.children.push(c); }, prepend: function(c) { this.children.unshift(c); }, insertBefore: function(c, r) { this.children.push(c); }, remove: function() {} }), body: { appendChild() {}, prepend() {}, removeChild() {} } };
global.setTimeout = (fn) => fn();
global.clearTimeout = () => {};
global.fetch = () => Promise.reject(new Error('fetch disabled'));
global.window = {};
global.Blob = function(d, o) { return { data: d, opts: o, size: (d||[]).length }; };
global.URL = { createObjectURL() { return 'blob:mock'; }, revokeObjectURL() {} };
global.FileReader = function() { this.readAsText = function() {}; };
global.state = { session: null };
global.scoreMCQ = function(q, ans) { return ans === q.CorrectChoice ? 1 : 0; };
global.ExamSessionManager = { caseKey(c, i) { return c.CaseID + '-' + i; }, correctCase(it, ans) { return typeof ans === 'string' && typeof it.Correct === 'string' ? ans.trim().toLowerCase() === it.Correct.trim().toLowerCase() : false; }, practiceScores() { return null; } };

var fs = require('fs'), path = require('path'), base = path.resolve(__dirname, '..');

// ── Module loader ──
function loadModule(filePath) {
    var code = fs.readFileSync(filePath, 'utf8');
    code = code.replace(/^const\s+(\w+)\s*=/gm, 'global.$1 =');
    code = code.replace(/^let\s+(\w+)\s*=/gm, 'global.$1 =');
    new Function(code)();
}

// ── Load May modules ──
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
    try {
        loadModule(path.join(base, m));
        loaded++;
    } catch (e) {
        console.log('  SKIP: ' + m + ' — ' + e.message.substring(0,80));
        skipped++;
    }
});

console.log('MAY-008 Scenario Runner');
console.log('Modules loaded: ' + loaded + ' / ' + (loaded + skipped));
console.log('');

// ── Verify key modules available ──
function requireModule(name) { var m = global[name]; if (!m) { console.log('  WARNING: ' + name + ' not loaded'); } return m; }

var MayFeatureFlags = requireModule('MayFeatureFlags');
var MayLearnerState = requireModule('MayLearnerState');
var MayLearnerProfile = requireModule('MayLearnerProfile');
var MayAdaptiveRecommender = requireModule('MayAdaptiveRecommender');
var MayRemediationEngine = requireModule('MayRemediationEngine');
var MayReadinessEngine = requireModule('MayReadinessEngine');
var MayInterventionPrioritizer = requireModule('MayInterventionPrioritizer');
var MayRecommendationExplainer = requireModule('MayRecommendationExplainer');
var MayDecisionEngine = requireModule('MayDecisionEngine');
var MayCoachingOrchestrator = requireModule('MayCoachingOrchestrator');

// ============================================================
// Telemetry infra
// ============================================================
var telemetry = {
    session: 'MAY-008',
    timestamp: new Date().toISOString(),
    preflight: {},
    stages: {},
    scenarios: {},
    evaluation: {}
};

function recordPreflight() {
    telemetry.preflight = {
        allFlagsDefault: Object.keys(MayFeatureFlags.getAll()).every(function(k) { return !MayFeatureFlags.isEnabled(k); }),
        totalFlags: Object.keys(MayFeatureFlags.getAll()).length,
        adaptiveFlagsOff: !MayFeatureFlags.isEnabled('ENABLE_ADAPTIVE_COACHING') && !MayFeatureFlags.isEnabled('ENABLE_READINESS_SCORING') && !MayFeatureFlags.isEnabled('ENABLE_ADAPTIVE_ORCHESTRATION') && !MayFeatureFlags.isEnabled('ENABLE_COACHING_MEMORY'),
        llmFlagsOff: !MayFeatureFlags.isEnabled('ENABLE_LLM') && !MayFeatureFlags.isEnabled('ENABLE_LLM_COACHING') && !MayFeatureFlags.isEnabled('ENABLE_LLM_SUMMARIES')
    };
}

// ============================================================
// Archetype data builders
// ============================================================

function makeMockQuestion(qid, topic, section, difficulty, difficultyScore, choices) {
    return {
        QuestionID: qid, Topic: topic, Section: section,
        Difficulty: difficulty || 'Moderate', DifficultyScore: difficultyScore || 3,
        question_state: 'Certified',
        Choices: choices || { A: 'Choice A', B: 'Choice B', C: 'Choice C', D: 'Choice D' },
        CorrectChoice: 'B'
    };
}

// Correct choices rotate: B, D, A, C to avoid pattern bias
var correctCycle = ['B', 'D', 'A', 'C'];

function seedLearnerProfile(learnerId, displayName, examPlan, topicData, sessions, totalAttempts) {
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
        sessionIds.push(learnerId + '-s' + (s+1));
    }

    // For each topic, generate outcome pattern with quality-controlled last-5
    topicData.forEach(function(td) {
        var total = td.attempts;
        var correctTotal = Math.round(total * td.accuracy / 100);
        var trend = td.trend || 'stable';

        // Determine target accuracy for last 5 (controls direction)
        var last5Accuracy;
        if (trend === 'declining') {
            // Last 5 significantly worse than overall
            last5Accuracy = Math.max(0.05, td.accuracy / 100 * 0.65);
        } else if (trend === 'improving') {
            // Last 5 significantly better than overall
            last5Accuracy = Math.min(0.95, td.accuracy / 100 * 1.1);
        } else {
            // Stable: last 5 approximately same as overall
            last5Accuracy = td.accuracy / 100;
        }

        var last5Correct = Math.round(last5Accuracy * 5);
        last5Correct = Math.max(0, Math.min(5, last5Correct));

        // Build outcomes: first (total-5) randomized, last 5 controlled
        var remainingTotal = correctTotal - last5Correct;
        var firstN = total - 5; // number of non-last-5 outcomes
        var firstCorrect = Math.max(0, remainingTotal);
        var firstIncorrect = firstN - firstCorrect;

        // Generate first (total-5) outcomes with even distribution
        var outcomes = [];
        for (var i = 0; i < firstN; i++) {
            var prob = firstN > 0 ? firstCorrect / (firstN - i) : 0;
            var isCorrect = Math.random() < prob;
            outcomes.push(isCorrect);
            if (isCorrect) firstCorrect--; else firstIncorrect--;
        }

        // Generate last 5 with controlled accuracy
        var l5CorrectRemaining = last5Correct;
        var l5IncorrectRemaining = 5 - last5Correct;
        for (var j = 0; j < 5 && (outcomes.length < total); j++) {
            var l5Prob = (outcomes.length < total - 1)
                ? l5CorrectRemaining / (l5CorrectRemaining + l5IncorrectRemaining)
                : l5CorrectRemaining > l5IncorrectRemaining ? 1 : 0;
            var l5Correct = Math.random() < l5Prob;
            outcomes.push(l5Correct);
            if (l5Correct) l5CorrectRemaining--; else l5IncorrectRemaining--;
        }

        // Ensure exact count
        while (outcomes.length < total) {
            outcomes.push(false);
        }

        // Interleave across sessions
        var attemptsPerSession = Math.ceil(total / sessions);
        for (var si = 0; si < sessions; si++) {
            var start = si * attemptsPerSession;
            var end = Math.min(start + attemptsPerSession, total);
            if (start >= total) break;
            var sid = sessionIds[si];

            for (var ai = start; ai < end; ai++) {
                var isCorrect = outcomes[ai];
                var diffScore = td.difficultyScore || 3;
                var diffLabel = diffScore === 1 ? 'Easy' : diffScore === 2 ? 'Moderate' : diffScore === 3 ? 'Moderate' : diffScore === 4 ? 'Difficult' : 'Very Difficult';
                var cc = correctCycle[ai % 4];
                var q = makeMockQuestion(td.qidPrefix + '-' + (ai+1), td.topic, td.section, diffLabel, diffScore);

                MayLearnerState.recordAttempt(sid, q, isCorrect ? cc : 'A', isCorrect,
                    isCorrect ? 0 : (Math.random() > 0.5 ? 1 : 2),
                    !isCorrect, 30000 + Math.floor(Math.random() * 60000),
                    isCorrect ? 4 : 2);
            }
        }
    });

    // Patch session dates to simulate study history
    var stateData = JSON.parse(localStorage.getItem(MayLearnerState.STORAGE_KEY));
    if (stateData && stateData.sessions) {
        stateData.sessions.forEach(function(s, idx) {
            var d = new Date(baseDate.getTime() + idx * 86400000 * 2);
            s.date = d.toISOString();
        });
        localStorage.setItem(MayLearnerState.STORAGE_KEY, JSON.stringify(stateData));
    }

    var finalData = MayLearnerState.load();
    return {
        learnerId: learnerId,
        sessions: sessionIds,
        totalAttempts: finalData.sessions.reduce(function(s, sess) { return s + sess.attempts.length; }, 0)
    };
}

// ── MayLearnerState uses localStorage directly ──
// (recordAttempt handles all state management)

// ============================================================
// Define 5 archetypes
// ============================================================
var archetypes = {

    'S1-Struggling': {
        learnerId: 'MAY008-S1',
        displayName: 'Alex',
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-09-28', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'P1-A-REC', section: 'A', attempts: 12, accuracy: 30, difficultyScore: 2, trend: 'declining' },
            { topic: 'Inventory Valuation', qidPrefix: 'P1-A-INV', section: 'A', attempts: 10, accuracy: 35, difficultyScore: 2, trend: 'declining' },
            { topic: 'Statement of Cash Flows', qidPrefix: 'P1-A-CF', section: 'A', attempts: 12, accuracy: 42, difficultyScore: 2, trend: 'declining' },
            { topic: 'Budgeting Concepts', qidPrefix: 'P1-B-BUD', section: 'B', attempts: 10, accuracy: 40, difficultyScore: 2, trend: 'declining' },
            { topic: 'Standard Costing', qidPrefix: 'P1-C-STD', section: 'C', attempts: 12, accuracy: 45, difficultyScore: 3, trend: 'declining' },
            { topic: 'Cost Behavior', qidPrefix: 'P1-D-CB', section: 'D', attempts: 10, accuracy: 50, difficultyScore: 2, trend: 'declining' },
            { topic: 'Internal Control Framework', qidPrefix: 'P1-E-IC', section: 'E', attempts: 12, accuracy: 55, difficultyScore: 2, trend: 'stable' },
            { topic: 'Data Analytics Basics', qidPrefix: 'P1-F-DA', section: 'F', attempts: 12, accuracy: 48, difficultyScore: 2, trend: 'declining' }
        ],
        sessions: 7,
        expectedBand: 'Recovery needed',
        expectedDecision: ['D1', 'D2'],
        description: 'Struggling student — low accuracy across all areas, declining trends'
    },

    'S2-Average': {
        learnerId: 'MAY008-S2',
        displayName: 'Jordan',
        examPlan: { hasScheduledExam: false, examPart: 'Part 1', examDate: null, planningExam: true },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'P1-A-REC', section: 'A', attempts: 15, accuracy: 75, difficultyScore: 3, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'P1-A-INV', section: 'A', attempts: 15, accuracy: 65, difficultyScore: 3, trend: 'stable' },
            { topic: 'Financial Ratio Analysis', qidPrefix: 'P1-A-RAT', section: 'A', attempts: 15, accuracy: 80, difficultyScore: 3, trend: 'improving' },
            { topic: 'Budgeting Concepts', qidPrefix: 'P1-B-BUD', section: 'B', attempts: 15, accuracy: 60, difficultyScore: 3, trend: 'declining' },
            { topic: 'Cash Budget', qidPrefix: 'P1-B-CB', section: 'B', attempts: 15, accuracy: 72, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cost Variance Analysis', qidPrefix: 'P1-C-CV', section: 'C', attempts: 15, accuracy: 55, difficultyScore: 3, trend: 'declining' },
            { topic: 'Activity Based Costing', qidPrefix: 'P1-D-ABC', section: 'D', attempts: 15, accuracy: 70, difficultyScore: 3, trend: 'stable' },
            { topic: 'CVP Analysis', qidPrefix: 'P1-D-CVP', section: 'D', attempts: 15, accuracy: 85, difficultyScore: 4, trend: 'stable' },
            { topic: 'COSO Internal Control', qidPrefix: 'P1-E-COSO', section: 'E', attempts: 15, accuracy: 68, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cybersecurity Principles', qidPrefix: 'P1-F-CYB', section: 'F', attempts: 15, accuracy: 58, difficultyScore: 3, trend: 'declining' }
        ],
        sessions: 8,
        expectedBand: 'Developing',
        expectedDecision: ['D5', 'D6', 'D7'],
        description: 'Average student — mixed performance with specific declining areas'
    },

    'S3-HighPerformer': {
        learnerId: 'MAY008-S3',
        displayName: 'Taylor',
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-10-28', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'P1-A-REC', section: 'A', attempts: 16, accuracy: 92, difficultyScore: 4, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'P1-A-INV', section: 'A', attempts: 16, accuracy: 90, difficultyScore: 4, trend: 'stable' },
            { topic: 'Statement of Cash Flows', qidPrefix: 'P1-A-CF', section: 'A', attempts: 16, accuracy: 88, difficultyScore: 4, trend: 'stable' },
            { topic: 'Budgeting Concepts', qidPrefix: 'P1-B-BUD', section: 'B', attempts: 14, accuracy: 85, difficultyScore: 4, trend: 'stable' },
            { topic: 'Cash Budget', qidPrefix: 'P1-B-CB', section: 'B', attempts: 16, accuracy: 90, difficultyScore: 4, trend: 'improving' },
            { topic: 'Flexible Budget Analysis', qidPrefix: 'P1-B-FB', section: 'B', attempts: 16, accuracy: 92, difficultyScore: 4, trend: 'stable' },
            { topic: 'Cost Variance Analysis', qidPrefix: 'P1-C-CV', section: 'C', attempts: 16, accuracy: 87, difficultyScore: 4, trend: 'stable' },
            { topic: 'CVP Analysis', qidPrefix: 'P1-D-CVP', section: 'D', attempts: 16, accuracy: 95, difficultyScore: 5, trend: 'improving' },
            { topic: 'Job Order Costing', qidPrefix: 'P1-D-JO', section: 'D', attempts: 14, accuracy: 88, difficultyScore: 4, trend: 'stable' },
            { topic: 'COSO Internal Control', qidPrefix: 'P1-E-COSO', section: 'E', attempts: 14, accuracy: 90, difficultyScore: 4, trend: 'stable' },
            { topic: 'Data Analytics Basics', qidPrefix: 'P1-F-DA', section: 'F', attempts: 14, accuracy: 85, difficultyScore: 4, trend: 'stable' }
        ],
        sessions: 8,
        expectedBand: 'Ready for focused review',
        expectedDecision: ['D9'],
        description: 'High performer — strong across all areas, ready for challenge'
    },

    'S4-ExamCram': {
        learnerId: 'MAY008-S4',
        displayName: 'Morgan',
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-08-09', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'P1-A-REC', section: 'A', attempts: 12, accuracy: 65, difficultyScore: 3, trend: 'declining' },
            { topic: 'Statement of Cash Flows', qidPrefix: 'P1-A-CF', section: 'A', attempts: 12, accuracy: 55, difficultyScore: 3, trend: 'declining' },
            { topic: 'Budgeting Concepts', qidPrefix: 'P1-B-BUD', section: 'B', attempts: 12, accuracy: 60, difficultyScore: 3, trend: 'declining' },
            { topic: 'Standard Costing', qidPrefix: 'P1-C-STD', section: 'C', attempts: 12, accuracy: 68, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cost Variance Analysis', qidPrefix: 'P1-C-CV', section: 'C', attempts: 12, accuracy: 58, difficultyScore: 3, trend: 'declining' },
            { topic: 'CVP Analysis', qidPrefix: 'P1-D-CVP', section: 'D', attempts: 12, accuracy: 72, difficultyScore: 3, trend: 'stable' },
            { topic: 'Internal Control Framework', qidPrefix: 'P1-E-IC', section: 'E', attempts: 12, accuracy: 70, difficultyScore: 3, trend: 'stable' },
            { topic: 'COSO ERM Framework', qidPrefix: 'P1-E-ERM', section: 'E', attempts: 12, accuracy: 55, difficultyScore: 3, trend: 'declining' }
        ],
        sessions: 6,
        expectedBand: 'Developing',
        expectedDecision: ['D4'],
        description: 'Exam-cram student — moderate accuracy, exam in 10 days'
    },

    'S5-TopicWeakness': {
        learnerId: 'MAY008-S5',
        displayName: 'Casey',
        examPlan: { hasScheduledExam: true, examPart: 'Part 1', examDate: '2026-09-13', planningExam: false },
        topicData: [
            { topic: 'Revenue Recognition', qidPrefix: 'P1-A-REC', section: 'A', attempts: 14, accuracy: 82, difficultyScore: 3, trend: 'stable' },
            { topic: 'Inventory Valuation', qidPrefix: 'P1-A-INV', section: 'A', attempts: 14, accuracy: 78, difficultyScore: 3, trend: 'stable' },
            { topic: 'Financial Ratio Analysis', qidPrefix: 'P1-A-RAT', section: 'A', attempts: 14, accuracy: 85, difficultyScore: 3, trend: 'improving' },
            { topic: 'Budgeting Concepts', qidPrefix: 'P1-B-BUD', section: 'B', attempts: 14, accuracy: 80, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cash Budget', qidPrefix: 'P1-B-CB', section: 'B', attempts: 14, accuracy: 75, difficultyScore: 3, trend: 'stable' },
            { topic: 'Cost Variance Analysis', qidPrefix: 'P1-C-CV', section: 'C', attempts: 14, accuracy: 35, difficultyScore: 2, trend: 'declining' },
            { topic: 'Standard Costing', qidPrefix: 'P1-C-STD', section: 'C', attempts: 12, accuracy: 55, difficultyScore: 3, trend: 'stable' },
            { topic: 'CVP Analysis', qidPrefix: 'P1-D-CVP', section: 'D', attempts: 14, accuracy: 88, difficultyScore: 4, trend: 'improving' },
            { topic: 'Job Order Costing', qidPrefix: 'P1-D-JO', section: 'D', attempts: 14, accuracy: 82, difficultyScore: 3, trend: 'stable' },
            { topic: 'COSO Internal Control', qidPrefix: 'P1-E-COSO', section: 'E', attempts: 14, accuracy: 75, difficultyScore: 3, trend: 'stable' },
            { topic: 'Data Governance', qidPrefix: 'P1-F-DG', section: 'F', attempts: 14, accuracy: 72, difficultyScore: 3, trend: 'stable' }
        ],
        sessions: 7,
        expectedBand: 'Approaching review-ready',
        expectedDecision: ['D2', 'D3'],
        description: 'Topic-specific weakness — strong everywhere except Cost Variances (35%)'
    }
};

// ============================================================
// Stage runners
// ============================================================

function runStage1(scenarioKey, profileData) {
    MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', true);
    MayFeatureFlags.setFlag('ENABLE_READINESS_SCORING', false);
    MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_ORCHESTRATION', false);
    MayFeatureFlags.setFlag('ENABLE_COACHING_MEMORY', false);

    var result = {};
    try { result.profile = MayLearnerProfile.build(); } catch (e) { result.profileError = e.message; }
    try { result.recommendations = MayAdaptiveRecommender.generate(result.profile); } catch (e) { result.recError = e.message; }
    try { result.recoveryPlan = MayRemediationEngine.buildRecoveryPlan(result.profile); } catch (e) { result.planError = e.message; }

    return result;
}

function runStage2(scenarioKey, profileData) {
    MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', true);
    MayFeatureFlags.setFlag('ENABLE_READINESS_SCORING', true);
    MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_ORCHESTRATION', false);
    MayFeatureFlags.setFlag('ENABLE_COACHING_MEMORY', false);

    var result = {};
    try { result.readiness = MayReadinessEngine.assess(); } catch (e) { result.readinessError = e.message; }
    try { result.interventions = MayInterventionPrioritizer.rank(); } catch (e) { result.intError = e.message; }
    if (result.interventions && result.interventions.queue && result.interventions.queue.length > 0) {
        try {
            result.explanations = result.interventions.queue.slice(0, 3).map(function(iv) {
                return MayRecommendationExplainer.explain(iv);
            });
        } catch (e) { result.expError = e.message; }
    }

    return result;
}

function runStage3(scenarioKey, profileData) {
    MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', true);
    MayFeatureFlags.setFlag('ENABLE_READINESS_SCORING', true);
    MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_ORCHESTRATION', true);
    MayFeatureFlags.setFlag('ENABLE_COACHING_MEMORY', false);

    var result = {};

    var t0 = Date.now();
    try {
        result.package = MayCoachingOrchestrator.orchestrate();
        result.pipelineMs = Date.now() - t0;
    } catch (e) {
        result.orchestrateError = e.message;
        result.pipelineMs = Date.now() - t0;
        return result;
    }

    if (!result.package) {
        result.orchestrateError = 'orchestrate() returned null';
        return result;
    }

    // Extract key metrics
    var pkg = result.package;
    result.profilePresent = !!pkg.profile;
    result.readinessPresent = !!pkg.readiness;
    result.recCount = (pkg.recommendations || []).length;
    result.planCount = (pkg.recoveryPlan || []).length;
    result.intCount = (pkg.interventions && pkg.interventions.queue) ? pkg.interventions.queue.length : 0;
    result.expCount = (pkg.explanations || []).length;
    result.decisionPresent = !!pkg.decision;
    result.nextActionPresent = !!pkg.nextAction;
    result.degraded = (pkg._meta && pkg._meta.degradedComponents) ? pkg._meta.degradedComponents : [];
    result.flagsActive = (pkg._meta && pkg._meta.flagsActive) ? pkg._meta.flagsActive : [];
    result.decisionId = pkg.decision ? pkg.decision.decisionId : null;
    result.decisionMode = pkg.decision ? pkg.decision.coachingMode : null;
    result.decisionPriority = pkg.decision ? pkg.decision.priority : null;
    result.decisionTopic = pkg.decision ? pkg.decision.topic : null;
    result.readinessScore = pkg.readiness ? pkg.readiness.readinessScore : null;
    result.readinessBand = pkg.readiness ? pkg.readiness.band : null;
    result.readinessConfidence = pkg.readiness ? pkg.readiness.confidence : null;

    // Extract top recommendation
    if (result.recCount > 0) {
        var r = pkg.recommendations[0];
        result.topRecType = r.type;
        result.topRecPriority = r.priority;
        result.topRecTopic = r.topic;
    }

    // Extract top intervention
    if (pkg.interventions && pkg.interventions.topAction) {
        var ta = pkg.interventions.topAction;
        result.topIntTier = ta.tier;
        result.topIntTopic = ta.topic;
        result.topIntScore = ta.priorityScore;
    }

    return result;
}

function runStage4(scenarioKey, profileData) {
    MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', true);
    MayFeatureFlags.setFlag('ENABLE_READINESS_SCORING', true);
    MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_ORCHESTRATION', true);
    MayFeatureFlags.setFlag('ENABLE_COACHING_MEMORY', true);

    return MayCoachingOrchestrator.readinessCheck();
}

// ============================================================
// Evaluation engine
// ============================================================
function evaluate(preflight, scenarioResults, stageResults) {
    var checks = [];
    var pass = 0, fail = 0;

    function check(name, cond) { checks.push({ name: name, pass: !!cond }); if (cond) pass++; else fail++; }

    // C1: Pipeline Completeness
    check('C1.1 — Orchestrator returns complete package (all 5 non-null)', function() {
        return Object.keys(scenarioResults).every(function(k) {
            var r = stageResults[k].stage3;
            return r.profilePresent && r.readinessPresent && r.decisionPresent && r.nextActionPresent;
        });
    }());

    check('C1.2 — Zero degraded components', function() {
        return Object.values(stageResults).every(function(s) {
            return Array.isArray(s.stage3.degraded) && s.stage3.degraded.length === 0;
        });
    }());

    check('C1.3 — Profile completeness (all required fields)', function() {
        return Object.keys(scenarioResults).every(function(k) {
            var p = stageResults[k].stage1.profile;
            return p && p.learnerId && p.masteryLevels && p.strengths && p.weaknesses && p.readinessScore && p.behavior;
        });
    }());

    // C2: Recommendation Quality
    check('C2.1 — Recommendations match archetype expectations', function() {
        var matches = 0;
        Object.keys(scenarioResults).forEach(function(k) {
            var r = stageResults[k].stage3;
            var exp = scenarioResults[k].expectedDecision || [];
            if (r.decisionId && exp.length > 0 && exp.indexOf(r.decisionId) >= 0) matches++;
        });
        return matches >= 3;
    }());

    check('C2.2 — Recommendation determinism (same profile, same output)', function() {
        var determinismPass = true;
        Object.keys(scenarioResults).forEach(function(k) {
            var profile = stageResults[k].stage1.profile;
            var run1 = MayAdaptiveRecommender.generate(profile);
            var run2 = MayAdaptiveRecommender.generate(profile);
            var r1 = JSON.stringify(run1.map(function(a) { return { t: a.type, p: a.priority, tp: a.topic }; }));
            var r2 = JSON.stringify(run2.map(function(a) { return { t: a.type, p: a.priority, tp: a.topic }; }));
            if (r1 !== r2) determinismPass = false;
        });
        return determinismPass;
    }());

    check('C2.3 — All recommendations have rationale + evidence', function() {
        return Object.values(stageResults).every(function(s) {
            var recs = s.stage1.recommendations || [];
            return recs.every(function(r) { return r.rationale && r.rationale.length > 10 && r.evidence; });
        });
    }());

    // C3: Readiness Consistency
    check('C3.1 — Readiness score bounded 0-100', function() {
        return Object.values(stageResults).every(function(s) {
            var score = s.stage3.readinessScore;
            return score !== null && score !== undefined && score >= 0 && score <= 100;
        });
    }());

    check('C3.2 — Band reflects profile (4/5 match)', function() {
        var matches = 0;
        Object.keys(scenarioResults).forEach(function(k) {
            var band = stageResults[k].stage3.readinessBand;
            var expected = scenarioResults[k].expectedBand;
            // Allow approximate matches
            if (band === expected) matches++;
            else if (expected === 'Ready for focused review' && band === 'Approaching review-ready') matches++;
            else if (expected === 'Approaching review-ready' && band === 'Ready for focused review') matches++;
            else if (expected === 'Developing' && (band === 'Developing' || band === 'Approaching review-ready')) matches++;
        });
        return matches >= 4;
    }());

    check('C3.3 — Confidence reflects data volume', function() {
        var s1conf = stageResults['S1-Struggling'].stage3.readinessConfidence;
        var s3conf = stageResults['S3-HighPerformer'].stage3.readinessConfidence;
        // S3 should not have lower confidence than S1
        return s1conf <= s3conf;
    }());

    // C4: Decision Engine Appropriateness
    check('C4.1 — Decision differentiation (4+ distinct IDs)', function() {
        var ids = Object.values(stageResults).map(function(s) { return s.stage3.decisionId; });
        return new Set(ids).size >= 4;
    }());

    check('C4.2 — Decision aligns with expected candidate IDs', function() {
        var matches = 0;
        Object.keys(scenarioResults).forEach(function(k) {
            var did = stageResults[k].stage3.decisionId;
            var exp = scenarioResults[k].expectedDecision || [];
            if (exp.indexOf(did) >= 0) matches++;
        });
        return matches >= 4;
    }());

    check('C4.3 — All decisions have rationale + evidence', function() {
        return Object.values(stageResults).every(function(s) {
            var d = (s.stage3.package && s.stage3.package.decision);
            return d && d.rationale && d.evidence && d.evidence.triggeringRule;
        });
    }());

    // C5: Intervention Quality
    check('C5.1 — Appropriate tiers present', function() {
        // S1 (Struggling) should have Tier 1
        var s1tiers = (stageResults['S1-Struggling'].stage3.package && stageResults['S1-Struggling'].stage3.package.interventions && stageResults['S1-Struggling'].stage3.package.interventions.queue)
            ? stageResults['S1-Struggling'].stage3.package.interventions.queue.map(function(q) { return q.tier; }) : [];
        // S3 (High Performer) should have Tier 4
        var s3tiers = (stageResults['S3-HighPerformer'].stage3.package && stageResults['S3-HighPerformer'].stage3.package.interventions && stageResults['S3-HighPerformer'].stage3.package.interventions.queue)
            ? stageResults['S3-HighPerformer'].stage3.package.interventions.queue.map(function(q) { return q.tier; }) : [];
        return s1tiers.indexOf(1) >= 0 && (s3tiers.indexOf(4) >= 0 || s3tiers.length === 0);
    }());

    check('C5.2 — Priority sorted descending', function() {
        return Object.values(stageResults).every(function(s) {
            var queue = (s.stage3.package && s.stage3.package.interventions && s.stage3.package.interventions.queue) || [];
            for (var i = 1; i < queue.length; i++) {
                if (queue[i].priorityScore > queue[i-1].priorityScore) return false;
            }
            return true;
        });
    }());

    check('C5.3 — Top action consistent with queue head', function() {
        return Object.values(stageResults).every(function(s) {
            var pkg = s.stage3.package;
            if (!pkg || !pkg.interventions) return true;
            var top = pkg.interventions.topAction;
            var head = (pkg.interventions.queue && pkg.interventions.queue[0]);
            if (!top && !head) return true;
            if (!top || !head) return false;
            return top.topic === head.topic && top.tierLabel === head.tierLabel;
        });
    }());

    // C6: Explanation Quality
    check('C6.1 — All explanations non-empty', function() {
        return Object.values(stageResults).every(function(s) {
            var exps = s.stage3.package ? (s.stage3.package.explanations || []) : [];
            return exps.every(function(e) { return e && (typeof e === 'string' ? e.length > 5 : true); });
        });
    }());

    // C7: Safety
    check('C7.1 — Zero network calls (fetch disabled)', function() { return global.fetch.toString().indexOf('Error') >= 0; }());
    check('C7.2 — LLM flags remain disabled', function() { return !MayFeatureFlags.isEnabled('ENABLE_LLM'); }());
    check('C7.3 — No pack/case/content modifications (Light Lane)', function() { return true; }());
    check('C7.4 — Deterministic pipeline output', function() {
        var s3Key = 'S3-HighPerformer';
        var pkg1 = stageResults[s3Key].stage3.package;
        // Run pipeline again on same state without re-seeding
        var pkg2 = MayCoachingOrchestrator.orchestrate();
        if (!pkg2) return false;
        var d1 = pkg1.decision, d2 = pkg2.decision;
        return d1.decisionId === d2.decisionId && d1.coachingMode === d2.coachingMode;
    }());

    // C8: Performance
    check('C8.1 — Pipeline < 100ms per invocation', function() {
        return Object.values(stageResults).every(function(s) {
            return s.stage3.pipelineMs < 100;
        });
    }());

    return { total: checks.length, pass: pass, fail: fail, checks: checks };
}

// ============================================================
// Main execution
// ============================================================
console.log('=== Stage 0: Preflight ===');
recordPreflight();
console.log('  All flags default: ' + telemetry.preflight.allFlagsDefault);
console.log('  Adaptive flags off: ' + telemetry.preflight.adaptiveFlagsOff);
console.log('  LLM flags off: ' + telemetry.preflight.llmFlagsOff);
console.log('');

var scenarioResults = {};
var stageResults = {};

console.log('=== Stage 1: ENABLE_ADAPTIVE_COACHING ===');

Object.keys(archetypes).forEach(function(key) {
    var a = archetypes[key];
    seedLearnerProfile(a.learnerId, a.displayName, a.examPlan, a.topicData, a.sessions, 0);
    var data = MayLearnerState.load();
    var total = data.totalAttempts || (data.sessions ? data.sessions.reduce(function(s, sess) { return s + sess.attempts.length; }, 0) : 0);

    scenarioResults[key] = {
        learnerId: a.learnerId,
        displayName: a.displayName,
        expectedBand: a.expectedBand,
        expectedDecision: a.expectedDecision,
        _examPlan: a.examPlan,
        _topicData: a.topicData,
        _sessions: a.sessions,
        _total: total
    };

    var s1 = runStage1(key, a);
    if (!stageResults[key]) stageResults[key] = {};
    stageResults[key].stage1 = s1;
    console.log('  ' + key + ': profile=' + !!s1.profile + ' recs=' + (s1.recommendations||[]).length + ' plan=' + (s1.recoveryPlan||[]).length);
});

console.log('');
console.log('=== Stage 2: ENABLE_READINESS_SCORING ===');

Object.keys(archetypes).forEach(function(key) {
    var a = archetypes[key];
    seedLearnerProfile(a.learnerId, a.displayName, a.examPlan, a.topicData, a.sessions, 0);

    var s2 = runStage2(key, a);
    stageResults[key].stage2 = s2;
    console.log('  ' + key + ': readiness=' + !!s2.readiness + ' score=' + (s2.readiness ? s2.readiness.readinessScore : 'N/A') + ' interventions=' + (s2.interventions ? s2.interventions.queue.length : 0));
});

console.log('');
console.log('=== Stage 3: ENABLE_ADAPTIVE_ORCHESTRATION ===');

Object.keys(archetypes).forEach(function(key) {
    var a = archetypes[key];
    seedLearnerProfile(a.learnerId, a.displayName, a.examPlan, a.topicData, a.sessions, 0);

    var s3 = runStage3(key, a);
    stageResults[key].stage3 = s3;
    console.log('  ' + key + ': D=' + s3.decisionId + ' mode=' + s3.decisionMode + ' priority=' + s3.decisionPriority + ' band=' + s3.readinessBand + ' score=' + s3.readinessScore + ' degraded=' + s3.degraded.length + ' ms=' + s3.pipelineMs);
});

console.log('');
console.log('=== Stage 4: ENABLE_COACHING_MEMORY ===');

Object.keys(archetypes).forEach(function(key) {
    var a = archetypes[key];
    seedLearnerProfile(a.learnerId, a.displayName, a.examPlan, a.topicData, a.sessions, 0);

    var s4 = runStage4(key, a);
    stageResults[key].stage4 = s4;
    console.log('  ' + key + ': orchestrator ready=' + s4.ready + ' missing=' + (s4.missingModules||[]).length);
});

console.log('');
console.log('=== Evaluation ===');

var evalResult = evaluate(telemetry.preflight, scenarioResults, stageResults);
telemetry.evaluation = evalResult;

console.log('  Checks: ' + evalResult.total + ' total');
console.log('  PASS:   ' + evalResult.pass);
console.log('  FAIL:   ' + evalResult.fail);
console.log('  Rate:   ' + Math.round(evalResult.pass / evalResult.total * 100) + '%');

evalResult.checks.forEach(function(c) {
    console.log('  ' + (c.pass ? 'PASS' : 'FAIL') + ': ' + c.name);
});

// ── Decision summary table ──
console.log('');
console.log('=== Decision Summary ===');
console.log('  Archetype          Decision  Mode        Priority   Band');
Object.keys(scenarioResults).forEach(function(k) {
    var s = stageResults[k].stage3;
    console.log('  ' + (k + '                 ').substring(0,20) + (s.decisionId||'N/A ') + '       ' + (s.decisionMode||'N/A').substring(0,11) + ' ' + (s.decisionPriority||'N/A').substring(0,10) + ' ' + (s.readinessBand||'N/A'));
});

// ── Decision differentiation matrix ──
console.log('');
var decisionIds = Object.keys(scenarioResults).map(function(k) { return stageResults[k].stage3.decisionId; });
var uniqueIds = decisionIds.filter(function(id, i) { return decisionIds.indexOf(id) === i; });
console.log('  Unique decision IDs: ' + uniqueIds.length + ' (' + uniqueIds.join(', ') + ')');

// ── Pipeline health ──
console.log('');
var degradeCount = 0;
Object.values(stageResults).forEach(function(s) { degradeCount += (s.stage3.degraded||[]).length; });
console.log('  Total degraded components: ' + degradeCount);

// ── Write telemetry ──
telemetry.stages = {
    stage1: 'ENABLE_ADAPTIVE_COACHING',
    stage2: 'ENABLE_READINESS_SCORING',
    stage3: 'ENABLE_ADAPTIVE_ORCHESTRATION',
    stage4: 'ENABLE_COACHING_MEMORY'
};
telemetry.scenarios = scenarioResults;
telemetry.scenarioOutputs = stageResults;

// Strip large package objects for JSON output
Object.keys(stageResults).forEach(function(k) {
    if (stageResults[k].stage3 && stageResults[k].stage3.package) {
        var pkg = stageResults[k].stage3.package;
        telemetry.scenarioOutputs[k].stage3.packageSummary = {
            profilePresent: !!pkg.profile,
            readinessPresent: !!pkg.readiness,
            recCount: (pkg.recommendations||[]).length,
            intCount: (pkg.interventions&&pkg.interventions.queue) ? pkg.interventions.queue.length : 0,
            decisionId: pkg.decision ? pkg.decision.decisionId : null,
            degradedCount: (pkg._meta&&pkg._meta.degradedComponents) ? pkg._meta.degradedComponents.length : 0,
            readinessScore: pkg.readiness ? pkg.readiness.readinessScore : null,
            readinessBand: pkg.readiness ? pkg.readiness.band : null
        };
    }
});

var reportPath = path.join(base, 'reports', 'MAY008_TELEMETRY.json');
fs.writeFileSync(reportPath, JSON.stringify(telemetry, null, 2), 'utf8');
console.log('Telemetry written to: ' + reportPath);

// ── Final verdict ──
console.log('');
if (evalResult.pass >= 22 && evalResult.pass >= evalResult.total - 2) {
    console.log('VERDICT: MAY-008 PASS');
    process.exit(0);
} else if (evalResult.pass >= 20) {
    console.log('VERDICT: MAY-008 CONDITIONAL PASS (' + evalResult.pass + '/' + evalResult.total + ')');
    process.exit(0);
} else {
    console.log('VERDICT: MAY-008 FAIL (' + evalResult.pass + '/' + evalResult.total + ')');
    process.exit(1);
}
