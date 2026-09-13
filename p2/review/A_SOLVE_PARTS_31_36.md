# P2 Pack A Solve & Review — Parts 031–036

**Reviewer:** Senior Management Accountant / CMA Part 2 Editor  
**Scope:** Items P2-A-287 through P2-A-351 (parts 031–036)  
**Date:** 2026-08-29  
**Method:** Independent solve from stem + choices only; two-pass recomputation for calculation items; then comparison against stored CorrectChoice, ExplanationCorrect, ExplanationWrong slots, and metadata.

---

## P2-A-289 — CorrectChoice contradicts ExplanationCorrect and contains arithmetic error
- Check: solve-mismatch / explanation
- Severity: Critical
- Evidence: Stored CorrectChoice is **A**, which states "the 12% ROE implies the **9.60% SGR** is the correct self-funded ceiling, and the **debt raise is irrelevant**." The stem gives ROE 12%, payout 50% (retention 0.50), multiplier 1.80. The classic textbook SGR = ROE × retention = 0.12 × 0.50 = **6.00%** (current) or 0.12 × 0.60 = **7.20%** after the payout cut. The value 9.60% is not derivable from any standard SGR formula with these inputs (0.12 × 0.80 would require an 80% retention / 20% payout, which is not in the stem). Furthermore, the ExplanationCorrect explicitly states the self-funded pace is **7.20%** and that the debt raise **does** matter ("Incorporating the disclosed capital-structure shift … lifts the pro-forma pace further toward 10.50%–10.80%"), directly contradicting Choice A's claim that the debt raise is irrelevant. The explanation's concluding instruction — "present 7.20% as the leverage-constant self-funded pace and flag the extra leverage-driven increment" — matches no choice cleanly and certainly not A.
- Proposed fix: Revise Choice A to read approximately: "Moving the payout from 50% to 40% lifts retention from 0.50 to 0.60, so the leverage-constant self-funded ceiling moves from 6.00% to **7.20%**; the further rise toward 10.50%–10.80% is **leverage-driven**, so the debt raise is **not** irrelevant." Then set CorrectChoice to the letter matching that corrected text, and align ExplanationCorrect to derive 7.20% explicitly. Alternatively, if the intent is to keep the current choice set, the CorrectChoice field should be re-evaluated against the explanation's actual conclusion (7.20% self-funded + leverage increment), but note that no existing choice states both parts correctly — Choice C has the 7.20% but wrongly denies the leverage effect, and Choice D presents the financing-enabled 10.50%–10.80% as the answer, which the explanation itself labels "the common trap."
- Confidence: High

---

## P2-A-336 — ExplanationWrongA is a misassigned copy-paste from a different item
- Check: explanation / structural
- Severity: High
- Evidence: P2-A-336 is a cash-flow item (indirect method; Flash Retail / Ben Carter). Choice A states "Operations $970,000 and investing $85,000 overstate operations by adding $35,000 gain instead of subtracting." The stored ExplanationWrongA reads: "Choice A **omits beginning inventory from the average**; the correct average ($420,000 plus $480,000)/2 equals $450,000 not $480,000, so **38.5% and 5.25 misstate profitability under ASC 330** with a distinct averaging trap." This text is verbatim identical to P2-A-326's ExplanationWrongB (a gross-margin/inventory-turnover item). It describes inventory averaging and gross-margin percentages — concepts that have no connection to P2-A-336 Choice A, which is about adding a gain to operating cash flow. A student reading this explanation would learn nothing about why Choice A is wrong.
- Proposed fix: Replace ExplanationWrongA with text that refutes the actual error in P2-A-336 Choice A, e.g.: "Choice A adds the $35,000 gain on sale to operating cash flow instead of subtracting it; the gain is a non-operating item whose cash effect belongs in investing activities, so adding it inside operations double-counts the gain's benefit and overstates CFO by $70,000 versus the correct $1,080,000."
- Confidence: High

---

## P2-A-307 — ExplanationCorrect contains internal arithmetic contradiction
- Check: explanation
- Severity: Medium
- Evidence: The item applies the ASC 606 variable-consideration constraint to a $5,000,000 base + $200,000 bonus (70%) − $100,000 penalty (30%). Expected value = $5,110,000. The ExplanationCorrect states: "The constrained estimate is **4,900,000**, which reflects the base amount (5,000,000) reduced by the probability-weighted downside (0.30 × 100,000 = **30,000**) to **4,970,000**." This sentence asserts 4,900,000 = 5,000,000 − 30,000 = 4,970,000, which is arithmetically false (5,000,000 − 30,000 = 4,970,000 ≠ 4,900,000). The explanation conflates two different constrained amounts — a probability-weighted reduction (→ 4,970,000) and a full-penalty reduction (→ 4,900,000) — into a single incoherent sentence.
- Proposed fix: Rewrite the relevant sentence for clarity, e.g.: "A probability-weighted constraint reduces the base by the expected penalty (0.30 × 100,000 = 30,000) to 4,970,000; the answer 4,900,000 reflects a still stricter interpretation that constrains to the minimum (base minus the full $100,000 penalty) because the binary outcome makes any amount above the floor not highly probable."
- Confidence: High

---

## P2-A-350 — CorrectChoice D contains numerical errors (formula does not match stated result)
- Check: solve-mismatch / explanation
- Severity: Medium
- Evidence: The item asks for an adjusted operating margin excluding a nonrecurring $120,000 restructuring charge. Correct computation: Gross = 6,800,000 − 4,080,000 = 2,720,000; recurring SG&A = 1,360,000 − 120,000 = 1,240,000; operating income = 2,720,000 − 1,240,000 − 340,000 = **1,140,000**; margin = 1,140,000 / 6,800,000 = **16.76%**. Choice D states "adjusted operating income **$1,160,000**" and margin "**17.06%**," and embeds the formula "(($6,800,000−$4,080,000−$1,240,000−$340,000)/$6,800,000)" — but that formula evaluates to **1,140,000 (16.76%)**, not 1,160,000 (17.06%). The ExplanationCorrect acknowledges the discrepancy ("The choice states $1,160,000 for 17.06% – we adjust to $1,160,000 to match choice D text") but papers over it rather than correcting it. The $20,000 gap between the formula's result (1,140,000) and the stated result (1,160,000) is unexplained.
- Proposed fix: Correct Choice D's stated operating income to **$1,140,000** and margin to **16.76%** (or 16.8%), and update ExplanationCorrect to derive 1,140,000 cleanly: "Gross $2,720,000 − recurring SG&A $1,240,000 − research $340,000 = $1,140,000; $1,140,000 / $6,800,000 = 16.76%."
- Confidence: High

---

## P2-A-295 — TIE rounding discrepancy (2.73 vs 2.74)
- Check: solve-mismatch
- Severity: Low
- Evidence: EBIT $1,200,000; pro-forma interest = 350,000 + (1,100,000 × 8%) = 350,000 + 88,000 = 438,000. TIE = 1,200,000 / 438,000 = **2.739726…**, which rounds to **2.74** (to two decimals). Choice D states **2.73**. The ExplanationCorrect notes "2.74 times, rounded to 2.73 times on the precise exhibit quotient," but 2.7397 is closer to 2.74 than 2.73. The difference is small (≈0.01) and does not change the compliance conclusion, but the stated figure is technically the less accurate rounding.
- Proposed fix: Change Choice D's TIE to **2.74 times** and update the explanation's rounding language accordingly, or explicitly state the exhibit truncates rather than rounds.
- Confidence: High

---

## P2-A-334 — ExplanationCorrect uses incorrect combined-revenue and profit-threshold figures
- Check: explanation
- Severity: Low
- Evidence: For the ASC 280 segment-reportability test, combined revenue (including intersegment) = 1,800,000+200,000 + 900,000+150,000 + 400,000+50,000 = **3,500,000** (10% = 350,000). The ExplanationCorrect states "Combined revenue with intersegment **$3,250,000**, 10% **$325,000**" — an arithmetic error (off by $250,000). Separately, the profit threshold should be 10% of combined profit of profitable segments = 10% × (280,000+95,000) = **37,500**, but the explanation states **$33,500** (which is 10% of consolidated profit $335,000, not combined segment profit). Neither error changes the final conclusion (Segments A and B reportable, C not; 87% coverage), so the defect is confined to the explanation's intermediate arithmetic.
- Proposed fix: Correct the explanation to "Combined revenue with intersegment **$3,500,000**, 10% **$350,000**" and "Profit threshold **$37,500**." The conclusion (A and B reportable, C fails the asset test at $300,000 < $340,000, 87% coverage) remains unchanged and correct.
- Confidence: High

---

## P2-A-351 — Item truncated in source file; cannot review
- Check: structural
- Severity: High (item-level)
- Evidence: The source file `pack_p2_a.part036.js` ends at line 506. P2-A-351 contains only `"QuestionID": "P2-A-351"` and `"question_state": "Certified"` — no Stem, Choices, CorrectChoice, or explanations are present. The item is incomplete and was excluded from this review.
- Proposed fix: Re-extract P2-A-351 from the source pack data so it can be reviewed; flag to the pack maintainer that the serialization truncated the final item.
- Confidence: High

---

## Mini-summary

| Severity | Count | Items |
|----------|-------|-------|
| Critical | 1 | P2-A-289 |
| High | 2 | P2-A-336, P2-A-351 (truncated) |
| Medium | 2 | P2-A-307, P2-A-350 |
| Low | 2 | P2-A-295, P2-A-334 |
| Informational | 1 | "isis" stem typo (see below) |

**Items reviewed:** 64 fully reviewable (P2-A-287 → P2-A-350)  
**Clean items (no defect):** 58  
**Defects found:** 6 (across 6 items) + 1 truncated item

### Informational note — systematic stem typo "isis"
Across parts 034–036 (13 occurrences), several stems contain the stray token "isis" inserted between the protagonist's title and verb, e.g. "Controller Mariela Hoffmann **isis** analyzing," "CFO Adaeze Onuorah **isis** reviewing," "Treasurer Elena Rossi **isis** estimating." This appears to be a duplicated "is" → "isis" artifact. It does not affect answerability or the correctness of any stored answer, but it is a copy-editing quality issue worth cleaning in the next revision pass. No individual defect block is raised because it does not constitute a content or structural defect under the review criteria.

### Verification notes
- All non-key ExplanationWrong slots were confirmed present and ≥50 chars for the items reviewed (the one exception, P2-A-336 EW[A], is flagged above for being misassigned rather than short).
- All QIDs conform to P2-A-NNN.
- All Part2OnlyFlag values are boolean `true`.
- ExplanationWrong[CorrectChoice] is `""` for every item (verified across all 64).
- Calculation items were recomputed by two independent paths; the only items where the stored numeric result diverged from my recomputation are P2-A-289 (Critical), P2-A-295 (Low), and P2-A-350 (Medium), all flagged above.
