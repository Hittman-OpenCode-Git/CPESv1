# MAY-016 Observability Plan

**Session:** MAY-016
**Status:** Active
**Governance Lane:** Light (UI/coaching layer — no pack/case/content/scoring impact)

---

## 1. Objective

Standardize telemetry and observability across the May coaching layer, consolidating instrumentation from MAY-008, MAY-011, MAY-013, and MAY-014 into a single `MayTelemetry` module. Provide developer-facing diagnostics without production activation.

---

## 2. Telemetry Dimensions (Standardized)

### 2.1 Decision Engine Telemetry (from MAY-008)

| Field | Source | Type | Description |
|-------|--------|------|-------------|
| `decisionId` | `MayDecisionEngine` | string | Decision ID (D1–D12) |
| `decisionTimestamp` | `MayDecisionEngine` | ISO 8601 | When decision was computed |
| `learnerId` | `MayLearnerProfile` | string | Learner identifier |
| `readinessBand` | `MayReadinessEngine` | string | Recovery needed / Developing / Ready |
| `readinessScore` | `MayReadinessEngine` | number | 0–100 score |
| `triggerTopics` | `MayLearnerProfile` | string[] | Topics that triggered the decision |
| `rationale` | `MayDecisionEngine` | string | Human-readable rationale |

### 2.2 Mode Frequency Telemetry (from MAY-011)

| Field | Source | Type | Description |
|-------|--------|------|-------------|
| `modeName` | `MayCoachingRouter` | string | explain / quiz / socratic / study-plan |
| `invocationCount` | counter | number | Times this mode was invoked |
| `lastInvoked` | counter | ISO 8601 | Last invocation timestamp |
| `avgResponseMs` | timer | number | Average response time |

### 2.3 Readiness Distribution Telemetry (from MAY-013)

| Field | Source | Type | Description |
|-------|--------|------|-------------|
| `perSectionBand` | `MayReadinessEngine` | object | Band per section A–F |
| `overallBand` | `MayReadinessEngine` | string | Overall readiness band |
| `topicsAtReady` | counter | number | Count of ready topics |
| `topicsAtRecovery` | counter | number | Count of recovery topics |
| `confidenceLevel` | `MayReadinessEngine` | string | high / moderate / low |

### 2.4 Recommendation Distribution Telemetry (from MAY-014)

| Field | Source | Type | Description |
|-------|--------|------|-------------|
| `recommendationType` | `MayAdaptiveRecommender` | string | remediation / consolidation / challenge |
| `recommendationPriority` | `MayAdaptiveRecommender` | string | high / medium / low |
| `recommendationTopic` | `MayAdaptiveRecommender` | string | Target topic |
| `hasEvidence` | boolean | boolean | Evidence object present |

### 2.5 Intervention Distribution Telemetry (from MAY-013/MAY-014)

| Field | Source | Type | Description |
|-------|--------|------|-------------|
| `interventionTier` | `MayInterventionPrioritizer` | number | 1=Critical, 2=Emerging, 3=Watch |
| `interventionPriorityScore` | `MayInterventionPrioritizer` | number | Composite urgency score |
| `interventionTopic` | `MayInterventionPrioritizer` | string | Target topic |
| `interventionAction` | `MayInterventionPrioritizer` | string | Recommended action text |

---

## 3. Telemetry Infrastructure

### 3.1 MayTelemetry Module (New — Implementer Phase)

```javascript
// may-telemetry.js — Standardized telemetry for May coaching layer
// All telemetry is console-only in development. No external network calls.
// LLM telemetry gated behind ENABLE_LLM flag (always false in MAY-016).

const MayTelemetry = (function() {
  'use strict';
  
  var _buffer = [];
  var _counters = {};
  var _timers = {};
  
  function _now() { return new Date().toISOString(); }
  
  function trackDecision(data) {
    var entry = { type: 'decision', timestamp: _now(), data: data };
    _buffer.push(entry);
    if (_buffer.length > 500) _buffer.shift();
    if (typeof May !== 'undefined' && May.config && May.config.debug) {
      console.debug('[MayTelemetry] Decision:', data.decisionId, data);
    }
    return entry;
  }
  
  function trackMode(modeName, durationMs) {
    _counters[modeName] = (_counters[modeName] || 0) + 1;
    var entry = {
      type: 'mode',
      timestamp: _now(),
      modeName: modeName,
      durationMs: durationMs,
      totalInvocations: _counters[modeName]
    };
    _buffer.push(entry);
    if (_buffer.length > 500) _buffer.shift();
    return entry;
  }
  
  function trackReadiness(data) {
    var entry = { type: 'readiness', timestamp: _now(), data: data };
    _buffer.push(entry);
    if (_buffer.length > 500) _buffer.shift();
    return entry;
  }
  
  function trackRecommendation(data) {
    var entry = { type: 'recommendation', timestamp: _now(), data: data };
    _buffer.push(entry);
    if (_buffer.length > 500) _buffer.shift();
    return entry;
  }
  
  function trackIntervention(data) {
    var entry = { type: 'intervention', timestamp: _now(), data: data };
    _buffer.push(entry);
    if (_buffer.length > 500) _buffer.shift();
    return entry;
  }
  
  function startTimer(label) {
    _timers[label] = performance.now();
  }
  
  function endTimer(label) {
    if (!_timers[label]) return 0;
    var elapsed = performance.now() - _timers[label];
    delete _timers[label];
    return Math.round(elapsed);
  }
  
  function snapshot() {
    return {
      totalEvents: _buffer.length,
      byType: _buffer.reduce(function(acc, e) {
        acc[e.type] = (acc[e.type] || 0) + 1;
        return acc;
      }, {}),
      modeCounts: Object.assign({}, _counters),
      timestamp: _now()
    };
  }
  
  function drain() {
    var copy = _buffer.slice();
    _buffer = [];
    return copy;
  }
  
  return {
    trackDecision: trackDecision,
    trackMode: trackMode,
    trackReadiness: trackReadiness,
    trackRecommendation: trackRecommendation,
    trackIntervention: trackIntervention,
    startTimer: startTimer,
    endTimer: endTimer,
    snapshot: snapshot,
    drain: drain
  };
})();

if (typeof window !== 'undefined') {
  window.MayTelemetry = MayTelemetry;
}
```

### 3.2 Integration Points

| Module | Integration | Method |
|--------|------------|--------|
| `may-decision-engine.js` | After each decision | `MayTelemetry.trackDecision({...})` |
| `may-coaching-router.js` | After each mode invocation | `MayTelemetry.trackMode(name, elapsed)` |
| `may-readiness-engine.js` | After each readiness computation | `MayTelemetry.trackReadiness({...})` |
| `may-adaptive-recommender.js` | After each recommendation | `MayTelemetry.trackRecommendation({...})` |
| `may-intervention-prioritizer.js` | After each prioritization | `MayTelemetry.trackIntervention({...})` |

---

## 4. Developer Diagnostics Surface

### 4.1 Console Commands

```javascript
// Feature flag status
MayFeatureFlags.snapshot()

// Full telemetry snapshot
MayTelemetry.snapshot()

// Drain buffer (after inspection)
MayTelemetry.drain()

// Readiness score for current learner
MayReadinessEngine.computeReadiness()

// Decision engine trace
MayDecisionEngine.getLastDecision()

// Intervention queue
MayInterventionPrioritizer.getQueue()
```

### 4.2 Feature Flag Dashboard (New Script)

See `scripts/may_feature_flag_dashboard.js` — lightweight Node.js script that:
1. Parses `may-feature-flags.js` for current flag definitions
2. Reports all 15 flags with defaults, dependencies, activation paths
3. Exits 0 (pass) or 1 (flags not all default false)

### 4.3 Rollout Checklist Validator (New Script)

See `scripts/may_rollout_checklist.js` — validation script that:
1. Confirms all 15 flags default false
2. Confirms `index_updated.html` loads all 28 May scripts
3. Confirms no May script modifies packs/cases/content
4. Confirms smoke test passes
5. Exits 0 or 1

---

## 5. Observability During Pilot (CMA_MAY_PILOT=1)

When `CMA_MAY_PILOT=1` is set:

| Observable | How |
|-----------|-----|
| May.isActive() | `typeof May !== 'undefined' && May.config.flags.ENABLE_CONTEXT_BUILDER` |
| Companion card rendered | `#mayCompanionCard` exists in DOM |
| Coaching tab active | `#mayCoachView` clickable |
| Mini-panel in MCQ | `#mayRealtimePanel` renders per question |
| Post-answer feedback | `May.showPostAnswerFeedback()` called |
| Review bridge | "Discuss with May" button in review cards |
| Zero errors | Browser console clean |

---

## 6. Telemetry File Organization

| File | Purpose |
|------|---------|
| `may-telemetry.js` | Standardized telemetry module (NEW — Implementer Phase) |
| `scripts/may_feature_flag_dashboard.js` | Developer diagnostics for feature flags (NEW) |
| `scripts/may_rollout_checklist.js` | Rollout validation script (NEW) |
| `reports/MAY016_TELEMETRY.json` | Telemetry snapshot from verification (NEW) |

---

## 7. Non-Telemetry (Excluded)

- No network requests (no analytics services, no logging APIs)
- No PII collection (learner IDs are synthetic in dev)
- No persistent storage (telemetry cleared on page reload unless localStorage explicitly used)
- No LLM telemetry (LLM flags off)

---

*Generated: 2026-07-30 — MAY-016 Observability Planner*
