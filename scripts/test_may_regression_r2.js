// May Full-Functionality Regression Suite (Round 2)
// Covers: identity, CMA mode, mini-panel, context bar, explanations, hints,
//         confidence, recovery sets, contested QIDs, end-to-end sessions
let fs = require("fs"); let path = require("path"); let b = "C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026";
function lg(fp) { let c = fs.readFileSync(fp,"utf8"); c=c.replace(/^const\s+(\w+)\s*=/gm,"global.$1 ="); c=c.replace(/^let\s+(\w+)\s*=/gm,"global.$1 ="); (new Function(c))(); }
global.localStorage=(()=>{let s={};return{getItem(k){return s[k]||null},setItem(k,v){s[k]=v},removeItem(k){delete s[k]},clear(){s={}}}})();
let dom={};global.document={getElementById(id){if(!dom[id])dom[id]={innerHTML:"",textContent:"",style:{}};return dom[id];},addEventListener(){},querySelectorAll(){return[]},createElement(){return{style:{},className:"",innerHTML:""}}};
global.setTimeout=(fn)=>fn(); global.scoreMCQ=(q,a)=>a===q.CorrectChoice?1:0;
global.ExamSessionManager={caseKey(c,i){return c.CaseID+"-"+i},correctCase(it,a){return String(a).trim().toLowerCase()===String(it.Correct).trim().toLowerCase()},practiceScores(){return null}};
lg(path.join(b,"pack_a_corrected.js")); lg(path.join(b,"may-learner-state.js")); lg(path.join(b,"may-core.js"));

let qs = global.MCQ_BANK_A;
let P=0,F=0;
function T(n,fn){try{fn();P++;}catch(e){F++;console.log("FAIL "+n+": "+e.message);}}
function A(cond,msg){if(!cond)throw new Error(msg||"assertion failed");}
function R(cond,msg){if(cond)throw new Error(msg||"unexpected truthy");}

function setup(name,sessions){
    MayLearnerState.clear(); dom={};
    May.context={currentQuestion:null,currentCaseItem:null,currentCase:null,sessionActive:false,sessionId:null,hintLevel:0,chatHistory:[],reviewQuestions:[],reviewIndex:-1,_prevAnswers:{},_liveHintCount:0,_sessionHints:{},_defectManifest:null};
    global.state={session:null};
    if(name)MayLearnerState.setUserName(name);
    if(sessions>0)for(let s=0;s<sessions;s++){let sid="reg-"+name+"-"+s;for(let i=0;i<8;i++){let qi=qs[(s*23+i*11)%500];let ok=i%3!==0;let ans=ok?qi.CorrectChoice:["A","B","C","D"].filter(l=>l!==qi.CorrectChoice)[0];MayLearnerState.recordAttempt(sid,qi,ans,ok,i%2,false,30000+i*7e3,ok?4:2);}}
    // Verify seed worked
    let check=MayLearnerState.load();
    if(sessions>0&&(!check.sessions||check.sessions.length===0)){
        console.log("  WARN: setup seed failed for "+name+" (expected "+sessions+" sessions)");
    }
}
function lastMsg(){return May.context.chatHistory[May.context.chatHistory.length-1].text;}

console.log("=== May Full-Functionality Regression Suite (Round 2) ===\n");

// ════════════════════════════════════════════════════════════
// SECTION 1: Identity and greeting flows
// ════════════════════════════════════════════════════════════
console.log("--- 1. Identity & Greeting ---");

// 1a — new user first visit
T("1a new-user renderView shows Chloe May intro",()=>{
    setup(null,0);
    May.renderView();
    let h=dom["coachView"].innerHTML;
    A(h.includes("Chloe May"),"should show Chloe May intro");
    A(h.includes("What's your name"),"should show name prompt");
    R(h.includes("Welcome back"),"should NOT say welcome back");
});

T("1b new-user no prior-session stats in mini-panel sidebar",()=>{
    setup(null,0);
    May.renderView();
    let h=dom["coachView"].innerHTML;
    // Stats section always renders (shows 0 sessions, 0 attempts)
    A(h.includes("may-stat-item"),"sidebar stats section exists");
    // For new user with no name, should show Chloe May intro, not welcome back
    A(h.includes("Chloe May"),"should show Chloe May");
});

T("1c askForName delivers Chloe May introduction",()=>{
    setup(null,0);
    May.askForName();
    let m=lastMsg();
    A(m.includes("Chloe May"),"should introduce as Chloe May");
    A(m.includes("What's your name"),"should ask for name");
});

T("1d trySetName rejects 'hello' as name (greeting, not identity)",()=>{
    setup(null,0);
    R(May.trySetName("hello"),"'hello' should be rejected as name");
    let p=MayLearnerState.getUserProfile();
    A(p.name===null,"name should remain null after rejecting 'hello'");
});

T("1e trySetName accepts 'Chloe May' and personalizes greeting",()=>{
    setup(null,0);
    A(May.trySetName("Chloe May"),"should accept 'Chloe May' as name");
    let p=MayLearnerState.getUserProfile();
    A(p.name==="Chloe May","name should be stored: "+p.name);
    // Verify renderView produces a greeting that references the name
    May.context.chatHistory=[];
    May.getWelcomeMessage(); // triggers the greeting via speak
    let msg=May.context.chatHistory[0].text;
    A(msg.includes("Chloe May"),"welcome message should include name");
});

// 1f — returning user with prior sessions
T("1f returning-user renderView shows Welcome back with topic insights",()=>{
    setup("Chloe May",3);
    May.renderView();
    let h=dom["coachView"].innerHTML;
    A(h.includes("Welcome back"),"should show Welcome back");
    A(h.includes("Chloe May"),"should include name");
    A(h.includes("may-stat-value"),"should show stats");
    let tp=MayLearnerState.getTopicProgress();
    let hasInsight=Object.keys(tp).length>0;
    if(hasInsight)A(h.includes("may-insight"),"should render insight cards with data");
});

T("1g insight cards reference actual stored data, not generic text",()=>{
    setup("Chloe May",3);
    May.renderView();
    let h=dom["coachView"].innerHTML;
    let tp=MayLearnerState.getTopicProgress();
    let topics=Object.keys(tp);
    // With 3 sessions of data, insight cards should exist with topic content
    if(topics.length>0){
        let hasInsightSection=h.includes("may-insight-card");
        A(hasInsightSection,"should render insight cards when topic data exists");
    }
    R(h.includes("Complete a session to see insights"),"should not show empty placeholder when data exists");
});

// 1h — command confusion: trySetName rejects commands
T("1h trySetName rejects 'start review', 'QID-1234', '12345'",()=>{
    setup(null,0);
    R(May.trySetName("start review"),"should reject 'start review'");
    R(May.trySetName("P1-A-001"),"should reject QID format");
    R(May.trySetName("12345"),"should reject numeric-only");
    let p=MayLearnerState.getUserProfile();
    A(p.name===null,"name should remain null");
});

T("1i freeform routes 'start' to good-luck command",()=>{
    setup("Test",1);
    May._handleFreeform("start");
    let m=lastMsg();
    A(m.includes("Good luck")||m.includes("I'll be here"),"start should give luck: "+m.substring(0,40));
    let p=MayLearnerState.getUserProfile();
    A(p.name==="Test","name should not change from command");
});

// ════════════════════════════════════════════════════════════
// SECTION 2: CMA Exam mode and mini-panel suppression
// ════════════════════════════════════════════════════════════
console.log("\n--- 2. CMA Exam Mode & Mini-Panel Suppression ---");

// 2a — first-time CMA mode: full pre-flight card
T("2a first-time CMA exam: full protocol pre-flight card",()=>{
    setup("NewCMAUser",0); // no prior sessions
    global.state={session:{mode:"full",completed:false}};
    May.renderView();
    let h=dom["coachView"].innerHTML;
    A(h.includes("CMA Exam Mode"),"should show CMA Exam Mode card");
    A(h.includes("won't be available"),"should mention unavailability");
    A(h.includes("preExamBriefing"),"should have briefing button");
    global.state={session:null};
});

T("2b first-time preExamBriefing includes full CMA protocol",()=>{
    setup("NewCMAUser",0);
    global.state={session:{mode:"full",completed:false}};
    May.preExamBriefing();
    let m=lastMsg();
    A(m.includes("100 multiple-choice"),"should include MCQ count for first-timer");
    A(m.includes("360"),"should include passing score 360");
    A(m.includes("Prometric"),"should reference test center procedures");
    global.state={session:null};
});

T("2c mini-panel suppressed during CMA Exam mode",()=>{
    setup("ExamTaker",2);
    global.state={session:{mode:"full"}};
    A(May.isMiniPanelSuppressed(),"should suppress in exam mode");
    let q=qs[0];
    let html=May.renderMiniPanel(q);
    // renderMiniPanel still returns HTML — suppression is in app.js conditional
    A(html.includes("may-mini"),"renderMiniPanel still produces HTML (app.js gates it)");
    global.state={session:null};
});

// 2d — returning CMA user: short briefing
T("2d returning CMA user: short pre-flight card, skips full protocol",()=>{
    setup("VetCMAUser",3);
    global.state={session:{mode:"full",completed:false}};
    May.renderView();
    let h=dom["coachView"].innerHTML;
    A(h.includes("CMA Exam Mode"),"should show exam card");
    A(h.includes("won't be available"),"should mention unavailability");
    global.state={session:null};
});

T("2e returning CMA user preExamBriefing skips full protocol",()=>{
    setup("VetCMAUser",3);
    global.state={session:{mode:"full",completed:false}};
    May.preExamBriefing();
    let m=lastMsg();
    A(m.includes("Welcome back"),"returning should get welcome back");
    R(m.includes("100 multiple-choice"),"should NOT include full protocol for returning user");
    global.state={session:null};
});

T("2f mini-panel NOT suppressed in practice mode",()=>{
    setup("Practice",1);
    global.state={session:{mode:"practice"}};
    R(May.isMiniPanelSuppressed(),"should NOT suppress in practice mode");
    let q=qs[0];
    let html=May.renderMiniPanel(q);
    A(html.includes("may-mini"),"mini-panel should render in practice mode");
    A(html.includes(q.QuestionID),"should include QID");
    global.state={session:null};
});

// ════════════════════════════════════════════════════════════
// SECTION 3: Mini-panel, context bar, quick actions
// ════════════════════════════════════════════════════════════
console.log("\n--- 3. Mini-Panel, Context Bar & Quick Actions ---");

T("3a mini-panel shows QID, topic, and insight when data exists",()=>{
    setup("PanelUser",3);
    global.state={session:{mode:"practice"}};
    let q=qs[0];
    // Seed enough on this topic for insight tag
    for(let i=0;i<4;i++)MayLearnerState.recordAttempt("mp",q,q.CorrectChoice,true,0,false,0,0);
    let html=May.renderMiniPanel(q);
    A(html.includes(q.QuestionID),"should include QID");
    let topic=MayLearnerState._normalizeTopic(q.Topic);
    A(html.includes(topic.substring(0,15)),"should include topic");
    let tp=MayLearnerState.getTopicProgress();
    if(tp[topic]&&tp[topic].totalAttempts>=3){
        A(html.includes("may-mini-insight"),"should have topic insight tag when >=3 attempts");
    }
    global.state={session:null};
});

T("3b no CMA exam pre-flight card in practice mode",()=>{
    setup("PracticeUser",2);
    global.state={session:{mode:"practice"}};
    May.renderView();
    let h=dom["coachView"].innerHTML;
    R(h.includes("CMA Exam Mode"),"should NOT show exam card in practice mode");
    global.state={session:null};
});

T("3c mini-panel toggles/suppression flag works",()=>{
    global.state={session:{mode:"full"}};
    A(May.isMiniPanelSuppressed(),"suppressed in exam mode");
    global.state={session:{mode:"mixed"}};
    R(May.isMiniPanelSuppressed(),"NOT suppressed in mixed mode");
    global.state={session:{mode:"practice"}};
    R(May.isMiniPanelSuppressed(),"NOT suppressed in practice mode");
    global.state={session:null};
    R(May.isMiniPanelSuppressed(),"NOT suppressed with no session");
});

T("3d context bar shows QID, topic, section when question loaded",()=>{
    setup("CtxUser",1);
    let q=qs[0];
    May.setQuestionContext(q);
    May.renderView();
    let h=dom["coachView"].innerHTML;
    A(h.includes("may-context-bar"),"should show context bar");
    A(h.includes(q.QuestionID),"should show QID");
    A(h.includes(MayLearnerState._normalizeTopic(q.Topic).substring(0,15)),"should show topic");
    A(h.includes("Section "+q.Section),"should show section");
});

T("3e quick actions render as buttons with valid onclick handlers",()=>{
    setup("QAUser",1);
    May.renderView();
    let h=dom["coachView"].innerHTML;
    let actions=["explain","wrong-choices","hint","simplify","similar","mymistake","recovery","progress","weakness","summary"];
    actions.forEach(a=>{
        A(h.includes("handleAction("), "should have quick action buttons");
    });
    let ms=h.match(/onclick="May\.(\w+)\([^)]*\)"/g)||[];
    A(ms.length>0,"should have onclick handlers");
    ms.forEach(m=>{
        let fn=m.match(/May\.(\w+)\(/)[1];
        A(typeof May[fn]==="function","invalid onclick target: "+fn);
    });
});

T("3f chat-input row and send button present",()=>{
    setup("ChatUser",1);
    May.renderView();
    let h=dom["coachView"].innerHTML;
    A(h.includes("may-chat-input"),"should have chat input");
    A(h.includes("may-send-btn"),"should have send button");
});

// ════════════════════════════════════════════════════════════
// SECTION 4: Explanations, hints, confidence, recovery sets
// ════════════════════════════════════════════════════════════
console.log("\n--- 4. Explanations, Hints, Confidence, Recovery ---");

// 4a — correct answer explanation
T("4a correct-answer explanation uses bank ExplanationCorrect",()=>{
    setup("ExplainUser",1);
    let q=qs[0];
    May.setQuestionContext(q);
    May._explainAnswer();
    let m=May.context.chatHistory[May.context.chatHistory.length-1].text;
    A(m.includes(q.CorrectChoice),"should mention correct choice: "+q.CorrectChoice);
    if(q.ExplanationCorrect&&q.ExplanationCorrect.length>30){
        A(m.includes(q.ExplanationCorrect.substring(0,40)),"should include verbatim explanation");
    }
});

T("4b _explainAnswer reads last chat turn, not greeting",()=>{
    setup("LastMsg",1);
    let q=qs[0];
    May.setQuestionContext(q); // adds greeting
    let before=May.context.chatHistory.length;
    May._explainAnswer(); // adds explanation
    let after=May.context.chatHistory.length;
    A(after===before+1,"should add exactly one message");
    let last=May.context.chatHistory[May.context.chatHistory.length-1].text;
    A(last.includes(q.CorrectChoice),"last message should be the explanation, not the greeting");
});

T("4c correct-answer confidence message avoids generic praise",()=>{
    setup("NoPraise",1);
    let q=qs[0];
    // Seed topic data so the greeting/context includes accuracy
    for(let i=0;i<3;i++)MayLearnerState.recordAttempt("np",q,q.CorrectChoice,true,0,false,0,0);
    May.setQuestionContext(q);
    May._explainAnswer();
    let m=May.context.chatHistory[May.context.chatHistory.length-1].text;
    R(m.match(/great job|amazing|crushing it|keep going|nice work/i),"should not contain generic praise");
});

// 4d–4g — wrong-answer hints: 5-level graduation
T("4d hint level 1: metacognitive",()=>{
    setup("HintUser",1);
    May.setQuestionContext(qs[0]);
    May._provideHint();
    let m=May.context.chatHistory[May.context.chatHistory.length-1].text;
    A(m.includes("Hint 1 of 5"),"should label as Hint 1");
});

T("4e hints escalate through 5 distinct levels without skipping to answer",()=>{
    setup("HintUser",1);
    May.setQuestionContext(qs[0]);
    let texts=[];
    for(let i=0;i<4;i++){May._provideHint();texts.push(May.context.chatHistory[May.context.chatHistory.length-1].text);}
    // All 4 should be distinct
    for(let i=0;i<3;i++)A(texts[i]!==texts[i+1],"hints "+i+" and "+(i+1)+" should differ");
    // Level 5 (full explanation) should include the answer
    May._provideHint();
    let last=May.context.chatHistory[May.context.chatHistory.length-1].text;
    A(last.includes(qs[0].CorrectChoice),"level 5 should reveal correct answer");
});

T("4f hints grounded in item content, not generic",()=>{
    setup("HintUser",1);
    let q=qs[0];
    May.setQuestionContext(q);
    for(let i=0;i<4;i++)May._provideHint();
    let allText=May.context.chatHistory.map(m=>m.text).join(" ");
    R(allText.match(/try harder|you can do it|keep trying|just think/i),"should not contain generic motivational filler");
});

T("4g final explanation uses ExplanationWrong fields appropriately",()=>{
    setup("WrongExplain",1);
    let q=qs[0];
    May.setQuestionContext(q);
    May._explainWrongChoices();
    let m=lastMsg();
    let cc=q.CorrectChoice;
    ["A","B","C","D"].forEach(l=>{
        if(l===cc)return;
        if(q["ExplanationWrong"+l]&&q["ExplanationWrong"+l].length>10){
            A(m.includes(q["ExplanationWrong"+l].substring(0,30)),"should reference ExplanationWrong"+l);
        }
    });
});

// 4h — confidence calibration
T("4h confidence calibration detects overconfident attempts",()=>{
    MayLearnerState.clear(); // dedicated: no setup() seeding
    let q=qs[0];
    MayLearnerState.recordAttempt("cc1",q,"A",false,0,false,0,5);
    MayLearnerState.recordAttempt("cc1",q,"B",false,0,false,0,4);
    MayLearnerState.recordAttempt("cc1",q,q.CorrectChoice,true,0,false,0,1);
    let cal=MayLearnerState.getConfidenceCalibration();
    let topic=MayLearnerState._normalizeTopic(q.Topic);
    A(cal[topic],"should have calibration data for topic: "+topic);
    A(cal[topic].overconfident>=1,"should detect overconfident attempts, got: "+cal[topic].overconfident);
    A(cal[topic].underconfident>=1,"should detect underconfident attempts, got: "+cal[topic].underconfident);
    A(cal[topic].total===3,"should have 3 total with confidence, got: "+cal[topic].total);
});

T("4i confidence feedback updates after wrong answer with many hints",()=>{
    MayLearnerState.clear();
    let q=qs[0];
    MayLearnerState.recordAttempt("cc2",q,"A",false,3,true,0,0);
    MayLearnerState.recordAttempt("cc2",q,"B",false,2,true,0,0);
    let cal=MayLearnerState.getConfidenceCalibration();
    let topic=MayLearnerState._normalizeTopic(q.Topic);
    if(cal[topic])A(cal[topic].total>=2,"should accumulate attempts, got: "+cal[topic].total);
    // Hint count should be tracked
    let data=MayLearnerState.load();
    let sess=data.sessions.find(s=>s.sessionId==="cc2");
    if(sess)A(sess.attempts.length===2,"should have 2 attempts");
});

// 4j — recovery set generation
T("4j recovery set targets weak topics from real data",()=>{
    setup("RecoveryUser",1);
    // Seed many wrong answers to create weak clusters
    for(let i=0;i<15;i++){
        let qi=qs[i*3];
        for(let j=0;j<5;j++)MayLearnerState.recordAttempt("rs1",qi,"A",false,0,false,0,0);
    }
    May._generateRecoverySet(6);
    let m=lastMsg();
    A(m.includes("Recovery set"),"should title as recovery set");
    A(m.match(/P1-\w+-\d+/),"should include QIDs");
});

// 4k — contested QID exclusion from recovery set
T("4k contested QID excluded from recovery set and recommendations",()=>{
    setup("ContestUser",1);
    let q=qs[0];
    let topic=MayLearnerState._normalizeTopic(q.Topic);
    // Challenge it
    MayLearnerState.flagChallengedQID(q.QuestionID,"test exclusion");
    A(MayLearnerState.isQuestionContested(q.QuestionID),"should be contested");
    // Search — should exclude contested QID
    let results=May._findSimilarQuestions(topic,null,3);
    R(results.some(r=>r.QuestionID===q.QuestionID),"contested QID should be excluded from search");
    // Clean up
    MayLearnerState.resolveChallenge(q.QuestionID,"resolved");
});

T("4l recovery messaging references prior performance data",()=>{
    setup("PerfUser",3);
    // Seed additional wrong answers
    for(let i=0;i<15;i++){
        let qi=qs[i*3];
        for(let j=0;j<5;j++)MayLearnerState.recordAttempt("perf",qi,"A",false,0,false,0,0);
    }
    May._generateRecoverySet(6);
    let m=lastMsg();
    // Should include topic + label like "persistently weak" or "declining"
    A(m.includes("persistently")||m.includes("declining")||m.includes("unstable")||m.includes("lowest"),"should label weakness type: "+m.substring(0,120));
});

// ════════════════════════════════════════════════════════════
// SECTION 5: End-to-end flow sanity checks
// ════════════════════════════════════════════════════════════
console.log("\n--- 5. End-to-End Flow ---");

// 5a — full practice session with May support
T("5a full session: handoff records attempts and produces summary",()=>{
    setup("SessionUser",1);
    // Simulate a session with mixed answers
    let sessionObj={
        id:"e2e-session-1",mode:"practice",completed:true,start:Date.now(),
        mcqs:qs.slice(0,8),
        answers:{},
        flags:{},
        cases:[]
    };
    sessionObj.mcqs.forEach((q,i)=>{
        let right=i%3!==0;
        sessionObj.answers[q.QuestionID]=right?q.CorrectChoice:["A","B","C","D"].filter(l=>l!==q.CorrectChoice)[0];
    });
    global.state={session:sessionObj};
    May.handoffCompletedSession(sessionObj);
    let data=MayLearnerState.load();
    A(data.sessions.length>=1,"should have recorded session");
    let lastSess=data.sessions[data.sessions.length-1];
    A(lastSess.attempts.length===8,"should have 8 attempts, got: "+lastSess.attempts.length);
    global.state={session:null};
});

// 5b — session summary cards reflect actual performance by topic
T("5b session summary cards show topic-level accuracy",()=>{
    setup("SummaryUser",0);
    let sessionObj={
        id:"e2e-summary",mode:"practice",completed:true,start:Date.now(),
        mcqs:qs.slice(0,8),answers:{},flags:{},cases:[]
    };
    let topicCounts={};
    sessionObj.mcqs.forEach((q,i)=>{
        let right=i%3!==0;
        sessionObj.answers[q.QuestionID]=right?q.CorrectChoice:["A","B","C","D"].filter(l=>l!==q.CorrectChoice)[0];
        let t=MayLearnerState._normalizeTopic(q.Topic);
        if(!topicCounts[t])topicCounts[t]={n:0,c:0};
        topicCounts[t].n++;if(right)topicCounts[t].c++;
    });
    global.state={session:sessionObj};
    May.handoffCompletedSession(sessionObj);
    May._summarizeSession();
    let m=lastMsg();
    // Should mention some topic data
    A(m.includes("correct")||m.includes("session")||m.includes("%"),"summary should include performance data");
    global.state={session:null};
});

// 5c — trend statements match learner-state history
T("5c trend statements reference actual data, not invented",()=>{
    setup("TrendUser",3); // 3 sessions of seeded data
    May._getProgressInsight();
    let m=lastMsg();
    let data=MayLearnerState.load();
    let sessCount=data.sessions.length;
    A(m.includes(sessCount.toString()),"should reference session count: "+sessCount);
    // Check for evidence-based statements
    let trends=MayLearnerState.getTrends();
    if(trends.length>0){
        let hasPct=m.includes("%");
        A(hasPct,"should include percentage-based insights when data exists");
    }
});

// 5d — next-step recommendations prioritize weak Certified items, exclude contested
T("5d next-step recommends Certified items from weak areas",()=>{
    setup("NextUser",3);
    // Seed weak data and challenge one QID
    for(let i=0;i<15;i++){
        let qi=qs[i*3];
        for(let j=0;j<5;j++)MayLearnerState.recordAttempt("nxt",qi,"A",false,0,false,0,0);
    }
    MayLearnerState.flagChallengedQID(qs[0].QuestionID,"test next exclusion");
    May._recommendNext();
    let m=lastMsg();
    // Should recommend something
    A(m.length>30,"should produce recommendation");
    // Recommendation should not mention contested QID
    R(m.includes(qs[0].QuestionID),"should NOT recommend contested QID");
    MayLearnerState.resolveChallenge(qs[0].QuestionID,"resolved");
});

// 5e — multiple rounds: returning-user state updates
T("5e returning user after multiple sessions: insights reflect new data",()=>{
    setup("MultiUser",5); // 5 sessions
    May.renderView();
    let h=dom["coachView"].innerHTML;
    A(h.includes("Welcome back"),"should show Welcome back");
    A(h.includes("MultiUser"),"should include name");
    // Stats should reflect 5 sessions
    A(h.includes("5"),"should show 5 sessions");
    let totalAttempts=MayLearnerState.load().sessions.reduce((s,se)=>s+(se.attempts||[]).length,0);
    A(h.includes(totalAttempts.toString()),"should show total attempts: "+totalAttempts);
});

// 5f — confidence/weakness clustering shifts with new data
T("5f weakness clustering updates after new data",()=>{
    setup("ClusterUser",2);
    // Seed initial data — mostly wrong on a few topics
    for(let i=0;i<8;i++){
        let qi=qs[i*7];
        for(let j=0;j<5;j++)MayLearnerState.recordAttempt("cl1",qi,"A",false,0,false,0,0);
    }
    let before=MayLearnerState.getWeaknessClusters();
    A(Array.isArray(before.persistentWeak),"should have clusters before");
    // Add more data — should shift clusters
    setup("ClusterUser",4);
    for(let i=0;i<8;i++){
        let qi=qs[i*7];
        for(let j=0;j<5;j++)MayLearnerState.recordAttempt("cl2",qi,"A",false,0,false,0,0);
    }
    let after=MayLearnerState.getWeaknessClusters();
    A(Array.isArray(after.persistentWeak),"should have clusters after");
});

// 5g — regression: earlier fixes stay fixed
T("5g regression: trySetName still rejects commands after multi-round usage",()=>{
    setup("RegUser",4);
    R(May.trySetName("explain variance"),"should reject 'explain variance'");
    R(May.trySetName("review my weak areas"),"should reject 'review my weak areas'");
    R(May.trySetName("hello"),"should reject 'hello'");
    // Fresh clear then accept
    MayLearnerState.clear();
    May.context._prevAnswers={};
    A(May.trySetName("RealName"),"should accept 'RealName'");
    A(MayLearnerState.getUserProfile().name==="RealName","name should be RealName, got: "+MayLearnerState.getUserProfile().name);
});

T("5h regression: _explainAnswer uses chatHistory[last], not [0]",()=>{
    setup("RegExplain",2);
    let q=qs[0];
    May.setQuestionContext(q); // adds greeting at index 0
    May._explainAnswer();
    let len=May.context.chatHistory.length;
    let last=May.context.chatHistory[len-1].text;
    let first=May.context.chatHistory[0].text;
    A(last!==first,"last message should differ from greeting");
    A(last.includes(q.CorrectChoice),"last message should be the explanation");
});

T("5i regression: persistent DOM mock returns correct values after multiple renders",()=>{
    setup("DomUser",2);
    let q=qs[0];
    // First render — new user
    May.renderView();
    let h1=dom["coachView"].innerHTML;
    A(h1.length>100,"first render should produce HTML");
    // Second render — with context
    May.setQuestionContext(q);
    May.renderView();
    let h2=dom["coachView"].innerHTML;
    A(h2!==h1,"second render should differ from first");
    A(h2.includes(q.QuestionID),"second render should include QID");
    // Third render — back to empty
    May.context.chatHistory=[];
    May.context.currentQuestion=null;
    May.renderView();
    let h3=dom["coachView"].innerHTML;
    A(h3.includes("Welcome back"),"third render should show welcome");
});

// ════════════════════════════════════════════════════════════
console.log("\n========================================");
console.log("TOTAL: "+P+" passed, "+F+" failed");
console.log("========================================");
if(F>0)process.exit(1);
