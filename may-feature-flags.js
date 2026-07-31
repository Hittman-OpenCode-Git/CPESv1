/**
 * MayFeatureFlags — Centralized feature flag framework for May AI coaching layer.
 * 
 * All flags default to false — zero production behavior change until explicitly enabled.
 * Integrates with May.config for runtime toggling and environment variable overrides.
 * 
 * Session: MAY-001 (base), MAY-002 (mode flags added)
 * Governance: Light Lane (UI/coaching layer — no pack/case/content impact)
 */

const MayFeatureFlags = (function() {
  'use strict';

  var _flags = {
    ENABLE_CONTEXT_BUILDER: false,
    ENABLE_COACHING_ROUTER: false,
    ENABLE_EXPLAIN_MODE: false,
    ENABLE_QUIZ_MODE: false,
    ENABLE_SOCRATIC_MODE: false,
    ENABLE_STUDY_PLAN_MODE: false,
    ENABLE_LLM: false,
    ENABLE_LLM_COACHING: false,
    ENABLE_LLM_SUMMARIES: false,
    ENABLE_AZURE_OPENAI_PROVIDER: false,
    ENABLE_OPENAI_PROVIDER: false,
    ENABLE_ADAPTIVE_COACHING: false,
    ENABLE_READINESS_SCORING: false,
    ENABLE_ADAPTIVE_ORCHESTRATION: false,
    ENABLE_COACHING_MEMORY: false,
    ENABLE_PRODUCTION_MAY_INTEGRATION: true
  };

  var _changeLog = [];

  function _logChange(flag, oldVal, newVal) {
    _changeLog.push({
      flag: flag,
      from: oldVal,
      to: newVal,
      timestamp: new Date().toISOString()
    });
    if (_changeLog.length > 100) _changeLog.shift();
  }

  function isEnabled(flagName) {
    if (!(flagName in _flags)) return false;
    return _flags[flagName] === true;
  }

  function setFlag(flagName, value) {
    if (!(flagName in _flags)) return false;
    var oldVal = _flags[flagName];
    var newVal = !!value;
    _flags[flagName] = newVal;
    if (oldVal !== newVal) {
      _logChange(flagName, oldVal, newVal);
    }
    return true;
  }

  function getAll() {
    var result = {};
    for (var k in _flags) {
      if (_flags.hasOwnProperty(k)) result[k] = _flags[k];
    }
    return result;
  }

  function getChangeLog() {
    return _changeLog.slice();
  }

  function snapshot() {
    return {
      flags: getAll(),
      changeCount: _changeLog.length,
      timestamp: new Date().toISOString()
    };
  }

  function syncToMayConfig() {
    try {
      if (typeof May !== 'undefined' && May.config) {
        May.config.flags = May.config.flags || {};
        for (var k in _flags) {
          if (_flags.hasOwnProperty(k)) {
            May.config.flags[k] = _flags[k];
          }
        }
        May.config.enableLLM = _flags.ENABLE_LLM;
      }
    } catch (e) { /* May not loaded */ }
  }

  function applyEnvOverrides() {
    try {
      if (typeof process !== 'undefined' && process.env) {
        if (process.env.MAY_ENABLE_CONTEXT_BUILDER === '1') _flags.ENABLE_CONTEXT_BUILDER = true;
        if (process.env.MAY_ENABLE_COACHING_ROUTER === '1') _flags.ENABLE_COACHING_ROUTER = true;
        if (process.env.MAY_ENABLE_EXPLAIN_MODE === '1') _flags.ENABLE_EXPLAIN_MODE = true;
        if (process.env.MAY_ENABLE_QUIZ_MODE === '1') _flags.ENABLE_QUIZ_MODE = true;
        if (process.env.MAY_ENABLE_SOCRATIC_MODE === '1') _flags.ENABLE_SOCRATIC_MODE = true;
        if (process.env.MAY_ENABLE_STUDY_PLAN_MODE === '1') _flags.ENABLE_STUDY_PLAN_MODE = true;
        if (process.env.MAY_ENABLE_LLM === '1') _flags.ENABLE_LLM = true;
        if (process.env.MAY_ENABLE_LLM_COACHING === '1') _flags.ENABLE_LLM_COACHING = true;
        if (process.env.MAY_ENABLE_LLM_SUMMARIES === '1') _flags.ENABLE_LLM_SUMMARIES = true;
        if (process.env.MAY_ENABLE_AZURE_OPENAI_PROVIDER === '1') _flags.ENABLE_AZURE_OPENAI_PROVIDER = true;
        if (process.env.MAY_ENABLE_OPENAI_PROVIDER === '1') _flags.ENABLE_OPENAI_PROVIDER = true;
        if (process.env.MAY_ENABLE_ADAPTIVE_COACHING === '1') _flags.ENABLE_ADAPTIVE_COACHING = true;
        if (process.env.MAY_ENABLE_READINESS_SCORING === '1') _flags.ENABLE_READINESS_SCORING = true;
      }
      if (typeof process !== 'undefined' && process.env && process.env.CMA_MAY_PILOT === '1') {
        _flags.ENABLE_CONTEXT_BUILDER = true;
        _flags.ENABLE_COACHING_ROUTER = true;
      }
    } catch (e) { /* browser env */ }
  }

  applyEnvOverrides();

  return {
    isEnabled: isEnabled,
    setFlag: setFlag,
    getAll: getAll,
    getChangeLog: getChangeLog,
    snapshot: snapshot,
    syncToMayConfig: syncToMayConfig,
    FLAGS: _flags
  };

})();

if (typeof window !== 'undefined') {
  window.MayFeatureFlags = MayFeatureFlags;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MayFeatureFlags;
}
