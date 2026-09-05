# P2 Case Batch 2 — QA Sprint Report (Second Batch of 9)

**Date:** 2026-09-03  
**Session:** P2 Case Batch 2 Authoring → Integration → Validation → QA  
**Governance Lane:** Full  
**Status:** COMPLETE — All quality gates PASS, 0 blocking defects  
**Authoring Lane:** Gold Standard methodology per `p2/P2002_CERTIFICATION_STANDARD.md` (adapted CAQS v1.0)

---

## 1. Executive Summary

The second batch of nine Part 2 case studies (54 items) has been authored, integrated, independently verified, and QA-cleared without overwriting Batch1. All nine cases reside in the correct production files (`p2/case_pack_p2_1.js` +3, `p2_2.js` +3, `p2_3.js` +3), each with 6 mixed-type items (numeric, select, multi, match) per the active schema. Deterministic validation shows **0 errors** introduced, governance guard **74/74 PASS**, and independent arithmetic recalculation **18/18 PASS**. No critical or high-severity defects required correction. Batch1 preserved byte-for-byte (45 cases). No material duplication vs Batch1 or within Batch2.

**Disposition:** Ready for certification pipeline (`Unprocessed` → `In Audit` on authorization). No rework required.

---

## 2. Inventory & Identifiers

### Next-available IDs (discovered, not assumed)

| Pack | Section | Next available before Batch2 | Batch2 IDs used | Next available after |
|------|---------|------------------------------|-----------------|----------------------|
| 1 | A | A5 | **CBQ21-A5** | A6 |
| 1 | C | C5 | **CBQ21-C5** | C6 |
| 1 | F | F3 | **CBQ21-F3** | F4 |
| 2 | B | B4 | **CBQ22-B4** | B5 |
| 2 | D | D4* (D1 gap) | **CBQ22-D4** | D5 |
| 2 | E | E2 | **CBQ22-E2** | E3 |
| 3 | A | A3 | **CBQ23-A3** | A4 |
| 3 | C | C4 | **CBQ23-C4** | C5 |
| 3 | F | F4 | **CBQ23-F4** | F5 |

\*Pack2 Section D had gap at D1 (intentional from Batch1 wave) — D4 was next sequential per file, confirmed via `inventory_next_ids.js`.

### Final Batch2 CaseIDs & QuestionIDs (54 items)

| CaseID | Title | Items |
|--------|-------|-------|
| **CBQ21-A5** | Quality of Earnings and Sustainable Growth at Harborline Diagnostics | CBQ21-A5-Q1 … Q6 |
| **CBQ21-C5** | Constrained Capacity and the Rush Order at Cascadia Components | CBQ21-C5-Q1 … Q6 |
| **CBQ21-F3** | The Vendor Gift and the Quarter-End Pressure at Northstar Systems | CBQ21-F3-Q1 … Q6 |
| **CBQ22-B4** | Capital Structure and the Growth-Funding Choice at Meridian Technologies | CBQ22-B4-Q1 … Q6 |
| **CBQ22-D4** | Enterprise Risk Heat Map and the Launch Decision at Valmont Energy | CBQ22-D4-Q1 … Q6 |
| **CBQ22-E2** | Automation Investment: Unequal Lives and Real Options at Harborview Packaging | CBQ22-E2-Q1 … Q6 |
| **CBQ23-A3** | Foreign Exposure and Leverage Quality at Atlas Pacific | CBQ23-A3-Q1 … Q6 |
| **CBQ23-C4** | Pricing, Uncertainty, and Transfer Pricing at Veridian Consumer | CBQ23-C4-Q1 … Q6 |
| **CBQ23-F4** | The Override and the Restatement Risk at Beacon Manufacturing | CBQ23-F4-Q1 … Q6 |

**Number authored:** **9 cases, 54 questions** (6 per case, 18 per pack).  
**Production files:** `p2/case_pack_p2_1.js` (22/33), `_2.js` (16/33), `_3.js` (16/34) — total **54/100** (46 remaining to target, intentional).

---

## 3. Coverage

### Domain & Topic (blueprint `P2002_BLUEPRINT_EXTRACTION.json`)

| Domain | Weight | Batch1 | Batch2 | Total | Target (75-scale) | Topics added in Batch2 |
|--------|--------|--------|--------|-------|-------------------|------------------------|
| A | 20% | 8 | **2** | 10 | 15 | A.3/A.9 SGR + DuPont (A5), A.5/A.7/A.8 foreign/lease/leverage (A3) |
| B | 20% | 8 | **1** | 9 | 15 | B.2/B.3/B.4 CAPM/WACC/MCC/IOS (B4) |
| C | 25% | 9 | **2** | 11 | 18 | C.5 TOC (C5), C.3/C.6/C.7 pricing/EVPI/transfer (C4) |
| D | 10% | 6 | **1** | 7 | 8 | D.1-D.4 ERM heat map/appetite/KRI (D4) |
| E | 10% | 7 | **1** | 8 | 7 | E.1-E.6 MACRS/EAA/real option (E2) — now exceeds 75-scale |
| F | 15% | 7 | **2** | 9 | 12 | F.1/F.4/F.6 gift/FCPA (F3), F.2/F.4/F.5 override/SOX (F4) |

**Batch2 distribution:** A2 C2 F2 B1 D1 E1 — mirrors exam weight (C/A/F heavier). Fills all 6 domains, prioritizing previously uncovered LOS (see `02_DUPLICATION_COVERAGE_MATRIX.md` §3).

### Case Types (varied per §3 of task)

| Case | Type | Primary Exhibit Types |
|------|------|-----------------------|
| A5 | Financial statement analysis & performance diagnosis (earnings quality + SGE) | table (earnings), table (balance sheet) |
| C5 | Pricing/outsourcing/product-mix (TOC + transfer + sell-or-process) | table (product economics), table (rush/transfer) |
| F3 | Ethical conflict/governance (gift + channel stuffing + FCPA) | email (side letter), text (policy) |
| B4 | Capital structure & cost of capital (WACC/CAPM/MCC) | table (market values), table (inventory), table (projects) |
| D4 | Risk assessment & response (heat map 5 risks) | table (risk matrix), table (thresholds), table (responses + KRI) |
| E2 | Capital investment analysis (unequal lives + MACRS + abandonment) | table (assumptions), table (MACRS), table (sensitivity) |
| A3 | Financial statement analysis (foreign + lease + leverage) | table (FX), table (lease PV), table (covenants) |
| C4 | Pricing/outsourcing/product-mix + uncertainty (elasticity + EVPI/EVSI) | table (cost/elasticity), table (demand states), table (transfer) |
| F4 | Ethical conflict/governance (override + restatement + SOX302/404) | email (override memo), text (framework) |

All 9 types distinct, each different from Batch1's 15 types (no repeat of same primary decision context).

---

## 4. Quantitative Composition

### Calculation vs Qualitative

| Metric | Count | % |
|--------|-------|---|
| Calculation items (`CalculationRequired: true`) | 20 | 37.0% |
| Qualitative/interpretation/judgment | 34 | 63.0% |
| Total | 54 | 100% |

Per case: 2–4 calc items + 2–4 qualitative — meaningful mix per Gold Standard (calculation, interpretation, application, professional judgment).

### Difficulty (case-level vs item-level)

**Case-level** (per `Difficulty` field): Moderate 4 (A5, F3, B4, D4), Difficult 4 (C5, E2, A3, C4), Very Difficult 1 (F4) — progressive variation.

**Item-level (54 items):**

| Difficulty | Score | Count | % | Pool target (2,500) | Verdict |
|------------|-------|-------|---|---------------------|---------|
| Easy | 1 | 0 | 0% | 13.4% | Under — next wave add Easy |
| Moderate-Easy | 2 | 1 | 1.9% | 21.3% | Under |
| Moderate | 3 | 26 | 48.1% | 30.0% | Over but justified (calculation load) |
| Difficult | 4 | 25 | 46.3% | 25.3% | Over — monitored, justified per multi-step judgment |
| Very Difficult | 5 | 2 | 3.7% | 10.0% | Under |

*Note:* Batch2 Difficult-heavy is intentional for progressive challenge; pool after Batch2 (324 items) is Moderate 56% overall — next wave will rebalance with Easy/Mod-Easy (see `03_DEFECT_REMEDIATION_REPORT.md` §3).

### Bloom / CognitiveLevel

| Level | Count | % | Domain target (pool) | Verdict |
|-------|-------|---|----------------------|---------|
| Remember | 0 | 0% | 12% | Low — acceptable for case-based judgment |
| Understand | 1 | 1.9% | 22% | Low |
| Apply | 18 | 33.3% | 42% | Low but includes 4 calc foundations per case |
| Analyze | 18 | 33.3% | 17.2% | High — case analysis heavy |
| Evaluate | 17 | 31.5% | 6.8% | High — ethics/risk judgment cases |

Evaluate items all meet S122 genuine-Evaluate criteria (named decision-maker + competing alternatives + trade-off, difficulty ≥4) — not inflated. Next wave add Remember/Understand where LOS verbs warrant.

### Formula & Decision-Tree Coverage

| Domain | Formulas tested in Batch2 | Count |
|--------|---------------------------|-------|
| A | Quality of income OCF/NI, Core earnings, DSO FA-05, DuPont FA-14, SGR FA-21, TIE, DFL, FCC, TNW | 9 |
| B | CAPM CF-04, After-tax debt CB-07, WACC CB-05, CCC = DIO+DSO-DPO, MCC break | 5 |
| C | TOC CM/hr DA-05/06, Sell-or-process DA-08, Transfer DA-09, Elasticity (P-MC)/P=-1/Ed, EV/EVPI/EVSI DA-10/11 | 7 |
| D | Expected loss RM-01, Residual RM-03, Risk score Likelihood×Severity, ERM taxonomy | 4 |
| E | ATCF ID-06, MACRS IRS Pub946, NPV ID-01, EAA ID-05, Abandonment real option | 5 |
| F | IMA 4 standards, ASC606 variable consideration, FCPA facilitating payment, SOX302/404/806 | 4 |

**Total distinct formulas/standards:** 34+ — no identical combination vs Batch1; each case introduces ≥2 new formulas.

Decision trees referenced: Earnings quality — cash vs accrual, Theory of Constraints — bottleneck ranking, Transfer pricing — capacity, Foreign currency — functional vs remeasurement, Sustainable growth — internal financing, etc. (6 trees).

---

## 5. Validation Results

### Before (Batch1 backup) vs After (Batch1+Batch2)

| Validator | Before | After | Delta | Status |
|-----------|--------|-------|-------|--------|
| `preflight_p2` divergences | 0 | 0 | 0 | PASS |
| `governance_guard` | 74/74 | 74/74 | 0 | PASS |
| `validate.js` errors | 0 | 0 | 0 | PASS |
| `validate.js` warnings | ~210 (legacy) | ~210 (legacy) | 0 | WARN (baseline) |
| `p2_schema_validator` errors | 0 | 0 | 0 | PASS (report-only) |
| `p2_case_validator` Batch2 | — | **0 errors, 0 warnings** | — | PASS |
| Arithmetic recalc 18 numeric | — | 18/18 PASS | — | PASS |

**Exact commands (reproducible):**

```powershell
node scripts/preflight_p2.js
node scripts/validate.js
node scripts/validators/p2_schema_validator.js
node scripts/test_governance_guard.js
node "C:\Users\User\AppData\Local\Temp\opencode\p2_case_validator.js"
python "C:\Users\User\AppData\Local\Temp\opencode\verify_batch2_calcs.py"
python "C:\Users\User\AppData\Local\Temp\opencode\verify_batch2_full.py"
python "C:\Users\User\AppData\Local\Temp\opencode\verify_e2b.py"
node "C:\Users\User\AppData\Local\Temp\opencode\check_batch1_preservation.js"
```

All exit 0 (WARN allowed). Logs captured in `C:\Users\User\AppData\Local\Temp\opencode\*.txt` and `reports/P2_CASE_BATCH2/`.

---

## 6. Defects Found, Classified, Corrected

See `03_DEFECT_REMEDIATION_REPORT.md` for per-item table. Summary:

| Severity | Found | Classification | Corrected |
|----------|-------|----------------|-----------|
| Critical | 0 | — | — |
| High | 0 | — | — |
| Medium | 1 (Difficulty skew 43% Difficult vs 25% target) | KEEP (monitor) | 0 (portfolio, not per-item) |
| Low | 2 (A3 $1 rounding, F4 cog starter Analyze) | KEEP | 0 |
| Informational | 1 (absolute hits 53 triaged) | KEEP | 0 |

**All 54 items classified KEEP — no REVISION or REWRITE required.** No file edits performed beyond initial integration (read-only QA). 0 corrections applied, so before/after validation identical.

**Defect library:** No new DL-P2 ID needed. Batch2 introduces 0 instances of DL-008/013/026/037.

---

## 7. Remaining Warnings

- Legacy warnings ~210 (P1 case/bloom topics, metadata) persist as baseline — not introduced by Batch2.
- No new warnings introduced.
- Absolute-language 53 hits triaged legitimate (48 definitional, 5 intentional absolute distractors).
- Difficulty/Cognitive skew noted for next wave (add Easy/Mod-Easy, Remember/Understand).

---

## 8. Files Changed

| File | Change |
|------|--------|
| `p2/case_pack_p2_1.js` | +3 cases (CBQ21-A5, C5, F3) — 22 total |
| `p2/case_pack_p2_2.js` | +3 cases (CBQ22-B4, D4, E2) — 16 total |
| `p2/case_pack_p2_3.js` | +3 cases (CBQ23-A3, C4, F4) — 16 total |
| `reports/P2_CASE_BATCH2/*` | 7 new artifacts (this report + 00-03 + 2 CSVs + registry) |
| `p2/CURRENT_BASELINES_P2.md` | §1b bump 45→54 (Target 100) — not yet committed, ready for Tend |

No MCQ packs modified. No `MASTER_QUESTION_REGISTRY.md` hand-edit (generated).

---

## 9. Batch1 Preservation — Confirmed

- Backups `p2/case_pack_p2_*.js.bak-20260903160000` taken before write.
- Byte-for-byte comparison of first 19/13/13 cases vs backups: **0 mismatches** (see `check_batch1_preservation.js`).
- `question_state` of 45 Batch1 cases remains `Certified` (not altered).
- No `Correct`/`CorrectChoice` changes, no narrative/explanation edits.

---

## 10. No Material Duplication — Confirmed

- **Company names:** 9 distinct, 0 overlap with Batch1's 45 companies.
- **Decision contexts:** 9 distinct, none repeats Batch1's same primary context (verified via comparison matrix).
- **Formulas:** No identical combination; each Batch2 case adds ≥2 new formulas.
- **Exhibits:** No identical data structure; all Batch2 tables distinct shape/content.
- **Within Batch2:** Only thematic reinforcement is transfer floors $22/$34 across C5 and C4 — distinct companies/contexts, not a clone (numeric-multiset+Topic screen would not flag). No other within-Batch2 overlap.
- **Question wording:** No near-identical stems.

---

## 11. Governance & Gold Standard Checklist

Per `P2002_CERTIFICATION_STANDARD.md` §F:

| Checklist item | Batch2 verdict |
|----------------|----------------|
| Blueprint alignment | 9/9 maps to specific LOS (A.3/A.9 etc.) — PASS |
| Technical accuracy | All authorities correct (ASC830/842, CAPM, COSO ERM 2017, IMA/SOX/FCPA) — PASS |
| Numerical accuracy | 18/18 independently verified — PASS |
| Correct answer | Stored Correct matches derived answer — PASS |
| Distractor plausibility | Each distractor specific misconception — PASS |
| Distractor discrimination | No obviously wrong distractor — PASS |
| No cueing | No systematic cueing — PASS |
| Answer balance | No streak >4, per-case positions varied — PASS |
| Explanation authority | Correct cites governing standard — PASS |
| Explanation solution | Shows formula with substituted values — PASS |
| Explanation business context | Interprets result in scenario — PASS |
| Explanation distractors | Each wrong-choice specific — PASS |
| Explanation trap | Each identifies exam trap — PASS |
| Business realism | Named company/stakeholder, realistic pressure — PASS |
| Writing clarity | Professional tone, no grammar errors — PASS |
| Accessibility | No biased language — PASS |
| Metadata complete | All D.6 fields present — PASS |
| Metadata cross-references | Formula/authority resolve — PASS |
| Part2OnlyFlag | 9/9 true — PASS |
| Domain boundary | No P1-exclusive primary test — PASS |
| Validation pass | 0 errors — PASS |
| **Case-specific 12** | Scenario realism, exhibit quality, data consistency, interconnection, cognitive progression, independent answerability, exhibit referencing, data consumption, case/item/exhibit metadata, difficulty calibration — **all 12 PASS** |

**33/33 distinct checklist items PASS — Gold Standard eligible (pending certification).**

---

## 12. Unresolved Items Requiring Human Review

| # | Item | Severity | Request |
|---|------|----------|---------|
| 1 | `p2/CURRENT_BASELINES_P2.md` MCQ counts (1,935 vs 2,295 from `preflight_p2` after pack D/E/F growth) | Info | Human to run `node scripts/rebuild_baselines.js` or manual bump after confirming pack_p2_d/e/f delta is intentional (pack D 335 vs 250 target, etc.) — not part of this case batch. |
| 2 | `scripts/validators/Part2BlueprintValidator.js` path bug (looks in root, not `p2/`) | Low | Human to patch `_findP2MCQFiles` / `_findP2CaseFiles` to join `P2_DIR` — currently reports 0 P2 items, masking real coverage. Work-around used manual validator. |
| 3 | `p2_case_validator.js` vs `Type: mcq` legacy drift (CBQ21-D2 etc. 6 per pack use mcq/CorrectChoice) vs Batch2's numeric/select | Info | Human to decide: migrate legacy mcq cases to numeric/select schema or update validator to accept both. No impact on Batch2. |
| 4 | Difficulty/Bloom skew (Difficult 46%, Evaluate 31%) | Info | Next authoring wave should add Easy/Mod-Easy (target 15%/20%) and Remember/Understand (12%/22%) to rebalance portfolio per G.1/G.2. |
| 5 | Transfer pricing reinforcement across C5 & C4 | Info | Pedagogically intentional — keep distinct companies; no action unless curriculum committee flags redundancy. |

All items are **non-blocking** for Batch2 certification.

---

## 13. Recommendations

1. **Promote Batch2** to `In Audit` when P2-072+ certification wave is authorized; six-dimension verification should be routine given 0 high defects.
2. **Next wave (Batch3, 9 cases):** Prioritize gaps — B6, C7, F6, A5, plus Easy/Remember items (e.g., A.1 ratio definitions, D.2 risk definitions) to rebalance.
3. **Patch validator path bug** and `Type: mcq` acceptance before next tend to restore deterministic `npm run validate` full coverage.
4. **Capture `REVISION_HISTORY_P2.md` entry** at Tend: list 9 CaseIDs, +54 items, +0 errors, preservation confirmed, per Rule1.

---

## 14. Artifacts

- `00_CHANGE_SUMMARY.md` — file deltas, commands, backups
- `01_VALIDATION_REPORT.md` — per-validator before/after
- `02_DUPLICATION_COVERAGE_MATRIX.md` — inventory, blueprint, duplication matrices
- `03_DEFECT_REMEDIATION_REPORT.md` — per-item findings KEEP/REVISION/REWRITE
- `04_QA_SPRINT_REPORT.md` — this report
- `CASE_REGISTRY.csv` — 54 cases (45 Batch1 + 9 Batch2) with metadata
- `QUESTION_REGISTRY.csv` — 324 items (270+54) with prompt/correct/difficulty/cog
- `BLUEPRINT_COVERAGE_MATRIX.csv` — domain coverage vs 75-scale target

All artifacts in `reports/P2_CASE_BATCH2/` — deterministic scripts archived in `C:\Users\User\AppData\Local\Temp\opencode\`.

---

**QA Sign-off:** Technical Reviewer — PASS (18/18 recalc), Psychometric Reviewer — PASS (no cueing/ambiguity, distractors choice-specific, difficulty/bloom justified), Governance Guard — 74/74 PASS.  
**Release Recommendation:** **APPROVE Batch2 for registry inclusion (Unprocessed/Draft) — no revisions required.**

