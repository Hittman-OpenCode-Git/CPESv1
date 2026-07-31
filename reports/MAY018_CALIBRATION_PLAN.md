# MAY-018 Calibration Plan

**Session:** MAY-018 — Pilot Telemetry Review & Calibration
**Date:** 2026-07-31
**Governance Lane:** Light (read-only — recommendations only, no implementation)
**Phase:** Planner — Calibration

---

## 1. Objective

Identify calibration opportunities across the adaptive coaching pipeline based on pilot telemetry and synthetic profile evidence. Produce threshold tweaks, weight adjustments, and coverage improvement recommendations.

**No implementation.** This plan identifies what should change; implementation is deferred to a future session with explicit authorization.

---

## 2. Calibration Focus Areas

### 2.1 D1-D10 Decision Engine (`may-decision-engine.js`)

#### 2.1.1 D3 — Repeated Unstable Weakness (MAY-014 Calibrated)
- **What changed:** Removed `stability < 50` check; now triggers on accuracy<60 + declining + >=5 attempts
- **Verification needed:** Does removal increase D3 reachability without false positives?
- **Evidence source:** MAY-014 telemetry — D3 triggered 1/10 profiles (SOCRATIC mode)

#### 2.1.2 D7 — Fragile Knowledge
- **Issue:** D7 triggered 0/10 profiles in MAY-014 test. D5 (declining trends) captures many D7-suitable profiles first.
- **Root cause:** Priority order D5 → D6 → D7. Topics with declining trend hit D5 before reaching D7's fragility check.
- **Calibration options:**
  - Option A: Swap D6/D7 priority (D7 before D5) — risks over-prioritizing fragile over declining
  - Option B: Narrow D5's catch (exclude Tier 3 intervention topics) — lets D7 capture fragility
  - Option C: Move D7 before D5 — fragile knowledge may be more urgent than general decline
- **Recommendation:** TBD by calibration analysis

#### 2.1.3 D9 — High Mastery Challenge
- **What changed:** Accuracy threshold remains >=85%, >=6 attempts, non-declining direction
- **Verification needed:** Does D9 trigger appropriately for strong learners? Are challenge recommendations surfacing?
- **Evidence source:** MAY-014 telemetry — D9 triggered 1/10 profiles (QUIZ mode for challenge)

#### 2.1.4 D10 — Insufficient Data (Dead Path)
- **Issue:** D8 shadows D10. D8 triggers on `sectionsWithData < 4`, which catches all zero-data profiles. D10 is unreachable.
- **Evidence:** MAY-014 profile L10 (0 sections, 0 data) triggered D8, not D10.
- **Calibration options:**
  - Option A: Add guard to D8: require `sectionsWithData > 0` — D10 handles zero-data case
  - Option B: Move D10 before D8 — insufficient data should precede coverage gap
  - Option C: Accept D8 as correct for zero-data (rename D10 rationale to match)
- **Recommendation:** Option A (minimal change, preserves priority order)

---

### 2.2 Readiness Engine (`may-readiness-engine.js`)

#### 2.2.1 Band Score Thresholds (MAY-012 Calibrated)
| Band | Score | Current Reachability |
|------|-------|---------------------|
| Not enough data | 0 | Reached (1/10 profiles) |
| Recovery needed | 22 | Reached (1/10 profiles) |
| Developing | 52 | Reached (4/10 profiles) |
| Approaching review-ready | 72 | Reached (4/10 profiles) |
| Ready for focused review | 95 | **Never reached (0/10 profiles)** |

- **Issue:** No synthetic profile reached "Ready for focused review" (95). The highest score was 72.
- **Question:** Is 95 appropriately aspirational, or is it blocking legitimate high-performer recognition?
- **Evidence:** D9 high-mastery profile scored 72 (with 93% accuracy on Budgeting Concepts, 14 attempts, 6 topics at ready) — yet still "Approaching review-ready."

#### 2.2.2 Composite Score Formula (MAY-013 Calibrated)
- 50% band score + 50% section accuracy (was 60/40 in MAY-012)
- Floor guard: composite never below weighted raw accuracy
- Topics-at-ready bonus: +1 (2+ ready), +3 (3+), +5 (5+)
- **Verification:** Is the floor guard preventing monotonicity violations? Is the bonus calibrated appropriately?

#### 2.2.3 Confidence Estimation
- Penalty: <2 sessions (-20), >2 sections insufficient data (-10), >1 unstable topic (-15)
- Bonus: recent activity window (+10)
- Range: 10-100
- **Verification:** Are confidence levels meaningful? Do they correlate with actual prediction accuracy?

---

### 2.3 Intervention Prioritizer (`may-intervention-prioritizer.js`)

#### 2.3.1 Tier Classification (MAY-014 Calibrated)
- **What changed:** Removed band-based Tier 1 catch-all; mastery topics (≥80% acc) skip fragile classification
- **Verification:** Does the tier distribution match expected learner patterns?
- **Evidence:** MAY-014 tier counts: Tier 1=5 (D1 profile), Tier 4=6 (D9 profile)

#### 2.3.2 Priority Score Formula
- Base urgency + accuracy gap + instability penalty + exam proximity + recency
- **Verification:** Are priority scores producing meaningful ordering?

---

### 2.4 Adaptive Recommender (`may-adaptive-recommender.js`)

#### 2.4.1 R3 High Mastery Suppression (MAY-012)
- Challenge recommendations suppressed when any topic <50% accuracy
- **Verification:** Is this too aggressive? Does it prevent challenge recommendations for strong learners with one weak topic?

#### 2.4.2 Closed-Loop Outcome Adjustment
- Positive outcome → downgrade priority
- Contradictory outcome → suppress recommendation
- **Verification:** How frequently does the closed loop fire? Does it prevent recommendation cycling?

#### 2.4.3 Recommendation Type Distribution (MAY-014)
| Type | Count | % |
|------|-------|---|
| remediation | 14 | 60.9% |
| review | 2 | 8.7% |
| challenge | 3 | 13.0% |
| practice_mix | 0 | 0% |
| reinforcement | 0 | 0% |

- **Issue:** remediation dominates (61%). R2 (repeated errors → reinforcement) and R8 (case skills gap → practice_mix) never triggered.
- **Question:** Is this distribution realistic for the tested profiles, or are R2/R8 thresholds too high?

---

### 2.5 Telemetry Completeness

| Function | Defined | Wired to Orchestrator | Status |
|----------|---------|----------------------|--------|
| `trackDecision` | Yes | Yes | Active |
| `trackMode` | Yes | **No** | Gap |
| `trackReadiness` | Yes | Yes | Active |
| `trackRecommendation` | Yes | Yes | Active |
| `trackIntervention` | Yes | **No** | Gap |

- **Gap 1:** `trackMode` never called — mode usage frequency is untracked
- **Gap 2:** `trackIntervention` never called — intervention tier/topic/priority is untracked
- **Gap 3:** `startTimer`/`endTimer` exist but never used — no performance timing
- **Gap 4:** No persistent telemetry export — buffer is lost on page reload

---

## 3. Calibration Priority Matrix

| Priority | Item | Severity | Effort | Blocking? |
|----------|------|----------|--------|-----------|
| **P1** | D10 dead path (D8 shadowing) | Medium | Low | Blocks D10 reachability |
| **P2** | D7 reachability (D5 capture) | Medium | Medium | Under-uses EXPLAIN mode |
| **P3** | "Ready for focused review" unreachable | Low | Medium | Aspirational band unused |
| **P4** | trackIntervention telemetry gap | Low | Low | Missing data |
| **P5** | trackMode telemetry gap | Low | Low | Missing data |
| **P6** | QUIZ mode dominance (60%) | Informational | High | May reflect profile mix, not bug |
| **P7** | remediation recommendation dominance (61%) | Informational | Medium | May reflect profile mix |

---

## 4. Implementation Constraints

- No implementation in this session
- All changes would require MAY-019 or later session
- Decision engine changes require full regression run
- Readiness score changes require recalibration across all archetypes
- Telemetry wiring changes are safe (try/catch, non-blocking)

---

## 5. Output Artifacts

| Artifact | Purpose |
|----------|---------|
| `MAY018_CALIBRATION_RECOMMENDATIONS.md` | Prioritized list with threshold specifics |
| `MAY018_EFFECTIVENESS_REVIEW.md` | Coaching quality assessment |

---

## 6. Success Criteria

| Criterion | Target |
|-----------|--------|
| All D1-D10 assessed for calibration | 10/10 |
| Readiness bands evaluated | 5/5 bands |
| Intervention tiers evaluated | 5/5 tiers |
| Recommender rules evaluated | 10/10 rules |
| Telemetry gaps documented | All gaps |
| No implementation | 0 code changes |
