# SESSION 203 — Scan Orchestration Specification

**Session:** S203 — Framework v2 Engineering Specifications  
**Series:** 200-Series Process Engineering & Certification Architecture  
**Date:** 2026-07-27  
**Type:** Engineering Implementation Specification — Read-Only  
**Parent:** SESSION202_SCANNING_ALGORITHM_SPEC.md (Architecture)

---

## 1. Purpose

This document defines how the 15 scan specifications in `SESSION203_SCAN_ENGINE_SPEC.json` are orchestrated into a coherent pre-flight pipeline. It specifies invocation sequence, parallelism rules, artifact consumption patterns, scan result aggregation, and the readiness classification algorithm.

## 2. Orchestration Model

### 2.1 Scan-Once / Consume-Many

The core principle of v2 scanning: each scan runs **once per session**, and its artifacts are consumed by all downstream consumers (boards, governance guard, delta engine, certification engine). No duplicate scans. No cross-board re-scanning of the same defect class.

```
Session T0
  │
  ├─ Scan Engine Orchestrator initiates
  │   │
  │   ├─ Gate -1: Identity Validation (PG-011) → identity artifacts
  │   ├─ Gate  0: JSON Integrity (PG-010) → parse artifacts
  │   ├─ Gate  1: Structural Scans (PG-001, PG-009, PG-005, PG-004) → structural artifacts
  │   ├─ Gate  2: Content Scans (PG-003, PG-008, PG-002) → content artifacts
  │   ├─ Gate  3: Reconciliation (compound-key uniqueness) → reconciliation artifacts
  │   └─ Gate  4: Calculation Scans (PG-006, PG-007) → certification artifacts
  │
  ├─ Readiness Classifier consumes all gate artifacts
  │   └─ Per-item readiness classification (READY / MINOR_FIX / REMEDIATE / BLOCKED)
  │
  ├─ Quality Board consumes READY items + structural + content artifacts
  ├─ Certification Board consumes Quality verdicts + calculation artifacts
  └─ Governance Board consumes all artifacts + readiness classification
```

### 2.2 Gate Ordering — Sequential with Internal Parallelism

**Gates are sequential** — Gate N+1 cannot run until Gate N completes for all items. This is mandatory because:
- Gate -1 establishes identity that Gate 0-4 depend on
- Gate 0 establishes parseability that Gate 1-4 depend on
- Gate 1 must detect DL-008 before Gate 2 content scans (DL-008 items excluded from content-quality review)
- Gate 3 must verify compound-key uniqueness before Gate 4 calculation scans (wrong-target CC detection prevented)

**Scans within a gate are parallel** — all scans in Gate 1 (PG-001, PG-009, PG-005, PG-004) can run simultaneously on the same item set. Same for Gate 2 and Gate 4.

### 2.3 Expected Runtime

| Gate | Scans | Runtime (serial) | Runtime (parallelized) |
|------|-------|-----------------|----------------------|
| Gate -1 | PG-011 | 5s | 5s |
| Gate 0 | PG-010 | 5s | 5s |
| Gate 1 | PG-001, PG-009, PG-005, PG-004 | 10s | ~3s (longest scan) |
| Gate 2 | PG-003, PG-008, PG-002 | 12s | ~5s (longest scan) |
| Gate 3 | Compound-key reconciliation | 3s | 3s |
| Gate 4 | PG-006, PG-007 | 35s | ~30s (PG-006 dominates) |
| **Total** | **All 11 scans** | **~70s** | **~51s** |

For all 5 packs (serialized): ~4.2 minutes (5 × 51s). Case files add negligible time (~2s total).

### 2.4 Per-Pack vs Cross-Pack

- **Per-pack gates** (Gate -1, Gate 0, Gate 1, Gate 2, Gate 4): Run independently on each pack. Pack A results don't affect Pack B. Pack files can be processed in parallel if agent capacity allows.
- **Cross-pack gate** (Gate 3): Requires all 5 packs' compound keys loaded simultaneously for collision detection and template-family cross-pack verification.

## 3. Readiness Classification Algorithm

After all gates complete, each item receives a readiness classification:

```
function classifyReadiness(item, gateResults):
  if gateResults.gateNeg1.verdict == IDENTITY_BLOCKED    → return BLOCKED
  if gateResults.gate0.verdict == FAIL                    → return BLOCKED
  if gateResults.gate1.verdict == HARD_FAIL               → return REMEDIATE
  if gateResults.gate3.verdict == HARD_FAIL               → return REMEDIATE
  
  has_soft_fail = gateResults.gate2.verdict == SOFT_FAIL
  has_warn = gateResults.gate4.verdict == WARN
  
  if has_soft_fail AND has_warn                          → return MINOR_FIX
  if has_soft_fail                                        → return MINOR_FIX
  if has_warn                                             → return READY (with warnings)
  
  return READY
```

### 3.1 Board Visibility Rules

| Classification | Quality Board | Certification Board | Governance Board |
|---------------|--------------|--------------------|--------------------|
| READY | Visible (full review) | Visible | Visible |
| MINOR_FIX | Visible (with warning badges) | Visible | Visible |
| REMEDIATE | **Hidden** | **Hidden** | Visible |
| BLOCKED | **Hidden** | **Hidden** | Visible |

REMEDIATE and BLOCKED items are **invisible to certification boards** — they cannot be reviewed or certified. Only READY and MINOR_FIX items appear in board queues. This single rule eliminates the 89.5% readiness failure rate.

### 3.2 Readiness Score Computation

Each item receives a numeric readiness score (0-100) for session planning:

```
score = 100
  - (identity_warn ? 5 : 0)
  - (gate1_hard_fails × 25)
  - (gate2_soft_fails × 10)
  - (gate3_hard_fails × 25)
  - (gate4_warns × 5)
  - (dl008_present ? 50 : 0)         // automatic severe penalty
  - (dl026_present ? 30 : 0)         // significant penalty
  - (dl030_confirmed ? 100 : 0)      // auto-zero for wrong answer key
  
return max(0, score)
```

## 4. Artifact Consumption

### 4.1 Consumers of Each Artifact

| Artifact | Consumed By |
|----------|------------|
| Gate -1 identity artifacts | All downstream gates, Registry Board, Delta Engine |
| Gate 0 parse artifacts | All downstream gates, Governance Board |
| Gate 1 structural artifacts | Quality Board (Agent 1), Governance Guard Rules 6-7 |
| Gate 2 content artifacts | Quality Board (Agent 1-2), Certification Board |
| Gate 3 reconciliation artifacts | Registry Board, Certification Board |
| Gate 4 calculation artifacts | Quality Board (Agent 1), Certification Board (DL-030 priority) |
| Analytical artifacts (PG-AN-*) | Quality Board (Agent 2 psychometrics), Certification Board |

### 4.2 Scan Registry

Every scan result is logged to a session-level scan registry:

```
reports/scans/SCAN_REGISTRY_{SESSION_ID}.json
{
  "session_id": "S203",
  "executed_at": "ISO 8601",
  "scans_executed": [
    {"scan_id": "PG-011", "gate": "Gate_-1", "executed": true, "runtime_ms": 4321, "items_processed": 2500, "verdict": "PASS"},
    ...
  ],
  "scans_skipped": [],
  "total_runtime_ms": 51234,
  "readiness_distribution": {"READY": 2100, "MINOR_FIX": 200, "REMEDIATE": 150, "BLOCKED": 50}
}
```

## 5. Error Handling

### 5.1 Scan Failure Propagation

| Failure Mode | Action |
|-------------|--------|
| Single scan fails (parse error) | Gate remains open. Failed items marked SCAN_ERROR. Pipeline proceeds for non-failing items. |
| All scans in a gate fail | Gate FAILS. Items not classified. Halt pipeline — investigate and re-run. |
| AM-1 parse fails for entire pack | Gate 0 FAILS. All items in that pack BLOCKED. Halt pipeline for that pack only. |
| Scan produces different count on re-run | Count instability detected → reject scan result. Run third time. Document discrepancy. Accept only after 2 consecutive stable runs. |
| Scan produces totals without QID list | Scan result REJECTED per FM-005. Re-run with QID-list output required. |

### 5.2 Emergency Override

In extraordinary circumstances (e.g., known false-positive rate exceeds threshold), a specific scan can be marked SKIP with documented justification in the scan registry. This is logged as a governance event and requires governance administrator approval at session close.

## 6. Governance Integration

### 6.1 New Governance Guard Rules

| Rule | Level | Description |
|------|-------|-------------|
| RULE 6 | HARD_BLOCK | Pre-Flight Gate Mandatory. No item may transition to In Audit until all gate scans produce PASS or MINOR_FIX classification. |
| RULE 7 | HARD_BLOCK | ExplanationWrong Completeness. All non-CorrectChoice ExplanationWrong slots must be present and non-empty for any item entering In Audit. |
| RULE 8 | HARD_BLOCK | Anti-Boilplate. No ExplanationWrong field may contain DL-013 template boilerplate for any item entering In Audit. |

### 6.2 Drift Detection

At session Tmid (~30 min), re-run Gate 1 scans. Compare to T0 artifacts. If any item's structural defect count changed (new DL-008 appeared, existing DL-026 resolved) → the certification pipeline must halt until the delta is reconciled. This prevents the DL-019 class of concurrent-write overwrites.

## 7. Implementation Roadmap

| Session | Deliverable |
|---------|------------|
| S203 | Engineering specifications (this document + SCAN_ENGINE_SPEC.json) |
| S204 | Scan engine implementation — write all 15 scan modules + orchestrator |
| S205 | Gate 1-2 scans operational, governance guard Rules 6-8 deployed |
| S206 | Gate 0 + Gate 4 scans operational |
| S207 | Full pipeline integration test with pack-file evidence |
| S830 | Phase 1 gate: readiness failure ≥50% improved (BF-004), identity ambiguity eliminated |

---

*Generated 2026-07-27. S203 Scan Orchestration specification closed. Handoff to S204 for scan engine implementation.*
