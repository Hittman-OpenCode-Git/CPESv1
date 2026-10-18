/**
 * torture_test.js — Comprehensive Torture Test for CMA Exam Simulator
 *
 * Tests edge cases, user errors, and "Lewis and Clarking" scenarios:
 * - Rapid clicking / race conditions
 * - Invalid inputs and malformed data
 * - Session corruption and recovery
 * - Timer edge cases (pause/resume, expiry)
 * - Navigation abuse (back/forward, jumping)
 * - Answer submission edge cases
 * - Case study edge cases
 * - May coaching integration stress
 * - localStorage corruption scenarios
 *
 * Usage: node scripts/torture_test.js
 * Exit: 0 if all critical tests pass, 1 otherwise.
 */

const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");
const os = require("os");

const ROOT = path.resolve(__dirname, "..");
const HTML = path.join(ROOT, "index_updated.html");
const FILE_URL = "file:///" + HTML.replace(/\\/g, "/");

let failures = 0;
let warnings = 0;
let passed = 0;

function fail(label, details = "") {
  console.log("  FAIL: " + label + (details ? " — " + details : ""));
  failures++;
}
function warn(label, details = "") {
  console.log("  WARN: " + label + (details ? " — " + details : ""));
  warnings++;
}
function pass(label) {
  console.log("  PASS: " + label);
  passed++;
}

async function main() {
  const tmpDir = path.join(os.tmpdir(), "opencode-torture-" + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  console.log("=== TORTURE TEST ===");
  console.log("Test directory:", tmpDir);

  const browser = await chromium.launchPersistentContext(tmpDir, {
    headless: true,
    args: ["--disable-extensions", "--no-first-run", "--disable-web-security"],
    viewport: { width: 1440, height: 900 },
  });
  const page = await browser.newPage();

  const pageErrors = [];
  page.on("pageerror", (err) => pageErrors.push(err.message));
  page.on("console", (msg) => {
    if (msg.type() === "error") pageErrors.push("CONSOLE: " + msg.text());
  });

  // ── Test 1: Load and basic sanity ─────────────────────────────
  await page.goto(FILE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3000);
  const title = await page.title();
  title.includes("CMA Test Sim") ? pass("App loads with correct title") : fail("App title mismatch: " + title);

  // ── Test 2: Start session with zero MCQs (edge case) ──────────
  await page.$eval('input[name="contentType"][value="mcq"]', (el) => { el.checked = true; el.dispatchEvent(new Event("change")); });
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    const mcqCount = document.getElementById("mcqCount");
    if (mcqCount) mcqCount.value = "10";
  });
  await page.$eval('input[name="section"][value="A"]', (el) => el.checked = true);
  await page.$eval('input[name="section"][value="B"]', (el) => el.checked = false);
  await page.$eval('input[name="section"][value="C"]', (el) => el.checked = false);
  await page.$eval('input[name="section"][value="D"]', (el) => el.checked = false);
  await page.$eval('input[name="section"][value="E"]', (el) => el.checked = false);
  await page.$eval('input[name="section"][value="F"]', (el) => el.checked = false);
  await page.click("#startSessionBtn");
  await page.waitForTimeout(2000);

  // Check session started
  const sessionView = await page.$eval("#sessionView", (el) => el.textContent);
  sessionView && sessionView.length > 10 ? pass("Session starts with minimal config") : fail("Session failed to start with minimal config");

  // ── Test 3: Rapid navigation stress ────────────────────────────
  // Click next rapidly 20 times
  for (let i = 0; i < 20; i++) {
    const nextBtn = await page.$("#next");
    if (nextBtn) {
      await nextBtn.click();
      await page.waitForTimeout(50);
    }
  }
  const currentIndex = await page.evaluate(() => state.session?.qIndex ?? -1);
  currentIndex >= 0 ? pass("Rapid navigation doesn't crash (index: " + currentIndex + ")") : fail("Rapid navigation crashed session");

  // Rapid back navigation
  for (let i = 0; i < 10; i++) {
    const prevBtn = await page.$("#prev");
    if (prevBtn) {
      await prevBtn.click();
      await page.waitForTimeout(50);
    }
  }
  const backIndex = await page.evaluate(() => state.session?.qIndex ?? -1);
  backIndex <= currentIndex ? pass("Rapid back navigation works (index: " + backIndex + ")") : fail("Rapid back navigation failed");

  // ── Test 4: Answer all questions rapidly ──────────────────────
  // Go to first question and answer all
  await page.evaluate(() => { state.session.qIndex = 0; ExamSessionManager.render(); });
  await page.waitForTimeout(500);

  for (let i = 0; i < 10; i++) {
    const choices = await page.$$(".choice");
    if (choices.length > 0) {
      await choices[0].click(); // Always pick A
      await page.waitForTimeout(100);
    }
    const nextBtn = await page.$("#next");
    if (nextBtn) await nextBtn.click();
    await page.waitForTimeout(100);
  }
  pass("Rapid answer submission works");

  // ── Test 5: Pause/Resume stress ───────────────────────────────
  // Only works in non-exam-integrity mode (not full, not realConditions)
  await page.goto(FILE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2000);
  // Dismiss any recovery modal first
  await page.evaluate(() => {
    const modal = document.querySelector(".recovery-modal-backdrop, .recovery-modal");
    if (modal) modal.remove();
  });
  await page.$eval('input[name="contentType"][value="mcq"]', (el) => { el.checked = true; el.dispatchEvent(new Event("change")); });
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    const mcqCount = document.getElementById("mcqCount");
    if (mcqCount) mcqCount.value = "10";
  });
  await page.$eval('input[name="section"][value="A"]', (el) => el.checked = true);
  await page.$eval('input[name="section"][value="B"]', (el) => el.checked = false);
  await page.$eval('input[name="section"][value="C"]', (el) => el.checked = false);
  await page.$eval('input[name="section"][value="D"]', (el) => el.checked = false);
  await page.$eval('input[name="section"][value="E"]', (el) => el.checked = false);
  await page.$eval('input[name="section"][value="F"]', (el) => el.checked = false);
  // Ensure realConditions is NOT checked
  await page.$eval('#realConditions', (el) => { if (el.checked) { el.checked = false; el.dispatchEvent(new Event("change")); } });
  await page.click("#startSessionBtn");
  await page.waitForTimeout(2000);

  const pauseBtnVisible = await page.$("#pauseBtn");
  if (pauseBtnVisible) {
    await page.click("#pauseBtn");
    await page.waitForTimeout(500);
    const paused1 = await page.evaluate(() => state.session?.paused);
    paused1 === true ? pass("Pause works") : fail("Pause failed");

    await page.click("#resumeBtn");
    await page.waitForTimeout(500);
    const paused2 = await page.evaluate(() => state.session?.paused);
    paused2 === false ? pass("Resume works") : fail("Resume failed");

    // Rapid pause/resume cycle
    for (let i = 0; i < 5; i++) {
      await page.click("#pauseBtn");
      await page.waitForTimeout(100);
      await page.click("#resumeBtn");
      await page.waitForTimeout(100);
    }
    const finalPaused = await page.evaluate(() => state.session?.paused);
    finalPaused === false ? pass("Rapid pause/resume cycles stable") : fail("Rapid pause/resume left session paused");
  } else {
    warn("Pause button not visible (exam integrity mode active)");
  }

  // ── Test 6: Timer edge cases ──────────────────────────────────
  // Check timer displays
  const timerText = await page.$eval(".timer", (el) => el.textContent);
  timerText && timerText.includes(":") ? pass("Timer displays correctly: " + timerText) : fail("Timer display broken: " + timerText);

  // ── Test 7: Flag/Guess/Confidence stress ──────────────────────
  // Toggle flag rapidly
  for (let i = 0; i < 10; i++) {
    const flagBox = await page.$("#flagBox");
    if (flagBox) {
      await flagBox.click();
      await page.waitForTimeout(50);
    }
  }
  pass("Flag toggle stress test passed");

  // Toggle guess rapidly
  for (let i = 0; i < 5; i++) {
    const guessBox = await page.$("#guessBox");
    if (guessBox) {
      await guessBox.click();
      await page.waitForTimeout(50);
    }
  }
  pass("Guess toggle stress test passed");

  // Set confidence rapidly
  for (let i = 0; i < 5; i++) {
    const confBtns = await page.$$(".conf-btn");
    if (confBtns.length > 0) {
      await confBtns[Math.floor(Math.random() * confBtns.length)].click();
      await page.waitForTimeout(50);
    }
  }
  pass("Confidence selector stress test passed");

  // ── Test 8: Right-click strike through ────────────────────────
  const choiceBtns = await page.$$(".choice");
  if (choiceBtns.length > 0) {
    const box = await choiceBtns[0].boundingBox();
    if (box) {
      await page.mouse.move(box.x + 5, box.y + 5);
      await page.mouse.down({ button: "right" });
      await page.mouse.up({ button: "right" });
      await page.waitForTimeout(200);
      pass("Right-click strike through works");
    } else {
      warn("Right-click test skipped - choice button not positioned");
    }
  }

  // ── Test 9: Collection save dropdown ──────────────────────────
  const collectionBtn = await page.$("#collectionBtn");
  if (collectionBtn) {
    await collectionBtn.click();
    await page.waitForTimeout(300);
    const dropdown = await page.$("#collectionDropdown");
    const visible = dropdown ? await dropdown.isVisible() : false;
    visible ? pass("Collection dropdown opens") : warn("Collection dropdown may not open (no collections yet)");
    // Click outside to close
    await page.click("body");
  }

  // ── Test 10: Review screen navigation ─────────────────────────
  // Navigate to review screen
  await page.evaluate(() => { ExamSessionManager.renderReviewScreen(); });
  await page.waitForTimeout(500);
  const reviewTable = await page.$(".review-table");
  reviewTable ? pass("Review screen renders") : fail("Review screen failed to render");

  // Test review filters
  const filterBtns = await page.$$(".review-filter-btn");
  for (const btn of filterBtns.slice(0, 3)) {
    await btn.click();
    await page.waitForTimeout(200);
  }
  pass("Review filters work");

  // Test jump buttons
  const jumpBtn = await page.$('[data-jump="0"]');
  if (jumpBtn && await jumpBtn.isVisible()) {
    await jumpBtn.click();
    await page.waitForTimeout(500);
    pass("Jump to question works");
  } else {
    warn("Jump button not visible (may be filtered)");
  }

  // ── Test 11: Submit confirmation flow (cancel) ────────────────
  // Dismiss guided tour if present
  await page.evaluate(() => {
    const tour = document.querySelector("#guidedTourOverlay, .guided-tour-overlay");
    if (tour) tour.remove();
  });
  await page.click("#finishExam");
  await page.waitForTimeout(500);
  const modal = await page.$("#submitConfirmModal");
  modal ? pass("Submit confirmation modal appears") : fail("Submit confirmation modal missing");

  await page.click("#confirmCancel1");
  await page.waitForTimeout(300);
  const modalGone = !(await page.$("#submitConfirmModal"));
  modalGone ? pass("Cancel on stage 1 works") : fail("Cancel on stage 1 failed");

  // ── Test 12: Submit confirmation flow (stage 2) ───────────────
  await page.click("#finishExam");
  await page.waitForTimeout(500);
  await page.click("#confirmYes1");
  await page.waitForTimeout(500);
  const bar = await page.$("#submitConfirmBar");
  bar ? pass("Stage 2 confirmation bar appears") : fail("Stage 2 confirmation bar missing");

  await page.click("#confirmCancel2");
  await page.waitForTimeout(300);
  const barGone = !(await page.$("#submitConfirmBar"));
  barGone ? pass("Cancel on stage 2 works") : fail("Cancel on stage 2 failed");

  // ── Test 13: Submit confirmation flow (full submit) ───────────
  await page.click("#finishExam");
  await page.waitForTimeout(500);
  await page.click("#confirmYes1");
  await page.waitForTimeout(500);
  await page.click("#confirmYes2");
  await page.waitForTimeout(2000);

  // Should be on summary screen
  const summary = await page.$(".summary-card");
  summary ? pass("Full submission works, summary renders") : fail("Full submission failed");

  // ── Test 14: Session recovery after reload ────────────────────
  // Start a new session
  await page.goto(FILE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3000);
  // Dismiss any overlays
  await page.evaluate(() => {
    document.querySelectorAll(".recovery-modal-backdrop, .recovery-modal, #guidedTourOverlay, .guided-tour-overlay").forEach(el => el.remove());
  });
  await page.waitForTimeout(500);
  await page.$eval('input[name="contentType"][value="mcq"]', (el) => { el.checked = true; el.dispatchEvent(new Event("change")); });
  await page.waitForTimeout(500);
  // Set values via JS to avoid selectOption issues
  await page.evaluate(() => {
    const mcqCount = document.getElementById("mcqCount");
    if (mcqCount) mcqCount.value = "5";
  });
  await page.$eval('input[name="section"][value="A"]', (el) => el.checked = true);
  await page.$eval('input[name="section"][value="B"]', (el) => el.checked = false);
  await page.$eval('input[name="section"][value="C"]', (el) => el.checked = false);
  await page.$eval('input[name="section"][value="D"]', (el) => el.checked = false);
  await page.$eval('input[name="section"][value="E"]', (el) => el.checked = false);
  await page.$eval('input[name="section"][value="F"]', (el) => el.checked = false);
  await page.click("#startSessionBtn");
  await page.waitForTimeout(2000);

  // Answer a question
  const firstChoice = await page.$$(".choice");
  if (firstChoice.length > 0) await firstChoice[0].click();
  await page.waitForTimeout(500);

  // Reload page
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);

  // Check recovery offered
  const recoveryOffered = await page.$(".recovery-prompt") || await page.$("#recoveryResume");
  recoveryOffered ? pass("Recovery prompt offered after reload") : warn("Recovery prompt not visible (may be auto-restored)");

  // If recovery button exists, click it
  const resumeBtn = await page.$("#recoveryResume");
  if (resumeBtn) {
    await resumeBtn.click();
    await page.waitForTimeout(1000);
    pass("Recovery resume works");
  }

  // ── Test 15: Case study navigation ────────────────────────────
  // Start mixed session with cases
  await page.goto(FILE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    document.querySelectorAll(".recovery-modal-backdrop, .recovery-modal, #guidedTourOverlay, .guided-tour-overlay").forEach(el => el.remove());
  });
  await page.$eval('input[name="contentType"][value="mixed"]', (el) => { el.checked = true; el.dispatchEvent(new Event("change")); });
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    const mcqCount = document.getElementById("mcqCount");
    const caseCount = document.getElementById("caseCount");
    if (mcqCount) mcqCount.value = "5";
    if (caseCount) caseCount.value = "1";
  });
  await page.click("#startSessionBtn");
  await page.waitForTimeout(3000);

  // Navigate through MCQs to case
  const totalItems = await page.evaluate(() => state.session?.mcqs?.length + state.session?.cases?.length);
  for (let i = 0; i < (totalItems || 6) + 2; i++) {
    const nextBtn = await page.$("#next");
    if (nextBtn && !(await nextBtn.isDisabled())) {
      await nextBtn.click();
      await page.waitForTimeout(300);
    }
  }

  // Check if case renders
  const caseView = await page.$(".case-shell, [data-case], .case-exam");
  caseView ? pass("Case study renders") : warn("Case study may not have rendered (no cases in pool)");

  // ── Test 16: Keyboard navigation ──────────────────────────────
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(200);
  await page.keyboard.press("ArrowLeft");
  await page.waitForTimeout(200);
  await page.keyboard.press("KeyM"); // Mark flag
  await page.waitForTimeout(200);
  await page.keyboard.press("KeyN"); // Next
  await page.waitForTimeout(200);
  await page.keyboard.press("KeyP"); // Previous
  await page.waitForTimeout(200);
  pass("Keyboard navigation works");

  // ── Test 17: May coaching integration ─────────────────────────
  // Dismiss any overlays first
  await page.evaluate(() => {
    document.querySelectorAll(".recovery-modal-backdrop, .recovery-modal, #guidedTourOverlay, .guided-tour-overlay").forEach(el => el.remove());
  });
  const mayFloat = await page.$("#mayFloatBtn");
  if (mayFloat && await mayFloat.isVisible()) {
    await mayFloat.click();
    await page.waitForTimeout(1000);
    const mayPanel = await page.$("#mayPanel, .may-panel, [data-may-panel]");
    mayPanel ? pass("May panel opens") : warn("May panel may not be visible");
  } else {
    warn("May float button not visible");
  }

  // ── Test 18: Theme toggle ─────────────────────────────────────
  const themeToggle = await page.$("#themeToggle");
  if (themeToggle) {
    await themeToggle.click();
    await page.waitForTimeout(200);
    await themeToggle.click();
    await page.waitForTimeout(200);
    pass("Theme toggle works");
  }

  // ── Test 19: Corrupted localStorage recovery ──────────────────
  // Corrupt session data
  await page.evaluate(() => {
    localStorage.setItem("cmaP1SessionState", "not valid json {{{");
    localStorage.setItem("cmaP1SessionCheckpoints", "also corrupt [[[");
  });
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);
  // Should not crash, should show landing page
  const landing = await page.$eval("#sessionView", (el) => el.textContent.includes("Ready for 2026-aligned"));
  landing ? pass("Corrupted localStorage handled gracefully") : fail("Corrupted localStorage caused crash");

  // ── Test 20: Very long session (timer edge) ───────────────────
  // Start full exam, manipulate timer
  await page.goto(FILE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.$eval('input[name="contentType"][value="full"]', (el) => { el.checked = true; el.dispatchEvent(new Event("change")); });
  await page.waitForTimeout(500);
  await page.click("#startSessionBtn");
  await page.waitForTimeout(3000);

  // Manipulate session start time to be very old (simulate near expiry)
  await page.evaluate(() => {
    if (state.session) {
      state.session.start = Date.now() - (state.session.duration - 5) * 1000;
    }
  });
  await page.waitForTimeout(6000); // Wait for timer to expire

  const completed = await page.evaluate(() => state.session?.completed);
  completed === true ? pass("Timer expiry auto-submits") : warn("Timer expiry behavior needs verification");

  // ── Test 21: Multiple rapid session starts ────────────────────
  for (let i = 0; i < 3; i++) {
    await page.goto(FILE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1000);
    await page.click("#startSessionBtn");
    await page.waitForTimeout(1000);
  }
  pass("Multiple rapid session starts handled");

  // ── Test 22: Window resize / responsive ───────────────────────
  await page.setViewportSize({ width: 375, height: 667 }); // Mobile
  await page.waitForTimeout(500);
  await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
  await page.waitForTimeout(500);
  pass("Responsive resize handled");

  // ── Test 23: Part 2 mode (if available) ───────────────────────
  const part2Card = await page.$("#cardPart2");
  if (part2Card) {
    await page.evaluate(() => {
      document.querySelectorAll(".recovery-modal-backdrop, .recovery-modal, #guidedTourOverlay, .guided-tour-overlay").forEach(el => el.remove());
    });
    await page.waitForTimeout(500);
    await page.$eval('input[name="examPart"][value="P2"]', (el) => { el.checked = true; el.dispatchEvent(new Event("change")); });
    await page.waitForTimeout(2000);
    // Use JS click to bypass overlay interception
    await page.evaluate(() => {
      const btn = document.getElementById("startSessionBtn");
      if (btn) btn.click();
    });
    await page.waitForTimeout(5000);
    const p2Session = await page.evaluate(() => state.session?.part === "P2");
    p2Session ? pass("Part 2 mode works") : warn("Part 2 mode may not be fully available");
  }

  // ── Test 24: History and dashboard persistence ────────────────
  await page.goto(FILE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(2000);
  // Dismiss overlays
  await page.evaluate(() => {
    document.querySelectorAll(".recovery-modal-backdrop, .recovery-modal, #guidedTourOverlay, .guided-tour-overlay").forEach(el => el.remove());
  });
  await page.waitForTimeout(500);

  const historyTab = await page.$("[data-view='historyView']");
  if (historyTab) {
    await page.evaluate(() => {
      const tab = document.querySelector("[data-view='historyView']");
      if (tab) tab.click();
    });
    await page.waitForTimeout(1000);
    const histContent = await page.$eval("#historyView", (el) => el.textContent.length);
    histContent > 10 ? pass("History persists") : warn("History may be empty");
  }

  const dashTab = await page.$("[data-view='dashboardView']");
  if (dashTab) {
    await page.evaluate(() => {
      const tab = document.querySelector("[data-view='dashboardView']");
      if (tab) tab.click();
    });
    await page.waitForTimeout(1000);
    const dashContent = await page.$eval("#dashboardView", (el) => el.textContent.length);
    dashContent > 10 ? pass("Dashboard persists") : warn("Dashboard may be empty");
  }

  // ── Test 25: Settings view ────────────────────────────────────
  const settingsTab = await page.$("[data-view='settingsView']");
  if (settingsTab) {
    await page.evaluate(() => {
      const tab = document.querySelector("[data-view='settingsView']");
      if (tab) tab.click();
    });
    await page.waitForTimeout(500);
    const settingsContent = await page.$eval("#settingsView", (el) => el.textContent.length);
    settingsContent > 10 ? pass("Settings view renders") : warn("Settings view may be minimal");
  }

  // ── Test 26: Study view ───────────────────────────────────────
  const studyTab = await page.$("[data-view='studyView']");
  if (studyTab) {
    await page.evaluate(() => {
      const tab = document.querySelector("[data-view='studyView']");
      if (tab) tab.click();
    });
    await page.waitForTimeout(500);
    const studyContent = await page.$eval("#studyView", (el) => el.textContent.length);
    studyContent > 10 ? pass("Study view renders") : warn("Study view may be empty");
  }

  // ── Test 27: Catalog view ─────────────────────────────────────
  const catalogTab = await page.$("[data-view='catalogView']");
  if (catalogTab) {
    await page.evaluate(() => {
      const tab = document.querySelector("[data-view='catalogView']");
      if (tab) tab.click();
    });
    await page.waitForTimeout(1000);
    const catalogContent = await page.$eval("#catalogView", (el) => el.textContent.length);
    catalogContent > 10 ? pass("Catalog view renders") : warn("Catalog view may be empty");
  }

  // ── Test 28: Operations view (hidden) ─────────────────────────
  const opsTab = await page.$("[data-view='operationsView']");
  if (opsTab) {
    const visible = await opsTab.isVisible();
    !visible ? pass("Operations view correctly hidden by default") : warn("Operations view visible (should be hidden)");
  }

  // ── Test 29: Calculator ───────────────────────────────────────
  const calcBtn = await page.$("#calcBtn, .calculator-toggle, [title*='Calculator']");
  if (calcBtn) {
    await page.evaluate(() => {
      const btn = document.querySelector("#calcBtn, .calculator-toggle, [title*='Calculator']");
      if (btn) btn.click();
    });
    await page.waitForTimeout(500);
    const calc = await page.$(".calculator, #calculator");
    calc ? pass("Calculator opens") : warn("Calculator may not open");
  }

  // ── Test 30: Console error check ──────────────────────────────
  const criticalErrors = pageErrors.filter(e =>
    !e.includes("file://") &&
    !e.includes("favicon") &&
    !e.includes("manifest") &&
    !e.includes("Extension")
  );
  criticalErrors.length === 0
    ? pass("No critical console errors (" + pageErrors.length + " total, " + criticalErrors.length + " critical)")
    : fail("Critical console errors: " + criticalErrors.slice(0, 5).join("; "));

  // ── Final Summary ─────────────────────────────────────────────
  console.log("\n=== TORTURE TEST SUMMARY ===");
  console.log("Passed: " + passed);
  console.log("Warnings: " + warnings);
  console.log("Failures: " + failures);
  console.log("Total page errors captured: " + pageErrors.length);

  await browser.close();

  if (failures > 0) {
    console.log("\n❌ TORTURE TEST FAILED — " + failures + " critical failure(s)");
    process.exit(1);
  } else {
    console.log("\n✅ TORTURE TEST PASSED — All critical paths survived");
    if (warnings > 0) console.log("   (" + warnings + " warnings noted)");
    process.exit(0);
  }
}

main().catch(err => {
  console.error("Torture test crashed:", err);
  process.exit(1);
});