/**
 * bench.phase0b.browser.js — Playwright browser benchmark for Phase 0b real model candidates.
 *
 * Usage: node app/may/providers/__benchmark__/bench.phase0b.browser.js [candidate] [dtype] [viewport]
 *   candidate default: mobilebert-uncased-mnli
 *   dtype default: q8
 *   viewport default: desktop (use 'mobile' for 375x667 + 4x CPU throttle)
 *
 * Loads bench.phase0b.html in headless Chromium, polls window.__BENCH__ until status='done',
 * reads results, prints summary, writes JSON.
 *
 * This is the FIRST Web Worker / real-model browser test in the project.
 *
 * Lane: Full Lane. Read-only on pack/case files.
 */

'use strict';

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BENCH_DIR = __dirname;
const HTML_FILE = path.join(BENCH_DIR, 'bench.phase0b.html');
const RESULTS_PATH = path.join(BENCH_DIR, 'bench-phase0b-browser-results.json');

const candidate = process.argv[2] || 'mobilebert-uncased-mnli';
const dtype = process.argv[3] || 'q8';
const viewportName = process.argv[4] || 'desktop';

const VIEWPORTS = {
  desktop: { width: 1280, height: 900, deviceScaleFactor: 1, isMobile: false, hasTouch: false, cpuThrottle: 1 },
  mobile:  { width: 375, height: 667, deviceScaleFactor: 2, isMobile: true, hasTouch: true, cpuThrottle: 4 }
};

(async () => {
  const vp = VIEWPORTS[viewportName] || VIEWPORTS.desktop;
  console.log('=== Phase 0b Browser Benchmark ===');
  console.log('Candidate:', candidate);
  console.log('Dtype:', dtype);
  console.log('Viewport:', viewportName, vp);
  console.log('');

  const browser = await chromium.launchPersistentContext(path.join(require('os').tmpdir(), 'pw-phase0b-' + Date.now()), {
    headless: true,
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: vp.isMobile,
    hasTouch: vp.hasTouch,
    args: ['--disable-extensions', '--no-first-run', '--enable-features=SharedArrayBuffer']
  });
  const page = await browser.newPage();

  // CPU throttle via CDP (4x slowdown for mobile emulation)
  if (vp.cpuThrottle > 1) {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: vp.cpuThrottle });
  }

  const fileUrl = 'file:///' + HTML_FILE.replace(/\\/g, '/') + `?candidate=${candidate}&dtype=${dtype}`;
  console.log('Loading:', fileUrl);

  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));

  await page.goto(fileUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Poll window.__BENCH__ until status='done' or 'error'
  console.log('Waiting for benchmark to complete (max 180s)...');
  let bench = null;
  const start = Date.now();
  while (Date.now() - start < 180000) {
    bench = await page.evaluate(() => window.__BENCH__ || null);
    if (bench && (bench.status === 'done' || bench.status === 'error')) break;
    await new Promise(r => setTimeout(r, 1000));
    process.stdout.write('.');
  }
  console.log('');

  if (!bench || bench.status !== 'done') {
    console.error('ERROR: benchmark did not complete in 180s');
    console.error('Last bench state:', JSON.stringify(bench, null, 2));
    if (bench && bench.error) console.error('Page error:', bench.error);
    await browser.close();
    process.exit(1);
  }

  await browser.close();

  console.log('=== Results ===');
  console.log('Cold start (ms):', bench.coldStartMs);
  console.log('Heap delta (MB):', bench.heapDeltaMB?.toFixed(2));
  console.log('Latency p50/p95/p99/mean (ms):', bench.latency?.p50?.toFixed(0), '/', bench.latency?.p95?.toFixed(0), '/', bench.latency?.p99?.toFixed(0), '/', bench.latency?.mean?.toFixed(1));
  console.log('Mode accuracy:', `${bench.modeAccuracy?.correct}/${bench.modeAccuracy?.total} = ${bench.modeAccuracy?.pct?.toFixed(1)}%`);
  console.log('Verdict:', bench.verdict);
  console.log('Page errors:', pageErrors.length);

  const result = {
    phase: 'Phase 0b browser benchmark',
    generatedAt: new Date().toISOString(),
    environment: { node: process.version, platform: process.platform, viewport: viewportName },
    candidate, dtype, viewport: vp,
    coldStartMs: bench.coldStartMs,
    heapDeltaMB: bench.heapDeltaMB,
    latency: bench.latency,
    modeAccuracy: bench.modeAccuracy,
    perItem: bench.perItem,
    verdict: bench.verdict,
    pageErrors
  };
  fs.writeFileSync(RESULTS_PATH, JSON.stringify(result, null, 2));
  console.log('Results written to', RESULTS_PATH);
  process.exit(bench.verdict === 'NO-GO' ? 3 : 0);
})().catch(e => {
  console.error('FATAL:', e.stack || e.message);
  process.exit(99);
});
