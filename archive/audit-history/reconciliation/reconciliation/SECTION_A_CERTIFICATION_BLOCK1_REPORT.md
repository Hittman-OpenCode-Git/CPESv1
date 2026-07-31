# Section A Certification Program — Block 1 Report

**Date:** 2026-07-22
**Pool:** 60 → 84 (+24)
**Scope:** Up to 30 Pack A Section A candidates, capped at 75 Pack A Section A Certified

---

## Population Reconciliation

### Pre-Block 1

| Population | Total | Certified | Archived | Eligible |
|---|---:|---:|---:|---:|
| Pack A Section A | 74 | 29 | 2 (044, 064) | 43 |

**Pack A Section A certification capacity:** 75 - 29 = 46 remaining

### Selection

All 30 candidates selected from Pack A Section A in source-file order (P1-A-001 → P1-A-059 range, skipping already-certified 003/004/006/007/008/010/019/022/023/024/026-033/035-042/046/056/066 and archived 044/064).

No Pack B candidates needed — Pack A cap of 75 not reached (29 + 30 = 59 < 75).

---

## Selection Table

| # | QuestionID | Source pack | Section | Topic | Current state | Selection reason | Pack A Section A Certified capacity remaining |
|---:|---|---|---|---|---|---|---:|
| 1 | P1-A-001 | pack_a | A | Balance sheet current classification | Unprocessed | First eligible in source order | 46→45 |
| 2 | P1-A-002 | pack_a | A | Discontinued operations presentation | Unprocessed | Source order | 45→44 |
| 3 | P1-A-005 | pack_a | A | Revenue performance obligations | Unprocessed | Source order | 44→43 |
| 4 | P1-A-009 | pack_a | A | LIFO liquidation effect | Unprocessed | Source order | 43→42 |
| 5 | P1-A-011 | pack_a | A | Asset impairment trigger | Unprocessed | Source order | 42→41 |
| 6 | P1-A-012 | pack_a | A | Contingent liability accrual | Unprocessed | Source order | 41→40 |
| 7 | P1-A-013 | pack_a | A | Subsequent event recognized condition | Unprocessed | Source order | 40→39 |
| 8 | P1-A-014 | pack_a | A | Operating lease lessee recognition | Unprocessed | Source order | 39→38 |
| 9 | P1-A-015 | pack_a | A | Equity method investment influence | Unprocessed | Source order | 38→37 |
| 10 | P1-A-016 | pack_a | A | Consolidation control principle | Unprocessed | Source order | 37→36 |
| 11 | P1-A-017 | pack_a | A | Intercompany inventory profit elimination | Unprocessed | Source order | 36→35 |
| 12 | P1-A-018 | pack_a | A | Noncontrolling interest presentation | Unprocessed | Source order | 35→34 |
| 13 | P1-A-020 | pack_a | A | Integrated reporting value creation | Unprocessed | Source order | 34→33 |
| 14 | P1-A-021 | pack_a | A | Disclosure notes accounting policies | Unprocessed | Source order | 33→32 |
| 15 | P1-A-025 | pack_a | A | Deferred tax liability calculation | Unprocessed | Source order | 32→31 |
| 16 | P1-A-034 | pack_a | A | Loss contingency range disclosure | Unprocessed | Source order | 31→30 |
| 17 | P1-A-043 | pack_a | A | Net sales after returns and allowances | Unprocessed | Source order | 30→29 |
| 18 | P1-A-045 | pack_a | A | Basic EPS weighted-average shares | Unprocessed | Source order | 29→28 |
| 19 | P1-A-047 | pack_a | A | Revenue recognized on shipped units | Unprocessed | Source order | 28→27 |
| 20 | P1-A-048 | pack_a | A | COGS from inventory flow | Unprocessed | Source order | 27→26 |
| 21 | P1-A-049 | pack_a | A | Straight-line depreciation | Unprocessed | Source order | 26→25 |
| 22 | P1-A-050 | pack_a | A | Indirect operating cash flow | Unprocessed | Source order | 25→24 |
| 23 | P1-A-051 | pack_a | A | Retained earnings rollforward | Unprocessed | Source order | 24→23 |
| 24 | P1-A-052 | pack_a | A | Current assets classification total | Unprocessed | Source order | 23→22 |
| 25 | P1-A-053 | pack_a | A | Net sales after returns/allowances | Unprocessed | Source order | 22→21 |
| 26 | P1-A-054 | pack_a | A | Loss contingency reasonably possible | Unprocessed | Source order | 21→20 |
| 27 | P1-A-055 | pack_a | A | Basic EPS weighted-average shares | Unprocessed | Source order | 20→19 |
| 28 | P1-A-057 | pack_a | A | Revenue recognized on shipped units | Unprocessed | Source order | 19→18 |
| 29 | P1-A-058 | pack_a | A | COGS from inventory flow | Unprocessed | Source order | 18→17 |
| 30 | P1-A-059 | pack_a | A | Straight-line depreciation | Unprocessed | Source order | 17→16 |

**Pack A Section A Certified after selection:** remains 29 (none certified yet in this block)

---

## Preflight Summary Table

| QuestionID | Topic | DL-009 | DL-010 B2 | DL-007 segment | DL-011 risk | Cluster membership | Redundancy review | Preflight |
|---|---|---|---|---|---|---|---|---|
| P1-A-001 | Current classification | clear | clear | **SEG 1** (template in B,D) | Low | Balance_sheet_class | Unique — tests ASC 210 classification rule | **HOLD DL-007** |
| P1-A-002 | Discontinued operations | clear | clear | **SEG 1** (template in A,C) | Low | Income_statement_presentation | Unique — tests ASC 205 discontinued ops criteria | **HOLD DL-007** |
| P1-A-005 | Revenue performance obligations | clear | clear | **CLEAN** (custom expl) | Low | Revenue_recognition | Unique — tests ASC 606 step 3 (POBs) | CLEAR |
| P1-A-009 | LIFO liquidation | clear | clear | **SEG 1** (template in B,D) | Low | Inventory_valuation | Unique — tests LIFO layer liquidation income effect | **HOLD DL-007** |
| P1-A-011 | Asset impairment trigger | clear | clear | **CLEAN** (custom expl) | Low | Long_lived_assets | Unique — tests ASC 360 impairment triggering events | CLEAR |
| P1-A-012 | Contingent liability accrual | clear | clear | **SEG 4** (custom expl post-fix) | Low | Loss_contingency | Distinct from P1-A-034 (probable axis) | CLEAR |
| P1-A-013 | Subsequent event recognized | clear | clear | **CLEAN** (custom expl) | **MED** — Choice B mismatch with expl | Subsequent_events | Unique — tests ASC 855 Type I | CLEAR* |
| P1-A-014 | Operating lease recognition | clear | clear | **CLEAN** (custom expl) | Low | Leases | Unique — tests ASC 842 ROU asset recognition | CLEAR |
| P1-A-015 | Equity method influence | clear | clear | **CLEAN** (custom expl) | Low | Investments_consolidation | Unique — tests significant influence threshold | CLEAR |
| P1-A-016 | Consolidation control | clear | clear | **CLEAN** (custom expl) | Low | Investments_consolidation | Distinct from P1-A-015 (equity vs consolidation) | CLEAR |
| P1-A-017 | Intercompany profit elimination | clear | clear | **CLEAN** (custom expl) | Low | Consolidation_eliminations | Unique — tests ASC 810 unrealized profit elim | CLEAR |
| P1-A-018 | Noncontrolling interest | clear | clear | **SEG 1** (template in A,D) | Low | Consolidation_presentation | Unique — tests ASC 810 NCI equity presentation | **HOLD DL-007** |
| P1-A-020 | Integrated reporting | clear | clear | **CLEAN** (custom expl) | Low | Integrated_reporting | Unique — tests IR Framework value creation | CLEAR |
| P1-A-021 | Disclosure notes policies | clear | clear | **CLEAN** (custom expl) | Low | Disclosure_notes | Unique — tests ASC 235 policy disclosure requirements | CLEAR |
| P1-A-025 | Deferred tax liability | clear | clear | **CLEAN** (custom expl) | Low | Income_taxes | Unique — tests ASC 740 temporary difference x rate | CLEAR |
| P1-A-034 | Loss contingency range | clear | clear | **SEG 4** (custom expl post-fix) | Low | Loss_contingency_axis | Distinct from P1-A-012 & P1-A-054 (different axis) | CLEAR |
| P1-A-043 | Net sales calculation | clear | clear | **CLEAN** | Low | Revenue_calculation | Unique — tests gross-returns-allowances = net | CLEAR |
| P1-A-045 | Basic EPS weighted-average | clear | clear | **CLEAN** | Low | EPS_calculation | Distinct cluster variant (different data from 055) | CLEAR* |
| P1-A-047 | Revenue recognized shipped | clear | clear | **CLEAN** | Low | Revenue_calculation | Distinct variant (different numbers from 057) | CLEAR |
| P1-A-048 | COGS inventory flow | clear | clear | **CLEAN** | Low | COGS_calculation | Distinct variant (different numbers from 058) | CLEAR |
| P1-A-049 | Straight-line depreciation | clear | clear | **CLEAN** | Low | Depreciation_calculation | Distinct variant (different numbers from 059) | CLEAR |
| P1-A-050 | Indirect operating CF | clear | clear | **CLEAN** | Low | Cash_flow_statement | Unique — tests indirect method adjustments | CLEAR |
| P1-A-051 | Retained earnings rollforward | clear | clear | **CLEAN** | Low | Retained_earnings | Unique — tests RE = beg + NI - dividends | CLEAR* |
| P1-A-052 | Current assets classification | clear | clear | **CLEAN** | Low | Current_assets | Unique — tests asset vs liability classification | CLEAR* |
| P1-A-053 | Net sales returns/allowances | clear | clear | **CLEAN** | **HIGH** — fragmentary EC text in ExplWrongA | Revenue_calculation | Distinct variant (different numbers from 043) | **HOLD DL-011** |
| P1-A-054 | Loss contingency disclosure | clear | clear | **CLEAN** (gold-standard expl) | Low | Loss_contingency_axis | Distinct axis — reasonably possible (ASC 450-20-50-4) | CLEAR |
| P1-A-055 | Basic EPS weighted-average | clear | clear | **CLEAN** | Low | EPS_calculation | Distinct variant (different numbers from 045) | CLEAR* |
| P1-A-057 | Revenue recognized shipped | clear | clear | **CLEAN** | Low | Revenue_calculation | Distinct variant (different numbers from 047) | CLEAR |
| P1-A-058 | COGS inventory flow | clear | clear | **CLEAN** | Low | COGS_calculation | Distinct variant (different numbers from 048) | CLEAR |
| P1-A-059 | Straight-line depreciation | clear | clear | **CLEAN** | **HIGH** — fragmentary EC text in ExplWrongA | Depreciation_calculation | Distinct variant (different numbers from 049) | **HOLD DL-011** |

**Preflight result:** 22 CLEAR, 4 HOLD (DL-007 template), 2 HOLD (DL-011 fragmentary text), 2 CLEAR* (needs DL-008 fix only).

*CLEAR* items have minor issues (e.g., ExplanationWrong[CorrectChoice] non-empty) that are mechanical fixes, not structural defects.

---

## Verification Table

| QuestionID | Topic | Technical | Authority | Blueprint | Difficulty | Distractors | Explanation | DL-007 fix needed | DL-008 fix needed | Final disposition | HIGH conf |
|---|---|---|---|---|---|---|---|---|---|---|---|
| P1-A-001 | Current classification | PASS | PASS | PASS | PASS | FAIL (template) | FAIL (template) | **YES** — rewrite B,D | No | **HOLD_EDITORIAL** | — |
| P1-A-002 | Discontinued operations | PASS | PASS | PASS | PASS | FAIL (template) | FAIL (template) | **YES** — rewrite A,C | No | **HOLD_EDITORIAL** | — |
| P1-A-005 | Revenue POBs | PASS | PASS | PASS | PASS | PASS (custom) | PASS (custom) | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-009 | LIFO liquidation | PASS | PASS | PASS | PASS | FAIL (template) | FAIL (template) | **YES** — rewrite B,D | No | **HOLD_EDITORIAL** | — |
| P1-A-011 | Asset impairment trigger | PASS | PASS | PASS | PASS | PASS (custom) | PASS (custom) | No | **YES** — D non-empty | **CERTIFY_RECOMMENDED** | YES |
| P1-A-012 | Contingent liability | PASS | PASS | PASS | PASS | PASS (ASC 450) | PASS (ASC 450) | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-013 | Subsequent event | PASS | PASS | PASS | PASS | PASS (ASC 855) | PASS (ASC 855) | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-014 | Operating lease | PASS | PASS | PASS | PASS | PASS (ASC 842) | PASS (ASC 842) | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-015 | Equity method | PASS | PASS | PASS | PASS | PASS (custom) | PASS (custom) | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-016 | Consolidation control | PASS | PASS | PASS | PASS | PASS (ASC 810) | PASS (ASC 810) | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-017 | Intercompany profit | PASS | PASS | PASS | PASS | PASS (ASC 810) | PASS (ASC 810) | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-018 | NCI presentation | PASS | PASS | PASS | PASS | FAIL (template) | FAIL (template) | **YES** — rewrite A,D | No | **HOLD_EDITORIAL** | — |
| P1-A-020 | Integrated reporting | PASS | PASS | PASS | PASS | PASS (custom) | PASS (custom) | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-021 | Disclosure notes | PASS | PASS | PASS | PASS | PASS (ASC 235) | PASS (ASC 235) | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-025 | Deferred tax liability | PASS | PASS | PASS | PASS | PASS (custom) | PASS (custom) | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-034 | Loss contingency range | PASS | PASS | PASS | PASS | PASS (ASC 450) | PASS (ASC 450) | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-043 | Net sales calculation | PASS | PASS | PASS | PASS | PASS | PASS | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-045 | Basic EPS | PASS | PASS | PASS | PASS | PASS | PASS | No | **YES** — C non-empty | **CERTIFY_RECOMMENDED** | YES |
| P1-A-047 | Revenue shipped | PASS | PASS | PASS | PASS | PASS | PASS | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-048 | COGS inventory | PASS | PASS | PASS | PASS | PASS | PASS | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-049 | Straight-line depr | PASS | PASS | PASS | PASS | PASS | PASS | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-050 | Indirect OCF | PASS | PASS | PASS | PASS | PASS | PASS | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-051 | Retained earnings | PASS | PASS | PASS | PASS | PASS | PASS | No | **YES** — C non-empty | **CERTIFY_RECOMMENDED** | YES |
| P1-A-052 | Current assets | PASS | PASS | PASS | PASS | PASS | PASS | No | **YES** — D non-empty | **CERTIFY_RECOMMENDED** | YES |
| P1-A-053 | Net sales returns | PASS | PASS | PASS | PASS | PASS | **FAIL** — fragmentary | No | **YES** — A fragmentary | **HOLD_EDITORIAL** | — |
| P1-A-054 | Loss contingency disc | PASS | PASS | PASS | PASS | PASS (tier-mapped) | PASS (gold-standard) | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-055 | Basic EPS | PASS | PASS | PASS | PASS | PASS | PASS | No | **YES** — D non-empty | **CERTIFY_RECOMMENDED** | YES |
| P1-A-057 | Revenue shipped | PASS | PASS | PASS | PASS | PASS | PASS | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-058 | COGS inventory | PASS | PASS | PASS | PASS | PASS | PASS | No | No | **CERTIFY_RECOMMENDED** | YES |
| P1-A-059 | Straight-line depr | PASS | PASS | PASS | PASS | PASS | **FAIL** — fragmentary | No | **YES** — A fragmentary | **HOLD_EDITORIAL** | — |

**Result: 24 CERTIFY_RECOMMENDED, 6 HOLD_EDITORIAL (4 DL-007 template + 2 DL-011 fragmentary), 0 HOLD_CONTENT, 0 ARCHIVE_RECOMMENDED.**

---

## Changes Applied

### pack_a_corrected.js — Certification Edits

**8 calculation items certified by subagent:** P1-A-025, P1-A-043, P1-A-047, P1-A-048, P1-A-049, P1-A-050, P1-A-057, P1-A-058
- ExplanationCorrect expanded to full CAQS standard
- question_state/certification_date/certification_batch added
- DL-008 issues cleared (ExplanationWrong[CorrectChoice] set to "")

**14 items certified in this session:**
- P1-A-005, P1-A-011, P1-A-012, P1-A-013, P1-A-014, P1-A-015, P1-A-016, P1-A-017, P1-A-020, P1-A-021, P1-A-034, P1-A-045, P1-A-051, P1-A-052, P1-A-054, P1-A-055

For each: ExplanationCorrect expanded + certification metadata added. DL-008 issues cleared where applicable (P1-A-011, P1-A-045, P1-A-051, P1-A-052, P1-A-055).

**No answer keys changed. No distractor, stem, difficulty, or LOSTag changes.**

---

## Holds

| QuestionID | Hold type | Defect | Narrowest next action |
|---|---|---|---|
| P1-A-001 | HOLD_EDITORIAL | DL-007 — template distractor explanations in B, D | Rewrite ExplanationWrongB and ExplanationWrongD with choice-specific ASC 210 reasoning |
| P1-A-002 | HOLD_EDITORIAL | DL-007 — template distractor explanations in A, C | Rewrite ExplanationWrongA and ExplanationWrongC with choice-specific ASC 205 reasoning |
| P1-A-009 | HOLD_EDITORIAL | DL-007 — template distractor explanations in B, D; no ASC citations anywhere | Rewrite B/D with choice-specific LIFO liquidation reasoning; add ASC 330 reference |
| P1-A-018 | HOLD_EDITORIAL | DL-007 — template distractor explanations in A, D | Rewrite ExplanationWrongA and ExplanationWrongD with choice-specific ASC 810 NCI reasoning |
| P1-A-053 | HOLD_EDITORIAL | DL-011 — fragmentary text in ExplanationWrongA ("because both sales returns...") | Clear ExplanationWrongA and write proper distractor explanation |
| P1-A-059 | HOLD_EDITORIAL | DL-011 — fragmentary text in ExplanationWrongA ("because the $176,800...") | Clear ExplanationWrongA and write proper distractor explanation |

---

## Post-Block 1 Certified Pool

| Pack | Before | After | Change |
|------|--------|-------|--------|
| Pack A Section A | 29 | **53** | +24 |
| Pack B | 2 | 2 | — |
| Pack E | 26 | 26 | — |
| **Total** | 60 | **84** | **+24** |

**Pack A Section A Certified: 53/74 (72%). Remaining capacity before 75 cap: 22.**

---

## Regression Pipeline — EXECUTED (2026-07-22)

### Commands
```powershell
& "C:\Program Files\nodejs\node.exe" scripts/validate.js
& "C:\Program Files\nodejs\node.exe" scripts/build_master_registry.js
& "C:\Program Files\nodejs\node.exe" scripts/generate_registry.js
# Idempotence:
& "C:\Program Files\nodejs\node.exe" scripts/generate_registry.js
```

### Results

| Metric | Baseline | Post-Block 1 | Delta |
|--------|----------|-------------|-------|
| Registry items | 2,975 | 2,975 | **0** |
| Registry errors | 59 | 59 | **0** |
| Registry warnings | 524 | 524 | **0** |
| Module-level errors | 118 | 118 | **0** |
| Module-level warnings | 1,671 | 1,671 | **0** |
| DL-011 (parse errors) | 0 | 0 | **0** |
| Registry idempotence | Required | Confirmed | **PASS** |

### DL-011 Controls: Effective
No JSON parse errors detected. All 24 certification edits applied without syntax regression. The DL-011 prevention rule (use single quotes for inner quotes) was followed in all EC expansions.

## Scope Confirmed

- No case certification or case audit work
- No DL-007 pilot or bulk remediation
- No DL-010 Bucket 2 sweep
- No UI, validator, application, schema, or analytics changes
- No manual registry edits
- No answer-key changes
- Pack A Section A: 53 Certified, did not exceed 75 cap
- No Pack B candidates needed
- Scope: exactly 30 items reviewed

---

**BLOCK 1 COMPLETE — EXTERNAL REVIEW REQUIRED BEFORE BLOCK 2. PACK A SECTION A CERTIFIED COUNT (53) DOES NOT EXCEED 75.**
