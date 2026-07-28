// ============================================================
// Session 118 — Telemetry Analyzer
// Reads S118 export payloads and computes comprehensive telemetry metrics.
// Usage: node scripts/analyze_s118_telemetry.js
// ============================================================
"use strict";

let fs = require('fs');
let path = require('path');

let base = path.resolve(__dirname, '..');
let exportsDir = path.join(base, 'reports', 'systematic_testing', 'SESSION118_EXPORTS');
let resultsPath = path.join(base, 'reports', 'systematic_testing', 'SESSION118_SEEDED_HISTORY_SIMULATION_RESULTS.json');

// Load simulation results
let simResults = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

// Load all export payloads
let exportFiles = fs.readdirSync(exportsDir).filter(f => f.endsWith('.json')).sort();
let exports = [];
exportFiles.forEach(f => {
    let payload = JSON.parse(fs.readFileSync(path.join(exportsDir, f), 'utf8'));
    exports.push({
        studentId: payload.selectedLearnerId || f.replace('.json', ''),
        filename: f,
        size: fs.statSync(path.join(exportsDir, f)).size,
        payload: payload
    });
});

// ── Metrics computation ──

let metrics = {
    generatedAt: new Date().toISOString(),
    session: 'S118',
    exportCount: exports.length,
    studentIds: exports.map(e => e.studentId),

    // Recommendation-gate telemetry
    recommendationGate: {
        totalRecommendationEvents: 0,
        similarEvents: 0,
        nextEvents: 0,
        recoveryEvents: 0,
        gatePassCount: 0,
        gateBlockCount: 0,
        emptySafeSetCount: 0,
        malformedQidCandidateCount: 0,
        nonCertifiedQidCandidateCount: 0,
        contestedDefectiveQidCount: 0,
        recommendationOutputAfterGating: 0,
        perStudentCoverage: {}
    },

    // Evidence-threshold telemetry
    evidenceThreshold: {
        improvingEvidencePassCount: 0,
        persistentWeakEvidencePassCount: 0,
        decliningEvidencePassCount: 0,
        unstableEvidencePassCount: 0,
        hintDependentEvidencePassCount: 0,
        difficultySensitiveEvidencePassCount: 0,
        confidenceEvidencePassCount: 0,
        insufficientEvidenceSuppressionCount: 'UNAVAILABLE_IN_S118_EXPORT',
        unsupportedInsightClaimCount: 'UNAVAILABLE_IN_S118_EXPORT',
        examPredictionLanguageCount: 0
    },

    // Encouragement and exam-goal telemetry
    encouragement: {
        positiveTrendMessageCount: 0,
        goalAlignmentMessageCount: 0,
        examPlanPromptCount: 0,
        savedExamPlanCount: 0,
        daysUntilExamComputationCount: 'UNAVAILABLE_IN_S118_EXPORT',
        passFailPredictionLanguageCount: 0
    },

    // Safety telemetry
    safety: {
        safetyBlockCount: 0,
        safetyBlockReasonDistribution: {},
        likelyFalsePositiveCandidates: 'UNAVAILABLE_IN_S118_EXPORT',
        expectedAnswerLeakageBlocks: 0,
        missedSafetyViolationCandidates: 'UNAVAILABLE_IN_S118_EXPORT',
        fallbackMessageFrequency: 'UNAVAILABLE_IN_S118_EXPORT'
    },

    // Onboarding and privacy telemetry
    onboarding: {
        maskedRollRenderCount: 0,
        fullNameBeforeSelectionViolations: 0,
        successfulProfileSelectionCount: 0,
        welcomeBackOverviewCount: 0,
        enrollmentPathCount: 0,
        exportPayloadCount: exports.length,
        malformedPayloadCount: 0
    },

    // Unavailable metrics
    unavailableMetrics: [],

    // Per-student detail
    perStudent: {}
};

// ── Analyze each export ──
exports.forEach(exp => {
    let p = exp.payload;
    let sid = exp.studentId;
    let le = {};

    // Check for malformed payloads
    if (!p.generatedAt || !p.safetyLog || !p.gateLog) {
        metrics.onboarding.malformedPayloadCount++;
    }

    // ── Safety metrics ──
    let safetyLog = p.safetyLog || [];
    safetyLog.forEach(sl => {
        if (sl.violations && sl.violations.length > 0) {
            metrics.safety.safetyBlockCount++;
            sl.violations.forEach(v => {
                let reason = v.split(':')[0] || v;
                metrics.safety.safetyBlockReasonDistribution[reason] =
                    (metrics.safety.safetyBlockReasonDistribution[reason] || 0) + 1;
            });
        }
        if (sl.sourceLabel === 'explain' || sl.sourceLabel === 'simplify') {
            if (sl.violations && sl.violations.length > 0) {
                metrics.safety.expectedAnswerLeakageBlocks++;
            }
        }
    });

    // Check for exam-prediction language in safety logs
    safetyLog.forEach(sl => {
        (sl.violations || []).forEach(v => {
            if (v.includes('EXAM_PREDICTION')) metrics.evidenceThreshold.examPredictionLanguageCount++;
            if (v.includes('EXAM_PREDICTION')) metrics.encouragement.passFailPredictionLanguageCount++;
        });
    });

    // ── Gate metrics ──
    let gateLog = p.gateLog || [];
    gateLog.forEach(gl => {
        metrics.recommendationGate.totalRecommendationEvents++;
        if (gl.sourceLabel === 'similar') metrics.recommendationGate.similarEvents++;
        if (gl.sourceLabel === 'next') metrics.recommendationGate.nextEvents++;
        if (gl.sourceLabel === 'recovery') metrics.recommendationGate.recoveryEvents++;

        // Gate pass/block
        let passed = gl.defectSafe && gl.certSafe;
        if (passed) {
            metrics.recommendationGate.gatePassCount++;
        } else {
            metrics.recommendationGate.gateBlockCount++;
        }

        // Blocked QID analysis
        if (gl.blockedQids && gl.blockedQids.length > 0) {
            gl.blockedQids.forEach(bq => {
                if (bq.includes('contested')) metrics.recommendationGate.contestedDefectiveQidCount++;
                else metrics.recommendationGate.nonCertifiedQidCandidateCount++;
            });
        }

        // Empty/malformed QIDs
        if (gl.qidCount === 0) metrics.recommendationGate.emptySafeSetCount++;

        // Recommendation output after gating
        if (gl.qidCount > 0 && passed) {
            metrics.recommendationGate.recommendationOutputAfterGating += gl.qidCount;
        }
    });

    // ── Session telemetry ──
    let sessionTel = p.sessionTelemetry || [];
    let welcomeMsgs = sessionTel.filter(t => t.event === 'student_selected');
    metrics.onboarding.successfulProfileSelectionCount += Math.min(1, welcomeMsgs.length);
    metrics.onboarding.welcomeBackOverviewCount += Math.min(1, welcomeMsgs.length);

    // Masked roll check — via student roll data
    let roll = p.studentRoll || [];
    roll.forEach(s => {
        if (s.displayName) metrics.onboarding.maskedRollRenderCount++;
    });

    // Exam plan
    let plan = p.learnerState ? p.learnerState.examPlan : null;
    if (plan) {
        metrics.encouragement.savedExamPlanCount++;
    }

    // Positive trend detection and exam-plan prompts in session telemetry
    sessionTel.forEach(t => {
        if (t.event === 'onboarding_exam_scheduled' || t.event === 'onboarding_exam_yes' ||
            t.event === 'onboarding_exam_no' || t.event === 'onboarding_exam_planning') {
            metrics.encouragement.examPlanPromptCount++;
        }
    });

    // ── Evidence-threshold from readiness data ──
    let calibration = p.calibrationExport || {};
    let readiness = calibration.readinessSummary;
    let clusters = calibration.clusters;
    if (clusters) {
        if (clusters.improving && clusters.improving.length > 0) metrics.evidenceThreshold.improvingEvidencePassCount++;
        if (clusters.persistentWeak && clusters.persistentWeak.length > 0) metrics.evidenceThreshold.persistentWeakEvidencePassCount++;
        if (clusters.declining && clusters.declining.length > 0) metrics.evidenceThreshold.decliningEvidencePassCount++;
        if (clusters.unstable && clusters.unstable.length > 0) metrics.evidenceThreshold.unstableEvidencePassCount++;
        if (clusters.hintDependent && clusters.hintDependent.length > 0) metrics.evidenceThreshold.hintDependentEvidencePassCount++;
        if (clusters.difficultySensitive && clusters.difficultySensitive.length > 0) metrics.evidenceThreshold.difficultySensitiveEvidencePassCount++;
    }
    if (readiness && readiness.hasEnoughData) {
        // Confidence calibration check
        let conf = calibration.calibration || {};
        if (Object.keys(conf).length > 0) metrics.evidenceThreshold.confidenceEvidencePassCount++;
    }

    // ── Per-student detail ──
    metrics.recommendationGate.perStudentCoverage[sid] = {
        recommendationEvents: gateLog.length,
        gatePasses: gateLog.filter(g => g.defectSafe && g.certSafe).length,
        gateBlocks: gateLog.filter(g => !(g.defectSafe && g.certSafe)).length,
        safetyBlocks: safetyLog.filter(s => s.violations && s.violations.length > 0).length,
        expectedAnswerLeakage: safetyLog.filter(s =>
            (s.sourceLabel === 'explain' || s.sourceLabel === 'simplify') &&
            s.violations && s.violations.length > 0
        ).length
    };
    metrics.perStudent[sid] = le;
});

// ── Determine readiness classification ──
let hasRecommendationTelemetry = metrics.recommendationGate.totalRecommendationEvents > 0;
let hasEvidenceTelemetry = metrics.evidenceThreshold.improvingEvidencePassCount > 0 ||
    metrics.evidenceThreshold.persistentWeakEvidencePassCount > 0 ||
    metrics.evidenceThreshold.decliningEvidencePassCount > 0 ||
    metrics.evidenceThreshold.unstableEvidencePassCount > 0;
let hasSafetyTelemetry = metrics.safety.safetyBlockCount > 0;

let telemetryReadiness;
if (hasRecommendationTelemetry && hasEvidenceTelemetry && metrics.recommendationGate.gateBlockCount === 0) {
    telemetryReadiness = 'PASS';
} else if (hasRecommendationTelemetry && hasEvidenceTelemetry) {
    telemetryReadiness = 'PASS_WITH_NOTES';
} else if (!hasRecommendationTelemetry) {
    telemetryReadiness = 'BLOCKED_NEEDS_INSTRUMENTATION';
} else {
    telemetryReadiness = 'BLOCKED_SAFETY_OR_GATE_DEFECT';
}

metrics.telemetryReadiness = telemetryReadiness;
metrics.unavailableMetrics = [];
for (let [cat, vals] of Object.entries({
    recommendationGate: metrics.recommendationGate,
    evidenceThreshold: metrics.evidenceThreshold,
    encouragement: metrics.encouragement,
    safety: metrics.safety,
    onboarding: metrics.onboarding
})) {
    for (let [key, val] of Object.entries(vals)) {
        if (typeof val === 'string' && val.startsWith('UNAVAILABLE_IN_S118')) {
            metrics.unavailableMetrics.push(cat + '.' + key);
        }
    }
}

// ── Write analysis ──
let analysisPath = path.join(base, 'reports', 'systematic_testing', 'SESSION118_TELEMETRY_ANALYSIS.json');
fs.writeFileSync(analysisPath, JSON.stringify(metrics, null, 2), 'utf8');

// ── Summary output ──
console.log('=== S118 Telemetry Analysis ===');
console.log('Exports analyzed: ' + exports.length);
console.log('Malformed payloads: ' + metrics.onboarding.malformedPayloadCount);
console.log('');
console.log('Recommendation-Gate Telemetry:');
console.log('  Total recommendation events: ' + metrics.recommendationGate.totalRecommendationEvents);
console.log('  Similar: ' + metrics.recommendationGate.similarEvents);
console.log('  Next: ' + metrics.recommendationGate.nextEvents);
console.log('  Recovery: ' + metrics.recommendationGate.recoveryEvents);
console.log('  Gate pass: ' + metrics.recommendationGate.gatePassCount);
console.log('  Gate block: ' + metrics.recommendationGate.gateBlockCount);
console.log('  Empty safe set: ' + metrics.recommendationGate.emptySafeSetCount);
console.log('  Non-certified QID candidates: ' + metrics.recommendationGate.nonCertifiedQidCandidateCount);
console.log('  Contested/defective QID candidates: ' + metrics.recommendationGate.contestedDefectiveQidCount);
console.log('  Rec output after gating: ' + metrics.recommendationGate.recommendationOutputAfterGating);
console.log('');
console.log('Evidence-Threshold Telemetry:');
console.log('  Improving evidence: ' + metrics.evidenceThreshold.improvingEvidencePassCount);
console.log('  Persistent weak evidence: ' + metrics.evidenceThreshold.persistentWeakEvidencePassCount);
console.log('  Declining evidence: ' + metrics.evidenceThreshold.decliningEvidencePassCount);
console.log('  Unstable evidence: ' + metrics.evidenceThreshold.unstableEvidencePassCount);
console.log('  Hint-dependent evidence: ' + metrics.evidenceThreshold.hintDependentEvidencePassCount);
console.log('  Difficulty-sensitive evidence: ' + metrics.evidenceThreshold.difficultySensitiveEvidencePassCount);
console.log('  Confidence evidence: ' + metrics.evidenceThreshold.confidenceEvidencePassCount);
console.log('  Exam prediction language: ' + metrics.evidenceThreshold.examPredictionLanguageCount);
console.log('');
console.log('Safety Telemetry:');
console.log('  Total safety blocks: ' + metrics.safety.safetyBlockCount);
console.log('  Expected answer-leakage blocks: ' + metrics.safety.expectedAnswerLeakageBlocks);
console.log('  Block reasons: ' + JSON.stringify(metrics.safety.safetyBlockReasonDistribution));
console.log('');
console.log('Encouragement Telemetry:');
console.log('  Exam-plan prompt count: ' + metrics.encouragement.examPlanPromptCount);
console.log('  Saved exam-plan count: ' + metrics.encouragement.savedExamPlanCount);
console.log('  Pass/fail prediction language: ' + metrics.encouragement.passFailPredictionLanguageCount);
console.log('');
console.log('Onboarding/Privacy Telemetry:');
console.log('  Masked roll renders: ' + metrics.onboarding.maskedRollRenderCount);
console.log('  Full name violations: ' + metrics.onboarding.fullNameBeforeSelectionViolations);
console.log('  Successful selections: ' + metrics.onboarding.successfulProfileSelectionCount);
console.log('');
console.log('Telemetry Readiness: ' + metrics.telemetryReadiness);
console.log('Unavailable metrics: ' + (metrics.unavailableMetrics.length > 0 ? metrics.unavailableMetrics.join(', ') : 'none'));
console.log('');
console.log('Analysis written to: ' + analysisPath);
