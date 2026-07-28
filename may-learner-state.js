// ============================================================
// May Learner State — Cross-session tracking and progress layer
// For May, the AI reviewer/tutor (alpha)
// ============================================================
const MayLearnerState = {
    STORAGE_KEY: 'cmaMayLearnerState',

    // ── Schema defaults ─────────────────────────────────
    _default() {
        return {
            learnerId: 'learner-' + Date.now().toString(36),
            userName: null,
            firstVisit: null,
            sessions: [],
            topicPerformance: {},
            subtopicPerformance: {},
            misconceptionPatterns: [],
            recommendationLog: [],
            // S129 — Recommendation outcome tracking for closed-loop learning
            recommendationOutcomes: [],
            sessionSummaries: [],
            lastUpdated: null,
            examPlan: null  // S117 — see setExamPlan/getExamPlan
        };
    },

    // ── User profile ─────────────────────────────────────
    getUserProfile() {
        let data = this.load();
        return {
            name: data.userName,
            firstVisit: data.firstVisit,
            sessionCount: data.sessions ? data.sessions.length : 0,
            learnerId: data.learnerId
        };
    },

    setUserName(name) {
        let data = this.load();
        data.userName = name;
        if (!data.firstVisit) data.firstVisit = new Date().toISOString();
        this.save(data);
        return data.userName;
    },

    isNewUser() {
        let data = this.load();
        return !data.userName || !data.firstVisit;
    },

    // ── S117 — Exam-plan persistence ──────────────────────
    getExamPlan() {
        let data = this.load();
        return data.examPlan || null;
    },

    setExamPlan(plan) {
        let data = this.load();
        data.examPlan = plan || null;
        this.save(data);
        return data.examPlan;
    },

    // ── Load / Save ─────────────────────────────────────
    load() {
        try {
            let raw = localStorage.getItem(this.STORAGE_KEY);
            if (raw) {
                let data = JSON.parse(raw);
                if (data.misconceptionPatterns) {
                    data.misconceptionPatterns.forEach(p => {
                        if (!p._topics) p._topics = [];
                        if (p.topics && Array.isArray(p.topics)) { p._topics = p.topics; delete p.topics; }
                    });
                }
                return data;
            }
        } catch (e) { /* corrupted */ }
        return this._default();
    },

    save(data) {
        try {
            data.lastUpdated = new Date().toISOString();
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            try {
                if (data.sessions && data.sessions.length > 20) {
                    data.sessions = data.sessions.slice(-20);
                    data.lastUpdated = new Date().toISOString();
                    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
                }
            } catch (e2) { /* silent fail */ }
        }
    },

    // ── Record a single question attempt ─────────────────
    recordAttempt(sessionId, question, answer, isCorrect, hintsUsed, explanationRequested, elapsedMs, confidence) {
        let data = this.load();
        let qid = question.QuestionID || question.ItemID || 'unknown';
        let section = question.Section || (question.SectionTags && question.SectionTags[0]) || 'Unknown';
        let topic = this._normalizeTopic(question.Topic || 'Unclassified');
        let subtopic = question.MicroTopic || question.Subtopic || null;
        let difficulty = question.Difficulty || 'Unknown';
        let difficultyScore = question.DifficultyScore || 3;
        let itemType = question.ItemType || question.Type || 'MCQ';
        let cognitiveLevel = question.CognitiveLevel || 'Unknown';
        let questionState = question.question_state || 'Unknown';

        let attempt = {
            questionId: qid, section, topic, subtopic, difficulty, difficultyScore,
            itemType, cognitiveLevel, questionState,
            correct: isCorrect, hintsUsed: hintsUsed || 0,
            explanationRequested: !!explanationRequested,
            elapsedMs: elapsedMs || 0, selectedChoice: answer || null,
            confidence: confidence || null, timestamp: new Date().toISOString()
        };

        let session = data.sessions.find(s => s.sessionId === sessionId);
        if (!session) {
            session = { sessionId, date: new Date().toISOString(), mode: 'unknown', totalQuestions: 0, correctCount: 0, attempts: [] };
            data.sessions.push(session);
            if (data.sessions.length > 50) data.sessions = data.sessions.slice(-50);
        }
        session.attempts.push(attempt);
        session.totalQuestions = session.attempts.length;
        session.correctCount = session.attempts.filter(a => a.correct).length;

        this._updateTopicAggregate(data.topicPerformance, topic, isCorrect, hintsUsed, difficulty, difficultyScore, section);
        if (subtopic) {
            this._updateTopicAggregate(data.subtopicPerformance, subtopic, isCorrect, hintsUsed, difficulty, difficultyScore, section);
        }
        if (!isCorrect && answer) this._trackMisconception(data, qid, topic, answer, question);
        this.save(data);

        // S109 — Auto-calibration snapshot on each attempt (throttled)
        if (this._liveCalibrationEnabled) {
            this._commitCalibrationSnapshot();
        }

        return data;
    },

    // Session 94 — Classify case miss pattern heuristically
    classifyCaseMissPattern(item) {
        let drivers = item.DifficultyDrivers || [];
        let cognitiveLevel = item.CognitiveLevel || '';
        let calcComplexity = item.CalculationComplexity || '';
        let isCalc = item.CalculationRequired || calcComplexity === 'Simple' || calcComplexity === 'Moderate';
        if (drivers.includes('ExhibitInterpretation') || item.ReadingComplexity === 'Long') return 'exhibitInterpretation';
        if (isCalc && (drivers.includes('MultiStepCalculation') || cognitiveLevel === 'Apply')) return 'calculationSetup';
        if (cognitiveLevel === 'Evaluate' || drivers.includes('JudgmentRequired')) return 'controlJudgment';
        if (drivers.includes('ReadingComplexity') || item.ReadingComplexity === 'Long') return 'evidenceLocation';
        if (['Understand', 'Remember'].includes(cognitiveLevel) && !isCalc) return 'answerElimination';
        return 'evidenceLocation';
    },

    // ── Record session summary at end of session ─────────
    recordSessionSummary(sessionId, summary) {
        let data = this.load();
        let session = data.sessions.find(s => s.sessionId === sessionId);
        if (session) {
            session.mode = summary.mode || session.mode;
            session.scaledScore = summary.scaledScore;
            session.mcqPct = summary.mcqPct;
            session.casePct = summary.casePct;
            session.grade = summary.grade;
            session.passed = summary.passed;
            session.topicSnapshot = summary.topicSnapshot || {};
            session.casePatterns = summary.casePatterns || {};
        }
        data.sessionSummaries.push({ sessionId, date: new Date().toISOString(), ...summary });
        if (data.sessionSummaries.length > 30) data.sessionSummaries = data.sessionSummaries.slice(-30);
        this.save(data);
        return data;
    },

    // ── Topic aggregate update ───────────────────────────
    _updateTopicAggregate(container, key, correct, hints, difficulty, diffScore, section) {
        if (!container[key]) {
            container[key] = { totalAttempts: 0, correctCount: 0, hintCount: 0, recentAttempts: [], firstSeen: new Date().toISOString(), lastSeen: new Date().toISOString(), sectionsSeen: [], difficultyDistribution: {}, difficultyWeights: { total: 0, sum: 0 } };
        }
        let agg = container[key];
        agg.totalAttempts++; if (correct) agg.correctCount++; agg.hintCount += hints;
        agg.lastSeen = new Date().toISOString();
        if (!agg.sectionsSeen.includes(section)) agg.sectionsSeen.push(section);
        agg.difficultyDistribution[difficulty] = (agg.difficultyDistribution[difficulty] || 0) + 1;
        agg.difficultyWeights.total++; agg.difficultyWeights.sum += diffScore;
        agg.recentAttempts.push({ correct, hints, difficulty, timestamp: new Date().toISOString() });
        if (agg.recentAttempts.length > 15) agg.recentAttempts = agg.recentAttempts.slice(-15);
    },

    // ── Misconception pattern tracking ───────────────────
    _trackMisconception(data, qid, topic, answer, question) {
        let patternKey = null;
        let choices = question.Choices;
        if (choices && typeof choices === 'object') {
            let wrongText = choices[answer];
            if (wrongText) {
                let t = topic.toLowerCase();
                if (t.includes('classification') || t.includes('current')) patternKey = 'misclassification';
                else if (t.includes('variance')) patternKey = 'variance_sign_confusion';
                else if (t.includes('budget') || t.includes('forecast')) patternKey = 'budget_component_error';
                else if (t.includes('cost') && t.includes('standard')) patternKey = 'cost_method_confusion';
                else if (t.includes('depreciation')) patternKey = 'depreciation_method_error';
                else if (t.includes('cash') && t.includes('flow')) patternKey = 'cash_flow_classification';
                else if (t.includes('ratio') || t.includes('analysis')) patternKey = 'ratio_misapplication';
                else if (t.includes('control') || t.includes('coso')) patternKey = 'control_framework_error';
                else patternKey = 'general_error';
            }
        }
        if (patternKey) {
            let existing = data.misconceptionPatterns.find(p => p.pattern === patternKey);
            if (existing) { existing.count++; if (!existing.questionIds.includes(qid)) existing.questionIds.push(qid); if (!existing._topics.includes(topic)) existing._topics.push(topic); existing.lastSeen = new Date().toISOString(); }
            else { data.misconceptionPatterns.push({ pattern: patternKey, count: 1, questionIds: [qid], _topics: [topic], firstSeen: new Date().toISOString(), lastSeen: new Date().toISOString() }); }
        }
    },

    // ── Normalize topic names ────────────────────────────
    _normalizeTopic(topic) {
        if (!topic) return 'Unclassified';
        return topic.replace(/^[A-F]\.\d{3}\s+/, '').trim() || topic;
    },

    // ── Get topic-level progress ─────────────────────────
    getTopicProgress() {
        let data = this.load(); let result = {};
        Object.entries(data.topicPerformance).forEach(([topic, agg]) => {
            let accuracy = agg.totalAttempts > 0 ? Math.round(agg.correctCount / agg.totalAttempts * 100) : null;
            let hintRate = agg.totalAttempts > 0 ? Math.round(agg.hintCount / agg.totalAttempts * 100) : 0;
            let avgDifficulty = agg.difficultyWeights.total > 0 ? (agg.difficultyWeights.sum / agg.difficultyWeights.total).toFixed(1) : null;
            let recent = agg.recentAttempts.slice(-5);
            let recentPct = recent.length > 0 ? Math.round(recent.filter(a => a.correct).length / recent.length * 100) : null;
            result[topic] = { totalAttempts: agg.totalAttempts, correctCount: agg.correctCount, accuracy, hintRate, avgDifficulty: avgDifficulty ? parseFloat(avgDifficulty) : null, recentPct, recentTotal: recent.length, firstSeen: agg.firstSeen, lastSeen: agg.lastSeen, sectionsSeen: agg.sectionsSeen, difficultyDistribution: agg.difficultyDistribution };
        });
        return result;
    },

    // ── Compute cross-session trends ─────────────────────
    getTrends() {
        let data = this.load(); let topics = this.getTopicProgress(); let trends = [];
        Object.entries(topics).forEach(([topic, tp]) => {
            if (tp.totalAttempts < 2) return;
            let delta = tp.recentPct !== null && tp.accuracy !== null ? tp.recentPct - tp.accuracy : null;
            let recentAttempts = (data.topicPerformance[topic] || {}).recentAttempts || [];
            let recentCorrects = recentAttempts.map(a => a.correct); let stability = null;
            if (recentCorrects.length >= 4) { let runs = 1; for (let i = 1; i < recentCorrects.length; i++) { if (recentCorrects[i] !== recentCorrects[i - 1]) runs++; } stability = Math.round((1 - (runs - 1) / (recentCorrects.length - 1)) * 100); }
            let recentHints = recentAttempts.slice(-5).reduce((s, a) => s + (a.hints || 0), 0);
            let olderHints = recentAttempts.length > 5 ? recentAttempts.slice(0, recentAttempts.length - 5).reduce((s, a) => s + (a.hints || 0), 0) : recentHints;
            let hintTrend = olderHints > 0 && recentHints < olderHints ? 'decreasing' : recentHints > olderHints ? 'increasing' : 'stable';
            let direction = 'stable';
            if (delta !== null && delta >= 15) direction = 'improving'; else if (delta !== null && delta <= -15) direction = 'declining'; else if (delta !== null && delta > 5) direction = 'slightly_improving'; else if (delta !== null && delta < -5) direction = 'slightly_declining';
            trends.push({ topic, accuracy: tp.accuracy, recentPct: tp.recentPct, delta, direction, stability, hintTrend, totalAttempts: tp.totalAttempts, avgDifficulty: tp.avgDifficulty });
        });
        return trends.sort((a, b) => (a.accuracy || 0) - (b.accuracy || 0));
    },

    // ── Get weakness clusters ────────────────────────────
    getWeaknessClusters() {
        let trends = this.getTrends(); let data = this.load();
        let clusters = { persistentWeak: [], improving: [], declining: [], unstable: [], hintDependent: [], difficultySensitive: [] };
        trends.forEach(t => {
            if (t.accuracy !== null && t.accuracy < 60 && t.totalAttempts >= 5) clusters.persistentWeak.push(t);
            if (t.delta !== null && t.delta >= 15) clusters.improving.push(t);
            if (t.delta !== null && t.delta <= -15) clusters.declining.push(t);
            if (t.stability !== null && t.stability < 50 && t.totalAttempts >= 4) clusters.unstable.push(t);
            if (t.accuracy !== null && t.accuracy >= 70 && t.hintTrend === 'increasing' && t.totalAttempts >= 4) clusters.hintDependent.push(t);
            let agg = data.topicPerformance[t.topic];
            if (agg && agg.difficultyDistribution) {
                let lowDiff = (agg.recentAttempts || []).filter(a => ['Easy', 'Moderate-Easy'].includes(a.difficulty));
                let highDiff = (agg.recentAttempts || []).filter(a => ['Difficult', 'Very Difficult'].includes(a.difficulty));
                let lowPct = lowDiff.length > 0 ? lowDiff.filter(a => a.correct).length / lowDiff.length : null;
                let highPct = highDiff.length > 0 ? highDiff.filter(a => a.correct).length / highDiff.length : null;
                if (lowPct !== null && highPct !== null && lowPct - highPct >= 0.3 && lowDiff.length >= 2 && highDiff.length >= 2) clusters.difficultySensitive.push({ ...t, lowPct: Math.round(lowPct * 100), highPct: Math.round(highPct * 100) });
            }
        });
        return clusters;
    },

    getRecentlySeen(sessionLimit) {
        sessionLimit = sessionLimit || 3; let data = this.load(); let seen = new Set();
        data.sessions.slice(-sessionLimit).forEach(s => { (s.attempts || []).forEach(a => seen.add(a.questionId)); });
        return [...seen];
    },

    getRecentlySeenByOutcome(sessionLimit) {
        sessionLimit = sessionLimit || 3; let data = this.load(); let correct = new Set(); let missed = new Set();
        data.sessions.slice(-sessionLimit).forEach(s => { (s.attempts || []).forEach(a => { if (a.correct) correct.add(a.questionId); else missed.add(a.questionId); }); });
        return { correct: [...correct], missed: [...missed], all: [...new Set([...correct, ...missed])] };
    },

    getQuestionExposureCount(qid) {
        let data = this.load(); let count = 0;
        data.sessions.forEach(s => { (s.attempts || []).forEach(a => { if (a.questionId === qid) count++; }); });
        return count;
    },

    getConfidenceCalibration() {
        let data = this.load(); let result = {};
        data.sessions.forEach(s => {
            (s.attempts || []).forEach(a => {
                if (a.confidence === null || a.confidence === undefined || a.confidence === 0) return;
                let topic = a.topic || 'Unclassified';
                if (!result[topic]) result[topic] = { total: 0, confSum: 0, correctCount: 0, overconfident: 0, underconfident: 0 };
                let r = result[topic]; r.total++; r.confSum += a.confidence; if (a.correct) r.correctCount++;
                if (a.confidence >= 4 && !a.correct) r.overconfident++; if (a.confidence <= 2 && a.correct) r.underconfident++;
            });
        });
        Object.keys(result).forEach(t => { let r = result[t]; r.avgConfidence = r.total > 0 ? +(r.confSum / r.total).toFixed(1) : null; r.accuracy = r.total > 0 ? Math.round(r.correctCount / r.total * 100) : null; r.calibrationDelta = (r.avgConfidence !== null && r.accuracy !== null) ? +(r.avgConfidence - (r.accuracy / 20)).toFixed(1) : null; r.overconfidentRate = r.total > 0 ? Math.round(r.overconfident / r.total * 100) : 0; r.underconfidentRate = r.total > 0 ? Math.round(r.underconfident / r.total * 100) : 0; });
        return result;
    },

    flagChallengedQID(qid, studentText) {
        let data = this.load(); if (!data.challengedQids) data.challengedQids = [];
        let existing = data.challengedQids.find(c => c.qid === qid);
        if (existing) { existing.count++; existing.status = 'contested'; existing.lastChallenged = new Date().toISOString(); if (studentText) existing.lastText = studentText.substring(0, 200); }
        else { data.challengedQids.push({ qid, firstChallenged: new Date().toISOString(), lastChallenged: new Date().toISOString(), count: 1, status: 'contested', lastText: (studentText || '').substring(0, 200) }); }
        if (data.challengedQids.length > 100) data.challengedQids = data.challengedQids.slice(-100);
        this.save(data); return data.challengedQids;
    },

    resolveChallenge(qid, resolution) {
        let data = this.load(); if (!data.challengedQids) return [];
        let existing = data.challengedQids.find(c => c.qid === qid);
        if (existing) { existing.status = resolution || 'resolved'; existing.resolvedAt = new Date().toISOString(); }
        this.save(data); return data.challengedQids;
    },

    getChallengedQids() { let data = this.load(); return data.challengedQids || []; },
    getExcludedQids() { let data = this.load(); let excluded = new Set(); (data.challengedQids || []).forEach(c => { if (c.status === 'contested') excluded.add(c.qid); }); return excluded; },
    isQuestionContested(qid) { return this.getExcludedQids().has(qid); },

    // ── Session 98 — Case-pattern aggregation ────────────
    getCasePatternSummary() {
        let data = this.load();
        if (!data.sessions || data.sessions.length === 0) return null;
        let totals = { evidenceLocation: 0, calculationSetup: 0, exhibitInterpretation: 0, controlJudgment: 0, answerElimination: 0 };
        let sessionsWithCases = 0;
        data.sessions.forEach(s => {
            if (s.casePatterns) {
                if (Object.values(s.casePatterns).some(v => v > 0)) sessionsWithCases++;
                for (let k in totals) { if (s.casePatterns[k]) totals[k] += s.casePatterns[k]; }
            }
        });
        let totalMisses = Object.values(totals).reduce((a, b) => a + b, 0);
        if (totalMisses < 3 || sessionsWithCases < 1) return null;
        let sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
        return { totalCaseMisses: totalMisses, sessionsWithCases, patterns: totals, dominantPattern: sorted[0][0], dominantCount: sorted[0][1], secondaryPattern: sorted[1] && sorted[1][1] > 0 ? sorted[1][0] : null, secondaryCount: sorted[1] ? sorted[1][1] : 0 };
    },

    getCasePatternTrends() {
        let data = this.load();
        if (!data.sessions || data.sessions.length < 2) return [];
        let sessions = data.sessions.filter(s => s.casePatterns && Object.values(s.casePatterns).some(v => v > 0));
        if (sessions.length < 2) return [];
        let patterns = ['evidenceLocation', 'calculationSetup', 'exhibitInterpretation', 'controlJudgment', 'answerElimination'];
        let recent = sessions.slice(-2).reduce((acc, s) => { for (let k in s.casePatterns) acc[k] = (acc[k] || 0) + s.casePatterns[k]; return acc; }, {});
        let prior = sessions.slice(-4, -2).reduce((acc, s) => { for (let k in s.casePatterns) acc[k] = (acc[k] || 0) + s.casePatterns[k]; return acc; }, {});
        let trends = [];
        patterns.forEach(p => {
            let cur = recent[p] || 0, prev = prior[p] || 0, delta = cur - prev;
            let direction = delta > 1 ? 'up' : (delta < -1 ? 'down' : 'flat');
            let signal = direction === 'down' ? 'improving' : (direction === 'up' ? 'worsening' : 'stable');
            if (cur > 0 || prev > 0) trends.push({ pattern: p, current: cur, previous: prev, delta, direction, signal });
        });
        return trends;
    },

    casePatternLabel(pattern) {
        let labels = { evidenceLocation: 'Evidence Location', calculationSetup: 'Calculation Setup', exhibitInterpretation: 'Exhibit Interpretation', controlJudgment: 'Control Judgment', answerElimination: 'Answer Elimination' };
        return labels[pattern] || pattern;
    },

    casePatternCoachingNote(pattern) {
        let notes = {
            evidenceLocation: 'Most misses come from not finding the right data in the case. Before answering, pause and identify which exhibit or paragraph contains the relevant numbers.',
            calculationSetup: 'Your calculation framing is the main hurdle. For multi-step problems, write out the formula before plugging in numbers. Double-check that you are using the correct values from the right exhibit.',
            exhibitInterpretation: 'Interpreting tables and schedules is a recurring challenge. Practice reading the row and column headers first, then locate the specific intersection you need.',
            controlJudgment: 'Control judgment misses suggest you know the framework but struggle to apply it to specific scenarios. Ask yourself: what could go wrong here, and which control would catch it?',
            answerElimination: 'Elimination misses mean the correct answer is getting lost among plausible distractors. Try comparing each choice directly against the case evidence rather than answering from general knowledge.'
        };
        return notes[pattern] || 'Review your case approach — focus on connecting the scenario evidence to the correct framework or calculation.';
    },

    // Session 99 — Pattern-to-practice guidance
    getCasePatternPracticeGuidance() {
        let summary = this.getCasePatternSummary();
        if (!summary) return null;

        let trends = this.getCasePatternTrends();
        let trendMap = {};
        trends.forEach(t => { trendMap[t.pattern] = t.signal; });

        let guidance = {
            evidenceLocation: {
                action: 'Do a short untimed case set where you identify the relevant exhibit or scenario paragraph before evaluating any options.',
                why: 'Evidence-location misses mean you are reaching for an answer before confirming where the data lives. Slowing down on the "find it" step builds the habit of checking first.'
            },
            calculationSetup: {
                action: 'Practice case calculation items with scratch paper — write the formula, label each input, and trace each number back to its source in the exhibits before computing.',
                why: 'Calculation-setup misses suggest you know the method but misalign inputs or skip steps. Writing the full setup before touching numbers reduces transcription errors.'
            },
            exhibitInterpretation: {
                action: 'Work through cases with tables and schedules. For each exhibit, read the headers first, then find the row/column intersection your item asks for — before looking at the answer choices.',
                why: 'Exhibit-interpretation misses happen when you skim tables instead of reading them systematically. Treat each exhibit like a mini-puzzle where the answer is already in the data.'
            },
            controlJudgment: {
                action: 'Review case scenarios that test control selection or risk assessment. For each, ask: what could go wrong here, which COSO component applies, and which control would catch it?',
                why: 'Control-judgment misses suggest you know the framework but need more practice mapping real scenarios to the right control response. The "what could go wrong here" prompt is a reliable bridge.'
            },
            answerElimination: {
                action: 'For case select/multi items, practice comparing each choice directly against the case evidence before selecting. Ask "what makes this choice wrong?" for every distractor.',
                why: 'Elimination misses mean plausible distractors are pulling you away from the evidence. Making the "why is this wrong" check explicit builds the comparison habit.'
            }
        };

        let result = { dominant: null, secondary: null, hasEnoughData: true };

        let domP = summary.dominantPattern;
        if (domP && guidance[domP]) {
            let domSig = trendMap[domP] || '';
            let prefix = domSig === 'worsening' ? 'This is getting worse. ' : '';
            result.dominant = {
                pattern: domP,
                label: this.casePatternLabel(domP),
                count: summary.dominantCount,
                action: prefix + guidance[domP].action,
                why: guidance[domP].why,
                trend: domSig
            };
        }

        let secP = summary.secondaryPattern;
        if (secP && guidance[secP] && summary.secondaryCount >= 2) {
            let secSig = trendMap[secP] || '';
            result.secondary = {
                pattern: secP,
                label: this.casePatternLabel(secP),
                count: summary.secondaryCount,
                action: guidance[secP].action,
                why: guidance[secP].why,
                trend: secSig
            };
        }

        return result;
    },

    // Session 100 — Adaptive practice mix optimization
    getAdaptivePracticeMix() {
        let data = this.load();
        let totalSessions = data.sessions ? data.sessions.length : 0;
        if (totalSessions < 1) return { mode: 'Insufficient Data', reason: 'Complete at least one practice session before optimization is available.', badge: 'NEED_DATA' };

        // Gather MCQ signals
        let trends = this.getTrends();
        let clusters = this.getWeaknessClusters();
        let totalMcqTopics = Object.keys(this.getTopicProgress()).length || 0;
        let weakCount = clusters.persistentWeak.length;
        let decliningCount = clusters.declining.length;
        let unstableCount = clusters.unstable.length;
        let lowMcqAccuracy = trends.filter(t => t.accuracy !== null && t.accuracy < 60 && t.totalAttempts >= 5).length;
        let mcqStable = weakCount === 0 && decliningCount === 0 && unstableCount === 0 && totalMcqTopics >= 3;
        let mcqDominantlyWeak = weakCount >= 3 || (weakCount >= 2 && decliningCount >= 1);

        // Gather case signals
        let caseSummary = this.getCasePatternSummary();
        let caseTrends = this.getCasePatternTrends();
        let hasCaseData = caseSummary !== null;
        let caseWorsening = caseTrends.filter(t => t.signal === 'worsening').length;
        let caseMixed = caseTrends.filter(t => t.signal === 'stable' || t.signal === 'worsening').length;
        let caseStable = hasCaseData && caseWorsening === 0 && caseMixed <= 1;

        // Gather session recency signals
        let lastMCQPct = null, lastCasePct = null;
        for (let i = data.sessions.length - 1; i >= 0; i--) {
            let s = data.sessions[i];
            if (lastMCQPct === null && s.mcqPct !== null && s.mcqPct !== undefined) lastMCQPct = s.mcqPct;
            if (lastCasePct === null && s.casePct !== null && s.casePct !== undefined) lastCasePct = s.casePct;
            if (lastMCQPct !== null && lastCasePct !== null) break;
        }
        let mcqCaseGap = (lastMCQPct !== null && lastCasePct !== null) ? Math.abs(lastMCQPct - lastCasePct) : null;

        // ── Decision logic ──

        // Not enough data at all
        if (totalSessions < 2 && (!hasCaseData || totalMcqTopics < 3)) {
            return { mode: 'Insufficient Data', reason: 'Not enough practice data yet. Complete a few more MCQ and case sessions for personalized recommendations.', badge: 'NEED_DATA' };
        }

        // MCQ concept weakness is dominant → MCQ reinforcement
        if (mcqDominantlyWeak && (hasCaseData ? caseStable : true)) {
            let weakestTopics = clusters.persistentWeak.slice(0, 2).map(t => t.topic).join(', ');
            return {
                mode: 'MCQ Reinforcement',
                reason: 'Your concept foundations need work — ' + weakCount + ' topic(s) are consistently below 60%' + (weakestTopics ? ' (' + weakestTopics + ')' : '') + '. Strengthen these with targeted MCQ practice before returning to cases.',
                howTo: 'Start a practice MCQ session on ' + (weakestTopics || 'your persistent-weak topics') + '. Do 10–15 questions untimed. After each miss, read the full explanation before advancing.' + (weakestTopics ? ' Goal: push ' + weakestTopics + ' above 60% in two sessions.' : ''),
                badge: 'MCQ_FIRST'
            };
        }

        // MCQ declining but was previously OK → MCQ recovery
        if (decliningCount >= 2 && !hasCaseData) {
            return {
                mode: 'MCQ Reinforcement',
                reason: decliningCount + ' topic(s) are declining. Recent MCQ accuracy may have dipped — focus on bringing those topics back to baseline before mixing modes.',
                howTo: 'Open your review queue and filter to your declining topics. For each miss, ask: was this a knowledge gap (I did not know the rule) or a process error (I knew it but misapplied it)? Flag the ones you want May to re-explain.',
                badge: 'MCQ_FIRST'
            };
        }

        // Case patterns worsening + MCQ stable → case reinforcement
        if (hasCaseData && caseWorsening >= 2 && mcqStable) {
            let domP = caseSummary.dominantPattern;
            let domLabel = this.casePatternLabel(domP).toLowerCase();
            return {
                mode: 'Case Reinforcement',
                reason: 'Your MCQ performance is stable but ' + caseWorsening + ' case miss pattern(s) are worsening — especially ' + domLabel + '. Prioritize case practice to close this gap.',
                howTo: 'Do an untimed case set focused on ' + domLabel + '. Identify exhibits before answering, and check every choice against the case evidence. Success check: when you can spot the relevant exhibit in under 30 seconds and name the governing framework before looking at choices, you are ready to mix modes again.',
                badge: 'CASE_FIRST'
            };
        }

        // MCQ/case gap is large → whichever is lower needs focus
        if (mcqCaseGap !== null && mcqCaseGap >= 20) {
            if (lastMCQPct < lastCasePct) {
                return {
                    mode: 'MCQ Reinforcement',
                    reason: 'Your case performance (' + lastCasePct + '%) is notably stronger than MCQ (' + lastMCQPct + '%). Close the gap with concept-focused MCQ practice first.',
                    howTo: 'Start an MCQ-only session on your lowest-scoring topic. Do 10–15 questions untimed. After each miss, read the full explanation — do not just note the correct letter. Goal: bring that topic above 60% in two sessions, then re-check your overall MCQ score.',
                    badge: 'MCQ_FIRST'
                };
            } else {
                return {
                    mode: 'Case Reinforcement',
                    reason: 'Your MCQ performance (' + lastMCQPct + '%) is notably stronger than case (' + lastCasePct + '%). Focus on case practice to bring case skills up.',
                    howTo: 'Work through untimed case sets. Focus on connecting scenario evidence to the correct framework before choosing an answer. Balance check: your MCQ and case scores should stay within 15 points of each other.',
                    badge: 'CASE_FIRST'
                };
            }
        }

        // Unstable → untimed recovery
        if (unstableCount >= 2) {
            return {
                mode: 'Untimed Recovery',
                reason: unstableCount + ' topic(s) show unstable performance — you get some right, some wrong on the same concepts. Slow down and consolidate before testing.',
                howTo: 'Work through missed items in the review queue without time pressure. For each one, write down: (1) what you thought the answer was, (2) why it was wrong, (3) what rule you should have applied. If you see the same reason repeating, ask May for a concept walkthrough. Stability check: aim for 4 of your last 5 on the same topic correct without hints.',
                badge: 'UNTIMED'
            };
        }

        // Both MCQ and case have active issues → mixed
        if (hasCaseData && caseMixed >= 1 && (weakCount + decliningCount >= 1)) {
            let weakestTopic = clusters.persistentWeak.length > 0 ? clusters.persistentWeak[0].topic : (clusters.declining.length > 0 ? clusters.declining[0].topic : '');
            let domLabel = caseSummary.dominantPattern ? this.casePatternLabel(caseSummary.dominantPattern).toLowerCase() : '';
            return {
                mode: 'Mixed Reinforcement',
                reason: 'Two issues need attention: your MCQ accuracy on ' + (weakestTopic || 'your weakest topics') + ' needs work, and your case misses are dominated by ' + (domLabel || 'interpretation errors') + '. These may be connected — weak concept recall often amplifies case mistakes. Alternate modes to attack both sides.',
                howTo: 'Alternate: one MCQ set targeting ' + (weakestTopic || 'a weak topic') + ', then one untimed case set. Compare: does the same concept feel different across formats?',
                badge: 'MIXED'
            };
        }

        // Good all-around but case data is available → mixed maintenance
        if (mcqStable && hasCaseData && caseStable) {
            return {
                mode: 'Mixed Reinforcement',
                reason: 'Your performance is solid across both MCQs and cases. Keep both modes sharp by alternating — concept reinforcement with MCQ, application with cases.',
                howTo: 'Pick a topic you have not practiced in 3+ sessions (check your progress panel). Do 10 timed MCQs, then find a case study in the same domain and work through it untimed. Balance check: keep your MCQ and case scores within 15 points of each other.',
                badge: 'MIXED'
            };
        }

        // Good MCQ, no case data → MCQ with case introduction
        if (mcqStable && !hasCaseData && totalSessions >= 3) {
            return {
                mode: 'Mixed Reinforcement',
                reason: 'Your MCQ performance is strong. It is time to add cases — cases test the same concepts in a more integrated format.',
                howTo: 'Start a mixed session: a few review MCQs in your strongest topic, then try your first case study in that same domain. Cases feel different — expect to be slower. The goal is exposure, not speed.',
                badge: 'MIXED'
            };
        }

        // Fallback
        return { mode: 'Mixed Reinforcement', reason: 'Your recent sessions do not show a clear weakness pattern — and that is a good sign. Your best move now is variety: alternate modes so neither skill gets stale.', howTo: 'Pick a topic you have not practiced recently. Do 10 timed MCQs, then find a case in the same domain and work through it untimed. Compare: does the same concept feel different across formats?', badge: 'MIXED' };
    },

    // Session 102 — Readiness summary
    // S103: increased min attempts for "Ready" (5→6), case-burden degradation, _provenance
    // S104: added min attempts for "Approaching" (4), modelVersion bumped to S104-1.0
    getReadinessSummary() {
        let data = this.load();
        let trends = this.getTrends();
        let topicProgress = this.getTopicProgress();
        let caseSummary = this.getCasePatternSummary();
        let caseTrends = this.getCasePatternTrends();
        let sessionCount = data.sessions ? data.sessions.length : 0;

        let trendMap = {};
        trends.forEach(t => { trendMap[t.topic] = t; });

        // ── Per-topic readiness ──
        let topicResults = [];
        Object.entries(topicProgress).forEach(([topic, tp]) => {
            let tr = trendMap[topic];
            let attempts = tp.totalAttempts;
            let accuracy = tp.accuracy;
            let recentPct = tp.recentPct;
            let direction = tr ? tr.direction : 'stable';
            let stability = tr ? tr.stability : null;

            if (attempts < 3) {
                topicResults.push({
                    topic, band: 'Not enough data',
                    rationale: 'Fewer than 3 attempts — not enough data for a readiness estimate.',
                    signals: ['low_attempt_count'],
                    attempts, accuracy, recentPct, direction, stability
                });
                return;
            }

            // S103 tuning: increased min attempts from 5→6 for "Ready" to require more evidence
            let band = 'Developing', signals = [];
            if (accuracy !== null && accuracy >= 80 && recentPct !== null && recentPct >= 80 &&
                stability !== null && stability >= 75 && direction !== 'declining' && attempts >= 6) {
                band = 'Ready for focused review';
                signals = ['high_accuracy', 'high_recent', 'high_stability', 'sufficient_attempts'];
            } else if (accuracy !== null && accuracy >= 75 && recentPct !== null && recentPct >= 70 &&
                       direction !== 'declining' && stability !== null && stability >= 60 && attempts >= 4) {
                band = 'Approaching review-ready';
                signals = ['good_accuracy', 'good_recent', 'not_declining'];
            } else if (accuracy !== null && accuracy >= 60 && direction !== 'declining' &&
                       (stability === null || stability >= 40)) {
                band = 'Developing';
                signals = ['moderate_accuracy'];
            } else if ((accuracy !== null && accuracy < 60) || direction === 'declining' ||
                       (stability !== null && stability < 50)) {
                band = 'Recovery needed';
                if (accuracy !== null && accuracy < 60) signals.push('low_accuracy');
                if (direction === 'declining') signals.push('declining_trend');
                if (stability !== null && stability < 50) signals.push('unstable');
            } else {
                signals = ['mixed_signals'];
            }

            let rationale = '';
            if (band === 'Ready for focused review') {
                rationale = 'Strong, consistent performance: ' + accuracy + '% accuracy, ' + stability + '% stability over ' + attempts + ' attempts.';
            } else if (band === 'Approaching review-ready') {
                rationale = 'Solid at ' + accuracy + '% accuracy with stable trajectory. Continue reinforcing to reach review-ready.';
            } else if (band === 'Recovery needed') {
                let reasons = [];
                if (accuracy !== null && accuracy < 60) reasons.push(accuracy + '% accuracy');
                if (direction === 'declining') reasons.push('declining trend');
                if (stability !== null && stability < 50) reasons.push('unstable (' + stability + '% stability)');
                rationale = 'Needs attention — ' + reasons.join(', ') + '.';
            } else {
                rationale = 'Moderate at ' + (accuracy !== null ? accuracy + '%' : '?') + ' accuracy. Building consistency will improve readiness.';
            }

            topicResults.push({
                topic, band, rationale, signals,
                attempts, accuracy, recentPct, direction, stability
            });
        });

        // ── Overall band ──
        let totalTopicsWithData = topicResults.filter(t => t.band !== 'Not enough data').length;
        let recoveryCount = topicResults.filter(t => t.band === 'Recovery needed').length;
        let readyCount = topicResults.filter(t => t.band === 'Ready for focused review').length;
        let approachingCount = topicResults.filter(t => t.band === 'Approaching review-ready').length;
        let allDataTopicsReady = totalTopicsWithData > 0 &&
            topicResults.filter(t => t.band !== 'Not enough data').every(t =>
                t.band === 'Ready for focused review' || t.band === 'Approaching review-ready');

        let overallBand = 'Developing', overallConfidence = 'moderate';
        let overallSignals = [], overallRationale = '';
        let decisiveFactors = [];

        if (sessionCount < 1) {
            overallBand = 'Not enough data'; overallConfidence = 'high';
            overallRationale = 'No practice sessions recorded yet.';
            overallSignals = ['no_sessions'];
            decisiveFactors = ['Zero sessions'];
        } else if (sessionCount < 3 && totalTopicsWithData < 3) {
            overallBand = 'Not enough data'; overallConfidence = 'moderate';
            overallRationale = 'Only ' + sessionCount + ' session(s) with limited topic coverage — need more data.';
            overallSignals = ['low_session_count', 'low_topic_coverage'];
            decisiveFactors = ['Sessions < 3', 'Topics with data < 3'];
        } else if (recoveryCount >= 3) {
            overallBand = 'Recovery needed'; overallConfidence = 'moderate';
            overallRationale = recoveryCount + ' topics are in recovery — focus on these before mixed review.';
            overallSignals = ['multiple_recovery_topics'];
            decisiveFactors = ['Recovery topics ≥ 3'];
        } else if (recoveryCount >= 1 && readyCount >= 1) {
            overallBand = 'Developing'; overallConfidence = 'moderate';
            overallRationale = 'Mixed signals — some areas ready but others need work.';
            overallSignals = ['mixed_readiness'];
            decisiveFactors = ['Recovery + Ready mix'];
        } else if (readyCount >= 2 && recoveryCount === 0) {
            overallBand = 'Approaching review-ready'; overallConfidence = 'moderate';
            overallRationale = readyCount + ' topics review-ready with no recovery areas — trajectory is positive.';
            overallSignals = ['multiple_ready', 'no_recovery'];
            decisiveFactors = ['≥2 Ready topics', 'Zero recovery'];
        } else if (allDataTopicsReady) {
            overallBand = 'Approaching review-ready'; overallConfidence = 'moderate';
            overallRationale = 'All topics with enough data are at or near review-ready.';
            overallSignals = ['uniform_readiness'];
            decisiveFactors = ['All data topics at/near ready'];
        } else if (readyCount >= 1) {
            overallBand = 'Approaching review-ready'; overallConfidence = 'low';
            overallRationale = readyCount + ' topic(s) review-ready but others still need work.';
            overallSignals = ['partial_readiness'];
            decisiveFactors = ['≥1 Ready topic (partial)'];
        } else if (approachingCount >= 1 && recoveryCount === 0) {
            overallBand = 'Developing'; overallConfidence = 'moderate';
            overallRationale = 'Some topics approaching review-ready — keep building consistency.';
            overallSignals = ['progressing'];
            decisiveFactors = ['Approaching topics present', 'No recovery'];
        }

        // ── S103: Case-burden degradation ──
        // If case readiness is "Recovery needed" or "Developing" with worsening trends,
        // and overall was "Approaching review-ready", degrade to "Developing".
        let caseBurdenDegraded = false;
        if (caseSummary && caseTrends.length > 0 && overallBand === 'Approaching review-ready') {
            let domP = caseSummary.dominantPattern;
            let domTrend = caseTrends.find(t => t.pattern === domP);
            if (domTrend && domTrend.signal === 'worsening' && caseSummary.totalCaseMisses >= 4) {
                overallBand = 'Developing';
                overallConfidence = 'moderate';
                overallRationale += ' However, case miss patterns on ' + this.casePatternLabel(domP) + ' are worsening — temporary degradation applied.';
                overallSignals.push('case_burden_degraded');
                decisiveFactors.push('Case pattern worsening (degraded)');
                caseBurdenDegraded = true;
            }
        }

        // ── Case readiness ──
        let caseReadiness;
        if (!caseSummary) {
            caseReadiness = {
                band: 'Not enough data',
                rationale: 'No case miss data yet — complete at least one case session.',
                signals: ['no_case_data'],
                dominantPattern: null, dominantTrend: null,
                totalCaseMisses: 0, sessionsWithCases: 0
            };
        } else {
            let domP = caseSummary.dominantPattern;
            let domTrend = null;
            if (caseTrends.length > 0) {
                let match = caseTrends.find(t => t.pattern === domP);
                if (match) domTrend = match.signal;
            }
            let totalMisses = caseSummary.totalCaseMisses;
            let sessionsWC = caseSummary.sessionsWithCases;

            let caseBand = 'Developing', caseSignals = [], caseRationale = '';

            if (domTrend === 'worsening' && totalMisses >= 3) {
                caseBand = 'Recovery needed';
                caseSignals = ['worsening_pattern', 'significant_misses'];
                caseRationale = 'Dominant pattern (' + this.casePatternLabel(domP) + ') worsening with ' + totalMisses + ' total misses.';
            } else if (domTrend === 'improving' || (totalMisses < 3 && sessionsWC >= 1)) {
                caseBand = 'Approaching review-ready';
                caseSignals = domTrend === 'improving' ? ['improving_pattern'] : ['low_miss_count'];
                caseRationale = domTrend === 'improving'
                    ? 'Dominant pattern (' + this.casePatternLabel(domP) + ') is improving.'
                    : 'Low miss count — case skills look solid.';
            } else if (domTrend === 'stable' && totalMisses >= 3) {
                caseBand = 'Developing';
                caseSignals = ['stable_pattern', 'moderate_misses'];
                caseRationale = 'Pattern (' + this.casePatternLabel(domP) + ') stable but present — continue practice.';
            } else {
                caseSignals = ['mixed_case_signals'];
                caseRationale = 'Case patterns present without clear direction.';
            }

            caseReadiness = {
                band: caseBand, rationale: caseRationale, signals: caseSignals,
                dominantPattern: domP, dominantTrend: domTrend,
                totalCaseMisses: totalMisses, sessionsWithCases: sessionsWC
            };
        }

        // ── Data sufficiency ──
        let hasEnoughData = overallBand !== 'Not enough data';
        let dataNote = hasEnoughData ? '' :
            (sessionCount < 1 ? 'No practice data yet. Complete at least one session to begin readiness tracking.' :
             'Not enough practice data yet for readiness estimates. Complete at least 3 sessions across different topics.');

        // ── S103 — Provenance field for validation & tuning ──
        let _provenance = {
            modelVersion: 'S111-1.0',
            computedAt: new Date().toISOString(),
            triggerSignals: overallSignals.slice(),
            decisiveFactors: decisiveFactors,
            thresholdsApplied: {
                minAttemptsReady: 6,
                minAttemptsApproaching: 4,
                minAttemptsTopic: 3,
                accuracyHigh: 80, accuracyGood: 75, accuracyLow: 60,
                stabilityHigh: 75, stabilityGood: 60, stabilityLow: 50,
                recentPctHigh: 80, recentPctGood: 70,
                caseBurdenDegrade: caseBurdenDegraded
            },
            dataContext: {
                sessionCount: sessionCount,
                topicsWithData: totalTopicsWithData,
                recoveryCount: recoveryCount,
                readyCount: readyCount,
                caseSessions: caseSummary ? caseSummary.sessionsWithCases : 0,
                caseMissesTotal: caseSummary ? caseSummary.totalCaseMisses : 0
            }
        };

        return {
            overall: { band: overallBand, rationale: overallRationale, signals: overallSignals, confidence: overallConfidence },
            topics: topicResults,
            caseReadiness,
            hasEnoughData,
            dataNote,
            _provenance
        };
    },

    // Session 103 — Section-level readiness aggregation
    // Rolls topic-level readiness into cautious section summaries.
    // Sections are A–F per CMA Part 1 blueprint; topic→section mapping
    // is inferred from the sectionsSeen field on each topic aggregate.
    getSectionReadinessSummary() {
        let readiness = this.getReadinessSummary();
        if (!readiness || !readiness.hasEnoughData) return null;

        let topicProgress = this.getTopicProgress();
        let sectionNames = {
            A: 'External Financial Reporting',
            B: 'Planning, Budgeting & Forecasting',
            C: 'Performance Management',
            D: 'Cost Management',
            E: 'Internal Controls',
            F: 'Technology & Analytics'
        };

        // Build a map of section → [{topic, ...readiness}]
        let sectionTopics = { A: [], B: [], C: [], D: [], E: [], F: [] };
        readiness.topics.forEach(tr => {
            let tp = topicProgress[tr.topic];
            if (!tp) return;
            (tp.sectionsSeen || []).forEach(sec => {
                if (sectionTopics[sec]) sectionTopics[sec].push(tr);
            });
        });

        // If a topic is seen in multiple sections, ensure it's in each of those sections
        // (the sectionsSeen array already handles this from _updateTopicAggregate)

        let sectionResults = {};
        let bandOrder = { 'Not enough data': 0, 'Recovery needed': 1, 'Developing': 2, 'Approaching review-ready': 3, 'Ready for focused review': 4 };

        Object.entries(sectionTopics).forEach(([sec, topics]) => {
            if (topics.length === 0) {
                sectionResults[sec] = {
                    section: sec,
                    label: sectionNames[sec] || sec,
                    band: 'Not enough data',
                    rationale: 'No topic data in this section yet.',
                    topicCount: 0,
                    worstTopic: null,
                    signals: ['no_section_data'],
                    confidence: 'high',
                    _topics: []
                };
                return;
            }

            let recoveryTopics = topics.filter(t => t.band === 'Recovery needed');
            let readyTopics = topics.filter(t => t.band === 'Ready for focused review');
            let approachingTopics = topics.filter(t => t.band === 'Approaching review-ready');
            let notEnoughTopics = topics.filter(t => t.band === 'Not enough data');
            let developingTopics = topics.filter(t => t.band === 'Developing');

            // Conservative roll-up rules:
            // - If any topic is "Recovery needed", section is at best "Developing"
            // - If all topics are "Ready" or "Approaching", section is "Approaching review-ready"
            // - If mixed (some ready, some developing), section is "Developing"
            // - If >50% topics are "Not enough data", section is "Not enough data"
            let sectionBand = 'Developing';
            let sectionRationale = '';
            let sectionSignals = [];
            let confidence = 'moderate';

            let worstTopic = null;

            if (notEnoughTopics.length > topics.length / 2) {
                sectionBand = 'Not enough data';
                sectionRationale = 'Most topics in this section have too little data for readiness estimates.';
                sectionSignals = ['sparse_section_data'];
                confidence = 'high';
            } else if (recoveryTopics.length >= 2) {
                sectionBand = 'Recovery needed';
                sectionRationale = recoveryTopics.length + ' topic(s) in recovery — focus here first.';
                sectionSignals = ['section_recovery_topics'];
                worstTopic = recoveryTopics[0].topic;
            } else if (recoveryTopics.length === 1) {
                sectionBand = 'Developing';
                sectionRationale = 'One topic (' + recoveryTopics[0].topic + ') needs recovery; rest are progressing.';
                sectionSignals = ['single_recovery_topic', 'section_mixed'];
                worstTopic = recoveryTopics[0].topic;
            } else if (readyTopics.length + approachingTopics.length === topics.length && readyTopics.length >= 1) {
                sectionBand = 'Approaching review-ready';
                sectionRationale = 'All ' + topics.length + ' topics with data are at or near review-ready.';
                sectionSignals = ['section_approaching_uniform'];
            } else if (readyTopics.length >= 1 && recoveryTopics.length === 0) {
                sectionBand = 'Developing';
                sectionRationale = readyTopics.length + ' topic(s) ready but others still building.';
                sectionSignals = ['section_partial_ready'];
            } else if (developingTopics.length >= 1) {
                sectionBand = 'Developing';
                sectionRationale = 'Topics in this section are building — keep practicing across all topics.';
                sectionSignals = ['section_developing'];
                // Find worst topic among non-ready
                let worst = topics.filter(t => t.band !== 'Ready for focused review' && t.band !== 'Not enough data')
                    .sort((a, b) => (a.accuracy || 0) - (b.accuracy || 0))[0];
                if (worst) worstTopic = worst.topic;
            }

            // Conservative override: if any topic is unstable and declining, limit max band
            let hasUnstableDeclining = topics.some(t => t.direction === 'declining' && t.stability !== null && t.stability < 50);
            if (hasUnstableDeclining && sectionBand === 'Approaching review-ready') {
                sectionBand = 'Developing';
                sectionRationale += ' (Degraded — an unstable declining topic is present.)';
                sectionSignals.push('degraded_unstable_topic');
                confidence = 'low';
            }

            // Special label for fragile mixed-signal sections
            if (sectionBand === 'Developing' && readyTopics.length >= 1 && recoveryTopics.length >= 1) {
                sectionRationale = 'Uneven — ' + readyTopics.length + ' strong topic(s) but ' + recoveryTopics.length + ' need attention.';
                sectionSignals = ['uneven_section', 'mixed_readiness'];
                confidence = 'low';
            }

            sectionResults[sec] = {
                section: sec,
                label: sectionNames[sec] || sec,
                band: sectionBand,
                rationale: sectionRationale,
                topicCount: topics.length,
                worstTopic: worstTopic,
                signals: sectionSignals,
                confidence: confidence,
                _topics: topics.map(t => ({ topic: t.topic, band: t.band, accuracy: t.accuracy, direction: t.direction }))
            };
        });

        return {
            sections: sectionResults,
            modelVersion: 'S111-1.0',
            computedAt: new Date().toISOString()
        };
    },

    // ── S105 — Calibration hooks & known limitations ─────────
    // Readiness thresholds are scenario-validated only (no real learner data yet).
    // When real learner-state data becomes available, the following hooks exist:
    //
    //   THRESHOLDS (tunable, conservative, reversible):
    //     - accuracyHigh  (80) / accuracyGood (75) / accuracyLow (60)
    //     - stabilityHigh (75) / stabilityGood (60) / stabilityLow (50)
    //     - recentPctHigh (80) / recentPctGood (70)
    //     - minAttemptsReady (6) / minAttemptsApproaching (4) / minAttemptsTopic (3)
    //     - caseBurdenDegrade: totalMisses >= 4 threshold
    //
    //   CALIBRATION APPROACH:
    //     1. Collect real learner-state dumps (MayLearnerState export)
    //     2. Run getReadinessSummary() on each and compare band distribution
    //     3. Identify thresholds that produce too many "Recovery" or too many "Ready"
    //     4. Adjust ONE threshold at a time, re-run all tests, validate scenario matrix
    //     5. Bump modelVersion and document in _provenance.thresholdsApplied
    //
    //   KNOWN LIMITATIONS:
    //   - <3 case sessions: getCasePatternTrends() can't reliably detect "improving"
    //     (prior window is empty with 2 sessions; manifests as false "worsening")
    //   - No real learner data: all thresholds are synthetic-scenario calibrated
    //   - Topic→section mapping via sectionsSeen may be incomplete for cross-section topics
    //
    //   DO NOT:
    //   - Tune thresholds to inflate readiness counts
    //   - Add global "exam ready" labels
    //   - Reduce caution without empirical evidence
    //   - Change case-burden degradation rules without multi-session validation

    // ── S109 — Live calibration auto-logging flag ──
    // When true, readiness snapshots are logged automatically during real sessions
    // at a throttled interval (no more than once per 5 min or per 20 attempts).
    // Default false — no auto-logging in production unless explicitly enabled.
    _liveCalibrationEnabled: false,
    _lastCalibrationSnapshot: 0,
    _attemptsSinceSnapshot: 0,
    _liveCalibrationSessions: [],
    _calibrationThrottleMs: 300000,  // 5 minutes between auto-snapshots
    _calibrationThrottleAttempts: 20, // or 20 attempts, whichever comes first

    // ── S107 — Calibration metrics logging (dry-run only, no threshold changes) ──
    // Stores per-readiness-invocation metrics for offline analysis.
    // The calibration harness (scripts/test_calibration.js) reads these
    // to produce band-distribution and threshold-boundary reports.
    // No thresholds are changed by these functions.

    _calibrationMetrics: [],

    // Record a full snapshot of readiness metrics for later calibration analysis.
    // Returns the metrics object so tests can inspect it directly.
    logReadinessMetrics() {
        let summary = this.getReadinessSummary();
        if (!summary) return null;
        let sectionSummary = this.getSectionReadinessSummary();
        let data = this.load();
        let allTopics = this.getTopicProgress();
        let trends = this.getTrends();
        let clusters = this.getWeaknessClusters();
        let calibration = this.getConfidenceCalibration();

        let metrics = {
            timestamp: new Date().toISOString(),
            overall: summary.overall,
            caseReadiness: summary.caseReadiness,
            provenance: summary._provenance,
            sectionReadiness: sectionSummary ? sectionSummary.sections : null,
            topicCount: Object.keys(allTopics).length,
            topicsWithData: summary.topics.filter(t => t.band !== 'Not enough data').length,
            bandDistribution: {
                ready: summary.topics.filter(t => t.band === 'Ready for focused review').length,
                approaching: summary.topics.filter(t => t.band === 'Approaching review-ready').length,
                developing: summary.topics.filter(t => t.band === 'Developing').length,
                recovery: summary.topics.filter(t => t.band === 'Recovery needed').length,
                noData: summary.topics.filter(t => t.band === 'Not enough data').length
            },
            thresholdBoundaries: this._countThresholdBoundaries(summary),
            dataContext: {
                sessionCount: (data.sessions || []).length,
                totalAttempts: (data.sessions || []).reduce((s, sess) => s + (sess.attempts || []).length, 0),
                caseSessions: (data.sessions || []).filter(s => s.casePatterns && Object.values(s.casePatterns).some(v => v > 0)).length,
                clusterCounts: {
                    persistentWeak: clusters.persistentWeak.length,
                    improving: clusters.improving.length,
                    declining: clusters.declining.length,
                    unstable: clusters.unstable.length,
                    hintDependent: clusters.hintDependent.length,
                    difficultySensitive: clusters.difficultySensitive.length
                }
            }
        };
        this._calibrationMetrics.push(metrics);
        if (this._calibrationMetrics.length > 100) this._calibrationMetrics = this._calibrationMetrics.slice(-100);
        return metrics;
    },

    // Count how many topics lie near each threshold boundary (±5% or ±1 attempt).
    // Helps identify thresholds that are too tight or too loose.
    _countThresholdBoundaries(summary) {
        let thresh = summary._provenance.thresholdsApplied;
        let boundaries = {
            accuracyHigh_near: 0,
            accuracyGood_near: 0,
            accuracyLow_near: 0,
            stabilityHigh_near: 0,
            stabilityGood_near: 0,
            stabilityLow_near: 0,
            recentPctHigh_near: 0,
            recentPctGood_near: 0,
            minAttemptsReady_near: 0,
            minAttemptsApproaching_near: 0
        };
        summary.topics.forEach(t => {
            if (t.accuracy !== null) {
                if (Math.abs(t.accuracy - thresh.accuracyHigh) <= 5) boundaries.accuracyHigh_near++;
                if (Math.abs(t.accuracy - thresh.accuracyGood) <= 5) boundaries.accuracyGood_near++;
                if (Math.abs(t.accuracy - thresh.accuracyLow) <= 5) boundaries.accuracyLow_near++;
            }
            if (t.stability !== null) {
                if (Math.abs(t.stability - thresh.stabilityHigh) <= 5) boundaries.stabilityHigh_near++;
                if (Math.abs(t.stability - thresh.stabilityGood) <= 5) boundaries.stabilityGood_near++;
                if (Math.abs(t.stability - thresh.stabilityLow) <= 5) boundaries.stabilityLow_near++;
            }
            if (t.recentPct !== null) {
                if (Math.abs(t.recentPct - thresh.recentPctHigh) <= 5) boundaries.recentPctHigh_near++;
                if (Math.abs(t.recentPct - thresh.recentPctGood) <= 5) boundaries.recentPctGood_near++;
            }
            if (t.attempts === thresh.minAttemptsReady - 1 || t.attempts === thresh.minAttemptsReady) boundaries.minAttemptsReady_near++;
            if (t.attempts === thresh.minAttemptsApproaching - 1 || t.attempts === thresh.minAttemptsApproaching) boundaries.minAttemptsApproaching_near++;
        });
        return boundaries;
    },

    // Return the accumulated calibration metrics log (for test/harness consumption).
    getCalibrationMetrics() {
        return this._calibrationMetrics.slice();
    },

    // Clear calibration metrics log (for test reset).
    clearCalibrationMetrics() {
        this._calibrationMetrics = [];
    },

    // Return the current threshold snapshot in a format the test harness
    // can compare against expected values to detect drift.
    // ════════════════════════════════════════════════════════
    // S133 — MayThresholdRegistry — Single source of truth
    // for every classification threshold in the coaching platform.
    // All coaching subsystems reference these values — no hardcoded
    // numeric literals in classification gates.
    // ════════════════════════════════════════════════════════

    getThresholdRegistry() {
        return {
            meta: {
                version: 'S133-1.0',
                modelVersion: 'S111-1.0',
                totalThresholds: 0, // computed below
                governance: 'Single-source. Changes require calibrated session with explicit authorization.'
            },
            // ── Accuracy tiers ────────────────────────────
            accuracy: {
                strong: 85,    // >=85% → strong topic proficiency, strength observation
                solid: 80,     // >=80% → solid greeting, mini-panel anchoring
                good: 75,      // >=75% → approaching review-ready, readiness band
                weak: 60,      // <60% → weak topic, needs attention, recovery needed
                recovery: 50,  // <50% → contradictory outcome threshold
            },
            // ── Attempt-count floors ─────────────────────
            attempts: {
                observationMin: 3,   // minimum before ANY accuracy observation
                strength: 3,         // minimum to declare a topic strong
                weakness: 5,         // minimum to declare persistent weakness
                trend: 4,            // minimum to detect improvement/declining trend
                note: 2,             // minimum to append topic-progress note
                evidenceStrong: 5,   // evidence strength = 3 when >=5
                evidenceMedium: 3,   // evidence strength = 2 when >=3
                evidenceWeak: 1,     // evidence strength = 1 when >=1
                ready: 6,            // minimum for Ready band
                approaching: 4,      // minimum for Approaching band
                topicFloor: 3,       // floor for any per-topic readiness estimate
                calculation: 3,      // minimum calc misses before observation
                misconceptionMin: 2, // minimum occurrences for misconception pattern
            },
            // ── Session-count thresholds ─────────────────
            sessions: {
                evidenceMin: 2,       // minimum for evidence-backed overview/recap
                digestMin: 2,         // minimum for weekly digest
                strategyMin: 1,       // minimum for study strategy
                trendMin: 2,          // minimum for cross-session comparison
                lookbackSessions: 7,  // count-based 'week' window
                overviewMin: 2,       // minimum for welcome overview evidence
                behaviorMin: 2,       // minimum for behavior trend classification
                patternMin: 3,        // minimum for difficulty amplification pattern
            },
            // ── Trend delta thresholds ───────────────────
            delta: {
                improving: 10,          // >=10 → coaching 'improving' observation
                slightlyImproving: 5,   // >=5 → slightly improving
                declining: -10,         // <=-10 → coaching 'declining' observation
                slightlyDeclining: -5,  // <=-5 → slightly declining
                outcome: 5,             // >=5 delta → positive outcome classification
                strictImproving: 15,    // >=15 → qualified claim (evidence gate)
                strictDeclining: -15,   // <=-15 → qualified declining claim
            },
            // ── Stability thresholds ─────────────────────
            stability: {
                high: 75,   // >=75 → stable/high stability
                good: 60,   // >=60 → good stability
                low: 50,    // <50 → unstable flag
            },
            // ── Evidence aging windows (days) ────────────
            aging: {
                ewmaHalfLife: 14,   // EWMA half-life in days
                recent: 7,          // <=7 days → recent window
                active: 14,         // <=14 days → active window
                historical: 28,     // <=28 days → historical window
                // >28 days → archived
                freshObservationDefault: 28,  // default max age for fresh observations
            },
            // ── Priority assignment ──────────────────────
            priority: {
                high: 60,    // <60% accuracy → high priority
                medium: 75,  // <75% accuracy → medium priority
                // >=75% → low/normal priority
            },
            // ── Misconception detection ──────────────────
            misconception: {
                minCount: 2,           // minimum count for pattern to appear
                weeklyNotable: 3,      // count for weekly digest mention
                strategyNotable: 3,    // count for study strategy mention
                topicsCrossMin: 2,     // minimum topics for cross-topic pattern
            },
            // ── Hint-dependency detection ────────────────
            hint: {
                dependencyAccuracyFloor: 70,  // accuracy must be >=70 for hint-dependent check
                dependencyAttempts: 4,        // minimum attempts for hint-dependent check
            },
            // ── Difficulty sensitivity ───────────────────
            difficulty: {
                sensitivityGap: 0.3,    // lowPct - highPct >= 0.3 → difficulty sensitive
                sensitivityEasyMin: 2,  // minimum easy items for sensitivity check
                sensitivityHardMin: 2,  // minimum hard items for sensitivity check
            },
            // ── Outcome classification ───────────────────
            outcome: {
                positiveAccuracy: 60,     // minimum accuracy for positive outcome
                contradictoryAccuracy: 50, // accuracy < 50 with declining → contradictory
                classificationAttempts: 5, // minimum attempts for outcome classification
                recurrenceSupersede: 3,    // repeat recommendations → deprioritize
            },
            // ── Recommendation quality scoring ────────────
            recommendation: {
                maxPerTopic: 3,          // max focus-area suggestions per response
                maxPatterns: 3,          // max patterns in observation output
                maxTopicsWeekly: 3,      // max strong topics in digest
                maxWeakTopicsWeekly: 3,  // max weak topics in digest
                maxWeakTopicsStrategy: 2, // max weak topics in strategy priorities
            },
            // ── Storage caps ──────────────────────────────
            storage: {
                sessionMax: 50,
                sessionEmergency: 20,
                recommendationOutcomesMax: 200,
                recommendationLogMax: 200,
                sessionSummariesMax: 30,
                recentAttemptsPerTopic: 15,
                recentWindowSize: 5,     // how many recent attempts for recentPct
                chatHistoryMax: 40,
                challengedQidsMax: 100,
                misconceptionRecentHistory: 10,
            },
        };
    },

    // Unified threshold snapshot — returns the complete registry
    // as a flat snapshot for calibration, testing, and consumer use.
    // Preserves backward compatibility with legacy flat-field accessors.
    getThresholdSnapshot() {
        let registry = this.getThresholdRegistry();
        let summary = this.getReadinessSummary();
        let base = {
            // Legacy flat fields — backward compatible with Stage C tests
            // Uses readiness-layer values (80/75), not coaching-layer (85/60)
            accuracyHigh: 80,
            accuracyGood: 75,
            accuracyLow: 60,
            stabilityHigh: 75,
            stabilityGood: 60,
            stabilityLow: 40,
            recentPctHigh: 80,
            recentPctGood: 75,
            minAttemptsReady: 6,
            minAttemptsApproaching: 4,
            minAttemptsTopic: 3,
            caseBurdenDegradeMisses: 4,
            modelVersion: 'S111-1.0',
        };
        // Override with readiness data if available
        if (summary && summary._provenance && summary._provenance.thresholdsApplied) {
            let ta = summary._provenance.thresholdsApplied;
            base.accuracyHigh = ta.accuracyHigh;
            base.accuracyGood = ta.accuracyGood;
            base.accuracyLow = ta.accuracyLow;
            base.stabilityHigh = ta.stabilityHigh;
            base.stabilityGood = ta.stabilityGood;
            base.stabilityLow = ta.stabilityLow;
            base.recentPctHigh = ta.recentPctHigh;
            base.recentPctGood = ta.recentPctGood;
            base.minAttemptsReady = ta.minAttemptsReady;
            base.minAttemptsApproaching = ta.minAttemptsApproaching;
            base.minAttemptsTopic = ta.minAttemptsTopic;
            base.modelVersion = summary._provenance.modelVersion || 'S111-1.0';
            base.dataContext = summary._provenance.dataContext;
        }
        // Merge full registry beneath for consumers that need structured access
        Object.keys(registry).forEach(k => { base[k] = registry[k]; });
        return base;
    },

    // Export calibration data in the format expected by the calibration harness.
    // This is a structured snapshot of all readiness-relevant data for one learner.
    exportCalibrationData() {
        return {
            thresholdSnapshot: this.getThresholdSnapshot(),
            readinessSummary: this.getReadinessSummary(),
            sectionReadiness: this.getSectionReadinessSummary(),
            trends: this.getTrends(),
            clusters: this.getWeaknessClusters(),
            calibration: this.getConfidenceCalibration(),
            calibrationMetrics: this.getCalibrationMetrics(),
            casePatternSummary: this.getCasePatternSummary(),
            casePatternTrends: this.getCasePatternTrends(),
            adaptivePracticeMix: this.getAdaptivePracticeMix(),
            exportedAt: new Date().toISOString()
        };
    },

    // ── S109 — Live calibration auto-logging ────────────────
    // Captures a throttled readiness snapshot during real sessions.
    // Called automatically from recordAttempt() when _liveCalibrationEnabled is true.
    // Throttles to avoid flooding: max one snapshot per 5 min or per 20 attempts.
    _commitCalibrationSnapshot() {
        let now = Date.now();
        this._attemptsSinceSnapshot++;
        let timeElapsed = now - this._lastCalibrationSnapshot;
        let shouldSnapshot = this._lastCalibrationSnapshot === 0 ||
            timeElapsed >= this._calibrationThrottleMs ||
            this._attemptsSinceSnapshot >= this._calibrationThrottleAttempts;
        if (!shouldSnapshot) return null;

        let snap = this.logReadinessMetrics();
        if (snap) {
            this._liveCalibrationSessions.push(snap);
            if (this._liveCalibrationSessions.length > 500) this._liveCalibrationSessions = this._liveCalibrationSessions.slice(-500);
        }
        this._lastCalibrationSnapshot = now;
        this._attemptsSinceSnapshot = 0;
        return snap;
    },

    // Enable live calibration auto-logging
    enableLiveCalibration() {
        this._liveCalibrationEnabled = true;
        this._lastCalibrationSnapshot = 0;
        this._attemptsSinceSnapshot = 0;
    },

    // Disable live calibration and return accumulated data
    disableLiveCalibration() {
        this._liveCalibrationEnabled = false;
        return this.getLiveCalibrationData();
    },

    // Return accumulated live calibration snapshots with summary
    getLiveCalibrationData() {
        let snaps = this._liveCalibrationSessions.slice();
        let summary = null;
        if (snaps.length > 0) {
            let last = snaps[snaps.length - 1];
            summary = {
                snapshotCount: snaps.length,
                firstSnapshot: snaps[0].timestamp,
                lastSnapshot: last.timestamp,
                currentOverall: last.overall,
                currentBandDistribution: last.bandDistribution,
                currentBoundaries: last.thresholdBoundaries,
                thresholdSnapshot: this.getThresholdSnapshot()
            };
        }
        return { snapshots: snaps, summary: summary };
    },

    // Clear live calibration data
    clearLiveCalibration() {
        this._liveCalibrationSessions = [];
        this._lastCalibrationSnapshot = 0;
        this._attemptsSinceSnapshot = 0;
    },

    // ============================================================
    // S129 — Recommendation Outcome Tracking & Effectiveness Engine
    // ============================================================

    // Record that a recommendation was delivered to the learner.
    // This is the entry-point for the closed-loop learning system:
    // recommendation → learner behavior → performance change → outcome classification.
    recordRecommendationDelivery(rec) {
        let data = this.load();
        if (!data.recommendationOutcomes) data.recommendationOutcomes = [];
        // S129 — Ensure unique IDs even under rapid calls (test env)
        let existingCount = data.recommendationOutcomes.length;
        let entry = {
            recommendationId: 'rec-' + Date.now().toString(36) + '-' + existingCount,
            deliveredAt: new Date().toISOString(),
            type: rec.type || 'unknown',            // next_best_step | focus_area | weekly_digest | study_strategy
            subType: rec.subType || null,           // e.g. targeted_practice | high | weekly_focus
            topic: rec.topic || null,
            section: rec.section || null,
            recommendationText: (rec.text || '').substring(0, 500),
            sourceSessionId: rec.sessionId || null,
            evidenceAtDelivery: rec.evidence || {},  // e.g. { accuracy: 42, attempts: 5 }
            status: 'delivered',                     // delivered | acted_on | ignored | superseded
            outcome: null,                           // positive | neutral | insufficient | contradictory
            outcomeEvidence: null,                   // populated when outcome is classified
            outcomeClassifiedAt: null
        };
        data.recommendationOutcomes.push(entry);
        if (data.recommendationOutcomes.length > 200) data.recommendationOutcomes = data.recommendationOutcomes.slice(-200);
        this.save(data);
        return entry.recommendationId;
    },

    // Classify outcomes for all delivered-but-unclassified recommendations.
    // Called after each session ends to evaluate which recommendations
    // had evidence of helpfulness.
    classifyPendingOutcomes() {
        let data = this.load();
        if (!data.recommendationOutcomes) return { classified: 0, results: [] };

        let topicProgress = this.getTopicProgress();
        let trends = this.getTrends();
        let trendMap = {};
        trends.forEach(t => { trendMap[t.topic] = t; });

        let results = [];
        data.recommendationOutcomes.forEach(rec => {
            if (rec.outcome !== null) return; // already classified

            let outcome = 'insufficient';
            let evidence = {};

            if (rec.topic && topicProgress[rec.topic]) {
                let tp = topicProgress[rec.topic];
                let tr = trendMap[rec.topic] || {};

                // Positive evidence: accuracy improved, trend is upward, recent accuracy >= 60
                if (tp.totalAttempts >= 5 && tp.accuracy >= 60 &&
                    tr.direction && (tr.direction === 'improving' || tr.direction === 'slightly_improving') &&
                    tr.delta !== null && tr.delta >= 5) {
                    outcome = 'positive';
                    evidence = {
                        topic: rec.topic,
                        currentAccuracy: tp.accuracy,
                        trend: tr.direction,
                        delta: tr.delta,
                        attempts: tp.totalAttempts,
                        window: 'since_delivery'
                    };
                }
                // Contradictory: accuracy declined significantly since recommendation
                else if (tp.totalAttempts >= 5 && tp.accuracy < 50 &&
                         tr.direction && (tr.direction === 'declining' || tr.direction === 'slightly_declining')) {
                    outcome = 'contradictory';
                    evidence = {
                        topic: rec.topic,
                        currentAccuracy: tp.accuracy,
                        trend: tr.direction,
                        delta: tr.delta,
                        attempts: tp.totalAttempts,
                        note: 'accuracy declined despite recommendation'
                    };
                }
                // Neutral: no clear change
                else if (tp.totalAttempts >= 5) {
                    outcome = 'neutral';
                    evidence = {
                        topic: rec.topic,
                        currentAccuracy: tp.accuracy,
                        trend: tr.direction || 'stable',
                        delta: tr.delta,
                        attempts: tp.totalAttempts
                    };
                }
                // Insufficient: not enough data
                else {
                    evidence = {
                        topic: rec.topic,
                        attempts: tp.totalAttempts,
                        reason: 'insufficient_attempts_for_classification'
                    };
                }
            } else {
                evidence = { reason: rec.topic ? 'no_topic_data' : 'no_topic_specified' };
            }

            rec.outcome = outcome;
            rec.outcomeEvidence = evidence;
            rec.outcomeClassifiedAt = new Date().toISOString();
            rec.status = outcome === 'insufficient' ? 'delivered' : 'acted_on';
            results.push({ recommendationId: rec.recommendationId, type: rec.type, topic: rec.topic, outcome: outcome });
        });

        this.save(data);
        return { classified: results.length, results: results };
    },

    // Get outcome summary for all recommendations.
    // Returns counts by type and outcome — no causal claims.
    getOutcomeSummary() {
        let data = this.load();
        let outcomes = data.recommendationOutcomes || [];
        let byType = {};
        let byOutcome = { positive: 0, neutral: 0, insufficient: 0, contradictory: 0, unclassified: 0 };

        outcomes.forEach(rec => {
            let type = rec.type || 'unknown';
            if (!byType[type]) byType[type] = { total: 0, positive: 0, neutral: 0, insufficient: 0, contradictory: 0, unclassified: 0 };
            byType[type].total++;
            if (rec.outcome === null) {
                byType[type].unclassified++;
                byOutcome.unclassified++;
            } else {
                byType[type][rec.outcome]++;
                byOutcome[rec.outcome]++;
            }
        });

        return {
            totalRecommendations: outcomes.length,
            byType: byType,
            byOutcome: byOutcome,
            hasData: outcomes.length > 0
        };
    },

    // Get recurrence tracking for closed-loop learning.
    // Returns which topics have been recommended before and what happened.
    getRecommendationRecurrence() {
        let data = this.load();
        let outcomes = data.recommendationOutcomes || [];
        let topicRecs = {};

        outcomes.forEach(rec => {
            if (!rec.topic) return;
            if (!topicRecs[rec.topic]) topicRecs[rec.topic] = { count: 0, types: [], outcomes: [] };
            topicRecs[rec.topic].count++;
            if (rec.type && !topicRecs[rec.topic].types.includes(rec.type)) topicRecs[rec.topic].types.push(rec.type);
            if (rec.outcome) topicRecs[rec.topic].outcomes.push(rec.outcome);
        });

        // Determine priority adjustment for closed-loop learning:
        // positive outcome → lower priority (don't re-recommend unless new evidence)
        // contradictory → don't re-recommend same type
        // neutral → allow re-recommendation
        // insufficient → no adjustment
        Object.keys(topicRecs).forEach(topic => {
            let t = topicRecs[topic];
            let lastOutcome = t.outcomes[t.outcomes.length - 1] || null;
            t.recurrenceAdjustment = 'none';
            if (lastOutcome === 'positive') t.recurrenceAdjustment = 'deprioritize';
            if (lastOutcome === 'contradictory') t.recurrenceAdjustment = 'deprioritize';
        });

        return { byTopic: topicRecs, hasRecurrence: Object.keys(topicRecs).length > 0 };
    },

    // ── S129 — Longitudinal analytics across time windows ──
    // Returns topic performance, recommendation outcomes, and misconception
    // recurrence for 1-week, 2-week, and 4-week lookback windows.
    getLongitudinalAnalytics() {
        let data = this.load();
        let now = new Date();
        let windows = {
            '1week': { ms: 7 * 24 * 60 * 60 * 1000 },
            '2week': { ms: 14 * 24 * 60 * 60 * 1000 },
            '4week': { ms: 28 * 24 * 60 * 60 * 1000 }
        };

        let result = {};

        Object.entries(windows).forEach(([label, w]) => {
            let cutoff = new Date(now.getTime() - w.ms).toISOString();

            // Sessions in window
            let windowedSessions = (data.sessions || []).filter(s => s.date >= cutoff);
            let totalAttempts = windowedSessions.reduce((sum, s) => sum + (s.attempts || []).length, 0);

            // Recommendations in window
            let windowedRecs = (data.recommendationOutcomes || []).filter(r => r.deliveredAt >= cutoff);
            let recByType = {};
            windowedRecs.forEach(r => {
                recByType[r.type] = (recByType[r.type] || 0) + 1;
            });
            let recOutcomes = { positive: 0, neutral: 0, insufficient: 0, contradictory: 0 };
            windowedRecs.forEach(r => {
                if (r.outcome) recOutcomes[r.outcome]++;
                else recOutcomes.insufficient++;
            });

            // Misconception recurrence in window
            let misconceptionRecurrence = 0;
            windowedSessions.forEach(s => {
                (s.attempts || []).forEach(a => {
                    if (!a.correct) misconceptionRecurrence++;
                });
            });

            result[label] = {
                sessionCount: windowedSessions.length,
                totalAttempts: totalAttempts,
                recommendationCount: windowedRecs.length,
                recommendationTypes: recByType,
                recommendationOutcomes: recOutcomes,
                misconceptionOccurrences: misconceptionRecurrence,
                hasData: windowedSessions.length > 0
            };
        });

        return result;
    },

    // ════════════════════════════════════════════════════════
    // S131 — Unified Evidence Graph Core
    // Single shared evidence pipeline for all coaching subsystems.
    // Replaces independent ad-hoc data scanning with a single
    // computation-once, consume-anywhere model.
    // ════════════════════════════════════════════════════════

    // ── Evidence Graph: compute once, consumed by all ─────
    // Returns a materialized evidence snapshot for the entire
    // coaching chain. Every subsystem reads from this instead
    // of independently scanning sessions/topics/trends.
    computeEvidenceGraph() {
        let data = this.load();
        let topics = this.getTopicProgress();
        let trends = this.getTrends();
        let clusters = this.getWeaknessClusters();

        // ── Layer 1: Derived Evidence ──
        let evidence = {};
        Object.entries(topics).forEach(([topic, tp]) => {
            let tr = trends.find(t => t.topic === topic) || {};
            let recentAccuracy = tp.recentPct;
            let overallAccuracy = tp.accuracy;
            // S131 — Time-weighted accuracy (EWMA with 14-day
            // half-life) preventing old data from dominating
            let timeWeighted = this._computeTimeWeightedAccuracy(topic, data);
            evidence[topic] = {
                totalAttempts: tp.totalAttempts,
                correctCount: tp.correctCount,
                accuracy: overallAccuracy,
                recentAccuracy: recentAccuracy,
                timeWeightedAccuracy: timeWeighted,
                hintRate: tp.hintRate,
                avgDifficulty: tp.avgDifficulty,
                firstSeen: tp.firstSeen,
                lastSeen: tp.lastSeen,
                stability: tr.stability || null,
                delta: tr.delta || null,
                direction: tr.direction || 'stable',
                hintTrend: tr.hintTrend || 'stable',
                sectionsSeen: tp.sectionsSeen || [],
                difficultyDistribution: tp.difficultyDistribution || {}
            };
        });

        // ── Layer 2: Observations (threshold-gated) ──
        let observations = this._deriveObservations(evidence, clusters);

        // ── Layer 3: Patterns ──
        let patterns = this._derivePatterns(observations, data);

        return {
            evidence: evidence,
            observations: observations,
            patterns: patterns,
            clusters: clusters,
            metadata: {
                computedAt: new Date().toISOString(),
                topicCount: Object.keys(evidence).length,
                sessionCount: (data.sessions || []).length,
                modelVersion: 'S111-1.0'
            }
        };
    },

    // ════════════════════════════════════════════════════════
    // S134 — getLearnerIntelligence() — Unified Intelligence Engine
    // Single access point for all coaching subsystems. Combines
    // the evidence graph, observation registry, threshold registry,
    // and outcome analytics into one cached, materialized snapshot.
    // Every coaching function reads from this — no independent
    // data scanning, no diverging interpretations.
    // ════════════════════════════════════════════════════════
    getLearnerIntelligence() {
        let graph = this.computeEvidenceGraph();
        let registry = this.getThresholdRegistry();
        let outcomes = this.getOutcomeSummary();
        let windows = this.getEvidenceWindows();

        // ── Unified strengths & weaknesses summaries ──
        let strengths = graph.observations.strengths.map(s => ({
            topic: s.topic,
            accuracy: s.accuracy,
            recentAccuracy: s.recentAccuracy,
            timeWeightedAccuracy: s.timeWeightedAccuracy,
            attempts: s.totalAttempts,
            stability: s.stability,
            evidence: s.evidence
        }));
        let weaknesses = graph.observations.weaknesses.map(w => ({
            topic: w.topic,
            accuracy: w.accuracy,
            recentAccuracy: w.recentAccuracy,
            timeWeightedAccuracy: w.timeWeightedAccuracy,
            attempts: w.totalAttempts,
            evidence: w.evidence
        }));

        // ── Topic trends ──
        let trends = graph.observations.topicTrends;

        // ── Misconceptions ──
        let misconceptions = graph.observations.misconceptions;

        // ── Recommendations ──
        let recommendations = (this.load().recommendationOutcomes || []).slice(-50);

        return {
            // Core layers
            evidence: graph.evidence,
            observations: graph.observations,
            patterns: graph.patterns,
            clusters: graph.clusters,

            // Unified summaries
            strengths: strengths,
            weaknesses: weaknesses,
            trends: trends,
            misconceptions: misconceptions,

            // Analytics
            outcomes: outcomes,
            recommendations: recommendations,

            // Governance
            thresholds: registry,
            windows: windows,
            _consistency: this.verifyClassificationConsistency(),

            // Metadata
            meta: {
                computedAt: graph.metadata.computedAt,
                topicCount: graph.metadata.topicCount,
                sessionCount: graph.metadata.sessionCount,
                modelVersion: 'S111-1.0',
                engineVersion: 'S134-1.0'
            }
        };
    },

    // ── S131 — Time-weighted accuracy (EWMA 14-day half-life) ─
    _computeTimeWeightedAccuracy(topic, data) {
        let attempts = [];
        (data.sessions || []).forEach(s => {
            (s.attempts || []).forEach(a => {
                if ((a.topic || 'Unclassified') === topic) {
                    attempts.push({
                        correct: a.correct,
                        timestamp: a.timestamp || s.date
                    });
                }
            });
        });
        if (attempts.length === 0) return null;
        // EWMA: half-life 14 days, decay λ = ln(2)/14
        let now = new Date().getTime();
        let lambda = Math.log(2) / (14 * 24 * 3600 * 1000);
        let weightedSum = 0; let weightTotal = 0;
        attempts.forEach(a => {
            let ageMs = Math.max(0, now - new Date(a.timestamp).getTime());
            let weight = Math.exp(-lambda * ageMs);
            weightedSum += (a.correct ? 1 : 0) * weight;
            weightTotal += weight;
        });
        return weightTotal > 0 ? Math.round(weightedSum / weightTotal * 100) : null;
    },

    // ── S131 — Observation Registry ─────────────────────────
    // Single source of truth for all learner observations.
    // Every subsystem consumes these — no independent
    // re-classification of the same data.
    _deriveObservations(evidence, clusters) {
        let obs = {
            strengths: [],
            weaknesses: [],
            misconceptions: [],
            topicTrends: [],
            calculationPatterns: [],
            terminologyPatterns: [],
            behaviorTrends: []
        };

        Object.entries(evidence).forEach(([topic, ev]) => {
            // Strength: >=3 attempts, >=85% accuracy, no declining trend
            if (ev.totalAttempts >= 3 && ev.accuracy >= 85 &&
                ev.direction !== 'declining' && ev.direction !== 'slightly_declining') {
                obs.strengths.push({
                    topic, accuracy: ev.accuracy, recentAccuracy: ev.recentAccuracy,
                    timeWeightedAccuracy: ev.timeWeightedAccuracy,
                    totalAttempts: ev.totalAttempts, stability: ev.stability,
                    evidence: { topic, accuracy: ev.accuracy, attempts: ev.totalAttempts, direction: ev.direction }
                });
            }
            // Weakness: >=5 attempts, <60% accuracy
            if (ev.totalAttempts >= 5 && ev.accuracy < 60) {
                obs.weaknesses.push({
                    topic, accuracy: ev.accuracy, recentAccuracy: ev.recentAccuracy,
                    timeWeightedAccuracy: ev.timeWeightedAccuracy,
                    totalAttempts: ev.totalAttempts,
                    evidence: { topic, accuracy: ev.accuracy, attempts: ev.totalAttempts }
                });
            }
            // Topic trend: improving/declining with unified delta=10 threshold
            if (ev.totalAttempts >= 4 && ev.delta !== null) {
                if (ev.delta >= 10) {
                    obs.topicTrends.push({
                        topic, direction: 'improving', delta: ev.delta,
                        accuracy: ev.accuracy, recentAccuracy: ev.recentAccuracy,
                        evidence: { topic, delta: ev.delta, attempts: ev.totalAttempts }
                    });
                } else if (ev.delta <= -10) {
                    obs.topicTrends.push({
                        topic, direction: 'declining', delta: ev.delta,
                        accuracy: ev.accuracy, recentAccuracy: ev.recentAccuracy,
                        evidence: { topic, delta: ev.delta, attempts: ev.totalAttempts }
                    });
                }
            }
        });

        // Misconceptions from patterns
        let data = this.load();
        (data.misconceptionPatterns || []).forEach(p => {
            if (p.count >= 2) {
                obs.misconceptions.push({
                    pattern: p.pattern, count: p.count,
                    topics: p._topics || p.topics || [],
                    lastSeen: p.lastSeen,
                    evidence: { pattern: p.pattern, count: p.count, lastSeen: p.lastSeen }
                });
            }
        });

        // Behavior trends from clusters
        let sesCount = (data.sessions || []).length;
        if (sesCount >= 2) {
            if (clusters.improving.length > 0) obs.behaviorTrends.push({ trend: 'improving_topics', count: clusters.improving.length, topics: clusters.improving.map(t => t.topic) });
            if (clusters.declining.length > 0) obs.behaviorTrends.push({ trend: 'declining_topics', count: clusters.declining.length, topics: clusters.declining.map(t => t.topic) });
            if (clusters.hintDependent.length > 0) obs.behaviorTrends.push({ trend: 'hint_dependent', count: clusters.hintDependent.length, topics: clusters.hintDependent.map(t => t.topic) });
            if (clusters.difficultySensitive.length > 0) obs.behaviorTrends.push({ trend: 'difficulty_sensitive', count: clusters.difficultySensitive.length, topics: clusters.difficultySensitive.map(t => t.topic) });
        }

        return obs;
    },

    // ── S131 — Pattern derivation ──────────────────────────
    _derivePatterns(observations, data) {
        let patterns = [];
        // Cross-topic misconception: same pattern across multiple topics
        let misconceptionMap = {};
        observations.misconceptions.forEach(m => {
            let key = m.pattern;
            if (!misconceptionMap[key]) misconceptionMap[key] = { pattern: key, topics: [], totalCount: 0 };
            misconceptionMap[key].topics = [...new Set([...misconceptionMap[key].topics, ...m.topics])];
            misconceptionMap[key].totalCount += m.count;
        });
        Object.values(misconceptionMap).forEach(m => {
            if (m.topics.length >= 2) patterns.push({ type: 'cross_topic_misconception', ...m, evidence: m });
        });

        // Difficulty amplification: accuracy drops on harder items
        let sesCount = (data.sessions || []).length;
        if (sesCount >= 3) {
            Object.entries(this.getTopicProgress()).forEach(([topic, tp]) => {
                if (tp.totalAttempts >= 5 && tp.difficultyDistribution) {
                    let easy = (tp.difficultyDistribution['Easy'] || 0) + (tp.difficultyDistribution['Moderate-Easy'] || 0);
                    let hard = (tp.difficultyDistribution['Difficult'] || 0) + (tp.difficultyDistribution['Very Difficult'] || 0);
                    if (easy >= 3 && hard >= 2) {
                        patterns.push({ type: 'difficulty_amplification', topic, easyCount: easy, hardCount: hard, evidence: { topic, easy, hard } });
                    }
                }
            });
        }
        return patterns;
    },

    // ── S131 — Evidence aging: categorize evidence by recency ─
    getEvidenceWindows() {
        let graph = this.computeEvidenceGraph();
        let now = new Date().getTime();
        let recentCutoff = now - 7 * 24 * 3600 * 1000;
        let activeCutoff = now - 14 * 24 * 3600 * 1000;
        let historicalCutoff = now - 28 * 24 * 3600 * 1000;

        let windows = { recent: {}, active: {}, historical: {}, archived: {} };
        Object.entries(graph.evidence).forEach(([topic, ev]) => {
            let lastSeen = ev.lastSeen ? new Date(ev.lastSeen).getTime() : 0;
            if (lastSeen >= recentCutoff) windows.recent[topic] = ev;
            else if (lastSeen >= activeCutoff) windows.active[topic] = ev;
            else if (lastSeen >= historicalCutoff) windows.historical[topic] = ev;
            else windows.archived[topic] = ev;
        });
        return windows;
    },

    // ── S131 — Observation freshness check ──────────────────
    // Returns observations that haven't gone stale (>28 days since last evidence)
    getFreshObservations(maxAgeDays) {
        maxAgeDays = maxAgeDays || 28;
        let graph = this.computeEvidenceGraph();
        let now = new Date().getTime();
        let cutoff = now - maxAgeDays * 24 * 3600 * 1000;

        let fresh = {
            strengths: [],
            weaknesses: [],
            misconceptions: [],
            topicTrends: [],
            behaviorTrends: []
        };

        // Filter topic-based observations by recency
        let evidenceAge = {};
        Object.entries(graph.evidence).forEach(([topic, ev]) => {
            evidenceAge[topic] = ev.lastSeen ? new Date(ev.lastSeen).getTime() : 0;
        });

        graph.observations.strengths.forEach(o => {
            if (evidenceAge[o.topic] >= cutoff) fresh.strengths.push(o);
        });
        graph.observations.weaknesses.forEach(o => {
            if (evidenceAge[o.topic] >= cutoff) fresh.weaknesses.push(o);
        });
        graph.observations.topicTrends.forEach(o => {
            if (evidenceAge[o.topic] >= cutoff) fresh.topicTrends.push(o);
        });

        // Misconceptions: filter by lastSeen
        graph.observations.misconceptions.forEach(m => {
            if (m.lastSeen && new Date(m.lastSeen).getTime() >= cutoff) {
                fresh.misconceptions.push(m);
            }
        });

        fresh.behaviorTrends = graph.observations.behaviorTrends;
        return fresh;
    },

    // ── S131 — Classification consistency check ─────────────
    // Verifies all subsystems would produce the same weak/strong/improving
    // classifications from the shared evidence graph. Returns any conflicts.
    verifyClassificationConsistency() {
        let graph = this.computeEvidenceGraph();
        let conflicts = [];
        Object.entries(graph.evidence).forEach(([topic, ev]) => {
            // Weak topic: now unified at >=5 attempts / <60% accuracy
            let isWeak = ev.totalAttempts >= 5 && ev.accuracy < 60;
            // Strong topic: now unified at >=3 attempts / >=85% accuracy
            let isStrong = ev.totalAttempts >= 3 && ev.accuracy >= 85;
            // Improving: now unified at delta >= 10 with >=4 attempts
            let isImproving = ev.totalAttempts >= 4 && ev.delta !== null && ev.delta >= 10;
            // Check that observations align with evidence
            let obsWeak = graph.observations.weaknesses.find(w => w.topic === topic);
            let obsStrong = graph.observations.strengths.find(s => s.topic === topic);
            let obsTrend = graph.observations.topicTrends.find(t => t.topic === topic && t.direction === 'improving');
            if (isWeak !== !!obsWeak) conflicts.push({ topic, type: 'weak_classification', evidence: isWeak, observation: !!obsWeak });
            if (isStrong !== !!obsStrong) conflicts.push({ topic, type: 'strong_classification', evidence: isStrong, observation: !!obsStrong });
            if (isImproving !== !!obsTrend) conflicts.push({ topic, type: 'improving_classification', evidence: isImproving, observation: !!obsTrend });
        });
        return { consistent: conflicts.length === 0, conflicts: conflicts };
    },

    // ── Clear state (for testing / reset) ────────────────
    clear() { try { localStorage.removeItem(this.STORAGE_KEY); } catch (e) {} },

    // ── Log a recommendation event ───────────────────────
    logRecommendation(recData) {
        let data = this.load(); if (!data.recommendationLog) data.recommendationLog = [];
        data.recommendationLog.push({ timestamp: new Date().toISOString(), sourceTopic: recData.sourceTopic || null, sourceDomain: recData.sourceDomain || null, reasonType: recData.reasonType || 'unknown', recommendedQids: recData.recommendedQids || [], packPool: recData.packPool || [], excludedByDefect: recData.excludedByDefect || [], excludedByContested: recData.excludedByContested || [], excludedByState: recData.excludedByState || [], activeSessionId: recData.activeSessionId || null, activeExamMode: recData.activeExamMode || false });
        if (data.recommendationLog.length > 200) data.recommendationLog = data.recommendationLog.slice(-200);
        this.save(data); return data.recommendationLog;
    },

    // ── S115 — Student roll persistence ───────────────────
    // Read the synthetic student roll from localStorage.
    getStudentRoll() {
        try { return JSON.parse(localStorage.getItem('cmaMayStudentRoll') || '[]'); }
        catch (e) { return []; }
    },

    // Save the synthetic student roll to localStorage.
    saveStudentRoll(roll) {
        try { localStorage.setItem('cmaMayStudentRoll', JSON.stringify(roll)); }
        catch (e) { /* quota exceeded — handled silently */ }
    },

    // Update a specific student's data in the roll.
    updateStudentInRoll(learnerId, profileData) {
        let roll = this.getStudentRoll();
        let idx = roll.findIndex(s => s.learnerId === learnerId);
        if (idx >= 0) {
            roll[idx] = { ...roll[idx], ...profileData, lastActiveAt: new Date().toISOString() };
            this.saveStudentRoll(roll);
        }
    },

    // ── S117 — Seeded synthetic learner history ─────────────
    // Creates a complete learner state with sessions + topicPerformance for testing.
    seedStudentHistory(opts) {
        let all = [];
        (opts.sessions || []).forEach(s => all.push(...(s.attempts || [])));
        let tp = {};
        all.forEach(a => {
            if (!tp[a.topic]) tp[a.topic] = { correctCount:0, totalAttempts:0, hintCount:0, recentAttempts:[],
                difficultyWeights:{sum:0,total:0}, difficultyDistribution:{}, sectionsSeen:[], firstSeen:a.timestamp, lastSeen:a.timestamp };
            let t = tp[a.topic]; t.correctCount += a.correct?1:0; t.totalAttempts++;
            t.hintCount += a.hintsUsed||0; t.difficultyWeights.sum += a.difficultyScore||3; t.difficultyWeights.total++;
            t.difficultyDistribution[a.difficulty] = (t.difficultyDistribution[a.difficulty]||0)+1;
            if(!t.sectionsSeen.includes(a.section)) t.sectionsSeen.push(a.section);
            if(a.timestamp<t.firstSeen) t.firstSeen=a.timestamp; if(a.timestamp>t.lastSeen) t.lastSeen=a.timestamp;
            t.recentAttempts.push({correct:a.correct,hints:a.hintsUsed||0,difficulty:a.difficulty});
            if(t.recentAttempts.length>10) t.recentAttempts=t.recentAttempts.slice(-10);
        });
        return { learnerId:opts.learnerId, userName:opts.userName||null, firstVisit:opts.firstVisit,
            historySynthetic:true, synthetic:true, preProduction:true,
            sessions:opts.sessions, topicPerformance:tp, subtopicPerformance:{},
            misconceptionPatterns:[], recommendationLog:[], sessionSummaries:[], lastUpdated:new Date().toISOString() };
    },
};