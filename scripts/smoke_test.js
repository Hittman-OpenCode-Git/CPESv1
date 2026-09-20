/**
 * smoke_test.js — Minimal Playwright Smoke Test
 *
 * Verifies the app loads and key UI surfaces are present:
 *   Start Session, History, Dashboard, and May coaching layer.
 *
 * READ-ONLY — no pack file or registry writes.
 *
 * Usage:  node scripts/smoke_test.js
 *         npm run smoke
 * Exit:   0 if all surfaces present, 1 otherwise.
 */

const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const os = require("os");

const ROOT = path.resolve(__dirname, "..");
const HTML = path.join(ROOT, "index_updated.html");
const FILE_URL = "file:///" + HTML.replace(/\\/g, "/");

let failures = 0;

function fail(label) {
  console.log("  FAIL: " + label);
  failures++;
}
function pass(label) {
  console.log("  PASS: " + label);
}

async function main() {
  const tmpDir = path.join(os.tmpdir(), "opencode-smoke-" + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  console.log("=== SMOKE TEST ===");

  const browser = await chromium.launchPersistentContext(tmpDir, {
    headless: true,
    args: ["--disable-extensions", "--no-first-run"],
    viewport: { width: 1280, height: 900 },
  });
  const page = await browser.newPage();

  const pageErrors = [];
  page.on("pageerror", (err) => pageErrors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") pageErrors.push("CONSOLE: " + msg.text());
  });

  // ── Load ─────────────────────────────────────────────────────

  await page.goto(FILE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(4000);

  const title = await page.title();
  if (title.includes("CMA Test Sim")) pass("Title: " + title);
  else fail("Title mismatch: " + title);

  // ── Start Session ────────────────────────────────────────────

  const sessionForm = await page.$("#sessionForm");
  sessionForm ? pass("Start Session panel present") : fail("Start Session panel missing");

  const modeInput = await page.$eval("#mode", (el) => el.value);
  const modeCards = await page.$$eval(".content-card input[type='radio']", (radios) =>
    radios.map((r) => r.value)
  );
  modeInput && modeCards.length >= 4
    ? pass("Mode cards: " + modeCards.join(", ") + " (active: " + modeInput + ")")
    : fail("Mode cards missing (got " + modeCards.length + ")");

  // ── Nav Tabs ─────────────────────────────────────────────────

  const tabCount = await page.$$eval(".tab", (tabs) => tabs.length);
  tabCount >= 4
    ? pass("Nav tabs: " + tabCount)
    : fail("Nav tabs missing (got " + tabCount + ")");

  // ── History ──────────────────────────────────────────────────

  const historyBtn = await page.$("[data-view='historyView']");
  if (historyBtn) {
    await historyBtn.click();
    await page.waitForTimeout(1000);
    const histActive = await page.$eval("#historyView", (el) =>
      el.classList.contains("active") && el.textContent.trim().length > 10
    );
    histActive
      ? pass("History panel active with content")
      : fail("History panel not active or empty");
  } else {
    fail("History tab [data-view='historyView'] not found");
  }

  // ── Dashboard ────────────────────────────────────────────────

  const dashBtn = await page.$("[data-view='dashboardView']");
  if (dashBtn) {
    await dashBtn.click();
    await page.waitForTimeout(1000);
    const dashActive = await page.$eval("#dashboardView", (el) =>
      el.classList.contains("active") && el.textContent.trim().length > 10
    );
    dashActive
      ? pass("Dashboard panel active with content")
      : fail("Dashboard panel not active or empty");
  } else {
    fail("Dashboard tab [data-view='dashboardView'] not found");
  }

  // ── May Coaching Layer ───────────────────────────────────────

  const mayBtn = await page.$("[data-view='coachView']");
  if (mayBtn) {
    await mayBtn.click();
    await page.waitForTimeout(1000);
    const mayActive = await page.$eval("#coachView", (el) =>
      el.classList.contains("active")
    );
    mayActive
      ? pass("May coaching panel active")
      : fail("May coaching panel not active");
  } else {
    fail("May tab [data-view='coachView'] not found");
  }

  // ── May Core Alive (2026-09-19, 3b) ──────────────────────────
  // Regression guard: a destroyed may-core.js (non-object payload) must fail
  // loudly here instead of passing silently. Asserts the core API surface,
  // not just tab activation.
  const mayAlive = await page.evaluate(() => {
    try {
      return typeof May !== "undefined" &&
        typeof May.renderView === "function" &&
        typeof May.handleAction === "function" &&
        typeof May._speak === "function";
    } catch (e) { return false; }
  });
  mayAlive
    ? pass("May core API alive (renderView/handleAction/_speak)")
    : fail("May core API dead — may-core.js payload not intact");

  // ── Script Integrity ─────────────────────────────────────────

  const scriptsLoaded = await page.evaluate(() => {
    const banks = ["MCQ_BANK_A", "MCQ_BANK_B", "MCQ_BANK_C", "MCQ_BANK_D", "MCQ_BANK_E"];
    const results = {};
    for (const b of banks) {
      try {
        const arr = eval(b);
        results[b] = Array.isArray(arr) ? arr.length : typeof arr;
      } catch (e) {
        results[b] = "ERR";
      }
    }
    results._hasMay =
      typeof May !== "undefined";
    results._hasMayFeatureFlags =
      typeof window !== "undefined" &&
      typeof window.MayFeatureFlags !== "undefined";
    results._hasMayContextBuilder =
      typeof window !== "undefined" &&
      typeof window.MayContextBuilder !== "undefined";
    results._hasMayCoachingRouter =
      typeof window !== "undefined" &&
      typeof window.MayCoachingRouter !== "undefined";
    results._hasMayLearnerProfile =
      typeof window !== "undefined" &&
      typeof window.MayLearnerProfile !== "undefined";
    results._hasMayReadinessEngine =
      typeof window !== "undefined" &&
      typeof window.MayReadinessEngine !== "undefined";
    results._hasMayCoachingOrchestrator =
      typeof window !== "undefined" &&
      typeof window.MayCoachingOrchestrator !== "undefined";
    // Phase 0b — real-intent provider (always registered, may not be available until Worker loads model)
    results._hasRealIntentProvider =
      typeof window !== "undefined" &&
      typeof window.MayLLMProviderRegistry !== "undefined" &&
      !!window.MayLLMProviderRegistry.getProvider &&
      !!window.MayLLMProviderRegistry.getProvider('real-intent');
    results._realIntentAvailable =
      typeof window !== "undefined" &&
      typeof window.MayLLMProviderRegistry !== "undefined" &&
      !!window.MayLLMProviderRegistry.getProvider &&
      window.MayLLMProviderRegistry.getProvider('real-intent')
        ? window.MayLLMProviderRegistry.getProvider('real-intent').isAvailable()
        : false;
    results._hasStubIntentProvider =
      typeof window !== "undefined" &&
      typeof window.MayLLMProviderRegistry !== "undefined" &&
      !!window.MayLLMProviderRegistry.getProvider &&
      !!window.MayLLMProviderRegistry.getProvider('stub-intent');
    // Phase 1 — gated routing surface
    results._hasRouteWithGate =
      typeof window !== "undefined" &&
      typeof window.MayLLMProviderRegistry !== "undefined" &&
      typeof window.MayLLMProviderRegistry.routeWithGate === "function";
    results._gateThreshold =
      typeof window !== "undefined" &&
      typeof window.MayLLMProviderRegistry !== "undefined" &&
      typeof window.MayLLMProviderRegistry.getConfidenceGateThreshold === "function"
        ? window.MayLLMProviderRegistry.getConfidenceGateThreshold()
        : null;
    // Phase 2a — per-pipeline threshold
    results._thresholdZeroShot =
      typeof window !== "undefined" &&
      typeof window.MayLLMProviderRegistry !== "undefined" &&
      typeof window.MayLLMProviderRegistry.getThresholdForPipeline === "function"
        ? window.MayLLMProviderRegistry.getThresholdForPipeline('zero-shot-classification')
        : null;
    results._thresholdTextClass =
      typeof window !== "undefined" &&
      typeof window.MayLLMProviderRegistry !== "undefined" &&
      typeof window.MayLLMProviderRegistry.getThresholdForPipeline === "function"
        ? window.MayLLMProviderRegistry.getThresholdForPipeline('text-classification')
        : null;
    // Phase 2b — micro-agents. Check provider classes are loaded into window
    // (script tags wired them). Hidden-beta: providers.isAvailable()=false
    // because ENABLE_*_AGENT flags default to false; the agents are
    // registered as classes but not "routed" via selectProvider() — they
    // are called directly from integration points.
    results._hasMisconceptionAgent =
      typeof window !== "undefined" && typeof window.MisconceptionClassifierProvider === "function";
    results._hasFormulaRetriever =
      typeof window !== "undefined" && typeof window.FormulaRetrieverProvider === "function";
    results._hasHintCalibrator =
      typeof window !== "undefined" && typeof window.HintCalibratorProvider === "function";
    results._misconceptionAgentHidden =
      results._hasMisconceptionAgent
        ? !window.MisconceptionClassifierProvider.prototype.isAvailable.call({})
        : true;
    results._formulaRetrieverHidden =
      results._hasFormulaRetriever
        ? !window.FormulaRetrieverProvider.prototype.isAvailable.call({})
        : true;
    results._hintCalibratorHidden =
      results._hasHintCalibrator
        ? !window.HintCalibratorProvider.prototype.isAvailable.call({})
        : true;
    // Phase 2b+ — additional micro-agents
    results._hasWhisperer =
      typeof window !== "undefined" && typeof window.WhispererProvider === "function";
    results._hasGuard =
      typeof window !== "undefined" && typeof window.GuardProvider === "function";
    results._hasPlanner =
      typeof window !== "undefined" && typeof window.PlannerProvider === "function";
    results._whispererHidden =
      results._hasWhisperer
        ? !window.WhispererProvider.prototype.isAvailable.call({})
        : true;
    results._guardHidden =
      results._hasGuard
        ? !window.GuardProvider.prototype.isAvailable.call({})
        : true;
    results._plannerHidden =
      results._hasPlanner
        ? !window.PlannerProvider.prototype.isAvailable.call({})
        : true;
    results._hasTrackFallback =
      typeof window !== "undefined" &&
      typeof window.MayTelemetry !== "undefined" &&
      typeof window.MayTelemetry.trackFallback === "function";
    results._routerHasPendingSignal =
      typeof window !== "undefined" &&
      typeof window.MayCoachingRouter !== "undefined" &&
      typeof window.MayCoachingRouter.getPendingIntentSignal === "function";
    results._orchestratorHealth = null;
    try {
      if (typeof window.MayCoachingOrchestrator !== 'undefined' &&
          typeof window.MayCoachingOrchestrator.readinessCheck === 'function') {
        results._orchestratorHealth = window.MayCoachingOrchestrator.readinessCheck();
      }
    } catch (e) { results._orchestratorHealth = { error: e.message }; }
    return results;
  });

  const bankSizes = Object.entries(scriptsLoaded)
    .filter(([k]) => k.startsWith("MCQ_BANK_"))
    .map(([, v]) => v);
  const allBanksOk = bankSizes.every((v) => typeof v === "number" && v > 0);
  allBanksOk
    ? pass("All 5 MCQ banks loaded: " + bankSizes.join(", "))
    : fail("MCQ bank load incomplete: " + JSON.stringify(scriptsLoaded));

  scriptsLoaded._hasMay
    ? pass("May coaching layer scripts loaded")
    : fail("May coaching layer scripts missing");

  scriptsLoaded._hasMayFeatureFlags
    ? pass("MayFeatureFlags loaded")
    : fail("MayFeatureFlags missing");

  scriptsLoaded._hasMayContextBuilder
    ? pass("MayContextBuilder loaded")
    : fail("MayContextBuilder missing");

  scriptsLoaded._hasMayCoachingRouter
    ? pass("MayCoachingRouter loaded")
    : fail("MayCoachingRouter missing");

  scriptsLoaded._hasMayLearnerProfile
    ? pass("MayLearnerProfile loaded (MAY-004)")
    : fail("MayLearnerProfile missing (MAY-004)");

  scriptsLoaded._hasMayReadinessEngine
    ? pass("MayReadinessEngine loaded (MAY-005)")
    : fail("MayReadinessEngine missing (MAY-005)");

  scriptsLoaded._hasMayCoachingOrchestrator
    ? pass("MayCoachingOrchestrator loaded (MAY-006)")
    : fail("MayCoachingOrchestrator missing (MAY-006)");

  // Phase 0b — real intent provider registered, not available until Worker loads model
  scriptsLoaded._hasRealIntentProvider
    ? pass("RealIntentProvider registered (Phase 0b)")
    : fail("RealIntentProvider not registered (Phase 0b regression)");

  // Hidden beta invariant: flag is off by default, so real provider must NOT be available
  // (no Worker load triggered) — production behavior unchanged
  scriptsLoaded._realIntentAvailable === false
    ? pass("RealIntentProvider hidden-beta: isAvailable()=false (flag off, no Worker load)")
    : fail("RealIntentProvider hidden-beta INVARIANT BROKEN: isAvailable()=" + scriptsLoaded._realIntentAvailable);

  scriptsLoaded._hasStubIntentProvider
    ? pass("StubIntentProvider registered (Phase 0 preserved)")
    : fail("StubIntentProvider missing (Phase 0 regression)");

  // Phase 1 — gated routing surface
  scriptsLoaded._hasRouteWithGate
    ? pass("routeWithGate exposed on registry (Phase 1)")
    : fail("routeWithGate missing (Phase 1 regression)");

  scriptsLoaded._gateThreshold === 0.60
    ? pass("Confidence gate threshold = 0.60 (Phase 1 default — zero-shot fallback)")
    : fail("Confidence gate threshold = " + scriptsLoaded._gateThreshold + " (expected 0.60)");

  // Phase 2a — per-pipeline thresholds
  scriptsLoaded._thresholdZeroShot === 0.60
    ? pass("Per-pipeline threshold: zero-shot-classification = 0.60 (Phase 2a)")
    : fail("Per-pipeline threshold zero-shot = " + scriptsLoaded._thresholdZeroShot + " (expected 0.60)");

  scriptsLoaded._thresholdTextClass === 0.20
    ? pass("Per-pipeline threshold: text-classification = 0.20 (Phase 2a — Phase 1b fine-tuned, post Phase 2b+ calibration)")
    : fail("Per-pipeline threshold text-classification = " + scriptsLoaded._thresholdTextClass + " (expected 0.20)");

  scriptsLoaded._hasTrackFallback
    ? pass("MayTelemetry.trackFallback exposed (Phase 1)")
    : fail("MayTelemetry.trackFallback missing (Phase 1 regression)");

  scriptsLoaded._routerHasPendingSignal
    ? pass("MayCoachingRouter.getPendingIntentSignal exposed (Phase 1)")
    : fail("MayCoachingRouter.getPendingIntentSignal missing (Phase 1 regression)");

  // Phase 1b — fine-tuned local model artifacts present on disk (Node-side check)
  (function () {
    try {
      const dir = path.join(ROOT, "app/may/providers/models/mobilebert-intent-q8");
      const ok = fs.existsSync(path.join(dir, "onnx", "model.onnx"))
              && fs.existsSync(path.join(dir, "config.json"));
      ok
        ? pass("Fine-tuned model artifacts present (app/may/providers/models/mobilebert-intent-q8)")
        : fail("Fine-tuned model missing on disk (Phase 1b regression)");
    } catch (e) {
      fail("Fine-tuned model filesystem check error: " + e.message);
    }
  })();

  // Phase 2b — micro-agents loaded and hidden
  scriptsLoaded._hasMisconceptionAgent
    ? pass("MisconceptionClassifierProvider loaded (Phase 2b)")
    : fail("MisconceptionClassifierProvider not loaded (Phase 2b regression)");

  scriptsLoaded._hasFormulaRetriever
    ? pass("FormulaRetrieverProvider loaded (Phase 2b)")
    : fail("FormulaRetrieverProvider not loaded (Phase 2b regression)");

  scriptsLoaded._hasHintCalibrator
    ? pass("HintCalibratorProvider loaded (Phase 2b)")
    : fail("HintCalibratorProvider not loaded (Phase 2b regression)");

  // Hidden-beta invariant: providers.isAvailable() === false when flags default to off
  scriptsLoaded._misconceptionAgentHidden
    ? pass("MisconceptionClassifierProvider hidden-beta (flag off → not available)")
    : fail("MisconceptionClassifierProvider INVARIANT BROKEN: available with flag off");

  scriptsLoaded._formulaRetrieverHidden
    ? pass("FormulaRetrieverProvider hidden-beta (flag off → not available)")
    : fail("FormulaRetrieverProvider INVARIANT BROKEN: available with flag off");

  scriptsLoaded._hintCalibratorHidden
    ? pass("HintCalibratorProvider hidden-beta (flag off → not available)")
    : fail("HintCalibratorProvider INVARIANT BROKEN: available with flag off");

  // Phase 2b+ — additional micro-agents loaded + hidden
  scriptsLoaded._hasWhisperer
    ? pass("WhispererProvider loaded (Phase 2b+)")
    : fail("WhispererProvider not loaded (Phase 2b+ regression)");

  scriptsLoaded._hasGuard
    ? pass("GuardProvider loaded (Phase 2b+)")
    : fail("GuardProvider not loaded (Phase 2b+ regression)");

  scriptsLoaded._hasPlanner
    ? pass("PlannerProvider loaded (Phase 2b+)")
    : fail("PlannerProvider not loaded (Phase 2b+ regression)");

  scriptsLoaded._whispererHidden
    ? pass("WhispererProvider hidden-beta (flag off → not available)")
    : fail("WhispererProvider INVARIANT BROKEN: available with flag off");

  scriptsLoaded._guardHidden
    ? pass("GuardProvider hidden-beta (flag off → not available)")
    : fail("GuardProvider INVARIANT BROKEN: available with flag off");

  scriptsLoaded._plannerHidden
    ? pass("PlannerProvider hidden-beta (flag off → not available)")
    : fail("PlannerProvider INVARIANT BROKEN: available with flag off");

  // ── Orchestrator Health Check ──────────────────────────────────

  const orchHealth = scriptsLoaded._orchestratorHealth;
  if (orchHealth && orchHealth.missingModules !== undefined) {
    orchHealth.missingModules.length === 0
      ? pass("Orchestrator readiness check: all 8 dependencies present")
      : fail("Orchestrator missing dependencies: " + orchHealth.missingModules.join(", "));
  } else if (orchHealth && orchHealth.error) {
    fail("Orchestrator readiness check error: " + orchHealth.error);
  } else {
    fail("Orchestrator readiness check: no result");
  }

  // W1-B — verify the unified exam-state signal reaches May's context layer:
  // May.isFullTabBlocked gate, context app.examModeActive, and the
  // recommendedCoachingMode (exam_briefing should now be reachable).
  async function w1bExamStateAssert(label, expectActive) {
    const res = await page.evaluate(() => {
      try {
        const gate = (typeof May !== 'undefined' && typeof May.isFullTabBlocked === 'function') ? May.isFullTabBlocked() : null;
        let ctxActive = null, rec = null;
        if (typeof MayContextBuilder !== 'undefined' && state && state.session && state.session.mcqs && state.session.mcqs.length) {
          const ctx = MayContextBuilder.buildFullContext(state.session.mcqs[0].QuestionID);
          ctxActive = !!(ctx && ctx.app && ctx.app.examModeActive);
          rec = ctx ? ctx.recommendedCoachingMode : null;
        }
        return { gate, ctxActive, rec };
      } catch (e) { return { err: e.message }; }
    });
    if (res.err) { fail(label + ": context assert error: " + res.err); return; }
    res.gate === expectActive
      ? pass(label + ": May.isFullTabBlocked = " + res.gate + " (unified gate)")
      : fail(label + ": May.isFullTabBlocked = " + res.gate + " (expected " + expectActive + ")");
    res.ctxActive === expectActive
      ? pass(label + ": context app.examModeActive = " + res.ctxActive)
      : fail(label + ": context app.examModeActive = " + res.ctxActive + " (expected " + expectActive + ")");
    if (expectActive) {
      res.rec === 'exam_briefing'
        ? pass(label + ": recommendedCoachingMode = exam_briefing (routing reachable)")
        : fail(label + ": recommendedCoachingMode = " + res.rec + " (expected exam_briefing)");
    } else {
      res.rec !== 'exam_briefing'
        ? pass(label + ": recommendedCoachingMode = " + res.rec + " (no exam briefing for non-exam)")
        : fail(label + ": recommendedCoachingMode = exam_briefing (unexpected for non-exam)");
    }
  }

  // ── W1-A: Resume Integrity (exam-integrity-mode restoration) ──────
  // Verifies that resuming a saved session re-derives exam-integrity mode
  // from the restored session (Full Exam / real-conditions -> integrity
  // mode active; normal practice -> integrity mode absent).

  async function suppressOnboarding() {
    await page.evaluate(() => {
      try {
        if (window.GuidedTour) GuidedTour.stop(false);
        if (window.CMAProfileManager) {
          const p = CMAProfileManager.load();
          if (p) { p.onboarding = p.onboarding || {}; p.onboarding.tourCompleted = true; CMAProfileManager.save(p); }
        }
        const prof = JSON.parse(localStorage.getItem("cmaProfile2026") || "null");
        if (prof) { prof.onboarding = prof.onboarding || {}; prof.onboarding.tourCompleted = true; localStorage.setItem("cmaProfile2026", JSON.stringify(prof)); }
        const ov = document.getElementById("guidedTourOverlay");
        if (ov) ov.remove();
      } catch (e) { /* not available */ }
    });
  }

  async function bodyHasClass(cls) {
    return page.evaluate((c) => document.body.classList.contains(c), cls);
  }

  async function startSession(mode, realConditions) {
    await page.evaluate(({ m, rc }) => {
      const modeEl = document.getElementById("mode");
      if (modeEl) modeEl.value = m;
      const rcEl = document.getElementById("realConditions");
      if (rcEl) rcEl.checked = !!rc;
      const f = document.getElementById("sessionForm");
      if (f) f.requestSubmit();
    }, { m: mode, rc: realConditions });
    await page.waitForTimeout(8000); // tiered pool build + first render
    await page.evaluate(() => { try { SessionPersistence.saveImmediate(); } catch (e) {} });
  }

  async function resumeAndAssert(label, expectIntegrity) {
    await page.reload({ waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(4000);
    // W1-A test hygiene — dismiss first-run tour if it re-triggered on reload
    // so it cannot intercept the recovery-modal resume click.
    await page.evaluate(() => {
      try {
        if (window.GuidedTour) GuidedTour.stop(false);
        const ov = document.getElementById("guidedTourOverlay");
        if (ov) ov.remove();
      } catch (e) { /* not available */ }
    });
    const resumeBtn = await page.$("#recoveryResume");
    if (!resumeBtn) { fail(label + ": recovery modal did not appear"); return; }
    await resumeBtn.click();
    await page.waitForTimeout(2500);
    const integrity = await bodyHasClass("exam-integrity-mode");
    const active = await bodyHasClass("session-active");
    integrity === expectIntegrity
      ? pass(label + ": exam-integrity-mode " + (expectIntegrity ? "restored (no integrity bypass)" : "correctly absent"))
      : fail(label + ": exam-integrity-mode " + (expectIntegrity ? "NOT restored (integrity bypass)" : "unexpectedly present"));
    active
      ? pass(label + ": session-active restored")
      : fail(label + ": session-active not restored");
  }

  async function clearForNextScenario() {
    await page.evaluate(() => { try { SessionPersistence.clear(); } catch (e) {} });
    await page.goto(FILE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(3000);
    await suppressOnboarding();
  }

  await suppressOnboarding();

  // Scenario 1 — Full Exam: integrity mode at start and after resume
  await startSession("full", false);
  (await bodyHasClass("exam-integrity-mode"))
    ? pass("W1-A Full exam: exam-integrity-mode active at start")
    : fail("W1-A Full exam: exam-integrity-mode NOT active at start");
  await resumeAndAssert("W1-A Full exam resume", true);
  await w1bExamStateAssert("W1-B Full exam", true);
  await clearForNextScenario();

  // Scenario 2 — Real-conditions practice: integrity mode at start and after resume
  await startSession("mcq", true);
  (await bodyHasClass("exam-integrity-mode"))
    ? pass("W1-A Real conditions: exam-integrity-mode active at start")
    : fail("W1-A Real conditions: exam-integrity-mode NOT active at start");
  await resumeAndAssert("W1-A Real conditions resume", true);
  await w1bExamStateAssert("W1-B Real conditions", true);
  await clearForNextScenario();

  // Scenario 3 — Normal practice: integrity mode must stay absent
  await startSession("mcq", false);
  (await bodyHasClass("exam-integrity-mode"))
    ? fail("W1-A Normal practice: exam-integrity-mode unexpectedly active")
    : pass("W1-A Normal practice: no exam-integrity-mode at start");
  await resumeAndAssert("W1-A Practice resume", false);
  await w1bExamStateAssert("W1-B Practice", false);
  await clearForNextScenario();

  // ── W1-D: Pause-clock integrity (timer pause bug regression) ──────
  // The pause-clock rule (§19.1): elapsed time must exclude paused time on
  // EVERY resume path. The 2026-08-31 fix covered in-memory resume, but pause()
  // never persisted the paused state and auto-save stops while paused — so a
  // reload/tab-close during pause restored a stale unpaused snapshot and the
  // whole pause gap counted as elapsed (timer drain / force-submit on resume).
  // This block reproduces exactly that: pause, wait, reload, resume, and
  // asserts the clock did not move.
  async function remainingSecs() {
    return page.evaluate(() => {
      try { return ExamSessionManager.remaining(); } catch (e) { return -999; }
    });
  }
  await startSession("mcq", false);
  const w1dBefore = await remainingSecs();
  w1dBefore > 0
    ? pass("W1-D Pause clock: session started with positive remaining (" + w1dBefore + "s)")
    : fail("W1-D Pause clock: session did not start (remaining=" + w1dBefore + ")");
  // Pause in-page (no reload yet): overlay must appear, clock must freeze.
  const w1dPauseBtn = await page.$("#pauseBtn");
  if (!w1dPauseBtn) { fail("W1-D Pause clock: pause button absent, cannot pause"); }
  else {
    await w1dPauseBtn.click();
    await page.waitForTimeout(2500);
    const w1dOverlay = await page.$("#resumeBtn");
    w1dOverlay
      ? pass("W1-D Pause clock: pause overlay shown")
      : fail("W1-D Pause clock: pause overlay missing after pause");
    const w1dFrozen = await remainingSecs();
    (w1dFrozen >= w1dBefore - 1)
      ? pass("W1-D Pause clock: in-memory pause froze the clock (" + w1dBefore + "s -> " + w1dFrozen + "s)")
      : fail("W1-D Pause clock: clock drained while paused (" + w1dBefore + "s -> " + w1dFrozen + "s)");
    // Reload DURING pause (the reported recurrence): persisted snapshot must
    // carry paused + _pausedAt so recovery folds the whole gap.
    await page.reload({ waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(4000);
    await page.evaluate(() => {
      try {
        if (window.GuidedTour) GuidedTour.stop(false);
        const ov = document.getElementById("guidedTourOverlay");
        if (ov) ov.remove();
      } catch (e) { /* not available */ }
    });
    const w1dRecBtn = await page.$("#recoveryResume");
    if (!w1dRecBtn) { fail("W1-D Pause clock: recovery modal did not appear after reload-during-pause"); }
    else {
      await w1dRecBtn.click();
      await page.waitForTimeout(2500);
      const w1dOverlayAfter = await page.$("#resumeBtn");
      w1dOverlayAfter
        ? pass("W1-D Pause clock: session still paused after restore (no silent unpause)")
        : fail("W1-D Pause clock: session silently unpaused on restore (pause state lost)");
      const w1dAfter = await remainingSecs();
      // Allow 2s slop for tick boundaries across the reload round-trip.
      (w1dAfter >= w1dBefore - 2)
        ? pass("W1-D Pause clock: reload-during-pause preserved the clock (" + w1dBefore + "s -> " + w1dAfter + "s)")
        : fail("W1-D Pause clock: RELOAD-DURING-PAUSE DRAINED THE CLOCK (" + w1dBefore + "s -> " + w1dAfter + "s)");
      // Explicit resume must also preserve the clock and dismiss the overlay.
      // (Measure immediately pre-click so the budget covers only this step's
      // real unpaused time + one tick boundary — not cumulative slop.)
      const w1dPreResume = await remainingSecs();
      if (w1dOverlayAfter) { await w1dOverlayAfter.click(); await page.waitForTimeout(1500); }
      const w1dFinal = await remainingSecs();
      const w1dGone = await page.$("#resumeBtn");
      (w1dFinal >= w1dPreResume - 2 && !w1dGone)
        ? pass("W1-D Pause clock: explicit resume preserved clock and dismissed overlay (" + w1dPreResume + "s -> " + w1dFinal + "s)")
        : fail("W1-D Pause clock: explicit resume broke clock/overlay (remaining=" + w1dPreResume + "s -> " + w1dFinal + "s, overlay=" + (!!w1dGone) + ")");
    }
  }
  await clearForNextScenario();

  // ── W1-D2: Pause-aware restore validity (paused-longer-than-remaining) ──
  // A session paused longer than its remaining time must STILL be offered for
  // recovery: restore validity must exclude the persisted pause gap, otherwise
  // the user loses the entire in-progress session (no modal at all).
  await startSession("mcq", false);
  const w1d2PauseBtn = await page.$("#pauseBtn");
  if (!w1d2PauseBtn) { fail("W1-D2 Restore validity: pause button absent, cannot pause"); }
  else {
    await w1d2PauseBtn.click();
    await page.waitForTimeout(1000);
    // Simulate an overnight pause: keep only ~10s of ACTIVE elapsed but push
    // RAW elapsed past duration (pause gap 6000s > 5400s default duration).
    // Pre-fix restore() used raw elapsed and refused recovery entirely.
    await page.evaluate(() => {
      try {
        const s = state.session;
        s._pausedAt = Date.now() - 6000 * 1000;
        s.start = s._pausedAt - 10 * 1000;
        SessionPersistence.saveImmediate();
      } catch (e) {}
    });
    await page.reload({ waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(4000);
    await page.evaluate(() => {
      try {
        if (window.GuidedTour) GuidedTour.stop(false);
        const ov = document.getElementById("guidedTourOverlay");
        if (ov) ov.remove();
      } catch (e) { /* not available */ }
    });
    const w1d2RecBtn = await page.$("#recoveryResume");
    if (!w1d2RecBtn) { fail("W1-D2 Restore validity: NO recovery offered for paused-longer-than-remaining session (session lost)"); }
    else {
      pass("W1-D2 Restore validity: recovery offered despite raw elapsed exceeding duration");
      await w1d2RecBtn.click();
      await page.waitForTimeout(2500);
      const w1d2Left = await remainingSecs();
      const w1d2Overlay = await page.$("#resumeBtn");
      (w1d2Left > 0 && w1d2Overlay)
        ? pass("W1-D2 Restore validity: clock alive after restore (" + w1d2Left + "s) and still paused")
        : fail("W1-D2 Restore validity: dead clock or silent unpause after restore (remaining=" + w1d2Left + ", overlay=" + (!!w1d2Overlay) + ")");
    }
  }
  await clearForNextScenario();

  // ── W1-C: Tour framework presence + first-step render ──────────
  // (Full geometry matrix covered by scripts/tour_diagnostic.js.)
  await clearForNextScenario();
  const tourStart = await page.evaluate(() => {
    try {
      if (typeof GuidedTour === "undefined") return { ok: false, reason: "GuidedTour missing" };
      GuidedTour.start("beginner");
      return { ok: true };
    } catch (e) { return { ok: false, reason: e.message }; }
  });
  await page.waitForTimeout(1400);
  const tourRender = await page.evaluate(() => {
    const ov = document.getElementById("guidedTourOverlay");
    const t = document.getElementById("tourTooltip");
    return { overlay: !!ov, tooltip: !!t && t.offsetHeight > 0, next: !!document.getElementById("tourNext") };
  });
  tourStart.ok && tourRender.overlay && tourRender.tooltip && tourRender.next
    ? pass("W1-C: tour framework renders (overlay + tooltip + Next)")
    : fail("W1-C: tour render problem " + JSON.stringify({ tourStart: tourStart, tourRender: tourRender }));
  await page.evaluate(() => { try { if (window.GuidedTour) GuidedTour.stop(false); } catch (e) {} });

  // ── Errors ───────────────────────────────────────────────────

  const defErrors = pageErrors.filter(
    (e) => !e.includes("Fetch API cannot load file://") // expected: file:// blocks fetch
  );
  if (defErrors.length === 0) {
    pass("Zero page/console errors" +
      (pageErrors.length > 0 ? " (" + pageErrors.length + " file:// fetch warnings, expected)" : ""));
  } else {
    fail(defErrors.length + " unexpected page/console error(s)");
    defErrors.slice(0, 5).forEach((e) => console.log("    " + e.substring(0, 120)));
  }

  // ── Verdict ──────────────────────────────────────────────────

  console.log("\n=== VERDICT ===");
  console.log(
    failures === 0
      ? "PASS — all UI surfaces verified"
      : "FAIL — " + failures + " check(s) failed"
  );

  await browser.close();
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch (_) {}

  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error("FATAL:", err.message);
  process.exit(1);
});
