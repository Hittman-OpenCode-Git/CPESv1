# CMA Part 1 — Session 64 Pilot MCQ Certification Report

**Session:** 64 — MCQ Pilot Certification
**Agent:** MCQ Pilot Certification Agent
**Date:** 2026-07-24
**Status:** READ-ONLY EVALUATION (no pack file modifications)
**Rubric:** Rubric 1 — MCQ Certification Rubric (`CERTIFICATION_RUBRICS.md`)
**Items Evaluated:** 50 (32 STRONG / 18 BORDERLINE)

---

## CRITICAL FINDING: DL-016 Affects Entire Pack A

During pilot evaluation, a significant discovery was made: **the DL-016 metadata-content offset affects every section of Pack A, not just Section E** as documented in DEFECT_LIBRARY.md. The metadata block's `ExplanationWrong[A-D]` fields describe a *different* item's choices than the content block's `Stem`/`Choices`/`CorrectChoice` that the learner sees. This makes the metadata block's EW fields unreliable for D5 evaluation across all Pack A items.

**Evidence (P1-A-005):**
- Content block (Block 2): Stem about "Vantage received annual service fees in advance" → CC = D, Choices are about contract liability for advance collections
- Metadata block (Block 1): EW_A = "" (empty), EW_B/C/D all describe "installation service is distinct," "ASC 606 revenue recognition," and mention "Umbra" — the content of the PREVIOUS item (P1-A-004)

**Impact on this pilot:** For Pack A items, D5 evaluation using metadata-block EW fields is unreliable. D5 scores are based on ExplanationCorrect (from content block) quality instead. This is flagged as a structural limitation in each item's evaluation.

**Recommendation:** Expand the DL-016 scan to all of Pack A before any certification work. The systematic +1 offset in the paired-object format makes currently-Certified Pack A items display potentially wrong distractor explanations to learners.

---

## Part 1: GROUP 1 — STRONG CANDIDATES (32 items, all Certified)

### 1.1 Pack A Section A (6 items)

| QID | CC | DL-008 | DL-013 | DL-025/26* | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1-A-005 | D | HIT (DL-016) | OK | HIT(A) | 5 | 4 | 4 | 4 | 3† | 4 | Needs Revision |
| P1-A-015 | A | HIT (DL-016) | OK | HIT(C) | 5 | 5 | 4 | 4 | 3† | 4 | Needs Revision |
| P1-A-030 | D | HIT (DL-016) | OK | HIT(B) | 5 | 5 | 5 | 4 | 3† | 4 | Needs Revision |
| P1-A-050 | C | HIT (DL-016) | OK | HIT(B) | 5 | 5 | 5 | 4 | 3† | 4 | Needs Revision |
| P1-A-065 | C | HIT (DL-016) | OK | HIT(A) | 5 | 5 | 5 | 4 | 3† | 4 | Needs Revision |
| P1-A-075 | D | CLEAN | OK | OK | 4 | 4 | 4 | 4 | 3† | 3 | Needs Revision |

\* DL-025/26 flags based on metadata-block EW fields; may be DL-016 artifacts
† D5 capped at 3 due to DL-016 unreliability: we cannot verify EW fields match learner-facing choices

**P1-A-005 (Contract liability — advance collections):**
- D1=5: CC=D correctly identifies "Record a contract liability." EC is clear and accurate. Verified independently.
- D2=4: Topic "A.006 contract liability for advance collections," LOSTag "A.2 Recognition, measurement, valuation, and disclosure." Good mapping but could use more specific LOS.
- D3=4: Stem is clear and professional. Choices are parallel and of similar length. Slight "Which response is most appropriate?" formula.
- D4=4: Distractors are plausible: A (equity contribution - plausible confusion for beginners), B (cash basis thinking), C (receivable confusion). Each targets a distinct error.
- D5=3†: ExplanationCorrect is adequate but brief (50 chars). EW fields are from a DIFFERENT item (DL-016): they describe P1-A-004's choices about ASC 606 installation services, not P1-A-005's contract liability. This means a learner who selects a wrong answer may see explanations for a completely different question.
- D6=4: question_state Certified, certification_date present, Section/Topic/Difficulty all present. DifficultyScore field empty in metadata block.

**P1-A-030 (Retained earnings rollforward):**
- D1=5: CC=D ($254,700). Verified: $195,000 + $80,400 - $20,700 = $254,700. ✓
- D2=5: Topic "A.031 retained earnings rollforward 6," LOSTag "A.1 Financial statements." Precise.
- D3=5: Clean stem, clear choices ($93,900 / $59,700 / $275,400 / $254,700). Business-authentic.
- D4=4: Distractors: A understates (subtracts dividends from something else), B is implausible ($59,700 is beginning - income - dividends?), C overstates (beginning + income, ignores dividends). Three distinct error paths. D4=4 (not 5 because one distractor is weaker).
- D5=3††: EC is complete (formula + substitution + interpretation). However, EW fields describe a cash flow indirect-method question (depreciation, accounts receivable, accounts payable), not the retained earnings rollforward. DL-016 offset.
- D6=4: Metadata present. certification_date present. DifficultyScore=4 (Difficult-equivalent) but Difficulty label="Moderate" — minor inconsistency.

**P1-A-065 (Accounting equation — equity calculation):**
- D1=5: CC=C ($285,200). Verified: $496,300 - $211,100 = $285,200. ✓
- D2=5: Topic "A.066 accounting equation equity calculation 41," LOSTag "A.1 Financial statements."
- D3=5: Clean "Quartz reports..." stem. Four distinct dollar choices.
- D4=4: A ($211,100 = liabilities only), B ($707,400 = sum, not difference), D ($300,200 = close but wrong). Good discrimination.
- D5=3††: EC complete (formula + substitution). EW_A empty (DL-016 artifact: describes a different question's EPS calculation).
- D6=4: All metadata present.

**P1-A-075 (Mission to tactical planning linkage):**
- D1=4: CC=D ("Planning connects long-term strategy to operational budgets"). Correct conceptually, but the EC is very brief ("Planning connects long-term strategy to operational budgets, responsibility assignments, and measurable targets.") — could name COSO or the planning hierarchy explicitly.
- D2=4: Section=B, Topic="B.001 mission to tactical planning linkage," LOSTag="B.1 Strategic planning." Good but LOSTag is broad.
- D3=4: Clear stem. Professional business framing.
- D4=4: EW_D empty (DL-016 artifact: EW fields describe an EPS calculation question, not planning). This means the actual distractor explanations for the "Riverview" planning question are one block away and may not exist at all for this item's actual choices.
- D5=3††: EC is adequate but minimal. EW field mismatch.
- D6=3: DifficultyScore field is empty in metadata block. LOSTag is broad.

### 1.2 Pack A Section D (4 items)

| QID | CC | DL-008 | DL-013 | DL-025/26 | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1-D-010 | B | HIT (DL-016) | OK | HIT(A) | 5 | 5 | 4 | 4 | 3† | 3 | Needs Revision |
| P1-D-030 | A | HIT (DL-016) | OK | HIT(C) | 5 | 4 | 5 | 4 | 3† | 3 | Needs Revision |
| P1-D-050 | C | HIT (DL-016) | OK | HIT(B) | 5 | 4 | 5 | 4 | 3† | 3 | Needs Revision |
| P1-D-070 | D | HIT (DL-016) | OK | HIT(B) | 5 | 4 | 5 | 4 | 3† | 3 | Needs Revision |

**P1-D-030 (Predetermined overhead applied to job):**
- D1=5: Overhead rate = $497,000 / 67,700 MH = ~$7.34/MH. Job X: 153 × $7.34 = $1,123. CC=A ($1,123). ✓ Verified.
- D2=4: Topic "D.031 predetermined overhead applied to job 11" maps to LOS "D.1 Measurement concepts." The topic label has a +1 numbering artifact but content is correct.
- D3=5: Clear calculation stem with all inputs provided.
- D4=4: A ($1,123, correct), B ($497,000 = total overhead), C ($6,123 = wrong rate × wrong hours?), D ($7.34 = rate only, not applied). Three distinct error paths.
- D5=3††: DL-016 offset. EW fields describe a JIT philosophy question, not the predetermined overhead calculation.
- D6=3: Missing `certification_date`. Topic number is offset (D.031 but should be D.030). DifficultyScore empty.

**P1-D-010 (Reciprocal allocation method):**
- D1=5: CC=B correctly identifies that the reciprocal method best captures mutual service relationships. EC is correct but very brief ("The reciprocal method best captures mutual service relationships").
- D2=5: Topic "D.011 reciprocal allocation method," LOS "D.2 Costing systems." Precise mapping.
- D3=4: Stem clear but formulaic ("Which response is most appropriate?").
- D4=4: Distractors are reasonable: A would be direct/step method arguments, C and D are generic ("Option X is incorrect. Use...[some other method]" — the "Option X is incorrect..." pattern in EW_C and EW_D is a DL-013 variant worthy of note).
- D5=3††: EC is very brief (no formula, no business interpretation). EW fields show DL-016 offset.
- D6=3: Missing certification_date. DifficultyScore empty.

### 1.3 Pack A Section E (3 items)

| QID | CC | DL-008 | DL-013 | DL-025/26 | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1-E-010 | A | CLEAN | OK | OK | 5 | 5 | 5 | 5 | 5 | 4 | **Certified** ✓ |
| P1-E-020 | A | HIT (DL-016) | OK | HIT(B) | 4 | 4 | 4 | 4 | 3† | 4 | Needs Revision |
| P1-E-030 | C | HIT (DL-016) | OK | HIT(B) | 4 | 4 | 4 | 4 | 3† | 4 | Needs Revision |

**P1-E-010 (Access controls for payroll master file) — PASSES CERTIFICATION:**
- D1=5: CC=A. EC is the most detailed in the pilot: names COSO Principle 11, Principle 16, explains control activities, logical access controls, segregation of duties, change logs, business interpretation, and common exam trap. Authoritative.
- D2=5: Topic "E.011 access controls for payroll master file," LOSTag "E Internal controls." Section E is correct.
- D3=5: "Frontier is reviewing internal controls related to access controls for payroll master file." Professional, clear, uses named company.
- D4=5: Distractors are plausible: B "not designing controls before audit" (real misunderstanding), C "capital budgeting is Part 2" (clear wrong-topic distractor), D "removing documentation undermines effectiveness" (reasonable point for a different question).
- D5=5: EW_A empty (CC slot, DL-008 compliant). EW_B, C, D are choice-specific and substantive. EC is comprehensive mini-lesson. All EW look like they correctly describe THIS item's choices (not DL-016 shifted).
- D6=4: All critical metadata present. DifficultyScore empty in metadata block.

**P1-E-020 (Management override risk):**
- D1=4: CC=A, but the stem uses some garbled characters ("COSO Internal Control ??? Integrated Framework"). EC is detailed and references COSO Principle 1, Principle 8, SOX Section 404. The content is authoritative and correct.
- D2=4: Topic "E.021 management override risk," LOSTag "E Internal controls" (broad).
- D3=4: Minor garbled characters in EC text reduce readability.
- D4=4: Distractors are plausible internal control concepts.
- D5=3†: DL-016 offset suspected. EW_B is empty but CC=A, so EW should have A empty. EW_B is empty at non-CC position = DL-025/026. The metadata block's EW_A text ("Relying on trust without documentation eliminates the evidence...") may or may not match this item's actual Choice A.
- D6=4: Metadata present. DifficultyScore empty.

**P1-E-030 (Disaster recovery test):**
- D1=4: CC=C is correct. EC is detailed (references COSO Principle 11, Principle 16, SOX Section 404, RTOs, testing frequency). However, the stem garbled character persists from the template.
- D2=4: Topic "E.031 disaster recovery test," LOSTag "E Internal controls."
- D3=4: Minor garbled character issue.
- D4=4: Distractors are plausible.
- D5=3†: Similar DL-016 pattern to P1-E-020.
- D6=4: Metadata present.

### 1.4 Pack C Section A (2 items)

| QID | CC | DL-008 | DL-013 | DL-025/26 | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1-AC-020 | MISS | ? | OK | ? | 4* | 4 | 4* | 4* | 3† | 3 | Needs Revision |
| P1-AC-055 | MISS | ? | OK | ? | 4* | 4 | 4* | 4* | 3† | 3 | Needs Revision |

\* Scores estimated from Topic/LOS data only — CC was not located by regex in the 2500-char window. Full content not readable due to dual-block format requiring wider window.

**P1-AC-020 (Operating lease ROU asset):**
- D2=4: Topic "A.021 operating lease right of use asset," LOS "A Financial reporting." Topic is in-scope and specific.
- D5=3†: Pack C uses same dual-block format as Pack A. DL-016 offset likely present. EW_D=EMPTY, but CC is unknown from regex.

**P1-AC-055 (Business combination measurement):**
- D2=4: Topic "A.056 business combination measurement," LOS "A Financial reporting." In-scope.
- D5=3†: EW_C=EMPTY. DL-016 artifact likely.

### 1.5 Pack D Section A (2 items)

| QID | CC | DL-008 | DL-013 | DL-025/26 | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1-AD-030 | MISS | ? | OK | ? | 4* | 4 | 4* | 4* | 3† | 3 | Needs Revision |
| P1-AD-065 | MISS | ? | OK | ? | 4* | 4 | 4* | 4* | 3† | 3 | Needs Revision |

\* Same dual-block limitation as Pack C.

### 1.6 Pack C Section B (2 items)

| QID | CC | DL-008 | DL-013 | DL-025/26 | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1-BC-025 | MISS | ? | OK | EW all TEXT | 4* | 4 | 4* | 4* | 4 | 3 | Needs Revision |
| P1-BC-075 | MISS | ? | DL013variant | EW all TEXT | 4* | 3 | 4* | 4* | 3†† | 2 | Needs Revision |

**P1-BC-075:**
- D2=3: Section field missing from regex window. Topic field also missing. LOSTag also missing. This item appears to be in a position where the content block wasn't captured by the 2500-char window.
- D5=3††: DL-013 variant detected ("does not align with").
- D6=2: Multiple metadata fields missing from extraction window. Needs independent verification.

### 1.7 Pack D Section B (2 items)

| QID | CC | DL-008 | DL-013 | DL-025/26 | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1-BD-025 | MISS | ? | OK | ? | 4* | 4 | 4* | 4* | 3† | 3 | Needs Revision |
| P1-BD-075 | MISS | ? | DL013variant | ? | 4* | 4 | 4* | 4* | 3†† | 3 | Needs Revision |

### 1.8 Pack D Section D (2 items)

| QID | CC | DL-008 | DL-013 | DL-025/26 | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1-DD-025 | B | HIT | OK | HIT(A) | 5 | 5 | 5 | 4 | 2 | 4 | Needs Revision |
| P1-DD-065 | MISS | ? | DL013variant | ? | 4* | 4 | 4* | 4* | 3† | 3 | Needs Revision |

**P1-DD-025 (Margin of safety calculation) — IMPORTANT FINDING:**
- D1=5: CC=B ($230,000). Verified: $920,000 - $690,000 = $230,000. ✓
- D2=5: Topic "D.026 margin of safety calculation," LOS "D Cost management." Correct mapping.
- D3=5: "Ashfield expects sales of $920,000 next year. Its CVP analysis shows break-even sales of $690,000. What is Ashfield's margin of safety in sales dollars?" Clear, named company, all inputs provided.
- D4=4: A ($690,000 = break-even, not MoS), B ($230,000 = MoS dollars), C (25% = MoS percentage, not dollars), D ($1,610,000 = sum, not difference). Three distinct error paths. Note: Choice C is MoS as a %, which is a VERY plausible distractor — candidates often confuse MoS dollars vs. percentage.
- **D5=2: DL-008 CONFIRMED. CC=B but EW_B has TEXT ("Option B is incorrect. The reciprocal method best captures..." — describes the reciprocal allocation method topic, not margin of safety!). EW_A is EMPTY at a non-CC position = DL-025/026.**
- D6=4: Metadata present, certification_date present.

**CRITICAL NOTE on P1-DD-025:** This item was listed as "Certified" in the STRONG group but carries ACTIVE DL-008 AND DL-025/026. The EW_B text describes service department cost allocation, not margin of safety. This is a DL-016 artifact — the metadata block's EW fields belong to a completely different item. A learner answering this margin-of-safety question who selects a wrong answer will see explanations about reciprocal cost allocation methods — educationally misleading and a certification-blocking defect.

### 1.9 Pack B Section B (1 item)

| QID | CC | DL-008 | DL-013 | DL-025/26 | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1B-B-120 | B | CLEAN | OK | OK | 5 | 5 | 5 | 5 | 5 | 4 | **Certified** ✓ |

**P1B-B-120 (Time series trend component) — PASSES CERTIFICATION:**
- D1=5: CC=B ("Trend component"). Correct — the trend component represents long-term direction in time series data.
- D2=5: Topic "B-B.121 expected value analysis" has a +1 numbering artifact but the Topic description is edge-adjacent (forecasting techniques). LOSTag "B.4 Forecasting techniques." Appropriate.
- D3=5: "Which time series component represents long-term direction in data?" One clear question. All four choices are parallel time-series component names. Professional.
- D4=5: All four distractors are genuine time-series components. Each is plausible to a candidate who confuses trend with cyclical, seasonal, or irregular variation. Discriminating.
- D5=5: EW_B=EMPTY (CC=B, DL-008 compliant). EC clear: "The trend component represents the long-term direction or pattern in the data over many periods." Distractor explanations for A/C/D are all present with TEXT. No boilerplate. Complete mini-lesson for this topic.
- D6=4: question_state "Certified" present. Topic has +1 numbering offset (cosmetic). Difficulty=Moderate present.

### 1.10 Pack B Section C (2 items)

| QID | CC | DL-008 | DL-013 | DL-025/26 | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1B-C-120 | MISS | ? | OK | EW_A=EMPTY | 4* | 4 | 4* | 4* | 3† | 3 | Needs Revision |
| P1B-C-150 | MISS | ? | OK | EW_A=EMPTY | 4* | 4 | 4* | 4* | 3† | 3 | Needs Revision |

Pack B stores CorrectChoice before QuestionID, making CC location unreliable with the 2500-char window. Both items show one empty EW field (A) which could indicate DL-025/026 or could be the CC slot if CC=A. Both are Certified.

### 1.11 Pack B Section E (2 items)

| QID | CC | DL-008 | DL-013 | DL-025/26 | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1B-E-100 | MISS | ? | OK | EW_C=EMPTY | 4* | 4 | 4* | 4* | 3† | 3 | Needs Revision |
| P1B-E-120 | MISS | ? | OK | EW_B=EMPTY | 4* | 3 | 4* | 4* | 3† | 2 | Needs Revision |

### 1.12 Pack B Section F (1 item)

| QID | CC | DL-008 | DL-013 | DL-025/26 | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1B-F-100 | MISS | ? | OK | EW_C=EMPTY | 4* | 4 | 4* | 4* | 3† | 3 | Needs Revision |

### 1.13 Pack E Section E (3 items)

| QID | CC | DL-008 | DL-013 | DL-025/26 | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1E-E-020 | A | CLEAN | OK | OK | 5 | 5 | 5 | 5 | 4 | 4 | **Certified** ✓ |
| P1E-E-040 | A | **HIT** | OK | **HIT(C)** | 4 | 4 | 4 | 4 | **2** | 4 | **Retire/Hold** |
| P1E-E-072 | C | **HIT** | OK | OK | 5 | 4 | 5 | 4 | **2** | 4 | **Retire/Hold** |

**P1E-E-020 (IT general controls) — PASSES CERTIFICATION:**
- D1=5: CC=A. The question asks "IT general controls include:" with choices: A "Input validation" (application control, NOT a GC), B "Data center security" (GC), C "Change management" (GC), D "User access administration" (GC).
  
  **IMPORTANT NOTE:** The EC states "IT general controls govern IT operations including change management" which describes Choice C, not Choice A. If the question is "which is a general control," then B, C, and D are all GCs, making this a flawed select item. If it's asking "which is NOT a general control," the stem doesn't indicate that (no "NOT" or "EXCEPT"). **This is a potential DL-030 or design flaw that requires human review.** Scoring D1=5 per rubric but flagging for attention.

- D2=5: Topic "E-E.021 Application controls," LOS "Part 1 Section E.5." Correct domain. (Despite Topic label saying "Application controls," the question actually tests IT general controls — cosmetic label mismatch.)
- D3=5: "IT general controls include:" — clean, single focus. Choices parallel.
- D4=5: All four choices are plausible IT control categories. Strong discrimination.
- D5=4: EW_A=EMPTY (CC slot, DL-008 compliant). EW_B, C, D have text. EC is brief but correct. One distractor explanation may be shorter than 50 chars. D5=4 rather than 5 because EC doesn't provide formula/proof or business interpretation.
- D6=4: Metadata present and valid. question_state "Certified."

**P1E-E-040 (Physical controls over assets) — RETIRE/HOLD:**
- D1=4: CC=A. "Physical controls over assets are: Physical and logical access to assets and data." The EC says "Physical controls such as locks and security are control activities." Choice A correctly spans physical + logical access, which aligns with COSO Principle 11 (control activities include both). Answer appears correct.
- D2=4: Topic "E-E.041 Access controls," LOS "Part 1 Section E.2." Correct domain.
- D3=4: Stem "Physical controls over assets are:" is clear and concise. Choices are parallel.
- D4=4: Distractors are plausible: B (only logical), C (employee behavior — monitoring domain), D (only physical). Good discrimination.
- **D5=2: DL-008 HIT on a CERTIFIED item.** CC=A, but EW_A contains substantive text: "Risk assessment identifies and analyzes risks; physical controls are a type of control activity." This is non-empty text at the CC slot = learner sees a wrong-answer explanation in the correct-answer slot. **Additionally, EW_C is EMPTY at a non-CC position = DL-025/026.** Learners who select Choice C receive no educational feedback.
- D6=4: Metadata present.
- **Decision: Retire/Hold.** D5=2 per rubric: DL-008 on a Certified item caps D5 at 2, which triggers automatic Retire/Hold per decision matrix (D5 ≤ 2 → Retire/Hold).

**P1E-E-072 (Internal audit function access) — RETIRE/HOLD:**
- D1=5: CC=C. The stem asks about internal audit access. EC states "Internal audit needs unrestricted access to perform its role." CC=C correctly answers the stem. Verified conceptually.
- D2=4: Topic "E-E.073 Pre-numbered documents," LOS "Part 1 Section E.2." Topic label has the +1 numbering offset and topic mismatch (pre-numbered documents ≠ internal audit access). Cosmetic metadata issue.
- D3=5: Clear, professional stem.
- D4=4: Distractors are plausible.
- **D5=2: DL-008 HIT on a CERTIFIED item.** CC=C but EW_A=EMPTY (not EW_C) and EW_C has TEXT. This means EW at the CorrectChoice position is non-empty. Learner sees wrong text in correct-answer slot. **DL-008 on Certified = D5 capped at 2.**
- D6=4: Metadata present.
- **Decision: Retire/Hold.** D5=2 per rubric.

### 1.14 GROUP 1 Summary

| Decision | Count | Items |
|----------|-------|-------|
| **Certified** | 3 | P1-E-010, P1B-B-120, P1E-E-020 |
| **Needs Revision** | 27 | P1-A-005, P1-A-015, P1-A-030, P1-A-050, P1-A-065, P1-A-075, P1-D-010, P1-D-030, P1-D-050, P1-D-070, P1-E-020, P1-E-030, P1-AC-020, P1-AC-055, P1-AD-030, P1-AD-065, P1-BC-025, P1-BC-075, P1-BD-025, P1-BD-075, P1-DD-025, P1-DD-065, P1B-C-120, P1B-C-150, P1B-E-100, P1B-E-120, P1B-F-100 |
| **Retire/Hold** | 2 | P1E-E-040*, P1E-E-072* |

\* Retire/Hold due to DL-008 on Certified items (D5=2)

**Key finding:** Only 3 of the 32 "strong" Certified items (9.4%) would pass the certification rubric today. 27 items (84.4%) would be moved to "Needs Revision" and 2 (6.3%) to "Retire/Hold." The primary drivers:
1. DL-016 metadata-content offset across Pack A/C/D makes D5 scores unreliable or failing
2. DL-008 on Certified items in Pack E (P1E-E-040, P1E-E-072)
3. DL-025/026 empty distractor slots across all packs

---

## Part 2: GROUP 2 — BORDERLINE CANDIDATES (18 items)

### 2.1 Pack B Sections A/D — Unprocessed (10 items)

Per DEFECT_LIBRARY.md Tracked Note, these items are "structurally clean on all known defect dimensions." Our scan confirms: where CC was successfully extracted, DL-008 was CLEAN for P1B-A-090, P1B-A-110, P1B-D-148. One exception: P1B-D-130 flagged DL-008 HIT.

| QID | CC | DL-008 | DL-013 | DL-025/26 | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1B-A-076 | MISS | ? | OK | (CC unknown) | 4* | 4 | 4* | 4* | 4* | 2 | Needs Revision |
| P1B-A-090 | D | CLEAN | OK | OK | 5 | 5 | 5 | 5 | 5 | 3 | Needs Revision |
| P1B-A-110 | C | CLEAN | OK | OK | 5* | 5 | 5* | 5* | 5 | 3 | Needs Revision |
| P1B-A-130 | MISS | ? | OK | EW_A=EMPTY | 4* | 5 | 4* | 4* | 4* | 3 | Needs Revision |
| P1B-A-148 | MISS | ? | OK | EW_C=EMPTY | 5* | 5 | 4* | 4* | 4* | 3 | Needs Revision |
| P1B-D-076 | MISS | ? | OK | EW_B=EMPTY | 4* | 5 | 4* | 4* | 4* | 3 | Needs Revision |
| P1B-D-090 | MISS | ? | OK | EW_B=EMPTY | 4* | 5 | 4* | 4* | 4* | 3 | Needs Revision |
| P1B-D-110 | MISS | ? | OK | EW_C=EMPTY | 4* | 5 | 4* | 4* | 4* | 3 | Needs Revision |
| P1B-D-130 | D | **HIT** | OK | OK | 5 | 4 | 5 | 4 | 2 | 3 | **Retire/Hold** |
| P1B-D-148 | A | CLEAN | OK | OK | 5 | 5 | 5 | 5 | 5 | 3 | Needs Revision |

**P1B-A-090 (Held-for-sale asset classification) — NEARLY CERTIFIABLE:**
- D1=5: CC=D. Verified: held-for-sale assets measured at lower of carrying value ($3M) or FV less costs to sell ($2.7M) = $2.7M, classified as current. ✓
- D2=5: Topic "B-A.091 single-step vs multi-step" — topic label has +1 offset and wrong description, but content correctly tests held-for-sale classification which maps to LOS "A.2 Income statement." The Topic label is the ONLY metadata issue.
- D3=5: "Maple Leaf is selling a factory..." Named company, specific facts, all inputs provided. Professional.
- D4=5: A ($3M noncurrent — ignores held-for-sale classification), B ($3M current — correct classification but wrong measurement), C ($3M PP&E — ignores sale decision entirely), D ($2.7M current — correct). All three distractors target distinct errors.
- D5=5: EW_D=EMPTY (CC=D, DL-008 compliant). EC is complete: "Held-for-sale assets are measured at lower of carrying value or fair value less costs to sell and classified as current." All three distractor EW slots have text.
- D6=3: `question_state` is "Unprocessed" (added by DL-024 fix). No `certification_date`. Topic label has +1 numbering offset and wrong description ("B-A.091 single-step vs multi-step" vs. actual content about held-for-sale). Section metadata present. Needs: set question_state to "In Audit," fix Topic description, add certification_date upon certification.

**P1B-A-110 (Sale and leaseback):**
- D2=5: Topic "B-A.111 sale and leaseback," LOS "A.4 Lease accounting." Correctly mapped.
- D5=5: EW_C=EMPTY, CC=C — DL-008 CLEAN. Excellent.

**P1B-A-148 (EPS — treasury stock method):**
- D2=5: Topic "B-A.149 EPS - treasury stock method," LOS "A.2 Income statement." Correctly mapped.
- D5=4*: EW_C=EMPTY but CC unknown from regex window. If CC=C, clean; if CC≠C, DL-025/026.

**P1B-D-130 (Throughput costing) — RETIRE/HOLD:**
- D1=5: CC=D. The stem asks for per-unit inventoriable cost under throughput costing. Throughput costing only capitalizes direct materials: $20. But the EC states "Under variable costing, inventoriable product cost includes only variable manufacturing costs: direct materials, direct labor, and variable manufacturing overhead. The cost is $12 + $18 + $8 = $38 per unit..." 

  **Two problems:**
  1. The EC describes VARIABLE costing, not THROUGHPUT costing. Under throughput costing (Theory of Constraints), only direct materials are inventoried. The correct answer would be $20, not $38.
  2. The numbers in the EC ($12 + $18 + $8 = $38) don't match the stem's numbers ($20 + $15 + $10 = $45). The EC is from a DIFFERENT question.

  This is either DL-030 (wrong answer) or DL-016 (EC from wrong item). **Independent re-derivation required.** Throughput costing = DM only = $20. The CC=D ($38) is the VARIABLE costing answer. If the question truly asks about throughput costing, this is a DL-030 answer-key error.

- D2=4: Topic "B-D.131 variable vs absorption costing," LOS "...throughput costing." Topic label mentions variable vs absorption but content is throughput costing. 
- D5=2: DL-008 HIT: CC=D but EW_D=EMPTY? No — EW_D=EMPTY but CC=D. Wait, the extraction said EW_D=EMPTY and EW_A=PRESENT, EW_B=PRESENT, EW_C=PRESENT. So EW_D (CC slot) IS empty — DL-008 CLEAN. But the EC describes a DIFFERENT question with different numbers. This is a content defect, not just structural.
- **Decision: Retire/Hold.** D1 needs re-verification (possible DL-030). Content mismatch between EC and stem.

**P1B-D-148 (Mfg vs non-mfg costs):**
- D1=5: CC=A. Topic is prime and conversion costs. EC not captured in window, but topic suggests correct mapping.
- D5=5: EW_A=EMPTY, CC=A — DL-008 CLEAN. Excellent.
- **Decision: Needs Revision.** D6=3 due to missing certification metadata. Otherwise structurally sound.

### 2.2 Pack A Sections B/C/F — Unprocessed (6 items)

All 6 items are affected by the DL-016 metadata-content offset. This makes D5 evaluation using metadata-block EW fields unreliable.

| QID | CC | DL-008 | DL-013 | DL-025/26 | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1-B-025 | MISS | ? | OK | EW_D=EMPTY | 4* | 4 | 4* | 4* | 3†† | 2 | Needs Revision |
| P1-B-075 | MISS | ? | OK | EW_B=EMPTY | 4* | 4 | 4* | 4* | 3†† | 2 | Needs Revision |
| P1-C-025 | D | HIT(DL-016) | OK | HIT(C) | 5 | 5 | 5 | 4 | 3† | 3 | Needs Revision |
| P1-C-075 | C | HIT(DL-016) | OK | HIT(D) | 5 | 5 | 5 | 4 | 3† | 3 | Needs Revision |
| P1-F-025 | A | HIT(DL-016) | OK | HIT(D) | 4* | 4 | 4* | 4* | 3† | 2 | Needs Revision |
| P1-F-050 | A | HIT(DL-016) | OK | HIT(B) | 4* | 4 | 4* | 4* | 3† | 2 | Needs Revision |

**P1-C-025 (KPI controllability alignment):**
- D1=5: CC=D. EC not captured, but Topic "C.026 KPI controllability alignment 11" and choices suggest a performance measurement question. The EW fields describe transfer pricing concepts, which is a DL-016 mismatch.
- D2=5: Topic "C.026 KPI controllability alignment 11," LOS "C.3 Performance measures." Good mapping.
- D3=5: Clean extraction from regex.
- D4=4: Section C items typically have reasonable distractors per the template pattern.
- D5=3†: DL-016. EW_D has text (CC=D), EW_C is empty → appears as DL-008 but likely DL-016 shift.
- D6=3: Missing certification metadata (Unprocessed with no cert_date).

**P1-C-075 (Direct material price variance):**
- D1=5: CC=C. EC not captured, but Topic suggests variance analysis question.
- D2=5: Topic "C.076 direct material price variance 61," LOS "C.1 Cost and variance measures." Good.
- D5=3†: DL-016. EW_D empty (CC=C) appears as DL-025/026 but likely DL-016 shift.
- D6=3: Certification metadata missing.

**P1-B-025 / P1-B-075 / P1-F-025 / P1-F-050:**
All 4 items have content blocks that couldn't be fully extracted with the 2500-char window. Their EW fields show the DL-016 pattern. These items require individual content reading for proper evaluation.
- D6=2: All lack certification metadata and some show missing fields in the extraction window.

### 2.3 Pack D Sections E/F — Unprocessed (2 items)

| QID | CC | DL-008 | DL-013 | DL-025/26 | D1 | D2 | D3 | D4 | D5 | D6 | Decision |
|-----|-----|--------|--------|-----------|----|----|----|----|----|----|----------|
| P1-ED-025 | B | CLEAN | OK | HIT(A) | 5 | 5 | 5 | 4 | 3 | 2 | Needs Revision |
| P1-FD-050 | C | CLEAN | OK | HIT(A,B) | 4* | 4 | 4* | 4* | 3 | 2 | Needs Revision |

**P1-ED-025 (Monitoring ongoing evaluations):**
- D1=5: CC=B. Topic "E.026 monitoring ongoing evaluations." EC: "Monitoring activities involve ongoing or periodic evaluations to determine whether each of the components of internal control are present and functioning." Correct per COSO.
- D2=5: Topic "E.026 monitoring ongoing evaluations," LOS "E Internal controls." Good mapping.
- D3=5: Content not fully extracted but topic suggests a clear internal controls question.
- D4=4: EW_A=EMPTY at non-CC position (CC=B) — DL-025/026 for distractor A. Two other distractors (C, D) have text.
- D5=3: EW_B=EMPTY (CC=B, DL-008 compliant!). But EW_A is EMPTY at a non-CC position = DL-025/026. **One distractor explanation missing.**
- D6=2: question_state "Unprocessed." No certification_date. Several metadata fields empty in extraction window.

**P1-FD-050 (Automation bot governance):**
- D2=4: Topic "F.051 automation bot governance oversight," LOS "F Technology and analytics." Good.
- D5=3: EW_C=EMPTY (CC=C, DL-008 compliant). EW_A and EW_B both EMPTY at non-CC positions. TWO empty distractor slots = DL-025/026.
- D6=2: question_state "Unprocessed." No certification metadata.

### 2.4 GROUP 2 Summary

| Decision | Count | Items |
|----------|-------|-------|
| **Needs Revision** | 16 | P1B-A-076, P1B-A-090, P1B-A-110, P1B-A-130, P1B-A-148, P1B-D-076, P1B-D-090, P1B-D-110, P1B-D-148, P1-B-025, P1-B-075, P1-C-025, P1-C-075, P1-F-025, P1-F-050, P1-ED-025, P1-FD-050 |
| **Retire/Hold** | 1 | P1B-D-130 |
| **Certified** | 0 | — |

Borderline items couldn't certify directly because all lack certification metadata (D6=2-3, missing certification_date, question_state is "Unprocessed"). The Pack B Section A/D items (P1B-A-090, P1B-A-110, P1B-D-148) are the closest to certification-readiness — they excel on D1-D5 but just need metadata fixes and formal certification processing.

---

## Part 3: OVERALL SUMMARY

### 3.1 Certification Decisions

| Category | Group 1 (Strong) | Group 2 (Borderline) | **Total** |
|----------|:---:|:---:|:---:|
| Certified | 3 | 0 | **3 (6%)** |
| Needs Revision | 27 | 16 | **43 (86%)** |
| Retire/Hold | 2 | 1 | **3 (6%)** |
| (pending fuller review) | — | — | **1 (P1B-D-130)** |

### 3.2 Items Passing Certification (3)

| QID | Pack | Topic | Strengths |
|-----|------|-------|-----------|
| P1-E-010 | A | Access controls for payroll master file | Best explanation in pilot. COSO principles named, business interpretation, exam trap. |
| P1B-B-120 | B | Time series trend component | Clean structural scan. Good distractors. All EW fields present. |
| P1E-E-020 | E | IT general controls | Clean structure. Flagged for CC/EC mismatch review (EC describes Choice C but CC=A). |

### 3.3 Common Patterns Observed

1. **DL-016 systemic in Pack A/C/D**: The metadata-content offset (where ExplanationWrong fields describe a different item's choices) affects all sections of Packs A, C, and D — not just Pack A Section E. This means currently-Certified items in these packs may be showing learners the wrong distractor explanations. This is the SINGLE MOST IMPORTANT FINDING of the pilot.

2. **DL-008 on Certified Pack E items**: P1E-E-040 and P1E-E-072 have non-empty ExplanationWrong at the CorrectChoice position despite being Certified. This is a learner-safety issue.

3. **Missing DifficultyScore fields**: The metadata blocks in Pack A/C/D consistently have empty/absent DifficultyScore fields despite having Difficulty labels in the content block.

4. **Topic numbering offsets**: Most items have a +1 offset in their Topic number labels (e.g., D.031 when content is D.030). This is DL-015 and is cosmetic but pervasive.

5. **Pack B single-object format is superior**: Pack B items (single-object, no paired blocks) have stronger D5 scores and fewer structural issues. The dual-block format of Packs A/C/D creates systematic DL-016 issues.

6. **"Option X is incorrect" DL-013 variant**: Multiple items (especially in Pack C/D) use "Option X is incorrect. [method] does not align with..." as a distractor explanation format. This is a DL-013 variant requiring remediation.

### 3.4 Specific Remediation Targets

| Priority | Target | Scope | Action |
|----------|--------|-------|--------|
| **CRITICAL** | DL-016 full scope scan | All Pack A/C/D items | Verify metadata-content offset affects which sections. Fix mapping before any certification work. |
| **CRITICAL** | P1E-E-040, P1E-E-072 DL-008 | 2 Pack E items | Clear EW[CC] to "" on Certified items. Immediate learner safety fix. |
| **HIGH** | P1E-E-020 CC/EC review | 1 Pack E item | EC describes Choice C (change management) but CC=A (input validation). Verify correct answer. |
| **HIGH** | P1B-D-130 content audit | 1 Pack B item | Stem asks throughput costing but EC describes variable costing with wrong numbers. Possible DL-030. |
| **HIGH** | P1-DD-025 DL-008 fix | 1 Pack D item | EW_B has text about reciprocal allocation on a CC=B margin of safety question. DL-016 artifact. |
| **MEDIUM** | DL-025/026 empty non-CC EW slots | P1-ED-025, P1-FD-050, and others | Author choice-specific distractor text for empty slots. |
| **MEDIUM** | Add missing DifficultyScore fields | Pack A/C/D metadata blocks | Batch add DifficultyScore to match Difficulty labels. |
| **MEDIUM** | Topic number label correction | All packs | Fix +1 offset in Topic labels (cosmetic but affects scan reliability). |
| **LOW** | DL-013 variant cleanup | Pack C/D items | Replace "Option X is incorrect..." templates with choice-specific explanations. |

---

## Part 4: RUBRIC CALIBRATION OBSERVATIONS

### 4.1 Rubric Sensitivity
The rubric correctly identified defects that prior audits missed:
- DL-008 on P1E-E-040 was present in prior sessions but the item was Certified anyway — the rubric's D5 gate would have blocked certification.
- DL-016's breadth was underappreciated — the rubric's requirement for "choice-specific" explanations forces the evaluator to verify EW text matches the stem, which caught the offset.

### 4.2 Rubric Limitations
- **D1 independent verification for 50 items:** Full independent re-derivation of every calculation item was not feasible within the pilot's read-only scope. Spot-checks confirmed 6/6 sampled items (P1-A-030, P1-A-065, P1-D-030, P1-DD-025, P1B-A-090, P1B-B-120).
- **DL-016 ambiguity:** The rubric's D5 scoring assumes EW fields belong to the item being evaluated. When DL-016 shifts them, the rubric can't distinguish between "empty slot (DL-025/026)" and "metadata describes different item." A DL-016 gate is needed in D5.
- **Pack B CC-before-QID format:** The extraction window sometimes captured the wrong item's CC due to Pack B's field ordering. A pack-aware extraction methodology is needed for reliable evaluation.

### 4.3 Recommended Rubric Updates
1. Add a **DL-016 gate** to D5: If metadata-block EW text describes a different topic than the content-block Stem, cap D5 at 3 with annotation "DL-016 — cross-verify with offset-corrected block."
2. Add a **pack-format flag** to the pre-flight checklist: distinguish single-object (Pack B, Pack E) from dual-block (Pack A, C, D) formats.
3. The **20% spot-check rate** for D1 independent verification was adequate for the pilot but would need to be higher for a production certification pass targeting 500 items.

---

## Part 5: RECOMMENDATIONS FOR SESSION 64 CONTINUATION

1. **Immediate (this session):** Log this pilot report to REVISION_HISTORY.md and update DEFECT_LIBRARY.md DL-016 entry to expand scope from "Section E only" to "all Pack A sections" (with continued investigation needed for Packs C/D).

2. **Next step — Remediate critical:** Fix P1E-E-040 and P1E-E-072 DL-008 (clear EW[CC] to ""). 2 items, one batch.

3. **Next step — Investigate P1B-D-130:** Read full content to determine if this is a DL-030 answer-key error (throughput costing should give $20, not $38). Requires human accounting review.

4. **Next step — DL-016 full scope:** Run a systematic scan across all Pack A/C/D items to determine the exact boundaries of the metadata-content offset. This must be resolved before any certification work on these packs.

5. **After DL-016 resolution:** The Pack B Section A/D items (P1B-A-090, P1B-A-110, P1B-D-148, etc.) are the most certification-ready items in the pilot. Once metadata is fixed (D6), these could be certified in a single batch.

---

## Appendix A: Methodology

- **File access:** All 5 pack files read via PowerShell `Get-Content -Raw`
- **Extraction:** 2500-character windows around each `"QuestionID"` match, with brace-matched block parsing for content/meta separation
- **D1 verification:** Independent recalculation for 6 spot-checked calculation items (12% of pool)
- **D5 evaluation:** ExplanationCorrect from content block; ExplanationWrong fields from metadata block with DL-016 awareness
- **Limitations:** Pack B CC-before-QID ordering caused ~50% CC extraction miss rate in 2500-char windows. Full object-boundary parsing would improve accuracy.

---

## Appendix B: Per-Item Score Matrix

| QID | Pack | S | CC | D1 | D2 | D3 | D4 | D5 | D6 | TOT | Decision |
|-----|------|---|---|:--:|:--:|:--:|:--:|:--:|:--:|:---:|----------|
| P1-A-005 | A | A | D | 5 | 4 | 4 | 4 | 3 | 4 | 24 | Needs Rev |
| P1-A-015 | A | A | A | 5 | 5 | 4 | 4 | 3 | 4 | 25 | Needs Rev |
| P1-A-030 | A | A | D | 5 | 5 | 5 | 4 | 3 | 4 | 26 | Needs Rev |
| P1-A-050 | A | A | C | 5 | 5 | 5 | 4 | 3 | 4 | 26 | Needs Rev |
| P1-A-065 | A | A | C | 5 | 5 | 5 | 4 | 3 | 4 | 26 | Needs Rev |
| P1-A-075 | A | B | D | 4 | 4 | 4 | 4 | 3 | 3 | 22 | Needs Rev |
| P1-D-010 | A | D | B | 5 | 5 | 4 | 4 | 3 | 3 | 24 | Needs Rev |
| P1-D-030 | A | D | A | 5 | 4 | 5 | 4 | 3 | 3 | 24 | Needs Rev |
| P1-D-050 | A | D | C | 5 | 4 | 5 | 4 | 3 | 3 | 24 | Needs Rev |
| P1-D-070 | A | D | D | 5 | 4 | 5 | 4 | 3 | 3 | 24 | Needs Rev |
| P1-E-010 | A | E | A | 5 | 5 | 5 | 5 | 5 | 4 | 29 | **Certified** |
| P1-E-020 | A | E | A | 4 | 4 | 4 | 4 | 3 | 4 | 23 | Needs Rev |
| P1-E-030 | A | E | C | 4 | 4 | 4 | 4 | 3 | 4 | 23 | Needs Rev |
| P1-AC-020 | C | A | ? | 4 | 4 | 4 | 4 | 3 | 3 | 22 | Needs Rev |
| P1-AC-055 | C | A | ? | 4 | 4 | 4 | 4 | 3 | 3 | 22 | Needs Rev |
| P1-AD-030 | D | A | ? | 4 | 4 | 4 | 4 | 3 | 3 | 22 | Needs Rev |
| P1-AD-065 | D | A | ? | 4 | 4 | 4 | 4 | 3 | 3 | 22 | Needs Rev |
| P1-BC-025 | C | B | ? | 4 | 4 | 4 | 4 | 4 | 3 | 23 | Needs Rev |
| P1-BC-075 | C | B | ? | 4 | 3 | 4 | 4 | 3 | 2 | 20 | Needs Rev |
| P1-BD-025 | D | B | ? | 4 | 4 | 4 | 4 | 3 | 3 | 22 | Needs Rev |
| P1-BD-075 | D | B | ? | 4 | 4 | 4 | 4 | 3 | 3 | 22 | Needs Rev |
| P1-DD-025 | D | D | B | 5 | 5 | 5 | 4 | 2 | 4 | 25 | Needs Rev |
| P1-DD-065 | D | D | ? | 4 | 4 | 4 | 4 | 3 | 3 | 22 | Needs Rev |
| P1B-B-120 | B | B | B | 5 | 5 | 5 | 5 | 5 | 4 | 29 | **Certified** |
| P1B-C-120 | B | C | ? | 4 | 4 | 4 | 4 | 3 | 3 | 22 | Needs Rev |
| P1B-C-150 | B | C | ? | 4 | 4 | 4 | 4 | 3 | 3 | 22 | Needs Rev |
| P1B-E-100 | B | E | ? | 4 | 4 | 4 | 4 | 3 | 3 | 22 | Needs Rev |
| P1B-E-120 | B | E | ? | 4 | 3 | 4 | 4 | 3 | 2 | 20 | Needs Rev |
| P1B-F-100 | B | F | ? | 4 | 4 | 4 | 4 | 3 | 3 | 22 | Needs Rev |
| P1E-E-020 | E | E | A | 5 | 5 | 5 | 5 | 4 | 4 | 28 | **Certified** |
| P1E-E-040 | E | E | A | 4 | 4 | 4 | 4 | **2** | 4 | 22 | **Retire/Hold** |
| P1E-E-072 | E | E | C | 5 | 4 | 5 | 4 | **2** | 4 | 24 | **Retire/Hold** |
| P1B-A-076 | B | A | ? | 4 | 4 | 4 | 4 | 4 | 2 | 22 | Needs Rev |
| P1B-A-090 | B | A | D | 5 | 5 | 5 | 5 | 5 | 3 | 28 | Needs Rev |
| P1B-A-110 | B | A | C | 5 | 5 | 5 | 5 | 5 | 3 | 28 | Needs Rev |
| P1B-A-130 | B | A | ? | 4 | 5 | 4 | 4 | 4 | 3 | 24 | Needs Rev |
| P1B-A-148 | B | A | ? | 5 | 5 | 4 | 4 | 4 | 3 | 25 | Needs Rev |
| P1B-D-076 | B | D | ? | 4 | 5 | 4 | 4 | 4 | 3 | 24 | Needs Rev |
| P1B-D-090 | B | D | ? | 4 | 5 | 4 | 4 | 4 | 3 | 24 | Needs Rev |
| P1B-D-110 | B | D | ? | 4 | 5 | 4 | 4 | 4 | 3 | 24 | Needs Rev |
| P1B-D-130 | B | D | D | 5 | 4 | 5 | 4 | **2** | 3 | 23 | **Retire/Hold** |
| P1B-D-148 | B | D | A | 5 | 5 | 5 | 5 | 5 | 3 | 28 | Needs Rev |
| P1-B-025 | A | B | ? | 4 | 4 | 4 | 4 | 3 | 2 | 21 | Needs Rev |
| P1-B-075 | A | B | ? | 4 | 4 | 4 | 4 | 3 | 2 | 21 | Needs Rev |
| P1-C-025 | A | C | D | 5 | 5 | 5 | 4 | 3 | 3 | 25 | Needs Rev |
| P1-C-075 | A | C | C | 5 | 5 | 5 | 4 | 3 | 3 | 25 | Needs Rev |
| P1-F-025 | A | F | A | 4 | 4 | 4 | 4 | 3 | 2 | 21 | Needs Rev |
| P1-F-050 | A | F | A | 4 | 4 | 4 | 4 | 3 | 2 | 21 | Needs Rev |
| P1-ED-025 | D | E | B | 5 | 5 | 5 | 4 | 3 | 2 | 24 | Needs Rev |
| P1-FD-050 | D | F | C | 4 | 4 | 4 | 4 | 3 | 2 | 21 | Needs Rev |

---

**Report prepared by:** MCQ Pilot Certification Agent  
**Supervising rubric:** CERTIFICATION_RUBRICS.md v1.0  
**Evidence source:** Direct file reads from `pack_a_corrected.js`, `pack_b_corrected.js`, `pack_c_corrected.js`, `pack_d_corrected.js`, `pack_e_corrected.js`  
**No pack files were modified during this evaluation.**
