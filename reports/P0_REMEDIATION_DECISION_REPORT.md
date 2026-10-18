# P0 Remediation Wave — Human Decision Report

**Date:** 2026-09-24
**Session:** Post-P0 Closeout
**Status:** Awaiting Human Adjudication

---

## Executive Summary

The critical P0 remediation wave has resolved all learner-safety blockers (P2 answer streaks, length cueing, case INVERSIONs, DL-008/DL-026). The verification suite passes. Three decision points remain before the next certification wave can proceed.

---

## Decision 1: 68 Semantic Key REVIEW Flags — Adjudication Required

### Context
The `semantic_key_verifier.js` gate produced 68 REVIEW-tier flags (0 BLOCK). These are items where the explanation content suggests a different answer than the stored `CorrectChoice`, but the signal is not strong enough for automatic BLOCK (lead-token echo heuristic produces false positives on calculation items).

**Per Rule 21 / DL-047 gate:** No `question_state` flip to `Certified` is authorized without a clean semantic screen re-run. REVIEW flags must be human-adjudicated before any certification batch proceeds.

### Options

| Option | Description | Pros | Cons | Recommendation |
|--------|-------------|------|------|----------------|
| **A: Full Adjudication** | Review all 68 flags individually; fix confirmed inversions; clear false positives | Maximum learner safety; clean gate for next wave | ~4-6 hours of expert review time | **Recommended** |
| **B: Stratified Sampling** | Adjudicate high-confidence flags (margin ≥ 40%) only; defer lower-confidence | Faster (~1-2 hours); catches most genuine inversions | Residual risk in deferred flags; gate not fully clean | Acceptable if time-constrained |
| **C: Batch Defer** | Defer all 68 to next session; proceed with non-flagged certifications | Unblocks other work immediately | Violates Rule 21 (gate not clean); REVIEW flags accumulate | **Not Recommended** |

### Evidence Package
- `scripts/output/semantic_key_flags.json` — all 68 flags with QID, match scores, margin
- `reports/DL047_B_CLOSEOUT.md` — 29 confirmed false positives from prior calibration (calculation-item pattern)
- `scripts/semantic_key_verifier.js` — gate logic (REVIEW threshold: bestRecall ≥ 60% AND margin ≥ 25%)

### Recommended Path
**Option A (Full Adjudication).** The 29 confirmed FPs from prior calibration are a known pattern (calculation items where EC formula vocabulary matches distractor lead phrases). The remaining 39 flags include the 9 known DL-047 inversions already fixed. Adjudicating all 68 now prevents accumulation and satisfies the Rule 21 gate requirement for the next certification wave.

---

## Decision 2: 67 P2-F Base Schema Errors — Authoring Pass Required

### Context
`npm run validate` reports 67 base schema errors in `p2/pack_p2_f.js` (Part 2, Section F). These are pre-existing v1.1 validation gaps:
- Missing `source_ids` (required for v1.1 evidence-package traceability)
- Missing `distractor_intent` fields (required for v1.1 distractor engineering audit)

These items cannot pass the P2_SCHEMA_STANDARD v1.1 gate (`--enforce` mode) and will block any certification attempt on Pack F.

### Options

| Option | Description | Pros | Cons | Recommendation |
|--------|-------------|------|------|----------------|
| **A: Targeted Authoring Pass** | Add `source_ids` + `distractor_intent` to all 67 items (~500 fields) | Unlocks Pack F for certification; completes v1.1 compliance | ~3-4 hours authoring; requires domain expertise | **Recommended** |
| **B: Downgrade to v1.0** | Temporarily validate Pack F against v1.0 schema only | Immediate unblock; no authoring needed | Technical debt; v1.1 gate remains blocked; diverges from standard | Acceptable as stopgap |
| **C: Archive Pack F** | Move Pack F items to `Archived` state; certify other packs | Clean separation; other packs proceed | Loses 500+ Part 2 items from pool; waste of authored content | **Not Recommended** |

### Evidence Package
- `scripts/validators/p2_schema_validator.js` — v1.1 schema rules
- `knowledge/P2_SCHEMA_STANDARD.md` — v1.1 field requirements
- `scripts/output/p2f_schema_errors.json` — 67 items × error details

### Recommended Path
**Option A (Targeted Authoring Pass).** Pack F is the Technology & Analytics domain — high strategic value for Part 2. The v1.1 fields (`source_ids`, `distractor_intent`) are authoring-time fields that improve traceability and distractor quality. A focused pass completes the v1.1 migration for the entire Part 2 bank.

---

## Decision 3: P2 Strict Pool Reduction — Accept or Remediate

### Context
`npm run probe:parity` reports P2 strict pool: **36 eligible vs 110 expected**. This is expected — 108 cases were quarantined (`In Audit`) due to INVERSION flags (Decision 1 related). The strict pool requires cases where **all items are Certified**.

### Options

| Option | Description | Pros | Cons | Recommendation |
|--------|-------------|------|------|----------------|
| **A: Accept Reduction** | Proceed with 36 strict-eligible cases; remediate quarantined cases in batches | Honest reflection of current state; no rush | Smaller P2 case delivery pool for learners | **Recommended** |
| **B: Emergency Remediation** | Fast-track 108 quarantined cases to restore pool size | Restores full pool quickly | Risks certifying items with unresolved semantic flags; violates Rule 21 | **Not Recommended** |
| **C: Relax Strict Tier** | Allow cases with ≥80% Certified items into strict pool | Increases pool size immediately | Weakens learner-safety guarantee; precedent risk | **Not Recommended** |

### Evidence Package
- `scripts/output/coverage_summary.v1.json` — pool parity breakdown
- `scripts/probe_pool_parity.js` — strict-tier logic (all-items-Certified requirement)
- Quarantine manifest: `scripts/output/semantic_quarantine.json` (108 cases)

### Recommended Path
**Option A (Accept Reduction).** The 36 strict-eligible cases represent a clean, verified pool. The quarantined 108 cases will be remediated through the normal certification pipeline (adjudicate → fix → verify → certify). This maintains the integrity of the strict-tier guarantee.

---

## Consolidated Recommendation

| Decision | Recommended Action | Est. Effort | Blocking Next Wave? |
|----------|-------------------|-------------|---------------------|
| 1. 68 REVIEW flags | Full adjudication (Option A) | 4-6 hrs | **YES** — Rule 21 gate |
| 2. 67 P2-F schema errors | Targeted authoring pass (Option A) | 3-4 hrs | YES — v1.1 gate |
| 3. P2 strict pool | Accept reduction (Option A) | 0 hrs | NO — operational |

**Total estimated effort for unblocked next wave:** ~7-10 hours

---

## Sign-Off Required

Before the next certification wave, the following must be confirmed:

- [ ] **Decision 1:** All 68 REVIEW flags adjudicated; `semantic_key_verifier.js` reports 0 BLOCK, 0 REVIEW (or documented FP set)
- [ ] **Decision 2:** Pack F `source_ids` + `distractor_intent` authored; `npm run validate` shows 0 base schema errors on P2-F
- [ ] **Decision 3:** P2 strict pool reduction accepted; delivery pool documented at 36 cases

**Prepared by:** Build-Time AI Verification (P0 Closeout Session)
**Authority:** Human Review Required per AGENTS.md §5 (Dual Verification) and §9.2.1 (Semantic Screen Re-Run Gate)