# MAY-018 Telemetry Review Plan

**Session:** MAY-018 — Pilot Telemetry Review & Calibration
**Date:** 2026-07-31
**Governance Lane:** Light (read-only analysis — no pack/case/content impact)
**Phase:** Planner — Telemetry Review

---

## 1. Objective

Analyze all telemetry generated during the controlled pilot (MAY-017 activation) to validate coaching effectiveness, identify calibration opportunities, and determine readiness for broader activation.

**No new feature activation. No LLM activation. No content modifications.**

---

## 2. Telemetry Sources

### 2.1 In-Memory Telemetry (`may-telemetry.js` + `may-coaching-orchestrator.js`)

| Instrument | Wired? | Location | Data Tracked |
|-----------|--------|----------|-------------|
| `trackDecision` | **Yes** | orchestrator.js:281-288 | decisionId, action, coachingMode, priority, topic |
| `trackReadiness` | **Yes** | orchestrator.js:289-295 | overallBand, overallScore, topicsWithData |
| `trackRecommendation` | **Yes** | orchestrator.js:296-303 | count, topType, topTopic, topPriority |
| `trackIntervention` | **No (GAP)** | Never called | tier, topic, priorityScore |
| `trackMode` | **No (GAP)** | Never called | modeName, durationMs |

**Critical gap:** Intervention and mode telemetry functions exist in `may-telemetry.js` but are never wired into the orchestrator. The orchestrator only tracks decisions, readiness, and recommendations.

### 2.2 localStorage Persistence

| Key | Writer | Content |
|-----|--------|---------|
| `cmaMayLearnerState` | `may-learner-state.js` | Full learner state, sessions, topic performance |
| `cmaMayPilotUsageLog` | `may-core.js:6100` | Pilot usage event log |
| `cmaMaySafetyLog` | `may-core.js:6108` | Safety/gating event log |
| `cmaMayGateLog` | `may-core.js:6116` | Gate decision log |
| `cmaMaySessionTelemetry` | `may-core.js:6124` | Per-session telemetry events |

### 2.3 Synthetic Test Telemetry (Historical Calibration Data)

| File | Profiles | Decisions Tested | Date |
|------|----------|-----------------|------|
| `reports/MAY012_TELEMETRY.json` | 5 original + variable synthetic | D1-D10 | 2026-07-30 |
| `reports/MAY014_TELEMETRY.json` | 10 synthetic | D1-D10 | 2026-07-30 |
| `reports/MAY016_TELEMETRY.json` | Preflight/smoke/rollout | Infrastructure | 2026-07-30 |

**Note:** All "pilot" telemetry as of 2026-07-31 is synthetic — no real user data exists. The controlled pilot (MAY-017) was activated today. Analysis focuses on synthetic profile behavior + infrastructure audit.

### 2.4 Pilot Diagnostics

`window.__mayPilot` object (from `may-pilot-activation.js`):
- `.healthReport()` — full status
- `.telemetry()` — `MayTelemetry.snapshot()`
- `.flags()` — `MayFeatureFlags.getAll()`
- `.orchestratorReady()` — readiness check
- `.state()` — pilot/tutor/session status

---

## 3. Analysis Dimensions

### 3.1 Decision Distribution
- Which D1-D10 decisions trigger and at what frequency
- Decision priority distribution (critical/high/medium/low)
- Unexpected dominance (e.g., D5 capturing D7-suitable profiles)
- Dead paths (D10 unreachable due to D8 shadowing)
- Recently calibrated decisions (D3, D7, D9) — verify calibration effectiveness

### 3.2 Mode Distribution
- Frequency of each coaching mode (EXPLAIN, QUIZ, SOCRATIC, STUDY_PLAN, MOTIVATE, EXAM_REVIEW)
- Mode-to-decision correlation
- Modes never triggered by decision engine (MOTIVATE, EXAM_REVIEW — event/context-driven only)
- Mode diversity across profiles

### 3.3 Readiness Distribution
- Score range and band distribution
- Confidence levels
- Topics-at-ready vs. topics-at-recovery ratios
- Section coverage patterns

### 3.4 Intervention Effectiveness
- Tier distribution (1-5)
- Intervention frequency vs. recommendation frequency
- Topic coverage in interventions
- Intervention-to-decision alignment

### 3.5 Recommendation Quality
- Recommendation type distribution (remediation, review, reinforcement, challenge, practice_mix)
- Closed-loop outcome tracking (positive/contradictory adjustments)
- R1-R10 rule triggering frequency
- Deduplication effectiveness

---

## 4. Telemetry Quality Audit

| Dimension | Check |
|-----------|-------|
| Completeness | Are all 5 telemetry types receiving data? Are there gaps? |
| Consistency | Do decision IDs match expected mode mappings? |
| Schema compliance | Does telemetry output match the declared schema? |
| Determinism | Do same-input profiles produce identical telemetry? |
| Buffer safety | Is the 500-event cap adequate? Is overflow logged? |

---

## 5. Output Artifacts

| Artifact | Purpose |
|----------|---------|
| `MAY018_DECISION_DISTRIBUTION.md` | D1-D10 frequency, priority, mode mapping |
| `MAY018_MODE_DISTRIBUTION.md` | Mode usage, trigger paths, dead modes |
| `MAY018_READINESS_DISTRIBUTION.md` | Score bands, confidence, topics coverage |

---

## 6. Success Criteria

| Criterion | Target |
|-----------|--------|
| All telemetry types assessed | 5/5 types reviewed |
| Decision coverage analyzed | D1-D10 all assessed |
| Mode distribution understood | All 6 modes mapped |
| Telemetry gaps identified | All gaps documented |
| No pack/case modifications | 0 writes |
