/**
 * bench.phase1b.node.js — Phase 1b fine-tuned model benchmark.
 *
 * Loads the fine-tuned local model (app/may/providers/models/mobilebert-intent-q8/)
 * via @huggingface/transformers pipeline('text-classification').  Runs against
 * the held-out set. For each item, also runs StubIntentProvider. Applies the
 * confidence gate and reports fallback rate + sweep.
 *
 * Lane: Light Lane (no pack/case/governance writes).
 */

'use strict';

const path = require('path');
const fs = require('fs');

const BENCH_DIR = __dirname;
const HELDOUT_PATH = path.join(BENCH_DIR, 'heldout.intents.json');
const RESULTS_PATH = path.join(BENCH_DIR, 'bench-phase1b-node-results.json');

const MODEL_DIR = path.resolve(__dirname, '..', 'models', 'mobilebert-intent-q8');
const CONFIDENCE_THRESHOLD = 0.60;
const WARMUP_RUNS = parseInt(process.argv[2] || '1', 10);

const heldout = JSON.parse(fs.readFileSync(HELDOUT_PATH, 'utf8'));

function pct(arr, p) {
  if (!arr.length) return 0;
  const s = arr.slice().sort((a, b) => a - b);
  const i = Math.min(s.length - 1, Math.floor((s.length * p) / 100));
  return s[i];
}

(async () => {
  console.log('=== Phase 1b Fine-Tuned Model Benchmark ===');
  console.log('Local model dir:', MODEL_DIR);
  console.log('Confidence threshold:', CONFIDENCE_THRESHOLD);
  console.log('Held-out items:', heldout.length);
  console.log('');

  // ─── Real (fine-tuned) provider ────────────────────────────────────
  let transformers;
  try {
    transformers = require('@huggingface/transformers');
  } catch (e) {
    console.error('FATAL: @huggingface/transformers not installed:', e.message);
    process.exit(1);
  }

  const heapBefore = process.memoryUsage().heapUsed;
  console.log('Loading fine-tuned pipeline (text-classification)...');
  const t0 = process.hrtime.bigint();
  let realClassifier;
  try {
    realClassifier = await transformers.pipeline('text-classification', MODEL_DIR);
  } catch (e) {
    console.error('FATAL: pipeline load failed:', e.message);
    process.exit(2);
  }
  const realColdStartMs = Number((process.hrtime.bigint() - t0) / 1_000_000n);
  console.log('Pipeline ready in', realColdStartMs, 'ms');
  const heapAfterLoad = process.memoryUsage().heapUsed;

  // Warmup
  for (let i = 0; i < WARMUP_RUNS; i++) {
    await realClassifier('warmup text');
  }

  // ─── Stub provider ─────────────────────────────────────────────────
  const StubIntentProvider = require(path.resolve(BENCH_DIR, '..', 'stub-intent-provider.js')).StubIntentProvider;
  const stub = new StubIntentProvider();

  const ACTION_TO_MODE = {
    'wrong-choices': 'EXPLAIN',
    'similar':       'QUIZ',
    'hint':          'SOCRATIC',
    'progress':      'STUDY_PLAN'
  };
  const STUB_DEFAULT_MODE = 'EXPLAIN';

  // ─── Per-item: real + stub + gate ──────────────────────────────────
  const perItem = [];
  const realLatencies = [];
  const stubLatencies = [];

  for (const item of heldout) {
    // Real (fine-tuned) call — top-1
    const tReal0 = process.hrtime.bigint();
    let realOut;
    try {
      realOut = await realClassifier(item.text);
    } catch (e) {
      realOut = null;
    }
    const realMs = Number((process.hrtime.bigint() - tReal0) / 1_000_000n);
    realLatencies.push(realMs);

    // transformers.js text-classification returns an array of {label, score} (top-1)
    let realMode = null;
    let realConfidence = 0;
    if (Array.isArray(realOut) && realOut.length) {
      realMode = realOut[0].label || null;
      realConfidence = typeof realOut[0].score === 'number' ? realOut[0].score : 0;
    }

    // Stub
    const tStub0 = process.hrtime.bigint();
    let stubResp;
    try {
      stubResp = await stub.send({ context: { freeText: item.text }, mode: 'chat' });
    } catch (e) { stubResp = null; }
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

  // ─── Per-mode breakdown ────────────────────────────────────────────
  const perModeReal = {};
  const perModeStub = {};
  for (const p of modeItems) {
    if (!perModeReal[p.expected]) perModeReal[p.expected] = { correct: 0, total: 0 };
    perModeReal[p.expected].total++;
    if (p.realCorrect) perModeReal[p.expected].correct++;
    if (!perModeStub[p.expected]) perModeStub[p.expected] = { correct: 0, total: 0 };
    perModeStub[p.expected].total++;
    if (p.stubCorrect) perModeStub[p.expected].correct++;
  }

  // ─── Threshold sweep ──────────────────────────────────────────────
  const sweep = {};
  for (const t of [0.20, 0.25, 0.30, 0.40, 0.50, 0.55, 0.60, 0.65, 0.70, 0.80]) {
    let correct = 0;
    let fb = 0;
    for (const p of modeItems) {
      const useReal = p.realConfidence >= t && p.realMode !== null;
      if (useReal) {
        if (p.realCorrect) correct++;
      } else {
        fb++;
        if (p.stubCorrect) correct++;
      }
    }
    sweep[t.toFixed(2)] = { correct, total: modeItems.length, fallback: fb, accuracy: correct / modeItems.length * 100, fallbackRate: fb / modeItems.length * 100 };
  }

  // ─── Report ────────────────────────────────────────────────────────
  console.log('Per-item summary (first 5):');
  for (const p of perItem.slice(0, 5)) {
    console.log('  ' + p.id, '(' + p.expected + '): real=' + p.realMode + '/' + p.realConfidence.toFixed(3) +
      ' stub=' + p.stubMode +
      ' → gated=' + p.gatedSource + '(' + p.gatedMode + ') ' +
      (p.gatedCorrect ? '✓' : '✗'));
  }
  console.log('');
  console.log('=== Metrics (held-out 20 mode items) ===');
  console.log('Fine-tuned real accuracy:', realCorrect + '/' + modeItems.length, '=' + (realCorrect / modeItems.length * 100).toFixed(1) + '%');
  console.log('Stub accuracy         :', stubCorrect + '/' + modeItems.length, '=' + (stubCorrect / modeItems.length * 100).toFixed(1) + '%');
  console.log('Gated (th=' + CONFIDENCE_THRESHOLD + ') accuracy:', gatedCorrect + '/' + modeItems.length, '=' + (gatedCorrect / modeItems.length * 100).toFixed(1) + '%');
  console.log('Fallback rate         :', fallbackCount + '/' + modeItems.length, '=' + (fallbackCount / modeItems.length * 100).toFixed(1) + '%');
  console.log('');
  console.log('Per-mode (real / stub):');
  for (const m of Object.keys(perModeReal)) {
    const r = perModeReal[m];
    const s = perModeStub[m] || { correct: 0, total: 0 };
    console.log('  ' + m + ': real=' + r.correct + '/' + r.total + ' (' + (r.correct/r.total*100).toFixed(1) + '%)  stub=' + s.correct + '/' + s.total + ' (' + (s.correct/s.total*100).toFixed(1) + '%)');
  }
  console.log('');
  console.log('Real confidence p50 / p95 / mean:', pct(realConfs, 50).toFixed(3), '/', pct(realConfs, 95).toFixed(3), '/', (realConfs.reduce((a, b) => a + b, 0) / realConfs.length).toFixed(3));
  console.log('Real latency p50 / p95 / mean ms:', pct(realLatencies, 50), '/', pct(realLatencies, 95), '/', (realLatencies.reduce((a, b) => a + b, 0) / realLatencies.length).toFixed(1));
  console.log('Heap delta:', heapFinalDeltaMB.toFixed(2), 'MB');
  console.log('');
  console.log('=== Threshold sweep ===');
  for (const [t, s] of Object.entries(sweep)) {
    console.log('  th=' + t + ': gated=' + s.correct + '/' + s.total + ' (' + s.accuracy.toFixed(1) + '%) fb=' + s.fallback + ' (' + s.fallbackRate.toFixed(1) + '%)');
  }
  // Identify optimal threshold: highest accuracy; ties broken by lowest fallback rate
  const sortedSweep = Object.entries(sweep).sort((a, b) => {
    if (b[1].accuracy !== a[1].accuracy) return b[1].accuracy - a[1].accuracy;
    return a[1].fallbackRate - b[1].fallbackRate;
  });
  const optimalThreshold = sortedSweep.length ? sortedSweep[0][0] : null;
  const optimalStats = optimalThreshold ? sweep[optimalThreshold] : null;
  console.log('');
  console.log('Optimal threshold: ' + optimalThreshold + ' (accuracy=' + (optimalStats ? optimalStats.accuracy.toFixed(1) + '%' : 'n/a') +
    ', fallback rate=' + (optimalStats ? optimalStats.fallbackRate.toFixed(1) + '%' : 'n/a') + ')');
  console.log('Phase 2a registry will use this for text-classification pipeline (zero-shot remains 0.60).');

  // ─── Persist ───────────────────────────────────────────────────────
  const result = {
    phase: 'Phase 1b fine-tuned model benchmark',
    generatedAt: new Date().toISOString(),
    environment: { node: process.version, platform: process.platform, arch: process.arch },
    modelDir: MODEL_DIR,
    confidenceThreshold: CONFIDENCE_THRESHOLD,
    realColdStartMs,
    heapFinalDeltaMB,
    metrics: {
      realAccuracy:    { correct: realCorrect, total: modeItems.length, pct: realCorrect / modeItems.length * 100 },
      stubAccuracy:    { correct: stubCorrect, total: modeItems.length, pct: stubCorrect / modeItems.length * 100 },
      gatedAccuracy:   { correct: gatedCorrect, total: modeItems.length, pct: gatedCorrect / modeItems.length * 100 },
      fallbackRate:    { count: fallbackCount, total: modeItems.length, pct: fallbackCount / modeItems.length * 100 },
      perMode: { real: perModeReal, stub: perModeStub },
      realConfidence:  {
        p50: pct(realConfs, 50),
        p95: pct(realConfs, 95),
        mean: realConfs.reduce((a, b) => a + b, 0) / realConfs.length,
        min: Math.min(...realConfs),
        max: Math.max(...realConfs)
      },
      realLatencyMs: { p50: pct(realLatencies, 50), p95: pct(realLatencies, 95), mean: realLatencies.reduce((a, b) => a + b, 0) / realLatencies.length },
      stubLatencyMs: { p50: pct(stubLatencies, 50), p95: pct(stubLatencies, 95), mean: stubLatencies.reduce((a, b) => a + b, 0) / stubLatencies.length }
    },
    thresholdSweep: sweep,
    optimalThreshold: optimalThreshold,
    optimalAccuracy: optimalStats ? optimalStats.accuracy : null,
    optimalFallbackRate: optimalStats ? optimalStats.fallbackRate : null,
    perItem
  };
  fs.writeFileSync(RESULTS_PATH, JSON.stringify(result, null, 2));
  console.log('\nResults written to', RESULTS_PATH);
})().catch(e => {
  console.error('FATAL:', e.stack || e.message);
  process.exit(99);
});
