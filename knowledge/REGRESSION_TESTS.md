# Regression Test Suite — Session Recovery

## Purpose

Permanent regression tests for the Session Recovery System (Sprint 6.2). These tests guard against regressions in data persistence, crash recovery, and transition integrity. Every test must pass before any release.

---

## RT-001 — Interrupted MCQ-to-Case Transition

**Priority:** Critical — this is a real-world failure that cost a user time.

**Origin:** The original bug that motivated Sprint 6.2 — an MCQ-to-case transition interrupted by a browser crash lost all MCQ answers.

### Test Procedure

1. Start a full exam (or a mixed MCQ + case session).
2. Answer at least 5 MCQ questions (vary answers, flag some, set confidence on some).
3. Navigate through all MCQs until reaching the transition point (last MCQ → first case item).
4. Simulate an interruption during the transition:
   - **Option A (browser):** During transition, close the browser tab or kill the process.
   - **Option B (code):** Temporarily inject an error in `renderCase()` to simulate mid-transition failure (see code injection below).
5. Reopen the application.
6. Verify:
   - Recovery dialog appears showing elapsed time.
   - Click **Resume Session**.
   - All 5 MCQ answers are preserved.
   - All flags are preserved.
   - All confidence ratings are preserved.
   - Timer is correct (elapsed time matches the real gap).
   - Current location is at the transition point (case study).
   - Recovery banner appears: *"Your previous exam session was successfully restored. All progress has been recovered."*
7. Click **Discard & Start New**.
8. Verify: state is cleared, no recovery dialog appears on next load.

### Code Injection (if browser crash is impractical)

```javascript
// Temporarily replace renderCase to simulate failure:
const _origRenderCase = ExamSessionManager.renderCase;
ExamSessionManager.renderCase = function() {
    throw new Error('Simulated transition failure');
};
// Trigger transition by navigating past last MCQ
// Then restore:
ExamSessionManager.renderCase = _origRenderCase;
```

### Acceptance Criteria

- [ ] All MCQ answers restored correctly
- [ ] Flags preserved
- [ ] Confidence ratings preserved
- [ ] Timer reflects elapsed time
- [ ] Current position is at expected transition point
- [ ] Recovery banner shown
- [ ] Discard clears state completely
- [ ] Checkpoint array is non-empty after transition (verify in localStorage)

---

## RT-002 to RT-013 — Reliability Test Matrix

See Sprint 6.2.1 test results in VERSION.

Each cell documents: PASS / FAIL + observed behavior.

---

## Automated Test Suite

The 12-test reliability matrix is fully automated in:

```
scripts/test_session_recovery.js
```

Run: `node scripts/test_session_recovery.js`

Expected: 12/12 passed, 0 failed.

---

## Adding New Tests

Use this template:

```markdown
## RT-NNN — <Title>

**Priority:** <Critical | High | Medium | Low>

### Test Procedure

1. <step>
2. <step>

### Acceptance Criteria

- [ ] <criterion>
```
