// S96P — Auditor Phase: Deep Cognitive Audit of Pack C Section EC
// Extracts full text for all Evaluate and Analyze items for manual cognitive classification.
const fs = require('fs');
const src = fs.readFileSync('pack_c_corrected.js', 'utf8');
const fn = new Function(src + '; return MCQ_BANK_C;');
const bank = fn();

const ecItems = bank.filter(q => q.QuestionID && /^P1-EC-\d{3}$/.test(q.QuestionID));
const targetItems = ecItems.filter(q => q.CognitiveLevel === 'Evaluate' || q.CognitiveLevel === 'Analyze');

// S94P quality gates for cognitive classification
// Evaluate = judgment/recommendation across alternatives with tradeoffs
// Analyze = break down information, identify patterns/causes
// Apply = execute procedure/calculation/formula in a scenario
// Understand = explain concept, interpret meaning
// Remember = recall fact/term/definition

console.log(`=== S96P AUDITOR PHASE — Deep Cognitive Audit ===`);
console.log(`Total Evaluate + Analyze items to audit: ${targetItems.length}`);
console.log(`  Evaluate: ${targetItems.filter(q => q.CognitiveLevel === 'Evaluate').length}`);
console.log(`  Analyze: ${targetItems.filter(q => q.CognitiveLevel === 'Analyze').length}`);
console.log('');

const auditResults = [];

targetItems.forEach(q => {
    const stem = (q.Stem || '').substring(0, 300);
    const choices = q.Choices || {};
    const cc = q.CorrectChoice || '';
    const choiceTexts = {};
    for (const [k, v] of Object.entries(choices)) {
        choiceTexts[k] = (v || '').substring(0, 200);
    }
    
    // Extract key decision-type signals from stem
    const stemLower = stem.toLowerCase();
    const signals = {
        hasWhich: /which of the following/i.test(stem),
        hasBest: /\bbest\b/i.test(stem),
        hasMost: /\bmost\b/i.test(stem),
        hasShould: /\bshould\b/i.test(stem),
        hasRecommend: /\brecommend/i.test(stem),
        hasEvaluate: /\bevaluat/i.test(stem) && !/\bevaluating\b/i.test(stem),
        hasAnalyze: /\banaly[sz]/i.test(stem) && !/analysis\b/i.test(stem),
        hasCalculate: /\bcalculat|\bcompute|\bdetermine the amount|\btotal\b/i.test(stem),
        hasDefine: /\bdefined as\b|\brefers to\b|\bis known as\b|\bthe term\b/i.test(stem),
        hasExplain: /\bexplain\b|\bdescribe\b|\bidentify\b/i.test(stem),
        hasCompanyScenario: /\b[A-Z][a-z]+ (?:Corp|Inc|Ltd|LLC|Co\.|Company|Manufactur|Distribut|Industries|Enterprises|Solutions|Medical|Equipment|Machining|Steel|Supply|Distribution)\b/.test(stem),
        hasSpecificContext: /\bCFO\b|\bcontroller\b|\bboard\b|\baudit committee\b|\bCEO\b/i.test(stem),
        hasDecisionTradeoff: /\btrade.off\b|\bwhether\b|\binstead of\b|\brather than\b|\bversus\b|\bwhy.*not\b/i.test(stem),
        isDefinition: /^[A-Z][a-z]+ (?:are|is|refers to|defined as|means|represents)/.test(stem),
    };
    
    auditResults.push({
        QID: q.QuestionID,
        labeled: q.CognitiveLevel,
        state: q.question_state,
        difficulty: q.Difficulty ? `${q.Difficulty}(${q.DifficultyScore})` : '?',
        topic: (q.Topic || '').substring(0, 80),
        stem: stem,
        correctChoice: cc,
        choices: choiceTexts,
        signals: signals,
        upgrade_note: q.upgrade_note || 'NONE'
    });
});

// Print condensed audit per item
auditResults.forEach(a => {
    console.log(`--- ${a.QID} [label:${a.labeled}] [state:${a.state}] [diff:${a.difficulty}] ---`);
    console.log(`Topic: ${a.topic}`);
    console.log(`Stem: ${a.stem}`);
    console.log(`CC: ${a.correctChoice} => ${a.choices[a.correctChoice] || 'N/A'}`);
    
    // Print key signals
    const sigLabels = [];
    if (a.signals.hasBest) sigLabels.push('BEST');
    if (a.signals.hasMost) sigLabels.push('MOST');
    if (a.signals.hasRecommend) sigLabels.push('RECOMMEND');
    if (a.signals.hasDecisionTradeoff) sigLabels.push('TRADEOFF');
    if (a.signals.hasCompanyScenario) sigLabels.push('SCENARIO');
    if (a.signals.hasSpecificContext) sigLabels.push('CONTEXT');
    if (a.signals.hasCalculate) sigLabels.push('CALCULATE');
    if (a.signals.isDefinition) sigLabels.push('DEFINITION');
    if (a.signals.hasDefine) sigLabels.push('HAS_DEFINE');
    if (a.signals.hasEvaluate) sigLabels.push('EVAL_STEM');
    sigLabels.push(`CC_LEN=${(a.choices[a.correctChoice] || '').length}`);
    console.log(`Signals: ${sigLabels.join(' | ')}`);
    
    // Print all choices
    for (const [k, v] of Object.entries(a.choices)) {
        const marker = k === a.correctChoice ? ' [CC]' : '';
        console.log(`  ${k}${marker}: ${v}`);
    }
    console.log('');
});

// Write full audit to JSON
fs.writeFileSync('scripts/output/session96p_deep_audit.json', JSON.stringify(auditResults, null, 2));
console.log(`Full audit written to scripts/output/session96p_deep_audit.json`);
