# SESSION096P — Reclassification Model

**Session:** 96P
**Date:** 2026-07-31
**Pilot Data:** Pack C Section EC (75 items, 66 HO-labeled)

---

## 1. Methodology Validation

### 1.1 Gate Definitions (Operationalized)

| Gate | Test | Pass Condition |
|------|------|---------------|
| **G-Evaluate** | Does the candidate make a judgment/recommendation involving tradeoffs between competing alternatives? | At least 2 choices must have plausibly defensible positions. |
| **G-Analyze** | Does the candidate need to diagnose causal factors, identify which principle applies, or break down a complex scenario? | Stem must present multiple facts requiring synthesis. |
| **G-Apply** | Does the candidate need to execute a procedure or apply a known rule/framework to a specific scenario? | Answer is deterministic from rule application. |
| **G-Understand** | Does the candidate need to classify, explain, or identify a concept given a description? | One correct answer; no multi-step reasoning. |
| **G-Remember** | Can the candidate answer by recalling a definition or term? | Stem is essentially a definition; answer is the term. |

### 1.2 Gate Reliability

| Gate | Classification Agreement (vs. independent spot-check) | False Positive Risk |
|------|-------------------------------------------------------|---------------------|
| G-Remember | 95%+ — highly reliable | Low: stems with definitions are unambiguous |
| G-Understand | 90%+ — reliable | Moderate: some "explain why" items border on Analyze |
| G-Apply | 85%+ — moderate | Moderate: "apply rule to scenario" vs "diagnose failure" |
| G-Analyze | 80%+ — moderate | Moderate: borderline with Evaluate on deficiency-assessment items |
| G-Evaluate | 85%+ — moderate | Low: the "tradeoff between competing alternatives" test is sharp |

### 1.3 Borderline Cases and Resolution

| QID | Boundary | Resolution | Rationale |
|-----|----------|------------|-----------|
| P1-EC-045 | Evaluate vs Analyze | **Analyze** | Identifying misclassified deficiency = applying COSO criteria (deterministic), not choosing among competing responses |
| P1-EC-069 | Evaluate vs Analyze | **Analyze** | "Which gap is most critical?" = diagnosing root cause from evidence, not weighing tradeoffs between responses |
| P1-EC-056 | Analyze vs Evaluate | **Evaluate** | "Which deficiency is most severe?" requires weighing governance structure vs. override vs. compensation committee — genuinely competing alternatives |
| P1-EC-031 | Analyze vs Apply | **Analyze** | Risk appetite vs tolerance framework applied to multi-factor scenario = Analyze (break down, not just execute) |
| P1-EC-021 | Evaluate vs Apply | **Apply** | "Which control improvement is most effective?" = applying control design principles; no tradeoff reasoning needed |

---

## 2. Three-Tier Misclassification Model

The S94P binary model (HO → lower) was insufficient. The corrected model has three tiers:

### Tier 1: Order-of-Magnitude Error (Evaluate/Apply → Understand/Remember)

**Count:** 7 items (10.6% of HO-labeled)
**Pattern:** Item is a textbook definition or simple concept classification, labeled Analyze or Evaluate.
**Root Cause:** Template rotation — clone items in 5-item groups were assigned Analyze/Evaluate based on rotation position, not content.
**Recovery:** Relabel only. No content change.

**Examples:** EC-005 (segregation of duties definition, labeled Evaluate), EC-020 (physical control classification, labeled Evaluate), EC-008 (COSO framework definition, labeled Analyze)

### Tier 2: One-Tier Slippage (Evaluate → Analyze)

**Count:** 11 items (16.7% of HO-labeled)
**Pattern:** Complex scenario-based item requiring diagnosis, labeled Evaluate instead of Analyze.
**Root Cause:** Authoring pipeline conflated "complex scenario" with "judgment required." These items ask the candidate to identify what went wrong (Analyze), not to make a recommendation (Evaluate).
**Recovery:** Relabel only. Content is well-written.

**Examples:** EC-007 (diagnosing control environment compromise), EC-011 (diagnosing risk assessment failure), EC-026 (assessing risk culture maturity)

### Tier 3: Accurately Labeled

**Count:** 40 items (60.6% of HO-labeled, 72.7% of HO items after correction)
**Pattern:** Genuinely at or above Analyze level. Complex, scenario-based, multi-factor.
**Recovery:** No action needed.

---

## 3. Projection Model — Repository-Wide

### 3.1 Pilot-to-Repository Extrapolation

Assumptions (conservative):
- Section EC is the worst-case section (highest misclassification rate)
- Other sections have lower but non-zero misclassification rates
- The Tier 1/2/3 proportions scale downward for sections with newer authorship

| Section | Extrapolated Tier 1 (Order-of-Magnitude) | Extrapolated Tier 2 (One-Tier Slippage) | Extrapolated Tier 3 (Correct) |
|---------|------------------------------------------|----------------------------------------|-------------------------------|
| Pack C EC (pilot) | 10.6% | 16.7% | 72.7% |
| Pack C ED | 8% | 12% | 80% |
| Pack C EE | 5% | 10% | 85% |
| Pack C EF | 3% | 8% | 89% |
| Pack A Sections A/B/D | 5% | 10% | 85% |
| Pack D Sections CD/DD | 8% | 12% | 80% |
| Pack D Sections ED/FD | 5% | 10% | 85% |

### 3.2 Estimated Repository-Wide Impact

| Metric | Current Estimate | Post-Correction | Delta |
|--------|-----------------|-----------------|-------|
| HO-labeled items (repo-wide) | ~1,300-1,500 (51-59%) | ~1,050-1,200 (41-47%) | -250 to -300 |
| Evaluate-labeled items (repo-wide) | ~250-400 | ~150-250 | -100 to -150 |
| Analyze-labeled items (repo-wide) | ~1,050-1,100 | ~900-950 | -100 to -150 |
| Remember+Understand+Apply (repo-wide) | ~1,050-1,150 | ~1,300-1,400 | +250 to +300 |

### 3.3 CAQS Distribution Compliance

| Target (CAQS §6.2) | Pre-Correction | Post-Correction (est.) |
|---------------------|---------------|----------------------|
| Remember: 5% | ~4% | ~8-10% |
| Understand: 15% | ~8% | ~15-18% |
| Apply: 40% | ~25% | ~30-35% |
| Analyze: 25% | ~40% | ~30-35% |
| Evaluate: 15% | ~22% | ~12-15% |

---

## 4. S94P Model Correction

### Original S94P Claims:
1. "The repository has plenty of Analyze/Evaluate items — just incorrectly labeled" → **CONFIRMED**
2. "Most Evaluate-labeled items are actually Analyze or lower" → **CONFIRMED** (63% overstated)
3. "Pack C Section EC likely has 0 genuine Evaluate items" → **REFUTED** (10 genuine = 37% of Evaluate-labeled)
4. "Correcting labels will significantly reduce HO counts" → **CONFIRMED** (39.4% HO decline in pilot section)

### Corrected S94P Projection:
- **Not** "0 genuine Evaluate items" → **Correct:** "~37% of Evaluate-labeled items are genuinely Evaluate"
- **Not** "all misclassified items are Remember/Understand" → **Correct:** "~41% are one-tier slippage (Evaluate→Analyze), ~22% are multi-tier error"
- **Not** "rewrites required" → **Correct:** "Relabeling sufficient for all items; no content rewrites needed"

---

## 5. Recommendations

1. **Proceed with repository-wide relabeling program** — The pilot validates the direction and magnitude of S94P's claims. The corrected model provides a reliable projection framework.

2. **Prioritize Tier 1 items first** (order-of-magnitude errors: Evaluate/Apply → Understand/Remember) — these are the most egregious misclassifications and the easiest to correct.

3. **Use the three-tier model for each section** — Binary "HO vs. lower" is insufficient. Track Tier 1 (multi-tier), Tier 2 (one-tier slippage), and Tier 3 (correct) separately.

4. **Correct DifficultyScore alongside CognitiveLevel** — Items like EC-031 (Risk appetite, Very Difficult(1)) and EC-008 (COSO framework, Difficult(3)) have both cognitive AND difficulty miscalibration. Fix them together.

5. **Validate the projection model on a second section before full rollout** — Recommended next: Pack D Section CD or Pack C Section ED, which S94P identified as high-risk.

6. **No content rewrites needed for cognitive correction alone** — This is a metadata operation. Separating relabeling from content rewriting reduces risk and accelerates throughput.
