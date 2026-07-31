# MAY-013 — Decision Coverage Expansion Plan

**Session:** MAY-013
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Phase 1 — Planner

---

## 1. Current Coverage (MAY-012)

| Decision | Triggered | Blocker |
|----------|-----------|---------|
| D1 | 6 profiles | First rule, fires on score<50 |
| D2 | 7 profiles | Tier 1 intervention exists |
| D3 | **0** — blocked by D2 | Stability<50+declining also = tier 1 |
| D4 | 2 profiles | Reached after calibration, + secondary |
| D5 | 1 profile | Declining topics w/o tier 1 |
| D6 | 1 profile | Tier 2 intervention |
| D7 | **0** — lost | L2 now hits D2 instead |
| D8 | 1 profile | <4 sections coverage |
| D9 | **0** — blocked by D2 | Needs no tier 1-3 interventions |
| D10 | **0** — never fires | D1 or D8 always fire first |

**Coverage: 6/10.** Gaps: D3 (SOCRATIC), D7 (EXPLAIN fragile), D9 (challenge), D10 (fallback).

---

## 2. Root Cause: Tier 1 Classification Blocks D3-D10

The `_classifyTier()` function in `may-intervention-prioritizer.js` has two tier-1 triggers:

```javascript
// Tier 1 — Critical weakness
if (acc < 50 && attempts >= 5) return TIERS.CRITICAL_REMEDIATION;
if (band === 'Recovery needed' && direction === 'declining' && attempts >= 5) return TIERS.CRITICAL_REMEDIATION;
```

The second trigger is too broad: ANY "Recovery needed" topic that is declining = tier 1. Since `getReadinessSummary()` classified anything with acc < 60 OR declining OR stability < 50 as "Recovery needed," every borderline topic became tier 1.

**MAY-013 fix (from Calibration Plan):** Narrow Recovery band to acc < 50 OR (acc 50-60 AND declining AND stability < 50). This reduces tier 1 classification to genuinely critical topics, unblocking D3, D7, D9.

---

## 3. Revised Synthetic Profile Targets

### D3 — SOCRATIC Mode (Unstable Declining, Not Critical)

**Required:** Weakness with stability < 50, declining, 5+ attempts, NOT tier 1
**Enabled by:** Narrower Recovery band → topic at 52% acc, declining, stability=42 → "Developing" band → classified as tier 2 (acc 50-60 + declining + stability<50 = tier 2 emerging weakness)

| Field | Value |
|-------|-------|
| Topic | Standard Costing |
| Accuracy | 52% |
| Attempts | 7 |
| Stability | 42% |
| Direction | declining |
| Recent % | 48% |

The intervention prioritizer sees acc 50-60 = tier 2, NOT tier 1. D2 doesn't fire. D3's `_ruleRepeatedUnstable` checks: stability < 50 AND declining AND 5+ attempts → fires.

### D7 — EXPLAIN Mode (Fragile Knowledge, Tier 3)

**Required:** Tier 3 intervention, no tier 1/2
**Enabled by:** Stability < 50, accuracy 62%, slightly_declining, 5+ attempts → tier 3 fragile knowledge

| Field | Value |
|-------|-------|
| Topic | Cost Behavior |
| Accuracy | 62% |
| Attempts | 5 |
| Stability | 45% |
| Direction | slightly_declining |

_accClassifyTier()_ sees: acc ≥ 60, < 75, stability < 50 → tier 3. No tier 1/2 → D7 fires.

### D9 — QUIZ Challenge Mode (Mastery, No Interventions)

**Required:** Topic ≥85% acc, 6+ attempts, not declining, stability ≥ 75, no tier 1-3 interventions
**Enabled by:** All topics at ≥85% with high stability → no interventions generated

| Field | Value |
|-------|-------|
| Topic | Revenue Recognition |
| Accuracy | 89% |
| Attempts | 12 |
| Stability | 82% |
| Direction | stable |

All companion topics also ≥85% = no tier 1/2/3 interventions at all. D1-D8 skip. D9 fires.

### D10 — EXPLAIN Fallback (Insufficient Data)

**Required:** Profile with data but no rule matches D1-D9
**Enabled by:** Exactly 1 topic with 2 attempts, stable at 75% → no band, no interventions, no declining, <4 sections → but D8 fires first because <4 sections

**Fix for D10:** Create profile with 1 topic, 1-2 attempts, score NOT < 50, 0 interventions, and D8 override (4+ sections but all "Not enough data" — no sections=6, sectionsWithData counts >3 but all NED). Actually, D8 requires dataSections < 4. Need sections=0 → D8 fires again.

**Alternative D10 profile:** All data with 0 topics registered (empty profile → session count 0 → overall "Not enough data" → D1 checks score < 50? Readiness would be Not enough data → band = Not enough data → score = 0 → D1 would fire because score < 50!

**D10 reachability fix:** D1 should NOT fire when band is "Not enough data." A learner with no data is not "critically low readiness" — they're simply unassessed. Update D1 to exclude "Not enough data" band:

```javascript
// D1: Only fire when score < 50 AND band is NOT "Not enough data"
if ((score !== null && score < 50) && band !== 'Not enough data') {
```

This is a minor logic correction — D10 is the correct response for learners with no data yet.

---

## 4. Post-Calibration Decision Coverage Matrix

| Decision | Profile | Mode | Pre-Calibration | Post-Calibration |
|----------|---------|------|----------------|-----------------|
| D1 | L1, L4, L5 | QUIZ | Blocked by wider Recovery | Still fires for truly critical |
| D2 | L2, L3, S1 (was blocked) | QUIZ | Blocked everything | Only fires for tier 1 |
| D3 | S1-D3 | SOCRATIC | **Unreachable** | **Reachable** — tier 2 topic triggers |
| D4 | S2, S9 | STUDY_PLAN | Reachable | Reachable |
| D5 | S3 | QUIZ | Reachable | Reachable |
| D6 | S4 | QUIZ | Reachable | Reachable |
| D7 | S7-fragile | EXPLAIN | **Unreachable** | **Reachable** — tier 3 fragile knowledge |
| D8 | S5 | EXPLAIN | Reachable | Reachable |
| D9 | S6-mastery | QUIZ | **Unreachable** | **Reachable** — no tier 1-3 = D9 |
| D10 | S10-fallback | EXPLAIN | **Unreachable** | **Reachable** — D1 skips Not enough data |

**Target: 10/10 coverage.**

---

## 5. Mode Distribution (Post-Calibration)

| Mode | Profiles | Count |
|------|----------|-------|
| QUIZ | L1, L2, L3, L4, L5, S3, S4, S6-mastery, S8, S9 | 10 |
| EXPLAIN | S5, S7, S10 | 3 |
| SOCRATIC | S1-D3 | 1 |
| STUDY_PLAN | S2 | 1 |

**4 distinct modes — target achieved.**

---

## 6. Implementation

Synthetic profiles will be defined in `scripts/may013_synthetic_profiles.js` and exercised via `scripts/may013_decision_runner.js`. All profiles must:

1. Use existing `seedArchetype()` pattern (MAY-011/MAY-012 compatible)
2. Seed realistic localStorage with `MayLearnerState.recordAttempt()`
3. Not modify any pack, case, or content file
4. Be deterministic (fixed values, no RNG)

---

*Generated: 2026-07-30 — MAY-013 Coverage Planner*
