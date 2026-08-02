# Active Roadmap

**Authority:** Operational source of truth for what the project is working on now. Day-to-day planning SHALL reference phases by the numbering defined here. Replaces the historical `ROADMAP.md` phase scheme as the go-forward plan.

---

## P1 — Repository Truth Verification
Status: **COMPLETE** — 2026-08-01 (S131)
Gate: Required before all downstream work

Result: baselines confirmed (2,451/2,545, guard 66/66, CL 188/164 matches S122); surfaced DL-039/040/041. See `reports/P1_REPOSITORY_TRUTH_VERIFICATION.md`.

## P2 — Cognitive Integrity Verification
Status: **ACTIVE** — primary lane, on critical path
Depends: P1 (complete)

Objective:
Verify labels + explanation integrity + metadata integrity + downstream consumers. Scope expanded by P1 findings: DL-039 (9 Certified explanation-slot defects), DL-040 (20 non-registry "Active"), DL-041 (3 Certified missing metadata). Execution plan: `reports/P2_EXECUTION_PLAN.md`.

Phases:
- Phase A: DL-039 remediation (9 Pack D Section B items) — full EW re-author (Cat 1: 5) + CC clear/empty fill (Cat 2: 4)
- Phase B: DL-041 metadata repair (3 Pack A Section E items)
- Phase C: Cognitive integrity sampling (Analyze 30 / Evaluate 30 / Diff-5 12 = 72 items)
- Phase D: Downstream consumer verification (9 consumer sites)
- Phase E: Governance fixes (DL-040 registry decision, manifest regeneration)

## P3 — Pack C/D Completion
Status: Deferred until P2 evidence
Blocked by: P2

Objective:
Bring remaining non-certified inventory to parity. Expected to be a bounded certification-completion effort, not a recovery campaign, if P1 confirms baselines and P2 confirms low residual cognitive risk.

## P4 — Parallel Hardening
Status: **ACTIVE** — parallel lane, no dependency on P2

Tracks:
- Operations Console
- Admin Gating
- UX Stabilization (priority: Table renderer → Case exhibit renderer → Tour repair → Session-mode layout → Floating May → Exam integrity mode)
- Test Coverage

## P5 — Alpha Exit Criteria
Status: Future

## P6 — Beta Readiness Review
Status: Future
