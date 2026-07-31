# MAY-020 Escalation Plan

**Session:** MAY-020 — Limited Rollout Operations Framework
**Date:** 2026-07-31
**Governance Lane:** Light (documentation only — no code, no content impact)
**Phase:** Implementer — Escalation Framework
**Status:** Active

---

## 1. Objective

Define the complete escalation framework for the May adaptive coaching rollout. Every anomaly has a defined severity tier, response procedure, responsible role, and timeline. Nothing is left to ad-hoc judgment.

---

## 2. Escalation Tiers

### 2.1 Tier 0 — Informational (Log, No Action)

**Definition:** Anomalies that are worth tracking but do not require action during the limited rollout.

| Condition | Detection | Response |
|-----------|-----------|----------|
| QUIZ mode > 75% (but < 85%) | Telemetry analysis | Log in weekly review; flag for next calibration session |
| Decision distribution drifts from MAY-014 expectations by 10-15% | Telemetry analysis | Document drift direction; no action unless drift widens |
| Single session with low event count (10-20 events) | Telemetry analysis | Note that session was short; compare with session duration |
| Intervention Tier 4 > Tier 3 (Reinforce surpassing Targeted) | Telemetry analysis | Log; may indicate learners are improving (positive drift) |
| Single missing event type (other 4 present) | Telemetry analysis | Check if missing type is legitimate (e.g., no recommendations generated) |

**Response timeline:** Next weekly review.
**Rollback required:** No.

### 2.2 Tier 1 — Elevated Monitoring (Increase Observation, No Rollback)

**Definition:** Anomalies that warrant closer attention but do not yet threaten the rollout.

| Condition | Detection | Response |
|-----------|-----------|----------|
| QUIZ mode > 85% of decisions | Telemetry analysis | Increase monitoring frequency; review mode routing logic; prepare CAL-04 (QUIZ differentiation) for next session |
| Ready band = 0 across 3+ sessions | Telemetry analysis | Verify CAL-03 threshold is reachable with accumulated data; consider synthetic test |
| Intervention Tier 1 10-15% | Telemetry analysis | Review which topics trigger Tier 1; check if Tier 1 recommendations are appropriate |
| SOCRATIC + STUDY_PLAN < 3% | Telemetry analysis | Increase monitoring; verify D3/D4 reachability with varied learner profiles |
| 2 of 5 event types missing | Telemetry analysis | Investigate telemetry wiring; may indicate silent wiring failure |
| Single tester reports coaching irrelevance | Tester report | Log; check if topic was correctly identified; review that tester's profile |

**Response timeline:** Within 1 day.
**Rollback required:** No — investigate first. Rollback only if confirmed wiring defect.

### 2.3 Tier 2 — Investigation Required (Escalate, Possible Conditional Rollback)

**Definition:** Anomalies that require active investigation and may lead to conditional rollback if confirmed.

| Condition | Detection | Response |
|-----------|-----------|----------|
| EXPLAIN mode = 0 across multiple sessions | Telemetry analysis | Verify D7/D8/D10 reachability via `window.__mayPilot` diagnostics; check CAL-01/CAL-02 not regressed; if confirmed dead → conditional rollback |
| Telemetry persistence fails across multiple sessions | Tester report + localStorage inspection | Check localStorage quota; check for JSON.stringify failures; if unfixable → conditional rollback |
| Coaching mode mismatch (e.g., EXPLAIN decision produces QUIZ UI) | Tester report | Immediate investigation; check orchestrator → router handoff; if confirmed → conditional rollback |
| Readiness scoring produces NaN or negative values | Tester report + telemetry | Investigate readiness engine math; check for division by zero or missing data; if confirmed → conditional rollback |
| 3+ of 5 event types missing | Telemetry analysis | Major telemetry wiring failure; investigate may-pilot-activation.js; if unfixable → conditional rollback |
| Two or more testers report the same wrong-coaching issue | Tester reports | Pattern suggests systematic defect; investigate coaching router; if confirmed → conditional rollback |

**Response timeline:** Within 4 hours.
**Rollback required:** Conditional — confirmed Tier 2 triggers warrant rollback. Unconfirmed triggers: investigate first, then decide.

### 2.4 Tier 3 — Immediate Rollback (No Investigation Needed)

**Definition:** Critical failures that require immediate rollback. The rollout stops instantly — investigation happens after rollback.

| Condition | Detection | Response |
|-----------|-----------|----------|
| Preflight divergence > 0 | `npm run preflight` | **Immediate rollback.** Do not proceed. Investigate cause after rollback. |
| Smoke test failure | `npm run smoke` | **Immediate rollback.** Do not proceed. |
| Governance guard test failure | Preflight embedded | **Immediate rollback.** Guard protects content integrity. |
| app.js crash traceable to May layer | Browser console | **Immediate rollback.** Reproduce with May disabled to confirm attribution. |
| Answer-key exposure via May layer | Manual QA / validator | **Immediate rollback.** This is the highest-severity learner-safety incident. Full investigation required. |
| Learner state corruption (session data lost or garbled) | Tester report | **Immediate rollback.** Roll back, then restore session from backup if possible. |
| May pipeline causes infinite loop or browser freeze | Tester report | **Immediate rollback.** Identify the loop before re-enabling. |

**Response timeline:** Within 5 minutes of detection.
**Rollback required:** Yes — immediate and unconditional.

---

## 3. Rollback Procedures

### 3.1 Script-Level Rollback (Permanent)

The canonical rollback procedure, unchanged from MAY-017:

1. Open `index_updated.html`
2. Comment out the May pilot activation script tag:
   ```html
   <!-- <script src="may-pilot-activation.js"></script> -->
   ```
3. Save the file
4. Refresh the browser

**Effect:** All 6 adaptive flags revert to `false`. May companion card hides. Coaching panel reverts to pre-pilot behavior. Zero learner data loss — session state preserved in separate localStorage keys.

**Verification after rollback:**
- [ ] `May.config.tutoringPilotEnabled === false` (or undefined)
- [ ] `MayFeatureFlags.getAll()` shows all adaptive flags = false
- [ ] `MayCoachingOrchestrator.orchestrate()` returns null (or orchestrator not loaded)
- [ ] May companion card no longer visible
- [ ] `npm run preflight` → 0 divergences
- [ ] `npm run smoke` → 17/17 PASS

### 3.2 Console Rollback (Temporary, Single Session)

For temporary disabling during a session (does not persist across reloads):

```javascript
May.config.tutoringPilotEnabled = false;
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_ORCHESTRATION', false);
MayFeatureFlags.setFlag('ENABLE_READINESS_SCORING', false);
MayFeatureFlags.setFlag('ENABLE_ADAPTIVE_COACHING', false);
MayFeatureFlags.setFlag('ENABLE_CONTEXT_BUILDER', false);
MayFeatureFlags.setFlag('ENABLE_COACHING_ROUTER', false);
```

### 3.3 Partial Rollback (Disable Specific Subsystem)

If only one May subsystem is misbehaving while others work:

| Subsystem | Flag to Disable | Effect |
|-----------|----------------|--------|
| Adaptive orchestration | `ENABLE_ADAPTIVE_ORCHESTRATION = false` | Orchestrator stops; coaching panel reverts to static content |
| Readiness scoring | `ENABLE_READINESS_SCORING = false` | Readiness engine stops; orchestrator falls back to decision-only without interventions |
| Adaptive coaching | `ENABLE_ADAPTIVE_COACHING = false` | Learner profile + recommender stops; coaching uses default mode |
| Context builder | `ENABLE_CONTEXT_BUILDER = false` | Topic context stops being built; coaching recommendations lose topic-awareness |
| Coaching router | `ENABLE_COACHING_ROUTER = false` | Mode routing stops; May companion card may still show readiness insights |

Partial rollback allows continued rollout with degraded functionality while the affected subsystem is investigated.

---

## 4. Escalation Communication

### 4.1 Notification Chain

```
Tester (detects issue)
  → Developer (investigates)
    → Tester cohort (notified of status)
    → Project lead (if Tier 2+)
```

### 4.2 Tier 0/1 Communication

- **Channel:** Development chat / issue tracker
- **Content:** "MAY-020 observed anomaly: [condition]. Severity: Tier [0/1]. Action: [log/monitor]. No rollback required."
- **Urgency:** Non-urgent — addressed in next weekly review

### 4.3 Tier 2 Communication

- **Channel:** Direct message to developer + project lead
- **Content:** "MAY-020 escalation: [condition]. Severity: Tier 2 — investigation required. Affected: [testers/sessions]. Investigating: [hypothesis]. Will report within 4 hours."
- **Urgency:** Same-day resolution expected

### 4.4 Tier 3 Communication

- **Channel:** Immediate direct message to developer + project lead
- **Content:** "MAY-020 CRITICAL: [condition]. Rollback executed at [timestamp]. Reason: [brief]. Investigation to follow. Rollout paused until resolved."
- **Urgency:** Immediate — rollback first, investigate second

---

## 5. Post-Rollback Investigation

After any Tier 3 rollback, the following must occur before re-enabling May:

1. **Root cause analysis** — Identify exactly what failed and why
2. **Reproducibility** — Reproduce the failure in a controlled environment with May re-enabled
3. **Fix** — Apply the fix and verify it resolves the failure
4. **Regression test** — Run preflight + smoke + governance guard to confirm 0 divergences
5. **Post-mortem** — Document: what failed, root cause, fix, prevention, and how monitoring will catch it next time
6. **Re-enablement authorization** — Project lead authorizes restart of rollout

Post-mortem location: `reports/MAY020_POSTMORTEM_{date}.md`

---

## 6. Escalation Decision Tree

```
Anomaly detected
  │
  ├─ Preflight divergence > 0? ────→ TIER 3 — ROLLBACK IMMEDIATELY
  ├─ Smoke failure? ──────────────→ TIER 3 — ROLLBACK IMMEDIATELY
  ├─ Governance guard failure? ────→ TIER 3 — ROLLBACK IMMEDIATELY
  ├─ app.js crash from May? ──────→ TIER 3 — ROLLBACK IMMEDIATELY
  ├─ Answer-key exposure? ────────→ TIER 3 — ROLLBACK IMMEDIATELY
  ├─ Learner state corrupted? ─────→ TIER 3 — ROLLBACK IMMEDIATELY
  │
  ├─ EXPLAIN mode = 0 for 3+ sessions? ──→ TIER 2 — Investigate (conditional rollback)
  ├─ Telemetry persistence fails repeatedly? ──→ TIER 2 — Investigate (conditional rollback)
  ├─ Coaching mode mismatch confirmed? ──→ TIER 2 — Investigate (conditional rollback)
  ├─ Multiple testers report same issue? ──→ TIER 2 — Investigate (conditional rollback)
  │
  ├─ QUIZ mode > 85%? ────────────→ TIER 1 — Monitor closely
  ├─ Ready band = 0 for 3+ sessions? ──→ TIER 1 — Monitor closely
  ├─ 2 event types missing? ───────→ TIER 1 — Monitor closely
  │
  └─ Everything else ─────────────→ TIER 0 — Log, no action
```

---

## 7. Success Criteria for This Escalation Plan

| Criterion | Status |
|-----------|--------|
| All anomaly conditions classified (0 through 3) | Complete |
| Rollback procedures documented (full + console + partial) | Complete |
| Every trigger has a defined response, timeline, and owner | Complete |
| Communication plan defined for each tier | Complete |
| Post-rollback investigation process defined | Complete |
| Decision tree operationalizes the escalation logic | Complete |
| No pack/case/content modifications | Confirmed |

---

## 8. Non-Actions (Correctly Excluded)

- No content modifications
- No pack/case/answer-key edits
- No question_state changes
- No REVISION_HISTORY.md entry (Light Lane — documentation only)
- No CURRENT_BASELINES.md update (no runtime-critical file changes)

---

*MAY-020 — Escalation Plan — 2026-07-31*
