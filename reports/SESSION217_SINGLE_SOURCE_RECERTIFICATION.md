# S217 — Single-Source Registry Recertification

**Session:** S217
**Series:** 200-Series — Stewardship Remediation & Re-Certification
**Date:** 2026-07-27
**Orchestrator:** stewardship-orchestrator
**Type:** READ-ONLY Plan Authoring (Phase 0)
**Predecessor:** S214 (Registry Stress Test — HALTED)
**Successor:** S220 (Stewardship Re-Certification Board)

---

## Executive Summary

**S217 resolves the registry authority gap between S210's DESIGN (all 7 chains INTACT) and S214's REALITY (5/6 duplicate ownership).** The S208 registry authority model defined the correct architecture — raw files > runtime registries > generated registries > reports. But it had zero automated enforcement. S214 proved that registries can proliferate and diverge from raw files without triggering any governance guard rule.

S217 establishes: **1 owner per entity class, with enforcement.**

---

## What S214 Found (Pre-Remediation)

| Registry | Single Source? | Competing Sources |
|----------|---------------|-------------------|
| Question | **NO** | 4+: MASTER_QUESTION_REGISTRY (2,995), QUESTION_REGISTRY_INDEX (2,884), CURRENT_BASELINES (2,540), per-pack (10), per-domain (7), CSV export |
| Session | **NO** | 7: session_registry.json (40), packages (729), status reports (184), REVISION_HISTORY, package_index, session_intelligence, 192 scripts |
| Challenge | **NO** | 2: CH- namespace (35) vs DL- namespace (36+2) — same entity class, different IDs |
| Recommendation | **YES** | 1 (but only 5 REC-IDs for 180+ sessions — massive under-registration) |
| Investigation | **NO** | 19 registered INV-IDs vs 251 actual investigation files on disk (92% undercount) |
| Certification | **NO** | Active: SESSION_STATUS 267 behind, DL-036 40-item divergence, MASTER_QUESTION_REGISTRY 3 days stale |

**Score at S214:** 1/6 single-source, 5/6 duplicate ownership, 4 active conflicts.

---

## The S210→S214 Regression

S210 certified all 7 chains INTACT with 0 duplicate authority claims. S214 found 5/6 broken. Root cause:

1. **S210 tested the architecture as-designed.** The authority model was correct on paper — raw files are authoritative, registries derive from them.
2. **S214 tested against live workspace drift.** Between S210 and S214, S371, S853, S826, S829 and other waves created divergent artifacts that the authority model did not automatically reconcile because no enforcement mechanism existed.
3. **The gap:** The S208 model defines the authority CHAIN but has no automated reconciliation check. Registries can diverge silently.

S217 closes this gap by making the authority chain self-enforcing.

---

## Remediation Architecture

### Principle

**PER ENTITY CLASS, EXACTLY ONE AUTHORITATIVE SOURCE.** All other representations are DERIVED and must carry a `NOT_AUTHORITATIVE — REGENERATE FROM SOURCE` header. Any script or agent that creates a new file claiming registry authority over an already-owned entity class is BLOCKED.

### Entity Owner Assignments

| Entity Class | Authoritative Source | Derived Representations |
|-------------|---------------------|------------------------|
| **Question** | Raw pack files (`pack_*_corrected.js`, `scored_cases*.js`) | MASTER_QUESTION_REGISTRY.md, CSV export, per-pack/domain/case registries, CURRENT_BASELINES §2 |
| **Session** | `scripts/output/session_registry.json` | session_packages/*.json, session_status/*.md, REVISION_HISTORY session entries |
| **Challenge** | DEFECT_LIBRARY.md (DL- namespace — confirmed defects) + challenge_registry.json (CH- namespace — intake form, mapped to DL- on graduation) | None |
| **Recommendation** | `scripts/output/recommendation_registry.json` | routing.json |
| **Investigation** | `scripts/output/investigation_registry.json` | defect_sweeps/*.md, systematic_testing/*.md |
| **Certification** | Raw pack files — `question_state` field | CURRENT_BASELINES §2, readiness_scoring.json, MASTER_QUESTION_REGISTRY (certified column) |

---

## Execution Order (9 Steps)

1. **Upgrade Rules 1 and 4 from WARN to BLOCK** — enables registry enforcement by blocking question_state and answer-key changes without audit trail
2. **Add NOT_AUTHORITATIVE headers** to all derived registries — immediately signals which files are not independently authoritative
3. **Create `scripts/SCRIPT_REGISTRY.json`** — catalog all 192 scripts with purpose, authority level, and last execution
4. **Backfill investigation_registry.json** — register missing INV-IDs from `defect_sweeps/` (30 reports) and `systematic_testing/` (221 files)
5. **Unify CH-/DL- namespaces** — add bidirectional CH→DL graduation mapping
6. **Deploy Rule 7 (DERIVED_REGISTRY_NOT_AUTHORITATIVE BLOCK)** — prevents creation of competing registries
7. **Update AGENTS.md §9 T0 protocol** — add cross-registry reconciliation step at every session startup
8. **Mark SESSION_STATUS_2026-07-24.md as SUPERSEDED** — 267 items behind, 3+ days stale
9. **Regenerate CURRENT_BASELINES.md §2** at S220 T0 — verifies all counts match raw-file ground truth

---

## Success Criterion

**6/6 entity classes have exactly 1 authoritative source. 0/6 have duplicate ownership paths. 0 active authority conflicts.** All derived registries are traceable to their authoritative source and carry NOT_AUTHORITATIVE headers. Cross-registry reconciliation is automated at session startup.

---

## Stop Conditions — Monitored, None Fired

This session is **read-only plan authoring** (Phase 0). No writes to pack files, registries, or governance artifacts were executed. The plan is delivered to S220 for gating and Phase 1 execution authorization.

---

*S217 closes. Registry remediation plan is complete. Evidence delivered for S220 Stewardship Re-Certification Board.*
