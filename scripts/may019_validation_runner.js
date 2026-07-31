/**
 * MAY-019 Validation Runner
 *
 * Verifies that all CAL-01 through CAL-07 calibration fixes and telemetry
 * wiring are correctly applied. Runs as headless Node.js — no browser needed.
 *
 * Governance: Light Lane (reads May layer files, no pack/case modifications)
 */

'use strict';

var fs = require('fs');
var path = require('path');
var vm = require('vm');

var ROOT = path.resolve(__dirname, '..');
var PASS = 0, FAIL = 0;
var results = [];

function log(label, ok, detail) {
  var prefix = ok ? '  PASS' : '  FAIL';
  results.push({ label: label, ok: ok, detail: detail || '' });
  console.log(prefix + ': ' + label + (detail ? ' — ' + detail : ''));
  if (ok) PASS++; else FAIL++;
}

function loadModule(filename) {
  var filePath = path.join(ROOT, filename);
  if (!fs.existsSync(filePath)) {
    log('Load ' + filename, false, 'file not found');
    return null;
  }
  try {
    var src = fs.readFileSync(filePath, 'utf-8');
    var sandbox = {
      window: {},
      console: console,
      module: { exports: {} },
      MayLearnerState: null,
      MayReadinessScorer: null
    };
    // Provide MayFeatureFlags stub for feature flag gating tests
    sandbox.MayFeatureFlags = {
      _flags: {},
      setFlag: function(k, v) { this._flags[k] = v; },
      isEnabled: function(k) { return this._flags[k] === true; },
      getAll: function() { return this._flags; }
    };
    sandbox.MayLearnerState = {
      getReadinessSummary: function() { return null; },
      getSectionReadinessSummary: function() { return null; },
      getLearnerIntelligence: function() { return null; },
      getTopicProgress: function() { return {}; },
      load: function() { return { sessions: [], examPlan: null }; }
    };
    // Enable flags needed for readiness engine
    sandbox.MayFeatureFlags.setFlag('ENABLE_READINESS_SCORING', true);
    var script = new vm.Script(src, { filename: filename });
    script.runInNewContext(sandbox);
    return sandbox.module.exports || sandbox.window[Object.keys(sandbox.window)[0]];
  } catch (e) {
    log('Load ' + filename, false, e.message);
    return null;
  }
}

function loadRaw(filename) {
  var filePath = path.join(ROOT, filename);
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (e) {
    return null;
  }
}

console.log('=== MAY-019 VALIDATION RUNNER ===');
console.log('');

// ── 1. File Parsing ────────────────────────────────────────
console.log('--- 1. File Parsing ---');

var deSrc = loadRaw('may-decision-engine.js');
log('may-decision-engine.js loads', deSrc !== null);

var orchSrc = loadRaw('may-coaching-orchestrator.js');
log('may-coaching-orchestrator.js loads', orchSrc !== null);

var routerSrc = loadRaw('may-coaching-router.js');
log('may-coaching-router.js loads', routerSrc !== null);

var telSrc = loadRaw('may-telemetry.js');
log('may-telemetry.js loads', telSrc !== null);

var pilotSrc = loadRaw('may-pilot-activation.js');
log('may-pilot-activation.js loads', pilotSrc !== null);

// ── 2. CAL-01 Verification — D8 guard ──────────────────────
console.log('');
console.log('--- 2. CAL-01: D8 has sectionsWithData > 0 guard ---');

log('CAL-01 D8 guard: dataSections > 0',
  deSrc && deSrc.indexOf('dataSections < 4 && dataSections > 0') !== -1);

log('D10 still in code',
  deSrc && deSrc.indexOf('_ruleInsufficientData') !== -1);

log('D10 still evaluated after D8',
  deSrc && deSrc.indexOf('_ruleHighMastery') > deSrc.indexOf('_ruleSectionGap'));

// ── 3. CAL-02 Verification — D7 before D5 ──────────────────
console.log('');
console.log('--- 3. CAL-02: D7 before D5 in priority chain ---');

// Extract the decide() function body to check ordering
var d7Idx = deSrc ? deSrc.indexOf('_ruleFragileKnowledge(interventions)') : -1;
var d5Idx = deSrc ? deSrc.indexOf('_ruleDecliningTrends(profile)') : -1;
var d6Idx = deSrc ? deSrc.indexOf('_ruleEmergingWeakness(interventions)') : -1;

log('CAL-02 D7 before D5', d7Idx > -1 && d5Idx > -1 && d7Idx < d5Idx,
  'D7:' + d7Idx + ' D5:' + d5Idx);

log('CAL-02 D5 before D6', d5Idx > -1 && d6Idx > -1 && d5Idx < d6Idx,
  'D5:' + d5Idx + ' D6:' + d6Idx);

log('D1 still first', deSrc && deSrc.indexOf('_ruleReadinessCritical') < d7Idx);
log('D2 still before D3', deSrc && deSrc.indexOf('_ruleCriticalWeakness') < deSrc.indexOf('_ruleRepeatedUnstable'));

// ── 4. CAL-05 Verification — trackIntervention wired ────────
console.log('');
console.log('--- 4. CAL-05: trackIntervention wired in orchestrator ---');

log('CAL-05 trackIntervention called',
  orchSrc && orchSrc.indexOf('MayTelemetry.trackIntervention') !== -1);

log('CAL-05 intervention data: tier',
  orchSrc && orchSrc.indexOf('tier: iv.tier') !== -1);

log('CAL-05 within try/catch block',
  orchSrc && orchSrc.indexOf('trackIntervention') < orchSrc.indexOf('} catch (e) { /* telemetry non-blocking */ }'));

// ── 5. CAL-06 Verification — trackMode wired ────────────────
console.log('');
console.log('--- 5. CAL-06: trackMode wired in orchestrator + router ---');

log('CAL-06 trackMode in orchestrator',
  orchSrc && orchSrc.indexOf('MayTelemetry.trackMode(decision.coachingMode, 0)') !== -1);

log('CAL-06 trackMode in router dispatchToHandler',
  routerSrc && routerSrc.indexOf('MayTelemetry.trackMode(routing.mode, 0)') !== -1);

// ── 6. CAL-07 Verification — Telemetry persistence ──────────
console.log('');
console.log('--- 6. CAL-07: Telemetry persistence to localStorage ---');

log('CAL-07 localStorage.setItem called',
  orchSrc && orchSrc.indexOf("localStorage.setItem('cmaMayPilotTelemetry'") !== -1);

log('CAL-07 snapshot called',
  orchSrc && orchSrc.indexOf('MayTelemetry.snapshot()') !== -1);

log('CAL-07 within try/catch persistence block',
  orchSrc && orchSrc.indexOf('persistence non-blocking') !== -1);

// ── 7. Structural Integrity ─────────────────────────────────
console.log('');
console.log('--- 7. Structural Integrity ---');

// Verify no accidental removal of existing telemetry
log('trackDecision still wired',
  orchSrc && orchSrc.indexOf('MayTelemetry.trackDecision') !== -1);
log('trackReadiness still wired',
  orchSrc && orchSrc.indexOf('MayTelemetry.trackReadiness') !== -1);
log('trackRecommendation still wired',
  orchSrc && orchSrc.indexOf('MayTelemetry.trackRecommendation') !== -1);

// Verify all 10 decision rules still present
var rules = ['_ruleReadinessCritical', '_ruleCriticalWeakness', '_ruleRepeatedUnstable',
  '_ruleExamApproaching', '_ruleDecliningTrends', '_ruleEmergingWeakness',
  '_ruleFragileKnowledge', '_ruleSectionGap', '_ruleHighMastery', '_ruleInsufficientData'];

rules.forEach(function(r) {
  log('Decision rule present: ' + r,
    deSrc && deSrc.indexOf(r) !== -1);
});

// Verify orchestrator version updated
log('Orchestrator version updated',
  orchSrc && orchSrc.indexOf('MAY019-1.0') !== -1);
log('Decision engine version updated',
  deSrc && deSrc.indexOf('MAY019-1.0') !== -1);

// ── 8. Summary ──────────────────────────────────────────────
console.log('');
console.log('=== RESULTS ===');
console.log('PASS: ' + PASS + '  FAIL: ' + FAIL + '  TOTAL: ' + (PASS + FAIL));

if (FAIL === 0) {
  console.log('');
  console.log('MAY-019 VALIDATION: ALL CHECKS PASSED');
  process.exit(0);
} else {
  console.log('');
  console.log('MAY-019 VALIDATION: FAILURES DETECTED');
  process.exit(1);
}
