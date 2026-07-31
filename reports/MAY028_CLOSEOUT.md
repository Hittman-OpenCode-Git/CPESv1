# MAY-028 — Session Closeout

**Session:** MAY-028
**Date:** 2026-07-31
**Governance Lane:** Light

---

## 1. Session Summary

MAY-028 added recommendation-card attribution to the May telemetry pipeline, making UA5 (Top Weakness / Suggested Review) and UA6 (Next Session / Readiness) fully measurable.

### What Was Built

| Component | Description |
|-----------|-------------|
| `window._mcc()` | Global helper function — fires card click telemetry + stores attribution context |
| Card `onclick` handlers | All 4 recommendation cards now have click handlers with per-card tracking |
| Card `id` attributes | `may-rec-weakness`, `may-rec-suggested`, `may-rec-next`, `may-rec-readiness` |
| Attribution correlation | Card clicks → `window._mayAttributionCard` → session-start/complete events |
| CSS hover effect | `cursor: pointer`, border-color transition, box-shadow on hover |

### What Was NOT Changed

- Recommendation logic
- Scoring
- Adaptive models
- LLM activation
- Pack/case content
- `question_state`
- Learner delivery pool

## 2. Verification Results

| Gate | Result |
|------|--------|
| `npm run preflight` | PASS — 0 divergences |
| Governance guard tests | PASS — 54/54 |
| `npm run smoke` | PASS — all UI surfaces, 0 errors |
| Syntax check | PASS (localStorage error only — expected in Node) |
| CSS | PASS — valid, no regressions |

## 3. Files Modified

| File | Backed Up? | Changes |
|------|-----------|---------|
| `app.js` | N/A — Light Lane | +4 code blocks (~30 lines added) |
| `styles.css` | N/A — Light Lane | +8 lines (hover effect) |

## 4. Deliverables

| Document | Status |
|----------|--------|
| `reports/MAY028_ATTRIBUTION_PLAN.md` | Complete |
| `reports/MAY028_EVENT_MAP.md` | Complete |
| `reports/MAY028_TELEMETRY_VALIDATION.md` | Complete |
| `reports/MAY028_ATTRIBUTION_ANALYSIS.md` | Complete |
| `reports/MAY028_EFFECTIVENESS_READINESS.md` | Complete |
| `reports/MAY028_CLOSEOUT.md` | Complete (this document) |

## 5. Success Criteria

| Criterion | Met? |
|-----------|------|
| ✅ UA5 measurable | Yes — Top Weakness and Suggested Review card clicks + session attribution |
| ✅ UA6 measurable | Yes — Next Session and Readiness card clicks + session attribution |
| ✅ Per-card attribution working | Yes — `attributionCardId` on session events |
| ✅ Recommendation effectiveness attributable | Yes — click → start → complete funnel per card |
| ✅ No recommendation logic changes | Confirmed — zero changes to recommender/scorer/adaptive |
| ✅ No scoring changes | Confirmed — zero changes to scoring |
| ✅ No governance regressions | Confirmed — preflight 0 divergences, guard 54/54 |
| ✅ Preflight PASS | Confirmed |
| ✅ Smoke PASS | Confirmed |

## 6. Strategic Outcome

Before MAY-028, the project could answer:
> "Did users open May?"

After MAY-028, the project can answer:
> "Which specific recommendation types change study behavior?"

The original MAY-029 gate (≥25 sessions OR ≥14 days OR ≥3 learners) assumed a multi-user, population-analysis deployment. The actual environment is a single primary learner with longitudinal usage. The gate has been recalibrated to behavioral maturity thresholds.

## 7. Next Session

**MAY-029A — Single-Learner Effectiveness Review**

Evaluates whether May influenced behavior for this learner. Gated by:

- ≥5 completed sessions, OR
- ≥1 Recovery Sprint

### Core Questions

1. **Recommendation Conversion:** Presented → Clicked → Session Started → Session Completed
2. **Recovery Effectiveness:** Baseline → Recovery Sprint → Follow-up Session performance
3. **Confidence Calibration:** Wrong + High Confidence vs. Correct + Low Confidence trending
4. **Readiness Movement:** Domain readiness score deltas across sessions
5. **Which recommendation types were ignored?**

### Measurement Model

| Funnel Stage | Data Source |
|-------------|-------------|
| Card presented | `may-telemetry.js` `presented` events |
| Card clicked | `may-telemetry.js` `clicked` events (MAY-028) |
| Session started | `session-start` with `attributionCardId` (MAY-028) |
| Session completed | `session-complete` with `attributionCardId` (MAY-028) |
| Recovery outcome | Recovery Sprint baseline → post-sprint score |
| Confidence calibration | Per-session calibration data |
| Readiness movement | Domain readiness dashboard deltas |

This replaces the original multi-learner population-analysis framing with a single-learner behavioral model. The metrics infrastructure is complete as of MAY-028; the gate is behavioral maturity, not calendar time or learner count.
