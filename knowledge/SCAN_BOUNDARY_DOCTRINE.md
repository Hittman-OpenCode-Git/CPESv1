# Scan-Boundary Doctrine

**Version:** 1.0  
**Status:** Active  
**Authority:** AGENTS.md §5 (Dual Verification), DL-045 (screen output is evidence, not an author), DL-067 (scan-boundary closure)  
**Applies to:** All semantic-screen, key-verifier, and scan-based adjudication work in the CMA Exam Simulator

---

## 1. Purpose

Codify a single standing rule so that no defect-class closure claim is ever wider than the scan that produced it. This directly prevents the "closure wider than its scan" failure family (DL-066, DL-067, DL-068) in which a defect was declared closed for the whole population while the scan only covered a subset (P2 banks only, a single phrase list, or a single file).

---

## 2. Core Rule

> **A closure claim is valid only within the tested population boundary of the scan that supports it.**  
> Before declaring any defect class "closed," the author must state, in writing, the exact population the scan covered (files, QID ranges, item types, states, phrase lists) and must not generalize beyond it without a new scan of the remainder.

Every closure claim must answer:

| Question | Required Answer |
|----------|-----------------|
| Which files were scanned? | Enumerated paths, not "the bank" or "all packs" |
| Which item types? | e.g. multi/numeric/fill/select/match, or all |
| Which states? | e.g. Certified only, or Certified + In Audit |
| Which phrase / signature list? | Enumerated phrases, or full screen suite |
| What was the control result? | Synthetic defect injected → detected; clean control → silent |
| Was the scan deterministic? | Two consecutive runs produced identical flag sets |

---

## 3. Control-Set Discipline (L-01 / L-03 / L-10)

Every screen or detector must be validated against three controls before its results are trusted:

1. **Synthetic-defect control** — Inject a known defect into a temp mirror of the target population. The detector must fire on it.
2. **Clean-silence control** — Run the detector on verified-clean text. It must remain silent (zero false positives on the control set).
3. **Determinism control** — Run the detector twice on the same population. The flag set must be byte-identical (±2 noise tolerance per DL-051 Phase 1).

A detector that has not passed all three controls is not admitted as evidence.

---

## 4. Screen Output Is Evidence, Not Author (DL-045)

Semantic screens emit evidence only. They do not remediate, rewrite keys, or flip `question_state`.

| Screen emits | Authorized action |
|--------------|-------------------|
| FLAG (potential inversion) | Independent hand-solve adjudication per DL-047 flow; per-batch authorization for any state flip |
| weak / info (documented FP pattern) | Record as FP with tested boundary; no remediation |
| Genuine inversion confirmed by hand-solve | Small flip wave (≤30 objects per RULE 5 without BLOCK-AUTHORIZED), backups, REVISION_HISTORY entry, RULE 16 stamp, RULE 22 evidence basis |

No mass rewrite (≥3 objects) from screen output alone without an admissibility note citing stratified review, context review, adjudicated, triage, candidate-list, or independently derived basis (RULE 17).

---

## 5. Adjudication Flow for Certified-State Flags

1. Quarantine the flagged item (do not flip yet).
2. Independent hand-solve against exhibit/choices with the stored key withheld.
3. Compare independent result to stored key.
4. Record outcome: GENUINE / FALSE-POSITIVE / UNDETERMINED, with the tested population boundary noted.
5. If GENUINE: repair via per-batch authorization; re-run screens; confirm stability before any Certified flip (§9.2.1 Tend gate).
6. If FALSE-POSITIVE: document why, cite the matching documented FP pattern, state the scan boundary.
7. If UNDETERMINED: escalate; do not flip.

---

## 6. Related Defects (Precedent)

| Defect | Lesson |
|--------|--------|
| DL-066 | Bulk quarantine demoted 163 P1 items unattributed; closure claim exceeded scan boundary |
| DL-067 | P2 boilerplate closed as whole-population fixed; same class survived P1-wide (45 items) because scan was P2-scoped only |
| DL-068 | Word-count prompt mismatch had no screen at all; found only by learner report |
| DL-047 | Semantic-inversion family ~98% FP; genuine inversions caught by DL-026, not DL-047 |
| DL-065 | 5 genuine inversions confirmed via DL-045 hand-adjudication; 211 FPs |

---

## 7. Compliance Checklist (before any closure claim)

- [ ] Population boundary enumerated (files, types, states, phrase list)
- [ ] Synthetic-defect control passed
- [ ] Clean-silence control passed
- [ ] Determinism confirmed (two runs, identical flag sets)
- [ ] Each FLAG-severity item hand-adjudicated (DL-045)
- [ ] Closure claim scoped to tested boundary only
- [ ] REVISION_HISTORY entry documents the closure and its boundary

---

## Revision History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-10-18 | Scan-Boundary Doctrine | Initial doctrine consolidating DL-066 / DL-067 / DL-068 scan-boundary lessons |
