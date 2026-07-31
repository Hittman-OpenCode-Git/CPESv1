# MAY-027 — Adoption Analysis

**Session:** MAY-027 — Effectiveness Baseline & Adoption Analytics
**Date:** 2026-07-31
**Governance Lane:** Light
**Status:** Baseline Established (Zero Production Data)

---

## 1. Executive Summary

The adoption telemetry infrastructure is production-live (MAY-026) but the measurement window has not yet opened. Zero real-user sessions with adoption events have been collected. This analysis establishes the structural adoption framework, expected event schemas, and reference conversion rates projected from the scenario telemetry archive (MAY-012 through MAY-016, 40 synthetic profiles across 4 sessions).

**Key finding:** The adoption analysis framework is complete and ready for production data. All 8 adoption injection sites are wired and validated (125/125 tests pass). The conversion funnel structure is in place for immediate data collection.

---

## 2. Adoption Event Infrastructure

### 2.1 Injection Sites (Verified Present)

| # | File | Location | Event | cardId | Trigger |
|---|------|----------|-------|--------|---------|
| A1 | app.js:2152 | `_renderMayRecommendationPanel()` | presented | `top-weakness` | Summary view render |
| A2 | app.js:2153 | `_renderMayRecommendationPanel()` | presented | `suggested-review` | Summary view render |
| A3 | app.js:2154 | `_renderMayRecommendationPanel()` | presented | `next-session` | Summary view render |
| A4 | app.js:2155 | `_renderMayRecommendationPanel()` | presented | `readiness` | Summary view render |
| A5 | app.js:2162 | `_renderMayRecommendationPanel()` onclick | panelOpened + clicked | `rec-panel-link` | "Open May for full coaching" link |
| A6 | app.js:3986 | `$('sessionForm').onsubmit` | sessionStarted | `session-start` | Session form submit |
| A7 | app.js:1608 | `ExamSessionManager.finish()` | completed | `session-complete` | Session submission |
| A8 | may-core.js:6578 | `openMayFromLauncher()` | panelOpened + clicked | `may-launcher` | Launcher button click |

### 2.2 Event Schema

```json
{
  "type": "adoption",
  "timestamp": "ISO 8601",
  "data": {
    "recommendationType": "Top Weakness | Suggested Review | Next Session | Readiness | Launcher | Panel Link | Session",
    "cardId": "top-weakness | suggested-review | next-session | readiness | may-launcher | rec-panel-link | session-start | session-complete",
    "topic": "string | empty",
    "presented": false,
    "panelOpened": false,
    "clicked": false,
    "sessionStarted": false,
    "completed": false,
    "timestamp": "ISO 8601"
  }
}
```

### 2.3 Events Per Session (Expected)

| Flow | Count | Events |
|------|-------|--------|
| Summary view render | 4 | presented (×4 cards) |
| User opens May | 1-2 | panelOpened + clicked |
| Session start | 1 | sessionStarted |
| Session complete | 1 | completed |
| **Total per session** | **7-8** | |

---

## 3. Card-Level Adoption Analysis

### 3.1 Recommendation Card Types

| cardId | recommendationType | Data Source | Expected Topic |
|--------|-------------------|-------------|----------------|
| `top-weakness` | Top Weakness | `MayLearnerState.getWeaknessClusters()[0]` | Learner's weakest topic |
| `suggested-review` | Suggested Review | `suggestedTopic` from readiness | Topic with most attempt data |
| `next-session` | Next Session | `nextAction` from orchestrator | Recommended next study topic |
| `readiness` | Readiness | `readinessBand` from scorer | Overall readiness band |

### 3.2 Scenario-Based Reference Data (MAY-012 through MAY-016)

The scenario telemetry archive provides 40 synthetic learner profiles across 4 calibration sessions. This data is not production adoption data but establishes the expected data shapes:

| Metric | Scenario Value | Notes |
|--------|---------------|-------|
| Synthetic profiles | 40 | Across MAY-012 (15), MAY-013 (10), MAY-014 (10), MAY-016 (5) |
| Decision coverage (D1-D10) | 8/10 reached | D3, D7, D9, D10 partially reachable |
| Mode distribution | QUIZ: 60%, EXPLAIN: 18%, STUDY_PLAN: 12%, SOCRATIC: 10% | Heavily QUIZ-biased in scenarios |
| Readiness score range | 42-72 | Mean: 56 across all profiles |
| Readiness band distribution | Recovery needed: 20%, Developing: 55%, Approaching review-ready: 20%, Not enough data: 5% | |

### 3.3 Projected Card Effectiveness (Structural Only)

Based on the four card data sources and their expected render quality:

| Card | Data Richness | Projected Render Reliability | Projected Topic Relevance |
|------|--------------|------------------------------|--------------------------|
| Top Weakness | High (learner accuracy data) | ≥ 95% render rate | Directly linked to lowest accuracy |
| Suggested Review | High (readiness scorer) | ≥ 90% render rate | Bottom-3 topic by accuracy |
| Next Session | Medium (orchestrator) | ≥ 85% render rate | Requires ≥ 3 sessions of data |
| Readiness | High (readiness scorer) | ≥ 95% render rate | Overall band, non-topic |

**Projected adoption ranking** (structural, not empirical):
1. Readiness — universally renders, topic-independent
2. Top Weakness — high specificity drives action
3. Suggested Review — overlaps with top weakness for new learners
4. Next Session — requires session history; lowest render rate for new learners

---

## 4. Adoption Measurement Framework

### 4.1 Metrics Ready for Collection

| Metric ID | Metric | Data Source | Requires |
|-----------|--------|-------------|----------|
| UA1 | Panel opened rate | `byType.adoption` → panelOpened:true | ≥ 1 session |
| UA2 | Card clicked rate | `byType.adoption` → clicked:true per cardId | ≥ 1 click |
| UA3 | Session start from recommendation | `byType.adoption` → sessionStarted:true | ≥ 1 session start |
| UA4 | Completion from recommendation | `byType.adoption` → completed:true per cardId | ≥ 1 completion |
| UA5 | Recommendation type effectiveness | `byType.adoption` → recommendationType clustering | ≥ 10 sessions |
| UA6 | Ignored recommendation types | Card types with highest presented-but-never-clicked ratio | ≥ 10 sessions |

### 4.2 Adoption Rate Targets (from MAY-025 §2.3)

| Metric | Target |
|--------|--------|
| UA1 — Panel opened | ≥ 70% of completed sessions |
| UA2 — Card clicked | ≥ 40% of panel-opened sessions |
| UA3 — Session actioned | ≥ 25% of clicked sessions |
| UA4 — Topic studied | ≥ 20% of actioned sessions |

### 4.3 Current Status: All Metrics PENDING

**Status reason:** The measurement window has not yet opened (MAY-026 completed today, 2026-07-31). Zero production sessions with adoption telemetry have been collected. All 8 injection sites are wired and validated (125/125 tests pass). Data collection begins on the next production session.

---

## 5. Known Gaps Affecting Adoption Analysis

| # | Gap | Severity | Impact on Adoption Analysis |
|---|------|----------|----------------------------|
| G1 | `snapshot()` is counts-only — no per-event detail in localStorage | **High** | Blocks UA5 (type effectiveness) and UA6 (ignored types). Card-level detail is lost. |
| G2 | localStorage overwritten per-session | **Medium** | Requires immediate export after each session. Lost if forgotten. |
| G3 | No session identity in events | **Low** | Manual tagging needed for cross-session learner tracking. |
| G4 | No automated export | **Low** | Console command required; acceptable at pilot scale. |

**Recommended action before first evaluation:** Address G1 by extending the orchestrator's persistence to call `drain()` before `snapshot()` and persist both the event-level detail and the aggregate snapshot. This enables UA5 and UA6 without waiting for 10+ sessions.

---

## 6. Next Steps

| Priority | Action | Session |
|----------|--------|---------|
| 1 | Open measurement window — collect real production sessions | Immediate |
| 2 | Address G1: persist per-event detail alongside snapshot | MAY-028 |
| 3 | Collect ≥ 25 sessions | Ongoing |
| 4 | Re-run this analysis with real data | After 25 sessions |
| 5 | Identify highest and lowest performing card types | After 50 sessions |

---

*MAY-027 — Adoption Analysis — v1.0 (Baseline) — 2026-07-31*
