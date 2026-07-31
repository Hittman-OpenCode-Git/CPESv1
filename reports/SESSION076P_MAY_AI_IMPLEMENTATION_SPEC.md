# Session 76P — May AI Implementation Specification

## Overview

This document defines a staged implementation plan for evolving May from a deterministic rules-based coach to a context-aware AI study coach. Each stage is independently testable and can be shipped incrementally.

## Stage 1 — Local Rule-Based Contextual Coaching

**Status:** Foundation enhancement of current S75 architecture
**Risk:** Low (extends existing patterns, no new dependencies)
**Network Required:** No

### 1.1 Context Builder Module

Create `may-context-builder.js` — a utility that assembles a structured context object from available data sources.

**API:**
```javascript
MayContext.buildQuestionContext(questionId) → QuestionContext
MayContext.buildLearnerContext() → LearnerContext
MayContext.buildFullContext() → MayContext { question, learner, session }
```

**QuestionContext schema:**
```json
{
  "questionId": "P1-B-040",
  "part": 1,
  "section": "B",
  "domain": "Planning, Budgeting, and Forecasting",
  "topic": "Budget variance investigation criteria",
  "difficulty": "Difficult",
  "difficultyScore": 4,
  "cognitiveLevel": "Evaluate",
  "stem": "...",
  "choices": {"A": "...", "B": "...", "C": "...", "D": "..."},
  "correctChoice": "C",
  "explanationCorrect": "...",
  "explanationWrong": {"A": "...", "B": "...", "C": "", "D": "..."},
  "questionState": "Certified",
  "isDefective": false,
  "formulaReference": null,
  "losTag": "B.2.b"
}
```

**LearnerContext schema:**
```json
{
  "learnerId": "student_1",
  "totalSessions": 12,
  "totalAttempts": 487,
  "overallAccuracy": 0.68,
  "topicPerformance": {
    "Cash budgeting": {"attempts": 23, "accuracy": 0.74, "trend": "improving"},
    "Flexible budgets": {"attempts": 18, "accuracy": 0.56, "trend": "declining"}
  },
  "weaknessClusters": ["Flexible budgets", "Overhead allocation"],
  "readinessBands": {
    "B": "Approaching review-ready",
    "C": "Developing"
  },
  "confidenceCalibration": {"overconfidentRate": 0.22, "underconfidentRate": 0.08}
}
```

### 1.2 Dynamic Defect Manifest Sync

Replace hardcoded `KNOWN_DEFECTIVE_QIDS` (5 items in `_handleChallenge()`) with dynamic loading:

```javascript
// may-core.js — _handleChallenge() enhancement
async _loadDefectManifest() {
  try {
    const resp = await fetch('./scripts/output/DEFECT_MANIFEST_DL008_DL026.json');
    this.defectManifest = await resp.json();
  } catch {
    this.defectManifest = { defectiveQids: [] }; // graceful fallback
  }
}
```

This syncs recovery sets, challenge handling, and recommendation filtering with the live defect manifest.

### 1.3 Recovery Set Safety Filter

Add `question_state === "Certified"` filter to `_recommendSimilar()` and `_generateRecoverySet()`:

```javascript
// Current: finds QIDs by topic only
// Enhanced: finds QIDs by topic AND question_state === "Certified"
recommendations = bank.filter(q =>
  q.topic === targetTopic &&
  q.question_state === "Certified" &&
  !this.defectManifest.defectiveQids.includes(q.QuestionID)
);
```

### 1.4 Enhanced Hint Generation (Distractor-Aware)

Upgrade `_provideHint()` levels 1-3 to use ExplanationWrong fields:

```javascript
// Level 2 (Concept): currently uses generic section template
// Enhanced: extracts key misconception from one distractor's ExplanationWrong
_misconceptionHint(qData, hintLevel) {
  // Find the most "attractive" wrong distractor (longest EWA field)
  const distractors = ['A','B','C','D'].filter(l => l !== qData.CorrectChoice);
  const richest = distractors.sort((a,b) =>
    (qData['ExplanationWrong'+b]||'').length - (qData['ExplanationWrong'+a]||'').length
  )[0];
  // Generate a hint that warns about this misconception WITHOUT revealing answer
  return `Watch out — many candidates confuse this with a related concept. ${this._extractCoreMisconception(qData['ExplanationWrong'+richest])}`;
}
```

### 1.5 Socratic Dialogue Scaffolding

Enhance `_socraticFollowUp()` with deeper question trees:

Current: 2 templates per answer (correct, wrong)
Enhanced: 3-tier follow-up tree per answer
  - Tier 1: Check reasoning ("What led you to choose that?")
  - Tier 2: Probe concept depth ("How does this relate to [related concept]?")
  - Tier 3: Bridge to next topic ("Ready to try a similar question on [next topic]?")

## Stage 2 — Context & Analytics Architecture

**Prerequisite:** Stage 1 complete
**Risk:** Medium (extends MayLearnerState, no UI changes)
**Network Required:** No

### 2.1 Spaced Repetition Engine

Add to `may-learner-state.js`:

```javascript
MayLearnerState.getReviewSchedule(topicId, daysOut = 30) → [
  {qid: "...", reviewDate: "2026-08-03", priority: "due_today"},
  {qid: "...", reviewDate: "2026-08-10", priority: "upcoming"},
  ...
]
```

Algorithm: SM-2 variant (SuperMemo 2) with topic-level aggregation.
- Ease factor adjusted by learner performance
- Intervals: 1 day → 3 days → 7 days → 16 days → 35 days
- Topic-level decay modeling for aggregate readiness scores

### 2.2 Cross-Topic Dependency Map

Define prerequisite relationships:

```json
{
  "Flexible budgets": ["Static budgets", "Cost behavior"],
  "Variance analysis": ["Standard costing", "Flexible budgets"],
  "Cash budget": ["Sales budget", "Cash collections"],
  "NPV analysis": ["Time value of money", "Cash flow estimation"]
}
```

Used to order recommendations: if learner is weak on Variance Analysis but hasn't mastered Flexible Budgets, May recommends Flexible Budgets first.

### 2.3 Difficulty Calibration from Learner Data

Track per-QID difficulty empirically:

```javascript
MayLearnerState.getEmpiricalDifficulty(qid) → {
  labeledDifficulty: "Moderate",
  empiricalDifficulty: "Difficult",
  successRate: 0.34,
  avgTime: 187,
  discriminationIndex: 0.42
}
```

Items where empirical difficulty differs significantly from labeled difficulty (>1 tier) are flagged for metadata review.

### 2.4 Question Quality Metrics

Track per-QID diagnostic power:
- Discrimination index (high performers vs. low performers)
- Distractor attractiveness (selection rate per wrong choice)
- Average solve time
- Hint request rate

## Stage 3 — Optional LLM Adapter

**Prerequisite:** Stage 2 complete
**Risk:** Medium-High (new dependency, requires careful anti-leakage)
**Network Required:** Yes (when enabled)

### 3.1 Feature Flag Architecture

```javascript
// may-core.js — init
this.config = {
  enableLLM: false,              // Master kill switch — off by default
  llmProvider: 'local',          // 'local' | 'openai' | 'anthropic'
  llmEndpoint: null,             // URL for local LLM
  llmModel: 'gpt-4o-mini',       // Model identifier
  llmMaxTokens: 500,
  llmRateLimit: 10,              // Max queries per minute
  llmBlockDuringExam: true,      // Always block during CMA Exam mode
  llmFallbackEnabled: true       // Always fallback to deterministic on failure
};
```

### 3.2 LLM Adapter Interface

```javascript
// may-llm-adapter.js (new file, loaded optionally)
class MayLLMAdapter {
  async query(systemPrompt, userPrompt, context) → {text, tokens, latency}
  async isAvailable() → boolean
  async validateResponse(text, expectedPatterns) → {safe: boolean, flags: []}
}
```

### 3.3 Provider Abstraction

Support three providers through a common interface:
1. **Local (Ollama/LM Studio)** — zero external network, exam-safe
2. **OpenAI API** — requires API key in localStorage (never in code)
3. **Anthropic API** — requires API key in localStorage

### 3.4 Anti-Leakage Extension

Extend S107 `_guardedSpeak()` with LLM-specific checks:

```javascript
// Additional LLM validation patterns
const LLM_LEAK_PATTERNS = [
  /the correct answer is/i,
  /you should (choose|select|pick)/i,
  /option [a-d] is correct/i,
  /the answer key shows/i,
  /\b(CorrectChoice value)\b/  // Never reveal the literal correct answer
];

// All LLM responses must pass both: S107 patterns + LLM_LEAK_PATTERNS
```

### 3.5 Graceful Degradation

```javascript
async _getCoachingResponse(promptType, context) {
  if (this.config.enableLLM && await this.llmAdapter.isAvailable()) {
    try {
      const response = await this.llmAdapter.query(systemPrompt, prompt, context);
      if (this._guardedSpeak(response.text)) {
        return response.text;
      }
      // Fall through to deterministic if validation fails
    } catch (err) {
      this._logLLMError(err);
      // Fall through to deterministic
    }
  }
  // Deterministic fallback (always available)
  return this._getDeterministicResponse(promptType, context);
}
```

## Stage 4 — Adaptive Study Coach

**Prerequisite:** Stage 3 complete
**Risk:** Medium
**Network Required:** Optional (enhanced with LLM, functional without)

### 4.1 Personalized Study Plan Generator

```javascript
May.generateStudyPlan(examDateOrDaysUntilExam) → StudyPlan {
  weeklySchedule: [{week, topics, estimatedHours, practiceCount}],
  priorityOrder: [topic1, topic2, ...],
  milestoneChecks: [{week, expectedReadiness, checkTopics}]
}
```

### 4.2 Exam Readiness Simulator

```javascript
May.runReadinessSimulation() → {
  overallReadinessScore: 0.72,
  domainScores: {A: 0.81, B: 0.67, C: 0.59, D: 0.74, E: 0.88, F: 0.63},
  predictedScoreRange: [340, 385],
  atRiskTopics: ["Variance analysis", "Transfer pricing"],
  recommendedBottleneckFocus: "Performance Management (Section C)"
}
```

### 4.3 Misconception Map

Persistent tracking across sessions:

```javascript
MayLearnerState.getMisconceptionMap() → [
  {
    misconception: "confuses_cash_vs_accrual",
    occurrences: 12,
    topics: ["Cash budget", "Cash flow statement", "Cash collections"],
    severity: "high",
    lastOccurrence: "2026-07-25",
    recommendedDrill: "Cash vs. accrual concept review"
  }
]
```

## Implementation Timeline

| Stage | Sessions | Deliverables | Dependencies |
|-------|----------|-------------|--------------|
| 1 | S78-S80 | may-context-builder.js, dynamic manifest sync, recovery set safety, enhanced hints, Socratic scaffolding | None |
| 2 | S81-S83 | Spaced repetition engine, cross-topic map, difficulty calibration, quality metrics | Stage 1 |
| 3 | S84-S87 | may-llm-adapter.js, provider abstraction, anti-leakage extension, graceful degradation | Stage 2 |
| 4 | S88-S92 | Study plan generator, readiness simulator, misconception map | Stage 3 |

## Rollback Safety

Each stage is independently deployable and revertible:
- Stage 1: New files + targeted function upgrades — revert by restoring may-core.js backup
- Stage 2: Extends may-learner-state.js with new methods — existing APIs unchanged
- Stage 3: Feature-flagged, off by default — disable flag = zero impact
- Stage 4: Consumes Stage 2-3 outputs — degrade gracefully if upstream stages missing

## Success Metrics

| Stage | Metric | Target |
|-------|--------|--------|
| 1 | Hint specificity score (expert review) | ≥ 4/5 |
| 1 | Recovery set certification compliance | 100% Certified-only |
| 2 | Spaced repetition adoption (review sessions using schedule) | ≥ 60% of learners |
| 2 | Empirical-vs-Labeled difficulty correlation | ≥ 0.70 |
| 3 | LLM response pass rate (safety validation) | 100% |
| 3 | LLM uptime in non-exam mode | ≥ 99% |
| 4 | Study plan adherence rate | ≥ 50% |
| 4 | Readiness score correlation with actual exam performance | TBD (requires exam data) |
