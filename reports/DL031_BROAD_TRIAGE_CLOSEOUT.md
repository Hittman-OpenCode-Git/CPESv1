# DL-031 Broader Triage Closeout — Containment-Heuristic False Positives

**Date:** 2026-09-10
**Scope:** ~252 pool-wide flags from stem↔correct-answer containment screen (scripts/scan_dl031_v2.js)
**Method:** Function-constructor within-object extraction (DL-029-compliant); cognitive-level stratification
**Verdict:** Systematic false positives on Apply calculation items. 17 true definition-match items already reclassified this session. No further writes.

## Why the heuristic over-flags

The containment screen measures what fraction of correct-answer words appear in the stem. On
calculation items (`CognitiveLevel: Apply`, `CalculationItem: true`), the stem *must* contain the
input numbers and often the computed result's units — so containment ≈ 1.0 is expected and correct.
Examples triaged clean (correctly Moderate):

- P1-B-066 (Pack A): "68,500 pounds" — production-budget arithmetic, Apply, correctly Moderate
- P1B-B-103: "52,000" — Q1 production with inventory carry, Apply, correctly Moderate
- P1-BC-041/042/044: "42,000 units" — forecast/inventory arithmetic, Apply, correctly Moderate
- P1B-D-133/135: "10,000 units" — break-even division, Apply, correctly Moderate

Containment is a valid *recall* screen only when stratified by cognitive level. Unstratified, it is
a calculation-item detector, not a definition-match detector.

## True positives (already remediated this session)

17 Remember/Understand items with containment > 0.6 reclassified Moderate/3 → Easy/1
(P1B-A-083, P1B-E-146, P1-BC-066/067, P1-DC-016/017, P1-FC-020, P1-AD-032/033/034/035/052/053,
P1-CD-091/094, P1E-D-039, P1E-E-044). CognitiveLevel preserved (Rule 12). Backups
`.bak-dl031-20260909200000`. REVISION_HISTORY.md 2026-09-10 entry.

## Session 700 estimate reconciliation

The "~500 items" estimate (Session 700, 15-item sample extrapolated) is not confirmed by
pool-wide measurement. The stratified screen yields 17 true positives. The estimate's sampling
frame (2/3 overstated in tiny samples) does not survive full-pool verification. The estimate is
superseded for the definition-match subclass; residual difficulty-label risk, if any, lives in
distractor-sophistication judgment calls (per-item human review), not in a 500-item backlog.

## Regression test

- Re-run scripts/scan_dl031_v3.js: expect only the 17 remediated items (now Easy/1, excluded by filter) → 0 candidates
- Spot-check any future Moderate+Remember/Understand item for definition-match before certification
- Do not run unstratified containment screens as defect evidence (DL-045 positive-evidence doctrine)
