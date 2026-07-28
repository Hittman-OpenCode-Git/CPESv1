# SESSION135 — May Maintenance Guide

**Generated:** 2026-07-26
**Purpose:** Authoritative reference for maintaining May in its feature-complete state.
**Applies to:** All future 100-series work.

---

## 1. Architecture Overview

May's coaching intelligence platform runs on a 4-layer architecture:

```
getLearnerIntelligence()  [may-learner-state.js]
  ├─ computeEvidenceGraph()      — S131
  ├─ getThresholdRegistry()      — S133
  ├─ _deriveObservations()       — S131
  ├─ _derivePatterns()           — S131
  ├─ getEvidenceWindows()        — S131
  └─ verifyClassificationConsistency() — S131
```

All 10 coaching subsystems consume this through `MayLearnerState.getLearnerIntelligence()`.

## 2. Key Files

| File | Purpose | Edit Authority |
|------|---------|---------------|
| `may-core.js` | Coaching orchestrator, all `_generate*` / `_show*` functions | Bug fixes, threshold updates, polish |
| `may-learner-state.js` | Data layer, evidence graph, threshold registry, intelligence engine | Bug fixes, threshold registry updates |
| `scripts/test_tutoring_safety.js` | 214 tutoring safety tests | Test additions for bug fixes only |
| `scripts/test_may_stagec.js` | 119 Stage C integration tests | Regression additions only |
| `scripts/test_governance_guard.js` | 20 governance enforcement tests | Governance rule additions only |

## 3. Modifying Thresholds

All thresholds live in `MayLearnerState.getThresholdRegistry()` (may-learner-state.js, line ~1118).

**Process:**
1. Identify the threshold to change
2. Document rationale in REVISION_HISTORY
3. Change ONE value in `getThresholdRegistry()`
4. Run full test suite — 353 tests
5. If any test fails, the change affects classification behavior — re-evaluate

**Do not:**
- Add hardcoded numeric literals to coaching functions
- Create new threshold definitions outside the registry
- Change thresholds without test validation

## 4. Adding a Bug Fix

1. Read the relevant source file
2. Create backup: `copy file.js file.js.bak-YYYYMMDDHHMMSS`
3. Make minimal change
4. Run `node scripts/test_tutoring_safety.js`
5. Run `node scripts/test_may_stagec.js`
6. Run `node scripts/test_governance_guard.js`
7. Update REVISION_HISTORY.md
8. Verify modelVersion unchanged (S111-1.0)

## 5. Frozen Boundaries

**Do not add:**
- New `_generate*` functions to may-core.js
- New `_show*` functions to may-core.js
- New `handleAction` routes
- New coaching subsystems (11th+)
- New learner-facing prediction/readiness features
- New data tracking surfaces in may-learner-state.js

**Can add:**
- Test coverage for existing functions
- CSS/style improvements
- HTML/UX polish
- Performance optimizations that don't change behavior
- Defect manifest updates (governance/compliance)

## 6. Common Maintenance Tasks

| Task | File | Notes |
|------|------|-------|
| Fix coaching output bug | may-core.js | Target function only. Run 353 tests. |
| Update blocked QID list | may-core.js G6 gate | Read governance/DEFECT_MANIFEST_*.json |
| Tune a threshold | may-learner-state.js | One value per session. Full test suite. |
| Add test for bug fix | test_tutoring_safety.js | Follow Sxxx-NN naming convention |
| Fix UI rendering | may-core.js renderView() | Check mobile + desktop |

## 7. Test Suite Structure

| Prefix | Coverage | Count |
|--------|----------|-------|
| C- | Tutoring guardrails (exam mode, hints) | 10 |
| E- | Hallucination detection | 12 |
| F- | Answer leakage | 8 |
| GT- | Guarded tutoring wiring | 12 |
| S109- | Pilot gating | 9 |
| S112- | Recommendation gates | 8 |
| S113- | Evidence thresholds | 15 |
| S120- | Explain coaching | 12 |
| S121- | Wrong choices | 12 |
| S122- | Simplify | 12 |
| S123- | Next best step | 10 |
| S124- | Learning patterns | 8 |
| S125- | Focus areas | 8 |
| S126- | Session recaps | 8 |
| S127- | Weekly digest | 8 |
| S128- | Study strategy | 6 |
| S129- | Effectiveness | 20 |
| S131- | Evidence graph | 12 |
| S133- | Threshold governance | 8 |
| S134- | Intelligence engine | 8 |
| S135- | Transition closure | 8 |

## 8. Governance Checklist (Every Session)

- [ ] Pre-flight: 353 PASS
- [ ] Post-flight: 353 PASS
- [ ] modelVersion: S111-1.0
- [ ] No pack modifications
- [ ] No scoring changes
- [ ] No prediction/readiness language
- [ ] REVISION_HISTORY updated
- [ ] Governance attestation included

---

*S135 — May enters maintenance. Feature-complete, governed, stable.*
