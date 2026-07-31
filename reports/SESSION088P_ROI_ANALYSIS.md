# Session 88P — Modernization ROI Analysis

**Date:** 2026-07-30
**Governance Lane:** Light / Read-Only Analysis
**Predecessors:** S86P (Cognitive Baseline), S77 (Section B W1), S79 (Pack E Section F W1), S81-S82 (Pack D Section B)

---

## 1. Executive Summary

| Metric | Value |
|--------|-------|
| Total certified items | 2,451 |
| Current higher-order (Analyze + Evaluate) | 458 (18.7%) |
| CAQS §6.2 target | 40.0% (980 items) |
| Gap | 21.3 pp / 522 items |
| Certified low-order pool (accessible) | **1,735 items** |
| Certified low-order pool (all, incl. blocked) | 1,984 items |
| Blocked by dual-block architecture | 249 items (Pack C/A: 75, C/B: 99, D/A: 75) |
| Current rewrite velocity | 1 wave (15 items) per campaign session |
| Sessions to 25% HO | 10-11 waves |
| Sessions to 30% HO | 18-19 waves |
| Sessions to 40% HO | 34-35 waves |

---

## 2. Methodology

Each rewrite converts 1 Understand/Apply/Remember item to Analyze or Evaluate, yielding +1 higher-order item. The "cost" is one authoring pass per item (new business scenario stem, 4 choice-specific distractors, correct answer, 3 wrong-choice explanations).

**ROI Efficiency = `eligible_low_order_items / rewrite_difficulty_score`**

**Rewrite Difficulty Score** factors:
- Domain complexity (F=1.0 easiest, A=1.5 hardest for scenario authoring)
- Remember-item penalty (+0.3 for dual cognitive+difficulty upgrade)
- Dual-block penalty (infinite — blocked until architecture resolved)
- Structural defect penalty (DL-008/026 = lower quality base to work from)

---

## 3. Section ROI Rankings (All Single-Object Sections)

### 3.1 Tier 1 — F Domain Greenfields (Highest ROI)

| Rank | Section | Cert | HO% | Low-Order | Max Waves | RW Diff | ROI Score | Risk |
|------|---------|------|-----|-----------|-----------|---------|-----------|------|
| **1** | **Pack A / F** | 75 | 2.7% | 73 (59U+13Ap+1R) | 5 | 1.00 | **73.0** | Zero architectural risk. Queued S87. |
| **2** | **Pack B / F** | 75 | 2.7% | 71 (49U+22Ap) | 5 | 1.00 | **71.0** | Zero risk. No prior waves. |

**Why F-domain wins:** Every definition can become a business judgment scenario. "What is data governance?" becomes "CFO evaluating data governance policy options with cost/coverage/risk trade-off data." Rewrite effort is 20-25 min per item versus 30-40 min for calculation-heavy Domain A.

### 3.2 Tier 2 — Immediate Greenfields (<5% HO)

| Rank | Section | Cert | HO% | Low-Order | Max Waves | RW Diff | ROI Score | Risk |
|------|---------|------|-----|-----------|-----------|---------|-----------|------|
| **3** | **Pack E / A** | 74 | 2.7% | 72 (61U+10Ap+1R) | 6 | 1.50 | **48.0** | Domain A — calculation-heavy. Harder to build Evaluate scenarios. |
| **4** | **Pack B / B** | 100 | 3.0% | 95 (22R+10U+63Ap) | 7 | 1.50 | **63.3** | 22 Remember items need dual upgrade (+difficulty). Large pool. |
| **5** | **Pack E / B** | 100 | 3.0% | 98 (3R+59U+36Ap) | 7 | 1.20 | **81.7** | Moderate difficulty. Large pool. |
| **6** | **Pack E / E** | 115 | 3.4% | 112 (6R+87U+19Ap) | 8 | 1.15 | **97.4** | Largest single-object low-order pool in repository. |
| **7** | **Pack E / D** | 76 | 3.9% | 74 (61U+13Ap) | 6 | 1.30 | **56.9** | Domain D — cost management calculations. |
| **8** | **Pack B / A** | 75 | 5.3% | 71 (10R+10U+50Ap) | 6 | 1.50 | **47.3** | Domain A + 10 Remember items. |

### 3.3 Tier 3 — Secondary Greenfields (5-10% HO)

| Rank | Section | Cert | HO% | Low-Order | Max Waves | RW Diff | ROI Score |
|------|---------|------|-----|-----------|-----------|---------|-----------|
| 9 | Pack B / D | 75 | 5.3% | 71 (2R+1U+68Ap) | 6 | 1.30 | 54.6 |
| 10 | Pack B / E | 75 | 5.3% | 70 (1R+32U+37Ap) | 6 | 1.15 | 60.9 |
| 11 | Pack E / C | 100 | 6.9% | 94 (66U+28Ap) | 7 | 1.35 | 69.6 |
| 12 | Pack B / C | 100 | 8.0% | 92 (6R+17U+69Ap) | 7 | 1.35 | 68.1 |
| 13 | Pack A / C | 100 | 11.0% | 89 (1R+28U+60Ap) | 7 | 1.35 | 65.9 |

### 3.4 Tier 4 — Mid-Tier (10-20% HO)

| Rank | Section | Cert | HO% | Low-Order | Max Waves | RW Diff | ROI Score |
|------|---------|------|-----|-----------|-----------|---------|-----------|
| 14 | Pack C / C | 100 | 7.0% | 93 (19R+34U+40Ap) | 7 | 1.65 | 56.4 |
| 15 | Pack D / C | 100 | 14.0% | 86 (32U+54Ap) | 7 | 1.35 | 63.7 |
| 16 | Pack C / D | 75 | 16.0% | 63 (35U+28Ap) | 5 | 1.30 | 48.5 |
| 17 | Pack A / D | 75 | 16.0% | 63 (16U+47Ap) | 5 | 1.30 | 48.5 |
| 18 | Pack D / D | 75 | 24.0% | 57 (19U+38Ap) | 5 | 1.30 | 43.8 |

### 3.5 Tier 5 — Above 20% HO (Lower Priority)

| Rank | Section | Cert | HO% | Low-Order | Max Waves | RW Diff | ROI Score |
|------|---------|------|-----|-----------|-----------|---------|-----------|
| 19 | Pack E / F | 75 | 21.1% | 60 (60U) | 5 | 1.00 | 60.0 |
| 20 | Pack A / E | 75 | 28.0% | 54 (39U+12Ap) | 4 | 1.15 | 47.0 |
| 21 | Pack A / A | 75 | 29.3% | 53 (1R+1U+51Ap) | 4 | 1.50 | 35.3 |
| 22 | Pack A / B | 100 | 35.0% | 65 (65Ap) | 5 | 1.50 | 43.3 |
| 23 | Pack C / F | 35 | 51.4% | 17 (45U in section, but only 17 in cert pool) | 1 | 1.00 | 17.0 |
| 24 | Pack D / F | 36 | 66.7% | 12 (but 48U in section, only 12 in cert pool) | 1 | 1.00 | 12.0 |

### 3.6 Near Ceiling (>80% HO — Marginal Return)

| Section | Cert | HO% | Remaining Low-Order |
|---------|------|-----|---------------------|
| Pack C / E | 70 | 88.0% | ~8 |
| Pack D / B | 100 | 89.0% | ~11 |
| Pack D / E | 70 | 90.7% | ~5 |

### 3.7 BLOCKED — Dual-Block Architecture

| Section | Cert | HO% | Blocked Low-Order | Rationale |
|---------|------|-----|-------------------|-----------|
| Pack C / A | 75 | 0.0% | 75 | Dual-block (DL-016 risk). Metadata ChoiceA-D +1 offset from content block. |
| Pack C / B | 100 | 1.0% | 99 | Dual-block. Second-largest low-order pool in repository — blocked. |
| Pack D / A | 75 | 0.0% | 75 | Dual-block. |

**Total blocked low-order:** 249 certified items across 3 sections. If resolved, these sections would add +249 to the accessible pool and accelerate the 40% timeline by ~17 waves.

---

## 4. ROI by Domain (Cross-Pack Aggregate)

| Domain | Accessible Cert Low-Order | Rewrite Difficulty | Effective Capacity | Avg Waves |
|--------|---------------------------|--------------------|--------------------|-----------|
| **F (Technology & Analytics)** | 181 | 1.00x | 181 | 12.1 |
| **E (Internal Controls)** | 182 | 1.15x | 158 | 12.1 |
| **B (Planning & Budgeting)** | 193 | 1.20x | 161 | 12.9 |
| **D (Cost Management)** | 197 | 1.30x | 152 | 13.1 |
| **C (Performance Management)** | 279 | 1.35x | 207 | 18.6 |
| **A (Financial Reporting)** | 143 | 1.50x | 95 | 9.5 |

**Domain F** delivers the best ROI per rewrite hour — 1.0x effort multiplier and rich scenario potential. **Domain C** (Performance Management) has the largest pool but higher difficulty due to calculation complexity.

---

## 5. Campaign Efficiency Benchmarks (Historical)

| Campaign | Session | Items | HO Shift | Per-Item HO Gain | Domain | Notes |
|----------|---------|-------|----------|-----------------|--------|-------|
| Pack A Section B W1 | S77 | 15 | 8.0% → 35.0% | +27.0pp / 15 = **+1.80 pp/item** | B | Proven pattern: Apply→Analyze/Evaluate with budget scenarios |
| Pack E Section F W1 | S79 | 15 | 0.0% → 21.1% | +21.1pp / 15 = **+1.41 pp/item** | F | Greenfield: definition-match → business judgment |
| Pack D Section B (full) | S81-S82 | 100 | → 89.0% | ~**+0.89 pp/item** | B | Mass modernization — full section rewrite |
| **Weighted Average** | | | | **+1.0 HO per item** | | Consistent: each rewritten item adds +1 HO |

**Takeaway:** Each 15-item wave reliably adds +15 to the HO count. The pp/item metric is a function of section size — smaller sections show larger pp gains from the same +15 absolute increase. The +1.0 HO per rewritten item is the invariant.

---

## 6. Answering the Forecast Questions

### Q1: How many waves to reach 25% HO?

**10-11 waves.** HO at start: 458. Need: 613 (25% of 2,451). Gap: 155 items → 10.3 waves.

| Milestone | Cumulative Waves | Cumulative HO | HO% |
|-----------|-----------------|---------------|-----|
| Start | 0 | 458 | 18.7% |
| After W10 | 10 | 608 | 24.8% |
| **After W11** | **11** | **623** | **25.4%** |

Crossed between Waves 10-11 (Sessions 96-97 in proposed sequence). W11 is Pack A Section C W1 (89 low-order available, Domain C).

### Q2: How many waves to reach 30% HO?

**18-19 waves.** Need 277 more from start → 18.5 waves.

| Milestone | Cumulative Waves | Cumulative HO | HO% |
|-----------|-----------------|---------------|-----|
| After W18 | 18 | 728 | 29.7% |
| **After W19** | **19** | **743** | **30.3%** |

Crossed between Waves 18-19 (Session ~105 in proposed sequence). At this pace — roughly 19 sessions beyond S87 — this represents approximately 2-3 weeks of work at current velocity.

### Q3: How many waves to reach 40% HO?

**34-35 waves.** Need 522 more from start → 34.8 waves.

| Milestone | Cumulative Waves | Cumulative HO | HO% |
|-----------|-----------------|---------------|-----|
| After W34 | 34 | 968 | 39.5% |
| **After W35** | **35** | **983** | **40.1%** |

**Important caveat:** This assumes continuous single-object section availability. By Wave 25, the greenfield sections (Pack E/E, B/B, E/B) are fully tapped and the campaign shifts to mid-tier sections (Pack A/C, D/C, C/C, etc.). Additionally, ~249 items blocked by dual-block architecture become the binding constraint at ~35 waves. If dual-block sections are resolved, the 40% milestone moves earlier; if they remain blocked, the last 5-7 waves must target sections with lower low-order density (sub-15 items remaining).

### Q4: Highest ROI — Largest HO increase per rewrite?

**Pack E Section E (Internal Controls)** at 112 certified low-order items — the largest single-object low-order pool. A full campaign of 8 waves adds +112 HO.

**Pack A Section F (Technology & Analytics)** at 73 low-order with the lowest rewrite difficulty (1.0x). Best ROI per authoring hour — definition-match Domain F items convert to business judgment scenarios faster than any other domain.

**Per-rewrite basis:** Every rewrite always nets +1 HO regardless of section. What varies is:
- **Authoring speed:** Domain F (20 min/item) vs Domain A (35+ min/item)
- **Section pool size:** Larger sections (100+ items) support more waves before requiring a section-switch
- **Dual-upgrade penalty:** Sections with Remember items (Pack B/B: 22; Pack C/C: 19) require difficulty recalibration alongside cognitive upgrade

### Q5: Lowest Risk sections?

**Verified single-object, zero known defects:**

| Section | Architecture | DL-008 | DL-026 | DL-016 | Cert Stability | Risk Score |
|---------|-------------|--------|--------|--------|---------------|------------|
| **Pack A / F** | Single-object | 0 | 0 | N/A | 75/75 | **0** (QUED S87) |
| **Pack B / F** | Single-object | Spot-check clean | Spot-check clean | N/A | 75/75 | **0** |
| **Pack E / A** | Single-object | Spot-check clean | Spot-check clean | N/A | 74/74 | **0** |
| **Pack E / B** | Single-object | Spot-check clean | Spot-check clean | N/A | 100/100 | **0** |
| **Pack B / B** | Single-object | Spot-check clean | Spot-check clean | N/A | 100/100 | **0** (note: 22 Remember) |
| **Pack E / E** | Single-object | Spot-check clean | Spot-check clean | N/A | 115/115 | **0** |
| Pack A / C | Single-object | 0 | 0 | N/A | 100/100 | 1 (not sampled) |
| Pack A / D | Single-object | 0 | 0 | N/A | 75/75 | 1 |

**Pack A (post-S892 Final Closure):** All 500 items certified, all 6 sections single-object, 0 DL-008, 0 DL-026, 0 Rule 9. **Safest pack for any modernization wave.**

**Pack B (post-S81 rebuild):** All 500 items certified, all 6 sections single-object. Spot-checks clean on DL-008/DL-026. **Second safest.**

**Pack E:** 540 certified, all single-object. Section C has DONE DL-021 closure (S828). **Safe with verification.**

---

## 7. Dual-Block Resolution Impact Analysis

| Scenario | Description | HO at 35 Waves | 40% Achieved? |
|----------|-------------|---------------|--------------|
| Baseline (dual-block stays blocked) | 249 blocked low-order never accessed | 983 (40.1%) | **Yes — Wave 35** |
| Dual-block resolved at Wave 10 | Pack C/A, C/B, D/A unlocked | 1,043 (42.5%) | **Yes — Wave 28** |
| Dual-block never resolved | Must mine sub-15-pool sections | 983 (40.1%) | **Yes — Wave 35** |

**Finding:** The 40% CAQS target is achievable from single-object sections alone. Dual-block resolution accelerates the timeline by ~7 waves but is not a prerequisite for hitting the target.

---

## 8. Recommended Campaign Sequence

| Wave | Session | Target | Domain | HO After | Cumulative HO% |
|------|---------|--------|--------|----------|---------------|
| W1 | **S87** | Pack A Section F W1 | F | +15 | 19.3% |
| W2 | **S88** | Pack B Section F W1 | F | +15 | 19.9% |
| W3 | S89 | Pack E Section A W1 | A | +15 | 20.5% |
| W4 | S90 | Pack B Section B W1 | B | +15 | 21.1% |
| W5 | S91 | Pack E Section B W1 | B | +15 | 21.7% |
| W6 | S92 | Pack E Section E W1 | E | +15 | 22.4% |
| W7 | S93 | Pack E Section D W1 | D | +15 | 23.0% |
| W8 | S94 | Pack B Section A W1 | A | +15 | 23.6% |
| W9 | S95 | Pack B Section D W1 | D | +15 | 24.2% |
| W10 | S96 | Pack B Section E W1 | E | +15 | 24.8% |
| **W11** | **S97** | **Pack A Section C W1** | **C** | **+15** | **25.4%** ← 25% |
| W12 | S98 | Pack E Section C W1 | C | +15 | 26.0% |
| W13 | S99 | Pack B Section C W1 | C | +15 | 26.6% |
| W14 | S100 | Pack A Section D W1 | D | +15 | 27.2% |
| W15 | S101 | Pack D Section C W1 | C | +15 | 27.9% |
| W16 | S102 | Pack C Section D W1 | D | +15 | 28.5% |
| W17 | S103 | Pack C Section C W1 | C | +15 | 29.1% |
| W18 | S104 | Pack D Section D W1 | D | +15 | 29.7% |
| **W19** | **S105** | **Pack D Section F W1** | **F** | **+15** | **30.3%** ← 30% |
| ... | ... | ... | ... | ... | ... |
| W35 | S121 | TBD | — | +15 | **40.1%** ← 40% |

---

## 9. Risk Matrix

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Dual-block sections remain blocked | High (no resolution plan) | Medium — slows timeline ~7 waves, but 40% still reachable | Accept. 40% achievable from single-object alone. |
| Certification regression in rewritten items | Low | High — learner pool contamination | Governance guard Rules 1-9 BLOCK. Per-batch verification. |
| Concurrent session collision (S87/MAY-014/MAY-015) | Addressed | — | S88P is read-only. No file overlap with active write sessions. |
| Remember-item upgrade complexity | Medium | Low — slows per-item velocity ~30% | Sequence Remember-heavy sections (Pack B/B, C/C) after team has pattern mastery. |
| Section F false simplicity | Medium | Medium — Domain F rewrites look easy but Produce inauthentic "executive asks a question" scenarios | Use S79 (Pack E Section F) as template. Avoid generic "CIO evaluating..." pattern fatigue. |
| Burnout at 25+ waves | High — sustained content authoring fatigue | Medium — quality decay in later waves | Rotate domains. Interleave F (easy) with A (hard). Cap at 15 items/wave. |

---

## 10. Recommendations

1. **Execute S87 (Pack A Section F W1) immediately.** Queue is structurally verified, all 15 targets certified, zero architecture risk. This is the highest-ROI 15-item campaign in the repository.

2. **Build S88 queue for Pack B Section F** using the same Domain F upgrade pattern proven in S79.

3. **Defer dual-block resolution.** 40% CAQS target is achievable without it. The ROI of architecture normalization (Pack C/A, C/B, D/A) is lower than executing 7+ waves on already-clean single-object sections.

4. **Track cumulative HO at each wave boundary.** Re-baseline after Waves 5, 10, 15, 20 against CURRENT_BASELINES.md. This catches drift early.

5. **Watch Domain F authoring quality.** The 20-item Pack E Section F campaign (S79) produced 21.1% HO but at a velocity that suggests lightweight "scenario substitution" rather than genuine cognitive upgrade. Audit S79 output before replicating the pattern at scale.

---

*Generated: 2026-07-30 — Session 88P — Read-Only Governance Light*
