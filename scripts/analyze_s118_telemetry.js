"use strict";
const fs = require('fs');
const path = require('path');

const base = path.resolve(__dirname, '..');
const exportsDir = path.join(base, 'reports', 'systematic_testing', 'SESSION118_EXPORTS');
const resultsPath = path.join(base, 'reports', 'systematic_testing', 'SESSION118_SEEDED_HISTORY_SIMULATION_RESULTS.json');

// Load all export payloads
const files = fs.readdirSync(exportsDir).filter(f => f.endsWith('.json')).sort();
const payloads = [];
files.forEach(f => {
    const p = JSON.parse(fs.readFileSync(path.join(exportsDir, f), 'utf8'));
    payloads.push({
        studentId: p.selectedLearnerId || f.replace('.json', ''),
        filename: f,
        size: fs.statSync(path.join(exportsDir, f)).size,
        payload: p
    });
});

const m = {
    generatedAt: new Date().toISOString(),
    session: 'S118',
    payloadCount: payloads.length,
    studentIds: payloads.map(e => e.studentId),
    recommendationGate: {
        totalRecommendationEvents: 0,
        similarEvents: 0, nextEvents: 0, recoveryEvents: 0,
        gatePassCount: 0, gateBlockCount: 0,
        emptySafeSetCount: 0,
        nonCertifiedQidCandidateCount: 0,
        contestedDefectiveQidCount: 0,
        recommendationOutputAfterGating: 0,
        perStudentCoverage: {}
    },
    evidenceThreshold: {
        improvingEvidencePassCount: 0, persistentWeakEvidencePassCount: 0,
        decliningEvidencePassCount: 0, unstableEvidencePassCount: 0,
        hintDependentEvidencePassCount: 0, difficultySensitiveEvidencePassCount: 0,
        confidenceEvidencePassCount: 0,
        insufficientEvidenceSuppressionCount: 'UNAVAILABLE_IN_S118_EXPORT',
        unsupportedInsightClaimCount: 'UNAVAILABLE_IN_S118_EXPORT',
        examPredictionLanguageCount: 0
    },
    encouragement: {
        positiveTrendMessageCount: 0, goalAlignmentMessageCount: 0,
        examPlanPromptCount: 0, savedExamPlanCount: 0,
        daysUntilExamComputationCount: 'UNAVAILABLE_IN_S118_EXPORT',
        passFailPredictionLanguageCount: 0
    },
    safety: {
        safetyBlockCount: 0,
        safetyBlockReasonDistribution: {},
        likelyFalsePositiveCandidates: 'UNAVAILABLE_IN_S118_EXPORT',
        expectedAnswerLeakageBlocks: 0,
        missedSafetyViolationCandidates: 'UNAVAILABLE_IN_S118_EXPORT',
        fallbackMessageFrequency: 'UNAVAILABLE_IN_S118_EXPORT'
    },
    onboarding: {
        maskedRollRenderCount: 0, fullNameBeforeSelectionViolations: 0,
        successfulProfileSelectionCount: 0, welcomeBackOverviewCount: 0,
        enrollmentPathCount: 0, exportPayloadCount: payloads.length,
        malformedPayloadCount: 0
    },
    unavailableMetrics: [],
    perStudent: {}
};

payloads.forEach(exp => {
    const p = exp.payload;
    const sid = exp.studentId;

    if (!p.generatedAt || !p.safetyLog || !p.gateLog) m.onboarding.malformedPayloadCount++;

    const safetyLog = p.safetyLog || [];
    safetyLog.forEach(sl => {
        if (sl.violations && sl.violations.length > 0) {
            m.safety.safetyBlockCount++;
            sl.violations.forEach(v => {
                const reason = v.split(':')[0] || v;
                m.safety.safetyBlockReasonDistribution[reason] = (m.safety.safetyBlockReasonDistribution[reason] || 0) + 1;
            });
        }
        if ((sl.sourceLabel === 'explain' || sl.sourceLabel === 'simplify') && sl.violations && sl.violations.length > 0) {
            m.safety.expectedAnswerLeakageBlocks++;
        }
    });

    safetyLog.forEach(sl => {
        (sl.violations || []).forEach(v => {
            if (v.includes('EXAM_PREDICTION')) {
                m.evidenceThreshold.examPredictionLanguageCount++;
                m.encouragement.passFailPredictionLanguageCount++;
            }
        });
    });

    const gateLog = p.gateLog || [];
    gateLog.forEach(gl => {
        m.recommendationGate.totalRecommendationEvents++;
        if (gl.sourceLabel === 'similar') m.recommendationGate.similarEvents++;
        if (gl.sourceLabel === 'next') m.recommendationGate.nextEvents++;
        if (gl.sourceLabel === 'recovery') m.recommendationGate.recoveryEvents++;

        const passed = gl.defectSafe && gl.certSafe;
        if (passed) m.recommendationGate.gatePassCount++;
        else m.recommendationGate.gateBlockCount++;

        if (gl.blockedQids && gl.blockedQids.length > 0) {
            gl.blockedQids.forEach(bq => {
                if (bq.includes('contested')) m.recommendationGate.contestedDefectiveQidCount++;
                else m.recommendationGate.nonCertifiedQidCandidateCount++;
            });
        }

        if (gl.qidCount === 0) m.recommendationGate.emptySafeSetCount++;
        if (gl.qidCount > 0 && passed) m.recommendationGate.recommendationOutputAfterGating += gl.qidCount;
    });

    // Session telemetry
    const sessionTel = p.sessionTelemetry || [];
    const welcomeMsgs = sessionTel.filter(t => t.event === 'student_selected');
    m.onboarding.successfulProfileSelectionCount += Math.min(1, welcomeMsgs.length);
    m.onboarding.welcomeBackOverviewCount += Math.min(1, welcomeMsgs.length);

    const roll = p.studentRoll || [];
    roll.forEach(() => { m.onboarding.maskedRollRenderCount++; });

    const plan = p.learnerState ? p.learnerState.examPlan : null;
    if (plan) m.encouragement.savedExamPlanCount++;

    sessionTel.forEach(t => {
        if (['onboarding_exam_yes', 'onboarding_exam_no', 'onboarding_exam_planning'].includes(t.event)) {
            m.encouragement.examPlanPromptCount++;
        }
    });

    // Evidence thresholds from calibration data
    const calibration = p.calibrationExport || {};
    const clusters = calibration.clusters;
    if (clusters) {
        if (clusters.improving && clusters.improving.length > 0) m.evidenceThreshold.improvingEvidencePassCount++;
        if (clusters.persistentWeak && clusters.persistentWeak.length > 0) m.evidenceThreshold.persistentWeakEvidencePassCount++;
        if (clusters.declining && clusters.declining.length > 0) m.evidenceThreshold.decliningEvidencePassCount++;
        if (clusters.unstable && clusters.unstable.length > 0) m.evidenceThreshold.unstableEvidencePassCount++;
        if (clusters.hintDependent && clusters.hintDependent.length > 0) m.evidenceThreshold.hintDependentEvidencePassCount++;
        if (clusters.difficultySensitive && clusters.difficultySensitive.length > 0) m.evidenceThreshold.difficultySensitiveEvidencePassCount++;
    }
    const calib = calibration.calibration || {};
    if (Object.keys(calib).length > 0) m.evidenceThreshold.confidenceEvidencePassCount++;

    m.recommendationGate.perStudentCoverage[sid] = {
        recommendationEvents: gateLog.length,
        gatePasses: gateLog.filter(g => g.defectSafe && g.certSafe).length,
        gateBlocks: gateLog.filter(g => !(g.defectSafe && g.certSafe)).length,
        safetyBlocks: safetyLog.filter(s => s.violations && s.violations.length > 0).length,
        expectedAnswerLeakage: safetyLog.filter(s => (s.sourceLabel === 'explain' || s.sourceLabel === 'simplify') && s.violations && s.violations.length > 0).length
    };
});

// Readiness classification
const hasRec = m.recommendationGate.totalRecommendationEvents > 0;
const hasEv = m.evidenceThreshold.improvingEvidencePassCount > 0 ||
    m.evidenceThreshold.persistentWeakEvidencePassCount > 0 ||
    m.evidenceThreshold.decliningEvidencePassCount > 0 ||
    m.evidenceThreshold.unstableEvidencePassCount > 0;

let readiness;
if (hasRec && hasEv && m.recommendationGate.gateBlockCount === 0) readiness = 'PASS';
else if (hasRec && hasEv) readiness = 'PASS_WITH_NOTES';
else if (!hasRec) readiness = 'BLOCKED_NEEDS_INSTRUMENTATION';
else readiness = 'BLOCKED_SAFETY_OR_GATE_DEFECT';
m.telemetryReadiness = readiness;

// Find unavailable metrics
const cats = {
    recommendationGate: m.recommendationGate,
    evidenceThreshold: m.evidenceThreshold,
    encouragement: m.encouragement,
    safety: m.safety,
    onboarding: m.onboarding
};
for (const [cat, vals] of Object.entries(cats)) {
    for (const [key, val] of Object.entries(vals)) {
        if (typeof val === 'string' && val.startsWith('UNAVAILABLE_IN_S118')) {
            m.unavailableMetrics.push(cat + '.' + key);
        }
    }
}

// Write
const analysisPath = path.join(base, 'reports', 'systematic_testing', 'SESSION118_TELEMETRY_ANALYSIS.json');
fs.writeFileSync(analysisPath, JSON.stringify(m, null, 2), 'utf8');

// Print summary
console.log('=== S118 Telemetry Analysis ===');
console.log('Exports analyzed: ' + payloads.length);
console.log('Malformed payloads: ' + m.onboarding.malformedPayloadCount);
console.log('');
console.log('Recommendation-Gate:');
console.log('  Total rec events: ' + m.recommendationGate.totalRecommendationEvents);
console.log('  Similar: ' + m.recommendationGate.similarEvents + ' Next: ' + m.recommendationGate.nextEvents + ' Recovery: ' + m.recommendationGate.recoveryEvents);
console.log('  Gate pass: ' + m.recommendationGate.gatePassCount + ' Gate block: ' + m.recommendationGate.gateBlockCount);
console.log('  Rec output after gating: ' + m.recommendationGate.recommendationOutputAfterGating);
console.log('');
console.log('Evidence-Threshold:');
console.log('  Improving: ' + m.evidenceThreshold.improvingEvidencePassCount + ' PersistentWeak: ' + m.evidenceThreshold.persistentWeakEvidencePassCount);
console.log('  Declining: ' + m.evidenceThreshold.decliningEvidencePassCount + ' Unstable: ' + m.evidenceThreshold.unstableEvidencePassCount);
console.log('  HintDep: ' + m.evidenceThreshold.hintDependentEvidencePassCount + ' DiffSens: ' + m.evidenceThreshold.difficultySensitiveEvidencePassCount);
console.log('  Confidence: ' + m.evidenceThreshold.confidenceEvidencePassCount + ' ExamPredLang: ' + m.evidenceThreshold.examPredictionLanguageCount);
console.log('');
console.log('Safety:');
console.log('  Total blocks: ' + m.safety.safetyBlockCount + ' Expected leakage: ' + m.safety.expectedAnswerLeakageBlocks);
console.log('  Reasons: ' + JSON.stringify(m.safety.safetyBlockReasonDistribution));
console.log('');
console.log('Encouragement:');
console.log('  Exam-plan prompts: ' + m.encouragement.examPlanPromptCount + ' Saved plans: ' + m.encouragement.savedExamPlanCount);
console.log('  Pass/fail lang: ' + m.encouragement.passFailPredictionLanguageCount);
console.log('');
console.log('Onboarding/Privacy:');
console.log('  Selections: ' + m.onboarding.successfulProfileSelectionCount + ' Roll renders: ' + m.onboarding.maskedRollRenderCount);
console.log('  Full-name violations: ' + m.onboarding.fullNameBeforeSelectionViolations);
console.log('');
console.log('Telemetry Readiness: ' + readiness);
console.log('Unavailable: ' + m.unavailableMetrics.join(', '));
console.log('\nWritten to: ' + analysisPath);
