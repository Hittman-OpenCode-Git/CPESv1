# MAY-021 — Metrics Validation

**Session:** MAY-021 — Limited Rollout Monitoring Simulation
**Date:** 2026-07-31
**Governance Lane:** Light (validation — no code, no content modifications)
**Phase:** Implementer — Metrics Validation
**Status:** Complete

---

## 1. Objective

Validate all 15 success metrics from `MAY020_ROLLOUT_SUCCESS_METRICS.md` against three criteria:

| Criterion | Definition |
|-----------|------------|
| **Collectable** | The metric can be captured from available data sources without code changes. |
| **Observable** | An operator can determine the metric's value from raw telemetry or tester reports. |
| **Actionable** | If the metric is below target, a clear remediation path is defined. |

---

## 2. Per-Metric Validation

### Category A — Pipeline Reliability (40% weight)

---

#### A1 — Valid Orchestrator Call Rate (15%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | `byType.decision.length` ≥ 5 per telemetry snapshot. Tracked per session; aggregated weekly. |
| Observable | ✓ | Dashboard Panel 2 shows decision count. Operator counts sessions with ≥ 5 decisions. |
| Actionable | ✓ | Success Metrics §6.1: "Check orchestrator wiring in `may-coaching-orchestrator.js`" |

**Verdict:** ✓ All three criteria satisfied.

---

#### A2 — Telemetry Persistence Rate (10%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | `localStorage.getItem('cmaMayPilotTelemetry')` returns non-empty JSON. Tested per session. |
| Observable | ✓ | Tester checks localStorage after session completion. Dashboard shows snapshot timestamp (non-null → persisted). |
| Actionable | ✓ | Escalation Plan §2.2 (Tier 1): "Check localStorage quota; check for JSON.stringify failures." |

**Verdict:** ✓ All three criteria satisfied.

---

#### A3 — All 5 Event Types Captured (10%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | `byType` keys: decision, readiness, recommendation, intervention, mode. All 5 wired (MAY-019 CAL-05, CAL-06 confirmed). |
| Observable | ✓ | Dashboard Panel 1 shows 5/5 checklist. Missing types visible as unchecked items. |
| Actionable | ✓ | Escalation Plan §2.2 (Tier 1): "2 of 5 missing → investigate telemetry wiring." Escalation Plan §2.3 (Tier 2): "3+ missing → major wiring failure → conditional rollback." |

**Verdict:** ✓ All three criteria satisfied.

---

#### A4 — Zero May-Attributed Crashes (5%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | Browser console errors with May stack traces. Tester reports per session. |
| Observable | ✓ | Tester watches console during session (Monitoring Plan §3.2). Testers report any crash. |
| Actionable | ✓ | Escalation Plan §2.4 (Tier 3): "app.js crash traceable to May layer → Immediate rollback." Hard Gate G1: any crash resets rollout clock. |

**Verdict:** ✓ All three criteria satisfied.

**Note:** Crash detection relies on human observation (tester watching the console). In Phase 3, automated crash reporting would increase reliability. Acceptable for a 5-10 tester limited rollout.

---

### Category B — Decision Quality (25% weight)

---

#### B1 — Decision Distribution Alignment (10%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | `byType.decision` grouped by `decisionId`. Computed as % of decisions within ±15% of MAY-014 expected ranges. |
| Observable | ✓ | Dashboard Panel 2 shows per-decision bars with expected range overlays. Weekly review §3.2 table compares actual vs. expected. |
| Actionable | ✓ | Success Metrics §6.2: "Analyze which decisions over/underrepresented. Compare to readiness bands. Consider recalibration." |

**Verdict:** ✓ All three criteria satisfied.

**Edge case:** Decision distribution requires ≥ 50 total decisions for statistical significance (per §2.2). With a 5-tester, 25-session minimum, this is achievable (average 2-3 decisions per tester per session → 125-375 decisions).

**Validation note:** As noted in simulation S1 results, a single decision at 0% may not trigger an automated alert if the aggregate alignment is still ≥ 80%. The weekly review decision table (§3.2) should flag zero-count decisions for human review even when aggregate metrics are nominal. This is a documentation-level recommendation, not a metric defect.

---

#### B2 — Decision Diversity Score (10%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | Distinct count of D1-D10 `decisionId` values across all sessions. Simple count of unique IDs. |
| Observable | ✓ | Dashboard Panel 2 shows all 10 decision bars. Any bar at zero height = unreached decision. Weekly review computes N/10 score. |
| Actionable | ✓ | If < 7/10: investigate which decisions are unreached. Compare profiles to decision reachability map (MAY-019 §1.2). Recalibrate thresholds. |

**Verdict:** ✓ All three criteria satisfied.

---

#### B3 — EXPLAIN Mode Reachable (5%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | `byType.decision` filtered: `action === "EXPLAIN"` (D7, D8, D10). Count > 0 across all sessions. |
| Observable | ✓ | Dashboard Panel 2: D7, D8, D10 bars non-zero. Operator sees EXPLAIN decisions exist. |
| Actionable | ✓ | Success Metrics §6.3: "Run window.__mayPilot.orchestratorReady(). Verify CAL-01/CAL-02 still applied. Create synthetic profile and test." Escalation Plan §2.3 (Tier 2): "EXPLAIN = 0 across multiple sessions → conditional rollback." |

**Verdict:** ✓ All three criteria satisfied.

**Edge case:** What if D7+D8+D10 > 0 but all EXPLAIN decisions come from D10 alone (the "no data" fallback)? The metric B3 only checks "> 0" — it does not distinguish between D7 (fragile), D8 (fragile/difficult), and D10 (no data) EXPLAIN sources. In practice, the weekly review decision table (§3.2) shows per-D breakdown, and the operator would notice D7 and D8 at zero. The metric is not misleading; it's intentionally binary (is EXPLAIN reachable at all?).

---

### Category C — Routing Quality (15% weight)

---

#### C1 — Mode Distribution Within Range (5%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | `byType.mode` grouped by `modeName`. QUIZ share computed as QUIZ ÷ total. Session-level check: is QUIZ 50-75%? |
| Observable | ✓ | Dashboard Panel 3 pie chart shows mode shares. QUIZ > 75% triggers Yellow alert (Dashboard §4.2). |
| Actionable | ✓ | Monitoring Plan §2.3: "QUIZ > 85% → Tier 1." Success Metrics §6.3: "EXPLAIN at 0 → check CAL-01/CAL-02." CAL-04 (QUIZ differentiation) is the prescribed recalibration target. |

**Verdict:** ✓ All three criteria satisfied.

**Note:** The metric target (QUIZ 50-75%) and the alert threshold (QUIZ > 85%) are at different levels. The 10% gap (75-85%) provides a monitoring buffer — no alert fires, but the metric score degrades. This is good design: the metric degrades gradually before the alert trips.

---

#### C2 — All 4 Modes Reachable (5%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | `byType.mode` — check for presence of QUIZ, EXPLAIN, SOCRATIC, STUDY_PLAN as `modeName` values. |
| Observable | ✓ | Dashboard Panel 3 shows all 4 pie slices. Missing mode = blank slice. |
| Actionable | ✓ | Escalation Plan §2.1 (Tier 0): "SOCRATIC + STUDY_PLAN < 3% → log." Escalation Plan §2.3 (Tier 2): "EXPLAIN = 0 → investigate." |

**Verdict:** ✓ All three criteria satisfied.

**Edge case:** SOCRATIC and STUDY_PLAN are expected at 2-5% and 5-15% respectively. At 2%, SOCRATIC events may be sparse — a single SOCRATIC event in an 80-event session is 1.25%, below the 2% floor. The metric uses a cumulative (all sessions) threshold: "SOCRATIC + STUDY_PLAN all have > 0 events." This prevents sparse-event noise from falsely failing the metric.

---

#### C3 — EXPLAIN Mode Not Dead (5%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | `byType.mode` filtered: `modeName === "EXPLAIN"`. Count > 0 in ≥ 50% of sessions. |
| Observable | ✓ | Weekly review §3.3: EXPLAIN mode row shows count and %. Dashboard Panel 3. |
| Actionable | ✓ | Escalation Plan §2.3 (Tier 2): "EXPLAIN = 0 across multiple sessions → conditional rollback." Same action path as B3 and C2 EXPLAIN checks. |

**Verdict:** ✓ All three criteria satisfied.

**Overlap note:** C3 overlaps with B3 (EXPLAIN reachable) and C2 (all 4 modes reachable). The three metrics measure the same concept at different granularities: B3 (binary: any EXPLAIN?), C2 (presence across all 4 modes), C3 (per-session consistency). This redundancy is intentional — EXPLAIN mode was a known dead path before CAL-01/CAL-02 and warrants multiple monitoring angles.

---

### Category D — Intervention Quality (10% weight)

---

#### D1 — All 5 Tiers Reachable (5%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | `byType.intervention` grouped by `tier`. Check for presence of tiers 1-5. |
| Observable | ✓ | Dashboard Panel 5 bar chart shows all 5 tier bars. Missing tier = zero-height bar. |
| Actionable | ✓ | Success Metrics — no specific D1 remediation path. Implicitly: if tier is unreachable, the intervention engine's thresholds for that tier may need recalibration. |

**Verdict:** ⚠ Collectable and Observable — yes. Actionable — partially. The success metrics document notes if a tier is unreachable but does not provide a specific remediation path beyond "recalibrate intervention thresholds." The tier assignments map to readiness bands, so the issue is identifiable, but the resolution path is less specific than for Category A/B/C metrics.

**Recommendation:** Add a brief D1 remediation note to success metrics: "If a tier is unreachable, review the readiness band → tier mapping in the intervention engine. Tier 1 (Critical) requires very low readiness; Tier 5 (Maintain) requires high readiness. If the learner pool never reaches those bands, the tier may be unreachable by design, not by defect."

---

#### D2 — Tier 1 Controlled (3%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | `byType.intervention` filtered: `tier === 1`. Count ÷ total intervention events. |
| Observable | ✓ | Dashboard Panel 5. Tier 1 bar at > 10% triggers Yellow alert. |
| Actionable | ✓ | Escalation Plan §2.2 (Tier 1): "Tier 1 > 10-15% → Review which topics trigger Tier 1; check if Tier 1 recommendations are appropriate." |

**Verdict:** ✓ All three criteria satisfied.

---

#### D3 — Tier 3 Dominant (2%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | `byType.intervention` filtered: `tier === 3`. Count ÷ total. |
| Observable | ✓ | Dashboard Panel 5. Tier 3 bar at 0% or 100% → clearly visible. |
| Actionable | ⚠ | Success Metrics does not provide a specific D3 remediation path. If Tier 3 is 0%, the intervention engine is firing only at extremes (Tier 1-2 crisis or Tier 5 plateau). If Tier 3 is 100%, the intervention engine has zero discrimination. Both are calibration issues, but no specific action is documented. |

**Verdict:** ⚠ Collectable and Observable — yes. Actionable — weak. The success metrics document defines D3 as "Tier 3 (Targeted) dominant" with target 20-50%, but the interpretation guide (§6) does not include a D3-specific remediation section.

**Recommendation:** Add D3 remediation note: "Tier 3 < 20%: intervention engine is not providing 'Targeted Review' for Developing-band learners — check readiness scoring accuracy. Tier 3 > 50%: intervention engine is over-routing to Tier 3 — verify readiness bands are differentiating correctly."

---

### Category E — User Satisfaction (10% weight)

---

#### E1 — Zero Wrong-Coaching Complaints (5%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | Tester reports filed in issue log (Weekly Review Template §4.2). |
| Observable | ✓ | Operator reviews issue log. Count of confirmed wrong-coaching complaints. |
| Actionable | ✓ | Success Metrics §6.4: "Immediate investigation. Confirm or refute. If confirmed → conditional rollback." Hard Gate G2. |

**Verdict:** ✓ All three criteria satisfied.

**Note:** This metric depends on human reporting. Testers must know what "wrong coaching" looks like to report it. The rollout plan (MAY-019 §3.3) documents the expected coaching behavior, giving testers a baseline to compare against.

---

#### E2 — Zero Rollback Events (3%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | Operator tracks rollback events in Weekly Review §4.3. Any Tier 3 escalation counts. |
| Observable | ✓ | Binary — either a rollback occurred or it didn't. Tracked per escalation. |
| Actionable | ✓ | Hard Gate G3: "Any Tier 3 escalation resets the Phase 2 clock to 0 sessions." Rollback procedure defined in Escalation Plan §3. |

**Verdict:** ✓ All three criteria satisfied.

---

#### E3 — Positive Qualitative Feedback (2%)

| Criterion | Result | Evidence |
|-----------|--------|----------|
| Collectable | ✓ | Any tester provides unsolicited positive feedback. Recorded in issue log or tester notes. |
| Observable | ✓ | Operator reviews tester feedback reports. |
| Actionable | ⚠ | Not strictly actionable — the metric is advisory ("adds confidence if positive; not a hard requirement"). If no positive feedback, the rollout can still succeed if other metrics are strong. |

**Verdict:** ⚠ Collectable and Observable — yes. Actionable — intentionally not required. Per Success Metrics §2.5: "Not a hard requirement — if all testers are neutral, the rollout can still succeed." E3 is a qualitative confidence indicator, not a gating metric.

**This is by design.** No remediation path is needed for neutral feedback.

---

## 3. Summary Matrix

| ID | Metric | Weight | Collectable | Observable | Actionable | Overall |
|----|--------|--------|-------------|------------|------------|---------|
| A1 | Orchestrator call rate | 15% | ✓ | ✓ | ✓ | ✓ |
| A2 | Telemetry persistence | 10% | ✓ | ✓ | ✓ | ✓ |
| A3 | 5 event types captured | 10% | ✓ | ✓ | ✓ | ✓ |
| A4 | Zero May crashes | 5% | ✓ | ✓ | ✓ | ✓ |
| B1 | Decision distribution | 10% | ✓ | ✓ | ✓ | ✓ |
| B2 | Decision diversity | 10% | ✓ | ✓ | ✓ | ✓ |
| B3 | EXPLAIN reachable | 5% | ✓ | ✓ | ✓ | ✓ |
| C1 | Mode distribution range | 5% | ✓ | ✓ | ✓ | ✓ |
| C2 | All 4 modes reachable | 5% | ✓ | ✓ | ✓ | ✓ |
| C3 | EXPLAIN not dead | 5% | ✓ | ✓ | ✓ | ✓ |
| D1 | All 5 tiers reachable | 5% | ✓ | ✓ | ⚠ | ⚠ |
| D2 | Tier 1 controlled | 3% | ✓ | ✓ | ✓ | ✓ |
| D3 | Tier 3 dominant | 2% | ✓ | ✓ | ⚠ | ⚠ |
| E1 | Zero wrong-coaching | 5% | ✓ | ✓ | ✓ | ✓ |
| E2 | Zero rollback events | 3% | ✓ | ✓ | ✓ | ✓ |
| E3 | Positive feedback | 2% | ✓ | ✓ | ⚠¹ | ✓¹ |

`¹` E3 is intentionally not actionable — it's an advisory confidence metric, not a gating metric.

---

## 4. Aggregate Assessment

| Grade | Count | Weighted % |
|-------|-------|------------|
| ✓ (fully validated) | 13 of 15 | 91% of weighted score |
| ⚠ (actionability gap) | 2 of 15 | 7% of weighted score |
| ✗ (unvalidated) | 0 of 15 | 0% |

**Weighted pass rate: 93%** (excluding E3 which is intentionally advisory).

---

## 5. Recommendations

### 5.1 Documentation Fixes (Non-Blocking)

| # | Metric | Issue | Recommendation |
|---|--------|-------|----------------|
| R1 | D1 | No specific remediation path documented | Add: "Unreachable tier → review readiness band → tier mapping." |
| R2 | D3 | No specific remediation path documented | Add: "Tier 3 < 20% — check readiness accuracy. Tier 3 > 50% — verify band differentiation." |
| R3 | B1 | Single-decision zero-count not visible in aggregate | Add per-decision zero flag to weekly review decision table |
| R4 | — | Readiness band reachability not a success metric | Consider adding a Category C/D readiness metric for Phase 3 |

### 5.2 Non-Issues (Confirmed Working)

- All 5 Category A metrics (pipeline reliability) are fully validated — highest-weight category (40%)
- All 3 Category B metrics (decision quality) are fully validated — second-highest-weight category (25%)
- All 3 Category C metrics (routing quality) are fully validated
- All 3 Category E metrics are validated (E3 advisory status is by design)

### 5.3 Phase 3 Considerations

The two ⚠ metrics (D1, D3) appear in the lowest-weight category (Intervention Quality, 10% combined weight). Their actionability gaps are minor documentation issues, not structural defects. For Phase 3 full-activation consideration, add the recommended documentation notes. For the Phase 2 limited rollout, the current state is sufficient.

---

## 6. Verdict

| Criterion | Status |
|-----------|--------|
| All 15 metrics are collectable from available data sources | ✓ 15/15 PASS |
| All 15 metrics are observable by an operator | ✓ 15/15 PASS |
| 13 of 15 metrics have clear remediation paths (2 have minor gaps) | ⚠ 13/15 — 87% |
| Highest-weight metrics (A, B) are fully validated | ✓ 40% + 25% = 65% of weight fully validated |
| No metric is non-collectable or non-observable | ✓ 0/15 with ✗ |
| Weighted validation score | ✓ 93% |

**The MAY-020 success metrics framework is operationally sound.** All 15 metrics are collectable and observable. The two minor actionability gaps (D1, D3) are documentation issues in the lowest-weight category that do not block rollout.

---

*MAY-021 — Metrics Validation — 2026-07-31*
