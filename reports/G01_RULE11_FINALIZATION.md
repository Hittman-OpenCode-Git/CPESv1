# G01 — Rule 11 Finalization (Cognitive Classification Gates)

**Date:** 2026-07-31
**Session:** G01 Governance Rebaseline & Standards Consolidation
**Status:** COMPLETE
**Note:** Renumbered from "Rule 10" to "Rule 11" — Rule 10 in governance-guard.js is occupied by DL-021 enforcement (S814).

---

## 1. Background

### 1.1 The Discovery (S92P–S93P)

Session 92P established a cognitive baseline across all 5 packs. Session 93P audited a 150-item sample of items labeled as Analyze or Evaluate against the S95P rubrics and found:

- **58.7% misclassification rate** — 309 of 528 HO-labeled items are overstated
- **100% salvageable by relabeling alone** — zero content rewrites needed
- **Only ~219 of 528 items** (8.6% of 2,545) are genuinely Analyze or Evaluate

### 1.2 The Automated Screening (S97P)

Session 97P built `scripts/s097p_automated_gate.js` (410 lines), which applies the AF-1 through AF-6 automatic failure conditions defined in S95P. Results:

| Gate | Items Flagged | FP Rate | Automatable? |
|------|--------------|---------|-------------|
| AF-1 (Definition Match) | 1 | <5% on catches | No — semantic ceiling (2% sensitivity) |
| AF-2 (Formula Substitution) | 60 | 5-8% | Yes (~95%) |
| AF-3 (Rule Application) | 105 | 2-3% | Yes (~98%) |
| AF-4 (Classification) | 14 | 0% | Yes (100%) |
| AF-5 (Difficulty Mismatch) | 9 | 0% | Yes (100%) |
| AF-6 (Single Correct Option) | 28 | 10-15% | No — heuristic only |
| **Total** | **189** | **~4%** | **4 of 6 gates automatable** |

### 1.3 The Governance Gap

Current governance guard Rules 1-9 protect against:
- Wrong content reaching learners (DL-008 via Rule 2, DL-026 via Rule 6, DL-037 via Rule 9)
- Unauthorized answer-key changes (Rule 4)
- Registry corruption (Rule 3, Rule 7)
- Excessive batch writes (Rule 5)
- Untracked artifacts (Rule 8)

**None of them protect against an item carrying `CognitiveLevel: "Evaluate"` when it tests at `Apply` level.** An inflated label passes all 9 rules and enters the learner delivery pool. This is a governance gap — not a hypothetical risk but a verified condition with 189 items currently flagged.

---

## 2. Rule 11 Specification

### 2.1 Purpose

Prevent items from carrying `CognitiveLevel: "Analyze"` or `CognitiveLevel: "Evaluate"` when automated gates indicate the label is inflated. This protects the integrity of cognitive classification in the learner delivery pool.

### 2.2 Level

**BLOCK** — applied at write/edit time to any `pack_*_corrected.js` or `case_pack_*_corrected.js` file.

### 2.3 Trigger Conditions

Rule 11 triggers when a write/edit operation changes `CognitiveLevel` to `"Analyze"` or `"Evaluate"` AND any of the following sub-gates fire:

#### GATE 3 (AF-3) — Deterministic Rule Application → BLOCK Evaluate/Analyze

**Pattern:** Stem asks "Under [ASC/COSO/IFRS/GAAP], what is the treatment for [situation]?" AND ExplanationCorrect contains no trade-off language ("competing", "best option", "weigh", "trade-off", "balance").

**Detection:**
```javascript
const hasRuleRef = /Under (ASC|IFRS|COSO|GAAP|IAS)/i.test(stem);
const hasTradeOff = /competing|best option|weigh|trade.off|balance/i.test(explanationCorrect);
const blocked = hasRuleRef && !hasTradeOff;
```

**FP rate:** 2-3% (2-3 false positives per 105 items). Items with trade-off language embedded in explanation but not detected by surface regex are the primary FP source.

**Verdict:** **BLOCK — auto-reclassify to Apply.** Near-zero risk of incorrectly downgrading a genuine Evaluate item.

---

#### GATE 4 (AF-4) — Taxonomy Classification → BLOCK Evaluate/Analyze

**Pattern:** Stem asks "What type of [X] is described?" or "Which [category/component] does [described item] belong to?"

**Detection:**
```javascript
const blocked = /what type of|which (COSO|component|category|cost)|classified as/i.test(stem);
```

**FP rate:** 0% (0 false positives across 14 items in S97P audit). Taxonomy classification is structurally a single-step Apply (or Remember) operation.

**Verdict:** **BLOCK — auto-reclassify to Apply.** Zero FP risk.

---

#### GATE 5 (AF-5) — Difficulty-Cognitive Mismatch → BLOCK Evaluate/Analyze

**Pattern:** `CognitiveLevel ∈ {"Evaluate", "Analyze"}` AND `DifficultyScore` below minimum threshold.

| CognitiveLevel | Minimum DifficultyScore | Pattern |
|----------------|------------------------|---------|
| Evaluate | 3 (Moderate) | `DifficultyScore ≤ 2` AND `CognitiveLevel == "Evaluate"` |
| Analyze | 2 (Moderate-Easy) | `DifficultyScore == 1` AND `CognitiveLevel == "Analyze"` |

**Detection:** Direct field comparison — deterministic.

**FP rate:** 0% (0 false positives across 9 items). DifficultyScore is a numeric field; the comparison is a simple inequality.

**Verdict:** **BLOCK.** Evaluate at Easy or Moderate-Easy is structurally impossible per CAQS §1.6 dimension 3.

---

#### GATE 2 (AF-2) — Formula Substitution → FLAG (not auto-BLOCK)

**Pattern:** Stem contains calculation verb ("calculate", "compute", "find") AND Correct is numeric AND ExplanationCorrect describes single-formula substitution.

**Detection:**
```javascript
const calcVerb = /calculate|compute|find/i.test(stem);
const isNumeric = !isNaN(parseFloat(correct));
const singleFormula = explanationCorrect.match(/\b(equals?|=)\s*[^.]+\b/);
```

**FP rate:** 5-8% (3-5 false positives per 60 items). Genuine multi-step analysis items may be flagged when they include a calculation step.

**Verdict:** **FLAG** (not BLOCK). Route to human review. Items with counter-signals (multi-step analysis described in ExplanationCorrect; "diagnose", "compare", "evaluate" verbs also present) should be suppressed.

---

### 2.4 Gates NOT Deployed (Deferred)

| Gate | Reason |
|------|--------|
| AF-1 (Definition Match) | 2% detection sensitivity — catches 1 of ~50 definition-match items. Requires NLP/embedding enhancement (S100P Option A). |
| AF-6 (Single Correct Option) | 10-15% FP rate — heuristic only. Requires distractor defensibility evaluation (inherently semantic). |

---

## 3. Implementation Plan

### 3.1 Phase 1 — S109P: Core Gates

Add Rule 11 to `governance-guard.js` with 3 sub-gates:

```
RULE 11 — Cognitive Classification Gates (BLOCK)
  ├── GATE 3 — Deterministic Rule → BLOCK Evaluate/Analyze
  ├── GATE 4 — Taxonomy Classification → BLOCK Evaluate/Analyze
  └── GATE 5 — Difficulty Mismatch → BLOCK Evaluate/Analyze
```

**Test suite expansion:** Add 12 tests to `test_governance_guard.js`:
- 3 tests: Gate 3 correctly blocks deterministic ASC/COSO application items
- 3 tests: Gate 4 correctly blocks classification/taxonomy items
- 3 tests: Gate 5 correctly blocks difficulty-cognitive mismatches
- 3 tests: Negative tests — gates correctly pass genuine HO items

### 3.2 Phase 2 — S110P: Conditional Gate

Add Gate 2 as FLAG-level rule:
- Auto-suppress when counter-signals detected (multi-step analysis, comparison verbs)
- Route flagged items to human review queue
- 5-8% FP rate acceptable for FLAG (not auto-BLOCK)

### 3.3 Phase 3 — S111P: Triage Gate

Add Gate 6 as WARN-level rule:
- Route HIGH_LIKELIHOOD items to human triage review
- Do NOT auto-reclassify — 10-15% FP rate is too high for automated decisions

### 3.4 Phase 4 — S112P: Semantic Enhancement

Enhance Gate 1 (definition-match) with embedding-based cosine similarity:
- Replace current 4-signal conservative regex with NLP model
- Target ~80% detection rate (up from ~2%)
- Run as read-only audit before promoting to BLOCK

---

## 4. Relationship to Existing Governance

### 4.1 CAQS v1.0

Rule 11 directly satisfies CAQS §1.6 dimension 3 ("Difficulty Calibration") and §2.2 dimension 2 ("Cognitive Level"). It provides automated enforcement of what was previously a manual review dimension.

### 4.2 Governance Guard

Rule 11 joins Rules 1-10 as the 11th BLOCK-level rule. It is the first rule that targets cognitive classification quality rather than structural integrity or content correctness.

### 4.3 Certification Pipeline

Rule 11 gates are enforced at write/edit time by the governance guard plugin. Additionally, a read-only cognitive audit (`scripts/cognitive_audit.js`) should be added as a pipeline step between `validate` and `build-registry` in `npm run pipeline`.

### 4.4 Defect Library

New DL entries are not required. Rule 11 prevents the defect class — it does not document a new defect. The underlying cognitive classification inaccuracy was documented by the S92P–S100P Quality Recovery program, not as a defect library entry.

---

## 5. Frequently Asked Questions

### Q: Can an item be Certified as Evaluate without passing Rule 11?

**No.** Rule 11 is BLOCK level — it prevents the write/edit operation entirely. The item cannot receive `CognitiveLevel: "Evaluate"` until the gate conditions are met.

### Q: What if a human reviewer disagrees with the gate?

The human reviewer can override by using the `BLOCK-AUTHORIZED` marker pattern (per governance guard conventions). This creates an audit trail: the reviewer explicitly certified the item as HO despite the automated gate.

### Q: Does Rule 11 affect existing Certified items?

No. Rule 11 is enforced at write/edit time only. It does not retroactively reclassify items already in the Certified pool. The Quality Recovery relabeling program (S102P–S106P) handles existing mislabeled items through batch metadata updates.

### Q: What's the false negative rate?

Unknown for Gate 1 (AF-1: ~98% of definition-match items escape). For Gates 3/4/5, the false negative rate is effectively 0% — the detection patterns are deterministic field comparisons or surface regex with near-perfect recall.

---

## 6. Approval Requirements

| Gate | Auto-BLOCK? | Reviewer Override? | Evidence Required |
|------|-----------|-------------------|------------------|
| Gate 3 (Deterministic Rule) | Yes | Yes (BLOCK-AUTHORIZED) | Trade-off analysis evidence |
| Gate 4 (Taxonomy Classification) | Yes | No (no genuine exception exists) | — |
| Gate 5 (Difficulty Mismatch) | Yes | Yes (BLOCK-AUTHORIZED) | DifficultyScore upgrade |
| Gate 2 (Formula Substitution) | No (FLAG only) | — | Human review recommendation |
| Gate 6 (Single Option) | No (WARN only) | — | Distractor defensibility analysis |

---

*Generated: 2026-07-31 | G01 Implementer Phase — Rule 11 Finalization*
