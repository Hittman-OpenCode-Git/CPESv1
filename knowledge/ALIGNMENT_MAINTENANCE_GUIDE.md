# Difficulty × CognitiveLevel Alignment Maintenance Guide

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md, DCS v1.0, CAQS v1.0
**Scope:** All MCQ banks and case-study items across all lanes (100-series, 500-series, 700-series)
**Based on:** Sessions S713–S719 calibration framework (2026-07-26)

---

## 1. Future Assignment Rules

For **NEW** content being authored. These rules prevent the template-based CL inflation and difficulty miscalibration that affected all 2,425 existing items.

### 1.1 Step-by-Step CL Classification Process

Assign CognitiveLevel **before** difficulty, and assign it by cognitive demand — not by template position.

```
Step 1: Read the stem and answer choices (do not look at existing CL/Difficulty labels).
Step 2: Determine the dominant cognitive process the candidate must perform.
Step 3: Classify using the decision tree for each boundary pair (see §2).
Step 4: Verify: ask "Would removing the company name change the cognitive process?"
         If yes, CL is overstated. Apply §2.3 Understand-vs-Apply test.
Step 5: Assign CL. Record confidence in the assignment (0-100, genuine estimate, not a template value).
Step 6: Apply CL→Difficulty mapping from DCS §3 to get default DifficultyScore.
Step 7: Apply DCS §4 secondary modifiers only where evidence-supported.
Step 8: Check §1.3 forbidden triggers and §1.5 checklist before certification.
```

### 1.2 Rules for Each CL Level

#### Remember (CL=Remember)
- **When to use:** The item asks "What is X?" or "Define X" or "X is the term for:" where the answer is a glossary definition.
- **Decision criterion:** At least **2 of 4 distractors are from ENTIRELY DIFFERENT domains** than the correct answer. The candidate can eliminate them by domain-disjoint logic without understanding the concept.
- **Example (valid):** "The term for the report that summarizes revenues and expenses is:" with distractors "Statement of Cash Flows" (different financial statement), "Internal audit" (different domain), "Board resolution" (legal domain). Candidate can match "income statement" by keyword recognition.
- **Default Difficulty:** Moderate-Easy/2
- **When to upgrade CL:** If distractors are from the same narrow domain → reclassify as Understand. If this item came from Pack E Section F with 4 analytics terms → it's Understand, not Remember.

#### Understand (CL=Understand)
- **When to use:** The item requires comprehending a concept and discriminating between related concepts within the same domain. The candidate must know what the concept MEANS, not just recognize a word.
- **Decision criterion:** ALL distractors are plausible alternatives from the SAME domain. The candidate must comprehend the concept's place within its taxonomy, framework, or standard.
- **Example (valid):** "The control environment reflects:" with choices: A=Financial reporting, B=Physical controls, C=Organizational ethical values, D=Monitoring activities. ALL are COSO framework concepts. Candidate must know which sub-concept belongs to which COSO component.
- **Default Difficulty:** Moderate-Easy/2
- **Modifier:** Upgrade to Moderate/3 if the stem embeds a scenario that requires parsing/interpreting to identify what aspect of the concept is being tested (DCS §3 modifier: "scenario parsing or interpretation required").

#### Apply (CL=Apply)
- **When to use:** The item requires **executing a rule, standard, or procedure against a specific fact pattern.** The scenario contains operative facts (numbers, transaction details, legal conditions) that the candidate must PROCESS.
- **Decision criterion:** (1) Removing the scenario-specific facts makes the question unanswerable, AND (2) the candidate must perform a calculation or apply a specific ASC/COSO/IMA standard to determine the correct treatment.
- **Example (valid):** "Titan repurchased 10,000 shares at $45 when par is $1. The journal entry to record the repurchase includes:" Must apply treasury stock accounting to specific numbers. Not just define treasury stock — apply it.
- **Default Difficulty:** Moderate/3

#### Analyze (CL=Analyze)
- **When to use:** The candidate must **determine WHICH method, concept, or cause applies** from among alternatives, or must interpret data to identify a pattern. The method is NOT given — the candidate must select the right analytical approach.
- **Decision criterion:** "If the stem tells you what to do and you just do it → Apply. If the stem describes a situation and you must decide what to do → Analyze." (§2.3 operator test)
- **Example (valid):** "Actual sales had more Product A and less Product B than budgeted. Why did contribution margin change even though total unit volume matched budget?" Candidate must identify the RELEVANT variance type (sales mix) from the scenario — the method is not given.
- **Example (NOT valid — Apply, not Analyze):** "Use the high-low method to estimate variable cost per unit given [data]." Method is given: high-low. Candidate executes procedure.
- **Default Difficulty:** Difficult/4
- **This is the RAREST CL.** The pool has ~25-30 genuine Analyze items. Do not inflate Apply items to Analyze — multi-step calculation with a given method is still Apply.

#### Evaluate (CL=Evaluate)
- **When to use:** The item requires **professional judgment** where: (a) multiple answers could be reasonably defended, OR (b) the candidate must weigh trade-offs between competing business objectives using a professional framework.
- **Decision criterion:** "Is there exactly one correct answer under GAAP/COSO/the standard?" If yes → NOT Evaluate. "Could a well-prepared candidate reasonably defend a different answer?" If yes → Evaluate.
- **Example (valid):** "The controller must recommend a cost allocation method for a shared service center. Division A uses services heavily but Division B generates more revenue. Using IMA's ethical standards, which recommendation best balances fairness and transparency?" Multiple defensible positions — requires judgment.
- **Example (NOT valid — the dominant template inflation pattern):** "[Company] [scenario]. Which response is most appropriate?" with a single GAAP-correct answer. This is Understand or Apply, regardless of phrasing.
- **Default Difficulty:** Difficult/4
- **Do NOT assign Evaluate unless you can articulate WHY two competent practitioners could genuinely disagree on the answer.** If you cannot → the item is not Evaluate.

### 1.3 Forbidden Triggers for CL Assignment

The following patterns were the ROOT CAUSE of 1,604 DCS §3 misalignments across the existing pool. They **must not** be used as CL classification inputs:

| Forbidden Trigger | Does NOT mean | Why |
|-------------------|---------------|-----|
| "Which response is most appropriate?" | Evaluate | Template filler. Every sampled item using this phrase tested single-standard comprehension. Zero genuine Evaluate items found (S719 Agent C: 55 sampled, 0 confirmed). |
| Company name in stem | Apply | Cosmetic wrapper. If removing the company name leaves an equivalent question, it's Understand, not Apply. (§2.3 operator test 1) |
| Multi-step calculation (≥3 steps) | Analyze | Number of calculation steps increases DIFFICULTY, not cognitive level. Multi-step formula execution is still Apply. |
| Template position in rotation group | Any CL | Template-position CL assignment is the root cause of all four boundary-zone errors. 48 of 58 Analyze items (83%) are template clones with the same CL by position. |
| The word "analyze" in the stem | Analyze | "What analytical technique is being used?" = concept recognition (Understand), not analysis. The scenario may describe analysis, but the item asks the candidate to IDENTIFY it. |
| Confidence value of 86 or 100 | Verified assignment | Template defaults, not reviewer scores. ~120 items have conf=86 from template; ~50 Pack E items have conf=100. Neither represents a genuine per-item review. |

### 1.4 Difficulty Assignment Rules

1. **CL is the primary determinant** (DCS §3 mapping).
2. **Modifiers adjust difficulty only** — never CL.
3. **"Plausible distractor count ≥3"** (DCS §4) fires on ~80% of well-written MCQs. This modifier must be gated: apply only when distractor-distractor Jaccard similarity < 30% (distinct misconceptions), not mere structure.
4. **DCS §4 modifiers apply additively**, clamped to [1,5].
5. **DCS §3 default is a floor, not a ceiling.** DCS defaults are starting points — per-item modifiers can and should shift difficulty by ±1 where evidence supports.
6. **"Company name only (no scenario)"** modifier (-1): frequently applicable for Pack E items where a fictional company name is the only scenario element.

### 1.5 Pre-Certification Calibration Checklist

Before any item reaches `question_state: "Certified"`, verify:

- [ ] CL assigned by cognitive demand, not template position (§1.3 trigger check)
- [ ] Same-domain distractor test applied (Remember vs Understand — §2.1)
- [ ] Scenario operativity test applied (Understand vs Apply — §2.2)
- [ ] Method-selection test applied (Apply vs Analyze — §2.3)
- [ ] Professional-judgment test applied (Analyze vs Evaluate — §2.4)
- [ ] Difficulty assigned by CL→DCS §3 mapping
- [ ] DCS §4 modifiers applied only where evidence-supported
- [ ] Confidence-gate passed (§4): CL confidence ≥70 or human-reviewed
- [ ] No forbidden triggers active (§1.3)
- [ ] Cross-pack consistency checked (§6: spot-check 5 items from each other pack in the same domain at the same CL to verify consistency)
- [ ] No DCS §3 gap > 1 level between CL default and assigned DifficultyScore

---

## 2. Boundary Decision Trees

Per Agent E's boundary-zone analysis (SESSION719_BOUNDARY_ANALYSIS.json), these four boundary zones account for all systemic CL misclassifications.

### 2.1 Remember vs Understand

```
START: Candidate reads stem and 4 choices.

Q1: "Are ALL 4 answer choices from the SAME narrow accounting domain?"

YES → Q2: "Can the candidate answer correctly by keyword-matching
          the definition alone, without understanding conceptual
          relationships within the domain?"

        YES → REMEMBER
        NO  → UNDERSTAND

NO  → Q3: "Are at least 2 distractors from entirely DIFFERENT domains
          than the correct answer?"

        YES → REMEMBER (candidate can eliminate by domain-disjoint logic)
        NO  → Q4
```

**Operator test:** "Can a candidate who memorized the glossary definition but does not understand the conceptual relationship eliminate this distractor?" → If yes on 2+ distractors, the item is Remember. → If no on any distractor, the item is Understand.

**Example (Remember):** "The term for net revenues minus cost of goods sold is:" Choices: A=Operating income (related but within same subdomain?), B=Selling expenses (different type of expense), C=Net income (bottom-line concept), D=Gross margin (correct). If 2 distractors are from different domains → Remember. But if all 4 are margin/profit line items → Understand because candidate must know the financial statement structure.

**Example (Understand):** P1E-E-002: "The control environment reflects:" Choices: A=Financial reporting (output concept), B=Physical controls (control activity sub-type), C=Organizational ethical values (correct — control environment), D=Monitoring activities (other COSO component). ALL are COSO concepts. Candidate must know which belongs to which component. This is Understand, not Remember.

**The Pack E problem:** 284 of 386 Remember items (74%) are actually Understand per this decision tree. The template assigned Remember to any item formatted as "X is/reflects/includes/uses:" regardless of distractor domain overlap.

### 2.2 Understand vs Apply

```
START: Candidate reads stem with scenario elements.

Q1: "Does the stem contain OPERATIVE facts (specific numbers,
    transaction details, legal conditions, dates) that the
    candidate must PROCESS to arrive at the answer?"

YES → Q2: "If the scenario facts were removed, could the question
          still be answered with the same cognitive process?"

        YES → UNDERSTAND (scenario is cosmetic)
        NO  → APPLY

NO  → UNDERSTAND
```

**Operator tests:**
1. "If the company name were removed, could the question still be answered?" → If yes, likely Understand.
2. "Is there any independent calculation or fact-parsing required beyond concept recognition?" → If yes, Apply.
3. "Does the stem contain a specific number, date, or transaction condition that drives the answer?" → If yes, Apply.

**Example (Apply — scenario is operative):** P1-A-009: "A company purchases equipment for $96,000 on July 1. Salvage value $12,000, useful life 7 years. Using straight-line depreciation, what is the depreciation expense for the first calendar year?" Requires computing (96000-12000)/7 × 6/12. The $96,000, July 1 date, $12,000 salvage, and 7-year life are all operative. Remove them and the question cannot be answered. → Apply.

**Example (Understand — scenario is cosmetic):** P1-B-004: "Umbra wants to maintain a constant 12-month planning horizon. Which response is most appropriate?" The correct answer is "Rolling budget" — identified by the concept of "constant 12-month horizon." Removing "Umbra" leaves the same question. The scenario is a thin wrapper on a concept-recognition item. → Understand.

**Bidirectional error pattern:** Agent E found ~150 items classified Understand that should be Apply (GAAP scenario with operative facts), and ~70 items classified Apply that should be Understand (scenario is cosmetic concept wrapper). Both errors arise from the same template: "which response is most appropriate?" was treated as Apply when paired with a company name, and Understand without one.

### 2.3 Apply vs Analyze

```
START: Candidate reads stem describing a situation.

Q1: "Is the method/standard/formula to use GIVEN in the stem
    (explicitly or by strong implication)?"

YES → APPLY (candidate executes given procedure)

NO  → Q2: "Must the candidate DETERMINE which method, concept, or
          analytical approach is appropriate from among alternatives?"

        YES → Q3: "Does this require simply matching the situation
                  to a concept name (e.g., 'this describes X
                  analysis')?"

                YES → UNDERSTAND (description-to-concept matching)
                NO  → ANALYZE

        NO  → APPLY
```

**Operator test:** "If the stem tells you what to do and you just do it → Apply. If the stem describes a situation and you must decide what to do → Analyze. If the stem describes a situation and you just name the concept being used → Understand, not Analyze."

**Example (Apply — method given):** "Using the high-low method, compute the variable cost per unit: [data]." Method is given (high-low). Candidate executes. Multi-step arithmetic with a given method is still Apply.

**Example (Analyze — method selection required):** P1-CD-017: "Actual sales had more Product A and less Product B than budgeted. Why did contribution margin change even though total unit volume matched budget?" Candidate must determine that sales mix variance is the cause, then compute it. The analytical approach (mix variance decomposition) is not given — candidate must select it from among possible variance types (sales volume, sales price, mix, quantity). → Analyze.

**Example (Understand — description-to-concept, NOT Analyze):** P1-CC-008: "Wants to analyze ROI by breaking it into margin and turnover. What approach is being used?" Answer: DuPont analysis. The question DESCRIBES analysis but asks the candidate to NAME the method. → Understand.

**Clone-group problem:** 48 of 58 labeled Analyze items (83%) are 5-item template clones. 7 clone groups (DuPont, time-series, customer profitability, common-size, inherent risk, data mining, joint cost) each have 5-7 items differ only by company name. The template assigned Analyze by rotation position. Per-item review would reclassify most as Understand (description-to-concept matching) or Apply (execute given method).

### 2.4 Analyze vs Evaluate

```
START: Candidate reads stem. Stored CL is Evaluate.

Q1: "Is there exactly ONE correct answer under GAAP/COSO/the
    applicable standard?"

YES → Q2: "Despite the 'most appropriate' phrasing, is this
          effectively 'Which treatment is correct under [standard]?'"

        YES → NOT Evaluate → reclassify as Understand or Apply
                             based on §2.2-2.3 decision trees.

NO  → Q3: "Could a well-prepared CMA candidate reasonably defend
          at least two different answers, where the disagreement
          is about professional judgment (trade-offs, ethical
          priorities, or strategic preferences), NOT about knowing
          the correct standard?"

        YES → EVALUATE
        NO  → NOT Evaluate → reclassify as Analyze
```

**Operator tests:**
1. "Is there exactly one correct answer under GAAP/COSO/the standard?" → If yes, NOT Evaluate.
2. "Could a well-prepared candidate reasonably defend a different answer?" → If yes, Evaluate.
3. "Does the stem say 'Which response is most appropriate?' but the answer is just picking the right ASC rule?" → NOT Evaluate — this is the template inflation pattern.

**Example (NOT Evaluate — template inflation):** P1-A-004: "Titan repurchased its own common shares during the year. Which response is most appropriate?" Correct answer: reduce equity. This is a single, unambiguous GAAP treatment. The "most appropriate" phrasing is template filler. → Apply (treasury stock accounting applied to a specific fact pattern).

**Example (Evaluate — genuine):** "Harbor Medical's controller discovers a material error in last quarter's filed 10-Q. The CFO wants to wait until year-end to correct. Using the IMA Statement of Ethical Professional Practice, what should the controller do?" Penalties: competing ethical duties (competence, integrity, credibility) vs. employment risk. Reasonable people can disagree on the best course of action while acknowledging ethical constraints. → Evaluate.

**S719 finding:** Of 244 sampled severe items, **zero** genuine Evaluate items were found. 168 were the template "most appropriate" pattern (reclassified to Understand). 76 were Pack E definition-match items at Difficult difficulty (reclassified to Understand). All Evaluate items with Easy difficulty are template-inflated — there is no scenario where a genuine professional-judgment question can be answered with Easy-level cognitive demand.

---

## 3. Forbidden Triggers — Full Catalog

Expanded from §1.3 with additional patterns discovered during S719 boundary analysis.

### 3.1 CL Assignment Triggers (Never Use)

| Trigger | Template Produces | Correct CL |
|----------|-------------------|------------|
| "Which response is most appropriate?" + GAAP scenario | Evaluate | Understand or Apply (per §2.2) |
| Company name + any scenario description | Apply or Evaluate | Varies by operative facts |
| Multi-step calculation (≥3 arithmetic steps) | Analyze | Apply (if method given) |
| Position N in a 5-item rotation group | Fixed CL pattern (e.g., N=4 → Evaluate) | Actual cognitive demand |
| "Analyze" or "analysis" appearing in stem | Analyze | Varies (often Understand) |
| "Evaluate" appearing in stem | Evaluate | Varies (often Apply) |
| DCS §4 "plausible distractor ≥3" as CL signal | inflates CL | Difficulty modifier only — never CL |
| Item topic sounds sophisticated (e.g., "machine learning") | Analyze or Evaluate | Evidence-based classification only |

### 3.2 Difficulty Assignment Triggers (Never Use)

| Trigger | Why Forbidden |
|----------|---------------|
| "Difficult sounds right for [Section E/F]" | Evidence-based only — DCS §7.2: no difficulty inflation to appear harder |
| Quota-filling to hit CAQS §6.1 distribution targets | DCS §6: aspirational, not a quota; §7.2: forbidden |
| Template position labeling (e.g., item 3 in rotation group = Difficult) | Same root cause as CL template errors |
| Pack E template Difficulty/4 default | 284 Pack E Remember/Difficult items → all should be ME/2 at Understand |
| "Confidence=100 so the stored value must be right" | Pack E conf=100 is a template default, not review score (§4) |

### 3.3 Confidence Assignment Triggers (Never Use)

| Trigger | Actual Meaning |
|----------|----------------|
| Confidence=86 | Template default for rotation-authoring pipeline (~120 items). Not a reviewer score. |
| Confidence=100 | Pack E template default (~50 items). Not independently verified. |
| Confidence=67, 71, 55 | Author(s) were uncertain but template assigned CL anyway. Low confidence + high CL = likely over-assignment. |

---

## 4. Confidence Gate Protocol

Per Agent B S719-BLOCK-002: DCS §7.1 has no confidence-gate for CognitiveLevel. This section adds one.

### 4.1 Confidence Thresholds

| CL Confidence | Action | Rationale |
|---------------|--------|-----------|
| ≥ 85 AND genuinely reviewed | Accept assignment | Must be human-verified or AI-reviewed with per-item evidence (not template default) |
| 70–84 | Accept with documented rationale | Write one-sentence justification for the CL choice |
| 50–69 | **Gate: Requires human review** | Assignment is uncertain. Do not certify without review. |
| < 50 | **Gate: Requires independent re-classification** | Assignment is unreliable. Re-run §2 decision tree from scratch. |

### 4.2 Template Confidence Detection

Any confidence value that appears uniformly across a contiguous block of items (e.g., 25 items all at conf=86, or 50 items all at conf=100) is a **template default**, not a reviewer score. These items must be treated as unreviewed.

**Detection rule:** Scan for `Confidence` values in contiguous QID ranges. If the same value repeats ≥10 times within a section with no variation, flag as template-assigned. Reclassify confidence to 0 (unreviewed) for gate purposes.

### 4.3 Cross-Clue: Low Confidence + High CL

When a low-confidence item (conf < 70) carries a high CL (Analyze or Evaluate), this is a strong signal of over-assignment. The authoring template assigned a high CL mechanically, but the reviewer flagged uncertainty. These items are the highest-priority targets for CL recalibration.

**Example:** P1-B-004 (conf=55, stored CL=Evaluate, actually Understand). The reviewer was uncertain (55) about an assignment that was wrong anyway.

---

## 5. Calibration Checklist (Pre-Certification)

For every item entering the certification pipeline, reviewers must complete this checklist.

### 5.1 CL Determination

- [ ] CL assigned by cognitive demand analysis (§1.1 Steps 1-5), not template position
- [ ] Same-domain distractor test applied: Remember vs Understand boundary confirmed (§2.1)
- [ ] Scenario operativity test applied: Understand vs Apply boundary confirmed (§2.2)
- [ ] Method-selection test applied: Apply vs Analyze boundary confirmed (§2.3)
- [ ] Professional-judgment test applied: Analyze vs Evaluate boundary confirmed (§2.4)
- [ ] No forbidden triggers active (§3)
- [ ] If CL=Evaluate, documented evidence: what two defensible positions exist? (§2.4 operator test 2)

### 5.2 Difficulty Calibration

- [ ] Difficulty assigned by CL→DCS §3 mapping as starting point
- [ ] DCS §4 secondary modifiers applied only where evidence-supported
- [ ] "Plausible distractor ≥3" modifier gated per §1.4 rule 3
- [ ] DifficultyScore is within ±1 of DCS §3 default for the assigned CL (if > ±1, re-evaluate CL)
- [ ] Difficulty matches actual cognitive demand — no quota-based labeling (DCS §7.2)

### 5.3 Confidence Gate

- [ ] CL confidence ≥ 70 OR human-reviewed (§4.1)
- [ ] Confidence value is not a template default (§4.2 — scan for contiguous uniform values)
- [ ] If conf 50-69, human review completed and documented
- [ ] If conf < 50, independent re-classification completed

### 5.4 Cross-Pack Consistency

- [ ] Spot-checked 3+ items in other packs at the same CL/Domain: do they have consistent CL assignment?
- [ ] If this is a Pack E item, compared against Pack A/B Section E items for CL consistency
- [ ] If this is a case-bank item, checked against MCQ items testing the same concept in the same domain

### 5.5 Structural Integrity

- [ ] DL-016 dual-block check: metadata-block CL matches content-block CL (for packs using dual-block architecture: Packs A, C, D)
- [ ] If DL-016 divergence found, content-block CL is authoritative
- [ ] No ExplanationWrong[CorrectChoice] non-empty (DL-008)
- [ ] No empty non-CorrectChoice ExplanationWrong slots (DL-025/026)

---

## 6. Drift Detection Process

How to detect calibration drift in future sessions. Run these checks quarterly or after any batch certification wave.

### 6.1 Quarterly Alignment Scan

1. **Run DCS §3 alignment scan**: Extract every item's CL → Difficulty pair. Compare against DCS §3 defaults. Flag any item where the gap exceeds ±1.
2. **Count by category**: Items where CL→Difficulty is at default; items with ±1 modifier; items with ≥2 gap.
3. **Trend analysis**: Compare current gap distribution to S719 baseline. Is the gap count increasing (drift) or decreasing (convergence)?

### 6.2 Boundary Zone Analysis (Agent E Methodology)

For each of the 4 boundary zones, sample 50 items and re-score:

| Zone | Scan Target | Expected S719 Post-Correction Baseline |
|------|------------|--------------------------------------|
| Remember vs Understand | Items with all-same-domain distractors + CL=Remember | Remember count should be ~105 (down from 435). Understand should be ~915 (up from 587). |
| Understand vs Apply | Items with operative scenario facts + CL=Understand | Items with cosmetic-only scenarios should NOT be Apply. |
| Apply vs Analyze | Items with CL=Analyze + "method given" in stem | Analyze count should be ~25-30 (down from 58). |
| Analyze vs Evaluate | Items with CL=Evaluate + single-correct-answer | Evaluate count should be ~35-40 (down from 223). |

### 6.3 CL Distribution Check

Compare current pool-wide CL distribution to CAQS §6.2 targets:

| CL Level | Target (CAQS §6.2) | S719 Post-Correction Expected |
|----------|--------------------|------------------------------|
| Remember | 5% | ~4% (105 items) |
| Understand | 15% | ~38% (915 items) |
| Apply | 40% | ~52% (1,270 items) |
| Analyze | 25% | ~1.2% (28 items — under CAQS target but accurate) |
| Evaluate | 15% | ~1.6% (38 items — under CAQS target but accurate) |

**Note:** Analyze and Evaluate undercounts do NOT indicate drift. The existing pool genuinely has fewer items at these levels — the S716-S719 recalibration corrected inflated labels, revealing the true distribution. Content authoring (not recalibration) must close these gaps.

### 6.4 Difficulty Distribution Check

| Difficulty | CAQS §6.1 Target | S719 Post-Correction Expected |
|------------|-----------------|------------------------------|
| Easy | 15% | ~8% (200 items) |
| Moderate-Easy | 20% | ~48% (1,150 items) |
| Moderate | 30% | ~33% (800 items) |
| Difficult | 25% | ~10% (240 items) |
| Very Difficult | 10% | ~1% (25 items) |

**Note:** The distribution shift reflects the CL→Difficulty recalibration (Understand→ME/2 dominates). Moderate-Easy is the new center of gravity because Understand is the dominant CL for CMA Part 1 content. The Difficult and Very Difficult counts are low because they depend on Analyze and Evaluate items that the pool currently lacks. Future content authoring should target filling these tiers.

### 6.5 Ad-Hoc Drift Check

When any of the following signals fire, run a full drift scan immediately:

- A new certification wave certifies ≥100 items without CL review
- A new content-authoring session adds ≥30 items
- Any agent or reviewer reports "these CL labels don't look right"
- Governance guard or validator flags unexpected field changes
- Pack E or dual-block pack (A/C/D) receives batch edits

---

## 7. Escalation Criteria

When to escalate to human review. These thresholds are non-negotiable.

### 7.1 Automatic Escalation

| Trigger | Action |
|----------|--------|
| CL confidence < 50 | **Block certification.** Re-run §2 decision tree from scratch. |
| CL→Difficulty gap > 2 levels (e.g., Remember at Difficult/4) | **Re-evaluate CL.** This is 4σ from DCS default. |
| Item contradicts its own ExplanationCorrect | **Flag as DL-030 candidate.** The stored CL/Difficulty may reflect content authors' intent, but the explanation describes a different cognitive demand. |
| Three independent reviewers disagree on CL | **Escalate to human-tiebreak.** Document all three reviewers' rationales. |
| CL=Evaluate assignment candidate | **Manual review required.** Before any Evaluate label is certified, the reviewer must document: "What two defensible positions exist? Why is genuine professional judgment required?" |
| DL-016 metadata-content CL divergence > 0 items | **Prioritize for structural repair.** Until fixed, content-block CL is authoritative. |

### 7.2 Informational Escalation (Document, Don't Block)

| Trigger | Action |
|----------|--------|
| CL confidence 50-69 | Document rationale in REVISION_HISTORY.md. Do not block certification if reviewer confirms assignment. |
| Difficulty skews > 20% from DCS §3 default in a single section | Document in drift report. Investigate whether a template artifact is recurring. |
| Analyze or Evaluate count increases by >10 items in a single batch | Sample 20% of new classify items and re-run boundary decision tree. Document false-positive rate. |

### 7.3 Escalation Documentation Standard

Every escalation must produce a JSON record with:
- QID, current CL, current Difficulty, confidence
- The specific boundary zone(s) in question
- The independent re-classification result
- The final decision and rationale
- Timestamp and reviewer identifier

---

## 8. Cross-Reference

### 8.1 Governing Documents

| Document | Version | Location | Relevance |
|----------|---------|----------|-----------|
| PROJECT_CONSTITUTION.md | 2.1 | `knowledge/` | Highest authority. §6 Core Principles, §7 Immutable Rules. |
| CAQS_v1.0.md | 1.0 | `knowledge/` | Quality standard. §1.6 Build-Time AI Verification, §6 Psychometric Standards, §7 Metadata Standard. |
| DIFFICULTY_CALIBRATION_STANDARD.md | 1.0 | `knowledge/` | Primary calibration framework. §3 CL→Difficulty mapping, §4 secondary modifiers, §7 calibration rules. |
| TAXONOMY_REGISTRY.md | 1.0 | `knowledge/` | Enumeration values for CognitiveLevel, Difficulty, DifficultyScore. Authoritative vocabulary. |
| QUESTION_METADATA_STANDARD.md | 1.1 | `knowledge/` | Metadata schema. §2.1 Item-level required fields (CognitiveLevel, Difficulty, DifficultyScore). §9 Governance state fields. |
| DEFECT_LIBRARY.md | Current | `knowledge/` | DL-031 (systematic difficulty inflation), DL-032 (case-bank uniform difficulty). |
| REVISION_HISTORY.md | Current | `knowledge/` | All S713-S719 calibration change records. |
| AGENTS.md | 1.0 | `./` | Standing instructions. §4: REVISION_HISTORY.md required for certification content changes. |

### 8.2 Session Reports (S713-S719 Calibration Framework)

| Session | Date | Scope | Key Report |
|----------|------|-------|------------|
| S713 | 2026-07-26 | DL-031: MCQ difficulty recalibration (definition-match, 186 items) | `reports/systematic_testing/SESSION713_DL031_CALIBRATION_RESULTS.json` |
| S714A | 2026-07-26 | DL-031: Easy concentration audit | `reports/systematic_testing/SESSION714A_CALIBRATION_REVIEW_RESULTS.json` |
| S715 | 2026-07-26 | DL-031: Scenario-calculation + definitional (124 items) | `reports/systematic_testing/SESSION715_RECALIBRATION_DECISIONS.json` |
| S716 | 2026-07-26 | DL-032: Case-bank calibration (472 items) | `reports/systematic_testing/SESSION716_RECALIBRATION_RESULTS.json` |
| S717 | 2026-07-26 | Calibration governance validation audit | `reports/systematic_testing/SESSION717_CALIBRATION_GOVERNANCE_VALIDATION_AUDIT.md` |
| S718 | 2026-07-26 | CognitiveLevel field enrichment (2,425 items) | `reports/session_status/SESSION718_SESSION_SUMMARY.md` |
| S719 | 2026-07-26 | Difficulty × CognitiveLevel alignment (542 items analyzed, 244 severe) | `reports/systematic_testing/SESSION719_ALIGNMENT_DECISIONS.json`, `SESSION719_BOUNDARY_ANALYSIS.json`, `SESSION719_GOVERNANCE_AUDIT.json`, `SESSION719_PACK_E_FINDINGS.json` |

### 8.3 Key Supporting Reports

| Document | Location | Purpose |
|----------|----------|---------|
| SESSION_STATUS_2026-07-24.md | `reports/session_status/` | Current certified pool state (2,031 items). |
| SESSION719_RULE_VALIDATION_AUDIT.json | `reports/systematic_testing/` | DCS v1.0 internal consistency review (Agent B). 3 blockers identified. |
| SESSION719_MISALIGNMENT_CENSUS.json | `reports/systematic_testing/` | Complete 1,604-item DCS §3 misalignment inventory (Agent A). |
| SESSION719_DISTRIBUTION_ANALYTICS.json | `reports/systematic_testing/` | Pre/post recalibration difficulty and CL distribution projections. |
| SESSION719_SECOND_PASS_REVIEW.json | `reports/systematic_testing/` | Review of Agent C decisions against item-content evidence (55 stems sampled). |

### 8.4 DCS v1.1 Recommended Additions (from Agent E)

These were not yet incorporated into DCS v1.0 as of S719. They represent the boundary decision trees formalized in §2 of this guide:

1. **§3a:** CL Boundary Decision Tree — Remember vs Understand (same-domain distractor test)
2. **§3b:** CL Boundary Decision Tree — Understand vs Apply (scenario operativity test)
3. **§3c:** CL Boundary Decision Tree — Apply vs Analyze (method-selection test)
4. **§3d:** CL Boundary Decision Tree — Analyze vs Evaluate (judgment test)
5. **§3e:** CL Determination Protocol — sequential, independent CL then Difficulty
6. **§3f:** Forbidden CL Triggers — explicit catalog
7. **§X:** Template CL Assignment Audit Rule — any template-assigned CL must be flagged

These are documented here pending formal incorporation into DCS v1.1.

---

## 9. Implementation History

| Event | Date | Summary |
|--------|------|---------|
| S719 Alignment Guide | 2026-07-26 | Initial maintenance guide. Codifies boundary decision trees, confidence gates, escalation criteria, and drift detection from S713-S719 calibration framework. |
| DCS v1.0 | 2026-07-26 | Primary calibration standard — CL→Difficulty mapping, secondary modifiers, cross-lane consistency. |

---

## 10. Key Recommendations (Executive Summary)

### For Future Content Authors

1. **Assign CL by cognitive demand, not template position.** Use the §2 decision trees. 1,604 of 2,425 items (66%) were structurally misaligned with DCS §3 defaults because CL was assigned by template position in rotation groups.

2. **Never use "Which response is most appropriate?" as a CL trigger.** This template filler was the single largest source of CL inflation — 168 items falsely labeled Evaluate because of three words in the stem.

3. **Same-domain distractors → Understand, not Remember.** The single largest structural error (284 items, Pack E). If all 4 answer choices are from the same narrow domain, the candidate must comprehend the concept to discriminate. Pure recognition requires distractors from entirely different domains.

4. **Pack E needs complete CL reclassification.** 284 of 386 Remember items (74%) are actually Understand. 500 items labeled Moderate-Easy through Difficult but testing Remember/Understand at inflated difficulties. This is the single largest calibration defect remaining after S719.

5. **Do not inflate Analyze to meet CAQS §6.2 targets.** The pool has ~25 genuine Analyze items. Template clones labeled Analyze (48 items) should be reclassified down, not preserved. Create Analyze items through deliberate content authoring — never through template labeling.

### For Reviewers and Auditors

6. **DCS §3 strict defaults produce 1,604 "misalignments" — most are non-severe.** The DCS default is a floor, not a ceiling. ±1 deviations supported by modifiers are normal. Only gaps ≥2 levels constitute genuine calibration defects.

7. **Confidence=86 and Confidence=100 are template defaults, not review scores.** ~170 items carry these values without independent verification. Treat as unreviewed (§4.2).

8. **Run the §6 drift-detection process quarterly.** The root cause of pool-wide miscalibration (template-based assignment) was invisible for S711-S717 because no boundary analysis was performed.

9. **EScalation is mandatory when 3 reviewers disagree or CL confidence < 50.** The escalation criteria in §7 are not informational — they block certification.

---

*End of Alignment Maintenance Guide v1.0*
