# G01 — Risk Register (2026 Q3 Baseline)

**Date:** 2026-07-31
**Session:** G01 Governance Rebaseline & Standards Consolidation
**Status:** COMPLETE
**Basis:** CURRENT_BASELINES.md §3, DEFECT_LIBRARY.md, G01 Defect Auditor, G01 Operational Auditor

---

## 1. Active Risks — Learner Pool

| # | Risk | Severity | Scope | Status |
|---|------|----------|-------|--------|
| R1 | **DL-035 — 39 Certified Domain F items carry empty distractor EW slots** | HIGH | 39 items (28 Pack C, 11 Pack D), all Domain F, all Certified | OPEN — Rule 6 deployed (S814). Content remediation pending S816-S818. 39 items in learner pool. |
| R2 | **Cognitive label inflation — 189 flagged HO items** | HIGH | 189 items pool-wide (34.8% of HO-labeled) | OPEN — 58.7% estimated misclassification rate. No governance gate prevents inflated labels from entering learner pool. Rule 11 recommended. |

---

## 2. Active Risks — Governance Gaps

| # | Risk | Severity | Scope | Status |
|---|------|----------|-------|--------|
| R3 | **Cognitive classification ungoverned** | HIGH | 2,545 items — no automated enforcement of CognitiveLevel validity | OPEN — Governance guard Rules 1-9 do not cover cognitive classification. Rule 11 designed (S99P) but not deployed. |
| R4 | **No cognitive audit in certification pipeline** | HIGH | All future certification waves | OPEN — Pipeline is `validate → build-registry → dashboard`. No cognitive audit step. S99P spec complete; implementation deferred. |
| R5 | **DL-016 dual-block risk in Packs C+D** | MEDIUM | ~1,000 items (Pack C: 500, Pack D: 500) | MONITOR — S805 resolved Pack A. Packs C+D dual-block architecture not yet audited for DL-016. |
| R6 | **DL-032 case-level uniform difficulty** | MEDIUM | 75 cases — case-level Difficulty metadata | OPEN — Item-level 80% resolved (S716). Case-level Difficulty field still uniform "Moderate." |

---

## 3. Active Risks — May Operational

| # | Risk | Severity | Scope | Status |
|---|------|----------|-------|--------|
| R7 | **May monitoring is entirely manual** | MEDIUM | Phase 2 limited rollout (5-10 testers) | ACCEPTED — scope-appropriate. Becomes HIGH if May enters Phase 3 without automation. |
| R8 | **May telemetry is browser-memory-only** | MEDIUM | Phase 2 limited rollout | ACCEPTED — scope-appropriate. No automated aggregation or persistence. |
| R9 | **May escalation detection is manual** | MEDIUM | All Tier 0-2 alerts | ACCEPTED — scope-appropriate. No automated alerting. Tier 3 (rollback) is manual but verified. |

---

## 4. Mitigated Risks — Resolved Since S221

| # | Risk | Resolution | Date |
|---|------|-----------|------|
| MR1 | DL-008 — ExplanationWrong[CC] non-empty in learner pool | 84 items remediated (S893–S895 + S382). 0 remaining. | 2026-07-28 |
| MR2 | DL-016 — Metadata-block shift in Pack A Section E | 57 items resolved (S805). Pack A single-object architecture confirmed (S227). | 2026-07-26 |
| MR3 | DL-021 — Pack E Section C absent distractor EW fields | 264 fields authored. All 100 Section C items Certified. 0 remaining (S828). | 2026-07-27 |
| MR4 | DL-029 — Regex block-scan false positives | P1-P8 prevention rules active. All post-July-28 scans use Function-constructor parse. | 2026-07-26 |
| MR5 | DL-031 — Definition-match difficulty inflation | ~677 items recalibrated across S89B, S89C, S713. | 2026-07-25 to 2026-07-26 |
| MR6 | DL-038 — Matching RightItems Unicode mismatch | 1 item fixed (S85). No recurrence. | 2026-07-30 |
| MR7 | Matching program ordered-pattern defect | 159 items shuffled. Program CLOSED (S85). | 2026-07-30 |
| MR8 | DL-034 — P1-E-R33 missing structural fields | S808 repair + certify. S207 verified complete. | 2026-07-26 |
| MR9 | DL-037 — Choice binary lead-in polarity mismatch | 1 item fixed (S911). Full-pool scan clean (S912). Rule 9 deployed (S913). | 2026-07-28 |

---

## 5. Risk Heat Map

```
                    LIKELIHOOD
                    Low       Medium     High
              ┌──────────┬──────────┬──────────┐
    Critical  │          │          │          │
              ├──────────┼──────────┼──────────┤
S   High      │  R6      │  R5      │ R1 R2 R3 │
E             │          │          │   R4     │
V  Medium     │  R7 R8   │          │          │
E             │  R9      │          │          │
R  Low        │          │          │          │
I             ├──────────┼──────────┼──────────┤
T  Info       │          │          │          │
Y             └──────────┴──────────┴──────────┘
```

**Concentration area:** HIGH severity × HIGH likelihood = 4 risks (R1-R4), all related to cognitive classification governance. This cluster represents the single largest governance gap identified by G01.

---

## 6. Risk Remediation Roadmap

### Immediate (G01 Closeout → S109P)

| Risk | Action | Session |
|------|--------|---------|
| R1 | Reconcile DL-026/DL-035 in CURRENT_BASELINES.md | G01 Implementer |
| R1 | Content remediation — 117 distractor EW fields | S816-S818 |
| R2, R3 | Deploy Rule 11 (AF-3/4/5 BLOCK) | S109P |
| R4 | Add cognitive-audit step to pipeline | S110P |

### Short-Term (S109P-S112P)

| Risk | Action | Session |
|------|--------|---------|
| R2 | Run AF-2 as FLAG-level rule | S110P |
| R2 | Deploy AF-6 as WARN-level rule | S111P |
| R2 | Enhance AF-1 with NLP | S112P |
| R5 | Audit Packs C+D for DL-016 dual-block shift | Deferred certification wave |
| R6 | Recalibrate case-level Difficulty metadata | Deferred certification wave |

### Phase 3 Prerequisites (May Full Activation)

| Risk | Action |
|------|--------|
| R7 | Automated monitoring dashboard |
| R8 | Automated telemetry aggregation |
| R9 | Automated threshold-based alerting |

---

## 7. Risk Acceptance Criteria

The following risks are **accepted** at their current severity for the current project phase:

| Risk | Rationale for Acceptance |
|------|-------------------------|
| R7 (Manual monitoring) | Scope-appropriate for Phase 2 (5-10 testers). Monitoring cadence and frameworks are documented. |
| R8 (Manual telemetry) | 500-event buffer sufficient for Phase 2. Manual archival workflow is adequate for limited tester pool. |
| R9 (Manual escalation detection) | Tier 3 rollback is immediate and verified. Tier 0-2 detection relies on human observation — acceptable for limited rollout. |
| R5 (DL-016 Packs C+D) | No new DL-016 findings since S805. Packs C+D are functioning correctly in learner delivery. Audit deferred to next certification wave. |
| R6 (Case-level uniform difficulty) | Item-level difficulty is 80% calibrated. Case-level `Difficulty` metadata is cosmetic (not used by runtime engine). |

---

*Generated: 2026-07-31 | G01 Implementer Phase — Risk Register*
