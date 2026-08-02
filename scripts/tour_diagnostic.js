/**
 * tour_diagnostic.js — Guided Tour Reproduction & Instrumentation Harness
 *
 * P4-W1-C Phase 1 (Reproduce · Instrument · Capture). READ-ONLY w.r.t. app
 * source files. Captures tour-step geometry (target rect, spotlight rect,
 * tooltip rect, viewport, scroll position, hit-test at the Next button)
 * across a window-size × tour-state matrix to diagnose the reported
 * "step off-screen / cannot proceed" behavior.
 *
 * Sampling cadence per step:
 *   A: ~800ms after entering the step (positioned, possibly mid smooth-scroll)
 *   B: ~1300ms (post tooltip 350ms CSS transition)
 *   C: ~2000ms (fully settled)
 *
 * Usage:  node scripts/tour_diagnostic.js
 * Output: scripts/output/tour_diagnostic_report.json  + console summary
 * Exit:   0 (report generated) — diagnostic only, no pass/fail gate.
 */

const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const HTML = path.join(ROOT, "index_updated.html");
const FILE_URL = "file:///" + HTML.replace(/\\/g, "/");
const OUT = path.join(ROOT, "scripts", "output", "tour_diagnostic_report.json");

// Matrix: beginner tour at all three window sizes (incl. one NATURAL first-run
// trigger at 1600x900); secondary tours at 1600x900 for coverage.
const MATRIX = [
  { tour: "beginner", w: 1920, h: 1080, natural: false, label: "beginner@1920x1080" },
  { tour: "beginner", w: 1600, h: 900, natural: true, label: "beginner@1600x900 (natural first-run)" },
  { tour: "beginner", w: 1366, h: 768, natural: false, label: "beginner@1366x768" },
  { tour: "beginner", w: 1600, h: 900, natural: false, slow: true, label: "beginner@1600x900 (SLOW scroll sim)" },
  { tour: "beginner", w: 1366, h: 768, natural: false, slow: true, label: "beginner@1366x768 (SLOW scroll sim)" },
  { tour: "recovery", w: 1600, h: 900, natural: false, label: "recovery@1600x900" },
  { tour: "may", w: 1600, h: 900, natural: false, label: "may@1600x900" },
  { tour: "analytics", w: 1600, h: 900, natural: false, label: "analytics@1600x900" },
  { tour: "admin", w: 1600, h: 900, natural: false, label: "admin@1600x900" }
];

// Real browsers animate smooth scrolls over ~300-600ms. Headless completes
// them almost instantly, so the tour's fixed 300ms positioning timeout never
// races the animation there. This patch simulates the real-browser condition
// deterministically: smooth scrollIntoView animates over ~600ms, so placement
// is computed mid-animation — reproducing the reported hazard on demand.
const SLOW_SCROLL_PATCH = `
(function () {
  var orig = Element.prototype.scrollIntoView;
  Element.prototype.scrollIntoView = function (opts) {
    var el = this;
    if (!opts || opts.behavior !== 'smooth') { return orig.call(el, opts); }
    var fromY = window.scrollY;
    var r = el.getBoundingClientRect();
    var toY = window.scrollY + r.top - (window.innerHeight / 2);
    var start = performance.now();
    var dur = 600;
    function step(now) {
      var t = Math.min(1, (now - start) / dur);
      window.scrollTo(0, fromY + (toY - fromY) * t);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };
})();
`;

const CAPTURE_SNIPPET = `
window.__tourCapture = function __tourCapture() {
  var t = document.getElementById('tourTooltip');
  var s = document.getElementById('tourSpotlight');
  var n = document.getElementById('tourNext');
  function r(el) {
    if (!el) return null;
    var b = el.getBoundingClientRect();
    return { left: b.left, top: b.top, right: b.right, bottom: b.bottom, width: b.width, height: b.height };
  }
  var vw = window.innerWidth, vh = window.innerHeight;
  var tRect = r(t), nRect = r(n);
  var inView = function (rc) { return !!(rc && rc.left >= 0 && rc.top >= 0 && rc.right <= vw && rc.bottom <= vh); };
  var hit = null;
  if (nRect) {
    try {
      var el = document.elementFromPoint(nRect.left + nRect.width / 2, nRect.top + nRect.height / 2);
      hit = el ? ((el === n || t.contains(el)) ? 'tooltip' : (el.id || el.tagName)) : 'none';
    } catch (e) { hit = 'err'; }
  } else { hit = 'nobtn'; }
  var G = window.GuidedTour;
  var step = (G && G.TOURS && G.tourType && G.TOURS[G.tourType] && G.TOURS[G.tourType].steps && G.TOURS[G.tourType].steps[G.stepIndex]) || {};
  var attach = step.attach;
  var targetRect = null;
  if (attach === 'header') targetRect = r(document.querySelector('header.hero'));
  else if (attach === 'coachView') targetRect = r(document.querySelector('#coachView .may-compact') || document.getElementById('coachView'));
  else targetRect = r(document.getElementById(attach));
  return {
    stepIndex: G ? G.stepIndex : -1,
    stepId: step.id || null,
    attach: attach || null,
    position: step.position || null,
    targetExists: attach === 'header' ? !!document.querySelector('header.hero') : (attach === 'coachView' ? !!(document.getElementById('coachView')) : !!document.getElementById(attach)),
    targetRect: targetRect,
    viewport: { vw: vw, vh: vh },
    scrollTop: window.scrollY,
    docHeight: document.documentElement.scrollHeight,
    tooltip: tRect,
    spotlight: r(s),
    next: nRect,
    tooltipInView: inView(tRect),
    nextInView: inView(nRect),
    hitAtNext: hit,
    tooltipTransition: t ? getComputedStyle(t).transitionDuration : null,
    activeView: (function () { var v = document.querySelector('.view.active'); return v ? v.id : null; })()
  };
}
`;

async function main() {
  const report = { generatedAt: new Date().toISOString(), matrix: [], summary: { blockedSteps: [], offscreenSteps: [], totalSteps: 0 } };
  console.log("=== TOUR DIAGNOSTIC ===");

  for (const entry of MATRIX) {
    const tmpDir = path.join(require("os").tmpdir(), "opencode-tour-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7));
    fs.mkdirSync(tmpDir, { recursive: true });

    const context = await chromium.launchPersistentContext(tmpDir, {
      headless: true,
      args: ["--disable-extensions", "--no-first-run"],
      viewport: { width: entry.w, height: entry.h }
    });

    if (!entry.natural) {
      // Suppress the auto first-run tour so we can start the requested tour deterministically.
      await context.addInitScript(() => {
        try {
          const p = JSON.parse(localStorage.getItem("cmaProfile2026") || "null");
          if (p) { p.onboarding = p.onboarding || {}; p.onboarding.tourCompleted = true; localStorage.setItem("cmaProfile2026", JSON.stringify(p)); }
        } catch (e) {}
      });
    }
    if (entry.slow) {
      await context.addInitScript(SLOW_SCROLL_PATCH);
    }

    const page = await context.newPage();
    await page.goto(FILE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(2500);
    await page.evaluate(CAPTURE_SNIPPET);

    // Start the tour (or wait for the natural first-run trigger).
    if (!entry.natural) {
      await page.evaluate((tn) => { if (window.GuidedTour) window.GuidedTour.start(tn); }, entry.tour);
    }
    await page.waitForSelector("#guidedTourOverlay", { timeout: 15000 });
    await page.waitForTimeout(400);

    const tourRun = { label: entry.label, viewport: entry.w + "x" + entry.h, steps: [] };
    report.matrix.push(tourRun);
    let blocked = false;
    let stepIndex = 0;
    let maxSteps = 20;

    while (!blocked && stepIndex < maxSteps) {
      const stepInfo = await page.evaluate(() => {
        const G = window.GuidedTour;
        const step = G && G.tourType && G.TOURS[G.tourType] && G.TOURS[G.tourType].steps[G.stepIndex];
        return { index: G ? G.stepIndex : -1, total: step ? G.TOURS[G.tourType].steps.length : 0, last: step ? (G.stepIndex >= G.TOURS[G.tourType].steps.length - 1) : false };
      });

      await page.waitForTimeout(300); // let step content render
      const samples = [];
      for (const delay of [500, 500, 700]) {
        await page.waitForTimeout(delay);
        samples.push(await page.evaluate(() => __tourCapture()));
      }
      const settled = samples[samples.length - 1];
      const verdict = (settled.tooltipInView && settled.nextInView && settled.hitAtNext === "tooltip") ? "OK" : "PROBLEM";
      tourRun.steps.push({ samples: samples, verdict: verdict });

      report.summary.totalSteps++;
      if (verdict === "PROBLEM") {
        report.summary.blockedSteps.push({ label: entry.label, stepIndex: settled.stepIndex, stepId: settled.stepId, hitAtNext: settled.hitAtNext, tooltipInView: settled.tooltipInView, nextInView: settled.nextInView });
      }
      console.log(
        (verdict === "OK" ? "  PASS" : "  FAIL") + " " + entry.label + " step " + (settled.stepIndex + 1) + "/" + stepInfo.total +
        " [" + (settled.stepId || "?") + " attach=" + (settled.attach || "?") + "] " +
        "tooltip=" + (settled.tooltip ? Math.round(settled.tooltip.top) + "," + Math.round(settled.tooltip.bottom) : "?") + "/" + settled.viewport.vh +
        " scroll=" + Math.round(settled.scrollTop) + " hit=" + settled.hitAtNext +
        " scrollDeltaA2C=" + (samples[2].scrollTop - samples[0].scrollTop)
      );

      if (stepInfo.last) break;
      if (verdict === "PROBLEM") {
        // Try to skip the tour to unblock the next matrix entry.
        try { await page.click("#tourSkip", { timeout: 3000 }); } catch (e) {}
        blocked = true;
      } else {
        try {
          await page.click("#tourNext", { timeout: 5000 });
        } catch (e) {
          report.summary.blockedSteps.push({ label: entry.label, stepIndex: settled.stepIndex, error: "click failed: " + e.message.slice(0, 80) });
          try { await page.click("#tourSkip", { timeout: 3000 }); } catch (e2) {}
          blocked = true;
        }
      }
      stepIndex++;
    }

    if (!blocked && stepIndex >= maxSteps) {
      try { await page.click("#tourSkip", { timeout: 3000 }); } catch (e) {}
    }
    await context.close();
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
  }

  fs.writeFileSync(OUT, JSON.stringify(report, null, 2));
  console.log("\n=== SUMMARY ===");
  console.log("Total steps captured: " + report.summary.totalSteps);
  console.log("Problem steps: " + report.summary.blockedSteps.length);
  if (report.summary.blockedSteps.length) {
    report.summary.blockedSteps.forEach((b) => console.log("  - " + b.label + " step " + (b.stepIndex + 1) + " [" + (b.stepId || "?") + "] hit=" + b.hitAtNext + " tooltipInView=" + b.tooltipInView + " nextInView=" + b.nextInView));
  }
  console.log("Report: " + OUT);
  process.exit(0);
}

main().catch((err) => {
  console.error("FATAL:", err.message);
  process.exit(1);
});
