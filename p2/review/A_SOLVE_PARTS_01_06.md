# P2 Pack A Solve-and-Review: Parts 001–006 (P2-A-001 through P2-A-034)

Reviewed by independent solve-and-review. All 34 items solved from stem + choices alone before comparing to stored CorrectChoice. Calculations recomputed by two independent paths.

---

## [P2-A-004] — CCC day count internal contradiction (stem says 7 days, explanation says 11)
- Check: explanation
- Severity: Medium
- Evidence: Stem states "the cash conversion cycle lengthened from 64 to 71 days" (71 − 64 = 7 days). ExplanationCorrect states "The 11-day CCC deterioration (64 to 71 days)" and choice C itself states "The 11-day CCC deterioration ($7M in additional working capital tied up for 11 more days of the operating cycle)." The parenthetical "(64 to 71 days)" explicitly ties the 11-day claim to the 64→71 change, which is arithmetically 7 days, not 11. DIO change (95→105) is 10 days, also not 11. The VerifiedChecks also repeat "CCC +11 days," confirming the error is embedded throughout.
- Proposed fix: In ExplanationCorrect, change "The 11-day CCC deterioration (64 to 71 days)" to "The 7-day CCC deterioration (64 to 71 days)." In choice C, change "The 11-day CCC deterioration ($7M in additional working capital tied up for 11 more days of the operating cycle)" to "The 7-day CCC deterioration ($7M in additional working capital tied up for 7 more days of the operating cycle)." Update VerifiedChecks accordingly.
- Confidence: High

---

## [P2-A-008] — VerifiedChecks text references wrong choice letter
- Check: structural
- Severity: Low
- Evidence: VerifiedChecks[5] states "B correctly identifies structural impairment and refinancing risk" but CorrectChoice is D. Choice B in this item argues TIE is less informative than fixed-charge coverage — it does NOT identify structural impairment or refinancing risk. Choice D does. The VerifiedChecks text is inconsistent with the CorrectChoice field.
- Proposed fix: Change VerifiedChecks[5] from "B correctly identifies structural impairment and refinancing risk" to "D correctly identifies structural impairment and refinancing risk."
- Confidence: High

---

## [P2-A-009] — ExplanationWrongB conflates two distinct errors producing different ratios
- Check: explanation
- Severity: Medium
- Evidence: ExplanationWrongB states "$2.52 results from omitting the tax-adjusted preferred dividends from the denominator" — omitting preferred dividends entirely (denominator = $1.2M + $0.8M + $0.5M = $2.5M; ratio = $6.3M/$2.5M = 2.52×) is correct. But the explanation then states "Failing to gross up preferred dividends understates the total fixed-charge burden by $133,333 and produces an overstated ratio." Failing to gross up means using $400K instead of $533K, giving denominator = $2.9M and ratio = $6.3M/$2.9M = 2.17× — NOT 2.52×. The explanation conflates two different errors (complete omission vs. failure to gross-up) that produce two different ratios (2.52× vs. 2.17×), creating an internal contradiction.
- Proposed fix: Replace the final sentence of ExplanationWrongB with: "Omitting preferred dividends entirely from the denominator understates the total fixed-charge burden by $533,333 and produces a misleadingly favorable 2.52× ratio that does not reflect the full economic burden of Apex's obligations." Keep the gross-up explanation in the middle sentences as context for why the tax-adjusted amount matters.
- Confidence: High

---

## [P2-A-012] — VerifiedChecks text references wrong choice letter
- Check: structural
- Severity: Low
- Evidence: VerifiedChecks[4] states "Stored CorrectChoice B matches" but CorrectChoice is D. The independent derivation in the same VerifiedChecks entry correctly computes a net loss of ~$254,000, which matches choice D, not B. The "Stored CorrectChoice B matches" text is inconsistent with the CorrectChoice field.
- Proposed fix: Change VerifiedChecks[4] from "Stored CorrectChoice B matches" to "Stored CorrectChoice D matches."
- Confidence: High

---

## [P2-A-018] — VerifiedChecks text references wrong choice letter
- Check: structural
- Severity: Low
- Evidence: VerifiedChecks[0] states "EW[CC=B] empty (DL-008 compliant)" but CorrectChoice is D. The empty ExplanationWrong slot should be ExplanationWrongD, not ExplanationWrongB. The VerifiedChecks text is inconsistent with the CorrectChoice field.
- Proposed fix: Change VerifiedChecks[0] from "EW[CC=B] empty (DL-008 compliant)" to "EW[CC=D] empty (DL-008 compliant)."
- Confidence: High

---

## Mini-Summary

| Metric | Count |
|--------|-------|
| Items reviewed | 34 (P2-A-001 through P2-A-034) |
| Items with defects | 5 |
| Clean items | 29 |
| **Defects by severity** | |
| Critical | 0 |
| High | 0 |
| Medium | 2 (P2-A-004, P2-A-009) |
| Low | 3 (P2-A-008, P2-A-012, P2-A-018) |
| Informational | 0 |

**Solve-match outcome:** All 34 items — derived answer matches stored CorrectChoice. No solve-mismatch defects.

**Nature of defects:** Both Medium-severity defects are internal contradictions within explanation text (one arithmetical, one logical conflation). All three Low-severity defects are VerifiedChecks metadata referencing a wrong choice letter (B instead of D) — likely residual from a position-rotation operation that updated CorrectChoice but left stale references in VerifiedChecks. None of the defects change the correct answer or make a wrong choice appear correct.
