# MAY-014 — SOCRATIC Mode Activation Plan

**Session:** MAY-014
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Phase 1 — Planner

---

## 1. Objective

Demonstrate SOCRATIC coaching mode selection via D3 in the decision engine. This is the only coaching mode that has never been reached through the deterministic decision chain.

---

## 2. Current SOCRATIC Implementation

### 2.1 Mode Handler

`may-coaching-modes/mode-socratic.js` implements the SOCRATIC mode handler. It:
- Generates guided questions targeting process-level misunderstanding
- Uses the learner's error pattern to scaffold a question chain
- Designed for learners who understand concepts superficially but make systematic errors

### 2.2 Decision Rule (D3)

```javascript
// may-decision-engine.js:99-138
function _ruleRepeatedUnstable(profile, interventions) {
    // Requires: profile.weakness with stability<50, declining, 5+ attempts
    // Returns: { decisionId: 'D3', action: 'socratic', coachingMode: 'SOCRATIC', priority: 'high' }
}
```

### 2.3 Blocked Path

D3 is unreachable because the intervention prioritizer classifies any topic that meets D3's criteria (low stability + declining + 5+ attempts) as tier 1 (critical remediation), causing D2 to fire before D3 can evaluate.

---

## 3. Activation Strategy

### 3.1 Prerequisite: Tier Classification Fix

The `_classifyTier` function in `may-intervention-prioritizer.js` has a catch-all tier-1 rule at line 161:

```javascript
if (band === 'Recovery needed' && direction === 'declining' && attempts >= 5)
    return TIERS.CRITICAL_REMEDIATION;  // tier 1 — blocks D3
```

This rule was appropriate pre-MAY-013 when the Recovery band was broader (acc < 60). Post-MAY-013, the Recovery band requires acc < 50 OR (acc 50-60 + declining + stability < 50). The first tier-1 rule (`acc < 50`) already catches truly failing topics. The band-based catch-all should be removed.

**Fix:** Delete line 161 from `may-intervention-prioritizer.js`.

### 3.2 Post-Fix Path

With the tier-1 band rule removed:
1. Topic at acc=52%, declining, stability<50, attempts=10 → classified as tier 2 (emerging weakness) because:
   - acc >= 50, < 60 → tier 2 by the acc-range rule (line 163)
   - OR declining + attempts >= 4 + stability < 50 → tier 2 by the declining rule (line 164)
2. D2 does NOT fire (topAction.tier = 2, not 1)
3. D3 evaluates: profile.weaknesses includes the topic, masteryLevels shows stability<50, declining, 5+ attempts → FIRES
4. SOCRATIC mode selected

### 3.3 Synthetic Profile for D3

```javascript
L3_D3: {
    archetype: 'D3 — SOCRATIC Unstable Declining',
    learnerId: 'MAY014-L3',
    sessions: 7,
    topics: [
        // Core topic — unstable, declining, but acc >= 50% (not tier 1)
        { topic: 'Standard Costing', section: 'C', attempts: 10, accuracy: 52, trend: 'declining', difficultyScore: 4 },
        // Companion topics — stable, moderate (keeps readiness score out of D1 range)
        { topic: 'Revenue Recognition', section: 'A', attempts: 8, accuracy: 75, trend: 'stable', difficultyScore: 3 },
        { topic: 'Budgeting Concepts', section: 'B', attempts: 6, accuracy: 74, trend: 'stable', difficultyScore: 3 },
        { topic: 'COSO Framework', section: 'E', attempts: 7, accuracy: 78, trend: 'stable', difficultyScore: 3 },
        { topic: 'Cost Behavior', section: 'D', attempts: 9, accuracy: 80, trend: 'stable', difficultyScore: 3 }
    ]
}
```

### 3.4 Expected Pipeline Output

```
D3 — SOCRATIC Unstable Declining: D=D3 mode=SOCRATIC score=~60 band=Developing ...
```

---

## 4. SOCRATIC Mode Verification

### 4.1 Verification Checks

| Check | Method |
|-------|--------|
| D3 fires before D2/D5 | Verify decisionId = 'D3' in telemetry |
| Coaching mode is SOCRATIC | Verify coachingMode = 'SOCRATIC' |
| Topic is Standard Costing | Verify decisionTopic = 'Standard Costing' |
| Priority is high | Verify decisionPriority = 'high' |
| masteryLevels values correct | Verify stability < 50, direction = declining, attempts >= 5 |
| Profile weaknesses includes topic | Verify topic in profile.weaknesses array |

### 4.2 Telemetry Verification

The `buildTelemetryEntry` function will capture:
- `decisionId`: 'D3'
- `coachingMode`: 'SOCRATIC'
- `decisionTopic`: 'Standard Costing'
- `decisionPriority`: 'high'
- `readinessScore.band`: 'Developing' (4 companion topics + 1 weak)

---

## 5. Mode Handler Smoke Test

After D3 is reachable, verify that `MayCoachingRouter` correctly routes the SOCRATIC mode:

```javascript
// Synthetic test:
May.handleAction('socratic');
// Expected: mode-socratic.js activates, generates Socratic question prompt
```

The SOCRATIC mode handler has full implementation in `may-coaching-modes/mode-socratic.js`. It was tested in MAY-008 through MAY-012 but never reached through the adaptive decision engine path.

---

## 6. Risks

| Risk | Mitigation |
|------|-----------|
| D3 fires on profiles it shouldn't | Tier-1 rule removal only affects `band + declining` catch-all; genuine acc<50 topics remain tier 1 via first rule |
| SOCRATIC mode not fully functional | Mode handler was tested in MAY-008-012; only the decision *activation* path is new |
| D5 replaces D3 if D3 criteria missed | D5 is a QUIZ fallback — still correct behavior; worst case is no SOCRATIC, not wrong mode |

---

*Generated: 2026-07-30 — MAY-014 SOCRATIC Planner*
