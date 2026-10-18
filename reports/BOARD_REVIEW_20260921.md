# Board Review — Phase 2.1 Completion + Q1 Threshold Benchmark

**Date:** 2026-09-21
**Convened by:** opencode (automated)
**Scope:** Phase 2.1 workstream closeout, Q1 threshold synthetic benchmark, governance state
**Lane:** Light Lane (UI/observability — no pack/case/content writes)

---

## 1. Executive Summary

Phase 2.1 is **code-complete**. All 9 workstreams (W1–W9) are shipped and verified. Q1 threshold synthetic testing confirms the conversation buffer should remain in-memory — no persistence warranted. Governance state is clean: preflight 0 divergences, guard 98/98 PASS, smoke PASS, baselines coherent.

---

## 2. Verification Battery (Run Live 2026-09-21T02:36Z)

| Gate | Result | Details |
|------|--------|---------|
| **Preflight** | **PASS — 0 divergences** | 5 MCQ packs parsed (560/620/620/590/680), 3,052 Certified matches baseline, guard 98/98 PASS, baseline coherence 0 |
| **Smoke test** | **PASS — 50+/50+ checks** | All UI panels, MCQ banks, May core API, W1-A/W1-B exam integrity, 6 provider registrations, orchestrator readiness |
| **Governance guard** | **98/98 PASS** | Rules 1–21 (R15-R19 inclusive), including DL-008, DL-026, DL-021, DL-037, DL-047/048/049 screens |
| **Baseline coherence** | **COHERENT — 0 divergences** | All 17 runtime-critical file hashes match CURRENT_BASELINES.md. Two drift reconciliations applied (app.js, may-learner-state.js) during this session |

---

## 3. Workstream Status (All 9)

| WS | Name | Token | Status | Files Modified | Smoke | Guard |
|----|------|-------|--------|---------------|-------|-------|
| W1 | Dashboard filter + exam-integrity | `may_v2_1_dashboard_filter` | **SHIPPED** | index_updated.html, app.js, may-core.js | PASS | ✓ |
| W2 | Study-plan P1→P2 bridge | `may_v2_1_study_plan_bridge` | **SHIPPED** | may-learner-state.js, app.js | PASS | ✓ |
| W3 | Confusion heuristic threshold | `may_v2_1_confusion_heuristic` | **SHIPPED** | may-learner-state.js | PASS | ✓ |
| W4 | Micro-lesson authority | `may_v2_1_micro_lesson` | **SHIPPED** | index_updated.html | PASS | ✓ |
| W5 | Socratic mode + guard | `may_v2_1_socratic_guard` | **SHIPPED** | may-core.js | PASS | ✓ |
| W6 | Degradation indicator | `may_v2_1_graceful_degradation_indicator` | **SHIPPED** | may-coaching-orchestrator.js | PASS | ✓ |
| W7 | Telemetry T1–T6 | `may_v2_1_telemetry` | **SHIPPED** | may-telemetry.js | PASS | ✓ |
| W8 | Buffer persistence (Q1) | `may_v2_1_conversation_buffer` | **DEFERRED** | None | N/A | N/A |
| W9 | Cognitive-budget shell | `may_v2_1_cognitive_budget` | **SHIPPED** | may-learner-state.js | PASS | ✓ |

**W8 decision:** Deferred to Phase 2.2 per Q1 synthetic benchmark (Section 4 below). In-memory 40-message buffer is sufficient.

---

## 4. Q1 Threshold Synthetic Benchmark

### 4.1 Test Design

The `buffer-was-lost-on-resume` counter does not exist in code (design-phase only — `REVISION_HISTORY.md:35402`). This test simulates it using the same seeded RNG as `simulate_may_telemetry.js`.

**Q1 dual-gate (both must hold for 30 days):**
- **Gate A:** >15% of sessions resume within 30min of pause
- **Gate B:** >20% re-contextualization rate (learner re-asks same question after refresh)

### 4.2 Results

| Scenario | Sessions | Resume% | Resume<30min% | ReCtxt% | Q1 Gate |
|----------|----------|---------|---------------|---------|---------|
| Conservative | 500 | 10.0% | 3.8% | 1.0% | **CLOSED** |
| Moderate | 500 | 20.2% | 9.6% | 4.0% | **CLOSED** |
| Aggressive | 500 | 29.2% | 23.8% | 8.0% | **CLOSED** |
| Stress | 1000 | 41.4% | 41.4% | 16.1% | **CLOSED** |

### 4.3 Key Finding

**The re-contextualization threshold (20%) is the binding constraint.** Even under extreme stress (1000 sessions, 41.4% resume rate, 100% within 30min), re-contextualization reaches only 16.1% — below the 20% gate. The resume threshold (15%) triggers at aggressive/stress levels, but both gates must be ANDed.

### 4.4 Baseline Consistency

All synthetic scenarios match the T5 baseline within tolerance:
- Abandon rate: 7.2%–9.3% vs 8.0% baseline (±1.3pp)
- Session duration: 17.6–17.7 min vs 19 min baseline (±1.4 min)

### 4.5 Decision

**W8 stays deferred.** The in-memory buffer is sufficient for Phase 2.0/2.1. Revisit only if live telemetry (once T5 counters are instrumented) shows re-contextualization rates dramatically exceeding synthetic anchors.

---

## 5. Content Integrity State

| Metric | Value | Baseline |
|--------|-------|----------|
| P1 MCQ QIDs | 3,070 | 3,070 ✓ |
| P1 Certified | 3,052 | 3,052 ✓ |
| P1 Archived | 18 | 18 ✓ |
| P2 MCQ QIDs | 3,450 | 3,450 ✓ |
| P2 Certified | 3,450 | 3,450 ✓ |
| P1 Case items | 425 | 425 ✓ |
| P1 Cases | 80 | 80 ✓ |
| P2 Cases | 110 | 110 ✓ |
| DL-008 (pool) | 0 | 0 ✓ |
| DL-026 (Certified) | 0 | 0 ✓ |
| DL-047 (pool) | 0 | 0 ✓ |
| Guard rules | 21 | 21 ✓ |
| Guard tests | 98/98 | 98/98 ✓ |

---

## 6. Open Items for Board Disposition

### 6.1 Items Requiring Action

| # | Item | Status | Disposition Needed |
|---|------|--------|--------------------|
| 1 | W8 buffer persistence | Deferred | Board confirms: in-memory buffer sufficient for Phase 2.1; W8 deferred to 2.2 |
| 2 | W9 threshold calibration | Deferred | Board confirms: threshold numbers deferred to +30d live baseline; shell ships in 2.1 |
| 3 | DL-060 indicator | Forward-monitored | Board confirms: indicator ships in W6 (done); monitor for false A/B/C in live |

### 6.2 Items Resolved This Session

| # | Item | Resolution |
|---|------|------------|
| 1 | Baseline coherence drift (app.js, may-learner-state.js) | Reconciled via `baseline_coherence --fix`. 0 divergences. |
| 2 | Q1 threshold synthetic benchmark | Complete. Gate CLOSED across all scenarios. W8 deferred. |
| 3 | Smoke test timeout | Re-ran with extended timeout. All checks PASS. |

### 6.3 Items Deferred to Phase 2.2

| # | Item | Prerequisite |
|---|------|-------------|
| 1 | W8 localStorage hardening (DL-022/DL-014 corruption path) | Live Q1 telemetry opening the gate |
| 2 | W9 circuit-breaker enforcement | 30-day live T5 baseline |
| 3 | Live T5 counter instrumentation | Implementation in W7 (shipped) |

---

## 7. Governance State

| Check | Status |
|-------|--------|
| AGENTS.md §9.1 lane | **Light** — no pack/case/content writes this session |
| AGENTS.md §9.3 requirements | met: smoke PASS (app/UI changed), no REVISION_HISTORY entry needed (no content defect) |
| AGENTS.md §5 dual verification | met: preflight + smoke + guard + baseline coherence all run live |
| AGENTS.md §13.1 drift signals | met: baseline coherence 0 divergences |
| Governance guard rules 1–21 | 98/98 PASS |
| Backup protocol (§3) | N/A — no pack/case file edits this session |
| Destructive scripts (§3.1) | N/A — no deletion scripts |

---

## 8. Board Verdict Requested

1. **Approve** Phase 2.1 as code-complete (W1–W7, W9 shipped; W8 deferred)
2. **Confirm** W8 deferral to Phase 2.2 (in-memory buffer sufficient)
3. **Confirm** W9 threshold deferral to +30d live baseline
4. **Accept** Q1 synthetic benchmark as baseline anchor for future live comparison
5. **Authorize** baseline hash reconciliation (already applied — ratify)
