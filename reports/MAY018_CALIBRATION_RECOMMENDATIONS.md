# MAY-018 Calibration Recommendations

**Session:** MAY-018 — Pilot Telemetry Review & Calibration
**Date:** 2026-07-31
**Governance Lane:** Light (read-only — recommendations only, no implementation)
**Phase:** Implementer — Calibration Recommendations

---

## 1. Scope

Threshold tweaks, weight adjustments, and coverage improvements only. No new features. No implementation. All changes deferred to MAY-019 or later with explicit authorization.

---

## 2. Priority 1 — Blocking for Activation

### CAL-01: Fix D10 Dead Path (D8 Shadowing)

**Current:** D8 triggers on `sectionsWithData < 4`. For zero-data profiles (sectionsWithData=0), D8 fires before D10.

**Proposed fix:**
```javascript
// D8 guard: require at least 1 section with data
if (dataSections < 4 && dataSections > 0) {
```

**Impact:** D10 becomes reachable for zero-data profiles. D8 continues to handle 1-3 section profiles.

**Risk:** None — D8's action for zero-section profiles (EXPLAIN, exploratory) is functionally identical to D10's action (EXPLAIN, exploratory). The change only affects labeling and decisionId attribution.

**Verification:** A zero-session profile should trigger D10 (not D8) after fix.

---

### CAL-02: Fix D7 Reachability (D5 Capture)

**Current:** D5 triggers on any topic in `profile.decliningTopics`. Many D7-suitable topics (fragile knowledge, accuracy 60-75%, slightly declining) also appear in `decliningTopics`, causing D5 to capture them before D7.

**Proposed fix (Option A — recommended):** Move D7 before D5 in the priority chain.

**Rationale:** Fragile knowledge (usable but unreliable) requires EXPLAIN mode for consolidation. Declining trends require QUIZ mode for practice. Fragile knowledge is a more specific pattern and should be checked first.

**New order:** D1 → D2 → D3 → D4 → **D7** → D5 → D6 → D8 → D9 → D10

**Impact:**
- D7 profiles now get EXPLAIN (correct pedagogical mode)
- D5 profiles (declining but not fragile) still get QUIZ
- No change to D1-D4 critical paths

**Risk:** Low. D5 still fires for declining topics that don't meet D7's fragility criteria (Tier 3 intervention). The change only affects topics at the D5/D7 boundary.

**Alternative (Option B):** Narrow D5 to exclude topics with Tier 3 interventions. More surgical but adds cross-module dependency.

**Verification:** The "Fragile Knowledge" synthetic profile (L7) should trigger D7 (EXPLAIN) instead of D5 (QUIZ).

---

## 3. Priority 2 — Recommended for Activation

### CAL-03: Investigate "Ready for Focused Review" Unreachability

**Current:** Band score for "Ready for focused review" is 95. No synthetic profile reached this band; maximum observed was 72.

**Root cause:** The composite formula (50% band score + 50% accuracy) creates a structural ceiling. Even at 100% accuracy, the Approaching band (72) yields: 0.5×72 + 0.5×100 = 86. With +5 bonus = 91 — still below 95.

**Calibration options:**
- **Option A:** Lower the Ready threshold from 95 to 88. More achievable while still aspirational.
- **Option B:** Increase accuracy weight from 50% to 70% (was 60% before MAY-013). Accuracy should differentiate top performers more.
- **Option C:** Add per-section band bonuses for sections reaching "Ready for focused review" (e.g., +3 per section).

**Recommendation:** Investigate with a dedicated high-mastery profile (6 sections, all ≥85% accuracy). If that profile doesn't reach 95, recalibrate.

**Verification:** A high-mastery profile (6 sections, ≥85% accuracy, 6+ ready topics) should score ≥88.

---

### CAL-04: Reduce QUIZ Mode Dominance

**Current:** 50% of decisions route to QUIZ mode. D9 (high mastery, challenge intent) uses QUIZ mode — same as D1 (critical remediation).

**Proposed structural improvement:** Differentiate QUIZ sub-types:
- `QUIZ_REMEDIATION` — D1, D2, D5, D6
- `QUIZ_CHALLENGE` — D9 (or a new CHALLENGE mode)

**Impact:** Prevents remediation and challenge content from being conflated in the same mode.

**Risk:** Medium — requires mode contract updates and possibly UI differentiation. Defer to MAY-020+.

**Alternative (low-risk):** Simply tag the decision with `action` (already present: "remediation" vs "challenge") and let the mode handler differentiate content by action type. No mode split needed.

---

## 5. Priority 3 — Deferred, Not Blocking

### CAL-05: Wire trackIntervention Telemetry

**Gap:** `MayTelemetry.trackIntervention()` is defined but never called in the orchestrator.

**Fix location:** `may-coaching-orchestrator.js`, after Stage 5 (interventions):

```javascript
if (interventions && interventions.queue && interventions.queue.length > 0) {
  interventions.queue.slice(0, 3).forEach(function(iv) {
    MayTelemetry.trackIntervention({
      tier: iv.tier,
      tierLabel: iv.tierLabel,
      topic: iv.topic,
      priorityScore: iv.priorityScore
    });
  });
}
```

**Impact:** Enables intervention frequency and tier distribution analysis.

**Risk:** None — wrapped in try/catch, non-blocking.

---

### CAL-06: Wire trackMode Telemetry

**Gap:** `MayTelemetry.trackMode()` is defined but never called.

**Fix location:** `may-coaching-orchestrator.js`, at the return point, after the decision block:

```javascript
if (decision && decision.coachingMode) {
  MayTelemetry.trackMode(decision.coachingMode, 0);
}
```

**Also wire in:** `may-coaching-router.js` dispatchToHandler, to capture mode usage from direct action routing.

**Impact:** Enables mode frequency analysis across both decision-engine and router paths.

**Risk:** None — wrapped in try/catch, non-blocking.

---

### CAL-07: Add Telemetry Persistence

**Current:** Telemetry buffer is in-memory (500 events) and lost on page reload. No persistent analytics.

**Proposed:** Persist snapshots to `localStorage` key `cmaMayPilotTelemetry` on session completion:
```javascript
var snap = MayTelemetry.snapshot();
localStorage.setItem('cmaMayPilotTelemetry', JSON.stringify(snap));
```

**Impact:** Enables post-hoc pilot analysis. Critical for real-user evidence before broader activation.

**Risk:** Low — localStorage write, same pattern as learner state persistence.

---

## 4. Priority 4 — Informational, Long-Term

### CAL-08: Evaluate Band Score Gaps

**Current band gaps:** Recovery→Developing (30pts), Developing→Approaching (20pts), Approaching→Ready (23pts).

**Observation:** The Developing→Approaching gap (20) and Approaching→Ready gap (23) are similar, but the Developing band itself produces score clustering (4 profiles at exactly 52).

**Consideration:** Add an intermediate band (e.g., "Progressing" at ~62) to better differentiate the 50-65 accuracy range.

**Defer to:** Post-pilot data analysis with real learner profiles.

---

### CAL-09: Lower Confidence Penalties

**Current:** No synthetic profile scored below 80 confidence (except L10 with 1 session). Penalties require <2 sessions (-20), >2 insufficient sections (-10), or >1 unstable topic (-15).

**Observation:** The penalty thresholds are calibrated for very sparse data. Most learners with >3 sessions will score 90-100 confidence. This makes confidence a binary metric (high/low) rather than a continuous signal.

**Consideration:** Add graduated penalties for moderate data quality (e.g., 3-5 sessions: -10 instead of -20).

**Defer to:** Post-pilot data.

---

### CAL-10: Test D2+D4 Secondary Action

**Gap:** MAY-012 enhancement added D4 as secondary action when exam ≤30 days with Developing/Recovery readiness. This was not tested in MAY-014 because the D2 profile (L2) had no exam plan.

**Action:** Add synthetic profile: D2-worthy weakness + exam in 21 days + Developing readiness. Verify secondary D4 surfaces.

---

## 5. Calibration Summary Matrix

| ID | Change | Module | Priority | Session | Risk |
|----|--------|--------|----------|---------|------|
| CAL-01 | D8 guard: `sectionsWithData > 0` | decision-engine | P1 | MAY-019 | None |
| CAL-02 | Reorder D7 before D5 | decision-engine | P1 | MAY-019 | Low |
| CAL-03 | Investigate Ready band reachability | readiness-engine | P2 | MAY-019 | Medium |
| CAL-04 | QUIZ sub-type differentiation | coaching-router | P3 | MAY-020+ | Medium |
| CAL-05 | Wire trackIntervention | orchestrator | P3 | MAY-019 | None |
| CAL-06 | Wire trackMode | orchestrator + router | P3 | MAY-019 | None |
| CAL-07 | Telemetry persistence | telemetry | P3 | MAY-019 | None |
| CAL-08 | Band gap evaluation | readiness-engine | P4 | Post-pilot | Medium |
| CAL-09 | Confidence penalties | readiness-engine | P4 | Post-pilot | Low |
| CAL-10 | Test D2+D4 secondary | test coverage | P3 | MAY-019 | None |

---

## 6. What NOT to Calibrate

| Item | Reason |
|------|--------|
| D3 thresholds | MAY-014 calibration validated — working correctly |
| D9 thresholds | MAY-014 calibration validated — working correctly |
| Tier 1-5 classification | MAY-014 calibration validated — correct ordering |
| R3 challenge suppression | MAY-012 calibration validated — correct safety gate |
| Composite floor guard | MAY-013 calibration validated — monotonicity preserved |
| D1 "Not enough data" exclusion | MAY-013 calibration validated — correct exclusion |

---

## 7. Implementation Order

If authorized for MAY-019:

1. **Wave 1 (safe, low-risk):** CAL-05, CAL-06, CAL-07 (telemetry wiring) — try/catch, non-blocking
2. **Wave 2 (structural, medium-risk):** CAL-01, CAL-02 (decision priority fixes) — require regression run
3. **Wave 3 (investigation, read-only):** CAL-03 (readiness band analysis) — no code change
4. **Wave 4 (test coverage):** CAL-10 (synthetic profile addition)
5. **Deferred:** CAL-04 (mode differentiation), CAL-08, CAL-09 (band/confidence recalibration)
