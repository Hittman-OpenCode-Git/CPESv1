# Session 92 — Planner: Pack B Section B Cognitive Upgrade Wave 1

**Date:** 2026-07-31
**Governance Lane:** Full
**Stage:** 1 of 4 (Planner)

---

## 1. Scope Lock

### Authorized Files
| File | Scope |
|------|-------|
| `pack_b_corrected.js` | 15 QID rewrites, Section B only (P1B-B-xxx) |

### Forbidden Files
- All other pack files
- Case pack files
- `CURRENT_BASELINES.md`
- `MASTER_QUESTION_REGISTRY.md`
- Generated registries
- `app.js`, `styles.css`, `index_updated.html`, `may-core.js`, `may-learner-state.js`

### Hard Rules
- Backup-before-write mandatory
- `npm run preflight` at T0 (already PASS — 0 divergences)
- Raw evidence verification for all count/state claims
- REVISION_HISTORY.md entry at closeout
- 54/54 governance guard PASS per batch
- 0 DL-008, 0 DL-026, 0 Rule-9 violations per batch
- `npm run pipeline` at Tend

---

## 2. Current Section State

From direct extraction of `pack_b_corrected.js` Section B (P1B-B-101 through P1B-B-200):

| Metric | Value |
|--------|-------|
| Total items | 100 |
| QID range | P1B-B-101 → P1B-B-200 |
| question_state | 100/100 Certified |
| Architecture | Single-object |
| DL-008 | 0 |
| DL-026 | 0 |
| Rule 9 | 0 |

### Current Cognitive Level Distribution

| Level | Count | % |
|-------|-------|---|
| Apply | 63 | 63.0% |
| Remember | 22 | 22.0% |
| Understand | 10 | 10.0% |
| Analyze | 2 | 2.0% |
| Evaluate | 1 | 1.0% |
| NULL | 2 | 2.0% |
| **HO% (Analyze + Evaluate)** | **3** | **3.0%** |

### Difficulty Distribution

| Difficulty | Count |
|------------|-------|
| Easy (1) | 19 |
| Moderate-Easy (2) | 18 |
| Moderate (3) | 56 |
| Difficult (4) | 5 |
| NULL | 2 |

### NULL Metadata Items (2)
- **P1B-B-158** — participative vs imposed budgeting (already long-form scenario)
- **P1B-B-165** — responsibility accounting - controllable costs (already long-form scenario)

Both have scenario-based stems with named companies. These are NOT rewrite candidates — they need cognitive level assignment only. Wave 1 does NOT touch these.

---

## 3. Wave 1 Candidates — 15 QIDs

### Selection Methodology
- Priority 1: Understand items (10 available) → Evaluate or Analyze
- Priority 2: Remember items (22 available) → Analyze (definition-match → scenario)
- Priority 3: Apply items (63 available) → Evaluate (calculation → judgment)

All 15 candidates confirmed structurally clean: 0 DL-008, 0 DL-026, 0 Rule-9, question_state: "Certified". All are single-object architecture.

---

### Evaluate Targets (8 items)

| # | QID | Current CL | Current Diff | CC | Topic | Upgrade Angle |
|---|-----|-----------|-------------|-----|-------|----------------|
| 1 | **P1B-B-125** | Understand | Moderate-Easy (2) | B | Responsibility accounting — profit center | Controller evaluating performance evaluation design across 3 divisions with revenue, cost, and investment data |
| 2 | **P1B-B-130** | Understand | Easy (1) | A | Activity-based budgeting vs traditional | CFO evaluating whether to adopt ABB for next budget cycle; 3 divisions with different cost-driver profiles |
| 3 | **P1B-B-152** | Understand | Moderate-Easy (2) | C | Sales forecasting — Delphi method | FP&A director evaluating forecasting methodology for new product launch with cost/accuracy trade-offs |
| 4 | **P1B-B-156** | Understand | Moderate (3) | C | Ideal vs practical standards | Production VP evaluating standard-setting philosophy for new automated facility with efficiency data |
| 5 | **P1B-B-169** | Understand | Easy (1) | B | ABC vs ABB relationship | Controller evaluating ABB implementation for a multi-product manufacturer with activity-driver analysis |
| 6 | **P1B-B-127** | Apply | Moderate-Easy (2) | C | Budget slack | CFO discovering systemic budget slack across 3 divisions — evaluating corrective actions with ethical, motivational, and control trade-offs |
| 7 | **P1B-B-128** | Remember | Moderate (3) | B | Participative budgeting advantages | CEO evaluating participative vs. top-down approach for a post-merger integration with cultural conflict risk |
| 8 | **P1B-B-129** | Remember | Moderate (3) | C | Top-down budgeting advantages | Audit committee evaluating budgeting approach change after major budget overrun; trade-offs between alignment and buy-in |

### Analyze Targets (7 items)

| # | QID | Current CL | Current Diff | CC | Topic | Upgrade Angle |
|---|-----|-----------|-------------|-----|-------|----------------|
| 9 | **P1B-B-140** | Understand | Moderate (3) | C | Moving average forecasting | Operations manager analyzing 12-month sales data to identify trend, seasonality, and irregular components; compare 3-MA vs 5-MA |
| 10 | **P1B-B-155** | Understand | Moderate-Easy (2) | C | Correlation analysis | Analyst interpreting correlation matrix across 5 cost drivers and 3 product lines to identify strongest relationships for forecasting |
| 11 | **P1B-B-193** | Understand | Moderate-Easy (2) | B | Regression t-statistic | FP&A analyst interpreting full regression output (R², t-stats, p-values, SE) to evaluate model reliability for sales forecast |
| 12 | **P1B-B-142** | Understand | Moderate-Easy (2) | D | Cost behavior classification | Cost accountant analyzing mixed cost decomposition across 3 departments to identify fixed/variable split for flexible budgeting |
| 13 | **P1B-B-139** | Remember | Easy (1) | A | Probability-based budgeting | Budget analyst analyzing 3 product revenue scenarios with probability distributions to determine expected value and risk |
| 14 | **P1B-B-175** | Remember | Easy (1) | D | Scenario analysis | FP&A manager analyzing best/worst/most-likely scenarios for capital investment; interpret divergence and recommend |
| 15 | **P1B-B-137** | Understand | Moderate (3) | D | Budgeted income statement — sequencing | Controller analyzing budget preparation sequence after discovering a missing step; trace through the master budget logic |

---

## 4. Candidate Structural Verification (T0)

| Check | Result |
|-------|--------|
| All 15 QIDs present in pack_b_corrected.js | **CONFIRMED** |
| question_state: "Certified" | **15/15 CONFIRMED** |
| DL-008 (non-empty EW[CC]) | **0/15 CLEAN** |
| DL-026 (empty non-CC EW) | **0/15 CLEAN** |
| Rule 9 (choice lead-in polarity) | **0/15 CLEAN** |
| Architecture | **Single-object** |
| No overlap with S87–S91 campaigns | **CONFIRMED** (all Pack B Section B, not touched before) |

---

## 5. Expected Impact

| Metric | Before | After | Delta |
|--------|--------|-------|-------|
| Evaluate | 1 | 9 | +8 |
| Analyze | 2 | 9 | +7 |
| Apply | 63 | 62 | −1 |
| Understand | 10 | 0 | −10 |
| Remember | 22 | 18 | −4 |
| NULL | 2 | 2 | 0 |
| **HO%** | **3.0%** | **18.0%** | **+15.0%** |
| **Higher-Order items** | **3** | **18** | **+15** |

---

## 6. Rewrite Standards (from campaign brief)

### Required
- Named company and stakeholder with title
- Strategic or operational tradeoff with multiple viable alternatives
- Analyze or Evaluate cognition (not definition-match, not recall, not one-step calculation)
- Choice-specific distractor explanations (minimum 50 chars, addresses specific misconception)
- ExplanationCorrect references governing accounting principle/concept by name
- Choices reflect realistic business decision alternatives
- Scenario uses business/executive language, not textbook phrasing

### Avoid
- Definition-match questions
- Pure recall ("Which of the following is...")
- Formula-only substitutions without context
- One-step calculations
- No company name / generic placeholder
- "Which of the following is correct?" framing

### Difficulty Calibration
- Evaluate items: Difficult (4) or Moderate (3)
- Analyze items: Moderate (3) or Difficult (4)
- Upgrade DifficultyScore proportionally with cognitive level increase

---

## 7. Execution Plan

| Batch | QIDs | Type | Count |
|-------|------|------|-------|
| 1 | 125, 130, 152, 156, 169 | Understand→Evaluate (5) | 5 |
| 2 | 127, 128, 129 | Apply/Remember→Evaluate (3) | 3 |
| 3 | 140, 155, 193, 142 | Understand→Analyze (4) | 4 |
| 4 | 139, 175, 137 | Remember/Understand→Analyze (3) | 3 |

All batches ≤30 items per governance-guard Rule 5.

---

## 8. Stop Conditions

1. If any batch introduces DL-008, DL-026, or Rule 9 violation → STOP and remediate before next batch
2. If QID count changes from 500 → STOP and investigate
3. If Certified count changes from 500 → STOP and investigate
4. If governance guard test count changes or any test FAIL → STOP
5. If preflight divergences > 0 → STOP and reconcile

---

## 9. Success Criteria

- ✅ 15 rewrites applied to 15 unique QIDs in Pack B Section B
- ✅ 8 Evaluate conversions confirmed
- ✅ 7 Analyze conversions confirmed
- ✅ QID count = 500 (unchanged)
- ✅ Certified count = 500 (unchanged)
- ✅ 0 DL-008, 0 DL-026, 0 Rule-9 violations
- ✅ 54/54 governance guard PASS
- ✅ Pipeline PASS
- ✅ 0 divergences on preflight
- ✅ REVISION_HISTORY.md entry written

---

## 10. Lane Confirmation

**Full Governance Lane** — session edits `pack_b_corrected.js`, modifies question content/answer keys/cognitive level fields. All Full Lane requirements apply: T0 preflight (PASS), backup-before-write, raw evidence verification, REVISION_HISTORY.md entry, pipeline at Tend.

---

*Generated: 2026-07-31 — Session 92 — Planner Stage*
