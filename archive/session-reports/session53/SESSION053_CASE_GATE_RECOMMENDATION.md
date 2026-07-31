# Session 53 — Case Certification Gate Recommendation

**Date:** 2026-07-28
**Decision:** OPTION C — Hybrid Approach

---

## The Three Options

| Option | Description |
|--------|-------------|
| **OPTION A** | Adopt Session 52 certification framework as mandatory production gate |
| **OPTION B** | Treat Session 52 as improvement framework; retain existing certification |
| **OPTION C** | **Hybrid: CERTIFICATION_RUBRICS.md as gate; Session 52 as quality guidance** |

---

## Recommendation: OPTION C — Hybrid

### Primary Gate: CERTIFICATION_RUBRICS.md §2 (Case-Study Rubric)

**Why this, not Session 52:**

1. **It already exists.** The rubric was designed in Session 64 (2026-07-24) specifically for this purpose. It is the same authority as the MCQ rubric that governs all 2,317 Certified MCQs. Adopting Session 52's scorecard would create a third standard where two already exist.

2. **It gates on substantively meaningful dimensions.** D1 (correctness): a single wrong answer rejects the case. D5 (explanation quality): empty explanations reject the case. D2 (scenario quality): missing company/stakeholder blocks certification. These are learner-impact dimensions.

3. **It does NOT gate on dimensions that don't affect learners.** Difficulty distribution, exhibit count, metadata completeness beyond required fields — the rubric appropriately treats these as quality targets, not certification gates.

4. **It is calibrated.** D5 minimum = 4 for cases (vs. 5 for MCQs) — reflecting the structural difference between a single Explanation field and four-field per-item MCQ system. This is a deliberate design choice documented in the rubric.

5. **It is practical.** Per-case dimension scoring takes minutes, not hours. The Session 52 6-dimension 85/100 scoring required subjective calibration across dimensions the rubric doesn't even gate.

### Quality Framework: Session 52 6-Dimension Scorecard

**Why keep it:**

1. **It identifies real quality gaps.** 53.5% of items labeled "Difficult" IS meaningfully wrong — it's just not certification-blocking. The scorecard surfaces these patterns for improvement sweeps.

2. **It provides a roadmap.** The scorecard's dimension breakdown tells content authors WHERE to focus. Difficulty calibration (DC: 62/100) and Analyze/Evaluate validity (AV: 61/100) are genuine weak spots — they just shouldn't block learner access to otherwise correct content.

3. **It aligns with CAQS §6.1-6.2 target distributions.** These are quality targets, not gates. The scorecard operationalizes them.

---

## Reconciled Certification Decision Matrix

| Dimension | Rubric Gate | Session 52 Equivalent | Rubric Cert Minimum | Rubric Reject Threshold |
|-----------|------------|----------------------|---------------------|------------------------|
| Correctness | D1 | Data Accuracy (DA) | D1 ≥ 5 (all verified) | D1 = 1 (wrong answer) |
| Scenario Quality | D2 | Quality & Realism (QR) + Blueprint (BP) | D2 ≥ 4 (named company + stakeholder) | D2 = 2 (no company) |
| Rubric Clarity | D3 | — | D3 ≥ 4 (clear scoring) | D3 = 1 (unscorable) |
| Metadata + Difficulty | D4 | Difficulty Calibration (DC) + metadata | D4 ≥ 4 (critical fields present) | D4 = 2 (missing DifficultyScore) |
| Explanation Quality | D5 | Analyze/Evaluate Validity (AV) + QR | D5 ≥ 4 (substantive explanations) | D5 = 1 (empty explanations) |
| Integration Readiness | D6 | Section Applicability (SA) + AV | D6 ≥ 4 (progression + pipeline) | D6 = 2 (unsupported types) |

---

## What Actually Blocks Under OPTION C

Reclassifying all 75 cases under the rubric (estimate — requires per-case scoring to confirm):

| Blocker | Cases Blocked | Rubric Dimension | Fix Complexity |
|---------|--------------|:---:|----------------|
| Cognitive progression violations | ~48 | D6 | LOW — re-order items in array |
| Generic "Management" stakeholders | ~21 | D2 | TRIVIAL — rename to named role |
| Thin explanations (<100 chars) | ~subset | D5 | MEDIUM — expand explanations |

**Overlap estimate:** Many cases have multiple blockers. ~25-35 cases likely CERTIFY under rubric (the 31 Production cases mostly pass). ~40-50 need revision on 1-2 dimensions. **Zero cases need to be rejected/archived.**

---

## What Does NOT Block Under OPTION C

| Session 52 Failure | Rubric Impact | Why |
|-------------------|---------------|-----|
| Uniform difficulty (DL-032, 17 cases) | None | No rubric dimension cap |
| ExhibitCount < 2 (34 cases) | None | No rubric dimension cap |
| Missing CompanyName metadata (4 cases) | None | Optional field; scaffold in ScenarioText |
| Draft ProductionStatus (44 cases) | None | Conservative direction; learner gate is question_state |
| Difficulty distribution (53.5% Difficult) | None | CAQS §6.1 target, not rubric gate |
| Legacy scored_cases in root (5 files) | None | File hygiene, not content quality |

---

## Implementation Sequence

1. **Adopt CERTIFICATION_RUBRICS.md §2 as the authoritative case-study certification gate**
2. **Score all 75 cases under the rubric** — produce per-case D1-D6 scores with certification decisions
3. **Remediate rubric-blocking defects first:**
   - Re-order items for cognitive progression (48 cases — template artifact, low effort)
   - Name specific stakeholders (21 cases — one-field edit per case)
   - Expand thin explanations (subset of 27 items — editorial work)
4. **Treat Session 52 findings as quality improvement queue:**
   - Difficulty recalibration (DL-032) → Phase 2 quality sweep
   - Exhibit additions → Phase 3 editorial enhancement
   - Metadata population → Phase 4 governance cleanup
5. **Remove 5 legacy scored_cases*.js from root** → Constitution §11.4 compliance

---

## What This Means for Production

- **Today:** All 75 cases remain in the learner pool (400/400 items Certified). Zero learner harm.
- **Post-rubric scoring:** Some cases may be flagged for revision if they fail D6/D2/D5 rubric gates. But those gates are fixable — re-ordering items, naming stakeholders, expanding explanations.
- **Post-remediation:** Target 75/75 Certified under the rubric. The gap is ~3 blocking findings × ~48 cases — fixable in 2-3 sessions.
- **The Session 52 quality targets (difficulty distribution, exhibit count, metadata enrichment) remain improvement goals, not blockers.**

---

*Recommendation submitted 2026-07-28. Read-only — no modifications made.*
