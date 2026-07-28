# Item Readiness Score — Technical Specification v1.0

**Spec Only — No Pack Content Changes**
**Generated:** Session 301 (2026-07-26)
**Model Version:** S301-1.0

---

## 1. Score Computation

### 1.1 Formula

```
readiness_score = (base_caqs_score − defect_penalties) × confidence_factor
```

- **base_caqs_score:** Weighted sum of 10 CAQS dimensions (0–100)
- **defect_penalties:** Sum of penalties for all known defects per DEFECT_LIBRARY mapping
- **confidence_factor:** 0.6–1.0 based on AI/human verification confidence

### 1.2 Range & Floor

- Range: 0–100
- Floor: 0 (no negative scores)
- Ceiling: 100

### 1.3 Auto-Fail Conditions

A score of 0 on either of these produces an automatic overall score of 0 regardless of other dimensions:
- D3: Technical / Accounting Accuracy
- D6: Numerical Integrity

---

## 2. Dimension Weights (from CAQS §2.2)

| # | Dimension | Weight | Max Points | Auto-Fail |
|---|-----------|--------|------------|-----------|
| 1 | Blueprint Alignment | 20% | 20 | No |
| 2 | Cognitive Level (Bloom's) | 15% | 15 | No |
| 3 | Technical / Accounting Accuracy | 15% | 15 | Yes |
| 4 | Distractor Quality | 15% | 15 | No |
| 5 | Business Realism / Authenticity | 10% | 10 | No |
| 6 | Numerical Integrity | 10% | 10 | Yes |
| 7 | Explanation Quality | 10% | 10 | No |
| 8 | Writing Clarity | 5% | 5 | No |
| 9 | Accessibility / Fairness | 5% | 5 | No |
| 10 | Metadata Completeness | 5% | 5 | No |

**Total maximum base score:** 100

---

## 3. Defect Penalty Table

| Defect ID | Severity | Penalty | Auto-Zero | Description |
|-----------|----------|---------|-----------|-------------|
| DL-030 | Critical | −100 | Yes | CorrectChoice answer-key error |
| DL-001 | Critical | −100 | Yes | Semantic accuracy defect (answer/explanation mismatch) |
| DL-008 | High | −25 | No (but blocks certification) | Non-empty ExplanationWrong[CorrectChoice] |
| DL-010 | High | −15 | No | Misassigned choice explanations |
| DL-009 | High | −10 | No | Incorrect authority citation |
| DL-005 | Medium | −8 | No | High distractor similarity (>70% Jaccard) |
| DL-013 | Medium | −5 | No | Template boilerplate in explanations |
| DL-026 | Medium | −5 | No | Empty non-CC ExplanationWrong slots |
| DL-003 | Medium | −3 | No | Absolute language in choices |
| DL-004 | Medium | −3 | No | Ambiguous qualifiers in choices |
| DL-012 | Medium | −5 | No | Clone-group item needing audit |

Penalties are cumulative. An item with DL-008 (−25) AND DL-013 (−5) receives a total penalty of −30.

---

## 4. Confidence Factor

| Confidence Level | Factor | When Applied |
|-----------------|--------|-------------|
| High | 1.0 | All 6 CAQS dimensions verified at HIGH confidence |
| Medium | 0.85 | One or more dimensions at MEDIUM confidence |
| Low | 0.7 | One or more dimensions at LOW confidence |
| Unverified | 0.6 | No AI/human verification performed |

---

## 5. Aggregation Rules

### 5.1 Section Score

```
section_score = Σ(item_readiness_score) / section_item_count
```

**Minimum gate:** Every item in the section must score ≥ 60. If any item scores < 60, the section is classified as "Blocked" regardless of aggregate.

### 5.2 Pack Score

```
pack_score = Σ(section_score × section_item_count) / pack_total_items
```

### 5.3 Portfolio Score

```
portfolio_score = Σ(pack_score × pack_item_count) / portfolio_total_items
```

### 5.4 Score Decay

Scores decay linearly by 10% per 30-day period without re-verification:
- 0–30 days: full score
- 31–60 days: score × 0.9
- 61–90 days: score × 0.8
- 91+ days: score × 0.7

Re-verification resets the decay timer to 0.

---

## 6. Output Format

### 6.1 Per-Item Readiness Record

```json
{
  "qid": "P1-A-001",
  "pack": "A",
  "section": "A",
  "readiness_score": 92,
  "tier": "Certification-Ready",
  "base_caqs_score": 95,
  "defect_penalties": 0,
  "confidence_factor": 1.0,
  "defects_present": [],
  "certification_gates": {
    "G1_DL008": "pass",
    "G2_DL030": "pass",
    "G3_dimensions": "pass (6/6 >= min)",
    "G4_metadata": "pass",
    "G5_independent_verification": "pass"
  },
  "last_verified": "2026-07-26"
}
```

### 6.2 Section Rollup Record

```json
{
  "section_id": "A-A",
  "pack": "A",
  "item_count": 75,
  "certified_count": 73,
  "readiness_score": 95,
  "tier": "Certification-Ready",
  "min_item_score": 85,
  "defects_summary": {
    "DL-016": 2
  },
  "certification_blocked": false
}
```

### 6.3 Pack Rollup Record

```json
{
  "pack_id": "A",
  "total_items": 500,
  "certified_items": 481,
  "certified_pct": 96.2,
  "readiness_score": 95,
  "tier": "Certification-Ready",
  "sections_ready": 4,
  "sections_total": 6,
  "estimated_sessions_to_complete": 3,
  "blocker_defects": ["DL-016"]
}
```

---

*Generated: 2026-07-26 — Session 301*
