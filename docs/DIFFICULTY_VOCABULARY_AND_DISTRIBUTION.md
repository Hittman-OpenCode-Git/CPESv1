# Difficulty Vocabulary and Distribution

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md, TAXONOMY_REGISTRY.md
**Generated:** 2026-07-24

---

## 1. Purpose

This document defines the canonical difficulty vocabulary for the CMA Part 1 Exam Simulator, maps existing labels to the canonical scale, and specifies target distributions. It codifies the Session 55 finding that current packs overuse "Moderate" and underuse other tiers.

---

## 2. Canonical Difficulty Bands

All content in the CMA Part 1 Exam Simulator must converge on the 5-tier difficulty scale defined in `knowledge/TAXONOMY_REGISTRY.md` §6:

| Label | Numeric Score | Description | Typical Candidate Profile |
|-------|--------------|-------------|---------------------------|
| **Easy** | 1 | Direct recall or single-step application. Tests knowledge of one concept in a familiar context. | Entry-level — foundational competency |
| **Moderate-Easy** | 2 | Two-step application with familiar context. Requires connecting two concepts or performing a simple multi-step calculation. | Early-preparation — building fluency |
| **Moderate** | 3 | Multi-step analysis with judgment required. Requires selecting the correct approach among plausible alternatives. | Mid-preparation — exam readiness |
| **Difficult** | 4 | Extended analysis across multiple concepts. Requires integrating multiple standards, formulas, or frameworks. | Late-preparation — mastery |
| **Very Difficult** | 5 | Integrated evaluation with novel context. Requires professional judgment under ambiguity, synthesizing multiple domains. | Capstone — distinguishing top performers |

### 2.1 Bloom's Taxonomy Correspondence

| Difficulty | Typical Cognitive Level |
|------------|------------------------|
| Easy | Remember, Understand |
| Moderate-Easy | Understand, Apply (simple) |
| Moderate | Apply, Analyze |
| Difficult | Analyze, Evaluate |
| Very Difficult | Evaluate (complex, multi-domain) |

---

## 3. Mapping from Existing Labels

### 3.1 Current State (Session 55 Audit)

Only 3 of 5 canonical labels are in use across all 5 packs:

| Label in Use | Packs Using It | Canonical Score |
|-------------|----------------|-----------------|
| `"Easy"` | All 5 | 1 |
| `"Moderate"` | All 5 | 3 |
| `"Difficult"` | All 5 | 4 |
| `"Moderate-Easy"` | **None** | 2 |
| `"Very Difficult"` | **None** | 5 |

### 3.2 Direct Mapping Table

| Legacy / Current Label | Canonical Label | Canonical Score | Action Required |
|------------------------|-----------------|-----------------|-----------------|
| `"Easy"` | `Easy` | 1 | None — already canonical |
| `"Moderate"` | `Moderate` | 3 | Rebalance: many should become Moderate-Easy (2) or Difficult (4) |
| `"Difficult"` | `Difficult` | 4 | Some may qualify for Very Difficult (5) |
| (none) | `Moderate-Easy` | 2 | Must be introduced during difficulty rebalancing |
| (none) | `Very Difficult` | 5 | Must be introduced for capstone items |

### 3.3 Case-Study Difficulty Equivalence

Case studies span multiple items at different cognitive levels. The case-level `Difficulty` and `DifficultyScore` reflect the composite demand:

- **Easy (1):** All items are recall/single-step. Minimal exhibit complexity.
- **Moderate-Easy (2):** Simple calculations, straightforward interpretation.
- **Moderate (3):** Multi-step calculations with 2–3 exhibits. Some analysis items.
- **Difficult (4):** Extended analysis across 3+ exhibits. Evaluate-level items.
- **Very Difficult (5):** Capstone. Multiple exhibits, cross-domain integration, professional judgment items.

The case-level `DifficultyScore` must be within ±1 of the mean of its item `DifficultyScore` values (per QUESTION_METADATA_STANDARD.md §5.2, CF4).

---

## 4. Target Distribution

### 4.1 Per-Pack MCQ Distribution

Per CAQS v1.0 §6.1:

| Difficulty | Score | Target % | Per 500-Item Pack |
|------------|-------|----------|-------------------|
| Easy | 1 | 15% | ~75 |
| Moderate-Easy | 2 | 20% | ~100 |
| Moderate | 3 | 30% | ~150 |
| Difficult | 4 | 25% | ~125 |
| Very Difficult | 5 | 10% | ~50 |

### 4.2 Bloom's Taxonomy Distribution (Cross-Cutting)

| Cognitive Level | Target % |
|----------------|----------|
| Remember | 5% |
| Understand | 15% |
| Apply | 40% |
| Analyze | 25% |
| Evaluate | 15% |

---

## 5. Current Gap Analysis

### 5.1 Session 55 Findings

The audit of all 2,500 MCQs revealed systematic overuse of "Moderate" and underuse of "Moderate-Easy" and "Very Difficult":

| Finding | Impact |
|---------|--------|
| Only 3 of 5 labels in use | Difficulty scale is compressed — candidates cannot distinguish Easy from Moderate-Easy or Difficult from Very Difficult |
| "Moderate" is the default | Most packs have 60–80% Moderate labeling, far exceeding the 30% target |
| "Very Difficult" absent entirely | No capstone-tier items exist — the exam simulator lacks challenge for top performers |
| "Moderate-Easy" absent entirely | No bridging items between Easy (score 1) and Moderate (score 3) — gap in learning progression |

### 5.2 Estimated Remediation Scale

To achieve target distribution, approximately 500–800 items across all packs need difficulty reclassification. This is a **TIER 2 priority** per Session 55 — deferred until TIER 0 (DL-008 learner-safety) and TIER 1 (question_state coverage) are complete.

---

## 6. Rebalancing Strategy

### 6.1 Phased Approach

| Phase | Scope | Action |
|-------|-------|--------|
| **Phase 1** | Certified items only | Reclassify certified items to 5-tier scale. No content changes — metadata only. |
| **Phase 2** | Section-at-a-time during certification | As sections enter certification, apply the 5-tier scale as part of the CAQS review. |
| **Phase 3** | Remaining uncertified | Bulk reclassification during final certification sweep. |

### 6.2 Decision Criteria for Reclassification

When determining whether a Moderate (3) item should be Moderate-Easy (2) or remain Moderate (3):

| Criterion | → Moderate-Easy (2) | → Leave as Moderate (3) |
|-----------|---------------------|------------------------|
| Calculation steps | 1–2 steps | 3+ steps |
| Concepts required | Single concept | 2+ concepts |
| Distractor plausibility | 2 of 3 are obvious | All 3 are plausible |
| Time to solve | < 90 seconds | 90–180 seconds |

### 6.3 Guardrails

- **Never reclassify difficulty without independent verification.** Difficulty is a psychometric property; it must be derived from the item's actual cognitive demand, not assumed.
- **Difficulty reclassification must not change content.** This is a metadata-only operation.
- **Each reclassification must be logged** with before/after values and rationale in REVISION_HISTORY.md.

---

## 7. Difficulty and the Delivery Pool

The delivery engine's `selectWithDifficultyDistribution` function uses `DifficultyScore` to balance question selection. Incorrectly calibrated difficulty labels distort session composition. Per CAQS v1.0 §1.7.1, only Certified items enter the learner pool — so difficulty calibration is most critical for Certified items.

---

## 8. References

- Taxonomy Registry: `knowledge/TAXONOMY_REGISTRY.md` §6
- CAQS Psychometric Standards: `knowledge/CAQS_v1.0.md` §6
- Session 55 Report: `reports/SESSION55_STANDARDIZATION_AND_DIFFICULTY_AUDIT.md`
