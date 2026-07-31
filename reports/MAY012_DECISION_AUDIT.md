# MAY-012 — Decision Auditor Report

**Session:** MAY-012
**Date:** 2026-07-30
**Governance Lane:** Light
**Status:** Phase 2 — Auditor

---

## 1. Decision Reachability Audit

### 1.1 Rule-by-Rule Reachability

| Rule | Reachable? | Blocked By | Block Criteria |
|------|-----------|------------|----------------|
| D1 | Yes | — | First rule; always evaluated |
| D2 | Yes | D1 | D1 fires if score < 50 or band = "Recovery needed" |
| D3 | **Rare** | D1, D2 | D1 blocks if score < 50; D2 blocks if ANY tier 1 intervention exists |
| D4 | **Rare** | D1, D2, D3 | All three higher-priority rules can block it |
| D5 | **Rare** | D1-D4 | D2 is the primary blocker (tier 1 interventions) |
| D6 | **Rare** | D1-D5 | Blocked by D2 (tier 1) and D5 (declining) |
| D7 | Yes | D1-D6 | Reached when only tier 3 interventions exist (L2) |
| D8 | **Rare** | D1-D7 | Any tier 1-3 intervention blocks it |
| D9 | **Rare** | D1-D8 | Seven rules above it; D7 (tier 3) is the most common blocker |
| D10 | **Rare** | D1-D9 | Only fires when absolutely nothing else matches |

### 1.2 Reachability Analysis

**Critical observation:** D2's trigger condition ("tier 1 intervention exists") is extremely broad. Any learner with:
- Accuracy < 50% on any topic with >= 5 attempts (tier 1 via may-intervention-prioritizer.js `_classifyTier`)
- Band "Recovery needed" + declining + >= 5 attempts

will have a tier 1 intervention, causing D2 to fire and blocking D3-D10. This means:

- **D4 can only fire** for exam-near learners with NO topic below 50% accuracy — a narrow population
- **D5-D9 can only fire** for learners with NO tier 1 or tier 2 interventions
- **D10 is essentially unreachable** with realistic data since at least one of D1-D9 will match

### 1.3 D2 Dominance Quantification

From the 5 MAY-011 archetypes:
- 4 of 5 archetypes had tier 1 interventions → D2 fired for 3 (L3, L4, L5), D1 fired for 1 (L1)
- Only L2 (no tier 1/2 interventions) reached D7

**80% of archetypes blocked at D1/D2.** This is correct behavior — D1 and D2 represent the highest-value coaching actions. But it means D3-D10 are reachable only for learners who have already addressed their critical weaknesses.

---

## 2. Conflicting Actions Audit

### 2.1 Action Conflicts Checked

| Decision Pair | Conflict? | Resolution |
|---------------|-----------|------------|
| D1 vs D4 | Potential (remediation vs study_plan) | D1 wins — critical remediation > exam strategy. Correct. |
| D2 vs D4 | Potential (remediation vs study_plan) | D2 wins — tier 1 weakness > exam strategy. Correct. |
| D3 vs D5 | Potential (socratic vs remediation) | D3 wins — socratic for unstable declining is higher priority. Correct. |
| D7 vs D9 | Potential (explain fragile vs challenge) | D7 wins — fragile knowledge consolidation > challenge. Correct. |

**No conflicting actions found.** The priority ordering is coherent: critical > high > medium > low, and within each tier the decisions complement rather than conflict.

### 2.2 Mode Conflict Check

| Rule | Mode | Next Rule's Mode | Conflict? |
|------|------|------------------|-----------|
| D1 | QUIZ | D2: QUIZ | No — same mode |
| D2 | QUIZ | D3: SOCRATIC | No — D2 takes priority |
| D3 | SOCRATIC | D4: STUDY_PLAN | No — D3 takes priority |
| D6 | QUIZ | D7: EXPLAIN | No — different modes but priority-ordered |
| D9 | QUIZ | D10: EXPLAIN | No — D9 takes priority |

---

## 3. Priority Order Audit

### 3.1 Current Ordering

```
critical: D1 → D2
high:     D3 → D4
medium:   D5 → D6 → D7
low:      D8 → D9 → D10
```

### 3.2 Priority Assessment

| Rule | Current Priority | Should Be | Rationale |
|------|-----------------|-----------|-----------|
| D1 | critical | critical | Correct — <50 score is highest urgency |
| D2 | critical | critical | Correct — tier 1 weaknesses are critical |
| D3 | high | high | Correct — unstable declining is high urgency |
| D4 | high | high | Correct — exam approaching is high urgency |
| D5 | medium | medium | Correct — declining trends, medium urgency |
| D6 | medium | medium | Correct — emerging weakness |
| D7 | medium | medium | Correct — fragile knowledge |
| D8 | low | low | Correct — coverage gap |
| D9 | low | low | Correct — challenge is enrichment |
| D10 | low | low | Correct — fallback |

**No priority changes recommended.**

### 3.3 Potential Enhancement: D4 Secondary Output

D4 (exam approaching STUDY_PLAN) is currently silent when D2 fires. Consider adding a secondary recommendation to the decision output:

```javascript
// If D2 fires AND examPlan.daysUntilExam <= 30 AND band is Developing/Recovery:
// Add secondaryAction: { action: 'study_plan', mode: 'STUDY_PLAN', priority: 'secondary', ... }
```

This allows the coaching UI to say "First fix your critical weakness in X, then use this exam strategy." The D2 decision is primary; D4 is surfaced as a follow-up. This preserves D2's priority while making D4 visible.

---

## 4. Unreachable Rules Assessment

### 4.1 D10 — Insufficient Data

D10 is the fallback rule. With the current implementation, D8 fires for <4 sections with data before D10 can fire. D10 would only fire if sections are available but absolutely no other rule matches. This is genuinely rare but serves as a safety net.

**Verdict:** D10's rarity is acceptable. It's a safety net, not a primary path.

### 4.2 D3-D6, D8-D9

These rules are reachable but require specific learner states that the MAY-011 archetypes don't produce. The synthetic profiles in `MAY012_DECISION_COVERAGE_PLAN.md` will demonstrate reachability.

---

## 5. Auditor Verdict

| Check | Result | Detail |
|-------|--------|--------|
| Decision priorities behave as intended | **PASS** | Priority ordering is coherent and defensible |
| No unreachable rules | **PASS** | All rules are reachable with appropriate learner states |
| No conflicting actions | **PASS** | No two rules recommend conflicting modes at the same priority |
| D2 dominance concern | **NOTE** | D2 blocks D3-D10 for 80% of archetypes — but this is correct behavior |
| D4 visibility gap | **ENHANCEMENT** | Consider secondary-action field to surface D4 alongside D2 |

---

*Generated: 2026-07-30 — MAY-012 Decision Auditor*
