# Session 94P — Quality Gates for Cognitive Classification

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Foundation:** BLOOM'S TAXONOMY (Anderson & Krathwohl revision) + CMA Part 1 IMA CSO
**Status:** COMPLETE

---

## 1. Purpose

This document defines the formal, testable criteria for classifying CMA Part 1 examination items as **Evaluate** or **Analyze** under Bloom's revised taxonomy. These gates serve as:

1. **Certification standard** — No item may carry an Evaluate or Analyze label without passing all applicable gates
2. **Audit standard** — Independent auditors use these criteria to verify existing classifications
3. **Authoring standard** — Item authors design to these criteria from the start
4. **Automated enforcement** — Gate criteria are designed for implementability in governance-guard Rule 10

---

## 2. Cognitive Level Definitions (CMA Part 1 Specific)

### 2.1 Evaluate — "Making Judgments Based on Criteria and Standards"

The candidate makes a professional judgment by weighing competing alternatives against explicit criteria where no single deterministic rule or formula dictates the answer.

**Must satisfy ALL four criteria:**

| # | Criterion | Test | Counter-Example |
|---|-----------|------|-----------------|
| E1 | **Decision maker** | A named stakeholder (or clearly identifiable professional role) is making a choice between alternatives | "Which of the following is correct?" — no decision maker, no choice |
| E2 | **Competing alternatives** | Two or more defensible options exist; no option is obviously wrong at first glance | Only one option survives a one-step calculation or rule application |
| E3 | **Judgment under uncertainty** | No single deterministic rule, standard, or formula produces the uniquely correct answer | "Under ASC 606, which treatment is required?" — the standard dictates the answer |
| E4 | **Selection/Recommendation** | The task requires choosing or recommending among the alternatives, not just identifying the correct fact | "Calculate the variance" — execution, not selection |

### 2.2 Analyze — "Breaking Material into Constituent Parts and Determining How Parts Relate"

The candidate breaks down information into components, identifies relationships or patterns, and explains why something occurred or how elements connect.

**Must satisfy at least TWO of the following (with at least one from A1-A2):**

| # | Criterion | Test | Counter-Example |
|---|-----------|------|-----------------|
| A1 | **Cause-effect** | The item asks why something happened or what caused a specific outcome | "What is the fixed overhead volume variance?" — identification, not causation |
| A2 | **Pattern recognition** | Multiple data points must be compared to identify trends, relationships, or anomalies | Single data point with one correct interpretation |
| A3 | **Decomposition** | A complex situation must be broken into components; misclassifying one component changes the answer | "Apply the formula" — no decomposition required |
| A4 | **Relationship evaluation** | Understanding how two or more variables or concepts interact | Knowing one fact is sufficient to answer |

### 2.3 Apply — "Carrying Out or Using a Procedure"

The candidate executes a known procedure, applies a known rule, or substitutes numbers into a known formula.

**Any ONE of these disqualifies Analyze/Evaluate:**

| # | Disqualifier | Example |
|---|-------------|---------|
| D1 | Known formula with number substitution | "EVA = NOPAT − (WACC × invested capital)" → Apply |
| D2 | Known rule directly applied | "Under ASC 450, accrue if probable and reasonably estimable" → Apply |
| D3 | Single correct procedure yields the answer | "Compute depreciation using straight-line method" → Apply |
| D4 | One-step comparison or lookup | "Does the variance exceed the threshold?" → Apply |

### 2.4 Understand — "Constructing Meaning"

The candidate explains concepts, interprets meaning, or classifies items into known categories.

**Any ONE of these disqualifies Analyze/Evaluate:**

| # | Disqualifier | Example |
|---|-------------|---------|
| U1 | Definition-to-term matching | Stem: "continuous improvement targeting small, incremental cost reductions" → Answer: "Kaizen costing" |
| U2 | Single-concept classification | "Which COSO component does ethics training support?" → Understand |
| U3 | One-step interpretation without analysis | Interpreting what a ratio means (not analyzing why it changed) |

### 2.5 Remember — "Retrieving Relevant Knowledge"

The candidate retrieves a fact, definition, or label from memory with no interpretation.

**This always disqualifies Analyze/Evaluate:**

| # | Disqualifier | Example |
|---|-------------|---------|
| R1 | Pure recall | "What does the acronym EVA stand for?" — Remember |
| R2 | Label identification | "Segregation of duties means assigning different employees to authorize, record, and reconcile transactions" → Answer: "Segregation of duties" |

---

## 3. Automated Detection Gates

These gates are designed for implementation in governance-guard Rule 10.

### 3.1 Gate G-DEF — Definition Match Detection

**Rule:** If the Jaccard similarity between stem significant words and correct answer choice significant words exceeds 70%, the cognitive level is capped at **Understand**.

**Rationale:** When the stem is essentially the textbook definition and the answer is the defined term, the item tests recognition (Understand), not analysis or judgment.

**Implementation:**
```
For each item where CognitiveLevel ∈ {Analyze, Evaluate}:
  stem_words = tokenize(stem) - stop_words
  correct_words = tokenize(choices[CorrectChoice]) - stop_words
  overlap = |stem_words ∩ correct_words| / |stem_words ∪ correct_words|
  if overlap > 0.70 → BLOCK (downgrade to Understand)
```

**Known true positives from S93P:**
- P1-EC-005: "segregation of duties" in stem and answer → Remember
- P1-EC-020: "locked warehouse, badge access" → "preventive physical control" → Remember
- P1-DD-036: "ongoing cost reduction targets" → "kaizen costing" → Understand
- P1-CD-061: "expressing line items as percentage of revenue" → "common-size vertical analysis" → Understand

### 3.2 Gate G-ANALYZE — Analyze Minimum Criteria Check

**Rule:** If an item carries `CognitiveLevel: "Analyze"` but satisfies fewer than 2 of criteria A1-A4 (with at least one from A1-A2), **BLOCK** the Analyze label.

**Implementation:**
```
For each item where CognitiveLevel == "Analyze":
  score = 0
  if has_cause_effect(item): score += 1  // A1
  if has_pattern_recognition(item): score += 1  // A2
  if has_decomposition(item): score += 1  // A3
  if has_relationship_eval(item): score += 1  // A4
  has_core = (has_cause_effect OR has_pattern_recognition)
  if score < 2 OR NOT has_core → BLOCK
```

**Heuristic indicators for each criterion:**

| Criterion | Heuristic Signal |
|-----------|-----------------|
| A1 (cause-effect) | Stem contains "why," "what caused," "what explains," "due to" |
| A2 (pattern recognition) | ≥2 data points to compare; trend, variance pattern, ratio comparison language |
| A3 (decomposition) | Multiple sub-parts must be identified; misclassifying one changes outcome |
| A4 (relationship) | Two or more variables/factors interact; "how does X affect Y" |

### 3.3 Gate G-EVAL-1 — Decision Maker Check

**Rule:** If an item carries `CognitiveLevel: "Evaluate"` but has no identifiable decision maker (named stakeholder or professional role making a choice), **BLOCK** the Evaluate label.

**Implementation:**
```
For each item where CognitiveLevel == "Evaluate":
  if NOT (has_named_stakeholder(stem) OR has_professional_role_choice(stem)):
    → BLOCK (flag: "No decision maker")
```

**Heuristic:** Stem contains role titles (Controller, CFO, Manager, Director, Analyst, Auditor) AND decision verbs (recommend, assess, evaluate, choose, select, determine which).

### 3.4 Gate G-EVAL-2 — Competing Alternatives Check

**Rule:** If an item carries `CognitiveLevel: "Evaluate"` but fewer than 2 answer choices are defensible (not obviously wrong on first reading), **BLOCK** the Evaluate label.

**Implementation:**
```
For each item where CognitiveLevel == "Evaluate":
  defensible_count = count of choices that survive:
    - NOT obvious nonsense
    - NOT eliminated by one-step calculation
    - NOT eliminated by known rule application
  if defensible_count < 2 → BLOCK
```

**Note:** This gate requires the strongest heuristic and may produce false positives. Designed for automated flagging with human review, not automatic rejection.

### 3.5 Gate G-EVAL-3 — Deterministic Rule Check

**Rule:** If an item carries `CognitiveLevel: "Evaluate"` and the correct answer is produced by a single, named deterministic rule (ASC section, known formula, defined GAAP treatment), **BLOCK** the Evaluate label.

**Implementation:**
```
For each item where CognitiveLevel == "Evaluate":
  if (stem OR explanationCorrect) contains:
    "Under ASC XXX..."  (single rule determines answer)
    OR "The formula is..." (single formula produces answer)
    OR "GAAP requires..." (single standard dictates answer)
    AND the item has no competing alternatives that are also GAAP-compliant
  → BLOCK (flag: "Deterministic rule application")
```

### 3.6 Gate G-EVAL-4 — Difficulty Floor Check

**Rule:** If an item carries `CognitiveLevel: "Evaluate"` AND `Difficulty` ≤ Moderate-Easy (score 2), **BLOCK** — either downgrade cognitive level or upgrade difficulty to ≥ Moderate (3).

**Rationale:** Evaluation inherently requires Moderate+ difficulty. An Evaluate item at Easy or Moderate-Easy is structurally impossible — either the label is wrong or the difficulty is wrong.

**Implementation:**
```
For each item where CognitiveLevel == "Evaluate":
  if DifficultyScore <= 2 → BLOCK
```

### 3.7 Gate G-STRUCT — Structural Integrity Check

**Rule:** If an item is missing stem, choices, or correct choice, **BLOCK** all cognitive labels above Understand.

**Implementation:**
```
For each item:
  if NOT (stem AND choices AND correctChoice):
    if CognitiveLevel ∈ {Analyze, Evaluate} → BLOCK
```

---

## 4. Manual Verification Criteria

The following criteria cannot be fully automated and require human or AI review:

### 4.1 Evaluate Qualification Checklist

For each item labeled Evaluate, an independent reviewer must confirm:

| # | Check | Pass/Fail |
|---|-------|-----------|
| 1 | Reading only the stem and choices (without answer), could a reasonable CMA candidate defend more than one choice? | |
| 2 | Is there genuine uncertainty? (Not: "Which ASC section applies?" but: "Given these competing factors, which treatment best serves the reporting objectives?") | |
| 3 | Does answering require weighing factors? (Not: "Which number is larger?" but: "Considering both cost and quality, which supplier is optimal?") | |
| 4 | Is the task a recommendation or selection among alternatives, not identification of a fact? | |
| 5 | Does the explanation articulate WHY each alternative is suboptimal? (Not: "Option X is incorrect because the formula says so.") | |

### 4.2 Analyze Qualification Checklist

For each item labeled Analyze, an independent reviewer must confirm:

| # | Check | Pass/Fail |
|---|-------|-----------|
| 1 | Does the item require identifying why something happened? (Not just what happened) | |
| 2 | Are multiple data points or factors presented that must be connected? | |
| 3 | Does the explanation trace a reasoning chain from data to conclusion? | |
| 4 | Could the item be answered correctly by someone who only knows the formula but doesn't understand the business context? (If yes → NOT Analyze) | |

---

## 5. Classification Decision Tree

```
Is the stem a textbook definition?
  ├─ YES → Is answer the defined term?
  │         ├─ YES → Remember (if label is higher: MISCLASSIFIED → downgrade)
  │         └─ NO  → Understand (if label is higher: MISCLASSIFIED → downgrade)
  └─ NO  → Is there a single deterministic rule/formula that produces the answer?
            ├─ YES → Does the item require interpretation beyond applying the rule?
            │         ├─ YES → Apply (borderline Analyze if multiple data points must be connected)
            │         └─ NO  → Apply (if labeled Analyze/Evaluate: MISCLASSIFIED → downgrade to Apply)
            └─ NO  → Does the item require weighing competing alternatives?
                      ├─ YES → Are all 4 Evaluate criteria satisfied?
                      │         ├─ YES → Evaluate
                      │         └─ NO  → Analyze (if 2+ Analyze criteria met), else Apply
                      └─ NO  → Does the item require cause-effect or pattern recognition?
                                ├─ YES → Analyze
                                └─ NO  → Apply or Understand
```

---

## 6. Gold Standard Exemplars

### 6.1 True Evaluate

**P1-B-085** (Pack A Section B): "The controller must recommend a sourcing strategy considering four competing alternatives: bulk discount (lower per-unit cost, higher inventory), JIT (minimum inventory, supply risk), status quo (no disruption, higher cost), or hybrid (moderate inventory, moderate cost). Which recommendation best balances cost, risk, and operational continuity?"

**Why it passes:**
- E1: Controller making a recommendation ✓
- E2: Four genuinely competing alternatives ✓
- E3: No formula — must weigh cost vs. risk vs. disruption ✓
- E4: Recommend/select among alternatives ✓

### 6.2 True Analyze

**P1-B-022** (Pack A Section B): Learning curve analysis — "The production team reports these 5-batch deviation trends: [data]. Does the pattern indicate progressive process deterioration or random fluctuation consistent with an 80% learning curve?"

**Why it passes:**
- A1: Cause-effect — why the deviation pattern exists ✓
- A2: Pattern recognition — comparing 5 data points to identify trend ✓
- A3: Decomposition — distinguishing learning curve effects from process deterioration ✓
- NOT deterministic: requires interpreting the pattern, not just applying a formula ✓

### 6.3 What True Evaluate Does NOT Look Like

**P1-EC-005** (Pack C Section E, labeled Evaluate, actually Remember):
- Stem: "Assigning different employees to authorize, record, and reconcile transactions is an example of which internal control principle?"
- Why it fails: Stem IS the definition of segregation of duties. Answer IS the term. Pure recall.

**P1B-C-143** (Pack B Section C, labeled Evaluate, actually Apply):
- Stem: "Recommend whether to continue operations based on EVA..."
- Why it fails: EVA = NOPAT − (WACC × IC). Known formula. Plug numbers. Single deterministic answer.

---

## 7. Governance Integration

### 7.1 Rule 10 Specification

```
RULE 10 — Cognitive Classification Gates
Level: BLOCK
Applies to: Any write/edit that changes CognitiveLevel field to "Evaluate" or "Analyze"
Enforcement: Automated via governance-guard.js

Block conditions:
  - G-DEF: Stem-to-correct-choice overlap > 70% → cap at Understand
  - G-ANALYZE: <2 Analyze criteria met (with ≥1 core) → BLOCK Analyze
  - G-EVAL-1: No decision maker → BLOCK Evaluate
  - G-EVAL-2: <2 defensible alternatives → BLOCK Evaluate
  - G-EVAL-3: Deterministic rule/standard produces answer → BLOCK Evaluate
  - G-EVAL-4: Difficulty ≤ 2 AND Evaluate → BLOCK
  - G-STRUCT: Missing structural fields → BLOCK all HO labels
```

### 7.2 Test Suite Expansion

Rule 10 adds ~12 tests to `test_governance_guard.js`:
- 4 tests: G-DEF catches definition-match as Evaluate/Analyze
- 2 tests: G-EVAL-1 catches missing decision maker
- 2 tests: G-EVAL-2 catches single-defensible-option items
- 2 tests: G-EVAL-3 catches deterministic rule items
- 1 test: G-EVAL-4 catches Easy+Evaluate
- 1 test: G-STRUCT catches missing-field items

### 7.3 Validator Integration

A `CognitiveValidator` module in `scripts/validators/` can run these gates as a pre-certification audit step. This is optional — the primary enforcement is via governance-guard at write/edit time.

---

## 8. Revision History

| Date | Change |
|------|--------|
| 2026-07-31 | Initial version — S94P Quality Gates. 7 automated gates defined. Criteria derived from S93P 150-item classification audit. |

---

*Generated: 2026-07-31 | Session 94P Implementer Phase — Quality Gates*
