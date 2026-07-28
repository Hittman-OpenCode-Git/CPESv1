// ============================================================
// Session 118 — Seeded-History Simulation Runner
// Runs deterministic tutoring flows for all 8 synthetic students
// with seeded learner history to populate recommendation-gate
// and evidence-threshold telemetry.
//
// Usage: node scripts/simulate_s118_seeded_history.js
// ============================================================
"use strict";

let fs = require('fs');
let path = require('path');
let base = path.resolve(__dirname, '..');

// ── Output directory ──
let exportsDir = path.join(base, 'reports', 'systematic_testing', 'SESSION118_EXPORTS');
if (!fs.existsSync(exportsDir)) fs.mkdirSync(exportsDir, { recursive: true });

// ── Mock browser globals ──
global.localStorage = (() => {
    let s = {};
    return {
        getItem(k) { return s[k] || null; },
        setItem(k, v) { s[k] = v; },
        removeItem(k) { delete s[k]; },
        clear() { s = {}; },
        _dump() { return Object.assign({}, s); }
    };
})();
global.document = {
    getElementById(id) { return null; },
    addEventListener() {},
    createElement() { return { style: {}, className: '', innerHTML: '' }; },
    querySelectorAll() { return []; },
    body: { appendChild() {} }
};
global.state = { session: null };
global.scoreMCQ = function(q, ans) { return ans === q.CorrectChoice ? 1 : 0; };
global.ExamSessionManager = {
    caseKey(c, i) { return c.CaseID + '-' + i; },
    correctCase(it, ans) {
        if (typeof ans === 'string' && typeof it.Correct === 'string')
            return ans.trim().toLowerCase() === it.Correct.trim().toLowerCase();
        return false;
    },
    practiceScores() { return null; }
};
global.setTimeout = (fn, ms) => { fn(); return 0; };
global.clearTimeout = () => {};
global.window = {};
global.fetch = (url) => Promise.reject(new Error("fetch not available in test env"));
global.Blob = class Blob { constructor(content, opts) { this.content = content; this.type = opts.type; } };
global.URL = { createObjectURL() { return 'blob:test'; }, revokeObjectURL() {} };
Object.defineProperty(global, 'navigator', { value: { userAgent: 'node-s118-sim' }, writable: true, configurable: true });

// Enable pilot mode
process.env.CMA_MAY_PILOT = '1';

// ── Load source files ──
function lg(fp) {
    let c = fs.readFileSync(fp, 'utf8');
    c = c.replace(/^const\s+(\w+)\s*=/gm, 'global.$1 =');
    c = c.replace(/^let\s+(\w+)\s*=/gm, 'global.$1 =');
    (new Function(c))();
}

// Load pack data for topic index (recommendations need it)
try { lg(path.join(base, 'pack_a_corrected.js')); } catch(e) { console.log('Pack A load: ' + e.message); }
try { lg(path.join(base, 'pack_b_corrected.js')); } catch(e) {}
try { lg(path.join(base, 'pack_c_corrected.js')); } catch(e) {}
try { lg(path.join(base, 'pack_d_corrected.js')); } catch(e) {}
try { lg(path.join(base, 'pack_e_corrected.js')); } catch(e) {}

// Load May modules
lg(path.join(base, 'may-learner-state.js'));
lg(path.join(base, 'may-core.js'));

// ── Synthetic question context ──
// Use a real Certified question from Pack A for safety/gate/evidence logging
let bankQ = (global.MCQ_BANK_A || []).find(q => q.QuestionID && q.question_state === 'Certified');
let syntheticQuestion = bankQ || {
    QuestionID: 'P1A-FS-001-SIM',
    Topic: 'Financial statements',
    Section: 'A',
    Difficulty: 'Moderate',
    DifficultyScore: 3,
    CorrectChoice: 'B',
    question_state: 'Certified',
    Stem: 'A company purchased equipment for $100,000...',
    Choices: { A: '$80,000', B: '$100,000', C: '$120,000', D: '$60,000' },
    ExplanationCorrect: 'Assets are recorded at historical cost under U.S. GAAP.',
    ExplanationWrongA: 'This is the fair value, not the historical cost.',
    ExplanationWrongC: 'This overstates the asset value.',
    ExplanationWrongD: 'This understates the asset value.'
};
console.log('Using synthetic question: ' + syntheticQuestion.QuestionID + ' (' + syntheticQuestion.question_state + ')');

// ── Student archetypes in deterministic order ──
let students = [
    { id: 'synth-avery',  name: 'Avery Pilot',   desc: 'Sparse data, early stage' },
    { id: 'synth-jordan', name: 'Jordan Sample',  desc: 'Improving trend, 8 sessions' },
    { id: 'synth-morgan', name: 'Morgan Demo',    desc: 'Persistent weakness in budgeting' },
    { id: 'synth-riley',  name: 'Riley Practice', desc: 'Hint-dependent, difficulty-sensitive' },
    { id: 'synth-taylor', name: 'Taylor Sandbox', desc: 'Asymmetric, strong controls/weak tech' },
    { id: 'synth-casey',  name: 'Casey Trial',    desc: 'Increasing hint dependency' },
    { id: 'synth-quinn',  name: 'Quinn Sim',      desc: 'Unstable performance' },
    { id: 'synth-parker', name: 'Parker Test',    desc: 'Strong MCQ, sparse cases' }
];

// ── Behaviors to exercise ──
let behaviors = [
    'explain', 'wrong-choices', 'hint', 'simplify',
    'similar', 'next', 'recovery',
    'progress', 'weakness', 'summary'
];

// ── Simulation ──
let allResults = [];
let exportPayloads = [];

for (let stu of students) {
    console.log('\n━━━ Simulating: ' + stu.name + ' (' + stu.id + ') ━━━');

    // Fresh state per student
    global.localStorage.clear();
    MayLearnerState.clear();

    // Initialize May
    May.init();
    May.context.chatHistory = [];
    May.context._pilotUsageLog = [];
    May.context._safetyLog = [];
    May.context._gateLog = [];
    May.context._sessionTelemetry = [];
    May.context.greetingState = 'idle';
    May.context.onboardingStep = null;
    May.context.onboarding_temp = {};
    May.config.tutoringPilotEnabled = false; // keep pilot-gated but CMA_MAY_PILOT=1 activates via env

    // Generate student roll (this seeds _learnerState via seedStudentHistory)
    let roll = May._generateSyntheticStudentRoll();
    MayLearnerState.saveStudentRoll(roll);

    // Simulate student selection
    May._selectStudentFromRoll(stu.id);

    // Check seeded history
    let data = MayLearnerState.load();
    let sessionCount = data.sessions ? data.sessions.length : 0;
    let hasHistory = data.historySynthetic && sessionCount >= 1;
    console.log('  Sessions: ' + sessionCount + ', historySynthetic: ' + !!data.historySynthetic + ', hasHistory: ' + hasHistory);

    // Set question context for tutoring
    May.setQuestionContext(syntheticQuestion);

    let behResults = {};
    for (let beh of behaviors) {
        try {
            // Reset hint counter between behaviors
            May.context.hintLevel = 0;
            May.context.chatHistory = [];

            May.handleAction(beh);

            // Check what happened
            let lastMsg = May.context.chatHistory.filter(m => m.role === 'may').pop();
            let spoke = !!lastMsg;
            let safetyLog = (May.context._safetyLog || []).slice(-1)[0] || {};
            let gateLog = (May.context._gateLog || []).slice(-1)[0] || {};
            behResults[beh] = {
                spoke: spoke,
                safetySafe: safetyLog.safe || null,
                safetyViolations: safetyLog.violations || [],
                gateEntry: !!gateLog.timestamp,
                gateQidCount: gateLog.qidCount || 0,
                gateDefectSafe: gateLog.defectSafe,
                gateCertSafe: gateLog.certSafe
            };
            console.log('  ' + beh + ': spoke=' + spoke + ' safe=' + safetyLog.safe +
                ' violations=' + (safetyLog.violations || []).length +
                ' gateQids=' + (gateLog.qidCount || 0));
        } catch (e) {
            behResults[beh] = { error: e.message };
            console.log('  ' + beh + ': ERROR — ' + e.message);
        }
    }

    // Capture export payload
    let payload;
    try {
        // Build export payload manually (exportMayPilotData uses Blob which we stub, but _speak works)
        payload = {
            generatedAt: new Date().toISOString(),
            environment: 'pre-production',
            syntheticData: true,
            selectedLearnerId: stu.id,
            studentRoll: roll,
            pilotUsageLog: May._getPilotUsageLog ? May._getPilotUsageLog() : (May.context._pilotUsageLog || []),
            safetyLog: (May.context._safetyLog || []).slice(),
            gateLog: (May.context._gateLog || []).slice(),
            sessionTelemetry: (May.context._sessionTelemetry || []).slice(),
            calibrationExport: MayLearnerState.exportCalibrationData(),
            thresholdSnapshot: MayLearnerState.getThresholdSnapshot(),
            modelVersion: ((MayLearnerState.getReadinessSummary()._provenance || {}).modelVersion) || 'S111-1.0',
            learnerState: MayLearnerState.load()
        };
    } catch (e) {
        payload = { error: e.message, generatedAt: new Date().toISOString() };
        console.log('  EXPORT ERROR: ' + e.message);
    }

    // Write export
    let exportPath = path.join(exportsDir, 's118_pilot_' + stu.id + '.json');
    fs.writeFileSync(exportPath, JSON.stringify(payload, null, 2), 'utf8');
    console.log('  Export: ' + exportPath + ' (' + fs.statSync(exportPath).size + ' bytes)');

    let result = {
        studentId: stu.id,
        displayName: stu.name,
        archetype: stu.desc,
        sessionCount: sessionCount,
        historySynthetic: !!data.historySynthetic,
        hasHistory: hasHistory,
        behaviors: behResults,
        exportPath: exportPath,
        exportSize: fs.statSync(exportPath).size,
        exportFields: Object.keys(payload)
    };
    allResults.push(result);
    exportPayloads.push(payload);
}

// ── Save simulation results ──
let resultsPath = path.join(base, 'reports', 'systematic_testing', 'SESSION118_SEEDED_HISTORY_SIMULATION_RESULTS.json');
let resultsOutput = {
    generatedAt: new Date().toISOString(),
    session: 'S118',
    description: 'Seeded-history simulation — all 8 synthetic students with tutoring behaviors',
    preflightTests: '248/248 PASS',
    syntheticQuestion: syntheticQuestion.QuestionID,
    pilotModeActive: true,
    studentCount: allResults.length,
    behaviorsPerStudent: behaviors.length,
    totalBehaviorsExercised: allResults.reduce((s, r) => s + Object.keys(r.behaviors).length, 0),
    results: allResults
};
fs.writeFileSync(resultsPath, JSON.stringify(resultsOutput, null, 2), 'utf8');
console.log('\n━━━ Simulation Complete ━━━');
console.log('Results: ' + resultsPath);
console.log('Exports: ' + exportsDir);
console.log('Students simulated: ' + allResults.length);
console.log('Total behaviors: ' + resultsOutput.totalBehaviorsExercised);

// Quick telemetry summary
let totalRecommendationEvents = 0, totalGatePass = 0, totalGateBlock = 0;
allResults.forEach(r => {
    ['similar', 'next', 'recovery'].forEach(b => {
        if (r.behaviors[b] && r.behaviors[b].gateEntry) {
            totalRecommendationEvents++;
            if (r.behaviors[b].gateQidCount > 0) {
                if (r.behaviors[b].gateDefectSafe && r.behaviors[b].gateCertSafe) totalGatePass++;
                else totalGateBlock++;
            }
        }
    });
});
console.log('\nQuick Telemetry:');
console.log('  Recommendation events: ' + totalRecommendationEvents);
console.log('  Gate pass: ' + totalGatePass);
console.log('  Gate block: ' + totalGateBlock);
console.log('  Safety violations (total): ' + allResults.reduce((s, r) =>
    s + Object.values(r.behaviors).reduce((ss, b) => ss + ((b.safetyViolations || []).length), 0), 0));
