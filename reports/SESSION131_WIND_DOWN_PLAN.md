# SESSION131 — May Platform Transition Plan

**Type:** Governance Document
**Generated:** 2026-07-26
**Status:** Active
**Authority:** S131 Implementation

---

## 1. Context

S120 (2026-07-26) through S131 (2026-07-26) built May from a basic answer-explanation tutor into a 10-subsystem coaching intelligence platform. S130's architecture audit found 7 classification conflicts, 40% provenance coverage, no evidence aging, and 35 duplicated interpretation paths. S131 resolved the foundation layer — shared evidence graph, 100% provenance, time-weighted accuracy, and unified classification thresholds.

May is now feature-complete as an intelligence platform. The remaining S132–S135 sessions complete the architectural consolidation. After S135, May transitions from active feature expansion into maintenance, quality, governance, and application-polish mode.

## 2. The S131→S135 Buildout Sequence

| Session | Phase | Objective | Risk |
|---------|-------|-----------|------|
| **S131** | Foundation | ✅ **COMPLETE.** Shared evidence graph, 100% provenance, EWMA aging, unified thresholds. 190/190 tutoring safety tests. | — |
| **S132** | Observation Migration | Migrate all coaching subsystems to consume from shared `computeEvidenceGraph()` instead of independently scanning sessions. Eliminate 35 duplicated interpretation paths. Centralize pattern name maps. | Medium |
| **S133** | Threshold Governance | Single threshold registry in `may-learner-state.js`. All 97 thresholds defined once, referenced everywhere. `getThresholdSnapshot()` extended. 11 threshold conflicts resolved. | Medium |
| **S134** | Intelligence Unification | Unified recommendation generator. Priority-based deduplication. Migration of remaining QID-level recommendation storage. Cross-subsystem consistency validation. | Medium-High |
| **S135** | Stabilization | Final audit. All coaching subsystems verified consuming shared layer. Cross-reference consistency confirmed. No remaining threshold conflicts. Test suite at ~210 tests. **Platform buildout complete.** | Low |

## 3. After S135: May's Transition

S135 marks the end of the planned intelligence-platform buildout — not a retirement. May shifts from **active feature expansion** to a **maintenance, quality, governance, and polish** posture.

### What Continues

| Activity | Description |
|----------|-------------|
| **Bug fixes** | Any defect in coaching output, safety gate, or evidence computation. Fix directly — do not redesign. |
| **Defect-manifest updates** | When new DL-IDs are created, update May's blocked-QID lists. G6 gate stays current. |
| **Content-side governance** | When packs are certified or new QIDs enter the delivery pool, May's recommendation gates reflect the updated pool. |
| **Application polish** | UX improvements, performance optimizations, accessibility fixes, responsive behavior — all within existing coaching-surface boundaries. |
| **Test maintenance** | Test updates for bug fixes or threshold corrections. No new test categories target. |
| **Threshold tuning** | If an existing threshold produces poor-quality observations, it can be adjusted — but each adjustment requires a dedicated calibrated session with explicit authorization, following the S713-S717 calibration governance precedent. |
| **Style and layout** | May's UI panels, coach tab, and mini-panel remain active surfaces for polish work. All CSS changes use existing design tokens. |

### What Is Feature-Complete

| Component | Post-S135 State |
|-----------|----------------|
| **may-core.js** | Bug fixes, threshold tuning, and polish only. No new `_generate*` functions. No new `_show*` endpoints. No new `_append*` injectors. |
| **may-learner-state.js** | Bug fixes and schema adjustments for bug fixes only. No new tracking surfaces. |
| **Coaching chain** | Fixed at 10 subsystems. Explain→Wrong→Simplify→NextBestStep→Patterns→Focus→Recap→Digest→Strategy→Effectiveness. No 11th subsystem. |
| **Dispatch** | No new `handleAction` routes. No new freeform triggers. |
| **Tests** | Regression tests for maintenance changes. No new test categories unless a bug fix requires coverage of a previously-untested path. |

### Re-prioritized Project Resources

After S135, the primary project resources shift to:

| Lane | Priority | Scope |
|------|----------|-------|
| **500-series** | HIGH | Case-bank certification completion. MIGRATED_CASE_BASE_D partially done. ENHANCED_CASE_BASE wholly unprocessed. |
| **700-series** | HIGH | Calibration governance. DL-031/DL-032 complete. Standards document maintenance. Cross-lane consistency. |
| **Cross-series defect remediation** | HIGH | DL-008 (67 Certified items), DL-026 (50 In Audit items), DL-013 (~851 fields remaining). Highest learner-safety priority. |
| **Pack A Sections B/C/F certification** | HIGH | Largest uncertified blocks in the pool. |
| **May maintenance** | MEDIUM | Bug fixes, defect manifest updates, threshold corrections, polish. |

## 4. May's Post-S135 Capability Summary

### Production Capabilities

| Capability | Status |
|-----------|--------|
| Answer explanation (Explain) | Production |
| Distractor coaching (Wrong Choices) | Production |
| Plain-language simplification (Simplify) | Production |
| Action plans (Next Best Step) | Production |
| Pattern detection (Learning Patterns) | Production |
| Focus suggestions (Focus Areas) | Production |
| Session recaps | Production |
| Weekly digests | Production |
| Study strategies | Production |
| Effectiveness analytics | Production |
| Shared evidence graph | Production |
| Time-weighted accuracy | Production |
| Provenance tracking (100%) | Production |
| Observation registry | Production |
| Classification consistency | Production |

### Intentionally Excluded

| Capability | Reason |
|-----------|--------|
| Exam readiness scoring | Excluded by design — no prediction language |
| Pass probability estimation | Excluded by design — no forecasting |
| Case-study coaching (G2F) | Deferred — requires case content infrastructure |
| Adaptive difficulty routing | Excluded by design — no manipulating test conditions |
| Peer comparison | Excluded by design — privacy boundary |
| Real exam simulation feedback | Excluded by design — May disabled during exam mode |

## 5. May's Design Philosophy

May's coaching philosophy governs both its feature-complete present and its maintenance future:

- **Grounded, not speculative.** Every observation tied to real evidence. No fabricated insights.
- **Backward-looking, not predictive.** May describes what happened, not what will happen.
- **Actionable, not passive.** Every coaching output ends with "here's what to do next."
- **Conservative, not aggressive.** Observations suppressed when data is thin. "I don't have enough data yet" is valid.
- **Auditable, not opaque.** Every recommendation carries provenance. Every observation links to evidence. Every threshold is defined once.

This philosophy means May remains safe and educationally sound even in a maintenance posture. The coaching doesn't degrade — it just doesn't expand.

## 6. S132 Implementation Package

**Session:** S132 — Observation Migration

**Objective:** Migrate all coaching subsystems to consume from shared `computeEvidenceGraph()`.

**Specific tasks:**
1. Find all places where subsystems independently scan `data.sessions` or call `MayLearnerState.getTopicProgress()` directly in may-core.js
2. Replace with single call to `MayLearnerState.computeEvidenceGraph()` at dispatch level, pass evidence/observations down
3. Eliminate 6 copies of section name map — use single constant
4. Eliminate 7 copies of misconception pattern name map — use single constant
5. Verify all 7 entry points produce identical coaching output
6. Full 190-test tutoring safety suite — zero regressions

**Stop conditions:**
- Any coaching output regresses
- Protected-file hash changes
- Any test assertion fails

**Estimated scope:** may-core.js refactoring only. may-learner-state.js unchanged.

---

*Generated S131. May Platform Transition Plan active. S132 follows.*
