# DL-007 Remediation — Inventory and Segmentation

**Date:** 2026-07-22
**Status:** Planning only — no remediation executed
**Source:** DL-010 scan byproduct (~832 findings) + prior CAQS Batch 1 analysis

## Inventory

| Pack | Estimated DL-007 Items | Sections Most Affected |
|------|----------------------|----------------------|
| pack_a_corrected.js | ~200 | All sections (A–F) |
| pack_c_corrected.js | ~320 | Sections A, C, D |
| pack_d_corrected.js | ~310 | Sections C, D, E, F |
| pack_b_corrected.js | ~2 | Section B (minor) |
| pack_e_corrected.js | ~0 | Not affected |
| **Total** | **~832** | |

**Pattern:** Template boilerplate of the form:
> "Option X (...) represents a plausible misconception. Under [topic/citation], the correct analysis leads to the conclusion that [correct answer]. A candidate may select this option by misapplying a related but distinct concept."

## Segmentation

### Segment 1 — Exact Duplicate Generic Explanation
**Estimated count:** ~200 (24%)
**Characteristics:** All three distractor explanations are identical except for option letter and choice text. No choice-specific pedagogical content.
**Disposition:** ReWrite during certification wave — highest priority because these provide zero educational value to learners.
**Detection:** Jaccard similarity >90% between ExplanationWrongA, ExplanationWrongC, ExplanationWrongD.

### Segment 2 — Generic but Directionally Accurate
**Estimated count:** ~400 (48%)
**Characteristics:** Template text correctly identifies the right approach for the question topic. Explanation is factually correct but says nothing about why the specific distractor was wrong.
**Disposition:** Editorial enhancement — defer to item-level review during pack waves. Acceptable interim state if not blocking certification.
**Detection:** Explanation states correct answer accurately but does not reference the distractor's specific misconception.

### Segment 3 — Generic and Misleading or Inconsistent
**Estimated count:** ~80 (10%)
**Characteristics:** Template text cites wrong authority (already fixed: DL-009), describes wrong concept for the topic (e.g., ERP systems for productivity question), or makes a factually incorrect claim about the distractor.
**Disposition:** Correctness defect — elevate before certification. Treat as blocking: these items cannot be Certified until resolved.
**Detection:** Topic/citation mismatch (DL-009 cross-check), or correct-answer description doesn't match the question's tested concept.

### Segment 4 — Shared Explanation Across Intentional Equivalent Distractors
**Estimated count:** ~52 (6%)
**Characteristics:** Two or more distractors are pedagogical equivalents designed to test the same misconception from different angles. Sharing an explanation across them is intentional, not a defect.
**Disposition:** Document as accepted pattern — false positive. Confirmation needed via per-question review.
**Detection:** Distractors are slightly reworded versions of the same error (e.g., "Record as revenue" vs. "Recognize as income").

### Segment 5 — Misassigned Explanation Discovered During Scan
**Estimated count:** ~3 (<1%)
**Characteristics:** Explanation text describes choice B but is assigned to slot A. Discovered as a byproduct of the DL-007 scan but classified under DL-010.
**Disposition:** Route to DL-010 or create new linked defect record. These are correctness defects.
**Detection:** Choice text in Explanation doesn't match the slot letter's choice.

### Segment 6 — Not Yet Assessed
**Estimated count:** ~97 (12%)
**Disposition:** Requires per-question review to classify into segments 1–5.

## Recommended Pilot

**File:** pack_a_corrected.js — Section C (~25 DL-007 items)
**Rationale:** Section C has moderate DL-007 density. Already started with P1-C-013 in Wave 4, which was a Segment 2→1 transformation (generic template rewritten to choice-specific).

### Pilot scope
- 25 Section C items in pack_a_corrected.js with DL-007 pattern
- Categorize into segments
- Remediate Segments 1 and 3 (correctness + exact duplicates) — ~15 items
- Document Segments 2 and 4 (defer to per-wave review)
- Route Segment 5 to DL-010

### Pilot controls
- Triage log with per-item segment classification and disposition
- Rollback: backup pack_a_corrected.js before pilot
- Sampled post-check: 30-item spot-check after remediation
- Halt threshold: if >3 items require Segment 3 (correctness) fixes, halt and re-plan

## Remediation Sequence (post-pilot)

| Step | Segment | Items | Action |
|------|---------|-------|--------|
| 1 | Segment 1 + 3 | ~280 | Rewrite as part of certification waves (highest correctness + educational impact) |
| 2 | Segment 2 | ~400 | Deferred — per-wave editorial enhancement. Not blocking certification. |
| 3 | Segment 4 | ~52 | Document and close as accepted pattern |
| 4 | Segment 5 | ~3 | Route to DL-010 workstream |
| 5 | Segment 6 | ~97 | Assess during pack waves |

## Expected Timeline

- Pilot (pack_a Section C): 1 session
- Segment 1+3 remediation: integrated into ~5 certification waves (8 items per wave, 2 waves per session)
- Segment 2 deferred: ongoing as packs are opened for certification
- Total DL-007 resolution: ~10 sessions across all waves
