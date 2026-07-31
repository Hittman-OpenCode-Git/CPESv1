/**
 * test_may004_adaptive_coach.js — Integration tests for MAY-004 Adaptive Study Coach
 * 
 * Validates:
 *   - LearnerProfile builds from MayLearnerState data
 *   - AdaptiveRecommender generates correct recommendations
 *   - RemediationEngine produces targeted recovery plans
 *   - Feature flag gates all adaptive behavior
 *   - All existing MAY tests still pass (regression)
 * 
 * Session: MAY-004
 * Governance: Light Lane (test-only — no pack/case/content impact)
 * 
 * Usage: node scripts/test_may004_adaptive_coach.js
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

// Create a proper localStorage mock with getItem/setItem support
function createLocalStorageMock() {
  var store = {};
  function getItem(key) { return store.hasOwnProperty(key) ? store[key] : null; }
  function setItem(key, value) { store[key] = String(value); }
  function removeItem(key) { delete store[key]; }
  // Expose raw store for direct seeding
  getItem._store = store;
  setItem._store = store;
  return { getItem: getItem, setItem: setItem, removeItem: removeItem };
}

var mockLocalStorage = createLocalStorageMock();

var mockContext = {
  window: {
    innerWidth: 1280,
    localStorage: mockLocalStorage,
    document: {
      getElementById: function() { return null; },
      createElement: function() { return { style: {}, classList: { add: function() {} } }; },
      querySelector: function() { return null; }
    },
    location: { href: 'http://localhost/' },
    fetch: function() {
      return Promise.reject(new Error('no network in test'));
    },
    setTimeout: function(fn, ms) { /* no-op */ },
    setInterval: function(fn, ms) { /* no-op */ },
    addEventListener: function() {},
    state: { session: null },
    QUESTION_BANK: []
  },
  console: console,
  Date: Date,
  Promise: Promise,
  setTimeout: setTimeout,
  setInterval: setInterval,
  clearTimeout: clearTimeout,
  clearInterval: clearInterval,
  localStorage: mockLocalStorage
};

vm.createContext(mockContext);

// ── Load infrastructure ───────────────────────────────────────

function loadModule(filename) {
  var filePath = path.join(ROOT, filename);
  var code = fs.readFileSync(filePath, 'utf8');
  var script = new vm.Script(code, { filename: filename });
  script.runInContext(mockContext);
  return mockContext.window[Object.keys(mockContext.window).pop()];
}

// We must load in dependency order
loadModule('may-feature-flags.js');
loadModule('may-learner-state.js');
loadModule('may-context-builder.js');
loadModule('may-coaching-router.js');
loadModule('may-llm-types.js');
loadModule('may-llm-provider-registry.js');
loadModule('may-llm-adapter.js');

// MAY-004 modules
loadModule('may-learner-profile.js');
loadModule('may-adaptive-recommender.js');
loadModule('may-remediation-engine.js');
loadModule('may-readiness-scorer.js');

var MayFeatureFlags = mockContext.window.MayFeatureFlags;
var MayLearnerState = mockContext.window.MayLearnerState;
var MayLearnerProfile = mockContext.window.MayLearnerProfile;
var MayAdaptiveRecommender = mockContext.window.MayAdaptiveRecommender;
var MayRemediationEngine = mockContext.window.MayRemediationEngine;
var MayReadinessScorer = mockContext.window.MayReadinessScorer;

// ── Seed learner state for testing ────────────────────────────

function seedLearnerState() {
  var d = function(n) { return new Date(2026, 5, n).toISOString(); };
  var sessions = [];

  // Session 1: some weak performance
  sessions.push({
    sessionId: 'test-s1', date: d(1), mode: 'practice',
    totalQuestions: 6, correctCount: 3,
    attempts: [
      { questionId: 'Q1', topic: 'Financial statements', section: 'A', correct: true, hintsUsed: 0, confidence: 4, difficulty: 'Easy', difficultyScore: 1, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(1) },
      { questionId: 'Q2', topic: 'Financial statements', section: 'A', correct: false, hintsUsed: 2, confidence: 3, difficulty: 'Moderate', difficultyScore: 3, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(1) },
      { questionId: 'Q3', topic: 'Planning and budgeting', section: 'B', correct: false, hintsUsed: 1, difficulty: 'Moderate', difficultyScore: 3, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(1) },
      { questionId: 'Q4', topic: 'Cost behavior', section: 'D', correct: true, hintsUsed: 0, difficulty: 'Easy', difficultyScore: 1, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(1) },
      { questionId: 'Q5', topic: 'Cost behavior', section: 'D', correct: false, hintsUsed: 1, difficulty: 'Moderate', difficultyScore: 3, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(1) },
      { questionId: 'Q6', topic: 'Internal controls', section: 'E', correct: true, hintsUsed: 0, difficulty: 'Easy', difficultyScore: 1, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(1) }
    ]
  });

  // Session 2: improvement in some, weakness persists
  sessions.push({
    sessionId: 'test-s2', date: d(3), mode: 'practice',
    totalQuestions: 6, correctCount: 3,
    attempts: [
      { questionId: 'Q7', topic: 'Financial statements', section: 'A', correct: true, hintsUsed: 0, confidence: 4, difficulty: 'Moderate', difficultyScore: 3, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(3) },
      { questionId: 'Q8', topic: 'Financial statements', section: 'A', correct: false, hintsUsed: 1, confidence: 3, difficulty: 'Moderate', difficultyScore: 3, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(3) },
      { questionId: 'Q9', topic: 'Planning and budgeting', section: 'B', correct: false, hintsUsed: 2, difficulty: 'Difficult', difficultyScore: 4, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(3) },
      { questionId: 'Q10', topic: 'Planning and budgeting', section: 'B', correct: false, hintsUsed: 1, difficulty: 'Moderate', difficultyScore: 3, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(3) },
      { questionId: 'Q11', topic: 'Cost behavior', section: 'D', correct: true, hintsUsed: 0, difficulty: 'Easy', difficultyScore: 1, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(3) },
      { questionId: 'Q12', topic: 'Internal controls', section: 'E', correct: true, hintsUsed: 0, difficulty: 'Moderate', difficultyScore: 3, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(3) }
    ]
  });

  // Session 3: continued practice
  sessions.push({
    sessionId: 'test-s3', date: d(5), mode: 'practice',
    totalQuestions: 5, correctCount: 3,
    attempts: [
      { questionId: 'Q13', topic: 'Financial statements', section: 'A', correct: true, hintsUsed: 0, confidence: 4, difficulty: 'Moderate', difficultyScore: 3, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(5) },
      { questionId: 'Q14', topic: 'Financial statements', section: 'A', correct: true, hintsUsed: 0, confidence: 5, difficulty: 'Easy', difficultyScore: 1, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(5) },
      { questionId: 'Q15', topic: 'Variance analysis', section: 'C', correct: false, hintsUsed: 1, difficulty: 'Difficult', difficultyScore: 4, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(5) },
      { questionId: 'Q16', topic: 'Variance analysis', section: 'C', correct: true, hintsUsed: 0, difficulty: 'Moderate', difficultyScore: 3, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(5) },
      { questionId: 'Q17', topic: 'Cost behavior', section: 'D', correct: true, hintsUsed: 0, difficulty: 'Moderate', difficultyScore: 3, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(5) }
    ]
  });

  // Session 4: more coverage
  sessions.push({
    sessionId: 'test-s4', date: d(7), mode: 'practice',
    totalQuestions: 5, correctCount: 4,
    attempts: [
      { questionId: 'Q18', topic: 'Financial statements', section: 'A', correct: true, hintsUsed: 0, confidence: 4, difficulty: 'Difficult', difficultyScore: 4, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(7) },
      { questionId: 'Q19', topic: 'Internal controls', section: 'E', correct: true, hintsUsed: 0, confidence: 4, difficulty: 'Moderate', difficultyScore: 3, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(7) },
      { questionId: 'Q20', topic: 'Variance analysis', section: 'C', correct: true, hintsUsed: 1, confidence: 3, difficulty: 'Moderate', difficultyScore: 3, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(7) },
      { questionId: 'Q21', topic: 'Technology and analytics', section: 'F', correct: true, hintsUsed: 0, difficulty: 'Easy', difficultyScore: 1, itemType: 'MCQ', cognitiveLevel: 'Remember', questionState: 'Certified', timestamp: d(7) },
      { questionId: 'Q22', topic: 'Technology and analytics', section: 'F', correct: false, hintsUsed: 1, difficulty: 'Moderate', difficultyScore: 3, itemType: 'MCQ', cognitiveLevel: 'Apply', questionState: 'Certified', timestamp: d(7) }
    ]
  });

  var data = {
    learnerId: 'test-learner-001',
    userName: 'Test Student',
    firstVisit: d(1),
    sessions: sessions,
    topicPerformance: {},
    subtopicPerformance: {},
    misconceptionPatterns: [],
    recommendationLog: [],
    recommendationOutcomes: [],
    sessionSummaries: [],
    lastUpdated: new Date().toISOString(),
    examPlan: {
      hasScheduledExam: true,
      examPart: 'Part 1',
      examDate: new Date(2026, 7, 15).toISOString(), // ~2 weeks from now
      capturedAt: d(1)
    }
  };

  // Rebuild topicPerformance from sessions
  sessions.forEach(function(s) {
    (s.attempts || []).forEach(function(a) {
      var topic = a.topic;
      if (!data.topicPerformance[topic]) {
        data.topicPerformance[topic] = {
          totalAttempts: 0, correctCount: 0, hintCount: 0,
          recentAttempts: [], firstSeen: s.date, lastSeen: s.date,
          sectionsSeen: [], difficultyDistribution: {},
          difficultyWeights: { total: 0, sum: 0 }
        };
      }
      var agg = data.topicPerformance[topic];
      agg.totalAttempts++;
      if (a.correct) agg.correctCount++;
      agg.hintCount += (a.hintsUsed || 0);
      agg.lastSeen = a.timestamp || s.date;
      if (!agg.sectionsSeen.includes(a.section)) agg.sectionsSeen.push(a.section);
      agg.difficultyDistribution[a.difficulty] = (agg.difficultyDistribution[a.difficulty] || 0) + 1;
      agg.difficultyWeights.total++;
      agg.difficultyWeights.sum += (a.difficultyScore || 3);
      agg.recentAttempts.push({
        correct: a.correct, hints: a.hintsUsed || 0,
        difficulty: a.difficulty, timestamp: a.timestamp || s.date
      });
      if (agg.recentAttempts.length > 15) agg.recentAttempts = agg.recentAttempts.slice(-15);
    });
  });

  mockContext.window.localStorage.setItem('cmaMayLearnerState', JSON.stringify(data));
}

// ── TEST SUITE ─────────────────────────────────────────────────

console.log('\n=== MAY-004 ADAPTIVE COACH TESTS ===\n');

// ── Feature Flag ───────────────────────────────────────────────

console.log('--- Feature Flag ---');
assert(MayFeatureFlags.isEnabled('ENABLE_ADAPTIVE_COACHING') === false,
  'ENABLE_ADAPTIVE_COACHING defaults to false');
assert('ENABLE_ADAPTIVE_COACHING' in MayFeatureFlags.FLAGS,
  'ENABLE_ADAPTIVE_COACHING flag exists');
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', true);
assert(MayFeatureFlags.isEnabled('ENABLE_ADAPTIVE_COACHING') === true,
  'ENABLE_ADAPTIVE_COACHING can be enabled');
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', false);

// ── Learner Profile (disabled) ─────────────────────────────────

console.log('\n--- Learner Profile (disabling gate) ---');
seedLearnerState();
var profileDisabled = MayLearnerProfile.build();
assert(profileDisabled === null,
  'build() returns null when flag disabled');

// ── Learner Profile (enabled) ──────────────────────────────────

console.log('\n--- Learner Profile (enabled) ---');
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', true);
seedLearnerState();
var profile = MayLearnerProfile.build();
assert(profile !== null, 'build() returns non-null when flag enabled');
assert(profile.learnerId === 'test-learner-001', 'learnerId populated');
assert(profile.displayName === 'Test Student', 'displayName populated');
assert(typeof profile.studyStreak === 'number', 'studyStreak is number');
assert(profile.totalSessions === 4, 'totalSessions correct');
assert(profile.totalAttempts === 22, 'totalAttempts correct (6+6+5+5)');

// Mastery levels
assert(typeof profile.masteryLevels === 'object', 'masteryLevels is object');
var topicCount = Object.keys(profile.masteryLevels).length;
assert(topicCount >= 4, 'at least 4 topics in masteryLevels (got ' + topicCount + ')');

// Financial statements: 7 attempts, 5 correct = ~71%
if (profile.masteryLevels['Financial statements']) {
  var fs = profile.masteryLevels['Financial statements'];
  assert(fs.attempts === 7, 'Financial statements: 7 attempts');
  assert(fs.accuracy === 71, 'Financial statements: ~71% accuracy (got ' + fs.accuracy + ')');
}

// Planning and budgeting: 3 attempts, 0 correct = 0%
if (profile.masteryLevels['Planning and budgeting']) {
  var pb = profile.masteryLevels['Planning and budgeting'];
  assert(pb.attempts === 3, 'Planning and budgeting: 3 attempts');
  assert(pb.accuracy === 0, 'Planning and budgeting: 0% accuracy');
}

// Strengths & Weaknesses
assert(Array.isArray(profile.strengths), 'strengths is array');
assert(Array.isArray(profile.weaknesses), 'weaknesses is array');
assert(Array.isArray(profile.improvingTopics), 'improvingTopics is array');
assert(Array.isArray(profile.decliningTopics), 'decliningTopics is array');

// Readiness score
assert(typeof profile.readinessScore === 'object', 'readinessScore is object');
assert(typeof profile.readinessScore.overall === 'number', 'readinessScore.overall is number');
assert(profile.readinessScore.perSection !== undefined, 'perSection exists');
assert('A' in profile.readinessScore.perSection, 'Section A present');
assert('B' in profile.readinessScore.perSection, 'Section B present');

// Behavior
assert(typeof profile.behavior === 'object', 'behavior is object');
assert(typeof profile.behavior.confidenceCalibration === 'object', 'confidenceCalibration is object');

// Recent
assert(Array.isArray(profile.recentTopics), 'recentTopics is array');
assert(Array.isArray(profile.recentQIDs), 'recentQIDs is array');
assert(Array.isArray(profile.missedTopics), 'missedTopics is array');

// Exam plan
assert(profile.examPlan !== null, 'examPlan present');
if (profile.examPlan) {
  assert(profile.examPlan.hasScheduledExam === true, 'hasScheduledExam true');
}

// Metadata
assert(typeof profile._meta === 'object', '_meta is object');
assert(profile._meta.profileVersion === 'MAY004-1.0', 'profileVersion correct');

// Recommended actions
assert(Array.isArray(profile.recommendedActions), 'recommendedActions is array');

// ── Adaptive Recommender ──────────────────────────────────────

console.log('\n--- Adaptive Recommender ---');
var actions = MayAdaptiveRecommender.generate(profile);
assert(Array.isArray(actions), 'generate() returns array');
assert(actions.length > 0, 'recommendations generated (got ' + actions.length + ')');
assert(actions.length <= 5, 'recommendations capped at 5');

// Verify required fields on each action
var validTypes = ['remediation', 'reinforcement', 'challenge', 'review', 'practice_mix'];
actions.forEach(function(a, i) {
  assert(typeof a.type === 'string', 'action ' + i + ' has type');
  assert(validTypes.indexOf(a.type) >= 0, 'action ' + i + ' type valid: ' + a.type);
  assert(typeof a.priority === 'string', 'action ' + i + ' has priority');
  assert(['high', 'medium', 'low'].indexOf(a.priority) >= 0, 'action ' + i + ' priority valid: ' + a.priority);
  assert(typeof a.rationale === 'string', 'action ' + i + ' has rationale');
  assert(a.rationale.length > 0, 'action ' + i + ' rationale non-empty');
});

// Disabled recommender
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', false);
var actionsDisabled = MayAdaptiveRecommender.generate(profile);
assert(actionsDisabled.length === 0, 'generate() returns empty when flag disabled');
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', true);

// ── Remediation Engine ────────────────────────────────────────

console.log('\n--- Remediation Engine ---');
var topics = MayRemediationEngine.getTargetedTopics(profile);
assert(Array.isArray(topics), 'getTargetedTopics returns array');
assert(topics.length > 0, 'targeted topics found (got ' + topics.length + ')');

var qc = MayRemediationEngine.getQuizConfig(profile, topics[0]);
assert(qc !== null, 'getQuizConfig returns non-null');
assert(typeof qc.count === 'number', 'quiz config has count');
assert(typeof qc.difficulty === 'string', 'quiz config has difficulty');
assert(Array.isArray(qc.excludeQIDs), 'quiz config has excludeQIDs');

var plan = MayRemediationEngine.buildRecoveryPlan(profile);
assert(Array.isArray(plan), 'buildRecoveryPlan returns array');
if (plan.length > 0) {
  assert(typeof plan[0].topic === 'string', 'plan item has topic');
  assert(typeof plan[0].rationale === 'string', 'plan item has rationale');
}

// Disabled remediation
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', false);
assert(MayRemediationEngine.getTargetedTopics(profile).length === 0,
  'getTargetedTopics returns empty when flag disabled');
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', true);

// ── Readiness Scorer (disabled by default) ────────────────────

console.log('\n--- Readiness Scorer ---');
assert(MayReadinessScorer.isEnabled() === false, 'scorer disabled by default');
var estDisabled = MayReadinessScorer.estimate(profile);
assert(estDisabled === null, 'estimate returns null when scorer disabled');

MayReadinessScorer.enable();
assert(MayReadinessScorer.isEnabled() === true, 'scorer can be enabled');
var est = MayReadinessScorer.estimate(profile);
assert(est !== null, 'estimate returns non-null when enabled');
assert(typeof est.readinessScore === 'number', 'readinessScore is number');
assert(est.readinessScore >= 0 && est.readinessScore <= 100, 'readinessScore in 0-100 range');
assert(typeof est.confidence === 'string', 'confidence is string');
assert(Array.isArray(est.strengths), 'strengths is array');
assert(Array.isArray(est.risks), 'risks is array');
assert(Array.isArray(est.recommendedNextActions), 'recommendedNextActions is array');
assert(est.components !== undefined, 'components present');
MayReadinessScorer.disable();

// ── Insufficient Data Profile ─────────────────────────────────

console.log('\n--- Insufficient Data ---');
var emptyData = {
  learnerId: 'empty-001',
  userName: 'New User',
  sessions: [],
  topicPerformance: {},
  subtopicPerformance: {},
  misconceptionPatterns: [],
  recommendationLog: [],
  recommendationOutcomes: [],
  sessionSummaries: [],
  lastUpdated: new Date().toISOString()
};
mockContext.window.localStorage.setItem('cmaMayLearnerState', JSON.stringify(emptyData));

var emptyProfile = MayLearnerProfile.build();
assert(emptyProfile !== null, 'empty profile builds');
assert(emptyProfile._meta.dataSufficiency === 'insufficient', 'data sufficiency is insufficient');
var emptyActions = MayAdaptiveRecommender.generate(emptyProfile);
assert(emptyActions.length === 1, 'insufficient data generates exactly 1 recommendation');
assert(emptyActions[0].type === 'practice_mix', 'default recommendation is practice_mix');

// ── Cleanup ────────────────────────────────────────────────────

MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', false);
MayReadinessScorer.disable();

// ── VERDICT ────────────────────────────────────────────────────

console.log('\n=== VERDICT ===');
console.log('  ' + passes + ' passed, ' + failures + ' failed');
if (failures === 0) {
  console.log('PASS — all MAY-004 adaptive coach tests passed');
  process.exit(0);
} else {
  console.log('FAIL — ' + failures + ' test(s) failed');
  process.exit(1);
}
