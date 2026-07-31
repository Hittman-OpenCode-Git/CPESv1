# MAY-020 Monitoring Plan

**Session:** MAY-020 — Limited Rollout Operations Framework
**Date:** 2026-07-31
**Governance Lane:** Light (documentation only — no code, no content impact)
**Phase:** Implementer — Monitoring Pack
**Status:** Active

---

## 1. Objective

Define the complete monitoring framework for the Phase 2 limited real-user rollout of May's adaptive coaching pipeline. This plan covers what to monitor, when to monitor it, how to interpret the data, and what to do when metrics deviate from expectations.

All monitoring is read-only. No pack files, case files, answer keys, or question states are modified.

---

## 2. Monitoring Layers

### 2.1 Layer 1 — Structural Integrity (Every Session, Mandatory)

These checks confirm that the repository and application are healthy before any May-specific monitoring begins.

| Check | Command/Method | Frequency | Threshold | Owner |
|-------|---------------|-----------|-----------|-------|
| Preflight divergence | `npm run preflight` | Every session start | = 0 | Developer |
| Governance guard | `npm run preflight` (embedded) | Every session start | 54/54 PASS | Developer |
| Smoke test | `npm run smoke` | After any UI/HTML/CSS/May change | 17/17 PASS | Developer |
| Pack parse integrity | Preflight (embedded) | Every session start | All 5 packs parse OK | Developer |
| May scripts parse | `node -c may-core.js` etc. | After any May file change | No syntax errors | Developer |

**Escalation:** Any failure is an immediate rollback trigger per MAY-019 §4.1. No further monitoring is meaningful if structural integrity is broken.

### 2.2 Layer 2 — Pipeline Readiness (Each Rollout Session)

These checks confirm that the adaptive coaching pipeline is ready to operate for real users.

| Check | Method | Frequency | Threshold | Owner |
|-------|--------|-----------|-----------|-------|
| Orchestrator dependencies | `window.__mayPilot.orchestratorReady()` | Each rollout session | All 8 deps present | Tester |
| Feature flags correct | `MayFeatureFlags.getAll()` | Each rollout session | 6 adaptive=true, 5 LLM=false, 1 memory=false | Tester |
| Telemetry buffer active | `window.__mayPilot.telemetry()` | Each rollout session | `totalEvents` ≥ 0 (at session start, 0 is normal) | Tester |
| May companion card visible | Visual inspection | Each rollout session | Card renders without errors | Tester |
| Coaching panel loads | Visual inspection | Each rollout session | Panel renders mode-specific content | Tester |

**Escalation:** Orchestrator dependencies < 8 → do not begin rollout session. Feature flags incorrect → restore `may-pilot-activation.js` defaults. Companion card or coaching panel broken → investigate app.js console errors; possible rollback.

### 2.3 Layer 3 — Operational Telemetry (During and After Rollout)

These checks analyze telemetry data collected during and after rollout sessions.

| Metric | Source | Frequency | Expected Range | Alert Threshold |
|--------|--------|-----------|----------------|-----------------|
| Total events per session | `cmaMayPilotTelemetry` → `totalEvents` | Post-session | 20-200 | < 10 (pipeline barely firing) |
| Event types present (of 5) | `cmaMayPilotTelemetry` → `byType` keys | Post-session | 5/5 | < 4 (telemetry wiring broken) |
| Decision diversity (D1-D10) | `byType.decision` → unique `decisionId` count | Post-session | 5-10 | < 4 (too narrow) |
| EXPLAIN mode presence | `byType.mode` → filter `modeName === "EXPLAIN"` | Post-session | > 0 | = 0 (D7/D8/D10 regression) |
| QUIZ mode share | `byType.mode` → QUIZ ÷ total | Post-session | 50-75% | > 85% (over-reliance on QUIZ) |
| Ready band reachable | `byType.readiness` → filter `overallBand === "Ready"` | Post-session | > 0 | = 0 across 3+ sessions |
| Intervention Tier 1 | `byType.intervention` → filter `tier === 1` | Post-session | < 10% | > 15% |
| Orchestrator call count | `byType.decision.length` | Post-session | ≥ 5 | < 3 (pipeline not engaging) |
| Recommendation count | `byType.recommendation.length` | Post-session | ≥ 1 | = 0 |

### 2.4 Layer 4 — User Experience (Ad-Hoc, As Reported)

| Metric | Source | Frequency | Threshold |
|--------|--------|-----------|-----------|
| Browser console errors | Tester report | Per session | 0 May-related errors |
| Coaching content quality | Tester report | Per session | 0 complaints of wrong/irrelevant coaching |
| Performance impact | Tester report | Per session | No perceptible lag from May pipeline |
| Wrong-topic coaching | Tester report | Per session | 0 confirmed cases |
| Rollback needed | Tester report | Ad-hoc | Track count, reason, resolution |

---

## 3. Monitoring Cadence

### 3.1 Session-Start Checklist (T0)

Run before each rollout session begins:

- [ ] `npm run preflight` → 0 divergences
- [ ] `npm run smoke` → 17/17 (if any May or app files changed)
- [ ] Open simulator → May companion card visible
- [ ] `window.__mayPilot.orchestratorReady()` → all 8 deps present
- [ ] `MayFeatureFlags.getAll()` → confirm all 6 adaptive flags true, all 5 LLM flags false
- [ ] Record: date, tester identity, preflight result, smoke result

### 3.2 During-Session Monitoring (Tmid)

Monitor during the rollout session:

- [ ] Browser console open → watch for May-related errors or warnings
- [ ] After 10+ questions answered → check `window.__mayPilot.telemetry()` for decision events
- [ ] After session completion → verify telemetry persisted (`cmaMayPilotTelemetry` in localStorage)
- [ ] Note any unusual behavior (wrong coaching mode, missing recommendations, UI glitches)

### 3.3 Post-Session Analysis (Tend)

Run after each rollout session ends:

- [ ] Copy telemetry: `JSON.parse(localStorage.getItem('cmaMayPilotTelemetry'))`
- [ ] Save to `reports/telemetry/MAY020_TELEMETRY_{date}_{tester}.json`
- [ ] Run through dashboard (`scripts/may_rollout_dashboard.html`) when available
- [ ] Check against Layer 3 alert thresholds
- [ ] Record: decision count, mode distribution, readiness bands, intervention tiers
- [ ] Compare to MAY-014 synthetic expectations
- [ ] File any anomalies in a dated monitoring log entry

### 3.4 Weekly Review (Every 7 Days or After 5+ Sessions)

- [ ] Aggregate telemetry from all testers for the week
- [ ] Compute cohort-level metrics (Section 4)
- [ ] Compare week-over-week trends
- [ ] Determine GO / CONDITIONAL GO / NO-GO for continued rollout
- [ ] File weekly summary in `reports/telemetry/MAY020_WEEKLY_{date}.md`

---

## 4. Cohort-Level Metrics (Weekly Aggregate)

| Metric | Calculation | Target |
|--------|------------|--------|
| Total sessions completed | Count of telemetry snapshots | ≥ 10 per week |
| Valid orchestrator call rate | Sessions with ≥ 5 decisions ÷ total sessions | ≥ 90% |
| Decision distribution match | Decisions within ±15% of MAY-014 expectations | ≥ 80% alignment |
| Zero May-related crashes | Sessions with 0 console errors | 100% |
| Telemetry persistence successful | Sessions with non-empty `cmaMayPilotTelemetry` | 100% |
| Learner complaints | Count of confirmed wrong-coaching reports | 0 |
| Rollback events | Count of rollback triggers | 0 |

---

## 5. Monitoring Roles

| Role | Responsibility | Artifacts |
|------|---------------|-----------|
| Developer | Run preflight/smoke, verify structural integrity, investigate anomalies | Preflight output, smoke report |
| Tester | Run rollout sessions, capture telemetry, report UX issues | Telemetry snapshots, session notes |
| Operator | Aggregate weekly, run dashboard, produce GO/CONDITIONAL-GO/NO-GO | Weekly summary, dashboard screenshots |

In the limited rollout phase (5-10 internal testers), one person may fill all three roles. The separation exists for clarity, not staffing.

---

## 6. Telemetry Storage and Retention

### 6.1 Storage Schema

| Location | Content | Retention |
|----------|---------|-----------|
| `cmaMayPilotTelemetry` (localStorage) | Single snapshot — overwritten each session | Destroyed on localStorage clear |
| `reports/telemetry/MAY020_TELEMETRY_{date}_{tester}.json` | Archived snapshot from each session | Indefinite (project records) |
| `reports/telemetry/MAY020_WEEKLY_{date}.md` | Weekly aggregate summary | Indefinite |

### 6.2 Privacy

- No PII is collected — telemetry contains decision IDs, mode names, readiness scores, and topic names only
- No answer data is collected — May never records which answer the learner selected
- No session content is collected — May reads question_state, CorrectChoice for coaching context but never stores them
- Telemetry data never leaves the tester's machine (manual copy to reports/)

---

## 7. Alert Response Matrix

| Severity | Condition | Response | Timeline |
|----------|-----------|----------|----------|
| CRITICAL | Preflight divergence > 0 | Immediate rollback | < 5 minutes |
| CRITICAL | Smoke test failure | Immediate rollback | < 5 minutes |
| CRITICAL | app.js crash from May layer | Rollback + investigation | < 15 minutes |
| HIGH | Telemetry empty after session | Investigate wiring; restart session | < 1 hour |
| HIGH | EXPLAIN mode = 0 across 3+ sessions | Check D7/D8/D10 reachability | < 1 day |
| MEDIUM | Ready band unreachable | Verify CAL-03 threshold; no rollback needed | < 1 week |
| LOW | QUIZ mode > 85% | Monitor; calibrate in next session | Next session |
| INFO | Decision distribution drifts from expectations | Document; no action unless drift exceeds ±25% | Next weekly review |

---

## 8. Success Criteria for This Monitoring Plan

| Criterion | Status |
|-----------|--------|
| All monitoring layers defined | Complete |
| Cadence (T0/Tmid/Tend/Weekly) documented | Complete |
| Alert thresholds quantified | Complete |
| Roles and responsibilities assigned | Complete |
| Telemetry storage and retention defined | Complete |
| Privacy and governance compliance confirmed | Complete — zero PII, zero answer data, zero content reads beyond coaching context |
| No pack/case/content modifications | Confirmed — all monitoring is read-only |

---

## 9. Non-Actions (Correctly Excluded)

- No modification to `app.js`, `index_updated.html`, `styles.css`
- No modification to any pack or case file
- No answer-key reading or writing
- No question_state modification
- No REVISION_HISTORY.md entry (Light Lane — documentation only)
- No CURRENT_BASELINES.md update (no runtime-critical file changes)
- No npm package additions

---

*MAY-020 — Monitoring Plan — 2026-07-31*
