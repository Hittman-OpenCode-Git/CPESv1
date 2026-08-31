/**
 * bench.phase1.node.js — Phase 1 gated fallback benchmark.
 *
 * Loads BOTH the real MNLI provider (mobilebert-uncased-mnli q8) and the deterministic
 * stub provider. For each held-out item:
 *   1. Calls RealIntentProvider.send() → captures real mode + confidence
 *   2. Calls StubIntentProvider.send() → captures stub mode
 *   3. Applies the gate (real.confidence >= 0.60 → real wins; else stub wins)
 *   4. Records: real correct?, stub correct?, gated correct?, source ('real'|'fallback')
 *
 * Reports:
 *   - Real-only accuracy (current Phase 0b baseline)
 *   - Stub-only accuracy (deterministic regex baseline)
 *   - Gated accuracy (real wins when confident, else stub)
 *   - Fallback rate (% items where gate chose stub)
 *   - Confidence distribution (avg / p50 / p95 real confidence)
 *
 * Lane: Light Lane (read-only benchmark). No pack/case/governance writes.
 */

'use strict';

const path = require('path');
const fs = require('fs');

const BENCH_DIR = __dirname;
const HELDOUT_PATH = path.join(BENCH_DIR, 'heldout.intents.json');
const RESULTS_PATH = path.join(BENCH_DIR, 'bench-phase1-node-results.json');

const CANDIDATE_ID = process.argv[2] || 'mobilebert-uncased-mnli';
const DTYPE = process.argv[3] || 'q8';
const WARMUP_RUNS = parseInt(process.argv[4] || '1', 10);
const CONFIDENCE_THRESHOLD = 0.60;

const CANDIDATE_LABELS = [
  'explain this to me',
  'give me a practice question',
  'help me figure this out',
  'plan my study schedule'
];
const LABEL_TO_MODE = {
  'explain this to me':       'EXPLAIN',
  'give me a practice question': 'QUIZ',
  'help me figure this out':  'SOCRATIC',
  'plan my study schedule':   'STUDY_PLAN'
};
// Stub provider emits actions; map them to modes (mirrors may-coaching-router ACTION_MODE_MAP)
const ACTION_TO_MODE = {
  'wrong-choices': 'EXPLAIN',
  'similar':       'QUIZ',
  'hint':          'SOCRATIC',
  'progress':      'STUDY_PLAN'
};
// Default fallback when no pattern matches: stub returns EXPLAIN/wrong-choices
const STUB_DEFAULT_MODE = 'EXPLAIN';

const heldout = JSON.parse(fs.readFileSync(HELDOUT_PATH, 'utf8'));

function pct(arr, p) {
  if (!arr.length) return 0;
  const s = arr.slice().sort((a, b) => a - b);
  const i = Math.min(s.length - 1, Math.floor((s.length * p) / 100));
  return s[i];
}

(async () => {
  console.log('=== Phase 1 Gated Fallback Benchmark ===');
  console.log('Real candidate:', CANDIDATE_ID, '(' + DTYPE + ')');
  console.log('Confidence threshold:', CONFIDENCE_THRESHOLD);
  console.log('Held-out items:', heldout.length);
  console.log('');

  // ─── Real provider ────────────────────────────────────────────────
  let transformers;
  try {
    transformers = require('@huggingface/transformers');
  } catch (e) {
    console.error('FATAL: @huggingface/transformers not installed:', e.message);
    process.exit(1);
  }

  const heapBefore = process.memoryUsage().heapUsed;
  console.log('Loading real pipeline...');
  const t0 = process.hrtime.bigint();
  let realClassifier;
  try {
    realClassifier = await transformers.pipeline('zero-shot-classification', 'Xenova/' + CANDIDATE_ID, { dtype: DTYPE });
  } catch (e) {
    console.error('FATAL: pipeline load failed:', e.message);
    process.exit(2);
  }
  const realColdStartMs = Number((process.hrtime.bigint() - t0) / 1_000_000n);
  console.log('Real pipeline ready in', realColdStartMs, 'ms');
  const heapAfterReal = process.memoryUsage().heapUsed;

  // Warmup
  for (let i = 0; i < WARMUP_RUNS; i++) {
    await realClassifier('warmup text', CANDIDATE_LABELS);
  }

  // ─── Stub provider ────────────────────────────────────────────────
  const StubIntentProvider = require(path.resolve(BENCH_DIR, '..', 'stub-intent-provider.js')).StubIntentProvider;
  const stub = new StubIntentProvider();

  // ─── Per-item run: real + stub, then gate ─────────────────────────
  const perItem = [];
  const realLatencies = [];
  const stubLatencies = [];

  for (const item of heldout) {
    // Real call
    const tReal0 = process.hrtime.bigint();
    let realOut;
    try {
      realOut = await realClassifier(item.text, CANDIDATE_LABELS);
    } catch (e) {
      realOut = null;
    }
    const realMs = Number((process.hrtime.bigint() - tReal0) / 1_000_000n);
    realLatencies.push(realMs);

    let realMode = null;
    let realConfidence = 0;
    if (realOut && Array.isArray(realOut.labels) && realOut.labels.length) {
      realMode = LABEL_TO_MODE[realOut.labels[0]] || null;
      realConfidence = typeof realOut.scores[0] === 'number' ? realOut.scores[0] : 0;
    }

    // Stub call
    const tStub0 = process.hrtime.bigint();
    let stubResp;
    try {
      stubResp = await stub.send({ context: { freeText: item.text }, mode: 'chat' });
    } catch (e) {
      stubResp = null;
    }
    const stubMs = Number((process.hrtime.bigint() - tStub0) / 1_000_000n);
    stubLatencies.push(stubMs);

    let stubMode = null;
    let stubConfidence = 1.0;
    let stubParsed = null;
    if (stubResp && stubResp.content) {
      try { stubParsed = JSON.parse(stubResp.content); } catch (e) {}
      if (stubParsed && stubParsed.action) {
        stubMode = ACTION_TO_MODE[stubParsed.action] || STUB_DEFAULT_MODE;
      }
      if (stubParsed && typeof stubParsed.confidence === 'number') {
        stubConfidence = stubParsed.confidence;
      }
    }
    if (!stubMode) stubMode = STUB_DEFAULT_MODE;

    // Gate
    const realConfident = realConfidence >= CONFIDENCE_THRESHOLD && realMode !== null;
    const gatedMode = realConfident ? realMode : stubMode;
    const gatedSource = realConfident ? 'real' : 'fallback';

    perItem.push({
      id: item.id,
      text: item.text,
      expected: item.mode,
      realMode, realConfidence,
      stubMode, stubConfidence,
      gatedMode, gatedSource,
      realCorrect: realMode === item.mode,
      stubCorrect: stubMode === item.mode,
      gatedCorrect: gatedMode === item.mode,
      realLatencyMs: realMs,
      stubLatencyMs: stubMs
    });
  }

  const heapFinal = process.memoryUsage().heapUsed;
  const heapFinalDeltaMB = (heapFinal - heapBefore) / (1024 * 1024);

  // ─── Metrics on the 20 mode-tagged items ──────────────────────────
  const modeItems = perItem.filter(p => p.id <= 'H020');
  const realCorrect = modeItems.filter(p => p.realCorrect).length;
  const stubCorrect = modeItems.filter(p => p.stubCorrect).length;
  const gatedCorrect = modeItems.filter(p => p.gatedCorrect).length;
  const fallbackCount = modeItems.filter(p => p.gatedSource === 'fallback').length;

  const realConfs = modeItems.map(p => p.realConfidence);
  const realMeanConf = realConfs.reduce((a, b) => a + b, 0) / Math.max(realConfs.length, 1);

  // ─── Report ──────────────────────────────────────────────────────
  console.log('Per-item summary (first 5):');
  for (const p of perItem.slice(0, 5)) {
    console.log('  ' + p.id, '(' + p.expected + '): real=' + p.realMode + '/' + p.realConfidence.toFixed(2) +
      ' stub=' + p.stubMode +
      ' → gated=' + p.gatedSource + '(' + p.gatedMode + ') ' +
      (p.gatedCorrect ? '✓' : '✗'));
  }
  console.log('');
  console.log('Real-only accuracy  :', realCorrect + '/' + modeItems.length, '=' + (realCorrect / modeItems.length * 100).toFixed(1) + '%');
  console.log('Stub-only accuracy  :', stubCorrect + '/' + modeItems.length, '=' + (stubCorrect / modeItems.length * 100).toFixed(1) + '%');
  console.log('Gated accuracy      :', gatedCorrect + '/' + modeItems.length, '=' + (gatedCorrect / modeItems.length * 100).toFixed(1) + '%');
  console.log('Fallback rate       :', fallbackCount + '/' + modeItems.length, '=' + (fallbackCount / modeItems.length * 100).toFixed(1) + '%');
  console.log('Real confidence p50 :', pct(realConfs, 50).toFixed(3));
  console.log('Real confidence p95 :', pct(realConfs, 95).toFixed(3));
  console.log('Real confidence mean:', realMeanConf.toFixed(3));
  console.log('');
  console.log('Real latency  p50/p95/mean:', pct(realLatencies, 50), '/', pct(realLatencies, 95), '/', (realLatencies.reduce((a, b) => a + b, 0) / realLatencies.length).toFixed(1), 'ms');
  console.log('Stub latency  p50/p95/mean:', pct(stubLatencies, 50), '/', pct(stubLatencies, 95), '/', (stubLatencies.reduce((a, b) => a + b, 0) / stubLatencies.length).toFixed(1), 'ms');
  console.log('Heap delta (real only):', heapFinalDeltaMB.toFixed(2), 'MB');

  // ─── Persist ─────────────────────────────────────────────────────
  const result = {
    phase: 'Phase 1 gated fallback benchmark',
    generatedAt: new Date().toISOString(),
    environment: { node: process.version, platform: process.platform, arch: process.arch },
    candidate: CANDIDATE_ID,
    dtype: DTYPE,
    confidenceThreshold: CONFIDENCE_THRESHOLD,
    realColdStartMs,
    heapFinalDeltaMB,
    metrics: {
      realAccuracy:    { correct: realCorrect, total: modeItems.length, pct: realCorrect / modeItems.length * 100 },
      stubAccuracy:    { correct: stubCorrect, total: modeItems.length, pct: stubCorrect / modeItems.length * 100 },
      gatedAccuracy:   { correct: gatedCorrect, total: modeItems.length, pct: gatedCorrect / modeItems.length * 100 },
      fallbackRate:    { count: fallbackCount, total: modeItems.length, pct: fallbackCount / modeItems.length * 100 },
      realConfidence:  {
        p50: pct(realConfs, 50),
        p95: pct(realConfs, 95),
        mean: realMeanConf,
        min: Math.min(...realConfs),
        max: Math.max(...realConfs)
      },
      realLatencyMs:   { p50: pct(realLatencies, 50), p95: pct(realLatencies, 95), mean: realLatencies.reduce((a, b) => a + b, 0) / realLatencies.length },
      stubLatencyMs:   { p50: pct(stubLatencies, 50), p95: pct(stubLatencies, 95), mean: stubLatencies.reduce((a, b) => a + b, 0) / stubLatencies.length }
    },
    perItem
  };
  fs.writeFileSync(RESULTS_PATH, JSON.stringify(result, null, 2));
  console.log('\nResults written to', RESULTS_PATH);
})().catch(e => {
  console.error('FATAL:', e.stack || e.message);
  process.exit(99);
});