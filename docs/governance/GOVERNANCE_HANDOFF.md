# CMA Simulator Governance Handoff

Generated: 2026-07-25 21:58:15

## Non-negotiable operating rules

1. Run full automated tests before and after every session.
2. Use sessions as no-change attestation even for analysis-only work.
3. Preserve strict lane isolation:
   - 100-series: May / tutoring / telemetry.
   - 500-series: case-bank remediation and certification.
   - 700-series: MCQ remediation and certification governance.
4. Every prompt must include:
   - authorized files,
   - forbidden files,
   - stop conditions,
   - governance attestation,
   - final response format.
5. If target lists conflict, stop and reconcile before remediation.
6. If a governance definition cannot be found, return a coded blocker rather than guessing.
7. If delegated agents fail silently, primary execution should fall back to direct analysis.
8. Do not alter answer keys, prompts, choices, explanations, or states unless the session explicitly authorizes that exact field.
9. For May:
   - no broad rollout,
   - no external telemetry,
   - no pass/fail prediction,
   - exam details must be volunteered by the learner,
   - local/pre-production posture remains default unless explicitly changed.
10. For learner-facing privacy:
   - use only the amount of privacy required by the actual use case,
   - remove or scale back scaffolding that no longer matches the threat model.

## Recommended restart sequence

Primary:
1. May single-user pilot only if explicitly approved.
2. CBQ2-A3 explanation uplift if resuming case-bank quality work.
3. Optional MCQ difficulty recalibration only after confirming 700-series remains frozen clean.

Alternate:
- Resume MIGRATED_CASE_BASE_D first CAQS review.

Deferred:
- Broad May rollout.
- Production data persistence.
- Non-certified DL-026 preparation.
