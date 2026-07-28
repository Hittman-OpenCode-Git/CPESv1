# DL-013 Batch 2A Execution Report — Pack D Section A (Items 001–028)

**Date:** 2026-07-23
**Session:** Session 5 — Batch 2A execution
**Status:** COMPLETE
**Scope:** 28 items in `pack_d_corrected.js` — P1-AD-001 through P1-AD-028
**Defect:** DL-013 — template-generated boilerplate distractor explanations ("represents a plausible misconception...")

---

## 1. Backup

| Property | Value |
|----------|-------|
| Source file | `pack_d_corrected.js` |
| Backup file | `pack_d_corrected.js.bak-20260723120349` |
| Backup size | 1,894,898 bytes |
| Backup created | 2026-07-23 12:03:49 UTC |

---

## 2. Items Processed

### 2.1 Topic Groups

| Group | QIDs | Topic | ASC Reference | Items |
|-------|------|-------|---------------|-------|
| G1 | P1-AD-001–005 | Accounts receivable factoring without recourse | ASC 860 | 5 |
| G2 | P1-AD-006–010 | Capitalized interest on self-constructed assets | ASC 835-20 | 5 |
| G3 | P1-AD-011–015 | Statement of cash flows — financing activities | ASC 230 | 5 |
| G4 | P1-AD-016–020 | Revenue recognition — variable consideration (right of return) | ASC 606 | 5 |
| G5 | P1-AD-021–025 | Other comprehensive income — AFS debt securities | ASC 320 | 5 |
| G6 | P1-AD-026–028 | Asset retirement obligations | ASC 410 | 3 |
| **Total** | | | | **28** |

### 2.2 Fields Rewritten

| Metric | Count |
|--------|-------|
| Items processed | 28 |
| ExplanationWrong fields rewritten | 84 (3 per item × 28 items) |
| CorrectChoice slots verified empty | 28 (0 new DL-008) |
| Template text residual | 0 |
| Execution passes | 2 (first pass: AD-001–005 + AD-026–028 = 8 items; second pass: AD-006–025 = 20 items) |

### 2.3 Per-Item Changes

| QID | CorrectChoice | Slots Rewritten | Topic |
|-----|---------------|-----------------|-------|
| P1-AD-001 | A | B, C, D | AR factoring without recourse |
| P1-AD-002 | B | A, C, D | AR factoring without recourse |
| P1-AD-003 | C | A, B, D | AR factoring without recourse |
| P1-AD-004 | D | A, B, C | AR factoring without recourse |
| P1-AD-005 | A | B, C, D | AR factoring without recourse |
| P1-AD-006 | B | A, C, D | Capitalized interest — construction |
| P1-AD-007 | C | A, B, D | Capitalized interest — construction |
| P1-AD-008 | D | A, B, C | Capitalized interest — construction |
| P1-AD-009 | A | B, C, D | Capitalized interest — construction |
| P1-AD-010 | B | A, C, D | Capitalized interest — construction |
| P1-AD-011 | C | A, B, D | SCF — financing activities |
| P1-AD-012 | D | A, B, C | SCF — financing activities |
| P1-AD-013 | A | B, C, D | SCF — financing activities |
| P1-AD-014 | B | A, C, D | SCF — financing activities |
| P1-AD-015 | C | A, B, D | SCF — financing activities |
| P1-AD-016 | D | A, B, C | Revenue — variable consideration |
| P1-AD-017 | A | B, C, D | Revenue — variable consideration |
| P1-AD-018 | B | A, C, D | Revenue — variable consideration |
| P1-AD-019 | C | A, B, D | Revenue — variable consideration |
| P1-AD-020 | D | A, B, C | Revenue — variable consideration |
| P1-AD-021 | A | B, C, D | OCI — AFS debt securities |
| P1-AD-022 | B | A, C, D | OCI — AFS debt securities |
| P1-AD-023 | C | A, B, D | OCI — AFS debt securities |
| P1-AD-024 | D | A, B, C | OCI — AFS debt securities |
| P1-AD-025 | A | B, C, D | OCI — AFS debt securities |
| P1-AD-026 | B | A, C, D | Asset retirement obligation |
| P1-AD-027 | C | A, B, D | Asset retirement obligation |
| P1-AD-028 | D | A, B, C | Asset retirement obligation |

---

## 3. Explanation Diffs — Before/After (by Topic Group)

### Group 1: AR Factoring Without Recourse (ASC 860)

**Correct:** As a sale of receivables, removing them from the balance sheet and recognizing any loss on sale.

| Choice | After (all 5 items) |
|--------|---------------------|
| As a loan collateralized by receivables | `"This describes factoring WITH recourse, where the seller retains the risk of bad debts and the transaction is treated as a secured borrowing. In a WITHOUT-recourse factoring, the factor assumes the credit risk, and the transfer qualifies as a sale under ASC 860, removing the receivables."` |
| As a reduction of revenue for the period | `"Factoring is a financing transaction, not a revenue adjustment. The underlying revenue was already recognized when the sale occurred. Factoring converts receivables to cash; any difference is recognized as a financing loss, not a revenue reversal."` |
| As an increase to accounts payable | `"Accounts payable represents amounts owed to suppliers for goods or services. Factoring is a disposition of assets (receivables), not an incurrence of liabilities to trade creditors. The debit from factoring is to cash, and the credit removes receivables."` |

### Group 2: Capitalized Interest on Construction (ASC 835-20)

**Correct:** Capitalize the interest as part of the asset's cost during the construction period.

| Choice | After (all 5 items) |
|--------|---------------------|
| Expense all interest immediately | `"Under ASC 835-20, interest incurred during the construction of a qualifying asset must be capitalized — not expensed. Capitalization matches the borrowing cost to the future periods benefited by the asset. Immediate expensing understates the asset and overstates current-period expense."` |
| Record as a reduction of revenue | `"Construction-period interest is a cost of acquiring the asset, not an adjustment to revenue. Revenue is unaffected by how interest is classified. Capitalized interest is added to the asset's cost under ASC 835-20, not netted against sales."` |
| Defer interest indefinitely | `"Interest cannot be deferred indefinitely. Capitalized interest is amortized through depreciation of the completed asset over its useful life. Deferring it without recognition would misstate both the asset and depreciation expense."` |

### Group 3: Statement of Cash Flows — Financing (ASC 230)

**Correct:** As a financing activity.

| Choice | After (all 5 items) |
|--------|---------------------|
| As an investing activity | `"Investing activities involve acquiring or disposing of long-term assets and investments (e.g., purchasing PP&E, buying securities). Repaying a note payable is a financing activity because it relates to changes in the company's debt and equity capital structure, per ASC 230."` |
| As an operating activity | `"Principal repayments on borrowings are financing cash flows, not operating. Operating activities include transactions that enter into the determination of net income — such as cash from customers, payments to suppliers, and interest payments. Principal payments are excluded from operating, per ASC 230."` |
| As a noncash adjustment only | `"Repaying principal with cash IS a cash flow — it represents actual cash paid to creditors. Noncash adjustments are for items like depreciation, amortization, or stock dividends that do not involve cash. This is a genuine cash outflow, classified as financing under ASC 230."` |

### Group 4: Revenue — Variable Consideration (ASC 606)

**Correct:** Recognize revenue for the amount expected to be entitled to, net of an estimated returns allowance.

| Choice | After (all 5 items) |
|--------|---------------------|
| Recognize full sales amount without return adjustment | `"Under ASC 606, variable consideration — including expected returns — must be estimated and constrained. Recognizing revenue without deducting expected returns overstates revenue and understates the refund liability. The transaction price should reflect the amount the entity expects to be entitled to."` |
| Defer all revenue until return period expires | `"ASC 606 does NOT require waiting until the return period expires. Revenue is recognized when control transfers, but the transaction price is reduced to reflect the estimated returns. A refund liability is recorded, not a complete deferral of revenue recognition."` |
| Recognize revenue only for units definitely not returned | `"Uncertainty about returns affects the transaction price — not whether a contract exists. Under ASC 606, revenue is recognized for the estimated amount the entity expects to receive, with a corresponding refund liability for the expected returns. Estimating returns is preferable to failing to recognize revenue for probable non-returned units."` |

### Group 5: Other Comprehensive Income — AFS Securities (ASC 320)

**Correct:** In other comprehensive income, not in net income.

| Choice | After (all 5 items) |
|--------|---------------------|
| As a direct increase to retained earnings | `"Retained earnings reflects cumulative net income and dividends. OCI is presented separately as a component of accumulated other comprehensive income (AOCI) in equity. It does not bypass OCI and flow directly into retained earnings."` |
| As deferred revenue on the balance sheet | `"Deferred revenue represents cash received for goods or services not yet provided — it is a liability. Unrealized gains on AFS securities are not a customer prepayment. They are recognized in OCI, accumulated in AOCI within equity."` |
| In net income immediately | `"Under ASC 320, unrealized holding gains and losses on available-for-sale debt securities are reported in OTHER comprehensive income, not in net income. Only realized gains/losses (upon sale) and credit-related impairments affect net income. This keeps temporary market fluctuations out of earnings."` |

### Group 6: Asset Retirement Obligations (ASC 410)

**Correct:** Recognize a liability at the present value of estimated future costs, with an offsetting increase to the asset's carrying amount.

| Choice | After (all 3 items) |
|--------|---------------------|
| Expense the estimated future cost immediately in full | `"Under ASC 410 (Asset Retirement and Environmental Obligations), the future dismantlement cost is recognized at its PRESENT VALUE, not at the full future amount. The discounted value is capitalized as part of the asset's cost and amortized over its useful life."` |
| Record only in notes with no balance sheet recognition | `"ASC 410 requires balance sheet recognition of AROs. A legal obligation to dismantle and remove an asset creates a liability at the present value of estimated future costs. Footnote disclosure supplements but does NOT substitute for balance sheet recognition."` |
| Ignore the obligation until retirement | `"Accrual accounting requires recognition of obligations when incurred, not when settled. Under ASC 410, the asset retirement obligation is recognized when the legal obligation arises — typically at asset installation — not deferred until retirement."` |

---

## 4. Pre/Post Validator Baseline

| Metric | Pre-Write (Session Baseline) | Post-Write | Delta |
|--------|---------------------------|------------|-------|
| Module errors | 118 | **94** | **-24** |
| Total errors | 120 | **96** | **-24** |
| Module warnings | 1,675 | **1,234** | **-441** |
| Total warnings | 2,406 | **1,966** | **-440** |
| Validators passed | 1 | 1 | 0 |
| Validators warned | 5 | 5 | 0 |
| Validators failed | 2 | 2 | 0 |

**Note:** Validator improvement reflects combined effect of both Batch 1A and Batch 2A (120 template-bearing fields removed across 48 items eliminating false-positive hits in AbsoluteLanguageValidator and DistractorSimilarityValidator).

### DL-008 Post-Write Scan

| Check | Result |
|-------|--------|
| Pack D total DL-008 hits (pre-existing) | 98 (unchanged — all in non-Section-A items: sections B/C/D/E/F) |
| Pack D Section A DL-008 (target items) | **0** — all CorrectChoice slots confirmed empty |
| New DL-008 introduced by rewrite | **0** |

### Template Residual Scan

| Check | Result |
|-------|--------|
| "represents a plausible misconception" in any target item | **0** |
| "A candidate may select this option by misapplying" in any target item | **0** |

---

## 5. Governance Guard Compliance

| Rule | Status | Notes |
|------|--------|-------|
| Rule 2 (DL-008 BLOCK) | Not triggered | No CorrectChoice explanation slot modified; all confirmed empty |
| Rule 3 (MASTER_QUESTION_REGISTRY) | N/A | Registry not hand-edited |
| Rule 5 (30-item cap) | Compliant | 28 items processed (right at cap) |
| Rule 1 (question_state changes) | N/A | No question_state changes |
| Rule 4 (answer-key changes) | N/A | No CorrectChoice or Correct changes |

---

## 6. Stop Condition Check

| Condition | Status |
|-----------|--------|
| Ambiguous judgment calls requiring guesswork | **None** — all 6 topic groups have clear, non-ambiguous correct answers governed by specific ASC sections (ASC 860, 835-20, 230, 606, 320, 410) |
| Two-pass execution issue | **Resolved** — first pass incorrectly assumed Pack D clone-group topics matched Pack C (bond discount, HtM, lease, goodwill). Second pass corrected with actual Pack D topics extracted from stems (capitalized interest, cash flows, variable consideration, OCI). 20 items re-processed with correct explanations. |
| New DL-008 introduced | **None** |
| Template text residual | **None** |
| Pack A write conflict | **None** — `pack_a_corrected.js` not touched |

**Batch 2A STOP CONDITIONS: ALL CLEAR.** No halt triggered.

---

## 7. Files Modified

| File | Change | Lines Affected |
|------|--------|---------------|
| `pack_d_corrected.js` | 84 ExplanationWrong field values rewritten; array re-serialized twice (2-pass execution) | P1-AD-001–028 |
| `pack_d_corrected.js` size | 1,894,898 → 2,011,391 bytes (+116,493 bytes from expanded explanation text) |

---

## 8. Parallel Execution Notes

Batch 1A (Pack C, 20 items) and Batch 2A (Pack D, 28 items) executed in parallel in the same node process:
- **File-level isolation confirmed** — Pack C and Pack D are independent files; zero cross-contamination
- **Topic-group corrections** — Pack D second pass required after first-pass topic assumptions were disproven by direct stem reading. The 8 items from the first pass (AD-001–005, AD-026–028) were correctly matched on the first attempt and not re-modified.
- **Pack A isolation** — Neither pack_a_corrected.js nor any scored_cases file was read or modified.

---

## 9. Cross-References

| Document | Relationship |
|----------|-------------|
| `knowledge/DEFECT_LIBRARY.md` §DL-013 | Formal defect definition |
| `reports/DL013_REMEDIATION_PROPOSAL.md` | 6-batch remediation plan (this is Batch 2A) |
| `reports/DL013_BATCH1A_EXECUTION_REPORT.md` | Batch 1A report (Pack C, completed in parallel) |
| `pack_d_corrected.js.bak-20260723120349` | Pre-write backup |
| `reports/DL008_FULL_POOL_SWEEP_2026-07-23.md` | DL-008 baseline — confirmed 0 overlap in Section A |

---

*Execution completed 2026-07-23. Batch 2A: 28 items, 84 fields, 0 errors, 0 template residual. 2-pass execution resolved topic-mapping error.*
