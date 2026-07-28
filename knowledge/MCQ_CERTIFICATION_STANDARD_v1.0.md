# CMA Part 1 — MCQ Certification Standard v1.0

**Spec — Operational Standard for 800-Series Certification**
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md, CAQS v1.0, CERTIFICATION_READINESS_STANDARD.md
**Version:** 1.0
**Generated:** Session 800 (2026-07-26)
**Dependencies:** CAQS_v1.0.md, CERTIFICATION_READINESS_STANDARD.md, QUESTION_METADATA_STANDARD.md, TAXONOMY_REGISTRY.md, DEFECT_LIBRARY.md, BUILD_TIME_VERIFICATION_STANDARD.md

---

## 1. Purpose & Scope

### 1.1 Purpose

This document is the **operational certification standard** for every standalone multiple-choice question (MCQ) in the CMA Part 1 Exam Simulator. It defines measurable thresholds, a weighted scoring model, certification gates, and governance compliance requirements. The 800-series certification agents execute against this standard — it translates the high-level quality framework of CAQS v1.0 and the readiness assessment model of CERTIFICATION_READINESS_STANDARD.md into actionable, repeatable per-item evaluation criteria.

### 1.2 Scope

Applies to:
- All 2,500 MCQ items across `pack_a_corrected.js` through `pack_e_corrected.js`
- Items at any `question_state`: Unprocessed, In Audit, Editorial Queue, Certified, or Archived
- Items in all 6 blueprint sections (A–F)
- Items of all types: select, numeric, multi, fill, and match

This standard does **not** apply to case study items in `scored_cases*.js` files.

### 1.3 Relationship to Existing Standards

| Standard | Relationship |
|----------|-------------|
| **CAQS v1.0** | Parent quality standard — operationalizes CAQS §1.6 six-dimension verification, §2 rubric, §4 explanation rules, §6 psychometric targets, §11 learning science requirements, and §14 Gold Standard Checklist |
| **CERTIFICATION_READINESS_STANDARD.md (S301)** | Pre-condition framework — an item must score ≥ 70 on the readiness tier before entering the 800-series certification pipeline |
| **QUESTION_METADATA_STANDARD.md §9** | Governs `question_state` lifecycle and transition rules |
| **TAXONOMY_REGISTRY.md** | Single source of truth for all permitted enumeration values |
| **DEFECT_LIBRARY.md** | All DL-xxx defect classes referenced by this standard are defined there |

---

## 2. Certification Scoring Model

### 2.1 Nine-Dimension Weighted Scoring

Every MCQ receives a score from 0–100 based on 9 dimensions. Dimension 1 (Answer Accuracy) is an auto-fail dimension.

| # | Dimension | Weight | Max Points | Type |
|---|-----------|--------|------------|------|
| 1 | Answer Accuracy | **Critical** | Auto-fail if violated | Binary gate |
| 2 | Explanation Quality | 20% | 20 | Scored 0–10 × 2 |
| 3 | Distractor Quality | 15% | 15 | Scored 0–10 × 1.5 |
| 4 | Metadata Completeness | 10% | 10 | Scored 0–10 × 1 |
| 5 | Blueprint Alignment | 20% | 20 | Scored 0–10 × 2 |
| 6 | Difficulty Validity | 10% | 10 | Scored 0–10 × 1 |
| 7 | CognitiveLevel Validity | 10% | 10 | Scored 0–10 × 1 |
| 8 | Learning Value | 10% | 10 | Scored 0–10 × 1 |
| 9 | Exam Realism | 5% | 5 | Scored 0–10 × 0.5 |

**Total:** 100 points

### 2.2 Certification Gates

| Gate | Condition | Result |
|------|-----------|--------|
| **G1 — Answer Accuracy** | Dimension 1 PASS (no DL-030, no accounting error) | Required for any certification |
| **G2 — Minimum Overall Score** | Overall score ≥ 80 | Required for Certified |
| **G3 — No Critical Defects** | Zero DL-001, DL-030 defects | Required for Certified |
| **G4 — DL-008 Clear** | ExplanationWrong[CorrectChoice] is empty | Required for Certified |
| **G5 — Gold Standard** | Overall score ≥ 95 AND all dimensions ≥ minimum AND G1-G4 passed | Gold Standard designation |

### 2.3 Certification Tiers

| Tier | Score Range | `question_state` | Learner Pool |
|------|------------|-----------------|--------------|
| 1 | 95–100 | `"Certified"` (Gold Standard) | Eligible |
| 2 | 80–94 | `"Certified"` | Eligible |
| 3 | 60–79 | `"Editorial Queue"` | Excluded |
| 4 | 0–59 | `"Unprocessed"` or `"In Audit"` | Excluded |
| Auto-fail | 0 | `"Unprocessed"` | Excluded |

---

## 3. Dimension 1 — Answer Accuracy (Critical — Auto-Fail)

### 3.1 Requirement

The stored `CorrectChoice` must match the independently derived correct answer under U.S. GAAP (FASB ASC), COSO, and current IMA CMA Part 1 CSO.

### 3.2 Auto-Fail Conditions (Score = 0)

- **DL-030:** Stored CorrectChoice disagrees with independently derived correct answer
- **DL-001:** Accounting error in the stored answer or explanation
- **Numerical error:** Stored answer does not match correct calculation under CAQS §5 tolerance
- **Part 2 scope creep:** Item tests material exclusive to CMA Part 2

---

## 4. Dimension 2 — Explanation Quality (Weight: 20%)

### 4.1 ExplanationCorrect — Required Elements

| Element | Calculation Items | Conceptual Items |
|---------|------------------|-----------------|
| Accounting principle by name (EV3) | Required | Required |
| Formula with substituted values | Required | N/A |
| Reasoning chain | N/A | Required |
| Business interpretation | Required | Required |
| Common exam trap | Recommended | Recommended |
| **Minimum length** | **200 characters** | **150 characters** |

### 4.2 ExplanationWrong — Per-Slot Requirements

- Why this choice is wrong: Required
- Specific misconception identified: Required
- Contrast with correct approach: Required
- **Minimum length per slot: 50 characters (EV1)**
- ExplanationWrong[CorrectChoice] must be empty `""` (EV8 / DL-008)

### 4.3 Scoring

| Score | Criteria |
|-------|----------|
| 10 | Full mini-lesson: concept + formula + interpretation + distractor analysis + exam trap. All EV rules satisfied. |
| 8 | Principle + solution + business interpretation + distractor explanations. All EV rules satisfied. |
| 6 | Principle named + solution shown + business context. Distractor explanations are choice-specific. |
| 4 | Correct answer explained but missing business interpretation or distractor analysis. |
| 2 | Only states correct answer. Missing principle reference. Below length threshold. |
| 0 | Missing, generic, or factually wrong. Contains placeholder text. |

---

## 5. Dimension 3 — Distractor Quality (Weight: 15%)

### 5.1 Scoring

| Score | Criteria |
|-------|----------|
| 10 | All 3 non-CC distractors target distinct, documented misconceptions. Each plausible. No cueing. |
| 8 | All distractors plausible and distinct. Minor weakness in one. |
| 6 | Distractors generally plausible but 1 is markedly weaker. |
| 4 | Two distractors distinctly weaker. Moderate overlap between misconceptions. |
| 2 | One distractor obviously wrong. Multiple test same misconception. |
| 0 | Two+ distractors obviously wrong. Factual errors in distractors. |

### 5.2 Requirements

- Every distractor plausible to a candidate reasoning incorrectly
- No duplicate distractors (DL-005)
- Answer position distribution: A/B/C/D within 22-28% per section
- No absolute-language cueing without accounting justification

---

## 6. Dimension 4 — Metadata Completeness (Weight: 10%)

### 6.1 Required Fields

`QuestionID`, `Section`, `Topic`, `Difficulty`, `DifficultyScore`, `CognitiveLevel`, `question_state`, `CorrectChoice`, `ExplanationCorrect`, `ExplanationWrongA-D` (all 4), `LOSTag`, `Stem`, `Choices` (keys A-D).

### 6.2 Scoring

| Score | Criteria |
|-------|----------|
| 10 | All required fields present, correct types, correct enumeration values. |
| 8 | All required fields present. One or two optional fields missing. |
| 6 | All core fields present. One required field missing. |
| 4 | Multiple required fields missing but core functionality preserved. |
| 2 | Critical fields missing — item cannot be delivered. |
| 0 | No metadata beyond QuestionID and Stem. |

---

## 7. Dimension 5 — Blueprint Alignment (Weight: 20%)

### 7.1 Scoring

| Score | Criteria |
|-------|----------|
| 10 | Specific CSO LOS identified (LOSTag present). Topic maps to controlled vocabulary. No scope creep. |
| 8 | Specific CSO LOS identified. Topic close match. |
| 6 | General topic match. LOSTag present but imprecise. |
| 4 | Topic broadly within correct domain. LOSTag missing or vague. |
| 2 | Section letter assigned but topic doesn't clearly map to CSO. |
| 0 | No blueprint reference. Wrong domain entirely. Tests Part 2 material. |

---

## 8. Dimension 6 — Difficulty Validity (Weight: 10%)

### 8.1 Scoring

| Score | Criteria |
|-------|----------|
| 10 | DifficultyScore and label match actual cognitive demand. No inflation. |
| 8 | Difficulty slightly overstated/understated by ±1 tier. |
| 6 | Difficulty overstated by 2 tiers (DL-031 definition-match inflation). |
| 4 | Difficulty largely disconnected from actual demand. Template-assigned. |
| 2 | Difficulty label contradicts cognitive demand. |
| 0 | No difficulty label assigned, or label demonstrably wrong by ≥ 3 tiers. |

### 8.2 DifficultyScore ↔ Difficulty Label

| DifficultyScore | Difficulty Label |
|----------------|-----------------|
| 1 | Easy |
| 2 | Moderate-Easy |
| 3 | Moderate |
| 4 | Difficult |
| 5 | Very Difficult |

---

## 9. Dimension 7 — CognitiveLevel Validity (Weight: 10%)

### 9.1 Scoring

| Score | Criteria |
|-------|----------|
| 10 | CognitiveLevel precisely matches Bloom's level demanded. Item type aligned. |
| 8 | CognitiveLevel correct but item slightly under-/over-reaches. |
| 6 | CognitiveLevel directionally correct. Within adjacent Bloom's tier. |
| 4 | CognitiveLevel mismatch: ≥ 2 tiers off. |
| 2 | CognitiveLevel missing or unassigned. |
| 0 | CognitiveLevel contradicts item's actual demand. |

### 9.2 Rule: Numeric items → Apply or higher. Never Remember or Understand for calculation items.

---

## 10. Dimension 8 — Learning Value (Weight: 10%)

### 10.1 Scoring

| Score | Criteria |
|-------|----------|
| 10 | Complete mini-lesson. All LS1-LS4 satisfied. Candidate learns even if correct. |
| 8 | Strong educational content. One learning science principle missing. |
| 6 | Explanation teaches concept. Generic in parts. |
| 4 | Explains answer but doesn't teach concept. Generic feedback pattern. |
| 2 | Minimal educational value. Only states which answer is correct. |
| 0 | No explanation, or explanation is misleading. |

### 10.2 Learning Science Requirements (CAQS §11)

| Rule | Requirement |
|------|-------------|
| LS1 | Explanation identifies governing concept by name |
| LS2 | Distractor explanations identify specific misconception |
| LS3 | Calculation explanations show intermediate steps |
| LS4 | Explanation includes business interpretation |

---

## 11. Dimension 9 — Exam Realism (Weight: 5%)

### 11.1 Scoring

| Score | Criteria |
|-------|----------|
| 10 | Named company and stakeholder with realistic business context. Authentic CMA language. |
| 8 | Good business realism. Named company or specific context. Professional language. |
| 6 | Adequate business framing. Generic but not textbook. |
| 4 | Textbook-style question. No business context. Generic phrasing. |
| 2 | Obviously AI-generated or template-written. Anti-patterns present. |
| 0 | Unusable for exam. Wrong register. |

---

## 12. Defect-to-Dimension Mapping

| Defect ID | Primary Dimension | Severity | Score Impact |
|-----------|------------------|----------|-------------|
| DL-001 | D1 | Critical | Auto-fail |
| DL-030 | D1 | Critical | Auto-fail |
| DL-008 | D2 | High | Auto-fail — blocks certification |
| DL-010 | D2 | High | −5 per misassigned slot |
| DL-013 | D2/D8 | High | −3 to −6 per boilerplate slot |
| DL-026 | D2 | High | −4 per empty distractor slot |
| DL-021 | D2 | High | −5 per absent slot |
| DL-005 | D3 | Medium | −5 per duplicate pair |
| DL-016 | D4 | High | −4 |
| DL-024 | D4 | Low | −3 |
| DL-031 | D6 | High | −5 per inflated item |
| DL-032 | D6 | Medium | −3 per uncalibrated item |
| DL-009 | D1 | Medium | −3 |

---

## 13. Certification Decision Protocol

```
1. D1: Answer Accuracy Gate
   ├── PASS → Continue
   └── FAIL → Auto-reject (score = 0). Log to DEFECT_LIBRARY.md.

2. D2–D9: Score all 8 remaining dimensions
   Compute weighted sum: Σ(score × weight)

3. Apply Defect Penalties per §12

4. Certification Tier: ≥95 Gold, ≥80 Certified, 60-79 Editorial Queue, <60 Rejected

5. REVISION_HISTORY.md entry required for any state change
```

---

## 14. Governance & Maintenance

- **Version:** This standard is versioned at v1.0. Revisions require REVISION_HISTORY.md entry.
- **No content modification:** This standard does not authorize file writes, answer-key changes, or scoring engine changes.
- **State-change governance:** Any `question_state` change must be paired with a REVISION_HISTORY.md entry per governance-guard Rule 1.
- **Defect library synchronization:** Any new defect class must be mapped to this standard within the same session.

---

*End of MCQ Certification Standard v1.0*
*Generated: Session 800 (2026-07-26)*
