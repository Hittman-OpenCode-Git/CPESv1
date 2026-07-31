# MAY-014 — Reachability Auditor

**Session:** MAY-014
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Phase 2 — Auditor

---

## 1. D3 (SOCRATIC — Repeated Unstable)

### 1.1 Rule Definition

```javascript
// may-decision-engine.js:100-138
_ruleRepeatedUnstable(profile, interventions) {
    // Checks: profile.weaknesses for topic with:
    //   - masteryLevels[topic].stability < 50
    //   - masteryLevels[topic].direction === 'declining'
    //   - masteryLevels[topic].attempts >= 5
    // Returns: SOCRATIC mode, priority: high
}
```

### 1.2 Reachability Verdict: **Misconfigured**

| Check | Result |
|-------|--------|
| Rule logic correct | Yes — D3 correctly checks the right properties |
| Can profile meet criteria | Yes — synthetic profile S1_D3 creates topic at 52%, declining, low stability, 10 attempts |
| Does rule evaluate | **No** — D2 (tier 1) fires first because `_classifyTier` line 161 catches `band + declining + 5+ attempts` as tier 1 |
| Is preemption intentional | **No** — This is a calibration artifact. Post-MAY-013, the Recovery band was narrowed but `_classifyTier` wasn't updated to match |

### 1.3 Path Trace

```
S1_D3: Standard Costing (52%, declining, stability~42, 10 attempts)
  → getReadinessSummary(): band = "Recovery needed" (acc 50-60 + declining + stability<50)
  → _classifyTier(): tier 1 (band === 'Recovery needed' + declining + attempts>=5)
  → interventions.topAction.tier = 1
  → D2 (_ruleCriticalWeakness): top.tier === 1 → FIRES (QUIZ mode)
  → D3 (_ruleRepeatedUnstable): NEVER REACHED

D2 preempts D3.
```

### 1.4 Fix Location

`may-intervention-prioritizer.js`, line 161:
```javascript
// REMOVE this line:
if (band === 'Recovery needed' && direction === 'declining' && attempts >= 5) return TIERS.CRITICAL_REMEDIATION;
```

Rationale: The first tier-1 rule (`acc < 50 && attempts >= 5`) already catches genuinely critical topics. The band-based catch-all duplicates what tier 2 (emerging weakness, lines 163-165) handles for declining + unstable topics with accuracy ≥ 50. Removing it allows D3's SOCRATIC path to activate for the exact learner profile it was designed for.

---

## 2. D9 (High Mastery — Challenge)

### 2.1 Rule Definition

```javascript
// may-decision-engine.js:268-304
_ruleHighMastery(profile) {
    // Checks: profile.strengths for topic with:
    //   - masteryLevels[topic].accuracy >= 85
    //   - masteryLevels[topic].attempts >= 6
    //   - masteryLevels[topic].direction not declining/slightly_declining
    //   - masteryLevels[topic].stability >= 75
    // Returns: QUIZ challenge mode, priority: low
}
```

### 2.2 Reachability Verdict: **Overshadowed**

| Check | Result |
|-------|--------|
| Rule logic correct | Yes — D9 correctly checks mastery criteria |
| Can profile meet criteria | Yes — S7_D9 creates 6 topics all at 86-92%, stable, 8-14 attempts |
| Does rule evaluate | **No** — D7 fires first because one topic gets tier 3 fragile classification |
| Is preemption intentional | **No** — Topic at 86%+ should never be "fragile knowledge" |

### 2.3 Path Trace

```
S7_D9: All 6 topics at 86-92%, stable, 8-14 attempts
  → getReadinessSummary(): bands mostly "Approaching review-ready" or "Ready"
  → _classifyTier(): ONE topic gets tier 3 (fragile) due to:
      - direction slightly_declining (line 170) OR
      - stability computed < 75 by readiness engine (line 168)
  → interventions.topAction.tier = 3
  → D7 (_ruleFragileKnowledge): top.tier === 3 → FIRES (EXPLAIN mode)
  → D9 (_ruleHighMastery): NEVER REACHED

D7 overshadows D9.
```

### 2.4 Fix Location

`may-intervention-prioritizer.js`, insert before tier 3 rules (before line 168):
```javascript
// NEW GUARD: Mastery-level topics (acc ≥ 80%) should never be classified as fragile
if (acc !== null && acc >= 80) return TIERS.MASTERED_AREA;
```

Rationale: A topic at 80%+ accuracy with multiple attempts is a mastered area regardless of what the stability score or direction micro-metrics say. Slight instability in an otherwise mastered topic does not mean "fragile knowledge" — it means the learner is ready for challenge content.

---

## 3. D10 (Insufficient Data — Fallback)

### 3.1 Rule Definition

```javascript
// may-decision-engine.js:307-317
_ruleInsufficientData() {
    // Unconditional fallback — only reached if D1-D9 all return null
    // Returns: EXPLAIN mode, priority: low
}
```

### 3.2 Reachability Verdict: **Legitimate**

D10 is intentionally unreachable because D8 (`_ruleSectionGap`) fires for any profile with < 4 sections of data, and D1 now excludes "Not enough data" band. For D10 to fire, we'd need a profile with:
- 4+ sections with data
- Score > 50 (D1)
- No tier 1/2/3 interventions (D2/D6/D7)
- No declining topics (D5)
- No weaknesses with low stability/declining (D3)
- No exam approaching (D4)
- No mastery topics meeting D9 criteria (D9... which would be good!)

This is a contradiction — a profile with no problems wouldn't need coaching. D10 is correctly unreachable.

**Status: No change required. Documented as intentionally unreachable.**

---

## Summary

| Decision | Category | Action |
|----------|----------|--------|
| D3 | Misconfigured | Remove tier-1 band rule from `_classifyTier` |
| D9 | Overshadowed | Add acc≥80 guard before tier 3 classification |
| D10 | Legitimate | No change — intentionally unreachable |

---

*Generated: 2026-07-30 — MAY-014 Reachability Auditor*
