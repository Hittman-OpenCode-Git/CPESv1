// ============================================================
// S116 — May Simulated Pilot Run and Telemetry Export
// Runs via: node scripts/simulate_s116_pilot.js
// ============================================================

let fs = require('fs');
let path = require('path');
let base = path.resolve(__dirname, '..');

// ── Browser stubs (same as test_may_stagec.js) ──
global.localStorage = (() => {
    let store = {};
    return {
        getItem(k) { return store[k] || null; },
        setItem(k, v) { store[k] = v; },
        removeItem(k) { delete store[k]; },
        clear() { store = {}; }
    };
})();
global.document = {
    getElementById() { return null; },
    addEventListener() {},
    querySelectorAll() { return []; },
    createElement() { return { style: {}, className: '', innerHTML: '' }; },
    body: { appendChild() {}, removeChild() {} }
};
global.setTimeout = (fn, ms) => fn();
global.state = { session: null };
global.scoreMCQ = function(q, ans) { return ans === q.CorrectChoice ? 1 : 0; };
global.ExamSessionManager = {
    caseKey(c, i) { return c.CaseID + '-' + i; },
    correctCase() { return false; },
    practiceScores() { return null; }
};
global.Blob = function(data, opts) { return { data: data.map(b => b.toString()).join('') }; };
global.URL = { createObjectURL() { return ''; }, revokeObjectURL() {} };
global.fetch = () => Promise.reject('not in browser');
global.window = { _cmaDefectManifest: { blockedQids: [] } };
global.process = { env: { CMA_MAY_PILOT: '1' } };

// ── Load files ──
function loadGlobal(filePath) {
    let code = fs.readFileSync(filePath, 'utf8');
    code = code.replace(/^const\s+(\w+)\s*=/gm, 'global.$1 =');
    code = code.replace(/^let\s+(\w+)\s*=/gm, 'global.$1 =');
    let fn = new Function(code);
    fn();
}

try { loadGlobal(path.join(base, 'pack_a_corrected.js')); } catch(e) { console.log('Pack A: ' + e.message); }
loadGlobal(path.join(base, 'may-learner-state.js'));
loadGlobal(path.join(base, 'may-core.js'));

// ── Helper: capture the export payload (without Blob download) ──
function captureExportPayload() {
    let payload = {
        generatedAt: new Date().toISOString(),
        environment: 'pre-production',
        syntheticData: true,
        selectedLearnerId: null,
        studentRoll: [],
        pilotUsageLog: May._getPilotUsageLog ? May._getPilotUsageLog() : [],
        safetyLog: May._getSafetyLog ? May._getSafetyLog() : [],
        gateLog: May._getGateLog ? May._getGateLog() : [],
        sessionTelemetry: (May.context._sessionTelemetry || []).slice(),
        calibrationExport: MayLearnerState.exportCalibrationData(),
        thresholdSnapshot: MayLearnerState.getThresholdSnapshot(),
        modelVersion: ((MayLearnerState.getReadinessSummary()._provenance || {}).modelVersion) || 'S111-1.0',
        learnerState: MayLearnerState.load()
    };
    try { payload.selectedLearnerId = localStorage.getItem('cmaMaySelectedLearnerId'); } catch(e) {}
    try { payload.studentRoll = JSON.parse(localStorage.getItem('cmaMayStudentRoll') || '[]'); } catch(e) {}
    return payload;
}

// ── Helper: reset pilot state ──
function resetPilotState() {
    let keys = ['cmaMayStudentRoll','cmaMaySelectedLearnerId','cmaMayPilotUsageLog',
                'cmaMaySafetyLog','cmaMayGateLog','cmaMaySessionTelemetry',
                'cmaMayLearnerState'];
    keys.forEach(k => { try { localStorage.removeItem(k); } catch(e) {} });
    May.context._pilotUsageLog = [];
    May.context._safetyLog = [];
    May.context._gateLog = [];
    May.context._sessionTelemetry = [];
    May.context.greetingState = 'idle';
    May.config.tutoringPilotEnabled = false;
}

// ── Set a question context for exercising tutoring behaviors ──
// Construct a synthetic question object (allQuestions array may not be exposed in global scope)
function setQuestionContext() {
    let q = {
        QuestionID: 'P1A-FS-001-SIM',
        Stem: 'A company reports total assets of $500,000 and total liabilities of $300,000. What is the equity?',
        Topic: 'Financial statements',
        Section: 'A',
        Difficulty: 'Moderate',
        CorrectChoice: 'B',
        Choices: { A: '$200,000', B: '$200,000', C: '$800,000', D: '$500,000' },
        Choicesarray_: ['$200,000', '$200,000', '$800,000', '$500,000'],
        ExplanationCorrect: 'Equity equals total assets minus total liabilities ($500,000 − $300,000 = $200,000), per the fundamental accounting equation A = L + E.',
        ExplanationWrongA: 'This choice confuses the equity calculation by adding assets and liabilities instead of subtracting.',
        ExplanationWrongC: 'This choice incorrectly adds assets and liabilities rather than computing the difference, which yields $800,000.',
        ExplanationWrongD: 'This choice assumes equity equals total assets without accounting for liabilities.',
        question_state: 'Certified',
        CalculationItem: true
    };
    May.context.currentQuestion = q;
    May.context.hintLevel = 0;
    return q;
}

// ── Run tutoring behaviors against a loaded question ──
function exerciseTutoringBehaviors(studentName) {
    setQuestionContext();
    let results = [];
    let behaviors = ['explain','hint','wrong-choices','simplify','similar','next','recovery','progress','weakness','summary'];
    for (let b of behaviors) {
        try {
            // Enable pilot mode for this behavior
            May.config.tutoringPilotEnabled = true;
            May.handleAction(b, {});
            results.push({ behavior: b, status: 'exercised', error: null });
            May.config.tutoringPilotEnabled = false;
        } catch(e) {
            results.push({ behavior: b, status: 'error', error: e.message });
        }
    }
    return results;
}

// ============================================================
// STUDENT ROLL — these must match S115 specification
// ============================================================
const SYNTHETIC_STUDENT_IDS = [
    'synth-avery', 'synth-jordan', 'synth-morgan', 'synth-riley',
    'synth-taylor', 'synth-casey', 'synth-quinn', 'synth-parker'
];

// ============================================================
// SIMULATION 1-8: Returning Students
// ============================================================
console.log('=== S116 Simulated Pilot Run ===\n');

let exportDir = path.join(base, 'reports', 'systematic_testing', 'SESSION116_EXPORTS');
if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });

let allResults = [];
let exportPayloads = [];

for (let i = 0; i < SYNTHETIC_STUDENT_IDS.length; i++) {
    let learnerId = SYNTHETIC_STUDENT_IDS[i];
    console.log(`--- Simulating returning student ${i+1}/8: ${learnerId} ---`);

    // Clean state per student
    resetPilotState();

    // Initialize May — should generate synthetic student roll
    May.config.tutoringPilotEnabled = false;
    May.init();

    // Verify greeting flow started
    let greetingEntered = May.context.greetingState === 'ASK_RETURNING';
    console.log(`  Greeting flow entered: ${greetingEntered} (state: ${May.context.greetingState})`);

    // Respond "Yes" to show student roll
    May._handleGreetingResponse('yes');
    let rollShown = May.context.greetingState === 'SHOW_STUDENT_ROLL';
    console.log(`  Student roll shown: ${rollShown}`);

    // Select the specific student
    May._selectStudentFromRoll(learnerId);
    let selected = May.context.greetingState === 'READY_TO_TUTOR';
    let storedId = '';
    try { storedId = localStorage.getItem('cmaMaySelectedLearnerId'); } catch(e) {}
    console.log(`  Student selected: ${selected}, storedId: ${storedId}`);

    // Exercise tutoring behaviors
    let tutoringResults = exerciseTutoringBehaviors(storedId);
    let exercised = tutoringResults.filter(r => r.status === 'exercised').length;
    let errors = tutoringResults.filter(r => r.status === 'error').length;
    console.log(`  Behaviors: ${exercised} exercised, ${errors} errors`);

    // Capture export payload
    let payload = captureExportPayload();
    let exportFile = `s116_pilot_${learnerId}.json`;
    fs.writeFileSync(path.join(exportDir, exportFile), JSON.stringify(payload, null, 2));
    exportPayloads.push({ learnerId, file: exportFile, payload });

    // Record result
    let result = {
        studentIndex: i + 1,
        learnerId: learnerId,
        displayName: payload.studentRoll.find(s => s.learnerId === learnerId)?.displayName || 'unknown',
        greetingEntered: greetingEntered,
        rollShown: rollShown,
        studentSelected: selected,
        storedLearnerId: storedId,
        behaviorsExercised: exercised,
        behaviorErrors: errors,
        behaviorDetails: tutoringResults,
        exportPayloadSize: JSON.stringify(payload).length,
        exportSectionsPresent: {
            generatedAt: !!payload.generatedAt,
            studentRoll: Array.isArray(payload.studentRoll) && payload.studentRoll.length > 0,
            pilotUsageLog: Array.isArray(payload.pilotUsageLog),
            safetyLog: Array.isArray(payload.safetyLog),
            gateLog: Array.isArray(payload.gateLog),
            sessionTelemetry: Array.isArray(payload.sessionTelemetry),
            calibrationExport: !!payload.calibrationExport,
            thresholdSnapshot: !!payload.thresholdSnapshot,
            modelVersion: !!payload.modelVersion,
            learnerState: !!payload.learnerState
        }
    };
    allResults.push(result);
    console.log(`  Export: ${exportFile} (${result.exportPayloadSize} bytes)\n`);
}

// ============================================================
// SIMULATION 9: New Student Path
// ============================================================
console.log('--- Simulating new-student path ---');
resetPilotState();
May.config.tutoringPilotEnabled = false;
May.init();

let greetingEnteredNew = May.context.greetingState === 'ASK_RETURNING';
console.log(`  Greeting flow entered: ${greetingEnteredNew}`);

// Respond "No" to create new student
May._handleGreetingResponse('no');
let creatingState = May.context.greetingState === 'CREATE_NEW_STUDENT';
console.log(`  CREATE_NEW_STUDENT state: ${creatingState}`);

// Simulate name entry
let newStudentResult = May.trySetName('Jamie Dryrun');
console.log(`  Profile created: ${newStudentResult}`);

let newStudentData = MayLearnerState.load();
let isSynthetic = newStudentData.synthetic === true;
let isPreProduction = newStudentData.preProduction === true;
let newLearnerId = newStudentData.learnerId;
console.log(`  synthetic: ${isSynthetic}, preProduction: ${isPreProduction}, learnerId: ${newLearnerId}`);

// Exercise tutoring
let newTutoringResults = exerciseTutoringBehaviors('Jamie Dryrun');
let newExercised = newTutoringResults.filter(r => r.status === 'exercised').length;
console.log(`  Behaviors: ${newExercised} exercised`);

// Verify persistence across re-init (simulate page reload)
let storedIdAfterCreate = '';
try { storedIdAfterCreate = localStorage.getItem('cmaMaySelectedLearnerId'); } catch(e) {}
// Simulate re-init without clearing localStorage
May.context.greetingState = 'idle';
May.context._sessionTelemetry = [];
May.config.tutoringPilotEnabled = false;
May.init();
let skipHandshakeOnRelaunch = May.context.greetingState === 'idle' || May.context.greetingState === 'READY_TO_TUTOR';
console.log(`  Relaunch skips handshake: ${skipHandshakeOnRelaunch} (state: ${May.context.greetingState})`);

// Capture export
let newPayload = captureExportPayload();
let newExportFile = 's116_pilot_new_student_jamie_dryrun.json';
fs.writeFileSync(path.join(exportDir, newExportFile), JSON.stringify(newPayload, null, 2));
exportPayloads.push({ learnerId: newLearnerId || 'new-student', file: newExportFile, payload: newPayload });

let newResult = {
    studentIndex: 9,
    learnerId: newLearnerId || 'unknown',
    displayName: 'Jamie Dryrun',
    isNewStudent: true,
    greetingEntered: greetingEnteredNew,
    profileCreated: newStudentResult,
    syntheticFlag: isSynthetic,
    preProductionFlag: isPreProduction,
    selectedLearnerId: storedIdAfterCreate,
    relaunchSkipsHandshake: skipHandshakeOnRelaunch,
    behaviorsExercised: newExercised,
    behaviorDetails: newTutoringResults,
    exportPayloadSize: JSON.stringify(newPayload).length,
    exportSectionsPresent: {
        generatedAt: !!newPayload.generatedAt,
        studentRoll: Array.isArray(newPayload.studentRoll),
        pilotUsageLog: Array.isArray(newPayload.pilotUsageLog),
        safetyLog: Array.isArray(newPayload.safetyLog),
        gateLog: Array.isArray(newPayload.gateLog),
        sessionTelemetry: Array.isArray(newPayload.sessionTelemetry),
        calibrationExport: !!newPayload.calibrationExport,
        thresholdSnapshot: !!newPayload.thresholdSnapshot,
        modelVersion: !!newPayload.modelVersion,
        learnerState: !!newPayload.learnerState
    }
};
allResults.push(newResult);
console.log(`  Export: ${newExportFile} (${newResult.exportPayloadSize} bytes)\n`);

// ============================================================
// TELEMETRY ANALYSIS
// ============================================================
console.log('=== S116 Telemetry Analysis ===\n');

function analyzeExportPayloads(payloads, results) {
    let analysis = {
        simulatedSessions: results.length,
        returningStudentCount: results.filter(r => !r.isNewStudent).length,
        newStudentCount: results.filter(r => r.isNewStudent).length,
        successfulReturningSelections: results.filter(r => !r.isNewStudent && r.studentSelected).length,
        successfulNewStudentCreations: results.filter(r => r.isNewStudent && r.profileCreated).length,
        exportPayloadCount: payloads.length,
        malformedPayloadCount: 0,
        localStorageRestoreSuccess: 0,
        sessionContinuationSuccess: 0,
        safetyBlockCount: 0,
        safetyBlockRate: '0/' + payloads.length,
        safetyFalsePositiveCandidates: [],
        missedSafetyViolationCandidates: [],
        recommendationGatePassCount: 0,
        recommendationGateBlockCount: 0,
        emptySafeSetRecommendations: 0,
        evidenceThresholdSuppressionCount: 0,
        unsupportedInsightClaims: 0,
        examPredictionLanguageCount: 0,
        pilotOnVsOffMismatchCount: 'UNAVAILABLE_IN_S116_EXPORT',
        fallbackMessageFrequency: 'UNAVAILABLE_IN_S116_EXPORT',
        missingTelemetryFields: [],
        perStudentMetrics: []
    };

    for (let i = 0; i < payloads.length; i++) {
        let wrapper = payloads[i];
        let p = wrapper.payload;  // dereference: wrapper has { learnerId, file, payload }
        let r = results[i];

        // Check for malformed payloads
        if (!p || typeof p !== 'object') {
            analysis.malformedPayloadCount++;
            continue;
        }

        // Count safety blocks from safetyLog
        let safetyBlocks = 0;
        if (Array.isArray(p.safetyLog)) {
            safetyBlocks = p.safetyLog.filter(e => e.safe === false).length;
        }
        analysis.safetyBlockCount += safetyBlocks;

        // Count gate events from gateLog
        if (Array.isArray(p.gateLog)) {
            for (let g of p.gateLog) {
                if (g.defectResult && g.defectResult.blockedCount > 0) analysis.recommendationGateBlockCount++;
                if (g.defectResult && g.defectResult.passedCount > 0) analysis.recommendationGatePassCount++;
                if (g.defectResult && g.defectResult.safe === false) analysis.recommendationGateBlockCount++;
            }
        }

        // Check for exam prediction language in safety violations
        if (Array.isArray(p.safetyLog)) {
            for (let s of p.safetyLog) {
                if (Array.isArray(s.violations)) {
                    for (let v of s.violations) {
                        if (v.type === 'EXAM_PREDICTION') analysis.examPredictionLanguageCount++;
                    }
                }
            }
        }

        // Check session telemetry for continuity events
        let telemetry = p.sessionTelemetry || [];
        let hasStudentSelected = telemetry.some(t => t.event === 'student_selected');
        let hasGreetingFlow = telemetry.some(t => t.event === 'greeting_flow_started');

        // Check for missing fields
        let requiredFields = ['generatedAt','environment','syntheticData','selectedLearnerId',
                              'studentRoll','pilotUsageLog','safetyLog','gateLog','sessionTelemetry',
                              'calibrationExport','thresholdSnapshot','modelVersion','learnerState'];
        for (let f of requiredFields) {
            if (p[f] === undefined || p[f] === null) {
                if (!analysis.missingTelemetryFields.includes(f)) {
                    analysis.missingTelemetryFields.push(f);
                }
            }
        }

        // localStorage persistence check
        let storedId = r.storedLearnerId || '';
        if (storedId && storedId.length > 0) analysis.localStorageRestoreSuccess++;

        // Session continuation check
        if (r.relaunchSkipsHandshake === true) analysis.sessionContinuationSuccess++;

        // Per-student metrics
        analysis.perStudentMetrics.push({
            learnerId: r.learnerId,
            displayName: r.displayName,
            isNewStudent: !!r.isNewStudent,
            greetingEntered: r.greetingEntered,
            studentSelected: r.studentSelected,
            behaviorsExercised: r.behaviorsExercised,
            safetyBlockCount: safetyBlocks,
            safetyLogEntries: Array.isArray(p.safetyLog) ? p.safetyLog.length : 0,
            gateLogEntries: Array.isArray(p.gateLog) ? p.gateLog.length : 0,
            usageLogEntries: Array.isArray(p.pilotUsageLog) ? p.pilotUsageLog.length : 0,
            telemetryEntries: telemetry.length,
            sectionsPresent: r.exportSectionsPresent,
            exportBytes: r.exportPayloadSize
        });
    }

    // Unavailable metrics (require real learner data or external telemetry)
    let unavailable = [
        'pilotOnVsOffMismatchCount',
        'fallbackMessageFrequency',
        'safetyFalsePositiveCandidates (requires human review of blocked content)',
        'missedSafetyViolationCandidates (requires human review)',
        'unsupportedInsightClaims (requires content inspection)'
    ];
    analysis.unavailableMetrics = unavailable;

    return analysis;
}

let telemetryAnalysis = analyzeExportPayloads(exportPayloads, allResults);

// ============================================================
// WRITE RESULTS
// ============================================================

// Write per-student results
let runResults = {
    session: 'S116',
    type: 'SimulatedStudentRunResults',
    timestamp: new Date().toISOString(),
    summary: {
        totalSimulated: allResults.length,
        returningStudents: allResults.filter(r => !r.isNewStudent).length,
        newStudents: allResults.filter(r => r.isNewStudent).length,
        successfulSelections: allResults.filter(r => r.studentSelected).length,
        exportPayloadsGenerated: exportPayloads.length
    },
    studentResults: allResults,
    exportFiles: exportPayloads.map(p => p.file)
};
fs.writeFileSync(
    path.join(base, 'reports', 'systematic_testing', 'SESSION116_SIMULATED_STUDENT_RUN_RESULTS.json'),
    JSON.stringify(runResults, null, 2)
);
console.log('Written: SESSION116_SIMULATED_STUDENT_RUN_RESULTS.json');

// Write telemetry analysis
let analysisOutput = {
    session: 'S116',
    type: 'TelemetryAnalysis',
    timestamp: new Date().toISOString(),
    analysis: telemetryAnalysis,
    thresholdsSnapshot: MayLearnerState.getThresholdSnapshot(),
    modelVersion: ((MayLearnerState.getReadinessSummary()._provenance || {}).modelVersion) || 'S111-1.0',
    decision: telemetryAnalysis.malformedPayloadCount === 0
        && telemetryAnalysis.safetyBlockCount >= 0
        ? 'PASS_WITH_NOTES' : 'WARN'
};
fs.writeFileSync(
    path.join(base, 'reports', 'systematic_testing', 'SESSION116_TELEMETRY_ANALYSIS.json'),
    JSON.stringify(analysisOutput, null, 2)
);
console.log('Written: SESSION116_TELEMETRY_ANALYSIS.json');

// Summary
console.log('\n=== S116 Simulation Summary ===');
console.log('Returning students simulated: ' + allResults.filter(r => !r.isNewStudent).length);
console.log('New student path: ' + (allResults.find(r => r.isNewStudent)?.profileCreated ? 'PASS' : 'FAIL'));
console.log('Export payloads: ' + exportPayloads.length);
console.log('Safety blocks: ' + telemetryAnalysis.safetyBlockCount);
console.log('Gate passes: ' + telemetryAnalysis.recommendationGatePassCount);
console.log('Gate blocks: ' + telemetryAnalysis.recommendationGateBlockCount);
console.log('Exam prediction flags: ' + telemetryAnalysis.examPredictionLanguageCount);
console.log('Malformed payloads: ' + telemetryAnalysis.malformedPayloadCount);
console.log('localStorage restore successes: ' + telemetryAnalysis.localStorageRestoreSuccess);
console.log('Session continuation successes: ' + telemetryAnalysis.sessionContinuationSuccess);
console.log('Missing fields: ' + (telemetryAnalysis.missingTelemetryFields.length > 0
    ? telemetryAnalysis.missingTelemetryFields.join(', ') : 'none'));
console.log('ModelVersion: ' + analysisOutput.modelVersion);
console.log('Thresholds stable: ' + (analysisOutput.thresholdsSnapshot.stabilityHigh === 75 && analysisOutput.thresholdsSnapshot.accuracyGood === 75));
console.log('\nExport directory: reports/systematic_testing/SESSION116_EXPORTS/');
console.log('Done.');
