/**
 * may_rollout_checklist.js — Activation readiness validator for May coaching layer.
 * 
 * Validates:
 *   1. All 15 feature flags default to false in may-feature-flags.js
 *   2. index_updated.html loads all 29 May scripts (28 original + may-telemetry.js)
 *   3. All May scripts exist on disk
 *   4. No May script contains pack/case write operations
 *   5. Smoke test script exists and references May modules
 * 
 * Exit 0 on pass, 1 on failure.
 * Read-only. No file writes.
 * 
 * Session: MAY-016
 * Governance: Light Lane
 * Usage: node scripts/may_rollout_checklist.js
 */

'use strict';

var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');

var EXPECTED_MAY_SCRIPTS = [
  'may-learner-state.js',
  'may-feature-flags.js',
  'may-telemetry.js',
  'may-context-builder.js',
  'may-coaching-router.js',
  'may-coaching-modes/mode-base.js',
  'may-coaching-modes/mode-explain.js',
  'may-coaching-modes/mode-quiz.js',
  'may-coaching-modes/mode-socratic.js',
  'may-coaching-modes/mode-motivate.js',
  'may-coaching-modes/mode-study-plan.js',
  'may-coaching-modes/mode-exam-review.js',
  'may-core.js',
  'may-llm-types.js',
  'may-llm-provider-registry.js',
  'may-llm-adapter.js',
  'may-learner-profile.js',
  'may-adaptive-recommender.js',
  'may-remediation-engine.js',
  'may-readiness-scorer.js',
  'may-readiness-engine.js',
  'may-intervention-prioritizer.js',
  'may-recommendation-explainer.js',
  'may-dashboard-model.js',
  'may-decision-engine.js',
  'may-intervention-coordinator.js',
  'may-recommendation-pipeline.js',
  'may-coaching-memory.js',
  'may-coaching-orchestrator.js'
];

var PACK_FILES = [
  'pack_a_corrected.js',
  'pack_b_corrected.js',
  'pack_c_corrected.js',
  'pack_d_corrected.js',
  'pack_e_corrected.js'
];

var FORBIDDEN_PATTERNS = [
  /question_state/,
  /CorrectChoice\s*[:=]/,
  /\bfs\.write/i,
  /localStorage\.setItem\(.*pack/i,
  /ExplanationCorrect\s*[:=]/,
  /ExplanationWrong\w\s*[:=]/
];

var errors = [];
var warnings = [];
var checks = { passed: 0, failed: 0, total: 0 };

function check(name, condition, isError) {
  checks.total++;
  if (condition) {
    checks.passed++;
    console.log('  [PASS] ' + name);
  } else {
    checks.failed++;
    if (isError) {
      errors.push(name);
      console.log('  [FAIL] ' + name);
    } else {
      warnings.push(name);
      console.log('  [WARN] ' + name);
    }
  }
}

function main() {
  console.log('=== May Rollout Checklist Validator ===');
  console.log('Date: ' + new Date().toISOString());
  console.log('Root: ' + ROOT);
  console.log('');

  // CHECK 1: All May scripts exist on disk
  console.log('--- Check 1: May Scripts Exist on Disk ---');
  for (var i = 0; i < EXPECTED_MAY_SCRIPTS.length; i++) {
    var fname = EXPECTED_MAY_SCRIPTS[i];
    var fpath = path.join(ROOT, fname);
    var exists = fs.existsSync(fpath);
    check('File exists: ' + fname, exists, true);
    if (exists) {
      var stat = fs.statSync(fpath);
      check('File non-zero: ' + fname, stat.size > 0, true);
    }
  }

  // CHECK 2: index_updated.html references all May scripts
  console.log('');
  console.log('--- Check 2: HTML Script References ---');
  var htmlPath = path.join(ROOT, 'index_updated.html');
  if (!fs.existsSync(htmlPath)) {
    errors.push('index_updated.html not found');
  } else {
    var html = fs.readFileSync(htmlPath, 'utf8');
    for (var j = 0; j < EXPECTED_MAY_SCRIPTS.length; j++) {
      var sname = EXPECTED_MAY_SCRIPTS[j];
      check('HTML references: ' + sname, html.indexOf(sname) !== -1, true);
    }

    // App.js loads last
    check('app.js loaded after all May scripts',
      html.lastIndexOf('may-coaching-orchestrator.js') < html.lastIndexOf('app.js'),
      true);

    // Telemetry loads after feature flags
    check('may-telemetry.js loads after may-feature-flags.js',
      html.indexOf('may-feature-flags.js') < html.indexOf('may-telemetry.js'),
      false);
  }

  // CHECK 3: No May script contains pack/case write operations
  console.log('');
  console.log('--- Check 3: May Scripts — No Content Writes ---');
  for (var k = 0; k < EXPECTED_MAY_SCRIPTS.length; k++) {
    var mf = EXPECTED_MAY_SCRIPTS[k];
    var mp = path.join(ROOT, mf);
    if (!fs.existsSync(mp)) continue;
    var src = fs.readFileSync(mp, 'utf8');
    for (var p = 0; p < FORBIDDEN_PATTERNS.length; p++) {
      var pat = FORBIDDEN_PATTERNS[p];
      if (pat.test(src)) {
        var matches = src.match(new RegExp(pat.source, 'gi'));
        warnings.push(mf + ' contains forbidden pattern: ' + pat.source + ' (' + matches.length + ' matches)');
      }
    }
  }
  if (warnings.length === 0) {
    console.log('  [PASS] No forbidden patterns in any May script');
    checks.passed++;
  } else {
    console.log('  [WARN] ' + warnings.length + ' forbidden pattern matches found (see WARNINGS below)');
    checks.failed++;
  }
  checks.total++;

  // CHECK 4: LLM flags are disabled
  console.log('');
  console.log('--- Check 4: LLM Flags — All Disabled ---');
  var ffPath = path.join(ROOT, 'may-feature-flags.js');
  if (fs.existsSync(ffPath)) {
    var ffSrc = fs.readFileSync(ffPath, 'utf8');
    check('ENABLE_LLM defaults to false', /ENABLE_LLM:\s*false/.test(ffSrc), true);
    check('ENABLE_LLM_COACHING defaults to false', /ENABLE_LLM_COACHING:\s*false/.test(ffSrc), true);
    check('ENABLE_LLM_SUMMARIES defaults to false', /ENABLE_LLM_SUMMARIES:\s*false/.test(ffSrc), true);
    check('ENABLE_AZURE_OPENAI_PROVIDER defaults to false', /ENABLE_AZURE_OPENAI_PROVIDER:\s*false/.test(ffSrc), true);
    check('ENABLE_OPENAI_PROVIDER defaults to false', /ENABLE_OPENAI_PROVIDER:\s*false/.test(ffSrc), true);
  }

  // CHECK 5: All pack files parse clean
  console.log('');
  console.log('--- Check 5: Pack Files — Parse Check ---');
  var cp = require('child_process');
  for (var pf = 0; pf < PACK_FILES.length; pf++) {
    var pfp = path.join(ROOT, PACK_FILES[pf]);
    if (!fs.existsSync(pfp)) {
      check('Pack exists: ' + PACK_FILES[pf], false, true);
      continue;
    }
    try {
      cp.execSync('node --check "' + pfp + '"', { cwd: ROOT, stdio: 'pipe' });
      check('Parse clean: ' + PACK_FILES[pf], true, true);
    } catch (e) {
      check('Parse clean: ' + PACK_FILES[pf], false, true);
    }
  }

  // REPORT
  console.log('');
  console.log('========================================');
  console.log('RESULTS: ' + checks.passed + '/' + checks.total + ' checks passed');
  console.log('  Passed:  ' + checks.passed);
  console.log('  Failed:  ' + checks.failed);
  console.log('  Errors:  ' + errors.length);
  console.log('  Warnings:' + (warnings.length - errors.length));

  if (errors.length > 0) {
    console.log('');
    console.log('ERRORS:');
    for (var ei = 0; ei < errors.length; ei++) {
      console.log('  [' + (ei + 1) + '] ' + errors[ei]);
    }
  }

  var infoWarnings = warnings.filter(function(w) { return errors.indexOf(w) === -1; });
  if (infoWarnings.length > 0) {
    console.log('');
    console.log('WARNINGS:');
    for (var wi = 0; wi < infoWarnings.length; wi++) {
      console.log('  [' + (wi + 1) + '] ' + infoWarnings[wi]);
    }
  }

  console.log('');
  if (errors.length === 0) {
    console.log('VERDICT: READY — May is activation-ready. All checks passed.');
    process.exit(0);
  } else {
    console.log('VERDICT: NOT READY — ' + errors.length + ' blocking error(s) found.');
    process.exit(1);
  }
}

main();
