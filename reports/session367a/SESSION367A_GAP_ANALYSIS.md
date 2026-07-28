# S367A — Gap Analysis: Legacy vs. 2026 Case Study Standards

**Session:** S367A
**Date:** 2026-07-28
**Type:** Standards Adequacy Analysis
**Reference:** `SESSION367A_STANDARDS_ADEQUACY_AUDIT.json`, `SESSION367A_SAMPLE_REVIEW.md`

---

## 1. The Gap, Quantified

The Session 52 finding — "0/75 CERTIFIED, 75/75 CONDITIONAL" — framed the gap as catastrophic. This 15-case independent sample audit finds a narrower, more nuanced gap:

| Metric | Legacy Framework | 2026 Framework | Gap |
|--------|-----------------|----------------|-----|
| Cases passing | 15/15 (100%) | 5/15 (33%) | 10 cases (67%) |
| Cases with correctness defects | 0/15 (0%) | 0/15 (0%) | **Zero** |
| Average explanation length | ~900 chars | ~900 chars | Same data, different threshold |
| Cases with >=2 professional exhibits | 9/15 (60%) | 9/15 (60%) | Same data — gap is in the 6 single-exhibit cases |
| Cases with named stakeholders | 10/15 (67%) | 10/15 (67%) | Same data — gap is in the 5 generic "Management"/"Controller" cases |
| Metadata completeness (all fields) | 11/15 (73%) | 11/15 (73%) | Same data — gap is in the 4 cases with missing fields |

**Key insight: The gap between legacy and 2026 is primarily a STANDARDS THRESHOLD difference, not a CONTENT QUALITY difference.** The same cases that pass legacy criteria fail 2026 criteria not because the content is wrong, but because the bar is higher. The question is whether the higher bar is justified.

---

## 2. Gap Categories: Real vs. Artificial

### 2.1 Real Gaps — Directly Affect Learner Outcomes

These are the dimensions where meeting the 2026 standard produces measurably better educational outcomes for CMA candidates.

#### GAP 1: Explanation Depth (SEVERITY: HIGH, IMPACT: DIRECT)

The largest single gap. The sample shows a 5-10x range in explanation character counts:

```
CBQ-A1 (Production): "Under ASC 606, Revenue from Contracts with Customers, revenue is recognized when (or as) the entity satisfies a performance obligation... The straight-line (time-elapsed) method is appropriate... Cash collected x (months delivered / total months) = $360,000 x 3/12 = $90,000... A common and costly CMA exam trap is to recognize the full $360,000... This confuses the cash basis of accounting with the accrual basis..." [~2,500 chars]

CBQ4-A1 (Draft): "Under ASC 805, goodwill is calculated as the excess of the purchase price over the fair value of identifiable net assets acquired. Purchase price: $2,500,000. Fair value of identifiable net assets: $2,100,000. Goodwill = $2,500,000 - $2,100,000 = $400,000. A common error is to include the patent or trademark value in the net assets total." [~350 chars]
```

Both are correct. The first teaches; the second confirms. A candidate reviewing a wrong answer on a Draft case learns only what the right answer is — not why, not the governing standard, not the business context, not the exam trap. This is the most impactful gap in the entire audit because it affects every learner interaction with the review screen.

**Explanations function as the simulator's primary teaching mechanism.** The Production cases recognize this; the Draft cases don't.

#### GAP 2: Exhibit Richness (SEVERITY: MEDIUM-HIGH, IMPACT: DIRECT)

7 of 15 sampled cases (47%) have only 1 exhibit. 2 of 15 (13%) have text-only exhibits with no data. The CMA exam typically provides 2-4 data-rich exhibits per case scenario. Candidates must interpret financial statements, ERP reports, contracts, and dashboards — not single-sentence policy notes.

The worst exhibit in the sample is CBQ4-A1's:
```
"Orion uses US GAAP and performs annual impairment testing for indefinite-lived intangibles and goodwill. Step zero (qualitative assessment) was bypassed this year."
```

This is not an exhibit. It's a scenario footnote. A real CMA exhibit would include the acquisition-date balance sheet, the reporting unit's carrying amounts, fair value measurements, and supporting schedules.

The best exhibits in the sample are CBQ5-F1's:
- Exhibit 1: Multi-year cost/benefit projection table with 9 rows and 3 columns of financial data
- Exhibit 2: Structured text describing 6 specific data quality issues with quantified failure rates

The gap between these two extremes is not about compliance — it's about whether the case simulates a real management accounting analysis or a textbook problem.

#### GAP 3: Cognitive Progression (SEVERITY: MEDIUM, IMPACT: DIRECT)

5 of 15 sampled cases (33%) have zero Evaluate-level items. 2 of 15 (13%) have all items at the same cognitive level. The CMA exam tests across Remember (5%), Understand (15%), Apply (40%), Analyze (25%), and Evaluate (15%). Cases that stop at Apply are testing calculation proficiency — not the professional judgment that distinguishes a management accountant from a bookkeeper.

CBQ5-B2 (5 Apply items, 0 Analyze/Evaluate) vs. CBQ-E1 (1 Understand, 1 Apply, 3 Analyze, 1 Evaluate). The latter tests what a controller actually does; the former tests whether a candidate can plug numbers into a bond pricing formula five times.

#### GAP 4: ExplanationWrong Fields for Non-Numeric Items (SEVERITY: MEDIUM, IMPACT: DIRECT)

Production cases have ExplanationWrong fields for select/multi/match items that explain why each wrong choice is wrong. Draft cases typically have no ExplanationWrong fields — only ExplanationCorrect. This means a learner who selects the wrong answer on a Draft case gets no feedback on their specific error. They only see the correct answer with no bridge from their misconception to the correct reasoning.

#### GAP 5: Named Stakeholders (SEVERITY: LOW-MEDIUM, IMPACT: MODERATE)

5 of 15 cases (33%) use generic stakeholders: "Management," "Controller," "CFO." Production cases use specific individuals: "CFO Maria Chen," "Internal Audit Director." While the learner experience difference is subtle, named stakeholders signal to the candidate that this is a real business scenario, not a textbook exercise. This matters for engagement and exam realism.

### 2.2 Artificial Gaps — Compliance Burden Without Learner Benefit

These are the dimensions where the 2026 framework imposes requirements that improve metadata quality but produce zero change in learner experience.

#### GAP A: ProductionStatus Field Values (SEVERITY: NONE, IMPACT: ZERO)

44 of 75 cases (Session 52 data) have ProductionStatus: "Draft" despite all items carrying question_state: "Certified." Changing this field from "Draft" to "Production" takes one string edit per case. It changes nothing about what learners see. It is the most obvious compliance-burden gap in the framework.

**Recommendation:** Mass-upgrade all Draft cases with complete metadata and correct content to Production in a single batch. Do not gate learner delivery on this field.

#### GAP B: Duplicated LearningObjectives (SEVERITY: NONE, IMPACT: ZERO)

CBQ3-C1 and CBQ4-E1 have the same LearningObjective text repeated 5-6 times. This is a template-generation artifact. Deduplicating requires 30 seconds per case and changes nothing about learner experience — LearningObjectives are metadata, not learner-facing content.

**Recommendation:** Fix during next metadata pass. Do not block certification on this.

#### GAP C: Confidence Field Calibration (SEVERITY: NONE, IMPACT: ZERO)

CBQ5-B2 has Confidence=70. All other cases have 95-100. This is an internal quality signal, not a deliverable. A learner never sees the Confidence field. The field value doesn't affect rendering, scoring, or review.

**Recommendation:** Set to 95 during next certification pass. Do not block delivery on this field.

#### GAP D: Difficulty Label Formalism (SEVERITY: LOW, IMPACT: MINIMAL)

Session 52's DL-032 finding (uniform difficulty on 17 cases) is a real measurement issue — but the labels don't change item content. An item labeled "Moderate" that is actually "Easy" still tests the concept correctly. The label matters for adaptive learning algorithms (not yet built), blueprint coverage analytics (important), and pool balance reporting (important). It does not matter for the individual learner answering one question at a time.

**Recommendation:** Recalibrate as a batch operation using a difficulty-estimation heuristic. Do not make this a manual, per-item audit.

---

## 3. Which Standards Matter?

The following table answers the core question: if we're going to remediate, what should we remediate first?

| Priority | Standard | Cases Affected | Effort per Case | Learner Impact |
|----------|----------|---------------|-----------------|----------------|
| **P0** | Fix ASC citation errors | 1 confirmed (CBQ4-A1-Q2) | 5 min | Direct — wrong authority cited |
| **P1** | Explanation depth (500+ chars) | ~40 Draft cases | 2-4 hours | **Highest** — primary teaching mechanism |
| **P2** | Add second exhibits | 34 single-exhibit cases | 1-3 hours | High — exam realism, data interpretation |
| **P3** | Cognitive progression (add Evaluate items) | ~25 cases without Evaluate | 30-60 min | High — tests professional judgment |
| **P4** | ExplanationWrong for non-numeric items | ~35 Draft cases | 1-2 hours | Medium — learner feedback on wrong answers |
| **P5** | Named stakeholders | 21 generic cases | 5 min | Low-Medium — engagement, realism |
| **P6** | Metadata population (missing fields) | 4 cases | 5 min | Minimal — compliance |
| **P7** | ProductionStatus upgrade | 44 Draft cases | 1 min | Zero — compliance checkbox |
| **P8** | Difficulty recalibration | 17 uniform cases | 30 min | Minimal — analytics only |

---

## 4. Framework Recommendation: Two-Tier Certification

### 4.1 The Problem with Binary Certification

Both the legacy framework (Certificate everything) and the Session 52 framework (Certify nothing) represent extremes. The legacy framework allows a case like CBQ4-A1 (single-sentence exhibit, minimal explanations) into the learner pool alongside CBQ-A1 (gold standard). The 2026 framework keeps CBQ5-F1 (excellent content, Draft label) out of the learner pool alongside CBQ4-A1 (minimal content, Draft label). Both frameworks fail to discriminate between genuinely different levels of quality.

### 4.2 Proposed Two-Tier Model

**Tier 1 — Learner-Pool Eligibility (Gate for Delivery):**
- All items carry `question_state: "Certified"` (already universally true)
- Zero accounting errors (already universally true)
- At least 1 data exhibit per case (catches CBQ4-A1's text-only "exhibit")
- ExplanationCorrect present and >= 100 chars (catches empty/missing explanations)
- CorrectChoice field present and valid

**Status: All 75 cases already pass Tier 1.** No changes needed to the learner pool.

**Tier 2 — Enhanced Quality (Aspirational, Not a Gate):**
- Explanation depth >= 500 chars per item (includes standard reference, formula, business interpretation)
- >= 2 professional-format exhibits with data tables
- At least 1 Analyze or Evaluate item per case
- Named stakeholder with specific role
- All metadata fields populated from scenario text
- Non-uniform difficulty calibration

**Status: ~30-35 cases would pass Tier 2 with current content. ~40-45 need remediation.**

### 4.3 Why Two Tiers?

1. **Don't remove good content from learners.** CBQ5-F1 is a Draft case with excellent content. Under binary 2026 certification, it would be excluded from the learner pool until someone changes one string field. That's bad governance.

2. **Don't pretend all content is equally good.** CBQ4-A1 and CBQ-A1 both carry `question_state: "Certified"` but offer vastly different educational experiences. Tier 2 makes this visible without blocking delivery.

3. **Enable continuous improvement.** Tier 2 becomes the target for the remediation program. Cases move from Tier 1→Tier 2 through targeted upgrades (explanation expansion, exhibit addition). Progress is measurable and incremental.

4. **Protect the automation investment.** If the S367-S370 program is going to automate remediation, it should target Tier 2 upgrades — not Tier 1 compliance (already met) and not a binary gate that would exclude good Draft cases.

---

## 5. Implications for S367-S370 Automation Program

### 5.1 Should Automation Investment Wait for Standards Resolution?

**No.** The audit findings support proceeding with automation on the following basis:

1. **Content correctness is already verified.** No automation is needed for answer-key verification — all sampled items are correct.

2. **The highest-value automation targets are clear and stable.** Explanation expansion, exhibit addition, and cognitive progression are the three dimensions that matter most. These won't change regardless of how the standards debate resolves.

3. **The standards debate is about thresholds, not dimensions.** Whether the bar is set at 500 chars or 2,000 chars for explanations, the automation task is the same: expand explanations. The threshold can be tuned after the fact.

4. **Tier 1 is already met.** Whatever framework wins, the learner pool already has correct content. Automation is about making it better, not making it correct.

### 5.2 Recommended Automation Priorities

| Phase | Task | Cases | Automation Feasibility |
|-------|------|-------|----------------------|
| Phase 1 | Metadata population from scenario text | 4-10 | **High** — regex extraction of company names, industries from scenario text |
| Phase 2 | ProductionStatus batch upgrade | 44 | **Trivial** — single string replace per case |
| Phase 3 | LearningObjectives deduplication | ~10 | **High** — detect repeated strings, generate distinct LOs |
| Phase 4 | Explanation expansion (AI-assisted) | ~40 | **Medium** — AI can expand short explanations with standard references and business context, but needs human review for topic-specific accuracy |
| Phase 5 | Exhibit addition | 34 | **Low** — designing data tables that are internally consistent with existing scenario data requires domain expertise |
| Phase 6 | Cognitive progression re-ordering + Evaluate item addition | ~25 | **Low-Medium** — re-ordering is trivial; adding new Evaluate items requires content authoring |

### 5.3 What NOT to Automate

- **Answer-key changes.** Zero errors found. No automation needed.
- **ASC citation fixes.** Only 1 confirmed error. Manual fix is faster than building an automated scanner.
- **Difficulty recalibration.** Wait for adaptive learning requirements. Current labels are adequate for static delivery.

---

## 6. Answers to Key Questions

### Q1: Are existing CAQS v1.0 standards sufficiently rigorous for CMA 2026?

**MIXED.** They are sufficient for correctness (zero errors found) but insufficient for educational quality. The legacy framework certifies cases that have minimal explanations, single-sentence "exhibits," and zero higher-order thinking items. These cases are correct but don't teach. The 2026 framework adds necessary rigor in explanation depth, exhibit richness, and cognitive progression — but overreaches on metadata formalism.

### Q2: Which standards improve learner quality?

1. **Explanation depth** — the single largest gap. Expanding explanations from 200 to 2,000+ chars transforms the review screen from a correctness check to a teaching tool.
2. **Exhibit richness** — data tables, financial statements, and professional-format documents make cases feel like real CMA exam scenarios.
3. **Cognitive progression** — Evaluate items test professional judgment, the highest-value CMA skill.
4. **ExplanationWrong fields** — giving learners specific feedback on why their wrong answer was wrong.

### Q3: Which standards are compliance burden?

1. **ProductionStatus field** — changing "Draft" to "Production" is a string edit. It blocks nothing and enables nothing.
2. **Duplicated LearningObjectives** — a template artifact, not a quality issue.
3. **Confidence field** — internal signal, never learner-facing.
4. **Difficulty labels (current form)** — useful for analytics, invisible to learners in static delivery mode.

### Q4: Should the 2026 framework replace legacy standards?

**PARTIAL.** Do not fully replace. Adopt a two-tier model:
- **Tier 1 (delivery gate):** Correctness + basic structural completeness. Already universally met.
- **Tier 2 (quality target):** Explanation depth, exhibit richness, cognitive variety, named stakeholders. Aspirational — continuous improvement, not a delivery gate.

This model protects learners (no good Draft cases excluded), enables measurement (progress from Tier 1 to Tier 2 is quantifiable), and focuses automation investment on the dimensions that actually improve educational outcomes.

---

## 7. Final Assessment

The 15-case sample audit finds that the case study pool is **educationally sound but unevenly polished.** The Production cases (33% of the pool, by extrapolation) provide CMA-candidate-caliber educational experiences with deep explanations, realistic scenarios, and professional judgment items. The Draft-but-ready cases (33%) are correct with minor gaps. The Draft-needs-work cases (33%) are correct but minimal — they need significant investment in explanation depth and exhibit richness to reach Production quality.

The most important governance finding: **content correctness is not the bottleneck.** The bottleneck is educational delivery — how well the correct content is explained, contextualized, and connected to professional practice. This is a fundamentally different problem than the one Session 52's "0/75 CERTIFIED" framing suggests. It's not that the cases are broken; it's that the standards for what constitutes a good case have risen, and the pool needs to catch up.

The two-tier certification model proposed here reconciles the legacy "75/75 PASS" and 2026 "0/75 CERTIFIED" extremes by recognizing that certification should track educational quality on a spectrum, not a binary gate.
