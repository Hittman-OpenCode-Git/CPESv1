// ============================================================
// Student Exposure Index — Cross-session analytics for CMA Part 1
// Board B — Session 252
// Map what every student has seen, how they performed, what
// topics they missed, and what risk signals they exhibit.
// ============================================================

const fs = require('fs');
const path = require('path');

// ── CLI Argument Parsing ────────────────────────────────────
function parseArgs(argv) {
    let args = { student: null, exportPath: null, outputPath: null };
    for (let i = 2; i < argv.length; i++) {
        let a = argv[i];
        if (a.startsWith('--student=')) {
            args.student = a.slice('--student='.length);
        } else if (a.startsWith('--export=')) {
            args.exportPath = a.slice('--export='.length);
        } else if (a.startsWith('--output=')) {
            args.outputPath = a.slice('--output='.length);
        } else if (a === '--help' || a === '-h') {
            printHelp();
            process.exit(0);
        } else if (!a.startsWith('-')) {
        } else {
            console.error('ERROR: Unrecognized argument: ' + a);
            printHelp();
            process.exit(2);
        }
    }
    return args;
}

function printHelp() {
    console.log([
        'Student Exposure Index — Board B Session 252',
        '',
        'Usage:',
        '  node scripts/student_exposure_index.js [options]',
        '',
        'Options:',
        '  --student=<id>   Look up a specific learner by learnerId',
        '  --export=<path>  Path to exported cmaMayLearnerState JSON file',
        '  --output=<path>  Output path (default: scripts/output/student_exposure.json)',
        '  --help, -h       Show this help',
        '',
        'Without arguments, generates a summary of all students found in',
        '  scripts/output/student_roll.json and/or scripts/output/student_exports/',
        '',
        'Examples:',
        '  node scripts/student_exposure_index.js --student=learner-m5k8x7n2',
        '  node scripts/student_exposure_index.js --export=./my_export.json',
        '  node scripts/student_exposure_index.js',
        ''
    ].join('\n'));
}

// ── File I/O Helpers ────────────────────────────────────────
function loadJSON(filePath) {
    if (!fs.existsSync(filePath)) return null;
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (e) {
        return null;
    }
}

function saveJSON(filePath, data) {
    let dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Resource Path Resolution ────────────────────────────────
const REPO_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(REPO_ROOT, 'scripts', 'output');
const DEFAULT_OUTPUT = path.join(OUTPUT_DIR, 'student_exposure.json');

function outFile(filename) { return path.join(OUTPUT_DIR, filename); }

// ── Blueprint Constants ─────────────────────────────────────
const DOMAINS = {
    A: 'External Financial Reporting Decisions',
    B: 'Planning, Budgeting, and Forecasting',
    C: 'Performance Management',
    D: 'Cost Management',
    E: 'Internal Controls',
    F: 'Technology and Analytics'
};

const DIFFICULTY_LABELS = { 1: 'Easy', 2: 'Moderate-Easy', 3: 'Moderate', 4: 'Difficult', 5: 'Very Difficult' };
const COGNITIVE_LEVELS = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate'];
const DIFFICULTIES = ['Easy', 'Moderate-Easy', 'Moderate', 'Difficult', 'Very Difficult'];

// ── QID Parsing ─────────────────────────────────────────────
function parseQID(qid) {
    // Pack A: P1-{S}-{NNN}
    let m = qid.match(/^P1-([A-F])-(\d+)$/);
    if (m) return { pack: 'pack_a', section: m[1], num: parseInt(m[2], 10) };
    // Pack B: P1B-{S}-{NNN}
    m = qid.match(/^P1B-([A-F])-(\d+)$/);
    if (m) return { pack: 'pack_b', section: m[1], num: parseInt(m[2], 10) };
    // Pack C: P1-{S}C-{NNN}
    m = qid.match(/^P1-([A-F])C-(\d+)$/);
    if (m) return { pack: 'pack_c', section: m[1], num: parseInt(m[2], 10) };
    // Pack D: P1-{S}D-{NNN}
    m = qid.match(/^P1-([A-F])D-(\d+)$/);
    if (m) return { pack: 'pack_d', section: m[1], num: parseInt(m[2], 10) };
    // Pack E: P1E-{S}-{NNN}
    m = qid.match(/^P1E-([A-F])-(\d+)$/);
    if (m) return { pack: 'pack_e', section: m[1], num: parseInt(m[2], 10) };
    // Pack E R-series: P1-E-R{NN}
    m = qid.match(/^P1-E-R(\d+)$/);
    if (m) return { pack: 'pack_e', section: 'E', num: 500 + parseInt(m[1], 10) };
    return { pack: 'unknown', section: 'Unknown', num: 0 };
}

// ── Data Loading ────────────────────────────────────────────
function loadQuestionHistory() {
    return loadJSON(outFile('question_history.json'));
}

function loadChallengeRegistry() {
    return loadJSON(outFile('challenge_registry.json'));
}

function loadReadinessScoring() {
    return loadJSON(outFile('readiness_scoring.json'));
}

function loadStudentRoll() {
    return loadJSON(outFile('student_roll.json'));
}

// Build a lookup: QID → question history entry
function buildQidLookup(questionHistory) {
    if (!questionHistory || !questionHistory.questions) return {};
    return questionHistory.questions;
}

// Build a lookup: QID → readiness state
function buildReadinessLookup(readinessScoring) {
    let map = {};
    if (!readinessScoring) return map;
    let entries = readinessScoring.entries || readinessScoring.questions || readinessScoring.scoring || [];
    if (Array.isArray(entries)) {
        entries.forEach(e => { if (e.qid) map[e.qid] = e; });
    } else if (typeof entries === 'object') {
        Object.values(entries).forEach(e => { if (e && e.qid) map[e.qid] = e; });
    }
    return map;
}

// Build challenge lookup: studentId → [challenges]
function buildStudentChallengeMap(challengeRegistry) {
    let map = {};
    if (!challengeRegistry || !challengeRegistry.challenges) return map;
    challengeRegistry.challenges.forEach(ch => {
        let sid = ch.studentId || 'unknown';
        if (!map[sid]) map[sid] = [];
        map[sid].push(ch);
    });
    return map;
}

// ── Section 1 — Student Profile ─────────────────────────────
function buildStudentProfile(learnerState) {
    let sessions = learnerState.sessions || [];
    let sorted = [...sessions].sort((a, b) => {
        let da = a.startedAt || a.completedAt || a.date || '';
        let db = b.startedAt || b.completedAt || b.date || '';
        return da.localeCompare(db);
    });

    let sessionList = sorted.map(s => ({
        sessionId: s.sessionId || 'unknown',
        mode: s.mode || 'Practice',
        date: s.startedAt || s.completedAt || s.date || null,
        questionsAttempted: (s.attempts && s.attempts.length) || (s.mcqs && s.mcqs.length) || 0,
        accuracy: calcSessionAccuracy(s),
        scaledScore: s.scaledScore || null,
        durationMinutes: calcSessionDuration(s)
    }));

    let lastActivity = null;
    if (learnerState.lastUpdated) lastActivity = learnerState.lastUpdated;
    else if (sorted.length > 0) lastActivity = sorted[sorted.length - 1].completedAt || sorted[sorted.length - 1].startedAt || null;

    return {
        learnerId: learnerState.learnerId || 'unknown',
        userName: learnerState.userName || 'Unknown',
        firstVisit: learnerState.firstVisit || null,
        lastActivity: lastActivity,
        totalSessions: sessions.length,
        sessionList: sessionList,
        examPlan: learnerState.examPlan || null
    };
}

function calcSessionAccuracy(s) {
    if (s.accuracy != null) return typeof s.accuracy === 'number' ? s.accuracy : parseFloat(s.accuracy);
    if (s.mcqPct != null) return parseFloat(s.mcqPct);
    // Fallback: compute from attempts
    if (s.attempts && s.attempts.length > 0) {
        let correct = s.attempts.filter(a => a.correct === true).length;
        return Math.round((correct / s.attempts.length) * 1000) / 10;
    }
    // Fallback: compute from mcqs + answers
    if (s.mcqs && s.answers) {
        let total = 0, correct = 0;
        s.mcqs.forEach(mcq => {
            let qid = mcq.QuestionID;
            if (qid && s.answers[qid] !== undefined) {
                total++;
                if (s.answers[qid] === mcq.CorrectChoice) correct++;
            }
        });
        if (total > 0) return Math.round((correct / total) * 1000) / 10;
    }
    return null;
}

function calcSessionDuration(s) {
    if (s.duration != null) return Math.round(s.duration / 60);
    if (s.startedAt && s.completedAt) {
        return Math.round((new Date(s.completedAt) - new Date(s.startedAt)) / 60000);
    }
    return null;
}

// ── Section 2 — Question Exposure Matrix ────────────────────
function buildExposureMatrix(learnerState, qidLookup, readinessLookup) {
    let sessions = learnerState.sessions || [];
    let exposure = {}; // QID → aggregate

    sessions.forEach(s => {
        let attempts = s.attempts || [];
        // If no attempts[] array, reconstruct from mcqs + answers
        if (attempts.length === 0 && s.mcqs && s.answers) {
            s.mcqs.forEach(mcq => {
                let qid = mcq.QuestionID || mcq.ItemID;
                if (!qid || s.answers[qid] === undefined) return;
                let isCorrect = s.answers[qid] === mcq.CorrectChoice;
                attempts.push({
                    questionId: qid,
                    correct: isCorrect,
                    timestamp: s.startedAt || s.completedAt || s.date || new Date().toISOString(),
                    confidence: null,
                    hintsUsed: 0,
                    explanationRequested: false,
                    elapsedMs: null,
                    selectedChoice: s.answers[qid] || null
                });
            });
        }
        // Also check case study items
        if (s.cases && s.caseAnswers) {
            s.cases.forEach(c => {
                let items = c.Items || [];
                items.forEach((item, i) => {
                    let key = (c.CaseID || c.CaseId || 'CBQ') + '_' + i;
                    let qid = item.ItemID || item.QuestionID || (c.CaseID + '-Q' + (i + 1));
                    if (s.caseAnswers[key] !== undefined) {
                        let isCorrect = isCaseCorrect(item, s.caseAnswers[key]);
                        attempts.push({
                            questionId: qid,
                            correct: isCorrect,
                            timestamp: s.startedAt || s.completedAt || s.date || new Date().toISOString(),
                            confidence: null,
                            hintsUsed: 0,
                            explanationRequested: false,
                            elapsedMs: null,
                            selectedChoice: s.caseAnswers[key] || null
                        });
                    }
                });
            });
        }

        // Aggregate each attempt
        let sessionDate = s.startedAt || s.completedAt || s.date || '';
        attempts.forEach(a => {
            let qid = a.questionId;
            if (!qid || qid === 'unknown') return;
            if (!exposure[qid]) {
                let parsed = parseQID(qid);
                let hist = (qidLookup[qid]) || {};
                exposure[qid] = {
                    qid: qid,
                    section: parsed.section,
                    sectionName: DOMAINS[parsed.section] || 'Unknown',
                    topic: a.topic || hist.topic || 'Unclassified',
                    difficulty: a.difficulty || hist.difficulty || 'Moderate',
                    difficultyScore: a.difficultyScore || hist.difficultyScore || 3,
                    cognitiveLevel: a.cognitiveLevel || hist.cognitiveLevel || 'Unknown',
                    timesAttempted: 0,
                    timesCorrect: 0,
                    timesIncorrect: 0,
                    accuracy: 0,
                    firstAttemptDate: sessionDate,
                    lastAttemptDate: sessionDate,
                    confidenceScores: [],
                    hintUsage: 0,
                    explanationRequests: 0,
                    itemState: hist.currentState || 'Unknown',
                    isCertified: hist.currentState === 'Certified',
                    readinessState: (readinessLookup[qid] && readinessLookup[qid].readinessState) || null
                };
            }

            let e = exposure[qid];
            e.timesAttempted++;
            if (a.correct === true) e.timesCorrect++; else e.timesIncorrect++;
            e.accuracy = Math.round((e.timesCorrect / e.timesAttempted) * 1000) / 10;
            if (sessionDate && sessionDate > (e.lastAttemptDate || '')) e.lastAttemptDate = sessionDate;
            if (sessionDate && (!e.firstAttemptDate || sessionDate < e.firstAttemptDate)) e.firstAttemptDate = sessionDate;
            if (a.confidence != null) e.confidenceScores.push(a.confidence);
            e.hintUsage += (a.hintsUsed || 0);
            if (a.explanationRequested) e.explanationRequests++;
        });
    });

    let totalAttempts = 0, totalCorrect = 0;
    Object.values(exposure).forEach(e => { totalAttempts += e.timesAttempted; totalCorrect += e.timesCorrect; });

    return {
        totalUniqueQidsSeen: Object.keys(exposure).length,
        totalAttempts: totalAttempts,
        overallAccuracy: totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 1000) / 10 : 0,
        questions: exposure
    };
}

function isCaseCorrect(item, answer) {
    if (!item || answer === undefined) return false;
    let correct = item.Correct;
    if (item.Type === 'select' || item.Type === 'numeric' || item.Type === 'fill') {
        if (item.Type === 'numeric' && typeof answer === 'string') {
            return answer.trim() === String(correct).trim();
        }
        return answer === correct;
    }
    if (item.Type === 'multi' && Array.isArray(answer) && Array.isArray(correct)) {
        if (answer.length !== correct.length) return false;
        let sortedA = [...answer].sort(); let sortedC = [...correct].sort();
        return sortedA.every((v, i) => v === sortedC[i]);
    }
    return answer === correct;
}

// ── Section 3 — Topic Performance ───────────────────────────
function buildTopicPerformance(learnerState) {
    let tp = learnerState.topicPerformance || {};
    let topics = {};

    Object.entries(tp).forEach(([topicName, agg]) => {
        let total = agg.totalAttempts || 0;
        let correct = agg.correctCount || agg.correct || 0;
        let accuracy = total > 0 ? Math.round((correct / total) * 1000) / 10 : 0;
        let recentAttempts = agg.recentAttempts || agg.recent || [];
        let trend = computeTrend(recentAttempts);

        // Infer section from topic name or from the agg itself
        let section = agg.section || inferSectionFromTopic(topicName);
        let byDifficulty = agg.byDifficulty || {};

        topics[topicName] = {
            topic: topicName,
            section: section,
            sectionName: DOMAINS[section] || 'Unknown',
            totalAttempts: total,
            correctCount: correct,
            accuracy: accuracy,
            hintCount: agg.hintCount || agg.hintsUsed || 0,
            firstAttemptAt: agg.firstAttemptAt || null,
            lastAttemptAt: agg.lastAttemptAt || null,
            weakArea: total >= 3 && accuracy < 60,
            improvementTrend: trend.label,
            trendSlope: trend.slope,
            recentAccuracy: trend.recentAcc,
            byDifficulty: byDifficulty
        };
    });

    // Sort into weakest/strongest
    let withEnoughData = Object.values(topics).filter(t => t.totalAttempts >= 3);
    withEnoughData.sort((a, b) => a.accuracy - b.accuracy);
    let weakest = withEnoughData.slice(0, 5).map(t => t.topic);
    let strongest = [...withEnoughData].sort((a, b) => b.accuracy - a.accuracy).slice(0, 5).map(t => t.topic);

    return { topics, weakestTopics: weakest, strongestTopics: strongest };
}

function inferSectionFromTopic(topicName) {
    let t = topicName.toLowerCase();
    // Revenue, inventory, balance sheet, income, assets, liabilities, equity, cash flow, ratios → A
    if (/revenue|inventor|balance sheet|income statement|asset|liabilit|equit|cash flow|ratio|disclosure|gaap|recognition|measurement/.test(t)) return 'A';
    // Budget, forecast, planning, variance, sales → B
    if (/budget|forecast|planning|variance|master|strategic|production budget|sales forecast/.test(t)) return 'B';
    // Performance, balanced scorecard, ROI, KPI, responsibility → C
    if (/performance|balanced scorecard|roi|kpi|responsibilit|benchmark|transfer pricing/.test(t)) return 'C';
    // Cost, ABC, CVP, job order, process costing, overhead, allocation → D
    if (/cost|abc|activity.based|cvp|job order|process cost|overhead|allocat|breakeven|break.even|contribution margin|joint product|relevant cost/.test(t)) return 'D';
    // Internal control, COSO, risk, fraud, audit, ethics, segregation → E
    if (/control|coso|risk|fraud|audit|ethic|segregat|governance|monitoring/.test(t)) return 'E';
    // Technology, ERP, data, analytics, cybersecurity, BI, AI → F
    if (/technolog|erp|data|analytics|cyber|bi |artificial|automation|system|information technology/.test(t)) return 'F';
    return 'Unknown';
}

function computeTrend(recentAttempts) {
    if (!recentAttempts || recentAttempts.length < 2) {
        let acc = recentAttempts && recentAttempts.length > 0
            ? recentAttempts.filter(a => a === true || a.correct === true).length / recentAttempts.length * 100
            : null;
        return { label: 'insufficient_data', slope: 0, recentAcc: acc };
    }

    // Convert to numeric: 1 for correct, 0 for incorrect
    let points = recentAttempts.map((a, i) => ({
        x: i,
        y: (typeof a === 'boolean' ? a : (a.correct === true)) ? 100 : 0
    }));

    // Simple linear regression slope scaled
    let n = points.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    points.forEach(p => {
        sumX += p.x; sumY += p.y; sumXY += p.x * p.y; sumX2 += p.x * p.x;
    });
    let slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX) || 0;

    // Recent accuracy (last 5)
    let recent = points.slice(-5);
    let recentAcc = recent.length > 0
        ? recent.filter(p => p.y >= 50).length / recent.length * 100
        : null;

    let label;
    if (slope > 3) label = 'improving';
    else if (slope < -3) label = 'declining';
    else if (Math.abs(slope) <= 1 && recentAcc != null) label = 'stable';
    else label = 'volatile';

    return { label, slope, recentAcc };
}

// ── Section 4 — Challenge History ───────────────────────────
function buildChallengeHistory(learnerState, studentChallengeMap, qidLookup) {
    let challenges = studentChallengeMap[learnerState.learnerId] || [];
    let enriched = challenges.map(ch => {
        let qidInfo = qidLookup[ch.questionId] || {};
        return {
            challengeId: ch.challengeId,
            questionId: ch.questionId,
            type: ch.type,
            status: ch.status,
            reportedDate: ch.reportedDate || null,
            description: ch.studentDescription || '',
            priority: ch.priority || 'MEDIUM',
            resolution: ch.resolution || null,
            linkedDefects: ch.linkedDefects || [],
            qidTopic: qidInfo.topic || null,
            qidSection: qidInfo.section || null
        };
    });

    let byStatus = { open: 0, investigating: 0, resolved: 0, closed: 0, dismissed: 0 };
    let byType = { contentError: 0, answerDispute: 0, explanationIssue: 0, ambiguity: 0, technicalIssue: 0, other: 0 };
    challenges.forEach(ch => {
        let s = (ch.status || '').toLowerCase();
        if (s === 'open') byStatus.open++;
        else if (s === 'investigating') byStatus.investigating++;
        else if (s === 'resolved') byStatus.resolved++;
        else if (s === 'closed') byStatus.closed++;
        else if (s === 'dismissed') byStatus.dismissed++;
        let t = (ch.type || '').toLowerCase();
        if (t === 'content_error') byType.contentError++;
        else if (t === 'answer_dispute') byType.answerDispute++;
        else if (t === 'explanation_issue') byType.explanationIssue++;
        else if (t === 'ambiguity') byType.ambiguity++;
        else if (t === 'technical_issue') byType.technicalIssue++;
        else byType.other++;
    });

    return {
        totalChallengesFiled: challenges.length,
        challenges: enriched,
        byStatus: byStatus,
        byType: byType
    };
}

// ── Section 5 — Recommendation Impact ───────────────────────
function buildRecommendationImpact(learnerState) {
    let recLog = learnerState.recommendationLog || [];
    let outcomes = learnerState.recommendationOutcomes || [];

    let enrichedLog = recLog.map(r => ({
        timestamp: r.timestamp || null,
        sourceTopic: r.sourceTopic || null,
        sourceDomain: r.sourceDomain || null,
        reasonType: r.reasonType || 'unknown',
        qidCount: (r.recommendedQids || []).length,
        activeSessionId: r.activeSessionId || null
    }));

    let enrichedOutcomes = outcomes.map(r => {
        let beforeAcc = r.beforeAccuracy || (r.outcomeEvidence && r.outcomeEvidence.beforeAccuracy) || null;
        let afterAcc = r.afterAccuracy || (r.outcomeEvidence && r.outcomeEvidence.afterAccuracy) || null;
        let delta = null;
        if (beforeAcc != null && afterAcc != null) delta = Math.round((afterAcc - beforeAcc) * 10) / 10;
        let outcome = r.outcome || 'pending';

        let label;
        if (outcome === 'positive') label = 'IMPROVED';
        else if (outcome === 'negative') label = 'WORSENED';
        else if (outcome === 'contradictory') label = 'CONTRADICTORY';
        else if (outcome === 'insufficient') label = 'INSUFFICIENT_DATA';
        else if (outcome === 'neutral') label = 'NO_CHANGE';
        else label = 'PENDING';

        return {
            recId: r.recId || null,
            topic: r.topic || null,
            deliveredAt: r.deliveredAt || r.timestamp || null,
            outcome: outcome,
            beforeAccuracy: beforeAcc,
            afterAccuracy: afterAcc,
            accuracyDelta: delta,
            sessionsBefore: r.sessionsBefore || 0,
            sessionsAfter: r.sessionsAfter || 0,
            outcomeLabel: label
        };
    });

    let positiveCount = enrichedOutcomes.filter(o => o.outcome === 'positive').length;
    let neutralCount = enrichedOutcomes.filter(o => o.outcome === 'neutral').length;
    let negativeCount = enrichedOutcomes.filter(o => o.outcome === 'negative').length;
    let insufficientCount = enrichedOutcomes.filter(o => o.outcome === 'insufficient').length;
    let relevantCount = positiveCount + neutralCount + negativeCount;
    let positiveRate = relevantCount > 0 ? Math.round((positiveCount / relevantCount) * 1000) / 10 : 0;
    let avgDelta = enrichedOutcomes
        .filter(o => o.accuracyDelta != null)
        .reduce((s, o) => s + o.accuracyDelta, 0);
    let deltaCount = enrichedOutcomes.filter(o => o.accuracyDelta != null).length;
    avgDelta = deltaCount > 0 ? Math.round((avgDelta / deltaCount) * 10) / 10 : 0;

    return {
        totalRecommendationsDelivered: recLog.length,
        recommendationLog: enrichedLog,
        outcomes: enrichedOutcomes,
        impactSummary: {
            totalOutcomes: outcomes.length,
            positiveOutcomes: positiveCount,
            neutralOutcomes: neutralCount,
            negativeOutcomes: negativeCount,
            insufficientOutcomes: insufficientCount,
            positiveRate: positiveRate,
            avgAccuracyDelta: avgDelta
        }
    };
}

// ── Section 6 — Exposure Gaps ────────────────────────────────
function buildExposureGaps(exposureMatrix, questionHistory) {
    let allQuestions = questionHistory ? questionHistory.questions : {};
    let allQids = Object.keys(allQuestions);
    let seenQids = Object.keys(exposureMatrix.questions || {});
    let seenSet = new Set(seenQids);

    // By domain
    let domainAvailable = {};
    let domainSeen = {};
    Object.entries(DOMAINS).forEach(([d, name]) => {
        domainAvailable[d] = 0;
        domainSeen[d] = 0;
    });
    allQids.forEach(qid => {
        let parsed = parseQID(qid);
        if (parsed.section && DOMAINS[parsed.section]) {
            domainAvailable[parsed.section] = (domainAvailable[parsed.section] || 0) + 1;
            if (seenSet.has(qid)) domainSeen[parsed.section] = (domainSeen[parsed.section] || 0) + 1;
        }
    });
    let byDomain = {};
    Object.entries(DOMAINS).forEach(([d, name]) => {
        byDomain[d] = {
            domainName: name,
            totalAvailable: domainAvailable[d] || 0,
            seenByStudent: domainSeen[d] || 0,
            notSeenByStudent: (domainAvailable[d] || 0) - (domainSeen[d] || 0),
            coveragePct: domainAvailable[d] > 0
                ? Math.round((domainSeen[d] / domainAvailable[d]) * 1000) / 10
                : 0
        };
    });

    // By difficulty
    let diffAvailable = {};
    let diffSeen = {};
    Object.values(DIFFICULTY_LABELS).forEach(d => { diffAvailable[d] = 0; diffSeen[d] = 0; });
    allQids.forEach(qid => {
        let info = allQuestions[qid];
        let diff = (info && info.difficulty) || 'Moderate';
        diffAvailable[diff] = (diffAvailable[diff] || 0) + 1;
        if (seenSet.has(qid)) diffSeen[diff] = (diffSeen[diff] || 0) + 1;
    });
    let byDifficulty = {};
    Object.keys(diffAvailable).forEach(d => {
        byDifficulty[d] = { totalAvailable: diffAvailable[d] || 0, seenByStudent: diffSeen[d] || 0 };
    });

    // By cognitive level
    let clAvailable = {};
    let clSeen = {};
    COGNITIVE_LEVELS.forEach(cl => { clAvailable[cl] = 0; clSeen[cl] = 0; });
    allQids.forEach(qid => {
        let info = allQuestions[qid];
        let cl = (info && info.cognitiveLevel) || 'Unknown';
        clAvailable[cl] = (clAvailable[cl] || 0) + 1;
        if (seenSet.has(qid)) clSeen[cl] = (clSeen[cl] || 0) + 1;
    });
    let byCognitiveLevel = {};
    Object.keys(clAvailable).forEach(cl => {
        byCognitiveLevel[cl] = { totalAvailable: clAvailable[cl] || 0, seenByStudent: clSeen[cl] || 0 };
    });

    // Untouched topics
    let seenTopics = new Set();
    Object.values(exposureMatrix.questions || {}).forEach(e => {
        if (e.topic) seenTopics.add(e.topic.toLowerCase());
    });
    let untouchedTopics = [];
    allQids.forEach(qid => {
        let info = allQuestions[qid];
        if (info && info.topic && !seenTopics.has(info.topic.toLowerCase())) {
            if (!untouchedTopics.includes(info.topic)) untouchedTopics.push(info.topic);
        }
    });

    // Biggest gap summary
    let maxGap = '';
    let maxGapCount = 0;
    Object.entries(byDomain).forEach(([d, v]) => {
        if (v.notSeenByStudent > maxGapCount) {
            maxGapCount = v.notSeenByStudent;
            maxGap = v.domainName;
        }
    });

    return {
        byDomain: byDomain,
        byDifficulty: byDifficulty,
        byCognitiveLevel: byCognitiveLevel,
        untouchedTopics: untouchedTopics.slice(0, 50), // Cap at 50
        untouchedDomainSummary: maxGap
            ? 'Largest exposure gap: ' + maxGap + ' (' + maxGapCount + ' unseen items)'
            : 'No significant gaps detected'
    };
}

// ── Section 7 — Risk Signals ────────────────────────────────
function buildRiskSignals(learnerState, exposureMatrix, topicPerformance, challengeHistory) {
    let signals = [];
    let profile = buildStudentProfile(learnerState);
    let sessionList = profile.sessionList || [];
    let sessions = learnerState.sessions || [];

    // DECLINING_SCORES
    if (sessionList.length >= 3) {
        let last3 = sessionList.slice(-3);
        let accs = last3.map(s => s.accuracy).filter(a => a != null);
        if (accs.length >= 3 && accs[0] - accs[accs.length - 1] > 10) {
            signals.push({
                signalId: 'DECLINING_SCORES',
                signalType: 'DECLINING_SCORES',
                severity: 'HIGH',
                description: 'Last 3 sessions show decreasing accuracy: ' + accs.join(' → ') + '%',
                evidence: { sessionAccuracies: accs, firstAccuracy: accs[0], lastAccuracy: accs[accs.length - 1], drop: Math.round((accs[0] - accs[accs.length - 1]) * 10) / 10 },
                recommendedAction: 'Review recent incorrect answers with the student. Identify if a specific domain or topic is the source of decline.'
            });
        }
    }

    // REPEATED_WRONG_SAME_TOPIC
    let repeatedQids = [];
    let repeatedTopics = {};
    Object.entries(exposureMatrix.questions || {}).forEach(([qid, e]) => {
        if (e.timesIncorrect >= 3) repeatedQids.push(qid);
        if (!repeatedTopics[e.topic]) repeatedTopics[e.topic] = { correct: 0, total: 0 };
        repeatedTopics[e.topic].correct += e.timesCorrect;
        repeatedTopics[e.topic].total += e.timesAttempted;
    });
    let strugglingTopics = Object.entries(repeatedTopics)
        .filter(([_, v]) => v.total >= 5 && (v.correct / v.total) < 0.4)
        .map(([t]) => t);
    if (repeatedQids.length > 0 || strugglingTopics.length > 0) {
        signals.push({
            signalId: 'REPEATED_WRONG_SAME_TOPIC',
            signalType: 'REPEATED_WRONG_SAME_TOPIC',
            severity: 'HIGH',
            description: repeatedQids.length + ' QIDs answered incorrectly 3+ times; ' + strugglingTopics.length + ' topics below 40% accuracy.',
            evidence: { repeatedQids: repeatedQids.slice(0, 20), strugglingTopics: strugglingTopics.slice(0, 10) },
            recommendedAction: 'Focus remediation on the identified struggling topics. Consider targeted practice sessions.'
        });
    }

    // PLATEAUED_ACCURACY
    let plateauCandidates = sessionList.filter(s => s.accuracy != null);
    if (plateauCandidates.length >= 5) {
        let accs = plateauCandidates.map(s => s.accuracy);
        let range = Math.max(...accs) - Math.min(...accs);
        let avg = accs.reduce((a, b) => a + b, 0) / accs.length;
        if (range <= 5 && avg < 70) {
            signals.push({
                signalId: 'PLATEAUED_ACCURACY',
                signalType: 'PLATEAUED_ACCURACY',
                severity: 'MEDIUM',
                description: 'Accuracy has plateaued around ' + Math.round(avg) + '% over ' + accs.length + ' sessions (range: ' + Math.round(range) + 'pp).',
                evidence: { sessionCount: accs.length, accuracyRange: Math.round(range * 10) / 10, averageAccuracy: Math.round(avg * 10) / 10 },
                recommendedAction: 'Consider changing study strategy — introduce new difficulty levels or cross-domain practice.'
            });
        }
    }

    // LOW_DIFFICULTY_STRUGGLE
    let easyAttempts = 0, easyCorrect = 0;
    Object.values(exposureMatrix.questions || {}).forEach(e => {
        if (e.difficultyScore <= 2) { easyAttempts += e.timesAttempted; easyCorrect += e.timesCorrect; }
    });
    if (easyAttempts >= 5 && (easyCorrect / easyAttempts) < 0.7) {
        signals.push({
            signalId: 'LOW_DIFFICULTY_STRUGGLE',
            signalType: 'LOW_DIFFICULTY_STRUGGLE',
            severity: 'HIGH',
            description: 'Student misses ' + Math.round((1 - easyCorrect / easyAttempts) * 100) + '% of Easy/Moderate-Easy questions.',
            evidence: { easyAttempts: easyAttempts, easyCorrect: easyCorrect, easyAccuracy: Math.round((easyCorrect / easyAttempts) * 1000) / 10 },
            recommendedAction: 'Review foundational concepts before advancing to harder material.'
        });
    }

    // EXCESSIVE_HINT_USAGE
    let totalAttempts = 0, totalHints = 0;
    Object.values(exposureMatrix.questions || {}).forEach(e => { totalAttempts += e.timesAttempted; totalHints += e.hintUsage; });
    if (totalAttempts >= 10 && (totalHints / totalAttempts) > 0.5) {
        signals.push({
            signalId: 'EXCESSIVE_HINT_USAGE',
            signalType: 'EXCESSIVE_HINT_USAGE',
            severity: 'MEDIUM',
            description: 'Student uses hints on ' + Math.round((totalHints / totalAttempts) * 100) + '% of attempts.',
            evidence: { totalAttempts: totalAttempts, totalHints: totalHints, hintRate: Math.round((totalHints / totalAttempts) * 1000) / 10 },
            recommendedAction: 'Encourage student to attempt problems without hints first to build confidence.'
        });
    }

    // SESSION_ABANDONMENT
    let abandoned = sessions.filter(s => {
        let qCount = (s.attempts && s.attempts.length) || (s.mcqs && s.mcqs.length) || 0;
        let duration = calcSessionDuration(s);
        return (qCount < 5 || (duration != null && duration < 3));
    });
    if (abandoned.length >= 2) {
        signals.push({
            signalId: 'SESSION_ABANDONMENT',
            signalType: 'SESSION_ABANDONMENT',
            severity: 'LOW',
            description: abandoned.length + ' sessions with very few questions or very short duration.',
            evidence: { abandonedCount: abandoned.length, sessionIds: abandoned.map(s => s.sessionId).slice(0, 5) },
            recommendedAction: 'Check if student is experiencing technical issues or motivation problems.'
        });
    }

    // MISCONCEPTION_PERSISTENCE
    let misconceptions = learnerState.misconceptionPatterns || [];
    let persistent = misconceptions.filter(m => m.count >= 3);
    if (persistent.length > 0) {
        signals.push({
            signalId: 'MISCONCEPTION_PERSISTENCE',
            signalType: 'MISCONCEPTION_PERSISTENCE',
            severity: 'HIGH',
            description: persistent.length + ' misconception patterns have recurred 3+ times.',
            evidence: { persistentPatterns: persistent.map(p => ({ pattern: p.pattern, count: p.count, topics: p._topics })) },
            recommendedAction: 'Schedule a one-on-one session to address these specific misconceptions.'
        });
    }

    // SKIPPED_EXPLANATIONS
    let incorrectAttempts = 0, explanationRequests = 0;
    Object.values(exposureMatrix.questions || {}).forEach(e => { incorrectAttempts += e.timesIncorrect; explanationRequests += e.explanationRequests; });
    if (incorrectAttempts >= 10 && (explanationRequests / incorrectAttempts) < 0.25) {
        signals.push({
            signalId: 'SKIPPED_EXPLANATIONS',
            signalType: 'SKIPPED_EXPLANATIONS',
            severity: 'MEDIUM',
            description: 'Student reviews explanations for only ' + Math.round((explanationRequests / incorrectAttempts) * 100) + '% of incorrect answers.',
            evidence: { incorrectAttempts: incorrectAttempts, explanationRequests: explanationRequests, reviewRate: Math.round((explanationRequests / incorrectAttempts) * 1000) / 10 },
            recommendedAction: 'Encourage student to review all explanations — the educational feedback is a key learning tool.'
        });
    }

    // UNBALANCED_DOMAIN_EXPOSURE
    let domainCounts = {};
    Object.values(exposureMatrix.questions || {}).forEach(e => {
        domainCounts[e.section] = (domainCounts[e.section] || 0) + e.timesAttempted;
    });
    let totalDomainAttempts = Object.values(domainCounts).reduce((a, b) => a + b, 0);
    let maxDomain = '', maxDomainCount = 0;
    Object.entries(domainCounts).forEach(([d, c]) => { if (c > maxDomainCount) { maxDomainCount = c; maxDomain = d; } });
    let untouchedDomains = Object.keys(DOMAINS).filter(d => !domainCounts[d]);
    if (totalDomainAttempts > 15 && maxDomainCount / totalDomainAttempts > 0.6 && untouchedDomains.length >= 2) {
        signals.push({
            signalId: 'UNBALANCED_DOMAIN_EXPOSURE',
            signalType: 'UNBALANCED_DOMAIN_EXPOSURE',
            severity: 'LOW',
            description: 'Domain ' + (DOMAINS[maxDomain] || maxDomain) + ' accounts for ' + Math.round((maxDomainCount / totalDomainAttempts) * 100) + '% of attempts. ' + untouchedDomains.length + ' domains untouched.',
            evidence: { dominantDomain: maxDomain, dominantPct: Math.round((maxDomainCount / totalDomainAttempts) * 1000) / 10, untouchedDomains: untouchedDomains },
            recommendedAction: 'Encourage balanced practice across all six blueprint domains.'
        });
    }

    // HIGH_CONFIDENCE_WRONG_ANSWER
    let highConfWrong = 0;
    Object.values(exposureMatrix.questions || {}).forEach(e => {
        if (e.confidenceScores && e.confidenceScores.length > 0) {
            // We can't pair confidence per attempt without per-attempt detail, so approximate:
            // If there were incorrect attempts and high-confidence scores exist, flag proportionally
            let highConfCount = e.confidenceScores.filter(c => c >= 4).length;
            if (highConfCount > 0 && e.timesIncorrect > 0) {
                highConfWrong += Math.min(highConfCount, e.timesIncorrect);
            }
        }
    });
    if (highConfWrong >= 3) {
        signals.push({
            signalId: 'HIGH_CONFIDENCE_WRONG_ANSWER',
            signalType: 'HIGH_CONFIDENCE_WRONG_ANSWER',
            severity: 'MEDIUM',
            description: 'At least ' + highConfWrong + ' instances where student was confident (4-5) but answered incorrectly.',
            evidence: { highConfidenceWrongCount: highConfWrong },
            recommendedAction: 'Student may have overconfidence in certain topics. Use diagnostic tests to reveal gaps.'
        });
    }

    // RAPID_GUESSING
    let rapidGuesses = 0, rapidTotal = 0, rapidCorrect = 0;
    (learnerState.sessions || []).forEach(s => {
        (s.attempts || []).forEach(a => {
            if (a.elapsedMs && a.elapsedMs < 15000) {
                rapidTotal++;
                if (a.correct === true) rapidCorrect++;
                else rapidGuesses++;
            }
        });
    });
    if (rapidTotal >= 5 && (rapidCorrect / rapidTotal) < 0.4) {
        signals.push({
            signalId: 'RAPID_GUESSING',
            signalType: 'RAPID_GUESSING',
            severity: 'MEDIUM',
            description: rapidGuesses + ' rapid answers (<15s) are incorrect out of ' + rapidTotal + ' total rapid answers.',
            evidence: { rapidTotal: rapidTotal, rapidCorrect: rapidCorrect, rapidIncorrect: rapidGuesses },
            recommendedAction: 'Advise student to slow down and work through problems methodically.'
        });
    }

    // Conceptual gap cluster
    let conceptualByDomain = {};
    Object.values(exposureMatrix.questions || {}).forEach(e => {
        if (['Remember', 'Understand'].includes(e.cognitiveLevel)) {
            if (!conceptualByDomain[e.section]) conceptualByDomain[e.section] = { correct: 0, total: 0 };
            conceptualByDomain[e.section].correct += e.timesCorrect;
            conceptualByDomain[e.section].total += e.timesAttempted;
        }
    });
    Object.entries(conceptualByDomain).forEach(([section, v]) => {
        if (v.total >= 3 && (v.correct / v.total) < 0.4) {
            signals.push({
                signalId: 'CONCEPTUAL_GAP_CLUSTER_' + section,
                signalType: 'CONCEPTUAL_GAP_CLUSTER',
                severity: 'HIGH',
                description: 'Student struggles with conceptual questions in ' + (DOMAINS[section] || section) + ' (' + Math.round((v.correct / v.total) * 100) + '% accuracy).',
                evidence: { domain: section, domainName: DOMAINS[section], conceptualAccuracy: Math.round((v.correct / v.total) * 1000) / 10 },
                recommendedAction: 'Review key concepts and terminology for ' + DOMAINS[section] + '.'
            });
        }
    });

    // Session trend for Section 7
    let accuracyHist = sessionList.filter(s => s.accuracy != null).map(s => ({
        sessionDate: s.date, accuracy: s.accuracy
    }));
    let trendDirection = 'stable';
    if (accuracyHist.length >= 2) {
        let a1 = accuracyHist[0].accuracy, aN = accuracyHist[accuracyHist.length - 1].accuracy;
        let diff = aN - a1;
        if (diff > 5) trendDirection = 'improving';
        else if (diff < -5) trendDirection = 'declining';
        else {
            let values = accuracyHist.map(a => a.accuracy);
            let variance = values.reduce((s, v) => s + Math.pow(v - (values.reduce((a, b) => a + b, 0) / values.length), 2), 0) / values.length;
            if (variance > 100) trendDirection = 'volatile';
            else trendDirection = 'stable';
        }
    }

    // Overall risk level
    let criticalCount = signals.filter(s => s.severity === 'CRITICAL').length;
    let highCount = signals.filter(s => s.severity === 'HIGH').length;
    let mediumCount = signals.filter(s => s.severity === 'MEDIUM').length;
    let lowCount = signals.filter(s => s.severity === 'LOW').length;
    let overallRisk;
    if (criticalCount > 0 || highCount >= 3) overallRisk = 'CRITICAL';
    else if (highCount >= 2 || mediumCount >= 4) overallRisk = 'HIGH';
    else if (mediumCount >= 2 || highCount >= 1) overallRisk = 'MODERATE';
    else overallRisk = 'LOW';

    return {
        overallRiskLevel: overallRisk,
        signals: signals,
        signalCounts: { critical: criticalCount, high: highCount, medium: mediumCount, low: lowCount },
        sessionTrend: {
            trendDirection: trendDirection,
            recentAccuracySlope: accuracyHist.length >= 2 ? Math.round((accuracyHist[accuracyHist.length - 1].accuracy - accuracyHist[0].accuracy) / accuracyHist.length * 10) / 10 : 0,
            accuracyAtFirstSession: accuracyHist.length > 0 ? accuracyHist[0].accuracy : null,
            accuracyAtLastSession: accuracyHist.length > 0 ? accuracyHist[accuracyHist.length - 1].accuracy : null,
            sessionAccuracyHistory: accuracyHist
        },
        misconceptionPatterns: (learnerState.misconceptionPatterns || []).map(p => ({
            pattern: p.pattern,
            count: p.count,
            topics: p._topics || [],
            persistent: p.count >= 3
        }))
    };
}

// ── Full Student Report Builder ─────────────────────────────
function buildStudentReport(learnerState, questionHistory, challengeRegistry, readinessScoring) {
    let qidLookup = buildQidLookup(questionHistory);
    let readinessLookup = buildReadinessLookup(readinessScoring);
    let studentChallengeMap = buildStudentChallengeMap(challengeRegistry);

    let profile = buildStudentProfile(learnerState);
    let exposureMatrix = buildExposureMatrix(learnerState, qidLookup, readinessLookup);
    let topicPerf = buildTopicPerformance(learnerState);
    let challengeHist = buildChallengeHistory(learnerState, studentChallengeMap, qidLookup);
    let recImpact = buildRecommendationImpact(learnerState);
    let gaps = buildExposureGaps(exposureMatrix, questionHistory);
    let risks = buildRiskSignals(learnerState, exposureMatrix, topicPerf, challengeHist);

    return {
        '1_studentProfile': profile,
        '2_questionExposureMatrix': exposureMatrix,
        '3_topicPerformance': topicPerf,
        '4_challengeHistory': challengeHist,
        '5_recommendationImpact': recImpact,
        '6_exposureGaps': gaps,
        '7_riskSignals': risks
    };
}

// ── Summary Mode — All Students ─────────────────────────────
function generateSummaryReport(questionHistory, challengeRegistry, readinessScoring) {
    let studentRoll = loadStudentRoll();
    let allLearners = [];

    // Try student roll first
    if (studentRoll) {
        let students = studentRoll.students || studentRoll.roll || studentRoll || [];
        if (Array.isArray(students)) {
            students.forEach(s => {
                let ls = s.learnerState || s.state || s;
                if (ls && ls.learnerId) allLearners.push(ls);
            });
        } else if (typeof students === 'object') {
            Object.values(students).forEach(s => {
                if (s && s.learnerId) allLearners.push(s);
            });
        }
    }

    // Try student_exports directory
    let exportsDir = outFile('student_exports');
    if (fs.existsSync(exportsDir)) {
        let files = fs.readdirSync(exportsDir).filter(f => f.endsWith('.json'));
        files.forEach(f => {
            let data = loadJSON(path.join(exportsDir, f));
            if (data && data.learnerId && !allLearners.find(l => l.learnerId === data.learnerId)) {
                allLearners.push(data);
            }
        });
    }

    if (allLearners.length === 0) {
        console.log('No student data found. Provide --student or --export, or place files in scripts/output/student_exports/.');
        process.exit(4);
    }

    let reports = allLearners.map(ls => buildStudentReport(ls, questionHistory, challengeRegistry, readinessScoring));

    return {
        reportId: 'SE-' + Date.now(),
        generatedTimestamp: new Date().toISOString(),
        runMode: 'summary',
        totalStudentsAnalyzed: allLearners.length,
        students: reports
    };
}

// ── Single-Student Mode ─────────────────────────────────────
function generateSingleReport(learnerState, questionHistory, challengeRegistry, readinessScoring) {
    let report = buildStudentReport(learnerState, questionHistory, challengeRegistry, readinessScoring);
    return {
        reportId: 'SE-' + Date.now(),
        generatedTimestamp: new Date().toISOString(),
        runMode: 'single',
        totalStudentsAnalyzed: 1,
        students: [report]
    };
}

// ── Main ────────────────────────────────────────────────────
function main() {
    let args = parseArgs(process.argv);

    if (args.exportPath && args.student) {
        console.error('ERROR: Use --student or --export, not both.');
        process.exit(2);
    }

    // Load shared data sources
    console.log('Loading data sources...');
    let questionHistory = loadQuestionHistory();
    if (!questionHistory) {
        console.log('Warning: question_history.json not found. Exposure gaps will be incomplete.');
    }
    let challengeRegistry = loadChallengeRegistry();
    if (!challengeRegistry) {
        console.log('Warning: challenge_registry.json not found. Challenge history will be empty.');
    }
    let readinessScoring = loadReadinessScoring();
    if (!readinessScoring) {
        console.log('Warning: readiness_scoring.json not found. Readiness states will be omitted.');
    }

    let report;
    let outputPath = args.outputPath || DEFAULT_OUTPUT;

    if (args.exportPath) {
        // Export file mode
        if (!fs.existsSync(args.exportPath)) {
            console.error('ERROR: Export file not found: ' + args.exportPath);
            process.exit(3);
        }
        console.log('Loading export file: ' + args.exportPath);
        let learnerState = loadJSON(args.exportPath);
        if (!learnerState || !learnerState.learnerId) {
            console.error('ERROR: Export file does not appear to be a valid learner state (missing learnerId).');
            process.exit(1);
        }
        report = generateSingleReport(learnerState, questionHistory, challengeRegistry, readinessScoring);
        console.log('Analyzed learner: ' + learnerState.learnerId + ' (' + (learnerState.userName || 'Unknown') + ')');

    } else if (args.student) {
        // Student lookup mode
        let studentRoll = loadStudentRoll();
        let learnerState = null;

        if (studentRoll) {
            let students = studentRoll.students || studentRoll.roll || studentRoll || [];
            let found;
            if (Array.isArray(students)) {
                found = students.find(s => {
                    let id = s.learnerId || (s.learnerState && s.learnerState.learnerId);
                    return id === args.student;
                });
            } else if (typeof students === 'object') {
                found = Object.values(students).find(s => {
                    let id = s.learnerId || (s.learnerState && s.learnerState.learnerId);
                    return id === args.student;
                });
            }
            if (found) {
                learnerState = found.learnerState || found.state || found;
            }
        }

        // Also try student_exports directory
        if (!learnerState) {
            let exportsDir = outFile('student_exports');
            if (fs.existsSync(exportsDir)) {
                let files = fs.readdirSync(exportsDir).filter(f => f.endsWith('.json'));
                for (let f of files) {
                    let data = loadJSON(path.join(exportsDir, f));
                    if (data && data.learnerId === args.student) {
                        learnerState = data;
                        break;
                    }
                }
            }
        }

        if (!learnerState) {
            console.error('ERROR: Student not found: ' + args.student);
            process.exit(1);
        }

        report = generateSingleReport(learnerState, questionHistory, challengeRegistry, readinessScoring);
        console.log('Analyzed learner: ' + learnerState.learnerId + ' (' + (learnerState.userName || 'Unknown') + ')');

    } else {
        // Summary mode — all students
        report = generateSummaryReport(questionHistory, challengeRegistry, readinessScoring);
        console.log('Summary mode: analyzed ' + report.totalStudentsAnalyzed + ' students.');
    }

    // Write output
    saveJSON(outputPath, report);
    console.log('Report written to: ' + outputPath);

    // Print quick stats
    report.students.forEach((s, i) => {
        let p = s['1_studentProfile'];
        let e = s['2_questionExposureMatrix'];
        let r = s['7_riskSignals'];
        console.log('  Student ' + (i + 1) + ': ' + p.userName + ' | ' + p.totalSessions + ' sessions | ' +
            e.totalUniqueQidsSeen + ' QIDs seen | ' + e.overallAccuracy + '% acc | Risk: ' + r.overallRiskLevel);
    });
}

main();
