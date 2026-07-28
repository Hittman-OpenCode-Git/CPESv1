# Session 59 — Post-Standardization Audit + Case-Study Move Verification

**Date:** 2026-07-24
**Type:** Post-standardization quality audit (analysis-first, tightly scoped implementation)
**Status:** Complete
**Agents Deployed:** 7 (B, C, D, E, F, G, H + Coordinator)
**Files Audited:** All 10 pack/case files (5 MCQ packs + 5 scored_cases files)
**Writes Performed:** 0 (read-only audit)

---

## Executive Summary

**Overall Verdict: CAUTION — Standardization partially complete; critical structural gap in case-study separation; content quality is good; scoring model is verified; difficulty vocabulary needs expansion.**

| Dimension | Verdict | Key Finding |
|-----------|---------|-------------|
| Case-Study Move | **FAIL** | 60 cases never moved from MCQ packs. Two parallel case systems coexist. |
| Structural/Schema | **PASS** | All 10 files parse. MCQ/case item-type separation is clean. 44% of MCQs lack `question_state`. |
| MCQ Content Quality | **4.0 / 5.0** | Strong accuracy (4.6). Weakest area: explanation quality (3.0), driven by DL-013/021. |
| Case-Study Content | **3.5–4.2 / 5.0** | Calculations all verified. Standard cases have zero governance framework. |
| Scoring Behavior | **PASS** | 75/25 weighting, 0–500 scale, 360 pass threshold all correctly implemented. |
| Difficulty Distribution | **NEEDS REBALANCING** | Only 3 of 5 labels in use. Moderate is 2x over target (53.9% vs. 30%). |
| External Research | **3 fixes needed** | 1 critical (P1B-B-119 residual DL-030), 2 high (DL-010 misattributions) |

---

## 1. Case-Study Move Verification → **FAIL**

### 1.1 Finding: The Move Never Happened

The assumed "move" of case studies from MCQ packs into scored_cases files was **never executed**. Two independent case-study systems coexist:

| System | Count | Location | ID Format | Governance |
|--------|-------|----------|-----------|------------|
| **Standard cases** | 60 (15×4 packs) | `pack_a_corrected.js` through `pack_d_corrected.js` | `CASE-A1`, `CASE-B12`, etc. | **None** — no `question_state`, no `ProductionStatus`, no `DifficultyScore` |
| **Enhanced cases** | 75 (15×5 files) | `scored_cases.js` through `scored_cases5.js` | `CBQ-A1`, `CBQ2-A2`, etc. | Present — `question_state: "Unprocessed"`, `ProductionStatus`, exhibits |

### 1.2 MCQ Pack Residual Scan

| Pack | Residual Cases | CaseIDs | Items | Variable Name |
|------|---------------|---------|-------|---------------|
| pack_a_corrected.js | **15** | CASE-A1, B1, A-C1, A-D1, EF1, A2, B3, A-C4, A-D5, E6, F7, B8, A-C9, A-D10, F11 | ~120 | `CASE_BANK_A` (line 25949) |
| pack_b_corrected.js | **15** | CASE-B12 through CASE-B26 | ~75 | `CASE_BANK_B` (line 21219) |
| pack_c_corrected.js | **15** | CASE-C1 through CASE-C15 | 75 | `CASE_BANK_C` (line 25968) |
| pack_d_corrected.js | **15** | CASE-D1 through CASE-D15 | 75 | `CASE_BANK_D` (line 26039) |
| pack_e_corrected.js | **0** | — | — | Clean |

**Pack E is the only clean pack.** Packs A–D still embed 60 case-style items with ~345 sub-items total.

### 1.3 Enhanced Case File Inventory

| File | Cases | Naming Convention | Variable Name | Key Defects |
|------|-------|-------------------|---------------|-------------|
| scored_cases.js | 15 | `CBQ-{Section}{N}` | `ENHANCED_CASE_BASE` | CBQ-A1 missing `Difficulty` string label (has only `DifficultyScore: 3`) |
| scored_cases2.js | 15 | `CBQ2-{Section}{N}` | `ENHANCED_CASE_BASE2` | ProductionStatus: "Draft" |
| scored_cases3.js | 15 | `CBQ3-{Section}{N}` | `ENHANCED_CASE_BASE3` | **CBQ3-F1-E1**: Exhibit CaseID defect (DL-023 residual) |
| scored_cases4.js | 15 | `CBQ4-{Section}{N}` | `ENHANCED_CASE_BASE4` | **CBQ4-C2-E1**, **CBQ4-E1-E1**: Exhibit CaseID defects |
| scored_cases5.js | 15 | `CBQ5-{Section}{N}` | `ENHANCED_CASE_BASE5` | **CBQ5-C2-E1**, **CBQ5-D1-E1**: Exhibit CaseID defects |

### 1.4 Cross-Reference Findings

- No CBQ- IDs in MCQ packs, no CASE- IDs in scored_cases files — the systems are **hermetically separate**
- Both systems are loaded by `app.js` via `index_updated.html`; enhanced cases are Tier 2, standard cases Tier 3
- **Section F not bank-mapped**: Each scored_cases file clones cases to `ENHANCED_CASE_BANK_A..E` but never to `ENHANCED_CASE_BANK_F`. Section F cases exist in the base arrays but have no section-level variable for the loader.

### 1.5 Case-Study Move Action Required

The 60 standard cases in Packs A–D need a decision:

| Option | Description | Risk |
|--------|-------------|------|
| **Option A: Archive** | Remove CASE_BANK_A–D from packs, rely solely on enhanced cases (75 in scored_cases*) | Reduces total case pool from 135→75; standard cases have better scenario quality |
| **Option B: Migrate** | Extract standard cases from packs into scored_cases files, add governance metadata | Requires rewriting ~345 items with exhibit objects, ProductionStatus, question_state |
| **Option C: Coexist** | Leave both systems in place; add governance metadata to standard cases inline | Maintains duplicate systems; complicates delivery pool logic |

**Recommendation:** Option B (migrate) for long-term architectural cleanliness. Option A (archive) is viable short-term if the 75 enhanced cases provide adequate coverage across sections A–F.

---

## 2. Structural & Schema Sanity → **PASS with Observations**

### 2.1 File Parsing

All 10 files pass `node --check` — zero syntax errors. Valid JavaScript syntax confirmed.

### 2.2 MCQ/Case Separation — Clean

- All 2,500 MCQ items are `ItemType: "MCQ"`, `ItemStyle: "single-select"` — zero non-MCQ contamination
- All case files contain only multi-type case items (`numeric`, `select`, `multi`, `fill`, `match`)
- No structural cross-contamination between packs and case files

### 2.3 question_state Coverage

| State | Count | % of Total |
|-------|-------|------------|
| Certified | 1,078 | 43.1% |
| Unprocessed | 188 | 7.5% |
| Archived | 131 | 5.2% |
| Hold (non-standard) | 2 | 0.1% |
| **Missing** | **1,101** | **44.0%** |

**1,101 items (44%) have no `question_state` field** — they exist outside the governance framework and cannot be counted in certification audits. Packs A (277), C (250), D (175), and E (399) are affected. Pack B is at 100% coverage.

### 2.4 Schema Observations

| Finding | Severity | Detail |
|---------|----------|--------|
| Pack A dual-block architecture | Informational | Separate metadata block (`ChoiceA`–`D` flat) + content block (`Choices.A`–`D` nested). DL-016 pattern. Rendering engine uses content block. |
| 2 items with `"Hold"` state | Low | Pack D items use non-standard `"Hold"` state. Valid values per QUESTION_METADATA_STANDARD.md §9.2 are: Unprocessed, In Audit, Editorial Queue, Certified, Archived. |
| 5/75 cases missing `Difficulty` string | Low | All have `DifficultyScore` numeric, but 1 case per file lacks the `Difficulty` label field. |
| CBQ3-D1: ProductionStatus vs question_state contradiction | Medium | Case-level `ProductionStatus: "Production"` but item-level `question_state: "Unprocessed"`. Mutually exclusive. |

---

## 3. MCQ Content Quality Sampling → **4.0 / 5.0**

### 3.1 Sample Coverage

26 MCQs sampled across all 5 packs, all 6 sections, all difficulty labels, 12 Certified + 14 non-Certified.

### 3.2 Dimension Scores

| Dimension | Avg Score (1–5) | Range | Assessment |
|-----------|:--:|:---:|------------|
| **Accuracy** | 4.6 | 2–5 | Strong. Only P1E-C-040 flagged (DL-021 gap, not wrong answer). |
| **CMA 2026 Alignment** | 4.4 | 3–5 | All items test genuine Part 1 topics. |
| **Clarity** | 4.5 | 3–5 | Stems are clear and grammatical. |
| **Distractor Quality** | 3.4 | 3–5 | Uniformly average. Common pattern: 2 strong + 1 obvious distractor. |
| **Explanation Quality** | 3.0 | 2–5 | **Weakest dimension.** Driven by DL-013 boilerplate and Pack E minimalism. |
| **Overall** | **4.0** | 2.8–4.8 | "Good" — above threshold, with targeted fixes needed. |

### 3.3 Per-Pack Summary

| Pack | Items | Avg Score | Best | Worst |
|------|-------|:---:|------|-------|
| Pack A | 6 | 4.27 | 4.8 (A-001) | 3.4 (D-020) |
| Pack B | 7 | 3.91 | 4.6 (D-099) | 3.2 (B-119) |
| Pack C | 4 | 4.15 | 4.6 (AC-020) | 3.8 (FC-040) |
| Pack D | 4 | 4.45 | 4.8 (AD-020) | 4.0 (DD-040) |
| Pack E | 5 | **3.48** | 3.8 (A-020) | 2.8 (C-040) |

Pack E significantly underperforms — driven by DL-021 (absent distractor explanations in Section C) and systematically minimal explanations.

### 3.4 Defect Pattern Summary (26-item sample)

| Defect | Occurrences | Status |
|--------|:---:|--------|
| DL-008 (non-empty EW[CC]) | **0** | Clean across all 26 samples |
| DL-013 (template boilerplate) | 3 fields (P1-D-020 EW-C/EW-D, P1-DD-040 EW-B) | Residual |
| DL-010 (misassigned explanation) | 2 fields (P1-D-020 EW-D, P1B-F-100 EW-A) | Confirmed by Agent F |
| DL-021 (missing distractor EW) | 1 item, 3 fields (P1E-C-040) | Pack E Section C |
| DL-030 residual (incomplete fix) | 1 item (P1B-B-119 EW-A) | Critical |
| question_state missing | 10 of 26 items (38%) | Governance gap |

---

## 4. Case-Study Content & Rubric → **3.5–4.2 / 5.0**

### 4.1 Cases Sampled

| CaseID | System | Section | DifficultyScore | Overall |
|--------|--------|---------|:---:|:---:|
| CASE-A1 | Standard | A — Financial Reporting | N/A | 3.4 |
| CASE-A-D1 | Standard | D — Cost Management | N/A | 3.6 |
| CBQ-A1 | Enhanced | A — Financial Reporting | 3 | 4.0 |
| CBQ3-D1 | Enhanced | D — Cost Management | 4 | 4.2 |

### 4.2 Key Findings

**Calculation Accuracy: 5.0 / 5.0**
All 11 spot-check calculations independently verified (revenue recognition, ABC costing, absorption/variable costing, deferred tax, lease liability, operating cash flow). Zero errors.

**Scenario Quality: Standard cases are better**
Standard cases (CASE-A1, CASE-A-D1) use more realistic business scenarios with named stakeholders, decision triggers, and professional language. Enhanced cases are structurally richer but some scenarios feel template-like.

**Governance Gap: Standard cases have zero governance**
The 60 standard cases have no `question_state`, `ProductionStatus`, `DifficultyScore`, `CognitiveLevel`, `Exhibits`, or `RevisionHistory`. They exist entirely outside the CAQS framework and cannot be certified.

**Enhanced Cases: Metadata contradictions**
CBQ3-D1 has `ProductionStatus: "Production"` with `question_state: "Unprocessed"` — mutually exclusive. Item Q6 has wrong `AccountingPrinciple` ("Relevant costs" for a variable costing classification question).

**Certified Case Items: 0**
Neither system has a single Certified case item. All ~700+ case-study items across 135 cases are Unprocessed or have no state. The learner delivery pool currently contains **zero case-study items**.

---

## 5. External Research Findings → **3 Fixes Required**

Agent F independently verified all 5 flagged items:

| # | Item | Verdict | Action |
|---|------|---------|--------|
| **CRITICAL** | P1B-B-119 (Learning curve) | **Needs revision** | EW-A states "4th unit takes 51.2h" — should be 64h. DL-030 fix was incomplete. |
| **HIGH** | P1-D-020 (Theory of Constraints) | **Answer correct; EW-D defective** | EW-D contains "$7.03" from P1-D-021 (DL-010) + DL-013 boilerplate |
| **HIGH** | P1E-C-040 (Market size variance) | **Formula correct; DL-021 exists** | 3 distractor EW fields structurally absent |
| **MEDIUM** | P1B-F-100 (CCPA) | **CCPA rights correct; EW-A DL-010** | EW-A describes "right to know" but Choice A is "right to delete" |
| **LOW** | CBQ3-D1 (metadata) | **Confirmed contradictions** | ProductionStatus vs question_state; Q6 AccountingPrinciple wrong |

---

## 6. Scoring Behavior Audit → **PASS**

### 6.1 Scoring Architecture Verified

| Component | Location (app.js) | Status |
|-----------|-------------------|--------|
| MCQ Grading | `scoreMCQ()` at line 862 | **Correct** — binary 0/1 |
| Case Grading | `correctCase()` at line 1648 | **Correct** — per-item binary, normalized |
| Aggregate Scoring | `practiceScores()` at line 1752 | **Correct** — full pipeline |
| MCQ Gate (50%) | `MCQ_GATE_THRESHOLD = 0.50` at line 55 | **Correct** — full mode only |

### 6.2 Formula Walkthrough (Verified)

```
Step 1: mcqPct = correct_mcqs / total_mcqs
Step 2: casePct = correct_case_items / total_case_items
Step 3: weighted = mcqPct × 0.75 + casePct × 0.25
Step 4: calibrated = weighted × difficultyPreset.factor + difficultyPreset.offset
Step 5: scaled = Math.min(500, Math.max(0, Math.round(calibrated × 500)))
Step 6: passed = scaled >= 360
```

### 6.3 Configuration Constants

| Value | Location | Match? |
|-------|----------|:---:|
| 75% MCQ / 25% CBQ | `app.js:1764` | ✓ |
| 0–500 scale | `app.js:1774` | ✓ |
| 360 pass threshold | `app.js:1775` | ✓ |
| Binary MCQ scoring | `app.js:862-887` | ✓ |
| CBQ per-item binary | `app.js:1648-1652` | ✓ |

**Observation:** Core values (360, 500, 0.75, 0.25) are hardcoded rather than named constants. No functional impact but reduces maintainability.

### 6.4 Edge Cases

| Scenario | Behavior | Verdict |
|----------|----------|:---:|
| Zero correct | scaled = 0, passed = false | Correct |
| Perfect score | scaled = 500, passed = true | Correct |
| Unanswered questions | Treated as incorrect (0 credit) | Correct |
| MCQ-only session | 75/25 weighting falls back to simple accuracy | Reasonable |
| MCQ gate < 50% in full mode | Forced submit, no CBQ access | Correct |

---

## 7. Difficulty Distribution & Behavior → **NEEDS REBALANCING**

### 7.1 Actual Vocabulary in Use

Only **3 of 5 canonical labels** are in use across all 2,500 MCQs:

| Label | Count | % of 2,500 | CAQS Target % | Gap |
|-------|-------|:---:|:---:|:---:|
| Easy (1) | 508 | 20.3% | 15% | +5.3% over |
| **Moderate-Easy (2)** | **0** | **0.0%** | **20%** | **−20.0%** |
| Moderate (3) | 1,347 | **53.9%** | 30% | **+23.9% over** |
| Difficult (4) | 645 | 25.8% | 25% | +0.8% |
| **Very Difficult (5)** | **0** | **0.0%** | **10%** | **−10.0%** |

### 7.2 Key Skews

| Rank | Section/Pack | Issue |
|:---:|-------------|-------|
| 1 | Pack A Section F | **100% Moderate** — all 75 items at same label. No differentiation. |
| 2 | Pack A Section E | 51% Easy — excessively skewed low |
| 3 | Pack B Section B | 0% Easy, 51% Difficult — compressed, no entry-level items |
| 4 | All 5 packs | Moderate is 22–27pp over target — systemic overuse |

### 7.3 Rebalancing Estimate

- ~380 Moderate items → reclassify to Moderate-Easy (score 2)
- ~250 Moderate/Difficult items → reclassify to Very Difficult (score 5)
- ~130 Easy items → some to Moderate-Easy (score 2)
- **Total: ~500–800 items need difficulty reclassification**

### 7.4 app.js Gap

The delivery engine's `getDifficultyDistribution()` function (`app.js:981-991`) only handles 3 categories (`Easy`, `Moderate`, `Difficult`). Items with `Moderate-Easy` or `Very Difficult` labels would be silently mapped to the `Moderate` tier. **This function must be updated before any rebalancing begins.**

### 7.5 Case-Study Difficulty

- 400 case items have **no `Difficulty` label** at the item level (they use `DifficultyDrivers`, `CognitiveLevel`, complexity fields instead)
- 75 cases have case-level `DifficultyScore` (numeric 1–5)
- 5 of 75 cases are missing the `Difficulty` string label

---

## 8. Summary Tables

### 8.1 Content Quality Summary

| Pack | Items (sampled) | Accuracy | Alignment | Distractor | Explanation | Overall |
|------|:---:|:---:|:---:|:---:|:---:|:---:|
| A | 6 | 4.8 | 4.8 | 3.7 | 3.7 | 4.3 |
| B | 7 | 4.6 | 4.4 | 3.4 | 3.0 | 3.9 |
| C | 4 | 4.8 | 4.7 | 3.5 | 3.5 | 4.2 |
| D | 4 | 5.0 | 4.5 | 3.5 | 3.8 | 4.5 |
| E | 5 | 4.2 | 3.8 | 3.0 | 2.6 | 3.5 |
| **Pool** | **26** | **4.6** | **4.4** | **3.4** | **3.0** | **4.0** |

### 8.2 Case Quality Summary

| System | Count | Accuracy | Scenario | Metadata | Governance | Overall |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|
| Standard | 60 | 5.0 | 4.0 | 1.0 | 0.0 | 3.0 |
| Enhanced | 75 | 5.0 | 3.5 | 4.0 | 4.0 | 4.0 |

### 8.3 Scoring Behavior Summary

| Test | Expected | Actual | Match? |
|------|----------|--------|:---:|
| MCQ binary scoring | 0 or 1 per item | confirmed | ✓ |
| CBQ per-item scoring | 0 or 1 per item | confirmed | ✓ |
| 75/25 weighting | mcqPct×0.75 + casePct×0.25 | confirmed | ✓ |
| 0–500 scaling | rounded × 500 | confirmed | ✓ |
| 360 pass threshold | scaled ≥ 360 | confirmed | ✓ |
| MCQ gate 50% | enforced in full mode | confirmed | ✓ |

### 8.4 Difficulty Distribution vs. Target

| Level | Target | All Packs | Pack A | Pack B | Pack C | Pack D | Pack E |
|-------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Easy | 15% | 20.3% | 19.4% | 20.0% | 22.6% | 19.8% | 19.8% |
| Moderate-Easy | 20% | **0.0%** | 0.0% | 0.0% | 0.0% | 0.0% | 0.0% |
| Moderate | 30% | **53.9%** | 53.8% | 52.0% | 53.8% | 57.4% | 52.4% |
| Difficult | 25% | 25.8% | 26.8% | 28.0% | 23.6% | 22.8% | 27.8% |
| Very Difficult | 10% | **0.0%** | 0.0% | 0.0% | 0.0% | 0.0% | 0.0% |

---

## 9. Prioritized Remediation Recommendations

### TIER 0 — Critical (Learner Safety)

| # | Item | Issue | Effort |
|---|------|-------|:---:|
| 0.1 | P1B-B-119 EW-A | Fix residual DL-030: "4th unit takes 51.2h" → "4th unit takes 64h" | 1 line |
| 0.2 | P1-D-020 EW-D | Fix DL-010: remove "$7.03" from P1-D-021; rewrite to be choice-specific | 1 field |
| 0.3 | P1B-F-100 EW-A | Fix DL-010: "right to know" → "right to delete" | 1 field |

### TIER 1 — High (Governance)

| # | Issue | Scope | Effort |
|---|-------|:---:|:---:|
| 1.1 | Add question_state to 1,101 MCQs | Packs A (277), C (250), D (175), E (399) | Large batch |
| 1.2 | Fix "Hold" state → valid state | 2 items in Pack D | 2 edits |
| 1.3 | Fix CBQ3-D1 ProductionStatus | scored_cases3.js | 1 edit |
| 1.4 | Fix CBQ3-D1-Q6 AccountingPrinciple | scored_cases3.js | 1 edit |
| 1.5 | Fix DL-023 exhibit CaseID defects | scored_cases3/4/5, 5 exhibits | 5 edits |

### TIER 2 — Medium (Quality)

| # | Issue | Scope | Effort |
|---|-------|:---:|:---:|
| 2.1 | Case-study move decision + execution | 60 standard cases in Packs A–D | Major |
| 2.2 | Difficulty vocabulary expansion | Add Moderate-Easy + Very Difficult labels to app.js | Small |
| 2.3 | Difficulty rebalancing | ~500–800 items across all packs | Large batch |
| 2.4 | DL-013 residual sweeps | ~851 fields remaining across Packs A/C/D | Medium batch |
| 2.5 | Case item Difficulty labels | 400 case items have no Difficulty field | Large batch |

### TIER 3 — Low (Polish)

| # | Issue | Scope | Effort |
|---|-------|:---:|:---:|
| 3.1 | Section F bank mapping in scored_cases* | All 5 scored_cases files | 5 edits |
| 3.2 | Case Difficulty label parity | 5/75 cases missing Difficulty string | 5 edits |
| 3.3 | Named scoring constants in app.js | Extract 360, 500, 0.75, 0.25 | Small |
| 3.4 | Pack A Section F difficulty differentiation | 75 items, 100% Moderate | Large batch |

---

## 10. File Integrity Confirmed

All 10 pack/case files at pre-session state. Zero writes performed. All baselines preserved.

| File | Items/Cases | Parse | Status |
|------|:---:|:---:|--------|
| pack_a_corrected.js | 500 MCQs + 15 cases | PASS | — |
| pack_b_corrected.js | 500 MCQs + 15 cases | PASS | — |
| pack_c_corrected.js | 500 MCQs + 15 cases | PASS | — |
| pack_d_corrected.js | 500 MCQs + 15 cases | PASS | — |
| pack_e_corrected.js | 500 MCQs | PASS | Only clean pack |
| scored_cases.js | 15 enhanced cases | PASS | 1 case missing Difficulty label |
| scored_cases2.js | 15 enhanced cases | PASS | — |
| scored_cases3.js | 15 enhanced cases | PASS | 1 exhibit CaseID defect |
| scored_cases4.js | 15 enhanced cases | PASS | 2 exhibit CaseID defects |
| scored_cases5.js | 15 enhanced cases | PASS | 2 exhibit CaseID defects |

---

## 11. Artifacts Produced

- `reports/SESSION59_POST_STANDARDIZATION_AND_CASE_MOVE_AUDIT.md` — This consolidated report
- Agent reports in session task outputs (Agents B–H)

---

**SESSION 59 COMPLETE — 7-AGENT POST-STANDARDIZATION AUDIT COMPLETE. OVERALL VERDICT: CAUTION. CASE-STUDY MOVE NOT EXECUTED (2 PARALLEL SYSTEMS). CONTENT QUALITY: GOOD (4.0/5.0). SCORING: VERIFIED CORRECT. DIFFICULTY: NEEDS REBALANCING. 3 CRITICAL/HIGH CONTENT FIXES IDENTIFIED. ZERO WRITES PERFORMED.**
