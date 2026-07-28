# Session 8 — Pack C BC-094 / BC-095 Object-Boundary Defect Analysis

**Date:** 2026-07-24
**Session Status:** `PARTIAL — VERIFIED WORK ONLY: BC-094/BC-095 STRUCTURAL DEFECT MAPPED; PACK C REMAINING AUDIT STAYS BLOCKED PENDING REPAIR DECISION.`
**Session Type:** Read-only structural investigation
**Concurrent Safeguard:** Session 7 (runtime), case-audit session — no overlap

---

## 1. Pre-Flight Source-Stability Gate

| Property | Value |
|----------|-------|
| File | `pack_c_corrected.js` |
| SHA-256 | `C934FD694CF718AF0D85F838AB350199385610A60D0DC9662DC9C47A8516ECE8` |
| Byte size | 1,767,306 |
| Last modified | 2026-07-24 11:22:19 |
| Line-ending style | CRLF (27,721 pairs), LF-only: 52 |
| Hash verified unchanged during session | YES — re-confirmed at session close |
| Concurrent writes detected | NONE — zero file changes during this session |
| **Gate status** | **PASS — source stable; analysis proceeds on locked file state** |

---

## 2. Exact Source Map

### 2.1 Region Boundaries

| Boundary | Line | Byte Offset |
|----------|------|------------|
| BC-093 object closes | 8951 | 638,684 |
| BC-094/095 merged object opens | 8952 | 638,690 |
| BC-094 QuestionID line | 8985 | 640,596 |
| BC-094 last metadata line (EW_C) | 8999 | 642,330 |
| BC-095 content block starts (MicroTopic) | 9000 | 642,351 |
| BC-095 QuestionID line | 9028 | 644,632 |
| BC-094/095 merged object closes | 9046 | 647,347 |
| BC-096 object opens | 9047 | 647,353 |

### 2.2 Object Structure — Field-By-Field Trace

The object at lines 8952–9046 (byte 638,690–647,347) is a SINGLE JavaScript object literal containing fields from TWO distinct QIDs. Fields are listed below in source order with their QID of origin.

#### BC-094 Content Block (lines 8952–8983)

| Line | Field | Value/Notes |
|------|-------|-------------|
| 8952 | `{` | Object opens |
| 8953 | `Part` | 1 |
| 8954 | `Section` | "B" |
| 8955 | `SectionName` | "Planning, Budgeting, and Forecasting" |
| 8956 | `Topic` | "B.094 what if sensitivity analysis budgeting" |
| 8957 | `MicroTopic` | "what if sensitivity analysis budgeting" |
| 8958 | `UniqueConceptKey` | "B-C094-what-if-sensitivity-analysis-budgeting" |
| 8959 | `LOSTag` | "B Planning and budgeting" |
| 8960 | `Difficulty` | "Difficult" |
| 8961 | `ItemType` | "MCQ" |
| 8962 | `ItemStyle` | "single-select" |
| 8963 | `Stem` | "Silverton models several scenarios in its budget..." |
| 8964-8968 | `Choices` | A=Standard costing, B=Sensitivity analysis, C=Zero-based, D=Responsibility |
| 8970 | `CorrectChoice` | "B" |
| 8971 | `ExplanationCorrect` | "Sensitivity or what-if analysis models how budgeted outcomes change..." |
| 8972-8981 | `StudyLinks` | 2 entries (IMA LOS, OpenStax) |
| 8982 | `SourceDescription` | Standard boilerplate |
| 8983 | `Part1OnlyFlag` | true |

#### BC-094 Metadata Block (lines 8984–8999)

| Line | Field | Value/Notes |
|------|-------|-------------|
| 8984 | `ReviewNote` | Standard boilerplate |
| 8985 | `QuestionID` | **"P1-BC-094"** ← FIRST QuestionID |
| 8986 | `CalculationItem` | false |
| 8987-8992 | `VerifiedChecks` | 5-element array |
| 8994 | `ChoiceA` | "Standard costing, which sets a single fixed benchmark" |
| 8995 | `ExplanationWrongA` | **MISATTRIBUTED** — text about budget slack detection, NOT sensitivity analysis |
| 8996 | `ChoiceB` | "Sensitivity (what-if) analysis, which shows how outcomes change..." |
| 8997 | `ExplanationWrongB` | **MISATTRIBUTED** — text about budget slack/sensitivity analysis distinction |
| 8998 | `ChoiceC` | "Zero-based budgeting, which resets every account" |
| 8999 | `ExplanationWrongC` | CORRECT — ZBB vs. sensitivity analysis distinction (long text) |
| — | `ChoiceD` | **STRUCTURALLY ABSENT** |
| — | `ExplanationWrongD` | **STRUCTURALLY ABSENT** |
| — | `question_state` | **NOT YET REACHED** — BC-095 content begins before BC-094 completes |

#### BC-095 Content Block (lines 9000–9027)

| Line | Field | Value/Notes |
|------|-------|-------------|
| 9000 | `MicroTopic` | "budget slack detection" |
| 9001 | `UniqueConceptKey` | "B-C095-budget-slack-detection" |
| 9002 | `LOSTag` | "B Planning and budgeting" |
| 9003 | `Difficulty` | "Moderate" |
| 9004 | `ItemType` | "MCQ" |
| 9005 | `ItemStyle` | "single-select" |
| 9006 | `Stem` | "Thornfield's controller notices a department consistently beats its budget..." |
| 9007-9011 | `Choices` | A=lower sales price, B=external auditors, C=budgetary slack, D=discontinue budgeting |
| 9013 | `CorrectChoice` | "C" |
| 9014 | `ExplanationCorrect` | "Consistently exceeding budget targets by a wide margin may indicate budgetary slack..." |
| 9015-9024 | `StudyLinks` | 2 entries |
| 9025 | `SourceDescription` | Standard boilerplate |
| 9026 | `Part1OnlyFlag` | true |

#### BC-095 Metadata Block (lines 9027–9045)

| Line | Field | Value/Notes |
|------|-------|-------------|
| 9027 | `ReviewNote` | Standard boilerplate |
| 9028 | `QuestionID` | **"P1-BC-095"** ← SECOND QuestionID (duplicate key) |
| 9029 | `CalculationItem` | false |
| 9030-9035 | `VerifiedChecks` | 5-element array |
| 9037 | `ChoiceA` | "Whether the company should receive a lower sales price" |
| 9038 | `ExplanationWrongA` | Budget slack / pricing distinction (correct topic) |
| 9039 | `ChoiceB` | "Whether external auditors approved the budget" |
| 9040 | `ExplanationWrongB` | **DL-010 MISATTRIBUTION** — references "discontinue budgeting" (ChoiceD) not "external auditors" (ChoiceB) |
| 9041 | `ChoiceC` | "Whether the department has built budgetary slack..." |
| 9042 | `ExplanationWrongC` | `""` — empty (CorrectChoice = C, DL-008 compliant) |
| 9043 | `ChoiceD` | "Whether the company should discontinue budgeting entirely" |
| 9044 | `ExplanationWrongD` | Budget slack / discontinue budgeting distinction (correct topic) |
| 9045 | `question_state` | "Certified" ← single occurrence for entire merged object |
| 9046 | `},` | Object closes |

### 2.3 Boundary Integrity

- BC-093 → merged: Normal `},` at line 8951, correct array separator
- Merged → BC-096: Normal `},` at line 9046, correct array separator
- The array-level syntax is VALID — the defect is entirely internal to the merged object
- No adjacent objects are affected

---

## 3. JavaScript Semantic Behavior

### 3.1 Duplicate Key Resolution (Last-Write-Wins)

In JavaScript object literals, when a key appears more than once, the LAST occurrence's value survives. The merged object has **34 duplicate key pairs** across the BC-094 and BC-095 sub-blocks. After evaluation, the runtime object contains:

#### Fields from BC-094 ONLY (no duplicate — survive intact)

| Field | Value |
|-------|-------|
| `Part` | 1 |
| `Section` | "B" |
| `SectionName` | "Planning, Budgeting, and Forecasting" |
| `Topic` | "B.094 what if sensitivity analysis budgeting" |

These survive because BC-095's content block lacks them.

#### Fields where BC-095 overwrites BC-094 (learner-facing content)

| Field | BC-094 Value | BC-095 Value | Runtime Result |
|-------|-------------|-------------|----------------|
| **QuestionID** | "P1-BC-094" | **"P1-BC-095"** | "P1-BC-095" |
| **Stem** | Silverton / sensitivity analysis | **Thornfield / budget slack** | Thornfield / budget slack |
| **Choices** | Sensitivity analysis choices | **Budget slack choices** | Budget slack choices |
| **CorrectChoice** | "B" | **"C"** | "C" |
| **ExplanationCorrect** | Sensitivity analysis text | **Budget slack text** | Budget slack text |
| `MicroTopic` | "what if sensitivity analysis" | **"budget slack detection"** | "budget slack detection" |
| `UniqueConceptKey` | "B-C094-..." | **"B-C095-..."** | "B-C095-budget-slack-detection" |
| `Difficulty` | "Difficult" | **"Moderate"** | "Moderate" |
| `ChoiceA` | "Standard costing..." | **"Whether company should receive lower sales price"** | BC-095 ChoiceA |
| `ChoiceB` | "Sensitivity analysis..." | **"Whether external auditors approved"** | BC-095 ChoiceB |
| `ChoiceC` | "Zero-based budgeting..." | **"Whether department has built slack"** | BC-095 ChoiceC |
| `ChoiceD` | (absent) | **"Whether to discontinue budgeting"** | BC-095 ChoiceD |
| `ExplanationWrongA` | Budget slack text (misattributed) | **Budget slack text** | BC-095 EW-A |
| `ExplanationWrongB` | Budget slack text (misattributed) | **DL-010 misattributed text** | BC-095 EW-B |
| `ExplanationWrongC` | ZBB vs sensitivity (correct) | **"" (CC slot, DL-008 compliant)** | "" |
| `ExplanationWrongD` | (absent) | **Budget slack text** | BC-095 EW-D |

#### Fields with identical values (no net change)

`ItemType`, `ItemStyle`, `LOSTag`, `CalculationItem`, `VerifiedChecks`, `StudyLinks`, `SourceDescription`, `Part1OnlyFlag`, `ReviewNote` — same values in both blocks.

### 3.2 Runtime Behavior Summary

| Aspect | Result |
|--------|--------|
| `MCQ_BANK_C` object count | **499** (not 500) |
| Object indexed under | **"P1-BC-095"** |
| BC-094 identity | **LOST** — QuestionID overwritten, stem/content overwritten |
| BC-094 in learner pool | **ABSENT** — cannot be selected, rendered, or reviewed |
| BC-095 in learner pool | **PRESENT but contaminated** — Topic label says "B.094 what if sensitivity analysis" while content is budget slack |
| `question_state` visibility | "Certified" (single occurrence at line 9045) |
| Deduplication impact | None — both QIDs are distinct strings; the pool never sees "P1-BC-094" |

### 3.3 Learner-Facing Defects (BC-095 Runtime State)

1. **Topic contamination (DL-016):** `Topic` = "B.094 what if sensitivity analysis budgeting" but the rendered stem asks about budget slack detection. Topic-search and filtering will misclassify this item.
2. **ExplanationWrongB DL-010 misattribution:** ChoiceB = "Whether external auditors approved the budget" but ExplanationWrongB describes "discontinue budgeting" (ChoiceD's concept). A learner selecting ChoiceB sees text explaining a different choice.
3. **BC-094 content loss:** The sensitivity analysis question (Silverton, what-if analysis) cannot be delivered to any learner.

---

## 4. Population and Ledger Impact

### 4.1 Pack C Count Reconciliation

| Measure | Count | Method |
|---------|-------|--------|
| `"QuestionID"` grep matches | 500 | `Select-String` |
| Parsed JavaScript objects (string-aware) | 499 | Node.js scope scan |
| Discrepancy | **-1** | Fully explained by BC-094/095 merger |
| `"question_state": "Certified"` grep | 174 | Direct grep |
| Certified lines in merged object | 1 | At line 9045 only |
| Certified objects in parsed array | 174 | Includes the merged object (counted as BC-095) |

### 4.2 Equation Verification

```
174 Certified Pack C =
    64 COUNTABLE (AC-001–053, BC-089–093, BC-095–100)
  +  1 QUARANTINED (BC-094 — object-merger defect)
  + 109 REMAINING (AC-054–075, BC-001–088)
  = 174 ✓
```

The merged BC-094/BC-095 object is counted once (as BC-095) in the 64 COUNTABLE items. BC-094 is the single QUARANTINED record. No double-counting.

### 4.3 Evidence Status for Each QID

| QID | Classification | Rationale |
|-----|---------------|-----------|
| **P1-BC-094** | `QUARANTINED — SOURCE OBJECT BOUNDARY INVALID` | QuestionID overwritten by duplicate key. Content block (Stem/Choices/CC/EC) is structurally present but inaccessible at runtime. Metadata incomplete (missing ChoiceD, ExplanationWrongD; misattributed EW-A/B). Object-boundary repair required before independent verification. |
| **P1-BC-095** | `COUNTABLE — STRUCTURE CONFIRMED` (with contamination caveat) | Own content block and metadata are structurally intact within the merged object and survive duplicate-key resolution. Learner-facing content (Stem, Choices, CC=C, EC) is internally consistent. BUT: Topic label is contaminated (BC-094's value), ChoiceB/EW-B have DL-010 misattribution, and the object's Pair/Part/Section/SectionName are from BC-094. |

### 4.4 SESSION_STATUS Discrepancy

| Source | Pack C Certified Claim |
|--------|----------------------|
| `SESSION_STATUS_2026-07-23.md` line 13 | **175** |
| Direct grep (this session) | **174** |
| Session 5 report | **174** |
| **Assessment** | SESSION_STATUS overcounts by 1. The pooled total of 1,080 should be 1,079. |

---

## 5. Scope Scan — Additional Pack C Structural Anomalies

### 5.1 Methodology

String-aware brace-matcher (tracking `inString`/`escape`/`stringChar` flags) extracted all 499 objects from `MCQ_BANK_C`. Each object was scanned for:
- Multiple `QuestionID` keys
- All duplicate property keys
- Missing Stem/Choices/CorrectChoice/ExplanationCorrect/QuestionID

### 5.2 Results

| Anomaly Type | Count | Details |
|-------------|-------|---------|
| Objects with >1 QuestionID key | **1** | Object #168 — BC-094 + BC-095 |
| Objects with missing QuestionID | **0** | All 499 objects have a QuestionID |
| Objects with missing Stem | **0** | |
| Objects with missing Choices | **0** | |
| Objects with missing CorrectChoice | **0** | |
| Objects with missing ExplanationCorrect | **0** | |
| Other duplicate keys (non-identity) | **498** | All have `label(2x), url(2x)` from StudyLinks array — this is NORMAL JavaScript for arrays of objects with repeated property names. Not a defect. |
| Objects with massive duplicate-key set | **1** | Object #168 — 35 duplicate keys from BC-094/BC-095 merger, plus `label(4x), url(4x)` |

### 5.3 Conclusion

**BC-094/BC-095 is the ONLY merged-object defect in Pack C.** No other QID merger, duplicate-key-overwrite, or content-block/QID mismatch was found. The 498 objects with `label(2x)/url(2x)` are benign — these are array-element property names within the `StudyLinks` array, which naturally repeat across the two study-link entries per QID.

### 5.4 Discrepancy Confirmation

```
QuestionID reference count (grep): 500
JavaScript object count (parsed): 499
Gap: 1 — fully explained by BC-094/095 merger
```

No hidden or partial mergers. No content-block-without-QID or QID-without-content-block.

---

## 6. P1E-E-048 Classification Check

| Property | Value |
|----------|-------|
| QID | P1E-E-048 |
| Pack | E (NOT Pack C) |
| File | `pack_e_corrected.js` |
| Classification | **COUNTABLE_COMPLETE_PRIMARY_EVIDENCE** with **TIER 0 CANDIDATE — FRAMEWORK/VERSION AMBIGUITY OR KEY RISK** |
| Issue | COSO ERM component count: stored CC=B (8 components, COSO ERM 2004). Independent derivation yields D (5 components, COSO ERM 2017). Framework-version ambiguity. |
| Position in ledger equation | Within Pack E's 101 COUNTABLE items. NOT separately tracked as quarantined/provisional in the 873 equation. |
| Ledger equation impact | 873 = COUNTABLE(423) + PROVISIONAL(1, AD-075) + QUARANTINED(1, BC-094) + REMAINING(448). P1E-E-048 is absorbed within the 423 COUNTABLE. No overlap, no double-counting. |
| **Verdict** | **No global ledger classification conflict.** P1E-E-048's TIER 0 status is a content-quality flag within the COUNTABLE category, not a separate quarantined entry. The 873 equation correctly accounts for it within the Pack E subtotal. |

---

## 7. Summary of Findings

### 7.1 The Defect

A single JavaScript object at lines 8952–9046 of `pack_c_corrected.js` contains two complete QIDs (P1-BC-094 and P1-BC-095) merged without an object-boundary separator. The merge point is at line 8999/9000: BC-094's ExplanationWrongC is immediately followed by BC-095's MicroTopic field, replacing BC-094's ChoiceD, ExplanationWrongD, and question_state.

### 7.2 Root Cause

The paired-object architecture (metadata block + content block per QID) suffered a write failure: BC-094's metadata block ChoiceD and ExplanationWrongD were deleted/lost, and BC-095's entire content + metadata was concatenated into the gap. The `},` separator that should have closed BC-094's object and opened BC-095's was never written.

### 7.3 Runtime Impact

- **BC-094 is absent from the MCQ delivery pool.** The sensitivity analysis question (Silverton, what-if analysis) cannot be delivered to any learner.
- **BC-095 is in the delivery pool** with internally consistent content (budget slack) but carries BC-094's Topic label ("B.094 what if sensitivity analysis") — a DL-016 metadata-content mismatch.
- **BC-095 has a DL-010 misattribution:** ExplanationWrongB references ChoiceD's concept, not ChoiceB's.
- **Object count is 499 instead of 500** — pool construction, selection, and deduplication all see one fewer item.
- **Certified count is 174** (not 175 as SESSION_STATUS claims) — the merged object has a single `question_state: "Certified"` line.

### 7.4 Scope Certainty

String-aware parsing of all 499 Pack C objects confirms: **BC-094/BC-095 is the only merged-object defect.** No other QID carries duplicate identity keys, and no other object has content-block/QID mismatch. All 498 remaining objects have the benign `label(2x)/url(2x)` pattern from StudyLinks.

---

*Generated 2026-07-24 — Session 8, read-only structural investigation*
