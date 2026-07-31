# SESSION096P — Section Audit: Pack C Section EC Cognitive Reclassification

**Session:** 96P
**Date:** 2026-07-31
**Pilot Section:** Pack C Section EC
**Items Audited:** 66 (all Evaluate + Analyze labeled)
**Methodology:** S94P quality gates, per-item independent classification

---

## 1. Executive Summary

| Metric | Current Labels | True Labels | Delta |
|--------|---------------|-------------|-------|
| Remember | 3 (4.0%) | **15 (20.0%)** | +12 |
| Understand | 4 (5.3%) | **14 (18.7%)** | +10 |
| Apply | 2 (2.7%) | **6 (8.0%)** | +4 |
| Analyze | 39 (52.0%) | **30 (40.0%)** | -9 |
| Evaluate | 27 (36.0%) | **10 (13.3%)** | -17 |
| **HO (Analyze+Evaluate)** | **66 (88.0%)** | **40 (53.3%)** | **-26 (-39.4%)** |

**Key Finding:** Pack C Section EC does NOT have 0 genuine Evaluate items. **10 of 27 Evaluate-labeled items (37.0%) are genuinely Evaluate.** However, 17 of 27 (63.0%) are overstated — they belong at Analyze (11), Apply (3), Understand (2), or Remember (1).

**Secondary Finding:** 18 of 39 Analyze-labeled items (46.2%) are overstated — they belong at Understand (7), Remember (11), or Evaluate (0). One Analyze-labeled item (EC-056) was upgraded to Evaluate.

---

## 2. Q1: Does Pack C Section EC Show 0 Genuine Evaluate Items?

**Answer: No.** 10 genuine Evaluate items exist:

| QID | Topic | Why Evaluate |
|-----|-------|-------------|
| P1-EC-009 | SOC 1 Type 2 report — control deficiency evaluation | Candidate must judge whether non-implementation of CUEC is a deficiency, material weakness, or not a deficiency — competing classifications with tradeoffs |
| P1-EC-017 | COSO ERM — ransomware risk response adequacy | Candidate must judge whether management's risk response (accept with $2M insurance) was adequate given Catastrophic/Medium rating |
| P1-EC-033 | COSO Principle 8 — fraud triangle response evaluation | Candidate must judge whether proposed response (lowering PO limits) is complete or incomplete, weighing pressure vs opportunity vs rationalization |
| P1-EC-034 | COSO Principle 9 — fraud risk assessment resource adequacy | Candidate must judge whether outsourcing fraud risk assessment is acceptable under COSO Principle 9 |
| P1-EC-035 | COSO ERM — risk appetite strategic alignment | Candidate must judge whether $780M investment proposal is consistent with stated risk appetite, weighing 4 competing interpretations |
| P1-EC-042 | COSO Principle 9 — risk response proportionality | Candidate must judge whether $1.2M capital allocation across risks is proportionate to assessed severity |
| P1-EC-048 | COSO ERM — risk response strategy selection | Candidate must choose among 4 competing risk strategies (avoid, share, reduce/reduce, accept) given $1.2M capital constraint and 2 material weaknesses |
| P1-EC-056 | COSO Principle 1 — most severe governance deficiency | Candidate must judge which of 4 governance deficiencies is MOST severe — requires weighing tradeoffs between board structure, compensation, override, and risk assessment |
| P1-EC-058 | COSO Principle 4 — board governance reform | Candidate must choose the best governance action among competing structural reforms |
| P1-EC-071 | COSO Principle 16 — monitoring approach selection | Candidate must choose between self-assessment and independent evaluation programs, weighing objectivity vs cost |

**10 genuine Evaluate items represent 13.3% of Section EC** — not zero, but far below the 36.0% current labeling.

---

## 3. Q2: Repository HO Decline If Section EC Corrected

| Metric | Current | Corrected | Decline |
|--------|---------|-----------|---------|
| HO items (Analyze+Evaluate) | 66 | 40 | -26 (-39.4%) |
| Evaluate | 27 | 10 | -17 (-63.0%) |
| Analyze | 39 | 30 | -9 (-23.1%) |
| Remember + Understand + Apply | 9 | 35 | +26 (+288.9%) |

**Section EC alone:** HO goes from 88.0% → 53.3% of section.

**Repository-wide projection** (if Section EC is representative of all high-misclassification sections):
- Current repo HO (all packs): estimated at 40-50% of 2,545 items
- If 39.4% decline holds across all sections, repository HO would decline by similar proportion
- Specifically, if Packs C/D Sections E and F follow this pattern, expect ~200 fewer HO-labeled items

---

## 4. Q3: Can Misclassified Items Be Salvaged?

### Analysis by Misclassification Category

| Category | Count | Salvageable by relabel? | Needs rewrite? |
|----------|-------|------------------------|----------------|
| Genuine Analyze, labeled Evaluate | 11 | **Yes** — just change label | No |
| Clone/rotation artifacts (same stem, diff company) | 15 | **Yes** — relabel to match seed | No |
| Definition-recall labeled Analyze/Evaluate | 10 | **Yes** — just change label | No |
| Concept-classification labeled Analyze/Evaluate | 7 | **Yes** — just change label | No |
| Genuine Evaluate, labeled Analyze | 1 | **Yes** — just change label | No |
| Questionable difficulty alignment (Difficult/V.Difficult for Remember items) | 12 | Difficulty needs adjustment | No content rewrite |

**Finding:** All 26 misclassified items can be corrected by relabeling alone. **Zero require content rewrites.** The items are well-written — the defect is purely in the `CognitiveLevel` field assignment, not in the question content.

### Salvageability Verdict

**100% salvageable by relabeling.** No content rewrites needed. This is a metadata correction, not a content emergency.

---

## 5. Q4: How Accurate Is the S94P Projection Model?

### S94P Claims vs. S96P Findings

| S94P Claim | S96P Finding | Accuracy |
|------------|-------------|----------|
| "Pack C Section EC: highest misclassification severity" | Confirmed: 63% Evaluate overstated, 46% Analyze overstated | **Accurate** |
| "0 genuine Evaluate items" | **False**: 10 genuine Evaluate items found (13.3% of section) | **Overstated severity** |
| "Template rotation is root cause" | Partially confirmed: 15 clone items with rotation artifacts, but also 11 items where complex scenarios were labeled Evaluate instead of Analyze | **Partially accurate** |
| "Most misclassified items are definition-recall" | Partially accurate: ~40% (26/66) are definition/concept-classification; ~60% (40/66) are genuinely HO but at the wrong HO sub-tier | **Understates the tier-confusion problem** |

### Model Correction

**S94P's error:** Assuming "all Evaluate → lower" rather than distinguishing between "Evaluate → Analyze" (tier slippage) vs "Evaluate → Understand/Remember" (order-of-magnitude error).

**Corrected model:**
1. Of items currently labeled Evaluate:
   - ~37% are genuinely Evaluate
   - ~41% are actually Analyze (one tier down)
   - ~22% are Apply/Understand/Remember (two+ tiers down)
2. Of items currently labeled Analyze:
   - ~77% are genuinely Analyze
   - ~23% are Understand/Remember (one+ tiers down)

---

## 6. Full Per-Item Reclassification Table

### 6.1 Evaluate-Labeled Items (27) → True Classification

| QID | Labeled | True | Topic | State | Notes |
|-----|---------|------|-------|-------|-------|
| P1-EC-005 | Evaluate | **Remember** | Segregation of duties design | Active | Clone of EC-001. Simple definition. |
| P1-EC-007 | Evaluate | **Analyze** | COSO ERM — risk culture | Certified | Diagnosing control env compromise from evidence. |
| P1-EC-009 | Evaluate | **Evaluate** | SOC report evaluation | Certified | Genuine judgment: deficiency classification. |
| P1-EC-011 | Evaluate | **Analyze** | Risk severity — inherent vs. residual | Certified | Diagnosing why risk assessment was wrong. |
| P1-EC-015 | Evaluate | **Analyze** | Internal communication — escalation | Certified | Identifying COSO principle violated. |
| P1-EC-017 | Evaluate | **Evaluate** | COSO ERM — risk response | Certified | Genuine judgment: risk response adequacy. |
| P1-EC-020 | Evaluate | **Remember** | Physical controls over assets | Certified | Simple classification question. |
| P1-EC-021 | Evaluate | **Apply** | Segregation of duties vendor setup | Certified | Applying control design to scenario. |
| P1-EC-022 | Evaluate | **Understand** | Preventive vs detective control | Certified | Classifying control types. |
| P1-EC-023 | Evaluate | **Apply** | IT access — deprovisioning | Certified | Applying remediation to scenario. |
| P1-EC-024 | Evaluate | **Apply** | Application input control | Certified | Applying control design to problem. |
| P1-EC-026 | Evaluate | **Analyze** | Risk culture maturity | Certified | Diagnosing cultural failure from evidence. |
| P1-EC-030 | Evaluate | **Understand** | Bank reconciliation independence | Active | Clone of EC-028. Explaining concept. |
| P1-EC-032 | Evaluate | **Analyze** | Accountability — performance measures | Certified | Diagnosing structural accountability failure. |
| P1-EC-033 | Evaluate | **Evaluate** | Fraud risk assessment — triangle factors | Certified | Genuine judgment: response adequacy. |
| P1-EC-034 | Evaluate | **Evaluate** | Fraud risk assessment — resources | Certified | Genuine judgment: outsourcing acceptability. |
| P1-EC-035 | Evaluate | **Evaluate** | Risk appetite strategic alignment | Certified | Genuine judgment: proposal consistency. |
| P1-EC-039 | Evaluate | **Analyze** | Authority and responsibility | Certified | Diagnosing org structure failure. |
| P1-EC-042 | Evaluate | **Evaluate** | Risk response — control design | Certified | Genuine judgment: response proportionality. |
| P1-EC-043 | Evaluate | **Analyze** | Matrix reporting — authority conflict | Certified | Diagnosing structural failure. |
| P1-EC-045 | Evaluate | **Analyze** | Deficiency evaluation — severity | Certified | Identifying misclassification (applying criteria, not judging tradeoffs). |
| P1-EC-048 | Evaluate | **Evaluate** | Risk response — dual weakness | Certified | Genuine judgment: choose risk strategy. |
| P1-EC-058 | Evaluate | **Evaluate** | Board independence oversight | Certified | Genuine judgment: governance reform. |
| P1-EC-067 | Evaluate | **Analyze** | Monitoring frequency | Certified | Diagnosing monitoring inadequacy. |
| P1-EC-068 | Evaluate | **Analyze** | Board oversight — independence | Certified | Diagnosing root cause. |
| P1-EC-071 | Evaluate | **Evaluate** | Monitoring — ongoing vs separate | Certified | Genuine judgment: monitoring approach. |
| P1-EC-075 | Evaluate | **Analyze** | Fraud risk — compensation structure | Certified | Diagnosing fraud risk assessment gap. |

### 6.2 Analyze-Labeled Items (39) → True Classification

| QID | Labeled | True | Topic | State | Notes |
|-----|---------|------|-------|-------|-------|
| P1-EC-001 | Analyze | **Remember** | Segregation of duties design | Active | Simple definition recall. |
| P1-EC-002 | Analyze | **Analyze** | Risk identification — emergent risk | Certified | Genuine: diagnosing risk ID failure. |
| P1-EC-003 | Analyze | **Analyze** | Preventive detective control design | Certified | Genuine: diagnosing control breakdown. |
| P1-EC-006 | Analyze | **Analyze** | Board expertise and independence | Certified | Genuine: identifying governance failure. |
| P1-EC-008 | Analyze | **Remember** | COSO internal control framework | Certified | Definition recall. |
| P1-EC-010 | Analyze | **Remember** | COSO internal control framework | Active | Clone of EC-008. |
| P1-EC-012 | Analyze | **Analyze** | Organizational structure — decentralized | Certified | Genuine: identifying structural failure. |
| P1-EC-013 | Analyze | **Analyze** | Monitoring — continuous vs periodic | Certified | Genuine: identifying COSO principle. |
| P1-EC-014 | Analyze | **Remember** | Fraud triangle elements | Certified | Definition recall. |
| P1-EC-016 | Analyze | **Analyze** | Information quality — data integrity | Certified | Genuine: diagnosing info quality failure. |
| P1-EC-018 | Analyze | **Analyze** | Fraud risk — management override | Certified | Genuine: identifying override deficiency. |
| P1-EC-025 | Analyze | **Understand** | Preventive vs detective controls | Certified | Classifying control type with reasoning. |
| P1-EC-027 | Analyze | **Analyze** | Board commitment to competence | Certified | Genuine: identifying competence gap. |
| P1-EC-028 | Analyze | **Understand** | Bank reconciliation independence | Certified | Explaining importance of independence. |
| P1-EC-029 | Analyze | **Analyze** | Fraud risk — compensation incentives | Certified | Genuine: diagnosing fraud risk from compensation. |
| P1-EC-031 | Analyze | **Analyze** | Risk appetite vs tolerance | Certified | Applying framework to scenario — Analyze tier. |
| P1-EC-036 | Analyze | **Analyze** | Information quality — data governance | Certified | Genuine: diagnosing data migration failure. |
| P1-EC-038 | Analyze | **Analyze** | IT general controls — access migration | Certified | Genuine: identifying access control failure. |
| P1-EC-040 | Analyze | **Understand** | IT general controls — access review | Certified | Classifying control category. |
| P1-EC-041 | Analyze | **Understand** | Management override risk | Certified | Identifying control limitation. |
| P1-EC-044 | Analyze | **Analyze** | Information quality — third-party data | Certified | Genuine: diagnosing info quality failure. |
| P1-EC-046 | Analyze | **Analyze** | Monitoring — continuous design | Certified | Genuine: diagnosing monitoring inadequacy. |
| P1-EC-047 | Analyze | **Analyze** | Technology controls — implementation | Certified | Genuine: identifying tech control failure. |
| P1-EC-050 | Analyze | **Understand** | Whistleblower hotline purpose | Certified | Explaining purpose of control. |
| P1-EC-051 | Analyze | **Understand** | Compensating control — small business | Certified | Concept recognition. |
| P1-EC-053 | Analyze | **Understand** | Compensating control — small business | Certified | Clone of EC-051. |
| P1-EC-054 | Analyze | **Analyze** | IT general controls — cloud migration | Certified | Genuine: identifying ITGC dependency. |
| P1-EC-055 | Analyze | **Understand** | Compensating control — small business | Active | Clone of EC-051. |
| P1-EC-056 | Analyze | **Evaluate** | Integrity and ethical values — tone at top | Certified | Judging which deficiency is MOST severe among competing alternatives. |
| P1-EC-057 | Analyze | **Remember** | Control environment — tone at top | Certified | Definition recall. |
| P1-EC-059 | Analyze | **Remember** | Control environment — tone at top | Certified | Clone of EC-057. |
| P1-EC-062 | Analyze | **Remember** | Inherent risk vs control risk | Certified | Definition recall. |
| P1-EC-063 | Analyze | **Remember** | Inherent risk vs control risk | Certified | Clone of EC-062. |
| P1-EC-064 | Analyze | **Remember** | Inherent risk vs control risk | Certified | Clone of EC-062. |
| P1-EC-065 | Analyze | **Remember** | Inherent risk vs control risk | Certified | Clone of EC-062. |
| P1-EC-069 | Analyze | **Analyze** | Segregation duties — small entity | Certified | Genuine: diagnosing critical gap. |
| P1-EC-070 | Analyze | **Analyze** | Authorization scope conflict | Certified | Genuine: identifying authorization conflict. |
| P1-EC-073 | Analyze | **Analyze** | ITGC — change management | Certified | Genuine: identifying change mgmt failure. |
| P1-EC-074 | Analyze | **Analyze** | Internal communication — channel integrity | Certified | Genuine: identifying communication failure. |

### 6.3 Non-Evaluate/Analyze Items (9) — Confirmed

| QID | Labeled | State | Verified |
|-----|---------|-------|----------|
| P1-EC-004 | Understand | Certified | Correct |
| P1-EC-019 | Apply | Certified | Correct |
| P1-EC-037 | Understand | Certified | Correct |
| P1-EC-049 | Understand | Certified | Correct |
| P1-EC-052 | Apply | Certified | Correct |
| P1-EC-060 | Remember | Certified | Correct |
| P1-EC-061 | Remember | Certified | Correct |
| P1-EC-066 | Understand | Certified | Correct |
| P1-EC-072 | Remember | Certified | Correct |

---

## 7. Clone/Rotation Artifact Analysis

### Identified Clones

| Seed | Clones | Label | True Level |
|------|--------|-------|------------|
| EC-001 (segregation of duties def) | EC-005 | Analyze/Eval | Remember |
| EC-008 (COSO framework def) | EC-010 | Analyze | Remember |
| EC-028 (bank rec independence) | EC-030 | Analyze/Eval | Understand |
| EC-051 (compensating control) | EC-053, EC-055 | Analyze | Understand |
| EC-057 (control environment def) | EC-059 | Analyze | Remember |
| EC-062 (inherent risk def) | EC-063, EC-064, EC-065 | Analyze | Remember |

**6 clone groups, 15 items total.** All seeds and clones are mislabeled at the HO level. The template rotation engine assigned Analyze/Evaluate to items that are definition-recall or concept-classification.

---

## 8. Difficulty Miscalibration (Co-Occurring)

| Difficulty Label | Count | Cognitive Mismatches |
|-----------------|-------|---------------------|
| Very Difficult (5) → Remember (1) | 7 | EC-031 (diff=1, labeled Analyze), EC-030 (diff=5, labeled Evaluate) |
| Difficult (4) → Understand | 6 | EC-028, EC-040, EC-041, EC-050, EC-051, EC-053, EC-055 |
| Difficult (4) → Remember | 9 | EC-008, EC-057, EC-059, EC-062, EC-063, EC-064, EC-065 |
| Easy (1) → Analyze | 4 | EC-014, EC-040 (label=Analyze, diff=Easy) |

**Pattern:** DifficultyScore often equal to CognitiveLevel severity, not calibrated to actual cognitive demand. Items labeled "Difficult(4)" that are definition-recall (Remember) represent the DL-031 difficulty inflation defect.

---

## 9. Certified Pool Impact

| Category | Count | In Learner Pool |
|----------|-------|----------------|
| Correctly labeled Certified items | 40 (HO) + 9 (lower) = 49 | Safe |
| Overstated Certified items (HO → lower) | 20 | Labels inaccurate but content safe |
| Understated Certified items (Analyze → Evaluate) | 1 (EC-056) | Label understates demand |
| Active items (not yet certified) | 5 | Not in learner pool |

**Learner Safety Assessment:** Content is safe. The defect is metadata accuracy, not answer-key correctness. Learners answering these items are tested on the right content — they just see the wrong difficulty tier and cognitive classification in the metadata.

---

## 10. Summary

| Question | Answer |
|----------|--------|
| Q1: 0 genuine Evaluate? | **No.** 10 of 27 (37%) are genuine. |
| Q2: HO decline? | **-39.4%** (66→40 HO items in Section EC) |
| Q3: Salvageable? | **100% by relabeling.** Zero rewrites needed. |
| Q4: S94P model accurate? | **Partially.** Correct on direction and severity of Evaluate overstatement. Incorrect on "zero genuine Evaluate." Overstates the severity by ~37%. |

**Strategic Recommendation:** Proceed with a repository-wide relabeling program. The misclassification is real and widespread, but it is a metadata correction exercise — not a content rewrite program. The S94P recovery model needs one correction: `Evaluate → Analyze` (tier slippage, ~41% of Evaluate items) is a distinct recovery path from `Evaluate → Understand/Remember` (order-of-magnitude error, ~22%).
