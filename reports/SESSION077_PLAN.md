# Session 77 — Planner Stage: Pack A Section B Cognitive Upgrade Campaign, Wave 1

**Date:** 2026-07-30
**Session:** S077
**Predecessor:** S076P (Workstream A — Planning & Candidate Selection)
**Source Queue:** `reports/SESSION076P_SESSION077_QUEUE.json`

---

## 1. Governance Lane Confirmation

**Lane:** Full Governance Lane

**Trigger:** This session modifies `pack_a_corrected.js` — a pack file containing `question_state`, `CorrectChoice`, `ExplanationWrong` fields, and certification state. All AGENTS.md v2.0 Full Governance Lane requirements apply.

---

## 2. Authorized Write Scope

| File | Write Type | Section | QIDs |
|------|-----------|---------|------|
| `pack_a_corrected.js` | Content rewrite (stem, choices, explanations, metadata) | Section B | 15 |

**Explicitly excluded from write scope:**
- Pack B, C, D, E files
- Case pack files (`case_pack_*_corrected.js`)
- Application files (`app.js`, `index_updated.html`, `styles.css`)
- May coaching layer (`may-core.js`, `may-learner-state.js`)
- Generated registries (`MASTER_QUESTION_REGISTRY.md`)
- Baselines (`CURRENT_BASELINES.md`)
- Any `scripts/` or `.opencode/` files

---

## 3. QID Verification

All 15 queued QIDs confirmed present in `pack_a_corrected.js` via direct file scan (S077 T0). All are `question_state: "Certified"`.

### Already Rewritten (Excluded from this session)

| QID | CognitiveLevel | Prior Session Wave | Status |
|-----|---------------|-------------------|--------|
| P1-B-002 | Evaluate | S61-S76 waves | Confirmed — Caldera Food Processing scenario, DS=4 |
| P1-B-015 | Analyze | S61-S76 waves | Confirmed — Granite Industries pro forma analysis |
| P1-B-086 | Evaluate | S61-S76 waves | Confirmed — Overland Industries forecast bias |

### Wave 1 Candidates — All 15 Confirmed

| QID | Current CL | Current DS | Current CC | Topic (from file) | Line |
|-----|-----------|------------|------------|-------------------|------|
| P1-B-001 | Understand | — | D | mission to tactical planning linkage | 3934 |
| P1-B-003 | Understand | — | B | participative budgeting slack risk | 4034 |
| P1-B-004 | Understand | — | B | rolling budget horizon | 4084 |
| P1-B-007 | Understand | — | B | flexible budget purpose | 4234 |
| P1-B-008 | Understand | — | A | sales budget sequencing | 4284 |
| P1-B-009 | Understand | — | D | cash budget minimum balance | 4334 |
| P1-B-010 | Understand | — | A | forecasting causal model | 4384 |
| P1-B-011 | Understand | — | A | time-series trend | 4434 |
| P1-B-013 | Understand | — | B | learning curve budgeting | 4534 |
| P1-B-016 | Apply | — | A | project budgeting distinction | 4684 |
| P1-B-022 | Apply | — | A | regression forecast cost equation 6 | 4984 |
| P1-B-030 | Apply | — | B | direct materials purchases budget 14 | 5384 |
| P1-B-036 | Apply | — | A | cash budget borrowing need 20 | 5685 |
| P1-B-039 | Apply | — | B | cash collections schedule | 5835 |
| P1-B-070 | Apply | — | D | regression forecast cost equation 54 | 7385 |

**Note:** Actual file Topics differ from queue file's expected topics for some items. This is the dual-block architecture effect — content block topics are the authoritative source. Rewrites will use queue file's intended scenario angles, which may update Topic fields to match.

---

## 4. Batch Plan

### Batch 1 — Evaluate x3 + Analyze x2 (5 items)

| QID | Target CL | Target Diff | Scenario Angle (from queue) |
|-----|-----------|-------------|----------------------------|
| P1-B-001 | **Evaluate** | Difficult | CFO evaluating top-down vs. participative budgeting; 3-year variance analysis |
| P1-B-003 | **Evaluate** | Difficult | CFO evaluating annual vs. rolling 12-month budget; MAPE comparison |
| P1-B-004 | **Evaluate** | Difficult | Controller recommending ZBB pilot departments; cost growth + discretionary analysis |
| P1-B-008 | **Evaluate** | Difficult | Treasurer evaluating 3 financing options for seasonal cash shortfall |
| P1-B-007 | **Analyze** | Difficult | Budget analyst tracing $42K inconsistency in master budget dependency chain |

### Batch 2 — Evaluate x2 + Analyze x3 (5 items)

| QID | Target CL | Target Diff | Scenario Angle (from queue) |
|-----|-----------|-------------|----------------------------|
| P1-B-030 | **Evaluate** | Very Difficult | CFO evaluating 3 cash acceleration strategies; NPV + relationship impact |
| P1-B-009 | **Evaluate** | Difficult | Demand planning manager evaluating causal model vs. moving average; backtesting MAPE |
| P1-B-039 | **Evaluate** | Very Difficult | Controller prioritizing 3 concurrent variances; trend + controllability + strategic impact |
| P1-B-010 | **Analyze** | Difficult | Operations analyst decomposing 24-month demand into trend/seasonal/irregular components |
| P1-B-011 | **Analyze** | Difficult | Product manager evaluating new product launch with 4 demand scenarios; EV analysis |

### Batch 3 — Evaluate x1 + Analyze x4 (5 items)

| QID | Target CL | Target Diff | Scenario Angle (from queue) |
|-----|-----------|-------------|----------------------------|
| P1-B-070 | **Evaluate** | Difficult | CFO evaluating ZBB cost-benefit; $180K cost vs. $340K savings + readiness scores |
| P1-B-013 | **Analyze** | Difficult | Controller performing 4-variable sensitivity analysis; rank assumptions by profit sensitivity |
| P1-B-016 | **Analyze** | Difficult | Production manager determining Q2 production plan across capacity constraints + overtime |
| P1-B-022 | **Analyze** | Difficult | Production supervisor analyzing learning curve flattening; actual-vs-predicted through batch 5 |
| P1-B-036 | **Analyze** | Difficult | Controller decomposing 3 cost pool variances into spending vs. volume components |

### Target Outcome

| Metric | Target |
|--------|--------|
| Evaluate | 8 |
| Analyze | 7 |
| Difficult | 12 |
| Very Difficult | 3 |
| Remember/Understand/Apply | 0 (all upgraded) |

---

## 5. Stop Conditions

1. Any governance guard test fails → halt and fix before proceeding
2. Pack A QID count diverges from 500 → halt and reconcile
3. Certified count drops (pre-existing 500 Pack A certified) → halt and investigate
4. DL-008, DL-026, DL-030, or DL-037 detected post-rewrite → halt and fix before next batch
5. Any batch produces a Regression-quality item → halt, revert batch, re-plan
6. More than two items in a batch fail to reach Analyze/Evaluate → halt and escalate

---

## 6. Pre-Session State

- **Pack A Section B items:** 100
- **Evaluate:** 6 (including 2 previously rewritten: B-002, B-086)
- **Analyze:** 2 (including 1 previously rewritten: B-015)
- **Apply:** 75
- **Understand:** 17
- **Higher-order %:** 8.0%

## 7. Projected Post-Session State

- **Evaluate:** 14 (+8)
- **Analyze:** 9 (+7)
- **Apply:** 63 (-12)
- **Understand:** 14 (-3)
- **Higher-order %:** 23.0% (+15.0 pp)

---

## 8. Governance Requirements

| Requirement | Status |
|-------------|--------|
| `npm run preflight` at T0 | Done — 2 pre-existing divergences (Pack E 545, Certified +35) |
| Backup-before-write | Required before each batch |
| Governance guard per batch | Required — `node scripts/test_governance_guard.js` |
| DL-008 enforcement (Rule 2) | Must be 0 in all rewrites |
| DL-026 enforcement (Rule 6) | Must be 0 in all rewrites |
| DL-037 enforcement (Rule 9) | Must be 0 in all rewrites |
| Rule 4 (CC change note) | Required if CorrectChoice changes |
| REVISION_HISTORY.md | Required at closeout |
| `npm run pipeline` at Tend | Required |
| Dual verification (AGENTS.md §5) | All counts verified against raw file evidence |
| 30-item batch cap (Rule 5) | Compliant — 5 items per batch |

---

## 9. Success Criteria Verification Plan

At closeout, the Verifier will confirm:
1. 15 rewrites completed
2. At least 8 true Evaluate items
3. At least 7 true Analyze items
4. Governance guard = 54/54 PASS (note: guard test count updated since baseline capture)
5. Pack A parses clean
6. Pack A QID count = 500
7. DL-008 = 0
8. DL-026 = 0
9. DL-030 = 0
10. DL-037 = 0
11. No Regression-quality items
12. All 10 required deliverable files produced
