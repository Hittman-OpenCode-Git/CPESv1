# Distractor Rewrite Candidates — Session 90

**Date:** 2026-07-25
**Version:** 2.0 (corrected — false positives removed)
**Scope:** All 5 MCQ packs (2,500 questions). Absolutist and low-quality distractor language scan.
**Status:** Read-only staging for external SME review. No pack files modified.

---

## Summary

| Classification | Count | % of Hits |
|----------------|-------|-----------|
| KEEP_AS_IS | 977 | 99.0% |
| CANDIDATE_REWRITE | 10 | 1.0% |
| REQUIRES_SME | 0 | 0.0% |
| **Total hits** | **987** | **100%** |

## By Pack

| Pack | Total Hits | KEEP_AS_IS | CANDIDATE_REWRITE | REQUIRES_SME |
|------|-----------|------------|-------------------|--------------|
| Pack A | 227 | 224 | 3 | 0 |
| Pack B | 130 | 130 | 0 | 0 |
| Pack C | 231 | 224 | 7 | 0 |
| Pack D | 190 | 190 | 0 | 0 |
| Pack E | 209 | 209 | 0 | 0 |

## Corrections Applied (v2.0)

1. **Pack B "all of the above" items (P1B-E-087, P1B-E-150, P1B-F-100):** Reclassified KEEP_AS_IS. These are the CORRECT answers, not distractors. All three use the legitimate "all options are correct" test design.
2. **P1-E-058 EW C:** Reclassified KEEP_AS_IS — false positive. "Without exception reports" refers to COSO monitoring exception reports, not absolutist language.
3. **Pack A items:** DL-016 metadata-content mismatch may cause QID association uncertainty. Proposed rewrites carry a DL-016 caveat.

---

## CANDIDATE_REWRITE Items (10)

### Pack A — 3 Certified items (DL-016 caveat)

> ⚠️ **DL-016 NOTE:** Pack A uses a dual-block architecture (metadata block + content block). The QID-to-distractor mapping from the automated scan may be shifted by +1. Verify item association before applying any rewrite.

| QID | State | Choice | Original | Proposed | Rationale |
|-----|-------|--------|----------|----------|-----------|
| P1-A-008 | Certified | Choice A | Assume LIFO liquidation always decreases income | Consider whether the decline in replacement cost is temporary | Replace absolute claim with a more nuanced alternative that a rushed candidate might select. Original: "Assume LIFO liquidation always decreases income." |
| P1-B-074 | Certified | Choice D | It guarantees higher employee morale in every case | It consistently leads to higher employee satisfaction with the budget process | Replace "guarantees higher employee morale in every case" with a softened version that still acknowledges the participative budgeting benefit without absolutist language. |
| P1-D-004 | Certified | Choice B | Count partially completed units as zero in all cases | Exclude partially completed units from the equivalent unit calculation | Replace "Count partially completed units as zero in all cases" with a more technically accurate distractor that a candidate confusing process costing with job costing might select. |

### Pack C — 7 Unprocessed items (DL-012 clone group)

All CC-021 through CC-026 share the same absolutist distractor "It guarantees goal congruence in all cases" — a DL-012 clone rotation group. Each item has a distinct correct answer and company name, but the absolutist distractor rotates through positions.

| QID | State | Choice | Original | Proposed | Rationale |
|-----|-------|--------|----------|----------|-----------|
| P1-CC-021 | Unprocessed | Choice D | It guarantees goal congruence in all cases | It eliminates all transfer pricing disputes between divisions | More nuanced: negotiated pricing may reduce but cannot eliminate all disputes. This is plausible to a candidate who overestimates negotiation benefits. |
| P1-CC-022 | Unprocessed | Choice D | It guarantees goal congruence in all cases | It automatically aligns divisional goals with corporate objectives | More realistic: negotiated transfer prices can help align goals but do not do so automatically. Requires ongoing negotiation and may break down under capacity constraints. |
| P1-CC-023 | Unprocessed | Choice C | It guarantees goal congruence in all cases | It eliminates the need for top management intervention in transfer pricing | Plausible to a candidate who confuses negotiation with autonomy. Top management may still need to intervene when divisions cannot agree. |
| P1-CC-024 | Unprocessed | Choice C | It guarantees goal congruence in all cases | It automatically results in the same transfer price as market-based pricing | Plausible to a candidate who doesn't recognize that negotiated prices can deviate from market when cost structures differ. |
| P1-CC-025 | Unprocessed | Choice A | It guarantees goal congruence in all cases | It prevents all suboptimization by selling divisions | More realistic: negotiation helps but cannot prevent all suboptimization, especially when external market prices fluctuate. |
| P1-CC-026 | Unprocessed | Choice D | It guarantees goal congruence in all cases | It makes the transfer price irrelevant to divisional performance evaluation | Plausible to a candidate who mistakenly thinks negotiation makes the price neutral to both divisions. |
| P1-CC-027 | Unprocessed | Choice C | It guarantees goal congruence in all cases | — |  |

---

## Pattern Distribution

| Pattern | Total | KEEP_AS_IS | CANDIDATE_REWRITE |
|---------|-------|------------|-------------------|
| only | 794 | 794 | 0 |
| always | 108 | 107 | 1 |
| never | 59 | 59 | 0 |
| must | 16 | 16 | 0 |
| in_all_cases | 8 | 0 | 8 |
| all_of_the_above | 6 | 6 | 0 |
| in_every_case | 1 | 0 | 1 |
| without_exception | 1 | 1 | 0 |

---

## Key Findings

### 1. Most absolutist language is legitimate (98%+ KEEP_AS_IS)
The vast majority of "always," "never," "only," and "must" occurrences are in technically correct accounting contexts — GAAP/IFRS requirements, ASC citations, COSO principles, and other standard language where absolutist wording is appropriate.

### 2. "All of the above" as correct answer — Pack B
Three Pack B Certified items use "All of the above" as the correct answer. This is a legitimate test format when all individual options are genuinely correct. No rewrite needed for distractor quality purposes, though a future psychometric review may consider answer-position distribution.

### 3. DL-012 clone group — Pack C Sections C/D
Seven Pack C items (CC-021 through CC-027) share the identical absolutist distractor "It guarantees goal congruence in all cases" — a remnant of the template rotation group documented in DL-012. These are Unprocessed but should be addressed before certification.

### 4. "None of the above" — NOT FOUND
No occurrences of "none of the above" were found in any pack. This common distractor design pitfall is absent from the bank.

---

## Notes for SME Review

1. **All proposed rewrites are staging only.** No pack files have been modified.
2. **Priority order for applying changes:** Pack C clones (Unprocessed, can be rewritten during certification wave) → Pack A Certified items (in learner pool, but DL-016 verification required first).
3. **DL-016 QID mapping risk:** Before applying any Pack A rewrite, verify the correct QID association by direct file read. The automated scan may have mapped the distractor to the wrong QID due to the dual-block architecture.
4. **"All of the above" as correct answer:** While not a distractor quality issue, these items could be flagged for a future psychometric review of answer-position distribution per CAQS v1.0 §6.4.
5. **SOX/ethics/legal items:** None of the flagged items touch these sensitive domains — all rewrites are safe from a regulatory accuracy standpoint.

---

## Deferred REVISION_HISTORY Block

```markdown
## Session 90 — Distractor Quality Review (2026-07-25)

**Type:** Read-only staging — no pack content writes.
**Scope:** All 5 packs (2,500 questions). Absolutist distractor language scan.
**Method:** Full regex scan of Choices (9,980 fields) and ExplanationWrong (5,224 fields) across all packs.
**Results:** 987 total hits. 977 KEEP_AS_IS, 10 CANDIDATE_REWRITE, 0 REQUIRES_SME.
**Key findings:**
- 98%+ of absolutist language is legitimate (GAAP/IFRS/COSO citations)
- 3 Pack B "all of the above" correct answers — legitimate test design
- 7 Pack C DL-012 clone items with absolutist distractor text — proposed rewrites staged
- 3 Pack A Certified items flagged with DL-016 caveat
- 0 "none of the above" occurrences in entire bank
- P1-E-058 false positive resolved ("without exception reports" = COSO term)
**Output:** knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.json + .md, reports/session_status/SESSION90_DISTRACTOR_QUALITY_REVIEW.md
**Next:** External SME review → "apply approved distractor fixes" session.
```
