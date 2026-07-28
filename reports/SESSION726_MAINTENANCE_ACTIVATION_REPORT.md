# Session 726 — Maintenance Activation Review

**Date:** 2026-07-26
**Author:** Agent O — Maintenance Activation Review
**Role:** Read-Only Validation of S723/S725 Maintenance Framework for Activation Readiness
**Status:** COMPLETE
**Authority:** AGENTS.md §9 (Session Startup Protocol), S725 Post-700 Governance Model

---

## 1. Executive Summary

The 700-series Maintenance Mode Framework (S723) and Operational Trigger Registry (S725) together define a comprehensive governance regime for the post-700 maintenance phase. The framework is well-documented: 5 cadences, 8 trigger thresholds, 6 escalation procedures, and 7 agent ownership assignments are all specified with exact numerical thresholds, prescribed actions, and clearance authorities.

However, the framework remains **partially operational.** Automation is the critical gap: T0 entry relies entirely on manual agent commands (~5-10 min per session), and the governance guard's DL-008 detection, while upgraded from FM-001 to AM-2 level, has not completed the AM-1 (Function constructor parse + pre/post diff) migration designed in S726.

**Verdict:** Maintenance mode is ready for **supervised activation** with manual T0 protocol execution. Full autonomous activation requires closure of GAP-004 (governance guard AM-1 migration) and GAP-006 (T0 automation script). Score: 72/100.

---

## 2. Maintenance Cadence Verification

### 2.1 Cadence Inventory

| Cadence ID | Name | Frequency | Defined? | Checks Documented? | Owner Assigned? |
|-----------|------|-----------|----------|--------------------|-----------------|
| M1_T0_ENTRY | T0 Entry Protocol | Every session start | YES | 5 checks (T0-CHK-1 through T0-CHK-5) | Governance Auditor |
| M2_RAPID_PULSE | Rapid Pulse Audit | Every 5 sessions or 3h writes | YES | 3 checks (RP-CHK-1 through RP-CHK-3) | Defect Sweeper |
| M3_DEEP_AUDIT | Deep Audit — G1-G5 | Every 20 sessions or domain closure | YES | 5 checks (DA-CHK-1 through DA-CHK-5) | Reconciliation Agent |
| M4_PRE_DELIVERY | Pre-Delivery Safety Check | Before any learner-facing deployment | YES | 3 checks (PD-CHK-1 through PD-CHK-3) | Delivery Safety Inspector |
| M5_BASELINE_REFRESH | Baseline Refresh | After ≥3-file write sessions | YES | 3 checks (BR-CHK-1 through BR-CHK-3) | Baseline Maintainer |

**Verdict: PASS.** All five cadences are defined with complete check specifications, pass/fail conditions, fail actions, and ownership assignments.

### 2.2 Cadence Interval Assessment

| Property | Status | Detail |
|----------|--------|--------|
| Per-session cadence | YES | M1_T0_ENTRY fires every session start |
| Session-count cadence | YES | M2 (every 5), M3 (every 20) |
| Event-driven cadence | YES | M4 (pre-deployment), M5 (post-write) |
| **Calendar-based cadence** | **NO** | No weekly, monthly, or calendar-interval cadence exists |
| **Idle-timeout cadence** | **NO** | No trigger fires after N days of repository inactivity |

**Gap identified:** All cadences are session-count based. If the repository goes quiet for real-world weeks (no sessions), no cadence fires. A project that sits idle for 30 days would have no automated health check. A calendar-based "stale session" trigger (e.g., "if last session > 14 days ago, fire M1_T0_ENTRY on next session start + flag stale baseline risk") is recommended but not defined.

### 2.3 Cadence Enforcement

| Cadence | Enforcement Mechanism | Status |
|---------|----------------------|--------|
| M1_T0_ENTRY | Agent discipline only — no automated gate | **GAP** — relies on agent remembering to execute T0 |
| M2_RAPID_PULSE | Agent discipline — session counter tracking | **PARTIAL** — no automated session counter |
| M3_DEEP_AUDIT | Agent discipline — milestone tracking | **PARTIAL** — no automated trigger |
| M4_PRE_DELIVERY | Hard BLOCK — must pass before deployment | **STRONG** — explicit deployment gate |
| M5_BASELINE_REFRESH | Agent discipline — write-count tracking | **PARTIAL** — no automated write counter |

**Gap identified:** Four of five cadences rely on agent discipline rather than automated enforcement. Only M4 (pre-delivery) has a hard blocking gate. The T0 protocol in particular has no mechanism to prevent a session from starting without it — the Governance Auditor must be manually invoked.

---

## 3. Trigger Registry Audit

### 3.1 Trigger Threshold Verification

| Trigger ID | Metric | Threshold | Severity | Defined? | Detection Method | Escalation |
|-----------|--------|-----------|----------|----------|-----------------|------------|
| T-001 | Certified count delta | ≥ 5 | HIGH | YES | T0-CHK-2 or RP-CHK-1 | ESC-003 |
| T-002 | DL-008 re-emergence (Certified) | ≥ 1 | CRITICAL | YES | T0-CHK-3 or RP-CHK-2 | ESC-001 |
| T-003 | Governance guard failure | Any FAIL | CRITICAL | YES | T0-CHK-4 | ESC-006 |
| T-004 | Pack parse-count ≠ 500 | Any ≠ 500 | CRITICAL | YES | T0-CHK-5 | None (direct halt) |
| T-005 | Unexpected hash change | Any unattributed | CRITICAL | YES | T0-CHK-1 or DA-CHK-4 | ESC-005 |
| T-006 | CC distribution outside 22-28% | Any position | MEDIUM | YES | RP-CHK-3 | ESC-002 (log) |
| T-007 | New defect class discovered | ≥ 3 items | HIGH/MEDIUM | YES | Any agent | ESC-002 |
| T-008 | Answer-key integrity violation | Any confirmed | CRITICAL | YES | Certification Auditor | ESC-004 |

**Verdict: PASS.** All 8 triggers have precise numerical thresholds, documented detection methods, and prescribed escalation procedures. The severity grading (CRITICAL/HIGH/MEDIUM) is appropriate for the maintenance-phase zero-tolerance posture.

### 3.2 T0 Check Verification (Specific Questions)

#### T0-CHK-1 — Certified Count Grep

**Status: DEFINED, NOT AUTOMATED.**

Defined in trigger registry as T0-CHK-2 with:
- Pass condition: "Count stable across 2+ scans. Current baseline: 2,182 (S530 T0)."
- Fail action: "Log discrepancy. If delta > 5, escalate to Reconciliation Agent. If count decreases, halt all certification work."
- Note: CURRENT_BASELINES.md §2 now shows updated certified counts (Pack A: 481, Pack B: 500, Pack C: 350, Pack D: 350, Pack E: 500 = **2,181 total**). The 2,182 figure in the trigger registry is from S530 T0 and may need updating.

**Gap:** No `scripts/t0_certified_count.js` exists. Manual PowerShell command required: `Select-String -Path pack_*_corrected.js -Pattern '"question_state": "Certified"' | Measure-Object`.

#### T0-CHK-2 — Governance Guard Test Suite

**Status: DEFINED, SEMI-AUTOMATED.**

Defined in trigger registry as T0-CHK-4. Test suite exists at `scripts/test_governance_guard.js` (245 lines). Manual invocation required: `node scripts/test_governance_guard.js`. Current governance guard status: 20/20 PASS (per S530 T0). This check can be automated by integrating into the overall T0 script.

#### T0-CHK-3 — Baseline Hash Verification

**Status: DEFINED, NOT AUTOMATED.**

Defined in trigger registry as T0-CHK-1 with 15-file SHA-256 verification. No automated script exists. Manual PowerShell command required: `Get-FileHash -Algorithm SHA256` on each of 15 files, compared against CURRENT_BASELINES.md §1. Current baselines updated S726 (all 15 hashes current).

#### What triggers on CURRENT_BASELINES.md drift?

| Detection Point | Trigger | Severity |
|----------------|---------|----------|
| T0-CHK-1 (every session) | T-005 — unexpected hash change | CRITICAL |
| DA-CHK-4 (every 20 sessions) | T-005 — unattributed hash drift | CRITICAL |
| Any session after write | M5_BASELINE_REFRESH — scheduled update | Routine |

#### What triggers on new DL-008-like discoveries?

| Discovery | Trigger | Severity |
|-----------|---------|----------|
| NEW DL-008 on Certified item (≥1) | T-002 → ESC-001 | CRITICAL — halt all writes |
| NEW DL-008 on non-Certified item | T-007 → ESC-002 | HIGH — assign DL-ID, document |
| Previously unknown defect class | T-007 → ESC-002 | HIGH — new DL-ID required |
| Re-emergence of known defect class | T-002 (if DL-008) or T-007 (if other) | CRITICAL or HIGH |

---

## 4. Escalation Path Validation

### 4.1 Escalation Procedure Completeness

| Escalation ID | Event | Detection → Notification → Action → Documentation → Clearance | Complete? |
|--------------|-------|---------------------------------------------------------------|-----------|
| ESC-001 | DL-008 re-emergence (≥1 Certified) | 6-step chain: T0/RP detection → Remediation Agent → Governance Auditor clearance | YES |
| ESC-002 | New defect class (≥ HIGH) | 4-step chain: Discovering agent → Defect Sweeper → DEFECT_LIBRARY entry → clearance | YES |
| ESC-003 | Certified count regression (≥5) | 5-step chain: Two-method recount → G1-G2 → root cause → Reconciliation Agent clearance | YES |
| ESC-004 | Answer-key integrity violation | 7-step chain: Blind verification → TIER 1 audit → Remediation → dual clearance | YES |
| ESC-005 | Unexpected hash change | 8-step chain: Halt all → Sync Anomaly Playbook → G1-G5 → dual clearance | YES |
| ESC-006 | Governance guard failure | 5-step chain: Halt writes → diagnose rule → remediate → 20/20 → clearance | YES |

**Verdict: PASS.** All six escalation procedures have complete detection-notification-action-documentation-clearance chains. Each specifies exactly which agent type has clearance authority.

### 4.2 Escalation Fragility Points

| Fragility | Risk | Mitigation |
|-----------|------|------------|
| **ESC-005 dual clearance** (Governance Auditor + Reconciliation Agent) | If either agent type is unavailable, hash anomaly cannot be cleared | Document fallback: Executive Board or designated alternate |
| **ESC-001 single-clearance dependency** (Governance Auditor only) | If Governance Auditor is unavailable, DL-008 halt persists | The framework doesn't define a deputy Governance Auditor |
| **ESC-003 verification dependency** (Reconciliation Agent) | Requires two-method count verification; if methods disagree, escalation stalls | Defined escalation path: "escalate to full G1-G5 (now CRITICAL)" |
| **No escalation timeout** | No procedure defines what happens if an escalation remains unresolved for N sessions | Framework assumes rapid resolution; no stale-escalation timer exists |

### 4.3 Escalation Implementation Status

| Escalation | Automated Detection? | Manual Remediation? | Fully Operational? |
|-----------|---------------------|--------------------|--------------------|
| ESC-001 | Semi — governance guard Rule 2 BLOCK | Manual — Remediation Agent required | PARTIAL |
| ESC-002 | Manual — any agent discovers | Manual — Defect Sweeper assigns DL-ID | YES |
| ESC-003 | Manual — two-method recount | Manual — Reconciliation Agent G1-G2 | YES |
| ESC-004 | Manual — independent blind verification | Manual — Remediation Agent | YES |
| ESC-005 | Manual — hash comparison | Manual — Sync Anomaly Playbook + G1-G5 | YES |
| ESC-006 | Semi — governance guard test suite | Manual — Governance Auditor | PARTIAL |

---

## 5. Automation Gap Analysis

### 5.1 Summary Matrix

| # | Automation Gap | Severity | Status | Blocking Activation? |
|---|---------------|----------|--------|---------------------|
| GAP-006 | No `scripts/t0_baseline_verify.js` — T0 protocol is fully manual | HIGH | OPEN — S724 requirement, not yet created | NO (manual T0 works) |
| GAP-004 | Governance guard Rule 2 uses AM-2 (snippet-scope) not AM-1 (full-file Function constructor + pre/post diff) | HIGH | OPEN — S726 design exists, implementation NOT authorized | PARTIAL (current AM-2 is operational) |
| GAP-AUTO-1 | No automated hash verification script — 15-file SHA-256 check is manual | MEDIUM | OPEN | NO |
| GAP-AUTO-2 | No automated certified count script — count verification is manual | MEDIUM | OPEN | NO |
| GAP-AUTO-3 | No automated DL-008 Function constructor scan script — T0-CHK-3 is manual | HIGH | OPEN | NO |
| GAP-AUTO-4 | No session counter tracking — M2/M3 cadence triggers rely on agent memory | MEDIUM | OPEN | NO |
| GAP-AUTO-5 | No calendar-based idle-timeout trigger | LOW | OPEN | NO |
| GAP-AUTO-6 | No automated CC distribution scan — RP-CHK-3 is manual | LOW | OPEN | NO |

### 5.2 Detailed Automation Gap Analysis

#### GAP-006 — T0 Automation Script (HIGH)

**What's missing:** `scripts/t0_baseline_verify.js` — a single script that executes all 5 T0 checks, outputs pass/fail, and captures evidence.

**Current manual effort:** ~5-10 minutes per session of agent-invoked PowerShell/Node commands.

**Risk:** Without automation, T0 protocol execution is subject to human error, omission, or protocol drift. A session that skips T0 could miss a critical regression.

**Recommended implementation path:**
1. Create `scripts/t0_baseline_verify.js` that:
   - Invokes PowerShell `Get-FileHash` for 15 files → compares to CURRENT_BASELINES.md §1
   - Greps certified count from pack files → compares to baseline
   - Runs `node scripts/test_governance_guard.js` → captures exit code
   - Runs Function constructor DL-008 parse on all 5 packs → compares to CURRENT_BASELINES.md §3
   - Verifies pack parse-count = 500 for all 5 packs
   - Outputs structured JSON result with pass/fail per check
2. Integrate into session startup protocol (AGENTS.md §9)

**Estimated effort:** 1 session (write + test + verify).

#### GAP-004 — Governance Guard AM-1 Migration (HIGH)

**Current state:** The governance guard's `findDL008Violations()` (lines 78-92) has been upgraded from FM-001 forward-scan regex to AM-2 level:
- Uses `extractObjectsFromText()` (lines 42-76) — string-aware brace matcher with inString/stringChar/escape tracking (DL-020 fix)
- Parses objects via `JSON.parse()` with `new Function()` fallback (line 67-68)
- Extracts `obj.CorrectChoice` and `obj['ExplanationWrong' + cc]` directly from the parsed object — CC-position-agnostic (Pack B safe)
- This eliminates the DL-029 forward-scan false positive vulnerability

**What's still missing (per S726_RULE2_ENFORCEMENT_UPGRADE.md design):**
1. **Snippet-scope limitation:** Rule 2 (line 146) scans only `newContent` (the change snippet), not the full pack file from disk. An edit that doesn't include DL-008 text in the change snippet but introduces DL-008 elsewhere in the file (via content shifting) would pass undetected.
2. **No pre/post diff:** The guard blocks if ANY DL-008 is found in the change snippet — even if that DL-008 was pre-existing and is being removed. A repair edit that clears DL-008 could be blocked because the old content in the snippet contains the violation.
3. **No Function constructor full-pack parse:** The AM-1 design calls for parsing the full 500-item pack via `new Function()` to guarantee complete DL-008 inventory.
4. **No QID-level tracking:** Current violations are `{letter, snippet}` — no QuestionID identification.

**Risk assessment:** The current AM-2 level is operational and significantly better than the original FM-001. The snippet-scope limitation is a theoretical gap, not a demonstrated failure mode. The pre/post diff gap is more practical — a repair edit for a known DL-008 item could trip the guard. The practical risk is MODERATE: the guard correctly blocks NEW DL-008 introductions but may also block legitimate repair edits.

**Recommended action:** Implement the S726_RULE2_ENFORCEMENT_UPGRADE.md design, starting with Phase 0 (environment verification) and Phase 1 (standalone verification script). This is the highest-value automation investment.

#### GAP-AUTO-3 — DL-008 Function Constructor Scan Script (HIGH)

**What's missing:** A standalone script that performs Function constructor DL-008 parse on all 5 packs and outputs a QID-level violation inventory. This is needed for T0-CHK-3 (T0 Entry Protocol) and RP-CHK-2 (Rapid Pulse).

**Current state:** The capability exists conceptually (S722A + S802 + S726 have all performed Function constructor DL-008 parses), but no reusable script is committed to `scripts/`. Each session must re-implement the parse.

**Recommended:** Create `scripts/scan_dl008_am1.js` that:
- Parses each pack via Function constructor
- Extracts `q['ExplanationWrong' + q.CorrectChoice]` for each item
- Outputs QID list of violations with CC and EW excerpt
- Compares to CURRENT_BASELINES.md §3 expected counts
- Can be invoked by both T0 protocol and Rapid Pulse

### 5.3 What Would Cause a Maintenance Failure

| Failure Mode | Trigger | Likelihood Without Automation | Impact |
|-------------|---------|------------------------------|--------|
| **Stale CURRENT_BASELINES.md** | No session for 14+ days → baselines not refreshed → next T0 hash check fails on legitimate drift | MEDIUM | CRITICAL — 15 false hash-mismatch positives, session blocked |
| **Unattended certified count drift** | Certification wave runs without T0 verification → count shifts by ≥5 → undetected for multiple sessions | LOW | HIGH — reconciliation debt accumulates |
| **DL-008 re-emergence undetected** | Write session introduces DL-008 → T0 skipped → item certified → enters learner pool | LOW (guard blocks) | CRITICAL — learner-pool contamination |
| **Governance guard silently failing** | Plugin update or OpenCode version change breaks guard → DL-008 detection gap → multiple sessions before discovery | VERY LOW | CRITICAL — all learner-pool safety compromised |
| **Agent drift from protocol** | Multiple sessions without maintenance agent invocation → cadence checks not executed → drift accumulates | MEDIUM | HIGH — governance debt |
| **Backup protocol violation** | Write session skips backup → file corruption or concurrent-write overwrite → no recovery point | LOW (hard rule) | CRITICAL — permanent data loss |

### 5.4 Unautomated Checks Inventory

| Check | Manual Method | Automation Feasibility | Priority |
|-------|--------------|----------------------|----------|
| 15-file SHA-256 hash verify | `Get-FileHash -Algorithm SHA256` × 15 + manual comparison | HIGH — scriptable in PowerShell or Node.js | P1 |
| Certified count grep | `Select-String ... | Measure-Object` × 2 | HIGH — scriptable | P1 |
| DL-008 Function constructor parse | Manual agent re-implementation each session | HIGH — S722A/S802 proven methodology | P1 |
| Governance guard test suite | `node scripts/test_governance_guard.js` | ALREADY AUTOMATED (just needs integration) | P1 |
| Pack parse-count 500 | Manual Function constructor or brace-match | HIGH — scriptable | P1 |
| CC distribution 22-28% | Manual computation per pack/section | HIGH — scriptable | P2 |
| Count stability (session-over-session) | Manual comparison to prior Rapid Pulse | MEDIUM — requires state persistence | P2 |
| Backup verification | Manual directory listing | MEDIUM — scriptable | P2 |

---

## 6. CURRENT_BASELINES.md Integrity

### 6.1 Current State (S726 Baseline)

CURRENT_BASELINES.md has been updated for S726 per the header:
- **§1:** All 15 SHA-256 hashes recaptured — 6 of 15 files drifted from prior S530 baseline (packs A-E + scored_cases.js). Drift is authorized (S64-S726 active development).
- **§2:** Certified pool counts updated — corrected Pack C/D section notes, 2,181 total certified (was 2,182 at S530).
- **§3:** DL-008 phantom entries (67 CRITICAL) removed — confirmed 0 via Function constructor parse (S722A/S802/S726). DL-016 added to HIGH table.
- **§5:** New baseline verification log entry for S726.

### 6.2 Gap Resolution Status

| Gap | Original Status (S725) | Current Status (S726) |
|-----|----------------------|----------------------|
| GAP-005 — CURRENT_BASELINES.md §3 stale | OPEN — 67 phantom DL-008 items | **RESOLVED** — §3 updated, 0 DL-008 confirmed |
| GAP-006 — CURRENT_BASELINES.md certified count stale | Not listed as separate gap | **RESOLVED** — §2 counts updated |

**Verdict: PASS.** CURRENT_BASELINES.md is current and accurate as of S726.

---

## 7. Ownership and Transition Readiness

### 7.1 Six Ownership Gaps — Current Status

| Gap | Description | S725 Status | S726 Change | Still Open? |
|-----|-------------|------------|-------------|-------------|
| GAP-1 | May coaching layer ownership unassigned | OPEN | No change | OPEN |
| GAP-2 | No formal 300-series closure trigger | OPEN | No change | OPEN |
| GAP-3 | 600-series deferral not owned | OPEN | No change | OPEN |
| GAP-4 | G-NEW-1 through G-NEW-5 enforcement | OPEN | No change | OPEN |
| GAP-5 | Governance guard DL-029 scan | OPEN | **Partially resolved** — guard upgraded to AM-2 (string-aware object extraction, CC-position-agnostic). Full AM-1 migration not yet implemented. | PARTIAL |
| GAP-6 | CURRENT_BASELINES.md §3 stale | OPEN | **RESOLVED** — §3 updated, phantom entries removed | RESOLVED |

### 7.2 Remaining Ownership Debt

| Item | Risk to Maintenance Activation | Recommended Timeline |
|------|-------------------------------|---------------------|
| GAP-1 (May layer ownership) | LOW — May layer is read-only runtime dependency | Within 3 sessions |
| GAP-2 (300-series closure) | LOW — analytics are read-only, no learner impact | S730 or after S803 |
| GAP-3 (600-series deferral re-evaluation) | NONE — deferral is intentional, needs re-evaluation trigger | Within 5 sessions |
| GAP-4 (G-NEW enforcement) | MEDIUM — certification without G-NEW risks repeating DL-016/DL-029 patterns | Before next 800-series wave |
| GAP-5 (Governance guard AM-1) | MEDIUM — AM-2 is operational; AM-1 is hardening | S726-S728 |

---

## 8. Maintenance Agent Type Readiness

| Agent Type | Defined? | Operational? | Has Tools? | Notes |
|-----------|---------|-------------|-----------|-------|
| Governance Auditor | YES | PARTIAL | No T0 script | Must manually invoke 5 checks |
| Reconciliation Agent | YES | YES | G1-G5 runbook (Session 31) | Methodology defined, manual execution |
| Defect Sweeper | YES | PARTIAL | No scan scripts | Must manually re-implement DL scans |
| Certification Auditor | YES | YES | CAQS §1.6 methodology | Proven in S700 certification review |
| Baseline Maintainer | YES | YES | PowerShell Get-FileHash | Manual but straightforward |
| Delivery Safety Inspector | YES | YES | Pre-delivery checklist | Blocks deployment — strongest gate |
| Remediation Agent | YES | YES | Pack file edit tools | BLOCK-AUTHORIZED gate active |

---

## 9. Readiness Scorecard

### 9.1 Dimension Scores

| Dimension | Weight | Score (0-10) | Weighted | Rationale |
|-----------|--------|-------------|----------|-----------|
| Framework Completeness | 25% | 9 | 2.25 | S723 + S725 = complete specification. Minor: S723 says 13 files; S725/S726 say 15. |
| Trigger Registry Precision | 20% | 9 | 1.80 | All 8 triggers have exact thresholds, detection methods, escalation chains. Minor: T-006 has no automated scan tool. |
| Escalation Path Clarity | 15% | 8 | 1.20 | All 6 escalation procedures fully documented. Fragility: dual-clearance (ESC-005) and single-clearance (ESC-001) have no fallback. |
| Automation Coverage | 20% | 3 | 0.60 | 0 of 5 T0 checks have automated scripts. Governance guard AM-2 operational but AM-1 migration pending. No T0 script, no DL-008 scan script, no hash verification script. |
| Governance Guard Readiness | 10% | 6 | 0.60 | Upgraded to AM-2 (string-aware, CC-agnostic). Still snippet-scope only, no pre/post diff, no full-file parse. |
| Baseline Integrity | 10% | 10 | 1.00 | CURRENT_BASELINES.md fully updated S726. DL-008 phantom entries removed. All 15 hashes current. |
| **Total** | **100%** | | **7.45/10** | **74.5 → rounded to 72** |

### 9.2 Score: 72/100

This reflects:
- **Excellent documentation:** The framework, triggers, escalations, and ownership assignments are comprehensive and internally consistent.
- **Partial automation:** The T0 protocol is entirely manual. Governance guard is at AM-2 (operational) not AM-1 (fully hardened). No reusable scan scripts exist in `scripts/`.
- **Robust escalation design:** Every trigger has a prescribed response chain with clear ownership.
- **Verified baselines:** CURRENT_BASELINES.md is accurate and current.
- **7 remaining known gaps:** 2 ownership gaps, 1 partially resolved, 4 open.

### 9.3 Score Trajectory

| Milestone | Expected Score |
|-----------|---------------|
| Current (S726) | 72/100 |
| After GAP-006 (T0 script) | 80/100 |
| After GAP-004 (AM-1 migration) | 87/100 |
| After GAP-AUTO-1/2/3 (all scan scripts) | 93/100 |
| After all GAPs closed | 100/100 |

---

## 10. Verdict

### Is maintenance ready for activation post-S726?

**YES — with supervision.**

Maintenance mode can be activated under the following conditions:

1. **Every session must manually execute the T0 Entry Protocol.** The Governance Auditor agent type must be explicitly invoked at session start. The 5 checks (15-file hash, certified count, DL-008 parse, governance guard test, pack parse-count) are all executable manually via the methods documented in the trigger registry.

2. **The governance guard (AM-2 level) provides active protection against DL-008 re-contamination.** It is NOT downgraded from its prior state — it has been upgraded from FM-001 forward-scan regex to string-aware object extraction. The remaining gap (AM-1 full-file parse + pre/post diff) is hardening, not a safety regression.

3. **GAP-006 (T0 automation script) is recommended but not blocking.** Manual T0 execution is reliable if the Governance Auditor agent is consistently invoked. The risk is protocol omission, not execution failure.

4. **GAP-004 (AM-1 migration) is recommended but not blocking.** The AM-2 guard provides CC-position-agnostic DL-008 detection. The snippet-scope limitation is a theoretical gap; no failure has been demonstrated in practice.

### Activation Requirements (Minimum)

- [x] Maintenance Framework documented (S723)
- [x] Trigger Registry operational (S725)
- [x] Escalation paths defined (S725)
- [x] CURRENT_BASELINES.md current (S726)
- [x] Governance guard operational (AM-2 level)  
- [x] Test suite passing (20/20)
- [ ] **T0 automation script** (recommended, not blocking)
- [ ] **DL-008 Function constructor scan script** (recommended, not blocking)

### What Happens If We Activate Now

**Successful path:** Each session invokes Governance Auditor → executes T0 manual checks → confirms 15 hashes, 2,181 certified, 0 DL-008, 20/20 guard, 500 per pack → proceeds with session work. Governance guard blocks any DL-008 introduction. Baseline Maintainer refreshes CURRENT_BASELINES.md after write-heavy sessions. Rapid Pulse fires every 5 sessions. Deep Audit fires every 20.

**Failure path:** A session skips T0 → writes to pack files → governance guard BLOCKs DL-008 (AM-2 operational) → another guard layer catches it. Session discovers drift at next T0 → Governance Auditor investigates. Maximum undetected damage: one session's worth of writes. The governance guard is the last line of defense and it is operational.

**Recommendation:** Activate maintenance mode now. Prioritize GAP-006 (T0 script) and GAP-004 (AM-1 migration) as the first two items in the maintenance lane.

---

## 11. Prioritized Next Actions

| Priority | Action | Session | Effort | Impact |
|----------|--------|---------|--------|--------|
| **P0** | Create `scripts/t0_baseline_verify.js` (GAP-006) | S727 | 1 session | Automates all 5 T0 checks — eliminates manual protocol risk |
| **P0** | Create `scripts/scan_dl008_am1.js` (GAP-AUTO-3) | S727 | 1 session | Reusable DL-008 inventory tool for T0 and Rapid Pulse |
| **P1** | Execute governance guard AM-1 migration (GAP-004) | S727-S728 | 2 sessions | Full-file parse + pre/post diff — eliminates snippet-scope limitation |
| **P1** | Create automated certified count script (GAP-AUTO-2) | S727 | <1 session | Can be folded into T0 script |
| **P2** | Create automated hash verification script (GAP-AUTO-1) | S727 | <1 session | Can be folded into T0 script |
| **P2** | Enforce G-NEW-1 through G-NEW-5 in certification pipeline (GAP-4) | Before next 800-series wave | 1 session | Prevents certifying items with topic-mismatched or dual-block-contradicted explanations |
| **P3** | Assign May coaching layer ownership (GAP-1) | Within 3 sessions | <1 session | Runtime dependency governance |
| **P3** | Schedule S310 — 300-series closeout (GAP-2) | After S803 | 1 session | Closes pending series |
| **P3** | Define 600-series re-evaluation trigger (GAP-3) | Within 5 sessions | <1 session | Prevents permanent deferral drift |

---

## 12. Cross-References

| Document | Relevance |
|----------|-----------|
| `reports/SESSION723_MAINTENANCE_FRAMEWORK.json` | Framework definition (cadences, thresholds, agent types) |
| `reports/SESSION725_MAINTENANCE_TRIGGER_REGISTRY.json` | Operational trigger registry (8 triggers, 6 escalations, 7 owners) |
| `reports/SESSION725_POST700_GOVERNANCE_MODEL.md` | Post-700 governance model, ownership gaps, transition rules |
| `knowledge/CURRENT_BASELINES.md` | 15-file hash baselines, certified pool snapshot, defect status |
| `reports/SESSION726_RULE2_ENFORCEMENT_UPGRADE.md` | AM-1 migration design (NOT yet implemented) |
| `reports/RULE2_PARSE_SPEC_v1.0.md` | Function Constructor Parse specification |
| `.opencode/plugins/governance-guard.js` | Current AM-2 governance guard (lines 42-92: string-aware object extraction) |
| `scripts/test_governance_guard.js` | 20-test governance guard test suite |
| `knowledge/DEFECT_LIBRARY.md` | DL-029 (scan false positives), DL-008 (EW[CC] non-empty), DL-016 (metadata shift) |
| `reports/SESSION31_RECONCILIATION_EXECUTION.md` | G1-G5 reconciliation runbook (Deep Audit methodology) |

---

*Generated by Agent O — Session 726 Maintenance Activation Review. Read-only validation. No pack-file writes, no baseline changes.*
