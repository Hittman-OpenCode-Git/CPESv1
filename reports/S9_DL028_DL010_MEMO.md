# S9 Memo — DL-028 Post-Batch Check & DL-010 Accepted-Risk Decision

**Date:** 2026-09-22
**Board Meeting:** Full Governance Lane session
**Status:** Documented for record

---

## DL-028: Remediation Tooling Regression (Post-Batch Empty-Slot Check)

### Background
DL-028 documents that DL-013 remediation tooling (short-form rewrite) left template rotation slots empty, creating DL-026 (empty non-CC ExplanationWrong slots). The tooling fix was documented but not implemented.

### Required Fix
Add post-batch verification to DL-013 remediation scripts:
```javascript
// After each DL-013 remediation batch:
for each item in batch:
  for each letter L in {A,B,C,D} where L !== CorrectChoice:
    if ExplanationWrong[L] is empty or absent:
      throw Error(`DL-028: Item ${QuestionID} has empty non-CC EW slot ${L}`)
```

### Status
**DEFERRED** — No active DL-013 remediation in current wave. Fix to be implemented before next DL-013 sweep. Tracked as tooling debt.

---

## DL-010: Misassigned Choice Explanations — Accepted Risk

### Background
DL-010 (misassigned ExplanationWrong text) has no automated semantic gate. Board decision 2026-09-13 (ADVISORY_BOARD_MEETING line 258): "No automated rule can detect misassigned explanations. Acknowledged as impossible."

### Current State
- 204-item tail unread (low-yield: best recall < 0.8 or own > 0.25)
- Screen B (lead-token echo) demoted to REVIEW-only (2026-09-20) due to 29 systematic FPs on calculation items
- Generalized DL-047 screens catch 10 confirmed key inversions (DL-047)

### Decision
**ACCEPTED RISK** — No automated semantic gate for DL-010. Reliance on:
1. DL-047 semantic screens (fingerprints, lead-token echo REVIEW, EC–stem mismatch, lowercase-fragment, generalized DL-010, B-num)
2. Human adjudication of REVIEW flags before certification
3. Per-batch DL-010 spot-checks during certification waves

### Mitigation
- REVIEW flags from Screen B require human adjudication before any →Certified flip
- DL-047 quarantine manifest enforces fix-verify-restore cycle
- Accepted-risk memo filed per AGENTS.md §17 (portfolio governance)

---

## Board Record
This memo filed per AGENTS.md §12.1 (Full Governance Lane closeout).
No code changes required in this session.

**Next Review:** Next DL-013 remediation wave or DL-047 certification batch.