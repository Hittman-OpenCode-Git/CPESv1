# Session 114 — Rollback and Monitoring Plan

**Date:** 2026-07-25
**Decision:** PILOT-ONLY — no rollout action taken
**Scope:** This plan is forward-looking. It documents the rollback and monitoring requirements for any FUTURE rollout expansion. No flag was changed in S114.

---

## 1. Rollback Trigger Conditions

The following conditions trigger immediate rollback if a gated expansion is active:

| Trigger | Threshold | Severity |
|---------|-----------|----------|
| Safety block rate exceeds target | >5% of guarded speech calls | HIGH |
| Gate violations detected | >0 (any non-certified or contested QID recommended) | CRITICAL |
| Unsupported insight claims | Any progress/weakness/summary claim without evidence backing | HIGH |
| Learner-facing errors | Any uncaught exception in tutoring code paths | HIGH |
| Threshold drift detected | Any of the 12 thresholds changes from S111-1.0 values | MEDIUM |
| modelVersion drift | modelVersion deviates from S111-1.0 without documented convention | MEDIUM |
| Test suite regression | Any previously passing test fails | HIGH |
| Pack/scoring/content changes | Any unauthorized modification to pack files, scoring, or content | CRITICAL |

---

## 2. Rollback Steps (Config-Only, Future Reference)

If a future session flips the tutoring flag and rollback is needed:

### Immediate Rollback (Config Flag)
```
// In may-core.js, line 13:
// Before: tutoringPilotEnabled: true
// After:  tutoringPilotEnabled: false
```

### Environment Variable Rollback
```
// Clear the env var:
// Before: CMA_MAY_PILOT=1
// After:  CMA_MAY_PILOT=0 (or unset)
```

### Verification After Rollback
1. Confirm `isPilotEnvironment()` returns `false`
2. Run full test suite — must be 129/129 PASS (or current baseline)
3. Confirm all tutoring output goes through `_speak()` (not `_guardedSpeak()`)
4. Verify no learner-facing changes

### Why Config-Only Is Sufficient
- All tutoring behavior is gated behind `isPilotEnvironment()`
- When the flag is `false`, `_guardedSpeak()` and `_guardedRecommend()` are never invoked for user-visible output
- `_guardedRecommend()` still runs as audit-only (no user impact)
- The original `_speak()` paths are unchanged and production-tested
- Rollback is instant — zero code removal needed

---

## 3. Monitoring Metrics

### Required Before Any Expansion

| Metric | Data Source | Current Status |
|--------|------------|----------------|
| Safety block rate | `_safetyLog` entries: `blocked / total` | NOT PERSISTED |
| Gate violation rate | `_gateLog` entries: `violations / total` | NOT PERSISTED |
| False positive safety blocks | Manual review of `_safetyLog` blocked entries | NOT PERSISTED |
| Missed safety violations | Requires independent review | NO MECHANISM |
| Recommendation gate failures | `_gateLog`: `defectGate:false` or `certGate:false` | NOT PERSISTED |
| Non-certified QID recommendations | `_gateLog`: `certGate:false` | NOT PERSISTED |
| Contested QID recommendations | `_gateLog`: `defectGate:false` | NOT PERSISTED |
| Unsupported insight claims | Evidence-threshold suppression count | NOT MEASURED |
| Evidence-threshold suppressions | `_assessInsightEvidence` false flags | NOT MEASURED |
| Empty-safe-set recommendation events | Recovery with zero clean QIDs | NOT MEASURED |
| Pilot-on vs pilot-off behavior differences | Comparative session analysis | NO DATA |
| Learner-facing fallback frequency | `_speak()` calls in pilot mode | NOT MEASURED |

### Infrastructure Required

1. **localStorage persistence** for `_pilotUsageLog`, `_safetyLog`, `_gateLog`
2. **Export mechanism** (JSON download button or console command)
3. **Log rotation** — automatic trim to prevent storage quota issues
4. **Session identifier** in all log entries for cross-session correlation

---

## 4. Monitoring Cadence

| Phase | Cadence | Owner | Action |
|-------|---------|-------|--------|
| Internal pilot (current) | Per-session | Developer | Inspect logs in browser console; run test suite |
| Gated expansion (future) | Daily | Developer/Monitor | Review exported logs; check safety block rate; verify zero gate violations |
| Gated expansion (future) | Weekly | Developer/Monitor | Run full test suite; verify thresholds; check modelVersion; review REVISION_HISTORY |
| Default-on (future) | Continuous | Operations | Automated alerting on threshold crossings; real-time dashboard |

---

## 5. Escalation Criteria

| Level | Condition | Response |
|-------|-----------|----------|
| **INFO** | Safety block rate 0-2% | Normal operation — log and continue |
| **WATCH** | Safety block rate 2-5% | Review blocked entries for false positive patterns; do not roll back |
| **WARN** | Safety block rate >5% OR single gate violation | Flag for review; consider rollback if pattern persists across 3+ sessions |
| **ESCALATE** | Gate violations across multiple sessions OR unsupported insight claims detected | Immediate rollback; root cause analysis; do not re-enable until fix confirmed |
| **CRITICAL** | Any pack/scoring/content change OR learner-facing crash | Immediate rollback; full audit; governance review before any re-enable |

---

## 6. Owner/Action Checklist

### Pre-Expansion (S115+)
- [ ] Add localStorage persistence for `_pilotUsageLog`, `_safetyLog`, `_gateLog`
- [ ] Add `_exportPilotLogs()` method for JSON download
- [ ] Conduct at least one real pilot session with `CMA_MAY_PILOT=1`
- [ ] Analyze pilot logs for baseline safety block rate
- [ ] Verify zero gate violations in real usage
- [ ] Verify evidence-threshold behavior with real learner data
- [ ] Document baseline metrics in S115 report

### Gated Expansion (Future)
- [ ] Define cohort size limit
- [ ] Set monitoring period (recommended: 2 weeks)
- [ ] Set safety block rate threshold (<5%)
- [ ] Set gate violation threshold (=0)
- [ ] Configure log export and review cadence
- [ ] Prepare rollback command and test it
- [ ] Document rollback owner and SLA

### Post-Expansion Monitoring (Future)
- [ ] Weekly metrics review
- [ ] Monthly threshold drift check
- [ ] Quarterly full test suite re-run
- [ ] Per-session log archival

---

## 7. Decision Record

**Session 114:** Rollout DECLINED — remains PILOT-ONLY

**Rationale:**
1. Zero real learner data exists — all testing uses synthetic profiles
2. All safety/gate/pilot logs are in-memory only — no persistence, no export
3. Telemetry readiness rated PARTIAL by Agent B
4. Cannot validate safety block rate, gate violation rate, or evidence-threshold behavior against real usage
5. Prerequisites for even limited gated expansion are not met

**Status of S111/S112/S113 Pilot Infrastructure:**
- All 129 tests PASS (37 readiness + 18 calibration + 74 tutoring safety)
- All S111 guarded-speak paths (8/8) intact
- All S112 recommendation gates (3/3) intact
- All S113 evidence-threshold validators (8/8) intact
- `isPilotEnvironment()` gating confirmed — `tutoringPilotEnabled` defaults to `false`
- Non-pilot behavior identical to pre-S111 — zero learner impact
- No thresholds changed in S114
- `stabilityHigh` = 75, `accuracyGood` = 75
- `modelVersion` = S111-1.0
- No pack/scoring/content/certification modifications

**Recommended S115 Focus:**
Real-data collection and telemetry hardening session:
1. Add localStorage persistence for all three log arrays
2. Add `_exportPilotLogs()` method for JSON download
3. Conduct real pilot session with `CMA_MAY_PILOT=1` in an actual browser
4. Analyze pilot logs for baseline safety block rate and gate violations
5. Verify evidence-threshold suppression patterns with real data
6. Re-evaluate rollout readiness with real metrics
