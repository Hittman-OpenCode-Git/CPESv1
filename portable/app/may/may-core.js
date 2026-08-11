// ============================================================
// May Core — AI Reviewer / Tutor orchestrator
// "May — clarity that remembers"
// ============================================================
const May = {
    // ═══ S132 — Shared Constants (eliminates 6+5 duplicated maps) ═══
    // Section name lookup — single source, used by all coaching functions
    SECTION_NAMES: { A: 'External Financial Reporting', B: 'Planning, Budgeting & Forecasting',
        C: 'Performance Management', D: 'Cost Management', E: 'Internal Controls', F: 'Technology & Analytics' },
    // Pattern name lookup — single source, used by all coaching functions
    PATTERN_NAMES: {
        'misclassification': 'classification errors',
        'variance_sign_confusion': 'variance sign confusion',
        'budget_component_error': 'budget component selection',
        'cost_method_confusion': 'cost method selection',
        'depreciation_method_error': 'depreciation method recall',
        'cash_flow_classification': 'cash flow classification',
        'ratio_misapplication': 'ratio formula recall',
        'control_framework_error': 'COSO framework mapping'
    },

    // ── Configuration ────────────────────────────────────
    config: {
        name: 'May',
        tagline: 'clarity that remembers',
        maxChatMessages: 40,
        hintLevels: ['metacognitive', 'concept', 'strategy', 'elimination', 'full'],
        // S108 — guarded tutoring pilot flag (default off)
        tutoringPilotEnabled: false,
    },

    // ── S109 — Pilot environment detection ─────────────────
    // Returns true when the tutoring pilot should be active.
    // Checks: config flag, env var CMA_MAY_PILOT, or pilotUserIds cohort.
    isPilotEnvironment() {
        if (this.config.tutoringPilotEnabled) return true;
        try {
            if (typeof process !== 'undefined' && process.env && process.env.CMA_MAY_PILOT === '1') return true;
        } catch (e) { /* browser env — no process */ }
        return false;
    },

    // ── Runtime state ────────────────────────────────────
    context: {
        currentQuestion: null,      // question being reviewed
        currentCaseItem: null,      // case item context
        currentCase: null,          // parent case
        sessionActive: false,       // is a practice session active?
        sessionId: null,
        chatHistory: [],            // { role: 'may'|'learner', text, timestamp }
        hintLevel: 0,               // current hint depth for current question
        reviewQuestions: [],        // questions queued for review
        reviewIndex: -1,            // current position in review queue
        _sessionHints: {},          // per-QID hint usage in current session (for handoff)
        _defectManifest: null,      // cached defect manifest for G1 gating
        // S115 — Greeting state machine and session telemetry
        greetingState: 'idle',      // 'idle' | 'ASK_RETURNING' | 'SHOW_STUDENT_ROLL' | 'CREATE_NEW_STUDENT' | 'READY_TO_TUTOR'
        _sessionTelemetry: [],      // [{ event, timestamp, learnerId, data }]
        // S117 — Exam-date onboarding state machine
        onboardingStep: null,       // null | 'ASK_EXAM_SCHEDULED' | 'ASK_EXAM_PART' | 'ASK_EXAM_DATE' | 'ASK_PLAN_PART' | 'ASK_PLAN_WINDOW' | 'DONE'
        onboarding_temp: {},        // accumulates examPlan data during onboarding
    },

    // Session 88 — Initialization
    // S115 — Extended: restore persisted logs, check for returning student, enter greeting flow
    init() {
        let data = MayLearnerState.load();
        if (typeof state !== 'undefined' && state.session && !state.session.completed) {
            this.context.sessionActive = true;
            this.context.sessionId = state.session.id || state.session.start?.toString(36);
        }
        this.context._sessionHints = {};
        this._fetchDefectManifest();
        this._updateDisplayName();

        // S109 — Initialize safety vocabulary at startup
        try { this._initSafetyVocab(); } catch (e) { /* non-blocking */ }

        // S115 — Restore persisted logs from localStorage (survive page reloads)
        this._restorePersistedLogs();

        // Inject persistent May launcher (always visible)
        this._injectMayLauncher();

        // Session 88: Greet the learner on launch
        let self = this;
        let isActive = (typeof state !== 'undefined' && state.session && !state.session.completed);
        setTimeout(function () {
            if (isActive) {
                self._hideMayCompanionCard();
                return; // Don't distract during active exam
            }

            // Inject May companion card on landing page
            self._injectMayCompanionCard();

            // S115 — Check for returning-student selection
            let selectedId = null;
            try { selectedId = localStorage.getItem('cmaMaySelectedLearnerId'); } catch (e) {}
            if (selectedId) {
                // Known returning student — skip handshake, greet directly
                let profile = MayLearnerState.getUserProfile();
                if (profile.name) {
                    self.getWelcomeMessage();
                } else {
                    self.askForName();
                }
                self._logSessionTelemetry('session_start', { learnerId: selectedId, action: 'returning_skip_handshake' });
                self.renderView();
                return;
            }

            // S115 — No selected learner: enter greeting handshake
            self._enterGreetingFlow();
        }, 200);
    },

    // ── Fetch defect manifest from governance JSON ────────
    _fetchDefectManifest() {
        let self = this;
        try {
            fetch('governance/DEFECT_MANIFEST_DL008_DL026.json')
                .then(r => r.json())
                .then(manifest => {
                    window._cmaDefectManifest = {
                        blockedQids: (manifest.blocked || [])
                    };
                    self.context._defectManifest = {};
                    window._cmaDefectManifest.blockedQids.forEach(entry => {
                        self.context._defectManifest[entry.qid] = entry;
                    });
                })
                .catch(() => { /* manifest unavailable — safe fallback */ });
        } catch (e) { /* fetch not available — safe fallback */ }
    },

    // ── Welcome & onboarding ─────────────────────────────
    getWelcomeMessage() {
        let profile = MayLearnerState.getUserProfile();
        if (!profile.name) return null; // first visit — name not yet set

        let data = MayLearnerState.load();
        let sessionCount = data.sessions ? data.sessions.length : 0;
        let totalAttempts = data.sessions.reduce((s, sess) => s + (sess.attempts || []).length, 0);

        let lines = [];
        lines.push(`Hi ${profile.name}, I'm **Chloe May** — but you can call me **May**.\n`);
        lines.push(`I'm your study companion for CMA Part 1. I track your progress by topic, explain questions using the bank's own content, give you graduated hints, flag your weak areas, and build targeted recovery sets.`);

        if (sessionCount > 0) {
            lines.push(`\nI've tracked **${sessionCount}** session(s) and **${totalAttempts}** question attempts for you so far.`);
            let clusters = MayLearnerState.getWeaknessClusters();
            if (clusters.persistentWeak.length > 0) {
                lines.push(`\nYour weakest area right now is **${clusters.persistentWeak[0].topic}** — I'd prioritize that if you're starting a review session.`);
            }
            if (clusters.improving.length > 0) {
                lines.push(`\nOn the bright side, you're showing real improvement on **${clusters.improving[0].topic}** (+${clusters.improving[0].delta}% in recent attempts).`);
            }
        }

        lines.push(`\n**What I can do:**`);
        lines.push(`- Explain answers and wrong choices using actual question-bank content`);
        lines.push(`- Give you 5-level graduated hints (nudge → concept → strategy → elimination → full)`);
        lines.push(`- Track topic-level accuracy, trends, confidence calibration, and recurring traps`);
        lines.push(`- Build targeted recovery sets from your weakest areas`);
        lines.push(`- Flag contested questions — if you believe the bank has an error, I'll exclude that QID`);
        lines.push(`- Help before and after exam simulations (I step back during the exam itself)`);

        if (!MayLearnerState.isNewUser() && sessionCount === 0) {
            lines.push(`\nLooks like you haven't completed a practice session yet. Start with a **10-question MCQ** to give me some data to work with — I'll get better the more you practice.`);
        }

        lines.push(`\nWhat would you like to do?`);

        this._speak(lines.join('\n'));
    },

    // ── Ask for the learner's name ────────────────────────
    askForName() {
        this._speak("Hi! I'm **Chloe May** — but you can call me **May**. I'll be your study companion for CMA Part 1.\n\nWhat's your name? I'll use it to track your progress across sessions.");
    },

    // ── Set name from chat input ──────────────────────────
    trySetName(text) {
        let profile = MayLearnerState.getUserProfile();
        if (profile.name) return false;

        let trimmed = text.trim();
        // Reject anything that looks like a command, QID, or non-name input
        if (trimmed.match(/[?!]/)) return false;
        if (trimmed.match(/^(explain|hint|help|what|how|who|why|when|where|can|show|give|tell|summar|review|start|resolve|recovery|build|begin|prep|warm|hello|hi|hey)/i)) return false;
        if (trimmed.match(/P1\w?-\w+-\d+/i)) return false; // looks like a QID
        if (trimmed.match(/\d/)) return false; // names don't contain numbers
        if (trimmed.length < 2 || trimmed.length > 40) return false;
        if (trimmed.split(' ').length > 4) return false; // too many words for a name

        MayLearnerState.setUserName(trimmed);
        // S115 — Mark new profile as synthetic pre-production during pilot
        let savedData = MayLearnerState.load();
        savedData.preProduction = true;
        savedData.synthetic = true;
        MayLearnerState.save(savedData);
        // S115 — Persist selected learner ID
        // S120 — Also write to cmaProfile2026 (SSOT)
        try { localStorage.setItem('cmaMaySelectedLearnerId', savedData.learnerId); } catch (e) {}
        try { if (typeof CMAProfileManager !== 'undefined') CMAProfileManager.patchMayField('maySelectedLearnerId', savedData.learnerId); } catch (e) {}
        this.context.greetingState = 'READY_TO_TUTOR';
        this._logSessionTelemetry('new_student_created', { learnerId: savedData.learnerId, displayName: trimmed });
        this._speak(`Nice to meet you, **${trimmed}**!\n\nI can explain questions from your practice sessions, give you hints, and help you figure out what to work on next. What would you like to do?`);
        return true;
    },

    // ── S117 — Privacy-safe name masking for student roll display ──
    // Masks middle characters: Avery Pilot → A***y P***t
    maskStudentName(displayName) {
        if (!displayName) return '';
        return displayName.split(' ').map(part => {
            if (part.length <= 2) return part;
            return part[0] + '*'.repeat(part.length - 2) + part[part.length - 1];
        }).join(' ');
    },

    // ── S115 — Greeting state machine ──────────────────────
    // Enter the returning-student handshake flow.
    _enterGreetingFlow() {
        this.context.greetingState = 'ASK_RETURNING';
        this._speak("Hi! Have you studied with me before, or is this your first time?");
        this.renderView();
        this._logSessionTelemetry('greeting_flow_started', { state: 'ASK_RETURNING' });
    },

    // Handle yes/no response from the greeting handshake.
    _handleGreetingResponse(response) {
        if (response === 'yes') {
            this.context.greetingState = 'SHOW_STUDENT_ROLL';
            this._ensureStudentRoll();
            this._logSessionTelemetry('greeting_response', { response: 'yes' });
            this.renderView();
        } else {
            this.context.greetingState = 'CREATE_NEW_STUDENT';
            this._logSessionTelemetry('greeting_response', { response: 'no' });
            this.askForName();
            this.renderView();
        }
    },

    // Select a student from the roll and load their profile.
    _selectStudentFromRoll(learnerId) {
        let roll = MayLearnerState.getStudentRoll();
        let student = roll.find(s => s.learnerId === learnerId);
        if (!student) {
            this._speak("Hmm, I couldn't find that student in my records. Let's start fresh.");
            this._handleGreetingResponse('no');
            return;
        }
        // Save the student's learner state as the active profile
        if (student._learnerState) {
            MayLearnerState.save(student._learnerState);
            // S117 — Ensure userName is populated from the student profile
            let data = MayLearnerState.load();
            if (!data.userName || data.userName !== student.displayName) {
                data.userName = student.displayName;
                MayLearnerState.save(data);
            }
        } else {
            // Minimal profile from roll metadata
            let data = MayLearnerState.load();
            data.userName = student.displayName;
            data.learnerId = student.learnerId;
            data.synthetic = true;
            data.preProduction = true;
            if (!data.firstVisit) data.firstVisit = student.lastActiveAt || new Date().toISOString();
            MayLearnerState.save(data);
        }
        // S120 — Also write to cmaProfile2026 (SSOT)
        try { localStorage.setItem('cmaMaySelectedLearnerId', learnerId); } catch (e) {}
        try { if (typeof CMAProfileManager !== 'undefined') CMAProfileManager.patchMayField('maySelectedLearnerId', learnerId); } catch (e) {}
        this.context.greetingState = 'READY_TO_TUTOR';
        this._logSessionTelemetry('student_selected', { learnerId, displayName: student.displayName });

        // S117 — Build welcome-back overview with evidence-backed trends and goals
        let lines = this._buildWelcomeOverview(student);
        this._speak(lines.join('\n'));

        // S117 — Trigger exam-date onboarding flow after welcome
        this.context.onboardingStep = 'ASK_EXAM_SCHEDULED';
        this.context.onboarding_temp = { synthetic: true, preProduction: true };
        this._speak("\nDo you already have a CMA exam scheduled?");
        this.renderView();
    },

    // ── S117 — Build evidence-backed welcome overview after student selection ──
    _buildWelcomeOverview(student) {
        let lines = [];
        lines.push(`Welcome back, **${student.displayName}**! I found your last simulation results.\n`);

        // Positive trend detection
        let clusters = MayLearnerState.getWeaknessClusters();
        let trends = MayLearnerState.getTrends();
        let data = MayLearnerState.load();
        let sessionCount = data.sessions ? data.sessions.length : 0;
        let hasEvidence = sessionCount >= 2;

        if (hasEvidence) {
            let trendMsg = this._detectPositiveTrend(clusters, trends, data);
            if (trendMsg) lines.push(trendMsg);
        }

        // Strengths and opportunities
        if (clusters.improving.length > 0) {
            let top = clusters.improving[0];
            lines.push(`Your strongest recent trend is improved consistency in **${top.topic}** (${top.accuracy}% accuracy, +${top.delta}% recent improvement).`);
        }
        if (clusters.persistentWeak.length > 0) {
            let weak = clusters.persistentWeak[0];
            lines.push(`Your next opportunity is building consistency in **${weak.topic}** (currently ${weak.accuracy}% — below the 60% threshold).`);
        }

        // Fallback for sparse data
        if (!hasEvidence || sessionCount < 3) {
            if (!clusters.improving.length && !clusters.persistentWeak.length) {
                lines.push("Keep building your practice history — I'll have more insights after a few more sessions.");
            }
        }

        // Next best action
        let action = this._recommendNextAction(clusters, data);
        if (action) lines.push(`\n**Next best action:** ${action}`);

        lines.push(`\n> ⚠ This is a pre-production pilot environment. Your data is synthetic and stored locally.`);
        return lines;
    },

    // ── S117 — Detect a positive trend from learner data ──
    _detectPositiveTrend(clusters, trends, data) {
        if (clusters.improving.length > 0) {
            let top = clusters.improving[0];
            return `📈 You're trending in the right direction: your recent work on **${top.topic}** shows stronger consistency (up ${top.delta}%). Let's build on that momentum today.`;
        }
        // Check for decreasing hint usage
        let sessions = data.sessions || [];
        if (sessions.length >= 3) {
            let recent3 = sessions.slice(-3);
            let hintTotals = recent3.map(s => (s.attempts || []).reduce((sum, a) => sum + (a.hintsUsed || 0), 0));
            if (hintTotals[0] > hintTotals[2] && hintTotals[0] > 0) {
                return "You're relying less on hints — a sign of growing confidence in your knowledge.";
            }
        }
        // Check for steady performance
        let stableTopics = trends.filter(t => t.stability !== null && t.stability >= 60 && t.accuracy >= 70);
        if (stableTopics.length >= 2) {
            return `You're showing steady performance across ${stableTopics.length} topics — that's solid preparation work.`;
        }
        return null;
    },

    // ── S117 — Recommend the next best action based on learner state ──
    _recommendNextAction(clusters, data) {
        let sessionCount = data.sessions ? data.sessions.length : 0;
        let action, evidence;
        if (sessionCount < 2) {
            action = "Complete a 10-question MCQ session to give me more data for personalized recommendations.";
            evidence = { condition: 'insufficient_sessions', sessionCount: sessionCount };
        } else if (clusters.persistentWeak.length > 0) {
            action = "Start with a recovery set from your recent weak areas to address your biggest opportunity first.";
            evidence = { condition: 'persistent_weak', topics: clusters.persistentWeak.slice(0, 3).map(t => t.topic), count: clusters.persistentWeak.length };
        } else if (clusters.declining.length > 0) {
            action = "Focus on a topic that's recently declined — let's reverse that trend before it settles.";
            evidence = { condition: 'declining', topics: clusters.declining.slice(0, 3).map(t => t.topic), count: clusters.declining.length };
        } else {
            action = "Take a timed practice session to test your speed and readiness under exam conditions.";
            evidence = { condition: 'no_urgent_weakness', sessionCount: sessionCount };
        }
        // S131 — Provenance: record welcome-screen recommendations
        MayLearnerState.recordRecommendationDelivery({
            type: 'welcome_action', subType: evidence.condition,
            topic: evidence.topics ? evidence.topics[0] : null,
            text: action, evidence: evidence, sessionId: this.context.sessionId
        });
        return action;
    },

    // ── S117 — Exam-date onboarding state machine dispatcher ──
    _handleOnboardingResponse(action, value) {
        let plan = this.context.onboarding_temp || {};
        let step = this.context.onboardingStep;

        if (step === 'ASK_EXAM_SCHEDULED') {
            if (action === 'yes') {
                plan.hasScheduledExam = true;
                this.context.onboardingStep = 'ASK_EXAM_PART';
                this._speak("Which exam part are you preparing for?");
                this._logSessionTelemetry('onboarding_exam_yes', {});
            } else if (action === 'no') {
                plan.hasScheduledExam = false;
                plan.planningExam = false;
                plan.capturedAt = new Date().toISOString();
                this._finalizeOnboarding(plan);
                this._speak("That's okay — we can still build a steady study rhythm and use your practice data to decide when you may be ready to schedule.");
                this._logSessionTelemetry('onboarding_exam_no', {});
            } else if (action === 'planning') {
                plan.hasScheduledExam = false;
                plan.planningExam = true;
                this.context.onboardingStep = 'ASK_PLAN_PART';
                this._speak("Which part are you planning to take first?");
                this._logSessionTelemetry('onboarding_exam_planning', {});
            }
        } else if (step === 'ASK_EXAM_PART') {
            plan.examPart = value;
            this.context.onboardingStep = 'ASK_EXAM_DATE';
            this._speak("What is your scheduled exam date? (You can type it like 'September 14, 2026' or '2026-09-14')");
            this._logSessionTelemetry('onboarding_exam_part', { examPart: value });
        } else if (step === 'ASK_EXAM_DATE') {
            plan.examDate = value || 'not specified';
            plan.capturedAt = new Date().toISOString();
            this._finalizeOnboarding(plan);
            let daysMsg = this._daysUntilExam(plan.examDate);
            this._speak(`Got it — I'll keep ${plan.examDate} in mind. ${daysMsg}`);
            this._logSessionTelemetry('onboarding_exam_date', { examDate: plan.examDate });
        } else if (step === 'ASK_PLAN_PART') {
            plan.plannedExamPart = value;
            this.context.onboardingStep = 'ASK_PLAN_WINDOW';
            this._speak("What's your target date or timeframe? It can be approximate — like 'Fall 2026' or 'around January'.");
            this._logSessionTelemetry('onboarding_plan_part', { plannedExamPart: value });
        } else if (step === 'ASK_PLAN_WINDOW') {
            plan.targetDateOrWindow = value || 'not specified';
            plan.capturedAt = new Date().toISOString();
            this._finalizeOnboarding(plan);
            this._speak(`Good to know — I'll help you work toward that timeframe. Let's build a strong foundation.`);
            this._logSessionTelemetry('onboarding_plan_window', { targetDateOrWindow: plan.targetDateOrWindow });
        }

        this.renderView();
    },

    // ── S117 — Finalize examPlan and save to learner profile ──
    _finalizeOnboarding(plan) {
        MayLearnerState.setExamPlan(plan);
        this.context.onboardingStep = 'DONE';
        this.context.onboarding_temp = {};
    },

    // ── S117 — Compute encouraging days-until-exam message ──
    _daysUntilExam(dateStr) {
        if (!dateStr || dateStr === 'not specified') return '';
        try {
            let target = new Date(dateStr);
            if (isNaN(target.getTime())) return '';
            let now = new Date();
            let days = Math.round((target - now) / 86400000);
            if (days < 0) return 'Your exam date has passed — let me know if you have a new one scheduled.';
            if (days <= 7) return `With about ${days} days until your exam, we'll keep each session focused and high-impact.`;
            if (days <= 30) return `You have about ${Math.round(days/7)} weeks until your exam — let's prioritize high-yield review areas and steady practice.`;
            if (days <= 90) return `With about ${Math.round(days/30)} months to go, we have good time to build steady readiness across all topics.`;
            return `Your exam is still a while out — great time to build deep understanding at a comfortable pace.`;
        } catch(e) { return ''; }
    },

    // ── S115 — Student roll management ─────────────────────
    // Lazy-initialize the synthetic student roll in localStorage.
    _ensureStudentRoll() {
        let roll = MayLearnerState.getStudentRoll();
        if (roll.length === 0) {
            roll = this._generateSyntheticStudentRoll();
            MayLearnerState.saveStudentRoll(roll);
        }
        return roll;
    },

    // Generate 8 synthetic pre-production students with deterministic data.
    _generateSyntheticStudentRoll() {
        let baseTime = new Date('2026-06-01T00:00:00Z').getTime();
        let students = [
            {
                learnerId: 'synth-avery', displayName: 'Avery Pilot',
                synthetic: true, preProduction: true,
                lastActiveAt: new Date(baseTime + 2 * 86400000).toISOString(),
                profileSummary: 'First-time CMA candidate. Early study stage — 2 short sessions completed. Still exploring the exam structure and building baseline topic coverage.',
                sessions: 2,
                topicStats: { 'Financial statements': { accuracy: 55, attempts: 4 }, 'Planning and budgeting': { accuracy: 60, attempts: 3 } },
                readinessSnapshot: 'Not enough data',
                weakAreas: ['Financial statement classification', 'Budget components'],
                progressSignals: ['First session completed'],
                recentTutoringInteractions: [],
                pilotUsageLog: [], safetyLog: [], gateLog: [],
                _learnerState: null,
                notes: 'Archetype: first-time candidate, early study stage. Low data volume — tests May\'s "not enough data" gating.'
            },
            {
                learnerId: 'synth-jordan', displayName: 'Jordan Sample',
                synthetic: true, preProduction: true,
                lastActiveAt: new Date(baseTime + 8 * 86400000).toISOString(),
                profileSummary: 'Returning CMA candidate with 8 sessions. Showing steady improvement across 3 topics. Accuracy trending upward from 65% to 78%.',
                sessions: 8,
                topicStats: { 'Financial statements': { accuracy: 78, attempts: 12 }, 'Variance analysis': { accuracy: 82, attempts: 10 }, 'Cost behavior': { accuracy: 76, attempts: 8 }, 'Internal controls': { accuracy: 70, attempts: 7 } },
                readinessSnapshot: 'Approaching review-ready',
                weakAreas: ['Internal controls — COSO components'],
                progressSignals: ['Improving on variance analysis (+15%)', 'Improving on cost behavior (+12%)', 'Stable on financial statements'],
                recentTutoringInteractions: [{ qid: 'P1A-FS-003-Q8', topic: 'Financial statements', action: 'explain', timestamp: new Date(baseTime + 7 * 86400000).toISOString() }],
                pilotUsageLog: [], safetyLog: [], gateLog: [],
                _learnerState: null,
                notes: 'Archetype: returning candidate with stable improvement. Tests May\'s improvement-insight and recommendation logic.'
            },
            {
                learnerId: 'synth-morgan', displayName: 'Morgan Demo',
                synthetic: true, preProduction: true,
                lastActiveAt: new Date(baseTime + 10 * 86400000).toISOString(),
                profileSummary: '6 sessions completed. Strong performance on cost management and financial reporting, but persistent weakness in budgeting topics (45% accuracy).',
                sessions: 6,
                topicStats: { 'Planning and budgeting': { accuracy: 45, attempts: 14 }, 'Cost behavior': { accuracy: 82, attempts: 10 }, 'Financial statements': { accuracy: 80, attempts: 8 } },
                readinessSnapshot: 'Developing',
                weakAreas: ['Budget preparation order', 'Flexible budget calculations', 'Cash budget components'],
                progressSignals: ['Persistent weakness on budgeting (-5% recent trend)', 'Strong on cost behavior'],
                recentTutoringInteractions: [{ qid: 'P1B-BG-005-Q2', topic: 'Planning and budgeting', action: 'recovery', timestamp: new Date(baseTime + 9 * 86400000).toISOString() }],
                pilotUsageLog: [], safetyLog: [], gateLog: [],
                _learnerState: null,
                notes: 'Archetype: candidate with persistent weakness in budgeting. Tests May\'s recovery-set generation and weakness insight.'
            },
            {
                learnerId: 'synth-riley', displayName: 'Riley Practice',
                synthetic: true, preProduction: true,
                lastActiveAt: new Date(baseTime + 12 * 86400000).toISOString(),
                profileSummary: '5 sessions. Struggles with cost management topics when difficulty increases. High hint usage (avg 2.3 hints per question). Easy questions: 80%; difficult questions: 45%.',
                sessions: 5,
                topicStats: { 'Cost behavior': { accuracy: 62, attempts: 15 }, 'Standard costing': { accuracy: 55, attempts: 10 } },
                readinessSnapshot: 'Developing',
                weakAreas: ['Variance analysis at high difficulty', 'Standard costing methods'],
                progressSignals: ['Hint-dependent on cost topics', 'Difficulty-sensitive (30% gap)'],
                recentTutoringInteractions: [{ qid: 'P1D-CM-002-Q2', topic: 'Cost behavior', action: 'hint', timestamp: new Date(baseTime + 11 * 86400000).toISOString() }],
                pilotUsageLog: [], safetyLog: [], gateLog: [],
                _learnerState: null,
                notes: 'Archetype: cost-management difficulty sensitivity, hint-dependent. Tests S113 difficulty-sensitivity and hint-dependency evidence validators.'
            },
            {
                learnerId: 'synth-taylor', displayName: 'Taylor Sandbox',
                synthetic: true, preProduction: true,
                lastActiveAt: new Date(baseTime + 15 * 86400000).toISOString(),
                profileSummary: '7 sessions. Strong performance on Internal Controls (85% accuracy across COSO, SOX, internal audit topics). Weak on Technology & Analytics (50%). Asymmetric topic profile.',
                sessions: 7,
                topicStats: { 'Internal controls': { accuracy: 85, attempts: 12 }, 'COSO framework': { accuracy: 88, attempts: 8 }, 'Technology and analytics': { accuracy: 50, attempts: 10 } },
                readinessSnapshot: 'Approaching review-ready',
                weakAreas: ['Data governance', 'IT general controls', 'Emerging technology in accounting'],
                progressSignals: ['Section E at 85% — near Ready', 'Section F declining (-12%)'],
                recentTutoringInteractions: [{ qid: 'P1E-IC-005-Q4', topic: 'Internal controls', action: 'progress', timestamp: new Date(baseTime + 14 * 86400000).toISOString() }],
                pilotUsageLog: [], safetyLog: [], gateLog: [],
                _learnerState: null,
                notes: 'Archetype: controls strength, analytics weakness. Tests section-level readiness differentiation and asymmetric topic recommendations.'
            },
            {
                learnerId: 'synth-casey', displayName: 'Casey Trial',
                synthetic: true, preProduction: true,
                lastActiveAt: new Date(baseTime + 6 * 86400000).toISOString(),
                profileSummary: '4 sessions. Overall accuracy 75% but hint usage is rapidly increasing (from 20% to 70% of attempts). May be developing over-reliance on hints.',
                sessions: 4,
                topicStats: { 'Performance management': { accuracy: 75, attempts: 10 }, 'Forecasting': { accuracy: 72, attempts: 6 } },
                readinessSnapshot: 'Developing',
                weakAreas: ['Forecasting techniques — regression'],
                progressSignals: ['Hint use increasing (20% → 70%)', 'Accuracy stable at 75%'],
                recentTutoringInteractions: [{ qid: 'P1C-PM-004-Q6', topic: 'Performance management', action: 'hint', timestamp: new Date(baseTime + 5 * 86400000).toISOString() }],
                pilotUsageLog: [], safetyLog: [], gateLog: [],
                _learnerState: null,
                notes: 'Archetype: hint-dependent behavior. Tests S113 hint-dependency evidence validator and recommendation-gate behavior for hint-heavy profiles.'
            },
            {
                learnerId: 'synth-quinn', displayName: 'Quinn Sim',
                synthetic: true, preProduction: true,
                lastActiveAt: new Date(baseTime + 14 * 86400000).toISOString(),
                profileSummary: '6 sessions. Very unstable performance — accuracy swings from 40% to 85% between sessions. Stability score of 35%. Inconsistent study pattern.',
                sessions: 6,
                topicStats: { 'Financial statements': { accuracy: 62, attempts: 12 }, 'Cost behavior': { accuracy: 58, attempts: 10 }, 'Internal controls': { accuracy: 68, attempts: 8 } },
                readinessSnapshot: 'Recovery needed',
                weakAreas: ['Cost behavior (unstable)', 'Financial statement classification'],
                progressSignals: ['Unstable performance (stability 35%)', 'Wide accuracy swings (40%-85%)'],
                recentTutoringInteractions: [{ qid: 'P1A-FS-003-Q2', topic: 'Financial statements', action: 'summary', timestamp: new Date(baseTime + 13 * 86400000).toISOString() }],
                pilotUsageLog: [], safetyLog: [], gateLog: [],
                _learnerState: null,
                notes: 'Archetype: unstable recent performance. Tests S113 instability evidence validator and readiness provenance for unstable profiles.'
            },
            {
                learnerId: 'synth-parker', displayName: 'Parker Test',
                synthetic: true, preProduction: true,
                lastActiveAt: new Date(baseTime + 20 * 86400000).toISOString(),
                profileSummary: '10 sessions — most experienced synthetic student. 3 topics at Ready level but only 2 case practice sessions. Strong MCQ readiness, sparse case experience.',
                sessions: 10,
                topicStats: { 'Financial statements': { accuracy: 85, attempts: 18 }, 'Variance analysis': { accuracy: 82, attempts: 15 }, 'Internal controls': { accuracy: 84, attempts: 14 }, 'Cost behavior': { accuracy: 78, attempts: 12 } },
                readinessSnapshot: 'Approaching review-ready',
                weakAreas: ['Case-based practice (only 2 sessions)'],
                progressSignals: ['3 topics at Ready', 'Sparse case practice — degradation risk'],
                recentTutoringInteractions: [{ qid: 'P1A-FS-003-Q5', topic: 'Financial statements', action: 'similar', timestamp: new Date(baseTime + 19 * 86400000).toISOString() }],
                pilotUsageLog: [], safetyLog: [], gateLog: [],
                _learnerState: null,
                notes: 'Archetype: strong readiness, sparse case practice. Tests May\'s case-burden degradation logic and practice-mix recommendations.'
            }
        ];
        // S117 — Seed synthetic learner history into each student's _learnerState
        students.forEach(s => { s._learnerState = MayLearnerState.seedStudentHistory(this._getSeedData(s.learnerId)); });
        return students;
    },

    // ── S117 — Seeded history data per student archetype ─────
    _getSeedData(learnerId) {
        let d = (n) => new Date(2026, 5, n).toISOString(); // June 2026
        let mk = (topic, section, correct, hints, difficulty) => ({ topic, section, correct, hintsUsed: hints || 0, difficulty: difficulty || 'Moderate', difficultyScore: 3, timestamp: d(Math.floor(Math.random() * 10) + 1) });
        let ms = (id, n, date, atts) => { let a = atts.map(f => mk(...f)); a.forEach((x, i) => x.timestamp = d(Math.min(n, i + 1))); return { sessionId: id, date: date || d(n), mode: 'practice', totalQuestions: a.length, correctCount: a.filter(x => x.correct).length, scaledScore: Math.round(a.filter(x => x.correct).length / a.length * 500), mcqPct: Math.round(a.filter(x => x.correct).length / a.length * 100), attempts: a }; };

        // Each attempt tuple: [topic, section, correct, hints, difficulty]
        let seeds = {
            'synth-avery': {
                learnerId: 'synth-avery', firstVisit: d(1),
                sessions: [
                    ms('synth-session-avery-1', 1, d(1), [
                        ['Financial statements', 'A', true, 1, 'Moderate'], ['Financial statements', 'A', false, 2, 'Moderate'],
                        ['Financial statements', 'A', true, 0, 'Easy'], ['Financial statements', 'A', false, 1, 'Difficult'],
                        ['Planning and budgeting', 'B', true, 1, 'Moderate'], ['Planning and budgeting', 'B', false, 2, 'Easy'],
                        ['Planning and budgeting', 'B', true, 0, 'Moderate']
                    ]),
                    ms('synth-session-avery-2', 2, d(2), [
                        ['Financial statements', 'A', false, 1, 'Difficult'], ['Financial statements', 'A', true, 0, 'Easy'],
                        ['Planning and budgeting', 'B', true, 1, 'Moderate']
                    ])
                ]
            },
            'synth-jordan': {
                learnerId: 'synth-jordan', firstVisit: d(1),
                sessions: [
                    ms('synth-session-jordan-1', 1, d(1), [
                        ['Financial statements', 'A', false, 2, 'Moderate'], ['Financial statements', 'A', true, 0, 'Easy'],
                        ['Financial statements', 'A', false, 1, 'Difficult'], ['Variance analysis', 'C', true, 1, 'Moderate'],
                        ['Cost behavior', 'D', false, 2, 'Easy'], ['Internal controls', 'E', true, 0, 'Moderate']
                    ]),
                    ms('synth-session-jordan-2', 2, d(2), [
                        ['Financial statements', 'A', true, 0, 'Easy'], ['Financial statements', 'A', true, 1, 'Moderate'],
                        ['Variance analysis', 'C', true, 0, 'Moderate'], ['Variance analysis', 'C', false, 1, 'Difficult'],
                        ['Cost behavior', 'D', true, 1, 'Easy']
                    ]),
                    ms('synth-session-jordan-3', 3, d(3), [
                        ['Financial statements', 'A', true, 0, 'Moderate'], ['Financial statements', 'A', true, 0, 'Easy'],
                        ['Internal controls', 'E', true, 1, 'Moderate'], ['Internal controls', 'E', false, 0, 'Difficult']
                    ]),
                    ms('synth-session-jordan-4', 4, d(4), [
                        ['Variance analysis', 'C', true, 0, 'Moderate'], ['Cost behavior', 'D', true, 0, 'Easy'],
                        ['Financial statements', 'A', true, 0, 'Moderate'], ['Internal controls', 'E', true, 1, 'Moderate'],
                        ['Variance analysis', 'C', true, 0, 'Moderate']
                    ]),
                    ms('synth-session-jordan-5', 5, d(5), [
                        ['Financial statements', 'A', true, 0, 'Easy'], ['Variance analysis', 'C', true, 0, 'Moderate'],
                        ['Cost behavior', 'D', true, 1, 'Moderate'], ['Internal controls', 'E', false, 0, 'Difficult'],
                        ['Financial statements', 'A', true, 0, 'Moderate'], ['Variance analysis', 'C', true, 0, 'Easy']
                    ]),
                    ms('synth-session-jordan-6', 6, d(6), [
                        ['Financial statements', 'A', true, 0, 'Moderate'], ['Variance analysis', 'C', true, 0, 'Easy'],
                        ['Cost behavior', 'D', true, 0, 'Moderate'], ['Internal controls', 'E', true, 1, 'Moderate']
                    ]),
                    ms('synth-session-jordan-7', 7, d(7), [
                        ['Financial statements', 'A', true, 0, 'Moderate'], ['Financial statements', 'A', true, 0, 'Easy'],
                        ['Variance analysis', 'C', true, 0, 'Moderate'], ['Variance analysis', 'C', true, 0, 'Moderate'],
                        ['Internal controls', 'E', true, 0, 'Easy']
                    ]),
                    ms('synth-session-jordan-8', 8, d(8), [
                        ['Financial statements', 'A', true, 0, 'Easy'], ['Variance analysis', 'C', true, 0, 'Moderate'],
                        ['Cost behavior', 'D', true, 0, 'Moderate'], ['Internal controls', 'E', false, 0, 'Difficult'],
                        ['Financial statements', 'A', true, 0, 'Moderate']
                    ])
                ]
            },
            'synth-morgan': {
                learnerId: 'synth-morgan', firstVisit: d(1),
                sessions: [
                    ms('synth-session-morgan-1', 1, d(1), [
                        ['Planning and budgeting', 'B', false, 1, 'Moderate'], ['Planning and budgeting', 'B', false, 2, 'Difficult'],
                        ['Cost behavior', 'D', true, 0, 'Easy'], ['Financial statements', 'A', true, 1, 'Moderate'],
                        ['Planning and budgeting', 'B', false, 1, 'Moderate'], ['Cost behavior', 'D', true, 0, 'Easy']
                    ]),
                    ms('synth-session-morgan-2', 2, d(2), [
                        ['Planning and budgeting', 'B', true, 0, 'Easy'], ['Planning and budgeting', 'B', false, 1, 'Moderate'],
                        ['Financial statements', 'A', true, 0, 'Moderate'], ['Cost behavior', 'D', true, 0, 'Easy'],
                        ['Planning and budgeting', 'B', false, 2, 'Difficult']
                    ]),
                    ms('synth-session-morgan-3', 3, d(3), [
                        ['Planning and budgeting', 'B', false, 0, 'Moderate'], ['Planning and budgeting', 'B', true, 1, 'Easy'],
                        ['Cost behavior', 'D', true, 0, 'Moderate'], ['Financial statements', 'A', true, 0, 'Easy'],
                        ['Planning and budgeting', 'B', false, 1, 'Difficult'], ['Planning and budgeting', 'B', false, 0, 'Moderate']
                    ]),
                    ms('synth-session-morgan-4', 4, d(4), [
                        ['Cost behavior', 'D', true, 0, 'Easy'], ['Cost behavior', 'D', true, 0, 'Moderate'],
                        ['Financial statements', 'A', true, 0, 'Easy'], ['Planning and budgeting', 'B', false, 1, 'Difficult'],
                        ['Planning and budgeting', 'B', true, 0, 'Moderate']
                    ]),
                    ms('synth-session-morgan-5', 5, d(5), [
                        ['Financial statements', 'A', true, 0, 'Easy'], ['Cost behavior', 'D', true, 0, 'Moderate'],
                        ['Planning and budgeting', 'B', false, 1, 'Moderate'], ['Planning and budgeting', 'B', false, 0, 'Difficult'],
                        ['Planning and budgeting', 'B', true, 1, 'Easy']
                    ]),
                    ms('synth-session-morgan-6', 6, d(6), [
                        ['Cost behavior', 'D', true, 0, 'Moderate'], ['Financial statements', 'A', true, 0, 'Easy'],
                        ['Planning and budgeting', 'B', false, 1, 'Difficult'], ['Planning and budgeting', 'B', false, 2, 'Moderate'],
                        ['Planning and budgeting', 'B', false, 0, 'Moderate'], ['Cost behavior', 'D', true, 0, 'Easy']
                    ])
                ]
            },
            'synth-riley': {
                learnerId: 'synth-riley', firstVisit: d(1),
                sessions: [
                    ms('synth-session-riley-1', 1, d(1), [
                        ['Cost behavior', 'D', true, 0, 'Easy'], ['Cost behavior', 'D', true, 1, 'Moderate'],
                        ['Standard costing', 'D', false, 2, 'Difficult'], ['Cost behavior', 'D', true, 0, 'Easy'],
                        ['Standard costing', 'D', false, 1, 'Moderate']
                    ]),
                    ms('synth-session-riley-2', 2, d(2), [
                        ['Cost behavior', 'D', true, 3, 'Moderate'], ['Cost behavior', 'D', false, 2, 'Difficult'],
                        ['Standard costing', 'D', true, 1, 'Easy'], ['Standard costing', 'D', false, 3, 'Moderate'],
                        ['Cost behavior', 'D', true, 1, 'Easy'], ['Cost behavior', 'D', false, 2, 'Difficult']
                    ]),
                    ms('synth-session-riley-3', 3, d(3), [
                        ['Cost behavior', 'D', true, 2, 'Moderate'], ['Standard costing', 'D', false, 3, 'Difficult'],
                        ['Standard costing', 'D', true, 0, 'Easy'], ['Cost behavior', 'D', false, 2, 'Difficult'],
                        ['Cost behavior', 'D', true, 1, 'Easy']
                    ]),
                    ms('synth-session-riley-4', 4, d(4), [
                        ['Cost behavior', 'D', false, 3, 'Difficult'], ['Cost behavior', 'D', true, 2, 'Easy'],
                        ['Standard costing', 'D', false, 2, 'Moderate'], ['Standard costing', 'D', true, 1, 'Easy'],
                        ['Cost behavior', 'D', false, 3, 'Difficult']
                    ]),
                    ms('synth-session-riley-5', 5, d(5), [
                        ['Standard costing', 'D', true, 1, 'Moderate'], ['Cost behavior', 'D', false, 3, 'Difficult'],
                        ['Cost behavior', 'D', true, 2, 'Easy'], ['Standard costing', 'D', false, 2, 'Moderate'],
                        ['Cost behavior', 'D', false, 3, 'Difficult']
                    ])
                ]
            },
            'synth-taylor': {
                learnerId: 'synth-taylor', firstVisit: d(1),
                sessions: [
                    ms('synth-session-taylor-1', 1, d(1), [
                        ['Internal controls', 'E', true, 0, 'Easy'], ['Technology and analytics', 'F', false, 1, 'Moderate'],
                        ['COSO framework', 'E', true, 0, 'Moderate'], ['Technology and analytics', 'F', false, 2, 'Difficult'],
                        ['Internal controls', 'E', true, 0, 'Easy'], ['Technology and analytics', 'F', false, 1, 'Moderate']
                    ]),
                    ms('synth-session-taylor-2', 2, d(2), [
                        ['Internal controls', 'E', true, 0, 'Moderate'], ['COSO framework', 'E', true, 0, 'Easy'],
                        ['Technology and analytics', 'F', true, 2, 'Moderate'], ['Internal controls', 'E', true, 0, 'Easy'],
                        ['Technology and analytics', 'F', false, 1, 'Difficult']
                    ]),
                    ms('synth-session-taylor-3', 3, d(3), [
                        ['COSO framework', 'E', true, 0, 'Moderate'], ['Internal controls', 'E', true, 0, 'Easy'],
                        ['Technology and analytics', 'F', false, 1, 'Moderate'], ['Internal controls', 'E', true, 0, 'Easy'],
                        ['COSO framework', 'E', true, 0, 'Moderate']
                    ]),
                    ms('synth-session-taylor-4', 4, d(4), [
                        ['Internal controls', 'E', true, 0, 'Easy'], ['Technology and analytics', 'F', false, 0, 'Difficult'],
                        ['COSO framework', 'E', true, 0, 'Moderate'], ['Technology and analytics', 'F', false, 1, 'Moderate'],
                        ['Internal controls', 'E', true, 0, 'Easy']
                    ]),
                    ms('synth-session-taylor-5', 5, d(5), [
                        ['Internal controls', 'E', true, 0, 'Moderate'], ['COSO framework', 'E', true, 0, 'Easy'],
                        ['Technology and analytics', 'F', true, 1, 'Easy'], ['Internal controls', 'E', true, 0, 'Moderate']
                    ]),
                    ms('synth-session-taylor-6', 6, d(6), [
                        ['Technology and analytics', 'F', false, 0, 'Moderate'], ['Internal controls', 'E', true, 0, 'Easy'],
                        ['COSO framework', 'E', true, 0, 'Moderate'], ['Technology and analytics', 'F', false, 1, 'Difficult'],
                        ['Internal controls', 'E', true, 0, 'Easy']
                    ]),
                    ms('synth-session-taylor-7', 7, d(7), [
                        ['Internal controls', 'E', true, 0, 'Moderate'], ['COSO framework', 'E', true, 0, 'Easy'],
                        ['Internal controls', 'E', true, 0, 'Easy'], ['Technology and analytics', 'F', false, 1, 'Moderate']
                    ])
                ]
            },
            'synth-casey': {
                learnerId: 'synth-casey', firstVisit: d(1),
                sessions: [
                    ms('synth-session-casey-1', 1, d(1), [
                        ['Performance management', 'C', true, 0, 'Easy'], ['Performance management', 'C', true, 1, 'Moderate'],
                        ['Forecasting', 'B', false, 1, 'Moderate']
                    ]),
                    ms('synth-session-casey-2', 2, d(2), [
                        ['Performance management', 'C', true, 2, 'Moderate'], ['Performance management', 'C', false, 3, 'Difficult'],
                        ['Forecasting', 'B', true, 1, 'Easy'], ['Performance management', 'C', true, 2, 'Moderate']
                    ]),
                    ms('synth-session-casey-3', 3, d(3), [
                        ['Performance management', 'C', true, 3, 'Moderate'], ['Forecasting', 'B', true, 2, 'Moderate'],
                        ['Performance management', 'C', false, 4, 'Difficult'], ['Performance management', 'C', true, 2, 'Easy'],
                        ['Forecasting', 'B', false, 3, 'Moderate']
                    ]),
                    ms('synth-session-casey-4', 4, d(4), [
                        ['Performance management', 'C', true, 3, 'Easy'], ['Performance management', 'C', false, 4, 'Difficult'],
                        ['Forecasting', 'B', true, 2, 'Moderate'], ['Performance management', 'C', true, 3, 'Moderate'],
                        ['Forecasting', 'B', true, 2, 'Easy']
                    ])
                ]
            },
            'synth-quinn': {
                learnerId: 'synth-quinn', firstVisit: d(1),
                sessions: [
                    ms('synth-session-quinn-1', 1, d(1), [
                        ['Financial statements', 'A', true, 1, 'Easy'], ['Cost behavior', 'D', false, 2, 'Moderate'],
                        ['Financial statements', 'A', false, 0, 'Difficult'], ['Internal controls', 'E', true, 0, 'Moderate']
                    ]),
                    ms('synth-session-quinn-2', 2, d(2), [
                        ['Financial statements', 'A', false, 0, 'Moderate'], ['Cost behavior', 'D', true, 1, 'Easy'],
                        ['Financial statements', 'A', true, 0, 'Difficult'], ['Internal controls', 'E', false, 1, 'Moderate'],
                        ['Cost behavior', 'D', false, 0, 'Easy']
                    ]),
                    ms('synth-session-quinn-3', 3, d(3), [
                        ['Cost behavior', 'D', true, 0, 'Moderate'], ['Financial statements', 'A', true, 1, 'Easy'],
                        ['Internal controls', 'E', true, 0, 'Moderate'], ['Financial statements', 'A', false, 0, 'Difficult'],
                        ['Cost behavior', 'D', true, 0, 'Easy']
                    ]),
                    ms('synth-session-quinn-4', 4, d(4), [
                        ['Financial statements', 'A', false, 1, 'Difficult'], ['Financial statements', 'A', false, 0, 'Moderate'],
                        ['Internal controls', 'E', true, 0, 'Easy'], ['Cost behavior', 'D', false, 1, 'Moderate'],
                        ['Financial statements', 'A', true, 2, 'Easy']
                    ]),
                    ms('synth-session-quinn-5', 5, d(5), [
                        ['Internal controls', 'E', true, 0, 'Moderate'], ['Cost behavior', 'D', true, 0, 'Easy'],
                        ['Financial statements', 'A', true, 1, 'Easy'], ['Cost behavior', 'D', false, 0, 'Difficult'],
                        ['Internal controls', 'E', true, 0, 'Moderate']
                    ]),
                    ms('synth-session-quinn-6', 6, d(6), [
                        ['Financial statements', 'A', true, 0, 'Easy'], ['Financial statements', 'A', false, 0, 'Difficult'],
                        ['Cost behavior', 'D', false, 1, 'Moderate'], ['Internal controls', 'E', true, 0, 'Easy'],
                        ['Financial statements', 'A', false, 0, 'Moderate']
                    ])
                ]
            },
            'synth-parker': {
                learnerId: 'synth-parker', firstVisit: d(1),
                sessions: [
                    ms('synth-session-parker-1', 1, d(1), [
                        ['Financial statements', 'A', true, 0, 'Easy'], ['Variance analysis', 'C', true, 0, 'Moderate'],
                        ['Internal controls', 'E', true, 1, 'Easy'], ['Cost behavior', 'D', false, 2, 'Difficult']
                    ]),
                    ms('synth-session-parker-2', 2, d(2), [
                        ['Financial statements', 'A', true, 0, 'Moderate'], ['Variance analysis', 'C', true, 0, 'Easy'],
                        ['Internal controls', 'E', true, 0, 'Moderate']
                    ]),
                    ms('synth-session-parker-3', 3, d(3), [
                        ['Financial statements', 'A', false, 1, 'Difficult'], ['Cost behavior', 'D', true, 0, 'Easy'],
                        ['Variance analysis', 'C', true, 0, 'Moderate'], ['Financial statements', 'A', true, 0, 'Easy']
                    ]),
                    ms('synth-session-parker-4', 4, d(4), [
                        ['Internal controls', 'E', true, 0, 'Easy'], ['Variance analysis', 'C', true, 0, 'Moderate'],
                        ['Cost behavior', 'D', true, 1, 'Moderate']
                    ]),
                    ms('synth-session-parker-5', 5, d(5), [
                        ['Financial statements', 'A', true, 0, 'Easy'], ['Financial statements', 'A', true, 0, 'Moderate'],
                        ['Variance analysis', 'C', false, 0, 'Difficult'], ['Internal controls', 'E', true, 0, 'Easy']
                    ]),
                    ms('synth-session-parker-6', 6, d(6), [
                        ['Cost behavior', 'D', true, 0, 'Moderate'], ['Financial statements', 'A', true, 0, 'Easy'],
                        ['Variance analysis', 'C', true, 0, 'Moderate']
                    ]),
                    ms('synth-session-parker-7', 7, d(7), [
                        ['Internal controls', 'E', true, 0, 'Easy'], ['Financial statements', 'A', true, 0, 'Moderate'],
                        ['Cost behavior', 'D', true, 0, 'Easy'], ['Variance analysis', 'C', true, 0, 'Moderate']
                    ]),
                    ms('synth-session-parker-8', 8, d(8), [
                        ['Financial statements', 'A', true, 0, 'Easy'], ['Variance analysis', 'C', true, 0, 'Moderate'],
                        ['Internal controls', 'E', true, 0, 'Moderate'], ['Cost behavior', 'D', true, 1, 'Easy'],
                        ['Financial statements', 'A', true, 0, 'Moderate']
                    ]),
                    ms('synth-session-parker-9', 9, d(9), [
                        ['Variance analysis', 'C', true, 0, 'Easy'], ['Internal controls', 'E', true, 0, 'Moderate'],
                        ['Financial statements', 'A', true, 0, 'Easy']
                    ]),
                    ms('synth-session-parker-10', 10, d(10), [
                        ['Financial statements', 'A', true, 0, 'Moderate'], ['Cost behavior', 'D', true, 0, 'Easy'],
                        ['Internal controls', 'E', false, 0, 'Difficult'], ['Variance analysis', 'C', true, 0, 'Moderate'],
                        ['Financial statements', 'A', true, 0, 'Easy']
                    ])
                ]
            }
        };
        return seeds[learnerId] || seeds['synth-avery'];
    },
    preExamBriefing() {
        let profile = MayLearnerState.getUserProfile();
        let name = profile.name || 'there';
        let data = MayLearnerState.load();
        let sessionCount = data.sessions ? data.sessions.length : 0;
        let isReturning = sessionCount > 0;

        let lines = [];
        lines.push(`**CMA Exam Mode — Pre-Flight Briefing**\n`);

        if (!isReturning) {
            // Full briefing for first-timers
            lines.push(`**CMA Part 1 Exam — Fall 2026 Format:**`);
            lines.push(`- **Section 1:** 100 multiple-choice questions (3 hours)`);
            lines.push(`- **Section 2:** 2 essay scenarios, each with 5-7 sub-questions (1 hour)`);
            lines.push(`- MCQs are 75% of your score; essays are 25%`);
            lines.push(`- **You must finish MCQs before starting essays** — no returning to MCQs after`);
            lines.push(`- Passing score: 360 out of 500`);
            lines.push(`\n**At the test center:**`);
            lines.push(`- Arrive 30 minutes early with valid government ID`);
            lines.push(`- An on-screen basic calculator is provided; no personal calculators`);
            lines.push(`- Scratch paper and pencils provided by Prometric`);
            lines.push(`- No phones, watches, bags, or notes in the testing room`);
            lines.push(`- Unscheduled breaks are allowed but the clock keeps running`);
            lines.push(`- Results: typically 6 weeks after the end of the testing window`);
            lines.push(`\n**During this practice exam:**`);
            lines.push(`- I won't be available during the simulation — the timer will run continuously`);
            lines.push(`- Treat every question like it's the real exam — no pausing, no peeking`);
            lines.push(`- When you're done, I'll break down your results topic by topic`);
        } else {
            lines.push(`Welcome back, ${name}. You've done ${sessionCount} practice session(s) — you know the drill.`);
        }

        // Offer a review
        let clusters = MayLearnerState.getWeaknessClusters();
        if (clusters.persistentWeak.length > 0 || clusters.declining.length > 0 || clusters.unstable.length > 0) {
            lines.push(`\n**Before you start:** I noticed a few areas worth a quick review:`);
            let reviewTopics = [
                ...clusters.persistentWeak.slice(0, 2).map(t => `${t.topic} (${t.accuracy}%, persistent)`),
                ...clusters.declining.slice(0, 1).map(t => `${t.topic} (${t.accuracy}%, declining)`),
                ...clusters.unstable.slice(0, 1).map(t => `${t.topic} (${t.accuracy}%, unstable)`)
            ];
            reviewTopics.forEach(t => lines.push(`- ${t}`));
            lines.push(`\nSay **"review"** and I'll walk you through these before you begin. Otherwise, say **"start"** and I'll step aside.`);
            // S131 — Provenance: record pre-exam briefing review recommendations
            try {
                let topTopics = [...clusters.persistentWeak.slice(0, 2), ...clusters.declining.slice(0, 1), ...clusters.unstable.slice(0, 1)];
                topTopics.forEach(tt => {
                    MayLearnerState.recordRecommendationDelivery({
                        type: 'pre_exam_briefing', subType: 'review_suggestion',
                        topic: tt.topic,
                        text: 'Review ' + tt.topic + ' (' + tt.accuracy + '%) before starting exam',
                        evidence: { topic: tt.topic, accuracy: tt.accuracy, clusterFlags: [tt.topic] },
                        sessionId: this.context.sessionId
                    });
                });
            } catch (e) {}
        } else {
            lines.push(`\nReady to go? Say **"start"** and I'll step aside. Good luck, ${name} — you've prepared for this.`);
        }

        this._speak(lines.join('\n'));
    },

    // ── Return whether the mini-panel should be hidden ────
    isMiniPanelSuppressed() {
        // S130 — Mini-panel replaced by floating May panel; suppress during all active sessions
        if (typeof state !== 'undefined' && state.session && !state.session.completed) {
            return true;
        }
        return false;
    },

    // ── Return whether the full May tab should be blocked ─
    isFullTabBlocked() {
        if (typeof state === 'undefined' || !state.session || state.session.completed) return false;
        // W1-A — Delegate exam-state derivation to the shared single source
        // (app.js isExamIntegrityMode). Falls back to legacy inline logic if
        // the helper is unavailable (load-order safety).
        let integrityMode = (typeof isExamIntegrityMode === 'function')
            ? isExamIntegrityMode(state.session)
            : (state.session.mode === 'full');
        if (!integrityMode) return false;
        // Only block when the exam has actually started (questions are loaded)
        let hasQuestions = (state.session.mcqs && state.session.mcqs.length > 0) ||
                           (state.session.cases && state.session.cases.length > 0);
        return hasQuestions;
    },

    _updateDisplayName() {
        let nameEl = document.getElementById('mayDisplayName');
        if (nameEl) nameEl.textContent = this.config.name;
        let taglineEl = document.getElementById('mayTagline');
        if (taglineEl) taglineEl.textContent = this.config.tagline;
    },

    // ── Set current question context ─────────────────────
    setQuestionContext(question, caseObj, itemType, caseId, caseTitle, itemIndex) {
        // G6: Block question context setting during CMA Exam mode
        if (this.isFullTabBlocked()) return;
        this.context.currentQuestion = question;
        this.context.currentCase = caseObj || null;
        this.context.currentCaseItemType = itemType || 'mcq';
        this.context.currentCaseId = caseId || null;
        this.context.currentCaseTitle = caseTitle || null;
        this.context.currentCaseItemIndex = itemIndex !== undefined ? itemIndex : null;
        this.context.hintLevel = 0;
        this.context.chatHistory = [];
        if (question) {
            this._addMessage('may', this._greetingForQuestion(question));
        }
        this.renderView();
    },

    // ── Greeting based on context ────────────────────────
    _greetingForQuestion(q) {
        let topic = MayLearnerState._normalizeTopic(q.Topic || 'this topic');
        let section = May.SECTION_NAMES[q.Section] || 'this section';
        let isCase = this.context.currentCaseItemType === 'case';
        let casePrefix = isCase && this.context.currentCaseTitle ? `This is a case item from **${this.context.currentCaseTitle}**. ` : '';

        let exposure = MayLearnerState.getQuestionExposureCount(q.QuestionID);
        let topicProgress = MayLearnerState.getTopicProgress();
        let tp = topicProgress[topic];

        if (tp && tp.totalAttempts >= 3) {
            let pct = tp.accuracy || 0;
            if (pct >= 80) {
                return casePrefix + `You've been solid on ${topic} (${pct}% across ${tp.totalAttempts} attempts), but let's make sure this one clicks too. What would help?`;
            } else if (pct < 60) {
                return casePrefix + `${topic} has been tricky — you're at ${pct}% after ${tp.totalAttempts} tries. I'm here to work through it with you. Where would you like to start?`;
            }
        }
        if (exposure > 1) {
            return casePrefix + `Welcome back to this one. How can I help — walk through the reasoning, break down the wrong choices, or start with a hint?`;
        }
        return casePrefix + `I'm May. This question is from ${section}. What would help — an explanation, a hint, or breaking down the choices?`;
    },

    // ── Process a learner action ─────────────────────────
    handleAction(action, payload) {
        // G6: Block answer-revealing actions during CMA Exam mode
        if (this.isFullTabBlocked()) {
            let blocked = ['explain', 'wrong-choices', 'hint', 'simplify', 'mymistake', 'similar', 'next', 'recovery'];
            if (blocked.includes(action)) {
                this._speak("May is not available during CMA Exam mode. Submit your session first, and I'll break down your results topic by topic.");
                this.renderView();
                return;
            }
        }

        this._addMessage('learner', this._actionLabel(action));

        // ── MAY-001: Context Builder + Coaching Router integration ──
        // Gated behind feature flags (default: false — zero behavior change)
        var _mayContext = null;
        var _routingResult = null;
        try {
            if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled('ENABLE_CONTEXT_BUILDER')) {
                if (typeof MayContextBuilder !== 'undefined' && this.context.currentQuestion) {
                    _mayContext = MayContextBuilder.buildFullContext(this.context.currentQuestion.QuestionID);
                    if (_mayContext && typeof MayCoachingRouter !== 'undefined') {
                        _routingResult = MayCoachingRouter.enrichContext(_mayContext, action);
                    }
                }
            }
        } catch (e) {
            // Silent fallback — context builder failure must not break existing coaching
            _mayContext = null;
            _routingResult = null;
        }
        // Store for handler access (read-only, non-invasive)
        this.context._mayContext = _mayContext;
        this.context._routingResult = _routingResult;

        switch (action) {
            case 'explain':
                this._explainAnswer();
                break;
            case 'wrong-choices':
                this._explainWrongChoices();
                break;
            case 'hint':
                this._provideHint();
                break;
            case 'simplify':
                this._simplifyExplanation();
                break;
            case 'similar':
                this._recommendSimilar();
                break;
            case 'progress':
                this._getProgressInsight();
                break;
            case 'weakness':
                this._getWeaknessInsight();
                break;
            case 'summary':
                this._summarizeSession();
                break;
            case 'next':
                this._recommendNext();
                break;
            case 'mymistake':
                this._explainYourMistake();
                break;
            case 'recovery':
                this._generateRecoverySet();
                break;
            case 'digest':
                this._showWeeklyDigest();
                break;
            case 'strategy':
                this._showStudyStrategy();
                break;
            case 'effectiveness':
                this._showStrategyEffectiveness();
                break;
            case 'chat':
                if (payload && payload.trim()) {
                    this._handleFreeform(payload.trim());
                }
                break;
            default:
                // S76 — Context-aware fallback
                let hasQ = !!this.context.currentQuestion;
                let qForFallback = this.context.currentQuestion;
                let hasHistory = this.context.chatHistory && this.context.chatHistory.length > 0;
                let hints = [];
                if (hasQ && qForFallback) {
                    hints.push('"explain the answer"');
                    hints.push('"give me a hint"');
                    hints.push('"why is my answer wrong?"');
                }
                if (hasHistory) {
                    hints.push('"what should I study next?"');
                    hints.push('"summarize my progress"');
                }
                if (hints.length > 0) {
                    let suggestionList = hints.slice(0, 4).map(h => '• ' + h).join('\n');
                    this._speak('I want to help — here are some things I can do right now:\n\n' + suggestionList + '\n\nTry one of those, or ask me something specific about this question.');
                } else {
                    this._speak('I\'m not sure I understood. Try asking me to "explain the answer," "give me a hint," or "summarize my progress."');
                }
        }

        this.renderView();
    },

    _actionLabel(action) {
        let labels = {
            'explain': 'Explain the answer',
            'wrong-choices': 'Explain wrong choices',
            'hint': 'Give me a hint',
            'simplify': 'Simplify this',
            'similar': 'Show me another like this',
            'progress': 'What am I improving at?',
            'weakness': 'What am I still weak at?',
            'summary': 'Summarize this session',
            'next': 'What should I study next?',
            'mymistake': 'Where did I go wrong?',
            'recovery': 'Build a recovery set',
            'digest': 'Show me my weekly review',
            'strategy': 'Build my study plan',
            'effectiveness': 'What\'s helping most'
        };
        return labels[action] || action;
    },

    // ── Add message to chat ──────────────────────────────
    _addMessage(role, text) {
        this.context.chatHistory.push({
            role, text, timestamp: new Date().toISOString()
        });
        if (this.context.chatHistory.length > this.config.maxChatMessages) {
            this.context.chatHistory = this.context.chatHistory.slice(-this.config.maxChatMessages);
        }
    },

    // ── May speaks: generate a message ───────────────────
    _speak(text) {
        this._addMessage('may', text);
    },

    // ============================================================
    // A. Explanation mode
    // ============================================================

    // ── S123 — Generate a safe next-best-step action plan ──────
    // Never predicts pass/fail or estimates readiness.
    // Returns a structured action object grounded in the question
    // data, learner answer, and observable pattern.
    _generateNextBestStep(q, context) {
        let ctx = context || {};
        let cc = q ? q.CorrectChoice : null;
        let topic = q ? MayLearnerState._normalizeTopic(q.Topic || 'this concept') : 'this concept';
        let section = q ? (q.Section || '') : '';
        let stem = q ? (q.Stem || '') : '';
        let isCalculation = q ? !!(q.CalculationItem || (stem || '').match(/\$/)) : false;
        let learnerAnswer = ctx.selectedChoice || null;
        let isCorrect = q ? (learnerAnswer === cc) : false;
        let isUnanswered = !learnerAnswer;
        let topicData = null;

        let sectionName = May.SECTION_NAMES[section] || '';

        // ── Try to get topic performance data from learner state ──
        try {
            let progress = MayLearnerState.getTopicProgress();
            topicData = progress[topic] || null;
        } catch (e) {}

        // ── Infer the error category from the question and answer ──
        let errorCategory = 'general';
        if (isCorrect) {
            errorCategory = 'correct';
        } else if (isUnanswered) {
            errorCategory = 'unanswered';
        } else if (isCalculation && q) {
            // Calculation item — check for common calc error signals
            errorCategory = 'calculation';
            let wrongExp = q['ExplanationWrong' + learnerAnswer] || '';
            if (wrongExp.match(/formula|equation|compute/)) errorCategory = 'formula';
            if (wrongExp.match(/sign|direction|reversed|should have been/)) errorCategory = 'computation_error';
        } else if (q) {
            // Conceptual item — check for misconception signals
            let wrongExp = q['ExplanationWrong' + learnerAnswer] || '';
            if (wrongExp.match(/classif|represents|belongs to/)) errorCategory = 'classification';
            if (wrongExp.match(/confus|misunderstood|misapplied|conflate/)) errorCategory = 'concept_confusion';
            if (wrongExp.match(/define|definition|term|terminology/)) errorCategory = 'terminology';
            if (wrongExp.match(/trap|tempting|attractive|commonly selected/)) errorCategory = 'distractor_trap';
            if (wrongExp.match(/overlook|omitted|did not consider|forgot/)) errorCategory = 'oversight';
        }

        // ── Build action plan by error category ──
        let action = '';
        let actionType = '';

        switch (errorCategory) {
            case 'calculation':
                action = 'Practice 3-5 more ' + topic + ' calculation items. For each one, write the formula on scratch paper before looking at the answer choices. Check that every number in your formula came from the stem and wasn\'t invented.';
                actionType = 'targeted_practice';
                break;
            case 'formula':
                action = 'Review the formula for ' + topic + '. Write it out from memory, then check it against your notes or study materials. Once you can recall it cold, work through 2-3 calculation items that use it.';
                actionType = 'formula_review';
                break;
            case 'computation_error':
                action = 'On your next ' + topic + ' calculation, slow down at the arithmetic step. Double-check each operation (add/subtract, multiply/divide, sign direction) before picking an answer. A sign error or misplaced number is often all that separates the right and wrong answer.';
                actionType = 'computation_check';
                break;
            case 'classification':
                action = 'Map out the classification rules for ' + topic + '. Create a simple table: what goes where, and why. Then test yourself with 3 items that mix up the categories — the best way to cement classification is to practice distinguishing between options.';
                actionType = 'classification_practice';
                break;
            case 'concept_confusion':
                if (sectionName) {
                    action = 'This is a concept-boundary issue. Review the specific standard or framework for ' + topic + ' in ' + sectionName + '. Pay special attention to the line between "' + topic + '" and the related concept the distractor represented. Then try 2-3 items where you have to choose between them.';
                } else {
                    action = 'Review the specific rule or standard for ' + topic + '. Focus on the boundary between the correct concept and the distractor you chose — understanding that line is where the deepest learning happens.';
                }
                actionType = 'concept_review';
                break;
            case 'terminology':
                action = 'Build a quick flashcard set for ' + topic + ' terminology. On one side, the term. On the other, what it means in plain language and when it applies. Drill until you can define each term without hesitating.';
                actionType = 'terminology_review';
                break;
            case 'distractor_trap':
                action = 'Next time you see a ' + topic + ' question, read all the choices before picking one. Ask: *Does this option match the exact rule, or just sound familiar?* Pick the option that follows the specific standard — not the one that sounds best at first glance.';
                actionType = 'trap_awareness';
                break;
            case 'oversight':
                action = 'Re-read the stem carefully. Highlight or note the qualifier words (like "not," "except," "least," "most likely") that control what the question is asking. Then re-evaluate each option against that specific framing.';
                actionType = 'stem_re_read';
                break;
            case 'correct':
                if (topicData && topicData.accuracy >= 85 && topicData.totalAttempts >= 3) {
                    action = 'You are solid on ' + topic + '. Consider moving to the next topic in ' + (sectionName || 'this section') + ' to keep building. If you want a challenge, ask me to recommend a harder item in this area.';
                    actionType = 'advance';
                } else {
                    action = 'Nice work. To lock this in, try another ' + topic + ' item from a different angle — a calculation if this was conceptual, or vice versa. Variation builds durable understanding.';
                    actionType = 'reinforce';
                }
                break;
            default:
                // unanswered or general fallback
                if (sectionName) {
                    action = 'After you submit your answer, I can suggest a specific next step based on what you got right or wrong. For now, focus on identifying the one rule or formula that ' + topic + ' is testing.';
                } else {
                    action = 'After you submit your answer, I can suggest a specific next step. Focus on matching the stem to the governing rule or formula.';
                }
                actionType = 'general_guidance';
                break;
        }

        return {
            actionText: action,
            actionType: actionType,
            errorCategory: errorCategory,
            topic: topic,
            section: sectionName,
            isCalculation: isCalculation,
            isCorrect: isCorrect,
            isUnanswered: isUnanswered,
            learnerAnswer: learnerAnswer,
            topicAccuracy: topicData ? topicData.accuracy : null,
            topicAttempts: topicData ? topicData.totalAttempts : null
        };
    },

    // ── S123 — Append a Next Best Step section to coaching output ──
    _appendNextBestStep(lines, q, context) {
        let plan = this._generateNextBestStep(q, context);
        if (!plan || !plan.actionText) return lines;

        // S129 — Record recommendation delivery for outcome tracking
        this._recordRecommendation('next_best_step', plan.actionType, plan.topic, plan.section,
            plan.actionText, {
                accuracy: plan.topicAccuracy, attempts: plan.topicAttempts,
                isCorrect: plan.isCorrect, errorCategory: plan.errorCategory
            });

        lines.push('');
        lines.push('---');
        lines.push('**Next best step:**');

        // Only show the action plan line for post-answer/review contexts
        if (plan.isUnanswered) {
            // Unanswered — gentle guidance, no specific action
            lines.push(plan.actionText);
        } else {
            lines.push(plan.actionText);

            // Add contextual reinforcement
            if (plan.actionType === 'targeted_practice' || plan.actionType === 'formula_review' || plan.actionType === 'computation_check') {
                if (!isNaN(plan.topicAccuracy) && plan.topicAccuracy < 60 && plan.topicAttempts >= 3) {
                    lines.push('');
                    lines.push('*Note: ' + plan.topic + ' has been challenging (' + plan.topicAccuracy + '% accuracy). Consistent focused practice on this topic will pay off.*');
                }
            }
            if (plan.actionType === 'concept_review' || plan.actionType === 'classification_practice') {
                lines.push('');
                lines.push('*This kind of targeted review is more efficient than re-reading a chapter — it focuses on the exact boundary that tripped you up.*');
            }
        }

        return lines;
    },

    // ── S124 — Identify safe, evidence-backed learning patterns ──
    // Never predicts pass/fail or estimates readiness.
    // Returns an array of factual observations grounded in learner data.
    _identifyLearningPatterns(q, context) {
        let ctx = context || {};
        let topic = q ? MayLearnerState._normalizeTopic(q.Topic || '') : '';
        let section = q ? (q.Section || '') : '';
        let observations = [];
        let minAttempts = 3; // minimum attempts before any observation is made

        // ── 1. Topic performance from learner state ──
        let topicProgress = null;
        try {
            topicProgress = MayLearnerState.getTopicProgress();
        } catch (e) {}

        // 1a. Strong topic proficiency
        if (topic && topicProgress && topicProgress[topic]) {
            let tp = topicProgress[topic];
            if (tp.totalAttempts >= minAttempts && tp.accuracy >= 85) {
                observations.push({
                    category: 'topic_strength',
                    text: 'You\'re consistently accurate on **' + topic + '** (' + tp.accuracy + '% across ' + tp.totalAttempts + ' attempts). This is a strong area — you can use it as a confidence anchor.',
                    evidence: { topic: topic, accuracy: tp.accuracy, attempts: tp.totalAttempts },
                    safe: true
                });
            }
            // 1b. Persistent low accuracy
            if (tp.totalAttempts >= 5 && tp.accuracy < 60) {
                observations.push({
                    category: 'persistent_weakness',
                    text: '**' + topic + '** has been challenging — ' + tp.accuracy + '% accuracy across ' + tp.totalAttempts + ' attempts. This is an area where focused practice would make the biggest difference right now.',
                    evidence: { topic: topic, accuracy: tp.accuracy, attempts: tp.totalAttempts },
                    safe: true
                });
            }
            // 1c. Improvement trend
            if (tp.totalAttempts >= 4 && tp.recentPct !== null && tp.recentPct >= 75 && tp.accuracy < tp.recentPct && (tp.recentPct - tp.accuracy) >= 10) {
                observations.push({
                    category: 'improving',
                    text: 'You\'re improving on **' + topic + '** — your recent accuracy is ' + tp.recentPct + '% compared to ' + tp.accuracy + '% overall. Whatever you\'re doing is working.',
                    evidence: { topic: topic, recentAccuracy: tp.recentPct, overallAccuracy: tp.accuracy },
                    safe: true
                });
            }
        }

        // ── 2. Misconception patterns from learner data ──
        if (topic) {
            try {
                let data = MayLearnerState.load();
                let patterns = (data.misconceptionPatterns || []).filter(p =>
                    p._topics && p._topics.includes(topic) && p.count >= 2
                );
                if (patterns.length > 0) {
                    let topPattern = patterns[0];
                    let pName = May.PATTERN_NAMES[topPattern.pattern] || topPattern.pattern;
                    observations.push({
                        category: 'recurring_misconception',
                        text: 'I\'ve noticed a recurring pattern: you\'ve had ' + topPattern.count + ' misses involving **' + pName + '**. Recognizing this specific trap is half the battle.',
                        evidence: { pattern: topPattern.pattern, count: topPattern.count },
                        safe: true
                    });
                }
            } catch (e) {}
        }

        // ── 3. Calculation vs. conceptual pattern from current item ──
        if (q && ctx.selectedChoice && ctx.selectedChoice !== q.CorrectChoice) {
            let isCalc = q.CalculationItem || (q.Stem || '').match(/\$/);
            if (isCalc) {
                // Check if there's evidence of repeated calculation issues in this topic
                let calcCount = 0;
                try {
                    let data = MayLearnerState.load();
                    let sessions = data._learnerState ? (data._learnerState.sessions || []) : [];
                    sessions.forEach(s => {
                        if (s.results) {
                            Object.values(s.results).forEach(r => {
                                if (r.topic === q.Topic && r.correct === false) calcCount++;
                            });
                        }
                    });
                } catch (e) {}
                if (calcCount >= 3) {
                    observations.push({
                        category: 'repeated_calculation',
                        text: 'I\'ve seen several calculation misses in ' + topic + '. When you work through the next one, try writing the formula on scratch paper and labeling every input before computing.',
                        evidence: { topic: topic, calcMissCount: calcCount },
                        safe: true
                    });
                }
            }
        }

        // ── Filter: max 3 observations, most relevant first ──
        // Prefer patterns that relate directly to the current question
        let relevanceOrder = ['recurring_misconception', 'persistent_weakness', 'improving',
            'topic_strength', 'repeated_calculation'];
        observations.sort((a, b) => relevanceOrder.indexOf(a.category) - relevanceOrder.indexOf(b.category));
        observations = observations.slice(0, 3);

        return {
            observations: observations,
            count: observations.length,
            hasPatterns: observations.length > 0,
            dataThresholdMet: !!topicProgress
        };
    },

    // ── S124 — Append Patterns I'm Noticing to coaching output ──
    _appendLearningPatterns(lines, q, context) {
        let patterns = this._identifyLearningPatterns(q, context);
        if (!patterns || !patterns.hasPatterns) return lines;

        lines.push('');
        lines.push('---');
        lines.push('**Patterns I\'m noticing:**');

        patterns.observations.forEach(obs => {
            lines.push('- ' + obs.text);
        });

        return lines;
    },

    // ── S125 — Generate evidence-based focus area suggestions ──
    // Converts observed patterns into actionable study priorities.
    // Every suggestion is tied to evidence. Never predicts outcomes.
    _suggestFocusAreas(q, context) {
        let ctx = context || {};
        let topic = q ? MayLearnerState._normalizeTopic(q.Topic || '') : '';
        let section = q ? (q.Section || '') : '';
        let suggestions = [];
        let evidence = {};

        // ── Aggregate evidence from all available sources ──
        let topicProgress = null;
        try { topicProgress = MayLearnerState.getTopicProgress(); } catch (e) {}

        let learnerData = null;
        try { learnerData = MayLearnerState.load(); } catch (e) {}

        let tp = (topic && topicProgress && topicProgress[topic]) ? topicProgress[topic] : null;

        // ── 1. Persistent weakness → Focus priority ──
        if (tp && tp.totalAttempts >= 5 && tp.accuracy < 60) {
            suggestions.push({
                priority: 'high',
                text: 'Focus on **' + topic + '** — ' + tp.accuracy + '% accuracy across ' + tp.totalAttempts + ' attempts. This is your highest-impact area right now.',
                evidence: { topic: topic, accuracy: tp.accuracy, attempts: tp.totalAttempts, threshold: 'persistent_weakness' }
            });
        }

        // ── 2. Calculation misses recurring → Focus area ──
        if (ctx.selectedChoice && q && ctx.selectedChoice !== q.CorrectChoice) {
            let isCalc = q.CalculationItem || (q.Stem || '').match(/\$/);
            if (isCalc) {
                suggestions.push({
                    priority: 'medium',
                    text: 'Complete 5–10 more practice problems on **' + topic + '** calculations. Set up each formula on scratch paper before looking at the choices.',
                    evidence: { topic: topic, reason: 'calculation_error', source: 'current_answer' }
                });
            }
        }

        // ── 3. Misconception pattern → Targeted review ──
        try {
            if (learnerData && topic) {
                let patterns = (learnerData.misconceptionPatterns || []).filter(p =>
                    p._topics && p._topics.includes(topic) && p.count >= 2
                );
                if (patterns.length > 0) {
                    let topPattern = patterns[0];
                    let area = May.PATTERN_NAMES[topPattern.pattern] || topPattern.pattern;
                    suggestions.push({
                        priority: 'medium',
                        text: 'Review **' + area + '** — you\'ve had ' + topPattern.count + ' misses involving this pattern. Focusing on the boundary between the correct rule and the trap will close this gap.',
                        evidence: { pattern: topPattern.pattern, count: topPattern.count, type: 'misconception' }
                    });
                }
            }
        } catch (e) {}

        // ── 4. Topic strength → Maintain, extend ──
        if (tp && tp.totalAttempts >= 3 && tp.accuracy >= 85 && !suggestions.some(s => s.evidence && s.evidence.threshold === 'persistent_weakness')) {
            let sectionName = May.SECTION_NAMES[section] || '';

            // Find the weakest adjacent topic to suggest
            let weakestTopic = null;
            let weakestAcc = 100;
            if (learnerData && topicProgress) {
                Object.entries(topicProgress).forEach(([t, d]) => {
                    if (t !== topic && d.totalAttempts >= 3 && d.accuracy < weakestAcc) {
                        weakestAcc = d.accuracy;
                        weakestTopic = t;
                    }
                });
            }

            if (weakestTopic && weakestAcc < 70) {
                suggestions.push({
                    priority: 'low',
                    text: 'You\'re solid on **' + topic + '** (' + tp.accuracy + '%). Consider shifting some practice time to **' + weakestTopic + '** (' + weakestAcc + '%), where a focused effort could raise your overall coverage.',
                    evidence: { strongTopic: topic, weakTopic: weakestTopic, weakAccuracy: weakestAcc }
                });
            } else if (sectionName) {
                suggestions.push({
                    priority: 'low',
                    text: 'Continue reinforcing **' + topic + '** (' + tp.accuracy + '%) — this is a reliable strength. Use it as a confidence anchor when working through ' + sectionName + '.',
                    evidence: { topic: topic, accuracy: tp.accuracy, type: 'topic_strength' }
                });
            }
        }

        // ── 5. Improving trend → Keep doing what works ──
        if (tp && tp.totalAttempts >= 4 && tp.recentPct !== null && tp.recentPct >= 75 &&
            tp.accuracy < tp.recentPct && (tp.recentPct - tp.accuracy) >= 10) {
            suggestions.push({
                priority: 'low',
                text: 'Keep reinforcing **' + topic + '** — you\'re on an upward trend (recent ' + tp.recentPct + '% vs. ' + tp.accuracy + '% overall). Whatever approach you\'re using is working.',
                evidence: { topic: topic, recentAccuracy: tp.recentPct, overallAccuracy: tp.accuracy, type: 'improving' }
            });
        }

        // ── Cap at 3 suggestions, ordered by priority ──
        let priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
        suggestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        suggestions = suggestions.slice(0, 3);

        return {
            suggestions: suggestions,
            count: suggestions.length,
            hasSuggestions: suggestions.length > 0,
            evidenceSources: Object.keys(evidence)
        };
    },

    // ── S125 — Append Suggested Focus Areas to coaching output ──
    _appendFocusAreas(lines, q, context) {
        let result = this._suggestFocusAreas(q, context);
        if (!result || !result.hasSuggestions) return lines;

        // S129 — Record each focus area recommendation
        result.suggestions.forEach(s => {
            let ev = s.evidence || {};
            this._recordRecommendation('focus_area', s.priority || 'medium',
                ev.topic || (q ? MayLearnerState._normalizeTopic(q.Topic || '') : ''),
                q ? q.Section : null, s.text, ev);
        });

        lines.push('');
        lines.push('---');
        lines.push('**Suggested focus areas:**');

        result.suggestions.forEach(s => {
            let marker = s.priority === 'high' ? '🔴 ' : (s.priority === 'medium' ? '🟡 ' : '🟢 ');
            lines.push('- ' + marker + s.text);
        });

        return lines;
    },

    // ── S120 — Build tutor-layer explanation structure ─────
    // Extracts: short answer, tested concept, why it works,
    // common trap, pattern recognition, review focus.
    // Always includes the official ExplanationCorrect as source grounding.
    // Returns an object with all sections; _explainAnswer assembles
    // them into a learner-friendly output.
    _buildTutorExplanation(question) {
        let q = question;
        if (!q) return null;

        let hasChoices = q.Choices && typeof q.Choices === 'object' && Object.keys(q.Choices).length > 0;
        let cc = q.CorrectChoice;
        let correctText = hasChoices ? (q.Choices[cc] || '') : (q.Correct || '');
        let explanation = q.ExplanationCorrect || '';
        let topic = MayLearnerState._normalizeTopic(q.Topic || 'this concept');
        let section = q.Section || '';
        let difficulty = q.Difficulty || 'Moderate';
        let stem = q.Stem || '';
        let isCalculation = !!(q.CalculationItem || (stem || '').match(/\$/));

        let sectionName = May.SECTION_NAMES[section] || '';

        let result = {
            shortAnswer: '',
            testedConcept: '',
            whyItWorks: '',
            commonTrap: '',
            patternRecognition: '',
            reviewFocus: '',
            sourceExplanationIncluded: false
        };

        // 1. Short answer — May's own tutoring voice
        if (hasChoices && cc) {
            result.shortAnswer = `The correct answer is **${cc}**: "${correctText}".`;
        } else {
            result.shortAnswer = `The correct answer is "${correctText}".`;
        }

        // 2. What this question is testing
        let conceptLines = [];
        conceptLines.push(`This question tests **${topic}** (Section ${section} — ${sectionName}).`);
        if (difficulty) conceptLines.push(`Difficulty: ${difficulty}.`);
        if (isCalculation) {
            conceptLines.push('It is a calculation item — you need to identify the right formula and apply the numbers from the stem.');
        } else {
            conceptLines.push('It is a conceptual item — you need to recall the governing rule or principle and match it to the scenario.');
        }
        result.testedConcept = conceptLines.join(' ');

        // 3. Why the correct answer works — bank explanation + interpretation
        let whyLines = [];
        if (explanation && explanation.length > 30) {
            whyLines.push(explanation);
            whyLines.push('');
            whyLines.push('*In other words:* ' + this._interpretExplanation(explanation, topic, isCalculation));
            result.sourceExplanationIncluded = true;
        } else {
            // Thin explanation — use safe fallback
            whyLines.push('The bank explanation is brief, so I\'ll keep this grounded in the topic, choices, and correct answer without inventing extra facts.');
            whyLines.push('');
            whyLines.push(`This question tests **${topic}**${section ? ' from ' + sectionName : ''}.`);
            if (correctText.includes('$') || (correctText.match && correctText.match(/\d+/))) {
                whyLines.push('The correct answer is determined by applying the relevant formula with the values given in the question.');
            } else {
                whyLines.push(`The correct choice reflects the proper accounting treatment for ${topic} under U.S. GAAP.`);
            }
        }
        result.whyItWorks = whyLines.join('\n');

        // 4. The common trap
        result.commonTrap = this._inferCommonTrap(q, topic, isCalculation);

        // 5. How to recognize this pattern next time
        result.patternRecognition = this._inferPatternRecognition(q, topic, section, isCalculation);

        // 6. Review focus
        result.reviewFocus = this._inferReviewFocus(q, topic, section);

        return result;
    },

    // Extract a plain-language interpretation of the bank explanation.
    _interpretExplanation(explanation, topic, isCalculation) {
        if (!explanation) return '';
        let sentences = explanation.split(/[.!?]\s+/).filter(s => s.trim().length > 0);
        if (sentences.length === 0) return 'Review the key principle for ' + topic + '.';
        // Find the sentence with the clearest reasoning signal
        let signalWords = ['because', 'therefore', 'thus', 'as a result', 'since', 'under', 'according to'];
        let keySentence = sentences.find(s => signalWords.some(w => s.toLowerCase().includes(w)));
        // Fall back to first sentence
        if (!keySentence) keySentence = sentences[0];
        // Shorten if very long
        if (keySentence.length > 200) keySentence = keySentence.substring(0, 197) + '...';
        if (isCalculation) {
            return 'This calculation follows the standard formula — ' + keySentence.toLowerCase();
        }
        return keySentence;
    },

    // Infer a common trap from the question structure.
    _inferCommonTrap(q, topic, isCalculation) {
        let cc = q.CorrectChoice;
        let choices = q.Choices || {};
        let wrongLetters = Object.keys(choices).filter(l => l !== cc);
        let wrongExplanations = wrongLetters.map(l => q['ExplanationWrong' + l] || '').filter(e => e.length > 10);

        // If we have wrong-answer explanations, summarize the most common trap
        if (wrongExplanations.length > 0) {
            let trapText = wrongExplanations[0];
            // Look for trap-signal words in the wrong explanations
            let trapSignals = ['confuse', 'mistake', 'overlook', 'misclassif', 'incorrectly', 'forget', 'reversed', 'inverted', 'instead of', 'rather than'];
            for (let we of wrongExplanations) {
                for (let signal of trapSignals) {
                    if (we.toLowerCase().includes(signal)) {
                        trapText = we;
                        break;
                    }
                }
            }
            // Truncate long trap text
            if (trapText.length > 250) trapText = trapText.substring(0, 247) + '...';
            return '**Common trap:** ' + trapText;
        }

        // Generic traps by question type when no wrong-explanations exist
        if (isCalculation) {
            let calcTraps = [
                '**Common trap:** Using the wrong formula or plugging numbers into the wrong position — always identify the formula first, then extract each value from the stem before computing.',
                '**Common trap:** Mixing up which numbers go where in the calculation. Write the formula down, label each input, and then plug the stem values in one at a time.',
                '**Common trap:** Forgetting to account for all relevant data from the stem. Re-read the question to confirm every number used in your calculation comes from the right source.'
            ];
            return calcTraps[Math.floor(Math.random() * calcTraps.length)];
        }

        let conceptTraps = [
            '**Common trap:** Choosing an answer that sounds reasonable but misapplies the rule for ' + topic + '. Always anchor your reasoning in the specific standard, not general intuition.',
            '**Common trap:** Overlooking a key qualifier in the stem — words like "not," "except," "least," or "most likely" change what the question is asking.',
            '**Common trap:** Confusing related but distinct concepts. ' + topic + ' has specific criteria — make sure you\'re applying the right one to this scenario.',
            '**Common trap:** Picking a distractor that uses familiar language but in the wrong context. Eliminate by checking each option against the actual rule, not against what sounds familiar.'
        ];
        return conceptTraps[Math.floor(Math.random() * conceptTraps.length)];
    },

    // Suggest how to recognize this pattern in future questions.
    _inferPatternRecognition(q, topic, section, isCalculation) {
        if (isCalculation) {
            return '**How to spot it next time:** Look for questions that ask you to compute a value from the stem data. Identify the topic keyword (e.g., "' + topic + '"), recall the formula, extract each input, and work through the arithmetic step by step on scratch paper.';
        }

        let patternMap = {
            'A': 'Look for questions about recognition, measurement, or classification under U.S. GAAP. The key is knowing which standard applies and how it directs the treatment.',
            'B': 'Budgeting and forecasting questions often present a sequence. Identify where in the master budget process the item belongs, and which components feed into it.',
            'C': 'Performance measurement questions hinge on variance formulas or balanced scorecard perspectives. Identify the framework first, then match the scenario facts.',
            'D': 'Cost management questions test classification and allocation. Determine the cost type (fixed vs. variable, direct vs. indirect) before choosing the method.',
            'E': 'Internal controls questions follow COSO. Map the scenario to a component (control environment, risk assessment, control activities, information & communication, monitoring) to identify the weakness or remedy.',
            'F': 'Technology questions test systems and data concepts. Identify the business problem first — the correct answer ties the technology to the accounting objective described in the stem.'
        };
        let base = patternMap[section] || 'Recognize the topic keyword in the stem and recall the governing rule or framework. Match the scenario facts to the standard, not to what feels familiar.';
        return '**How to spot it next time:** ' + base;
    },

    // Suggest what to review if the learner missed this.
    _inferReviewFocus(q, topic, section) {
        let hasExplanation = q.ExplanationCorrect && q.ExplanationCorrect.length > 30;
        let sectionTopics = {
            'A': hasExplanation ? 'Review the relevant standards for recognition, measurement, and disclosure requirements. Focus on classification rules — current vs. noncurrent, operating vs. investing vs. financing.' : 'Review the core recognition and measurement principles for ' + topic + '. Focus on classification rules and the specific treatment this question tests.',
            'B': 'Review the master budget sequence: sales budget → production budget → DM/DL/OH budgets → cash budget. Know which components feed each budget.',
            'C': 'Review variance formulas (price, quantity, rate, efficiency) and balanced scorecard perspectives. Practice computing and interpreting both favorable and unfavorable variances.',
            'D': 'Review cost behavior (fixed vs. variable), cost allocation methods, and decision frameworks (make-or-buy, special order, keep-or-drop). Know when each applies.',
            'E': hasExplanation ? 'Review the five COSO components and their principles. Practice identifying control weaknesses and matching them to the right component.' : 'Review internal control frameworks and their components. Practice identifying control weaknesses and matching them to the right principles.',
            'F': 'Review IT governance, data management concepts, and systems controls. Focus on how technology supports accounting processes and internal control.'
        };

        let topicProgress = MayLearnerState.getTopicProgress();
        let tp = topicProgress[topic];
        let accuracyNote = '';
        if (tp && tp.totalAttempts >= 2) {
            accuracyNote = ' You\'re currently at ' + tp.accuracy + '% on this topic after ' + tp.totalAttempts + ' attempts.';
        }

        return '**If you missed it, review this:** ' + (sectionTopics[section] || 'Review the core concepts and governing standards for ' + topic + '. Focus on understanding why each distractor is wrong — that is where the deepest reinforcement happens.') + accuracyNote;
    },

    _explainAnswer() {
        let q = this.context.currentQuestion;
        if (!q) { this._speak("I don't have a question to explain right now. Start a review from a practice session first."); return; }

        // S120 — Build tutor-layer explanation structure
        let tutor = this._buildTutorExplanation(q);
        if (!tutor) { this._speak("I don't have enough context to explain this question."); return; }

        let topic = MayLearnerState._normalizeTopic(q.Topic || 'this concept');

        // ── S123 — Determine learner context for action plan ──
        let selectedChoice = null;
        try {
            if (typeof state !== 'undefined' && state.session && state.session.answers) {
                selectedChoice = state.session.answers[q.QuestionID] || null;
            }
        } catch (e) {}

        let lines = [];

        // 1. Short answer
        lines.push(tutor.shortAnswer);
        lines.push('');

        // 2. What this is testing
        lines.push('**What this is testing:**');
        lines.push(tutor.testedConcept);
        lines.push('');

        // 3. Why the answer works (includes bank explanation)
        lines.push('**Why the answer works:**');
        lines.push(tutor.whyItWorks);
        lines.push('');

        // 4. Common trap
        lines.push(tutor.commonTrap);
        lines.push('');

        // 5. Pattern recognition
        lines.push(tutor.patternRecognition);
        lines.push('');

        // 6. Review focus
        lines.push(tutor.reviewFocus);

        // Topic progress note
        let topicProgress = MayLearnerState.getTopicProgress();
        let tp = topicProgress[topic];
        if (tp && tp.totalAttempts >= 2) {
            lines.push('');
            lines.push(`*Note: You've seen ${topic} ${tp.totalAttempts} times across sessions (${tp.accuracy}% correct overall).*`);
        }

        // Session 94 — Case-specific coaching notes
        let isCaseItem = this.context.currentCaseItemType === 'case';
        if (isCaseItem && this.context.currentCase) {
            let reviewItem = this.context.reviewQuestions.find(r =>
                r.type === 'case' && r.question.QuestionID === q.QuestionID
            );
            let itemIndex = reviewItem ? reviewItem.itemIndex : 0;
            let whatMattered = this._caseWhatMattered(this.context.currentCase, itemIndex);
            let approachNote = this._caseApproachNote(this.context.currentCase, itemIndex);
            if (whatMattered) {
                lines.push('');
                lines.push(whatMattered);
            }
            if (approachNote) {
                lines.push('');
                lines.push(approachNote);
            }
        }

        // S123 — Append next best step action plan
        if (selectedChoice || true) { // always append context-aware action for Explain
            lines = this._appendNextBestStep(lines, q, { selectedChoice: selectedChoice });
        }

        // S124 — Append learning patterns
        lines = this._appendLearningPatterns(lines, q, { selectedChoice: selectedChoice });

        // S125 — Append suggested focus areas
        lines = this._appendFocusAreas(lines, q, { selectedChoice: selectedChoice });

        // S76 — Add Socratic follow-up on first explanation of this QID
        let socraticAdded = false;
        if (q && q.QuestionID) {
            this._explainedQIDs = this._explainedQIDs || new Set();
            if (!this._explainedQIDs.has(q.QuestionID)) {
                this._explainedQIDs.add(q.QuestionID);
                let followUp = this._socraticFollowUp(q);
                if (followUp) { lines.push('\n---\n*' + followUp + '*'); socraticAdded = true; }
            }
        }

        // S111 — Pilot path: guarded speak for safety checking
        if (this.isPilotEnvironment()) {
            this._guardedSpeak(lines, 'explain');
        } else {
            this._speak(lines.join('\n'));
        }

        // S76 — If not first explanation, suggest next step
        if (!socraticAdded) {
            this._appendNextStep(q);
        }
    },

    // S76 — Generate a Socratic follow-up question after explanations
    _socraticFollowUp(q) {
        if (!q) return null;
        let topic = MayLearnerState._normalizeTopic(q.Topic || '');
        let section = q.Section || '';

        let prompts = [
            'What if the question asked for the opposite — how would your approach change?',
            'Can you explain in your own words why the correct answer works but the most tempting wrong answer doesn\'t?',
            'If you saw a similar question on the exam, what\'s the first thing you\'d check?',
            'What concept from Section ' + section + ' does this question rely on most heavily?'
        ];

        if (topic.toLowerCase().includes('variance')) {
            prompts.push('Which variance formula would you use if the actual quantity was higher instead of lower?');
        } else if (topic.toLowerCase().includes('cash') || topic.toLowerCase().includes('budget')) {
            prompts.push('What would happen to the cash position if collections slowed by one week?');
        } else if (topic.toLowerCase().includes('control') || topic.toLowerCase().includes('coso')) {
            prompts.push('Which COSO component would be most impacted if this control failed?');
        } else if (topic.toLowerCase().includes('cost') || topic.toLowerCase().includes('overhead')) {
            prompts.push('Would your answer change if the company used activity-based costing instead?');
        }

        return prompts[Math.floor(Math.random() * prompts.length)];
    },

    // S76 — Suggest what to do after a major response
    _appendNextStep(q) {
        if (!q) return;
        let suggestions = [];
        if (q.Choices && q.CorrectChoice) {
            suggestions.push('Ask me to **explain the wrong choices**');
        }
        suggestions.push('Try a **similar question** on this topic');
        let topic = MayLearnerState._normalizeTopic(q.Topic || 'this topic');
        suggestions.push('Ask me to **quiz you** on ' + topic);

        let pick = suggestions[Math.floor(Math.random() * 2)];
        this._speak('\n**What\'s next?** ' + pick + '.');
    },

    // ============================================================
    // B. Wrong-choice misconception coaching
    // ============================================================

    // Build structured misconception coaching for each wrong answer.
    // Uses official ExplanationWrong as source-ground, adds learner-centered
    // coaching: why tempting, why wrong, misconception, how to avoid.
    _buildWrongChoiceCoaching(question, context) {
        let q = question;
        if (!q) return null;
        let cc = q.CorrectChoice;
        let choices = q.Choices || {};
        let letters = Object.keys(choices).sort();
        let topic = MayLearnerState._normalizeTopic(q.Topic || 'this topic');
        let section = q.Section || '';
        let stem = q.Stem || '';
        let correctText = choices[cc] || (q.Correct || '');
        let isCalculation = !!(q.CalculationItem || (stem || '').match(/\$/));
        let contextRef = context || {};

        let sectionName = May.SECTION_NAMES[section] || '';

        let wrongLetters = letters.filter(l => l !== cc);
        let selectedChoice = contextRef.selectedChoice || null;

        // Order: selected wrong answer first, then the rest alphabetically
        let orderedLetters = [];
        if (selectedChoice && wrongLetters.includes(selectedChoice)) {
            orderedLetters.push(selectedChoice);
            wrongLetters.filter(l => l !== selectedChoice).forEach(l => orderedLetters.push(l));
        } else {
            orderedLetters = wrongLetters;
        }

        let results = [];
        let allSelectionSafe = contextRef.isReviewMode || contextRef.hasAttempted;

        for (let l of orderedLetters) {
            let choiceText = choices[l] || ('Option ' + l);
            let wrongExp = q['ExplanationWrong' + l] || '';
            let hasExplanation = wrongExp && wrongExp.length > 10;

            // Infer why this choice is tempting
            let whyTempting = this._inferWhyTempting(q, l, choiceText, topic, isCalculation);

            // Why it's wrong — grounded in bank text first, then safe fallback
            let whyWrong;
            let sourceExplanationIncluded = false;
            if (hasExplanation) {
                whyWrong = wrongExp;
                sourceExplanationIncluded = true;
            } else {
                whyWrong = this._inferWhyWrongFallback(q, l, choiceText, topic, correctText);
            }

            // Misconception — the thinking error
            let misconception = this._inferMisconception(q, l, choiceText, topic, wrongExp, isCalculation);

            // How to avoid it next time
            let avoidNextTime = this._inferAvoidNextTime(q, l, topic, section, isCalculation);

            results.push({
                choiceLabel: l,
                choiceText: choiceText,
                whyTempting: whyTempting,
                whyWrong: whyWrong,
                misconception: misconception,
                avoidNextTime: avoidNextTime,
                sourceExplanationIncluded: sourceExplanationIncluded,
                safeFallbackUsed: !hasExplanation,
                isSelectedAnswer: (l === selectedChoice)
            });
        }

        return {
            choices: results,
            selectedFirst: (selectedChoice && wrongLetters.includes(selectedChoice)),
            allSelectionSafe: allSelectionSafe,
            topic: topic,
            sectionName: sectionName,
            isCalculation: isCalculation
        };
    },

    // Infer why a distractor looks plausible.
    _inferWhyTempting(q, choiceLetter, choiceText, topic, isCalculation) {
        let stem = q.Stem || '';
        let stemWords = stem.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 3);
        let choiceTokens = choiceText.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w.length > 3);

        // Check if choice matches a keyword in the stem
        let overlap = choiceTokens.filter(t => stemWords.includes(t));
        if (overlap.length >= 2) {
            return 'This option uses language from the stem and may seem like the direct answer. It mirrors key terms — which can trick learners into thinking it matches the question.';
        }

        // Check for numbers in choice (calculation distractor)
        if (isCalculation && /\d/.test(choiceText)) {
            return 'This option gives a number that could result from a plausible but incorrect formula setup — an easy trap when you compute quickly without verifying each step.';
        }

        // Check for common distractor patterns
        let patterns = [
            { keys: ['always', 'never', 'all', 'none', 'only', 'must'], trap: 'This option uses absolute language ("always"/"never"/"must"), which can sound authoritative even if it is not the correct treatment.' },
            { keys: ['increase', 'decrease', 'higher', 'lower', 'more', 'less'], trap: 'This option plays on directional intuition — it sounds right in the context of the stem numbers but applies the wrong relationship.' },
            { keys: ['asset', 'liability', 'equity', 'revenue', 'expense'], trap: 'This option uses a familiar accounting classification but in the wrong category — the classification sounds right until you check the specific rule.' },
            { keys: ['direct', 'indirect', 'variable', 'fixed', 'operating', 'financing'], trap: 'This option works with a related but different classification method — the terminology is correct for *some* context, just not this one.' },
            { keys: ['control', 'risk', 'monitor', 'prevent', 'detect'], trap: 'This option references a real internal control concept but applies it to the wrong COSO component or control type. The boundary between components is often a tested trap.' }
        ];

        for (let p of patterns) {
            if (p.keys.some(k => choiceTokens.includes(k))) {
                return p.trap;
            }
        }

        return 'At a glance, this option sounds reasonable for ' + topic + '. The distractor is designed to catch learners who recognize the topic but haven\'t fully nailed down the specific rule.';
    },

    // Safe fallback for why-wrong when ExplanationWrong is thin.
    _inferWhyWrongFallback(q, choiceLetter, choiceText, topic, correctText) {
        let topicPhrase = topic;
        // Keep it grounded — contrast with the concept, not reveal the answer
        return 'This choice does not match the correct accounting treatment for ' + topicPhrase + '. When you trace the governing rule back to the specific standard, this option falls away — it misapplies or misclassifies the concept the stem is testing.';
    },

    // Infer the conceptual error (misconception) behind choosing this option.
    _inferMisconception(q, choiceLetter, choiceText, topic, wrongExp, isCalculation) {
        // If ExplanationWrong provides a clue, extract it
        if (wrongExp && wrongExp.length > 20) {
            let misSig = ['confus', 'mistake', 'overlook', 'misclassif', 'incorrectly', 'forget', 'reversed', 'instead of'];
            for (let sig of misSig) {
                let idx = wrongExp.toLowerCase().indexOf(sig);
                if (idx >= 0) {
                    let snippet = wrongExp.substring(Math.max(0, idx - 20), Math.min(wrongExp.length, idx + 120));
                    return 'The trap here is ' + snippet.trim() + (snippet.endsWith('.') ? '' : '.') + ' Watch for this boundary next time.';
                }
            }
        }

        // Generic section-aligned misconceptions
        let sectionMap = {
            'A': 'This choice reflects a reporting classification error — mixing up where and how the item appears in the financial statements.',
            'B': 'This choice confuses the sequence or dependency in the budget process — treating a downstream component as if it came first.',
            'C': 'This choice applies the wrong variance formula or uses the wrong benchmark — a common calculation-pattern error.',
            'D': 'This choice misclassifies the cost behavior (fixed vs. variable, direct vs. indirect) or applies the wrong allocation method.',
            'E': 'This choice assigns a control weakness to the wrong COSO component or confuses preventive and detective controls.',
            'F': 'This choice conflates technology concepts — applying a system term or data method that does not match the accounting objective in the stem.'
        };

        return sectionMap[q.Section] || 'This choice reflects a conceptual misunderstanding of ' + topic + ' — picking an answer that sounds correct but misapplies the specific rule or principle.';
    },

    // Pattern-recognition tip for avoiding this trap next time.
    _inferAvoidNextTime(q, choiceLetter, topic, section, isCalculation) {
        if (isCalculation) {
            return 'Write the formula first and label every input before computing. Check that each number you used came from the stem and is not from a similar but different scenario.';
        }

        let tipMap = {
            'A': 'When you see classification questions, ask: *What is the transaction? Where does it belong under the standard?* Eliminate options that classify it in the wrong category.',
            'B': 'Map the question to its position in the master budget flow. If the stem mentions multiple departments or cost elements, trace which feeds which.',
            'C': 'Identify the variance type from the stem keywords (price, quantity, rate, efficiency). Then recall the specific formula — don\'t guess from memory.',
            'D': 'Determine the cost type first (fixed/variable, direct/indirect) and then check which decision framework the stem scenario fits. The framework dictates the treatment.',
            'E': 'Map the scenario to a COSO component by asking: *What went wrong? Is this about the control environment, risk assessment, control activities, information, or monitoring?* The answer to that question eliminates the wrong options.',
            'F': 'Separate the technology terms from the business problem. The correct answer always connects the tech to the accounting objective — options that sound technical but don\'t serve the business goal are traps.'
        };

        return tipMap[section] || 'Look for the key phrase in the stem that signals which rule or framework applies. Eliminate options that reference concepts from a different topic — they may sound correct but belong elsewhere.';
    },

    _explainWrongChoices() {
        let q = this.context.currentQuestion;
        if (!q) { this._speak("I don't have a question to work with. Start a review first."); return; }

        let hasChoices = q.Choices && typeof q.Choices === 'object' && Object.keys(q.Choices).length > 0;
        if (!hasChoices) {
            this._speak("This item doesn't have multiple-choice options to review. Use **Explain answer** to see the correct result.");
            return;
        }

        // ── Determine context: has the learner attempted? Are we in review mode? ──
        let selectedChoice = null;
        let hasAttempted = false;
        let isReviewMode = false;
        try {
            if (typeof state !== 'undefined' && state.session) {
                if (state.session.answers && state.session.answers[q.QuestionID]) {
                    selectedChoice = state.session.answers[q.QuestionID];
                    hasAttempted = true;
                }
                if (state.session.completed) {
                    isReviewMode = true;
                }
            }
        } catch (e) { /* no state — assume not attempted */ }

        // ── Gate: unanswered active question — provide strategy only ──
        if (!hasAttempted && !isReviewMode) {
            let topic = MayLearnerState._normalizeTopic(q.Topic || 'this topic');
            let stem = q.Stem || '';
            let isCalc = !!(q.CalculationItem || (stem || '').match(/\$/));

            let strategyLines = [];
            strategyLines.push("I can help you evaluate the options without giving away the answer. After you submit, I'll break down each wrong choice and the trap behind it.\n");
            strategyLines.push('**While you\'re working on this question:**');
            if (isCalc) {
                strategyLines.push('- Write the formula first, then plug in each number from the stem one at a time.');
                strategyLines.push('- Check that every number you\'re using comes from the right place — not from a similar but different calculation.');
                strategyLines.push('- Watch for distractor numbers that come from an incorrect formula setup — they look plausible but use the wrong operation or the wrong inputs.');
            } else {
                strategyLines.push('- Read each option against the exact condition in the stem — not just the general topic.');
                strategyLines.push('- Look for qualifier words like "always," "never," "except," or "most" — they change what the question is asking.');
                strategyLines.push('- Eliminate options one at a time by checking: *Does this match the specific rule or standard for ' + topic + '?*');
            }
            strategyLines.push('- After you submit your answer, come back and I\'ll walk through each wrong choice in detail.');

            if (this.isPilotEnvironment()) {
                this._guardedSpeak(strategyLines, 'wrong-choices');
            } else {
                this._speak(strategyLines.join('\n'));
            }
            return;
        }

        // ── Build structured coaching for each wrong choice ──
        let coaching = this._buildWrongChoiceCoaching(q, {
            selectedChoice: selectedChoice,
            hasAttempted: hasAttempted,
            isReviewMode: isReviewMode
        });

        if (!coaching || !coaching.choices || coaching.choices.length === 0) {
            this._speak("I don't have wrong-choice data to break down for this item.");
            return;
        }

        let parts = [];

        // ── Review mode or post-answer: full coaching output ──
        if (isReviewMode) {
            parts.push('Let\'s use this review as a learning opportunity. Here is what each distractor teaches us:\n');
        } else if (coaching.selectedFirst) {
            parts.push('Let\'s start with the answer you chose — then look at the others so you can spot the traps next time.\n');
        } else {
            parts.push('Let\'s look at the distractors as learning clues:\n');
        }

        for (let entry of coaching.choices) {
            parts.push('---');
            parts.push(`**Choice ${entry.choiceLabel}**${entry.isSelectedAnswer ? ' *(your answer)*' : ''} — "${entry.choiceText}"`);
            parts.push('');

            // Why it is tempting
            parts.push('**Why it is tempting:**');
            parts.push(entry.whyTempting);
            parts.push('');

            // Why it is not correct
            parts.push('**Why it is not correct:**');
            parts.push(entry.whyWrong);
            parts.push('');

            // Misconception
            parts.push('**Misconception to watch:**');
            parts.push(entry.misconception);
            parts.push('');

            // How to avoid
            parts.push('**How to avoid it next time:**');
            parts.push(entry.avoidNextTime);
            parts.push('');
        }

        // ── Review-mode bonus: help the learner connect to the correct answer ──
        if (isReviewMode) {
            let topic = coaching.topic;
            parts.push('---');
            parts.push('**Pulling it together:** Each wrong option teaches you something about the boundary of the correct concept. Understanding *why each option is wrong* is often deeper reinforcement than reviewing the right answer alone. If you want me to walk through the correct answer, just ask me to **Explain**.');
        }

        // S76 — Misconception summary
        if (coaching && coaching.topic) {
            let cc = q.CorrectChoice;
            let correctText = (q.Choices && q.Choices[cc]) ? q.Choices[cc] : '';
            let wrongChoices = coaching.choices || [];
            let mostTempting = null;
            if (wrongChoices.length > 0) {
                mostTempting = wrongChoices[0].choiceText;
            }
            if (mostTempting && correctText) {
                parts.push('\n**The most common trap here:** Candidates often confuse ' + coaching.topic + ' concepts — specifically ' + mostTempting.substring(0, 60) + '. The key distinction is whether you\'re looking at the core definition or a related-but-separate rule.');
            }
        }

        // S123 — Append next best step action plan
        parts = this._appendNextBestStep(parts, q, { selectedChoice: selectedChoice });

        // S124 — Append learning patterns
        parts = this._appendLearningPatterns(parts, q, { selectedChoice: selectedChoice });

        // S125 — Append suggested focus areas
        parts = this._appendFocusAreas(parts, q, { selectedChoice: selectedChoice });

        if (this.isPilotEnvironment()) {
            this._guardedSpeak(parts, 'wrong-choices');
        } else {
            this._speak(parts.join('\n'));
        }

        // S76 — Suggest next step
        this._appendNextStep(q);
    },

    // ============================================================
    // C. Hint mode — graduated hints
    // ============================================================

    _provideHint() {
        let q = this.context.currentQuestion;
        if (!q) { this._speak("I don't have a question to hint on. Start a review first."); return; }

        let level = this.context.hintLevel;
        let cc = q.CorrectChoice;
        let topic = MayLearnerState._normalizeTopic(q.Topic || 'this concept');
        let difficulty = q.Difficulty || 'Moderate';
        let isCaseItem = this.context.currentCaseItemType === 'case';
        let caseObj = this.context.currentCase;

        let hint;
        if (level >= 4) {
            // Full explanation
            this._explainAnswer();
            this.context.hintLevel = 0; // reset for next question
            return;
        }

        // Session 94 — Dispatch to case-specific hints for case items
        if (isCaseItem && caseObj) {
            let levelLabel = '';
            switch (level) {
                case 0: hint = this._caseMetacognitiveHint(q, caseObj, topic, difficulty); levelLabel = 'Metacognitive'; break;
                case 1: hint = this._caseConceptHint(q, caseObj, topic); levelLabel = 'Concept'; break;
                case 2: hint = this._caseStrategyHint(q, caseObj, topic); levelLabel = 'Strategy'; break;
                case 3: hint = this._caseEliminationHint(q, caseObj); levelLabel = 'Elimination'; break;
                default: hint = "Let me walk you through the full case reasoning."; levelLabel = 'Reasoning';
            }
            this.context.hintLevel++;
            this.context._liveHintCount = (this.context._liveHintCount || 0) + 1;
            if (q.QuestionID) {
                if (!this.context._sessionHints) this.context._sessionHints = {};
                this.context._sessionHints[q.QuestionID] = (this.context._sessionHints[q.QuestionID] || 0) + 1;
            }
            // S111 — Pilot path
            let caseHintText = `**Hint ${level + 1} of 5 — ${levelLabel}**\n\n${hint}\n\n*Want more? Tap "Hint" again, or ask for the full explanation.*`;
            if (this.isPilotEnvironment()) {
                this._guardedSpeak(caseHintText, 'hint');
            } else {
                this._speak(caseHintText);
            }
            return;
        }

        // Original MCQ hint dispatch
        switch (level) {
            case 0: // Metacognitive
                hint = this._metacognitiveHint(q, topic, difficulty);
                break;
            case 1: // Concept reminder
                hint = this._conceptHint(q, topic);
                break;
            case 2: // Strategic
                hint = this._strategyHint(q, topic);
                break;
            case 3: // Elimination
                hint = this._eliminationHint(q, cc);
                break;
            default:
                hint = "Let me walk you through the full reasoning.";
        }

        // S76 — For the FIRST hint on a question, prepend a Socratic question
        if (level === 0 && q.QuestionID) {
            this._hintCountPerQID = this._hintCountPerQID || {};
            this._hintCountPerQID[q.QuestionID] = (this._hintCountPerQID[q.QuestionID] || 0) + 1;
            if (this._hintCountPerQID[q.QuestionID] === 1) {
                let socraticQ = this._socraticFollowUp(q);
                if (socraticQ) {
                    hint = '**Think about this first:** ' + socraticQ + '\n\n' + hint;
                }
            }
        }

        this.context.hintLevel++;
        this.context._liveHintCount = (this.context._liveHintCount || 0) + 1;
        if (q.QuestionID) {
            if (!this.context._sessionHints) this.context._sessionHints = {};
            this.context._sessionHints[q.QuestionID] = (this.context._sessionHints[q.QuestionID] || 0) + 1;
        }
        // S111 — Pilot path
        let mcqHintText = `**Hint ${level + 1} of 5**\n\n${hint}\n\n*Want more? Tap "Hint" again, or ask for the full explanation.*`;
        if (this.isPilotEnvironment()) {
            this._guardedSpeak(mcqHintText, 'hint');
        } else {
            this._speak(mcqHintText);
        }

        // S76 — Suggest next step after hint
        this._appendNextStep(q);
    },

    _metacognitiveHint(q, topic, diff) {
        let prompts = [
            `Before diving into the numbers, pause and ask: what is this question really testing? It's about **${topic}**. What rule or principle governs this area?`,
            `Take a breath and re-read the stem. The key word or phrase that tells you what concept is being tested is probably in the first or last sentence. This is about **${topic}** — what do you know about how that works?`,
            `Step back for a moment. You're in **${topic}** territory. What is the core principle here? If you can name it, you're halfway to the answer.`,
            `This is a **${diff}**-difficulty question on **${topic}**. The test writer expects you to recall the governing rule first, then apply it. Can you state the rule?`
        ];
        return prompts[Math.floor(Math.random() * prompts.length)];
    },

    _conceptHint(q, topic) {
        let section = q.Section;
        let conceptMap = {
            'A': 'This section covers external financial reporting under U.S. GAAP. Think about recognition, measurement, and classification rules.',
            'B': 'Budgeting and forecasting questions often hinge on the order of budget preparation or the components that go into each budget.',
            'C': 'Performance management is about measuring and evaluating. Focus on variance formulas, responsibility accounting, and performance metrics.',
            'D': 'Cost management involves classifying costs, allocating them, and using cost data for decisions. Identify the cost type first.',
            'E': 'Internal controls follow the COSO framework. Think about the five components and the principles within each.',
            'F': 'Technology and analytics questions test your understanding of systems, data governance, and emerging tech in accounting.'
        };

        // Try to extract a more specific hint from the explanation
        let explanation = q.ExplanationCorrect || '';
        let firstSentence = explanation.split('.')[0] || '';

        let hint = conceptMap[section] || `This is about **${topic}**. Recall the core principle that governs this area.`;
        if (firstSentence.length > 30 && !firstSentence.toLowerCase().includes('under')) {
            hint += `\n\nTo get you oriented: ${firstSentence}.`;
        }
        return hint;
    },

    _strategyHint(q, topic) {
        let isCalculation = q.CalculationItem || (q.Stem || '').match(/\$/);
        if (isCalculation) {
            return `This looks like a calculation item. Try these steps:\n1. Identify the formula needed (it's related to ${topic})\n2. Pull each number from the stem\n3. Plug them into the formula\n4. Check your arithmetic\n\nWork through it on your calculator or scratch paper before looking at the choices.`;
        }
        return `This is a conceptual question. Try:\n1. Eliminate choices that contradict the core principle\n2. Look for the choice that best reflects what the standard or framework actually says\n3. Watch for distractors that sound reasonable but misapply the rule\n\nThe topic is **${topic}** — anchor your thinking in the governing standard.`;
    },

    _eliminationHint(q, correctLetter) {
        let letters = q.Choices && typeof q.Choices === 'object' ? Object.keys(q.Choices).sort() : ['A', 'B', 'C', 'D'];
        if (letters.length <= 1) {
            return `There aren't multiple choices to eliminate here — focus on applying the correct formula or reasoning for **${MayLearnerState._normalizeTopic(this.context.currentQuestion?.Topic || 'this topic')}**.`;
        }
        let wrongLetters = letters.filter(l => l !== correctLetter);

        let easiestElimination = null;
        wrongLetters.forEach(l => {
            let text = (q.Choices && q.Choices[l]) || '';
            if (text.toLowerCase().includes('always') || text.toLowerCase().includes('never') ||
                text.toLowerCase().includes('only')) {
                easiestElimination = l;
            }
        });

        if (easiestElimination) {
            return `Start by eliminating choices that use absolute language like "always" or "never" — accounting standards rarely operate in absolutes. Option **${easiestElimination}** contains this kind of language and is likely a distractor.`;
        }

        let hintLetter = wrongLetters[Math.floor(Math.random() * wrongLetters.length)];
        return `You can narrow this down. One choice is definitely wrong because it mixes up a key distinction. Look carefully at each option and ask whether it correctly applies the rule for **${MayLearnerState._normalizeTopic(this.context.currentQuestion?.Topic || 'this topic')}**. Can you spot which one doesn't fit?`;
    },

    // ============================================================
    // D. Simplify — plain-language coaching
    // ============================================================

    // Build a 4-section simplified coaching breakdown.
    // Sections: What this means, Why it matters, How to recognize it on exam day, Quick rule to remember.
    // Preserves accounting accuracy — translates language, does not change meaning.
    _buildSimplifyCoaching(question, context) {
        let q = question;
        if (!q) return null;

        let cc = q.CorrectChoice;
        let hasChoices = q.Choices && typeof q.Choices === 'object' && Object.keys(q.Choices).length > 0;
        let choices = q.Choices || {};
        let correctText = hasChoices ? (choices[cc] || '') : (q.Correct || '');
        let explanation = q.ExplanationCorrect || '';
        let topic = MayLearnerState._normalizeTopic(q.Topic || 'this concept');
        let section = q.Section || '';
        let stem = q.Stem || '';
        let isCalculation = !!(q.CalculationItem || (stem || '').match(/\$/));
        let contextRef = context || {};

        let sectionName = May.SECTION_NAMES[section] || '';

        // 1. What this means — plain-language version of the concept
        let whatItMeans = this._plainLanguageTranslation(explanation, topic, isCalculation);

        // 2. Why it matters — the significance of this concept
        let whyItMatters = this._inferWhyItMatters(topic, section, isCalculation);

        // 3. How to recognize it on exam day — practical recognition
        let howToRecognize = this._inferHowToRecognize(topic, section, isCalculation, stem);

        // 4. Quick rule to remember — a memory anchor
        let quickRule = this._inferQuickRuleToRemember(q, topic, section, isCalculation);

        return {
            whatItMeans: whatItMeans,
            whyItMatters: whyItMatters,
            howToRecognize: howToRecognize,
            quickRule: quickRule,
            correctAnswerLetter: cc,
            correctAnswerText: correctText,
            topic: topic,
            sectionName: sectionName,
            isCalculation: isCalculation,
            sourceExplanationIncluded: explanation.length > 30,
            canRevealAnswer: contextRef.canRevealAnswer !== false
        };
    },

    // Translate technical accounting language into plain English without inventing new facts.
    _plainLanguageTranslation(explanation, topic, isCalculation) {
        if (!explanation || explanation.length < 30) {
            // Thin explanation — provide concept framing without fabrication
            let lines = [];
            lines.push('This question tests your understanding of **' + topic + '**.');
            if (isCalculation) {
                lines.push('In everyday terms: you are using numbers from a business scenario to compute a specific value. The calculation follows a standard formula — the trick is knowing which formula applies and plugging the right numbers into the right places.');
            } else {
                lines.push('In everyday terms: you are being asked to apply a specific accounting rule to a real-world business scenario. The question is testing whether you can match the right rule to the right situation.');
            }
            return lines.join(' ');
        }

        // Extract key sentences with signal words for reasoning
        let sentences = explanation.split(/[.!?]\s+/).filter(s => s.trim().length > 10);
        if (sentences.length === 0) {
            return 'This question tests **' + topic + '** — the key is knowing which rule or formula applies to the scenario in the stem.';
        }

        // Find the most explanatory sentence
        let signalWords = ['because', 'therefore', 'thus', 'as a result', 'since', 'under', 'according to',
            'this means', 'in other words', 'specifically', 'the reason'];
        let keySentence = sentences.find(s => signalWords.some(w => s.toLowerCase().includes(w)));
        if (!keySentence) keySentence = sentences[0];

        // Build the plain-language interpretation
        let lines = [];
        lines.push('**In plain language:** ' + this._simplifyAccountingLanguage(keySentence, topic));

        // Add a second layer if the explanation is rich
        if (sentences.length >= 2 && explanation.length > 150) {
            let secondSentence = sentences.find(s =>
                s !== keySentence && s.length > 20 &&
                !s.toLowerCase().includes(keySentence.toLowerCase().substring(0, 20))
            );
            if (secondSentence) {
                lines.push('');
                lines.push('**In other words:** ' + this._simplifyAccountingLanguage(secondSentence, topic));
            }
        }

        return lines.join('\n');
    },

    // Replace or clarify accounting jargon without changing meaning.
    _simplifyAccountingLanguage(text, topic) {
        if (!text) return '';

        let result = text.trim();

        // Common accounting terms → plain-language equivalents
        let replacements = [
            // Revenue/recognition terms
            [/\b(recognize\s+revenue|revenue recognition)\b/gi, 'record revenue (report income when it is earned)'],
            [/\b(performance obligation)\b/gi, 'promise to deliver a good or service (performance obligation)'],
            [/\b(realization principle)\b/gi, 'the rule that you count income when it is actually received'],

            // Expense/cost terms
            [/\b(capitalize)\b/gi, 'record as an asset (capitalize) instead of an immediate expense'],
            [/\b(amortiz(?:e|ation))\b/gi, 'spread the cost over time ($1)'],
            [/\bdepreciat(?:e|ion)\b/gi, 'spread the cost of a physical asset over its useful life ($1)'],

            // Classification terms
            [/\b(operating activities?)\b/gi, 'day-to-day business operations (operating activities)'],
            [/\b(investing activities?)\b/gi, 'buying or selling long-term assets (investing activities)'],
            [/\b(financing activities?)\b/gi, 'borrowing, repaying debt, or dealing with owners (financing activities)'],

            // Valuation/measurement terms
            [/\b(fair value)\b/gi, 'current market price (fair value)'],
            [/\b(historical cost)\b/gi, 'original purchase price (historical cost)'],
            [/\b(net realizable value)\b/gi, 'expected selling price minus costs to sell (net realizable value)'],
            [/\b(present value)\b/gi, 'today\'s worth of a future payment, discounted for time and risk (present value)'],

            // Control terms
            [/\b(control environment)\b/gi, 'the organization\'s culture of integrity and accountability (control environment)'],
            [/\b(preventive control)\b/gi, 'a control that stops errors before they happen (preventive control)'],
            [/\b(detective control)\b/gi, 'a control that catches errors after they occur (detective control)'],
            [/\b(segregation of duties)\b/gi, 'splitting responsibilities so no one person controls everything (segregation of duties)'],

            // Budget/planning terms
            [/\b(static budget)\b/gi, 'a budget set at one planned activity level (static budget)'],
            [/\b(flexible budget)\b/gi, 'a budget that adjusts for actual activity (flexible budget)'],
            [/\b(master budget)\b/gi, 'the company\'s overall financial plan (master budget)'],

            // Performance terms
            [/\b(variance analysis)\b/gi, 'comparing actual results to budget to find differences ($1)'],
            [/\b(return on investment|ROI)\b/gi, 'profit divided by investment — how efficiently capital is used ($1)'],
            [/\b(residual income)\b/gi, 'profit above a minimum required return (residual income)'],

            // Cost management terms
            [/\b(contribution margin)\b/gi, 'sales minus variable costs — what is left to cover fixed costs ($1)'],
            [/\b(break-even)\b/gi, 'the point where revenue equals total costs — no profit, no loss'],
            [/\b(overhead allocation)\b/gi, 'spreading indirect costs across products or departments ($1)'],
            [/\b(absorption costing)\b/gi, 'including all manufacturing costs in the product cost ($1)'],
            [/\b(variable costing)\b/gi, 'including only variable manufacturing costs in the product cost ($1)'],
            [/\b(sunk cost)\b/gi, 'money already spent that cannot be recovered (sunk cost)'],

            // Standard costing/Variance terms
            [/\b(price variance)\b/gi, 'difference from paying more or less than expected per unit ($1)'],
            [/\b(quantity variance|efficiency variance)\b/gi, 'difference from using more or less materials or labor than expected ($1)'],
            [/\b(spending variance)\b/gi, 'difference in overhead costs from what was budgeted ($1)'],

            // Technology terms
            [/\b(entity-level control)\b/gi, 'a control that applies across the entire organization ($1)'],
            [/\b(application control)\b/gi, 'a control built into a specific software program ($1)'],
            [/\b(IT general control)\b/gi, 'a control over the IT environment as a whole ($1)'],
        ];

        for (let [pattern, replacement] of replacements) {
            // Only replace if the term is in the text — skip if already has a parenthetical
            if (pattern.test(result) && !result.toLowerCase().includes(replacement.toLowerCase().replace(/[()]/g, '').substring(0, 15))) {
                result = result.replace(pattern, replacement);
            }
        }

        // If the result is identical, add a contextual wrap
        if (result === text.trim()) {
            result = 'Think of it this way: ' + text.trim().charAt(0).toLowerCase() + text.trim().substring(1);
        }

        return result;
    },

    // Explain why this concept matters in real terms.
    _inferWhyItMatters(topic, section, isCalculation) {
        let sectionMap = {
            'A': 'Financial reporting rules determine how companies present their numbers to the outside world — investors, lenders, regulators. Getting these rules right means users of financial statements can actually trust what they are reading.',
            'B': 'Budgeting and forecasting are how companies plan their future. If you get the budget process wrong, every downstream decision — hiring, purchasing, pricing — is built on bad numbers.',
            'C': 'Performance measurement tells management whether the company is actually executing its plan. Good metrics drive good decisions; bad metrics reward the wrong behavior.',
            'D': 'Cost management determines profitability. Knowing which costs are fixed vs. variable, which costs are relevant to a decision, and how to allocate overhead separates profitable companies from struggling ones.',
            'E': 'Internal controls protect the company\'s assets and ensure reliable financial reporting. Weak controls lead to errors, fraud, and restatements — every major accounting scandal traces back to a control failure.',
            'F': 'Technology and data are now embedded in every accounting function. Understanding how systems work — and how they can fail — is a core professional skill, not a side topic.'
        };

        let base = sectionMap[section] || ('Understanding ' + topic + ' is essential because it directly affects how businesses make decisions, report results, and maintain compliance.');
        if (isCalculation) {
            return 'Numbers drive decisions. This calculation is not just an academic exercise — it is the kind of analysis managers use every day to decide pricing, production levels, investment choices, and cost control measures. ' + base;
        }
        return base;
    },

    // Practical recognition tips for exam day.
    _inferHowToRecognize(topic, section, isCalculation, stem) {
        if (isCalculation) {
            let calcTips = [
                'On exam day, when you see a question with numbers and dollar signs, pause and identify the formula first — before you look at the answer choices. Write it down on your scratch paper. Then pull each number from the stem into the formula. If a number in the stem is not in the formula, it is probably there to distract you.',
                'Calculation questions reward methodical work, not speed. Read the stem, find the keyword (like "' + topic + '"), recall the one formula it triggers, set it up on paper, and plug the numbers in sequence. The most common trap is a distractor number that comes from a similar but wrong formula.',
                'When you see a calculation item testing ' + topic + ', ask: *Which formula does this keyword trigger, and what numbers from the stem go into it?* The exam will often give you extra numbers you do not need — ignore them unless they fit the formula.'
            ];
            return calcTips[Math.floor(Math.random() * calcTips.length)];
        }

        let recognitionMap = {
            'A': 'Look for keywords like "report," "classify," "recognize," or "present" in the stem. These signal that the question is asking *where and how* something appears in the financial statements — not just what it is.',
            'B': 'Budgeting questions often have a sequence or dependency. Look for words like "beginning," "next," "after," or "before" — they tell you the order of operations in the master budget process.',
            'C': 'Performance questions often use comparison language: "vs.," "compared to," "favorable," or "unfavorable." When you see those words, you are looking at a variance or benchmark question.',
            'D': 'Cost management questions ask about behavior: "how does this cost change when volume changes?" or relevance: "which costs matter for this decision?" Identify the cost type first, then apply the framework.',
            'E': 'Control questions present a scenario with something going wrong. Map the failure to a COSO component: Is it about culture? Risk assessment? Control activities? Information? Monitoring? The answer is in that classification.',
            'F': 'Technology questions connect a system or data concept to an accounting objective. Ignore options that describe the technology without connecting it to the business problem in the stem.'
        };

        return recognitionMap[section] || ('Look for the topic keyword — "' + topic + '" — in the stem. Once you identify it, recall the one rule, formula, or framework that governs it, and match it to the scenario. The wrong answers will test related-but-different concepts.');
    },

    // A short memory hook the learner can carry into the exam.
    _inferQuickRuleToRemember(q, topic, section, isCalculation) {
        if (isCalculation) {
            let calcRules = [
                '**Quick rule:** Formula first, numbers second, third step: check your arithmetic. Never start a calculation question by looking at the answer choices — build your answer first, then find the match.',
                '**Quick rule:** Every calculation has a "driver" — the one formula or relationship the question is testing. Identify that driver from the stem keyword, and the numbers will fall into place.',
                '**Quick rule:** Write it down. Scratch paper is your best tool for calculation questions. Set up the formula, label every input, compute step by step, and compare to the choices only at the end.'
            ];

            // Try to detect formula-related text in the explanation
            let exp = q.ExplanationCorrect || '';
            if (exp.length > 30) {
                let formulaMatch = exp.match(/(\w+\s*(?:=|÷|×|\/|\+|-|–)\s*[\w\s().,]+)/);
                if (formulaMatch) {
                    return '**Quick rule:** Remember the formula: **' + formulaMatch[1].trim() + '**. If you can recall this relationship, the numbers from the stem simply plug in.';
                }
            }

            return calcRules[Math.floor(Math.random() * calcRules.length)];
        }

        let ruleMap = {
            'A': '**Quick rule:** Classification questions answer *where* and *how*, not just *what*. Always ask: "Where does this belong in the financial statements, and under which standard?"',
            'B': '**Quick rule:** The master budget flows like a river — from top (sales) to bottom (cash). Each component feeds the next. Trace the flow, do not memorize isolated pieces.',
            'C': '**Quick rule:** Variance = actual minus budget. Favorable means profit went up or costs went down. Unfavorable means the opposite. The math is simple — the trick is knowing which number is actual and which is budget.',
            'D': '**Quick rule:** Fixed costs stay the same in total, variable costs stay the same per unit. This one distinction answers more cost management questions than any other.',
            'E': '**Quick rule:** COSO has five components. When you see a control question, ask: "Which component does this relate to?" The answer is almost always in that classification step.',
            'F': '**Quick rule:** Technology serves accounting, not the other way around. The right answer connects a technology concept to a specific accounting objective mentioned in the stem.'
        };

        return ruleMap[section] || ('**Quick rule:** When you see "' + topic + '" on the exam, think: *What is the one rule or principle that governs this?* Apply it. Do not let related-sounding concepts pull you off track.');
    },

    _simplifyExplanation() {
        let q = this.context.currentQuestion;
        if (!q) { this._speak("I need a question to work with. Start a review first."); return; }

        // ── Determine context: has the learner attempted? Review mode? ──
        let selectedChoice = null;
        let hasAttempted = false;
        let isReviewMode = false;
        try {
            if (typeof state !== 'undefined' && state.session) {
                if (state.session.answers && state.session.answers[q.QuestionID]) {
                    selectedChoice = state.session.answers[q.QuestionID];
                    hasAttempted = true;
                }
                if (state.session.completed) {
                    isReviewMode = true;
                }
            }
        } catch (e) {}

        let canRevealAnswer = hasAttempted || isReviewMode;

        // ── Build coaching structure ──
        let coaching = this._buildSimplifyCoaching(q, { canRevealAnswer: canRevealAnswer });

        if (!coaching) {
            this._speak("I don't have enough context to simplify this question.");
            return;
        }

        let lines = [];

        // ── Gate: unanswered active question — concept coaching only, no answer reveal ──
        if (!canRevealAnswer) {
            lines.push('I can break down the concept for you without giving away the answer. After you submit your answer, I\'ll translate the full explanation into plain language.\n');

            // What this means — concept only
            lines.push('**What this concept is about:**');
            lines.push(coaching.whatItMeans);
            lines.push('');

            // Why it matters
            lines.push('**Why this matters:**');
            lines.push(coaching.whyItMatters);
            lines.push('');

            // How to recognize it
            lines.push('**How to recognize this on exam day:**');
            lines.push(coaching.howToRecognize);
            lines.push('');

            // Quick rule
            lines.push(coaching.quickRule);

            lines.push('');
            lines.push('*After you submit your answer, come back and I\'ll translate the full explanation, including how the correct answer fits.*');

            if (this.isPilotEnvironment()) {
                this._guardedSpeak(lines, 'simplify');
            } else {
                this._speak(lines.join('\n'));
            }
            return;
        }

        // ── Post-answer or review mode: full 4-section simplify with answer ──
        if (isReviewMode) {
            lines.push('Let\'s break this down in plain language so the concept sticks.\n');
        } else {
            lines.push('Let me translate this into plain English.\n');
        }

        // 1. What this means
        lines.push('**What this means:**');
        lines.push(coaching.whatItMeans);
        lines.push('');

        // 2. Why it matters
        lines.push('**Why it matters:**');
        lines.push(coaching.whyItMatters);
        lines.push('');

        // 3. How to recognize it on exam day
        lines.push('**How to recognize it on exam day:**');
        lines.push(coaching.howToRecognize);
        lines.push('');

        // 4. Quick rule to remember
        lines.push(coaching.quickRule);

        // Reveal correct answer (allowed — learner has attempted or is in review)
        let cc = coaching.correctAnswerLetter;
        let correctText = coaching.correctAnswerText;
        if (cc && correctText) {
            lines.push('');
            lines.push('**The correct answer** is **' + cc + '** — "' + correctText + '" — because it applies the rule we just discussed.');
        }

        // If the learner chose wrong, call it out gently
        if (selectedChoice && selectedChoice !== cc && !isReviewMode) {
            lines.push('');
            lines.push('*You chose ' + selectedChoice + ' — that option reflects a common trap. The explanation above shows why ' + cc + ' is the right call. Want me to break down why ' + selectedChoice + ' is wrong? Tap **Wrong choices**.*');
        }

        // Review mode note
        if (isReviewMode) {
            lines.push('');
            lines.push('*Use the **Explain answer** button if you want the full, detailed breakdown with the official bank explanation and trap analysis.*');
        }

        // S123 — Append next best step action plan
        lines = this._appendNextBestStep(lines, q, { selectedChoice: selectedChoice });

        // S124 — Append learning patterns
        lines = this._appendLearningPatterns(lines, q, { selectedChoice: selectedChoice });

        // S125 — Append suggested focus areas
        lines = this._appendFocusAreas(lines, q, { selectedChoice: selectedChoice });

        if (this.isPilotEnvironment()) {
            this._guardedSpeak(lines, 'simplify');
        } else {
            this._speak(lines.join('\n'));
        }
    },

    // ============================================================
    // D2. Explain your specific mistake (review mode)
    // ============================================================

    _explainYourMistake() {
        let q = this.context.currentQuestion;
        if (!q) { this._speak("I don't have a question to work with. Start a review first."); return; }

        let reviewItem = this.context.reviewQuestions.find(r => r.question.QuestionID === q.QuestionID);
        let yourAnswer = reviewItem ? reviewItem.answer : null;
        let isCaseItem = reviewItem && reviewItem.type === 'case';

        if (!yourAnswer && !isCaseItem) {
            this._speak("I don't have a record of your answer for this question. Try reviewing from a completed session, or ask me to explain the correct answer instead.");
            return;
        }

        let cc = q.CorrectChoice;
        let isCorrectAnswer = reviewItem ? reviewItem.correct : false;

        if (isCorrectAnswer) {
            this._speak(`You answered correctly. ${q.ExplanationCorrect ? 'Here is the full reasoning, in case you want to confirm your approach:\n\n' + q.ExplanationCorrect : 'Nice work on this one.'}`);
            return;
        }

        // Session 93 — For case select items, map the stored answer text to a letter
        let yourLetter = null;
        if (isCaseItem && q.Choices && yourAnswer) {
            let letters = Object.keys(q.Choices).sort();
            for (let l of letters) {
                if (q.Choices[l].trim() === String(yourAnswer).trim()) {
                    yourLetter = l; break;
                }
            }
        }
        if (!yourLetter) yourLetter = yourAnswer;

        let yourText = q.Choices ? (q.Choices[yourLetter] || String(yourAnswer || 'unanswered')) : String(yourAnswer || 'unanswered');
        let wrongExplanation = q['ExplanationWrong' + (yourLetter || '')] || '';
        let ccText = q.Choices ? (q.Choices[cc] || q.Correct || '') : (q.Correct || '');
        let topic = MayLearnerState._normalizeTopic(q.Topic || 'this topic');

        let lines = [];

        if (yourAnswer === undefined || yourAnswer === null) {
            lines.push('**You left this item unanswered.**');
        } else if (yourLetter && yourLetter !== cc) {
            lines.push(`**You picked ${yourLetter}:** "${yourText}"`);
        } else {
            lines.push(`**Your answer was incorrect.**`);
        }
        lines.push('');

        if (wrongExplanation && wrongExplanation.length > 10 && yourLetter !== cc) {
            lines.push(wrongExplanation);
        } else if (yourAnswer !== undefined && yourAnswer !== null) {
            lines.push(`This choice doesn't match the correct accounting treatment for ${topic}.`);
        }

        lines.push('');
        if (cc) {
            lines.push(`**The correct answer was ${cc}:** "${ccText}"`);
        } else {
            lines.push(`**The correct answer:** "${ccText}"`);
        }

        if (q.ExplanationCorrect) {
            lines.push('');
            lines.push(q.ExplanationCorrect);
        }

        let data = MayLearnerState.load();
        let patterns = (data.misconceptionPatterns || []).filter(p => p._topics.includes(topic) && p.count >= 2);
        if (patterns.length > 0) {
            lines.push('');
            let topPattern = patterns[0];
            let pName = May.PATTERN_NAMES[topPattern.pattern] || topPattern.pattern;
            lines.push(`This fits a pattern I've seen before — you've had ${topPattern.count} misses involving **${pName}**. Being aware of this specific trap is the first step to closing it.`);
        }

        this._speak(lines.join('\n'));
    },

    // ============================================================
    // E. Progress insight mode
    // ============================================================

    _getProgressInsight() {
        let trends = MayLearnerState.getTrends();
        let clusters = MayLearnerState.getWeaknessClusters();
        let data = MayLearnerState.load();

        if (!data.sessions || data.sessions.length === 0) {
            this._speak("I don't have any session history to draw from yet. Complete a practice session and I'll start tracking your progress by topic.");
            return;
        }

        let parts = [];
        let sessionCount = data.sessions.length;
        let totalAttempts = data.sessions.reduce((s, sess) => s + (sess.attempts || []).length, 0);

        parts.push(`I've tracked **${sessionCount}** session${sessionCount !== 1 ? 's' : ''} and **${totalAttempts}** question attempts so far.\n`);

        let insightCount = 0;

        // Improving areas
        if (clusters.improving.length > 0) {
            insightCount++;
            let top = clusters.improving.slice(0, 3);
            parts.push('**Topics showing improvement:**');
            top.forEach(t => {
                parts.push(`- **${t.topic}**: ${t.accuracy}% overall, but your recent accuracy is ${t.recentPct}% (+${t.delta}%). This suggests the concept is becoming more stable.`);
            });
            parts.push('');
        }

        // Topics where hint usage is dropping (good sign)
        let hintImproving = trends.filter(t => t.hintTrend === 'decreasing' && t.accuracy >= 60 && t.totalAttempts >= 4);
        if (hintImproving.length > 0) {
            insightCount++;
            parts.push('**Growing independence:**');
            hintImproving.slice(0, 2).forEach(t => {
                parts.push(`- **${t.topic}**: Your accuracy is solid (${t.accuracy}%) and you're using fewer hints — that usually means genuine understanding, not just pattern recognition.`);
            });
            parts.push('');
        }

        // Difficulty-level note
        let difficultTopic = trends.find(t => t.avgDifficulty >= 4 && t.accuracy >= 70);
        if (difficultTopic) {
            insightCount++;
            parts.push(`**Performing under pressure:** Your accuracy on **${difficultTopic.topic}** (${difficultTopic.accuracy}%) is strong even though you tend to see it at higher difficulty levels. That's a good sign for exam readiness.`);
            parts.push('');
        }

        // Stable topics
        let stableTopics = trends.filter(t => t.stability !== null && t.stability >= 80 && t.accuracy >= 70);
        if (stableTopics.length > 0) {
            insightCount++;
            parts.push(`**Well-established:** You're reliably accurate on ${stableTopics.slice(0, 3).map(t => `**${t.topic}**`).join(', ')}, with consistent performance across attempts. These are your anchors.`);
            parts.push('');
        }

        // Confidence calibration
        let calibration = MayLearnerState.getConfidenceCalibration();
        let overconfidentTopics = Object.entries(calibration)
            .filter(([, c]) => c.total >= 4 && c.calibrationDelta !== null && c.calibrationDelta >= 0.8)
            .sort((a, b) => b[1].calibrationDelta - a[1].calibrationDelta);
        let underconfidentTopics = Object.entries(calibration)
            .filter(([, c]) => c.total >= 3 && c.calibrationDelta !== null && c.calibrationDelta <= -0.5)
            .sort((a, b) => a[1].calibrationDelta - b[1].calibrationDelta);

        if (overconfidentTopics.length > 0) {
            insightCount++;
            parts.push('**Confidence check — overconfident:**');
            overconfidentTopics.slice(0, 2).forEach(([topic, c]) => {
                parts.push(`- **${topic}**: You rate your confidence at ${c.avgConfidence}/5 but your accuracy is ${c.accuracy}%. That gap means you may be overestimating your grasp — slow down and verify your reasoning on these.`);
            });
            parts.push('');
        }
        if (underconfidentTopics.length > 0) {
            insightCount++;
            parts.push('**Confidence check — underconfident:**');
            underconfidentTopics.slice(0, 2).forEach(([topic, c]) => {
                parts.push(`- **${topic}**: You only rate yourself ${c.avgConfidence}/5, but your accuracy is ${c.accuracy}%. You're more capable on this topic than you think.`);
            });
            parts.push('');
        }

        if (insightCount === 0) {
            parts.push("I don't have enough topic-level data yet to identify clear patterns. Keep practicing across different sections and I'll start surfacing insights as your history builds.");
        } else if (insightCount === 1) {
            parts.push("I'm starting to see patterns in your performance. A few more sessions and I'll have a clearer picture across more topics.");
        } else {
            parts.push("*These observations are based on your tracked session data. The more you practice, the more precise these insights become.*");
        }

        // S113 — Pilot path: guarded speak for safety checking
        let progressText = parts.join('\n');
        if (this.isPilotEnvironment()) {
            this._guardedSpeak(progressText, 'progress');
        } else {
            this._speak(progressText);
        }
    },

    // ============================================================
    // F. Weakness insight
    // ============================================================

    _getWeaknessInsight() {
        let clusters = MayLearnerState.getWeaknessClusters();
        let trends = MayLearnerState.getTrends();
        let data = MayLearnerState.load();

        if (!data.sessions || data.sessions.length === 0) {
            this._speak("I don't have any history to analyse yet. Complete a practice session and I'll start identifying patterns.");
            return;
        }

        let parts = [];
        let hasContent = false;

        // Persistent weak areas
        if (clusters.persistentWeak.length > 0) {
            hasContent = true;
            parts.push('**Areas that need focused work:**');
            clusters.persistentWeak.slice(0, 4).forEach(t => {
                parts.push(`- **${t.topic}**: ${t.accuracy}% across ${t.totalAttempts} attempts. This isn't a one-off — it's consistently below target. Recommend a dedicated drill with explanation review.`);
            });
            parts.push('');
        }

        // Declining areas
        if (clusters.declining.length > 0) {
            hasContent = true;
            parts.push('**Topics where accuracy is slipping:**');
            clusters.declining.slice(0, 3).forEach(t => {
                parts.push(`- **${t.topic}**: ${t.accuracy}% overall but recent accuracy is ${t.recentPct}% (${t.delta}%). Something may have shifted — worth revisiting the fundamentals.`);
            });
            parts.push('');
        }

        // Unstable areas
        if (clusters.unstable.length > 0) {
            hasContent = true;
            parts.push('**Inconsistent performance:**');
            clusters.unstable.slice(0, 3).forEach(t => {
                parts.push(`- **${t.topic}**: Your accuracy varies significantly between attempts (${t.accuracy}% overall). This often means the concept isn't fully internalized — you get it right sometimes but not reliably.`);
            });
            parts.push('');
        }

        // Hint dependent
        if (clusters.hintDependent.length > 0) {
            hasContent = true;
            parts.push('**Right answers, but with help:**');
            clusters.hintDependent.slice(0, 2).forEach(t => {
                parts.push(`- **${t.topic}**: ${t.accuracy}% accuracy, but your hint usage is rising. This suggests you're arriving at correct answers with scaffolding. Try a set without hints to check if you can reproduce the reasoning independently.`);
            });
            parts.push('');
        }

        // Difficulty-sensitive
        if (clusters.difficultySensitive.length > 0) {
            hasContent = true;
            parts.push('**Difficulty gap:**');
            clusters.difficultySensitive.slice(0, 2).forEach(t => {
                parts.push(`- **${t.topic}**: ${t.lowPct}% on easier items but drops to ${t.highPct}% on harder ones. The core concept is there but the application under complexity needs reinforcement.`);
            });
            parts.push('');
        }

        // Lowest-accuracy topics overall
        if (!hasContent) {
            let weakest = trends.filter(t => t.totalAttempts >= 3).slice(0, 4);
            if (weakest.length > 0) {
                parts.push('**Your lowest-accuracy topics:**');
                weakest.forEach(t => {
                    let label = t.accuracy >= 70 ? ' (still decent)' : t.accuracy < 50 ? ' (needs work)' : '';
                    parts.push(`- **${t.topic}**: ${t.accuracy}% across ${t.totalAttempts} attempts${label}`);
                });
                hasContent = true;
            }
        }

        // Recurring misconception patterns
        let data2 = MayLearnerState.load();
        let patterns = (data2.misconceptionPatterns || []).filter(p => p.count >= 2);
        if (patterns.length > 0) {
            patterns.sort((a, b) => b.count - a.count);
            let topPatterns = patterns.slice(0, 3);
            parts.push('**Recurring traps:**');
            topPatterns.forEach(p => {
                let name = May.PATTERN_NAMES[p.pattern] || p.pattern;
                parts.push(`- **${name}** — ${p.count} occurrences across ${p._topics.length} topic(s). This pattern is worth explicitly addressing before your next session.`);
            });
            parts.push('');
        }

        if (!hasContent) {
            parts.push("Based on your history so far, none of your topics stand out as persistently weak. That said, your overall attempt counts are still modest — keep practicing across all sections to build a more complete picture.");
        } else {
            parts.push("*These are patterns in your tracked data — not judgments. Every weak area is an opportunity to improve.*");
        }

        // S113 — Pilot path
        let weaknessText = parts.join('\n');
        if (this.isPilotEnvironment()) {
            this._guardedSpeak(weaknessText, 'weakness');
        } else {
            this._speak(weaknessText);
        }
    },

    // ── S126 — Generate structured study session recap ──
    _generateSessionRecap(sessionObj, topicEntries, data) {
        if (!sessionObj) return null;

        let parts = [];
        let mcqTotal = (sessionObj.mcqs || []).length;
        let allMcqAnswered = 0, allMcqCorrect = 0;
        (sessionObj.mcqs || []).forEach(q => {
            if (sessionObj.answers[q.QuestionID] !== undefined) {
                allMcqAnswered++;
                if (typeof scoreMCQ === 'function' && scoreMCQ(q, sessionObj.answers[q.QuestionID]) === 1)
                    allMcqCorrect++;
            }
        });

        if (allMcqAnswered === 0) return null;

        let mcqPct = Math.round(allMcqCorrect / allMcqAnswered * 100);
        parts.push('**Today\'s practice**');
        parts.push(allMcqAnswered + ' MCQ items answered, ' + allMcqCorrect + ' correct (' + mcqPct + '%).');
        parts.push('');

        if (topicEntries && topicEntries.length > 0) {
            let sorted = [...topicEntries].sort((a, b) =>
                (b[1].c / Math.max(1, b[1].n)) - (a[1].c / Math.max(1, a[1].n)));
            let strong = sorted.filter(([, v]) => v.c > 0).slice(0, 2);
            if (strong.length > 0) {
                parts.push('**Strongest areas**');
                strong.forEach(([topic, v]) => {
                    let pct = Math.round(v.c / Math.max(1, v.n) * 100);
                    parts.push('- ' + topic + ': ' + v.c + '/' + v.n + ' correct (' + pct + '%)');
                });
                parts.push('');
            }
        }

        if (topicEntries && topicEntries.length > 0) {
            let weak = topicEntries
                .filter(([, v]) => v.n > 0 && (v.c / v.n) < 0.6)
                .sort((a, b) => (a[1].c / a[1].n) - (b[1].c / b[1].n))
                .slice(0, 2);
            if (weak.length > 0) {
                parts.push('**Most frequent mistakes**');
                weak.forEach(([topic, v]) => {
                    let pct = Math.round(v.c / Math.max(1, v.n) * 100);
                    parts.push('- ' + topic + ': ' + v.c + '/' + v.n + ' correct (' + pct + '%)');
                });
                parts.push('');
            }
        }

        try {
            let learnerData = data || MayLearnerState.load();
            let patterns = (learnerData.misconceptionPatterns || []).filter(p => p.count >= 2);
            if (patterns.length > 0) {
                let top = patterns.sort((a, b) => b.count - a.count).slice(0, 2);
                parts.push('**Key misconceptions encountered**');
                top.forEach(p => {
                    let name = May.PATTERN_NAMES[p.pattern] || p.pattern;
                    parts.push('- ' + name + ': ' + p.count + ' misses — specific pattern to watch for');
                });
                parts.push('');
            }
        } catch (e) {}

        let sessions = (data || MayLearnerState.load()).sessions || [];
        if (sessions.length >= 2) {
            let recent = sessions[sessions.length - 1];
            let prior = sessions[sessions.length - 2];
            if (recent && prior && recent.attempts && prior.attempts) {
                let recentPct = recent.attempts.length > 0
                    ? Math.round(recent.attempts.filter(a => a.correct).length / recent.attempts.length * 100) : null;
                let priorPct = prior.attempts.length > 0
                    ? Math.round(prior.attempts.filter(a => a.correct).length / prior.attempts.length * 100) : null;
                if (recentPct !== null && priorPct !== null) {
                    let delta = recentPct - priorPct;
                    parts.push('**Progress trend**');
                    if (delta >= 10) {
                        parts.push('Up ' + delta + '% (' + priorPct + '% → ' + recentPct + '%).');
                    } else if (delta <= -10) {
                        parts.push('Down ' + Math.abs(delta) + '% (' + priorPct + '% → ' + recentPct + '%). Session variation is normal — focus on the long-term direction.');
                    } else {
                        parts.push('Steady (' + priorPct + '% → ' + recentPct + '%).');
                    }
                    parts.push('');
                }
            }
        }

        let weakestTopic = topicEntries && topicEntries.length > 0
            ? topicEntries.reduce((a, b) => (a[1].c / a[1].n) < (b[1].c / b[1].n) ? a : b) : null;
        parts.push('**Recommended next step**');
        let recText, recSubType;
        if (weakestTopic && weakestTopic[1].n > 0 && (weakestTopic[1].c / weakestTopic[1].n) < 0.6) {
            recText = 'Focus your next session on **' + weakestTopic[0] + '**. Review wrong-answer explanations carefully — especially the misconception coaching for each distractor. Then try 3-5 more items on this topic.';
            recSubType = 'targeted_practice';
        } else if (mcqPct >= 85) {
            recText = 'Your accuracy was strong today. Consider mixing in a case study next session to stretch your application skills.';
            recSubType = 'case_stretch';
        } else {
            recText = 'In your next session, tap **Explain** on every item you miss. Understanding *why* each wrong option is wrong builds the deepest reinforcement.';
            recSubType = 'explain_every_miss';
        }
        parts.push(recText);
        // S131 — Provenance: record session recap recommendations
        try {
            MayLearnerState.recordRecommendationDelivery({
                type: 'session_recap', subType: recSubType,
                topic: weakestTopic ? weakestTopic[0] : null,
                text: recText,
                evidence: { mcqPct: mcqPct, totalAnswered: allMcqAnswered, sessionsCompared: 2 },
                sessionId: this.context.sessionId
            });
        } catch (e) {}

        return { lines: parts, hasData: true, mcqPct: mcqPct, totalAnswered: allMcqAnswered };
    },

    // ── S127 — Weekly Learning Digest ──
    // Aggregates multi-session data into a longitudinal learning review.
    // Every claim is backed by evidence. Never predicts outcomes.
    _generateWeeklyDigest() {
        let data = MayLearnerState.load();
        let sessions = data.sessions || [];
        let topicProgress = null;
        try { topicProgress = MayLearnerState.getTopicProgress(); } catch (e) {}

        let lookbackSessions = sessions.slice(-7); // last 7 sessions or fewer
        if (lookbackSessions.length < 2) return null; // need at least 2 sessions for a digest

        let totalAnswered = 0, totalCorrect = 0;
        let allTopics = {};
        lookbackSessions.forEach(s => {
            (s.attempts || []).forEach(a => {
                totalAnswered++;
                if (a.correct) totalCorrect++;
                let topic = a.topic || 'Unclassified';
                if (!allTopics[topic]) allTopics[topic] = { n: 0, c: 0 };
                allTopics[topic].n++;
                if (a.correct) allTopics[topic].c++;
            });
        });

        if (totalAnswered === 0) return null;

        let lines = [];
        let overallPct = Math.round(totalCorrect / totalAnswered * 100);

        // ── 1. Practice summary ──
        lines.push('**Weekly practice summary**');
        lines.push(lookbackSessions.length + ' sessions completed this week · ' +
            totalAnswered + ' questions attempted · ' + totalCorrect + ' correct (' + overallPct + '%).');
        lines.push('');

        // ── 2. Accuracy trend ──
        let firstPct = lookbackSessions[0].attempts.length > 0
            ? Math.round(lookbackSessions[0].attempts.filter(a => a.correct).length / lookbackSessions[0].attempts.length * 100) : null;
        let lastPct = lookbackSessions[lookbackSessions.length - 1].attempts.length > 0
            ? Math.round(lookbackSessions[lookbackSessions.length - 1].attempts.filter(a => a.correct).length / lookbackSessions[lookbackSessions.length - 1].attempts.length * 100) : null;
        lines.push('**Accuracy trend**');
        if (firstPct !== null && lastPct !== null) {
            let delta = lastPct - firstPct;
            if (delta >= 10) {
                lines.push('Improving — from ' + firstPct + '% (first session) to ' + lastPct + '% (most recent), up ' + delta + '%.');
            } else if (delta <= -10) {
                lines.push('Declining — from ' + firstPct + '% to ' + lastPct + '%. Session-to-session variation is normal. Focus on the topics listed below.');
            } else {
                lines.push('Steady at ~' + overallPct + '% across the week.');
            }
        } else {
            lines.push('Overall accuracy: ' + overallPct + '%. More sessions will reveal a clearer trend.');
        }
        lines.push('');

        // ── 3. Strongest topics ──
        let topicEntries = Object.entries(allTopics);
        if (topicEntries.length > 0) {
            let strong = topicEntries
                .filter(([, v]) => v.n >= 3 && (v.c / v.n) >= 85)
                .sort((a, b) => (b[1].c / b[1].n) - (a[1].c / a[1].n))
                .slice(0, 3);
            if (strong.length > 0) {
                lines.push('**Strongest topics**');
                strong.forEach(([topic, v]) => {
                    lines.push('- ' + topic + ': ' + Math.round(v.c / v.n * 100) + '% (' + v.c + '/' + v.n + ')');
                });
                lines.push('');
            }
        }

        // ── 4. Topics needing attention ──
        if (topicEntries.length > 0) {
            let weak = topicEntries
                .filter(([, v]) => v.n >= 5 && (v.c / v.n) < 60)
                .sort((a, b) => (a[1].c / a[1].n) - (b[1].c / b[1].n))
                .slice(0, 3);
            if (weak.length > 0) {
                lines.push('**Topics needing attention**');
                weak.forEach(([topic, v]) => {
                    lines.push('- ' + topic + ': ' + Math.round(v.c / v.n * 100) + '% (' + v.c + '/' + v.n + ')');
                });
                lines.push('');
            }
        }

        // ── 5. Most common misconceptions ──
        let patterns = (data.misconceptionPatterns || []).filter(p => p.count >= 2);
        if (patterns.length > 0) {
            let top = patterns.sort((a, b) => b.count - a.count).slice(0, 3);
            lines.push('**Most common misconceptions**');
            top.forEach(p => {
                let name = May.PATTERN_NAMES[p.pattern] || p.pattern;
                lines.push('- ' + name + ': ' + p.count + ' occurrences — review the boundary between the correct concept and this trap');
            });
            lines.push('');
        }

        // ── 6. Learning momentum ──
        lines.push('**Learning momentum**');
        if (firstPct !== null && lastPct !== null && (lastPct - firstPct) >= 10) {
            lines.push('Your accuracy is trending upward across the week. The focused practice is showing results.');
        } else if (topicEntries.filter(([, v]) => v.n >= 3 && (v.c / v.n) >= 85).length >= 3) {
            lines.push('You have several strong topics this week — your study approach is building solid foundations in those areas.');
        } else {
            lines.push('Mixed performance across topics — this is normal during active learning. The topics listed above show where to direct your next sessions.');
        }
        lines.push('');

        // ── 7. Recommended weekly focus ──
        lines.push('**Recommended weekly focus**');
        let priorities = [];
        if (topicEntries.length > 0) {
            let weakSorted = topicEntries
                .filter(([, v]) => v.n >= 5 && (v.c / v.n) < 60)
                .sort((a, b) => (a[1].c / a[1].n) - (b[1].c / b[1].n));
            weakSorted.slice(0, 2).forEach(([topic, v]) => {
                priorities.push('Focus on **' + topic + '** (' + Math.round(v.c / v.n * 100) + '% this week) — this is where targeted practice will have the biggest impact.');
            });
        }
        if (patterns.length > 0 && patterns[0].count >= 3) {
            let name = (patterns[0].pattern || '').replace(/_/g, ' ');
            priorities.push('Review **' + name + '** concepts — this misconception pattern appeared ' + patterns[0].count + ' times this week.');
        }
        if (priorities.length === 0) {
            priorities.push('Keep practicing across all topics — more session data will help identify your highest-impact focus areas.');
        }
        priorities.slice(0, 3).forEach(p => lines.push('- ' + p));
        lines.push('');

        // ── 8. One small win ──
        lines.push('**One small win**');
        if (topicEntries.length > 0) {
            let best = topicEntries
                .filter(([, v]) => v.n >= 2)
                .sort((a, b) => (b[1].c / b[1].n) - (a[1].c / a[1].n))[0];
            if (best) {
                lines.push('Your strongest performance this week was on **' + best[0] + '**: ' +
                    Math.round(best[1].c / best[1].n * 100) + '% correct. This is a solid foundation to build on.');
            } else {
                lines.push('You showed up for ' + lookbackSessions.length + ' practice sessions this week. Consistency is the biggest predictor of progress — keep showing up.');
            }
        } else {
            lines.push('You completed ' + lookbackSessions.length + ' practice sessions this week. Building a regular practice habit is the most important step.');
        }

        return {
            lines: lines,
            hasData: true,
            overallPct: overallPct,
            totalAnswered: totalAnswered,
            sessionCount: lookbackSessions.length
        };
    },

    // ── S128 — Personal Study Strategy ──
    // Converts observed patterns into evidence-backed study plans
    // across three horizons: next session, this week, next 2 weeks.
    // Every recommendation requires evidence. Never predicts outcomes.
    _generateStudyStrategy() {
        let data = MayLearnerState.load();
        let sessions = data.sessions || [];
        let topicProgress = null;
        try { topicProgress = MayLearnerState.getTopicProgress(); } catch (e) {}

        let lookback = sessions.slice(-7);
        if (lookback.length < 1) return null;

        let totalAll = 0, totalCorrect = 0;
        let allTopics = {};
        lookback.forEach(s => {
            (s.attempts || []).forEach(a => {
                totalAll++;
                if (a.correct) totalCorrect++;
                let topic = a.topic || 'Unclassified';
                if (!allTopics[topic]) allTopics[topic] = { n: 0, c: 0 };
                allTopics[topic].n++;
                if (a.correct) allTopics[topic].c++;
            });
        });
        if (totalAll === 0) return null;

        let lines = [];
        lines.push('**Your personal study strategy**');
        lines.push('');

        // ── Evidence summary ──
        lines.push('*Based on ' + lookback.length + ' session(s) and ' + totalAll + ' questions answered.*');
        lines.push('');

        let entries = Object.entries(allTopics);
        let weakTopics = entries.filter(([, v]) => v.n >= 5 && (v.c / v.n) < 60).sort((a, b) => (a[1].c / a[1].n) - (b[1].c / b[1].n));
        let strongTopics = entries.filter(([, v]) => v.n >= 3 && (v.c / v.n) >= 85).sort((a, b) => (b[1].c / b[1].n) - (a[1].c / a[1].n));
        let patterns = (data.misconceptionPatterns || []).filter(p => p.count >= 2).sort((a, b) => b.count - a.count);

        // ── Next session plan ──
        lines.push('**▶ Next study session**');
        let nextLines = [];
        if (weakTopics.length > 0) {
            let [topic, v] = weakTopics[0];
            nextLines.push('- Focus session on **' + topic + '** (' + Math.round(v.c / v.n * 100) + '% recent accuracy) — review the governing rule, then work 5-6 items mixing concept and calculation.');
            nextLines.push('- After each incorrect item, tap **Explain** to see the full coaching breakdown — especially the common trap and pattern-recognition sections.');
            if (patterns.length > 0 && patterns[0].count >= 3) {
                nextLines.push('- Watch for **' + (May.PATTERN_NAMES[patterns[0].pattern] || patterns[0].pattern) + '** — this has appeared ' + patterns[0].count + ' times. Review the boundary between the correct concept and this trap.');
            }
        } else if (strongTopics.length > 0) {
            let [topic] = strongTopics[0];
            nextLines.push('- **' + topic + '** is solid. Try 3-4 items at higher difficulty or switch to a case study in this area to stretch your application skills.');
            nextLines.push('- Identify a topic you have NOT practiced recently and add 2-3 items on it to prevent knowledge decay.');
        } else {
            nextLines.push('- Work through 5-8 items across different topics to build your topic-level data. Varied practice is better than focusing on one area right now.');
        }
        nextLines.forEach(l => lines.push(l));
        lines.push('');

        // ── This week ──
        lines.push('**📅 This week**');
        let weekLines = [];
        if (weakTopics.length >= 2) {
            weekLines.push('- Priority 1: **' + weakTopics[0][0] + '** — dedicated review session. Aim for 10+ items this week.');
            weekLines.push('- Priority 2: **' + weakTopics[1][0] + '** — mixed review with one of your strong topics so you do not burn out on only weak areas.');
        } else if (weakTopics.length === 1) {
            weekLines.push('- Focus ' + weakTopics[0][0] + ' with 2-3 sessions this week. Rotate in other topics to maintain overall coverage.');
        } else {
            weekLines.push('- Continue your current practice cadence. A consistent schedule (even 15-20 items per session) builds momentum.');
        }
        if (patterns.length > 0) {
            weekLines.push('- Add a focused drill on **' + (May.PATTERN_NAMES[patterns[0].pattern] || patterns[0].pattern) + '**: create 5 flash cards showing correct-vs-wrong concept boundaries. Test yourself daily.');
        }
        if (strongTopics.length > 0) {
            weekLines.push('- Maintain **' + strongTopics[0][0] + '** with 3-4 review items. Do not let strong areas decay.');
        }
        weekLines.forEach(l => lines.push(l));
        lines.push('');

        // ── Next 2 weeks ──
        lines.push('**🗓 Next 2 weeks**');
        let twoWeekLines = [];
        if (weakTopics.length > 0) {
            twoWeekLines.push('- Target: raise your weakest topic (' + weakTopics[0][0] + ') from ' + Math.round(weakTopics[0][1].c / weakTopics[0][1].n * 100) + '% to above 60% across at least 10 more attempts.');
        }
        if (patterns.length >= 2) {
            twoWeekLines.push('- Address **' + (May.PATTERN_NAMES[patterns[0].pattern] || patterns[0].pattern) + '** and **' + (May.PATTERN_NAMES[patterns[1].pattern] || patterns[1].pattern) + '** — these two misconception patterns account for the majority of your incorrect answers. Closing them will raise your baseline significantly.');
        }
        twoWeekLines.push('- After 2 weeks, revisit this strategy — your evidence base will have grown, and priorities may shift.');
        twoWeekLines.forEach(l => lines.push(l));
        lines.push('');

        // ── Evidence disclosure ──
        lines.push('---');
        lines.push('*Every recommendation above is based on your actual practice data. No predetermined curriculum. As you complete more sessions, suggestions will become more specific.*');

        return {
            lines: lines,
            hasData: true,
            weakTopics: weakTopics.map(([t]) => t),
            strongTopics: strongTopics.map(([t]) => t),
            patternCount: patterns.length,
            sessionCount: lookback.length
        };
    },

    _showWeeklyDigest() {
        let digest = this._generateWeeklyDigest();
        if (!digest || !digest.hasData) {
            this._speak("I need at least 2 practice sessions for a weekly review. Complete a couple more and I'll break down your learning patterns across the week.");
            return;
        }

        // S129 — Record weekly digest delivery
        if (digest.weakTopics) {
            digest.weakTopics.forEach(t => {
                this._recordRecommendation('weekly_digest', 'weekly_focus', t, null,
                    'Weekly digest recommended focus on ' + t, {});
            });
        }

        let text = digest.lines.join('\n');
        if (this.isPilotEnvironment()) {
            this._guardedSpeak(text, 'digest');
        } else {
            this._speak(text);
        }
    },

    // ── S128 — Display personal study strategy ──
    _showStudyStrategy() {
        let strategy = this._generateStudyStrategy();
        if (!strategy || !strategy.hasData) {
            this._speak("I need at least one practice session to build a study strategy. Complete a session and I'll create a personalized plan based on your actual performance.");
            return;
        }

        // S129 — Record strategy delivery for weak topics
        if (strategy.weakTopics) {
            strategy.weakTopics.forEach(t => {
                this._recordRecommendation('study_strategy', 'priority_topic', t, null,
                    'Study strategy prioritized ' + t, {});
            });
        }

        let text = strategy.lines.join('\n');
        if (this.isPilotEnvironment()) {
            this._guardedSpeak(text, 'strategy');
        } else {
            this._speak(text);
        }
    },

    // ============================================================
    // S129 — Strategy Effectiveness Analytics ("What's Helping Most")
    // ============================================================

    // Evaluate which coaching recommendations appear most helpful
    // based on observed evidence. Never makes causal claims.
    // Never uses prediction/readiness/confidence language.
    _generateStrategyEffectiveness() {
        let outcomeSummary = MayLearnerState.getOutcomeSummary();
        let outcomes = MayLearnerState.load().recommendationOutcomes || [];
        let recurrence = MayLearnerState.getRecommendationRecurrence();
        let longitudinal = MayLearnerState.getLongitudinalAnalytics();

        if (!outcomeSummary.hasData || outcomes.length === 0) {
            return {
                hasData: false,
                lines: [],
                message: "I need to deliver at least one recommendation before I can evaluate what's been most helpful. Complete a session and I'll begin tracking."
            };
        }

        let lines = [];
        lines.push('**Strategy effectiveness — what the evidence shows**');
        lines.push('');
        lines.push('*Based on ' + outcomes.length + ' recommendation(s) delivered across your sessions.*');
        lines.push('');

        // ── Outcome distribution ──
        let classified = outcomes.filter(o => o.outcome !== null);
        let positiveCount = classified.filter(o => o.outcome === 'positive').length;
        let neutralCount = classified.filter(o => o.outcome === 'neutral').length;
        let contradictoryCount = classified.filter(o => o.outcome === 'contradictory').length;

        // ── Only present when evidence threshold met ──
        if (positiveCount >= 2) {
            lines.push('**Recommendations followed by improvement:**');
            let positive = classified.filter(o => o.outcome === 'positive');
            let byType = {};
            positive.forEach(p => {
                let label = {
                    'next_best_step': 'Next Best Step', 'focus_area': 'Focus Areas',
                    'weekly_digest': 'Weekly Digest', 'study_strategy': 'Study Strategy'
                }[p.type] || p.type;
                if (!byType[label]) byType[label] = [];
                byType[label].push(p);
            });
            Object.entries(byType).forEach(([label, recs]) => {
                let topics = [...new Set(recs.map(r => r.topic).filter(Boolean))];
                lines.push('- **' + label + '** appeared helpful for: ' + topics.map(t => '**' + t + '**').join(', ') + '.');
                recs.forEach(r => {
                    if (r.outcomeEvidence && r.outcomeEvidence.delta !== null) {
                        lines.push('  - ' + r.topic + ': accuracy improved by ' + r.outcomeEvidence.delta + ' percentage points (now ' + r.outcomeEvidence.currentAccuracy + '%).');
                    }
                });
            });
            lines.push('');
        }

        if (neutralCount >= 2) {
            lines.push('**Recommendations with no clear change yet:**');
            let neutral = classified.filter(o => o.outcome === 'neutral');
            let neutralByType = {};
            neutral.forEach(n => {
                let label = {
                    'next_best_step': 'Next Best Step', 'focus_area': 'Focus Areas',
                    'weekly_digest': 'Weekly Digest', 'study_strategy': 'Study Strategy'
                }[n.type] || n.type;
                neutralByType[label] = (neutralByType[label] || 0) + 1;
            });
            Object.entries(neutralByType).forEach(([label, count]) => {
                lines.push('- ' + count + ' **' + label + '** recommendation(s) — more practice may clarify the effect.');
            });
            lines.push('');
        }

        if (contradictoryCount >= 1) {
            lines.push('**Notes:**');
            let contradictory = classified.filter(o => o.outcome === 'contradictory');
            contradictory.forEach(c => {
                lines.push('- ' + (c.topic || 'A topic') + ' declined despite a ' + ({
                    'next_best_step': 'Next Best Step', 'focus_area': 'Focus Areas',
                    'weekly_digest': 'Weekly Digest', 'study_strategy': 'Study Strategy'
                }[c.type] || c.type) + ' recommendation. This could mean the recommendation type was not a good fit, more time is needed, or other factors are at play.');
            });
            lines.push('');
        }

        // ── Recommendation recurrence insight ──
        if (recurrence.hasRecurrence) {
            let deprioritized = Object.entries(recurrence.byTopic).filter(([, t]) => t.recurrenceAdjustment === 'deprioritize');
            if (deprioritized.length > 0) {
                lines.push('**Previously addressed topics:**');
                deprioritized.forEach(([topic, t]) => {
                    let lastOutcome = t.outcomes[t.outcomes.length - 1];
                    if (lastOutcome === 'positive') {
                        lines.push('- **' + topic + '** improved after a prior recommendation — not re-recommending the same approach unless new evidence appears.');
                    } else if (lastOutcome === 'contradictory') {
                        lines.push('- **' + topic + '** showed declining performance after a prior recommendation — a different approach may work better.');
                    }
                });
                lines.push('');
            }
        }

        // ── Longitudinal snapshot ──
        let week1 = longitudinal['1week'];
        if (week1 && week1.hasData) {
            lines.push('**Recent (past week):**');
            lines.push('- ' + week1.sessionCount + ' session(s), ' + week1.totalAttempts + ' questions attempted.');
            if (week1.recommendationCount > 0) {
                lines.push('- ' + week1.recommendationCount + ' recommendation(s) delivered; ' +
                    (week1.recommendationOutcomes.positive || 0) + ' associated with improvement.');
            }
            if (week1.misconceptionOccurrences > 0) {
                lines.push('- ' + week1.misconceptionOccurrences + ' incorrect answers — use the Review Queue to systematically close these gaps.');
            }
            lines.push('');
        }

        // ── Evidence disclosure ──
        lines.push('---');
        lines.push('*Every observation above is based on your actual practice data — performance changes, answer patterns, and session history. No conclusion implies causation.*');
        lines.push('*"Helpful" means improvement in topic accuracy was observed after the recommendation was delivered. It does NOT mean the recommendation caused the improvement. Other factors (additional study, prior knowledge, question difficulty) may contribute.*');

        return {
            hasData: true,
            lines: lines,
            outcomeSummary: outcomeSummary,
            recurrence: recurrence,
            longitudinal: longitudinal,
            evidenceSources: [
                'recommendation outcomes (MayLearnerState.recommendationOutcomes)',
                'topic progress (MayLearnerState.getTopicProgress)',
                'trends (MayLearnerState.getTrends)',
                'longitudinal windows (1wk/2wk/4wk)'
            ]
        };
    },

    // Display strategy effectiveness analytics
    _showStrategyEffectiveness() {
        let result = this._generateStrategyEffectiveness();
        if (!result || !result.hasData) {
            this._speak(result && result.message ? result.message :
                "I need at least one delivered recommendation before I can evaluate what's been most helpful. Complete a session with coaching and check back.");
            return;
        }

        let text = result.lines.join('\n');
        if (this.isPilotEnvironment()) {
            this._guardedSpeak(text, 'effectiveness');
        } else {
            this._speak(text);
        }
    },

    // Record that a coaching recommendation was delivered to the learner.
    // Hooked into all existing coaching paths (Next Best Step, Focus Areas,
    // Weekly Digest, Study Strategy) to create the feedback loop.
    _recordRecommendation(type, subType, topic, section, text, evidence) {
        return MayLearnerState.recordRecommendationDelivery({
            type: type,
            subType: subType,
            topic: topic,
            section: section,
            text: text || '',
            evidence: evidence || {},
            sessionId: this.context.sessionId
        });
    },

    // ── S129 — Recommendation quality scoring (internal only) ──
    _scoreRecommendationQuality(rec) {
        let scores = {};
        let evidence = rec.evidence || {};

        scores.relevance = 0;
        if (rec.type === 'next_best_step' && rec.subType && rec.subType !== 'general_guidance') scores.relevance = 3;
        else if (rec.type === 'focus_area' && rec.subType === 'high') scores.relevance = 3;
        else if (rec.type === 'focus_area' && rec.subType === 'medium') scores.relevance = 2;
        else if (rec.type === 'weekly_digest' || rec.type === 'study_strategy') scores.relevance = 1;
        else scores.relevance = 0;

        scores.specificity = 0;
        if (rec.topic) scores.specificity += 1;
        if (rec.subType) scores.specificity += 1;
        if (evidence.accuracy !== undefined || evidence.count !== undefined) scores.specificity += 1;

        let attempts = evidence.attempts || 0;
        if (attempts >= 5) scores.evidenceStrength = 3;
        else if (attempts >= 3) scores.evidenceStrength = 2;
        else if (attempts >= 1) scores.evidenceStrength = 1;
        else scores.evidenceStrength = 0;

        let data = MayLearnerState.load();
        let sameTopicRecs = (data.recommendationOutcomes || []).filter(o => o.topic === rec.topic).length;
        scores.recurrenceRate = sameTopicRecs;

        scores.followThrough = 0;
        let laterSessions = (data.sessions || []).filter(s => {
            return (data.recommendationOutcomes || []).some(o => o.deliveredAt && s.date > o.deliveredAt);
        });
        if (laterSessions.length > 0) scores.followThrough = Math.min(laterSessions.length, 3);

        scores.composite = scores.relevance + scores.specificity + scores.evidenceStrength + Math.min(scores.recurrenceRate, 3) + scores.followThrough;
        scores.maxComposite = 15;

        return scores;
    },

    _summarizeSession() {
        let data = MayLearnerState.load();
        let hasActiveSession = typeof state !== 'undefined' && state.session && state.session.completed;

        if (!hasActiveSession && data.sessionSummaries.length === 0) {
            this._speak("There's no completed session to summarize. Finish your current practice session and I'll break down what happened.");
            return;
        }

        let parts = [];

        // Use the most recent completed session
        if (hasActiveSession) {
            let s = state.session;
            let mcqTotal = (s.mcqs || []).length;
            let caseSetCount = (s.cases || []).length;
            let allMcqAnswered = 0, allMcqCorrect = 0;
            (s.mcqs || []).forEach(q => {
                if (s.answers[q.QuestionID] !== undefined) {
                    allMcqAnswered++;
                    if (typeof scoreMCQ === 'function' && scoreMCQ(q, s.answers[q.QuestionID]) === 1) allMcqCorrect++;
                }
            });
            let mcqPct = allMcqAnswered > 0 ? Math.round(allMcqCorrect / allMcqAnswered * 100) : null;

            // Session 93 — Count case items
            let caseTotal = 0, caseAnswered = 0, caseCorrect = 0;
            (s.cases || []).forEach(c => {
                (c.Items || []).forEach((it, i) => {
                    let key = (typeof ExamSessionManager !== 'undefined' && ExamSessionManager.caseKey)
                        ? ExamSessionManager.caseKey(c, i) : c.CaseID + '-' + i;
                    let ans = s.caseAnswers ? s.caseAnswers[key] : undefined;
                    caseTotal++;
                    if (ans !== undefined) {
                        caseAnswered++;
                        let isCorrect = (typeof ExamSessionManager !== 'undefined' && ExamSessionManager.correctCase)
                            ? ExamSessionManager.correctCase(it, ans) : false;
                        if (isCorrect) caseCorrect++;
                    }
                });
            });
            let casePct = caseAnswered > 0 ? Math.round(caseCorrect / caseAnswered * 100) : null;

            parts.push(`**Session summary**\n`);

            if (mcqPct !== null) {
                parts.push(`You answered ${allMcqAnswered} of ${mcqTotal} MCQs with ${allMcqCorrect} correct${mcqPct !== null ? ` (${mcqPct}%)` : ''}.`);
            }
            if (caseTotal > 0) {
                parts.push(`Case study performance: ${caseCorrect} of ${caseAnswered} attempted items correct across ${caseTotal} case items${casePct !== null ? ` (${casePct}%)` : ''}.`);
            }

            // Topic breakdown from this session
            let topicCounts = {};
            (s.mcqs || []).forEach(q => {
                let topic = MayLearnerState._normalizeTopic(q.Topic || 'Unclassified');
                if (!topicCounts[topic]) topicCounts[topic] = { n: 0, c: 0 };
                topicCounts[topic].n++;
                if (s.answers[q.QuestionID] !== undefined && typeof scoreMCQ === 'function' && scoreMCQ(q, s.answers[q.QuestionID]) === 1) {
                    topicCounts[topic].c++;
                }
            });

            let topicEntries = Object.entries(topicCounts).sort((a, b) => (a[1].c / Math.max(1, a[1].n)) - (b[1].c / Math.max(1, b[1].n)));
            let weakest = topicEntries.slice(0, 3);
            let strongest = [...topicEntries].reverse().slice(0, 3);

            if (weakest.length > 0) {
                parts.push(`\n**Weakest this session:** ${weakest.map(([t, v]) => `${t} (${v.c}/${v.n})`).join(', ')}`);
            }
            if (strongest.length > 0 && strongest[0][1].c > 0) {
                parts.push(`**Strongest this session:** ${strongest.filter(([, v]) => v.c > 0).slice(0, 2).map(([t, v]) => `${t} (${v.c}/${v.n})`).join(', ')}`);
            }

            // S126 — Append structured recap
            let recap = this._generateSessionRecap(s, topicEntries, data);
            if (recap && recap.hasData) {
                parts.push('');
                parts.push('---');
                parts = parts.concat(recap.lines);
            }
        }

        // Cross-session note
        if (data.sessions.length >= 2) {
            let sessions = data.sessions;
            let recent = sessions[sessions.length - 1];
            let prior = sessions[sessions.length - 2];
            if (recent && prior) {
                let recentPct = recent.attempts.length > 0
                    ? Math.round(recent.attempts.filter(a => a.correct).length / recent.attempts.length * 100) : null;
                let priorPct = prior.attempts.length > 0
                    ? Math.round(prior.attempts.filter(a => a.correct).length / prior.attempts.length * 100) : null;
                if (recentPct !== null && priorPct !== null) {
                    let delta = recentPct - priorPct;
                    if (delta >= 10) {
                        parts.push(`\nCompared to your previous session, your accuracy improved from ${priorPct}% to ${recentPct}% (+${delta}%).`);
                    } else if (delta <= -10) {
                        parts.push(`\nYour accuracy dropped from ${priorPct}% to ${recentPct}% (${delta}%) compared to the prior session — worth reviewing what changed.`);
                    }
                }
            }
        }

        let weakestTopic = (typeof topicEntries !== 'undefined' && topicEntries.length > 0) ? topicEntries[0][0] : null;
        if (weakestTopic && topicEntries && topicEntries[0][1].c / Math.max(1, topicEntries[0][1].n) < 0.6) {
            parts.push(`\n**Next:** Focus on **${weakestTopic}** — it was your weakest topic this session. Review every explanation, not just the correct one but why each distractor is wrong. That's where the deepest learning happens.`);
        } else if (weakestTopic) {
            parts.push(`\n**Next:** Your performance was fairly even across topics. For your next session, try increasing the difficulty slightly or mixing in a case study to challenge your application skills.`);
        } else {
            parts.push(`\n**Next:** Complete more practice sessions to build a topic-level picture of your strengths and gaps.`);
        }

        // S113 — Pilot path
        let summaryText = parts.join('\n');
        if (this.isPilotEnvironment()) {
            this._guardedSpeak(summaryText, 'summary');
        } else {
            this._speak(summaryText);
        }
    },

    _recommendSimilar() {
        let q = this.context.currentQuestion;
        if (!q) { this._speak("I need a question to base a recommendation on. Start a review first."); return; }

        let topic = MayLearnerState._normalizeTopic(q.Topic || '');
        let section = q.Section;
        let difficulty = q.DifficultyScore || 3;

        // Find similar questions in the bank
        let candidates = this._findSimilarQuestions(topic, section, difficulty);
        if (candidates.length === 0) {
            this._speak(`I couldn't find another certified question on **${topic}** in your available packs. Try broadening your pack selection or difficulty range.`);
            return;
        }

        let pick = candidates[Math.floor(Math.random() * Math.min(candidates.length, 5))];
        this._speak(`Try this one next:\n\n**QID ${pick.QuestionID}** — ${pick.Stem ? pick.Stem.substring(0, 150) + '...' : '(stem not available)'}\n\nThis is also about **${topic}** (Section ${pick.Section}, ${pick.Difficulty} difficulty). It tests the same concept from a slightly different angle.`);

        // S112 — Gate check pilot
        this._guardedRecommend([pick.QuestionID], 'similar');

        // G2: Log recommendation event
        MayLearnerState.logRecommendation({
            sourceTopic: topic,
            sourceDomain: section,
            reasonType: 'similar_question',
            recommendedQids: [pick.QuestionID],
            packPool: ['A', 'B', 'C', 'D', 'E'],
            excludedByDefect: [],
            excludedByContested: [],
            activeSessionId: this.context.sessionId,
            activeExamMode: this.isFullTabBlocked()
        });

        if (typeof MayTelemetry !== 'undefined') {
            MayTelemetry.trackAdoption({ recommendationType: 'similar_question', topic: topic, section: section, panelOpened: false, clicked: true, timestamp: new Date().toISOString() });
        }
    },

    _recommendNext() {
        let clusters = MayLearnerState.getWeaknessClusters();
        // Session 89D — Outcome-aware: separately track correct (strong exclusion)
        // and missed (soft exclusion) so missed items can still appear in recovery.
        let seenByOutcome = MayLearnerState.getRecentlySeenByOutcome(3);
        let recentlyCorrect = new Set(seenByOutcome.correct || []);
        let recentlyAll = new Set(seenByOutcome.all || []);

        let targetTopic = null;
        let isPersistent = false;

        // Priority 1: persistent weak area
        if (clusters.persistentWeak.length > 0) {
            targetTopic = clusters.persistentWeak[0].topic;
            isPersistent = true;
        }
        // Priority 2: declining area
        else if (clusters.declining.length > 0) {
            targetTopic = clusters.declining[0].topic;
        }
        // Priority 3: unstable area
        else if (clusters.unstable.length > 0) {
            targetTopic = clusters.unstable[0].topic;
        }

        if (!targetTopic) {
            // No clear weaknesses — recommend a stretch
            let trends = MayLearnerState.getTrends();
            let strongTopics = trends.filter(t => t.accuracy >= 70 && t.totalAttempts >= 2);
            if (strongTopics.length > 0) {
                let pick = strongTopics[Math.floor(Math.random() * strongTopics.length)];
                this._speak(`Your performance is fairly balanced. For a stretch, work on **${pick.topic}** at a higher difficulty — you're at ${pick.accuracy}% now, and pushing that into harder territory would build exam readiness.\n\nOr try a full mixed simulation if you haven't done one recently — that tests your ability to switch between topics, which is what the actual exam demands.`);
                return;
            }
            this._speak("Your history doesn't show any clear weak spots yet. I'd recommend a mixed-topic session covering all six sections — that will reveal where your gaps really are.");
            return;
        }

        // Find a certified question on the target topic
        let allCandidates = this._findSimilarQuestions(targetTopic, null, 3);
        let excludedByDefect = allCandidates.filter(c => this._isBlockedByDefectManifest(c.QuestionID)).map(c => c.QuestionID);
        let excludedByContested = allCandidates.filter(c => MayLearnerState.isQuestionContested(c.QuestionID)).map(c => c.QuestionID);
        let candidates = allCandidates.filter(c => !excludedByDefect.includes(c.QuestionID) && !excludedByContested.includes(c.QuestionID));
        // Session 89D — Outcome-aware: only exclude recently-CORRECT items.
        // Recently-missed items CAN appear in recommendations (the learner needs them).
        candidates = candidates.filter(c => !recentlyCorrect.has(c.QuestionID));

        if (candidates.length === 0) {
            this._speak(`Your weakest area is **${targetTopic}**, but I don't have an unseen certified question available right now. Try selecting packs that include this topic in your next session setup.`);
            return;
        }

        let pick = candidates[0];
        let persistentData = isPersistent ? clusters.persistentWeak[0] : null;
        let accuracyNote = persistentData
            ? `\n\nYour accuracy on this topic is currently ${persistentData.accuracy}% after ${persistentData.totalAttempts} attempts. A focused session targeting just this area would be the most efficient way to improve.`
            : '';

        this._speak(`I recommend working on **${targetTopic}** next.\n\nHere is a certified question to start with: **${pick.QuestionID}** (${pick.Difficulty || 'Moderate'} difficulty).${accuracyNote}\n\nSet up a 10-15 question MCQ session targeting this topic's section, and review every explanation carefully — especially the ones for choices you got right, to make sure your reasoning was sound.`);

        // S112 — Gate check pilot
        this._guardedRecommend([pick.QuestionID], 'next');

        // G2: Log recommendation event
        MayLearnerState.logRecommendation({
            sourceTopic: targetTopic,
            sourceDomain: candidates.length > 0 ? candidates[0].Section : null,
            reasonType: isPersistent ? 'persistent_weak' : 'declining_or_unstable',
            recommendedQids: [pick.QuestionID],
            packPool: ['A', 'B', 'C', 'D', 'E'],
            excludedByDefect: excludedByDefect,
            excludedByContested: excludedByContested,
            activeSessionId: this.context.sessionId,
            activeExamMode: this.isFullTabBlocked()
        });

        if (typeof MayTelemetry !== 'undefined') {
            MayTelemetry.trackAdoption({ recommendationType: isPersistent ? 'persistent_weak' : 'declining_or_unstable', topic: targetTopic, section: candidates.length > 0 ? candidates[0].Section : null, panelOpened: false, clicked: true, timestamp: new Date().toISOString() });
        }
    },
    _generateRecoverySet(count) {
        count = count || 10;
        let clusters = MayLearnerState.getWeaknessClusters();
        // Session 89D — Outcome-aware: separate correct (aggressive exclusion) from
        // missed (soft exclusion — missed items CAN appear in recovery).
        let seenByOutcome = MayLearnerState.getRecentlySeenByOutcome(5);
        let recentlyCorrect = new Set(seenByOutcome.correct || []);
        let recentlyAll = new Set(seenByOutcome.all || []);
        let data = MayLearnerState.load();

        if (!data.sessions || data.sessions.length === 0) {
            this._speak("I need session history to build a recovery set. Complete a practice session first.");
            return;
        }

        // Priority targets: persistent weak > declining > unstable > difficulty-sensitive
        let targets = [];
        clusters.persistentWeak.slice(0, 3).forEach(t => targets.push({ topic: t.topic, priority: 1, label: 'persistently weak' }));
        clusters.declining.slice(0, 2).forEach(t => targets.push({ topic: t.topic, priority: 2, label: 'recently declining' }));
        clusters.unstable.slice(0, 1).forEach(t => targets.push({ topic: t.topic, priority: 3, label: 'unstable' }));
        clusters.difficultySensitive.slice(0, 1).forEach(t => targets.push({ topic: t.topic, priority: 4, label: 'weak at higher difficulty' }));

        if (targets.length === 0) {
            let trends = MayLearnerState.getTrends();
            let lowest = trends.filter(t => t.totalAttempts >= 2).slice(0, 3);
            if (lowest.length > 0) {
                lowest.forEach(t => targets.push({ topic: t.topic, priority: 5, label: 'lowest accuracy' }));
            }
        }

        if (targets.length === 0) {
            this._speak("I don't have enough topic data to build a targeted recovery set yet. Complete a few more practice sessions covering different sections.");
            return;
        }

        // Allocate questions proportionally by priority (inverse: higher priority = more questions)
        let totalPriority = targets.reduce((s, t) => s + (6 - t.priority), 0);
        let allocation = targets.map(t => ({
            ...t,
            alloc: Math.max(1, Math.round(count * (6 - t.priority) / totalPriority))
        }));
        // Adjust to hit exact count
        let totalAlloc = allocation.reduce((s, a) => s + a.alloc, 0);
        if (totalAlloc < count) allocation[0].alloc += (count - totalAlloc);

        let resultSet = [];
        allocation.forEach(a => {
            let candidates = this._findSimilarQuestions(a.topic, null, 3);
            // Session 89D — Outcome-aware: exclude recently-CORRECT items but allow
            // recently-MISSED items to appear in recovery (the learner needs them).
            let filtered = candidates.filter(c =>
                !recentlyCorrect.has(c.QuestionID) && !resultSet.find(r => r.QuestionID === c.QuestionID)
            );
            // Fallback: if outcome-aware filter eliminates everything, allow recently-correct
            if (filtered.length === 0) filtered = candidates.filter(c => !resultSet.find(r => r.QuestionID === c.QuestionID));
            let take = Math.min(a.alloc, filtered.length);
            resultSet.push(...filtered.slice(0, take).map(c => ({ ...c, _reason: a.label })));
        });

        if (resultSet.length === 0) {
            this._speak("I identified your weak topics but couldn't find enough unseen Certified questions. Try expanding your pack selection in the session setup.");
            return;
        }

        let parts = [];
        parts.push(`**Recovery set — ${resultSet.length} questions targeting your weakest areas**\n`);

        allocation.filter(a => resultSet.some(r => r._reason === a.label)).forEach(a => {
            let items = resultSet.filter(r => r._reason === a.label);
            parts.push(`**${a.topic}** (${a.label}) — ${items.length} question(s)`);
            items.forEach(it => {
                parts.push(`- ${it.QuestionID} (${it.Section}, ${it.Difficulty || 'Moderate'})`);
            });
        });

        parts.push(`\n*To use this set: start a new MCQ session and manually select these QIDs, or use the sections above to filter. Review every explanation — especially the distractor explanations for choices you'd normally eliminate.*`);

        this._speak(parts.join('\n'));

        // S112 — Gate check pilot on full recovery set
        let recoveryQids = resultSet.map(r => r.QuestionID);
        this._guardedRecommend(recoveryQids, 'recovery');

        // G2: Log recommendation event
        MayLearnerState.logRecommendation({
            sourceTopic: targets.map(t => t.topic).join(', '),
            sourceDomain: null,
            reasonType: 'recovery_set',
            recommendedQids: resultSet.map(r => r.QuestionID),
            packPool: ['A', 'B', 'C', 'D', 'E'],
            excludedByDefect: [],
            excludedByContested: [],
            activeSessionId: this.context.sessionId,
            activeExamMode: this.isFullTabBlocked()
        });
    },

    // ── Find similar questions using the topic index ──────
    _findSimilarQuestions(topic, section, targetDifficulty) {
        this._ensureTopicIndex();
        let candidates = (this._topicIndex[topic] || []).slice();
        if (section) candidates = candidates.filter(q => q.Section === section);
        // Session 89D — Filter out delivery-blocked and defect-manifest QIDs
        candidates = candidates.filter(q => !this._isBlockedByDefectManifest(q.QuestionID));
        candidates = candidates.filter(q => !MayLearnerState.isQuestionContested(q.QuestionID));
        // Also check the app-level delivery blocklist if available
        if (typeof _isDeliveryBlocked === 'function') {
            candidates = candidates.filter(q => !_isDeliveryBlocked(q.QuestionID));
        }
        if (targetDifficulty) {
            candidates.sort((a, b) => {
                let da = Math.abs((a.DifficultyScore || 3) - targetDifficulty);
                let db = Math.abs((b.DifficultyScore || 3) - targetDifficulty);
                return da - db;
            });
        }
        return candidates;
    },

    // ── Lazy topic index — maps topics to matching bank QIDs ─
    // Replaces full bank cache; queries globals on first use, builds
    // a lightweight { topic: [QuestionID, ...] } index (~50KB vs ~2.5MB).
    _ensureTopicIndex() {
        if (!this._topicIndex) {
            this._topicIndex = {};
            let banks = [];
            try { if (typeof MCQ_BANK_A !== 'undefined') banks.push(MCQ_BANK_A); } catch (e) {}
            try { if (typeof MCQ_BANK_B !== 'undefined') banks.push(MCQ_BANK_B); } catch (e) {}
            try { if (typeof MCQ_BANK_C !== 'undefined') banks.push(MCQ_BANK_C); } catch (e) {}
            try { if (typeof MCQ_BANK_D !== 'undefined') banks.push(MCQ_BANK_D); } catch (e) {}
            try { if (typeof MCQ_BANK_E !== 'undefined') banks.push(MCQ_BANK_E); } catch (e) {}
            banks.forEach(bank => {
                bank.forEach(q => {
                    if (!q.QuestionID || q.question_state !== 'Certified') return;
                    let topic = MayLearnerState._normalizeTopic(q.Topic || '');
                    if (!this._topicIndex[topic]) this._topicIndex[topic] = [];
                    this._topicIndex[topic].push(q);
                });
            });
        }
    },

    // ── Load defect manifest for G1 gating ──────────────
    _loadDefectManifest() {
        if (this.context._defectManifest) return this.context._defectManifest;
        this.context._defectManifest = {};
        try {
            let raw = localStorage.getItem('cmaDefectManifest_DL008_DL026');
            if (raw) {
                let manifest = JSON.parse(raw);
                (manifest.blockedQids || []).forEach(entry => {
                    this.context._defectManifest[entry.qid] = entry;
                });
            }
        } catch (e) { /* manifest unavailable — safe fallback */ }
        // Also check for embedded manifest on window (loaded from governance/ JSON)
        if (typeof window !== 'undefined' && window._cmaDefectManifest) {
            (window._cmaDefectManifest.blockedQids || []).forEach(entry => {
                this.context._defectManifest[entry.qid] = entry;
            });
        }
        return this.context._defectManifest;
    },

    // ── Check if a QID is blocked by the defect manifest ─
    _isBlockedByDefectManifest(qid) {
        let manifest = this._loadDefectManifest();
        let entry = manifest[qid];
        return entry && entry.block_from_recommendation !== false;
    },

    // ============================================================
    // I. Freeform chat handling
    // ============================================================

    _handleFreeform(text) {
        let lower = text.toLowerCase();

        // Name detection — if user doesn't have a name set yet
        let profile = MayLearnerState.getUserProfile();
        if (!profile.name) {
            if (this.trySetName(text)) return;
        }

        // Pre-exam commands
        if (lower === 'start' || lower === 'begin' || lower === "let's go" || lower === 'go') {
            this._speak("Good luck! I'll be here when you're done. Your results will be broken down by topic with specific recommendations.");
            return;
        }
        if (lower === 'review' || lower === 'review topics' || lower === 'prep me' || lower === 'warm up') {
            this._getWeaknessInsight();
            return;
        }

        // S76 — Direct "give me the answer" requests — redirect to Socratic mode
        let qForAnswer = this.context.currentQuestion;
        if (/^(what('s| is) the answer|tell me the answer|just give me the answer|which (one |)is (right|correct))/i.test(lower)) {
            if (qForAnswer) {
                this._speak("I can help you figure it out! First — what's your instinct? Which answer looks right to you, and why?");
                this._addMessage('may', "Once you share your thinking, I'll walk you through the reasoning step by step.");
                return;
            } else {
                this._speak("I don't have a question loaded yet. Start a review from a practice session, and I'll help you work through it.");
                return;
            }
        }

        // S76 — Quiz me
        if (/\bquiz\b/i.test(lower)) {
            let qForQuiz = this.context.currentQuestion;
            if (!qForQuiz) { this._speak("I need a question loaded first. Start a review from a practice session."); return; }
            let topic = MayLearnerState._normalizeTopic(qForQuiz.Topic || '');
            let questions = [
                'What\'s the key accounting principle this question tests?',
                'If the numbers in the question doubled, would the answer double too? Why or why not?',
                'What\'s the most common mistake candidates make on ' + topic + ' questions?',
                'How would you explain this concept to someone who\'s never studied accounting?'
            ];
            let quizQ = questions[Math.floor(Math.random() * questions.length)];
            this._speak('Let\'s test your understanding!\n\n**' + quizQ + '**\n\nTake your time — I\'ll follow up after you answer.');
            return;
        }

        // Pattern-match common requests
        if (lower.includes('explain') && (lower.includes('answer') || lower.includes('correct') || lower.includes('why'))) {
            this._explainAnswer();
            return;
        }
        if (lower.includes('why') && (lower.includes('wrong') || lower.includes('incorrect') || lower.includes('not'))) {
            this._explainWrongChoices();
            return;
        }
        if (lower.includes('hint') || lower.includes('help') || lower.includes('clue') || lower.includes('stuck')) {
            this._provideHint();
            return;
        }
        if (lower.includes('simple') || lower.includes('simpler') || lower.includes('break it down') || lower.includes('easier')) {
            this._simplifyExplanation();
            return;
        }
        if (lower.includes('another') || lower.includes('similar') || lower.includes('next question') || lower.includes('more like')) {
            this._recommendSimilar();
            return;
        }
        if (lower.includes('improving') || lower.includes('getting better') || lower.includes('progress') || lower.includes('how am i doing')) {
            this._getProgressInsight();
            return;
        }
        if (lower.includes('weak') || lower.includes('struggling') || lower.includes('bad at') || lower.includes('worst')) {
            this._getWeaknessInsight();
            return;
        }
        if (lower.includes('summary') || lower.includes('recap') || lower.includes('how did i do')) {
            this._summarizeSession();
            return;
        }
        if (lower.includes('weekly') || lower.includes('digest') || lower.includes('week in review') || lower.includes('learning review')) {
            this._showWeeklyDigest();
            return;
        }
        if (lower.includes('strategy') || lower.includes('study plan') || lower.includes('what should i focus') || lower.includes('plan my')) {
            this._showStudyStrategy();
            return;
        }
        if (lower.includes('helping') || lower.includes('effective') || lower.includes('what works') || lower.includes('what\'s working')) {
            this._showStrategyEffectiveness();
            return;
        }
        if (lower.includes('study') || lower.includes('next') || lower.includes('recommend') || lower.includes('what should i')) {
            this._recommendNext();
            return;
        }
        if (lower.includes('recovery') || lower.includes('drill') || lower.includes('weak set') || lower.includes('targeted set')) {
            this._generateRecoverySet();
            return;
        }
        if (lower.includes('my mistake') || lower.includes('what did i') || lower.includes('where did i') || lower.includes('why was i')) {
            this._explainYourMistake();
            return;
        }
        if (lower.includes('confidence') || lower.includes('overconfident') || lower.includes('underconfident') || lower.includes('self-assessment')) {
            this._getProgressInsight();
            return;
        }
        if (lower.includes('hello') || lower === 'hi' || lower === 'hey' || lower.startsWith('hi ') || lower.startsWith('hey ')) {
            let p = MayLearnerState.getUserProfile();
            let name = p.name ? ', ' + p.name : '';
            this._speak(`Hi${name}! I'm May. I can help explain questions, give you hints, track your progress, and recommend what to study. What would you like help with?`);
            return;
        }
        if (lower.includes('who are you') || lower.includes('what are you')) {
            this._speak("I'm May — your study companion for CMA Part 1. I track your performance across sessions, explain concepts, give hints, and help you figure out what to work on next. I'm not a chatbot — I read from your actual question bank and session history.");
            return;
        }

        // Challenge / dispute handling
        let challengePhrases = ["that's wrong", 'are you sure', 'i think the answer is',
            'should be', 'disagree', 'incorrect', 'mistake', 'error in the bank',
            "you're wrong", 'you are wrong', 'not correct', 'this is wrong'];
        if (challengePhrases.some(p => lower.includes(p)) && !lower.includes('resolve')) {
            this._handleChallenge(text);
            return;
        }

        // Resolve a challenged QID
        let resolveMatch = text.match(/resolve\s+(P1\w?-\w+-\d+)/i);
        if (resolveMatch) {
            this.resolveChallenge(resolveMatch[1].toUpperCase());
            return;
        }
        if (lower.includes('re-enable') || lower.includes('reenable') || lower.includes('unflag')) {
            this._speak('To re-enable a challenged question, tell me "resolve" followed by the QID, like: resolve P1-A-001.');
            return;
        }

        // Show challenged QIDs
        if (lower.includes('contested') || lower.includes('challenged') || lower.includes('flagged question')) {
            let challenged = MayLearnerState.getChallengedQids();
            let contested = challenged.filter(c => c.status === 'contested');
            if (contested.length === 0) {
                this._speak("You haven't challenged any questions yet. If you believe a question has an error, tell me and I'll flag it and exclude it from your recommendations.");
            } else {
                let parts = ['**Currently contested questions (excluded from recommendations):**'];
                contested.forEach(c => {
                    parts.push(`- ${c.qid} — challenged ${c.count} time(s), last: ${c.lastChallenged ? c.lastChallenged.substring(0, 10) : 'unknown'}`);
                });
                parts.push(`\nTo re-enable a question, type: resolve <QID>`);
                this._speak(parts.join('\n'));
            }
            return;
        }

        // Default: try to be helpful
        let q = this.context.currentQuestion;
        if (q && lower.includes('formula')) {
            this._speak(`Let me check... ${this._extractFormula(q)}`);
            return;
        }
        if (q && (lower.includes('concept') || lower.includes('topic') || lower.includes('what is this'))) {
            let topic = MayLearnerState._normalizeTopic(q.Topic || 'this');
            this._speak(`This question tests **${topic}**${q.Section ? ` from Section ${q.Section}` : ''}. ${this._topicDescription(q.Topic || '')}Would you like me to explain the answer or give you a hint?`);
            return;
        }

        this._speak(`I'm not sure I understood — but I can help with this question. Try one of the quick actions below, or ask me to "explain the answer," "give me a hint," or "summarize my progress."`);
    },

    _extractFormula(q) {
        let explanation = q.ExplanationCorrect || '';
        let formulaMatch = explanation.match(/([=×÷+\-*\/\d\s,.$%()]+(?:=|equals|is|results in)[\s\d,.$%()×÷+\-*\/]+)/i);
        if (formulaMatch) return `The formula from the explanation: ${formulaMatch[0]}`;

        let topic = MayLearnerState._normalizeTopic(q.Topic || '');
        let calcMatch = explanation.match(/([\d,.$%()\s]+\s*[=×÷+\-*\/]\s*[\d,.$%()\s]+)/);
        if (calcMatch) return `The calculation from the explanation: ${calcMatch[0]}`;

        return `I don't see an explicit formula in the explanation for this question, but it's about **${topic}**. Tap "Explain answer" to see the full reasoning.`;
    },

    _topicDescription(topic) {
        let desc = {
            'balance sheet current classification': 'This covers how to classify assets and liabilities as current vs. noncurrent on the balance sheet under ASC 210.',
            'revenue recognition': 'This tests ASC 606 principles: identifying contracts, performance obligations, and timing of revenue recognition.',
            'inventory valuation': 'This covers inventory costing methods (FIFO, LIFO, weighted average) and lower of cost or market/NRV rules.',
            'statement of cash flows': 'This tests classification of cash flows into operating, investing, and financing activities under ASC 230.',
            'financial ratios': 'This covers ratio analysis — liquidity, solvency, activity, and profitability ratios.',
            'budget development': 'This tests the master budget sequence and how individual budgets (sales, production, materials, etc.) interconnect.',
            'cash budget': 'This covers cash collections, disbursements, and financing needs in a cash budget.',
            'flexible budget': 'This tests how flexible budgets adjust for actual activity levels vs. static budget assumptions.',
            'standard costing': 'This covers setting standard costs and analyzing variances between actual and standard.',
            'cost variances': 'This tests material, labor, and overhead variance calculations and their interpretations.',
            'balanced scorecard': 'This covers the four perspectives: financial, customer, internal process, and learning & growth.',
            'transfer pricing': 'This tests methods for pricing goods/services transferred between divisions.',
            'cost behavior': 'This covers fixed vs. variable cost classification and cost estimation methods.',
            'cost-volume-profit analysis': 'This tests breakeven, target profit, and sensitivity analysis using CVP relationships.',
            'relevant costs': 'This covers identifying relevant vs. irrelevant costs for decision-making (make-or-buy, special orders).',
            'job order costing': 'This tests cost accumulation by job, including overhead application using predetermined rates.',
            'process costing': 'This covers equivalent units and cost allocation in continuous production environments.',
            'activity-based costing': 'This tests ABC cost allocation using cost drivers and activity cost pools.',
            'internal control objectives': 'This covers the purpose and components of internal control systems.',
            'coso internal control framework': 'This tests the five COSO components: control environment, risk assessment, control activities, information & communication, and monitoring.',
            'fraud prevention': 'This covers the fraud triangle, red flags, and preventive/detective controls.',
            'segregation of duties': 'This tests the principle of separating authorization, custody, and record-keeping.',
            'data governance': 'This covers data quality, stewardship, and governance frameworks for information systems.',
            'cybersecurity': 'This tests IT security controls, risk assessment, and incident response.',
            'data analytics': 'This covers descriptive, diagnostic, predictive, and prescriptive analytics in accounting.',
            'erp systems': 'This tests enterprise resource planning system concepts and their role in accounting processes.'
        };
        let matchKey = Object.keys(desc).find(k => topic.toLowerCase().includes(k));
        return matchKey ? desc[matchKey] + ' ' : '';
    },

    // ── Challenge resolution — handle student disputes ────
    _handleChallenge(studentText) {
        let q = this.context.currentQuestion;
        let lines = [];

        lines.push("You might be right — and I want to take that seriously.\n");

        if (!q) {
            lines.push("I don't have a specific question loaded right now, so I can't compare. But if you believe a question in the bank has an error, here's what I recommend:");
            lines.push("- Note the QID and your reasoning.");
            lines.push("- Cross-check against the authoritative CMA blueprint or ASC reference.");
            lines.push("- Flag it for review so it can be verified against the source material.");
            this._speak(lines.join('\n'));
            return;
        }

        // Check if this QID is a known defective item
        let knownDefectiveQids = [
            'P1B-B-119', 'P1B-F-084', 'P1B-F-116', 'P1B-F-121', 'P1E-E-037'
        ];
        let isKnownDefective = knownDefectiveQids.includes(q.QuestionID);

        if (isKnownDefective) {
            lines.push(`**Note:** ${q.QuestionID} was previously flagged in the defect library (DL-030 — CorrectChoice answer-key error) and was corrected on 2026-07-24. If you're seeing the old answer, the fix may not have propagated to your loaded pack file.`);
            lines.push('');
        }

        let cc = q.CorrectChoice;
        let storedAnswer = q.Choices ? q.Choices[cc] : `Option ${cc}`;
        let explanation = q.ExplanationCorrect || '(no explanation in bank)';

        // Try to extract the student's proposed answer letter
        // Look for patterns like "should be B", "actually A", "the answer is D"
        let studentLetter = null;
        let proposeMatch = studentText.match(/(?:should\s+be|actually|answer\s+is|think\s+it'?s?)\s+([A-D])\b/i);
        if (proposeMatch) {
            studentLetter = proposeMatch[1].toUpperCase();
        } else {
            // Fallback: if student says "not C" or "isn't B", infer they mean a different letter
            let excludeMatch = studentText.match(/(?:not|isn'?t)\s+([A-D])\b/i);
            if (excludeMatch) {
                let exclude = excludeMatch[1].toUpperCase();
                let allLetters = ['A', 'B', 'C', 'D'];
                let remaining = allLetters.filter(l => l !== exclude);
                studentLetter = remaining[0]; // pick first non-excluded as their likely answer
            }
        }

        lines.push('**What the bank says:**');
        lines.push(`Stored answer: **${cc}** — "${storedAnswer}"`);
        lines.push(`Explanation: ${explanation.substring(0, 300)}${explanation.length > 300 ? '...' : ''}`);
        lines.push('');

        if (studentLetter && studentLetter !== cc && q.Choices && q.Choices[studentLetter]) {
            lines.push(`**What you're suggesting:**`);
            lines.push(`Your proposed answer: **${studentLetter}** — "${q.Choices[studentLetter]}"`);
            lines.push('');
        }

        lines.push('**How to resolve this:**');
        lines.push('1. Check the governing standard — the CMA exam tests U.S. GAAP (ASC), COSO, and IMA guidance. If the bank contradicts the authoritative source, the source wins.');
        lines.push('2. Re-read the stem carefully — sometimes a single word ("not," "except," "least likely") changes what the question is asking.');
        lines.push('3. If after checking the standard you still believe the bank is wrong, flag this QID with your reasoning. The bank has known defects and is under continuous audit.');
        lines.push('');

        // Track the challenge and exclude from delivery pool
        MayLearnerState.flagChallengedQID(q.QuestionID, studentText);

        let count = 0;
        let challenged = MayLearnerState.getChallengedQids();
        let entry = challenged.find(c => c.qid === q.QuestionID);
        if (entry) count = entry.count;

        lines.push(`I've noted your concern about ${q.QuestionID}.`);
        lines.push('');
        if (count === 1) {
            lines.push(`**This question has been flagged as contested.** It won't appear in recommendations, recovery sets, or similar-question suggestions until the challenge is resolved. If the bank is correct and you later want to re-enable it, you can tell me to "resolve ${q.QuestionID}."`);
        } else {
            lines.push(`**This question has been challenged ${count} times.** It remains excluded from recommendations. To re-enable it, tell me to "resolve ${q.QuestionID}."`);
        }
        lines.push('');
        lines.push("I don't have authority to override the answer key, but I won't insist I'm right either. If you're confident after checking the standard, trust your understanding — that's how you learn.");

        this._speak(lines.join('\n'));
    },

    // ── Resolve a challenged QID (re-enable it) ──────────
    resolveChallenge(qid) {
        MayLearnerState.resolveChallenge(qid, 'resolved');
        this._speak(`${qid} has been re-enabled. It will now appear in recommendations and recovery sets again.`);
    },

    // ============================================================
    // J. Render May's view
    // ============================================================

    renderView() {
        let el = document.getElementById('coachView');
        if (!el) return;

        let pendingInput = '';
        let inpEl = document.getElementById('mayChatInput');
        if (inpEl) pendingInput = inpEl.value;

        // ── G6: Block full May tab during active CMA Exam mode ──
        if (this.isFullTabBlocked()) {
            let profile = MayLearnerState.getUserProfile();
            let name = profile.name || '';
            let isNew = !name || MayLearnerState.isNewUser();
            el.innerHTML = `
            <div class="may-container">
                <div class="may-sidebar">
                    <div class="may-brand">
                        <div class="may-avatar" aria-hidden="true">M</div>
                        <div>
                            <h2 class="may-name">May</h2>
                            <span class="may-tagline">clarity that remembers</span>
                        </div>
                    </div>
                </div>
                <div class="may-main">
                    <div class="may-empty-chat may-preexam">
                        <p><strong>CMA Exam Mode is active.</strong> I won't be available during the simulation.</p>
                        <p>Hints, explanations, correct-answer reveals, and all coaching routes are blocked while your exam simulation is active — just like the real testing environment.</p>
                        <p>Your progress is being auto-saved. When you submit your session, I'll break down your results topic by topic, explain what you missed, and build a targeted recovery set.</p>
                        <p class="may-preexam-actions">
                            <button class="may-action-btn" onclick="May.preExamBriefing()">Exam format & briefing</button>
                        </p>
                        <p class="may-preexam-goodluck">Good luck${name ? ', ' + name : ''} — you've prepared for this.</p>
                    </div>
                </div>
            </div>`;
            return;
        }

        let q = this.context.currentQuestion;
        let hasQuestion = !!q;
        let data = MayLearnerState.load();
        let hasHistory = data.sessions && data.sessions.length > 0;
        let sessionCount = hasHistory ? data.sessions.length : 0;

        // Quick insight snippets
        let insightHtml = this._renderInsightCards();
        // Session 98 — Case-pattern insights
        let casePatternHtml = this._renderCasePatternInsights();
        // Session 99 — Practice guidance card
        let practiceGuidanceHtml = this._renderCasePracticeGuidance();
        // Session 100 — Adaptive practice mix card
        let practiceMixHtml = this._renderAdaptivePracticeMix();
        // Session 102 — Readiness Snapshot card
        let readinessHtml = this._renderReadinessSnapshot();
        // Session 103 — Section-level readiness grid
        let sectionReadinessHtml = this._renderSectionReadiness();
        // Session 103 — Provenance/help toggle
        let effectivenessHtml = this._renderEffectivenessScorecard();
        let readinessProvenanceHtml = this._renderReadinessProvenance();

        // Chat messages
        let chatHtml = '';
        if (this.context.chatHistory.length === 0) {
            let profile = MayLearnerState.getUserProfile();
            // Session 88: If review questions are loaded (post-session handoff), show review greeting
            let hasReview = this.context.reviewQuestions && this.context.reviewQuestions.length > 0;
            // Check if CMA Exam mode is active and offer pre-exam briefing
            // W1-B — derived from the shared isExamIntegrityMode source
            let cur = typeof state !== 'undefined' ? state.session : null;
            let isExamMode = !!(cur && !cur.completed) &&
                (typeof isExamIntegrityMode === 'function'
                    ? isExamIntegrityMode(cur)
                    : cur.mode === 'full');
            if (hasReview) {
                let mCqCount = this.context.reviewQuestions.filter(r => r.type === 'mcq').length;
                let caseCount = this.context.reviewQuestions.filter(r => r.type === 'case').length;
                let missed = this.context.reviewQuestions.filter(r => !r.correct).length;
                let flagged = this.context.reviewQuestions.filter(r => r.flagged).length;
                let total = this.context.reviewQuestions.length;
                let typeNote = '';
                if (mCqCount > 0 && caseCount > 0) typeNote = ` (${mCqCount} MCQs + ${caseCount} case items)`;
                else if (caseCount > 0) typeNote = ` (${caseCount} case items)`;
                chatHtml = `<div class="may-empty-chat may-review-greeting">
                    <p><strong>Session review ready!</strong> I've loaded <strong>${total}</strong> question${total !== 1 ? 's' : ''} for review${typeNote}${missed > 0 ? ` (${missed} missed)` : ''}${flagged > 0 ? ` (${flagged} flagged)` : ''}.</p>
                    <p>Use <strong>Explain answer</strong> and <strong>Wrong choices</strong> to work through them. <strong>My mistake</strong> will help you identify what went wrong, and I can find <strong>Similar question</strong> for extra practice on the same topic.</p>
                    <p class="may-preexam-actions">
                        <button class="may-action-btn" onclick="May.nextReviewQuestion();May.handleAction('explain')">Start reviewing</button>
                        <button class="may-action-btn may-action-hint" onclick="May.handleAction('summary')">Session summary</button>
                    </p>
                </div>`;
            } else if (isExamMode) {
                chatHtml = `<div class="may-empty-chat may-preexam">
                    <p><strong>CMA Exam Mode is active.</strong> I won't be available during the simulation.</p>
                    <p>But I can help you <strong>before</strong> you begin — let's review your weak areas, warm up with a few questions, or go over the exam format.</p>
                    <p class="may-preexam-actions">
                        <button class="may-action-btn" onclick="May.preExamBriefing()">Exam format & briefing</button>
                        <button class="may-action-btn may-action-hint" onclick="May.handleAction('weakness')">Review my weak areas</button>
                        <button class="may-action-btn may-action-recovery" onclick="May.handleAction('recovery')">Quick recovery set</button>
                    </p>
                    <p class="may-preexam-goodluck">Good luck${profile.name ? ', ' + profile.name : ''} — you've prepared for this.</p>
                </div>`;
            } else if (!profile.name) {
                chatHtml = `<div class="may-empty-chat">
                    <div class="may-onboarding-card">
                        <div class="may-onboarding-avatar">M</div>
                        <h2>Hi, I'm May</h2>
                        <p class="may-onboarding-subtitle">Your CMA Part 1 study companion</p>
                        <p>I can explain questions from your practice sessions, give you graduated hints, and help you figure out what to work on next.</p>
                        <div class="may-capability-prompts">
                            <span>Try asking:</span>
                            <span class="may-capability-chip">Explain the answer</span>
                            <span class="may-capability-chip">Give me a hint</span>
                            <span class="may-capability-chip">What should I study next?</span>
                            <span class="may-capability-chip">Quiz me</span>
                        </div>
                        <p><strong>What's your name?</strong> I'll track your progress across sessions.</p>
                    </div>
                </div>`;
            } else {
                let data = MayLearnerState.load();
                let sc = data.sessions ? data.sessions.length : 0;
                let totalAttempts = data.sessions.reduce((s, sess) => s + (sess.attempts || []).length, 0);
                let welcomeMsg = sc > 0
                    ? "I've tracked <strong>" + sc + " session" + (sc !== 1 ? 's' : '') + "</strong> and <strong>" + totalAttempts + " attempts</strong> for you. I can help review missed questions, spot learning trends, and guide your next practice session."
                    : "I'm ready to help. Ask me to explain a question, check your progress, or build a recovery set.";
                chatHtml = `<div class="may-empty-chat">
                    <div class="may-onboarding-card">
                        <div class="may-onboarding-avatar">M</div>
                        <h2>Welcome back, ${profile.name}</h2>
                        <p class="may-onboarding-subtitle">Your CMA Part 1 study companion</p>
                        ${sc > 0 ? `<p>I've tracked <strong>${sc} session${sc !== 1 ? 's' : ''}</strong> and <strong>${totalAttempts} attempts</strong> for you.</p>` : `<p>${welcomeMsg}</p>`}
                        <div class="may-capability-prompts">
                            <span>What would you like to do?</span>
                            <span class="may-capability-chip">Explain a question</span>
                            <span class="may-capability-chip">My progress</span>
                            <span class="may-capability-chip">What to study next?</span>
                            <span class="may-capability-chip">Quiz me</span>
                        </div>
                    </div>
                </div>`;
            }
        } else {
            chatHtml = this.context.chatHistory.slice(-20).map(msg => {
                let cls = msg.role === 'may' ? 'may-msg' : 'learner-msg';
                let text = this._formatMessage(msg.text);
                return `<div class="may-message ${cls}"><div class="may-msg-content">${text}</div></div>`;
            }).join('');
        }

        // S115 — Greeting state machine: override chat for handshake flow
        if (this.context.greetingState === 'ASK_RETURNING' && this.context.chatHistory.length <= 2) {
            chatHtml = `<div class="may-empty-chat">
                <div class="may-onboarding-card">
                    <div class="may-onboarding-avatar">M</div>
                    <h2>Hi, I'm May</h2>
                    <p class="may-onboarding-subtitle">Your CMA Part 1 practice coach</p>
                    <p>I can help track your progress, explain missed questions, and build a focused review plan. <strong>To personalize your review, let's get you set up.</strong></p>
                    <p>Have you practiced with me before?</p>
                    <div class="may-onboarding-cta">
                        <button class="may-onboarding-btn may-onboarding-btn-may" onclick="May._handleGreetingResponse('yes')">Yes — choose my name from the roll</button>
                        <button class="may-onboarding-btn may-onboarding-btn-alt" onclick="May._handleGreetingResponse('no')">No — enroll me as a new student</button>
                    </div>
                </div>
            </div>`;
        } else if (this.context.greetingState === 'SHOW_STUDENT_ROLL' && this.context.chatHistory.length <= 2) {
            let roll = MayLearnerState.getStudentRoll();
            let studentRows = roll.map(s => {
                let sessionInfo = s.sessions ? `${s.sessions} session(s)` : 'No sessions';
                return `<div class="may-student-row" onclick="May._selectStudentFromRoll('${s.learnerId}')">
                    <span class="may-student-name">${May.maskStudentName(s.displayName)}</span>
                    <span class="may-student-meta">${sessionInfo} &middot; ${s.profileSummary ? s.profileSummary.substring(0, 60) + '...' : 'Pre-production pilot profile'}</span>
                </div>`;
            }).join('');
            chatHtml = `<div class="may-empty-chat">
                <div class="may-onboarding-card">
                    <div class="may-onboarding-avatar">M</div>
                    <h2>Select your name</h2>
                    <p class="may-onboarding-subtitle">Pick your profile from the student roll</p>
                    <div style="margin: 12px 0;">${studentRows}</div>
                    <p style="font-size:0.78rem;color:var(--text-muted);font-style:italic;">These are synthetic pre-production identities for pilot testing.</p>
                </div>
            </div>`;
        }

        // S117 — Exam-date onboarding: render answer buttons for active onboarding step
        let onboardStep = this.context.onboardingStep;
        let onboardButtons = '';
        if (onboardStep === 'ASK_EXAM_SCHEDULED') {
            onboardButtons = `<div class="may-empty-chat may-greeting-chat">
                <p class="may-greeting-actions">
                    <button class="may-action-btn" onclick="May._handleOnboardingResponse('yes')">Yes — I have an exam scheduled</button>
                    <button class="may-action-btn may-action-hint" onclick="May._handleOnboardingResponse('no')">No — I don't have one yet</button>
                    <button class="may-action-btn" onclick="May._handleOnboardingResponse('planning')">Not yet, but I'm planning one</button>
                </p>
            </div>`;
        } else if (onboardStep === 'ASK_EXAM_PART') {
            onboardButtons = `<div class="may-empty-chat may-greeting-chat">
                <p class="may-greeting-actions">
                    <button class="may-action-btn" onclick="May._handleOnboardingResponse('part','Part 1')">Part 1 — Financial Planning, Performance, and Analytics</button>
                    <button class="may-action-btn may-action-hint" onclick="May._handleOnboardingResponse('part','Part 2')">Part 2 — Strategic Financial Management</button>
                    <button class="may-action-btn" onclick="May._handleOnboardingResponse('part','Both')">Both Part 1 and Part 2</button>
                </p>
            </div>`;
        } else if (onboardStep === 'ASK_PLAN_PART') {
            onboardButtons = `<div class="may-empty-chat may-greeting-chat">
                <p class="may-greeting-actions">
                    <button class="may-action-btn" onclick="May._handleOnboardingResponse('plan-part','Part 1')">Part 1</button>
                    <button class="may-action-btn may-action-hint" onclick="May._handleOnboardingResponse('plan-part','Part 2')">Part 2</button>
                    <button class="may-action-btn" onclick="May._handleOnboardingResponse('plan-part','Both')">Both</button>
                    <button class="may-action-btn" onclick="May._handleOnboardingResponse('plan-part','Not sure yet')">Not sure yet</button>
                </p>
            </div>`;
        }
        if (onboardButtons && this.context.chatHistory.length <= 15) {
            chatHtml = onboardButtons + chatHtml;
        }

        // Current question context
        let contextHtml = '';
        if (q) {
            let stem = (q.Stem || q.Prompt || '').substring(0, 200);
            let topic = MayLearnerState._normalizeTopic(q.Topic || '');
            let isCase = (this.context.currentCaseItemType === 'case' || q.Type === 'select' && q.QuestionID && q.QuestionID.match(/^CBQ/i));
            let caseBadge = isCase ? `<span class="may-context-case-badge">Case</span>` : '';
            let caseTitle = (this.context.currentCaseTitle && isCase) ? `<span class="may-context-case-title">${this.context.currentCaseTitle}</span>` : '';
            let reviewNav = this.context.reviewQuestions.length > 1 ? `
                <span class="may-review-nav">
                    <button class="may-review-nav-btn" onclick="May.prevReviewQuestion()" title="Previous">&laquo; Prev</button>
                    <span class="may-review-pos">${this.context.reviewIndex + 1}/${this.context.reviewQuestions.length}</span>
                    <button class="may-review-nav-btn" onclick="May.nextReviewQuestion()" title="Next">Next &raquo;</button>
                </span>` : '';
            contextHtml = `<div class="may-context-bar">
                ${caseBadge}
                <span class="may-context-qid">${q.QuestionID || 'Current question'}</span>
                ${caseTitle}
                ${reviewNav}
                <span class="may-context-topic">${topic}</span>
                ${q.Section ? `<span class="may-context-section">Section ${q.Section}</span>` : ''}
                ${q.Difficulty ? `<span class="may-context-difficulty">${q.Difficulty}</span>` : ''}
                ${q.question_state ? `<span class="may-context-state pill">${q.question_state}</span>` : ''}
                <span class="may-context-stem">${stem}${stem.length >= 200 ? '...' : ''}</span>
                <button class="may-context-clear" onclick="May.clearContext()" title="Clear question context">x</button>
            </div>`;
            // Session 94 — Add exhibit references for case items
            if (isCase && this.context.currentCase) {
                let exhibitRefs = this._caseExhibitRefsHtml(this.context.currentCase, this.context.currentCaseItemIndex || 0);
                if (exhibitRefs) contextHtml += exhibitRefs;
            }
        }

        el.innerHTML = `
        <div class="may-container">
            <div class="may-sidebar">
                <div class="may-brand">
                    <div class="may-avatar" aria-hidden="true">M</div>
                    <div>
                        <h2 class="may-name" id="mayDisplayName">May</h2>
                        <span class="may-tagline" id="mayTagline">clarity that remembers</span>
                    </div>
                </div>

                <div class="may-stats">
                    <div class="may-stat-item">
                        <span class="may-stat-value">${sessionCount}</span>
                        <span class="may-stat-label">sessions tracked</span>
                    </div>
                    <div class="may-stat-item">
                        <span class="may-stat-value">${hasHistory ? data.sessions.reduce((s, sess) => s + (sess.attempts || []).length, 0) : 0}</span>
                        <span class="may-stat-label">attempts</span>
                    </div>
                </div>

                <div class="may-insights-sidebar">
                    <h3 class="may-insights-title">At a glance</h3>
                    ${insightHtml || '<p class="may-insight-empty">Complete a session to see insights.</p>'}
                </div>
                ${readinessHtml}
                ${this._renderArchetypeCard()}
                ${sectionReadinessHtml}
                ${this._renderDomainReadinessDashboard()}
                ${casePatternHtml}
                ${practiceGuidanceHtml}
                ${practiceMixHtml}
                ${effectivenessHtml}
                ${readinessProvenanceHtml}

                <div class="may-export-row">
                    <button class="may-export-btn" onclick="May.exportProgress()" title="Download your progress as a JSON file">Export progress</button>
                    <button class="may-export-btn" onclick="May.importProgress()" title="Restore progress from a saved JSON file">Import progress</button>
                    <button class="may-export-btn may-pilot-btn" onclick="May.exportMayPilotData()" title="Download full pilot telemetry for analysis">Export pilot data</button>
                    <button class="may-export-btn may-pilot-reset-btn" onclick="May.clearPilotData()" title="Reset all pilot data and student roll">Clear pilot data</button>
                </div>
            </div>

            <div class="may-main">
                ${contextHtml}

                <div class="may-chat" id="mayChatScroll" onscroll="May._updateScrollButton(this)">
                    ${chatHtml}
                    <button class="may-scroll-bottom-btn" id="mayScrollBottomBtn" onclick="let c=document.getElementById('mayChatScroll');c.scrollTop=c.scrollHeight;this.classList.remove('may-scroll-bottom-visible');" title="Scroll to latest">↓</button>
                </div>

                <div class="may-input-area">
                    <div class="may-quick-actions">${this._buildSuggestionChips(hasQuestion, hasHistory, q)}</div>
                    <div class="may-chat-input-row">
                        <input type="text" class="may-chat-input" id="mayChatInput" placeholder="${hasQuestion ? 'Ask May about this question...' : 'Try a suggestion below, or ask May anything'}"
                            onkeydown="if(event.key==='Enter'){May.handleAction('chat',this.value);this.value='';}">
                        <button class="may-send-btn" onclick="let inp=document.getElementById('mayChatInput');May.handleAction('chat',inp.value);inp.value='';">Send</button>
                    </div>
                </div>
            </div>
        </div>`;

        // Restore pending input value
        if (pendingInput) {
            let inp = document.getElementById('mayChatInput');
            if (inp) { inp.value = pendingInput; inp.focus(); }
        }

        // Auto-scroll: scroll to bottom if user is near bottom, or May just responded
        setTimeout(() => {
            let chat = document.getElementById('mayChatScroll');
            if (!chat) return;
            let history = this.context.chatHistory;
            let lastMsgIsMay = history.length > 0 && history[history.length - 1].role === 'may';
            let isNearBottom = chat.scrollHeight - chat.scrollTop - chat.clientHeight < 80;
            if (isNearBottom || history.length <= 2 || lastMsgIsMay) {
                chat.scrollTop = chat.scrollHeight;
            }
            this._updateScrollButton(chat);
        }, 50);
    },

    _updateScrollButton(chat) {
        let btn = document.getElementById('mayScrollBottomBtn');
        if (!btn) return;
        let isNearBottom = chat.scrollHeight - chat.scrollTop - chat.clientHeight < 50;
        if (isNearBottom) {
            btn.classList.remove('may-scroll-bottom-visible');
        } else {
            btn.classList.add('may-scroll-bottom-visible');
        }
    },

    // S76 — Dynamic context-aware suggestion chips
    _buildSuggestionChips(hasQuestion, hasHistory, q) {
        let chips = [];
        if (hasQuestion && q) {
            chips.push({ label: 'Explain this', action: 'explain', primary: true });
            chips.push({ label: 'Give me a hint', action: 'hint', hint: true });
            chips.push({ label: 'Why is my answer wrong?', action: 'mymistake' });
            if (q.Choices || q.ExplanationWrongA) {
                chips.push({ label: 'Break down wrong choices', action: 'wrong-choices' });
            }
        }
        if (hasHistory) {
            chips.push({ label: 'My progress', action: 'progress' });
            chips.push({ label: 'What should I study next?', action: 'next' });
        }
        if (chips.length === 0) {
            chips = [
                { label: 'Start a practice session', action: 'start' },
                { label: 'What can you help with?', action: 'chat', payload: 'What can you help with?' }
            ];
        }
        chips = chips.slice(0, 6);
        return chips.map(c => {
            let cls = 'may-action-btn';
            if (c.primary) cls += ' may-action-primary';
            if (c.hint) cls += ' may-action-hint';
            let onclick = c.payload
                ? `May.handleAction('${c.action}','${c.payload.replace(/'/g, "\\'")}')`
                : `May.handleAction('${c.action}')`;
            return `<button class="${cls}" onclick="${onclick}">${c.label}</button>`;
        }).join('');
    },

    _formatMessage(text) {
        // Simple markdown-like formatting
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
    },

    _renderInsightCards() {
        let data = MayLearnerState.load();
        if (!data.sessions || data.sessions.length === 0) return '';

        let trends = MayLearnerState.getTrends();
        let clusters = MayLearnerState.getWeaknessClusters();

        let cards = [];

        // Improving topics
        let improving = clusters.improving.slice(0, 2);
        improving.forEach(t => {
            cards.push(`<div class="may-insight-card may-insight-positive">
                <span class="may-insight-icon">+</span>
                <span class="may-insight-text">Improving: <strong>${t.topic}</strong> (+${t.delta}%)</span>
            </div>`);
        });

        // Weak topics
        let weak = clusters.persistentWeak.slice(0, 2);
        weak.forEach(t => {
            cards.push(`<div class="may-insight-card may-insight-warning">
                <span class="may-insight-icon">!</span>
                <span class="may-insight-text">Needs work: <strong>${t.topic}</strong> (${t.accuracy}%)</span>
            </div>`);
        });

        // Recent session count note
        if (cards.length === 0 && data.sessions.length >= 2) {
            cards.push(`<div class="may-insight-card">
                <span class="may-insight-text">${data.sessions.length} sessions tracked. Keep practicing to reveal patterns.</span>
            </div>`);
        }

        return cards.join('');
    },

    // Session 98 — Case-pattern insights panel for sidebar
    _renderCasePatternInsights() {
        let summary = MayLearnerState.getCasePatternSummary();
        if (!summary) return '';

        let trends = MayLearnerState.getCasePatternTrends();
        let trendMap = {};
        trends.forEach(t => { trendMap[t.pattern] = t.signal; });

        let maxCount = Math.max(...Object.values(summary.patterns), 1);
        let patternOrder = Object.entries(summary.patterns)
            .sort((a, b) => b[1] - a[1])
            .filter(([, v]) => v > 0);

        if (patternOrder.length === 0) return '';

        let cards = patternOrder.map(([pattern, count]) => {
            let label = MayLearnerState.casePatternLabel(pattern);
            let pct = Math.round(count / maxCount * 100);
            let trendSig = trendMap[pattern] || '';
            let trendArrow = trendSig === 'improving' ? ' \u2193' : (trendSig === 'worsening' ? ' \u2191' : '');
            let trendCls = trendSig === 'improving' ? 'may-pattern-trend-good' : (trendSig === 'worsening' ? 'may-pattern-trend-bad' : '');
            return '<div class="may-case-pattern-card">'
                + '<span class="may-case-pattern-label">' + label + '</span>'
                + '<span class="may-case-pattern-count">' + count + trendArrow + '</span>'
                + '<span class="may-case-pattern-track"><span class="may-case-pattern-bar" style="width:' + pct + '%"></span></span>'
                + '</div>';
        }).join('');

        let coachingHtml = '';
        if (summary.dominantPattern) {
            let domLabel = MayLearnerState.casePatternLabel(summary.dominantPattern);
            coachingHtml = '<div class="may-case-pattern-coaching"><strong>' + domLabel + '</strong> is your biggest case challenge. See <em>What to Practice Next</em> below for a targeted drill.</div>';
        }

        return '<div class="may-case-pattern-panel">'
            + '<h3 class="may-insights-title">Case Study Patterns</h3>'
            + cards
            + coachingHtml
            + '</div>';
    },

    // Session 99 — Practice guidance card from case patterns
    _renderCasePracticeGuidance() {
        let guidance = MayLearnerState.getCasePatternPracticeGuidance();
        if (!guidance || !guidance.dominant) return '';

        let parts = [];

        // Dominant pattern guidance
        let dom = guidance.dominant;
        let domTrend = dom.trend === 'worsening' ? ' <span class="may-guidance-trend-bad">(worsening)</span>' : (dom.trend === 'improving' ? ' <span class="may-guidance-trend-good">(improving)</span>' : '');
        parts.push('<div class="may-guidance-block">');
        parts.push('<strong>' + dom.label + '</strong>' + domTrend);
        parts.push('<p class="may-guidance-action">\u2192 ' + dom.action + '</p>');
        parts.push('<p class="may-guidance-why">' + dom.why + '</p>');
        parts.push('</div>');

        // Secondary pattern (if present)
        if (guidance.secondary) {
            let sec = guidance.secondary;
            let secTrend = sec.trend === 'worsening' ? ' <span class="may-guidance-trend-bad">(worsening)</span>' : (sec.trend === 'improving' ? ' <span class="may-guidance-trend-good">(improving)</span>' : '');
            parts.push('<div class="may-guidance-block may-guidance-secondary">');
            parts.push('<strong>' + sec.label + '</strong>' + secTrend + ' <span class="may-guidance-count">(' + sec.count + ' misses)</span>');
            parts.push('<p class="may-guidance-action">\u2192 ' + sec.action + '</p>');
            parts.push('</div>');
        }

        return '<div class="may-case-pattern-panel may-guidance-panel">'
            + '<h3 class="may-insights-title">What to Practice Next</h3>'
            + parts.join('')
            + '</div>';
    },

    // Session 100 — Adaptive practice mix card
    _renderAdaptivePracticeMix() {
        let mix = MayLearnerState.getAdaptivePracticeMix();
        if (!mix || mix.mode === 'Insufficient Data') return '';

        let badgeClasses = {
            'MCQ_FIRST': 'may-mix-badge-mcq',
            'CASE_FIRST': 'may-mix-badge-case',
            'MIXED': 'may-mix-badge-mixed',
            'UNTIMED': 'may-mix-badge-untimed'
        };
        let badgeCls = badgeClasses[mix.badge] || '';

        let modeIcons = {
            'MCQ Reinforcement': '\u{1F4DD}',
            'Case Reinforcement': '\u{1F4CA}',
            'Mixed Reinforcement': '\u{1F504}',
            'Untimed Recovery': '\u{23F3}',
            'Insufficient Data': '\u{2753}'
        };
        let icon = modeIcons[mix.mode] || '\u{1F4CB}';

        return '<div class="may-case-pattern-panel may-mix-panel">'
            + '<h3 class="may-insights-title">Practice Mode</h3>'
            + '<div class="may-mix-card">'
            + '<span class="may-mix-icon">' + icon + '</span>'
            + '<span class="may-mix-mode">' + mix.mode + '</span>'
            + (badgeCls ? '<span class="may-mix-badge ' + badgeCls + '">' + (mix.badge === 'MCQ_FIRST' ? 'MCQ-first' : mix.badge === 'CASE_FIRST' ? 'Case-first' : mix.badge === 'MIXED' ? 'Mixed' : 'Untimed') + '</span>' : '')
            + '</div>'
            + '<p class="may-mix-reason">' + mix.reason + '</p>'
            + '<p class="may-mix-howto">\u2192 ' + mix.howTo + '</p>'
            + '</div>';
    },

    // Session 102 — Readiness Snapshot card
    _renderReadinessSnapshot() {
        let summary = MayLearnerState.getReadinessSummary();
        if (!summary) return '';

        let bandColors = {
            'Not enough data': 'may-readiness-muted',
            'Recovery needed': 'may-readiness-danger',
            'Developing': 'may-readiness-warning',
            'Approaching review-ready': 'may-readiness-info',
            'Ready for focused review': 'may-readiness-success'
        };

        if (!summary.hasEnoughData) {
            return '<div class="may-case-pattern-panel may-readiness-panel">'
                + '<h3 class="may-insights-title">Readiness Snapshot</h3>'
                + '<div class="may-readiness-card ' + (bandColors[summary.overall.band] || '') + '">'
                + '<span class="may-readiness-band">' + summary.overall.band + '</span>'
                + '</div>'
                + '<p class="may-readiness-note">' + summary.dataNote + '</p>'
                + '</div>';
        }

        let topicItems = '';
        let topicsToShow = summary.topics.sort((a, b) => {
            let order = { 'Recovery needed': 0, 'Developing': 1, 'Approaching review-ready': 2, 'Ready for focused review': 3, 'Not enough data': 4 };
            return (order[a.band] || 5) - (order[b.band] || 5);
        }).slice(0, 3);

        topicsToShow.forEach(t => {
            let pct = t.accuracy !== null ? t.accuracy + '%' : '\u2014';
            topicItems += '<div class="may-readiness-topic">'
                + '<span class="may-readiness-topic-name">' + t.topic + '</span>'
                + '<span class="may-readiness-topic-pct">' + pct + '</span>'
                + '<span class="may-readiness-topic-band ' + (bandColors[t.band] || '') + '">' + t.band + '</span>'
                + '</div>';
        });

        let confNote = summary.overall.confidence === 'low' ? ' <span class="may-readiness-confidence">(low confidence)</span>' : '';

        return '<div class="may-case-pattern-panel may-readiness-panel">'
            + '<h3 class="may-insights-title">Readiness Snapshot</h3>'
            + '<div class="may-readiness-card ' + (bandColors[summary.overall.band] || '') + '">'
            + '<span class="may-readiness-band">' + summary.overall.band + confNote + '</span>'
            + '</div>'
            + '<p class="may-readiness-rationale">' + summary.overall.rationale + '</p>'
            + topicItems
            + '</div>';
    },

    // S113P — Archetype & Plateau Engine card
    _renderArchetypeCard() {
        let bp;
        try {
            bp = MayLearnerState.getBehavioralProfile();
        } catch (e) { return ''; }
        if (!bp || !bp.hasProfileData) return '';

        let archetypeCls = 'may-archetype-' + bp.archetype;
        let archetypeColors = {
            'ready': '#27ae60',
            'plateaued': '#f39c12',
            'developing': '#3498db',
            'new': '#9b59b6'
        };
        let archetypeIcon = {
            'ready': '\u2605',
            'plateaued': '\u26a0',
            'developing': '\u2191',
            'new': '\u25cf'
        };
        let color = archetypeColors[bp.archetype] || '#888';
        let icon = archetypeIcon[bp.archetype] || '?';

        let factorLabels = [];
        bp.archetypeFactors.forEach(function(f) {
            let lbl = f.replace(/_/g, ' ');
            if (f === 'high_performance') lbl = 'high performance';
            if (f === 'insufficient_data') lbl = 'insufficient data';
            if (f === 'flat_trajectory') lbl = 'flat trajectory';
            if (f === 'moderate_scores') lbl = 'moderate scores';
            if (f === 'no_improvement') lbl = 'no improvement';
            if (f === 'improving_trend') lbl = 'improving trend';
            if (f === 'positive_direction') lbl = 'positive direction';
            if (f === 'declining_trend') lbl = 'declining trend';
            if (f === 'needs_intervention') lbl = 'needs intervention';
            if (f === 'mixed_signals') lbl = 'mixed signals';
            if (f === 'broad_coverage') lbl = 'broad coverage';
            if (f === 'consistent') lbl = 'consistent';
            factorLabels.push('<span class="may-archetype-factor">' + lbl + '</span>');
        });

        let factorsHtml = factorLabels.length > 0
            ? '<div class="may-archetype-factors">' + factorLabels.join('') + '</div>'
            : '';

        let trendHtml = '';
        if (bp.sessionTrend && bp.sessionCount >= 3) {
            let dirIcon = bp.sessionTrend.direction === 'improving' ? '\u2191' :
                          bp.sessionTrend.direction === 'declining' ? '\u2193' : '\u2192';
            let dirColor = bp.sessionTrend.direction === 'improving' ? '#27ae60' :
                           bp.sessionTrend.direction === 'declining' ? '#e74c3c' : '#888';
            trendHtml = '<div class="may-archetype-trend">'
                + '<span style="color:' + dirColor + ';">' + dirIcon + ' '
                + bp.sessionTrend.direction + '</span>'
                + '<span class="may-archetype-trend-detail">'
                + (bp.sessionTrend.recentAvg !== null ? ' recent avg ' + bp.sessionTrend.recentAvg : '')
                + (bp.sessionTrend.delta !== 0 ? ' (' + (bp.sessionTrend.delta > 0 ? '+' : '') + bp.sessionTrend.delta + ')' : '')
                + '</span>'
                + '</div>';
        }

        let plateauHtml = '';
        if (bp.plateau && bp.plateau.isPlateaued) {
            plateauHtml = '<div class="may-plateau-alert">'
                + '<span class="may-plateau-icon">\u26a0</span> '
                + '<span>Plateau detected</span>'
                + '<span class="may-plateau-confidence">' + Math.round(bp.plateau.plateauConfidence * 100) + '% conf</span>'
                + '</div>';
        }

        // S114P — Coaching action recommendations
        var actionHtml = '';
        try {
            if (typeof MayArchetypeCoach !== 'undefined') {
                var actions = MayArchetypeCoach.getCoachingActions(bp);
                if (actions && actions.length > 0) {
                    var topActions = actions.slice(0, 2);
                    var actionItems = topActions.map(function(a) {
                        var aIcon = a.priority === 1 ? '\u25b6' : '\u25b7';
                        return '<div class="may-archetype-action">'
                            + '<span class="may-archetype-action-icon">' + aIcon + '</span>'
                            + '<span class="may-archetype-action-label">' + (a.label || '') + '</span>'
                            + '</div>';
                    });
                    actionHtml = '<div class="may-archetype-actions">'
                        + '<h4 class="may-archetype-actions-title">Recommended Actions</h4>'
                        + actionItems.join('')
                        + '</div>';
                }
            }
        } catch (e) { actionHtml = ''; }

        let confidenceHtml = bp.archetypeConfidence >= 0.7
            ? '<span class="may-archetype-confidence may-conf-high">' + Math.round(bp.archetypeConfidence * 100) + '% confidence</span>'
            : '<span class="may-archetype-confidence may-conf-low">' + Math.round(bp.archetypeConfidence * 100) + '% confidence</span>';

        let spacingHtml = '';
        if (bp.sessionSpacing && bp.sessionSpacing.avgDays > 0) {
            spacingHtml = '<div class="may-archetype-spacing">'
                + bp.sessionSpacing.avgDays + ' day avg between sessions'
                + '</div>';
        }

        return '<div class="may-case-pattern-panel may-archetype-panel">'
            + '<h3 class="may-insights-title">Learner Profile</h3>'
            + '<div class="may-archetype-header ' + archetypeCls + '" style="border-left-color:' + color + ';">'
            + '<span class="may-archetype-icon">' + icon + '</span>'
            + '<span class="may-archetype-label">' + bp.archetypeLabel + '</span>'
            + confidenceHtml
            + '</div>'
            + factorsHtml
            + trendHtml
            + spacingHtml
            + plateauHtml
            + actionHtml
            + '</div>';
    },

    // Session 103 — Section-level readiness grid
    _renderSectionReadiness() {
        let summary = MayLearnerState.getSectionReadinessSummary();
        if (!summary) return '';

        let sectionsToShow = ['A', 'B', 'C', 'D', 'E', 'F'];
        let bandColors = {
            'Not enough data': 'may-section-muted',
            'Recovery needed': 'may-section-danger',
            'Developing': 'may-section-warning',
            'Approaching review-ready': 'may-section-info'
        };
        let bandShortLabels = {
            'Not enough data': 'No data',
            'Recovery needed': 'Recover',
            'Developing': 'Building',
            'Approaching review-ready': 'Near ready'
        };

        let sectionItems = sectionsToShow.map(sec => {
            let sr = summary.sections[sec];
            if (!sr) return '';
            let cls = bandColors[sr.band] || 'may-section-muted';
            let label = bandShortLabels[sr.band] || sr.band;
            let title = sr.label + ' \u2014 ' + sr.band + (sr.worstTopic ? '. Weakest: ' + sr.worstTopic : '');
            return '<div class="may-section-item ' + cls + '" title="' + title + '">'
                + '<span class="may-section-char">' + sec + '</span>'
                + '<span class="may-section-label">' + label + '</span>'
                + '</div>';
        }).join('');

        return '<div class="may-case-pattern-panel may-readiness-panel may-section-panel">'
            + '<h3 class="may-insights-title">Section Readiness</h3>'
            + '<div class="may-section-grid">' + sectionItems + '</div>'
            + '</div>';
    },

    // UX-2 — Domain Readiness Dashboard
    // Renders a priority-ordered dashboard of the 6 CMA Part 1 blueprint domains
    // with numeric readiness scores, progress bars, trend arrows, and weakest/strongest flags.
    _renderDomainReadinessDashboard() {
        let ds = MayLearnerState.getDomainReadinessScores();
        if (!ds || !ds.hasData) return '';

        let trendArrows = {
            improving: '↑',
            declining: '↓',
            stable: '→'
        };
        let trendColors = {
            improving: '#22c55e',
            declining: '#ef4444',
            stable: '#9ca3af'
        };
        let scoreColors = function(score) {
            if (score >= 80) return '#22c55e';
            if (score >= 60) return '#f59e0b';
            return '#ef4444';
        };

        let maxScore = ds.domains.reduce((max, d) => Math.max(max, d.score || 0), 0);

        let rows = ds.domains.map((d, idx) => {
            let score = d.score !== null ? d.score : '—';
            let pct = d.score !== null ? Math.round(d.score / Math.max(maxScore, 1) * 100) : 0;
            let scColor = d.score !== null ? scoreColors(d.score) : '#9ca3af';
            let trendArrow = trendArrows[d.trend] || '→';
            let trendColor = trendColors[d.trend] || '#9ca3af';
            let borderStyle = '';
            if (d.isWeakest) borderStyle = 'border-left: 3px solid #ef4444;';
            else if (d.isStrongest) borderStyle = 'border-left: 3px solid #22c55e;';
            let cls = d.isWeakest ? ' may-domain-weakest' : (d.isStrongest ? ' may-domain-strongest' : '');
            let impactTag = d.isWeakest ? '<span class="may-domain-tag may-domain-tag-weak">Weakest</span>' : (d.isStrongest ? '<span class="may-domain-tag may-domain-tag-strong">Strongest</span>' : '');
            let priorityNum = d.hasData ? idx + 1 : '—';

            return '<div class="may-domain-row' + cls + '" style="' + borderStyle + '">'
                + '<div class="may-domain-priority">' + (d.hasData ? '#' + priorityNum : '—') + '</div>'
                + '<div class="may-domain-info">'
                + '<div class="may-domain-name">' + d.label + impactTag + '</div>'
                + '<div class="may-domain-bar-track"><div class="may-domain-bar-fill" style="width:' + pct + '%;background:' + scColor + ';"></div></div>'
                + '<div class="may-domain-meta">' + d.topicCount + ' topic(s) · ' + d.attempts + ' attempts</div>'
                + '</div>'
                + '<div class="may-domain-score" style="color:' + scColor + ';">' + score + '</div>'
                + '<div class="may-domain-trend" style="color:' + trendColor + ';" title="' + d.trend + '">' + trendArrow + '</div>'
                + '</div>';
        }).join('');

        return '<div class="may-case-pattern-panel may-domain-panel">'
            + '<h3 class="may-insights-title">Domain Readiness</h3>'
            + '<p class="may-domain-subtitle">Recovery priority order — weakest first</p>'
            + rows
            + '</div>';
    },

    // Session 103 — Readiness provenance / "Why this?" helper
    _renderReadinessProvenance() {
        let readiness = MayLearnerState.getReadinessSummary();
        if (!readiness || !readiness._provenance || !readiness.hasEnoughData) return '';

        let p = readiness._provenance;
        if (!p.decisiveFactors || p.decisiveFactors.length === 0) return '';

        let factors = p.decisiveFactors.map(f => '<li>' + f + '</li>').join('');
        let dataCtx = p.dataContext;
        let thresholdSummary = p.thresholdsApplied;
        let thresholdLines = [];
        if (thresholdSummary) {
            thresholdLines.push('<span class="may-prov-threshold">Min attempts Ready: ' + thresholdSummary.minAttemptsReady + '</span>');
            thresholdLines.push('<span class="may-prov-threshold">Accuracy: \u2265' + thresholdSummary.accuracyHigh + '% (high) / \u2265' + thresholdSummary.accuracyGood + '% (good)</span>');
            thresholdLines.push('<span class="may-prov-threshold">Stability: \u2265' + thresholdSummary.stabilityHigh + '% (high) / \u2265' + thresholdSummary.stabilityGood + '% (good)</span>');
        }

        return '<div class="may-case-pattern-panel may-prov-panel">'
            + '<div class="may-prov-toggle" onclick="document.getElementById(\'mayProvBody\').classList.toggle(\'may-prov-open\');this.classList.toggle(\'may-prov-active\');">'
            + '<span class="may-prov-arrow">\u25B6</span> Why this snapshot? <span class="may-prov-debug-label">(debug)</span>'
            + '</div>'
            + '<div class="may-prov-body" id="mayProvBody">'
            + '<p class="may-prov-heading">Readiness was determined by:</p>'
            + '<ul class="may-prov-factors">' + factors + '</ul>'
            + '<p class="may-prov-heading">Data context:</p>'
            + '<ul class="may-prov-data">'
            + '<li>Sessions: ' + (dataCtx ? dataCtx.sessionCount : '?') + '</li>'
            + '<li>Topics with data: ' + (dataCtx ? dataCtx.topicsWithData : '?') + '</li>'
            + '<li>Recovery topics: ' + (dataCtx ? dataCtx.recoveryCount : '?') + '</li>'
            + '<li>Ready topics: ' + (dataCtx ? dataCtx.readyCount : '?') + '</li>'
            + '</ul>'
            + '<p class="may-prov-heading">Thresholds applied (S104):</p>'
            + '<div class="may-prov-thresholds">' + thresholdLines.join(' ') + '</div>'
            + '<p class="may-prov-note">Snapshot is evidence-based and conservative. Bands reflect topic-level accuracy, stability, and trend data only \u2014 no exam prediction.</p>'
            + '</div>'
            + '</div>';
    },

    _renderEffectivenessScorecard() {
        if (typeof MayEffectivenessScorer === 'undefined') return '';
        var sc = MayEffectivenessScorer.compute();
        if (!sc || sc.sessionsAnalyzed === 0) return '';

        var funnelHtml = '';
        if (sc.dimensions && sc.dimensions.length >= 3) {
            var adoption = sc.dimensions[2]; // User Adoption is dimension 3 (0-indexed 2)
            if (adoption && adoption.funnel && adoption.funnel.presented > 0) {
                var f = adoption.funnel;
                var maxF = Math.max(f.presented, f.opened, f.clicked, f.started, f.completed, 1);
                var barW = function(v) { return Math.round((v / maxF) * 100); };
                funnelHtml = '<div class="may-effect-funnel">'
                    + '<div class="may-effect-funnel-title">Adoption Funnel</div>'
                    + '<div class="may-effect-funnel-row"><span class="may-effect-funnel-label">Presented</span><span class="may-effect-funnel-bar"><i style="width:' + barW(f.presented) + '%"></i></span><span class="may-effect-funnel-val">' + f.presented + '</span></div>'
                    + '<div class="may-effect-funnel-row"><span class="may-effect-funnel-label">Opened</span><span class="may-effect-funnel-bar"><i style="width:' + barW(f.opened) + '%"></i></span><span class="may-effect-funnel-val">' + f.opened + '</span></div>'
                    + '<div class="may-effect-funnel-row"><span class="may-effect-funnel-label">Clicked</span><span class="may-effect-funnel-bar"><i style="width:' + barW(f.clicked) + '%"></i></span><span class="may-effect-funnel-val">' + f.clicked + '</span></div>'
                    + '<div class="may-effect-funnel-row"><span class="may-effect-funnel-label">Started</span><span class="may-effect-funnel-bar"><i style="width:' + barW(f.started) + '%"></i></span><span class="may-effect-funnel-val">' + f.started + '</span></div>'
                    + '<div class="may-effect-funnel-row"><span class="may-effect-funnel-label">Completed</span><span class="may-effect-funnel-bar"><i style="width:' + barW(f.completed) + '%"></i></span><span class="may-effect-funnel-val">' + f.completed + '</span></div>'
                    + '</div>';
            }
        }

        var dimHtml = '';
        if (sc.dimensions) {
            sc.dimensions.forEach(function(d) {
                var cls = d.verdict === 'STRONG' ? 'may-effect-strong' : (d.verdict === 'ADEQUATE' ? 'may-effect-adequate' : (d.verdict === 'WEAK' ? 'may-effect-weak' : (d.verdict === 'FAILING' ? 'may-effect-failing' : 'may-effect-muted')));
                dimHtml += '<div class="may-effect-dim ' + cls + '">'
                    + '<div class="may-effect-dim-header"><span class="may-effect-dim-name">' + d.dimension + '</span><span class="may-effect-dim-score">' + (d.verdict === 'INSUFFICIENT DATA' ? '\u2014' : d.rawScore) + '</span></div>'
                    + '<div class="may-effect-dim-label">' + d.verdict + '</div>'
                    + '</div>';
            });
        }

        var verdictCls = sc.verdict === 'STRONG' ? 'may-effect-strong' : (sc.verdict === 'ADEQUATE' ? 'may-effect-adequate' : (sc.verdict === 'WEAK' ? 'may-effect-weak' : 'may-effect-muted'));

        return '<div class="may-case-pattern-panel may-effect-panel">'
            + '<h3 class="may-insights-title">Effectiveness Scorecard ' + (sc.hasEnoughData ? '<span class="may-effect-composite ' + verdictCls + '">' + sc.compositeScore + '</span>' : '') + '</h3>'
            + (sc.hasEnoughData
                ? '<div class="may-effect-verdict ' + verdictCls + '">' + sc.verdict + '</div>'
                : '<p class="may-effect-pending">' + sc.sessionsAnalyzed + ' session(s) recorded. ' + (sc.insufficientDimensions ? sc.insufficientDimensions.length + ' dimension(s) await data.' : 'Need ' + (3 - sc.sessionsAnalyzed) + ' more sessions for baseline.') + '</p>')
            + funnelHtml
            + dimHtml
            + '<p class="may-effect-meta">' + sc.sessionsAnalyzed + ' sessions, ' + sc.totalEvents + ' events</p>'
            + '</div>';
    },

    // ── Normalize a case Item into MCQ-compatible structure ─
    _normalizeCaseItem(c, it, i) {
        let syntheticQid = c.CaseID + '-Q' + (i + 1);
        let q = { ...it };
        q.QuestionID = syntheticQid;
        q.Section = (c.SectionTags || [])[0] || 'Unknown';
        q.Stem = it.Prompt || '';
        q.ExplanationCorrect = it.Explanation || '';
        q.CorrectChoice = 'A';
        q.Choices = {};

        // Session 94 — Carry through case item metadata for richer tutoring
        q.CognitiveLevel = it.CognitiveLevel || c.CognitiveLevel || '';
        q.CalculationRequired = it.CalculationRequired;
        q.CalculationComplexity = it.CalculationComplexity || '';
        q.DifficultyDrivers = it.DifficultyDrivers || [];
        q.ReadingComplexity = it.ReadingComplexity || '';
        q.DecisionComplexity = it.DecisionComplexity || '';

        if (it.Type === 'select' && Array.isArray(it.Choices)) {
            let choicesMap = {};
            it.Choices.forEach((text, idx) => {
                let letter = String.fromCharCode(65 + idx);
                choicesMap[letter] = text;
                if (it.Correct !== undefined && text.trim() === String(it.Correct).trim()) {
                    q.CorrectChoice = letter;
                }
            });
            q.Choices = choicesMap;
        }

        return q;
    },

    // ── Session 94 — Case exhibit summary ────────────────────
    _caseExhibitsSummary(caseObj) {
        if (!caseObj || !caseObj.Exhibits || !caseObj.Exhibits.length) return [];
        return caseObj.Exhibits.map((ex, i) => {
            let s = { title: ex.Title || ('Exhibit ' + (i + 1)), type: ex.Type || 'text', idx: i };
            if (ex.Type === 'table' && ex.Headers && ex.Rows) {
                s.headers = ex.Headers.slice(0, 4);
                s.rowCount = ex.Rows.length;
                s.summary = ex.Headers.join(', ') + ' (' + ex.Rows.length + ' rows)';
            } else if (ex.Type === 'text' && ex.Body) {
                s.summary = ex.Body.substring(0, 120) + (ex.Body.length > 120 ? '...' : '');
            }
            if (ex.ReferencedBy && ex.ReferencedBy.length) s.referencedBy = ex.ReferencedBy;
            return s;
        });
    },

    _getRelevantExhibits(caseObj, itemIndex) {
        if (!caseObj || !caseObj.Exhibits) return [];
        let itemId = caseObj.CaseID + '-Q' + (itemIndex !== undefined ? itemIndex + 1 : '');
        let exhibits = this._caseExhibitsSummary(caseObj);
        let referenced = exhibits.filter(e => e.referencedBy && e.referencedBy.includes(itemId));
        if (referenced.length > 0) return referenced;
        return exhibits;
    },

    _caseExhibitRefsHtml(caseObj, itemIndex) {
        if (!caseObj) return '';
        let exhibits = this._getRelevantExhibits(caseObj, itemIndex);
        if (!exhibits.length) return '';
        let items = exhibits.map(e => {
            let icon = e.type === 'table' ? '\u{1F4CA}' : '\u{1F4C4}';
            let label = e.type === 'table' && e.rowCount ? ' (table, ' + e.rowCount + ' rows)' : (e.type === 'text' ? ' (text)' : '');
            return '<span class="may-exhibit-ref-item">' + icon + ' <strong>' + e.title + '</strong>' + label + '</span>';
        }).join('');
        return '<div class="may-case-exhibit-refs"><span class="may-exhibit-refs-label">Relevant exhibit(s):</span> ' + items + '</div>';
    },

    // ── Session 94 — Case-specific graduated hints ────────────
    _caseMetacognitiveHint(q, caseObj, topic, diff) {
        let scenarioSnip = caseObj && caseObj.ScenarioText ? caseObj.ScenarioText.substring(0, 100).replace(/\n/g, ' ') + '...' : '';
        let prompts = [
            'Before diving in, pause and ask: what decision does this case item ask you to make? The scenario gives you context' + (scenarioSnip ? ' — ' + scenarioSnip : '') + '. Identify the question type: is it a calculation, a judgment call, or an exhibit-reading task?',
            'Case items are different from standalone MCQs — they require filtering relevant facts from the scenario. Step back and ask: what information in the case matters for **' + topic + '**? What can you ignore?',
            'This is a **' + diff + '**-difficulty case item on **' + topic + '**. In CMA case studies, the test writer expects you to connect scenario evidence to a specific rule or calculation. Can you name the framework or formula you need?',
            'Take a moment to re-read the item prompt carefully. The key instruction is probably in the first or last sentence. Ask yourself: am I being asked to compute, evaluate, or identify something specific in the case?'
        ];
        return prompts[Math.floor(Math.random() * prompts.length)];
    },

    _caseConceptHint(q, caseObj, topic) {
        let section = q.Section;
        let conceptMap = {
            'A': 'Section A cases test external financial reporting under U.S. GAAP. Focus on recognition criteria, measurement rules, and classification — the case facts provide the specifics you need to apply.',
            'B': 'Budgeting and forecasting cases test your ability to build or evaluate financial plans. Look for numbers in the exhibits, and think about the order of budget preparation.',
            'C': 'Performance management cases involve analyzing variances, evaluating ROI/RI/EVA, or using balanced scorecard. The exhibits often contain the raw data — your job is to calculate or interpret correctly.',
            'D': 'Cost management cases test cost classification, allocation, and decision-making. Identify the cost behavior first, then apply the relevant method from the exhibits.',
            'E': 'Internal controls cases follow COSO. Identify the risk or control weakness described in the scenario, then match it to the appropriate control component or principle.',
            'F': 'Technology and analytics cases test systems, data governance, and emerging tech. The scenario describes a business problem — match it to the right system or analytic approach.'
        };
        let exhibits = this._getRelevantExhibits(caseObj, this.context.currentCaseItemIndex || 0);
        let exhibitNote = '';
        if (exhibits.length === 1) {
            exhibitNote = '\n\nRefer to **' + exhibits[0].title + '** — the data you need is there.';
        } else if (exhibits.length > 1) {
            exhibitNote = '\n\nExhibits available: ' + exhibits.map(e => '**' + e.title + '**').join(', ') + '. Check which one contains the data this item asks for.';
        }
        let hint = conceptMap[section] || ('This case is about **' + topic + '**. Review the scenario and exhibits to find the relevant evidence.');
        if (exhibits.length > 0) hint += exhibitNote;
        return hint;
    },

    _caseStrategyHint(q, caseObj, topic) {
        let cognitiveLevel = q.CognitiveLevel || '';
        let calcComplexity = q.CalculationComplexity || '';
        let isCalc = q.CalculationRequired || calcComplexity === 'Simple' || calcComplexity === 'Moderate' || (q.Stem || '').match(/\$/);
        let exhibits = this._getRelevantExhibits(caseObj, this.context.currentCaseItemIndex || 0);
        let exhibitNames = exhibits.map(e => e.title).join(', ');
        if (isCalc) {
            return 'This is a calculation item. Here is how to approach it:\n1. Identify the formula or method needed — it is related to **' + topic + '**\n2. Locate the numbers in the case — check ' + (exhibitNames || 'the exhibits and scenario text') + '\n3. Plug the values into the formula carefully\n4. Verify your result against the available choices (if any)';
        }
        return 'This is a ' + (cognitiveLevel || 'judgment') + '-level item. Try this approach:\n1. Identify what the case scenario tells you about the situation\n2. Recall the governing standard or framework for **' + topic + '**\n3. Check the exhibits (' + (exhibitNames || 'review them carefully') + ') for evidence\n4. Eliminate options that contradict the case facts';
    },

    _caseEliminationHint(q, caseObj) {
        let letters = q.Choices && typeof q.Choices === 'object' ? Object.keys(q.Choices).sort() : ['A', 'B', 'C', 'D'];
        if (letters.length <= 1) {
            return "This item does not have multiple-choice options — apply the correct formula or reasoning using the case facts.";
        }
        let scenarioText = caseObj && caseObj.ScenarioText ? caseObj.ScenarioText.substring(0, 200) : '';
        let lines = ['For case items, eliminate choices that do not match the evidence in the scenario and exhibits. Ask yourself:'];
        lines.push('- Does this choice use numbers or facts that are not in the case?');
        lines.push('- Does this choice contradict what the scenario describes?');
        lines.push('- Does this choice apply the wrong rule or framework for the situation?');
        if (scenarioText) lines.push('\nKey scenario context: "' + scenarioText + '..."');
        return lines.join('\n');
    },

    // ── Session 94 — Case explanation refinement ────────────
    _caseWhatMattered(caseObj, itemIndex) {
        let reviewItem = this.context.reviewQuestions.find(r =>
            r.type === 'case' && r.caseId === (caseObj && caseObj.CaseID) && r.itemIndex === itemIndex
        );
        let q = reviewItem ? reviewItem.question : this.context.currentQuestion;
        if (!q) return '';
        let explanation = q.ExplanationCorrect || '';
        if (!explanation || explanation.length < 50) return '';
        let sentences = explanation.split(/[.!?]\s+/);
        let key = sentences.find(s => s.length > 30 &&
            (s.includes('key') || s.includes('critical') || s.includes('because') || s.includes('therefore'))
        ) || sentences[0];
        return '**What mattered in this case:** ' + key.trim() + '.';
    },

    _caseApproachNote(caseObj, itemIndex) {
        let reviewItem = this.context.reviewQuestions.find(r =>
            r.type === 'case' && r.caseId === (caseObj && caseObj.CaseID) && r.itemIndex === itemIndex
        );
        let q = reviewItem ? reviewItem.question : this.context.currentQuestion;
        if (!q) return '';
        let cognitiveLevel = q.CognitiveLevel || 'Apply';
        let calcComplexity = q.CalculationComplexity || 'None';
        let difficultyDrivers = q.DifficultyDrivers || [];
        let isCalc = q.CalculationRequired || calcComplexity !== 'None';

        let approachMap = {
            'Remember': 'For recall-based items, focus on memorizing the key standards and definitions. Flashcards can help.',
            'Understand': 'For comprehension items, practice explaining the concept in your own words before answering.',
            'Apply': 'For application items, always connect the rule to the specific facts given — do not answer from memory alone.',
            'Analyze': 'For analysis items, break the scenario into parts: what is given, what is asked, what rule applies.',
            'Evaluate': 'For evaluation items, consider multiple perspectives before choosing. The "best" answer often balances competing principles.'
        };
        let note = approachMap[cognitiveLevel] || 'Review the case facts carefully and apply the relevant standard.';
        if (isCalc) note += ' For calculation items, practice working through the steps with scratch paper — do not try to do it mentally.';
        if (difficultyDrivers.includes('ExhibitInterpretation')) note += ' Practice reading tables and schedules — the answer is in the data, not in general knowledge.';
        if (difficultyDrivers.includes('MultiStepCalculation')) note += ' Break multi-step calculations into smaller parts and verify each step.';
        return '**How to approach similar cases:** ' + note;
    },

    // ── Start reviewing from an active session ───────────
    startSessionReview() {
        if (typeof state === 'undefined' || !state.session) return;

        let s = state.session;
        this.context.sessionActive = true;
        this.context.sessionId = s.id || s.start?.toString(36);
        this.context.reviewQuestions = [];
        this.context.reviewIndex = -1;

        // Collect missed and flagged MCQs
        (s.mcqs || []).forEach(q => {
            let ans = s.answers[q.QuestionID];
            let isCorrect = ans !== undefined && typeof scoreMCQ === 'function' && scoreMCQ(q, ans) === 1;
            let isFlagged = s.flags[q.QuestionID];
            if (!isCorrect || isFlagged) {
                this.context.reviewQuestions.push({
                    question: q,
                    type: 'mcq',
                    answer: ans,
                    correct: isCorrect,
                    flagged: isFlagged
                });
            }
        });

        // Collect missed and flagged CASE items — Session 93
        (s.cases || []).forEach(c => {
            (c.Items || []).forEach((it, i) => {
                let key = (typeof ExamSessionManager !== 'undefined' && ExamSessionManager.caseKey)
                    ? ExamSessionManager.caseKey(c, i) : c.CaseID + '-' + i;
                let ans = s.caseAnswers ? s.caseAnswers[key] : undefined;
                let isCorrect = (typeof ExamSessionManager !== 'undefined' && ExamSessionManager.correctCase)
                    ? ExamSessionManager.correctCase(it, ans) : false;
                let isFlagged = s.caseFlags ? !!s.caseFlags[key] : false;

                if (!isCorrect || isFlagged || ans === undefined) {
                    let normalizedItem = this._normalizeCaseItem(c, it, i);
                    this.context.reviewQuestions.push({
                        question: normalizedItem,
                        type: 'case',
                        answer: ans,
                        correct: isCorrect,
                        flagged: isFlagged,
                        caseId: c.CaseID,
                        caseTitle: c.Title || '',
                        itemIndex: i,
                        answerKey: key
                    });
                }
            });
        });

        if (this.context.reviewQuestions.length > 0) {
            this.context.reviewIndex = 0;
            let first = this.context.reviewQuestions[0];
            this.setQuestionContext(first.question, null, first.type, first.caseId, first.caseTitle, first.itemIndex);
        } else {
            if (s.mcqs && s.mcqs.length > 0) {
                this.setQuestionContext(s.mcqs[0]);
            }
        }
    },

    // ── Navigate review queue ────────────────────────────
    nextReviewQuestion() {
        if (this.context.reviewQuestions.length === 0) return;
        this.context.reviewIndex++;
        if (this.context.reviewIndex >= this.context.reviewQuestions.length) {
            this.context.reviewIndex = 0; // wrap
        }
        let item = this.context.reviewQuestions[this.context.reviewIndex];
        this.setQuestionContext(item.question, null, item.type, item.caseId, item.caseTitle, item.itemIndex);
    },

    prevReviewQuestion() {
        if (this.context.reviewQuestions.length === 0) return;
        this.context.reviewIndex--;
        if (this.context.reviewIndex < 0) {
            this.context.reviewIndex = this.context.reviewQuestions.length - 1;
        }
        let item = this.context.reviewQuestions[this.context.reviewIndex];
        this.setQuestionContext(item.question, null, item.type, item.caseId, item.caseTitle, item.itemIndex);
    },

    // ── Record an attempt during a live session ──────────
    recordLiveAttempt(question, answer, isCorrect, hintsUsed, explanationRequested, elapsedMs, confidence) {
        let qid = question.QuestionID || question.ItemID || 'unknown';
        // Prevent duplicate recordings when re-clicking the same choice
        if (!this.context._prevAnswers) this.context._prevAnswers = {};
        if (this.context._prevAnswers[qid] === answer) return;
        this.context._prevAnswers[qid] = answer;

        // Session 89D — Use per-QID hint tracking from _sessionHints preferentially,
        // falling back to the caller-provided value or live-hint counter.
        // Prior to 89D, _liveHintCount was the only source and reset to 0 between answers,
        // causing hintsUsed to be recorded as 0 for all attempts.
        let actualHints = (this.context._sessionHints && this.context._sessionHints[qid]) || hintsUsed || (this.context._liveHintCount || 0);
        this.context._liveHintCount = 0; // reset for next answer attempt

        let sid = this.context.sessionId;
        if (!sid) {
            sid = (typeof state !== 'undefined' && state.session)
                ? (state.session.id || state.session.start?.toString(36)) : 'session-' + Date.now().toString(36);
            this.context.sessionId = sid;
        }
        MayLearnerState.recordAttempt(sid, question, answer, isCorrect, actualHints, explanationRequested, elapsedMs, confidence);
    },

    // ── Handoff from completed session ──────────────────
    handoffCompletedSession(sessionObj) {
        let sid = sessionObj.id || sessionObj.start?.toString(36) || 'session-' + Date.now().toString(36);
        this.context.sessionId = sid;
        this.context.sessionActive = false;
        this.context.hintLevel = 0;
        this.context.chatHistory = [];

        // Record all attempts from the completed session
        if (!this.context._sessionHints) this.context._sessionHints = {};
        (sessionObj.mcqs || []).forEach(q => {
            let ans = sessionObj.answers[q.QuestionID];
            if (ans !== undefined) {
                let isCorrect = typeof scoreMCQ === 'function' ? scoreMCQ(q, ans) === 1 : false;
                let perQidHints = this.context._sessionHints[q.QuestionID] || 0;
                MayLearnerState.recordAttempt(sid, q, ans, isCorrect, perQidHints, false, 0, null);
            }
        });
        (sessionObj.cases || []).forEach(c => {
            (c.Items || []).forEach((it, i) => {
                let key = (typeof ExamSessionManager !== 'undefined' && ExamSessionManager.caseKey)
                    ? ExamSessionManager.caseKey(c, i) : c.CaseID + '-' + i;
                let ans = sessionObj.caseAnswers ? sessionObj.caseAnswers[key] : undefined;
                if (ans !== undefined) {
                    let isCorrect = (typeof ExamSessionManager !== 'undefined' && ExamSessionManager.correctCase)
                        ? ExamSessionManager.correctCase(it, ans) : false;
                    let syntheticQid = c.CaseID + '-Q' + (i + 1);
                    let q = { ...it, QuestionID: syntheticQid, Section: (c.SectionTags || [])[0] || 'Unknown' };
                    let perQidHints = this.context._sessionHints[syntheticQid] || 0;
                    MayLearnerState.recordAttempt(sid, q, ans, isCorrect, perQidHints, false, 0, null);
                }
            });
        });

        // Build topic snapshot
        let topicSnapshot = {};
        let topicCounts = {};
        (sessionObj.mcqs || []).forEach(q => {
            let topic = MayLearnerState._normalizeTopic(q.Topic || 'Unclassified');
            if (!topicCounts[topic]) topicCounts[topic] = { n: 0, c: 0 };
            topicCounts[topic].n++;
            let ans = sessionObj.answers[q.QuestionID];
            if (ans !== undefined && typeof scoreMCQ === 'function' && scoreMCQ(q, ans) === 1) topicCounts[topic].c++;
        });
        Object.entries(topicCounts).forEach(([topic, v]) => {
            topicSnapshot[topic] = { n: v.n, pct: v.n > 0 ? Math.round(v.c / v.n * 100) : 0 };
        });

        let scores = typeof ExamSessionManager !== 'undefined' && ExamSessionManager.practiceScores
            ? ExamSessionManager.practiceScores() : null;

        // Session 94 — Build case miss-pattern snapshot for coaching
        let casePatterns = { evidenceLocation: 0, calculationSetup: 0, exhibitInterpretation: 0, controlJudgment: 0, answerElimination: 0 };
        (sessionObj.cases || []).forEach(c => {
            (c.Items || []).forEach((it, i) => {
                let key = (typeof ExamSessionManager !== 'undefined' && ExamSessionManager.caseKey)
                    ? ExamSessionManager.caseKey(c, i) : c.CaseID + '-' + i;
                let ans = sessionObj.caseAnswers ? sessionObj.caseAnswers[key] : undefined;
                if (ans !== undefined) {
                    let isCorrect = (typeof ExamSessionManager !== 'undefined' && ExamSessionManager.correctCase)
                        ? ExamSessionManager.correctCase(it, ans) : false;
                    if (!isCorrect) {
                        let pattern = MayLearnerState.classifyCaseMissPattern(it);
                        if (casePatterns[pattern] !== undefined) casePatterns[pattern]++;
                    }
                }
            });
        });

        MayLearnerState.recordSessionSummary(sid, {
            mode: sessionObj.mode || 'unknown',
            scaledScore: scores ? scores.scaled : null,
            mcqPct: scores ? (scores.mcqPct !== null ? Math.round(scores.mcqPct * 100) : null) : null,
            casePct: scores ? (scores.casePct !== null ? Math.round(scores.casePct * 100) : null) : null,
            grade: scores ? scores.grade : null,
            passed: scores ? scores.passed : null,
            topicSnapshot,
            casePatterns
        });

        // Set up review queue
        this.startSessionReview();

        // S129 — Classify pending recommendation outcomes after session ends
        let outcomeClassification = MayLearnerState.classifyPendingOutcomes();
        if (outcomeClassification.classified > 0) {
            this._logSessionTelemetry('outcomes_classified', outcomeClassification);
            this._persistSessionTelemetry();
        }
        // Session 88: Add a session-complete banner so the learner knows
        // their results are loaded and review is ready.
        let mcqAnswered = (sessionObj.mcqs || []).filter(q => sessionObj.answers[q.QuestionID] !== undefined).length;
        let missedMCQs = (sessionObj.mcqs || []).filter(q => {
            let ans = sessionObj.answers[q.QuestionID];
            return ans !== undefined && typeof scoreMCQ === 'function' && scoreMCQ(q, ans) !== 1;
        }).length;

        // Session 93 — Count case items for mixed sessions
        let caseItemTotal = 0, caseItemMissed = 0;
        (sessionObj.cases || []).forEach(c => {
            (c.Items || []).forEach((it, i) => {
                let key = (typeof ExamSessionManager !== 'undefined' && ExamSessionManager.caseKey)
                    ? ExamSessionManager.caseKey(c, i) : c.CaseID + '-' + i;
                let ans = sessionObj.caseAnswers ? sessionObj.caseAnswers[key] : undefined;
                caseItemTotal++;
                if (ans !== undefined) {
                    let isCorrect = (typeof ExamSessionManager !== 'undefined' && ExamSessionManager.correctCase)
                        ? ExamSessionManager.correctCase(it, ans) : false;
                    if (!isCorrect) caseItemMissed++;
                }
            });
        });

        if (this.context.reviewQuestions.length > 0) {
            let mcqInReview = this.context.reviewQuestions.filter(r => r.type === 'mcq').length;
            let casesInReview = this.context.reviewQuestions.filter(r => r.type === 'case').length;
            let parts = [];
            parts.push(`Your session is complete. You answered **${mcqAnswered}** of **${(sessionObj.mcqs || []).length}** MCQs, with **${missedMCQs}** missed.`);
            if (caseItemTotal > 0) {
                parts.push(`${caseItemTotal} case items across ${(sessionObj.cases || []).length} case sets.`);
            }
            // Session 98 — Case-pattern diagnostic in session-complete banner
            let caseMissTotal = Object.values(casePatterns).reduce((a, b) => a + b, 0);
            if (caseMissTotal >= 3) {
                let domPattern = Object.entries(casePatterns).sort((a, b) => b[1] - a[1])[0];
                if (domPattern && domPattern[1] > 0) {
                    let domLabel = MayLearnerState.casePatternLabel(domPattern[0]).toLowerCase();
                    parts.push(`\nYour case misses were mostly **${domLabel}** issues this session (${domPattern[1]} of ${caseMissTotal}).`);
                }
            }
            parts.push(`\nI've loaded **${this.context.reviewQuestions.length}** questions for review (missed or flagged)${casesInReview > 0 ? ` — ${mcqInReview} MCQs + ${casesInReview} case items` : ''}. Use the quick actions below to work through them.`);
            this._addMessage('may', parts.join(' '));
        }
        // Pulse the floating launcher to signal "review ready"
        setTimeout(() => this._pulseLauncherReview(), 500);
        this.renderView();

        if (typeof MayTelemetry !== 'undefined') {
            MayTelemetry.trackEngagement({ action: 'sessionResultsDisplayed', mcqAnswered: mcqAnswered, mcqTotal: (sessionObj.mcqs || []).length, reviewCount: this.context.reviewQuestions.length, timestamp: new Date().toISOString() });
        }
    },

    // ── Clear current question context ───────────────────
    clearContext() {
        this.context.currentQuestion = null;
        this.context.currentCase = null;
        this.context.currentCaseItemType = null;
        this.context.currentCaseId = null;
        this.context.currentCaseTitle = null;
        this.context.hintLevel = 0;
        this.context.chatHistory = [];
        this._speak("I'm here when you're ready. Open a question from your session or ask me about your progress.");
        this.renderView();
    },

    // S78 — Set review context from the structured review card bridge
    setReviewContext(qid, studentChoiceLetter, correctLetter, isCorrect) {
        // Find the question in the MCQ banks
        let found = null;
        try {
            if (typeof QUESTION_BANK !== 'undefined') {
                for (let pack of ['packA','packB','packC','packD','packE']) {
                    let bank = QUESTION_BANK[pack];
                    if (!bank) continue;
                    found = bank.find(q => q.QuestionID === qid);
                    if (found) break;
                }
            }
        } catch (e) {}

        if (!found && typeof QUESTION_BANK !== 'undefined') {
            // Try flat search across all banks
            try {
                for (let pack of ['packA','packB','packC','packD','packE']) {
                    let bank = QUESTION_BANK[pack];
                    if (!bank || !Array.isArray(bank)) continue;
                    for (let q of bank) {
                        if (q.QuestionID === qid) { found = q; break; }
                    }
                    if (found) break;
                }
            } catch (e) {}
        }

        if (found) {
            this.context.currentQuestion = found;
            this.context.reviewStudentAnswer = studentChoiceLetter;
            this.context.reviewCorrectAnswer = correctLetter;
            this.context.reviewIsCorrect = isCorrect;

            if (typeof MayTelemetry !== 'undefined') {
                MayTelemetry.trackAdoption({ recommendationType: 'review_bridge', cardId: qid, topic: found.Topic || '', section: found.Section || '', panelOpened: true, clicked: false, timestamp: new Date().toISOString() });
            }
        }
    },

    // S78 — Discuss from review: present the structured breakdown conversationally
    _discussFromReview() {
        let q = this.context.currentQuestion;
        if (!q) {
            this._speak("I couldn't find that question. Start a review from a practice session first.");
            this.renderView();
            return;
        }

        let isCorrect = this.context.reviewIsCorrect;
        let studentLetter = this.context.reviewStudentAnswer;
        let correctLetter = this.context.reviewCorrectAnswer;
        let topic = MayLearnerState._normalizeTopic(q.Topic || 'this concept');

        // Use extractExplanationSections if available (shared from app.js)
        let sections = { tested: '', correct: '', takeaway: '' };
        let explRaw = q.Explanation || q.ExplanationCorrect || '';
        if (typeof extractExplanationSections !== 'undefined') {
            sections = extractExplanationSections(explRaw, q.Topic);
        } else {
            sections.correct = explRaw;
        }

        let lines = [];

        if (isCorrect) {
            lines.push('You got this one right. Let\'s make sure the reasoning is solid.');
            lines.push('');
        } else {
            lines.push('Let\'s work through this together. Here\'s what happened.');
            lines.push('');
        }

        // What was tested
        if (sections.tested) {
            lines.push('**What this question was testing:**');
            lines.push(sections.tested);
            lines.push('');
        }

        // Why correct wins
        if (sections.correct) {
            lines.push(isCorrect ? '**Why that answer is correct:**' : '**Why the correct answer wins:**');
            lines.push(sections.correct.length > 400 ? sections.correct.substring(0, 380) + '...' : sections.correct);
            lines.push('');
        }

        // Why student's answer was wrong (personalized)
        if (!isCorrect && studentLetter && q['ExplanationWrong' + studentLetter]) {
            lines.push('**Why your answer (' + studentLetter + ') was wrong:**');
            lines.push(q['ExplanationWrong' + studentLetter]);
            lines.push('');
        }

        // Takeaway
        if (sections.takeaway) {
            lines.push('**Key takeaway for exam day:**');
            lines.push(sections.takeaway);
            lines.push('');
        }

        // Next step coaching
        lines.push('What would help most right now?');
        lines.push('• Ask me to **give you a hint** on a similar question');
        lines.push('• Ask me to **quiz you** on ' + topic);
        if (!isCorrect) {
            lines.push('• Say **"what should I study next?"** for a personalized recommendation');
        }

        this._speak(lines.join('\n'));
        this.renderView();
    },

    // ── Export learner progress as downloadable JSON ──────
    exportProgress() {
        let data = MayLearnerState.load();
        let profile = MayLearnerState.getUserProfile();
        let blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = (profile.name || 'may-progress') + '-' + new Date().toISOString().substring(0, 10) + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this._speak(`Progress exported${profile.name ? ' for **' + profile.name + '**' : ''}. Keep this file safe — you can restore your progress from any device using the Import button.`);
        this.renderView();
    },

    // ── Import learner progress from JSON file ────────────
    importProgress() {
        let self = this;
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = function () {
            let file = input.files[0];
            if (!file) return;
            let reader = new FileReader();
            reader.onload = function (e) {
                try {
                    let data = JSON.parse(e.target.result);
                    if (!data.learnerId && !data.sessions) {
                        self._speak("This doesn't look like a May progress file. It should have a 'learnerId' and 'sessions' field. Please check the file and try again.");
                        self.renderView();
                        return;
                    }
                    // Merge: preserve the existing learnerId if importing into a fresh state
                    let existing = MayLearnerState.load();
                    if (existing.sessions && existing.sessions.length > 0) {
                        // Merge strategy: add only sessions not already present, keep existing userName
                        let existingIds = new Set(existing.sessions.map(s => s.sessionId));
                        let newSessions = (data.sessions || []).filter(s => !existingIds.has(s.sessionId));
                        data.sessions = [...existing.sessions, ...newSessions];
                        data.userName = existing.userName || data.userName;
                        data.firstVisit = existing.firstVisit || data.firstVisit;
                    }
                    MayLearnerState.save(data);
                    let profile = MayLearnerState.getUserProfile();
                    let sessionCount = data.sessions ? data.sessions.length : 0;
                    let totalAttempts = data.sessions.reduce((s, sess) => s + (sess.attempts || []).length, 0);
                    self._speak(`Progress restored${profile.name ? ' for **' + profile.name + '**' : ''}. I have **${sessionCount}** session(s) and **${totalAttempts}** attempts loaded. Your recommendations and recovery sets will reflect the imported data.`);
                    self.renderView();
                } catch (err) {
                    self._speak("I couldn't read that file. Make sure it's a valid JSON export from May's Export Progress button.");
                    self.renderView();
                }
            };
            reader.readAsText(file);
        };
        input.click();
    },

    // ============================================================
    // K. Realtime layer — in-session May
    // ============================================================

    // ── Mini-panel: injected into the exam view ───────────
    renderMiniPanel(question) {
        if (!question) return '';
        this.context.currentQuestion = question;

        let topic = MayLearnerState._normalizeTopic(question.Topic || '');
        let topicProgress = MayLearnerState.getTopicProgress();
        let tp = topicProgress[topic];

        let liveInsight = '';
        if (tp && tp.totalAttempts >= 3) {
            let pct = tp.accuracy || 0;
            if (pct >= 80) {
                liveInsight = `<div class="may-mini-insight may-mini-strong">You're solid on this topic (${pct}%)</div>`;
            } else if (pct < 60) {
                liveInsight = `<div class="may-mini-insight may-mini-weak">This topic has been tricky (${pct}%)</div>`;
            } else {
                liveInsight = `<div class="may-mini-insight">Topic accuracy: ${pct}%</div>`;
            }
        }

        return `<div class="may-mini" id="mayMini">
            <div class="may-mini-header" id="mayMiniToggle" onclick="May.toggleMini()">
                <span class="may-mini-avatar">M</span>
                <span class="may-mini-label">May</span>
                ${liveInsight}
                <span class="may-mini-chevron" id="mayMiniChevron">&#9650;</span>
            </div>
            <div class="may-mini-body" id="mayMiniBody" style="display:none">
                <div class="may-mini-info">
                    <span class="may-mini-qid">${question.QuestionID || ''}</span>
                    <span class="may-mini-topic">${topic}</span>
                    ${question.Difficulty ? `<span class="may-mini-diff">${question.Difficulty}</span>` : ''}
                </div>
                <div class="may-mini-actions">
                    <button class="may-mini-btn" onclick="May.miniHint()">Hint</button>
                    <button class="may-mini-btn" onclick="May.miniExplain()">Why?</button>
                    <button class="may-mini-btn may-mini-btn-insight" onclick="May.miniInsight()">Progress</button>
                </div>
                <div class="may-mini-msg" id="mayMiniMsg"></div>
            </div>
            <div class="may-mini-feedback" id="mayMiniFeedback"></div>
        </div>`;
    },

    toggleMini() {
        let body = document.getElementById('mayMiniBody');
        let chev = document.getElementById('mayMiniChevron');
        if (!body || !chev) return;
        let isOpen = body.style.display !== 'none';
        body.style.display = isOpen ? 'none' : 'block';
        chev.innerHTML = isOpen ? '&#9650;' : '&#9660;';
    },

    // ── Post-answer micro-feedback ───────────────────────
    showPostAnswerFeedback(question, isCorrect) {
        let fb = document.getElementById('mayMiniFeedback');
        if (!fb) return;

        let topic = MayLearnerState._normalizeTopic(question.Topic || '');
        let topicProgress = MayLearnerState.getTopicProgress();
        let tp = topicProgress[topic];

        // Independently verify correctness against the stored answer key.
        // If app.js and the question bank disagree, display a cautious
        // neutral message rather than a misleading Correct/Wrong label.
        let storedCC = question.CorrectChoice;
        let selectedAnswer = (typeof state !== 'undefined' && state.session
            && state.session.answers) ? state.session.answers[question.QuestionID] : null;
        let bankVerified = true;
        if (selectedAnswer && storedCC) {
            let expectsCorrect = (selectedAnswer === storedCC);
            if (expectsCorrect !== !!isCorrect) bankVerified = false;
        }

        let msg = '';
        if (bankVerified && isCorrect) {
            if (tp && tp.totalAttempts >= 3) {
                let pct = tp.accuracy || 0;
                if (tp.recentPct !== null && tp.recentPct >= 80) {
                    msg = `Correct. Your recent accuracy on ${topic} is solid at ${tp.recentPct}%.`;
                } else {
                    msg = `Correct. You're at ${pct}% overall on ${topic}.`;
                }
            } else {
                msg = 'Correct.';
            }
        } else if (bankVerified && !isCorrect) {
            if (tp && tp.accuracy !== null && tp.accuracy < 50 && tp.totalAttempts >= 3) {
                msg = `Not quite. ${topic} has been challenging (${tp.accuracy}%). Want a hint?`;
            } else if (tp && tp.totalAttempts >= 2) {
                msg = `That one didn't land. You're at ${tp.accuracy}% on ${topic}. Tap Hint to work through it.`;
            } else {
                msg = 'Not quite. Tap Hint if you want to work through it.';
            }
        } else {
            // Answer-key mismatch — don't show a misleading label
            msg = 'Your answer has been recorded. Review the full explanation after your session.';
        }

        fb.innerHTML = `<div class="may-fb-item ${bankVerified ? (isCorrect ? 'may-fb-correct' : 'may-fb-wrong') : 'may-fb-neutral'}">${msg}</div>`;
        setTimeout(() => { if (fb) fb.innerHTML = ''; }, 7000);
    },

    // ── Live hint from mini-panel ────────────────────────
    miniHint() {
        let q = this.context.currentQuestion;
        if (!q) return;

        let level = this.context.hintLevel;
        let msgEl = document.getElementById('mayMiniMsg');
        let body = document.getElementById('mayMiniBody');
        if (body && body.style.display === 'none') {
            body.style.display = 'block';
            document.getElementById('mayMiniChevron').innerHTML = '&#9660;';
        }

        if (level >= 4) {
            // Full explanation
            let cc = q.CorrectChoice;
            let correctText = q.Choices ? q.Choices[cc] : '';
            let explanation = q.ExplanationCorrect || '';
            let snippet = explanation.length > 180 ? explanation.substring(0, 180) + '...' : explanation;
            if (msgEl) msgEl.innerHTML = `<div class="may-mini-msg-content"><strong>Answer: ${cc}</strong> — ${correctText}<br><br>${snippet}</div>`;
            this.context.hintLevel = 0;
            return;
        }

        let topic = MayLearnerState._normalizeTopic(q.Topic || 'this concept');
        let hint;
        switch (level) {
            case 0: hint = this._metacognitiveHint(q, topic, q.Difficulty || 'Moderate'); break;
            case 1: hint = this._conceptHint(q, topic); break;
            case 2: hint = this._strategyHint(q, topic); break;
            case 3: hint = this._eliminationHint(q, q.CorrectChoice); break;
            default: hint = "Let me walk through the full reasoning.";
        }

        this.context.hintLevel++;
        if (msgEl) msgEl.innerHTML = `<div class="may-mini-msg-content"><strong>Hint ${level + 1}/5:</strong> ${hint}</div>`;
        this.context._liveHintCount = (this.context._liveHintCount || 0) + 1;
        if (q.QuestionID) {
            if (!this.context._sessionHints) this.context._sessionHints = {};
            this.context._sessionHints[q.QuestionID] = (this.context._sessionHints[q.QuestionID] || 0) + 1;
        }
    },

    // ── Mini explain from panel ──────────────────────────
    miniExplain() {
        let q = this.context.currentQuestion;
        if (!q) return;
        let body = document.getElementById('mayMiniBody');
        if (body && body.style.display === 'none') {
            body.style.display = 'block';
            document.getElementById('mayMiniChevron').innerHTML = '&#9660;';
        }
        let msgEl = document.getElementById('mayMiniMsg');

        // Gate: require learner to have attempted an answer before revealing it.
        // In review mode (session completed), the gate is relaxed — the student
        // has already attempted these questions and is revisiting them.
        let inReviewMode = typeof state !== 'undefined' && state.session && state.session.completed;
        let hasAttempted = typeof state !== 'undefined' && state.session
            && state.session.answers && state.session.answers[q.QuestionID] !== undefined;
        if (!hasAttempted && !inReviewMode && q.QuestionID) {
            if (msgEl) msgEl.innerHTML = `<div class="may-mini-msg-content">Try answering first — I'll explain after you've made your choice. Tap <strong>Hint</strong> if you're stuck.</div>`;
            return;
        }

        // S120 — Use tutor layer for richer mini-explain
        let tutor = this._buildTutorExplanation(q);
        let cc = q.CorrectChoice;
        let correctText = q.Choices ? q.Choices[cc] : '';
        let explanation = q.ExplanationCorrect || '';
        let snippet = '';

        if (tutor && explanation && explanation.length > 30) {
            snippet = `<strong>${cc}: ${correctText}</strong><br>${explanation.length > 200 ? explanation.substring(0, 200) + '...' : explanation}<br><br><em>${tutor.commonTrap.replace('**Common trap:** ', '')}</em>`;
        } else if (tutor) {
            snippet = `<strong>${cc}: ${correctText}</strong><br>${tutor.testedConcept}<br><br><em>${tutor.commonTrap.replace('**Common trap:** ', '')}</em>`;
        } else {
            snippet = `<strong>${cc}:</strong> ${correctText}<br><br>${explanation.length > 250 ? explanation.substring(0, 250) + '...' : explanation}`;
        }
        if (msgEl) msgEl.innerHTML = `<div class="may-mini-msg-content">${snippet}</div>`;
    },

    // ── Mini insight from panel ──────────────────────────
    miniInsight() {
        let body = document.getElementById('mayMiniBody');
        if (body && body.style.display === 'none') {
            body.style.display = 'block';
            document.getElementById('mayMiniChevron').innerHTML = '&#9660;';
        }
        let clusters = MayLearnerState.getWeaknessClusters();
        let data = MayLearnerState.load();
        let parts = [];
        if (clusters.improving.length > 0) {
            parts.push('Improving: ' + clusters.improving.slice(0, 2).map(t => t.topic).join(', '));
        }
        if (clusters.persistentWeak.length > 0) {
            parts.push('Needs work: ' + clusters.persistentWeak.slice(0, 2).map(t => t.topic).join(', '));
        }
        if (parts.length === 0) {
            parts.push(data.sessions && data.sessions.length > 0
                ? `${data.sessions.length} session(s) tracked. Patterns emerge with more practice.`
                : 'Complete a session to see progress.');
        }
        let msgEl = document.getElementById('mayMiniMsg');
        if (msgEl) msgEl.innerHTML = `<div class="may-mini-msg-content">${parts.join('<br>')}</div>`;
    },

    // ── Reset hint counter for a new question ─────────────
    resetLiveHints() {
        this.context.hintLevel = 0;
        this.context._liveHintCount = 0;
        let msgEl = document.getElementById('mayMiniMsg');
        if (msgEl) msgEl.innerHTML = '';
        let fb = document.getElementById('mayMiniFeedback');
        if (fb) fb.innerHTML = '';
    },

    // ── Review a specific question by QID ────────────────
    reviewByQID(qid) {
        this._ensureCachedBanks();

        let q = this._cachedBanks.find(b => b.QuestionID === qid);
        if (q) {
            this.setQuestionContext(q);
        } else {
            this._speak(`I couldn't find question ${qid} in the bank. Double-check the QID?`);
            this.renderView();
        }
    },

    // ── Render a compact greeting card in the setup panel ───
    renderSetupGreeting() {
        let panel = document.querySelector('.setup-panel');
        if (!panel) return;
        let existing = document.getElementById('maySetupGreeting');
        if (existing) existing.remove();

        let profile = MayLearnerState.getUserProfile();
        let data = MayLearnerState.load();
        let sessionCount = data.sessions ? data.sessions.length : 0;
        let totalAttempts = data.sessions.reduce((s, sess) => s + (sess.attempts || []).length, 0);

        let greetingHtml = '';
        if (!profile.name) {
            greetingHtml = `<div class="may-setup-greeting" id="maySetupGreeting">
                <div class="may-setup-avatar">M</div>
                <div class="may-setup-text">
                    <strong>Hi! I'm May — your study companion for CMA Part 1.</strong>
                    I'll track your progress, explain questions, and build review sets.
                    <span class="may-setup-cta" onclick="May.openMayFromLauncher()">Set up May to get started</span>
                </div>
            </div>`;
        } else {
            let clusters = MayLearnerState.getWeaknessClusters();
            let weakHint = '';
            if (clusters.persistentWeak.length > 0) {
                weakHint = ` Your weakest area: <strong>${clusters.persistentWeak[0].topic}</strong> (${clusters.persistentWeak[0].accuracy}%). I'd focus there first.`;
            }
            greetingHtml = `<div class="may-setup-greeting" id="maySetupGreeting">
                <div class="may-setup-avatar">M</div>
                <div class="may-setup-text">
                    <strong>Welcome back, ${profile.name}!</strong>
                    ${sessionCount > 0 ? `I've tracked ${sessionCount} session${sessionCount !== 1 ? 's' : ''} and ${totalAttempts} attempts for you.` : 'Ready to practice?'}${weakHint}
                    <span class="may-setup-cta" onclick="May.openMayFromLauncher()">Open May for insights</span>
                </div>
            </div>`;
        }

        let wrapper = document.createElement('div');
        wrapper.innerHTML = greetingHtml;
        // Prepend before the h2 heading so May appears above the form
        let h2 = panel.querySelector('h2');
        if (h2) {
            panel.insertBefore(wrapper.firstElementChild, h2);
        } else {
            panel.prepend(wrapper.firstElementChild);
        }
    },

    // ============================================================
    // S107 — Tutoring Safety Layer (debug-only, non-invasive)
    // These helpers validate tutoring output for safety without
    // changing any existing production behavior. Tests in
    // test_tutoring_safety.js use these to verify anti-leakage
    // and anti-hallucination constraints.
    // ============================================================

    // Known vocabularies for hallucination detection
    _safetyVocab: {
        knownTopics: [],
        knownMisconceptionPatterns: [
            'misclassification', 'variance_sign_confusion', 'budget_component_error',
            'cost_method_confusion', 'depreciation_method_error', 'cash_flow_classification',
            'ratio_misapplication', 'control_framework_error', 'general_error'
        ],
        knownSections: ['A', 'B', 'C', 'D', 'E', 'F'],
        knownBands: [
            'Not enough data', 'Recovery needed', 'Developing',
            'Approaching review-ready', 'Ready for focused review'
        ],
        bannedPhrases: [
            'exam ready', 'exam-ready', 'ready for the exam', 'guaranteed to pass',
            'will pass', 'definitely pass', 'sure to pass'
        ]
    },

    // Initialize safety vocabulary from topic index if available
    _initSafetyVocab() {
        try {
            this._ensureTopicIndex();
            this._safetyVocab.knownTopics = Object.keys(this._topicIndex || {});
        } catch (e) { /* topic index not available in test env */ }
    },

    // Core safety check: scan tutoring output for leakage/hallucination.
    // Returns { safe: boolean, violations: string[] }
    ensureSafeTutoringOutput(outputText, context) {
        if (!outputText || typeof outputText !== 'string') {
            return { safe: true, violations: [] };
        }
        let violations = [];
        let lower = outputText.toLowerCase();

        // 1. Check for exam-prediction language
        this._safetyVocab.bannedPhrases.forEach(phrase => {
            if (lower.includes(phrase)) {
                violations.push('EXAM_PREDICTION: contains "' + phrase + '"');
            }
        });

        // 2. Check for answer leakage in hint context (levels 0-3)
        if (context && context.hintLevel !== undefined && context.hintLevel < 4 && context.correctAnswer) {
            let correctLower = context.correctAnswer.toLowerCase();
            let correctLetter = context.correctChoice;
            if (correctLetter && outputText.includes(correctLetter) &&
                lower.includes(correctLetter.toLowerCase()) && lower.includes('correct')) {
                violations.push('ANSWER_LEAKAGE_HINT: hint level ' + context.hintLevel +
                    ' reveals correct choice ' + correctLetter);
            }
        }

        // 3. Check for hallucinated misconception pattern names
        if (context && context.allowPatterns !== false) {
            let patternClaims = outputText.match(/involving\s+\*\*([^*]+)\*\*/g) || [];
            patternClaims.forEach(claim => {
                let patternName = claim.replace(/involving\s+\*\*/, '').replace(/\*\*/, '').trim();
                if (patternName.length > 0 &&
                    !this._safetyVocab.knownMisconceptionPatterns.includes(patternName) &&
                    !['calculation setup', 'evidence location', 'exhibit interpretation',
                        'control judgment', 'answer elimination'].includes(patternName.toLowerCase())) {
                    violations.push('HALLUCINATION_PATTERN: unknown pattern "' + patternName + '"');
                }
            });
        }

        // 4. Check for exam-mode leakage
        if (context && context.examModeActive && context.correctAnswer) {
            if (lower.includes(context.correctAnswer.toLowerCase())) {
                violations.push('ANSWER_LEAKAGE_EXAM: answer revealed during exam mode');
            }
        }

        return { safe: violations.length === 0, violations: violations };
    },

    // Check that a recommendation set respects defect/contest gates
    verifyDefectGateCompliance(recommendedQids) {
        if (!recommendedQids || !Array.isArray(recommendedQids)) {
            return { safe: true, blockedQidsFound: [] };
        }
        let blocked = [];
        recommendedQids.forEach(qid => {
            if (this._isBlockedByDefectManifest(qid)) blocked.push(qid);
            if (MayLearnerState.isQuestionContested(qid)) blocked.push(qid + ' (contested)');
        });
        return { safe: blocked.length === 0, blockedQidsFound: blocked };
    },

    // Check that recommendations only use Certified items
    verifyCertifiedOnlyGate(recommendedQids) {
        if (!recommendedQids || !Array.isArray(recommendedQids)) {
            return { safe: true, nonCertifiedQids: [] };
        }
        this._ensureTopicIndex();
        let certifiedSet = new Set();
        Object.values(this._topicIndex || {}).forEach(qs => {
            qs.forEach(q => {
                if (q.QuestionID && q.question_state === 'Certified') certifiedSet.add(q.QuestionID);
            });
        });
        let nonCertified = recommendedQids.filter(qid => !certifiedSet.has(qid));
        return { safe: nonCertified.length === 0, nonCertifiedQids: nonCertified };
    },

    // ============================================================
    // S115 — Log persistence, session telemetry, and export
    // ============================================================

    // Restore persisted logs from localStorage on init (survive page reloads).
    _restorePersistedLogs() {
        try {
            let usageLog = localStorage.getItem('cmaMayPilotUsageLog');
            if (usageLog) this.context._pilotUsageLog = JSON.parse(usageLog);
        } catch (e) { /* corrupted — stay with empty array */ }
        try {
            let safetyLog = localStorage.getItem('cmaMaySafetyLog');
            if (safetyLog) this.context._safetyLog = JSON.parse(safetyLog);
        } catch (e) {}
        try {
            let gateLog = localStorage.getItem('cmaMayGateLog');
            if (gateLog) this.context._gateLog = JSON.parse(gateLog);
        } catch (e) {}
        try {
            let telemetry = localStorage.getItem('cmaMaySessionTelemetry');
            if (telemetry) this.context._sessionTelemetry = JSON.parse(telemetry);
        } catch (e) {}
    },

    // Persist pilot usage log to localStorage (capped at 200).
    // S120 — Also write to cmaProfile2026 (SSOT) so profile save/backup stays current.
    _persistUsageLog() {
        try {
            var log = (this.context._pilotUsageLog || []).slice(-200);
            localStorage.setItem('cmaMayPilotUsageLog', JSON.stringify(log));
            if (typeof CMAProfileManager !== 'undefined') CMAProfileManager.patchMayField('mayUsageLog', log);
        } catch (e) { /* quota exceeded */ }
    },

    // Persist safety log to localStorage (capped at 50).
    // S120 — Also write to cmaProfile2026 (SSOT).
    _persistSafetyLog() {
        try {
            var log = (this.context._safetyLog || []).slice(-50);
            localStorage.setItem('cmaMaySafetyLog', JSON.stringify(log));
            if (typeof CMAProfileManager !== 'undefined') CMAProfileManager.patchMayField('maySafetyLog', log);
        } catch (e) {}
    },

    // Persist gate log to localStorage (capped at 50).
    // S120 — Also write to cmaProfile2026 (SSOT).
    _persistGateLog() {
        try {
            var log = (this.context._gateLog || []).slice(-50);
            localStorage.setItem('cmaMayGateLog', JSON.stringify(log));
            if (typeof CMAProfileManager !== 'undefined') CMAProfileManager.patchMayField('mayGateLog', log);
        } catch (e) {}
    },

    // Persist session telemetry to localStorage (capped at 100).
    // S120 — Also write to cmaProfile2026 (SSOT).
    _persistSessionTelemetry() {
        try {
            var log = (this.context._sessionTelemetry || []).slice(-100);
            localStorage.setItem('cmaMaySessionTelemetry', JSON.stringify(log));
            if (typeof CMAProfileManager !== 'undefined') CMAProfileManager.patchMayField('maySessionTelemetry', log);
        } catch (e) {}
    },

    // Log a session telemetry event with learner context.
    _logSessionTelemetry(event, data) {
        if (!this.context._sessionTelemetry) this.context._sessionTelemetry = [];
        let entry = {
            event: event,
            timestamp: new Date().toISOString(),
            learnerId: null,
            data: data || {}
        };
        try { entry.learnerId = localStorage.getItem('cmaMaySelectedLearnerId'); } catch (e) {}
        this.context._sessionTelemetry.push(entry);
        if (this.context._sessionTelemetry.length > 100) {
            this.context._sessionTelemetry = this.context._sessionTelemetry.slice(-100);
        }
        this._persistSessionTelemetry();
    },

    // ── Developer-facing export: download all pilot data as JSON ──
    exportMayPilotData() {
        var payload = {
            generatedAt: new Date().toISOString(),
            environment: 'pre-production',
            syntheticData: true,
            selectedLearnerId: null,
            studentRoll: [],
            pilotUsageLog: this._getPilotUsageLog ? this._getPilotUsageLog() : [],
            safetyLog: this._getSafetyLog ? this._getSafetyLog() : [],
            gateLog: this._getGateLog ? this._getGateLog() : [],
            sessionTelemetry: (this.context._sessionTelemetry || []).slice(),
            calibrationExport: MayLearnerState.exportCalibrationData(),
            thresholdSnapshot: MayLearnerState.getThresholdSnapshot(),
            modelVersion: ((MayLearnerState.getReadinessSummary()._provenance || {}).modelVersion) || 'S111-1.0',
            learnerState: MayLearnerState.load()
        };
        try { payload.selectedLearnerId = localStorage.getItem('cmaMaySelectedLearnerId'); } catch (e) {}
        try { payload.studentRoll = JSON.parse(localStorage.getItem('cmaMayStudentRoll') || '[]'); } catch (e) {}
        try { payload.telemetrySnapshot = JSON.parse(localStorage.getItem('cmaMayPilotTelemetry') || '{}'); } catch (e) {}
        try { payload.telemetryArchive = JSON.parse(localStorage.getItem('cmaMayPilotTelemetryArchive') || '[]'); } catch (e) {}
        try { payload.effectivenessScorecard = typeof MayEffectivenessScorer !== 'undefined' ? MayEffectivenessScorer.compute() : null; } catch (e) {}
        try { payload.adoptionFunnel = typeof MayEffectivenessScorer !== 'undefined' ? MayEffectivenessScorer.adoptionFunnel() : null; } catch (e) {}

        this._logSessionTelemetry('export_performed', { generatedAt: payload.generatedAt });

        let blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        let url = URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = 'may-pilot-data-' + new Date().toISOString().substring(0, 10) + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this._speak('Pilot data exported. The file includes student roll, all logs, session telemetry, calibration data, and threshold snapshot.');
        this.renderView();
    },

    // ── Developer-facing reset: clear all S115 localStorage keys and in-memory logs ──
    // S120 — Also clears May fields from cmaProfile2026 (SSOT) so reset is complete.
    clearPilotData() {
        let keys = ['cmaMayStudentRoll', 'cmaMaySelectedLearnerId', 'cmaMayPilotUsageLog',
                    'cmaMaySafetyLog', 'cmaMayGateLog', 'cmaMaySessionTelemetry',
                    'cmaMayPilotTelemetry', 'cmaMayPilotTelemetrySnapshot', 'cmaMayPilotTelemetryArchive'];
        keys.forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
        // S120 — Clear May fields from the unified profile to prevent stale restore
        try {
            if (typeof CMAProfileManager !== 'undefined') {
                var profile = CMAProfileManager.load();
                profile.mayLearnerState = {};
                profile.mayStudentRoll = [];
                profile.mayUsageLog = [];
                profile.maySafetyLog = [];
                profile.mayGateLog = [];
                profile.maySessionTelemetry = [];
                profile.mayPilotTelemetry = {};
                profile.mayPilotTelemetryArchive = [];
                profile.maySelectedLearnerId = null;
                CMAProfileManager.save(profile);
            }
        } catch (e) {}
        this.context._pilotUsageLog = [];
        this.context._safetyLog = [];
        this.context._gateLog = [];
        this.context._sessionTelemetry = [];
        this.context.greetingState = 'idle';
        this._speak('All pilot data cleared. Refresh the page to see the greeting handshake again.');
        this.renderView();
    },

    // ============================================================
    // S108 — Guarded Tutoring Pilot (default off, safety-gated)
    // S109 — Extended: usage logging, env-based gating, safety vocab init at init()
    // S115 — Extended: log persistence to localStorage after each push
    // ============================================================

    // Record pilot tutoring usage for post-hoc analysis.
    // Captures: behavior invoked, section/topic, safety outcome, gate outcome.
    _logPilotUsage(sourceLabel, safetyResult, gateResult) {
        if (!this.context._pilotUsageLog) this.context._pilotUsageLog = [];
        let q = this.context.currentQuestion;
        let entry = {
            timestamp: new Date().toISOString(),
            sourceLabel: sourceLabel || 'unknown',
            section: q ? q.Section : null,
            topic: q ? (q.Topic || null) : null,
            qid: q ? (q.QuestionID || null) : null,
            pilotActive: this.isPilotEnvironment(),
            safetySafe: safetyResult ? safetyResult.safe : null,
            safetyViolations: safetyResult ? safetyResult.violations : [],
            gateSafe: gateResult ? (gateResult.defectResult && gateResult.defectResult.safe && gateResult.certResult && gateResult.certResult.safe) : null
        };
        this.context._pilotUsageLog.push(entry);
        if (this.context._pilotUsageLog.length > 200) this.context._pilotUsageLog = this.context._pilotUsageLog.slice(-200);
        this._persistUsageLog(); // S115 — persist to localStorage
        return entry;
    },

    // Get pilot usage log (for audit / reporting)
    _getPilotUsageLog() {
        return (this.context._pilotUsageLog || []).slice();
    },

    // Clear pilot usage log
    _clearPilotUsageLog() {
        this.context._pilotUsageLog = [];
    },

    // Build safety context from current May state
    _guardedTutoringContext() {
        let q = this.context.currentQuestion;
        return {
            hintLevel: this.context.hintLevel,
            correctChoice: q ? q.CorrectChoice : null,
            correctAnswer: q ? (q.Choices && q.Choices[q.CorrectChoice] ? q.Choices[q.CorrectChoice] : null) : null,
            examModeActive: this.isFullTabBlocked(),
            allowPatterns: true
        };
    },

    // Safety-gated speak: validates output before publishing
    _guardedSpeak(lines, sourceLabel) {
        let text = Array.isArray(lines) ? lines.join('\n') : lines;
        let ctx = this._guardedTutoringContext();
        let safetyResult = this.ensureSafeTutoringOutput(text, ctx);
        let pilotActive = this.isPilotEnvironment();

        // Always log safety result (debug-only when pilot off)
        let safetyLog = {
            timestamp: new Date().toISOString(),
            sourceLabel: sourceLabel || 'unknown',
            textLength: text.length,
            safe: safetyResult.safe,
            violations: safetyResult.violations,
            hintLevel: ctx.hintLevel,
            examMode: ctx.examModeActive,
            pilotActive: pilotActive
        };
        if (!this.context._safetyLog) this.context._safetyLog = [];
        this.context._safetyLog.push(safetyLog);
        if (this.context._safetyLog.length > 50) this.context._safetyLog = this.context._safetyLog.slice(-50);
        this._persistSafetyLog(); // S115 — persist to localStorage

        // S109 — Log pilot usage unconditionally
        this._logPilotUsage(sourceLabel, safetyResult);

        if (pilotActive) {
            if (safetyResult.safe) {
                if (text.length > 0) this._speak(text);
            } else {
                // Pilot mode with violations: speak a sanitized version
                this._speak('Pilot note: that tutoring response was filtered (' +
                    safetyResult.violations.length + ' safety violation(s)). ' +
                    'Original intent: ' + (sourceLabel || 'help') + '.');
            }
        }
        // When pilot off: silent validation only (no user-visible output)
        return safetyResult;
    },

    // Safety-gated hint with defect/certified gate checks on recommendations
    _guardedRecommend(qids, sourceLabel) {
        let defectResult = this.verifyDefectGateCompliance(qids);
        let certResult = this.verifyCertifiedOnlyGate(qids);

        let gateLog = {
            timestamp: new Date().toISOString(),
            sourceLabel: sourceLabel || 'recommend',
            qidCount: qids ? qids.length : 0,
            defectSafe: defectResult.safe,
            blockedQids: defectResult.blockedQidsFound,
            certSafe: certResult.safe,
            nonCertifiedQids: certResult.nonCertifiedQids
        };
        if (!this.context._gateLog) this.context._gateLog = [];
        this.context._gateLog.push(gateLog);
        if (this.context._gateLog.length > 50) this.context._gateLog = this.context._gateLog.slice(-50);
        this._persistGateLog(); // S115 — persist to localStorage

        if (this.config.tutoringPilotEnabled) {
            if (!defectResult.safe) {
                this._speak('Pilot note: ' + defectResult.blockedQidsFound.length +
                    ' QID(s) blocked by defect/contest gates.');
            }
            if (!certResult.safe) {
                this._speak('Pilot note: ' + certResult.nonCertifiedQids.length +
                    ' QID(s) are not Certified — excluded from recommendation.');
            }
        }
        return { defectResult, certResult };
    },

    // Get accumulated safety logs (for debug/audit inspection)
    _getSafetyLog() {
        return (this.context._safetyLog || []).slice();
    },

    // Get accumulated gate-check logs
    _getGateLog() {
        return (this.context._gateLog || []).slice();
    },

    // Clear safety/gate logs (for test reset)
    _clearSafetyLogs() {
        this.context._safetyLog = [];
        this.context._gateLog = [];
    },

    // ============================================================
    // S113 — Evidence-threshold validation for insight claims
    // S106 §4.2 minimum data thresholds. All checks return true
    // only when the claim is backed by enough data.
    // ============================================================

    // "Improving": >=2 attempts in both comparison windows, delta >=15%
    _hasImprovingEvidence(topicData) {
        return topicData.totalAttempts >= 4 &&
            topicData.recentPct !== null && topicData.accuracy !== null &&
            (topicData.recentPct - topicData.accuracy) >= 15;
    },

    // "Persistent weakness": >=5 attempts, accuracy <60%
    _hasPersistentWeakEvidence(topicData) {
        return topicData.totalAttempts >= 5 && topicData.accuracy < 60;
    },

    // "Declining": delta <= -15%
    _hasDecliningEvidence(topicData) {
        return topicData.totalAttempts >= 4 &&
            topicData.recentPct !== null && topicData.accuracy !== null &&
            (topicData.recentPct - topicData.accuracy) <= -15;
    },

    // "Unstable": >=4 recent attempts, stability <50%
    _hasUnstableEvidence(topicData) {
        return topicData.totalAttempts >= 4 &&
            topicData.stability !== null && topicData.stability < 50;
    },

    // "Hint dependent": >=4 attempts, hint trend increasing, accuracy >=70%
    _hasHintDependentEvidence(topicData) {
        return topicData.totalAttempts >= 4 &&
            topicData.hintTrend === 'increasing' &&
            topicData.accuracy !== null && topicData.accuracy >= 70;
    },

    // "Difficulty sensitive": >=2 Easy, >=2 Difficult, gap >=30%
    _hasDifficultySensitiveEvidence(topicData) {
        let dd = topicData.difficultyDistribution || {};
        let easy = (dd['Easy'] || 0) + (dd['Moderate-Easy'] || 0);
        let hard = (dd['Difficult'] || 0) + (dd['Very Difficult'] || 0);
        if (easy < 2 || hard < 2) return false;
        let easyPct = null, hardPct = null;
        // Derive from available data; fall back to rough estimate from lowPct/highPct
        if (topicData.lowPct !== undefined && topicData.highPct !== undefined) {
            easyPct = topicData.lowPct;
            hardPct = topicData.highPct;
        }
        if (easyPct !== null && hardPct !== null && (easyPct - hardPct) >= 30) return true;
        return false;
    },

    // "Confidence calibration": >=4 confidence-rated attempts
    _hasConfidenceEvidence(calibrationEntry) {
        return calibrationEntry && calibrationEntry.total >= 4;
    },

    // Build a summary of which insight claims have sufficient evidence.
    // Returns an object with boolean flags for each claim type.
    // Used by tests to verify evidence enforcement.
    _assessInsightEvidence() {
        let trends = MayLearnerState.getTrends();
        let clusters = MayLearnerState.getWeaknessClusters();
        let calibration = MayLearnerState.getConfidenceCalibration();
        let data = MayLearnerState.load();

        // Improving claim is backed only if >=1 topic meets the threshold
        let hasImproving = clusters.improving.some(t => this._hasImprovingEvidence(t));

        // Persistent weak: already enforced by getWeaknessClusters (>=5 attempts, <60%)
        let hasPersistentWeak = clusters.persistentWeak.length > 0;

        // Declining: must meet delta <= -15%
        let hasDeclining = clusters.declining.some(t => this._hasDecliningEvidence(t));

        // Unstable: must meet stability <50% with >=4 attempts
        let hasUnstable = clusters.unstable.some(t => this._hasUnstableEvidence(t));

        // Hint dependent
        let hasHintDep = clusters.hintDependent.some(t => this._hasHintDependentEvidence(t));

        // Difficulty sensitive
        let hasDiffSens = clusters.difficultySensitive.some(t => this._hasDifficultySensitiveEvidence(t));

        // Confidence: >=4 rated attempts on at least one topic
        let hasConfidence = Object.values(calibration).some(c => this._hasConfidenceEvidence(c));

        // Cross-session comparison
        let hasCrossSession = (data.sessions || []).length >= 2;

        return {
            hasImproving, hasPersistentWeak, hasDeclining, hasUnstable,
            hasHintDependent: hasHintDep, hasDifficultySensitive: hasDiffSens,
            hasConfidence, hasCrossSession,
            sessionCount: (data.sessions || []).length
        };
    },

    // ── May Companion Card (landing-page companion beside Start Session) ─
    _injectMayCompanionCard() {
        // Only inject on the landing page (no active session, sessionView is active)
        let hasActive = (typeof state !== 'undefined' && state.session && !state.session.completed);
        if (hasActive) return;

        // Check if companion card was dismissed this page load
        if (sessionStorage.getItem('mayCompanionDismissed') === '1') return;

        let existing = document.getElementById('mayCompanionCard');
        if (existing) return;

        let workPanel = document.querySelector('.work-panel');
        if (!workPanel) return;

        let profile = MayLearnerState.getUserProfile();
        let data = MayLearnerState.load();
        let sessionCount = data.sessions ? data.sessions.length : 0;
        let hasProfile = !!profile.name;
        let selectedId = null;
        try { selectedId = localStorage.getItem('cmaMaySelectedLearnerId'); } catch (e) {}

        let heading, text, btnLabel, btnAction, showDismiss = true;

        if (hasProfile || selectedId) {
            // Returning student
            heading = `Welcome back, ${profile.name || 'CMA candidate'}!`;
            text = sessionCount > 0
                ? `I've tracked ${sessionCount} session${sessionCount !== 1 ? 's' : ''} for you. I can help review missed questions, spot weak areas, and guide your next practice session.`
                : `I'm ready to help you get started. I'll explain questions, track your progress, and build a focused review plan.`;
            btnLabel = 'Open May';
            btnAction = 'May.openMayFromLauncher()';
        } else {
            // New student
            heading = 'Hi, I\'m May — your CMA Part 1 study companion';
            text = 'I\'ll help you track progress, understand missed questions, and turn each practice session into a focused review plan.';
            btnLabel = 'Meet May';
            btnAction = 'May.openMayFromLauncher()';
        }

        let cardHtml = `<div class="may-companion-card" id="mayCompanionCard">
            <div class="may-companion-avatar">M</div>
            <div class="may-companion-body">
                <div class="may-companion-heading">${heading}</div>
                ${!hasProfile ? '<div class="may-companion-subtitle">Your CMA Part 1 study companion</div>' : ''}
                <p class="may-companion-text">${text}</p>
                <div class="may-companion-actions">
                    <button class="may-companion-btn may-companion-btn-may" onclick="${btnAction}">${btnLabel}</button>
                    ${showDismiss ? '<button class="may-companion-btn may-companion-btn-dismiss" onclick="May.dismissMayCompanionCard()">Dismiss for now</button>' : ''}
                </div>
            </div>
        </div>`;

        let wrapper = document.createElement('div');
        wrapper.innerHTML = cardHtml;
        let tabsNav = workPanel.querySelector('.tabs');
        if (tabsNav) {
            workPanel.insertBefore(wrapper.firstElementChild, tabsNav);
        } else {
            workPanel.prepend(wrapper.firstElementChild);
        }
    },

    _hideMayCompanionCard() {
        let card = document.getElementById('mayCompanionCard');
        if (card) card.remove();
    },

    dismissMayCompanionCard() {
        let card = document.getElementById('mayCompanionCard');
        if (card) card.remove();
        sessionStorage.setItem('mayCompanionDismissed', '1');
        if (typeof MayTelemetry !== 'undefined') {
            MayTelemetry.trackEngagement({ action: 'dismissed', timestamp: new Date().toISOString() });
        }
        // Ensure launcher is visible
        this._updateMayLauncherState();
    },

    // ── Persistent May Launcher (floating bottom-right) ─────
    _injectMayLauncher() {
        // S130 — Launcher replaced by floating May panel; no-op
        return;
    },

    _updateMayLauncherState() {
        var launcher = document.getElementById('mayLauncher');
        if (!launcher) return;

        var hasActive = (typeof state !== 'undefined' && state.session && !state.session.completed);
        // W1-B — derived from the shared isExamIntegrityMode source
        var isExamMode = hasActive && (typeof isExamIntegrityMode === 'function'
            ? isExamIntegrityMode(state.session)
            : state.session.mode === 'full');

        // During MCQ session: mini panel is present at bottom-right — reposition launcher above it
        var miniPanel = document.getElementById('mayMini');
        if (miniPanel) {
            launcher.style.bottom = '370px';
            launcher.style.opacity = '0.85';
        } else if (isExamMode) {
            launcher.style.bottom = '20px';
            launcher.style.opacity = '0.65';
        } else if (hasActive) {
            launcher.style.bottom = '20px';
            launcher.style.opacity = '0.85';
        } else {
            launcher.style.bottom = '20px';
            launcher.style.opacity = '1';
            if (typeof MayTelemetry !== 'undefined') {
                MayTelemetry.trackEngagement({ action: 'tooltipViewed', timestamp: new Date().toISOString() });
            }
        }
    },

    openMayFromLauncher() {
        // Dismiss companion card if visible
        let card = document.getElementById('mayCompanionCard');
        if (card) card.remove();
        sessionStorage.setItem('mayCompanionDismissed', '1');

        // Switch to May tab and render
        if (typeof showView !== 'undefined') showView('coachView');
        this.renderView();

        if (typeof MayTelemetry !== 'undefined') {
            var _ts = new Date().toISOString();
            MayTelemetry.trackAdoption({ recommendationType: 'Launcher', cardId: 'may-launcher', topic: '', presented: false, panelOpened: true, clicked: true, sessionStarted: false, completed: false, timestamp: _ts });
            MayTelemetry.trackEngagement({ action: 'tooltipClicked', timestamp: _ts });
        }

        // Pulse the launcher briefly
        let btn = document.getElementById('mayLauncherBtn');
        if (btn) {
            btn.classList.add('may-launcher-pulse');
            setTimeout(() => btn.classList.remove('may-launcher-pulse'), 2000);
        }
    },

    // ── Post-session: pulse launcher to signal review ready ──
    _pulseLauncherReview() {
        let launcher = document.getElementById('mayLauncher');
        if (!launcher) return;
        launcher.style.opacity = '1';
        let tooltip = document.getElementById('mayLauncherTooltip');
        if (tooltip) tooltip.textContent = 'Your review is ready. See strengths, weak areas, and next goals.';
        let btn = document.getElementById('mayLauncherBtn');
        if (btn) {
            btn.classList.add('may-launcher-pulse');
            setTimeout(() => btn.classList.remove('may-launcher-pulse'), 3000);
        }
    },

};

// ── Auto-initialize on load ─────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    May.init();
    setTimeout(() => May.renderSetupGreeting(), 100);
});
