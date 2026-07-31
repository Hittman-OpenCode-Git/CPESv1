/**
 * test_may_coaching_modes.js — Integration tests for MAY-002 Coaching Modes
 * 
 * Validates:
 *   - Mode handler files load without errors
 *   - Each handler returns fallback when feature flag is disabled
 *   - Each handler returns valid CoachingResponse when flag is enabled
 *   - MayCoachingModeBase auto-registration and dispatch
 *   - MayCoachingRouter mode contracts for all 6 modes
 *   - MayCoachingRouter.dispatchToHandler integration
 *   - Fallback path (handler failure never interrupts)
 *   - Feature flag coverage (all 4 new flags verified)
 *   - Backward compatibility (existing router tests still pass)
 * 
 * Session: MAY-002
 * Governance: Light Lane (test-only — no pack/case/content impact)
 * 
 * Usage: node scripts/test_may_coaching_modes.js
 * Exit:   0 if all tests pass, 1 otherwise
 */

var fs = require('fs');
var path = require('path');
var vm = require('vm');

var ROOT = path.resolve(__dirname, '..');
var failures = 0;
var passes = 0;

function fail(label) {
  console.log('  FAIL: ' + label);
  failures++;
}

function pass(label) {
  console.log('  PASS: ' + label);
  passes++;
}

function assert(condition, label) {
  if (condition) pass(label);
  else fail(label);
}

// ── Mock browser environment ──────────────────────────────────

var mockWindow = {
  innerWidth: 1280,
  localStorage: {},
  document: {
    getElementById: function() { return null; },
    createElement: function() { return { style: {}, classList: { add: function() {} } }; },
    querySelector: function() { return null; }
  },
  location: { href: 'http://localhost/' }
};

var mockQuestion = {
  QuestionID: 'P1-A-010',
  Part: 1,
  Section: 'A',
  Topic: 'Revenue Recognition',
  Subtopic: 'Performance obligations',
  Stem: 'Under ASC 606, a performance obligation is satisfied when?',
  Choices: { A: 'Cash is received', B: 'Control transfers', C: 'Contract is signed', D: 'Invoice is sent' },
  CorrectChoice: 'B',
  ExplanationCorrect: 'Under ASC 606, revenue is recognized when control transfers to the customer. ASC 606-10-25-23 provides the criteria for transfer of control.',
  ExplanationWrongA: 'Revenue recognition is not based on cash receipt under accrual accounting.',
  ExplanationWrongB: '',
  ExplanationWrongC: 'Contract signing establishes the agreement, not performance satisfaction.',
  ExplanationWrongD: 'Invoicing is an administrative step, not the recognition trigger.',
  question_state: 'Certified',
  Difficulty: 'Moderate',
  DifficultyScore: 3,
  CognitiveLevel: 'Understand',
  FormulaReference: null,
  LOSTag: 'A.1.a'
};

var mockPackA = [mockQuestion];

var mockState = {
  session: {
    id: 'test-session-002',
    mode: 'practice',
    startTime: new Date().toISOString(),
    elapsed: 300000,
    qIndex: 3,
    mcqs: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    mcqsAnswered: 5,
    cases: [],
    casesStarted: 0,
    casesCompleted: 0,
    completed: false,
    submitted: false
  }
};

// ── Load modules in shared sandbox ────────────────────────────

var sharedSandbox = {
  window: mockWindow,
  console: console,
  process: { env: {} },
  module: { exports: {} },
  require: require
};
var sharedCtx = vm.createContext(sharedSandbox);

function loadModuleShared(filename, exportName) {
  var filePath = path.join(ROOT, filename);
  var code;
  try {
    code = fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    console.log('  FILE NOT FOUND: ' + filename + ' (' + e.message + ')');
    return null;
  }
  try {
    vm.runInContext(code, sharedCtx, { filename: filePath });
  } catch (e) {
    console.log('  PARSE ERROR in ' + filename + ': ' + e.message);
    return null;
  }
  return sharedSandbox.window[exportName] || sharedSandbox.module.exports;
}

function loadModuleNew(filename, exportName) {
  var sandbox = vm.createContext({
    window: mockWindow,
    console: console,
    process: { env: {} },
    module: { exports: {} },
    require: require
  });
  var filePath = path.join(ROOT, filename);
  var code = fs.readFileSync(filePath, 'utf-8');
  try {
    vm.runInContext(code, sandbox, { filename: filePath });
  } catch (e) {
    console.log('  PARSE ERROR in ' + filename + ': ' + e.message);
    return null;
  }
  return sandbox.window[exportName] || sandbox.module.exports;
}

console.log('=== MAY-002 COACHING MODES INTEGRATION TESTS ===\n');

// ── Load core infrastructure ─────────────────────────────────

console.log('--- Module Loading ---');

var MayFeatureFlags = loadModuleShared('may-feature-flags.js', 'MayFeatureFlags');
assert(MayFeatureFlags !== null, 'may-feature-flags.js loads');

// Set up window globals for context builder
mockWindow.packA = mockPackA;
mockWindow.state = mockState;

var MayContextBuilder = loadModuleShared('may-context-builder.js', 'MayContextBuilder');
assert(MayContextBuilder !== null, 'may-context-builder.js loads');

var MayCoachingRouter = loadModuleShared('may-coaching-router.js', 'MayCoachingRouter');
assert(MayCoachingRouter !== null, 'may-coaching-router.js loads');

// Load mode handlers
var ModeBase = loadModuleShared('may-coaching-modes/mode-base.js', 'MayCoachingModeBase');
assert(ModeBase !== null, 'mode-base.js loads');

var ModeExplain = loadModuleShared('may-coaching-modes/mode-explain.js', 'MayCoachingModeExplain');
assert(ModeExplain !== null, 'mode-explain.js loads');

var ModeQuiz = loadModuleShared('may-coaching-modes/mode-quiz.js', 'MayCoachingModeQuiz');
assert(ModeQuiz !== null, 'mode-quiz.js loads');

var ModeSocratic = loadModuleShared('may-coaching-modes/mode-socratic.js', 'MayCoachingModeSocratic');
assert(ModeSocratic !== null, 'mode-socratic.js loads');

var ModeMotivate = loadModuleShared('may-coaching-modes/mode-motivate.js', 'MayCoachingModeMotivate');
assert(ModeMotivate !== null, 'mode-motivate.js loads');

var ModeStudyPlan = loadModuleShared('may-coaching-modes/mode-study-plan.js', 'MayCoachingModeStudyPlan');
assert(ModeStudyPlan !== null, 'mode-study-plan.js loads');

var ModeExamReview = loadModuleShared('may-coaching-modes/mode-exam-review.js', 'MayCoachingModeExamReview');
assert(ModeExamReview !== null, 'mode-exam-review.js loads');

// Build test context
var testCtx = MayContextBuilder.buildFullContext('P1-A-010');
assert(testCtx !== null, 'test context built');

var testRouting = MayCoachingRouter.route(testCtx, 'explain');
assert(testRouting.mode === 'EXPLAIN', 'test routing defaults to EXPLAIN');

// ── Feature Flag Coverage Tests ──────────────────────────────

console.log('\n--- Feature Flag Coverage (4 new flags) ---');

// Verify all 4 new flags exist and default to false
assert(MayFeatureFlags.isEnabled('ENABLE_EXPLAIN_MODE') === false, 'ENABLE_EXPLAIN_MODE defaults to false');
assert(MayFeatureFlags.isEnabled('ENABLE_QUIZ_MODE') === false, 'ENABLE_QUIZ_MODE defaults to false');
assert(MayFeatureFlags.isEnabled('ENABLE_SOCRATIC_MODE') === false, 'ENABLE_SOCRATIC_MODE defaults to false');
assert(MayFeatureFlags.isEnabled('ENABLE_STUDY_PLAN_MODE') === false, 'ENABLE_STUDY_PLAN_MODE defaults to false');

// Verify flag get/set
MayFeatureFlags.setFlag('ENABLE_EXPLAIN_MODE', true);
assert(MayFeatureFlags.isEnabled('ENABLE_EXPLAIN_MODE') === true, 'ENABLE_EXPLAIN_MODE can be enabled');
MayFeatureFlags.setFlag('ENABLE_EXPLAIN_MODE', false);
assert(MayFeatureFlags.isEnabled('ENABLE_EXPLAIN_MODE') === false, 'ENABLE_EXPLAIN_MODE can be disabled');

// Verify flag count includes new flags
var allFlags = MayFeatureFlags.getAll();
var flagCount = Object.keys(allFlags).length;
assert(flagCount >= 9, 'getAll returns adequate flags (got ' + flagCount + ', expected >= 9)');

// ── Mode Handler Fallback Tests (flags off) ──────────────────

console.log('\n--- Mode Handler Fallback (flags disabled) ---');

function verifyFallback(result, modeName) {
  assert(result !== null && result !== undefined, modeName + ': handler returns result');
  assert(result.fallback === true, modeName + ': fallback is true');
  assert(result.mode === modeName, modeName + ': mode name correct');
}

var rExpl = ModeExplain.handle(testCtx, testRouting);
verifyFallback(rExpl, 'EXPLAIN');

var rQuiz = ModeQuiz.handle(testCtx, testRouting);
verifyFallback(rQuiz, 'QUIZ');

var rSoc = ModeSocratic.handle(testCtx, testRouting);
verifyFallback(rSoc, 'SOCRATIC');

var rMot = ModeMotivate.handle(testCtx, testRouting);
verifyFallback(rMot, 'MOTIVATE');

var rSP = ModeStudyPlan.handle(testCtx, testRouting);
verifyFallback(rSP, 'STUDY_PLAN');

var rER = ModeExamReview.handle(testCtx, testRouting);
verifyFallback(rER, 'EXAM_REVIEW');

// ── Mode Handler Active Tests (flags on) ─────────────────────

console.log('\n--- Mode Handler Active (flags enabled) ---');

function verifyActiveResponse(result, modeName) {
  assert(result !== null && result !== undefined, modeName + ': handler returns result');
  assert(result.fallback === false, modeName + ': fallback is false');
  assert(result.mode === modeName, modeName + ': mode matches');
  assert(typeof result.guidance === 'object', modeName + ': guidance is object');
  assert(typeof result.confidence === 'number', modeName + ': confidence is number');
  assert(result.confidence >= 0 && result.confidence <= 1, modeName + ': confidence in [0,1]');
  assert(Array.isArray(result.contextUsed), modeName + ': contextUsed is array');
  assert(result.contextUsed.length >= 1, modeName + ': contextUsed has entries');
}

// Enable each flag and test

// EXPLAIN
MayFeatureFlags.setFlag('ENABLE_EXPLAIN_MODE', true);
var rExplOn = ModeExplain.handle(testCtx, testRouting);
verifyActiveResponse(rExplOn, 'EXPLAIN');
assert(rExplOn.guidance.focus !== undefined, 'EXPLAIN: guidance.focus present');
assert(rExplOn.guidance.principle !== undefined, 'EXPLAIN: guidance.principle present');
assert(rExplOn.guidance.approach !== undefined, 'EXPLAIN: guidance.approach present');
assert(rExplOn.guidance.principle.length > 0, 'EXPLAIN: principle is non-empty');
assert(rExplOn.confidence >= 0.8, 'EXPLAIN: confidence >= 0.8');
MayFeatureFlags.setFlag('ENABLE_EXPLAIN_MODE', false);

// QUIZ
MayFeatureFlags.setFlag('ENABLE_QUIZ_MODE', true);
var rQuizOn = ModeQuiz.handle(testCtx, testRouting);
verifyActiveResponse(rQuizOn, 'QUIZ');
assert(rQuizOn.guidance.type !== undefined, 'QUIZ: guidance.type present');
assert(typeof rQuizOn.guidance.type === 'string', 'QUIZ: guidance.type is string');
assert(Array.isArray(rQuizOn.guidance.focusDomains), 'QUIZ: focusDomains is array');
assert(typeof rQuizOn.guidance.recommendedCount === 'number', 'QUIZ: recommendedCount is number');
MayFeatureFlags.setFlag('ENABLE_QUIZ_MODE', false);

// SOCRATIC
MayFeatureFlags.setFlag('ENABLE_SOCRATIC_MODE', true);
var rSocOn = ModeSocratic.handle(testCtx, testRouting);
verifyActiveResponse(rSocOn, 'SOCRATIC');
assert(rSocOn.guidance.hintLevel !== undefined, 'SOCRATIC: hintLevel present');
assert(typeof rSocOn.guidance.hintLevel === 'number', 'SOCRATIC: hintLevel is number');
assert(rSocOn.guidance.hintLevel >= 1 && rSocOn.guidance.hintLevel <= 3, 'SOCRATIC: hintLevel in [1,3]');
assert(Array.isArray(rSocOn.guidance.questionChain), 'SOCRATIC: questionChain is array');
assert(rSocOn.guidance.questionChain.length >= 2, 'SOCRATIC: questionChain has >= 2 entries');
assert(typeof rSocOn.guidance.startingPrompt === 'string', 'SOCRATIC: startingPrompt is string');
MayFeatureFlags.setFlag('ENABLE_SOCRATIC_MODE', false);

// STUDY_PLAN
MayFeatureFlags.setFlag('ENABLE_STUDY_PLAN_MODE', true);
var rSPOn = ModeStudyPlan.handle(testCtx, testRouting);
verifyActiveResponse(rSPOn, 'STUDY_PLAN');
assert(Array.isArray(rSPOn.guidance.focusAreas), 'STUDY_PLAN: focusAreas is array');
assert(Array.isArray(rSPOn.guidance.recommendedActions), 'STUDY_PLAN: recommendedActions is array');
assert(rSPOn.guidance.recommendedActions.length >= 1, 'STUDY_PLAN: recommendedActions has entries');
assert(typeof rSPOn.guidance.estimatedMinutes === 'number', 'STUDY_PLAN: estimatedMinutes is number');
MayFeatureFlags.setFlag('ENABLE_STUDY_PLAN_MODE', false);

// ── MayCoachingModeBase Tests ─────────────────────────────────

console.log('\n--- MayCoachingModeBase (registry & dispatch) ---');

// Test registerMode
assert(typeof ModeBase.registerMode === 'function', 'registerMode is function');
assert(typeof ModeBase.dispatch === 'function', 'dispatch is function');
assert(typeof ModeBase.getHandler === 'function', 'getHandler is function');
assert(typeof ModeBase.getRegisteredModes === 'function', 'getRegisteredModes is function');
assert(typeof ModeBase.autoRegister === 'function', 'autoRegister is function');
assert(typeof ModeBase.validateResponse === 'function', 'validateResponse is function');

// Test registration rejects invalid handlers
assert(ModeBase.registerMode('TEST_MODE', null) === false, 'registerMode rejects null handler');
assert(ModeBase.registerMode('TEST_MODE', {}) === false, 'registerMode rejects handler without handle');
assert(ModeBase.registerMode('', ModeExplain) === false, 'registerMode rejects empty mode name');

// Register all modes and dispatch
assert(ModeBase.registerMode('EXPLAIN', ModeExplain) === true, 'registerMode(EXPLAIN) succeeds');
assert(ModeBase.registerMode('QUIZ', ModeQuiz) === true, 'registerMode(QUIZ) succeeds');
assert(ModeBase.registerMode('SOCRATIC', ModeSocratic) === true, 'registerMode(SOCRATIC) succeeds');
assert(ModeBase.registerMode('MOTIVATE', ModeMotivate) === true, 'registerMode(MOTIVATE) succeeds');
assert(ModeBase.registerMode('STUDY_PLAN', ModeStudyPlan) === true, 'registerMode(STUDY_PLAN) succeeds');
assert(ModeBase.registerMode('EXAM_REVIEW', ModeExamReview) === true, 'registerMode(EXAM_REVIEW) succeeds');

// Duplicate registration blocked
assert(ModeBase.registerMode('EXPLAIN', ModeExplain) === false, 'registerMode blocks duplicate EXPLAIN');

// getRegisteredModes
var registered = ModeBase.getRegisteredModes();
assert(registered.length === 6, 'getRegisteredModes returns 6 modes');
assert(registered.indexOf('EXPLAIN') !== -1, 'EXPLAIN in registered modes');
assert(registered.indexOf('QUIZ') !== -1, 'QUIZ in registered modes');
assert(registered.indexOf('SOCRATIC') !== -1, 'SOCRATIC in registered modes');
assert(registered.indexOf('MOTIVATE') !== -1, 'MOTIVATE in registered modes');
assert(registered.indexOf('STUDY_PLAN') !== -1, 'STUDY_PLAN in registered modes');
assert(registered.indexOf('EXAM_REVIEW') !== -1, 'EXAM_REVIEW in registered modes');

// getHandler
var hExplain = ModeBase.getHandler('EXPLAIN');
assert(hExplain !== null, 'getHandler(EXPLAIN) returns handler');
assert(typeof hExplain.handle === 'function', 'EXPLAIN handler has handle function');
assert(ModeBase.getHandler('NONEXISTENT') === null, 'getHandler(NONEXISTENT) returns null');

// dispatch with flags off (should return null)
var dispResult1 = ModeBase.dispatch(testCtx, testRouting);
assert(dispResult1 === null, 'dispatch returns null when flags disabled');

// dispatch with flags on
MayFeatureFlags.setFlag('ENABLE_EXPLAIN_MODE', true);
var dispResult2 = ModeBase.dispatch(testCtx, testRouting);
assert(dispResult2 !== null, 'dispatch returns result when EXPLAIN mode enabled');
assert(dispResult2.mode === 'EXPLAIN', 'dispatch mode matches');
assert(dispResult2.fallback === false, 'dispatch result is not fallback');
MayFeatureFlags.setFlag('ENABLE_EXPLAIN_MODE', false);

// dispatch with null routing
assert(ModeBase.dispatch(testCtx, null) === null, 'dispatch(null routing) returns null');

// dispatch with empty routing
assert(ModeBase.dispatch(testCtx, {}) === null, 'dispatch({}) returns null');

// dispatch with unknown mode (should return null safely)
assert(ModeBase.dispatch(testCtx, { mode: 'NONEXISTENT_MODE' }) === null, 'dispatch(unknown mode) returns null');

// ── validateResponse ─────────────────────────────────────────

var validResp = {
  mode: 'EXPLAIN',
  fallback: false,
  guidance: { focus: 'test' },
  confidence: 0.9,
  contextUsed: ['question.stem']
};
var valCheck = ModeBase.validateResponse(validResp);
assert(valCheck.valid === true, 'validateResponse passes valid response');

var invalidResp1 = { mode: 'EXPLAIN' }; // missing guidance, confidence, contextUsed
var valCheck2 = ModeBase.validateResponse(invalidResp1);
assert(valCheck2.valid === false, 'validateResponse fails invalid response');

var fallbackResp = { fallback: true, mode: 'EXPLAIN' };
var valCheck3 = ModeBase.validateResponse(fallbackResp);
assert(valCheck3.valid === true, 'validateResponse passes fallback response');

assert(ModeBase.validateResponse(null).valid === false, 'validateResponse fails null');

// ── MayCoachingRouter Mode Contracts ─────────────────────────

console.log('\n--- MayCoachingRouter Mode Contracts ---');

assert(typeof MayCoachingRouter.getModeContract === 'function', 'getModeContract is function');
assert(typeof MayCoachingRouter.getAllModeContracts === 'function', 'getAllModeContracts is function');
assert(typeof MayCoachingRouter.dispatchToHandler === 'function', 'dispatchToHandler is function');

// Check all 6 mode contracts
var expectedModes = ['EXPLAIN', 'QUIZ', 'SOCRATIC', 'MOTIVATE', 'STUDY_PLAN', 'EXAM_REVIEW'];
for (var m = 0; m < expectedModes.length; m++) {
  var mc = MayCoachingRouter.getModeContract(expectedModes[m]);
  assert(mc !== null, expectedModes[m] + ': contract exists');
  assert(mc.name === expectedModes[m], expectedModes[m] + ': contract.name matches');
  assert(typeof mc.purpose === 'string', expectedModes[m] + ': purpose is string');
  assert(mc.purpose.length > 10, expectedModes[m] + ': purpose is substantive');
  assert(Array.isArray(mc.triggerActions), expectedModes[m] + ': triggerActions is array');
  assert(Array.isArray(mc.requiredContext), expectedModes[m] + ': requiredContext is array');
  assert(mc.requiredContext.length >= 1, expectedModes[m] + ': requiredContext has entries');
  assert(typeof mc.outputGuidanceType === 'string', expectedModes[m] + ': outputGuidanceType is string');
  assert(typeof mc.fallbackBehavior === 'string', expectedModes[m] + ': fallbackBehavior is string');
  assert(mc.fallbackBehavior.length > 10, expectedModes[m] + ': fallbackBehavior is substantive');
}

// Verify feature flags on contracts
var explainContract = MayCoachingRouter.getModeContract('EXPLAIN');
assert(explainContract.featureFlag === 'ENABLE_EXPLAIN_MODE', 'EXPLAIN contract maps to ENABLE_EXPLAIN_MODE');

var quizContract = MayCoachingRouter.getModeContract('QUIZ');
assert(quizContract.featureFlag === 'ENABLE_QUIZ_MODE', 'QUIZ contract maps to ENABLE_QUIZ_MODE');

var socraticContract = MayCoachingRouter.getModeContract('SOCRATIC');
assert(socraticContract.featureFlag === 'ENABLE_SOCRATIC_MODE', 'SOCRATIC contract maps to ENABLE_SOCRATIC_MODE');

var spContract = MayCoachingRouter.getModeContract('STUDY_PLAN');
assert(spContract.featureFlag === 'ENABLE_STUDY_PLAN_MODE', 'STUDY_PLAN contract maps to ENABLE_STUDY_PLAN_MODE');

// MOTIVATE and EXAM_REVIEW have null feature flags (not yet registered)
var motContract = MayCoachingRouter.getModeContract('MOTIVATE');
assert(motContract.featureFlag === null, 'MOTIVATE contract has null feature flag');

var erContract = MayCoachingRouter.getModeContract('EXAM_REVIEW');
assert(erContract.featureFlag === null, 'EXAM_REVIEW contract has null feature flag');

// getAllModeContracts
var allContracts = MayCoachingRouter.getAllModeContracts();
var contractCount = Object.keys(allContracts).length;
assert(contractCount === 6, 'getAllModeContracts returns 6 contracts');

// Unknown mode contract
assert(MayCoachingRouter.getModeContract('NONEXISTENT') === null, 'getModeContract(unknown) returns null');

// ── dispatchToHandler integration ────────────────────────────

console.log('\n--- dispatchToHandler Integration ---');

// With flags off
var dh1 = MayCoachingRouter.dispatchToHandler(testCtx, testRouting);
assert(dh1 === null, 'dispatchToHandler returns null when flags off');

// With EXPLAIN mode on (handler registered)
MayFeatureFlags.setFlag('ENABLE_EXPLAIN_MODE', true);
var dh2 = MayCoachingRouter.dispatchToHandler(testCtx, testRouting);
assert(dh2 !== null, 'dispatchToHandler returns result when EXPLAIN enabled');
assert(dh2.mode === 'EXPLAIN', 'dispatchToHandler mode matches');
assert(dh2.fallback === false, 'dispatchToHandler result is active');
MayFeatureFlags.setFlag('ENABLE_EXPLAIN_MODE', false);

// With null routing
assert(MayCoachingRouter.dispatchToHandler(testCtx, null) === null, 'dispatchToHandler(null routing) returns null');

// With unknown mode
assert(MayCoachingRouter.dispatchToHandler(testCtx, { mode: 'UNKNOWN' }) === null, 'dispatchToHandler(unknown mode) returns null');

// ── Fallback Path Tests ──────────────────────────────────────

console.log('\n--- Fallback Paths (failure never interrupts) ---');

// Handler with null context still returns fallback
var rNull = ModeExplain.handle(null, testRouting);
assert(rNull !== null, 'handler(null context) returns non-null');
assert(rNull.fallback === true, 'handler(null context) returns fallback');

// Handler with null routing
var rNullR = ModeExplain.handle(testCtx, null);
assert(rNullR !== null, 'handler(null routing) returns non-null');
assert(rNullR.fallback === true, 'handler(null routing) returns fallback');

// Handler with empty context
var rEmpty = ModeExplain.handle({ question: null }, testRouting);
assert(rEmpty !== null, 'handler(no question) returns non-null');
assert(rEmpty.fallback === true, 'handler(no question) returns fallback');

// dispatch with null context
assert(ModeBase.dispatch(null, testRouting) === null, 'dispatch(null context) returns null safely');

// ── Backward Compatibility Tests ─────────────────────────────

console.log('\n--- Backward Compatibility ---');

// Original router methods intact
assert(typeof MayCoachingRouter.route === 'function', 'route exists');
assert(typeof MayCoachingRouter.enrichContext === 'function', 'enrichContext exists');
assert(MayCoachingRouter.MODE.EXPLAIN === 'EXPLAIN', 'MODE.EXPLAIN unchanged');
assert(MayCoachingRouter.MODE.QUIZ === 'QUIZ', 'MODE.QUIZ unchanged');
assert(MayCoachingRouter.MODE.SOCRATIC === 'SOCRATIC', 'MODE.SOCRATIC unchanged');
assert(MayCoachingRouter.MODE.MOTIVATE === 'MOTIVATE', 'MODE.MOTIVATE unchanged');
assert(MayCoachingRouter.MODE.STUDY_PLAN === 'STUDY_PLAN', 'MODE.STUDY_PLAN unchanged');
assert(MayCoachingRouter.MODE.EXAM_REVIEW === 'EXAM_REVIEW', 'MODE.EXAM_REVIEW unchanged');

// route() behavior unchanged
var rOrig = MayCoachingRouter.route(null, 'explain');
assert(rOrig.mode === 'EXPLAIN', 'route(explain) unchanged → EXPLAIN');
assert(rOrig.confidence === 1.0, 'route confidence unchanged');

var rOrig2 = MayCoachingRouter.route(null, 'hint');
assert(rOrig2.mode === 'SOCRATIC', 'route(hint) unchanged → SOCRATIC');

// enrichContext with flags off returns null routing
var ecOff = MayCoachingRouter.enrichContext(testCtx, 'explain');
assert(ecOff.routing === null, 'enrichContext returns null routing when flags off');

// enrichContext with flags on returns routing
MayFeatureFlags.setFlag('ENABLE_COACHING_ROUTER', true);
var ecOn = MayCoachingRouter.enrichContext(testCtx, 'explain');
assert(ecOn.routing !== null, 'enrichContext returns routing when flags on');
assert(ecOn.routing.mode === 'EXPLAIN', 'enrichContext routing mode correct');
MayFeatureFlags.setFlag('ENABLE_COACHING_ROUTER', false);

// All 15 original action mappings still present
var actions = ['explain', 'wrong-choices', 'hint', 'simplify', 'similar', 'progress',
  'weakness', 'summary', 'next', 'mymistake', 'recovery', 'digest', 'strategy',
  'effectiveness', 'chat'];
var allMapped = true;
for (var i = 0; i < actions.length; i++) {
  if (!MayCoachingRouter.ACTION_MODE_MAP[actions[i]]) {
    allMapped = false;
    console.log('    MISSING ACTION: ' + actions[i]);
  }
}
assert(allMapped, 'all 15 actions still have mode mappings');

// ── Verdict ───────────────────────────────────────────────────

console.log('\n=== VERDICT ===');
console.log('  ' + passes + ' passed, ' + failures + ' failed');
console.log(failures === 0 ? 'PASS — all MAY-002 integration tests passed' : 'FAIL — ' + failures + ' test(s) failed');

process.exit(failures === 0 ? 0 : 1);
