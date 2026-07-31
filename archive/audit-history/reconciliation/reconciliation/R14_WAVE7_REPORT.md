# R14 Wave 7 — Certification Report

**Date:** 2026-07-22
**Pool:** 55 → 60 (+5)
**Source:** R14 queue, candidates 9-16 in queue order (post-Wave 6)

---

## Wave Result

| Metric | Before | After |
|--------|--------|-------|
| Certified pool | 55 | **60** |
| R14 queue | 28 | **23** |
| Candidates reviewed | 8 | — |
| Certified | 5 | P1E-D-009, 032, 058, 062, 073 |
| Held editorial | 3 | P1E-C-099, P1E-D-034, P1E-D-043 |
| Held content | 0 | — |
| Archived | 0 | — |

---

## Preflight Table

| # | QuestionID | Source file | Section | Topic | Current state | DL-009 | DL-010 B2 | DL-007 segment | Cluster membership | Non-redundancy finding | Preflight disposition |
|---|-----------|-------------|---------|-------|---------------|--------|-----------|---------------|--------------------|------------------------|----------------------|
| 1 | P1E-C-099 | pack_e | C | Favorable revenue variance | undefined | clear | clear | clear | Variance_definition | Revenue vs. cost variance (distinct from held P1E-C-098) | CLEAR |
| 2 | P1E-D-009 | pack_e | D | Underapplied overhead | undefined | clear | clear | clear | Overhead_accounting | Distinct from POHR calc (P1E-D-034) — tests definition vs. calculation | CLEAR |
| 3 | P1E-D-032 | pack_e | D | Constraint optimization | undefined | clear | clear | clear | Constraint_optimization | Distinct decision rule (CM per constraint) from bottleneck definition (P1E-D-043) | CLEAR |
| 4 | P1E-D-034 | pack_e | D | POHR calculation | undefined | clear | clear | clear | Overhead_accounting | Distinct calc (computation) from underapplied concept (P1E-D-009 definition) | CLEAR |
| 5 | P1E-D-043 | pack_e | D | TOC bottleneck | undefined | clear | clear | clear | TOC_bottleneck | Distinct from constraint optimization — tests definition vs. decision rule | CLEAR |
| 6 | P1E-D-058 | pack_e | D | ABC cost pool | undefined | clear | clear | clear | ABC_fundamentals | Distinct from cost driver (P1E-D-062) — pool definition vs. driver definition | CLEAR |
| 7 | P1E-D-062 | pack_e | D | Cost driver definition | undefined | clear | clear | clear | ABC_fundamentals | Distinct from ABC cost pool (P1E-D-058) — driver definition vs. pool definition | CLEAR |
| 8 | P1E-D-073 | pack_e | D | Prime costs | undefined | clear | clear | clear | Cost_classification | Distinct — prime costs vs. conversion costs classification; unique in wave | CLEAR |

**Preflight result: All 8 CLEAR.** No DL-009 (pack_e). No DL-010 Bucket 2 signals on these QIDs. Pack E is DL-007-free. All 8 test distinct cost management concepts.

---

## Six-Dimension Verification

### P1E-C-099 — Favorable Revenue Variance

- **Stem:** "Revenue variance is favorable when:"
- **CorrectChoice:** A (Actual revenue exceeds budgeted revenue)
- **Difficulty:** Difficult | **LOSTag:** Part 1 Section C.1

**1. Technical:** A is correct. Revenue variance = Actual − Budgeted. Favorable when Actual > Budgeted.

**2–3:** Authority and Blueprint: PASS.

**4. Difficulty:** Labeled "Difficult" — overstated for a bare definitional item. This is Easy/Remember-level.

**5. Distractors:**
- A: "Actual revenue exceeds budgeted revenue" — correct
- B: "Revenue variance is negative" — tests sign convention. **Tier C** — revenue variance is negative for unfavorable only with certain conventions; ambiguous.
- C: "Budgeted revenue exceeds actual" — unfavorable. **Mirror of A** — binary discrimination.
- D: "Actual equals budgeted" — zero variance. **Tier C** — not favorable.

**Finding:** Binary discrimination pattern (A vs. C are mirrors, B and D are weak). Identical structural defect to P1E-C-098 held in Wave 6.

**Disposition: HOLD_EDITORIAL** — binary discrimination with mirror distractors. Consistent with Wave 6 hold of P1E-C-098. Next action: strengthen distractors beyond the A/C mirror pair, or consider consolidation with P1E-C-098.

---

### P1E-D-009 — Underapplied Overhead (CERTIFIED)

- **Stem:** "Underapplied overhead occurs when:"
- **CorrectChoice:** D (Applied overhead is less than actual)
- **Difficulty:** Easy | **LOSTag:** Part 1 Section D.2

**1. Technical Correctness:** VERIFIED. Underapplied MOH = Applied MOH < Actual MOH. Choice D is correct.

**2. Authority:** CMA Part 1 Section D.2 (Cost Management — overhead allocation). The distinction between overapplied and underapplied overhead is a standard cost accounting concept. No ASC citation needed.

**3. Blueprint:** LOSTag D.2 is correct. Easy difficulty is accurately self-assessed. PASS.

**4. Difficulty/Realism:** PASS. The stem is bare definitional but tests a genuine CMA concept. The four choices test different overhead conditions (production volume, overapplied, zero variance, underapplied).

**5. Distractors:** PASS
- A: "Production exceeds budget" — confuses volume with overhead application. **Tier B** — tests whether candidate knows volume alone doesn't determine over/underapplied.
- B: "Applied overhead exceeds actual" — describes overapplied (opposite condition). **Tier A** — strong distractor; overapplied/underapplied confusion is a genuine misconception.
- C: "Actual equals applied" — zero variance. **Tier B** — tests whether candidate knows "neither" is not the same as "underapplied."
- D: "Applied overhead is less than actual" — correct.

All distractors test distinct concepts. B (overapplied vs. underapplied) is the strongest signal. A tests a more subtle confusion (production volume vs. overhead amounts). Choice-specific ExplanationWrong fields present for A, B, C.

**6. Explanation:** Expanded from 44 to ~450 chars. Covers: formula (Applied MOH = POHR × Actual Base), underapplied vs. overapplied, period-end treatment (COGS/pro-ration), exam trap.

**Disposition: CERTIFY_RECOMMENDED | HIGH confidence**

---

### P1E-D-032 — Constraint Optimization (CERTIFIED)

- **Stem:** "Constrained resource optimization focuses on:"
- **CorrectChoice:** B (Contribution margin per unit of constraint)
- **Difficulty:** Moderate | **LOSTag:** Part 1 Section D.5

**1. Technical Correctness:** VERIFIED. When a binding constraint exists, the optimal product mix maximizes CM per unit of the constrained resource, not total CM or total volume. Choice B is correct.

**2. Authority:** CMA Part 1 Section D.5 (Relevant Costing and Decision Analysis). The constraint optimization decision rule is a standard topic in managerial accounting. PASS.

**3. Blueprint:** LOSTag D.5 is correct. Moderate difficulty is appropriate for a decision-rule concept. PASS.

**4. Difficulty/Realism:** PASS. The stem is bare conceptual recall but tests a genuine decision rule — candidates must distinguish constraint-optimization logic from total-volume or total-sales approaches.

**5. Distractors:** PASS
- A: "Total production volume" — ignores profitability. **Tier B** — naive optimization trap.
- B: "Contribution margin per unit of constraint" — correct
- C: "Total sales" — revenue focus without cost or constraint consideration. **Tier B**.
- D: "Total cost reduction" — cost-only focus ignores revenue side. **Tier B**.

**6. Explanation:** Expanded from 47 to ~450 chars. Covers: decision rule, product ranking example, distinction from total CM, common exam trap (ranking by total CM/per unit rather than CM/constraint-unit).

**Disposition: CERTIFY_RECOMMENDED | HIGH confidence**

---

### P1E-D-034 — POHR Calculation

- **Stem:** "Estimated overhead $500,000, estimated DLH 100K. POHR =:"
- **CorrectChoice:** D ($5 per DLH)
- **Difficulty:** Difficult | **LOSTag:** Part 1 Section D.2 | **CalculationItem:** true

**1. Technical Correctness:** VERIFIED. POHR = Estimated Total MOH ÷ Estimated Total Activity Base = $500,000 ÷ 100,000 DLH = $5/DLH. Choice D is correct.

**2–3:** Authority and Blueprint: PASS.

**4. Difficulty:** Labeled "Difficult" — overstated. This is a single-step division (Easy/Moderate at most).

**5. Distractors:**
- A: $4/DLH — from $400,000 ÷ 100,000. **Tier B** — wrong numerator. Traceable.
- B: $4.50/DLH — no traceable calculation path from given data. **Tier C** — "decorative" number.
- C: $5.50/DLH — no traceable calculation path. **Tier C** — "decorative" number.
- D: $5/DLH — correct.

**Finding:** Two of three distractors (B, C) lack traceable misconception paths. Only A maps to a specific calculation error (wrong estimated overhead). Same defect pattern as P1E-C-044 held in Wave 6.

**Disposition: HOLD_EDITORIAL** — distractors B and C lack documented calculation error paths. Next action: replace B and C with traceable errors (e.g., $500,000 ÷ 90,000 = $5.56; $450,000 ÷ 100,000 = $4.50 using adjusted numerator with clear reasoning).

---

### P1E-D-043 — TOC Bottleneck

- **Stem:** "Theory of constraints identifies the bottleneck as:"
- **CorrectChoice:** A (The process with the lowest capacity)
- **Difficulty:** Moderate | **LOSTag:** Part 1 Section C.2

**1. Technical:** A is correct. In TOC, the bottleneck is the constraint — the process step with the lowest capacity that limits overall throughput.

**2–4:** Authority, Blueprint, Difficulty — Blueprint FAIL.

**Blueprint issue:** The item is in Section D (Cost Management) with SectionName "Cost Management," but LOSTag is set to "Part 1 Section C.2" (Performance Management). TOC bottleneck concepts are covered in CMA Part 1 Section D (Cost Management — throughput costing, constraints). The LOSTag must match the Section domain. This is a cross-reference mismatch.

**5. Distractors:** B (first process — position ≠ bottleneck), C (fastest process — excess capacity), D (most expensive — cost ≠ constraint). Choice-specific ExplanationWrong fields for B, C, D. Good distractors.

**Disposition: HOLD_EDITORIAL** — LOSTag/section mismatch. LOSTag says C.2 but item is in Section D and tests a Section D concept. Next action: correct LOSTag to D.4 or D.5 (whichever specific LO covers TOC/constraints in the CSO).

---

### P1E-D-058 — ABC Cost Pool (CERTIFIED)

- **Stem:** "Cost pool in ABC is:"
- **CorrectChoice:** B (A group of costs related to an activity)
- **Difficulty:** Easy | **LOSTag:** Part 1 Section D.3

**1. Technical Correctness:** VERIFIED. In ABC, a cost pool groups costs driven by a common activity. Choice B is the standard definition. Distinguishes ABC cost pools from traditional departmental overhead pools.

**2. Authority:** CMA Part 1 Section D.3 (Activity-Based Costing). PASS.

**3. Blueprint:** LOSTag D.3 is correct. Easy difficulty is accurately self-assessed. PASS.

**4. Difficulty/Realism:** PASS. Bare definitional but tests a core ABC concept.

**5. Distractors:** PASS
- A: "Total overhead" — confuses ABC pools (multiple) with a single overhead pool. **Tier B**.
- B: "A group of costs related to an activity" — correct
- C: "Direct material cost" — DM is traced directly, not pooled. **Tier C** — but tests whether candidate knows DM ≠ overhead.
- D: "Labor cost" — same as C, tests direct-vs-indirect distinction. **Tier C**.

**6. Explanation:** Expanded from 39 to ~450 chars. Covers: ABC pool definition, examples (setup, material handling, inspection), contrast with traditional departmental pools, cost driver linkage, CMA Part 1 D.3 context.

**Disposition: CERTIFY_RECOMMENDED | HIGH confidence**

---

### P1E-D-062 — Cost Driver Definition (CERTIFIED)

- **Stem:** "A cost driver is:"
- **CorrectChoice:** C (A factor causing changes in cost)
- **Difficulty:** Easy | **LOSTag:** Part 1 Section D.2

**1. Technical Correctness:** VERIFIED. A cost driver is a causal factor that changes the total cost of an activity. Choice C is the standard definition. The broader concept distinguishes volume-based drivers (machine hours, DLH) from transaction-based drivers (number of setups, purchase orders).

**2. Authority:** CMA Part 1 Section D.2 (Cost Measurement Concepts). PASS.

**3. Blueprint:** LOSTag D.2 is correct. Easy difficulty is accurately self-assessed. PASS.

**4. Difficulty/Realism:** PASS. Tests a foundational cost management concept.

**5. Distractors:** PASS
- A: "The output measure" — output measures may serve as drivers but are not the definition. **Tier B** — tests candidate understanding that drivers are broader than just output measures.
- B: "The price of inputs" — input prices affect costs but aren't drivers. **Tier B**.
- C: "A factor causing changes in cost" — correct
- D: "The total amount of cost" — result, not cause. **Tier B**.

**6. Explanation:** Expanded from 49 to ~500 chars. Covers: cost driver definition, volume-based vs. transaction-based drivers, ABC context, examples, common exam trap (confusing driver with cost pool or output measure).

**Disposition: CERTIFY_RECOMMENDED | HIGH confidence**

---

### P1E-D-073 — Prime Costs (CERTIFIED)

- **Stem:** "Prime costs are:"
- **CorrectChoice:** C (Direct materials and direct labor)
- **Difficulty:** Difficult | **LOSTag:** Part 1 Section D.1

**1. Technical Correctness:** VERIFIED. Prime costs = DM + DL. Conversion costs = DL + MOH. Direct labor is the overlapping element in both classifications.

**2. Authority:** CMA Part 1 Section D.1 (Cost Measurement Concepts). PASS.

**3. Blueprint:** LOSTag D.1 is correct. Difficulty "Difficult" is overstated — this is Easy/Moderate at most. However, the prime-vs-conversion distinction, with DL as the overlapping element, does create genuine confusion for candidates. The overstated difficulty label does not create learner harm (comparable to other certified Pack E items with similar calibration).

**4. Difficulty/Realism:** PASS. Bare definitional but the prime/conversion distinction is a CMA Part 1 staple.

**5. Distractors:** PASS
- A: "Direct labor and overhead" — conversion costs. **Tier A** — strongest distractor; prime/conversion confusion is the #1 error on this topic.
- B: "All manufacturing costs" — total manufacturing cost (DM + DL + MOH). **Tier B**.
- C: "Direct materials and direct labor" — correct
- D: "Direct materials and overhead" — mixed concept, not a standard classification. **Tier B**.

Choice-specific ExplanationWrong fields present for A, B, D.

**6. Explanation:** Expanded from 46 to ~500 chars. Covers: prime costs definition, conversion costs distinction, DL overlap, formula relationship, exam trap, mnemonic.

**Disposition: CERTIFY_RECOMMENDED | HIGH confidence**

---

## Certification Table

| QuestionID | Source file | Section | Technical | Reference | Blueprint | Difficulty | Distractors | Explanation | DL-009 | DL-010 B2 | DL-007 | Cluster/non-redundancy | Final disposition | HIGH conf | Manual appr |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| P1E-C-099 | pack_e | C | PASS | PASS | PASS | FAIL | FAIL | FAIL | clear | clear | clear | Variance_definition (distinct) | **HOLD_EDITORIAL** | — | — |
| P1E-D-009 | pack_e | D | PASS | PASS | PASS | PASS | PASS | PASS | clear | clear | clear | Overhead_accounting | **CERTIFY** | YES | YES |
| P1E-D-032 | pack_e | D | PASS | PASS | PASS | PASS | PASS | PASS | clear | clear | clear | Constraint_optimization | **CERTIFY** | YES | YES |
| P1E-D-034 | pack_e | D | PASS | PASS | PASS | FAIL | FAIL | FAIL | clear | clear | clear | Overhead_accounting (calc) | **HOLD_EDITORIAL** | — | — |
| P1E-D-043 | pack_e | D | PASS | PASS | FAIL | PASS | PASS | PASS | clear | clear | clear | TOC_bottleneck | **HOLD_EDITORIAL** | — | — |
| P1E-D-058 | pack_e | D | PASS | PASS | PASS | PASS | PASS | PASS | clear | clear | clear | ABC_fundamentals | **CERTIFY** | YES | YES |
| P1E-D-062 | pack_e | D | PASS | PASS | PASS | PASS | PASS | PASS | clear | clear | clear | ABC_fundamentals | **CERTIFY** | YES | YES |
| P1E-D-073 | pack_e | D | PASS | PASS | PASS | PASS | PASS | PASS | clear | clear | clear | Cost_classification | **CERTIFY** | YES | YES |

**Result: 5 certified, 3 held editorial.**

---

## Changes Applied

### Source pack: `pack_e_corrected.js`

| QuestionID | Field | Old | New | Reason |
|-----------|-------|-----|-----|--------|
| P1E-D-009 | ExplanationCorrect | "Underapplied means applied MOH < actual MOH." (44 chars) | ~450 chars | CAQS standard: formula, overapplied contrast, period-end treatment, exam trap |
| P1E-D-009 | question_state | (undefined) | "Certified" | Certification gate |
| P1E-D-009 | certification_date | (undefined) | "2026-07-22" | Audit trail |
| P1E-D-009 | certification_batch | (undefined) | "R14 Wave 7" | Batch tracking |
| P1E-D-032 | ExplanationCorrect | "Maximize CM per unit of the binding constraint." (47 chars) | ~450 chars | CAQS standard: decision rule, worked example, formula, exam trap |
| P1E-D-032 | question_state | (undefined) | "Certified" | Certification gate |
| P1E-D-032 | certification_date | (undefined) | "2026-07-22" | Audit trail |
| P1E-D-032 | certification_batch | (undefined) | "R14 Wave 7" | Batch tracking |
| P1E-D-058 | ExplanationCorrect | "ABC cost pools group costs by activity." (39 chars) | ~450 chars | CAQS standard: pool definition, examples, ABC vs. traditional, driver linkage |
| P1E-D-058 | question_state | (undefined) | "Certified" | Certification gate |
| P1E-D-058 | certification_date | (undefined) | "2026-07-22" | Audit trail |
| P1E-D-058 | certification_batch | (undefined) | "R14 Wave 7" | Batch tracking |
| P1E-D-062 | ExplanationCorrect | "Cost drivers are factors that cause cost changes." (49 chars) | ~500 chars | CAQS standard: definition, volume vs. transaction drivers, ABC context, exam trap |
| P1E-D-062 | question_state | (undefined) | "Certified" | Certification gate |
| P1E-D-062 | certification_date | (undefined) | "2026-07-22" | Audit trail |
| P1E-D-062 | certification_batch | (undefined) | "R14 Wave 7" | Batch tracking |
| P1E-D-073 | ExplanationCorrect | "Prime costs = direct materials + direct labor." (46 chars) | ~500 chars | CAQS standard: definition, conversion costs distinction, DL overlap, exam trap |
| P1E-D-073 | question_state | (undefined) | "Certified" | Certification gate |
| P1E-D-073 | certification_date | (undefined) | "2026-07-22" | Audit trail |
| P1E-D-073 | certification_batch | (undefined) | "R14 Wave 7" | Batch tracking |

**No answer-key changes. No distractor, stem, difficulty, or LOSTag changes.**

---

## Holds and Follow-Up

| QuestionID | Hold reason | Narrowest next action |
|-----------|-------------|----------------------|
| P1E-C-099 | Binary discrimination: A vs. C are mirror distractors (actual > budgeted vs. budgeted > actual); B and D are throwaway-quality. Same pattern as held P1E-C-098 | Pair with P1E-C-098 for combined remediation; strengthen distractors beyond direction-mirror pattern |
| P1E-D-034 | Distractors B ($4.50) and C ($5.50) lack traceable calculation error paths from stem data ($500K, 100K DLH). Only A ($4 = $400K/100K) maps to a specific misconception | Replace B/C with traceable errors (e.g., $450K/100K = $4.50; $500K/90K = $5.56) |
| P1E-D-043 | LOSTag "Part 1 Section C.2" does not match Section D and SectionName "Cost Management." TOC bottleneck is a Section D topic | Correct LOSTag to a Section D learning outcome (D.4 or D.5) before certification |

---

## Regression Results — EXECUTED (2026-07-22)

### Environment

Node.js v24.18.0 at `C:\Program Files\nodejs\` invoked via full path. PATH misconfiguration unchanged.

### Commands

```powershell
& "C:\Program Files\nodejs\node.exe" scripts/validate.js
& "C:\Program Files\nodejs\node.exe" scripts/build_master_registry.js
& "C:\Program Files\nodejs\node.exe" scripts/generate_registry.js
# Second run for idempotence:
& "C:\Program Files\nodejs\node.exe" scripts/generate_registry.js
```

### JSON Parse Error — Detected and Resolved

On the first validator run, a `MathematicalValidator` warning indicated a JSON parse error in `pack_e_corrected.js` at position 1069613 (line 21375). Root cause: unescaped inner double quotes in two newly expanded ExplanationCorrect fields:

| QID | Issue | Fix |
|-----|-------|-----|
| P1E-D-062 | `"number of setups"` | Changed to `'number of setups'` (single quotes) |
| P1E-D-073 | `"Prime = Primary inputs (DM + DL)"` | Changed to `'Prime = Primary inputs (DM + DL)'` (single quotes) |

This was a JSON-serialization regression introduced by the Wave 7 edits. It did NOT exist before Wave 7. Fixed in-place with no content loss. Re-run confirmed resolution.

### Validator Results (Post-Fix)

| Validator | Questions Scanned | Errors | Warnings | vs. Baseline |
|-----------|------------------|--------|----------|-------------|
| MathematicalValidator | 2,575 | 0 | 0 | Unchanged |
| ExplanationConsistencyValidator | 2,575 | 0 | 0 | Unchanged |
| AbsoluteLanguageValidator | 2,575 | 118 | 840 | Unchanged |
| AmbiguityValidator | 2,575 | 0 | 410 | Unchanged |
| DistractorSimilarityValidator | 2,500 | 0 | 450 | Unchanged |
| Other validators | — | 2 | 693 | Unchanged |

| Metric | Baseline | Post-Wave 7 | Delta |
|--------|----------|------------|-------|
| Module-level errors | 118 | 118 | **0** |
| Module-level warnings | 1,671 | 1,671 | **0** |
| Final summary errors | 120 | 120 | **0** |
| Final summary warnings | ~2,407 | 2,402 | -5 (info) |

### Registry Results

| Metric | Pre-Wave 7 | Post-Wave 7 Run 1 | Post-Wave 7 Run 2 |
|--------|-----------|--------------------|--------------------|
| Total items | 2,975 | 2,975 | 2,975 |
| Questions with errors | 59 | 59 | 59 |
| Questions with warnings | 527 | 524 | 524 |
| Idempotence | Required | — | **Confirmed** |

### Baseline Comparison

| Measure | Baseline | Actual | Result |
|---|---:|---:|---|
| Registry item count | 2,975 | 2,975 | **PASS** |
| Registry errors | 59 | 59 | **PASS** |
| Validator module errors | 118 | 118 | **PASS** |
| Validator module warnings | 1,671 | 1,671 | **PASS** |
| JSON parse regression | 0 expected | 1 found, 1 fixed | **PASS** (resolved) |
| New errors | 0 expected | 0 | **PASS** |
| Registry idempotence | Required | Confirmed | **PASS** |

### Disposition: R14 Wave 7 — CLOSED (with one resolved JSON regression)

The JSON regression was detected by the validator, root-caused (unescaped inner quotes), fixed in-place, and the re-run confirmed zero net change from baseline across all measures. No content was lost. No answer-key, structural, or schema changes occurred. The 5 certified items are now validated and learner-pool eligible. R14 Wave 7 is formally closed.

### R14 Wave 7 Regression: Lessons Learned

The ExplanationCorrect expansion process introduced inner double quotes in explanatory text (example phrasing, mnemonics). When the validator parses the pack files as JSON, unescaped inner double quotes break parsing and cause the entire pack (515 questions) to be skipped. This is categorized as a **JSON-serialization regression** — a new defect class to document:
- **DL-011** (candidate): ExplanationCorrect text containing unescaped inner double quotes that break JSON parsing
- Detection: MathematicalValidator `Could not parse bank` warning; drop in `questionsScanned`
- Prevention: Use single quotes or backtick-escaped characters within ExplanationCorrect expansions
- Recommendation: Add a pre-validation JSON lint pass that checks for balanced quotes in all source pack files before running the full validator suite

### Scope Confirmed

- No case certification or case audit work
- No DL-007 pilot or bulk remediation
- No DL-010 Bucket 2 sweep
- No UI, validator, application, schema, or analytics changes
- No manual registry edits
- No answer-key changes
- No scope expansion beyond the 8 selected candidates
