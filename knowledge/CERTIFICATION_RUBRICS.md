# CMA Part 1 Exam Simulator — Certification Rubrics

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md
**Dependencies:** CAQS_v1.0.md, DEFECT_LIBRARY.md, TAXONOMY_REGISTRY.md, QUESTION_METADATA_STANDARD.md
**Applies to:** All MCQ banks (`pack_*_corrected.js`) and case studies (`scored_cases*.js`)
**Design Session:** Session 64 — Rubric Definition Agent
**Date:** 2026-07-24

---

## Purpose

This document defines the two certification rubrics used to gate every MCQ and case-study item in the CMA Part 1 Exam Simulator. Each rubric operates independently per item and produces one of three certification decisions. The rubrics supersede ad-hoc review approaches used in prior audit sessions and serve as the standard evaluation protocol for all certification workstreams going forward.

These rubrics implement the CAQS v1.0 six-dimension build-time verification standard (§1.6) and the Gold Standard Checklist (§14) as operational scoring instruments. They also incorporate defect-exclusion gates mapped to the DEFECT_LIBRARY.md catalog, ensuring that known defect classes discovered across 33+ prior sessions are systematically excluded from the learner delivery pool.

**Guiding principle:** Correctness over throughput. No item may enter the learner pool without passing all dimensions at or above the certification threshold. The HIGH-confidence gate is non-negotiable (CAQS §1.7.3).

---

## Professional Standards Alignment

These rubrics are informed by the *Standards for Educational and Psychological Testing* (AERA / APA / NCME, 2014 Edition), particularly:

| Standard Area | Applied In | Principle |
|---------------|-----------|-----------|
| **Validity** (Part I, Ch. 1) | D1 Content Accuracy; D2 Blueprint Alignment | Evidence that the item measures the intended construct. Content-related validity evidence through expert judgment |
| **Reliability / Precision** (Part I, Ch. 2) | D3 Clarity; D4 Distractor Quality | Items must produce consistent scores; ambiguous stems or overlapping distractors degrade precision |
| **Fairness in Testing** (Part I, Ch. 3) | D3 Clarity (no biased language, no cultural assumptions) | All candidate populations must have equal opportunity to demonstrate competence |
| **Test Design and Development** (Part II, Ch. 4) | D2 Blueprint Alignment; all dimensions | Items must be designed to a specification that aligns with the test purpose |
| **Scores, Scales, Norms** (Part II, Ch. 5) | D6 Governance (difficulty calibration, metadata) | Score meaning depends on properly calibrated item difficulty and metadata traceability |

Key item-writing best practices from the professional literature, incorporated into dimension descriptors:

1. **Single, clear question** — Each stem must present one well-defined problem (avoids "double-barreled" stems)
2. **Plausible distractors** — Every wrong option must be attractive to a candidate who holds a specific misconception
3. **Grammatical parallelism** — All options should use parallel grammatical structure and consistent length
4. **No cueing** — No grammatical, length-based, absolute-language, or positional cues that reveal the correct answer
5. **Independent items** — Items must not provide clues to other items
6. **Positive framing preferred** — Negative stems (NOT, EXCEPT, LEAST) should be used sparingly and with clear emphasis

---

# Rubric 1 — MCQ Certification Rubric

## 1.1 Purpose

Evaluate every standalone multiple-choice question (MCQ) in `pack_*_corrected.js` files across six dimensions to determine certification eligibility. Items reaching "Certified" status enter the learner delivery pool.

## 1.2 Dimension Definitions

### D1: Content Accuracy (Weight: Critical — Must be ≥ 5)

**Domain:** Accounting correctness, numerical integrity, standard currency.

The keyed answer (CorrectChoice) is correct under U.S. GAAP / IFRS / COSO / IMA Standards as of the 2026 CMA Part 1 Content Specification Outline. All calculations produce the stated result. The answer key, stem facts, and explanation are internally consistent.

| Score | Descriptor | Criteria |
|:-----:|------------|----------|
| **5** | **Authoritative** | Answer independently verified. Calculation traced to exhibit data. Governing standard cited correctly (e.g., ASC 210, ASC 606, COSO Principle 12). No arithmetic, rounding, or conceptual error. Tolerance within CAQS §5.3. |
| **4** | **Accurate** | Answer is correct. Standard cited but incomplete or imprecise (e.g., "ASC 210" when "ASC 210-10-45" is more precise). Calculation correct but tolerance near boundary. Minor imprecision in terminology. |
| **3** | **Vague but Correct** | Answer is correct but the reasoning requires inference. No standard cited. Explanation lacks specificity. Calculations not shown. Acceptable for straightforward conceptual items without calculations. |
| **2** | **Questionable** | Answer may be correct but fact pattern is ambiguous — a reasonable candidate could defend a different answer. Missing critical assumption. Borderline scope (tests Part 2 material). |
| **1** | **Incorrect** | **DL-030 present.** Answer key is wrong. Calculation error. Wrong standard cited that reverses the decision. Outdated rule applied. **Auto-fail: D1 = 1 → item rejected regardless of other scores.** |

**Defect-class gates:**
- **DL-030 (CorrectChoice answer-key error):** Severity CRITICAL. D1 capped at 1. Auto-fail the item.
- **DL-001 (semantic accuracy defect):** Severity CRITICAL. D1 capped at 1. Answer/explanation mismatch.
- **Incorrect formula application:** D1 capped at 1. Calculation uses wrong formula.
- **Outdated standard:** D1 capped at 2. e.g., pre-2016 revenue recognition rules for an ASC 606 question.
- **Part 2 scope creep:** D1 capped at 3. Item tests exclusively Part 2 material (e.g., capital budgeting NPV, corporate finance WACC).

**Minimum acceptable:** 5 (for certification).

---

### D2: Blueprint Alignment (Weight: High)

**Domain:** IMA CMA Part 1 Content Specification Outline traceability.

The item maps to a specific Section (A–F), Topic, and Learning Outcome Statement. It tests ONE primary concept and is in-scope for Part 1. No double-barreled stems (two unrelated concepts in one question). No Part 2 contamination.

| Score | Descriptor | Criteria |
|:-----:|------------|----------|
| **5** | **Precise LOS mapping** | LOSTag present and correct. Topic matches content. Cognitive level aligned with LOS verb depth. Subtopic identified. UniqueConceptKey non-empty. |
| **4** | **Specific topic mapping** | Section and Topic correct. LOSTag present. Cognitive level appropriate. Subtopic or UniqueConceptKey may be missing. |
| **3** | **Generic topic match** | Section is correct. Topic is broadly correct but could map to multiple LOS within the section. No LOSTag. Difficulty label present but may not match content demands. |
| **2** | **Vague or misaligned** | Section assigned but topic does not clearly match content. Wrong Section for the tested concept. Item tests two unrelated concepts (double-barreled). |
| **1** | **No alignment** | No Section or Topic assigned. Tests entirely out-of-scope material. Cannot determine what blueprint area is being assessed. |

**Defect-class gates:**
- **Part 2 topic only:** D2 capped at 2. Item exclusively tests Part 2 material.
- **Double-barreled stem:** D2 capped at 2. Stem asks two unrelated questions ("Which of the following is correct AND why?").
- **No LOSTag in Certified item:** D2 capped at 3. All Certified items must have a LOSTag.

**Minimum acceptable:** 4 (for certification).

---

### D3: Clarity and Readability (Weight: Medium)

**Domain:** Writing quality, grammatical correctness, accessibility, professional tone.

The stem presents ONE clear problem. Options are grammatically parallel and approximately equal in length. No unnecessary negatives (NOT, EXCEPT, LEAST) unless justified by the concept being tested. No biased or culturally specific language. Professional business tone per CAQS §3.8 (Anti-AI Writing Standards).

| Score | Descriptor | Criteria |
|:-----:|------------|----------|
| **5** | **Exam-authentic** | Clear, concise, professional tone. Stem is a single well-defined problem. Options are parallel in structure and length (±15% char length). Business context feels authentic. No grammatical errors. No accessibility barriers. |
| **4** | **Clear and professional** | Stem is clear and grammatical. Options mostly parallel. One option may be noticeably longer/shorter than others. Minor passive voice. Professional tone maintained. |
| **3** | **Adequate** | Stem is understandable but verbose or stilted. Some options not parallel. One option significantly longer (length-cueing risk). No grammatical errors that change meaning. |
| **2** | **Problematic** | Stem is ambiguous — could be interpreted multiple ways. Multiple options non-parallel. Unnecessary negative phrasing without emphasis (NOT/EXCEPT buried in stem). Length-cueing present (correct answer systematically shorter/longer). Grammatical errors affect comprehension. |
| **1** | **Unacceptable** | Stem is unreadable or nonsensical. Grammatical errors make the question unanswerable. Culturally biased language that disadvantages specific candidate populations. |

**Defect-class gates:**
- **DL-003 (absolute language):** "always"/"never" in distractor where not justified by standard → D3 capped at 3.
- **DL-004 (vague qualifiers):** "usually"/"generally"/"typically" reducing item discrimination → D3 capped at 3.
- **Systematic length-cueing:** Correct answer ≥ 2× or ≤ 0.5× average distractor length → D3 capped at 2.
- **Cultural bias or non-inclusive language:** D3 capped at 1. Item cannot be certified.

**Minimum acceptable:** 4 (for certification).

---

### D4: Distractor Quality (Weight: High)

**Domain:** Plausibility, distinctness, educational value of wrong-answer choices.

Every distractor (non-correct option) must be plausible to a candidate who holds a specific misconception or makes a specific calculation error. Distractors must be distinct from each other — no near-duplicates. No "giveaway" distractors that are obviously wrong. Each distractor should map to a documented CMA exam trap or known student error.

Standards alignment (AERA/APA/NCME §4.7): "Test developers should design items to minimize the likelihood that examinees can select the correct answer using test-wiseness strategies rather than content knowledge."

| Score | Descriptor | Criteria |
|:-----:|------------|----------|
| **5** | **Discriminating** | Every distractor targets a distinct, realistic error or misconception. Distractors discriminate between levels of understanding. No giveaway clues. Can't eliminate all distractors by test-taking tricks alone. |
| **4** | **Plausible and distinct** | All distractors are plausible. Each targets a different error. No duplicate distractors. One distractor may be slightly weaker (recognizable as wrong by mid-level candidates). |
| **3** | **Uneven** | 2 strong distractors but 1 weak or obviously wrong (e.g., absurd number, nonsensical concept). Moderate candidate can eliminate 1 by inspection. |
| **2** | **Weak** | Only 1 plausible distractor. Others are obviously wrong or absurd. "All of the above" / "None of the above" used as filler. Distractors are near-identical (DL-005). |
| **1** | **Non-functional** | All distractors are obviously wrong. Correct answer selectable without content knowledge. Distractors are nonsensical. **DL-005 (duplicate distractors) with 100% similarity.** |

**Defect-class gates:**
- **DL-005 (duplicate distractors > 90% similarity):** D4 capped at 2.
- **DL-005 (100% identical distractors):** D4 capped at 1. Auto-fail.
- **DL-003 (absolute language in distractors where standard doesn't support it):** D4 capped at 3.
- **"All of the above" / "None of the above" without genuine plausibility:** D4 capped at 2.
- **Systematic position bias:** Correct answer at same position > 4 items in a row → flagged for pool-level review (does not cap individual D4).

**Minimum acceptable:** 4 (for certification).

---

### D5: Explanation Quality (Weight: Critical — Must be ≥ 5)

**Domain:** Educational feedback quality across all explanation slots.

ExplanationCorrect must identify the governing standard/concept, show solution steps, and provide business interpretation. Each ExplanationWrong[distractor] must be choice-specific — explaining why THAT specific choice is wrong and what misconception it represents. No template boilerplate. No missing or empty distractor explanations. ExplanationWrong[CorrectChoice] must be empty (EV8 / DL-008 compliance).

**This dimension gates learner-facing educational quality.** A weak D5 score means the candidate receives degraded or no instructive feedback during review.

| Score | Descriptor | Criteria |
|:-----:|------------|----------|
| **5** | **Complete mini-lesson** | ExplanationCorrect: names standard, shows formula with substitution, interprets business result, identifies exam trap. Each ExplanationWrong[non-CC]: identifies specific error in THAT choice, names the likely misconception, contrasts with correct approach. All fields ≥ 50 chars. Zero DL-008, DL-013, DL-021, DL-025, DL-026. |
| **4** | **Thorough** | ExplanationCorrect: names standard, shows solution, interprets result. Each ExplanationWrong[non-CC]: choice-specific, names the error. One distractor explanation may be shorter than 50 chars. Zero structural defects (DL-008, DL-021). |
| **3** | **Adequate** | ExplanationCorrect: correct but minimal — states answer without formula/proof. Distractor explanations exist but 1–2 are generic or too brief. No template boilerplate but limited instructional value. |
| **2** | **Defective** | DL-013 boilerplate present ("represents a plausible misconception..."). Or DL-025/026 present (empty non-CC ExplanationWrong slots). Or DL-010 present (misassigned explanation text). Or DL-008 present (non-empty EW[CC]) but non-Certified. |
| **1** | **Missing or harmful** | DL-021 present (distractor ExplanationWrong fields structurally absent). Or DL-008 present in a Certified item (learner-safety risk). Or ExplanationCorrect is empty/missing. Or all explanation fields are generic/repeated. |

**Defect-class gates:**
- **DL-021 (absent distractor ExplanationWrong fields):** D5 capped at 1. Auto-fail. No explanations exist.
- **DL-008 (non-empty EW[CC]) in Certified item:** D5 capped at 1. Learner-safety risk. Wrong text in correct-answer slot.
- **DL-008 (non-empty EW[CC]) in non-Certified item:** D5 capped at 2. Certification-blocking.
- **DL-013 (template boilerplate "represents a plausible misconception..."):** D5 capped at 2. Generic feedback.
- **DL-025/026 (empty non-CC ExplanationWrong slots):** D5 capped at 2. Learner sees no feedback for that distractor.
- **DL-010 (misassigned explanation — EW[X] describes choice Y):** D5 capped at 2. Educationally misleading.
- **DL-007 (all three distractor EW slots verbatim identical):** D5 capped at 2. Generic feedback.
- **ExplanationCorrect length < 50 chars (EV1):** D5 capped at 3.
- **No accounting principle named in EC (EV3):** D5 capped at 3.
- **Uncertain language in explanation (EV7):** "I think," "probably," "maybe" → D5 capped at 3.

**Minimum acceptable:** 5 (for certification).

---

### D6: Governance and Metadata (Weight: Medium)

**Domain:** Metadata completeness, field validity, and governance-state integrity.

All governance-critical fields must be present with valid values per TAXONOMY_REGISTRY.md. `question_state` must be a valid state. `Difficulty` must use a canonical label. `Section` must be a valid section letter. `certification_date` must be recorded for Certified items. No contradictory metadata states (e.g., `ProductionStatus: "Production"` but `question_state: "Unprocessed"`).

| Score | Descriptor | Criteria |
|:-----:|------------|----------|
| **5** | **Full + verified** | All required metadata fields present: QuestionID, Part, Section, SectionName, Topic, Difficulty, question_state, certification_date, LOSTag, UniqueConceptKey. All field values valid per TAXONOMY_REGISTRY.md. Difficulty label in canonical set (Easy/Moderate-Easy/Moderate/Difficult/Very Difficult). No contradictory states. |
| **4** | **All required present** | All governance-critical fields present (QuestionID, Section, Topic, Difficulty, question_state). One non-critical metadata field missing. All values valid. Certification date present if Certified. |
| **3** | **Most present** | Governance-critical fields present but one has a non-canonical value (e.g., "Hold" instead of valid state). Difficulty label in use but may not be canonical. Section exists but SectionName missing. |
| **2** | **Defective** | Missing `question_state` field (item outside governance framework). Missing `Difficulty`. Topic field is empty or placeholder. Non-standard state value. |
| **1** | **Broken** | Missing `QuestionID`. Missing `Section`. Missing `CorrectChoice`. Item cannot be identified or routed. Multiple required fields absent. Contradictory metadata that would crash validation. |

**Defect-class gates:**
- **question_state missing:** D6 capped at 2. Item is outside governance framework — can't be certified.
- **Invalid state value (not in canonical set):** D6 capped at 2. e.g., "Hold" (non-standard).
- **ProductionStatus contradiction:** `ProductionStatus: "Production"` with `question_state: "Unprocessed"` → D6 capped at 2.
- **Difficulty label not in canonical set:** D6 capped at 3. Use Moderate-Easy (2) or Very Difficult (5) as appropriate.
- **DL-024 pattern (block of items missing question_state):** D6 capped at 1 for each affected item.
- **No certification_date on Certified item:** D6 capped at 3. Required for governance traceability.

**Minimum acceptable:** 4 (for certification).

---

## 1.3 Certification Decision Rules

| Decision | Condition | Meaning |
|----------|-----------|---------|
| **Certified** | All 6 dimensions ≥ 4 **AND** D1 ≥ 5 **AND** D5 ≥ 5 (total ≥ 24/30) | Item enters learner delivery pool. `question_state` → `"Certified"`. |
| **Needs Revision** | Any dimension scores 2–3 **OR** D1 scores 3–4 **OR** D5 scores 3–4 | Item has specific, fixable issues. Document findings. Enter `"Editorial Queue"`. Remediate and re-evaluate. |
| **Retire/Hold** | Any dimension scores 1 **OR** D1 scores 1–2 **OR** D5 scores 1–2 | Too flawed to fix in a single session. Set `question_state` → `"Archived"` or hold in `"Editorial Queue"` with documented defect. Requires rewrite, not revision. |

### Decision Matrix

| D1 | D5 | Other Dims | Decision |
|:--:|:--:|------------|----------|
| 5 | 5 | All ≥ 4 | **Certified** |
| 5 | 5 | Any = 3 | **Needs Revision** (fix that dimension) |
| 4 | 5 | All ≥ 4 | **Needs Revision** (strengthen D1) |
| 5 | 4 | All ≥ 4 | **Needs Revision** (strengthen D5) |
| 3–4 | 3–4 | Any | **Needs Revision** |
| 1–2 | Any | Any | **Retire/Hold** |
| Any | 1–2 | Any | **Retire/Hold** |
| Any | Any | Any = 1 | **Retire/Hold** |

---

## 1.4 Automated Defect-Check Gating Summary

These structural checks gate certification automatically. An item with any of these defects CANNOT be certified until remediated:

| Defect | Severity | Dimension Capped | Cap Score | Fix Required |
|--------|----------|:---:|:---:|------|
| **DL-030** (wrong CC) | Critical | D1 | 1 | Correct the answer key |
| **DL-021** (absent distractor EW) | High | D5 | 1 | Author 3 distractor explanations |
| **DL-008** (non-empty EW[CC], Certified) | High | D5 | 1 | Clear EW[CC] to `""` |
| **DL-008** (non-empty EW[CC], non-Certified) | Medium | D5 | 2 | Clear EW[CC] to `""` |
| **DL-013** (boilerplate "plausible misconception") | High | D5 | 2 | Rewrite to choice-specific |
| **DL-025/026** (empty non-CC EW) | High | D5 | 2 | Author choice-specific text |
| **DL-010** (misassigned EW) | High | D5 | 2 | Reassign to correct slot |
| **DL-007** (identical EW across slots) | Medium | D5 | 2 | Write unique per-slot text |
| **DL-005** (duplicate distractors > 90%) | Medium | D4 | 2 | Rewrite unique distractors |
| **DL-005** (100% identical distractors) | Medium | D4 | 1 | Rewrite all distractors |
| **DL-001** (semantic accuracy) | Critical | D1 | 1 | Fix answer/explanation mismatch |
| **No question_state** | High | D6 | 2 | Add `question_state` field |
| **Invalid state value** | Medium | D6 | 2 | Use canonical value |
| **DL-024** (block missing question_state) | Low | D6 | 1 | Add to all items in block |

---

## 1.5 Quick-Reference Scoring Card — MCQ

| Dim | Score 1 | Score 2 | Score 3 | Score 4 | Score 5 |
|:---:|---------|---------|---------|---------|---------|
| **D1** | Answer wrong (DL-030) | Ambiguous fact pattern | Correct but imprecise | Correct, minor imprecision | Independently verified |
| **D2** | No alignment | Vague/double-barreled | Generic section match | Specific topic + LOSTag | Precise LOS mapping |
| **D3** | Unreadable/biased | Ambiguous stem | Adequate, stilted | Clear + professional | Exam-authentic |
| **D4** | Non-functional (DL-005 100%) | Only 1 plausible | 2 strong + 1 weak | All plausible, distinct | Discriminating |
| **D5** | Missing (DL-021) or harmful | Boilerplate or empty slots | Adequate but minimal | Thorough, choice-specific | Complete mini-lesson |
| **D6** | Broken (no QID) | Missing question_state | One non-canonical value | All required present | Full + verified |

---

# Rubric 2 — Case-Study Certification Rubric

## 2.1 Purpose

Evaluate every case study in `scored_cases*.js` files (both enhanced CBQ-* and migrated CASE-* systems) across six dimensions to determine certification eligibility. Case studies entering "Certified" status contribute items to the learner delivery pool. Because case-study items constitute 25% of exam scoring weight (per app.js §4.2), certification quality directly impacts exam score validity.

## 2.2 Dimension Definitions

### D1: Calculation and Concept Accuracy (Weight: Critical — Must be ≥ 5)

**Domain:** All case items have correct answers. All calculations independently verified. All conceptual items correct per governing standards.

Every item within the case must have a `Correct` value that matches an independently derived answer. This includes numeric items (calculations), select items (correct choice selection), multi items (correct set), match items (correct pairing), and fill items (correct text). The aggregate case score depends on every item — a single wrong answer in a 5-item case represents a 20% scoring error.

Per Session 59 findings: "Calculation Accuracy: 5.0 / 5.0. All 11 spot-check calculations independently verified." Per Session 61 findings: "100% metadata completeness. Zero scoring incompatibilities." This dimension formalizes those audit results.

| Score | Descriptor | Criteria |
|:-----:|------------|----------|
| **5** | **All verified** | Every item independently recalculated/re-derived. All `Correct` values confirmed. Tolerances per CAQS §5.3. Zero errors. Calculation items include formula traceability to exhibit data. |
| **4** | **All correct, spot-checked** | All items independently spot-checked (≥ 50% of items). All sampled items correct. Remaining items reviewed for internal consistency with case data. No errors found. |
| **3** | **Presumed correct** | Prior audit confirmed calculations (Session 59/61). No independent re-derivation in current certification pass. No known defects. |
| **2** | **Unverified** | Items not independently verified in any session. Possible calculation errors exist. No documented verification trail. |
| **1** | **Known errors** | One or more items have confirmed wrong answers (DL-030 analog). Calculation error verified. Conceptual item has wrong stored answer. **Auto-fail: D1 = 1 → case rejected.** |

**Defect-class gates:**
- **Any item has wrong `Correct` value:** D1 capped at 1. Auto-fail for the entire case.
- **Exhibit data inconsistency:** Numbers in exhibits don't reconcile → D1 capped at 2. Must be fixed before certification.
- **Unverified calculations in critical item (Item 1–2):** D1 capped at 3. Foundational items carry the most weight.

**Minimum acceptable:** 5 (for certification).

---

### D2: Scenario Quality (Weight: High)

**Domain:** Business realism, professional authenticity, CMA 2026 alignment.

The scenario must satisfy the CAQS §3.1 requirements: named company, named stakeholder, business trigger, clear task, realistic context. The scenario must feel like a genuine management accounting situation, not a textbook abstraction. Per CAQS §3.7 (Realism Standards) and §3.8 (Anti-AI Writing Standards).

| Score | Descriptor | Criteria |
|:-----:|------------|----------|
| **5** | **Authentic business document** | Named company + stakeholder + business trigger + clear task. Scenario reads like a board presentation, controller memo, audit workpaper, or operations report. Company context is specific (industry, size, situation). Exhibits resemble real business documents. Passes CAQS §3.7 realism checklist. |
| **4** | **Realistic business scenario** | All CAQS §3.1 elements present. Named company and stakeholder. Scenario is plausible. Exhibits are professional. Some language feels slightly generic but overall convincing. |
| **3** | **Adequate** | Company named but scenario is generic ("Company X is considering..."). Stakeholder identified but not used in subsequent items. Exhibits are clean but lack professional formatting. |
| **2** | **Textbook-style** | Generic company (no name, or "Company XYZ"). No stakeholder. Scenario is a data dump without business trigger. Exhibits are plain tables without context. Reads like a textbook problem, not a business case. |
| **1** | **Non-functional scenario** | No scenario text. No company. Items are disconnected — don't reference shared scenario. Missing or broken exhibits. Scenario contains factual contradictions. |

**Defect-class gates:**
- **No named company:** D2 capped at 2. Per CAQS §3.1, this is required.
- **No stakeholder:** D2 capped at 2.
- **AI-template language present** ("The company manufactures products," "Which of the following is correct?"): D2 capped at 3.
- **Scenario contradicts exhibit data:** D2 capped at 2.
- **Decoractive data in exhibits** (rows/columns not consumed by any item): D2 capped at 3.

**Minimum acceptable:** 4 (for certification).

---

### D3: Rubric Clarity (Weight: Medium)

**Domain:** Scoring expectations are clear. Point allocations defined. No ambiguous grading.

Each item's expected answer must be unambiguous. The correct answer for select/multi/match items should be the only defensible choice. Numeric answers must have unambiguous input format expectations. The case-level scoring (per-item binary 0/1) must work correctly for all item types.

Per Session 61 verification: scoring pipeline (correctCase, norm, normalizeCaseInput) handles all item types correctly with zero incompatibilities. This dimension validates that those scoring functions can be applied unambiguously.

| Score | Descriptor | Criteria |
|:-----:|------------|----------|
| **5** | **Unambiguous** | Every item has exactly one correct answer. Numeric tolerances clear. Multi-select choice set is unambiguous. Match pairings are the only correct pairing. Fill-in-the-blank accepts only one answer (case-insensitive). |
| **4** | **Clear** | All items have clear correct answers. One item may have minor ambiguity in input format (e.g., "$540,000" vs "540000") that the `norm()` function handles. No conceptual ambiguity. |
| **3** | **Minor ambiguity** | One item has multiple defensible answers. A candidate could make a reasonable case for a different answer. Input format expectations not stated. |
| **2** | **Ambiguous** | Multiple items could be argued. Correct answer depends on an assumption not stated in the exhibits. `norm()` cannot resolve the ambiguity. |
| **1** | **Unscorable** | No way to determine correct answer for ≥ 1 item. Missing `Correct` field. Item type unsupported by scoring pipeline. |

**Defect-class gates:**
- **Missing `Correct` field for any item:** D3 capped at 1. Can't score the item.
- **Multiple defensible correct answers for select item:** D3 capped at 2. Only one option must be correct.
- **Multi-select with ambiguous correct set:** D3 capped at 2. All items in correct set must be unambiguously correct.
- **Match item with non-exclusive pairings:** D3 capped at 2. Each left item must match exactly one right item.

**Minimum acceptable:** 4 (for certification).

---

### D4: Metadata and Difficulty (Weight: Medium)

**Domain:** Governance metadata completeness and difficulty calibration.

Case-level metadata must be complete per QUESTION_METADATA_STANDARD.md Part 1. Item-level metadata must be complete per Part 2. Difficulty must be calibrated: case-level DifficultyScore within ±1 of mean item DifficultyScore (CF4). ProductionStatus and question_state must not contradict.

| Score | Descriptor | Criteria |
|:-----:|------------|----------|
| **5** | **Complete + calibrated** | All case-level fields present (CaseID, Title, SectionTags, BlueprintDomain, Difficulty, DifficultyScore, ProductionStatus, Version, EstimatedMinutes, QuestionCount, ExhibitCount). All item-level fields present (ItemID, Type, Prompt, Correct, Explanation, Topic, Difficulty, DifficultyScore, CognitiveLevel, CalculationRequired). Case DifficultyScore within ±1 of mean item DifficultyScore. question_state present on every item. |
| **4** | **All critical present** | CaseID, Title, SectionTags, Difficulty/DifficultyScore, ProductionStatus, Version present. All items have item-level Difficulty, Type, Prompt, Correct, Explanation. Minor gap (e.g., one item missing CognitiveLevel). No contradictions. |
| **3** | **Adequate** | Core metadata present but DifficultyScore gaps (some items have no difficulty). Case DifficultyScore present but not calibrated to items. question_state may be missing on some items. |
| **2** | **Defective** | Missing DifficultyScore at case level. Missing question_state on items. Contradictory ProductionStatus vs. question_state (e.g., "Production" + "Unprocessed"). Non-standard state values. |
| **1** | **Broken** | Missing CaseID. Missing SectionTags. Missing ProductionStatus. Multiple required fields absent. Item-level Type/Prompt/Correct missing for ≥ 1 item. |

**Defect-class gates:**
- **ProductionStatus → question_state contradiction:** D4 capped at 2.
- **Missing DifficultyScore (case level):** D4 capped at 2.
- **Missing question_state on items (DL-024 pattern):** D4 capped at 2.
- **Case DifficultyScore outside ±1 of item mean:** D4 capped at 3. Recalibrate.
- **No QuestionCount field or QuestionCount ≠ Items.length (CF):** D4 capped at 2.
- **Missing ExhibitCount or ExhibitCount ≠ Exhibits.length (CF):** D4 capped at 3 (exhibits may not be present for migrated cases).

**Minimum acceptable:** 4 (for certification).

---

### D5: Explanation Quality (Weight: High)

**Domain:** Every case item provides instructive feedback. No template boilerplate. All distractors explained.

Every item must have an `Explanation` field that teaches the concept. For select/multi items, each distractor must be explained. The explanation must reference the governing standard, show solution steps, and provide business interpretation. No "plausible misconception" boilerplate (DL-013). No missing explanations (DL-021). No empty feedback slots (DL-025/026 analog for cases).

Case-study items use a single `Explanation` field rather than the MCQ's `ExplanationCorrect` + `ExplanationWrong*` split system. However, the explanation must cover ALL choices (correct + distractors) per CAQS §4.1.

| Score | Descriptor | Criteria |
|:-----:|------------|----------|
| **5** | **Comprehensive** | Every item has detailed explanation: names governing standard, shows solution, interprets business result, addresses why wrong choices are wrong, identifies common trap. Calculation items show formula with substituted values. |
| **4** | **Thorough** | Every item has substantive explanation: names standard or concept, shows solution steps, interprets result. Distractors addressed. Minor gaps (one item lacks business interpretation, one distractor explanation is brief). |
| **3** | **Adequate** | All items have explanations. Explanations are correct but terse — state the answer without full reasoning. Distractors mentioned but not individually explained. No boilerplate but limited instructional depth. |
| **2** | **Defective** | Some items have generic explanations. DL-013-like boilerplate ("The correct approach involves..."). Distractor explanations missing for select items. Calculation items state result without formula. |
| **1** | **Missing** | One or more items have empty or absent Explanation field. DL-021 analog — no educational feedback for the learner. Key items offer no instructional value. |

**Defect-class gates:**
- **Any item has empty/missing `Explanation`:** D5 capped at 1. Auto-fail. Learner receives no feedback.
- **DL-013 boilerplate patterns in explanations:** "represents a plausible misconception," "does not align with," "The correct approach involves..." → D5 capped at 2.
- **Select item explanation covers only the correct answer (no distractor analysis):** D5 capped at 3.
- **Less than 50% of items have business interpretation in explanation:** D5 capped at 3.
- **Less than 50% of items name the governing standard:** D5 capped at 3.

**Minimum acceptable:** 4 (for certification).

---

### D6: Integration Readiness (Weight: High)

**Domain:** Case works cleanly with the scoring and delivery pipeline. Items follow cognitive progression. Items are self-answerable.

The case must integrate with the existing scoring pipeline verified in Session 61: `correctCase()`, `norm()`, `normalizeCaseInput()`. All item types (numeric, select, multi, match, fill) must be handled correctly. Items must follow a logical cognitive progression (calculate → analyze → decide) per CAQS §3.5. Items must be answerable independently — a candidate who misses Item 1 must still be able to attempt Item 2.

| Score | Descriptor | Criteria |
|:-----:|------------|----------|
| **5** | **Fully integrated + progressing** | All item types compatible with scoring pipeline (verified per Session 61). Items follow calculate → analyze → decide cognitive progression. All items self-answerable. Exhibits referenced correctly by items. No dependency chains that prevent independent answering. Case-level DifficultyScore calibrated to total solve time. |
| **4** | **Integrated** | All item types scoring-compatible. Items mostly follow progression but one pair is inverted (analyze before calculate). Items are self-answerable. Exhibits referenced. |
| **3** | **Mostly integrated** | Scoring pipeline handles all types but one type needs workaround. Items don't follow cognitive progression. Minor dependency issue (Item 2 needs Item 1 result but Item 2 prompt provides it). |
| **2** | **Partially integrated** | One item type unsupported by scoring pipeline (e.g., `match` type in enhanced cases, per Session 61 finding). Items depend on prior correct answers. Exhibits not referenced by items. |
| **1** | **Not integrable** | Multiple item types unsupported. Items cannot be answered without prior correct results. Exhibits missing or broken. Case cannot be delivered through current pipeline. |

**Defect-class gates:**
- **Match or fill types in enhanced cases (no scoring support):** D6 capped at 2. Per Session 61, enhanced cases don't include these types.
- **Item references exhibit not present in case:** D6 capped at 2.
- **Item dependent on prior item's correct answer without providing the result:** D6 capped at 2.
- **No cognitive progression (all items same type/difficulty):** D6 capped at 3.
- **Case total solve time inconsistent with EstimatedMinutes:** D6 capped at 3.

**Minimum acceptable:** 4 (for certification).

---

## 2.3 Certification Decision Rules

| Decision | Condition | Meaning |
|----------|-----------|---------|
| **Certified** | All 6 dimensions ≥ 4 **AND** D1 ≥ 5 **AND** D5 ≥ 4 (total ≥ 24/30) | Case enters learner delivery pool. All items → `question_state: "Certified"`. Case → `ProductionStatus: "Production"`. |
| **Needs Revision** | Any dimension scores 2–3 **OR** D1 scores 3–4 **OR** D5 scores 2–3 | Case has specific, fixable issues. Document findings per item. Enter `"Editorial Queue"`. Remediate and re-evaluate. |
| **Retire/Hold** | Any dimension scores 1 **OR** D1 scores 1–2 **OR** D5 scores 1 | Too flawed to fix in a single session. Hold in `"Editorial Queue"` with documented defects. Requires major revision or archival. |

### Decision Matrix

| D1 | D5 | Other Dims | Decision |
|:--:|:--:|------------|----------|
| 5 | ≥ 4 | All ≥ 4 | **Certified** |
| 5 | 4–5 | Any = 3 | **Needs Revision** (fix that dimension) |
| 4 | ≥ 4 | All ≥ 4 | **Needs Revision** (strengthen D1) |
| 5 | 3 | All ≥ 4 | **Needs Revision** (strengthen D5) |
| 3–4 | Any | Any | **Needs Revision** |
| 1–2 | Any | Any | **Retire/Hold** |
| Any | 1 | Any | **Retire/Hold** |
| Any | Any | Any = 1 | **Retire/Hold** |

### Note on D5 Threshold

Case-study D5 minimum is 4 (vs. MCQ D5 minimum of 5). Rationale: case-study items use a single `Explanation` field rather than the four-field ExplanationWrong* + ExplanationCorrect split. The higher structural complexity of the MCQ explanation system (four fields per item × risk of DL-008/DL-013/DL-021/DL-025/DL-026) justifies the stricter threshold. Case-study items with a single field are subject to fewer defect classes, but a score of 3 (explanation exists but is minimal) still does not meet the educational quality bar for certification.

---

## 2.4 Quick-Reference Scoring Card — Case Study

| Dim | Score 1 | Score 2 | Score 3 | Score 4 | Score 5 |
|:---:|---------|---------|---------|---------|---------|
| **D1** | Known errors in any item | Unverified | Presumed correct (prior audit) | All correct, spot-checked | All independently verified |
| **D2** | No scenario / broken | Textbook-style | Adequate but generic | Realistic (all CAQS §3.1) | Authentic business document |
| **D3** | Unscorable (missing Correct) | Multiple ambiguous items | Minor ambiguity | Clear | Unambiguous |
| **D4** | Broken (no CaseID/Section) | Missing question_state, contradictions | Adequate, gaps present | All critical present | Complete + calibrated |
| **D5** | Empty/missing explanations | Boilerplate patterns | Terse, limited depth | Thorough | Comprehensive |
| **D6** | Not integrable | Scoring pipeline partial support | Mostly integrated | Integrated | Fully integrated + progressing |

---

# Cross-Rubric Rules

## Certification Pre-Flight Checklist

Before any item or case can be certified, the following pre-flight checks must pass:

### For every certification target:

- [ ] **Backup created** — Pre-session backup per BACKUP_PROTOCOL.md
- [ ] **Governance guard active** — `.opencode/plugins/governance-guard.js` loaded; Rule 2 (DL-008 BLOCK) active
- [ ] **Target file parsed** — Passes `node --check` with zero syntax errors
- [ ] **Item count stable** — Count of `QuestionID` fields matches registry (per AGENTS.md §5)
- [ ] **Duplicate ID scan** — Zero duplicate QuestionIDs
- [ ] **CorrectChoice distribution** — No systematic position bias (per-session review)

### For MCQs:
- [ ] **EV8 compliance** — `ExplanationWrong[CorrectChoice] === ""` for ALL items in batch (DL-008 gate)
- [ ] **DL-013 scan** — Zero "represents a plausible misconception" in any ExplanationWrong field
- [ ] **DL-021/025/026 scan** — All distractor ExplanationWrong fields are present and non-empty
- [ ] **DL-030 audit** — Independent re-derivation of CorrectChoice for ≥ 20% of items (random sample)
- [ ] **question_state present** — All items have a valid `question_state`
- [ ] **certification_date recorded** — ISO 8601 date set on newly Certified items

### For Case Studies:
- [ ] **All items have `Correct`** — No missing, empty, or null answer fields (Session 61 verified)
- [ ] **Scoring pipeline compatibility** — All item types work with `correctCase()` 
- [ ] **Exhibit data consumed** — Every row/column in exhibits referenced by at least one item
- [ ] **Cognitive progression verified** — Items follow calculate → analyze → decide sequence
- [ ] **question_state on every item** — Zero missing states
- [ ] **No ProductionStatus contradiction** — `ProductionStatus: "Production"` only if all items are `"Certified"`

## Multi-Item Certification Batches

Per governance-guard Rule 5: maximum 30 question objects per change-set without `BLOCK-AUTHORIZED` marker. Certification passes should batch ≤ 28 items (leaving headroom for the 30-item cap).

## Post-Certification Verification

After every certification pass:
1. **Independent re-scan** — Run the certification rubric against a 20% random sample of newly certified items
2. **Cross-check against DEFECT_LIBRARY.md** — Verify all open gate-level defects are absent from certified items
3. **REVISION_HISTORY.md entry** — Log before/after counts, confidence levels, and QID ranges
4. **Registry update** — Regenerate `MASTER_QUESTION_REGISTRY.md` if item counts changed
5. **Pre-delivery safety check** — Run `.opencode/skills/pre-delivery-safety-check.md` to confirm delivery pool filters by `question_state: "Certified"` and excludes known-defective QIDs

---

# Rubric Usage Guide

## For Session-Level Certification Passes

1. **Pre-pass:** Load both rubrics. Identify the target items/cases. Run pre-flight checklist.
2. **Per-item evaluation:** Score all 6 dimensions. Record scores in the certification entry.
3. **Defect gate check:** For each dimension, check the defect-class gate table. If a gate defect is present, cap the score.
4. **Decision:** Apply the decision matrix. Classify each item as Certified / Needs Revision / Retire/Hold.
5. **Documentation:** Record scores, decisions, and defect findings per item. Log to REVISION_HISTORY.md.
6. **Post-pass:** Run post-certification verification checklist.

## For Audit / Read-Only Sessions

1. Apply rubric as evaluation framework — do not modify `question_state`.
2. Report scores and defect findings per dimension.
3. Flag any item that would fail certification under the rubric.
4. Document remediation recommendations with specific dimension score targets.

---

## Relationship to CAQS v1.0

These rubrics operationalize the CAQS v1.0 quality standard for certification decisions. The mapping:

| CAQS §1.6 Dimension | MCQ Rubric | Case-Study Rubric |
|---------------------|------------|-------------------|
| 1. Correctness | D1 Content Accuracy | D1 Calculation and Concept Accuracy |
| 2. Precision | D3 Clarity | D3 Rubric Clarity |
| 3. Difficulty Calibration | D6 Governance (Difficulty field) | D4 Metadata and Difficulty |
| 4. Distractor Engineering | D4 Distractor Quality | D5 Explanation Quality (distractor coverage) |
| 5. Blueprint Alignment | D2 Blueprint Alignment | D2 Scenario Quality (includes topic mapping) |
| 6. CMA Part 1 Relevance | D2 Blueprint Alignment | D2 Scenario Quality |

The CAQS 100-point rubric (§2) remains the comprehensive quality assessment tool for deep content reviews. These certification rubrics are the gating instruments for learner-pool eligibility — they are designed to be applied quickly (per-item) and to produce an unambiguous pass/fail decision coupled with specific remediation targets.

---

## Linked Defect Cross-Reference

Full defect details in `knowledge/DEFECT_LIBRARY.md`. Quick-reference by rubric dimension:

| Defect | Severity | Caps Dimension(s) | Summary |
|--------|----------|:---:|---------|
| DL-030 | Critical | D1 | Wrong answer key |
| DL-001 | Critical | D1 | Semantic accuracy defect |
| DL-008 | High | D5 | Non-empty EW[CorrectChoice] |
| DL-013 | High | D5 | Template boilerplate explanations |
| DL-021 | High | D5 | Missing distractor ExplanationWrong fields |
| DL-025 | High | D5 | Empty non-CC ExplanationWrong (Pack A) |
| DL-026 | High | D5 | Empty non-CC ExplanationWrong (cross-pool) |
| DL-010 | High | D5 | Misassigned explanation text |
| DL-007 | Medium | D5 | Verbatim identical distractor explanations |
| DL-005 | Medium | D4 | Duplicate/identical distractors |
| DL-003 | Medium | D3, D4 | Absolute language in choices |
| DL-004 | Medium | D3 | Vague qualifiers reducing discrimination |
| DL-024 | Low | D6 | Missing question_state on item blocks |

---

## Revision History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-07-24 | Rubric Definition Agent — Session 64 | Initial version. Two rubrics (MCQ + Case Study), 6 dimensions each, defect-class gates, decision rules, pre-flight and post-certification checklists. |
