# S369–S373 — DL-026 Truth Audit & Adoption Restoration Chain

**Plan Type:** Multi-Session Read-Only Verification → Remediation → Governance → Adoption
**Created:** 2026-07-27
**Predecessor:** S368 Stop Condition Checklist (DL-008 resolved, DL-026 UNVERIFIED)
**Gating Finding:** S368 proved the S821 DL-026 queue is inflated by DL-029. Raw-line inspection of P1-FD-043 shows 0 empty distractor slots despite S821 claiming it as DL-026.

---

## Strategic Objective

```
Verified DL-026 Scope
    ↓
Authoritative Remediation Queue
    ↓
Adoption Restoration Decision
```

Without risking another DL-029-style governance failure where remediation is executed against false-positive data.

---

## Session 369 — DL-026 Ground Truth Audit

**Type:** READ-ONLY — Direct object-level inspection. No manifests. No window-scan logic. No forward-scan regex.

### Mission

Resolve the competing claims:

| Source | Claimed DL-026 Scope | Methodology | Trust |
|--------|---------------------|-------------|-------|
| S821 | 37 items, 56 slots | DL-029-vulnerable window scan | **CONTAMINATED** — S368 disproved P1-FD-043 |
| S822 | 77 certified items | Aggregated from S821 + Domain E estimate | **CONTAMINATED** — inherited S821 methodology |
| S368 | Likely inflated, 1 disproved by raw-line check | Single-item spot check | **CORRECT but incomplete** |

### Agents A–D — Independent Verification (Pack C Domain F)

**Scope:** All 28 Pack C Domain F items listed in S821 (P1-FC-001 through P1-FD-031)

**Methodology:**
```
For each QuestionID:
  1. Extract the complete JSON object by finding {QuestionID: "P1-FC-XXX"} to the closing }
  2. Read CorrectChoice from WITHIN that same object (not forward-scan)
  3. For each non-CorrectChoice letter in {A, B, C, D}, check ExplanationWrong[Letter]:
     - If === "" → GENUINE DL-026
     - If undefined/absent → DL-021 (field absent — more severe)
     - If non-empty → CLEAN (S821 false positive)
```

**Deliverable:** Raw per-item table: QID, CC, EW-A/B/C/D status (empty/non-empty/absent), DL-026 classification (GENUINE/FP/DL-021), pack, section

### Agents E–H — Independent Verification (Pack D Domain F)

**Scope:** All 11 Pack D Domain F items listed in S821 (P1-FD-033 through P1-FD-075)

**Same methodology as A-D.** Key difference: Pack D uses CC-before-QID object layout — the DL-029 vulnerability is most acute here.

### Agents I–L — Certified Pool Exposure Audit

**Scope:** All 2,298 Certified items, cross-referencing against:
- The S821 claim list (37 items)
- Any DL-026 that may exist outside the S821 list
- Verify: `question_state === "Certified"` on each claimed item

**Methodology:** Direct grep for Certified + boundary-aware CC extraction per item. This establishes whether any DL-026 items are in the active learner delivery pool and whether they match the S821 list.

### Agents M–P — Root Cause Classification

For each confirmed finding, classify:

| Classification | Criteria |
|----------------|----------|
| GENUINE DL-026 | Non-CC EW slot === "" |
| DL-029 ARTIFACT | S821 claimed DL-026 but raw-line shows non-empty |
| DL-021 COMPONENT | Non-CC EW slot absent (undefined) |
| DL-016 CONFUSION | Metadata-block vs content-block mismatch caused misclassification |
| ROTATION ARTIFACT | Empty secondary slot from 5-item rotation template |

### Approval Board Q–Z

**Outputs:**
- `reports/session369/SESSION369_DL026_GROUND_TRUTH.json` — Per-item evidence table with raw-line data
- `reports/session369/SESSION369_AUTHORITATIVE_DL026_COUNT.md` — Single verified DL-026 inventory

**Success Criteria:**
- Every S821-claimed item independently verified via raw-file line inspection
- Every Certified item in the 2,298 pool checked for DL-026
- Root cause classification for all findings
- Count stable across two independent verification agents
- No forward-scan regex used
- No manifest consumption

---

## Session 370 — Queue Reconciliation

**Type:** READ-ONLY — Queue rebuilding from verified data. No content writes.

### Agents A–D — Rebuild Remediation Queue

Consume S369 output. Produce a verified remediation queue:
- Only genuinely confirmed DL-026 items (raw-line verified)
- Include: QID, pack, section, CC, empty slot positions, and the EW text in non-empty companion slots (for authoring context)
- Each empty slot mapped to its Choice text for authoring reference

### Agents E–H — S821 vs. Verified Queue Comparison

Side-by-side comparison:
- Items claimed by S821 but disproved → classify as DL-029 false positives
- Items discovered by S369 but NOT in S821 → classify as S821 undercount
- Items present in both → confirm with raw evidence

### Agents I–P — Queue Certification

- Remove all DL-029 false positives from the remediation queue
- Certify each entry with: verification method, verifying agent, raw-line evidence
- If verified DL-026 count is 0, certify DL-026 as RESOLVED (all S821 claims were DL-029 artifacts)

### Approval Board Q–Z

**Outputs:**
- `reports/session370/SESSION370_REMEDIATION_QUEUE_REBUILD.json` — Authoritative queue
- `reports/session370/SESSION370_QUEUE_CERTIFICATION.md` — Certification evidence

**Stop Condition (GATE):** If verified queue is empty → skip S371, proceed directly to S372 governance re-certification.

---

## Session 371 — DL-026 Remediation Execution *(conditional on S370 > 0 items)*

**Type:** WRITE — Content authoring for verified DL-026 items only.

### Governance Gates (pre-execution)

- S370 authoritative queue consumed
- Governance guard 32/32 PASS
- Rule 5 enforced: ≤28 items per batch
- Rule 6 bypass verification: all target items confirmed DL-026 (empty non-CC EW) before write
- Backup-before-write per BACKUP_PROTOCOL.md for every pack file edit
- Pack hashes captured at T0 for post-remediation comparison

### Agents A–F — Batch Planning

- Divide verified queue into ≤28-item batches
- Identify topic/domain for each empty slot to inform authoring
- Extract Choice text for each empty slot position
- Generate BLOCK-AUTHORIZED marker per batch per governance-guard Rule 5

### Agents G–L — Content Remediation

For each empty non-CC ExplanationWrong slot:
1. Read the Choice text for that position
2. Read ExplanationCorrect for correct reasoning context
3. Author a choice-specific distractor explanation:
   - Identifies the specific error in that choice
   - Explains the misconception a candidate likely held
   - Contrasts with the correct approach
   - Minimum 50 characters
   - Domain-appropriate content (Technology & Analytics for Domain F)
4. Old value: `""` → New value: authored text
5. **Do NOT modify:** CorrectChoice, ExplanationCorrect, question_state, or any other field

### Agents M–R — Verification

Per batch verification:
- Verify all target slots now non-empty (DL-026 resolved)
- Verify 0 new DL-008 introduced (all CC-slot EW fields still empty)
- Verify CorrectChoice unchanged
- Verify question_state unchanged
- Verify no regression on governance guard

### Approval Board S–Z

**Outputs:**
- `reports/session371/SESSION371_DL026_REMEDIATION_RESULTS.json`
- `reports/session371/SESSION371_REMEDIATION_CERTIFICATION.md`

---

## Session 372 — Governance & Baseline Re-Certification

**Type:** READ-ONLY + WRITE (baseline update only)

### Agents A–D — Governance Guard Verification

- Run full test suite: `node scripts/test_governance_guard.js` → 32/32 PASS required
- Verify Rule 2 (DL-008): 0 Certified items with non-empty EW[CC]
- Verify Rule 6 (DL-026): 0 items with empty non-CC EW slots
- Verify Rule 3 (registry): MASTER_QUESTION_REGISTRY.md not hand-edited
- Verify Rule 5 (batch cap): no batch exceeded 28 items

### Agents E–H — Baseline Recalculation

- Recapture SHA-256 for all 15 runtime-critical files via `Get-FileHash -Algorithm SHA256`
- Compare against S811 baselines — document all authorized drift
- Update `CURRENT_BASELINES.md`:
  - §1 hash table (all 15 files)
  - §2 Certified Pool (verify 2,298 stable)
  - §3 Defect status: DL-008 = 0, DL-026 = verified count, DL-029 = documented
- Verify certified count via `Select-String -Path pack_*_corrected.js -Pattern '"question_state": "Certified"'`

### Agents I–L — Certified Pool Verification

- Direct grep for Certified count (must match 2,298 or confirmed delta)
- Pre-delivery safety check: 0 DL-008 in certified pool, 0 DL-026 in certified pool
- Identity validator: 2,539/2,540 PASS (99.96%)
- Cross-reference known-defective QID list against delivery pool

### Agents M–P — Artifact Integrity

- Verify all backup files from S371 exist and are non-zero
- Verify REVISION_HISTORY.md entries are contemporaneous
- Verify DEFECT_LIBRARY.md DL-026 entry reflects current state
- Cross-check all self-reported claims against raw file/line evidence (AGENTS.md §5)

### Approval Board Q–Z

**Outputs:**
- `reports/session372/SESSION372_GOVERNANCE_RECERTIFICATION.json`
- `reports/session372/SESSION372_BASELINE_REFRESH.json`
- Updated `knowledge/CURRENT_BASELINES.md`

---

## Session 373 — Adoption Restoration Board

**Type:** READ-ONLY — Executive decision. No content writes.

### Board A–E — Evidence Consumption

Review all artifacts from S369–S372:
- S369: DL-026 ground truth inventory
- S370: Verified remediation queue
- S371: Remediation results (or skip if queue was empty)
- S372: Governance re-certification and baselines

### Board F–J — Governance Review

| Check | Source | Required |
|-------|--------|----------|
| Governance Guard PASS | S372 | 32/32 |
| Rule 2 active (DL-008) | governance-guard.js | BLOCK |
| Rule 6 active (DL-026) | governance-guard.js | BLOCK |
| Identity >= 99% | S372 | 99.96% |
| Certification drift = 0 | S372 | Authorized only |

### Board K–O — Content & Readiness Review

| Check | Source | Required |
|-------|--------|----------|
| Certified DL-008 | S372 | 0 |
| Verified DL-026 (Certified) | S372 | 0 |
| Learner pool exposure | S372 | Clean |
| Content quality | S371 | No regression |
| Rule 6 compliance | S371 | 0 violations |

### Executive Board P–Z — Decision

**If ALL stop conditions PASS:**
→ **FULLY ADOPTED (Restored)** — DL-026 truth verified, all genuine items remediated, governance re-certified.

**If DL-026 verified 0 (all S821 claims were DL-029 artifacts):**
→ **FULLY ADOPTED (Restored)** — No remediation needed. DL-026 was never a blocker; DL-029 created a phantom blocker.

**If genuine DL-026 remains (not yet remediated):**
→ **CONDITIONALLY ADOPTED** — Remaining items enumerated. Blocked on: specific QID list + estimated effort.

### Automatic Stop Conditions

| # | Condition | Verdict if FAIL |
|---|-----------|-----------------|
| 1 | Governance Guard ≠ PASS | **HALT** — cannot certify adoption |
| 2 | Certified DL-008 exists | **HALT** — learner safety risk |
| 3 | Verified DL-026 remains unresolved (Certified) | **CONDITIONAL** — enumerate remaining items |
| 4 | Identity < 99% | **HALT** — identity integrity compromised |
| 5 | Certification Drift > 0 (unauthorized) | **HALT** — file tampering detected |
| 6 | Baseline inconsistency detected | **HALT** — integrity failure |

**Outputs:**
- `reports/session373/SESSION373_ADOPTION_RESTORATION_DECISION.json`
- `reports/session373/SESSION373_EXECUTIVE_DECISION.md`

---

## IS / IS NOT

**IS:**
- A read-only verification chain that establishes DL-026 ground truth before any remediation begins
- A direct line-level inspection methodology immune to DL-029
- An authoritative inventory that resolves competing S821/S822/S368 claims
- A gated remediation pipeline that only executes on verified defects
- A governance re-certification that updates baselines to post-remediation state
- An adoption restoration decision based on verified evidence

**IS NOT:**
- A blind execution of the S821 remediation queue (that queue is DL-029 contaminated)
- A re-run of prior agent-based scan methodologies (those produced false positives)
- A content-authoring sprint that begins before ground truth is established
- A "trust the manifest" operation (DL-029 proved manifests are untrustworthy)
- A repeat of S361-S368's approach where scope was assumed from prior reports

---

## SUCCESS CRITERIA

- [ ] S369: Single verified DL-026 inventory established via raw-line inspection
- [ ] S369: Every S821-claimed item independently verified (not via scan — via direct file read)
- [ ] S369: Root cause classified for each finding (GENUINE / DL-029 FP / DL-021 / DL-016)
- [ ] S370: Authoritative remediation queue built from verified data only
- [ ] S370: S821 comparison complete — all false positives identified and removed
- [ ] S371: (if needed) All genuine DL-026 items remediated with choice-specific content
- [ ] S371: 0 new DL-008 introduced, 0 CorrectChoice changes, 0 question_state changes
- [ ] S372: All 15 runtime hashes recaptured and baselines updated
- [ ] S372: Governance guard 32/32 PASS; 0 Certified DL-008; 0 Certified DL-026
- [ ] S373: Adoption decision issued with full evidence chain
- [ ] S373: All 6 automatic stop conditions evaluated with verified evidence
