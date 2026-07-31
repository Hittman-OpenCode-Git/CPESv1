# MAY-020 Weekly Review Template

**Session:** MAY-020 — Limited Rollout Operations Framework
**Date:** 2026-07-31
**Governance Lane:** Light (documentation only — no code, no content impact)
**Phase:** Implementer — Weekly Review Templates
**Status:** Active (template — fill in for each weekly review)

---

## 1. Purpose

This template standardizes the weekly operational review of the May adaptive coaching rollout. Each review covers one calendar week of rollout activity across all testers. The review produces a GO / CONDITIONAL GO / NO-GO recommendation for continuing the rollout into the following week.

---

## 2. Review Metadata

| Field | Value |
|-------|-------|
| **Review period** | [Start date] to [End date] |
| **Week number** | [1, 2, 3, ...] |
| **Review date** | [Date review was conducted] |
| **Reviewer** | [Name / role] |
| **Number of active testers** | [N] |
| **Number of sessions completed** | [N] |
| **Preflight status** | [PASS / FAIL — if FAIL, rollout is paused] |
| **Smoke status** | [PASS / FAIL — if FAIL, rollout is paused] |
| **Governance guard status** | [N/54 PASS] |

---

## 3. Cohort Aggregate Telemetry

### 3.1 Session Activity

| Metric | Value | Target | Status |
|--------|-------|--------|--------|
| Total sessions completed | [N] | ≥ 10 | [✓ / ✗] |
| Average events per session | [N] | ≥ 20 | [✓ / ✗] |
| Valid orchestrator call rate | [X%] | ≥ 90% | [✓ / ✗] |
| Telemetry persistence success rate | [X%] | 100% | [✓ / ✗] |
| Sessions with 0 May-related console errors | [N] | All | [✓ / ✗] |

### 3.2 Decision Distribution

| Decision ID | Mode | Count | % of Total | Expected % | In Range? (±15%) |
|-------------|------|-------|-----------|------------|-------------------|
| D1 | QUIZ | [N] | [X%] | 30-40% | [✓ / ✗] |
| D2 | QUIZ | [N] | [X%] | 2-5% | [✓ / ✗] |
| D3 | SOCRATIC | [N] | [X%] | 2-5% | [✓ / ✗] |
| D4 | STUDY_PLAN | [N] | [X%] | 2-5% | [✓ / ✗] |
| D5 | QUIZ | [N] | [X%] | 15-25% | [✓ / ✗] |
| D6 | QUIZ | [N] | [X%] | 10-20% | [✓ / ✗] |
| D7 | EXPLAIN | [N] | [X%] | 5-10% | [✓ / ✗] |
| D8 | EXPLAIN | [N] | [X%] | 5-15% | [✓ / ✗] |
| D9 | QUIZ | [N] | [X%] | 5-10% | [✓ / ✗] |
| D10 | EXPLAIN | [N] | [X%] | 2-5% | [✓ / ✗] |

**Decision diversity score:** [N] / 10 D1-D10 IDs reached

**Summary:**
- Decisions in expected range: [N] / 10
- Most frequent decision: [D?] at [X%]
- EXPLAIN mode reachable: [Yes / No] (D7 + D8 + D10 > 0)
- SOCRATIC mode reachable: [Yes / No] (D3 > 0)
- STUDY_PLAN mode reachable: [Yes / No] (D4 > 0)

### 3.3 Mode Distribution

| Mode | Count | % of Total | Expected % | Status |
|------|-------|------------|------------|--------|
| QUIZ | [N] | [X%] | 50-70% | [✓ / ✗ / ⚠] |
| EXPLAIN | [N] | [X%] | 15-25% | [✓ / ✗ / ⚠] |
| STUDY_PLAN | [N] | [X%] | 5-15% | [✓ / ✗ / ⚠] |
| SOCRATIC | [N] | [X%] | 2-10% | [✓ / ✗ / ⚠] |

**Alert:** QUIZ > 85% → [Yes / No]

### 3.4 Readiness Distribution

| Band | Count | % of Total | Expected % | Status |
|------|-------|------------|------------|--------|
| Ready | [N] | [X%] | 5-10% | [✓ / ✗] |
| Proficient | [N] | [X%] | 10-20% | [✓ / ✗] |
| Developing | [N] | [X%] | 40-60% | [✓ / ✗] |
| Fragile | [N] | [X%] | 15-30% | [✓ / ✗] |
| No Data | [N] | [X%] | 2-5% | [✓ / ✗] |

**Summary statistics:**
- Mean overallScore: [X]
- Min overallScore: [X]
- Max overallScore: [X]
- Ready band reached: [Yes / No]

### 3.5 Intervention Distribution

| Tier | Label | Count | % of Total | Expected % | Status |
|------|-------|-------|------------|------------|--------|
| 1 | Critical | [N] | [X%] | 0-5% | [✓ / ⚠] |
| 2 | Urgent | [N] | [X%] | 5-10% | [✓] |
| 3 | Targeted Review | [N] | [X%] | 30-40% | [✓] |
| 4 | Reinforce | [N] | [X%] | 25-35% | [✓] |
| 5 | Maintain | [N] | [X%] | 15-25% | [✓] |

**Alert:** Tier 1 > 10% → [Yes / No]

### 3.6 Recommendation Summary

| Metric | Value | Target |
|--------|-------|--------|
| Total recommendations generated | [N] | ≥ 1 per session |
| Distinct recommendation types | [N] | ≥ 2 |
| Top recommended topic | [Topic] | — |
| Top recommended action | [Type] | — |
| Recommendation diversity satisfactory? | [Yes / No] | Type count ≥ 2 |

---

## 4. User Experience Report

### 4.1 Tester Feedback Summary

| Tester | Sessions | Complaints Filed | Issues Confirmed | Notes |
|--------|----------|-----------------|-----------------|-------|
| [Name] | [N] | [N] | [N] | [Notes] |
| ... | | | | |

### 4.2 Issue Log

| Date | Tester | Issue | Severity | Resolution | Escalation Tier |
|------|--------|-------|----------|------------|-----------------|
| [Date] | [Name] | [Description] | [Low/Med/High/Crit] | [Fix applied / investigating / rollback] | [0/1/2/3] |

### 4.3 Rollback Events

| Date | Reason | Tier | Duration | Resolution |
|------|--------|------|----------|------------|
| [Date] | [Reason] | [2/3] | [Hours] | [Fix + re-enable] |

---

## 5. Trend Analysis (Week-over-Week)

### 5.1 Key Metric Trends

| Metric | Last Week | This Week | Trend | Interpretation |
|--------|-----------|-----------|-------|----------------|
| Total sessions | [N] | [N] | [↑/↓/→] | [Comment] |
| Valid orchestrator rate | [X%] | [X%] | [↑/↓/→] | [Comment] |
| EXPLAIN mode % | [X%] | [X%] | [↑/↓/→] | [Comment] |
| Ready band % | [X%] | [X%] | [↑/↓/→] | [Comment] |
| Decision diversity | [N/10] | [N/10] | [↑/↓/→] | [Comment] |
| Complaints/Issues | [N] | [N] | [↑/↓/→] | [Comment] |

### 5.2 Notable Changes

[Describe any significant changes from the prior week — positive or negative]

---

## 6. Phase 2 → Phase 3 Gate Assessment

### 6.1 Cumulative Gate Metrics (from MAY-019 §6)

| Metric | Threshold | Current (Cumulative) | Weight | Score |
|--------|-----------|----------------------|--------|-------|
| Valid orchestrator calls | ≥ 90% | [X%] | 25% | [N/25] |
| Decision distribution alignment | ≥ 80% within ±15% | [X%] | 25% | [N/25] |
| Zero May-attributed crashes | 0 | [N] | 20% | [N/20] |
| Telemetry persistence (all 5 types) | 100% | [X%] | 15% | [N/15] |
| Zero learner complaints (confirmed) | 0 | [N] | 15% | [N/15] |

**Weighted score:** [N] / 100

### 6.2 Gate Recommendation

| Score | Recommendation |
|-------|---------------|
| ≥ 85 | **GO** — Transition to Phase 3 full-activation decision |
| 70-84 | **CONDITIONAL GO** — Extend Phase 2; address specific metrics below threshold |
| < 70 | **NO-GO** — Rollout not ready; significant issues to resolve |

**This week's recommendation:** [GO / CONDITIONAL GO / NO-GO]

**Rationale:**
[Explanation of recommendation based on data above]

---

## 7. Actions for Next Week

### 7.1 Must-Fix (This Week)

| # | Action | Reason | Owner |
|---|--------|--------|-------|
| 1 | [Action] | [Why] | [Name] |
| ... | | | |

### 7.2 Should-Fix (Next 2 Weeks)

| # | Action | Reason | Owner |
|---|--------|--------|-------|
| 1 | [Action] | [Why] | [Name] |
| ... | | | |

### 7.3 Monitoring Changes

| Change | Reason |
|--------|--------|
| [Adjust threshold, add metric, change cadence] | [Why] |

---

## 8. Reviewer Sign-Off

| Field | Value |
|-------|-------|
| Review completed by | [Name] |
| Recommendation | [GO / CONDITIONAL GO / NO-GO] |
| Next review scheduled | [Date] |

---

## 9. Template Usage Notes

- **Frequency:** Every 7 calendar days, or after 5+ sessions have accumulated (whichever comes first)
- **Data source:** Aggregated from `reports/telemetry/MAY020_TELEMETRY_{date}_{tester}.json` files
- **Filing:** Save completed review as `reports/telemetry/MAY020_WEEKLY_{date}.md`
- **Governance:** Read-only — no content, pack, case, or answer-key modifications
- **Privacy:** No PII, no answer data, no session content in this review

---

*MAY-020 — Weekly Review Template — 2026-07-31*
