/**
 * planner.worker.js — Web Worker host.
 *
 * Phase 2b+. Deterministic JS planning logic. Mirrors index.js.
 */

'use strict';

function minutesForDays(daysUntilExam) {
  if (typeof daysUntilExam !== 'number') return 20;
  if (daysUntilExam <= 2) return 45;
  if (daysUntilExam <= 7) return 30;
  if (daysUntilExam <= 21) return 20;
  return 12;
}

function modeForReadyScore(readinessScore) {
  if (typeof readinessScore !== 'number') return 'SOCRATIC';
  if (readinessScore < 50) return 'EXPLAIN';
  if (readinessScore < 70) return 'SOCRATIC';
  if (readinessScore < 85) return 'QUIZ';
  return 'STUDY_PLAN';
}

function applyHintDependencyBias(mode, hintDependency) {
  if (!hintDependency || typeof hintDependency !== 'object') return mode;
  var topics = Array.isArray(hintDependency.topics) ? hintDependency.topics : [];
  var trend = hintDependency.trend || 'stable';
  if (topics.length > 0 && trend === 'increasing' && mode === 'QUIZ') return 'SOCRATIC';
  return mode;
}

function shouldEngage(upstreamRuleId) {
  var studyFamily = { 'D4': true, 'D6': true, 'D9': true };
  return !!(upstreamRuleId && studyFamily[upstreamRuleId]);
}

function plan(input) {
  var daysUntilExam = (typeof input.daysUntilExam === 'number') ? input.daysUntilExam : null;
  var readinessScore = (typeof input.readinessScore === 'number') ? input.readinessScore : null;
  var weakTopics = (Array.isArray(input.weakTopics)) ? input.weakTopics : [];
  var hintDependency = input.hintDependency || null;
  var upstreamRuleId = input.upstreamRuleId || null;
  if (!shouldEngage(upstreamRuleId)) {
    return { nextAction: null, rationale: 'planner:skip:non_study_rule' };
  }
  if (!weakTopics.length) {
    return { nextAction: null, rationale: 'planner:skip:no_weak_topics' };
  }
  var topic = weakTopics[0];
  var mode = modeForReadyScore(readinessScore);
  mode = applyHintDependencyBias(mode, hintDependency);
  var minutes = minutesForDays(daysUntilExam);
  return {
    nextAction: { mode: mode, topic: topic, minutes: minutes },
    rationale: 'planner:build:' + mode + ':' + topic + ':' + minutes + 'm'
  };
}

self.addEventListener('message', function (ev) {
  var msg = ev.data;
  if (!msg) return;
  if (msg.type === 'classify') {
    try {
      var result = plan(msg.input);
      self.postMessage({ type: 'result', requestId: msg.requestId, output: result });
    } catch (e) {
      self.postMessage({ type: 'result', requestId: msg.requestId, error: e.message || String(e) });
    }
  }
});