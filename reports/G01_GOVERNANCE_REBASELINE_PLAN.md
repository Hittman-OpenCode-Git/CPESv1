# G01 — Governance Rebaseline & Standards Consolidation Plan

**Date:** 2026-07-31
**Session Type:** Governance Rebaseline (Read-Only)
**Governance Lane:** Light
**Authority:** AGENTS.md §9.1 (Governance Light Lane — no pack/case/content modifications)
**Predecessor:** S81–S101P, MAY-017–MAY-024
**Status:** ACTIVE

---

## 1. Purpose

Reconcile governance policies, defect taxonomy, quality-gate definitions, certification rules, and execution procedures against all changes introduced since the last governance architecture baseline (S221, 2026-07-27). Produce an updated governance baseline before the Quality Recovery execution program begins.

## 2. Scope of Governance-Impacting Changes Since S221

### 2.1 Matching Program (S81–S85, 2026-07-24 to 2026-07-30)

| Milestone | Impact |
|-----------|--------|
| S81/S83 | +57 MCQ certified, +106 cases certified — total certified pool expanded to 2,451 |
| S83/S84/S85 | 159 ordered-pattern matching items shuffled; 32 extra distractors added across 16 items |
| S85 | DL-038 discovered (Unicode mismatch in matching RightItems); Matching program CLOSED |
| S85 | case_pack_1/2/3 established (3×25 architecture); 5 legacy scored_cases files archived |

**Governance impact:** Unexpanded - Matching program was a dedicated remediation track with its own quality gates. No new governance rules created. The 3×25 case architecture replaced 5 legacy files — CURRENT_BASELINES.md §1 was updated at S916–S918.

### 2.2 Quality Recovery Program (S92P–S101P, 2026-07-31)

| Milestone | Impact |
|-----------|--------|
| S92P | Cognitive drift analysis — established per-section quality baselines |
| S93P | Classification audit — discovered **58.7% HO misclassification rate** (309 of 528 items overstated) |
| S94P | Recovery planning — quality gates defined (G-DEF, G-EVAL-1…4, G-ANALYZE, G-STRUCT) |
| S95P | Higher-Order Certification Framework — AF-1 through AF-6 automatic failure conditions; 4-stage review workflow |
| S96P | Pilot audit (Pack C EC) — proved 100% salvageable by relabeling alone; 37% genuine Evaluate |
| S97P | Automated screening engine prototype — 189 items flagged (34.8% of HO); <3s runtime |
| S98P | ROI analysis — 4-phase corrected roadmap; ~748 genuine HO items needed |
| S99P | Reclassification governance — Rule 10 design (8 gates); 4-stage certification pipeline; two-reviewer rule |
| S100P | Final recovery roadmap — 10-session execution plan; batch relabeling protocol |
| S101P | P0 cognitive reclassification audit; multi-agent May optimization wave |

**Governance impact:** **HIGH.** The Quality Recovery program:
- Discovered systemic cognitive classification inaccuracy that current governance does not detect
- Defined 8 quality gates (G-DEF, G-EVAL-1…4, G-ANALYZE, G-ANALYZE-DF, G-STRUCT) — none deployed to governance guard
- Proposed Rule 10/Rule 11 for cognitive gates — not yet implemented
- Created automated screening engine (`scripts/s097p_automated_gate.js`) — prototype, not integrated
- Established evidence standards for HO certification — not yet encoded in governance docs

### 2.3 May Production Activation (MAY-017–MAY-024, 2026-07-31)

| Milestone | Impact |
|-----------|--------|
| MAY-017 | Controlled pilot activated via feature flags; telemetry wired |
| MAY-018 | Readiness review — 89/100 under 8-dimension rubric; 7 calibration items identified |
| MAY-019 | Calibration fixes — 10/10 decisions reachable; EXPLAIN mode activated; full telemetry |
| MAY-020 | Operational framework — monitoring plan, escalation plan, rollout dashboard spec, success metrics, weekly review template |
| MAY-021 | Monitoring simulation — 5 incident scenarios tested; 15/15 metrics validated |
| MAY-022 | Production UI integration — 4 integration points in app.js, 31 CSS selectors |
| MAY-023 | Production rollout validation — all integration points audited, rollback verified |
| MAY-024 | Production activation — `ENABLE_PRODUCTION_MAY_INTEGRATION` toggled `true` |

**Governance impact:** **MODERATE.** May transitions from project to operational product:
- New operational controls introduced: monitoring, escalation, rollback, telemetry, feature flags
- These controls exist as documentation and code — not recognized in AGENTS.md or governance guard
- Rollback safety depends on a single feature flag — no circuit-breaker automation
- Telemetry is browser-memory-only — no automated persistence or aggregation

### 2.4 Automation Program (S97P, 2026-07-31)

| Milestone | Impact |
|-----------|--------|
| S97P | `scripts/s097p_automated_gate.js` — 410-line automated screening engine |
| S97P | AF-3/4/5 gates proven automatable at <1.5% FP rate (128 items) |

**Governance impact:** **MODERATE.** Automated quality gates now exist conceptually:
- Engine is functional prototype — runs in <3s across 2,545 items
- Not integrated into certification pipeline (`npm run pipeline` unchanged)
- Not deployed as governance guard rule
- AF-2 has 5-8% FP rate — needs human routing
- AF-1 has ~2% detection sensitivity — needs NLP enhancement

## 3. Auditor Phase Tasking

### 3.1 Defect Auditor

**Scope:** DL-008, DL-016, DL-026, DL-029, DL-031, DL-032, DL-038

**Determine status:** Resolved / Partially Resolved / Active / Deprecated

**Key concerns:**
- DL-026 "RESOLVED" claim in CURRENT_BASELINES.md contradicts DL-035 "IN PROGRESS" claim
- DL-031 and DL-032 status may be stale (S716 case recalibration, S713 difficulty sweeps not reflected)
- DL-008 total remediated count (59 vs. 84 — S382 batch undocumented in baselines)

### 3.2 Certification Auditor

**Scope:** S95P, S96P, S97P, S99P, S100P

**Key questions:**
- Q1: Should Rule 10/Rule 11 become mandatory before certification?
- Q2: Should AF gates become required review items?
- Q3: Should metadata reclassification receive its own governance workflow?
- Q5: Which controls should become permanent governance requirements?

### 3.3 Quality Gate Auditor

**Scope:** AF-1 through AF-6; G-DEF through G-STRUCT

**Determine:** Manual / Hybrid / Automated status for each gate.

**Key concern:** Are AF-1…6 the same as G-DEF…G-STRUCT or a separate parallel framework?

### 3.4 Operational Auditor

**Scope:** MAY-020 through MAY-024

**Confirm operational controls:** Telemetry, Rollback, Escalation, Monitoring, Feature Flags

**Key question:** Q4: Has May crossed the threshold from project to operational product?

## 4. Implementer Phase Deliverables

| # | Deliverable | Content |
|---|-------------|---------|
| 1 | `G01_GOVERNANCE_DELTA_REPORT.md` | Cross-cutting governance changes from all 4 programs |
| 2 | `G01_DEFECT_STATUS_MATRIX.md` | Resolved/Active/Deprecated status for all 7 audited defects |
| 3 | `G01_RULE10_FINALIZATION.md` | Rule 10/Rule 11 cognitive gate specification |
| 4 | `G01_MAY_PRODUCTION_GOVERNANCE.md` | May operational control assessment and recommendations |
| 5 | `G01_RISK_REGISTER.md` | Updated risk register reflecting current state |
| 6 | `G01_PROGRAM_BASELINE_2026Q3.md` | Authoritative governance baseline snapshot |

## 5. Verifier Phase

Confirm zero repository modifications:
- No pack file writes
- No content modifications
- No certification state changes
- No May behavioral modifications
- No baseline file modifications
- No governance guard modifications

## 6. Success Criteria

- [ ] All governance-impacting changes inventoried across 4 programs
- [ ] Defect status cross-referenced against raw evidence
- [ ] Contradictory claims in CURRENT_BASELINES.md flagged with resolution recommendations
- [ ] AF gate deployability assessed with FP rate evidence
- [ ] May operational maturity evaluated with evidence
- [ ] 6 deliverable reports produced
- [ ] 0 repository modifications confirmed
- [ ] Recommended governance updates prioritized for post-G01 sessions

## 7. Expected Governance Recommendations

Based on pre-audit analysis:

### New Mandatory Controls
- Cognitive classification gates (AF-3/4/5) via governance guard Rule 11
- Pre-certification cognitive audit pipeline step
- Difficulty-Cognitive consistency rule

### May Operational Controls (Document, Do Not Code)
- Telemetry retention policy (formalize manual-copy workflow)
- Activation review (weekly effectiveness review confirmed operational)
- Rollback testing (single-flag toggling confirmed; add automated health check)
- Weekly effectiveness review (template validated MAY-021)

### Retire/Archive
- DL-029 "regex block-scan false positive" language from CURRENT_BASELINES.md
- Any governance language assuming reported HO counts are trustworthy (contradicted by S93P–S100P)

---

*Generated: 2026-07-31 | G01 Planner Phase*
