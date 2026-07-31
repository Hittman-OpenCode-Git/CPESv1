# G01 — May Production Governance Assessment

**Date:** 2026-07-31
**Session:** G01 Governance Rebaseline & Standards Consolidation
**Status:** COMPLETE
**Auditor:** G01 Operational Auditor (governance-general agent)

---

## 1. May Lifecycle Summary

May has completed a 10-milestone development lifecycle moving from project (June 2026) to operational product (July 31, 2026):

```
Architecture (MAY-001–006)
    ↓
Coaching Layer (MAY-007–012)
    ↓
Readiness Engine (MAY-013–014)
    ↓
Telemetry (MAY-015–016)
    ↓
Pilot Activation (MAY-017)
    ↓
Governance + Calibration (MAY-018–019)
    ↓
Operations Framework (MAY-020–021)
    ↓
Production Integration (MAY-022)
    ↓
Rollout Validation (MAY-023)
    ↓
Production Activation (MAY-024)  ← Current State
```

---

## 2. Operational Control Assessment

### 2.1 Telemetry

| Control | Status | Evidence |
|---------|--------|----------|
| Collection mechanism | ✅ DEPLOYED | `may-telemetry.js` — 173 lines, 7 event types, 500-event buffer |
| Data destination | ✅ DEPLOYED | `localStorage` key `cmaMayPilotTelemetry` |
| Archival | ⚠️ MANUAL | Manual copy to `reports/telemetry/MAY020_TELEMETRY_{date}_{tester}.json` |
| PII collection | ✅ SAFE | Zero PII collected |
| External network calls | ✅ SAFE | None |
| Diagnostics surface | ✅ DEPLOYED | `window.__mayPilot.telemetry()` returns live snapshot |

**Assessment:** Telemetry collection and in-browser persistence are solid for Phase 2 limited rollout (5-10 testers). The manual archival workflow is scope-appropriate. Automated aggregation, server-side persistence, and dashboard integration are NOT required until Phase 3 (full activation).

---

### 2.2 Rollback

| Control | Status | Evidence |
|---------|--------|----------|
| Single-flag control | ✅ VERIFIED | `may-feature-flags.js:30` — `ENABLE_PRODUCTION_MAY_INTEGRATION: true` |
| Procedure | ✅ DOCUMENTED | MAY024_ROLLBACK_CHECKLIST.md §2.1 — 5 steps, sub-minute |
| Verification | ✅ DOCUMENTED | 10-point rollback verification checklist §2.2 |
| Data preservation | ✅ SAFE | MayLearnerState (localStorage) preserved on rollback |
| Rollback tested | ✅ VERIFIED | MAY024_PRODUCTION_VALIDATION.md §3.2 — 6-step rollback test confirmed |
| Automated health check | ❌ NOT DEPLOYED | No ongoing automated rollback health check |

**Assessment:** Rollback is verified working. Single-flag toggle is the simplest possible rollback mechanism — low complexity, low risk. An automated health check (cron job verifying flag state and integration point integrity) would be appropriate for Phase 3.

---

### 2.3 Escalation

| Control | Status | Evidence |
|---------|--------|----------|
| 4-tier ladder | ✅ DOCUMENTED | MAY020_ESCALATION_PLAN.md — Tiers 0-3 with quantified thresholds |
| Decision tree | ✅ DOCUMENTED | Operationalized at §6 |
| Tier 3 rollback triggers | ✅ DOCUMENTED | Preflight divergence, smoke failure, governance guard fail, app.js crash, answer-key exposure, learner state corruption, infinite loop |
| Communication plan | ✅ DOCUMENTED | §4.1-4.4 |
| Post-rollback investigation | ✅ DOCUMENTED | §5 — root cause analysis, reproducibility, fix, regression test, post-mortem |
| Automated alerting | ❌ NOT DEPLOYED | All Tier 0-2 detection is manual |

**Assessment:** The escalation framework is well-designed with quantified thresholds for every tier. The gap is detection — all alerting relies on human observation (telemetry review, tester reports). For Phase 2 (5-10 testers), this is manageable. Phase 3 would benefit from automated threshold-monitoring scripts.

---

### 2.4 Monitoring

| Control | Status | Evidence |
|---------|--------|----------|
| 4-layer framework | ✅ DOCUMENTED | MAY020_MONITORING_PLAN.md — Structural, Pipeline, Telemetry, UX |
| T0/Tmid/Tend/Weekly cadence | ✅ DOCUMENTED | §3.1-3.4 |
| Alert response matrix | ✅ DOCUMENTED | §7 — CRITICAL/HIGH/MEDIUM/LOW/INFO with timelines |
| Success metrics | ✅ DOCUMENTED | 15 metrics across 3 categories (Pipeline, Coaching Quality, Operational Safety) |
| Weekly review template | ✅ DOCUMENTED | MAY020_WEEKLY_REVIEW_TEMPLATE.md |
| Monitoring simulation | ✅ VALIDATED | MAY-021 — 5 incident scenarios, 15/15 metrics validated |
| Automated dashboard | ❌ NOT DEPLOYED | `scripts/may_rollout_dashboard.html` referenced as "when available" |

**Assessment:** The monitoring framework is comprehensive. The manual execution model (human-driven T0/Tmid/Tend checks) is scope-appropriate for Phase 2. The dashboard spec exists but deployment is deferred.

---

### 2.5 Feature Flags

| Control | Status | Evidence |
|---------|--------|----------|
| Centralized module | ✅ DEPLOYED | `may-feature-flags.js` — 139 lines, singleton pattern |
| Flag count | ✅ 16 FLAGS | 6 adaptive + 5 LLM + 1 memory + 1 production + 3 utility |
| LLM safety | ✅ VERIFIED | All 5 LLM flags = `false` |
| Change log | ✅ DEPLOYED | Up to 100 timestamped entries |
| Env var overrides | ✅ DEPLOYED | `applyEnvOverrides()` — 13 flags + `CMA_MAY_PILOT` batch toggle |
| May.config sync | ✅ DEPLOYED | `syncToMayConfig()` bridges to runtime |
| Persistence across reloads | ❌ NOT DEPLOYED | Flags reset to defaults on page reload (except hardcoded `ENABLE_PRODUCTION_MAY_INTEGRATION`) |

**Assessment:** The flag infrastructure is well-engineered (singleton, change log, env overrides, May.config sync). The lack of persistence is by design — flags are source-of-truth in code, not runtime-configurable. This is appropriate for deterministic, audited behavior.

---

## 3. Q4: Has May Crossed the Threshold from Project to Operational Product?

**Answer: YES — as a Phase 2 limited rollout operational product.**

### Evidence FOR operational status:

| Factor | Evidence |
|--------|----------|
| Production flag | `ENABLE_PRODUCTION_MAY_INTEGRATION: true` |
| Integration points | 4 active (I1-I4) in app.js, gated by single flag |
| Lifecycle complete | 10 milestones from architecture to activation |
| Deployment readiness | 98/100 at MAY-024 |
| Operational frameworks | 5 documented: monitoring, escalation, rollback, telemetry, feature flags |
| Rollback verified | Single-flag, sub-minute, 10-point checklist |
| Preflight stability | 0 divergences maintained throughout all May sessions |
| Governance compliance | 54/54 governance guard maintained |

### Caveats (Phase 2, not Phase 3):

| Caveat | Impact |
|--------|--------|
| LLM features disabled | Not full feature set — all 5 LLM flags = `false` |
| Coaching memory disabled | Deferred |
| Manual monitoring | No automated dashboard or alerting |
| Manual telemetry | No automated aggregation |
| Limited rollout scope | 5-10 internal testers, minimum 25 sessions/7 days/3 testers before Phase 3 |
| Zero user-facing metrics | 0 sessions logged on tracking sheets |

### Verdict:

May is an **operational product in controlled limited rollout.** It is NOT a project. It has crossed the governance threshold from development phase to operational phase. The current operational gaps (manual monitoring, manual telemetry) are scope-appropriate for Phase 2 and do not detract from operational status. They become blocking issues only at Phase 3 (full activation).

---

## 4. Recommendations

### 4.1 Governance Documentation Updates

1. **Add May to CURRENT_BASELINES.md §6** — new section: "Operational Controls — May Coaching Layer" with:
   - Feature flag state (16 flags, `ENABLE_PRODUCTION_MAY_INTEGRATION: true`)
   - Rollback verification (single-flag, sub-minute, last tested MAY-024)
   - Telemetry architecture (in-memory buffer, localStorage, manual archival)
   - Escalation framework (4-tier, MAY-020)
   - Monitoring cadence (T0/Tmid/Tend/Weekly)

2. **Add May to AGENTS.md §1** — recognized operational system:
   - May-specific governance lane: May operational changes (flag toggles, app.js integration points, CSS) remain Governance Light Lane
   - May drift-detection signal: `may-feature-flags.js` hash change → CRITICAL signal
   - May rollback: Single-flag toggle — AGENTS.md §3.1 (destructive scripts) does not apply to feature flag changes

3. **May is exempt from Full Governance Lane triggers** — May files are not pack/case/content files. May app.js changes (integration points, CSS) follow Governance Light Lane per AGENTS.md §9.1.

### 4.2 Operational Improvements (Phase 3 Prerequisites)

1. **Automated telemetry aggregation:** Script to pull `localStorage` → structured report
2. **Threshold-based alerting:** Automated preflight/smoke integration with May flag checks
3. **Rollout dashboard:** Deploy `scripts/may_rollout_dashboard.html`
4. **Automated rollback health check:** Verify flag state + integration point integrity at T-0

### 4.3 Immediate (No-Code) Actions

1. ✅ Register May as operational product in governance documentation
2. ✅ Document May-specific drift-detection signals
3. ✅ Formalize Phase 2→Phase 3 gate criteria (≥25 sessions, ≥7 days, ≥3 testers, composite score ≥85)

---

## 5. May Rollback Authorization

May rollback is **pre-authorized** under the following conditions:

| Trigger | Authority | Process |
|---------|-----------|---------|
| Preflight divergence (>0) | Tier 3 — Immediate | Toggle flag → refresh → verify |
| Smoke test failure | Tier 3 — Immediate | Toggle flag → refresh → verify |
| Governance guard failure | Tier 3 — Immediate | Toggle flag → refresh → verify |
| app.js crash | Tier 3 — Immediate | Toggle flag → refresh → verify |
| Answer-key exposure | Tier 3 — Immediate | Toggle flag → refresh → verify + root cause analysis |
| Learner state corruption | Tier 3 — Immediate | Toggle flag → refresh → verify |
| QUIZ > 85% for 5+ sessions | Tier 2 — Investigation | Flag for investigation before rollback |
| EXPLAIN = 0 for 3+ sessions | Tier 2 — Investigation | Flag for investigation before rollback |

Rollback does NOT require:
- Backup-before-write (no file edits)
- REVISION_HISTORY.md entry (no content change)
- DEFECT_LIBRARY.md entry (no content defect)
- Governance guard Rule 5 batch cap (single flag change)
- Preflight re-run (flag change does not affect pack files)

---

*Generated: 2026-07-31 | G01 Implementer Phase — May Production Governance*
