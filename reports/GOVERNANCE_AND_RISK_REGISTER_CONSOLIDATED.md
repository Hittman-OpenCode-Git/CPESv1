# Governance and Risk Register — Consolidated

**Purpose:** Single consolidated governance register covering current Certified denominators, pack-level structural status, TIER table, and open risks with priorities.

**Generated:** 2026-07-24 — Session 20
**Updated:** 2026-07-24 — Session 59 (Post-standardization audit: case-study move verification FAILED — 60 standard cases still in MCQ packs, 2 parallel systems; scoring model verified PASS; difficulty vocabulary needs expansion from 3→5 tiers; 3 critical/high content fixes identified; prior update: Session 57)
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md
**Sources:** CURRENT_BASELINES.md, DEFECT_LIBRARY.md, SESSION_STATUS_2026-07-23.md, FD045_CROSS_SESSION_REFERENCE.md, SESSION31_RECONCILIATION_EXECUTION.md

---

## 0. Current State Capsule (2026-07-24)

**FD-045 is closed and Pack D is structurally complete.** Pack D (`pack_d_corrected.js`) parses 500/500 objects (SHA-256 `49C465E3EA4A3B88E6750FF4894D51021F7926A90A6417BE1DB596B735980E4D`, 1,889,734 bytes). The missing `},` separator at the P1-FD-045 / P1-FD-046 boundary was repaired in Session 28 and independently verified in Session 31 via `Function` constructor parse. P1-AD-075 remains `question_state: "Certified"` with `CorrectChoice: "C"`, unchanged. The anti-reversion safeguards — hash verification against CURRENT_BASELINES.md, periodic parse-count checks (≥500), and FD-045 presence check — are documented in `reports/FD045_CROSS_SESSION_REFERENCE.md`.

**app.js is at a reconciled trusted baseline** (SHA-256 `64814CC489A96946423A6242F8F10EE659C79D50047117C7CAAB7A3CFFA02931`, 164,837 bytes). The full provenance chain is documented: S16 CMA scoring (120,848 bytes) → S17B Performance Analytics (146,610 bytes, `6E972362...`) → S25 Readiness Modeling & Study Plan (164,451 bytes) → external OneDrive drift to current (+13 bytes). All four scoring functions (`scoreMCQ`, `correctCase`, `practiceScores`, `selectWithDifficultyDistribution`) are byte-identical to the S17B analytics baseline. The 3-layer architecture (scoring → analytics → readiness/study-plan) is intact and read-only — the readiness layer ingests analytics but does not alter scoring formulas, answer-key determination, or question selection.

**The Session 31 5-gate reconciliation runbook** (G1: Pack Structural, G2: Certified Ledger, G3: APPJS Provenance, G4: index_updated.html Provenance, G5: Governance Documentation) has been executed once with all gates passing (2026-07-24), requiring zero pack-file writes. The BCDE Certified denominator was verified at 874 (B=350, C=175, D=248, E=101). The runbook is the standard reconciliation pattern for any future baseline drift or governance inconsistency — see `reports/SESSION31_RECONCILIATION_EXECUTION.md` for the canonical gate definitions, decision logic, and continue/stop/escalate conditions.

**Tripartite agreement:** CURRENT_BASELINES.md, this risk register, and the on-disk SHA-256 hashes are in full agreement as of Session 31 (verified Session 52). All 13 runtime-critical hashes are stable. No pack files, `app.js`, or scoring logic were modified in this governance pass (Session 52).

**Process note:** Future reconciliation sessions detecting baseline drift or governance inconsistency must reuse the Session 31 G1–G5 gate sequence rather than invent new gate sequences; only adapt pack lists or document lists as needed, but do not relax the continue/stop/escalate conditions or the dual-method verification discipline (Function constructor parse + grep).

---

## 1. Certified Pool — Denominator Reconciliation

### Unique QuestionID Counts

| Pack | Total QIDs | Certified | Sections Closed | Sections Open |
|------|-----------|-----------|-----------------|---------------|
| Pack A | 500 | **204** | A (75), E (59 active + 16 Archived) | B (100), C (100), D (75), F (75) |
| Pack B | 500 | **350** | B (100), C (100), E (75), F (75) | A (75), D (75) |
| Pack C | 500 | **175** | A (75), B (100) | C (75), D (75), E (75), F (75) |
| Pack D | 500 | **248** | A (73), B (100), D (75) | C (75), E (75), F (75) |
| Pack E | 500 | **101** | — (partial) | All sections partial |
| **Total** | **2,500** | **1,078** | | **1,422 remaining** |

### State-Occurrence vs. Unique Distinction

- **Unique Certified QIDs:** 1,078 (counted by distinct QuestionID)
- **Grep count (`question_state: "Certified"`):** May differ due to duplicate fields (e.g., P1B-B-153 had 2 occurrences pre-S18)
- **Runtime-accessible Certified:** ~874 in default BCDE pool; 1,078 when Pack A is opted in via practice-only mode (S26 Policy B)
- **Defective Certified in learner pool:** See TIER 0 items below

### Verification Method

```
Select-String -Path pack_*_corrected.js -Pattern '"question_state": "Certified"' | Measure-Object
```

Count must be cross-checked against unique QID count. Discrepancies indicate duplicate-state artifacts.

---

## 2. Pack-Level Structural Status

| Pack | Structurally Complete | DL-008 (Certified) | DL-008 (Non-Cert) | DL-013 Remaining | DL-026 Remaining | Parseable |
|------|----------------------|-------------------|-------------------|-----------------|-----------------|-----------|
| **A** | Partial | ~2 (B-001, B-025) | 173 | 238 fields / 94 QIDs | ~3 spot-check finds | Yes |
| **B** | Yes (S18) | **0** | 0 | 0 | 0 | Yes (after DL-017 fix) |
| **C** | Partial | 174 (A+B sections) | 51 | 357 fields / 159 QIDs | ~3 spot-check finds | Yes |
| **D** | Yes (S28) | 1 (BD-001) | 37 | 256 fields / 113 QIDs | **0** (all cleared) | Yes (500/500 parseable) |
| **E** | Partial | 1 (P1E-B-079) | N/A | 0 | **0** | Yes |

### Pack-Specific Notes

**Pack A:** Section A fully certified (73/73, 2 Archived). Section E: 50 Certified + 16 Archived clones + 9 replacement items (Unprocessed) + 9 lost = 75. Sections B, C, D, F: 296 uncertified. **Loaded by index_updated.html (S26) — checkbox defaults to unchecked (practice-only opt-in, Policy B).** 204 Certified items accessible via explicit user opt-in as legacy/extra practice content. Default BCDE runtime unchanged.

**Pack B:** Sections B/C/E/F fully certified (350). Sections A/D: 150 items, structurally clean, `question_state: "Unprocessed"` added by S18/DL-024. Ready for CAQS §1.6 six-dimension verification. DL-017 backtick-newline corruption resolved.

**Pack C:** Sections A/B fully certified (175). BC-094/095 repaired (S11). 174 Certified items carry DL-008 with CorrectChoice rotation artifact — quarantined Tier 1.

**Pack D:** Sections A/B/D certified (248). AD-075: TIER 1 classification REFUTED by S17 — content block always present; DL-020 false positive. **P1-FD-045 CLOSED (S28/S31 verified).** S28 structural re-repair restored `},` separator at FD-045/FD-046 boundary. 500/500 objects parse via `Function` constructor. FD-045 and FD-046 independently present with clean object boundaries. Current hash: `49C465E3...` / 1,889,734 bytes. Anti-reversion safeguards in place.

**Pack E:** Different authorship pipeline. 101 Certified across sections. P1E-E-048: TIER 0 governance defect. DL-018 resolved (351 missing EW[CC] fields added). DL-021: 5 Certified items remediated; 95 remain.

---

## 3. TIER Table — Consolidated

### TIER 0 — Governance / LOS-Required (Learner-Safety Critical)

| ID | Item/Scope | Pack | Status | Detail | Priority |
|----|-----------|------|--------|--------|----------|
| T0-001 | P1E-E-048 | E/E | **OPEN** | Stem-choice mismatch — answer key may be incorrect. Referenced S15. | **CRITICAL** |
| T0-002 | DL-008 — Pack C Certified | C/A+B | **OPEN** | 174 Certified items with non-empty EW[CC] + CorrectChoice rotation artifact (129 of 174 have CC ≠ EC best match). Quarantined Tier 1. | **CRITICAL** |
| T0-003 | Pack A not loaded | All | **RESOLVED (S26)** | `<script>` tag added to index_updated.html. Pack A checkbox defaults to unchecked (practice-only opt-in). Labeled "Legacy / Extra Practice." Policy B — default BCDE runtime unchanged; Pack A accessible via explicit user opt-in. 204 Certified items now available as extended practice content. | **RESOLVED** |

### TIER 1 — Structural Defects Awaiting Repair

| ID | Item/Scope | Pack | Status | Detail | Priority |
|----|-----------|------|--------|--------|----------|
| T1-001 | P1-AD-075 content block | D/A | **CLOSED (S17)** | DL-020 false positive. Content block verified present. | N/A |
| T1-002 | P1B-B-153 duplicate state | B/B | **CLOSED (S18)** | Duplicate `question_state` removed. Count aligned. | N/A |
| T1-003 | DL-008 — non-Certified | A/C/D | **OPEN** | 261 non-Certified items. Not in learner pool. | Medium |
| T1-004 | DL-026 — remaining | A/C/D | **OPEN** | ~27 items with empty non-CC ExplanationWrong slots. ~6 Certified. | Medium |
| T1-005 | DL-021 — Pack E Section C | E/C | **OPEN** | 95 items need 285 distractor explanations authored. 5 Certified items remediated. | Medium |
| T1-006 | P1-FD-045 parse gap | D/F | **CLOSED (S28/S31 verified)** | 500/500 objects parse. S28 `},` separator repair holding. Anti-reversion safeguards in place. Verified independent of brace-matcher (Function constructor). | N/A |

#### T1-006 — FAIR-Aligned Risk Record

| Field | Value |
|-------|-------|
| **Risk ID** | T1-006 |
| **Asset** | `pack_d_corrected.js` — Pack D, Section F, P1-FD-045 / P1-FD-046 object boundary |
| **Status** | **CLOSED** |
| **Date Opened** | 2026-07-23 (Session 18 — FD-045 parse gap discovered; 499 objects parsed vs. 500 QIDs) |
| **Date Re-Opened** | 2026-07-24 (Session 23 — OneDrive sync reverted Session 18.5 repair: `F5F60DB0...` → `DEB235BE...`) |
| **Date Closed** | 2026-07-24 (Session 28 — structural re-repair applied; Session 31 — independently verified holding) |
| **Description** | A missing `},` object separator at the P1-FD-045 / P1-FD-046 boundary caused both QIDs to merge into a single JavaScript object, reducing Pack D's parseable object count from 500 to 499. No content was lost — all stems, choices, CorrectChoice values, explanation fields, and metadata were intact across both QIDs. |
| **Cause** | Template-based authoring pipeline omitted the closing-brace/comma/opening-brace separator between adjacent objects in the 5-item rotation group. |
| **Mitigation** | Session 28: Restored `},` at the FD-045/FD-046 boundary (+13 bytes: 1,889,721 → 1,889,734). All content fields preserved unchanged. |
| **Residual Risk** | **LOW.** The repair is structural only (punctuation/whitespace). Anti-reversion safeguards: (a) pre-session SHA-256 verification against `49C465E3...`, (b) periodic parse-count checks (≥500 via Function constructor), (c) FD-045 object-presence check. OneDrive sync pause recommended during sessions to prevent external reversion. |
| **Current State** | SHA-256 `49C465E3EA4A3B88E6750FF4894D51021F7926A90A6417BE1DB596B735980E4D` / 1,889,734 bytes / 500/500 objects parseable / FD-045 and FD-046 independently present with clean object boundaries |
| **Long-Run Verification** | Session 53 (2026-07-24): CAPA controls stress-tested over 3 timepoints (T0, Tmid, Tend) across a multi-agent governance session. All 5 CAPA checks (hash, parse-count, FD-045 presence, FD-046 presence, AD-075 Certified) passed consistently at all 3 timepoints. Zero governance incidents. See `reports/SESSION53_LONGRUN_GOVERNANCE_EXECUTION.md` §A.2. |
| **Cross-References** | `reports/FD045_CROSS_SESSION_REFERENCE.md`, `reports/SESSION28_P1FD045_REREPAIR_AND_ANTI_REVERSION_EXECUTION.md`, `reports/SESSION31_RECONCILIATION_EXECUTION.md`, `knowledge/DEFECT_LIBRARY.md` DL-008 §Learner-Safety Status, `knowledge/CURRENT_BASELINES.md` §3 |
| T1-007 | Pack B Sections A/D | B/A+D | **OPEN** | 150 items: structurally clean, `question_state: "Unprocessed"`. Ready for CAQS §1.6 verification. | Medium |

### TIER 2 — Editorial / CAQS Tasks (Non-Blocking)

| ID | Item/Scope | Pack | Status | Detail | Priority |
|----|-----------|------|--------|--------|----------|
| T2-001 | DL-013 remaining boilerplate | A/C/D | **OPEN** | ~851 fields across 366 QIDs. Zero Certified. | Low |
| T2-002 | DL-012 Section E clones | C/D | **OPEN** | 140 clone items. Remediation plan documented. | Low |
| T2-003 | DL-009 incorrect ASC citations | A | **OPEN** | P1-A-012, P1-BC-065. Open. | Low |
| T2-004 | DL-015 Topic numbering shift | A/E | **OPEN** | E.040-E.042 cosmetic offset. | Low |
| T2-005 | DL-016 Metadata-block shift | A/E | **OPEN** | E.038-E.042 metadata-content mismatch. Content blocks correct. | Low |
| T2-006 | DL-017 backtick-newline | B | **CLOSED (S18)** | 275 corruption sites fixed. | N/A |
| T2-007 | DL-018 missing EW[CC] | E + A/E | **CLOSED (S18)** | 351 items: ExplanationWrong[CC] fields added as "". | N/A |
| T2-008 | DL-019 concurrent-write | C/D | **CLOSED (S18)** | Overwritten DL-008 remediation re-executed. File-lock protocol not yet implemented. | N/A |
| T2-009 | DL-020 brace-matcher | Validator | **CLOSED (S18)** | String-aware parser applied to ExplanationValidator. | N/A |
| T2-010 | DL-022 null-array crash | app.js | **CLOSED (S18)** | Two-insertion fix: lines 1182 and 2004-2005. | N/A |
| T2-011 | DL-023 Exhibit headers | Cases 3-5 | **CLOSED (S18)** | 17 exhibits: Headers+Rows normalized from Body. | N/A |
| T2-012 | DL-024 missing question_state | B/A+D | **CLOSED (S18)** | 150 items: `question_state: "Unprocessed"` added. | N/A |
| T2-013 | DL-025 empty non-CC EW | A/B+D | **PARTIAL** | 51 Certified Section D items remediated (WAVE 1). 5 items remain (WAVE 2). | Low |
| T2-014 | DL-027 closing-tag boilerplate | A | **CLOSED (S18)** | 15/15 tags removed. | N/A |
| T2-015 | DL-028 DL-013 tooling regression | N/A | **OPEN** | Remediation scripts create empty slots. Tooling fix documented. | Low |
| T2-016 | DL-029 regex false positives | N/A | **OPEN** | CC-offset methodology defect. Scan scripts need CC-position-aware update. | Low |
| T2-017 | DL-030 CorrectChoice errors | B+E | **CLOSED (S24)** | 5 items: P1B-B-119, P1B-F-084/116/121, P1E-E-037. All 5 corrected. | N/A |
| T2-018 | DL-033 naming confusion | N/A | **CLOSED** | "Pack E" vs. "Pack A Section E" disambiguation documented. | N/A |
| T2-019 | APPJS-PROVENANCE-GATE | app.js | **RESOLVED (S29)** | Provenance investigation (S24) confirmed S16→S17B (Performance Analytics)→S25 (Readiness Modeling) chain. External OneDrive drift from S25 post-write (`AB620926...`, 164,824 bytes) to current on-disk (`64814CC489...`, 164,837 bytes, +13 bytes) is documented. All transitions accounted for. Current hash adopted as trusted baseline in CURRENT_BASELINES.md. | N/A |

### Cross-Reference: Remaining Defects by DL-ID

| DL-ID | Status | Remaining Items/Fields |
|-------|--------|----------------------|
| DL-008 | OPEN | 174 Certified (Pack C A+B) + 261 non-Certified (A/C/D) |
| DL-009 | OPEN | 2 items (incorrect ASC citations) |
| DL-010 | OPEN | P1-A-029 + potential undiscovered misassignments |
| DL-012 | OPEN | 140 clone items (28 groups) |
| DL-013 | OPEN | ~851 fields / 366 QIDs |
| DL-015 | OPEN | 3 items (cosmetic) |
| DL-016 | OPEN | 5 items (cosmetic). ALSO: DL-016 scan artifact discovered S501 — cross-object CC reading caused false-positive rotation artifact flags on Pack D Section C (39 In Audit items falsely flagged as DL-008+DL-026; verified structurally clean). |
| DL-021 | OPEN | 95 items (285 fields) |
| DL-025 | PARTIAL | 5 items (WAVE 2 deferred) |
| DL-026 | OPEN — Updated S502 | **55 Certified** Pack D Section C items with empty non-CC EW slots (within-object CC verified). Pattern: 25 CC=A (EW_B empty), 25 CC=D (EW_A empty), 6 CC=B/C (EW_C/D empty + DL-008). 50 items DL-026 only; 6 items DL-008+DL-026 combo. Remediation plan: Phase 1 (11 combo items), Phase 2 (50 DL-026-only). Previously 39 In Audit items confirmed clean (S501). | |
| DL-028 | OPEN | Tooling fix not implemented |
| DL-029 | OPEN | Methodology correction not implemented |

---

## 4. Open Risks — Prioritized

### Priority: CRITICAL

| Risk | Detail | Next Step |
|------|--------|-----------|
| P1E-E-048 TIER 0 | Stem-choice mismatch on Pack E Section E Certified item. Answer key may be incorrect. | Audit P1E-E-048 content block. Correct answer key if wrong. |
| Pack C DL-008 Certified | 174 Certified items with non-empty EW[CC] + CC rotation artifact (129/174 have CC ≠ EC). Simple clear unsafe. | CorrectChoice audit required before EW[CC] clear. Quarantined Tier 1. |
| Pack A not loaded | `pack_a_corrected.js` now loaded via index_updated.html (S26). Checkbox unchecked by default — practice-only opt-in. 204 Certified items accessible as legacy/extra practice. BCDE default runtime unchanged. | No further action required. T0-003 resolved. |

### Priority: HIGH

| Risk | Detail | Next Step |
|------|--------|-----------|
| DL-008 — non-Certified | 261 items across Packs A/C/D. | Batch remediation per BACKUP_PROTOCOL.md. |
| DL-026 — Certified residual | ~6 Certified items with empty distractor ExplanationWrong slots. | Targeted batch remediation. |
| DL-021 — Pack E Section C | 95 items need 285 distractor explanations authored. | Batch authoring per governance-guard Rule 5. |
| Pack B Sections A/D certification | 150 structurally clean items ready for CAQS §1.6 verification. | Human-authorized certification pass. |

### Priority: MEDIUM

| Risk | Detail | Next Step |
|------|--------|-----------|
| DL-013 remaining | ~851 boilerplate fields. Non-Certified, no learner impact. | Per-wave editorial enhancement. |
| DL-012 Section E clones | 140 clone items. Remediation plan ready. | Option A (Archive) vs. Option B (Re-key UniqueConceptKey). |
| DL-029 scan methodology | Scan scripts may produce false positives on DL-008/DL-026. Confirmed in S501: Pack D Section C CC readings from cross-object (DL-016 offset) produced false-positive rotation artifact flags on 39 In Audit items. All 39 structurally clean when CC read from same-object. | Update scripts to be CC-position-aware (within-object, not forward-scan). |

### Priority: LOW

| Risk | Detail | Next Step |
|------|--------|-----------|
| DL-009 ASC citations | 2 items with wrong ASC references. | Fix during next certification pass. |
| DL-015/016 metadata | Cosmetic numbering shifts. | Fix during next certification pass. |
| DL-025 WAVE 2 | 5 non-Certified items with empty non-CC EW slots. | Deferred. |
| DL-014 null guard | app.js:1187 sibling null guard missing. | Defensive hardening. |
| DL-028 tooling regression | DL-013 scripts create empty slots. | Fix script post-processing. |

---

## 5. Runtime Architecture Governance

### Scoring — Immutable Rules

| Rule | Detail |
|------|--------|
| MCQ scoring | Binary 0/1. No partial credit, no negative marking. |
| CBQ scoring | Per-item partial credit (correctCase). Fractional case total. |
| Weighting | Fixed 75% MCQ / 25% CBQ. Not configurable. |
| Scale | 0-500 linear mapping. Passing = 360. |
| Difficulty calibration | Forms (easier/standard/harder) applied AFTER weighting. Small magnitude (±8 scale points, ±2% factor). |
| MCQ gate | 50% threshold. Gate not met → session ends, no CBQ access. |

### Constraints on Future Modifications

- MCQ binary semantics must not change unless CMA guidance changes.
- 75/25 weighting must not change unless CMA guidance changes.
- 0-500 scale formula must not change unless CMA equating methodology changes.
- Difficulty presets may be tuned but must remain small-magnitude.

### Algorithm Documentation

Full specification in `docs/ALGORITHMS_SCORING_AND_ANALYTICS.md` (created Session 20).

---

## 6. Long-Run CAPA Verification

### 6.1 FD-045 / Pack D CAPA — Repeated Timepoint Verification

The FD-045 CAPA controls (T1-006) have been stress-tested across multiple timepoints during Session 53 (2026-07-24), a long-run multi-agent governance pass. The verification protocol:

| Check | Method | Expected | T0 Pass? | Tmid Pass? | Tend Pass? |
|-------|--------|----------|----------|------------|------------|
| Pack D SHA-256 | `Get-FileHash -Algorithm SHA256` vs `49C465E3...` | MATCH | YES | YES | YES |
| Pack D parse count | `Select-String -Pattern '"QuestionID"' | Measure-Object` | 500 | YES | YES | YES |
| FD-045 object present | Function constructor parse → `find(QID)` | Found | YES | YES | YES |
| FD-046 object present | Function constructor parse → `find(QID)` | Found | YES | YES | YES |
| AD-075 Certified | Function constructor parse → `question_state: "Certified"`, CC=C | Certified+unchanged | YES | YES | YES |

**Result:** All 5 CAPA controls held consistently across 3 timepoints with zero variance. This confirms the S28 structural repair (`49C465E3...`) is stable under extended multi-agent operation. The anti-reversion safeguards (hash verification, periodic parse-count checks, FD-045/FD-046 presence check) are proven effective.

### 6.2 Long-Run Verification Standard

Future long-running sessions (>30 minutes or >3 agents) must perform:
1. **T0 baseline capture** — all 13 runtime hashes vs CURRENT_BASELINES.md
2. **Tmid CAPA re-check** — Pack D + app.js hash and parse count
3. **Tend final verification** — all 13 hashes re-checked vs T0

See `reports/SESSION53_LONGRUN_GOVERNANCE_EXECUTION.md` §C.2 for the full runtime governance checklist.

---

## 7. Standardization Baseline — Session 55 Audit (2026-07-24)

### 7.1 Audit Verdict

Per `reports/SESSION55_STANDARDIZATION_AND_DIFFICULTY_AUDIT.md`:

**MOSTLY STANDARDIZED WITH MINOR SCHEMA/DIFFICULTY DRIFT.** All 10 pack/case files parse successfully with zero duplicate IDs. The core schema is consistent, the difficulty labeling convention is uniform (but compressed to 3 of 5 tiers), and 44% of MCQs lack `question_state`. All 75 cases are Unprocessed (0 Certified).

### 7.2 Standardization Metrics

| Metric | Value |
|--------|-------|
| Total MCQs | 2,500 (5 packs × 500) |
| Total cases | 75 (5 files × 15) |
| Total case items | ~435 |
| Duplicate IDs | 0 |
| Parse failures | 0 |
| Difficulty labels in use | 3 of 5 (Moderate-Easy and Very Difficult absent) |
| MCQs missing `question_state` | 1,101 (44%) |
| Certified MCQs | 1,078 (43.1%) |
| Certified cases | 0 (0%) |

### 7.3 Remediation Priority

| Tier | Scope | Status |
|------|-------|--------|
| TIER 0 | DL-008 on 174 Certified Pack C items | **OPEN — learner-safety critical** |
| TIER 1 | Add `question_state` to 1,101 MCQs | Open |
| TIER 2 | Rebalance difficulty to 5-tier scale | Open |
| TIER 3 | Schema normalization (flat ChoiceA-D for B/E, DifficultyScore for A/C/D) | Open |
| TIER 4 | Case-study structural fixes and certification | Open |

### 7.4 Target Standards

Future certification and remediation must converge on:
- **Gold Schema:** `docs/ITEM_BANK_GOLD_SCHEMA.md` — canonical field definitions, invarians, lifecycle states
- **Difficulty Vocabulary:** `docs/DIFFICULTY_VOCABULARY_AND_DISTRIBUTION.md` — 5-tier scale, mapping, targets
- **Root-Folder Policy:** `docs/ROOT_FOLDER_POLICY.md` — what belongs in root vs. subfolders
- **Repository Rules:** `governance/REPOSITORY_RULES.md` — change philosophy, batch limits, hygiene checks

### 7.5 Pack Review Sequence

Pack reviews may proceed in sequence beginning with Pack A when remediation is authorized. Each pass must:
- Be logged with per-item evidence, not bulk claims.
- Follow backup protocol and batch caps.
- Include independent verification.
- Reference the gold schema and difficulty vocabulary as the target.

---

## 8. Key Reference Documents

| Document | Location | Purpose |
|----------|----------|---------|
| Project Overview | `docs/PROJECT_OVERVIEW.md` | Architecture, item bank, baseline status |
| Gold Schema | `docs/ITEM_BANK_GOLD_SCHEMA.md` | Canonical MCQ and case-study schema |
| Difficulty Vocabulary | `docs/DIFFICULTY_VOCABULARY_AND_DISTRIBUTION.md` | 5-tier scale, target distributions |
| Case Study Standards | `docs/CASE_STUDY_STANDARDS_CMA2026.md` | CMA 2026 alignment requirements |
| AI Review Guidelines | `docs/AI_REVIEW_SESSION_GUIDELINES.md` | Session rules and boundaries |
| Root-Folder Policy | `docs/ROOT_FOLDER_POLICY.md` | What goes in root vs. subfolders |
| Repository Rules | `governance/REPOSITORY_RULES.md` | Change philosophy, hygiene, naming |
| Agents & Session Types | `governance/AGENTS_AND_SESSION_TYPES.md` | Session classifications, agent patterns |
| Current Baselines | `knowledge/CURRENT_BASELINES.md` | File hashes, sizes, provenance |
| Defect Library | `knowledge/DEFECT_LIBRARY.md` | DL-001 through DL-033 |
| Revision History | `knowledge/REVISION_HISTORY.md` | All session write-ups |
| Algorithm Spec | `docs/ALGORITHMS_SCORING_AND_ANALYTICS.md` | Scoring and analytics design |
| CAQS | `knowledge/CAQS_v1.0.md` | Content quality standard |
| Session Status | `reports/session_status/SESSION_STATUS_2026-07-23.md` | Prior session handoff |
| Backup Protocol | `knowledge/BACKUP_PROTOCOL.md` | Mandatory backup rules |

---

*Generated: 2026-07-24 — Session 20*
*Updated: 2026-07-24 — Session 57 (Documentation and governance formalization)*
*Updated: 2026-07-24 — Session 31 (Reconciliation execution: FD-045 verified closed, Pack D 500/500, BCDE denominator verified 874)*

---

## 7. Readiness Modeling & Study Plan Governance

### 7.1 Role and Scope

**Readiness modeling** (`ReadinessModel`, app.js:2473–2642) computes candidate-level readiness bands (Below Target / Approaching Target / At Target / Above Target) from accumulated session history. The model ingests analytics data — scaled scores, MCQ gate pass rates, CBQ performance, difficulty-preset averages, and trend direction — to produce a band assignment with supporting metrics. A minimum of three full sessions is required before a readiness assessment is rendered.

**Personalized study guidance** (`generateStudyPlan`, app.js:2679–2826) translates readiness bands and topic-level performance data into a structured plan containing a band-specific summary, prioritized session types (MCQ Drills, CBQ Practice, Full-Length Simulations, Error Log Review), difficulty-strategy recommendations, a timeframe estimate, and focus-topic / reinforce-topic lists. The plan is rendered in two contexts: as a dashboard card (`renderStudyPlanCard`) and as a post-session result snippet (`renderResultSnippet`).

Both features sit logically on top of the existing scoring and analytics layer (documented at docs/ALGORITHMS_SCORING_AND_ANALYTICS.md §1–§3) without modifying CMA scoring logic: the 0–500 scale, 360 passing threshold, 75/25 MCQ/CBQ weighting, and binary MCQ scoring are unchanged. Readiness bands and study plans are purely derived outputs — they consume analytics; they do not alter scoring, question selection, or answer-key determination.

### 7.2 Dependency Chain

```
Session Persistence (app.js:769–815)
  → saveHistory() stores scaledScore, mcqGate, cbqCorrect, topicSnapshot, difficultyPreset
    → ReadinessModel.compute(history) (app.js:2499)
      → _determineBand(metrics) (app.js:2598)
        → readiness object (band + metrics)
          → generateStudyPlan(readiness, history, ...) (app.js:2681)
            → _generateSummary(band, focusTopics, sessionTypes) (app.js:2772)
              → renderStudyPlanCard(plan) / renderResultSnippet(plan)
```

### 7.3 Integration Points

| Integration | Location | Description |
|-------------|----------|-------------|
| Result view | app.js:1797–1879 | `renderSummary()` calls `ReadinessModel.compute()` and `generateStudyPlan()`; renders readiness card + "Next Steps" snippet |
| Dashboard | app.js:2904–2929 | `PerformanceDashboard.render()` calls the same model functions; renders readiness card + full study-plan card |
| Disclaimers | Existing | CMA-style disclaimers already cover readiness/study-plan guidance per prior session review — no edits required |

### 7.4 Method Inventory (Verified)

| Method | Lines | Type |
|--------|-------|------|
| `ReadinessModel.compute()` | 2499–2596 | Readiness computation |
| `ReadinessModel._determineBand()` | 2598–2635 | Band classification logic |
| `ReadinessModel.renderReadinessCard()` | 2637–2678 | Readiness UI rendering |
| `ReadinessModel.BANDS` | 2476–2481 | Band enumeration |
| `ReadinessModel.BAND_LABELS` | 2483–2488 | Band display labels |
| `ReadinessModel.BAND_DESCRIPTIONS` | 2490–2495 | Band guidance text |
| `ReadinessModel.MIN_SESSIONS` | 2497 | Minimum session threshold |
| `generateStudyPlan()` | 2681–2770 | Study plan generation |
| `generateStudyPlan._generateSummary()` | 2772–2780 | Band-specific summary text |
| `generateStudyPlan.renderStudyPlanCard()` | 2782–2817 | Dashboard card rendering |
| `generateStudyPlan.renderResultSnippet()` | 2819–2826 | Post-session snippet rendering |

### 7.5 Governance Structure

#### Operational Status

| Attribute | Status |
|-----------|--------|
| Code baseline | No changes this session — all methods confirmed at declared line numbers |
| Scoring logic | Unchanged — 0–500 scale, 360 threshold, 75/25 weighting, binary MCQ scoring preserved (S16 CMA-style baseline) |
| Analytics logic | Unchanged — PerformanceAnalytics, AnalyticsCollector, AdaptiveReviewQueue preserved (S16/S17) |
| Readiness & study-plan features | Confirmed operating as designed on top of scoring/analytics (S25 features, verified in S33) |
| Content baseline | Unchanged — no pack files or question states modified |
| Disclaimers | No edits needed — existing CMA disclaimers cover readiness/study-plan guidance |
| Bug fix (prior session) | `this._generateSummary` → `generateStudyPlan._generateSummary` at app.js:2768 — confirmed correct binding |
| Test suite | 67/67 passing (confirmed prior session) |

#### Dependencies

| Layer | Provides | Consumed By |
|-------|----------|------------|
| Scoring (§1) | 0–500 scaled scores, MCQ gate results, pass/fail determination | Analytics, Readiness, Study Plan |
| Analytics (§3) | Trend summaries, topic performance, MCQ/CBQ splits, difficulty-preset averages | Readiness, Study Plan |
| Readiness Modeling (§7.2) | Readiness bands, supporting metrics | Study Plan, Dashboard UI |
| Study Plan (§7.3) | Personalized session plan, focus topics, timeframe estimates | Dashboard UI, Results UI |

#### Non-Goals / Explicitly Out of Scope

- Readiness bands are **not** official CMA readiness levels — they are internal simulator constructs.
- The study plan is a **lightweight advisor**, not a replacement for a full CMA review course.
- Neither feature modifies scoring logic, weighting, answer-key determination, or question selection.
- Neither feature is predictive — bands are descriptive (based on past performance), not forecast-based.
- The simulator does **not** prescribe a specific study-hour commitment; real CMA preparation typically involves structured schedules and substantial study hours (per IMA guidance).

#### Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Readiness band misinterpreted as official CMA prediction | Medium | Medium | CMA disclaimer rendered with all readiness outputs; bands labeled as internal simulator constructs |
| Study plan over-relied upon as sole preparation strategy | Medium | Medium | §7.1.1 framing in ALGORITHMS_SCORING_AND_ANALYTICS.md; non-goals documented above |
| Minimum-session gate (3) bypassed by localStorage manipulation | Low | Low | Gate is intentional design choice; fewer than 3 sessions considered unreliable for band assignment |
| Topic-snapshot data absent for older sessions | Low | Low | Study plan degrades gracefully to band-level guidance only (documented in §7.6) |

#### Architectural Hierarchy

```
Scoring Engine (§1: 0-500 scale, 360 threshold, 75/25 weighting, binary MCQ)
  └── Analytics Layer (§3: trend, topic, gate, difficulty-preset data)
        ├── Performance Dashboard (§3.4)
        └── Readiness Model (§7.2)              ← descriptive, read-only
              └── Study Plan Generator (§7.3)    ← derived guidance, read-only
```

Scoring remains the S16 CMA-style baseline. Analytics remain S16/S17. Readiness and study-plan features (S25) sit above both layers as derived, read-only consumers. They ingest scaled scores, trend summaries, topic performance, and gate results, but do not alter scoring formulas or answer-key determination.

**No runtime artifacts changed in this session.** No modifications were made to app.js, index_updated.html, styles.css, any pack_*_corrected.js file, any scored_cases*.js file, or any scoring, analytics, readiness, or study-plan formula. All baseline hashes and byte counts preserved as recorded in knowledge/CURRENT_BASELINES.md.

### 7.6 Known Limitations (By Design)

- **Minimum session gate:** `MIN_SESSIONS = 3` — no readiness assessment or study plan is generated with fewer than 3 completed sessions. This is intentional; sub-3-session data is considered statistically unreliable for band placement.
- **Topic-level granularity:** The study plan's topic analysis depends on `topicSnapshot` data saved per session via `saveHistory()`. Sessions completed before the topic-snapshot feature was added will have no per-topic data; the plan gracefully degrades to band-level guidance only.
- **No predictive modeling:** Readiness bands are descriptive (based on past performance), not predictive. The model does not attempt to forecast future scores or simulate exam-day outcomes.
- **CMA disclaimer boundary:** All readiness outputs include the standard CMA disclaimer (score is an estimate; not an official IMA prediction).

---

## 8. Reconciliation Schedule

### 8.1 Purpose

This section establishes the minimum reconciliation cadence for the CMA Part 1 Exam Simulator. The Session 31 G1–G5 runbook (`reports/SESSION31_RECONCILIATION_EXECUTION.md`) is the canonical reconciliation procedure. This schedule defines WHEN to run it.

### 8.2 Triggered Reconciliation

| Trigger | Gates Required | Notes |
|---------|---------------|-------|
| After any session that changes packs, app.js, or HTML/CSS | G1–G5 (full) | Mandatory — must complete before session close |
| After any session that certifies or archives items | G2 (Certified Ledger) + G5 (Governance Documentation) | Minimum — full G1–G5 recommended |
| Baseline drift detected (any unexpected hash change) | G1–G5 (full) immediately | Halt all write agents; execute reconciliation before resuming |
| Pre-delivery (learner-facing simulation test) | G1 + G2 + pre-delivery-safety-check skill | Before any live run |

### 8.3 Periodic Reconciliation

| Frequency | Gates Required | Purpose |
|-----------|---------------|---------|
| At least once every 10 sessions | G1–G5 (full) | Catch cumulative drift across sessions |
| At least once every 7 calendar days (if repository is actively worked) | G1–G5 (full) | Time-based safety net |

### 8.4 Long-Run Session Reconciliation

| Timing | Gates Required | Purpose |
|--------|---------------|---------|
| T0 (session start) | Baseline hash verification (all 13 files) | Establish starting state |
| Tmid (~30 min or after 2+ agents complete) | G1–G2 (partial — pack structural + certified ledger) | Catch mid-session drift |
| Tend (session close, before REVISION_HISTORY.md write) | G1–G5 (full) | Confirm zero drift across session |

### 8.5 Reconciliation Rules

1. **Do not relax continue/stop/escalate conditions.** Adapt pack lists or document lists as needed, but never weaken the gate logic from Session 31.
2. **Parallelize when possible.** G1/G2 (pack + ledger) and G3/G4/G5 (app.js + HTML + docs) can run in parallel agents.
3. **Count stability required.** Any gate that reports a count must stabilize across two independent consecutive scans before proceeding (per AGENTS.md §6).
4. **Reject totals-only reports.** All agent reports must include QID lists or per-item evidence where counts are claimed (per AGENTS.md §5).
5. **Runtime governance applies to long sessions.** For any session exceeding 30 minutes or 3 agents, run the T0→Tmid→Tend checkpoint sequence defined in §8.4 above.

---

**Session 52 — Governance-Only Confirmation (2026-07-24):** No pack files, `app.js`, or scoring logic were modified in this session; all hashes and byte counts remain unchanged from the pre-session verified baselines; only narrative entries were aligned. FD-045 remains closed at `49C465E3...` / 500/500 parseable. app.js remains at the adopted trusted baseline `64814CC489...` / 164,837 bytes with 3-layer architecture intact (S16 scoring → S17B analytics → S25 readiness). The Session 31 G1–G5 runbook is the canonical reconciliation pattern for any future baseline drift or governance inconsistency.

**Session 53 — Long-Run Governance Pass (2026-07-24):** FD-045 CAPA controls stress-tested over 3 timepoints (T0, Tmid, Tend) with all 5 checks PASS. T1-006 updated with long-run verification note. §6 Long-Run CAPA Verification and §8 Reconciliation Schedule added. Prompt-governance templates hardened for FD-045, app.js, and Session 31 runbook reuse. Drift-detection signals and response paths defined. Runtime governance checklist (§C.2 of SESSION53_LONGRUN_GOVERNANCE_EXECUTION.md) established. Zero runtime artifact changes. All 13 hashes stable across full session.

**Session 59 — Post-Standardization Audit + Case-Study Move Verification (2026-07-24):** 7-agent read-only audit completed. Full report: `reports/SESSION59_POST_STANDARDIZATION_AND_CASE_MOVE_AUDIT.md`. Key findings: (1) **Case-study move FAILED** — 60 standard cases still embedded in Packs A–D as `CASE_BANK_A` through `CASE_BANK_D`; 75 enhanced cases in scored_cases files; two parallel systems coexist; Section F not bank-mapped. (2) **Scoring model VERIFIED** — 75/25 weighting, 0–500 scale, 360 pass threshold, binary MCQ/CBQ scoring all confirmed at code level. (3) **Difficulty vocabulary INCOMPLETE** — only 3 of 5 canonical labels in use (Moderate-Easy and Very Difficult absent); Moderate overused at 53.9% (2x target); ~500–800 items need reclassification; app.js `getDifficultyDistribution()` must be updated before rebalancing. (4) **Content quality GOOD (4.0/5.0)** — accuracy 4.6, explanation quality 3.0 (weakest). (5) **3 critical/high fixes identified**: P1B-B-119 EW-A (DL-030 residual: "4th unit takes 51.2h"), P1-D-020 EW-D (DL-010: "$7.03" from adjacent QID), P1B-F-100 EW-A (DL-010: wrong choice described). Zero writes performed. All 10 pack/case files at pre-session baselines. Certified pool: 1,078 — unchanged.

**Session 60 — Case-Study Migration Executed (2026-07-24):** **Case-study move MITIGATED.** All 60 standard cases extracted from Packs A–D, enriched with governance metadata (question_state: "Unprocessed", ProductionStatus: "Draft"), and inserted into scored_cases.js through scored_cases4.js as `MIGRATED_CASE_BASE_A` through `MIGRATED_CASE_BASE_D`. All `CASE_BANK_*` arrays removed from pack files. app.js loader updated with typeof-guarded fallback from `CASE_BANK_X` to `MIGRATED_CASE_BASE_X`. Verification: 11/11 files pass syntax check; all 5 packs have 500 QuestionIDs each, 0 CaseIDs; no CASE_BANK remnants; 135 total cases (75 enhanced + 60 migrated). ~345 migrated case items are `Unprocessed` — need certification. Backups preserved for all 9 modified files. MCQ pack item counts and questions unchanged.

---

## 9. Certification Governance Rules — Session 508 Additions

### 9.1 Purpose

This section codifies new certification-blocking rules discovered during the Session 700 global certification review and repaired in Session 508. These rules close governance gaps that previously allowed structurally non-empty but semantically wrong ExplanationWrong fields to pass certification.

### 9.2 Rule G-NEW-1 — Learner-Facing Choice Authority

For any item with split or dual-block architecture (metadata block containing `ChoiceA`–`ChoiceD` / `ExplanationWrongA`–`ExplanationWrongD` + content block containing `Choices.{A,B,C,D}` / `CorrectChoice` / `ExplanationCorrect`):

- **Learner-facing content-block Choices are the authoritative mapping** for `CorrectChoice`, `ExplanationWrong_A`/`B`/`C`/`D`, and distractor-topic alignment.
- **Metadata-block `ChoiceA`–`ChoiceD`** may be used as auxiliary reference only and may not override learner-facing content when a conflict exists.
- **Any repair** that references choice content must verify against the content-block `Choices` object, not the metadata-block flat fields.
- **Scan tools** operating on dual-block items must extract `CorrectChoice` from the same JSON object as the `ExplanationWrong` fields they are evaluating (within-object extraction, not forward-scan or regex-window scan).

**Defect relation:** DL-016 (metadata-block topic-numbering shift), DL-029 (regex block-scan false positives from CC-offset), DL-010 (misassigned ExplanationWrong text across rotation-group positions).

### 9.3 Rule G-NEW-2 — Explanation Relevance Certification Block

An item **may not be certified** if any `ExplanationWrong` field contains text that:
- Belongs to a different question (cross-item contamination),
- Belongs to a different topic or domain area than the item's own content block,
- Reflects a different template instance from a rotation group,
- Or is otherwise semantically unrelated to the learner-facing distractor choice on that item.

**This is a certification-blocking defect even if the slot is non-empty.** A non-empty slot with wrong-topic text is a learner-safety risk — the learner reviewing their wrong answer may see feedback about a topic completely unrelated to the question they answered.

**Examples of G-NEW-2 violations (all confirmed Session 700, repaired Session 508):**
- P1E-F-001: Descriptive analytics item with labor efficiency variance text in all three EW slots
- P1-DC-020: Joint cost allocation item with variable costing vs. absorption costing text in EW-B/C
- P1-DC-040: Theory of Constraints item with prevention/appraisal cost text in EW-B/C

### 9.4 Rule G-NEW-3 — Dual-Block Verification Requirement

Any automated scan, remediation script, or certification process operating on dual-block architectures must use **direct within-object verification**:

**Requirements:**
1. When evaluating `ExplanationWrong` fields, extract `CorrectChoice` from the **same enclosing JSON object**, not from a forward-scan or template position.
2. Metadata-only or regex-only mapping is insufficient for write authorization where DL-016 risk exists (i.e., in any pack with paired metadata-content blocks: Packs A, C, D).
3. Before any certified-state change on a dual-block item, verify that the content block `Choices.{A,B,C,D}` values match the metadata block `ChoiceA`–`ChoiceD` values. If they differ, the DL-016 shift is present and the item must be repaired before certification.
4. Totals-only reports without QID lists are rejected for dual-block verification (per AGENTS.md §5).

**Defect relation:** DL-016, DL-029. Session 501/502 confirmed 39 false-positive DL-008/DL-026 flags on Pack D Section C caused by cross-object CorrectChoice reading.

### 9.5 Rule G-NEW-4 — Case Explanation Minimum Standard

For certified case-study items:

| Requirement | Detail |
|-------------|--------|
| **Explanation depth** | Explanations must be sufficient to explain why the correct answer is correct at an appropriate depth for the cognitive level and complexity of the item. |
| **One-sentence threshold** | One-sentence explanations are presumptively insufficient for non-trivial reasoning items (Apply, Analyze, Evaluate levels). |
| **Select/multi/match distractor rationale** | Items with `select`, `multi`, or `match` types must provide distractor-oriented rationale or equivalent wrong-choice guidance before certification. |
| **Authoritative standard citation** | Per CAQS §4.3 (EV3), the correct-answer explanation must reference the governing accounting principle by name (ASC, COSO, IAS, or IMA standard). |
| **Case-level certification block** | A case with 0% authoritative-standard citations across its items may not receive case-level certification. |

**Basis:** Session 700 found that only 16/420 (3.8%) case items cite ASC/COSO/GAAP. All 75 cases are labeled "Moderate" with zero difficulty differentiation. Case select/multi/match items have zero distractor explanations.

### 9.6 Rule G-NEW-5 — Updated Certification Checklist

Add the following checks to the certification gate for every item:

| # | Check | Applies To | Blocking? |
|---|-------|-----------|-----------|
| G5.1 | Topic relevance of all `ExplanationWrong` fields | All MCQ + case items | **BLOCK** — certification denied if any EW field is topically unrelated or from a different question |
| G5.2 | Source-of-truth verification for dual-block items | Packs A, C, D | **BLOCK** — certification denied if metadata-block `ChoiceA`–`D` values differ from content-block `Choices.{A,B,C,D}` |
| G5.3 | Case explanation sufficiency | All case items | **BLOCK** — certification denied if explanation is one sentence for Apply/Analyze/Evaluate items |
| G5.4 | Case distractor-rationale sufficiency | Case items with select/multi/match types | **BLOCK** — certification denied if no distractor-oriented rationale is present |
| G5.5 | Authoritative standard citation | All items | **WARN** — items without ASC/COSO/GAAP citation flagged for enhancement |

### 9.7 Effective Date

These rules are effective as of Session 508 (2026-07-25). All future certification waves must comply. Items certified before this date that violate G-NEW-1, G-NEW-2, or G-NEW-3 remain Certified but are flagged for priority remediation (as demonstrated by the three Session 508 repairs).

### 9.8 Cross-References

- Session 700 Global Certification Review: `reports/systematic_testing/SESSION700_GLOBAL_CERTIFICATION_REVIEW_SUMMARY.md`
- Defect entries: DL-010, DL-016, DL-029 (DEFECT_LIBRARY.md)
- CAQS v1.0: `knowledge/CAQS_v1.0.md` §1.6 (six-dimension verification), §4.3 (EV3), §14 (Gold Standard Checklist)
- QUESTION_METADATA_STANDARD.md Part 9 (Governance State Fields, §9.4)

*Generated: 2026-07-24 — Session 20*
