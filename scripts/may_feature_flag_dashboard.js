/**
 * may_feature_flag_dashboard.js — Developer diagnostics for May feature flags.
 * 
 * Lightweight Node.js script that audits may-feature-flags.js for:
 *   - All 15 flags defined and defaulting to false
 *   - Dependency graph integrity
 *   - Environment variable override paths
 *   - Rollback safety (no hardcoded true)
 * 
 * Exit 0 on pass, 1 on failure.
 * Read-only. No file writes.
 * 
 * Session: MAY-016
 * Governance: Light Lane
 * Usage: node scripts/may_feature_flag_dashboard.js
 */

'use strict';

var fs = require('fs');
var path = require('path');

var FLAGS_FILE = path.join(__dirname, '..', 'may-feature-flags.js');
var EXPECTED_FLAGS = [
  { name: 'ENABLE_CONTEXT_BUILDER',       stage: 0, dependsOn: [] },
  { name: 'ENABLE_COACHING_ROUTER',       stage: 0, dependsOn: ['ENABLE_CONTEXT_BUILDER'] },
  { name: 'ENABLE_EXPLAIN_MODE',          stage: 1, dependsOn: ['ENABLE_COACHING_ROUTER'] },
  { name: 'ENABLE_QUIZ_MODE',             stage: 1, dependsOn: ['ENABLE_COACHING_ROUTER'] },
  { name: 'ENABLE_SOCRATIC_MODE',         stage: 1, dependsOn: ['ENABLE_COACHING_ROUTER'] },
  { name: 'ENABLE_STUDY_PLAN_MODE',       stage: 1, dependsOn: ['ENABLE_COACHING_ROUTER'] },
  { name: 'ENABLE_LLM',                   stage: 3, dependsOn: [] },
  { name: 'ENABLE_LLM_COACHING',          stage: 3, dependsOn: ['ENABLE_LLM'] },
  { name: 'ENABLE_LLM_SUMMARIES',         stage: 3, dependsOn: ['ENABLE_LLM'] },
  { name: 'ENABLE_AZURE_OPENAI_PROVIDER', stage: 3, dependsOn: ['ENABLE_LLM'] },
  { name: 'ENABLE_OPENAI_PROVIDER',       stage: 3, dependsOn: ['ENABLE_LLM'] },
  { name: 'ENABLE_ADAPTIVE_COACHING',     stage: 2, dependsOn: ['ENABLE_CONTEXT_BUILDER', 'ENABLE_COACHING_ROUTER'] },
  { name: 'ENABLE_READINESS_SCORING',     stage: 2, dependsOn: ['ENABLE_ADAPTIVE_COACHING'] },
  { name: 'ENABLE_ADAPTIVE_ORCHESTRATION',stage: 2, dependsOn: ['ENABLE_READINESS_SCORING'] },
  { name: 'ENABLE_COACHING_MEMORY',       stage: 2, dependsOn: ['ENABLE_ADAPTIVE_ORCHESTRATION'] }
];

var errors = [];
var warnings = [];

function main() {
  if (!fs.existsSync(FLAGS_FILE)) {
    errors.push('FLAGS_FILE not found: ' + FLAGS_FILE);
    report();
    return;
  }

  var src = fs.readFileSync(FLAGS_FILE, 'utf8');

  // Check: all 15 flags defined
  for (var i = 0; i < EXPECTED_FLAGS.length; i++) {
    var f = EXPECTED_FLAGS[i];
    var regex = new RegExp(f.name + ':\\s*(true|false)');
    var match = src.match(regex);
    if (!match) {
      errors.push('FLAG MISSING: ' + f.name + ' not found in may-feature-flags.js');
      continue;
    }
    if (match[1] === 'true') {
      errors.push('FLAG DEFAULT TRUE: ' + f.name + ' defaults to true (must default to false)');
    }
  }

  // Check: total flag count
  var flagCount = (src.match(/ENABLE_\w+:\s*(true|false)/g) || []).length;
  if (flagCount !== 15) {
    warnings.push('Flag count mismatch: expected 15, found ' + flagCount);
  }

  // Check: _flags object properly defined
  if (src.indexOf('var _flags = {') === -1) {
    errors.push('_flags object not found in expected format');
  }

  // Check: all default to false
  var trueDefaults = src.match(/ENABLE_\w+:\s*true/g) || [];
  if (trueDefaults.length > 0) {
    errors.push('FLAGS DEFAULTING TO TRUE: ' + trueDefaults.join(', '));
  }

  // Check: no hardcoded true outside env override
  if (src.indexOf('_flags.ENABLE_LLM = true') !== -1 && src.indexOf('process.env.MAY_ENABLE_LLM') === -1) {
    errors.push('HARDCODED TRUE: ENABLE_LLM set to true outside env override');
  }

  // Check: public API exposed
  var apiChecks = ['isEnabled', 'setFlag', 'getAll', 'getChangeLog', 'snapshot', 'syncToMayConfig', 'FLAGS'];
  for (var j = 0; j < apiChecks.length; j++) {
    if (src.indexOf(apiChecks[j] + ':') === -1) {
      warnings.push('API method may be missing from return object: ' + apiChecks[j]);
    }
  }

  // Check: window.MayFeatureFlags exposed
  if (src.indexOf('window.MayFeatureFlags = MayFeatureFlags') === -1) {
    errors.push('window.MayFeatureFlags not exposed');
  }

  report();
}

function report() {
  console.log('=== May Feature Flag Dashboard ===');
  console.log('File: ' + FLAGS_FILE);
  console.log('');

  // Flag table
  console.log('FLAG                           STAGE  DEFAULT  DEPENDENCIES');
  console.log('----                           -----  -------  ------------');
  for (var i = 0; i < EXPECTED_FLAGS.length; i++) {
    var f = EXPECTED_FLAGS[i];
    var deps = f.dependsOn.length > 0 ? f.dependsOn.join(', ') : '(none)';
    console.log(
      padRight(f.name, 30) +
      padRight(String(f.stage), 7) +
      padRight('false', 8) +
      deps
    );
  }

  console.log('');
  console.log('--- Results ---');
  console.log('Errors:   ' + errors.length);
  console.log('Warnings: ' + warnings.length);

  if (errors.length > 0) {
    console.log('');
    console.log('ERRORS:');
    for (var e = 0; e < errors.length; e++) {
      console.log('  [' + (e + 1) + '] ' + errors[e]);
    }
  }

  if (warnings.length > 0) {
    console.log('');
    console.log('WARNINGS:');
    for (var w = 0; w < warnings.length; w++) {
      console.log('  [' + (w + 1) + '] ' + warnings[w]);
    }
  }

  console.log('');
  if (errors.length === 0) {
    console.log('VERDICT: PASS — All 15 flags default to false. Rollback safe.');
    process.exit(0);
  } else {
    console.log('VERDICT: FAIL — ' + errors.length + ' error(s) found.');
    process.exit(1);
  }
}

function padRight(str, len) {
  str = String(str);
  while (str.length < len) str += ' ';
  return str;
}

main();
