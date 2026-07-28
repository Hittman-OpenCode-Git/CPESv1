# S364–S368 Remediation & Baseline Restoration Program

**Plan Date:** 2026-07-27
**Status:** Ready for Execution
**Prerequisite:** S361 Readiness Board (T0 ground truth: 2,298 Certified, 8 DL-008, ~34 DL-026, Pack C+D hash drift)
**Depends On:** S361 Readiness Board frozen metrics
**Successor Program:** S369–S373 Adoption Restoration & Content Integrity Certification

---

## Strategic Context

S361 established the T0 ground truth:

| Metric | S361 Value |
|--------|-----------|
| Certified pool | 2,298 |
| Governance Guard | 32/32 PASS |
| Certified DL-008 | 8 items |
| Certified DL-026 | ~34 items |
| Baseline integrity | FAIL (Pack C+D hash mismatch) |

S364–S368 eliminates the 4 automatic stop conditions that S361 triggered. Only after all 6 stop conditions PASS can S369–S373 (adoption restoration) proceed.

**What this program IS:**
- DL-008 clearance on 8 Certified Domain F items
- DL-026 distractor explanation authoring on 37 Certified Domain F items
- Baseline recapture (all 15 runtime file hashes + defect status)
- Independent verification that all 6 stop conditions PASS

**What this program IS NOT:**
- A certification wave (no question_state changes)
- A recertification (all items remain Certified throughout)
- An adoption determination (that's S369–S373)
- Domain E remediation (0 Certified DL-026 in Domain E per S361)

---

## Defect Scope — Authoritative QID Lists

### DL-008 (8 items, 8 EW[CC] slots to clear)

All 8 items were certified in S853 WAVE_A. The ExplanationWrong[CorrectChoice] field is non-empty — it contains distractor-flavored text in the CC slot. Root cause: the template pipeline treated the CC slot as a distractor slot when filling content.

| QID | Pack | Section | CC | Slots to Clear |
|-----|------|---------|----|-----------------|
| P1-FC-001 | pack_c | F | A | EW[A] → "" |
| P1-FD-043 | pack_d | F | C | EW[C] → "" |
| P1-FD-049 | pack_d | F | C | EW[C] → "" |
| P1-FD-054 | pack_d | F | C | EW[C] → "" |
| P1-FD-059 | pack_d | F | C | EW[C] → "" |
| P1-FD-064 | pack_d | F | C | EW[C] → "" |
| P1-FD-069 | pack_d | F | C | EW[C] → "" |
| P1-FD-073 | pack_d | F | C | EW[C] → "" |

**Pattern:** All 7 Pack D items have CC=C with non-empty EW[C]. The P1-FC-001 item has CC=A with non-empty EW[A]. The EW[CC] field contains complete distractor-explanation text (100-300 chars) that needs to be cleared to `""`.

**CRITICAL: Overlap with DL-026.** All 8 DL-008 items ALSO have DL-026 (empty non-CC distractor slots). The remediation order matters:

- **Repair DL-008 first** (clear EW[CC] to "") — this is a mechanical operation, no content authoring
- **Then repair DL-026** (author content into empty distractor slots) — this requires domain knowledge

If DL-026 is repaired first (authoring into EW[D] and EW[A]), the DL-008 clearance (setting EW[C] to "") is independent. Order within S364 → S365/S366 is enforced by session sequence.

### DL-026 (37 items, 56 empty EW slots to fill)

Per S821 remediation queue (cross-verified against 4 pipeline artifacts). Items from S816 (P1-FD-033, P1-FD-034, 2 items/3 slots) already fixed.

| Phase | Pack | QID Count | Fields | QID List |
|-------|------|-----------|--------|----------|
| S365 | pack_c | 19 | 28 | FC-001, 006, 007, 010, 015, 020, 025, 026, 031, 036, 043, 048, 053, 058, 063, 068, 073, 074, 075 |
| S366 P1 | pack_d | 9 | 13 | FD-043, 049, 054, 059, 064, 069, 073, 074, 075 |
| S366 P2 | pack_d | 9 | 15 | FD-001, 006, 011, 016, 021, 026, 027, 030, 031 |

**Overlap analysis (DL-008 ∩ DL-026):**

P1-FC-001, P1-FD-043, P1-FD-049, P1-FD-054, P1-FD-059, P1-FD-064, P1-FD-069, P1-FD-073 are in BOTH lists. These items need BOTH DL-008 cleared AND DL-026 filled. No conflict — they're independent operations on different EW slots within the same object.

**Rotation artifact pattern** (from S816):

| CorrectChoice | Empty Slots |
|---------------|-------------|
| A | EW_B (1 slot) |
| B | EW_A, EW_C (2 slots) |
| C | EW_A, EW_D (2 slots) |
| D | EW_A (1 slot) |

---

## Session Specifications

### S364 — DL-008 Clearance (8 Items)

**Type:** WRITE — Content remediation
**Mission:** Clear ExplanationWrong[CorrectChoice] to `""` on 8 Certified Domain F items.

**Agents A–D:** Pack C DL-008 audit and remediation
- Verify P1-FC-001 CC=A, EW[A] non-empty via raw file inspection
- Set EW[A] to `""`
- Verify P1-FC-001 post-remediation: EW[A] === "" AND non-empty distractor EW slots preserved

**Agents E–H:** Pack D DL-008 audit and remediation (FD-043, 049, 054, 059)
- Verify each item's CC and non-empty EW[CC] via raw file inspection
- Set EW[CC] to `""` on each
- Verify post-remediation

**Agents I–L:** Pack D DL-008 audit and remediation (FD-064, 069, 073)
- Verify each item's CC and non-empty EW[CC] via raw file inspection
- Set EW[CC] to `""` on each
- Verify post-remediation

**Agents M–P:** Cross-pack verification
- Direct Function-constructor parse of pack_c and pack_d
- Count DL-008: target 0 Certified
- Count DL-026: unchanged from pre-remediation (37 items unfixed)
- Verify question_state unchanged on all 8 items

**Approval Board Q–Z:** Sign-off

**Outputs:**
- `reports/session364/SESSION364_DL008_CLEARANCE.json` — Per-item before/after evidence
- `reports/session364/SESSION364_DL008_VERIFICATION.md` — Approval board sign-off

**Pre-execution:**
- Backup: `pack_c_corrected.js.bak-20260727S364` and `pack_d_corrected.js.bak-20260727S364`
- Governance guard pre-check: 32/32 PASS

**Post-execution verification:**
- `node scripts/test_governance_guard.js` → 32/32 PASS
- Raw grep: `"question_state": "Certified"` count unchanged at 2,298
- DL-008 scan: 0 Certified items with non-empty EW[CC]

**Governance guard rules impacted:**
- Rule 2 (DL-008 BLOCK): No violation — we are SETTING EW[CC] to "", not making it non-empty
- Rule 5 (30-item cap): 8 items < 30 — compliant without BLOCK-AUTHORIZED

**Edit methodology per item:**
```
old_string: "ExplanationWrongX": "Choice X is incorrect because [full distractor text]",
new_string: "ExplanationWrongX": "",
```
Where X = CorrectChoice letter. Only perform edit when exact match is confirmed via raw file inspection.

---

### S365 — DL-026 Remediation: Pack C Domain F (19 Items, 28 Fields)

**Type:** WRITE — Content authoring
**Mission:** Author choice-specific distractor explanations for 19 Pack C Domain F items with 28 empty non-CC ExplanationWrong slots.

**Prior to authoring, confirm S364 DL-008 clearance on P1-FC-001** — this item appears in BOTH S364 and S365. EW[A] must already be "" from S364 before EW[B] is authored.

**Agents A–D:** FC-001 through FC-036 (10 items: 001, 006, 007, 010, 015, 020, 025, 026, 031, 036)
- For each item, identify empty EW slots via raw file inspection
- Author content per the Content Authoring Standard (below)
- Verify post-authoring: EW slot is non-empty, ≥50 chars, choice-specific

**Agents E–H:** FC-043 through FC-075 (9 items: 043, 048, 053, 058, 063, 068, 073, 074, 075)
- For each item, identify empty EW slots via raw file inspection
- Author content per the Content Authoring Standard
- Verify post-authoring

**Agents I–L:** Cross-verification
- Direct Function-constructor parse of pack_c
- Count DL-026 in Section F: target 0 Certified items with empty non-CC EW slots
- Count DL-008: must remain 0
- Verify question_state unchanged on all 19 items

**Agents M–P:** Quality review
- Spot-check 25% of authored explanations for choice-specificity
- Verify no duplication across items
- Verify framework references where applicable

**Approval Board Q–Z:** Sign-off

**Outputs:**
- `reports/session365/SESSION365_DL026_PACKC_REMEDIATION.json`
- `reports/session365/SESSION365_DL026_PACKC_VERIFICATION.md`

**Pre-execution:**
- Backup: `pack_c_corrected.js.bak-20260727S365`
- Confirm S364 DL-008 clearance on P1-FC-001 (EW[A] === "")
- Governance guard pre-check: 32/32 PASS

**Post-execution verification:**
- `node scripts/test_governance_guard.js` → 32/32 PASS (Rule 6 must not flag new DL-026)
- Certified DL-026 in Pack C Section F: 0
- Certified DL-008 in Pack C: 0
- `"question_state": "Certified"` count unchanged at 2,298

**Content Authoring Standard (from S816/S821):**

For each empty ExplanationWrong slot:
1. **Identify the specific error** in that distractor choice — what concept is misapplied?
2. **Explain the candidate misconception** that would lead to selecting this choice
3. **Contrast with the correct approach** — why is the correct answer better?
4. **Reference the appropriate framework** where applicable:
   - NIST CSF / SP 800-series (security and data protection)
   - COBIT 2019 (IT governance)
   - ISO 27001 (information security management)
   - COSO Internal Control — Integrated Framework (IT controls)
   - IMA SMA / SFFAC (analytics and data topics)
5. **Minimum 50 characters** (typical: 80–200)
6. **Choice-specific** — unique text per slot, not shared or templated

**Format:** `"Choice X is incorrect because [reason]. [Misconception]. [Contrast with correct]. A candidate may [common error pattern]."`

**Batch size:** 19 items (≤30, Rule 5 compliant without BLOCK-AUTHORIZED)

---

### S366 — DL-026 Remediation: Pack D Domain F (18 Items, 28 Fields)

**Type:** WRITE — Content authoring
**Mission:** Author choice-specific distractor explanations for 18 Pack D Domain F items grouped into two phases.

**Phase 1 — Agents A–D:** FD-043 through FD-075 (9 items: 043, 049, 054, 059, 064, 069, 073, 074, 075)
- **CRITICAL: Prior to authoring, confirm S364 DL-008 clearance on all 7 items in the DL-008 overlap list (FD-043, 049, 054, 059, 064, 069, 073).** EW[CC] must already be "".
- Author content for empty distractor EW slots
- Verify post-authoring

**Phase 2 — Agents E–H:** FD-001 through FD-031 (9 items: 001, 006, 011, 016, 021, 026, 027, 030, 031)
- Author content for empty distractor EW slots (these items likely have DL-026 only, no DL-008)
- Verify post-authoring

**Agents I–L:** Cross-verification
- Direct Function-constructor parse of pack_d
- Count DL-026 in Section F: target 0 Certified items
- Count DL-008: must remain 0
- Verify question_state unchanged on all 18 items

**Agents M–P:** Quality review
- Spot-check 25% of authored explanations
- Verify choice-specificity, framework references

**Approval Board Q–Z:** Sign-off

**Outputs:**
- `reports/session366/SESSION366_DL026_PACKD_REMEDIATION.json`
- `reports/session366/SESSION366_DL026_PACKD_VERIFICATION.md`

**Pre-execution:**
- Backup: `pack_d_corrected.js.bak-20260727S366`
- Confirm S364 DL-008 clearance on FD-043/049/054/059/064/069/073
- Governance guard pre-check: 32/32 PASS

**Post-execution verification:**
- Governance guard: 32/32 PASS
- Certified DL-026 in Pack D Section F: 0
- Certified DL-008: 0
- `"question_state": "Certified"` count unchanged at 2,298

---

### S367 — Baseline Integrity Recapture

**Type:** READ-ONLY + DOCUMENTATION — Baseline recapture (no pack file writes)
**Mission:** Recapture all 15 runtime file hashes, update Certified Pool snapshot, refresh defect status in CURRENT_BASELINES.md.

**Agents A–D:** File hash recapture
- Get-FileHash SHA256 on all 15 runtime files
- Compare against S811 T0 baselines
- Document expected drift: pack_c (S364+S365 writes) and pack_d (S364+S366 writes)

**Agents E–H:** Certified pool verification
- Direct grep: `"question_state": "Certified"` count across all 5 packs
- Per-pack certification totals
- Confirm 2,298 stable (no certification events in S364-S366)

**Agents I–L:** Defect status refresh
- DL-008 scan: Function-constructor parse all 5 packs, verify 0 Certified DL-008
- DL-026 scan: Function-constructor parse Packs C+D Domain F, verify 0 Certified DL-026
- DL-021/DL-016: unchanged from pre-remediation state
- Update §3 tables to reflect post-remediation reality

**Agents M–P:** Governance baseline verification
- Governance guard: 32/32 PASS
- Verify CURRENT_BASELINES.md §4 guard status matches reality

**Approval Board Q–Z:** Baseline certification

**Outputs:**
- `reports/session367/SESSION367_BASELINE_INTEGRITY.json` — Full hash table, certified counts, defect status
- Updated `knowledge/CURRENT_BASELINES.md` — §1 hashes recaptured, §3 defect status refreshed

**Pre-execution:**
- Backup: `knowledge/CURRENT_BASELINES.md.bak-20260727S367`
- No pack file writes in this session

**Success criteria for CURRENT_BASELINES.md update:**
- §1: All 15 SHA-256 hashes recaptured and match live files
- §2: Certified Pool reflects 2,298 (unchanged)
- §3: DL-008 status: 0 Certified (clear), DL-026 status: 0 Certified Domain F (clear), DL-021/DL-016 retained as-is
- §4: Governance guard 32/32 PASS

---

### S368 — Pre-Adoption Verification & Stop Condition Validation

**Type:** READ-ONLY — Independent verification (no pack file writes)
**Mission:** Run the full S361 stop-condition checklist against the remediated inventory. Verify all 6 conditions PASS.

**Agents A–D:** DL-008 independent audit
- Function-constructor parse all 5 packs
- Extract all items with question_state: "Certified"
- Count DL-008: must be 0
- List verification: check each of the 8 S361 QIDs individually

**Agents E–H:** DL-026 independent audit
- Function-constructor parse Packs C+D Section F
- Count Certified items with empty non-CC EW slots: must be 0
- List verification: check each of the 37 S821 QIDs individually

**Agents I–L:** Baseline integrity verification
- Get-FileHash SHA256 on all 15 files
- Compare against CURRENT_BASELINES.md (S367 recaptured)
- Must be 15/15 match

**Agents M–P:** Full stop-condition checklist
Run all 6 automatic stop conditions from S369–S373 program:

| # | Condition | Expected |
|---|-----------|----------|
| 1 | Governance Guard ≠ PASS | PASS (32/32) |
| 2 | Identity < 99% | PASS (99.96%) |
| 3 | Certification Drift > 0 | PASS (0 drift — all hashes match S367) |
| 4 | Certified DL-008 exists | PASS (0) |
| 5 | Certified DL-026 exists | PASS (0) |
| 6 | Baseline mismatch detected | PASS (all 15 match) |

**Approval Board Q–Z:** Adoption restoration gate

**Outputs:**
- `reports/session368/SESSION368_PREADOPTION_VERIFICATION.json` — Full stop-condition results with evidence
- `reports/session368/SESSION368_STOP_CONDITION_CHECKLIST.md` — Gate decision document

**Decision on exit:**
- All 6 PASS → S369–S373 AUTHORIZED to proceed
- Any FAIL → BLOCKED — return to failing session for remediation

---

## Deliverables Summary

| Session | Type | Pack Writes | Key Deliverables |
|---------|------|-------------|------------------|
| S364 | WRITE | pack_c, pack_d | SESSION364_DL008_CLEARANCE.json, SESSION364_DL008_VERIFICATION.md |
| S365 | WRITE | pack_c | SESSION365_DL026_PACKC_REMEDIATION.json, SESSION365_DL026_PACKC_VERIFICATION.md |
| S366 | WRITE | pack_d | SESSION366_DL026_PACKD_REMEDIATION.json, SESSION366_DL026_PACKD_VERIFICATION.md |
| S367 | READ-ONLY + DOC | CURRENT_BASELINES.md | SESSION367_BASELINE_INTEGRITY.json |
| S368 | READ-ONLY | none | SESSION368_PREADOPTION_VERIFICATION.json, SESSION368_STOP_CONDITION_CHECKLIST.md |

**Total pack file writes:** 4 (pack_c × 2 in S364+S365, pack_d × 2 in S364+S366)

---

## Governance Attestation Requirements (per AGENTS.md)

Each write session (S364, S365, S366) must:

1. **AGENTS.md §3 — Backup Protocol:**
   - Copy target file to timestamped backup before any edit
   - Confirm backup exists and has non-zero size
   - Proceed only after backup confirmed

2. **AGENTS.md §4 — REVISION_HISTORY.md:**
   - Entry written contemporaneously with each session's changes
   - Include before/after DL-008 and DL-026 counts
   - List QIDs modified

3. **AGENTS.md §5 — Dual Verification:**
   - Cross-check all self-reported claims against raw file/line evidence
   - `"question_state": "Certified"` count verified by direct grep before and after
   - DL-008/DL-026 counts verified by Function-constructor parse

4. **AGENTS.md §6 — Count Stability:**
   - Run certified count twice, confirm stable before proceeding

5. **Governance guard compliance:**
   - Rule 5: No batch exceeds 30 items without BLOCK-AUTHORIZED
   - Rule 2: No DL-008 introduced
   - Rule 6: No DL-026 introduced

---

## Automatic Stop Conditions

If any of these occur during S364–S368, halt and escalate:

| Condition | Detection |
|-----------|-----------|
| Governance guard test failure | `node scripts/test_governance_guard.js` ≠ 32/32 |
| Certified count changes | grep `"question_state": "Certified"` count ≠ 2,298 |
| New DL-008 introduced | Function-constructor parse finds new EW[CC] non-empty on Certified items |
| New DL-026 introduced | Function-constructor parse finds new empty non-CC EW slots on Certified items |
| CorrectChoice modified | Before/after CC comparison shows drift |
| question_state modified | Any item's state ≠ pre-remediation state |

---

## Success Criteria (Checklist)

- [ ] S364: 0 Certified DL-008 (was 8). 2,298 Certified stable. Governance guard 32/32.
- [ ] S365: 0 Certified DL-026 in Pack C Section F (was ~16). 2,298 Certified stable. Governance guard 32/32.
- [ ] S366: 0 Certified DL-026 in Pack D Section F (was ~18). 2,298 Certified stable. Governance guard 32/32.
- [ ] S367: CURRENT_BASELINES.md recaptured. All 15 hashes match live files. §3 defect status reflects post-remediation reality.
- [ ] S368: All 6 automatic stop conditions PASS. S369–S373 authorized.
- [ ] REVISION_HISTORY.md entries for all 5 sessions, written contemporaneously.
- [ ] Backups created and confirmed for every file write.
- [ ] No question_state changes. No CorrectChoice changes. No certification drift.
- [ ] DEFECT_LIBRARY.md updated if new findings discovered.

---

## Cross-References

- S361 Readiness Board: `reports/session361/SESSION361_READINESS_BOARD.json` (T0 ground truth)
- S821 Remediation Queue: `reports/session821/SESSION821_DOMAINF_REMEDIATION_QUEUE.json` (item lists)
- S816 Content Authoring Standard: `reports/session816/SESSION816_DOMAINF_CERTIFICATION.md`
- S357 DL-026 Process: `reports/session357/SESSION357_DL026_CERTIFICATION.json`
- CURRENT_BASELINES.md: S811 T0 hashes (stale for Packs C+D)
- AGENTS.md: Full governance ruleset (Sections 1–13)
- Governance guard: `.opencode/plugins/governance-guard.js` (32/32 tests)

---

*Plan generated 2026-07-27. S369–S373 follows upon S368 PASS.*
