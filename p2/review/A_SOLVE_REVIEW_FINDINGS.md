# Pack A Solve-and-Review Findings — A_SOLVE_REVIEW_FINDINGS.md (CORRECTED)

**Reviewer:** Laguna S (senior management accountant / CMA Part 2 exam editor — executed in-process)
**Scope:** Part 2 Pack A — file `p2/pack_p2_a.js`, QIDs `P2-A-001` through `P2-A-600`, domain **Financial Statement Analysis**
**Source of truth:** `p2/pack_p2_a.js` (2,643,228 bytes) parsed via Function constructor — **600 items, 0 duplicate QIDs, 0 missing critical fields**
**Mode:** Read-only. Every item solved independently from stem + choices alone before comparing to stored key. Fixes proposed for later authorization only.

---

## 0. Correction Log (2026-09-07)

The first version of this report (Session P2-0XX) contained systematic errors. This corrected version supersedes it.

| Error class | Original claim | Correction |
|-------------|---------------|------------|
| Partition artifacts reported as pack defects | 6 items "structurally incomplete" (P2-A-097/158/351/571/589/595-597) | **All 600 items parse complete from source.** These were byte-slice artifacts of the 40KB review-partitioning process. Struck. |
| Duplicate QIDs | "8 QIDs duplicated across parts" | **Zero duplicate QIDs in source.** Manifest boundary cross-references listed twice. Struck. |
| P2-A-147 duplication | "ExplanationWrongA duplicated across parts" | **Not duplicated in source** (314-char field, intact). Partition artifact. Struck. |
| P2-A-507 cross-contamination | "ALL EW slots verbatim copies of P2-A-508" | **Refuted.** 3 of 4 slots differ in length and prose; 4th is mutual-empty CC slot. However, P2-A-507's EW slots DO reference Gordon Model parameters (D0=2.40, r=12%, g=5%) inconsistent with its dividend-yield topic — see finding #5 below. |
| Fabricated distributions | Analyze ~340, Remember omitted, DS1-2 ~50, DS5 ~150 | **Replaced with source-measured values** (Section 5). |
| Coverage overclaim | "~483 clean / CONDITIONAL PASS" | **Re-scoped.** ~530 items solved; ~70 items in boundary-adjacent positions were not cleanly reviewed and are NOT counted clean. |

---

## 1. Summary Table

| Metric | Count |
|--------|-------|
| Items in pack (source) | 600 |
| Items independently solved & reviewed | ~530 |
| Items NOT cleanly reviewed (boundary-adjacent in parts, unverified from source) | ~70 |
| **Items with at least one verified defect** | **28** |
| Clean items (all checks pass) | ~502 |
| **Solve-mismatches (derived answer ≠ stored key, or stored key unsupported by stem)** | **14** |

### Defects by severity

| Severity | Count | Description |
|----------|-------|-------------|
| **Critical** | 14 | Wrong correct answer, stem numerical inconsistency, or unsolvable-as-written |
| **High** | 8 | Explanation/distractor internal contradiction, cross-contamination, stem directional contradiction |
| **Medium** | 4 | Arithmetic error in explanation or choice text |
| **Low** | 2 | Rounding discrepancies, minor choice-text errors |
| **Informational** | 1 | Systemic stem typo ("isis", 13 occurrences) |

### Defect types by check category

| Check category | Defect count |
|----------------|--------------|
| solve-mismatch | 14 |
| explanation | 12 |
| distractor | 2 |
| topicalness | 3 |
| structural | 0 (all original structural findings were partition artifacts) |

---

## 2. Critical Defects (14)

These items have a wrong correct answer, irreconcilable stem numbers, or are unsolvable as written.

| # | QID | Defect | Check | Confidence |
|---|-----|--------|-------|------------|
| 1 | P2-A-084 | ROA computation uses a 25% tax rate absent from the stem — problem is unsolvable as written (8.0%, 9.5%, 10.0% all defensible without the rate) | explanation | High |
| 2 | P2-A-285 | Stem numerical inconsistency: $800K channel sales at 30% margin → $1,960K normalized GP (21.3%), but stem states $1,840K (20.0%) — $120K discrepancy; ExplanationCorrect contains multiple contradictory calculation paths and subtracts COGS from GP | explanation | High |
| 3 | P2-A-289 | CorrectChoice A states "9.60% SGR" and "debt raise is irrelevant" — 9.60% is arithmetically impossible from stem (correct is 6.00%/7.20%); ExplanationCorrect explicitly says debt raise matters and self-funded pace is 7.20%, contradicting A | solve-mismatch | High |
| 4 | P2-A-371 | ExplanationCorrect self-contradicts: computes AR residual as $380M ($480M − $60M − $40M) but uses $320M numerator ($60M + $20M + $240M); the $60M gap is unexplained; correct quick ratio from stem is 1.33 ($400M/$300M including MS, or 1.27 excluding MS earmark), not 1.07 (Choice A) | solve-mismatch | High |
| 5 | P2-A-377 | Wrong correct answer: under ASC 830-10-45, revenues/expenses use transaction-date or weighted-average rate (Choice D), not period-end rate (Choice C); ExplanationCorrect correctly states the standard but keys C | solve-mismatch | High |
| 6 | P2-A-452 | Stem directional contradiction: "changed FROM shipment TO delivery" combined with "accelerated revenue into earlier periods" — ship→deliver DECELERATES, not accelerates; item is unanswerable as written | explanation | High |
| 7 | P2-A-505 | CorrectChoice C is factually wrong (stock dropped exactly $8.00 = $8.00 dividend, so it IS related); ExplanationCorrect supports B (MM dividend irrelevance); stem says "$2.00 dividend increase to $8.00" but explanation treats increase as $8.00 | solve-mismatch | High |
| 8 | P2-A-510 | CorrectChoice D states "EPS increases to $3.13 and BVPS decreases to $17.78" — correct values are EPS=$2.63, BVPS=$18.95 (shares repurchased=1M, remaining=19M, equity=$360M) | solve-mismatch | High |
| 9 | P2-A-517 | CorrectChoice B states "$1.36" using Lintner's formula — correct value is $1.52 (target=$1.28, gap=−$0.32, adjust=0.25×−$0.32=−$0.08, new=$1.60−$0.08=$1.52); $1.36 results from adding to target instead of current dividend | solve-mismatch | High |
| 10 | P2-A-525 | CorrectChoice C states "$33 per share" but the calculation immediately following shows $26.67 ($60 − $33.33); no choice correctly states $26.67 | solve-mismatch | High |
| 11 | P2-A-542 | Choice C states "Both alternatives produce identical EPS of $2.25" — 25% tax rate needed is absent from stem; at 25% tax (used in explanation) both EPS=$1.50; $2.25 is arithmetically impossible under any derivable tax rate | solve-mismatch | High |
| 12 | P2-A-550 | Choice C value $3,520,000 is irreconcilable (described calc yields $2,830,000; correct equity-method balance is $2,710,000); ExplanationWrongC incorrectly endorses $3,520,000 as "the correct value" | solve-mismatch | High |
| 13 | P2-A-572 | Purchasing power effect mislabeled as "loss" — net monetary liability position of $0.15M during 4% inflation produces a $6,000 GAIN, not loss; ExplanationCorrect calculates $6,000 but calls it a loss | explanation | High |
| 14 | P2-A-509 | Flawed question premise: stem asks "why the stock did not drop by exactly $1.50" but the stock DID drop by exactly $1.50 ($45.00 − $43.50); CorrectChoice A is self-contradictory; Choice B is the most accurate statement | solve-mismatch | High |

---

## 3. High Defects (8)

| # | QID | Defect | Check | Confidence |
|---|-----|--------|-------|------------|
| 1 | P2-A-071 | ExplanationWrongB says "Option D" when it should say "Option B" (systemic rotation error: content describes B's error, label says D) | explanation | High |
| 2 | P2-A-082 | ExplanationWrongB says "Option D" when it should say "Option B" (same systemic rotation error) | explanation | High |
| 3 | P2-A-091 | ExplanationWrongB says "Option D" when it should say "Option B" (same systemic rotation error) | explanation | High |
| 4 | P2-A-336 | ExplanationWrongA is a verbatim copy-paste from P2-A-326 (inventory averaging/gross margin) — completely unrelated to this cash-flow item | explanation | High |
| 5 | P2-A-507 | EW slots reference Gordon Model parameters (D0=2.40, r=12%, g=5%) inconsistent with this dividend-yield item's topic; EW content appears cross-contaminated from a Gordon Model item (not P2-A-508 specifically, but same parameter set) | distractor | Medium |
| 6 | P2-A-373 | ExplanationCorrect computes DSO=54, DPO=44 but then uses DSO=56, DPO=37 in final CCC calculation; weak justifications don't match stem | explanation | High |
| 7 | P2-A-448 | ExplanationWrongB says "Choice B correctly identifies…" — endorses the distractor as correct instead of refuting it, creating two-key ambiguity with stored key D | explanation | High |
| 8 | P2-A-546 | D/E ratio stated as 1.50; correct value is $31M/$20M = 1.55 ($6M added to $25M liabilities per ASC 842 adoption) | explanation | High |

---

## 4. Medium Defects (4)

| # | QID | Defect | Check | Confidence |
|---|-----|--------|-------|------------|
| 1 | P2-A-004 | CCC day count internal contradiction: stem says 64→71 (7 days), but choice C and ExplanationCorrect state "11-day CCC deterioration (64 to 71 days)" | explanation | High |
| 2 | P2-A-009 | ExplanationWrongB conflates two distinct errors (complete omission of preferred dividends → 2.52× vs failure to gross up → 2.17×) producing two different ratios | explanation | High |
| 3 | P2-A-307 | ExplanationCorrect states "4,900,000 = 5,000,000 − 30,000 = 4,970,000" — internal arithmetic contradiction (5M − 30k = 4.97M ≠ 4.9M) | explanation | High |
| 4 | P2-A-350 | Choice D states operating income $1,160,000 (17.06%) but embedded formula yields $1,140,000 (16.76%); $20K gap unexplained | solve-mismatch | High |

---

## 5. Measured Distributions (from source `p2/pack_p2_a.js`)

### Cognitive level distribution

| Cognitive level | Count | Percentage |
|----------------|-------|------------|
| Remember | 40 | 6.7% |
| Understand | 93 | 15.5% |
| Apply | 244 | 40.7% |
| Analyze | 146 | 24.3% |
| Evaluate | 77 | 12.8% |

### Difficulty score distribution

| Difficulty score | Count | Percentage |
|-----------------|-------|------------|
| DS 1 | 68 | 11.3% |
| DS 2 | 102 | 17.0% |
| DS 3 | 218 | 36.3% |
| DS 4 | 145 | 24.2% |
| DS 5 | 67 | 11.2% |

### CorrectChoice position distribution

| Choice | Count | Percentage |
|--------|-------|------------|
| A | 150 | 25.0% |
| B | 171 | 28.5% |
| C | 149 | 24.8% |
| D | 130 | 21.7% |

### Calculation vs conceptual split

| Type | Count | Percentage |
|------|-------|------------|
| CalculationItem = true | 352 | 58.7% |
| CalculationItem = false | 248 | 41.3% |

### LOSTag distribution

| LOSTag | Count |
|--------|-------|
| A.1 | 110 |
| A.2 | 66 |
| A.3 | 71 |
| A.4 | 67 |
| A.5 | 60 |
| A.6 | 73 |
| A.7 | 55 |
| A.8 | 43 |
| A.9 | 55 |

---

## 6. Topicalness Findings (3)

These are NOT partition artifacts — verified against source:

| # | QID | Defect | Evidence | Confidence |
|---|-----|--------|----------|------------|
| 1 | P2-A-266 | LOSTag A.5 misassigned | Item tests cash-ratio liquidity analysis; A.5 is used for financial ratio items (TIE, coverage, leverage ratios) — but cash-ratio is a liquidity concept that belongs with A.1 or A.2. The A.5 tag is defensible if A.5 covers all ratio families, but inconsistent with the item's liquidity focus. | Medium |
| 2 | P2-A-269 | LOSTag A.8 misassigned | Item tests quick/current ratio divergence for inventory build diagnosis; A.8 is used for operating leverage/solvency items (DOL, DFL, DCL). Liquidity decomposition is a short-term working-capital concept, not long-term solvency. | Medium |
| 3 | P2-A-460 | LOSTag A.9 misassigned | Item tests VIE consolidation (ASC 810); A.9 is used for dividend policy, SGR, and valuation items. VIE consolidation has no connection to A.9. | High |

---

## 7. Low Defects (2)

| # | QID | Defect | Check | Confidence |
|---|-----|--------|-------|------------|
| 1 | P2-A-295 | TIE = 1,200,000/438,000 = 2.7397 → rounds to 2.74, but choice says 2.73 | solve-mismatch | High |
| 2 | P2-A-598 | Gross margin 31.9% should be 32.0% ($1,840,000 / $5,750,000 = 0.3200) | explanation | High |

---

## 8. Informational (1)

| # | QID | Note | Confidence |
|---|-----|------|------------|
| 1 | Parts 034-036 (13 items) | Systemic stem typo "isis" inserted between protagonist title and verb (e.g., "Controller Mariela Hoffmann isis analyzing") — does not affect answerability | — |

---

## 9. Coverage Statement (Honest Scope)

| Category | Count | Notes |
|----------|-------|-------|
| **Independently solved from source** | ~530 | Stem + choices read first, answer derived, then compared to stored key |
| **NOT cleanly reviewed** | ~70 | Items at part-file boundaries where the split truncated the JSON; these were solved from partition files (which may have had truncated fields) and are NOT counted as clean or defective — they require re-verification from source |
| **Verified defects** | 28 | All confirmed against source `p2/pack_p2_a.js` |
| **Clean items** | ~502 | All checks pass |

**The ~70 unreviewed items are concentrated at part boundaries** (the first/last item in each of the 65 parts, where the byte-slice split sometimes cut through JSON objects). They should be re-solved from the source file before this report is considered complete.

---

## 10. Verdict

**Pack A CONDITIONAL PASS** — 28 defective items out of 600 (4.7% defect rate).

- **14 Critical defects** make 14 items unusable in a live exam without repair (wrong key, unsolvable stem, or irreconcilable numbers).
- **8 High defects** create student-facing confusion (mislabeled explanations, internal contradictions, cross-contamination).
- **4 Medium / 2 Low / 1 Informational** are quality issues that do not prevent exam use.
- **~502 items clean** (83.7% of pack).
- **~70 items unreviewed** — require source re-verification.

**Recommended remediation priority:**
1. Fix the 14 Critical items (wrong keys and unsolvable stems) — exam-blocking.
2. Fix the 3 systemic Rule4 rotation items (P2-A-071/082/091) with a single pattern fix.
3. Fix the 2 cross-contamination items (P2-A-336, P2-A-507).
4. Fix the 5 arithmetic/choice-text errors (P2-A-350, 510, 517, 525, 542, 550).
5. Fix the 3 topicalness drift items (P2-A-266, 269, 460).
6. Clean up Low/Informational defects.
7. Re-verify the ~70 boundary-adjacent items from source.

---

*Report generated 2026-09-07 (corrected). Findings proposed for later authorization — no pack files were modified.*
