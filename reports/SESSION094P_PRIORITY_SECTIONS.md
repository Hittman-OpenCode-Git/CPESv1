# Session 94P — Priority Sections for Cognitive Recovery

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Data Source:** S93P Classification Audit (150-item sample), S92P Benchmark Comparison, S92P Rewrite Analytics
**Status:** COMPLETE

---

## 1. Section Priority Ranking

Sections ranked by combined Evaluate + Analyze misclassification severity. Priority = (false HO count × severity multiplier) where Remember-as-Evaluate = ×10, Understand-as-Analyze = ×6, Apply-as-Evaluate = ×4, Apply-as-Analyze = ×2, Analyze-as-Evaluate = ×2.

| Rank | Section | Pack | HO Labeled | True HO | False HO | Accuracy | Priority Score | Status |
|------|---------|------|-----------|----------|----------|----------|---------------|--------|
| 1 | **EC** | C | 52 | ~27 | ~25 | ~52% | **CRITICAL** | COSO terms as Evaluate — 0% Eval accuracy |
| 2 | **A** (Section A) | A | 22 | ~5 | ~17 | ~23% | **CRITICAL** | ASC rules as judgment + analysis |
| 3 | **DD** | D | 17 | ~0 | ~17 | ~0% | **CRITICAL** | Cost management definitions as Analyze |
| 4 | **CD** | D | 10 | ~0 | ~10 | ~0% | **CRITICAL** | Performance concepts as Analyze |
| 5 | **ED** | D | 77 | ~61 | ~16 | ~79% | HIGH | COSO classification overstated by 1 tier |
| 6 | **CC** | C | 29 | ~18 | ~11 | ~62% | MEDIUM | Formula substitution as analysis |
| 7 | **DC** | C | 23 | ~15 | ~8 | ~65% | MEDIUM | Formula substitution as analysis |
| 8 | **BD** | D | 89 | ~67 | ~22 | ~75% | MEDIUM | Good overall, some formula reframing |
| 9 | **B** (Section B) | A | 35 | ~29 | ~6 | ~83% | LOW | High accuracy — benchmark section |
| 10 | **F** (Section F) | A | 5 | ~5 | ~0 | ~100% | **NONE** | Perfect accuracy — all genuine Evaluate |
| 11 | **BB** | B | 10 | ~5 | ~5 | ~50% | MEDIUM | Mixed: EVA/formula items overstated |
| 12 | **BC** | B | 6 | ~3 | ~3 | ~50% | LOW | Small section, mixed |
| 13 | **BF** | B | 7 | ~3 | ~4 | ~43% | MEDIUM | Technology items resistant to upgrade |
| 14 | **FC** | C | 18 | ~11 | ~7 | ~61% | MEDIUM | Technology — some genuine, some definition-match |
| 15 | **FD** | D | 25 | ~16 | ~9 | ~64% | MEDIUM | Technology — mixed |
| 16 | **All E** | E | 35 | ~24 | ~11 | ~69% | MEDIUM | Mixed across sections, small per-section samples |
| 17 | **FE** | E | 16 | ~10 | ~6 | ~63% | MEDIUM | Technology items — S79 campaign |

---

## 2. Tier 0 — Critical Sections (Require Full-Section Reclassification)

These sections have ≤25% accuracy on at least one HO label. These sections need a full inventory audit before any new HO items are created in them.

### 2.1 Pack C Section EC — The COSO Definition-Matching Disaster

| Metric | Value |
|--------|-------|
| **HO Labeled** | 52 items (27 Evaluate + 25 Analyze) |
| **Evaluate Accuracy** | **0%** (0/8 sampled) |
| **Analyze Accuracy** | 60% (6/10 sampled) |
| **Estimated True HO** | ~27 items (all Analyze-level; zero true Evaluate) |
| **Root Cause** | S853 certification wave — 27 COSO framework items certified as Evaluate despite being definition-matching or one-step classification |
| **Dominant Pattern** | Stem provides textbook definition → Answer is the defined term → Labeled "Evaluate" |
| **Examples** | EC-005: "Assigning different employees to authorize, record, and reconcile..." → Answer: "Segregation of duties" (Remember, labeled Evaluate) |
| **Examples** | EC-020: "A locked warehouse with badge access is what type of control?" → Answer: "Preventive physical control" (Remember, labeled Evaluate) |
| **Action** | Full-section reclassification: all 27 "Evaluate" items → Analyze (if genuine COSO diagnosis) or Apply/Remember. Audit all 25 Analyze items for definition-match. |
| **Post-Correction HO** | ~27 items (all Analyze) |

### 2.2 Pack A Section A — ASC Rules as Judgment

| Metric | Value |
|--------|-------|
| **HO Labeled** | 22 items (4 Evaluate + 18 Analyze) |
| **Evaluate Accuracy** | **25%** (1/4 sampled) |
| **Analyze Accuracy** | **0%** (0/3 sampled) |
| **Estimated True HO** | ~5 items |
| **Root Cause** | ASC rule application items were reframed during S63 as judgment items without structural redesign. "Which treatment does ASC 360/450/606 require?" is Apply, not Evaluate. |
| **Dominant Pattern** | Stem presents ASC scenario → Correct answer is the deterministically correct treatment under the cited standard → Labeled "Evaluate" or "Analyze" |
| **Examples** | P1-A-012: "Accrue $520K for Claim 1 only. Claim 1 is probable (75%) and reasonably estimable..." (Apply — deterministic ASC 450, labeled Evaluate) |
| **Examples** | P1-A-039: "Compute straight-line depreciation: ($124,800 − $12,000) / 7 = $16,114" (Apply — known formula, labeled Analyze) |
| **Action** | Per-item reclassification of all 22 HO-labeled items. Expect majority to land at Apply. |
| **Post-Correction HO** | ~5 items |

### 2.3 Pack D Section DD — Cost Management Definitions as Analysis

| Metric | Value |
|--------|-------|
| **Analyze Labeled** | 17 items |
| **Analyze Accuracy** | **0%** (0/3 sampled) |
| **Estimated True Analyze** | ~0 items |
| **Root Cause** | Cost management terminology items (kaizen costing, reciprocal method, normal costing, ABC vs. traditional) labeled as Analyze. Definition-to-term matching pattern. |
| **Dominant Pattern** | Stem defines a cost management concept → Answer is the concept name → Labeled "Analyze" |
| **Examples** | P1-DD-036: "ongoing cost reduction targets for existing products with gradual improvement" → Answer: "Kaizen costing" (Understand, labeled Analyze) |
| **Action** | Reclassify all 17 Analyze-labeled DD items to Understand or Apply. |
| **Post-Correction HO** | ~0 items |

### 2.4 Pack D Section CD — Performance Concepts as Analysis

| Metric | Value |
|--------|-------|
| **Analyze Labeled** | 10 items |
| **Analyze Accuracy** | **0%** (0/4 sampled) |
| **Estimated True Analyze** | ~0 items |
| **Root Cause** | Performance management terminology (common-size analysis, EVA definition, TQM, cost-benefit analysis) labeled as Analyze. |
| **Dominant Pattern** | Stem describes a performance concept → Answer is the concept → Labeled "Analyze" |
| **Examples** | P1-CD-061: "expressing line items as a percentage of revenue" → Answer: "Common-size vertical analysis" (Understand, labeled Analyze) |
| **Action** | Reclassify all 10 Analyze-labeled CD items to Understand or Apply. |
| **Post-Correction HO** | ~0 items |

---

## 3. Tier 1 — High-Priority Sections (Moderate Misclassification, High Volume)

These sections have 50-79% accuracy but large HO populations, making their absolute false HO count significant.

### 3.1 Pack D Section BD — Budgeting Analysis (Good Quality, Some Overstatement)

| Metric | Value |
|--------|-------|
| **HO Labeled** | 89 items |
| **Evaluate Accuracy** | ~71% (projected from D/B Eval sample) |
| **Analyze Accuracy** | 60% (6/10 sampled) |
| **Estimated True HO** | ~67 items |
| **False HO** | ~22 items |
| **Quality** | Best modernization campaign — 5-wave sustained effort |
| **Action** | Targeted reclassification of ~22 items. Most are Apply items reframed as Analyze (formula execution with scenario wording). Not a full-section audit. |
| **Recommendation** | Use as benchmark for future campaigns. Document what makes BD items genuinely Evaluate vs. formula-reframed. |

### 3.2 Pack D Section ED — COSO Classification Overstatement

| Metric | Value |
|--------|-------|
| **HO Labeled** | 77 items |
| **Evaluate Accuracy** | 78% (7/9 sampled) |
| **Analyze Accuracy** | 55% (6/11 sampled) |
| **Estimated True HO** | ~61 items |
| **False HO** | ~16 items |
| **Pattern** | Genuine COSO diagnosis items are correctly labeled. However, one-step COSO classification items ("Which COSO component does X support?") are Analyze (at best), not Evaluate. |
| **Action** | Targeted reclassification of ~16 Analyze-labeled items that are COSO classification (Apply/Understand) rather than COSO diagnosis (Analyze). |

### 3.3 Pack C Section CC — Performance Management Overstatement

| Metric | Value |
|--------|-------|
| **HO Labeled** | 29 items |
| **Evaluate Accuracy** | ~44% (projected) |
| **Analyze Accuracy** | ~44% (projected) |
| **Estimated True HO** | ~18 items |
| **False HO** | ~11 items |
| **Pattern** | Variance formulas (fixed overhead volume, spending, efficiency) labeled as Analyze. EVA calculation labeled as Evaluate. |
| **Action** | Per-item audit of all 29 HO-labeled CC items. Formula substitution items → Apply. |

### 3.4 Pack C Section DC — Cost Management Overstatement

| Metric | Value |
|--------|-------|
| **HO Labeled** | 23 items |
| **Evaluate Accuracy** | ~44% (projected) |
| **Analyze Accuracy** | ~44% (projected) |
| **Estimated True HO** | ~15 items |
| **False HO** | ~8 items |
| **Pattern** | Similar to CC — cost allocation formulas, ABC calculations labeled as Analyze/Evaluate. |
| **Action** | Per-item audit of all 23 HO-labeled DC items. |

---

## 4. Tier 2 — Medium-Priority Sections (Low Volume or High Accuracy)

### 4.1 Pack A Section B — Benchmark Section (High Accuracy, Low Priority)

| Metric | Value |
|--------|-------|
| **HO Labeled** | 35 items |
| **Evaluate Accuracy** | **83%** (5/6 sampled) |
| **Estimated True HO** | ~29 items |
| **False HO** | ~6 items |
| **Quality** | Best Evaluate accuracy in the repository. S77 campaign + pre-existing quality items. |
| **Action** | Audit the remaining ~6 items. Document the section as the gold standard for Evaluate design. |
| **Recommendation** | Use Pack A Section B items as exemplars for Evaluate gate calibration. |

### 4.2 Pack B Sections B/C/F — Low Volume, Mixed Quality

| Metric | Value |
|--------|-------|
| **HO Labeled** | 23 items |
| **Evaluate Accuracy** | 50% (4/8 sampled) |
| **Estimated True HO** | ~11 items |
| **False HO** | ~12 items |
| **Action** | Per-item audit. Small section — quick to complete. |

### 4.3 Pack E — Low Volume, Small Samples

| Metric | Value |
|--------|-------|
| **HO Labeled** | 35 items |
| **Evaluate Accuracy** | 0% (0/2 sampled — unreliable due to small sample) |
| **Estimated True HO** | ~24 items |
| **False HO** | ~11 items |
| **Action** | Full per-item audit of all 35 HO-labeled items. Pack E uses a different authoring pipeline and may have different misclassification patterns. |

---

## 5. Section-Level Summary Table

| Pack | Section | HO Labeled | True HO (Est.) | False HO | Accuracy | Priority | Action |
|------|---------|-----------|----------------|----------|----------|----------|--------|
| C | EC | 52 | ~27 | ~25 | ~52% | **P0** | Full-section reclassification |
| A | A (Section A) | 22 | ~5 | ~17 | ~23% | **P0** | Full-section reclassification |
| D | DD | 17 | ~0 | ~17 | ~0% | **P0** | Full-section reclassification |
| D | CD | 10 | ~0 | ~10 | ~0% | **P0** | Full-section reclassification |
| D | ED | 77 | ~61 | ~16 | ~79% | P1 | Targeted reclassification |
| D | BD | 89 | ~67 | ~22 | ~75% | P1 | Targeted reclassification |
| C | CC | 29 | ~18 | ~11 | ~62% | P2 | Per-item audit |
| C | DC | 23 | ~15 | ~8 | ~65% | P2 | Per-item audit |
| D | FD | 25 | ~16 | ~9 | ~64% | P2 | Per-item audit |
| C | FC | 18 | ~11 | ~7 | ~61% | P2 | Per-item audit |
| E | All | 35 | ~24 | ~11 | ~69% | P2 | Full per-item audit |
| B | All | 23 | ~11 | ~12 | ~48% | P2 | Full per-item audit |
| A | B | 35 | ~29 | ~6 | ~83% | P3 | Benchmark audit |
| A | D | 18 | ~13 | ~5 | ~72% | P3 | Per-item audit |
| A | E | 23 | ~18 | ~5 | ~78% | P3 | Per-item audit |
| A | C | 17 | ~12 | ~5 | ~71% | P3 | Per-item audit |
| A | F | 5 | ~5 | ~0 | ~100% | None | No action needed |

---

## 6. Campaign-Specific Recommendations

### 6.1 Sections to Prioritize for New HO Creation (Post-Recovery)

Once label accuracy is restored, these sections offer the best ROI for genuine HO creation:

| Section | Why | ROI | Approach |
|---------|-----|-----|----------|
| **Pack C/D Section A** | Zero HO in both packs — largest gap | **HIGH** | Full-scenario ASC judgment items (like Pack A Section A exemplars) |
| **Pack A Section C** | Performance management naturally supports Analyze | **HIGH** | Variance analysis → interpretation → recommendation chain |
| **Pack B Section C** | Large Apply pool (63 items) ready for upgrade | **MEDIUM** | Variance-to-recommendation bridge |
| **Pack B Section D** | Large Apply pool (63 items) ready for upgrade | **MEDIUM** | Trade-off scenarios (make-or-buy, special order, relevant costing) |
| **Pack E Sections A/B/C/D** | Low HO (2.7-5.3%) across all core domains | **HIGH** | Full-scenario redesign following Pack A Section B pattern |

### 6.2 Sections to Avoid for HO Creation (Pre-Recovery)

Do not create new HO items in these sections until label accuracy is restored:

| Section | Reason |
|---------|--------|
| Pack C Section EC | Full-section reclassification pending — creating more "Evaluate" here would compound the problem |
| Pack D Section DD | 100% false Analyze — definitions with the wrong label |
| Pack D Section CD | 100% false Analyze — performance concepts with the wrong label |
| Pack A Section A | 75% false Evaluate + 100% false Analyze — ASC rule items need reclassification first |

---

## 7. Strategic Questions Answered

### Q1: Which sections have the largest concentration of false Evaluate items?

**Pack C Section EC** — 27 Evaluate-labeled items with 0% accuracy. All are COSO definition-matching. This single section accounts for ~19% of the Evaluate overstatement.

### Q2: Which modernization campaigns produced the highest-quality higher-order inventory?

**Pack A Section B (S77) at 83% accuracy** and **Pack D Section B (S70-S82) at 71% accuracy.** Both campaigns used full scenario rewrites with named stakeholders, competing alternatives, and authentic business contexts. Pack D Section B is the single largest source of genuine Evaluate items (~63 true Evaluate).

### Q3: Which existing items could be upgraded to genuine Analyze/Evaluate with minimal effort?

Items in Pack D Sections BD and ED where the underlying content is already at Analyze level but the label is overclassified to Evaluate. ~49 items across all packs are genuine Analyze labeled as Evaluate — these require only a one-tier label downgrade, not a content rewrite.

### Q4: Quality recovery or volume expansion for maximum ROI?

**Quality recovery first.** At 58.7% misclassification, volume expansion is 41.3% efficient. Fixing labels (Phase 1) produces an accurate baseline without creating any new items. Then, quality-controlled volume expansion (Phase 3) at ≥70% conversion rate produces 2.7× the genuine HO per session that the historical rate achieved.

---

*Generated: 2026-07-31 | Session 94P Implementer Phase — Priority Sections*
