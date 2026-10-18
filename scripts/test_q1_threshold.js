#!/usr/bin/env node
/**
 * test_q1_threshold.js — Synthetic Q1 Telemetry Threshold Benchmark
 *
 * Tests whether the Q1 deferral gate (>15% resume within 30min + >20% re-contextualization)
 * would trigger under realistic usage patterns. The `buffer-was-lost-on-resume` counter is
 * design-phase only (not implemented); this test simulates it.
 *
 * Uses the same seeded RNG as simulate_may_telemetry.js for reproducibility.
 *
 * Governance: Light Lane — no pack/case/content writes.
 *
 * Usage:
 *   node scripts/test_q1_threshold.js
 *   node scripts/test_q1_threshold.js --scenarios conservative,moderate,aggressive
 *   node scripts/test_q1_threshold.js --sessions 1000 --days 30
 */

var fs = require('fs');
var path = require('path');

// ── Seeded RNG (mulberry32, same as simulate_may_telemetry.js) ──
function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// ── Q1 Threshold Constants ──
var Q1_THRESHOLDS = {
  resumeWithin30min: 0.15,   // >15% of sessions resume within 30min of pause
  recontextualizationRate: 0.20  // >20% re-ask same question after refresh
};

// ── Baseline Metrics (from simulate_may_telemetry.js) ──
var BASELINE = {
  totalSessions: 500,
  abandonRate: 0.08,         // 8% T5 abandon
  avgSessionDurationMin: 19, // 8-30 min range, midpoint ~19
  t1AcceptanceRate: 0.55,    // ~55% across weakest+strongest
  t6DegradationRate: 0.012   // 1.2% per 1k
};

// ── Scenario Definitions ──
var SCENARIOS = {
  // Conservative: low resume rate, low re-contextualization
  conservative: {
    label: 'Conservative (low engagement)',
    sessionCount: 500,
    days: 30,
    resumeRate: 0.10,          // 10% of sessions are resumes
    resumeWithin30MinRate: 0.05, // 5% resume within 30min (< Q1 15%)
    recontextRate: 0.08,       // 8% re-ask same question (< Q1 20%)
    avgPauseBeforeResumeMin: 45,
    questionsPerSession: 8,
    uniqueQuestionPool: 200
  },
  // Moderate: typical engagement
  moderate: {
    label: 'Moderate (typical usage)',
    sessionCount: 500,
    days: 30,
    resumeRate: 0.20,
    resumeWithin30MinRate: 0.12, // 12% (< Q1 15%, close)
    recontextRate: 0.15,         // 15% (< Q1 20%)
    avgPauseBeforeResumeMin: 30,
    questionsPerSession: 10,
    uniqueQuestionPool: 200
  },
  // Aggressive: high engagement, likely to trigger Q1
  aggressive: {
    label: 'Aggressive (power users)',
    sessionCount: 500,
    days: 30,
    resumeRate: 0.30,
    resumeWithin30MinRate: 0.22, // 22% (> Q1 15%)
    recontextRate: 0.28,         // 28% (> Q1 20%)
    avgPauseBeforeResumeMin: 18,
    questionsPerSession: 12,
    uniqueQuestionPool: 200
  },
  // Stress: worst-case that would definitely trigger
  stress: {
    label: 'Stress (max engagement)',
    sessionCount: 1000,
    days: 30,
    resumeRate: 0.40,
    resumeWithin30MinRate: 0.35,
    recontextRate: 0.40,
    avgPauseBeforeResumeMin: 10,
    questionsPerSession: 15,
    uniqueQuestionPool: 200
  }
};

function parseArgs() {
  var args = process.argv.slice(2);
  var opts = { scenarios: Object.keys(SCENARIOS), sessions: null, days: 30, seed: 20260921 };
  for (var i = 0; i < args.length; i++) {
    if (args[i] === '--scenarios' && args[i+1]) { opts.scenarios = args[++i].split(','); }
    else if (args[i] === '--sessions' && args[i+1]) { opts.sessions = parseInt(args[++i], 10); }
    else if (args[i] === '--days' && args[i+1]) { opts.days = parseInt(args[++i], 10); }
    else if (args[i] === '--seed' && args[i+1]) { opts.seed = parseInt(args[++i], 10); }
  }
  return opts;
}

// ── Generate synthetic sessions for one scenario ──
function generateSessions(scenario, seed, globalDayMs) {
  var rng = mulberry32(seed);
  var sessions = [];
  var now = Date.now();
  var dayMs = globalDayMs;

  for (var s = 0; s < scenario.sessionCount; s++) {
    var dayOffset = Math.floor((s / scenario.sessionCount) * scenario.days);
    var jitter = Math.floor(rng() * dayMs);
    var sessionStart = now - (scenario.days - dayOffset) * dayMs + jitter;

    var isResume = rng() < scenario.resumeRate;
    var pausedWithin30Min = false;
    var pauseDurationMs = 0;
    var recontextualized = false;
    var questionsAnswered = Math.floor(3 + rng() * scenario.questionsPerSession);
    var questionsReAsked = 0;

    if (isResume) {
      // Simulate pause before this session
      pauseDurationMs = Math.floor((0.5 + rng() * scenario.avgPauseBeforeResumeMin * 2) * 60 * 1000);
      pausedWithin30Min = pauseDurationMs <= 30 * 60 * 1000;

      // Re-contextualization: learner re-asks questions from the previous session
      if (rng() < scenario.recontextRate) {
        recontextualized = true;
        // Number of re-asked questions (1-3)
        questionsReAsked = Math.floor(1 + rng() * 3);
      }
    }

    // T5-compatible session duration
    var durationMs = Math.floor(8 * 60 * 1000 + rng() * 22 * 60 * 1000);
    var abandoned = rng() < BASELINE.abandonRate;
    if (abandoned) durationMs = Math.floor(2 * 60 * 1000 + rng() * 6 * 60 * 1000);

    sessions.push({
      sessionIdx: s,
      timestamp: new Date(sessionStart).toISOString(),
      isResume: isResume,
      pausedWithin30Min: pausedWithin30Min,
      pauseDurationMs: pauseDurationMs,
      recontextualized: recontextualized,
      questionsReAsked: questionsReAsked,
      questionsAnswered: questionsAnswered,
      durationMs: durationMs,
      abandoned: abandoned
    });
  }

  return sessions;
}

// ── Compute metrics from synthetic sessions ──
function computeMetrics(sessions) {
  var total = sessions.length;
  var resumes = sessions.filter(function(s) { return s.isResume; });
  var resumeCount = resumes.length;
  var resumeWithin30Min = resumes.filter(function(s) { return s.pausedWithin30Min; });
  var recontextualized = sessions.filter(function(s) { return s.recontextualized; });

  var totalQuestions = sessions.reduce(function(sum, s) { return sum + s.questionsAnswered; }, 0);
  var totalReAsked = sessions.reduce(function(sum, s) { return sum + s.questionsReAsked; }, 0);

  var avgDuration = sessions.reduce(function(sum, s) { return sum + s.durationMs; }, 0) / total;
  var abandonCount = sessions.filter(function(s) { return s.abandoned; }).length;

  var resumeRate = resumeCount / total;
  var resumeWithin30MinRate = resumeCount > 0 ? resumeWithin30Min.length / resumeCount : 0;
  var resumeWithin30MinOverallRate = resumeWithin30Min.length / total;
  var recontextRate = totalQuestions > 0 ? totalReAsked / totalQuestions : 0;
  var recontextSessionRate = recontextualized.length / total;

  // Q1 gate check
  var q1ResumeTrigger = resumeWithin30MinOverallRate > Q1_THRESHOLDS.resumeWithin30min;
  var q1RecontextTrigger = recontextSessionRate > Q1_THRESHOLDS.recontextualizationRate;
  var q1GateOpen = q1ResumeTrigger && q1RecontextTrigger;

  return {
    totalSessions: total,
    resumeCount: resumeCount,
    resumeRate: resumeRate,
    resumeWithin30MinCount: resumeWithin30Min.length,
    resumeWithin30MinRate: resumeWithin30MinRate,
    resumeWithin30MinOverallRate: resumeWithin30MinOverallRate,
    recontextualizedCount: recontextualized.length,
    recontextSessionRate: recontextSessionRate,
    totalQuestions: totalQuestions,
    totalReAsked: totalReAsked,
    recontextQuestionRate: recontextRate,
    avgDurationMs: avgDuration,
    avgDurationMin: avgDuration / 60000,
    abandonCount: abandonCount,
    abandonRate: abandonCount / total,
    q1ResumeTrigger: q1ResumeTrigger,
    q1RecontextTrigger: q1RecontextTrigger,
    q1GateOpen: q1GateOpen
  };
}

// ── Benchmark against existing T5 baseline ──
function benchmarkAgainstBaseline(metrics) {
  var benchmarks = [];

  // Abandon rate vs T5 baseline
  var abandonDelta = metrics.abandonRate - BASELINE.abandonRate;
  benchmarks.push({
    metric: 'Abandon rate',
    synthetic: (metrics.abandonRate * 100).toFixed(1) + '%',
    baseline: (BASELINE.abandonRate * 100).toFixed(1) + '%',
    delta: (abandonDelta > 0 ? '+' : '') + (abandonDelta * 100).toFixed(1) + '%',
    withinTolerance: Math.abs(abandonDelta) < 0.03,
    verdict: Math.abs(abandonDelta) < 0.03 ? 'MATCH' : 'DEVIATED'
  });

  // Session duration
  var durationDelta = metrics.avgDurationMin - BASELINE.avgSessionDurationMin;
  benchmarks.push({
    metric: 'Avg session duration',
    synthetic: metrics.avgDurationMin.toFixed(1) + ' min',
    baseline: BASELINE.avgSessionDurationMin + ' min',
    delta: (durationDelta > 0 ? '+' : '') + durationDelta.toFixed(1) + ' min',
    withinTolerance: Math.abs(durationDelta) < 5,
    verdict: Math.abs(durationDelta) < 5 ? 'MATCH' : 'DEVIATED'
  });

  // Resume rate (new metric, no baseline — establish anchor)
  benchmarks.push({
    metric: 'Resume rate',
    synthetic: (metrics.resumeRate * 100).toFixed(1) + '%',
    baseline: 'N/A (new)',
    delta: 'anchor',
    withinTolerance: true,
    verdict: 'ANCHOR'
  });

  // Re-contextualization rate (new metric)
  benchmarks.push({
    metric: 'Re-contextualization rate (sessions)',
    synthetic: (metrics.recontextSessionRate * 100).toFixed(1) + '%',
    baseline: 'N/A (new)',
    delta: 'anchor',
    withinTolerance: true,
    verdict: 'ANCHOR'
  });

  return benchmarks;
}

// ── Main ──
function main() {
  var opts = parseArgs();
  var dayMs = 24 * 60 * 60 * 1000;
  var results = {};

  console.log('═══════════════════════════════════════════════════════');
  console.log('Q1 Telemetry Threshold — Synthetic Benchmark');
  console.log('Seed: ' + opts.seed + ' | Days: ' + opts.days);
  console.log('Q1 Gates: resume>30min=' + (Q1_THRESHOLDS.resumeWithin30min * 100) + '%  recontext=' + (Q1_THRESHOLDS.recontextualizationRate * 100) + '%');
  console.log('═══════════════════════════════════════════════════════\n');

  opts.scenarios.forEach(function(key) {
    var scenario = SCENARIOS[key];
    if (!scenario) { console.log('[SKIP] Unknown scenario: ' + key); return; }

    // Override session count if provided
    var sc = Object.assign({}, scenario);
    if (opts.sessions) sc.sessionCount = opts.sessions;
    sc.days = opts.days;

    var sessions = generateSessions(sc, opts.seed + key.length, dayMs);
    var metrics = computeMetrics(sessions);
    var benchmarks = benchmarkAgainstBaseline(metrics);

    results[key] = { scenario: sc.label, metrics: metrics, benchmarks: benchmarks };

    console.log('─── ' + sc.label + ' (' + sc.sessionCount + ' sessions / ' + sc.days + ' days) ───');
    console.log('  Resumes: ' + metrics.resumeCount + '/' + metrics.totalSessions + ' (' + (metrics.resumeRate * 100).toFixed(1) + '%)');
    console.log('  Resume within 30min: ' + metrics.resumeWithin30MinCount + '/' + metrics.resumeCount + ' (' + (metrics.resumeWithin30MinRate * 100).toFixed(1) + '% of resumes; ' + (metrics.resumeWithin30MinOverallRate * 100).toFixed(1) + '% of all sessions)');
    console.log('  Re-contextualized: ' + metrics.recontextualizedCount + '/' + metrics.totalSessions + ' (' + (metrics.recontextSessionRate * 100).toFixed(1) + '% sessions; ' + (metrics.recontextQuestionRate * 100).toFixed(1) + '% of questions)');
    console.log('  Avg duration: ' + metrics.avgDurationMin.toFixed(1) + ' min');
    console.log('  Abandon rate: ' + (metrics.abandonRate * 100).toFixed(1) + '% (' + metrics.abandonCount + '/' + metrics.totalSessions + ')');
    console.log('');

    // Q1 gate verdict
    console.log('  Q1 Gate Check:');
    console.log('    Resume >30min threshold: ' + (metrics.resumeWithin30MinOverallRate * 100).toFixed(1) + '% vs ' + (Q1_THRESHOLDS.resumeWithin30min * 100) + '% → ' + (metrics.q1ResumeTrigger ? 'TRIGGERED' : 'below'));
    console.log('    Re-context threshold:    ' + (metrics.recontextSessionRate * 100).toFixed(1) + '% vs ' + (Q1_THRESHOLDS.recontextualizationRate * 100) + '% → ' + (metrics.q1RecontextTrigger ? 'TRIGGERED' : 'below'));
    console.log('    Q1 Gate: ' + (metrics.q1GateOpen ? '*** OPEN — persistence would be authorized ***' : 'CLOSED — buffer stays in-memory only'));
    console.log('');

    // Baseline benchmarks
    console.log('  Baseline Benchmarks:');
    benchmarks.forEach(function(b) {
      var marker = b.verdict === 'MATCH' ? '✓' : b.verdict === 'ANCHOR' ? '○' : '✗';
      console.log('    ' + marker + ' ' + b.metric + ': ' + b.synthetic + ' vs ' + b.baseline + ' (' + b.delta + ') — ' + b.verdict);
    });
    console.log('');
  });

  // ── Summary table ──
  console.log('═══════════════════════════════════════════════════════');
  console.log('SUMMARY');
  console.log('═══════════════════════════════════════════════════════');
  console.log('');
  console.log('Scenario              | Resume% | <30min% | ReCtxt% | Q1 Gate');
  console.log('----------------------|---------|---------|---------|--------');
  Object.keys(results).forEach(function(key) {
    var r = results[key];
    var m = r.metrics;
    var name = (r.scenario + '                    ').slice(0, 22);
    console.log(name + '| ' +
      (m.resumeRate * 100).toFixed(1).padStart(5) + '% | ' +
      (m.resumeWithin30MinOverallRate * 100).toFixed(1).padStart(5) + '% | ' +
      (m.recontextSessionRate * 100).toFixed(1).padStart(5) + '% | ' +
      (m.q1GateOpen ? 'OPEN' : 'closed'));
  });
  console.log('');

  // ── Write output ──
  var outDir = path.join(__dirname, 'output');
  try { fs.mkdirSync(outDir, { recursive: true }); } catch(e) {}
  var outPath = path.join(outDir, 'q1_threshold_benchmark.json');
  fs.writeFileSync(outPath, JSON.stringify({
    generatedAt: new Date().toISOString(),
    seed: opts.seed,
    days: opts.days,
    q1Thresholds: Q1_THRESHOLDS,
    baseline: BASELINE,
    results: results
  }, null, 2));
  console.log('Wrote: ' + outPath);
  console.log('');

  // ── Verdict ──
  var anyOpen = Object.keys(results).some(function(k) { return results[k].metrics.q1GateOpen; });
  if (anyOpen) {
    console.log('FINDING: Q1 gate would OPEN under aggressive usage patterns.');
    console.log('RECOMMENDATION: Implement `buffer-was-lost-on-resume` counter in W2 bridge');
    console.log('  and measure live for 30 days before authorizing W8 persistence.');
  } else {
    console.log('FINDING: Q1 gate remains CLOSED across all tested scenarios.');
    console.log('RECOMMENDATION: Current in-memory-only buffer is sufficient for Phase 2.0/2.1.');
    console.log('  Re-test with live telemetry after T5 counter is instrumented.');
  }
  console.log('');
}

main();
