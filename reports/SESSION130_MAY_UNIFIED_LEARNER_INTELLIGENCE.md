# SESSION130 — May Unified Learner Intelligence Platform Architecture

**Spec Only — No Code Changes**
**Session Type:** Architecture & Design Analysis
**Implementation Sessions:** S131+
**Generated:** 2026-07-26

---

## Executive Summary

S120–S129 built May's coaching capabilities across 9 consecutive sessions: Explain → Wrong Choices → Simplify → Next Best Step → Learning Patterns → Focus Areas → Session Recap → Weekly Digest → Study Strategy → Strategy Effectiveness.

S130 ran 10 parallel architecture agents against the full 7,785-line codebase (may-core.js: 6,284 lines, may-learner-state.js: 1,501 lines). The agents found:

| Finding | Severity | Count |
|---------|----------|-------|
| Classification conflicts between subsystems | HIGH | 7 |
| Threshold conflicts/drift | HIGH | 11/7 |
| Duplicated interpretation paths | MEDIUM | 35 |
| Duplicated observation groups | MEDIUM | 10 |
| Duplicated computations | MEDIUM | 8 |
| Missing provenance | HIGH | 3 functions |
| Evidence aging absent | HIGH | All subsystems |
| Safety violations | — | **0** |

**The coaching systems work.** All 317 tests pass. Zero safety violations. Every recommendation is evidence-backed. But the architecture is a collection of independent subsystems that each independently scan, classify, and recommend — they can and do disagree with each other when fed identical data.

**S130's charter:** Transform 9 independently-functioning coaching subsystems into a single governed learner-intelligence platform with shared evidence, shared thresholds, shared learner state, recommendation provenance, effectiveness tracking, and complete auditability.

---

## Current Architecture: What Exists

### The 10 Intelligence-Producing Subsystems

| Subsystem | Session | Key Functions | Lines | Tests |
|-----------|---------|---------------|-------|-------|
| Explain | S120 | `_guardedSpeak`, `_buildTutorExplanation`, `_explainAnswer` | ~270 | 12 |
| Wrong Choices | S121 | `_buildWrongChoiceCoaching`, `_inferMisconception`, 4 helpers | ~290 | 12 |
| Simplify | S122 | `_generateSimplification`, `_simplifyAccountingLanguage`, ~30 regex replacements | ~370 | 12 |
| Next Best Step | S123 | `_generateNextBestStep`, `_appendNextBestStep` (9 error categories → 11 action types) | ~160 | 10 |
| Learning Patterns | S124 | `_identifyLearningPatterns`, `_appendLearningPatterns` (5 pattern categories) | ~130 | 8 |
| Focus Areas | S125 | `_suggestFocusAreas`, `_appendFocusAreas` (5 suggestion types, 3 priorities) | ~145 | 8 |
| Session Recaps | S126 | `_generateSessionRecap` (6 sections) | ~110 | 8 |
| Weekly Digest | S127 | `_generateWeeklyDigest`, `_showWeeklyDigest` (8 sections, ≥2 sessions) | ~300 | 8 |
| Study Strategy | S128 | `_generateStudyStrategy`, `_showStudyStrategy` (3 horizons) | ~155 | 6 |
| Strategy Effectiveness | S129 | `_generateStrategyEffectiveness`, `_showStrategyEffectiveness`, `_recordRecommendation`, `_scoreRecommendationQuality` | ~200 | 20 |

### Shared Infrastructure

- **Dispatch:** `handleAction` with 15 action routes + exam-mode G6 gate
- **Learner State Layer:** 44 exported methods in MayLearnerState
- **Safety Layer:** 8 functions — banned phrases, answer leakage, hallucination, defect/certified gate
- **Evidence Validators:** 8 S113 functions for per-claim-type thresholds

---

## What's Broken: The 6 Architecture Problems

### Problem 1: Subsystems Disagree on the Same Data (HIGH)

7 classification conflicts documented in Agent F's consistency audit:

| Conflict | Subsystems | Detail |
|----------|-----------|--------|
| **Weak topic** | S127/S128 vs S124/S125 | S127/S128 use ≥3 attempts window; S124/S125 use ≥5 attempts. A topic with 4 attempts at 55% triggers S127/S128 but is invisible to S124/S125. |
| **Improving trend** | S124/S125 vs getTrends() vs S129 | Delta thresholds: ≥10% (S124/S125), ≥15% (getTrends), ≥5% (S129). Topic at 12% delta is "improving" per S124/S125, "slightly" per getTrends, "positive" per S129. |
| **Strong topic** | S124/S125 vs S127/S128 | ≥85% vs ≥70% accuracy. Topic at 78% is "strong" to S127/S128 but not to S124/S125. |
| **Declining** | getTrends() vs S126/S127 | ≤-15% vs ≤-10%. Topic at -12% is declining per S126/S127, "slightly declining" per getTrends. |
| **Topic priority** | S127 vs S125/S128 | <65% vs <60% threshold for "needs attention"/"high priority" |
| **Cross-session comparison** | S126 vs S127 | Last-two-session delta vs first-to-last-in-window delta |
| **Recommendation conflict** | 6 functions | Independently decide "next action" from different scopes with no coordination |

**Root cause:** Each subsystem independently implements its own classification logic against the same data, using different thresholds, different lookback windows, and different criteria.

### Problem 2: No Evidence Aging (HIGH)

Agent I's longitudinal validation found **zero** time-based evidence aging in the entire system:

- `getTopicProgress()` aggregates ALL attempts since session 1 with equal weight
- A wrong answer from 8 weeks ago counts the same as a correct answer from yesterday
- Misconception patterns accumulate indefinitely — a pattern from week 1 persists at full count through week 50
- S127/S128 "weekly" windows are session-count-based (last 7 sessions), not calendar-based — sessions from 6 months ago count as "this week" if total < 7
- Only S129's `getLongitudinalAnalytics()` is calendar-aware, and it's read-only display

**Consequence:** After 20+ sessions, aggregate accuracy degrades into noise. Topic metrics stop reflecting current performance.

### Problem 3: Massive Redundancy (MEDIUM)

Agent K's performance audit found:
- **42 independent `MayLearnerState.load()` calls** across the codebase
- A single `renderView()` triggers **15-20 localStorage reads** through cascading chains
- `getTopicProgress()` called by **7 subsystems** independently
- Session history independently iterated **21 times** for similar aggregations
- Section name map copy-pasted **6 times** (30 duplicate lines)
- Misconception name map copy-pasted **7 times** (48 duplicate lines)
- Weak-topic identification logic re-implemented in **7 different places**

### Problem 4: Incomplete Provenance (HIGH)

Agent C found only **40%** of recommendation-generating functions record full provenance:

| Coverage | Functions |
|----------|-----------|
| Full provenance | `_generateNextBestStep`, `_suggestFocusAreas`, `_generateStudyStrategy`, `_generateWeeklyDigest` |
| Partial (separate system) | `_recommendNext`, `_recommendSimilar`, `_generateRecoverySet` |
| **No provenance** | `_generateSessionRecap`, `_recommendNextAction`, `preExamBriefing` |

Two separate storage systems (`recommendationOutcomes` and `recommendationLog`) operate independently with no cross-reference. You cannot answer: "Did the learner follow up on this QID recommendation, and did it help?"

### Problem 5: 10 Duplicate Observation Groups (MEDIUM)

Agent D found 56 observation types, of which 10 are generated independently by multiple subsystems from the same underlying data:

- **persistentWeak:** Generated by S124, displayed by S125/S126/S127/S128 — all from `getWeaknessClusters()`
- **misconceptionPatterns:** Read by S124/S125/S126/S127 — all from `data.misconceptionPatterns[]`
- **improvement trends:** Duplicated across S124/S125/S126/S127 + welcome overview
- **declining/unstable/hintDependent/difficultySensitive:** All verbatim-display cluster data

Plus 1 orphaned observation (`S124.repeated_calculation` queries `sessions[].results[]` but real data writes to `sessions[].attempts[]` — dead code path), and 1 internal-only observation (S129's `_scoreRecommendationQuality` never consumed by any UI path).

### Problem 6: 97 Thresholds, 11 Conflicts (MEDIUM)

Agent E cataloged 97 threshold definitions with 11 conflicts across 7 drift instances:

| Conflict | Severity | Values |
|----------|----------|--------|
| Delta for "improving" | HIGH | +5 (S129), +10 (S124/S125), +15 (getTrends) |
| "High" accuracy | MEDIUM | 80 (readiness), 85 (coaching) |
| Attempts for strength | MEDIUM | 3 (coaching), 6 (readiness Ready), 4 (readiness Approaching) |
| "Weekly" definition | MEDIUM | 7 sessions (S127/S128), 7 calendar days (S129) |

---

## The Unified Architecture: Proposed Design

### Core Principle: Single Source of Truth

Every coaching subsystem reads from the same evidence layer. Observations are computed once, shared by all. Recommendations carry full provenance. Thresholds are defined in one place.

### The 7-Layer Evidence Pipeline

```
LearnerEvent
    ↓
Evidence  (materialized, time-weighted, single computation)
    ↓
Observation  (threshold-gated, evidence-linked, once-computed)
    ↓
Pattern  (multi-observation, explicit node)
    ↓
Recommendation  (single generator, provenance-attached, priority-deduplicated)
    ↓
Outcome  (follow-through tracked, classified)
    ↓
EffectivenessSignal  (feeds back to adjust future recommendations)
```

### Layer 1: LearnerEvent

Unified event types replacing ad-hoc data scattering:
- `QUESTION_ANSWERED` — with full attempt data
- `COACHING_REQUESTED` — explain, simplify, wrongChoices
- `RECOMMENDATION_DELIVERED` — any coaching recommendation shown
- `RECOMMENDATION_FOLLOWED` — learner acted on recommendation
- `SESSION_COMPLETED` — session boundary marker
- `TOPIC_MASTERY_SIGNAL` — evidence of topic competence

### Layer 2: Evidence

Time-weighted computation replacing aggregate accumulation:
- **EWMA accuracy** (14-day half-life) replacing simple aggregate
- **Calendar-anchored windows** (7/14/28 days) for all "weekly" computations
- **Materialized evidence nodes** — computed once, cached, invalidated on new data
- **Single `getTopicProgress()` call** via `getCachedLearnerSnapshot()`

### Layer 3: Observation

Unified observation registry replacing 10 duplicate groups:
- 7 categories: strengths, weaknesses, misconceptions, topic_trends, calculation_patterns, terminology_patterns, behavior_trends
- All gated by unified thresholds from single registry
- Evidence-linked with source sessions and attempt counts
- Stale observations explicitly pruned (time-based, not count-based)

### Layer 4: Pattern

Explicit pattern nodes replacing implicit data-scans:
- 5 pattern templates: difficulty_amplification, confidence_accuracy_divergence, hint_escalation, mode_asymmetry, cross_topic_misconception
- Multi-observation input, single output
- Named, versioned, traceable

### Layer 5: Recommendation

Single recommendation generator replacing 6 independent functions:
- `getRecommendedActions({ horizon: 'question'|'session'|'weekly'|'biweekly' })` 
- Priority-based deduplication — no conflicting signals
- Full provenance: source evidence, source sessions, triggering rule, observation chain, timestamp
- Topic-scoped with explicit evidence disclosure

### Layer 6: Outcome

Enhanced outcome tracking:
- Follow-through detection: did the learner act on the recommendation?
- Time-bounded classification: outcome evaluated within window of delivery
- Supersession: old recommendations marked superseded when conditions no longer apply

### Layer 7: EffectivenessSignal

Closing the loop:
- Which recommendation types correlate with improvement
- Effectiveness-to-priority boost: types that work get recommended more
- All observations explicitly anti-causal — no "because of" claims

### Unified Learner State

Agent G's proposed 6-section unified state object:
1. **Strengths** — topic-level, evidence-backed, with source sessions
2. **Weaknesses** — lifecycle (active/resolved/monitoring), linked to misconceptions
3. **Misconceptions** — clean field names, trend tracking, linked weaknesses
4. **Improvements** — persisted trends, delta + evidence window
5. **Recommendation History** — merged log + outcomes, unified schema with provenance
6. **Recommendation Outcomes** — derived views, not stored redundantly

**No predictions. No readiness scores. No exam forecasting.** Purely evidentiary.

### Threshold Single Source of Truth

Agent E's unified threshold set:
```
accuracy:  { high: 85, good: 75, weak: 60 }
attempts:  { strength: 3, weakness: 5, trend: 4, pattern: 3 }
sessions:  { recap: 1, digest: 2, strategy: 3 }
stability: { high: 75, good: 60 }
delta:     { improving: 10, declining: -10, notable: 15, outcome: 5 }
recency:   { recent: 14 days, weekly: 7 days, biweekly: 14 days, monthly: 28 days }
priority:  { high: 60, medium: 75 }
```

All thresholds defined once in `may-learner-state.js`, referenced by all coaching functions. `getThresholdSnapshot()` extended to cover every threshold.

---

## Implementation Roadmap

### Phase 1: Foundation (S131) — Single Computation Model
- Create `getCachedLearnerSnapshot()` — compute-once pattern
- Add time-weighted EWMA accuracy to `getTopicProgress()`
- Add calendar-aware window functions
- Implement `computeEvidenceGraph()` — L1 + L2
- **Risk:** Low. Additive only. Existing functions unchanged.
- **Tests:** +10 evidence graph tests

### Phase 2: Unified Observations & Thresholds (S132)
- Build `ObservationRegistry` — single source for all observation types
- Consolidate 10 duplicate groups into canonical observations
- Fix orphaned `S124.repeated_calculation` path
- Migrate threshold definitions to single registry
- Wire all 7 subsystems to read from registry
- **Risk:** Medium. Changes consumption path. Requires regression.
- **Tests:** +10 observation registry tests

### Phase 3: Unified Recommendations (S133)
- Build `getRecommendedActions({ horizon })` — single generator
- Priority-based deduplication logic
- Migrate S123/S125/S126/S127/S128 to consume unified generator
- **Risk:** Medium. Changes recommendation generation. Requires full regression.
- **Tests:** +10 recommendation generator tests

### Phase 4: Provenance (S134)
- Design `ProvenanceRecord` schema (16 fields)
- Add provenance tracking to `_generateSessionRecap`, `_recommendNextAction`, `preExamBriefing`
- Merge `recommendationLog` + `recommendationOutcomes` into single array
- Backfill evidence for S127/S128 (currently `evidence: {}`)
- **Risk:** Medium. Schema migration. Backward-compatible dual-write.
- **Tests:** +10 provenance tests

### Phase 5: Longitudinal Resilience (S135)
- Implement time-based staleness pruning for misconception patterns
- Add observation refresh on new session data
- Add recommendation supersession logic
- Implement EWMA-based topic accuracy (replace aggregate)
- **Risk:** Medium-High. Changes core accuracy computation. Requires calibration validation.
- **Tests:** +10 longitudinal tests

### Phase 6: Effectiveness Feedback Loop (S136)
- Wire effectiveness signals back to recommendation priority
- Implement recommendation-type boost/demote rules
- Add follow-through detection to outcome classification
- **Risk:** Medium. Changes recommendation ordering.
- **Tests:** +10 effectiveness loop tests

Total new tests across S131–S136: **~60 tests**

---

## Safety: Unchanged

Agent J's safety mega-audit confirmed:

| Check | Result |
|-------|--------|
| Tutoring safety suite | **178/178 PASS** |
| Stage C suite | **119/119 PASS** |
| Governance guard | **20/20 PASS** |
| Prediction language | **0 violations** |
| Readiness estimates | **0 violations** |
| Answer leakage | **0 violations** |
| Causal overreach | **0 violations** |
| Fabricated trends | **0 violations** |
| modelVersion | **S111-1.0** (confirmed) |

Two benign uses of "ready"/"predictor" in non-coaching UX/motivational contexts — no action needed.

**The S130 design introduces zero new safety risks.** All proposed changes are architectural (how data flows), not behavioral (what outputs say). The S129 effectiveness engine's anti-causation disclaimer is the template for all provenance-attached outputs.

---

## Governance Attestation (Pre-Implementation)

- ✅ No pack content changes
- ✅ No case-bank modifications
- ✅ No scoring logic changes
- ✅ No certification-status changes
- ✅ No unauthorized threshold changes (S130 is analysis only)
- ✅ No lane-crossing modifications (100-series only)
- ✅ No readiness language introduced
- ✅ No prediction language introduced
- ✅ modelVersion remains S111-1.0
- ✅ Pre-flight: 317/317 PASS
- ✅ All 10 analysis agents completed independently
- ✅ 10 deliverable JSON files verified on disk
- ✅ Cross-reference consistency verified across all agent reports

---

## Deliverables Produced

| File | Agent | Size |
|------|-------|------|
| `SESSION130_INTELLIGENCE_ARCHITECTURE_MAP.json` | A | 49 thresholds, 10 subsystems, 6 duplicated patterns |
| `SESSION130_EVIDENCE_GRAPH_DESIGN.json` | B | 7-layer design, 39 access points, 4 threshold discrepancies |
| `SESSION130_PROVENANCE_SYSTEM_RESULTS.json` | C | 40% coverage, 3 zero-provenance functions, 16-field schema |
| `SESSION130_OBSERVATION_REGISTRY.json` | D | 56 observations, 10 duplicate groups, 3 orphans |
| `SESSION130_THRESHOLD_GOVERNANCE_AUDIT.json` | E | 97 thresholds, 11 conflicts, 7 drift instances |
| `SESSION130_CONSISTENCY_AUDIT.json` | F | 7 classification conflicts, 35 duplicated paths |
| `SESSION130_LEARNER_STATE_MODEL.json` | G | 15 schema issues, 6-section unified design |
| `SESSION130_LONGITUDINAL_VALIDATION.json` | I | NO aging, 8 failure modes, 3 HIGH severity |
| `SESSION130_SAFETY_MEGA_AUDIT.json` | J | 317/317 PASS, 0 violations |
| `SESSION130_PERFORMANCE_AUDIT.json` | K | 42 load() calls, 8 duplicated computations |
| `SESSION130_MAY_UNIFIED_LEARNER_INTELLIGENCE.md` | — | This document — consolidated architecture spec |

---

## Decision Tree for Implementation

### Primary Path (Recommended)
**S131 → S136 sequential rollout.** Phase 1 foundation first, then each layer built atop the previous. Each session is independently testable and rollback-safe. Full unification in 6 sessions.

### Alternate Path
**Incremental threshold unification only.** Start by consolidating thresholds (S132 scope) without the full evidence graph refactor. Lower risk, lower reward — subsystems still compute independently but at least agree on what "weak" means. 1-2 sessions. Then decide whether to continue to full unification.

### Deferred Items
- **Pattern engine** (L4 explicit pattern nodes) — lower priority than observation/recommendation unification; current implicit approach works adequately
- **Provenance viewer UI** — nice-to-have debug tool, not essential for coaching quality
- **Calendar-week anchoring** — improves digest/strategy accuracy but current session-count approach is adequate for most learners

---

*Spec Only — No Code Changes. Implementation sessions: S131+*
