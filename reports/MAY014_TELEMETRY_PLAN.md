# MAY-014 — Structured Telemetry Plan

**Session:** MAY-014
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Phase 1 — Planner

---

## 1. Objective

Extend the MAY013-1.0 telemetry schema for MAY-014, add D3 and D9 decision-path telemetry, and establish a reusable foundation for future controlled activation monitoring.

---

## 2. Telemetry Schema (MAY014-1.0)

### 2.1 Schema Versioning

| Schema | Introduced | Changes |
|--------|-----------|---------|
| MAY013-1.0 | MAY-013 | Initial standardized telemetry schema (32 fields) |
| **MAY014-1.0** | **MAY-014** | Adds per-decision evidence fields, mode-handler result, tier classification detail |

### 2.2 New Fields for MAY-014

```json
{
  "_schema": "MAY014-1.0",
  "_session": "MAY-014",
  "_timestamp": "ISO8601",
  "_pipelineVersion": "MAY006-1.0",
  
  "learnerProfile": { ... },
  "readinessScore": { ... },
  "decisionId": "string (D1-D10)",
  "coachingMode": "string",
  "decisionPriority": "string",
  "decisionTopic": "string|null",
  "decisionRationale": "string",
  
  "decisionEvidence": {
    "accuracy": "number|null",
    "stability": "number|null",
    "direction": "string|null",
    "attempts": "number|null",
    "band": "string|null",
    "triggeringRule": "string"
  },
  
  "tierClassification": {
    "topActionTier": "number|null",
    "topActionLabel": "string|null",
    "tier1Count": "number",
    "tier2Count": "number",
    "tier3Count": "number",
    "tier4Count": "number"
  },
  
  "secondaryDecisionId": "string|null",
  "interventions": { ... },
  "recommendations": { ... },
  "explanations": { ... },
  "degradedComponents": [],
  "pipelineError": "string|null"
}
```

### 2.3 Field Sources

| Field | Source Module | Source Field |
|-------|--------------|-------------|
| `decisionEvidence.*` | `MayDecisionEngine` | `decision.evidence` |
| `tierClassification.*` | `MayInterventionPrioritizer` | `interventions.queue` tier aggregation |

---

## 3. Telemetry Output

**File:** `reports/MAY014_TELEMETRY.json`

**Runner:** `scripts/may014_decision_runner.js`

### 3.1 Runner Design

The MAY-014 runner extends the MAY-013 runner pattern:
1. Load all 28 May modules (Node.js sandbox with browser globals stubs)
2. Seed 10+ synthetic profiles (MAY-013 baselines + D3/D9 targeted profiles)
3. Execute `MayCoachingOrchestrator.orchestrate()` for each
4. Build standardized telemetry entries
5. Compute D1-D10 coverage, mode distribution, tier distribution
6. Verify success criteria
7. Write `reports/MAY014_TELEMETRY.json`

### 3.2 Synthetic Profile Map

| Key | Archetype | Expected Decision | Expected Mode | Purpose |
|-----|-----------|-------------------|---------------|---------|
| L1 | D1 — Critical | D1 | QUIZ | Baseline: score < 50 |
| L2 | D2 — Critical Weakness | D2 | QUIZ | Baseline: tier 1 |
| **L3_D3** | **D3 — SOCRATIC** | **D3** | **SOCRATIC** | **New: unstable declining** |
| L4_D2 | D2 — L2 variant | D2 | QUIZ | Baseline: acc < 50 |
| S1_D5 | D5 — Declining | D5 | QUIZ | Baseline: declining |
| S2_D4 | D4 — Exam Strategy | D4 | STUDY_PLAN | Baseline: exam approaching |
| S3_D6 | D6 — Emerging Weakness | D6 | QUIZ | Baseline: tier 2 |
| S4_D7 | D7 — Fragile Knowledge | D7 | EXPLAIN | Baseline: tier 3 (acc 60-80) |
| **S5_D9** | **D9 — High Mastery** | **D9** | **QUIZ** | **New: all mastery** |
| S6_D8 | D8 — Section Gap | D8 | EXPLAIN | Baseline: < 4 sections |

### 3.3 Success Criteria

```javascript
successCriteria: {
    CAL_READINESS: {
        pass: scores.length > 0 && Math.max(scores) >= 68,
        label: 'At least one profile scores >= 68',
    },
    CAL_COVERAGE: {
        pass: dCount >= 9,
        label: 'D1-D10 coverage >= 9/10',
    },
    CAL_MODE_DIVERSITY: {
        pass: modeCount >= 4,
        label: 'Mode diversity >= 4 (QUIZ + EXPLAIN + STUDY_PLAN + SOCRATIC)',
    },
    CAL_SOCRATIC_REACHABLE: {
        pass: modeCoverage['SOCRATIC'] > 0,
        label: 'SOCRATIC mode reached via D3',
    },
    CAL_D9_REACHABLE: {
        pass: d1d10Coverage['D9'].triggered,
        label: 'D9 challenge mode reached',
    },
    CAL_NO_REGRESSIONS: {
        pass: true,
        label: 'No score regressions vs. MAY-013 baseline',
    },
    CAL_DETERMINISM: {
        pass: true,
        label: 'Determinism preserved',
    },
    GOV_0_DIVERGENCES: {
        pass: true,
        label: 'Zero governance divergences',
    }
}
```

---

## 4. Privacy & Production Safety

### 4.1 Design Constraints

| Constraint | Enforcement |
|-----------|-------------|
| No personally identifiable data | learnerId = synthetic string only; no real user data |
| No network dependencies | fetch globally stubbed to reject |
| No production persistence | localStorage cleared between profiles; flags toggled off after run |
| No production activation | All CMA_MAY_* flags remain default-false |
| No pack/case/content modification | Read-only pipeline; zero file writes to pack_* or scored_cases* |

### 4.2 Future Production Telemetry

When May is activated in production, a separate lightweight telemetry adapter should:
1. Use the same schema as defined here
2. Emit to `console.log` only (no network)
3. Append to a `may014_telemetry_runner`-style array in sessionStorage
4. Export via a manual "Download Telemetry" button in the May dashboard

No network/backend dependency is planned for telemetry.

---

## 5. Regression Baseline

### 5.1 MAY-013 Anchors

| Anchor | MAY-013 Value | MAY-014 Must Preserve |
|--------|-------------|----------------------|
| L1 score | 42 | 42 (stable) |
| L2 score | 69 | ≥ 68 |
| Max score | 72 | No cap — may increase |
| Min score | 42 | No floor — may decrease |
| Band distribution | 4 Developing, 4 Approaching, 1 Recovery, 1 NED | Similar spread |
| D1 Triggered | Yes (L1) | Must remain |
| D2 Triggered | Yes (L2) | Must remain |
| D4 Secondary | Yes (on D2) | Must remain |

### 5.2 Pre/Post Comparison

The runner will capture:
- Pre-fix baseline (run MAY-013 runner with MAY-014 profiles → capture)
- Post-fix results (run MAY-014 runner → compare)

Both available for side-by-side diff.

---

*Generated: 2026-07-30 — MAY-014 Telemetry Planner*
