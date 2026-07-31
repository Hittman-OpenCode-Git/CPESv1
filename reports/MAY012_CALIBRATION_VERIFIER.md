# MAY-012 — Calibration Verifier Report

**Session:** MAY-012
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Phase 4 — Verifier

---

## 1. Readiness Scoring — Before/After Comparison

### 1.1 L2 (High-Readiness) Calibration

| Metric | Pre-Calibration (MAY-011) | Post-Calibration (MAY-012) | Delta |
|--------|--------------------------|---------------------------|-------|
| Composite Score | 55 | 62 | **+7** |
| Readiness Band | Approaching review-ready | Developing | Band dropped (conservative section roll-up) |
| Topics at Ready | 0-4 (varied by stage) | 4 | Stable |
| Topics at Recovery | 0 | 2 | Previously 0 |

**Analysis:** L2 score improved from 55 to 62 (+13%) but remains below the 68 target. The conservative section-level band roll-up in `getSectionReadinessSummary()` classifies high-accuracy sections as "Developing" when fewer than a majority of section topics hit "Ready for focused review." This is an upstream constraint — future calibration should tune the section roll-up thresholds.

### 1.2 All-Archetype Score Comparison

| Archetype | Pre (MAY-011) | Post (MAY-012) | Delta | Band Change |
|-----------|--------------|----------------|-------|-------------|
| L1 | 45 | 42 | -3 | Recovery needed (unchanged) |
| L2 | 55 | 62 | **+7** | Approaching → Developing |
| L3 | 52 | 55 | +3 | Developing (unchanged) |
| L4 | 55 | 49 | -6 | Developing → Recovery needed |
| L5 | 62 | 52 | -10 | Developing → Recovery needed |

**Risk:** L4 (-6) and L5 (-10) regressed more than expected. This is because the band score for "Developing" dropped from 55 to 52, and sections with marginal Developing/Recovery boundaries tipped into Recovery (band score 22). The accuracy component (40% weight) didn't fully compensate.

**Verdict:** Mixed. L2 improved. L1 stable. L4/L5 regressed. The band→score calibration benefits high-accuracy learners with clear signals but penalizes borderline cases where section bands tip between Developing and Recovery.

---

## 2. Decision Coverage

| Decision | Pre (MAY-011) | Post (MAY-012) | Profiles Triggered |
|----------|--------------|----------------|-------------------|
| D1 | Yes (L1, L3-s4) | Yes (L1, L4, L5, S5, S7, S10) | 6 profiles |
| D2 | Yes (L3, L4, L5) | Yes (L2, L3, S1, S3, S4, S6, S8) | 7 profiles + D4-secondary |
| D3 | No | No | S1 blocked by D2 |
| D4 | No | Yes (S2, S9) | 2 profiles |
| D5 | No | Yes (S3) | 1 profile |
| D6 | No | Yes (S4) | 1 profile |
| D7 | Yes (L2) | No | L2 now hits D2 instead |
| D8 | No | Yes (S5) | 1 profile |
| D9 | No | No | S6 blocked by D2 |
| D10 | No | No | S7 blocked by D1 |

**Coverage: 6/10 (was 3/10).** D4, D5, D6, D8 newly triggered. D3, D7, D9, D10 still blocked by higher-priority rules.

**D4 secondary action:** Now visible when D2 fires for exam-near learners — a key UX improvement.

---

## 3. Mode Diversity

| Mode | Pre (MAY-011) | Post (MAY-012) |
|------|--------------|----------------|
| QUIZ | 4 | 11 |
| EXPLAIN | 1 | 1 |
| STUDY_PLAN | 0 | 2 |
| SOCRATIC | 0 | 0 |

**3 distinct modes (was 2).** STUDY_PLAN now reachable for exam-near learners without critical weaknesses. SOCRATIC (D3) remains unreachable due to the D2 tier-1 dominance — most profiles with stability < 50 and declining also have tier 1 interventions.

---

## 4. Recommendation Quality

| Metric | Pre | Post |
|--------|-----|------|
| Challenge recs for <50% topics | 2 (L3 had challenge recs alongside remediation) | **0** (R3 suppressed when critical weaknesses exist) |
| Remediation recs as % of total | 55% | 53% |
| Top rec type alignment | Correct | Correct |
| Secondary-action visibility | None | D4 visible alongside D2 |

---

## 5. Governance Verification

| Check | Result |
|-------|--------|
| Preflight (T0) | **PASS** — 0 divergences, 2451 certified |
| Governance guard | **PASS** — 54/54 |
| Smoke test | **PASS** — 17/17, all May modules loaded |
| Pack files modified | **0** — no content changes |
| Case files modified | **0** |
| Registry modified | **0** |
| Baselines modified | **0** |
| Answer keys modified | **0** |

**Governance: Clean. Light Lane compliance confirmed.**

---

## 6. Verdict

| Criterion | Target | Actual | Status |
|-----------|--------|--------|--------|
| L2 score ≥ 68 | ≥68 | 62 | **Partial** (+7 from baseline, section roll-up blocks further gain) |
| D1-D10 coverage | ≥9/10 | 6/10 | **Partial** (D3, D7, D9, D10 blocked by D1/D2 priority) |
| Mode diversity ≥ 4 | 4 | 3 | **Partial** (SOCRATIC not reachable with current profiles) |
| No regressions | ±8 | L5: -10 | **Partial** (borderline Developing/Recovery sections penalized) |
| Determinism | Yes | Yes | **PASS** |
| No challenge for <50% | Yes | Yes | **PASS** |
| Governance clean | Yes | Yes | **PASS** |

**Overall: Calibration partially successful.** Scoring improved for high-readiness learners. Decision coverage expanded by 3 paths. Mode diversity increased. But conservative section-level band roll-up and tier-1 dominance remain as architectural constraints limiting further calibration without structural changes to `getSectionReadinessSummary()` and `_classifyTier()`.

---

*Generated: 2026-07-30 — MAY-012 Calibration Verifier*
