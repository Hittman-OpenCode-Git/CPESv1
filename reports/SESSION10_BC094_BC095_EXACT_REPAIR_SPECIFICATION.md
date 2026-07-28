# Session 10 — BC-094 / BC-095 Exact Repair Specification

**Date:** 2026-07-24
**Session Status:** `READ-ONLY — REPAIR SPECIFICATION GENERATED; NO SOURCE WRITE AUTHORIZED OR PERFORMED`
**Parent Analysis:** Session 8 (object-boundary investigation), Session 8 (structural repair decision package)
**Derived Standard:** AGENTS.md §2 (read-only by default), BACKUP_PROTOCOL.md, CAQS_v1.0.md §4.4 (EV8 / DL-008)

---

## 1. PRE-FLIGHT SOURCE-STABILITY GATE

### 1.1 Pack C Current State

| Property | Value |
|----------|-------|
| File | `pack_c_corrected.js` |
| SHA-256 | `C934FD694CF718AF0D85F838AB350199385610A60D0DC9662DC9C47A8516ECE8` |
| Byte size | 1,767,306 |
| Last modified | 2026-07-24 11:22:19 |
| Encoding | UTF-8 without BOM |
| Line-ending style | CRLF (27,721 pairs), LF-only (52) |
| First byte | `0x2F` (`/`) — JavaScript comment |
| Total lines | 27,773 |
| `"QuestionID"` grep count | 500 |
| `"question_state": "Certified"` grep count | 174 |

### 1.2 Hash Verification

| Check | Time | SHA-256 | Match? |
|-------|------|---------|--------|
| Session 8 recorded baseline | 2026-07-24 | `C934FD69...6ECE8` | — |
| Session 10 pre-flight | 2026-07-24 | `C934FD69...6ECE8` | YES |
| Session 10 mid-session re-verify | 2026-07-24 | `C934FD69...6ECE8` | YES |
| Session 10 close verify | PENDING | — | — |

### 1.3 Gate Status

**PASS — Pack C unchanged. BC-094/095 region verified at Session 8 offsets/lines. Repair specification valid.**

---

## 2. REGION BOUNDARY VERIFICATION

### 2.1 Adjacent Object Confirmation

| Boundary | QID | Line | Byte Offset |
|----------|-----|------|------------|
| BC-093 closes | P1-BC-093 | 8951 | 639,003 |
| **BC-094/095 merged opens** | — | 8952 | 639,009 |
| BC-094 QuestionID | P1-BC-094 | 8985 | 640,596 |
| BC-094 last field (EW_C) | — | 8999 | 642,653 |
| **MERGE POINT — no `}, {`** | — | 8999/9000 | 643,260 (end of line 8999) |
| BC-095 first field (MicroTopic) | — | 9000 | 643,262 |
| BC-095 QuestionID | P1-BC-095 | 9028 | 644,957 |
| BC-094/095 merged closes | — | 9046 | 647,678 |
| BC-096 opens | P1-BC-096 | 9047 | 647,684 |
| BC-096 QuestionID | P1-BC-096 | 9080 | — |
| BC-096 Topic | "B.096 budget slack detection" | 9051 | — |

### 2.2 Merge-Point Diagnostic Content

**Line 8999 (BC-094's last field — ExplanationWrongC):**
```javascript
    "ExplanationWrongC": "Zero-based budgeting requires all expenses to be justified from scratch each budget period, eliminating legacy spending assumptions. Sensitivity (what-if) analysis serves an entirely different purpose\u2014it models multiple scenarios by changing key input assumptions such as sales volume or material cost to explore how outcomes vary under uncertainty. Zero-based budgeting addresses cost justification; sensitivity analysis addresses uncertainty exploration. Selecting this option conflates a budget-preparation methodology with a risk-assessment and scenario-modeling technique.",
```

**Line 9000 (BC-095's first field — MicroTopic, NO object boundary):**
```javascript
    "MicroTopic": "budget slack detection",
```

**Diagnostic pattern:** BC-094's ExplanationWrongC is NOT followed by ChoiceD, ExplanationWrongD, question_state, or `},`. Instead, BC-095's MicroTopic begins immediately. This is the merge defect.

### 2.3 Region Structural Integrity

- BC-093 → merged: Normal `},` at line 8951 — correct array separator
- Merged → BC-096: Normal `},` at line 9046 — correct array separator
- Array-level syntax: VALID
- Adjacent objects: UNAFFECTED
- Scope scan (Session 8, string-aware): No other merged-object defects in Pack C

---

## 3. EXACT INSERTION POINT

### 3.1 Primary Insertion (Object Boundary Split)

| Parameter | Value |
|-----------|-------|
| Insertion line position | Between line 8999 and line 9000 |
| Insertion byte offset | 643,262 (start of line 9000 content) |
| Current content at insertion point | `"MicroTopic": "budget slack detection",` |
| Insertion type | Prepend text before line 9000 |

### 3.2 Before/After Delimiter Context (Sufficient to Prove Insertion Point)

**BEFORE context (end of line 8999, last 60 chars):**
```
hodology with a risk-assessment and scenario-modeling technique.",
```

**AFTER context (start of line 9000, first 60 chars):**
```
    "MicroTopic": "budget slack detection",
```

This before/after pair is unique in `pack_c_corrected.js`. A search for either delimiter alone yields a single match. Combined, the pair is an unambiguous insertion-point fingerprint.

---

## 4. FULL ORDERED FIELD MAP — BC-094 (RECONSTRUCTED)

Object opens at line 8952; closes at newly-inserted `},` after reconstructed metadata.

### 4.1 BC-094 Content Block (lines 8952–8983 — PRESERVED UNCHANGED)

| Order | Field | Line | Source | Action |
|-------|-------|------|--------|--------|
| 1 | `Part` | 8953 | Existing | Preserve |
| 2 | `Section` | 8954 | Existing | Preserve |
| 3 | `SectionName` | 8955 | Existing | Preserve |
| 4 | `Topic` | 8956 | Existing | Preserve — "B.094 what if sensitivity analysis budgeting" |
| 5 | `MicroTopic` | 8957 | Existing | Preserve |
| 6 | `UniqueConceptKey` | 8958 | Existing | Preserve |
| 7 | `LOSTag` | 8959 | Existing | Preserve |
| 8 | `Difficulty` | 8960 | Existing | Preserve — "Difficult" |
| 9 | `ItemType` | 8961 | Existing | Preserve |
| 10 | `ItemStyle` | 8962 | Existing | Preserve |
| 11 | `Stem` | 8963 | Existing | Preserve — Silverton / sensitivity analysis |
| 12 | `Choices` | 8964 | Existing | Preserve — nested object with A/B/C/D |
| 13 | `CorrectChoice` | 8970 | Existing | Preserve — "B" |
| 14 | `ExplanationCorrect` | 8971 | Existing | Preserve |
| 15 | `StudyLinks` | 8972 | Existing | Preserve — 2 entries |
| 16 | `SourceDescription` | 8982 | Existing | Preserve |
| 17 | `Part1OnlyFlag` | 8983 | Existing | Preserve |

### 4.2 BC-094 Metadata Block (lines 8984–8999 + INSERTED CLOSURE)

| Order | Field | Line | Source | Action | Structural Certainty |
|-------|-------|------|--------|--------|----------------------|
| 18 | `ReviewNote` | 8984 | Existing | Preserve | CERTAIN |
| 19 | `QuestionID` | 8985 | Existing | Preserve — "P1-BC-094" | CERTAIN |
| 20 | `CalculationItem` | 8986 | Existing | Preserve | CERTAIN |
| 21 | `VerifiedChecks` | 8987 | Existing | Preserve — 5 entries | CERTAIN |
| 22 | `ChoiceA` | 8994 | Existing | Preserve — "Standard costing, which sets a single fixed benchmark" | CERTAIN |
| 23 | `ExplanationWrongA` | 8995 | Existing content | **EDITORIAL — WRONG TOPIC.** Text describes budget slack ("A department consistently beating its budget by a wide margin..."), not standard costing vs. sensitivity analysis. Preserve as-is for split; flag for editorial rewrite. | CERTAIN (field exists; content quality is editorial) |
| 24 | `ChoiceB` | 8996 | Existing | Preserve — "Sensitivity (what-if) analysis, which shows how outcomes change with different assumptions" | CERTAIN |
| 25 | `ExplanationWrongB` | 8997 | Existing | **CHANGE to ""** — DL-008 enforcement. CorrectChoice=B. Current text ("Budgetary slack is an internal behavioral phenomenon...") describes budget slack, not BC-094's topic. Zero content loss: ExplanationCorrect independently contains the full explanation. | CERTAIN — mechanically determined by CorrectChoice="B" |
| 26 | `ChoiceC` | 8998 | Existing | Preserve — "Zero-based budgeting, which resets every account" | CERTAIN |
| 27 | `ExplanationWrongC` | 8999 | Existing | Preserve — ZBB vs. sensitivity analysis distinction. Correct topic for BC-094. | CERTAIN |
| 28 | `ChoiceD` | INSERTED | Content block line 8968 | **INSERT** — "Responsibility accounting, which assigns costs to managers" | CERTAIN — mechanically determined from `Choices.D` |
| 29 | `ExplanationWrongD` | INSERTED | Absent | **INSERT as ""** — Needs editorial authoring (responsibility accounting as distractor for sensitivity analysis topic). Empty string is renderer-safe (schema permits empty). | CERTAIN — field must exist; content is editorial |
| 30 | `question_state` | INSERTED | Absent | **INSERT as "Certified"** — Section B is fully Certified per batch manifest | CERTAIN — Section B certification confirmed |

**BC-094 object closes with `},` after field 30.**

---

## 5. FULL ORDERED FIELD MAP — BC-095 (RECONSTRUCTED)

Object opens at newly-inserted `{` after BC-094's closure; existing content runs lines 9000–9045.

### 5.1 BC-095 INSERTED HEADER Fields (before existing MicroTopic)

| Order | Field | Source | Action | Structural Certainty |
|-------|-------|--------|--------|----------------------|
| 1 | `Part` | Copy from BC-094 line 8953 | **INSERT** — "1" | CERTAIN — same pack section |
| 2 | `Section` | Copy from BC-094 line 8954 | **INSERT** — "B" | CERTAIN — same pack section |
| 3 | `SectionName` | Copy from BC-094 line 8955 | **INSERT** — "Planning, Budgeting, and Forecasting" | CERTAIN — same pack section |
| 4 | `Topic` | Inferred from sequential pattern | **INSERT** — "B.095 budget slack detection" | CERTAIN — BC-094="B.094...", BC-096="B.096 budget slack detection", Registry confirms BC-095 Topic="B.095 budget slack detection" |

### 5.2 BC-095 Content Block (lines 9000–9027 — PRESERVED UNCHANGED)

| Order | Field | Line | Source | Action |
|-------|-------|------|--------|--------|
| 5 | `MicroTopic` | 9000 | Existing | Preserve — "budget slack detection" |
| 6 | `UniqueConceptKey` | 9001 | Existing | Preserve |
| 7 | `LOSTag` | 9002 | Existing | Preserve |
| 8 | `Difficulty` | 9003 | Existing | Preserve — "Moderate" |
| 9 | `ItemType` | 9004 | Existing | Preserve |
| 10 | `ItemStyle` | 9005 | Existing | Preserve |
| 11 | `Stem` | 9006 | Existing | Preserve — Thornfield / budget slack |
| 12 | `Choices` | 9007 | Existing | Preserve — nested object with A/B/C/D |
| 13 | `CorrectChoice` | 9013 | Existing | Preserve — "C" |
| 14 | `ExplanationCorrect` | 9014 | Existing | Preserve |
| 15 | `StudyLinks` | 9015 | Existing | Preserve — 2 entries |
| 16 | `SourceDescription` | 9025 | Existing | Preserve |
| 17 | `Part1OnlyFlag` | 9026 | Existing | Preserve |

### 5.3 BC-095 Metadata Block (lines 9027–9045 — PRESERVED, 1 FIELD FLAGGED)

| Order | Field | Line | Source | Action | Structural Certainty |
|-------|-------|------|--------|--------|----------------------|
| 18 | `ReviewNote` | 9027 | Existing | Preserve | CERTAIN |
| 19 | `QuestionID` | 9028 | Existing | Preserve — "P1-BC-095" | CERTAIN |
| 20 | `CalculationItem` | 9029 | Existing | Preserve | CERTAIN |
| 21 | `VerifiedChecks` | 9030 | Existing | Preserve — 5 entries | CERTAIN |
| 22 | `ChoiceA` | 9037 | Existing | Preserve | CERTAIN |
| 23 | `ExplanationWrongA` | 9038 | Existing | Preserve — budget slack vs. pricing (correct topic) | CERTAIN |
| 24 | `ChoiceB` | 9039 | Existing | Preserve | CERTAIN |
| 25 | `ExplanationWrongB` | 9040 | Existing content | **EDITORIAL — DL-010 MISATTRIBUTION.** ChoiceB = "Whether external auditors approved the budget" but ExplanationWrongB describes "discontinue budgeting" (ChoiceD's concept). Preserve as-is for split; flag for editorial rewrite. | CERTAIN (field exists; content quality is editorial) |
| 26 | `ChoiceC` | 9041 | Existing | Preserve | CERTAIN |
| 27 | `ExplanationWrongC` | 9042 | Existing | Preserve — "" (DL-008 compliant, CorrectChoice=C) | CERTAIN |
| 28 | `ChoiceD` | 9043 | Existing | Preserve | CERTAIN |
| 29 | `ExplanationWrongD` | 9044 | Existing | Preserve — budget slack vs. discontinue budgeting (correct topic) | CERTAIN |
| 30 | `question_state` | 9045 | Existing | Preserve — "Certified" | CERTAIN |

**BC-095 object closes with `},` at existing line 9046.**

---

## 6. FIELD-ORIGIN MATRIX

### 6.1 Fields Extracted from BC-094's Block Only

| Field | Source Line | Current Value | Destination(s) | Assignment Type | Can Preserve Unchanged? |
|-------|------------|---------------|----------------|-----------------|------------------------|
| `Part` | 8953 | 1 | BC-094 + **copy to BC-095** | Structural certainty | YES |
| `Section` | 8954 | "B" | BC-094 + **copy to BC-095** | Structural certainty | YES |
| `SectionName` | 8955 | "Planning, Budgeting, and Forecasting" | BC-094 + **copy to BC-095** | Structural certainty | YES |
| `Topic` | 8956 | "B.094 what if sensitivity analysis budgeting" | BC-094 only | Structural certainty | YES (for BC-094) |
| `Stem` | 8963 | Silverton / sensitivity analysis | BC-094 only | Structural certainty | YES |
| `Choices` | 8964-8969 | Sensitivity analysis choices | BC-094 only | Structural certainty | YES |
| `CorrectChoice` | 8970 | "B" | BC-094 only | Structural certainty | YES |
| `ExplanationCorrect` | 8971 | Sensitivity analysis text | BC-094 only | Structural certainty | YES |
| `ChoiceA` (metadata) | 8994 | "Standard costing..." | BC-094 only | Structural certainty | YES |
| `ChoiceB` (metadata) | 8996 | "Sensitivity (what-if)..." | BC-094 only | Structural certainty | YES |
| `ChoiceC` (metadata) | 8998 | "Zero-based budgeting..." | BC-094 only | Structural certainty | YES |

### 6.2 Fields Extracted from BC-095's Embedded Block Only

| Field | Source Line | Current Value | Destination(s) | Assignment Type | Can Preserve Unchanged? |
|-------|------------|---------------|----------------|-----------------|------------------------|
| `MicroTopic` | 9000 | "budget slack detection" | BC-095 only | Structural certainty | YES |
| `UniqueConceptKey` | 9001 | "B-C095-budget-slack-detection" | BC-095 only | Structural certainty | YES |
| `Difficulty` | 9003 | "Moderate" | BC-095 only | Structural certainty | YES |
| `Stem` | 9006 | Thornfield / budget slack | BC-095 only | Structural certainty | YES |
| `Choices` | 9007-9011 | Budget slack choices | BC-095 only | Structural certainty | YES |
| `CorrectChoice` | 9013 | "C" | BC-095 only | Structural certainty | YES |
| `ExplanationCorrect` | 9014 | Budget slack text | BC-095 only | Structural certainty | YES |
| `QuestionID` | 9028 | "P1-BC-095" | BC-095 only | Structural certainty | YES |
| `ChoiceA` (metadata) | 9037 | "Whether company should receive..." | BC-095 only | Structural certainty | YES |
| `ChoiceB` (metadata) | 9039 | "Whether external auditors approved" | BC-095 only | Structural certainty | YES |
| `ChoiceC` (metadata) | 9041 | "Whether dept has built slack" | BC-095 only | Structural certainty | YES |
| `ChoiceD` (metadata) | 9043 | "Whether to discontinue budgeting" | BC-095 only | Structural certainty | YES |

### 6.3 Shared Fields (Identical or Near-Identical in Both)

| Field | BC-094 Line | BC-095 Line | Action | Can Preserve Unchanged? |
|-------|------------|-------------|--------|------------------------|
| `LOSTag` | 8959 | 9002 | Use BC-094's for BC-094, BC-095's for BC-095 (identical) | YES |
| `ItemType` | 8961 | 9004 | Use BC-094's for BC-094, BC-095's for BC-095 (identical) | YES |
| `ItemStyle` | 8962 | 9005 | Use each QID's own | YES |
| `StudyLinks` | 8972-8981 | 9015-9024 | Use each QID's own (identical) | YES |
| `SourceDescription` | 8982 | 9025 | Use each QID's own (identical) | YES |
| `Part1OnlyFlag` | 8983 | 9026 | Use each QID's own (identical) | YES |
| `ReviewNote` | 8984 | 9027 | Use each QID's own (identical) | YES |
| `CalculationItem` | 8986 | 9029 | Use each QID's own (identical) | YES |
| `VerifiedChecks` | 8987-8992 | 9030-9035 | Use each QID's own (identical) | YES |

### 6.4 Fields with DL-016 Contamination (BC-094 Value Survives at Runtime)

| Field | BC-094 Value | BC-095 Value | Runtime Result (Current) | Post-Repair BC-095 |
|-------|-------------|-------------|------------------------|-------------------|
| `Topic` | "B.094 what if sensitivity analysis budgeting" | (absent) | "B.094..." (contaminated) | "B.095 budget slack detection" (INSERTED) |
| `Part` | 1 | (absent) | 1 | 1 (COPIED) |
| `Section` | "B" | (absent) | "B" | "B" (COPIED) |
| `SectionName` | "Planning..." | (absent) | "Planning..." | "Planning..." (COPIED) |

---

## 7. THE SEVEN REFERENCED FIELD FILLS

### 7.1 Complete Field-Fill Inventory

| # | Field | Destination QID | Current State | Required Action | Classification |
|---|-------|----------------|---------------|-----------------|----------------|
| 1 | `ChoiceD` | BC-094 | Absent from metadata | INSERT "Responsibility accounting, which assigns costs to managers" | **MECHANICAL** — from content block `Choices.D` (line 8968) |
| 2 | `ExplanationWrongB` | BC-094 | "Budgetary slack is an internal behavioral phenomenon within..." | CHANGE to "" | **MECHANICAL** — DL-008 enforcement (CorrectChoice="B") |
| 3 | `question_state` | BC-094 | Absent | INSERT "Certified" | **MECHANICAL** — Section B is fully Certified |
| 4 | `Part` | BC-095 | Absent | INSERT "1" | **MECHANICAL** — copy from BC-094 line 8953 |
| 5 | `Section` | BC-095 | Absent | INSERT "B" | **MECHANICAL** — copy from BC-094 line 8954 |
| 6 | `SectionName` | BC-095 | Absent | INSERT "Planning, Budgeting, and Forecasting" | **MECHANICAL** — copy from BC-094 line 8955 |
| 7 | `Topic` | BC-095 | Absent (runtime receives BC-094's "B.094...") | INSERT "B.095 budget slack detection" | **MECHANICAL** — sequential inference confirmed by Registry |

### 7.2 Three Editorial (Non-Mechanical) Fields

| # | Field | Destination QID | Current State | Issue |
|---|-------|----------------|---------------|-------|
| E1 | `ExplanationWrongA` | BC-094 | "A department consistently beating its budget by a wide margin suggests budget targets are set too low—not that the company's sales price needs adjustment. This pattern is a classic indicator of budgetary slack..." | **WRONG TOPIC.** Describes budget slack, not standard costing. Must be rewritten for: why "Standard costing, which sets a single fixed benchmark" is NOT sensitivity analysis. |
| E2 | `ExplanationWrongD` | BC-094 | Structurally absent | **MISSING.** Must be authored from scratch for: why "Responsibility accounting, which assigns costs to managers" is NOT sensitivity analysis. |
| E3 | `ExplanationWrongB` | BC-095 | "Option B is incorrect. Whether the company should discontinue budgeting entirely does not align with whether the department has built budgetary slack into its targets to make them easier to achieve. The correct approach involves whether the department has built budgetary slack into its targets to make them easier to achieve." | **DL-010 MISATTRIBUTION.** ChoiceB = "Whether external auditors approved the budget" but ExplanationWrongB describes "discontinue budgeting" (ChoiceD's concept). Must be rewritten to address why "external auditors approved" is not the correct investigation. |

### 7.3 Editorial Field Assessment

| Factor | E1 (BC-094 EW-A) | E2 (BC-094 EW-D) | E3 (BC-095 EW-B) |
|--------|-------------------|-------------------|-------------------|
| Can be left as-is structurally? | YES (wrong content, not wrong structure) | YES (empty string, schema permits) | YES (wrong content, not wrong structure) |
| Blocks BC-094 learner renderability? | NO (empty or wrong EW text doesn't prevent rendering) | NO (empty field is renderer-safe) | N/A (BC-095 already renders) |
| Blocks BC-095 learner renderability? | N/A | N/A | NO (BC-095 already renders) |
| Degrades educational quality? | YES — learner selecting A sees budget slack feedback for a sensitivity analysis question | YES — learner selecting D sees no explanation | YES — learner selecting B sees text about ChoiceD |
| Can be deferred to editorial pass? | YES | YES | YES |

---

## 8. MINIMUM VIABLE STRUCTURAL REPAIR (Option B: STRUCTURAL SPLIT PLUS MECHANICAL FIELD REASSOCIATION)

### 8.1 Repair Steps

| Step | Action | Lines/Bytes Affected | Content Change? |
|------|--------|---------------------|-----------------|
| 1 | Insert BC-094 closure + BC-095 opening header between line 8999 and 9000 | Byte 643,262 | YES — insert `"ChoiceD": "...",` `"ExplanationWrongD": "",` `"question_state": "Certified"` `},` `{` `"Part": 1,` `"Section": "B",` `"SectionName": "...",` `"Topic": "B.095 budget slack detection",` |
| 2 | Change BC-094 ExplanationWrongB (line 8997) to `""` | Line 8997, bytes 644,555–645,031 | YES — clear text; set to `""` |
| 3 | COPY (do not remove): `Part`/`Section`/`SectionName`/`StudyLinks`/`SourceDescription`/`Part1OnlyFlag`/`ReviewNote`/`CalculationItem`/`VerifiedChecks` from BC-094 block to BC-095 object | N/A (fields remain in BC-094; copies placed in BC-095 via Step 1 insertion + Step 4) | NO — these are copies; BC-094 retains originals |
| 4 | Insert BC-095 content-header fields (StudyLinks, SourceDescription, etc.) before line 9000 MicroTopic | Byte 643,262 | YES — insert shared boilerplate fields BC-095 currently lacks |

**Note:** Steps 1, 3, and 4 are combined in a single insertion block at byte 643,262.

### 8.2 Insertion Block Content (Exact Text)

The following text shall be inserted between line 8999 (end) and line 9000 (start), replacing the CRLF currently there:

```javascript
    "ChoiceD": "Responsibility accounting, which assigns costs to managers",
    "ExplanationWrongD": "",
    "question_state": "Certified"
  },
  {
    "Part": 1,
    "Section": "B",
    "SectionName": "Planning, Budgeting, and Forecasting",
    "Topic": "B.095 budget slack detection",
```

The existing line 9000 content (`    "MicroTopic": "budget slack detection",`) follows immediately after this insertion block.

### 8.3 Line 8997 Correction (Exact Before/After)

**BEFORE (line 8997):**
```javascript
    "ExplanationWrongB": "Budgetary slack is an internal behavioral phenomenon within the organization's planning process\u2014managers build padding into budget targets to ensure favorable variances. External auditor approval of the budget is irrelevant to this issue. The controller identifies potential slack by comparing budgeted to actual results over multiple periods, looking for patterns where actual performance consistently exceeds targets by unusually wide margins.",
```

**AFTER (line 8997):**
```javascript
    "ExplanationWrongB": "",
```

**Justification:** CorrectChoice="B" for BC-094. Per CAQS_v1.0.md §4.4 (EV8) and governance-guard.js Rule 2, ExplanationWrong[CorrectChoice] must be empty. ExplanationCorrect (line 8971) independently contains the full explanation. Zero content loss.

### 8.4 What Is NOT Changed

| Field | Line | QID | Reason Preserved |
|-------|------|-----|-----------------|
| BC-094 ExplanationWrongA | 8995 | BC-094 | Wrong topic but structurally present — deferred to editorial pass |
| BC-094 ExplanationWrongC | 8999 | BC-094 | Correct topic (ZBB vs sensitivity) — preserved |
| BC-094 ExplanationCorrect | 8971 | BC-094 | Correct for BC-094 — preserved |
| BC-095 ExplanationWrongA | 9038 | BC-095 | Correct topic — preserved |
| BC-095 ExplanationWrongB | 9040 | BC-095 | DL-010 misattribution — deferred to editorial pass |
| BC-095 ExplanationWrongC | 9042 | BC-095 | "" (DL-008 compliant) — preserved |
| BC-095 ExplanationWrongD | 9044 | BC-095 | Correct topic — preserved |
| BC-095 question_state | 9045 | BC-095 | "Certified" — preserved |

---

## 9. BC-094 LEARNER-RENDERABILITY ASSESSMENT

### 9.1 After Structural Repair (Before Editorial Fixes)

| Renderability Dimension | Status | Detail |
|------------------------|--------|--------|
| Object is independent JSON | YES | Object split creates independent parseable object |
| QuestionID is unique | YES | "P1-BC-094" — no collision with BC-095 or any other Pack C QID |
| Stem is present and correct | YES | Silverton / sensitivity analysis — correct for BC-094 |
| Choices are present and complete | YES | All four choices (A-D) present in content block; metadata ChoiceD added |
| CorrectChoice is present | YES | "B" |
| ExplanationCorrect is present | YES | Correct sensitivity analysis explanation |
| ExplanationWrong[CorrectChoice] empty | YES | EW-B set to "" (DL-008 compliant) |
| question_state is "Certified" | YES | Inserted during repair |
| DL-008 violation | 0 | EW-B is "" |
| DL-016 Topic contamination | 0 | BC-094's Topic="B.094..." is correct for BC-094 |
| DL-010 misattribution | 2 (deferred) | EW-A describes budget slack (wrong topic); EW-D is empty (awaiting editorial) |
| Pool eligibility | YES | question_state="Certified" — eligible per CAQS §1.7.1 |
| Learner sees correct stem | YES | Silverton / what-if analysis scenario |
| Learner sees correct choices | YES | Standard costing, Sensitivity, ZBB, Responsibility |
| Learner sees correct answer | YES | "B" (Sensitivity analysis) |
| Learner sees correct explanation | YES | ExplanationCorrect is correct for BC-094 |
| Learner sees distractor feedback (A) | PARTIAL | Sees budget slack text for sensitivity question — educationally confusing |
| Learner sees distractor feedback (C) | YES | ZBB vs sensitivity — correct and educational |
| Learner sees distractor feedback (D) | NO | EW-D is empty — no feedback shown |

**VERDICT:** BC-094 **IS learner-renderable** after structural repair alone. The stem, choices, correct answer, and correct-answer explanation are all accurate. Two of three distractor explanations have quality issues (EW-A wrong topic, EW-D missing), but neither blocks rendering. The item can be delivered to learners with the understanding that distractor feedback for choices A and D will be absent or misleading until the editorial pass completes.

---

## 10. BC-095 METADATA RESTORE-ABILITY

### 10.1 Can BC-095's Metadata Be Restored Mechanically?

| Field | Source for Value | Mechanical? | Certainty |
|-------|-----------------|-------------|-----------|
| `Part` | BC-094 line 8953 (=1) | YES — same for all Section B items | 100% |
| `Section` | BC-094 line 8954 (="B") | YES — same for all Section B items | 100% |
| `SectionName` | BC-094 line 8955 | YES — same for all Section B items | 100% |
| `Topic` | Sequential inference + Registry | YES — BC-093="B.093...", BC-094="B.094...", BC-096="B.096 budget slack detection"; Registry confirms BC-095="B.095 budget slack detection" | 100% |

**ANSWER:** YES. All four BC-095 metadata fields that are absent from the embedded block can be restored mechanically with zero editorial judgment. No inventing, guessing, or content authoring is required.

---

## 11. REPAIR OPTIONS EVALUATION

### Option A: STRUCTURAL SPLIT ONLY

| Action | Detail |
|--------|--------|
| Insert `}, {` between line 8999/9000 | Splits merged object into two independent objects |
| No field fills added | BC-094 lacks ChoiceD, EW-D, question_state; BC-095 lacks Part, Section, SectionName, Topic |
| BC-094 state | Object has 27 fields (missing 3). Missing question_state → renderer will see undefined → treated as Unprocessed → excluded from learner pool |
| BC-095 state | Object has 26 fields (missing 4). Missing Part/Section/SectionName → may break rendering. Missing Topic → Topic-search fails |

**Parser implications:** Both objects would parse but be structurally incomplete. `JSON.parse()` succeeds for both (valid JSON after split). However:
- BC-094 without question_state: pool filter `question_state === "Certified"` excludes it — the split would technically succeed but BC-094 would still not reach learners
- BC-095 without Part/Section/SectionName/Topic: the renderer depends on these fields for navigation and topic display. Missing fields cause `undefined` in UI labels

**Verdict:** Structurally valid but functionally incomplete. Splits the merged object but leaves both QIDs with critical missing fields. NOT recommended as standalone repair.

### Option B: STRUCTURAL SPLIT PLUS MECHANICAL FIELD REASSOCIATION (RECOMMENDED)

| Action | Detail |
|--------|--------|
| All Option A steps | Object boundary split |
| Insert 4 absent fields into BC-094 | ChoiceD (from content block), EW-D="" (placeholder), question_state="Certified", EW-B→"" (DL-008) |
| Insert 4 absent fields into BC-095 | Part, Section, SectionName (copied), Topic (inferred) |

**Parser implications:** Both objects are structurally complete and parse as valid JSON. BC-094's EW-B is "" (DL-008 compliant). BC-094 has 30 fields (complete). BC-095 has 30 fields (complete).

**Rendering implications:**
- BC-094: Learner sees correct stem, choices, answer, explanation. Two distractor explanations (A, D) have quality issues but do not block rendering.
- BC-095: Learner sees correct stem, choices, answer, explanation. EW-B has DL-010 misattribution but does not block rendering.
- Pool eligibility: Both items have `question_state: "Certified"`. Both enter learner delivery pool.

**Audit implications:** QID count stable at 500. Object count increases from 499 to 500. Certified lines increase from 174 to 175. Remaining deferred editorial work is documented and scoped.

**Risk assessment:**
- Zero content loss: All existing text preserved wherever structurally attributable
- Zero answer-key changes: CorrectChoice unchanged for both QIDs
- Zero new DL-008 violations: EW-B and EW-C correctly set to "" at their respective CC positions
- Editorial quality issues documented but not blocking

**Verdict:** RECOMMENDED. This option restores two structurally complete, pool-eligible objects while preserving all existing source content and deferring the three editorial decisions to a separate, properly-scoped pass.

### Option C: STRUCTURAL SPLIT PLUS EDITORIAL COMPLETION

| Action | Detail |
|--------|--------|
| All Option B steps | Structural split + all mechanical reassociations |
| Author 3 missing/incorrect EW fields | BC-094 EW-A rewrite, BC-094 EW-D authoring, BC-095 EW-B rewrite |

**Why not authorized under structural repair alone:**
1. This option requires accounting-subject-matter judgment (distractor quality, CMA Part 1 learning outcome alignment)
2. Per COLLABORATION_MATRIX.md, content authoring authority resides with Accountant + Psychometrician + Editor personas, not with structural repair
3. AGENTS.md §2 requires explicit write authorization for content changes
4. The three editorial fields cross quality dimensions: distractor quality (Psychometrician), explanation standards (Editor), topic alignment (Accountant)
5. Doing editorial authoring inside a structural repair conflates two separate governance workflows — structural (Validator) vs. content (Accountant/Editor/Psychometrician)
6. The structural repair should produce two valid objects first; editorial completion is a separate, independently-authorizable workstream

**Verdict:** Not authorized for this repair session. Recommend deferring to a separate CAQS §1.7.2 editorial pass after structural repair is complete and independently verified.

### 11.1 Recommendation

**Option B: STRUCTURAL SPLIT PLUS MECHANICAL FIELD REASSOCIATION.**

This is the minimum viable repair that:
- Restores two distinct valid objects (500 QIDs, 500 parsed objects)
- Preserves all source content wherever structurally attributable
- Does not invent editorial explanation text
- Defers the three editorial fields to a properly-scoped content-quality pass
- Makes BC-094 structurally renderable and pool-eligible
- Fixes BC-095's Topic contamination (DL-016)
- Does not require accounting-subject-matter judgment

---

## 12. REQUIRED FUTURE-WRITE SESSION CONTROLS

### 12.1 Session Prerequisites

| # | Requirement |
|---|-------------|
| 1 | Dedicated write-authorized session — no concurrent Pack C readers or writers |
| 2 | Human explicit write authorization per AGENTS.md §2 |
| 3 | Session must be the only active session touching `pack_c_corrected.js` |
| 4 | No other session writing to any pack file, scored-case file, app.js, or index_updated.html |

### 12.2 Pre-Write Controls

| # | Control |
|---|---------|
| 1 | Create timestamped immutable backup: `pack_c_corrected.js.bak-YYYYMMDDHHMMSS` |
| 2 | Verify backup SHA-256 matches current live file SHA-256 |
| 3 | Verify backup byte size matches current live file |
| 4 | Record backup path + SHA-256 in write-session log |

### 12.3 Exact Expected Byte Diff

**Insertion (at byte 643,262, between line 8999 and 9000):**

Bytes added: ~350 (the exact count depends on final insertion formatting — the fields specified in §8.2, plus the `}, {` separator and BC-095 header fields, with proper CRLF line endings matching the file convention).

**Modification (line 8997 — BC-094 ExplanationWrongB):**

Bytes changed: line 8997 reduced to `    "ExplanationWrongB": "",` (~30 bytes, down from ~478 bytes).

**Net byte change:** Approximately -100 bytes (insertion adds ~350, EW-B truncation removes ~448).

**Regions changed:** Only lines 8952–9046 (BC-094/095 merged object). No other region modified.

**Byte-level constraints:**
- No global formatting, serialization, or line-ending normalization
- No `JSON.stringify()` re-serialization of entire Pack C array
- CRLF line endings preserved (matching file convention)
- Indentation preserved (4-space, matching surrounding objects)

### 12.4 Post-Write Verification (17 Checks)

| # | Check | Command / Method | Expected Result |
|---|-------|-----------------|-----------------|
| 1 | QID reference count | `Select-String -Pattern '"QuestionID"'` | 500 |
| 2 | Parsed object count | String-aware brace-matcher (Function constructor) on Pack C | 500 |
| 3 | Certified count | `Select-String -Pattern '"question_state": "Certified"'` | 175 |
| 4 | SHA-256 recorded | `Get-FileHash -Algorithm SHA256` | New hash, recorded in write-session log |
| 5 | Byte size recorded | `(Get-Item ...).Length` | New size, recorded in write-session log |
| 6 | `node --check pack_c_corrected.js` | Node.js syntax check | No syntax errors |
| 7 | Object evaluation | `node -e "const fs=require('fs'); new Function(fs.readFileSync('pack_c_corrected.js','utf8'))"` | Evaluates without error |
| 8 | BC-094 object has single QuestionID | Parse + check object keys | "P1-BC-094" — exactly 1 QuestionID key |
| 9 | BC-095 object has single QuestionID | Parse + check object keys | "P1-BC-095" — exactly 1 QuestionID key |
| 10 | BC-094 CorrectChoice | Field-level check | "B" |
| 11 | BC-095 CorrectChoice | Field-level check | "C" |
| 12 | BC-094 EW-B | Field-level check | "" |
| 13 | BC-095 EW-C | Field-level check | "" |
| 14 | BC-094 Stem contains "Silverton" | Content check | YES |
| 15 | BC-095 Stem contains "Thornfield" | Content check | YES |
| 16 | MCQ pool count | Runtime pool construction | 2,499 (increased from 2,498) |
| 17 | No duplicate QuestionID keys | Scan all 500 objects | 0 duplicates |

### 12.5 Additional Post-Write Controls

| # | Control |
|---|---------|
| 1 | `node scripts/validate.js` — 0 new errors; 0 new DL-008 violations |
| 2 | `node scripts/test_governance_guard.js` — 12/12 PASS |
| 3 | BC-094 learner-renderable: render test in isolated browser session |
| 4 | BC-095 learner-renderable: render test in isolated browser session |
| 5 | Independent verifier separate from writer agent — verify checks 1–17 |
| 6 | BC-094 Topic-search: "B.094" returns exactly 1 result (BC-094) |
| 7 | BC-095 Topic-search: "B.095" returns exactly 1 result (BC-095) |

### 12.6 Rollback Conditions

| Trigger | Action |
|---------|--------|
| Any post-write check fails | Immediate rollback — do NOT attempt incremental fix |
| Object count ≠ 500 | Rollback |
| QID count ≠ 500 | Rollback |
| `node --check` fails | Rollback |
| Object evaluation throws | Rollback |
| Duplicate QuestionID found | Rollback |
| Adjacent object (BC-093 or BC-096) corruption detected | Rollback |

**Rollback command:**
```powershell
Copy-Item -LiteralPath "pack_c_corrected.js.bak-YYYYMMDDHHMMSS" -Destination "pack_c_corrected.js" -Force
```

**Post-rollback verification:**
1. `Get-FileHash -Algorithm SHA256` must match pre-repair hash
2. `Select-String -Pattern '"QuestionID"'` = 500

### 12.7 Prohibited Actions During Write Session

| Prohibited | Reason |
|-----------|--------|
| Reformatting any line outside lines 8952–9046 | Risk of introducing unrelated changes |
| `JSON.stringify()` on entire Pack C array | Will normalize formatting, reorder keys, change line endings |
| Line-ending conversion (CRLF → LF or LF → CRLF) | File convention is CRLF — must be preserved |
| Indentation changes | File convention is 4-space — must be preserved |
| Deleting any line outside the BC-094/095 region | Risk of adjacent-object corruption |
| Auto-save or formatter tools | Must be disabled during repair |
| Any change to CorrectChoice | Answer-key integrity — must not change |

---

## 13. LEDGER STATUS (No Change)

| Item | Status |
|------|--------|
| P1-BC-094 | `TIER 1 QUARANTINED — SOURCE OBJECT BOUNDARY INVALID` |
| P1-BC-095 | `REMAINING — STRUCTURAL REASSOCIATION REQUIRED BEFORE AUDIT` |
| Pack C denominator | 174 distinct Certified QIDs |
| Pack C current state | 64 countable, 1 quarantined, 109 remaining |
| Pack C remaining audit | Blocked until authorized repair decision |

---

*Generated 2026-07-24 — Session 10, read-only structural repair specification*
