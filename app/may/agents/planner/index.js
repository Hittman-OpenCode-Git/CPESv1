/**
 * Planner — Micro-Agent (Phase 2b+)
 *
 * Input: { daysUntilExam, readinessScore, weakTopics, hintDependency }
 *   (decorates may-decision-engine.js decide() D1-D10; consumes
 *    may-learner-profile.js:238 hintDependency + readiness)
 * Output: { nextAction: { mode, topic, minutes }, rationale }
 *
 * Decides a concrete next-study action when the upstream D-rule is a
 * "study-plan" family rule (D4, D6, D9). For other D-rules, returns
 * {nextAction: null} so the upstream decision is unchanged.
 *
 * Mode/topic/minutes are computed deterministically from days-until-exam
 * and the first weak topic. hintDependency bias: when the learner has
 * hint-dependent topics, prefer SOCRATIC mode (guided discovery) over
 * QUIZ (test) for that topic — fewer failed attempts, more explanation.
 *
 * PROVIDER_INTERFACE conformant. Worker-mandatory. Hidden beta:
 * ENABLE_PLANNER_AGENT flag defaults to false. When off, the decision
 * engine's existing decide() runs unchanged.
 */
(function () {
  'use strict';

  // Tunable time budgets (minutes) per days-until-exam bucket.
  function _minutesForDays(daysUntilExam) {
    if (typeof daysUntilExam !== 'number') return 20;
    if (daysUntilExam <= 2) return 45;
    if (daysUntilExam <= 7) return 30;
    if (daysUntilExam <= 21) return 20;
    return 12;
  }

  function _modeForReadyScore(readinessScore) {
    // Lower readiness → more guided discovery (SOCRATIC); higher → more practice.
    if (typeof readinessScore !== 'number') return 'SOCRATIC';
    if (readinessScore < 50) return 'EXPLAIN';
    if (readinessScore < 70) return 'SOCRATIC';
    if (readinessScore < 85) return 'QUIZ';
    return 'STUDY_PLAN';
  }

  function _applyHintDependencyBias(mode, hintDependency) {
    if (!hintDependency || typeof hintDependency !== 'object') return mode;
    var topics = Array.isArray(hintDependency.topics) ? hintDependency.topics : [];
    var trend = hintDependency.trend || 'stable';
    if (topics.length > 0 && trend === 'increasing' && mode === 'QUIZ') {
      return 'SOCRATIC';
    }
    return mode;
  }

  function _shouldEngage(upstreamRuleId) {
    // Only inject a plan for study-plan-family rules.
    var studyFamily = { 'D4': true, 'D6': true, 'D9': true };
    return !!(upstreamRuleId && studyFamily[upstreamRuleId]);
  }

  function plan(input) {
    var daysUntilExam = (typeof input.daysUntilExam === 'number') ? input.daysUntilExam : null;
    var readinessScore = (typeof input.readinessScore === 'number') ? input.readinessScore : null;
    var weakTopics = (Array.isArray(input.weakTopics)) ? input.weakTopics : [];
    var hintDependency = input.hintDependency || null;
    var upstreamRuleId = input.upstreamRuleId || null;

    if (!_shouldEngage(upstreamRuleId)) {
      return { nextAction: null, rationale: 'planner:skip:non_study_rule' };
    }
    if (!weakTopics.length) {
      return { nextAction: null, rationale: 'planner:skip:no_weak_topics' };
    }
    var topic = weakTopics[0];
    var mode = _modeForReadyScore(readinessScore);
    mode = _applyHintDependencyBias(mode, hintDependency);
    var minutes = _minutesForDays(daysUntilExam);

    return {
      nextAction: { mode: mode, topic: topic, minutes: minutes },
      rationale: 'planner:build:' + mode + ':' + topic + ':' + minutes + 'm'
    };
  }

  function _send(request) {
    var input = (request && request.context) ? request.context : (request || {});
    var result = plan(input);
    return Promise.resolve({
      success: true,
      content: JSON.stringify(result),
      confidence: 0.7,
      provider: 'planner',
      latency: 0,
      fallback: false,
      error: null,
      metadata: {
        requestId: (request && request.metadata && request.metadata.requestId) || null,
        timestamp: new Date().toISOString(),
        mode: 'planner'
      }
    });
  }

  function PlannerProvider() {
    this._providerId = 'planner';
    this._providerType = 'planner';
    this._isAvailable = false;
  }

  PlannerProvider.prototype.getProviderId = function () { return this._providerId; };

  PlannerProvider.prototype.isAvailable = function () {
    if (this._isAvailable) return true;
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled('ENABLE_PLANNER_AGENT')) {
        this._isAvailable = true;
        return true;
      }
    } catch (e) { /* ignore */ }
    return false;
  };

  PlannerProvider.prototype.getConfig = function () {
    return {
      providerId: this._providerId,
      providerType: this._providerType,
      capabilities: ['study-plan-action', 'days-until-exam-aware', 'hint-dependency-aware'],
      description: 'Planner (Phase 2b+, hidden beta) — next-action decoration for D4/D6/D9'
    };
  };

  PlannerProvider.prototype.validateConfig = function () { return { valid: true, errors: [] }; };
  PlannerProvider.prototype.healthCheck = function () {
    return Promise.resolve({ available: this.isAvailable(), latency: 0 });
  };
  PlannerProvider.prototype.initialize = function () { return Promise.resolve(); };
  PlannerProvider.prototype.shutdown = function () { return Promise.resolve(); };
  PlannerProvider.prototype.send = _send;

  PlannerProvider.plan = plan;

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PlannerProvider: PlannerProvider, plan: plan };
  }
  if (typeof window !== 'undefined') {
    window.PlannerProvider = PlannerProvider;
    window.PlannerPlan = plan;
  }
})();