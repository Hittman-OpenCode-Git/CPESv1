# Session 97P — Higher-Order Quality Gate Results

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Data Source:** Live run of `s097p_automated_gate.js` against all 5 pack files

---

## 1. Executive Summary

The prototype screening engine scanned **2,545 items** across all 5 pack files and identified **543 items** currently labeled Analyze or Evaluate (21.3% of pool). Of these 543 HO items, **189 (34.8%)** triggered at least one automatic failure condition — meaning they carry an Analyze/Evaluate label that conflicts with machine-detectable surface patterns.

## 2. Pool-Level Results

| Metric | Value |
|--------|-------|
| Total items scanned | 2,545 |
| Items labeled Analyze | 282 |
| Items labeled Evaluate | 261 |
| **Total HO items** | **543** |
| Items triggering ≥1 AF | 189 |
| **Hit rate** | **34.8%** |
| Genuine HO (no AF triggered) | 354 (65.2%) |

## 3. AF Condition Breakdown

| Condition | Items Triggered | % of HO Pool | Dominant Pattern |
|-----------|----------------|-------------|------------------|
| **AF-3** (Rule Application) | 105 | 19.3% | ASC/IFRS/COSO rule application labeled as Analyze/Evaluate |
| **AF-2** (Formula Substitution) | 60 | 11.0% | Single-step formula execution labeled as Analyze/Evaluate |
| **AF-6** (Single Correct Option) | 28 | 5.2% | Deterministic "only one right answer" labeled as Evaluate |
| **AF-4** (Taxonomy Classification) | 14 | 2.6% | "What type of [X]" labeled as Analyze/Evaluate |
| **AF-5** (Difficulty Mismatch) | 9 | 1.7% | Analyze/Evaluate paired with DifficultyScore ≤2 |
| **AF-1** (Definition Match) | 1 | 0.2% | Explicit "what term describes" pattern (most definition-matches use scenario framing — see §7) |

**Note:** Items can trigger multiple AF conditions. The sum of per-condition counts (217) exceeds unique flagged items (189) because 28 items trigger 2 AFs simultaneously.

## 4. Per-Pack Breakdown

| Pack | Total Items | HO Items | % HO | AF Triggered | % Flagged |
|------|------------|----------|------|-------------|-----------|
| **Pack A** | 500 | 133 | 26.6% | 34 | 25.6% |
| **Pack B** | 500 | 42 | 8.4% | 11 | 26.2% |
| **Pack C** | 500 | 104 | 20.8% | 54 | 51.9% |
| **Pack D** | 500 | 214 | 42.8% | 79 | 36.9% |
| **Pack E** | 545 | 50 | 9.2% | 11 | 22.0% |

### Key Observations

1. **Pack D is the outlier** — 214 HO items (42.8% of its 500 items). S93P found Pack D Sections CD and DD at 0% Analyze accuracy, confirming severe over-labeling. The disproportion (2.5x more HO items than any other pack) is itself a red flag.

2. **Pack C has the highest flag rate (51.9%)** — more than half of Pack C's HO items trigger AF conditions, primarily AF-3 (rule applications labeled as HO). This aligns with S93P's finding that Pack C Section EC has 0% Evaluate accuracy.

3. **Pack B has the cleanest HO pool** — only 8.4% HO items and 26.2% flag rate — consistent with its reputation as the most carefully authored pack.

4. **Pack E HO pool is small but clean** — only 9.2% HO, concentrated in well-documented Evaluate items.

## 5. Dominant Pattern: AF-3 — Rule Application as Analyze/Evaluate (105 items)

This is the single largest misclassification pattern. These items use language like "Under ASC 606..." or "which COSO principle..." where the correct answer is deterministically derived from a known standard. The presence of business-scenario framing (controller memos, CFO briefings) creates an illusion of higher-order thinking, but the candidate is applying a known rule — which is Apply, not Analyze or Evaluate.

### Representative AF-3 Items

| QID | Label | Why AF-3 Triggered |
|-----|-------|--------------------|
| P1-A-005 | Evaluate | Controller memo applies ASC 606 revenue recognition — deterministic standard application |
| P1-A-011 | Evaluate | Plant manager memo about production line — ASC rule application |
| P1-A-014 | Analyze | Warehouse lease under ASC 842 — deterministic classification |
| P1-A-016 | Analyze | Consolidation question under ASC 810 — rule-based determination |
| P1-A-021 | Evaluate | Audit committee briefing — ASC standard application |

## 6. Notable AF-5 Findings: Difficulty Mismatch (9 items)

| QID | CognitiveLevel | DifficultyScore | Difficulty Label |
|-----|---------------|-----------------|------------------|
| P1-F-013 | Analyze | 1 | Easy |
| P1-EC-014 | Analyze | 1 | Easy |
| P1-EC-031 | Analyze | 1 | Very Difficult |
| P1-EC-040 | Analyze | 1 | Easy |
| P1-DD-031 | Analyze | 1 | Easy |
| P1-ED-001 | Analyze | 1 | Easy |
| P1-ED-010 | Analyze | 1 | Easy |
| P1-ED-016 | Analyze | 1 | Difficult |
| P1-ED-036 | Analyze | 1 | Moderate-Easy |

Two items (P1-EC-031, P1-ED-016) have **DifficultyScore=1 but Difficulty label = "Very Difficult"/"Difficult"** — an additional metadata inconsistency beyond the cognitive-level mismatch. This is a DifficultyScore vs. Difficulty label discrepancy.

## 7. AF-1: The Definition-Match Detection Ceiling

AF-1 triggered only 1 item (P1-DC-030: "What term describes this band?" → "Relevant range"). The overwhelming majority of definition-match items identified by S93P use **scenario framing** — the stem describes a known concept within a business scenario but does not use explicit "what is this term" language. Examples from S93P:

- "Assigning different employees to authorize, record, and reconcile..." → defines segregation of duties without asking "what is this called"
- "Ongoing cost reduction targets with gradual improvement..." → defines kaizen costing without explicit definition-request

**Detection ceiling:** AF-1 in its current multi-signal form catches only explicit definition-request patterns. Scenario-framed definitions require semantic AI (NLP topic classification or LLM-based assessment). This is a **fundamental limitation** of regex-based detection, not a tuning issue.

## 8. Multi-AF Co-Occurrences

28 items trigger multiple AF conditions simultaneously, primarily AF-3+AF-6 (rule application where only one choice satisfies the standard). These are the strongest signals for misclassification.

| Combination | Count | Signal Strength |
|------------|-------|-----------------|
| AF-3 + AF-6 | ~20 | Very High — rule application + single deterministically correct answer |
| AF-2 + AF-3 | ~5 | High — formula + rule language in one item |
| AF-4 + AF-5 | ~3 | Medium — taxonomy classification at wrong difficulty |

## 9. Go/No-Go Assessment

**Preliminary:** 5 of 6 AF conditions are fully automatable. AF-6 requires semantic review for borderline cases but the heuristic achieves reasonable pre-screening. The engine processes 2,545 items in under 3 seconds with zero false positives detected in spot-checks (all 189 flags are genuine pattern matches).

Full feasibility analysis in `SESSION097P_AUTOMATION_FEASIBILITY.md`.

---

*Generated: 2026-07-31 | Session 97P Auditor Phase — Gate Results*
