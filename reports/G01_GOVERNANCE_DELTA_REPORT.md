# G01 — Governance Delta Report

**Date:** 2026-07-31
**Session:** G01 Governance Rebaseline & Standards Consolidation
**Status:** COMPLETE
**Governance Lane:** Light (Read-Only)

---

## 1. Executive Summary

The governance architecture established at S221 (2026-07-27) has been materially impacted by 4 major programs executed between July 24–31, 2026. The most significant finding is a **systemic cognitive classification inaccuracy** (58.7% of HO-labeled items are misclassified) that current governance rules (1–9) do not detect. Concurrently, the May adaptive coaching layer has transitioned from project to operational product (Phase 2 limited rollout), introducing new operational controls that are not recognized in the governance documentation.

**This report identifies 13 governance deltas requiring action, prioritized by severity and learner-safety impact.**

---

## 2. Governance Delta Inventory

### Delta 1 — CURRENT_BASELINES.md §3 Contains Contradictory Claims

**Severity:** HIGH
**Finding:** DL-026 is listed as "RESOLVED — 0 Certified items" while DL-035 in the same §3 is listed as "IN PROGRESS — 39 Certified Domain F items carry empty distractor EW slots." Both cannot be true simultaneously.

**Root cause:** S227 T0 scan (pre-S853) found 0 DL-026 in Domain F. S853 WAVE_A subsequently certified 100 new Domain F items, 39 of which carried pre-existing empty distractor EW slots. Governance guard Rules 1-5 passed because DL-026 was not a certification-blocking check (only DL-008 was). Rule 6 was deployed at S814 but the 39 items remain unremediated.

**Recommendation:** Reconcile: DL-026 status = "39 Certified items (co-managed under DL-035). Remediation pending S816-S818." Merge DL-035's count into DL-026. Do not maintain separate entries for the same defect class.

---

### Delta 2 — DL-008 Remediator Count Undercounts Total

**Severity:** LOW
**Finding:** CURRENT_BASELINES.md states "59 items" remediated via S893–S895. S382 (same day, later) remediated an additional **25 items** (15 Pack C, 10 Pack D) that were separate QIDs from the S893 list. Total remediated = **84, not 59**. The 0-remaining claim is correct, but the count understates the total by 42%.

**Recommendation:** Update CURRENT_BASELINES.md DL-008 entry to "84 items (59 S893–S895 + 25 S382)."

---

### Delta 3 — DL-031 and DL-032 Status Stale

**Severity:** MEDIUM
**Finding:** CURRENT_BASELINES.md lists DL-031 as "Partially remediated" and DL-032 as "330 items still uniform Moderate." Post-S221 evidence:
- **DL-031:** ~677 difficulty downgrades applied across S89B (411), S89C (80), S713 (186) — exceeds original ~500 estimate. The remaining moderate/easy skew reflects genuine content-creation gaps, not inflation.
- **DL-032:** S716 calibrated 472 case items — item-level distribution is now Moderate-Easy 15.5%, Moderate 43.5%, Difficult 41% (not uniform). Only 120 items deferred (those without CognitiveLevel). Case-level Difficulty metadata remains uniform Moderate.

**Recommendation:** 
- DL-031: Deprecate as active defect. Mark "RESOLVED — 677 items recalibrated."
- DL-032: Update to "Item-level: 80% resolved (472/592). Case-level: uniform Moderate (deferred to certification waves)."

---

### Delta 4 — DL-029 Should Be Deprecated

**Severity:** INFORMATIONAL
**Finding:** DL-029 (regex block-scan false positives) is effectively neutralized. S802 established 8 permanent prevention rules (P1–P8). All post-July-28 sessions cite Function-constructor parse or within-object extraction. No evidence of forward-scan reuse.

**Recommendation:** Deprecate DL-029. Add to CURRENT_BASELINES.md §3 RESOLVED section. Retain P1-P8 as standing methodology requirements.

---

### Delta 5 — DL-038 Not Listed in Baselines

**Severity:** LOW
**Finding:** DL-038 (Unicode mismatch in matching RightItems) was discovered and resolved at S85 (2026-07-30). It is not listed in CURRENT_BASELINES.md §3.

**Recommendation:** Add DL-038 to RESOLVED section.

---

### Delta 6 — Cognitive Classification Is Ungoverned

**Severity:** HIGH
**Finding:** Governance guard Rules 1-9 protect against:
- Wrong content reaching learners (DL-008, DL-026, DL-037)
- Unauthorized answer-key changes (Rule 4)
- Registry corruption (Rule 3, Rule 7)
- Untracked artifacts (Rule 8)
- Excessive batch writes (Rule 5)

**None of them protect against items carrying inflated cognitive labels.** An item with `CognitiveLevel: "Evaluate"` that tests at `Apply` level passes all 9 rules and enters the learner pool unflagged. The S92P–S100P Quality Recovery program found 58.7% of HO-labeled items are misclassified.

**Recommendation:** Deploy cognitive classification gates as governance guard Rule 11 (Rule 10 is allocated to DL-021 enforcement). Immediate: AF-3, AF-4, AF-5 as BLOCK-level rules. Short-term: AF-2 as FLAG-level rule. Medium-term: AF-6 as WARN-level rule. Future: AF-1 NLP enhancement.

---

### Delta 7 — May Is an Operational Product Without Governance Recognition

**Severity:** MEDIUM
**Finding:** May has completed a 10-milestone lifecycle (Architecture → Coaching → Readiness → Orchestration → Telemetry → Pilot → Governance → Integration → Validation → Activation). `ENABLE_PRODUCTION_MAY_INTEGRATION` is `true`. Four production integration points are live in app.js. May now has:
- 5 operational frameworks (monitoring, escalation, rollback, telemetry, feature flags)
- 4-tier escalation ladder with quantified thresholds
- Single-flag rollback verified working (sub-minute)
- 16 feature flags in centralized module

However, AGENTS.md, governance-guard.js, and CURRENT_BASELINES.md have zero May content. May governance exists only in `reports/MAY*` files.

**Recommendation:** 
1. Add May operational controls to CURRENT_BASELINES.md §6 (new section: "Operational Controls — May Coaching Layer")
2. Add May to AGENTS.md §1 as a recognized operational system with its own governance lane exemption
3. Define May-specific drift-detection signals (per AGENTS.md §13.1)

---

### Delta 8 — May Monitoring Is Entirely Manual

**Severity:** MEDIUM
**Finding:** May's 4-layer monitoring framework (MAY-020) defines T0/Tmid/Tend/Weekly cadences but all detection is manual. No automated alerting. No dashboard is deployed (`scripts/may_rollout_dashboard.html` is referenced as "when available"). Telemetry is browser-memory-only — manual `localStorage` → copy workflow.

**Recommendation:** Scope-appropriate for Phase 2 limited rollout (5-10 testers). Before Phase 3 (full activation), automate: (a) telemetry aggregation, (b) threshold-based alerting, (c) rollout dashboard.

---

### Delta 9 — Governance Guard Rule 10 Is Occupied

**Severity:** MEDIUM
**Finding:** Rule 10 in `governance-guard.js` enforces DL-021 (absent distractor EW fields), deployed at S814. The S94P/S99P proposal to use Rule 10 for cognitive classification gates conflicts. The cognitive gates must use **Rule 11**.

**Recommendation:** All cognitive gate documentation (S94P, S95P, S99P, S100P) should reference Rule 11, not Rule 10. Update governance-guard.js header and test suite accordingly.

---

### Delta 10 — S97P Automated Engine Is Not Integrated

**Severity:** MEDIUM
**Finding:** `scripts/s097p_automated_gate.js` (410 lines) is a functional prototype that runs all 6 AF conditions in <3 seconds across 2,545 items. It is NOT:
- Integrated into `npm run pipeline`
- Deployed as governance guard rule
- Enforced at write/edit time
- Connected to certification workflow

**Recommendation:** Extract AF-3/4/5 logic into governance guard Rule 11 as BLOCK-level gates. Integrate into pipeline as `validate → cognitive-audit → build-registry → dashboard`.

---

### Delta 11 — 2,298 Certified Pool Figure Misaligned

**Severity:** MEDIUM
**Finding:** CURRENT_BASELINES.md §2 reports 2,298 Certified (rebuild_baselines S377). The direct grep figure is 2,451 (Pack A 500 + Pack B 500 + Pack C 455 + Pack D 456 + Pack E 540 = 2,451). The 2,298 figure is from a pre-S377 baseline (reported in S53 long-run governance execution).

**Recommendation:** The §2 canonical table (2,451) is correct. The 2,298 figure in the §2 header metadata note is stale. Update the header to match the canonical table.

---

### Delta 12 — No Cognitive Audit Pipeline Step

**Severity:** HIGH
**Finding:** The certification pipeline (`npm run pipeline`) is `validate → build-registry → dashboard`. Per S99P, it should be `validate → cognitive-audit → build-registry → dashboard`. The cognitive audit step does not exist in the current pipeline infrastructure.

**Recommendation:** Add `scripts/cognitive_audit.js` as a read-only pipeline step. It invokes AF-3/4/5 checks and produces `reports/cognitive_audit_report.md`.

---

### Delta 13 — No Difficulty-Cognitive Consistency Enforcement

**Severity:** MEDIUM
**Finding:** S99P §7 defines minimum DifficultyScore by CognitiveLevel (Evaluate ≥ 3, Analyze ≥ 2). S97P found 9 items with DifficultyScore=1 and CognitiveLevel=Evaluate — a structural impossibility. No governance rule enforces this.

**Recommendation:** Include difficulty-cognitive consistency as a BLOCK condition within Rule 11.

---

## 3. Prioritized Action Register

| Priority | Delta | Action | Session Target |
|----------|-------|--------|---------------|
| **1** | D1 | Reconcile DL-026/DL-035 contradictory claims | G01 Implementer |
| **2** | D6 | Deploy Rule 11 with AF-3/4/5 as BLOCK | S109P |
| **3** | D12 | Add cognitive-audit to pipeline | S110P |
| **4** | D10 | Integrate s097p engine into governance guard | S109P |
| **5** | D9 | Renumber cognitive gates to Rule 11 | S109P |
| **6** | D3 | Update DL-031/DL-032 baselines | G01 Implementer |
| **7** | D13 | Add difficulty-cognitive consistency to Rule 11 | S109P |
| **8** | D7 | Add May to governance documentation | G01 Implementer |
| **9** | D11 | Fix 2,298 vs 2,451 certified pool figure | G01 Implementer |
| **10** | D2 | Update DL-008 count from 59 to 84 | G01 Implementer |
| **11** | D4 | Deprecate DL-029 | G01 Implementer |
| **12** | D5 | Add DL-038 to resolved section | G01 Implementer |
| **13** | D8 | Plan May monitoring automation | MAY-025 deferral |

---

*Generated: 2026-07-31 | G01 Implementer Phase — Governance Delta Report*
