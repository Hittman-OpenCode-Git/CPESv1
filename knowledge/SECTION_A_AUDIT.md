# Section A CAQS Audit — Gold Standard Progress

**Status:** ACTIVE — Sprint 6.1
**Build:** 2026.07.22.003
**Scope:** 375 Section A MCQs (Packs A–E) + 11 Section A Case Studies

## Process (7-Stage)

| Stage | Description | Status |
|-------|-------------|--------|
| 1 | **Validate** — Extract Section A findings from validators | ✅ Complete — 201 findings across 81 unique questions |
| 2 | **Review** — Manual CAQS scoring per question | ✅ Wave 1–2 Complete |
| 3 | **Classify** — Assign KEEP / REVISION / REWRITE | ✅ Wave 1–2 Complete |
| 4 | **Revise** — Edit flagged questions | ✅ Wave 2–3 Complete (10 edits across 10 questions) |
| 5 | **Re-validate** — Run validators, confirm zero new errors | ✅ Wave 2–3 — 0 regressions confirmed |
| 6 | **Update Registry** — Update TAXONOMY_REGISTRY | ✅ Wave 3 — Registry regenerated |
| 7 | **Certify** — Per-question certification with confidence flagging | ✅ P1-A-054, P1-A-074 certified HIGH confidence. |
| 8 | **Consolidate** — Archive redundant clones within cluster | ✅ P1-A-044, P1-A-064 archived. ASC 450 axis cluster complete (3 questions, 3 axes). |
| 9 | **Update Defect Library** — Document new defect types | ✅ Complete |
| 10 | **Close Out Sub-batch 2A** — Certify first 4 questions, document governance framework | ✅ Complete — P1-A-036/046/056/066 Certified |
| 11 | **Batch 1 Retro-Certification** — Certify all 7 Batch 1 questions from original records | ✅ Complete — P1E-A-003/027/032/043/055, P1-A-022, P1B-A-143 Certified |

## Gold Standard Progress

| Category | Before B1 | After B1 | W1 | W2 | W3 | R14 W4 | R14 W5 |
|----------|----------|----------|-----|----|----|--------|--------|
| Gold Standard (Certified) | 0 | 11 | **19** | **27** | **35** | **43** | **51** |
| Exam-Ready (90–99) | 0 | 3 | **3** | **3** | **3** | **3** | **3** |
| Acceptable (70–89) | 3 | 10 | **10** | **10** | **10** | **15** | **15** |
| Needs Work (50–69) | 10 | 1 | **1** | **1** | **1** | **1** | **1** |
| Reject (<50) | 1 | 0 | **0** | **0** | **0** | **0** | **0** |
| Total Reviewed | — | 14 | 22 | 30 | 38 | 46 | 54 |
| Certified (question_state) | 0 | 13 | **21** | **29** | **35** | **43** | **51** |
| Pool note | | | | *054/074* | Pool: 35 | W4: +8 | W5: +8 |

**Mean CAQS:** 69.1 → **85.1** (+16.0)

## Sub-batch 2B Wave 3 — Revised and Certified

**Date:** 2026-07-22
**Candidates:** P1-A-033, 035, 037, 038, 039, 040, 041, 042
**Status:** All 8 revised, re-verified at HIGH confidence, question_state="Certified"
**Defects corrected:** 4×DL-008 mechanical (039/040/041/042), 1×DL-008+DL-010 editorial (035 — ExplanationWrongA num mismatch + D wrong slot filled), 3 clean (033/037/038)
**Cross-check:** DL-009 (Pack C — zero overlap), DL-010 Bucket 1/2, DL-007 systemic — all clear
**Certified pool:** 29 → 37

## Sub-batch 2B Wave 2 — Revised and Certified

**Date:** 2026-07-22
**Candidates:** P1-A-024, 026, 027, 028, 029, 030, 031, 032
**Status:** All 8 revised, re-verified at HIGH confidence, question_state="Certified"
**Defects corrected:** 4×DL-008 (026/027/028/030), 1×DL-008+DL-007 (024), 1×misassigned explanations (029 — WrongA/WrongB swapped)
**Certified pool:** 21 → 29

## Sub-batch 2B Wave 1 — Revised and Certified

**Date:** 2026-07-22
**Candidates:** P1-A-003, 004, 006, 007, 008, 010, 019, 023
**Status:** All 8 revised, re-verified at HIGH confidence, question_state="Certified"
**Defects corrected:** 4×DL-008, 6×DL-007, 2×DL-009
**Certified pool:** 13 → 21

## Sub-batch 2A Close-Out — Certification

**Date:** 2026-07-22
**Questions Certified:** P1-A-036, P1-A-046, P1-A-056, P1-A-066
**Batch 1 retro-certified:** P1E-A-003, P1E-A-027, P1E-A-032, P1E-A-043, P1E-A-055, P1-A-022, P1B-A-143
**Cluster:** `accounting_equation_axis_cluster`
**Governance framework established:** `QUESTION_METADATA_STANDARD.md` §9, `CAQS_v1.0.md` §1.7, `BUILD_TIME_VERIFICATION_STANDARD.md` §3.4/§4/§5
**Gold Standard examples documented:** `knowledge/GOLD_STANDARD_EXAMPLES.md`

## DL-008 Sweep — Section A Impact

**Scope:** 108 Bucket 1A items cleared across all Section A questions in packs A, C, D.
**Post-sweep ExplanationValidator errors:** 0 (zero regressions).
**Section A items swept:** 76 Section A questions (pack A: 67, pack C: 5, pack D: 4).
**Rollback log:** `reports/DL-008_SWEEP_ROLLBACK.md`.
**Validator warnings (total):** 2513 → **2485** (−28)

## Batch Tracker

| Batch | Questions | Scope | Status |
|-------|-----------|-------|--------|
| 1 | 14 | Highest validator-flag count | ✅ CLOSED |
| 2 (Sub-batch 2A) | 10 | P1-A (Wave 1/2/3: 036/046/056/066/054/074 + 4 KEEP) | ✅ CLOSED |
| 2 (Sub-batch 2B W1) | 8 | P1-A-003/004/006/007/008/010/019/023 | ✅ CERTIFIED |
| 2 (Sub-batch 2B W2) | 8 | P1-A-024/026/027/028/029/030/031/032 | ✅ CERTIFIED |
| 2 (Sub-batch 2B W3) | 8 | P1-A-033/035/037/038/039/040/041/042 | ✅ CERTIFIED |
| R14 Wave 4 | 8 | P1-C-013, P1-D-015/016, P1B-B-153, P1E-A-009/019, P1E-B-009, P1E-F-001 | ✅ CERTIFIED |
| R14 Wave 5 | 8 | P1E-A-031/054, P1E-B-045/065/068/074/079, P1E-C-013 | ✅ CERTIFIED |
| 3 | TBD | Pack B (P1B-A-076 to P1B-A-150) | Pending |
| 4 | TBD | Pack C (P1-AC-001 to P1-AC-075) | Pending |
| 5 | TBD | Pack D (P1-AD-001 to P1-AD-075) | Pending |
| 6 | TBD | Pack E (P1E-A-001 to P1E-A-078, but 050/053/072 never authored — 75 exist) | Pending |
| 7 | TBD | Section A case studies (11 cases) | Pending |

---

# Batch 1 — CAQS Review Results

**Scope:** 14 Section A questions with highest validator flag counts.
**Method:** Full CAQS rubric scoring + Gold Standard checklist.

---

## P1B-A-110 — Short-term lease exemption

**Difficulty:** Difficult | **Topic:** Lease accounting | **Pack:** B

**Validator findings:** 12 (all DistractorSimilarity/Ambiguity false positives — choices are numeric values with structurally similar pattern)

### CAQS Scores

| # | Dimension | Score | Weight | Weighted |
|---|-----------|-------|--------|----------|
| 1 | Blueprint Alignment | 8/10 | 20% | 16/20 |
| 2 | Cognitive Level | 7/10 | 15% | 10.5/15 |
| 3 | Technical Accuracy | 10/10 | 15% | 15/15 |
| 4 | Distractor Quality | 7/10 | 15% | 10.5/15 |
| 5 | Business Realism | 3/10 | 10% | 3/10 |
| 6 | Numerical Integrity | N/A | 10% | — |
| 7 | Explanation Quality | 7/10 | 10% | 7/10 |
| 8 | Writing Clarity | 8/10 | 5% | 4/5 |
| 9 | Accessibility | 8/10 | 5% | 4/5 |
| 10 | Metadata Completeness | 7/10 | 5% | 3.5/5 |

**Total:** 73.5 / 100 (Acceptable) **→** 73.5 (KEEP — no change needed)

**Classification:** KEEP

**Strengths:** Technically accurate under ASC 842. Distractors represent plausible misunderstanding of threshold.

**Weaknesses:** No business context — textbook-style question. Distractors are just numbers, no narrative. ExplanationCorrect could include more context about purchase option exception. Missing distractor explanations for contextual depth (they're correct but brief).

**Gold Standard Checklist:** 13/20 ❌ (fails: blueprint specificity, distractor discrimination narrative, business realism, explanation as mini-lesson, exam trap identification, metadata cross-references)

---

## P1B-A-112 — Deferred tax liability

**Difficulty:** Moderate | **Topic:** Income taxes | **Pack:** B

**Validator findings:** 12 (all false positives — journal entry choice pattern)

### CAQS Scores

| # | Dimension | Score | Weight | Weighted |
|---|-----------|-------|--------|----------|
| 1 | Blueprint Alignment | 8/10 | 20% | 16/20 |
| 2 | Cognitive Level | 8/10 | 15% | 12/15 |
| 3 | Technical Accuracy | 10/10 | 15% | 15/15 |
| 4 | Distractor Quality | 8/10 | 15% | 12/15 |
| 5 | Business Realism | 5/10 | 10% | 5/10 |
| 6 | Numerical Integrity | 10/10 | 10% | 10/10 |
| 7 | Explanation Quality | 8/10 | 10% | 8/10 |
| 8 | Writing Clarity | 8/10 | 5% | 4/5 |
| 9 | Accessibility | 8/10 | 5% | 4/5 |
| 10 | Metadata Completeness | 7/10 | 5% | 3.5/5 |

**Total:** 89.5 / 100 (Acceptable)

**Classification:** KEEP

**Strengths:** Strong calculation item. Distractors target specific reversals (DTA vs DTL, debit vs credit). Explanation thoroughly addresses each error.

**Weaknesses:** Sparse business context (Thornwood mentioned but no real scenario). Calculation could show the step more clearly.

**Gold Standard Checklist:** 15/20 ❌

---

## P1E-A-003 — Accounting equation

**Difficulty:** Difficult | **Topic:** Accounting equation | **Pack:** E

**Validator findings:** 12 (all false positives — equation rearrangement pattern)

### CAQS Scores

| # | Dimension | Score | Weight | Weighted |
|---|-----------|-------|--------|----------|
| 1 | Blueprint Alignment | 4/10 | 20% | 8/20 |
| 2 | Cognitive Level | 3/10 | 15% | 4.5/15 |
| 3 | Technical Accuracy | 10/10 | 15% | 15/15 |
| 4 | Distractor Quality | 4/10 | 15% | 6/15 |
| 5 | Business Realism | 1/10 | 10% | 1/10 |
| 6 | Numerical Integrity | N/A | 10% | — |
| 7 | Explanation Quality | 2/10 | 10% | 2/10 |
| 8 | Writing Clarity | 8/10 | 5% | 4/5 |
| 9 | Accessibility | 8/10 | 5% | 4/5 |
| 10 | Metadata Completeness | 5/10 | 5% | 2.5/5 |

**Total:** 47 / 100 (Reject)

**Classification:** REWRITE — requires full rewrite with business context and higher cognitive level

**Issues:**
- **Too easy** — This is a Remember-level question (basic accounting equation) inappropriate for the CMA exam's Apply/Analyze focus
- **ExplanationCorrect is 1 sentence** — fails to teach. No formula, no reasoning, no context
- **WrongExplanationA is empty** — missing distractor explanation for the correct-choice slot
- **No business scenario** — just "The accounting equation is:" with 4 rearrangements
- **Difficulty mislabeled** — tagged as "Difficult" but tests knowledge expected of first-week accounting students
- **LOSTag is vague** — "Part 1 Section A.1" instead of specific LOS

**Recommendation:** Either significantly increase complexity with a business scenario (e.g., "After recording transactions for January, a new staff accountant is confused about which accounts should balance. Which best describes the fundamental relationship?") or retire.

---

## P1B-A-105 — Dividends and interest classification

**Difficulty:** Difficult | **Topic:** Cash flow statement | **Pack:** B

**Validator findings:** 11 (mostly false positives — classification choice pattern)

### CAQS Scores

| # | Dimension | Score | Weight | Weighted |
|---|-----------|-------|--------|----------|
| 1 | Blueprint Alignment | 8/10 | 20% | 16/20 |
| 2 | Cognitive Level | 7/10 | 15% | 10.5/15 |
| 3 | Technical Accuracy | 10/10 | 15% | 15/15 |
| 4 | Distractor Quality | 8/10 | 15% | 12/15 |
| 5 | Business Realism | 4/10 | 10% | 4/10 |
| 6 | Numerical Integrity | N/A | 10% | — |
| 7 | Explanation Quality | 8/10 | 10% | 8/10 |
| 8 | Writing Clarity | 8/10 | 5% | 4/5 |
| 9 | Accessibility | 8/10 | 5% | 4/5 |
| 10 | Metadata Completeness | 7/10 | 5% | 3.5/5 |

**Total:** 77 / 100 (Acceptable)

**Classification:** KEEP

**Strengths:** Solid technical content. Distractors test real confusion points (IFRS vs GAAP differences). Explanations address the underlying concept.

**Weaknesses:** No business narrative — just asks classification directly. Could use a brief scenario.

---

## P1B-A-128 — Intercompany eliminations

**Difficulty:** Difficult | **Topic:** Consolidations | **Pack:** B

**Validator findings:** 9 (mostly false positives — journal entry pattern)

### CAQS Scores

| # | Dimension | Score | Weight | Weighted |
|---|-----------|-------|--------|----------|
| 1 | Blueprint Alignment | 8/10 | 20% | 16/20 |
| 2 | Cognitive Level | 8/10 | 15% | 12/15 |
| 3 | Technical Accuracy | 10/10 | 15% | 15/15 |
| 4 | Distractor Quality | 9/10 | 15% | 13.5/15 |
| 5 | Business Realism | 6/10 | 10% | 6/10 |
| 6 | Numerical Integrity | 10/10 | 10% | 10/10 |
| 7 | Explanation Quality | 8/10 | 10% | 8/10 |
| 8 | Writing Clarity | 8/10 | 5% | 4/5 |
| 9 | Accessibility | 8/10 | 5% | 4/5 |
| 10 | Metadata Completeness | 7/10 | 5% | 3.5/5 |

**Total:** 92 / 100 (Exam-Ready)

**Classification:** KEEP

**Strengths:** Strong question. Good scenario with specific numbers. Distractors target real student errors. Explanations thorough.

**Weaknesses:** Minor — could include the numeric step ($300,000 - $200,000 = $100,000 unrealized profit) more explicitly in the correct explanation. Business context minimal.

---

## P1E-A-043 — Effective interest expense

**Difficulty:** Moderate | **Topic:** Bonds | **Pack:** E

**Validator findings:** 8 (moderate word overlap — formula pattern)

### CAQS Scores

| # | Dimension | Score | Weight | Weighted |
|---|-----------|-------|--------|----------|
| 1 | Blueprint Alignment | 6/10 | 20% | 12/20 |
| 2 | Cognitive Level | 5/10 | 15% | 7.5/15 |
| 3 | Technical Accuracy | 10/10 | 15% | 15/15 |
| 4 | Distractor Quality | 7/10 | 15% | 10.5/15 |
| 5 | Business Realism | 2/10 | 10% | 2/10 |
| 6 | Numerical Integrity | N/A | 10% | — |
| 7 | Explanation Quality | 5/10 | 10% | 5/10 |
| 8 | Writing Clarity | 8/10 | 5% | 4/5 |
| 9 | Accessibility | 8/10 | 5% | 4/5 |
| 10 | Metadata Completeness | 5/10 | 5% | 2.5/5 |

**Total:** 62.5 / 100 (Needs Work)

**Classification:** REVISION

**Issues:**
- **LOSTag is vague** — "Part 1 Section A.3" instead of specific LOS
- **No business scenario** — just a formula recall question
- **ExplanationCorrect is 1 sentence** — no demonstration of the formula
- **Distractor explanations are minimal** — don't explain the reasoning fully
- **Difficulty may be misclassified** — this is more of a Remember/Understand level than Moderate
- **WrongExplanationD says "cash interest payment, not the interest expense"** but doesn't connect to the broader concept of premium/discount amortization

**Recommendation:** Add a bond scenario with numbers (e.g., bond issued at discount, compute interest expense for first period) and rewrite explanations to show calculations.

---

## P1B-A-101 — Financing activities classification

**Difficulty:** Difficult | **Topic:** Cash flow statement | **Pack:** B

**Validator findings:** 6 (moderate overlap — classification pattern)

### CAQS Scores

| # | Dimension | Score | Weight | Weighted |
|---|-----------|-------|--------|----------|
| 1 | Blueprint Alignment | 8/10 | 20% | 16/20 |
| 2 | Cognitive Level | 7/10 | 15% | 10.5/15 |
| 3 | Technical Accuracy | 10/10 | 15% | 15/15 |
| 4 | Distractor Quality | 8/10 | 15% | 12/15 |
| 5 | Business Realism | 6/10 | 10% | 6/10 |
| 6 | Numerical Integrity | N/A | 10% | — |
| 7 | Explanation Quality | 7/10 | 10% | 7/10 |
| 8 | Writing Clarity | 8/10 | 5% | 4/5 |
| 9 | Accessibility | 8/10 | 5% | 4/5 |
| 10 | Metadata Completeness | 7/10 | 5% | 3.5/5 |

**Total:** 78 / 100 (Acceptable)

**Classification:** KEEP

---

## P1B-A-114 — Valuation allowance

**Difficulty:** Difficult | **Topic:** Income taxes | **Pack:** B

**Validator findings:** 6 (moderate overlap — journal entry pattern)

### CAQS Scores

| # | Dimension | Score | Weight | Weighted |
|---|-----------|-------|--------|----------|
| 1 | Blueprint Alignment | 8/10 | 20% | 16/20 |
| 2 | Cognitive Level | 8/10 | 15% | 12/15 |
| 3 | Technical Accuracy | 10/10 | 15% | 15/15 |
| 4 | Distractor Quality | 8/10 | 15% | 12/15 |
| 5 | Business Realism | 6/10 | 10% | 6/10 |
| 6 | Numerical Integrity | 10/10 | 10% | 10/10 |
| 7 | Explanation Quality | 8/10 | 10% | 8/10 |
| 8 | Writing Clarity | 8/10 | 5% | 4/5 |
| 9 | Accessibility | 8/10 | 5% | 4/5 |
| 10 | Metadata Completeness | 7/10 | 5% | 3.5/5 |

**Total:** 90.5 / 100 (Exam-Ready)

**Classification:** KEEP

---

## P1B-A-143 — Treasury stock impact

**Difficulty:** Difficult | **Topic:** Financial statements | **Pack:** B

**Validator findings:** 6 (moderate overlap — directional impact pattern)

### CAQS Scores

| # | Dimension | Score | Weight | Weighted |
|---|-----------|-------|--------|----------|
| 1 | Blueprint Alignment | 8/10 | 20% | 16/20 |
| 2 | Cognitive Level | 6/10 | 15% | 9/15 |
| 3 | Technical Accuracy | 10/10 | 15% | 15/15 |
| 4 | Distractor Quality | 7/10 | 15% | 10.5/15 |
| 5 | Business Realism | 3/10 | 10% | 3/10 |
| 6 | Numerical Integrity | N/A | 10% | — |
| 7 | Explanation Quality | 6/10 | 10% | 6/10 |
| 8 | Writing Clarity | 8/10 | 5% | 4/5 |
| 9 | Accessibility | 8/10 | 5% | 4/5 |
| 10 | Metadata Completeness | 7/10 | 5% | 3.5/5 |

**Total:** 71 / 100 (Acceptable)

**Classification:** KEEP

**Notes:** ExplanationWrongC and ExplanationWrongD don't match their respective distractors. ExplanationWrongC says "Treasury stock is not reported as a reduction of net income" but distractor C is "Increases retained earnings." These don't align — the explanation for C should explain why treasury stock doesn't increase retained earnings, not discuss net income. Minor fix needed.

---

## P1E-A-027 — Direct method cash received

**Difficulty:** Moderate | **Topic:** Cash flow | **Pack:** E

**Validator findings:** 5 (AbsoluteLanguage false positive + moderate overlap)

### CAQS Scores

| # | Dimension | Score | Weight | Weighted |
|---|-----------|-------|--------|----------|
| 1 | Blueprint Alignment | 6/10 | 20% | 12/20 |
| 2 | Cognitive Level | 5/10 | 15% | 7.5/15 |
| 3 | Technical Accuracy | 10/10 | 15% | 15/15 |
| 4 | Distractor Quality | 7/10 | 15% | 10.5/15 |
| 5 | Business Realism | 2/10 | 10% | 2/10 |
| 6 | Numerical Integrity | N/A | 10% | — |
| 7 | Explanation Quality | 5/10 | 10% | 5/10 |
| 8 | Writing Clarity | 8/10 | 5% | 4/5 |
| 9 | Accessibility | 8/10 | 5% | 4/5 |
| 10 | Metadata Completeness | 5/10 | 5% | 2.5/5 |

**Total:** 63.5 / 100 (Needs Work)

**Classification:** REVISION

**Issues:**
- **LOSTag is vague** — "Part 1 Section A.1" instead of specific LOS
- **No business scenario** — textbook formula recall question
- **ExplanationCorrect is 1 sentence** — doesn't show the calculation or connect to the accounting cycle
- **Distractor explanations are minimal**

---

## P1E-A-032 — Full disclosure

**Difficulty:** Easy | **Topic:** Accounting principles | **Pack:** E

**Validator findings:** 4 (AbsoluteLanguage — "only" in distractors is intentional and appropriate)

### CAQS Scores

| # | Dimension | Score | Weight | Weighted |
|---|-----------|-------|--------|----------|
| 1 | Blueprint Alignment | 5/10 | 20% | 10/20 |
| 2 | Cognitive Level | 4/10 | 15% | 6/15 |
| 3 | Technical Accuracy | 10/10 | 15% | 15/15 |
| 4 | Distractor Quality | 7/10 | 15% | 10.5/15 |
| 5 | Business Realism | 1/10 | 10% | 1/10 |
| 6 | Numerical Integrity | N/A | 10% | — |
| 7 | Explanation Quality | 5/10 | 10% | 5/10 |
| 8 | Writing Clarity | 8/10 | 5% | 4/5 |
| 9 | Accessibility | 8/10 | 5% | 4/5 |
| 10 | Metadata Completeness | 5/10 | 5% | 2.5/5 |

**Total:** 58 / 100 (Needs Work)

**Classification:** REVISION

**Issues:**
- **Difficulty mislabeled as "Easy"** — See note on P1E-A-003. "Easy" items should be rare (target 15%)
- **LOSTag vague** — "Part 1 Section A.1"
- **No business scenario** — textbook-style
- **ExplanationCorrect is 1 sentence** — doesn't explore materiality concept or cite specific standards
- **The "only" usage in distractors is actually good** — it's the point of the question (full disclosure goes beyond "only" categories)

---

## P1E-A-055 — Temporary differences

**Difficulty:** Moderate | **Topic:** Income taxes | **Pack:** E

**Validator findings:** 4 (AbsoluteLanguage "only" in distractors is intentional)

### CAQS Scores

| # | Dimension | Score | Weight | Weighted |
|---|-----------|-------|--------|----------|
| 1 | Blueprint Alignment | 7/10 | 20% | 14/20 |
| 2 | Cognitive Level | 5/10 | 15% | 7.5/15 |
| 3 | Technical Accuracy | 10/10 | 15% | 15/15 |
| 4 | Distractor Quality | 7/10 | 15% | 10.5/15 |
| 5 | Business Realism | 2/10 | 10% | 2/10 |
| 6 | Numerical Integrity | N/A | 10% | — |
| 7 | Explanation Quality | 6/10 | 10% | 6/10 |
| 8 | Writing Clarity | 8/10 | 5% | 4/5 |
| 9 | Accessibility | 8/10 | 5% | 4/5 |
| 10 | Metadata Completeness | 5/10 | 5% | 2.5/5 |

**Total:** 66.5 / 100 (Needs Work)

**Classification:** REVISION

**Issues:**
- **LOSTag is wrong** — says "Part 1 Section A.4" but should be A.5 (Income taxes)
- **WrongExplanationC is empty** — missing explanation for the correct-choice slot
- **ExplanationCorrect is 1 sentence** — doesn't explain temporary vs permanent distinction fully
- **No business scenario**

---

## P1-A-022 — GAAP IFRS development costs

**Difficulty:** Moderate | **Topic:** Recognition and measurement | **Pack:** A

**Validator findings:** 4 (AbsoluteLanguage "always" + vague qualifier "generally/may")

### CAQS Scores

| # | Dimension | Score | Weight | Weighted |
|---|-----------|-------|--------|----------|
| 1 | Blueprint Alignment | 8/10 | 20% | 16/20 |
| 2 | Cognitive Level | 7/10 | 15% | 10.5/15 |
| 3 | Technical Accuracy | 9/10 | 15% | 13.5/15 |
| 4 | Distractor Quality | 6/10 | 15% | 9/15 |
| 5 | Business Realism | 7/10 | 10% | 7/10 |
| 6 | Numerical Integrity | N/A | 10% | — |
| 7 | Explanation Quality | 2/10 | 10% | 2/10 |
| 8 | Writing Clarity | 7/10 | 5% | 3.5/5 |
| 9 | Accessibility | 8/10 | 5% | 4/5 |
| 10 | Metadata Completeness | 7/10 | 5% | 3.5/5 |

**Total:** 69 / 100 (Needs Work)

**Classification:** REVISION — primary defect is distractor explanations

**Issues:**
- **Distractor explanations are IDENTICAL for A, C, and D** — all say "Option X represents a plausible misconception... the correct analysis leads to the conclusion that recognize that ifrs may permit capitalization..." They don't explain why each specific choice is wrong. This is the most critical finding in Batch 1.
- **ExplanationCorrect is too short** — just says "A common GAAP/IFRS difference is the treatment of internally generated intangibles and development costs" without explaining choice B or contrasting with the wrong options.
- **Absolute language in C and D** — "always" is used as a distractor trap (point of the question is that treatment is NOT always the same), which is defensible, but C says "U.S. GAAP always capitalizes research costs" which is wrong on two levels (GAAP expenses research, not capitalizes it).

**Recommendation:** This is the highest-priority fix in Batch 1. Rewrite all three distractor explanations to be choice-specific, and expand the correct explanation.

---

## P1B-A-107 — Operating lease commencement

**Difficulty:** Moderate | **Topic:** Lease accounting | **Pack:** B

**Validator findings:** 4 (moderate overlap — journal entry pattern)

### CAQS Scores

| # | Dimension | Score | Weight | Weighted |
|---|-----------|-------|--------|----------|
| 1 | Blueprint Alignment | 8/10 | 20% | 16/20 |
| 2 | Cognitive Level | 8/10 | 15% | 12/15 |
| 3 | Technical Accuracy | 10/10 | 15% | 15/15 |
| 4 | Distractor Quality | 8/10 | 15% | 12/15 |
| 5 | Business Realism | 7/10 | 10% | 7/10 |
| 6 | Numerical Integrity | 10/10 | 10% | 10/10 |
| 7 | Explanation Quality | 8/10 | 10% | 8/10 |
| 8 | Writing Clarity | 8/10 | 5% | 4/5 |
| 9 | Accessibility | 8/10 | 5% | 4/5 |
| 10 | Metadata Completeness | 7/10 | 5% | 3.5/5 |

**Total:** 91.5 / 100 (Exam-Ready)

**Classification:** KEEP

---

# Batch 1 Summary

| QuestionID | Classification | Score | Key Issue |
|-----------|---------------|-------|-----------|
| P1B-A-110 | KEEP | 73.5 | False positive flags; needs business context |
| P1B-A-112 | KEEP | 89.5 | Strong question; minor context improvement |
| **P1E-A-003** | **REWRITE** | **47** | Too easy; no business context; missing explanations |
| P1B-A-105 | KEEP | 77 | Solid; minor context improvement |
| P1B-A-128 | KEEP | 92 | Exam-ready |
| **P1E-A-043** | **REVISION** | **62.5** | Formula recall; needs scenario + explanations |
| P1B-A-101 | KEEP | 78 | Solid |
| P1B-A-114 | KEEP | 90.5 | Exam-ready |
| P1B-A-143 | KEEP | 71 | Minor explanation mismatch (WrongC/WrongD swappped) |
| **P1E-A-027** | **REVISION** | **63.5** | Formula recall; needs scenario + explanations |
| **P1E-A-032** | **REVISION** | **58** | Too easy; no context; explanations minimal |
| **P1E-A-055** | **REVISION** | **66.5** | WrongExplanationC empty; LOSTag incorrect; needs scenario |
| **P1-A-022** | **REVISION** | **69** | **CRITICAL**: identical distractor explanations |
| P1B-A-107 | KEEP | 91.5 | Exam-ready |

**KEEP:** 9 | **REVISION:** 5 (all resolved) | **REWRITE:** 1 (resolved)

| QuestionID | Before | After | Change |
|-----------|--------|-------|--------|
| P1E-A-003 | 47 | **94** | +47 |
| P1E-A-032 | 58 | **90** | +32 |
| P1E-A-043 | 62.5 | **92** | +29.5 |
| P1E-A-027 | 63.5 | **90** | +26.5 |
| P1E-A-055 | 66.5 | **82** | +15.5 |
| P1-A-022 | 69 | **82** | +13 |
| P1B-A-143 | 71 | **78** | +7 |
| Mean | 69.1 | **85.1** | +16.0 |

**Validator false positive notes:** Most DistractorSimilarity/Ambiguity flags on Section A are false positives caused by structural choice patterns inherent to accounting exam content. These validators need domain-specific thresholds. See `BATCH1_REPORT.md` for detailed analysis.

---

## Defect Discovered: DL-007 — Identical Distractor Explanations (P1-A-022)

**Severity:** Medium
**Pattern:** All distractor explanation fields (ExplanationWrongA, C, D) contain identical generic text only differing by the option letter. This is a copy-paste error.
**Correction:** Each distractor explanation must explain why THAT specific choice is wrong, not repeat a generic statement.

Template for new DL entries:
```markdown
## DL-NNN

```
Defect ID        DL-NNN
Category         Explanation Quality
Severity         Medium
Detected By      Manual CAQS Review (Batch 1)
Status           Open
```

**Question IDs:** P1-A-022

**Issue:** <description>

**Correction:** <specific changes>

**Resolved:** <date>
```
