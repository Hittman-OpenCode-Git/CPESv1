# Session 91 — Planner

**Date:** 2026-07-31
**Governance Lane:** Full
**Predecessor:** Session 86P (Modernization Rankings)
**Target:** Pack E Section A — Cognitive Upgrade Wave 1

---

## 1. Mission Confirmation

Execute Wave 1 of the Pack E Section A cognitive upgrade campaign identified by S86P as Rank #3 modernization priority. Convert 15 low-order items (Understand/Apply) into higher-order items (Analyze/Evaluate) through scenario-rich rewrites.

---

## 2. Current State (T0 Verified)

| Metric | Value |
|--------|-------|
| Pack E total QIDs | 545 |
| Section A QIDs | 74 |
| Section A Certified | 74 (100%) |
| Architecture | Single-object |
| DL-008 | 0 |
| DL-026 | 0 |
| HO baseline | 2.7% (2 Evaluate, 0 Analyze) |

**Cognitive Level Distribution:**

| Level | Count | % |
|-------|-------|---|
| Understand | 61 | 82.4% |
| Apply | 10 | 13.5% |
| Evaluate | 2 | 2.7% |
| Remember | 1 | 1.4% |
| Analyze | 0 | 0.0% |

**Anomalies:**
- P1E-A-011: QID prefix `P1E-A-` with Topic `E-A.011` but `Section: "D"` — excluded from this wave
- QIDs absent: A-050, A-053, A-072 (rotation-group gaps)

---

## 3. Target State

| Level | Before | After | Change |
|-------|--------|-------|--------|
| Evaluate | 2 | **10** | +8 |
| Analyze | 0 | **7** | +7 |
| Apply | 10 | 9 | -1 |
| Understand | 61 | 47 | -14 |
| Remember | 1 | 1 | 0 |
| **HO%** | **2.7%** | **22.7%** | **+20.0pp** |

---

## 4. Candidate QID Selection

### 4.1 Evaluate Candidates (8 items)

| # | QID | Current CL | CC | Topic | Scenario Angle |
|---|-----|-----------|-----|-------|----------------|
| E1 | P1E-A-001 | Understand | B | Balance sheet purpose | CFO Maria Chen of Harbor Medical Supplies evaluating classified vs. liquidity-based balance sheet presentation for a surgical supply distributor with operating cycle exceeding 12 months — impact on debt covenants and credit rating |
| E2 | P1E-A-004 | Understand | A | Revenue recognition timing | Controller James Park of Meridian Manufacturing evaluating when to recognize revenue under ASC 606 for a SaaS implementation contract with bundled license, configuration services, and annual support — determining number of performance obligations and allocation |
| E3 | P1E-A-005 | Understand | A | Inventory measurement | Controller Sarah Lin of Pacific Foods evaluating LCNRV application across three product categories (raw materials, WIP, finished goods) with varying market decline data — determining proper write-down and disclosure |
| E4 | P1E-A-007 | Understand | C | Bond classification | CFO David Okonkwo of Atlantic Logistics evaluating current vs. non-current debt classification after Q4 debt covenant violation — lender waiver obtained with accelerated repayment condition — impact on working capital and liquidity ratios |
| E5 | P1E-A-014 | Understand | A | Finance lease criteria | Controller reviewing equipment lease for Atlas Manufacturing's new production line — purchase option at 15% of fair value, lease term 80% of economic life, specialized custom tooling — finance vs. operating classification under ASC 842 |
| E6 | P1E-A-025 | Understand | C | Deferred tax liability | Tax Director Elena Torres of Summit Construction evaluating deferred tax implications of MACRS tax depreciation vs. straight-line book depreciation for $2.4M equipment purchase — impact on effective tax rate, cash tax savings, and balance sheet leverage for upcoming bank review |
| E7 | P1E-A-049 | Understand | D | Variable consideration | Revenue Controller evaluating expected value vs. most likely amount for $8M construction contract with tiered performance bonus — three probability scenarios with competing estimation constraints |
| E8 | P1E-A-006 | Apply | A | LIFO rising prices | CFO evaluating recommendation from controller to switch from FIFO to LIFO — analysis of tax savings ($180K year 1), earnings impact, inventory turnover ratio effect, and LIFO conformity rule implications |

### 4.2 Analyze Candidates (7 items)

| # | QID | Current CL | CC | Topic | Scenario Angle |
|---|-----|-----------|-----|-------|----------------|
| A1 | P1E-A-012 | Understand | C | Contingent liability | Audit committee of NorthStar Equipment reviewing three pending legal claims with probability and estimated loss data — determining which claims require accrual (probable + estimable), disclosure (reasonably possible), or no action (remote) under ASC 450 |
| A2 | P1E-A-030 | Understand | B | Impairment loss | Controller analyzing three fixed asset groups for potential impairment under ASC 360 — Exhibit 1 provides carrying values, undiscounted future cash flows, and fair values — determining which assets are impaired and computing the impairment loss |
| A3 | P1E-A-035 | Understand | B | Aging method | Credit manager Maria Chen of Harbor Medical Supplies analyzing aged accounts receivable schedule with historical default rates by aging bucket — computing CECL allowance for credit losses under ASC 326 |
| A4 | P1E-A-028 | Understand | D | Comprehensive income | FP&A analyst decomposing comprehensive income statement — net income $2.1M, FX translation loss ($340K), pension prior service credit $180K, AFS unrealized gain $95K — determining which OCI component drives the largest divergence from net income |
| A5 | P1E-A-058 | Understand | D | Restructuring liability | Controller of Pacific Foods analyzing CEO-approved restructuring plan — severance for 45 employees ($1.2M), equipment lease termination ($380K penalty), warehouse write-down ($520K) — determining measurement and recognition timing under ASC 420 |
| A6 | P1E-A-067 | Understand | B | Bill-and-hold | Revenue recognition specialist analyzing three customer arrangements — Customer X (substantive business reason, segregated inventory), Customer Y (customer requested delay, no warehouse space), Customer Z (modified delivery schedule, product not yet complete) — determining which qualifies as bill-and-hold under ASC 606-10-55 |
| A7 | P1E-A-063 | Understand | A | Inventory method change | Controller of Atlas Manufacturing analyzing cumulative effect of weighted-average → FIFO change — computing LIFO reserve equivalent adjustment, retained earnings restatement, and tax impact for financial statement comparability |

---

## 5. CSO Coverage

| LOS | Evaluate | Analyze | Total |
|-----|----------|---------|-------|
| A.1 Financial statements | E1, E4, A4 | | 3 |
| A.2 Recognition, measurement, valuation | E2, E3, E6, E7, E8, A3, A6, A7 | A1, A5 | 10 |
| A.3 Assets (PP&E, intangibles, leases) | E5, A2 | | 2 |
| A.4 Income taxes | | | 0 |
| A.5 Equity | | | 0 |
| A.6 EPS | | | 0 |

**Note:** Sub-domains A.4-A.6 have fewer/low-order items — planned for Wave 2.

---

## 6. Authorized Write Scope

| File | Scope |
|------|-------|
| `pack_e_corrected.js` | 15 Section A items only |
| `knowledge/REVISION_HISTORY.md` | Append entry |
| `reports/` | 4 deliverables (added, not modified) |

**Explicitly NOT modified:**
- All other packs (A, B, C, D)
- All other Pack E sections (B, C, D, E, F)
- Case files
- app.js, styles.css, index HTML
- Registries, baselines, validator scripts

---

## 7. Rewrite Standards (per S86P Pattern)

### Required for Every Rewrite:
- Named organization (consistent with Section A pattern: NorthStar Equipment, Harbor Medical, Meridian, Pacific Foods, Atlas, Summit, Atlantic)
- Named stakeholder with title
- Strategic or operational decision context
- Competing alternatives in choices (Evaluate) or data-driven patterns to interpret (Analyze)
- Choice-specific distractor explanations (≥50 chars each)
- Accounting principle referenced by name (ASC, COSO, etc.)
- CorrectChoice unchanged (to avoid new DL-030 risk — only permissible to change CC IF independently re-derived and documented)

### Avoid:
- Definition matching ("Which of the following is...")
- Pure recall stems
- One-step formula lookup
- Generic "plausible misconception" boilerplate

---

## 8. Execution Protocol

1. **T0:** `npm run preflight` — 0 divergences confirmed ✓
2. **Auditor:** Validate 15 QIDs in raw file — GO/NO-GO
3. **Implementer:** Backup-before-write → 15 rewrites (max 30 per batch per Rule 5 — well within)
4. **Verifier:** Syntax, pipeline, preflight, governance
5. **Closeout:** REVISION_HISTORY.md + SESSION091_CLOSEOUT.md + backup artifact

---

## 9. Success Criteria

| Criterion | Target |
|-----------|--------|
| Rewrites completed | 15 |
| Evaluate items | +8 (= 10 total) |
| Analyze items | +7 (= 7 total) |
| HO% | 2.7% → 22.7% |
| QID count | 545 unchanged |
| Certified count | 540 unchanged |
| DL-008 | 0 |
| DL-026 | 0 |
| Rule 9 violations | 0 |
| Preflight divergences | 0 |
| Governance guard | 54/54 PASS |
| Pipeline | PASS |

---

## 10. Stop Conditions

1. Any QID count change → halt and restore from backup
2. Any certification count change → halt and investigate
3. Any new DL-008/DL-026 introduced → halt and fix
4. Any write to unauthorized file → rollback
5. Governance guard failure → halt and fix

---

*Generated: 2026-07-31 — Session 91 — Stage 1 (Planner)*
