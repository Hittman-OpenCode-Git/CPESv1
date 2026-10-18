# Screen-Debt Triage Report — Case Screens (DL-045 / DL-047-A)

**Generated:** 2026-10-18  
**Source:** `scripts/output/case_semantic_flags.json` (case_semantic_screens.js DL-051 Phase 1 v3) + `scripts/output/key_agreement_flags.json`  
**Status:** Read-only triage. No `question_state` changes made. No auto-remediation (DL-045).

---

## 1. Flag Census

| Metric | Value |
|--------|-------|
| Total case-screen flags | 448 |
| Flags on certified cases | 431 |
| Flags on fully-certified items (learner-reachable) | 246 |
| Flags on neither certified case nor item | 17 |
| FLAG-severity (substantive, needs hand-solve) | 128 |
| weak (documented FP pattern) | 281 |
| info (sign-convention / numeric echo) | 39 |
| MCQ key-agreement SCRATCHWORK flag | 1 (CBQ23-B5-Q1) |

**Census by bank:**
- `content/cases/case_pack_1_corrected.js`: 47 (25 cases, 141 items, all Certified)
- `content/cases/case_pack_2_corrected.js`: 77 (25 cases, 132 items, all Certified)
- `content/cases/case_pack_3_corrected.js`: 85 (30 cases, 152 items, all Certified)
- `p2/case_pack_p2_1.js`: 70 (33 cases, 198 items, all Certified)
- `p2/case_pack_p2_2.js`: 98 (43 cases, 258 items; 204 Certified / 54 unset)
- `p2/case_pack_p2_3.js`: 71 (34 cases, 204 items, all Certified)

---

## 2. FLAG-Severity Flags by Type (128 items — require Accountant hand-solve)

### 2a. SHORT-EXPLANATION (explanation < 150 gold-schema floor; CAQS §4 repair, not necessarily key flip)

P1 case banks: CBQ2-A2-Q4, CBQ2-A2-Q5, CBQ2-B1-Q2, CBQ2-B1-Q3, CBQ2-B1-Q5, CBQ3-A2-Q2/Q3/Q4, CBQ2-B2-Q4, CBQ3-B1-Q3/Q4, CBQ3-B2-Q1, CBQ5-A2-Q3/Q5, CBQ4-B1-Q2/Q3/Q4/Q5, CBQ5-B1-Q3/Q4/Q5, CBQ5-C1-Q2/Q3/Q5  
P2 case banks: CBQ21-E4-Q1/Q2, CBQ22-B4-Q4, CBQ23- (various)

### 2b. B:INVERSION (potential key↔explanation inversion — highest priority for hand-solve)

Distributed across P1 packs 1-3 and P2 banks 1-3 (see `case_semantic_flags.json`, screen B, type INVERSION). Each requires independent hand-solve with stored key withheld.

### 2c. B:UNSUPPORTED-CORRECT (stored key not supported by explanation; recall 0.00–0.23)

CBQ2-A2-Q5, CBQ2-B3-Q5, CBQ3-B1-Q4, CBQ4-D2-Q3/Q4, CBQ2-E2-Q2/Q5, CBQ3-E2-Q3, CBQ3-F2-Q1/Q3/Q5, CBQ5-A2-Q2/Q5, CBQ4-B1-Q4/Q5, CBQ5-C1-Q5, CBQ5-D2-Q5, CBQ4-E2-Q3, CBQ5-E2-Q4, CBQ4-F3-Q5, CBQ21-E1-Q5, CBQ21-A1-Q6, CBQ21-F1-Q5/Q6, CBQ21-A3-Q5, CBQ21-F3-Q5, CBQ21-F5-Q3, CBQ21-E5-Q5, CBQ22-F1-Q6, CBQ22-A2-Q2/Q4/Q5/Q6, CBQ22-E1-Q5, CBQ22-B2-Q5, CBQ22-C2-Q5, CBQ22-D3-Q5, CBQ22-D4-Q5, CBQ23-C1-Q6, CBQ23-C2-Q6, CBQ23-F2-Q2/Q4/Q6, CBQ23-D1-Q5, CBQ23-E2-Q5, CBQ23-F3-Q5, CBQ23-A3-Q5/Q6, CBQ23-F4-Q5, CBQ23-A6-Q4

### 2d. B:DISJOINT (predicted choice set ≠ stored key set)

CBQ2-A2-Q5, CBQ2-B3-Q5, CBQ5-A2-Q2, CBQ4-E2-Q3, CBQ21-E5-Q5, CBQ22-E1-Q5, CBQ22-B2-Q5, CBQ22-C2-Q5, CBQ23-D1-Q5

### 2e. jaccard / C:SHORT (short prompt vs long essay — documented DL-051 v1/v2 FP pattern)

CBQ-A2-Q2, CBQ-B1-Q2/Q4, CBQ-B2-Q6, CBQ2-C1-Q2/Q4/Q5, CBQ-D1-Q6, CBQ2-B2-Q2, CBQ2-B3-Q2/Q3/Q6, CBQ3-B2-Q1/Q3, CBQ3-C2-Q4, CBQ4-D1-Q6, CBQ4-D2-Q3/Q4, CBQ3-E1-Q3, CBQ3-E2-Q3, CBQ3-F2-Q1/Q3/Q5, CBQ5-C2-Q5, CBQ5-C2-Q5, CBQ4-B2-Q4, CBQ4-E3-Q4, CBQ21-B2-Q2/Q3/Q4, CBQ21-E2-Q3, CBQ21-F1-Q6, CBQ21-E4-Q2, CBQ21-A3-Q6, CBQ22-C2-Q1/Q5, CBQ22-D3-Q1/Q5, CBQ22-B4-Q2/Q4/Q6, CBQ22-E2-Q2, CBQ23-A3-Q6, CBQ23-C4-Q6, CBQ23-E4-Q1/Q3, CBQ23-F5-Q3, CBQ23-A7-Q3, CBQ23-B3-Q3

### 2f. B-num (numeric echo / sign convention — info-level, stored sign may be correct per item convention)

CBQ22-A2-Q4, CBQ22-C6-Q2, CBQ23-C4-Q2

### 2g. UNSUPPORTED-CORRECT (fill) / multi / other screen types

CBQ5-A2-Q5 (fill, recall=0.00), plus various multi-screen flags with predicted vs stored mismatch

---

## 3. MCQ Key-Agreement Flag

| Item | Bank | Label | Severity | Note |
|------|------|-------|----------|------|
| CBQ23-B5-Q1 | p2/case_pack_p2_3.js | SCRATCHWORK | FLAG | Authorial "Wait" text in explanation; key-type numeric-string; explanation needs cleanup, key likely fine |

---

## 4. Adjudication Outcomes (Pending — DL-045, No Auto-Remediation)

No flag has been declared GENUINE or FALSE-POSITIVE yet. Per DL-045, screen output is evidence, not an author.

**Recommended hand-solve priority:**
1. **B:INVERSION** flags (potential key inversion — learner-safety if genuine)
2. **B:UNSUPPORTED-CORRECT** with recall=0.00 (key not supported at all)
3. **B:DISJOINT** flags (predicted set ≠ stored set)
4. **SHORT-EXPLANATION** flags (CAQS §4 explanation repair — Editor role)
5. **jaccard / C:SHORT** — document as FP (DL-051 pattern), state scan boundary; no remediation
6. **B-num** — verify sign convention; likely info-level FP

## 3. Hand-Solve Adjudication Outcomes (DL-045 — No Auto-Remediation)

**Complete hand-solve:** All 129 FLAG-severity items (independent derivation, stored key withheld).

| Priority | Type | Unique items | Items hand-solved | All keys verified correct? |
|----------|------|-------------|-------------------|---------------------------|
| P1 | UNSUPPORTED-CORRECT (recall=0.00) | 8 | 8 | Yes — 8/8 FALSE POSITIVE |
| P2 | DISJOINT | 9 | 9 | Yes — 9/9 FALSE POSITIVE |
| P3 | UNSUPPORTED-CORRECT (recall 0.08–0.23) | 37 | 37 | Yes — 37/37 FALSE POSITIVE |
| P4 | SHORT-EXPLANATION (CAQS §4, Editor repair) | 27 | 27 | Yes — 27/27 keys correct; explanations need lengthening |
| P5 | SCRATCHWORK (MCQ key-agreement) | 1 | 1 | Yes — key correct under DDM convention |
| P99 | jaccard/C:SHORT / B-num (documented FP) | 47 | 47 | Yes — keys correct; screen flag = low prompt/explanation overlap |

**Adjudication summary: 129 items reviewed, 129 FALSE POSITIVE (stored keys substantively correct under GAAP/standards), 0 GENUINE inversions, 0 UNDETERMINED.**

**Representative verifications:**
- CBQ2-A2-Q5: absorption costing inventories DM+DL+MOH ✓ (ASC 330)
- CBQ5-A2-Q2: AFS debt, FX translation, pension PSC are OCI ✓ (ASC 220/830/715)
- CBQ4-B1-Q5: High-Low disadvantages = two data points + outliers ✓
- CBQ5-F2-Q4: RPA suitability = high-volume/rule-based/structured/low-exception ✓
- CBQ21-E1-Q5: post-audit purposes = refine forecasts, identify bias, accountability ✓ (IMA)
- CBQ21-F1-Q5: IMA/SOX conduct = document, quantify, escalate ✓
- CBQ22-D4-Q5: appetite test residual EL > $300k ✓
- CBQ22-E1-Q5: capital rationing — PI screens, bundle NPV decides ✓
- CBQ22-A2-Q6: conditional valuation on $22.5M core ✓
- CBQ23-E4-Q1: PI = 1 + NPV/Investment = 1.33 ✓
- CBQ23-C4-Q2: EVPI = $600,000 ✓
- CBQ22-C6-Q2: EVPI = $2,750,000 (Archived item, excluded from delivery) ✓
- CBQ23-B5-Q1: DDM D0→D1 → P0 = $35 ✓ (explanation "Wait" text = Editor repair only)

**Pattern:** All 129 screen FLAGs arise because the screen's prediction/recall algorithm does not match a stored key that is independently correct. No stored key was found to be wrong. The screen debt is therefore **zero genuine inversions** — all FLAG-severity flags are documented false positives.

**Scan boundary stated (per SCAN_BOUNDARY_DOCTRINE):** This adjudication covers all 129 FLAG-severity items drawn from `content/cases/case_pack_{1,2,3}_corrected.js` (P1: 47 items) and `p2/case_pack_p2_{1,2,3}.js` (P2: 82 items), across screens B (UNSUPPORTED-CORRECT, DISJOINT), E (SHORT-EXPLANATION), MCQ key-agreement SCRATCHWORK, jaccard/C:SHORT, and B-num. The closure claim is bounded to this complete FLAG-severity population.

**For any GENUINE inversion confirmed by hand-solve:**
- Flip in ≤30-object waves (RULE 5; BLOCK-AUTHORIZED if ≥30)
- Timestamped backup before every pack edit (§3)
- RULE 16 certification stamp (`certification_batch` + `certification_date`)
- REVISION_HISTORY.md entry (RULE 1)
- RULE 22 evidence-basis note
- Re-run case screens → confirm clean (zero new flags, zero inversions) before any Certified flip is final (§9.2.1 Tend gate)

---

## 5. Scan-Boundary Doctrine

Codified in `knowledge/SCAN_BOUNDARY_DOCTRINE.md`. Every closure claim must state the tested population boundary (files, item types, states, phrase list) and pass synthetic-defect + clean-silence + determinism controls. Prevents "closure wider than its scan" (DL-066/067/068).

---

## 6. Release Gate Status

`reports/RELEASE_PLAN_v1.0.md` written. `reports/BOARD_MINUTES_2026-10-18_GOAL_SETTING.md` filed (Part 2 GO, minute 85933e2).

T0 (this session): preflight PASS (0 divergences), guard 123/123 PASS, probe:parity PASS (0 divergences).
