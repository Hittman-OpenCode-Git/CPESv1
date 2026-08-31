/**
 * bench.phase0b.node.js — Node.js pre-screen for real model candidates.
 *
 * Phase 0b. For each candidate model:
 *   1. Load via @huggingface/transformers pipeline()
 *   2. Measure cold-start (process.hrtime.bigint)
 *   3. Measure heap delta (process.memoryUsage().heapUsed)
 *   4. Run 5 warm inferences on held-out set
 *   5. Auto-No-Go if heap_delta > 50 MB
 *
 * Run: node app/may/providers/__benchmark__/bench.phase0b.node.js [--candidate=X] [--dtype=q8]
 * Defaults: --candidate=nli-deberta-v3-xsmall, --dtype=q8
 *
 * Output: stdout JSON lines + bench-phase0b-node-results.json in same dir.
 *
 * Lane: Full Lane. Read-only on pack/case files.
 */

'use strict';

const path = require('path');
const fs = require('fs');

const BENCH_DIR = __dirname;
const HELDOUT_PATH = path.join(BENCH_DIR, 'heldout.intents.json');
const RESULTS_PATH = path.join(BENCH_DIR, 'bench-phase0b-node-results.json');

// ─── Args ──────────────────────────────────────────────────────────────────
const args = process.argv.slice(2).reduce((acc, a) => {
  const [k, v] = a.replace(/^--/, '').split('=');
  acc[k] = v ?? true;
  return acc;
}, {});

const CANDIDATE_ID = args.candidate || 'nli-deberta-v3-xsmall';
const DTYPE = args.dtype || 'q8';
const WARMUP_RUNS = parseInt(args.warmup || '1', 10);
const TIMING_RUNS = parseInt(args.runs || '5', 10);
const HEAP_BUDGET_MB = parseInt(args.heapBudget || '50', 10);

const CANDIDATE_PIPELINE = 'zero-shot-classification';
const CANDIDATE_LABELS = ['explain this to me', 'give me a practice question', 'help me figure this out', 'plan my study schedule'];

const heldout = JSON.parse(fs.readFileSync(HELDOUT_PATH, 'utf8'));

// ─── Helpers ──────────────────────────────────────────────────────────────
function mb(bytes) { return (bytes / (1024 * 1024)).toFixed(2); }
function nowMs(startNs) { return Number((process.hrtime.bigint() - startNs) / 1_000_000n); }

function pct(arr, p) {
  const sorted = arr.slice().sort((a, b) => a - b);
  const i = Math.min(sorted.length - 1, Math.floor((sorted.length * p) / 100));
  return sorted[i];
}

// ─── Main ──────────────────────────────────────────────────────────────────
(async () => {
  console.log('=== Phase 0b Node.js Pre-Screen ===');
  console.log('Candidate:', CANDIDATE_ID);
  console.log('Dtype:', DTYPE);
  console.log('Heap budget (MB):', HEAP_BUDGET_MB);
  console.log('Warmup runs:', WARMUP_RUNS, '| Timing runs:', TIMING_RUNS);
  console.log('Held-out items:', heldout.length);
  console.log('');

  // Import transformers.js
  const t0 = process.hrtime.bigint();
  let transformers;
  try {
    transformers = require('@huggingface/transformers');
  } catch (e) {
    console.error('FATAL: @huggingface/transformers not installed:', e.message);
    process.exit(1);
  }
  console.log('Transformers.js loaded in', nowMs(t0), 'ms');

  // Load pipeline
  console.log('Loading pipeline', CANDIDATE_PIPELINE, 'from', 'Xenova/' + CANDIDATE_ID, '(dtype=' + DTYPE + ')...');
  const heapBefore = process.memoryUsage().heapUsed;
  const t1 = process.hrtime.bigint();
  let classifier;
  try {
    classifier = await transformers.pipeline(CANDIDATE_PIPELINE, 'Xenova/' + CANDIDATE_ID, { dtype: DTYPE });
  } catch (e) {
    console.error('FATAL: pipeline load failed:', e.message);
    console.error('This candidate is unavailable. Document as NO-GO and exit.');
    process.exit(2);
  }
  const coldStartMs = nowMs(t1);
  console.log('Pipeline ready in', coldStartMs, 'ms');

  // Heap delta after load
  const heapAfter = process.memoryUsage().heapUsed;
  const heapDeltaMB = (heapAfter - heapBefore) / (1024 * 1024);
  console.log('Heap after load:', mb(process.memoryUsage().heapUsed), 'MB');
  console.log('Heap delta from load:', heapDeltaMB.toFixed(2), 'MB');

  let verdict = 'GO';
  let reason = '';
  if (heapDeltaMB > HEAP_BUDGET_MB) {
    verdict = 'NO-GO';
    reason = 'heap delta ' + heapDeltaMB.toFixed(2) + 'MB exceeds budget ' + HEAP_BUDGET_MB + 'MB';
  }
  console.log('Verdict (heap gate):', verdict, reason ? '(' + reason + ')' : '');

  // Warmup
  for (let i = 0; i < WARMUP_RUNS; i++) {
    await classifier('warmup text', CANDIDATE_LABELS);
  }

  // Per-call latency timings on held-out
  const latencies = [];
  const perItem = [];
  for (const item of heldout) {
    const start = process.hrtime.bigint();
    let output;
    try {
      output = await classifier(item.text, CANDIDATE_LABELS);
    } catch (e) {
      console.error('Classify failed for', item.id, ':', e.message);
      perItem.push({ id: item.id, text: item.text, expected: item.mode, error: e.message });
      continue;
    }
    const elapsed = nowMs(start);
    latencies.push(elapsed);
    // v4 zero-shot-classification returns {sequence, labels[], scores[]} — top-1 is labels[0]
    let topLabel = null;
    let topScore = null;
    if (output && Array.isArray(output.labels) && Array.isArray(output.scores) && output.labels.length) {
      topLabel = output.labels[0];
      topScore = output.scores[0];
    }
    perItem.push({
      id: item.id,
      text: item.text,
      expected: item.mode,
      topLabel,
      topScore,
      latencyMs: elapsed
    });
  }

  const p50 = pct(latencies, 50);
  const p95 = pct(latencies, 95);
  const p99 = pct(latencies, 99);
  const mean = latencies.reduce((a, b) => a + b, 0) / Math.max(latencies.length, 1);
  console.log('Latencies p50/p95/p99/mean ms:', p50, p95, p99, mean.toFixed(2));

  // Heap delta after benchmark
  const heapFinal = process.memoryUsage().heapUsed;
  const heapFinalDeltaMB = (heapFinal - heapBefore) / (1024 * 1024);
  console.log('Heap after bench:', mb(heapFinal), 'MB | total delta from start:', heapFinalDeltaMB.toFixed(2), 'MB');

  // Re-evaluate verdict based on final heap (some models grow during inference)
  if (heapFinalDeltaMB > HEAP_BUDGET_MB) {
    verdict = 'NO-GO';
    reason = 'final heap delta ' + heapFinalDeltaMB.toFixed(2) + 'MB exceeds budget ' + HEAP_BUDGET_MB + 'MB';
  }

  // Mode-accuracy on the 20 mode-tagged items (skip edge cases H021-H024)
  const modeItems = perItem.filter(p => p.id && p.id <= 'H020');
  const MAP = { 'explain this to me': 'EXPLAIN', 'give me a practice question': 'QUIZ', 'help me figure this out': 'SOCRATIC', 'plan my study schedule': 'STUDY_PLAN' };
  const correct = modeItems.filter(p => MAP[p.topLabel] === p.expected).length;
  const accuracy = modeItems.length ? correct / modeItems.length : 0;
  console.log('Mode accuracy on 20 held-out mode items:', correct + '/' + modeItems.length, '=' + (accuracy * 100).toFixed(1) + '%');

  // Edge-case handling
  const edges = perItem.filter(p => p.id && p.id > 'H020');
  console.log('Edge cases handled:', edges.length, 'of', 4);
  edges.forEach(e => console.log('  ', e.id, '(' + e.expected + '):', e.topLabel || 'null', e.error ? ('ERR ' + e.error) : ('score=' + (e.topScore || 0).toFixed(2))));

  // Persist
  const result = {
    phase: 'Phase 0b Node.js pre-screen',
    generatedAt: new Date().toISOString(),
    environment: { node: process.version, platform: process.platform, arch: process.arch },
    candidate: CANDIDATE_ID,
    dtype: DTYPE,
    pipeline: CANDIDATE_PIPELINE,
    labels: CANDIDATE_LABELS,
    heapBudgetMB: HEAP_BUDGET_MB,
    coldStartMs,
    heapAfterLoadMB: heapAfter / (1024 * 1024),
    heapDeltaAtLoadMB: heapDeltaMB,
    heapAfterBenchMB: heapFinal / (1024 * 1024),
    heapDeltaFinalMB: heapFinalDeltaMB,
    verdict,
    reason,
    latencyMs: { p50, p95, p99, mean, count: latencies.length },
    heldoutModeAccuracy: { correct, total: modeItems.length, pct: accuracy * 100 },
    perItem
  };
  fs.writeFileSync(RESULTS_PATH, JSON.stringify(result, null, 2));
  console.log('\nResults written to', RESULTS_PATH);
  console.log('Final verdict:', verdict);
  process.exit(verdict === 'NO-GO' ? 3 : 0);
})().catch(e => {
  console.error('FATAL:', e.stack || e.message);
  process.exit(99);
});
