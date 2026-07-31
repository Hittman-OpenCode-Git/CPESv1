# Session 93P — Evaluate Classification Audit

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Sample:** 75 of 246 Evaluate-labeled items (30.5%)
**Methodology:** Stratified random sampling + explicit Bloom's taxonomy criteria

---

## 1. Executive Summary

**58.7% of sampled Evaluate-labeled items are misclassified.** The true Evaluate pool is projected at ~102 items (41.3% accuracy), not the 246 currently labeled. The dominant misclassification pattern is Apply-disguised-as-Evaluate (25.3% of sample) and Analyze-disguised-as-Evaluate (20.0%). Critically, 10.7% of sampled Evaluate items are actually Remember-level (definition-to-term matching).

## 2. Aggregate Results

| True Cognitive Level | Count | % of Sample | Classification |
|---------------------|-------|-------------|----------------|
| **Evaluate** | 31 | 41.3% | Correctly labeled |
| Analyze | 15 | 20.0% | Overstated by 1 tier |
| Apply | 19 | 25.3% | Overstated by 2 tiers |
| Understand | 1 | 1.3% | Overstated by 3 tiers |
| Remember | 8 | 10.7% | Overstated by 4 tiers |
| Unclassifiable | 1 | 1.3% | Structural defect |

**Misclassification rate: 58.7% (95% CI: 47.4% – 69.1%)**

## 3. Per-Pack Breakdown

| Pack | Sampled | True Evaluate | Accuracy | Primary Misclass Pattern |
|------|---------|--------------|----------|--------------------------|
| **Pack A** | 20 | 13 | **65.0%** | Section A: ASC rule-application masked as judgment |
| **Pack B** | 8 | 4 | **50.0%** | Formula application labeled as evaluation |
| **Pack C** | 14 | 3 | **21.4%** | Catastrophic: Section EC (COSO) — 0/8 true Evaluate |
| **Pack D** | 18 | 11 | **61.1%** | Section BD (budgeting) — high quality; others mixed |
| **Pack E** | 2 | 0 | **0.0%** | Small sample; both items misclassified |

## 4. Section-Level Hotspots

### High-Quality Sections (≥80% accuracy)

| Section | Pack | Sampled | Accuracy | Notes |
|---------|------|---------|----------|-------|
| **Section F** | Pack A | 5 | **100%** | Technology governance items — genuine evaluation |
| **Section F** | Pack B | 3 | **100%** | Same pattern — technology items well-designed |
| **Section B** | Pack A | 6 | **83%** | Budgeting strategy items — solid evaluative framing |

### Critical Failure Sections (≤25% accuracy)

| Section | Pack | Sampled | Accuracy | Root Cause |
|---------|------|---------|----------|------------|
| **Section EC** | Pack C | 8 | **0%** | COSO framework: definition-matching (EC-005, EC-020), concept comprehension (EC-030), structural defect (EC-?) masquerading as Evaluate |
| **Section A** | Pack A | 4 | **25%** | ASC rule-application: "which treatment does ASC 360/450/606 require?" — deterministic GAAP application |

## 5. Misclassification Patterns

### Pattern 1: ASC Application as Evaluation (Pack A Section A)

**Example:** P1-A-012 — "Accrue $520K for Claim 1 only. Claim 1 is probable (75%) and reasonably estimable..."
- Label: Evaluate
- True: Apply
- Reason: Deterministic application of ASC 450's probable-and-reasonably-estimable framework. The framework dictates the answer.

### Pattern 2: Formula Substitution as Evaluation (Pack B)

**Example:** P1B-C-143 — EVA = NOPAT − (12% × invested capital)
- Label: Evaluate
- True: Apply
- Reason: Known formula. Plug numbers: $200K × 0.70 = $140K. $140K − (0.12 × $900K) = $32K.

### Pattern 3: Definition-Matching as Evaluation (Pack C Section EC)

**Example:** P1-EC-005 — "Assigning different employees to authorize, record, and reconcile..."
- Label: Evaluate
- True: Remember
- Reason: Stem defines segregation of duties; answer is the concept name. Pure retrieval.

### Pattern 4: Control Classification as Evaluation (Pack C Section EC)

**Example:** P1-EC-020 — "A locked warehouse with badge access is what type of control?"
- Label: Evaluate
- True: Remember
- Reason: One-step classification of a described control into "preventive physical control" — definition matching.

## 6. Genuine Evaluate Exemplars

These items correctly earn the Evaluate label:

- **P1-B-085** (Pack A Section B): Four competing sourcing strategies (bulk discount vs JIT vs status quo vs hybrid) with explicit multi-factor trade-offs
- **P1-B-030** (Pack A Section B): Four supplier alternatives with genuine trade-offs across price, quality, delivery reliability, payment terms
- **P1-F-069** (Pack A Section F): Allocating real-time streaming investment across three business domains — competing deployment strategies with cost-benefit analysis
- **P1-BD-005** (Pack D Section B): Four competing variance investigation policy designs with trade-offs in sensitivity, cost, and anti-gaming

## 7. Structural Defect Found

**P1-FD-046** (Pack D Section F): All fields empty, including stem, choices, and correct choice. This item is structurally unrenderable and should not carry `question_state: "Certified"`.

---

*Generated: 2026-07-31 | Session 93P Auditor Phase — Evaluate*
