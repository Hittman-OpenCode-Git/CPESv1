# Session 100P — AF Priority Model

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Input:** S95P (AF-1 through AF-6 definitions), S97P (gate results + feasibility), S96P (three-tier model)
**Status:** COMPLETE

---

## 1. Purpose

This document defines the deployment priority for the six Automatic Failure conditions, ranking them by error impact, automatable confidence, and ROI. Each AF condition is assessed against a priority formula:

```
Priority Score = (Flags × False Entity Rate × Severity) / (False Positive Risk + Deployment Cost)
```

Where "False Entity Rate" is the probability that a flag correctly identifies a misclassification (1 − FP rate).

## 2. AF Ranking

### 2.1 Ranked Priority List

| Rank | AF | Labels Flagged | FP Rate | Certainty | Severity of Error | Priority Score | Deploy As |
|------|----|---------------|---------|-----------|-------------------|----------------|-----------|
| **1** | **AF-3** | 105 | 2-3% | HIGH | Evaluate/Apply → mislabeled by 2+ tiers | **Highest** | **Auto-BLOCK** |
| **2** | **AF-4** | 14 | 0% | VERY HIGH | Remember → Analyze/Evaluate (definition as HO) | **Highest** | **Auto-BLOCK** |
| **3** | **AF-5** | 9 | 0% | CERTAIN | Structural metadata inconsistency | **Highest** | **Auto-BLOCK** |
| **4** | **AF-2** | 60 | 5-8% | MODERATE | Apply → Analyze/Evaluate (procedure as HO) | **High** | **Flag for review** |
| **5** | **AF-6** | 28 | 10-15% | MODERATE | Deterministic → Evaluate (single option as judgment) | **Medium** | **Triage flag** only |
| **6** | **AF-1** | 1 (actual ~50+) | <5% but sensitivity ~2% | LOW | Remember → Analyze/Evaluate (definition-match as HO) | **Medium** | **First-pass filter** |

### 2.2 Why This Order

1. **AF-3 first** because it captures the single largest misclassification category (55.6% of flags) with very high confidence (2-3% FP risk). Deploying AF-3 alone corrects 19.3% of the HO pool.

2. **AF-4 and AF-5 tied for second** because they have effectively zero false positive risk. Together they capture 23 items (4.2% of HO). These can be auto-blocked without hesitation.

3. **AF-2 fourth** because the 5-8% false positive rate means routing to human review rather than auto-block. Still captures 11.0% of the HO pool.

4. **AF-6 fifth** because the 10-15% false positive rate limits it to triage-only. Useful signal for human reviewers but insufficient for auto-block.

5. **AF-1 last** for deployment because it has the fundamental regex ceiling. The multi-signal conservative threshold means near-zero false positives but also near-zero true positives (2% sensitivity). Requires NLP/LLM enhancement before it can produce meaningful volume.

---

## 3. AF-3 Deep Dive — Rule Application as Evaluate/Analyze

### 3.1 Why AF-3 Is the Dominant Pattern (105 flags, 55.6%)

**The mechanism:** The modernization program added business-scenario framing (controller memos, CFO briefings, audit committee reports) to items that are structurally Apply-level. The stem reads like a business decision but the answer is determined by a single ASC standard, COSO principle, or known formula.

**Pattern detection:**
```
"Under ASC [NNN]..." in stem or ExplanationCorrect
  + NO trade-off language (competing, balance, weigh, best, recommend)
  → Apply, not Analyze/Evaluate
```

The trade-off language counter-check is the key innovation. A genuine Evaluate item might reference ASC 606 and still require weighing revenue recognition timing, quality of earnings impact, and stakeholder communication. The absence of trade-off language + presence of a standard reference → deterministic rule application.

### 3.2 AF-3 by Pack

| Pack | AF-3 Flags | % of Pack's HO | Dominant Source |
|------|-----------|---------------|-----------------|
| Pack D | 60 | 28.0% | Section A (ASC rules) + Section BD (formula reframed) |
| Pack C | 18 | 17.3% | Section EC (COSO classification) + Section CC (variance formulas) |
| Pack A | 17 | 12.8% | Section A (ASC rules as judgment) |
| Pack E | 7 | 14.0% | Independent pipeline — mixed |
| Pack B | 3 | 7.1% | Cleanest pack — minimal AF-3 |

### 3.3 AF-3 False Positive Profile

**Risk: 2-3%.** Spot-checked 10 items. Only 1 potential FP: P1-AD-054 ("recommend" verb + ASC reference — could be genuine evaluation). The `recommend` verb should trigger the trade-off counter-check. If ExplanationCorrect discusses competing alternatives, suppress the flag.

**Recommended enhancement:** Add `recommend` and `select the best` as counter-signals to the trade-off language check. If the item asks which treatment to "recommend" AND ExplanationCorrect discusses why alternatives are suboptimal, suppress AF-3.

---

## 4. AF-4 Deep Dive — Taxonomy Classification

### 4.1 Pattern Detection

| Pattern | Example | True Level |
|---------|---------|------------|
| "What type of [control/cost/risk] is [described activity]?" | "A locked warehouse with badge access is what type of control?" | Remember or Understand |
| "Which COSO component does [X] support?" | "Ethics training and code of conduct acknowledgment supports which COSO component?" | Understand or Apply |
| "[described item] is classified as..." | "Common-size analysis is classified as..." | Understand |

### 4.2 Why AF-4 Has Zero FP Risk

"Classify this described activity into a known taxonomy category" is, by definition, classification — not analysis or evaluation. There is no possible genuine Analyze/Evaluate item that asks "what type of X is Y." The candidate is matching a described entity to a known category, which is Understand (single-step classification) or Apply (multi-step classification with reasoning) — never Analyze or Evaluate.

---

## 5. AF-5 Deep Dive — Difficulty Mismatch

### 5.1 Pattern

| QID | COG | DifficultyScore | Label | Issue |
|-----|-----|-----------------|-------|-------|
| P1-F-013 | Analyze | 1 | Easy | Analyze at Easy — impossible |
| P1-EC-014 | Analyze | 1 | Easy | Analyze at Easy — impossible |
| P1-EC-031 | Analyze | 1 | Very Difficult | Score vs label mismatch |
| P1-EC-040 | Analyze | 1 | Easy | Analyze at Easy — impossible |
| P1-DD-031 | Analyze | 1 | Easy | Analyze at Easy — impossible |
| P1-ED-001 | Analyze | 1 | Easy | Analyze at Easy — impossible |
| P1-ED-010 | Analyze | 1 | Easy | Analyze at Easy — impossible |
| P1-ED-016 | Analyze | 1 | Difficult | Score vs label mismatch |
| P1-ED-036 | Analyze | 1 | Moderate-Easy | Analyze at Moderate-Easy — borderline impossible |

### 5.2 Resolution Rules

| Condition | Resolution |
|-----------|------------|
| COG ∈ {Analyze, Evaluate} AND DifficultyScore ≤ 2 AND DifficultyLabel ≠ "Very Difficult"/"Difficult" | Downgrade COG to Apply or Understand |
| COG ∈ {Analyze, Evaluate} AND DifficultyScore = 1 AND DifficultyLabel = "Very Difficult"/"Difficult" | Fix DifficultyScore (should be ≥3) OR downgrade COG |

---

## 6. AF-2 Deep Dive — Formula Substitution

### 6.1 Signal Reliability

The multi-signal approach (≥2 of 3 signals) provides moderate confidence:

| Signal | Reliability |
|--------|-------------|
| Calc verb in stem (calculate, compute, find) | 70% — genuine HO items may use "calculate" as one step |
| Formula pattern in ExplanationCorrect (= $X, ×, EVA = NOPAT − ...) | 90% — formula execution is Apply |
| Short stem (<150 chars) | 60% — short stems signal simple tasks |

### 6.2 False Positive Risks

The 5-8% FP rate comes from items like P1B-C-152: "calculate 3 variances" then "which is the primary driver" — the calculation is a means, not the end. The item is genuinely Analyze.

**Counter-signal:** If ExplanationCorrect discusses comparing results, interpreting variation, or identifying root causes, the item is likely genuine Analyze despite containing a formula.

---

## 7. AF-1 Deep Dive — The Semantic Ceiling

### 7.1 Why 1 of ~50+ Items Was Caught

The multi-signal threshold requires ≥3 of 4 signals:
- Lexical overlap > 40% (Jaccard stem↔correct choice)
- Definition-request language regex ("what term," "is known as," "is an example of")
- Term-length answer (<80 chars)
- Stem >> answer (stem 3×+ longer than answer)

**The problem:** Scenario-framed definitions satisfy only 1-2 signals:
- Lexical overlap: often moderate (20-30%) because the business scenario dilutes stem→choice word overlap
- Definition-request language: absent — the stem doesn't say "what term is this"
- Term-length answer: yes (concept names are short)
- Stem >> answer: yes (scenarios make stems longer)

Result: 2 of 4 signals maximum. Below the threshold. Conservative design prevents false positives but creates a massive sensitivity gap.

### 7.2 Detection Ceiling Examples

| S93P Exemplar | Stem Pattern | Why AF-1 Missed |
|--------------|-------------|-----------------|
| EV-3: P1-EC-005 | "Assigning different employees to authorize, record, and reconcile..." | Defines segregation of duties in business language. No "what term." Lexical overlap with "Segregation of duties" = ~15% |
| AN-3: P1-CD-061 | "expressing line items as a percentage of revenue" | Defines common-size vertical analysis. No definition-request language. |
| AN-4: P1-DD-036 | "ongoing cost reduction targets for existing products with gradual improvement" | Defines kaizen costing in business language. |

### 7.3 Solution: Topic-to-Answer Embedding Similarity

**Proposed supplement:**
```
For each item where CognitiveLevel ∈ {Analyze, Evaluate}:
  stem_embedding = encode(stem_words)
  choice_embedding = encode(correct_choice_words)
  cosine_sim = cosine(stem_embedding, choice_embedding)
  if cosine_sim > 0.80 AND correct_choice_length < 100:
    flag as probable definition-match (cap at Understand)
```

Estimated catch rate: ~80% of scenario-framed definitions. Remaining 20%: STEM-heavy items where the concept and the answer are described with entirely different vocabulary (requires LLM).

---

## 8. Combined AF Effectiveness Matrix

### 8.1 Detection Coverage

| Scenario | Detected By | Confidence |
|----------|------------|------------|
| "Under ASC 606, which treatment..." with no trade-off | AF-3 | HIGH |
| "Calculate EVA = NOPAT − (WACC × IC)" | AF-2 | MODERATE |
| "What type of control is a locked warehouse with badge access?" | AF-4 | VERY HIGH |
| Analyze + DifficultyScore = 1 | AF-5 | CERTAIN |
| "recommend" which treatment (no competing alternatives) | AF-3 + AF-6 | HIGH (combined) |
| Stem defines kaizen costing in business scenario | AF-1 ceiling | NOT DETECTED |
| Multi-step variance calculation → "which is the primary driver?" | NOT flagged (genuine) | CORRECT |
| COSO diagnosis with competing interpretation | NOT flagged (genuine) | CORRECT |

### 8.2 Pipeline Integration

```
Item write with CognitiveLevel: "Evaluate"
  │
  ▼
AF-5: DifficultyScore ≤ 2? → BLOCK (auto)
AF-4: "What type of [X]" pattern? → BLOCK (auto)
AF-3: ASC/IFRS/COSO reference + no trade-off? → BLOCK (auto, with appeal)
AF-2: Calculate + formula? → FLAG for human review
AF-6: Single correct option heuristic? → FLAG for human review
AF-1: Definition match multi-signal? → FLAG for human review
  │
  ▼
All gates pass → proceed to S95P Stage 3 (Evidence Collection)
```

---

## 9. ROI Analysis

| Deploying | Cost | Benefit |
|-----------|------|---------|
| AF-3 only | ~1 hour (governance guard rule) | 105 items auto-blocked (19.3% of HO). Dominant pattern eliminated. |
| AF-4 + AF-5 | ~30 min (deterministic checks) | 23 items auto-blocked (4.2% of HO). Zero FP risk. |
| AF-2 | ~1 hour (rule + counter-signals) | 60 items flagged (11.0% of HO). Requires human review step. |
| AF-6 | ~1 hour (heuristic) | 28 items triaged (5.2% of HO). Useful for human reviewers. |
| AF-1 NLP enhancement | ~4 hours (embedding model + testing) | 50+ items caught (9.2% of HO). Closes the largest gap. |
| **Total** | **~7.5 hours** | **266+ items screened (49% of HO pool)** |

**Conclusion:** Deploy AF-3, AF-4, and AF-5 immediately (3 auto-blocks). Deploy AF-2 with human-review routing. Deploy AF-6 as a confidence-annotated triage flag. Enhance AF-1 with embedding-based similarity as a follow-up session. Total automated coverage: 49% of all HO items.

---

*Generated: 2026-07-31 | Session 100P Implementer Phase — AF Priority Model*
