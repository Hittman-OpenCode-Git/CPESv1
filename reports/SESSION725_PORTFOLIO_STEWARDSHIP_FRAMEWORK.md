# Portfolio Stewardship Framework v1.0

**Version:** 1.0
**Session:** 725 (Governance Hardening & Post-700 Ownership Transition)
**Agent:** O — Portfolio Stewardship Architect
**Date:** 2026-07-26
**Type:** Governance Artifact — Read-Only Creation
**Authority:** PROJECT_CONSTITUTION.md, S724 Executive Board Directive
**Dependencies:** S723 Maintenance Framework, S723 Portfolio Handoff, S724 Operating Model, CURRENT_BASELINES.md
**Status:** ACTIVE

---

## Executive Purpose

This framework establishes the permanent ownership structure for the CMA Part 1 Exam Simulator portfolio. It defines who owns what at steady-state, eliminating the 6 ownership gaps identified by S724. Every governance responsibility has a named owner, a secondary owner, an escalation path, and a cadence. No responsibility is orphaned.

The framework is designed to persist across series boundaries (100→300→500→600→700→800) and across maintainer transitions. It is reviewed at every series boundary and at every quarterly stewardship review.

---

## 1. Portfolio Lane Map

### Lane Structure

The portfolio operates 8 lanes at varying states of activity. Each lane has a primary owner, defined scope, explicit boundary rules, key artifacts, and a documented succession plan.

---

### Lane 100 — Maintenance & Runtime

| Property | Value |
|----------|-------|
| **Lane ID** | 100-series |
| **Name** | Maintenance & Runtime |
| **Current Status** | **ACTIVE** |
| **Primary Owner** | 100-series Lead (Platform Maintainer) |
| **Scope of Responsibility** | Runtime bug fixes, session recovery, app.js integrity, UI rendering, application-core health. Backward-compatible changes only. |
| **Boundary Rules — MAY** | Fix runtime crashes (DL-022 pattern). Apply defensive null guards. Update UI rendering for new content schemas. Patch session persistence issues. Maintain index_updated.html and styles.css integrity. |
| **Boundary Rules — MAY NOT** | Change pack content. Modify answer keys. Adjust scoring logic. Make governance decisions. Create new certification states. Modify timers or exam structure during content review. Alter schema definitions. Break backward compatibility. |
| **Key Artifacts Owned** | `app.js`, `index_updated.html`, `styles.css`, `may-core.js` (co-ownership with May Coaching), `may-learner-state.js` (co-ownership with May Coaching) |
| **Succession Plan** | If 100-series Lead unavailable → Governance Auditor (700-series) assumes runtime-critical maintenance responsibility. The onboarding checklist is: (1) read CURRENT_BASELINES.md §1 for all runtime-critical hashes, (2) review DL-022 null-guard pattern (Insertions 1+2 in app.js), (3) review app.js session recovery code paths (lines ~1180-2100), (4) confirm governance guard 20/20 PASS. |
| **Key References** | SESSION724_OPERATING_MODEL.json §100_series, CURRENT_BASELINES.md §1 |

---

### Lane 300 — Portfolio Analytics

| Property | Value |
|----------|-------|
| **Lane ID** | 300-series |
| **Name** | Portfolio Analytics |
| **Current Status** | **ACTIVE — S310 (final session) pending** |
| **Primary Owner** | 300-series Lead (Portfolio Analytics) |
| **Scope of Responsibility** | Read-only quality analytics: Design Quality Score (DQS), Explanation Quality Score (EQS), Blueprint Quality Score (BQS), Exhibit Quality Score (ExQS), UI Quality Score (UIQS), Risk Register, Forecast Engine, Bottleneck Analysis. Consumed by 700-series governance and 800-series certification planning. |
| **Boundary Rules — MAY** | Produce analytics dashboards. Generate quality scores. Model certification throughput. Identify bottlenecks. Produce forecast projections. Flag risks and outliers. |
| **Boundary Rules — MAY NOT** | Change pack content. Make governance decisions. Modify certification states. Execute remediations. Create new defect entries (report findings to Defect Sweeper). |
| **Key Artifacts Owned** | DQS, EQS, BQS, ExQS, UIQS models. Risk Register. Forecast Engine. Bottleneck Analysis report. Portfolio Operations Dashboard (S310 deliverable). |
| **Succession Plan** | If 300-series Lead unavailable → Reconciliation Agent (700-series) assumes analytics consumption but not production. Full succession requires a new 300-series agent spawned for S310 closeout. The onboarding checklist: (1) read S307-S309 session reports, (2) read S724 Operating Model for current portfolio state, (3) execute S310 as closeout deliverable. |
| **Key References** | SESSION724_OPERATING_MODEL.json §300_series, SESSION723_PORTFOLIO_HANDOFF.json §300_series |

---

### Lane 500 — Case-Bank Certification

| Property | Value |
|----------|-------|
| **Lane ID** | 500-series |
| **Name** | Case-Bank Certification |
| **Current Status** | **CLOSED** — All deliverables complete |
| **Primary Owner** | 500-series Lead (Case-Bank Certification — role transitions to maintenance stewardship) |
| **Scope of Responsibility** | ENHANCED_CASE_BASE: 15/15 cases, 90/90 items Certified (100%). MIGRATED_CASE_BASE_B and D also Certified. Post-closure: steward the case-bank Certified state — no new certification, only integrity monitoring and defect-response. |
| **Boundary Rules — MAY** | Monitor case-bank Certified-count stability. Respond to defect reports affecting Certified case items. Participate in quarterly stewardship review. |
| **Boundary Rules — MAY NOT** | Create new case-bank certification waves (all certification complete). Modify case content outside of defect remediation. Re-open ENHANCED_CASE_BASE certification (closed at 100%). |
| **Key Artifacts Owned** | `scored_cases.js` through `scored_cases5.js` (integrity stewardship, not content). S508-S537 session reports. ENHANCED_CASE_BASE certification records. |
| **Succession Plan** | If 500-series Lead unavailable → Certification Auditor (800-series) assumes case-bank integrity monitoring. Case-bank content knowledge is documented in scored_cases*.js files — any Certified items carry complete CAQS §1.6 six-dimension verification records in REVISION_HISTORY.md. |
| **Key References** | SESSION723_PORTFOLIO_HANDOFF.json §500_series, CURRENT_BASELINES.md §2 |

---

### Lane 600 — Content Operations

| Property | Value |
|----------|-------|
| **Lane ID** | 600-series |
| **Name** | Content Operations (Candidate) |
| **Current Status** | **DEFERRED** — S724 Executive Board unanimous decision (26/26 agents) |
| **Primary Owner** | None (deferred lane — no active owner) |
| **Scope of Responsibility** | Explanation Wrong factory production, rewrite factory operations, pre-certification EW authoring pipeline. Designed but not launched. |
| **Boundary Rules — MAY** | Charter and design documents are preserved for future reference. Agent K's EW Operating Model (4-stage lifecycle) and Agent F's EW Factory Feasibility remain available as reference designs. |
| **Boundary Rules — MAY NOT** | Consume sessions. Produce deliverables. Create new artifacts. Interact with any active lane. |
| **Key Artifacts Owned** | Charter documents (reference only). Agent K EW Operating Model. Agent F Feasibility Report. Agent L Rewrite Model. All preserved in S724 deliverables. |
| **Succession Plan** | Reactivation requires: (1) all 5 criteria from S724 Agent V Governance Preservation report met, (2) 800-series certification complete or binding constraint shifted, (3) new Executive Board vote (cannot re-use S724 vote), (4) full T0 governance baseline captured before launch. |
| **Key References** | SESSION724_SESSION_SUMMARY.md, SESSION724_OPERATING_MODEL.json §600_series |

---

### Lane 700 — Governance & Calibration

| Property | Value |
|----------|-------|
| **Lane ID** | 700-series |
| **Name** | Governance & Calibration |
| **Current Status** | **MAINTENANCE** — S723 established Maintenance Mode v1.0 |
| **Primary Owner** | Governance Auditor (700-series Maintenance Mode) |
| **Scope of Responsibility** | T0 entry protocol execution at every session start. Hash verification on all 13 runtime-critical files. Certified-count stability monitoring. DL-008 Function-constructor parse verification. Governance guard 20/20 confirmation. Trigger threshold monitoring. Escalation response. Maintenance framework enforcement (S723). Governance continuity across all series. |
| **Boundary Rules — MAY** | Execute T0 protocol. Verify hashes against CURRENT_BASELINES.md. Flag drift. Spawn reconciliation agents. Escalate CRITICAL-level triggers. Recommend governance actions. Conduct Rapid Pulse audits (every 5 sessions). Conduct Deep Audits (every 20 sessions). |
| **Boundary Rules — MAY NOT** | Modify pack content. Make certification decisions. Author new explanations. Change governance guard rules (requires Executive Board). Bypass trigger thresholds without escalation documentation. |
| **Key Artifacts Owned** | `knowledge/CURRENT_BASELINES.md` (co-ownership with Baseline Maintainer). `reports/session_status/SESSION_STATUS_2026-07-24.md`. Governance guard plugin (`.opencode/plugins/governance-guard.js`). T0 verification protocol. Maintenance Framework v1.0 (S723). |
| **Succession Plan** | If Governance Auditor unavailable → Baseline Maintainer assumes T0 protocol + hash verification duties. Reconciliation Agent assumes trigger monitoring + escalation. The maintenance framework (S723) defines all cadences, thresholds, and escalation conditions — it operates autonomously once activated. The onboarding checklist: (1) read SESSION_STATUS_2026-07-24.md, (2) run full T0 protocol (CURRENT_BASELINES.md hash verify + Certified count grep + DL-008 Function constructor parse), (3) confirm governance guard 20/20 PASS, (4) review S723 Maintenance Framework trigger thresholds and escalation conditions. |
| **Key References** | SESSION723_MAINTENANCE_FRAMEWORK.json, SESSION723_PORTFOLIO_HANDOFF.json §700_series, SESSION724_OPERATING_MODEL.json §governance |

---

### Lane 800 — Certification & Modernization

| Property | Value |
|----------|-------|
| **Lane ID** | 800-series |
| **Name** | Certification & Modernization |
| **Current Status** | **ACTIVE** — S803 cleared for launch |
| **Primary Owner** | 800-series Lead (Certification Auditor) |
| **Scope of Responsibility** | Certification waves per CAQS §1.6 six-dimension verification. Domain E certification (167 items). Domain F certification (149 items). Pack A closeout (19 items). Case-bank EW authoring (~310 items). Governance closure (2 sessions). DCS calibration. G-NEW-1 through G-NEW-5 enforcement (per S725). Modernization batch operations. |
| **Boundary Rules — MAY** | Certify items meeting CAQS §1.6 HIGH-confidence gates. Author embedded ExplanationWrong fields during certification. Calibrate DifficultyScore/CognitiveLevel assignments. Execute modernization batches. Govern G-NEW-1 through G-NEW-5. |
| **Boundary Rules — MAY NOT** | Bypass CAQS §1.6 six-dimension verification. Certify items with DL-008 violations (governance guard Rule 2 BLOCK). Certify items with ExplanationWrong topic-mismatch (G-NEW-2 BLOCK). Certify items with dual-block Choice mismatch (G-NEW-1/G-NEW-3 BLOCK). Produce analytics reports (300-series domain). Change governance framework. |
| **Key Artifacts Owned** | Certification-wave records in REVISION_HISTORY.md. DCS calibration data. 8 Permanent DL-029 Prevention Rules (S802). G-NEW-1 through G-NEW-5 enforcement procedures (this framework, §4.3). |
| **Succession Plan** | If 800-series Lead unavailable → Defect Sweeper (700-series) assumes certification-wave monitoring. Certification Auditor role transitions to the next appointed auditor via S725 Agent E acceptance protocol (see §3, Principle 2). The onboarding checklist: (1) read the most recent 800-series session report, (2) review CAQS §1.6 six-dimension verification protocol, (3) review G-NEW-1 through G-NEW-5 enforcement procedures (§4.3), (4) confirm governance guard 20/20 PASS before any certification write. |
| **Key References** | SESSION724_OPERATING_MODEL.json §800_series, SESSION723_PORTFOLIO_HANDOFF.json §800_series |

---

### Lane — May Coaching Layer

| Property | Value |
|----------|-------|
| **Lane ID** | May Coaching (S120-S131) |
| **Name** | May Coaching Layer |
| **Current Status** | **ACTIVE** — Runtime dependency |
| **Primary Owner** | 100-series Lead (Platform Maintainer) — assigned by S725 ownership resolution §4.6 |
| **Scope of Responsibility** | Student-facing coaching engine. Learner state management. Coaching UI rendering. Coaching hint delivery. Integration with app.js session lifecycle. Runtime dependency on pack-file Certified pool. |
| **Boundary Rules — MAY** | Fix coaching-layer runtime bugs. Update coaching hints for content changes. Maintain may-core.js and may-learner-state.js integrity. Coordinate with 100-series on app.js integration points. |
| **Boundary Rules — MAY NOT** | Create new coaching content (requires certification pipeline). Modify pack-file content. Change scoring logic. Make governance decisions. |
| **Key Artifacts Owned** | `may-core.js` (SHA-256: `183D2E...` per S530 baseline). `may-learner-state.js` (SHA-256: `BEE72B...` per S530 baseline). |
| **Succession Plan** | If 100-series Lead unavailable → Governance Auditor (700-series) assumes coaching-layer integrity monitoring. Both May files are tracked in CURRENT_BASELINES.md §1 with SHA-256 hashes and size baselines — integrity verification is part of standard T0 protocol. Coaching-layer content knowledge: S120-S131 session reports in `reports/` directory. |
| **Key References** | CURRENT_BASELINES.md §1 (May Coaching Layer), SESSION724_OPERATING_MODEL.json §100_series |

---

### Lane — Governance Infrastructure

| Property | Value |
|----------|-------|
| **Lane ID** | Governance Infrastructure |
| **Name** | Governance Infrastructure |
| **Current Status** | **ACTIVE** |
| **Primary Owner** | Governance Auditor (700-series) |
| **Scope of Responsibility** | Governance guard plugin (5 rules active, 20/20 PASS). T0 entry protocol. Defect library (DEFECT_LIBRARY.md). REVISION_HISTORY.md governance entries. CAQS v1.0 standard maintenance. Metadata standard maintenance. AGENTS.md standing instructions. PROJECT_CONSTITUTION.md stewardship. Current baselines tracking. |
| **Boundary Rules — MAY** | Maintain governance guard rules. Update DEFECT_LIBRARY.md. Append REVISION_HISTORY.md entries. Update CURRENT_BASELINES.md after verified writes. Amend AGENTS.md with new standing instructions (per governance board approval). Propose CAQS amendments (requires Executive Board). |
| **Boundary Rules — MAY NOT** | Modify governance guard rules without Executive Board approval. Delete defect library entries (archive only). Modify PROJECT_CONSTITUTION.md without explicit authorization. Skip backup protocol before any infrastructure file edit. |
| **Key Artifacts Owned** | `.opencode/plugins/governance-guard.js`. `knowledge/DEFECT_LIBRARY.md`. `knowledge/REVISION_HISTORY.md`. `knowledge/CURRENT_BASELINES.md` (co-ownership with Baseline Maintainer). `knowledge/CAQS_v1.0.md`. `knowledge/QUESTION_METADATA_STANDARD.md`. `AGENTS.md`. `knowledge/PROJECT_CONSTITUTION.md` (stewardship). |
| **Succession Plan** | If Governance Auditor unavailable → Baseline Maintainer (700-series) assumes governance guard monitoring and CURRENT_BASELINES.md continuity. Defect Sweeper assumes DEFECT_LIBRARY.md maintenance. All governance infrastructure files are tracked in CURRENT_BASELINES.md — integrity verification is part of standard T0 protocol. The governance guard test suite (`scripts/test_governance_guard.js`, 12 tests) provides self-contained verification. |
| **Key References** | SESSION723_MAINTENANCE_FRAMEWORK.json, SESSION724_OPERATING_MODEL.json §governance |

---

## 2. Ownership Matrix

Every governance responsibility maps to a primary owner, secondary owner, escalation owner, and review cadence. No responsibility is shared without a primary decision-maker.

| # | Responsibility | Primary Owner | Secondary Owner | Escalation Owner | Cadence |
|---|---------------|---------------|-----------------|------------------|---------|
| 1 | **CURRENT_BASELINES.md maintenance** | Baseline Maintainer (700-series) | Certification Auditor (800-series) | Governance Board | After any write to any pack file, app.js, or governance file |
| 2 | **Defect manifest updates (DEFECT_LIBRARY.md)** | Defect Sweeper (700-series) | Baseline Maintainer (700-series) | Governance Board | Per defect finding — contemporaneous, not batched |
| 3 | **Certification reporting** | Certification Auditor (800-series) | Defect Sweeper (700-series) | Governance Board | Per certification wave; minimum entry in REVISION_HISTORY.md per wave |
| 4 | **Modernization reporting** | 800-series Lead | Certification Auditor (800-series) | Governance Board | Per modernization milestone; minimum entry in REVISION_HISTORY.md |
| 5 | **Governance trigger monitoring** | Governance Auditor (700-series) | Reconciliation Agent (700-series) | Governance Board | Every session start (T0); every 5 sessions (Rapid Pulse); every 20 sessions (Deep Audit) |
| 6 | **May coaching layer ownership** | 100-series Lead (Platform Maintainer) | Governance Auditor (700-series) | Governance Board | At platform updates; quarterly stewardship review |
| 7 | **T0 protocol execution** | Governance Auditor (700-series) | Session Lead (any active lane) | Governance Board | Every session start — mandatory, not optional |
| 8 | **Pre-delivery safety check** | Delivery Safety Inspector (700-series) | Governance Auditor (700-series) | Governance Board | Before any learner-facing deployment |
| 9 | **Knowledge base accuracy** | Baseline Maintainer (700-series) | All lane owners | Governance Board | Quarterly; after any CAQS or metadata standard amendment |
| 10 | **Defect library maintenance** | Defect Sweeper (700-series) | Certification Auditor (800-series) | Governance Board | Per defect finding; per remediation closeout |
| 11 | **G-NEW-1 through G-NEW-5 enforcement** | Certification Auditor (800-series) | Defect Sweeper (700-series) | Governance Board | Per certification wave; per remediation batch |
| 12 | **300-series S310 closeout** | 300-series Lead (Portfolio Analytics) | Reconciliation Agent (700-series) | Governance Board | One-time — execute S310 (Portfolio Operations Dashboard) |
| 13 | **Case-bank integrity stewardship** | 500-series Lead (post-closure) | Certification Auditor (800-series) | Governance Board | Per defect report affecting Certified case items; quarterly |
| 14 | **Governance guard integrity** | Governance Auditor (700-series) | Baseline Maintainer (700-series) | Governance Board | Every session start (20/20 test suite); after any governance plugin change |
| 15 | **AGENTS.md standing instructions** | Governance Auditor (700-series) | Baseline Maintainer (700-series) | Governance Board | After any governance rule or protocol change |
| 16 | **600-series deferred lane stewardship** | Governance Board (collective) | None | Executive Board | Annual review for reactivation criteria; no active maintenance |
| 17 | **Pack-file structural integrity (parse-count 500)** | Governance Auditor (700-series) | Baseline Maintainer (700-series) | Governance Board | Every session start (T0); after any pack-file write |
| 18 | **DCS calibration data** | Certification Auditor (800-series) | 800-series Lead | Governance Board | Per Domain E/F certification wave |
| 19 | **DL-008 Function-constructor verification** | Governance Auditor (700-series) | Baseline Maintainer (700-series) | Governance Board | Every session start (T0); after any pack-file write |

### Escalation Path

```
Primary Owner cannot resolve
        ↓
Secondary Owner assumes temporary ownership
        ↓
Escalation Owner (Governance Board) invoked if:
  - Primary AND Secondary unavailable
  - Disagreement between Primary and Secondary
  - CRITICAL-level trigger with no clear owner
  - Cross-lane ownership conflict
```

The Governance Board is the collective of all active lane owners plus the Executive Board. It convenes on escalation within the same session — no deferred governance decisions.

---

## 3. Stewardship Principles

These five principles govern all portfolio ownership decisions. They are enforceable at every governance review and series boundary.

### Principle 1 — No Orphaned Responsibility

**Rule:** Every asset, file, process, and governance responsibility has exactly one named primary owner at all times.

**Enforcement:** The Ownership Matrix (§2) is the authoritative registry. Any new artifact created by any lane must be registered in the matrix before the creating session closes. Any artifact whose owner becomes unavailable triggers immediate succession (§1 lane succession plans).

**Violation:** An artifact with no named owner blocks the session that discovered the orphan from closing — the session lead must assign a temporary owner and flag the gap for the next stewardship review.

---

### Principle 2 — Ownership Transfers Require Acceptance

**Rule:** Ownership cannot be transferred by assignment alone. The receiving party must explicitly accept the transfer (per S725 Agent E protocol).

**Protocol:**
1. Transferring owner identifies the responsibility, artifacts, and documentation bundle.
2. Receiving owner acknowledges receipt of the onboarding checklist (see §1 lane succession plans).
3. Receiving owner confirms they have: (a) read relevant session reports, (b) understand the scope and boundary rules, (c) accept the escalation obligations.
4. Both parties log the transfer in REVISION_HISTORY.md with date, responsibility, from-owner, to-owner, and acceptance acknowledgment.
5. Governance Board confirms the transfer at next stewardship review.

**Violation:** Unilateral assignment (transfer without acceptance) is invalid. The original owner retains ownership until acceptance is confirmed.

---

### Principle 3 — Series Closure Requires Ownership Disposition

**Rule:** When any series closes (100, 300, 500, 600, 700, 800), all artifacts and responsibilities owned by that series must have their ownership explicitly disposed — either transferred, retired, or converted to stewardship.

**Disposition Options:**
- **Transferred:** Ownership moves to another active series or lane with full acceptance protocol (Principle 2).
- **Retired:** The artifact/responsibility is no longer needed. The retirement is documented in REVISION_HISTORY.md.
- **Converted to Stewardship:** Active ownership ends but integrity monitoring continues. The artifact enters stewardship mode with the Baseline Maintainer as steward.

**Enforcement:** No series closure may be declared "complete" until the ownership disposition report is filed. The 700-series Governance Auditor enforces this gate at every series closure.

**Example:** 500-series closure (S537). All 5 scored_cases*.js files were converted to stewardship mode. Case-bank integrity monitoring now belongs to the Baseline Maintainer (700-series). The ENHANCED_CASE_BASE certification records are retired (no new certification). This disposition was documented in SESSION723_PORTFOLIO_HANDOFF.json.

---

### Principle 4 — Ownership Is Reviewable at Every Series Boundary Transition

**Rule:** At every transition between active portfolio lanes (e.g., 800-series certification → ongoing maintenance), the ownership matrix (§2) is reviewed for correctness. Any responsibility that crosses the boundary must have its ownership explicitly confirmed.

**Review Protocol:**
1. At boundary transition, the Governance Auditor (or designated session lead) runs the Ownership Matrix against the current portfolio state.
2. Any responsibility where the primary owner's lane is transitioning must be flagged.
3. For each flagged responsibility, confirm: (a) new primary owner is appropriate, (b) secondary owner is available, (c) escalation path is intact.
4. Document boundary review in REVISION_HISTORY.md.

**Boundary transitions defined:**
- 800-series certification complete → post-certification maintenance
- 300-series S310 closeout → no active 300-series
- 700-series Maintenance Mode → long-term governance
- Any primary owner departure or unavailability
- Any new series launch (must not disrupt existing ownership)

---

### Principle 5 — Single Point of Accountability per Responsibility

**Rule:** Every responsibility in the Ownership Matrix (§2) has exactly one primary owner. No responsibility is owned by a committee, shared between equals, or left to "all lane owners" collectively.

**Corollary:** "All lane owners" is valid only as a secondary or escalation designation, never as primary. The Ownership Matrix must list a specific named role for every primary owner slot.

**Decision Authority:** The primary owner has final decision authority for their responsibility within their boundary rules (§1). If two primary owners disagree on a cross-cutting issue, the Governance Board resolves it using the Collaboration Matrix hierarchy (COLLABORATION_MATRIX.md).

---

## 4. Resolving the 6 S724 Ownership Gaps

Each gap from S724's post-700 audit is resolved with: documented current state, proposed owner, acceptance criteria, and transition steps.

---

### Gap 1 — CURRENT_BASELINES.md Maintenance Ownership

| Field | Detail |
|-------|--------|
| **Gap ID** | S724-GAP-01 |
| **Gap** | CURRENT_BASELINES.md maintenance ownership — who updates after writes? |
| **Current State** | CURRENT_BASELINES.md was generated Session 20 (2026-07-24). Updated by Session 530, Session 535, Session 536. No named maintainer — each session that wrote to a tracked file also updated the baselines document, creating inconsistency risk. S724 identified §3 as stale (lists 67 phantom DL-008 items as CRITICAL when S802 confirmed 0 actual). |
| **Proposed Owner** | **Baseline Maintainer (700-series Maintenance Mode)** — a named role in S723's maintenance agent types. |
| **Acceptance Criteria** | (1) Baseline Maintainer acknowledges ownership (per Principle 2). (2) CURRENT_BASELINES.md §3 phantom DL-008 entries removed (P0 fix from S724). (3) All 13 SHA-256 hashes re-verified against current disk files. (4) Hash recapture automated via `scripts/t0_baseline_verify.js` (P1 from S724). (5) Baseline refresh cadence enforced (after any ≥3-file write session, per S723 Maintenance Framework). |
| **Transition Steps** | 1. Governance Auditor designates the Baseline Maintainer role. 2. Baseline Maintainer accepts (per Principle 2 protocol). 3. Baseline Maintainer runs full T0 hash verification against all 13 runtime-critical files. 4. Baseline Maintainer removes 67 phantom DL-008 entries from §3. 5. Baseline Maintainer appends entry to REVISION_HISTORY.md documenting ownership acceptance. 6. Governance Auditor confirms CURRENT_BASELINES.md is clean at next T0. |
| **Succession** | If Baseline Maintainer unavailable → Certification Auditor (800-series) assumes baseline maintenance (see Ownership Matrix §2, row 1). |

---

### Gap 2 — 300→Maintenance Model Consumption Path

| Field | Detail |
|-------|--------|
| **Gap ID** | S724-GAP-02 |
| **Gap** | 300→Maintenance model consumption path — who acts on analytics? |
| **Current State** | 300-series produced DQS, EQS, BQS, ExQS, UIQS, Risk Register, Forecast Engine, and Bottleneck Analysis (S301-S309). S723 declared the 300-series "COMPATIBLE" with governance continuity. But no mechanism exists for consuming these analytics — the quality scores exist but no lane is designated to act on them. |
| **Proposed Owner** | **Reconciliation Agent (700-series)** — consumes analytics as input to G1-G5 reconciliation gates per S723 Maintenance Framework. **Certification Auditor (800-series)** — consumes forecast engine and bottleneck analysis for certification planning. |
| **Acceptance Criteria** | (1) Reconciliation Agent confirms it has access to all 300-series analytics models. (2) Certification Auditor confirms it consumes Forecast Engine and Bottleneck Analysis for 800-series planning. (3) The consumption path is documented in the Ownership Matrix (§2, rows 5 and 12). (4) S310 (Portfolio Operations Dashboard) is executed as the formal 300-series closeout. |
| **Transition Steps** | 1. Governance Auditor confirms 300-series analytics are accessible and interpretable. 2. Reconciliation Agent reviews DQS/EQS/BQS/ExQS/UIQS models and Risk Register for integration into G1-G5 gates. 3. Certification Auditor reviews Forecast Engine and Bottleneck Analysis for 800-series certification planning. 4. 300-series Lead executes S310 (Portfolio Operations Dashboard) as formal closeout. 5. 300-series ownership disposition documented per Principle 3. 6. REVISION_HISTORY.md updated with consumption path assignments. |
| **Succession** | If Reconciliation Agent unavailable → Governance Auditor assumes analytics consumption for governance purposes. If Certification Auditor unavailable → 800-series Lead assumes forecast/bottleneck consumption. |

---

### Gap 3 — G-NEW-1 through G-NEW-5 Enforcement in 800-Series

| Field | Detail |
|-------|--------|
| **Gap ID** | S724-GAP-03 |
| **Gap** | G-NEW-1 through G-NEW-5 enforcement in 800-series certification pipeline |
| **Current State** | G-NEW-1 through G-NEW-5 are certification-blocking conditions defined in QUESTION_METADATA_STANDARD.md §9.4 (effective Session 508, 2026-07-25). They block certification when: (G-NEW-1) dual-block Choice mismatch, (G-NEW-2) ExplanationWrong topic mismatch, (G-NEW-3) dual-block source-of-truth verification gap, (G-NEW-4) case explanation insufficiency, (G-NEW-5) CorrectChoice content-block cross-check. The 800-series certification pipeline currently does not programmatically enforce these rules at scale. |
| **Proposed Owner** | **Certification Auditor (800-series)** — responsible for G-NEW enforcement at every certification wave gate. **Defect Sweeper (700-series)** — responsible for detecting G-NEW violations in Certified items during deep audits. |
| **Acceptance Criteria** | (1) Every 800-series certification wave includes a G-NEW verification gate before "Certified" state assignment. (2) Certification Auditor logs G-NEW pass/fail per wave in REVISION_HISTORY.md. (3) Defect Sweeper's Rapid Pulse audit (every 5 sessions) includes a G-NEW re-verification sweep on newly Certified items. (4) Any G-NEW violation found in a Certified item is escalated as CRITICAL (learner-safety risk per DL-016 severity upgrade). |
| **Transition Steps** | 1. Certification Auditor reads QUESTION_METADATA_STANDARD.md §9.4 (all G-NEW rules, all examples). 2. Certification Auditor integrates G-NEW gate into 800-series certification wave template: before state transition, verify (a) no dual-block Choice mismatch, (b) no EW topic mismatch, (c) content-block CC is source of truth, (d) case explanations meet sufficiency requirements. 3. Defect Sweeper adds G-NEW verification to Rapid Pulse checklist. 4. Both log acceptance in REVISION_HISTORY.md. 5. Governance Board confirms at next stewardship review. |
| **Succession** | If Certification Auditor unavailable → Defect Sweeper assumes G-NEW enforcement during certification waves. |

---

### Gap 4 — Defect Manifest Maintenance After Remediation

| Field | Detail |
|-------|--------|
| **Gap ID** | S724-GAP-04 |
| **Gap** | Defect manifest maintenance after remediation — who updates DEFECT_LIBRARY.md? |
| **Current State** | DEFECT_LIBRARY.md catalogs 33 defect entries (DL-001 through DL-033). Multiple remediation sessions across different lanes (700-series DL-008 sweeps, 800-series certification waves, autonomous runs) modify pack files to fix defects. But DEFECT_LIBRARY.md updates are inconsistent — some remediations are documented in REVISION_HISTORY.md but the defect library entry's "Status" and "Resolved" sections are not contemporaneously updated. |
| **Proposed Owner** | **Defect Sweeper (700-series)** — primary responsibility for DEFECT_LIBRARY.md maintenance. All remediation agents from any lane must report defect-status changes to the Defect Sweeper. |
| **Acceptance Criteria** | (1) After every remediation batch (any lane, any defect), the Defect Sweeper updates the corresponding DEFECT_LIBRARY.md entry within the same session. (2) "Status" field reflects current state (Open/Resolved/In Progress). (3) "Resolved" section captures date, count, and cross-reference to the remediation session. (4) No remediated defect is marked "Open" in DEFECT_LIBRARY.md more than one session after remediation completion. |
| **Transition Steps** | 1. Defect Sweeper accepts ownership (per Principle 2). 2. Defect Sweeper audits all 33 DL entries against current pack-file state — flags any discrepancy between documented status and actual state. 3. For each discrepancy, either (a) update DEFECT_LIBRARY.md to match actual state, or (b) if the remediation was incomplete, re-open the defect. 4. Defect Sweeper establishes the protocol: any remediation agent must append a status-change note to DEFECT_LIBRARY.md before their session closes (per AGENTS.md §12 — "No Staged Findings"). 5. Log acceptance and audit results in REVISION_HISTORY.md. |
| **Succession** | If Defect Sweeper unavailable → Baseline Maintainer assumes DEFECT_LIBRARY.md maintenance. |

---

### Gap 5 — 300-Series S310 Dangling Closeout

| Field | Detail |
|-------|--------|
| **Gap ID** | S724-GAP-05 |
| **Gap** | 300-series S310 dangling closeout — no trigger enforces execution |
| **Current State** | 300-series completed Sessions S302-S309 (8 of 10 planned), producing DQS, EQS, BQS, ExQS, UIQS, Risk Register, Forecast Engine, and Bottleneck Analysis. S309 recommended S310 (Portfolio Operations Dashboard) as the formal 300-series closeout. S724 confirmed S310 as "Recommended Next: P0." But no trigger enforces its execution — it is a dangling commitment with no owner. |
| **Proposed Owner** | **300-series Lead (Portfolio Analytics)** — responsible for executing S310 as the final 300-series deliverable. **Reconciliation Agent (700-series)** — responsible for triggering S310 if the 300-series Lead is unavailable. |
| **Acceptance Criteria** | (1) S310 is executed — minimally producing a Portfolio Operations Dashboard that aggregates all 300-series analytics into a consumable governance view. (2) 300-series ownership disposition is documented per Principle 3 — all artifacts are either transferred, retired, or converted to stewardship. (3) The 300-series is formally CLOSED in the Portfolio Lane Map (§1). (4) The consumption paths (Gap 2) are activated. |
| **Transition Steps** | 1. Governance Auditor flags S310 as overdue at T0 of the session immediately following S725. 2. 300-series Lead is spawned to execute S310 (Portfolio Operations Dashboard). 3. If 300-series Lead unavailable, Reconciliation Agent triggers S310 as closeout. 4. Upon S310 completion, 300-series Lead submits ownership disposition report. 5. Governance Auditor updates Portfolio Lane Map §1: 300-series status → CLOSED. 6. REVISION_HISTORY.md updated with S310 closeout entry and ownership disposition. |
| **Succession** | If 300-series Lead unavailable AND Reconciliation Agent fails to trigger S310 → Governance Board escalates: either (a) spawn a new 300-series agent, or (b) declare 300-series CLOSED with S310 waived (documented rationale required). |

---

### Gap 6 — May Coaching Layer Ownership

| Field | Detail |
|-------|--------|
| **Gap ID** | S724-GAP-06 |
| **Gap** | May coaching layer ownership — runtime dependency with no owning track |
| **Current State** | May coaching layer consists of two runtime files: `may-core.js` (344,883 bytes) and `may-learner-state.js` (110,240 bytes). Both are referenced by `index_updated.html` and tracked in CURRENT_BASELINES.md §1 with SHA-256 hashes. The coaching engine interacts with app.js (100-series) and consumes Certified pool data. But no lane has formally accepted ownership — it is a runtime dependency without an owning track. |
| **Proposed Owner** | **100-series Lead (Platform Maintainer)** — assigned by this framework (§1, May Coaching Lane). The coaching layer is a runtime dependency integrated with app.js — it naturally belongs to the runtime maintenance lane. |
| **Acceptance Criteria** | (1) 100-series Lead explicitly accepts May coaching layer ownership (per Principle 2). (2) May coaching files are included in 100-series T0 hash verification. (3) Coaching-layer bug fixes follow 100-series boundary rules (MAY: fix runtime bugs; MAY NOT: create new coaching content, modify pack content). (4) Coaching-layer integrity is verified at each quarterly stewardship review. |
| **Transition Steps** | 1. Governance Auditor presents May coaching layer ownership proposal to 100-series Lead. 2. 100-series Lead reviews: (a) CURRENT_BASELINES.md §1 for may-core.js and may-learner-state.js hashes, (b) index_updated.html script tag references (lines 11, 13), (c) S120-S131 session reports for coaching content context. 3. 100-series Lead accepts ownership (per Principle 2 protocol). 4. Portfolio Lane Map §1 updated: May Coaching Lane primary owner → 100-series Lead. 5. Ownership Matrix §2 updated: row 6 populated. 6. REVISION_HISTORY.md updated with ownership acceptance entry. |
| **Succession** | If 100-series Lead unavailable → Governance Auditor assumes coaching-layer integrity monitoring. Both May files are tracked in CURRENT_BASELINES.md — T0 protocol covers hash verification. |

---

### Gap Resolution Summary

| Gap | Owner | Acceptance Trigger | Deadline |
|-----|-------|-------------------|----------|
| GAP-01 — CURRENT_BASELINES.md | Baseline Maintainer (700-series) | Next T0 protocol execution | Before S726 |
| GAP-02 — 300→Maintenance consumption | Reconciliation Agent + Certification Auditor | S310 closeout | Before S726 |
| GAP-03 — G-NEW enforcement | Certification Auditor (800-series) | Next certification wave | Before next 800-series wave |
| GAP-04 — Defect manifest maintenance | Defect Sweeper (700-series) | Next remediation batch | Before S726 |
| GAP-05 — S310 closeout | 300-series Lead | S310 execution | Before S726 |
| GAP-06 — May coaching layer | 100-series Lead | Ownership acceptance | Before S726 |

**Deadline S726:** All 6 gaps must be resolved (owner accepted, transition steps complete) by Session 726's T0. The Governance Auditor reports gap-closure status at S726 T0. Any unresolved gap escalates to the Governance Board.

---

## 5. Stewardship Review Cadence

Ownership is not a one-time assignment. It is reviewed at four cadence triggers.

### 5.1 Series Boundary Transitions

| Trigger | Review Scope | Owner | Output |
|---------|-------------|-------|--------|
| 100→300 | Does the 100-series handoff affect any existing ownership? | Governance Auditor | Boundary review entry in REVISION_HISTORY.md |
| 300→500 | Are 300-series analytics models properly consumed? | Governance Auditor | Consumption path confirmation |
| 500→600 | Are 500-series artifacts properly dispositioned? (500-series is CLOSED — this review is retrospective) | Governance Auditor | Ownership disposition report |
| 600→700 | If 600-series is ever reactivated: is the deferred lane properly brought into the Ownership Matrix? | Governance Board | Reactivation assessment |
| 700→800 | Is 700-series Maintenance Mode ownership intact after 800-series active development? | Governance Auditor | Cross-lane ownership review |
| 800→Maintenance | When 800-series completes: are all 800-series responsibilities dispositioned per Principle 3? | Governance Auditor + Certification Auditor | 800-series closeout ownership report |

### 5.2 Governance Board Sessions

The Governance Board is the collective of all active lane owners. It convenes on:

| Trigger | Frequency |
|---------|-----------|
| Ownership escalation (any CRITICAL trigger with no clear owner) | On demand |
| Cross-lane ownership conflict | On demand |
| Post-Deep Audit (every 20 sessions per S723 Maintenance Framework) | Every ~20 sessions |
| Executive Board directive | On demand |

At every Governance Board session, the Ownership Matrix (§2) is reviewed for completeness. Any lane with an absent, unavailable, or non-responsive primary owner is flagged and succession activated.

### 5.3 Owner Departure or Unavailability

When any primary owner becomes unavailable (no session activity for >2 consecutive Governance Board reviews):

1. The Governance Auditor invokes the lane's succession plan (§1).
2. The secondary owner is offered the primary role.
3. If the secondary owner accepts (per Principle 2), the Ownership Matrix is updated.
4. If the secondary owner declines or is also unavailable, the escalation owner (Governance Board) assigns a new primary owner.
5. The transition is logged in REVISION_HISTORY.md within the same session.

### 5.4 Quarterly Stewardship Review

Every calendar quarter, or every ~50 sessions, whichever comes first:

| Review Item | Owner | Output |
|-------------|-------|--------|
| Full Ownership Matrix audit — every responsibility verified against current state | Governance Auditor | Matrix audit report |
| All 8 lane statuses confirmed | Governance Auditor | Portfolio Lane Map review |
| Succession plan readiness — each lane owner confirms their succession plan is current | Each lane owner | Succession readiness attestation |
| Knowledge base accuracy — all governance documents reviewed for staleness (AGENTS.md, CAQS_v1.0.md, CURRENT_BASELINES.md, DEFECT_LIBRARY.md, REVISION_HISTORY.md) | Baseline Maintainer | Knowledge base audit report |
| 600-series reactivation criteria review | Governance Board | Reactivation assessment (deferred only — no action unless criteria met) |
| Gap register review — any new ownership gaps discovered and assigned | Governance Auditor | Gap register update |

---

## 6. Framework Governance

### 6.1 Amendment Process

This framework may be amended by:
1. Executive Board directive (unanimous or majority with documented rationale).
2. Governance Board proposal + Executive Board approval.
3. As part of any series closure ownership disposition (per Principle 3 — amendments limited to that series' lane entries and Ownership Matrix rows).

### 6.2 Conflict Resolution

If this framework conflicts with another governance document:
- PROJECT_CONSTITUTION.md overrides this framework.
- CAQS v1.0 overrides this framework on content quality matters.
- AGENTS.md overrides this framework on session operational matters.
- This framework overrides all other documents on portfolio ownership decisions.

### 6.3 Versioning

This framework uses semantic versioning:
- **1.0:** Initial establishment (S725).
- **Major (2.0):** Lane structure changes (new lane added, lane removed, or primary ownership reassigned across lanes).
- **Minor (1.1):** Ownership Matrix row added/removed, stewardship principle amended, cadence adjusted.
- **Patch (1.0.1):** Succession plan detail updated, acceptance criteria refined, cross-references fixed.

### 6.4 Living Document

This framework is a living document. It reflects the current state of ownership — if ownership changes, the framework MUST be updated in the same session. The Governance Auditor is responsible for ensuring the framework matches reality at every T0 check.

---

## Appendix A — Cross-Reference Index

| Document | Section Used |
|----------|-------------|
| `SESSION724_OPERATING_MODEL.json` | Portfolio lane statuses, 6 ownership gaps, governance health score |
| `SESSION723_PORTFOLIO_HANDOFF.json` | Lane compatibility assessments, governance continuity factors |
| `SESSION723_MAINTENANCE_FRAMEWORK.json` | Agent type definitions, audit cadences, trigger thresholds, escalation conditions |
| `CURRENT_BASELINES.md` | 13-file SHA-256 baselines, Certified pool snapshot, defect & risk status, governance guard status, May coaching layer files |
| `SESSION724_SESSION_SUMMARY.md` | 6 gap enumeration, 26-agent decision record, 600-series deferral rationale, operational readiness assessment |
| `QUESTION_METADATA_STANDARD.md` §9.4 | G-NEW-1 through G-NEW-5 certification-blocking conditions |
| `AGENTS.md` §12 | "No Staged Findings" rule — defects must be logged before session close |
| `PROJECT_CONSTITUTION.md` | Highest authority — all framework provisions are subordinate |
| `COLLABORATION_MATRIX.md` | Authority hierarchy for dispute resolution |

---

## Appendix B — Revision History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-07-26 | Agent O — S725 Portfolio Stewardship Architect | Initial establishment. Portfolio Lane Map (8 lanes), Ownership Matrix (19 responsibilities), 5 Stewardship Principles, resolution of 6 S724 ownership gaps, stewardship review cadence (4 triggers). Read-only governance artifact. |
