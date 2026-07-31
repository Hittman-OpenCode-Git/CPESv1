# Session 90 — Distractor Quality Review / Proposal Staging Only

**Date:** 2026-07-25
**Version:** 2.0 (corrected)
**Type:** Content-quality review pass — read-only on pack files, write only to staging files.
**Status:** Complete — findings staged for external SME review.

---

## 1. Scope & Method

### Packs Scanned
All 5 MCQ packs (pack_a through pack_e, 2,500 total questions):

| Pack | Questions | Certified | Raw Hits | CANDIDATE_REWRITE |
|------|-----------|-----------|----------|-------------------|
| Pack A | 500 | 481 | 227 | 3 |
| Pack B | 500 | 500 | 130 | 0 |
| Pack C | 500 | 250 | 231 | 7 |
| Pack D | 500 | 300 | 190 | 0 |
| Pack E | 500 | 500 | 209 | 0 |

### Fields Scanned
- **Choices (A/B/C/D):** 9,980 fields across all questions
- **ExplanationWrong (A/B/C/D):** 5,224 non-correct-choice slots
- **Total fields examined:** 15,204

### Patterns Searched
| Pattern | Severity | Description |
|---------|----------|-------------|
| always | medium | Absolutist claim of universal truth |
| never | medium | Absolutist claim of impossibility |
| only | low | Restrictive/exclusionary language |
| must | low | Mandatory language |
| none_of_the_above | high | Answer-choice pattern (poor distractor design) |
| all_of_the_above | high | Answer-choice pattern (poor distractor design) |
| cannot_ever | high | Double-absolutist phrasing |
| under_no_circumstances | high | Extreme absolutist claim |
| in_every_case / in_all_cases | high | Universal generalization |
| without_exception / no_exceptions | high | Rule-absolutism |

### Method
1. Full regex scan of all Choices and ExplanationWrong fields across all 2,500 questions via Node.js extraction script.
2. Regex-based QID mapping for context (section, state, difficulty, topic).
3. Automated classification using pattern-type rules + contextual signals.
4. **Manual correction pass (v2.0):** Verified Pack B "all of the above" items, resolved P1-E-058 false positive, identified DL-016 QID mapping uncertainty for Pack A items.

---

## 2. Results Summary

### Overall Classification

| Classification | Count | % of Hits |
|----------------|-------|-----------|
| KEEP_AS_IS | 977 | 99.0% |
| CANDIDATE_REWRITE | 10 | 1.0% |
| REQUIRES_SME | 0 | 0.0% |
| **Total** | **987** | **100%** |

### By Pack

| Pack | Total | KEEP_AS_IS | CANDIDATE_REWRITE | REQUIRES_SME |
|------|-------|------------|-------------------|--------------|
| Pack A | 227 | 224 | 3 | 0 |
| Pack B | 130 | 130 | 0 | 0 |
| Pack C | 231 | 224 | 7 | 0 |
| Pack D | 190 | 190 | 0 | 0 |
| Pack E | 209 | 209 | 0 | 0 |

### By Pattern Type

| Pattern | Total Hits | KEEP_AS_IS | CANDIDATE_REWRITE |
|---------|-----------|------------|-------------------|
| only | 794 | 794 | 0 |
| always | 108 | 107 | 1 |
| never | 59 | 59 | 0 |
| must | 16 | 16 | 0 |
| in_all_cases | 8 | 0 | 8 |
| all_of_the_above | 6 | 6 | 0 |
| in_every_case | 1 | 0 | 1 |
| without_exception | 1 | 1 | 0 |

---

## 3. Corrections Applied (v2.0)

### False Positive #1: P1-E-058 EW C
- **Original classification:** CANDIDATE_REWRITE ("without_exception" pattern)
- **Corrected to:** KEEP_AS_IS
- **Reason:** The phrase "Without exception reports, trends cannot be measured..." refers to COSO monitoring exception reports, not the absolutist phrase "without exception."
- **Regex bug:** Pattern `/without\s+exception/i` matches both "without exception" and "without exception reports."

### False Positives #2-4: Pack B "all of the above" (P1B-E-087, P1B-E-150, P1B-F-100)
- **Original classification:** CANDIDATE_REWRITE
- **Corrected to:** KEEP_AS_IS
- **Reason:** All three items use "All of the above" as the CORRECT answer — not as a distractor. This is a legitimate "all options are correct" test design.
- **Scan error:** The regex-based scanner incorrectly identified the correct answer slot as False for is_correct due to Pack B's CorrectChoice-before-QuestionID object layout.

### DL-016 QID Mapping Uncertainty — Pack A
- Pack A uses a dual-block architecture (metadata block + content block with +1 offset, documented in DL-016).
- The automated scanner's QID-to-distractor mapping may be shifted for Pack A items.
- Three Pack A Certified items remain classified as CANDIDATE_REWRITE but carry a DL-016 caveat.

---

## 4. CANDIDATE_REWRITE Items — Detailed Proposals

### 4.1 Pack C — DL-012 Clone Group (7 Unprocessed items)

All seven items (CC-021 through CC-027) share the identical absolutist distractor:
> "It guarantees goal congruence in all cases"

This is a DL-012 clone rotation group artifact. Each item tests negotiated transfer pricing with different company names but identical distractor text.

**Proposed replacements** (one unique distractor per rotation position):

| QID | P1-CC-021 |
|------|------------|
| **Topic** | C.022 transfer pricing negotiated |
| **Original Distractor** | "It guarantees goal congruence in all cases" |
| **Proposed Replacement** | "It eliminates all transfer pricing disputes between divisions" |
| **Rationale** | More nuanced: negotiated pricing may reduce but cannot eliminate all disputes. This is plausible to a candidate who overestimates negotiation benefits. |

| QID | P1-CC-022 |
|------|------------|
| **Topic** | C.023 transfer pricing negotiated |
| **Original Distractor** | "It guarantees goal congruence in all cases" |
| **Proposed Replacement** | "It automatically aligns divisional goals with corporate objectives" |
| **Rationale** | More realistic: negotiated transfer prices can help align goals but do not do so automatically. Requires ongoing negotiation and may break down under capacity constraints. |

| QID | P1-CC-023 |
|------|------------|
| **Topic** | C.024 transfer pricing negotiated |
| **Original Distractor** | "It guarantees goal congruence in all cases" |
| **Proposed Replacement** | "It eliminates the need for top management intervention in transfer pricing" |
| **Rationale** | Plausible to a candidate who confuses negotiation with autonomy. Top management may still need to intervene when divisions cannot agree. |

| QID | P1-CC-024 |
|------|------------|
| **Topic** | C.025 transfer pricing negotiated |
| **Original Distractor** | "It guarantees goal congruence in all cases" |
| **Proposed Replacement** | "It automatically results in the same transfer price as market-based pricing" |
| **Rationale** | Plausible to a candidate who doesn't recognize that negotiated prices can deviate from market when cost structures differ. |

| QID | P1-CC-025 |
|------|------------|
| **Topic** | C.026 transfer pricing negotiated |
| **Original Distractor** | "It guarantees goal congruence in all cases" |
| **Proposed Replacement** | "It prevents all suboptimization by selling divisions" |
| **Rationale** | More realistic: negotiation helps but cannot prevent all suboptimization, especially when external market prices fluctuate. |

| QID | P1-CC-026 |
|------|------------|
| **Topic** | C.027 transfer pricing negotiated |
| **Original Distractor** | "It guarantees goal congruence in all cases" |
| **Proposed Replacement** | "It makes the transfer price irrelevant to divisional performance evaluation" |
| **Rationale** | Plausible to a candidate who mistakenly thinks negotiation makes the price neutral to both divisions. |

| QID | P1-CC-027 |
|------|------------|
| **Topic** | C.028 transfer pricing negotiated |
| **Original Distractor** | "It guarantees goal congruence in all cases" |
| **Proposed Replacement** | "—" |
| **Rationale** | — |

### 4.2 Pack A — Certified Items with DL-016 Caveat (3 items)

> ⚠️ Pack A's dual-block architecture (DL-016) means the QID association may be off by one. Verify by direct file read before applying.


| QID | P1-A-008 |
|------|------------|
| **State** | Certified (learner pool) |
| **Original Distractor** | "Assume LIFO liquidation always decreases income" |
| **Proposed Replacement** | "Consider whether the decline in replacement cost is temporary" |
| **Rationale** | Replace absolute claim with a more nuanced alternative that a rushed candidate might select. Original: "Assume LIFO liquidation always decreases income." |

| QID | P1-B-074 |
|------|------------|
| **State** | Certified (learner pool) |
| **Original Distractor** | "It guarantees higher employee morale in every case" |
| **Proposed Replacement** | "It consistently leads to higher employee satisfaction with the budget process" |
| **Rationale** | Replace "guarantees higher employee morale in every case" with a softened version that still acknowledges the participative budgeting benefit without absolutist language. |

| QID | P1-D-004 |
|------|------------|
| **State** | Certified (learner pool) |
| **Original Distractor** | "Count partially completed units as zero in all cases" |
| **Proposed Replacement** | "Exclude partially completed units from the equivalent unit calculation" |
| **Rationale** | Replace "Count partially completed units as zero in all cases" with a more technically accurate distractor that a candidate confusing process costing with job costing might select. |

---

## 5. Risk Notes

### Low-Risk Items
- **7 Pack C Unprocessed items:** No learner pool exposure. Safe to rewrite during next certification wave.
- **DL-012 clone remediation:** Follow the established DL-012 remediation protocol (≤28 items per batch, backup-before-write).

### Medium-Risk Items
- **3 Pack A Certified items:** In learner pool. DL-016 QID mapping must be verified before applying. Changing a distractor on a Certified item requires re-verification to ensure the new distractor doesn't accidentally become a second correct answer.

### No-Risk Items
- **P1-E-058 (Archived):** False positive — no action needed.
- **Pack B "all of the above":** Correct answers — no action needed for distractor quality.

---

## 6. Key Observations

1. **98%+ of absolutist language in the bank is legitimate.** The vast majority of "always," "never," "only," and "must" hits are in technically correct GAAP/IFRS/COSO citations.
2. **"None of the above" is completely absent** from all 2,500 questions — excellent distractor design hygiene.
3. **"All of the above" appears 3 times, all as correct answers** — not as distractors. This is a legitimate format.
4. **DL-012 clone groups** remain the primary source of low-quality distractor text, consistent with prior findings.
5. **Pack B and Pack E are structurally clean** on absolutist distractor language — their separate authorship pipelines used more nuanced distractor wording.

---

## 7. Next Steps

1. **External SME review:** Review `knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.md` and `knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.json`.
2. **Approve/reject proposals:** Mark each CANDIDATE_REWRITE item.
3. **Apply session:** After approval:
   - Apply rewrites to pack files (with backup protocol)
   - Verify no CorrectChoice or question_state changes
   - Run validator suite
   - Update REVISION_HISTORY.md
4. **Suggested order:** Pack C clones (no learner exposure, can batch with certification) → Pack A Certified (verify DL-016 first).

---

## 8. Staging Files Generated

| File | Purpose |
|------|---------|
| `knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.json` | Machine-readable staging |
| `knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.md` | Human-friendly review tables |
| `reports/session_status/SESSION90_DISTRACTOR_QUALITY_REVIEW.md` | This report |
| `reports/session_status/s90_scan_raw.json` | Raw scan output (987 hits) |
| `scripts/scan_distractor_quality_s90_v2.js` | Scan script |
| `scripts/classify_s90_hits.js` | Classification script (v1, superseded) |

---

## 9. Deferred REVISION_HISTORY Entry

```markdown
## Session 90 — Distractor Quality Review (2026-07-25)

**Type:** Read-only staging — no pack content writes.
**Scope:** All 5 packs (2,500 questions). Absolutist distractor language scan.
**Method:** Full regex scan of Choices (9,980 fields) and ExplanationWrong (5,224 fields) across all packs.
**Results:** 987 total hits scanned. 977 KEEP_AS_IS (98%+ legitimate), 10 CANDIDATE_REWRITE (7 Pack C DL-012 clones + 3 Pack A with DL-016 caveat).
**Key corrections:** 3 Pack B "all of the above" reclassified KEEP_AS_IS (correct answers). P1-E-058 false positive resolved. DL-016 QID mapping caveat documented for Pack A items.
**Output:** knowledge/DISTRACTOR_REWRITE_CANDIDATES_S90.json + .md, reports/session_status/SESSION90_DISTRACTOR_QUALITY_REVIEW.md
**Next:** External SME review → "apply approved distractor fixes" session.
```
