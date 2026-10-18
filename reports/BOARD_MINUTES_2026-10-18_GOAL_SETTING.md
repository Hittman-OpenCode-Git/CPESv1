# Board Minutes — Goal Setting (2026-10-18)

**Meeting:** Part 2 Go-Live Goal Setting  
**Date:** 2026-10-18  
**Minute Ref:** 85933e2 (Part 2 GO ruling)  
**Status:** Filed

---

## 1. Attendance

Emergency review board (governance session), Full Governance Lane.

---

## 2. Part 2 GO Ruling (Minute 85933e2)

The board formally ruled **Part 2 GO for go-live**. The P2 emergency repairs (DL-073 loader global-resolution fix, DL-074 P2-C whole-item clone archive, bank 4/5 consolidation into 3-pack architecture, DL-070 P1-E key corrections, DL-071 blocklist regeneration) were committed as `1244e9c`.

T0 verified green: `npm run preflight` PASS (0 divergences), governance guard 123/123 PASS, `probe:parity` PASS (0 divergences).

---

## 3. Goals Adopted

### Goal 1 — Close the P2 Case Bank (68 → 100 Strict-Eligible)

**Status at adoption:** Case-level close already substantially complete — `p2/case_pack_p2_1/2/3.js` = 110 cases / 660 items; 101 case-level Certified (meets ≥100 strict-eligible target); 9 Archived (all in `case_pack_p2_2.js`, excluded by design); 0 In-Audit items.

**Remaining work:** Item-level `question_state` certification for unset items (519 unset) and CAQS §4 explanation-quality repair, executed in ≤30-object waves per RULE 5 with backups, RULE 16 stamps, REVISION_HISTORY entries, RULE 22 evidence basis. **No Certified flip without a clean semantic-screen re-run (§9.2.1 Tend gate).**

### Goal 2 — Zero the Screen Debt with Codified Scan-Boundary Doctrine

**Status at adoption:** 448 case-screen flags (431 on certified cases; 246 on fully-certified items); 128 FLAG-severity require DL-045 hand-solve adjudication; 281 weak + 39 info are documented FP patterns per DL-065; plus 1 pre-existing CBQ23-B5-Q1 SCRATCHWORK flag.

**Work:**
- Phase 1: read-only triage — categorize each flag (genuine inversion vs documented FP), record tested population boundary.
- Doctrine: codify scan-boundary/control-set discipline as a standing entry (`knowledge/SCAN_BOUNDARY_DOCTRINE.md`) to prevent "closure wider than its scan" (DL-066/067/068).
- Certification flips only for confirmed genuine inversions, after screens are clean and re-run stable.

### Goal 3 — Publish the Go-Live Gate & Release Plan v1.0

**Status at adoption:** Go-live gate ruling exists (minute 85933e2); Release Plan v1.0 never written; board goal-setting minutes never filed.

**Work:** Write `reports/RELEASE_PLAN_v1.0.md` (one-command release gate, versioned hash-stamped artifact, G1–G7 sign-off matrix, S121 portfolio audit as §19.4-type gate, analytics-instrumentation readiness, §18 third-party handoff for quarantined P2 cases). File these goal-setting minutes.

---

## 4. Sequencing (Per §9.2.1 Tend Gate)

1. Goal 2 Phase 1 triage (read-only) → doctrine entry → Release Plan + minutes (writes).
2. Goal 2 adjudication flips for confirmed genuine inversions (writes, ≤30-object waves).
3. Goal 2 screen re-run → confirm clean (zero new flags, zero inversions).
4. Goal 1 item-level certification flips (§9.2.1 requires clean screens first).
5. Goal 3 release gate execution → hash-stamped release artifact → G1–G7 sign-off.

No `question_state` flip to Certified is final until the screen re-run at step 3 is clean.

---

## 5. Governance Constraints (Full Governance Lane)

- RULE 1: every `question_state` change pairs with `knowledge/REVISION_HISTORY.md` entry.
- RULE 5: max 30 question objects per change-set without `BLOCK-AUTHORIZED`.
- RULE 16: certification stamp (`certification_batch` + `certification_date`) on each flip.
- RULE 22: evidence-basis traceability on certification/key/explanation changes.
- §3: timestamped backup before every pack edit.
- §5: dual verification — all claims cross-checked against raw file/line evidence.
- DL-045: screen output is evidence, not an author; no auto-remediation.

---

## Revision History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-10-18 | Board | Filed goal-setting minutes; Part 2 GO ruling (85933e2); three goals adopted |
