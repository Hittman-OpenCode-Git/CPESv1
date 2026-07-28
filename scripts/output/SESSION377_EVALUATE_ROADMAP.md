# S377 Evaluate Track Roadmap

**Session:** S377 — Evaluate Track Design Board  
**Date:** 2026-07-28  
**Mode:** READ ONLY (source audit) → PROPOSAL output  
**Authority:** AGENTS.md §2 (read-only default); write authorized for `scripts/output/` deliverables only

---

## 1. Current State

### 1.1 Pool-Wide Evaluate Inventory

| Pool | Total Items | Evaluate | % | Target (15%) | Gap |
|------|------------|----------|---|--------------|-----|
| MCQ (5 packs) | 2,540 | 84 | 3.3% | 381 | **297** |
| Case Studies (5 files) | 550 | 115 | 20.9% | 83 | +32 (surplus) |
| **Combined** | **3,090** | **199** | **6.4%** | **464** | **265** |

**Key finding:** Case studies already exceed the 15% Evaluate target at 20.9%. The entire Evaluate deficit is in MCQ, where only 3.3% of items test at Bloom's highest cognitive level.

### 1.2 MCQ Evaluate by Pack and Section

| Pack | Total | Evaluate | Eval% | Sections with Evaluate |
|------|-------|----------|-------|----------------------|
| Pack A | 500 | 11 | 2.2% | A:1, B:1, D:2, E:7 |
| Pack B | 500 | 5 | 1.0% | A:3, C:1, E:1 |
| Pack C | 500 | 29 | 5.8% | C:1, E:24, F:4 |
| Pack D | 500 | 37 | 7.4% | D:6, E:22, F:9 |
| Pack E | 540 | 2 | 0.4% | A:1, E:1 |

**Concentration risk:** 48 of 84 MCQ Evaluate items (57.1%) are clustered in Section E of Packs C+D. These are likely DL-012 template artifacts — same seed content with rotated answer letters and company-name substitutions. The true unique Evaluate item count may be as low as ~40.

### 1.3 Pool-Wide Bloom's Distribution

| Level | MCQ Count | MCQ % | CAQS Target | Case Count | Case % |
|-------|-----------|-------|-------------|------------|--------|
| Remember | 81 | 3.2% | 5% | 14 | 2.5% |
| Understand | 1,116 | 43.9% | 15% | 122 | 22.2% |
| Apply | 1,100 | 43.3% | 40% | 157 | 28.5% |
| Analyze | 159 | 6.3% | 25% | 142 | 25.8% |
| Evaluate | 84 | 3.3% | 15% | 115 | 20.9% |

**Structural imbalance:** Understand + Apply = 87.2% of MCQ. The pool is heavily skewed toward low-cognitive items. Case studies are better balanced because they were designed with cognitive progression (Apply → Analyze → Evaluate per CAQS §3.5).

### 1.4 Sampled Evaluate Item Analysis

**P1-DD-021** (Pack D, Section D, ABC cost driver selection):
- Stem: 652 characters — named company (Prescott Industries), specific scenario (ABC system design), competing proposals (3 cost driver options with data), asks for "recommendation"
- Difficulty: Difficult (4)
- Structure: Genuine Evaluate item — presents a professional judgment scenario with competing alternatives requiring analysis of correlation data

**P1-E-047** (Pack A, Section E, perpetual vs. periodic inventory control):
- Stem: Short — definition-level question
- Difficulty: Easy (1)
- CognitiveLevel: Evaluate
- **Problem:** Labeled "Evaluate" at "Easy" difficulty is contradictory. Easy items test Remember/Understand, not Evaluate. This item is likely mislabeled.

**P1-ED-049** (Pack D, Section E, code of conduct ethics):
- Stem: 189 characters — named company (Ambervale), but question is definitional
- Difficulty: Moderate (3)
- CognitiveLevel: Evaluate
- **Problem:** "What internal control component does this primarily support?" is an Apply-level question, not Evaluate. Uses definitional framing.

**Finding:** At least some of the 84 existing "Evaluate" items do not meet true Evaluate criteria. A Wave 0 audit is essential before counting them toward the target.

---

## 2. Gap Analysis

### 2.1 By Domain

| Domain | CAQS 15% Target | Current Evaluate | Gap | Clone Seeds Available |
|--------|----------------|-----------------|-----|----------------------|
| A — External Financial Reporting | 63 | 5 | **58** | 0 |
| B — Planning, Budgeting, Forecasting | 63 | 1 | **62** | 0 |
| C — Performance Management | 63 | 2 | **61** | 0 |
| D — Cost Management | 63 | 8 | **55** | 0 |
| E — Internal Controls | 63 | 55 | **8** | 28 clone seeds |
| F — Technology and Analytics | 63 | 13 | **50** | 0 |

### 2.2 The Real Gap

The nominal gap is 297 Evaluate items. But:

1. **Section E surplus:** 55 existing items, many are clones. After Wave 0 audit, true Section E Evaluate may be ~10-15 unique items, plus 28 clone seeds upgradeable. Section E needs ~20 fresh items.
2. **Wave 0 miscategorization:** Some of the 84 "Evaluate" items are mislabeled Apply/Analyze. Assume 20% mislabeled → ~17 items downgraded. Adjusted current: ~67.
3. **Adjusted gap:** 381 - 67 = **314** items.
4. **Clone contribution:** 28 seeds upgradeable → 314 - 28 = **286 fresh-authoring items**.

---

## 3. Clone Reuse Strategy

### 3.1 DL-012 Clone Inventory

- **28 clone groups** across Pack C/D Section E
- **140 total items** (28 groups × 5 variants with company-name substitution + answer rotation)
- **22 currently Archived** (6 in Pack C, 16 in Pack D)
- **Remaining clones** are in Unprocessed, Certified, or In Audit states

### 3.2 Upgrade Feasibility

Clone seeds currently test at Apply/Analyze level with template stems:
> "Which of the following correctly describes [COSO component X]?"

Upgrading to Evaluate requires transforming each seed:
1. **New scenario** — add named company, stakeholder, decision context
2. **Judgment prompt** — "Which recommendation should the controller present to the audit committee?"
3. **Upgraded distractors** — replace definition-mismatch distractors with plausible alternative professional judgments
4. **Multi-concept integration** — cross-reference at least 2 COSO components or domains
5. **Evaluate-aligned explanation** — trace full reasoning chain: analysis → interpretation → judgment → recommendation

**Effort estimate:** ~15-20 minutes per seed (vs. ~8-10 minutes for a fresh Evaluate item, since the topic and basic structure exist). Cost savings: ~30%.

### 3.3 Clone Contribution Limit

Clone reuse covers at most 28 items (9.4% of the 297 gap). The remaining 269 items must be fresh-authored. **Clone reuse is a tactical supplement, not a strategic solution.**

---

## 4. Dedicated Track Design

### 4.1 Cadence

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Items per wave | 25 | Balances quality gate overhead with throughput |
| Waves per week | 3 | Realistic given dual review (Accountant + Psychometrician) |
| Items per week | 75 | Sustainable velocity for dedicated track |
| Wave structure | M-W-F authoring; Tu-Th review; Sa audit |
| Items per batch | ≤30 | Governance guard Rule 5 compliance |

### 4.2 Evaluate-Specific Quality Gates

In addition to standard CAQS gates (G1–G7):

**G8 — Scenario Authenticity**
- Named company and stakeholder present
- Decision trigger in stem (not "which is correct")
- Prompt asks for judgment/recommendation
- Business language per CAQS §3.8 Anti-AI standards
- 2+ distinct concepts integrated

**G9 — Distractor Sophistication**
- Every distractor is a plausible alternative recommendation
- No definition-mismatch throwaways
- Distractors discriminate between levels of professional understanding
- Each targets a specific judgment error

**G10 — Explanation Depth**
- Full reasoning chain: analysis → interpretation → judgment → recommendation
- Minimum 500 characters for ExplanationCorrect (vs. standard 50)
- Business interpretation contextualizing the recommendation
- Cross-references related concepts (CAQS §11.3 interleaving)

### 4.3 Pipeline (6 Phases)

```
Phase 1: Scenario Design
  → Author business scenario (company, stakeholder, trigger)
  → Integrate 2+ concepts from domain

Phase 2: Judgment Prompt
  → Draft question asking for professional recommendation
  → Avoid "which is correct" framing

Phase 3: Distractor Engineering
  → 3 plausible alternative professional judgments
  → Each represents a genuine disagreement among competent professionals

Phase 4: Explanation Authoring
  → Full reasoning chain: analysis → interpretation → judgment → recommendation
  → Each distractor explains why alternative is suboptimal

Phase 5: Metadata Assignment
  → CognitiveLevel: Evaluate, Difficulty: Difficult/Very Difficult
  → PrimaryCompetency: Judgment

Phase 6: Dual Review
  → Accountant: accounting correctness, judgment validity
  → Psychometrician: scenario authenticity, distractor sophistication, explanation depth
```

### 4.4 Review Requirements

| Reviewer | Scope | Minimum Confidence |
|----------|-------|-------------------|
| Accountant | Accounting correctness, judgment validity, standard references | 90 |
| Psychometrician | Scenario authenticity, distractor sophistication, difficulty calibration, explanation depth | 90 |
| Editor (optional) | Business language authenticity, Anti-AI compliance | — |

### 4.5 Governance Guard Integration

**Existing rules applicable:** Rule 2 (DL-008 BLOCK), Rule 6 (DL-026 BLOCK), Rule 9 (DL-037 BLOCK)

**Recommended new rule: Rule 10 — Evaluate Scenario Sufficiency BLOCK**
- BLOCK certification of any Evaluate item that:
  1. Lacks a named company/stakeholder
  2. Uses "which of the following is correct" framing
  3. Tests only a single concept (no multi-concept integration)

### 4.6 Tracking

Separate tracking artifact: `scripts/output/EVALUATE_TRACK_PROGRESS.json`

Key metrics:
- Items authored (cumulative, by domain)
- Items through G8-G10 gates
- Items Certified
- Average authoring time per item
- Dual-review first-pass acceptance rate

Milestones:
- **M1 (50 items):** Week 1 — cadence validation
- **M2 (150 items):** Week 3 — Domain A+B coverage  
- **M3 (250 items):** Week 5 — cross-domain balance check
- **M4 (297 items):** Week 6-7 — gap closed, CAQS §6.2 met

---

## 5. Timeline Estimate

### 5.1 Dedicated Track

| Scenario | Velocity | Weeks to 297 Gap | End Date |
|----------|----------|-----------------|----------|
| Dedicated track | 75/week | 4.0 | 2026-08-25 |
| Dedicated + 381 full | 75/week | 5.1 | 2026-09-01 |

### 5.2 Mixed Velocity (sharing bandwidth)

| Scenario | Velocity | Weeks to 297 Gap | End Date |
|----------|----------|-----------------|----------|
| Mixed (30/week) | 30/week | 10 | 2026-10-05 |
| Mixed (40/week) | 40/week | 7.4 | 2026-09-18 |

### 5.3 Without Dedicated Track

At current general certification velocity (~10 Evaluate items incidentally per week mixed into certification waves), full Evaluate coverage extends to **December 2026-January 2027**.

### 5.4 Critical Path

1. **Domain B (62 gap, 1 current):** Largest deficit. Zero clone seeds. All fresh authoring. Blocks Evaluate coverage for the entire Planning/Budgeting/Forecasting domain.
2. **Domain C (61 gap, 2 current):** Second-largest deficit. Variance analysis and performance evaluation require judgment-scenario design.
3. **Psychometrician bandwidth:** Dual review doubles reviewer load. If reviewer is bottleneck, cadence drops to 15-20/week.
4. **Scenario authenticity at scale:** Authoring 286 distinct, realistic business scenarios is a creative constraint that risks template reversion.

---

## 6. Risks

| ID | Risk | Severity | Mitigation |
|----|------|----------|------------|
| R1 | Template regression — Evaluate items revert to Apply patterns under pressure | HIGH | G8-G10 gates; sampling audit every 50 items |
| R2 | Reviewer bottleneck — dual review stalls pipeline | MEDIUM | Pre-review guidelines; batch reviews |
| R3 | Difficulty drift — items labeled Evaluate but scored Moderate | MEDIUM | G2 enforces difficulty-label alignment |
| R4 | Domain imbalance — Section E dominates Evaluate pool | HIGH | Explicit per-domain allocation; B/C first |
| R5 | Existing Evaluate quality — 84 items may include mislabeled Apply/Analyze | MEDIUM | Wave 0 audit before new authoring |
| R6 | Clone reuse over-reliance — treating 28 seeds as major contribution when they're 9.4% | LOW | Documented limit; fresh authoring is primary strategy |

---

## 7. Recommendations

### 7.1 Immediate (Before Wave 1)

1. **Wave 0 audit:** Audit all 84 existing "Evaluate" items for miscategorization. Verify CognitiveLevel alignment with stem, prompt type, and distractor complexity. Re-classify mislabeled items.
2. **Deploy G8-G10 gates:** Integrate Evaluate-specific quality gates into certification pipeline.
3. **Deploy Rule 10:** Add Evaluate Scenario Sufficiency rule to governance guard.
4. **Per-domain allocation:** Author an explicit allocation plan: Domain B (62 items, Waves 1-3), Domain C (61 items, Waves 4-6), Domain A (58 items, Waves 7-9), etc.

### 7.2 Execution

5. **Dedicated track:** Authorize dedicated Evaluate track with 75 items/week cadence.
6. **Domain B + C first:** Prioritize the two domains with the largest gaps and zero clone reuse potential.
7. **Clone seeds in parallel:** Run clone seed upgrades as a parallel sub-track (28 items, ~1 wave), not as a substitute for fresh authoring.
8. **Weekly sampling audit:** Every 50 items, sample 5 for G8-G10 compliance to catch template regression early.

### 7.3 Timeline

9. **Dedicated track:** 6 weeks to 381 full target (end date: ~2026-09-01).
10. **Mixed velocity fallback:** If dedicated track not authorized, 12-15 weeks (end date: 2026-10-15 to 2026-11-01).

---

## 8. Viability Assessment

**Verdict: VIABLE with governance conditions.**

The dedicated Evaluate track is feasible at 75 items/week with 3 waves of 25 items each. The 6-week timeline (Wave 0 audit + 5 weeks of authoring + 1 week final review) is aggressive but achievable if:

1. G8-G10 gates are deployed before Wave 1
2. Psychometrician review bandwidth is committed (dual review doubles reviewer load)
3. Domain B and C are prioritized first (largest gaps, no clone reuse)
4. Wave 0 audit of existing "Evaluate" items is completed (miscategorization risk)
5. Clone reuse is treated as a tactical supplement (9.4%), not a strategic solution
6. Weekly sampling audits prevent template regression

**Do not proceed without:**
- Wave 0 audit of existing Evaluate items
- Psychometrician availability for dual-review pipeline
- G8-G10 gate deployment in governance infrastructure
- Per-domain authoring allocation plan

---

*Generated by S377 Evaluate Track Design Board — READ ONLY audit of 5 pack files + governance documents. Write authorized for scripts/output/ deliverables only.*
