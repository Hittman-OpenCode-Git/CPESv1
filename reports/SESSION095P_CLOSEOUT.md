# Session 95P — Closeout

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Status:** COMPLETE

---

## 1. Session Summary

Session 95P created a formal Higher-Order Certification Framework based on the findings from Sessions 92P and 93P. The framework provides explicit acceptance criteria, automatic failure conditions, misclassification patterns, a review workflow, and a QA checklist for certifying items at the Analyze or Evaluate cognitive level.

**0 repository modifications.** 0 pack file writes. 0 certification changes. 0 baseline updates.

## 2. Deliverables

| # | Document | Status | Lines |
|---|----------|--------|-------|
| 1 | `SESSION095P_HO_CERTIFICATION_PLAN.md` | COMPLETE | ~220 |
| 2 | `SESSION095P_EVALUATE_RUBRIC.md` | COMPLETE | ~280 |
| 3 | `SESSION095P_ANALYZE_RUBRIC.md` | COMPLETE | ~260 |
| 4 | `SESSION095P_HO_REVIEW_CHECKLIST.md` | COMPLETE | ~190 |
| 5 | `SESSION095P_REVIEW_WORKFLOW.md` | COMPLETE | ~310 |
| 6 | `SESSION095P_MISCLASSIFICATION_EXAMPLES.md` | COMPLETE | ~310 |
| 7 | `SESSION095P_CLOSEOUT.md` | COMPLETE | — |

## 3. Key Framework Components

### 3.1 True Cognitive Level Definitions (from PLAN.md §4)

| Level | Definition | Minimum Gate | Auto-Fail Conditions |
|-------|-----------|-------------|---------------------|
| Remember | Retrieve knowledge from memory | Stem→Answer lexical overlap pattern | Overlap >40% → Remember, cannot be higher |
| Understand | Construct meaning | Explain, interpret, classify, or compare | Definition-match → Remember |
| Apply | Execute procedure | Known formula, standard, or framework applied | Cannot be Analyze or Evaluate |
| Analyze | Decompose and relate parts | ≥2 of: Decomposition, Cause-Effect, Pattern, Comparison | AF-A1 through AF-A6 |
| Evaluate | Make judgments against criteria | ALL 3: Decision Maker, Competing Alternatives, Selection Rationale + ≥1: Trade-Offs, Judgment, Criteria Application | AF-E1 through AF-E6 |

### 3.2 Evaluate Rubric Gate

- **E1:** Decision maker (named stakeholder making a judgment call)
- **E2:** Competing alternatives (at least one defensible distractor)
- **E3:** Selection rationale (weighing factors, not just rule compliance)
- **E4/E5/E6:** At least one of trade-off analysis, professional judgment, or criteria application
- **6 Automatic Failure conditions** block Evaluate labeling

### 3.3 Analyze Rubric Gate

- **A1/A2/A3/A4:** At least two of decomposition, cause-effect reasoning, pattern recognition, or comparative analysis
- **6 Automatic Failure conditions** block Analyze labeling

### 3.4 Misclassification Patterns (6 documented)

1. ASC Application as Evaluate (Pattern EV-1)
2. Formula Substitution as Evaluate/Analyze (Pattern EV-2, AN-1, AN-2)
3. Definition-Matching as Evaluate/Analyze (Pattern EV-3, AN-3, AN-4)
4. Control/Taxonomy Classification as Evaluate/Analyze (Pattern EV-4, AN-5)
5. Concept Comprehension as Evaluate (Pattern EV-5)
6. Procedure Execution as Analyze (Pattern AN-3 extension)

### 3.5 Genuine Exemplars Catalogued

- **Evaluate:** P1-B-085 (sourcing strategy), P1-B-030 (supplier selection), P1-F-069 (technology investment), P1-BD-005 (variance investigation policy)
- **Analyze:** P1-B-022 (learning curve deviation), P1-D-015 (COQ analysis), P1-ED-013 (IT control decomposition), P1B-F-108 (SOC 2 findings classification)

## 4. Strategic Value

### 4.1 The Problem This Framework Solves

Sessions 92P and 93P found that **58.7% of items labeled Analyze or Evaluate are misclassified.** The 528 items currently labeled as higher-order represent only ~219 genuine items (8.6% of 2,545). Without a certification framework, the same misclassification patterns will reproduce as modernization continues toward the CAQS 40% higher-order target.

### 4.2 How This Framework Prevents Recurrence

1. **Explicit acceptance criteria** replaces "it feels like Evaluate" with measurable conditions
2. **Automatic failure conditions** block the most common misclassification patterns at the gate
3. **Evidence collection** creates a durable audit trail for every certification decision
4. **QA checklist** gives human reviewers a standardized tool
5. **Misclassification examples** serve as training data for future reviewers

### 4.3 Where to Apply First

Based on S93P findings, the highest-impact application order:

1. **Pack C Section EC** (0% Evaluate accuracy) — COSO definitions → reclassify 8+ items from Evaluate to Remember/Apply
2. **Pack D Sections CD/DD** (0% Analyze accuracy) — Cost management definitions → reclassify from Analyze to Remember/Apply
3. **Pack A Section A** (25% Evaluate, 0% Analyze accuracy) — ASC rules → reclassify from Analyze/Evaluate to Apply
4. All remaining Evaluate-labeled items — extend S93P's 75-item sample to full 246-item pool using this framework
5. All remaining Analyze-labeled items — extend S93P's 75-item sample to full 282-item pool

## 5. Verification

### 5.1 Lane Compliance

| Check | Status |
|-------|--------|
| Governance Light Lane | CONFIRMED — analysis only, no content changes |
| No pack file modifications | CONFIRMED — 0 edits to pack_*_corrected.js |
| No case file modifications | CONFIRMED — 0 edits to scored_cases*.js or case_pack_*_corrected.js |
| No app.js modifications | CONFIRMED |
| No May modifications | CONFIRMED |
| No certification state changes | CONFIRMED |
| No baseline updates | CONFIRMED |
| No CURRENT_BASELINES.md edits | CONFIRMED |

### 5.2 Parallel Lane Safety

| Active Lane | Conflict? | Reason |
|-------------|-----------|--------|
| Session 92 | NONE | S92 edits Pack B Section B (content). S95P is read-only analysis (no overlap in files or operations). |
| MAY-021 | NONE | MAY-021 is operations/monitoring simulation (UI). S95P is certification framework (governance). |
| Session 94P | NONE | S94P is HO quality recovery planning (analysis). S95P is framework creation (same domain, different output). Both are read-only. |

### 5.3 Deliverable Integrity

| Check | Status |
|-------|--------|
| All 7 deliverables created | CONFIRMED |
| All files written to `reports/` directory | CONFIRMED |
| No root-level files created | CONFIRMED |
| No scripts created | CONFIRMED |
| No knowledge/ files modified | CONFIRMED |

## 6. Cross-References

| Document | Relationship |
|----------|-------------|
| `SESSION092P_COGNITIVE_DRIFT_ANALYSIS.md` | Source data — drift patterns and quality dimensions |
| `SESSION093P_EVALUATE_AUDIT.md` | Source data — 75-item Evaluate classification audit |
| `SESSION093P_ANALYZE_AUDIT.md` | Source data — 75-item Analyze classification audit |
| `SESSION093P_MISCLASSIFICATION_REPORT.md` | Source data — population projections and root cause analysis |
| `CAQS_v1.0.md` | Governing quality standard — §6.2 target distribution |
| `DEFECT_LIBRARY.md` | Related defects: DL-031 (difficulty inflation), DL-032 (case uniform difficulty) |
| `QUESTION_METADATA_STANDARD.md` | Defines CognitiveLevel field values |

## 7. Next Steps (Delegated to Future Sessions)

This session is complete. The following are NOT executed — they are recommendations for future implementation sessions:

1. **Session 96P (recommended):** Execute full-pool Evaluate reclassification using this framework. Apply the rubric to all 246 Evaluate-labeled items. Downgrade misclassified items.
2. **Session 97P (recommended):** Execute full-pool Analyze reclassification using this framework. Apply the rubric to all 282 Analyze-labeled items.
3. **Future modernization campaign:** Require pre-certification cognitive audit using this framework's 4-stage workflow before certifying any newly authored Analyze/Evaluate item.
4. **Governance guard enhancement (optional):** Encode AF-1 (definition-match) and AF-5 (difficulty mismatch) as automated guard rules.

---

*Generated: 2026-07-31 | Session 95P Verifier Phase — Closeout*
