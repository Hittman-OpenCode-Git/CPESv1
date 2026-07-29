# Application Synchronization Audit
**CMA Part 1 Exam Simulator | 2026-07-29 | Session: S66A | Read-Only**

---

## Part 1: Ground Truth — Raw File Counts

### 1A. MCQ Pool

| Pack | File | Total | Certified | Archived | Unprocessed |
|------|------|-------|-----------|----------|-------------|
| A | `pack_a_corrected.js` | 500 | 500 | 0 | 0 |
| B | `pack_b_corrected.js` | 500 | 500 | 0 | 0 |
| C | `pack_c_corrected.js` | 500 | 455 | 36 | 9 |
| D | `pack_d_corrected.js` | 500 | 456 | 33 | 11 |
| E | `pack_e_corrected.js` | 545 | 540 | 0 | 5 |
| **TOTAL** | | **2,545** | **2,451** | **69** | **25** |

**Note:** Pack E exceeds standard 500-item capacity (includes 40 R-series supplemental Section E items + 5 extra).

### 1B. Case Pool

| File | Unique Cases | Case Items | question_state: "Certified" |
|------|-------------|------------|------------------------------|
| `case_pack_1_corrected.js` | 25 | 141 | 166 |
| `case_pack_2_corrected.js` | 25 | 132 | 157 |
| `case_pack_3_corrected.js` | 27 | 127 | 152 |
| **TOTAL** | **77** | **400** | **475** |

Zero duplicate CaseIDs across files. All 77 unique.

### 1C. Case Bank Variable Mappings

| Runtime Variable | Defined By | Points To | Case Count |
|-----------------|------------|-----------|------------|
| `CASE_BANK_A` | `case_pack_1_corrected.js` | `CASE_PACK_1` | 25 |
| `CASE_BANK_B` | `case_pack_2_corrected.js` | `CASE_PACK_2` | 25 |
| `CASE_BANK_C` | `case_pack_3_corrected.js` | `CASE_PACK_3` | 27 |
| `CASE_BANK_D` | `case_pack_1_corrected.js` | `CASE_PACK_1` | **25 (same as A)** |
| `CASE_BANK_E` | `case_pack_2_corrected.js` | `CASE_PACK_2` | **25 (same as B)** |
| `CASE_BANK_F` | **NOT DEFINED** | — | **0** |
| `ENHANCED_CASE_BANK_*` (all 30 variants) | **NOT DEFINED** | — | **0** |
| `MIGRATED_CASE_BASE_*` (A-E) | `case_pack_*_corrected.js` | Mirrors `CASE_BANK_*` | Fallback only |

---

## Part 2: App.js Hardcoded Values vs. Ground Truth

| Claim Location | App.js Says | Ground Truth | Drift |
|---------------|-------------|-------------|-------|
| Hero text | "2,545 Part 1 MCQs" | 2,545 | MATCH |
| Hero text | "75 integrated case studies" | 77 unique cases | **OFF BY 2** |
| Pack A checkbox | "(500 MCQs)" | 500 | MATCH |
| Pack B checkbox | "(500 MCQs)" | 500 | MATCH |
| Pack C checkbox | "(500 MCQs)" | 500 | MATCH |
| Pack D checkbox | "(500 MCQs)" | 500 | MATCH |
| Pack E checkbox | **(500 MCQs)** | **545** (540 Certified) | **OFF BY 45** |
| `SECTION_INFO` targets | A=75, B=100, C=100, D=75, E=75, F=75 | Sum=500 | Used for difficulty distribution |
| Exam mode MCQ pull | 100 MCQs + 2 cases | — | Matches CMA Part 1 structure |

---

## Part 3: Drift Detected — Priority Ranked

### CRITICAL (1): Case Duplication in getCasePool (app.js:1329-1366)

`CASE_BANK_A` and `CASE_BANK_D` both point to `CASE_PACK_1` (25 cases). `CASE_BANK_B` and `CASE_BANK_E` both point to `CASE_PACK_2` (25 cases). The `getCasePool()` method iterates over selected packs and concatenates without cross-pack deduplication. When both A+D or B+E are selected, the same 25 cases appear twice.

**Impact:** Duplicate CaseIDs in a session would cause answer-key collisions and broken scoring.

**Severity:** CRITICAL — data integrity risk.

### HIGH (2): Case Count Mismatch (75 vs 77)

Hero text states "75 integrated case studies" but ground truth is 77.

**Severity:** HIGH — trust signal to users.

### HIGH (3): Pack E Label Misrepresents Capacity

UI says "Pack E (500 MCQs)" but Pack E contains 545 questions (540 Certified). The 40 R-series items are invisible in the claim.

**Severity:** HIGH — users may think Pack E has fewer questions than it does.

### MEDIUM (4): CASE_BANK_F Undefined

No file defines `CASE_BANK_F`. Section F cases are accessible only through other packs' banks. The `enhanced_banks['F']` concatenation always returns `[]`.

**Severity:** MEDIUM — Section F is reachable but the architecture is misleading.

### MEDIUM (5): Legacy scored_cases Files in Root

Five files (`scored_cases.js` through `scored_cases5.js`) totaling ~4.2MB remain in the repository root. They are NOT loaded by `index_updated.html` and NOT referenced by `app.js`, `package.json`, or any script. Violates Constitution §11.3.

**Severity:** MEDIUM — constitutional violation, 4.2MB dead weight, zero runtime impact.

### LOW (6): 69 Archived + ~25 Uncertified Reduce Deliverable Pool

2,451 of 2,545 MCQs are Certified. 69 are Archived (structurally excluded). 25 are neither Certified nor Archived (deliverable at lowest tier). Effective delivery pool at Tier 1 is 2,451.

**Severity:** LOW — the tier system handles this correctly at runtime.

---

## Part 4: Script Loading Architecture — Verified

| Load Order | File | Defines |
|------------|------|---------|
| 1 | `pack_a_corrected.js` | `MCQ_BANK_A` (500 items) |
| 2 | `pack_b_corrected.js` | `MCQ_BANK_B` (500 items) |
| 3 | `pack_c_corrected.js` | `MCQ_BANK_C` (500 items) |
| 4 | `pack_d_corrected.js` | `MCQ_BANK_D` (500 items) |
| 5 | `pack_e_corrected.js` | `MCQ_BANK_E` (545 items) |
| 6 | `case_pack_1_corrected.js` | `CASE_BANK_A`, `CASE_BANK_D`, `MIGRATED_CASE_BASE_A/D` |
| 7 | `case_pack_2_corrected.js` | `CASE_BANK_B`, `CASE_BANK_E`, `MIGRATED_CASE_BASE_B/E` |
| 8 | `case_pack_3_corrected.js` | `CASE_BANK_C`, `MIGRATED_CASE_BASE_C` |
| 9 | `may-learner-state.js` | Learner state persistence |
| 10 | `governance/delivery_blocklist.js` | `window._cmaDeliveryBlocklist` (122 blocked QIDs) |
| 11 | `may-core.js` | May AI coach orchestrator |
| 12 | `app.js` | Application engine |

**No scored_cases references exist in the load chain.** Confirmed clean.

**No CASE_BANK_F definition in any file.** Confirmed gap.

---

## Part 5: Recommendations

| # | Priority | Action |
|---|----------|--------|
| 1 | CRITICAL | Add cross-pack CaseID deduplication in `getCasePool()` at `app.js:1366` — check if CaseID from `active` already exists in `result` before concatenating |
| 2 | HIGH | Update hero text: "75" → "77 integrated case studies" |
| 3 | HIGH | Update Pack E checkbox: "(500 MCQs)" → "(545 MCQs)" |
| 4 | MEDIUM | Move `scored_cases*.js` to `backups/` per Constitution §11.3 |
| 5 | MEDIUM | Define `CASE_BANK_F` or document that Section F cases are served through other banks |
| 6 | LOW | Reconcile 122-entry delivery blocklist against 69 Archived items for possible double-exclusion |
