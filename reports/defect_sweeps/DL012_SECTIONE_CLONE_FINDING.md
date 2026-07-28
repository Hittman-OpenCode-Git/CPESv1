# DL-012 — Section E Clonal Redundancy (Pack C/D)

**Date:** 2026-07-22
**Status:** Finding documented — proposed defect entry (not yet in DEFECT_LIBRARY.md)

---

## Summary

| Measure | Value |
|---|---|
| Packs affected | Pack C (`pack_c_corrected.js`), Pack D (`pack_d_corrected.js`) |
| Section | E (Internal Controls) |
| Raw clone count | 128 (56 Pack C + 56 Pack D) |
| Clone groups | 28 groups of 5 items each (14 per pack) |
| Pattern classification | **Structural** — template-generated clones, not intentional pedagogical variants |

---

## Pattern Description

Each clone group consists of a **seed item** and **4 clones**:

| Clone mechanism | Detail |
|---|---|
| Stem variation | Fictional company name changes (alphabetical progression: Ashford→Brightpoint→Cedarline→Driftwood→Emberton). No other stem content varies. |
| Answer choices | Same four option texts, positionally rotated so the correct answer lands in each of A/B/C/D exactly once across the 5 items. |
| Distractor explanations | Verbatim identical within each group. Generic template text: "Option X represents a plausible misconception. Under [topic], the correct analysis leads to the conclusion that [correct answer]. A candidate may select this option by misapplying a related but distinct concept." |
| Difficulty variation | One clone per group is marked "Difficult" with expanded distractor explanations; others are "Moderate" or "Easy" with the base template. |

---

## Sample Evidence

### Pack C — Group 1 (Segregation of Duties)

| Item | Company | Correct |
|---|---|---|
| P1-EC-001 | Ashford | A |
| P1-EC-002 | Brightpoint | B |
| P1-EC-003 | Cedarline | C |
| P1-EC-004 | Driftwood | D (Difficult) |
| P1-EC-005 | Emberton | A |

Seed stem: "Ashford assigns one employee to authorize purchases, another to record them, and a third to reconcile the vendor accounts. What internal control concept does this reflect?"

Clone stem: "Brightpoint assigns one employee to authorize purchases, another to record them, and a third to reconcile the vendor accounts. What internal control concept does this reflect?"

### Pack D — Group 1 (Three Lines of Defense)

| Item | Company | Correct |
|---|---|---|
| P1-ED-001 | Alderway | A (custom distractor — unique) |
| P1-ED-002 | Bramblewood | B (template) |
| P1-ED-003 | Chalkhill | C (template) |
| P1-ED-004 | Dorwood | D (template) |
| P1-ED-005 | Elderfield | A (template) |

Seed stem: "Alderway structures its risk and control functions using operational management, risk/compliance oversight, and internal audit as distinct layers. What model is this?"

Clone stem: "Bramblewood structures its risk and control functions using operational management, risk/compliance oversight, and internal audit as distinct layers. What model is this?"

---

## Root Cause

This is **residual duplication from the historical Pack C/Pack D bulk-authoring aliasing issue**. The same authoring template was used to generate variant packs (A→C→D→B→E), producing 5-item groups where only the company name and answer-letter position varied. The same pattern exists in other sections of Packs C and D (documented in DL-007 and DL-009 defect classes).

---

## Proposed Defect Library Entry (DL-012 — Candidate)

```
Defect ID        DL-012
Class            Structural
Domain           Clone Redundancy
Severity         Medium
Detected By      Section E Population Scan (2026-07-22)
Status           Open — documented, not remediated
```

**Question IDs:** 128 items across Pack C (56) and Pack D (56) Section E.
**Pattern:** 5-item clone groups generated via template: company-name substitution, answer-letter rotation, identical distractor explanations.

### Detection Rule
For each micro-topic within a Section, compare stems for Jaccard similarity >90% after removing proper nouns. Flag groups of 5 items sharing the same stem skeleton with only company-name substitution and answer-letter rotation.

### Recommended Remediation
1. Retain one seed item per group (19 per pack).
2. Archive the 4 clones per group (56 per pack).
3. If additional pedagogical axes within the topic are needed, author new distinct-concept items — do not reuse template clones.

### Impact
128 items (34% of the raw 375 Section E population) provide zero additional pedagogical value. Only 247 of 375 Section E items are unique concepts.

---

## Required Conclusion

The 128 Section E clone items are **documented but not remediated** in this session. They should be formally archived before any Section E certification program certifies items from Packs C and D. The 19 active seed items per pack are sufficient for the recurring 50-question program — no clone certification is needed.

---

**Recommendation:** Do NOT add DL-012 to `DEFECT_LIBRARY.md` without explicit authorization. This document serves as the evidence package for authorization review.
