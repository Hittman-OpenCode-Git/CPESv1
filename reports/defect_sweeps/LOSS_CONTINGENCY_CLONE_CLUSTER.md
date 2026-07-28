# Clone Cluster Analysis: Loss Contingency Range Disclosure Series

**Date:** 2026-07-22
**Scope:** P1-A-034, P1-A-044, P1-A-054, P1-A-064, P1-A-074
**Topic:** Loss contingency — probable warranty loss, best estimate + additional disclosure

---

## Side-by-Side Comparison

| Element | P1-A-034 | P1-A-044 | P1-A-054 | P1-A-064 | P1-A-074 |
|---------|----------|----------|----------|----------|----------|
| **Company** | Zephyr | Juniper | Titan | Evergreen | Orion |
| **Best estimate** | $50,800 | $62,800 | $74,800 | $86,800 | $98,800 |
| **Range extends to** | $106,200 | $124,200 | $142,200 | $160,200 | $178,200 |
| **Difficulty** | Easy | Easy | Moderate | Moderate | Easy |
| **CorrectChoice** | D | D | D | A | C |
| **Choice A** | Record nothing because warranties are estimates | Record nothing because warranties are estimates | Record nothing because warranties are estimates | Accrue the best estimate and disclose the additional exposure if material | Record nothing because warranties are estimates |
| **Choice B** | Recognize the loss only when customers file claims | Accrue $124,200 because it is the highest possible amount | Recognize the loss only when customers file claims | Accrue $160,200 because it is the highest possible amount | Accrue $178,200 because it is the highest possible amount |
| **Choice C** | Accrue $106,200 because it is the highest possible amount | Recognize the loss only when customers file claims | Accrue $142,200 because it is the highest possible amount | Recognize the loss only when customers file claims | Accrue the best estimate and disclose the additional exposure if material |
| **Choice D** | Accrue the best estimate and disclose the additional exposure if material | Accrue the best estimate and disclose the additional exposure if material | Accrue the best estimate and disclose the additional exposure if material | Record nothing because warranties are estimates | Recognize the loss only when customers file claims |

### Full Stem

| QID | Stem |
|-----|------|
| **034** | Zephyr faces a probable warranty loss. The best estimate is $50,800, and the reasonably possible range extends to $106,200. Which response is most appropriate? |
| **044** | Juniper faces a probable warranty loss. The best estimate is $62,800, and the reasonably possible range extends to $124,200. Which response is most appropriate? |
| **054** | Titan faces a probable warranty loss. The best estimate is $74,800, and the reasonably possible range extends to $142,200. Which response is most appropriate? |
| **064** | Evergreen faces a probable warranty loss. The best estimate is $86,800, and the reasonably possible range extends to $160,200. Which response is most appropriate? |
| **074** | Orion faces a probable warranty loss. The best estimate is $98,800, and the reasonably possible range extends to $178,200. Which response is most appropriate? |

### ExplanationCorrect

| QID | ExplanationCorrect |
|-----|-------------------|
| **034** | A probable and estimable warranty loss is accrued; additional exposure may require disclosure. |
| **044** | A probable and estimable warranty loss is accrued; additional exposure may require disclosure. |
| **054** | A probable and estimable warranty loss is accrued; additional exposure may require disclosure. |
| **064** | A probable and estimable warranty loss is accrued; additional exposure may require disclosure. |
| **074** | A probable and estimable warranty loss is accrued; additional exposure may require disclosure. |

---

## Structural Comparison

### What varies between QIDs

| Attribute | Variation |
|-----------|-----------|
| Company name | Zephyr → Juniper → Titan → Evergreen → Orion (different each time) |
| Best estimate (low) | $50,800 → $62,800 → $74,800 → $86,800 → $98,800 (increments of ~$12,000) |
| Range ceiling (high) | $106,200 → $124,200 → $142,200 → $160,200 → $178,200 (always ~2.1× best estimate) |
| Choice order | Shuffled in 064 (correct answer moves to ChoiceA) and 074 (correct answer moves to ChoiceC) |
| Difficulty label | Easy (034, 044, 074) vs Moderate (054, 064) — appears arbitrary |

### What is identical across all five

| Attribute | Status |
|-----------|--------|
| Scenario type | Probable warranty loss with best estimate + range |
| Correct answer logic | Accrue best estimate, disclose additional exposure |
| Distractor types | (1) record nothing for estimates, (2) recognize only on claim, (3) accrue maximum |
| Distractor order pattern | Appears in different positions but uses same three misconceptions |
| ExplanationCorrect | **Identical verbatim** across all five QIDs |
| Distractor explanations | DL-007 templates — identical language with option letter swapped |
| Topic label pattern | `loss contingency range disclosure [N]` where N increments by 10 |
| LOSTag | All A.2 |
| ASC reference | All ASC 450 |

---

## Classification

**Finding:** These are mechanical variants with different numbers and company names, not meaningfully distinct scenarios.

The series follows a repetitive pattern:
- Stem template: `[Company] faces a probable warranty loss. The best estimate is $[X], and the reasonably possible range extends to $[Y].`
- The numbers follow a linear progression (low: +12,000 per step; high: +18,000 per step)
- The three distractor types never change — only their position (choice letter) varies
- The correct answer explanation is identical across all five
- The "variation" in choice ordering (064/074 shuffles) does not create a different question

Compare to the accounting-equity-equation cluster (P1-A-036/046/056/066): that cluster uses the same structural pattern but the equity-equation calculation (`assets − liabilities = equity`) produces genuinely different numerical answers each time. The loss-contingency cluster, however, tests the single binary rule "accrue best estimate vs. accrue maximum vs. do nothing" — a rule that does not depend on the specific dollar amount.

### Practical impact on the learner

A student who correctly answers P1-A-034 will correctly answer all five, because:
1. The rule tested is identical
2. The distractors are the same three misconceptions
3. The numbers are irrelevant to the correct answer logic (the rule is about how to accrue, not a calculation)

This is distinguishable from the equity-equation cluster where each question requires a different arithmetic computation with a unique correct numerical answer.

---

## Recommendation

**Keep 2–3, archive the weakest.**

| Option | Pros | Cons |
|--------|------|------|
| **Keep all 5** | No content loss; maximum fluency practice | ~80% redundancy; inflates question count; candidates who learn the rule waste time on clones |
| **Keep 3** (034, 054, 074) | Spreads across Easy/Moderate/Easy; preserves ~10-number gap between each | Still some redundancy in stem structure |
| **Keep 2** (034 as anchor, 064 with shuffled order) | Tests same concept at two difficulty levels; order-shuffle adds mild cognitive load | Loses fluency repetition; may under-serve ASC 450 practice |

**Recommended: Keep 3 (034, 054, 074).**
- 034: Easy anchor (seed — already DL-007 revised in Wave 3)
- 054: Moderate variant (changes choice ordering slightly to add cognitive load)
- 074: Easy variant (farthest number gap from 034)

Archive 044 and 064 to `_archive/` or retire them. If bundled question count matters, keep 044 as a 4th with a note to revise its stem to a different loss-contingency fact pattern (e.g., litigation, environmental, or self-insurance) rather than another warranty clone.

### Dependency note

If archived: standardize the remaining questions' `ExplanationCorrect` so they are not identical, and ensure the choice-order variation in 064/074 is preserved if kept. The `UniqueConceptKey` values (suffixed -9, -19, -29, -39, -49) should be re-keyed if archived.

---

## Action Items

1. **User decision required** before revising 044 or 054 (per pause point protocol)
2. If consolidate: run DL-007 fix on kept variants after decision
3. If keep all 5: apply consistent `ExplanationCorrect` across series with at least choice-specific ordering language to differentiate them
