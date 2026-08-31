/**
 * MayCoachingMemory — Session-scoped coaching state tracker.
 * 
 * Tracks the learner's active coaching goal, current focus area, weakness
 * history, intervention history, and coaching mode history within a single
 * session. All state is session-scoped and resets on page reload.
 * 
 * This is NOT persisted to localStorage — it is purely in-memory for the
 * duration of a single coaching session.
 * 
 * Session: MAY-006A — Adaptive Coaching Orchestrator (Stretch Goal)
 * Governance: Light Lane (coaching layer — no pack/case/content impact)
 * Feature flag: ENABLE_COACHING_MEMORY (default: false)
 */

const MayCoachingMemory = (function() {
  'use strict';

  var FLAG = 'ENABLE_COACHING_MEMORY';

  function _isEnabled() {
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled) {
        return MayFeatureFlags.isEnabled(FLAG);
      }
    } catch (e) {}
    return false;
  }

  // ── Internal state (session-scoped, not persisted) ────────────

  var _state = {
    activeGoal: null,
    currentFocus: null,
    weaknessHistory: [],
    interventionHistory: [],
    coachingModeHistory: [],
    topicSequence: [],
    sessionStartTime: null,
    interactionCount: 0
  };

  function _reset() {
    _state = {
      activeGoal: null,
      currentFocus: null,
      weaknessHistory: [],
      interventionHistory: [],
      coachingModeHistory: [],
      topicSequence: [],
      sessionStartTime: new Date().toISOString(),
      interactionCount: 0
    };
  }

  // Initialize on load
  _reset();

  // ── Goal management ───────────────────────────────────────────

  function setActiveGoal(goal) {
    if (!_isEnabled()) return;
    _state.activeGoal = {
      goal: goal,
      setAt: new Date().toISOString(),
      previousGoal: _state.activeGoal ? _state.activeGoal.goal : null
    };
  }

  function getActiveGoal() {
    if (!_isEnabled()) return null;
    return _state.activeGoal;
  }

  // ── Focus management ──────────────────────────────────────────

  function setCurrentFocus(topic) {
    if (!_isEnabled()) return;
    var prev = _state.currentFocus;
    _state.currentFocus = {
      topic: topic,
      setAt: new Date().toISOString(),
      previousFocus: prev ? prev.topic : null
    };
  }

  function getCurrentFocus() {
    if (!_isEnabled()) return null;
    return _state.currentFocus;
  }

  // ── Interaction recording ─────────────────────────────────────

  function recordInteraction(data) {
    if (!_isEnabled()) return;
    _state.interactionCount++;
    var entry = {
      id: _state.interactionCount,
      timestamp: new Date().toISOString(),
      action: data.action || null,
      topic: data.topic || null,
      mode: data.mode || null,
      outcome: data.outcome || null,
      decisionId: data.decisionId || null,
      _whisperNudge: null
    };
    // Phase 2b+ — Whisperer integration on recordInteraction. Hidden beta;
    // only runs when flag is on. Exam-integrity hard block lives inside
    // the agent (whisperer/index.js:whisper).
    try {
      if (typeof MayFeatureFlags !== 'undefined' && MayFeatureFlags.isEnabled('ENABLE_WHISPERER')) {
        if (typeof window !== 'undefined' && typeof window.WhispererWhisper === 'function') {
          var elapsedMs = (entry.timestamp ? Date.now() - Date.parse(entry.timestamp) : 0) || 0;
          var dwellMs = (data && typeof data.dwellMs === 'number') ? data.dwellMs : 0;
          var errorStreak = (data && typeof data.errorStreak === 'number') ? data.errorStreak : 0;
          var examIntegrity = !!(data && data.examIntegrity);
          var whisper = window.WhispererWhisper({
            elapsedMs: elapsedMs, dwellMs: dwellMs,
            errorStreak: errorStreak, examIntegrity: examIntegrity,
            mode: entry.mode
          });
          if (whisper && whisper.nudge) {
            entry._whisperNudge = whisper.nudge;
            entry._whisperTiming = whisper.timing || null;
          }
        }
      }
    } catch (e) { /* never break recordInteraction */ }

    // Track coaching mode history
    if (entry.mode) {
      _state.coachingModeHistory.push(entry.mode);
      if (_state.coachingModeHistory.length > 50) _state.coachingModeHistory.shift();
    }

    // Track topic sequence
    if (entry.topic && (_state.topicSequence.length === 0 ||
        _state.topicSequence[_state.topicSequence.length - 1] !== entry.topic)) {
      _state.topicSequence.push(entry.topic);
      if (_state.topicSequence.length > 20) _state.topicSequence.shift();
    }

    return entry;
  }

  function getInteractionCount() {
    if (!_isEnabled()) return 0;
    return _state.interactionCount;
  }

  // ── Weakness tracking ─────────────────────────────────────────

  function recordWeaknessEngagement(topic, action) {
    if (!_isEnabled()) return;
    _state.weaknessHistory.push({
      topic: topic,
      action: action,
      timestamp: new Date().toISOString()
    });
    if (_state.weaknessHistory.length > 20) _state.weaknessHistory.shift();
  }

  function getWeaknessHistory() {
    if (!_isEnabled()) return [];
    return _state.weaknessHistory.slice();
  }

  function hasEngagedWeakness(topic) {
    if (!_isEnabled()) return false;
    return _state.weaknessHistory.some(function(w) { return w.topic === topic; });
  }

  // ── Intervention tracking ─────────────────────────────────────

  function recordIntervention(intervention) {
    if (!_isEnabled()) return;
    _state.interventionHistory.push({
      topic: intervention.topic || null,
      tier: intervention.tierLabel || null,
      action: intervention.recommendedAction || null,
      timestamp: new Date().toISOString()
    });
    if (_state.interventionHistory.length > 30) _state.interventionHistory.shift();
  }

  function getInterventionHistory() {
    if (!_isEnabled()) return [];
    return _state.interventionHistory.slice();
  }

  /**
   * Check if a topic was already intervened on this session.
   */
  function alreadyIntervened(topic) {
    if (!_isEnabled()) return false;
    return _state.interventionHistory.some(function(iv) { return iv.topic === topic; });
  }

  // ── Mode history ──────────────────────────────────────────────

  function getModeHistory() {
    if (!_isEnabled()) return [];
    return _state.coachingModeHistory.slice();
  }

  function getLastMode() {
    if (!_isEnabled()) return null;
    if (_state.coachingModeHistory.length === 0) return null;
    return _state.coachingModeHistory[_state.coachingModeHistory.length - 1];
  }

  // ── Topic sequence ────────────────────────────────────────────

  function getTopicSequence() {
    if (!_isEnabled()) return [];
    return _state.topicSequence.slice();
  }

  function getRecentTopics(count) {
    if (!_isEnabled()) return [];
    count = count || 5;
    return _state.topicSequence.slice(-count);
  }

  // ── Session summary ───────────────────────────────────────────

  function getSessionSummary() {
    if (!_isEnabled()) return null;

    return {
      activeGoal: _state.activeGoal,
      currentFocus: _state.currentFocus,
      interactionCount: _state.interactionCount,
      uniqueTopics: _state.topicSequence.length > 0 ?
        _state.topicSequence.filter(function(v, i, a) { return a.indexOf(v) === i; }) : [],
      modesUsed: _state.coachingModeHistory.length > 0 ?
        _state.coachingModeHistory.filter(function(v, i, a) { return a.indexOf(v) === i; }) : [],
      weaknessesEngaged: _state.weaknessHistory.length,
      interventionsDelivered: _state.interventionHistory.length,
      sessionStartTime: _state.sessionStartTime
    };
  }

  // ── Snapshot & reset ──────────────────────────────────────────

  function snapshot() {
    if (!_isEnabled()) return null;
    return JSON.parse(JSON.stringify(_state));
  }

  function clear() {
    _reset();
  }

  // ─── Export ──────────────────────────────────────────────────

  return {
    isEnabled: _isEnabled,
    FLAG: FLAG,
    setActiveGoal: setActiveGoal,
    getActiveGoal: getActiveGoal,
    setCurrentFocus: setCurrentFocus,
    getCurrentFocus: getCurrentFocus,
    recordInteraction: recordInteraction,
    getInteractionCount: getInteractionCount,
    recordWeaknessEngagement: recordWeaknessEngagement,
    getWeaknessHistory: getWeaknessHistory,
    hasEngagedWeakness: hasEngagedWeakness,
    recordIntervention: recordIntervention,
    getInterventionHistory: getInterventionHistory,
    alreadyIntervened: alreadyIntervened,
    getModeHistory: getModeHistory,
    getLastMode: getLastMode,
    getTopicSequence: getTopicSequence,
    getRecentTopics: getRecentTopics,
    getSessionSummary: getSessionSummary,
    snapshot: snapshot,
    clear: clear
  };

})();

if (typeof window !== 'undefined') {
  window.MayCoachingMemory = MayCoachingMemory;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayCoachingMemory;
}
