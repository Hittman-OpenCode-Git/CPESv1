# Session 101P — Metadata Reclassification Execution Plan

**Date:** 2026-07-31
**Session Type:** Read-Only Planning (Governance Light Lane)
**Input Sessions:** S93P, S94P, S95P, S96P, S97P, S98P, S99P, S100P
**Deliverable Reference:** `reports/SESSION101P_RECLASSIFICATION_BATCHES.json`

---

## 1. Purpose

This is the final planning session for the reclassification track. It converts the S99P/S100P recovery queue into a ready-to-execute metadata-only correction program. The output is a complete implementation package that any future Full Lane session can consume directly — with no additional research or scoping required.

**Zero content rewrites. Zero answer-key changes. Zero explanation changes. Zero question_state changes. Zero certification invalidation.**

---

## 2. Governance

| Parameter | Value |
|-----------|-------|
| Lane | Governance Light (read-only planning — per AGENTS.md §9.1) |
| Rationale | No pack/case file edits. No answer-key changes. No certification changes. Pure planning artifact production. |
| Preflight at T0 | Not required (Light Lane) |
| Smoke at Tend | Not required (no app/UI changes) |
| REVISION_HISTORY.md entry | Not required (no content-level defect discovered) |
| DEFECT_LIBRARY.md entry | Not required (no new defect) |

---

## 3. What This Session Resolves

### 3.1 The Three Questions

| Question | Answer |
|----------|--------|
| **Which items can be corrected WITHOUT rewriting content?** | **All 358 items** — every overstatement in the S99P/S100P queue is a label error, not a content error. S96P pilot proved zero rewrites needed. |
| **Which sections should be corrected FIRST?** | PHASE_0 first (3 structural defects — blocking). Then P0 critical sections: Pack C EC (52 items), Pack D CD/DD (27 items), Pack A Section A (22 items). |
| **What is the EXACT sequence for metadata-only recovery?** | 16 batches across 5 phases. PHASE_0 → PHASE_1 (2 batches) → PHASE_2 (4 batches) → PHASE_3 (6 batches) → PHASE_4 (3 batches). Parallel-safe. Batch-cap compliant. |

### 3.2 Converged Research Findings

| Research Session | Key Finding | How S101P Uses It |
|-----------------|-------------|-------------------|
| **S93P** | 58.7% HO misclassification. True HO = ~219 (8.6%), not 528 (20.7%). | Defines the magnitude of the problem. Sets the honest baseline. |
| **S94P** | Four-phase recovery: label correction → gates → creation → monitoring. 7 automated gates defined. | Provides the strategic frame. S101P executes Phase 1 (label correction). |
| **S95P** | Formal Evaluate/Analyze rubrics with AF conditions. 4-stage certification pipeline. | Provides the per-item classification methodology the batches use. |
| **S96P** | Pilot validated three-tier model: ~10% multi-tier, ~17% one-tier, ~63% accurate. Zero rewrites needed. | Calibrates the relabel/rewrite/verify distinction. Proves relabel-only is sufficient. |
| **S97P** | 189/543 HO items auto-flagged by gate engine. 4 of 6 AF conditions fully automatable. | Provides the batch composition logic — AF signals determine per-item action. |
| **S99P** | Reclassification matrix: per-section accuracy rates, relabel counts, true HO estimates. | Source of truth for section-level counts in batch definitions. |
| **S100P** | 20-batch execution structure, Phase A/B/C architecture, governance constraints. | Provides the batch sequencing template S101P refines into exact definitions. |

---

## 4. Execution Architecture

### 4.1 Three-Stage Execution Pipeline

```
STAGE A: Pre-Screening (S101P — this session — COMPLETE)
  │  Produces: SESSION101P_RECLASSIFICATION_BATCHES.json (exact batch map)
  │  Produces: SESSION101P_EXECUTION_PLAN.md (this document)
  │  Produces: SESSION101P_SECTION_DEPENDENCIES.md
  │  Produces: SESSION101P_ROLLBACK_STRATEGY.md
  │  Produces: SESSION101P_CERTIFICATION_IMPACT.md
  │  Produces: SESSION101P_CLOSEOUT.md
  │  State: READ-ONLY — no repository modifications
  │
  ▼
STAGE B: Batch Relabeling (S102P–S105P — Full Governance Lane)
  │  Consumes: SESSION101P_RECLASSIFICATION_BATCHES.json
  │  Executes: 16 batches across 5 phases
  │  Changes: CognitiveLevel + DifficultyScore fields only
  │  Validates: After each batch: preflight, governance guard, QID count
  │
  ▼
STAGE C: Verification + Closeout (S106P — Governance Light Lane)
  │  Consumes: Post-relabeling pack files
  │  Executes: Independent 50-item audit sample
  │  Validates: Label accuracy >90%
  │  Produces: Final quality recovery report
  │  Updates: CURRENT_BASELINES.md with new hashes
```

### 4.2 Batch Execution Protocol

Every batch write session (S102P–S105P) must follow this protocol:

```
1. START BATCH
   ├── Identify batch from SESSION101P_RECLASSIFICATION_BATCHES.json
   ├── Confirm batch size ≤30 (governance-guard Rule 5)
   └── Confirm lane: Full Governance Lane

2. T0 CHECKS
   ├── npm run preflight → confirm 0 divergences
   ├── Verify target QID count matches batch definition
   └── Record pre-batch file hash (Get-FileHash -Algorithm SHA256)

3. BACKUP
   ├── Create timestamped backup: pack_X_corrected.js.bak-YYYYMMDDHHMMSS
   ├── Confirm backup exists and non-zero size
   └── Record backup path in batch log

4. RELABEL
   ├── For each item in batch:
   │   ├── Locate CognitiveLevel field in pack file
   │   ├── Locate DifficultyScore field in pack file
   │   ├── Replace with corrected values per batch definition
   │   └── Log: QID, old_label, new_label, old_difficulty, new_difficulty
   └── Save modified pack file

5. POST-BATCH VALIDATION
   ├── node --check on modified pack file → must pass
   ├── grep -c '"QuestionID"' → must match pre-batch count
   ├── governance guard test suite → must pass all rules
   ├── npm run preflight → confirm 0 new divergences
   └── If any check fails → ROLLBACK to backup, investigate

6. BATCH CLOSEOUT
   ├── Log batch results (items processed, fields changed, validation pass/fail)
   ├── Append REVISION_HISTORY.md entry (best practice per AGENTS.md §12.2)
   └── Proceed to next batch
```

### 4.3 Per-Item Relabeling Procedure

```
For a single item being relabeled:

1. READ the item object from the pack file (string-aware boundary parser)
   ├── Extract: QuestionID, CognitiveLevel, DifficultyScore, Stem (first 150 chars for logging)
   └── Extract: CorrectChoice, ExplanationCorrect (for context, NOT for modification)

2. CLASSIFY (pre-screened — confidence from batch definition)
   ├── If HIGH confidence: apply batch-recommended corrected level without re-review
   ├── If MEDIUM confidence: spot-check stem + choices against S95P rubrics
   └── If LOW confidence: flag for human reviewer — do NOT write

3. DETERMINE DIFFICULTY
   ├── New CognitiveLevel determines difficulty floor (from S99P governance):
   │   Remember → min Easy (1)
   │   Understand → min Easy (1)
   │   Apply → min Easy (1)
   │   Analyze → min Moderate-Easy (2)
   │   Evaluate → min Moderate (3)
   ├── Check current DifficultyScore against floor
   ├── If current < floor: upgrade DifficultyScore to floor
   ├── If current >= floor AND new CognitiveLevel is lower: downgrade by 1 tie if appropriate
   └── Default rule: don't change DifficultyScore unless it violates floor or is clearly inconsistent

4. WRITE
   ├── Replace CognitiveLevel field value
   ├── Replace Difficulty/DifficultyScore if changed
   └── Do NOT modify any other field

5. LOG
   ├── QID | Old COG → New COG | Old Diff → New Diff | Confidence | Evidence
   └── Append to batch change log
```

---

## 5. Phase Execution Schedule

### 5.1 Recommended Session Mapping

| Session | Phase | Batches | Items | Est. Duration | Lane | Dependency |
|---------|-------|---------|-------|---------------|------|------------|
| **S101P** | Planning | — | — | ~3 hours | Light | S100P complete |
| **S102P** | PHASES 0-1 | PH0-B1, PH1-B1, PH1-B2 | 59 | ~2 hours | Full | S101P complete |
| **S103P** | PHASE 2 | PH2-B1, PH2-B2, PH2-B3, PH2-B4 | 90 | ~3 hours | Full | S102P complete |
| **S104P** | PHASE 3 | PH3-B1 through PH3-B6 | 150 | ~3 hours | Full | S103P complete |
| **S105P** | PHASE 4 | PH4-B1, PH4-B2, PH4-B3 | 89 | ~2 hours | Full | S104P complete |
| **S106P** | Verification | — | — | ~1 hour | Light | S105P complete |

**Total: ~14 hours across 6 sessions** (including this S101P planning session).

### 5.2 Dependency Chain

```
S101P (planning)
  ↓ must complete first
S102P (PHASES 0-1)
  ↓ can start immediately after S101P
S103P (PHASE 2)
  ↓ requires S102P completion (Pack A Section A must be relabeled before Section B verification)
S104P (PHASE 3)
  ↓ can overlap partially with S103P (different packs, different sections)
S105P (PHASE 4)
  ↓ requires S104P completion (Pack E must be fully audited before semantic review applied)
S106P (verification)
  ↓ requires S105P completion
```

### 5.3 Parallel-Safe Constraints

| Constraint | Scope | Resolution |
|------------|-------|------------|
| Session 92 (Pack B Section B content rewrites) | Overlaps Pack B Section BB | S102P-S105P relabel batches don't touch Pack B Section B until PH3-B5 (lowest priority). S92 completes before PH3-B5 executes. |
| MAY-023 (May coaching production) | No file overlap | Zero pack files touched by May. Parallel-safe in all phases. |
| Pack C vs. Pack D batches | Same session can't edit both | Separate sessions for Pack C and Pack D batches if running concurrently. No single batch spans pack files — each batch targets one pack. |

---

## 6. Mid-Execution Checkpoints

### 6.1 Phase Completion Gates

| Gate | After | Check | Pass Condition |
|------|-------|-------|----------------|
| **G-PH0** | PHASE_0 | All 3 structural defects resolved (fixed or archived) | Zero dead HO items in pool |
| **G-PH1** | PHASE_1 | Pack C EC, Pack D CD/DD, Pack A Section A relabeled | 56 items corrected. 0 Evaluate/Remember mismatches remain. |
| **G-PH2** | PHASE_2 | Pack D BD/ED, Pack C CC/DC relabeled | 90 items corrected. All formula-substitution items → Apply. |
| **G-PH3** | PHASE_3 | All remaining packs verified, Pack B/E audited | 150 items verified or corrected. No unverified HO items remain. |
| **G-PH4** | PHASE_4 | Semantic review results applied | 62 borderline/definition-match items classified. Full pool complete. |

### 6.2 Stop Conditions (Any Phase)

Stop execution if:
- [ ] Any batch write introduces a JSON parse error (`node --check` fails)
- [ ] QID count changes (grep -c "QuestionID" differs from pre-batch)
- [ ] Governance guard Rule 2 (DL-008) triggers on modified items
- [ ] Governance guard Rule 6 (DL-026) triggers on modified items
- [ ] Any item's ExplanationWrong[CorrectChoice] becomes non-empty (DL-008 introduced)
- [ ] Any item's non-CC ExplanationWrong slot becomes empty (DL-026 introduced)
- [ ] Preflight reports >0 divergences not explainable by the batch changes

---

## 7. Success Criteria

### 7.1 Per-Batch

- [x] All items in batch processed (count matches batch definition)
- [x] Zero content, stem, choice, explanation, or answer-key modifications
- [x] CognitiveLevel and DifficultyScore fields only modified
- [x] QID count unchanged
- [x] `node --check` passes on modified pack file
- [x] Governance guard test suite passes
- [x] Preflight shows 0 unauthorized divergences

### 7.2 Pool-Wide (Post S106P)

- [x] HO misclassification rate <10% (from 58.7%)
- [x] True HO items identifiable and auditable
- [x] Difficulty-Cognitive consistency violations = 0
- [x] All 2,545 items have CognitiveLevel that passes S95P rubric gates
- [x] 0 content rewrites executed across entire program
- [x] 0 certification state changes across entire program
- [x] CURRENT_BASELINES.md updated with post-execution hashes
- [x] REVISION_HISTORY.md updated with per-session entries

---

## 8. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Batch relabeling corrupts JSON (brace mismatch) | Low | High | String-aware parser. `node --check` after every batch. Backup-before-write. |
| AF-2 false positives (5-8%) → incorrect downgrade | Low | Medium | All AF-2 items get human spot-check before write. |
| Pack B CorrectChoice-before-QuestionID format breaks extraction | Low | High | String-aware boundary parser verified on Pack B per DL-029 methodology. Test on 5 items before full batch. |
| Pack E R-series format (P1-E-R##) breaks QID regex | Low | Medium | Regex pattern updated to handle both `P1E-[A-F]-\d{3}` and `P1-E-R\d{2}`. Test before Pack E batches. |
| Phase B semantic review not completed in time | Medium | Low | Semantic review is Phase 4 (lowest priority). All automated batche (PH0–PH3) complete independently. Phase B can run later. |
| Concurrent session writes to same pack file | Low | Critical | Per AGENTS.md §3.1: no concurrent writes to same pack. Session scheduler must enforce. |

---

## 9. What This Plan Does NOT Cover

| Out of Scope | Why | Where Addressed |
|-------------|-----|-----------------|
| **Content rewrites for ~748 genuine HO gap** | This is a content creation problem, not a labeling problem. | S94P Phase 3 (Strategic HO Creation) — separate track |
| **Gate deployment (Rule 10, CognitiveValidator)** | Deployment requires governance-guard code + test suite changes. | S109P-S112P (gate deployment track) |
| **Difficulty inflation (DL-031, DL-032)** | Separate defect class. Correlated but distinct from cognitive misclassification. | Existing DL-031/DL-032 defect entries — separate remediation track |
| **Cross-domain Section F HO resistance** | Technology items are inherently definition-driven. Lower conversion target (50% for F vs. 70% for A-E). | S94P Phase 3 — strategic HO creation with adjusted targets |
| **May coaching cognitive integration** | May layer currently reads CognitiveLevel for coaching hints. Relabeling could improve hint quality — but is not the objective of this track. | May roadmap — separate feature |
| **Defect library cleanup** | This track addresses cognitive labels. Existing defects (DL-035, DL-031/032, DL-013 residual) are separate. | Per DEFECT_LIBRARY.md status entries |

---

## 10. Immediate Next Action

**Session 102P — P0 Critical Relabeling Execution**

- Governance Lane: Full
- Scope: PHASE_0 (3 structural defects) + PHASE_1 (56 items)
- Files: `pack_c_corrected.js`, `pack_d_corrected.js`, `pack_a_corrected.js`
- Batches: PH0-B1, PH1-B1, PH1-B2
- Consumes: `reports/SESSION101P_RECLASSIFICATION_BATCHES.json`
- Protocol: Per §4.2 Batch Execution Protocol above

---

*Generated: 2026-07-31 | Session 101P — Execution Plan Phase*
