# Session 101P — Section Dependencies & Parallel-Safety Map

**Date:** 2026-07-31
**Session Type:** Read-Only Planning (Governance Light Lane)
**Reference:** `reports/SESSION101P_RECLASSIFICATION_BATCHES.json`, `reports/SESSION101P_EXECUTION_PLAN.md`

---

## 1. Section Dependency Graph

### 1.1 Dependency Types

| Symbol | Meaning |
|--------|---------|
| `→` | Must complete before (hard dependency — shared pack file or cumulative verification) |
| `⇢` | Should complete before (soft dependency — logical order, not file-locked) |
| `∥` | Parallel-safe (different pack files, zero overlap) |

### 1.2 Full Dependency Map

```
PHASE_0: Structural Defects
  PH0-B1 (Pack D FD)
    ↓ (blocker — must resolve before any HO reporting)
    
PHASE_1: Order-of-Magnitude
  PH1-B1 (Pack C EC)           ∥  PH1-B2 (Pack D CD/DD + Pack A Section A)
    ↓ soft dependency                ∥ (different packs, parallel-safe)
    └─→ PH2-B3 needs EC data      └─→ PH2-B4 needs Pack A Section A data
    
PHASE_2: One-Tier Slippage
  PH2-B1 (Pack D BD)            ∥  PH2-B4 (Pack A Sections C/D/E)
    ↓ same pack, same session       ∥ (different packs)
  PH2-B2 (Pack D BD+ED)         ∥
    ↓ same pack                  ∥
  PH2-B3 (Pack D ED + Pack C CC/DC)
    ↓ requires EC data from PH1-B1
    └─→ Pack D ED completes after PH2-B2
    └─→ Pack C CC/DC independent
    
PHASE_3: Verification
  PH3-B1 (Pack A Section B)     ∥  PH3-B3 (Pack D BD verify)
    ∥                              ∥
  PH3-B2 (Pack A Sections F+B)  ∥  PH3-B4 (Pack D BD+FD + Pack C FC)
    ∥                              ∥
  PH3-B5 (Pack B — all)         ∥  PH3-B6 (Pack E — first half)
    ∥ (different pack)             ∥ (different pack)
    
PHASE_4: Semantic Review
  PH4-B1 (Pack E — remaining)   ∥  PH4-B2 (All packs — AF-1 ceiling)
    ↓ same pack                     ∥
    └─→ requires PH3-B6 completion  ∥  PH4-B3 (Borderline items)
                                     ∥ (cross-pack but read-only)
```

### 1.3 Simplified Execution Map

```
Session 102P (Full Lane):
  PH0-B1 → PH1-B1 ∥ PH1-B2
  (3 batches, 59 items, 2 packs)

Session 103P (Full Lane):
  PH2-B1 → PH2-B2 → PH2-B3 → PH2-B4
  (4 batches, 90 items, 3 packs)

Session 104P (Full Lane):
  PH3-B1 ∥ PH3-B2 ∥ PH3-B3 ∥ PH3-B4 ∥ PH3-B5 ∥ PH3-B6
  (6 batches, 150 items, all 5 packs)

Session 105P (Full Lane):
  PH4-B1 ∥ PH4-B2 ∥ PH4-B3
  (3 batches, 89 items, cross-pack)
```

---

## 2. Per-Pack Contention Analysis

### 2.1 Pack Access Map

| Batch | Pack A | Pack B | Pack C | Pack D | Pack E |
|-------|--------|--------|--------|--------|--------|
| PH0-B1 | — | — | — | **FD** | — |
| PH1-B1 | — | — | **EC** | — | — |
| PH1-B2 | **A** | — | — | **CD, DD** | — |
| PH2-B1 | — | — | — | **BD** | — |
| PH2-B2 | — | — | — | **BD, ED** | — |
| PH2-B3 | — | — | **CC, DC** | **ED** | — |
| PH2-B4 | **C, D, E** | — | **DC** | — | — |
| PH3-B1 | **B** | — | — | — | — |
| PH3-B2 | **F, B** | — | — | — | — |
| PH3-B3 | — | — | — | **BD** | — |
| PH3-B4 | — | — | **FC** | **BD, FD** | — |
| PH3-B5 | — | **All** | — | — | — |
| PH3-B6 | — | — | — | — | **All** |
| PH4-B1 | — | — | — | — | **All** |
| PH4-B2 | Cross-pack (read-only: identify items) | | | | |
| PH4-B3 | Cross-pack (read-only: borderline review) | | | | |

### 2.2 No Single-Session Pack Contention

Within a single session, no pack file is edited by more than one batch concurrently (each batch completes before the next starts, per serial batch execution protocol). The batch execution order within each session is serial, not parallel.

**Cross-session contention:** Only Pack D is touched in both S102P (PH1-B2) and S103P (PH2-B1 through PH2-B3). This is safe because sessions are sequential, not concurrent.

---

## 3. External Lane Interactions

### 3.1 Content Modernization (Session 92 — Pack B Section B)

| Interaction Point | Resolution |
|-------------------|------------|
| S92 edits Pack B Section B content (stems, choices, explanations) | S103P-S104P batch PH3-B5 performs metadata-only CognitiveLevel changes on Pack B. |
| S92 may change the cognitive complexity of items (rewriting stems to be more analytical) | PH3-B5 should run AFTER S92 completes. If S92 upgrades items to genuine HO, those items need re-verification against the S95P rubrics. |
| **Recommendation:** Run PH3-B5 (Pack B) LAST in PHASE_3 — after S92 completes. Alternatively, skip BB items that S92 is actively modifying. | No conflict if sequenced correctly. |

### 3.2 May Coaching Layer (MAY-023)

| Interaction Point | Resolution |
|-------------------|------------|
| May reads CognitiveLevel for coaching hint generation | Relabeling items from Evaluate→Apply will adjust May's coaching strategy for those items. This is a DESIRABLE side effect — May will give more appropriate hints. |
| May telemetry dashboards show HO item counts | Post-relabeling, May's HO count will be lower and more accurate. May dashboards should be recalibrated post-S106P. |
| **No blocker.** May coaching adapts to metadata changes naturally. | Parallel-safe in all phases. |

### 3.3 Certification Automation (S97P Engine)

| Interaction Point | Resolution |
|-------------------|------------|
| S97P gate engine flags items for AF conditions | PHASE_1 and PHASE_2 batches directly consume S97P gate results. The AF signals determine which items get which corrected label. |
| S97P engine runs against current file state | If pack files have drifted since S97P ran, re-run the engine at T0 of S102P before any writes. |
| **Minor dependency.** Re-run S97P gate scan at S102P T0 if >24 hours elapsed since S100P. | Documented in batch protocol §4.2, Step 2. |

---

## 4. File-Lock Protocol

### 4.1 Per-Batch File Locking

Each batch targets exactly ONE pack file. The batch execution protocol ensures:

1. Only one batch writes to a pack file at a time (serial execution within a session)
2. No two sessions write to the same pack file concurrently
3. Batch writes are atomic: complete the batch, validate, then move to next batch

### 4.2 Cross-Session Coordination

| Session | Packs Written | Next Session Must Wait For |
|---------|--------------|---------------------------|
| S102P | Pack C, Pack D, Pack A | — (first write session) |
| S103P | Pack C, Pack D, Pack A | S102P completion + preflight pass on all 3 packs |
| S104P | All 5 packs | S103P completion + preflight pass on all 3 packs from S103P |
| S105P | Pack E (+ cross-pack writes from semantic review) | S104P completion + preflight pass on all 5 packs |

---

## 5. Section Readiness by Priority

### 5.1 Ready Now (No Dependencies)

These sections can be executed immediately in S102P:

| Section | Reason |
|---------|--------|
| Pack C EC | S96P pilot complete. Full per-item audit available. High confidence. |
| Pack D CD | 100% Analyze misclassification. Unambiguous definition-matching. |
| Pack D DD | 100% Analyze misclassification. Unambiguous definition-matching. |
| Pack A Section A | ASC rules are deterministic. High AF-3 signal. |

### 5.2 Ready After P0 (Dependent on P0 Completion)

| Section | Dependency |
|---------|------------|
| Pack D BD | PH1-B2 clears adjacent sections. BD verification requires CD/DD baseline. |
| Pack D ED | PH2-B2 clears BD first. COSO items benefit from EC pilot learnings. |
| Pack C CC/DC | PH1-B1 (EC) provides pilot methodology for Pack C items. |

### 5.3 Ready After P1 (Dependent on Methodology Stability)

| Section | Dependency |
|---------|------------|
| Pack A Sections C/D/E | Residual — wait for methodology to stabilize on Pack A Section A first. |
| Pack B all sections | Different pipeline. PH3-B5 should wait until Pack A/C/D methodology is proven. |
| Pack E all sections | Different pipeline + R-series. PH3-B6 should wait until all other packs are stable. |

---

## 6. Dependency Resolution Summary

```
PHASE_0 (CRITICAL BLOCKER):
  Must complete first — blocks accurate HO pool reporting.
  
PHASE_1 (IMMEDIATE):
  Can run in parallel with itself (different packs).
  No external dependencies.
  
PHASE_2 (HIGH):
  Requires PHASE_1 completion for methodology stability.
  Pack C CC/DC requires Pack C EC pilot learnings.
  
PHASE_3 (MEDIUM):
  Requires PHASE_2 completion for Pack D items.
  Pack A Section B verification benefits from Section A relabeling completion.
  Packs B and E should run last (different pipelines).
  
PHASE_4 (LOW):
  Semantic review can be deferred — automated batches complete independently.
  Can run in parallel with post-execution verification (S106P).
```

---

*Generated: 2026-07-31 | Session 101P — Dependencies Phase*
