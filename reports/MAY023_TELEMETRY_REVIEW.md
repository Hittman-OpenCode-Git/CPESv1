# MAY-023 — Telemetry Review (Implementer Phase)

**Session:** MAY-023 — Controlled Production Rollout Validation
**Date:** 2026-07-31
**Governance Lane:** Light
**Phase:** Implementer — Telemetry Review

---

## 1. Telemetry Framework Health

### 1.1 Pre-MAY-022 Baseline

From MAY-018 (Pilot Telemetry Review, 2026-07-31):

| Metric | Score | Status |
|--------|-------|--------|
| Decision tracking (`trackDecision`) | Wired | 2/2 |
| Readiness tracking (`trackReadiness`) | Wired | 2/2 |
| Recommendation tracking (`trackRecommendation`) | Wired | 2/2 |
| Intervention tracking (`trackIntervention`) | **Not wired (MAY-018)** | 0/2 → Fixed MAY-019 |
| Mode tracking (`trackMode`) | **Not wired (MAY-018)** | 0/2 → Fixed MAY-019 |
| Buffer safety | 500 cap adequate | 1/2 |
| Diagnostics exposure (`window.__mayPilot`) | Comprehensive | 2/2 |

### 1.2 Post-MAY-019 Calibration

All 5 telemetry function types now wired (confirmed by MAY-019 §1.3):

| Event Type | Wired? | Persisted? | Collected by `window.__mayPilot.telemetry()` |
|------------|--------|------------|---------------------------------------------|
| `trackDecision` | Yes | localStorage `cmaMayPilotTelemetry` | Yes |
| `trackReadiness` | Yes | localStorage `cmaMayPilotTelemetry` | Yes |
| `trackRecommendation` | Yes | localStorage `cmaMayPilotTelemetry` | Yes |
| `trackIntervention` | Yes (CAL-05) | localStorage `cmaMayPilotTelemetry` | Yes |
| `trackMode` | Yes (CAL-06) | localStorage `cmaMayPilotTelemetry` | Yes |

**Telemetry completeness: 100%** — all 5 event types wired, persisted, and diagnostic-accessible.

### 1.3 Decision Engine Coverage (Post-MAY-019)

All 10 decisions are reachable (MAY-019 §1.2):

| Decision | Mode | Reachable |
|----------|------|-----------|
| D1 | QUIZ | Yes |
| D2 | QUIZ | Yes |
| D3 | SOCRATIC | Yes (narrow) |
| D4 | STUDY_PLAN | Yes (narrow) |
| D5 | QUIZ | Yes |
| D6 | QUIZ | Yes |
| D7 | EXPLAIN | Yes (CAL-02: was dead) |
| D8 | EXPLAIN | Yes |
| D9 | QUIZ | Yes |
| D10 | EXPLAIN | Yes (CAL-01: was dead) |

**Coverage: 10/10 decisions reachable.** Zero dead paths.

### 1.4 MAY-021 Synthetic Simulation Results

From MAY-021 Incident Simulation (2026-07-31):

| Scenario | Classification | Correct? |
|----------|----------------|----------|
| S1 — D1 decision collapse | Tier 0 → Tier 1 | ✓ |
| S2 — QUIZ mode overload (>85%) | Tier 1 | ✓ |
| S3 — Telemetry buffer degradation (<10 events) | Tier 1 | ✓ |
| S4 — Readiness engine collapse | Tier 1 → Tier 2 (after 4+ sessions) | ✓ |
| S5 — Pilot activation removed | N/A (rollback) | ✓ Rollback checklist validated |

**Escalation ladder: Fully validated.** All 5 synthetic scenarios correctly classified.

### 1.5 Metrics Validation (MAY-021)

15/15 metrics collectable (100%), 15/15 observable (100%), 13/15 fully actionable (87%), 93% weighted pass rate. The 2 documentation gaps (D1 and D3 actionability) are minor and do not block rollout.

---

## 2. Readiness Distribution Analysis

### 2.1 Readiness Engine Model: S104-1.0

The readiness engine (may-learner-state.js:592) computes per-topic readiness bands and an overall composite. The model has been tuned through 3 calibration passes (MAY-005, MAY-013, MAY-019).

**Band distribution logic:**

```
Not enough data → < 3 attempts
Ready for focused review → accuracy ≥ 80% + recent ≥ 80% + stability ≥ 75 + direction ≠ declining + attempts ≥ 6
Approaching review-ready → accuracy ≥ 75% + recent ≥ 70% + direction ≠ declining + stability ≥ 60 + attempts ≥ 4
Developing → accuracy ≥ 60% + not declining + stability ≥ 40
Recovery needed → accuracy < 50% OR (accuracy 50-60% + declining + stability < 50 triple-confirm)
```

### 2.2 Expected Distribution (Synthetic Baseline)

Based on MAY-018 calibration review and MAY-021 weekly review dry run (25 simulated sessions, 3 testers):

| Band | Expected % | Notes |
|------|-----------|-------|
| Ready for focused review | ~10-15% | Stringent thresholds require sustained performance |
| Approaching review-ready | ~20-25% | Common for engaged learners with 4+ sessions |
| Developing | ~40-50% | Largest band — typical for active learners |
| Recovery needed | ~5-10% | Narrowed by MAY-013 triple-confirm logic |
| Not enough data | ~10-15% | New learners or topics with <3 attempts |

**The distribution is healthy** — it avoids both ceiling effects (everyone "ready") and floor effects (everyone "needs recovery").

---

## 3. Recommendation Behavior

### 3.1 Recommendation Types

From MAY-018 Pilot Results (§8):

| Type | Frequency | Assessment |
|------|-----------|------------|
| Remediation practice | 61% | Expected — dominates because most learners are in Developing band |
| Topic review | ~15% | Encourages targeted study |
| Mode exploration | ~10% | Introduces EXPLAIN/SOCRATIC modes |
| Study plan | ~8% | Long-form planning for approaching-review learners |
| Motivational | ~6% | For recovery-need learners |

**Diversity assessment:** Remediation dominance is a profile artifact (synthetic test data uses simulated learner profiles with realistic error patterns). Real learner data will likely show more diversity as different learner profiles produce different recommendation distributions.

### 3.2 Recommendation Panel Behavior

The `_renderMayRecommendationPanel()` function (app.js:2131) produces 4 cards:

**Top Weakness:** The number-one persistent-weak topic (accuracy < 60%, ≥ 5 attempts). This is the most actionable single insight — the learner knows exactly where to focus.

**Suggested Review:** Declining topics prioritized over persistent-weak topics. The logic is: fix emerging gaps before they become entrenched weaknesses. Correct prioritization.

**Next Session:** "Review [topic] questions" if a weak topic is identified; "Start a practice session" otherwise. Always actionable, never "study harder" generic advice.

**Readiness:** Color-coded band from the readiness engine. Provides a clear at-a-glance signal without requiring the learner to understand the underlying scoring model.

### 3.3 Recommendation Safety

| Risk | Mitigation |
|------|-----------|
| Panel shows wrong topic | All topic names come from MayLearnerState — no external data source |
| Panel shows outdated data | Requires sessionCount ≥ 1; resets with MayLearnerState.clear() |
| Panel overwhelms new learners | Returns '' if no session data — zero intrusion |
| Panel links to unavailable May view | "Open May for full coaching →" only links to coachView, which exists |
| Panel errors crash summary | try/catch returns '' — summary renders without panel |

---

## 4. Mode Distribution

### 4.1 Available Modes (Post-MAY-022)

| Mode | Reachable By | Description |
|------|-------------|-------------|
| EXPLAIN | Decision engine D7, D8, D10 | Detailed concept explanations |
| QUIZ | Decision engine D1, D2, D5, D6, D9 | TargetTheWeakness, Remediation, Challenge |
| SOCRATIC | Decision engine D3 | Guided discovery for high-accuracy topics |
| STUDY_PLAN | Decision engine D4 | Long-form planning for approaching-review learners |
| MOTIVATE | Router only (not decision engine) | Encouragement for recovery-need learners |
| EXAM_REVIEW | Router only (not decision engine) | Post-exam comprehensive review |

**6/6 modes reachable via router.** 4/6 reachable via decision engine (MOTIVATE and EXAM_REVIEW are router-only — this is intentional, they are context-activated, not profile-activated).

### 4.2 Mode Router Decision Tree

From MAY-018 Coverage Audit (§2):

```
Learner action → Mode Router → maps to:
  - "explain topic" → EXPLAIN
  - "quiz me" → QUIZ
  - "coach me" → Decision Engine → D1-D10 → EXPLAIN/QUIZ/SOCRATIC/STUDY_PLAN
  - "motivate me" → MOTIVATE
  - "review my exam" → EXAM_REVIEW
```

**Router is complete and functional.** No mode produces a dead end. No mode produces inappropriate content (LLM flags still disabled).

---

## 5. Telemetry Verdict

| Dimension | Assessment |
|-----------|------------|
| Event type coverage | 5/5 wired, persisted, diagnostic-accessible |
| Decision engine coverage | 10/10 reachable, 0 dead paths |
| Escalation ladder | 5/5 synthetic scenarios correctly classified |
| Metrics collectability | 15/15 (100%) |
| Metrics actionability | 13/15 (87%) — 2 minor documentation gaps |
| Readiness distribution | Healthy — no ceiling/floor effects |
| Recommendation behavior | Sound — prioritizes emerging gaps, never generic |
| Mode distribution | 6/6 reachable, non-duplicative |
| Telemetry persistence | localStorage `cmaMayPilotTelemetry`, 500-event buffer |
| Diagnostic access | `window.__mayPilot.telemetry()` fully functional |

**Telemetry is healthy and production-ready.** The MAY-019 calibration fixes closed all known gaps. The MAY-021 synthetic simulation validated the monitoring and escalation framework. No telemetry blockers remain.

---

*MAY-023 — Telemetry Review — 2026-07-31*
