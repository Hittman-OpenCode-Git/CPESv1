# MAY-004 Learner Model Plan

**Session:** MAY-004 — Adaptive Study Coach  
**Phase:** Planner → Learner Model Planner  
**Governance:** Light Lane  
**Date:** 2026-07-30

---

## 1. Purpose

Define the normalized learner profile that all adaptive coaching subsystems consume. This profile is the single materialized view of the learner — computed once, consumed by every recommendation, remediation, and coaching path.

## 2. Data Sources

All profile fields are derived from existing infrastructure — no new storage or data capture required.

| Source | Module | What It Provides |
|--------|--------|-----------------|
| Session history | `MayLearnerState.load()` | Sessions, attempts, timestamps |
| Topic progress | `MayLearnerState.getTopicProgress()` | Per-topic accuracy, attempts, difficulty distribution |
| Trends | `MayLearnerState.getTrends()` | Direction, stability, delta per topic |
| Weakness clusters | `MayLearnerState.getWeaknessClusters()` | Persistent weak, improving, declining, unstable |
| Evidence graph | `MayLearnerState.computeEvidenceGraph()` | S131 unified evidence snapshot |
| Learner intelligence | `MayLearnerState.getLearnerIntelligence()` | S134 unified strengths/weaknesses/trends |
| Section readiness | `MayLearnerState.getSectionReadinessSummary()` | Per-section banding (A–F) |
| Practice mix | `MayLearnerState.getAdaptivePracticeMix()` | MCQ vs. case reinforcement recommendation |
| Confidence calibration | `MayLearnerState.getConfidenceCalibration()` | Overconfident/underconfident rates |
| Case patterns | `MayLearnerState.getCasePatternSummary()` | Dominant case miss patterns |
| Outcome tracking | `MayLearnerState.getOutcomeSummary()` | S129 recommendation effectiveness |
| Exam plan | `MayLearnerState.getExamPlan()` | S117 exam date/part/timeline |
| Longitudinal | `MayLearnerState.getLongitudinalAnalytics()` | 1wk/2wk/4wk windows |
| Thresholds | `MayLearnerState.getThresholdRegistry()` | S133 single-source thresholds |

## 3. Normalized Learner Profile Schema

```
{
  // ── Identity ──
  learnerId: string,
  displayName: string | null,
  firstVisit: ISO8601 | null,
  studyStreak: number,          // consecutive days with sessions

  // ── Activity Summary ──
  totalSessions: number,
  totalAttempts: number,
  sessionsLast7Days: number,
  sessionsLast28Days: number,
  lastActiveAt: ISO8601 | null,

  // ── Mastery ──
  masteryLevels: {
    [topic: string]: {
      accuracy: number,           // overall %
      recentAccuracy: number,     // last 5 attempts %
      timeWeightedAccuracy: number | null,  // EWMA 14-day half-life
      attempts: number,
      stability: number | null,   // 0–100
      direction: 'improving' | 'stable' | 'declining',
      delta: number | null,
      band: 'Ready for focused review' | 'Approaching review-ready' | 'Developing' | 'Recovery needed' | 'Not enough data',
      hintRate: number,
      avgDifficulty: number | null,
      lastSeen: ISO8601 | null
    }
  },

  // ── Strengths & Weaknesses ──
  strengths: [
    { topic, accuracy, attempts, evidence: {} }
  ],
  weaknesses: [
    { topic, accuracy, attempts, recentTrend, evidence: {} }
  ],
  persistentWeakTopics: string[],
  improvingTopics: string[],
  decliningTopics: string[],

  // ── Readiness ──
  readinessScore: {
    overall: 0–100,              // composite from S134 + section aggregation
    confidence: 'high' | 'moderate' | 'low',
    band: string,                // overall readiness band
    perSection: {
      A: { band, confidence, rationale },
      B: { band, confidence, rationale },
      C: { band, confidence, rationale },
      D: { band, confidence, rationale },
      E: { band, confidence, rationale },
      F: { band, confidence, rationale }
    }
  },

  // ── Behavior Patterns ──
  behavior: {
    hintDependency: {
      topics: string[],
      trend: 'increasing' | 'decreasing' | 'stable'
    },
    difficultySensitivity: {
      topics: string[],
      gap: number                // easy% − hard%
    },
    confidenceCalibration: {
      overconfidentRate: number,
      underconfidentRate: number,
      calibratedRate: number
    },
    casePatterns: {
      dominant: string | null,
      dominantTrend: 'improving' | 'stable' | 'worsening' | null,
      secondary: string | null
    }
  },

  // ── Recent Activity ──
  recentTopics: string[],         // topics seen in last 3 sessions
  recentQIDs: string[],           // recently seen question IDs (for dedup)
  missedTopics: string[],         // topics with recent misses

  // ── Recommendations (derived, not stored) ──
  recommendedActions: [
    {
      type: 'remediation' | 'reinforcement' | 'challenge' | 'review' | 'practice_mix',
      priority: 'high' | 'medium' | 'low',
      topic: string | null,
      section: string | null,
      rationale: string,
      evidence: {}
    }
  ],

  // ── Exam Context ──
  examPlan: {
    hasScheduledExam: boolean,
    examPart: string | null,
    examDate: string | null,
    daysUntilExam: number | null,
    planningExam: boolean,
    targetDateOrWindow: string | null
  } | null,

  // ── Metadata ──
  _meta: {
    computedAt: ISO8601,
    modelVersion: 'S111-1.0',
    engineVersion: 'S134-1.0',
    profileVersion: 'MAY004-1.0',
    dataSufficiency: 'sufficient' | 'limited' | 'insufficient',
    topicCount: number,
    sessionCount: number
  }
}
```

## 4. Computation Rules

### 4.1 studyStreak
Count consecutive calendar days (UTC) with at least one session, working backward from today.

### 4.2 strengths
From `getLearnerIntelligence().strengths` — topics with ≥3 attempts, ≥85% accuracy, not declining.

### 4.3 weaknesses
From `getLearnerIntelligence().weaknesses` — topics with ≥5 attempts, <60% accuracy.

### 4.4 readinessScore (composite)
Weighted aggregation of per-section readiness:

```
rawScore =
  Σ (sectionWeight × sectionBandScore)
  ─────────────────────────────────────
         Σ sectionWeight

sectionWeight = topicCount in section (min 1)
sectionBandScore:
  'Ready for focused review'         → 85
  'Approaching review-ready'         → 70
  'Developing'                       → 50
  'Recovery needed'                  → 25
  'Not enough data'                  → 0
```

Composite clamped to 0–100. Confidence from section-level mixed signals.

### 4.5 recommendedActions
Rule-based derivation — see MAY004_ADAPTATION_PLAN.md. Generated on demand, not stored.

## 5. Non-Goals

- No new localStorage keys — all data from existing `MayLearnerState`.
- No real-time persistence — profile is materialized on read.
- No user-facing scoring — readinessScore is coaching-internal, not displayed to learner.
- No ML or statistical modeling — purely rule-based derivation.

## 6. Feature Flag

Gated behind `ENABLE_ADAPTIVE_COACHING` (default: `false`). When disabled, `MayLearnerProfile.build()` returns `null` and all adaptive subsystems use existing rule-based fallbacks.

## 7. Deliverable

`may-learner-profile.js` — single IIFE module exposing `MayLearnerProfile.build()`.
