# S831 — Difficulty Calibration Audit: Calibration Recommendations

**Session:** S831  
**Generated:** 2026-07-27  
**Status:** COMPLETE  
**Decision:** ACCEPT WITH MODIFICATION

---

## 1. Executive Summary

The CMA Part 1 Exam Simulator's difficulty distribution is **severely left-skewed**:

| Difficulty Band | Current | CAQS Target | Delta | Status |
|----------------|---------|-------------|-------|--------|
| Easy (1) | 21.1% | 15% | +6.1pp | OVER |
| Moderate-Easy (2) | 27.3% | 20% | +7.3pp | OVER |
| Moderate (3) | 48.3% | 30% | +18.3pp | **CRITICAL OVER** |
| Difficult (4) | 3.3% | 25% | -21.7pp | **CRITICAL UNDER** |
| Very Difficult (5) | 0.0% | 10% | -10.0pp | **CRITICAL UNDER** |

**Root cause:** The template-rotation authoring pipeline assigned difficulty and Bloom's labels by rotation position, not by cognitive assessment. Additionally, ~800-1,000 items exhibit DL-031 (definition-match items labeled Moderate that should be Easy).

---

## 2. Phase 1 Recalibration Plan

**807 items recalibrated across all 5 packs** to reach intermediate Phase 1 targets:

### Pack-by-Pack Moves

| Pack | Total Items | Recalibrated | % of Pack | Sweeps Needed |
|------|------------|-------------|-----------|---------------|
| A | 500 | 244 | 48.8% | 2 |
| B | 500 | 153 | 30.6% | 1 (borderline) |
| C | 500 | 119 | 23.8% | 1 |
| D | 500 | 109 | 21.8% | 1 |
| E | 540 | 182 | 33.7% | 2 |

### Key Move Categories

| Move | Count | Rationale |
|------|-------|-----------|
| Moderate → Difficult | 423 | Single largest impact: 3.3% → ~20% Difficult |
| Moderate → Very Difficult | 127 | Emergency bridge: 0% → ~5% VDiff |
| Easy → Moderate-Easy | ~100 | Normalize Easy band toward 15% target |
| Moderate-Easy → Moderate | ~157 | Shift weight to Moderate where it belongs |

### Post-Phase 1 Distribution

| Band | Before | After | Target |
|------|--------|-------|--------|
| Easy | 21.1% | ~20% | 15% |
| Moderate-Easy | 27.3% | ~20% | 20% |
| Moderate | 48.3% | ~35% | 30% |
| Difficult | 3.3% | ~20% | 25% |
| Very Difficult | 0.0% | ~5% | 10% |

### Execution Order

**C → D → B → A → E** (simplest to most complex)

Packs C and D execute in single sweeps. Packs B, A, and E need 2 sweeps each (governance guard ≤30% per sweep).

---

## 3. Very Difficult Bridge (Limited Feasibility)

**Recalibration alone can only bridge to ~0.87% VDiff (22 items).** The remaining 8-9% gap requires NEW content creation:

- 50 new VDiff items for Sections B and C (calculation-heavy domains)
- 200 additional VDiff items in Phase 2 to reach full 10%

**Only 4 existing items** have Analyze cognitive level + DifficultyScore 4 — the only legitimate calibration candidates. Recalibrating Apply-level "Difficult" items to VDiff would be psychometric fraud.

---

## 4. DL-031 Coordinated Strategy

**CRITICAL INSIGHT:** DL-031 (definition-match items labeled Moderate → should be Easy) affects 800-1,000 items. Downgrading them in isolation would push Easy from 21.1% → ~45%, making the distribution worse.

**Required:** DL-031 downgrades MUST be paired with upward recalibrations. Minimum ratio: ≥2 upward moves per 3 downgrades. Execute in a single coordinated sweep.

---

## 5. Bloom's Taxonomy Root Cause

| Level | Current | CAQS Target | Delta |
|-------|---------|-------------|-------|
| Remember | 0.4% | 5% | -4.6pp |
| Understand | 50.2% | 15% | +35.2pp |
| Apply | 46.5% | 40% | +6.5pp |
| Analyze | 0.4% | 25% | -24.6pp |
| Evaluate | 0.0% | 15% | -15.0pp |

**The Bloom's gap CAUSES the difficulty gap.** 96.7% Understand+Apply items naturally cluster at Moderate difficulty. You cannot reach 25% Difficult without adding Analyze/Evaluate items. Recalibration of Moderate→Difficult is a bridge, not a solution.

---

## 6. Recommendations

1. **ACCEPT Phase 1 recalibration** (807 items, ~6 hours, metadata-only)
2. **DEFER DL-031 standalone** — bundle with upward recalibrations in coordinated sweep
3. **RECOMMEND content creation** for 740 new Analyze/Evaluate/Difficult/VDiff items (S833 scope)
4. **Section E/F priority** — worst Bloom's calibration (69%/85% Understand) — target these first for new Analyze items
5. **Do NOT recalibrate Section E/F Moderate→Difficult** — Agent F analysis found 60.5% of Section E/F items were difficulty-overstated; these need DL-031 downgrades, not upgrades

---

## 7. Decision

**DECISION: ACCEPT WITH MODIFICATION**

- Phase 1 recalibration: APPROVED (Packs C, D, B first; A, E deferred)
- DL-031 coordinated sweep: APPROVED as mandatory companion to Phase 1
- VDiff bridge: APPROVED (22 items) — content creation required for remainder
- Content creation (740 new items): DEFERRED to S833/S834 pipeline
