# Session 88P — Campaign Simulations

**Date:** 2026-07-30
**Governance Lane:** Light / Read-Only Analysis
**Simulations Run:** 5 campaigns targeting the highest-ROI single-object sections

---

## 1. Campaign 1 — Pack A Section F (Technology & Analytics)

**Status:** QUEUED for S87. Queue file: `SESSION086P_SESSION087_QUEUE.json`. 14/15 targets confirmed Understand; 1 replacement (P1-F-020→F-048).

### Current State

| Metric | Value |
|--------|-------|
| Certified items | 75 |
| Evaluate | 0 |
| Analyze | 2 |
| Apply | 13 |
| Understand | 59 |
| Remember | 1 |
| HO% | **2.7%** |
| Architecture | Single-object |
| DL-008 | 0 |
| DL-026 | 0 |
| Rule 9 | 0 |

### Wave 1 Projection (S87 — 15 items)

| Target | Count | From |
|--------|-------|------|
| Understand → Evaluate | 7 | F-001, F-005, F-010, F-030, F-040, F-048, F-050, F-060 |
| Understand → Analyze | 6 | F-035, F-045, F-055, F-065, F-070 |
| Apply → Analyze | 1 | F-015, F-025 |
| Already Analyze (excluded) | 1 | F-020 |

### Post-Wave 1

| Metric | Before | After |
|--------|--------|-------|
| Evaluate | 0 | 8 |
| Analyze | 2 | 9 |
| Apply | 13 | 12 |
| Understand | 59 | 45 |
| HO% | **2.7%** | **22.7%** |

### Remaining Low-Order: 58 items (45U + 12Ap + 1R)

Supports 4 more waves: W2 (22.7%→42.7%), W3 (→62.7%), W4 (→82.7%), W5 (→90.7%).

**Authoring difficulty:** LOW. Domain F items are definition-match textbook recall → easily converted to business judgment scenarios with named stakeholders and trade-off data. Expected 20-25 min per item.

**Risk:** Minimal. Single-object, 0 known defects, 75/75 certified. Proven pattern from S79 (Pack E Section F: 0.0% → 21.1%).

---

## 2. Campaign 2 — Pack B Section F (Technology & Analytics)

**Status:** NOT QUEUED. Recommended for S88.

### Current State

| Metric | Value |
|--------|-------|
| Certified items | 75 |
| Evaluate | 2 |
| Analyze | 0 |
| Apply | 22 |
| Understand | 49 |
| Remember | 0 |
| HO% | **2.7%** |
| Architecture | Single-object |
| DL-008 | Spot-check clean |
| DL-026 | Spot-check clean |

### Wave 1 Projection (S88 — 15 items)

| Target | Count | Candidates |
|--------|-------|-----------|
| Understand → Evaluate | 8 | 49 Understand candidates — pick highest scenario potential |
| Understand → Analyze | 7 | Remaining Understand items |

### Post-Wave 1

| Metric | Before | After |
|--------|--------|-------|
| Evaluate | 2 | 10 |
| Analyze | 0 | 7 |
| HO% | **2.7%** | **22.7%** |

### Remaining Low-Order: 56 items (34U + 22Ap)

Supports 4 more waves. **Advantage vs Pack A/F:** Pack B has zero prior modernization waves — no concurrent-session collision risk. Cleaner baseline state (no queue replacement needed).

**Authoring difficulty:** LOW. Identical Domain F profile to Pack A/F.

**Risk:** Lower than Pack A/F — no active sessions on Pack B. Spot-checks show clean structural state; recommend full per-item T0 census before executing.

---

## 3. Campaign 3 — Pack E Section A (External Financial Reporting)

**Status:** NOT QUEUED. Recommended for S89.

### Current State

| Metric | Value |
|--------|-------|
| Certified items | 74 |
| Evaluate | 2 |
| Analyze | 0 |
| Apply | 10 |
| Understand | 61 |
| Remember | 1 |
| HO% | **2.7%** |
| Architecture | Single-object |
| DL-008 | Spot-check clean |
| DL-026 | Spot-check clean |

### Wave 1 Projection (S89 — 15 items)

Domain A is the hardest domain for cognitive upgrade — items are predominantly calculation-based (Apply level) and must be converted to scenario-driven Evaluate/Analyze. An "Evaluate" question about revenue recognition might read: "CFO reviewing 3 contract structures (bill-and-hold, consignment, subscription) against ASC 606 revenue recognition criteria with revenue and timing data."

**Mix:** 8 Evaluate (scenario-driven judgment) + 7 Analyze (data interpretation)

### Post-Wave 1

| Metric | Before | After |
|--------|--------|-------|
| HO% | **2.7%** | **22.7%** |

**Authoring difficulty:** HIGH (1.5x multiplier). Domain A items are calculation-heavy. Creating Evaluate scenarios requires designing financial statement excerpts, contract terms, or transaction data — significantly more effort than Domain F definition-to-scenario conversion. Expected 35-40 min per item.

**Risk:** Medium. Domain A scenario authoring has not been proven in prior campaigns (S77 targeted Domain B, S79 targeted Domain F, S81-S82 targeted Domain B). This would be the first Domain A greenfield campaign. Recommend a 5-item pilot before committing the full 15.

---

## 4. Campaign 4 — Pack B Section B (Planning, Budgeting, and Forecasting)

**Status:** NOT QUEUED. Recommended for S90.

### Current State

| Metric | Value |
|--------|-------|
| Certified items | 100 |
| Evaluate | 1 |
| Analyze | 2 |
| Apply | 63 |
| Understand | 10 |
| Remember | 22 |
| HO% | **3.0%** |
| Architecture | Single-object |
| DL-008 | Spot-check clean |
| DL-026 | Spot-check clean |

### Special Consideration — 22 Remember Items

Pack B Section B has the highest Remember-item density in any single-object section (22 of 100 items). These are items like "The first budget prepared in the master budget process is the:" where the answer is a term recall (sales budget). Each Remember item requires:
1. **Cognitive upgrade:** Remember → Understand minimum, then Understand → Analyze/Evaluate
2. **Difficulty upgrade:** Typically Easy (1) → Moderate (3) or Difficult (4)
3. **Stem rewrite:** Pure definition → business scenario with stakeholder and data

This is effectively a dual-pass upgrade — twice the authoring effort per item.

### Wave 1 Strategy

| Target | Count | Candidates |
|--------|-------|-----------|
| Understand → Evaluate | 8 | 10 Understand items — prioritize PBF scenario-rich topics (flexible budget, rolling forecast, zero-based) |
| Apply → Analyze | 7 | 63 Apply items — choose calculation-based items with data-interpretation potential |

**Skip Remember items in Wave 1.** Prioritize the 73 Understand + Apply items for faster velocity. Address Remember items in Waves 2-7.

### Post-Wave 1

| Metric | Before | After |
|--------|--------|-------|
| HO% | **3.0%** | **18.0%** |

**Lower per-wave gain (18% vs typical 22.7%)** because 22 Remember items remain untouched in Wave 1 and count against the denominator.

### Remaining Low-Order After W1: 80 items (22R + 2U + 56Ap)

**Authoring difficulty:** MODERATE (1.2x multiplier). Domain B (Budgeting & Forecasting) is rich for Evaluate scenarios: "CFO evaluating flexible budget assumptions," "Controller recommending rolling forecast adoption." Proven pattern from S77 (Pack A Section B: 8.0% → 35.0%).

**Risk:** Medium. The 22 Remember items are a drag on per-wave HO efficiency until addressed. Recommend a dedicated "Remember → Understand" pass (difficulty-only upgrade) as a separate mini-campaign before full cognitive rewrites.

---

## 5. Campaign 5 — Pack E Section B (Planning, Budgeting, and Forecasting)

**Status:** NOT QUEUED. Recommended for S91.

### Current State

| Metric | Value |
|--------|-------|
| Certified items | 100 |
| Evaluate | 2 |
| Analyze | 1 |
| Apply | 36 |
| Understand | 59 |
| Remember | 3 |
| HO% | **3.0%** |
| Architecture | Single-object |
| DL-008 | Spot-check clean |
| DL-026 | Spot-check clean |

### Wave 1 Projection (S91 — 15 items)

| Target | Count | Candidates |
|--------|-------|-----------|
| Understand → Evaluate | 8 | 59 Understand — rich pool |
| Understand → Analyze | 7 | Remaining Understand items |

Only 3 Remember items (vs 22 in Pack B/B) — much cleaner upgrade path.

### Post-Wave 1

| Metric | Before | After |
|--------|--------|-------|
| HO% | **3.0%** | **18.0%** |

### Remaining Low-Order After W1: 83 items (3R + 44U + 36Ap)

Supports 6 more waves. **Advantage vs Pack B/B:** 3 Remember vs 22 Remember — significantly better per-wave efficiency after the Understand pool is tapped.

**Authoring difficulty:** MODERATE (1.2x multiplier). Same Domain B profile but cleaner starting state than Pack B/B.

**Risk:** Low. Single-object, 0 known defects, 100/100 certified. Proven Domain B pattern from S77.

---

## 6. Cross-Campaign Comparison

| Metric | Pack A/F | Pack B/F | Pack E/A | Pack B/B | Pack E/B |
|--------|----------|----------|----------|----------|----------|
| Domain | F | F | A | B | B |
| HO% before | 2.7% | 2.7% | 2.7% | 3.0% | 3.0% |
| HO% after W1 | 22.7% | 22.7% | 22.7% | 18.0% | 18.0% |
| Total low-order | 73 | 71 | 72 | 95 | 98 |
| Remember items | 1 | 0 | 1 | **22** | 3 |
| Authoring difficulty | LOW (1.0x) | LOW (1.0x) | HIGH (1.5x) | MOD (1.2x) | MOD (1.2x) |
| Proven pattern | Not yet (S79 = E/F) | No | No | Yes (S77 = A/B) | No |
| Structural defects | 0 | Spot-clean | Spot-clean | Spot-clean | Spot-clean |
| Max waves | 5 | 5 | 6 | 7 | 7 |
| Risk score | **0** | **0** | 3 | 2 | 1 |
| **Recommended sequence** | **S87** | **S88** | S89 | S90 | S91 |

---

## 7. Aggregate Impact of Phase 1-2 (Waves 1-5)

After the 5-campaign sequence completes:

| Metric | Before (S86) | After W5 (S91) | Delta |
|--------|-------------|----------------|-------|
| Total cert HO | 458 | 533 | **+75** |
| HO% | 18.7% | **21.7%** | **+3.0 pp** |
| Analyze added | — | 35 | +35 |
| Evaluate added | — | 40 | +40 |
| Sections at >20% HO | 5 | 8 | +3 |
| Domain F sections at >20% HO | 1/3 | 3/3 | Domain F complete Wave 1 |
| Remaining to 25% | 155 | 80 | Path shortened by 48% |

---

## 8. Velocity Assumptions

| Factor | Assumption |
|--------|-----------|
| Items per wave | 15 (governance guard Rule 5 cap: 30) |
| Waves per session | 1 (content authoring is serial — cannot parallelize item rewrites) |
| Sessions per week | 4-7 (depends on availability of non-overlapping sessions) |
| Domain F velocity | 20-25 min/item = 5-6 hours per wave |
| Domain B velocity | 25-30 min/item = 6-7.5 hours per wave |
| Domain A velocity | 35-40 min/item = 9-10 hours per wave |
| Remember dual-upgrade velocity | +50% per item |

At 1 wave per session and 5 sessions per week, the Phase 1 sequence completes in 1 week. The full 35-wave journey to 40% HO completes in ~7-8 weeks.

---

*Generated: 2026-07-30 — Session 88P — Read-Only Governance Light*
