# MAY-018 Readiness Distribution Report

**Session:** MAY-018 — Pilot Telemetry Review & Calibration
**Date:** 2026-07-31
**Governance Lane:** Light (read-only analysis)
**Phase:** Implementer — Telemetry Analysis

---

## 1. Data Source

Primary: `reports/MAY014_TELEMETRY.json` — 10 synthetic profiles
Engine: `may-readiness-engine.js` MAY012-1.0

---

## 2. Readiness Score Distribution

### 2.1 Score Spread

| Metric | Value |
|--------|-------|
| Minimum | 0 (L10 — Not enough data) |
| Maximum | 72 (L9 — High Mastery) |
| Mean | 58.0 |
| Range | 72 points |
| Profiles with score >0 | 9 of 10 |

### 2.2 Individual Scores

| Profile | Score | Band | Confidence | Sections w/ Data | Topics at Ready | Topics at Recovery |
|---------|-------|------|------------|-------------------|-----------------|-------------------|
| L1 — Critical Remediation | 42 | Recovery needed | 100 | 5 | 0 | 5 |
| L2 — Critical Weakness | 69 | Developing | 100 | 5 | 5 | 1 |
| L3 — SOCRATIC Unstable | 52 | Developing | 100 | 5 | 0 | 0 |
| L4 — Exam Strategy | 52 | Developing | 100 | 3 | 0 | 0 |
| L5 — Declining Trend | 52 | Developing | 100 | 3 | 0 | 0 |
| L6 — Emerging Weakness | 65 | Approaching review-ready | 100 | 3 | 2 | 0 |
| L7 — Fragile Knowledge | 62 | Approaching review-ready | 100 | 4 | 2 | 0 |
| L8 — Section Coverage Gap | 52 | Approaching review-ready | 100 | 3 | 0 | 0 |
| L9 — High Mastery | **72** | Approaching review-ready | 100 | 5 | 6 | 0 |
| L10 — Section Gap (D10) | 0 | Not enough data | 80 | 0 | 0 | 0 |

---

## 3. Band Distribution

| Band | Score | Profiles | % | Assessment |
|------|-------|----------|---|------------|
| Not enough data | 0 | 1 | 10% | Expected — zero-session profile |
| Recovery needed | 22 | 1 | 10% | Expected — critically low accuracy |
| Developing | 52 | 4 | 40% | **Overrepresented** — 4 profiles cluster at exactly 52 |
| Approaching review-ready | 72 | 4 | 40% | Varied range (52-72), but highest is only 72 |
| Ready for focused review | 95 | 0 | **0%** | **UNREACHABLE** — no profile reached this band |

---

## 4. Band Reachability Analysis

### 4.1 "Ready for focused review" (95) — UNREACHABLE

**Evidence:** The highest-performing synthetic profile (L9 — High Mastery) had:
- 6 topics at ready
- 0 topics at recovery
- 5 sections with data
- 93% accuracy on strongest topic
- 14 sessions, 7-day streak
- Score: 72 — "Approaching review-ready"

**Root cause analysis:**
1. Band scores are conservative: Recovery=22, Developing=52, Approaching=72, Ready=95
2. The gap from Approaching (72) to Ready (95) is 23 points — larger than any other band-to-band gap
3. The topics-at-ready bonus caps at +5 (5+ ready topics)
4. Composite is capped at 98
5. Even with perfect section accuracy (100%), the 50/50 band+accuracy formula at the Approaching band gives: 0.5×72 + 0.5×100 = 86. Plus +5 bonus = 91 — still below 95.

**To reach 95 would require:** Most sections at Developing (52) band or above, plus near-perfect accuracy, plus 5+ topics-at-ready bonus. The band scoring creates a structural ceiling that the accuracy component cannot overcome.

### 4.2 "Developing" (52) — Clustering

Four profiles cluster at exactly 52. This is the midpoint band score. The clustering suggests:
- The 50/50 band+accuracy formula produces 52 when sections are predominantly Developing-band with moderate accuracy
- The Developing band (score 52) is too broad — profiles with 3 sections and low accuracy get the same score as profiles with 5 sections and improving accuracy

### 4.3 "Approaching review-ready" (72) — Wide Range

Four profiles span 52-72 within this band. The band label groups profiles with significantly different readiness levels:
- L8 (52): 3 sections, 0 topics at ready
- L9 (72): 5 sections, 6 topics at ready

---

## 5. Confidence Distribution

| Confidence | Profiles | Notes |
|------------|----------|-------|
| 100 | 9 | All session-heavy profiles |
| 80 | 1 | L10 — only 1 session, 0 sections with data |

Confidence is near-ceiling for all non-zero-data profiles. This suggests:
- The penalty thresholds are too high (requires <2 sessions for -20 penalty)
- The "unstable topics" penalty rarely fires (-15 when >1 unstable topic)
- Most synthetic profiles have >=5 sessions, which easily meets the confidence baseline

---

## 6. Section Coverage

### 6.1 Sections with Data

| Sections | Profiles | % |
|----------|----------|---|
| 5 | 5 | 50% |
| 4 | 1 | 10% |
| 3 | 3 | 30% |
| 0 | 1 | 10% |

### 6.2 Coverage Gaps

D8 triggers when sectionsWithData < 4. In the test set:
- 3 profiles have <4 sections (L4, L5, L8)
- 1 profile has 0 sections (L10)
- 4/10 profiles (40%) trigger the coverage gap decision

This is a high trigger rate, but appropriate — the synthetic profiles were designed to test edge cases, not represent real learner distribution.

---

## 7. Topics-at-Ready Ratio

| Topics at Ready | Profiles |
|-----------------|----------|
| 0 | 7 |
| 1-2 | 2 |
| 5+ | 1 |

**Finding:** 7 of 10 profiles have zero topics at "Ready for focused review." Only the highest-mastery profile (L9) has 6 ready topics. This suggests either:
- The "Ready" threshold for individual topics is too high
- The synthetic profiles are biased toward weaker learners
- Both

---

## 8. Composite Score Formula Audit

### 8.1 Formula Walkthrough (L9 — High Mastery, score=72)

```
Section band scores: Approaching review-ready (72) × 5 sections
Section accuracy (approximate): ~85-93% across sections
50/50 blend: 0.5(72) + 0.5(~90) = ~81 per section
Weighted average: ~81
Floor guard (weighted accuracy): ~90 → max(81, 90) = 90
Topics-at-ready bonus: 6 ready → +5
Final: min(98, 90+5) = 95... but actual score is 72

DISCREPANCY: Expected ~90-95, actual 72. 
```

This suggests the actual per-section accuracy in the composite is lower than the topic-level accuracy suggests. The section accuracy is computed from constituent topic accuracies weighted by attempts, but the section band may be driving the score down more than the formula suggests.

### 8.2 Monotonicity Verification

| Profile | Raw Accuracy (est.) | Score | Higher Acc → Higher Score? |
|---------|--------------------|-------|---|
| L2 (acc ~46% on weakest, 69 overall) | Mixed | 69 | — |
| L6 (acc ~65%) | 65% | 65 | — |
| L9 (acc ~87%) | 87% | 72 | — |

Scores are monotonically aligned with accuracy across the high-low range, but the compression at the top end is notable — a 22-point accuracy difference (65→87) yields only a 7-point score difference (65→72).

---

## 9. Recommendations

| ID | Recommendation | Priority | Rationale |
|----|---------------|----------|-----------|
| RD-01 | Investigate "Ready for focused review" (95) unreachability — recalibrate band gap or boost accuracy weight | P3 | Aspirational band should be reachable by strongest learners |
| RD-02 | Analyze L9 score compression — why does 87% accuracy get only 72? | P3 | Top-end differentiation is important for D9 challenge routing |
| RD-03 | Evaluate Developing band (52) clustering — too many profiles map to same score | P3 | Differentiation within 45-60% accuracy range is lost |
| RD-04 | Consider lowering confidence penalties — 9/10 profiles at 100 suggests penalties never fire | P4 | Confidence should meaningfully differentiate data quality |
| RD-05 | Add "Ready for focused review" synthetic profile to test coverage | P3 | Ensures band reachability is tested before production |
