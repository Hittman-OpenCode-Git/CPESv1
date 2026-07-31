# MAY-025 — Weekly Aggregate Analysis Template

**Session:** MAY-025 — May Effectiveness & Value Realization
**Date:** 2026-07-31
**Status:** Template — awaiting live telemetry data
**Governance Lane:** Light

---

## 1. Purpose

This template aggregates per-session analyses into a weekly cohort-level evaluation. It produces the official MAY-025 composite score and GO / CONDITIONAL GO / NO-GO recommendation.

**Prerequisites:**
- At least 25 session telemetry files in `reports/telemetry/`
- At least 14 calendar days of data
- At least 3 distinct learners
- Per-session analysis templates completed for every session in the window

---

## 2. Cohort Demographics

| Field | Value |
|-------|-------|
| Measurement Period | [START_DATE] to [END_DATE] |
| Calendar Days | [N] |
| Total Sessions Analyzed | [N] |
| Distinct Learners | [N] |
| Sessions Per Learner (mean) | [X] |
| Sessions Per Learner (range) | [MIN–MAX] |
| Panel-Opened Sessions | [N] (for UA metrics) |
| Completed Sessions | [N] |
| Incomplete/Aborted Sessions (excluded) | [N] |

---

## 3. Event Type Distribution (All Sessions)

| Event Type | Total Events | Sessions with ≥1 | % of Sessions |
|------------|-------------|-------------------|---------------|
| decision | [N] | [N] | [%] |
| mode | [N] | [N] | [%] |
| readiness | [N] | [N] | [%] |
| recommendation | [N] | [N] | [%] |
| intervention | [N] | [N] | [%] |
| adoption | [N] | [N] | [%] |
| engagement | [N] | [N] | [%] |
| **Total** | **[N]** | | |

---

## 4. Per-Dimension Aggregation

### 4.1 Recommendation Quality — [X]/100 [VERDICT]

Aggregate across all sessions with recommendation telemetry:

| Metric | Target | Sessions Measured | Actual (Mean) | Sessions Meeting Target | Ratio | Weight | Scored |
|--------|--------|-------------------|---------------|------------------------|-------|--------|--------|
| RQ1 — Weakness identification accuracy | ≥ 90% | [N] | [X%] | [N] | [X] | 30% | [X] |
| RQ2 — Review suggestion relevance | ≥ 85% | [N] | [X%] | [N] | [X] | 25% | [X] |
| RQ3 — Next-session actionability | ≥ 80% | [N] | [X%] | [N] | [X] | 20% | [X] |
| RQ4 — Panel renders without fallback | ≥ 95% | [N] | [X%] | [N] | [X] | 25% | [X] |
| | | | | | | **100%** | **[X/100]** |

**Trend:** [Improving / Stable / Declining] compared to prior week.

**Top strength:** [Best-performing metric and interpretation]

**Top weakness:** [Worst-performing metric and root-cause hypothesis]

### 4.2 Readiness Accuracy — [X]/100 [VERDICT]

Aggregate across sessions with readiness + accuracy telemetry:

| Metric | Target | Sessions Measured | Actual (Mean) | Sessions Meeting Target | Ratio | Weight | Scored |
|--------|--------|-------------------|---------------|------------------------|-------|--------|--------|
| RA1 — Band vs. accuracy deviation | ≤ 15% | [N] | [X%] | [N] | [X] | 30% | [X] |
| RA2 — Readiness/accuracy same-direction | ≥ 80% | [N] | [X%] | [N] | [X] | 25% | [X] |
| RA3 — Ready-band reachability | ≥ 60% | [N] | [X%] | [N] | [X] | 25% | [X] |
| RA4 — At-risk detection correspondence | ≥ 85% | [N] | [X%] | [N] | [X] | 20% | [X] |
| | | | | | | **100%** | **[X/100]** |

**RA2 — Pairwise Comparison (Learners with 3+ Sessions):**

| Learner ID | Session Pairs | Same-Direction Pairs | % Aligned |
|------------|---------------|---------------------|-----------|
| [LXX] | [N] | [N] | [X%] |
| [LXX] | [N] | [N] | [X%] |
| **All** | **[N]** | **[N]** | **[X%]** |

**Trend:** [Improving / Stable / Declining]

**Top strength:**

**Top weakness:**

### 4.3 User Adoption — [X]/100 [VERDICT]

Adoption funnel across all panel-opened sessions:

| Metric | Target | Sessions Measured | Actual | Ratio | Weight | Scored |
|--------|--------|-------------------|--------|-------|--------|--------|
| UA1 — Panel opened | ≥ 70% of completed sessions | [N completed] | [N panel-opened / N completed = X%] | [X] | 20% | [X] |
| UA2 — Recommendation clicked | ≥ 40% of panel-opened | [N panel-opened] | [N clicked / N panel-opened = X%] | [X] | 25% | [X] |
| UA3 — Session started from rec | ≥ 25% of clicked | [N clicked] | [N started / N clicked = X%] | [X] | 25% | [X] |
| UA4 — Recommended topic completed | ≥ 20% of started | [N started] | [N completed / N started = X%] | [X] | 15% | [X] |
| UA5 — Type effectiveness | (reported) | — | [See below] | — | 15% | — |
| UA6 — Ignored types | (reported) | — | [See below] | — | 0% | — |
| | | | | | **100%** | **[X/100]** |

#### UA5 — Adoption Funnel by Recommendation Type

| Recommendation Type | Presented | Panel Opened | Clicked | Session Started | Completed | Click Rate | Action Rate | Completion Rate |
|---------------------|-----------|-------------|---------|-----------------|-----------|------------|-------------|-----------------|
| Top Weakness | [N] | [N] | [N] | [N] | [N] | [X%] | [X%] | [X%] |
| Suggested Review | [N] | [N] | [N] | [N] | [N] | [X%] | [X%] | [X%] |
| Next Session | [N] | [N] | [N] | [N] | [N] | [X%] | [X%] | [X%] |
| Readiness | [N] | [N] | [N] | [N] | [N] | [X%] | [X%] | [X%] |
| **All Types** | **[N]** | **[N]** | **[N]** | **[N]** | **[N]** | **[X%]** | **[X%]** | **[X%]** |

**Rates defined:**
- **Click Rate** = Clicked / Presented (per type)
- **Action Rate** = Session Started / Clicked
- **Completion Rate** = Completed / Session Started

#### UA6 — Ignored Recommendation Types

| Recommendation Type | Click Rate | Assessment |
|---------------------|------------|------------|
| [Type] | [X%] | [Under-performing / Needs recalibration / Expected — high-intent only] |

**Adoption funnel visualization (all types combined):**

```
Presented:  [N] ████████████████████ 100%
Panel Opened: [N] ████████████████    X%
Clicked:     [N] ████████████        X%
Started:    [N] ████████            X%
Completed:  [N] ██████              X%
```

**Trend:** Adoption funnel ratios [improving / stable / declining] week-over-week.

**Top strength:**

**Top weakness:**

### 4.4 Engagement — [X]/100 [VERDICT]

| Metric | Target | Sessions Measured | Actual | Sessions Meeting Target | Ratio | Weight | Scored |
|--------|--------|-------------------|--------|------------------------|-------|--------|--------|
| EG1 — Coaching tab opened | ≥ 50% of sessions | [N] | [N / total = X%] | [N] | [X] | 25% | [X] |
| EG2 — Tooltip interaction rate | ≥ 30% of sessions | [N] | [N / total = X%] | [N] | [X] | 25% | [X] |
| EG3 — May active sessions | ≥ 90% of all sessions | [N] | [N / total = X%] | [N] | [X] | 25% | [X] |
| EG4 — Repeat May engagement | ≥ 60% of 3+ session learners | [N learners] | [N repeating / N eligible = X%] | [N] | [X] | 25% | [X] |
| | | | | | | **100%** | **[X/100]** |

**EG4 — Repeat Engagement Detail:**

| Learner ID | Total Sessions | Sessions with May Engagement | % Engaged | Consecutive Streak? |
|------------|---------------|------------------------------|-----------|---------------------|
| [LXX] | [N] | [N] | [X%] | [Y/N] |
| [LXX] | [N] | [N] | [X%] | [Y/N] |

**Engagement event distribution (all sessions):**

| Action | Total Events | Sessions with ≥1 | Mean per Session |
|--------|-------------|-------------------|------------------|
| tooltipViewed | [N] | [N] | [X] |
| tooltipClicked | [N] | [N] | [X] |
| dismissed | [N] | [N] | [X] |

**Trend:** [Improving / Stable / Declining]

**Top strength:**

**Top weakness:**

### 4.5 Telemetry Reliability — [X]/100 [VERDICT]

| Metric | Target | Sessions Measured | Actual | Ratio | Weight | Scored |
|--------|--------|-------------------|--------|-------|--------|--------|
| TR1 — Telemetry persistence | = 100% | [N] | [N sessions with telemetry / N sessions = X%] | [X] | 30% | [X] |
| TR2 — Event type completeness | ≥ 95% | [N] | [Mean types present / 7 = X%] | [X] | 30% | [X] |
| TR3 — Archive consistency | 100% match | [N archived] | [N verified / N archived = X%] | [X] | 20% | [X] |
| TR4 — Buffer overflow events | 0 sessions | [N] | [N overflow sessions] | [1.0 if 0, 0.0 if any] | 20% | [X] |
| | | | | | **100%** | **[X/100]** |

**TR2 — Event Type Completeness (per session):**

| Session Count | All 7 Types | 6 Types | 5 Types | 4 Types | ≤3 Types |
|---------------|-------------|---------|---------|---------|----------|
| [N] | [N] | [N] | [N] | [N] | [N] |

**Missing event types (if any) and likely cause:**
[List types missing in ≥5% of sessions and root cause hypothesis]

**Trend:** [Improving / Stable / Declining]

**Top strength:**

**Top weakness:**

### 4.6 Production Stability — [X]/100 [VERDICT]

| Metric | Target | Sessions Measured | Actual | Ratio | Weight | Scored |
|--------|--------|-------------------|--------|-------|--------|--------|
| PS1 — Zero May crashes | = 100% | [N] | [N crash-free / N total = X%] | [X] | 35% | [X] |
| PS2 — Panel render success | ≥ 98% | [N] | [N successful / N renders = X%] | [X] | 25% | [X] |
| PS3 — Rollback events | 0 | — | [N] | [1.0 if 0] | 20% | [X] |
| PS4 — Flag stability | 0 unauthorized | — | [N unauthorized] | [1.0 if 0] | 20% | [X] |
| | | | | | **100%** | **[X/100]** |

**PS1 — May-Attributed Errors:**

| Session | Error Message | Location | Recurring? |
|---------|--------------|----------|------------|
| [SXXX] | | | |
| | | | |
| **(if empty: "Zero May-attributed errors across all [N] sessions.")** | | | |

**PS3 — Rollback Log:**

| Date | Reason | Duration | Resolved? |
|------|--------|----------|-----------|
| **(if empty: "Zero rollback events in measurement window.")** | | | |

**PS4 — Flag Change Log:**

| Date | Flag | From | To | Authorized? |
|------|------|------|----|-------------|
| **(if empty: "Zero unauthorized flag changes.")** | | | |

**Trend:** [Stable / Unstable]

**Top strength:**

**Top weakness:**

---

## 5. Composite Score Calculation

```
Dimension Score (D) = Σ (metric_actual / metric_target) × (metric_weight / dimension_total_weight)
                     capping each metric ratio at 1.0

Composite Score = Σ (Dimension Score × Dimension Weight)
```

| Dimension | Score | Weight | Weighted Score |
|-----------|-------|--------|----------------|
| Recommendation Quality | [X]/100 | 25% | [X × 0.25] |
| Readiness Accuracy | [X]/100 | 20% | [X × 0.20] |
| User Adoption | [X]/100 | 20% | [X × 0.20] |
| Engagement | [X]/100 | 15% | [X × 0.15] |
| Telemetry Reliability | [X]/100 | 10% | [X × 0.10] |
| Production Stability | [X]/100 | 10% | [X × 0.10] |
| **Overall Effectiveness** | | | **[SUM]/100** |

---

## 6. Hard Gates Check

| Gate | Requirement | Status | Evidence |
|------|-------------|--------|----------|
| G1 | PS1 — Zero May-attributed crashes | [PASS / FAIL] | [N crash-free sessions / N total = X%] |
| G2 | PS3 — Zero rollback events | [PASS / FAIL] | [N rollback events] |
| G3 | TR1 — Telemetry persistence = 100% | [PASS / FAIL] | [N sessions with telemetry / N sessions = X%] |
| G4 | Preflight — 0 divergences | [PASS / FAIL] | [Preflight output: X divergences] |

**All hard gates must pass for a GO recommendation, regardless of composite score.**

---

## 7. Overall Recommendation

```
Composite Score: [X]/100
Hard Gates: [ALL PASS / G# FAILED]
Recommendation: [GO / CONDITIONAL GO / NO-GO]
```

| Composite Score | Hard Gates | Recommendation |
|-----------------|------------|---------------|
| ≥ 85 | ALL PASS | **GO** — May is effective. Continue production operation. |
| ≥ 85 | ANY FAIL | **CONDITIONAL GO** — Composite is strong but hard gate failure blocks GO. |
| 70–84 | ALL PASS | **CONDITIONAL GO** — May provides value but specific dimensions need improvement. |
| 70–84 | ANY FAIL | **CONDITIONAL GO** — Address hard gates first, then target low dimensions. |
| < 70 | ANY | **NO-GO** — May is not demonstrating sufficient value. Reassess production operation. |

**Rationale:**
[2-4 sentences citing specific dimensions — which met targets, which fell short, and why]

---

## 8. Week-Over-Week Trend

| Dimension | Prior Week Score | This Week Score | Δ | Trend |
|-----------|-----------------|-----------------|---|-------|
| Recommendation Quality | [X]/100 | [X]/100 | [±X] | [↑/→/↓] |
| Readiness Accuracy | [X]/100 | [X]/100 | [±X] | [↑/→/↓] |
| User Adoption | [X]/100 | [X]/100 | [±X] | [↑/→/↓] |
| Engagement | [X]/100 | [X]/100 | [±X] | [↑/→/↓] |
| Telemetry Reliability | [X]/100 | [X]/100 | [±X] | [↑/→/↓] |
| Production Stability | [X]/100 | [X]/100 | [±X] | [↑/→/↓] |
| **Composite** | **[X]/100** | **[X]/100** | **[±X]** | **[↑/→/↓]** |

---

## 9. Recommendations

### If GO

| Priority | Action | Rationale |
|----------|--------|-----------|
| 1 | Continue production operation | All metrics meet or exceed targets |
| 2 | MAY-026: LLM enablement discussion | Effectiveness confirmed — consider next phase |
| 3 | MAY-028: Monthly trends review | Schedule in 3 weeks |

### If CONDITIONAL GO

| Dimension | Current Score | Target | Gap | Recommended Action |
|-----------|--------------|--------|-----|--------------------|
| [Dimension] | [X]/100 | [≥Y] | [Z points] | [Specific fix] |

### If NO-GO

| Priority | Issue | Root Cause Hypothesis | Required Action |
|----------|-------|----------------------|-----------------|
| 1 | | | |

---

## 10. Data Collection Quality Assessment

| Check | Status |
|-------|--------|
| Minimum sessions met (≥25) | [Y/N] |
| Minimum days met (≥14) | [Y/N] |
| Minimum learners met (≥3) | [Y/N] |
| Panel-opened sessions for UA metrics (≥10) | [Y/N] |
| Telemetry registry up to date | [Y/N] |
| All per-session templates completed | [Y/N] |
| No sessions missing telemetry | [Y/N] |
| No duplicate session IDs | [Y/N] |

---

*MAY-025 — Weekly Aggregate Template — v1.0 — 2026-07-31*
