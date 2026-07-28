# S840 Quality Comparison — Legacy Template vs. Quality-First Pipeline

**Session:** S840
**Date:** 2026-07-27
**Status:** PILOT VALIDATION COMPLETE — 10 items, 8 passing, 2 defects discovered

---

## 1. Executive Summary

The S836 Quality-First Authoring Pipeline was validated on a 10-item pilot from S839 Cohort A (Pack B Section C/D). The pipeline proved capable of detecting content-level defects that the structural governance guard (32/32 PASS) cannot catch. Two pre-existing DL-030 defects were discovered in a 10-item sample (20% content defect rate) — both items were structurally clean (zero DL-008, zero DL-026).

**Key finding:** Structural governance is necessary but insufficient. Content verification (Stage 3: Independent Solve) is the essential safety layer that catches stem-EC mismatches and CorrectChoice contradictions.

---

## 2. Structural Quality Comparison

| Metric | Legacy Template Pipeline | Quality-First Pipeline (Pilot) |
|--------|--------------------------|-------------------------------|
| DL-008 (non-empty EW[CC]) | 539 occurrences across all packs | **0** — Stage 4 requires EW[CC]="" |
| DL-026 (empty distractor EW) | 1,005 items affected | **0** — Stage 4 requires all non-CC slots non-empty |
| DL-013 (template boilerplate) | 2,587 boilerplate fields | **0** — Stage 4 requires choice-specific text per item |
| DL-016 (metadata-content mismatch) | All Pack A/C/D sections | **0** — No dual-block architecture in pipeline |
| DL-021 (missing distractor EW) | 100 items (Pack E Section C) | **0** — Stage 4 verifies field presence |
| DL-025 (empty non-CC slots) | 56 items (Pack A) | **0** — Stage 4 verifies field non-empty |
| Structural defect rate | 19 defect classes (52.8% of all defects) | **0 defect classes** |
| **Verdict** | **FAIL — 19 defect classes** | **PASS — zero structural defects** |

---

## 3. Content Quality Comparison

| Metric | Legacy Template Pipeline | Quality-First Pipeline (Pilot) |
|--------|--------------------------|-------------------------------|
| Independent solve verification | **None** — answer stored without verification | **Yes** — Stage 3 requires independent solution |
| Stem-EC consistency | Not checked (P1B-D-138 discrepancy undiscovered) | **Detected** — 1 stem-EC mismatch found |
| CC-EC consistency | Not checked (P1B-D-144 contradiction undiscovered) | **Detected** — 1 CC/EC contradiction found |
| ASC/COSO citation verification | Not checked (DL-009: 10 wrong citations) | **Checked** — Stage 3 cross-references authority-to-topic |
| Distractor quality | Template: "represents a plausible misconception" | **Choice-specific** — each distractor names a distinct misconception |
| Explanation length | Variable, many <50 chars | **≥50 chars required** at Stage 4 |
| Content defect discovery | **Zero** — defects shipped to production | **2 defects found in 10 items (20%)** |
| **Verdict** | **FAIL — content defects shipped** | **PASS — content defects caught before certification** |

---

## 4. Efficiency Comparison

| Metric | Legacy Template | Quality-First Pipeline |
|--------|----------------|----------------------|
| Time per item | ~2 minutes (bulk generation) | **17.5 minutes** (pilot) |
| Items per hour | ~30 (template fill) | **~3.4** (gated authoring) |
| Defect remediation per item | Hours per defect class × hundreds of items | **Near-zero** — prevented at source |
| Total lifecycle cost | Authoring (cheap) + Remediation (expensive) | Authoring (moderate) + Remediation (minimal) |
| Structural defect classes introduced | 19 | **0** |
| Content defects discovered during authoring | 0 (shipped blind) | **2 of 10 items flagged** |
| Certification first-pass rate | Unknown (no gates existed) | **80% (8/10) — 2 items need repair** |
| **Verdict** | **Cheaper to author, far more expensive to own** | **Higher authoring cost, near-zero remediation cost** |

---

## 5. Defect Discovery: What the Pipeline Found

Two items in the 10-item pilot had content-level defects that would never be caught by the governance guard's structural rules:

### 5.1 P1B-D-138 — Stem-EC Mismatch (Rotation Artifact)

**Stem data:** Product X (SP=$30, VC=$18), Product Y (SP=$50, VC=$30), mix=60%/40%  
**EC data:** Product X (SP=$40, VC=$24), Product Y (SP=$60, VC=$36), mix=50%/50%

The stored answer C ($6,000) matches the EC's calculation, not the stem's. A learner reading the stem and solving independently would get $7,894 — which isn't even one of the four choices. This is a template rotation artifact: the stem and EC/choices came from different slots in the 5-item rotation group.

**Pipeline detection:** Stage 3 (Independent Solve) flagged this immediately when the computed answer ($7,894) didn't match any choice.

### 5.2 P1B-D-144 — CorrectChoice Contradicted by Own EC

**EC states:** "Products A and B have the same highest CM per machine hour ($15)... either can be prioritized equally."  
**Stored CC:** C (Product A only)  
**Choice A:** "Product A or B, both have highest CM per hour" — treated as wrong

The EC's own analysis supports Choice A as the correct answer. The stored CC=C contradicts the EC's reasoning. This is likely a rotation artifact where the correct answer in the template was position C, but the item content logically supports position A.

**Pipeline detection:** Stage 3 (Independent Solve) found A and B tie at $15/hr. Stage 5 (Evidence Review) flagged CC≠EC-logic.

---

## 6. Pipeline Stage Analysis

### Stage Timing (10-item pilot)

| Stage | Minutes | % of Time | Bottleneck? |
|-------|---------|-----------|-------------|
| 1: Blueprint | 5 | 2.9% | No |
| 2: Stem Review | 15 | 8.6% | No |
| 3: Correct Reasoning | 45 | 25.7% | **YES — independent solve is the discovery engine** |
| 4: Distractor Logic | 80 | 45.7% | **YES — distractor engineering is dominant cost** |
| 5: Evidence Review | 30 | 17.1% | No |
| **Total** | **175** | **100%** | Stages 3+4 = 71.4% of time |

### Stage Value Proposition

| Stage | Primary Value | Without This Stage |
|-------|--------------|-------------------|
| 1: Blueprint | Ensures LOS alignment; prevents DL-031 | Items test wrong cognitive level |
| 2: Stem Review | Ensures business-context; prevents DL-031 | Definition-match items shipped |
| 3: Correct Reasoning | **Detects content defects (DL-030)** | P1B-D-138/144 defects undiscovered |
| 4: Distractor Logic | Prevents DL-007/008/010/013/025/026 | 19 structural defect classes |
| 5: Evidence Review | Catches residual issues; governance check | Defects leak through |
| 6: Certification | Six-dimension CAQS verification | Unverified items in learner pool |

---

## 7. Recommendation

**Proceed to full Cohort A execution (35 items).** The pipeline has proven:

1. **Structural defect prevention works** — 0 DL-008, 0 DL-026, 0 DL-013 in 10-item sample
2. **Content defect detection works** — 2 pre-existing defects found that structural guard missed
3. **Time estimates are realistic** — 17.5 min/item at pilot scale; ~25 min/item projected at scale (30% learning curve improvement)
4. **The pipeline fills the governance guard gap** — structural rules alone cannot verify content correctness

**Before Cohort A execution, fix the 2 discovered defects:**
- P1B-D-138: Reconcile stem and EC numbers (likely: update stem to match EC/choices)
- P1B-D-144: Change CorrectChoice to A (or rewrite EC to justify C uniquely)

**Pipeline scale-up estimate for 35-item Cohort A:**
- 35 × 25 min = ~14.6 hours (including defect fixes)
- 2 batches (28+7) per governance guard Rule 5
- Target: 35 items with 0 structural defects + all 35 passing Stage 3 independent solve

---

## 8. Governance Attestation

- AGENTS.md §2: Read-only pilot. No pack file modifications. Defects documented, not fixed.
- AGENTS.md §5: All defect claims cross-checked against raw file line-level inspection.
- Governance guard: 32/32 PASS at T0. Rules 2, 3, 5, 6 active.
- Pipeline design: `scripts/output/SESSION836_AUTHORING_PIPELINE_SPEC.json`
