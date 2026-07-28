# Phase 0B — Authoritative Inventory, DL-029 Containment, and Preflight Report

**Session:** 2026-07-23 Continuation  
**Status:** PARTIAL — VERIFIED WORK ONLY  
**Mode:** Read-Only Audit  
**Appended to:** `FULL_DEPTH_AUDIT_2026-07-23.md`

---

## PART A — AUTHORITATIVE POPULATION INVENTORY

### A.1 — Loading Architecture (Verified from Source)

**Source:** `index_updated.html` lines 2-11

```html
<script src="pack_b_corrected.js"></script>
<script src="pack_c_corrected.js"></script>
<script src="pack_d_corrected.js"></script>
<script src="pack_e_corrected.js"></script>
<!-- pack_a_corrected.js is NOT loaded -->
```

**MCQ Pack Variable Names (verified):**
| Pack File | Variable Name | Loaded? |
|-----------|--------------|---------|
| pack_a_corrected.js | `MCQ_BANK_A` | **NO** — not in index_updated.html |
| pack_b_corrected.js | `MCQ_BANK_B` | YES |
| pack_c_corrected.js | `MCQ_BANK_C` | YES |
| pack_d_corrected.js | `MCQ_BANK_D` | YES |
| pack_e_corrected.js | `MCQ_BANK_E` | YES |

### A.2 — Raw MCQ Records (Verified)

Each pack defines an array. Pack A uses a paired-object architecture (metadata block + content block per QID), meaning the raw array contains ~1,000 objects for 500 QIDs. Packs B-E use a single-object architecture.

| Pack | File QIDs | Unique QIDs | Duplicate QIDs | File Size |
|------|-----------|-------------|----------------|-----------|
| A | 500 | 500 | 0 | ~1.9 MB |
| B | 500 | 500 | 0 | ~1.3 MB |
| C | 500 | 500 | 0 | ~1.7 MB |
| D | 500 | 500 | 0 | ~1.9 MB |
| E | 500 | 500 | 0 | ~1.2 MB |
| **Total** | **2,500** | **2,500** | **0** | |

### A.3 — MCQ question_state Distribution (Verified by Raw-File Grep)

| Pack | QIDs | Certified | Unprocessed | Archived | Hold | Missing State |
|------|------|-----------|-------------|----------|------|--------------|
| A | 500 | 204 | 0 | 19 | 0 | 277 |
| B | 500 | 351 | 150 | 0 | 0 | -1* |
| C | 500 | 174 | 19 | 56 | 0 | 251 |
| D | 500 | 248 | 19 | 56 | 2 | 175 |
| E | 500 | 101 | 0 | 0 | 0 | 399 |
| **Total** | **2,500** | **1,078** | **188** | **131** | **2** | **1,101** |

\* Pack B: 501 question_state occurrences for 500 QIDs — 1 extra. This is P1B-A-143 which carried double state metadata (an anomaly from the DL-024 certification artifact); resolved 2026-07-23 per DL-024 entry.

**Methodology:** `Select-String -Path <file> -Pattern '"question_state": "<value>"' | Measure-Object` per AGENTS.md §9.3. Counts stable across two consecutive scans.

### A.4 — Active (Runtime-Served) MCQs

The runtime `ExamSessionManager.getMCQPool()` at `app.js:961-1016` filters items through `assignTier()`:
- question_state "Certified" → Tier 1 (always served)
- question_state "Archived", "In Audit", "Editorial Queue" → Tier -1 (hard-excluded)
- All other states including "Unprocessed", "Hold", and MISSING → scored via `scoreQuestionQuality()`, assigned Tier 2 or 3 (served)

**GOVERNANCE GAP IDENTIFIED:** "Hold" items (P1-AD-047, P1-AD-048 in Pack D) are NOT in the hard-exclusion list. They receive Tier 2/3 and are served to learners despite being in a "Held" governance state. The assignTier() function at app.js:112-127 does not account for "Hold" state.

| Pack | Loaded? | Total QIDs | Certified (T1) | Unproc/Hold/Missing (T2/3) | Hard-Excluded | Active Served |
|------|---------|-----------|----------------|---------------------------|---------------|---------------|
| A | NO | 500 | 204 | 277 | 19 | **0** |
| B | YES | 500 | 351 | 149 | 0 | **500** |
| C | YES | 500 | 174 | 270 | 56 | **444** |
| D | YES | 500 | 248 | 194 | 56 | **442** |
| E | YES | 500 | 101 | 399 | 0 | **500** |
| **Total** | | **2,500** | **1,078** | **1,289** | **131** | **1,886** |

**Certified active pool (eligible for learner delivery per CAQS §1.7.1):** 874 items (351 B + 174 C + 248 D + 101 E)

**Note:** Pack A has 204 Certified items on disk but is NOT loaded by index_updated.html — **0 served.**

### A.5 — Case Study Records

#### A.5.1 — Case File Architecture (Verified)

Each `scored_cases[N].js` file:
1. Defines a base array: `ENHANCED_CASE_BASE` (15 cases)
2. Maps each case to section-specific bank variables using `cloneEnhancedCase`:
   - `ENHANCED_CASE_BANK_A`, `ENHANCED_CASE_BANK_B`, `ENHANCED_CASE_BANK_C`, `ENHANCED_CASE_BANK_D`, `ENHANCED_CASE_BANK_E`
3. The app at `app.js:1031-1037` concatenates all 5 bank levels (BASE through BASE5) × 5 sections (A-E) = 25 bank variables

**Verified case file counts:**

| File | Base Cases | Section Banks | Cloned Entries | CaseIDs |
|------|-----------|---------------|----------------|---------|
| scored_cases.js | 15 | ENHANCED_CASE_BANK_A-E | 75 | CBQ-A1, A2, A3, B1-B3, C1-C3, D1-D2, E1-E2, F1-F2 |
| scored_cases2.js | 15 | ENHANCED_CASE_BANK2_A-E | 75 | CBQ2-A2-A3, B1-B3, C1-C3, D1-D3, E1-E2, F1-F2 |
| scored_cases3.js | 15 | ENHANCED_CASE_BANK3_A-E | 75 | CBQ3-A1-A2, B1-B3, C1-C3, D1-D3, E1-E2, F1-F2 |
| scored_cases4.js | 15 | ENHANCED_CASE_BANK4_A-E | 75 | CBQ4-A1-A2, B1-B2, C1-C2, D1-D3, E1-E3, F1-F3 |
| scored_cases5.js | 15 | ENHANCED_CASE_BANK5_A-E | 75 | CBQ5-A2, B1-B2, C1-C3, D1-D3, E1-E3, F1-F3 |
| **Total** | **75** | **25 bank vars** | **375 entries** | **75 unique scenarios** |

**Evidence:** Direct regex extraction. CaseIDs: `CaseID:\s*"([^"]+)"` — all 75 unique CaseIDs confirmed. No duplicates across files. Each file contributes 15 unique cases.

#### A.5.2 — "375 Delivered" Clarification

The "375 delivered case records" refers to the 75 base cases × 5 section-specific bank variables = 375 cloned entries across the 25 bank variables. Each clone is a shallow copy of the base case, assigned a specific section bank. The runtime filters these by `SectionTags` at app.js:797 — only cases matching the selected exam sections are served in any given session.

This is NOT 375 unique case scenarios. It is 75 unique scenarios with 5 section-tagged variants each.

#### A.5.3 — Unique Cases: 75 (Reconciled)

| File | Unique Cases | CaseID Pattern | Item Count |
|------|-------------|----------------|------------|
| scored_cases.js | 15 | CBQ-{Section}{N} | 90 |
| scored_cases2.js | 15 | CBQ2-{Section}{N} | 78 |
| scored_cases3.js | 15 | CBQ3-{Section}{N} | 79 |
| scored_cases4.js | 15 | CBQ4-{Section}{N} | 78 |
| scored_cases5.js | 15 | CBQ5-{Section}{N} | 75 |
| **Total** | **75** | | **400** |

**No duplication:** CaseIDs across files are unique (CBQ, CBQ2, CBQ3, CBQ4, CBQ5 prefixes). No case appears in both standalone and embedded files. The "31 embedded cases" figure from prior report is not corroborated — packs B/C have `CASE_BANK` variables but pack files that define them are not all loaded, and the `CASE_BANK_*` references in app.js resolve to empty arrays (typeof guard) for packs not defining them.

#### A.5.4 — Case question_state (All Unprocessed)

| File | Certified | Unprocessed | question_state occurrences |
|------|-----------|-------------|---------------------------|
| scored_cases.js | 0 | 105 | 105 |
| scored_cases2.js | 0 | 93 | 93 |
| scored_cases3.js | 0 | 94 | 94 |
| scored_cases4.js | 0 | 93 | 93 |
| scored_cases5.js | 0 | 90 | 90 |
| **Total** | **0** | **475** | **475** |

All case items have `question_state: "Unprocessed"` (not Certified, not Archived). At runtime, these are assigned Tier 2 (enhanced cases, `_tier = 2`). **0 Certified cases in the learner pool.** All 75 cases are served with Tier 2 status, meaning they appear after Tier 1 (Certified) content in queue-building.

#### A.5.5 — Exclusion and Unreachable Records

- **0 cases Archived** — all 75 are active
- **0 cases orphaned or shadowed** — all CaseIDs are unique across files
- **0 embedded cases duplicating standalone cases** — the CBQ prefix scheme ensures uniqueness
- **CBQ3-F1-E1, CBQ4-C2-E1, CBQ4-E1-E1, CBQ5-C2-E1, CBQ5-D1-E1**: These CaseID-like strings in scored_cases3-5 are exhibit sub-identifiers, not separate cases. They appear in ExhibitID/CaseID fields within the case object structure. The unique-case count of 75 correctly excludes these.

### A.6 — Section B CaseIDs (matching "Exhibit-E1" pattern)

Some exhibits reference CaseIDs like `CBQ3-F1-E1` — these are Exhibit-level identifiers (ExhibitID), not separate case scenarios. The `CaseID` field on exhibits identifies the parent case. A `CaseID: "CBQ3-F1-E1"` appearing inside an exhibit means that exhibit belongs to case CBQ3-F1, and is referenced as exhibit E1. This is an internal reference convention, not a 16th case.

**Verdict:** 75 unique cases confirmed. The "106 potential unique cases to reconcile" (prior report §A) was an exhibit-ID confusion. The runtime serves exactly 75 cases.

---

## PART B — DL-029 ROOT-CAUSE REPRODUCTION AND CONTAINMENT

### B.1 — Methodology Defect Identified

DL-029 describes a false-positive inflation defect in regex block-window DL-008 scanning.

**Root cause:** The prior session's scanning scripts used regex block-window extraction: find `"QuestionID"` → search forward in a fixed window for `"CorrectChoice"` → check `"ExplanationWrong[found_CC]"` for non-empty content.

**When it fails:** ALL 5 packs store `CorrectChoice` BEFORE `QuestionID` in the source file (verified by direct offset measurement: Pack A CC=998/QID=2603, Pack B CC=1036/QID=1558, Pack C CC=1025/QID=2014, Pack D CC=1108/QID=2149, Pack E CC=842/QID=1779). The forward-scan from QID finds the NEXT item's CorrectChoice in every case. With random CC distribution (A/B/C/D), this produces a ~75% false-positive DL-008 rate for ALL packs. The prior belief that only Pack B was affected is incorrect — this is a universal methodology defect.

### B.2 — Reproduced on Controlled Sample

**Control records (Pack B Section A, verified by direct line-level inspection):**

| QID | Actual CC (source) | Scanner-read CC | True DL-008? | False Positive? |
|-----|-------------------|-----------------|-------------|-----------------|
| P1B-A-076 | B | C (from P1B-A-077) | No (EW[B]="") | YES |
| P1B-A-077 | C | D (from P1B-A-078) | No (EW[C]="") | YES |
| P1B-A-078 | D | A (from P1B-A-079) | No (EW[D]="") | YES |
| P1B-A-079 | A | B (from P1B-A-080) | No (EW[A]="") | YES |

**Reproduction evidence:** The scanner's results claimed 111-257 DL-008 items for Pack B. Direct object-level parsing (Function constructor) confirms **0 DL-008 in Pack B.** All 500 Pack B items have exactly 3 non-empty distractor ExplanationWrong slots + 1 empty CorrectChoice slot. Pack B is structurally DL-008 clean.

### B.3 — Prior Counts Invalidated by DL-029

All prior DL-008 counts that used regex block-window scanning without CC-position awareness are marked **INVALIDATED_BY_DL_029** unless independently re-established through object-level parsing:

| Prior Count | Claimed Method | Authoritative Count | Disposition |
|-------------|---------------|---------------------|-------------|
| "Pack B: 111 Certified DL-008" | Forward-scan from QID | **0** | INVALIDATED — 100% false positive |
| "Pack B: 257 total DL-008" | Forward-scan from QID | **0** | INVALIDATED — 100% false positive |
| "Pack A: 138 Certified DL-008" | Regex block-window | **Unverified** | SUSPECTED INFLATED — need object-level re-verify |
| "Pack C: 174 Certified DL-008" | Regex block-window | **Unverified** | SUSPECTED INFLATED — need object-level re-verify |
| "Pack D: 246 Certified DL-008" | Regex block-window | **Unverified** | SUSPECTED INFLATED — need object-level re-verify |
| "Pack E: 70 Certified DL-008" | Regex block-window | **Unverified** | SUSPECTED INFLATED — need object-level re-verify |
| "Total: 885 Certified DL-008" | Aggregate of above | **Unknown but certainly less** | INVALIDATED — methodology defect confirmed |

### B.4 — Authoritative Replacement Detection Method

All subsequent DL-008 candidate detection MUST use:

```
parsed item object → exact QID → exact CorrectChoice → exact ExplanationWrong slot at that same object path
```

**Rules:**
1. Never infer a question's CorrectChoice from adjacent source text, object ordering, or an unmatched regex block.
2. For Pack B: Use Function constructor parse (verified to work, yields 500 complete objects).
3. For Packs A/C/D/E: Use string-aware brace-matched object extraction that preserves CC-object association.
4. Verify CC positioning per pack: if CC appears before QID in source, block-window methods are unreliable.
5. Every DL-008 flag must be traceable to a single parsed object's QID→CC→EW[CC] path.

### B.5 — Scanner Methods Located and Assessed

| Method | Location | Assessment |
|--------|----------|-----------|
| `scan_dl026.js` (scripts/) | Brace-matcher | DL-020 vulnerability (no string-awareness) — undercounts |
| `scan_dl008.ps1` (scripts/) | Select-String block-window | DL-029 vulnerability (CC-position unaware) — false positives |
| Pack B Function constructor | Inline in agent prompts | Authoritative for Pack B — 0 false positives |
| ExplanationValidator.js (line 173-180) | DL-020 vulnerability (no string-awareness) | Under-reports DL-008 |
| governance-guard.js Rule 2 | Post-parse check | Correct logic (blocks non-empty EW[CC]) but depends on parser |

---

## PART C — CORRECTCHOICE GROUND-TRUTH AUDIT

**STATUS: NOT COMPLETED**

The prior Phase 0B audit was a 58-item stratified sample (57/58 ALL_AGREE) + 13-item QC sample (12/13 ALL_AGREE). This is a sampling, not a full population audit.

**Required but not yet performed:**
- Item-level independent answer derivation for all 874 active Certified MCQs
- Item-level independent answer derivation for all 1,012 non-Certified active MCQs
- Independent 20% re-derivation with a different reviewer/agent
- Reconciliation of all disagreements

**From the prior sample (limited data only):**

| QID | File | State | Verdict | Issue |
|-----|------|-------|---------|-------|
| P1B-F-121 | pack_b | Certified | CC_WRONG_CONFIRMED | CC=C, should be B (smart contracts) |
| 69/71 sample items | mixed | mixed | ALL_AGREE | No issues found |

**The prior Phase 0B audit did NOT cover:**
- 816 of 874 active Certified MCQs (93.4% uncovered)
- Any non-Certified active MCQs
- Any Pack E Certified items beyond the samples
- Any cross-pack comparison of answer consistency
- Any distractor-answer consistency check against independently derived answers

**Eligibility for DL-008/DL-025/DL-026/DL-010 remediation:** No item is eligible until its CorrectChoice verdict is ALL_AGREE per the independent derivation standard in PART C of the task instructions.

### C.1 — Partial CorrectChoice Sampling (Prior Session, from FULL_DEPTH_AUDIT)

The FULL_DEPTH_AUDIT report records two sampling passes but does not include:
- The full QID list for the 58-item sample
- Per-item independent derivation records
- The random selection method or seed
- The 20% re-derivation ledger

These are required for Phase C completion per the task instructions.

---

## PART D — PACK C DL-016 / CC-ROTATION SCOPE

**STATUS: NOT COMPLETED — PRELIMINARY FINDINGS ONLY**

### D.1 — Pack C Architecture

Pack C uses a PAIRED-OBJECT architecture (identical to Pack A):
- **Metadata block:** QuestionID, question_state, ChoiceA-D (flat), ExplanationWrongA-D, VerifiedChecks
- **Content block:** Part, Section, Topic, Stem, Choices (nested), CorrectChoice, ExplanationCorrect, StudyLinks

Both blocks share the same QuestionID. This creates potential for the metadata block's ChoiceA-D to diverge from the content block's Choices.A-D (DL-016 pattern).

### D.2 — Known Pack C Certified Population

| Section | QIDs | Certified |
|---------|------|-----------|
| A | P1-AC-001 through P1-AC-075 | 75 |
| B | P1-BC-001 through P1-BC-100 | 100 |
| C-F | Various | 0 |
| **Total** | | **175** |

Per session status, 174 Certified items were reported in Pack C, but my direct grep shows 174 matches of `"question_state": "Certified"`. The discrepancy with the 175 figure from the session status may be due to the P1-BC-030/060/AC-030 items that were flagged as DL-026 in the most recent session corrections.

### D.3 — DL-016 Risk Assessment

The prior DL-016 defect (metadata-block ChoiceA-D text shifted by one position relative to content-block Choices.A-D) was confirmed for Pack A Section E. Pack C has the same paired-object architecture, so the same risk exists.

**Scope determination NOT completed because:**
1. No object-level parse of all 175 Certified Pack C items has been performed with QID→metadata Choics→content Choices→CorrectChoice cross-referencing
2. The 5-of-5 sample claim from prior session refers to 5 inspected items only — generalization to all 175 is unsupported
3. The root-cause classification depends on distinguishing metadata-only shift from true answer-key rotation

**Quarantine recommendation:** All 175 Pack C Certified items should be quarantined from ExplanationWrong[CorrectChoice] remediation until:
- An object-level parse pairs each metadata block with its content block
- Metadata ChoiceA-D is compared against content Choices.A-D for each QID
- The CorrectChoice is verified against both metadata and content choice lists
- Any rotation is classified as metadata-only defect, true answer-key defect, or scan artifact

### D.4 — Pack C Section B DL-026 Residual

The most recent correction (DEFECT_LIBRARY.md DL-026, Autonomous Run enforcement-depth session) identified:
- 3 remaining DL-026 items in Pack C Section B: P1-BC-030, P1-BC-060, P1-AC-030 (note: AC is Section A, BC is Section B)
- 1 item with absent distractor ExplanationWrong field: P1-BC-094 EW_D
- ~36 items with residual DL-013 boilerplate in non-CC slots

These items should be addressed in the same pass as the CC-rotation audit.

---

## PART E — PACK A MISSING-STATE GOVERNANCE REVIEW

### E.1 — Affected Population (Verified)

**100 items:** P1-B-001 through P1-B-100 (Pack A, Section B)  
**File:** `pack_a_corrected.js`, lines ~4079–~9760  
**question_state:** COMPLETELY ABSENT — zero `question_state` fields in this range

### E.2 — Runtime Status (Verified from Source Code)

Pack A is NOT loaded by `index_updated.html` (see §A.1). **These 100 items are INACTIVE_BY_RUNTIME — never served to learners in any simulator mode**, regardless of their question_state.

However, if Pack A were loaded (by adding `<script src="pack_a_corrected.js"></script>` to index_updated.html), the runtime would treat these 100 items as Tier 2/3 (scored Unprocessed) because:
- `assignTier()` at app.js:112-127 treats missing `question_state` as:"`""` → not "Certified", not hard-excluded → scored via `scoreQuestionQuality()`
- These items have substantive explanations and would likely score ≥2, landing in Tier 2

### E.3 — Classification

| Status | Evidence |
|--------|----------|
| **INACTIVE_BY_RUNTIME** | Pack A not loaded by index_updated.html (confirmed by direct file audit) |
| **STATE_MISSING** | Zero question_state fields on 100 items (confirmed by raw-file search) |
| **STRUCTURALLY_INTACT** | Items have stems, choices, correct answers, and explanations |
| **REMEDIATION_ELIGIBLE** | EXCLUDED — not served, so no learner impact; and state must be resolved first |

### E.4 — P1-B-001 and P1-B-025 (DL-008/DL-010 Candidates)

**P1-B-001 (line ~4079, Section B, top-down budgeting):**
- Metadata-block CorrectChoice: NOT IN METADATA BLOCK (metadata has ChoiceA-D but no CorrectChoice)
- Content-block CorrectChoice: B (verified)
- Metadata-block ExplanationWrongB: "" (empty — DL-008 compliant within metadata)
- Content-block: CorrectChoice=B, Choices.A-D aligned with stem
- **DL-008 status:** Metadata block EW[B]="" — compliant. Content block has no ExplanationWrong field.
- **DL-010 risk:** Metadata block ChoiceA-D may not match content block Choices.A-D (DL-016 risk)

**P1-B-025 (Section B):**  
Not yet directly inspected in this session. Prior reports flag DL-010 (misassigned explanations) and DL-025 (empty non-CC slot).

**Remediation eligibility:** EXCLUDED until:
1. Pack A is loaded into the application (or the decision to exclude it is documented)
2. question_state is added to these 100 items
3. DL-016 metadata-content alignment is verified for each item

---

## PART F — CMA CONTENT, CBQ, AND SCORING PREFLIGHT

### F.1 — Scoring Path (Verified from app.js)

**Source:** `app.js:1590-1601` (`practiceScores()`) and `app.js:1606-1688` (`renderSummary()`)

```
learner response
    ↓
Answer evaluation:
    MCQ:    s.answers[q.QuestionID] === q.CorrectChoice          (app.js:1593)
    Case:   correctCase(it, s.caseAnswers[caseKey(c, i)])        (app.js:1500-1504)
    ↓
MCQ score:  mcqC / s.mcqs.length → mcqPct
Case score: caseC / caseT → casePct
    ↓
Weighted result: mcqPct * 0.75 + casePct * 0.25                (app.js:1598)
    ↓
Scaled: Math.round(weighted * 500)                                (app.js:1599)
    ↓
Grade: ≥420 "Strong pass range" / ≥360 "Passing range" /
       ≥300 "Near pass range" / <300 "Needs substantial review"   (app.js:1600)
```

### F.2 — Scoring Preflight Findings

| Requirement | Supported? | Evidence |
|-------------|-----------|----------|
| MCQ weighting 75% | **YES** | app.js:1598: `mcqPct * 0.75 + casePct * 0.25` |
| CBQ weighting 25% | **YES** | app.js:1598 |
| No negative marking | **YES** | Only correct answers counted; missing = wrong = 0 |
| Partial credit for CBQ tasks | **YES** | Each case item scored independently via `correctCase()` |
| Unanswered treatment | **Correct (0)** | Not counted as correct; denominator unchanged if not missing |
| Denominator from active pool | **YES** | `s.mcqs.length` and `caseT` reflect actually-selected content |
| Answer shuffle handling | **YES** | Choices stored as keyed object `{A:..., B:...}`, CorrectChoice is letter |
| 50% MCQ gate for CBQ access | **NO** | No gate exists; user selects mode freely (MCQ/Case/Mixed/Full) |
| 100 MCQs + 2 cases in Full mode | **YES** | app.js:951: `mode === 'full' ? 100 : ...` and `mode === 'full' ? 2 : ...` |
| Exclusion of excluded content from scores | **YES** | Hard-excluded items (Archived/In Audit/Editorial Queue) never selected |
| Scaled score disclaimer | **YES** | app.js:1639: "Practice-scaled estimate. Actual CMA uses official scaled scoring." |

**Gap identified:** No 50% MCQ gate. The IMA's 2026 CBQ model requires candidates to correctly answer at least 50% of MCQs before accessing the CBQ section. This gate is NOT implemented. In Full mode, all 100 MCQs and 2 cases are rendered sequentially without interruption.

**Scale clarification:** The app correctly labels its score as "Practice-scaled estimate" (app.js:1639). The official CMA uses IMA's proprietary equating method mapping raw performance to a 0-500 scaled score with 360 as passing threshold. The simulator's `Math.round(weighted * 500)` is a linear approximation and must not be presented as an official CMA scaled score.

### F.3 — CMA Content Preflight (Limited by Read-Only + Sampling)

Given the read-only constraint and the fact that full CorrectChoice ground-truth audit (Part C) is not yet completed, only preliminary findings are available:

**From prior sample (limited data):**

| Finding | Count | Detail |
|---------|-------|--------|
| P1B-F-121 CC rotation | 1 | CC=C, answer is B (smart contracts topic). The item tests "which technology enables self-executing contracts" — the correct answer is blockchain (B), not machine learning (C). In CMA Part 1 scope (Section F — Technology and Analytics). |
| ALL_AGREE from samples | ~69/71 | Sampled items have verified-correct answer keys |
| Pack B Sections A/D | 150 | Structurally clean, Zero DL-008 confirmed by object-level parse. NOT yet content-audited. |

**Content scope verified:** All content maps to CMA Part 1 domains (checked by topic tags). No Part 2-only topics detected in Section F (Technology and Analytics) or Section A (External Financial Reporting Decisions) samples.

### F.4 — CBQ Structure Preflight (Limited Read-Only)

The 75 cases have the following structure:

| Feature | Assessment | Evidence |
|---------|-----------|----------|
| Concise scenario (~250 words) | **Partial** — varies by case | CBQ-A1 ScenarioText: 77 words; others typically 40-100 words |
| Named company + stakeholder | **YES in most** | "Northstar Equipment", "Harbor Medical Supplies", "CFO Maria Chen" |
| Relevant exhibits (1-3 per case) | **YES** | Tables with Headers/Rows, Body text exhibits |
| Applied reasoning tasks | **YES** | Item Types: numeric, select, multi, fill, match |
| Independently answerable tasks | **PARTIALLY VERIFIED** | Item dependencies checked in validateCase(); but actual inter-item dependency not audited |
| Objectively scoreable | **YES** | `correctCase()` handles all item types with type-aware comparison |
| Partial credit | **YES** | Each case task scored independently |
| No penalty for wrong answers | **YES** | Unanswered = wrong = not counted |
| 0 Certified cases for learner pool | **YES** | All cases are Unprocessed → Tier 2 |

**Gaps identified for future audit:**
1. Exhibit data consumption: not all exhibits verified for complete data consumption (CAQS §3.4)
2. Inter-item dependencies: not verified that case items are answerable independently of prior-item correctness
3. Scenario completeness: some cases have brief scenarios (< 100 words) that may not provide sufficient context
4. Item count variation: cases have 5-6 items each (total 400 items across 75 cases)
5. ProductionStatus: all cases are "Draft" despite having substantive content

---

## COMPLETION CRITERIA ASSESSMENT

| Criterion | Status |
|-----------|--------|
| Every active/Certified MCQ has item-level primary ground-truth record | **NOT COMPLETE** — 0 of 874 active Certified have per-item independent derivation records with formula/substitution/result |
| Independent 20% re-derivation complete, reproducible, reconciled | **NOT STARTED** |
| DL-029 reproduced or disproved with direct evidence | **REPRODUCED** — confirmed on Pack B control records; 100% false-positive rate established |
| Pack C rotation issue has exact scope and root-cause classification | **NOT COMPLETE** — preliminary architecture analysis only; no per-item object-level parse performed |
| Runtime status of 100 Pack A no-state items known or explicitly unresolved | **KNOWN** — INACTIVE_BY_RUNTIME (Pack A not loaded) |
| Exact eligible, excluded, quarantined, deferred populations documented | **PARTIAL** — populations counted but not item-level | 
| All counts reconcile to exact QID/CaseID lists | **PARTIAL** — module-level counts reconciled; item-level lists not exhaustive |

---

## STATUS: PARTIAL — VERIFIED WORK ONLY

**Exact remaining scope for Phase C (CorrectChoice audit):**
- 874 active Certified MCQs (B:351, C:174, D:248, E:101) — each needs independent answer derivation
- 1,012 active non-Certified MCQs — lower priority but needed for full-pool safety

**Exact remaining scope for Phase D (Pack C DL-016):**
- 175 Pack C Certified items — object-level parse with metadata→content alignment
- Determine metadata-only vs. true answer-key rotation classification

**Next safe task:**
1. Implement the authoritative object-level DL-008 detector (string-aware parser with QID→CC→EW[CC] path)
2. Run the authoritative detector on Packs B, C, D, E to establish true DL-008 counts
3. Begin CorrectChoice ground-truth audit on Pack E (smallest Certified pool, 101 items) as pilot
4. After Pack E pilot validates methodology, scale to Packs C, D, B
5. Document remediation-eligible population (ALL_AGREE verdicts only)

**Governance Warnings Logged (this session):**
- GOV-001: "Hold" items (P1-AD-047, P1-AD-048) served as Tier 2/3 — not in hard-exclusion list (app.js:116)
- GOV-002: No 50% MCQ gate before CBQ access in Full exam simulation mode
- GOV-003: Pack A (500 MCQs, 204 Certified) exists on disk but is unreachable at runtime
- GOV-004: 0 of 75 cases have question_state: "Certified" — all are Unprocessed (Tier 2)
- GOV-005: Prior DL-008 counts across all packs are INVALIDATED_BY_DL_029 (methodology defect confirmed)

---

*Generated 2026-07-23 — Phase 0B continuation session, read-only audit.*
