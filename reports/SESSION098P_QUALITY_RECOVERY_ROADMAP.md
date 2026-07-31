# SESSION098P — Quality Recovery Roadmap

**Session:** 98P — Repository Reclassification ROI Analysis
**Date:** 2026-07-31
**Status:** RECOMMENDED — Not Executed

---

## 1. Current State (After S96P + S98P Audit)

### 1.1 Known Facts

| Fact | Evidence |
|------|----------|
| Repository has 2,545 items | Preflight confirmed |
| ~582 items labeled at HO (Analyze + Evaluate) | Extraction counts |
| ~262 items are true HO | Four-section calibration + S93P sample |
| ~320 items are over-labeled HO | 582 − 262 |
| 0 misclassified items need content rewrites | 120-item ground-truth audit |
| Relabeling is the highest-ROI action | ROI analysis confirms |

### 1.2 True Current HO%

| Calculation | Value |
|-------------|-------|
| True HO items | ~262 |
| Total items | 2,545 |
| **True HO%** | **~10.3%** |
| Labeled HO% | ~22.9% |

---

## 2. Phased Recovery Roadmap

### Phase 1 — Truth Restoration (Relabeling)
**Sessions:** S99P (estimated 1 session)
**Type:** Full Governance Lane (writes to pack files)

| Step | Action | Items |
|------|--------|-------|
| 1a | Relabel Pack A Section A | 19 CognitiveLevel changes |
| 1b | Relabel Pack C Section EC | 26 CognitiveLevel + 12 DifficultyScore changes |
| 1c | Relabel Pack D Section CD | 14 CognitiveLevel changes |
| 1d | Relabel Pack D Section DD | 18 CognitiveLevel changes |
| 1e | Audit + relabel Pack C Sections ED, EE, EF (estimated) | ~60 CognitiveLevel changes |
| 1f | Audit + relabel Pack D Sections ED, FD (estimated) | ~30 CognitiveLevel changes |
| 1g | Audit + relabel remaining sections (C:CC,DC; A:C,D,E; B; E) | ~130 CognitiveLevel changes |
| 1h | Regenerate CURRENT_BASELINES.md | — |
| 1i | Update REVISION_HISTORY.md | — |

**Outcome:** ~320 items corrected. Repository HO shown at ~10.3%. CAQS distribution reports honest.

### Phase 2 — Gap Analysis (Planning)
**Sessions:** S100P (estimated 1 session)
**Type:** Governance Light Lane (read-only)

| Step | Action |
|------|--------|
| 2a | Identify sections with largest Apply pool ready for upgrade |
| 2b | Identify sections needing new HO items from scratch |
| 2c | Estimate true modernization effort to close CAQS gap |
| 2d | Prioritize sections by upgrade-readiness, not by labeled HO count |
| 2e | Produce modernization campaign plan |

**Outcome:** Evidence-based modernization roadmap targeting 70% campaign conversion rate.

### Phase 3 — Quality-Controlled Modernization (Targeted Rewrites)
**Sessions:** S101P through S115P (estimated 10-15 sessions)
**Type:** Full Governance Lane (writes to pack files)

| Priority | Sections | Strategy | Target Items |
|----------|----------|----------|-------------|
| P1 | Pack C/D Section A | New HO creation — ASC judgment scenarios | ~150 |
| P2 | Pack A Sections C, D | Upgrade Apply→Analyze | ~50 |
| P3 | Pack D BD, ED | Upgrade Analyze→Evaluate where possible | ~40 |
| P4 | Pack E Sections A-F | New HO creation across domains | ~100 |
| P5 | Pack B Sections | Targeted upgrades | ~15 |
| P6 | Pack C/D Sections E, F | Upgrade remaining Apply pool | ~50 |

**Outcome:** ~405 genuine HO items created at 70% conversion rate, adding ~284 true HO. Repository HO reaches ~546 items (~21.4%).

### Phase 4 — Gap Closure (Continued Modernization)
**Sessions:** S116P through S125P (estimated 10 sessions)
**Type:** Full Governance Lane

Continue creating new Analyze and Evaluate items in high-ROI sections until CAQS §6.2 40% HO target is reached (~1,018 true HO items). At 70% conversion rate, each 10-session campaign produces ~190 true HO items.

---

## 3. Key Dates and Milestones

| Milestone | Sessions | Cumulative True HO% | CAQS HO Gap |
|-----------|----------|---------------------|-------------|
| Current (pre-relabeling) | — | 10.3% (truth), 22.9% (labeled) | 756 |
| Phase 1 — Truth Restored | S99P | 10.3% (truth = labeled) | 756 |
| Phase 2 — Gap Analysis | S100P | 10.3% | 756 |
| Phase 3 — First Wave | S101P-S115P | ~21.4% | 472 |
| Phase 4 — Gap Closure | S116P-S125P | ~28.9% | 283 |
| Phase 4 — Continued | S126P+ | ~40.0%+ | 0 |

---

## 4. Critical Path Dependencies

| Dependency | Blocks | Risk |
|------------|--------|------|
| Phase 1 (relabeling) | All subsequent phases | Low — metadata-only |
| Phase 2 (gap analysis) | Phase 3 (targeted rewrites) | Low — read-only |
| Phase 3 requires accurate baseline | Cannot plan campaigns on inflated data | **HIGH** — skipping Phase 1/2 wastes ~35% of campaign effort |
| Certification framework update (S95P) | Phase 3 items entering learner pool | Medium — new HO items need quality gates |

---

## 5. Risk Register

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Relabeling introduces new errors | Low | Medium | Use audit-derived lookup table; spot-check 20% |
| Modernization campaigns produce <70% true HO | Medium | High | Quality gates; Pack A Section B as exemplar |
| Concurrent sessions overwrite relabeling | Low | High | Single-session execution; backup protocol |
| CAQS 40% target remains unreachable | Medium | High | Accept that 40% HO target may be aspirational for a 2,545-item pool |
| Governance guard blocks batch relabeling | Low | Medium | Rule 5 batch cap (≤30) — plan batch sizes accordingly |

---

## 6. Success Metrics

| Metric | Current | Post-Phase 1 | Post-Phase 4 |
|--------|---------|-------------|-------------|
| CognitiveLevel label accuracy | ~41% | ~100% | ~100% |
| True HO items | ~262 | ~262 | ~1,018 |
| Labeled HO items | ~582 | ~262 | ~1,018 |
| CAQS §6.2 compliance | 10.3% / 40% | 10.3% / 40% | 40% / 40% |
| Misclassification rate | ~55% | ~0% | ~0% |
| Learner difficulty expectations | Inaccurate | Accurate | Accurate |

---

*Generated: 2026-07-31 | Session 98P Implementer Phase*
