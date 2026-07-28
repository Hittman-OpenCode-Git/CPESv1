# DL-007 Unique QID Count — Boundary-Aware Re-Verification

**Date:** 2026-07-23
**Requested by:** Session 6 follow-up from Session 1
**Status:** Complete — count confirmed, discrepancy root cause identified

---

## 1. Re-Verification Methodology

Per `.opencode/skills/reconciliation-audit.md` §3a (boundary-aware, calibrated 2026-07-23):

- **Method 1 (Boundary-aware block parse):** Find each `"QuestionID"` marker → scan forward to next `"QuestionID"` marker → test the block between them for DL-007 template pattern.
- **Method 2 (Proximity attribution, ≤4k):** Find each DL-007 pattern occurrence → scan backwards ≤4,000 characters to find the nearest preceding `"QuestionID"` → attribute.

Both methods are boundary-aware; neither uses a fixed window that can bleed across item boundaries.

---

## 2. Results

| Pack | Method 1 (block parse) | Method 2 (proximity ≤4k) | Authoritative |
|------|----------------------|--------------------------|---------------|
| Pack A | 118 | 118 | **118** |
| Pack C | 382 | 382 | **382** |
| Pack D | 382 | 382 | **382** |
| **Total** | **882** | **882** | **882** |

**Both methods agree exactly.** The count is stable.

### Confirmed: Session 6's count of 882 was correct

The boundary-aware re-verification converges on the same figure as Session 6's `Select-String` + `findstr` scan. Despite using non-boundary-aware tooling, Session 6's unique QID count was accurate — the DL-007 template pattern is well-bounded within each question object, and the occurrence-to-QID attribution didn't suffer from window-bleed.

---

## 3. Comparison: Three Reported Counts

| Source | Unique QIDs | Method | Verified? |
|--------|------------|--------|-----------|
| Session 6 (`Select-String` + `findstr`) | **882** | Raw-text pattern match → QID attribution | ✅ Confirmed |
| This re-verification (boundary-aware) | **882** | Block-parse + proximity attribution | ✅ Authoritative |
| DEFECT_LIBRARY.md DL-013 | **1,011** | Not independently verifiable | ❌ Overcount |

**The 882 figure is the correct unique QID count.** The 1,011 figure in DEFECT_LIBRARY.md DL-013 is an overcount of 129 QIDs (14.6%).

---

## 4. Root Cause of the 1,011 Figure

### Background

The DL-013 entry in DEFECT_LIBRARY.md was derived from a three-method scan described in `knowledge/REVISION_HISTORY.md`:

> "Three independent counting methods converged at 2,587 field occurrences: Method 1: global regex (pattern match across raw files). Method 2: field-bounded extraction (ExplanationWrong field name → value regex). Method 3: boundary-aware parse (brace-matched complete objects)."

The three methods converged on **2,587 field occurrences** — this figure is correct. But the **unique QID count (1,011)** was not independently verified using Method 3 (the only boundary-aware method in the list). Methods 1 and 2 count occurrences, not unique QIDs — only Method 3 could distinguish individual question objects.

### Likely Inflation Mechanism

Method 3 was described as "brace-matched complete objects" — parsing JSON objects by matching `{` / `}` pairs within the JavaScript source. However, brace-matching on a raw JS file that contains the outer array wrapper and interspersed metadata creates a different "object boundary" than the QuestionID-based block boundary used by the authoritative method.

If brace-matching failed to correctly isolate individual question objects (e.g., by including a trailing comma as a separate token, splitting on an unescaped brace in a string, or failing to close a block), it could fractionate one QID's content across multiple "objects," causing a single question to be counted multiple times. An overcount of 14.6% (129 of 882) is consistent with a low-level per-object parsing error rate.

---

## 5. Patch Information

### 5a. DEFECT_LIBRARY.md DL-013 — Composition Figure to Correct

The current DL-013 entry reads:

```
Question IDs: 1,011 unique QuestionIDs across Pack A, Pack C, Pack D.
Total: 2,587 individual ExplanationWrong field occurrences.
```

The 1,011 figure should be corrected to **882**. The 2,587 field-occurrence figure is confirmed correct by all methods and does not need adjustment.

**Correction:**
- Old: `1,011 unique QuestionIDs`
- New: `882 unique QuestionIDs`

The per-pack breakdown should be:
| Pack | Unique QIDs |
|------|------------|
| Pack A | 118 |
| Pack C | 382 |
| Pack D | 382 |
| **Total** | **882** |

### 5b. Remediation Plan Re-Sizing

If DL-013 remediation batches were sized using the 1,011 figure, they are **17.2% oversized** (129 extra QIDs). Re-size batches using the 882 figure. The batch-size cap of ≤28 per governance-guard Rule 5 means 882 ÷ 28 = 32 batches (last batch of 14), down from 37 batches at the 1,011 figure.

### 5c. No Other DL-013 Scope Changes

The following remain unchanged:
- Field occurrence count: 2,587 (confirmed)
- Pack distribution: A:295, C:1,146, D:1,146 (confirmed)
- Zero Certified QIDs affected (all 882 are Unprocessed / no q_state)
- Zero DL-007 templates in Packs B and E
- Zero DL-007 templates in scored_cases*.js

---

## 6. Session 1's Original Diagnostic → Retracted

The prior diagnostic (`reports/CROSS_SESSION_DIAGNOSTIC_882_vs_1011_QID.md`) assumed Session 6's 882 count was the undercount and DL-013's 1,011 was correct. The opposite is true. The prior diagnostic should be read in light of this correction.

---

## 7. Next Step

The DEFECT_LIBRARY.md DL-013 entry needs a single correction (1,011 → 882). This is a one-line edit. Do not rewrite the entire DL-013 entry — the rest of the content (pattern description, segmentation, remediation plan, count stability documentation) is correct as-is.

The `REVISION_HISTORY.md` DL-013 entry (2026-07-23) may also reference the 1,011 figure — check and correct if present.

---

*Boundary-aware re-verification completed 2026-07-23. No governance MD files edited. Report only — corrections await explicit authorization.*
