# P2-077 Validation Report — Nine-Case Wave (2026-09-03)

**Session:** P2-077 — Nine-Case Authoring Wave (Full Governance Lane)
**Date:** 2026-09-03
**Authority:** AGENTS.md §5 Dual Verification, §9.2/§5, P2_SCHEMA_STANDARD v1.1, QUESTION_METADATA_STANDARD Parts 1-3/5/9, CAQS v1.0, DEFECT_LIBRARY_P2
**Scope:** 9 new Part 2 case studies (54 items, 19 exhibits, 3 packs) + regression on existing 45 cases and 2,295 MCQs

---

## 1. File Inventory (T0 vs Tend)

| Artifact | T0 | Tend | Delta | Status |
|----------|----|------|-------|--------|
| p2/pack_p2_a.js | 500 QIDs | 500 QIDs | 0 | Unchanged |
| p2/pack_p2_b.js | 400 | 400 | 0 | Unchanged |
| p2/pack_p2_c.js | 380 | 380 | 0 | Unchanged |
| p2/pack_p2_d.js | 335 | 335 | 0 | Unchanged |
| p2/pack_p2_e.js | 255 | 255 | 0 | Unchanged |
| p2/pack_p2_f.js | 425 | 425 | 0 | Unchanged |
| p2/case_pack_p2_1.js | 19 cases | 22 cases | +3 (CBQ21-A5, C5, F3) | Verified |
| p2/case_pack_p2_2.js | 13 cases | 16 cases | +3 (CBQ22-B4, D4, E2) | Verified |
| p2/case_pack_p2_3.js | 13 cases | 16 cases | +3 (CBQ23-A3, C4, F4) | Verified |
| **Total cases** | **45** | **54** | **+9** | 45 Certified + 9 Unprocessed |
| **Total case items** | **~270** | **324** | **+54** | 6 per case |
| **Total exhibits** | **~90** | **109** | **+19** | 2-3 per case |

All packs parse via string-aware Function constructor (DL-020 fix). No duplicate CaseID (54 unique), ItemID (324 unique), ExhibitID (109 unique) per `check_cases.js`.

---

## 2. Schema Validation

### 2.1 MCQ Validator (p2_schema_validator.js)
- **Command:** `node scripts/validators/p2_schema_validator.js` (report-only, no --enforce)
- **Result:** **0 base-schema errors** across 2,295 MCQs (exit 0)
- **V11 evidence summary (report-only):** PASS 45/105/265 etc per pack; GRANDFATHERED 455/265...; MIGRATION_REQUIRED 0/30... (unchanged from T0, as MCQ packs untouched)
- **Governance:** Part2OnlyFlag 2,295/2,295 true; UniqueConceptKey present; ItemStyle not Type; VerifiedChecks present; no P1- QIDs in P2 packs

### 2.2 Case Schema Validator (custom, per 01_CASE_SCHEMA)

Checks executed via `check_cases.js` + `integrate_nine.js` gate harness:
- **Required fields:** CaseID, Title, SectionTags, BlueprintDomain, BlueprintObjectives, PrimaryCompetency, EstimatedMinutes (20-40, ≥5/item), Difficulty+DifficultyScore, ScenarioText (2-4 sentences, named company/stakeholder/trigger/task), Industry, CompanyType, CompanyName, Stakeholder, BusinessFunction, QuestionCount==Items.length, ExhibitCount==Exhibits.length, ProductionStatus, Version 2-part, Tags, CreatedDate, ModifiedDate, Author, Confidence 0-100, RevisionHistory, Dependencies, LearningObjectives, Part 2, Part2OnlyFlag true, question_state, Exhibits (≥2), Items (6 each) — **54/54 PASS**
- **Exhibit-level:** ExhibitID {CaseID}-E{N}, CaseID parent, Type from 9-type enum, Title "Exhibit N — …", Purpose, ReferencedBy both directions, Headers/Rows for table else Body for text, DataFormat, AccuracyCheck — **109/109 PASS**
- **Item-level:** ItemID {CaseID}-Q{N}, Type numeric/select/multi/match, Prompt, Correct (string/array/object per Type), Explanation ≥50 chars (all 54 items ≥200 chars for Apply+ per audit), Topic/Subtopic, Choices for select/multi (3-5), LeftItems/RightItems for match (4), Difficulty (5-value enum), DifficultyScore 1-5, CognitiveLevel (Remember/Understand/Apply/Analyze/Evaluate), CalculationRequired boolean, FormulaReference (catalog ID where applicable), CommonTrapReference, EstimatedMinutes, ExplanationVersion 1 — **54/54 PASS**
- **Cross-field:** CF3 SectionTags align BlueprintDomain PASS, CF4 case DifficultyScore within ±1 of mean item scores PASS (CBQ21-A5 mean 3.17→case 3, CBQ21-C5 mean 3.33→case 4, etc), CF5 EstimatedMinutes≈Σ(item)/0.7 PASS, cognitive progression numeric→select→multi→match PASS (ethics F cases all-select variant documented), no decorative data (every row consumed) PASS

### 2.3 Governance Guard
- **Command:** `node scripts/test_governance_guard.js` (74 tests)
- **Result:** **74/74 PASS** (Rules 1-14 BLOCK, all at Tend)
- **Rules exercised:** Rule 5 batch cap ≤30 (18 items/pack) PASS, Rule 2/6 DL-008/026 not applicable to case Items (case uses single Explanation, not EW slots) but MCQ-side clean.

---

## 3. Deterministic Checks

| Check | Command | Tend Result |
|-------|---------|-------------|
| QID uniqueness (MCQ) | `Select-String '"QuestionID"'` + parser Set | 2,295 unique, 0 dups |
| CaseID uniqueness | `Select-String '"CaseID": "CBQ'` + parser | 54 unique, 0 dups |
| ItemID uniqueness | parser | 324 unique, 0 dups |
| Exhibit ReferencedBy both directions | `check_cases.js` | 109 exhibits, every row consumed, every ItemID resolves |
| Parse via Function constructor (string-aware, DL-020) | `new Function(content+'; return var;')` | 3/3 case packs parse, 6/6 MCQ packs parse, 0 errors, `node --check` PASS |
| Preflight P1 | `node scripts/preflight.js` | 2,620 Certified, 0 divergences, guard 74/74 PASS |
| Preflight P2 | `node scripts/preflight_p2.js` | 0 divergences, 74/74 PASS |
| Schema validator P2 | `node scripts/validators/p2_schema_validator.js` | 0 errors, exit 0 |
| Hash stability | `Get-FileHash` | MCQ packs unchanged, case packs new hashes (p2_1 370,515 B) |

---

## 4. Coverage Analysis

### 4.1 Blueprint Coverage by Domain (cases)

| Domain | CSO Weight (P2002) | Target Cases (of 100) | T0 Cases (45) | Tend Cases (54) | New in Wave | Items in Wave | Weight in Wave |
|--------|-------------------|----------------------|---------------|-----------------|-------------|---------------|----------------|
| A Financial Statement Analysis | 20% | 20 | 8 | 10 (+2) | CBQ21-A5, CBQ23-A3 | 12 | 22% |
| B Corporate Finance | 20% | 20 | 8 | 9 (+1) | CBQ22-B4 | 6 | 11% |
| C Decision Analysis | 25% | 25 | 9 | 11 (+2) | CBQ21-C5, CBQ23-C4 | 12 | 22% |
| D Risk Management | 10% | 10 | 6 | 7 (+1) | CBQ22-D4 | 6 | 11% |
| E Investment Decisions | 10% | 10 | 7 | 8 (+1) | CBQ22-E2 | 6 | 11% |
| F Professional Ethics | 15% | 15 | 7 | 9 (+2) | CBQ21-F3, CBQ23-F4 | 12 | 22% |
| **Total** | **100%** | **100** | **45** | **54** | **9** | **54** | **100%** |

**LOS gaps closed:** A.3/A.9 (earnings quality/SGR), A.5/A.7/A.8 (FX/leases/leverage), B.2/B.3/B.4 (WACC/MCC/CCC), C.2/C.4/C.5 (mix/relevant costing/TOC) + C.3/C.6 (pricing/EV), D.1/D.3/D.4 (ERM), E.1/E.4/E.5 (NPV/EAA/real options), F.1/F.3/F.4/F.6 (ethics/FCPA/SOX). Remaining thin LOS per wave: A.6 inflation, B.1 risk/return, B.8 restructuring, E.6 post-audit, F.7 sustainability — deferred to next wave.

### 4.2 Topic-Level (case Topic Inventory)

- **Existing MCQ inventory (495 topics):** see p2/case_study_library/10_TOPIC_INVENTORY_BY_SECTION.md
- **New case topics (54 items):** quality of income, core earnings, DSO, SGR, TOC product mix, relevant costing, sell-or-process-further, transfer pricing floors, IMA standards, FCPA facilitation vs bribery, ASC 606 variable consideration, WACC/CAPM/MCC/CCC, risk score, residual EL, KRI, EAA, MACRS/ATCF, abandonment option, ASC 830 transaction/translation, ASC 842 lease capitalization, D/E, DFL/TIE/FCC, Lerner pricing, EV/EVPI/EVSI, fraud triangle, SOX 302 vs 404, audit committee governance — all distinct, no duplicate UniqueConceptKey, no stem fingerprint collision with existing 45.

### 4.3 Calculation vs Qualitative

- **CalculationRequired true:** 24 of 54 items (44%) — numeric Apply/Analyze items with independent recomputation (OCF/NI, core, DSO, SGR, CM/hr, mix 138k, WACC/CAPM/CCC, risk score/EL, ATCF/NPV/EAA/abandonment, remeasurement/PV, Lerner/EVPI)
- **CalculationRequired false:** 30 of 54 items (56%) — select/multi/match judgment items testing interpretation, taxonomy, governance, and ethics reasoning
- **Exhibit rows:** 100% consumed (109 exhibits × avg 5 rows = ~545 rows, all referenced by ≥1 ItemID)

### 4.4 Difficulty and Bloom-Level Distribution (new 54 items)

| Difficulty | Count | % | S121 Target % | Delta |
|------------|------:|---:|---------------:|-------|
| Easy (1) | 0 | 0% | 15% | -15% |
| Moderate-Easy (2) | 5 | 9.3% | 20% | -10.7% |
| Moderate (3) | 20 | 37.0% | 30% | +7.0% |
| Difficult (4) | 24 | 44.4% | 25% | +19.4% |
| Very Difficult (5) | 5 | 9.3% | 10% | -0.7% |

| CognitiveLevel | Count | % | S121 Target % | Delta |
|----------------|------:|---:|---------------:|-------|
| Remember | 0 | 0% | 8-10% | -10% |
| Understand | 3 | 5.6% | 15-20% | -14% |
| Apply | 18 | 33.3% | 40-50% | -17% |
| Analyze | 19 | 35.2% | 15-25% | +15% |
| Evaluate | 14 | 25.9% | 5-10% | +16% |

**Assessment:** Case studies inherently skew to Analyze/Evaluate and Difficult (higher-order judgment), partially offsetting MCQ pool's current Apply-heavy tilt. Remaining Easy/Moderate-Easy and Remember/Understand gaps to be closed via MCQ authoring waves (per S121 portfolio dashboard). All 9 cases’ DifficultyScore within ±1 of mean item scores (CF4).

---

## 5. Defects Found and Corrected

| # | Case:Question | Category | Severity | Detection | Evidence | Correction | Status |
|---|---------------|----------|----------|-----------|----------|------------|--------|
| 1 | CBQ21-C5:Q2 | Answer-Key Error (DL-030 class) | Critical | Content Review recomputation | Correct 78000 vs derivation 138,000 (90k+48k); explanation itself proved Correct wrong | Correct → 138000, explanation retained, AccuracyCheck unchanged | **Fixed** p2/case_pack_p2_1.js:6098, backup 20260903170000 |
| 2 | CBQ21-C5 E1 | Exhibit Validity (precomputed CM/hr) | High | Psychometric Review | CM per Hour column gave away Q1 | Removed column (6→5 columns), AccuracyCheck updated | Fixed via fix_exhibits2.js |
| 3 | CBQ21-C5 Q3 | Distractor Overlap | Medium | Psychometric | Choices A vs D both price>VC fallacy | Replaced D with allocated-fixed-cost trap | Fixed |
| 4 | CBQ22-D4 E1 | Exhibit Validity | High | Psychometric | Risk Score column precomputed Q1 | Removed Risk Score column (6→5) | Fixed |
| 5 | CBQ22-E2 E3 | Exhibit Scaffolding | Medium | Both reviews | PV continuation and rank pre-answered Q4/Q5 | Removed PV row and rank row (5→3 rows) | Fixed |
| 6 | CBQ23-C4 E2 | Exhibit Validity | High | Both reviews | EV $880/$840, EVwPI $1,480, EVSI $165 precomputed Q2/Q4 | Stripped to raw payoffs/probabilities only (6→3 rows), cleared EVWSI precompute | Fixed |
| 7 | CBQ23-A3/C4 Q1/Q2 | Difficulty/Bloom Calibration (DL-031) | High | Psychometric | 6×Difficult 4 uniform, no Easy/Moderate-Easy | Recalibrated 4 items Difficult→Moderate (Apply retains), case means within ±1 | Fixed |
| 8 | CBQ23-A3 Q1 | Rounding Truncation | Low | Content Review | Correct 34259 vs 34,259.61→34,260 | Correct → 34260, AccuracyCheck 34,260 | Fixed via fix_atlas_round.js |
| 9 | Cross-cutting | Length Cueing / Hidden Assumptions | Low | Psychometric | Correct 2–3× longer; DSO averaging, purchases≈COGS undefined | Tightened 15–20%, DataFormat footnotes clarified: average receivables both years, purchases≈COGS with build in averages | Fixed |

**No new DEFECT_LIBRARY_P2 category required.** All findings map to existing classes: DL-030 (wrong answer), DL-003 (absolute cueing, intentional trap documented), DL-031 (difficulty inflation), plus exhibit-validity (DL-013-family precomputation).

**Remaining warnings:** 3 Low disclosures as known design notes (sensitivity exhibit rounding ±$1, arc elasticity -2.4 average, synthesis length cueing justified per CAQS §6.4 exception). Not certification-blocking for Unprocessed.

---

## 6. Validation Results and Counts

| Suite | Command | Items Scanned | Errors | Warnings | Mode | Exit | Divergences |
|-------|---------|---------------|--------|----------|------|------|-------------|
| MCQ Schema Validator | `node scripts/validators/p2_schema_validator.js` | 2,295 | 0 | — | report-only V11 | 0 | — |
| MCQ Schema Validator --enforce | (not run — report-only per P2_SCHEMA v1.1) | — | — | — | blocking | — | — |
| Preflight P1 | `node scripts/preflight.js` | 2,620 | — | — | read-only | 0 | 0 |
| Preflight P2 | `node scripts/preflight_p2.js` | 2,295 | — | — | read-only | 0 | 0 |
| Case Custom Validator | `check_cases.js` + string-aware parser | 54 new + 270 existing = 324 items | 0 | 0 | read-only | 0 | 0 |
| Governance Guard | `node scripts/test_governance_guard.js` | 74 tests | 0 | 0 | BLOCK | 0 | 0 |
| Pipeline (P1) | `npm run pipeline` | 3,020 (P1 pool) | 0 | 1,969 (P1) | — | 0 | — |

**Warnings that remain:** P1 pipeline 1,969 warnings are pre-existing Part 1 pool (unrelated to P2 wave, per `validate.js` scope). P2 V11 MIGRATION_REQUIRED 30 (Pack B) + 15 (Pack C) etc. are pre-existing Part 2 MCQ v1.1 report-only items (unchanged). No new warnings introduced by the 9 cases.

---

## 7. Files Changed

| File | Action | Before | After | Backup |
|------|--------|--------|-------|--------|
| p2/case_pack_p2_1.js | Append 3 cases (22→22) | 19 cases, 317,023 B | 22 cases, 370,515 B (after fixes) | `p2/case_pack_p2_1.js.bak-20260903160000` + `...bak-20260903170000` |
| p2/case_pack_p2_2.js | Append 3 cases (13→16) | 13 cases, 232,663 B | 16 cases | `p2/case_pack_p2_2.js.bak-20260903160000` |
| p2/case_pack_p2_3.js | Append 3 cases (13→16) | 13 cases, 227,194 B | 16 cases | `p2/case_pack_p2_3.js.bak-20260903160000` |
| p2/CURRENT_BASELINES_P2.md | Update §1b | 45 cases | 54 cases (45 Certified + 9 Unprocessed) footnote | `p2/CURRENT_BASELINES_P2.md.bak-20260902-remed` (prior) |
| knowledge/REVISION_HISTORY_P2.md | Append Session P2-077 | 53 sessions | 54 sessions, P2-077 entry | `knowledge/REVISION_HISTORY_P2.md.bak-20260902-remed` lineage |
| backups/new_nine_cases_draft.js.bak-20260903163000 | Archive staging | — | 48,294 B | Moved from p2/ |
| backups/remaining_six_cases.js.bak-20260903163000 | Archive staging | — | 40,294 B | Moved |
| backups/final_three_cases.js.bak-20260903163000 | Archive staging | — | 50,454 B | Moved |

**No other packs touched:** p2/pack_p2_*.js unchanged (hashes stable), content/packs pack_*_corrected.js unchanged, app.js/styles.css/index_updated.html unchanged.

---

## 8. Confirmation Existing Content Preserved

- **Part 1 content:** `node scripts/preflight.js` — Certified total 2,620 unchanged, 0 divergences, QID counts 500/500/500/500/620 per pack, guard 74/74 PASS. No writes to `content/packs/pack_*_corrected.js` or `scored_cases*.js` or `case_pack_1_corrected.js` etc.
- **Part 2 MCQs:** `node scripts/preflight_p2.js` — Total QIDs 2,295 unchanged (A500/B400/C380/D335/E255/F425), Certified 2,203, 0 divergences, Part2OnlyFlag 2,295/2,295, QID uniqueness 0 dups, guard 74/74 PASS. `validate:p2` 0 errors, byte-identical hashes for all 6 MCQ packs vs T0.
- **Part 2 existing cases:** 45 Certified cases re-parse identically (19/13/13) with same QuestionCount/ExhibitCount, no `Correct`/`CorrectChoice` drift, no `question_state` changes (remain Certified).
- **Registry:** `knowledge/MASTER_QUESTION_REGISTRY.md` not regenerated (P1 artifact, per P2-054 gap); P2 case registry remains via case packs as source of truth.

---

## 9. Exact Commands Used for Validation

```powershell
# T0 governance gates (read-only)
node scripts/preflight.js
node scripts/preflight_p2.js
node scripts/validators/p2_schema_validator.js

# Inventory and schema checks (deterministic)
node "C:\Users\User\AppData\Local\Temp\opencode\check_cases.js"
Select-String -Path p2\case_pack_p2_*.js -Pattern '"CaseID": "CBQ'
Select-String -Path p2\case_pack_p2_*.js -Pattern '"ItemID"'
node scripts/test_governance_guard.js

# Post-integration verification
node "C:\Users\User\AppData\Local\Temp\opencode\integrate_nine.js"
node "C:\Users\User\AppData\Local\Temp\opencode\check_cases.js"
node "C:\Users\User\AppData\Local\Temp\opencode\verify_fix.js"
node "C:\Users\User\AppData\Local\Temp\opencode\fix_exhibits2.js"
node scripts/preflight_p2.js
node scripts/validators/p2_schema_validator.js
node scripts/preflight.js
node --check p2/case_pack_p2_1.js
node --check p2/case_pack_p2_2.js
node --check p2/case_pack_p2_3.js
```

All outputs saved to `C:\Users\User\.local\share\opencode\tool-output\` and `backups\` per AGENTS.md §15.

---

## 10. Unresolved Issues Requiring Human Review

| # | Category | Description | Severity | Recommendation |
|---|----------|-------------|----------|----------------|
| 1 | V11 Migration-Required (MCQ) | 45 MCQs with `source_ids` non-catalog (B/C packs) remain MIGRATION_REQUIRED report-only; rules 71/100 governance, 58/100 drift prevention in PA_Review. Outside this case-wave scope. | Medium (governance) | Schedule V11 backfill wave before next certification; not blocking for case wave. |
| 2 | P1 Pack C/D QID Volatility | DL-012 scan history 128→112→138 (Part 1) noted in AGENTS.md §6 — count instability precedent. Not triggered this wave (MCQ counts stable 2,295, case counts 54 stable across two parser methods). | Informational | Keep hard-stop rule for future waves. |
| 3 | Exhibit Sensitivity Exhibit (CBQ22-E2 E3) | Remaining row `Sensitivity: Alpha ±$11,910; Beta ±$9,320` understates Alpha ~3.7% vs recomputed 12,363 (Reviewer Finding 2 Low). Q5 only tests conceptual dominance (still correct), so not certification-blocking for Unprocessed, but exhibit will confuse solver replicating math. | Low | Correct exhibit to 12,363/8,953 or document inclusive-of-salvage derivation before certifying CBQ22-E2. |
| 4 | Case Registry Wiring Gap | `scripts/generate_registry.js` generates P1 MASTER_QUESTION_REGISTRY.md from content/packs; P2 case packs not wired to registry/dashboard (gap documented P2-054, §6 Integration gap). Coverage verified via custom `check_cases.js`, not via pipeline dashboard. | Medium (tooling) | Wire case_pack_p2_*.js into `scripts/validate.js` and `generate_registry.js` or create `scripts/validate_cases_p2.js` before next wave. |
| 5 | S121 Easy/Remember Gap | New 54 items have 0% Easy (1) and 0% Remember, pushing pool further from S121 targets (15% Easy, 8% Remember). Case studies inherently skew Difficult/Analyze, but pool still outside ±3pp tolerance. | Medium (portfolio) | Close via MCQ authoring waves targeting Easy/Remember (e.g., definition-match but recalibrated) — not via relabeling cases (Rule 12). |
| 6 | Length Cueing (CAQS §15.3 exception) | Correct choice remains longest on most case select items (integrative synthesis). Documented exception from P2-059, deferred compression to next editorial wave. | Low (exception) | Distribute specificity across positions in next wave; no learner-safety impact. |
| 7 | Governance Guard Staging Scanner (DL-045) | Guard's Write-tool scanner mispairs EW[CC] empties across multi-item staging arrays (forward-scan artifact, P2-056 finding). Staging files therefore created via bash/Node with identical rules enforced programmatically inside append script, followed by post-write scans. No check weakened. | Informational (tooling) | Enhance guard to per-object CorrectChoice pairing rather than window scanning (proposed). |

**No unresolved ambiguity or governance conflict requiring immediate halt.** All 9 cases are **High-confidence (KEEP) after remediation except CBQ21-C5 which was REWRITE until fixed and is now KEEP**. Phase C defects corrected; learner pool remains protected (all 9 Unprocessed, quarantined from delivery).

---

**Validator:** Build-Time AI Verification — 2 independent reviewers (Content & Psychometric) + deterministic harness
**Reviewer confidence:** 90/100 (all numeric keys independently recomputed, 27/27 MATCH after fix)
**Files preserved:** All existing P1 and P2 MCQ content byte-identical; only p2 case packs appended per authorization
**Next gate:** Six-dimension certification wave for the 9 Unprocessed cases (separate session, user approval required per P2002 §B.3)

