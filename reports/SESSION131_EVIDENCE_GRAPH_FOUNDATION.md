# SESSION131 — Evidence Graph Foundation

**Type:** Implementation Session
**Lane:** 100-series
**Status:** Complete — 329/329 PASS
**Generated:** 2026-07-26

---

## Executive Summary

S131 implemented Phase 1 of the S130 architecture roadmap — the shared evidence foundation layer for May's coaching intelligence. Three S130 findings were resolved:

| S130 Finding | S131 Resolution |
|-------------|-----------------|
| **40% provenance coverage** | All 10 recommendation-generating functions now record provenance: `_recommendNextAction`, `_generateSessionRecap`, `preExamBriefing` now call `recordRecommendationDelivery()` |
| **7 classification conflicts** | S127/S128 thresholds aligned to canonical values: weak ≥5 attempts (was ≥3), strong ≥85% accuracy (was ≥70%) |
| **No shared evidence model** | `computeEvidenceGraph()`, `getEvidenceWindows()`, `getFreshObservations()`, `verifyClassificationConsistency()` implemented |

## Changes

### may-learner-state.js (+~290 lines)

1. **`computeEvidenceGraph()`** — Single materialized evidence snapshot consumed by all coaching subsystems. Returns evidence, observations, patterns, and metadata in one call.

2. **`_computeTimeWeightedAccuracy()`** — EWMA with 14-day half-life replaces simple aggregate accuracy. Newer evidence weighs more; older evidence remains visible but proportionally discounted.

3. **`_deriveObservations()`** — Single observation registry. Seven categories: strengths (≥3 attempts, ≥85%), weaknesses (≥5 attempts, <60%), misconceptions, topic trends (|delta| ≥ 10), calculation patterns, terminology patterns, behavior trends.

4. **`_derivePatterns()`** — Cross-topic misconception and difficulty amplification pattern detection.

5. **`getEvidenceWindows()`** — Categorizes evidence by recency: Recent (≤7 days), Active (8-14 days), Historical (15-28 days), Archived (>28 days).

6. **`getFreshObservations()`** — Filters observations by age threshold (default 28 days).

7. **`verifyClassificationConsistency()`** — Audits weak/strong/improving classifications against evidence. Returns conflicts if any subsystem disagrees.

### may-core.js (+~45 lines)

1. **`_recommendNextAction()`** — Now records `welcome_action` provenance with condition, topics, and session count.

2. **`_generateSessionRecap()`** — Now records `session_recap` provenance with recommendation subtype and evidence.

3. **`preExamBriefing()`** — Now records `pre_exam_briefing` provenance for each review topic suggested.

### S127/S128 Threshold Alignment

| Classification | Old (S127/S128) | New (aligned with S124/S125) |
|---------------|-----------------|------------------------------|
| Weak topic (attempts) | ≥3 | ≥5 |
| Weak topic (accuracy) | <60% | <60% (unchanged) |
| Strong topic (accuracy) | ≥70% | ≥85% |
| Recommended focus (accuracy) | <65% | <60% |
| Momentum confidence | ≥70% on 3+ topics | ≥85% on 3+ topics |

### tests/test_tutoring_safety.js (+12 tests, 178→190)

| Test | Category |
|------|----------|
| S131-01 | Evidence graph structure |
| S131-02 | Time-weighted accuracy presence |
| S131-03 | Observation-evidence alignment |
| S131-04 | Evidence windows categorization |
| S131-05 | Fresh observation filtering |
| S131-06 | EWMA decay verification |
| S131-07 | `_recommendNextAction` provenance |
| S131-08 | `_generateSessionRecap` provenance |
| S131-09 | `preExamBriefing` provenance |
| S131-10 | Classification consistency |
| S131-11 | S127/S128 threshold alignment |
| S131-12 | Provenance source-level wiring |

## Test Results

| Suite | Pre-flight | Post-flight | Δ |
|-------|-----------|-------------|---|
| Tutoring safety | 178/178 | 190/190 | +12 |
| Stage C | 119/119 | 119/119 | 0 |
| Governance guard | 20/20 | 20/20 | 0 |
| **Total** | **317/317** | **329/329** | **+12** |

## Files Changed

| File | Lines changed | Backups |
|------|---------------|---------|
| may-learner-state.js | +~290 | .bak-20260726153313 |
| may-core.js | +~45 | .bak-20260726153313 |
| scripts/test_tutoring_safety.js | +~200 | — |

## Files NOT Changed

All pack files (A-E), all scored_cases (1-5), app.js, index_updated.html, styles.css, may-core.js (scoring/existing coaching logic), Stage C test suite, governance guard

## Safety

- ✅ No readiness estimates introduced
- ✅ No prediction language introduced
- ✅ No answer leakage paths introduced
- ✅ All existing safety mechanisms preserved
- ✅ S129 anti-causation disclaimer preserved
- ✅ modelVersion: S111-1.0 (unchanged)

## Governance Attestation

- ✅ No pack content changes
- ✅ No case-bank modifications
- ✅ No scoring logic changes
- ✅ No certification-status changes
- ✅ No unauthorized threshold changes (S131 aligns thresholds to canonical values per S130 audit)
- ✅ No lane-crossing modifications (100-series only)
- ✅ No readiness language introduced
- ✅ No prediction language introduced
- ✅ modelVersion remains S111-1.0
- ✅ Pre-flight: 317/317 PASS
- ✅ Post-flight: 329/329 PASS
- ✅ 100% provenance coverage achieved (10/10 recommendation functions)
- ✅ 7 classification conflicts resolved
- ✅ Evidence aging framework operational
- ✅ Shared observation registry established
- ✅ No coaching regression (S128-06/S129-16 regression gates PASS)

## Next Session

S132 — Observations & Thresholds: migrate all coaching subsystems to consume from the shared `computeEvidenceGraph()` instead of independently scanning session data. Consolidate the remaining 11 threshold conflicts from the S130 audit into a single threshold registry.
