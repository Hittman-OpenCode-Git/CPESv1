// Minimal reproducer — test every May feature twice with fresh/returning learners
let fs = require("fs"); let path = require("path"); let b = "C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026";
function lg(fp) { let c = fs.readFileSync(fp,"utf8"); c=c.replace(/^const\s+(\w+)\s*=/gm,"global.$1 ="); c=c.replace(/^let\s+(\w+)\s*=/gm,"global.$1 ="); (new Function(c))(); }
global.localStorage=(()=>{let s={};return{getItem(k){return s[k]||null},setItem(k,v){s[k]=v},removeItem(k){delete s[k]},clear(){s={}}}})();
let dom = {};
global.document={getElementById(id){if(!dom[id])dom[id]={innerHTML:"",textContent:"",style:{}};return dom[id];},addEventListener(){},querySelectorAll(){return[]},createElement(){return{style:{},className:"",innerHTML:""}}};
global.setTimeout=(fn)=>fn(); global.state={session:null};
global.scoreMCQ=(q,a)=>a===q.CorrectChoice?1:0;
global.ExamSessionManager={caseKey(c,i){return c.CaseID+"-"+i},correctCase(it,a){return String(a).trim().toLowerCase()===String(it.Correct).trim().toLowerCase()},practiceScores(){return null}};
lg(path.join(b,"pack_a_corrected.js")); lg(path.join(b,"may-learner-state.js")); lg(path.join(b,"may-core.js"));

let qs = global.MCQ_BANK_A;
let p=0,f=0;
function T(n,fn){try{fn();p++;}catch(e){f++;console.log("FAIL "+n+": "+e.message);}}

function setupFresh(name) {
    MayLearnerState.clear();
    May.context = { currentQuestion: null, currentCaseItem: null, currentCase: null, sessionActive: false, sessionId: null, hintLevel: 0, chatHistory: [], reviewQuestions: [], reviewIndex: -1, _prevAnswers: {}, _liveHintCount: 0, _sessionHints: {}, _defectManifest: null };
    if (name) MayLearnerState.setUserName(name);
}
function seed(prefix, n) {
    for (let s = 0; s < n; s++) {
        let sid = prefix + '-' + s;
        for (let i = 0; i < 6; i++) {
            let qi = qs[(s * 13 + i * 7) % 500];
            let ok = (i % 3) !== 0;
            let ans = ok ? qi.CorrectChoice : ['A','B','C','D'].filter(l => l !== qi.CorrectChoice)[0];
            MayLearnerState.recordAttempt(sid, qi, ans, ok, i % 2, false, 30000, ok ? 4 : 2);
        }
    }
}

console.log("=== May Feature Test — 2 Rounds ===\n");

for (let round = 1; round <= 2; round++) {
    console.log("--- ROUND " + round + " ---");

    // ── FEATURE 1: New user (no name) ──
    T("1a new-user renderView", () => {
        setupFresh(null);
        May.renderView();
        let h = document.getElementById('coachView').innerHTML;
        if (!h.includes('Chloe May')) throw new Error("missing Chloe May intro");
        if (!h.includes("What's your name")) throw new Error("missing name prompt");
    });

    T("1b new-user askForName", () => {
        setupFresh(null);
        May.askForName();
        let m = May.context.chatHistory[0].text;
        if (!m.includes('Chloe May')) throw new Error("missing intro");
        if (!m.includes('name')) throw new Error("missing name question");
    });

    T("1c new-user trySetName accepts valid names", () => {
        setupFresh(null);
        if (!May.trySetName("Alex")) throw new Error("should accept Alex");
        if (MayLearnerState.getUserProfile().name !== "Alex") throw new Error("name not stored");
    });

    T("1d new-user trySetName rejects commands", () => {
        setupFresh(null);
        if (May.trySetName("explain this")) throw new Error("should reject explain");
        if (May.trySetName("hint please")) throw new Error("should reject hint");
        if (May.trySetName("P1-A-001")) throw new Error("should reject QID");
        if (May.trySetName("user99")) throw new Error("should reject numeric");
        if (May.trySetName("x")) throw new Error("should reject single char");
        if (May.trySetName("resolve P1-A-001")) throw new Error("should reject resolve");
    });

    T("1e new-user freeform name detection", () => {
        setupFresh(null);
        May._handleFreeform("Samantha");
        if (MayLearnerState.getUserProfile().name !== "Samantha") throw new Error("name not set via freeform");
    });

    T("1f new-user hello greeting", () => {
        setupFresh(null);
        May._handleFreeform('hello');
        let m = May.context.chatHistory[0].text;
        if (!m.includes("May")) throw new Error("greeting should identify as May");
    });

    // ── FEATURE 2: Named user, no sessions ──
    T("2a named-no-sessions renderView", () => {
        setupFresh("Jordan");
        May.renderView();
        let h = document.getElementById('coachView').innerHTML;
        if (!h.includes("Welcome back")) throw new Error("missing welcome");
        if (!h.includes("Jordan")) throw new Error("missing name");
    });

    T("2b named-no-sessions hello", () => {
        setupFresh("Jordan");
        May._handleFreeform('hello');
        let m = May.context.chatHistory[0].text;
        if (!m.includes("Jordan")) throw new Error("greeting should include name: " + m.substring(0,40));
    });

    T("2c named-no-sessions getWelcomeMessage", () => {
        setupFresh("Jordan");
        May.getWelcomeMessage();
        let m = May.context.chatHistory[0].text;
        if (!m.includes("Chloe May")) throw new Error("should introduce as Chloe May");
        if (!m.includes("Jordan")) throw new Error("should include name");
        if (!m.includes("graduated hint")) throw new Error("should mention features");
    });

    // ── FEATURE 3: Returning user with sessions ──
    T("3a returning-user seed", () => {
        setupFresh("Priya");
        seed("priya", 3);
        let d = MayLearnerState.load();
        if (d.sessions.length !== 3) throw new Error("expected 3 sessions, got " + d.sessions.length);
    });

    T("3b returning-user renderView", () => {
        setupFresh("Priya"); seed("priya", 2);
        May.renderView();
        let h = document.getElementById('coachView').innerHTML;
        if (!h.includes("Welcome back")) throw new Error("missing welcome");
        if (!h.includes("Priya")) throw new Error("missing name");
        if (!h.includes("may-stat-value")) throw new Error("missing stats");
    });

    T("3c returning-user hello", () => {
        setupFresh("Priya"); seed("priya", 1);
        May._handleFreeform('hello');
        let m = May.context.chatHistory[0].text;
        if (!m.includes("Priya")) throw new Error("missing name in greeting");
    });

    T("3d returning-user preExamBriefing", () => {
        setupFresh("Priya"); seed("priya", 1);
        May.preExamBriefing();
        let m = May.context.chatHistory[0].text;
        if (!m.includes("Welcome back")) throw new Error("should welcome back");
        if (m.includes("100 multiple-choice")) throw new Error("should skip full protocol for returning user");
    });

    // ── FEATURE 4: CMA Exam mode ──
    T("4a exam-mode renderView", () => {
        setupFresh("Dr. Chen"); seed("chen", 2);
        global.state = { session: { mode: 'full', completed: false } };
        May.renderView();
        let h = document.getElementById('coachView').innerHTML;
        if (!h.includes("CMA Exam Mode")) throw new Error("should show CMA Exam Mode card");
        if (!h.includes("won't be available")) throw new Error("should mention unavailability");
        if (!h.includes("preExamBriefing")) throw new Error("should have briefing button");
        global.state = { session: null };
    });

    T("4b exam-mode preExamBriefing first-timer", () => {
        setupFresh("Newbie"); // no sessions
        global.state = { session: { mode: 'full', completed: false } };
        May.preExamBriefing();
        let m = May.context.chatHistory[0].text;
        if (!m.includes("100 multiple-choice")) throw new Error("should include MCQ count for first-timer");
        if (!m.includes("360")) throw new Error("should include passing score");
        global.state = { session: null };
    });

    T("4c exam-mode miniPanel suppressed", () => {
        global.state = { session: { mode: 'full' } };
        if (!May.isMiniPanelSuppressed()) throw new Error("should suppress in exam mode");
        global.state = { session: { mode: 'practice' } };
        if (May.isMiniPanelSuppressed()) throw new Error("should NOT suppress in practice");
        global.state = { session: null };
    });

    // ── FEATURE 5: Realtime mini-panel ──
    T("5a miniPanel renders with question", () => {
        setupFresh("Test"); seed("tp", 3);
        global.state = { session: { mode: 'practice' } };
        let q = qs[0];
        let html = May.renderMiniPanel(q);
        if (!html.includes('may-mini')) throw new Error("missing mini panel class");
        if (!html.includes(q.QuestionID)) throw new Error("missing QID");
        global.state = { session: null };
    });

    T("5b miniPanel null returns empty", () => {
        if (May.renderMiniPanel(null) !== '') throw new Error("should return empty for null");
    });

    T("5c miniPanel has insight tag when data exists", () => {
        setupFresh("Test");
        let q = qs[0];
        // Seed enough attempts on this topic
        for (let i = 0; i < 4; i++) MayLearnerState.recordAttempt("mi", q, q.CorrectChoice, true, 0, false, 0, 0);
        let html = May.renderMiniPanel(q);
        if (!html.includes('may-mini-insight')) throw new Error("should have topic insight when data >= 3");
    });

    T("5d resetLiveHints", () => {
        May.context.hintLevel = 3;
        May.context._liveHintCount = 5;
        May.resetLiveHints();
        if (May.context.hintLevel !== 0) throw new Error("hintLevel should be 0");
        if (May.context._liveHintCount !== 0) throw new Error("_liveHintCount should be 0");
    });

    T("5e postAnswerFeedback", () => {
        setupFresh("Test");
        let q = qs[0];
        for (let i = 0; i < 3; i++) MayLearnerState.recordAttempt("fb", q, q.CorrectChoice, true, 0, false, 0, 0);
        May.context.currentQuestion = q;
        May.showPostAnswerFeedback(q, true); // should not crash
        May.showPostAnswerFeedback(q, false); // should not crash
        if (typeof May.showPostAnswerFeedback !== 'function') throw new Error("not a function");
    });

    // ── FEATURE 6: Chat & quick actions ──
    T("6a context bar when question loaded", () => {
        setupFresh("Test");
        let q = qs[0];
        May.setQuestionContext(q);
        May.renderView();
        let h = document.getElementById('coachView').innerHTML;
        if (!h.includes('may-context-bar')) throw new Error("missing context bar");
        if (!h.includes(q.QuestionID)) throw new Error("missing QID in context bar");
    });

    T("6b all quick-action onclick targets valid", () => {
        setupFresh("Test");
        May.renderView();
        let h = document.getElementById('coachView').innerHTML;
        let ms = h.match(/onclick="May\.(\w+)\([^)]*\)"/g) || [];
        ms.forEach(m => {
            let fn = m.match(/May\.(\w+)\(/)[1];
            if (typeof May[fn] !== 'function') throw new Error("invalid onclick target: " + fn);
        });
    });

    // ── FEATURE 7: Chat commands ──
    T("7a start command", () => {
        setupFresh("Test");
        May._handleFreeform('start');
        let m = May.context.chatHistory[0].text;
        if (!(m.includes('Good luck') || m.includes("I'll be here"))) throw new Error("bad start response: " + m.substring(0,40));
    });

    T("7b review command", () => {
        setupFresh("Test"); seed("rv", 2);
        May._handleFreeform('review');
        let m = May.context.chatHistory[0].text;
        if (m.length < 30) throw new Error("review too short");
    });

    T("7c challenge freeform routes to handler", () => {
        setupFresh("Test");
        let q = qs[0]; May.context.currentQuestion = q;
        May._handleFreeform("I think you're wrong about this one");
        let m = May.context.chatHistory[0].text;
        if (!m.includes('might be right')) throw new Error("should route to challenge: " + m.substring(0,60));
    });

    // ── FEATURE 8: Core explanations ──
    T("8a explainAnswer", () => {
        setupFresh("Test");
        let q = qs[0]; May.setQuestionContext(q);
        May._explainAnswer();
        let m = May.context.chatHistory[May.context.chatHistory.length - 1].text;
        if (!m.includes(q.CorrectChoice)) throw new Error("should mention correct choice");
    });

    T("8b hints graduate", () => {
        setupFresh("Test");
        May.setQuestionContext(qs[0]);
        let texts = [];
        for (let i = 0; i < 5; i++) { May._provideHint(); texts.push(May.context.chatHistory[i].text); }
        for (let i = 0; i < 4; i++) {
            if (texts[i] === texts[i+1]) throw new Error("hint " + i + " and " + (i+1) + " identical");
        }
    });

    T("8c confidence calibration", () => {
        let q = qs[0];
        MayLearnerState.recordAttempt("cc", q, "A", false, 0, false, 0, 5); // overconfident
        MayLearnerState.recordAttempt("cc", q, q.CorrectChoice, true, 0, false, 0, 1); // underconfident
        let cal = MayLearnerState.getConfidenceCalibration();
        let topic = MayLearnerState._normalizeTopic(q.Topic);
        if (!cal[topic]) throw new Error("no calibration data");
        if (cal[topic].overconfident < 1) throw new Error("should detect overconfident");
    });

    T("8d recovery set generates QIDs", () => {
        setupFresh("Test");
        for (let i = 0; i < 15; i++) {
            let qi = qs[i * 2];
            for (let j = 0; j < 5; j++) MayLearnerState.recordAttempt("rs", qi, "A", false, 0, false, 0, 0);
        }
        May._generateRecoverySet(6);
        let m = May.context.chatHistory[May.context.chatHistory.length - 1].text;
        if (!m.includes("Recovery set")) throw new Error("should title recovery set");
    });

    T("8e contested QID excluded", () => {
        setupFresh("Test");
        let q = qs[0];
        MayLearnerState.flagChallengedQID(q.QuestionID, "test");
        if (!MayLearnerState.isQuestionContested(q.QuestionID)) throw new Error("should be contested");
        let topic = MayLearnerState._normalizeTopic(q.Topic);
        let results = May._findSimilarQuestions(topic, null, 3);
        if (results.some(r => r.QuestionID === q.QuestionID)) throw new Error("contested QID should be excluded");
        MayLearnerState.resolveChallenge(q.QuestionID, "resolved");
    });

    console.log("Round " + round + " — " + p + " passed so far, " + f + " failed\n");
}

console.log("TOTAL: " + p + " passed, " + f + " failed");
if (f > 0) process.exit(1);
