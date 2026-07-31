/**
 * test_may_context_builder.js — Integration tests for May AI Context Architecture
 * 
 * Validates:
 *   - Feature flag framework loads and defaults to false
 *   - Context builder produces valid structured output
 *   - Coaching router maps actions to modes
 *   - Integration (behind flags) does not alter production behavior
 * 
 * Session: MAY-001
 * Governance: Light Lane (test-only — no pack/case/content impact)
 * 
 * Usage: node scripts/test_may_context_builder.js
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
var mockState = {
  session: {
    id: 'test-session-001',
    mode: 'practice',
    startTime: new Date().toISOString(),
    elapsed: 120000,
    qIndex: 5,
    mcqs: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    mcqsAnswered: 4,
    cases: [],
    casesStarted: 0,
    casesCompleted: 0,
    completed: false,
    submitted: false
  }
};
var mockPackA = [
  {
    QuestionID: 'P1-A-001',
    Part: 1,
    Section: 'A',
    Topic: 'Revenue Recognition',
    Stem: 'Under ASC 606, a performance obligation is satisfied when?',
    Choices: { A: 'Cash is received', B: 'Control transfers', C: 'Contract is signed', D: 'Invoice is sent' },
    CorrectChoice: 'B',
    ExplanationCorrect: 'Under ASC 606, revenue is recognized when control transfers to the customer.',
    ExplanationWrongA: 'Revenue recognition is not based on cash receipt under accrual accounting.',
    ExplanationWrongB: '',
    ExplanationWrongC: 'Contract signing establishes the agreement, not performance satisfaction.',
    ExplanationWrongD: 'Invoicing is an administrative step, not the recognition trigger.',
    question_state: 'Certified',
    Difficulty: 'Moderate',
    DifficultyScore: 3,
    CognitiveLevel: 'Understand'
  }
];

// ── Load modules (shared sandbox for cross-module integration) ─

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
  var code = fs.readFileSync(filePath, 'utf-8');
  try {
    vm.runInContext(code, sharedCtx, { filename: filePath });
  } catch (e) {
    console.log('  PARSE ERROR in ' + filename + ': ' + e.message);
    return null;
  }
  return sharedSandbox.window[exportName] || sharedSandbox.module.exports;
}

console.log('=== MAY-001 INTEGRATION TESTS ===\n');

// ── Test 1: Feature flags load and default to false ───────────

console.log('--- Feature Flags ---');

var MayFeatureFlags = loadModuleShared('may-feature-flags.js', 'MayFeatureFlags');
assert(MayFeatureFlags !== null, 'may-feature-flags.js loads without error');
assert(typeof MayFeatureFlags.isEnabled === 'function', 'MayFeatureFlags.isEnabled exists');
assert(typeof MayFeatureFlags.setFlag === 'function', 'MayFeatureFlags.setFlag exists');
assert(typeof MayFeatureFlags.getAll === 'function', 'MayFeatureFlags.getAll exists');
assert(typeof MayFeatureFlags.snapshot === 'function', 'MayFeatureFlags.snapshot exists');

assert(MayFeatureFlags.isEnabled('ENABLE_CONTEXT_BUILDER') === false, 'ENABLE_CONTEXT_BUILDER defaults to false');
assert(MayFeatureFlags.isEnabled('ENABLE_COACHING_ROUTER') === false, 'ENABLE_COACHING_ROUTER defaults to false');
assert(MayFeatureFlags.isEnabled('ENABLE_LLM') === false, 'ENABLE_LLM defaults to false');
assert(MayFeatureFlags.isEnabled('ENABLE_LLM_COACHING') === false, 'ENABLE_LLM_COACHING defaults to false');
assert(MayFeatureFlags.isEnabled('ENABLE_LLM_SUMMARIES') === false, 'ENABLE_LLM_SUMMARIES defaults to false');
assert(MayFeatureFlags.isEnabled('NONEXISTENT_FLAG') === false, 'unknown flags return false');

// Test set/get
MayFeatureFlags.setFlag('ENABLE_CONTEXT_BUILDER', true);
assert(MayFeatureFlags.isEnabled('ENABLE_CONTEXT_BUILDER') === true, 'setFlag enables a flag');
MayFeatureFlags.setFlag('ENABLE_CONTEXT_BUILDER', false);
assert(MayFeatureFlags.isEnabled('ENABLE_CONTEXT_BUILDER') === false, 'setFlag disables a flag');

// Test change log
MayFeatureFlags.setFlag('ENABLE_LLM', true);
var log = MayFeatureFlags.getChangeLog();
assert(log.length >= 3, 'change log records flag toggles');
MayFeatureFlags.setFlag('ENABLE_LLM', false);

// Test snapshot
var snap = MayFeatureFlags.snapshot();
assert(typeof snap.flags === 'object', 'snapshot includes flags');
assert(typeof snap.timestamp === 'string', 'snapshot includes timestamp');

// Test getAll
var all = MayFeatureFlags.getAll();
var flagCount = Object.keys(all).length;
assert(flagCount >= 5, 'getAll returns all flags (got ' + flagCount + ')');

// ── Test 2: Context builder produces valid output ─────────────

console.log('\n--- Context Builder ---');

// Set up window globals needed by context builder
mockWindow.packA = mockPackA;
mockWindow.state = mockState;

var MayContextBuilder = loadModuleShared('may-context-builder.js', 'MayContextBuilder');
assert(MayContextBuilder !== null, 'may-context-builder.js loads without error');

var ctx = MayContextBuilder.buildFullContext('P1-A-001');
assert(ctx !== null, 'buildFullContext returns non-null');
assert(ctx.question !== null, 'question context is populated');
assert(ctx.question.questionId === 'P1-A-001', 'questionId matches');
assert(ctx.question.pack === 'A', 'pack inferred correctly');
assert(ctx.question.section === 'A', 'section matches');
assert(ctx.question.sectionName === 'External Financial Reporting Decisions', 'section name resolved');
assert(ctx.question.cognitiveLevel === 'Understand', 'cognitive level present');
assert(ctx.question.difficulty === 'Moderate', 'difficulty present');
assert(ctx.question.correctChoice === 'B', 'correctChoice matches');
assert(typeof ctx.question.choices === 'object', 'choices is object');
assert(ctx.question.choices.A === 'Cash is received', 'Choice A text present');
assert(ctx.question.choices.B === 'Control transfers', 'Choice B text present');
assert(ctx.question.questionState === 'Certified', 'questionState present');
assert(ctx.question.explanationCorrect.length > 10, 'explanationCorrect is substantive');
assert(ctx.question.isCaseItem === false, 'isCaseItem false for MCQ');
assert(ctx.question.caseContext === null, 'caseContext null for MCQ');

assert(ctx.learner !== null, 'learner context populated');
assert(typeof ctx.learner.overallAccuracy === 'number', 'learner accuracy is number');
assert(Array.isArray(ctx.learner.weaknessClusters), 'weaknessClusters is array');

assert(ctx.session !== null, 'session context populated');
assert(ctx.session.mode === 'practice', 'session mode correct');

assert(ctx.app !== null, 'app context populated');
assert(typeof ctx.app.screenWidth === 'number', 'screenWidth present');

assert(typeof ctx.timestamp === 'string', 'timestamp present');

// Test null QID
var nctx = MayContextBuilder.buildFullContext(null);
assert(nctx !== null, 'buildFullContext(null) returns non-null');
assert(nctx.question === null, 'question is null for null QID');

// ── Test 3: Coaching router maps actions to modes ─────────────

console.log('\n--- Coaching Router ---');

var MayCoachingRouter = loadModuleShared('may-coaching-router.js', 'MayCoachingRouter');
assert(MayCoachingRouter !== null, 'may-coaching-router.js loads without error');

assert(typeof MayCoachingRouter.MODE === 'object', 'MODE enum exists');
assert(MayCoachingRouter.MODE.EXPLAIN === 'EXPLAIN', 'EXPLAIN mode defined');
assert(MayCoachingRouter.MODE.QUIZ === 'QUIZ', 'QUIZ mode defined');
assert(MayCoachingRouter.MODE.SOCRATIC === 'SOCRATIC', 'SOCRATIC mode defined');
assert(MayCoachingRouter.MODE.MOTIVATE === 'MOTIVATE', 'MOTIVATE mode defined');
assert(MayCoachingRouter.MODE.STUDY_PLAN === 'STUDY_PLAN', 'STUDY_PLAN mode defined');
assert(MayCoachingRouter.MODE.EXAM_REVIEW === 'EXAM_REVIEW', 'EXAM_REVIEW mode defined');

// Test route() without context
var r1 = MayCoachingRouter.route(null, 'explain');
assert(r1.mode === 'EXPLAIN', 'route(explain) → EXPLAIN');
assert(r1.confidence === 1.0, 'direct mapping confidence is 1.0');

var r2 = MayCoachingRouter.route(null, 'hint');
assert(r2.mode === 'SOCRATIC', 'route(hint) → SOCRATIC');

var r3 = MayCoachingRouter.route(null, 'progress');
assert(r3.mode === 'STUDY_PLAN', 'route(progress) → STUDY_PLAN');

var r4 = MayCoachingRouter.route(null, 'similar');
assert(r4.mode === 'QUIZ', 'route(similar) → QUIZ');

var r5 = MayCoachingRouter.route(null, 'unknown-action');
assert(r5.mode === 'EXPLAIN', 'route(unknown) → EXPLAIN (default)');

// Test route() with context
var r6 = MayCoachingRouter.route(ctx, 'explain');
assert(r6.mode !== undefined, 'route with context returns mode');
assert(typeof r6.confidence === 'number', 'route with context has confidence');

// Test enrichContext with flags off
var enriched = MayCoachingRouter.enrichContext(ctx, 'explain');
assert(enriched.routing === null, 'enrichContext returns null routing when flags off');

// Test enrichContext with flags on
MayFeatureFlags.setFlag('ENABLE_COACHING_ROUTER', true);
var enriched2 = MayCoachingRouter.enrichContext(ctx, 'explain');
assert(enriched2.routing !== null, 'enrichContext returns routing when flags on');
assert(enriched2.routing.mode === 'EXPLAIN', 'routing mode correct when flags on');
MayFeatureFlags.setFlag('ENABLE_COACHING_ROUTER', false);

// Test all 15 actions have mode mappings
var actions = ['explain', 'wrong-choices', 'hint', 'simplify', 'similar', 'progress',
  'weakness', 'summary', 'next', 'mymistake', 'recovery', 'digest', 'strategy',
  'effectiveness', 'chat'];
var allMapped = true;
for (var i = 0; i < actions.length; i++) {
  if (!MayCoachingRouter.ACTION_MODE_MAP[actions[i]]) {
    allMapped = false;
    console.log('    MISSING: ' + actions[i]);
  }
}
assert(allMapped, 'all 15 actions have mode mappings');

// ── Verdict ───────────────────────────────────────────────────

console.log('\n=== VERDICT ===');
console.log('  ' + passes + ' passed, ' + failures + ' failed');
console.log(failures === 0 ? 'PASS — all integration tests passed' : 'FAIL — ' + failures + ' test(s) failed');

process.exit(failures === 0 ? 0 : 1);
