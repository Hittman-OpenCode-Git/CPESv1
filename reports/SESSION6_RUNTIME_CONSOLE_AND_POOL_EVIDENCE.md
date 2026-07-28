# Session 6 — Runtime Console and Pool Evidence

**Generated:** 2026-07-24T16:00:00Z
**Environment:** Node.js v24.18.0 with `vm.runInThisContext` + `eval()` bank detection
**Isolation method:** Node.js VM — isolated process, no browser storage, no production localStorage
**Note:** Bank detection uses `eval()` because `const` in `vm.runInThisContext` does not attach to `globalThis` (Node.js vs. browser scoping difference). All 11 files were loaded via `vm.runInThisContext` in the same order as the HTML `<script>` tags.

---

## File Integrity Baseline

| File | SHA-256 | Size (bytes) | Last Modified |
|------|---------|-------------|---------------|
| index_updated.html | 81C809455B16DD14BDB11EFBC810B34F158B046896922102BBB5CF48FCBBA5B3 | 5,724 | 2026-07-24T13:59:52.662Z |
| app.js | 5319DD4B82B535C41F26F9CF64F9301ECEA7A3199EFD02843C183143142CF54B | 113,475 | 2026-07-24T13:44:31.989Z |
| pack_a_corrected.js | 8164F1FC1B6509F88D2709DE3770ECBB49602D0EBE65F36CF46A652D5FCBC633 | 1,906,851 | 2026-07-24T15:23:10.565Z |
| pack_b_corrected.js | 09CFEC8BCB5E92391A9FAB8793AFCED84E41DEB77A04FC1938C8611D5DC61CEC | 1,334,070 | 2026-07-24T13:42:51.966Z |
| pack_c_corrected.js | C934FD694CF718AF0D85F838AB350199385610A60D0DC9662DC9C47A8516ECE8 | 1,767,306 | 2026-07-24T15:22:19.260Z |
| pack_d_corrected.js | DEB235BECDA957D4940C7F7872BA13F2A7222CB3E09680D0B809F3436047FF61 | 1,889,721 | 2026-07-24T03:16:59.104Z |
| pack_e_corrected.js | 43047A66DAB30DAAA477625AC68BD341B3CB4638C45F5E9EC5D2D1B93144CEF4 | 1,167,565 | 2026-07-24T13:43:04.793Z |
| scored_cases.js | 79C1DF6049A10A638DA53B0667A90CDB58CC46D8B0A341E8C831CD5426305BBC | 191,441 | 2026-07-22T21:40:24.833Z |
| scored_cases2.js | 191846B948B7246C7C7C6F09757071F992CF95514E1F403D7EE347A789288B8D | 245,449 | 2026-07-22T21:40:24.849Z |
| scored_cases3.js | FA5333902F8AF3191001E59C725623BBD8AB6FCC48CFE5F0058E99E62E5F15D4 | 273,596 | 2026-07-23T20:15:01.192Z |
| scored_cases4.js | A330E145695243EEA42544A32D135D00E072062965840C97DC922A8E95D87BB7 | 282,293 | 2026-07-23T20:15:52.073Z |
| scored_cases5.js | 5629ED6C065A68382526A2303EC985528BE0DFD7BE548DFEEC05A230E62CADD6 | 317,780 | 2026-07-23T20:16:20.235Z |

### Hash Cross-Reference with Session 4 Final

| File | Session 4 Report | Session 6 Live | Match? |
|------|-----------------|---------------|--------|
| pack_a_corrected.js | 8164F1FC1B6509F88D2709DE3770ECBB49602D0EBE65F36CF46A652D5FCBC633 | 8164F1FC1B6509F88D2709DE3770ECBB49602D0EBE65F36CF46A652D5FCBC633 | YES |
| pack_c_corrected.js | (not listed, but post-repair) | C934FD694CF718AF0D85F838AB350199385610A60D0DC9662DC9C47A8516ECE8 | N/A |

---

## Phase 1 — Script Loading Results

**Test:** `vm.runInThisContext(fs.readFileSync(file, 'utf8'), {filename: file})` for each file in HTML `<script>` tag order.

| # | File | Status | Time (ms) | Error |
|---|------|--------|-----------|-------|
| 1 | pack_a_corrected.js | OK | 26 | — |
| 2 | pack_b_corrected.js | OK | 19 | — |
| 3 | pack_c_corrected.js | OK | 26 | — |
| 4 | pack_d_corrected.js | OK | 25 | — |
| 5 | pack_e_corrected.js | OK | 20 | — |
| 6 | scored_cases.js | OK | 6 | — |
| 7 | scored_cases2.js | OK | 5 | — |
| 8 | scored_cases3.js | OK | 5 | — |
| 9 | scored_cases4.js | OK | 7 | — |
| 10 | scored_cases5.js | OK | 6 | — |
| 11 | app.js | OK | 2 | — |

**Total load time:** ~147ms

### Error Categories Verified Zero

| Error Type | Count |
|-----------|-------|
| SyntaxError | 0 |
| ReferenceError | 0 |
| TypeError | 0 |
| `const` redeclaration | 0 |
| Unhandled exception | 0 |

---

## Phase 2 — Bank Availability

### MCQ Banks

| Bank | Exists | Objects | With QuestionID | First QID | Last QID |
|------|--------|---------|----------------|-----------|----------|
| MCQ_BANK_A | YES | 500 | 500 | P1-A-001 | P1-F-075 |
| MCQ_BANK_B | YES | 500 | 500 | P1B-A-076 | P1B-F-150 |
| MCQ_BANK_C | YES | **499** | 499 | P1-AC-001 | P1C-F-075 |
| MCQ_BANK_D | YES | **499** | 499 | P1-AD-001 | P1D-F-075 |
| MCQ_BANK_E | YES | 500 | 500 | P1E-A-001 | P1E-F-075 |

### MCQ Section Distribution (raw counts per Section field)

**Pack A:** A:75, B:100, C:100, D:75, E:75, F:75 = 500
**Pack B:** A:75, B:100, C:100, D:75, E:75, F:75 = 500
**Pack C:** A:75, B:99, C:100, D:75, E:75, F:75 = 499 (Section B undercount from 499/500)
**Pack D:** A:75, B:100, C:100, D:75, E:75, F:74 = 499 (Section F undercount from 499/500)
**Pack E:** A:75, B:100, C:100, D:75, E:75, F:75 = 500

### Stem Uniqueness Validation (renderValidation check)

All 5 packs pass: `new Set(bank.map(q => q.Stem)).size === bank.length`

This confirms no duplicate stems within any pack.

### Case Banks

| Bank | Exists | Cases | CaseIDs |
|------|--------|-------|---------|
| CASE_BANK_A | YES | 15 | (15 embedded cases in pack_a) |
| CASE_BANK_B | YES | 15 | (15 embedded cases in pack_b) |
| CASE_BANK_C | YES | 15 | (15 embedded cases in pack_c) |
| CASE_BANK_D | YES | 15 | (15 embedded cases in pack_d) |
| CASE_BANK_E | **NO** | — | Pack E has no CASE_BANK_E declaration |

### Enhanced Case Banks

All 25 banks (5 packs × 5 series) are present:

```
ENHANCED_CASE_BANK_A:  15 cases (scored_cases.js)
ENHANCED_CASE_BANK2_A: 15 cases (scored_cases2.js)
ENHANCED_CASE_BANK3_A: 15 cases (scored_cases3.js)
ENHANCED_CASE_BANK4_A: 15 cases (scored_cases4.js)
ENHANCED_CASE_BANK5_A: 15 cases (scored_cases5.js)
(same pattern for packs B, C, D, E)
```

**Total enhanced cases:** 375 (75 per pack)

---

## Phase 3 — Pool Construction Tests

### Configuration 1: Pack A Only

```
Packs selected: ['A']
Raw objects in bank: 500
Skipped (no Stem/CorrectChoice): 0
Active after tier assignment: 500
Tier 1 (Certified-equivalent): 223
Tier 2: 277
Tier 3: 0
Deduped pool (after duplicate removal): 500
```

**QID source distribution:** `{"A": 500}`

**Sample QIDs (first 6 in Tier 1 order):**
P1-A-001, P1-A-002, P1-A-003, P1-A-004, P1-A-005, P1-A-006

**Stem present:** 500/500
**Choices present:** 500/500
**CorrectChoice present:** 500/500

**Verdict:** PASS — LOADED AND POOL CONSTRUCTED

---

### Configuration 2: Pack C Only

```
Packs selected: ['C']
Raw objects in bank: 499
Skipped (no Stem/CorrectChoice): 0
Active after tier assignment: 499
Tier 1 (Certified-equivalent): 174
Tier 2: 325
Tier 3: 0
Deduped pool: 499
```

**QID source distribution:** `{"C": 349, "?": 150}` — Note: 150 items categorized as "?" due to Pack C QID format variance (P1-AC-*, P1-BC-*, P1-CC-*, P1-DC-*) not fully matched by the regex classifier. All 499 items are from Pack C.

**Sample QIDs:** P1-AC-001, P1-AC-002, P1-AC-003, P1-AC-004, P1-AC-005, P1-AC-006

**Stem present:** 499/499
**Choices present:** 499/499
**CorrectChoice present:** 499/499

**Verdict:** PASS — LOADED AND POOL CONSTRUCTED (with known 499/500 structural limitation)

---

### Configuration 3: Packs A–E Combined

```
Packs selected: ['A', 'B', 'C', 'D', 'E']
Raw objects: 2,498 (500+500+499+499+500)
Skipped (no Stem/CorrectChoice): 0
Active after tier assignment: 2,498
Tier 1 (Certified-equivalent): 1,248
Tier 2: 1,250
Tier 3: 0
Deduped pool: 2,498
```

**QID source distribution:** `{"A": 500, "B": 500, "C": 349, "D": 350, "E": 500, "?": 299}`

**Packs represented in combined pool:** A, B, C, D, E (all 5)

**Sample QIDs (first 6):** P1-A-001 through P1-A-006 (Pack A items drawn first due to Tier 1 prioritization)

**Stem present:** 2,498/2,498
**Choices present:** 2,498/2,498
**CorrectChoice present:** 2,498/2,498

**Verdict:** PASS — LOADED AND POOL CONSTRUCTED

---

### Configuration 4: Case Pool

| Pack | Standard Cases | Enhanced (Series 1-5) | Total Available |
|------|---------------|----------------------|-----------------|
| A | 15 | 75 (15×5) | 90 |
| B | 15 | 75 (15×5) | 90 |
| C | 15 | 75 (15×5) | 90 |
| D | 15 | 75 (15×5) | 90 |
| E | 0 | 75 (15×5) | 75 |
| **Total** | **60** | **375** | **435** |

All sources are available for pool construction. Pack A/C embedded cases are accessible after syntax repair.

**Verdict:** PASS — Case pool sources available

---

## Phase 4 — Storage Inspection

- **localStorage entries created during load:** 0
- **sessionStorage entries:** 0
- **CMA-related keys:** 0
- **Production storage accessed:** No (isolated Node.js process)

No persistent storage was created. The read-only load does not trigger session initialization, history saving, or learner data persistence.

---

## Console Output

### Errors: 0

No console.error calls were triggered during loading or pool construction.

### Warnings: 0

No console.warn calls were triggered.

### Unhandled Exceptions: 0

All 11 `vm.runInThisContext` calls completed without throwing.

---

## Raw Test Output (stdout capture)

```
=== PHASE 1: LOADING ===
  pack_a_corrected.js: OK (26ms)
  pack_b_corrected.js: OK (19ms)
  pack_c_corrected.js: OK (26ms)
  pack_d_corrected.js: OK (25ms)
  pack_e_corrected.js: OK (20ms)
  scored_cases.js: OK (6ms)
  scored_cases2.js: OK (5ms)
  scored_cases3.js: OK (5ms)
  scored_cases4.js: OK (7ms)
  scored_cases5.js: OK (6ms)
  app.js: OK (2ms)

=== PHASE 2: BANK CHECK ===
  MCQ_BANK_A: 500 objects
  MCQ_BANK_B: 500 objects
  MCQ_BANK_C: 499 objects
  MCQ_BANK_D: 499 objects
  MCQ_BANK_E: 500 objects
  CASE_BANK_A: 15 cases
  CASE_BANK_B: 15 cases
  CASE_BANK_C: 15 cases
  CASE_BANK_D: 15 cases
  CASE_BANK_E: MISSING

=== PHASE 3: POOL CONSTRUCTION ===
Pack A only: raw=500 skip=0 act=500 ded=500 t1=223
  srcs={"A":500} samples=P1-A-001, P1-A-002, P1-A-003, P1-A-004, P1-A-005, P1-A-006
Pack C only: raw=499 skip=0 act=499 ded=499 t1=174
  srcs={"C":349,"?":150} samples=P1-AC-001, P1-AC-002, P1-AC-003, P1-AC-004, P1-AC-005, P1-AC-006
Packs A-E: raw=2498 skip=0 act=2498 ded=2498 t1=1248
  srcs={"A":500,"B":500,"C":349,"D":350,"E":500,"?":299} samples=P1-A-001, P1-A-002, P1-A-003, P1-A-004, P1-A-005, P1-A-006
  Packs in pool: A, B, C, D, E

=== CATALOG VALIDATION ===
Pack A: 500 MCQs OK | {"A":75,"B":100,"C":100,"D":75,"E":75,"F":75}
Pack B: 500 MCQs OK | {"A":75,"B":100,"C":100,"D":75,"E":75,"F":75}
Pack C: 499 MCQs OK | {"A":75,"B":99,"C":100,"D":75,"E":75,"F":75}
Pack D: 499 MCQs OK | {"A":75,"B":100,"C":100,"D":75,"E":75,"F":74}
Pack E: 500 MCQs OK | {"A":75,"B":100,"C":100,"D":75,"E":75,"F":75}
All packs validated
Pack A: 15 cases
Pack B: 15 cases
Pack C: 15 cases
Pack D: 15 cases
Pack E: 0 cases
Pack A enhanced cases: 75
Pack B enhanced cases: 75
Pack C enhanced cases: 75
Pack D enhanced cases: 75
Pack E enhanced cases: 75
```

---

## Overall Completion Statement

**RUNTIME LOAD VALIDATION PASSED — PACK A/C SYNTAX REPAIRS SUPPORT APPLICATION STARTUP AND POOL CONSTRUCTION; SCORING VALIDATION REMAINS SEPARATE.**

---

*Generated 2026-07-24 — Session 6 final evidence report*
