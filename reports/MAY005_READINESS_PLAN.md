# MAY-005 Readiness Model Plan

**Session:** MAY-005 — Adaptive Intelligence & Readiness Platform  
**Phase:** Planner → Readiness Planner  
**Governance:** Light Lane  
**Date:** 2026-07-30

---

## 1. Purpose

Define the readiness scoring model that aggregates learner performance data into a single 0–100 composite score with per-section breakdowns, confidence estimates, and risk areas.

## 2. Data Sources

All data from existing `MayLearnerState` infrastructure:

| Source | Method | What It Provides |
|--------|--------|-----------------|
| Readiness summary | `getReadinessSummary()` | Per-topic banding, overall band, evidence |
| Section readiness | `getSectionReadinessSummary()` | Per-section (A–F) banding |
| Learner intelligence | `getLearnerIntelligence()` | Strengths, weaknesses, trends, observations |
| Evidence graph | `computeEvidenceGraph()` | Raw evidence layer |
| Threshold registry | `getThresholdRegistry()` | Single-source thresholds |
| Topic progress | `getTopicProgress()` | Per-topic accuracy, attempts |
| Trends | `getTrends()` | Direction, delta, stability |
| Confidence calibration | `getConfidenceCalibration()` | Over/under confidence rates |

## 3. Readiness Model Schema

```json
{
  "readinessScore": 0-100,
  "confidence": 0-100,
  "topicCoverage": {
    "totalTopics": 0,
    "topicsWithData": 0,
    "topicsAtReady": 0,
    "topicsAtRecovery": 0
  },
  "strengths": [],
  "weaknesses": [],
  "riskAreas": [],
  "recommendedNextActions": [],
  "_provenance": {}
}
```

## 4. Composite Score Calculation

### 4.1 Section-Level Band Scores

| Band | Score |
|------|-------|
| Not enough data | 0 |
| Recovery needed | 25 |
| Developing | 55 |
| Approaching review-ready | 75 |
| Ready for focused review | 95 |

### 4.2 Aggregation Formula

```
readinessScore = Σ (sectionWeight_i × bandScore_i) / Σ sectionWeight_i
```

Where `sectionWeight_i` = number of topics with data in that section (minimum 1 when section has any data at all).

### 4.3 Confidence Estimation

```
confidence = 100
- 20 if sessions < 2
- 10 if any section has < 3 topics with data
- 10 if more than 2 sections are "Not enough data"
- 15 if topic accuracy has high variance (stability < 40 for > 1 topic)
+ 10 if learner has been active in last 7 days (capped at 100, floored at 10)
```

## 5. Risk Identification

Risk areas are flagged when:
- **Topic risk:** accuracy < 60% AND ≥ 5 attempts AND direction = "declining"
- **Section risk:** section band = "Recovery needed" with > 2 topics
- **Stability risk:** any topic with stability < 40 and ≥ 4 attempts
- **Case risk:** dominant case pattern worsening with ≥ 4 misses
- **Exam timeline risk:** days until exam < 30 AND readiness < 50

## 6. Strengths & Weaknesses

- **Strengths:** Topics with ≥ 3 attempts, ≥ 85% accuracy, direction NOT declining
- **Weaknesses:** Topics with ≥ 5 attempts, < 60% accuracy

## 7. Feature Flag

Gated behind `ENABLE_READINESS_SCORING` (default: `false`).

## 8. Deliverable

`may-readiness-engine.js` — IIFE module exposing `MayReadinessEngine.assess()`.
