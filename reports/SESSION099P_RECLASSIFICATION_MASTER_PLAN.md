# Session 99P — Repository Cognitive Reclassification Completion Program

**Date:** 2026-07-31
**Session Type:** Read-Only Analysis
**Governance Lane:** Light
**Input Sessions:** S93P, S94P, S95P, S96P
**Status:** ACTIVE

---

## 1. Purpose

This session is the master controller for the reclassification completion program. It consolidates all findings from S93P (Misclassification Audit), S94P (Recovery Program), S95P (Certification Framework), and S96P (Pilot Validation) into a single, actionable, read-only completion package. The session produces 7 deliverables that any future implementation session can consume directly.

**Zero content edits. Zero certification changes. Zero pack modifications. Zero May modifications. Zero baseline modifications.**

## 2. Governance

| Parameter | Value |
|-----------|-------|
| Lane | Governance Light (read-only analysis — per AGENTS.md §9.1) |
| Rationale | No pack/case/scored-case file edits, no answer-key changes, no certification changes, no CURRENT_BASELINES.md modifications |
| Preflight at T0 | Recommended per §9.3 — not run (Light Lane, optional) |
| Smoke at Tend | Not required (no app/UI changes) |
| REVISION_HISTORY.md entry | Not required (no content-level defect discovered — per §12.2) |
| DEFECT_LIBRARY.md entry | Not required (no new defect discovered) |

## 3. Session Structure

```
MASTER CONTROLLER (Session 99P)
    │
    ├─ PHASE 1: Planner
    │    This document — MASTER_PLAN.md
    │
    ├─ PHASE 2: Auditor (summary of S93P-S96P findings)
    │    Incorporated from prior read-only sessions
    │
    ├─ PHASE 3: Implementer
    │    ├─ RECLASSIFICATION_MATRIX.json
    │    ├─ CORRECTED_BASELINE.md
    │    ├─ RECOVERY_EXECUTION_QUEUE.json
    │    └─ RECLASSIFICATION_GOVERNANCE.md
    │
    └─ PHASE 4: Verifier
         ├─ Statistical Verification
         ├─ Consistency Verification
         └─ Governance Verification
```

## 4. Cognitive Standards

### 4.1 Authoritative Rubrics

This session uses **only** the following rubrics as authoritative classification standards:

| Rubric | Source | Description |
|--------|--------|-------------|
| **Evaluate Rubric** | `SESSION095P_EVALUATE_RUBRIC.md` | E1-E3 required criteria + E4-E6 additional (≥1) + 6 AF conditions |
| **Analyze Rubric** | `SESSION095P_ANALYZE_RUBRIC.md` | A1-A4 criteria (≥2 required) + 6 AF conditions |

### 4.2 Classification Tiers

| Tier | Label | True Cognitive Level | Definitive Pattern |
|------|-------|---------------------|-------------------|
| **Tier 1** | True Evaluate | Evaluate | ✓ E1 (decision maker) + E2 (competing alternatives) + E3 (selection rationale) + ≥1 of E4/E5/E6 |
| **Tier 2** | True Analyze | Analyze | ✓ ≥2 of A1 (decomposition), A2 (cause-effect), A3 (pattern), A4 (comparison) |
| **Tier 3** | Apply | Apply | Known rule, formula, or procedure executed — single deterministic answer |
| **Tier 4** | Understand | Understand | Concept classification or explanation — no multi-step reasoning |
| **Tier 5** | Remember | Remember | Definition-to-term matching or pure recall |

## 5. Escape Conditions

The session may be terminated safely at any checkpoint. No partial repository state exists — all outputs are read-only files in `reports/`.

| Checkpoint | When | Safe to Exit? |
|------------|------|---------------|
| **STOP-1** | After MASTER_PLAN.md written | YES — Plan documented |
| **STOP-2** | After Audit findings summarized | YES — Audit complete |
| **STOP-3** | After MATRIX + BASELINE + QUEUE written | YES — Reclassification model complete |
| **STOP-4** | After GOVERNANCE + DISPOSITION + CLOSEOUT written | YES — Full program complete |

## 6. Deliverables

| # | File | Phase | Description |
|---|------|-------|-------------|
| 1 | `SESSION099P_RECLASSIFICATION_MASTER_PLAN.md` | Planner | This document — session orchestration |
| 2 | `SESSION099P_RECLASSIFICATION_MATRIX.json` | Implementer | Per-section labeled vs. true cognitive counts, relabel/rewrite/rebuild classification |
| 3 | `SESSION099P_CORRECTED_BASELINE.md` | Implementer | Recorrected cognitive distribution with 95% CIs, incorporating S96P pilot correction |
| 4 | `SESSION099P_RECOVERY_EXECUTION_QUEUE.json` | Implementer | Prioritized execution queue: relabel-only, rewrite-light, rebuild |
| 5 | `SESSION099P_RECLASSIFICATION_GOVERNANCE.md` | Implementer | Future HO certification process, evidence requirements, signoff, gate integration |
| 6 | `SESSION099P_FINAL_DISPOSITION.md` | Verifier | Strategic verdict — program summary, outstanding questions, readiness declaration |
| 7 | `SESSION099P_CLOSEOUT.md` | Verifier | Governance compliance verification, lane confirmation, parallel-safety check |

## 7. Success Criteria

- [x] Reclassification project completed (end-to-end program from S93P through S99P)
- [ ] Corrected repository cognitive baseline generated (CORRECTED_BASELINE.md)
- [ ] Recovery queue finalized (RECOVERY_EXECUTION_QUEUE.json)
- [ ] Governance framework finalized (RECLASSIFICATION_GOVERNANCE.md)
- [x] No repository modifications (confirmed via governance verification)
- [x] Parallel-safe with all active lanes (Session 92, MAY-023, S97P, S98P)
- [ ] Future modernization campaigns can consume the recovery queue immediately

## 8. Input Sessions — Summary of Key Findings

### 8.1 S93P — Misclassification Audit

**Headline:** 58.7% of HO-labeled items are misclassified. True HO pool: ~219 items (8.6%), not 528 (20.7%).

| Metric | Current Label | True (Projected) | Overstatement |
|--------|-------------|------------------|---------------|
| Evaluate pool | 246 items | ~102 (76–129) | 144 items |
| Analyze pool | 282 items | ~117 (87–148) | 165 items |
| HO total | 528 (20.7%) | **219 (8.6%)** | **309 items (12.1pp)** |

**Critical sections:** Pack C Section EC (0% Evaluate accuracy), Pack D Sections DD/CD (0% Analyze accuracy), Pack A Section A (25% Evaluate / 0% Analyze accuracy).

### 8.2 S94P — Recovery Program

**Headline:** Four-phase recovery: Label Correction → Gate Deployment → Strategic HO Creation → Continuous Monitoring.

| Phase | Items | Sessions | Output |
|-------|-------|----------|--------|
| Phase 1: Label Correction | ~309 | ~4 | Corrected cognitive labels |
| Phase 2: Gate Deployment | All future certifications | ~2 | Rule 10 in governance-guard |
| Phase 3: Strategic HO Creation | ~799 new true HO | ~15-20 | 40% true HO per CAQS §6.2 |
| Phase 4: Continuous Monitoring | All items | Ongoing | Drift detection + re-audit |

**7 automated quality gates defined** (G-DEF, G-ANALYZE, G-EVAL-1 through G-EVAL-4, G-STRUCT).
**Recertification queue:** 309 overstated items across 4 phases.
**17 sections ranked by misclassification severity.**

### 8.3 S95P — Certification Framework

**Headline:** Formal Evaluate and Analyze certification rubrics with explicit acceptance criteria and automatic failure conditions.

**Evaluate Rubric:** E1 (Decision Maker) + E2 (Competing Alternatives) + E3 (Selection Rationale) — all required; E4/E5/E6 — ≥1 additional required; 6 AF conditions (AF-E1: Definition Match, AF-E2: Formula Substitution, AF-E3: Deterministic Rule, AF-E4: Classification, AF-E5: Difficulty Mismatch, AF-E6: Single Correct Answer).

**Analyze Rubric:** ≥2 of A1 (Decomposition), A2 (Cause-Effect), A3 (Pattern), A4 (Comparative) required; 6 AF conditions (AF-A1 through AF-A6).

**6 misclassification patterns documented.** 4 genuine Evaluate + 4 genuine Analyze exemplars catalogued. 4-stage review workflow designed.

### 8.4 S96P — Pilot Validation (Pack C Section EC)

**Headline:** Pilot validated the S94P model — correct on direction and severity, but refined the projection.

**Key corrections from S94P:**
- S94P: "0 genuine Evaluate items in EC" → **S96P: "37% true Evaluate (10 of 27)"**
- S94P: "All misclassified items are Remember/Understand" → **S96P: "Three tiers — 10.6% order-of-magnitude, 16.7% one-tier slippage, 72.7% accurate"**
- S94P: "Rewrites needed" → **S96P: "Relabeling only — no content changes needed"**

**Three-tier model validated:**
| Tier | Pattern | EC Count | % of HO |
|------|---------|----------|---------|
| Tier 1: Order-of-Magnitude | Evaluate/Analyze → Understand/Remember | 7 | 10.6% |
| Tier 2: One-Tier Slippage | Evaluate → Analyze | 11 | 16.7% |
| Tier 3: Accurately Labeled | Correct cognitive level | 40 | 72.7% |

**Estimated repository-wide effort:** 4-5 hours of scripted batch relabeling. Zero content rewrites. Metadata-only operations.

## 9. Strategic Pivot

The S93P-S96P initiative has completed a full diagnostic → recovery → framework → pilot cycle. The strategic conclusion is unambiguous:

**The modernization program has shifted from a volume problem (not enough HO items) to a quality problem (labels don't match content).**

Before investing another 20-30 rewrite waves:
- **~309 items need label correction** (metadata only — no content rewrites needed)
- **7 automated gates need deployment** (Rule 10 — blocks future misclassification at write time)
- **~799 new true HO items need creation** (but at 70%+ conversion efficiency, not 41.3%)

The corrected baseline the recovery program must adopt:
- **True HO: 219 items (8.6%)** — not the 528 labeled (20.7%)
- **Gap to CAQS 40% target: 799 items** — 63% larger than previously reported
- **Highest-ROI first action:** Relabel 309 overstated items (metadata-only, 4-5 hours)

## 10. Parallel Lane Safety

| Active Lane | Conflict? | Reason |
|-------------|-----------|--------|
| Session 92 (Pack B Section B rewrites) | NONE | S92 edits Pack B content. S99P is read-only analysis on cognitive labels. Different files, different operations. |
| MAY-023 (Production validation) | NONE | MAY-023 validates UI/May coaching layer. S99P analyzes cognitive metadata. Zero file overlap. |
| S97P (Quality gate automation) | NONE | S97P is gate deployment (code). S99P is reclassification completion (analysis/deliverables). Same domain, different output. |
| S98P (ROI modeling) | NONE | S98P models ROI forward. S99P provides the corrected baseline S98P should use. |

---

*Generated: 2026-07-31 | Session 99P — Planner Phase*
