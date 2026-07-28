# CMA Part 1 — Certification Readiness Standard v1.0

**Spec Only — No Pack Content Changes**
**Implementation sessions: 500-series certification waves**
**Generated:** Session 301 (2026-07-26)
**Authority:** 300-Series Charter, CAQS v1.0, CERTIFICATION_RUBRICS.md
**Dependencies:** CAQS_v1.0.md, CERTIFICATION_RUBRICS.md, BUILD_TIME_VERIFICATION_STANDARD.md, DEFECT_LIBRARY.md, QUESTION_METADATA_STANDARD.md

---

## 1. Purpose & Scope

### 1.1 Purpose

This document defines what "certification-ready" means for any item, section, pack, or the entire CMA Part 1 portfolio. It integrates CAQS, Certification Rubrics, Build-Time Verification Standard, and Defect Library into a single unified readiness assessment framework that the 500-series consumes before executing certification decisions.

### 1.2 Scope

Applies to:
- All 2,500 MCQ items across 5 packs (A–E)
- All case study items across scored_cases files
- All 6 CMA Part 1 blueprint sections (A–F)
- The full portfolio (2,500 MCQ + case pool)

### 1.3 Relationship to Certification

Readiness is a **pre-condition** for certification, not certification itself. The 300-series assesses readiness. Only the 500-series makes certification decisions. A readiness score of 85+ means the item is highly likely to pass certification on first attempt — it does not certify the item.

---

## 2. Integration with Existing Standards

### 2.1 CAQS v1.0

Readiness dimensions R1–R6 directly map to CAQS §1.6 six build-time verification dimensions. Readiness scoring uses CAQS §2 (100-point rubric) as the base score computation.

| CAQS Dimension | Readiness Dimension | Weight |
|---------------|-------------------|--------|
| 1. Correctness | R1: Content Accuracy | 15% |
| 2. Precision | R2: Precision & Clarity | 10% |
| 3. Difficulty Calibration | R3: Difficulty Alignment | 5% |
| 4. Distractor Engineering | R4: Distractor Quality | 15% |
| 5. Blueprint Alignment | R5: Blueprint Alignment | 20% |
| 6. CMA Part 1 Relevance | R6: Scope Compliance | Auto-fail |

### 2.2 CERTIFICATION_RUBRICS.md

The D1–D6 MCQ rubric defines the certification gate for each dimension. Readiness predicts whether an item will pass the rubric on first attempt.

| Rubric Dimension | Min Score for Cert | Readiness Threshold |
|-----------------|-------------------|-------------------|
| D1: Content Accuracy | 5 (Authoritative) | D1 ≥ 5 |
| D2: Blueprint Alignment | 4 (Specific topic) | D2 ≥ 4 |
| D3: Clarity & Fairness | 4 (Good) | D3 ≥ 4 |
| D4: Distractor Quality | 4 (Good) | D4 ≥ 4 |
| D5: Explanation Quality | 4 (Good) | D5 ≥ 4 |
| D6: Governance & Metadata | 4 (Good) | D6 ≥ 4 |

### 2.3 BUILD_TIME_VERIFICATION_STANDARD.md

Confidence levels (High/Medium/Low) from AI verification feed directly into the readiness confidence factor. Low-confidence items cannot exceed Tier 3 (Needs Work) regardless of base score.

### 2.4 DEFECT_LIBRARY.md

Every DL-xxx defect class maps to a readiness penalty based on severity:
- Critical → −100 (auto-0)
- High → −15 to −25
- Medium → −3 to −8
- Low → −1 to −2

---

## 3. Readiness Dimensions

### R1: Content Accuracy (Weight: Critical — Auto-fail if < 5)

CorrectChoice is verified correct under authoritative standards. All calculations verified. No DL-030 or DL-001 defects.

### R2: Precision & Clarity (Weight: High)

Fact pattern yields exactly one defensible answer. Stem is unambiguous. No missing assumptions. No double-barreled questions.

### R3: Difficulty Alignment (Weight: Medium)

DifficultyScore and CognitiveLevel match the stated tier and LOS depth verb. No mismatches between label and actual content demand.

### R4: Distractor Quality (Weight: High)

Every distractor targets a distinct, documented misconception or calculation error. No identical distractors. No obviously wrong choices. No absolute-language cueing.

### R5: Blueprint Alignment (Weight: High)

Item maps to a specific CSO LOS. LOSTag present and correct. CognitiveLevel matches LOS verb. Topic and Subtopic identified. No Part 2 scope creep.

### R6: Scope Compliance (Weight: Auto-fail)

Item tests Part 1 material only. No Part 2 contamination. In-scope per current IMA CSO.

### R7: Defect Freedom (Negative scoring)

Penalties applied per DEFECT_LIBRARY.md mapping. Critical defects auto-fail. High defects are certification-blocking.

### R8: Structural Integrity (Block-level)

File parseable, object boundaries intact, no corrupted separators, no missing fields. Pack-level structural gate.

---

## 4. Readiness Tiers

| Tier | Score Range | Label | Action Required |
|------|------------|-------|-----------------|
| 1 | 85–100 | Certification-Ready | Pass to 500-series for certification decision |
| 2 | 70–84 | Near-Ready | Targeted revision — 300-series remediation plan |
| 3 | 50–69 | Needs Work | Substantial revision — requires editorial session |
| 4 | 0–49 | Blocked | Critical defect — cannot proceed until resolved |

---

## 5. Readiness Gates

| Gate | Condition | Blocking |
|------|-----------|----------|
| G1: DL-008 cleared | ExplanationWrong[CorrectChoice] is empty for all items | Yes |
| G2: DL-030 absent | No known CorrectChoice answer-key errors | Yes |
| G3: All 6 dimensions ≥ minimum | Each CAQS dimension meets certification threshold | Yes |
| G4: Metadata complete | QuestionMetadata fields present per standard | Yes |
| G5: Independent verification | At least one independent reviewer has verified the item | Yes |

---

## 6. Section Certification Readiness

A section is Certification-Ready when:
- Every item in the section has a readiness score ≥ 70
- No item has a critical defect (DL-030, DL-001)
- No item has DL-008 (EW[CC] non-empty)
- Section aggregate score ≥ 85

### Current Section Readiness (2026-07-26)

**Ready (18 of 30 sections):** B×6, E×6, A-B, A-C, A-D, A-F, C-A, C-B, C-C, C-D, D-A, D-B, D-C, D-D

**Near-Ready (2 sections):** A-A (73/75, 2 archived), D-C (100/100 Certified but DL-026 residual)

**Needs Work (2 sections):** C-F (0/75, unprocessed), D-F (0/74, unprocessed)

**Blocked (2 sections):** C-E (0/75, 56 archived clones + DL-008), D-E (0/75, 56 archived clones)

---

## 7. Pack Certification Readiness

| Pack | Total | Certified | Readiness | Tier | Remaining |
|------|-------|-----------|-----------|------|-----------|
| A | 500 | 481 (96.2%) | 95 | Certification-Ready | 19 archived |
| B | 500 | 500 (100%) | 100 | Certification-Ready | 0 |
| C | 500 | 350 (70.0%) | 67 | Needs Work | 150 |
| D | 500 | 350 (70.0%) | 65 | Needs Work | 150 |
| E | 500 | 500 (100%) | 100 | Certification-Ready | 0 |

---

## 8. Portfolio Certification Readiness

**Overall:** 2,181/2,500 Certified (87.2%) — **Near-Ready**

The portfolio requires approximately 12 sessions to reach 100% certification, following a 4-wave plan:

1. **Wave 1** (2 sessions): Pack A closeout + small DL-008 clears (29 items)
2. **Wave 2** (4 sessions): C-F + D-F batch certifications (149 items)
3. **Wave 3** (3 sessions): Pack C DL-008 cluster CC audit + EW[CC] remediation (174 items)
4. **Wave 4** (3 sessions): C-E + D-E clone audit (112 items)

---

## 9. Remediation → Certification Pipeline

```
300-Series Readiness Assessment
        ↓
   Readiness Score ≥ 85?
    ↓ YES           ↓ NO
500-Series          300-Series Remediation Plan
Certification            ↓
Decision           Remediation Executed
                       ↓
                 Re-assess Readiness
```

---

## 10. Governance & Maintenance

- This standard is versioned at v1.0. Revisions require REVISION_HISTORY.md entry.
- Readiness scores decay if not re-verified within 30 days.
- Any new defect class added to DEFECT_LIBRARY.md must be mapped to a readiness penalty.
- The 300-series maintains this standard. The 500-series consumes it.
- **No content changes, no certification decisions, no answer-key modifications are authorized under this standard.**

---

*Generated: 2026-07-26 — Session 301*
*Next review: After Wave 1 completion or 30 days, whichever comes first*
