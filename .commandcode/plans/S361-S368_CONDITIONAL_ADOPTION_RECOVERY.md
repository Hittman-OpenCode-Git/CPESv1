# S361–S368 — Conditional Adoption Recovery Chain

**Plan Type:** Execution — Content Remediation + Governance Recovery
**Status:** Draft — Awaiting Approval
**Created:** 2026-07-27
**Authority:** S361 Readiness Board (BLOCKED verdict, Options A/B/C)
**Depends On:** `reports/session361/SESSION361_READINESS_BOARD.json` (frozen T0 ground truth)

---

## Strategic Objective

```
Governance Truth  →  Certification Integrity  →  Baseline Integrity  →  Adoption Integrity
```

Restore all four pillars before any excellence, maturity, or full-adoption activities continue. The S361-S363 maturity program (operational excellence measurement) is superseded. The current program is **corrective reconciliation**, not excellence measurement.

---

## Authoritative State (T0 — S361 Readiness Board)

| Metric | Value | Source |
|--------|-------|--------|
| Certified Pool | 2,298 / 2,540 (90.5%) | Direct grep + pack parse |
| Governance Guard | 32/32 PASS | `.opencode/plugins/governance-guard.js` |
| Framework v2 Status | CONDITIONALLY ADOPTED — 96/100 | S822 (authoritative; supersedes S360) |
| Certified DL-008 | 8 items (Pack C:1, Pack D:7 — Domain F) | S361 RB direct scan |
| Certified DL-026 | ~34 items (Pack C:16, Pack D:18 — Domain F) | S361 RB direct scan |
| Baseline Drift | Pack C hash mismatch (02BD4D→113210), Pack D hash mismatch (E0C365→ED6942) | S361 RB hash verification |
| Stale Baselines | CURRENT_BASELINES.md §3 claims DL-008 RESOLVED (0) — false | S361 RB cross-check |

**Key discrepancy note:** S852 DEFECT_MANIFEST (2026-07-27T14:10Z) reports 0 Certified DL-008 and 0 Certified DL-026. S822 reports 0 Certified DL-008 and 77 Certified DL-026. The S361 Readiness Board reports 8 Certified DL-008 and ~34 Certified DL-026. S361 Ground Truth Reconciliation resolves this three-way conflict.

---

## Session Chain

### S361 — Ground Truth Reconciliation

**Mission:** Resolve all conflicts between S360, S822, CURRENT_BASELINES, DEFECT_LIBRARY, S852 Manifest, and Live Inventory. Establish a single source of truth.

**Nested Agents:**

| Role | Agent | Mission |
|------|-------|---------|
| Inventory truth extraction | A–D | Direct Function-constructor parse of all 5 packs. Extract QuestionID, question_state, CorrectChoice, all 4 ExplanationWrong fields. Produce exhaustive QID-level inventory. |
| Certified DL-008 validation | E–H | For every item flagged as Certified DL-008 by any prior report (S822:0, S361 RB:8, S852:0, CURRENT_BASELINES:0), perform raw-file line-level verification. Determine which are genuine and which are scan artifacts. |
| Certified DL-026 validation | I–L | For every item flagged as Certified DL-026 by any prior report (S822:77, S361 RB:34, S852:0), perform raw-file line-level verification. Classify by section, root cause, and state. |
| Baseline drift analysis | M–P | Hash all runtime-critical files. Compare against S811 T0 baselines. Identify all drift, classify as authorized or unauthorized. Determine root cause of Pack C+D drift. |
| Approval Board | Q–Z | Consolidate all findings. Issue authoritative single-source-of-truth document. Freeze as T0 baseline for S362–S368. |

**Outputs:**
- `reports/session361/SESSION361_GROUND_TRUTH_RECONCILIATION.json` — authoritative inventory
- `reports/session361/SESSION361_AUTHORITATIVE_STATE.md` — human-readable summary

**Success:** Single source of truth established. All conflicting reports reconciled. Defect QID lists verified via raw-file line evidence.

**IS:** An independent cross-verification of every self-reported claim from S360, S822, CURRENT_BASELINES, S852 manifest, and DEFECT_LIBRARY against live pack files.
**IS NOT:** Any content remediation, file modification, certification change, or baseline recapture.

---

### S362 — Certification Integrity Recovery

**Mission:** Determine the exposure created by the verified 8 Certified DL-008 and ~34 Certified DL-026 items. Produce per-item-group decisions.

**Nested Agents:**

| Role | Agent | Mission |
|------|-------|---------|
| Impact analysis | A–H | For each verified DL-008 and DL-026 QID: assess learner-pool exposure (rendering behavior, educational degradation), certification history (when certified, by which session), and defect severity. |
| Learner-pool exposure review | I–P | Trace each affected QID through the delivery mechanism. Confirm whether May's defect manifest correctly blocks them. Verify rendering engine behavior with non-empty/empty EW[CC] slots. |
| Approval Board | Q–Z | Issue per-item-group decision: ARCHIVE (remove from pool), REMEDIATE (fix and retain), or WAIVE (documented acceptance of risk). |

**Outputs:**
- `reports/session362/SESSION362_CERTIFICATION_INTEGRITY_REPORT.json`
- `reports/session362/SESSION362_EXPOSURE_ANALYSIS.md`

**Decision Categories:**
- **Archive:** Items where remediation cost exceeds educational value or where structural issues make repair unsafe
- **Remediate:** Items where the defect is mechanically fixable and educational value is preserved
- **Waive:** Items where the defect has zero learner-facing impact (documented acceptance)

**IS:** A read-only impact assessment and decision framework.
**IS NOT:** Any actual remediation, archival, or content modification.

---

### S363 — Baseline Re-Capture

**Mission:** Replace stale CURRENT_BASELINES.md with a verified live snapshot. All hashes recaptured. All §3 defect status entries reconciled against S361 ground truth.

**Nested Agents:**

| Role | Agent | Mission |
|------|-------|---------|
| Pack hash verification | A–D | SHA-256 hash all 5 pack files + 5 scored case files. Verify against S811 baselines. Document all drift. |
| Artifact verification | E–H | Hash app.js, index_updated.html, styles.css, may-core.js, may-learner-state.js. Verify governance-guard test suite. Confirm 32/32 PASS. |
| Governance verification | I–L | Validate CURRENT_BASELINES.md §3 (Defect & Risk Status) against S361 ground truth. Correct all stale entries. Remove "DL-008 RESOLVED (0)" claim. |
| Identity verification | M–P | Re-run identity integrity scan. Confirm 2,539/2,540 (99.96%) or better. Flag any degradation. |
| Output Board | Q–Z | Produce CURRENT_BASELINES.md vNext. Freeze new baselines with immutability clause. |

**Outputs:**
- `reports/session363/SESSION363_BASELINE_RECAPTURE.json`
- `knowledge/CURRENT_BASELINES.md` (updated)
- `reports/session363/SESSION363_BASELINE_CERTIFICATION.md`

**IS:** A baseline recapture session. Replaces stale hashes and stale defect-status claims with verified live values.
**IS NOT:** A content remediation session. No pack files modified.

---

### S364 — DL-008 Recovery Wave

**Mission:** Remove all verified Certified DL-008 findings from the learner pool via mechanical clear or editorial rewrite, following the established Bucket 1/2/3 protocol.

**Nested Agents:**

| Role | Agent | Mission |
|------|-------|---------|
| Item verification | A–F | Re-verify each DL-008 item's CorrectChoice and ExplanationWrong[CC] content. Classify into Bucket 1 (safe mechanical clear), Bucket 2 (editorial review), or Bucket 3 (misattributed). |
| Remediation | G–L | Execute clears/rewrites in batches ≤28 items per governance-guard Rule 5. Backup-before-write per BACKUP_PROTOCOL.md. |
| Rule 2 validation | M–R | Post-remediation: verify ExplanationWrong[CorrectChoice] === "" for all remediated items. Confirm no CorrectChoice changes. Run governance-guard test suite. |
| Approval Board | S–Z | Independent verification. Cross-check against S361 ground truth. Confirm 0 Certified DL-008 remaining. |

**Outputs:**
- `reports/session364/SESSION364_DL008_REMEDIATION_RESULTS.json`

**IS:** A targeted remediation session. Only Certified DL-008 items from S361 ground truth are touched.
**IS NOT:** A full-pool DL-008 sweep. Non-Certified DL-008 items are out of scope.

---

### S365 — DL-026 Recovery Wave

**Mission:** Fill empty non-CorrectChoice ExplanationWrong slots in all verified Certified DL-026 items. Author choice-specific distractor explanations.

**Nested Agents:**

| Role | Agent | Mission |
|------|-------|---------|
| Domain F correction | A–F | For each Domain F DL-026 item (Pack C:16, Pack D:18): author choice-specific distractor explanation for each empty non-CC slot. Reference actual Choices text (not metadata-block ChoiceA-D — avoids DL-016 mismatch). |
| Domain E verification | G–L | Verify whether Domain E sections have Certified DL-026 (S822 claimed 38, S361 RB says 0 Certified). If 0, document as S822 scan artifact. If >0, add to remediation queue. |
| Rule 6 validation | M–R | Post-remediation: verify all non-CC ExplanationWrong slots are non-empty. Confirm CorrectChoice slots remain empty (DL-008 compliance). Confirm CorrectChoice unchanged. |
| Approval Board | S–Z | Independent verification. Cross-check against S361 ground truth. Confirm 0 Certified DL-026 remaining. |

**Outputs:**
- `reports/session365/SESSION365_DL026_REMEDIATION_RESULTS.json`

**IS:** A targeted remediation session for Certified DL-026. Non-Certified items (Pack C/D Sections E+F, ~227 items) are out of scope.
**IS NOT:** A full DL-026 sweep. The non-Certified pool remains for later certification waves.

---

### S366 — Governance Re-Certification

**Mission:** Re-run the full 32/32 governance guard test suite against the corrected inventory. Confirm all enforcement layers operational. Verify no new defects introduced by remediation.

**Scope:**
- Governance guard: 32/32 tests
- Rule 2 (DL-008 BLOCK): 0 violations
- Rule 6 (DL-026 BLOCK): 0 violations (or properly flagged)
- Rule 3 (Registry BLOCK): registry matches live inventory
- Rule 5 (30-item cap): all batches compliant
- Defect manifest: regenerated from corrected inventory

**Output:**
- `reports/session366/SESSION366_GOVERNANCE_RECERTIFICATION.json`

---

### S367 — Adoption Reassessment

**Mission:** Re-evaluate the Framework v2 adoption score (currently 96/100) against the corrected state after S361–S366. Determine whether conditions for FULLY ADOPTED are now met.

**Against S822 conditions:**
- C3 (Domain F DL-026): Closed via S365
- Certified DL-008: 0 (closed via S364)
- Certified DL-026: 0 (closed via S365)
- Baseline integrity: Restored (closed via S363)
- Governance guard: 32/32 (confirmed via S366)

**Possible outcomes:**
- Remain CONDITIONALLY ADOPTED (if any condition remains OPEN)
- Promote to FULLY ADOPTED (if all conditions CLOSED + all stop conditions PASS)

**Output:**
- `reports/session367/SESSION367_ADOPTION_REASSESSMENT.json`

---

### S368 — Full Adoption Board

**Mission:** Final determination after all remediation and baseline correction. Issue the definitive adoption verdict.

**Decision options:**
- **CONDITIONALLY ADOPTED** — if any unresolved condition remains
- **FULLY ADOPTED** — if all conditions CLOSED, all stop conditions PASS

**Outputs:**
- `reports/session368/SESSION368_FINAL_ADOPTION_DECISION.md`
- `reports/session368/SESSION368_EXECUTIVE_SUMMARY.md`

Upon FULLY ADOPTED: The maturity/excellence tracks (formerly S361-S363) can be re-planned against a clean baseline.

---

## Stop Conditions (All Sessions)

Per S361 Readiness Board, the following automatic stop conditions gate every session in this chain:

| Condition | Severity | Action on Trigger |
|-----------|----------|-------------------|
| Governance Guard ≠ 32/32 PASS | BLOCKING | Halt all agents, diagnose, do not proceed |
| Identity < 99% | BLOCKING | Halt remediation agents, escalate |
| Certification Drift > 0 (unauthorized) | BLOCKING | Halt all write agents, verify authorization |
| New Certified DL-008 introduced | BLOCKING | Halt remediation, root-cause the introduction |
| New Certified DL-026 introduced | BLOCKING | Halt remediation, root-cause the introduction |
| Artifact Integrity FAIL | BLOCKING | Halt, recapture baselines before continuing |

---

## Governance Notes

1. **AGENTS.md §2 — Read-Only Default:** Sessions S361, S362, S363 are read-only. S364, S365 are write-authorized. S366, S367 are read-only. S368 is read-only (decision only).

2. **AGENTS.md §3 — Backup Protocol:** Mandatory before every pack file edit in S364 and S365. Timestamped backup, confirm non-zero size, then edit.

3. **AGENTS.md §4 — REVISION_HISTORY.md:** Every content change must pair with a REVISION_HISTORY.md entry. Write contemporaneously, not batched.

4. **AGENTS.md §5 — Dual Verification:** All self-reported claims of "0 remaining" must be cross-checked against raw file/line evidence. Do not accept summary reports at face value.

5. **Governance Guard Rule 5:** Maximum 30 question objects per change-set. All remediation batches must comply.

6. **AGENTS.md §6 — Item-Count Volatility:** If DL-008/DL-026 counts change between scans (e.g., S852→S361→post-remediation), require count stabilization before proceeding.

7. **AGENTS.md §12 — No Staged Findings:** Any new defect discovered during this chain must be logged to DEFECT_LIBRARY.md before the discovering session closes.

---

## Success Criteria

- [ ] S361: Single source of truth established — all S360/S822/S852/CURRENT_BASELINES conflicts resolved
- [ ] S362: Per-item-group decisions issued (Archive/Remediate/Waive) for all verified Certified defects
- [ ] S363: CURRENT_BASELINES.md recaptured with live hashes and corrected §3 defect status
- [ ] S364: 0 Certified DL-008 remaining — verified via raw-file line evidence
- [ ] S365: 0 Certified DL-026 remaining — verified via raw-file line evidence
- [ ] S366: 32/32 governance guard PASS — no regressions
- [ ] S367: Adoption reassessment complete — score reflects corrected state
- [ ] S368: Definitive adoption verdict issued (CONDITIONALLY or FULLY ADOPTED)

---

## Self-Assessment

S369 can code S361 from this document alone: **YES** — agent roles, missions, inputs, outputs, and validation criteria are fully specified. Session boundary rules (read-only vs. write-authorized) are explicit. Stop conditions are defined. The T0 ground truth is frozen in `SESSION361_READINESS_BOARD.json`.
