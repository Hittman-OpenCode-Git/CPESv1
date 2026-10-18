# May Phase 2 Replan — Design Document

**Version:** 1.0
**Status:** Draft for Review
**Authority:** PROJECT_CONSTITUTION.md
**Date:** 2026-09-21
**Supersedes:** MAY_PHASE_2_REPLAN_20260920.md (destroyed with may-core.js corruption)

---

## 1. Executive Summary

Phase 2.0 (lost in the may-core.js corruption incident) shipped the P2 prose maps behind `ENABLE_MAY_PHASE_2` with three micro-agents (Risk Analyst, Investment Decision, Decision Analyst) and part-aware learner state. This replan captures what was re-derived, what worked, what didn't, and defines the Phase 2.1 scope with proper sequencing.

**Key constraint:** The destroyed file took ~2,500 lines of unverified Phase 2.0 prose with it. We do **not** reconstruct from memory. This replan re-derives requirements from first principles and the B5 probe that survived.

---

## 2. Current State (Verified Live)

| Component | Status | Notes |
|-----------|--------|-------|
| **P2 prose maps** | ✅ Live | 7 methods × 6 sections behind `_isP2Coaching(q)` gate |
| **Micro-agents** | ✅ Live | Risk Analyst (C), Investment Decision (E), Decision Analyst (D) |
| **P2DomainAgent dispatch** | ✅ Live | C/D/E sections, silent null fallback |
| **Part-aware learner state** | ✅ Live | `partsSeen`, `getPartAwareReadiness`, `getCrossPartReadiness`, `getCrossPartStudyPlan` |
| **Archetype actions** | ✅ Live | `part` tag on all actions |
| **P2 onboarding** | ✅ Live | Weekly hours + case comfort + `getP2ExamBriefing` |
| **Router integration** | ✅ Live | Coaching modes ≠ exam parts; context already part-aware |
| **B5 probe** | ✅ 14/14 | P2 prose observed, P1 no-leakage, dispatch null-safe, flag restored off |

**Flag:** `ENABLE_MAY_PHASE_2` (default off) in `may-feature-flags.js`. All Phase 2 code paths are gated behind this + `_isP2Coaching(q)`.

---

## 3. Requirements Re-Derived (Not Reconstructed)

### 3.1 P2 Prose Maps — 7 Methods × 6 Sections

| Method | P1 Fallback | P2 Sections | Requirement |
|--------|-------------|-------------|-------------|
| `_inferMisconception` | Generic section map | A–F | Domain-specific misconception diagnosis |
| `_inferAvoidNextTime` | Tip map | A–F | Domain-specific "don't repeat" tip |
| `_inferWhyItMatters` | Section significance | A–F | Domain-specific business significance |
| `_inferHowToRecognize` | Recognition patterns | A–F | Domain-specific trigger recognition |
| `_conceptHint` | Concept summary | A–F | Domain-specific orientation + EC primer |
| `_inferCommonTrap` | Trap by type | A–F | Domain-specific trap warning |
| `_inferQuickRuleToRemember` | Rule by section | A–F | Domain-specific memorizable rule |

**Gate:** All behind `_isP2Coaching(q)` = `ENABLE_MAY_PHASE_2` + P2 context. Flag off = exact Phase 1 behavior.

### 3.2 Micro-Agents — 3 Domain Specialists

| Agent | Section | Input | Output |
|-------|---------|-------|--------|
| `p2-risk-analyst` | C (Risk Management) | Scenario + EC + wrong choice | Risk-classification + mitigation tip |
| `p2-investment-decision` | E (Investment Decisions) | Scenario + EC + wrong choice | Decision-framework + NPV/IRR check |
| `p2-decision-analyst` | D (Corporate Finance) | Scenario + EC + wrong choice | Decision-framework + incremental analysis |

**Dispatch:** `P2DomainAgent(section, input)` → routes to agent class if flag + provider available. Silent null fallback to generic coaching.

**Pattern:** IIFE wrapper + lookup table + Provider + worker. Workers already clean; providers honor flags.

### 3.3 Part-Aware Learner State

Already live — no rework needed:
- `partsSeen()` → `[1, 2]`
- `getPartAwareReadiness(1|2)` → per-section accuracy + attempts
- `getCrossPartReadiness()` → `{P1, P2, weakerPart}`
- `getCrossPartStudyPlan()` → ordered action strings
- Archetype actions carry `part` tag

### 3.4 P2 Onboarding + Exam Briefing

**Onboarding (first P2 session):**
- Ask weekly study hours → store in exam plan
- Explain case-comfort: "Part 2 adds integrated cases alongside MCQs. When ready, try a case session — multi-exhibit items reward the same incremental-analysis habits."

**Exam Briefing (`getP2ExamBriefing`):**
> "Part 2 simulation: 100 MCQs + 2 cases in ~4 hours.
> - Bank MCQ marks first: flag calculation-heavy items, move on.
> - For each case, read exhibits before items and note which exhibit each item needs.
> - Keep the incremental lens: only what differs between alternatives matters.
> - Reserve final stretch for flagged items — calm re-read beats rushed first guess."

**Constraint:** Cites only dev-shell "100 MCQs + 2 cases" — no format specifics asserted.

### 3.5 Router Integration

No new coaching modes. Coaching modes ≠ exam parts.
- `context.examModeActive` already derives from `isExamIntegrityMode`
- `_recommendMode()` already reads `a.examModeActive` (fixed in W1-B)
- May coaching receives `part` from context → filters readiness/archetypes by part
- No new mode enum needed; `P2` is data, not a mode

---

## 4. Phase 2.1 Scope (Proposed)

### 4.1 P1 Prose Overhaul (Parallel Track)
Phase 1 prose maps are generic/placeholder. Phase 2 work revealed the pattern; P1 should get the same domain-specific treatment.

| Method | Current State | Target |
|--------|---------------|--------|
| `_inferMisconception` | Generic section map | P1 domain-specific (A–F) |
| `_inferWhyItMatters` | Generic significance | P1 domain-specific |
| `_inferHowToRecognize` | Generic patterns | P1 domain-specific |
| `_conceptHint` | Generic + EC | P1 domain-specific + EC |
| `_inferCommonTrap` | Type-based | P1 domain-specific |
| `_inferQuickRuleToRemember` | Section-based | P1 domain-specific |

**Effort:** M (7 methods × 6 sections, P1-specific prose). Can reuse Phase 2 pattern.

### 4.2 Agent Expansion (4 New Micro-Agents)

| Agent | Section | Domain |
|-------|---------|--------|
| `p2-financial-reporting` | A | External Financial Reporting |
| `p2-planning-budgeting` | B | Planning, Budgeting, Forecasting |
| `p2-performance-mgmt` | C (shared) | Performance Management |
| `p2-technology-analytics` | F | Technology & Analytics |

**Effort:** L (4 agents × IIFE + provider + worker + tests). Each agent needs domain lookup table + provider + worker.

### 4.3 P1 Agent Suite (6 Micro-Agents)

| Agent | Section | Domain |
|-------|---------|--------|
| `p1-financial-reporting` | A | External Financial Reporting |
| `p1-planning-budgeting` | B | Planning, Budgeting, Forecasting |
| `p1-performance-mgmt` | C | Performance Management |
| `p1-cost-mgmt` | D | Cost Management |
| `p1-internal-controls` | E | Internal Controls |
| `p1-technology-analytics` | F | Technology & Analytics |

**Effort:** L (6 agents). Can share worker pattern with P2 agents.

### 4.4 Advanced Coaching Features (Deferred to 2.2+)

| Feature | Description | Effort |
|---------|-------------|--------|
| **Adaptive case walkthrough** | Step-by-step case guidance with exhibit highlighting | XL |
| **Concept reinforcement scheduling** | Spaced repetition of weak concepts across sessions | M |
| **Cross-part weakness bridge** | "Your P1 Section D weakness affects P2 Section D cases" | M |
| **Exam-day simulation mode** | Full timed run with May as proctor | L |
| **Confidence calibration** | May asks "How confident?" before revealing answer | S |

---

## 5. Implementation Sequencing

### Phase 2.1a — P1 Prose Overhaul (2 weeks)
- Re-derive 7 methods × 6 P1 sections from first principles
- Gate behind `ENABLE_MAY_PHASE_1` (new flag) or reuse `ENABLE_MAY_PHASE_2` with part check
- B5-style probe for P1

### Phase 2.1b — P2 Agent Expansion (3 weeks)
- Build 4 new P2 agents (A, B, shared C, F)
- Extend `P2DomainAgent` dispatch table
- Keep workers/flags pattern

### Phase 2.1c — P1 Agent Suite (3 weeks)
- Build 6 P1 agents
- Add `P1DomainAgent` dispatch (or unified dispatcher)
- B5-style probe for P1 agents

### Phase 2.1d — Hardening & Polish (1 week)
- B5 probe for all agents
- Flag hygiene (Phase 1/2 separation)
- Documentation sync

**Total:** ~9 weeks if sequential; can parallelize 2.1a + 2.1b.

---

## 5. Technical Debt from Phase 2.0 (Carry Forward)

| Item | Impact | Resolution |
|------|--------|------------|
| `may-learner-state.js` syntax error (concurrent session) | Smoke FAIL | Fix in that session's lane; not Phase 2.1 |
| `may-core.js` lost prose | Cannot reconstruct | Already re-derived; no debt |
| Agent worker pattern duplication | 7 agents × similar structure | Refactor to shared worker base class in 2.1d |
| Flag hygiene | `ENABLE_MAY_PHASE_1` vs `ENABLE_MAY_PHASE_2` | Add `ENABLE_MAY_PHASE_1`; deprecate magic strings |

---

## 6. Success Criteria for Phase 2.1

| Criterion | Measure |
|-----------|---------|
| P1 prose maps live | B5 probe 14/14 for P1 (mirroring P2) |
| 7 P2 agents live | B5 probe per agent + dispatch |
| 6 P1 agents live | B5 probe per agent + dispatch |
| Part-aware coaching | Cross-part readiness + study plan functional |
| No P1/P2 leakage | B5 probe verifies isolation |
| Zero new FLAGs | `npm run pipeline` green |
| Flags default off | Smoke PASS with flags off |

---

## 6. Resource Estimate

| Phase | Effort | Duration | Parallel? |
|-------|--------|----------|-----------|
| 2.1a P1 Prose | M | 2 weeks | Yes (with 2.1b) |
| 2.1b P2 Agents | L | 3 weeks | Yes (with 2.1a) |
| 2.1c P1 Agents | L | 3 weeks | No (after 2.1a) |
| 2.1d Hardening | S | 1 week | No |

**Total calendar:** ~6 weeks with parallelization.

---

## 7. Governance

- **Lane:** Full Governance (content + flags + learner state)
- **T0:** `npm run preflight:all` 0/0 + backups
- **Tend:** `npm run pipeline` GREEN + B5 probe
- **Rule 5:** ≤30 objects per batch
- **Rule 12:** No CognitiveLevel relabeling
- **Rule 16:** Provenance stamps on all flips
- **DL-045:** No auto-remediation from screens

---

## 8. Approval

**Authorization required:** "go phase 2.1" with explicit scope selection (2.1a, 2.1b, 2.1c, or all).

This replan is a design document only — no code written. Ready for board review.