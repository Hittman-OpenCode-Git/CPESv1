# Session 720 — Pack E Restoration Census: Classification Rationale

**Agent:** B (Read-Only Census)  
**Date:** 2026-07-26  
**Methodology:** ALIGNMENT_MAINTENANCE_GUIDE.md §2.1 — Remember vs Understand boundary rule  
**Classifier:** 7-signal automated detection (see §5 below)

---

## 1. Current Pack E State (Post-S719)

| CognitiveLevel | Count | % |
|----------------|-------|---|
| Remember | **0** | 0% |
| Understand | 400 | 80% |
| Apply | 95 | 19% |
| Analyze | 3 | 0.6% |
| Evaluate | 2 | 0.4% |

S719 reclassified all 386 original Remember items: 284 → Understand, ~102 should have been preserved as Remember. Currently 0 Remember items remain in the file.

---

## 2. Restoration Candidates Summary

| Tier | Count | Description |
|------|-------|-------------|
| **High-Confidence** | 68 | Confidence ≥82%. Strong evidence of cross-domain distractors or extreme-distractor pattern. |
| **Provisional** | 2 | Confidence 72-81%. Mixed signals — 1 cross-domain signal + supporting evidence. |
| **Total Candidates** | **70** | Items requiring restoration from Understand/Apply → Remember |

### Section Breakdown vs. S719 Agent D Targets

| Section | This Census | Agent D Target | Gap | Assessment |
|---------|-------------|----------------|-----|------------|
| A | 13 (12 H + 1 P) | 24 | −11 | Under-detected. Many Section A items have same-domain distractor patterns. |
| B | 21 (20 H + 1 P) | 19 | +2 | **Calibrated.** Close to target. |
| C | 19 (19 H + 0 P) | 14 | +5 | Slightly over. Some formula-recall items may be borderline Understand. |
| D | 8 (8 H + 0 P) | 16 | −8 | Under-detected. Domain signatures limited for cost-management terms. |
| E | 7 (7 H + 0 P) | 9 | −2 | **Calibrated.** Close to target. |
| F | 2 (2 H + 0 P) | 20 | −18 | **Severely under-detected.** All Section F distractors share technology domain. |

---

## 3. Classification Decision Boundaries — Exemplars by Section

### 3.1 Section A — External Financial Reporting (13 of 75 candidates)

**Remember exemplars (cross-domain distractors):**

| QID | Stem | Why Remember |
|-----|------|-------------|
| P1E-A-007 | "A 10-year bond issued at par is classified on the balance sheet as:" | Choices span domains A (financial), E (control), F (tech). 3/3 distractors from different CMA domains. |
| P1E-A-011 | "Under U.S. GAAP, R&D costs are:" | 2/3 distractors (A, C) map to domain F. Candidate eliminates by cross-domain logic. |
| P1E-A-074 | "ASC 820 establishes a fair value hierarchy with how many levels?" | Pure count recall: all 4 choices are numbers (3/4/2/5). Zero domain comprehension required. |

**Understand exemplars (same-domain distractors):**

| QID | Stem | Why Understand |
|-----|------|----------------|
| P1E-A-001 | "What is the primary purpose of the balance sheet?" | All 4 choices describe purposes of different financial statements (SCF, BS, SCE, IS). ALL from domain A. Must know which statement serves which purpose. |
| P1E-A-002 | "Under GAAP, which is NOT a current asset?" | All 4 choices are balance sheet items (AR, Inventory, Prepaid, Goodwill). Must know current vs. non-current classification. |
| P1E-A-021 | "Cumulative preferred stock means:" | All 4 choices are equity instrument features. Must know which feature "cumulative" describes. |

### 3.2 Section B — Planning, Budgeting, and Forecasting (21 of 61 candidates)

**Remember exemplars:**

| QID | Stem | Why Remember |
|-----|------|-------------|
| P1E-B-006 | "The high-low method estimates variable cost per unit as:" | 2/3 distractors from domain D (cost management). Cross-domain elimination possible. |
| P1E-B-016 | "What is the core focus of Kaizen budgeting?" | 3/3 distractors from different domain. Cross-domain elimination. |

**Understand exemplars:**

| QID | Stem | Why Understand |
|-----|------|----------------|
| P1E-B-001 | "A static budget is based on:" | All 4 choices are budget types/levels (same domain B). Must know what distinguishes static from flexible. |
| P1E-B-004 | "Fixed cost per unit:" | All 4 choices are cost behaviors. Must understand inverse relationship. |

### 3.3 Section C — Performance Management (19 of 75 candidates)

**Remember exemplars:**

| QID | Stem | Why Remember |
|-----|------|-------------|
| P1E-C-001 | "Standard costs are:" | All distractors from different domain than correct answer. |
| P1E-C-006 | "Variable overhead spending variance =:" | 2/3 distractors from domains D and B. Cross-domain elimination. |

**Understand exemplars:**

| QID | Stem | Why Understand |
|-----|------|----------------|
| P1E-C-002 | "An unfavorable material price variance means:" | All 4 choices are variance interpretations within same domain C. |
| P1E-C-019 | "The financial perspective of BSC asks:" | ALL 4 choices are the 4 BSC perspective questions. Must map each perspective to its question. |

### 3.4 Section D — Cost Management (8 of 75 candidates)

**Remember exemplars:**

| QID | Stem | Why Remember |
|-----|------|-------------|
| P1E-D-010 | "Overapplied overhead is typically closed to:" | All distractors from different domain than correct answer. |
| P1E-D-024 | "The physical measure method allocates joint costs by:" | 2/3 distractors from domain A. Cross-domain elimination. |

**Understand exemplars:**

| QID | Stem | Why Understand |
|-----|------|----------------|
| P1E-D-001 | "Job costing accumulates costs by:" | All 4 choices are cost accumulation methods (same domain D). |
| P1E-D-002 | "Process costing is best for:" | All 4 choices are production environments. Must know which suits process costing. |

### 3.5 Section E — Internal Controls (7 of 75 candidates)

**Remember exemplars:**

| QID | Stem | Why Remember |
|-----|------|-------------|
| P1E-E-001 | "The COSO internal control framework has how many components?" | Pure count recall: all choices are numbers (3/4/5/6). Trivially eliminable. |
| P1E-E-031 | "COSO principle 7 states the organization identifies risks to:" | 2/3 distractors from domain A. Cross-domain elimination. |

**Understand exemplars (the dominant Section E pattern):**

| QID | Stem | Why Understand |
|-----|------|----------------|
| P1E-E-002 | "The control environment reflects:" | ALL 4 choices are COSO framework concepts. Must know which belongs to which component. |
| P1E-E-003 | "Risk assessment involves:" | All choices are risk management concepts. Must distinguish assessment from response. |
| P1E-E-004 | "Control activities include:" | All 4 choices are internal control functions. Must map to the correct COSO component. |

**Key finding:** Section E has the most concentrated same-domain distractor pattern. ~63 of 72 Section E items (87.5%) use COSO framework components as distractors for other COSO component items. These are textbook Understand — the candidate must discriminate between closely related COSO concepts. Only ~9 items (count recall, cross-domain distractors) are genuine Remember.

### 3.6 Section F — Technology and Analytics (2 of 75 candidates)

**Remember exemplars:**

| QID | Stem | Why Remember |
|-----|------|-------------|
| P1E-F-031 | "Artificial intelligence in accounting:" | 3/3 distractors are extreme/absolute statements ("is prohibited," "has no applications," "replaces all judgment"). Trivially eliminable. |

**Understand exemplars (the dominant Section F pattern):**

| QID | Stem | Why Understand |
|-----|------|----------------|
| P1E-F-001 | "Descriptive analytics answers:" | All 4 choices are analytics-level questions. Must know what each level answers. |
| P1E-F-002 | "Predictive analytics uses:" | All choices mix analytics maturity levels. Must know what distinguishes predictive. |
| P1E-F-014 | "Blockchain provides:" | All choices describe data architectures. Must know blockchain's decentralization. |

**Critical gap note:** Automated classifier detects only 2 Remember candidates in Section F vs. Agent D's estimate of ~20. Section F items have a unique property: distractors are all technology concepts (domain F), but many are trivially distinguishable by candidates with basic technology literacy. This "obviousness within-domain" signal is not captured by any of the 7 classification signals. Manual review by a technology-domain specialist is required for the remaining ~18 candidates.

---

## 4. Top 5 Borderline Cases for Manual Review

| # | QID | Section | Current CL | Signal | Issue |
|---|-----|---------|------------|--------|-------|
| 1 | P1E-B-011 | B | Apply | 1 cross-domain + 2 same-domain | Flexible budget item — one distractor from different domain, but 2 same-domain slots require comprehension |
| 2 | P1E-B-038 | B | Understand | 1 cross-domain + 2 same-domain | Budget concept item — same pattern as above |
| 3 | P1E-C-040 | C | Apply | 1 cross-domain + 2 same-domain | Performance metric item — formula recognition with mixed-domain distractors |
| 4 | P1E-D-009 | D | Apply | 1 cross-domain + 2 same-domain | Cost behavior item — one cross-domain distractor in an otherwise same-domain set |
| 5 | P1E-E-018 | E | Understand | 1 cross-domain + 2 same-domain | COSO component item — one financial-reporting distractor mixed with 2 COSO distractors |

**Recommendation:** These 5 items should be manually reviewed by a CMA subject matter expert. They have exactly 1 cross-domain distractor + 2 same-domain distractors, making them ambiguous under §2.1. The decision hinges on whether the single cross-domain distractor is sufficiently obvious to enable domain-disjoint elimination.

---

## 5. Methodology — 7-Signal Classifier

### Signals used (weighted):

| # | Signal | Remember indication | Understand indication |
|---|--------|---------------------|----------------------|
| 1 | **Numeric count** | All 4 choices are just numbers → pure recall | — |
| 2 | **Extreme distractors** | ≥2 distractors contain "prohibited"/"never"/"no applications" | — |
| 3 | **Domain-key detection** | ≥2 distractors from DIFFERENT CMA blueprint domains than correct answer | All distractors from SAME domain |
| 4 | **Stem-choice overlap** | ≥3 keyword matches between stem and correct choice text (definition-match) | Low overlap, requiring comprehension |
| 5 | **Definition-match format** | Stem starts with "X is/refers to/means/stands for:" + short choices | Elaborated stem requiring interpretation |
| 6 | **Choice brevity** | Average choice length < 25 characters | Long, detailed choices requiring reading comprehension |
| 7 | **Domain homogeneity** | Distinct distractor domain count ≥ 2 | All distractors share domain with correct answer |

### Confidence tiers:
- **≥82%:** High-confidence — 2+ signals in agreement
- **72-81%:** Provisional — 1 signal detected, borderline
- **≤71%:** Low-confidence — default to Understand (conservative)

### Known limitations:
1. Domain-keyword detection uses 300+ CMA Part 1 blueprint-aligned signatures. It cannot detect "obviousness within-domain" — items where all distractors are same-domain but trivially eliminable.
2. Section F technology items are particularly affected: "What happened?" vs. "What will happen?" vs. "What should we do?" are all analytics concepts, but the distinction may be obvious to candidates with basic analytics literacy.
3. The classifier is calibrated for cross-domain detection. It undercounts in sections where the template-based authoring used exclusively same-domain distractors (Sections E, F).
4. GENERIC choices (no domain signal detected) default to the item's own section. This is a conservative assumption that may cause some genuinely different-domain distractors to be missed.

---

## 6. Recommendations

1. **Proceed with 68 high-confidence candidates immediately.** These have strong evidence of cross-domain or extreme-distractor patterns.

2. **Review 2 provisional candidates manually before restoration.**

3. **Section F requires specialist audit.** The automated classifier cannot detect "obviousness within-domain" — a technology-domain SME should review Section F items for the ~18 additional Justified Remember candidates expected by Agent D.

4. **Section A requires expanded domain-keyword mapping.** The −11 gap suggests additional financial-reporting-distinctive keywords need to be added to the domain signatures.

5. **P1E-E-001 through P1E-E-075:** Section E's COSO framework items with same-domain distractors are correctly classified as Understand. The 7 Remember candidates in Section E (primarily count-recall and cross-domain items) are the maximum detectable by automated means.

6. **P1E-F-031** (AI in accounting, with extreme distractors) is the clearest Section F Remember candidate. Several other Section F items with one or two hyperbolic distractors may also qualify.

---

## 7. Read-Only Attestation

**Zero files modified.** `pack_e_corrected.js` was read via Function constructor for item extraction only. No write operations were performed on any pack file. All classification was performed in-memory using the extracted item data.

---

*Generated by Agent B, Session 720, 2026-07-26*  
*Input: SESSION719_PACK_E_FINDINGS.json, ALIGNMENT_MAINTENANCE_GUIDE.md §2.1*  
*Reference: pack_e_corrected.js (1,391,319 bytes, 500 items)*
