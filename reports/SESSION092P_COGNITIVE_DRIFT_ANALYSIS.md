# Session 92P — Cognitive Drift Analysis

**Generated:** 2026-07-31
**Data Source:** S380 Evaluate Audit (94 items), S718 Analytics (2,425 items), S086P Baseline, cross-wave rewrite records
**Methodology:** Pattern detection across modernization waves + quality signal extraction from existing audit artifacts

---

## 1. Executive Summary

**Finding:** The modernization program (S61–S91) successfully expanded higher-order item coverage from 14.0% to 18.9%, but approximately **50% of Evaluate-labeled items** and an estimated **30–40% of Analyze-labeled items** may be superficial reclassifications rather than genuine cognitive upgrades. Five distinct drift patterns are identified and scored.

---

## 2. Drift Category 1: Evaluate Misclassification — Apply Disguised as Evaluate

### Severity: **CRITICAL**

### Evidence

The S380 Evaluate Audit examined 94 Evaluate-labeled items across all 5 packs and found:

| True Classification | Count | % of Sample |
|--------------------|-------|-------------|
| True Evaluate | 47 | 50.0% |
| Analyze (misclassified as Evaluate) | 10 | 10.6% |
| Apply (misclassified as Evaluate) | 37 | 39.4% |
| **Misclassified** | **47** | **50.0%** |

### Pattern Characteristics

Apply-disguised-as-Evaluate items share these traits:

1. **Single-step calculation with "recommend" framing**
   - Stem: "The controller must recommend whether to accept the special order."
   - Actual task: One-step contribution margin calculation
   - True level: Apply (formula execution)

2. **Concept identification with "evaluate" framing**
   - Stem: "Evaluate the appropriate accounting treatment..."
   - Actual task: Identify the correct ASC section from description
   - True level: Understand or Apply (concept matching)

3. **Decision binary with no tradeoffs**
   - Stem: "Recommend whether to investigate the variance."
   - Actual task: Compare variance to threshold percentage
   - True level: Apply (one-step comparison)

### Per-Pack Breakdown (from S380 sample)

| Pack | Total Sampled | True Evaluate | Apply Misclassified | Analyze Misclassified | Misclass. Rate |
|------|--------------|---------------|---------------------|-----------------------|----------------|
| A | 14 | 6 (42.9%) | 4 (28.6%) | 4 (28.6%) | **57.1%** |
| B | 7 | 1 (14.3%) | 4 (57.1%) | 2 (28.6%) | **85.7%** |
| C | 30 | 18 (60.0%) | 10 (33.3%) | 2 (6.7%) | **40.0%** |
| D | 38 | 21 (55.3%) | 15 (39.5%) | 2 (5.3%) | **44.7%** |
| E | 5 | 1 (20.0%) | 4 (80.0%) | 0 (0.0%) | **80.0%** |

### Projected Pool-Wide Impact

If the 50% misclassification rate from S380's 94-item sample holds across the full 221 Evaluate-labeled items:

| Category | Projected Count |
|----------|----------------|
| Genuine Evaluate | ~111 |
| Misclassified (Apply/Analyze) | ~110 |
| Overstated Evaluate in certified pool | ~104 of 208 certified Evaluate items |

**Learner impact:** Items labeled "Evaluate" are mapped to CAQS target of 15% of the bank. If only half are genuine, the true Evaluate pool is ~111 items (4.4% of 2,545) — far below the 15% target (382 items). The gap is not 161 items as the raw numbers suggest, but **271 items** when accounting for misclassification.

---

## 3. Drift Category 2: Definition-Match Disguised as Analyze

### Severity: **HIGH**

### Pattern

Items where the question stem is a textbook definition and the correct answer is the defined term, but the item carries an `Analyze` or `Evaluate` cognitive level label.

### Detection Rule

```
If stem-to-correct-choice lexical overlap > 50%
  AND CognitiveLevel ∈ {Analyze, Evaluate}
  AND distractors are definition-level opposites
  → Flag as definition-match drift
```

### Evidence

From S718 Analytics, 244 items were flagged for Difficulty/CognitiveLevel misalignment. The dominant pattern in these flags is "Evaluate at Easy with low confidence." These items share characteristics:
- CognitiveLevel: Evaluate
- Difficulty: Easy or Moderate-Easy
- Confidence: 55–86 (well below the 90+ threshold)
- Explanation: often text from the pre-modernization era

### Per-Section Hotspots

| Section | Pack | Suspect Items | Risk |
|---------|------|--------------|------|
| F | E | ~15 items | Pack E Section F items upgraded from Understand to Analyze/Evaluate in S79 — definition-heavy domain |
| A | A | ~12 items | S63 Financial Reporting rewrites — some may be rule-identification not judgment |
| B | C | ~69 items | Pack C Section B at 1% HO — large Apply pool where upgrade may be superficial |

### Example Pattern (from S380)

```
P1E-B-063 (Pack E Section B, "Evaluate"):
  Stem: concept of participative budgeting
  Answer: "greater goal congruence and motivation" (textbook definition)
  True level: Apply (concept identification)
  Current label: Evaluate
```

---

## 4. Drift Category 3: Weak Distractor Explanations in Modernized Items

### Severity: **MEDIUM**

### Finding

Modernization waves (particularly S70–S75) cleared DL-013 boilerplate during rewrites. However, the quality of replacement distractor explanations was not systematically audited post-rewrite. The S90 Distractor Quality Review found that 98%+ of absolutist language is legitimate, but identified 10 CANDIDATE_REWRITE items — all with template-generated distractors ("guarantees goal congruence in all cases") in DL-012 clone groups.

### Evidence

- S70–S75 rewrites: 75 items with new distractor explanations
- S90 scan: 987 absolutist language hits; 10 CANDIDATE_REWRITE
- Pack C Section E clone groups (CC-021 through CC-027) still carry "guarantees goal congruence in all cases" template text
- No systematic EW field character count or quality audit performed on S70+ rewrites

### Risk

Without quality measurement, we cannot verify that distractor explanations in modernized items meet the CAQS §4 standard (≥50 chars, choice-specific, misconception-targeting). The S90 scan covered only absolutist language — not explanation depth or relevance.

---

## 5. Drift Category 4: Repeated Scenario Structures

### Severity: **MEDIUM**

### Finding

The 75-item Pack D Section B campaign (S70–S75) used a consistent scenario pattern:

```
[Named Company], [Stakeholder Role] must [Decision Verb] about [Topic] considering [Quantified Tradeoff].
```

While each item has a unique company name and stakeholder, the underlying structure is formulaic. Cross-wave company name audit reveals no duplicates, but the structural template creates items that feel mechanically similar despite different surface content.

### Company Name Inventory (Partial, from S70–S75 rewrite records)

Ravenwood Technologies, Lockwood Supply, Ashworth Materials, Apex Outdoor Gear, Harborview Cabinetry, Solaris Manufacturing, Crestline Engineered Components, Bayside Manufacturing, Apex Distributors, Meridian Equipment Distributors, Ridgeline Manufacturing, Northstar Fabrication, Emberline Industries, Fernhollow Manufacturing, Underhill Manufacturing, Whitmore Industries, Crownridge Manufacturing, Dellwood Industries, Kirkwood Manufacturing, Ledgemont Corporation, Sandpiper Industries, Ivorycrest Corporation, Prescott Industries, Whitfield Corporation, Ashvale Manufacturing, Kelso Industries, Quintwood Distribution, Valemont Corporation, Fenwick Manufacturing, Lockhaven Industries, Mapleton Outdoor Gear, Northfell Corporation, Redcliff Distribution, Stonewell Building Supplies, Thornbury Building Materials, Bramblewood Manufacturing, Castlebrook Industries, Deepwater Corporation, Elmsworth Manufacturing, Yewbrook Manufacturing, Zionsgate Aerospace, Ashfield Manufacturing, Ashford Manufacturing, Harrowgate Industries, Norwood Peak, Stonewell Industries, Redcliff Industries, Alderway, Meridian Steel

**49 unique company names in 75 items. No duplicates detected. However:**
- 30+ use "Manufacturing" suffix
- 15+ use "[Nature-word] + Manufacturing/Industries" pattern
- Stakeholder role spread: Controller (most common), CFO, Treasurer, Production Manager — relatively narrow role diversity

---

## 6. Drift Category 5: Difficulty/CognitiveLevel Mismatch

### Severity: **HIGH**

### Evidence (from S718 Analytics)

| Difficulty | Remember | Understand | Apply | Analyze | Evaluate | Row Total |
|------------|----------|------------|-------|---------|----------|-----------|
| Easy | 102 | 206 | 172 | 20 | **168** | 668 |
| Moderate-Easy | 85 | 48 | 187 | 7 | **3** | 330 |
| Moderate | 171 | 296 | 678 | 24 | **49** | 1,218 |
| Difficult | 76 | 37 | 85 | 7 | **3** | 208 |

### Key Mismatch: Evaluate at Easy

**168 of 223 Evaluate items (75.3%) are labeled Difficulty: Easy.** This is a structural impossibility — evaluation (making judgments, weighing alternatives) inherently requires Moderate+ difficulty. An Evaluate item at Easy difficulty is either:
1. Misclassified cognitive level (should be Apply or Understand)
2. Misclassified difficulty (should be Moderate or Difficult)

The S718 confidence data confirms this: Evaluate items have the lowest average confidence (78.2) and highest rate of sub-70 confidence (48 of 223 = 21.5%).

### Key Mismatch: Analyze at Easy

**20 of 58 Analyze items (34.5%) are labeled Difficulty: Easy** in S718 data. While the S86P baseline shows Analyze growing to 260 items, the same pattern likely persists.

---

## 7. Cross-Drift Correlation Matrix

| Drift Pattern | Drift 1 (Eval Misclass) | Drift 2 (Def-Match) | Drift 3 (Weak EW) | Drift 4 (Repeated Struct) | Drift 5 (Diff/CL Mismatch) |
|--------------|------------------------|---------------------|--------------------|--------------------------|---------------------------|
| Drift 1 | — | Correlated (both inflate HO) | Independent | Independent | **Strongly correlated** |
| Drift 2 | Partially overlapping | — | Independent | Independent | Correlated |
| Drift 3 | Independent | Independent | — | **Correlated** (S70+ rewrites) | Independent |
| Drift 4 | Independent | Independent | Correlated | — | Independent |
| Drift 5 | **Strongly correlated** | Correlated | Independent | Independent | — |

**Primary convergence:** Drift 1 (Evaluate misclassification) and Drift 5 (Difficulty/CL mismatch) are the same phenomenon viewed from different angles. The 168 Evaluate-at-Easy items are the same population flagged by S380's 50% misclassification rate.

---

## 8. Drift Timeline

| Phase | Sessions | Primary Drift Pattern | Severity | Detection |
|-------|----------|----------------------|----------|-----------|
| Phase 1 (Early) | S61–S63 | Full-scenario rewrites; high CC volatility; genuine upgrades | LOW | High-quality tracking confirmed quality |
| Phase 2 (Mid) | S70–S75 | Accelerated pace; dropped quality metrics; some formula reframing | MEDIUM | Defect clearance tracked but not explanation quality |
| Phase 3 (Late) | S79–S82 | High velocity; packetized; definition-match risk on Section F | HIGH | Minimal quality documentation; Section F definition-heavy |
| Phase 4 (Net New) | S380 | New Evaluate creation; high-quality design | LOW | 5 items, individually designed, domain-diverse |

**Drift onset:** Mid-phase (S70) — velocity increased to 15 items/session while quality metrics dropped. Late-phase (S79–S82) amplified this with packetized approach and Section F definition-match risk.

---

## 9. Remediation Recommendations (No Execution — Analysis Only)

### Tier 1 — Immediate (Certified-Pool Learner Safety)

1. **Full-pool Evaluate re-classification audit** — Extend S380's 94-item sample to all 221 Evaluate-labeled items. Use S380 methodology (true cognitive level assessment per item). Estimated effort: ~4-5 audit sessions.

2. **Difficulty×CognitiveLevel sweep for 168 Evaluate-at-Easy items** — Verify each item: either downgrade CL or upgrade difficulty. Items at Easy+Evaluate are almost certainly misclassified on one dimension.

### Tier 2 — High Priority (Future Campaign Quality)

3. **Mandatory quality metrics for all future modernization waves** — Re-establish S63-level tracking: EC char count, EW char count, ASC/COSO reference rate, choice-specific EW rate. Minimum thresholds: EC ≥ 800 chars, EW ≥ 150 chars per slot.

4. **Pre-upgrade cognitive assessment** — Before upgrading an item, assess its true cognitive level via independent review (not just relabel). Gate: item must genuinely operate at target cognitive level, not just be reframed.

### Tier 3 — Medium Priority (Process Improvement)

5. **Definition-match detection rule** — Automated flag: if stem-to-correct-choice lexical overlap > 50%, block Evaluate/Analyze classification.

6. **Scenario uniqueness audit** — Per-section check for structural template reuse. Flag sections with >50% items using identical scenario structures.

---

## 10. Overall Drift Assessment

| Metric | Score |
|--------|-------|
| **Overall Drift Severity** | **MODERATE-HIGH** |
| **Primary Concern** | Evaluate misclassification — ~50% of labeled Evaluate items may not be genuine |
| **Secondary Concern** | Definition-match — especially in Section F (Technology) |
| **Tertiary Concern** | Quality documentation decay — measurement dropped while velocity increased |
| **Bright Spot** | Pack D Section B campaign quality — genuine upgrades with solid business scenarios |
| **Bright Spot** | S63 Pack A Section A — gold standard for rewrite quality methodology |
| **Recommendation** | Full-pool Evaluate audit before further modernization expansion; re-establish quality metrics |

---

*Data sources: SESSION380_EVALUATE_AUDIT.json (94-item sample, 5-dimensional classification), SESSION718_ANALYTICS_SUMMARY.md (2,425-item Difficulty×CognitiveLevel matrix), SESSION086P_COGNITIVE_BASELINE.json (full-pool cognitive census), SESSION061–077_REWRITE_RESULTS.json (per-wave quality metadata), SESSION90_DISTRACTOR_QUALITY_REVIEW.md (absolutist language scan)*
