# Session 94P — Higher-Order Quality Recovery Plan

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Input Sessions:** S92P (Cognitive Drift Analysis), S93P (Classification Audit)
**Status:** COMPLETE

---

## 1. Executive Summary

**The repository has shifted from a volume problem to a quality problem.**

S92P detected cognitive drift across all 12 modernization waves. S93P quantified it: **58.7% of higher-order-labeled items are misclassified.** The true higher-order pool is approximately 219 items (8.6% of 2,545), not the 528 currently labeled (20.7%). The overstatement is 309 items.

This plan defines a quality-first recovery strategy with four phases:

| Phase | Name | Duration | Items Affected | Output |
|-------|------|----------|---------------|--------|
| Phase 1 | Label Correction | ~3 sessions | ~309 items | Corrected cognitive labels |
| Phase 2 | Gate Deployment | ~2 sessions | All future certifications | Automated classification gates |
| Phase 3 | Strategic HO Creation | ~15-20 sessions | ~799 new HO items | True HO at 40% per CAQS §6.2 |
| Phase 4 | Continuous Monitoring | Ongoing | All items | Drift detection + re-audit cycle |

**Key insight:** Creating more "Evaluate" items without improving classification quality is demonstrably inefficient. At the observed 41.3% accuracy rate, a 50-item creation campaign produces only ~21 genuine Evaluate items. Quality-first labeling is more impactful than volume-first expansion.

---

## 2. Problem Diagnosis

### 2.1 The Two Measurements

| Measurement | Value | Source |
|-------------|-------|--------|
| Labeled HO items | 528 (20.7% of 2,545) | S86P Cognitive Baseline |
| True HO items (estimated) | 219 (8.6% of 2,545) | S93P Classification Audit (150-item sample) |
| Overstatement | 309 items (58.7% misclassification) | Consistent across Evaluate (58.7%) and Analyze (58.7%) |

### 2.2 Misclassification Distribution by Severity

| Severity Tier | Pattern | Projected Count | % of Overstatement |
|--------------|---------|----------------|-------------------|
| **Tier 0 — Critical** | Remember/Understand → Evaluate (4 tiers overstated) | ~29 | 9.4% |
| **Tier 1 — High** | Apply → Evaluate (2 tiers overstated) | ~62 | 20.1% |
| **Tier 1 — High** | Understand → Analyze (2 tiers overstated) | ~75 | 24.3% |
| **Tier 2 — Medium** | Apply → Analyze (1 tier overstated) | ~87 | 28.2% |
| **Tier 2 — Medium** | Analyze → Evaluate (1 tier overstated) | ~49 | 15.9% |
| **Tier 3 — Structural** | Empty/unrenderable items with HO label | ~3 | 1.0% |

### 2.3 Root Cause Map

```
Template-based authoring (pre-modernization)
  └→ Items authored with position-based labels, not cognitive assessment
       └→ Survived multiple modernization waves without reclassification

Modernization "reframing" without redesign
  └→ Stems upgraded with scenario wording but task unchanged
       └→ "Calculate the variance" → "Recommend whether to investigate the variance"
            └→ Same formula execution, new label

Certification waves without cognitive audit
  └→ S853 certified 27 Pack C Section E items as Evaluate
       └→ 0/8 sampled items were genuine Evaluate
            └→ COSO definition-matching certified as "Evaluate"

Section F technology items
  └→ Technology domain resists cognitive upgrading
       └→ Items are definition-driven (ERP, cloud models, AI, cybersecurity)
            └→ Relabeling from Understand→Evaluate without structural redesign
```

---

## 3. Strategic Framework

### 3.1 Guiding Principle

**Quality over quantity.** A single genuine Evaluate item delivers more educational value than five relabeled Apply items. Future campaigns must measure true cognitive output, not labeled output.

### 3.2 The Quality Conversion Rate

| Campaign | Labeled HO | True HO | Conversion Rate |
|----------|-----------|----------|-----------------|
| Pack D Section B (S70-S82) | 89 | ~63 | **71%** |
| Pack A Section B (S77) | 35 | ~29 | **83%** |
| Pack A Section A (S63) | 22 | ~8 | **36%** |
| Pack C Section E (S853) | 27 | ~0 | **0%** |
| Pack B Sections B/C/F (S853) | 25 | ~10 | **40%** |
| Pack E Section F (S79) | 16 | ~8 | **50%** |

**Benchmark:** The Pack D Section B / Pack A Section B campaigns demonstrate that 70-83% conversion is achievable with the right methodology. This should be the target for all future creation campaigns.

### 3.3 Decision Framework

Before any HO creation campaign:

1. **Measure current section accuracy** via sample audit before writing
2. **Set a conversion-rate target** (minimum 70%)
3. **Design items to meet the cognitive criteria** BEFORE assigning labels
4. **Audit post-creation** — verify labels against criteria with independent review
5. **Report true HO output** alongside labeled output in campaign closeout

---

## 4. Phase 1 — Label Correction (Target: 309 Items)

### 4.1 Objective

Correct the cognitive labels on ~309 misclassified items so the repository's cognitive distribution reflects genuine cognitive demands.

### 4.2 Tiered Correction Approach

| Tier | Pattern | Count | Action | New Label |
|------|---------|-------|--------|-----------|
| 0 | Remember→Evaluate | ~29 | Immediate downgrade | Remember |
| 1 | Apply→Evaluate | ~62 | Downgrade 2 tiers | Apply |
| 1 | Understand→Analyze | ~75 | Downgrade 2 tiers | Understand |
| 2 | Apply→Analyze | ~87 | Downgrade 1 tier | Apply |
| 2 | Analyze→Evaluate | ~49 | Downgrade 1 tier | Analyze |
| 3 | Structural defect | ~3 | Fix or archive | Missing/Archived |

### 4.3 Section Execution Priority

| Priority | Section | Pack | Evaluate Accuracy | HO Overstated | Rationale |
|----------|---------|------|-------------------|---------------|-----------|
| **P0** | EC | C | 0% (0/8) | ~27 Evaluate + ~5 Analyze | Definition-matching as evaluation — most egregious |
| **P0** | DD | D | N/A | ~0 Evaluate + ~17 Analyze | Cost management terms as analysis |
| **P0** | CD | D | N/A | ~0 Evaluate + ~10 Analyze | Performance concepts as analysis |
| **P1** | A (Section A) | A | 25% (1/4) | ~3 Evaluate + ~22 Analyze | ASC rules as judgment |
| **P1** | ED | D | 78% (7/9 Eval) + 55% (6/11 Ana) | ~2 Evaluate + ~6 Analyze | COSO classification overstated |
| **P2** | CC | C | ~44% (est.) | ~5 Evaluate + ~8 Analyze | Formula substitution |
| **P2** | DC | C | ~44% (est.) | ~3 Evaluate + ~8 Analyze | Formula substitution |
| **P3** | AB, BB, CB, DB, EB | All | >50% | Remaining from all packs | Lower-priority scattered items |

### 4.4 Correction Protocol

For each item in the correction queue:

1. **Read the full item** — stem, choices, correct answer, explanation
2. **Classify independently** against the S94P Quality Gates criteria
3. **Assign true cognitive level**
4. **Document** the correction in `cognitive_correction_log.json`
5. **Batch size:** ≤30 items per change-set (governance-guard Rule 5)
6. **Backup-before-write** per BACKUP_PROTOCOL.md

---

## 5. Phase 2 — Gate Deployment (Automated Prevention)

### 5.1 Objective

Prevent future misclassification by deploying automated classification gates at certification time.

### 5.2 Gates

| Gate | Rule | Enforcement |
|------|------|-------------|
| **G-ANALYZE** | Stem-to-correct-choice lexical overlap ≥ 50% → BLOCK Analyze label | Automated, at write/edit time |
| **G-EVAL-1** | No named stakeholder with a decision role → BLOCK Evaluate label | Automated |
| **G-EVAL-2** | No competing alternatives (2+ distinct, defensible options) → BLOCK Evaluate label | Automated |
| **G-EVAL-3** | Single deterministic rule produces answer (ASC rule, known formula) → BLOCK Evaluate label | Automated |
| **G-EVAL-4** | Difficulty ≤ Moderate-Easy AND CognitiveLevel = Evaluate → BLOCK OR require difficulty upgrade | Automated |
| **G-DEF** | Stem-to-correct-choice overlap ≥ 70% → cognitive level capped at Understand | Automated |
| **G-STRUCT** | Missing stem, choices, or correct choice → BLOCK all labels | Automated |

### 5.3 Integration

Gates integrate with the existing governance-guard plugin as **Rule 10** (Cognitive Classification Gates). Tests added to `test_governance_guard.js`. Optional: pre-certification audit hook in `scripts/validators/`.

---

## 6. Phase 3 — Strategic HO Creation (Target: ~799 True HO Items)

### 6.1 Objective

Close the gap from 8.6% true HO (219 items) to 40% true HO (~1,018 items) per CAQS §6.2.

### 6.2 High-ROI Target Sections

The sections with the best conversion rates in prior campaigns:

| Section | Domain | Why | Best Pattern |
|---------|--------|-----|-------------|
| Section B | Budgeting/Planning | Natural decision-orientation; works with variance-to-recommendation bridge | S70-S75 pattern |
| Section E | Internal Controls | COSO judgment naturally aligns with Evaluate | Full scenario rewrite with COSO diagnosis |
| Section C | Performance Management | Variance analysis → interpretation → recommendation chain | Multi-step decomposition + business judgment |
| Section D | Cost Management | Make-or-buy, special order, relevant costing with tradeoffs | Genuine tradeoff scenarios with competing alternatives |

### 6.3 Quality-First Creation Template

Every new HO item must satisfy:

```
[ ] Named company + stakeholder role + business trigger
[ ] Decision framed as choice between competing alternatives
[ ] No single deterministic formula or rule produces the answer
[ ] Requires weighing ≥2 factors (cost, quality, time, risk, etc.)
[ ] Explanation identifies WHY each alternative is suboptimal
[ ] Independent cognitive audit confirms true Evaluate or Analyze
[ ] Difficulty ≥ Moderate (3) for Analyze, ≥ Difficult (4) for Evaluate
```

### 6.4 Campaign Budgeting

| Campaign | Target Items | Sessions | Goal |
|----------|-------------|----------|------|
| Pack C/D Section A (Financial Reporting) | ~75 true HO | 5-6 | Zero HO sections → 30% HO |
| Pack B Sections C/D (Performance/Cost) | ~50 true HO | 3-4 | Low HO sections → 25% HO |
| Pack A Section D (Cost Management) | ~25 true HO | 2 | Close the lowest HO section in best pack |
| Pack E Sections A/B/C/D (Core domains) | ~100 true HO | 6-8 | Bring Pack E from 6.4% → 20% HO |
| Net-new Evaluate (all packs, all sections) | ~200 true HO | 10-12 | Distributed Evaluate creation following best patterns |
| Cross-pack Section F (Technology) | ~50 true HO | 4-5 | Hardest domain — scenario-based caselets needed |

**Total: ~500 true HO items across ~30-40 sessions.** At 70% conversion rate, this requires ~714 items to be authored, of which ~500 convert to genuine HO.

---

## 7. Phase 4 — Continuous Monitoring

### 7.1 Drift Detection Cadence

| Trigger | Action |
|---------|--------|
| Every 10th modernization wave | Full-pool cognitive sample audit (75 Evaluate + 75 Analyze) |
| After any certification wave adding ≥25 HO items | Section-level cognitive audit for new items |
| Pre-campaign | Section baseline audit (sample size proportional to section population) |
| Post-campaign | Section close-out audit (same sample size as pre-campaign) |

### 7.2 Monitoring Metrics

| Metric | Threshold | Action if exceeded |
|--------|-----------|-------------------|
| Evaluate misclassification rate | >30% | Halt new Evaluate creation; audit wave |
| Analyze misclassification rate | >30% | Halt new Analyze creation; audit wave |
| Remember-as-Evaluate items | >0 | Immediate downgrade |
| Structural defects in HO pool | >0 | Immediate fix or archive |
| Conversion rate (true HO / labeled HO) | <70% | Review campaign methodology |

---

## 8. Governance Alignment

### 8.1 Current Governance Guard Status

| Rule | Status | S94P Impact |
|------|--------|-------------|
| Rule 1 (question_state → REVISION_HISTORY) | Active | No impact — labels ≠ certification states |
| Rule 2 (DL-008 BLOCK) | Active | No impact |
| Rule 5 (30-item cap) | Active | Applies to label correction batches |
| Rule 9 (DL-037 logic inversion) | Active | No impact |
| **Rule 10 (Cognitive Gates) — PROPOSED** | **Not yet deployed** | **New — deploys in Phase 2** |

### 8.2 REVISION_HISTORY.md

Label corrections must be recorded in REVISION_HISTORY.md per governance-guard Rule 1 (any `question_state` change pairs with REVISION_HISTORY entry). Cognitive label changes (`CognitiveLevel` field) are not `question_state` changes and are not covered by Rule 1 — however, best practice is to log cognitive label corrections to maintain a complete audit trail.

### 8.3 CAQS Compliance

| Section | Requirement | Current Status | Post-Recovery Target |
|---------|-------------|---------------|---------------------|
| §1.6.3 | Difficulty Calibration — matches tier and LOS depth | 58.7% overstated | ≤10% misclassification |
| §2.2 Dimension 2 | Cognitive Level scoring (15% weight) | Labels unreliable | Labels audited and correct |
| §6.1 | Target difficulty distribution | OK | Maintained |
| §6.2 | Bloom's taxonomy distribution (40% HO) | 8.6% true HO | 40% true HO |
| §6.5 | Guessability criteria | Not directly affected | Maintained |

---

## 9. Risk Register

| Risk | Severity | Likelihood | Mitigation |
|------|----------|------------|------------|
| Label correction introduces new defects | Medium | Low | Per-item independent verification; batch cap ≤30 |
| Misclassification rate is worse than 58.7% | Medium | Low | 150-item sample provides 95% CI of ±9.5% |
| Future campaigns repeat same patterns | High | Medium | Phase 2 gates block at certification time |
| Section F remains resistant to HO upgrading | High | High | Accept lower conversion rate for Technology domain; target 50% HO vs. 70% for other domains |
| 799-item HO gap is infeasible | Medium | Medium | Prioritize items with highest educational ROI (Sections A, B, E first) |

---

## 10. Success Metrics

| Metric | Baseline (S93P) | Phase 1 Target | Phase 3 Target |
|--------|----------------|----------------|----------------|
| Evaluate misclassification rate | 58.7% | ≤5% | ≤5% |
| Analyze misclassification rate | 58.7% | ≤5% | ≤5% |
| True HO pool | 219 (8.6%) | 219 (8.6%) | ~1,018 (40%) |
| Remember-as-Evaluate items | ~26 | 0 | 0 |
| Structural defects in HO | ~3 | 0 | 0 |
| Campaign conversion rate | 41.3% avg | N/A | ≥70% |
| Automated gates active | 0 | 7 | 7 |

---

*Generated: 2026-07-31 | Session 94P Planner Phase*
