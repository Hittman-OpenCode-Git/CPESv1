# S121 — Part 2 Portfolio Targets

**Version:** 1.0
**Status:** Active — Immutable Baseline
**Authority:** PROJECT_CONSTITUTION.md, CAQS_v1.0.md
**Session:** S121 (2026-07-31)
**Applies To:** Part 1 + Part 2 — all packs, all waves, all content sessions

---

## 1. Purpose

This document establishes the **immutable portfolio distribution targets** for the CMA Part 1 & Part 2 Exam Simulator. These targets are **hard constraints** — no content wave, certification pass, or difficulty recalibration may deviate from them without explicit governance authorization and a corresponding REVISION_HISTORY entry.

The targets prevent the exact class of problem that Part 1 spent months correcting: pack-level skew, template-based difficulty inflation, cognitive relabeling without content change, and answer-position bias.

**Operating principle:** These targets are set before authoring. The portfolio is measured against them. Gaps are filled by authoring new content — not by relabeling existing content.

---

## 2. Difficulty Distribution Targets

| Difficulty | Score | Target % | Rationale |
|------------|-------|----------|-----------|
| Easy | 1 | **15%** | Foundational recall — definitions, formula identification, basic terminology |
| Moderate-Easy | 2 | **20%** | Simple application — single-step calculations, concept interpretation |
| Moderate | 3 | **30%** | Core CMA competency — multi-step calculations, standard analysis |
| Difficult | 4 | **25%** | Advanced — multi-variable problems, analytical judgment |
| Very Difficult | 5 | **10%** | Capstone — integrated reasoning, strategic recommendations |

**Tolerance:** Per-pack deviation of ±3 percentage points per tier is acceptable. Deviations beyond ±3pp require a documented rationale in the wave's authoring plan.

**Anti-pattern:** Pack A Wave 1 (P2-004): 100% of items at Difficult/Very Difficult, zero at Easy/Moderate-Easy. This causes learner fatigue, distorts analytics, and requires corrective rebalancing waves.

**Source:** CAQS_v1.0.md §6.1, DCS v1.1 §2

---

## 3. Cognitive Level Distribution Targets

### 3.1 Domain B (Corporate Finance)

| Level | Target % | Rationale |
|-------|----------|-----------|
| Remember | **10%** | Key formulas, definitions, capital structure theories |
| Understand | **20%** | Interpret ratios, explain risk metrics, explain financing tradeoffs |
| Apply | **40%** | Compute WACC, calculate EOQ, derive CAPM required return |
| Analyze | **20%** | Compare financing alternatives, interpret CCC trends, assess portfolio risk |
| Evaluate | **10%** | Recommend capital structure, evaluate investment proposals, strategic decisions |

### 3.2 Domain C (Decision Analysis)

| Level | Target % | Rationale |
|-------|----------|-----------|
| Remember | **8%** | CVP formula, relevant cost definition, capital budgeting terminology |
| Understand | **17%** | Interpret NPV vs IRR, explain incremental analysis, break-even interpretation |
| Apply | **45%** | Compute NPV/IRR, calculate relevant costs, perform differential analysis |
| Analyze | **20%** | Compare investment alternatives, sensitivity analysis, what-if scenarios |
| Evaluate | **10%** | Make-or-buy decisions, capital rationing recommendations, strategic pricing |

### 3.3 General (Per-Domain Adjustment)

For domains A, D, E, F — apply the following default targets pending domain-specific calibration:

| Level | Default Target |
|-------|---------------|
| Remember | 10% |
| Understand | 20% |
| Apply | 40% |
| Analyze | 20% |
| Evaluate | 10% |

**Rule:** Domain-specific targets override defaults. Defaults apply when no domain-specific calibration exists. Targets are set *before* authoring begins, not retroactively applied to existing content.

**Source:** CAQS_v1.0.md §6.2 (Bloom's Taxonomy Distribution), TAXONOMY_REGISTRY.md §1

---

## 4. Answer Position Balance Targets

| Choice Position | Target % | Tolerance |
|----------------|----------|-----------|
| A | **25%** | 22–28% |
| B | **25%** | 22–28% |
| C | **25%** | 22–28% |
| D | **25%** | 22–28% |

**Anti-pattern:** Pack A Part 1: 34% B, 18% D (16pp gap). Pack B Part 2 Wave 1: exact 25/25/25/25 — this is the standard.

**Detection:** Answer position bias must be checked per-section, not just per-pack. A pack can be perfectly balanced while Section A is 40% B and Section D is 40% A — the biases cancel but the learner still receives a biased test.

**Source:** CAQS_v1.0.md §6.5 (Guessability Criteria), §6.6 (Answer Pattern Analysis)

---

## 5. Governance Rule — Cognitive-First Assignment (Rule 12)

### 5.1 Policy

**Prohibited:**
- "We need more Evaluate items" → relabel an existing Apply item to Evaluate
- "This section is too heavy on Apply" → change CognitiveLevel without changing the question
- Template-based difficulty/cognitive assignment (e.g., "position 3 in the rotation = Analyze")

**Required:**
- Question demand determines cognitive level at authoring time
- Cognitive level is assigned before the question is written
- Portfolio gaps are filled by authoring new content — not by relabeling existing content
- Any CognitiveLevel change to an existing item must be accompanied by a corresponding content change (stem, choices, distractors, explanation) that justifies the new classification

### 5.2 Enforcement

This policy is enforced at BLOCK level by:
- **Part 1:** `governance-guard.js` Rule 12
- **Part 2:** `governance_guard_p2.js` Rule 12

The enforcement mechanism flags any write that changes an item's `CognitiveLevel` field without also changing the question's content (Stem, Choices, ExplanationCorrect, or at least one ExplanationWrong field). A `CognitiveLevel` change with zero content change is BLOCKED.

### 5.3 BLOCK-AUTHORIZED Exceptions

A cognitive-level-only change (no content change) is permitted ONLY when accompanied by a `BLOCK-AUTHORIZED` marker AND:
1. Independent cognitive review supports the reclassification
2. The item's content genuinely matches the new cognitive level (a pre-existing labeling error, not inflation)
3. REVISION_HISTORY entry documents the review and reclassification

---

## 6. Portfolio Measurement Cadence

| Frequency | Check | Against |
|-----------|-------|---------|
| **Every content wave** | Per-pack difficulty + cognitive distribution | §2 + §3 targets |
| **Every 100 items authored** | Cross-pack answer position audit | §4 targets |
| **Pre-certification** | Per-section answer position audit | §4 per-section rule |
| **Quarterly** | Pool-wide distribution recalibration | All targets |

**Automation:** `scripts/s121_portfolio_dashboard.js` provides live current-vs-target comparisons across all packs (Part 1 and Part 2).

---

## 7. Target Immutability

These targets are **not subject to per-wave override**. They represent the psychometric requirements of a legitimate examination simulator.

**To change a target:**
1. Document the proposed change with rationale
2. Assess impact on all existing packs
3. Obtain explicit program manager authorization
4. Bump this document's version to 2.0
5. Log in both REVISION_HISTORY.md and REVISION_HISTORY_P2.md

No single content wave, agent, or session may unilaterally modify these targets.

---

## 8. Cross-References

| Document | Relationship |
|----------|-------------|
| CAQS_v1.0.md §6 | Authoritative source for difficulty + cognitive distribution targets |
| DCS v1.1 | Difficulty Calibration Standard — detailed CL-to-Difficulty mapping |
| TAXONOMY_REGISTRY.md | Permitted CognitiveLevel enumeration values |
| governance-guard.js Rule 12 | P1 enforcement of Cognitive-First Assignment |
| governance_guard_p2.js Rule 12 | P2 enforcement of Cognitive-First Assignment |
| s121_portfolio_dashboard.js | Automated distribution measurement |

---

## 9. Revision History

| Version | Date | Session | Summary |
|---------|------|---------|---------|
| 1.0 | 2026-07-31 | S121 | Initial establishment. Immutable difficulty, cognitive, and answer position targets. Rule 12 governance policy. Measurement cadence. Supersedes ad-hoc per-wave planning. |
