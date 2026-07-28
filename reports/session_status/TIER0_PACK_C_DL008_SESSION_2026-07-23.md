# Tier 0 Pack C DL-008 Session — Read-Only Findings Report

**Date:** 2026-07-23
**Session Type:** Read-only (governance amendment stopped all writes)
**Files Read:** pack_c_corrected.js (1,767,306 bytes, 500 items)
**Files Written:** 0 (backup only)
**Backup Created:** pack_c_corrected.js.bak-20260723223329 (1,767,306 bytes)

---

## 1. Executive Summary

**All 175 DL-008 items in Pack C are QUARANTINED (Tier 1) per governance amendment.**
No writes were made. A systematic CorrectChoice rotation artifact was discovered that makes
clearing EW[CC] unsafe — the non-empty fields in many cases are the only signal that the
stored CorrectChoice is wrong.

---

## 2. Independent Scan Results (Methodology: Boundary-Aware QuestionID Block Extraction)

### 2.1 DL-008 Count

| Category | Count |
|----------|-------|
| Total items in Pack C | 500 |
| Items with DL-008 (non-empty EW[CC]) | **175** |
| Certified DL-008 | **174** (100% of Certified pool) |
| Non-Certified DL-008 | 1 (P1-BC-094, question_state: MISSING) |

### 2.2 Section Distribution

| Section | Total | Certified | DL-008 (Certified) |
|---------|-------|-----------|-------------------|
| A | 75 | 75 | 75 (100%) |
| B | 100 | 100 | 99 (+1 MISSING: BC-094) |
| C-F | 325 | 0 | 0 |

### 2.3 State Breakdown

| question_state | Items | DL-008 | Clean |
|---------------|-------|--------|-------|
| Certified | 174 | **174** | 0 |
| Archived | 56 | 0 | 56 |
| Unprocessed | 19 | 0 | 19 |
| MISSING | 251 | **1** | 250 |

---

## 3. CC-EC Consistency Analysis (Keyword Overlap Method)

For each Certified item, compared ExplanationCorrect text with all four choices using
significant-word overlap (>3 chars, stop-word filtered). Determined which choice EC
best matches.

### 3.1 Aggregated Results

| Category | Count | % |
|----------|-------|---|
| CC = EC best match | 15 | 8.6% |
| CC ≠ EC best match | 129 | 74.1% |
| Tied (no clear winner) | 30 | 17.2% |
| **Total** | **174** | **100%** |

### 3.2 Section Breakdown

| Section | Misaligned | Aligned | Tied |
|---------|-----------|---------|------|
| A | 55 | 6 | 14 |
| B | 74 | 9 | 16 |
| **All** | **129** | **15** | **30** |

### 3.3 Pattern: 5-Item Rotation Template

The CorrectChoice values cycle A→B→C→D→A in lockstep through Section A and B,
and the ExplanationCorrect consistently supports the NEXT choice in the rotation
(or a different choice entirely), not the stored CC.

**8 of 8 manually sampled items confirmed this pattern:**

| QID | CC | Choice[CC] | EC Supports |
|-----|-----|-----------|-------------|
| P1-AC-001 | B | "Recognize premium as revenue" (WRONG) | Amortize as reduction of interest expense (Choice A) |
| P1-AC-008 | A | "Classify as equity" (WRONG) | Held-to-maturity at amortized cost (not Choice A) |
| P1-AC-012 | A | "Consolidate investee fully" (WRONG) | Equity method for 20-50% (not Choice A) |
| P1-AC-034 | C | "Do not translate" (WRONG) | Current rate method = translate (not Choice C) |
| P1-BC-001 | B | "Original static budget" (WRONG) | Flexible budget adjusts to actual (Choice A) |
| P1-BC-008 | A | "Guarantees accuracy" (WRONG) | Regression provides data-driven basis (not A) |
| P1-BC-050 | C | "Eliminates all motivational benefits" (WRONG) | Participative budgeting improves buy-in (not C) |
| P1-BC-100 | A | "Discontinue budgeting entirely" (WRONG) | Balanced scorecard (not A) |

**Root cause:** Same 5-item rotation template pipeline as DL-012 (Pack C/D Section E clones)
and DL-016 (Pack A Section E metadata shift). The CorrectChoice was auto-rotated
A→B→C→D→A across items without content verification against the stem and choices.

---

## 4. Off-Topic EW[CC] Analysis (DL-010 Component)

38 of 174 Certified items have EW[CC] text about a completely different topic
than the stem (confirmed by manual sampling of 4 items: P1-AC-005, P1-AC-030,
P1-BC-007, P1-AC-075).

Examples:
| QID | Stem Topic | EW[CC] Topic |
|-----|-----------|-------------|
| P1-AC-030 | Foreign currency translation | LIFO/FIFO inventory: "(300 x $20) + (550 x $18) = $6,000 + $9,900" |
| P1-AC-075 | Flexible vs static budget | Intangible asset amortization |
| P1-AC-005 | HTM debt securities | Bond premium amortization (different company name) |
| P1-BC-007 | Regression analysis | Prior-year results not a budget |

These 38 items have EW[CC] text from completely different items. DL-010
(misassigned explanations) combined with DL-008.

---

## 5. DEFERRED_QUEUE — Tier 1 Quarantined Items

**175 items total — no writes authorized, no fields cleared.**

### 5.1 Certified Items (174)

Full QID list: P1-AC-001 through P1-AC-075 (75 items), P1-BC-001 through P1-BC-099 (99 items)

All 174 Certified items in Pack C Sections A and B.

### 5.2 Non-Certified Items (1)

- **P1-BC-094** | CC:C | EW len:577 | State:MISSING
  - Also affected by CC-rotation artifact (EC supports "budgetary slack" not "zero-based budgeting")

### 5.3 Quarantine Reason

Systematic CorrectChoice rotation artifact (A→B→C→D→A template pattern).
Clearing EW[CC] to "" would mask answer-key errors. The non-empty EW[CC] text
in many cases is the only field correcting the error (e.g., P1-AC-001
ExplanationWrongB correctly explains why "recognize as revenue" is wrong,
countering the wrong CC:B value).

---

## 6. No-Go Decision: Why Remediation Was Not Executed

1. **174 of 174 Certified items (100%)** carry DL-008
2. **129 of 174 (74.1%)** have EC contradicting the stored CorrectChoice
3. **Only 15 (8.6%)** show CC = EC match (low confidence, many score 0)
4. The CC values follow a systematic rotation pattern (A,B,C,D,A...) characteristic
   of template-generated content without per-item answer-key verification
5. Clearing EW[CC] → "" would remove the only defensive mechanism against wrong
   answer keys currently present in items where EC supports a different choice
6. The 38 OFF-TOPIC items (DL-010) are also unsafe to clear because the underlying
   CC may still be wrong — the off-topic EW[CC] text being cleared doesn't help,
   but clearing it doesn't fix the CC either

---

## 7. Recommended Next Steps

1. **Priority: CRITICAL — CorrectChoice Audit**
   - For each of the 175 quarantined items, determine the correct answer letter
     using stem + choices as ground truth (not EC, not EW, not CC)
   - Build the per-item evidence ledger: QID, current CC, correct CC, if different
   
2. **After CC audit is complete:**
   - Fix CorrectChoice to correct value for all items where it's wrong
   - Then clear EW[CC] → "" for the new CorrectChoice position
   - Relocate any useful EW text from old CC slot to appropriate distractor slot

3. **Root cause remediation:**
   - The 5-item rotation template pipeline that generated these items did not
     verify CorrectChoice against content. This pipeline created DL-012, DL-016,
     and the CC errors in Pack C Sections A+B. All items produced by this pipeline
     need CorrectChoice verification.

---

## 8. Backup Integrity

```
File: pack_c_corrected.js.bak-20260723223329
Size: 1,767,306 bytes (matches original)
MD5: [Not computed — filesystem timestamp verified]
Status: Confirmed non-zero, read-accessible
```

No changes were made to any governance files (DEFECT_LIBRARY.md, REVISION_HISTORY.md).
This report is the sole session output.

---

## 9. Cross-References

- **DL-008**: DEFECT_LIBRARY.md — non-empty EW[CC] field
- **DL-010**: DEFECT_LIBRARY.md — misassigned choice explanations (38 items)
- **DL-012**: DEFECT_LIBRARY.md — Section E clone redundancy (same template pipeline)
- **DL-016**: DEFECT_LIBRARY.md — metadata-block topic-numbering shift (same pipeline)
- **Session Alpha**: Referenced "52 items" — this session found 175, refutes the 52 count
- **Governance amendment**: Tiered stop conditions (TIER 0/TIER 1/TIER 2)

---

**Session closed. DEFERRED_QUEUE of 175 items pending CorrectChoice audit.**
