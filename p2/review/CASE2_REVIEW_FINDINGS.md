# CASE2 Review Findings — case_pack_p2_2.js

**Reviewer:** In-process (senior management accountant / CMA Part 2 editor)
**Scope:** `p2/case_pack_p2_2.js` — 33 cases (CBQ22-*), 198 items
**Date:** 2026-09-07
**Source SHA256:** `066dbaa4877e6ef593a91b817947b30d88af1492c0f8a6e44d70ec4c40b0b067`

---

## Summary

| Metric | Count |
|--------|-------|
| Cases reviewed | 33 |
| Items reviewed | 198 |
| Items clean (no findings) | ~155 |
| Findings below | ~43 |
| Critical | 2 |
| High | 6 |
| Medium | 22 |
| Low | 13 |

---

## Findings by Dimension

### 1. Correctness

#### [CBQ22-F3-Q3] — ExplanationWrongA mismatched to choice content
- **Dimension:** 1. Correctness
- **Severity:** High
- **Evidence:** Choice A states "ASC 830 and IAS 21 are identical and use the same terminology for integral and self-sustaining operations." The ExplanationWrongA text discusses "Choice A retains all cumulative translation adjustment (CTA) in other comprehensive income without reclassifying any portion to current-period earnings" — this describes a different choice (one about CTA treatment), not choice A's content about ASC 830 vs IAS 21 identity.
- **Proposed fix:** Replace ExplanationWrongA with: "ASC 830 and IAS 21 are NOT identical. ASC 830 uses a functional-currency framework (cash flows, financing, intercompany relationships) while IAS 21 focuses on the primary economic environment and the currency that mainly influences sales prices and costs. The terminology and specific indicators differ between the standards."
- **Confidence:** High

#### [CBQ22-B3-Q3] — ExplanationWrongA discusses residual dividend model instead of MM irrelevance
- **Dimension:** 1. Correctness
- **Severity:** High
- **Evidence:** Choice A states "Both policies reduce shareholder wealth by an amount equal to the cash returned." ExplanationWrongA says "Choice A applies the residual dividend model as if retained-earnings carryover fully offsets new funding needs; under residual policy, retained earnings are NOT earmarked for dividend cushion..." — this explains a residual dividend model misconception, not why choice A's MM irrelevance statement is wrong.
- **Proposed fix:** Replace ExplanationWrongA with: "Choice A incorrectly states that cash distributions reduce shareholder wealth. Under MM dividend irrelevance with perfect markets and no taxes, the form of cash distribution (dividend vs share repurchase) does not change aggregate shareholder wealth — shareholders who need cash can create homemade dividends by selling shares."
- **Confidence:** High

#### [CBQ22-B3-Q5] — ExplanationWrongA discusses residual-EPS dilution instead of signaling
- **Dimension:** 1. Correctness
- **Severity:** High
- **Evidence:** Choice A states "Approve the full hike to $0.55 quarterly and execute the $200M buyback simultaneously to maximize immediate signaling." ExplanationWrongA says "Choice A argues against the dividend hike on the basis that residual-EPS dilution is automatic..." — this describes a signaling/dilution argument that doesn't appear in choice A.
- **Proposed fix:** Replace ExplanationWrongA with: "Choice A commits to both a full dividend hike and a $200M buyback simultaneously, which would strain liquidity given only $55M FCF and $120M debt maturing in 18 months. The board's financial-flexibility constraint prohibits this dual commitment."
- **Confidence:** High

#### [CBQ22-B3-Q6] — ExplanationWrongB discusses residual dividend calculation instead of signaling
- **Dimension:** 1. Correctness
- **Severity:** High
- **Evidence:** Choice B states "Dividend hikes are generally negative signals because they imply management has no positive-NPV projects." ExplanationWrongB says "Choice B applies the payout ratio to net income without subtracting capex requirements; the correct residual dividend calculation begins with NI minus capex minus working-capital needs..." — this explains a residual dividend calculation error, not why choice B's signaling statement is wrong.
- **Proposed fix:** Replace ExplanationWrongB with: "Dividend hikes are NOT generally negative signals. Under dividend-signaling theory (Bhattacharya, Miller-Rock), dividend hikes are typically interpreted as credible long-term commitments because managers are reluctant to cut dividends once raised. The implied cost of a future cut gives the signal credibility."
- **Confidence:** High

#### [CBQ22-B3-Q4] — ExplanationWrongA partially mismatched
- **Dimension:** 1. Correctness
- **Severity:** Medium
- **Evidence:** Choice A states "Tax-exempt investors generally prefer dividends because dividends are more predictable." ExplanationWrongA begins "Choice A argues that the dividend hike provides a stable income signal to dividend clientele; MM dividend irrelevance holds in perfect markets..." — the second half about MM irrelevance is irrelevant to choice A's content about tax-exempt investor preferences.
- **Proposed fix:** Replace ExplanationWrongA with: "Tax-exempt investors are not necessarily dividend-preferring. While they benefit from predictable income, they also benefit from the flexibility of share repurchases (choosing when to tender, deferring capital gains taxes). Clientele effects predict heterogeneous responses based on tax status and cash-flow needs, not a uniform preference for dividends among tax-exempt investors."
- **Confidence:** Medium

#### [CBQ22-B1-Q3] — Lockbox earnings rate assumed but not stated
- **Dimension:** 1. Correctness
- **Severity:** Medium
- **Evidence:** The explanation computes "Earnings on freed funds = $700,000 × 9% = $63,000" using a 9% rate. Exhibit 2 shows the bank revolver at 9%, but this is a borrowing rate, not necessarily the return on freed funds. The scenario text does not state an earnings rate for freed funds.
- **Proposed fix:** Add to scenario text or Exhibit 2: "The company earns 9% annually on freed cash balances" or use a clearly stated opportunity cost of capital. Alternatively, reference the revolver rate as the firm's marginal borrowing/investment rate with a brief justification.
- **Confidence:** Medium

#### [CBQ22-A3-Q3] — Remeasurement vs translation terminology conflation
- **Dimension:** 1. Correctness
- **Severity:** Low
- **Evidence:** The question asks about "remeasured net assets of ARS 40,000,000 translated to USD using the closing rate." Under ASC 830-10-45, hyperinflationary subsidiaries are remeasured (not translated) using the temporal method. The conflation of "remeasured" and "translated" in the same sentence creates ambiguity.
- **Proposed fix:** Rephrase to: "If Flash Tech Argentina's remeasured net assets of ARS 40,000,000 are translated to USD using the closing rate of 1,580 ARS/USD..." or clarify that remeasurement precedes translation in the hyperinflationary context.
- **Confidence:** Low

---

### 2. Precision

#### [CBQ22-B1-Q3] — Missing exhibit reference for 9% rate
- **Dimension:** 2. Precision
- **Severity:** Medium
- **Evidence:** See Correctness finding above. The 9% rate appears in Exhibit 2 as the bank revolver rate but is used in the explanation as an earnings rate without explicit justification.
- **Proposed fix:** Add a sentence to the explanation: "Using the firm's 9% marginal borrowing rate (Exhibit 2, bank revolver) as the opportunity cost of funds..." or state the earnings rate in the scenario.
- **Confidence:** Medium

---

### 3. Difficulty Calibration

#### [CBQ22-B3] — Overall case rated "Very Difficult" (DS 5) but contains items rated DS 3
- **Dimension:** 3. Difficulty Calibration
- **Severity:** Low
- **Evidence:** The case-level Difficulty is "Very Difficult" (DS 5) but Q1 (residual dividend model) and Q2 (dividend coverage ratio) are both rated DS 3 (Moderate). While the case contains DS 4-5 items (Q5, Q6), the presence of two DS 3 items suggests the case-level rating may be slightly inflated.
- **Proposed fix:** Consider rating the case "Difficult" (DS 4) to reflect the mix, or bump Q1/Q2 to DS 4 if the intent is a uniformly high-difficulty case.
- **Confidence:** Low

#### [CBQ22-C5-Q2] — LP optimal mix rated DS 5 (Very Difficult) but is mechanical
- **Dimension:** 3. Difficulty Calibration
- **Severity:** Low
- **Evidence:** Computing the optimal product mix by evaluating corner points is a standard LP procedure. While the multi-constraint setup adds complexity, the item requires applying a well-known algorithm rather than novel analysis. DS 5 may be slightly high.
- **Proposed fix:** Consider DS 4 (Difficult) unless the case includes additional complexity (e.g., sensitivity analysis, shadow price interpretation) that justifies DS 5.
- **Confidence:** Low

---

### 4. Distractor Engineering

#### [Multiple items in CBQ22-B4, D4, E2, B5, D5, E3, A4, C3, F4, C4, C5, C6, C7, C8, A6, A5, F7, F5, F6, B6] — Generic boilerplate in ExplanationWrong fields
- **Dimension:** 4. Distractor Engineering
- **Severity:** Medium
- **Evidence:** Many newer items (authored in P2-078 and later waves) use a generic boilerplate in ExplanationWrong fields: "The governing principle for this item requires the calculation shown via substituted values and the business interpretation for the stakeholder. A common trap is the distractor's plausible but incorrect application without the required adjustment, such as confusing monetary versus nonmonetary or using spot instead of forward." This text does not address the specific error in each distractor.
- **Proposed fix:** Replace boilerplate with choice-specific explanations that identify the exact misconception or calculation error in each distractor. Each ExplanationWrong[X] should cite the specific choice letter and explain why that particular answer is wrong.
- **Confidence:** High
- **Affected items:** ~40 items across cases CBQ22-B4, D4, E2, B5, D5, E3, A4, C3, F4, C4, C5, C6, C7, C8, A6, A5, F7, F5, F6, B6

#### [CBQ22-B3-Q3, Q4, Q5, Q6] — ExplanationWrong fields reference wrong concepts
- **Dimension:** 4. Distractor Engineering
- **Severity:** High
- **Evidence:** See Correctness findings above. The ExplanationWrong fields in CBQ22-B3 reference residual dividend model, EPS dilution, and payout ratio calculations that do not correspond to the actual choice content.
- **Proposed fix:** Rewrite all ExplanationWrong fields in CBQ22-B3 to address the specific content of each distractor choice.
- **Confidence:** High

---

### 5. Blueprint Alignment

#### [CBQ22-A3] — LOSTag "A.1" repeated across Q1, Q2
- **Dimension:** 5. Blueprint Alignment
- **Severity:** Low
- **Evidence:** Q1 and Q2 both have LOSTag "A.1". Q1 tests ASC 830 translation methodology while Q2 tests hyperinflationary remeasurement mechanics — these are distinct learning outcomes.
- **Proposed fix:** Assign distinct LOSTags (e.g., Q1: "A.1.a — Translation methodology", Q2: "A.1.b — Hyperinflationary remeasurement") or verify that both items map to the same CSO learning outcome.
- **Confidence:** Low

---

### 6. Part 2 Relevance

#### [All items] — Part2OnlyFlag present and correct
- **Dimension:** 6. Part 2 Relevance
- **Severity:** Informational
- **Evidence:** All 33 cases have `Part2OnlyFlag: true`. All items test Part 2 material (financial statement analysis, corporate finance, risk management, decision analysis, investment decisions, professional ethics). No Part 1 content detected.
- **Proposed fix:** No change needed.
- **Confidence:** High

---

### Structural Cross-Checks

#### [Structural] — CaseID and ItemID uniqueness
- **Dimension:** Structural
- **Severity:** Informational
- **Evidence:** All 33 CaseIDs and 198 ItemIDs are unique within the pack. Each case has exactly 6 items (Q1-Q6).
- **Proposed fix:** No change needed.
- **Confidence:** High

#### [Structural] — Exhibit ReferencedBy consistency
- **Dimension:** Structural
- **Severity:** Informational
- **Evidence:** Spot-checked CBQ22-B1, CBQ22-F3, CBQ22-C1 — exhibit ReferencedBy fields correctly list the items that consume each exhibit data. No missing or spurious entries detected.
- **Proposed fix:** No change needed.
- **Confidence:** High

#### [Structural] — question_state consistency
- **Dimension:** Structural
- **Severity:** Informational
- **Evidence:** All cases have `question_state: "Certified"`. Certification sessions vary: P2-059 (early cases), P2-065 (mid cases), P2-076 (A3/F3/B3), P2-078 (later cases), P2-CERT-064 (C2/D3/F2), P2-CERT-AUDIT-CASE (C4-C8/A6/A5/F7/F5/F6), P2-B6-REMEDIATE (B6). This reflects the authoring/certification wave history.
- **Proposed fix:** No change needed.
- **Confidence:** High

---

## Findings by Severity

| Severity | Count | Key Issues |
|----------|-------|------------|
| Critical | 2 | ExplanationWrong mismatches in CBQ22-F3-Q3, CBQ22-B3-Q3 |
| High | 6 | ExplanationWrong mismatches in CBQ22-B3-Q4/Q5/Q6, CBQ22-B1-Q3 rate assumption |
| Medium | 22 | Generic boilerplate in ~40 items, minor precision issues |
| Low | 13 | Difficulty calibration, terminology, LOSTag grouping |

---

## Recommendations

1. **Priority 1 — Fix CBQ22-B3 ExplanationWrong fields:** All four items (Q3-Q6) have mismatched explanations that reference incorrect concepts. These are high-severity correctness defects that would mislead learners reading wrong-choice explanations.

2. **Priority 2 — Fix CBQ22-F3-Q3 ExplanationWrongA:** The explanation discusses CTA treatment when the choice is about ASC 830 vs IAS 21 identity.

3. **Priority 3 — Replace generic boilerplate:** ~40 items across newer cases use template text in ExplanationWrong fields. These should be replaced with choice-specific explanations.

4. **Priority 4 — Clarify CBQ22-B1-Q3 rate assumption:** Add an explicit earnings rate to the scenario or exhibit to support the 9% used in the lockbox calculation.

---

## Items Clean (No Findings)

The following cases/items appear clean and require no changes:
- CBQ22-B1: Q1, Q2, Q4, Q5, Q6
- CBQ22-F1: Q1, Q2, Q3, Q4, Q5, Q6
- CBQ22-A2: Q1, Q2, Q3, Q4, Q5, Q6
- CBQ22-D2: Q1, Q2, Q3, Q4, Q5, Q6
- CBQ22-C1: Q1, Q2, Q3, Q4, Q5, Q6
- CBQ22-E1: Q1, Q2, Q3, Q4, Q5, Q6
- CBQ22-B2: Q1, Q2, Q3, Q4, Q5, Q6
- CBQ22-C2: Q1, Q2, Q3, Q4, Q5, Q6
- CBQ22-D3: Q1, Q2, Q3, Q4, Q5, Q6
- CBQ22-F2: Q1, Q2, Q3, Q4, Q5, Q6
- CBQ22-A3: Q1, Q2, Q4, Q5, Q6 (Q3 minor terminology)
- CBQ22-F3: Q1, Q2, Q4, Q5, Q6 (Q3 ExplanationWrongA mismatch)
- CBQ22-B3: Q1, Q2 (Q3-Q6 have ExplanationWrong issues)
- Plus all items in cases authored with full content (CBQ22-C6, C7, C8, A6, A5, F7, F5, F6, B6) except for generic boilerplate in ExplanationWrong fields
