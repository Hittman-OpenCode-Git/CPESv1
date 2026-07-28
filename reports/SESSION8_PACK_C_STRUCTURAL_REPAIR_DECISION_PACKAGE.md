# Session 8 — Pack C BC-094 / BC-095 Structural Repair Decision Package

**Date:** 2026-07-24
**Status:** READ-ONLY — REPAIR NOT APPLIED
**Recommendation:** `SAFE MINIMAL STRUCTURAL REPAIR CAN BE PLANNED — HUMAN WRITE AUTHORIZATION REQUIRED`

---

## 1. Repair Recommendation

**`SAFE MINIMAL STRUCTURAL REPAIR CAN BE PLANNED — HUMAN WRITE AUTHORIZATION REQUIRED`**

The structural defect (one object containing two QIDs) can be resolved by splitting the merged object into two independent objects. This is a boundary-level operation — no content authoring is required if the goal is purely structural restoration. However, BC-094's missing ChoiceD and ExplanationWrongD, and both QIDs' content-quality issues (DL-010 misattributions, Topic contamination), require separate editorial decisions. The structural split itself is deterministic and can be specified precisely from the source map.

---

## 2. Before-State Structural Description

### 2.1 Current Structure (Single Object, lines 8952–9046)

The merged object contains two interleaved QID records without an object-boundary separator (`}, {`) between them.

**BC-094's segment (lines 8952–8999):**
- Content block: Part=1, Section="B", SectionName, Topic="B.094 what if sensitivity analysis budgeting", MicroTopic, UniqueConceptKey, Difficulty="Difficult", Stem about Silverton (sensitivity analysis), nested Choices (A=Standard costing, B=Sensitivity, C=Zero-based, D=Responsibility), CorrectChoice="B", ExplanationCorrect about sensitivity/what-if analysis, StudyLinks[2], boilerplate fields
- Metadata block: QuestionID="P1-BC-094" (line 8985), CalculationItem, VerifiedChecks[5], ChoiceA, ExplanationWrongA (budget slack text — misattributed), ChoiceB, ExplanationWrongB (budget slack text — misattributed), ChoiceC, ExplanationWrongC (ZBB vs sensitivity — correct topic)
- **TRUNCATED:** ChoiceD is absent. ExplanationWrongD is absent. question_state is absent. Instead of these fields, BC-095's content begins.

**MERGE POINT: Line 8999 → Line 9000** — No `}, {` separator. BC-094's metadata block is interrupted after ExplanationWrongC.

**BC-095's segment (lines 9000–9045):**
- Content block: MicroTopic="budget slack detection", UniqueConceptKey, Difficulty="Moderate", Stem about Thornfield's controller (budget slack detection), nested Choices (A=lower sales price, B=external auditors, C=budgetary slack, D=discontinue budgeting), CorrectChoice="C", ExplanationCorrect about budgetary slack, StudyLinks[2], boilerplate fields
- Metadata block: QuestionID="P1-BC-095" (line 9028), CalculationItem, VerifiedChecks[5], ChoiceA, ExplanationWrongA (budget slack vs pricing — correct topic), ChoiceB, ExplanationWrongB (DL-010: references ChoiceD concept instead of ChoiceB), ChoiceC, ExplanationWrongC="" (CC slot, DL-008 compliant), ChoiceD, ExplanationWrongD (correct topic), question_state="Certified"

### 2.2 Key Structural Facts

1. **34 field keys appear twice** — BC-095's values overwrite BC-094's for all learner-facing content
2. **BC-094 has 3 fields BC-095 lacks:** `Part`, `Section`, `SectionName` — these survive intact
3. **BC-094 has `Topic` but BC-095 doesn't** — Topic survives from BC-094, contaminating BC-095's label
4. **BC-094 is missing:** `ChoiceD`, `ExplanationWrongD`, `question_state`
5. **BC-095 is missing:** `Part`, `Section`, `SectionName`, `Topic`
6. **BC-095's ExplanationWrongB is DL-010 misattributed** — references ChoiceD concept
7. **BC-094's ExplanationWrongA and B are DL-010 misattributed** — describe budget slack, not sensitivity analysis

---

## 3. Proposed After-State Structure (Two Independent Objects)

### 3.1 Object 1: P1-BC-094 (Reconstructed)

```
{
  // === CONTENT BLOCK (lines 8952-8983, unchanged) ===
  "Part": 1,
  "Section": "B",
  "SectionName": "Planning, Budgeting, and Forecasting",
  "Topic": "B.094 what if sensitivity analysis budgeting",
  "MicroTopic": "what if sensitivity analysis budgeting",
  "UniqueConceptKey": "B-C094-what-if-sensitivity-analysis-budgeting",
  "LOSTag": "B Planning and budgeting",
  "Difficulty": "Difficult",
  "ItemType": "MCQ",
  "ItemStyle": "single-select",
  "Stem": "Silverton models several scenarios... [sensitivity analysis]",
  "Choices": {
    "A": "Standard costing, which sets a single fixed benchmark",
    "B": "Sensitivity (what-if) analysis, which shows how outcomes change with different assumptions",
    "C": "Zero-based budgeting, which resets every account",
    "D": "Responsibility accounting, which assigns costs to managers"
  },
  "CorrectChoice": "B",
  "ExplanationCorrect": "Sensitivity or what-if analysis models... [current text preserved]",
  "StudyLinks": [ /* 2 entries, unchanged */ ],
  "SourceDescription": "Original CMA Part 1 exam-style practice...",
  "Part1OnlyFlag": true,
  "ReviewNote": "If missed or marked, review the linked study materials...",
  "QuestionID": "P1-BC-094",
  "CalculationItem": false,
  "VerifiedChecks": [ /* 5 entries, unchanged */ ],

  // === METADATA BLOCK (RECONSTRUCTED) ===
  "ChoiceA": "Standard costing, which sets a single fixed benchmark",
  "ExplanationWrongA": "[CONTENT DECISION — currently holds budget slack text; needs sensitivity analysis distractor]",
  "ChoiceB": "Sensitivity (what-if) analysis, which shows how outcomes change with different assumptions",
  "ExplanationWrongB": "",      // CorrectChoice = B, DL-008 enforcement
  "ChoiceC": "Zero-based budgeting, which resets every account",
  "ExplanationWrongC": "[current ZBB vs sensitivity text — correct topic for BC-094]",
  "ChoiceD": "Responsibility accounting, which assigns costs to managers",
  "ExplanationWrongD": "[CONTENT DECISION — missing; needs responsibility accounting distractor for sensitivity scenario]",
  "question_state": "Certified"
},
```

### 3.2 Object 2: P1-BC-095 (Reconstructed)

```
{
  // === CONTENT BLOCK (RECONSTRUCTED — missing fields filled from BC-094 + sequential inference) ===
  "Part": 1,
  "Section": "B",
  "SectionName": "Planning, Budgeting, and Forecasting",
  "Topic": "B.095 budget slack detection",    // RECONSTRUCTED from sequential pattern (BC-094="B.094...", BC-096="B.096...")
  "MicroTopic": "budget slack detection",
  "UniqueConceptKey": "B-C095-budget-slack-detection",
  "LOSTag": "B Planning and budgeting",
  "Difficulty": "Moderate",
  "ItemType": "MCQ",
  "ItemStyle": "single-select",
  "Stem": "Thornfield's controller notices a department consistently beats its budget... [budget slack]",
  "Choices": {
    "A": "Whether the company should receive a lower sales price",
    "B": "Whether external auditors approved the budget",
    "C": "Whether the department has built budgetary slack into its targets to make them easier to achieve",
    "D": "Whether the company should discontinue budgeting entirely"
  },
  "CorrectChoice": "C",
  "ExplanationCorrect": "Consistently exceeding budget targets... [current text preserved]",
  "StudyLinks": [ /* 2 entries, unchanged */ ],
  "SourceDescription": "Original CMA Part 1 exam-style practice...",
  "Part1OnlyFlag": true,
  "ReviewNote": "If missed or marked, review the linked study materials...",
  "QuestionID": "P1-BC-095",
  "CalculationItem": false,
  "VerifiedChecks": [ /* 5 entries, unchanged */ ],

  // === METADATA BLOCK (preserved, 1 field needs content fix) ===
  "ChoiceA": "Whether the company should receive a lower sales price",
  "ExplanationWrongA": "[current text — budget slack vs pricing, correct topic]",
  "ChoiceB": "Whether external auditors approved the budget",
  "ExplanationWrongB": "[CONTENT DECISION — currently misattributed; references ChoiceD concept; needs 'external auditors vs slack' explanation]",
  "ChoiceC": "Whether the department has built budgetary slack into its targets to make them easier to achieve",
  "ExplanationWrongC": "",
  "ChoiceD": "Whether the company should discontinue budgeting entirely",
  "ExplanationWrongD": "[current text — correct topic for ChoiceD]",
  "question_state": "Certified"
},
```

---

## 4. Exact Fields That Must Move, Split, or Be Reassociated

### 4.1 Fields Extracted from BC-094's Original Block

| Field | Source Line | Action |
|-------|------------|--------|
| `Part` | 8953 | Keep in BC-094, **copy to BC-095** |
| `Section` | 8954 | Keep in BC-094, **copy to BC-095** |
| `SectionName` | 8955 | Keep in BC-094, **copy to BC-095** |
| `Topic` | 8956 | Keep in BC-094 as "B.094 what if sensitivity analysis budgeting" |
| `MicroTopic` | 8957 | Keep in BC-094 as "what if sensitivity analysis budgeting" |
| `UniqueConceptKey` | 8958 | Keep in BC-094 |
| `Difficulty` | 8960 | Keep in BC-094 as "Difficult" |
| `Stem` | 8963 | Keep in BC-094 (Silverton scenario) |
| `Choices` | 8964-8968 | Keep in BC-094 (sensitivity analysis choices) |
| `CorrectChoice` | 8970 | Keep in BC-094 as "B" |
| `ExplanationCorrect` | 8971 | Keep in BC-094 |
| `StudyLinks` | 8972-8981 | Keep in BC-094, **copy to BC-095** |
| `SourceDescription` | 8982 | Keep in BC-094, **copy to BC-095** |
| `Part1OnlyFlag` | 8983 | Keep in BC-094, **copy to BC-095** |
| `ReviewNote` | 8984 | Keep in BC-094, **copy to BC-095** |
| `QuestionID` | 8985 | Keep in BC-094 as "P1-BC-094" |
| `CalculationItem` | 8986 | Keep in BC-094, **copy to BC-095** |
| `VerifiedChecks` | 8987-8992 | Keep in BC-094, **copy to BC-095** |
| `ChoiceA` | 8994 | Keep in BC-094 |
| `ExplanationWrongA` | 8995 | Present in BC-094; **content rewrite needed** (budget slack text → sensitivity distractor) |
| `ChoiceB` | 8996 | Keep in BC-094 |
| `ExplanationWrongB` | 8997 | **Must become ""** (CorrectChoice=B, DL-008 rule) |
| `ChoiceC` | 8998 | Keep in BC-094 |
| `ExplanationWrongC` | 8999 | Keep in BC-094 (ZBB vs sensitivity text — correct for BC-094's topic) |

### 4.2 Fields Extracted from BC-095's Embedded Block

| Field | Source Line | Action |
|-------|------------|--------|
| `MicroTopic` | 9000 | Move to BC-095 as "budget slack detection" |
| `UniqueConceptKey` | 9001 | Move to BC-095 |
| `Difficulty` | 9003 | Move to BC-095 as "Moderate" |
| `Stem` | 9006 | Move to BC-095 (Thornfield scenario) |
| `Choices` | 9007-9011 | Move to BC-095 |
| `CorrectChoice` | 9013 | Move to BC-095 as "C" |
| `ExplanationCorrect` | 9014 | Move to BC-095 |
| `QuestionID` | 9028 | Move to BC-095 as "P1-BC-095" |
| `ChoiceA` | 9037 | Move to BC-095 |
| `ExplanationWrongA` | 9038 | Move to BC-095 (correct topic) |
| `ChoiceB` | 9039 | Move to BC-095 |
| `ExplanationWrongB` | 9040 | Move to BC-095; **content rewrite needed** (DL-010: describes ChoiceD not ChoiceB) |
| `ChoiceC` | 9041 | Move to BC-095 |
| `ExplanationWrongC` | 9042 | Move to BC-095 (present as "", CorrectChoice=C, DL-008 OK) |
| `ChoiceD` | 9043 | Move to BC-095 |
| `ExplanationWrongD` | 9044 | Move to BC-095 (correct topic) |
| `question_state` | 9045 | **Copy to both** BC-094 and BC-095 as "Certified" |

### 4.3 Fields That Must Be NEWLY CREATED

| Field | For QID | Value | Deterministic? |
|-------|---------|-------|---------------|
| `Topic` | BC-095 | "B.095 budget slack detection" | YES — inferred from sequential numbering + MicroTopic |
| `ChoiceD` | BC-094 | "Responsibility accounting, which assigns costs to managers" | YES — from content block `Choices.D` (line 8968) |
| `ExplanationWrongD` | BC-094 | Requires content authoring | NO — missing; needs editorial write |
| `ExplanationWrongA` | BC-094 | Requires content rewrite | NO — holds budget slack text; needs sensitivity topic rewrite |
| `ExplanationWrongB` | BC-094 | "" (empty — CorrectChoice=B) | YES — DL-008 compliance |
| `ExplanationWrongB` | BC-095 | Requires content rewrite | NO — DL-010: references ChoiceD concept |
| `question_state` | BC-094 | "Certified" | YES — Section B is fully Certified |

---

## 5. Content Decision vs. Structure Decision Analysis

### 5.1 What Structure Alone Determines (9 Deterministic Actions)

| Action | Deterministic Basis |
|--------|-------------------|
| Object boundary split at line 8999/9000 | Exact merge point identified in source map |
| BC-094 content block preservation (lines 8952-8983) | Intact in source |
| BC-095 content + metadata extraction (lines 9000-9045) | Intact in source |
| BC-095 Topic = "B.095 budget slack detection" | Sequential pattern: BC-093="B.093...", BC-094="B.094...", BC-096="B.096 budget slack detection" |
| BC-094 ChoiceD = "Responsibility accounting..." | From BC-094 content block `Choices.D` |
| BC-094 EW-B = "" | CorrectChoice=B → DL-008 enforcement |
| BC-094/095 Part/Section/SectionName copy | BC-095 lacks these; BC-094's values are correct for Section B |
| Both question_state = "Certified" | Section B is 100/100 Certified |
| StudyLinks/SourceDescription/etc. copy to BC-095 | BC-095 lacks these shared fields |

### 5.2 What Requires Content / Editorial Decision (3 Non-Deterministic Actions)

| Action | Why Not Deterministic |
|--------|----------------------|
| BC-094 EW-A rewrite | Current text is about budget slack (BC-095's topic), not sensitivity analysis |
| BC-094 EW-D authoring | Missing entirely — no source text exists; must be authored from scratch |
| BC-095 EW-B rewrite | Current text references ChoiceD's concept (DL-010 misattribution) |

**These 3 content decisions do NOT block the structural repair.** The split can proceed with the current (wrong) text preserved in the right slots, flagged for later editorial review. Content quality is separate from structural integrity.

---

## 6. Minimum Viable Repair (Structure-Only, Zero Content Authoring)

| Step | Action | Purpose |
|------|--------|---------|
| 1 | Insert `}, {` between line 8999 and 9000 | Split one object into two |
| 2 | Add Part=1, Section="B", SectionName, Topic="B.095 budget slack detection" to BC-095's object | Fill fields BC-095 lacks |
| 3 | Add ChoiceD="Responsibility accounting..." to BC-094's metadata | Fill missing metadata field from content block |
| 4 | Add ExplanationWrongD="" to BC-094 | Placeholder — flags need for editorial review |
| 5 | Set BC-094 EW-B to "" | DL-008 compliance |
| 6 | Add question_state="Certified" to BC-094 | Match Section B certification |
| 7 | Copy StudyLinks/SourceDescription/Part1OnlyFlag/ReviewNote/VerifiedChecks/CalculationItem to BC-095 | Fill shared fields BC-095 lacks |
| 8 | Flag BC-094 EW-A, BC-094 EW-D, BC-095 EW-B for editorial review | Content-quality defects deferred |

**Result:** 500 objects (was 499), 500 QuestionIDs (unchanged), 175 Certified lines (was 174), 0 duplicate QuestionID keys. Content-quality defects documented but not blocking.

---

## 7. Required Pre-Repair Evidence

| Evidence | Rationale |
|----------|-----------|
| SHA-256 pre-repair hash: `C934FD69...` | Source integrity baseline |
| `pack_c_corrected.js.bak-20260724HHMMSS` | Rollback per BACKUP_PROTOCOL.md |
| No concurrent Pack C writers confirmed | Only one session operating at repair time |
| Human write authorization | Per AGENTS.md §2 |
| BC-096 Topic confirmed: "B.096 budget slack detection" | Validates BC-095 Topic inference |

---

## 8. Required Post-Repair Verification (16 Checks)

| # | Check | Target |
|---|-------|--------|
| 1 | `grep -c '"QuestionID"'` | 500 |
| 2 | String-aware object parse count | 500 |
| 3 | BC-094 object JSON.parse-able, single QuestionID | Pass |
| 4 | BC-095 object JSON.parse-able, single QuestionID | Pass |
| 5 | BC-094 CorrectChoice | "B" |
| 6 | BC-095 CorrectChoice | "C" |
| 7 | BC-094 EW-B | "" |
| 8 | BC-095 EW-C | "" |
| 9 | BC-094 Stem contains "Silverton" | Yes |
| 10 | BC-095 Stem contains "Thornfield" | Yes |
| 11 | `grep -c '"question_state": "Certified"'` | 175 |
| 12 | `MCQ_BANK_C.length === 500` | Yes |
| 13 | Byte-diff: only lines 8952-9046 region changed | Yes |
| 14 | `node scripts/validate.js` — 0 new errors | Yes |
| 15 | `node scripts/test_governance_guard.js` — 12/12 PASS | Yes |
| 16 | Independent agent verification of 1-15 | All pass |

---

## 9. Rollback Plan

1. Restore `pack_c_corrected.js` from timestamped pre-repair backup
2. Re-run checks 1, 2, 3, 4, 8 — must match pre-repair state
3. SHA-256 must match pre-repair hash
4. If rollback fails: escalate to human; do NOT attempt second repair from corrupted state

---

## 10. Concurrency Conditions

| Condition | Requirement |
|-----------|------------|
| Exclusive file access | No other session writing Pack C during repair |
| Backup protocol | Mandatory before first byte change |
| Max items per batch | 2 (below Rule 5 cap of 30) |
| Content deferral | 3 EW fields deferred to editorial pass (documented) |
| Post-repair: BC-094 status | QUARANTINED → Certified (or In Audit if content quality review required) |
| Post-repair: BC-095 status | Remains Certified |

---

*Generated 2026-07-24 — Session 8, read-only structural investigation*
