# Scenario Modernization Backlog — Sprint 5.9C

**Source:** QuestionQualityScores.csv (2500 scored questions)
**Filter:** Realism score ≤ 3 (bottom tier)
**Total flagged:** ~900 questions

---

## Priority 1 — Absolute Language in Choices (~150 questions)

Replace "all" / "never" / "every" with context-appropriate qualifiers. Single bulk pass, 4–6 hours.

| QuestionID | Section | Current Realism | Absolute Term | Proposed Fix | Effort | Impact |
|------------|---------|----------------|---------------|--------------|--------|--------|
| P1-A-005 | A | 3 | "all" in choices B/C | Replace "Defer all revenue" → "Defer the full contract price"; "Recognize all revenue" → "Recognize revenue when control transfers" | 5 min | High |
| P1-A-009 | A | 3 | "always" in choice A | Replace "LIFO liquidation always decreases income" → "LIFO liquidation typically decreases income when costs are rising" | 5 min | High |
| P1-A-022 | A | 3 | "all" | Replace context-dependent "all" with specific scope language | 5 min | High |
| P1-A-033 | A | 3 | "all" | Replace per context | 5 min | High |
| P1-A-035 | A | 3 | "all" | Replace "all outstanding shares" → "weighted-average outstanding shares" | 5 min | High |
| P1-A-043 | A | 3 | "all" | Replace per context | 5 min | High |
| P1-A-045 | A | 3 | "all" | Replace "all outstanding shares" → "weighted-average outstanding shares" | 5 min | High |
| P1-A-053 | A | 3 | "all" | Replace per context | 5 min | High |
| P1-A-055 | A | 3 | "all" | Replace per context | 5 min | High |
| P1-A-063 | A | 3 | "all" | Replace per context | 5 min | High |
| P1-A-065 | A | 3 | "all" | Replace per context | 5 min | High |
| P1-A-073 | A | 3 | "all" | Replace per context | 5 min | High |
| P1-A-075 | A | 3 | "all" | Replace per context | 5 min | High |
| P1-B-009 | B | 3 | "all" | Replace per context | 5 min | High |
| P1-B-013 | B | 3 | "all" | Replace per context | 5 min | High |
| P1-B-016 | B | 3 | "all" | Replace per context | 5 min | High |
| P1-B-040 | B | 3 | "all" | Replace per context | 5 min | High |
| P1-B-047 | B | 3 | "every" | Replace "every" → "each" or qualify with specific frequency | 5 min | High |
| P1-B-051 | B | 3 | "all" | Replace per context | 5 min | High |
| P1-B-063 | B | 3 | "all" | Replace per context | 5 min | High |
| P1-B-071 | B | 3 | "every" | Replace per context | 5 min | High |
| P1-B-073 | B | 3 | "all" | Replace per context | 5 min | High |
| P1-B-075 | B | 3 | "all" | Replace per context | 5 min | High |
| P1-B-100 | B | 3 | "all" | Replace per context | 5 min | High |
| P1-E-007 | E | 3 | "never" | Replace "never" → "generally not" or "rarely" | 5 min | High |
| P1-AC-016–020 | A | 3 | "all" (clone pack) | Bulk replace per context pattern | 15 min | High |
| P1-BC-029–093 | B | 3 | "all" (clone pack) | Bulk replace per context pattern | 30 min | High |
| P1-CC-008–013 | C | 3 | answer length | Separate fix (not language) | — | — |
| P1-DC-016–049 | D | 3 | "all" (clone pack) | Bulk replace per context pattern | 30 min | High |
| P1-EC-051–055 | E | 3 | "all" (clone pack) | Bulk replace per context pattern | 15 min | High |
| P1-AD-001–005 | A | 3 | "all" (clone pack) | Bulk replace per context pattern | 15 min | High |
| P1-BD-036–069 | B | 3 | "all"+"every" (clone pack) | Bulk replace per context pattern | 30 min | High |
| P1-CD-064–069 | C | 3 | "all" (clone pack) | Bulk replace per context pattern | 15 min | High |
| P1-ED-036–065 | E | 3 | "all" (clone pack) | Bulk replace per context pattern | 30 min | High |
| P1-FD-001–057 | F | 3 | "all" (clone pack) | Bulk replace per context pattern | 30 min | High |

---

## Priority 2 — "A Company" with Zero Business Context (~100 questions)

Replace "A company" with a named entity + single-sentence industry context. 10–15 hours.

| QuestionID | Section | Topic | Current Stem Pattern | Proposed Enhancement | Effort | Impact |
|------------|---------|-------|---------------------|---------------------|--------|--------|
| P1-A-003 | A | Cash flow operations | "A company reports net income of $172,000..." | "NorthStar Manufacturing reports net income of $172,000 for fiscal 2025..." | 10 min | Medium |
| P1-A-010 | A | Depreciation | "A company purchases equipment for $96,000 on July 1..." | "Apex Electronics purchases a packaging machine for $96,000 on July 1, 2025..." | 10 min | Medium |
| P1-A-026 | A | Accounting equation | "A company's total assets are $500,000 and total liabilities are $300,000..." | "Coastal Wholesale's year-end balance sheet shows total assets of $500,000 and total liabilities of $300,000..." | 10 min | Medium |
| P1-A-027–075 | A | Rotation series | "A company reports..." (50 variants of 8 topic clusters) | Assign named entity per cluster (NorthStar, Apex, Coastal, Harbor, Titan, Riverview, etc.) | 5–8 hrs | Medium |
| P1-B-007 | B | Flexible budget | "A flexible budget is best described as..." | "Midwest Manufacturing uses flexible budgeting. Which statement best describes its purpose?" | 10 min | Medium |
| P1-B-008 | B | Sales budget | "The first step in the budgeting process is..." | "Summit Retail is preparing its annual budget. Which budget should be prepared first?" | 10 min | Medium |
| P1-B-017 | B | Production budget | "A company expects to sell 10,000 units..." | "Pioneer Furnishings expects to sell 10,000 units in Q1 2025..." | 10 min | Medium |
| P1-B-018 | B | DM purchases budget | "A company has a production budget of..." | "Pioneer Furnishings has a production budget of..." | 10 min | Medium |
| P1-B-022 | B | Regression forecast | "A regression analysis of..." | "Valley Distributors uses regression analysis to forecast..." | 10 min | Medium |
| P1-B-023 | B | Learning curve | "A manufacturing company has..." | "AeroTech Components observes a 90% learning curve..." | 10 min | Medium |

---

## Priority 3 — Token Company Name, No Scenario (~600 questions)

Expand one-line stems to 2-3 sentence scenarios with decision-maker role, business stakes, and context. Highest ROI for realism improvement. 80–120 hours.

### Representative Examples (Section A — External Financial Reporting)

| QuestionID | Current Stem | Proposed Enhancement | Effort | Impact |
|------------|-------------|---------------------|--------|--------|
| P1-A-001 | "Quartz is preparing a classified balance sheet for a supplier financing arrangement due in nine months. Which response is most appropriate?" | "Quartz Manufacturing is preparing its year-end classified balance sheet. The CFO must determine the classification of a supplier financing arrangement due in nine months before presenting to the audit committee. Management wants to ensure the presentation does not misrepresent liquidity ratios. How should this obligation be classified?" | 15 min | High |
| P1-A-002 | "Riverview will sell a component that represents a strategic shift and has met held-for-sale criteria. Which response is most appropriate?" | "Riverview Industries is exiting its consumer electronics division, which qualifies as a strategic shift under GAAP. The component meets held-for-sale criteria as of December 31. The CEO wants the income statement to clearly separate this activity from continuing operations for investor communication. How should the results be reported?" | 15 min | High |
| P1-A-004 | "Titan repurchased its own common shares during the year. Which response is most appropriate?" | "Titan Corporation repurchased 50,000 of its own common shares during the current fiscal year at an average price of $28 per share. The CFO is preparing the statement of changes in equity and needs to determine the correct presentation. How should this transaction affect shareholders' equity?" | 15 min | High |
| P1-A-007 | "Willow estimates uncollectible receivables using aging analysis. Which response is most appropriate?" | "Willow Home Goods sells to retailers on credit terms of net 30. Based on its December 31 aging analysis, the company estimates that 2% of its $2.5M receivables balance will be uncollectible. The prior year's allowance was $40,000. What adjusting entry is required?" | 15 min | High |
| P1-A-011 | "A company has an asset with a carrying value of $100,000 and estimated undiscounted future cash flows of $90,000. Which response is most appropriate?" | "Summit Logistics has a delivery fleet with a carrying value of $100,000. Due to a decline in regional demand, the estimated undiscounted future cash flows from the fleet have fallen to $90,000. The CFO must evaluate whether an impairment exists under GAAP before finalizing the year-end statements. What conclusion should be reached?" | 15 min | High |
| P1-A-014 | "A company enters into an operating lease for equipment. Which response is most appropriate?" | "Velocity Transport leases a fleet of delivery vehicles under a 3-year operating lease with monthly payments of $12,000. The lease commenced January 1. The controller needs to determine the initial journal entry under ASC 842. What is the correct treatment?" | 15 min | High |
| P1-A-019 | "A company holds a debt security classified as available-for-sale. Which response is most appropriate?" | "Pinnacle Investments holds a portfolio of corporate bonds classified as available-for-sale. During the quarter, interest rates rose sharply, causing a $75,000 decline in fair value. The CFO will use this information in the quarterly report. How should the unrealized loss be reported?" | 15 min | High |

### Representative Examples (Section B — Planning & Budgeting)

| QuestionID | Current Stem | Proposed Enhancement | Effort | Impact |
|------------|-------------|---------------------|--------|--------|
| P1-B-001 | "Mission statements, strategic planning, and tactical planning are best described as..." | "Grandview Enterprises is conducting its annual strategic planning cycle. The executive team has prepared a mission statement, a 5-year strategic plan, and a detailed annual operating budget. The CFO needs to explain the relationship between these planning levels to the board. Which statement best describes their linkage?" | 15 min | High |
| P1-B-004 | "A rolling budget is best described as..." | "Apex Manufacturing uses a continuous budgeting approach. Instead of preparing an annual budget once, management updates the budget quarterly by adding a new quarter as each quarter ends. What is this method called?" | 15 min | High |
| P1-B-007 | "A flexible budget is best described as..." | "Midwest Manufacturing's actual production volume was 12,000 units, but the static budget assumed 10,000 units. The plant manager needs a budget that adjusts for this volume difference to evaluate cost control. What type of budget should be used?" | 15 min | High |

---

## Priority 4 — Cloned Questions (~800 questions across Packs C, D, and clone packs)

These require structural rewrites: changing fact patterns, not just names. Do not attempt until Patterns 1–3 are complete.

**Clone groups identified:**
- Pack C (P1-AC-001 through P1-AC-100): ~25 unique stems × 4 company variants = 100 questions
- Pack D (P1-AD-001 through P1-AD-100): ~25 unique stems × 4 company variants = 100 questions
- Variant packs (BC, CC, DC, EC, FC, BD, CD, DD, ED, FD): ~150 unique stems × 4 variants = ~600 questions
- Each clone group has identical stem text, choices, and correct answer

**Recommendation:** Defer until Patterns 1–3 are complete. If realism exceeds 4.0 after Patterns 1–3, clone rewriting may not be necessary.

---

## Total Estimated Effort (All Priorities)

| Priority | Questions | Person-Hours | Realism Gain |
|----------|-----------|--------------|--------------|
| P1 (Absolute language) | ~150 | 4–6 | +0.3 |
| P2 (No context) | ~100 | 10–15 | +0.5 |
| P3 (Token names) | ~600 | 80–120 | +0.8 |
| P4 (Clones) | ~800 | 200+ | +1.0 |
| **Total** | **~1650** | **~294–341** | **3.4 → 4.0+ (P1–P3)** |
