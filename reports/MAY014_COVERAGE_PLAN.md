# MAY-014 — Decision Coverage Completion Plan

**Session:** MAY-014
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Phase 1 — Planner

---

## 1. Current State (Post MAY-013)

### 1.1 Decision Coverage: 7/10

| Decision | Triggered | Profile | Blocker |
|----------|-----------|---------|---------|
| D1 | Yes | L1 — Critical Remediation | — |
| D2 | Yes | L2 — Critical Weakness | — |
| D3 | **No** | — | Tier 1 classification catches unstable+declining before D3 |
| D4 | Yes | S2 — Exam Strategy (+ D2 secondary) | — |
| D5 | Yes | S1_D3, S3, S5_D7 (3 profiles) | — |
| D6 | Yes | S4 — Emerging Weakness | — |
| D7 | Yes | S7_D9 (see below) | — |
| D8 | Yes | S6_D8, S8_D10 (2 profiles) | — |
| D9 | **No** | — | Tier 3 fragile classification on 80%+ topics blocks D9 |
| D10 | **No** | — | D8 always fires first for sparse data; D1 NED exclusion didn't help |

### 1.2 Mode Distribution: 3/6

| Mode | Profiles | Count |
|------|----------|-------|
| QUIZ | L1, L2, S1_D3, S3, S4 | 5 |
| EXPLAIN | S5_D7, S6_D8, S8_D10 | 3 |
| STUDY_PLAN | S2_D4 | 1 |
| SOCRATIC | — | 0 |
| MOTIVATE | — | 0 |
| EXAM_REVIEW | — | 0 |

---

## 2. Root Cause Analysis — D3 (SOCRATIC)

### 2.1 Code Path Trace

`D3: _ruleRepeatedUnstable` requires a topic in `profile.weaknesses` where `profile.masteryLevels[topic]` has:
- `stability < 50`
- `direction === 'declining'`
- `attempts >= 5`

This is checked **after** D2 (`_ruleCriticalWeakness`) in the decision chain (line 340 vs 337 in `may-decision-engine.js`).

### 2.2 The Actual Blocker

A topic meeting D3's criteria (acc=52%, declining, stability<50, 10 attempts) gets classified by `_classifyTier` in `may-intervention-prioritizer.js` as:

```javascript
// Line 161: Second tier-1 rule:
if (band === 'Recovery needed' && direction === 'declining' && attempts >= 5)
    return TIERS.CRITICAL_REMEDIATION;  // tier 1
```

This tier-1 classification makes `interventions.topAction.tier === 1`, which triggers D2 before D3 can evaluate. The `_classifyTier` function has **two** tier-1 rules (lines 159-161), and the second one — the *band-based* catch-all — is too broad post-MAY-013 calibration.

### 2.3 Why It Should Not Be Tier 1

The MAY-013 calibration narrowed the Recovery band precisely to prevent false tier-1 classifications. A topic at 52% accuracy with instability is **not critically failing** — it's unstable and declining, which is the exact profile SOCRATIC mode was designed to address (process-level misunderstandings). The first tier-1 rule (`acc < 50 && attempts >= 5`) already catches genuinely critical topics.

### 2.4 Fix

**File:** `may-intervention-prioritizer.js` line 161

Remove or narrow the second tier-1 rule. The band-based catch-all `band === 'Recovery needed' && direction === 'declining'` should be **removed** because:
1. The first rule (`acc < 50`) already catches truly failing topics
2. Topics at 50-60% that happen to be Recovery band due to instability should route to tier 2 (emerging), allowing D3's SOCRATIC path to activate
3. Post-MAY-013, the Recovery band requires acc<50 OR triple-fail — both are already covered

---

## 3. Root Cause Analysis — D9 (High Mastery)

### 3.1 Code Path Trace

`D9: _ruleHighMastery` requires a topic in `profile.strengths` where `profile.masteryLevels[topic]` has:
- `accuracy >= 85`
- `attempts >= 6`
- `direction` not declining/slightly_declining
- `stability >= 75`

This is the **second-to-last** rule (D9, line 358), evaluated before only D10.

### 3.2 The Actual Blocker

For a profile where all topics are mastery-level (S7_D9: 86-92%, stable, 8-14 attempts), the intervention prioritizer's `_classifyTier` can still produce tier 3 classifications on topics with:
- Direction slightly_declining (tier 3, line 169)
- Stability computed below 75 by the readiness engine (which uses a different algorithm than the decision engine)

When ANY topic gets tier 3, D7 fires (`_ruleFragileKnowledge` at line 220: `top.tier === 3`), and D9 is never reached.

A profile with all topics at 85%+ should NEVER produce tier 3 interventions — tier 4 (Mastered Area) should be the floor for mastery-level accuracy.

### 3.3 Fix

**File:** `may-intervention-prioritizer.js` lines 168-170

Add an accuracy floor to tier 3 (Fragile Knowledge):
```javascript
// Only classify as fragile if accuracy < 80 — mastery topics should never be "fragile"
if (acc !== null && acc >= 80) return TIERS.MASTERED_AREA;  // NEW guard
// (existing tier 3 rules follow)
```

This ensures that topics at mastery-level accuracy unconditionally skip fragile classification, even if stability or direction metrics are borderline.

---

## 4. D10 — Intentionally Unreachable

D10 (fallback: insufficient data) is blocked because D8 (`_ruleSectionGap`) always fires for any profile with < 4 sections of data. The D1 NED exclusion (MAY-013, line 28) was necessary but not sufficient — D8 is a legitimate blocker since "section coverage gap" is the correct recommendation for learners who haven't explored the blueprint.

**Status:** D10 remains intentionally unreachable. Future may need a profile with 4+ sections but no interventions, no declining, no exam plan, and no readiness concerns. For now, this is not a gap — it's correct behavior.

---

## 5. Post-Fix Coverage Matrix

| Decision | Profile | Mode | Trigger Path |
|----------|---------|------|-------------|
| D1 | L1 — Critical Remediation | QUIZ | score < 50 + band ≠ NED |
| D2 | L2 — Critical Weakness | QUIZ | tier 1 intervention (acc < 50) |
| **D3** | **S1_D3_new** — SOCRATIC Unstable | **SOCRATIC** | stability<50, declining, 5+ attempts, NOT tier 1 |
| D4 | S2 — Exam Strategy | STUDY_PLAN | exam ≤30d + Developing band |
| D5 | S3 — Declining Trend | QUIZ | declining topic in profile |
| D6 | S4 — Emerging Weakness | QUIZ | tier 2 intervention |
| D7 | S5_D7 — Fragile Knowledge | EXPLAIN | tier 3 (acc 60-80, low stability) |
| D8 | S6 — Section Gap | EXPLAIN | < 4 sections with data |
| **D9** | **S7_D9_new** — High Mastery | **QUIZ** | all topics ≥85%, stability ≥75, no tier 1-3 |
| D10 | — | — | Intentionally unreachable |

**Target: 9/10 coverage.** D3 (SOCRATIC) and D9 (challenge) restored.

---

## 6. Implementation Plan

### 6.1 Code Changes (2 files)

| File | Change | Lines |
|------|--------|-------|
| `may-intervention-prioritizer.js` | Remove tier-1 band rule (line 161) | +0 −1 |
| `may-intervention-prioritizer.js` | Add acc ≥ 80 → tier 4 guard before tier 3 | +3 lines |

### 6.2 Test Runner

Create `scripts/may014_decision_runner.js` based on `may013_decision_runner.js` with updated synthetic profiles that exercise D3 and D9.

### 6.3 Synthetic Profiles

| Key | Expected Decision | Topic | Accuracy | Stability | Direction | Attempts |
|-----|------------------|-------|----------|-----------|-----------|----------|
| L3_D3 | D3 SOCRATIC | Standard Costing | 52% | 42% (low) | declining | 10 |
| L4_D9 | D9 Challenge | Revenue Recognition | 89% | 82% (high) | stable | 12 |
| L5_D2 | D2 Critical (unchanged) | Cost Behavior | 42% | 35% | declining | 8 |

### 6.4 Success Criteria

| Criterion | Target |
|-----------|--------|
| Decision coverage | 9/10+ |
| Mode diversity | 4+ (add SOCRATIC) |
| L2 score | ≥ 69 (no regression) |
| Release readiness | 90+/100 |
| Smoke | 17/17 PASS |
| Governance | 54/54 PASS |

---

*Generated: 2026-07-30 — MAY-014 Coverage Planner*
