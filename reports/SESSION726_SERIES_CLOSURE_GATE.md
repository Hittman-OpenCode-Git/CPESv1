# Session 726 — Series Closure Gate v1.0

**Date:** 2026-07-26
**Author:** Agent H (S726 — Closure Gate Design)
**Status:** ACTIVE
**Authority:** PROJECT_CONSTITUTION.md, S725 Agent E Post-700 Governance Model, S725 CFO Advisory (S5), S725 Portfolio Stewardship Framework
**Type:** Governance Enforcement Specification — Read-Only specification, Write authorized for creation
**Supersedes:** Implicit closure-by-declaration pattern (S723)
**Dependencies:**
- `reports/SESSION725_POST700_GOVERNANCE_MODEL.md` (Agent E — acceptance protocol, transition governance, retroactive gap analysis)
- `reports/SESSION725_PORTFOLIO_STEWARDSHIP_FRAMEWORK.md` (Agent O — Ownership Matrix, stewardship principles, gap resolution)
- `reports/SESSION725_OWNERSHIP_MATRIX.json` (Agent D — transition steps, verification criteria)
- `reports/SESSION724_SESSION_SUMMARY.md` (6 ownership gap enumeration)
- `reports/SESSION724_OPERATING_MODEL.json` (portfolio track definitions)
- `.opencode/plugins/governance-guard.js` (5-rule enforcement plugin, extension target)
- `knowledge/AGENTS.md` (session startup and runtime governance)

---

## Executive Summary

This specification defines the **Series Closure Gate** — a binding governance enforcement mechanism that prevents any agent from declaring a portfolio series "closed" unless all four steps of the ownership transition chain (TRANSFER → ACCEPTANCE → APPROVAL → CLOSE) are independently verified with documented evidence. The gate was designed in response to the S723→S724 ownership gap: S723 declared the 700-series closed without verifying that receiving owners had accepted their transferred responsibilities, resulting in 6 documented ownership gaps that required a separate discovery session (S724) and a dedicated governance hardening session (S725) to resolve.

The gate operates at three enforcement tiers:

| Tier | Mechanism | Trigger | Effect |
|------|-----------|---------|--------|
| **Procedural** | Pre-Closure Checklist + Closure Attestation | Any "CLOSE" declaration in a session report or closure artifact | Attestation must be complete and signed before closure is valid |
| **Plugin** | governance-guard.js extension (session.idle hook) | Attempt to close a series in a session where ACCEPTANCE is incomplete | Warning emitted; closure is flagged as provisional |
| **Governance Board** | Escalation review | Closure attempted without acceptance; disputed closure | Board review required; closure may be rejected |

A closure declaration that fails any tier is **rejected** — the series remains ACTIVE (or in its prior state) and the failed closure is logged as a **Governance Debt Item** requiring explicit remediation.

---

## 1. Root Cause: The S723→S724 Ownership Gap

### 1.1 What Happened

On 2026-07-24, Session 723 declared the 700-series Governance & Calibration Maturity Program formally closed. The S723 program closure report documented:

- 26-agent (A-Z) audit of the certified pool (2,182 items)
- Governance guard 20/20 PASS
- DL-008 confirmed at 0 (Function constructor parse)
- All answer-key integrity checks passed
- Maintenance Mode Framework v1.0 activated

**What S723 did NOT do:** verify that every responsibility owned by the 700-series had a receiving owner who had explicitly accepted the transfer.

### 1.2 The Result

Session 724, executing a 26-agent (A-Z) governance maintenance activation, discovered **6 post-700 ownership gaps:**

| # | Gap | Severity | Root Cause |
|---|-----|----------|------------|
| GAP-1 | May coaching layer ownership unassigned | HIGH | No receiving owner designated before close |
| GAP-2 | 300-series S310 closeout trigger missing | HIGH | No mechanism to enforce the recommended closeout session |
| GAP-3 | 600-series deferral not owned | MEDIUM | Deferred decision had no re-evaluation owner or trigger |
| GAP-4 | G-NEW-1 through G-NEW-5 enforcement not in certification pipeline | CRITICAL | Certification-blocking rules existed but no owner enforced them |
| GAP-5 | Governance guard DL-008 detection uses DL-029-vulnerable window scan | CRITICAL | Known methodology defect not transferred to a maintenance owner |
| GAP-6 | CURRENT_BASELINES.md §3 stale (67 phantom DL-008 items) | HIGH | Baseline maintenance not transferred to a named maintainer |

### 1.3 The Skipped Step

Agent E's S725 analysis (SESSION725_POST700_GOVERNANCE_MODEL.md §5.2) mapped every gap to the governance step that was skipped:

| Gap | TRANSFER | ACCEPTANCE | APPROVAL | CLOSE |
|-----|----------|------------|----------|-------|
| GAP-1 | Partial | **SKIPPED** | **SKIPPED** | Declared |
| GAP-2 | Partial | **SKIPPED** | **SKIPPED** | Declared |
| GAP-3 | Partial | **SKIPPED** | **SKIPPED** | Declared |
| GAP-4 | Partial | **SKIPPED** | **SKIPPED** | Declared |
| GAP-5 | **SKIPPED** | **SKIPPED** | **SKIPPED** | Declared |
| GAP-6 | **SKIPPED** | **SKIPPED** | N/A | Declared |

**Conclusion:** All 6 gaps share the same cause — S723 advanced TRANSFER to completion (responsibilities were catalogued) and declared CLOSE, but skipped ACCEPTANCE and APPROVAL for all 26 transferred responsibilities. ACCEPTANCE is not a formality — it is the gate that ensures no responsibility is orphaned.

### 1.4 Cost of Skipped Acceptance

- **1 discovery session** (S724, 26 agents) to surface the gaps
- **1 governance hardening session** (S725, 5+ agents) to design the acceptance protocol
- **12 acceptance confirmations pending** as of S725 Agent D's Ownership Matrix v2.0
- **Deadline pressure:** all 6 gaps must be accepted before S726 T0
- **Governance trust erosion:** future series closures would carry the implicit assumption that "CLOSE" does not mean "complete"

---

## 2. The 4-Step Closure Chain

Every portfolio series that transitions to CLOSED or MAINTENANCE MODE must complete four sequential steps. Each step produces documented evidence before the next step can begin.

```
TRANSFER → ACCEPTANCE → APPROVAL → CLOSE
```

### 2.1 Step 1 — TRANSFER

**Definition:** The closing series catalogues every active responsibility, open item, and maintenance obligation that it currently owns. For each, it identifies a proposed receiving owner. No responsibility may be left without a proposed disposition.

**Required Outputs:**

| Output | Description | Evidence Standard |
|--------|-------------|-------------------|
| **Ownership Matrix** | Complete mapping of every series responsibility with current owner, proposed receiving owner, and transfer status (PENDING / ACCEPTED / NOT TRANSFERRED) | Must be a structured artifact (JSON table or equivalent) with at minimum: responsibility description, current owner, proposed receiving owner, transfer status. Per Agent O Stewardship Framework §2. |
| **Open Responsibilities Register** | Every open defect, debt, or incomplete workstream with explicit disposition: TRANSFER (to named owner), CLOSE (with resolution evidence), or ACCEPT AS DEBT (with rationale, risk assessment, and review trigger) | Must include: item description, disposition, rationale, risk severity. Per Agent E §2.4.2. |
| **Proposed Receiving Owner Designation** | For each transferred responsibility: explicit named owner (role, not generic series label), handoff date, acceptance expectation | Must use specific role designation (e.g., "Baseline Maintainer (700-series)" not "700-series"). Per Agent E §2.4.3. |

**Verification Method:** Governance Auditor reviews the TRANSFER outputs against the closing series' known responsibilities (from prior Ownership Matrix and session reports). Any responsibility present in the series' scope but absent from the TRANSFER outputs blocks the step.

**Completion Criterion:** Every responsibility that the closing series owned has one of three dispositions recorded: TRANSFER (proposed owner named), CLOSE (resolved with evidence), or ACCEPT AS DEBT (rationale documented).

---

### 2.2 Step 2 — ACCEPTANCE

**Definition:** Each proposed receiving owner explicitly accepts the transferred responsibility. ACCEPTANCE is the binding gate — without it, no responsibility has a confirmed owner and the series cannot close.

This is the step that S723 skipped entirely.

**Acceptance Evidence Standards:**

#### Qualifies as Valid Acceptance

| Evidence Type | Description | Required Elements |
|---------------|-------------|-------------------|
| **Agent Acceptance Statement** | An agent in the receiving series explicitly states "I accept responsibility for [X]" in a session report, REVISION_HISTORY.md entry, or dedicated acceptance record | (1) Named responsibility, (2) Explicit "I accept" or equivalent language, (3) Date of acceptance, (4) Agent/role designation |
| **Board Resolution** | A Governance Board or Executive Board session formally votes to accept a transferred responsibility on behalf of a lane or series | (1) Named responsibility, (2) Vote result (e.g., "UNANIMOUS — ACCEPTED"), (3) Session number, (4) Board composition |
| **Governance Record Entry** | A signed entry in REVISION_HISTORY.md or a dedicated Acceptance Register documenting the acceptance | (1) Named responsibility, (2) Accepting entity, (3) Date, (4) Reference to the transfer session |
| **Dedicated Handoff Session** | A session where the closing series and receiving series jointly document the transfer and acceptance | (1) Joint session report, (2) Both parties' signatures (explicit acceptance by receiver, acknowledgment by transferor), (3) Onboarding checklist completed per Agent O §1 Lane Succession Plans |

#### Does NOT Qualify as Valid Acceptance

| Non-Qualifying Action | Why It Fails |
|-----------------------|--------------|
| **Assignment without acknowledgment** | A document names a receiving owner but the named party has not confirmed awareness or consent. "Recommended assignment" language is a proposal, not acceptance. |
| **Silence after transfer documentation** | The transfer is documented but the receiving owner never responds. Silence is not consent. |
| **"TBD" or "pending" in Ownership Matrix** | Placeholder text means acceptance has not occurred. |
| **Generic lane-level assignment** | "Assigned to 100-series" without specifying which role/agent within that series. Acceptance requires a named role. |
| **Implied acceptance by proximity** | The receiving series operates in the same domain as the transferred responsibility but never explicitly accepts it. Awareness ≠ acceptance. |
| **"Recommended" or "proposed" language** | Language of suggestion, not commitment. Per Agent E §4.3: "Recommended assignment language is not accepted." |

**Verification Method:** Governance Auditor cross-references each proposed receiving owner in the TRANSFER Ownership Matrix against documented acceptance evidence. Every proposed receiving owner must have exactly one corresponding acceptance record. If a proposed receiving owner declines or is unavailable, the closing series must propose a new receiving owner and restart Step 2 for that responsibility.

**Completion Criterion:** Every responsibility in the TRANSFER Ownership Matrix with disposition TRANSFER has a matching acceptance record from its proposed receiving owner. Every responsibility with disposition ACCEPT AS DEBT has a documented rationale and review trigger. Every responsibility with disposition CLOSE has resolution evidence.

---

### 2.3 Step 3 — APPROVAL

**Definition:** The Governance Board (or designated governance authority) reviews the TRANSFER outputs and ACCEPTANCE records and formally approves the series transition.

**Required Outputs:**

| Output | Description |
|--------|-------------|
| **Transfer Approval Certificate** | A formal certificate documenting that all TRANSFER outputs are complete, all ACCEPTANCE records are verified, and the series is approved for closure. Per Agent E §2.2. |
| **Escalation Path Confirmation** | For each transferred responsibility, the escalation path (primary → secondary → escalation owner) is confirmed to be intact. Per Agent E §2.4.4. |
| **Maintenance Cadence Confirmation** | For responsibilities requiring ongoing maintenance, the cadence, scope, and owner are confirmed. Per Agent O Stewardship Framework §1 (each lane's succession plan). |

**Approval Authority by Series Scope:**

| Series Scope | Approval Authority |
|--------------|-------------------|
| Single-series closure (e.g., 300-series S310) | Governance Auditor (700-series) after TRANSFER + ACCEPTANCE verified |
| Multi-series transition (e.g., 700→100/300/800) | Governance Board (all active lane owners) |
| Portfolio-wide restructuring | Executive Board (unanimous or majority with documented rationale) |

**Verification Method:** Governance Auditor (or designated approval authority) executes the Pre-Closure Checklist (§3) and confirms all items PASS. If any item fails, APPROVAL is withheld.

**Completion Criterion:** Pre-Closure Checklist returns PASS on all items. Approval Certificate is signed and committed to the repository.

---

### 2.4 Step 4 — CLOSE

**Definition:** With TRANSFER complete, ACCEPTANCE confirmed, and APPROVAL granted, the series closure declaration is issued. The series status transitions to CLOSED (or MAINTENANCE MODE, as applicable).

**Required Outputs:**

| Output | Description |
|--------|-------------|
| **Program Closure Report** | Formal report documenting: series achieved objectives, TRANSFER outputs summary, ACCEPTANCE record references, APPROVAL certificate reference, transition ownership assignments, escalation contacts, maintenance cadence |
| **Portfolio Lane Map Update** | The Portfolio Lane Map (Agent O Stewardship Framework §1) is updated: series status → CLOSED or MAINTENANCE |
| **CURRENT_BASELINES.md Refresh** | If the closing series owned any baseline-tracked files, CURRENT_BASELINES.md is updated to reflect new ownership |
| **REVISION_HISTORY.md Entry** | Closure entry appended with cross-references to TRANSFER, ACCEPTANCE, and APPROVAL artifacts |

**Closure Declaration Format:**

All closure declarations must include the **Closure Attestation** (see §4). A closure declaration without a completed attestation is provisionally rejected. A closure declaration with an attestation that fails any checklist item is definitively rejected.

**Completion Criterion:** Closure Attestation is complete and signed. Closure Report references all prior-step artifacts. Portfolio Lane Map and CURRENT_BASELINES.md are updated.

---

## 3. Pre-Closure Checklist

This checklist must be executed and must return **PASS on all items** before any CLOSE declaration can be made. The checklist is executed by the Governance Auditor (or designated governance authority) as part of Step 3 (APPROVAL).

### 3.1 Checklist Items

| # | Check | Evidence Required | Pass Condition |
|---|-------|-------------------|----------------|
| **T-1** | All active responsibilities documented in Ownership Matrix | TRANSFER Ownership Matrix artifact | Every responsibility the closing series owned has a row with: responsibility description, proposed receiving owner, transfer status |
| **T-2** | Open items have documented disposition | Open Responsibilities Register | Every open defect, debt, or incomplete workstream has one disposition: TRANSFER (with named owner), CLOSE (with resolution evidence), or ACCEPT AS DEBT (with rationale and risk) |
| **T-3** | Proposed receiving owners are named roles, not generic series labels | Ownership Matrix receiving owner column | Every proposed receiving owner is a specific role designation (e.g., "Baseline Maintainer (700-series)") |
| **A-1** | Every proposed receiving owner has an explicit acceptance record | Acceptance evidence per §2.2 | Every TRANSFER disposition in the Ownership Matrix has a matching ACCEPTANCE record with: (1) explicit acceptance language, (2) date, (3) accepting entity |
| **A-2** | No acceptance record uses non-qualifying language | Acceptance records reviewed against §2.2 non-qualifying list | Zero acceptance records contain "recommended," "proposed," "TBD," "pending," or assignment-without-acknowledgment |
| **A-3** | Every responsibility with disposition ACCEPT AS DEBT has a review trigger | Open Responsibilities Register | Every ACCEPT AS DEBT item specifies: (1) what triggers re-evaluation, (2) when, (3) who decides |
| **A-4** | Every responsibility with disposition CLOSE has resolution evidence | Open Responsibilities Register | Every CLOSE item has a reference to the session or artifact that resolved it |
| **P-1** | Escalation path confirmed intact for every transferred responsibility | Escalation path per Ownership Matrix row (primary → secondary → escalation owner) | Every transferred responsibility has: primary owner, secondary owner, escalation owner — all confirmed available or with succession plan activated |
| **P-2** | Maintenance cadence confirmed for ongoing responsibilities | Maintenance cadence per Ownership Matrix row | Every responsibility requiring ongoing maintenance has: cadence (frequency), scope (what checks/actions), owner |
| **P-3** | Transition period defined | Transition period specification | Duration specified (N sessions or calendar date). Escalation owner designated for the transition period. Per Agent E §2.4.4. |
| **P-4** | All affected governance documents updated | Cross-reference check against §3.2 document list | AGENTS.md, CURRENT_BASELINES.md, SESSION_STATUS, REVISION_HISTORY.md updated with new ownership assignments |
| **P-5** | Closure Attestation completed and signed | Closure Attestation per §4 | All fields populated, signatures present, checklist items all PASS |

### 3.2 Documents Requiring Update on Closure

Every series closure must update the following documents if the closing series owned, maintained, or referenced them:

| Document | Update Required | Responsibility |
|----------|----------------|----------------|
| `knowledge/CURRENT_BASELINES.md` | Refresh §1–§3: hash recapture, defect status update, governance guard status, ownership references | Baseline Maintainer |
| `AGENTS.md` | Update session startup protocol (§9) if the closed series was referenced; update key file locations (§8) | Governance Auditor |
| `reports/session_status/SESSION_STATUS_*.md` | New status file generation or update of current status reflecting series closure | Governance Auditor |
| `knowledge/REVISION_HISTORY.md` | Closure entry with cross-references to TRANSFER, ACCEPTANCE, APPROVAL artifacts | Closing series lead or Governance Auditor |
| Portfolio Lane Map | Update series status to CLOSED or MAINTENANCE in Stewardship Framework §1 | Governance Auditor |
| Ownership Matrix | Update ownership rows for transferred responsibilities; remove rows for CLOSE-dispositioned items | Governance Auditor |

### 3.3 Checklist Execution Protocol

1. Governance Auditor (or designated approval authority) reviews the TRANSFER outputs.
2. Governance Auditor verifies each ACCEPTANCE record against the evidence standards (§2.2).
3. Governance Auditor executes each checklist item sequentially.
4. Any item that fails blocks the checklist — remaining items are not evaluated until the failed item is remediated.
5. Upon all items PASS, the Governance Auditor signs the checklist and proceeds to Step 4 (CLOSE).

---

## 4. Closure Attestation Format

Every series closure declaration MUST be accompanied by a completed Closure Attestation. The attestation is the formal governance record that the closure was executed according to this specification.

### 4.1 Attestation Template

```
================================================================================
SERIES CLOSURE ATTESTATION
================================================================================

Series:          [Series Number] — [Series Name]
Date of Closure: [YYYY-MM-DD]
Closing Session: [Session Number]
Closing Agent:   [Agent Letter + Role]

── TRANSFER (Step 1) ─────────────────────────────────────────────────────────
Ownership Matrix Generated:     [YES/NO]  Reference: [artifact path or session]
Open Responsibilities Register: [YES/NO]  Reference: [artifact path]
Total Responsibilities:         [N]
  ── TRANSFER:    [N]  Proposed owners: [list]
  ── CLOSE:       [N]  Evidence: [references]
  ── ACCEPT AS DEBT: [N]  Review triggers: [list]

── ACCEPTANCE (Step 2) ────────────────────────────────────────────────────────
Acceptance Records Verified:    [YES/NO]
Total Proposed Receiving Owners: [N]
Total Accepted:                 [N]
Total Pending:                  [N]
Total Declined/Unavailable:     [N]

Acceptance Records:
  1. [Responsibility] → [Receiving Owner] — ACCEPTED on [YYYY-MM-DD]
     Evidence: [session report / board resolution / governance record / handoff session]
     Reference: [artifact path or session number]
  2. ...

Non-Accepted Items (if any):
  [Responsibility] → [Proposed Owner] — [PENDING / DECLINED]
  Resolution: [what happens next — cannot close until resolved]

── APPROVAL (Step 3) ─────────────────────────────────────────────────────────
Pre-Closure Checklist:          [PASS / FAIL]
  T-1  (Ownership Matrix):      [PASS/FAIL]
  T-2  (Open Items Register):   [PASS/FAIL]
  T-3  (Named Roles):           [PASS/FAIL]
  A-1  (Acceptance Records):    [PASS/FAIL]
  A-2  (No Non-Qualifying):     [PASS/FAIL]
  A-3  (ACCEPT AS DEBT Triggers): [PASS/FAIL]
  A-4  (CLOSE Resolution):      [PASS/FAIL]
  P-1  (Escalation Path):       [PASS/FAIL]
  P-2  (Maintenance Cadence):   [PASS/FAIL]
  P-3  (Transition Period):     [PASS/FAIL]
  P-4  (Documents Updated):     [PASS/FAIL]
  P-5  (Attestation Signed):    [PASS/FAIL]

Governance Documents Updated:
  [ ] CURRENT_BASELINES.md
  [ ] AGENTS.md
  [ ] SESSION_STATUS
  [ ] REVISION_HISTORY.md
  [ ] Portfolio Lane Map (Stewardship Framework §1)
  [ ] Ownership Matrix (Stewardship Framework §2)

── CLOSE (Step 4) ─────────────────────────────────────────────────────────────
Transition Period:    [N sessions or YYYY-MM-DD]
Escalation Owner:     [Name/Role]
Maintenance Owner:    [Name/Role]
Post-Closure Cadence: [T0 every session / Rapid Pulse every 5 / Deep Audit every 20 / etc.]

Closure Declaration:
  "The [Series Number] series ([Series Name]) is declared CLOSED effective [YYYY-MM-DD].
   All TRANSFER outputs are complete. All ACCEPTANCE records are verified.
   APPROVAL has been granted by [Approval Authority].
   This closure is executed in accordance with SESSION726_SERIES_CLOSURE_GATE.md §2."

── SIGNATURES ─────────────────────────────────────────────────────────────────
Governance Auditor (Approval Authority):
  Name/Role: ________________________________________  Date: ______________

Closing Series Lead:
  Name/Role: ________________________________________  Date: ______________

Witness (Receiving Owner Representative or Governance Board Member):
  Name/Role: ________________________________________  Date: ______________

================================================================================
END OF ATTESTATION
================================================================================
```

### 4.2 Attestation Validity Rules

1. **All fields must be populated.** An attestation with blank or "TBD" fields is invalid.
2. **The Pre-Closure Checklist must return PASS on all items.** A single FAIL invalidates the attestation.
3. **All three signatures must be present.** Governance Auditor, Closing Series Lead, and Witness.
4. **"Total Accepted" must equal the number of items requiring ACCEPTANCE.** Any gap between proposed and accepted blocks closure.
5. **The attestation must be committed to the repository** alongside the Closure Report before the series status is changed.

### 4.3 What Happens If Attestation Fails

If the attestation is submitted with any FAIL:

1. **CLOSE is rejected.** The series remains in its current state (ACTIVE, PENDING CLOSE, etc.).
2. **The failed attestation is logged** in REVISION_HISTORY.md as a Governance Debt Item.
3. **A remediation requirement is recorded:** which checklist items failed, what evidence is missing, what sessions or actions are required to resolve.
4. **The closure is re-attempted** only after all failed items are remediated and a new attestation is produced.

---

## 5. Enforcement Mechanism

The Series Closure Gate is enforced through three complementary tiers:

### 5.1 Tier 1 — Procedural Enforcement (Primary)

**Mechanism:** The Pre-Closure Checklist (§3) and Closure Attestation (§4) are procedural gates. Any agent that declares a series "closed" without a completed attestation has not executed a valid closure.

**Enforcement:** The Governance Auditor (or designated approval authority) is responsible for:
- Refusing to approve any closure without a completed attestation
- Flagging any "closed" declaration that lacks attestation as a Governance Debt Item
- Requiring retroactive attestation before recognizing the closure as valid

**Historical application to S723:** S723's closure declaration would have been rejected at the procedural tier. The S723 Closure Report documented TRANSFER (responsibilities catalogued in the S723 Maintenance Framework) but lacked ACCEPTANCE records and an APPROVAL certificate. Under this gate, S723 would have been required to produce a Closure Attestation with all 11 checklist items PASS before CLOSE could be declared. The attestation would have failed at items A-1 through A-4 — exposing all 6 gaps before closure, not after.

### 5.2 Tier 2 — Plugin Enforcement (Advisory)

**Mechanism:** An extension to the governance-guard.js plugin (`session.idle` hook) detects when a session has:
- Declared a series "closed" or "closure" in its outputs
- Written a Closure Report or closure certificate
- Changed a series status to CLOSED

If these actions are detected and the session has NOT also produced a completed Closure Attestation, the plugin emits a **WARNING** at session idle.

**Proposed extension (governance-guard.js — new RULE 6):**

```
RULE 6 (WARN) — Series closure must be accompanied by a completed
Closure Attestation per SESSION726_SERIES_CLOSURE_GATE.md §4.
Detection: scan new/replaced content in .md and .json files
for "CLOSE" declarations (series status changes, closure reports).
If found without a matching "SERIES CLOSURE ATTESTATION" block
(or with an attestation that has FAIL items), emit WARNING.
```

**Implementation Note:** Rule 6 is a WARN-level rule, not a BLOCK. The primary enforcement is procedural (§5.1). The plugin serves as a safety net — catching closure declarations that bypass the procedural gate. This preserves flexibility while ensuring any un-attested closure is flagged for governance review.

**Placeholder for integration:** The governance-guard.js `session.idle` hook (lines 165–211) is the integration point. A new detection function `findUnattestedClosureDeclarations(text)` would scan session outputs for closure language and verify attestation presence. The function would be added after the existing RULE 1 and RULE 4 warning logic.

### 5.3 Tier 3 — Governance Board Review (Escalation)

**Mechanism:** Any closure that is:
- Declared without attestation after a plugin WARNING was emitted
- Disputed by a receiving owner who claims they did not accept
- Challenged by a Governance Board member

is escalated to the Governance Board for review.

**Board Review Process:**
1. The challenging party files a Dispute Record: which series closure, which gap, what evidence is contested.
2. The Governance Board reviews the closure artifacts (TRANSFER outputs, ACCEPTANCE records, APPROVAL certificate, Closure Attestation) against this specification.
3. The Board votes: SUSTAIN (closure valid), REJECT (closure invalid, gap must be remediated), or CONDITIONAL (closure valid only after specific remediation).
4. The Board's decision is documented in REVISION_HISTORY.md and is final.

**Board Composition for Closure Disputes:** All active lane owners plus the Executive Board. Minimum quorum: 3 voting members including at least one lane owner from a series not involved in the dispute.

---

## 6. Historical Compliance Check: S723 Under This Gate

To validate the gate's design, we retrospectively apply it to S723's closure of the 700-series.

### 6.1 What S723 Produced

- **Program Closure Report** (SESSION723_PROGRAM_CLOSURE_REPORT.md): Documented 26-agent audit, certified pool verification, maintenance mode activation
- **Maintenance Framework v1.0** (SESSION723_MAINTENANCE_FRAMEWORK.json): Catalogued 5 maintenance cadences, agent types, trigger thresholds
- **Portfolio Handoff** (SESSION723_PORTFOLIO_HANDOFF.json): Listed 6 "open items" transferred to post-700 lanes

### 6.2 What S723 Did NOT Produce

- **Ownership Matrix:** No structured mapping of 700-series responsibilities to receiving owners
- **Acceptance Records:** Zero receiving owners explicitly accepted any transferred responsibility
- **Approval Certificate:** No formal approval of the transition
- **Closure Attestation:** Did not exist

### 6.3 Gate Application

| Step | S723 Status | Gate Requirement | Would Pass? |
|------|-------------|------------------|-------------|
| **T-1** — Ownership Matrix | Not produced | Complete matrix with all responsibilities and proposed receiving owners | **FAIL** |
| **T-2** — Open Items Register | Partially (handoff listed 6 items but not as a register) | Every open item with disposition: TRANSFER / CLOSE / ACCEPT AS DEBT | **FAIL** |
| **T-3** — Named Roles | Not produced | Specific role designations for every receiving owner | **FAIL** |
| **A-1** — Acceptance Records | None | Explicit acceptance from every proposed receiving owner | **FAIL** |
| **A-2** — No Non-Qualifying Language | N/A | Zero acceptance records with non-qualifying language | **FAIL** |
| **A-3** — ACCEPT AS DEBT Triggers | None | Review triggers for every accepted debt item | **FAIL** |
| **A-4** — CLOSE Resolution | Partial (audit results) | Resolution evidence for every closed item | **FAIL** |
| **P-1** — Escalation Path | Not confirmed | Confirmed escalation path for every transferred responsibility | **FAIL** |
| **P-2** — Maintenance Cadence | Partial (framework defined cadences but no owner for each) | Maintenance cadence confirmed for each ongoing responsibility | **FAIL** |
| **P-3** — Transition Period | Not defined | Specified transition period with escalation owner | **FAIL** |
| **P-4** — Documents Updated | Partial (CURRENT_BASELINES.md not updated) | All affected governance documents updated | **FAIL** |
| **P-5** — Attestation Signed | Not produced | Completed and signed Closure Attestation | **FAIL** |

**Result:** S723 would have failed **12 of 12** checklist items. The closure would have been **rejected**, and the 700-series would have remained ACTIVE with a governance debt entry requiring retroactive acceptance before re-attempting closure.

This is exactly what should have happened. The ownership gaps that required S724 to discover and S725 to design acceptance protocols for would have been surfaced at the closure gate itself — saving two full governance sessions.

### 6.4 What S723 Got Right

S723's substantive work was sound: the 26-agent audit, certified pool verification, governance guard 20/20, DL-008 = 0 confirmation, and maintenance framework design were all correct. The gate does not challenge the quality of the closing series' work — it challenges the completeness of the transition process. S723 would have needed only ACCEPTANCE records (Step 2) and APPROVAL (Step 3) — not re-audit of the work itself.

---

## 7. Integration with Governance Guard Plugin

The governance-guard.js plugin (`.opencode/plugins/governance-guard.js`, 217 lines) enforces 5 rules. The Series Closure Gate adds a sixth rule as an extension.

### 7.1 Proposed Extension: RULE 6 (WARN)

**Rule definition:**

| Property | Value |
|----------|-------|
| **Rule ID** | RULE 6 |
| **Level** | WARN |
| **Trigger** | `session.idle` hook — scan session output for closure declarations without completed attestation |
| **Behavior** | If a session declares a series closed (detected via regex patterns for "CLOSED," "Series Closure," "Program Closure," closure attestation markers, or series-status changes to CLOSED in JSON/MD) but has NOT produced a completed Closure Attestation (or produced one with FAIL items), emit a WARNING at session idle |
| **Warning Message** | "RULE 6 (closure → attestation): Series closure declared without completed Closure Attestation. Per SESSION726_SERIES_CLOSURE_GATE.md §4, all closures require attested TRANSFER → ACCEPTANCE → APPROVAL evidence." |

**Detection patterns:**

```
Closure declarations (triggers):
  /series\s+(closed|closure)/i
  /(700|800|300|500)\s*-\s*series\s+closure/i
  /program\s+closure\s+report/i
  /"status"\s*:\s*"CLOSED"/i  (in JSON lane/series status fields)
  /CLOSURE CERTIFICATE/i

Attestation verification (clear if present):
  /SERIES CLOSURE ATTESTATION/i
  /TRANSFER \(Step 1\)/i   AND
  /ACCEPTANCE \(Step 2\)/i  AND
  /APPROVAL \(Step 3\)/i    AND
  /CLOSE \(Step 4\)/i

Attestation FAIL detection:
  /FAIL/i within the attestation block (checklist items)
  /PENDING/i in acceptance status fields
```

**Integration point:** The `session.idle` hook at line 165. The Rule 6 check runs after existing Rule 1 and Rule 4 checks. The extension adds approximately 40 lines to the plugin.

**Placeholder code (not executed — specification only):**

```javascript
// ── RULE 6: TRACK closure declarations ──────────────────
// In tool.execute.before hook:
const closureRe = /(?:series|program)\s+closure|CLOSURE CERTIFICATE|"status"\s*:\s*"CLOSED"/i;
if (newContent && closureRe.test(newContent)) {
  state.closureDeclared = true;
}
if (newContent && /SERIES CLOSURE ATTESTATION/i.test(newContent)) {
  state.attestationProduced = true;
  // Check for FAIL in attestation
  if (/FAIL/i.test(newContent)) {
    state.attestationFailed = true;
  }
}

// In session.idle hook (after existing RULE 1/4 checks):
if (state.closureDeclared && !state.attestationProduced) {
  warnings.push(
    `RULE 6 (closure → attestation)\n` +
    `  Series closure declared without completed Closure Attestation.\n` +
    `  Per SESSION726_SERIES_CLOSURE_GATE.md §4:\n` +
    `  all closures require attested TRANSFER → ACCEPTANCE → APPROVAL evidence.`
  );
} else if (state.closureDeclared && state.attestationFailed) {
  warnings.push(
    `RULE 6 (closure → attestation)\n` +
    `  Closure Attestation produced but contains FAIL items.\n` +
    `  Closure is provisionally rejected. Remediate failed checklist items\n` +
    `  and re-submit attestation per SESSION726_SERIES_CLOSURE_GATE.md §4.3.`
  );
}
```

### 7.2 Plugin State Extensions

The per-session state object (`getState`) would be extended with three new flags:

```javascript
closureDeclared: false,    // Any closure declaration detected in session output
attestationProduced: false, // A Closure Attestation was written
attestationFailed: false,   // Attestation produced but has FAIL items
```

### 7.3 Interaction with Existing Rules

| Existing Rule | Interaction with Rule 6 |
|---------------|------------------------|
| RULE 1 (question_state → REVISION_HISTORY.md) | Independent — both WARN at session idle |
| RULE 2 (DL-008 BLOCK) | Higher priority — BLOCK-level enforcement overrides WARN |
| RULE 3 (MASTER_QUESTION_REGISTRY BLOCK) | No interaction |
| RULE 4 (answer-key → recomputed note) | Independent — both WARN at session idle |
| RULE 5 (>30 questions BLOCK) | May interact if closure attestation batch exceeds 30-question limit |

---

## 8. Escalation Path for Disputed Closures

### 8.1 Dispute Filing

Any of the following parties may file a closure dispute:

| Party | Standing | Example |
|-------|----------|---------|
| Receiving Owner (named in TRANSFER) | Claims they did not accept the transferred responsibility | "I was listed as accepting ownership of May coaching layer, but I never acknowledged this." |
| Governance Auditor | Identifies a checklist item that was falsified or misrepresented | "The acceptance record for GAP-3 references a non-existent session report." |
| Governance Board Member | Challenges the completeness or validity of the closure | "The TRANSFER Ownership Matrix omitted 3 responsibilities that the 700-series owned per S723." |
| Closing Series Lead | Disputes a rejection of their closure attestation | "The checklist item A-1 is incorrectly marked FAIL — acceptance records exist at [reference]." |

### 8.2 Dispute Process

```
Dispute Filed
     ↓
Governance Board Review (within 1 session of filing)
     ↓
  ┌──────────────────────────────────┐
  │ SUSTAIN                          │  REJECT                          │  CONDITIONAL
  │ Closure is valid.                │  Closure is invalid.             │  Closure valid after
  │ Dispute dismissed.               │  Gap must be remediated.         │  specific remediation.
  │ Attestation accepted as-is.      │  Series returns to prior state.  │  Remediation deadline set.
  └──────────────────────────────────┘
     ↓                                    ↓                                ↓
REVISION_HISTORY.md entry             Governance Debt Item             Conditional acceptance
+ closure recognized                  + remediation plan               + remediation tracking
```

### 8.3 Dispute Record Format

```
CLOSURE DISPUTE RECORD
Date Filed:       [YYYY-MM-DD]
Filed By:         [Name/Role]
Disputed Closure: [Series Number] — [Series Name]
Closure Date:     [YYYY-MM-DD]
Dispute Grounds:  [Specific checklist item(s) contested, with evidence]
Requested Remedy: [Reject closure / Require additional acceptance / etc.]
```

### 8.4 Precedent: S723 Would Have Generated a Dispute

If S723 had been subjected to this gate and the Governance Auditor had rejected the closure (as the historical compliance check in §6 shows it would have been), S723's closing agent could have filed a dispute on the grounds of:

> "The TRANSFER step was completed — the S723 Maintenance Framework and Portfolio Handoff documented all responsibilities and proposed receiving owners. ACCEPTANCE was implied by the governance continuity assessment."

This dispute would have been **rejected** by the Board under this specification, because:
- §2.2 explicitly defines "implied acceptance" as non-qualifying ("Awareness ≠ acceptance")
- Agent E §4.1: "Closure cannot be declared until Receiving Owner = ACCEPTED is explicitly documented. Assignment alone is insufficient."

The Board's rejection would have pushed S723 to complete ACCEPTANCE — which is exactly the outcome this gate exists to produce.

---

## 9. Governance Debt Items

When a closure is rejected under this gate, the following Governance Debt Item is recorded:

### 9.1 Debt Item Format

```
GOVERNANCE DEBT ITEM — [Series] Closure Rejected
Date:              [YYYY-MM-DD]
Closure Attempt:   [Session Number]
Rejected By:       [Governance Auditor / Governance Board]
Failed Checklist:  [List of failed items with T/A/P codes]
Required Remediation: [What must be done to satisfy the failed items]
Resolution Deadline:  [N sessions or YYYY-MM-DD]
Re-attempt Session:   [TBD — after remediation complete]
```

### 9.2 Debt Item Lifecycle

1. **Created:** When a closure attestation is submitted with FAIL items, or when a closure is declared without attestation.
2. **Tracked:** In REVISION_HISTORY.md under a "Governance Debt" section. Remains open until resolved.
3. **Remediated:** The specific failed checklist items are addressed (acceptance records obtained, documents updated, etc.).
4. **Verified:** Governance Auditor confirms the failed items now pass.
5. **Closed:** A new Closure Attestation is produced and approved. The debt item is marked RESOLVED.

### 9.3 Maximum Debt Age

A closure debt item that remains unresolved for more than **5 sessions** or **1 calendar week** (whichever is shorter) is escalated to the Executive Board. The Board must either:
- Approve a remediation plan with a deadline
- Waive the requirement with documented rationale
- Re-assign the closure responsibility to a different agent

No closure debt item may remain open indefinitely. "Discovered later" is not an acceptable resolution (per Agent E §2.4.2).

---

## 10. Effective Date and Retroactive Application

### 10.1 Effective Date

This specification is effective as of **Session 726** (2026-07-26). All series closures declared on or after this date must comply.

### 10.2 Active Series Under This Gate

| Series | Status as of S725 | Next Closure Event | Gate Application |
|--------|-------------------|-------------------|-----------------|
| 300-series | ACTIVE — S310 pending | S310 closeout | Must complete TRANSFER → ACCEPTANCE → APPROVAL → CLOSE before closure |
| 700-series | MAINTENANCE | Already declared (S723) | Retroactive attestation required (§10.3) |
| 800-series | ACTIVE | Future: after certification waves complete | Must complete all 4 steps before closure |
| 100-series | ACTIVE | Future: after runtime maintenance transitions | Must complete all 4 steps before closure |

### 10.3 Retroactive S723 Attestation

The 700-series was declared CLOSED (transitioned to MAINTENANCE MODE) at S723 before this gate was active. S725 Agent E's Post-700 Governance Model identified 6 ownership gaps from that closure and S725 Agent D's Ownership Matrix v2.0 defined acceptance criteria for all 6.

**Requirement:** Before S726 T0, the 6 gap acceptances must be recorded (per S725 Agent D §5 — "acceptance deadline: before S726 T0"). Once all 6 acceptances are recorded, a retroactive Closure Attestation may be produced for the 700-series closure. This attestation serves as the formal governance record that the S723→S724 gap has been closed.

The retroactive attestation will be marked "RETROACTIVE — original closure S723, attestation S726" and will reference the S725 gap resolution artifacts as acceptance evidence.

---

## 11. Summary Table

| Element | Definition | Reference |
|---------|-----------|-----------|
| **TRANSFER** | Closing series catalogues all responsibilities with proposed receiving owners | §2.1 |
| **ACCEPTANCE** | Every proposed receiving owner explicitly accepts (not "recommended" or "assigned") | §2.2 |
| **APPROVAL** | Governance authority verifies TRANSFER + ACCEPTANCE and signs Pre-Closure Checklist | §2.3 |
| **CLOSE** | Closure declaration with completed Closure Attestation | §2.4 |
| **Pre-Closure Checklist** | 11 items (T-1/2/3, A-1/2/3/4, P-1/2/3/4/5) — all must PASS | §3 |
| **Closure Attestation** | Formal governance record with all 4 steps documented and 3 signatures | §4 |
| **Enforcement Tiers** | Procedural (primary), Plugin (advisory WARN), Governance Board (escalation) | §5 |
| **S723 Would Have Failed** | 12 of 12 checklist items — closure would have been rejected | §6 |
| **Governance Guard Integration** | New RULE 6 (WARN) at session.idle — detects unattested closures | §7 |
| **Dispute Process** | File → Board Review → SUSTAIN / REJECT / CONDITIONAL | §8 |
| **Governance Debt Items** | Recorded for rejected closures with remediation deadline | §9 |

---

## Appendix A — Acceptance Evidence Examples

### Valid Acceptance — Agent Statement (Example)

From REVISION_HISTORY.md or a session report:

```
ACCEPTANCE RECORD
Responsibility: Maintenance of CURRENT_BASELINES.md — 15-file hash recapture,
                §3 defect status refresh, baseline verification
Receiving Owner: Baseline Maintainer (700-series Maintenance Mode)
Acceptance Statement: "I, as Baseline Maintainer (700-series), explicitly
  accept responsibility for CURRENT_BASELINES.md maintenance. I have reviewed
  the onboarding checklist: (1) CURRENT_BASELINES.md §1-§3 structure, (2) all
  15 file SHA-256 hashes, (3) the M5_BASELINE_REFRESH cadence (after any ≥3-file
  write session), (4) the t0_baseline_verify.js automation requirements.
  I accept the escalation obligation to the Governance Board if I am unavailable."
Date of Acceptance: 2026-07-26
```

### Valid Acceptance — Board Resolution (Example)

From a Governance Board session report:

```
BOARD RESOLUTION — OWNERSHIP ACCEPTANCE
Session: S725 Governance Board (Agents A-Z)
Resolution: "The Governance Board unanimously accepts responsibility for the
  600-series deferred lane stewardship (row 16 of the Ownership Matrix v2.0).
  The Board will conduct an annual reactivation criteria review. The first
  review is scheduled for S750. The Board accepts the escalation obligation:
  if the Board cannot convene for the annual review, the Executive Board
  assumes the review responsibility."
Vote: UNANIMOUS (all active lane owners)
```

### Invalid — Assignment Without Acknowledgment (Non-Qualifying)

```
// This is a TRANSFER output — NOT an ACCEPTANCE record
"May coaching layer ownership assigned to 100-series Lead (Platform Maintainer)"
// Status: PROPOSED — awaiting acceptance
```

### Invalid — "Recommended" Language (Non-Qualifying)

```
// From S724 OPERATING_MODEL.json:
"ownership_gaps": ["May coaching layer ownership unassigned —
  recommended assignment to 100-series as runtime dependency"]
// "Recommended assignment" is a proposal. Not acceptance.
```

### Invalid — Generic Lane-Level Assignment (Non-Qualifying)

```
// This is insufficient:
"Receiving Owner: 700-series"
// Must be a specific role:
"Receiving Owner: Baseline Maintainer (700-series Maintenance Mode)"
```

---

## Appendix B — Cross-Reference Index

| Document | Section Referenced |
|----------|--------------------|
| SESSION725_POST700_GOVERNANCE_MODEL.md | §2 (Series Transition Governance), §3 (Ownership Transfer Review Checklist), §4 (Acceptance Requirement), §5 (Gap Analysis) |
| SESSION725_PORTFOLIO_STEWARDSHIP_FRAMEWORK.md | §1 (Portfolio Lane Map), §2 (Ownership Matrix), §3 (Stewardship Principles), §4 (Gap Resolution) |
| SESSION725_OWNERSHIP_MATRIX.json | §1 (Gap Resolution), §2 (Ownership Matrix v2.0), §3 (Responsibility Map by Series), §4 (Transition Verification) |
| SESSION724_SESSION_SUMMARY.md | §Governance Findings (6 ownership gaps), §Recommended Next Actions |
| SESSION724_OPERATING_MODEL.json | §Portfolio Tracks, §Governance, §Operational Readiness |
| `.opencode/plugins/governance-guard.js` | §5.2 (RULE 6 integration), §7 (full integration specification) |
| `knowledge/AGENTS.md` | §9 (Session Startup Protocol), §12 (No Staged Findings), §13 (Runtime Governance) |
| PROJECT_CONSTITUTION.md | Highest authority — all gate provisions are subordinate |

---

## Appendix C — Revision History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-07-26 | Agent H (S726 — Closure Gate Design) | Initial establishment. Defines the 4-step closure chain (TRANSFER → ACCEPTANCE → APPROVAL → CLOSE), Pre-Closure Checklist (11 items), Closure Attestation format, 3-tier enforcement mechanism, governance guard plugin integration (RULE 6), escalation path for disputed closures, governance debt item lifecycle, historical compliance check against S723. Specifications only — no code changes to governance-guard.js or pack files. |

---

*Generated by Agent H — Session 726 Closure Gate Design.*
*Source documents: S725 Agent E Post-700 Governance Model, S725 Portfolio Stewardship Framework, S725 Ownership Matrix v2.0, S724 Session Summary, S724 Operating Model.*
*Target for RULE 6 integration: `.opencode/plugins/governance-guard.js` (extension at session.idle hook).*
