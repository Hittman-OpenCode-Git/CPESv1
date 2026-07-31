# MAY-025 — Per-Session Analysis Template

**Session:** MAY-025 — May Effectiveness & Value Realization
**Date:** 2026-07-31
**Status:** Template — awaiting live telemetry data
**Governance Lane:** Light

---

## 1. Purpose

This template evaluates one session's telemetry against the 6 MAY-025 measurement dimensions. Complete one template per exported session JSON file.

**Prerequisite:** The session's telemetry has been exported to `reports/telemetry/session_YYYYMMDD_HHMMSS_learner[N].json` per the Data Collection Guide.

---

## 2. Session Metadata

| Field | Value |
|-------|-------|
| Session ID | [SXXX] |
| Learner ID | [LXX] |
| Session Date | [YYYY-MM-DD] |
| Telemetry File | [filename.json] |
| Total Events | [N] |
| Duration (estimated) | [N minutes] |
| Session Completed | [Yes / No] |
| Session Mode | [Practice / Exam / Review] |

---

## 3. Raw Telemetry Extraction

### 3.1 Event Type Inventory

Copy from the telemetry file's `byType` object, or compute by counting events from the full buffer:

| Event Type | Count | Present? (≥1 = ✓) |
|------------|-------|---------------------|
| decision | [N] | [✓ / —] |
| mode | [N] | [✓ / —] |
| readiness | [N] | [✓ / —] |
| recommendation | [N] | [✓ / —] |
| intervention | [N] | [✓ / —] |
| adoption | [N] | [✓ / —] |
| engagement | [N] | [✓ / —] |
| **Total** | [N] | |

### 3.2 Adoption Events (Extract from `byType.adoption` or full buffer)

For each adoption event in the buffer, extract:

| # | recommendationType | cardId | topic | presented | panelOpened | clicked | sessionStarted | completed |
|---|--------------------|--------|-------|-----------|-------------|---------|----------------|-----------|
| 1 | | | | | | | | |
| 2 | | | | | | | | |
| ... | ... | ... | ... | ... | ... | ... | ... | ... |

### 3.3 Engagement Events (Extract from `byType.engagement` or full buffer)

| # | action | trigger context |
|---|--------|-----------------|
| 1 | | |
| 2 | | |
| ... | ... | ... |

### 3.4 Recommendation Events

| # | type | topic | band |
|---|------|-------|------|
| 1 | | | |
| 2 | | | |
| ... | ... | ... | ... |

### 3.5 Readiness Events

| # | overallBand | overallScore | topics |
|---|-------------|--------------|--------|
| 1 | | | |

---

## 4. Six-Dimension Scoring

Score each dimension using available data. Mark "INSUFFICIENT DATA" if fewer than 3 events in the relevant type(s).

### 4.1 Recommendation Quality — [X]/100 or INSUFFICIENT DATA

| Metric | Target | This Session | Ratio | Weight | Scored |
|--------|--------|-------------|-------|--------|--------|
| RQ1 — Weakness identification | ≥ 90% match | [%] | [X] | 30% | [X] |
| RQ2 — Review suggestion relevance | ≥ 85% | [%] | [X] | 25% | [X] |
| RQ3 — Next-session actionability | ≥ 80% | [%] | [X] | 20% | [X] |
| RQ4 — Panel renders without fallback | ≥ 95% | [%] | [X] | 25% | [X] |
| | | | | **Weight** | **[X]/100** |

**Notes:** [Observations about recommendation quality in this session]

### 4.2 Readiness Accuracy — [X]/100 or INSUFFICIENT DATA

| Metric | Target | This Session | Ratio | Weight | Scored |
|--------|--------|-------------|-------|--------|--------|
| RA1 — Band vs. accuracy alignment | ≤ 15% deviation | [%] | [X] | 30% | [X] |
| RA2 — Readiness/accuracy direction | ≥ 80% aligned | [N/A single session] | — | 25% | N/A |
| RA3 — Ready-band reachability | ≥ 60% | [%] | [X] | 25% | [X] |
| RA4 — At-risk detection | ≥ 85% | [%] | [X] | 20% | [X] |
| | | | | **Weight** | **[X]/100** |

**Notes:**
- RA2 requires 2+ sessions from same learner — mark N/A for single-session analysis.
- Readiness data depends on MayLearnerState accuracy by topic — compare readiness bands against actual per-topic accuracy from session results.

### 4.3 User Adoption — [X]/100 or INSUFFICIENT DATA

| Metric | Target | This Session | Ratio | Weight | Scored |
|--------|--------|-------------|-------|--------|--------|
| UA1 — Panel opened | ≥ 70% | [Yes/No] | [1.0 / 0.0] | 20% | [X] |
| UA2 — Recommendation clicked | ≥ 40% of opened | [Yes/No] | [1.0 / 0.0] | 25% | [X] |
| UA3 — Session started from rec | ≥ 25% of clicked | [Yes/No] | [1.0 / 0.0] | 25% | [X] |
| UA4 — Recommended topic completed | ≥ 20% of started | [Yes/No] | [1.0 / 0.0] | 15% | [X] |
| UA5 — Type effectiveness (reported) | — | [See below] | — | 15% | — |
| UA6 — Ignored types (reported) | — | [See below] | — | 0% | — |
| | | | | **Weight** | **[X]/100** |

**UA5 — Adoption by Type (this session):**

| Recommendation Type | Presented | Panel Opened | Clicked | Session Started | Completed |
|---------------------|-----------|-------------|---------|-----------------|-----------|
| Top Weakness | [Y/N] | [Y/N] | [Y/N] | [Y/N] | [Y/N] |
| Suggested Review | [Y/N] | [Y/N] | [Y/N] | [Y/N] | [Y/N] |
| Next Session | [Y/N] | [Y/N] | [Y/N] | [Y/N] | [Y/N] |
| Readiness | [Y/N] | [Y/N] | [Y/N] | [Y/N] | [Y/N] |

**UA6 — Ignored Types (this session):**
[Which recommendation types were presented but generated no clicks]

**Notes:** Single-session adoption analysis is limited. Adoption funnel (presented→opened→clicked→started→completed) requires multi-session aggregation for statistical significance.

### 4.4 Engagement — [X]/100 or INSUFFICIENT DATA

| Metric | Target | This Session | Ratio | Weight | Scored |
|--------|--------|-------------|-------|--------|--------|
| EG1 — Coaching tab opened | ≥ 50% | [Y/N] | [1.0/0.0] | 25% | [X] |
| EG2 — Tooltip interaction | ≥ 30% | [Y/N] | [1.0/0.0] | 25% | [X] |
| EG3 — May active (≥5 decisions) | ≥ 90% | [Y/N] | [1.0/0.0] | 25% | [X] |
| EG4 — Repeat engagement | ≥ 60% | [N/A single session] | — | 25% | N/A |
| | | | | **Weight** | **[X]/100** |

**Engagement event detail:**

| Action | Count | Context |
|--------|-------|---------|
| tooltipViewed | [N] | [when triggered] |
| tooltipClicked | [N] | [when triggered] |
| dismissed | [N] | [when triggered] |

**Notes:**
- EG4 requires 3+ sessions from same learner — mark N/A for single-session analysis.

### 4.5 Telemetry Reliability — [X]/100 or INSUFFICIENT DATA

| Metric | Target | This Session | Ratio | Weight | Scored |
|--------|--------|-------------|-------|--------|--------|
| TR1 — Telemetry persistence | = 100% | [Y/N] | [1.0/0.0] | 30% | [X] |
| TR2 — Event type completeness | ≥ 95% | [N/7 types] | [X] | 30% | [X] |
| TR3 — Archive consistency | 100% match | [Y/N/N/A] | [X] | 20% | [X] |
| TR4 — Buffer overflow | 0 sessions | [Y/N] | [1.0/0.0] | 20% | [X] |
| | | | | **Weight** | **[X]/100** |

**TR2 detail:** Which event types are missing from this session?
- [List any missing types]

**TR3 detail:** Does the exported JSON match what was in localStorage at time of export?
- [Compare file hash to console copy]

**Notes:**

### 4.6 Production Stability — [X]/100 or INSUFFICIENT DATA

| Metric | Target | This Session | Ratio | Weight | Scored |
|--------|--------|-------------|-------|--------|--------|
| PS1 — Zero May crashes | = 100% | [Y/N] | [1.0/0.0] | 35% | [X] |
| PS2 — Panel render success | ≥ 98% | [Y/N] | [1.0/0.0] | 25% | [X] |
| PS3 — Rollback events | 0 | [N] | [1.0] | 20% | [X] |
| PS4 — Flag stability | 0 unauthorized | [N] | [1.0] | 20% | [X] |
| | | | | **Weight** | **[X]/100** |

**Console errors observed (if any):**
[Copy any browser console errors related to May, app.js, or may-core.js]

**Notes:**

---

## 5. Composite Score (Single Session)

```
Dimension Score (D) = Σ (actual / target) × (metric_weight / dim_total_weight)
Composite Score = Σ (D × Dimension Weight)

Dimension Weights: RQ=0.25, RA=0.20, UA=0.20, EG=0.15, TR=0.10, PS=0.10
```

| Dimension | Raw Score | Weight | Weighted Score |
|-----------|-----------|--------|----------------|
| Recommendation Quality | [X] | 25% | [X × 0.25] |
| Readiness Accuracy | [X] | 20% | [X × 0.20] |
| User Adoption | [X] | 20% | [X × 0.20] |
| Engagement | [X] | 15% | [X × 0.15] |
| Telemetry Reliability | [X] | 10% | [X × 0.10] |
| Production Stability | [X] | 10% | [X × 0.10] |
| **Composite Score** | | | **[SUM]/100** |

**CAUTION:** Single-session composite scores are NOT statistically significant. Use the weekly aggregate template for GO/CONDITIONAL-GO/NO-GO decisions.

---

## 6. Session Verdict

| Verdict | Criteria |
|---------|----------|
| GREEN | All available dimensions ≥ 75; no crashes or telemetry gaps |
| YELLOW | 1-2 dimensions < 75; no crashes |
| RED | Any crash, telemetry gap, or ≥ 3 dimensions < 75 |

**[GREEN / YELLOW / RED]**

**Key finding:**
[1-2 sentence summary of what this session tells us about May effectiveness]

---

## 7. Data Quality Notes

| Check | Pass? |
|-------|-------|
| Telemetry exported immediately after session (not stale) | [Y/N] |
| localStorage value matches exported file (spot-check a few fields) | [Y/N] |
| Session was a normal practice/exam session (not a test/abort) | [Y/N] |
| No manual telemetry manipulation or console injection | [Y/N] |

---

*MAY-025 — Per-Session Analysis Template — v1.0 — 2026-07-31*
