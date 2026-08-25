# P2 Content Pool Certification Report — 2026-08-05

**Session:** P2-020 (Content Wave: 10 Items Per Pack)
**Governance Lane:** Full
**Status:** PASS — 0 blocking defects. Distribution advisories noted.

---

## 1. Pool Overview

| Pack | Domain | Items | QID Range | Target | % Complete |
|------|--------|-------|-----------|--------|-----------|
| A | Financial Statement Analysis | 115 | P2-A-001–115 | 500 | 23.0% |
| B | Corporate Finance | 55 | P2-B-001–055 | 500 | 11.0% |
| C | Decision Analysis | 30 | P2-C-001–030 | 625 | 4.8% |
| D | Risk Management | 15 | P2-D-001–015 | 250 | 6.0% |
| E | Investment Decisions | 25 | P2-E-001–025 | 250 | 10.0% |
| F | Professional Ethics | 15 | P2-F-001–015 | 375 | 4.0% |
| **Total** | | **255** | | **2,500** | **10.2%** |

All items: `question_state: "Unprocessed"`, none certified.

---

## 2. Governance Compliance — BLOCK Check (PASS)

| Gate | Result | Detail |
|------|--------|--------|
| Preflight:p2 | PASS | 0 divergences, 255 QIDs, 74/74 guard tests |
| Schema validation | PASS | 0 errors across all 6 packs |
| DL-008 (EW[CC] non-empty) | 0 violations | All CorrectChoice EW slots empty |
| DL-026 (empty non-CC EW) | 0 violations | All 3 non-CC EW slots ≥50 chars, choice-specific |
| DL-013 (boilerplate) | 0 violations | No template/boilerplate text found |
| DL-021 (absent EW fields) | 0 violations | All 4 EW fields present per item |
| DL-037 (polarity mismatch) | 0 violations | No Choice binary lead-in polarity issues |
| Rule 13 (Part2OnlyFlag) | 255/255 true | 100% compliance |
| Rule 14 (QID boundary) | 255/255 valid | All match ^P2-[A-F]-\d{3}$ |
| UniqueConceptKey | 0 duplicates | 255 unique keys |
| Difficulty/Score mismatch | 0 | All Difficulty labels match their scores |
| Authorities populated | 255/255 | 0 items with empty Authorities |
| Unexpected fields | 0 | No non-schema fields present |
| Governance guard | 74/74 PASS | No test regressions |

**Verdict: All 255 items pass structural governance gates. No blocking defects.**

---

## 3. Difficulty Distribution

| Level | Score | Count | % | Target | Delta |
|-------|-------|-------|---|--------|-------|
| Easy | 1 | 23 | 9.0% | 15% | -6.0pp |
| Moderate-Easy | 2 | 53 | 20.8% | 20% | +0.8pp |
| Moderate | 3 | 96 | 37.6% | 30% | +7.6pp |
| Difficult | 4 | 72 | 28.2% | 25% | +3.2pp |
| Very Difficult | 5 | 11 | 4.3% | 10% | -5.7pp |

**Advisory:** The pool skews toward Moderate/Difficult and is underrepresented at both tails (Easy and Very Difficult). Very Difficult needs the most attention — only 11 items across 255. Packs D and F have zero Very Difficult items, which is appropriate for conceptual domains but will need attention as pools grow.

### Per-pack difficulty

| Pack | Easy | Mod-Easy | Moderate | Difficult | Very Diff |
|------|------|----------|----------|-----------|-----------|
| A | 16 | 24 | 28 | 36 | 11 |
| B | 0 | 10 | 28 | 17 | 0 |
| C | 2 | 4 | 15 | 9 | 0 |
| D | 3 | 5 | 5 | 2 | 0 |
| E | 0 | 4 | 13 | 8 | 0 |
| F | 2 | 6 | 7 | 0 | 0 |

Pack B (0 Easy, 0 Very Difficult) and Pack E (same) are most compressed toward the middle.

---

## 4. Cognitive Level Distribution

| Level | Count | % | IMA CSO Target | Delta |
|-------|-------|---|----------------|-------|
| Remember | 12 | 4.7% | 10% | -5.3pp |
| Understand | 32 | 12.5% | 20% | -7.5pp |
| Apply | 99 | 38.8% | 40% | -1.2pp |
| Analyze | 74 | 29.0% | 20% | +9.0pp |
| Evaluate | 38 | 14.9% | 10% | +4.9pp |

**Advisory:** The pool is heavier on Analyze/Evaluate than the CSO targets. The Remember and Understand tiers are underrepresented. Future authoring waves should prioritize Remember and Understand items to restore balance. Pack A is the primary driver — it carries 40 Analyze and 28 Evaluate items (60% of the pool's higher-order items). Packs D and F have better balance for their domain types.

### Per-pack cognitive

| Pack | Remember | Understand | Apply | Analyze | Evaluate |
|------|----------|------------|-------|---------|----------|
| A | 10 | 11 | 26 | 40 | 28 |
| B | 0 | 6 | 29 | 17 | 3 |
| C | 2 | 3 | 20 | 2 | 3 |
| D | 0 | 6 | 5 | 3 | 1 |
| E | 0 | 2 | 13 | 8 | 2 |
| F | 0 | 4 | 6 | 4 | 1 |

---

## 5. Correct Choice Position Distribution

| Position | Count | % | Target |
|----------|-------|---|--------|
| A | 76 | 29.8% | 25% |
| B | 108 | 42.4% | 25% |
| C | 40 | 15.7% | 25% |
| D | 31 | 12.2% | 25% |

**Advisory (HIGH):** CorrectChoice is heavily B-skewed (42.4%, 17.4pp over target). This is a psychometric concern — test-takers who recognize the pattern may gain an unfair advantage. Position D is severely underrepresented (12.2%). Future authoring must deliberately rotate correct answers toward C and D.

### Per-pack answer position (worst offenders)

| Pack | A% | B% | C% | D% |
|------|----|----|----|-----|
| A | 19.1 | **42.6** | 23.5 | 14.8 |
| B | **74.5** | 18.2 | 1.8 | 5.5 |
| C | 16.7 | **46.7** | 20.0 | 16.7 |
| D | 6.7 | **73.3** | 6.7 | 13.3 |
| E | 20.0 | **52.0** | 16.0 | 12.0 |
| F | 13.3 | **73.3** | 6.7 | 6.7 |

Packs B, D, and F are the most unbalanced. Pack B has only 1 item with correct answer C.

---

## 6. Calculation vs. Conceptual

| Type | Count | % |
|------|-------|---|
| Calculation | 178 | 69.8% |
| Conceptual | 77 | 30.2% |

This is appropriate for the quantitative nature of CMA Part 2. Packs D and F are predominantly conceptual (as expected for Risk Management and Ethics). Packs A, B, C, E are heavily quantitative.

---

## 7. LOS Coverage

**All 43 LOS have at least 1 item.** However, 13 LOS have only 1-2 items:

| Underrepresented LOS (≤2 items) | Count | Domain |
|------|-------|--------|
| A.6 (inflation-adjusted ratios) | 1 | Financial Statement Analysis |
| A.7 (off-balance-sheet financing) | 2 | Financial Statement Analysis |
| A.8 (operating/financial leverage) | 1 | Financial Statement Analysis |
| A.9 (dividend/SGR) | 1 | Financial Statement Analysis |
| B.5 (short-term financing) | 1 | Corporate Finance |
| B.8 (M&A/restructuring) | 2 | Corporate Finance |
| C.4 (relevant costing) | 2 | Decision Analysis |
| C.5 (constraints) | 2 | Decision Analysis |
| C.6 (decision under uncertainty) | 2 | Decision Analysis |
| C.7 (make-vs-buy) | 1 | Decision Analysis |
| F.1–F.7 | 2 each | Professional Ethics |

Future waves should deepen these thin LOS before broadening already-populated ones.

---

## 8. FormulaReference Coverage

- 192 of 255 items (75.3%) have FormulaReference populated
- 63 items (24.7%) have empty FormulaReference — all are conceptual/non-calculation items (Risk Management, Ethics, and conceptual Financial Analysis items). This is appropriate.

---

## 9. Item Style

All 255 items use `single-select`. No multi-select, numeric, fill, or match items in the pool. Future waves should consider adding `multi-select` items (especially for Ethics scenarios where multiple standards apply) and `numeric` entry items (for calculation-intensive domains like Decision Analysis and Investment Decisions).

---

## 10. Summary Verdict

**CERTIFICATION STATUS: CONDITIONAL PASS**

| Category | Status |
|----------|--------|
| Structural governance (DL-008/026/013/021/037) | ✅ 0 violations |
| Schema conformance | ✅ 0 errors |
| QID uniqueness and format | ✅ 255/255 valid |
| Part2OnlyFlag | ✅ 100% compliance |
| Authorities | ✅ 255/255 populated |
| Difficulty distribution | ⚠️ Very Difficult underrepresented (4.3% vs 10%) |
| Cognitive distribution | ⚠️ Analyze/Evaluate overweight (+14pp combined) |
| Answer position | 🔴 B-heavy (42.4% vs 25%); D underrepresented (12.2%) |
| LOS coverage | ⚠️ 13 LOS with ≤2 items |
| Item style diversity | ⚠️ 100% single-select |

**Recommendations for next authoring wave:**
1. Rotate correct answers toward C and D positions (critical, affects learner fairness)
2. Author Very Difficult items for Packs B, C, D, E, F
3. Add Remember and Understand items to balance the cognitive skew
4. Deepen thin LOS (A.6–A.9, B.5, C.4–C.7) before expanding populated LOS
5. Introduce multi-select items for Ethics and numeric items for quantitative domains

**No blocking governance defects. All items are structurally sound and schema-compliant.**
