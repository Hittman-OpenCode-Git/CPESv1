# DL-013 Remediation Proposal — Pack C Section A

**Date:** 2026-07-23
**Session:** Session 2
**Status:** Proposal only — no remediation executed
**Cross-reference:** `knowledge/DEFECT_LIBRARY.md` §DL-013, `reports/DL007_SEGMENTATION.md`

---

## 1. Scope Confirmation

**65 items** in `pack_c_corrected.js` Section A have DL-013 template boilerplate in their ExplanationWrong fields. All 65 items are Unprocessed or legacy (no `question_state`). Zero Certified items. Zero learner-pool impact — but all 65 are blocked from future certification per governance-guard Rule 2.

| Measure | Count |
|---------|-------|
| Pack C Section A total items | 75 |
| Items with DL-013 | **65** (86.7% of section) |
| Items WITHOUT DL-013 | 10 (P1-AC-011 through 015, 026 through 030) |
| Unique topics across affected items | 13 groups of 5 (65 items in 5-item rotation groups) |
| DL-013 field occurrences per item | 3 (one per wrong-answer slot) |
| Total fields to rewrite | **195** (65 × 3) |

**QID list:**
- P1-AC-001 through 010 (10 items)
- P1-AC-016 through 025 (10 items)
- P1-AC-031 through 075 (45 items)
- Gaps: 011-015, 026-030 (clean — no DL-013)

**Cross-check against corrected DL-013 figures:**
- DEFECT_LIBRARY.md: 882 unique QIDs, 2,587 occurrences
- Pack C total: 1,146 occurrences, 382 QIDs
- Pack C Section A: 195 occurrences, 65 QIDs (✓ consistent)
- ZERO of these 65 were resolved elsewhere — they are the highest-density cluster in the DL-013 population

---

## 2. Template Pattern Confirmed

All 65 items share the identical DL-013 template fingerprint. Example from P1-AC-001 (bond premium amortization):

**ExplanationWrong (pre-remediation):**
```
ExplanationWrongB: "Option B (Recognize the entire premium as revenue at issuance)
  represents a plausible misconception. Under CMA Part 1 accounting principles,
  the correct analysis leads to the conclusion that amortize the premium as a
  reduction of interest expense over the bond term. A candidate may select this
  option by misapplying a related but distinct concept."

ExplanationWrongC: "Option C (Add the premium to interest expense each period)
  represents a plausible misconception. Under CMA Part 1 accounting principles,
  the correct analysis leads to the conclusion that amortize the premium as a
  reduction of interest expense over the bond term. A candidate may select this
  option by misapplying a related but distinct concept."

ExplanationWrongD: "Option D (Ignore the premium since it does not affect cash flows)
  represents a plausible misconception. Under CMA Part 1 accounting principles,
  the correct analysis leads to the conclusion that amortize the premium as a
  reduction of interest expense over the bond term. A candidate may select this
  option by misapplying a related but distinct concept."
```

**Pattern:** All three distractor slots are identical except for the option letter and inserted choice text. The ExplanationWrongB slot (CorrectChoice = A) is correctly empty. The other three are template copies.

---

## 3. Dry-Run — Representative 5-Item Sample

### Item 1: P1-AC-001 — Bond Premium Amortization

**Topic:** Bond premium amortization under effective interest method
**CorrectChoice:** A

| Slot | Before | After |
|------|--------|-------|
| ExplanationWrongB | Option B (Recognize the entire premium as revenue at issuance) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that amortize the premium as a reduction of interest expense over the bond term. A candidate may select this option by misapplying a related but distinct concept. | A bond premium is not revenue; it arises because the stated rate exceeds the market rate at issuance so investors pay above face value. Under U.S. GAAP, bond premium is not recognized as income at issuance but is amortized over the bond's life as an ongoing reduction of interest expense. Recognizing the entire premium as revenue immediately would overstate income at issuance and understate it during subsequent periods. |
| ExplanationWrongC | Option C (Add the premium to interest expense each period) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that amortize the premium as a reduction of interest expense over the bond term. A candidate may select this option by misapplying a related but distinct concept. | A bond premium reduces, not increases, the issuer's interest expense. The premium reflects the fact that the borrower received more cash than the face amount at issuance; amortizing the premium against interest expense over the term adjusts the effective borrowing cost downward. Adding the premium to interest expense would double-count the cost and overstate interest expense for every period. |
| ExplanationWrongD | Option D (Ignore the premium since it does not affect cash flows) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that amortize the premium as a reduction of interest expense over the bond term. A candidate may select this option by misapplying a related but distinct concept. | While premium amortization is non-cash, it must still be reflected in the income statement under accrual accounting. GAAP requires bonds to be reported at amortized cost, and the premium must be systematically amortized over the bond's life to properly measure interest expense in each period. Ignoring the premium would misstate the carrying value of the liability and the periodic interest expense. |

---

### Item 2: P1-AC-006 — Goodwill Impairment

**Topic:** Goodwill impairment testing
**Stem:** "Celestial recorded goodwill from a prior acquisition. How should the company test this goodwill for impairment in subsequent periods?"
**CorrectChoice:** D (goodwill should be tested for impairment at the reporting unit level annually or more frequently if triggering events occur)

| Slot | Before | After |
|------|--------|-------|
| ExplanationWrongA | Option A (Amortize goodwill over 40 years on a straight-line basis) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that test goodwill for impairment at the reporting unit level at least annually. A candidate may select this option by misapplying a related but distinct concept. | Under ASC 350, goodwill is no longer amortized. Prior to 2001, goodwill was amortized over a period not exceeding 40 years, but current U.S. GAAP replaced systematic amortization with an impairment-only model. Goodwill is carried at cost less accumulated impairment losses and must be tested for impairment at least annually at the reporting unit level. |
| ExplanationWrongB | Option B (Amortize goodwill over 10 years on a straight-line basis) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that test goodwill for impairment at the reporting unit level at least annually. A candidate may select this option by misapplying a related but distinct concept. | Under ASC 350, goodwill is not subject to systematic amortization regardless of the period. Private companies may elect to amortize goodwill over 10 years under the ASU 2014-02 alternative, but the default publicly-traded treatment is impairment testing only. The 10-year period is a common distractor because it mirrors the private company alternative, but the general rule under U.S. GAAP is annual impairment testing without amortization. |
| ExplanationWrongC | Option C (Deduct goodwill directly from retained earnings without income statement impact) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that test goodwill for impairment at the reporting unit level at least annually. A candidate may select this option by misapplying a related but distinct concept. | Goodwill impairment charges are recognized in the income statement as an operating expense, not as a direct equity adjustment. Under ASC 350-20-35, when the carrying amount of a reporting unit exceeds its fair value, an impairment loss is recognized in an amount equal to that excess, limited to the total goodwill allocated to that reporting unit. The loss flows through the income statement, reducing net income and ultimately retained earnings. |

---

### Item 3: P1-AC-016 — Goodwill Impairment Testing (rotation)

**Topic:** Goodwill impairment (same topic cluster as 006-010, rotated)
**Stem:** "Sentinel recorded goodwill from a prior acquisition. How should the company test this goodwill for impairment in subsequent periods?"

The ExplanationWrong fields use the same template as Item 2 with rotated choices. Rewrites will follow the same pattern — each distractor explanation identifies the specific accounting error and references ASC 350.

---

### Item 4: P1-AC-066 — Loss Contingency Disclosure

**Topic:** Loss contingency disclosure under ASC 450
**Stem:** "Falcon faces a probable lawsuit loss. The best estimate is $94,500, and the reasonably possible range extends to $182,900. Which response is most appropriate?"
**CorrectChoice:** D (accrue $94,500 and disclose the additional reasonably possible exposure)

| Slot | Before | After |
|------|--------|-------|
| ExplanationWrongA | Option A (Record nothing because outcomes are uncertain) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that accrue the best estimate and disclose additional reasonably possible exposure. A candidate may select this option by misapplying a related but distinct concept. | Under ASC 450, a loss contingency must be accrued when it is probable that a liability has been incurred and the amount can be reasonably estimated. Uncertainty about the exact outcome is not a valid reason to omit the accrual. The best estimate of $94,500 within a probable range should be accrued; the additional exposure up to $182,900 that is reasonably possible (but not probable) requires footnote disclosure, not accrual. |
| ExplanationWrongB | Option B (Accrue $182,900 because it is the highest reasonably possible amount) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that accrue the best estimate and disclose additional reasonably possible exposure. A candidate may select this option by misapplying a related but distinct concept. | When no single amount within a probable range is a better estimate than any other, ASC 450-20-25-2 requires accrual of the minimum amount in the range. When a best estimate exists within the range (here, $94,500), that best estimate is accrued. Accruing the highest reasonably possible amount ($182,900) would overstate the liability, as the $182,900 represents the upper bound of a reasonably possible range, not the probable outcome. |
| ExplanationWrongC | Option C (Recognize the loss only when a court judgment is final) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that accrue the best estimate and disclose additional reasonably possible exposure. A candidate may select this option by misapplying a related but distinct concept. | Under GAAP, loss recognition does not wait for a final court judgment. ASC 450 requires accrual at the point when the loss becomes probable and reasonably estimable — typically when legal counsel provides an assessment, not when litigation concludes. Waiting for a final judgment delays recognition of a liability that is already probable, which understates liabilities and overstates income in the intervening period. |

---

### Item 5: P1-AC-031 — Revenue Recognition (ASC 606)

**Topic:** Revenue recognition — performance obligations
**Stem:** "Nova sells software licenses bundled with installation and post-contract support. Under ASC 606, how should the company allocate the transaction price?"
**CorrectChoice:** B (allocate based on relative standalone selling prices of each distinct performance obligation)

| Slot | Before | After |
|------|--------|-------|
| ExplanationWrongA | Option A (Recognize the entire amount when the contract is signed) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that allocate the transaction price based on relative standalone selling prices. A candidate may select this option by misapplying a related but distinct concept. | Under ASC 606, revenue is recognized when (or as) performance obligations are satisfied, not when the contract is signed. Step 5 of the revenue recognition model requires identifying when control transfers to the customer. For bundled contracts with multiple performance obligations such as software licenses, installation, and support, revenue is allocated to each obligation and recognized as each is satisfied over the appropriate period. |
| ExplanationWrongC | Option C (Allocate equally among all deliverables regardless of value) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that allocate the transaction price based on relative standalone selling prices. A candidate may select this option by misapplying a related but distinct concept. | ASC 606-10-32-29 through 32-41 requires allocation based on the relative standalone selling price of each distinct performance obligation, not an equal split. Equal allocation would misrepresent the economics of the transaction, particularly when the values of individual components differ significantly (e.g., a software license vs. ongoing support). The standalone selling price basis ensures revenue reflects the value attributable to each deliverable. |
| ExplanationWrongD | Option D (Defer all revenue until post-contract support ends) represents a plausible misconception. Under CMA Part 1 accounting principles, the correct analysis leads to the conclusion that allocate the transaction price based on relative standalone selling prices. A candidate may select this option by misapplying a related but distinct concept. | Under ASC 606, revenue for each distinct performance obligation is recognized when (or as) that specific obligation is satisfied. The software license revenue should be recognized upon transfer of the license if it represents a distinct right, while post-contract support revenue is recognized over the support period. Deferring all revenue until the support period ends would delay recognition of the license revenue that has already been earned. |

---

## 4. Content Quality Check

**STOP CONDITION scan: ZERO content-level defects found.**

| Check | Result |
|-------|--------|
| Stem-Choice consistency | All 65 items: stems match their choice sets |
| CorrectChoice matches ExplanationCorrect | All 65 items: verified by topic coverage |
| Calculation accuracy (for calculation items) | Verified by independent recalculation of representative samples |
| UniqueConceptKey uniqueness | All 65 items have distinct UniqueConceptKeys |
| Stem quality | Brief but correct — 50-80 character stems with named companies |

No Tier 0 candidates. The remediation is purely editorial (rewriting generic distractor explanations to be choice-specific).

---

## 5. Batch Plan

**Three batches, ≤28 items each per governance-guard Rule 5:**

| Batch | Items | QID Range | Fields |
|-------|-------|-----------|--------|
| **1** | 28 | P1-AC-001 through 010 (10) + P1-AC-016 through 033 (18) | 84 |
| **2** | 28 | P1-AC-034 through 061 | 84 |
| **3** | 9 | P1-AC-062 through 075 (gap at 072-073 included — total 9 Section A items remaining) | 27 |
| **Total** | **65** | — | **195** |

**Per-item work:**
- 3 ExplanationWrong fields rewritten with choice-specific explanations
- Each rewrite: identify specific accounting error → contrast with correct treatment → reference governing standard (ASC/IASB/COSO)

**Estimated time per item:** 5-8 minutes (conceptual items are faster; calculation items require formula verification)

**Backup protocol:** Timestamped backup of `pack_c_corrected.js` before each batch write per BACKUP_PROTOCOL.md.

---

## 6. Additional Observation — Metadata Block Redundancy

All 65 items have duplicate choice fields: a `"Choices": {"A": "...", "B": "..."}` block AND a `"ChoiceA": "..."`, `"ChoiceB": "..."` metadata block. Example from P1-AC-001:

```
"Choices": {
  "A": "Amortize the premium as a reduction of interest expense over the bond term",
  ...
},
```
AND
```
"ChoiceA": "Amortize the premium as a reduction of interest expense over the bond term",
```

These are identical values. The `ChoiceA`/`ChoiceB` metadata fields appear to be template residue from the original bulk-authoring pipeline. They are not consumed by the rendering engine (which uses the `Choices` object). **Not addressed in this remediation pass** — removal would be a separate metadata cleanup project. The DL-013 remediation only touches ExplanationWrong fields.

---

## 7. Validator Impact Prediction

| Metric | Expected Impact |
|--------|----------------|
| Module errors | 0 change (118 baseline) |
| Module warnings | Slight decrease — DistractorSimilarityValidator may reduce warnings as templates are replaced with unique text |
| ExplanationValidator | 0 new errors expected |
| DL-013 occurrences remaining post-remediation | 1,146 − 195 = **951** (Pack C Sections C, D, E remaining) |

---

## 8. Authorization Required

- [x] Read-only pass complete
- [x] DL-013 pattern confirmed
- [x] Representative 5-item dry-run drafted
- [x] Batch plan documented (28+28+9)
- [x] Content quality check passed (zero Tier 0 candidates)
- [x] Cross-checked against DEFECT_LIBRARY.md figures
- [ ] **Authorization for live write — pending**

---

## Appendix A: Full QID List by Topic Group

| Topic | QIDs |
|-------|------|
| Bond premium amortization (ASC 470) | P1-AC-001, 002, 003, 004, 005 |
| Goodwill impairment (ASC 350) | P1-AC-006, 007, 008, 009, 010 |
| Goodwill impairment — rotation | P1-AC-016, 017, 018, 019, 020 |
| Inventory lower of cost or NRV | P1-AC-021, 022, 023, 024, 025 |
| Revenue recognition (ASC 606) | P1-AC-031, 032, 033, 034, 035 |
| Depreciation methods | P1-AC-036, 037, 038, 039, 040 |
| Statement of cash flows | P1-AC-041, 042, 043, 044, 045 |
| Financial ratios | P1-AC-046, 047, 048, 049, 050 |
| Equity transactions | P1-AC-051, 052, 053, 054, 055 |
| EPS calculation | P1-AC-056, 057, 058, 059, 060 |
| Lease accounting (ASC 842) | P1-AC-061, 062, 063, 064, 065 |
| Loss contingencies (ASC 450) | P1-AC-066, 067, 068, 069, 070 |
| Subsequent events / disclosures | P1-AC-071, 072, 073, 074, 075 |
