# Repository Quality Audit — Sprint 5.9A

**Date:** 2026-07-21
**Scope:** Read-only quality audit of 2500 MCQs and 75 case studies.
**Methodology:** Automated 10-dimension rubric scoring with heuristic analysis.

## Rubric Dimensions

| # | Dimension | Scale | Method |
|---|-----------|-------|--------|
| 1 | Blueprint Accuracy | 1–5 | Section validity, LOSTag presence, Topic mapping |
| 2 | Technical Accuracy | 1–5 | Duplicate answers, all/none-of-above, valid CorrectChoice |
| 3 | Question Quality | 1–5 | Stem length, absolute language, clarity heuristics |
| 4 | Distractor Quality | 1–5 | Length variance, grammatical clues, choice count |
| 5 | Explanation Quality | 1–5 | Presence, length, specificity, generic text detection |
| 6 | Realism | 1–5 | Business context, time references, professional language |
| 7 | Difficulty Calibration | 1–5 | Valid difficulty label, calculation/easy mismatch |
| 8 | Repetition | 1–5 | Stem similarity detection across question pool |
| 9 | Case Quality | 1–5 | Scenario length, exhibits, item variety, explanations |
| 10 | Overall Grade | A–D | Weighted composite of dimensions 1–8 |

## Grade Distribution

| Grade | Count | Percentage |
|-------|-------|------------|
| A | 1957 | 78% |
| B | 543 | 22% |
| C | 0 | 0% |
| D | 0 | 0% |

## Dimension Performance

| Dimension | Avg Score | Assessment |
|-----------|-----------|------------|
| Realism | 3.4 | Adequate |
| Explanation | 4.2 | Strong |
| Quality | 4.8 | Strong |
| Distractor | 4.9 | Strong |
| Difficulty | 5 | Strong |
| Technical | 5 | Strong |
| Repetition | 5 | Strong |
| Blueprint | 5 | Strong |

## Key Findings

### 1. Realism is the weakest dimension
Average score: 3.4/5.
This indicates a systematic issue across the repository. See the RewriteBacklog for specific items.

### 2. Generic Distractor Explanations
244 questions have generic "This is the correct choice" or "Plausible distractor" text instead of specific rationale. These explanations provide minimal educational value and should be rewritten with specific reasoning.

### 3. Repetition Detected
1 groups of questions share similar or identical stem text. This may indicate duplicate content that should be diversified.

### 4. Blueprint Coverage
- Section A (External Financial Reporting Decisions): 375 MCQs, 375 unique topics
- Section B (Planning, Budgeting, and Forecasting): 500 MCQs, 500 unique topics
- Section C (Performance Management): 500 MCQs, 499 unique topics
- Section D (Cost Management): 375 MCQs, 375 unique topics
- Section E (Internal Controls): 375 MCQs, 375 unique topics
- Section F (Technology and Analytics): 375 MCQs, 375 unique topics

### 5. Case Study Quality

| CaseID | Title | Items | Exhibits | Score | Issues |
|--------|-------|-------|----------|-------|--------|
| CBQ2-C1 | Flexible Budget and Sales Variances | 5 | 1 | 3 | Scenario text too short |
| CBQ2-C2 | Direct Material and Labor Variances | 5 | 1 | 3 | Scenario text too short |
| CBQ2-C3 | Responsibility Centers (ROI/RI) | 5 | 1 | 3 | Scenario text too short |
| CBQ2-D1 | Activity-Based Costing | 5 | 1 | 3 | Scenario text too short |
| CBQ2-D3 | Process Costing (Equivalent Units) | 5 | 1 | 3 | Scenario text too short |
| CBQ2-E1 | IT General Controls | 5 | 1 | 3 | Scenario text too short |
| CBQ2-E2 | Segregation of Duties | 5 | 1 | 3 | Scenario text too short |
| CBQ2-F1 | Data Analytics Maturity | 5 | 1 | 3 | Scenario text too short |
| CBQ2-F2 | Data Governance & Lifecycle | 5 | 1 | 3 | Scenario text too short |
| CBQ3-C1 | Balanced Scorecard Metrics | 5 | 1 | 3 | Scenario text too short |
| CBQ3-C2 | Transfer Pricing | 5 | 1 | 3 | Scenario text too short |
| CBQ3-C3 | Flexible Budget Variances | 5 | 1 | 3 | Scenario text too short |
| CBQ3-D3 | Cost Allocation (Step-Down) | 5 | 1 | 3 | Scenario text too short |
| CBQ3-E2 | Business Continuity and Disaster Recover | 5 | 1 | 3 | Scenario text too short |
| CBQ3-F1 | System Development Life Cycle (SDLC) | 5 | 1 | 3 | Scenario text too short |
| CBQ4-C2 | Customer Profitability Analysis | 5 | 1 | 3 | Scenario text too short |
| CBQ4-D3 | Capacity Management Concepts | 5 | 1 | 3 | Scenario text too short |
| CBQ4-E2 | Application IT Controls | 5 | 1 | 3 | Scenario text too short |
| CBQ4-E3 | Foreign Corrupt Practices Act (FCPA) | 5 | 1 | 3 | Scenario text too short |
| CBQ4-F1 | Cloud Computing Models | 5 | 1 | 3 | Scenario text too short |

### 6. Weakest Questions (Bottom 20%)

| QuestionID | Section | Grade | Score | Primary Issue |
|------------|---------|-------|-------|---------------|
| P1-A-001 | A | B | 4.3 | Answer length variance high (ratio 3x) — may give clues |
| P1-B-009 | B | B | 4.3 | Uses absolute language: "all" |
| P1-B-010 | B | B | 4.3 | Answer length variance high (ratio 3x) — may give clues |
| P1-B-013 | B | B | 4.3 | Uses absolute language: "all" |
| P1-B-016 | B | B | 4.3 | Uses absolute language: "all" |
| P1-B-051 | B | B | 4.3 | Uses absolute language: "all" |
| P1-C-024 | C | B | 4.3 | Answer length variance high (ratio 4x) — may give clues |
| P1-D-005 | D | B | 4.3 | Uses absolute language: "all" |
| P1-D-006 | D | B | 4.3 | Answer length variance high (ratio 3x) — may give clues |
| P1-D-014 | D | B | 4.3 | Uses absolute language: "all" |
| P1-E-025 | E | B | 4.3 | Uses absolute language: "all" |
| P1B-F-100 | F | B | 4.3 | Contains "all/none of the above" — rare on modern CMA |
| P1-AC-016 | A | B | 4.3 | Answer length variance high (ratio 4x) — may give clues |
| P1-AC-017 | A | B | 4.3 | Answer length variance high (ratio 4x) — may give clues |
| P1-AC-019 | A | B | 4.3 | Answer length variance high (ratio 4x) — may give clues |
| P1-AC-020 | A | B | 4.3 | Answer length variance high (ratio 4x) — may give clues |
| P1-BC-029 | B | B | 4.3 | Uses absolute language: "all" |
| P1-BC-031 | B | B | 4.3 | Uses absolute language: "all" |
| P1-BC-032 | B | B | 4.3 | Uses absolute language: "all" |
| P1-BC-033 | B | B | 4.3 | Uses absolute language: "all" |
| P1-BC-035 | B | B | 4.3 | Uses absolute language: "all" |
| P1-BC-036 | B | B | 4.3 | Uses absolute language: "all" |
| P1-BC-037 | B | B | 4.3 | Uses absolute language: "all" |
| P1-BC-039 | B | B | 4.3 | Uses absolute language: "all" |
| P1-BC-040 | B | B | 4.3 | Uses absolute language: "all" |
| P1-BC-077 | B | B | 4.3 | Uses absolute language: "all" |
| P1-BC-079 | B | B | 4.3 | Uses absolute language: "all" |
| P1-BC-080 | B | B | 4.3 | Uses absolute language: "all" |
| P1-BC-081 | B | B | 4.3 | Uses absolute language: "all" |
| P1-BC-089 | B | B | 4.3 | Uses absolute language: "all" |

### 7. Recommendations

1. **Rewrite all generic distractor explanations** — Replace placeholder text with specific rationale for each distractor.
2. **Address weak topics** — Focus rewrite effort on topics with average scores below 3.0.
3. **Diversify repeated stems** — Ensure unique scenarios for questions flagged for repetition.
4. **Add business context to abstract questions** — Improve realism by embedding questions in business scenarios.
5. **Calibrate difficulty labels** — Review items flagged for difficulty metadata inconsistency.
6. **Enhance case exhibits** — Add exhibits to cases that lack them; improve existing exhibit quality.

---

*This audit was performed automatically using 10-dimension rubric heuristics. Results should be validated by human review before undertaking rewrite work.*
