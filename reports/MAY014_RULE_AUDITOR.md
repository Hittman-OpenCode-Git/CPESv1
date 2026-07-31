# MAY-014 — Rule Auditor

**Session:** MAY-014
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Phase 2 — Auditor

---

## 1. Decision Chain Integrity

### 1.1 Evaluation Order (may-decision-engine.js:330-363)

```
D1 → D2 → D3 → D4 → D5 → D6 → D7 → D8 → D9 → D10
```

| Check | Result |
|-------|--------|
| Priority coherence | PASS — critical → high → medium → low ordering maintained |
| No cyclic dependencies | PASS — each rule evaluates independently |
| First-match semantics | PASS — single return per invocation |
| All rules called | PASS — D10 is unconditional fallback |

### 1.2 Tier Dominance Check

| Decision | Tier Requirement | Could Overshadow |
|----------|-----------------|------------------|
| D1 | score < 50 | D3 (if score just above threshold but profile unstable) |
| D2 | tier 1 | D3 (same topic, different coaching approach) |
| D3 | masteryLevels.stability<50+declining | None — last rule checking weaknesses before topic-independent rules |
| D4 | exam ≤ 30d + band | None — orthogonal condition |
| D5 | declining topics | None — applies after tier checks fail |
| D6 | tier 2 | None |
| D7 | tier 3 | D9 (fragile classification on mastery-level topics) |
| D8 | < 4 sections | D10 (legitimate) |
| D9 | mastery | None — last substantive rule |
| D10 | unconditional | Nothing to overshadow |

**Finding:** No tier dominance issues beyond the 2 already identified (D3 blocked by D2, D9 blocked by D7). The chain is otherwise well-ordered.

---

## 2. Rule Masking Analysis

### 2.1 D3 Masked by D2

- **Masker:** D2 (`_ruleCriticalWeakness`) — tier 1 intervention check
- **Masked:** D3 (`_ruleRepeatedUnstable`) — SOCRATIC for unstable declining
- **Overlap domain:** Topics with low stability + declining + 5+ attempts
- **Current behavior:** D2 always wins because tier 1 classification catches these topics
- **Post-fix behavior:** Tier-1 band rule removed → topic classified as tier 2 → D2 skips → D3 fires
- **Risk of post-fix D2 miss:** **None.** The first tier-1 rule (`acc < 50`) still catches truly critical topics. A topic at 52% declining is not "critical remediation" territory.

### 2.2 D9 Masked by D7

- **Masker:** D7 (`_ruleFragileKnowledge`) — tier 3 fragile knowledge
- **Masked:** D9 (`_ruleHighMastery`) — challenge content for mastery
- **Overlap domain:** Mastery-level topics with borderline stability/direction metrics
- **Current behavior:** D7 always wins because one topic at 85%+ can get tier 3
- **Post-fix behavior:** acc ≥ 80 guard → mastery topics skip tier 3 → no tier 3 interventions → D7 skips → D9 fires
- **Risk of post-fix D7 miss:** **None.** D7 should apply to topics at 60-80% with instability, not topics at 85%+.

---

## 3. Priority Collision Check

### 3.1 Collision Scenarios

| Scenario | Rules | Resolution |
|----------|-------|-----------|
| Score < 50 AND tier 1 intervention | D1 vs D2 | D1 wins (critical readiness trumps topic-level weakness) — correct |
| Tier 1 AND declining AND unstable | D2 vs D3 vs D5 | D2 wins currently (tier 1). Post-fix: D3 wins (SOCRATIC for pattern errors) — correct |
| Tier 3 AND mastery topic | D7 vs D9 | D7 wins currently (fragile blocks challenge). Post-fix: D9 wins (mastery trumps fragile classification) — correct |
| Exam approaching AND tier 2 | D4 vs D6 | Depends on profile. If tier 1 exists → D2 fires with D4 secondary. If only tier 2 → D4 fires before D6 (exam urgency > emerging weakness) — correct |

### 3.2 No Alien Priorities

All 10 rules use priorities from the documented set: `critical`, `high`, `medium`, `low`, `secondary`. No undocumented priorities exist.

---

## 4. Dead Branch Analysis

| Branch | Status | Action |
|--------|--------|--------|
| D3 SOCRATIC | Dead (D2 preempts) | Fix in progress — remove tier-1 band rule |
| D9 Challenge | Dead (D7 preempts) | Fix in progress — add acc≥80 guard |
| D10 Fallback | Dead (D8 preempts) | **Legitimate** — no fix needed |
| D4 Exam Strategy | Reached (primary + secondary) | Healthy |
| D5 Declining | Reached (3 profiles) | Healthy |
| D6 Emerging | Reached (1 profile) | Healthy |
| D7 Fragile | Reached (1 profile) | Healthy — but will yield D9 slot post-fix |
| D8 Section Gap | Reached (2 profiles) | Healthy |

---

## 5. Governance Check

| Check | Result |
|-------|--------|
| Decision engine version | MAY012-1.0 (line 367) — will need update to MAY014-1.0 |
| Intervention prioritizer version | MAY005-1.0 (line 142) — needs update |
| No pack/case/content impact | Confirmed — both files in coaching layer only |
| Feature flags respected | Confirmed — all decisions gated behind ENABLE_ADAPTIVE_ORCHESTRATION |

---

## 6. Verdict

**2 of 3 dead branches are fixable.** Both fixes are localization-only (single function in a single file). Zero decision-ordering changes needed. Zero new rules needed. The D3 fix removes a stale catch-all rule that the MAY-013 calibration should have addressed. The D9 fix adds a guard that should have existed from the start.

---

*Generated: 2026-07-30 — MAY-014 Rule Auditor*
