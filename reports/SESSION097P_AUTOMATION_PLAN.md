# Session 97P — Higher-Order Quality Gate Automation Plan

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Status:** ACTIVE
**Reference:** SESSION095P_HO_CERTIFICATION_PLAN.md, CAQS v1.0 §6.2, S93P Evaluate & Analyze Audits

---

## 1. Objective

Build a prototype screening engine that applies the S95P automatic failure conditions (AF-1 through AF-6) to all 2,545+ items across the 5 pack files before human review. The engine identifies which items currently labeled Analyze or Evaluate fail machine-detectable patterns and should be reclassified.

**Restrictions:** No pack edits. No certification changes. No baseline edits. No registry modifications.

## 2. Engine Design

### 2.1 Architecture

```
                    ┌─────────────────────────┐
                    │  String-Aware Parser     │
                    │  (extract JSON objects    │
                    │   from pack_*.js files)   │
                    └───────────┬───────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │  HO Filter               │
                    │  CognitiveLevel ∈        │
                    │  {Analyze, Evaluate}     │
                    └───────────┬───────────────┘
                                │
                    ┌───────────┴───────────────┐
                    │   Six AF Detection Gates   │
                    │                            │
                    │  AF-1: Definition Match    │
                    │  AF-2: Formula Substitution│
                    │  AF-3: Rule Application    │
                    │  AF-4: Taxonomy Classify   │
                    │  AF-5: Difficulty Mismatch │
                    │  AF-6: Single Correct Opt  │
                    └───────────┬───────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │  Results Output           │
                    │  s097p_gate_results.json  │
                    │  + flagged items list     │
                    │  + per-pack breakdown     │
                    │  + AF frequency analysis  │
                    └─────────────────────────┘
```

### 2.2 Detection Rules

| Gate | Detection Method | Automatability |
|------|-----------------|----------------|
| **AF-1** | Multi-signal: (a) lexical overlap Jaccard > 0.40, (b) definition-request language regex, (c) term-length answer < 80 chars, (d) stem >> answer length. Needs ≥3 of 4 signals. | PARTIALLY — explicit "what is this term" patterns detectable; scenario-framed definitions require semantic AI |
| **AF-2** | Calc verb regex + formula pattern in ExplanationCorrect + short stem. Score ≥ 2 of 3 triggers. | FULLY — all signals are surface-level text patterns |
| **AF-3** | "Under ASC/IFRS/COSO/GAAP" regex in stem or EC AND absence of trade-off language ("trade-off", "competing", "balance", "select the best"). | FULLY — deterministic regex cross-check |
| **AF-4** | "What type of [control/cost]" or "Which COSO component" pattern regex. 7 pattern variants. | FULLY — surface pattern matching |
| **AF-5** | `DifficultyScore ≤ 2` AND `CognitiveLevel ∈ {Analyze, Evaluate}`. | FULLY — direct field comparison |
| **AF-6** | Heuristic: ≤1 unique standard in EC + ≥2 formulaic distractor EW fields + "only one" language. Score ≥ 2 of 3 triggers HIGH_LIKELIHOOD flag. | HEURISTIC ONLY — confidence annotated; 100% of current flags are HIGH_LIKELIHOOD |

### 2.3 Implementation

Script: `scripts/s097p_automated_gate.js` (Node.js, ~400 lines)

- Uses the same string-aware brace-counter extraction as `scan_logic_inversions.js`
- Processes all 5 pack files: pack_a through pack_e
- Output: `scripts/output/s097p_gate_results.json`
- Runtime: < 3 seconds for 2,545 items

## 3. Expected Outcomes

Based on S93P findings (58.7% misclassification rate on HO items, 528 total HO items):

| AF Condition | Expected Trigger Rate | Risk of False Positive |
|-------------|----------------------|------------------------|
| AF-1 (Definition Match) | Low (~2-5%) | Low — multi-signal threshold conservative |
| AF-2 (Formula Substitution) | Medium (~10-15%) | Moderate — calc verbs can appear in genuine HO items |
| AF-3 (Rule Application) | High (~20-30%) | Low — deterministic rule language is a strong signal |
| AF-4 (Taxonomy Classification) | Low (~3-5%) | Very Low — surface patterns unambiguous |
| AF-5 (Difficulty Mismatch) | Low (~2-3%) | Zero — field comparison is deterministic |
| AF-6 (Single Correct Option) | Low (~5%) | Moderate — heuristic only, flagged for review |

## 4. Success Criteria

- [ ] All 6 AF conditions implemented and functional
- [ ] Engine processes all 5 pack files without errors
- [ ] HO item count matches known baseline (~528 ± tolerance for Pack E R-series)
- [ ] Flagged items include known misclassification exemplars from S93P/S95P
- [ ] Per-AF breakdown reveals dominant misclassification pattern
- [ ] Go/no-go recommendation produced for automated gate deployment
- [ ] 0 file modifications
- [ ] 0 certification state changes
- [ ] 0 overlap with Session 92, S94P, or May workstreams

## 5. Deliverables

| # | Document | Purpose |
|---|----------|---------|
| 1 | `scripts/s097p_automated_gate.js` | Prototype engine source |
| 2 | `scripts/output/s097p_gate_results.json` | Full scan results |
| 3 | `SESSION097P_AUTOMATION_PLAN.md` | This document |
| 4 | `SESSION097P_GATE_RESULTS.md` | Results analysis |
| 5 | `SESSION097P_AUTOMATION_FEASIBILITY.md` | Feasibility + go/no-go |
| 6 | `SESSION097P_FALSE_POSITIVE_ANALYSIS.md` | FP analysis + limitations |
| 7 | `SESSION097P_CLOSEOUT.md` | Session closeout |

## 6. Relationship to Existing Governance

This engine is a **supplement**, not a replacement:
- Complements governance-guard.js Rules 1-9 (structural checks)
- Complements CAQS §1.6 six-dimension verification (substantive quality)
- Adds cognitive-level gate screening (currently ungoverned by automation)
- Does NOT create new governance guard rules — it's a build-time analysis tool

---

*Generated: 2026-07-31 | Session 97P Planner Phase*
